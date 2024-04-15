var CodePrettyUtil={};
CodePrettyUtil.htmlEscape=function(s) {
	return s
	  .replace(/&/g, '&amp;')
	  .replace(/</g, '&lt;')
	  .replace(/>/g, '&gt;');
}
CodePrettyUtil.escapeInnerHTML=function(sourceId, showerId){
	if(!sourceId || !document.getElementById(sourceId)){
		return;
	}
	let htmlString = CodePrettyUtil.htmlEscape(document.getElementById(sourceId).innerHTML);
	htmlString = htmlString.replace(
	  /&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g,
	  '<span class="operative">$&<\/span>');
	if(showerId){
		document.getElementById(showerId).innerHTML=htmlString;
	}
}