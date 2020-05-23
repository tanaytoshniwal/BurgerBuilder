import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {
    const ingredients = []
    for (let ingredient in props.ingredients) {
        ingredients.push({ name: ingredient, quantity: props.ingredients[ingredient] })
    }
    const op = ingredients.map(ig => {
        return <span className={classes.ig} key={ig.name}>{ig.name}: {ig.quantity}</span>
    })
    return (
        <div className={classes.order}>
            <p>Order Ingredients: {op}</p>
            <p>Order Price: <strong>₹{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
