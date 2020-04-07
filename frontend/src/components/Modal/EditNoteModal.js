import React, { useState } from 'react';
import NoteRequest from '../../request/NotesRequest';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import {
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Button,
  Input,
  CardText
} from 'reactstrap';

const noteRequest = new NoteRequest();


const EditNoteModal = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('1');

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

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Modal isOpen={props.showEditNote} toggle={props.toggleEditNoteModal} className={props.className}>
      <ModalHeader class="text-center" toggle={props.toggleEditNoteModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>コンテンツを編集する</ModalHeader>
      <Nav tabs>
        <NavItem style={{ width: "50%" }}>
          <NavLink
            className={classnames({ active: activeTab === '1' }) + ' text-center'}
            onClick={() => { toggle('1'); }}
          >
            &#9998;
          </NavLink>
        </NavItem>
        <NavItem style={{ width: "50%" }}>
          <NavLink
            className={classnames({ active: activeTab === '2' }) + ' text-center'}
            onClick={() => { toggle('2'); }}
          >
            &#128065;
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>

          <ModalBody >
            <FormGroup style={{ textAlign: 'center' }} >
              <Label for="title" >タイトル</Label>
              <Input type="text" name="title" defaultValue={props.note.title} placeholder="Title"
                onChange={onChangeTitle}
                style={{ width: 450 }}
              />
            </FormGroup>
            <FormGroup style={{ textAlign: 'center' }}>
              <Label for="exampleText" >デスクリプション</Label>
              <Input type="textarea" name="description" defaultValue={props.note.description}
                placeholder="Description"
                onChange={onChangeDescription}
                style={{ width: 450, minHeight: 400 }}
              />
            </FormGroup>
          </ModalBody>
        </TabPane>

        <TabPane tabId='2'>
          <ModalHeader toggle={props.toggleNoteDetailModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>
            {title !== ''?title:props.note.title}
          </ModalHeader>
          <ModalBody>
            <CardText style={{ minHeight: 400, padding: 3 }}>
              <ReactMarkdown
                source={description !== ''?description:props.note.description}
                escapeHtml={false}
              />
            </CardText>
          </ModalBody>
        </TabPane>
      </TabContent>
      <ModalFooter style={{ margin: "0 auto" }}>
        <Button color="primary" onClick={onUpdateNote}>更新</Button>
        <Button color="secondary" onClick={props.toggleEditNoteModal}>キャンセル</Button>
      </ModalFooter>
    </Modal >
  )
}

export default EditNoteModal;