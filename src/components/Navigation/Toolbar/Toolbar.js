import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
    return (
        <header className={classes.toolbar}>
            <DrawerToggle click={props.openDrawer} />
            <div className={classes.logo}>
                <Logo />
            </div>
            <nav className={classes.desktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
