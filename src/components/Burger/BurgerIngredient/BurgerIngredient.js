import React from 'react'
import classes from './BurgerIngredient.module.css'
import PropType from 'prop-types'

const BurgerIngredient = (props) => {
    let ingredient = null
    switch (props.type) {
        case 'paneer':
            ingredient = <div className={classes.paneer}></div>
            break
        case 'tomatoes':
            ingredient = <div className={classes.tomatoes}></div>
            break
        case 'bread-bottom':
            ingredient = <div className={classes.breadBottom}></div>
            break
        case 'bread-top':
            ingredient = <div className={classes.breadTop}>
                <div className={classes.seeds1}></div>
                <div className={classes.seeds3}></div>
                <div className={classes.seeds2}></div>
                <div className={classes.seeds4}></div>
            </div>
            break
        case 'meat':
            ingredient = <div className={classes.meat}></div>
            break
        case 'cheese':
            ingredient = <div className={classes.cheese}></div>
            break
        case 'bacon':
            ingredient = <div className={classes.bacon}></div>
            break
        case 'salad':
            ingredient = <div className={classes.salad}></div>
            break
        default:
            ingredient = null
    }

    return ingredient
}

BurgerIngredient.propType = {
    type: PropType.string.isRequired
}

export default BurgerIngredient
