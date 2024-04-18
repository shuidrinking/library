#### strace

* strace是syscall tracer，用来诊断、调试 Linux 用户空间跟踪器。
* 
* 我们用它来监控用户空间进程和内核的交互，比如系统调用、信号传递、进程状态变更等
* 
* linux并不内置strace，需要额外安装，<a href="https://strace.io/" target="_blank">官网</a>

<pre class="prettyprint lang-s">
#如果还没安装时下载进行安装
rpm -qa|grep strace

#可以直接使用dnf安装
dnf install strace

#还可以自己下载、编译、安装，注意版本号，以下命令中的版本可能已过时
#可下载的版本列表：https://strace.io/files/
#下载后使用以下命令处理
chmod 777 ./strace-4.20.tar.xz 
xz -d ./strace-4.20.tar.xz 
tar -xf strace-4.20.tar
cd strace-4.20/
./configure 
make
make install
make clean
检查是否安装成功，执行
strace
</pre>