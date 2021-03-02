import React, {useEffect, useState} from 'react';
import {getArticle} from '@request'
import {Button, Avatar, Input} from 'antd';
import history from '@history'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import styles from '@css/article/article.module.scss'
import Comment from '@components/article/Comment'
import Header from '@components/header'

const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.render('# markdown-it rulezz!');
const {TextArea} = Input;
const Article = (props) => {
    const {articleId} = props.match.params
    const [article, setArticle] = useState(null)
    const [showTitle, setShowTitle] = useState(false)
    const [commentBtnShow, setCommentBtnShow] = useState(false)
    useEffect(() => {
        getArticle(articleId).then(res => {
            setArticle(res?.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, false)
        return () => {
            // 清除订阅
            window.removeEventListener('scroll', handleScroll, false)
        };
    }, [])

    function handleScroll() {
        let currentOffset = document.documentElement.scrollTop || document.body.scrollTop; // 滚动的距离
        console.log(article);
        if (currentOffset >= 80) {
            setShowTitle(true)
        } else {
            setShowTitle(false)
        }
        console.log(currentOffset);
    }

    return (
        <div className={styles.container}>
            <Header showTitle={showTitle} title={article?.title}/>
            <div className={styles['article-container']}>
                <div className={styles['article-inner']}>
                    {/*文章内容*/}
                    <div className={styles.article}>
                        <Button
                            className={styles.edit}
                            style={{float: 'right'}}
                            type='link'
                            onClick={() => history.push(`/edit/${articleId}`)}>
                            编辑文章
                        </Button>
                        <h1>{article?.title}</h1>
                        <div className={styles.author}>
                            <Avatar
                                size={60}
                                src="https://upload.jianshu.io/users/upload_avatars/15884256/e58a844d-08f8-47b4-b947-79818093d797?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp"/>
                            <div className={styles.desc}>
                                <div>不忘初心_6b23</div>
                                <div style={{fontSize: '14px'}}>总资产4 (约0.36元)共写了9624字 获得45个赞 共22个粉丝</div>
                            </div>
                        </div>
                        <MdEditor
                            value={article?.content}
                            renderHTML={(text) => mdParser.render(text)}
                            config={{
                                view: {
                                    menu: false,
                                    md: false,
                                    html: true
                                },
                            }}
                        />
                        {/*<div dangerouslySetInnerHTML={{__html: article?.htmlContent}}/>*/}
                        <div className={styles.author}>
                            <Avatar
                                size={60}
                                src="https://upload.jianshu.io/users/upload_avatars/15884256/e58a844d-08f8-47b4-b947-79818093d797?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp"/>
                            <div className={styles.desc}>
                                <div>不忘初心_6b23</div>
                                <div style={{fontSize: '14px'}}>总资产4 (约0.36元)共写了9624字 获得45个赞 共22个粉丝</div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.myComment}>
                                <Avatar
                                    size={60}
                                    src="https://upload.jianshu.io/users/upload_avatars/15884256/e58a844d-08f8-47b4-b947-79818093d797?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp"/>
                                <TextArea
                                    // autoSize={true}
                                    placeholder="请输入你的评论..."
                                    onFocus={() => setCommentBtnShow(true)}
                                    onBlur={() => setCommentBtnShow(false)}
                                    allowClear/>
                            </div>
                            {commentBtnShow && <div>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    style={{margin: '10px 20px 0 60px'}}>
                                    发布
                                </Button>
                                <Button htmlType="submit">
                                    取消
                                </Button>
                            </div>}

                        </div>

                        <div className={styles.comment}>
                            <Comment>
                                <Comment>
                                    <Comment/>
                                </Comment>
                            </Comment>
                        </div>
                    </div>
                    {/*推荐内容*/}
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
        </div>

    )
}
export default Article
