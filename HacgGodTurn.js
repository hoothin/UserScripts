// ==UserScript==
// @name        琉神转 | HacgGodTurn
// @namespace   hoothin
// @description 琉璃神社与其他绅士站神秘代码转换成下载链接
// @author      hoothin
// @include     http*://www.hacg.*/wordpress/*
// @include     http*://hacg.*/wordpress/*
// @include     http*://www.hacg.*/wp/*
// @include     http*://hacg.*/wp/*
// @include     http*://blog.reimu.net/*
// @include     http*://pan.baidu.com/share/*
// @include     http*://pan.baidu.com/s/*
// @include     http*://sexacg.com/*
// @include     http*://www.acg.tf/*
// @include     http*://acg.tf/*
// @include     http*://www.moxacg.com/*
// @include     http*://*.acggj.com/*
// @include     http*://acg12.com/*
// @include     http*://*.acg12.com/*
// @include     http*://www.acgnz.cc/*
// @include     http*://nacg.me/*
// @include     http*://www.tianshit.com/*
// @include     http*://www.oomoe.moe/*
// @include     http*://www.kaze5.com/*
// @include     http*://www.acglover.top/*
// @include     http*://lifan.moe/*
// @include     http*://www.idanmu.co/*
// @include     http*://www.sijihuisuo.club/*
// @version     3.19.67
// @grant       GM_notification
// @run-at      document-end
// @require     https://greasyfork.org/scripts/23522-olddriver-js/code/oldDriverjs.js?version=151669
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64-min.js
// @license     MIT License
// ==/UserScript==
(function(){
    var config={
        sites:[
            {
                url:"https://www.hacg.fi/wp/",
                regex:/hacg\./
            },
            {
                url:"https://blog.reimu.net/",
                regex:/blog\.reimu\./
            },
            {
                url:"https://sexacg.com/",
                regex:/sexacg\./
            },
            {
                url:"https://www.acg.tf/",
                regex:/acg\.tf/
            },
            {
                url:"http://www.acglover.top/",
                regex:/acglover\.top/
            },
            {
                url:"https://www.tianshit.com/",
                regex:/tianshit\./
            },
            {
                url:"https://www.acggj.com/",
                regex:/www\.acggj\./,
                hideOd:true,
                bbs:/bbs\.acggj\./
            },
            {
                url:"https://acg12.com/",
                regex:/acg12\./,
                hideOd:true,
                downloadUrl:/acg12\.com\/download/
            },
            {
                url:"http://www.acgnz.cc/",
                regex:/acgnz\.cc/,
                hideOd:true
            },
            {
                url:"http://www.moxacg.com/",
                regex:/moxacg\./,
                hideOd:true
            },
            {
                url:"http://www.kaze5.com/",
                regex:/kaze5\.com/,
                hideOd:true
            },
            {
                url:"http://lifan.moe/",
                regex:/lifan\.moe/
            },
            {
                url:"http://nacg.me/",
                regex:/nacg\.me/,
                hideOd:true
            },
            {
                url:"https://www.oomoe.moe/",
                regex:/oomoe\.moe/,
                hideOd:true
            },
            {
                url:"http://www.idanmu.co/",
                regex:/idanmu\.co/
            },
            {
                url:"https://www.sijihuisuo.club/",
                regex:/sijihuisuo\.club/,
                innerPage:/sijihuisuo\.club\/sj\/\d/
            }
        ],
        rocketReg:/magnet:\?xt|pan\.baidu\.com\/s|yunpan\.cn|howfile\.com\/file|mega\.|ed2k:\/\/\|file|bt\.cosxcos\.com\/view|du\.acgget\.com\/go\//,
        disableSites:/hacg.*about\.html/
    };
    var contentArea='.entry-content';
    var commArea="comment-content";
    var t;
    var curSite;
    var isHttps=location.protocol=="https:";
    if(isHttps){
        var refMeta = document.createElement('meta');
        refMeta.name = 'referrer';
        refMeta.content = 'always';
        document.getElementsByTagName('head')[0].appendChild(refMeta);
    }else{
        if(document.title=="Service Unavailable - Connection Error"){
            location.href=location.href.replace(/^http:/,"https:");
        }
    }
    for(var site of config.sites){
        if(site.regex.test(location.href)){
            curSite=site;
            break;
        }
    }

    document.onkeydown= function(e) {
        if (e.keyCode == 117) {
            var i=0;
            if(curSite)i=config.sites.indexOf(curSite);
            if(e.shiftKey) i=i===0?(config.sites.length-1):(i-1);
            else i=i==(config.sites.length-1)?0:(i+1);
            location.href = config.sites[i].url;
            return false;
        }
    };

    if(/\.baidu\./.test(location.href)){
        if(location.hash.slice(1)){
            document.querySelector("#accessCode").value=location.hash.slice(1);
            document.querySelector('#submitBtn').click();
        }
        return;
    }else if(config.disableSites.test(location.href)){
        return;
    }else if(config.sites[3].regex.test(location.href)){
        var content=document.querySelector('.entry-content');
        if(content){
            var plist = content.querySelectorAll("p");
            var key = "";
            for(var pNode of plist){
                if(/(?<=\u5bc6\u5319[:：])\S*/i.test(pNode.innerHTML)){
                    var orgStr = pNode.innerHTML.match(/(?<=\u5bc6\u5319[:：])(\S*)/i)[0];
                    key=CryptoJS.enc.Base64.parse(orgStr).toString(CryptoJS.enc.Utf8);
                    pNode.innerHTML = "";
                    break;
                }
            }
            if(key !==""){
                var blockquotes = content.querySelectorAll("blockquote");
                for(var blockquote of blockquotes){
                    var target = blockquote.querySelector("p");
                    if(!target||target.innerText===""||!/^[0-9a-z\+\/=\s]+$/i.test(target.innerText)){continue;}
                    var result = target.innerHTML.replace(/<br>/g,"").replace(/\s/g,"");
                    result = CryptoJS.AES.decrypt(result,key).toString(CryptoJS.enc.Utf8);
                    target.innerHTML = result;
                }

            }
        }
    }else if (config.sites[1].regex.test(location.href)){
        var OriginTitile = document.title;
        var titleTime;
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                document.title = '\u6765\u556a\u0038\u5566~(*´∇｀*) ' + OriginTitile;
                clearTimeout(titleTime);
            }
            else {
                document.title = '\u624d\u4e0d\u7ed9\u556a(╯‵□′)╯︵┻━┻ ' + OriginTitile;
                titleTime = setTimeout(function() {
                    document.title = OriginTitile;
                }, 2000);
            }
        });
        document.querySelector("#main").addEventListener('DOMNodeInserted', function(e) {
            var author = document.querySelector(".author-info");
            if (author && !document.querySelector("#blockBtn")) {
                createBlockBtn();
                process();
                var toggles = document.querySelectorAll("div.toggle-box");
                for(var toggle of toggles){
                    toggle.style="display:block";
                }
                clickBlockListener();
            }
        });
        createBlockBtn();
    }else if(config.sites[7].regex.test(location.href)){
        if(isHttps)
            addInsertHandler([["a","img","link","script"],[['p:(\/\/|\\\\\\/\\\\\\/)(www\.|static\.)?acg12','ps:$1$2acg12']]]);
        if(config.sites[7].downloadUrl.test(location.href)){
            t=window.setInterval(function(){
                if(document.querySelector('.btn-success')){
                    clearInterval(t);
                    process();
                }
            },1000);
        }
    }else if(config.sites[15].innerPage.test(location.href)){
        contentArea=".ds-comments";
        t=window.setInterval(function(){
            if(document.querySelector(".ds-comments")){
                clearInterval(t);
                process();
            }
        },500);
    }else if(config.sites[0].regex.test(location.href)){
        var has8=false;
        var comms=document.querySelectorAll("span.fn");
        for(var comm of comms){
            if(comm.innerHTML == "\u5c0f\u0038\u9171"){
                has8=true;
                comm.innerHTML=comm.innerHTML.replace(/\u5c0f\u0038\u9171/,'<a name=\"little8\">\u5c0f\u0038\u9171<\/a>');
                break;
            }
        }
        if(has8){
            var title=document.querySelector("h1.entry-title");
            if(title){
                title.innerHTML+=" <a href=\"#little8\" style=\"color:#f60000\">\u2605\u76f4\u8fbe\u5c0f\u0038\u9171\u2605<\/a>";
            }
        }
    }else if(config.sites[2].regex.test(location.href)){
        contentArea='article';
        commArea='su-quote-inner';
    }else if(config.sites[9].regex.test(location.href)){
        if(isHttps)
            addInsertHandler([["body","a","img","link","script"],[['p:(\/\/|\\\\\\/\\\\\\/)(www\.)?moxacg','ps:$1$2moxacg']]]);
    }else if(config.sites[11].regex.test(location.href)){
        if(isHttps)
            st2https(true,[["a","img","script","link"],[['p:(\/\/|\\\\\\/\\\\\\/)lifan\.moe','ps:$1lifan\.moe']]]);
    }else if(config.sites[6].regex.test(location.href)){
        if(isHttps)
            st2https(true,[["a","img","script","link"],[['p:(\/\/|\\\\\\/\\\\\\/)(www\.|bbs\.)?acggj','ps:$1$2acggj'],['"\/\/(img\.2dfan)','"http:\/\/$1']]]);
        var benzi=document.querySelector('#menu-item-3786');
        if(benzi){
            var scy=benzi.cloneNode(true);
            scy.innerHTML = scy.innerHTML.replace(/\u672c\u5b50/g, '\u4e09\u6b21\u5143').replace(/hexie\/book/g, 'sciyuan').replace(/fa-book/g, 'fa-instagram');
            benzi.after(scy);
        }
    }else if(config.sites[6].bbs.test(location.href)){
        if(isHttps){
            st2https(true,[["a","img","script","link"],[['p:(\/\/|\\\\\\/\\\\\\/)bbs\.acggj','ps:$1bbs\.acggj'],['"\/\/(img\.2dfan)','"http:\/\/$1']]]);
            var baseUrl=document.querySelector('base');
            baseUrl.href=baseUrl.href.replace(/http:/,"https:");
        }
        var tags=["a","img","script","link"];
        for(var tag of tags){
            var temps=document.querySelectorAll(tag);
            for(var temp of temps){
                if(temp.parentNode)
                    temp.outerHTML = temp.outerHTML;
            }
        }
    }else if(config.sites[8].regex.test(location.href)){
        if(isHttps)
            addInsertHandler([["a","img","link","script"],[['p:(\/\/|\\\\\\/\\\\\\/)(www\.)?acgnz','ps:$1$2acgnz'],['"\/\/(pic|tc)\.(ffsky|rpgsky)','"http:\/\/$1\.$2']]]);
    }else if(config.sites[12].regex.test(location.href)){
        contentArea='.content';
    }else if(config.sites[5].regex.test(location.href)){
        contentArea='.article-content';
    }else if(config.sites[4].regex.test(location.href)){
        st2https(true,[["a","img"],[['acglover\.net','acglover\.top']]]);
    }else if(config.sites[14].regex.test(location.href)){
        var resets = document.querySelectorAll('body>style');
        for(var reset of resets){
            if(/\.card-bg\simg|\.content-reset\simg/.test(reset.innerHTML)){
                reset.parentNode.removeChild(reset);
            }
        }
        var r10=document.querySelector('#menu-item-12744');
        if(r10){
            var r18=r10.cloneNode(true);
            r18.innerHTML = r18.innerHTML.replace(/\u8d44\u8baf/g, 'r18').replace(/category\/v01/g, 'category/v09/v13');
            r10.after(r18);
        }
    }

    function process(){
        var downloadBtn=document.querySelector("div#post-toolbar-download-count-container");
        if(downloadBtn){
            var t=function(){
                downloadBtn=document.querySelector("div#post-toolbar-download-count-container");
                if(downloadBtn.innerHTML=="<!-- react-empty: 1 -->"){
                    var downloadContent=document.createElement("a");
                    downloadContent.href=window.location.protocol+"//"+window.location.host+"/download?id="+window.location.pathname.split("/").pop();
                    downloadContent.innerHTML+='<div class="tx"><span><i class="fa fa-cloud-download"></i></span>\u4e0b\u8f7d</div>';
                    downloadBtn.appendChild(downloadContent);
                }else if(downloadBtn.innerHTML===""){
                    setTimeout(t,100);
                }
            };
            setTimeout(t,100);
        }
        var content=document.querySelector(contentArea);
        if(content){
            var oldDrivers = content.childNodes;
            for(var childOd of oldDrivers){
                if(childOd.innerHTML){
                    processTxt(childOd);
                }
            }
        }
        var link;
        if (document.querySelectorAll) {
            link = document.querySelectorAll('a');
        } else {
            link = document.getElementsByTagName('a');
        }
        for (var i = 0, k = link.length; i < k; i++) {
            if (/.*http:[^\.]*(\.)?hacg\./i.test(link[i].href)) {
                link[i].href = link[i].href.replace(/http/, 'https');
            }
            var target=link[i];
            if(/baidu.com/i.test(target.href)&&!/(?:eyun|tieba)\.baidu\.com/i.test(target.href)&&!/#/i.test(target.href)){
                if(/\/storage-download/.test(location.href)){
                    var pass=target.parentNode.parentNode.querySelector('input.pwd');
                    if(pass&&pass.id.indexOf("download-pwd")!=-1)target.href=target.href.split("#")[0]+'#'+pass.value;
                } else if(config.sites[7].downloadUrl.test(location.href)){
                    var pass2=target.parentNode.parentNode.parentNode.querySelector('input.form-control');
                    if(pass2)target.href+='#'+pass2.value;
                } else if(codeRule.test(target.textContent)){
                    target.href+='#'+extCode(target);
                } else if(target.nextSibling&&codeRule.test(target.nextSibling.textContent)){
                    if(!/#\S+/i.test(target.href)){
                        target.href+=/#/i.test(target.href)?extCode(target.nextSibling):('#'+extCode(target.nextSibling));
                    }
                } else if(codeRule.test(target.parentNode.textContent)){
                    if(!/#\S+/i.test(target.href)) target.href+=/#/i.test(target.href)?extCode(target.parentNode):('#'+extCode(target.parentNode));
                } else {
                    var j = 0,
                        maxParent = 5,
                        parent = target;
                    while(j<maxParent) {
                        j++;
                        parent = parent.parentNode;
                        if(parent.tagName=="TR") {
                            if(codeRule.test(parent.nextElementSibling.textContent)) {
                                parent=parent.nextElementSibling;
                                target.href+='#'+extCode(parent);
                                break;
                            }
                        } else if(codeRule.test(parent.textContent)) {
                            target.href+='#'+extCode(parent);
                            break;
                        }
                        if(parent==document.body) break;
                    }
                }
            }
        }
    }

    function createBlockBtn(){
        var pre = document.querySelector("pre");
        var author = document.querySelector(".author-info");
        if (author && !document.querySelector("#blockBtn")) {
            var blockBtn=document.createElement("button");
            blockBtn.id="blockBtn";
            blockBtn.type="button";
            blockBtn.textContent="\u597d\u5b69\u5b50\u770b\u4e0d\u5230";
            blockBtn.style="padding:4px 0;position: relative;width:120px;";
            if(pre){
                pre.before(blockBtn);
            }else{
                blockBtn.style="display:none;";
                author.appendChild(blockBtn);
            }
        }
    }

    function clickBlockListener(){
        if(document.querySelector("#blockBtn")){
            document.querySelector("#blockBtn").addEventListener("click", function(){
                if(this.nextSibling.style.display == 'block'){
                    this.nextSibling.style.display = '';
                }else{
                    this.nextSibling.style.display = 'block';
                }
            });
        }
    }

    //防爆补丁
    var feiZao=document.getElementsByTagName("p1");
    var fZLength=feiZao.length;
    if (!!fZLength){
        for (var i = 0; i < fZLength; i++){
            feiZao[0].parentNode.removeChild(feiZao[0]);
        }
    }

    process();
    clickBlockListener();

    if(!curSite.hideOd){
        document.getElementsByTagName("head")[0].appendChild(nod);
        var oD_box=document.createElement("div");
        oD_box.id="oD_box";
        oD_box.className = "oD_box";
        oD_box.onmouseover = function(e) {
            oD_link.style.visibility = "visible";
            oD_link2.style.visibility = "visible";
            rocketBtn.style.visibility = "visible";
        };
        oD_box.onmouseout = function(e) {
            oD_link.style.visibility = "hidden";
            oD_link2.style.visibility = "hidden";
            rocketBtn.style.visibility = "hidden";
        };
        var oD_text=document.createElement("input");
        oD_text.id="oD_text";
        oD_text.type="text";
        oD_text.style="width:168px;height:33px;position:absolute;margin-top: 0px;padding: 0px;";
        oD_text.placeholder="输入hash值";
        oD_text.title='将自动添加"magnet:?xt=urn:btih:"，去除[]中的内容、非字母数字字符、空格';
        var oD_button=document.createElement("button");
        oD_button.id="oD_button";
        oD_button.type="button";
        oD_button.textContent="开车";
        oD_button.style="padding:4px 0;position: absolute;top:-1px;right:0px;width:40px;height:35px";
        oD_button.onclick=function (){
            var oD_hash=oD_text.value.replace(/(\[.*\])|[\W_]/g,"");
            if(oD_hash===""){
                alert("请输入hash值");
                return;
            }else if(!regObj.btih.test(oD_hash)){
                alert("hash值格式错误");
                return;
            }
            oD_link.href="magnet:?xt=urn:btih:"+oD_hash;
            oD_link.textContent="磁链";
            oD_link2.href="http://www.torrent.org.cn/Home/torrent/download.html?hash="+oD_hash;
            oD_link2.textContent="种子";
            oD_link2.style="margin-left:20px";
            oD_link3.href="https://btso.pw/magnet/detail/hash/"+oD_hash;
            oD_link3.textContent="详情";
            oD_link3.style="margin-left:20px";
        };
        var oD_link=document.createElement("a");
        var oD_link2=document.createElement("a");
        var oD_link3=document.createElement("a");
        oD_link2.target="_blank";
        oD_link3.target="_blank";
        oD_box.appendChild(oD_text);
        oD_box.appendChild(oD_button);
        oD_box.appendChild(document.createElement('br'));
        oD_box.appendChild(oD_link);
        oD_box.appendChild(oD_link2);
        oD_box.appendChild(oD_link3);
        var rocketContent=document.createElement("div");
        document.body.appendChild(rocketContent);
        rocketContent.outerHTML=rocketStr;
        rocketContent=document.querySelector("#rocketContent");
        var rocketBtn=document.createElement("button");
        rocketBtn.id="rocketBtn";
        rocketBtn.type="button";
        rocketBtn.textContent="\u706b\u7bad";
        rocketBtn.style="padding:4px 0;position:absolute;top:-36px;right:0px;width:40px;height:35px;visibility:hidden";
        rocketBtn.onclick=function (){
            rocketContent.style.display="block";
            var links=document.querySelectorAll("a");
            var rocketLinks=document.querySelector("div#rocketLinks");
            rocketLinks.innerHTML="";
            var i=0;
            for(var link of links){
                if(config.rocketReg.test(link.href)&&link.className.indexOf("whx-a")==-1){
                    if(rocketLinks.innerHTML.indexOf(link.outerHTML)!=-1)continue;
                    rocketLinks.innerHTML+="<strong style='color:red'>"+(++i)+"</strong>:";
                    rocketLinks.appendChild(link.cloneNode(true));
                    rocketLinks.innerHTML+="&nbsp;";
                }
            }
            if(rocketLinks.innerHTML===""){
                rocketLinks.innerHTML="No links found!";
            }
        };
        var rocketQuit=document.querySelector("#rocketQuit");
        rocketQuit.onclick=function (){
            rocketContent.style.display="none";
        };
        oD_box.appendChild(rocketBtn);
        document.body.appendChild(oD_box);
    }
    //评论区度娘、115、tcn
    seriousReplace(commArea);

    var hasViewed=false;
    if(document.referrer){
        for(site of config.sites){
            if(site.regex.test(document.referrer)){
                hasViewed=true;
                break;
            }
        }
    }
    if(!hasViewed){
        var notificationDetails = {
            text: "\u0046\u0036\u4e0b\u4e00\u4e2a\u7ec5\u58eb\u7ad9\uff0c\u0073\u0068\u0069\u0066\u0074\u002b\u0046\u0036\u4e0a\u4e00\u4e2a\u7ec5\u58eb\u7ad9",
            title: "\u8001\u53f8\u673a\u53d1\u8f66\u4e86\u0021",
            timeout: 10000,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4Q5HaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJFNjc5RTZERjE4REVEOUI5RDExODU3N0Q2MTc1Mzk5NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3N2ZiNGRlMS0zYWZkLTBhNDgtOGQ1Zi03NGZiOTNlZTYzOGQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRTY3OUU2REYxOERFRDlCOUQxMTg1NzdENjE3NTM5OTYiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wOkNyZWF0ZURhdGU9IjIwMTYtMTAtMDhUMDk6MzI6MjgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE2LTEwLTA4VDA5OjM3OjUzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE2LTEwLTA4VDA5OjM3OjUzKzA4OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmNiNjcyY2QtNmVkNy0wYTRkLTk4ZmItMTAzOGM5MGY0NTRkIiBzdEV2dDp3aGVuPSIyMDE2LTEwLTA4VDA5OjM3OjUzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3N2ZiNGRlMS0zYWZkLTBhNDgtOGQ1Zi03NGZiOTNlZTYzOGQiIHN0RXZ0OndoZW49IjIwMTYtMTAtMDhUMDk6Mzc6NTMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0i5rKh5pe26Ze06Kej6YeK5LqGIOW/q+S4iui9pu+8ge+8gSIgcGhvdG9zaG9wOkxheWVyVGV4dD0i5rKh5pe26Ze06Kej6YeK5LqGIOW/q+S4iui9pu+8ge+8gSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/2wBDAEMuMjoyKkM6NjpLR0NPZKZsZFxcZMySmnmm8dT++u3U6eX//////////+Xp////////////////////////////2wBDAUdLS2RXZMRsbMT//+n/////////////////////////////////////////////////////////////////////wgARCAG3AbgDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMBAAIQAxAAAAHmAWBSAAAKJKqTUIogAAAAAAAAAACUSiKAAAUC2EpYlAAAABLAirZSS2MN5qAAEKlIsFlCCwAFBYLKIoSiKIC1Ca7+Ya1TC9DhpCPRDhfRwKxYq2pi4O3PrgjdOboOefTwM9cdzyvVwFdzgdjy6nY53vxMV6DztDOfX4y3ro4O44O44PTs8QN5vY87rDpx3yOjOTry7YO/l9XlOus5Orz7O7jRvj2PPrPoObI1z9HnOuN4PRx1k7+fejj1vnN9pxMenzdy56Q5R0K0OM68iW7jDpzMdOuK6edow0Nc+vIO3E9OcZOrz9i8OkO+N+Y9PDWTvwtJc6LoPP6PP6COA9Xl78DrjeDe8ZO8xo5dXE9HHrwJc6PV5/Rg4NdDk7jzO/E7tIcPR5zty6861jpiI2Jz3akxSd+Hc573yMJI9Pm9OKme3E0kkWLegPP6OGjq4bO/lyO2OnM6Nec9F56JeI9XPXnNdeFOvDvwLWjSjlN5OnXjmPT55D0cuvCuszIoJ01xrl6ueDry3qOd2Ncgl6DjexOPbGV68d9TOenEnebEuTz9uGa9PmU68ddiTNJnrmN8p2M56wzzuiqOa0N8y40OrhaUKiKyPTjeEyCywTQzNxcrBYKgusE7MbNAcumDjnWbQOvTjuKuEpFdeXRLESqXNtXMcSwqwCCwAID146c5MrCrABZRKMToObWQQvXl0OiBnWTzyy0Ds3JEsIsJ15dhNCGDWOeVsKAAEKgqAD2c+nKROezcvM259QABZzOszsxnrkx0xo6HM6Y56OULVmztCRFICdeezScz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",
            onclick: function() {
                window.open("http://hoothin.com");
            }
        };
        GM_notification(notificationDetails);
    }
})();