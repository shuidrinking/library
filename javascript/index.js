var menuList=menuList||[];
var menuMap={}; 
function init(){
	if(typeof(Worker) == "undefined"){
		return;
	}
	//生成菜单树控件
	var menu = new MenuTree();
	menu.Container = "menuContent";//指定容器
	menu.addNode("0", null, "文档", "0");
	//{"menuCode":"","showText":"","url":"","parentMenuCode":"","levelNo":"2"}
	for(var p in menuList){
		menuMap[menuList[p].menuCode]=menuList[p];
		menu.addNode(menuList[p].menuCode, menuList[p].parentMenuCode, menuList[p].showText, menuList[p].menuCode);
	}
	menu.expandAllFlag=false;//是否在加载时默认展开所有
	menu.URLProxy = "loadView";
	menu.RootNodeId = "0";//设置跟结点
	menu.generateMenu();//勾画菜单树
}
/**
 * iframe onload事件调整大小
 */
function reSize(){
	
}
/**
 * 点击菜单后在iframe中加载目标页面
 * @returns
 */
function loadView(menuCode, _element){
	var url=null;
	if(menuMap[menuCode]){
		url=menuMap[menuCode].url;
	}
	else{
		return;
	}
	
	/* var currentMenu=menuMap[menuCode];
	var positionHTMLString=currentMenu.showText;
	while(true){
		var parentCode=currentMenu.parentMenuCode;
		if(parentCode=="0"){
			break;
		}
		var currentMenu=menuMap[parentCode];
		if(currentMenu){
			positionHTMLString=currentMenu.showText+" >> " + positionHTMLString
		}
		else{
			break;
		}
	}
	$("currentPositionDiv").innerHTML="当前位置："+positionHTMLString; */
	
	let _oldelement = document.querySelector(".activeMenu");
	if(_oldelement){
		_oldelement.classList.remove("activeMenu");
	}
	_element.className="activeMenu";
	var containner = $("contentContainnerDiv");
	Server.loadResource(url, function(data){
		containner.innerHTML = marked.parse(data);
		PR.prettyPrint();
	});
}
/**
 * 设置菜单显示状态
 * @returns
 */
var menuExpand=true;
function toggleMenu(){
	if(menuExpand){
		$("menuDiv").className="menuDivHidden";
		$("menuToggleDiv").className="showMenuIcon";
		$("menuToggleDiv").innerHTML="<div class='arrow arrow-right'></div>";
		$("workAreaDiv").className="workAreaDivMax";
		menuExpand=false;
	}
	else{
		$("menuDiv").className="menuDivShow";
		$("menuToggleDiv").className="hideMenuIcon";
		$("menuToggleDiv").innerHTML="<div class='arrow arrow-left'></div>";
		$("workAreaDiv").className="workAreaDivMin";
		menuExpand=true;
	}
}