/*
manageLinks v0.1
https://github.com/hoothin/UserScripts/tree/master/True%20URL%20downloads/managerLinks.js
(c) 2017-2017 by Hoothin Wang. All rights reserved.
*/
var specialUrl = /^thunder|^magnet|^ed2k/i,
	simplefilter = /\.php|\.htm|\.jsp|\.asp|\/[^\.]+$/i,
	resReg = /.*(^thunder|^magnet|^ed2k|\.torrent$|\.mp4$|\.rar$|\.7z$|\.zip$|\.rmvb$|\.mkv$|\.avi$|\.iso$|\.mp3$|\.txt$|\.exe$|\.chm$|\.pdf$|\.ppt$|\.doc$|\.pptx$|\.docx$|\.epub$|\.xlsx$|\.xls$|\.flac$|\.wma$|\.wav$|\.aac$|\.ape$|\.mid$|\.ogg$|\.m4a$|\.dts$|\.dsd$|\.apk$|\.flv$).*/i,
	linksArr = [],frame,linkPair = {},customReg,
	lang = {
		copyAll : "全部复制",
		copySel : "复制选中",
		addTips : "%i代表递增 %n代表文件名",
		sortByName : "按文件名排序",
		sortByUrl : "按网址排序",
		sortByType : "按扩展名排序",
		preHolder : "批量前缀",
		nextHolder : "批量后缀",
		closeBtn : "关闭",
		typeHead : "类型："
	};

var by = function(byName, secName) {
	var compare = function(o, p, name) {
		var a, b;
		if (typeof o === "object" && typeof p === "object" && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw("error");
		}
	}
	return function(o, p) {
		var result = compare(o, p, byName);
		if (secName && result == 0) {
			result = compare(o, p, secName);
		}
		return result;
	}
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (item) {
		var index = -1;
		for (var i = 0, length = this.length; i < length; i++) {
			if (this[i] == item) {
				index = i;
			}
		}
		return index;
	};
}

function getLinks() {
	[].forEach.call(document.querySelectorAll('a'), function(link){
		if (link.className != "whx-a" && ((customReg && customReg.test(link.href)) || specialUrl.test(link.href) || (!simplefilter.test(link.href) && resReg.test(link.href))) && linksArr.indexOf(link.href) == -1) {
			linksArr.push(link.href);
			linkPair[link.href]=link;
		}
	});
	[].forEach.call(document.querySelectorAll('source'), function(link){
		if (((customReg && customReg.test(link.href)) || specialUrl.test(link.href) || (!simplefilter.test(link.href) && resReg.test(link.href))) && linksArr.indexOf(link.src) == -1) {
			linksArr.push(link.src);
			linkPair[link.href]=link;
		}
	});
}

function initLang(l){
	if (!l) return;
	lang = l;
}

function setLinkCustomReg(r){
	customReg = r;
}

