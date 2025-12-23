# FLC 和他的导航 开发指南文档

## 1. 项目概述 (Project Overview)

**FLC 和他的导航** 是一个追求极致视觉体验的个人导航站项目。它旨在替代传统的浏览器首页或老旧的 hao123 风格导航，通过**现代化的技术栈**和**磨砂玻璃 (Glassmorphism)** 的设计语言，提供一个既实用又具科技感的入口页面。

### 核心设计理念
*   **极简主义 (Minimalist)**: 摒弃冗余信息，聚焦核心链接。
*   **现代质感 (Modern UI)**: 深度使用毛玻璃特效、渐变背景、流畅的交互动画。
*   **无后端 (Serverless)**: 数据完全由静态 JSON 驱动，无需数据库，部署成本极低（GitHub Pages/Vercel）。

---

## 2. 技术栈架构 (Tech Stack)

本项目采用了目前前端领域最新、最轻量的技术组合：

| 维度 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **框架** | **Vue 3** | 使用 Composition API (`<script setup>`) 和 TypeScript。 |
| **构建工具** | **Vite** | 极速冷启动和热更新体验。 |
| **样式库** | **Tailwind CSS v4** | **注意：使用的是 v4 Beta/RC 版本**，配置方式与 v3 有显著差异。 |
| **CSS 预处理** | **PostCSS** | 使用 `@tailwindcss/postcss` 插件。 |
| **部署** | **Static HTML** | 纯静态文件输出。 |

---

## 3. 快速上手 (Getting Started)

### 环境要求
*   Node.js > 18.0.0
*   npm

### 安装与运行

1.  **安装依赖**
    ```bash
    npm install
    ```
    *注意：这将安装 `vue`, `vite`, `@tailwindcss/postcss` 等核心依赖。*

2.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    访问终端显示的本地地址（通常是 `http://localhost:5173`）。

3.  **构建生产版本**
    ```bash
    npm run build
    ```
    构建产物将输出到 `dist/` 目录。

---

## 4. 目录结构说明 (Project Structure)

```text
nav.flc.io/
├── public/
│   └── data.json          # [核心] 网站的数据源，所有链接配置均在此
├── src/
│   ├── App.vue            # 主应用组件，包含核心布局逻辑
│   ├── components/
│   │   ├── SearchBox.vue      # 搜索框组件 (含引擎切换下拉)
│   │   ├── SideNav.vue        # 侧边栏导航组件 (包含汉堡菜单)
│   │   ├── SpotlightCard.vue  # 导航卡片组件 (支持聚光灯效果)
│   │   └── BackgroundParticles.vue # 粒子背景组件
│   ├── style.css          # 全局样式，包含 Tailwind v4 的引入 (@import "tailwindcss")
│   ├── main.ts            # Vue 入口文件
│   └── vite-env.d.ts      # TS 类型声明
├── docs/                  # 开发文档目录
├── index.html             # HTML 模板
├── postcss.config.js      # PostCSS 配置 (Tailwind v4 关键配置)
├── package.json           # 项目依赖定义
└── vite.config.ts         # Vite 配置
```

---

## 5. 数据协议 (Data Schema)

项目的内容完全由 `public/data.json` 驱动。若需修改导航内容，**只需修改此文件，无需改动代码**。

### JSON 结构定义

```typescript
interface NavData {
  title: string;       // 页面主标题 (如 "FLC 和他的导航")
  description: string; // 副标题/Slogan
  categories: Array<{
    name: string;      // 分类名称 (如 "常用推荐")
    items: Array<{
      title: string;   // 链接标题
      url: string;     // 跳转链接
      icon: string;    // 图标 URL (推荐 SVG 或 favicon 链接)
      desc?: string;   // [可选] 简短描述，鼠标悬停或布局允许时显示
    }>
  }>
}
```

### 示例数据
```json
{
  "title": "FLC 和他的导航",
  "categories": [
    {
      "name": "Dev",
      "items": [
        { "title": "GitHub", "url": "https://github.com", "icon": "..." }
      ]
    }
  ]
}
```

---

## 6. 样式与设计规范 (Design System)

