#### 1、安装elasticsearch
>1.1 选择要下载的版本，进行下载，例如本次下载7.15.0
* **https://www.elastic.co/cn/downloads/past-releases#elasticsearch**
>1.2 配置/etc/profile，设置 ES_JAVA_HOME 环境变量，执行es自带的jdk
<pre class="prettyprint lang-s">
cat >> /etc/profile << EOF
export ES_JAVA_HOME=/opt/elasticsearch-7.15.0/jdk
EOF

#刷新环境
source /etc/profile
</pre>
>1.3 下载IK分词器插件
<pre class="prettyprint lang-s">
https://www.elastic.co/guide/en/elasticsearch/plugins/${版本号}/analysis.html
分词器插件：
https://github.com/medcl/elasticsearch-analysis-ik
</pre>
>1.4 部署分词器插件
<pre class="prettyprint lang-s">
#将插件解压到Elasticsearch节点的plugins目录下
#重启es即可
</pre>