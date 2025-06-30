'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

// 动态导入 fabric.js，避免服务器端渲染问题
const CanvasEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<any>(null)
  const [selectedTool, setSelectedTool] = useState<'select' | 'rect' | 'circle' | 'text' | 'line'>('select')
  const [canvasHistory, setCanvasHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current || fabricCanvasRef.current) return

    // 动态导入 fabric.js
    import('fabric').then(({ fabric }) => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      })

      fabricCanvasRef.current = canvas

      // 保存初始状态
      saveCanvasState()

      // 监听画布变化
      canvas.on('object:added', saveCanvasState)
      canvas.on('object:modified', saveCanvasState)
      canvas.on('object:removed', saveCanvasState)

      return () => {
        canvas.dispose()
      }
    }).catch(error => {
      console.error('Failed to load Fabric.js:', error)
    })
  }, [isClient])

  const saveCanvasState = () => {
    if (fabricCanvasRef.current) {
      const json = fabricCanvasRef.current.toJSON()
      const newHistory = canvasHistory.slice(0, historyIndex + 1)
      newHistory.push(JSON.stringify(json))
      setCanvasHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const loadCanvasState = (index: number) => {
    if (fabricCanvasRef.current && canvasHistory[index]) {
      const json = JSON.parse(canvasHistory[index])
      fabricCanvasRef.current.loadFromJSON(json, () => {
        fabricCanvasRef.current?.renderAll()
      })
      setHistoryIndex(index)
    }
  }

  const addRectangle = async () => {
    if (!fabricCanvasRef.current) return
    
    const { fabric } = await import('fabric')
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#3b82f6',
      stroke: '#1d4ed8',
      strokeWidth: 2,
    })
    fabricCanvasRef.current.add(rect)
    fabricCanvasRef.current.setActiveObject(rect)
  }

  const addCircle = async () => {
    if (!fabricCanvasRef.current) return
    
    const { fabric } = await import('fabric')
    const circle = new fabric.Circle({
      left: 200,
      top: 100,
      radius: 50,
      fill: '#10b981',
      stroke: '#059669',
      strokeWidth: 2,
    })
    fabricCanvasRef.current.add(circle)
    fabricCanvasRef.current.setActiveObject(circle)
  }

  const addText = async () => {
    if (!fabricCanvasRef.current) return
    
    const { fabric } = await import('fabric')
    const text = new fabric.Text('点击编辑文字', {
      left: 100,
      top: 200,
      fontSize: 20,
      fill: '#374151',
      fontFamily: 'Arial',
    })
    fabricCanvasRef.current.add(text)
    fabricCanvasRef.current.setActiveObject(text)
  }

  const addLine = async () => {
    if (!fabricCanvasRef.current) return
    
    const { fabric } = await import('fabric')
    const line = new fabric.Line([50, 50, 200, 200], {
      stroke: '#ef4444',
      strokeWidth: 3,
    })
    fabricCanvasRef.current.add(line)
    fabricCanvasRef.current.setActiveObject(line)
  }

  const deleteSelected = () => {
    if (fabricCanvasRef.current) {
      const activeObject = fabricCanvasRef.current.getActiveObject()
      if (activeObject) {
        fabricCanvasRef.current.remove(activeObject)
      }
    }
  }

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear()
      fabricCanvasRef.current.backgroundColor = '#ffffff'
      fabricCanvasRef.current.renderAll()
      saveCanvasState()
    }
  }

  const undo = () => {
    if (historyIndex > 0) {
      loadCanvasState(historyIndex - 1)
    }
  }

  const redo = () => {
    if (historyIndex < canvasHistory.length - 1) {
      loadCanvasState(historyIndex + 1)
    }
  }

  const exportCanvas = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
      })
      const link = document.createElement('a')
      link.download = 'canvas-export.png'
      link.href = dataURL
      link.click()
    }
  }

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Canvas 画板编辑器</h1>
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-500">正在加载 Canvas 编辑器...</div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Canvas 画板编辑器</h1>
        
        {/* 工具栏 */}
        <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
          <Button
            variant={selectedTool === 'select' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedTool('select')}
          >
            选择
          </Button>
          <Button
            variant={selectedTool === 'rect' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setSelectedTool('rect')
              addRectangle()
            }}
          >
            矩形
          </Button>
          <Button
            variant={selectedTool === 'circle' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setSelectedTool('circle')
              addCircle()
            }}
          >
            圆形
          </Button>
          <Button
            variant={selectedTool === 'text' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setSelectedTool('text')
              addText()
            }}
          >
            文字
          </Button>
          <Button
            variant={selectedTool === 'line' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setSelectedTool('line')
              addLine()
            }}
          >
            直线
          </Button>
          
          <div className="border-l border-gray-300 mx-2" />
          
          <Button variant="outline" size="sm" onClick={deleteSelected}>
            删除选中
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            清空画布
          </Button>
          
          <div className="border-l border-gray-300 mx-2" />
          
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
          >
            撤销
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= canvasHistory.length - 1}
          >
            重做
          </Button>
          
          <div className="border-l border-gray-300 mx-2" />
          
          <Button variant="primary" size="sm" onClick={exportCanvas}>
            导出图片
          </Button>
        </div>

        {/* 画布容器 */}
        <div className="flex justify-center">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">使用说明：</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 点击工具栏按钮添加不同的图形元素</li>
            <li>• 拖拽图形可以移动位置</li>
            <li>• 点击图形边缘可以调整大小</li>
            <li>• 双击文字可以编辑内容</li>
            <li>• 使用撤销/重做按钮可以恢复操作</li>
            <li>• 点击导出按钮可以下载画布为PNG图片</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default CanvasEditor 