import React, { Component } from 'react';
import NotesRequest from '../../request/NotesRequest';
import AuthRequest from '../../request/AuthRequest';
import EditNoteModal from '../Modal/EditNoteModal';
import AddNoteModal from '../Modal/AddNoteModal';
import NoteDetailModal from '../Modal/NoteDetailModal';
import ReactPaginate from 'react-paginate';
import './styles.scss'

import {
  Button,
  Card,
  Col,
  Row,
  Container,
  CardBody,
  CardTitle,
  ButtonGroup,
  CardText
} from 'reactstrap';
import { toast } from 'react-toastify';

const noteRequest = new NotesRequest();
const authRequest = new AuthRequest();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      notes: [],
      pageOffset: 1,
      showNoteDetail: false,
      showEditNote: false,
      showAddNote: false,
      pageCount: 0,
      editNote: {},
      viewNote: {},
    }
  }

  componentDidMount() {
    this.getUserInfo();
    this.getNotes();
  }

  getUserInfo() {
    authRequest.getUserInfo({})
      .then(res => {
        this.setState({
          userInfo: res
        });
      })
      .catch(err => {
        console.warn(err);
      })
  }

  getNotes = () => {
    const params = {
      page: this.state.pageOffset
    };

    noteRequest.getNotes(params)
      .then(res => {
        this.setState({
          notes: res.notes,
          pageCount: Math.ceil(res.totalNotes / res.limit)
        });
      })
      .catch(err => {
        console.warn("Failed to get list note");
      })
  };

  deleteNote(note) {
    const params = {
      noteId: note.id
    };

    noteRequest.deleteNote(params)
      .then(res => {
        toast.success('ノート削除した');
        this.getNotes();
      })
      .catch(err => {
        toast.warn('エーラーが発生した');
      })
  }

  handleLogout() {
    localStorage.clear('jwtToken');
    window.location.href = "/login";
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ pageOffset: selected + 1 }, () => {
      this.getNotes();
    });
  };

  toggleEditNoteModal(note) {
    this.setState({
      editNote: note,
      showEditNote: !this.state.showEditNote,
    });
  }

  toggleAddNoteModal() {
    this.setState({
      showAddNote: !this.state.showAddNote
    });
  }

  toggleNoteDetailModal(note) {
    this.setState({
      viewNote: note,
      showNoteDetail: !this.state.showNoteDetail
    })
  }

  render() {
    return (
      <Container className="app flex-col align-items-center">
        <CardTitle className="text-center mt-4">
          <img
            src="https://avatars3.githubusercontent.com/u/22492465?s=460&u=f4a43a0e8510b334554ef369f006e9df9e4fbdbb&v=4"
            alt='empty' className="rounded-circle rounded-sm" style={{ height: '70px', width: '70px' }} />
          <Row>
            <Col>{this.state && this.state.userInfo && (this.state.userInfo.name || '')}</Col>
          </Row>
        </CardTitle>
        <Button color="success" onClick={() => this.toggleAddNoteModal()}>&#43;</Button>
        <hr style={{ width: "85%" }} />
        {
          this.state.notes.map((note, index) =>
            <div key={index}>
              <Card style={{ minWidth: "300px" }}>
                <CardBody >
                  <Row>
                    <Col>
                      <CardTitle className="text-center"
                        style={{ fontSize: "20px", fontWeight: "bold" }}>{note.title}</CardTitle>
                      <CardText className="text-center">{note.created_at.substr(0, note.created_at.indexOf('T'))}</CardText>
                    </Col>
                  </Row>
                  <Row className="mt-3" >
                    <ButtonGroup style={{ marginLeft: "30%" }}>
                      <Button onClick={() => this.toggleNoteDetailModal(note)}>&#128065;</Button>
                      <Button onClick={() => this.toggleEditNoteModal(note)}>&#9998;</Button>
                      <Button onClick={this.deleteNote.bind(this, note)}>&#9747;</Button>
                    </ButtonGroup>
                  </Row>
                </CardBody>
              </Card>
            </div>
          )
        }
        <div style={{ position: 'fixed', bottom: '0', marginBottom: '100px' }}>
          <ReactPaginate
            initialPage={0}
            previousLabel={'前へ'}
            nextLabel={'次へ'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>

        <div className="mb-5 text-center" style={{ position: 'fixed', bottom: '0' }}>
          <footer className="app-footer ">
            <hr style={{ width: "100vh" }} />
            <Button className="btn" color="primary" onClick={this.handleLogout}>ログアウト</Button>
          </footer>
        </div>
        <EditNoteModal
          toggleEditNoteModal={this.toggleEditNoteModal.bind(this)}
          showEditNote={this.state.showEditNote}
          getNote={this.getNotes.bind(this)}
          note={this.state.editNote}
        />
        <AddNoteModal
          toggleAddNoteModal={this.toggleAddNoteModal.bind(this)}
          showAddNote={this.state.showAddNote}
          getNote={this.getNotes.bind(this)}
        />
        <NoteDetailModal
          toggleNoteDetailModal={this.toggleNoteDetailModal.bind(this)}
          showNoteDetail={this.state.showNoteDetail}
          note={this.state.viewNote}
        />
      </Container>
    )
  }
}

export default Home;
