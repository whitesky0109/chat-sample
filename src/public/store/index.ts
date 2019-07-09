import { createStore, combineReducers, Store } from 'redux';

import { roomReducer as room } from './reducers/roomReducer';
import { userReducer as user } from './reducers/userReducer';
import { onRecvLogin, onRecvUsers } from './actions/userAction';
import { setRoomId, onRecvRoom } from './actions/roomAction';

const rootReducers =  combineReducers({
  user,
  room,
});

const store: Store = createStore(
  rootReducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export const clearAll = () => {
  onRecvLogin();
  setRoomId();
  onRecvRoom();
  onRecvUsers();
};

export default store;
