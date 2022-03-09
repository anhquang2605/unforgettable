import './app.css';
import {useEffect, useState} from 'react';
import {Route, Routes, Navigate, useNavigate, userLocation, useLocation} from 'react-router-dom';
import * as ROUTES from "../../constants/Routes"; //This is where you all find your link to the component, used in the Routes and Route component below
import LogIn from '../Authentication/LogIn';
import SignUp from '../Authentication/SignUp';
import NavBar from './../NavBar';
import firebase from './../Firebase/firebase';
import Home from './../Home';
function App() {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const history = useNavigate();
    const db = firebase.firestore(); //the database;
    useEffect(() => {
        if(user == null){
            history(ROUTES.LOGIN);
        }
    }, []);
    useEffect(() => {
        if(user!=null){
            db.collection("services").get().then((querySnapshot) => {
                let arrays = [];
                querySnapshot.forEach((doc)=>{
                    arrays.push(doc.data());
                })
                setServices(arrays);
            })
        }
    }, [user]);
  return (
    <div className="unforgettable-app">
      <NavBar>

      </NavBar>
      <Routes>
            <Route path={ROUTES.LOGIN} element={<LogIn setUserForApp={setUser}/>}></Route>
            <Route path={ROUTES.SIGNUP} element={<SignUp/>}></Route>
            <Route exact path={ROUTES.HOME} element={<Home user={user} services={services}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;