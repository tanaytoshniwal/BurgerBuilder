import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, index) =>
            <BurgerIngredient key={igKey + index} type={igKey} />
        )
    }).reduce((prev, cur) => {
        return prev.concat(cur)
    }, [])
    const empty = <div>
        <div className={classes.emptyHead}>\(o_o)/</div>
        <div className={classes.emptyText}>No Ingredients here...</div>
    </div>
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top" />
            {
                ingredients.length !== 0 ?
                    <React.Fragment>
                        {ingredients}
                    </React.Fragment> : empty
            }
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger
