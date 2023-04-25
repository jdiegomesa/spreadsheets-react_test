import { combineReducers } from 'redux-immutable';
import data from './reducer-data';
import isLoading from './reducer-loading';

const rootReducer = combineReducers({
  data,
  isLoading
});

export default rootReducer;
