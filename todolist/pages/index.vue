<template>
  <div id="todo">
    <h1>Todo App</h1>
    <CreateTodo v-on:create-todo="addTodo"/>
  </div>
</template>

<script>
import CreateTodo from "./components/todoCreate";

export default {
  components: {
    CreateTodo
  },
  data() {
    return {
      
    };
  },
  mounted() {
    if (localStorage.newTodoTitle) {
      this.newTodoTitle = localStorage.newTodoTitle;
    }
    if (localStorage.newTodoDescription) {
      this.newTodoDescription = localStorage.newTodoDescription;
    }
    if (localStorage.date) {
      this.date = localStorage.date
    }
    if (localStorage.getItem("todos")) {
      try {
        this.todos = JSON.parse(localStorage.getItem("todos"));
      } catch (e) {
        localStorage.removeItem("todos");
      }
    }
  },
  watch: {
    newTodoTitle(value) {
      localStorage.newTodoTitle = value;
    },
    newTodoDescription(value) {
      localStorage.newTodoDescription = value;
    },
    date(value){
      localStorage.date = value;
    },
  },
  methods: {
    //Fonction qui permet d'ajouter des todos
    addTodo(todo) {
      //if (!this.newTodo) return;
      this.todos.push(this.newTodo);
      //this.newTodo = "";
      //this.saveTodos();
    },
    //Fonction qui permet de sauvegarder une todo
    saveTodos() {
      let parsed = JSON.stringify(this.todos);
      localStorage.setItem("todos", parsed);
    },
    show() {
      this.display = true;
    },
    //Fonction qui permet de modifier une todo
  },
};
</script>