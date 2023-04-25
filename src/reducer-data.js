import nombres from './data.json';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: '',
  loading: false,
  error: null,
  fetched: false,
  search: '',
})

function data ( state = initialState, action){
  switch (action.type){
    case 'SEARCH':
      return state.set('search', action.payload.query)
    case 'FETCH_DATA_BEGIN':
      return state
        .set('loading', true)
        .set('error', null)
    case 'FETCH_DATA_FAILURE':
      return state
        .set('loading', false)
        .set('error', action.payload.error)
    case 'FETCH_DATA_SUCCESS':
      return state
        .set('loading', false)
        .set('data', action.payload.data)
        .set('fetched', true)
    default:
      return  state
  }
}

export default data;
