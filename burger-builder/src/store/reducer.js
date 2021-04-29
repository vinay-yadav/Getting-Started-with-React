import * as actionTypes from './actions';


const INGREDIENTS_PRICES = {
    salad: 10,
    bacon: 20,
    cheese: 10,
    meat: 25
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 20
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
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
        default:
            return state;
    }
}

export default reducer;