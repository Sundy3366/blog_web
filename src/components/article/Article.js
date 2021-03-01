import React, {useEffect, useState} from 'react';
import {getArticle} from '@request'
import {Button, Avatar, Input} from 'antd';
import history from '@history'
import styles from '@css/article/article.module.scss'
import Comment from '@components/article/Comment'
const { TextArea } = Input;
const Article = (props) => {
    const {articleId} = props.match.params
    const [article, setArticle] = useState(null)
    useEffect(() => {
        getArticle(articleId).then(res => {
            setArticle(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles['article-container']}>
                <div className={styles.article}>
                    <Button
                        className={styles.edit}
                        style={{float: 'right'}}
                        type='link'
                        onClick={() => history.push(`/edit/${articleId}`)}>
                        编辑文章
                    </Button>
                    <h1>{article?.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: article?.htmlContent}}/>
                    <div className={styles.author}>
                        <Avatar
                            size={60}
                            src="https://upload.jianshu.io/users/upload_avatars/15884256/e58a844d-08f8-47b4-b947-79818093d797?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp"/>
                        <div className={styles.desc}>
                            <div>不忘初心_6b23</div>
                            <div>总资产4 (约0.36元)共写了9624字获得45个赞共22个粉丝</div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.myComment}>
                            <Avatar
                                size={60}
                                src="https://upload.jianshu.io/users/upload_avatars/15884256/e58a844d-08f8-47b4-b947-79818093d797?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp"/>
                            <TextArea placeholder="textarea with clear icon" allowClear/>
                        </div>
                        <Button htmlType="submit"  type="primary" style={{margin: '20px 60px'}}>
                           发布
                        </Button>
                    </div>

                    <div className={styles.comment}>
                        <Comment>
                            <Comment>
                                <Comment/>
                            </Comment>
                        </Comment>
                    </div>
                </div>

                <div className={styles.recommend}>
                    <div>推荐阅读</div>
                    <div className={styles.list}>
                        <div className={styles.item}>
                            <div>Error: Cannot find module 'webpack-cli/bin/config-yargs'</div>
                            <div>阅读 1,345</div>
                        </div>
                        <div className={styles.item}>
                            <div>Error: Cannot find module 'webpack-cli/bin/config-yargs'</div>
                            <div>阅读 1,345</div>
                        </div>
                        <div className={styles.item}>
                            <div>Error: Cannot find module 'webpack-cli/bin/config-yargs'</div>
                            <div>阅读 1,345</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
export default Article
