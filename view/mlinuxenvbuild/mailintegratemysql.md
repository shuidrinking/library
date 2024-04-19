<script type="text/javascript" src="javascript/components/google-code-prettify/language/lang-sql.js"></script>

<div class="mapInPage" style="line-height:0.2rem;">
<a href="#anchor1">1、环境准备</a><br/>
<a href="#anchor1.1" class="addspace">1.1 参考资料</a><br/>
<a href="#anchor1.2" class="addspace">1.2 启用postfix的虚拟账号模式</a><br/>
<a href="#anchor1.3" class="addspace">1.3 在linux中创建用户vmail</a><br/>
<a href="#anchor1.4" class="addspace">1.4 安装postfix-mysql以及dovecot-mysql</a><br/>
<a href="#anchor1.5" class="addspace">1.5 申请域名证书</a><br/>
<a href="#anchor2">2、mysql配置</a><br/>
<a href="#anchor2.1" class="addspace">2.1 为mysql.sock建立软链接</a><br/>
<a href="#anchor2.2" class="addspace">2.2 在mysql中创建邮件系统需要的账号和数据库</a><br/>
<a href="#anchor2.3" class="addspace">2.3 创建邮件系统需要的表</a><br/>
<a href="#anchor3">3、postfix配置加强</a><br/>
<a href="#anchor3.1" class="addspace">3.1 安装cyrus-sasl-plain</a><br/>
<a href="#anchor3.2" class="addspace">3.2 完善main.cf中的配置项</a><br/>
<a href="#anchor4">4、postfix整合mysql</a><br/>
<a href="#anchor4.1" class="addspace">4.1 postfix配置sql的语法规范</a><br/>
<a href="#anchor4.2" class="addspace">4.2 配置邮箱用户的账号</a><br/>
<a href="#anchor4.3" class="addspace">4.3 配置邮箱用户的域名</a><br/>
<a href="#anchor4.4" class="addspace">4.4 配置邮箱用户的别名</a><br/>
<a href="#anchor4.5" class="addspace">4.5 配置邮箱用户的邮件目录</a><br/>
<a href="#anchor4.6" class="addspace">4.6配置mysql-*.cf系列文件的权限</a><br/>
<a href="#anchor5">5、配置dovecot并集成mysql</a><br/>
<a href="#anchor5.1" class="addspace">5.1 配置ip监听规则</a><br/>
<a href="#anchor5.2" class="addspace">5.2 配置dovecot-sql.conf.ext</a><br/>
<a href="#anchor5.3" class="addspace">5.3 开启数据库认证</a><br/>
<a href="#anchor5.4" class="addspace">5.4 用户信箱通配</a><br/>
<a href="#anchor5.5" class="addspace">5.5 收件箱命名空间设置</a><br/>
<a href="#anchor5.6" class="addspace">5.6 允许postfix访问dovecot的地盘</a><br/>
<a href="#anchor5.7" class="addspace">5.7 开放到公网时的SSL设置</a><br/>
<a href="#anchor6">6、验证测试</a><br/>
<a href="#anchor7">7、附录：可能会遇到的问题</a>
</div>
<label id="anchor1"></label>

##### 1、环境准备
>1.1 参考资料<label id="anchor1.1"></label>

（1）<a href="https://workaround.org/ispmail/jessie/postfix-mysql" target="_blank">https://workaround.org/ispmail/jessie/postfix-mysql</a>

（2）<a href="https://blog.csdn.net/rockage/article/details/110473246" target="_blank">https://blog.csdn.net/rockage/article/details/110473246</a>

（3）<a href="https://q.115.com/22503904/T34637.html" target="_blank">https://q.115.com/22503904/T34637.html</a>

（4）<a href="https://www.likecs.com/show-204123325.html" target="_blank">https://www.likecs.com/show-204123325.html</a>

>1.2 启用postfix的虚拟账号模式才能整合mysql存储邮箱账号<label id="anchor1.2"></label>

