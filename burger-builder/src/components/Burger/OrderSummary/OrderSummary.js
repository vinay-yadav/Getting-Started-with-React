import React from 'react';
import AUX from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(element => {
        return <li key={element}><span style={{textTransform: 'capitalize'}}>{element}</span>: {props.ingredients[element]}</li>
    })
    return (
        <AUX>
            <h3>Your Order</h3>
            <p>A delicious burger with the following: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to CheckOut?</p>
        </AUX>
    );
}

export default orderSummary;