<template>
  <main>
    <add-task @new-task="addTaskToList" placeholder="Add new task"></add-task>
     <ul>
      <li v-for="task in tasks">
        <task :task="task" @edit-task="updateTasks"></task>
      </li>
    </ul>
  </main>
</template>

<script>
import AddTask from './AddTask.vue'
import Task from './Task.vue'
import axios from 'axios'

export default {
  name: 'TasksList',
  components: {
    'add-task': AddTask,
    'task': Task
  },
  data () {
    return {
      tasks: [],
      errors: []
    }
  },
  created () {
    this.getTasks()
  },
  methods: {
    async getTasks () {
      try {
        const { data } = await axios.get(`http://localhost:5000/tareas`);
        this.tasks = data.tasks
      } catch (e) {
        this.errors.push(e);
      }
    },
    addTaskToList(task){
      this.tasks.push(task)
    },
    updateTasks(updatedTask){
      this.tasks = this.tasks.map( task => {
        if( updatedTask._id === task._id ){
          return updatedTask
        } else {
          return task
        }
      });
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
  width: 100%;
}

li {
  list-style: none;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}
</style>
