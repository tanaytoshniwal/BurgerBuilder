import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
        ingredients: null,
        price: BASE_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            this.setState({ ingredients: response.data })
        }).catch(error => {
            this.setState({ error: true })
        })
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
        this.setState((prev) => {
            return {
                purchasing: !prev.purchasing
            }
        })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Tony',
                address: {
                    street: '404',
                    zipcode: '123456',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response)
            this.setState({ loading: false, purchasing: false })
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false, purchasing: false })
        })
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

        let orderSummary = null

        let burger = this.state.error ? <p>Unable to Load Ingredients!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        add={this.addIngredientHandler}
                        sub={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseHandler={this.purchaseHandler}
                        price={this.state.price}
                        purchasable={this.state.purchasable} />
                </Aux>)
            orderSummary = <OrderSummary
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                priceTable={PRICE_TABLE}
                basePrice={BASE_PRICE}
                total={this.state.price} />
        }

        if (this.state.loading)
            orderSummary = <Spinner />

        return (
            <Aux>
                <Modal
                    display={this.state.purchasing}
                    close={this.purchaseHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)