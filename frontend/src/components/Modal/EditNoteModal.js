import React, { useState } from 'react';
import NoteRequest from '../../request/NotesRequest';
import { toast } from 'react-toastify';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Button,
  Input,
} from 'reactstrap';

const noteRequest = new NoteRequest();


const EditNoteModal = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onUpdateNote = () => {
    const params = {
      title,
      description,
      noteId: props.note.id
    }

    noteRequest.updateNote(params)
      .then(res => {
        toast.success('ノート更新');
        props.getNote();
      })
      .catch(err => {
        toast.error('エーラーが発生した');
        console.warn(err);
      })
  };

  return (
    <Modal isOpen={props.showEditNote} toggle={props.toggleEditNoteModal} className={props.className}>
      <ModalHeader class="text-center" toggle={props.toggleEditNoteModal} cssModule={{'modal-title': 'w-100 text-center'}}>コンテンツを編集する</ModalHeader>
      <ModalBody >
        <FormGroup style={{textAlign: 'center'}} >
          <Label for="title" >タイトル</Label>
          <Input type="text" name="title" defaultValue={props.note.title} placeholder="Title"
            onChange={onChangeTitle}
            style={{width: 450}} 
            />
        </FormGroup>
        <FormGroup  style={{textAlign: 'center'}}>
          <Label for="exampleText" >デスクリプション</Label>
          <Input type="textarea" name="description" defaultValue={props.note.description}
            placeholder="Description"
            onChange={onChangeDescription} 
            style={{width: 450, minHeight: 400}}
            />
        </FormGroup>
      </ModalBody>
      <ModalFooter style={{margin: "0 auto"}}>
        <Button color="primary" onClick={onUpdateNote}>更新</Button>
        <Button color="secondary" onClick={props.toggleEditNoteModal}>キャンセル</Button>
      </ModalFooter>
    </Modal >
  )
}

export default EditNoteModal;