import React,{Component} from 'react';
import {connect} from 'react-redux'
import {HashRouter as Router ,Route,Switch,NavLink} from 'react-router-dom';
import {Classify} from '../compoment/'
import {getListData,fetchList} from '../actions'
class ProDisplay extends Component{

	componentDidMount(){
		this.props.fetchList()
		
    }	
    render(){
		/* console.log(this.props) */
		const {productList} =this.props;
		const Listarr = productList.map((list,index)=>{
                return (
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
				</li>)
		}) 
		
        return(
			<div>  
				<div className="product_list_met_16_1 met-index-body text-xs-center bgcolor" m-id='27'>
					<div className="container">
						<h2 className="m-t-0 font-weight-300 animation-slide-top appear-no-repeat" data-plugin="appear" data-animate="slide-top" data-repeat="false">商品展示</h2>
						<p className="desc m-b-0 font-weight-300 animation-fade appear-no-repeat" data-plugin="appear" data-animate="fade" data-repeat="false" style={{paddingBottom:'30px'}}>我们为您提供的</p>
						<div className="tab-content">
							<ul className="blocks-xs-2 blocks-md-2 blocks-lg-4 blocks-xxl-4 no-space imagesize index-product-list tab-pane active animation-scale-up" id="all99" role="tabpanel" data-scale='300X300' name='all'>
								{Listarr}
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



export default connect(mapStateToProps,{fetchList,getListData})(ProDisplay);



/* constructor(props){
        super(props)
        this.state={
            Lists:[]
        }
    }
	componentDidMount () {
		var url = "http://localhost:3000/posts";
        fetch(url).then(res=>{
			return res.json()
		}).then(data=>
			this.setState({
				Lists : data
			})
		})
    } */