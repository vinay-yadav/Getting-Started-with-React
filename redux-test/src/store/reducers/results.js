import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.counter})     // concat gives the new array where push passes the reference
            }
        case actionTypes.DELETE_RESULT:
            const updateArray = state.results.filter((element) => element.id !== action.removeId)
            return {
                ...state,
                results: updateArray
            }
        default:
            return state;
    }
}

export default reducer;