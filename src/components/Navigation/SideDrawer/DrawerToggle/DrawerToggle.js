import React from 'react'
import classes from './DrawerToggle.module.css'

const DrawerToggle = (props) => {
    return (
        <div onClick={props.click} className={classes.drawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle
