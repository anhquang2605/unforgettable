import React, { useState } from "react";
import { CardTitle, CardText, Button } from "reactstrap";
import EditChecklist from "../EditChecklist";
import write from "../../../images/write.svg";
import bin from "../../../images/bin.png";

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
    <div className="col-4 pb-4">
      <div className="checklist-card pt-4 pb-3 px-4">
        <div>
          <CardTitle
            tag="h2"
            className="fw-bold border-bottom border-3 border-dark pb-1"
          >
            {checklist.checklistName}
          </CardTitle>
          <CardText className="py-4">
            {checklist.tasks.map((task, index) => (
              <div
                key={index}
                style={{ textDecoration: task.completed ? "line-through" : "" }}
                className="d-flex align-items-center gap-2 h4 py-1" >
                {task.name}
              </div>
            ))}
          </CardText>
          <div className="d-flex justify-content-between gap-3">
            <Button
              className="btn bg-transparent border-0 p-0"
              onClick={handleDelete}
            >
              <img style={{ maxHeight: "38px" }} src={bin} alt="" />
            </Button>
            <Button
              className="btn bg-transparent border-0 p-0"
              onClick={() => handleEditCheckList(checklist)}
            >
              <img style={{ maxHeight: "38px" }} src={write} alt="" />
            </Button>
          </div>
        </div>
      </div>
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
