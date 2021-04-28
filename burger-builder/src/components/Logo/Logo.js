import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import styles from './Logo.css';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="burger-logo"/>
    </div>
);

export default logo;