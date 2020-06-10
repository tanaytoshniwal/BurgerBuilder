import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

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

const addIngredient = (state, action) => {
    const add_updatedIngredient = { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1 }
    const add_updatedIngredients = updateObject(state.ingredients, add_updatedIngredient)
    const add_updatedState = {
        ingredients: add_updatedIngredients,
        price: state.price + PRICE_TABLE[action.payload.ingredientName]
    }
    return updateObject(state, add_updatedState)
}

const removeIngredient = (state, action) => {
    const rem_updatedIngredient = { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1 }
    const rem_updatedIngredients = updateObject(state.ingredients, rem_updatedIngredient)
    const rem_updatedState = {
        ingredients: rem_updatedIngredients,
        price: state.price + PRICE_TABLE[action.payload.ingredientName]
    }
    return updateObject(state, rem_updatedState)
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.payload,
        price: BASE_PRICE,
        error: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state
    }
}

export default reducer