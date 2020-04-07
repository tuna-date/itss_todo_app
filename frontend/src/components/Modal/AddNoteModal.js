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
  CardText,
} from 'reactstrap';

const noteRequest = new NoteRequest();


const AddNoteModal = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('1');

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onAddNote = () => {
    const params = {
      title,
      description,
    }

    noteRequest.createNote(params)
      .then(res => {
        toast.success('ノート追加');
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
    <Modal isOpen={props.showAddNote} toggle={props.toggleAddNoteModal} className={props.className}>
      <ModalHeader toggle={props.toggleAddNoteModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>ノートを作成</ModalHeader>
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
          <ModalBody>
            <FormGroup style={{ textAlign: 'center' }}>
              <Label for="title" >タイトル</Label>
              <Input type="text" name="title" placeholder="Title"
                onChange={onChangeTitle}
                style={{ width: 450 }}
              />
            </FormGroup>
            <FormGroup style={{ textAlign: 'center' }}>
              <Label for="exampleText" >デスクリプション</Label>
              <Input type="textarea" name="description"
                placeholder="Description"
                onChange={onChangeDescription}
                style={{ width: 450, minHeight: 400 }}
              />
            </FormGroup>
          </ModalBody>
        </TabPane>
        <TabPane tabId='2'>
          <ModalHeader toggle={props.toggleNoteDetailModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>{title}</ModalHeader>
          <ModalBody>
            <CardText style={{ minHeight: 400, padding: 3 }}>
              <ReactMarkdown
                source={description}
                escapeHtml={false}
              />
            </CardText>
          </ModalBody>
        </TabPane>
      </TabContent>
      <ModalFooter style={{ margin: "0 auto" }}>
        <Button color="primary" onClick={onAddNote}>作成</Button>
        <Button color="secondary" onClick={props.toggleAddNoteModal}>キャンセル</Button>
      </ModalFooter>
    </Modal >
  )
}

export default AddNoteModal;