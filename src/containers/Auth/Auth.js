import React, { Component } from 'react'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Logo from '../../components/Logo/Logo'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/')
            this.props.setAuthRedirectPath()
    }

    validate = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.validate(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render() {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement =>
            <Input
                key={formElement.id}
                elementtype={formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                changeHandler={(event) => this.inputChangeHandler(event, formElement.id)}
                valid={formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value} />
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p className={classes.errorMessage}>Error: {this.props.error.message}</p>
            )
        }

        let redirectOnLogin = null
        if (this.props.isAuth) {
            redirectOnLogin = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.auth}>
                {redirectOnLogin}
                <Logo className={classes.center} logoClass={classes.logo} />
                <p className={classes.title}>{this.state.isSignUp ? 'Sign Up' : 'Log In'}</p>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button disabled={false} type="success">
                        {this.state.isSignUp ? 'Sign Up' : 'Log In'}
                    </Button>
                </form>
                <p>{this.state.isSignUp ? 'Already a' : 'New'} user?<Button type="danger" click={this.switchAuthMode}>
                    {this.state.isSignUp ? 'Log In' : 'Sign Up'}</Button>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
