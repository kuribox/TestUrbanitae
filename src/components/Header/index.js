import React from 'react';
import styles from './header.module.scss';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    <>
      <div className={styles.container}>
        <img
          onClick={() => {
            history.push("/");
          }}
         className={styles.logo}
         src={"/img/logo.png"}
         alt="Prueba tecnica Urbanitae"
        />
      </div>
    </>
  );
}

export default Header;