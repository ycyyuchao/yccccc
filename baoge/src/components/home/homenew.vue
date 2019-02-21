<template>
<div class="homenew container-fluid" style="background:#F3F4FB;">
    <section class="wrap clear">
        <div class="word clear">
            <div class="title clear">
                <h3>{{$t('message.new')}}</h3>
            </div>
            <div class="content clear">
                <h4>{{contentdata.title}}</h4>
                <p>{{contentdata.content}}</p>
            </div>
            <div class="button">
                <button class="left swiper2-button-next" >←</button>
                <button class="right swiper2-button-prev">→</button>
            </div>
            <router-link to='/news'>{{$t('message.more')}}&nbsp;&nbsp;&nbsp;→</router-link>
        </div>
        <div class="swiper-container swiper2">
            <ul class="newlist swiper-wrapper clear">
                <li class="swiper-slide" v-for="(homenew,i) in homenewsdata" :key='i' @click='getcontent($event,i)'>
                    <strong>{{homenew.id}}</strong>
                    <!-- <span class="i">{{homenew.time}}</span> -->
                    <span class="p">{{homenew.title}}</span>
                    <img :src="homenew.image" alt="">
                    <router-link to='/news' class="em">More</router-link>
                    <router-link :to="'/news/'+ homenew.id" class="b">→</router-link>
                </li>
            </ul>
        </div>
    </section>
</div>
</template>

<script>
import Swiper from "swiper";

export default {
    name: "homenew",
    data() {
        return {
            homenewsdata: [],
            contentdata: []
        };
    },
    methods: {
        getcontent(e, i) {
            var ID =i+1;
            var url = '';
            if(this.$i18n.locale==='zh'){
                url = `${address}/dwkj/getInformation/${ID}`
            }else{
                url = `${address}/dwkjeng/getInformation/${ID}`
            }
            this.axios({
                url: url,
                method: "get"
            }).then(res => {
                this.contentdata = res.data.data;
                console.log(this.contentdata)
            })
        },
        content() {
            var url = '';
            if(this.$i18n.locale==='zh'){
                url = `${address}/dwkj/getInformation/1`
            }else{
                url = `${address}/dwkjeng/getInformation/1`
            }
            this.axios({
                url: url,
                method: "get"
            }).then(res => {
                this.contentdata = res.data.data;
                //console.log(this.contentdata)
            })
        },
        getList() {
            var url = '';
            if(this.$i18n.locale==='zh'){
                url = `${address}/dwkj/listInformation`
            }else{
                url = `${address}/dwkjeng/listInformation`
            }
            this.axios({
                url: url,
                method: "get",
            }).then(res => {
                //console.log(res.data.data); 
                this.homenewsdata = res.data.data.list;
            });
        },
        initSwiper() {
            const _this = this
            var mySwiper = new Swiper(".swiper2", {
                initialSlide: 0,
                slidesPerView: 3,
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
                    nextEl: ".swiper2-button-next",
                    prevEl: ".swiper2-button-prev"
                }
            });

        },
    },
    mounted() {
        this.getList();
        setTimeout(() => {
            this.initSwiper();
        }, 500);
        this.content();
    },
};
</script>

<style scoped>
.wrap {
    width: 76%;
    margin: 0 auto;
}

.word {
    width: 400px;
    float: left;
    position: relative;
}

h3 {
    width: 129px;
    height: 40px;
    font-size: 28px;
    font-weight: 500;
    color: rgba(39, 39, 54, 1);
    line-height: 40px;
    letter-spacing: 4px;
    padding: 146px 0 66px 0;
}

h4 {
    height: 33px;
    font-size: 24px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 33px;
    padding-bottom: 60px;
}

.content p {
    height: 135px;
    font-size: 18px;
    font-family: PingFangHK-Regular;
    font-weight: 400;
    color: rgba(76, 77, 102, 1);
    line-height: 36px;
    overflow: hidden;
}

.newlist {
    display: flex;
    width: 750px;
}

.newlist li {
    width: 35%;
    padding-bottom: 106px;
}

.newlist strong {
    height: 53px;
    font-size: 45px;
    font-family: AlBayan-Bold;
    font-weight: bold;
    color: #5C6170;
    line-height: 75px;
    padding: 54px 163px 105px 28px;
    display: block;
}

.newlist a {
    font-family: LucidaGrande-Bold;
    color: #424759;
    display: block;
    padding-left: 28px;
    font-size: 16px;
}

.newlist span {
    font-family: LucidaGrande-Bold;
    color: #424759;
    display: block;
    padding-left: 28px;
    font-size: 16px;
}

.newlist .i {
    height: 18px;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    padding: 0 103px 22px 28px;
}

.newlist .p {
    width: 208px;
    height: 54px;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    padding: 0 7px 34px 28px;
}

.newlist .b {
    color: #5C6170;
}

.newlist img {
    width: 195px;
    height: 211px;
    padding: 0 28px 0px 28px;
}

.newlist .em {
    padding-top: 80px;
}

.homenew .newlist li:hover {
    background: #4C85FC;

}

.homenew .newlist li:hover span {
    color: white;
}

.homenew .newlist li:hover a {
    color: white;
}

.button {
    padding-bottom: 115px;
}

button {
    position: absolute;
    top: 515px;
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
    left: 0px;
}

.right {
    left: 58px;
}

.word a {
    display: block;
    padding: 12px 0 0 0;
    font-size: 16px;
    font-family: PingFangHK-Regular;
    font-weight: 400;
    color: rgba(73, 132, 255, 1);
    line-height: 22px;
    text-decoration: none;
}
</style>
