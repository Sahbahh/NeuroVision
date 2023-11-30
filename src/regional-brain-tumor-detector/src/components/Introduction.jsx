import React from "react";
import "./Introduction.css";


export default function Introduction() {
    return (
        <section>
            <h1>Regional Brain Tumor Detector</h1>
            <h3>What is RBTD?</h3>
            <p>This is a web application that detects and locates a brain tumor if any from MRI scans.</p>
            <small>*developed by SFU computer science students as course project</small>
            <h3>How to use?</h3>
            <p>
            <ol>
                <li>Upload black and white single channel images of dimension [124 x 124]</li>
                <li>Click on “Analyze”</li>
                <li>Check out the results generated at the bottom</li>
            </ol>
            </p>
        </section>
    )
}