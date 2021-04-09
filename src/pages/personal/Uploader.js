import React, {useEffect, useState} from 'react';
import {Upload, message, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {getSessionItem} from '@utils'
import {updateAvatar} from '@request'
import ImgCrop from 'antd-img-crop';

const Uploader = ({avatar}) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(avatar)
    useEffect(()=>{
        if(avatar) setImageUrl(avatar)
    },[])
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
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
                saveAvatar(imageUrl)
            });
        }
    };
    const saveAvatar = (url) => {
        //更新图片地址
        updateAvatar(userId, {avatar: url}).then(res => {
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

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="avatar" style={{width: '150px', height: '150px'}}/>}
            1234
            <div style={{margin: '0 auto', display: 'inline-block'}}>
                <ImgCrop rotate>
                    <Upload
                        name="avatar"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://localhost:8989/upload/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        onPreview={onPreview}
                    >
                        <Button icon={<UploadOutlined/>} style={{margin: '10px auto'}}>Upload</Button>
                    </Upload>
                </ImgCrop>
            </div>
        </div>

    )
}
export default Uploader
