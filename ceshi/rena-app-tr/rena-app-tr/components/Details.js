import React from 'react';
import {View,Text}  from 'react-native';
import { Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
export default class Details extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        }
    }
    Increase=()=>{
        this.setState({
            count:this.state.count+1
        })
    }
    componentWillMount(){
         this.props.navigation.setParams({
            _increase:this.Increase
        }) 
    }
    render(){
        return(
            <View>
                {/* <Button primary onPress={()=>Actions.pop()}>
                    <Text> 返回前页</Text>
                </Button> */}
                <Text>Id:{this.props.id}</Text>
                <Text>Parmas:{this.props.params}</Text>
                <Button primary onPress={()=>Actions.FlatList()}>
                    <Text> FlatList</Text>
                </Button>
                <Text>Count:{this.state.count}</Text>
                <Button primary onPress={this.Increase}>
                    <Text>Increase</Text>
                </Button>
            </View>
        )
    }
}