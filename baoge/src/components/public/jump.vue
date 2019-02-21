
<template>
  <div>
  </div>
</template>


<script>
export default {
  mounted() {
    var path = window.localStorage.getItem('path');
    this.$router.push(`${path}`)
  }
};
</script>