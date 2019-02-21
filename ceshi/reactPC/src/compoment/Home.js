import React,{Component} from 'react';

import {Banner,ProClassify,ProDisplay,FurKno} from '../compoment'
export default class Home extends Component{
    render(){
        return(
            <div>
                 <Banner/>
                 <ProClassify/>
                 <ProDisplay/>
                 <FurKno/>
            </div>
        )
    }
}