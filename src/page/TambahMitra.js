import React, { Component } from 'react';
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from 'axios';

const { Content } = Layout;

class AddMitra extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        editorStateSyarat: EditorState.createEmpty(),
        namaMitra: undefined,
        loading: false,
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                const body = {
                    nama: this.state.namaMitra,
                    benefit: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                    syarat: draftToHtml(convertToRaw(this.state.editorStateSyarat.getCurrentContent()))
                }
                const token = JSON.parse(localStorage.token)
                Axios.post('https://backend-bem.herokuapp.com/api/web/protected/postMitra', body, {
                    headers: {
                        authorization: 'bearer ' + token.token
                    }
                }).then(ress => {
                    this.setState({loading: false});
                    alert("Mitra Berhasil Di Masukkan");
                    window.location.href = '#/listMitra';
                }).catch(err => {
                    this.setState({loading: false});
                    alert("Gagal Memasukkan. error : " + err)
                })
            }
        });
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState,

        });
    };
    onEditorStateChangeSyarat = (editorState) => {
        this.setState({
            editorStateSyarat: editorState,

        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Kemitraan</Breadcrumb.Item>
                        <Breadcrumb.Item>Tambah Mitra</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        Tambah Mitra
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                            <Form.Item label="Nama Mitra">
                                {getFieldDecorator('namaMitra', {
                                    rules: [{ required: true, message: 'Masukkan Nama Mitra :)' }],
                                })(<Input onChange={(val) => { this.setState({ namaMitra: val.target.value }) }} />)}
                            </Form.Item>
                            <Form.Item label="Benefit">
                                {getFieldDecorator('benefit', {
                                    rules: [{ required: true, message: 'Masukkan Benefit :)' }],
                                })(
                                    <Editor
                                        editorState={this.state.editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChange}
                                        placeholder="text here"
                                    />

                                )}
                            </Form.Item>
                            <Form.Item label="Syarat">
                                {getFieldDecorator('syarat', {
                                    rules: [{ required: true, message: 'Masukkan Syarat :)' }],
                                })(
                                    <Editor
                                        editorState={this.state.editorStateSyarat}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChangeSyarat}
                                        placeholder="text here"
                                    />

                                )}
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            {this.state.loading && (<center><img src="https://i.imgur.com/AfRTFrY.gif" width="100px" alt="Loading..."/></center>)}

                        </Form>
                    </div>
                </Content>
            </div>
        )
    }
}

const TambahMitra = Form.create()(AddMitra);
export default TambahMitra;
