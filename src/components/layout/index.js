import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    Link, Route, Router, Switch
} from 'react-router-dom'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import '@ant-design/pro-layout/dist/layout.css';
import history from '@history'
import Home from '@components/layout/Home'
import Welcome from '@components/layout/Welcome'
import Admin from '@components/layout/Admin'
import {PrivateRoute} from '@utils'
const content = (
    <>
        {/*<Descriptions size="small" column={2}>
            <Descriptions.Item label="创建人">张三</Descriptions.Item>
            <Descriptions.Item label="创建人">
                <span style={{color: '#4aacee'}} onClick={jumpEdit}>写文章</span>
            </Descriptions.Item>

            <Descriptions.Item label="联系方式">
                <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
        </Descriptions>
        <ArticleList/>*/}
        <Router history={history}>
            <Switch>
                <Route exact path="/home" component={Home}></Route>
                <PrivateRoute path='/welcome' component={Welcome}/>
                <PrivateRoute path='/admin' component={Admin}/>
            </Switch>
        </Router>
    </>

);

export default () => {
    const [settings, setSetting] = useState(undefined);
    const [pathname, setPathname] = useState('/home');
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                {...defaultProps}
                location={{
                    pathname,
                }}
                fixSiderbar
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(menuItemProps, defaultDom) => {
                    // return <Link to={menuItemProps.path}>{defaultDom}</Link>;
                     return <a
                         onClick={() => {
                             setPathname(menuItemProps.path || '/welcome');
                         }}
                     >
                         {defaultDom}
                     </a>
                }}
                rightContentRender={() => (
                    <div>
                        <Avatar shape="square" size="small" icon={<UserOutlined />} />
                    </div>
                )}
                {...settings}
            >
                <PageContainer
                    content={content}
                />
            </ProLayout>
            <SettingDrawer
                pathname={pathname}
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={setSetting}
            />
        </div>
    );
};
