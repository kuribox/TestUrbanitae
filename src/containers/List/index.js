import React, { useState } from 'react'
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from 'react-redux';
import styles from './list.module.scss';
import { searchTitleAction } from '../../actions';
import SearchBox from '../../components/SearchBox';
import ListElement from "../../components/ListElement";

const ListContainer = () => {
  // const [searchValue, setSearchValue] = useState(null);
  const [timeoutToSearch, setTimeoutToSearch] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const loading = useSelector((state) => state.searchReducer.loading);
  const searchKey = useSelector((state) => state.searchReducer.searchKey);
  const results = useSelector((state) => state.searchReducer.results);
  const errorMsg = useSelector((state) => state.searchReducer.error);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <SearchBox 
        onChange={(event) => {
          // Calcula el timeout antes de iniciar con la busqueda
          if (timeoutToSearch) clearTimeout(timeoutToSearch);
          setTimeoutToSearch(setTimeout(() => {
            dispatch(searchTitleAction({ value: event.target.value}));
            setIsDirty(true);
            // setSearchValue(event.target.value);
          }, 500));
        }}
      />
      <div className={styles.listContent}>
        {loading && (
          <Loader
            type="Puff"
            color="#88b04b"
            height={30}
            width={30}
          />
        )}

        {
          !loading && errorMsg && isDirty && (
            <div className={styles.errorMsg}> 
              <span>{errorMsg}</span>
            </div>
          )
        }

        {
          !loading && !errorMsg && results && results.length === 0 && isDirty && (
            <div className={styles.errorMsg}>
              <span>No se encontraron resultados para su busqueda</span>
            </div>
          )
        }

        {
          !loading && results && !errorMsg && results.length > 0 && isDirty && (
            <>
              <div className={styles.searchTitle}>
                Resultados de la busqueda de {searchKey}
              </div>
              {
                results.map(e => <ListElement key={e.id} element={e} />)
              }
            </>
          )
        }
      </div>
   
    </div>
  );
}

export default ListContainer;
