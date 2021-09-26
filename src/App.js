import React from 'react'
import Router from './router';
import Header from './components/Header';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.content}>
        <Router/>
      </div>
    </div>
  );
}

export default App;
