import React, {Component} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorhandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
                console.log(this.state);
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order key={order.id} items={order.ingredients} price={+order.price}/>
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);