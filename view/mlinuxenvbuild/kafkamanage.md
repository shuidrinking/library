#### 1、安装卡夫卡管理台
>1.1 <a href="https://github.com/yahoo/kafka-manager/releases" target="_blank">下载管理台</a>，这里下载的都是未编译的源码，需要编译
<pre class="prettyprint lang-s">
#解压到 /opt 目录下，将解压后的文件夹所有权设置给普通用户，不要给root
cd /home/public/download
wget https://github.com/yahoo/kafka-manager/archive/2.0.0.2.tar.gz
chmod 777 2.0.0.2.tar.gz
mv 2.0.0.2.tar.gz kafka-manager-2.0.0.2.tar.gz
tar -zxf /home/public/download/kafka-manager-2.0.0.2.tar.gz -C /opt
</pre>
>1.2 先安装sbt，kafka-manager需要sbt编译
<pre class="prettyprint lang-s">
curl https://bintray.com/sbt/rpm/rpm > /etc/yum.repos.d/bintray-sbt-rpm.repo
sudo dnf install sbt
cd ~
mkdir .sbt

#新建并设置.sbt/repositories文件内容
cat > .sbt/repositories << EOF
[repositories]
local
aliyun: http://maven.aliyun.com/nexus/content/groups/public/
typesafe: http://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly 
sonatype-oss-releases 
maven-central 
sonatype-oss-snapshots
EOF
</pre>
>1.3 检查sbt是否安装成功，查看命令输出，发现已经成功可以从maven.aliyun.com/nexus下载到依赖即表示成功
<pre class="prettyprint lang-s">
sbt -version

cd /opt/kafka-manager-2.0.0.2
./sbt clean dist

#执行完毕后，会自动生成一个可运行的安装包，日志里会打印出路径：/opt/kafka-manager-2.0.0.2/target/universal/kafka-manager-2.0.0.2.zip
cp /opt/kafka-manager-2.0.0.2/target/universal/kafka-manager-2.0.0.2.zip /home/public/download/

#把安装过程备份
mv /opt/kafka-manager-2.0.0.2 /opt/bak.kafka-manager-2.0.0.2-install-package
</pre>

>1.4 解压编译后的kafka-manager,并将其分配给普通用户
<pre class="prettyprint lang-s">
unzip /home/public/download/kafka-manager-2.0.0.2.zip -d /opt
		
#修改kafka-manager.zkhosts列表为自己的zk节点
vi /opt/kafka-manager-2.0.0.2/conf/application.conf 
#找到并设置kafka-manager.zkhosts="ip:2181,ip:2182,ip:2183"
</pre>
>1.5 按顺序依次启动zookeeper、kafka、kafka-manager
<pre class="prettyprint lang-s">
#为kafka管理台建立链接
ln -s /opt/kafka-manager-2.0.0.2/bin/kafka-manager /usr/bin/kafka-manager

#默认的端口是9000，启动语句如下
nohup /opt/kafka-manager-2.0.0.2/bin/kafka-manager &
#有链接时执行：
nohup kafka-manager &

#可通过 -Dhttp.port，指定端口; -Dconfig.file=conf/application.conf指定配置文件
nohup /opt/kafka-manager-2.0.0.2/bin/kafka-manager -Dconfig.file=conf/application.conf -Dhttp.port=8080 &

#启动时要添加nohup，不然日志会一直自动输出到客户端
查看日志 tail -f  /opt/kafka-manager-2.0.0.2/nohup.out
</pre>
>1.6 测试
<pre class="prettyprint lang-s">
#访问
http://192.168.11.129:9000
	
#只能kill关闭
ps-ef|grep kafka-manager
kill -9 进程

#关闭后需要删除一个文件，否则下次不能启动
rm -f /opt/kafka-manager-2.0.0.2/RUNNIING_PID
</pre>
>1.7 问题
<pre class="prettyprint lang-s">
如果日志中出现java.lang.IllegalArgumentException: requirement failed: No jmx port but jmx polling enabled!
则需要在每一个kafka节点加上环境变量  JMX_PORT=端口

kafka开启JMX的2种方式： 
（1）启动kafka时增加JMX_PORT=9999，即JMX_PORT=9999 bin/kafka-server-start.sh -daemon config/server.properties 
（2）修改kafka-run-class.sh脚本，第一行增加JMX_PORT=9999即可
</pre>