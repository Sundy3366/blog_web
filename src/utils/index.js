import React from 'react'
import { Route } from 'react-router-dom'
/*治疗意见名字切换*/
export const changeRootLabel = (name) => {
	const language = sessionStorage.getItem('language')
	switch (name) {
		case 'LIPID':
			return language.includes('cn') ? '血脂管理' : name
		case 'GLUCOSE':
			return language.includes('cn') ? '血糖管理' : name
		case 'HYPOTENSIVE':
			return language.includes('cn') ? '血压管理' : name
		case 'CARDIOGENIC':
			return language.includes('cn') ? '抗栓(心源性)' : name
		case 'NONCARDIAC':
			return language.includes('cn') ? '抗栓(非心源性)' : name
		case 'INTRAVENOUSTHROMBOLYSIS':
			return language.includes('cn') ? '溶栓' : name
		case 'ENDOVASCULAR':
			return language.includes('cn') ? '血管内治疗' : name
		case 'CISS_Web':
			return language.includes('cn') ? 'CISS' : name
		default:
			return ''
	}
}

/*影像模式图数据转换*/
export const changeSeriesName = (series) => {

	if(series.includes('bz')) return '分水岭模式图'
	else if(series.includes('br')) return '结构模式图'
	else if(series.includes('bs')) return '血供模式图'
	else if(series.includes('co')) return '皮层模式图'
	else if(series.includes('ci')) return '病灶模式图'
	else if(series.includes('ADC')) return 'ADC模式图'
	else return '原始DWI'
}

/**治疗意见推荐*/
export const recommendedEvidenceColor = (str) => {
	if (!str || str.length < 1){
		return '#D8E2EB'
	} else
	if (str === 'LIPID') {
		return '#B1A2E7'
	} else if (str === 'GLUCOSE') {
		return '#B8E97F'
	} else if (str === 'HYPOTENSIVE') {
		return '#8ADDC1'
	} else if (str === 'CARDIOGENIC' || str === 'NONCARDIAC') {
		return '#446ADA'
	} else if (str === 'A') {
		return '#3D6EB6'
	} else if (str === 'B' || str === 'B-R') {
		return '#6487BF'
	} else if (str === 'Ⅰ' || str === 'I') {
		return '#6CC280'
	} else if (str.includes('a')) {
		return '#FDD34D'
	} else if (str.includes('b') || str === 'Ⅱ' || str === 'II') {
		return '#FCA64C'
	} else if (str === 'Ⅲ' || str === 'III') {
		return '#EC5D4B'
	} else if (str === 'C') {
		return '#8DA1D2'
	}else{
		return '#B1A2E7'
	}
}

/*提示*/
export const toast = (text, timeout, options) => {
	try {
		document.body.removeChild(document.querySelector('div.toast-it'))
	} catch (e) {

	}

	//开始创造
	timeout = timeout || 3000
	let toast = document.createElement('DIV')
	toast.classList.add('toast-it')
	let content = document.createTextNode(text)
	toast.appendChild(content);
	toast.style.animationDuration = timeout / 1000 + 's'

	for (let prop in options) {
		toast.style[prop] = options[prop]
	}
	//别被挡住了
	toast.style['z-index'] = 9999999
	document.body.appendChild(toast)
	setTimeout(function () {
		try {
			document.body.removeChild(toast)
		} catch (e) {

		}
	}, timeout)
}

/*loading*/
export const loading = (flag) => {
	if (flag) {
		let loadingWrapper = document.createElement('div')
		loadingWrapper.classList.add('loadingWrapper')
		let loading = document.createElement('div')
		loading.classList.add('loading')
		loadingWrapper.appendChild(loading);
		loadingWrapper.style['z-index'] = 9999
		loading.style['z-index'] = 10000
		document.body.appendChild(loadingWrapper)
	} else {
		try {
			const loadingWrapper = document.getElementsByClassName('loadingWrapper')[0]
			setTimeout(() => {
				if (loadingWrapper) {
					document.body.removeChild(loadingWrapper)
				}
			}, 100)

		} catch (e) {

		}
	}
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={(props) => (
			<Component {...rest} {...props} />
		)}/>
	)
}

export const displayNavStyle = (flag) => {
	document.getElementsByClassName('ant-layout-header')[0].style.display = flag? "block" : "none"
	document.getElementsByClassName('ant-layout-sider')[0].style.display = flag? "block" : "none"
	document.getElementsByClassName('ant-layout')[0].style.height = "100vh"

	/*	if (!JSON.parse(sessionStorage.getItem('userInfo'))){
			toast('登录失效')
			setTimeout(() => {
				history.push('/login')
			},1000)
		}
	*/
}

/*
* 判断参数是否有值
* judgmentValue 需要判断的参数
* value 判断参数judgmentValue 无值时返回参数
* judgmentValue 参数类型  'arr' ，'str' ，'div'
* */
export function noParameterJudgment(judgmentValue, value) {

	return (judgmentValue && judgmentValue[value] && judgmentValue[value].length > 0? judgmentValue[value] : '')

}

export const TIME_OUT = 30 * 60 * 1e3;

export const getSessionItem = (item, storage) => {
	if (sessionStorage.getItem(storage) && JSON.parse(sessionStorage.getItem(storage))[item]) {
		return JSON.parse(sessionStorage.getItem(storage))[item]
	} else {
		return null
	}
}

export const checkUserRole = (data) => {
	/**
	 * director : 高级权限
	 * user: 普通权限
	 * */
	if (data && data.biomind && data.biomind.roles && data.biomind.roles.length > 0) {
		return data.biomind.roles.includes('approve-report')? 'director' : 'user'
	} else {
		return 'user'
	}
}
export const checkUserAuthority = () => {
	return getSessionItem('userId', 'patientInfo') === getSessionItem('userId', 'userInfo') ||
		getSessionItem('authority', 'userInfo') === 'admin';
}

/**
 * 主页导航
 * */
export const navObject = [
	{ name: '入院信息与治疗提示', pathname: 'AdmissionInfor' },
	{ name: '影像诊断', pathname: 'image' },
	{ name: '病因分型与治疗意见', pathname: 'ischemicStroke' },
	{ name: '医疗质量控制', pathname: 'medicalQuality' },
	/*{ name: '文献指南', pathname: 'referDocument' },*/
	{ name: '辅助检查结果', pathname: 'testExamination' }
	// { name:'并发症与风险预测', pathname:'riskPrediction' },
]

export const searchParamsObject = {
	'全部': 'FIND_ALL_LIKE',
	'题名': 'FIND_TITLE_LIKE',
	'作者': 'FIND_AUTHOR_LIKE',
	'来源': 'FIND_JOURNAL_LIKE',
	'关键词': 'FIND_KEYWORD_LIKE',
	'摘要': 'FIND_SUMMARY_LIKE',
	'发布时间': 'EQUAL_TO_TIME',
	'出版年': 'EQUAL_TO_YEAR',
	'类型': 'EQUAL_TO_TYPE',
	'类别': 'EQUAL_TO_CATEGORY',
}

export const timeOptionsData= [
	{ name: '周', value: 'W' },
	{ name: '月', value: 'M' },
	{ name: '季度', value: 'Q' },
	{ name: '年', value: 'Y' },
	{ name: '累计', value: 'ALL' },
]

