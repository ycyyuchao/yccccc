import React from 'react';
import {View}  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = props =>{
    return(
        <Icon
            name={props.iconName || 'circle'}
            size={18}
            style={{color:props.focused?'#8eb9f5':'#333'}}
        />
    )
}

export default TabIcon;
