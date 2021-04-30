import * as actionTypes from './actionTypes';

export const saveResult = (counter) => {
    return {
        type: actionTypes.STORE_RESULT,
        counter: counter
    }
}

export const onStoreResult = (counter) => {
    console.log('onStore initiated');
    return (dispatch, getState) => {
        setTimeout(() => {
            console.log("Counter: ", getState().ctr.counter);
            dispatch(saveResult(counter));
        }, 200);
    }
}

export const onDeleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        removeId: id
    }
}