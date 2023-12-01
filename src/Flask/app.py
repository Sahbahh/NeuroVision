from flask import Flask, request, jsonify
import tensorflow as tf
from custom_metrics import dice_coef
import numpy as np
import cv2
import nibabel as nib
import matplotlib.pyplot as plt
import io
import base64


print(tf.config.list_physical_devices('GPU'))
app = Flask(__name__)  # Corrected here


# TEST FOR SIMPLE FLASK SERVER =============================
# @app.route("/hello", methods=["GET"])
# def say_hello():
#     return jsonify({"msg": "Hello from Flask Server"})


# if __name__ == "__main__":
#     # do not set debug=True in production
#     app.run(host="0.0.0.0", port=5000, debug=True)
# ==========================================================

custom_objects = {'dice_coef': dice_coef}

model = tf.keras.models.load_model('project_16/src/neural network/sample_model.h5', custom_objects=custom_objects)

@app.route('/predict', methods=['POST'])
def predict():
    # Assuming the request will have paths to flair and t1ce images
    flair_path = request.form.get('flair_path')
    t1ce_path = request.form.get('t1ce_path')

    if not flair_path or not t1ce_path:
        return jsonify({'error': 'Missing file paths for FLAIR and/or T1ce images'}), 400

    # Preprocess the images
    processed_images = preprocess_image(flair_path, t1ce_path)

    # Perform prediction
    predictions = model.predict(processed_images)

    # Postprocess the prediction
    output = postprocess_and_visualize_prediction(predictions)

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

def postprocess_and_visualize_prediction(predictions, target_dim=(128, 128)):
    """
    Postprocess and visualize the predictions for all slices.

    Args:
    predictions (numpy.ndarray): The output from the model for all slices.
    target_dim: Target dimension for resizing.

    Returns:
    list: A list of base64 encoded images.
    """

    num_slices = predictions.shape[0]
    encoded_images = []

    for slice_index in range(num_slices):
        # Predicted mask for the current slice
        predicted_mask = np.argmax(predictions[slice_index], axis=-1).squeeze()

        # Set up the plot for the predicted mask
        fig, ax = plt.subplots(figsize=(5, 5))
        ax.imshow(predicted_mask, cmap='gray')
        ax.set_title(f'Predicted Mask Slice {slice_index}')
        ax.axis('off')

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