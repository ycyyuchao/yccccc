import React,  {Component}from 'react'; 
export default class Banner extends React.Component { 
    
    componentDidMount () {
        var swiper = new Swiper('.swiper-container', {

            spaceBetween: 30,
            centeredSlides: true,
            effect: 'fade',
            loop:true,
            loopedSlides: 5,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            
        });
      
    }

    render() {
       
        return( 
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" style={{backgroundImage:"url(../../static/image/banner1.jpg)"}}>
                            <div className="banner-text p-4" style={{width: "100%",height: "100%",position: "absolute",left: 0,top: 0}}>
                                <div className="container" style={{height: "100%",display: "table",textAlign:" center",width: "1170px"}}>
                                    <div className="banner-text-con" style={{display: "table-cell",verticalAlign:" middle"}}>
                                        <div style={{width:" 60%",display: "inline-block"}}>
                                            <h3 className="animation-fade font-weight-500" style={{color:"#ffffff",margin: 0,fontSize: "42px"}}>品味。生活</h3>
                                            <p className="animation-fade " style={{color:"#ffffff",fontSize: "28px",margin: "20px 0 0",textShadow:" none"}}>舒适却不昂贵，美丽却不失梦幻</p>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                        <div className="swiper-slide" style={{backgroundImage:"url(../../static/image/banner2.jpg)"}}>
                            <div className="banner-text p-4" style={{width: "100%",height: "100%",position: "absolute",left: 0,top: 0}}>
                                <div className="container" style={{height: "100%",display: "table",textAlign:" center",width: "1170px"}}>
                                    <div className="banner-text-con" style={{display: "table-cell",verticalAlign:" middle"}}>
                                        <div style={{width:" 60%",display: "inline-block"}}>
                                            <h3 className="animation-fade font-weight-500" style={{color:"#ffffff",margin: 0,fontSize: "42px"}}>高端家居，窥见生活</h3>
                                            <p className="animation-fade " style={{color:"#ffffff",fontSize: "28px",margin: "20px 0 0",textShadow:" none"}}>华丽却不失温馨，简单却不繁琐</p>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className="swiper-button-next swiper-button-white"></div>
                    <div className="swiper-button-prev swiper-button-white"></div>
                </div>
        </div> 
        )
    }
}

