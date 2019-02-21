import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}

export default class Hswiper extends Component {
  render () {
    return (
      <View style={styles.container}>
         <Swiper style={styles.wrapper} height={240} autoplay={true} autoplayTimeout={2.5}
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={styles.slide} t>
            <Image resizeMode='stretch' style={styles.image} source={require('../assets/b1.jpg')} />
          </View>
          <View style={styles.slide} >
            <Image resizeMode='stretch' style={styles.image} source={require('../assets/b2.jpg')} />
          </View>
          <View style={styles.slide} >
            <Image resizeMode='stretch' style={styles.image} source={require('../assets/b3.jpg')} />
          </View>
          <View style={styles.slide} >
            <Image resizeMode='stretch' style={styles.image} source={require('../assets/b4.jpg')} />
          </View>
        </Swiper>
      </View>
    )
  }
}