import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => {
                    return {counter: prevState.counter + 1}
                })
                break;
            case 'dec':
                this.setState((prevState) => {
                    return {counter: prevState.counter - 1}
                })
                break;
            case 'add':
                this.setState((prevState) => {
                    return {counter: prevState.counter + value}
                })
                break;
            case 'sub':
                this.setState((prevState) => {
                    return {counter: prevState.counter - value}
                })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr}/>
                <CounterControl label="Increment" clicked={this.props.onIncrement}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrement}/>
                <CounterControl label="Add 5" clicked={this.props.onFiveIncrement}/>
                <CounterControl label="Subtract 5" clicked={this.props.onFiveDECREMENT}/>
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((element, index) => (
                        <li style={{cursor: 'pointer'}} key={index}
                            onClick={() => this.props.onDeleteResult(element.id)}>{element.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrement: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrement: () => dispatch({type: actionTypes.DECREMENT}),
        onFiveIncrement: () => dispatch({type: actionTypes.INCREMENT_FIVE, value: 5}),
        onFiveDECREMENT: () => dispatch({type: actionTypes.DECREMENT_FIVE, value: 5}),
        onStoreResult: (counter) => dispatch({type: actionTypes.STORE_RESULT, counter: counter}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, removeId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
