import * as types from './types'

export const handleInput = (input) => {
    console.log(input)
    return {
        type:types.HANDLE_INPUT,
        payload: input
    }
}

export const authenticate = (userData) => {
    return {
        type:types.AUTHENTICATE,
        payload: userData
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}