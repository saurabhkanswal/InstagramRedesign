import {Input} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Avatar from '../components/Avatar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {setComment, getPostComment} from '../action/post';

const Comment = ({
  navigation,
  route,
  setComment,
  post,
  getPostComment,
  selectedPostComment,
  isDarkMode,
  userData,
}) => {
  console.log('selectedPostComment', selectedPostComment);
  const {userName, status, postId} = route.params;
  // console.log('sdadadaadada', userData);
  const [comment, setCommentData] = useState('');

  useEffect(() => {
    getPostComment(postId);
  }, []);

  const submitComment = async () => {
    await setComment({
      comment,
      fullName: userData.fullName,
      userAvatarUri: userData.image,
      postId,
    });
    getPostComment(postId);
    setCommentData('');
  };

  return (
    <View style={[{flex: 1}, isDarkMode && styles.makeContainerBlack]}>
      <ScrollView>
        <View
          style={[
            styles.StatusBox,
            isDarkMode && styles.makeContainerDullGrey,
          ]}>
          <View
            style={{borderWidth: 2, borderColor: '#FC0B7B', borderRadius: 25}}>
            <Avatar avatarUri={userData.image} AvatarSize="S" />
          </View>
          <View style={styles.StatusBoxRight}>
            <Text
              style={[styles.userName, isDarkMode && styles.makeContentWhite]}>
              {userName}
            </Text>
            <Text
              style={[{color: 'black'}, isDarkMode && styles.makeContentWhite]}>
              {status}
            </Text>
          </View>
        </View>
        {selectedPostComment.length > 0 ? (
          selectedPostComment.map(item => (
            <View style={styles.CommentSection} key={item.uid}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  borderColor: '#00CC83',
                }}>
                <Avatar avatarUri={item.userAvatarUri} AvatarSize="S" />
              </View>
              <View style={styles.StatusBoxRight}>
                <Text
                  style={[
                    styles.userName,
                    isDarkMode && styles.makeContentWhite,
                  ]}>
                  {item.fullName}
                </Text>
                <Text
                  style={
                    ({color: 'black'}, isDarkMode && styles.makeContentWhite)
                  }>
                  {item.comment}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.NoCommentContainer}>
            <Text style={isDarkMode && {color: 'white'}}>
              No comment to show😕
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={[styles.commentBox, isDarkMode && styles.makeContainerDullGrey]}>
        <View
          style={{borderWidth: 2, borderColor: '#FC0B7B', borderRadius: 25}}>
          <Avatar avatarUri={userData.image} AvatarSize="S" />
        </View>
        <View style={styles.commentBoxMid}>
          <TextInput
            style={[styles.Commentinput, isDarkMode && styles.makeContentWhite]}
            onChangeText={setCommentData}
            defaultValue={comment}
            placeholder="Type your comment here..."
            placeholderTextColor={isDarkMode ? 'white' : 'black'}
          />
        </View>
        <TouchableOpacity
          style={styles.commentBoxRight}
          onPress={submitComment}>
          <Text
            style={[
              {fontWeight: 'bold'},
              isDarkMode && styles.makeContentWhite,
            ]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    position: 'absolute',
    // height: 40,
    // left: 0,
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',

    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
  },
  makeContentDullGrey: {
    color: '#D5D5D5',
  },
  makeContentWhite: {
    color: 'white',
  },
  makeContainerDullGrey: {
    backgroundColor: '#252735',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  makeContainerBlack: {
    backgroundColor: 'black',
  },
  CommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  StatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d3d3d3',
    backgroundColor: 'white',
  },
  StatusBoxRight: {
    paddingLeft: 7,
    width: wp('83%'),
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  Commentinput: {
    color: 'black',
  },
  commentBoxLeft: {
    width: wp('12%'),
  },
  commentBoxMid: {
    width: wp('73%'),
    padding: 5,
  },
  commentBoxRight: {
    width: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('5%'),
  },
  NoCommentContainer: {
    height: hp('79%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = {
  setComment: setComment,
  getPostComment: getPostComment,
};

const mapStateToProps = state => {
  const {post, auth} = state;
  console.log('State: ', state.auth.user.image);
  return {
    post: post.posts,
    selectedPostComment: post.selectedPostComment,
    isDarkMode: state.darkMode.IsdarkMode,
    userData: auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
