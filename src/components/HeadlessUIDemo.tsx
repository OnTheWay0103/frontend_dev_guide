'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Listbox, Transition } from '@headlessui/react'
import { Button } from '@/components/ui/Button'

const HeadlessUIDemo: React.FC = () => {
  const [selected, setSelected] = useState('选项1')
  const [isOpen, setIsOpen] = useState(false)

  const options = ['选项1', '选项2', '选项3', '选项4']

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Headless UI 组件演示</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Listbox 选择器 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Listbox 选择器</h2>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <span className="block truncate">{selected}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.04l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option) => (
                      <Listbox.Option
                        key={option}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                          }`
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {option}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <p className="mt-2 text-sm text-gray-600">当前选择: {selected}</p>
          </div>

          {/* 自定义下拉菜单 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">自定义下拉菜单</h2>
            <div className="relative">
              <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
                打开菜单
              </Button>
              
              <Transition
                show={isOpen}
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      菜单项 1
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      菜单项 2
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      菜单项 3
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        {/* 说明 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Headless UI 特点：</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 完全无样式的组件，只提供功能和可访问性</li>
            <li>• 与 Tailwind CSS 完美配合</li>
            <li>• 支持键盘导航和屏幕阅读器</li>
            <li>• 提供完整的 ARIA 属性</li>
            <li>• 支持自定义样式和动画</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default HeadlessUIDemo 