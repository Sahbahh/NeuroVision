import React from "react";
import "./Introduction.css";


export default function Introduction() {
    return (
        <section id="intro">
            <h1>Regional Brain Tumor Detector</h1>
            <h3>How to use?</h3>
            <ol>
                <li>Upload two MRI sequences of a patient</li>
                <li>Click on “Analyze”</li>
                <li>Check out the results generated at the bottom</li>
            </ol>
            <h3>Upload file specification</h3>
            <p>Files must be in .nii format with single channel image slices of dimension 128x128.</p>
        </section>
    )
}