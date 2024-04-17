#### 1、安装命令终端版文件浏览器ranger
>1.1 安装
<pre class="prettyprint lang-s">
#下载后执行make，fedora和centos的安装源中有，可以直接用dnf安装
#wget https://ranger.github.io/ranger-stable.tar.gz

#如果安装源能找到，则可以直接安装
#dnf install ranger
</pre>
>1.2 生成配置文件
<pre class="prettyprint lang-s">
ranger --copy-config=all
#			然后，就会在 /root/.config/ranger/ 里生成几个配置文件：
#			rifle.conf
#			commands.py：定义了 ranger 的控制台命令；
#			rifle.py：定义了使用什么程序来打开文件；
#			rc.conf：ranger 按键绑定及设置；
#			scope.sh：定义了如何处理文件预览。 
</pre>
>1.3 使用技巧
<pre class="prettyprint lang-s">
#使用 ranger 预览图片的方法
#	在一些终端工具，比如 urxvt, iTerm2, Kitty 和 Terminology ，可以支持图片预览。
#	（实测 MobaXterm 和 Xshell 都暂时还不支持直接图片预览，而是打开一个新窗口）
#	可以在 rc.conf 这个配置文件里，将 preview_images 这个变量设置为 true 。

#默认情况下，ranger 是将 PDF 文件转为图片再显示。如果你想原汁原味显示 PDF 文件，可以打开 scope.sh 这个文件，然后把下面这段代码的注释打开：

#操作命令，其实它的很多操作都跟 Vim 很类似
#	上页    ctrl + b/u
#	下页    ctrl + f/d
#	首行    gg
#	尾行    G
#	前进    L 
#	后退    H
#	上级目录    h
#	下级目录    l
#	查找    f
#	搜索    /
#	查找下一个  n
#	查找上一个  N
#	新建目录/文件       :touch xxx
#	删除目录/文件       dD
#	修改目录/文件       cw/I/A
#	复制目录/文件       yy
#	粘贴目录/文件       pp
#	剪切目录/文件       dd
#	刷新目录/文件       R
</pre>