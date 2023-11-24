import React from "react";
import "./FilePreviewer.css";

// assets
import downIcon from "../assets/down.png"
import deleteIcon from "../assets/trash.png"

function FilePreviewer({fileList, removeFile}) {
    const deleteItem = (e) => {
        removeFile(e.target.dataset.index)
    }


    const FileDisplay = (file, index) => {
        return(
            <div key={index} className="list-item">
                <p>{file.name}</p>
                <div>
                    <small>{file.size} Bytes</small>
                    <div className="control-buttons">
                        <button type="button"><img src={deleteIcon} onClick={deleteItem} alt={file.name} data-index={index} /></button>
                        {/* <button type="button"><img src={downIcon} alt="" /></button> */}
                    </div>
                </div>
            </div>
        )
    }
    return(
        <section id="fileListPreview">
            {fileList.map((item, index) => FileDisplay(item, index))}
        </section>
    )
}



export default FilePreviewer;