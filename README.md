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
Record a short video (1:40 - 2 minutes maximum) or gif or a simple screen recording or even using PowerPoint with audio or with text, showcasing your work.

Our video can be found on YouTube using the following URL:

## Table of Contents
1. [Demo](#demo)

2. [Installation](#installation)

3. [Reproducing this project](#repro)


<a name="demo"></a>
## 1. Example demo

A minimal example to showcase your work



### What to find where

Where to find out files:
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
### System specifications we ran out program on:
CSIL workstation: ASB9700 (used machine asb9700-h07)
OS: LINUX Ubuntu 20.04
GPU: GeForce RTX 2080
CPU model/make: Intel(R) Core(TM) i9-9900 CPU @ 3.10GHz
Socket(s): 1
Core(s) per socket: 8
Thread(s) per core: 2
Total memory: 31Gi

### Windows system specifications we ran out program on:
Device name	LAPTOP-9MHQ0U9R
Processor	Intel(R) Core(TM) i5-9300HF CPU @ 2.40GHz   2.40 GHz
Installed RAM	8.00 GB
Device ID	B002CCA2-DB2A-4413-9699-B8AF847FD080
Product ID	00327-35905-98426-AAOEM
System type	64-bit operating system, x64-based processor
Pen and touch	No pen or touch input is available for this display


<a name="repro"></a>
## 3. Reproduction
Demonstrate how your work can be reproduced, e.g. the results in your report.
```bash
mkdir tmp && cd tmp
wget https://yourstorageisourbusiness.com/dataset.zip
unzip dataset.zip
conda activate amazing
python evaluate.py --epochs=10 --data=/in/put/dir
```
Data can be found at ...
Output will be saved in ...

