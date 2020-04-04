import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardFooter,
  // CardHeader,
  Col, Container, //Form,
  FormGroup,
  // FormText,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  //InputGroup,
  TabContent,
  // Table,
  TabPane
} from 'reactstrap';
import config from "../../Config/strings";
import $ from 'jquery';
import Spinner from "reactstrap/es/Spinner";
import assets from "../../Config/assets";
import GetComponent from "../Component/GetComponent";

window.jQuery = $;
require('bootstrap');

class EditItem extends GetComponent {
  constructor(props) {
    super(props);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    const ITEM_ID = this.props.match.params.id;
    this.state = {
      itemId: ITEM_ID,
      activeTab: new Array(4).fill('1'),
      description: "",
      isLoaded: false,

    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  updateItem() {
    let requestData = this.state.item;
    let updateUrl = config.api_url + '//' + this.state.itemId;
    let token = localStorage.getItem('token');
    fetch(updateUrl, {
      method: 'PUT',
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      }),
      body: JSON.stringify(requestData)
    }).then((res) => res.json())
      .then(() => {

        const getAlert = () => (
          <SweetAlert
            success
            timeout={1500}
            onConfirm={() => this.props.history.push('/list')}
          >
            Bạn đã cập nhật thông tin công việc thành công !
          </SweetAlert>
        );

        this.setState({
          alert: getAlert()
        });
      })
      .catch((err) => console.log(err))
  }

  componentDidMount() {
    GetComponent.getData('//' + this.state.itemId,(responseJson) => {
      this.setState({item: responseJson.data, isLoaded: true});
    });
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
      item: {
        ...this.state.item,
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

  toggleLarge() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  handleChangeData = (event) => {
    let input = event.target;
    this.setState({
      item:
        {
          ...this.state.item,
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
              <div id="AddItem">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Tên công việc</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" defaultValue={this.state.item.name}
                           onChange={(event) => this.handleChangeData(event)}/>
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
                      defaultValue={this.state.item.description}
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
                  <Button className="mr-1 btn-danger" type="submit"
                          onClick={() => this.props.history.goBack()}>Hủy</Button>
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                          onClick={() => this.updateItem()}>Cập nhật</Button>
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
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">CẬP NHẬT THÔNG TIN CÔNG VIỆC</p>
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
    }}
}

export default EditItem;
