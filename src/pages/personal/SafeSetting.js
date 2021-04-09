import React, {useState} from 'react';
import {List, Modal, Form, Input} from 'antd';

const BasicSetting = () => {
    const [isModalVisible, setModalVisible] = useState(false)
    const editPassword = () =>{
        setModalVisible(true)
    }
    const editMobile = () =>{
        setModalVisible(true)
    }
    const list = [
        {
            title: '账户密码',
            description:'当前密码强度：：强',
            actionText: '修改',
            action: editPassword

        },
        {
            title: '密保手机',
            description:'已绑定手机：138****8293',
            actionText: '修改',
            action: editMobile
        },
        {
            title: '密保问题',
            description:'未设置密保问题，密保问题可有效保护账户安全',
            actionText: '设置'
        },
        {
            title: '备用邮箱',
            description:'已绑定邮箱：：ant***sign.com',
            actionText: '修改'
        },
        {
            title: 'MFA 设备',
            description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
            actionText: '绑定'
        },
    ];
    const handleOk  = () =>{

    }
    const handleCancel = () =>{

    }
    const onFinish = () =>{

    }
    const onFinishFailed = () =>{

    }
    return (
        <div>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit" onClick={item.action}>{item.actionText}</a>]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default BasicSetting
