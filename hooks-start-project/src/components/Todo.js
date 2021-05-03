import React, { useState } from 'react';
import axios from "axios";

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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [todoName, setTodoName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [todoList, setTodoList] = useState([]);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    }

    const todoListHandler = () => {
        setTodoList(todoList.concat(todoName));
        setTodoName('');

        axios.post('https://burgerbuilder-cb640-default-rtdb.firebaseio.com/todos.json', {todo: todoName})
            .then(res => console.log(res))
            .catch(error => console.log((error.response)))
    }


    return (
        <React.Fragment>
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName} />
            <button type="button" onClick={todoListHandler}>Add</button>
            <ul>
                {todoList.map((todo, index) => <li key={index}>{todo}</li>)}
            </ul>
        </React.Fragment>
    );
}

export default todo;