postfix构建的smtp支持两种账号模式：
<div class="contentDiv">
（1）系统真实账号；<br>
（2）虚拟账号
</div>
我们需要使用postfix的虚拟账号模式，才能集成mysql作为账户体系持久化。

>1.3 在linux中创建用户vmail<label id="anchor1.3"></label>

**dovecot的配置文件 /etc/dovecot/conf.d/10-master.conf中可以看到，它需要一个用户vmail**

<div class="contentDiv">
#建立gid为666的组vmail
groupadd -g 666 vmail
#添加虚拟用户vmail，uid为666
useradd -s /sbin/nologin -u 666 vmail -g 666
#查看创建结果
id vmail
uid=666(vmail) gid=666(vmail) groups=666(vmail)
ll -a /home/vmail
#在/home/vmail下创建域名文件夹
mkdir /home/vmail/你的域名.com/
chown vmail:vmail /home/vmail/你的域名.com/
chmod 777 /home/vmail
</div>

>1.4 安装postfix-mysql以及dovecot-mysql<label id="anchor1.4"></label>
<pre class="prettyprint lang-s">
install postfix-mysql
install dovecot-mysql
</pre>

>1.5 申请域名证书<label id="anchor1.5"></label>

**使用免费证书即可， <a href="https://zerossl.com/" target="_blank">去zerossl申请</a>**
<pre class="prettyprint lang-s">
#申请成功后，保存到下面位置:
mkdir -p /home/vmail/mailcert/邮箱域名/

#下载的证书文件后缀名是.crt的
#合并ca_bundle.crt 和 certificate.crt这2个文件，将ca_bundle里面的内容追加到certificate.crt的尾部
cat certificate.crt ca_bundle.crt > fullchain.crt
</pre>
<label id="anchor2"></label>

#### 2、mysql配置
>2.1 为mysql.sock建立软链接<label id="anchor2.1"></label>

* 该文件是本地socket连接时使用的套接字，外部连接使用的是tcp。
* 
* 默认情况下 mysql.sock文件在mysql启动时会自动生成于 /tmp/mysql.sock

<pre class="prettyprint lang-s">
mkdir /var/lib/mysql
ln -s /tmp/mysql.sock /var/lib/mysql/

#除了建软链接，还可以在my.cnf中指定这个文件生成的位置，不推荐使用这个做法
#[client]
#socket=/var/lib/mysql/mysql.sock
#[mysqld]
#socket=/var/lib/mysql/mysql.sock
</pre>

>2.2 在mysql中创建邮件系统需要的账号和数据库<label id="anchor2.2"></label>
<pre class="prettyprint lang-s">
#创建用户postuser，创建数据库email并分配给用户 mail_master

#要在mysql中执行的命令如下
/*创建数据库virtual_email*/
create schema virtual_email default character set utf8mb4 collate utf8mb4_general_ci; 
/*创建用户并分配权限 mail_master*/
create user 'mail_master'@'%' identified by 'email123';
create user 'mail_master'@'localhost' identified by 'email123';
/*授予这个用户对这个库的高级DBA权限*/
grant all on virtual_email.* to 'mail_master'@'%';
grant all on virtual_email.* to 'mail_master'@'localhost';
/*授予这个用户执行存储过程的权限*/
grant select on mysql.proc to 'mail_master'@'%';
grant select on mysql.proc to 'mail_master'@'localhost';
flush privileges; 
</pre>

>2.3 创建邮件系统需要的表<label id="anchor2.3"></label>
<pre class="prettyprint lang-sql">
drop table if exists `virtual_email`.`email_user`;
create table `virtual_email`.`email_user`
(
    `user_no` varchar(32) not null comment '邮箱用户账号（等于登录账号）',
    `mail_account` varchar(128) not null comment '用户邮箱',
    `mail_password` varchar(64) comment '邮箱密码',
    `mail_domain` varchar(64) not null comment '邮箱域名',
    `mail_dir` varchar(128) not null comment '邮箱目录',
    primary key (`user_no`)
)
comment = "邮箱用户定义"
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_bin;
</pre>

