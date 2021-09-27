import React from 'react';
import styles from './listElement.module.scss';

const ListElement = ({ element, onPress }) => {
    return (
        <div
            className={styles.container}
            onClick={() => { onPress(element.id) }}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={element.image} alt={element.id}/>
            </div>
            <span className={styles.title}>{element.title}</span>
        </div>
    )
}

export default ListElement;
