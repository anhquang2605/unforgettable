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
            <h4>Welcome to Unfrogettalbe</h4>
            <p>Please sign in or create a an account to boost your productivity</p>
            <div id="authen-form">
                <span className="form-field">
                    <label>Username:</label>
                    <input type="text" value={usernameField} onChange={handleUsernameField} onKeyUp={handleCheckUser} autoComplete='false'></input>
                </span>
                <span className="error username-not-existed" hidden={userFound}>Username does not exist, please try again or sign up</span>
                <br></br>
                <span className="form-field" hidden={!userFound}>
                    <label>Password:</label>
                    <input type="password" value={passwordField} onChange={handlePasswordCheck} autoComplete='false'></input>
                </span>
                <span className="error username-not-existed" hidden={passwordMatch}>Wrong password, please try again</span>
                <br></br>
                <button className="form-button" onClick={handleSignIn} disabled={!userFound}>Log In</button>
                <button className="form-button" onClick={()=>{
                    history('/sign-up')
                }}>Sign Up</button>
            </div>
        </div>
    );
}

export default LogIn;
