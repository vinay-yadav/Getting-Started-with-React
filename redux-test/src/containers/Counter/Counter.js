import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';


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
        onIncrement: () => dispatch(actionCreators.increment()),
        onDecrement: () => dispatch(actionCreators.decrement()),
        onFiveIncrement: () => dispatch(actionCreators.incrementFive()),
        onFiveDECREMENT: () => dispatch(actionCreators.decrementFive()),
        onStoreResult: (counter) => dispatch(actionCreators.onStoreResult(counter)),
        onDeleteResult: (id) => dispatch(actionCreators.onDeleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
