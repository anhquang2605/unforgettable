import './app.css';
import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import * as ROUTES from "../../constants/Routes"; //This is where you all find your link to the component, used in the Routes and Route component below
import LogIn from '../Authentication/LogIn';
import SignUp from '../Authentication/SignUp';
import NavBar from './../NavBar';
import firebase from './../Firebase/firebase';
import Home from './../Home';
import Note from './../Note';
import NoteView from './../Note/NoteView';
function App() {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const history = useNavigate();
    const db = firebase.firestore(); //the database;
    useEffect(() => {//triggered when page refresh or fist loaded
        if(user == null){
            history(ROUTES.LOGIN);
        }
    }, []); //ComponentDidUpdate
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
        {user}
      <NavBar>

      </NavBar>
      <Routes>
            <Route path={ROUTES.LOGIN} element={<LogIn setUserForApp={setUser}/>}></Route>
            <Route path={ROUTES.SIGNUP} element={<SignUp/>}></Route>
            <Route exact path={ROUTES.HOME} element={<Home name={"sdf"} user={user} services={services} />}></Route>
            <Route path={ROUTES.NOTE} element={<Note user={user}></Note>}></Route>
            <Route exact path={ROUTES.NOTEVIEW+"/create"} element={<NoteView operation="create" user={user}></NoteView>}></Route>
            <Route path={ROUTES.NOTEVIEW+"/:id"} element={<NoteView operation="edit" user={user}></NoteView>}></Route>
            {/* <Route path={ROUTES.CALENDAR} element={<Calendar user={user}></Calendar>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;