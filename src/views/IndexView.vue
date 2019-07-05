<template>
  <div class="index" ref="testDivRef">
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
    <div
      class="split"
    >#######################################################################################################</div>
    <slot3>
      <h2 class="title">作用域插槽 && 结构插槽Prop</h2>
      <template v-slot:slot3="{ user, person }">{{ user.lastName }} {{person.footer}}</template>
    </slot3>
    <div
      class="split"
    >#######################################################################################################</div>
    <slot4 #slot4="{ person }">
      <h2 class="title">具名插槽的缩写</h2>
      <p>{{ person.header }}</p>
    </slot4>
    <div
      class="split"
    >#######################################################################################################</div>
    <slot-example :data="tableData" ref="testRef">
      <template>slot 示例</template>
      <template #header>
        <slotExampleHeader prop="date" label="日期" width="180" />
        <slotExampleHeader prop="name" label="姓名" width="180" />
        <slotExampleHeader prop="address" label="地址" width="300" />
      </template>
      <template #body="{ body }">
        <p v-for="(val,index) in body" :key="index">{{ index }}</p>
      </template>
    </slot-example>
  </div>
</template>

<script>
import slot1 from "@/components/slot-1";
import slot2 from "@/components/slot-2";
import slot3 from "@/components/slot-3";
import slot4 from "@/components/slot-4";
import slotExample from "@/components/slot-example";
import slotExampleHeader from "@/components/slot-example-header";

export default {
  name: "index",
  data() {
    return {
      url: "test slot",
      tableData: [
        {
          date: "2016-02-21",
          name: "Zhang",
          address: "上海市静安区"
        },
        {
          date: "2016-03-21",
          name: "jing",
          address: "上海市静安区"
        },
        {
          date: "2016-04-21",
          name: "peng",
          address: "上海市静安区"
        }
      ]
    };
  },
  components: {
    slot1,
    slot2,
    slot3,
    slot4,
    slotExample,
    slotExampleHeader
  },
  mounted() {
    console.log(this.$refs.testRef);
    console.log(this.$refs.testDivRef);
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