import React from 'react';
import FitImage from 'react-native-fit-image';
import { Text, View, FlatList, Image, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { getData, getPage } from '../services/FlatListDataService';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Title, Footer, FooterTab, Badge } from 'native-base';
import Timeago from 'react-native-timeago';
let moment = require('moment');
require('moment/locale/zh-cn');
moment.locale('zh-cn');




const Item = (props) => {
    const { item, inedx } = props;
    return ( <
        Card style = {
            { flex: 0 } } >
        <
        CardItem >
        <
        Left >
        <
        Thumbnail source = {
            { uri: item.avatar } }
        /> <
        Body >
        <
        Text > { item.name } < /Text> <
        Text note >
        <
        Timeago time = { item.time }
        /> <
        /Text> <
        /Body> <
        /Left> <
        /CardItem> <
        FitImage source = {
            { uri: item.avatar } }
        originalWidth = { 400 }
        originalHeight = { 400 }
        style = { styles.fitImage }
        /> <
        CardItem >
        <
        Body > { /* <Image source={{uri:item.avatar }} style={{height: 200, width: Dimensions.get('screen').width, flex: 1}}/> */ } <
        Text numberOfLines = { 5 } > { item.text } <
        /Text> <
        /Body> <
        /CardItem> <
        CardItem >
        <
        Left >
        <
        Button transparent textStyle = {
            { color: '#87838B' } } >
        <
        Icon name = "logo-github" / >
        <
        Text > { item.num }
        stars < /Text> <
        /Button> <
        /Left> <
        /CardItem> <
        /Card>
    )
};

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FaltlistData: [],
            page: 1,
            loading: false,
            isLoadMore: false
        }
    }
    makeRemoteRequest = () => {
        this.setState({
                loading: true,
                isLoadMore: true
            })
            //console.log(this.state.page)
        getPage({ page: this.state.page }).then(res => {
            this.setState({
                FaltlistData: [...this.state.FaltlistData, ...res],
                loading: false,
                isLoadMore: false
            })
        })

    }
    componentDidMount() {
        this.makeRemoteRequest()
    }
    renderHeader = () => {
        return ( <
            View >
            <
            Text > Header < /Text> <
            /View>
        )
    }
    renderFooter = () => {
        if (this.state.loading) return null;
        return ( <
            View style = {
                {
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#ccc'
                }
            } >
            <
            ActivityIndicator animating size = 'small' > < /ActivityIndicator> <
            /View>
        )
    }
    loadMoreHandel = () => {
        this.setState(prevState => {
            return {
                page: prevState.page + 1
            }
        }, () => {
            this.makeRemoteRequest();
        })
    }
    render() {
        return ( <
            Container >
            <
            FlatList ListFooterComponent = { this.renderFooter }
            keyExtractor = {
                (item, index) => index.toString() }
            data = { this.state.FaltlistData }
            onEndReached = { this.loadMoreHandel }
            onEndReachedThreshold = { 0.01 }
            renderItem = {
                ({ item, index }) => {
                    return <Item item = { item }
                    index = { index }
                    />
                }
            }
            /> <
            /Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fitImage: {
        borderRadius: 20,
    },
    fitImageWithSize: {
        height: 100,
        width: 30,
    },
});