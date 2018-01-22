<template>
<div>
  <input type="checkbox" :checked="task.done" :id="task._id" @click="toggleTask">
  <strong>{{task.title}}</strong>
  <button :data-id="task._id" @click="deleteTask">X</button>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Task",
  props: ['task'],
  data() {
    return {
      errors: []
    }
  },
  methods: {
    async toggleTask(e) {
      try {
        await axios.put(
          `http://localhost:5000/tareas/${e.target.id}`,
          { 
            done: e.target.checked 
          }
        );
      } catch (err) {
        this.errors.push(err);
      }
    },
    async deleteTask(e) {
      try {
        await axios.delete(`http://localhost:5000/tareas/${e.target.attributes['data-id'].value}`);
        e.target.parentElement.parentElement.innerHTML = '';
      } catch (err) {
        this.errors.push(err);
      }
    }
  }
};
</script>


<style scoped>

</style>
