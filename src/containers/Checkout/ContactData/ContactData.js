import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    state = {
        form: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'express', displayValue: 'Express' },
                        { value: 'normal', displayValue: 'Normal' }
                    ]
                },
                value: 'express',
                validation: {},
                valid: true
            }
        },
        formValid: false,
        loading: false
    }

    validate = (value, rules) => {
        let isValid = true
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}
        for(let key in this.state.form){
            formData[key] = this.state.form[key].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false })
            this.props.history.push('/')
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false })
        })
    }

    inputChangeHandler = (event, id) => {
        const form = {...this.state.form}
        const updatedForm = {...form[id]}
        updatedForm.value = event.target.value
        updatedForm.valid = this.validate(updatedForm.value, updatedForm.validation)
        updatedForm.touched = true
        form[id] = updatedForm

        let formValid = true
        for(let key in form){
            formValid = form[key].valid && formValid
        }
        this.setState({
            form: form,
            formValid: formValid
        })
    }

    render() {
        const formElementsArray = []
        for(let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementtype={formElement.config.elementType}
                    elementconfig={formElement.config.elementConfig}
                    changeHandler={(event) => this.inputChangeHandler(event, formElement.id)}
                    valid={formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    value={formElement.config.value} />
            ))}
            <Button type='success' disabled={!this.state.formValid}>ORDER</Button>
        </form>)
        if (this.state.loading)
            form = <Spinner />
        return (
            <div className={classes.contactData}>
                <h4>Input your Details here:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData
