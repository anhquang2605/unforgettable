import React, {useState,useEffect} from 'react';
import { NOTE_SORT_OPTIONS } from '../../../constants/NotesSortOptions';
const NoteSorter = (props) => {
    const [sortCriteriaField, setSortCriteriaField] = useState(NOTE_SORT_OPTIONS[0]);//default sort by date-created
    const [sortCriteria, setSortCriteria] = useState("");
    const [asc, setAsc] = useState(false);
    const [order, setOrder] = useState(0);//0 for asc, 1 for desc
    let handleSortCriteria = (e) => {
        let wordList = e.target.value.split("-");
        let criteria = wordList[0];
        let wordLength = wordList.length;
        if ( wordLength> 0){
            let i = 1;
            for (i; i < wordLength; i+=1 ){
                criteria += wordList[i][0].toUpperCase() + wordList[i].substring(1);
            }
        }
        setSortCriteriaField(e.target.value);
        setSortCriteria(criteria);
        setAsc(false);
    }
    let handleOrder = () => {
        setAsc(!asc);
        let notes = [...props.notes];
        props.setFNotesForNote(notes.reverse());
    }
    useEffect(() => {
        if(props.notes && sortCriteria != ""){//Start sorting
            let newNotes = [...props.notes];

            newNotes.sort((a,b)=>{
                if(sortCriteria.includes("date")){
                    a = Date.parse(a[sortCriteria]);
                    b = Date.parse(b[sortCriteria]);
                } else {
                    a = a[sortCriteria].toLowerCase();
                    b = b[sortCriteria].toLowerCase();
                }
                if(a > b){
                    return -1;
                }else if(a < b){
                    return 1;
                }else{
                    return 0;
                }
            });
            props.setFNotesForNote(newNotes)
        }
    }, [sortCriteria]);
    return (
        <div className="note-sorter d-flex gap-2">
            <label>Sort By:</label>
            {
                <button className="btn btn-dark py-1" onClick={handleOrder}>
                    {asc ? "Ascending" : "Descending"}
                </button>
            }
            <select className="px-2" value={sortCriteriaField} onChange={handleSortCriteria}>
                {NOTE_SORT_OPTIONS.map((item, i) => (
                    <option key={item} value={item}>{item.split("-").map(word => {
                        let firstLeter = word[0].toUpperCase();
                        let restLetters = word.substring(1);
                        return firstLeter + restLetters;
                    }).join(" ")}</option>
                ))}
            </select>
        </div>
    );
}

export default NoteSorter;
