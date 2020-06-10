import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
import { preprocessData } from './utils'

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredientName: name
        }
    }
}

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredientName: name
        }
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            let processedData = preprocessData(response.data)
            dispatch(setIngredients(processedData))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}