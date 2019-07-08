import { createStore, combineReducers, Store } from 'redux';
import { userReducer as user } from './reducers/userReducer';
import { roomReducer as room } from './reducers/roomReducer';

const rootReducers =  combineReducers({
  user,
  room,
});

const store: Store = createStore(rootReducers);

export default store;
