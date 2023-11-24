import React, { useState, useEffect } from "react";
import './App.css';
// import * as onnx from "onnxruntime-web";
import { InferenceSession, Tensor } from "onnxruntime-web";

// components
import Introduction from './components/Introduction';
import FileUploader from "./components/FileUploader";
import AnalysisDisplayer from './components/AnalysisDisplayer';
import FilePreviewer from "./components/FilePreviewer";

// assets
import footerIcon from "./assets/footer-icon.png";

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

    alert("Warning!\nCurrently running ResNet50 from microsoft. Output has to be replaced with the actual output from our model.\nUpload 'sample-input-224x224.png' in regional-brain-tumor-detector/assets/ or any image file with dimension of 224x224 to test out this feature.")

    try {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = reader.result
        image.onload = async () => {

          const EXPECTED_WIDTH = 224;
          const EXPECTED_HEIGHT = 224;
          const width = image.width
          const height = image.height

          if(!(width === EXPECTED_WIDTH && height === EXPECTED_HEIGHT)) {
            alert("ERR: dimension of image has to be 324 x 324")
            return
          }

          const channels = 3; // RGB image
          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height
          const context = canvas.getContext("2d")
          context.drawImage(image, 0, 0, width, height)
          const imageData = context.getImageData(0, 0, width, height)

          const inputArray = new Float32Array(width * height * channels)
          for (let i = 0; i < width * height * channels; i++) {
            inputArray[i] = imageData.data[i] / 255.0;
          }
          
          const inputDimensions = [1, channels, EXPECTED_WIDTH, EXPECTED_HEIGHT];
          const inputTensor = new Tensor("float32", inputArray, inputDimensions);

          const feeds = { data: inputTensor };
          setOutput(await session.run(feeds))
        }
      }
      
      reader.readAsDataURL(files[0]);
    }catch(error) {
      console.log(error)
      alert(error)
    }
    // setOutput({})
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