function showLinkFrame(callBack) {
	var linkItems = [];
	var typeHtml = lang.typeHead+" ";
	if (!frame) {
		$('<style>#managerLinksLinks>div{display: inline-block;width: 100%;}#managerLinksLinks>div:nth-of-type(odd){ background:#ffffff;}#managerLinksLinks>div:nth-of-type(even){ background:#f5f5f5;}#managerLinksContent input{border-width:2px;border-style:outset;border-color:buttonface;border-image:initial;border: 1px #DADADA solid;padding: 5px;border-radius: 8px;font-weight: bold;font-size: 9pt;outline: none;}#managerLinksContent input[type=button]:hover {border: 1px #C6C6C6 solid;box-shadow: 1px 1px 1px #EAEAEA;color: #333333;background: #F7F7F7;}#managerLinksContent input[type=button]:active {box-shadow: inset 1px 1px 1px #DFDFDF;   }#managerLinksLinks>div>input{float:left;height: 20px;}#managerLinksLinks>div>a{width:230px;display:block;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;float:left;}#managerLinksLinks{display:block;width:100%;overflow:auto;word-wrap:break-word;}#managerLinksType>a{text-decoration:none;}#managerLinksType{word-break:break-word;max-height:200px;overflow-y:auto;overflow-x:hidden;width:290px;margin-left:5px;}.managerLinksOverlay{height:100%; width:100%; position:fixed; top:0; z-index:99998; opacity:0.3; filter: alpha(opacity=30); background-color:#000;}.managerLinksBody{width:300px;height:auto;max-height:80%;min-height:200px;position:fixed;left:50%;top:50%;margin-top:-250px;margin-left:-150px;z-index:99998;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;}.managerLinksBody>.sort>input{width:33.3%}.managerLinksBody>.addTxt{white-space: nowrap;}.managerLinksBody>.addTxt>input{width: 136px;margin: 1px;border-radius: 2px;}.managerLinksBody>.fun>input{width: 33.3%;}.managerLinksLinks>div{width:100%;height:20px;overflow:hidden;}</style>').appendTo('head');
		frame = $(`<div id="managerLinksContent" style="display:none;">
		<div class="managerLinksOverlay"></div>
		<div class="managerLinksBody">
			<div id="managerLinksType"></div>
			<div class="sort"><input id="managerLinksSortByName" value="${lang.sortByName}" type="button"><input id="managerLinksSortByUrl" value="${lang.sortByUrl}" type="button"><input id="managerLinksSortByType" value="${lang.sortByType}" type="button">
			</div>
			<div id="managerLinksLinks"></div>
			<div title="${lang.addTips}" class="addTxt"><input id="managerLinksPre" type="text" placeholder="${lang.preHolder}"><input id="managerLinksAfter" type="text" placeholder="${lang.nextHolder}">
			</div>
			<div class="fun"><input id="managerLinksCopyAll" value="${lang.copyAll}" type="button"><input id="managerLinksCopySel" value="${lang.copySel}" type="button"><input id="managerLinksClose" value="${lang.closeBtn}" type="button">
			</div>
		</div>
		</div>`);
		$(document.body).append(frame);
		$("#managerLinksSortByName").click(function() {
			$("#managerLinksLinks").html("");
			linkItems.sort(by("linkName", "href"));
			linkItems.forEach(function(item) {
				$("#managerLinksLinks").append(item.item);
			});
		});
		$("#managerLinksSortByUrl").click(function() {
			$("#managerLinksLinks").html("");
			linkItems.sort(by("href", "type"));
			linkItems.forEach(function(item) {
				$("#managerLinksLinks").append(item.item);
			});
		});
		$("#managerLinksSortByType").click(function() {
			$("#managerLinksLinks").html("");
			linkItems.sort(by("type", "href"));
			linkItems.forEach(function(item) {
				$("#managerLinksLinks").append(item.item);
			});
		});
		$("#managerLinksCopyAll").click(function() {
			var pre = $("#managerLinksPre").val();
			var after = $("#managerLinksAfter").val();
			var resultStr = "",i=0;
			linkItems.forEach(function(item) {
				i++;
				var linkName = decodeURIComponent(item.linkName);
				resultStr += (pre.replace(/%i/g,i+"").replace(/%n/g,linkName) + item.href + after.replace(/%i/g,i+"").replace(/%n/g,linkName) + "\n");
			});
			callBack(resultStr);
		});
		$("#managerLinksCopySel").click(function() {
			var pre = $("#managerLinksPre").val();
			var after = $("#managerLinksAfter").val();
			var resultStr = "",i=0;
			linkItems.forEach(function(item) {
				i++;
				if (item.item.children("input")[0].checked) {
					var linkName = decodeURIComponent(item.linkName);
					resultStr += (pre.replace(/%i/g,i+"").replace(/%n/g,linkName) + item.href + after.replace(/%i/g,i+"").replace(/%n/g,linkName) + "\n");
				}
			});
			if(resultStr != "")
			callBack(resultStr);
		});
		$("#managerLinksClose").click(function() {
			frame.hide();
		});
		$("#managerLinksContent>div")[0].onclick = function() {
			frame.hide();
		};
	}
	getLinks();
	if(linksArr.length == 0){
		callBack();
		return;
	}
	$("#managerLinksLinks").html("");
	linksArr.forEach(function(link) {
		var type;
		if(resReg.test(link)){
			type = link.replace(resReg, "$1");
		}else{
			type = link;
			let matchArr = link.match(customReg);
			if(matchArr){
				type = matchArr[1] || matchArr[0];
			}
			if(type && type.length > 10){
				type = type.substr(0, 10);
			}
		}
		var linkName = linkPair[link].innerText;
		if (linkName) linkName = linkName.trim();
		if (!linkName) linkName = type.indexOf(".") == -1 ? link : link.replace(/.*\/([^\/]+)$/i, "$1");
		if (typeHtml.indexOf(type) == -1) {
			typeHtml += '<a href="javascript:void(0);">' + type + "</a> ";
		}
		var linkItem = $('<div title="' + link + '"><input type="checkbox"/><a href="' + link + '">' + decodeURIComponent(linkName) + '</a></div>');
		$("#managerLinksLinks").append(linkItem);
		linkItems.push({
			item: linkItem,
			href: link,
			type: type,
			linkName: linkName
		});
	});
	$("#managerLinksType").html(typeHtml);
	$("#managerLinksType>a").click(function(e) {
		var selected = this.style.textDecoration == "underline";
		this.style.textDecoration = selected ? "" : "underline";
		var type = this.innerHTML;
		linkItems.forEach(function(item) {
			if (item.type == type) {
				item.item.children("input")[0].checked = !selected;
			}
		});
	});
	frame.show();
	$("#managerLinksLinks").height($(".managerLinksBody").height() - $("#managerLinksType").height() - $("#managerLinksSortByName").height() * 3 - 38);
	$(".managerLinksBody").hide();
	$(".managerLinksBody").show();
	$(".managerLinksBody").css('margin-top',-$(".managerLinksBody").height() / 2);
}