import userEvent from '@testing-library/user-event';
import firebase from './../Firebase/firebase';//import these to use the data base
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import NoteList from './NoteList';
import "./note.css";
import NoteFilter from './NoteFilter';
import NoteSorter from './NoteSorter';
import add from "../../images/add.svg";
import fwd from "../../images/fwd.svg";
import lock from "../../images/lock.svg";
import bin from "../../images/bin.png";
import write from "../../images/write.svg";

const Note = (props) => {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilterdNotes] = useState([]);
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
        setFilterdNotes(theNotes);
    }
    let setFNotesForNote =  (notes) => {//For children to update notes state.
        setFilterdNotes(notes);
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
        <div id="my-note" className="px-4 py-5">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="font">
                    Let’s Take some notes{" "}
                    <img
                        id="add-new-note-btn"
                        onClick={() => {
                            history("/note-view/create");
                        }}
                        style={{ width: "35px" }}
                        src={add}
                        alt=""
                        className="pointer"
                    />
                </h3>
                <div>
                    <NoteFilter
                        notes={notes}
                        setFNotesForNote={setFNotesForNote}
                    ></NoteFilter>
                </div>
                <div className="d-flex align-items-center gap-2 font">
                    <NoteSorter
                        notes={filteredNotes}
                        setFNotesForNote={setFNotesForNote}
                    ></NoteSorter>
                </div>
            </div>
            <br />
            <br />
            <NoteList user={props.user} notes={filteredNotes}></NoteList>
        </div>
    );
};

export default Note;
