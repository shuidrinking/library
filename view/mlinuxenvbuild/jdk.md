#### 1、安装或更新jdk
>1.1 卸载系统自带的jdk，安装自定义版本
<pre class="prettyprint lang-s">
#找到自带的jdk 
rpm -qa|grep jdk

#卸载自带jdk
rpm -e --nodeps 上面找到的jdk全称

#下载jdk
#到官网下载你需要的版本： https://www.oracle.com/java/technologies/downloads/
#解压后，修改/etc/prifle文件在尾部追加jdk配置
cat >> /etc/prifle << EOF
export JAVA_HOME=jdk解压后的canonicalPath...具体版本名称不一样
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
EOF
#刷新环境变量
source /etc/profile
#验证安装
java -version
echo $JAVA_HOME
echo $PATH
</pre>
>1.2 更新openjdk

**就享用openjdk，如何升级使其具有jstack和jmap等命令？**
<pre class="prettyprint lang-s">
#下面是升级的套路，其中jdk的版本只是彼时使用的一个版本号
#找到openjdk安装位置
which java 
#结果如果为 /usr/bin/java
ll /usr/bin/java 
#结果为链接地址 /usr/bin/java -> /etc/alternatives/java
ll /etc/alternatives/java
#结果为 /etc/alternatives/java -> /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.222.b10-1.fc31.x86_64/jre/bin/java
最后的这个地址，就是openjdk的安装位置

#上面几个命令可以直接用管道符简为：
which java |xargs ll|xargs ll

#找到携带有jmap、jstack的版本
dnf whatprovides '*/jmap' 
#或者 
dnf whatprovides '*/jstack'
#该命令会遍历仓库去找，最后结果中：
#============yum whatprovides '*/jmap'的执行结果摘抄 start =============
#	java-1.8.0-openjdk-devel-1:1.8.0.222.b10-1.fc31.x86_64 : OpenJDK Development Environment 8
#	仓库        ：fedora
#	匹配来源：
#	文件名    ：/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.222.b10-1.fc31.x86_64/bin/jmap
#	...
#============yum whatprovides '*/jmap'的执行结果摘抄 end  =============
	
#选择你想升级的版本，执行升级安装
dnf install java-1.8.0-openjdk-devel-1:1.8.0.222.b10-1.fc31.x86_64
	
#安装完以后，就可以使用jstack、jmap等命令了
</pre>