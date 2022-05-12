import React, { useState, useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
 
const Checklists = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [checklistArray, setChecklistArray] = useState([]);
 
    const saveChecklist = (checklist) => {
        let tempArray = checklistArray
        tempArray.push(checklist)
        setChecklistArray(tempArray)
    }
 
    return (
        <div>
            <div className = "header">
                <h1>Let's get productive.</h1>
            <Button onClick={()=>setModal(true)}>Create Checklist</Button>
            </div>
            <div className = "checklist-view">
           
           
            </div>
            <CreateChecklist toggle = {toggle} modal = {modal} save = {saveChecklist}/>
        </div>
    )
}
 
const CreateChecklist = ({toggle, modal, save}) =>{
    

    const handleSave = () => {
        let checklist = new Checklist();
        save(checklist);
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Checklist</ModalHeader>
            <ModalBody>
               <Checklist />
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSave}>Save Checklist</Button>
            </ModalFooter>
        </Modal>
    )
}
 
function Task({ task, index, completeTask, removeTask }) {
    return (
        <div className = 'task' style = {{textDecoration: task.completed ? 'line-through' : ""}}>
        {task.name + '         '}
        <button onClick = {() => completeTask(index)}>✓</button>
        <button onClick = {() => removeTask(index)}>X</button>
        </div>
    );
}
 
function AddTask({ addTask }) {
    const [value, setValue] = useState("");

    useEffect(() => setValue(value), [value]); 

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
 
    return (
        <form onSubmit = {handleSubmit}>
            <input type = 'text'
            className = 'input'
            value = {value}
            placeholder="Add task here"
            onChange={e => setValue(e.target.value)}></input>
            <button type = 'submit'>Submit</button>
        </form>
    )
}
 
 
function Checklist(){
    const [checklistName, setChecklistName] = useState('');
    const [tasks, setTasks] = useState ([]);
 
    useEffect(() => setChecklistName(checklistName), [checklistName]); 

    const addTask = name => {
        const newTasks = [...tasks, {name, completed: false}];
        setTasks(newTasks);
    }
 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setChecklistName(value);
    }
 
    function completeTask(index) {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    }
 
    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
 
 
    return (
       <div className='checklist'>
        <div className = 'form-group'>
            <label>Checklist Name</label>
            <input type = 'text' className = 'form-control' name = 'checklistName' value = {checklistName}
            onChange = {handleChange}/>
        </div> <br></br>
        <div className = 'task-list'>
            {tasks.map((task, index) => (
                <Task
                    task = {task}
                    index = {index}
                    key = {index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                />
            ))}
        </div>
        <div className = "add-task">
            <AddTask addTask = {addTask} />
        </div>
        </div>
    );
}
 
 
 
export default Checklists

