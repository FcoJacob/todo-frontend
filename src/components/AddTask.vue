<template>
  <input type="text" v-model="task.title" @keydown.enter="addTask">
</template>

<script>
import axios from "axios";

export default {
  name: "AddTask",
  data() {
    return {
      task: {
        title: ""
      }
    };
  },
  methods: {
    async addTask(event) {
      try {
        const response = await axios.post(
          `http://localhost:5000/tareas/`, 
          { 
            title: this.task.title 
          }
        );
        this.task.title = "";
      } catch (e) {
        this.errors.push(e);
      }
    }
  }
};
</script>


<style scoped>

</style>
