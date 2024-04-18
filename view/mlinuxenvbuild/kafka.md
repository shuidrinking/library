<div class="mapInPage">
<a href="#anchor1">1、卡夫卡参考资料</a><br/>
<a href="#anchor2">2、安装卡夫卡</a><br/>
<a href="#anchor3">3、启动并测试</a><br/>
<a href="#anchor4">4、kafka集群</a><br/>
</div>
<label id="anchor1"></label>

#### 1、卡夫卡参考资料
>1.1 kafka讲解性资料
* <a href="https://blog.csdn.net/dapeng1995/article/details/81536862" target="_blank">https://blog.csdn.net/dapeng1995/article/details/81536862</a>
* 
* <a href="https://www.cnblogs.com/lizhonghua34/p/6756589.html" target="_blank">https://www.cnblogs.com/lizhonghua34/p/6756589.html</a>
* 
* <a href="https://blog.csdn.net/qq_35571554/article/details/82593159" target="_blank">https://blog.csdn.net/qq_35571554/article/details/82593159</a>
* 
* <a href="https://www.nowcoder.com/discuss/232100" target="_blank">https://www.nowcoder.com/discuss/232100</a>
* 
* <a href="https://www.cnblogs.com/Javame/p/9644398.html" target="_blank">https://www.cnblogs.com/Javame/p/9644398.html</a>
* 
* <a href="https://www.cnblogs.com/yinzhengjie/p/9937816.html" target="_blank">https://www.cnblogs.com/yinzhengjie/p/9937816.html</a>
>1.2 kafka实践性资料
* <a href="https://blog.csdn.net/shangboerds/article/details/80685238" target="_blank">https://blog.csdn.net/shangboerds/article/details/80685238</a>
* 
* <a href="https://www.orchome.com/6" target="_blank">https://www.orchome.com/6</a>
* 
* <a href="https://www.cnblogs.com/yinzhengjie/p/9937816.html" target="_blank">https://www.cnblogs.com/yinzhengjie/p/9937816.html</a>
<label id="anchor2"></label>

#### 2、安装卡夫卡
>2.1 下载bin版本的
**除了<a href="http://kafka.apache.org/downloads" target="_blank">官网下载外</a>，你可以到其他镜像网站下载**
<pre class="prettyprint lang-s">
cd /opt
#请选择你需要的版本号
wget http://mirrors.tuna.tsinghua.edu.cn/apache/kafka/2.3.0/kafka_2.12-2.3.0.tgz 
</pre>

>2.2 下载后解压并创建日志目录
<pre class="prettyprint lang-s">
tar -zxf /opt/kafka_2.12-2.3.0.tgz -C /opt
rm -f /opt/kafka_2.12-2.3.0.tgz 
mv /opt/kafka_2.12-2.3.0 /opt/kafka2.12-2.3.0
mkdir /opt/kafka2.12-2.3.0/logs
</pre>

>2.3 配置环境变量
<pre class="prettyprint lang-s">
cat >> /etc/profile << EOF
export KAFKA_HOME=/opt/kafka2.12-2.3.0
export PATH=$KAFKA_HOME/bin:$PATH
EOF

#刷新环境变量
source /etc/profile
</pre>

>2.4 在kafka启动脚本中设置服务器内存配置
<pre class="prettyprint lang-s">
修改${KAFKA_HOME}/bin/kafka-server-start.sh，找到内存设置的地方，修改
	if [ "x$KAFKA_HEAP_OPTS" = "x" ]; then
		#在这里指定堆内存为1G
		export KAFKA_HEAP_OPTS="-Xmx1G -Xms1G"     
	fi
</pre>
>2.5 重写server.properties配置
<pre class="prettyprint lang-s">
#备份原配置
mv /opt/kafka2.12-2.3.0/config/server.properties /opt/kafka2.12-2.3.0/config/server.properties.bak
#新增配置，注意修改其中的ip等信息，有些配置值还需要提前计算好
#具体配置详解见https://www.cnblogs.com/alan319/p/8651434.html
#执行下面命令：

