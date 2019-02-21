<template>
<div class="news container-fluid">
    <div class="banner" v-for="(img,i) in imgurl" :key="i" v-if='i==1'>
        <img :src="img.url" alt="战略体系">
    </div>
        <div class="content clear" style="background:#F3F4FB">
            <div class="wrap">
                <div class="link">
                    <router-link to="/" exact>{{$t('message.home')}}</router-link>>
                    <span style="color:rgba(39,39,54,1);">{{$t('message.new')}}</span>
                </div>
                <div class="news_content_detail" v-for="(news,i) in newsdata" :key="i">
                    <div class="avatar">
                        <img :src="news.image" alt="icon">
            </div>
                        <div style="padding-left:20%;">
                            <router-link :to="'news/'+news.id" class="title">{{news.title}}</router-link>
                            <!-- <span>{{news.time}}</span> -->
                            <p>{{news.content}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: "news",
    data() {
        return {
            newsdata: [],
            imgurl: []
        };
    },
    components: {},
    methods: {
        getList() {
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = `${address}/dwkj/listInformation`
            } else {
                url = `${address}/dwkjeng/listInformation`
            }
            this.axios({
                url: url,
                method: "GEt",
            }).then(res => {
                console.log(res.data.data);
                this.newsdata = res.data.data.list;
            });
        },
        height() {
            var height = $('.wrap').outerHeight();
            console.log(height);
            $('.content').css({
                height: height - 72
            })
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
        this.getList();
        setTimeout(() => {
            this.height();
        }, 500);
        this.getbanner();
    },
};
</script>

<style scoped>
.news .banner img {
    width: 100%;
    height: 741px;
}

.news .content {
    background-color: #f3f4fb;
    position: relative;

}

a {
    text-decoration: none;
}

.wrap {
    width: 76%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: -73px;
    left: 18.6%;
    padding-bottom: 84px;
}

.link {
    width: 86%;
    height: 73px;
    line-height: 73px;
    margin: 0 auto;
    border-bottom: 1px solid #d6d9e2;
    font-size: 18px;
    font-weight: 400;
    color: rgba(134, 140, 154, 1);
    letter-spacing: 1px;
}

.link a {
    color: rgba(134, 140, 154, 1);
}

.news_content_detail {
    width: 93%;
    position: relative;
}

.news_content_detail .avatar img {
    width: 7.87%;
    height: 78px;
    display: block;
    position: absolute;
    top: 74px;
    left: 4%;
}

.news_content_detail .title {
    height: 37px;
    font-size: 26px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(39, 39, 54, 1);
    line-height: 37px;
    letter-spacing: 1px;
    padding: 64px 0 50px 0;
    display: block;
}

.news_content_detail span {
    height: 21px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(134, 140, 154, 1);
    line-height: 21px;
}

.news_content_detail p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 95px;
    font-size: 16px;
    font-family: PingFangHK-Regular;
    font-weight: 400;
    color: rgba(105, 109, 119, 1);
    line-height: 31px;
    padding-top: 10px;
    border-bottom: 1px solid rgba(214, 217, 226, 1);
}
</style>
