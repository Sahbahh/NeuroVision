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



function App() {
  const [files, setFiles] = useState([])
  const [output, setOutput] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(files.length > 0)
  }, [files])


  useEffect(() => {
    if(output !== null && output !== undefined) {
      console.log("output:")
      console.log(output)
    }
  }, [output])


  const removeFile = (index) => {
    const copiedList = files
    copiedList.splice(index, 1)
    setFiles([...copiedList])
  }



  const getResult = async () => {
    console.log("Requesting output from Flask server.")

    const data = new FormData()
    data.append('file', files[0]) // TODO: iterate over all files uploaded

    const options = {
        method: 'POST',
        body: data
    }

    const response = await fetch('http://localhost:5000/api/predict', options)
    const result = await response.json()

    if(response.status !== 200) {
      alert(result)
      return
    }

    console.log(result)
  }


  return (
    <div className="App">
      <main>
        <Introduction />
        <FileUploader fileList={files} updateFiles={setFiles} />
        <FilePreviewer fileList={files} removeFile={removeFile} />
        <section id="analysisControls">
          <button id="analyzeBtn" disabled={!ready} onClick={getResult}>Analyze</button>
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
