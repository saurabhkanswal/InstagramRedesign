import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  ToastAndroid,
  Image,
} from 'react-native';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {connect} from 'react-redux';
import {setComment, setSavedPost, setLike, resetLike} from '../action/post';
import DoubleClick from 'react-native-double-tap';
import LottieView from 'lottie-react-native';

const Post = ({
  avatarUri,
  userName,
  time,
  status,
  postImageUri,
  numofLikes,
  postId,
  setComment,
  setSavedPost,
  navigation,
  isdarkMode,
  setLike,
  resetLike,
  userId,
  voterListObject,
  postLikedBy,
}) => {
  // console.log('kkkkk', voterListObject.hasOwnProperty(userId));
  const savepost = async () => {
    await setSavedPost({
      postId,
      postUri: postImageUri,
    });
    ToastAndroid.show('POST SAVED SUCCESSFULLY', ToastAndroid.SHORT);
  };

  const [showLottie, setShowLottie] = useState(false);

  const [isLiked, setIsLiked] = useState(
    voterListObject.hasOwnProperty(userId),
  );

  async function setVote() {
    if (isLiked) {
      await resetLike({
        postId,
        userId,
      });
      setIsLiked(false);
    } else {
      await setLike({
        postId,
        userId,
        postImageUri,
        numofLikes,
        postBy: userName,
        postByImage: avatarUri,
        postLikedBy,
      });
      setIsLiked(true);
    }
  }

  return (
    <View style={[style.container, isdarkMode && style.makeContianerDarkGrey]}>
      <View style={style.headerContainer}>
        <View style={style.headerContainerLeft}>
          <View
            style={{
              borderWidth: 3,
              borderRadius: 30,
              borderColor: '#00CC83',
            }}>
            <Avatar avatarUri={avatarUri} AvatarSize="S" />
          </View>
          <View>
            <Text
              style={[style.userName, isdarkMode && style.makeContentWhite]}>
              {userName}
            </Text>
            <Text
              style={[style.time, isdarkMode && style.makeContentLightGrey]}>
              {moment(time).fromNow()}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={savepost}>
          <Image
            source={
              isdarkMode
                ? {
                    uri: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/save.png?alt=media&token=bf1ad12d-44d6-4c63-b248-72694d962910',
                  }
                : {
                    uri: 'https://cdn.iconscout.com/icon/free/png-64/save-2892407-2400804.png',
                  }
            }
            style={style.saveLogo}
          />
        </TouchableWithoutFeedback>
      </View>
      {/* Post Image */}
      <DoubleClick
        doubleTap={() => {
          setShowLottie(true);
          setTimeout(() => {
            setShowLottie(false);
          }, 1000);
          if (!isLiked) {
            setLike({
              postId,
              userId,
              postImageUri,
              numofLikes,
              postBy: userName,
              postByImage: avatarUri,
              postLikedBy,
            });
            setIsLiked(true);
          }
        }}
        delay={200}>
        <View>
          <ImageBackground source={{uri: postImageUri}} style={style.postImage}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {showLottie && (
                <LottieView
                  source={require('../LottieAnimation/heart.json')}
                  autoPlay
                  loop
                  style={{width: wp('12%'), height: hp('12%')}}
                />
              )}
            </View>
            <View style={style.postImageContainer}>
              <View style={style.postImageContainerLeft}>
                <View style={style.heartContainer}>
                  <Icon
                    name="heart"
                    size={20}
                    color={isLiked ? '#00CC83' : 'white'}
                    onPress={setVote}
                  />
                </View>
                <View style={style.likesContainer}>
                  <Text>{numofLikes}</Text>
                </View>
              </View>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('Comment', {
                    userName,
                    status,
                    postId,
                  })
                }>
                <View
                  style={[
                    style.commentContainer,
                    isdarkMode && style.makeContianerDarkGrey,
                  ]}>
                  <Icon
                    name="message1"
                    size={20}
                    color={isdarkMode ? 'white' : 'black'}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ImageBackground>
          <View style={style.statusBox}>
            <Text
              style={[
                style.statusBoxUserName,
                isdarkMode && style.makeContentWhite,
              ]}>
              {userName}{' '}
            </Text>
            <Text style={isdarkMode ? {color: 'white'} : {color: 'black'}}>
              {status}
            </Text>
          </View>
        </View>
      </DoubleClick>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('70%'),
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
  },
  makeContianerDarkGrey: {
    backgroundColor: '#31323B',
  },
  makeContentWhite: {
    color: 'white',
  },
  saveLogo: {
    width: wp('6%'),
    height: hp('4%'),
  },
  makeContentLightGrey: {
    color: '#98999D',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginBottom: 0,
    paddingBottom: 0,
    paddingLeft: 7,
  },
  time: {
    color: '#909090',
    paddingLeft: 7,
  },
  postImage: {
    width: wp('80%'),
    height: hp('50%'),
    justifyContent: 'flex-end',
    padding: 10,
  },
  postImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heartContainer: {
    backgroundColor: '#FC0B7B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImageContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesContainer: {
    backgroundColor: '#878789',
    width: wp('12%'),
    height: hp('3%'),
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    borderRadius: 17,
  },
  commentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
  },
  commentBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  PostText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusBoxUserName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

const mapDispatchToProps = {
  setComment: setComment,
  setSavedPost: setSavedPost,
  setLike,
  resetLike,
};

const mapStateToProps = state => {
  // console.log('user State', state.auth.user);
  const {darkMode, post} = state;
  // console.log('👉👉', state.post);
  return {
    isdarkMode: darkMode.IsdarkMode,
    userId: state.auth.user.uid,
    postLikedBy: state.auth.user.fullName,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
