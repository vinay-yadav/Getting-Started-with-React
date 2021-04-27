import React from 'react';
import PropTypes from 'prop-types';
import styles from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';


const person = (props) => (
    <Aux>
        <AuthContext.Consumer>{
            (context) => context.authenticated ? <p>Authenticated</p> : <p>Login Please</p>
        }
        </AuthContext.Consumer>
        <p onClick={props.click}>I'm a {props.name} and I'm {props.age} years old</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.change} value={props.name}/>
    </Aux>

    // <div className={styles.Person}>
    //     <p onClick={props.click}>I'm a {props.name} and I'm {props.age} years old</p>
    //     <p>{props.children}</p>
    //     <input type="text" onChange={props.change} value={props.name}/>
    // </div>
);

person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changes: PropTypes.func
};

export default withClass(person, styles.Person);