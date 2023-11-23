import logo from './logo.svg';
import sampleResultImg from './sample-result.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <h1>Regional Brain Tumor Detector</h1>
        <h2>What is RBTD?</h2>
        <p>This is a web application that detects brain tumor from MRI scan data.</p>
        <small>*developed by SFU computer science students as course project</small>
        <h2>How to use?</h2>
        <p>
          <ol>
            <li>Upload an RMI scan data of [spec: something something e.g. 30x30]</li>
            <li>Click on “Analyze”</li>
            <li>Check out the results generated at the bottom of the screen</li>
          </ol>
        </p>
        <section>
          <h2>File Upload</h2>
          <figure id="uploader"></figure>
        </section>
        <section>
          <h2>Analysis</h2>
          <img src={sampleResultImg} />
        </section>
      </main>
      <footer>
        <div>
          <p>Regional Brain Tumor Detector</p>
          <p>Developed by CMPT340 Raccoons' Supremacy Team</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
