import userEvent from '@testing-library/user-event';
import firebase from './../Firebase/firebase';//import these to use the data base
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import NoteList from './NoteList';
import "./note.css";
const Note = (props) => {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState([]);
    let history = useNavigate();
    const [newNote, setNewNote] = useState({
        title: "",
        body: "",
        id: "", //current notes length - 1
        dateCreated: "",
        dateModified: "",
        locked: false,
        lockPassword: "",
        active: true
    });
    const db = firebase.firestore();

    let getUserFromDB = (userID) => {
        let docRef = db.collection("accounts").doc(userID).onSnapshot((doc)=>{
                setUser(doc.data());
        })
    }

    let setNotesFromUser = () => {
        let theNotes = user.notes;
        setNotes(theNotes);
    }
    let setLockForNote = (notePass, noteID)=> {
        
    }

    let shareNoteToAnotherUser = (noteID, userID) => {

    }

    let filterNotesBy = (notes, criteria) => {

    }

    let sortNotesBy = (notes, criteria, asc_desc) => {

    }

    useEffect(() => {
        if(props.user != ""){
            getUserFromDB(props.user);
        }
    }, []);
    useEffect(() => {
        if(user != null){
            setNotesFromUser()
        }
    }, [user]);
    return (
        <div id="my-note">
            {props.user}'s Notes 
            {notes.length != 0?
            <NoteList notes = {notes}></NoteList>
            : <div className="empty-note">
                There is no note currently
            </div>
            }
            <button id="add-new-note-btn" onClick={()=>{history("/note-view/create")}}>+ Add a new note</button>
        </div>
    );
}

export default Note;
