# Regional Brain Tumor Detection Web App

The aim of this project is to develop a machine-learning model, accessible through a React web application, designed to detect brain tumors from MRI scans. We focused on segmentation tasks whereby the model is able to identify the presence of a tumor and predict its shape and size (tumor mask). To achieve this, we leverage a Regional Convolutional Neural Network (RCNN) developed using U-net architecture, which is ideal for medical imaging segmentation tasks, to pinpoint the precise areas in the brain that may contain tumors.  
We decided to make the model accessible through a web application to enhance and simplify the user experience. 

## Important Links

| [Timesheet](https://1sfu-my.sharepoint.com/:x:/g/personal/kabhishe_sfu_ca/EcNAA8NJfzRDnB-AxA825DMBYtabUOEfKJfYbYzss5520A?e=Q8iGna) | [Slack channel](https://app.slack.com/client/T05JYJAF22G/C05TGQLK6KE/docs/Qp:F05T7QB82GN) | [Project report](https://www.overleaf.com/6332469233sfmrvghkymkp) |
|-----------|---------------|-------------------------|


- Timesheet: Link your timesheet (pinned in your project's Slack channel) where you track per student the time and tasks completed/participated for this project/
- Slack channel: Link your private Slack project channel.
- Project report: Link your Overleaf project report document.


## Video/demo/GIF
Our video can be found on YouTube using the following URL:
[Youtube video](https://youtu.be/qIr_XJFoXMQ)

## Table of Contents
1. [Demo](#demo)

2. [Installation](#installation)

3. [Reproducing this project](#repro)


<a name="demo"></a>
## 1. Example demo

![](https://github.com/sfu-cmpt340/project_16/blob/main/images/brain_slices.gif)

![alt text](https://github.com/sfu-cmpt340/project_16/blob/main/images/brain1.png)

![alt text](https://github.com/sfu-cmpt340/project_16/blob/main/images/image.png)

## Web interface
![alt text](https://github.com/sfu-cmpt340/project_16/blob/main/images/web_interface.JPG)


## U-net model schematic
![alt text](https://github.com/sfu-cmpt340/project_16/blob/main/images/model_schematic.png)

## Web App Architecture
![alt text](https://github.com/sfu-cmpt340/project_16/blob/main/images/Web_App_Architecture.png)




### What to find where

Where to find our files:
1) Our jupyter notebook where the neural network model was trained is under src\neural network\FinalProjectmodel.ipynb our whole neural network is saved in the notebook and can be viewed for more details. Our saved model is saved in src\neural network\sample_model.h5
2) We created a Flask server as the backend for the react front end. The Flask can be found under src\Flask\app.py this is where out model is being called in the backend.
3) Our react app is saved in src\regional-brain-tumor-detector.


```bash
repository
├── src                                 ## source code of the package itself
|   ├── Flask                           ## Flask backend
|   ├── neural network                  ## Scripts for developing the model
|   ├── regional-brain-tumor-detector   ## React frontend
├── scripts                      ## scripts, if needed
├── docs                         ## If needed, documentation   
├── README.md                    ## You are here
├── requirements.yml             ## If you use conda
```

<a name="installation"></a>

## 2. Installation

We recommend the user to used VisualStudio Code to run our project.
There are 2 parts of out project that the user needs to run.
Make sure the system has python 3.7-3.9 installed.
### STEP 1
```
cd project_16/src/Flask
```
Once in Flask directory read the README file and run:
```
pip install -r requirements.txt
``` 
To start the Flask server run (Make sure you are in the flask directory)
```
flask run
```

### STEP 2
```
cd project_16/src/regional-brain-tumor-detector
```
Once in regional-brain-tumor-detector directory read the README file and run:
To install dependencies:
 ```
npm install
```
To run development environment:
 ```
npm start
```
To build production version:
```
npm run build
```
### System specifications we ran our program on:
CSIL workstation: ASB9700 (used machine asb9700-h07)  
OS: LINUX Ubuntu 20.04  
GPU: GeForce RTX 2080  
CPU model/make: Intel(R) Core(TM) i9-9900 CPU @ 3.10GHz  
Socket(s): 1  
Core(s) per socket: 8  
Thread(s) per core: 2  
Total memory: 31Gi  

### Windows system specifications we ran our program on:  
Processor	Intel(R) Core(TM) i5-9300HF CPU @ 2.40GHz   2.40 GHz  
Installed RAM	8.00 GB  
Device ID	B002CCA2-DB2A-4413-9699-B8AF847FD080  
Product ID	00327-35905-98426-AAOEM  
System type	64-bit operating system, x64-based processor   

We have not reproduced the results on macOS

<a name="repro"></a>
## 3. Reproduction

These are the requirements to run the jupyter notebook. And reproduce the results in the jupyter notebook.

Python 3.7 - 3.9 (recommended)

Libraries:
OpenCV,
PIL,
NumPy,
Pandas,
Seaborn,
Matplotlib,
scikit-image,
TensorFlow (including Keras),
Scikit-learn,
Nilearn,
imageio,  
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
```
#Define your custom objects in a dictionary
custom_objects = {'dice_coef': dice_coef}

#Load the model with custom objects
model = load_model('/content/sample_model.h5', custom_objects=custom_objects)
```
11) Now you can visualize the data on the test sets.  

