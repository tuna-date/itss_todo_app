import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import NotesRequest from '../../request/NotesRequest';
import AuthRequest from '../../request/AuthRequest';
import NewNoteModal from '../Modal/NewNoteModal/index';
import NoteDetailModal from '../Modal/NoteDetailModal/index';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
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
  CardText,
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
      showAddNote: false,
      showNoteDetail: false,
      pageCount: 0,
    }
  }

  openAddNote() {
    this.setState({
      showAddNote: true
    })
  }

  closeAddNote() {
    this.setState({
      showAddNote: false
    })
  }


  openNoteDetail() {
    this.setState({
      showNoteDetail: true
    })
  }

  closeNoteDetail() {
    this.setState({
      showNoteDetail: false
    })
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

  getNotes() {
    const params = {
      page: this.state.pageOffset
    }

    noteRequest.getNotes(params)
      .then(res => {
        console.log(res)
        this.setState({
          notes: res.notes,
          pageCount: Math.ceil(res.totalNotes/res.limit)
        });
      })
      .catch(err => {
        console.warn("Failed to get list note");
      })
  }

  deleteNote(note) {
    const params = {
      noteId: note.id
    }

    noteRequest.deleteNote(params)
      .then(res => {
        toast.success('ノート削除');
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
  }

  render() {
    return (
      <Container className="app flex-col align-items-center">
        <CardTitle className="text-center mt-4">
          <img src="https://avatars3.githubusercontent.com/u/22492465?s=460&u=f4a43a0e8510b334554ef369f006e9df9e4fbdbb&v=4" alt='empty' className="rounded-circle rounded-sm" style={{ height: '70px', width: '70px' }} />
          <Row>
            <Col>{this.state.userInfo.name ? this.state.userInfo.name : 'undified'}</Col>
          </Row>
        </CardTitle>
        <Button onClick={this.openAddNote.bind(this)}>&#43;</Button>
        <hr style={{ width: "85%" }} />
        <Popup
          open={this.state.showAddNote}
          closeOnDocumentClick
          onClose={this.closeAddNote.bind(this)}
        >
          <NewNoteModal
            closePopup={this.closeAddNote.bind(this)}
            updateNotes={this.getNotes.bind(this)}
          />
        </Popup>

        {
          this.state.notes.map((note, index) =>
            <div key={index}>
              <Card style={{minWidth: "300px"}}>
                <CardBody>
                  <CardTitle style={{fontSize: "20px", fontWeight: "bold"}}>{note.title}</CardTitle>
                  <CardText>{note.created_at.substr(0, note.created_at.indexOf('T'))}</CardText>
                  <ButtonGroup>
                    <Popup trigger={<Button>&#128065;</Button>} modal >
                      <NoteDetailModal
                        title={note.title}
                        description={note.description}
                      />
                    </Popup>
                    <Button>&#9998;</Button>
                    <Button onClick={this.deleteNote.bind(this, note)}>&#9747;</Button>
                  </ButtonGroup>
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
      </Container>
    )
  }
}

export default Home;