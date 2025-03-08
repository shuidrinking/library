<div class="mapInPage">
<a href="javascript:Client.windowScrollTo('anchor1');">1、添加mysql分组和用户</a><br/>
<a href="javascript:Client.windowScrollTo('anchor2');">2、下载并解压</a><br/>
<a href="javascript:Client.windowScrollTo('anchor3');">3、创建目录和配置文件，分配权限</a><br/>
<a href="javascript:Client.windowScrollTo('anchor4');">4、执行安装</a><br/>
<a href="javascript:Client.windowScrollTo('anchor5');">5、测试启停</a><br/>
<a href="javascript:Client.windowScrollTo('anchor6');">6、添加服务软连接</a><br/>
<a href="javascript:Client.windowScrollTo('anchor7');">7、修改root密码，开放远程连接</a><br/>
<a href="javascript:Client.windowScrollTo('anchor8');">8、设置开机启动</a><br/>
<a href="javascript:Client.windowScrollTo('anchor9');">9、忘记密码怎么办</a><br/>
</div>

#### 安装mysql8
>1、添加mysql分组和用户<label id="anchor1"></label>
<pre class="prettyprint lang-s">
#切换到root，添加分组和用户
groupadd mysql
useradd -r -g mysql mysql
</pre>
	
>2、下载并解压<label id="anchor2"></label>
<pre class="prettyprint lang-s">
#在下载网站上选择相应的版本，OS选择Linux-Generic，例如下面这版
wget wget https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz
#将mysql压缩包解压：
tar -xf ./mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz
#移动到/usr/local目录，并缩短文件夹名字
mv ./mysql-8.0.36-linux-glibc2.28-x86_64 /usr/local/mysql
#注意，直接用/usr/local/mysql文件夹，不给mysql文件夹添加版本号等信息，原因是mysql.server这个shell里写死了
</pre>
>3、创建目录及配置文件，分配所有权给mysql用户<label id="anchor3"></label>
<pre class="prettyprint lang-s">
mkdir /usr/local/mysql/data
chown -R mysql:mysql /usr/local/mysql

#创建mysql配置文件
cat > /etc/my.cnf << EOF
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
socket=/tmp/mysql.sock
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data
log-error=/usr/local/mysql/mysql.log
pid-file=/usr/local/mysql/mysql.pid
port=3306
symbolic-links=0
max_connections=1024
innodb_file_per_table=1
#表名大小写不明感，敏感为0
lower_case_table_names=1
character-set-client-handshake=FALSE
#忘记密码时放开
#skip-grant-tables
#设置服务器编码方式
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
#设置自动清理30天以上的运行日志
log-bin=mysql-bin
binlog_expire_logs_seconds=30
#设置单个日志文件大小最大100M
max_binlog_size = 100M
#打开创建函数的功能
log_bin_trust_function_creators=1
#for 8.0 不能添加,NO_ZERO_IN_DATE,NO_ZERO_DATE 否则会要求日期内容中年月日必须饱满
sql_mode = STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
#skip_ssl已经废弃，使用tls-version=''
tls-version=''
authentication_policy=mysql_native_password
EOF
</pre>

**下面是mysql5.7的配置内容，仅供参考**

<pre class="prettyprint lang-s">
#mysql5.7的my.cnf文件内容
[mysqld]
datadir=/usr/local/mysql/data
port = 3306
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
symbolic-links=0
max_connections=1024
innodb_file_per_table=1
#表名大小写不明感，敏感为0
lower_case_table_names=1
#忘记密码时放开
#skip-grant-tables
#设置服务器编码方式
character-set-server=utf8mb4 
collation_server=utf8mb4_unicode_ci
#设置自动清理7天以上的运行日志
expire_logs_days=7
#设置单个日志文件大小最大100M
#max_binlog_size = 100M
</pre>

>4、执行安装命令，并获得root密码<label id="anchor4"></label>
<pre class="prettyprint lang-s">
#执行安装命令
/usr/local/mysql/bin/mysqld --initialize --user=mysql --datadir=/usr/local/mysql/data --basedir=/usr/local/mysql
#我们在my.cnf里设置了日志文件保存位置，因此安装过程中不会向console打印日志，需要查看安装日志
tail -f /usr/local/mysql/mysql.log

（例如：[Note] A temporary password is generated for root@localhost: ,rRyVd5jvgy2）
</pre>

>5、测试启停<label id="anchor5"></label>
<pre class="prettyprint lang-s">
#启动mysql
/usr/local/mysql/support-files/mysql.server start
#停止
/usr/local/mysql/support-files/mysql.server stop
</pre>

>6、添加服务软连接，可以使用服务命令启停<label id="anchor6"></label>
<pre class="prettyprint lang-s">
#使用软链过去，不要直接包文件复制，便于系统安装多个版本的mysql
#以下脚本在fedora39中执行
ln -s /usr/local/mysql/support-files/mysql.server /etc/systemd/system/mysql.service
ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql 
ln -s /usr/local/mysql/support-files/mysql.server /usr/bin/mysql.server

#路径中的/etc/systemd/system/ 可以替换为 /usr/lib/systemd/system/


#以下脚本在老版本的fedora中执行，因为老版本的fedora中保存服务定义文件位置是另一个地方
#ln -s /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql 
#ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql

#按服务启停
service mysql start
service mysql stop
service mysql restart
</pre>
	 
>7、登录mysql，修改密码，开放远程连接<label id="anchor7"></label>
<pre class="prettyprint lang-s">
mysql -u root -p初始密码
Enter password:
#在mysql中执行下面语句修改密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootroot123';
#注意，这和旧版本不一样，以前是set password for root@localhost = password('rootroot123');

#放开远程连接等动作，和mysql普通维护动作一样
mysql>use mysql;
msyql>update mysql.user set host='%' where user='root';
mysql>flush privileges;
</pre>
>8、设置开机启动<label id="anchor8"></label>
<pre class="prettyprint lang-s">
#编写启动脚本
cat >> /etc/rc.d/rc.local << EOF
#!/bin/bash
service mysql start
EOF

#或者

cat >> /etc/rc.d/rc.local << EOF
#!/bin/bash
/usr/local/mysql/support-files/mysql.server start
EOF

#设置rc.local可执行
chmod +x /etc/rc.d/rc.local
#设置rc-local.service文件
cat >> /usr/lib/systemd/system/rc-local.service << EOF
[Install]
WantedBy=multi-user.target
EOF
#使rc-local.service开机启动
systemctl enable rc-local.service
</pre>
	 
>9、密码忘记了怎么办<label id="anchor9"></label>
<pre>
（1）打开/etc/my.cnf在[mysqld]中加入一行 
skip-grant-tables
（2）启动mysql 
service mysqld start
（3）无密码登陆mysql
mysql -hlocalhost -u root 
（4）设置密码【注意，此时set password for root@localhost = password('新密码');这句不能用】
update mysql.user set authentication_string=password('新密码') where user='root';
（5）回到my.cnf把skip-grant-tables注释掉！
（6）重启mysql
（7）再次登录mysql，输入任何命令都提示要“设置密码...”，那就用下面这句：
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootroot123';
</pre>