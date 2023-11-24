import React, { useRef } from "react";
import "./FileUploader.css";

// assets
import UploadIcon from "../assets/upload-icon.png";

function FileUploader({fileList, updateFiles}) {
    const wrapperRef = useRef(null)

    const onDragEnter = () => {
        wrapperRef.current.classList.add('focus')
    }
    const onDragLeave = () => {
        wrapperRef.current.classList.remove('focus')
    }
    const onDrop = () => {
        wrapperRef.current.classList.remove('focus')
    }
    const handleFileUpload = (e) => {
        if(e.target.files.length > 0) {
            updateFiles([...fileList, e.target.files[0]])
        }
    }

    return (
        <section>
          <h2>File Upload</h2>
          <figure id="uploader" ref={wrapperRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
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