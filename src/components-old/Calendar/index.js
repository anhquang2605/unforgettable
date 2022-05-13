import React from 'react';
import './calendar.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import firebase from '../Firebase/firebase';
const Calendar = (props) => {
    const db = firebase.firestore();
    const history = useNavigate();
    return (
        <div id="calendar">
            <header className="App-header">
                Hello {props.user}, This is your Calendar
            </header>
            <div id="calendar-body">
                More test here
                
                {props.services.map((item,index) => {
                    return(
                      <div key={item.name} id={item.name + "-box"}>
                          <h5 className="box-title">{item.name}</h5>
                          <p className="box-description">
                            {item.description}
                          </p>
                          <button onClick={()=>{
                              history(item.route);
                          }}>{item.buttonMessage}</button>
                      </div>
                    )
                })}
            </div>
            <div id='googleCalendar'>
                <iframe src="https://calendar.google.com/calendar/embed?src=c_q3bnc1fi5s9llnrsmi2jc2p8ko%40group.calendar.google.com&ctz=America%2FLos_Angeles" width="800" height="600" frameborder="0" scrolling="no"></iframe>

            </div>
        </div>
    );
}

export default Calendar;
