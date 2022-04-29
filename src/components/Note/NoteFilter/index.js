import React, { useState, useRef, useEffect } from 'react';

const NoteFilter = (props) => {
    const [filterInput, setFilterInput] = useState("");
    let handleFilterInput = (e) => {
        setFilterInput(e.target.value);
    }
    useEffect(() => {
        if(props.notes){
            if(props.notes.length > 0){
                let filterednotes = props.notes.filter(note=>{
                    return note.title.includes(filterInput);
                })
                props.setFNotesForNote(filterednotes);
            }
        }
    }, [filterInput]);

    return (
        <div className="note-filter">
            <input type="text" value={filterInput} onChange={handleFilterInput} placeholder="search for note title" ></input>
        </div>
    );
}

export default NoteFilter;
