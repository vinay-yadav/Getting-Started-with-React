import React from 'react';
import styles from './Input.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.isTouched) {
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ("input"):
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case ('textarea'):
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value}
                    onChange={props.changed}
                />
            );
            break;
    }

    return (
        <div className={styles}>
            <label className={styles.Label}>{props.children}</label>
            {inputElement}
        </div>
    );
}

export default input;