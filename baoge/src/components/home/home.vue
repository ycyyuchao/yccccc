<template>
<div class="section container-fluid">
    <div class="banner" v-for="(img,i) in imgurl" :key="i" v-if='i==3'>
        <img :src="img.url" alt="第五空间">
    </div>
        <homesystem></homesystem>
        <div class="aboutus" v-for="(img,i) in imgurl" :key="i" v-if='i==4'>
            <img :src="img.url" alt="关于我们">
            <div class="word">
                <i></i>
                <span>{{$t('message.about')}}</span>
                <strong></strong>
                <!-- <b>ABOUT&nbsp;&nbsp;US</b> -->
            </div>
            <p>
                {{$t('message.homeabout')}}
            </p>
        </div>
        <homenew></homenew>
        <homepartner></homepartner>
    </div>
</template>

<script>
import homesystem from './homesystem';
import homenew from './homenew';
import homepartner from './homepartner';
export default {
    name: "home",
    data() {
        return {
            imgurl: []
        };
    },
    methods: {
        getList() {
            var url = '';
            if(this.$i18n.locale==='zh'){
                url = `${address}/dwkj/listBanner`
            }else{
                url = `${address}/dwkjeng/listBanner`
            }
            this.axios({
                url: url,
                method: "get",
            }).then(res => {
                this.imgurl = res.data.data;
                console.log(this.imgurl)
            });
        }
    },
    mounted() {
      this.getList()
    },
    components: {
        homesystem,
        homenew,
        homepartner
    }
};
</script>

<style scoped>
.aboutus {
    position: relative;
}

.banner img {
    width: 100%;
    height: 945px;
}

.aboutus img {
    width: 100%;
    height: 690px;
}

.aboutus p {
    width: 80%;
    margin: 0 auto;
    height: 170px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    position: absolute;
    top: 300px;
    left: 10%;
    text-align: center;
}

.word {
    text-align: center;
    padding-top: 90px;
    margin-bottom: 65px;
    position: absolute;
    top: 26px;
    left: 43.69%;
}

.word i {
    width: 31px;
    height: 2px;
    display: inline-block;
    background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(40, 57, 96, 1) 100%);
    margin-bottom: 8px;
    margin-right: 16px;
}

.word span {
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    line-height: 40px;
    letter-spacing: 4px;
}

.word strong {
    width: 31px;
    height: 2px;
    display: inline-block;
    background: linear-gradient(270deg, rgba(40, 57, 96, 1)0%, rgba(255, 255, 255, 1) 100%);
    margin-bottom: 8px;
    margin-left: 14px;
}

.word b {
    width: 100%;
    font-size: 16px;
    font-family: LucidaGrande;
    color: #fff;
    line-height: 18px;
    display: block;
}
</style>
