import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = (props) => (
    props.show ? <div className={classes.backdrop} onClick={props.backDropClick}></div> : null
)

export default Backdrop
