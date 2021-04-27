import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transIngredients = Object.keys(props.ingredients).map(ig_key => {
        return [...Array(props.ingredients[ig_key])].map((_, i) => {
            return <BurgerIngredient key={ig_key + i} type={ig_key}/>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transIngredients.length === 0)
        transIngredients = <p>PLease start adding ingredients</p>;

    // console.log(transIngredients);

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;