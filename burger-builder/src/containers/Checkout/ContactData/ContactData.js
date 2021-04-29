import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        console.log('orderHandler');
        event.preventDefault();
        this.setState({loading: true});

        // alert('clicked continued');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Maximum',
                country: 'France',
                email: 'test@gmail.com'
            },
            deliveryMethods: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
               console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
            });

        // this.setState({loading: false})
    }

    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={styles.Input} type="text" name="email" placeholder="Your Email"/>
                <input className={styles.Input} type="text" name="street" placeholder="Street"/>
                <input className={styles.Input} type="text" name="postalCode" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order Now</Button>
            </form>
        );

        if(this.state.loading){
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

export default ContactData;