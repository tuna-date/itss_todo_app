import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardFooter,
  // CardHeader,
  Col, Container,
  // Form,
  FormGroup,
  // FormText,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  TabContent,
  // Table,
  TabPane
} from 'reactstrap';
import config from "../../Config/strings";
import Spinner from "reactstrap/es/Spinner";
import $ from 'jquery';
import assets from "../../Config/assets";
import GetComponent from "../Component/GetComponent";
// import 'bootstrap/dist/css/bootstrap.css';
window.jQuery = $;
require('bootstrap');

class CreateItem extends GetComponent {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      alert: null,
    };
  }
  componentDidMount() {

  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  CreateItem() {
    let url = config.api_url + '/';
    let token = localStorage.getItem('token');
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      }),
      body: JSON.stringify({

      })
    }).then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => this.props.history.push('/')}
            >
              {responseJson.message}
            </SweetAlert>
          );

          this.setState({
            alert: getAlert()
          });

        } else {
          const getAlert = () => (
            <SweetAlert
              onConfirm={() => this.hideAlert()}
            >
              {responseJson.errors.message}
            </SweetAlert>
          );

          this.setState({
            alert: getAlert()
          });
        }

      })
      .catch((err) => console.log(err))
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }

  onChange(content) {
    console.log(content);
    this.setState({
      investor: {
        ...this.state.investor,
        description: content
      }
    });
  }

  onImageUpload = (fileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);

  };

  handleChangeData = (event) => {
    let input = event.target;
    this.setState({
      agency:
        {
          ...this.state.agency,
          [input.name]: input.value
        }
    });
  };

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <div id="CreateItem">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="name">Tên công việc</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Nội dung công việc</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <ReactSummernote
                      name="description"
                      id="description"
                      value={this.state.description}
                      options={{
                        lang: 'ru-RU',
                        height: 100,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']],
                          ['insert', ['link', 'picture', 'video']],
                          ['view', ['fullscreen', 'codeview']]
                        ]
                      }}
                      onChange={(content) => this.onChange(content)}
                      onImageUpload={this.onImageUpload}
                    />
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit" onClick={() => {
                    this.props.history.push("/lists/")
                  }}>Hủy</Button>
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                          onClick={() => this.CreateItem()}>Hoàn thành</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </TabPane>
      </>
    )
      ;
  }

  render() {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">THÊM CÔNG VIỆC MỚI</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
                {this.state.alert}
              </TabContent>
            </Col>
          </Row>
        </div>
      );
  }
}

export default CreateItem;
