# COMIA 2025 会议网站

COMIA 2025（Conference on Machine Intelligence and Applications）会议官方网站，基于 React + TypeScript + Vite 构建的现代化单页应用。

## 🌟 特性

- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **高性能** - 基于 Vite 构建，快速加载
- 🎨 **现代化UI** - 简洁专业的学术风格设计
- 🔍 **SEO友好** - 优化的页面结构和元数据
- 🚀 **易于部署** - 提供多种部署方案

## 📋 页面结构

- **首页** - 会议基本信息、重要日期、主办方信息
- **征稿通知** - 投稿指南、主题范围、格式要求
- **会议日程** - 详细的会议安排和时间表
- **注册信息** - 参会注册流程和费用说明
- **联系我们** - 联系方式和组织委员会信息

## 🚀 快速开始

### 环境要求

- Node.js 16+
- pnpm（推荐）或 npm

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd conference-website
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
pnpm dev
```

4. **访问网站**
打开浏览器访问 `http://localhost:5173`

### 构建生产版本

```bash
pnpm build
```

构建后的文件将生成在 `dist` 目录中。

## 🚀 部署

### Ubuntu 一键部署（推荐）

项目提供了针对Ubuntu系统的一键部署脚本：

```bash
# 1. 构建项目
pnpm build

# 2. 上传项目到服务器
scp -r ./ user@your-server:/path/to/project/

# 3. 在服务器上运行部署脚本
cd /path/to/project/
sudo ./deploy-ubuntu.sh
```

### 其他部署方式

- **Vercel部署** - 支持一键部署到Vercel平台
- **传统服务器** - 支持Nginx、Apache等Web服务器
- **Docker部署** - 容器化部署方案

详细部署说明请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 项目结构

```
├── src/
│   ├── components/     # React组件
│   ├── pages/         # 页面组件
│   ├── styles/        # 样式文件
│   └── main.tsx       # 应用入口
├── public/            # 静态资源
├── dist/              # 构建输出目录
├── nginx.conf         # Nginx配置文件
├── deploy-ubuntu.sh   # Ubuntu部署脚本
├── DEPLOYMENT.md      # 详细部署文档
└── package.json       # 项目配置
```

## 🛠️ 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: CSS Modules + 原生CSS
- **路由管理**: React Router
- **包管理器**: pnpm

## 📝 开发说明

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 组件采用函数式组件 + Hooks
- 样式使用 CSS Modules 避免冲突

### 目录说明

- `src/components/` - 可复用的UI组件
- `src/pages/` - 页面级组件
- `src/styles/` - 全局样式和主题配置
- `public/` - 静态资源文件

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- 邮箱：contact@comia2025.org
- 网站：https://comia2025.org

---

© 2024 COMIA 2025. All rights reserved.
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
