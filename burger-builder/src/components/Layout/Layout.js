import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>toolbar, side-drawer, backdoor</div>
        <main className={styles.Content}>{props.children}</main>
    </Aux>
);

export default layout;