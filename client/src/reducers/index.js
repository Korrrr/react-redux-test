import { combineReducers } from 'redux';
import user from './user';
import albums from './albums';
import photos from './photos';


const reducers = combineReducers({
  user,
  albums,
  photos,
});

export default reducers;
