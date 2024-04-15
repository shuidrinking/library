var lessionsArray=[
	["1","商禾启源EDK开发平台介绍","参考本手册第1章","30分钟","了解EDK平台的特点、体系结构",""],
	["2","开发环境搭建","edk教程-开发环境搭建.pptx","30分钟","能够搭建开发环境，包括：<br>开发机JDK安装、数据库工具、Eclipse安装及工作空间配置、配置eclipse中的Maven参数、在eclipse里配置tomcat、redis客户端工具","d32029k2qc4"],
	["3","EDK可视化开发IDE集成","edk教程-EDK可视化开发IDE集成.pptx","15分钟","如何获取可视化开发IDE<br>掌握EDK可视化开发插件集成和更新方法","b3202mbq47s"],
	["4","创建基于EDK平台的项目","edk教程-创建基于EDK平台的项目.pptx","40分钟","能够使用IDE创建项目（裸项目、带功能包“管理系统模板”的项目）<br>能够会为“非EDK项目”添加EDK项目支持<br>会执行数据库脚本<br>会部署项目到tomcat中会启动项目","d3202zyb02z"],
	["5","EDK项目的文件目录","edk教程-EDK项目的文件目录.pptx","15分钟","掌握EDK中配置文件的目录结构<br>了解各个目录和文件的用途","b3202c2u0to"],
	["6","EDK平台中的概念解释","edk教程-EDK平台中的概念解释.pptx","20分钟","掌握在使用EDK平台开发时会遇到的一些专业术语","d32021d0yd4"],
	["7","EDK项目启动过程讲解","edk教程-EDK项目启动过程讲解.pptx","40分钟","掌握EDK项目的启动过程<br>掌握“个性化初始化”的方法","p3202mnobln"],
	["8","EDK中交易的运行过程","edk教程-EDK中交易的运行过程.pptx","20分钟","掌握交易时序图运行<br>熟悉交易运行过程中有哪些要素并知道它们各自的作用","v3202cyz0jy"],
	["9","EDK项目中的配置文件详解","edk教程-EDK项目中的配置文件详解.pptx","50分钟","熟悉各个配置文件的用途和配置细节","a3202id4dnj"],
	["10","入门案例开发","edk教程-入门案例开发.pptx","60分钟","学会通过maven为项目添加依赖包<br>学会maven的基础操作：clean,build,instal<br>在新建的项中开发一个“hello world”功能，入门","w3202p7ep7b"],
	["11","edkMvc讲解","edk教程-edkMvc讲解.pptx","40分钟","掌握mvc文件的功能以及各个配置配置属性的作用<br>能够熟练地新建edkMvc文件、配置各个属性、指定要执行的业务逻辑","s3202bxdjgb"],
	["12","EDK平台中的数据结构","edk教程-EDK平台中的数据结构.pptx","60分钟","掌握EDK平台中的数据类型，熟悉Context、Listx、Mapx、DataCell各自的作用<br>能初步使用这些数据类型","o3202c79r4y"],
	["13","最小业务逻辑执行单元Action","edk教程-最小业务逻辑执行单元Action.pptx","30分钟","加深对“业务逻辑开发套路”的理解<br>清楚认识到Action的意义<br>学会使用IDE中提供的Action<br>学会开发并使用自定义Action","p3202oo1u21"],
	["14","edkBpm专题--配置文件讲解","edk教程-edkBpm专题--配置文件讲解.pptx","60分钟","掌握bpm文件的功能以及各个配置属性的作用<br>掌握BPM配置中的要素，包括“数据域，输入输出，业务逻辑分组，业务逻辑，交易流程”等","d32022jbbhj"],
	["15","edkBpm专题--数据域定义","edk教程-edkBpm专题--数据域定义.pptx","60分钟","掌握数据域的意义<br>掌握在业务逻辑开发中如何定义数据域、输入、输出配置","p32026rudob"],
	["16","edkBpm专题--业务逻辑流开发","edk教程-edkBpm专题--业务逻辑流开发.pptx","60分钟","掌握业务逻辑流的开发套路","f3202oqt8n1"],
	["17","edkBpm专题--Action的属性值设置","edk教程-edkBpm专题--Action的属性值设置.pptx","40分钟","掌握Action属性值如何设置","w3202wpeqts"],
	["18","edkBpm专题--定义Action原型","edk教程-edkBpm专题--定义Action原型.pptx","40分钟","掌握如何定义Action原型","k3202t2r4em"],
	["19","edkBpm专题--路由条件讲解","edk教程-edkBpm专题--路由条件讲解.pptx","30分钟","掌握跳转条件的作用<br>掌握跳转条件的写法","g3202jn68ms"],
	["20","EDK中的异常处理","edk教程-EDK中的异常处理.pptx","40分钟","掌握EDK中的异常套路","i3202gz6qk0"],
	["21","EDK项目的开发规范","edk教程-EDK项目的开发规范.pptx","40分钟","了解《edk使用手册》和edk-demo-2020的重要性<br>对edk子系统有清晰认识<br>再次熟悉edk项目的文件目录结构<br>掌握编码规范","p3202jtf56w"],
	["22","Context深入学习","edk教程-Context深入学习.pptx","30分钟","熟悉context中的固有字段<br>熟悉context的上下级关系建立<br>学习context的生命周期如何被约定和控制<br>掌握在controller中如何组织返回结果","r3202mvkisz"],
	["23","请求数据的提交方式及格式","edk教程-请求数据的提交方式及格式.pptx","60分钟","EDK中提交的请求数据有哪些格式，提交方式有哪些","z3202t5b1wt"],
	["24","服务端检查请求数据的策略","edk教程-服务端检查请求数据的策略.pptx","30分钟","掌握如何检查请求数据","q32029bcjsp"],
	["25","请求数据解密及返回数据加密","edk教程-请求数据解密及返回数据加密.pptx","40分钟","掌握如何对请求数据做“解密”等解包动作<br>熟悉对返回数据进行加密的套路","e3202p4nq4v"],
	["26","会话及会话上下文专题","edk教程-会话及会话上下文专题.pptx","60分钟","能够很好的理解“会话”和“上下文”的概念","o3202mgg2ho"],
	["27","常量定义及配置参数获取","edk教程-常量定义及配置参数获取.pptx","30分钟","熟悉EDK平台中内置的常量<br>掌握如何获取配置参数","m320237z38v"],
	["28","EDK中的内置工具类库","edk教程-EDK中的内置工具类库.pptx","30分钟","熟悉EDK中的工具类库","s3202r5saat"],
	["29","i18n设置及其他预置功能","edk教程-i18n设置及其他预置功能.pptx","30分钟","掌握i18n多语种处理方法<br>熟知EDK中的预置功能","w3202449acs"],
	["30","运行日志专题","edk教程-运行日志专题.pptx","40分钟","掌握运行日志的概念和作用<br>编写自定义Action类，在其中练习记录运行日志","e3202kmbi4g"],
	["31","交易日志专题","edk教程-交易日志专题.pptx","30分钟","掌握“交易日志”的概念和作用<br>自行编写交易日志纪录类","d32029yadk2"],
	["32","参数管理","edk教程-参数管理.pptx","30分钟","掌握平台中的参数管理手段","v3203bv3seh"],
	["33","时间戳专题","edk教程-时间戳专题.pptx","40分钟","掌握时间戳相关的概念，熟悉时间戳的作用和使用套路<br>掌握如何生成时间戳<br>掌握如何验证时间戳<br>掌握如何刷新时间戳","m3203rmaul8"],
	["34","EDK中的开放接口","edk教程-EDK中的开放接口.pptx","30分钟","熟知平台中的开放接口；<br>学习开放接口的默认实现类；<br>能够按需开发实现类；","z3203gg3ksz"],
	["35","数据源专题","edk教程-数据源专题.pptx","60分钟","掌握在配置文件中定义数据源的方法；<br>掌握多数据源使用套路；","o3203vuhhxi"],
	["36","EDK热插拔功能","edk教程-EDK热插拔功能.pptx","30分钟","掌握热插拔（热部署）套路","h32035qviar"],
	["37","EDK中接口调用的套路","edk教程-EDK中接口调用的套路.pptx","30分钟","熟悉EDK平台的接口调用套路","d3203e567l5"],
	["38","Http接口调用套路","edk教程-Http接口调用套路.pptx","50分钟","掌握HTTP接口调用套路","r32035sjf1y"],
	["39","Socket接口调用套路","edk教程-Socket接口调用套路.pptx","30分钟","掌握socket接口调用套路","g320322b45w"],
	["40","接口调用中使用虚拟报文","edk教程-接口调用中使用虚拟报文.pptx","30分钟","掌握虚拟报文的使用套路","s3203s2jszt"],
	["41","文件上传和文件下载","edk教程-文件上传和文件下载.pptx","60分钟","掌握文件上传和下载套路，自行开发案例","y3203ipoj7i"],
	["42","跑批任务引擎使用入门","edk教程-跑批任务引擎使用入门.pptx","40分钟","掌握跑批任务引擎的用法","c32036hd99r"],
	["43","跑批任务的追踪及维护","edk教程-跑批任务的追踪及维护.pptx","60分钟","了解定时任务的追踪及维护策略","t32037x9hev"],
	["44","权限检查专题","edk教程-权限检查专题.pptx","40分钟","掌握权限检查套路","r3203ozw8qa"],
	["45","缓存操作专题","edk教程-缓存操作专题.pptx","50分钟","掌握EDK平台中的缓存套路<br>掌握如何CacheService的实现类算法<br>掌握如何选择使用不同的缓存框架<br>掌握二级缓存用法","h32038xz9ab"],
	["46","动态数据域","edk教程-动态数据域.pptx","70分钟","掌握动态数据域的增删改刷","c3203swx4kx"],
	["47","EDK消息总线解决方案","edk教程-EDK消息总线解决方案.pptx","10分钟","熟悉EDK平台中的消息总线解决方案","i3203xcp76h"],
	["48","使用ActiveMQ","edk教程-使用ActiveMQ.pptx","60分钟","掌握Activemq消息的生产和消费方法","f3203a4pfv0"],
	["49","使用Kafka","edk教程-使用Kafka.pptx","50分钟","了解在项目中使用卡夫卡","f3203xwte2c"],
	["50","工作流引擎专题-1-基础知识","edk教程-工作流引擎专题-1-基础知识.pptx","60分钟","掌握工作流的基础概念","e32033srb86"],
	["51","工作流引擎专题-2-开发规则","edk教程-工作流引擎专题-2-开发规则.pptx","30分钟","掌握工作流开发的套路","r3203snpcp3"],
	["52","工作流引擎专题-3-开发实践","edk教程-工作流引擎专题-3-开发实践.pptx","150分钟","掌握工作流开发的要素，能独立完成流程开发","p3203o7m3lf"],
	["53","分布式链路跟踪引擎基础用法","edk教程-分布式链路跟踪引擎基础用法.pptx","40分钟","掌握分布式链路跟踪引擎基础用法<br>参考《EDK平台使用手册》了解在业务逻辑流中添加自定义埋点","n3203kiata5"],
	["54","分布式链路跟踪的跟踪接口调用","edk教程-分布式链路跟踪的跟踪接口调用.pptx","60分钟","掌握在接口调用的apiService类中调用跟踪工具类提供的接口","l3203nnqzx6"],
	["55","大数据分页查询","edk教程-大数据分页查询.pptx","60分钟","掌握对MYSQL数据库大数据分页查询","g3203m8vnsx"],
	["56","服务器集群搭建","edk教程-服务器集群搭建.pptx","60分钟","学习使用nginx+tomcat搭建服务器集群","y3203m5crdo"]
];

