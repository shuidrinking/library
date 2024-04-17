#### 1、安装sshd
<pre class="prettyprint lang-s">
#检查安装
rpm -qa | grep openssh-server 
#或者
rpm -qa|grep ssh

#没安装时执行
dnf install openssh-server

#修改配置文件，放开端口、访问权限
vim /etc/ssh/sshd_config
#放开下面内容
#Port 22
#Protocol 2
#PermitRootLogin yes
#MaxAuthTries 6
#RSAAuthentication yes
#旧版本fedora25或更旧版本，需要在文件尾部补充下面三行内容
#Ciphers aes128-cbc,aes192-cbc,aes256-cbc,aes128-ctr,aes192-ctr,aes256-ctr,3des-cbc,arcfour128,arcfour256,arcfour,blowfish-cbc,cast128-cbc 
#MACs hmac-md5,hmac-sha1,umac-64@openssh.com,hmac-ripemd160,hmac-sha1-96,hmac-md5-96 
#KexAlgorithms diffie-hellman-group1-sha1,diffie-hellman-group14-sha1,diffie-hellman-group-exchange-sha1,diffie-hellman-group-exchange-sha256,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group1-sha1,curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256
</pre>
#### 2、开启sshd服务
<pre class="prettyprint lang-s">
#设置为开机启动项
systemctl enable sshd.service
#启动，以下方法均可
/etc/rc.d/init.d/sshd start
/etc/init.d/ssh start
service sshd start
systemctl start sshd.service
#查看服务状态
service sshd status
#防火墙里放开22端口
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables-save
service iptables restart
#查看22端口是否打开
iptables -L -n
</pre>