import React,{Component} from 'react';
import {connect} from 'react-redux'
import {getListData,fetchList,addToCartFunc,addToCart} from '../actions'
class DetailsContent extends Component{

    constructor(){
        super();
        this.state={
          num:1
        }        
    }
    Increase=()=>{
        if(this.state.num<999){
            this.setState({
                num: +this.state.num + 1
            })
        }else{
            this.setState({
                num: 999
            })
        }
         
    }
    Decrease=()=>{
        if(this.state.num>1){
            this.setState({
                num: +this.state.num - 1
            })
        }else{
            this.setState({
                num: 1
            })
        }
        
    } 
    handelchange=(e)=>{
        this.setState({
            num: e.target.value 
        })
    }
    addCart(e){
        const idx = e.currentTarget.getAttribute('data-idx');
        const quantity = this.state.num;
        const addToCartProduct =this.props.productList[idx-1];
        addToCartProduct.quantity=quantity;
        this.props.addToCart(addToCartProduct);
        console.log(idx)
        console.log(quantity)
    }
    componentDidMount(){
		this.props.fetchList()
    }
    render(){
        const  {productList}=this.props;
        var Id = location.href.split('/').splice(-1,1).join();
        const Listarr = productList.map((list,index)=>{
            if(list.id == Id){
                return (<div key={index}>
                    <div className="banner_met_11_1 page-bg"  m-id='97' m-type="banner">
                    <div className="slick-slide">
                        <img className="cover-image" src={list.detailurl} />
                        <div className="banner-text p-4">
                            <div className='container'>
                                <div className='banner-text-con'>
                                    <div>
                                        <h3 className="animation-fade font-weight-500" >{list.detailtitle}</h3>
                                        <p className="animation-fade "></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <main className="shopproduct_list_detail_met_16_1 page met-showproduct pagetype1" m-id="114">
                    <div className="met-showproduct-head page-content block-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="met-showproduct-list fngallery cover text-xs-center" id="met-imgs-slick" m-id="noset" m-type="displayimgs">
                                        <div className="slick-slide">
                                            <a href={list.url} data-size="533x300" data-med="https://images.metinfo.cn/m/mui003/305/upload/mui003/305/201801/1515751437.jpg" data-med-size="533x300" className="lg-item-box">
                                                <img src={list.url}  className="img-fluid" alt="实木餐桌" style={{width:'400px'}}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="product-intro">
                                        <h1 className="m-t-0 font-size-24">{list.title}</h1>
                                        <p className="description">{list.content}</p>
                                        <div className="shop-product-intro grey-500">
                                            <div className="p-20 bg-grey-100 red-600 price">
                                                <span className="font-size-18">￥</span> 
                                                <span id="price" className="font-size-30">{list.price}</span>
                                            </div>
                                            <div className="shop-product-para">
                                                <div className="row m-t-15">
                                                    <label className="form-control-label col-sm-2">颜色</label>
                                                    <div className="selectpara-list col-sm-10">
                                                        <a href="javascript:;" title="白色" data-id="6" className="selectpara text-truncate btn btn-squared btn-outline btn-default m-r-10 btn-danger">白色</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row m-t-15">
                                                <label className="form-control-label col-sm-2">数量</label>
                                                    <div className="col-sm-10">
                                                            <div className="w-150 inline-block m-r-10">
                                                            <div className="input-group bootstrap-touchspin">
                                                            <span className="input-group-btn">
                                                                <button className="btn btn-default bootstrap-touchspin-down" type="button" onClick={this.Decrease} >-</button>
                                                            </span>
                                                            <span className="input-group-addon bootstrap-touchspin-prefix" style={{display: "none"}}></span>
                                                            <input type="text" className="form-control text-xs-center" data-min="1" data-max="198" data-plugin="touchSpin" name="buynum" id="buynum" autoComplete="off" value={this.state.num} onChange={this.handelchange} style={{display: "block"}}/>
                                                            <span className="input-group-addon bootstrap-touchspin-postfix" style={{display: "none"}}></span>
                                                            <span className="input-group-btn">
                                                                <button className="btn btn-default bootstrap-touchspin-up" type="button" onClick={this.Increase}>+</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="m-t-20 clearfix cart-favorite">
                                                <a href="https://show.metinfo.cn/m/mui003/305/member/login.php?lang=cn" data-pid="24" className="btn btn-squared btn-lg btn-warning pull-sm-right product-favorite">
                                                    <i className="icon fa-heart-o m-r-5"></i>
                                                    <span>加入收藏</span>
                                                </a>
                                                <a href="javascript:;" className="btn btn-lg btn-squared btn-danger m-r-20 product-tocart" data-idx={list.id} onClick={(e) => this.addCart(e)}>
                                                    <i className="icon fa-cart-plus m-r-5 font-size-20" aria-hidden="true"></i>
                                                    加入购物车
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>)
            }
           
        }) 
        return(
            <div style={{marginTop:"60px"}}>
                {Listarr}
            </div>
        )
    }
}



const mapStateToProps = (state)=>{
    return {
        productList:state.product.productList
    }
  }



export default connect(mapStateToProps,{fetchList,getListData,addToCartFunc,addToCart})(DetailsContent);