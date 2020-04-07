import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardText,
} from 'reactstrap';

const NoteDetailModal = (props) => {

  return (
    <Modal isOpen={props.showNoteDetail} toggle={props.toggleNoteDetailModal} className={props.className}>
      <ModalHeader toggle={props.toggleNoteDetailModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>{props.note.title}</ModalHeader>
      <ModalBody>
        <CardText style={{ minHeight: 400, padding: 3 }}>
          <ReactMarkdown
            source={props.note.description}
            escapeHtml={false}
          />
        </CardText>
      </ModalBody>
      <ModalFooter style={{ margin: "0 auto" }}>
        <Button color="secondary" onClick={props.toggleNoteDetailModal}>キャンセル</Button>
      </ModalFooter>
    </Modal >
  )
}

export default NoteDetailModal;