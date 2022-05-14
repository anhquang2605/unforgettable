import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChecklistCard from "./ChecklistCard";
import firebase from "../Firebase/firebase";
import CheckListModal from "./CheckListModal";

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
    <div>
      <div className="header">
        <h1>Let's get productive.</h1>
        <Button onClick={() => setModal(true)}>Create Checklist</Button>
        <CheckListModal
          toggle={toggle}
          modal={modal}
          save={saveChecklist}
          setChecklistArray={setChecklistArray}
          checklistArray={checklistArray}
          setRefresh={setRefresh}
        />
      </div>
      <div className="checklist-view"></div>

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
  );
};

export function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.name + "         "}
      <button onClick={() => completeTask(index)}>✓</button>
      <button onClick={() => removeTask(index)}>X</button>
    </div>
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add task here"
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Checklists;
