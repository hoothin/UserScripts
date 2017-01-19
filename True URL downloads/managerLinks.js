/*
managerLinks v0.1
https://github.com/hoothin/UserScripts/tree/master/True%20URL%20downloads/managerLinks.js
(c) 2017-2017 by Hoothin Wang. All rights reserved.
*/
var resReg = /.*(^magnet|^ed2k|\.torrent$|\.mp4$|\.rar$|\.7z$|\.zip$|\.rmvb$|\.mkv$|\.avi$|\.iso$|\.mp3$|\.txt$|\.exe$|\.chm$|\.pdf$|\.ppt$|\.doc$|\.pptx$|\.docx$|\.epub$|\.xlsx$|\.xls$|\.flac$|\.wma$|\.wav$|\.aac$|\.ape$|\.mid$|\.ogg$|\.m4a$|\.dts$|\.dsd$|\.apk$).*/i,
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

function getLinks() {
	var links = document.querySelectorAll('a');
	[].forEach.call(document.querySelectorAll('a'), function(link){
		if (resReg.test(link.href) && linksArr.toString().indexOf(link.href) == -1) {
			linksArr.push(link.href);
		}
	});
}

function showLinkFrame(callBack,allBtn,selBtn) {
	var linkItems = [];
	var typeHtml = "类型：";
	if(!allBtn)allBtn="全部复制";
	if(!selBtn)selBtn="复制选中";
	if (!frame) {
		frame = $('<div id="managerLinksContent" style="display:none;">
		<div style="height:100%; width:100%; position:fixed; top:0; z-index:99998; opacity:0.3; filter: alpha(opacity=30); background-color:#000;"></div>
		<div id="managerLinksBody" style="width:300px;height:300px;position:fixed;left:50%;top:50%;margin-top:-150px;margin-left:-150px;z-index:99998;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
			<div id="managerLinksType" style="width:290px;margin-left:5px;"></div>
			<div><input id="managerLinksSortByName" value="按文件名排序" style="width: 33.3%;font-size:12px" type="button"><input id="managerLinksSortByUrl" value="按网址排序" style="width: 33.3%;font-size:12px" type="button"><input id="managerLinksSortByType" value="按扩展名排序" style="width: 33.3%;font-size:12px" type="button">
			</div>
			<div id="managerLinksLinks" style="width:100%;overflow:auto;word-wrap:break-word;font-size:12px"></div>
			<div title="%i代表递增 %n代表文件名"><input id="managerLinksPre" style="width: 48%;font-size:12px" type="text" placeholder="批量前缀"><input id="managerLinksAfter" style="width: 48%;font-size:12px" type="text" placeholder="批量后缀">
			</div>
			<div><input id="managerLinksCopyAll" value="'+allBtn+'" style="width: 33.3%;font-size:12px" type="button"><input id="managerLinksCopySel" value="'+selBtn+'" style="width: 33.3%;font-size:12px" type="button"><input id="managerLinksClose" value="关闭" style="width: 33.3%;font-size:12px" type="button">
			</div>
		</div>
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
				if (item.item[0].checked) {
					var linkName=decodeURIComponent(item.linkName);
					resultStr += (pre.replace(/%i/g,i+"").replace(/%n/g,linkName) + item.href + after.replace(/%i/g,i+"").replace(/%n/g,linkName) + "\n");
				}
			});
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
		var linkItem = $('<input type="checkbox" style="float:left;"/><a href="' + link + '" style="width:230px;display:block;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;float:left">' + decodeURIComponent(linkName) + '</a><br>');
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
				item.item[0].checked = !selected;
			}
		});
	});
	frame.show();
	$("#managerLinksLinks").height($("#managerLinksBody").height() - $("#managerLinksType").height() - $("#managerLinksSortByName").height() * 3 - 20);
	$("#managerLinksBody").hide();
	$("#managerLinksBody").show("slow");
}