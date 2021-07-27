import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Avatar from '../components/Avatar';

export default function Chat({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <View
          style={{flexDirection: 'row', marginTop: 2, alignItems: 'center'}}>
          <Avatar
            avatarUri={route.params.avatarUri}
            AvatarSize="S"
            border={true}
          />
          <Text style={{fontWeight: 'bold', fontSize: 19, marginLeft: 4}}>
            {route.params.name}
          </Text>
        </View>
      ),
    });
  }, []);

  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
}
