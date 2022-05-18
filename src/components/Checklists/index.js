import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChecklistCard from "./ChecklistCard";
import firebase from "../Firebase/firebase";
import CheckListModal from "./CheckListModal";
import "./checklists.css";
import add from "../../images/add.svg";

const Checklists = (props) => {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [checklistArray, setChecklistArray] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const db = firebase.firestore();

  let setChecklistsFromUser = (data) => {
    let userChecklists = data?.checklistArray;
    console.log({ userChecklists });
    setChecklistArray(userChecklists || []);
  };

  useEffect(() => {
    if (props.user != "") {
      // getUserFromDB(props.user);
      db.collection("accounts")
        .doc(props.user)
        .onSnapshot((doc) => {
          const data = doc.data();
          setUser(data);
          setChecklistsFromUser(data);
        });
    }
  }, []);

  console.log("rendered");

  useEffect(() => {
    db.collection("accounts").doc(props.user).update({
      checklistArray,
    });
  }, [refresh]);

  const saveChecklist = (checklist) => {
    let tempArray = checklistArray;
    tempArray.push(checklist);
    setChecklistArray(tempArray);
  };

  const deleteChecklist = (index) => {
    // let tempArray = checklistArray;
    //tempArray.splice(index, 1);
    setChecklistArray(checklistArray.filter((list, id) => id !== index));
    setRefresh((refresh) => !refresh);
    //window.location.reload();
  };

  console.log({ checklistArray });
  return (
    <div id="checklist" >
      <div className="px-4 py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="font">Let's make some checklist {" "}
            <img
              id=" add-new-checklist-btn"
              onClick={() => setModal(true)}
              style={{ width: "35px" }}
              src={add}
              alt=" "
              className="pointer"
            />
          </h1>
          {/* <Button className="btn-success" onClick={() => setModal(true)}>Create Checklist</Button> */}
          <CheckListModal
            toggle={toggle}
            modal={modal}
            save={saveChecklist}
            setChecklistArray={setChecklistArray}
            checklistArray={checklistArray}
            setRefresh={setRefresh}
          />
        </div>
        <div className="checklist-view mt-4">
          <div className="row gy-5 gx-5">
            {checklistArray &&
              checklistArray.map((obj, index) => (
                <ChecklistCard
                  checklist={obj}
                  key={index}
                  index={index}
                  deleteChecklist={deleteChecklist}
                  checklistArray={checklistArray}
                  setChecklistArray={setChecklistArray}
                  toggle={toggle}
                  setRefresh={setRefresh}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function Task({ task, index, completeTask, removeTask }) {
  return (
    <li
      className="task d-flex justify-content-between align-items-center mt-3"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      <h5 className="d-flex align-items-center gap-2">
        <div className="dot"></div> {task.name + "         "}
      </h5>
      <div className="d-flex gap-2 align-items-center">
        <button
          className="btn-danger btn px-2 py-1"
          onClick={() => completeTask(index)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path>
          </svg>
        </button>
        <button
          className="btn-success btn px-2 py-1"
          onClick={() => removeTask(index)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path>
            </g>
          </svg>
        </button>
      </div>
    </li>
  );
}

export function AddTask({ addTask }) {
  const [value, setValue] = useState("");

  useEffect(() => setValue(value), [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid px-0">
      <div className="row">
        <div className="col-8">
          <input
            type="text"
            className="input form-control"
            value={value}
            placeholder="Add task here"
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </div>
        <div className="col-4">
          <button className="btn btn-warning w-100" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Checklists;
