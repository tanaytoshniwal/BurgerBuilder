import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Aloo Tikki', type: 'alootikki' },
    { label: 'Paneer', type: 'paneer' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Tomatoes', type: 'tomatoes' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = (props) => {
    return (
        <div className={classes.buildControls}>
            <p>Current Price: <strong>₹{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    add={() => { props.add(ctrl.type) }} 
                    sub={() => { props.sub(ctrl.type) }}
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button 
                className={classes.orderButton}
                disabled={!props.purchasable}
                onClick={props.purchaseHandler}>{props.isAuth ? 'ORDER NOW' : 'Please Login to Continue!'}</button>
        </div>
    )
}

export default BuildControls
