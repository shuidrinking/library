#### 1、安装传统的ftp服务器
>1.1 安装配置
<pre class="prettyprint lang-s">
#执行安装命令，一路y
dnf install vsftpd
#查看FTP服务器概要
rpm -qi vsftpd
#服务设置不开机启动
systemctl disable vsftpd.service
#打开21端口
firewall-cmd --add-port=21/tcp
</pre>
>1.2 禁用SELINUX：
<pre class="prettyprint lang-s">
#1) 将selinux通过命令禁用：
setenforce 0
#2) 如果要永久禁用，可以修改配置文件：
vi /etc/sysconfig/selinux
#将
#SELINUX=enforcing
#改成
#SELINUX=disabled
</pre>
>1.3 以root用户登录，注释掉ftp用户授权文件中的root，禁止root登录ftp
<pre class="prettyprint lang-s">
vi /etc/vsftpd/ftpusers3
#将root那一行注释掉
</pre>
>1.6 修改ftp配置文件vsftpd.conf，将选项用户列表禁止
<pre class="prettyprint lang-s">
vi /etc/vsftpd/vsftpd.conf
#userlist_enable=YES改为userlist_enable=NO
</pre>
		