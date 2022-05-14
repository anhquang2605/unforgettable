import React from 'react';
import './home.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import firebase from '../Firebase/firebase';
import i1 from "../../images/home/i1.svg";
import i3 from "../../images/home/i2.svg";
import i2 from "../../images/home/i3.png";

const Home = (props) => {
  const db = firebase.firestore();
  const history = useNavigate();
  return (
    <div id="home">
      <div className="containe-fluid px-4">
        <div className="row">
          <div onClick={() => history("/my-note")} className="col-4 pointer">
            <img className="w-100" src={i1} alt="" />
            <h1 className="font mt-3 text-center display-4">Note Taking</h1>
          </div>
          <div
            onClick={() => history("/my-calendar")}
            className="col-4 pointer"
          >
            <img className="w-100" src={i3} alt="" />
            <h1 className="font mt-3 text-center display-4">Calendar</h1>
          </div>
          <div
            onClick={() => history("/my-checklist")}
            className="col-4 pointer"
          >
            <img className="w-100" src={i2} alt="" />
            <h1 className="font mt-3 text-center display-4">Checklist</h1>
          </div>
          
        </div>
      </div>

      {/* <header className="App-header">
        Hello {props.user},welcome to unforgettable
      </header> */}
      {/* <div id="home-body">
        {props.services.map((item, index) => {
          return (
            <div key={item.name} id={item.name + "-box"}>
              <h5 className="box-title">{item.name}</h5>
              <p className="box-description">{item.description}</p>
              <button
                onClick={() => {
                  history(item.route);
                }}
              >
                {item.buttonMessage}
              </button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Home;
