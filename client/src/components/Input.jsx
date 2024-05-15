import React from "react";
const Input = (props) => {
    return (
        <>
            <label className="form-label" htmlFor={props.name}>
                <input
                    placeholder={props.placeholder}
                    className="form-input"
                    type={props.type}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={props.handleInput}
                />
            </label>
        </>
    );
};

export default Input;
