<template>
  <div id="app">
    <div class="nav">
      <router-link to="/index">插槽</router-link>
      <router-link :to="{name: 'about',params: {id: 1,test: 'test'}}">介绍</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Hello",
  data() {
    return {};
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->

<style lang="scss">
#app {
  font-family: "微软雅黑";
  a.router-link-active {
    color: rgb(247, 172, 10);
  }
}
</style>