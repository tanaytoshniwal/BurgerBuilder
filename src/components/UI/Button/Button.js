import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
    return (
        <button 
            onClick={props.click}
            disabled={props.disabled}
            className={[classes.button, classes[props.type]].join(' ')}>
            {props.children}
        </button>
    )
}

export default Button
