#### 1、安装gradle
>1.1 下载
<a href="https://gradle.org/">官网</a>截至2022-11，下载的7.6要求jdk1.8
>1.2 执行下列系列命令解压
<pre class="prettyprint lang-s">
unzip -d /opt/ gradle-7.6-bin.zip
</pre>
>1.3 配置环境变量
<pre class="prettyprint lang-s">
cat &gt;&gt; /etc/profile &lt;&lt; EOF
export GRADLE_HOME=/opt/gradle-7.6
export PATH=$PATH:$GRADLE_HOME/bin
EOF
</pre>
>1.4 检查安装是否成功
<pre class="prettyprint lang-s">
#刷新环境
source /etc/profile
#检查安装结果
gradle -v
</pre>
>1.5 更改全局缓存位置，文件夹必须是.gradle
<pre class="prettyprint lang-s">
#在/etc/profile或~/.bash_profile增加如下:
cat &gt;&gt; /etc/profile &lt;&lt; EOF
export GRADLE_USER_HOME=自定义目录.gradle
EOF

#或者，
#通过gradle自带参数实现
#gradle -g j:/Java/.gradle build build
</pre>
>1.6 在 gradle安装目录/init.d下创建文件init.gradle
<pre class="prettyprint lang-s">
cat &gt; gradle安装目录/init.d/init.gradle &lt;&lt; EOF
allprojects {
	repositories {
		maven { url 'file:///J:/Java/shangheMavenLib'}
		mavenLocal()
		maven { name "Alibaba" ; url "https://maven.aliyun.com/repository/public" }
		#把这句删了，访问不出去maven { name "Bstek" ; url 'http://nexus.bsdn.org/content/groups/public/' }
		mavenCentral()
	}

	buildscript { 
		repositories { 
			maven { name "Alibaba" ; url 'https://maven.aliyun.com/repository/public' }
			#把这句删了，访问不出去maven { name "Bstek" ; url 'http://nexus.bsdn.org/content/groups/public/' }
			maven { name "M2" ; url 'https://plugins.gradle.org/m2/' }
		}
	}
}
EOF
</pre>
>1.7 在 .gradle目录下新建文件 gradle.properties，可以参考官网设置很多属性，如设置jdk版本
org.gradle.java.home=J:/Java/jdk-17.0.5