import React from 'react'
import classes from './Layout.module.css'
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Footer from '../../components/UI/Footer/Footer'
import { connect } from 'react-redux'

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
                <Toolbar 
                    openDrawer={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer 
                    close={this.sideDrawerHandler}
                    show={this.state.showSideBar}
                    isAuth={this.props.isAuthenticated} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)