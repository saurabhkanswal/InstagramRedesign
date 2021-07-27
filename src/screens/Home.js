import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Switch,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {InstaWrittenIcon} from '../img/index';
import Post from '../components/Post';
import {getPosts} from '../action/post';
import {signOut} from '../action/auth';
import {darkMode} from '../action/DarkMode';
import RBSheet from 'react-native-raw-bottom-sheet';
import _ from 'lodash';

const Home = ({getPosts, post, navigation, signOut, darkMode, isdarkMode}) => {
  const refRBSheet = useRef();

  useEffect(() => {
    getPosts();
  }, []);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    darkMode(!isdarkMode);
  };

  const Setting = () => (
    <View style={styles.settingContainer}>
      <View style={styles.switch}>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Image
            source={
              isEnabled
                ? {
                    uri: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/moon.png?alt=media&token=784e02ab-1109-41c4-b09c-95d6566a8de2',
                  }
                : {
                    uri: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/sun.png?alt=media&token=523798d8-f21c-4e74-ad98-d2b2faef5e6a',
                  }
            }
            style={styles.darkModeIcon}
          />
        </View>
        <Text style={styles.logoutIconText}>Dark Mode</Text>
      </View>
      <View style={styles.logoutIcon}>
        <Icon name="logout" size={30} color="white" onPress={() => signOut()} />
        <Text style={styles.switchText}>Signout</Text>
      </View>
    </View>
  );

  const renderPost = ({item}) => {
    // console.log('Voted array', item);
    return (
      <View style={styles.postContainer}>
        <Post
          userName={item.by}
          avatarUri={item.image}
          postImageUri={item.downloadUrl}
          time={item.date}
          numofLikes={_.values(item.votedBy).length}
          status={item.status}
          postId={item.id}
          navigation={navigation}
          voterListObject={item.votedBy ? item.votedBy : {}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.Container, isdarkMode && styles.makeContianerBlack]}>
      <FlatList
        data={post}
        ListHeaderComponent={
          <>
            <View style={styles.headerWrapper}>
              <Icon
                name="setting"
                size={30}
                color={isdarkMode ? 'white' : 'black'}
                onPress={() => refRBSheet.current.open()}
              />
              <Image
                source={
                  isdarkMode
                    ? {
                        uri: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/instagram%20(4).png?alt=media&token=721750ae-d2db-498c-b3b9-eb35c8d2fbea',
                      }
                    : InstaWrittenIcon
                }
                style={styles.headerLogo}
              />
              <Icon
                name="message1"
                size={30}
                color={isdarkMode ? 'white' : 'black'}
                onPress={() => navigation.push('Messages')}
              />
            </View>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/300',
                  }}
                  style={[styles.StoryAvatar]}
                />
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/150?img=60',
                  }}
                  style={styles.StoryAvatar}
                />
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/150?u=fake@pravatar.com',
                  }}
                  style={styles.StoryAvatar}
                />
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/150?img=39',
                  }}
                  style={styles.StoryAvatar}
                />
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/150?img=24',
                  }}
                  style={styles.StoryAvatar}
                />
              </ScrollView>
            </View>
          </>
        }
        renderItem={renderPost}
        refreshing={false}
        onRefresh={() => getPosts()}
        keyExtractor={item => item.id}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: 'rgba(0,0,0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        height={120}>
        <Setting />
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#ededed',
    // flex: 1,
  },
  makeContianerBlack: {
    backgroundColor: 'black',
  },
  makeContentWhite: {
    color: 'white',
  },
  darkModeIcon: {
    width: wp('7%'),
    height: hp('3%'),
    padding: 10,
  },
  settingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  logoutIcon: {
    alignItems: 'center',
  },
  logoutIconText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 4,
  },
  switch: {
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 4,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerLogo: {
    width: wp('28%'),
    height: hp('5%'),
  },
  postContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  StoryAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'red',
    width: wp('21%'),
    height: hp('10%'),
    borderWidth: 3,
    borderColor: '#FC0B7B',
    margin: 10,
  },
});

const mapDispatchToProps = {
  getPosts: getPosts,
  signOut: signOut,
  darkMode: darkMode,
};

const mapStateToProps = state => {
  const {post, darkMode} = state;
  return {
    post: post.posts,
    isdarkMode: darkMode.IsdarkMode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
