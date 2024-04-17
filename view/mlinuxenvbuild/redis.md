#### 1、安装redis
>1.1 检查依赖
<pre class="prettyprint lang-s">
rpm -qa|grep gcc-c
rpm -qa|grep tcl
rpm -qa|grep wget
#如果未安装则安装
dnf install gcc-c++ 
dnf install -y tcl 
dnf install wget
</pre>
>1.2 下载安装包
<a href="http://download.redis.io/releases/" target="_blank">下载包选择页面</a>
<pre class="prettyprint lang-s">
#选择版本复制其下载地址后下载
wget http://download.redis.io/releases/{selectedFile}
</pre>
>1.3 安装redis
<pre class="prettyprint lang-s">
#进入redis目录执行以下命令
make 
make install
#不要执行make clean，否则安装后的执行文件会被清理
</pre>
>1.4 复制编译后的成品
<pre class="prettyprint lang-s">
#进入redis目录，执行以下命令
mkdir config
mkdir bin
mkdir data
mv src/redis-server bin/
mv src/redis-sentinel bin/
mv src/redis-cli bin/
</pre>
>1.5 修改配置文件
<pre class="prettyprint lang-s linenums">
#redis.conf文件样例
# units are case insensitive so 1GB 1Gb 1gB are all the same.
#bind 127.0.0.1 -::1
bind 0.0.0.0
protected-mode yes
port 6379
tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize yes
pidfile /var/run/redis_6379.pid
loglevel notice
logfile "/home/app/logs/redis/6379.log"
databases 16
always-show-logo no
set-proc-title yes
proc-title-template "{title} {listen-addr} {server-mode}"
locale-collate ""
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
rdb-del-sync-files no
dir /opt/redis-stable/data/
# replicaof <masterip> <masterport>
masterauth 123456
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync yes
repl-diskless-sync-delay 5
repl-diskless-sync-max-replicas 0
repl-diskless-load disabled
repl-disable-tcp-nodelay no
replica-priority 100
acllog-max-len 128
requirepass 123456
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
lazyfree-lazy-user-del no
lazyfree-lazy-user-flush no
oom-score-adj no
oom-score-adj-values 0 200 800
disable-thp yes
appendonly no
appendfilename "appendonly.aof"
appenddirname "appendonlydir"
# appendfsync always
appendfsync everysec
# appendfsync no
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
aof-timestamp-enabled no
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-listpack-entries 512
hash-max-listpack-value 64
list-max-listpack-size -2
list-compress-depth 0
set-max-intset-entries 512
set-max-listpack-entries 128
set-max-listpack-value 64
zset-max-listpack-entries 128
zset-max-listpack-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
jemalloc-bg-thread yes
</pre>
>1.6 编写启动脚本
<pre class="prettyprint lang-s">
此处省略
</pre>