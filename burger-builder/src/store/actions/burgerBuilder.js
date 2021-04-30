import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT, ingredientName: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredient
    }
}


export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFails = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILS
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response);
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchIngredientsFails());
            });
    }
}