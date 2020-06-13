import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const LazyCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const LazyOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const LazyAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends React.Component {

  componentDidMount() {
    this.props.checkAuthentication()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/login" component={LazyAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={LazyCheckout} />
          <Route path="/orders" component={LazyOrders} />
          <Route path="/login" component={LazyAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthentication: () => dispatch(actions.checkAuthentication())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
