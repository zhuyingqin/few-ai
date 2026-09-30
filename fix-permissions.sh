#!/bin/bash

# 修复 COMIA 2025 会议网站权限问题的脚本

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

# 检查是否为root用户
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "此脚本需要root权限运行"
        log_info "请使用: sudo $0"
        exit 1
    fi
}

# 修复文件权限
fix_permissions() {
    log_info "修复 /var/www/conference 目录权限..."
    
    # 确保目录存在
    if [ ! -d "/var/www/conference" ]; then
        log_error "目录 /var/www/conference 不存在"
        log_info "请先运行部署脚本创建目录"
        exit 1
    fi
    
    # 设置正确的所有者和权限
    chown -R www-data:www-data /var/www/conference
    chmod -R 755 /var/www/conference
    find /var/www/conference -type f -exec chmod 644 {} \;
    
    log_success "权限修复完成"
    
    # 验证权限设置
    log_info "验证权限设置..."
    ls -la /var/www/conference/
    
    if [ -f "/var/www/conference/index.html" ]; then
        log_info "index.html 文件权限:"
        ls -la /var/www/conference/index.html
    else
        log_warning "未找到 index.html 文件"
    fi
}

# 测试 Nginx 配置
test_nginx() {
    log_info "测试 Nginx 配置..."
    if nginx -t; then
        log_success "Nginx 配置测试通过"
    else
        log_error "Nginx 配置测试失败"
        exit 1
    fi
}

# 重启 Nginx
restart_nginx() {
    log_info "重启 Nginx 服务..."
    systemctl restart nginx
    systemctl status nginx --no-pager -l
    log_success "Nginx 服务重启完成"
}

# 检查网站状态
check_website() {
    log_info "检查网站状态..."
    
    # 等待几秒让服务完全启动
    sleep 3
    
    # 测试本地访问
    if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
        log_success "网站本地访问正常 (HTTP 200)"
    else
        log_warning "网站本地访问可能有问题"
        log_info "尝试访问: curl -I http://localhost"
        curl -I http://localhost || true
    fi
    
    # 显示错误日志的最后几行
    log_info "最近的 Nginx 错误日志:"
    tail -n 10 /var/log/nginx/conference_error.log || log_warning "无法读取错误日志"
}

# 主函数
main() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "    COMIA 2025 会议网站权限修复脚本"
    echo "=================================================="
    echo -e "${NC}"
    
    check_root
    
    log_info "开始修复权限问题..."
    
    fix_permissions
    test_nginx
    restart_nginx
    check_website
    
    log_success "权限修复脚本执行完成！"
    log_info "如果问题仍然存在，请检查:"
    log_info "1. 文件是否正确部署到 /var/www/conference/"
    log_info "2. Nginx 配置文件是否正确"
    log_info "3. 防火墙设置是否允许 HTTP/HTTPS 访问"
}

# 执行主函数
main "$@"