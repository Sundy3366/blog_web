import React from 'react';
import { Descriptions } from 'antd';
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
            <Descriptions>
                <Descriptions.Item label="创建人">
                    <span style={{color: '#4aacee'}} onClick={jumpEdit}>写文章</span>
                </Descriptions.Item>

                <div>欢迎！哈哈</div>
            </Descriptions>

            <ArticleList/>
        </>
    )
}
export default Home
