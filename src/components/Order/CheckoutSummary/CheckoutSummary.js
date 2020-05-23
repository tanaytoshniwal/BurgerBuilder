import React from 'react'
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = props => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>Hope it tastes good!</h1>
            <div className={classes.burgerWrapper}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                type="danger"
                click={props.checkoutCancelled}>
                CANCEL
            </Button>
            <Button
                type="success"
                click={props.checkoutContinued}>
                CONTINUE
            </Button>
        </div>
    )
}

export default CheckoutSummary
