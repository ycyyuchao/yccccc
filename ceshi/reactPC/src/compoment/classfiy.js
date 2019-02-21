import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchList} from '../actions'
import {NavLink} from 'react-router-dom';
 class CLassify extends Component {
    componentDidMount(){
		this.props.fetchList()	
    }
    render() {
        const {productList} =this.props;
        var type = location.href.split('/').splice(-1, 1).join();
        const classiy = productList.map((list,index)=>{
            if(list.type==type){
                return(
                    <li className="p-r-10 m-b-10" data-type="list_108" key={index}>
                        <div className="card card-shadow">
                            <figure className="card-header cover">
                                <NavLink to={{pathname:'/details/'+list.id}}>
                                    <img className="cover-image lazy" src={list.url} style={{display: "inline"}}/>
                                </NavLink>
                            </figure>
                            <h4 className="card-title m-0 p-x-10 text-shadow-none font-szie-16 font-weight-300">
                                <a href="" title="实木餐桌" className="block text-truncate" target="_self">{list.title}</a>
                                <p className="m-b-0 m-t-5 red-600">￥{list.price}元</p>
                            </h4>
                        </div>
                    </li>
                )
            }
           
        })


        const all = productList.map((list,index)=>{
        if(type==0){

                return(
                    <li className="p-r-10 m-b-10" data-type="list_108" key={index}>
                        <div className="card card-shadow">
                            <figure className="card-header cover">
                                <NavLink to={{pathname:'/details/'+list.id}}>
                                    <img className="cover-image lazy" src={list.url} style={{display: "inline"}}/>
                                </NavLink>
                            </figure>
                            <h4 className="card-title m-0 p-x-10 text-shadow-none font-szie-16 font-weight-300">
                                <a href="" title="实木餐桌" className="block text-truncate" target="_self">{list.title}</a>
                                <p className="m-b-0 m-t-5 red-600">￥{list.price}元</p>
                            </h4>
                        </div>
                    </li>
                )}
            })       
        
        return ( 
            <div style={{marginTop:"60px"}}>  
                <div className="banner_met_11_1 page-bg"  m-id='97' m-type="banner">
                    <div className="slick-slide">
                        <img className="cover-image" src='../../static/image/1515750020.jpg' />
                        <div className="banner-text p-4">
                            <div className='container'>
                                <div className='banner-text-con'>
                                    <div>
                                        <h3 className="animation-fade font-weight-500" >产品展示</h3>
                                        <p className="animation-fade "></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
				<div className="product_list_met_16_1 met-index-body text-xs-center bgcolor" m-id='27'>
                    <div className="container">
                        <div className='nav-tabs-horizontal nav-tabs-inverse nav-tabs-animate' data-plugin="tabs">
							<ul className="nav nav-tabs nav-tabs-solid flex flex-center">
								<li className="nav-item" role="presentation" style={{width:'68px',height:"32px",textAlign:'center',lineHeight:'32px'}}>
									<NavLink to="/classify/0"  className="active " exact data-toggle="tab" aria-controls="all99" role="tab" aria-expanded="true">
										<h3 className='font-weight-300'>全部</h3>
									</NavLink>
								</li>
								<li className='nav-item'  role="presentation" style={{width:'68px',height:"32px",textAlign:'center',lineHeight:'32px'}}>
									<NavLink to="/classify/2" className='active' data-toggle="tab" aria-controls="all99" role="tab" aria-expanded="true">
										<h3 className='font-weight-300'>沙发</h3>
									</NavLink>
								</li>
								<li className='nav-item'  role="presentation" style={{width:'68px',height:"32px",textAlign:'center',lineHeight:'32px'}}  >
									<NavLink to="/classify/4" className='active' data-toggle="tab" aria-controls="all99" role="tab" aria-expanded="true">
										<h3 className='font-weight-300'>茶几</h3>
									</NavLink>
								</li>
								<li className='nav-item'  role="presentation"  style={{width:'68px',height:"32px",textAlign:'center',lineHeight:'32px'}}>
									<NavLink to="/classify/3"  className='active' data-toggle="tab" aria-controls="all99" role="tab" aria-expanded="true">
										<h3 className='font-weight-300'>座椅</h3>
									</NavLink>
								</li>
								<li className='nav-item'  role="presentation" style={{width:'68px',height:"32px",textAlign:'center',lineHeight:'32px'}} >
									<NavLink to="/classify/1" className='active' data-toggle="tab" aria-controls="all99" role="tab" aria-expanded="true">
										<h3 className='font-weight-300'>餐桌</h3>
									</NavLink>
								</li>
								<li className='nav-item'  role="presentation" style={{width:'68px',height:"32px",textAlign:'center',lineHeight:'32px'}}>
									<NavLink to="/classify/4" className='active' data-toggle="tab" aria-controls="all99" role="tab" aria-expanded="true">
										<h3 className='font-weight-300'>墙饰</h3>
									</NavLink>
								</li>
							</ul>
						</div>
                        <div className="tab-content">
							<ul className="blocks-xs-2 blocks-md-2 blocks-lg-4 blocks-xxl-4 no-space imagesize index-product-list tab-pane active animation-scale-up" id="all99" role="tabpanel" data-scale='300X300'>
                            {classiy}
                            {all}
							</ul>
						</div>
					</div>
				</div>
			</div>
        )
    }
}
    
const mapStateToProps = (state)=>{
    return {
        productList:state.product.productList
    }
  }



export default connect(mapStateToProps,{fetchList})(CLassify);




