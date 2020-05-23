import React from 'react'
import classes from './Layout.module.css'
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Footer from '../../components/UI/Footer/Footer'

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
                <Footer />
            </Aux>
        )
    }
}

export default Layout