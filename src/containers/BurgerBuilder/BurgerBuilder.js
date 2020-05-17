import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const PRICE_TABLE = {
    paneer: 60,
    tomatoes: 10,
    meat: 50,
    cheese: 10,
    bacon: 40,
    salad: 20,
    alootikki: 30
}

const BASE_PRICE = 25

export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            paneer: 0,
            tomatoes: 0,
            cheese: 0,
            meat: 0,
            alootikki: 0
        },
        price: BASE_PRICE,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState((prev, cur) => {
            return {
                purchasing: !prev.purchasing
            }
        })
    }

    purchaseContinueHandler = () => {
        alert('Continue!')
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    addIngredientHandler = type => {
        const obj = { ...this.state.ingredients }
        obj[type] = this.state.ingredients[type] + 1;
        const price = this.state.price + PRICE_TABLE[type]
        this.setState({
            ingredients: obj,
            price: price
        })
        this.updatePurchaseState(obj)
    }

    removeIngredientHandler = type => {
        const obj = { ...this.state.ingredients }
        if (obj[type] <= 0) return
        obj[type] = this.state.ingredients[type] - 1;
        const price = this.state.price - PRICE_TABLE[type]
        this.setState({
            ingredients: obj,
            price: price
        })
        this.updatePurchaseState(obj)
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal 
                    display={this.state.purchasing}
                    close={this.purchaseHandler} >
                    <OrderSummary
                        purchaseCancelHandler={this.purchaseCancelHandler}
                        purchaseContinueHandler={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients} 
                        priceTable={PRICE_TABLE}
                        basePrice={BASE_PRICE}
                        total={this.state.price} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    add={this.addIngredientHandler}
                    sub={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseHandler={this.purchaseHandler}
                    price={this.state.price}
                    purchasable={this.state.purchasable} />
            </Aux>
        )
    }
}

export default BurgerBuilder
