<template>
  <li class="list-group-item" :class="{editing: task.editing, completed: !task.pending}">
    <a @click="toggleStatus()">
      <span class="chb">
        <app-icon :img="task.pending ? 'unchecked' : 'check'" aria-hidden="true"></app-icon>
      </span>
    </a>

    <span v-if="!task.editing">
      <span class="description">{{ task.description }}</span>
      <a @click="remove()">
        <app-icon img="trash"></app-icon>

      </a>
      <a @click="editTask()">
        <app-icon img="edit"></app-icon>

      </a>
    </span>

    <span v-else>
      <input type="text" v-model="draft">
      <a @click="discardTask()">
        <app-icon img="remove"></app-icon>

      </a>
      <a @click="updateTask()">
        <app-icon img="ok"></app-icon>

      </a>
    </span>
  </li>
</template>

<script>
import icon from './icon.vue'
import EventBus from './event-bus.js'

export default {
  name: 'Task',

  props: ['task','index'],

  components:{
    'app-icon': icon
  },

  created(){
      EventBus.$on('editing', function (index) {
          if (this.index != index) {
            console.log('Discarding: ' + this.index);
            this.discardTask();
          }
      }.bind(this));
  },

  methods: {
    remove(){
      if (this.task.pending) { return }

      this.$emit('remove', this.index);
    },

    toggleStatus() {
      this.task.pending = !this.task.pending;
      this.task.editing = false;
    },


    editTask() {
      if (!this.task.pending) { return }

      EventBus.$emit('editing', this.index)

      this.$emit('edit', this.index);
      this.draft = this.task.description;
    },
    updateTask() {
        this.task.description = this.draft;
        this.task.editing = false;
    },
    discardTask() {
        this.task.editing = false;
    }
  }
}
</script>

<style scoped>

.completed {
  background: #ccc;
}

a span.chb span {
  cursor: pointer;
}

.completed a span {
  cursor: not-allowed;
}

</style>
