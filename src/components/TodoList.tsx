'use client'

import React, { useState, useEffect } from 'react'
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

  // 🔧 调试技巧 0: 组件初始化时立即暴露数据
  console.log('🚀 TodoList 组件已加载')
  if (typeof window !== 'undefined') {
    ;(window as any).debugTodos = todos
    ;(window as any).debugTodoStore = { todos, editingId, newTodo }
    ;(window as any).debugTodoList = () => {
      console.log('📋 当前待办事项状态:')
      console.log('- todos:', todos)
      console.log('- editingId:', editingId)
      console.log('- newTodo:', newTodo)
      console.log('- 总数:', todos.length)
      console.log('- 已完成:', todos.filter(t => t.completed).length)
      return { todos, editingId, newTodo }
    }
    
    // 🔧 调试技巧 7: 为 React DevTools 添加自定义数据
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      try {
        ;(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.debugData = {
          todos,
          editingId,
          newTodo,
          timestamp: new Date().toISOString()
        }
      } catch (error) {
        console.log('React DevTools 调试数据设置失败:', error)
      }
    }
    
    console.log('🌐 初始数据已暴露到全局')
    console.log('💡 使用 window.debugTodoList() 查看当前状态')
    console.log('🔧 React DevTools 中可以看到自定义调试数据')
  }

  // 🔧 调试技巧 1: 使用 useEffect 监控状态变化
  useEffect(() => {
    try {
      console.log('🔄 TodoList 状态更新:', {
        todosCount: todos.length,
        todos: todos,
        editingId,
        newTodo
      })
      
      // 🔧 调试技巧 6: 将数据暴露到全局作用域，方便在 Console 中调试
      if (typeof window !== 'undefined') {
        ;(window as any).debugTodos = todos
        ;(window as any).debugTodoStore = { todos, editingId, newTodo }
        ;(window as any).debugTodoList = () => {
          console.log('📋 当前待办事项状态:')
          console.log('- todos:', todos)
          console.log('- editingId:', editingId)
          console.log('- newTodo:', newTodo)
          console.log('- 总数:', todos.length)
          console.log('- 已完成:', todos.filter(t => t.completed).length)
          return { todos, editingId, newTodo }
        }
        
        // 🔧 调试技巧 10: 错误监控
        ;(window as any).debugError = (error: any) => {
          console.error('🚨 捕获到错误:', error)
          console.log('📊 错误发生时的状态:', {
            todos: todos.length,
            editingId,
            newTodo,
            timestamp: new Date().toISOString()
          })
        }
        
        // 🔧 调试技巧 11: 安全的 React DevTools 数据设置
        if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          try {
            ;(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.debugData = {
              todos,
              editingId,
              newTodo,
              timestamp: new Date().toISOString()
            }
          } catch (error) {
            console.log('React DevTools 调试数据更新失败:', error)
          }
        }
        
        console.log('🌐 数据已暴露到全局，可在 Console 中使用:')
        console.log('- window.debugTodos - 查看所有待办事项')
        console.log('- window.debugTodoStore - 查看完整状态')
        console.log('- window.debugError(error) - 报告错误')
      }
    } catch (error) {
      console.error('❌ useEffect 执行出错:', error)
      if (typeof window !== 'undefined' && (window as any).debugError) {
        ;(window as any).debugError(error)
      }
    }
  }, [todos, editingId, newTodo])

  // 🔧 调试技巧 2: 在函数中添加调试日志
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📝 尝试添加待办事项:', newTodo)
    
    // 🔧 调试技巧 8: 模拟网络请求调试
    const startTime = performance.now()
    console.log('🌐 开始处理添加请求...')
    
    if (newTodo.trim()) {
      console.log('✅ 添加待办事项成功:', newTodo.trim())
      addTodo(newTodo.trim())
      setNewTodo('')
      
      const endTime = performance.now()
      console.log(`⏱️ 请求处理时间: ${(endTime - startTime).toFixed(2)}ms`)
      
      // 🔧 调试技巧 9: 性能监控
      if (typeof window !== 'undefined') {
        ;(window as any).lastAddTodoTime = endTime - startTime
        ;(window as any).addTodoCount = ((window as any).addTodoCount || 0) + 1
      }
    } else {
      console.warn('⚠️ 待办事项为空，未添加')
    }
  }

  const handleEdit = (todo: { id: string; text: string }) => {
    console.log('✏️ 开始编辑待办事项:', todo)
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const handleSaveEdit = (id: string) => {
    console.log('💾 尝试保存编辑:', { id, editText })
    
    if (editText.trim()) {
      console.log('✅ 保存编辑成功')
      updateTodo(id, editText.trim())
      setEditingId(null)
      setEditText('')
    } else {
      console.warn('⚠️ 编辑内容为空，未保存')
    }
  }

  const handleCancelEdit = () => {
    console.log('❌ 取消编辑')
    setEditingId(null)
    setEditText('')
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  // 🔧 调试技巧 3: 性能监控
  console.log('📊 待办事项统计:', { completedCount, totalCount, completionRate: totalCount > 0 ? (completedCount / totalCount * 100).toFixed(1) + '%' : '0%' })

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-hover"
      >
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
            待办事项
          </h1>
          <p className="text-gray-600 text-responsive">
            管理你的任务，提高工作效率
          </p>
        </div>
        
        {/* 🔧 调试技巧 4: 添加调试信息显示 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-600">🐛</span>
              <strong className="text-yellow-800">调试模式</strong>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <span className="badge-primary">总数: {totalCount}</span>
              <span className="badge-success">已完成: {completedCount}</span>
              <span className="badge-warning">编辑中: {editingId || '无'}</span>
            </div>
          </div>
        )}
        
        {/* 添加新待办事项 */}
        <form onSubmit={handleAddTodo} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="添加新的待办事项..."
                className="pr-12"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-sm">{newTodo.length}/100</span>
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={!newTodo.trim()}
              className="sm:w-auto min-w-[120px]"
            >
              <span className="flex items-center gap-2">
                <span>✨</span>
                <span>添加</span>
              </span>
            </Button>
          </div>
        </form>

        {/* 统计信息 */}
        {todos.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{totalCount}</div>
                <div className="text-xs text-gray-600">总任务</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-xs text-gray-600">已完成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-600">完成率</div>
              </div>
            </div>
            {completedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompleted} className="text-red-600 hover:text-red-700">
                <span className="flex items-center gap-1">
                  <span>🗑️</span>
                  <span>清除已完成</span>
                </span>
              </Button>
            )}
          </div>
        )}

        {/* 待办事项列表 */}
        <div className="space-y-3">
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-white/80 hover:border-primary-200 transition-all duration-300 hover:shadow-medium"
                // 🔧 调试技巧 5: 添加 data 属性便于调试
                data-todo-id={todo.id}
                data-todo-completed={todo.completed}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    {/* 复选框 */}
                    <div className="flex-shrink-0 pt-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => {
                          console.log('☑️ 切换待办事项状态:', { id: todo.id, newStatus: !todo.completed })
                          toggleTodo(todo.id)
                        }}
                        className="w-5 h-5 text-primary-600 rounded-lg focus:ring-primary-500 focus:ring-2 transition-all duration-200 transform hover:scale-110"
                      />
                    </div>
                    
                    {/* 内容区域 */}
                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <div className="space-y-3">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(todo.id)
                              if (e.key === 'Escape') handleCancelEdit()
                            }}
                            autoFocus
                            className="text-lg"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleSaveEdit(todo.id)} className="bg-green-600 hover:bg-green-700">
                              <span className="flex items-center gap-1">
                                <span>💾</span>
                                <span>保存</span>
                              </span>
                            </Button>
                            <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                              <span className="flex items-center gap-1">
                                <span>❌</span>
                                <span>取消</span>
                              </span>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className={`text-lg font-medium cursor-pointer transition-all duration-200 ${
                              todo.completed 
                                ? 'line-through text-gray-500 opacity-75' 
                                : 'text-gray-900 hover:text-primary-600'
                            }`}
                            onClick={() => handleEdit(todo)}
                          >
                            {todo.text}
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <span>🕒</span>
                              <span>{formatDate(todo.createdAt)}</span>
                            </div>
                            {todo.completed && (
                              <span className="badge-success">
                                <span className="mr-1">✅</span>
                                已完成
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(todo)}
                        disabled={editingId === todo.id}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <span className="text-lg">✏️</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          console.log('🗑️ 删除待办事项:', todo)
                          deleteTodo(todo.id)
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <span className="text-lg">🗑️</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无待办事项</h3>
            <p className="text-gray-500 mb-6">开始添加你的第一个任务吧！</p>
                         <div className="text-sm text-gray-400">
               💡 提示：点击上方的输入框，输入任务内容后点击&ldquo;添加&rdquo;按钮
             </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TodoList 