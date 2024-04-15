/*
the encoding of this js file must be 'utf-8'
decription: provide ajax functions
@author:liuxiaosong
@email: shuidrinking@126.com
@date: 2018-09-18
*/
/**
 * 原生ajax引擎
 */
var Server = Server||{};
Server.getXMLHttpRequest = function(){
	try{
		return new XMLHttpRequest();
	}
	catch(e){
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e){
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
	}
}

/**
 * 放弃ajax请求
 */
Server.abort=function(){
	XMLHttpRequest.abort();
}

/**
 * 动态加载资源
 * @param url
 * @param callbackFunction 回调函数
 * @param async：是否异步加载，默认为true, 可选值true/false，false时同步加载
 */
Server.loadResource = function(url, callBackFunction, async){
	if(async==null || async===""){
		async=true;
	}
	var Request = Server.getXMLHttpRequest();
	var header = Request.getAllResponseHeaders();
	
	Request.onerror = function(message){
		if(callBackFunction){
			callBackFunction({"resultCode": "_server::Error", "resultMessage": "访问故障：无法连接到服务器！" });
		}
		else{
			return "访问出错了：" + message;
		}
		return;
	}
	
	//define status change event
	Request.onreadystatechange=function(){
		/*
		 * readyState：
			0	 未发送
			1	 已发送但未发送完
			2	 发送完毕
			3	 开始接收数据但是没有接收完
			4	 接收完数据
		*/
		if(Request.readyState==4){
			/*
			 * status:
				200：请求成功 
				404：没有发现文件、查询或url 
				400~499：客户端问题 
				500 ：服务端问题 
			 */
			if(Request.status!=200){
				let returnCode=Request.status;
				if(returnCode=="0"){
					returnCode = "_server::Error";
				}
				if(callBackFunction){
					callBackFunction({"resultCode": returnCode, "resultMessage": Request.statusText});
				}
				else{
					return Request.statusText;
				}
				return;
			}
			//渲染内容
			var textContent = Request.responseText;
			if(callBackFunction){
				callBackFunction(textContent);
			}
			else{
				return textContent;
			}
		}
		//other Request.readyState value do noting
		else{}
	}
	//此处只负责加载html和js
	var htmlFileUrl = Server.projectUrl;
	if(url.charAt(0)=="/"){
		htmlFileUrl = htmlFileUrl + url;
	}
	else{
		htmlFileUrl = htmlFileUrl + "/" + url;
	}
	Request.open("GET", htmlFileUrl, async);
	Request.send();
}