<pre class="prettyprint lang-sql">
drop table if exists `virtual_email`.`email_aliase`;
create table `virtual_email`.`email_aliase`
(
    `aliase` varchar(128) not null comment '别名邮箱',
    `destination` varchar(128) not null comment '真实邮箱',
    primary key (`aliase`)
)
comment = "邮箱别名定义"
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_bin;
</pre>
<label id="anchor3"></label>

#### 3、postfix配置加强
>3.1 安装cyrus-sasl-plain<label id="anchor3.1"></label>
<pre class="prettyprint lang-sql">
dnf install cyrus-sasl-plain
</pre>
>3.2 完善main.cf中的配置项<label id="anchor3.2"></label>
<pre class="prettyprint lang-sql">
#将/etc/postfix/main.cf中的 mydestination 置空，否则它的优先级高于虚拟账号，会冲突，用下面命令实现
postconf mydestination=
#设置用户邮箱的基础目录
postconf virtual_mailbox_base=/home/vmail
#设置用户建立文件的uid和gid
postconf virtual_gid_maps=static:666 
postconf virtual_uid_maps=static:666

#编辑/etc/postfix/main.cf ，启用ssl，如果不用编辑文件，可以使用命令postconf -m key=value 对下面一系列配置项目做设置
smtpd_banner = Welcome to our $myhostname ESMTP !
smtpd_tls_cert_file=/home/vmail/mailcert/邮箱域名/fullchain.crt或.pem
smtpd_tls_key_file=/home/vmail/mailcert/邮箱域名/private.key或.pem
smtpd_use_tls=yes
smtpd_tls_auth_only = yes
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes
smtpd_sasl_security_options = noanonymous
#smtpd_sasl_application_name这个项需要再确认key是否存在
smtpd_sasl_application_name=smtpd 
#指定必须认证本地主机域名
#smtpd_sasl_local_domain = $myhostname
#最大邮件体积
#message_size_limit = 1M
#不显示smtp服务器的相关信息
smtpd_banner = $myhostname ESMTP unknow
</pre>
<label id="anchor4"></label>

#### 4、postfix整合mysql

**配置/etc/postfix/mysql-*.cf系列文件，即可实现与mysql的整合**

>4.1 postfix配置sql的语法规范<label id="anchor4.1"></label>
<pre class="prettyprint lang-sql">
#以下写法是postfix3.2以前的写法
#postfix要查询的表的名称
table = email_user
#postfix要查询的字段
select_field = user_mail
#用户给定postfix的查询字段
where_field = user_mail

