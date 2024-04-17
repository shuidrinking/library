
#### 1、NFS的用途
1.系统级文件夹共享，客户机可以与本地硬盘无差别地使用nfs共享目录；

2.对应用程序而言是无耦合、零入侵，只需要直接操作目录；

3.节省客户机硬盘，一份文件原件在各个客户端节点共享使用，无需每个机器都考一份，一致性极高

4.方便部署非常快速，维护十分简单

5.nfs底层通过rpc通信。


#### 2、构造nfs服务器
>2.1 检查安装rpcbind和nfs-server
<pre class="prettyprint lang-s">
#检查系统中是否已经安装，Fedora中默认会已经全部安装
rpm -qa | grep nfs
rpm -qa | grep rpcbind
#如果没有安装，则执行命令手工安装，【注意】Ubuntu服务器上安装nfs可能需要执行这个命令“apt-get install nfs-kernel-server”
#dnf install rpcbind
#dnf install nfs-utils

</pre>
>2.2 配置nfs
<pre class="prettyprint lang-s">
#配置nfs共享的目录，将目录位置和权限设置保存到/etc/exports文件中
echo "/newsgroup/article_archived_html *(rw,sync,root_squash)" >> /etc/exports
#核实配置结果
more /etc/exports

</pre>

>2.3 启动rpcbind和nfs-server服务，并设置为开机启动
<pre class="prettyprint lang-s">
#先启动
systemctl start rpcbind
systemctl start nfs-server
#查看启动状态
systemctl status rpcbind
systemctl status nfs-server
#设置为开机启动
systemctl enable rpcbind
systemctl enable nfs-server
</pre>

>2.4 打开111端口，允许客户机连接
<pre class="prettyprint lang-s">
iptables -A INPUT -p tcp --dport 111 -j ACCEPT
iptables-save

#开启firewall时执行
#firewall-cmd --add-port=111/tcp --permanent
#firewall-cmd --reload
	
</pre>
>2.5 查看本机挂载情况 
<pre class="prettyprint lang-s">
showmount -e localhost
</pre>

#### 3、挂载其他nfs服务器共享的目录

>3.1 linux客户机挂载其他nfs服务器套路
<pre class="prettyprint lang-s">
#挂载范式
mount -t nfs serverIpOrDomain:nfsCanonicalPath localPath
#例：把ip为192.168.106.166的nfs服务器的共享目录直接挂载到本机的/newsgroup/article_archived_html目录下
#挂载后可以使用“ ll /newsgroup/article_archived_html ” 查看挂载结果
mount -t nfs 192.168.106.166:/newsgroup/article_archived_html /newsgroup/article_archived_html
</pre>

>3.2 windows客户机挂载nfs服务器的套路
>>3.2.1、进入“控制面板” --> “程序和功能”，进入后在左侧菜单点击“启用或关闭windows功能”

>>3.2.2、在弹出的对话框中将“NFS 服务”下的“NFS 客户端”子选项进行打勾

>>3.2.3、以管理员身份运行dos命令行，将nfs服务器的共享目录挂载到一个新盘符
<pre class="prettyprint lang-s">
#范式：
mount \\serverIpOrDomain\nfsCanonicalPath localDisk:\

#例：
#mount \\192.168.106.166\newsgroup\article_archived_html x:\
#执行后会看到提示： x: 现已成功连接到 \\192.168.106.166\newsgroup\article_archived_html
#挂载成功后，在Windows资源管理器中可以看到新盘符，不过，通过网络映射的驱动器，显示略有不同，图标和本地硬盘有点区别
</pre>
>>3.2.4、NFS共享目录挂载时uid和gid均为2，而NFS服务的默认uid和gid为65534，因此此时仅有共享目录的读权限，按下面方法解决：
<pre class="prettyprint lang-s">
修改注册表在HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\ClientForNFS\CurrentVersion\Default中，
添加DWORD值两项：AnonymousUid，AnonymousGid，值均为0x00000409
设置后会显示0x00000409(1033)
重启电脑，此时客户端uid、gid已修改为NFS服务端的uid、gid，获得NFS共享目录读写权限。
</pre>
>>3.2.5、注意：由于windows nfs 客户端无法支持utf8，或更多的编码，服务端导入的文件，windows端查看会有乱码
<pre class="prettyprint lang-s">
解决方案主要有三种：
	（1）换解决方案，使用smb 共享，这等于不是解决方法。
	（2）使用第三方nfs 客户端，比如 ms-nfs41-client 软件。建议采用
	（3）windows 官方给了一个beta版本的解决方案。这个修改后，会导致本地软件乱码，不采用。
如果只从客户端维护文件，只当做文件上传下载，该问题基本没影响，可以不考虑。
</pre>

>3.3 卸载挂载点
<pre class="prettyprint lang-s">
umount 挂载点目录或盘符
#例：
#unmount x:
</pre>