import React from 'react'
import classes from './Spinner.module.css'

const Spinner = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.loader}>Loading...</div>
        </div>
    )
}

export default Spinner
