var TreeControlNodes=[];function TreeControl(){this.Container="TreeContainer",TreeControl._TempBranch=null,this.RootNodeId="1000",this.expandAllFlag=!0,this.Nodes=[],this.NodeMap={},this.NodeStack=[],this.NodesCount=0,this.rootFlag=!1,this.URLProxy=null,this.BranchApplyURLProxy=!1,this.Controltype=null,this.BranchControlFlag=!1,this.ControlPreFlag=!0,this.ControlName=null,this.ControlText=null,this.ControlCount=-1,this.addModifyFlag=!0,this.modifyFunctionName=null,this.addSubNodeFunctionName=null,this.modifyFunctionText="添加子节点",this.addSubNodeFunctionText="修改",TreeControl.prototype.addNode=function(t,e,o,n,i){var r={};r.ID=t,r.PID=e,r.TEXT=o,r.URL=n,r.STATUS=i,r.EF=!1,this.Nodes.push(r),this.NodeMap[t]=r,this.NodesCount++},TreeControl.prototype.generateRoot=function(){var t=this.NodeMap[this.RootNodeId],e=document.createElement("div"),o=e.className;e.className=void 0!==o&&o?o+" treeControl":"treeControl";var n=document.createElement("ul");e.setAttribute("id",t.ID),e.setAttribute("expand","1");var i="<div class='treeControlOpenFolder'></div>";if(this.BranchApplyURLProxy?i+="<a href=\"javascript:TreeControl.ShowHide('"+this.RootNodeId+"');"+this.URLProxy+"(null,'"+this.RootNodeId+"');\">"+t.TEXT+"</a>":i+="<a href=\"javascript:TreeControl.ShowHide('"+this.RootNodeId+"');\">"+t.TEXT+"</a>",this.addModifyFlag&&this.addSubNodeFunctionName)i+='<div class="treeControlMiniButton" onclick="'+this.addSubNodeFunctionName+"('"+this.RootNodeId+"');\">"+this.addSubNodeFunctionText+"</div>";else if(0<this.ControlCount)for(var r=1;r<=this.ControlCount;r++)null!=this.ControlType[r-1]&&"checkbox"!=this.ControlType[r-1].toLowerCase()&&(i+="<input value="+this.RootNodeId+" type='"+this.ControlType[r-1]+"' name=\""+this.ControlName[r-1]+'" id="B_'+this.RootNodeId+"_"+r+'">'+this.ControlText[r-1]);e.innerHTML=i,e.appendChild(n),document.getElementById(this.Container).appendChild(e),0<this.NodesCount&&this.Nodes.reverse();for(var l=0;l<this.NodesCount;l++)this.Nodes[l].PID==this.RootNodeId&&this.NodeStack.push(this.Nodes[l]);this.rootFlag=!0},TreeControl.prototype.generateTree=function(){for(var t=0;t<this.ControlCount;t++)null!=this.ControlType[t]&&(this.ControlType[t]=this.ControlType[t].toLowerCase());if(this.rootFlag)for(;null!=this.NodeStack[0];){var e=this.NodeStack.pop();TreeControlNodes.push(e);var o=document.createElement("li");if(o.setAttribute("id",e.ID),o.innerHTML="<div class='treeControlItem'></div><a href=\"javascript:"+this.URLProxy+"('"+e.URL+"','"+e.ID+"');\">"+e.TEXT+"</a>",this.addModifyFlag&&(this.addSubNodeFunctionName&&(o.innerHTML+='<div class="treeControlMiniButton" onclick="'+this.addSubNodeFunctionName+"('"+e.ID+"');\">"+this.addSubNodeFunctionText+"</div>"),this.modifyFunctionName&&(o.innerHTML+='<div class="treeControlMiniButton" onclick="'+this.modifyFunctionName+"('"+e.ID+"');\">"+this.modifyFunctionText+"</div>")),0<this.ControlCount){for(var n="",i=1;i<=this.ControlCount;i++)"checkbox"==this.ControlType[i-1]?n=n+"<input value="+e.ID+" type='"+this.ControlType[i-1]+"' name=\""+this.ControlName[i-1]+'" id="L_'+e.ID+"_"+i+"\" onclick=TreeControl.setParentNodes(this,'"+e.PID+"',"+i+")>"+this.ControlText[i-1]:null!=this.ControlType[i-1]&&(n=n+"<input value="+e.ID+" type='"+this.ControlType[i-1]+"' name=\""+this.ControlName[i-1]+'" id="L_'+e.ID+"_"+i+'">'+this.ControlText[i-1]);this.ControlPreFlag&&(o.innerHTML="<div class='treeControlItem'></div>"+n+'<a href="javascript:'+this.URLProxy+"('"+e.URL+"','"+e.ID+"');\">"+e.TEXT+"</a>"),this.ControlPreFlag||(o.innerHTML=o.innerHTML+n)}for(t=0;t<this.NodesCount;t++)if(e.ID==this.Nodes[t].PID){e.EF=!0,this.NodeMap[e.ID].EF=!0;break}if(e.EF){var r="treeControlCloseFolder";this.expandAllFlag&&(r="treeControlOpenFolder"),TreeControlNodes.pop();for(var l=0;l<this.NodesCount;l++)this.Nodes[l].PID==e.ID&&this.NodeStack.push(this.Nodes[l]);var s=document.createElement("ul"),a="<div class='"+r+"'></div><a href=\"javascript:TreeControl.ShowHide('"+e.ID+"');";if(this.BranchApplyURLProxy&&(a+=this.URLProxy+"('"+e.URL+"','"+e.ID+"');"),a+='">'+e.TEXT+"</a>",this.addModifyFlag&&(this.addSubNodeFunctionName&&(a+='<div class="treeControlMiniButton" onclick="'+this.addSubNodeFunctionName+"('"+e.ID+"');\">"+this.addSubNodeFunctionText+"</div>"),this.modifyFunctionName&&(a+='<div class="treeControlMiniButton" onclick="'+this.modifyFunctionName+"('"+e.ID+"');\">"+this.modifyFunctionText+"</div>")),this.BranchControlFlag&&0<this.ControlCount){for(n="",i=1;i<=this.ControlCount;i++)"checkbox"==this.ControlType[i-1]?n=n+"<input value="+e.ID+" type='"+this.ControlType[i-1]+"' name='"+this.ControlName[i-1]+"' id=\"B_"+e.ID+"_"+i+"\" onclick=TreeControl.setSubNodes(this,'"+e.ID+"',"+i+")>"+this.ControlText[i-1]:null!=this.ControlType[i-1]&&(n=n+"<input value="+e.ID+" type='"+this.ControlType[i-1]+"' name='"+this.ControlName[i-1]+"' id=\"B_"+e.ID+"_"+i+'">'+this.ControlText[i-1]);this.ControlPreFlag?a="<div class='"+r+"'></div>"+n+"<a href=\"javascript:TreeControl.ShowHide('"+e.ID+"');"+this.URLProxy+"('"+e.URL+"','"+e.ID+"');\">"+e.TEXT+"</a>":a+=n}o.innerHTML=a,o.appendChild(s),this.expandAllFlag?(o.setAttribute("expand","1"),s.style.display="block"):(o.setAttribute("expand","0"),s.style.display="none")}document.getElementById(e.PID).lastChild.appendChild(o)}else alert("you can't call this method")},TreeControl.prototype.generate=function(){if(null!=this.URLProxy){if(-1==this.ControlCount&&this.ControlType&&(this.ControlCount=this.ControlType.length),this.ControlType&&!this.ControlText&&(this.ControlText=[]),this.ControlType&&!this.ControlName&&(this.ControlName=[]),this.ControlType&&this.ControlText&&this.ControlType.length!=this.ControlText.length)for(var t=0;t<this.ControlType.length;t++)this.ControlText[t]||(this.ControlText[t]="");if(this.ControlType&&this.ControlName&&this.ControlType.length!=this.ControlName.length)for(t=0;t<this.ControlType.length;t++)this.ControlName[t]||(this.ControlName[t]="");this.generateRoot(),this.generateTree()}else alert("URLProxy function can not be null")},TreeControl.ShowHide=function(t){var e=document.getElementById(t),o=e.childNodes;"1"==e.getAttribute("expand")?(o[0].className="treeControlCloseFolder",e.lastChild.style.display="none",e.setAttribute("expand","0")):(o[0].className="treeControlOpenFolder",e.lastChild.style.display="block",e.setAttribute("expand","1"))}}function callBackLeaf(data){for(;null!=data[0];){eval("var tempNode="+data.pop()),tempNode.PID=TreeControl._TempBranch.id.substring(3),Indices.push(tempNode);var _tmpLI=document.createElement("li");_tmpLI.setAttribute("id",tempNode.ID),_tmpLI.innerHTML="<div class='treeControlItem'></div><a href=javascript:void(0)>"+tempNode.Name+"</a>",TreeControl._TempBranch.lastChild.appendChild(_tmpLI)}}TreeControl.setSubNodes=function(t,e,o){for(var n=t.checked,i=null,r=document.getElementById(e).getElementsByTagName("input"),l=r.length,s=0;s<l;s++){var a=(i=r[s]).getAttribute("id");a.substr(a.length-1)-o==0&&(i.checked=n)}},TreeControl.setParentNodes=function(t,e,o){var n=document.getElementById("B_"+e+"_"+o);if(null!=n&&null!=n)if(t.checked)n.checked=!0;else{n.checked=!1;for(var i=document.getElementById(e).getElementsByTagName("input"),r=i.length,l=0;l<r;l++){var s=i[l].getAttribute("id");if(s.substr(s.length-1)-o==0&&i[l].checked){n.checked=!0;break}}}};