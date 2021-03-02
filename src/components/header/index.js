import React from 'react';
import styles from '@css/header/header.module.scss'
import {Button, Row, Col} from 'antd'
import { createArticle } from '@request'
import history from "@history";

const Header = ({showTitle = false, title}) => {
    console.log(showTitle);

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
        <div className={styles.header}>
            <Row>
                <Col span={3}></Col>
                <Col span={18}>
                    <div className={styles.title}>
                        {showTitle && title}
                    </div>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={jumpEdit}>写文章</Button>
                </Col>
                <Col span={1}></Col>
            </Row>

        </div>
    )
}
export default Header
