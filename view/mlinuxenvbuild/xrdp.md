#### 1、不使用vnc，而使用windows
>1.1 xrdp介绍

* 传统使用vnc来远程管理linux图形界面。
* 
* Xrdp是Linux中对Microsoft远程桌面协议(RDP)的一个开源实现,它允许以图形方式控制远程系统。在Linux中安装xrdp并启动，即可使用windows下的mstsc远程桌面完美进入linux桌面。
* 
* 除了Windows RDP之外，xrdp工具还接受来自其他RDP客户端的连接，如FreeRDP，rdesktop和NeutrinoRDP。

>1.2 在linux安装xrdp
<pre class="prettyprint lang-s">
#检查是否有安装包
sudo dnf whatprovides xrdp
#安装
sudo dnf install xrdp
#启动并设置为开机启动
systemctl enable xrdp --now
#配置要使用的远程桌面
cat > /etc/xrdp/xrdp.ini << EOF
exec cinnamon-session
EOF
#或者可以设置为使用其他桌面，例如gnome
#exec gnome-session
EOF
#重启xrdp
service xrdp restart
#开放3389端口，xrdp使用该端口
iptables -A INPUT -p tcp --dport 3389 -j ACCEPT
iptables-save
service iptables restart
</pre>

>1.3 使用windows远程桌面工具进行连接
**xrdp成功启动后，便可以使用windows自带远程桌面mstsc进行连接**