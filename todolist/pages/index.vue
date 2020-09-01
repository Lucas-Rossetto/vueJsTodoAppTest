<script lang="ts">

"use strict";
import Todos from "./components/todoCreate.vue";
import Vue , {VNode} from 'vue';
import { CreateElement } from 'vue/types/umd';

export default {
  name : 'Todo',
  components: {
    Todos
  },
  head() {
      return {
        meta: [{
          name: "viewport",
          content: "width=device-width",
          }]
      }
  },
  render (createElement : CreateElement) : VNode {
    const todos = createElement('Todos');
    const vMain = createElement('v-main' , [todos])
    return createElement('v-app' , [vMain]);
  }

};
</script>