<div class="mapInPage">
<a href="#anchor1">1、环境准备</a><br/>
<a href="#anchor1.1" class="addspace">1.1 卸载sendmail</a><br/>
<a href="#anchor1.2" class="addspace">1.2 设置服务器域名信息</a><br/>
<a href="#anchor1.3" class="addspace">1.3 设置开放端口</a><br/>
<a href="#anchor2">2、安装邮件系统3大件</a><br/>
<a href="#anchor2.1" class="addspace">2.1 安装</a><br/>
<a href="#anchor2.2" class="addspace">2.2 设置mta为postfix</a><br/>
<a href="#anchor3">3、配置并测试postfix</a><br/>
<a href="#anchor3.1" class="addspace">3.1 配置postfix属性</a><br/>
<a href="#anchor3.2" class="addspace">3.2 配置postfix的参数</a><br/>
<a href="#anchor3.3" class="addspace">3.3 启动并核验配置</a><br/>
<a href="#anchor3.4" class="addspace">3.4 测试发送邮件</a><br/>
<a href="#anchor3.5" class="addspace">3.5 查看邮件发送结果</a><br/>
<a href="#anchor4">4、配置并使用dovecot</a><br/>
<a href="#anchor4.1" class="addspace">4.1 设置监听协议</a><br/>
<a href="#anchor4.2" class="addspace">4.2 允许以明文登录</a><br/>
<a href="#anchor4.3" class="addspace">4.3 设置邮箱存储位置</a><br/>
<a href="#anchor4.4" class="addspace">4.4 禁用ssl认证</a><br/>
<a href="#anchor4.5" class="addspace">4.5 设置dovecot的日志</a><br/>
<a href="#anchor5">5、设置发送出去的邮件的“来源域名”</a><br/>
<a href="#anchor6">6、附录</a><br/>
<a href="#anchor6.1" class="addspace">6.1 发送邮件的sh脚本样例</a><br/>
<a href="#anchor6.2" class="addspace">6.2 postfix配置文件master.cf</a><br/>
<a href="#anchor6.3" class="addspace">6.3 邮件服务器参考资料</a><br/>
<a href="#anchor6.4" class="addspace">6.4 伪装发件地址</a><br/>
<a href="#anchor6.5" class="addspace">6.5 postfix的一些操作命令</a>
</div>

<label id="anchor1"></label>
#### 1、环境准备

>1.1 卸载sendmail：<label id="anchor1.1"></label>
<pre class="prettyprint lang-s">
#关停sendmail相关的所有服务，然后卸载sendmail
service sendmail stop
chkconfig sendmail off
dnf remove sendmail
</pre>

>1.2 设置服务器域名信息
<pre class="prettyprint lang-s"><label id="anchor1.2"></label>
#如果未设置，则可能会导致发送时启动时做dns lookup很慢

#设置hosts
vi /etc/hosts
#注释原设置，新增下面配置，注意修改域名为你的真实域名
127.0.0.1   localhost 域名 域名
::1         localhost 域名 域名
127.0.0.1   域名
公网ip      域名

#设置dns服务器
cat >> /etc/resolv.conf << EOF
nameserver 8.8.8.8
#nameserver 本地dns服务器，例如114.114.114.114
EOF
</pre>

>1.3 设置开放端口<label id="anchor1.3"></label>
<pre class="prettyprint lang-s">
iptables -A INPUT -p tcp --dport 25 -j ACCEPT 
iptables -A INPUT -p tcp --dport 110 -j ACCEPT
iptables -A INPUT -p tcp --dport 143 -j ACCEPT
iptables -A INPUT -p tcp --dport 465 -j ACCEPT
iptables -A INPUT -p tcp --dport 587 -j ACCEPT
iptables -A INPUT -p tcp --dport 993 -j ACCEPT
iptables -A INPUT -p tcp --dport 995 -j ACCEPT
iptables-save
iptables -L -n

#firewall-cmd --add-port=端口号/tcp --permanent
#firewall-cmd --reload

#-------------------端口用途说明----------------------
#	25/tcp smtp ：负责广域网邮件传递，非加密
#	465/tcp smtps ：同上，加密
#	143/tcp imap ：负责将服务器的邮件传回邮件客户端，非加密
#	110/tcp pop3 : 同上
#	995/tcp pop3s :同上，加密
#	993/tcp imaps ：同上，加密
#	587/tcp submission ：同上，加密
#	lmtp ：为内部传输服务，不对外，无端口号 
</pre>
<label id="anchor2"></label>

#### 2、安装邮件系统3大件：postfix、dovecot、saslauth

