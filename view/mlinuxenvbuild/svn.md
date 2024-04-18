#### 1、安装svn
>1.1 安装subversion
<pre class="prettyprint lang-s">
#检查是否已有安装
rpm -qa subversion
#如果安装有则查看安装位置
rpm -ql subversion
#安装服务器端和客户端一样
dnf install -y subversion
#官网发行的二进制包清单： http://subversion.apache.org/packages.html
</pre>
>1.2 配置svn服务器
<pre class="prettyprint lang-s">
#subversion默认是把/var/svn作为数据根目录的，此处创建一个根目录，在启动svn服务器的命令中会用到
#创建svn库的根目录
mkdir -p /opt/svn/repositories
chown -R svn:svn /opt/svn

#创建一个库，创建库的手法都一样
mkdir -p /opt/svn/repositories/testrepo
svnadmin create /opt/svn/repositories/testrepo
#配置新创建的库
cd /opt/svn/repositories/testrepo/conf
#=================该目录下的文件说明====================
#	authz：负责账号权限的管理，控制账号是否读写权限
#	passwd：负责账号和密码的用户名单管理
#	svnserve.conf：svn服务器配置文件
#	更改svnserver.conf时需要重启SVN服务才生效，更改authz，passwd文件时则不需要重启服务

vi svnserver.conf
#=====================svnserver.conf说明start==================
#	原始文件内容，都被注释掉的，我们只需要去掉指定内容前注释即可，如下：
#	[general]
#	#匿名访问的权限，可以是read,write,none,默认为read
#	anon-access=none
#	#使授权用户有写权限 
#	auth-access=write
#	#密码数据库的路径 
#	password-db=passwd
#	#访问控制文件 
#	authz-db=authz
#	#认证命名空间，subversion会在认证提示里显示，就是版本库
#	realm=/opt/svn/repositories/testrepo
=====================svnserver.conf说明end=====================

vi authz
#===============authz说明start========================
#	第一种：账号分权限
#	#设置[/]代表根目录下所有的资源   或者写成[repl:/]
#	[/]
#	#用户名=rw
#	liuxiaosong=rw
#	第二种：按分组分权限
#	[groups]
#	admin = admin,admin1 # admin为用户组,等号之后的为用户
#	test = test1, test2 # test为用户组,等号之后的为用户
#
#	[/] # 表示svn仓库目录（/var/svn/test），test: 对应前面配置的realm = test
#	@admin = rw # 表示admin组对仓库（/var/svn/test）目录有读写权限,r为读，w为写
#	@test = r # 表示test组的用户对仓库（/var/svn/test）目录只有读的权限
#
#	[仓库中的目录，格式：/目录，/的意思是当前仓库]
#	@admin=rw
#	@test=r
#
#	【范式说明】版本库的目录格式如下:
#	[<版本库>:/项目/目录]
#	@<用户组名> = 权限
#	<用户名> = 权限
#	其中[]內容有許多写法：
#	[/],表示根目录及其一下的路径，根目录是svnserver启动时指定好的，上述实例中我们指定为:/svn/svndata([/]=/svn/svndata).[/]就是表示对全部版本设置的权限
#	[test:/],表示对版本库test设置权限；
#	[test:/svnadmin],表示对版本库test中的svnadmin项目设置权限；
#	[test:/svnadmin/second],表示对版本库test中的svnadmin项目的目录设置权限；
#
#	权限的主体可以是用户组，用户或者*，用户组在前面要以@开头，*表示全部用户
#	权限分为：r ,w, rw和null ,null空表示没有任何权限。
#	auhtz配置文件中的每个参数，开头不能有空格，对于组要以@开头，用户不需要。
===============authz说明end=========================

vi passwd
#=============passwd说明start=======================
#	[users]
#	用户名=密码
#=============passwd说明end=========================
</pre>
>1.3 防火墙打开端口，svn默认3690端口，可以在启动命令中设置端口
<pre class="prettyprint lang-s">
iptables -A INPUT -p tcp --dport 3690 -j ACCEPT
iptables save
service iptables restart
</pre>

>1.4 启动svn服务器
<pre class="prettyprint lang-s">
#用root权限启动
svnserve -d -r /opt/svn/repositories --listen-port=3690
#启动命令参数解释
#-d : 守护进程
#-r : svn数据根目录
</pre>

>1.5 设置开机启动
<pre class="prettyprint lang-s">
systemctl enable svnserve.service
#当前可用tortoisesvn测试，访问地址：svn://服务器ip:3690/仓库名
#例如：svn://192.168.11.129:3690/testrepo
</pre>

>1.6 配置svn通过http访问。
<pre class="prettyprint lang-s">
#方式一：修改httpd的配置文件/etc/httpd/conf/httpd.conf
#直接在配置文件末尾添加下列配置：
&lt;location /svn&gt;
	DAV svn
	SVNParentPath 仓库的目录
	SVNListParentPath on
&lt;/location&gt;

#方式二：
cat >> /etc/httpd/conf.d/subversion.conf << EOF
&lt;Location /svn&gt;
	DAV svn
	SVNParentPath /opt/svn/repositories
	AuthType Basic
	AuthName "Authorization SVN"
	AuthzSVNAccessFile /opt/svn/repositories/testrepo/conf/authz
	AuthUserFile /opt/svn/repositories/testrepo/conf/passwd
	Require valid-user
&lt;/Location&gt;
EOF

#重启httpd
systemctl restart httpd.service

#访问
http://<hostip>/svn/<仓库名>
</pre>


#### 2、在linux上使用svn客户端
<pre class="prettyprint lang-s">
#如果仅仅在linux上使用svn作为客户端，安装手法仍然一样
dnf install -y subversion

#安装后不需要其他额外配置，直接使用客户端命令即可

#svn客户端操作命命令和git类似，样例如下：
#svn checkout ......具体svn地址 检出到本地的位置
#svn add ./*或具体文件
#svn commit -m '提交备注'

#linux安装了桌面后，可以使用tortoisesvn
#SVN可视化客户端：TortoiseSVN :https://tortoisesvn.net/downloads.html
</pre>