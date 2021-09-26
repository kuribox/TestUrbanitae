import React from 'react'
import styles from './searchBox.module.scss';

const SearchBox = ({ onChange }) => {
  return (
    <input
        onChange={onChange}
        className={styles.input}
        placeholder="Ingrese el titulo de una pelicula o serie."
    />
  );
}

export default SearchBox;
