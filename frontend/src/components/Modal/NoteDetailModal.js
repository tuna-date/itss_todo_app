import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
  CardText,
} from 'reactstrap';

const NoteDetailModal = (props) => {

  return (
    <Modal isOpen={props.showNoteDetail} toggle={props.toggleNoteDetailModal} className={props.className}>
      <ModalHeader toggle={props.toggleNoteDetailModal} cssModule={{'modal-title': 'w-100 text-center'}}>{props.note.title}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <CardText style={{minHeight: 400, backgroundColor: "#edebeb", padding: 3}}>{props.note.description}</CardText>
        </FormGroup>
      </ModalBody>
      <ModalFooter style={{margin: "0 auto"}}>
        <Button color="secondary" onClick={props.toggleNoteDetailModal}>キャンセル</Button>
      </ModalFooter>
    </Modal >
  )
}

export default NoteDetailModal;