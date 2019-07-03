<template>
  <div class="index">
    <slot1 url="/">
      <h2 class="title">插槽内容&&作用域&&后背内容</h2>
      <p>{{ url }}</p>
    </slot1>
    <div
      class="split"
    >#######################################################################################################</div>
    <slot2>
      <template v-slot:header>
        <h2 class="title">具名插槽</h2>
      </template>
      <p>默认插槽内容</p>
      <template v-slot:footer>
        <h2 class="title">底部</h2>
      </template>
    </slot2>
  </div>
</template>

<script>
import slot1 from "@/components/slot-1";
import slot2 from "@/components/slot-2";

export default {
  name: "index",
  data() {
    return {
      url: "test slot"
    };
  },
  components: {
    slot1,
    slot2
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.index {
  color: red;
  .split {
    color: #22f090;
  }
}
</style>