import React,{Component} from 'react';
export default class Heard extends React.Component{
    render(){
        return(
            <div>
                <header className='met-head navbar-fixed-top' m-id='96' m-type='head_nav' data-downbannercolor="#ffffff">
                <nav className="navbar navbar-default box-shadow-none head_nav_met_16_1">
                    <div className="container">
                        <div className="row">
                            <h1 hidden>家具公司响应式模板</h1>
                            <div className="navbar-header pull-xs-left">
                                <a href="" className="met-logo vertical-align block pull-xs-left p-y-5" title="家具公司响应式模板">
                                    <div className="vertical-align-middle">
                                        <img src="../../static/image/logo.png" alt="家具公司响应式模板"/>
                                    </div>
                                </a>
                            </div>                                                                                                  
                            <button type="button" className="navbar-toggler hamburger hamburger-close collapsed p-x-5 head_nav_met_16_1-toggler" data-target="#head_nav_met_16_1-collapse" data-toggle="collapse">
                                <span className="sr-only"></span>
                                <span className="hamburger-bar"></span>
                            </button>
                            <div className="collapse navbar-collapse navbar-collapse-toolbar pull-md-right p-0" id="head_nav_met_16_1-collapse">
                                <ul className="nav navbar-nav navlist">
                                    <li className='nav-item'>
                                        <a href="#/" title="网站首页" className="nav-link">网站首页</a>
                                    </li>
                                    <li className="nav-item dropdown m-l-0">
                                        <a href="" target='_self' className="nav-link dropdown-toggle " data-toggle="dropdown" data-hover="dropdown"> 家居产品</a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-bullet two-menu">
                                            <a href="" target='_self' title="全部" className='dropdown-item nav-parent hidden-lg-up'>全部</a>
                                            <a href="" target='_self' title="沙发" className='dropdown-item hassub '>沙发</a>
                                            <a href="" target='_self' title="茶几" className='dropdown-item hassub '>茶几</a>
                                            <a href="" target='_self' title="座椅" className='dropdown-item hassub '>座椅</a>
                                            <a href="" target='_self' title="餐桌" className='dropdown-item hassub '>餐桌</a>
                                            <a href="" target='_self' title="墙饰" className='dropdown-item hassub '>墙饰</a>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown m-l-0">
                                        <a href="" target='_self' className="nav-link dropdown-toggle " data-toggle="dropdown" data-hover="dropdown">家具知识</a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-bullet two-menu">
                                            <a href="" target='_self' title="全部" className='dropdown-item nav-parent hidden-lg-up'>全部</a>
                                            <a href="" target='_self' title="行业资讯" className='dropdown-item hassub '>行业资讯</a>
                                            <a href="" target='_self' title="小知识" className='dropdown-item hassub '>小知识</a>
                                    </div>
                                    </li>
                                    <li className='nav-item m-l-0'>
                                        <a href="" target='_self' title="品牌故事" className="nav-link ">品牌故事</a>
                                    </li>
                                     <li className='nav-item m-l-0'>
                                        <a href="#/cart" target='_self' title="品牌故事" className="nav-link ">购物车</a>
                                    </li>
                                    <li className='nav-item m-l-0'>
                                        <a href="" target='_self' title="客户晒图" className="nav-link ">客户晒图</a>
                                    </li>
                                    <li className="nav-item dropdown m-l-0">
                                        <a href=""  target='_self' title="招商加盟" className="nav-link dropdown-toggle " data-toggle="dropdown" data-hover="dropdown">招商加盟</a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-bullet two-menu">
                                            <a href="" target='_self' title="在线留言" className='dropdown-item hassub '>在线留言</a>
                                            <a href="" target='_self' title="在线反馈" className='dropdown-item hassub '>在线反馈</a>
                                            <a href="" target='_self' title="联系我们" className='dropdown-item hassub '>联系我们</a>
                                        </div>
                                    </li>                                                                                                                            </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            </div>
        )
    }
}