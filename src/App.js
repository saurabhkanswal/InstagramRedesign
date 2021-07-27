import React, {useEffect} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
// import store from './store'

import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {connect, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';

// Screens
import SignIn from './screens/Signin';
import SignUp from './screens/Signup';
import Home from './screens/Home';
import Like from './screens/Like';
import Profile from './screens/Profile';
import Reels from './screens/Reels';
import Post from './screens/AddPost';
import AddPostDetails from './screens/AddPostDetails';
import Comment from './screens/comment';
import Chat from './screens/Chat';

import {IS_AUTHENTICATED, SET_USER} from './action/action.types';

import database from '@react-native-firebase/database';
import EmptyContainer from './components/EmptyContainer';
import {InstaCircleIcon} from './img/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Messages from './screens/Messages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Addpost() {
  return (
    <Stack.Navigator
    // screenOptions={{
    // headerShown: false}}
    >
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false,
          title: 'New Post',
        }}
      />
      <Stack.Screen
        name="AddPostDetails"
        component={AddPostDetails}
        options={{
          title: 'New Post',
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStackNavigatars() {
  return (
    <Stack.Navigator
    // screenOptions={{
    // headerShown: false}}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,

          // title: 'New Post',
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Messages',
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'chat',
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FF1493',
        inactiveTintColor: 'gray',
        style: {
          height: 70,
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigatars}
        options={route => ({
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="home" size={30} color={color} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="videocamera" size={30} color={color} />
            </View>
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Addpost"
        component={Addpost}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <TouchableOpacity
              style={{top: -30, backgroundColor: 'red', borderRadius: 50}}>
              <Image source={InstaCircleIcon} style={{width: 87, height: 87}} />
            </TouchableOpacity>
          ),

          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Like"
        component={Like}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="hearto" size={30} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="user" size={30} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = ({authState, isdarkMode}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', snapshot => {
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.loading) {
    return <EmptyContainer />;
  }

  return (
    <>
      <NavigationContainer>
        {authState.isAuthenticated ? (
          <Stack.Navigator
          // screenOptions={{
          // headerShown: false}}
          >
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{
                headerShown: false,
                title: 'Home',
              }}
            />
            <Stack.Screen
              name="Comment"
              component={Comment}
              options={{
                title: 'Comment',
                headerStyle: {
                  backgroundColor: isdarkMode ? 'black' : 'white',
                },
                headerTitleStyle: {
                  color: isdarkMode ? 'white' : 'black',
                },
                headerTintColor: isdarkMode ? 'white' : 'black',
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.auth,
    isdarkMode: state.darkMode.IsdarkMode,
  };
};

export default connect(mapStateToProps)(App);
