import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 10,
    bacon: 20,
    cheese: 10,
    meat: 25
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 20
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


    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        console.log(disableInfo);

        return (
            <Aux>
                <Modal><OrderSummary ingredients={this.state.ingredients} /></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientSub={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;