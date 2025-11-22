# 无知智投 - Vue3 前端项目

这是从传统 HTML/JS 前端转换而来的 Vue3 + Vite 项目。

## 技术栈

- Vue 3 (Composition API)
- Vite
- Vue Router 4
- Pinia (状态管理)
- JavaScript

## 项目结构

```
frontend-vue3/
├── src/
│   ├── components/      # 组件
│   │   └── Sidebar.vue
│   ├── views/          # 页面视图
│   │   ├── Home.vue
│   │   ├── AllProjects.vue
│   │   ├── CompanyDetail.vue
│   │   ├── CompanyManagement.vue
│   │   ├── DocumentsAndFavorites.vue
│   │   ├── Profile.vue
│   │   └── VideoPlayer.vue
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── stores/         # Pinia 状态管理
│   │   ├── auth.js
│   │   └── favorites.js
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── style.css       # 全局样式
├── public/             # 静态资源
│   └── logo.svg
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置
```

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 功能说明

### 已实现
- ✅ 项目基础结构
- ✅ 路由配置
- ✅ 状态管理 (Pinia)
- ✅ 侧边栏导航组件
- ✅ 所有项目页面 (AllProjects.vue) - 包含搜索、筛选、表格/网格视图切换、分页等功能
- ✅ 基础页面组件

### 待完善
- ⏳ 公司详情页面完整功能
- ⏳ 公司管理页面
- ⏳ 文件与收藏页面
- ⏳ 个人中心页面
- ⏳ 视频播放页面
- ⏳ 登录/注册功能
- ⏳ API 集成

## 开发说明

### 路由
路由配置在 `src/router/index.js` 中，使用 Vue Router 4。

### 状态管理
使用 Pinia 进行状态管理：
- `auth.js` - 用户认证状态
- `favorites.js` - 收藏功能状态

### 样式
使用 CSS 变量定义主题色，样式文件：
- `src/style.css` - 全局样式
- 各组件使用 scoped 样式

## 注意事项

1. 项目使用 localStorage 存储数据，生产环境应替换为 API 调用
2. 部分页面为占位组件，需要根据原 HTML 文件完善功能
3. 响应式设计已考虑，但需要进一步测试和优化


