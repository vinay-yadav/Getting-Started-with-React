import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentWillMount() {
        // this.props.onPurchaseInit();
        //     const query = new URLSearchParams(this.props.location.search)
        //     console.log(query);
        //
        //     let price = 0;
        //     const ingredients = {};
        //     for (let param of query.entries()) {
        //         if (param[0] === 'price') {
        //             price = param[1];
        //         } else {
        //             ingredients[param[0]] = +param[1];
        //         }
        //     }
        //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    render() {
        let summary = <Redirect to="/"/>;

        if (this.props.ingS) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingS}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )

        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingS: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);