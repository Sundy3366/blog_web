import React, {useRef, useEffect, useState} from 'react'
import * as ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import {Button, Message, Row, Col} from 'antd'
import {getArticle, saveArticle} from '@request'
import history from "@history";
import styles from '@css/article/article.module.scss'
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.render('# markdown-it rulezz!');
// Finish!


export default (props) => {
    const {articleId} = props.match.params
    const nodeMdText = useRef()
    const [article, setArticle] = useState(null)
    const [title, setArticleTitle] = useState(null)
    useEffect(() => {
        getArticle(articleId).then(res => {
            setArticle(res.data.content)
            setArticleTitle(res.data.title)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    function handleEditorChange({html, text}) {
        console.log('handleEditorChange', html, text)
        setArticle(text)
        mdParser.render(text)
    }

    function save() {
        console.log(props.match);
        console.log(nodeMdText.current);
        console.log(nodeMdText.current.state.html);
        // return nodeMdText.current.;
        if(!title || title === 'title'){
            Message.warn('标题不能为空！')
            return
        }
        saveArticle(articleId, {
            title: title,
            content: nodeMdText.current.state.text,
            htmlContent: nodeMdText.current.state.html,
        }).then(res => {
            console.log(res);
            Message.success('发布成功!')
            history.push('/home')
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className={styles['edit-container']}>
            <Row>
                <Col span={24}>
                    <div className={styles['input-box']}>
                        <input type="text"
                               defaultValue={title}
                               className={styles.input}
                               maxLength={100}
                               onChange={(e) => setArticleTitle(e.target.value)}/>
                        <span>{title?.length}/100</span>
                    </div>
                </Col>
            </Row>
            <MdEditor
                ref={nodeMdText}
                value={article}
                style={{height: "500px"}}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <Button type={"primary"} onClick={save}>保存</Button>
        </div>

    )
}
