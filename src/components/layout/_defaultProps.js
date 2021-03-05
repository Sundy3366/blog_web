import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined } from '@ant-design/icons';
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
                name: '欢迎',
                icon: <TabletOutlined />,
                component: './Welcome',
            },
            {
                path: '/admin',
                name: '管理页',
                icon: <CrownOutlined />,
                access: 'canAdmin',
                component: './Admin',
            },
           /* {
                name: '列表页',
                icon: <TabletOutlined />,
                path: '/list',
                component: './ListTableList',
                routes: [
                    {
                        path: '/list/sub-page',
                        name: '一级列表页面',
                        icon: <CrownOutlined />,
                        routes: [
                            {
                                path: 'sub-sub-page1',
                                name: '一一级列表页面',
                                icon: <CrownOutlined />,
                                component: './Welcome',
                            },
                            {
                                path: 'sub-sub-page2',
                                name: '一二级列表页面',
                                icon: <CrownOutlined />,
                                component: './Welcome',
                            },
                            {
                                path: 'sub-sub-page3',
                                name: '一三级列表页面',
                                icon: <CrownOutlined />,
                                component: './Welcome',
                            },
                        ],
                    },
                    {
                        path: '/list/sub-page2',
                        name: '二级列表页面',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/list/sub-page3',
                        name: '三级列表页面',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                ],
            }*/
        ],
    },
    location: {
        pathname: '/',
    },
};
