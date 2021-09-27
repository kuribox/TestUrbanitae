import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from "./home.module.scss";
import Button from "../../components/Button";

const App = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <span className={styles.legend}>Bienvenido a la prueba tecnica de REACT.js desarrollada por <b>Martín Baratto</b> para <b>Urbanitae</b>.</span>
      <Button label={"Continuar"} onClick={() => {
        history.push("/list");
      }}/>
    </div>
  );
}

export default App;
