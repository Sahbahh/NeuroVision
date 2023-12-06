from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from custom_metrics import dice_coef
import numpy as np
import cv2
import nibabel as nib
import matplotlib.pyplot as plt
import io
import os
import base64


# print(tf.config.list_physical_devices('GPU'))
app = Flask(__name__)  # Corrected here
app.config['UPLOAD_PATH'] = 'uploads'
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


custom_objects = {'dice_coef': dice_coef}

model = tf.keras.models.load_model('../neural network/sample_model.h5', custom_objects=custom_objects)

@app.route("/api/welcome", methods=["GET"])
def welcome():
    response = jsonify({"Flask Server": "Display top page"})
    return response


@app.route('/api/predict', methods=['POST'])
def predict():
    if 'flair' not in request.files or 't1ce' not in request.files:
        return jsonify({'result': "Missing files Flair, T1ce or both."}), 400

    # Assuming the request will have paths to flair and t1ce images
    flair = request.files['flair']
    t1ce = request.files['t1ce']

    flair_path = os.path.join(app.config['UPLOAD_PATH'], flair.filename)
    t1ce_path = os.path.join(app.config['UPLOAD_PATH'], t1ce.filename)

    flair.save(flair_path)
    t1ce.save(t1ce_path)
    
    # Load the NIfTI files as Numpy arrays
    flair_volume = nib.load(flair_path).get_fdata()
    t1ce_volume = nib.load(t1ce_path).get_fdata()


    # Preprocess the images
    processed_images = preprocess_image(flair_path, t1ce_path)
    

    # # Perform prediction
    predictions = model.predict(processed_images)

    # # Postprocess the prediction
    output = postprocess_and_visualize_prediction(predictions, flair_volume, t1ce_volume)

    return jsonify({'result': output})

def preprocess_image(flair_path, t1ce_path, target_dim=(128, 128), volume_slices=155, start_slice=0):
    # Load NIfTI files
    flair = nib.load(flair_path).get_fdata()
    t1ce = nib.load(t1ce_path).get_fdata()

    # Initialize the array to hold the preprocessed slices
    preprocessed_slices = np.zeros((volume_slices, *target_dim, 2), dtype=np.float32)

    # Process each slice
    for i in range(volume_slices):
        slice_index = start_slice + i

        # Resize the images for the current slice
        flair_resized = cv2.resize(flair[:, :, slice_index], target_dim, interpolation=cv2.INTER_CUBIC)
        t1ce_resized = cv2.resize(t1ce[:, :, slice_index], target_dim, interpolation=cv2.INTER_CUBIC)

        # Stack the images to create a 2-channel input for the current slice
        preprocessed_slices[i, :, :, 0] = flair_resized
        preprocessed_slices[i, :, :, 1] = t1ce_resized

    # Normalize the image slices
    preprocessed_slices = preprocessed_slices / np.max(preprocessed_slices)

    return preprocessed_slices

def postprocess_and_visualize_prediction(predictions, flair_volume, t1ce_volume, num_slices_to_show=10):
    """
    Postprocess and visualize selected slices with predicted masks.

    Args:
    predictions (numpy.ndarray): The output from the model for all slices.
    flair_volume (numpy.ndarray): The FLAIR volume data.
    t1ce_volume (numpy.ndarray): The T1ce volume data.
    num_slices_to_show (int): Number of slices to visualize.

    Returns:
    list: A list of base64 encoded images.
    """
    encoded_images = []

    # Select slices to visualize
    slice_indices = np.linspace(0, predictions.shape[0] - 1, num_slices_to_show, dtype=int)

    for slice_index in slice_indices:
        # Predicted mask for the current slice
        predicted_mask = np.argmax(predictions[slice_index], axis=-1).squeeze()

        # Resize slices for visualization
        flair_slice = cv2.resize(flair_volume[:, :, slice_index], (128, 128))
        t1ce_slice = cv2.resize(t1ce_volume[:, :, slice_index], (128, 128))

        # Set up the plot
        fig, ax = plt.subplots(figsize=(5, 5))
        ax.imshow(flair_slice, cmap='gray')
        ax.imshow(predicted_mask, cmap='jet', alpha=0.5)  # Overlay mask
        ax.axis('off')
        ax.set_title(f'Slice {slice_index}')

        # Save and encode the plot
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        encoded_images.append(image_base64)

        # Clear the current plot to free memory
        plt.close()

    return encoded_images

if __name__ == '__main__':  # Corrected here
    app.run(host="0.0.0.0", port=5000, debug=True)