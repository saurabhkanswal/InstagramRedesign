import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import database from '@react-native-firebase/database';
import {useDispatch, connect} from 'react-redux';
import {SET_ACTIVITY} from '../action/action.types';
import Avatar from '../components/Avatar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _ from 'lodash';

const Like = ({activityList, isDarkMode}) => {
  const dispatch = useDispatch();
  const onSomeActivity = () => {
    try {
      database()
        .ref(`/activity`)
        .on('value', snapshot => {
          // console.log('=>>>>>', snapshot.val());
          if (snapshot.val()) {
            dispatch({
              type: SET_ACTIVITY,
              payload: Object.values(snapshot.val()),
            });
          } else {
            dispatch({
              type: SET_ACTIVITY,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderList = Item => {
    let item = Item.item;
    return (
      <View style={Styles.activityListContainer}>
        <View style={Styles.Avatar}>
          <Avatar avatarUri={item.postByImage} AvatarSize="S" />
        </View>
        <View style={Styles.Text}>
          <Text
            style={[
              Styles.activityText,
              Styles.makeContentBold,
              isDarkMode && Styles.makeContentGreen,
            ]}>
            {item.postLikedBy}
          </Text>
          <Text
            style={[
              Styles.activityText,
              isDarkMode && Styles.makeContentWhite,
            ]}>
            {' '}
            like 💞{' '}
          </Text>
          <Text
            style={[
              Styles.activityText,
              Styles.makeContentBold,
              isDarkMode && Styles.makeContentGreen,
            ]}>
            querty{' '}
          </Text>
          <Text style={[Styles.activityText, Styles.makeContentWhite]}>
            Pic. 📷
          </Text>
        </View>
        <View style={Styles.PostImage}>
          <Image
            source={{
              uri: item.postImageUri,
            }}
            style={{width: 50, height: 50}}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    const subscriber = onSomeActivity();
    return subscriber;
  }, []);

  if (activityList === null) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#00CC83" />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <Text style={[Styles.Header, isDarkMode && Styles.makeContentWhite]}>
          Activity
        </Text>
      }
      data={activityList}
      renderItem={renderList}
      keyExtractor={item => item.activityId}
      style={[Styles.Container, isDarkMode && Styles.makeContainerBlack]}
    />
  );
};

const Styles = StyleSheet.create({
  Container: {
    padding: 10,
  },
  Header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  activityListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
  },
  activityText: {
    fontSize: 20,
    paddingLeft: 2,
  },
  makeContentBold: {
    fontWeight: 'bold',
  },
  Avatar: {
    width: wp('12%'),
    borderWidth: 3,
    borderColor: '#FC0B7B',
    borderRadius: 30,
    // backgroundColor: 'red',
  },
  Text: {
    width: wp('70%'),
    padding: 5,
    flexDirection: 'row',
    // backgroundColor: 'pink',
  },
  PostImage: {
    width: wp('18%'),
    // backgroundColor: 'green',
  },
  makeContainerBlack: {
    backgroundColor: 'black',
  },
  makeContentWhite: {
    color: 'white',
  },
  makeContentGreen: {
    color: '#00CC83',
  },
});

const mapStateToProps = state => {
  console.log('pop', state);
  const {activityList, darkMode} = state;
  return {
    activityList: activityList.ActivityList,
    isDarkMode: darkMode.IsdarkMode,
  };
};

export default connect(mapStateToProps)(Like);