#从postfix3.2开始，上面配法被废弃，改为下面写法
query = 自定义sql
</pre>
>4.2 配置邮箱用户的账号<label id="anchor4.2"></label>
/etc/postfix/mysql-mailuser.cf
<pre class="prettyprint lang-sql">
#（1）置虚拟用户参数
postconf virtual_mailbox_maps=mysql:/etc/postfix/mysql-mailuser.cf
#（2）配置用户名称查询规则
vim /etc/postfix/mysql-mailuser.cf
#----------------mysql-mailuser.cf文件内容 start------------------------------
#数据库所在主机
hosts = 127.0.0.1
#登录数据库的用户
user = root
#登录数据库的密码
password = rootroot123
#postfix要查询的数据库名称
dbname = virtual_email
#查询语句
query = SELECT 1 FROM email_user WHERE user_mail='%s'
#----------------mysql-mailuser.cf文件内容 end  ------------------------------
#（3）在数据库中插入邮箱数据，然后执行命令检查配置是否正确
postmap -q "someone@yourdomain.com" mysql:/etc/postfix/mysql-mailuser.cf
#由于配置文件中 query是select 1，因此上面语句执行结果正确后结果是1，不正确则什么结果也没有
</pre>
>4.3 配置邮箱用户的域名<label id="anchor4.3"></label>
/etc/postfix/mysql-maildomain.cf
<pre class="prettyprint lang-sql">
#（1）配置虚拟用户域名参数
postconf virtual_mailbox_domains=mysql:/etc/postfix/mysql-maildomain.cf
#（2）配置用户邮箱域名查询规则
vim /etc/postfix/mysql-maildomain.cf
#----------------mysql-maildomain.cf文件内容 start------------------------------
#数据库所在主机
hosts = 127.0.0.1
#登录数据库的用户
user = root
#登录数据库的密码
password = rootroot123
#postfix要查询的数据库名称
dbname = virtual_email
#查询语句
query = SELECT 1 FROM email_user WHERE mail_domain='%s'
#----------------mysql-maildomain.cf文件内容 end  ------------------------------
#（3）在数据库中插入邮箱数据，然后执行命令检查配置是否正确
postmap -q "yourdomain.com" mysql:/etc/postfix/mysql-maildomain.cf
#由于配置文件中 query是select 1，因此上面语句执行结果正确后结果是1，不正确则什么结果也没有
</pre>
>4.4 配置邮箱用户的别名<label id="anchor4.4"></label>
/etc/postfix/mysql-mailaliase.cf
<pre class="prettyprint lang-sql">
#（1）配置虚拟用户别名定义
postconf virtual_alias_maps=mysql:/etc/postfix/mysql-mailaliase.cf
#（2）配置别名查询规则
vim /etc/postfix/mysql-mailaliase.cf
#----------------mysql-mailaliase.cf文件内容 start------------------------------
#数据库所在主机
hosts = 127.0.0.1
#登录数据库的用户
user = root
#登录数据库的密码
password = rootroot123
#postfix要查询的数据库名称
dbname = virtual_email
#查询语句
#query = SELECT destination FROM email_aliase WHERE aliase='%s'
query = SELECT user_mail FROM email_user WHERE user_mail='%s'
#----------------mysql-mailaliase.cf文件内容 end  ------------------------------
#（3）在数据库中插入邮箱别名数据，然后执行命令检查配置是否正确
postmap -q "somealias@yourdomain.com" mysql:/etc/postfix/mysql-mailaliase.cf
# 结果会出现别名对应的真实邮箱
</pre>
>4.5 配置邮箱用户的邮件目录<label id="anchor4.5"></label>
/etc/postfix/mysql-mailboxdir.cf
<pre class="prettyprint lang-sql">
#（1）配置用户邮箱目录
postconf virtual_mailbox_maps=mysql:/etc/postfix/mysql-mailboxdir.cf
#（2）配置用户邮箱目录查询规则
vim /etc/postfix/mysql-mailboxdir.cf
#----------------mysql-mailboxdir.cf文件内容 start------------------------------
#数据库所在主机
hosts = 127.0.0.1
#登录数据库的用户
user = root
#登录数据库的密码
password = rootroot123
#postfix要查询的数据库名称
dbname = virtual_email
#查询语句
query = SELECT mail_dir FROM email_user WHERE user_mail='%s'
#----------------mysql-mailboxdir.cf文件内容 end  ------------------------------
#（3）在数据库中插入邮箱用户数据，然后执行命令检查配置是否正确
postmap -q "somealias@yourdomain.com" mysql:/etc/postfix/mysql-mailboxdir.cf
# 结果会出用户的邮箱目录
</pre>
>4.6 配置mysql-*.cf系列文件的权限<label id="anchor4.6"></label>
<pre class="prettyprint lang-sql">
chown postfix:postfix /etc/postfix/mysql-*.cf
chmod u=rw,g=r,o= /etc/postfix/mysql-*.cf
</pre>
<label id="anchor5"></label>

#### 5、配置dovecot并集成mysql
>5.1 配置ip监听规则<label id="anchor5.1"></label>
<pre class="prettyprint lang-sql">
vim /etc/dovecot/dovecot.conf
#------------文件内容变更   start ----------
	#设置监听 *为ip4，::为ip6
	listen = *
	#设置允许访问地址网络
	login_trusted_networks = 0.0.0.0/0
