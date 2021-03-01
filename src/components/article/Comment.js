import React, {useEffect, useState} from 'react';
import {getArticle} from '@request'
import { Input, Avatar, Comment} from 'antd';
import styles from '@css/article/comment.module.scss'
const { TextArea } = Input;
const CommentContainer = ({children}) => {
    return (
        <div className={styles.commentList}>
            <Comment
                actions={[<span key="comment-nested-reply-to">回复</span>]}
                author={<a>Han Solo</a>}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure).
                    </p>
                }
            >
                {children}
            </Comment>
        </div>
    )
}
export default CommentContainer
