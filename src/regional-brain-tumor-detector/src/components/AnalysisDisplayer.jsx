import React from "react";
import "./AnalysisDisplayer.css";


export default function AnalysisDisplayer({output}) {
    return (
        <section>
          <h2>Analysis</h2>
          <div id="output">
            {output.map((slice, index) => (
              <img src={`data:image/png;base64,${slice}`} key={index} />
            ))}
          </div>
        </section>
    )
}
