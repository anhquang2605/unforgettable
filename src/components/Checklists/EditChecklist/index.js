import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Checklist from "../CheckList";

const EditChecklist = ({
  toggle,
  modal,
  setChecklistArray,
  checklistArray,
  selectedChecklistName,
  selectedTasks,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Checklist</ModalHeader>
      <ModalBody>
        <Checklist
          setChecklistArray={setChecklistArray}
          checklistArray={checklistArray}
          selectedChecklistName={selectedChecklistName}
          selectedTasks={selectedTasks}
          toggle={toggle}
        />
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default EditChecklist;
