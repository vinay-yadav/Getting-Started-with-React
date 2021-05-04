/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect, useReducer, useRef, useMemo} from 'react';
import axios from "axios";
import List from './List';

const todo = (props) => {
    /* Merge state approach
    const [todoState, setTodoState] = useState({userInput: '', todoList: []});

    const inputChangeHandler = (event) => {
        setTodoState({
            userInput: event.target.value,
            todoList: todoState.todoList
        });
    }

    const todoListHandler = () => {
        setTodoState({
            userInput: '',
            todoList: todoState.todoList.concat(todoState.userInput)
        });
    }*/

    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    const todoInputRef = useRef();

    useEffect(() => {
        axios.get('https://burgerbuilder-cb640-default-rtdb.firebaseio.com/todos.json')
            .then(todo => {
                const todoData = Object.keys(todo.data).map(element => {
                    return {
                        ...todo.data[element],
                        id: element
                    }
                });
                console.log(todoData);
                setTodoList(todoData);
            })
            .catch(err => console.log(err));
    }, []);

    // useReducer
    // const todoReducer = (state, action) => {
    //     switch (action.type) {
    //         case ('ADD'):
    //             return state.concat(action.payload)
    //         case ('REMOVE'):
    //             return state.filter(todo => todo.id !== action.payload.id)
    //         default:
    //             return state
    //     }
    // }
    //
    // const [todoState, dispatch] = useReducer(todoReducer, []);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    }

    const todoListHandler = () => {
        setTodoList(todoList.concat({todo: todoName}));
        setTodoName('');

        axios.post('https://burgerbuilder-cb640-default-rtdb.firebaseio.com/todos.json', {todo: todoName})
            .then(res => console.log(res))
            .catch(error => console.log((error.response)))
    }


    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Todo"
                onChange={inputChangeHandler}
                value={todoName}
                // ref={todoInputRef}
            />
            <button type="button" onClick={todoListHandler}>Add</button>
            {/*<ul>*/}
            {/*    {todoList.map((todo, index) => <li key={index}>{todo.todo}</li>)}*/}
            {/*</ul>*/}
            {useMemo(
                () => (
                    <List items={todoList}/>
                ),
                [todoList]
            )}
        </React.Fragment>
    );
}

export default todo;