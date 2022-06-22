// ==UserScript==
// @name         DownloadAllContent
// @name:zh-CN   怠惰小说下载器
// @name:zh-TW   怠惰小説下載器
// @name:ja      怠惰者小説ダウンロードツール
// @namespace    hoothin
// @version      2.7.3.8
// @description  Fetch and download main content on current page, provide special support for chinese novel
// @description:zh-CN  通用网站内容抓取工具，可批量抓取任意站点的小说、论坛内容等并保存为TXT文档
// @description:zh-TW  通用網站內容抓取工具，可批量抓取任意站點的小說、論壇內容等並保存為TXT文檔
// @description:ja     ユニバーサルサイトコンテンツクロールツール、クロール、フォーラム内容など
// @author       hoothin
// @match        http://*/*
// @match        https://*/*
// @match        ftp://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @license      MIT License
// @compatible        chrome
// @compatible        firefox
// @compatible        opera 未测试
// @compatible        safari 未测试
// @contributionURL https://buymeacoffee.com/hoothin
// @contributionAmount 1
// ==/UserScript==
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  /*
  * FileSaver.js
  * A saveAs() FileSaver implementation.
  *
  * By Eli Grey, http://eligrey.com
  *
  * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
  * source  : http://purl.eligrey.com/github/FileSaver.js
  */
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
      autoBom: false
    };else if (typeof opts !== 'object') {
      console.warn('Deprecated: Expected third argument to be a object');
      opts = {
        autoBom: !opts
      };
    }

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  }

  function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      saveAs(xhr.response, name, opts);
    };

    xhr.onerror = function () {
      console.error('could not download file');
    };

    xhr.send();
  }

  function corsEnabled(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('HEAD', url, false);

    try {
      xhr.send();
    } catch (e) {}

    return xhr.status >= 200 && xhr.status <= 299;
  }


  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }


  var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
  var saveAs = _global.saveAs || (
  typeof window !== 'object' || window !== _global ? function saveAs() {}

  : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener';

    if (typeof blob === 'string') {
      a.href = blob;

      if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4E4);

      setTimeout(function () {
        click(a);
      }, 0);
    }
  }
  : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
    name = name || blob.name || 'download';

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_blank';
        setTimeout(function () {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  : function saveAs(blob, name, opts, popup) {
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
      var reader = new FileReader();

      reader.onloadend = function () {
        var url = reader.result;
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        if (popup) popup.location.href = url;else location = url;
        popup = null;
      };

      reader.readAsDataURL(blob);
    } else {
      var URL = _global.URL || _global.webkitURL;
      var url = URL.createObjectURL(blob);
      if (popup) popup.location = url;else location.href = url;
      popup = null;

      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4E4);
    }
  });
  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});

