#### 1、jar命令可选项说明
<pre class="prettyprint lang-s">
Jar可选项	参数含义说明
-c	创建一个jar包
-C	可在相应的目录下执行命令
-t	显示jar中的内容列表
-x	解压jar包
-u	添加文件到jar包中
-f	指定jar包的文件名
-v	输出详细报告
-m	指定MANIFEST.MF文件
-M	不生成清单文件MANIFEST.MF
-0	生成jar包时不压缩内容
-i	为指定的jar文件创建索引文件
</pre>
#### 2、jar全新打包
<pre class="prettyprint lang-s">
#解压旧包
jar -xvf xxxxx.jar 

#解压后的目录树
#	当前所在位置
#		|__xxxxx.jar
#		|__BOOT-INF
#		|__META-INF
#		|__com

#重新打包的范式
jar -cvf0M xxxxx.jar [目录或文件，多个用空格分隔，目录后要加斜杠]

#重新打整个包，在参数中加入要打包进去的文件夹即可
jar -cvf0M xxxxx.jar BOOT-INF/ META-INF/ org/
</pre>
#### 3、局部更新
<pre class="prettyprint lang-s">
#更新手法：将要更新的文件，按jar内的目录结构，把最外层文件夹复制到与jar平级，执行更新脚本
jar uvf xxxx.jar 单个文件在jar内的相对路径

#例：
#	当前所在位置
#		|__xxxxx.jar
#		|__com
#			|__test
#				|__A.class
#				|__B.class
#更新jar里的两个class文件，这样写：
jar -uvf xxxx.jar com/test/A.class com/test/B.class
</pre>

#### 4、直接编辑jar包内的配置文件

**用vi可以直接编辑jar包内的配置文件，这是个很酷的事情**
<pre class="prettyprint lang-s">
vi xxxx.jar

#类似用vi编辑单个文件的搜索方法一样，输入 /待编辑的文件名，回车，也可以时间文件搜索

#编辑完成后，保存并退出的做法和编辑单个文件没区别：输入esc后，输入 :wq 回车

#输入 :q 退出vi编辑器
</pre>