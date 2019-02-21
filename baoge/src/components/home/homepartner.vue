<template>
    <div class="partner container-fluid" style="background:rgba(37,49,86,1);">
      <section class="wrap">
        <div class="word">
          <i></i>
          <span>{{$t("message.coop")}}</span>
          <strong></strong>
          <!-- <p>COOPERATIVE&nbsp;&nbsp;PARTNER</p> -->
        </div>
        <ul>
          <li v-for="(partner,i) in partnerurl" :key="i">
            <img :src="partner.image" :alt="partner.id">
          </li>
        </ul>
      </section>
    </div>
</template>


<script>
export default {
  name: "homepartner",
  data() {
    return {
       partnerurl:[]
    };
  },
  methods:{
    getList(){
      this.axios({
        url: `${address}/dwkj/getItemList`,
        method: "GEt",
      }).then(res => {
        this.partnerurl= res.data.data;
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>


<style scoped>
.partner .wrap {
  width: 76%;
  margin: 0 auto;
  
}
.partner  .word{
    text-align: center;
    margin-bottom: 65px;
     color: white;
     padding:87px 0 92px 0;
}
.partner .wrap .word i {
  width: 31px;
  height: 2px;
  display: inline-block;
  background:linear-gradient(270deg,rgba(255,255,255,1) 0%,rgba(46,63,104,1) 100%);
  margin-bottom: 8px;
  margin-right: 16px;
}
.partner .word span {
  font-size: 28px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 4px;
}
.partner  .word strong {
  width: 31px;
  height: 2px;
  display: inline-block;
  background:linear-gradient(270deg, rgba(46,63,104,1)0%,rgba(255,255,255,1) 100%);
  margin-bottom: 8px;
  margin-left: 14px;
}
.partner  .word p {
    width: 100%;
  font-size: 16px;
  font-family: LucidaGrande;
  line-height: 18px;
}
ul{
  width:100%;
  padding-bottom: 40px;
  display: flex;
  flex-wrap:wrap;
}
li{
    width: 20%;
    height: 137px;
    padding-bottom: 55px;
    margin-right: 5%;
}
li img{
  width:100%;
}
</style>
