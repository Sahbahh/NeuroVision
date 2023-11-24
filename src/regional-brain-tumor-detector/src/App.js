import React, { useState, useEffect } from "react";
import './App.css';
import { InferenceSession, Tensor } from "onnxruntime-web";

// components
import Introduction from './components/Introduction';
import FileUploader from "./components/FileUploader";
import AnalysisDisplayer from './components/AnalysisDisplayer';
import FilePreviewer from "./components/FilePreviewer";

// assets
import footerIcon from "./assets/footer-icon.png";

// utils
import InputBuilder from "./utils/InputBuilder";

function App() {
  const [files, setFiles] = useState([])
  const [output, setOutput] = useState(null)
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)

  useEffect(() => {
    async function loadModel() {
      setSession(await InferenceSession.create(
        'https://microsoft.github.io/onnxjs-demo/resnet50v2.onnx',// replace with our model
        {
          executionProviders: ["webgl"],
        }
      ))
    }
    loadModel()

  }, [])

  useEffect(() => {
    setReady(files.length > 0)
  }, [files])
  useEffect(() => {
    if(output !== null && output !== undefined) {
      console.log("output:")
      console.log(output)
      // const prediction = output.resnetv24_dense0_fwd.data
      // console.log(prediction.indexOf(Math.max(...prediction)))
    }
  }, [output])


  const removeFile = (index) => {
    const copiedList = files
    copiedList.splice(index, 1)
    setFiles([...copiedList])
  }


  const runModel = async () => {
    if(session === null) {
      alert("Machine learning model has not been loaded yet. Please try again.")
      return
    }

    if(!ready) {
      alert("ERR: input images not provided")
      return
    }

    let inputBuilder = new InputBuilder()


    alert("Warning!\nCurrently running ResNet50 from microsoft. Output has to be replaced with the actual output from our model.\nUpload 'sample-input-224x224.png' in regional-brain-tumor-detector/assets/ or any image file with dimension of 224x224 to test out this feature.")

    try {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = reader.result
        image.onload = async () => {
          setOutput(await session.run(inputBuilder.buildFromImage(image)))
        }
      }
      
      reader.readAsDataURL(files[0]);
    }catch(error) {
      console.log(error)
      alert(error)
    }
  }


  return (
    <div className="App">
      <main>
        <Introduction />
        <FileUploader fileList={files} updateFiles={setFiles} />
        <FilePreviewer fileList={files} removeFile={removeFile} />
        <section id="analysisControls">
          <button id="analyzeBtn" disabled={!ready} onClick={runModel}>Analyze</button>
        </section>
        {output && <AnalysisDisplayer />}
      </main>
      <footer>
        <div className="wrapper">
          <div>
            <p>Regional Brain Tumor Detector</p>
            <p>Developed by CMPT340 Raccoons' Supremacy Team</p>
          </div>
          <div>
            <img id="footerIcon" src={footerIcon} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
