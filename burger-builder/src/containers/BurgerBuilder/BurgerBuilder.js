import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorhandler';

const INGREDIENTS_PRICES = {
    salad: 10,
    bacon: 20,
    cheese: 10,
    meat: 25
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 20,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
       axios.get('/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients: response.data});
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true})
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const ingredients = {...this.state.ingredients};
        ingredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;

        this.setState({
            ingredients: ingredients,
            totalPrice: updatedPrice
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount !== 0) {
            const updatedCount = oldCount - 1;
            const ingredients = {...this.state.ingredients};
            ingredients[type] = updatedCount;
            const priceSubtract = INGREDIENTS_PRICES[type];
            const updatedPrice = this.state.totalPrice - priceSubtract;

            this.setState({
                ingredients: ingredients,
                totalPrice: updatedPrice
            })
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        // alert('clicked continued');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                country: 'Germany',
                email: 'test@gmail.com'
            },
            deliveryMethods: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                // this.setState({loading: false, purchasing: false})
                // alert('Order Successful');
            })
            .catch(err => {
                // this.setState({loading: false, purchasing: false})
                console.log(err)
            });

        this.setState({loading: false, purchasing: false})
    }


    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't load</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientSub={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                modalClosed={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                sum={this.state.totalPrice}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }


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

export default withErrorHandler(BurgerBuilder, axios);