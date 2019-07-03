<template>
  <div class="app">
    <div class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">介绍</router-link>
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

<style lang="scss" scoped>
.app {
  color: red;
}
</style>