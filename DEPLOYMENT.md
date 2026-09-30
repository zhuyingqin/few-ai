# COMIA 2025 会议网站部署指南

## 构建项目

项目已成功构建，生成的静态文件位于 `dist/` 目录中：

```
dist/
├── index.html              # 主页面文件
├── assets/                  # 静态资源
│   ├── index-DC28ftei.css  # 样式文件
│   ├── index-DSUEo5EC.js   # JavaScript文件
│   └── index-DSUEo5EC.js.map
├── favicon.svg             # 网站图标
└── [图片文件]              # 会议相关图片资源
```

## 部署方案

### 方案一：传统服务器部署

### 方法一：Ubuntu 一键部署脚本（推荐）

项目提供了针对Ubuntu系统的一键部署脚本 `deploy-ubuntu.sh`，可以自动完成所有配置。

#### 使用步骤：

1. **构建项目**（在本地）：
```bash
pnpm build
```

2. **上传文件到Ubuntu服务器**：
```bash
# 将整个项目目录上传到服务器，包括：
# - dist/ 目录（构建后的文件）
# - nginx.conf（nginx配置文件）
# - deploy-ubuntu.sh（部署脚本）
scp -r ./ user@your-server:/path/to/project/
```

3. **在服务器上运行部署脚本**：
```bash
cd /path/to/project/
sudo ./deploy-ubuntu.sh
```

#### 脚本功能：
- ✅ 自动更新系统包
- ✅ 安装并配置Nginx
- ✅ 配置防火墙（UFW）
- ✅ 创建项目目录并设置权限
- ✅ 部署网站文件
- ✅ 配置SPA路由支持
- ✅ 启用Gzip压缩和静态资源缓存
- ✅ 可选安装SSL证书（Let's Encrypt）
- ✅ 提供详细的部署信息和常用命令

#### 系统要求：
- Ubuntu 18.04+
- Root权限
- 互联网连接

### 方法二：手动部署

#### 1. 构建项目

首先在本地构建项目：

```bash
pnpm build
```

#### 2. 上传文件

将 `dist` 目录中的所有文件上传到服务器的网站根目录（如 `/var/www/html` 或 `/root/dist`）。

#### 3. 配置 Web 服务器

##### 使用项目提供的nginx.conf文件（推荐）

项目已包含预配置的 `nginx.conf` 文件，针对该项目进行了优化配置：

**配置特点：**
- 项目根目录设置为 `/root/dist`
- 启用Gzip压缩以提高加载速度
- 静态资源缓存配置（1年缓存期）
- SPA路由支持（所有路径都返回index.html）
- 安全头设置
- 错误页面处理
- 包含可选的HTTPS配置

**使用方法：**
1. 将项目根目录下的 `nginx.conf` 文件上传到服务器
2. 根据实际情况修改配置文件中的域名和路径
3. 将配置文件部署到nginx并重新加载

#### 1. 上传文件到服务器

**使用 SCP 命令：**
```bash
# 将整个 dist 目录上传到服务器
scp -r dist/ username@your-server.com:/var/www/html/comia2025/
```

**使用 SFTP：**
```bash
sftp username@your-server.com
put -r dist /var/www/html/comia2025/
```

**使用 rsync（推荐）：**
```bash
rsync -avz --delete dist/ username@your-server.com:/var/www/html/comia2025/
```

#### 2. 配置 Web 服务器

**方法一：使用项目提供的nginx.conf文件**

项目根目录已包含完整的 `nginx.conf` 配置文件，可直接使用：

```bash
# 1. 将nginx.conf上传到服务器
scp nginx.conf username@your-server.com:/etc/nginx/sites-available/comia2025

# 2. 修改配置文件中的域名和路径（如需要）
sudo nano /etc/nginx/sites-available/comia2025

# 3. 创建软链接启用配置
sudo ln -s /etc/nginx/sites-available/comia2025 /etc/nginx/sites-enabled/

# 4. 测试配置
sudo nginx -t

# 5. 重新加载 Nginx
sudo systemctl reload nginx
```

##### 方法二：手动创建nginx配置

如需自定义配置，可创建 Nginx 配置文件 `/etc/nginx/sites-available/comia2025`：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    
    # 重定向到 HTTPS（推荐）
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL 证书配置
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # 网站根目录
    root /var/www/html/comia2025;
    index index.html;
    
    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

**方法二配置说明：**
- 将 `your-domain.com` 替换为实际域名
- 将 `/var/www/html/comia2025` 替换为实际的网站根目录路径
- 配置SSL证书路径（如使用HTTPS）

#### 3. 启用配置（仅适用于方法二）

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/comia2025 /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重新加载 Nginx
sudo systemctl reload nginx
```

#### 4. 重要配置说明

**项目nginx.conf文件特点：**
- 已针对该项目优化，包含完整的SPA路由支持
- 预设项目根目录为 `/root/dist`
- 包含Gzip压缩、静态资源缓存、安全头等优化配置
- 提供可选的HTTPS配置模板

**使用建议：**
- 推荐使用方法一（项目提供的nginx.conf），配置更完整
- 如需自定义路径或域名，只需修改配置文件中的相应部分
- 生产环境建议启用HTTPS配置

#### 5. Apache 配置（替代方案）

如果使用 Apache，创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteBase /

# 处理 SPA 路由
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 启用压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 设置缓存
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 方案二：Vercel 部署（推荐）

项目已配置 Vercel 支持，可以快速部署：

#### 1. 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

#### 2. 通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 控制台连接 GitHub 仓库
3. Vercel 会自动检测项目配置并部署
4. 每次推送代码时会自动重新部署

#### 3. Vercel 配置文件

项目中的 `vercel.json` 配置：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite"
}
```

## 部署后检查

1. **功能测试**：
   - 访问网站各个页面
   - 检查导航功能
   - 验证响应式设计
   - 测试演讲者信息展开功能

2. **性能检查**：
   - 使用 Google PageSpeed Insights 测试
   - 检查资源加载速度
   - 验证移动端体验

3. **SEO 优化**：
   - 确认页面标题和描述
   - 检查图片 alt 属性
   - 验证结构化数据

## 域名配置

### DNS 设置

**传统服务器：**
```
A    @           your-server-ip
A    www         your-server-ip
```

**Vercel 部署：**
```
CNAME    @           cname.vercel-dns.com
CNAME    www         cname.vercel-dns.com
```

## 维护和更新

### 更新流程

1. 修改源代码
2. 运行 `pnpm build` 重新构建
3. 上传新的 `dist/` 目录内容
4. 清除 CDN 缓存（如果使用）

### 备份建议

- 定期备份网站文件
- 保存 Nginx/Apache 配置文件
- 备份 SSL 证书

## 故障排除

### 常见问题

1. **页面刷新后 404 错误**：
   - 检查服务器是否正确配置 SPA 路由
   - 确认 `try_files` 或 `.htaccess` 配置

2. **静态资源加载失败**：
   - 检查文件路径是否正确
   - 验证服务器权限设置

3. **样式或功能异常**：
   - 清除浏览器缓存
   - 检查控制台错误信息
   - 验证所有资源文件是否完整上传

## 联系支持

如遇到部署问题，请检查：
- 服务器日志文件
- 浏览器开发者工具
- 网络连接状态

---

**部署完成后，COMIA 2025 会议网站将为参会者提供完整的会议信息和注册功能。**