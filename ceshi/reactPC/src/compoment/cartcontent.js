import React,{Component} from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router ,Route,Switch,NavLink} from 'react-router-dom';
import {cartnumchange,cartnumin,cartnumde} from '../actions';
import {Prompt} from 'react-router-dom';


import _  from 'lodash';

class CartContent extends Component{     
    caulate(){

    }
    changeNum(e,obj){
        this.props.cartnumchange(obj,e);
        
        this.forceUpdate()
    }
    render(){
        
        const  {carts,cartnumchange,cartnumin,cartnumde}=this.props;
        var cartsList = _.uniqWith(carts, _.isEqual)
        var cartarr = []
        var totalprice=0;
        for(let i=0;i<cartsList.length;i++){
            totalprice+=cartsList[i].price*cartsList[i].quantity
            cartarr.push(
                <tr className="text-xs-center" key={i}>
                    <td>
                        <div className="checkbox-custom checkbox-danger m-y-0 inline-block vertical-align-middle">
                            
                        </div>
                    </td>
                    <td className="text-xs-left">
                        <div className="media">
                            <div className="media-left">
                                <NavLink className="avatar text-middle" target="_blank" to={{pathname:'/details/'+cartsList[i].id}}>
                                    <img className="img-responsive" src={cartsList[i].url} alt=""/>
                                </NavLink>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">
                                    <a target="_blank" href="">{cartsList[i].title}</a>
                                </h4>
                                <p className="m-b-0">颜色-白色 </p>
                            </div>
                        </div>
                    </td>
                    <td>{cartsList[i].price}</td>
                    <td>
                        <div className="buynum">
                            <div className="input-group bootstrap-touchspin input-group-sm">
                              { /*  <span className="input-group-btn">  
                                    <button className="btn btn-default bootstrap-touchspin-down" type="button" onClick={()=>cartnumde(cartsList[i])}>-</button>
                                </span> */}
                                <span className="input-group-addon bootstrap-touchspin-prefix" style={{display: "none"}}></span>
                                <input type="number" id='input' className="form-control input-sm text-xs-center buynum-input" value={cartsList[i].quantity} onChange={(e)=>{this.changeNum(e.target.value,cartsList[i])}} style={{display: "block"}}/>
                                <span className="input-group-addon bootstrap-touchspin-postfix" style={{display: "none"}}></span>
                               { /* <span className="input-group-btn">
                                    <button className="btn btn-default bootstrap-touchspin-up" type="button" onClick={()=>cartnumin(cartsList[i])}>+</button>
                                </span> */}
                            </div>
                        </div>
                    </td>
                    <td>
                        <span className="red-600 subtotal" data-id="4" style={{width:'100px',textAlign:'center',display:'inline-block'}}>￥{cartsList[i].price * cartsList[i].quantity}元</span>
                    </td>
                    <td>
                        <a href="" className="cart-remove">
                            <i className="icon wb-trash" ></i>
                        </a>
                    </td>
                </tr>
             )
        } 
        return(
            <div>
                <div className="banner_met_11_1 page-bg" m-id="97" m-type="banner" s>
                    <div className="slick-slide" style={{margin:0}}>
                    <img className="cover-image" src="../../static/image/1515747675.jpg" style={{height: "auto"}}/>
                        <div className="banner-text p-4">
                            <div className="container">
                                <div className="banner-text-con">
                                    <div>
                                        <h3 className="animation-fade font-weight-500" style={{color:"#ffffff"}}>高端家居 窥见时尚</h3>
                                        <p className="animation-fade " style={{color:"#ffffff"}}>华丽却不失温馨，简单却不繁琐。</p>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page bg-pagebg1"  >
                <div className="container">
                <div className="page-content row shop-cart">
                <div data-plugin="selectable" data-selectable="selectable">
				    <div className="panel cart-body">
					    <div className="panel-body" >
                            <div className="cart-list animation-fade" data-scale="400x600">
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-xs-center w-100">
                                                    <div className="checkbox-custom checkbox-danger">
                                                    
                                                    </div>
                                                </th>
                                                <th className="w-300">商品</th>
                                                <th className="text-xs-center">单价</th>
                                                <th className="text-xs-center w-150">数量</th>
                                                <th className="text-xs-center">小计</th>
                                                <th className="text-xs-center w-100">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartarr}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
						</div>
					</div>
				    <div className="panel cart-total p-0 animation-fade">
					    <div className="panel-body">
						    <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 cart-all text-md-center">
                                    <div className="checkbox-custom checkbox-danger w-100 cartall">
                                        <input type="checkbox" className="selectable-all" id="cartall" defaultChecked="true"/>
                                        <label htmlFor="cartall">全选</label>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 text-xs-right" style={{lineHeight:"2"}}>
                                    <span className="hidden-sm-down">共 <span className="cart-goodnum">{cartarr.length}</span> 件商品， </span>
                                    合计 :
                                    <span className="total-val red-600"><span className="font-size-16">￥</span>{totalprice}</span>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 text-xs-right">
                                    {/* <Prompt message='你确定结算吗？'></Prompt> */}
                                    <a href='#/order' className="btn btn-lg btn-squared btn-danger white p-x-30 cart-tocheck">去结算</a>
                                </div>
						    </div>
					    </div>
                    </div> 
                </div>
                </div>
                </div>
                </div>   
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        carts:state.cart
    }
  }
export default connect(mapStateToProps,{cartnumchange,cartnumin,cartnumde})(CartContent)