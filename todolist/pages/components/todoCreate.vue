<template>
    <div class="marge">
        <v-btn v-on:click="addTodo()">Add Todo</v-btn>
        <br>
            <div v-for="(todo,index) in todos">
                <v-card class="marge">
                    <v-row class="marge">
                        <v-col cols="12" md="4" sm="6">
                            <v-textarea label="Titre" filled type="text" v-model="todo.title" />
                            <label>{{date}}</label>
                        </v-col>
                        <v-col cols="12" md="6" sm="6"> 
                            <v-textarea label="Description" filled  type="text" v-model="todo.description" />
                        </v-col>  
                        <v-col cols="12" md="2" sm="6">
                            <v-btn small color="error" @click="deleteTodo(index)">Remove todo</v-btn>
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
<script>
export default {
    data() {
        return {
            todos : [],
            todosCopy :  [],
            //todoTitle : "",
            //todoDescription : "",
            date : new Date()
        }
    },
    watch : {
        todos : {
            handler: function(value){
                
                this.todosCopy =  [...this.todos];
                localStorage.setItem('todos', JSON.stringify(this.todos));
                /*for(let key in value){
                    console.log(value[key].title)
                    console.log(this.todosCopy[key].title);
                    if(value[key] === this.todosCopy[key]){*/
                        this.date = new Date()
            },
            deep : true
        },
    },
    mounted() {
        if(localStorage.todos) this.todos = localStorage.todos;
        if (localStorage.getItem('todos')) {
            try {
                this.todos = JSON.parse(localStorage.getItem('todos'));
            } catch(e){
                localStorage.removeItem('todos');
            }
        }
    },
    methods: {
        addTodo(){
            this.todos.push({
                title: '',
                description: '',
            })
        },
        saveTodos(){
            let parsed = JSON.stringify(this.todos);
            localStorage.setItem('todos', parsed);
        },
        deleteTodo(index){
            this.todos.splice(index,1)
        },
    }

}
</script>