#------------文件内容变更   end ----------
</pre>
>5.2 配置dovecot-sql.conf.ext<label id="anchor5.2"></label>
<pre class="prettyprint lang-sql">
1、复制dovecot-sql.conf.ext配置文件，并编辑
$ cp /usr/share/doc/dovecot/example-config/dovecot-sql.conf.ext /etc/dovecot/dovecot-sql.conf.ext
$ vi /etc/dovecot/dovecot-sql.conf.ext
#------------文件内容变更 start ----------
driver = mysql
connect = host=127.0.0.1 dbname=virtual_email user=root password=rootroot123
#设置默认为明文密码
default_pass_scheme = PLAIN
#以下sql中字段的别名不能自定义，否则dovecot无法识别
password_query = \
 SELECT user_mail as username, mail_domain as domain, mail_password as password \
 FROM email_user WHERE user_no = '%n' AND mail_domain = '%d'

# 如果后面有步骤中设置了/etc/dovecot/conf.d/auth-sql.conf.ext开启userdb配置，那么下面这个user_query配置就不要了！
#user_query = \
#  SELECT concat('/home/vmail/',mail_domain, '/', user_no) as home, 666 as uid, 666 as gid \
#  FROM email_user WHERE user_no = '%n' AND mail_domain = '%d'
#------------文件内容变更   end ----------
</pre>
>5.3 开启数据库认证<label id="anchor5.3"></label>
<pre class="prettyprint lang-sql">
vim /etc/dovecot/conf.d/10-auth.conf
#------------文件内容变更 start ----------
	#如果密码需要dovecot做加密处理，此处要设置为yes
	disable_plaintext_auth = no
	auth_mechanisms = plain

	#不需要客户端提供证书
	auth_ssl_require_client_cert = no
	# Take the username from client's SSL certificate, using 
	# X509_NAME_get_text_by_NID() which returns the subject's DN's
	# CommonName. 
	auth_ssl_username_from_cert = no
	# Space separated list of wanted authentication mechanisms:
	#   plain login digest-md5 cram-md5 ntlm rpa apop anonymous gssapi otp skey
	#   gss-spnego
	# NOTE: See also disable_plaintext_auth setting.
	auth_mechanisms = plain

	#注释下面配置
	# !include auth-system.conf.ext

	#放开下面配置项，开启数据库认证
	!include auth-sql.conf.ext
#------------文件内容变更   end ----------
</pre>
>5.4 用户信箱通配<label id="anchor5.4"></label>
<pre class="prettyprint lang-sql">
vi /etc/dovecot/conf.d/auth-sql.conf.ext
#------------文件内容变更 start ----------
passdb {
  driver = sql

  # Path for SQL configuration file, see example-config/dovecot-sql.conf.ext
  args = /etc/dovecot/dovecot-sql.conf.ext
}

userdb {  
    driver = static
    args = uid=vmail gid=vmail home=/home/vmail/%d/%n
}
#------------文件内容变更   end ----------
</pre>
>5.5 收件箱命名空间设置<label id="anchor5.5"></label>
<pre class="prettyprint lang-sql">
vi /etc/dovecot/conf.d/15-mailboxes.conf
#------------文件内容变更 start ----------
namespace inbox {
  mailbox Drafts {
    auto = create
    special_use = \Drafts
  }
  mailbox Junk {
    auto = create
    special_use = \Junk
  }
  mailbox Trash {
    auto = create
    special_use = \Trash
  }
  mailbox Sent {
    auto = create
    special_use = \Sent
  }
  mailbox "Sent Messages" {
    auto = create
    special_use = \Sent
  }
}
#------------文件内容变更   end ----------
</pre>
>5.6 允许postfix访问dovecot的地盘<label id="anchor5.6"></label>

* **dovecot的端口定义和服务定义在10-master.conf文件中**
* 
* **打通dovecot和postfix的关联，授权postfix通过lmtp协议访问属于dovecot的地盘，访问权限是0600，表示有读写权限，但无执行权限**

