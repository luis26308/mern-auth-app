import * as types from '../types'
let initialState = {
    isAuth: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    userInfo: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.HANDLE_INPUT:
            let { name, value } = action.payload
            console.log(name, value)
            return {
                ...state,
                [name]: value
            }
        case types.AUTHENTICATE:
            let { payload: userInfo } = action
            return {
                ...state,
                isAuth: true,
                userInfo

            }
        case types.LOGOUT:
            return {
                ...state,
                isAuth: false,
                userInfo: {}
            }
        default:
            return state
    }
}

export default authReducer