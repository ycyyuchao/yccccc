<template>
<div class="about container-fluid">
    <div class="banner" v-for="(img,i) in imgurl" :key="i" v-if='i==0'>
        <img :src="img.url" alt="关于我们">
        </div>
        <aboutus></aboutus>
        <intrd></intrd>
    </div>
</template>

<script>
import aboutus from './aboutus'
import intrd from './intrd'
export default {
    name: "about",
    data() {
        return {
            imgurl: []
        };
    },
    components: {
        aboutus,
        intrd
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
    mounted() {
        this.getbanner()
    }
};
</script>

<style scoped>
.about {
    width: 100%;
}
.banner{
   width: 100%;
}
.about .banner img {
    width:  100%; 
    height: 741px;
}
</style>
