import React, { useState, useEffect } from "react";

// components
import Introduction from './components/Introduction';
import FileUploader from "./components/FileUploader";
import AnalysisDisplayer from './components/AnalysisDisplayer';

// styles
import './App.css';

// assets
import footerIcon from "./assets/footer-icon.png";



function App() {
  const [flair, setFileFlair] = useState(null)
  const [t1ce, setFileT1ce] = useState(null)

  const [output, setOutput] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(flair !== null && t1ce !== null)
  }, [flair, t1ce])



  const getResult = async () => {
    const data = new FormData()
    data.append('flair', flair)
    data.append('t1ce', t1ce)

    const options = {
        method: 'POST',
        body: data
    }

    try {
      const response = await fetch('http://localhost:5000/api/predict', options)
      const result = await response.json()

      if(response.status !== 200) {
        alert(result)
        return
      }

      setOutput(result['result'])
      // console.log(result)
    }catch(err) {
      alert(err)
    }
  }


  return (
    <div className="App">
      <main>
        <Introduction />
        <FileUploader flair={flair} t1ce={t1ce} setFileFlair={setFileFlair} setFileT1ce={setFileT1ce} />
        <section id="analysisControls">
          <button id="analyzeBtn" disabled={!ready} onClick={getResult}>Analyze</button>
        </section>
        {output && <AnalysisDisplayer output={output} />}
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
