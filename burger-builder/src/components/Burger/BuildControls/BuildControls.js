import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    label={ctrl.label}
                    key={ctrl.type}
                    addIng={() => props.ingredientAdded(ctrl.type)}
                    subIng={() => props.ingredientSub(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button className={styles.OrderButton} disabled={(props.price <= 20)} onClick={props.ordered}>
                {props.isAuth ? "ORDER NOW" : "SIGN UP"}
            </button>
        </div>
    );
}

export default buildControls;