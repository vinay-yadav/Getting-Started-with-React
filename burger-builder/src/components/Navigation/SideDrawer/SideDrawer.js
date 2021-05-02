import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (props.show) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.close}/>
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;