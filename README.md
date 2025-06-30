# 前端学习项目 - Next.js 14 + TypeScript

这是一个用于前端开发者学习调试的完整项目，集成了现代前端开发的主要技术栈。

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript 5.3
- **样式**: Tailwind CSS 3.4
- **动画**: Framer Motion
- **状态管理**: Zustand
- **UI 组件**: Radix UI, Headless UI
- **Canvas**: Fabric.js
- **工具**: ESLint, PostCSS, Autoprefixer

## 📦 功能模块

### 1. 📝 待办事项 (Todo List)

- 使用 Zustand 进行状态管理
- 支持添加、编辑、删除、标记完成
- Framer Motion 动画效果
- 响应式设计

### 2. 🎨 Canvas 画板编辑器

- 基于 Fabric.js 的 Canvas 操作
- 支持绘制矩形、圆形、文字、直线
- 撤销/重做功能
- 图片导出功能

### 3. 🧩 Radix UI 组件演示

- Dialog 对话框
- Dropdown Menu 下拉菜单
- Tabs 标签页
- Tooltip 工具提示
- Toast 通知

### 4. ℹ️ 项目说明

- 技术栈介绍
- 功能模块说明
- 学习要点总结

## 🛠️ 安装和运行

### 前置要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm run start
# 或
yarn start
```

### 代码检查

```bash
npm run lint
# 或
yarn lint
```

### 类型检查

```bash
npm run type-check
# 或
yarn type-check
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── TodoList.tsx      # 待办事项组件
│   ├── CanvasEditor.tsx  # Canvas 编辑器
│   └── RadixUIDemo.tsx   # Radix UI 演示
├── store/                # Zustand 状态管理
│   ├── todoStore.ts      # 待办事项状态
│   └── themeStore.ts     # 主题状态
├── lib/                  # 工具函数
│   └── utils.ts
└── types/                # TypeScript 类型定义
    └── index.ts
```

## 🎯 学习要点

### Next.js 14

- App Router 的使用
- 服务端组件 vs 客户端组件
- 路由和布局
- 元数据和 SEO

### TypeScript

- 类型定义和接口
- 泛型的使用
- 类型安全
- 类型推断

### Tailwind CSS 3.x

- 响应式设计
- 自定义配置
- 组件类名
- 动画和过渡

### Framer Motion

- 基础动画
- 手势动画
- 页面过渡
- 动画编排

### Zustand

- 状态管理
- 中间件使用
- 持久化
- 开发工具

### Radix UI & Headless UI

- 无障碍组件
- 组合模式
- 样式定制
- 状态管理

### Fabric.js

- Canvas 操作
- 图形绘制
- 事件处理
- 序列化

## 🔧 开发工具

### VS Code 推荐扩展

- TypeScript Importer
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

### 浏览器开发工具

- React Developer Tools
- Redux DevTools (支持 Zustand)

## 📚 参考资料

- [Next.js 官方文档](https://nextjs.org/docs)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [Framer Motion 官方文档](https://www.framer.com/motion/)
- [Zustand 官方文档](https://github.com/pmndrs/zustand)
- [Radix UI 官方文档](https://www.radix-ui.com/)
- [Fabric.js 官方文档](http://fabricjs.com/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## �� 许可证

MIT License
