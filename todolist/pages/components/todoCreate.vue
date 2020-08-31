<!--template>
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
</template-->
<style scoped>
.marge {
  margin: 15px;
}
</style>
<script lang="ts">
"use strict";
import { Component, Watch, Vue } from "vue-property-decorator";
import { VNode } from "vue";
import { CreateElement } from "vue/types/umd";

interface Todo {
  title: string;
  description: string;
  date: number;
}

interface TodosCopy {
  title: string;
  description: string;
  date: number;
}

export default class Todos extends Vue {
  todos: Todo[] = [];
  todosCopy: TodosCopy[] = [];

  render(createElement: CreateElement): VNode {
    const self = this;
    const convertDate = function(num : number) {
        const objDate = new Date(num);
        return objDate.toString();
    }

    const buttonAdd = createElement(
      "v-btn",
      {
        on: {
          click: this.addTodo,
        },
      },
      "Add todo"
    );

    const divVfor = createElement(
      "div",
      this.todos.map(function(todo, index) {
        return createElement(
          "v-card",
          {
            class: {
              marge: true,
            },
          },
          [
            createElement(
              "v-row",
              {
                class: {
                  marge: true,
                },
              },
              [
                createElement(
                  "v-col",
                  {
                    props: {
                      cols: 12,
                      md: 4,
                      sm: 6,
                    },
                  },
                  [
                    createElement("v-textarea", {
                      props: {
                        label: "Titre",
                        filled: true,
                        type: "text",
                        value: todo.title,
                      },
                      on: {
                        input: function(value: any) {
                          todo.title = value;
                        },
                      },
                    }),
                    createElement("label", convertDate(todo.date)),
                  ]
                ),
                createElement(
                  "v-col",
                  {
                    props: {
                      cols: 12,
                      md: 6,
                      sm: 6,
                    },
                  },
                  [
                    createElement("v-textarea", {
                      props: {
                        label: "Description",
                        filled: true,
                        type: "text",
                        value: todo.description,
                      },
                      on: {
                        input: function(value: any) {
                          todo.description = value;
                        },
                      },
                    }),
                  ]
                ),
                createElement(
                  "v-col",
                  {
                    props: {
                      cols: 12,
                      md: 2,
                      sm: 6,
                    },
                  },
                  [
                    createElement(
                      "v-btn",
                      {
                        props: {
                          small: true,
                          color: "error",
                        },
                        on: {
                          click : self.deleteTodo
                        },
                      },
                      "Remove Todo"
                    ),
                  ]
                ),
              ]
            ),
          ]
        );
      })
    );

    return createElement(
      "div",
      {
        class: {
          marge: true,
        },
      },
      [buttonAdd, divVfor]
    );
  }

  @Watch("todos", { deep: true })
  handler(value: string) {
    this.saveTodos();
  }

  mounted() {
    if (localStorage.todos) this.todos = JSON.parse(localStorage.todos);
    else this.todos = [];

    /* fonction map pour itérer sur les valeurs du tableau - x correspond à l'élément du tableau , "=>" applique la modification
           {...x} permet de copier les références des objets du tableau */

    this.todosCopy = this.todos.map((x) => ({ ...x }));
  }

  // ajoute une Todo
  addTodo(): void {
    this.todos.push({
      title: "",
      description: "",
      date: Date.now(),
    });
    this.todosCopy = this.todos.map((x) => ({ ...x }));
    this.updateLocalStorage();
  }

  // fonction qui permet de comparer les valeurs de la todosCopy et de todos
  getTodoIDchanged(): string | undefined {
    for (let index in this.todos) {
      let todo = this.todos[index];
      for (let indexTodo in todo) {
        if (todo[indexTodo] !== this.todosCopy[index][indexTodo]) {
          return index;
        }
      }
    }
  }

  // sauvegarde la Todo
  saveTodos(): void {
    let indexChanged = this.getTodoIDchanged()!;
    if (typeof indexChanged !== "undefined") {
      this.$set(this.todos[indexChanged as any], "date", Date.now());
      this.updateLocalStorage();
    }
  }

  // met à jour le localStorage
  updateLocalStorage(): void {
    let parsed = JSON.stringify(this.todos);
    localStorage.setItem("todos", parsed);
  }

  // supprime une todo
  deleteTodo(index: number): void {
    this.todos.splice(index, 1);
    this.todosCopy = this.todos.map((x) => ({ ...x }));
    this.updateLocalStorage();
  }
}
</script>
