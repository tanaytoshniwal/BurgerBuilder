import React from 'react'
import classes from './Logo.module.css'
import logo from '../../assets/images/logo.png'

const Logo = (props) => {
    return (
        <div className={classes.logo} style={{height: props.height}}>
            <img src={logo} alt='BurgerBuilder'/>
        </div>
    )
}

export default Logo
