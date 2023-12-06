# Flask Server for Brain Tumor Detection

This Flask server hosts a brain tumor detection model using deep learning techniques. The server allows users to upload MRI images and receive predictions about the presence of brain tumors.

1) create a folder called uploads
```
mkdir uploads
```
2) Requirements

Python 3.7 - 3.9
Libraries:
Flask
Flask-CORS
TensorFlow
NumPy
OpenCV
Nibabel
Matplotlib
Base64
Additional: GPU (recommended for faster processing)

Installation
Python Installation:
Ensure you have Python 3.7 - 3.9 installed on your system. You can download Python from the official website.

Library Installation:
Install the required libraries using pip. Open a terminal or command prompt and execute the following commands:
```
pip install Flask
pip install Flask-CORS
pip install tensorflow
pip install numpy
pip install opencv-python-headless
pip install nibabel
pip install matplotlib
```

Or run:
```
pip install -r requirements.txt
```

3) Steps for running the Flask Server

--Navigate to the Flask Folder: Open a terminal or command prompt and navigate to the directory containing your Flask application.
--Start the Server: Run the Flask application by executing: flask run or python app.py
--This will start the server on http://127.0.0.1:5000/ by default.

Important Notes
This Flask server and the associated brain tumor detection model are intended for educational and research purposes and should not be used as a substitute for professional medical advice.
Make sure the server is not publicly accessible if you're dealing with sensitive data.