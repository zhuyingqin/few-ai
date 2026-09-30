# 生产环境部署指南

## 问题描述
当直接访问 `https://few-ai.top/poster/` 时出现403错误，这是因为服务器无法找到对应的物理文件，而SPA应用需要将所有路由请求重定向到 `index.html`。

## 解决方案

### 1. Nginx 服务器配置
确保 `nginx.conf` 文件包含以下配置：

```nginx
# 特定路径处理 - poster 目录
location /poster/ {
    try_files $uri $uri/ /index.html;
    add_header X-Debug-Location "poster-directory" always;
}

# SPA 路由 - 处理所有其他路径
location / {
    try_files $uri $uri/ /index.html;
    add_header X-Debug-Location "spa-fallback" always;
}
```

### 2. Apache 服务器配置
如果使用Apache服务器，确保 `.htaccess` 文件存在：

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### 3. 静态文件托管平台
对于Netlify、Vercel等平台，确保包含 `_redirects` 文件：

```
/*    /index.html   200
```

## 部署步骤

1. 运行构建命令：
   ```bash
   npm run build
   ```

2. 确认 `dist` 目录包含以下文件：
   - `index.html`
   - `_redirects`
   - `.htaccess`
   - 所有静态资源文件

3. 将 `dist` 目录的内容上传到服务器的网站根目录

4. 重启Nginx服务：
   ```bash
   sudo systemctl reload nginx
   ```

## 验证部署
- 访问 `https://few-ai.top/` - 应该正常显示首页
- 访问 `https://few-ai.top/poster/` - 应该显示海报页面
- 刷新任何页面 - 不应该出现404或403错误

## 故障排除
如果仍然出现403错误：

1. 检查文件权限：
   ```bash
   chmod -R 755 /var/www/few-ai.com
   ```

2. 检查Nginx错误日志：
   ```bash
   tail -f /var/log/nginx/few-ai.com/error.log
   ```

3. 验证配置文件语法：
   ```bash
   nginx -t
   ```