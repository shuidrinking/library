function openSearchDialog(){
	$("search-dialog").classList.remove("search-dialog-hidden");
	$("search-dialog").classList.add("search-dialog-show");
	$("open-search-dialog-button").style.display="none";
}

function closeSearchDialog(){
	$("search-dialog").classList.remove("search-dialog-show");
	$("search-dialog").classList.add("search-dialog-hidden");
	$("open-search-dialog-button").style.display="";
}
function dealShowText(keyword, content){
	if(!content){
		return "";
	}
	content = content.replaceAll(/\n/g, "<br>").replaceAll(/\t/g, "<label style='width:0.48rem;height:0.1rem;'></label>").replaceAll(keyword, "<label style='color:#ff0000;'>"+keyword+"</label>");
	return content;
}
function doSearch(){
	let keywords=$("keywords-input").value.trim();
	if(!keywords){
		return;
	}
	top.sdMasker.progress.show();
	var param={"keyword" : keywords};
	Server.doSearch("search", param ,function(data){
		top.sdMasker.progress.hidden();
		if(data.resultCode!="0"){
			alert(data.resultMessage);
		}
		else{
			let resultList = data.resultList;
			if(resultList && resultList.length>0){
				let htmlstr="";
				let article=null;
				let menu=null;
				for(let i=0, s=resultList.length; i<s ; i++){
					article=resultList[i];
					menu=menuPathKeyedMap["view/"+article.path]
					if(!menu){
						continue;
					}
					htmlstr += "<div class='one-row'>"
								+"<div class='one-row-title' onclick=\"loadSearchedView('"+menu.url+"')\">" + menu.showText + "</div>"
								+"<p>" + dealShowText(keywords, article.content) + "</p>"
								+"</div>";
				}
				$("search-result-div").innerHTML = htmlstr;
			}
			else{
				$("search-result-div").innerHTML = "未找到匹配的文档！";
			}
		}
	});
}

function loadSearchedView(url){
	var containner = $("contentContainnerDiv");
	Server.loadResource(url, function(data){
		containner.innerHTML = marked.parse(data);
		PR.prettyPrint();
	});
}

