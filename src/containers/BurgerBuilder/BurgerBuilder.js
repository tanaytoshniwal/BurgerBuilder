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
import * as actions from '../../store/actions/index'
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
        if (this.props.isAuth)
            this.setState((prev) => {
                return {
                    purchasing: !prev.purchasing
                }
            })
        else {
            this.props.setAuthReditectPath('/checkout')
            this.props.history.push('/login')
        }
    }

    purchaseContinueHandler = () => {
        this.props.purchaseInit()
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

        let burger = this.props.error ? <div style={{ width: '100%', textAlign: 'center' }}>
            <span style={{ display: 'block' }}>Unable to Load Ingredients!</span>
            <span style={{ display: 'block' }}>Please check your Internet Connection</span>
        </div> : <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        add={this.props.addIngredient}
                        sub={this.props.removeIngredient}
                        isAuth={this.props.isAuth}
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
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: ingredientName => dispatch(actions.addIngredient(ingredientName)),
        removeIngredient: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit()),
        setAuthReditectPath: path => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))