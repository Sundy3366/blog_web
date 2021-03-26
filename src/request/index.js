import axios from 'axios'

import {base_api} from '@defs'

window.axiosCancel = [];

export const api = axios.create({
    baseURL: base_api
})

api.interceptors.request.use(
    request => {
        request.cancelToken = new axios.CancelToken(cancel => {
            window.axiosCancel.push({cancel})
        })
        // sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        const userInfo = sessionStorage.getItem('userInfo')
        console.log(userInfo);
        // 设置参数格式
        if (!request.headers['Content-Type']) {
            request.headers = {
                'Content-Type': 'application/json'
            }
        }
        // 添加token到headers
        if (userInfo) {
            request.headers.authorization = JSON.parse(userInfo).token
        } else {
            // console.log(999999, process.env.NODE_ENV, window.location)
        }
        return {
            ...request,
            // signal
        }
    }, error => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use((response) => {
    if (response.status) {
        if (response.status === 200) {
            return response.data

        } else {
            return Promise.reject({...response.data.message})
        }
    } else {
        return response
    }

}, (error) => {
    // whatever you want to do with the error
    return Promise.reject({...error})
})
/*登录、退出、注册*/
export const login = async data => await api.post(`/user/login`, data)
export const logout = async () => await api.get(`/user/logout`)
export const register = async data => await api.post(`/user/register`, data)
export const createArticle = async data => await api.post(`/article/notes/create`, data)
export const saveArticle = async (articleId, data) => await api.post(`/article/notes/save/${articleId}`, data)
export const getArticle = async (articleId) => await api.post(`/article/notes/preview/${articleId}`)
export const getArticleList = async (data) => await api.post(`/article/notes/getList`, data)
export const uploadAvatar = async (data) => await api.post(`/upload/upload`, data)
export const updateUserInfo = async (data) => await api.post(`/user/update`, data)
export const getUserInfo = async (id) => await api.get(`/user/userInfo/${id}`)
export const updateAvatar = async (id, data) => await api.post(`/user/avatar/${id}`, data)


/* 修改用户密码*/
// export const changePasswordData = async (data) => await api.post(`/user/change-pw`, data)

/*
/!*预测结果*!/
export const getPatientAiModelPredictResult = async (study) => await fdfsServer.get(
    `/dicom/study/${study}/predictions?service=dwi&doctorId=${getSessionItem('userId', 'userInfo')}`)

/
/!*获取病人5个基本信息*!/
export const fetchBasicInfo = async (patientId) => await c3Server.get(`/patient/basic?pid=${patientId}&doctorId=${getSessionItem('userId', 'userInfo')}`)

/!*9.11 提交检查数据是否被查看*!/
export const biochemicalClicked = async (data) => await api.put(`/chemistry-check/clicked`, data)
*/
