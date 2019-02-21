<template>
  <div class="Content">
    <div class="container">
      <h1 class="Content__Title">{{ $t('home.title') }}</h1>
      <p>{{ $t('home.introduction') }}</p>
    </div>
    <button @click='handelclick'>中文</button>
  </div>
</template>
<script>
export default {
  head() {
    return { title: this.$t('home.title') }
  },
  methods:{
      handelclick(){

      }
  }
}