import React from 'react'
import Aux from '../../../hoc/Aux'
import classes from './OrderSummary.module.css'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ele, index) => {
        return (props.ingredients[ele] <= 0)? null : <li key={ele + index}><span style={{ textTransform: 'capitalize' }}>{ele}</span>: {props.ingredients[ele]}</li>
    })
    const priceList = Object.keys(props.ingredients).map((ele, index) => {
        return (props.ingredients[ele] <= 0)? null : <li key={index + ele}>₹{props.priceTable[ele] * props.ingredients[ele]}</li>
    })
    ingredientSummary.push(<li key='base1'><strong>Base Price:</strong></li>)
    priceList.push(<li key='1base'><strong>₹{props.basePrice}</strong></li>)
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <div className={classes.row}>
                <div className={classes.col}>
                    <ul className={classes.list}>
                        {ingredientSummary}
                    </ul>
                </div>
                <div className={classes.col}>
                    <ul className={classes.list}>
                        {priceList}
                    </ul>
                </div>
            </div>
            <div className={classes.row}>
                <strong>Total Price: ₹{props.total}</strong>
            </div>
            <p>Continue to Checkout?</p>
            <div className={classes.row}>
                <div className={classes.col}>
                    <Button click={props.purchaseCancelHandler} type='danger'>CANCEL</Button>
                </div>
                <div className={classes.col}>
                    <Button click={props.purchaseContinueHandler} type='success'>CONTINUE</Button>
                </div>
            </div>
        </Aux>
    )
}

export default OrderSummary
