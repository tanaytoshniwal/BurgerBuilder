import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(ele => (
                <Order
                    key={ele.id}
                    ingredients={ele.ingredients}
                    price={ele.price} />
            ))
        }
        return orders
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
