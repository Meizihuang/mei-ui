<template>
  <div class="about">
    <h2 class="title">This is about page {{id}}</h2>
  </div>
</template>

<script>
export default {
  name: "about",
  props: {
    id: [String, Number]
  },
  data() {
    return {};
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.title {
  color: blue;
}
</style>
