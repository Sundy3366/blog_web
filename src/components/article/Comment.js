import React from 'react';
import {Avatar, Comment} from 'antd';
import styles from '@css/article/comment.module.scss'
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
