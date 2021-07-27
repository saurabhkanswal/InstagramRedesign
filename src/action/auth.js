import auth from '@react-native-firebase/auth';

import database from '@react-native-firebase/database';
import {IS_AUTHENTICATED} from './action.types';

export const signUp = data => async dispatch => {
  // console.log('signup data in action: ',data)
  const {email, fullName, password, image} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      // console.log('User Created Successfully')
      database()
        .ref('/users/' + data.user.uid)
        .set({
          email,
          password,
          fullName,
          image,
          uid: data.user.uid,
        })
        .then(() => {
          // console.log('data set success!')
          dispatch(setAuthentication(true));
        });
    })
    .catch(error => {
      console.error(error);
    });
};

function setAuthentication(data) {
  return {
    type: IS_AUTHENTICATED,
    payload: data,
  };
}

export const signIn = data => async dispatch => {
  // console.log(data)
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      // console.log('signIn success')
      // console.log(data)
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('signOut success!');
    })
    .catch(error => {
      console.error('signOut failed');
    });
};
