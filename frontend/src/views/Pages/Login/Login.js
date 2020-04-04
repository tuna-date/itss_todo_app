import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  // Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import config from "../../Config/strings";

class Login extends Component {

  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  componentDidMount() {
  }

  login(event) {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    fetch(config.api_url + '/auth/login', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        "session": {
          "email": email,
          "password": password
        }
      })
    }).then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',data.data.level);
        let info = JSON.stringify(data.data);
        localStorage.setItem('data', info);
        window.location.href = "/home";
        console.log(localStorage);
      })
      .catch((err) => {
        console.log(err);

        // this.props.history.push('/buttons');
        //window.location.href = "/login";
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div id="Login">
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">Đăng nhập vào tài khoản của bạn.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" placeholder="Email" autoComplete="Email"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" value="SEND POST" color="primary" className="px-4"
                                  onClick={() => this.login()}>Đăng nhập</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Quên mật khẩu?</Button>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                  <CardBody className="text-center">
                    <div>
                      <h2>TNTB</h2>
                      <p>Hệ thống quản lý quản lý công việc.</p>
                      {/*<Link to="/register">*/}
                      {/*  <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>*/}
                      {/*</Link>*/}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
