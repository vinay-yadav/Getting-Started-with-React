import React from 'react';
import styles from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button disabled={props.disabled} className={styles.Less} onClick={props.subIng}>Less</button>
            <button className={styles.More} onClick={props.addIng}>More</button>
        </div>
    );
}

export default buildControl;