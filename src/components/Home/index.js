import React from 'react';
import './home.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import firebase from '../Firebase/firebase';
const Home = (props) => {
    const db = firebase.firestore();
    const history = useNavigate();
    return (
        <div id="home">
            <header className="App-header">
                Hello {props.user},welcome to unforgettable
            </header>
            <div id="home-body">
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
        </div>
    );
}

export default Home;
