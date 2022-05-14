import "./app.css";
import React, { useEffect, useState } from "react";
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import {
  NavLink,
  renderMatches,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import * as ROUTES from "../../constants/Routes"; //This is where you all find your link to the component, used in the Routes and Route component below
import { NAVIGATION_ITEMS } from "../../constants/NavigationItems";
import LogIn from "../Authentication/LogIn";
import SignUp from "../Authentication/SignUp";
import NavBar from "./../NavBar";
import firebase from "./../Firebase/firebase";
import Home from "./../Home";
//import jean's calendar
import Calendar from "./../Calendar";
import Note from "./../Note";
import NoteView from "./../Note/NoteView";
import Splash from "./../Splash";
import Checklists from "../Checklists";

function App() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const history = useNavigate();
  const db = firebase.firestore(); //the database;
  useEffect(() => {
    //triggered when page refresh or fist loaded
    if (user == null) {
      history(ROUTES.SPLASH);
    }
  }, []); //ComponentDidUpdate
  useEffect(() => {
    if (user != null) {
      db.collection("services")
        .get()
        .then((querySnapshot) => {
          let arrays = [];
          querySnapshot.forEach((doc) => {
            arrays.push(doc.data());
          });
          setServices(arrays);
        });
    }
  }, [user]);
  let handleLogout = () => {
    setUser(null);
    history("/splash");
  };
  return (
    <div className="unforgettable-app">
      {user}
      <NavBar>
        {user ? (
          <React.Fragment>
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink
                key={item.route}
                className={(navigationData) =>
                  navigationData.isActive ? "active-link" : ""
                }
                to={item.route}
              >
                {item.title}
              </NavLink>
            ))}
            <a href="#" onClick={handleLogout}>
              Log out
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink
              className={(navigationData) =>
                navigationData.isActive ? "active-link" : ""
              }
              to="/log-in"
            >
              Log in
            </NavLink>
            <NavLink
              className={(navigationData) =>
                navigationData.isActive ? "active-link" : ""
              }
              to="/sign-up"
            >
              Sign up
            </NavLink>
          </React.Fragment>
        )}

      </NavBar>

      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={<LogIn setUserForApp={setUser} />}
        ></Route>
        <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
        <Route
          exact
          path={ROUTES.HOME}
          element={<Home user={user} services={services} />}
        ></Route>
        <Route
          exact
          path={ROUTES.CALENDAR}
          element={<Calendar user={user} services={services} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HOME}
          element={<Home name={"sdf"} user={user} services={services} />}
        ></Route>
        <Route path={ROUTES.NOTE} element={<Note user={user}></Note>}></Route>
        <Route
          exact
          path={ROUTES.NOTEVIEW + "/create"}
          element={<NoteView operation="create" user={user}></NoteView>}
        ></Route>
        <Route
          path={ROUTES.NOTEVIEW + "/:id"}
          element={<NoteView operation="edit" user={user}></NoteView>}
        ></Route>
        <Route path={ROUTES.SPLASH} element={<Splash></Splash>}></Route>
        <Route
          path={ROUTES.CHECKLIST}
          element={<Checklists user={user} />}
        ></Route>
        {/* <Route path={ROUTES.CALENDAR} element={<Calendar user={user}></Calendar>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
