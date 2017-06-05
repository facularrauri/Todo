<template lang="html">
  <div id="home">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <h2>Tareas</h2>
          <ul class="list-group tasks">
          <li is="app-task" v-for="(task, index) in tasks" :task="task" :index="index"
            @remove="deleteTask" @edit="editTask">
          </li>
          </ul>
          <form @submit.prevent="createTask" class="form-inline">
            <input v-model="new_task" type="text" name="nombre" id="in" class="form-control" required>
            <button type="submit" class="btn btn-primary">Create</button>
          </form>
          <div class="">
            <a @click="deleteCompleted">Delete All</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'home',
  components: {
    'app-task': Task
  },

  created() {
    this.tasks = JSON.parse(localStorage.getItem('tasks'))
  },

  methods: {
    createTask(){
      const task = {
        description : this.new_task,
        pending     : true,
        editing     : false
      };

      this.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      this.new_task = '';
    },
    deleteCompleted(){
      this.tasks = this.tasks.filter(function (task) {
        return task.pending;
      });
    },

    deleteTask(index){
      this.tasks.splice(index, 1);
    },

    editTask(index){
      this.tasks[index].editing = true
    },

  },
  data () {
    return {
      new_task : '', // newTask
      draft : '',
      tasks: []
    }
  }
}
</script>

<style lang="css">
span.glyphicon-ok{
  float: right;

}
span.glyphicon-edit{
  float: right;
}
span.glyphicon-trash{
  float: right;
  margin-right: 1px;
}
span.glyphicon-remove{
  float: right;
  margin-right: 1px;
}
input{
  border: none;
  outline:0px;
  width: 94%;
}
#in{
  width: 90.75%;
}
.completed{
  text-decoration: line-through;
}
</style>
