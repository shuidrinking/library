#### 1、视频处理神器ffmpeg

**市面上绝大部分视在线视频处理工具后台用的都是ffmpeg**，<a href="https://ffmpeg.org/ffmpeg.html" target="_blank">官方文档</a>
<pre class="prettyprint lang-s">
#查看安装源
dnf whatprovides 'ffmpeg'
#安装
dnf install ffmpeg
#查看帮助
ffmpeg --help

#使用样例：将视频转换为gif
ffmpeg -i xxxx.mp4 xxxx.gif
</pre>