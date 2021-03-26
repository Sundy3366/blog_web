import React, {useState} from 'react';
import {Tabs, Menu, Row, Col} from 'antd';
import BasicSetting from '@pages/personal/BasicSetting'
import SafeSetting from '@pages/personal/SafeSetting'
import Account from '@pages/personal/Account'
import Message from '@pages/personal/Message'
import styles from '@css/personal/index.module.scss'

const {TabPane} = Tabs;

const navObj = [{name: '基本设置', component: '<BasicSetting/>'}, {
    name: '安全设置',
    component: '<SafeSetting/>'
}, {name: '账号绑定', component: '<Account/>'}, {name: '新消息通知', component: '<Message/>'}]
const Personal = () => {
    const [current, setCurrent] = useState('0')
    const handleClick = (val) => {
        console.log(val);
        setCurrent(val.key)
    }
    const renderComponent = () => {
        switch (current) {
            case '0':
                return <BasicSetting/>
            case '1':
                return <SafeSetting/>
            case '2':
                return <Account/>
            case '3':
                return <Message/>
            default:
                return <BasicSetting/>
        }
    }
    return (
        <div>
            <div className={styles.personWrapper}>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="vertical" style={{width: 256}}>
                    {navObj.map((item, i) =>
                        <Menu.Item key={i}>{item.name}</Menu.Item>
                    )}
                </Menu>
                <div className={styles.navContent}>
                    {renderComponent()}
                </div>

            </div>
        </div>
    )
}
export default Personal
