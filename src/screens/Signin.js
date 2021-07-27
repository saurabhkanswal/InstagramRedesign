import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {signIn} from '../action/auth';
import {InstaWrittenIcon} from '../img/index';

const Signin = ({navigation, signIn}) => {
  useEffect(() => {
    lor();
    return () => {
      rol();
    };
  }, []);

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
      width: wp('51%'),
      height: hp('9%'),
      marginBottom: 10,
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
      color: 'black',
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    signIn({email, password});
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.logo} source={InstaWrittenIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Phone number, email or username"
          placeholderTextColor="#A9A9AC"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#A9A9AC"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={submitLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText1}>
            Forgot your login details?{' '}
          </Text>
          <Text style={styles.forgotPasswordText2}>Get help logging in.</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.forgotPasswordText1}>Don't have an account? </Text>
        <Text
          style={styles.forgotPasswordText2}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up.
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  signIn: data => signIn(data),
};

export default connect(null, mapDispatchToProps)(Signin);
