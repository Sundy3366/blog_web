import React, {useState} from 'react';
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {getSessionItem} from '@utils'
import {updateAvatar} from '@request'

const Uploader = () => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    let userId = getSessionItem('userId', 'userInfo')
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        console.log(info);
        console.log(info.file.originFileObj);
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
                saveAvatar()
            });
        }
    };
    const saveAvatar = () => {
        //更新图片地址
        updateAvatar(userId, {avatar: imageUrl}).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传图片格式');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片必须小于2M');
        }
        return isJpgOrPng && isLt2M;
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:8989/upload/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
    )
}
export default Uploader
