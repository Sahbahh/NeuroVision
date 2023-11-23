import React from "react";
import "./FileUploader.css";

// assets
import UploadIcon from "../assets/upload-icon.png";

export default function FileUploader() {
    function uploadFile(e) {
        console.log(this.target)
    }
    return (
        <section>
          <h2>File Upload</h2>
          <figure id="uploader">
            <div>
                <img id="uploadIcon" src={UploadIcon} alt="upload-icon" />
                <p>Drag and drop files here</p>
            </div>
            <div id="divider">
                <div class="line"></div>
                <span class="text">or</span>
                <div class="line"></div>
            </div>
            <div>
                {/* <input id="uploadButton" type="file" accept="jpeg png" title="Browse Files" /> */}
                <button id="uploadButton" onChange={uploadFile}>Browse Files</button>
            </div>
          </figure>
        </section>
    )
}