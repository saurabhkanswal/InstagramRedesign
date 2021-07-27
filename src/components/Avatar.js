import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

const Avatar = props => {
  const {avatarUri, AvatarSize, border = false} = props;
  return (
    <Image
      source={{
        uri: avatarUri,
      }}
      style={[
        AvatarSize === 'S' ? styles.avatarSmall : styles.avatarMedium,
        border === true && styles.border,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  containerSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'red',
    width: wp('11%'),
    height: hp('5%'),
  },
  containerMedium: {
    padding: 8,
    borderRadius: 25,
    width: wp('12%'),
    height: hp('6%'),
  },
  avatarSmall: {
    width: wp('11%'),
    height: hp('5.5%'),
    borderRadius: 25,
  },
  avatarMedium: {
    width: wp('24%'),
    height: hp('12%'),
    borderRadius: 50,
  },
  border: {
    borderWidth: 3,
    borderColor: '#FC0B7B',
  },
});

export default Avatar;
