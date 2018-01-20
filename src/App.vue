<template>
  <div id="app">
      <h1 class="text-center">Todo List</h1>  
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.text-center{
  text-align: center;
}

.center{
  display: block;
  margin: 0 auto;
}

</style>
