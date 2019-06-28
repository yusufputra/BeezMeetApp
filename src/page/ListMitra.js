import React, { Component } from 'react';
import { Layout, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import QRCode from 'qrcode.react';
const { Content } = Layout;


export default class ListMitra extends Component {
    state = {
        loading: false,
        data: []
    }
    componentWillMount() {
        this.setState({ loading: true });
        Axios.get('https://backend-bem.herokuapp.com/api/web/public/getMitra').then(ress => {
            this.setState({ data: ress.data });
            this.setState({ loading: false });
        })
    }
    delete = (id) => {
        this.setState({ loading: true });
        const body = {
            id: id
        }
        const token = JSON.parse(localStorage.token);
        Axios.post('https://backend-bem.herokuapp.com/api/web/protected/deleteMitra', body, {
            headers: {
                authorization: 'bearer ' + token.token
            }
        }).then(ress => {
            alert("Berhasil Menghapus");
            this.setState({ loading: true });
            window.location.reload();
        }).catch(err => {
            alert("Gagal Menghapus. error: " + err);
            this.setState({ loading: true });
        })
    }

    render() {
        const column = [
            {
                title: 'Kode Mitra',
                dataIndex: 'key',
                sorter: (a, b) => a.key - b.key,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Nama Mitra',
                dataIndex: 'namaMitra',
            },
            {
                title: 'Syarat',
                dataIndex: 'syarat',
                render: (html) => {
                    return <div dangerouslySetInnerHTML={{ __html: html }} />
                }
            },
            {
                title: 'Benefit',
                dataIndex: 'benefit',
                render: (html) => {
                    return <div dangerouslySetInnerHTML={{ __html: html }} />
                }
            },
            {
                title: 'Author',
                dataIndex: 'nimAuthor',
            },
            {
                title: 'Link',
                dataIndex: 'key',
                render: (html) => {
                    return <QRCode id={"canvas"+html} value={"https://bemfilkom.ub.ac.id/bismit?beli=" + html} onClick={() => {
                        let canvas = document.getElementById("canvas"+html);
                        let link = document.createElement('a');
                        link.download = html+".png";
                        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
                        link.click();
                    }} />
                }
            },
            {
                title: 'Action',
                dataIndex: 'key',
                render: (html) => {
                    return <Link onClick={() => this.delete(html)}>Delete</Link>
                }
            }
        ];

        return (
            <div>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Kemitraan</Breadcrumb.Item>
                        <Breadcrumb.Item>List Mitra</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        List Mitra
                        {this.state.loading && (<center><img src="https://i.imgur.com/AfRTFrY.gif" width="100px" alt="Loading..." /></center>)}
                        <Table columns={column} dataSource={this.state.data} />
                    </div>
                </Content>
            </div>
        )
    }
}
