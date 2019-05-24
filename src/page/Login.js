import React, { Component } from 'react';
import { Form, Input, Button, Row, Col} from 'antd';
import '../asset/style.css';
import Axios from 'axios';

export default class Login extends Component {
  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      loading: false
    }
  }
  redirect() {
    window.location.href = "#/";
  }
  login = async (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const body = {

      "nim": this.state.username,
      "pass": this.state.password

    }

    try {
      const data = await Axios.post('https://backend-bem.herokuapp.com/auth/login', body);
      console.log(data.data);
      if (data.status) {

        const auth = {
          authorization: 'bearer ' + data.data.token
        }
        console.log(auth)
        try {
          await fetch('https://backend-bem.herokuapp.com/api/web/protected/cekAdminBismit', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'bearer ' + data.data.token
            },
            body: JSON.stringify(body)
          }).then(ress => {
            if (ress.ok) {
              return ress.json();
            }
          }).then(result => {
            console.log(result);
            if (result.status === true && result.value === "1") {
              const payload = {
                "data": data.data,
                "token": data.data.token,
                "level": result.value
              }
              localStorage.token = JSON.stringify(payload);
              this.setState({ loading: false });
              window.location.href = "/";
            } else {
              alert('youre not admin');
              this.setState({ loading: false });
            }

          })

        }
        catch{
          this.setState({ loading: false });
          alert('youre not admin');
        }
      }
    }
    catch{
      this.setState({ loading: false });
      alert('nim atau password salah');
    }


  }
  render() {

    return (
      <div style={{ width: '100%', height: '670px', padding: '50px' }}>
        <Row>
          <Col md={1}></Col>
          <Col md={22} className="cardLogin">
            <Row>
              <Col md={15} className="loginRes" style={{ backgroundColor: '#f2f2f2', height: '85vh' }}>
                <img src="../img/logobem4.png" className="imgLogin" alt="Logo BEM"></img>
              </Col>
              <Col md={9} className="button" style={{ backgroundColor: '#ffffff', height: '85vh' }}>
                <div className="txtJudul">
                  <p>Welcome</p>
                </div>
                <div className="formLogin">
                  <Form onSubmit={this.login}>
                    <Row>
                      <Col md={1}></Col>
                      <Form.Item>
                        <Col md={20} className="txtNIM">
                          <Input placeholder="NIM" style={{ height: '100%' }} onChange={(value) => { this.setState({ username: value.target.value }) }}></Input>
                        </Col>
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col md={1}></Col>
                      <Form.Item>
                        <Col md={20} className="txtPassword">
                          <Input type="password" placeholder="Password" style={{ height: '100%' }} onChange={(value) => { this.setState({ password: value.target.value }) }}></Input>
                        </Col>
                      </Form.Item>
                    </Row>

                    <Row>
                      <Col md={1}></Col>
                      <Col md={20} className="btnLogin">
                        {(this.state.loading === false) && (<Button htmlType="submit" type="primary" style={{ height: '45px', width: '100%' }}>Login</Button>)}

                        {this.state.loading && (<center><img src="https://i.ibb.co/0t3vZWt/Ellipsis-1s-200px.gif" width="100px" alt="Loading..." /></center>)}
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
