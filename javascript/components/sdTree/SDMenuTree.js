/*
title: ShuiDrinking SDTree
author:liuxiaosong
e-mail:shuidrinking@126.com
*/

	function MenuTree(){
		this.Container="MenuContainer";
		MenuTree._TempBranch=null;
		this.expandAllFlag=true;//是否打开全部标志
		this.openFirstLevelMenus=false;//是否打开1级菜单
		this.RootNodeId="00";
		this.Nodes=[];
		this.NodeStack=[];
		this.NodesCount=0;
		this.rootFlag=true;
		this.URLProxy=null;
		this.showRootFlag=false;
		MenuTree.prototype.addNode=function(nodeId,parentId,nodeText,nodeUrl){
                	var Item={};
                        Item.ID=nodeId;
                        Item.PID=parentId;
                        Item.TEXT=nodeText;
                        Item.URL=nodeUrl;
                        Item.EF=false;
                        this.Nodes.push(Item);
			this.NodesCount++;
		}

		MenuTree.prototype.generateRoot=function(){
			var _rootLI=document.createElement("div");
			_rootLI.setAttribute("expand","1");
			_rootLI.setAttribute("id",this.RootNodeId);
			if(this.showRootFlag){
				var _rootUL=document.createElement("div");
				var _firstUL=document.createElement("ul");
				for(var n=0;n<this.NodesCount;n++){
					if(this.Nodes[n].ID==this.RootNodeId){
						_rootLI.setAttribute("id",this.Nodes[n].ID);
						_rootLI.innerHTML="<div class='treeControlOpenFolder'></div><a href=javascript:MenuTree.ShowHide('"+this.RootNodeId+"');>"+this.Nodes[n].TEXT+"</a>";
						break;
					}
				}
				_rootUL.appendChild(_rootLI);
			}
			document.getElementById(this.Container).appendChild(_rootLI);
			if(this.NodesCount>0){
				this.Nodes.reverse();
			}
			for(var n=0;n<this.NodesCount;n++){
				if(this.Nodes[n].PID==this.RootNodeId){
					this.NodeStack.push(this.Nodes[n]);
				}
			}
			var _firstUL=document.createElement("ul");
			if(!this.showRootFlag){
				_firstUL.className="treeControlFirstUl";
			}
			_rootLI.appendChild(_firstUL);
			this.rootFlag=true;
		}

		MenuTree.prototype.generateTree=function(){
			if(!this.rootFlag){
				alert("MenuTree.generateTree()error：root is not exist !");
				return;
			}
			while(this.NodeStack[0]!=null){
				var curNode=this.NodeStack.pop();
				var _curLI=document.createElement("li");
				_curLI.setAttribute("id",curNode.ID);
				_curLI.innerHTML="<div class='treeControlItem'></div>"
                           		+"<a onclick=\""+this.URLProxy+"('"+curNode.URL+"', this);\">"+curNode.TEXT+"</a>";
				if(curNode.PID==this.RootNodeId && !this.showRootFlag){
					_curLI.className="treeControlFirstLi";
				}
				for(var k=0;k<this.NodesCount;k++){
					if(curNode.ID==this.Nodes[k].PID){
						curNode.EF=true;
						break;
					}
				}

				if(curNode.EF){
					for(var n=0;n<this.NodesCount;n++){
						if(this.Nodes[n].PID==curNode.ID){
							this.NodeStack.push(this.Nodes[n]);
						}
					}
					var _curUL=document.createElement("ul");
					//设置打开或关闭标志图片
					var folderClassName="treeControlCloseFolder";
					if(this.expandAllFlag){
						folderClassName="treeControlOpenFolder";
					}
					_curLI.innerHTML="<div class='"+folderClassName+"'></div>"
                                    			+"<a href=\"javascript:MenuTree.ShowHide('"+curNode.ID+"');\">"+curNode.TEXT+"</a>";

					_curLI.appendChild(_curUL);
					if(this.expandAllFlag){
						_curLI.setAttribute("expand","1");//设置其折叠状态标志
						_curUL.style.display="block";//将当前结点设置为打开
					}
					else{
						if(this.openFirstLevelMenus && curNode.PID==this.RootNodeId){
							_curLI.setAttribute("expand","1");//设置其折叠状态标志
							_curUL.style.display="block";//将当前结点设置为打开
						}
						else{
							_curLI.setAttribute("expand","0");//设置其折叠状态标志
							_curUL.style.display="none";//将当前结点设置为折叠
						}
					}
				}
				document.getElementById(curNode.PID).lastChild.appendChild(_curLI);
			}
		}

		MenuTree.prototype.generateMenu=function(){
			if(this.URLProxy==null){
				alert("URLProxy is not defined");
				return;
            }
			var existClassName=document.getElementById(this.Container).className;
			if(typeof(existClassName)!="undefined" && existClassName){
				document.getElementById(this.Container).className=existClassName+" treeControl";
			}
			else{
				document.getElementById(this.Container).className="treeControl";
			}
			this.generateRoot();
			this.generateTree();
		}

		MenuTree.ShowHide=function(nodeID){
			var _curNode=document.getElementById(nodeID);
			var _childs=_curNode.childNodes;
			var flg=_curNode.getAttribute("expand");
			if (flg=="1"){
				_childs[0].className="treeControlCloseFolder";
				_curNode.lastChild.style.display="none";
				_curNode.setAttribute("expand","0");
			}
			else {
				_childs[0].className="treeControlOpenFolder";
				_curNode.lastChild.style.display="block";
				_curNode.setAttribute("expand","1");
			}
		}
    }

