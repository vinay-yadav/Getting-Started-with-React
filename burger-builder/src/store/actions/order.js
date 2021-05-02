import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (order, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?auth=' + token, order)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.name, order))
            })
            .catch(err => dispatch(purchaseBurgerFail(err)));
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}


export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());

        axios.get('/orders.json?auth=' + token)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
            })
    }
}