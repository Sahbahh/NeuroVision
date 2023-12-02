import React from "react";
import "./FilePreviewer.css";

// assets
import deleteIcon from "../assets/trash.png"

function FilePreviewer({file, setFile}) {
    const deleteItem = () => {
        setFile(null)
    }


    const FileDisplay = (file) => {
        return(
            <div className="list-item">
                <p>{file.name}</p>
                <div>
                    <small>{file.size} Bytes</small>
                    <div className="control-buttons">
                        <button type="button"><img src={deleteIcon} onClick={deleteItem} alt={file.name} /></button>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <section id="fileListPreview">
            {FileDisplay(file)}
        </section>
    )
}



export default FilePreviewer;