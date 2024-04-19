#### 1、安装音频解码器

>1.1 首选 <a href="https://audacious-media-player.org" target="_blank">audicious</a>


<pre class="prettyprint lang-s">
#安装本体
dnf install audacious
#安装MP3解码器
dnf install audacious-plugins-freeworld
</pre>
>1.2 其次qmmp

* 这款界面虽然很像winnamp，但是界面很小，操作按钮不清晰，不怎么样，在fedora下安装不到高版本，解码器安装不上不能播放MP3
<pre class="prettyprint lang-s">
$ sudo dnf install qmmp
</pre>