cat > server.properties << EOF
broker.id=129
listeners=PLAINTEXT://192.168.11.129:9092
num.network.threads=3
num.io.threads=8
message.max.byte=5242880
replica.fetch.max.bytes=5242880
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600
log.dirs=/opt/kafka2.12-2.3.0/logs
log.segment.bytes=1073741824
log.cleanup.interval.mins=1
log.cleaner.enable=false
log.retention.check.interval.ms=300000
log.cleanup.policy=delete
log.retention.hours=168
log.retention.bytes=1073741824
num.partitions=1
auto.create.topics.enable=false
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1
zookeeper.connect=192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183
zookeeper.connection.timeout.ms=6000
delete.topic.enable=true
EOF
</pre>

**对配置的说明**
<pre class="prettyprint lang-s">
##每一个broker在集群中的唯一id，要求是正数。在改变IP地址，不改变broker.id的话不会影响consumers，在同一台机器上运行，要防止broker在同一端口上注册和覆盖对方的数据
broker.id=1
##监听地址(本节点)，advertised.listeners不需要配置，会沿用该配置
listeners=PLAINTEXT://192.168.11.129:9092
##broker 处理消息的最大线程数，一般情况下不需要去修改
num.network.threads=3
##broker处理磁盘IO 的线程数 ，数值应该大于你的硬盘数
num.io.threads=8
##单个消息最大体积5M
message.max.byte=1024*1024*5
##replicas每次获取数据的最大大小
replica.fetch.max.bytes=1024*1024*5
##socket的发送缓冲区，socket的调优参数SO_SNDBUFF
socket.send.buffer.bytes=1024*100
##socket的接受缓存空间大小
socket.receive.buffer.bytes=1024*100
##socket请求的最大数值，防止serverOOM，message.max.bytes必然要小于socket.request.max.bytes，会被topic创建时的指定参数覆盖
socket.request.max.bytes=100*1024*1024

##kafka数据的存放地址
log.dirs=/opt/kafka2.12-2.3.0/logs
##topic的分区是以一堆segment文件存储的，这个控制每个segment的大小，会被topic创建时的指定参数覆盖
log.segment.bytes =1024*1024*1024
##日志清理策略，默认值delete，选择有：delete和compact 主要针对过期数据的处理，或是日志文件达到限制的额度，会被 topic创建时的指定参数覆盖
log.cleanup.policy = delete
##默认各topic分区数，若是在topic创建时候没有指定的话 会被topic创建时的指定参数覆盖
##日志清理机制有按时间和按空间两个维度，log.retention.bytes和log.retention.minutes任意一个达到要求，都会执行删除，会被topic创建时的指定参数覆盖，如果未设置则使用log.retention.hours中的值
log.retention.minutes=int类型
log.retention.hours=168
log.retention.bytes=1073741824
##指定日志每隔多久检查看是否可以被删除，默认1分钟
log.cleanup.interval.mins=1
##是否开启日志压缩
log.cleaner.enable=false
##文件大小检查的周期时间，是否触发log.cleanup.policy中设置的策略
log.retention.check.interval.ms=int类型

##每个topic的分区个数，若是在topic创建时候没有指定的话 会被topic创建时的指定参数覆盖
num.partitions=3
##关闭自动创建topic
auto.create.topics.enable=false
##对应broker个数
offsets.topic.replication.factor=3

##事务状态主题的副本个数
transaction.state.log.replication.factor=1
##事务状态主题每个分区拥有多少个insync的副本才被视为上线。默认为2
transaction.state.log.min.isr=2
##事务状态主题的分区个数transaction.state.log.num.partitions

##zookeeper集群的地址，可以是多个，多个之间用逗号分割 hostname1:port1,hostname2:port2,hostname3:port3
zookeeper.connect=192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183
##ZooKeeper的连接超时时间
zookeeper.connection.timeout.ms=6000

#允许删除topic，如果不设置，则不会真正删除，而是显示marked for deletion
delete.topic.enable=true
</pre>
<label id="anchor3"></label>

#### 3、启动并测试
>3.1 启停
<pre class="prettyprint lang-s">
#启动
/opt/kafka2.12-2.3.0/bin/kafka-server-start.sh -daemon /opt/kafka2.12-2.3.0/config/server.properties
#停止，注：centos7上可能关不了用kill -9直接杀掉
/opt/kafka2.12-2.3.0/bin/kafka-server-stop.sh
</pre>

>3.2 jps 查看是否有zookeeper和kafka进程，检查进程

