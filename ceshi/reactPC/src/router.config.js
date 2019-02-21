import React ,{Component} from "react";
import {Redirect} from 'react-router-dom'
import {Home,Base,Blocking,Miss,QueryParams,Recursive} from './compoment'


module.exports=[
    {
        path:'/',
        component:Home,
        exact:true
    },
    {
        path:'/bace-routing',
        component:Base,
    },
    {
        path:'/blocking',
        component:Blocking,
    },
    {
        path:'/miss',
        component:Miss,
    },
    {
        path:'/query',
        component:QueryParams,
    },
    {
        path:'/recur',
        component:Recursive,
    }
]