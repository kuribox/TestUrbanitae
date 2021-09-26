import {
    SEARCH_TITLE_STARTED,
    SEARCH_TITLE_FAILURE,
    SEARCH_TITLE_SUCCESS,
    SEARCH_ALL_STARTED,
    SEARCH_ALL_FAILURE,
    SEARCH_ALL_SUCCESS
  } from './types';
  
  import axios from 'axios';
  
  export const searchTitleAction = ({ value }) => {
    return dispatch => {
      dispatch(searchTitleStarted(value));

      if (value === "" || !value) {
        dispatch(searchTitleSuccess(null));
        return;
      }

      axios
        .get(`https://imdb-api.com/es/API/Search/k_1jgc6xzx/${value}`)
        .then(res => {
          if (res.data.errorMessage) {
            return dispatch(searchTitleFailure(res.data.errorMessage));
          }
          dispatch(searchTitleSuccess(res.data.results));
        })
        .catch(err => {
          dispatch(searchTitleFailure(err.message));
        });
    };
  };
  
  const searchTitleSuccess = elements => ({
    type: SEARCH_TITLE_SUCCESS,
    payload: elements
  });
  
  const searchTitleStarted = (value) => ({
    type: SEARCH_TITLE_STARTED,
    payload: {
      searchKey: value
    }
  });
  
  const searchTitleFailure = error => ({
    type: SEARCH_TITLE_FAILURE,
    payload: {
      error
    }
  });


  export const searchOneElementAction = ({ value }) => {
    return dispatch => {
      dispatch(searchOneElementStarted(value));

      if (value === "" || !value) {
        dispatch(searchOneElementSuccess(null));
        return;
      }

      axios
        .get(`https://imdb-api.com/es/API/Title/k_1jgc6xzx/${value}/FullActor,Posters,Images,Trailer,Ratings,`)
        .then(res => {
          if (res.data.errorMessage) {
            return dispatch(searchOneElementFailure(res.data.errorMessage));
          }

          dispatch(searchOneElementSuccess(res.data));
        })
        .catch(err => {

          dispatch(searchOneElementFailure(err.message));
        });
    };
  };

  const searchOneElementSuccess = elements => ({
    type: SEARCH_ALL_SUCCESS,
    payload: elements
  });
  
  const searchOneElementStarted = (value) => ({
    type: SEARCH_ALL_STARTED,
    payload: {
      searchKey: value
    }
  });
  
  const searchOneElementFailure = error => ({
    type: SEARCH_ALL_FAILURE,
    payload: {
      error
    }
  });
