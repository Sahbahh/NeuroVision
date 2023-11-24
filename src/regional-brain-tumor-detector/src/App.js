import React, { useState, useEffect } from "react";
import './App.css';

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
  const [analyzeBtnEnabled, setanalyzeBtnEnabled] = useState(false)

  useEffect(() => {
    setanalyzeBtnEnabled(files.length === 0)
  }, [files])

  const removeFile = (index) => {
    const copiedList = files
    copiedList.splice(index, 1)
    setFiles([...copiedList])
  }

  const runModel = () => {
    alert("Running model: currently displaying dummy result. Output has to be replaced with the actual output from the model.")
    console.log("running model")
    setOutput({})
  }


  return (
    <div className="App">
      <main>
        <Introduction />
        <FileUploader fileList={files} updateFiles={setFiles} />
        <FilePreviewer fileList={files} removeFile={removeFile} />
        <section id="analysisControls">
          <button id="analyzeBtn" disabled={analyzeBtnEnabled} onClick={runModel}>Analyze</button>
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
