import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar toggleBtn={this.sideDrawerCloseHandler}/>
                <SideDrawer show={this.state.showSideDrawer} close={this.sideDrawerCloseHandler}/>
                <main className={styles.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}


export default Layout;