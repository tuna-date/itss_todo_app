import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import NotesRequest from '../../request/NotesRequest';
import AuthRequest from '../../request/AuthRequest';
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
const authRequest = new AuthRequest();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      notes: [],
      page: 1,
      showAddNote: false,
      showNoteDetail: false,
    }
  }

  componentDidMount() {
    this.getUserInfo();
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

  getUserInfo() {
    authRequest.getUserInfo({})
      .then(res => {
        this.setState({
          userInfo: res
        });
        console.log(this.state.userInfo);
      })
      .catch(err => {
        console.warn(err);
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

  handleLogout() {
    localStorage.clear('jwtToken');
    window.location.href = "/login";
  }

  render() {
    return (
      <Container className="app flex-col align-items-center">
        <CardText className="text-center mt-4">
          <img src="https://avatars3.githubusercontent.com/u/22492465?s=460&u=f4a43a0e8510b334554ef369f006e9df9e4fbdbb&v=4" alt='empty' class="rounded-circle rounded-sm" style={{ height: '70px', width: '70px' }} />
          <Row>
            <Col>{this.state.userInfo.name ? this.state.userInfo.name : 'undified'}</Col>
          </Row>
        </CardText>
        <hr style={{ width: "85%" }} />
        <Button onClick={this.toggleAddNotePopup.bind(this)}>&#43;</Button>

        {
          this.state.showAddNote ?
            <NewNoteModal closePopup={this.toggleAddNotePopup} />
            : null
        }

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
        <div class="mb-5 text-center" style={{ position: 'fixed', bottom: '0' }}>
          <footer class="app-footer ">
            <hr style={{ width: "100vh" }} />
            <Button class="btn" color="primary" onClick={this.handleLogout}>ログアウト</Button>
          </footer>
        </div>
      </Container>
    )
  }
}

export default Home;