import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const orders = []
            for(let key in response.data) {
                orders.push({
                    id: key,
                    ...response.data[key]
                })
            }
            this.setState({ loading: false, orders: orders })
        }).catch(error => {
            this.setState({ loading: false })
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(ele => (
                    <Order 
                        key={ele.id}
                        ingredients={ele.ingredients}
                        price={ele.price} />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)
