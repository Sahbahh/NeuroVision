import React, { useState, useEffect } from "react";

// components
import Introduction from './components/Introduction';
import FileUploader from "./components/FileUploader";
import AnalysisDisplayer from './components/AnalysisDisplayer';
import FilePreviewer from "./components/FilePreviewer";

// styles
import './App.css';

// assets
import footerIcon from "./assets/footer-icon.png";

// utils
import Model from "./utils/ModelWrapper";


function App() {
  const [files, setFiles] = useState([])
  const [output, setOutput] = useState(null)
  const [ready, setReady] = useState(false)
  const model = new Model()

  useEffect(() => {
    async function loadModel() {
      await model.load()
    }
    loadModel()
  }, [])

  useEffect(() => {
    setReady(files.length > 0)
  }, [files])
  useEffect(() => {
    if(output !== null && output !== undefined) {
      console.log("output:")
      console.log(output[96])

      const canvas = document.getElementById("output")
      model.displayOutput(output[96], canvas)
    }
  }, [output])


  const removeFile = (index) => {
    const copiedList = files
    copiedList.splice(index, 1)
    setFiles([...copiedList])
  }


  const runModel = async () => {
    if(!model.ready()) {
      alert("Machine learning model has not been loaded yet. Please try again.")
      return
    }

    if(!ready) {
      alert("ERR: input images not provided")
      return
    }


    try {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = reader.result
        image.onload = async () => {
          setOutput(await model.run(image))
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
