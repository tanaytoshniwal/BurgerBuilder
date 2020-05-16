import React from 'react'
import classes from './Layout.module.css'
import Aux from '../../hoc/Aux'

const Layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
)

export default Layout