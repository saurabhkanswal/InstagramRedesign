import React, {useState} from 'react'
import {StyleSheet, Text, View, Image, TextInput, ActivityIndicator} from 'react-native'
import {connect, useDispatch} from 'react-redux'
import {setPost} from '../action/post'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

const AddPostDetails = ({navigation, route, user, setPost, loading}) => {
  
  const {imageUri} = route.params
  const { fullName, uid, image} = user
  const [text, setText] = useState('');
  const dispatch = useDispatch()

  const submitPost = ()=> {
     
        setPost({
          imageUri,
          image,
          text,
          fullName,
          navigation
        })
   

  }

  React.useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: ()=> (
        <Icon name="check" size={30} color="blue" style={{paddingRight: 10, }} onPress={submitPost}/>
      )
    })
  }, [])

  

  return(
    <View style={styles.container}>
    <Image source={{uri: imageUri}} style={styles.image}/>
    <View style={styles.statusContainer}>
    {loading &&
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='red'/>
      </View>
    }
    <TextInput
        onChangeText={text => setText(text)}
        placeholder="Type status"
        placeholderTextColor='#A9A9AC'
        color='black'
      />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   alignItems: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  statusContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: wp('70%'),
    height: hp('6%'),
    padding: 5,
    marginTop: 25
  },
  image: {
    width: wp('70%'),
    height: hp('40%'),
    marginTop: 25
  }
})

const mapDispatchToProps = {
  setPost: (data)=> setPost(data)
}

const mapStateToProps = (state)=> {
  const {auth,post} = state
  return {
    user: auth.user,
    loading: post.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostDetails)