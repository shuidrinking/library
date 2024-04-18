<div class="mapInPage">
<a href="#anchor1">1、安装nexus3</a><br/>
<a href="#anchor2">2、使用本私库</a><br/>
<a href="#anchor3">3、私库安全设置</a><br/>
<a href="#anchor4">4、nexus控制台操作仓库记录</a><br/>
</div>
<label id="anchor1"></label>

#### 1、安装nexus3

**本文中版本号仅供参考，<a href="https://help.sonatype.com/en/download.html" target="_blank">去官网下载</a>**
>1.1 下载nexus
<pre class="prettyprint lang-s">
#下载
cd /usr/local
wget https://download.sonatype.com/nexus/3/nexus-3.37.3-02-unix.tar.gz
#下载完成解压
cd /usr/local
chmod +x ./nexus-3.29.2-02-unix.tar.gz
tar -xzf ./nexus-3.29.2-02-unix.tar.gz -C /usr/local
#解压后，查看/usr/local中是否新增两个文件夹：nexus-3.29.2-02和sonatype-work
</pre>
>1.2 设置环境变量
<pre class="prettyprint lang-s">
#在etc/profile文件尾部追加内容
cat >> /etc/profile << EOF
export NEXUS_HOME=/usr/local/nexus-3.29.2-02
export PATH=$PATH:$NEXUS_HOME/bin
EOF

#刷新环境
source /etc/profile
#放开8081端口
iptables -A INPUT -p tcp --dport 8081 -j ACCEPT
iptables-save
service iptables restart

#建立启动命令软链接
ln -s /usr/local/nexus-3.29.2-02/bin/nexus /usr/local/bin
</pre>
>1.3【该步骤可省略】设置nexus运行参数，包括最大内存等
<pre class="prettyprint lang-s">
vi /usr/local/nexus-3.29.2-02/bin/nexus.vmoptions
</pre>
>1.4 【该步骤可省略】设置nexus服务器默认端口号，默认为8081
<pre class="prettyprint lang-s">
vi /usr/local/nexus-3.29.2-02/etc/nexus-default.properties
</pre>
>1.5 启动nexus，启动后需要等待启动完毕，比较慢
<pre class="prettyprint lang-s">
nexus run &
</pre>
>1.6 登录控制台
<pre class="prettyprint lang-s">
#访问nexus控制台
http://IP:8081

#查找控制台管理员的初始密码
more /usr/local/sonatype-work/nexus3/admin.password
</pre>

<label id="anchor2"></label>

#### 2、使用本私库
<pre class="prettyprint lang-s">
&lt;mirror&gt;
  &lt;id>linuxNoteBook&lt;/id&gt;
  &lt;name&gt;linuxNoteBook&lt;/name&gt;
  &lt;url&gt;http://Ip:8081/repository/maven-public/&lt;/url&gt;
  &lt;mirrorOf&gt;*&lt;/mirrorOf&gt;        
&lt;/mirror&gt;
</pre>
<label id="anchor3"></label>

#### 3、私库安全设置
>3.1 保证私服中的库不能被匿名下载
<div>
Nexus默认的配置，允许匿名下载maven库中的包。需要将其禁止掉。具体做法如下。
开启下载包的HTTP认证
在nexus-default.properties添加一行nexus.browserdetector.disable=true。重启nexus。
关闭匿名用户
保证下图中Allow anonymous users to access the server是没有选中的。
</div>

>3.2 在settings.xml中添加认证信息

**在Maven环境的settings.xml中找到servers的部分，添加一个server配置如下。**
<pre class="prettyprint lang-s">
&lt;server&gt;
	&lt;id&gt;my-lib-repo&lt;/id&gt;
	&lt;username&gt;my-lib-repo-reader&lt;/username&gt;
	&lt;password&gt;my-lib-repo-reader&lt;/password&gt;
&lt;/server&gt;
</pre>
<label id="anchor4"></label>

#### 4、nexus控制台操作仓库记录
>4.1 登录nexus控制台后，点击左上角齿轮状的按钮，进入设置页面
>4.2 创建阿里云“代理仓库”
<pre class="prettyprint lang-s">
点击左侧Repository --> Repositories，进入仓库管理页面
点击Create repository按钮
点击后，在弹出的页面中选择“maven2(proxy)”
选择后，录入仓库信息，此时创建一个“代理仓库”，目标为商禾私库
	=============录入参数start==============
	Name：aliyun
	Remote storage：http://maven.aliyun.com/nexus/content/groups/public/
	=============录入参数end==============
</pre>
>4.3 设置maven-public分组库
<pre class="prettyprint lang-s">
点击左侧Repository --> Repositories，进入仓库管理页面
在页面的库列表中的 maven-public，跳转到该仓库的设置页
在页面下方的Group设置中，将前面新建的 shanghe以及aliyun从左侧移动到右侧，使他们作为分组的Members
点击“保存”按钮
</pre>
>4.4 设置客户端的获取权限
<pre class="prettyprint lang-s">
点击左侧 Security --> Anonymous Access，进入设置页面
将“Allow anonymous users to access the server”选项打勾
点击“Save”按钮保存
</pre>
		