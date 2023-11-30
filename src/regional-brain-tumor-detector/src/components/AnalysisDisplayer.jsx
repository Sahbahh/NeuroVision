import React from "react";
import "./AnalysisDisplayer.css";

// assets
import sampleResultImg from '../assets/sample-result.png';

export default function AnalysisDisplayer() {
    return (
        <section>
          <h2>Analysis</h2>
          <img src={sampleResultImg} />
          <canvas id="output"></canvas>
        </section>
    )
}