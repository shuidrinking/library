/*
 * Tab切换控件，该js与sdTabControl.css配套使用
 * email:shuidrinking@126.com
 * author:liuxiaosong
 * version:2009-12
 * 用法：引入js和css后，html代码如下
 * <div id="tabs" class="sd_tab">
		<div class="sd_tab_in" onclick="SDTab.altTab(document.getElementById('tabs'), document.getElementById('tabContents'),1);">xxx</div>
		...
		<div class="sd_tab_out" onclick="SDTab.altTab(document.getElementById('tabs'), document.getElementById('tabContents'),n);">xxx</div>
	</div>
	<div id="tabContents">
		<div>第1页</div>
		...
		<div style="display:none;">第n页</div>
	</div>
 */
var SDTab = {};
/**
 * 控制tab显示指定的页
 */
SDTab.altTab=function(_tabs, _containner, showSn){
	if(!_containner || !_tabs){
		return;
	}
	if(_tabs.children.length<showSn || _containner.children.length<showSn){
		return;
	}
	var size = _tabs.children.length;
	for(var i=0; i<size; i++){
		_tabs.children[i].className=((i+1)==showSn?"sd_tab_in":"sd_tab_out");
		_containner.children[i].style.display=((i+1)==showSn?"":"none");
	}
}
