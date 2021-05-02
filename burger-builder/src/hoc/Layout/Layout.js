import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleBtn={this.sideDrawerCloseHandler} isAuth={this.props.isAuthenticated}/>
                <SideDrawer
                    show={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={styles.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);