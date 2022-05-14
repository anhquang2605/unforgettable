import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Checklist from "../CheckList";

const CheckListModal = ({
  toggle,
  modal,
  setChecklistArray,
  checklistArray,
  setRefresh,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Checklist</ModalHeader>
      <ModalBody>
        <Checklist
          setChecklistArray={setChecklistArray}
          checklistArray={checklistArray}
          toggle={toggle}
          setRefresh={setRefresh}
        />
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default CheckListModal;
