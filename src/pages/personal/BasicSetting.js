import React, {useEffect, useState} from 'react';
import {
    Form,
    Input,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Upload, message
} from 'antd';
import {updateUserInfo,getUserInfo} from '@request'
import Uploader from '@pages/personal/Uploader'
import styles from '@css/personal/index.module.scss'
import { getSessionItem} from '@utils'
const {Option} = Select;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const BasicSetting = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(null)
    useEffect(()=>{
        let userId = getSessionItem('userId','userInfo')
        getUserInfo(userId).then(res =>{
            // console.log(res);
            if(res.data){
                console.log(res.data);
                setData(res.data)
                console.log(data);
            }
        })
    },[])
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        let userId = getSessionItem('userId','userInfo')
        console.log(userId);
        values.userId = userId
        updateUserInfo(values).then(res =>{
            console.log(res);
        }).catch(err =>{
            console.log(err);
        })
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));

    return (
        <div className={styles.basicSetting}>
            <Uploader/>
            {data && <Form
                style={{width: '500px'}}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={data}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不对!',
                        },
                        {
                            required: true,
                            message: '请输入邮箱',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label="昵称"
                    // tooltip="What do you want others to call you?"
                    rules={[{required: true, message: '请输入昵称!', whitespace: true}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item name="introduction" label="Introduction">
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item
                    name="residence"
                    label="常居地"
                    rules={[
                        {type: 'array', required: true, message: '请选择常居地!'},
                    ]}
                >
                    <Cascader options={residences}/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[{required: true, message: '请输入手机号!'}]}
                >
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="website"
                    label="网址"
                    rules={[{required: true, message: '请输入网址!'}]}
                >
                    <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                        <Input/>
                    </AutoComplete>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        更新基本信息
                    </Button>
                </Form.Item>
            </Form>}

        </div>

    )
}
export default BasicSetting
