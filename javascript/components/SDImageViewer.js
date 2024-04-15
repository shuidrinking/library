/*
 * function:图片全页尺寸放大器，与sdImageViewer.css配套使用
 * @author liuxiaosong(shuidrinking@126.com)
 * @version 201903
 * 使用样例：
 * <!-- 单张图片放大容器 --> 
	<div id="SDbigImageContainner" class="sdImageViewer-bigImageContainner" style="display:none;" onclick="this.style.display='none'">
	    <img class="sdImageViewer-bigImage" onclick="this.parentNode.style.display="none"/>
	</div>
	</div>
	<!-- 小图列表 -->
	<div class="thumbImageContainner">
	    <img src="http://f.hiphotos.baidu.com/image/pic/item/80cb39dbb6fd5266cdb2ba16a718972bd4073612.jpg" onclick="SDImageViewer.showBigImage(this)" />
	 	<img src="http://a.hiphotos.baidu.com/image/pic/item/e61190ef76c6a7ef5e886d03f1faaf51f3de666d.jpg" onclick="SDImageViewer.showBigImage(this)"/> 
	    <img src="http://g.hiphotos.baidu.com/image/pic/item/730e0cf3d7ca7bcb747b4a5cb2096b63f624a845.jpg" onclick="SDImageViewer.showBigImage(this)"/>
	    <img src="http://c.hiphotos.baidu.com/image/pic/item/b21c8701a18b87d6657856e70c0828381f30fd14.jpg" onclick="SDImageViewer.showBigImage(this)"/>
	    <img src="http://e.hiphotos.baidu.com/image/pic/item/d788d43f8794a4c2f12be52b00f41bd5ad6e39a1.jpg" onclick="SDImageViewer.showBigImage(this)"/>
	</div> 
 */
var SDImageViewer={};
SDImageViewer.init=function(){
	if(!document.querySelector("#SDbigImageContainner")){
		var _masker = document.createElement("div");
		_masker.setAttribute("id", "SDbigImageMasker");
		_masker.className="sdImageViewer-masker";
		_masker.style.display = "none";
		document.body.appendChild(_masker);
		
		var _containner = document.createElement("div");
		_containner.setAttribute("id", "SDbigImageContainner");
		_containner.className="sdImageViewer-bigImageContainner";
		_containner.onclick=SDImageViewer.hidden;
		document.body.appendChild(_containner);
		
		var _bigImage = document.createElement("img");
		_bigImage.className="sdImageViewer-bigImage";
		_bigImage.onclick=SDImageViewer.hidden;
		_containner.appendChild(_bigImage);
		_containner.style.display = "none";
	}
}

/**
 * 应用时，调用该方法，传入图片的SRC，即可显示大图
 */
SDImageViewer.showBigImage=function(imageSrc) {
	if(!document.querySelector("#SDbigImageContainner")){
		SDImageViewer.init();
	}
	var _containner = document.querySelector("#SDbigImageContainner");
	var _masker=document.querySelector("#SDbigImageMasker");
	var _bigImage = _containner.children[0]; 
	_containner.style.display = "";
	_masker.style.display = "";
	_bigImage.src = imageSrc;
}
SDImageViewer.hidden=function(){
	var _containner=document.querySelector("#SDbigImageContainner");
	if(_containner){
		_containner.style.display="none";
	}
	var _masker=document.querySelector("#SDbigImageMasker");
	if(_masker){
		_masker.style.display="none";
	}
	
}