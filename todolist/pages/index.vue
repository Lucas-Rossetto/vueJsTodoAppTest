<script lang="ts">

'use strict';
import Todos  from "./components/todoCreate.vue";
import Vue , {VNode} from 'vue';

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
  render (createElement) : VNode {
    const todos = createElement('Todos');
    const vMain = createElement('v-main' , [todos])
    return createElement('v-app' , [vMain]);
  }

};
</script>