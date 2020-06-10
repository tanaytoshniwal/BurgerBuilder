import * as actionTypes from '../actions/actionTypes'

export const BASE_PRICE = 25

export const PRICE_TABLE = {
    paneer: 60,
    tomatoes: 10,
    meat: 50,
    cheese: 10,
    bacon: 40,
    salad: 20,
    alootikki: 30
}

const initialState = {
    ingredients: null,
    price: BASE_PRICE,
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                price: state.price + PRICE_TABLE[action.payload.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                },
                price: state.price - PRICE_TABLE[action.payload.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer