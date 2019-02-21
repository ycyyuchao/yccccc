import React from 'react';
import {View,Text}  from 'react-native';
import { Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Hswiper from'./Swiper';

export default class Home extends React.Component{
    render(){
        return(
            <View style={{height:200}}>
                <Hswiper/>
            </View>
        )
    }
}
