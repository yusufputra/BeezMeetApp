import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

export default class Home extends Component {
    render() {
        return (
            <div>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Statistika</Breadcrumb.Item>
                        <Breadcrumb.Item>Chart</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        Halaman Utama
                    </div>
                </Content>
            </div>
        )
    }
}
