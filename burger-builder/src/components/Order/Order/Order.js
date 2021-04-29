import React from 'react';
import styles from './Order.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>
            Ingredients: {Object.keys(props.items).map((ele, index) => {
            return <span style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin:'0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
                key={ele + index}>{ele} ({props.items[ele]})
            </span>
        })}
        </p>
        <p>
            Price: <strong>{props.price}</strong>
        </p>
    </div>
);

export default order;