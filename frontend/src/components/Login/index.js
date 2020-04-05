import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import './styles.scss';
import AuthRequest from '../../request/AuthRequest';
import labelText from '../../utils/labeText';

const authRequest = new AuthRequest();

class Login extends Component {

  handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const params = {
      email,
      password
    };

    authRequest.login(params)
      .then(res => {
        localStorage.setItem('jwtToken', res.token);
        window.location.href = "/home";
      })
      .catch(err => {
        console.warn(err);
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
                    <div id="login">
                      <h1>{labelText.login.header}</h1>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" placeholder="Email" autoComplete="Email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" value="SEND POST" color="primary" className="px-4"
                            onClick={this.handleLogin}> {labelText.login.login_button} </Button>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <Link to="/register">
                      <Button color="primary" className="mt-3"> {labelText.login.register_button} </Button>
                    </Link>
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
