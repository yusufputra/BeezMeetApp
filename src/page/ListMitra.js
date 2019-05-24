import React, { Component } from 'react';
import { Layout, Breadcrumb, Table } from 'antd';
import Axios from 'axios';
const { Content } = Layout;


export default class ListMitra extends Component {
    state = {
        loading : false,
        data : []
    }
    componentWillMount() {
        this.setState({loading: true});
        const token = JSON.parse(localStorage.token);
        Axios.get('https://backend-bem.herokuapp.com/api/web/protected/getRekapData', {
            headers: {
                authorization: 'bearer ' + token.token
            }
        }).then(ress=>{
            console.log(ress.data);
            this.setState({data:ress.data});
            this.setState({loading: false});
        })
    }
    render() {
        const column = [
            {
                title: 'NIM',
                dataIndex: 'nim',
                sorter: (a, b) => a.nim - b.nim,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Kode Mitra',
                dataIndex: 'kodeMitra',
                sorter: (a, b) => a.kodeMitra - b.kodeMitra,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Nama Mitra',
                dataIndex: 'namaMitra',
            },
            {
                title: 'Timestamp',
                dataIndex: 'timestamp',
                sorter: (a, b) => a.timestamp - b.timestamp,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Bulan',
                dataIndex: 'bulan',
                sorter: (a, b) => a.bulan - b.bulan,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Tahun',
                dataIndex: 'tahun',
                sorter: (a, b) => a.tahun - b.tahun,
                sortDirections: ['descend', 'ascend'],
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
                        List Rekap Data
                        {this.state.loading && (<center><img src="https://i.imgur.com/AfRTFrY.gif" width="100px" alt="Loading..."/></center>)}
                        <Table columns={column} dataSource={this.state.data}/>
                    </div>
                </Content>
            </div>
        )
    }
}
