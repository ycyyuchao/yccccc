import React,{Component} from 'react';
import {Cartcontent,Recommend} from '../compoment';


export default class Cart extends Component{
    render(){
        return(
            <div style={{marginTop:'60px'}}>
                <Cartcontent/>
                <Recommend/>
            </div>
        )
    }
}

