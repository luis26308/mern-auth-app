import { useEffect } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import FormFooter from '../components/FormFooter'
import { connect } from 'react-redux'
import * as actions from '../utils/redux/action'
import authAPI from '../utils/API/authAPI'
import { useNavigate } from 'react-router-dom'

const LoginPage = (props) => {
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        let userData = {
            password: props.password,
            username: props.username
        }

        // make API call with userData
        authAPI.login(userData)
    }

    useEffect(() => {
        if (props.isAuth) {
            navigate('/private-one')
        }
    }, [props.isAuth, navigate])

    return (
        <div className="sign-in-container">
            <div className="auth-form">
                <Form
                    handleSubmit={handleSubmit}
                    title="LOGIN"
                    className='login-input-container'
                    btnText="Login"
                >
                    <Input
                        type='text'
                        name='username'
                        placeholder='Username:'
                        handleInput={props.handleInput}
                        value={props.username}
                    />
                    <Input
                        type='password'
                        name='password'
                        placeholder='Password:'
                        handleInput={props.handleInput}
                        value={props.password}
                    />
                </Form>
                <FormFooter
                    message="Need an account?"
                    btnTxt="SIGN UP"
                    path='/register'
                />

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInput: (e) => dispatch(actions.handleInput(e.target))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)