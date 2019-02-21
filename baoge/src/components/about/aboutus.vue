<template>
<div class="container-fluid" style="height:770px;">
    <section class="us">
        <div class="word">
            <i></i>
            <span>{{$t('message.about')}}</span>
            <strong></strong>
            <em>{{$t('message.abouttitle')}}</em>
            <div>
                <p>{{$t('message.dabout')}}</p>
            </div>
            <div v-for="(img,i) in imgurl" :key="i" v-if='i==5'>
                <img :src="img.url" alt="交易所">
            </div>
            </div>
    </section>
</div>
</template>

<script>
export default {
    name: "aboutus",
    data() {
        return {
            imgurl: []
        };
    },
    methods: {
        getbanner() {
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = `${address}/dwkj/listBanner`
            } else {
                url = `${address}/dwkjeng/listBanner`
            }
            this.axios({
                url: url,
                method: "get",
            }).then(res => {
                this.imgurl = res.data.data;
                console.log(this.imgurl);
            });
        }
    },
    mounted(){
      this.getbanner();
    }
};
</script>

<style scoped>
.us {
    width: 1063px; 
    margin: 0 auto;
}

.us .word {
    text-align: center;
    margin-top: 73px;
    margin-bottom: 30px;
}

.us .word i {
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

.us .word span {
    height: 40px;
    font-size: 28px;
    font-weight: 500;
    color: rgba(39, 39, 54, 1);
    line-height: 40px;
    letter-spacing: 1px;
}

.us .word strong {
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

.us .word em {
    width: 100%;
    margin: 19px 0 36px 0;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34, 38, 47, 1);
    line-height: 28px;
    letter-spacing: 1px;
    display: block;

}

.us .word div {
    height: 429;
    font-size: 18px;
    font-family: PingFangHK-Regular;
    font-weight: 400;
    color: rgba(105, 109, 119, 1);
    line-height: 36px;
    text-align: left;
}

.us .word div p {
    margin-bottom: 40px;
    text-indent: 36px;
}

.us img {
    width: 100%;
    height: 465px;
    margin-bottom: 165px;
}
</style>
