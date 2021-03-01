import React, { useEffect, useState } from 'react';
import {List, Avatar, Space} from 'antd';
import {getArticleList} from '@request'
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import history  from '@history'

const ArticleList = () => {
    const [listData,setListData] = useState();
    useEffect(()=>{
        getArticleList({
            pageSize: 10,
            pageNum: 1
        }).then(res =>{
            console.log(res);
            if(res?.data?.list.length){
                setListData(res.data.list)
            }
            else{
                setListData([])
            }
        })
    },[])
    function jumpArticle(value) {
        history.push(`/preview/${value.articleId}`)
    }
    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={listData}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={item => (
                <List.Item
                    style={{cursor: 'pointer'}}
                    onClick={() =>jumpArticle(item)}
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                    ]}
                    extra={
                        <img
                            width={200}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar}/>}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    )
}
export default ArticleList
