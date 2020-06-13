import React from 'react'
import classes from './Logo.module.css'
import logo from '../../assets/images/logo.png'

const Logo = (props) => {
    return (
        <div className={[classes.logo, props.className].join(' ')} style={{height: props.height}}>
            <img src={logo} alt='BurgerBuilder' className={[classes.img, props.logoClass].join(' ')} />
        </div>
    )
}

export default Logo
