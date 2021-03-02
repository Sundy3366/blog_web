import React, { useState } from 'react';
import { Descriptions, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import '@ant-design/pro-layout/dist/layout.css';
import history from '@history'
import { createArticle } from "@request";
import ArticleList from '@components/article/ArticleList'
const content = (
    <>
        <Descriptions size="small" column={2}>
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
        <ArticleList/>
    </>

);
function jumpEdit() {
    createArticle({
        categoryId: '1234',
        title: '2020-02-24'
    }).then(res =>{
        console.log(res);
        history.push(`/edit/${res.data.articleId}`)
    })
}
export default () => {
    const [settings, setSetting] = useState(undefined);
    const [pathname, setPathname] = useState('/welcome');
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
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            setPathname(item.path || '/welcome');
                        }}
                    >
                        {dom}
                    </a>
                )}
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
                onSettingChange={(changeSetting) => setSetting(changeSetting)}
            />
        </div>
    );
};
