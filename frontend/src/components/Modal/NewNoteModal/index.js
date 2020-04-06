import React, { useState } from 'react';
import NotesRequest from '../../../request/NotesRequest';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  Input,
  CardBody,
  ButtonGroup,
  Form,Row,Col,FormGroup,Label
} from 'reactstrap';

const noteRequest = new NotesRequest();

const NewNoteModal = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onCreateNote = (event) => {
    const params = {
      title,
      description,
    };

    noteRequest.createNote(params)
      .then(res => {
        toast.success('ノート追加');
        props.updateNotes();
        props.closePopup();
      })
      .catch(err => {
        toast.error('エーラーが発生した');
        console.warn(err);
      })
  };

  return (
    <Form>
      <CardBody>
        <FormGroup row>
          <Label for="title" sm={2}>タイトル</Label>
          <Col sm={10}>
            <Input type="text" name="title" value={title} placeholder="Title" onChange={onChangeTitle} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>デスクリプション</Label>
          <Col sm={10}>
            <Input type="textarea" name="description" value={description} placeholder="Description" onChange={onChangeDescription} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size:4, offset:2}}>
            <Button onClick={onCreateNote} color="info" >作成</Button>
          </Col>
          <Col sm={{size:4, offset:2}}>
            <Button onClick={props.closePopup} color="danger" >キャンセル</Button>
          </Col>
        </FormGroup>
      </CardBody>
    </Form>
  )
};

export default NewNoteModal;
