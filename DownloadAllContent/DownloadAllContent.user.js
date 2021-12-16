// ==UserScript==
// @name         DownloadAllContent
// @name:zh-CN   懒人小说下载器
// @name:zh-TW   懶人小説下載器
// @name:ja      怠惰者小説ダウンロードツール
// @namespace    hoothin
// @version      2.1
// @description  Fetch and download main content on current page, provide special support for chinese novel
// @description:zh-CN  通用网站内容抓取工具，可批量抓取小说、论坛内容等并保存为TXT文档
// @description:zh-TW  通用網站內容抓取工具，可批量抓取小說、論壇內容等並保存為TXT文檔
// @description:ja     ユニバーサルサイトコンテンツクロールツール、クロール、フォーラム内容など
// @author       hoothin
// @include      *
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.jsdelivr.net/npm/file-saver@1.3.8/FileSaver.min.js
// @license      MIT License
// @compatible        chrome
// @compatible        firefox
// @compatible        opera 未测试
// @compatible        safari 未测试
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    var downThreadNum = 20;//下載綫程數
    var indexReg=/PART\b|Prologue|-\d+|分卷|Chapter\s*[\-_]?\d+|^序$|序\s*言|序\s*章|前\s*言|引\s*言|引\s*子|摘\s*要|楔\s*子|契\s*子|后\s*记|後\s*記|附\s*言|结\s*语|結\s*語|最終話|最终话|番\s*外|[\d|〇|零|一|二|三|四|五|六|七|八|九|十|百|千|万|萬|-]+\s*(、|）|\.\D|章|节|節|回|卷|折|篇|幕|集|话|話)/i;
    var innerNextPage=/下一(页|张)|next page/i;
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    var rCats=[];
    switch (lang){
        case "zh-CN":
        case "zh-SG":
            i18n={
                fetch:"开始下载小说或其他【Ctrl+F9】",
                info:"本文是使用懒人小说下载器（DownloadAllContent）下载的",
                error:"该段内容获取失败",
                downloading:"已下载完成 %s 段，剩余 %s 段<br>正在下载 %s",
                complete:"已全部下载完成，共 %s 段",
                del:"设置文本干扰码的CSS选择器",
                custom:"自定义下载",
                customInfo:"输入网址或者章节CSS选择器",
                reSort:"按标题名重新排序",
                setting:"懒人小说下载设置",
                abort:"跳过此章",
                save:"临时保存"
            };
            break;
        case "zh-TW":
        case "zh-HK":
            i18n={
                fetch:"開始下載小說或其他【Ctrl+F9】",
                info:"本文是使用懶人小說下載器（DownloadAllContent）下載的",
                error:"該段內容獲取失敗",
                downloading:"已下載完成 %s 段，剩餘 %s 段<br>正在下載 %s",
                complete:"已全部下載完成，共 %s 段",
                del:"設置文本干擾碼的CSS選擇器",
                custom:"自定義下載",
                customInfo:"輸入網址或者章節CSS選擇器",
                reSort:"按標題名重新排序",
                setting:"懶人小說下載設置",
                abort:"跳過此章",
                save:"保存當前"
            };
            break;
        default:
            i18n={
                fetch:"Download All Content[Ctrl+F9]",
                info:"The TXT is downloaded by 'DownloadAllContent'",
                error:"Failed in downloading current chapter",
                downloading:"%s pages are downloaded, there are still %s pages left<br>Downloading %s ......",
                complete:"Completed! Get %s pages in total",
                del:"Set css selectors for ignore",
                custom:"Custom to download",
                customInfo:"Input urls OR sss selectors for chapter links",
                reSort:"ReSort by title",
                setting:"DownloadAllContent Setting",
                abort:"Abort",
                save:"Save"
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
        <div id="txtDownContent" style="display: none;">
            <div style="width:360px;height:90px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                <div id="txtDownWords" style="position:absolute;width:275px;max-height: 90%;border: 1px solid #f3f1f1;padding: 8px;border-radius: 10px;overflow: auto;">
                </div>
                <div id="txtDownQuit" style="width:36px;height:28px;border-radius:10px;position:absolute;right:2px;top:2px;cursor: pointer;background-color:#ff5a5a;">
                    <span style="height:28px;line-height:28px;display:block;color:#FFF;text-align:center;font-size:20px;">╳</span>
                </div>
                <div style="position:absolute;right:0px;bottom:2px;cursor: pointer;max-width:85px">
                    <button id="abortRequest" style="background: #008aff;border: 0;padding: 5px;border-radius: 10px;color: white;float: right;margin: 1px;height: 25px;display:none;">${getI18n('abort')}</button>
                    <button id="tempSaveTxt" style="background: #008aff;border: 0;padding: 5px;border-radius: 10px;color: white;float: right;margin: 1px;height: 25px;">${getI18n('save')}</button>
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
            var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
        }
        abortbtn.onclick = function(){
            let curRequest = curRequests.pop();
            if(curRequest)curRequest[1].abort();
        }
    }

    function indexDownload(aEles){
        if(aEles.length<1)return;
        initTxtDownDiv();
        rCats=[];
        var insertSigns=[];
        // var j=0,rCats=[];
        var downIndex=0,downNum=0,downOnce=function(){
            if(downNum>=aEles.length)return;
            let curIndex=downIndex;
            let aTag=aEles[curIndex];
            let request=(aTag, curIndex)=>{
                return [curIndex,GM_xmlhttpRequest({
                    method: 'GET',
                    url: aTag.href,
                    headers:{referer:aTag.href},
                    timeout:15000,
                    overrideMimeType:"text/html;charset="+document.charset,
                    onload: function(result) {
                        var doc = getDocEle(result.responseText);
                        let nextPage=checkNextPage(doc);
                        if(nextPage){
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
                        downIndex++;
                        downNum++;
                        processDoc(curIndex, aTag, doc);
                        let request=downOnce();
                        if(request)curRequests.push(request);
                    },
                    onerror: function(e) {
                        console.warn("error:");
                        console.log(e);
                        downIndex++;
                        downNum++;
                        processDoc(curIndex, aTag, null);
                        let request=downOnce();
                        if(request)curRequests.push(request);
                    },
                    ontimeout: function(e) {
                        console.warn("timeout:");
                        console.log(e);
                        downIndex++;
                        downNum++;
                        processDoc(curIndex, aTag, null);
                        let request=downOnce();
                        if(request)curRequests.push(request);
                    },
                })];
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
        function processDoc(i, aTag, doc){
            curRequests = curRequests.filter(function(e){return e[0]!=i});
            rCats[i]=(aTag.innerText+"\r\n"+getPageContent(doc));
            txtDownContent.style.display="block";
            txtDownWords.innerHTML=getI18n("downloading",[downNum,(aEles.length-downNum),aTag.innerText]);
            if(downNum==aEles.length){
                txtDownWords.innerHTML=getI18n("complete",[downNum]);
                sortInnerPage();
                var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
                saveAs(blob, document.title+".txt");
            }
        }
        for(var i=0;i<downThreadNum;i++){
            let request=downOnce();
            if(request)curRequests.push(request);
            if(downIndex>=aEles.length-1)break;
            if(downIndex<downThreadNum-1)downIndex++;
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
            if(innerNextPage.test(aTag.innerText) && /^http/i.test(aTag.href)){
                nextPage=aTag;
                break;
            }
        }
        return nextPage;
    }

    function getPageContent(doc){
        if(!doc)return i18n.error;
        if(doc.defaultView)
        [].forEach.call(doc.querySelectorAll("span,div"),function(item){
            var thisStyle=doc.defaultView.getComputedStyle(item);
            if(thisStyle && (thisStyle.display=="none"||thisStyle.fontSize=="0px"))
                item.parentNode.removeChild(item);
        });
        var i,j,k,rStr="",pageData=(doc.body?doc.body:doc).cloneNode(true),delList=[];
        [].forEach.call(pageData.querySelectorAll("font.jammer"),function(item){
            item.parentNode.removeChild(item);
        });
        var selectors=GM_getValue("selectors");
        if(selectors){
            [].forEach.call(pageData.querySelectorAll(selectors),function(item){
                item.parentNode.removeChild(item);
            });
        }
        [].forEach.call(pageData.querySelectorAll("script,style,link,img,noscript,iframe"),function(item){delList.push(item);});
        [].forEach.call(delList,function(item){item.parentNode.removeChild(item);});
        var largestContent,contents=pageData.querySelectorAll("span,div,article,p,td"),largestNum=0;
        for(i=0;i<contents.length;i++){
            let content=contents[i],hasText=false,allSingle=true,item,curNum=0;
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==3){
                    if(/^\s*$/.test(item.data))
                        item.parentNode.removeChild(item);
                    else hasText=true;
                }else if(/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.tagName))hasText=true;
            }
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==1 && !/^(I|A|STRONG|B|FONT|BR)$/.test(item.tagName) && /^\s*$/.test(item.innerHTML))
                    item.parentNode.removeChild(item);
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
        if(!largestContent)return i18n.error;
        var childlist=pageData.querySelectorAll(largestContent.tagName);//+(largestContent.className?"."+largestContent.className.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, '.'):""));
        function getRightStr(ele, noTextEnable){
            let childNodes=ele.childNodes,cStr="\r\n",hasText=false;
            for(let j=0;j<childNodes.length;j++){
                let childNode=childNodes[j];
                if(childNode.nodeType==3 && childNode.data && !/^\s*$/.test(childNode.data))hasText=true;
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
                if(!largestContent.className && child.className)continue;
                if((largestContent.className && largestContent.className==child.className)||largestContent.parentNode ==child.parentNode){
                    getRightStr(child, true);
                }else {
                    getRightStr(child, false);
                }
            }
        }
        return rStr;
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

    function fetch(){
        var aEles=document.querySelectorAll("a"),list=[];
        for(var i=0;i<aEles.length;i++){
            var aEle=aEles[i],has=false;
            for(var j=0;j<list.length;j++){
                if(list[j].href==aEle.href){
                    list.splice(j,1);
                    list.push(aEle);
                    has=true;
                    break;
                }
            }
            if(!has && aEle.href && /^http/i.test(aEle.href) && (indexReg.test(aEle.innerText) || /chapter[\-_]?\d/.test(aEle.href))){
                list.push(aEle);
            }
        }
        if(list.length>2){
            if(GM_getValue("contentSort")){
                list.sort(function(a,b){
                    return parseInt(a.innerText.replace(/[^0-9]/ig,"")) - parseInt(b.innerText.replace(/[^0-9]/ig,""));
                });
            }
            indexDownload(list);
        }else{
            var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+getPageContent(document)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
        }
    }

    document.addEventListener("keydown", function(e) {
        if(e.keyCode == 120 && e.ctrlKey) {
            fetch();
        }
    });
    function setDel(){
        var selValue=GM_getValue("selectors");
        var selectors=prompt(i18n.del,selValue?selValue:"");
        GM_setValue("selectors",selectors);
        if(window.confirm(i18n.reSort)){
            GM_setValue("contentSort", true);
        }else{
            GM_setValue("contentSort", false);
        }
    }
    function customDown(){
        var urls=window.prompt(i18n.customInfo,"https://xxx.xxx/book-[20-99].html, https://xxx.xxx/book-[01-10].html");
        if(urls){
            var processEles=[];
            if(/^http|^ftp/.test(urls)){
                [].forEach.call(urls.split(","),function(i){
                    var varNum=/\[\d+\-\d+\]/.exec(i)[0].trim();
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
                        var curEle=document.createElement("a");
                        curEle.href=curUrl;
                        processEles.push(curEle);
                        curEle.innerText=processEles.length.toString();
                    }
                });
            }else{
                let urlsArr=urls.split("@@");
                [].forEach.call(document.querySelectorAll(urlsArr[0]),function(item){
                    let has=false;
                    for(var j=0;j<processEles.length;j++){
                        if(processEles[j].href==item.href){
                            processEles.splice(j,1);
                            processEles.push(item);
                            has=true;
                            break;
                        }
                    }
                    if(!has && item.href && /^http/i.test(item.href)){
                        processEles.push(item.cloneNode());
                    }
                });
                if(urlsArr.length>1){
                    processEles.forEach(ele=>{
                        ele.href=ele.href.replace(new RegExp(urlsArr[1]), urlsArr[2]);
                    });
                }
            }
            if(GM_getValue("contentSort")){
                processEles.sort(function(a,b){
                    return parseInt(a.innerText.replace(/[^0-9]/ig,"")) - parseInt(b.innerText.replace(/[^0-9]/ig,""));
                });
            }
            indexDownload(processEles);
        }
    }
    GM_registerMenuCommand(i18n.fetch, fetch);
    GM_registerMenuCommand(i18n.custom, customDown);
    GM_registerMenuCommand(i18n.setting, setDel);
})();
