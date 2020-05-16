import React from 'react'
import classes from './BuildControl.module.css'

const BuildControl = (props) => {
    return (
        <div className={classes.buildControl}>
            <button className={classes.less} onClick={props.sub} disabled={props.disabled}>-</button>
            <div className={classes.label}>{props.label}</div>
            <button className={classes.more} onClick={props.add}>+</button>
        </div>
    )
}

export default BuildControl
