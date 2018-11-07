<template>
	<div class="search">
		<!-- S 头部logo跟导航栏 -->
		<HeaderTab></HeaderTab>
		<!-- E 头部logo跟导航栏 -->
	

		<div class="search-wrap">

		<!-- S 搜索栏 -->
	      <div class="search-form">
	        <input placeholder="搜索歌曲、歌手" v-model="keywords">
	        <i class="delete" v-show="showState" @click="delKeywords()"></i>
	      </div>
		<!-- E 搜索栏 -->

		<!-- S 热搜栏 -->
	      <div class="hotkey" v-if="!showState">
	        <h2>热门搜索</h2>
	        <div class="hotkey-list">
	          <span v-for="(key,i) in hotkey" v-text="key.k" :key="key.n" @click="searchHotKey(key.k)"></span>
	        </div>
	      </div>
	  	<!-- E 搜索栏 -->

	  	<!-- S 搜索列表 -->
	      <div class="song-wrapper">
	        <div class="content">
	          <div class="song-list" v-if="showState">
	            <ul>
	              <!-- S 歌手直达 -->
	              <router-link :to="'/singer/'+songList.zhida.singermid">
	                <li class="singer" v-if="songList.zhida.type" v-text="songList.zhida.singername"></li>
	              </router-link>
	              <!-- E 歌手直达 -->

	              <router-link :to="'/singer/'+s.songmid+'/'+s.albummid" v-for="(s,k) in songList.song.list" :key="s.songid" @click.native="addSong(s)">
	                <li>{{s.songname}}-{{s.singer[0].name}}</li>
	              </router-link>
	            </ul>
	          </div>
	        </div>
	      </div>
	      <!-- E 搜索列表 -->
	    </div>


	</div>
</template>

<script>
//导入头部组件HeaderTab
import HeaderTab from "@/components/HeaderTab.vue";

import jsonp from "jsonp";

import api from "@/api/searchApi";

import BScroll from "better-scroll";

import { mapGetters, mapMutations } from "vuex";

//import store from '@/store';

export default {
  data() {
    return {
      keywords: "",
      hotkey: [],
      songList: [],
      scroll: {}
    };
  },
  computed: {
    ...mapGetters(["getPlayList"]),

    //热门歌曲跟歌曲搜索列表的显示隐藏
    showState: function() {
      return this.keywords == "" ? false : true;
    }
  },
  watch: {
    //监听关键词
    keywords: function(newVal, oldVal) {
      this._search();
    }
  },
  created() {
    //调用热热门歌曲借口，并且截取前十个热门歌曲
    jsonp(api.hotkeyApi, { param: "jsonpCallback" }, (err, data) => {
      console.log(data);
      this.hotkey = data.data.hotkey.slice(0, 15);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(".song-wrapper", {
        click: true
      });
    });
  },
  methods: {
    //点击热门歌曲时关键字要跟输入框同步
    searchHotKey(keywords) {
      this.keywords = keywords;
    },

    //删除关键字
    delKeywords() {
      this.keywords = "";
    },
    _search() {
      //根据关键词搜索歌曲
      let url = api.searchApi + this.keywords;
      jsonp(url, { param: "jsonpCallback" }, (err, data) => {
        this.songList = data.data;
        console.log(data);
      });
    },
    addSong(song) {
      //添加歌曲
      song = { musicData: song };
      this.setCurSong(song);

      //防止重复添加
      let listArr = this.getPlayList;
      let numFlag = 0;
      listArr.forEach((item, i) => {
        if (song.musicData.songid == item.musicData.songid) {
          numFlag++;
        }
      });

      if (numFlag <= 0) {
        this.setCurSongIndex(listArr.length);
        this.setPlayList(song);
      }
    },
    ...mapMutations({
      setCurSong: "setCurSong",
      setPlayList: "setPlayList",
      setCurSongIndex: "setCurSongIndex"
    })
  },
  components: {
    HeaderTab
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  padding: 0 15px;
  margin: 0 auto;

  .search-form {
    padding: 8px 0;
    text-indent: 15px;
    background-color: #121212;
    margin: 0 5px;
    margin-top: 25px;
    border-radius: 8px;
    position: relative;
    margin-bottom: 20px;
    &::before {
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/search.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
    input {
      width: 220px;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      background-color: transparent;
      border: 0;
      outline: 0;
      color: #676767;
    }
    .delete {
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/delete.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      position: absolute;
      right: 10px;
    }
  }

  .hotkey {
    margin-top: 30px;
    h2 {
      color: #676767;
      font-size: 15px;
      text-indent: 5px;
    }
    .hotkey-list {
      color: #676767;
      display: flex;
      flex-wrap: wrap;
      span {
        padding: 4px 6px;
        background-color: #121212;
        margin: 5px;
        border-radius: 8px;
        font-size: 14px;
      }
    }
  }
}

.song-wrapper {
  height: calc(100vh - 173px);
  overflow: hidden;
}
li {
  padding: 6px 5px;
  color: #676767;
  &::before {
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url(../assets/icon/music.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
  }

  &.singer {
    &::before {
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/singer.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>