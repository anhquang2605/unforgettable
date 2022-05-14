import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import EditChecklist from "../EditChecklist";

const ChecklistCard = ({
  checklist,
  index,
  deleteChecklist,
  checklistArray,
  setChecklistArray,
  setRefresh,
}) => {
  console.log({ checklistArrayCard: checklistArray });
  const [modal, setModal] = useState(false);
  const [selectedChecklistName, setSelectedChecklistName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this checklist?"
    );
    if (shouldDelete) {
      deleteChecklist(index);
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleEditCheckList = (list) => {
    setModal((prev) => !prev);
    setSelectedChecklistName(list.checklistName);
    setSelectedTasks(list.tasks || []);
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{checklist.checklistName}</CardTitle>
          <CardText>
            {checklist.tasks.map((task, index) => (
              <li
                key={index}
                style={{ textDecoration: task.completed ? "line-through" : "" }}
              >
                {task.name}
              </li>
            ))}
          </CardText>
          <Button onClick={() => handleEditCheckList(checklist)}>
            Edit Checklist
          </Button>
          <Button onClick={handleDelete}>Delete Checklist</Button>
        </CardBody>
      </Card>
      <EditChecklist
        modal={modal}
        toggle={toggle}
        checklist={checklist}
        selectedChecklistName={selectedChecklistName}
        selectedTasks={selectedTasks}
        checklistArray={checklistArray}
        setChecklistArray={setChecklistArray}
        setRefresh={setRefresh}
      />
    </div>
  );
};
export default ChecklistCard;
