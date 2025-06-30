// 待办事项类型
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

// 画布对象类型
export interface CanvasObject {
  id: string
  type: 'rect' | 'circle' | 'text' | 'line'
  properties: any
}

// 用户类型
export interface User {
  id: string
  name: string
  email: string
}

// 主题类型
export type Theme = 'light' | 'dark'

// API响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
} 