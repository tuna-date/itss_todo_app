import React, { useState } from 'react';
import NotesRequest from '../../../request/NotesRequest';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  Input,
  CardBody,
  ButtonGroup,
  Form,
} from 'reactstrap';

const noteRequest = new NotesRequest();

const NewNoteModal = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const onCreateNote = (event) => {
    const params = {
      title,
      description,
    }

    console.log(params);

    noteRequest.createNote(params)
      .then(res => {
        toast.success('ノート追加');
        props.updateNotes();
      })
      .catch(err => {
        toast.error('エーラーが発生した');
        console.warn(err);
      })
  }

  return (
    <Form>
      <CardBody>
        <Input type="text" name="title" value={title} placeholder="Title" onChange={onChangeTitle} />
        <textarea name="description" value={description} placeholder="Description" onChange={onChangeDescription} />
        <ButtonGroup>
          <Button onClick={onCreateNote}>作成</Button>
          <Button onClick={props.closePopup}>キャンセル</Button>
        </ButtonGroup>
      </CardBody>
    </Form>
  )
}

export default NewNoteModal;