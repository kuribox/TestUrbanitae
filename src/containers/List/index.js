import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './list.module.scss';
import { searchTitleAction } from '../../actions';
import SearchBox from '../../components/SearchBox';
import List from '../../components/List';
import { useHistory } from 'react-router-dom';

const ListContainer = () => {
  const history = useHistory();

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
          }, 500));
        }}
      />

      <List 
        loading={loading}
        searchKey={searchKey}
        elements={results}
        errorMsg={errorMsg}
        isDirty={isDirty}
        onPress={(id) => {
          history.push(`detail/${id}`)
        }}
      />
    </div>
  );
}

export default ListContainer;
