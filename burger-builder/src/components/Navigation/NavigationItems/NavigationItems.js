import React from 'react';
import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {
            props.isAuth
                ? <NavigationItem link="/orders">MyOrders</NavigationItem>
                : null
        }
        {
            props.isAuth
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authentication</NavigationItem>
        }

    </ul>
);

export default navigationItems;