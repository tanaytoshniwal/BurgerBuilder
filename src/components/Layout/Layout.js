import React from 'react'
import classes from './Layout.module.css'
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {

    state = {
        showSideBar: false
    }

    sideDrawerHandler = () => {
        this.setState({ showSideBar: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prev) => { return {
            showSideBar: !prev.showSideBar
        }})
    }

    render() {
        return (
            <Aux>
                <Toolbar openDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    close={this.sideDrawerHandler}
                    show={this.state.showSideBar} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout