<template>
  <div class="marge">
    <v-btn v-on:click="addTodo()">Add Todo</v-btn>
    <br />
    <div v-for="(todo, index) in todos" :key="index">
      <v-card class="marge">
        <v-row class="marge">
          <v-col cols="12" md="4" sm="6">
            <v-textarea label="Titre" filled type="text" v-model="todo.title" />
            <label>{{ todo.date | convertDate }}</label>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-textarea
              label="Description"
              filled
              type="text"
              v-model="todo.description"
            />
          </v-col>
          <v-col cols="12" md="2" sm="6">
            <v-btn small color="error" @click="deleteTodo(index)"
              >Remove todo</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.marge {
  margin: 15px;
}
</style>
<script lang="ts">
import {Component , Watch ,Vue } from 'vue-property-decorator';

@Component({
    /* modifier une donnée à l'affichage */
    filters : {
        convertDate : function(date : Date){
            let objDate = new Date(date)
            return objDate.toString();
        }
    }
})

export default class Todos extends Vue {

    todos : Array<object> =  [];
    todosCopy : Array<object> = [];

    @Watch('todos' , {deep:true})
    handler(value : string){
      this.saveTodos() !== undefined;
    }  

    mounted(){
        if(localStorage.todos)
            this.todos = JSON.parse(localStorage.todos)
        else
            this.todos = []

        /* fonction map pour itérer sur les valeurs du tableau - x correspond à l'élément du tableau , "=>" applique la modification
           {...x} permet de copier les références des objets du tableau */

        this.todosCopy = this.todos.map(x => ({...x}));
    }
        // ajoute une Todo
        addTodo() : void {
            this.todos.push({
                title: '',
                description: '',
                date : Date.now()
            })
            this.todosCopy = this.todos.map(x => ({...x}));
            this.updateLocalStorage()
        }
        
        // fonction qui permet de comparer les valeurs de la todosCopy et de todos
        getTodoIDchanged() : string | undefined {
            for(let index in this.todos){
                let todo = this.todos[index];
                for(let indexTodo in todo){
                   if(todo[indexTodo] !== this.todosCopy[index][indexTodo]){
                        return index;
                    }
                }
            }
        }

        // sauvegarde la Todo
        saveTodos() : void {
                let indexChanged = this.getTodoIDchanged()!   
                if(typeof indexChanged !== "undefined"){
                this.$set(this.todos[indexChanged as any],"date", Date.now());
                this.updateLocalStorage()
                }
        }

        // met à jour le localStorage
        updateLocalStorage() : void {
            let parsed = JSON.stringify(this.todos);
            localStorage.setItem('todos', parsed);
        }

        // supprime une todo
        deleteTodo(index : number) : void {
            this.todos.splice(index,1)
            this.todosCopy = this.todos.map(x => ({...x}));
            this.updateLocalStorage()
        }

    }
</script>
