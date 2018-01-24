<template>
<div>
  <input type="checkbox" :checked="task.done" :id="task._id" @click="toggleTask">
  <div @dblclick="toggleEditMode">
    <add-task v-if="editMode"
              @edit-task="toggleEditMode" 
              :placeholder="task.title"
              :data-id="task._id" 
              simple="true"
              edit-mode="true">
    </add-task>
    <strong v-else >{{task.title}}</strong>
  </div>
  <button :data-id="task._id" @click="deleteTask">X</button>
</div>
</template>

<script>
import axios from "axios"
import AddTask from './AddTask.vue'

export default {
  name: "Task",
  props: ['task'],
   components: {
    'add-task': AddTask
  },
  data() {
    return {
      editMode: false,
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
    },
    toggleEditMode(task){
      if(!!task) {
        this.$emit('edit-task',task);
      }
      this.editMode = !this.editMode;

    }
  }
};
</script>


<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
