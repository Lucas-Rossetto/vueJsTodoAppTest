<template>
    <div class="marge">
        <v-btn v-on:click="addTodo()">Add Todo</v-btn>
        <br>
            <div v-for="(todo,index) in todos">
                <v-card class="marge">
                    <v-row class="marge">
                        <v-col cols="12" md="4" sm="6">
                            <v-textarea label="Titre" filled type="text" v-model="todo.title" />
                            <label>{{todo.date}}</label>
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
            todosCopy : []
        }
    },
    watch : {
        todos : {
            handler: function(value){
                this.saveTodos();
            },
            deep : true
        },
    },
    beforeCreate(){
        if (localStorage.getItem('todos')) {
            try {
                this.todos = JSON.parse(localStorage.getItem('todos'));
            } catch(e){
                localStorage.removeItem('todos');
            }
        } else 
            this.todos = [];
        this.todosCopy = [...this.todos];
    },
    methods: {
        addTodo(){
            this.todos.push({
                title: '',
                description: '',
                date : ''
            })
            this.todosCopy = [...this.todos]
        },
        getTodoIDchanged(){
            for(let index in this.todos){
                let todo = this.todos[index];
                for(let indexTodo in todo){
                    if(typeof this.todosCopy[index][indexTodo] !== "undefined" && todo[indexTodo] !== this.todosCopy[index][indexTodo]){
                        return index;
                    }
                }
            }
        },
        saveTodos(){
            let indexChanged = this.getTodoIDchanged();
            console.log(indexChanged)
            console.log(this.todos)
            console.log(this.todosCopy)

            if(typeof indexChanged !== "undefined"){
                this.$set(this.todos[indexChanged],"date", new Date());
                let parsed = JSON.stringify(this.todos);
                localStorage.setItem('todos', parsed);
                this.todosCopy = [...this.todos]
            }
        },
        deleteTodo(index){
            this.todos.splice(index,1)
            this.todosCopy = [...this.todos]
        },
    },
}
</script>