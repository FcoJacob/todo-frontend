<template>
  <div>
    <add-task></add-task>
    <ul>
      <li v-for="task in tasks">
        <input type="checkbox" :checked="task.done" :id="task._id" @click="toggleTask">
        {{task.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import AddTask from "./AddTask.vue";
import axios from "axios";

export default {
  name: "TasksList",
  components: {
    "add-task": AddTask
  },
  data() {
    return {
      tasks: [],
      errors: []
    };
  },
  created: function() {
    this.getTasks();
  },
  methods: {
    async toggleTask(event) {
      try {
        const response = await axios.put(
          `http://localhost:5000/tareas/${event.target.id}`,
          { 
            done: event.target.checked 
          }
        );
        this.getTasks();
      } catch (e) {
        this.errors.push(e);
      }
    },
    async getTasks() {
      try {
        const response = await axios.get(`http://localhost:5000/tareas`);
        this.tasks = response.data.tasks;
      } catch (e) {
        return e;
      }
    }
  }
};
</script>


<style scoped>
li {
  list-style: none;
}

ul {
  margin: 0 auto;
}
</style>
