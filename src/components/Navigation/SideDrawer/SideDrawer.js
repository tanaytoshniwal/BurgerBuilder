import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    const attatchedClasses = [classes.sideDrawer, (props.show) ? classes.open : classes.close].join(' ')
    return (
        <Aux>
            <Backdrop show={props.show} backDropClick={props.close} />
            <div className={attatchedClasses} onClick={props.close}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
