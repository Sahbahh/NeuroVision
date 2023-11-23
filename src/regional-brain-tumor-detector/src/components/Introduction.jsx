import React from "react";
import "./Introduction.css";


export default function Introduction() {
    return (
        <section>
            <h1>Regional Brain Tumor Detector</h1>
            <h3>What is RBTD?</h3>
            <p>This is a web application that detects brain tumor from MRI scan data.</p>
            <small>*developed by SFU computer science students as course project</small>
            <h3>How to use?</h3>
            <p>
            <ol>
                <li>Upload an RMI scan data of [spec: something something e.g. 30x30]</li>
                <li>Click on “Analyze”</li>
                <li>Check out the results generated at the bottom of the screen</li>
            </ol>
            </p>
        </section>
    )
}