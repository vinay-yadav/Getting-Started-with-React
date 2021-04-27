import React from 'react';

const WithClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
}

// const WithClass = props => (
//     <div className={props.classes}>{props.children}</div>
// );

export default WithClass;