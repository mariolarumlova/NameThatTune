<template>
  <div>
    <input type="text" placeholder="Enter sth" v-model="newItem" />
    <button @click="addItem">Add</button>

    <div
      class="item"
      v-bind:class="{ complete: item.complete }"
      v-for="item in items"
      v-bind:key="item.id"
    >
      <h2>{{ item.title }}</h2>
      <button v-if="!item.complete" @click="markAsDone(item.id)">Done</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      newItem: "",
      items: [
        { title: "Write thesis", complete: false, id: "1" },
        { title: "Make a dinner", complete: false, id: "2" },
        { title: "Call to Piotrek", complete: true, id: "3" }
      ]
    };
  },
  methods: {
    addItem() {
      this.items.push({
        id: Math.random().toString(),
        title: this.newItem,
        complete: false
      });
    },
    markAsDone(id: string) {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].complete = true;
    }
  }
});
</script>
<style lang="scss">
.item {
  border: 1px solid #cdcdcd;
  margin: 8px;
  padding: 10px;
}
.complete {
  opacity: 0.5;
}
.complete h2 {
  text-decoration: line-through;
}
</style>
