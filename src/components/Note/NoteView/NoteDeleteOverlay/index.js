import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notedeleteoverlay.css'
const NoteDeleteOverlay = (props) => {
    let handleYes = () => {
        let messBox = document.getElementsByClassName("message-box")[0];
        let deleteBox = document.getElementsByClassName("deleting")[0];
        messBox.classList.add("hide-away");
        deleteBox.classList.remove("hide-away");
        props.deleteNote();
    }
    let handleCancel = () =>{
        props.toggleOverlay();
    }
    return (
        <div className={"note-delete-overlay" + (props.overlayOn? "" : " gone")}>
            <div className="message-box">
                <p>Delete this note?</p>
                <button onClick={handleYes}> Yes</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
            <div className="deleting hidden-message hide-away">
                Deleting the note...Redirecting to the previous page
            </div>
        </div>
    );
}

export default NoteDeleteOverlay;