(function() {
    'use strict';
    var indexReg=/PART\b|^Prologue|Chapter\s*[\-_]?\d+|分卷|^序$|^序\s*言|^序\s*章|^前\s*言|^附\s*[录錄]|^引\s*[言子]|^摘\s*要|^[楔契]\s*子|^后\s*记|^後\s*記|^附\s*言|^结\s*语|^結\s*語|^尾\s*[声聲]|^最終話|^最终话|^番\s*外|^\d+\s*\D*[^\d#\.]$|^[第（]?[\d〇零一二三四五六七八九十百千万萬-]+\s*[、）章节節回卷折篇幕集话話]/i;
    var innerNextPage=/下一[页頁张張]|next\s*page|次のページ/i;
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    var rCats=[];
    var processFunc;
    switch (lang){
        case "zh-CN":
        case "zh-SG":
            i18n={
                fetch:"开始下载小说【Ctrl+F9】",
                info:"本文是使用怠惰小说下载器（DownloadAllContent）下载的",
                error:"该段内容获取失败",
                downloading:"已下载完成 %s 段，剩余 %s 段<br>正在下载 %s",
                complete:"已全部下载完成，共 %s 段",
                del:"设置文本干扰码的CSS选择器",
                custom:"自定义下载",
                customInfo:"输入网址或者章节CSS选择器",
                reSort:"按标题名重新排序",
                reSortUrl:"按网址重新排序",
                setting:"选项设置",
                abort:"跳过此章",
                save:"临时保存",
                downThreadNum:"设置同时下载的线程数"
            };
            break;
        case "zh-TW":
        case "zh-HK":
            i18n={
                fetch:"開始下載小說【Ctrl+F9】",
                info:"本文是使用怠惰小說下載器（DownloadAllContent）下載的",
                error:"該段內容獲取失敗",
                downloading:"已下載完成 %s 段，剩餘 %s 段<br>正在下載 %s",
                complete:"已全部下載完成，共 %s 段",
                del:"設置文本干擾碼的CSS選擇器",
                custom:"自定義下載",
                customInfo:"輸入網址或者章節CSS選擇器",
                reSort:"按標題名重新排序",
                reSortUrl:"按網址重新排序",
                setting:"選項設置",
                abort:"跳過此章",
                save:"保存當前",
                downThreadNum:"設置同時下載的綫程數"
            };
            break;
        default:
            i18n={
                fetch:"Download [Ctrl+F9]",
                info:"The TXT is downloaded by 'DownloadAllContent'",
                error:"Failed in downloading current chapter",
                downloading:"%s pages are downloaded, there are still %s pages left<br>Downloading %s ......",
                complete:"Completed! Get %s pages in total",
                del:"Set css selectors for ignore",
                custom:"Custom to download",
                customInfo:"Input urls OR sss selectors for chapter links",
                reSort:"ReSort by title",
                reSortUrl:"Resort by URLs",
                setting:"Open Setting",
                abort:"Abort",
                save:"Save",
                downThreadNum:"Set threadNum for download"
            };
            break;
    }
    var firefox=navigator.userAgent.toLowerCase().indexOf('firefox')!=-1,curRequests=[];
    var rocketContent,txtDownContent,txtDownWords,txtDownQuit,txtDownDivInited=false;

    function initTxtDownDiv(){
        if(txtDownDivInited)return;
        txtDownDivInited=true;
        rocketContent=document.createElement("div");
        document.body.appendChild(rocketContent);
        rocketContent.outerHTML=`
        <div id="txtDownContent">
            <div style="font-size:16px;color:#333333;width:360px;height:110px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                <div id="txtDownWords" style="position:absolute;width:275px;height: 90px;max-height: 90%;border: 1px solid #f3f1f1;padding: 8px;border-radius: 10px;overflow: auto;">
                    Downloading......
                </div>
                <div id="txtDownQuit" style="width: 30px;height: 30px;border-radius: 30px;position:absolute;right:2px;top:2px;cursor: pointer;background-color:#ff5a5a;">
                    <span style="height: 30px;line-height: 30px;display:block;color:#FFF;text-align:center;font-size: 12px;font-weight: bold;">╳</span>
                </div>
                <div style="position:absolute;right:0px;bottom:2px;cursor: pointer;max-width:85px">
                    <button id="abortRequest" style="background: #008aff;border: 0;padding: 5px;border-radius: 6px;color: white;float: right;margin: 1px;height: 25px;display:none;line-height: 16px;">${getI18n('abort')}</button>
                    <button id="tempSaveTxt" style="background: #008aff;border: 0;padding: 5px;border-radius: 6px;color: white;float: right;margin: 1px;height: 25px;line-height: 16px;">${getI18n('save')}</button>
                </div>
            </div>
        </div>`;
        txtDownContent=document.querySelector("#txtDownContent");
        txtDownWords=document.querySelector("#txtDownWords");
        txtDownQuit=document.querySelector("#txtDownQuit");
        txtDownQuit.onclick=function(){
            txtDownContent.style.display="none";
            txtDownContent.parentNode.removeChild(txtDownContent);
        };
        initTempSave();
    }

    function initTempSave(){
        var tempSavebtn = document.getElementById('tempSaveTxt');
        var abortbtn = document.getElementById('abortRequest');
        tempSavebtn.onclick = function(){
            var blob = new Blob([i18n.info+"\r\n\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
            console.log(curRequests);
        }
        abortbtn.onclick = function(){
            let curRequest = curRequests.pop();
            if(curRequest)curRequest[1].abort();
        }
    }

    function indexDownload(aEles){
        if(aEles.length<1)return;
        initTxtDownDiv();
        if(GM_getValue("contentSort")){
            aEles.sort(function(a,b){
                return parseInt(a.innerText.replace(/[^0-9]/ig,"")) - parseInt(b.innerText.replace(/[^0-9]/ig,""));
            });
        }
        if(GM_getValue("contentSortUrl")){
            aEles.sort(function(a,b){
                return parseInt(a.href.replace(/[^0-9]/ig,"")) - parseInt(b.href.replace(/[^0-9]/ig,""));
            });
        }
        rCats=[];
        var insertSigns=[];
        // var j=0,rCats=[];
        var downIndex=0,downNum=0,downOnce=function(){
            if(downNum>=aEles.length)return;
            let curIndex=downIndex;
            let aTag=aEles[curIndex];
            let request=(aTag, curIndex)=>{
                let tryTimes=0;
                let requestBody={
                    method: 'GET',
                    url: aTag.href,
                    headers:{
                        referer:aTag.href,
                        "Content-Type":"text/html;charset="+document.charset,
                    },
                    timeout:15000,
                    overrideMimeType:"text/html;charset="+document.charset,
                    onload: function(result) {
                        downIndex++;
                        downNum++;
                        var doc = getDocEle(result.responseText);
                        let nextPage=checkNextPage(doc);
                        if(nextPage){
                            var inArr=false;
                            for(var ai=0;ai<aEles.length;ai++){
                                if(aEles[ai].href==nextPage.href){
                                    inArr=true;
                                    break;
                                }
                            }
                            if(!inArr){
                                nextPage.innerText=aTag.innerText+"\t>>";
                                aEles.push(nextPage);
                                let targetIndex = curIndex;
                                for(let a=0;a<insertSigns.length;a++){
                                    let signs=insertSigns[a],breakSign=false;
                                    if(signs){
                                        for(let b=0;b<signs.length;b++){
                                            let sign=signs[b];
                                            if(sign==curIndex){
                                                targetIndex=a;
                                                breakSign=true;
                                                break;
                                            }
                                        }
                                    }
                                    if(breakSign)break;
                                }
                                let insertSign = insertSigns[targetIndex];
                                if(!insertSign)insertSigns[targetIndex] = [];
                                insertSigns[targetIndex].push(aEles.length-1);
                            }
                        }
                        processDoc(curIndex, aTag, doc);
                        let request=downOnce();
                        if(request)curRequests.push(request);
                    },
                    onerror: function(e) {
                        console.warn("error:");
                        console.log(e);
                        downIndex++;
                        downNum++;
                        processDoc(curIndex, aTag, null, ' : NETWORK ERROR '+(e.response||e.responseText));
                        let request=downOnce();
                        if(request)curRequests.push(request);
                    },
                    ontimeout: function(e) {
                        console.warn("timeout: times="+tryTimes+" url="+aTag.href);
                        //console.log(e);
                        if(++tryTimes<3){
                            return GM_xmlhttpRequest(requestBody);
                        }
                        downIndex++;
                        downNum++;
                        processDoc(curIndex, aTag, null, ' : TIMEOUT '+aTag.href);
                        let request=downOnce();
                        if(request)curRequests.push(request);
                    }
                };
                return [curIndex,GM_xmlhttpRequest(requestBody),aTag.href];
            }
            if(!aTag){
                let waitAtagReadyInterval=setInterval(function(){
                    if(downNum>=aEles.length)clearInterval(waitAtagReadyInterval);
                    aTag=aEles[curIndex];
                    if(aTag){
                        clearInterval(waitAtagReadyInterval);
                        request(aTag, curIndex);
                    }
                },1000);
                return null;
            }
            return request(aTag, curIndex);
        };
        function getDocEle(str){
            var doc = null;
            try {
                doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = str;
            }
            catch (e) {
                console.log('parse error');
            }
            return doc;
        }
        function sortInnerPage(){
            var pageArrs=[],maxIndex=0,i,j;
            for(i=0;i<insertSigns.length;i++){
                var signs=insertSigns[i];
                if(signs){
                    for(j=0;j<signs.length;j++){
                        var sign=signs[j];
                        var cat=rCats[sign];
                        rCats[sign]=null;
                        if(!pageArrs[i])pageArrs[i]=[];
                        pageArrs[i].push(cat);
                    }
                }
            }
            for(i=pageArrs.length-1;i>=0;i--){
                let pageArr=pageArrs[i];
                if(pageArr){
                    for(j=pageArr.length-1;j>=0;j--){
                        rCats.splice(i+1, 0, pageArr[j]);
                    }
                }
            }
            rCats = rCats.filter(function(e){return e!=null});
        }
        function processDoc(i, aTag, doc, cause){
            let contentResult=getPageContent(doc, content=>{
                cbFunc(content);
            });
            let cbFunc=content=>{
                rCats[i]=(aTag.innerText.trim() + "\r\n" + content + (cause || ''));
                curRequests = curRequests.filter(function(e){return e[0]!=i});
                txtDownContent.style.display="block";
                txtDownWords.innerHTML=getI18n("downloading",[downNum,(aEles.length-downNum),aTag.innerText]);
                if(downNum==aEles.length){
                    txtDownWords.innerHTML=getI18n("complete",[downNum]);
                    sortInnerPage();
                    var blob = new Blob([i18n.info+"\r\n\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
                    saveAs(blob, document.title+".txt");
                }
            };
            if(contentResult!==false){
                cbFunc(contentResult);
            }
        }
        var downThreadNum = parseInt(GM_getValue("downThreadNum"));
        downThreadNum=downThreadNum>0?downThreadNum:20;
        for(var i=0;i<downThreadNum;i++){
            let request=downOnce();
            if(request)curRequests.push(request);
            if(downIndex>=aEles.length-1 || downIndex>=downThreadNum-1)break;
            else downIndex++;
        }

        /*for(let i=0;i<aEles.length;i++){
            let aTag=aEles[i];
            GM_xmlhttpRequest({
                method: 'GET',
                url: aTag.href,
                overrideMimeType:"text/html;charset="+document.charset,
                onload: function(result) {
                    var doc = getDocEle(result.responseText);
                    processDoc(i, aTag, doc);
                }
            });
        }*/
    }

    function checkNextPage(doc){
        let aTags=doc.querySelectorAll("a"),nextPage=null;
        for(var i=0;i<aTags.length;i++){
            let aTag=aTags[i];
            if(innerNextPage.test(aTag.innerText) && aTag.href.indexOf("javascript")==-1){
                nextPage=aTag;
                break;
            }
        }
        return nextPage;
    }

    function getPageContent(doc, cb){
        if(!doc)return i18n.error;
        if(processFunc){
            return processFunc(doc, cb);
        }
        if(doc.defaultView){
            [].forEach.call(doc.querySelectorAll("span,div,ul"),function(item){
                var thisStyle=doc.defaultView.getComputedStyle(item);
                if(thisStyle && (thisStyle.display=="none" || (item.tagName=="SPAN" && thisStyle.fontSize=="0px")))
                    item.innerHTML="";
            });
        }
        var i,j,k,rStr="",pageData=(doc.body?doc.body:doc).cloneNode(true),delList=[];
        pageData.innerHTML=pageData.innerHTML.replace(/\<\!\-\-((.|[\n|\r|\r\n])*?)\-\-\>/g,"");
        [].forEach.call(pageData.querySelectorAll("font.jammer"),function(item){
            item.innerHTML="";
        });
        var selectors=GM_getValue("selectors");
        if(selectors){
            [].forEach.call(pageData.querySelectorAll(selectors),function(item){
                item.innerHTML="";
            });
        }
        [].forEach.call(pageData.querySelectorAll("script,style,link,img,noscript,iframe"),function(item){delList.push(item);});
        [].forEach.call(delList,function(item){item.innerHTML="";});
        var largestContent,contents=pageData.querySelectorAll("span,div,article,p,td"),largestNum=0;
        for(i=0;i<contents.length;i++){
            let content=contents[i],hasText=false,allSingle=true,item,curNum=0;
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==3){
                    if(/^\s*$/.test(item.data))
                        item.innerHTML="";
                    else hasText=true;
                }else if(/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.tagName))hasText=true;
            }
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==1 && !/^(I|A|STRONG|B|FONT|BR)$/.test(item.tagName) && /^[\s\-\_\?\>\|]*$/.test(item.innerHTML))
                    item.innerHTML="";
            }
            if(content.childNodes.length>1){
                for(j=0;j<content.childNodes.length;j++){
                    item=content.childNodes[j];
                    if(item.nodeType==1){
                         for(k=0;k<item.childNodes.length;k++){
                             var childNode=item.childNodes[k];
                             if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT|BR)$/.test(childNode.tagName)){
                                 allSingle=false;
                                 break;
                             }
                         }
                        if(!allSingle)break;
                    }
                }
            }else{
                allSingle=false;
            }
            if(allSingle){
                curNum=(firefox?content.textContent.length:content.innerText.length);
            }else {
                if(!hasText)continue;
                if(pageData==document && content.offsetWidth<=0 && content.offsetHeight<=0)
                    continue;
                [].forEach.call(content.childNodes,function(item){
                    if(item.nodeType==3)curNum+=item.data.length;
                    else if(/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.tagName))curNum+=(firefox?item.textContent.length:item.innerText.length);
                });
            }
            if(curNum>largestNum){
                largestNum=curNum;
                largestContent=content;
            }
        }
        if(!largestContent)return i18n.error+" : NO TEXT CONTENT";
        var childlist=pageData.querySelectorAll(largestContent.tagName);//+(largestContent.className?"."+largestContent.className.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, '.'):""));
        function getRightStr(ele, noTextEnable){
            let childNodes=ele.childNodes,cStr="\r\n",hasText=false;
            for(let j=0;j<childNodes.length;j++){
                let childNode=childNodes[j];
                if(childNode.nodeType==3 && childNode.data && !/^[\s\-\_\?\>\|]*$/.test(childNode.data))hasText=true;
                if(childNode.innerHTML){
                    childNode.innerHTML=childNode.innerHTML.replace(/\<\s*br\s*\>/gi,"\r\n").replace(/\n+/gi,"\n").replace(/\r+/gi,"\r");
                }
                if(childNode.textContent){
                    cStr+=childNode.textContent.replace(/ +/g,"  ").replace(/([^\r]|^)\n([^\r]|$)/gi,"$1\r\n$2");
                }
                if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT)$/.test(childNode.tagName))cStr+="\r\n";
            }
            if(hasText || noTextEnable || ele==largestContent)rStr+=cStr+"\r\n";
        }
        for(i=0;i<childlist.length;i++){
            var child=childlist[i];
            if(getDepth(child)==getDepth(largestContent)){
                if((!largestContent.className && child.className) || (largestContent.className && !child.className) || (largestContent.className && child.className && largestContent.className != child.className))continue;
                if((largestContent.className && largestContent.className==child.className)||largestContent.parentNode ==child.parentNode){
                    getRightStr(child, true);
                }else {
                    getRightStr(child, false);
                }
            }
        }
        return rStr.replace(/[\n\r]+/g,"\n\r");
    }

    function getI18n(key, args){
        var resultStr=i18n[key];
        if(args && args.length>0){
            args.forEach(function(item){
                resultStr=resultStr.replace(/%s/,item);
            });
        }
        return resultStr;
    }

    function getDepth(dom){
        var pa=dom,i=0;
        while(pa.parentNode){
            pa=pa.parentNode;
            i++;
        }
        return i;
    }

    function fetch(forceSingle){
        forceSingle=forceSingle===true;
        processFunc=null;
        var aEles=document.querySelectorAll("a:not(#search-jumper a)"),list=[];
        for(var i=0;i<aEles.length;i++){
            var aEle=aEles[i],has=false;
            if((!aEle.href || aEle.href.indexOf("javascript")!=-1) && aEle.dataset.href){
                aEle.href=aEle.dataset.href;
            }
            for(var j=0;j<list.length;j++){
                if(list[j].href==aEle.href){
                    aEle=list[j];
                    list.splice(j,1);
                    list.push(aEle);
                    has=true;
                    break;
                }
            }
            if(!has && aEle.href && /^http/i.test(aEle.href) && ((aEle.innerText.trim()!="" && indexReg.test(aEle.innerText.trim())) || /chapter[\-_]?\d/.test(aEle.href))){
                list.push(aEle);
            }
        }
        if(list.length>2 && !forceSingle){
            indexDownload(list);
        }else{
            var blob = new Blob([i18n.info+"\r\n\r\n"+document.title+"\r\n\r\n"+getPageContent(document)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
        }
    }

    document.addEventListener("keydown", function(e) {
        if(e.keyCode == 120 && e.ctrlKey) {
            fetch(e.shiftKey);
        }
    });
    function setDel(){
        var selValue=GM_getValue("selectors");
        var selectors=prompt(i18n.del,selValue?selValue:"");
        GM_setValue("selectors",selectors);
        selValue=GM_getValue("downThreadNum");
        var downThreadNum=prompt(i18n.downThreadNum,selValue?selValue:"20");
        GM_setValue("downThreadNum",downThreadNum);
        var sortByUrl=window.confirm(i18n.reSortUrl);
        GM_setValue("contentSortUrl",sortByUrl);
        if(!sortByUrl)GM_setValue("contentSort",window.confirm(i18n.reSort));
    }
    function customDown(){
        processFunc=null;
        var customRules=GM_getValue("DACrules_"+document.domain);
        var urls=window.prompt(i18n.customInfo,customRules?customRules:"https://xxx.xxx/book-[20-99].html, https://xxx.xxx/book-[01-10].html");
        if(urls){
            urls=decodeURIComponent(urls.replace(/%/g,'%25'));
            GM_setValue("DACrules_"+document.domain, urls);
            var processEles=[];
            let urlsArr=urls.split("@@"),eles=[];
            if(/^http|^ftp/.test(urlsArr[0])){
                [].forEach.call(urlsArr[0].split(","),function(i){
                    var curEle;
                    var varNum=/\[\d+\-\d+\]/.exec(i);
                    if(varNum){
                        varNum=varNum[0].trim();
                    }else{
                        curEle=document.createElement("a");
                        curEle.href=i;
                        processEles.push(curEle);
                        return;
                    }
                    var num1=/\[(\d+)/.exec(varNum)[1].trim();
                    var num2=/(\d+)\]/.exec(varNum)[1].trim();
                    var num1Int=parseInt(num1);
                    var num2Int=parseInt(num2);
                    var numLen=num1.length;
                    var needAdd=num1.charAt(0)=="0";
                    if(num1Int>=num2Int)return;
                    for(var j=num1Int;j<=num2Int;j++){
                        var urlIndex=j.toString();
                        if(needAdd){
                            while(urlIndex.length<numLen)urlIndex="0"+urlIndex;
                        }
                        var curUrl=i.replace(/\[\d+\-\d+\]/,urlIndex).trim();
                        curEle=document.createElement("a");
                        curEle.href=curUrl;
                        curEle.innerText=processEles.length.toString();
                        processEles.push(curEle);
                    }
                });
            }else{
                let urlSel=urlsArr[0].split(">>");
                try{
                    eles=document.querySelectorAll(urlSel[0]);
                }catch(e){}
                if(eles.length==0){
                    eles=[];
                    var eleTxts=urlsArr[0].split(/(?<=[^\\])[,，]/),exmpEles=[],excludeTxts={};
                    [].forEach.call(document.querySelectorAll("a"),function(item){
                        eleTxts.forEach(txt=>{
                            var txtArr=txt.split("!");
                            if(item.innerText.indexOf(txtArr[0])!=-1){
                                exmpEles.push(item);
                                excludeTxts[item]=txtArr.splice(1);
                            }
                        });
                    })
                    exmpEles.forEach(e=>{
                        var cssSelStr="a",pa=e.parentNode,excludeTxt=excludeTxts[e];
                        if(e.className)cssSelStr+="."+CSS.escape(e.className);
                        while(pa && pa.nodeName!="BODY"){
                            cssSelStr=pa.nodeName+">"+cssSelStr;
                            pa=pa.parentNode;
                        }
                        [].forEach.call(document.querySelectorAll(cssSelStr),function(item){
                            var isExclude=false;
                            for(var t in excludeTxt){
                                if(item.innerText.indexOf(excludeTxt[t])!=-1){
                                    isExclude=true;
                                    break;
                                }
                            }
                            if(!isExclude && eles.indexOf(item)==-1){
                                eles.push(item);
                            }
                        });
                    });
                }
                [].forEach.call(eles,function(item){
                    if(urlSel[1]){
                        item=Function("item",urlSel[1])(item);
                        if(!item || !item.href)return;
                        if(!item.tagName || item.tagName!="A"){
                            let href=item.href;
                            let innerText=item.innerText;
                            item=document.createElement("a");
                            item.href=href;
                            item.innerText=innerText;
                        }
                    }
                    let has=false;
                    for(var j=0;j<processEles.length;j++){
                        if(processEles[j].href==item.href){
                            processEles.splice(j,1);
                            processEles.push(item);
                            has=true;
                            break;
                        }
                    }
                    if((!item.href || item.href.indexOf("javascript")!=-1) && item.dataset.href){
                        item.href=item.dataset.href;
                    }
                    if(!has && item.href && /^http/i.test(item.href)){
                        processEles.push(item.cloneNode(1));
                    }
                });
            }
            if(urlsArr[1]){
                processEles.forEach(ele=>{
                    ele.href=ele.href.replace(new RegExp(urlsArr[1]), urlsArr[2]);
                });
            }
            if(urlsArr[3]){
                processFunc=(data, cb)=>{
                    if(urlsArr[3].indexOf("return ")==-1){
                        return eval(urlsArr[3])
                    }else{
                        return Function("data","cb",urlsArr[3])(data, cb);
                    }
                };
            }else{
                var win=(typeof unsafeWindow=='undefined'? window : unsafeWindow);
                if(win.dacProcess){
                    processFunc=win.dacProcess;
                }
            }
            indexDownload(processEles);
        }
    }
    GM_registerMenuCommand(i18n.fetch, fetch);
    GM_registerMenuCommand(i18n.custom, customDown);
    GM_registerMenuCommand(i18n.setting, setDel);
})();
