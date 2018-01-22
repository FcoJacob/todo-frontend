<template>
  <main>
    <add-task @new-task="getTasks"></add-task>
     <ul>
      <li v-for="task in tasks">
        <task :task="task"></task>
      </li>
    </ul>
  </main>
</template>

<script>
import AddTask from "./AddTask.vue";
import Task from "./Task.vue";
import axios from "axios";

export default {
  name: "TasksList",
  components: {
    "add-task": AddTask,
    "task": Task
  },
  data() {
    return {
      tasks: [],
      errors: []
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      try {
        const { data } = await axios.get(`http://localhost:5000/tareas`);
        this.tasks = data.tasks;
      } catch (e) {
        this.errors.push(e);
      }
    }
  }
};
</script>


<style scoped>
ul{
  -webkit-margin-before: 0px;
  -webkit-margin-after: 0px;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  -webkit-padding-start: 0px;
}

li {
  list-style: none;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
