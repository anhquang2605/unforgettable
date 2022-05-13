import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import EditChecklist from "../EditChecklist";

const ChecklistCard = ({ checklist, index, deleteChecklist }) => {
  const [modal, setModal] = useState(false);
  const [selectedChecklistName, setSelectedChecklistName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const handleDelete = () => {
    deleteChecklist(index);
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
            {checklist.tasks.map((task) => (
              <li
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
      />
    </div>
  );
};
export default ChecklistCard;
