# 🔧 前端调试完全指南

## 📋 目录
1. [基础调试](#基础调试)
2. [React DevTools](#react-devtools)
3. [网络调试](#网络调试)
4. [性能调试](#性能调试)
5. [错误处理](#错误处理)
6. [断点调试](#断点调试)
7. [移动端调试](#移动端调试)
8. [生产环境调试](#生产环境调试)

## 🎯 基础调试

### Console 调试命令

```javascript
// 基础查看
window.debugTodos
window.debugTodoStore
window.debugTodoList()

// 性能监控
console.log('添加次数:', window.addTodoCount)
console.log('上次添加时间:', window.lastAddTodoTime + 'ms')

// 错误报告
window.debugError(new Error('测试错误'))
```

### 实时监控

```javascript
// 启动监控
function startMonitoring() {
  let lastCount = 0
  const interval = setInterval(() => {
    if (window.debugTodos && window.debugTodos.length !== lastCount) {
      console.log(`数据变化: ${lastCount} → ${window.debugTodos.length}`)
      lastCount = window.debugTodos.length
    }
  }, 1000)
  
  console.log('监控已启动，使用 clearInterval(' + interval + ') 停止')
  return interval
}

// 使用
const monitorId = startMonitoring()
```

## 🔧 React DevTools

### 安装和配置

1. **Chrome 扩展**: 搜索 "React Developer Tools"
2. **Firefox 扩展**: 搜索 "React Developer Tools"
3. **独立应用**: 下载 React DevTools 独立版本

### 使用技巧

```javascript
// 在组件中添加自定义数据
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.debugData = {
  todos: window.debugTodos,
  timestamp: new Date().toISOString()
}
```

### 调试步骤

1. 打开开发者工具
2. 点击 "Components" 标签
3. 在组件树中找到 TodoList
4. 查看右侧面板的 Props、State、Hooks
5. 使用 "Console" 标签执行命令

## 🌐 网络调试

### Network 面板使用

```javascript
// 监控网络请求
const originalFetch = window.fetch
window.fetch = function(...args) {
  console.log('🌐 网络请求:', args[0])
  const startTime = performance.now()
  
  return originalFetch.apply(this, args).then(response => {
    const endTime = performance.now()
    console.log(`⏱️ 请求完成: ${(endTime - startTime).toFixed(2)}ms`)
    return response
  })
}
```

### 性能监控

```javascript
// 监控组件渲染性能
function measurePerformance(name, fn) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`⏱️ ${name} 执行时间: ${(end - start).toFixed(2)}ms`)
  return result
}

// 使用示例
measurePerformance('添加待办事项', () => {
  addTodo('测试项目')
})
```

## 🚨 错误处理

### 全局错误捕获

```javascript
// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('🚨 全局错误:', event.error)
  window.debugError && window.debugError(event.error)
})

// Promise 错误处理
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Promise 错误:', event.reason)
  window.debugError && window.debugError(event.reason)
})
```

### 组件错误边界

```javascript
// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 组件错误:', error, errorInfo)
    window.debugError && window.debugError(error)
  }

  render() {
    if (this.state.hasError) {
      return <div>出错了！请刷新页面重试。</div>
    }
    return this.props.children
  }
}
```

## 🔍 断点调试

### Sources 面板调试

```javascript
// 在代码中添加断点
const handleAddTodo = (e) => {
  debugger // 这里会暂停执行
  e.preventDefault()
  // ... 其他代码
}
```

### 条件断点

```javascript
// 只在特定条件下暂停
if (newTodo.length > 10) {
  debugger // 只在输入长度超过10时暂停
}
```

## 📱 移动端调试

### Chrome 远程调试

1. 手机开启 USB 调试
2. 连接电脑
3. Chrome 访问 `chrome://inspect`
4. 选择设备进行调试

### 移动端 Console

```javascript
// 移动端友好的调试信息
function mobileDebug() {
  const info = {
    todos: window.debugTodos?.length || 0,
    editing: window.debugTodoStore?.editingId || '无',
    timestamp: new Date().toLocaleString()
  }
  
  // 在页面上显示调试信息
  const debugDiv = document.createElement('div')
  debugDiv.style.cssText = `
    position: fixed; top: 10px; right: 10px; 
    background: rgba(0,0,0,0.8); color: white; 
    padding: 10px; border-radius: 5px; z-index: 9999;
    font-size: 12px; max-width: 200px;
  `
  debugDiv.innerHTML = `
    <div>待办事项: ${info.todos}</div>
    <div>编辑中: ${info.editing}</div>
    <div>时间: ${info.timestamp}</div>
  `
  document.body.appendChild(debugDiv)
  
  return debugDiv
}
```

## 🏭 生产环境调试

### 环境检测

```javascript
// 检测环境
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// 生产环境调试
if (isProduction) {
  // 只显示关键错误
  console.log = () => {}
  console.debug = () => {}
  
  // 保留错误日志
  const originalError = console.error
  console.error = (...args) => {
    originalError(...args)
    // 可以发送到错误监控服务
  }
}
```

### 错误监控服务

```javascript
// 简单的错误上报
function reportError(error, context = {}) {
  const errorData = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }
  
  // 发送到服务器
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorData)
  }).catch(console.error)
}
```

## 🛠️ 调试工具推荐

### Chrome 扩展
- React Developer Tools
- Redux DevTools
- Vue.js devtools
- JSON Viewer
- ColorZilla

### VS Code 扩展
- Debugger for Chrome
- React Developer Tools
- TypeScript Importer
- ESLint
- Prettier

### 在线工具
- JSFiddle
- CodeSandbox
- StackBlitz
- Replit

## 📚 调试最佳实践

1. **使用有意义的日志信息**
2. **分组和格式化输出**
3. **避免在生产环境输出敏感信息**
4. **定期清理调试代码**
5. **使用版本控制管理调试代码**
6. **建立调试规范和流程**

## 🎯 调试检查清单

- [ ] Console 日志清晰易懂
- [ ] 错误处理完善
- [ ] 性能监控到位
- [ ] 网络请求可追踪
- [ ] 移动端兼容
- [ ] 生产环境安全
- [ ] 调试工具配置正确
- [ ] 团队调试规范统一

---

**记住：好的调试习惯是优秀开发者的标志！** 🚀 