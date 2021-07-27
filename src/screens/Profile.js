import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {signOut} from '../action/auth';
import {connect} from 'react-redux';
import Avatar from '../components/Avatar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import _ from 'lodash';

const Profile = ({signOut, user, post, isdarkMode}) => {
  const [activeScreen, setActiveScreen] = useState('POST');
  let postLength = _.values(user.postUri).length;
  const [DATA, setDATA] = useState(_.values(user.postUri));

  useEffect(() => {
    if (activeScreen === 'POST') {
      setDATA(_.values(user.postUri));
    } else {
      setDATA(_.values(user.savedPost));
    }
  }, [activeScreen]);

  // console.log('darrrk mode: ', isdarkMode);

  const renderItem = ({item}) => {
    if (activeScreen === 'POST') {
      return (
        <View style={{padding: 3}}>
          <Image source={{uri: item.postImageUri}} style={Styles.postImage} />
        </View>
      );
    } else {
      return (
        <View style={{padding: 3}}>
          <Image source={{uri: item.postUri}} style={Styles.postImage} />
        </View>
      );
    }
  };

  return (
    <View style={[isdarkMode && Styles.makeContianerLightBlack, {flex: 1}]}>
      <FlatList
        numColumns={3}
        horizontal={false}
        ListHeaderComponent={
          <>
            <View
              style={[
                Styles.topContainer,
                isdarkMode && Styles.makeContianerDarkGrey,
              ]}>
              <View style={Styles.avatarContainer}>
                <Avatar avatarUri={user.image} AvatarSize="M" />
              </View>
              <Text
                style={[
                  {
                    padding: 10,
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'black',
                  },
                  isdarkMode && Styles.makeContentWhite,
                ]}>
                {user.fullName}
              </Text>
              <View style={Styles.topContainerStat}>
                <View style={{alignItems: 'center', padding: 10}}>
                  <Text
                    style={[
                      {fontWeight: 'bold', fontSize: 27, color: 'black'},
                      isdarkMode && Styles.makeContentWhite,
                    ]}>
                    22.2K
                  </Text>
                  <Text
                    style={[
                      {color: 'black'},
                      isdarkMode && Styles.makeContentLightGrey,
                    ]}>
                    Followes
                  </Text>
                </View>
                <View style={{alignItems: 'center', padding: 10}}>
                  <Text
                    style={[
                      {fontWeight: 'bold', fontSize: 27, color: 'black'},
                      isdarkMode && Styles.makeContentWhite,
                    ]}>
                    {postLength}
                  </Text>
                  <Text
                    style={[
                      {color: 'black'},
                      isdarkMode && Styles.makeContentLightGrey,
                    ]}>
                    Post
                  </Text>
                </View>
                <View style={{alignItems: 'center', padding: 10}}>
                  <Text
                    style={[
                      {fontWeight: 'bold', fontSize: 27, color: 'black'},
                      isdarkMode && Styles.makeContentWhite,
                    ]}>
                    182
                  </Text>
                  <Text
                    style={[
                      {color: 'black'},
                      isdarkMode && Styles.makeContentLightGrey,
                    ]}>
                    Following
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                Styles.tabNav,
                isdarkMode && Styles.makeContianerLightBlack,
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  Styles.post,
                  activeScreen === 'POST' && Styles.ActiveTab,
                ]}
                onPress={() => setActiveScreen('POST')}>
                <Text
                  style={[
                    isdarkMode ? Styles.makeContentDullGrey : Styles.tabNavText,
                    activeScreen === 'POST' && isdarkMode
                      ? Styles.makeContentWhite
                      : Styles.activeTavNavText,
                    activeScreen === 'POST' &&
                      !isdarkMode &&
                      Styles.makeContentBlack,
                  ]}>
                  Post
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  Styles.saved,
                  activeScreen === 'SAVED' && Styles.ActiveTab,
                ]}
                onPress={() => setActiveScreen('SAVED')}>
                <Text
                  style={[
                    isdarkMode ? Styles.makeContentDullGrey : Styles.tabNavText,
                    activeScreen === 'SAVED' && isdarkMode
                      ? Styles.makeContentWhite
                      : Styles.activeTavNavText,
                    activeScreen === 'SAVED' &&
                      !isdarkMode &&
                      Styles.makeContentBlack,
                  ]}>
                  Saved
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  postImage: {
    width: wp('32%'),
    height: hp('15%'),
  },
  avatarContainer: {
    borderWidth: 4,
    borderColor: '#FC0B7B',
    borderRadius: 60,
  },
  tabNavText: {
    fontWeight: 'bold',
    color: '#B5B5B5',
    fontSize: 18,
  },
  activeTavNavText: {
    color: '#B5B5B5',
  },
  post: {
    width: wp('30%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saved: {
    width: wp('30%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActiveTab: {
    borderBottomColor: '#00CC83',
    borderBottomWidth: 3,
  },
  tabNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    height: hp('5%'),
  },
  topContainer: {
    width: wp('100%'),
    height: hp('30%'),
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  topContainerStat: {
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'space-evenly',
  },
  makeContianerDarkGrey: {
    backgroundColor: '#252735',
  },
  makeContentWhite: {
    color: 'white',
  },
  makeContentBlack: {
    color: 'black',
  },
  makeContentLightGrey: {
    color: '#A3A3A3',
  },
  makeContianerLightBlack: {
    backgroundColor: '#181818',
  },
  makeContentDullGrey: {
    color: '#B5B5B5',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const mapDispatchToProps = {
  signOut: signOut,
};

const mapStateToProps = state => {
  const {auth, post, darkMode} = state;
  return {
    user: auth.user,
    post: post.posts,
    isdarkMode: darkMode.IsdarkMode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
