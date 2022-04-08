import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import firebase from './../../Firebase/firebase';
import NoteDeleteOverlay from './NoteDeleteOverlay';
import OverlayMessage from '../../HelperComponents/OverlayMessage';
import "./noteview.css";
const NoteView = (props) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingBody, setIsEditingBody] = useState(false);
    const [isSharingFormOn, setIsSharingFormOn] = useState(false);
    const [isDeletingNote, setIsDeletingNote] = useState(false);
    const [receiverUser, setReceiverUser] = useState("");
    const [receiverExist, setReceiverExist] = useState(true);
    const [triggerMessageOverlay1, setTriggerMessageOverlay1] = useState(false);
    const [triggerMessageOverlay2, setTriggerMessageOverlay2] =  useState(false);
    const [trigger3, setTrigger3] = useState(false);
    const [trigger4, setTrigger4] = useState(false);
    const [notePassInput, setNotePassInput] = useState("");
    const [newNotePass, setNewNotePass] = useState("");
    const [removePassLock, setRemovePassLock] = useState("");
    const [wrongPassCode, setWrongPassCode] = useState(false);
    const [notes, setNotes] =  useState([]);
    const [currentNote, setCurrentNote] = useState(
        {
            title: "",
            body: "",
            dateCreated: "",
            dateModified: "",
            id: "",
            lockPassword: "",
            locked: false,
            active: true,
        }
    )
    const [finalNote, setFinalNote] = useState(); 
    const {id} = useParams();
    let history = useNavigate();
    const db = firebase.firestore();
    let handleEditTitle = (e) => {
        let theNote = {...currentNote};
        theNote.title = e.target.value;
        setCurrentNote(theNote);
    }
    let handleEditBody = (e) => {
        let theNote = {...currentNote};
        theNote.body = e.target.value;
        setCurrentNote(theNote);
    }
    let settleTitleEdit = (e) => {
        e.preventDefault();
        toggleEditTitle(e);
        if(props.operation === "edit"){
            updateTheNote();
        }
    }
    let settleBodyEdit = (e) => {
        e.preventDefault();
        toggleEditBody(e);
        if(props.operation === "edit"){
            updateTheNote();
        }
    }
    let toggleEditTitle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsEditingTitle(!isEditingTitle);
    }
    let toggleEditBody = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsEditingBody(!isEditingBody);
    }
    let updateTheNote = (op) => {
        let tempNotes = [...notes];
        let todayDate = new Date();
        let theNote = {...currentNote};
        theNote.dateModified = todayDate.toLocaleDateString();
        if(op === "delete"){
            theNote.active = false;
        } else if( op === "lock"){
            theNote.locked = !theNote.locked;
            theNote.lockPassword = theNote.locked ? newNotePass : "";
        }
        if(props.operation === "create"){
            theNote.dateCreated = todayDate.toLocaleDateString();
            theNote.id = String(tempNotes.length);
            tempNotes.push(theNote);
        } else {
            tempNotes[id] = theNote;
        }
        let userRef = db.collection("accounts").doc(props.user);
        userRef.update({
            notes: tempNotes
        }).then(()=>{
            console.log("Done");
        })
    }
    let bodyTextHistoryStack = [];//handle undo and previous buttons
    let retrieveAllNote = () => {
        if(props.user != ""){
            db.collection("accounts").doc(props.user).onSnapshot((doc)=>{
                let theNotes = doc.data().notes;
                setNotes(theNotes);
            })
        }
    }
    let retrieveNotewithID = () => {
        if(notes.length > 0){//only deal with integer id
            setCurrentNote(notes[id]);
        }
    }
    let toggleShareForm = () =>{
        setIsSharingFormOn(!isSharingFormOn);
    }
    let handleReceiverUserNameInput = (e) => {
        e.preventDefault();
        setReceiverUser(e.target.value);
    }
    let checkReceiverExist = (e) => {
        e.preventDefault();
        let user = db.collection("accounts").doc(receiverUser);
        user.get().then((doc)=>{
            if(doc.exists){
                db.collection("accounts").doc(receiverUser).update({
                    notes: firebase.firestore.FieldValue.arrayUnion(notes[id]) 
                }).then(()=>{
                    console.log("shared");
                })
                setReceiverExist(true);
                toggleShareForm();
            } else {
                setReceiverExist(false);
            }
        })
    }
    let deleteNote = () =>{
       updateTheNote("delete");
       setTimeout(() => {
           history(-1);
       }, 1000);
        
    }
    let toggleDeleteOverlay = () => {
        setIsDeletingNote(!isDeletingNote);
    }
    let createNewNote = () => {
        updateTheNote();
        setTriggerMessageOverlay1(true);
        setTimeout(() => {
            setTriggerMessageOverlay1(false);
            history(-1)
        }, 1000);
    }
    let unlockNote = ()=>{
        if(currentNote.lockPassword === notePassInput){
            setWrongPassCode(false);
            setTriggerMessageOverlay2(false);
            let noteForm = document.getElementsByClassName("note-form")[0];
            noteForm.style.display = "block";
        } else {
            setWrongPassCode(true);
        }
    }
    let handleNotePass = (e) =>{
        setNotePassInput(e.target.value);
    }
    let handleAddLock = () => {
        //have a form pop up asking for the input
        setTrigger3(true);
    }   
    let handleRemoveLock = () => {
        //Enter passcode again to remove lock
        setTrigger4(true);
    }
    let removeLock = () => {//when click confirm in the pass lock removal form
        if(currentNote.lockPassword === removePassLock){
            let lockmesshead = document.getElementsByClassName("remove-lock-header")[0];
            lockmesshead.innerHTML = "Lock removed";
            setWrongPassCode(false);
            updateTheNote("lock");
            setTimeout(() => {
                setTrigger4(false);
            }, 1000);
        }else {
            setWrongPassCode(true);
        }
    }
    let handleRemovePassLock = (e) => {//Handle form input for pass lock removal
        setRemovePassLock(e.target.value);
    }
    let handleNewNotePass = (e) => {
        setNewNotePass(e.target.value);
    }
    let createNewLock = () => {
        updateTheNote("lock")
        setTrigger3(false);
    }
    useEffect(() => {
        retrieveAllNote();
        if (props.operation === "create"){//Form focused if create a new note
            setIsEditingTitle(true);
            setIsEditingBody(true);
        }
    }, []);
    useEffect(() => {
        if(notes && props.operation == "edit"){
            retrieveNotewithID();
        }
    }, [notes]);
    useEffect(() => {
        if(currentNote.locked === true){
            setTriggerMessageOverlay2(true);
            let noteForm = document.getElementsByClassName("note-form")[0];
            noteForm.style.display = "none";
        }
    }, [currentNote]); 
    return (
        <div id="note-view">
            <NoteDeleteOverlay toggleOverlay = {toggleDeleteOverlay} deleteNote = {deleteNote} overlayOn={isDeletingNote}>
            </NoteDeleteOverlay>
            {currentNote && <div className="note-form">
                <div className="options-buttons">
                    {isEditingBody && <div className="redo-btn-group">
                        <button>Undo</button>
                        <button>Redo</button>
                    </div>}
                    {props.operation == "create" 
                    && <div className="create-btn-group">
                        <button disabled={currentNote.title == "" || currentNote.body == ""} onClick={createNewNote}>Create</button>
                        <button onClick={() => {history(-1)}}>Cancel</button>
                    </div>}
                    {props.operation == "edit" 
                    && <div className="edit-btn-group">
                        {!isSharingFormOn && <button onClick={toggleShareForm}>Share</button>}
                        <button onClick={toggleDeleteOverlay}>Delete</button>
                        <button onClick={() => {history(-1)} }>Back</button>
                    </div>}
                    {isSharingFormOn && 
                    <form id="sharing-form">
                        {!receiverExist&&<span className="error receiver-not-exist">The receiver not exist, please try again</span>}
                        <label>Share to username:</label>
                        <input type="text" value={receiverUser} onChange={handleReceiverUserNameInput}></input>
                        <button onClick={checkReceiverExist}>Share this note</button>
                        <button onClick={()=>{
                            setIsSharingFormOn(false);
                        }}>Cancel Sharing</button>
                    </form>
                    }
                    {currentNote.locked ? 
                    <React.Fragment>
                    <button onClick={handleRemoveLock}>Remove Lock</button>
                    </React.Fragment> 
                    : 
                    <button onClick={handleAddLock}>Add Lock</button>}
                </div>
                <h3 className="editable note-title">
                    {isEditingTitle?
                    <form>
                        <input placeholder='Enter title name' type="text" autoFocus={true} value={currentNote.title} onChange={handleEditTitle}></input>
                        <button onClick={settleTitleEdit}>Done</button>
                    </form>:
                    <div className="content" onClick={toggleEditTitle} title="Edit the title">
                        {currentNote.title}
                    </div>
                    }
                </h3>
                <div className="editable note-body">
                    {isEditingBody?
                    <form>
                        <textarea placeholder='Enter note here' autoFocus={true} type="text" value={currentNote.body} onChange={handleEditBody}></textarea>
                        <button onClick={settleBodyEdit}>Done</button>
                    </form>:
                    <div className="content"onClick={toggleEditBody} title="Edit the body" >
                        {currentNote.body.split("\n").map((p)=>{
                            return(
                                <p key={p}>
                                    {p}
                                </p>
                            )
                        })}
                    </div>
                    }
                </div>

            </div>}
            <OverlayMessage toggle={triggerMessageOverlay1}  id="overlay-creating-note">Creating new note</OverlayMessage>
            <OverlayMessage toggle={triggerMessageOverlay2} id="overlay-lock-note">
                {wrongPassCode && <p className="wrong-lock-pass error">Wrong passcode, Please try again</p>}
                <h3>This note is locked, please enter the password</h3>
                <input type="password" value={notePassInput} onChange={handleNotePass}></input>
                <button onClick={unlockNote}>Unlock the note</button>
                <button onClick={()=>{
                    history(-1);
                }}>Cancel</button>
            </OverlayMessage>
            <OverlayMessage toggle={trigger3} id="creating-lock">
                <h3 className="lock-message">Please provide passcode for the lock</h3>
                <input type="text" value={newNotePass} onChange={handleNewNotePass}></input>
                <button onClick={createNewLock}>Confirm code</button>
                <button onClick={()=>{setTrigger3(false)}}>Cancel</button>
            </OverlayMessage>
            <OverlayMessage toggle={trigger4} id="remove-lock">
                {wrongPassCode && <p className="wrong-lock-pass error">Wrong passcode, Please try again</p>}
                <div className="remove-lock-header">
                    <h3>Provide the passcode to remove the lock</h3>
                    <input type="text" value={removePassLock} onChange={handleRemovePassLock}></input>
                    <button onClick={removeLock}>Confirm code</button>
                    <button onClick={()=>{setTrigger4(false)}}>Cancel</button>
                </div>
            </OverlayMessage>
        </div>
    );
}

export default NoteView;
