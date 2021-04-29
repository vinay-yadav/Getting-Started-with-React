import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';
import {withRouter} from 'react-router-dom';

const checkoutSummary = (props) => {
    const checkoutHandler = () => {
        console.log(props);
        props.history.push('/');
    }

    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={checkoutHandler}>CANCEL</Button>
            <Button btnType='Success' clicked={() => props.history.replace('/checkout/contact-data')}>CONTINUE</Button>
        </div>
    );
}

export default withRouter(checkoutSummary);