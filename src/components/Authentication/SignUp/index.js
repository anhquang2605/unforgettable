import React, {useState, useEffect} from 'react';
import firebase from './../../Firebase/firebase';
import './signup.css';

import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const history = useNavigate();
    const db = firebase.firestore();
    const [usernameField, setUsernameField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [matchPasswordField, setMatchPasswordField] = useState("");
    const [userExist, setUserExist] = useState(false);
    const {nicknameField, setNicknameField} = useState("");
    const [ready, setReady] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    let userFrame = {
        username: "",
        password: "",
        nickname: "",
        notes:[],
        checklist:[],
        events:[],
    }
    let handleSignup = (e) =>{
        userFrame.username = usernameField;
        userFrame.password = passwordField;
        if(nicknameField == undefined){
            userFrame.nickname = "";
        }else {
            userFrame.nickname = nicknameField;
        }
        db.collection("accounts").doc(usernameField).set(userFrame);
        setReady(true);
        setTimeout(() => {
            history('/log-in');
        }, 1000);

    }
    let findUser = (username) =>{
        var docRef = db.collection("accounts").doc(username);
        docRef.get().then((doc)=>{
            if(doc.exists){
                setUserExist(true);
            }else{
                setUserExist(false);
            }
        })
    }
    let handleUserField = (e) =>{
        setUsernameField(e.target.value);
        if(e.target.value.length <= 6){
            setUsernameValid(false);
        }else {
            setUsernameValid(true);
        }
    }
    let handlePasswordField = (e) => {
        setPasswordField(e.target.value);
    }
    let handlePasswordMatch = (e) => {
        setMatchPasswordField(e.target.value);
    }
    let handleNickname = (e) => {
        setNicknameField(e.target.value);
    }
    let checkPasswordMatch = () =>{
        setPasswordValid(passwordField == matchPasswordField);
    }
    useEffect(() => {
        checkPasswordMatch();
    }, [passwordField,matchPasswordField]);
    useEffect(()=>{
        if(usernameField!=""){
            findUser(usernameField);
        }
    }, [usernameField])
    return (
        <div id="sign-up">
            <div>
                <h4 className="display-6 fw-bold">Create a New Account</h4>
                <div id="sign-up-form" hidden={ready}>
                    <span className="form-field">
                        {/* <label>Username:</label> */}
                        <input
                            type="text"
                            value={usernameField}
                            onChange={handleUserField}
                            placeholder="Username"
                        ></input>
                    </span>
                    <br />
                    <br hidden={!userExist} />
                    <span className="error username-not-existed" hidden={!userExist}>
                        Username existed, please try different one
                    </span>
                    <br hidden={!userExist} />
                    <span className="error username-not-long" hidden={usernameValid}>
                        Username should have at least 6 characters!
                    </span>
                    <br></br>
                    <span className="form-field">
                        {/* <label>Password:</label> */}
                        <input
                            type="password"
                            value={passwordField}
                            onChange={handlePasswordField}
                            placeholder="Password"
                        ></input>
                    </span>
                    <br />
                    <br />
                    <span className="form-field">
                        {/* <label>Retype the password:</label> */}
                        <input
                            type="password"
                            value={matchPasswordField}
                            onChange={handlePasswordMatch}
                            placeholder="Password again"
                        ></input>
                    </span>
                    <br />
                    <span className="error username-not-long" hidden={passwordValid}>
                        password does not match
                    </span>
                    <br></br>
                    <span className="form-field">
                        {/* <label>Prefered display name (optional):</label> */}
                        <input
                            type="text"
                            value={nicknameField}
                            onChange={handleNickname}
                            placeholder="Display name"
                        ></input>
                    </span>
                    <br></br>
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                        <button
                            className="form-button1"
                            onClick={handleSignup}
                            disabled={!usernameValid || !passwordValid}
                        >
                            Sign up
                        </button>
                        <button
                            className="form-button2"
                            onClick={() => {
                                history("/log-in");
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <div hidden={!ready}>User signed up, redirecting to log in page</div>
        </div>
    );
};

export default SignUp;
