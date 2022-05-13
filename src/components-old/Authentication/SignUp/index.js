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
            <h4>Create a new account</h4>
            <div id="sign-up-form" hidden={ready}>
                <span className="form-field">
                    <label>
                        Username:
                    </label>
                    <input type="text" value={usernameField} onChange={handleUserField}>
                    </input>
                </span>
                <span className="error username-not-existed" hidden={!userExist}>Username existed, please try different one</span>
                <span className="error username-not-long" hidden={usernameValid}>Username should have at least 6 characters!</span>
                <br></br>
                <span className="form-field">
                    <label>
                        Password:
                    </label>
                    <input type="password" value={passwordField} onChange={handlePasswordField}>
                    </input>
                </span>
                <br></br>
                <span className="form-field">
                    <label>
                        Retype the password:
                    </label>
                    <input type="password" value={matchPasswordField} onChange={handlePasswordMatch}>
                    
                    </input>
                </span>
                <span className="error username-not-long" hidden={passwordValid}>password does not match</span>
                <br></br>
                <span className="form-field">
                    <label>
                        Prefered display name (optional):
                    </label>
                    <input type="text" value={nicknameField} onChange={handleNickname}>
                    </input>
                </span>
                <br></br>
                <button className="form-button" onClick={handleSignup} disabled={!usernameValid || !passwordValid}>Sign up</button>
                <button className="form-button" onClick={()=>{
                    history('/log-in')
                }}>Back</button>
            </div>
            <div hidden={!ready}>
                    User signed up, redirecting to log in page
            </div>
        </div>
    );
}

export default SignUp;
