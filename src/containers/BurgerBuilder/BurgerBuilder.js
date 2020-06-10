import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'
import { BASE_PRICE, PRICE_TABLE } from '../../store/reducers/burgerBuilder_reducer'

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    preprocessData = data => {
        let resData = []
        for (let ele in data) {
            resData.push([ele, data[ele]])
        }
        resData.sort((a, b) => {
            return a[1].position - b[1].position
        })
        let result = {}
        for (let i = 0; i < resData.length; i++) {
            result[resData[i][0]] = resData[i][1].value
        }
        return result
    }

    componentDidMount() {
        // axios.get('/ingredients.json').then(response => {
        //     let processedData = this.preprocessData(response.data)
        //     this.setState({ ingredients: processedData })
        // }).catch(error => {
        //     this.setState({ error: true })
        // })
    }

    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ingredients)
            .map(igKey => {
                return this.props.ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState((prev) => {
            return {
                purchasing: !prev.purchasing
            }
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>Unable to Load Ingredients!</p> : <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        add={this.props.addIngredient}
                        sub={this.props.removeIngredient}
                        disabled={disabledInfo}
                        purchaseHandler={this.purchaseHandler}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState()} />
                </Aux>)
            orderSummary = <OrderSummary
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}
                priceTable={PRICE_TABLE}
                basePrice={BASE_PRICE}
                total={this.props.price} />
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))