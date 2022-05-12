import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import './notelist.css';
import fwd from "../../../images/fwd.svg";
import lock from "../../../images/lock.svg";
import bin from "../../../images/bin.png";
import write from "../../../images/write.svg";

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
            <div className="container-fluid px-0">
                <div className="row gx-5">
                    {props.notes.length ? (
                        props.notes.map((note) => {
                            if (note.active) {
                                return (
                                    <div
                                        // className="list-note-item col-4"
                                        className="col-4" key={note.id} id={"note-" + note.id} >
                                        <div className="edit_column">
                                            <div className="d-flex align-items-center justify-content-between w-100 border-bottom border-4 border-dark pb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <h5 className="mb-0 fw-bold">{note.title}</h5>
                                                    {/* <img style={{ width: "30px" }} src={lock} alt="" /> */}
                                                </div>
                                                <div>
                                                    <img
                                                        onClick={(e) => { triggerNoteSharing(e, note.id); }} style={{ width: "30px" }} src={fwd} alt="" className="pointer" />

                                                    <div
                                                        className="overlay-small d-flex gap-3 align-items-center justify-content-center position-fixed"
                                                        id={"share-note-" + note.id}
                                                    >
                                                        {reciverExistList[note.id] && (
                                                            <p className="error-user-no-exist">
                                                                User does not exist, please try again
                                                            </p>
                                                        )}
                                                        <span className="form-element d-flex gap-3">
                                                            <label className="fw-bold font">Share to:</label>
                                                            <input
                                                                type="text"
                                                                onChange={(e) => {
                                                                    handleShareUser(e, note.id);
                                                                }}
                                                                value={shareToUserList[note.id]}
                                                                placeholder="Enter recipient's username"
                                                                className="form-control font"
                                                            ></input>
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                shareNote(note.id);
                                                            }}
                                                            className="btn btn-dark font"
                                                        >
                                                            Confirm Sharing
                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                closeSmOverlay(note.id, "share");
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="h3 font">
                                                {!note.locked
                                                    ? note.body.length > allowLengthForTextToBeDisplay
                                                        ? transformExeceedText(note.body)
                                                        : note.body
                                                    : "Locked"}
                                            </p>

                                            <div className="d-flex justify-content-between w-100">
                                                <img
                                                    onClick={() => {
                                                        deleteNote(note.id);
                                                    }}
                                                    style={{ width: "30px" }}
                                                    src={bin}
                                                    className="pointer"
                                                />
                                                <img
                                                    onClick={(e) => {
                                                        handleNoteViewing(e, note.id);
                                                    }}
                                                    style={{ width: "30px" }}
                                                    src={write}
                                                    className="pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <div>No result :(</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteList;
