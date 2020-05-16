import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const PRICE_TABLE = {
    paneer: 60,
    tomatoes: 10,
    meat: 50,
    cheese: 10,
    bacon: 30,
    salad: 20
}

export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            paneer: 0,
            tomatoes: 0,
            cheese: 0,
            meat: 0
        },
        price: 25,
        purchasable: false
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    add={this.addIngredientHandler}
                    sub={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.price}
                    purchasable={this.state.purchasable} />
            </Aux>
        )
    }
}

export default BurgerBuilder
