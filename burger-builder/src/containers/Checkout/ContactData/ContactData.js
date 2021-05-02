import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from "react-redux";
import axios from '../../../axios-orders';
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorhandler";
import * as contactDataReducer from '../../../store/actions/order';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethods: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        // loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true});

        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        this.props.createOrder(order, this.props.token);

        console.log('Order Places [Order.js]')
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({loading: false})
        //     });

        // this.setState({loading: false})
    }

    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const newOrderForm = {...this.state.orderForm};
        const newOrderFormElement = {...newOrderForm[inputIdentifier]};

        newOrderFormElement.value = event.target.value;
        newOrderFormElement.valid = this.checkValidation(newOrderFormElement.value, newOrderFormElement.validation);
        newOrderFormElement.touched = true;
        newOrderForm[inputIdentifier] = newOrderFormElement;

        let formIsValid = true;
        for (let key in newOrderForm) {
            formIsValid = newOrderForm[key].valid && formIsValid;
            if (!formIsValid) {
                break;
            }
        }

        this.setState({orderForm: newOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(ele => (
                    <Input
                        key={ele.id}
                        elementType={ele.config.elementType}
                        elementConfig={ele.config.elementConfig}
                        value={ele.config.value}
                        invalid={!ele.config.valid}
                        shouldValidate={ele.config.validation}
                        isTouched={ele.config.touched}
                        changed={(event) => this.inputChangedHandler(event, ele.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
                    Order Now
                </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
});

const mapDispatchToProps = dispatch => {
    return {
        createOrder: (orderData, token) => dispatch(contactDataReducer.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));