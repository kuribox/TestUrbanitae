import React from 'react'
import Loader from "react-loader-spinner";
import styles from './list.module.scss';
import ListElement from "../../components/ListElement";

const ListContainer = ({ loading, searchKey, elements, errorMsg, isDirty, onPress}) => {
  return (
    <div className={styles.listContent}>
      {loading && (
        <div data-testid="loading">
          <Loader
            type="Puff"
            color="#88b04b"
            height={30}
            width={30}
            />
        </div>
      )}

      {
        !loading && errorMsg && isDirty && (
        <div className={styles.errorMsg} data-testid="error"> 
            <span>{errorMsg}</span>
        </div>
        )
      }

      {
        !loading && !errorMsg && elements && elements.length === 0 && isDirty && (
        <div className={styles.errorMsg} data-testid="noResults">
            <span>No se encontraron resultados para su busqueda</span>
        </div>
        )
      }

      {
        !loading && elements && !errorMsg && elements.length > 0 && isDirty && (
          <>
            <div className={styles.searchTitle}>
                Resultados de la busqueda de {searchKey}
            </div>
            <div className={styles.results} data-testid="results">
              {
                elements.map(e => <ListElement key={e.id} element={e} onPress={onPress} />)
              }
            </div>
          </>
        )
      }
    </div>
  );
}

export default ListContainer;
