import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import firebase from '../../Firebase/firebase';//import these to use the data base
import './login.css'
const LogIn = (props) => {
    const history = useNavigate();
    const [usernameField, setUsernameField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [user, setUser] = useState(null);
    const [userFound, setUserFound] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const db = firebase.firestore();
    let handleSignIn = () =>{
        if(checkPassword()){
            props.setUserForApp(user.username);
            history("/");
        }else{
            setPasswordMatch(false);
        }
    }
    let handleUsernameField = (e) =>{
        setUsernameField(e.target.value);
    }
    let handlePasswordCheck = (e) =>{
        setPasswordField(e.target.value);
    }
    let handleCheckUser = (e) =>{
        if(e.target.value.length != 0){
            findUser(e.target.value);
        }
    }
    let findUser = (username) =>{
        var docRef = db.collection("accounts").doc(username);//username is a string
        docRef.get().then((doc)=>{
            if(doc.exists){
                setUser(doc.data());
                setUserFound(true);
            }else{
                setUserFound(false);
            }
        })
    }
    let checkPassword = () =>{
        return passwordField == user.password;
    }
    useEffect(() => {

    }, []);
    return (
        <div id="log-in">
            <div>
                <h4 className="fw-bold">LOG IN</h4>
                {/* <p>Please sign in or create a an account to boost your productivity</p> */}
                <div id="authen-form">
                    <span className="form-field">
                        {/* <label>Username:</label>
                <br /> */}
                        <input
                            type="text"
                            value={usernameField}
                            onChange={handleUsernameField}
                            onKeyUp={handleCheckUser}
                            autoComplete="false"
                            placeholder="Username"
                        ></input>
                    </span>
                    <br />
                    <span className="error username-not-existed" hidden={userFound}>
                        Username does not exist, please try again or sign up
                    </span>
                    <br></br>
                    <span className="form-field" hidden={!userFound}>
                        {/* <label>Password:</label>
                <br /> */}
                        <input
                            type="password"
                            value={passwordField}
                            onChange={handlePasswordCheck}
                            autoComplete="false"
                            placeholder="Password"
                        ></input>
                    </span>
                    <br />
                    <span className="error username-not-existed" hidden={passwordMatch}>
                        Wrong password, please try again
                    </span>
                    <br />
                    <span hidden={!userFound} className="forget_pss">
                        forgot password ?
                    </span>
                    <br />
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                        <button
                            className="form-button1"
                            onClick={handleSignIn}
                            disabled={!userFound}
                        >
                            Log In
                        </button>
                        <button
                            className="form-button2"
                            onClick={() => {
                                history("/sign-up");
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
