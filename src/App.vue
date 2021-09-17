<template>
  <div id="app">
    123
    <!-- <btn-bar :btnList="btnList" :isAuthority="false" /> -->
  </div>
</template>

<script>
// import btnBar from './plug/btn/buttonMain.vue';
export default {
  name: 'app',
  components: {},
  data () {
    return {
      btnList: [{
        label: '按钮',
        value: 0
      }]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
