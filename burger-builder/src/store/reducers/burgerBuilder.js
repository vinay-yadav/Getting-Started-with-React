import * as actionTypes from '../actions/actionTypes';


const INGREDIENTS_PRICES = {
    salad: 10,
    bacon: 20,
    cheese: 10,
    meat: 25
}

const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return actionTypes.updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            })
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            // }
        case (actionTypes.REMOVE_INGREDIENT):
            if(state.ingredients[action.ingredientName] < 1)
                return state;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            }
        case (actionTypes.FETCH_INGREDIENTS_FAILS):
            return {
                ...state,
                error: true
            }
        case (actionTypes.SET_INGREDIENT):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 20
            }
        default:
            return state;
    }
}

export default reducer;