<pre class="prettyprint lang-sql">
vi /etc/dovecot/conf.d/10-master.conf
#------------文件内容变更 start ----------
service lmtp {
  unix_listener /var/spool/postfix/private/dovecot-lmtp {
   mode = 0600
   user = postfix
   group = postfix
  }
}
 
service auth {
  unix_listener /var/spool/postfix/private/auth {
    mode = 0666
    user = postfix
    group = postfix
  }
 
  unix_listener auth-userdb {
   mode = 0600
   user = vmail
  }
  user = dovecot
}
 
service auth-worker {
  user = vmail
}
#------------文件内容变更   end ----------
</pre>
>5.7 开放到公网时的SSL设置<label id="anchor5.7"></label>

**如果服务器没有对外开放公网访问时，此步骤可忽略**

<pre class="prettyprint lang-sql">
#SSL设置
vi /etc/dovecot/conf.d/10-ssl.conf
#------------文件内容变更 start ----------
#从密码到邮件内容全部加密，前面在“授权机制”那个步骤允许使用plain，因为整个通道都已经被加密了，明文密码走在加密通道里面也可以认为是安全的
ssl = required

#这两个文件与Postfix里的设置是完全一致的，也就是说Postfix和Dovecot采用的是同一个证书，不仅如此，实际上这本证书还可以用于nginx用于加密你的Web网站，开通https等
ssl_cert = /home/vmail/mailcert/邮箱域名/fullchain.crt或.pem
ssl_key = /home/vmail/mailcert/邮箱域名/private.key或.pem
ssl_cipher_list = PROFILE=SYSTEM
#------------文件内容变更 end ----------
</pre>
<label id="anchor6"></label>

#### 6、验证测试
<pre class="prettyprint lang-sql">
#重启三大件
systemctl restart postfix dovecot saslauthd

#创建邮箱账号

#用thunderbird或其他客户端登录邮箱，尝试发送邮件
</pre>
<label id="anchor7"></label>

#### 7、附录：可能会遇到的问题
>7.1 数据库无法链接，无法连接、验证权限等
<pre>
如果连接本机mysql，将localhost修改为127.0.0.1
</pre>
>7.2 foxmail thunderbird等客户端连接pop或imap时一直弹出验证密码问题
<pre>
打开dovecot的debug日志 
10-logging.conf 文件中设置 
auth_debug = yes
mail_debug = yes
然后 tail -f /var/log/maillog
发现查询用户密码的sql中传入的domain字段值为空导致查询结果为空

解决办法：在客户端设置用户账号时，把邮箱账号填写全面，不要只填写@符号前的部分
</pre>

>7.3 验证用户名密码在dovecot中的有效性
<pre>
telnet xxx.xxx.xxx.xxx 110
进入后输入
user xxxxx@xxxxx.com
pass 密码字符串

会看到验证结果
</pre>

>7.4 mua使用证书
<pre>
MUA连接邮件服务器注意事项:
（1）把CA的证书cacert.pem下载到客户端改名cacert.crt并安装到根信任域。
（2）客户端连接pop3s服务器时POP3s会发来证书，此时CA证书cacert.crt会去验证POP3证书，没有问题就可以传输邮件。
（3）MUA在连接POP3s服务器时要使用域名不能使用IP地址，因为要跟证书中的主机名对应，不然还是会不受信任，同时客户端要能解析此域名。
（4）安全方式使用SSL或STARTTLS时，密码设置为“普通密码”即可.
</pre>

>7.5 集成到其他系统时需要修改的信息
<pre>
（1）自定义配置的cf文件，/etc/postfix/mysql-*.cf
将其中的数据库名称、表名、sql都修改为集成到的目标系统中的定义
（2）vi /etc/dovecot/dovecot-sql.conf.ext 
connect = host=数据库地址 dbname=数据库名称 user=登录账号 password=登录密码
password_query = 目标系统中定制的sql
</pre>