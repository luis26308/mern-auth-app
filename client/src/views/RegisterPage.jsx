import { useState, useEffect } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import FormFooter from "../components/FormFooter";
import { connect } from "react-redux";
import * as actions from "../utils/redux/action";
import authAPI from "../utils/API/authAPI";
import { useNavigate } from 'react-router-dom'


const RegisterPage = (props) => {
    let navigate = useNavigate()

    const [file, setFile] = useState(null);

    // useEffect(() => {
    //     console.log(file);
    // }, [file]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    useEffect(() => {
            console.log(file);
            const data = new FormData();
            data.append('profilePic', file);
            console.log(data);
    }, [file]);


    useEffect(() => {
        if (props.isAuth) {
            navigate('/private-one')
        }
    }, [props.isAuth, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test");
        if (props.confirmPassword === props.password) {
            let userData = {
                username: props.username,
                password: props.password,
                firstName: props.firstName,
                lastName: props.lastName,
                email: props.email,
                profilePic: file
            };
            const data = new FormData();
            for (const key in userData) {
                data.append(key, userData[key]);
            }
            console.log(data);
            // call our API function to send to the data base
            //   authAPI.register(userData);
            authAPI.register(data);
        }
    };

    return (
        <div className="sign-in-container">
            <div className="auth-form">
                <Form
                    handleSubmit={handleSubmit}
                    title="Register"
                    className="registration-input-container"
                    btnText="SIGN UP"
                >
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name:"
                        handleInput={props.handleInput}
                        value={props.firstName}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name:"
                        handleInput={props.handleInput}
                        value={props.lastName}
                    />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email:"
                        handleInput={props.handleInput}
                        value={props.email}
                    />
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username:"
                        handleInput={props.handleInput}
                        value={props.username}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password:"
                        handleInput={props.handleInput}
                        value={props.password}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password:"
                        handleInput={props.handleInput}
                        value={props.confirmPassword}
                    />
                    <input type="file" onChange={handleFile} name='profilePic'/>
                </Form>
                <FormFooter message="Already a user?" btnTxt="LOGIN" path="/login" />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
        confirmPassword: state.auth.confirmPassword,
        isAuth: state.auth.isAuth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleInput: (e) => dispatch(actions.handleInput(e.target)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
