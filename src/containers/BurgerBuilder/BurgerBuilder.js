import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'
import { BASE_PRICE, PRICE_TABLE } from '../../store/reducers/burgerBuilder_reducer'

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
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

        let burger = this.props.error ? <div style={{width: '100%', textAlign: 'center'}}>
                <span style={{display: 'block'}}>Unable to Load Ingredients!</span>
                <span style={{display: 'block'}}>Please check your Internet Connection</span>
            </div> : <Spinner />
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
        price: state.price,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.fetchIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))