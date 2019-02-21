<template>
<div class="system ">
    <div class="banner" v-for="(img,i) in imgurl" :key="i" v-if='i==2'>
        <img :src="img.url" alt="战略体系">
        </div>
        <div class="content " style="width:100%;height:876px;" v-for="(data,index) in datalist" :key="index" v-if="index+1==id.id">
            <div class="wrap">
                <div class="link">
                    <router-link to='/' exact>{{$t('message.home')}}</router-link>
                    >
                    <router-link to='/system' exact>{{$t('message.system')}}</router-link>
                    >
                    <span style="color:rgba(39,39,54,1);">{{data.title}}</span>
                </div>
                <div class="icentres clear" style="padding-bottom:102px;">
                    <div class="left">
                        <img :src="data.img">
                    </div>
                        <div class="right">
                            <div class="word">
                                <span>{{data.title}}</span>
                                <strong></strong>
                                <p>{{data.description}}</p>
                            </div>
                            <p>
                                {{data.content}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: "system",
    data() {
        return {
            datalist: [],
            id: this.$route.params,
            imgurl: []
        };
    },
    components: {},
    methods: {
        height() {
            var height = $('.wrap').outerHeight();
            console.log(height);
            $('.content').css({
                height: height - 72
            })
        },
        getList() {
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = `${address}/dwkj/listCooperative`
            } else {
                url = `${address}/dwkjeng/listCooperative`
            }
            this.axios({
                url: url,
                method: "GEt",
            }).then(res => {
                console.log(res.data.data.list)
                var list = res.data.data.list;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == this.$route.params) {
                        alert(list[i])
                    }

                }
                this.datalist = res.data.data.list;
            });
        },
        getbanner() {
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
                console.log(this.imgurl);
            });
        }
    },
    mounted() {
        setTimeout(() => {
            this.height();
        }, 500);
        this.getList();
        this.getbanner();
    },
};
</script>

<style scoped>
.system .banner img {
    width: 100%;
    height: 741px;
}

.system .content {
    background-color: #F3F4FB;
    position: relative;

}

.wrap {
    width: 76%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: -73px;
    left: 358px;
}

.link {
    width: 94.66%;
    height: 73px;
    line-height: 73px;
    margin: 0 auto;
    border-bottom: 1px solid #D6D9E2;
    font-size: 18px;
    font-weight: 400;
    color: rgba(134, 140, 154, 1);
    letter-spacing: 1px;
}

.link a {
    color: rgba(134, 140, 154, 1);
}

.icentres {

    width: 94.66%;
    margin: 0 auto;
    padding: 105px 0 102px 0;
}

.icentres .left {
    width: 46.83%;
    float: left;
    padding-right: 34px;
}

.icentres .left img {
    width: 100%;
    height: 573px;
    margin-bottom: 22px;
}

.wrap .right .word span {
    font-size: 28px;
    font-weight: 500;
    color: rgba(39, 39, 54, 1);
    line-height: 40px;
    letter-spacing: 4px;
    padding: 16px 0;
    display: inline-block;
}

.wrap .right {
    width: 47.8%;
    float: left;
}

.wrap .right .word strong {
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

.wrap .right .word p {
    width: 100%;
    height: 28px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(34, 38, 47, 1);
    line-height: 28px;
    letter-spacing: 1px;
    padding-bottom: 33px;
}

.wrap .right p {

    font-size: 18px;
    font-weight: 400;
    color: rgba(105, 109, 119, 1);
    line-height: 34px;
}
</style>
