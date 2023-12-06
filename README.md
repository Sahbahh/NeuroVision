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

4. [Guidance](#guide)


<a name="demo"></a>
## 1. Example demo

A minimal example to showcase your work

```python
from amazing import amazingexample
imgs = amazingexample.demo()
for img in imgs:
    view(img)
```

### What to find where

Explain briefly what files are found where

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

Provide sufficient instructions to reproduce and install your project. 
Provide _exact_ versions, test on CSIL or reference workstations.

```bash
git clone $THISREPO
cd $THISREPO
conda env create -f requirements.yml
conda activate amazing
```

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

<a name="guide"></a>
## 4. Guidance

- Use [git](https://git-scm.com/book/en/v2)
    - Do NOT use history re-editing (rebase)
    - Commit messages should be informative:
        - No: 'this should fix it', 'bump' commit messages
        - Yes: 'Resolve invalid API call in updating X'
    - Do NOT include IDE folders (.idea), or hidden files. Update your .gitignore where needed.
    - Do NOT use the repository to upload data
- Use [VSCode](https://code.visualstudio.com/) or a similarly powerful IDE
- Use [Copilot for free](https://dev.to/twizelissa/how-to-enable-github-copilot-for-free-as-student-4kal)
- Sign up for [GitHub Education](https://education.github.com/) 
