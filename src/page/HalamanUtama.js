import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import QrReader from "react-qr-reader";
import Axios from "axios";
import "../asset/style2.css";

const { Header, Content, Footer } = Layout;

export default class HalamanUtama extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      loading: false
    };
  }

  openImageDialog() {
    this.refs.qrReader1.openImageDialog();
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: "Loading...",
        loading: true
      });
      let link = data;
      var res = link.split("=");
      const token = JSON.parse(localStorage.token);
      const date = new Date();
      const body = {
        id: res[1]
      };
      Axios.post(
        "https://backend-bem.herokuapp.com/api/web/protected/getOwnMitra",
        body,
        {
          headers: {
            authorization: "bearer " + token.token
          }
        }
      ).then(ress => {
        const bodydata = {
          namaMitra: ress.data.value[0].namaMitra,
          kodeMitra: ress.data.value[0].id,
          bulan: date.getMonth() + 1,
          tahun: date.getFullYear()
        };
        Axios.post(
          "https://backend-bem.herokuapp.com/api/web/protected/postData",
          bodydata,
          {
            headers: {
              authorization: "bearer " + token.token
            }
          }
        )
          .then(ress => {
            alert("Successful!! \n Show this to merchant and get special discount for your payment");
            this.setState({
              result: "",
              loading: false
            });
          })
          .catch(err => {
            alert("Gagal Mendapatkan Merch. error: " + err);
            this.setState({
              result: "",
              loading: false
            });
          });
      });
    }
  };

  handleError = err => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo">
              <center>
                <img
                  src="https://i.imgur.com/RFon6fs.png"
                  width={50}
                  style={{ padding: "10px" }}
                  alt={"Logo BEM FILKOM"}
                />
              </center>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            />
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 64 }}>
            <Breadcrumb style={{ margin: "17px 0" }}>
              <Breadcrumb.Item>BEM FILKOM</Breadcrumb.Item>
              <Breadcrumb.Item>Promo</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
              <h3 style={{ textAlign: "center" }}>Scan Here</h3>
              {this.state.loading === true && (
                <img
                  src="https://i.imgur.com/AfRTFrY.gif"
                  width="100%"
                  alt="Loading..."
                />
              )}
              {this.state.loading === false && (
                <QrReader
                  delay={100}
                  ref="qrReader1"
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: "100%" }}
                />
              )}

              {/* <input type="button" value="Submit QR Code" onClick={this.openImageDialog} /> */}
              <p>{this.state.result}</p>
              <center>
                <Button
                  style={{
                    bottom: 0
                  }}
                  type="danger"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </center>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Bismit ©2019 Created with love by PIT BEM FILKOM 2019
          </Footer>
        </Layout>
      </div>
    );
  }
}
