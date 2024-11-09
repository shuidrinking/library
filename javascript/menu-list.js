var menuList = [
	{"menuCode":"mlinuxop","parentMenuCode":"0","showText":"一、Linux运维","url":"#"},
	{"menuCode":"m1","parentMenuCode":"mlinuxop","showText":"1、安装及初始化","url":"#"},
	{"menuCode":"m1-1","parentMenuCode":"m1","showText":"1.1、安装linux","url":"view/1/1.1.md"},
	{"menuCode":"m1-2","parentMenuCode":"m1","showText":"1.2、安装rpm仓库","url":"view/1/1.2.md"},
	{"menuCode":"m1-3","parentMenuCode":"m1","showText":"1.3、使用国内功能包更新源","url":"view/1/1.3.md"},
	{"menuCode":"m1-4","parentMenuCode":"m1","showText":"1.4、最基础设置","url":"view/1/1.4.md"},
	{"menuCode":"m1-5","parentMenuCode":"m1","showText":"1.5、安装中文字体","url":"view/1/1.5.md"},
	{"menuCode":"m1-6","parentMenuCode":"m1","showText":"1.6、优化bash","url":"view/1/1.6.md"},
	
	{"menuCode":"m2","parentMenuCode":"mlinuxop","showText":"2、系统监控","url":"#"},
	{"menuCode":"m2-1","parentMenuCode":"m2","showText":"2.1、硬件信息盘点","url":"view/2/2.1.md"},
	{"menuCode":"m2-2","parentMenuCode":"m2","showText":"2.2、软件信息查检","url":"view/2/2.2.md"},
	{"menuCode":"m2-3","parentMenuCode":"m2","showText":"2.3、性能监控","url":"view/2/2.3.md"},
	{"menuCode":"m2-4","parentMenuCode":"m2","showText":"2.4、会话监控","url":"view/2/2.4.md"},
	{"menuCode":"m2-5","parentMenuCode":"m2","showText":"2.5、磁盘监控","url":"view/2/2.5.md"},
	{"menuCode":"m2-6","parentMenuCode":"m2","showText":"2.6、网络监控","url":"view/2/2.6.md"},
	{"menuCode":"m2-7","parentMenuCode":"m2","showText":"2.7、查看系统日志","url":"view/2/2.7.md"},
	{"menuCode":"m2-8","parentMenuCode":"m2","showText":"2.8、进程监控","url":"view/2/2.8.md"},
	
	{"menuCode":"m3","parentMenuCode":"mlinuxop","showText":"3、账户管理","url":"#"},
	{"menuCode":"m3-1","parentMenuCode":"m3","showText":"3.1、管理group","url":"view/3/3.1.md"},
	{"menuCode":"m3-2","parentMenuCode":"m3","showText":"3.2、管理user","url":"view/3/3.2.md"},
	{"menuCode":"m3-3","parentMenuCode":"m3","showText":"3.3、系统内部账号","url":"view/3/3.3.md"},
	
	{"menuCode":"m4","parentMenuCode":"mlinuxop","showText":"4、文件操作","url":"#"},
	{"menuCode":"m4-1","parentMenuCode":"m4","showText":"4.1、查看文件列表","url":"view/4/4.1.md"},
	{"menuCode":"m4-2","parentMenuCode":"m4","showText":"4.2、文件夹操作","url":"view/4/4.2.md"},
	{"menuCode":"m4-3","parentMenuCode":"m4","showText":"4.3、新建文件","url":"view/4/4.3.md"},
	{"menuCode":"m4-4","parentMenuCode":"m4","showText":"4.4、编辑文件内容","url":"view/4/4.4.md"},
	{"menuCode":"m4-5","parentMenuCode":"m4","showText":"4.5、查看文件内容","url":"view/4/4.5.md"},
	{"menuCode":"m4-6","parentMenuCode":"m4","showText":"4.6、重命名文件","url":"view/4/4.6.md"},
	{"menuCode":"m4-7","parentMenuCode":"m4","showText":"4.7、复制及移动","url":"view/4/4.7.md"},
	{"menuCode":"m4-8","parentMenuCode":"m4","showText":"4.8、拆分文件","url":"view/4/4.8.md"},
	{"menuCode":"m4-9","parentMenuCode":"m4","showText":"4.9、按文件属性查找","url":"view/4/4.9.md"},
	{"menuCode":"m4-10","parentMenuCode":"m4","showText":"4.10、查找或替换文件内容","url":"view/4/4.10.md"},
	{"menuCode":"m4-11","parentMenuCode":"m4","showText":"4.11、列出已被打开的文件","url":"view/4/4.11.md"},
	{"menuCode":"m4-12","parentMenuCode":"m4","showText":"4.12、删除及恢复","url":"view/4/4.12.md"},
	{"menuCode":"m4-13","parentMenuCode":"m4","showText":"4.13、文件统计","url":"view/4/4.13.md"},
	{"menuCode":"m4-14","parentMenuCode":"m4","showText":"4.14、文件编码操作","url":"view/4/4.14.md"},
	{"menuCode":"m4-15","parentMenuCode":"m4","showText":"4.15、压缩及解压","url":"view/4/4.15.md"},
	
	{"menuCode":"m5","parentMenuCode":"mlinuxop","showText":"5、系统安防","url":"#"},
	{"menuCode":"m5-1","parentMenuCode":"m5","showText":"5.1、防火墙规则配置工具","url":"view/5/5.1.md"},
	{"menuCode":"m5-2","parentMenuCode":"m5","showText":"5.2、iptables使用套路","url":"view/5/5.2.md"},
	{"menuCode":"m5-3","parentMenuCode":"m5","showText":"5.3、firewalld使用套路","url":"view/5/5.3.md"},
	{"menuCode":"m5-4","parentMenuCode":"m5","showText":"5.4、selinux","url":"view/5/5.4.md"},
	{"menuCode":"m5-5","parentMenuCode":"m5","showText":"5.5、阻止外来的scp行为","url":"view/5/5.5.md"},
	{"menuCode":"m5-6","parentMenuCode":"m5","showText":"5.6、添加针对rm的防弹衣","url":"view/5/5.6.md"},
	
	{"menuCode":"m6","parentMenuCode":"mlinuxop","showText":"6、运行维护","url":"#"},
	{"menuCode":"m6-1","parentMenuCode":"m6","showText":"6.1、联机交互","url":"view/6/6.1.md"},
	{"menuCode":"m6-2","parentMenuCode":"m6","showText":"6.2、设置系统时间","url":"view/6/6.2.md"},
	{"menuCode":"m6-3","parentMenuCode":"m6","showText":"6.3、版本切换器","url":"view/6/6.3.md"},
	{"menuCode":"m6-4","parentMenuCode":"m6","showText":"6.4、网络设置","url":"view/6/6.4.md"},
	{"menuCode":"m6-5","parentMenuCode":"m6","showText":"6.5、文件下载","url":"view/6/6.5.md"},
	{"menuCode":"m6-6","parentMenuCode":"m6","showText":"6.6、网络抓包","url":"view/6/6.6.md"},
	{"menuCode":"m6-7","parentMenuCode":"m6","showText":"6.7、服务管理","url":"view/6/6.7.md"},
	{"menuCode":"m6-8","parentMenuCode":"m6","showText":"6.8、定时任务管理","url":"view/6/6.8.md"},
	{"menuCode":"m6-9","parentMenuCode":"m6","showText":"6.9、切换当前身份分组","url":"view/6/6.9.md"},
	{"menuCode":"m6-10","parentMenuCode":"m6","showText":"6.10、alias和link","url":"view/6/6.10.md"},
	{"menuCode":"m6-11","parentMenuCode":"m6","showText":"6.11、应用的日志管理","url":"view/6/6.11.md"},
	{"menuCode":"m6-12","parentMenuCode":"m6","showText":"6.12、查看已保存的wifi密码","url":"view/6/6.12.md"},
	
	{"menuCode":"m7","parentMenuCode":"mlinuxop","showText":"7、权限管理","url":"#"},
	{"menuCode":"m7-1","parentMenuCode":"m7","showText":"7.1、设置文件归属及权限","url":"view/7/7.1.md"},
	{"menuCode":"m7-2","parentMenuCode":"m7","showText":"7.2、设置sudo和su使用权限","url":"view/7/7.2.md"},
	{"menuCode":"m7-3","parentMenuCode":"m7","showText":"7.3、禁用指定用户使用rm","url":"view/7/7.3.md"},
	{"menuCode":"m7-4","parentMenuCode":"m7","showText":"7.4、sftp设置","url":"view/7/7.4.md"},
	
	{"menuCode":"m8","parentMenuCode":"mlinuxop","showText":"8、磁盘管理","url":"#"},
	{"menuCode":"m8-1","parentMenuCode":"m8","showText":"8.1、挂载和卸载","url":"view/8/8.1.md"},
	{"menuCode":"m8-2","parentMenuCode":"m8","showText":"8.2、虚拟机磁盘扩容","url":"view/8/8.2.md"},
	
	{"menuCode":"m9","parentMenuCode":"mlinuxop","showText":"9、shell应用","url":"#"},
	{"menuCode":"m9-1","parentMenuCode":"m9","showText":"9.1、sh文件样例：redis启停","url":"view/9/9.1.md"},
	{"menuCode":"m9-2","parentMenuCode":"m9","showText":"9.2、设置输出样式","url":"view/9/9.2.md"},
	{"menuCode":"m9-3","parentMenuCode":"m9","showText":"9.3、shell行为选项","url":"view/9/9.3.md"},
	{"menuCode":"m9-4","parentMenuCode":"m9","showText":"9.4、输入输出重定向","url":"view/9/9.4.md"},
	{"menuCode":"m9-5","parentMenuCode":"m9","showText":"9.5、让程序在后台执行","url":"view/9/9.5.md"},
	
	{"menuCode":"m10","parentMenuCode":"mlinuxop","showText":"10：linux命令","url":"#"},
	{"menuCode":"m10-1","parentMenuCode":"m10","showText":"1、如何直接执行原始命令","url":"view/10/10.1.md"},
	{"menuCode":"m10-2","parentMenuCode":"m10","showText":"2、串行执行与数据传递","url":"view/10/10.2.md"},
	{"menuCode":"m10-3","parentMenuCode":"m10","showText":"3、系统启停及shell会话","url":"view/10/10.3.md"},
	{"menuCode":"m10-4","parentMenuCode":"m10","showText":"4、统计命令wc","url":"view/10/10.4.md"},
	{"menuCode":"m10-5","parentMenuCode":"m10","showText":"5、tee同时输出到console和文件","url":"view/10/10.5.md"},
	
	{"menuCode":"m90","parentMenuCode":"mlinuxop","showText":"附录：进阶","url":"#"},
	{"menuCode":"m90-1","parentMenuCode":"m90","showText":"1、优化内核参数","url":"view/90/90.1.md"},
	
	{"menuCode":"mlinuxserver","parentMenuCode":"0","showText":"二、Linux服务器","url":"#"},
	
	{"menuCode":"mlinuxenvbuild","parentMenuCode":"mlinuxserver","showText":"1、环境搭建","url":"#"},
	{"menuCode":"mleb01","parentMenuCode":"mlinuxenvbuild","showText":"1.1、安装sshd服务","url":"view/mlinuxenvbuild/sshd.md"},
	{"menuCode":"mleb02","parentMenuCode":"mlinuxenvbuild","showText":"1.2、安装cinnamon桌面","url":"view/mlinuxenvbuild/desktop.md"},
	{"menuCode":"mleb03","parentMenuCode":"mlinuxenvbuild","showText":"1.3、安装Xrdp远程桌面","url":"view/mlinuxenvbuild/xrdp.md"},
	{"menuCode":"mleb04","parentMenuCode":"mlinuxenvbuild","showText":"1.4、安装音频解码器","url":"view/mlinuxenvbuild/audiodecoder.md"},
	{"menuCode":"mleb05","parentMenuCode":"mlinuxenvbuild","showText":"1.5、安装ffmpeg","url":"view/mlinuxenvbuild/ffmpeg.md"},
	{"menuCode":"mleb06","parentMenuCode":"mlinuxenvbuild","showText":"1.6、安装chrome浏览器","url":"view/mlinuxenvbuild/chrome.md"},
	{"menuCode":"mleb07","parentMenuCode":"mlinuxenvbuild","showText":"1.7、安装jdk","url":"view/mlinuxenvbuild/jdk.md"},
	{"menuCode":"mleb08","parentMenuCode":"mlinuxenvbuild","showText":"1.8、安装mysql8","url":"view/mlinuxenvbuild/mysql8.md"},
	{"menuCode":"mleb09","parentMenuCode":"mlinuxenvbuild","showText":"1.9、安装maven","url":"view/mlinuxenvbuild/maven.md"},
	{"menuCode":"mleb10","parentMenuCode":"mlinuxenvbuild","showText":"1.10、安装gradle","url":"view/mlinuxenvbuild/gradle.md"},
	{"menuCode":"mleb11","parentMenuCode":"mlinuxenvbuild","showText":"1.11、安装redis","url":"view/mlinuxenvbuild/redis.md"},
	{"menuCode":"mleb12","parentMenuCode":"mlinuxenvbuild","showText":"1.12、安装nginx","url":"view/mlinuxenvbuild/nginx.md"},
	{"menuCode":"mleb13","parentMenuCode":"mlinuxenvbuild","showText":"1.13、安装nexus","url":"view/mlinuxenvbuild/nexus.md"},
	{"menuCode":"mleb14","parentMenuCode":"mlinuxenvbuild","showText":"1.14、安装zookeeper","url":"view/mlinuxenvbuild/zookeeper.md"},
	{"menuCode":"mleb15","parentMenuCode":"mlinuxenvbuild","showText":"1.15、安装kafka","url":"view/mlinuxenvbuild/kafka.md"},
	{"menuCode":"mleb16","parentMenuCode":"mlinuxenvbuild","showText":"1.16、安装kafka管理台","url":"view/mlinuxenvbuild/kafkamanage.md"},
	{"menuCode":"mleb17","parentMenuCode":"mlinuxenvbuild","showText":"1.17、安装ranger文件浏览器","url":"view/mlinuxenvbuild/ranger.md"},
	{"menuCode":"mleb18","parentMenuCode":"mlinuxenvbuild","showText":"1.18、jstack和dump分析工具","url":"view/mlinuxenvbuild/javaanalyzer.md"},
	{"menuCode":"mleb19","parentMenuCode":"mlinuxenvbuild","showText":"1.19、安装strace","url":"view/mlinuxenvbuild/strace.md"},
	{"menuCode":"mleb20","parentMenuCode":"mlinuxenvbuild","showText":"1.20、安装activemq","url":"view/mlinuxenvbuild/activemq.md"},
	{"menuCode":"mleb21","parentMenuCode":"mlinuxenvbuild","showText":"1.21、安装elasticsearch","url":"view/mlinuxenvbuild/elasticsearch.md"},
	{"menuCode":"mleb22","parentMenuCode":"mlinuxenvbuild","showText":"1.22、安装svn","url":"view/mlinuxenvbuild/svn.md"},
	{"menuCode":"mleb23","parentMenuCode":"mlinuxenvbuild","showText":"1.23、安装ftp服务器","url":"view/mlinuxenvbuild/classicftp.md"},
	{"menuCode":"mleb24","parentMenuCode":"mlinuxenvbuild","showText":"1.24、安装nfs","url":"view/mlinuxenvbuild/nfs.md"},
	{"menuCode":"mleb25","parentMenuCode":"mlinuxenvbuild","showText":"1.25、安装邮件系统","url":"view/mlinuxenvbuild/mailsystem.md"},
	{"menuCode":"mleb26","parentMenuCode":"mlinuxenvbuild","showText":"1.26、构建mysql版邮箱账号体系","url":"view/mlinuxenvbuild/mailintegratemysql.md"},
	{"menuCode":"mleb27","parentMenuCode":"mlinuxenvbuild","showText":"1.27、域名证书申请","url":"view/mlinuxenvbuild/certinstall.md"},
	
	{"menuCode":"mprojectom","parentMenuCode":"mlinuxserver","showText":"2、项目运维","url":"#"},
	{"menuCode":"mpom01","parentMenuCode":"mprojectom","showText":"2.1、jar归档包更新手法","url":"view/mprojectom/jarupdate.md"},
];