'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import TodoList from '@/components/TodoList'
import CanvasEditor from '@/components/CanvasEditor'
import RadixUIDemo from '@/components/RadixUIDemo'
import HeadlessUIDemo from '@/components/HeadlessUIDemo'
import { Button } from '@/components/ui/Button'

type TabType = 'todo' | 'canvas' | 'radix' | 'headless' | 'about'

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('todo')
  const { theme, toggleTheme } = useThemeStore()

  const tabs = [
    { id: 'todo' as TabType, label: '待办事项', icon: '📝' },
    { id: 'canvas' as TabType, label: 'Canvas 画板', icon: '🎨' },
    { id: 'radix' as TabType, label: 'Radix UI', icon: '🧩' },
    { id: 'headless' as TabType, label: 'Headless UI', icon: '🎯' },
    { id: 'about' as TabType, label: '关于项目', icon: 'ℹ️' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'todo':
        return <TodoList />
      case 'canvas':
        return <CanvasEditor />
      case 'radix':
        return <RadixUIDemo />
      case 'headless':
        return <HeadlessUIDemo />
      case 'about':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">关于项目</h1>
              
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">前端框架</h3>
                    <ul className="text-blue-800 space-y-1">
                      <li>• Next.js 14 (App Router)</li>
                      <li>• TypeScript 5.3</li>
                      <li>• React 18.2</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">样式与动画</h3>
                    <ul className="text-green-800 space-y-1">
                      <li>• Tailwind CSS 3.4</li>
                      <li>• Framer Motion</li>
                      <li>• CSS 动画</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">状态管理</h3>
                    <ul className="text-purple-800 space-y-1">
                      <li>• Zustand</li>
                      <li>• React Hooks</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2">UI 组件</h3>
                    <ul className="text-orange-800 space-y-1">
                      <li>• Radix UI</li>
                      <li>• Headless UI</li>
                      <li>• 自定义组件</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4">功能模块</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">📝 待办事项</h3>
                    <p className="text-gray-600">
                      使用 Zustand 进行状态管理，支持添加、编辑、删除、标记完成等操作。
                      包含 Framer Motion 动画效果和响应式设计。
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">🎨 Canvas 画板</h3>
                    <p className="text-gray-600">
                      基于 Fabric.js 的 Canvas 编辑器，支持绘制矩形、圆形、文字、直线等图形。
                      包含撤销/重做功能和图片导出功能。
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">🧩 Radix UI 组件</h3>
                    <p className="text-gray-600">
                      展示 Radix UI 的各种组件，包括对话框、下拉菜单、标签页、工具提示、通知等。
                      所有组件都支持无障碍访问。
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">🎯 Headless UI 组件</h3>
                    <p className="text-gray-600">
                      展示 Headless UI 的无样式组件，包括选择器、下拉菜单等。
                      完全可定制的样式，与 Tailwind CSS 完美配合。
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4 mt-8">学习要点</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Next.js 14 App Router 的使用</li>
                  <li>• TypeScript 类型定义和类型安全</li>
                  <li>• Tailwind CSS 3.x 的响应式设计</li>
                  <li>• Framer Motion 动画库的使用</li>
                  <li>• Zustand 状态管理的最佳实践</li>
                  <li>• Radix UI 和 Headless UI 的无障碍组件</li>
                  <li>• Fabric.js Canvas API 的集成</li>
                  <li>• 现代前端开发工具链的配置</li>
                </ul>
              </div>
            </motion.div>
          </div>
        )
      default:
        return <TodoList />
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                前端学习项目
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="flex items-center gap-2"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
                {theme === 'dark' ? '浅色' : '深色'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 标签导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <main className="bg-gray-50 min-h-screen">
        {renderContent()}
      </main>
    </div>
  )
}

export default HomePage 