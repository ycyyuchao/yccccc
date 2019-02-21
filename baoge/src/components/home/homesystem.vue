<template>
<div class="system container-fluid" style='background-color:#F3F4FB;'>
    <section class="wrap">
        <div class="word">
            <i></i>
            <span>{{$t('message.system')}}</span>
            <strong></strong>
            <!-- <p>Strategic&nbsp;&nbsp;System</p> -->
        </div>
        <div class="swiper1 swiper-container ">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="(data,i) in datas" :key="i">
                    <img :src="data.img">
                    <div>
                        <h5>{{data.title}}</h5>
                        <p>{{data.description}}</p>
                    </div>
                    <div class='hidebox'>
                        <h5>{{data.title}}</h5>
                        <h4>{{data.description}}</h4>
                        <p>{{data.content}}</p>
                        <router-link to="/system">More</router-link>
                        <router-link :to="'/system/'+data.id">→</router-link>
                    </div>
                </li>
            </ul>
            <button class="swiper1-button-next left">←</button>
            <button class="swiper1-button-prev right">→</button>
        </div>
    </section>
</div>
</template>

 
<script>
import Swiper from "swiper";
export default {
    name: "homesystem",
    data() {
        return {
            datas: [],
            
        };
    },
    methods: {
        getList() {
            var url = '';
            if(this.$i18n.locale==='zh'){
                url = `${address}/dwkj/listCooperative`
            }else{
                url = `${address}/dwkjeng/listCooperative`
            }
            this.axios({
                url: url,
                method: "GEt",
            }).then(res => {
                //console.log(res.data.data.list)
                this.datas = res.data.data.list;
                this.initSwiper();
            });
            console.log(this.$i18n.locale)
        },
        initSwiper() {
            const _this = this
            var mySwiper = new Swiper(".swiper1", {
                initialSlide :0,
                slidesPerView: 3,
                slidesPerGroup: 1,
                loop: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                observer: true,
                observeParents: true,
                onSlideChangeEnd: function(swiper){ 
                    mySwiper.update();  
                    mySwiper.startAutoplay();
            　　    mySwiper.reLoop();  
                },
                navigation: {
                    nextEl: ".swiper1-button-next",
                    prevEl: ".swiper1-button-prev"
                }
            })
        },
        hover(){
          $(document).on("touchstart", ".action-btn:not(.disable)", function (e) {
              var $this = $(this);
              var flag = true;
              //遍历子类
              $this.find("*").each(function () {
                  //查看有没有子类触发过active动作
                  if ($(this).hasClass("active")) flag = false;
              });
              //如果子类已经触发了active动作，父类则取消active触发操作
              if (flag) $this.addClass("active");

          });
          $(document).on("touchmove", ".action-btn:not(.disable)", function (e) {
              if ($(this).hasClass("active")) $(this).removeClass("active");
          });
          $(document).on("touchend", ".action-btn:not(.disable)", function (e) {
              if ($(this).hasClass("active")) $(this).removeClass("active");
          });
        }
    },
    mounted() {
      this.getList();
      setTimeout(()=>{
        this.initSwiper();
      },500);
      this.hover();
    }
};
</script>

<style scoped>
.wrap {
    width: 76%;
    margin: 0 auto;

}

.word {
    text-align: center;
    padding-top: 90px;
    margin-bottom: 65px;
}

.wrap .word i {
    width: 31px;
    height: 2px;
    display: inline-block;
    background: linear-gradient(270deg,
        rgba(238, 238, 238, 1) 0%,
        rgba(39, 39, 54, 1) 0%,
        rgba(216, 216, 216, 0) 100%);
    margin-bottom: 8px;
    margin-right: 16px;
}

.wrap .word span {
    font-size: 28px;
    font-weight: 500;
    color: rgba(39, 39, 54, 1);
    line-height: 40px;
    letter-spacing: 4px;
}

.wrap .word strong {
    width: 31px;
    height: 2px;
    display: inline-block;
    background: linear-gradient(to right,
        rgba(238, 238, 238, 1) 0%,
        rgba(39, 39, 54, 1) 0%,
        rgba(216, 216, 216, 0) 100%);
    margin-bottom: 8px;
    margin-left: 14px;
}

.wrap .word p {
    width: 100%;
    font-size: 16px;
    font-family: LucidaGrande;
    color: rgba(124, 125, 141, 1);
    line-height: 18px;
}

.swiper-container {
    width: 100%;
    height: 100%;
    padding-bottom: 218px;
    position: relative;
}

.swiper-wrapper {
    display: flex
}

.swiper-wrapper li {
    margin: 0;
    width: 33.333333%;
    text-align: center;
    position: relative;
}

.swiper-slide div {
    background: #fff;
    width: 100%;
}

.swiper-slide .hidebox {
    width: 100%;
    height: 0;
    transition: height .5s ease;
    position: absolute;
    top: 0;
    background: linear-gradient(270deg, rgba(46, 167, 236, 1) 0%, rgba(3, 109, 221, 1) 100%);
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 1);
    display: none;
}

.swiper-slide:hover .hidebox {
    height: 628px;
    display: block;
}

.swiper-slide .hidebox h5 {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 40px;
    padding: 0;
    padding: 164px 0 28px 0;
    color: rgba(255, 255, 255, 1);
}

.swiper-slide .hidebox h4 {
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 28px;
    padding-bottom: 40px;
}

.swiper-slide .hidebox p {
    width: 320px;
    height: 116px;
    font-size: 16px;
    font-family: PingFangHK-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 27px;
    margin: 0px 40px;
    text-align: center;
    overflow: hidden;
}

.swiper-slide .hidebox a {
    height: 28px;
    font-size: 24px;
    font-family: LucidaGrande-Bold;
    font-weight: bold;
    line-height: 28px;
    margin-left: 240px;
    display: block;
    padding-top: 20px;
    color: #fff;
}

.swiper-wrapper li img {
    width: 100%;
    height: 468px;
    display: block;
}

.swiper-wrapper h5 {
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: blod;
    color: rgba(39, 39, 54, 1);
    line-height: 30px;
    letter-spacing: 1px;
    padding-top: 56px;
}

p {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(77, 83, 97, 1);
    line-height: 22px;
    letter-spacing: 1px;
    padding: 4px 0 48px 0;
}

button {
    position: absolute;
    top: 730px;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border: 0;
    outline: 0;
    border-radius: 50%;
    color: #ccc;
    box-shadow: 0px 5px 10px #888888;
    font-size: 18px;
}

button:hover {
    background-color: #62ABFF;
    color: #fff;

}

.left {
    left: 580px;
}

.right {
    left: 630px;
}

.swiper-slide-active {
    width: 408px;
    margin: 0;
}
</style>
