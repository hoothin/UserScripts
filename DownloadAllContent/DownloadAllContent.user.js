// ==UserScript==
// @name         DownloadAllContent
// @name:zh-CN   懒人小说下载器
// @name:zh-TW   懶人小説下載器
// @name:ja      怠惰者小説ダウンロードツール
// @namespace    hoothin
// @version      1.07
// @description  Fetch and download main content on current page,provide special support for chinese novel
// @description:zh-CN  通用网站内容抓取工具，可批量抓取小说、论坛内容等并保存为TXT文档
// @description:zh-TW  通用網站內容抓取工具，可批量抓取小說、論壇內容等並保存為TXT文檔
// @description:ja     ユニバーサルサイトコンテンツクロールツール、クロール、フォーラム内容など
// @author       hoothin
// @include      *
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js
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
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    switch (lang){
        case "zh-CN":
            i18n={
                fetch:"开始下载小说或其他【Ctrl+F9】",
                info:"本文是使用懒人小说下载器（DownloadAllContent）脚本下载的"
            };
            break;
        default:
            i18n={
                fetch:"Download All Content[Ctrl+F9]",
                info:"The TXT is downloaded by 'DownloadAllContent'"
            };
            break;
    }

    function indexDownload(aEles){
        var rocketContent=document.createElement("div");
        document.body.appendChild(rocketContent);
        rocketContent.outerHTML=`
        <div id="txtDownContent" style="display: none;">
            <div style="width:300px;height:70px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                <div id="txtDownWords" style="position:absolute;left:20px;top:10px;width:260px;">
                </div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA5FBMVEUAAAD+/v7////9/f7////////+/v7+/v7////+/v7+/v7////+/v7+/v7////+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7////////////+/v7+/v7+/v7+/v7+/v4uje3///82ke7s9P3N5PtQoPDI4fqCu/Tu9v5Im+/6/P+VxfZgqPFNnvDp8/3f7fq42Pmnz/d1tPNvsfNkq/JCmO/4+/7X6fz19/rn8PqYx/aNwfV8uPRqrvJZpfFUovAzkO3Q5vu92/mr0fieyva92fWx0vQ6lO5pygFTAAAAJHRSTlMAmfD+RMGwgj2mknlIKR/36+XGnIyHfnJfVDk2My8S4E1CJBvTatKDAAABY0lEQVQoz4WSZ1fCMBRA05ahLPfemkspBUFwgGz3+P//x/hK6ZBzvB/ak96+kZeoGCtFK5eziitqCSfWOnM2CuWUrOyQYPc0bjM2htHXh+/ffQ4lQ6zEPoZ6TwdUp10M56EtAe5MR7y0HGAeX7Ghe6MTzIZwFtTfBrepUzw4UFSGY8CUTTMGLo3eglv58By21pRnB7aNBqTwPfWq/OVey9sH22wZXiWo6Yr3GtRl/f0IRyoPYy14v97YWjVY12BPrcK9XvhaZPUdWCoLbR35yOoW5P7R8eQ3JrmbSp6HVmSrXuTrmNYyUAs2JkL6D6YjG1PgNGXK87F4nWAsUxmL2gyH6oVD7cuhdqFg9CE4T/oPE6CsgvBOP21715AP7ugaDFK+3YD1KyUcAG47bn0TSylxFd8WDTwMMByoBSUHw+jd9/3JbQODnVExygUS7FRUksPVtdDZW8dqCZm8lc1auxcq4gc02GVGTUchmgAAAABJRU5ErkJggg==" id="txtDownQuit" style="position:absolute;right:0px;top:0px;cursor: pointer;" />
            </div>
        </div>`;
        var txtDownContent=document.querySelector("#txtDownContent");
        var txtDownWords=document.querySelector("#txtDownWords");
        var txtDownQuit=document.querySelector("#txtDownQuit");
        txtDownQuit.onclick=function(){
            txtDownContent.style.display="none";
            txtDownContent.parentNode.removeChild(txtDownContent);
        };
        var j=0,rCats=[];
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
        function processDoc(i, aTag, doc){
            j++;
            rCats[i]=(aTag.textContent+"\r\n"+getPageContent(doc));
            txtDownContent.style.display="block";
            txtDownWords.innerHTML="已下载完成 "+j+" 段，剩余 "+(aEles.length-j)+" 段"+"<br>正在下载 "+aTag.textContent;
            if(j==aEles.length){
                txtDownWords.innerHTML="已全部下载完成，共 "+j+" 段";
                var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
                saveAs(blob, document.title+".txt");
            }
        }
        for(let i=0;i<aEles.length;i++){
            let aTag=aEles[i];
            GM_xmlhttpRequest({
                method: 'GET',
                url: aTag.href,
                overrideMimeType:"text/html;charset="+document.charset,
                onload: function(result) {
                    var doc = getDocEle(result.responseText);
                    if (!doc) {
                        return;
                    }
                    processDoc(i, aTag, doc);
                }
            });
        }
    }

    function getPageContent(doc){
        var i,j,k,rStr="",pageData=(doc.body?doc.body:doc).cloneNode(true),delList=[];
        [].forEach.call(pageData.querySelectorAll("script,style,link"),function(item){delList.push(item);});
        [].forEach.call(delList,function(item){item.parentNode.removeChild(item);});
        var largestContent,contents=pageData.querySelectorAll("span,div,article,p,td");
        for(i=0;i<contents.length;i++){
            let content=contents[i],hasText=false,allSingle=true,item;
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==3 && /^\s*$/.test(item.data))
                    item.parentNode.removeChild(item);
            }
            [].forEach.call(content.childNodes,function(item){
                if(item.nodeType==3 && item.data && !/^\s*$/.test(item.data))
                    hasText=true;
            });
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
                        delList=[];
                        [].forEach.call(item.childNodes,function(n){if((n.nodeType==3 && /^\s*$/.test(n.data)) || (n.nodeType==1 && /^\s*$/.test(n.textContent)))delList.push(n);});
                        [].forEach.call(delList,function(n){n.parentNode.removeChild(n);});
                    }
                }
            }else{
                allSingle=false;
            }
            if(!allSingle){
                if(!hasText)continue;
                if(content.firstChild && (
                    (content.firstChild.nodeType!=3 && !/^(I|A|STRONG|B|FONT|BR)$/.test(content.firstChild.tagName)) ||
                    (content.firstChild.nodeType==3 && /^\s*$/.test(content.firstChild.data) &&
                     (!content.childNodes[1] || !(content.childNodes[1].nodeType==3 || /^(I|A|STRONG|B|FONT|BR)$/.test(content.childNodes[1].tagName))))
                ))
                    continue;
                if(pageData==document && content.offsetWidth<=0 && content.offsetHeight<=0)
                    continue;
            }
            if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
                if(!largestContent || largestContent.textContent.length<content.textContent.length){
                    largestContent=content;
                }
            }else{
                if(!largestContent || largestContent.innerText.length<content.innerText.length){
                    largestContent=content;
                }
            }
        }
        if(!largestContent)return "该段内容获取失败";
        var childlist=pageData.querySelectorAll(largestContent.tagName+(largestContent.className?"."+largestContent.className.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, '.'):""));
        function getRightStr(ele, noTextEnable){
            let childNodes=ele.childNodes,cStr="\r\n",hasText=false;
            for(let j=0;j<childNodes.length;j++){
                let childNode=childNodes[j];
                if(childNode.nodeType==3 && childNode.data && !/^\s*$/.test(childNode.data))hasText=true;
                if(childNode.textContent){
                    cStr+=childNode.textContent.replace(/ +/g,"  ").replace(/([^\r]|^)\n([^\r]|$)/g,"$1\r\n$2");
                }
                if(childNode.nodeType!=3)cStr+="\r\n";
            }
            if(hasText || noTextEnable || ele==largestContent)rStr+=cStr+"\r\n";
        }
        for(i=0;i<childlist.length;i++){
            var child=childlist[i];
            if(getDepth(child)==getDepth(largestContent)){
                if(largestContent.className && largestContent.className==child.className){
                    getRightStr(child, true);
                }else {
                    getRightStr(child, false);
                }
            }
        }
        return rStr;
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
            var aEle=aEles[i];
            if(aEle.href && /第.+[章|节|回|卷|折|篇|幕|集]|序|序\s*言|序\s*章|前\s*言|引\s*言|引\s*子|摘\s*要|楔\s*子|后\s*记|附\s*言|结\s*语|[\d|〇|零|一|二|三|四|五|六|七|八|九|十|百|千|万|萬|-]+(、|）)/.test(aEle.innerHTML)){
                list.push(aEle);
            }
        }
        if(list.length>2){
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
    GM_registerMenuCommand(i18n.fetch, fetch);
})();