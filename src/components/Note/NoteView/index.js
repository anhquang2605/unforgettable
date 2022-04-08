import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import firebase from './../../Firebase/firebase';
import NoteDeleteOverlay from './NoteDeleteOverlay';
import "./noteview.css";
const NoteView = (props) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingBody, setIsEditingBody] = useState(false);
    const [isSharingFormOn, setIsSharingFormOn] = useState(false);
    const [isDeletingNote, setIsDeletingNote] = useState(false);
    const [receiverUser, setReceiverUser] = useState("");
    const [receiverExist, setReceiverExist] = useState(true);
    const [notes, setNotes] =  useState([]);
    const todayDate = new Date();
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
        updateTheNote();
    }
    let settleBodyEdit = (e) => {
        e.preventDefault();
        toggleEditBody(e);
        updateTheNote();
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
    let updateTheNote = () => {
        let tempNotes = [...notes];
        tempNotes[id] = currentNote;
        let userRef = db.collection("accounts").doc(props.user);
        userRef.update({
            notes: tempNotes
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
                })
                setReceiverExist(true);
                toggleShareForm();
            } else {
                setReceiverExist(false);
            }
        })
    }
    let deleteNote = () =>{
        setTimeout(() => {
            db.collection("accounts").doc(props.user).update({
                notes: firebase.firestore.FieldValue.arrayRemove(notes[id]) 
            })
            history(-1);
        }, 1000);    
    }
    let toggleDeleteOverlay = () => {
        setIsDeletingNote(!isDeletingNote);
    }
    useEffect(() => {
        retrieveAllNote();
    }, []);
    useEffect(() => {
        if(notes){
            retrieveNotewithID();
        }
    }, [notes]);
    return (
        <div id="note-view">
            <NoteDeleteOverlay toggleOverlay = {toggleDeleteOverlay} deleteNote = {deleteNote} overlayOn={isDeletingNote}>
            </NoteDeleteOverlay>
            {currentNote && <React.Fragment>
                <h3 className="editable note-title">
                    {isEditingTitle?
                    <form>
                        <input type="text" autoFocus={true} value={currentNote.title} onChange={handleEditTitle}></input>
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
                        <textarea autoFocus={true} type="text" value={currentNote.body} onChange={handleEditBody}></textarea>
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
                {isEditingBody && <div className="redo-btn-group">
                    <button>Undo</button>
                    <button>Redo</button>
                </div>}
                {props.operation == "create" 
                && <div className="create-btn-group">
                    <button>Create</button>
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
                </form>
                }
            </React.Fragment>}

        </div>
    );
}

export default NoteView;
