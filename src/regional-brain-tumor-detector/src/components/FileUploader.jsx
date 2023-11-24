import React from "react";
import "./FileUploader.css";

// assets
import UploadIcon from "../assets/upload-icon.png";

function FileUploader({fileList, updateFiles}) {

    const handleFileUpload = (e) => {
        if(e.target.files.length > 0) {
            updateFiles([...fileList, e.target.files[0]])
        }
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
                <div className="line"></div>
                <span className="text">or</span>
                <div className="line"></div>
            </div>
            <div>
                <p>Click to browse files</p>
            </div>
            <input type="file" title="" onChange={handleFileUpload} />
          </figure>
        </section>
    )
}

export default FileUploader;