>2.1 安装<label id="anchor2.1"></label>
<pre class="prettyprint lang-s">
#安装前检查
rpm -qa | grep mail
rpm -qa | grep mailx
rpm -qa | grep postfix
rpm -qa | grep dovecot
rpm -qa | grep sasl
#安装
dnf -y install postfix
#配置工具
dnf -y install m4*
#smtp认证 
dnf -y install cyrus-sasl
#对客户端开放的服务器
dnf -y install dovecot
dnf -y install mailx
</pre>
>2.2 设置mta为postfix<label id="anchor2.2"></label>
<pre class="prettyprint lang-s">
#执行下面命令选择postfix的那一条
alternatives --config mta 
</pre>
<label id="anchor3"></label>

#### 3、配置并测试postfix
>3.1 配置postfix属性<label id="anchor3.1"></label>
<pre class="prettyprint lang-s">
#编辑文件/etc/postfix/main.cf
vi /etc/postfix/main.cf

#参考配置：
#域名要写成你的
myhostname = mail.xxx.com
#配置了启动不了
#mydomain = xxx.com
myorigin = $mydomain
#不用配置他们默认是all
#inet_interfaces = all
#inet_protocols = IPv4
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/
#设置信任客户端
mynetworks = 0.0.0.0/0

#-------------------------配置解释---------------------------
#myhostname = sample.test.com　  设置系统的主机名
#mydomain = test.com　  设置域名（我们将让此处设置将成为E-mail地址“@”后面的部分）
#myorigin = $mydomain　  将发信地址“@”后面的部分设置为域名（非系统主机名）
#inet_interfaces = all　  接受来自所有网络的请求
#inet_protocols = ipv4  ipv4要用小写的，注释里大写的是错的
#mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain　  指定发给本地邮件的域名
#home_mailbox = Mailbox　  指定用户邮箱目录
#smtp_sasl_auth_enable = yes
#smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
#smtp_sasl_security_options =
#mynetworks = 0.0.0.0/0  信任的客户端，默认值不能向外网发邮件

#发件箱存储有两种：
#一种是 Mailbox 方式，即同一个用户的所有邮件内容存储为单个文件，通常保存在/var/spool/mail/目录下文件名与用户名相同（Postfix默认使用）；
#第二种是 Maildir 方式，即使用目录结构来存储用户的邮件内容每一个用户使用一个文件夹，每封邮件都作为一个独立的文件存放。Maildir方式的存取速度和效率要好一些对于管理邮件内容页更加方便。
</pre>
>3.2 配置postfix开放的协议、端口、集成组件<label id="anchor3.2"></label>
<pre class="prettyprint lang-s">
#编辑文件/etc/postfix/master.cf
vi /etc/postfix/master.cf

#把被注释掉的 smtps和submission配置项打开
submission inet n       -       n       -       -       smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_reject_unlisted_recipient=no
  -o smtpd_client_restrictions=$mua_client_restrictions
  -o smtpd_helo_restrictions=$mua_helo_restrictions
  -o smtpd_sender_restrictions=$mua_sender_restrictions
  -o smtpd_recipient_restrictions=
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
smtps     inet  n       -       n       -       -       smtpd
  -o syslog_name=postfix/smtps
  -o smtpd_tls_wrappermode=yes
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_reject_unlisted_recipient=no
  -o smtpd_client_restrictions=$mua_client_restrictions
  -o smtpd_helo_restrictions=$mua_helo_restrictions
  -o smtpd_sender_restrictions=$mua_sender_restrictions
  -o smtpd_recipient_restrictions=
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
</pre>

>3.3 启动并核验配置<label id="anchor3.3"></label>
<pre class="prettyprint lang-s">
#启动
systemctl restart postfix
#查看当前配置
postconf -n|grep inet_protocols
#启动后，无需编辑main.cf设置postfix的属性，直接用命令即可
#例如：
#postconf -e inet_protocols=all
</pre>

>3.4 测试发送邮件<label id="anchor3.4"></label>

**注意：此时只能是发送邮件，并不能接收邮件**
<pre class="prettyprint lang-s">
#大部分邮箱会认为这是垃圾邮件而收不到，qq邮箱不会拦截
echo "大王叫你也一起去" | mail -s "大王叫我去巡山" shuidrinking@hotmail.com
</pre>
>3.5 查看邮件发送结果<label id="anchor3.5"></label>
<pre class="prettyprint lang-s">
#看日志：
tail -f /var/log/maillog
#Postfix和dovecot的log共用同一个文件：/var/log/maillog
#发送成功的话，会返回250和OK，也可以去自己的邮件客户端查收。

#看发件箱：
ll /var/spool/mail/

#看发送队列
#列出当前在postfix发送队列中的所有邮件
mailq :
#删除当前等待发送队列的所有邮件，包括发送失败的退信
postsuper -d ALL
</pre>
<label id="anchor4"></label>

