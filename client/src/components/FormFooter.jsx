import React from "react"
import {useNavigate} from 'react-router-dom'

const FormFooter = (props) => {
    const navigate = useNavigate()

    return (
        <div className='form-footer-container'>
            <div className='high-rule-container'>
                <hr/>
                <p>OR</p>
            </div>
            <p>
                <span>{props.message}</span>
                <span className='toggle' onClick={()=>navigate(props.path)}>{props.btnTxt}</span>
            </p>
        </div>
    )
}

export default FormFooter