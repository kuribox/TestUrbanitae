import {
  SEARCH_TITLE_STARTED,
  SEARCH_TITLE_FAILURE,
  SEARCH_TITLE_SUCCESS,
  SEARCH_ALL_STARTED,
  SEARCH_ALL_FAILURE,
  SEARCH_ALL_SUCCESS
} from '../actions/types';
  
const initialState = {
  loading: false,
  results: [],
  error: null,
  searchKey: '',
  detail: {
    loading: false,
    data: null,
    error: null,
  }
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TITLE_STARTED:
      return {
        ...state,
        loading: true,
        searchKey: action.payload.searchKey
      };
    case SEARCH_TITLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        results: action.payload
      };
    case SEARCH_TITLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case SEARCH_ALL_STARTED:
      return {
        ...state,
        detail: {
          loading: true,
        }
      };
    case SEARCH_ALL_SUCCESS:
      return {
        ...state,
        detail: {
          error: null,
          loading: false,
          data: action.payload
        }
      };
    case SEARCH_ALL_FAILURE:
      return {
        ...state,
        detail: {
          loading: false,
          error: action.payload.error
        }
      };
    default:
      return state;
  }
}