>3.3 测试卡夫卡单机
**注意：TOPIC名称中不要带.和_两个特殊符号**
<pre class="prettyprint lang-s">
#创建topics：
/opt/kafka2.12-2.3.0/bin/kafka-topics.sh --create --zookeeper 192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183 --replication-factor 1 --partitions 1 --topic testTopic
#查看topic
/opt/kafka2.12-2.3.0/bin/kafka-topics.sh --list --zookeeper 192.168.11.129:2181

#运行producer（生产者）,然后在控制台输入几条消息到服务器，每一行一条消息
/opt/kafka2.12-2.3.0/bin/kafka-console-producer.sh --broker-list 192.168.11.129:9092 --topic testTopic 
	
#消费，会获得存储的消息
#	旧版本的命令中参数用--zookeeper ，新版本中执行下面命令可能会报错
#	/opt/kafka2.12-2.3.0/bin/kafka-console-consumer.sh --zookeeper 192.168.11.129:2181 --topic testTopic --from-beginning
#	新版本中要弱化zookeeper依赖，所以参数用--bootstrap-server
#	/opt/kafka2.12-2.3.0/bin/kafka-console-consumer.sh --bootstrap-server 192.168.11.129:9092 --topic testTopic --from-beginning
#	消费者可选参数
#	--consumer-property group.id=testGroup --consumer-property client.id=consumer1
	
#删除topic，删除动作比较麻烦，需要在kafka里先删除，再到zookeeper里删除
/opt/kafka2.12-2.3.0/bin/kafka-topics.sh --delete --zookeeper 192.168.11.129:2181 --topic testTopic
#进入log目录删除该topic的文件
#随便进入一台zookeeper
#登录zkCli
#查看 ls /brokers/topics
#删除delete /brokers/topics/testTopic

#删除是个异步操作，所以如果需要立即生效的话
#删除完需要把kafka和zookeeper都重启掉，不然查看列表时仍然会显示“marked for delete”
	
#查看消费者分组信息
/opt/kafka2.12-2.3.0/bin/kafka-consumer-groups.sh --bootstrap-server 192.168.11.129:9092 --list [组名]
</pre>
>3.4 创建软连接，前面的一系列命令中的sh就省去路径
<pre class="prettyprint lang-s">
ln -s /opt/kafka2.12-2.3.0/bin/kafka-server-stop.sh /usr/bin/kafka-server-stop.sh
ln -s /opt/kafka2.12-2.3.0/bin/kafka-server-start.sh /usr/bin/kafka-server-start.sh
ln -s /opt/kafka2.12-2.3.0/bin/kafka-topics.sh /usr/bin/kafka-topics.sh
ln -s /opt/kafka2.12-2.3.0/bin/kafka-console-producer.sh /usr/bin/kafka-console-producer.sh
ln -s /opt/kafka2.12-2.3.0/bin/kafka-console-consumer.sh /usr/bin/kafka-console-consumer.sh
ln -s /opt/kafka2.12-2.3.0/bin/kafka-consumer-groups.sh /usr/bin/kafka-consumer-groups.sh
#或者，直接建立个文件夹软链接
ln -s /opt/kafka2.12-2.3.0/bin/ /usr/bin/kafka
</pre>
<label id="anchor4"></label>

