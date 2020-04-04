// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
//
// import usersData from './UsersData'
//
// function UserRow(props) {
//   const user = props.user
//   const userLink = `/users/${user.id}`
//
//   const getBadge = (status) => {
//     return status === 'Active' ? 'success' :
//       status === 'Inactive' ? 'secondary' :
//         status === 'Pending' ? 'warning' :
//           status === 'Banned' ? 'danger' :
//             'primary'
//   }
//
//   return (
//     <tr key={user.id.toString()}>
//       <th scope="row"><Link to={userLink}>{user.id}</Link></th>
//       <td><Link to={userLink}>{user.name}</Link></td>
//       <td>{user.registered}</td>
//       <td>{user.role}</td>
//       <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
//     </tr>
//   )
// }
//
// class Users extends Component {
//
//   render() {
//
//     const userList = usersData.filter((user) => user.id < 10)
//
//     return (
//       <div className="animated fadeIn">
//         <Row>
//           <Col xl={6}>
//             <Card>
//               <CardHeader>
//                 <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
//               </CardHeader>
//               <CardBody>
//                 <Table responsive hover>
//                   <thead>
//                     <tr>
//                       <th scope="col">id</th>
//                       <th scope="col">name</th>
//                       <th scope="col">registered</th>
//                       <th scope="col">role</th>
//                       <th scope="col">status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userList.map((user, index) =>
//                       <UserRow key={index} user={user}/>
//                     )}
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     )
//   }
// }
//
// export default Users;
import React, {Component} from 'react';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  // TabContent,
  Table,
  TabPane
} from 'reactstrap';
import Spinner from "reactstrap/es/Spinner";
import config from "../Config/strings";

class Users extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      data: [],
    };
  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  componentDidMount() {
    this.getAdByPage();
  }

  getAdByPage() {
    let token = localStorage.getItem('token');
    let url = config.api_url + "/users";
   // let url = "http://159.65.136.144:4001/api/v1/users";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.data);
      let filteredData  = responseJson.data.filter( (item) => {
        return item.level === 'super_admin';
      });
      this.setState({data: filteredData, isLoaded: true});
    }, function (error) {
    })
  }


  render() {
    if (!this.state.isLoaded) {
      return <Spinner></Spinner>
    } else {
      let data = this.state.data;

      const content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td><img src={data.avatar} style={{height: 70}}/></td>
          <td>{data.name}</td>
          <td>{data.mobile_phone}</td>
          <td>{data.email}</td>
          <td>{data.address}</td>
          <td>
            <Button className="mr-1" color="primary" ><i className="fa fa-eye "></i></Button>
            <Button className="mr-1" color="info" ><i className="cui-pencil icons font-lg "></i></Button>
            <Button className="mr-1" color="danger" ><i className="cui-trash icons font-lg "></i></Button>
          </td>
        </tr>
      );
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
                <p className="font-weight-bold">TÀI KHOẢN THÀNH VIÊN QUẢN TRỊ</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">

              <Nav tabs>
                <NavItem>
                  <NavLink>

                    <TabPane tabId="2">
                      <Card>
                        <CardBody>
                          <Table responsive>
                            <thead>
                            <tr>
                              <th>STT</th>
                              <th>Avatar</th>
                              <th>Họ tên</th>
                              <th>Số ĐT</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Nút lệnh</th>
                            </tr>
                            </thead>
                            <tbody>
                            {content}
                            </tbody>
                          </Table>

                        </CardBody>
                      </Card>
                    </TabPane>
                  </NavLink>
                </NavItem>

              </Nav>
              {/*<TabContent activeTab={this.state.activeTab[1]}>*/}
              {/*  {this.tabPane()}*/}
              {/*</TabContent>*/}
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Users;
