#### 1、安装activemq
>1.1 下载
http://activemq.apache.org/download-archives.html 官网下载5.9.1 更高版本需要jdk1.8

>1.2 安装
<pre class="prettyprint lang-s">
#解压下载的压缩包
tar -xf ./apache-activemq-5.9.1-bin.tar.gz
#转移程序位置
mv ./apache-activemq-5.9.1 /opt
cd /opt/apache-activemq-5.9.1/
#开启防火墙端口，开启8161(web管理页面端口）、61616（activemq服务监控端口）
iptables -I INPUT -p tcp --dport 8161 -j ACCEPT
iptables -I INPUT -p tcp --dport 61616 -j ACCEPT
iptables save
service iptables restart
</pre>

>1.3 测试
<pre class="prettyprint lang-s">
#建立软链接
ln -s /opt/apache-activemq-5.9.1/bin/activemq /usr/bin
#启动
activemq start
#停止
activemq stop

#使用的是jetty服务器, 进入控制台 http://ip:8161/admin 
#控制台的登录用户名密码保存在conf/jetty-realm.properties文件中，默认管理员为admin/admin

#打开conf/jetty.xml文件
#将property name为authenticate的属性value="true"改为"false"，再登陆时就不会弹出用户名密码要求输入。

#如果要允许非root用户启动，则需要修改文件夹权限
chomd -R 777 /home/shuidrinking/programs/apache-activemq-5.9.1
</pre>