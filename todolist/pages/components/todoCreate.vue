<template>
    <div>
        <button v-on:click="addTodo()">Add Todo</button>
     <div v-for="(todo,index) in todos">
        <div>
          <label>titre</label>
          <input type="text" v-model="todo.title" />
        </div>
        <div>
          <label>description</label>
          <input type="text" v-model="todo.description" />
        </div>
        <div>
          <label>{{date}}</label>
        </div>
            <button @click="deleteTodo(index)">Remove todo</button>
        </div>
     </div>
   </div>
</template>

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
                localStorage.setItem('todos', JSON.stringify(this.todos));
                this.todosCopy =  [...this.todos];
                for(let key in value){
                    console.log(value[key].title)
                    console.log(this.todosCopy[key].title);
                    if(value[key] !== this.todosCopy[key]){
                        this.date = new Date()
                    }
                }
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
                localStorage.deleteTodo('todos');
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
            this.saveTodos();
        },
    }

}
</script>