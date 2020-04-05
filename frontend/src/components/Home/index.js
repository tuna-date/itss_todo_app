import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import NotesRequest from '../../request/NotesRequest';
import NewNoteModal from '../Modal/NewNoteModal/index';
import NoteDetailModal from '../Modal/NoteDetailModal/index';
import Popup from 'react-popup';

import {
  Button,
  Card,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  TabContent,
  Table,
  TabPane,
  Spinner,
  Container,
  Input,
  View,
  ListGroup,
  ListGroupItem,
  CardBody,
  CardTitle,
  ButtonGroup,
  CardText
} from 'reactstrap';

const noteRequest = new NotesRequest();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      page: 1,
      showAddNote: false,
      showNoteDetail: false,
    }
  }

  componentDidMount() {
    this.getNotes();
  }

  toggleAddNotePopup() {
    this.setState({
      showAddNote: !this.state.showAddNote
    })
  }

  toggleNoteDetailPopup() {
    this.setState({
      showNoteDetail: !this.state.showNoteDetail
    })
  }

  getNotes() {
    const params = {
      page: this.state.page
    }

    noteRequest.getNotes(params)
      .then(res => {
        this.setState({
          notes: res
        });
        console.log('notes:', this.state.notes);
      })
      .catch(err => {
        console.warn("Failed to get list note");
      })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>UserName here</Col>
        </Row>
        <hr />

        <Popup trigger={<Button>&#43;</Button>}>
          <NewNoteModal closePopup={this.toggleAddNotePopup} />
        </Popup>
        <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Modal Title </div>
        <div className="content">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
        {
          this.state.notes.map((note, index) =>
            <div key={index}>
              <Card>
                <CardBody>
                  <CardTitle>{note.title}</CardTitle>
                  <ButtonGroup>
                    <Button onClick={this.toggleNoteDetailPopup}>&#128065;</Button>
                    <Button>&#9998;</Button>
                    <Button>&#9747;</Button>
                  </ButtonGroup>
                </CardBody>
              </Card>
            </div>
          )
        }
      </Container>
    )
  }
}

export default Home;