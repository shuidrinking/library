#### 安装chrome浏览器
>1.1 直接使用chrome安装源在线安装
<pre class="prettyprint lang-s">
#添加chrome源
cd /etc/yum.repos.d/

#下载google-chrome.repo并保存
wget -O /etc/yum.repos.d/fedora-googlechrome.repo http://repo.fdzh.org/chrome/google-chrome-mirrors.repo 

#安装Chrome
dnf install -y google-chrome-stable
#大约等待十几分钟安装完毕后，就可以在所有应用中找到Chrome了。
</pre>

>1.2 下载离线chrome安装文件