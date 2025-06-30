import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Todo } from '@/types'
import { generateId } from '@/lib/utils'

interface TodoState {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, text: string) => void
  clearCompleted: () => void
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        
        addTodo: (text: string) => {
          const newTodo: Todo = {
            id: generateId(),
            text,
            completed: false,
            createdAt: new Date(),
          }
          set((state) => ({
            todos: [...state.todos, newTodo],
          }))
        },
        
        toggleTodo: (id: string) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          }))
        },
        
        deleteTodo: (id: string) => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          }))
        },
        
        updateTodo: (id: string, text: string) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, text } : todo
            ),
          }))
        },
        
        clearCompleted: () => {
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
          }))
        },
      }),
      {
        name: 'todo-store',
        // 只持久化 todos 数组
        partialize: (state) => ({ todos: state.todos }),
      }
    ),
    {
      name: 'todo-store',
    }
  )
) 