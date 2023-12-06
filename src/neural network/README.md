Requirements

These are the requirment to run the jupyter notebook. 

Python 3.7 - 3.9 (recomended)

Libraries:
OpenCV
PIL
NumPy
Pandas
Seaborn
Matplotlib
scikit-image
TensorFlow (including Keras)
Scikit-learn
Nilearn
imageio
Hardware: GPU (recommended for faster processing)

Installation
First, ensure you have Python 3.x installed. Then, install the required libraries using pip:
```
pip install opencv-python
pip install pillow
pip install numpy
pip install pandas
pip install seaborn
pip install matplotlib
pip install scikit-image
pip install tensorflow
pip install scikit-learn
pip install nilearn
pip install imageio
```

IMPORTANT
This model is designed for educational and research purposes and should not be used as a substitute for professional medical advice.

Steps to run the notebook:

1) Run the code cell with all libraries installed and imported.
2) Mount the google drive.
3) Unzip the dataset to your google colab using the unzip code cell provided in the notebook 
4) TRAIN_DATASET_PATH = 'Path to your dataset'
   VALIDATION_DATASET_PATH = 'Path to your dataset'
5) Run the code under "Set configuring parameters"
6) Run the code under "Loading the dataset"
7) Run the code under "Splitting train, validation and test"
8) Run the code under "Initialize MRI Data Generators"
9) Run the code under "Loss function"
10) Run the lines of code provided bellow

Define your custom objects in a dictionary
custom_objects = {'dice_coef': dice_coef}

Load the model with custom objects
model = load_model('/content/sample_model.h5', custom_objects=custom_objects)
11) Now you can visualize the data on the test sets.