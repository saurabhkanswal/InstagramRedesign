import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Get_Contacts} from '../action/Contacts';
import {connect} from 'react-redux';
import Avatar from '../components/Avatar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Messages = ({Get_Contacts, contacts, loading, navigation}) => {
  useEffect(() => {
    Get_Contacts();
  }, []);

  // const [selectedAvatarUri, setSelectedAvatarUri] = useState('')

  const openChat = ({uri, name}) => {
    navigation.navigate('Chat', {
      avatarUri: uri,
      name,
    });
  };

  const renderContacts = ({item}) => (
    <Pressable
      style={styles.userRow}
      onPress={() => openChat({uri: item.userAvatar, name: item.useName})}>
      <View style={styles.avatarContainer}>
        <Avatar avatarUri={item.userAvatar} AvatarSize="S" border={true} />
      </View>
      <Text style={{fontSize: 15, color: 'black'}}>{item.useName}</Text>
    </Pressable>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContacts}
        keyExtractor={item => item.uid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userRow: {
    height: hp('8%'),
    width: wp('100%'),
    // backgroundColor: 'black',
    marginTop: 6,
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 4,
    marginRight: 4,
  },
});

const mapDispatchToProps = {
  Get_Contacts,
};

const mapStateToProps = state => {
  const {contacts} = state;
  return {
    contacts: contacts.contacts,
    loading: contacts.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
