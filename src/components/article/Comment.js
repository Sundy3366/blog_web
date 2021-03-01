import React, {useEffect, useState} from 'react';
import {getArticle} from '@request'
import { Avatar, Comment} from 'antd';
import styles from '@css/article/comment.module.scss'

const CommentContainer = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.myComment}>
                <Avatar
                    size={60}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                {/*<TextArea placeholder="textarea with clear icon" allowClear/>*/}
            </div>
            <div className={styles.commentList}>
                <Comment
                    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
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
                    {/*{children}*/}
                </Comment>
            </div>
        </div>

    )
}
export default CommentContainer
