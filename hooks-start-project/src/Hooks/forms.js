import {useState} from 'react'

export const useFormInput = () => {
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    const inputChangeHandler = event => {
        setValue(event.target.value);
        if (event.target.value.trim() === '') {
            setValid(false);
        } else {
            setValid(true);
        }
    }

    return {
        value: value,
        onChange: inputChangeHandler,
        valid: valid
    }
};