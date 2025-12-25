import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ITodo } from '../types/todo'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<ITodo[]>([])
  const loading = ref(false)

  const fetchTodos = async () => {
    loading.value = true
    try {
      const { data } = await useFetch<ITodo[]>('/api/todos')
      if (data.value) {
        todos.value = data.value
      }
      console.log(todos.value,'dsds')
    } catch (e) {
      console.error('Failed to fetch', e)
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (title: string) => {
    try {
      const { data } = await useFetch<ITodo>('/api/todos', {
        method: 'POST',
        body: { title }
      })
      if (data.value) {
        todos.value.unshift(data.value)
      }
    } catch (e) {
      console.error('Failed to add', e)
    }
  }

  const toggleTodo = async (todo: ITodo) => {
    // Optimistic update
    todo.completed = !todo.completed
    try {
      await useFetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        body: { completed: todo.completed }
      })
    } catch (e) {
      todo.completed = !todo.completed // Revert
      console.error('Failed to toggle', e)
    }
  }

  const removeTodo = async (id: string) => {
    const original = [...todos.value]
    todos.value = todos.value.filter(t => t.id !== id)
    try {
      await useFetch(`/api/todos/${id}`, { method: 'DELETE' })
    } catch (e) {
      todos.value = original
      console.error('Failed to delete', e)
    }
  }

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo
  }
})
