import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Axios from 'axios';
import CanvasJSReact from '../asset/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { Content } = Layout;




export default class Home extends Component {
    state = {
        loading: false,
        data: []
    }
    componentWillMount() {
        this.setState({ loading: true });
        const token = JSON.parse(localStorage.token);
        Axios.get('https://backend-bem.herokuapp.com/api/web/protected/getRekapDataByMonth', {
            headers: {
                authorization: 'bearer ' + token.token
            }
        }).then(ress => {
            console.log(ress.data);
            this.setState({ data: ress.data });
            this.setState({ loading: false });
        })
    }

    render() {
        const options = {
            title: {
                text: "Statistik Perbulan"
            },
            animationEnabled: true,
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: this.state.data
                }
            ]
        }
        return (
            <div>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Statistika</Breadcrumb.Item>
                        <Breadcrumb.Item>Chart</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        List Rekap Data
                        {this.state.loading && (<center><img src="https://i.imgur.com/AfRTFrY.gif" width="100px" alt="Loading..." /></center>)}
                        <CanvasJSChart options={options}
                            onRef={ref => this.chart = ref}
                        />
                    </div>
                </Content>
            </div>
        )
    }
}
