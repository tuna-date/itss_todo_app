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
class Register extends Component {

   

  handleRegister(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('re-password').value;

    if (password.length < 6) {
      toast.warn('パスワードの長さは6字より大きくなければなりません');
      return;
    }

    if (password !== rePassword) {
      toast.warn('パスワードと確認パスワードは合っていない');
      return;
    }

    const params = {
      name,
      email,
      password
    }

    authRequest.register(params)
      .then(res => {
        toast.success("登録完成");
      })
      .catch(err => {
        toast.warn(err.message);
        console.warn(err);
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <CardGroup>
                    <Col className="text-center mb-2">
                      <h1>{labelText.register.header}</h1>
                    </Col>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          名
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="name" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="email" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          &#128274;
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          &#128274;
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="re-password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block onClick={this.handleRegister}>{labelText.register.register_button}</Button>
                    <Col className="text-center mt-3">
                      <Link to="/login">
                        {labelText.register.return_login_button}
                      </Link>
                    </Col>
                  </CardGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