### Tailwind CSS v4 特别说明
本项目使用的是 Tailwind v4，它不再依赖 `tailwind.config.js` 进行常规配置。
*   **引入方式**: 在 `src/style.css` 中使用 `@import "tailwindcss";`。
*   **自定义配置**: 如果需要自定义主题，直接在 CSS 文件中使用 `@theme` 指令（v4 新特性）。

### 视觉参数 (Visual Specs)
*   **背景**: 深色渐变 (`from-slate-900 via-purple-900 to-slate-900`)。
*   **磨砂卡片**:
    *   背景: `bg-white/5` (5% 透明度白色)
    *   模糊: `backdrop-blur-md`
    *   边框: `border-white/10`
*   **交互**:
    *   Hover: 上浮 (`-translate-y-1`)，发光阴影 (`shadow-purple-500/10`)。

---

## 7. 后续开发路线图 (Roadmap & Implementation Plan)

### 阶段一：基础搭建 (已完成 ✅)
*   [x] 项目初始化 (Vue 3 + Vite + TS)
*   [x] 集成 Tailwind CSS v4 (解决 PostCSS 兼容性问题)
*   [x] 实现 `data.json` 异步加载与渲染
*   [x] 完成基础磨砂卡片布局

### 阶段二：核心功能增强 (已完成 ✅)
**目标**：增加实用性，不仅仅是链接列表。

#### 1. 聚合搜索组件 (Search Component)
*   **位置**: 页面顶部，Header 下方。
*   **设计**:
    *   宽大的输入框，高度 56px。
    *   完全磨砂风格，Focus 时边框高亮。
    *   **引擎切换**: 左侧下拉菜单，支持 Google, Baidu, Bing, GitHub，带 Icon 显示。
*   **功能**:
    *   **搜索引擎切换**: 点击左侧图标或下拉箭头切换。
    *   **GitHub Icon**: 针对暗色背景做了反色处理 (Invert)。
    *   **回车跳转**: 监听 Enter 键直接搜索。

#### 2. 侧边栏导航 (Sidebar Navigation)
**桌面端 (≥1536px)**
*   **位置**: 页面左侧固定垂直居中。
*   **功能**:
    *   **滚动监听 (Scroll Spy)**: 自动高亮当前可视区域的分类。
    *   **平滑滚动**: 点击分类跳转时平滑滚动到对应区域。
    *   **视觉效果**: 带动态发光点和悬停动画。

**移动端 (<1536px)**
*   **汉堡菜单**: 右上角固定按钮，点击展开抽屉式导航。
*   **抽屉设计**:
    *   从左侧滑入 (300ms 动画)
    *   背景: `bg-purple-900/30` (30% 不透明度紫色)
    *   附加效果: `backdrop-blur-xl` (超强背景模糊)
    *   遮罩层: 点击关闭抽屉
*   **响应式断点**: 使用 Tailwind `2xl` (1536px) 作为切换点，确保中等宽度屏幕不会出现内容遮挡。

#### 3. 视觉与交互优化
*   **粒子背景**: 自定义 Canvas 实现的粒子连线背景，带鼠标排斥效果。
*   **流体字体**: 主标题使用 CSS `clamp()` 函数实现响应式字体大小，确保在所有设备上都能完整显示。
    *   公式: `font-size: clamp(2rem, 8vw, 3rem);`
    *   移动端最小 32px，桌面端最大 48px。
*   **滚动优化**: 修复了背景层级导致的滚动黑屏问题。



### 阶段三：个性化与小组件 (待办 📅)
*   **天气/时间组件**: 在右上角显示当前时间与天气（需调用免费 API）。
*   **壁纸切换**: 允许用户点击右下角按钮切换背景图（Unsplash API 或 必应每日一图）。

---

## 8. 常见问题 (Troubleshooting)

**Q: 为什么样式突然失效了？**
A: 检查 `postcss.config.js` 是否正确配置了 `@tailwindcss/postcss`。v4 版本不兼容旧的 `tailwindcss` 插件配置。

**Q: 如何更换图标？**
A: 目前直接引用 URL。建议使用 `https://api.faviconkit.com` 或类似的 Favicon 获取服务，或者将 SVG 存放在 `public/icons/` 目录下引用。
