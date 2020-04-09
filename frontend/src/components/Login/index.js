import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        localStorage.setItem('loggedIn', true);
        window.location.href = "/home";
      })
      .catch(err => {
        toast.warn('メールとパスワードが合っていない！')
        console.warn(err);
        return;
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody className="w-200">
                    <div id="login">
                      <h1 className="text-center mb-4">{labelText.login.header}</h1>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            @
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" placeholder="Email" autoComplete="Email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            &#128274;
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row className="mb-3">
                        <Col className="text-center ">
                          <Button type="submit" value="SEND POST" color="primary" className="px-4"
                            onClick={this.handleLogin}> {labelText.login.login_button} </Button>
                        </Col>
                      </Row>
                      <Col className="text-center">
                        <Link to="/register">{labelText.login.register_button}</Link>
                      </Col>
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
