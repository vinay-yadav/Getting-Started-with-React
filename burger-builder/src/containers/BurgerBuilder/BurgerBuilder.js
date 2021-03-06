import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorhandler';
import {connect} from 'react-redux';
import * as reducerActionCreator from '../../store/actions/index';
import * as actions from "../../store/actions";


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.setIngredients();
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const ingredients = {...this.state.ingredients};
    //     ingredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const updatedPrice = this.props.price + priceAddition;
    //
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: updatedPrice
    //     })
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount !== 0) {
    //         const updatedCount = oldCount - 1;
    //         const ingredients = {...this.state.ingredients};
    //         ingredients[type] = updatedCount;
    //         const priceSubtract = INGREDIENTS_PRICES[type];
    //         const updatedPrice = this.props.price - priceSubtract;
    //
    //         this.setState({
    //             ingredients: ingredients,
    //             totalPrice: updatedPrice
    //         })
    //     }
    // }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        }
        else {
            this.props.setAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }


    render() {
        const disableInfo = {...this.props.ingS};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't load</p> : <Spinner/>;

        if (this.props.ingS) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingS}/>
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientSub={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        price={this.props.price}
                        isAuth={this.props.isAuth}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingS}
                modalClosed={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                sum={this.props.price}
            />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner/>;
        // }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingS: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredient) => dispatch(reducerActionCreator.addIngredient(ingredient)),
        onIngredientRemove: (ingredient) => dispatch(reducerActionCreator.removeIngredient(ingredient)),
        setIngredients: () => dispatch(reducerActionCreator.initIngredients()),
        onInitPurchase: () => dispatch(reducerActionCreator.purchaseInit()),
        setAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));