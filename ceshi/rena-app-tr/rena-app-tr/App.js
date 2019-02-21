import React from 'react';
import {StyleSheet, View,Platform,Dimensions}  from 'react-native';
import {Router,Stack,Scene, Tabs} from 'react-native-router-flux'
import {Text, Root,Container, Header, Content, Item, Input ,Icon,Button} from 'native-base';
import {Font,AppLoading} from 'expo';
import { Provider } from 'react-redux';
import configurestore from './store/index';
import {Cart,Details,FlatList,Home,My,Product,TabIcon} from './components/index'
import { black } from 'ansi-colors';


const store= configurestore().store;
const HomeNavBar = props=>{
  return(
      <View style={styles.headerbar}>
      <Header searchBar rounded style={{backgroundColor:'#333'}}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      </View>
  )
}
const RightButton = props=>{
  return(
    <View>
    <Text onPress={()=>props._increase()}>Right</Text>
    </View>
  )
}


export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      loading:true
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('./Fonts/Roboto.ttf'),
      'Roboto_medium': require('./Fonts/Roboto_medium.ttf'),
    });
    this.setState({
      loading:false
    })
  }
  render() {
    if(this.state.loading){
      return (
        <Root>
          <AppLoading/>
        </Root>
      )
    }
    return (
      <Provider store={store}>
        <Router>
          <Tabs key='tabber' >
            <Stack key="root"  title='首页' icon={TabIcon} iconName='home' >
              <Scene 
                key="home" 
                component={Home} 
                title="Home" 
                titleStyle={{textAlign:"center",color:'pink'}}
                navBar={HomeNavBar}
                initial/> 
              {/* <Scene 
                key="Details" 
                component={Details} 
                title="Details"/>
              <Scene 
                key="FlatList" 
                component={FlatList} 
                title="FlatList"/> */}
            </Stack>
            <Stack key="products" title='产品' icon={TabIcon}  iconName='list' >
              <Scene 
                key="product" 
                component={Product} 
                title="Product"
                /> 
            </Stack>
            <Stack key="carts" title='购物车' icon={TabIcon}  iconName='shopping-cart' >
              <Scene 
                key="cart" 
                component={Cart} 
                title="Cart" 
              /> 
            </Stack>
            <Stack key="mys" title='我的' icon={TabIcon} iconName='user'>
              <Scene 
                key="my" 
                component={My} 
                title="My"
              /> 
            </Stack>
          </Tabs>
        </Router>
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   headerbar: {
    ...Platform.select({
      ios: {
        paddingTop:0,
      },
      android: {
        paddingTop:20,
        backgroundColor:'#aaa'
        
      },
    }),
  },
});
