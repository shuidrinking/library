#### 1、安装nginx
>1.1 <a href="http://nginx.org/en/download.html" target="_blank">官方下载地址</a>、<a href="http://www.nginx.cn/doc/index.html" target="_blank">官方参考资料</a>

**本文中的nginx版本号是彼时编写时用的版本，此时你要选择合适的版本，安装步骤都一样**

>1.2 安装nginx需要的环境
<pre class="prettyprint lang-s">
#检查系统中如果没有安装gcc-c++，则需要安装
dnf install gcc-c++
#Nginx的http模块需要使用pcre来解析正则表达式
dnf -y install pcre pcre-devel
#依赖的解压包
dnf -y install zlib zlib-devel
#如果系统中没有安装openssl，则需要安装
dnf install -y openssl openssl-devel
</pre>

>1.3 解压安装包到/opt
<pre class="prettyprint lang-s">
tar -zxf ./nginx-1.16.1.tar.gz -C /opt
</pre>
>1.4 执行安装预配置

**进入解压后的目录，执行configure命令，设置安装位置等参数**
<pre class="prettyprint lang-s">
mv /opt/nginx-1.16.1 /opt/nginx-installPackage
mkdir /opt/nginx-1.16.1

#下面语句指定安装目录，ssl没有安装则不能成功执行
./configure --prefix=/opt/nginx-1.16.1 --with-http_stub_status_module --with-http_ssl_module
</pre>
>1.5 执行编译安装
<pre class="prettyprint lang-s">
cd /opt/nginx-installPackage
make
make install
make clean
</pre>
>1.6 开放要开放的端口
<pre class="prettyprint lang-s">
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables-save
service iptables restart
</pre>
>1.7 操作nginx
<pre class="prettyprint lang-s">
#先对nginx的执行文件建立软链接
chmod -R 777 /opt/nginx-1.16.1
chown -R liuxiaosong:liuxiaosong /opt/nginx-1.16.1
ln -s /opt/nginx-1.16.1/sbin/nginx /usr/bin/nginx

#测试安装是否成功
nginx -t 
#启动
nginx
#停止
nginx -s quit
#暴力kill型停止
nginx -s stop
#重启
nginx -s reload 
</pre>
>1.8 扩展
<pre class="prettyprint lang-s">
nginx -c filename ：为 Nginx 指定一个配置文件，来代替缺省的
nginx -V：显示 nginx 的版本，编译器版本和配置参数。
</pre>