#### 4、配置并使用dovecot
>4.1 设置监听协议<label id="anchor4.1"></label>
<pre class="prettyprint lang-s">
vim /etc/dovecot/dovecot.conf
#设置监听协议
protocols = imap imaps pop3 pop3s
</pre>
>4.2 允许以明文登录<label id="anchor4.2"></label>
<pre class="prettyprint lang-s">
vim /etc/dovecot/conf.d/10-auth.conf 
#放开第10行 disable_plaintext_auth = yes, 并修改为 
disable_plaintext_auth = no
auth_mechanisms = plain login
</pre>
>4.3 设置邮箱存储位置<label id="anchor4.3"></label>
<pre class="prettyprint lang-s">
vim /etc/dovecot/conf.d/10-mail.conf
#取消以下注释，配置后，用户的接收邮件都将存在于文件夹/home/具体用户/Maildir/
#mail_location = maildir:~/Maildir

#取消以下注释，配置后，用户的接收邮件都将存在于文件夹 /var/mail/具体用户/
mail_location = mbox:~/mail:INBOX=/var/mail/%u
</pre>
>4.4 禁用ssl认证<label id="anchor4.4"></label>
<pre class="prettyprint lang-s">
vim /etc/dovecot/conf.d/10-ssl.conf
ssl = no
</pre>
>4.5 设置dovecot的日志<label id="anchor4.5"></label>
<pre class="prettyprint lang-s">
vim /etc/dovecot/conf.d/10-logging.conf
#如果需要debug更多日志信息，放开：
auth_debug = yes
mail_debug = yes
#如果需要独立存放日志文件，则添加
info_log_path = /var/log/dovecot_info.log
debug_log_path = /var/log/dovecot_debug.log
</pre>
<label id="anchor5"></label>

#### 5、设置发送出去的邮件的“来源域名”
<pre class="prettyprint lang-s">
#在/etc/mail/submit.mc文件中追加配置
cat >> /etc/mail/submit.mc << EOF
MASQUERADE_AS(`mail.你自己的.com')dnl
FEATURE(`masquerade_envelope')dnl
EOF

#执行更新
m4 /etc/mail/submit.mc > /etc/mail/submit.cf
#设置后，发送出去的邮件的发件人就是你自己的域名
</pre>
<label id="anchor6"></label>

#### 6、附录
>6.1 发送邮件的sh脚本样例<label id="anchor6.1"></label>
<pre class="prettyprint lang-s">
#! /bin/bash
echo "shell脚本发送" | mail -s "mail测试邮件" 122131372@qq.com
# echo "shell脚本发送带附件" | mail -s "mail测试邮件" -a /home/appends/xxxx.tar 122131372@qq.com
echo "邮件发送成功"
</pre>
>6.2 postfix配置文件master.cf<label id="anchor6.2"></label>

**master.cf 这个一般不配置，主要作用是：postfix中各个组件如何协调工作**

>6.3 邮件服务器参考资料<label id="anchor6.3"></label>

（1）sendmail 官网：http://www.sendmail.org

（2）mailx 官网：http://heirloom.sourceforge.net/mailx.html

（3）postfix 官网：http://www.postfix.org

（4）cyrus-sasl 官网：https://github.com/cyrusimap/cyrus-sasl/

（5）sendEmail 官网：http://caspian.dotconf.net/menu/Software/SendEmail/

>6.4 伪装发件地址<label id="anchor6.4"></label>
<pre class="prettyprint lang-s">
vim /etc/postfix/generic
#修改配置项，把自己的地址伪装成 root@qq.com
root@linux.com          root@qq.com
</pre>
>6.5 postfix的一些操作命令<label id="anchor6.5"></label>
<pre class="prettyprint lang-s">
#设置mta
alternatives --config mta 
#待弹出列表后，选择要使用的mta的序号
#检查postfix
postfix check
#查看默认配置
postconf  -d
#查看当前配置
postconf -n
#配置某一参数
postconf -e 
#例如：postconf -e mydomain=mail.baidu.com
#查询出 postfix 支持哪些类型的查询表
postconf -m
#查看当前系统支持哪些数据库
postconf default_database_type
#其他一些命令
postalias(1), create/update/query alias database
postcat(1), examine Postfix queue file
postconf(1), Postfix configuration utility
postfix(1), Postfix control program
postkick(1), trigger Postfix daemon
postlock(1), Postfix-compatible locking
postlog(1), Postfix-compatible logging
postmap(1), Postfix lookup table manager
postmulti(1), Postfix multi-instance manager
postqueue(1), Postfix mail queue control
postsuper(1), Postfix housekeeping
mailq(1), Sendmail compatibility interface
newaliases(1), Sendmail compatibility interface
sendmail(1), Sendmail compatibility interface
</pre>