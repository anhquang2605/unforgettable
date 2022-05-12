import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChecklistCard from "./ChecklistCard";

const Checklists = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [checklistArray, setChecklistArray] = useState([]);

  const saveChecklist = (checklist) => {
    let tempArray = checklistArray;
    tempArray.push(checklist);
    setChecklistArray(tempArray);
  };

  console.log({ checklistArray });
  return (
    <div>
      <div className="header">
        <h1>Let's get productive.</h1>
        <Button onClick={() => setModal(true)}>Create Checklist</Button>
        <CreateChecklist
          toggle={toggle}
          modal={modal}
          save={saveChecklist}
          setChecklistArray={setChecklistArray}
          checklistArray={checklistArray}
        />
      </div>
      <div className="checklist-view"></div>

      {checklistArray.map((key, obj) => (
        <li key={key}>
          <h3>{obj.checklistName}</h3>
          {obj.tasks.map((task) => (
            <li>{task.name}</li>
          ))}
        </li>
      ))}
    </div>
  );
};

const CreateChecklist = ({
  toggle,
  modal,
  setChecklistArray,
  checklistArray,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Checklist</ModalHeader>
      <ModalBody>
        <Checklist
          setChecklistArray={setChecklistArray}
          checklistArray={checklistArray}
        />
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

function Task({ task, index, completeTask, removeTask }) {
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

function AddTask({ addTask }) {
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

function Checklist({ setChecklistArray, checklistArray }) {
  const [checklistName, setChecklistName] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (name) => {
    const newTasks = [...tasks, { name, completed: false }];
    setTasks(newTasks);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChecklistName(value);
  };

  function completeTask(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  }

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSaveCheckList = () => {
    const foundCheckList =
      checklistArray.find(
        (checkList) =>
          checkList.checklistName.toLowerCase() === checklistName.toLowerCase()
      ) || {};

    if (Object.keys(foundCheckList).length === 0) {
      setChecklistArray([
        ...checklistArray,
        {
          checklistName,
          tasks,
        },
      ]);
    } else {
      setChecklistArray(
        checklistArray.map((checkList) => {
          if (
            checkList.checklistName.toLowerCase() ===
            checklistName.toLowerCase()
          ) {
            return {
              ...checkList,
              tasks,
            };
          } else {
            return checkList;
          }
        })
      );
    }
  };

  return (
    <div className="checklist">
      <div className="form-group">
        <label>Checklist Name</label>
        <input
          type="text"
          className="form-control"
          name="checklistName"
          value={checklistName}
          onChange={handleChange}
        />
      </div>{" "}
      <br></br>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            key={index}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
      </div>
      <div className="add-task">
        <AddTask addTask={addTask} />
      </div>
      <Button onClick={handleSaveCheckList}>Save Checklist</Button>
    </div>
  );
}

export default Checklists;
