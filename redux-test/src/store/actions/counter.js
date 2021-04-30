import * as actionTypes from './actionTypes';

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const incrementFive = () => {
    return {
        type: actionTypes.INCREMENT_FIVE,
        value: 5
    }
}

export const decrementFive = () => {
    return {
        type: actionTypes.DECREMENT_FIVE,
        value: 5
    }
}