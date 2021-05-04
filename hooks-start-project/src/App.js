import React, {useState} from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

function App() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [switchButton, setButton] = useState(true);

    const [authStatus, setAuthStatus] = useState(false);

    const todoLoader = () => {
        setButton(false);
    }

    const authLoader = () => {
        setButton(true);
    }

    const login = () => {
        setAuthStatus(true);
    }

    return (
        <div className="App">
            <AuthContext.Provider value={{status: authStatus, login: login}}>
                <Header onLoadTodos={todoLoader} onLoadAuth={authLoader}/>
                <hr/>
                {switchButton ? <Auth/> : <Todo/>}
            </AuthContext.Provider>

        </div>
    );
}

export default App;