#### 4、kafka集群
>4.1 建立kafka集群，多设几个broker
<pre class="prettyprint lang-s">
#把原来单节点的文件全删掉
rm -rf /opt/kafka2.12-2.3.0/logs/*

#建新配置
cp /opt/kafka2.12-2.3.0/config/server.properties /opt/kafka2.12-2.3.0/config/server1.properties 
cp /opt/kafka2.12-2.3.0/config/server.properties /opt/kafka2.12-2.3.0/config/server2.properties
cp /opt/kafka2.12-2.3.0/config/server.properties /opt/kafka2.12-2.3.0/config/server3.properties
mv /opt/kafka2.12-2.3.0/config/server.properties /opt/kafka2.12-2.3.0/config/server.properties.bak2

mkdir /opt/kafka2.12-2.3.0/logs/kafka1-logs
mkdir /opt/kafka2.12-2.3.0/logs/kafka2-logs
mkdir /opt/kafka2.12-2.3.0/logs/kafka3-logs

#修改server1.properties
vi /opt/kafka2.12-2.3.0/config/server1.properties
#修改下面内容: 
#broker.id=1 
#listeners=PLAINTEXT://192.168.11.129:9092 
#log.dir=/opt/kafka2.12-2.3.0/logs/kafka1-logs

#修改server2.properties
vi /opt/kafka2.12-2.3.0/config/server2.properties
#修改下面内容: 
#broker.id=2 
#listeners=PLAINTEXT://192.168.11.129:9093 
#log.dir=/opt/kafka2.12-2.3.0/logs/kafka2-logs

#修改server3.properties
vi /opt/kafka2.12-2.3.0/config/server3.properties
#修改下面内容: 
#broker.id=3 
#listeners=PLAINTEXT://192.168.11.129:9094 
#log.dir=/opt/kafka2.12-2.3.0/logs/kafka3-logs
</pre>
>4.2 启动集群
<pre class="prettyprint lang-s">
#启动集群（前面已经有链接，此处直接输入命令，无需路径）
kafka-server-start.sh -daemon /opt/kafka2.12-2.3.0/config/server1.properties
kafka-server-start.sh -daemon /opt/kafka2.12-2.3.0/config/server2.properties
kafka-server-start.sh -daemon /opt/kafka2.12-2.3.0/config/server3.properties
</pre>
>4.2 测试集群
**注意：TOPIC名称中不要带.和_两个特殊符号**
<pre class="prettyprint lang-s">
#创建topics，5个分区，没分区3个副本：
kafka-topics.sh --create --zookeeper 192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183 --replication-factor 3 --partitions 5 --topic testTopic
kafka-topics.sh --create --zookeeper 192.168.52.128:2181,192.168.52.128:2182,192.168.52.128:2183 --replication-factor 3 --partitions 5 --topic testTopic

#查看topic列表
kafka-topics.sh --list --zookeeper 192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183
kafka-topics.sh --list --zookeeper 192.168.52.128:2181,192.168.52.128:2182,192.168.52.128:2183
#查看具体topic概要
kafka-topics.sh --zookeeper 192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183 --describe --topic testTopic
kafka-topics.sh --zookeeper 192.168.52.128:2181,192.168.52.128:2182,192.168.52.128:2183 --describe --topic testTopic
#-------------------------描述信息概要样例---------------------------------------------
#	Topic:testTopic	PartitionCount:5	ReplicationFactor:3	Configs:
#				Topic: testTopic	Partition: 0	Leader: 2	Replicas: 2,1,3	Isr: 2,1,3
#				Topic: testTopic	Partition: 1	Leader: 3	Replicas: 3,2,1	Isr: 3,2,1
#				Topic: testTopic	Partition: 2	Leader: 1	Replicas: 1,3,2	Isr: 1,3,2
#				Topic: testTopic	Partition: 3	Leader: 2	Replicas: 2,3,1	Isr: 2,3,1
#				Topic: testTopic	Partition: 4	Leader: 3	Replicas: 3,1,2	Isr: 3,1,2

#运行producer（生产者）,然后在控制台输入几条消息到服务器，每一行一条消息
kafka-console-producer.sh --broker-list 192.168.11.129:9092,192.168.11.129:9093,192.168.11.129:9094 --topic testTopic 
kafka-console-producer.sh --broker-list 192.168.52.128:9092,192.168.52.128:9093,192.168.52.128:9094 --topic testTopic 

#消费，会获得存储的消息
#	旧版本的命令中参数用--zookeeper 
#	kafka-console-consumer.sh --zookeeper 192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183 --topic testTopic --from-beginning
	
#	新版本中要弱化zookeeper依赖，所以参数用--bootstrap-server
#	kafka-console-consumer.sh --bootstrap-server 192.168.11.129:9092,192.168.11.129:9093,192.168.11.129:9094 --topic testTopic --from-beginning
#	kafka-console-consumer.sh --bootstrap-server 192.168.52.128:9092,192.168.52.128:9093,192.168.52.128:9094 --topic testTopic --from-beginning
#	消费者可选参数
#	--new-consumer --consumer-property group.id=new-consumer-test --consumer-property client.id=new-consumer-cl

#删除topic
kafka-topics.sh --delete --zookeeper 192.168.11.129:2181,192.168.11.129:2182,192.168.11.129:2183 --topic testTopic 
kafka-topics.sh --delete --zookeeper 192.168.52.128:2181,192.168.52.128:2182,192.168.52.128:2183 --topic testTopic 
</pre>