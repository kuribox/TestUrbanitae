import React from 'react';
import styles from './listElement.module.scss';
import { useHistory } from 'react-router-dom';

const ListElement = ({ element }) => {
    const history = useHistory();

    return (
        <div
            className={styles.container}
            onClick={() => {
                history.push(`detail/${element.id}`)
            }}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={element.image} />
            </div>
            <span className={styles.title}>{element.title}</span>
        </div>
    )
}

export default ListElement;
