import React from 'react';
import { Button } from 'antd';
import history from '@history'
import ArticleList from '@components/article/ArticleList'
import { createArticle } from "@request";

const Home = () => {
    function jumpEdit() {
        createArticle({
            categoryId: '1234',
            title: '2020-02-24'
        }).then(res =>{
            console.log(res);
            history.push(`/edit/${res.data.articleId}`)
        })
    }
    return (
        <>
            <Button type={'primary'} onClick={jumpEdit}>写文章</Button>
            {/*<span style={{color: '#4aacee'}} onClick={jumpEdit}>写文章</span>*/}
            {/*<Descriptions>
                <Descriptions.Item label="创建人12345654321">
                    <span style={{color: '#4aacee'}} onClick={jumpEdit}>写文章</span>
                </Descriptions.Item>
            </Descriptions>*/}
            <ArticleList/>
        </>
    )
}
export default Home
