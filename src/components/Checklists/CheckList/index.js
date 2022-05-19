import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { AddTask, Task } from "../index";

function Checklist({
  setChecklistArray,
  checklistArray,
  selectedChecklistName,
  selectedTasks,
  toggle,
  setRefresh,
}) {
  const [checklistName, setChecklistName] = useState(selectedChecklistName);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (selectedChecklistName) {
      setChecklistName(selectedChecklistName);
    }
  }, [selectedChecklistName]);

  useEffect(() => {
    if (selectedTasks && selectedTasks.length > 0) {
      setTasks(selectedTasks);
    }
  }, [selectedTasks]);

  console.log({ checklistArray });

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

  const handleEditCheckList = () => {
    setChecklistArray(
      checklistArray?.map((item) => {
        if (item.checklistName === selectedChecklistName) {
          return {
            ...item,
            checklistName,
            tasks,
          };
        } else {
          return item;
        }
      })
    );
    setRefresh((refresh) => !refresh);
    toggle();
  };

  const handleSaveCheckList = () => {
    let checkListToSave = [];
    const foundCheckList =
      checklistArray.find(
        (checklist) =>
          checklist.checklistName.toLowerCase() === checklistName.toLowerCase()
      ) || {};

    if (Object.keys(foundCheckList).length === 0) {
      checkListToSave = [
        ...checklistArray,
        {
          checklistName,
          tasks,
        },
      ];
    } else {
      checkListToSave = checklistArray.map((checkList) => {
        if (
          checkList.checklistName.toLowerCase() === checklistName.toLowerCase()
        ) {
          return {
            ...checkList,
            tasks,
          };
        } else {
          return checkList;
        }
      });
    }
    setChecklistArray(checkListToSave);
    setRefresh((refresh) => !refresh);
    toggle();
  };

  console.log({ selectedChecklistName });
  const isEdit = selectedChecklistName;

  const checkListHandler = isEdit ? handleEditCheckList : handleSaveCheckList;

  return (
    <div className="checklist">
      <div className="form-group">
        <label>Checklist Name</label>
        <input
          type="text"
          className="form-control"
          name="checklistName"
          value={checklistName}
          disabled={isEdit}
          onChange={handleChange}
        />
      </div>{" "}
      <br></br>
      <ul className="task-list">
        {(tasks.length &&
          tasks.map((task, index) => (
            <Task
              task={task}
              index={index}
              key={index}
              completeTask={completeTask}
              removeTask={removeTask}
            />
          ))) || <div className="">No task</div>}
      </ul>
      <br></br>
      <div className="add-task">
        <AddTask addTask={addTask} />
      </div>
      <Button
        className="mt-4 w-100 btn-dark fw-bold"
        onClick={checkListHandler}
      >
        {isEdit ? "Update" : "Save"} Checklist
      </Button>
    </div>
  );
}

export default Checklist;
