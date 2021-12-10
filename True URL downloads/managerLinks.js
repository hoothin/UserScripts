/*
managerLinks v0.1
https://github.com/hoothin/UserScripts/tree/master/True%20URL%20downloads/managerLinks.js
(c) 2017-2017 by Hoothin Wang. All rights reserved.
*/
var specialUrl=/^magnet|^ed2k/i,
	simplefilter= /\.php|\.htm|\.jsp|\.asp|\/[^\.]+$/i,
	resReg = /.*(^magnet|^ed2k|\.torrent$|\.mp4$|\.rar$|\.7z$|\.zip$|\.rmvb$|\.mkv$|\.avi$|\.iso$|\.mp3$|\.txt$|\.exe$|\.chm$|\.pdf$|\.ppt$|\.doc$|\.pptx$|\.docx$|\.epub$|\.xlsx$|\.xls$|\.flac$|\.wma$|\.wav$|\.aac$|\.ape$|\.mid$|\.ogg$|\.m4a$|\.dts$|\.dsd$|\.apk$|\.flv$).*/i,
	linksArr = [],
	frame;
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
				index=i;
			}
		}
		return index;
	};
}

function getLinks() {
	[].forEach.call(document.querySelectorAll('a'), function(link){
		if (link.className!="whx-a" && (specialUrl.test(link.href) || (!simplefilter.test(link.href) && resReg.test(link.href))) && linksArr.indexOf(link.href) == -1) {
			linksArr.push(link.href);
		}
	});
	[].forEach.call(document.querySelectorAll('source'), function(link){
		if ((specialUrl.test(link.href) || (!simplefilter.test(link.href) && resReg.test(link.href))) && linksArr.indexOf(link.src) == -1) {
			linksArr.push(link.src);
		}
	});
}

function showLinkFrame(callBack,allBtn,selBtn) {
	var linkItems = [];
	var typeHtml = "类型：";
	if(!allBtn)allBtn="全部复制";
	if(!selBtn)selBtn="复制选中";
	if (!frame) {
		$('<style>#managerLinksContent input{border-width:2px;border-style:outset;border-color:buttonface;border-image:initial;font-size:12px}#managerLinksBody>.sort>input{width:33.3%}#managerLinksBody>.addTxt>input{width: 48%;}#managerLinksBody>.fun>input{width: 33.3%;}#managerLinksLinks>div{width:100%;height:20px;overflow:hidden}</style>').appendTo('head');
		frame = $('<div id="managerLinksContent" style="display:none;">\
		<div style="height:100%; width:100%; position:fixed; top:0; z-index:99998; opacity:0.3; filter: alpha(opacity=30); background-color:#000;"></div>\
		<div id="managerLinksBody" style="width:300px;height:300px;position:fixed;left:50%;top:50%;margin-top:-150px;margin-left:-150px;z-index:99998;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">\
			<div id="managerLinksType" style="width:290px;margin-left:5px;"></div>\
			<div class="sort"><input id="managerLinksSortByName" value="按文件名排序" type="button"><input id="managerLinksSortByUrl" value="按网址排序" type="button"><input id="managerLinksSortByType" value="按扩展名排序" type="button">\
			</div>\
			<div id="managerLinksLinks" style="width:100%;overflow:auto;word-wrap:break-word;"></div>\
			<div title="%i代表递增 %n代表文件名" class="addTxt"><input id="managerLinksPre" type="text" placeholder="批量前缀"><input id="managerLinksAfter" type="text" placeholder="批量后缀">\
			</div>\
			<div class="fun"><input id="managerLinksCopyAll" value="'+allBtn+'" type="button"><input id="managerLinksCopySel" value="'+selBtn+'" type="button"><input id="managerLinksClose" value="关闭" type="button">\
			</div>\
		</div>\
		</div>');
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
				var linkName=decodeURIComponent(item.linkName);
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
					var linkName=decodeURIComponent(item.linkName);
					resultStr += (pre.replace(/%i/g,i+"").replace(/%n/g,linkName) + item.href + after.replace(/%i/g,i+"").replace(/%n/g,linkName) + "\n");
				}
			});
			if(resultStr!="")
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
	if(linksArr.length==0){
		callBack();
		return;
	}
	$("#managerLinksLinks").html("");
	linksArr.forEach(function(link) {
		var type = link.replace(resReg, "$1");
		var linkName = type.indexOf(".") == -1 ? link : link.replace(/.*\/([^\/]+)$/i, "$1");
		if (typeHtml.indexOf(type) == -1) {
			typeHtml += '<a href="javascript:void(0);">' + type + "</a> ";
		}
		var linkItem = $('<div><input type="checkbox" style="float:left;"/><a href="' + link + '" style="width:230px;display:block;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;float:left">' + decodeURIComponent(linkName) + '</a></div>');
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
	$("#managerLinksLinks").height($("#managerLinksBody").height() - $("#managerLinksType").height() - $("#managerLinksSortByName").height() * 3 - 20);
	$("#managerLinksBody").hide();
	$("#managerLinksBody").show();
}