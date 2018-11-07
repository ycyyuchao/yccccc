import React,{Component} from 'react';
export default class Ordernum extends Component{
    render(){
        return(
            <div style={{margin:"60px 0"}}>
            <div class="page bg-pagebg1">
	        <div class="container">
                <div className="page-content row">
                    <div className="panel m-b-0">
                        <div className="panel-body tocar-info">
                            <div className="hidden-md-up h-10"></div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="media">
                                   { /* <div className="media-left">
                                        <a href="../../static/image/1515750539.jpg" alt="白色沙发"></a>
                                        <img class="media-object" src="../../static/image/1515750539.jpg" alt="白色沙发" style={{width:"120px",height:'180px'}}></img>
                                    </div> */}
                                    <div className="media-body">
                                      { /*  <div className="hidden-md-up h-10"></div>
                                        <h4 className="media-heading font-size-16">
                                        <a href="javascript:;" >白色沙发</a> &nbsp; 颜色-白色  &nbsp; 数量：1 件</h4> */}
                                        <p className="font-size-20 green-800 m-b-0">付款成功！</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-md-right tocar-btn-body">
                                        <a className="btn btn-default btn-lg btn-squared m-r-20" href="#/">继续购物</a>
                                        <a className="btn btn-danger btn-lg btn-squared" href="#/orderpage">查看订单</a>
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