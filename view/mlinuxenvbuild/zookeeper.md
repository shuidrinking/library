#### 1、安装zookeeper
>1.1 下载并解压
	
**<a href="http://mirror.bit.edu.cn/apache/zookeeper/" target="_blank">所有稳定版本</a>，进入stable文件夹，下载其中的bin版本
<pre class="prettyprint lang-s">
cd /opt
wget http://mirror.bit.edu.cn/apache/zookeeper/stable/apache-zookeeper-3.5.6-bin.tar.gz
tar -xf apache-zookeeper-3.5.6-bin.tar.gz -C /opt
mv /opt/apache-zookeeper-3.5.6-bin /opt/zookeeper3.5.5
rm -f ./apache-zookeeper-3.5.6-bin.tar.gz
</pre>

>1.2 我们直接配集群（本案例只在一台机器上配置伪集群，实际多台机器也同样的套路）
<pre class="prettyprint lang-s">
#创建集群服务器目录
mkdir -p /opt/zookeeper3.5.5/cluster/zookeeper-1
mkdir -p /opt/zookeeper3.5.5/cluster/zookeeper-2
mkdir -p /opt/zookeeper3.5.5/cluster/zookeeper-3
#创建每个服务器的id文件
echo "1" > /opt/zookeeper3.5.5/cluster/zookeeper-1/myid
echo "2" > /opt/zookeeper3.5.5/cluster/zookeeper-2/myid
echo "3" > /opt/zookeeper3.5.5/cluster/zookeeper-3/myid

#每个服务器的配置文件中有3个端口：数据同步端口、选举端口、客户端通信端口

#创建1号服务器的配置文件，并在文件中放开两行，并增加3行集群申明
cp /opt/zookeeper3.5.5/conf/zoo_sample.cfg /opt/zookeeper3.5.5/conf/zoo-1.cfg
#dataDir=/opt/zookeeper3.5.5/cluster/zookeeper-1
#clientPort=2181
server.1=xxx.xxx.xxx.xxx:2888:3888
server.2=xxx.xxx.xxx.xxx:2889:3889
server.3=xxx.xxx.xxx.xxx:2890:3890

#创建2号服务器的配置文件，并在文件中放开两行
cp /opt/zookeeper3.5.5/conf/zoo_sample.cfg /opt/zookeeper3.5.5/conf/zoo-2.cfg
#dataDir=/opt/zookeeper3.5.5/cluster/zookeeper-2
#clientPort=2182
server.1=xxx.xxx.xxx.xxx:2888:3888
server.2=xxx.xxx.xxx.xxx:2889:3889
server.3=xxx.xxx.xxx.xxx:2890:3890

#创建3号服务器的配置文件，并在文件中放开两行
cp /opt/zookeeper3.5.5/conf/zoo_sample.cfg /opt/zookeeper3.5.5/conf/zoo-3.cfg
#dataDir=/opt/zookeeper3.5.5/cluster/zookeeper-3
#clientPort=2183
server.1=xxx.xxx.xxx.xxx:2888:3888
server.2=xxx.xxx.xxx.xxx:2889:3889
server.3=xxx.xxx.xxx.xxx:2890:3890

#启动三个服务器
/opt/zookeeper3.5.5/bin/zkServer.sh start /opt/zookeeper3.5.5/conf/zoo-1.cfg
/opt/zookeeper3.5.5/bin/zkServer.sh start /opt/zookeeper3.5.5/conf/zoo-2.cfg
/opt/zookeeper3.5.5/bin/zkServer.sh start /opt/zookeeper3.5.5/conf/zoo-3.cfg

#检查服务器启动状态
/opt/zookeeper3.5.5/bin/zkServer.sh status /opt/zookeeper3.5.5/conf/zoo-1.cfg
/opt/zookeeper3.5.5/bin/zkServer.sh status /opt/zookeeper3.5.5/conf/zoo-2.cfg
/opt/zookeeper3.5.5/bin/zkServer.sh status /opt/zookeeper3.5.5/conf/zoo-3.cfg

#远程连接服务器
/opt/zookeeper3.5.5/bin/zkCli.sh -server xxx.xxx.xxxx.xxx:2181
/opt/zookeeper3.5.5/bin/zkCli.sh -server xxx.xxx.xxxx.xxx:2182
/opt/zookeeper3.5.5/bin/zkCli.sh -server xxx.xxx.xxxx.xxx:2183

#关闭服务器
/opt/zookeeper3.5.5/bin/zkServer.sh stop /opt/zookeeper3.5.5/conf/zoo-1.cfg
/opt/zookeeper3.5.5/bin/zkServer.sh stop /opt/zookeeper3.5.5/conf/zoo-2.cfg
/opt/zookeeper3.5.5/bin/zkServer.sh stop /opt/zookeeper3.5.5/conf/zoo-3.cfg
</pre>
	
>1.3 zookeeper中zoo.cfg文件解释

* tickTime：这个时间是作为 Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳。
* 
* initLimit：这个配置项是用来配置 Zookeeper 接受客户端（这里所说的客户端不是用户连接 Zookeeper 服务器的客户端，而是 Zookeeper 服务器集群中连接到 Leader 的 Follower 服务器）初始化连接时最长能忍受多少个心跳时间间隔数。当已经超过 10个心跳的时间（也就是 tickTime）长度后 Zookeeper 服务器还没有收到客户端的返回信息，那么表明这个客户端连接失败。总的时间长度就是 10*2000=20 秒
* 
* syncLimit：这个配置项标识 Leader 与 Follower 之间发送消息，请求和应答时间长度，最长不能超过多少个 tickTime 的时间长度，总的时间长度就是 5*2000=10秒
* 
* dataDir：顾名思义就是 Zookeeper 保存数据的目录，默认情况下，Zookeeper 将写数据的日志文件也保存在这个目录里。
* 
* clientPort：这个端口就是客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。
* 
* server.A=B：C：D：其中 A 是一个数字，表示这个是第几号服务器；B 是这个服务器的 ip 地址；C 表示的是这个服务器与集群中的 Leader 服务器交换信息的端口；D 表示的是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的 Leader，而这个端口就是用来执行选举时服务器相互通信的端口。如果是伪集群的配置方式，由于 B 都是一样，所以不同的 Zookeeper 实例通信端口号不能一样，所以要给它们分配不同的端口号。