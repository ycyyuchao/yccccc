<template>
<header>
    <div class="logo">
        <img src="../../assets/图片/logo/1.jpg" alt="第五空间">
      </div>
        <ul class="clear">
            <li>
                <router-link to="/" exact>{{$t('message.home')}}</router-link>
            </li>
            <li>
                <router-link to="/about">{{$t('message.about')}}</router-link>
            </li>
            <li>
                <router-link to="/system">{{$t('message.system')}}</router-link>
            </li>
            <li>
                <router-link to="/news">{{$t('message.new')}}</router-link>
            </li>
            <li class="menu">
                <div class="down" style="position: relative;">
                    <div>
                        {{lang}}<span class="caret"></span>
                    </div>
                    <ul class="down-menu" id="lang">
                        <li><a href="###" @click='changeLocalezh($event)'>{{$t('message.zh')}}</a></li>
                        <li><a href="###" @click='changeLocaleen($event)'>{{$t('message.en')}}</a></li>
                    </ul>
                </div>
            </li>
        </ul>
</header>
</template>

<script>
import LangStorage from '../../assets/js/lang'
export default {
    name: "headers",
    data() {
        return {
            lang: this.$i18n.locale,
            top:null
        };
    },
    methods: {
        changeLocalezh(e) {
            let locale = this.$i18n.locale
            this.$i18n.locale = 'zh'
            LangStorage.setLang(this.$i18n.locale) // 保存用户习惯
            let path = this.$route.path;
            window.localStorage.setItem("path", path);
            this.$router.push({
                path: "/jump"
            });
            var lang = e.target.innerHTML;
            this.lang = lang;
            return false;

        },
        changeLocaleen(e) {
            let locale = this.$i18n.locale
            this.$i18n.locale = 'en'
            LangStorage.setLang(this.$i18n.locale) // 保存用户习惯
            let path = this.$route.path;
            window.localStorage.setItem("path", path);
            this.$router.push({
                path: "/jump"
            });
            var lang = e.target.innerHTML;
            this.lang = lang;
            return false;

        }
    },
    mounted(){
      if( this.$i18n.locale==='zh'){
          this.lang = '简体中文'
      }else{
          this.lang = 'English'
      }
      
    },
    /* watch: {
        '$route': function (to, from) {
            document.body.scrollTop = 0；
            document.documentElement.scrollTop = 0;
        }

    } */
};
</script>

<style scoped>
.router-link-active {
    color: rgba(6, 113, 222, 1);
}

header {
    padding-left: 10%;
    height: 65px;
    line-height: 65px;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    width: 100%;
    z-index: 999;
}

.logo {
    width: 154px;
    height: 64px;
    float: left;
    margin-right: 11%;
}

.logo img {
    width: 100%;
    height: 100%;
}

ul {
    width: 71%;
    display:flex
}

li {
    list-style: none;
    float: left;
    font-size: 18px;
    margin-right: 4%;
    font-size: 18px;
    font-weight: 400;
}

a {
    text-decoration: none;
    color: rgba(39, 39, 54, 1);
}

.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 5px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid\9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

.menu:hover #lang {
    display: block;
}

#lang {
    width: 93px;
    height: 104px;
    background: rgba(39, 39, 54, 1);
    border-radius: 4px;
    position: absolute;
    top: 55px;
    left: -3px;
    display: none;
    padding-left: 0;
}

#lang li {
    width: 93px;
    height: 52px;
}

#lang li a {
    color: #0671DE;
    width: 93px;
    height: 52px;
    font-size: 16px;
    padding: 0;
    display: inline-block;
    text-align: center;
}

#lang li a:hover {
    border-radius: 3px;
    background: rgba(45, 54, 79, 1);
    color: rgba(255, 255, 255, 1);
}
</style>
