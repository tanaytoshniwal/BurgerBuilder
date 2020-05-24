import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    let input = null
    const inputClasses = [classes.inputElement]

    if(!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.invalid)
    }

    switch (props.elementtype) {
        case 'input':
            input = <input onChange={props.changeHandler} className={inputClasses.join(' ')} {...props.elementconfig} value={props.value} />
            break;
        case 'textarea':
            input = <textarea onChange={props.changeHandler} className={inputClasses.join(' ')} {...props.elementconfig} value={props.value} />
            break
        case 'select':
            input = (<select onChange={props.changeHandler} className={inputClasses.join(' ')} value={props.value}>
                {props.elementconfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            break
        default:
            input = <input onChange={props.changeHandler} className={inputClasses.join(' ')} {...props.elementconfig} value={props.value} />
    }

    let validationValue = null 
    if(!props.valid && props.touched) validationValue = <p className={classes.validation}>Please enter a valid value!</p>

    return (
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {input}
            {validationValue}
        </div>
    )
}

export default Input
