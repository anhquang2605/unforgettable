import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

import Checklists from "..";

const ChecklistCard = ({ checklist, index, deleteChecklist }) => {
  const handleDelete = () => {
    deleteChecklist(index);
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
          <Button>Edit Checklist</Button>
          <Button onClick={handleDelete}>Delete Checklist</Button>
        </CardBody>
      </Card>
    </div>
  );
};
export default ChecklistCard;
