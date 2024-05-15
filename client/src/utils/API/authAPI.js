import axios from 'axios'
import instance from './axios'
import store from '../redux/store'
import * as actions from '../redux/action'
const BASE_URL = process.env.REACT_APP_BASE_URL

const authAPI = {
    register: async (userData) => {
        const response = await axios.post(`${BASE_URL}/register`, userData)
        if (response.status === 200) {
            let status = response.data
            if (status.auth) {
                console.log('register was successful')
                let { userInfo, token } = response.data
                sessionStorage.setItem('token', token)
                store.dispatch(actions.authenticate(userInfo))
            } else {
                console.log(status.message)
            }
        }
    },

    login: async (userData) => {
        const response = await axios.post(`${BASE_URL}/login`, userData)
        if (response.status === 200) {
            if (response.data.auth) {
                let { userInfo, token } = response.data
                sessionStorage.setItem('token', token)
                store.dispatch(actions.authenticate(userInfo))
            } else {
                console.log(response.data.message)
            }
        }
    },

    logout: async () => {
        const response = await axios.post(`${BASE_URL}/logout`)
        // console.log(response)
        if (response.status === 200) {
            store.dispatch(actions.logout())
            sessionStorage.removeItem('token')
        }
    },
    checkAuth: async () => {
        // console.log('test')
        let token = sessionStorage.getItem('token')
        // console.log(token)
        const response = await axios.post(`${BASE_URL}`, { token })
        // console.log(response)
        if (response.status === 200) {
            let status = response.data
            if (status.auth) {
                let { userInfo } = response.data
                store.dispatch(actions.authenticate(userInfo))
            } else {
                console.log(status.message)
            }
        }
    },

    getUsers: async () => {
        const response = await axios.get(`${BASE_URL}/getUsers`)
        console.log(response)
        if (response.status === 200) {
            let { user } = response.data
            return user
        }
    },
}

export default authAPI

