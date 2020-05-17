import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    const attatchedClasses = [classes.sideDrawer, (props.show) ? classes.open : classes.close].join(' ')
    return (
        <Aux>
            <Backdrop show={props.show} backDropClick={props.close} />
            <div className={attatchedClasses}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
