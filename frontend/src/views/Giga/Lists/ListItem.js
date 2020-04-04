import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardHeader,
  Col, Modal, ModalBody,
  // ModalFooter,
  ModalHeader,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  TabContent,
  Table,
  TabPane, Spinner, Container, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import config from "../../Config/strings";
import styles from "../../Config/styles";
import GetComponent from "../Component/GetComponent";

class ListItem extends GetComponent {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      data: [],
      currentItem: {},
      listRequestItems: [],
      modalId: undefined,
      currentRequestItem: {},
      modalRequestId: 0,
      alert: null,
      filterField: {
        name: "",
        email: "",
        number_phone: "",
      }
    };
  }

  componentDidMount() {
    GetComponent.getData("/companies?type=agency",(responseJson) => {
      console.log(responseJson.data);
      this.setState({data: responseJson.data, isLoaded: true});
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }

  renderAlert(id,index){
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={()=>this.deleteItem(id,index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>

    );
    this.setState({
      alert: getAlert()
    });
  }
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  deleteItem(id, index) {
    let token = localStorage.getItem('token');
    let url = config.api_url + "/companies/";
    fetch(url + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    }).then((res) => res.json())
      .then((responseJson) => {
        // this.hideAlert();
        // this.state.data.splice(index, 1);
        if (responseJson.data) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => {
                this.hideAlert();
                this.state.data.splice(index, 1)
              }}
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

  togglePrimary(index) {
    this.setState({
      showModal: !this.state.showModal,
      modalId: index,
    });
  }

  handleChange(event) {
    this.state.filterField[event.target.name] = event.target.value;
    this.setState(({filterField: this.state.filterField}));
  }

  isSuitableItem(item) {
    let fields = this.state.filterField;
    return ((item.name && item.name.toLowerCase().indexOf(fields.name.toLowerCase())) !== -1) &&
      ((item.email && item.email.toLowerCase().indexOf(fields.email.toLowerCase())) !== -1);
  }

  renderListRow() {
    let filtering = (this.state.filterField.name || this.state.filterField.email || this.state.filterField.number_phone);
    let lists;
    if (!filtering) {
      lists = this.state.data;
    } else {
      lists = this.state.data.filter(x => this.isSuitableItem(x));
    }
    return lists.map((data, index) =>
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>
          <Button onClick={() => this.togglePrimary(data.id)} className="mr-1 btn-info">
            <i className="fa fa-eye"/>
          </Button>
          <Button className="mr-1 btn-primary" color="primary" onClick={() => {
            this.props.history.push("/edit/" + data.id);
          }}>
            <i className="cui-pencil icons font-lg "/>
          </Button>
          <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}>
            <i className="cui-trash icons font-lg "/>
          </Button>

        </td>
      </tr>);
  }

  tabPane() {

    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th style={styles.topVertical}>Mã</th>
                  <th>Tên công việc
                    <Input bsSize="sm" type="text" id="name" name="name"
                                        className="input-sm" placeholder="Tìm kiếm"
                                        onChange={(event) => this.handleChange(event)}/>

                  </th>
                  <th>Nội dung công việc
                    <Input bsSize="sm" type="text" id="email" name="email"
                                  className="input-sm" placeholder="Tìm kiếm"
                                  onChange={(event) => this.handleChange(event)}/>

                </th>
                  <th style={styles.topVertical}>Nút lệnh</th>
                </tr>
                </thead>
                <tbody>
                {this.renderListRow()}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
      </>
    );
  }

  renderModal() {
    let data = this.state.data;
    if (this.state.modalId != null) {
      let currentItem = data.find(x => x.id === this.state.modalId);
      let index = this.state.modalId;
      return (
        <Modal isOpen={this.state.showModal} toggle={() => this.togglePrimary()}
               className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={() => this.togglePrimary(index)}>Xem chi tiết công việc</ModalHeader>
          <ModalBody>
            <Container>

              <Row className="show-grid">
                <Col xs={6} md={4}>
                 <img src={currentItem.avatar} alt="" style={{width: 240}}/>
                </Col>
                <Col xs={6} md={8}>
                  <p><h3>{currentItem.name}</h3></p>
                </Col>
              </Row>
              <hr/>
              <div>
                <h4>GIỚI THIỆU</h4>
                <div>{currentItem.description}</div>
              </div>
            </Container>
          </ModalBody>
        </Modal>

      );
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">


          <Row>

            <Col xs="12" md="6">
              <p className="font-weight-bold">DANH SÁCH CÔNG VIỆC</p>
            </Col>
            <Col xs="12" md="6">
              <Button block color="info" className="btn btn-primary float-right" style={{width: 200}} onClick={() => {
                this.props.history.push("/add")
              }}>+ Thêm công việc mới</Button>
            </Col>
          </Row>
          <Row style={styles.lowMarginTop}>
            <Col xs="12" md="12" className="mb-4">

              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
            </Col>
          </Row>
          {this.renderModal()}
          {this.state.alert}
          {/*{this.renderRequestModal()}*/}
        </div>
      );
    }
  }
}

export default ListItem;
