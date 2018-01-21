<template>
  <main>
    <add-task></add-task>
     <ul>
      <li v-for="task in tasks">
        <input type="checkbox" 
               :checked="task.done" 
               :id="task._id" 
               @click="toggleTask">
        {{task.title}}
      </li>
    </ul>
  </main>
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
    }
  },
  created() {
    this.getTasks()
  },
  methods: {
    async toggleTask(event) {
      try {
        await axios.put(
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
