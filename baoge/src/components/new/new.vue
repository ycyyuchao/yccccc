<template>
<div class="new container-fluid">
    <div class="banner" v-for="(img,i) in imgurl" :key="i" v-if='i==1'>
        <img :src="img.url" alt="战略体系">
        </div>
        <div class="content clear" style="background:#F3F4FB">
            <div class="wrap">
                <div class="link">
                    <router-link to='/' exact>{{$t('message.home')}}</router-link>
                    >
                    <router-link to='/news' exact>{{$t('message.new')}}</router-link>
                    >
                    <span style="color:rgba(39,39,54,1);">{{$t('message.newd')}}</span>
                </div>
                <div class="content_detail clear">
                    <div style="width:67.34%; float:left;">
                        <h3>{{newdata.title}}</h3>
                        <span>{{newdata.time}}</span>
                        <i>{{$t('message.author')}}：第五空间</i>
                        <img :src="newdata.image">
                        <p>
                            {{newdata.content}}
                        </p>
                    </div>
                    <div class="sidebar">
                        <span>{{$t('message.LatestNews')}}</span>
                        <ul>
                            <li v-for="(List,i) in ListData" :key='i'>
                                <span></span>
                                <a href='javascript:;' class="title" @click="getData(List.id)">{{List.title}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "new",
    data() {
        return {
            newdata: [],
            ListData: [],
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
        getData(ID) {
            var url = '';
            if (this.$i18n.locale === 'zh') {
                url = `${address}/dwkj/getInformation/${ID}`;
            } else {
                url = `${address}/dwkjeng/getInformation/${ID}`;
            }
            this.axios({
                url: url,
                method: "get"
            }).then(res => {
                console.log(res)
                this.newdata = res.data.data;
                setTimeout(() => {
                    this.height();
                }, 500);
            })
        },
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
                this.ListData = res.data.data.list;
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
        var Id = this.$route.params;
        this.getData(Id.id);
        this.getList();
        this.getbanner();

    },
};
</script>

<style scoped>
.new .banner img {
    width: 100%;
    height: 741px;
}

.new .content {
    background-color: #F3F4FB;
    position: relative;
}

.wrap {
    width: 62.5%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: -73px;
    left: 18.6%;
    padding-bottom: 72px;
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

.content_detail {
    width: 94.66%;
    margin: 0 auto;
}

.content_detail h3 {
    padding: 54px 0 31px 0;
    font-size: 30px;
    font-weight: bold;
    color: rgba(39, 39, 54, 1);
    line-height: 42px;
    letter-spacing: 1px;
}

.content_detail span {
    font-size: 15px;
    font-weight: 400;
    color: rgba(134, 140, 154, 1);
    line-height: 21px;
    display: inline-block;
    padding-right: 38px;
}

.content_detail i {
    font-size: 15px;
    color: rgba(134, 140, 154, 1);
    line-height: 21px;
    padding-left: 40%;
}

.content_detail p {
    font-size: 16px;
    color: rgba(105, 109, 119, 1);
    line-height: 35px;
    padding: 36px 0;
}

.content_detail img {
    width: 97.25%;
    height: 388px;
    margin-top: 20px;
}

.sidebar {
    float: left;
    padding-top: 68px;
    width: 21.44%;
    padding-left: 80px;
}

.sidebar ul {
    margin: 0;
    border: 1px solid rgba(231, 232, 235, 1);
    border-top: none;
    padding: 42px 35px 44px 20px;
}

.sidebar span {
    height: 92px;
    background: rgba(231, 232, 235, 1);
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: rgba(39, 39, 54, 1);
    line-height: 92px;
    letter-spacing: 1px;
    display: block;
    padding-right: 0;
}

.sidebar li {
    width: 95.22%;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    padding: 0 0 15px 26px;
    border-bottom: 1px solid rgba(186, 186, 195, 1);
}

.sidebar li a {
    color: rgba(39, 39, 54, 1);
}

.sidebar li span {
    width: 7px;
    height: 7px;
    border: 2px solid rgba(6, 113, 222, 1);
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 0;
}
</style>
