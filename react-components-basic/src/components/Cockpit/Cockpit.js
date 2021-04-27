import React, { useEffect, useRef, useContext } from 'react';
import styles from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleRef = useRef(null);
    const authContext = useContext(AuthContext);

    // runs after every render cycle
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // setTimeout(() => toggleRef.current.click(), 3000);
        return () => {
            console.log('[Cockpit.js] useEffect Cleans');
        }
    }, [])

    const classes = [];
    let btnClass = ''

    if(props.showPersons){
        btnClass = styles.Red;
    }


    if (props.personsLength <= 2)
        classes.push(styles.red);
    if (props.personsLength <= 1)
        classes.push(styles.bold)

    return (
        <div className={styles.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={classes.join(' ')}>This is really working!!!</p>
            <button ref={toggleRef} className={btnClass} onClick={props.toggle}>Toggle Persons</button>
            <button onClick={authContext.login}>Login</button>

            {/*<AuthContext.Consumer>*/}
            {/*    {(context) => <button onClick={context.login}>Login</button>}*/}
            {/*</AuthContext.Consumer>*/}
        </div>
    );
}

export default React.memo(cockpit);