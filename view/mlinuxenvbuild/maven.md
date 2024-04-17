#### 1、安装apache-maven
>1.1 下载
https://maven.apache.org 进入download后，选择你要安装的版本。本文中的版本号是彼时笔者所选的。
>1.2 解压安装包
unzip maven压缩包.zip -d /opt/
>1.3 配置环境变量 root操作
<pre class="prettyprint lang-s">
cat >> /etc/profile &lt;&lt; EOF
export MAVEN_HOME=/opt/apache-maven-具体版本号
export PATH=$PATH:$MAVEN_HOME/bin
EOF
</pre>
>1.4 刷新环境
<pre>
source /etc/profile
</pre>
	
>1.5 检查安装是否成功
<pre>
mvn -version
</pre>

>1.6 创建maven配置文件，设置镜像库以及本地库位置
<pre class="prettyprint lang-s">
#创建文件夹
mkdir ~/.m2
#创建settings.xml
cat > ~/.m2/settings.xml << EOF
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"&gt;
	&lt;localRepository&gt;/opt/maven-lib&lt;/localRepository&gt;
	&lt;pluginGroups&gt;
	&lt;/pluginGroups&gt;
	&lt;proxies&gt;
	&lt;/proxies&gt;
	&lt;servers&gt;
	&lt;/servers&gt;
	&lt;mirrors&gt;
		&lt;!-- 这里可以是贵公司的私库，或者阿里库等私库 --&gt;
		&lt;mirror&gt;
			&lt;id&gt;alimaven-public&lt;/id&gt;
			&lt;name&gt;阿里库-public&lt;/name&gt;
			&lt;url&gt;https://maven.aliyun.com/repository/public&lt;/url&gt;
			&lt;mirrorOf&gt;public&lt;/mirrorOf&gt;        
		&lt;/mirror&gt;
		&lt;mirror&gt;
			&lt;id&gt;alimaven-central&lt;/id&gt;
			&lt;name&gt;阿里库-central&lt;/name&gt;
			&lt;url&gt;https://maven.aliyun.com/repository/central&lt;/url&gt;
			&lt;mirrorOf&gt;central&lt;/mirrorOf&gt;        
		&lt;/mirror&gt;
		&lt;!-- https://mvnrepository.com 官方仓库 --&gt;
		&lt;mirror&gt;
			&lt;id&gt;central&lt;/id&gt;
			&lt;name&gt;Maven Repository Switchboard&lt;/name&gt;
			&lt;url&gt;https://repo1.maven.org/maven2/&lt;/url&gt;
			&lt;mirrorOf&gt;central&lt;/mirrorOf&gt;
		&lt;/mirror&gt;
	&lt;/mirrors&gt;
	&lt;profiles&gt;
	&lt;/profiles&gt;
&lt;/settings&gt;

EOF
</pre>