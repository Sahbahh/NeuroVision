import React from "react";
import "./FileUploader.css";

// assets
import UploadIcon from "../assets/upload-icon.png";

// components
import FilePreviewer from "./FilePreviewer";

function FileUploader({flair, t1ce, setFileFlair, setFileT1ce}) {

    const handleFlairUpload = (e) => {
        if(e.target.files.length > 0) {
            setFileFlair(e.target.files[0])
        }
    }

    const handleT1ceUpload = (e) => {
        if(e.target.files.length > 0) {
            setFileT1ce(e.target.files[0])
        }
    }


    return (
        <section>
          <h2>File Upload</h2>
          <section>
            <h3>MRI sequences: fluid attenuated inversion recovery (FLAIR)</h3>
            <figure id="uploader">
                <div>
                    <img id="uploadIcon" src={UploadIcon} alt="upload-icon" />
                    <p>Drag and drop a file here</p>
                </div>
                <div id="divider">
                    <div className="line"></div>
                    <span className="text">or</span>
                    <div className="line"></div>
                </div>
                <div>
                    <p>Click to browse files</p>
                </div>
                <input type="file" title="" accept=".nii" onChange={handleFlairUpload} />
            </figure>
            {flair !== null && <FilePreviewer file={flair} setFile={setFileFlair} />}
          </section>

          <section>
            <h3>MRI sequences: T1-contrast-enhanced (T1ce)</h3>
            <figure id="uploader">
                <div>
                    <img id="uploadIcon" src={UploadIcon} alt="upload-icon" />
                    <p>Drag and drop a file here</p>
                </div>
                <div id="divider">
                    <div className="line"></div>
                    <span className="text">or</span>
                    <div className="line"></div>
                </div>
                <div>
                    <p>Click to browse files</p>
                </div>
                <input type="file" title="" accept=".nii" onChange={handleT1ceUpload} />
            </figure>
            {t1ce !== null && <FilePreviewer file={t1ce} setFile={setFileT1ce} />}
          </section>
        </section>
    )
}

export default FileUploader;