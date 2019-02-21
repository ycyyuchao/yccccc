<template>
<div style="
            background-color:#F3F4FB;
            padding-bottom:168px;
            " 
            class="container-fluid"
    >
    <section class="intrd">
        <div class="word">
            <i></i>
            <span>{{$t('message.team')}}</span>
            <strong></strong>
        </div>
        <div class="people">
            <div class="img">
                <img :src="datas.timage" alt="people">
            </div>
                <div class="peointrd">
                    <div class="title">
                        <strong>{{datas.tname}}</strong>&nbsp;&nbsp;
                        <span>/&nbsp;&nbsp;{{datas.tjob}}</span>
                    </div>
                    <div class="profile">
                        <p>{{datas.tintroduce}}</p>
                    </div>
                </div>
            </div>
            <div class="clear" style="position:relative">
                <div class="luobo_word" style="padding:0 24px;border-bottom:2px solid #0671DE;">
                    <h3 style="

                height:25px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(39,39,54,1);
                line-height:25px;
                letter-spacing:1px;
                padding:20px 178px 6px 0px;
                width: 100%;
                ">{{datas.tname}}</h3>
                    <span style="

                height:20px;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(85,86,102,1);
                line-height:20px;
               ">{{datas.tjob}}</span>
                    <p style="
                  
                   height:245px;
                  font-size:12px;
                  font-family:PingFangHK-Regular;
                  font-weight:400;
                  color:rgba(105,109,119,1);
                  line-height:23px;
                  padding-top:13px;
                  padding-bottom:40px">{{datas.tintroduce}}</p>
                </div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(team,i) in teamdata" :key='i' @click='getcontent($event,i)' style="height:371px;height:371px">
                            <img :src="team.timage" style='width:100%;height:250px;width:100%;height:250px;'>
                            <div class="name" style="
                                
                                width: 100%;
                                text-align: center;
                                padding: 45px 0;
                                background: #fff;
                                height:68px;">
                                <strong style="
                                
                                height:25px;
                                font-size:18px;
                                font-family:PingFangSC-Medium;
                                font-weight:bold;color:rgba(39,39,54,1);
                                line-height:25px;
                                letter-spacing:1px;
                                display:block;">{{team.tname}}</strong>
                                <span style="
                                height:20px;
                                font-size:14px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(85,86,102,1);
                                line-height:20px;">{{team.tjob}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="swiper-button-next left">←</button>
                <button class="swiper-button-prev right">→</button>
            </div>
    </section>
</div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "intrd",
    data() {
        return {
            teamdata: [],
            datas: []
        };
    },
    methods: {
        getList() {
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = "http://47.52.29.78/xzbweb/dwkj/listTeam"
            } else {
                url = "http://47.52.29.78/xzbweb/dwkjeng/listTeam"
            }
            this.axios({
                url: url,
                method: "get"
            }).then(res => {
                //console.log(res.data.data);
                this.teamdata = res.data.data.list;
            })
        },
        getcontent(e, i) {
            var ID = i + 9;
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = `http://47.52.29.78/xzbweb/dwkj/getTeam/${ID}`
            } else {
                url = `http://47.52.29.78/xzbweb/dwkjeng/getTeam/${ID}`
            }
            this.axios({
                url: url,
                method: "get"
            }).then(res => {
                this.datas = res.data.data;
                //console.log(this.contentdata)
            })
        },
        Data() {
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = "http://47.52.29.78/xzbweb/dwkj/getTeam/9"
            } else {
                url = "http://47.52.29.78/xzbweb/dwkjeng/getTeam/9"
            }
            this.axios({
                url: url,
                method: "get"
            }).then(res => {
                console.log(res.data.data);
                this.datas = res.data.data;
            })
        },
        initSwiper() {
            const _this = this
            var mySwiper = new Swiper(".swiper-container", {
                initialSlide: 0,
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 1,
                loop: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                observer: true,
                observeParents: true,
                onSlideChangeEnd: function (swiper) {
                    mySwiper.update();
                    mySwiper.startAutoplay();
                    mySwiper.reLoop();
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            });

        },
    },
    mounted() {
        this.getList();
        setTimeout(() => {
            this.initSwiper();
        }, 500);
        this.Data();
    }
};
</script>

<style scoped>
.swiper-container.swiper-slide img {
    width: 100%;
    height: 270px;
}

.luobo_word {
    width: 240px;
    background: #fff;
    float: left;
    margin-right: 32px;

}

.lunbo_word h3 {
    font-size: 14px;
}

.lunbo_word span {
    font-size: 14px;

}

button {

    position: absolute;
    top: 47%;
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

    background-color: #62abff;
    color: #fff;
}

.left {

    left: -58px;
}

.right {
    left: 1100px;
}

.intrd {

    width: 1063px;
    margin: 0 auto;
    position: relative;
}

.intrd .word {

    text-align: center;
    margin-top: 73px;
    margin-bottom: 30px;
    padding: 105px 0 113px 0;
}

.intrd .word i {

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

.intrd .word span {

    height: 40px;
    font-size: 28px;
    font-weight: 500;
    color: rgba(39, 39, 54, 1);
    line-height: 40px;
    letter-spacing: 1px;
}

.intrd .word strong {

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

.intrd .people .img {

    width: 497px;
    height: 566px;
}

img {

    width: 100%;
    height: 100%;
}

.people {
   padding-bottom: 126px;
}

.peointrd {

    padding-left: 40px;
    width: 549px;
    height: 373px;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    top: 400px;
    left: 440px;
}

.title {

    padding: 90px 0 25px 0px;
}

.title strong {

    height: 30px;
    font-size: 22px;
    font-weight: bold;
    color: rgba(39, 39, 54, 1);
    line-height: 30px;
    letter-spacing: 1px;
}

.title span {

    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(85, 86, 102, 1);
    line-height: 25px;
    letter-spacing: 1px;
}

.profile {

    width: 475px;
    margin: 0 auto;
    height: 79px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(105, 109, 119, 1);
    line-height: 23px;
    padding-bottom: 90px;
}
</style>
