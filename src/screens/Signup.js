import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {signUp} from '../action/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Signup = ({navigation, signUp}) => {
  useEffect(() => {
    lor();
    return () => {
      rol();
    };
  }, []);

  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState('https://i.pravatar.cc/150');

  const submitSignup = async () => {
    // console.log('Signupsubm', password)
    signUp({email, fullName, password, image});
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerTop: {
      height: hp('94%'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    containerBottom: {
      height: hp('6%'),
      borderTopWidth: 1,
      borderColor: 'rgba(219,219,219,1)',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: wp('38%'),
      height: hp('18%'),
      borderWidth: 7,
      borderRadius: 140,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    textInput: {
      borderWidth: 1,
      width: wp('85%'),
      height: hp('5.5%'),
      borderColor: 'rgba(219,219,219,1)',
      borderRadius: 5,
      padding: 8,
      backgroundColor: 'rgba(250,250,250,1)',
      marginBottom: 8,
    },
    button: {
      width: wp('85%'),
      height: hp('6.3%'),
      backgroundColor: '#2196F3',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    forgotPassword: {
      display: 'flex',
      flexDirection: 'row',
    },
    forgotPasswordText1: {
      color: 'grey',
      fontSize: 12.5,
    },
    forgotPasswordText2: {
      color: '#00008B',
      fontSize: 12,
      fontWeight: '700',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.logo}>
          <Icon name="user" size={110} color="#000000" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#A9A9AC"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#A9A9AC"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#A9A9AC"
        />
        <TouchableOpacity style={styles.button} onPress={submitSignup}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.forgotPasswordText1}>
          Already have an account?{' '}
        </Text>
        <Text
          style={styles.forgotPasswordText2}
          onPress={() => navigation.goBack()}>
          Log in.
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

export default connect(null, mapDispatchToProps)(Signup);
