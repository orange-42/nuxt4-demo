<template>
  <div>
    <!-- Input Area -->
    <div class="flex gap-3 mb-6">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="uil:plus-circle" class="text-gray-400 text-xl" />
        </div>
        <input 
          v-model="newTodoTitle"
          @keyup.enter="handleAdd"
          type="text" 
          placeholder="What needs to be done?" 
          class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
          :class="{ 'opacity-50': store.loading }"
        />
      </div>
      <button 
        @click="handleAdd"
        :disabled="!newTodoTitle.trim() || store.loading"
        class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <span>Add</span>
      </button>
      <button 
        @click="handleRefresh"
        :disabled="store.loading"
        class="bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 text-gray-600 px-4 rounded-xl transition-all duration-200 flex items-center justify-center"
        title="Refresh list"
      >
        <Icon name="uil:sync" class="text-xl" :class="{ 'animate-spin': store.loading }" />
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'pending' || store.loading" class="py-12 text-center text-gray-500">
      <Icon name="svg-spinners:ring-resize" class="w-8 h-8 mx-auto mb-2 text-indigo-500" />
      <p>Loading todos...</p>
    </div>

    <!-- Todo List -->
    <ul v-else-if="store.todos.length > 0" class="space-y-3">
      <TransitionGroup name="list">
        <li 
          v-for="todo in store.todos" 
          :key="todo.id"
          class="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
        >
          <div class="flex items-center gap-4 flex-1 min-w-0">
            <button 
              @click="store.toggleTodo(todo)"
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
              :class="todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-indigo-500'"
            >
              <Icon v-if="todo.completed" name="uil:check" class="text-white w-4 h-4" />
            </button>
            <span 
              class="text-lg truncate cursor-pointer select-none transition-colors duration-200"
              :class="todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'"
              @click="store.toggleTodo(todo)"
            >
              {{ todo.title }}
            </span>
          </div>
          
          <button 
            @click="store.removeTodo(todo.id)"
            class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 rounded-lg hover:bg-red-50"
            title="Delete todo"
          >
            <Icon name="uil:trash-alt" class="w-5 h-5" />
          </button>
        </li>
      </TransitionGroup>
    </ul>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="uil:clipboard-notes" class="w-8 h-8 text-indigo-500" />
      </div>
      <h3 class="text-gray-900 font-medium text-lg">No tasks yet</h3>
      <p class="text-gray-500 mt-1">Add a task to get started on your day!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import { ref } from 'vue'

const store = useTodoStore()
const newTodoTitle = ref('')

// Server-side fetching
const { status } = await useAsyncData('todos', () => store.fetchTodos())

const handleAdd = async () => {
  if (!newTodoTitle.value.trim()) return
  await store.addTodo(newTodoTitle.value)
  newTodoTitle.value = ''
}

const handleRefresh = async () => {
  await store.fetchTodos()
}
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
