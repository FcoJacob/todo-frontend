<template>
  <form @submit="submit">
    <input type="text" 
           v-model="task.title" 
           :placeholder="placeholder"
           autofocus>
    <button v-if="!simple" type="submit"> + </button>
  </form>

</template>

<script>
import axios from "axios";

export default {
  name: "AddTask",
  props: ['simple', 'placeholder', 'editMode'],
  data(){
    return {
      task: {
        title: ""
      },
      errors: []
    };
  },
  methods: {
    async submit(e){
      if(!!this.editMode) {
        this.updateTask(e);
      } else {
        this.addTask(e);
      }
    },
    async addTask(e){
      try {
        let result = await axios.post(
          `http://localhost:5000/tareas/`, 
          { 
            title: this.task.title 
          }
        );
        this.task.title = "";
        this.$emit('new-task', result.data.newTask);
      } catch (e) {
        this.errors.push(e);
      }
    },
    async updateTask(e){
      try {
        let { data } = await axios.put(
          `http://localhost:5000/tareas/${e.target.attributes['data-id'].value}`,
          { 
            title: this.task.title 
          }
        );
        this.$emit('edit-task', {...data.task, ...this.task});
      } catch (e) {
        this.errors.push(e);
      }
    }
  }
};
</script>


<style scoped>
  form{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }

  input{
    width: 100%;
  }
</style>
