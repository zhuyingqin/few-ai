#!/bin/bash

# COMIA 2025 会议网站 Nginx 问题修复脚本
# 修复权限问题和服务器名称冲突

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_section() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# 检查是否为root用户
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "此脚本需要root权限运行"
        log_info "请使用: sudo $0"
        exit 1
    fi
}

# 修复文件权限问题
fix_file_permissions() {
    log_section "修复文件权限问题"
    
    local old_web_root="/root/dist"
    local new_web_root="/var/www/conference"
    
    # 检查旧目录是否存在，如果存在则迁移到新目录
    if [ -d "$old_web_root" ]; then
        log_warning "发现旧的网站目录: $old_web_root"
        log_info "迁移到推荐目录: $new_web_root"
        
        # 创建新目录
        mkdir -p "$new_web_root"
        
        # 复制文件到新目录
        cp -r "$old_web_root"/* "$new_web_root"/ 2>/dev/null || true
        
        # 备份旧目录
        mv "$old_web_root" "${old_web_root}.backup.$(date +%Y%m%d_%H%M%S)"
        log_info "旧目录已备份为: ${old_web_root}.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # 确保新目录存在
    if [ ! -d "$new_web_root" ]; then
        log_info "创建网站目录: $new_web_root"
        mkdir -p "$new_web_root"
    fi
    
    log_info "修复 $new_web_root 目录权限..."
    
    # 修改目录所有者为www-data
    chown -R www-data:www-data "$new_web_root"
    log_success "已将目录所有者设置为 www-data:www-data"
    
    # 设置正确的权限
    find "$new_web_root" -type d -exec chmod 755 {} \;
    find "$new_web_root" -type f -exec chmod 644 {} \;
    log_success "已设置正确的文件权限 (目录:755, 文件:644)"
    
    # 验证关键文件
    if [ -f "$new_web_root/index.html" ]; then
        local perms=$(stat -c '%a' "$new_web_root/index.html")
        local owner=$(stat -c '%U:%G' "$new_web_root/index.html")
        log_info "index.html 权限: $perms, 所有者: $owner"
    else
        log_error "index.html 文件不存在！"
        return 1
    fi
}

# 解决服务器名称冲突
fix_server_name_conflict() {
    log_section "解决服务器名称冲突"
    
    log_info "检查启用的站点配置..."
    ls -la /etc/nginx/sites-enabled/
    
    # 查找包含 few-ai.top 的配置文件
    log_info "查找包含 'few-ai.top' 的配置文件..."
    if grep -r "few-ai.top" /etc/nginx/sites-enabled/ 2>/dev/null; then
        log_warning "发现多个配置文件包含 'few-ai.top'"
        
        # 禁用默认站点（如果存在）
        if [ -L "/etc/nginx/sites-enabled/default" ]; then
            log_info "禁用默认站点配置..."
            rm -f /etc/nginx/sites-enabled/default
            log_success "已禁用默认站点"
        fi
        
        # 确保只有 comia2025 配置启用
        if [ -f "/etc/nginx/sites-available/comia2025" ]; then
            log_info "更新 COMIA2025 配置以使用新的网站目录..."
            
            # 更新配置文件中的root路径
            sed -i 's|root /root/dist;|root /var/www/conference;|g' /etc/nginx/sites-available/comia2025
            
            ln -sf /etc/nginx/sites-available/comia2025 /etc/nginx/sites-enabled/comia2025
            log_success "COMIA2025 配置已更新并启用"
        else
            log_error "未找到 COMIA2025 配置文件"
            log_info "创建新的配置文件..."
            cat > /etc/nginx/sites-available/comia2025 << 'EOF'
server {
    listen 80;
    server_name few-ai.top;
    
    root /var/www/conference;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    access_log /var/log/nginx/conference_access.log;
    error_log /var/log/nginx/conference_error.log;
}
EOF
            ln -sf /etc/nginx/sites-available/comia2025 /etc/nginx/sites-enabled/comia2025
            log_success "已创建新的COMIA2025 配置"
        fi
        
    else
        log_info "未发现服务器名称冲突"
    fi
}

# 验证和修复Nginx配置
verify_nginx_config() {
    log_section "验证Nginx配置"
    
    log_info "测试Nginx配置语法..."
    if nginx -t; then
        log_success "Nginx配置语法正确"
    else
        log_error "Nginx配置语法错误，请检查配置文件"
        return 1
    fi
}

# 重启Nginx服务
restart_nginx() {
    log_section "重启Nginx服务"
    
    log_info "重启Nginx..."
    systemctl restart nginx
    
    if systemctl is-active --quiet nginx; then
        log_success "Nginx服务重启成功"
    else
        log_error "Nginx服务重启失败"
        systemctl status nginx --no-pager -l
        return 1
    fi
}

# 测试网站访问
test_website() {
    log_section "测试网站访问"
    
    log_info "等待服务启动..."
    sleep 2
    
    # 测试本地访问
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
    if [[ "$status_code" == "200" ]]; then
        log_success "网站访问正常 (状态码: $status_code)"
    else
        log_error "网站访问失败 (状态码: $status_code)"
        
        # 显示最新的错误日志
        log_info "最新的错误日志:"
        tail -n 5 /var/log/nginx/error.log
        return 1
    fi
    
    # 获取服务器IP
    local server_ip=$(curl -s ifconfig.me 2>/dev/null || echo "无法获取")
    if [[ "$server_ip" != "无法获取" ]]; then
        log_info "您的网站应该可以通过以下地址访问:"
        echo "  http://$server_ip"
        echo "  http://few-ai.top (如果域名已正确解析)"
    fi
}

# 显示修复总结
show_summary() {
    log_section "修复总结"
    
    echo -e "${GREEN}✅ 已完成的修复:${NC}"
    echo "  1. 迁移网站文件到推荐目录 (/var/www/conference)"
    echo "  2. 修复了文件权限问题 (设置为 www-data:www-data)"
    echo "  3. 解决了服务器名称冲突"
    echo "  4. 更新了Nginx配置使用新目录"
    echo "  5. 验证了Nginx配置语法"
    echo "  6. 重启了Nginx服务"
    echo
    echo -e "${BLUE}📋 问题原因分析:${NC}"
    echo "  • 主要问题: 网站文件放在 /root/dist/ 目录，权限设置不正确"
    echo "  • 次要问题: 多个Nginx配置文件使用相同服务器名称"
    echo "  • 解决方案: 迁移到标准的 /var/www/conference 目录"
    echo
    echo -e "${YELLOW}💡 最佳实践:${NC}"
    echo "  • 网站文件应该放在 /var/www/ 目录下"
    echo "  • 确保文件所有者为 www-data:www-data"
    echo "  • 目录权限: 755, 文件权限: 644"
    echo "  • 避免在多个配置文件中使用相同的服务器名称"
    echo "  • 定期检查权限: ls -la /var/www/conference"
}

# 主函数
main() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "    COMIA 2025 会议网站 Nginx 问题修复脚本"
    echo "=================================================="
    echo -e "${NC}"
    
    check_root
    
    log_info "开始修复Nginx问题..."
    
    # 执行修复步骤
    fix_file_permissions
    fix_server_name_conflict
    verify_nginx_config
    restart_nginx
    test_website
    show_summary
    
    log_success "所有问题已修复完成！"
}

# 执行主函数
main "$@"