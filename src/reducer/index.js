import {combineReducers} from 'redux';
import auth from './auth';
import post from './post';
import darkMode from './darkMode';
import activityList from './Activity';
import contacts from './Contacts';

export default combineReducers({
  auth,
  post,
  darkMode,
  activityList,
  contacts,
});
