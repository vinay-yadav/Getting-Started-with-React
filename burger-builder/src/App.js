import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';
import {connect} from "react-redux";
import asyncComponent from "./hoc/asynComponent/asynComponent";


const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));


class App extends Component {
    componentWillMount() {
        console.log('componentWillMount');
        this.props.onReloadAuthSet();
    }

    render() {
        console.log('render');
        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to="/"/>
                {/*<Route render={() => <h1>Page 404</h1>}/>*/}
            </Switch>
        )

        if(this.props.isAuth){
            routes = (
                <Switch>
                    <Route path='/auth' component={asyncAuth}/>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/orders' component={asyncOrders}/>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReloadAuthSet: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
