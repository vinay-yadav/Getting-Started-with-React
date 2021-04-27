import React, {Component} from 'react';
// import React, {useState} from 'react';
import styles from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from "../hoc/withClass";
import Aux from "../hoc/Aux";
import AuthContext from '../context/auth-context';


class App extends Component {
    state = {
        persons: [
            {id: 'abc', name: 'Vinay', age: 20},
            {id: 'def', name: 'Rahul', age: 25},
            {id: 'pqr', name: 'Shanta', age: 26}
        ],
        showPersons: false,
        authenticated: false
    }

    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state
    }


    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[App.js] componentDidUpdate');
    }

    nameChangeHandle = (event, id) => {
        const personIndex = this.state.persons.findIndex(per => {
            return per.id === id;
        })

        const person = {...this.state.persons[personIndex]};
        // const person = Object.assign({}, this.state.persons[personIndex]);

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons})
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    deletePersonHandler = (personIndex) => {
        // Always create copy before setting the state
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    loginHandler = () => {
        this.setState((prevState, props) => {
            return {authenticated: !prevState.authenticated}

        });
    }

    // use .bind() over () =>

    render() {
        console.log('[App.js] render');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangeHandle}
            />;
        }

        return (
            <Aux>
                <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
                    <Cockpit
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        toggle={this.togglePersonsHandler}
                    />
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClass(App, styles.App);


/* Using WebHooks */
// const app = props => {
//     /*
//         useState is an array of 2 elements:
//             1. object
//             2. function for object change - it does not merge like class state instead it replaces
//     */
//     const [personState, setPersonState] = useState({
//         persons: [
//             {name: 'Vinay', age: 20},
//             {name: 'Rahul', age: 25},
//             {name: 'Shanta', age: 26}
//         ],
//         others: "Hello"
//     })
//
//     console.log(personState);
//
//     const switchHereHandler = () => {
//         // console.log('was clicked');
//         setPersonState({
//             persons: [
//                 {name: 'Vinay Yadav', age: 25},
//                 {name: 'Rahul', age: 25},
//                 {name: 'Shanta', age: 20}
//             ]
//         })
//     }
//
//     return (
//         <div className="App">
//             <h1>Hi, I'm a React App</h1>
//             <p>This is really working!!!</p>
//             <button onClick={switchHereHandler}>Switch Here</button>
//             <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
//             <Person name={personState.persons[1].name} age={personState.persons[1].age}>Hobbies: Marketing</Person>
//             <Person name={personState.persons[2].name} age={personState.persons[2].age}/>
//         </div>
//     );
// }
//
// export default app;


/* Back Structure of render */
// return React.createElement(
//     'div',
//     {className: 'App'},
//     React.createElement('h1', null, 'Hi, I\'m a React App')
// );