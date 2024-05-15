import React from "react"
const Form = (props) => {
    return (
        <div className="form-container">
        <form className="form" onSubmit={props.handleSubmit} enctype="multipart/form-data">
            <h1 className="form-title">{props.title}</h1>
            <div className={`${props.className} form-input-container`}>
                {props.children}
            </div>
            <button className="form-button" type="submit">{props.btnText}</button>
        </form>
    </div >
    )
}

export default Form