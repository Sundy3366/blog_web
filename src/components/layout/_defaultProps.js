import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined, UserOutlined } from '@ant-design/icons';
export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/home',
                name: '主页',
                icon: <SmileOutlined />,
                component: './Home',
            },
            {
                path: '/welcome',
                name: '欢迎中心',
                icon: <TabletOutlined />,
                component: './Welcome',
            },
            {
                path: '/admin',
                name: '管理页',
                icon: <CrownOutlined />,
                component: './Admin',
            },
            {
                path: '/personal',
                name: '个人中心',
                icon: <UserOutlined />,
                component: './Personal',
            }
        ],
    },
    location: {
        pathname: '/',
    }
};
