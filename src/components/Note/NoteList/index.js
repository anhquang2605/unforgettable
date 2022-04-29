import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import './notelist.css';
const NoteList = (props) => {
    const [shareToUserList, setShareToUser] = useState({});
    const [reciverExistList, setReceiverExistList] = useState({});
    const db = firebase.firestore();
    let history = useNavigate();
    let handleNoteViewing = (e,id) => {
        history("/note-view/" + id);
    }
    let allowLengthForTextToBeDisplay = 70;
    let transformExeceedText = (txt) => {
        return txt.substring(0,allowLengthForTextToBeDisplay) + "..."
    }
    let triggerNoteSharing = (e, id) =>{
        let overlayId = "share-note-" + id;
        turnOnOverlay(overlayId);
    }
    let triggerNoteDeleting = (e, id) =>{
        let overlayId = "delete-note-" + id;
        turnOnOverlay(overlayId);
    }
    let turnOnOverlay = (overlayid) => {
        let theoverlay = document.getElementById(overlayid);
        theoverlay.classList.add("revealing-sm-overlay"); 
    }
    let handleShareUser = (e,id) => {
        let list = {...shareToUserList};
        list[id] = e.target.value;
        setShareToUser(list);
    }
    let closeSmOverlay = (id,type) =>{
        if(type === "share"){
            let list = {...shareToUserList};
            list[id] = "";
            setShareToUser(list);
        }
        let theoverlay = document.getElementById(type+"-note-"+id);
        theoverlay.classList.remove("revealing-sm-overlay"); 
    }
    let shareNote = (id) => {
        let notes = [...props.notes];
        let receiverErrorCodes = {...reciverExistList};
        let user = db.collection("accounts").doc(shareToUserList[id]);
        user.get().then((doc)=>{
            if(doc.exists){
                db.collection("accounts").doc(shareToUserList[id]).update({
                    notes: firebase.firestore.FieldValue.arrayUnion(notes[id]) 
                }).then(()=>{
                    console.log("shared");
                    receiverErrorCodes[id] = false;
                    setReceiverExistList(receiverErrorCodes);
                    closeSmOverlay(id,"share");
                })
            } else {
                receiverErrorCodes[id] = true;
                setReceiverExistList(receiverErrorCodes);
            }
        })
    }
    let deleteNote = (id) => {
        let tempNotes = [...props.notes];
        tempNotes[id].active = false;
        let userRef = db.collection("accounts").doc(props.user);
        userRef.update({
            notes: tempNotes
        }).then(()=>{
            console.log("Done");
        })

    }
    return (
        <div id="note-list">
            {props.notes.length?
            props.notes.map((note)=>
                {
                    if (note.active){
                        return (
                            <div className="list-note-item" key={note.id} id={"note-" + note.id}>
                                <div className="click-container" onClick={(e)=>{handleNoteViewing(e,note.id)}}>
                                    <div className="note-props note-title">{note.title}</div>
                                    <div className="note-props note-modified-date">{note.dateModified}</div>
                                    {<div className="note-props note-body">{!note.locked ?(note.body.length > allowLengthForTextToBeDisplay ? transformExeceedText(note.body) : note.body) : "Locked" }</div>}
                                </div>
                                <div className="extra-function-btn">
                                    <button onClick={(e)=>{triggerNoteSharing(e,note.id)}}>Share</button>
                                    <button onClick={(e)=>{triggerNoteDeleting(e,note.id)}}>Delete</button>
                                </div>
                                <div className="overlay-small" id={"share-note-" + note.id}>
                                    {reciverExistList[note.id] && <p className="error-user-no-exist">User does not exist, please try again</p>}
                                    <span className="form-element">
                                        <label>Share to:</label>
                                        <input type="text" onChange={ (e) => {handleShareUser(e,note.id)}} value={shareToUserList[note.id]} placeholder="Enter recipient's username"></input>
                                    </span>
                                    <button onClick={()=>{shareNote(note.id)}}>Confirm Sharing</button>
                                    <button onClick={ () => {closeSmOverlay(note.id,"share")}}>Cancel</button>
                                </div>
                                <div className="overlay-small" id={"delete-note-" + note.id}>
                                    <p>Delete this note?</p>
                                    <div className="button-group">
                                        <button onClick={()=>{deleteNote(note.id)}}>Confirm</button>
                                        <button onClick={ () => {closeSmOverlay(note.id,"delete")}} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }    
                }
            )
            :
            <div>
                No result :(
            </div>
            }
        </div>
    );
}

export default NoteList;
