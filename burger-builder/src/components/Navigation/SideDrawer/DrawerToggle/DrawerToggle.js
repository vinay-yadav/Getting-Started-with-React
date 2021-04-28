import React from 'react';
import styles from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={styles.DrawerToggle} onClick={props.btn}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;