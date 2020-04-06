import React, {Component} from 'react';
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
    CardText, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input
} from 'reactstrap';
import {toast} from 'react-toastify';

const noteRequest = new NotesRequest();
const authRequest = new AuthRequest();

class Home extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            showModal: false,
            userInfo: {},
            notes: [],
            pageOffset: 1,
            showAddNote: false,
            showNoteDetail: false,
            pageCount: 0,
            currentNote: null,
        }
    }

    openAddNote = () => {
        this.setState({
            showAddNote: true
        })
    };

    closeAddNote = () => {
        this.setState({
            showAddNote: false
        })
    };

    openNoteDetail = (note) => {
        console.log('======' , note);
        this.setState({
            showNoteDetail: true,
            currentNote: note
        })
    };

    closeNoteDetail = () => {
        this.setState({
            showNoteDetail: false
        })
    };

    componentDidMount() {
        this.getUserInfo();
        this.getNotes();
    }

//nếu hàm gọi một lần thì cho luôn vào didmount cũng được
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
                console.log(res);
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
                toast.success('ノート編集した');
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
        this.setState({pageOffset: selected + 1}, () => {
            this.getNotes();
        });
    };

    toggle(id) {
        this.setState({
            showModal: !this.state.showModal,
            noteId: id,
        });
        console.log(this.state.showModal, this.state.noteId);

    }

    onChange(event) {
        let note = {};
         note.noteId = this.state.noteId;
        note[event.target.name] = event.target.value;
        this.setState({currentNote:note});
    };

    onUpdateNote = () => {
        const params = this.state.currentNote;
        this.setState({
            showModal: !this.state.showModal,
            noteId: null,
        });
        noteRequest.updateNote(params)
            .then(res => {
                toast.success('ノート追加');
            })
            .catch(err => {
                toast.error('エーラーが発生した');
                console.warn(err);
            })
    };

    checkoutModal() {
        let currentNote = this.state.notes.find(x => x.id === this.state.noteId) || {};
        return (
            <Modal isOpen={this.state.showModal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>コンテンツを編集する</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label for="title" sm={2}>タイトル</Label>
                        <Col sm={10}>
                            <Input type="text" name="title" defaultValue={currentNote.title} placeholder="Title"
                                   onChange={(event) => this.onChange(event)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleText" sm={2}>デスクリプション</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="description" defaultValue={currentNote.description}
                                   placeholder="Description"
                                   onChange={(event) => this.onChange(event)}/>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onUpdateNote}>Update</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return (
            <Container className="app flex-col align-items-center">
                <CardTitle className="text-center mt-4">
                    <img
                        src="https://avatars3.githubusercontent.com/u/22492465?s=460&u=f4a43a0e8510b334554ef369f006e9df9e4fbdbb&v=4"
                        alt='empty' className="rounded-circle rounded-sm" style={{height: '70px', width: '70px'}}/>
                    <Row>
                        <Col>{this.state && this.state.userInfo && (this.state.userInfo.name || '')}</Col>
                    </Row>
                </CardTitle>
                <Button onClick={this.openAddNote}>&#43;</Button>
                <hr style={{width: "85%"}}/>
                <Popup
                    style={{width: "50%"}}
                    open={this.state.showAddNote}
                    closeOnDocumentClick
                    onClose={this.closeAddNote}
                >
                    <NewNoteModal
                        closePopup={this.closeAddNote}
                        updateNotes={this.getNotes.bind(this)}
                    />
                </Popup>

                {
                    this.state.notes.map((note, index) =>
                        <div key={index}>
                            <Card style={{minWidth: "300px"}}>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <CardTitle
                                                style={{fontSize: "20px", fontWeight: "bold"}}>{note.title}</CardTitle>
                                            <CardText>{note.created_at.substr(0, note.created_at.indexOf('T'))}</CardText>
                                        </Col>
                                        <Col md={6}>
                                            <ButtonGroup>
                                                <Button onClick={() => this.openNoteDetail(note)}>&#128065;</Button>
                                                <Button onClick={() => this.toggle(note.id)}>&#9998;</Button>
                                                <Button onClick={this.deleteNote.bind(this, note)}>&#9747;</Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    )
                }

                {this.state.showNoteDetail && (
                    <Popup modal
                           open={this.state.showNoteDetail}
                           onClose={this.closeNoteDetail}
                    >
                        <NoteDetailModal
                            closePopup={this.closeNoteDetail}
                            id={this.state.currentNote.id}
                            title={this.state.currentNote.title}
                            description={this.state.currentNote.description}
                        />
                    </Popup>
                )}
                <div style={{position: 'fixed', bottom: '0', marginBottom: '100px'}}>
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

                <div className="mb-5 text-center" style={{position: 'fixed', bottom: '0'}}>
                    <footer className="app-footer ">
                        <hr style={{width: "100vh"}}/>
                        <Button className="btn" color="primary" onClick={this.handleLogout}>ログアウト</Button>
                    </footer>
                </div>
                {this.checkoutModal()}
            </Container>
        )
    }
}

export default Home;
