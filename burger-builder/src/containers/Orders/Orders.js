import React, {Component} from 'react';
import {connect} from "react-redux";
import Order from '../../components/Order/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorhandler";
import * as orderReducer from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
        // axios.get('/orders.json')
        //     .then(response => {
        //         const fetchedOrders = [];
        //         for (let key in response.data) {
        //             fetchedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //         console.log(this.state);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({loading: false});
        //     })
    }

    render() {
        let orders = <Spinner/>;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} items={order.ingredients} price={+order.price}/>
            })
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(orderReducer.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));