import React from 'react';

const list = (props) => {
    console.log('Rendering the list...');
    return (
        <ul>
            {props.items.map((todo, index) => <li key={index}>{todo.todo}</li>)}
        </ul>
    );
}

export default list;