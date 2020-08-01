<template>
<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
<v-app>
  <v-main>
  <div id="todo">
    <CreateTodo v-on:create-todo="addTodo()"/>
  </div>
  </v-main>
</v-app> 
</html> 
</template>

<script>
import CreateTodo from "./components/todoCreate";

export default {
  name : 'Todo',
  components: {
    CreateTodo
  },
  data() {
    return {
      
    };
  },
};
</script>