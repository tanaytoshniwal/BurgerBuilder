import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}

export const purchaseBurgerFail = errorMsg => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: errorMsg
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData).then(response => {
            console.log('response.data', response.data)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }).catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.get('/orders.json').then(response => {
            const orders = []
            for(let key in response.data) {
                orders.push({
                    id: key,
                    ...response.data[key]
                })
            }
            dispatch(fetchOrdersSuccess(orders))
        }).catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    }
}