import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.payload.orderData,
        id: action.payload.orderId
    }
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.payload,
        loading: false
    })
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess()
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail()
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart()
        case actionTypes.PURCHASE_INIT: return purchaseInit()
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart()
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess()
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail()
        default: return state
    }
}

export default reducer