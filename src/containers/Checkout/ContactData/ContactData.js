import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false })
            this.props.history.push('/')
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false })
        })
    }

    render() {
        let form = (<form>
            <input className={classes.input} type="text" name="name" placeholder="Enter Name" />
            <input className={classes.input} type="email" name="email" placeholder="Enter Email" />
            <input className={classes.input} type="text" name="street" placeholder="Enter Street" />
            <input className={classes.input} type="text" name="postal" placeholder="Enter Postal Code" />
            <Button type='success' click={this.orderHandler}>ORDER</Button>
        </form>)
        if(this.state.loading)
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
