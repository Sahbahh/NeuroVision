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

  useEffect(() => {
    // console.log(files)// debug
  }, [files])

  const removeFile = (index) => {
    const copiedList = files
    copiedList.splice(index, 1)
    setFiles([...copiedList])
  }


  return (
    <div className="App">
      <main>
        <Introduction />
        <FileUploader fileList={files} updateFiles={setFiles} />
        <FilePreviewer fileList={files} removeFile={removeFile} />
        <AnalysisDisplayer />
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
