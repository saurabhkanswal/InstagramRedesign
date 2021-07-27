import {SET_CONTACTS, SET_CONTACTS_LOADING} from './action.types';
import database from '@react-native-firebase/database';

export const Get_Contacts = () => async (dispatch, getState) => {
  const contacts = [];
  database()
    .ref('/users/')
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        console.log('ITEM', item._snapshot.value.fullName);
        contacts.push({
          useName: item._snapshot.value.fullName,
          userAvatar: item._snapshot.value.image,
          userUid: item._snapshot.value.uid,
        });
      });
    })
    .then(() => {
      dispatch({
        type: SET_CONTACTS,
        payload: contacts,
      });
    })
    .then(() => {
      dispatch({
        type: SET_CONTACTS_LOADING,
        payload: false,
      });
    });
};
