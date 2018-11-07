import React,{Component} from 'react';


export default class Recommend extends Component{
    render(){
        return(
            <div >
            <div className="page bg-pagebg1">
            <div className="container">
            <div className="page-content row shop-cart">
                <div className="m-t-50 text-xs-center moregoods">
                    <h2 className="font-size-24 blue-grey-400 text-shadow-none">购买该商品的用户还购买了</h2>
                        <ul className="blocks-2 blocks-md-2 blocks-lg-4 blocks-xxl-4 m-0 m-t-30 imagesize masonry moregoods-list" data-scale="400x600" style={{position: "relative", height: "322.75px"}}>
                            <li className="masonry-child" style={{position: "absolute",left: "0px", top: "0px"}}>
                                <div className="card card-shadow radius0 animation-fade appear-no-repeat" data-plugin="appear" data-animate="fade" data-repeat="false">
                                    <figure className="card-header cover radius0">
                                        <a href="#/details/4" title="精美墙饰" target="_blank">
                                            <img className="cover-image" src="../../static/image/1515752162.jpg" style={{display: "inline"}} alt="精美墙饰" data-lazyload="true" />
                                        </a>
                                    </figure>
                                    <h4 className="card-title m-0 text-shadow-none font-size-16 font-weight-300">
                                        <a href="" title="精美墙饰" target="_blank">精美墙饰</a>
                                        <p className="red-600 m-b-0 m-t-5 font-size-14">￥270.00元</p>
                                    </h4>
                                 </div>
                            </li>
                        <li className="masonry-child" style={{position:" absolute" ,left: "375px", top: "0px"}}>
                            <div className="card card-shadow radius0 animation-fade appear-no-repeat" data-plugin="appear" data-animate="fade" data-repeat="false">
                                <figure className="card-header cover radius0">
                                    <a href="#/details/7" title="简约壁纸" target="_blank">
                                        <img className="cover-image" src="../../static/image/1515751715.jpg"/>
                                    </a>
                                </figure>
                                <h4 className="card-title m-0 text-shadow-none font-size-16 font-weight-300">
                                    <a href="https://show.metinfo.cn/m/mui003/305/product/showproduct.php?id=27" title="简约壁纸" target="_blank">简约壁纸</a>
                                    <p className="red-600 m-b-0 m-t-5 font-size-14">￥50.00元</p>
                                </h4>
                            </div>
                        </li>
                    </ul>
                 </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}