import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './asset/style.css';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Home from './page/Home';
import TambahMitra from './page/TambahMitra';
import Login from './page/Login';
import NotFound from './page/NotFound';

const { Header, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    if (localStorage.token === undefined) {
      return (
        <div>
          <Login></Login>
        </div>
      );
    } else {


      return (
        <div>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo">
                <center><img src="/img/logobem2.png" width={'30%'} style={{ padding: '10px' }} alt={"Logo BEM FILKOM"}/></center>
              </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="pie-chart" />
                      <span>Statistika</span>
                    </span>
                  }
                >
                  <Menu.Item key="2"><Link to={'/'}>Chart</Link></Menu.Item>
                  <Menu.Item key="3"><Link to={'/list'}>list</Link></Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="desktop" />
                      <span>Kemitraan</span>
                    </span>
                  }
                >
                  <Menu.Item key="4"><Link to={'/listMitra'}>List Mitra</Link></Menu.Item>
                  <Menu.Item key="5"><Link to={'/tambahMitra'}>Tambah Mitra</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              {/* Start of Content */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/tambahMitra" component={TambahMitra} />
                <Route component={NotFound} />
              </Switch>
              {/* End of Content */}
              <Footer style={{ textAlign: 'center' }}>Bismit ©2019 Created with love by PIT BEM FILKOM 2019</Footer>
            </Layout>
          </Layout>

        </div>
      )
    }
  };

}

export default App;