function viewVideo(showVideoDiv, iFrameId, lessionTitle, videoId){
	$(showVideoDiv).style.display = "";
	$("lessionTitle").innerHTML=lessionTitle;
	$(iFrameId).src="https://v.qq.com/txp/iframe/player.html?vid="+videoId;
};

function init(){
	let count = lessionsArray.length;
	let htmlStr = "";
	for(let i=0; i <count; i++){
		let lessionDef = lessionsArray[i];
		let viewButton = lessionDef[5];
		let downloadLink = lessionDef[2];
		if(i!=0){
			viewButton ="<div class=\"playButton\" onclick=\"viewVideo('showVideoDiv','videoIframe','"+lessionDef[1]+"','"+lessionDef[5]+"');\"/></div>";
			downloadLink = "<a href=\"../../edk4j-appends/courseware/"+lessionDef[0]+"."+lessionDef[2]+"\" download target=\"_blank\">"+lessionDef[0]+"."+lessionDef[2]+"</a>";
		}
		htmlStr += "<tr><td>"+lessionDef[0]+"</td>"
					+ "<td>"+lessionDef[1]+"</td>"
					+ "<td>"+lessionDef[3]+"</td>"
					+ "<td>"+viewButton+"</td>"
					+ "<td>"+downloadLink+"</td>" 
					+ "<td>"+lessionDef[4]+"</td>"
					+ "</tr>";
	}
	$("lessionsTable").innerHTML=htmlStr;
};
