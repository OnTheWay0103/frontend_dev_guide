'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tabs from '@radix-ui/react-tabs'
import * as Toast from '@radix-ui/react-toast'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Button } from '@/components/ui/Button'

const RadixUIDemo: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Radix UI 组件演示</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dialog 对话框 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Dialog 对话框</h2>
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
              <Dialog.Trigger asChild>
                <Button>打开对话框</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
                  <Dialog.Title className="text-lg font-semibold mb-2">
                    对话框标题
                  </Dialog.Title>
                  <Dialog.Description className="text-gray-600 mb-4">
                    这是一个使用 Radix UI Dialog 组件创建的对话框。
                  </Dialog.Description>
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                      取消
                    </Button>
                    <Button onClick={() => setToastOpen(true)}>
                      确认
                    </Button>
                  </div>
                  <Dialog.Close asChild>
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                      ✕
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Dropdown Menu 下拉菜单 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Dropdown Menu 下拉菜单</h2>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline">打开菜单</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 p-1">
                  <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                    编辑
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                    复制
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                  <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer">
                    删除
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>

          {/* Tabs 标签页 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Tabs 标签页</h2>
            <Tabs.Root defaultValue="tab1" className="w-full">
              <Tabs.List className="flex border-b border-gray-200">
                <Tabs.Trigger
                  value="tab1"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
                >
                  标签一
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="tab2"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
                >
                  标签二
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="tab3"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
                >
                  标签三
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab1" className="mt-4">
                <p className="text-gray-600">这是第一个标签页的内容。</p>
              </Tabs.Content>
              <Tabs.Content value="tab2" className="mt-4">
                <p className="text-gray-600">这是第二个标签页的内容。</p>
              </Tabs.Content>
              <Tabs.Content value="tab3" className="mt-4">
                <p className="text-gray-600">这是第三个标签页的内容。</p>
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Tooltip 工具提示 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Tooltip 工具提示</h2>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button>悬停查看提示</Button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg"
                    sideOffset={5}
                  >
                    这是一个工具提示
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>

        {/* Toast 通知 */}
        <Toast.Provider>
          <Toast.Root
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-start gap-3"
            open={toastOpen}
            onOpenChange={setToastOpen}
          >
            <div className="flex-1">
              <Toast.Title className="font-medium text-gray-900">
                操作成功
              </Toast.Title>
              <Toast.Description className="text-sm text-gray-600 mt-1">
                您的操作已成功完成。
              </Toast.Description>
            </div>
            <Toast.Close className="text-gray-400 hover:text-gray-600">
              ✕
            </Toast.Close>
          </Toast.Root>
          <Toast.Viewport className="fixed bottom-4 right-4" />
        </Toast.Provider>
      </motion.div>
    </div>
  )
}

export default RadixUIDemo 