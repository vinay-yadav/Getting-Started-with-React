import React, {Component} from "react";
import Transition from "react-transition-group/cjs/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
    state = {
        modalOpen: false,
        showBlock: false
    }

    modalDisplayHandler = () => {
        this.setState(prevState => {
            return {modalOpen: !prevState.modalOpen};
        })
    }

    blockDisplayHandler = () => {
        this.setState(prevState => {
            return {showBlock: !prevState.showBlock};
        })
    }

    render() {
        return (
            <div className="App">
                <h1>React Animations</h1>
                <button className="Button" onClick={this.blockDisplayHandler}>Toggle</button>
                <br/><br/>
                <Transition in={this.state.showBlock} timeout={100} mountOnEnter unmountOnExit>
                    {state => (
                        <div style={{
                            backgroundColor: 'red',
                            width: 100,
                            height : 100,
                            margin: 'auto',
                            transition: 'opacity 1s ease-out',
                            opacity: state === 'exited' ? 0 : 1
                        }}>l</div>
                    )}
                </Transition>


                <Modal closed={this.modalDisplayHandler} show={this.modalDisplayHandler} />

                <Backdrop show={this.state.modalOpen}/>
                <button className="Button" onClick={this.modalDisplayHandler}>Open Modal</button>
                <h3>Animating Lists</h3>
                <List/>
            </div>
        );
    }
}

export default App;
