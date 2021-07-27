import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {
  ERROR_POST,
  SET_POST,
  SET_USER,
  SET_POST_LOADING,
  SET_POST_COMMENT,
} from './action.types';
import shortid from 'shortid';
import {utils} from '@react-native-firebase/app';

export const getPosts = () => async dispatch => {
  try {
    database()
      .ref('/posts')
      .on('value', snapshot => {
        // console.log(snapshot.val())
        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_POST,
    });
  }
};

export const setPost = data => async (dispatch, getState) => {
  const state = getState();

  const userId = state.auth.user.uid;
  const {imageUri, text, fullName, image, navigation} = data;
  const uid = shortid.generate();

  // console.log('imageUri', imageUri);
  dispatch(setLoading(true));

  const reference = storage().ref(`/${uid}/`);
  await reference.putFile(imageUri);
  const downloadUrl = await reference.getDownloadURL();
  // console.log('downloaded URL', downloadUrl);
  database().ref(`/posts/${uid}`).set({
    id: uid,
    status: text,
    downloadUrl,
    image,
    by: fullName,
    numOfLikes: 0,
    date: Date.now(),
  });

  database().ref(`/users/${userId}/postUri`).push({
    id: uid,
    postImageUri: downloadUrl,
  });
  dispatch(setLoading(false));
  navigation.pop(2);
  navigation.navigate('Home');
};
function setLoading(data) {
  return {
    type: SET_POST_LOADING,
    payload: data,
  };
}

export const setComment = data => async dispatch => {
  const {comment, fullName, postId, userAvatarUri} = data;
  // console.log('data in SetComment', data);
  const uid = shortid.generate();
  // console.log('vairable', postId);
  database().ref(`/posts/${postId}/commentList`).push({
    fullName,
    comment,
    uid,
    userAvatarUri,
  });
};

export const getPostComment = postId => async dispatch => {
  // const { postId } = data
  // console.log('post id in action', postId);
  try {
    database()
      .ref(`/posts/${postId}/commentList`)
      .on('value', snapshot => {
        // console.log(snapshot.val())
        if (snapshot.val()) {
          dispatch({
            type: SET_POST_COMMENT,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_POST_COMMENT,
            payload: [],
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const setSavedPost = data => async (dispatch, getState) => {
  const {postId, postUri} = data;
  // console.log('data in post component', data);
  const userId = getState().auth.user.uid;
  database().ref(`/users/${userId}/savedPost`).push({
    postId,
    postUri,
  });
};

export const setLike = data => async dispatch => {
  const {
    postId,
    postLikedBy,
    userId,
    postImageUri,
    numofLikes,
    postBy,
    postByImage,
  } = data;
  // console.log(data);
  const uid = shortid.generate();
  database()
    .ref(`/posts/${postId}/votedBy/${userId}`)
    .set({
      likeCount: 1,
    })
    .then(() => {
      database().ref(`/activity`).push({
        activityId: uid,
        postImageUri,
        postBy,
        postByImage,
        postLikedBy,
        userId,
      });
    });
};

export const resetLike = data => async () => {
  // console.log('Reset data', data);
  const {postId, userId} = data;
  database().ref(`/posts/${postId}/votedBy/${userId}`).remove();
};
