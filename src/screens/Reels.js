import React, {useRef, useState} from 'react'
import {StyleSheet, Text, View, Dimensions} from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Avatar from '../components/Avatar'
import { connect } from 'react-redux'

const data = [
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/firebase%202.mp4?alt=media&token=2e47fe21-924d-4161-9fa1-4593ed07fa6d',
    title: 'Big Buck Bunny',
    poster: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/firebase%203.mp4?alt=media&token=fe92d285-7629-485d-8022-8c1a8f7253bb',
    title: 'Elephant Dream',
    poster: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=358&q=80'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/firebase%2043.mp4?alt=media&token=3598c14d-b247-4b22-86d9-063ca8d10a3f',
    title: 'For Bigger Blazes',
    poster: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/firebase%205.mp4?alt=media&token=f52e8705-08c0-4ffd-9245-cdf54ccf3335',
    title: 'For Bigger Escape',
    poster: 'https://images.unsplash.com/photo-1508669232496-137b159c1cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/instagramredesign-c4bd6.appspot.com/o/firebase%201.mp4?alt=media&token=6c089668-67f8-4d06-b63f-fcbd3165c4d2',
    title: 'For Bigger Fun',
    poster: 'https://images.unsplash.com/photo-1483086431886-3590a88317fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
];

const Reels = ({user}) => {
  const videoRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const onBuffer= (e) => {
    console.log('buffering..', e)
  }
  const onError = (e) => {
    console.log('Error', e)
  }

  const onChangeIndex = ({index, prevIndex})=> {
    setCurrentIndex(index)
  }

  return(
    <View style={styles.container}>
    <SwiperFlatList
      vertical={true}
      data={data}
      index={currentIndex}
      onChangeIndex={onChangeIndex}
      renderAll={false}
      renderItem={({ item, index }) => (
        <View style={{flex: 1, backgroundColor: 'red'}}>
        <Video 
          source={{uri: item.src}}   
          ref={videoRef}                                      
          onBuffer={onBuffer}                
          onError={onError}      
          resizeMode='cover' 
          repeat
          paused={currentIndex !== index}
          poster={item.poster} 
          posterResizeMode='cover'     
          style={styles.backgroundVideo} 
        />
        <View style={{position: 'absolute',  bottom: 70, left: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar />
            <Text style={{paddingLeft: 7, fontSize: 18, color:'white', fontWeight: 'bold'}}>{user.fullName}</Text>
          </View>
          <Text style={{paddingLeft: 7, fontSize: 15, color:'white'}}>In nature, nothing is perfect and everything is perfect 🌲</Text>
        </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    <View style={{position: 'absolute',  padding: 18,}}>
      <Text style={{fontSize: 28, color: 'white', fontWeight: '600', paddingLeft: 7}}>Reels</Text>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'black', 
    position: 'relative'
  },
  child: { 
    flex: 1
    },
  backgroundVideo: {
    width: wp('100%'),
    height: hp('100%'),
    position: 'relative'
  },
});


const mapStateToProps = (state)=> {
  const { auth } = state
  return {
    user: auth.user
  }
}

export default connect(mapStateToProps, null)(Reels)