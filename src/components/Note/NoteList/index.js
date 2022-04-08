import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notelist.css';
const NoteList = (props) => {
    let history = useNavigate();
    let handleNoteViewing = (e,id) => {
        history("/note-view/" + id);
    }
    let allowLengthForTextToBeDisplay = 70;
    let transformExeceedText = (txt) => {
        return txt.substring(0,allowLengthForTextToBeDisplay) + "..."
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
                                    <button onClick={()=>{}}>Share</button>
                                    <button onClick={()=>{}}>Delete</button>
                                </div>
                            </div>
                        )
                    }    
                }
            )
            :
            <div>
                No note created yet
            </div>
            }
        </div>
    );
}

export default NoteList;
