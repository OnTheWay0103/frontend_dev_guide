'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTodoStore } from '@/store/todoStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatDate } from '@/lib/utils'

const TodoList: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } = useTodoStore()
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  const handleEdit = (todo: { id: string; text: string }) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      updateTodo(id, editText.trim())
      setEditingId(null)
      setEditText('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">待办事项</h1>
        
        {/* 添加新待办事项 */}
        <form onSubmit={handleAddTodo} className="mb-6">
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="添加新的待办事项..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newTodo.trim()}>
              添加
            </Button>
          </div>
        </form>

        {/* 统计信息 */}
        {todos.length > 0 && (
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <span>已完成 {completedCount} / {totalCount}</span>
            {completedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompleted}>
                清除已完成
              </Button>
            )}
          </div>
        )}

        {/* 待办事项列表 */}
        <div className="space-y-2">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                
                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(todo.id)
                        if (e.key === 'Escape') handleCancelEdit()
                      }}
                      autoFocus
                    />
                    <Button size="sm" onClick={() => handleSaveEdit(todo.id)}>
                      保存
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                      取消
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div
                      className={`${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      } cursor-pointer`}
                      onClick={() => handleEdit(todo)}
                    >
                      {todo.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDate(todo.createdAt)}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(todo)}
                    disabled={editingId === todo.id}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    删除
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            暂无待办事项，开始添加吧！
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TodoList 