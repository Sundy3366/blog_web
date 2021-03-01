import React from 'react';
import { Form, Input, Button, message } from 'antd';
import {login} from '@request'
import history  from '@history'
import styles from '@css/user/user.module.scss'
const Login = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = (values: any) => {
        login(values).then(res =>{
            console.log(res);
            if(!res.isSuccess){
                message.error(res.message)
            }else{
                message.success('登录成功！')
                history.push('/home')
            }
        })

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    /*跳转注册*/
    const jumpRegister = () =>{
        console.log('@@@@@@');
        history.push('/register')
    };
    return (
        <div className={styles['login-container']}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <div onClick={jumpRegister} className={styles.tips}>还没有账号，去注册</div>
        </div>

    )
}
export default Login
