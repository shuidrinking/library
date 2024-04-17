#### 1、jar全新打包
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
#### 2、局部更新
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

#### 3、直接编辑jar包内的配置文件

**用vi可以直接编辑jar包内的配置文件，这是个很酷的事情**
<pre class="prettyprint lang-s">
vi xxxx.jar

#类似用vi编辑单个文件的搜索方法一样，输入 /待编辑的文件名，回车，也可以时间文件搜索

#编辑完成后，保存并退出的做法和编辑单个文件没区别：输入esc后，输入 :wq 回车

#输入 :q 退出vi编辑器
</pre>