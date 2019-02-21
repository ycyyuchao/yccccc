<template>
  <div>
    <footer>
      <div class="wrap">
        <div class="footer_logo">
          <img src="../../assets/图片/logo/微信图片_20181211111135.png" alt="">
        </div>
        <div class="footer_nav">
          <strong>{{$t('message.footernav')}}</strong>
          <p><router-link to='/'>{{$t('message.home')}}</router-link></p>
          <p><router-link to='/news'>{{$t('message.new')}}</router-link></p>
          <p><router-link to='/system'>{{$t('message.system')}}</router-link></p>
          <p><router-link to='/about'>{{$t('message.about')}}</router-link></p>
        </div>
        <div class="footer_contact">
          <strong>{{$t('message.contact')}}</strong>
          <p>{{$t('message.mailbox')}}:</p>
          <p class="email">the5space@126.com</p>
          <p><a href='http://weibo.com/T5Chain'>{{$t('message.weibo')}}</a></p>
          <p style="position:relative" class='weixin'> 
            <span >{{$t('message.weixinservice')}}</span>
            <img class='erweima' src="../../assets/图片/logo/Group 13.png" style='position: absolute;top: 0;left: 106px;'>
          </p>
          <p><a href='http://twitter.lianpuie.com/?4496'>Twitter</a></p>
        </div>
        <div class="footer_link"> 
          <strong>{{$t('message.friendlylink')}}</strong>
          <p><a href='http://www.kinncoin.com'>Kinncoin</a></p>
          <p><a href='http://fxzb.pro/'>风向资本</a></p>
          <p><a href="http://www.palauex.com/#/home">Jellyfish</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footers",
  data() {
    return {
    };
  },
  
};
</script>

<style scoped>
footer{
  width:100%;
  background:#242424;
  font-size:16px;
  font-family:PingFangSC-Regular;
}
footer .wrap div{
  padding-right: 9.5%;
  padding-top:40px;
  width:16.25%;
}
.wrap{
  width:76%;
  margin:0 auto; 
  display: flex;
}
footer p{
  height:40px;
  color:rgba(142,142,142,1);
  line-height:40px;
}
footer strong{
  height:25px;
  font-size:18px;
  color:rgba(213,213,213,1);
  line-height:25px;
}
footer a{
   color:rgba(142,142,142,1);
}
.wrap .footer_logo{
  width:18%;
  height:226px;
  padding-bottom: 40px;
  padding-top:0;
}
.footer_logo img{
  width:100%;
  height:100%;
  display:block;
}
.footer_contact{
  position:relative;
}
.footer_contact .email{
  position: absolute;
      top: 65px;
    left: 40px;
}
.footer_link{
  padding-left:5.5%
}
.erweima{
  display:none;
}
.weixin:hover .erweima{
  display: block;
}
</style>
