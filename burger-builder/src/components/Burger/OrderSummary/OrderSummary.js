import React, {Component} from 'react';
import AUX from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary.js] componentDidUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(element => {
            return <li key={element}><span
                style={{textTransform: 'capitalize'}}>{element}</span>: {this.props.ingredients[element]}</li>
        })

        return (
            <AUX>
                <h3>Your Order</h3>
                <p>A delicious burger with the following: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h3>Bill Total: <strong>{this.props.sum}</strong></h3>
                <p>Continue to CheckOut?</p>
                <Button btnType='Danger' clicked={this.props.modalClosed}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button>
            </AUX>
        );
    }
}


export default OrderSummary;