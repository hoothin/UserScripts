// ==UserScript==
// @name         Greasyfork Search with Sleazyfork Results include
// @name:zh-CN   大人的Greasyfork
// @name:zh-TW   大人的Greasyfork
// @name:ja      大人のGreasyfork
// @namespace    hoothin
// @version      1.6.6
// @description  Merge adult results of sleazyfork into greasyfork when the script is no longer anonymously available, add rating score and version for scripts then
// @description:zh-CN 在Greasyfork的搜索结果中添加Sleazyfork上的成人脚本，增加评分与版本号，并在访问匿名不可用脚本时跳转至Sleazyfork
// @description:zh-TW 在Greasyfork的搜索結果中添加Sleazyfork上的成人腳本，增加評分與版本號，並在訪問匿名不可用腳本時跳轉至Sleazyfork
// @description:ja    脚本付けるSleazyfork上の成人脚本検索結果からGreasyfork、脚本付ける採点とバージョン番号を訪問匿名利用できない脚本にジャンプからSleazyfork
// @author       hoothin
// @match        http*://greasyfork.org/*
// @match        http*://www.greasyfork.org/*
// @match        http*://sleazyfork.org/*
// @match        http*://www.sleazyfork.org/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @grant        GM.notification
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @contributionURL https://www.buymeacoffee.com/hoothin
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    var _GM_xmlhttpRequest,_GM_registerMenuCommand,_GM_notification;
    if(typeof GM_xmlhttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM_xmlhttpRequest;
    }else if(typeof GM!='undefined' && typeof GM.xmlHttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM.xmlHttpRequest;
    }
    if(typeof GM_registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM_registerMenuCommand;
    }else if(typeof GM!='undefined' && typeof GM.registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM.registerMenuCommand;
    }
    if(typeof GM_notification!='undefined'){
        _GM_notification=GM_notification;
    }else if(typeof GM!='undefined' && typeof GM.notification!='undefined'){
        _GM_notification=GM.notification;
    }

    if(typeof _GM_xmlhttpRequest=='undefined')_GM_xmlhttpRequest=(f)=>{};
    if(typeof _GM_registerMenuCommand=='undefined')_GM_registerMenuCommand=(s,f)=>{};
    if(typeof _GM_notification=='undefined')_GM_notification=(s)=>{};
    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',
        supportGMPromise: typeof GM!='undefined' && typeof GM.getValue=='function' && typeof GM.getValue('a','b')!='undefined',
        mxAppStorage:(function(){
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            };
        })(),
        operaUJSStorage:(function(){
            try{
                return window.opera.scriptStorage;
            }catch(e){
            };
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
            }else if(this.supportGMPromise){
                GM.setValue(key,value);
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            };
        },
        getItem:function(key,cb){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(this.supportGMPromise){
                value=GM.getValue(key).then(v=>{cb(v)});
                return;
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            cb(value);
        },
    };
    if(document.querySelector('span.sign-in-link')){
        var otherSite=/greasyfork\.org/.test(location.hostname)?"sleazyfork":"greasyfork";
        if(/scripts\/\d+/.test(location.href)){
            if(!document.querySelector("#script-info") && (otherSite == "greasyfork" || document.querySelector("div.width-constraint>section>p>a").href.indexOf("sign_in")!=-1)){
                location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org");
            }
        }else if(/\/(scripts|users)(\/|.*(\?|&)q=|.*[\?&]set=)/.test(location.href)){
            _GM_xmlhttpRequest({
                method: 'GET',
                url: location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org"),
                onload: function(result) {
                    var doc = null;
                    try {
                        doc = document.implementation.createHTMLDocument('');
                        doc.documentElement.innerHTML = result.responseText;
                    }
                    catch (e) {
                        console.log('parse error');
                    }
                    if (!doc) {
                        return;
                    }
                    var l = doc.querySelector('ol.script-list');
                    if (l) {
                        var ml = document.querySelector('ol.script-list');
                        if(!ml){
                            ml=document.createElement("ol");
                            ml.setAttribute("class","script-list");
                            var list=document.querySelector('.sidebarred-main-content');
                            var ps=list.querySelectorAll("p");
                            for(let i=0;i<ps.length;i++){
                                let p=ps[i];
                                list.removeChild(p);
                            }
                            list.appendChild(ml);
                        }
                        var scs=l.querySelectorAll("li");
                        if(scs){
                            for(let i=0;i<scs.length;i++){
                                let sc=scs[i];
                                if(!ml.querySelector("li[data-script-id='"+sc.dataset.scriptId+"']")){
                                    //addScore(sc);
                                    ml.appendChild(sc);
                                }
                            }
                        }
                    }
                },
                onerror: function(e) {
                    console.log(e);
                }
            });
        }
    }

    var bullshit,bullshit_o=`vip.*(视频|視頻)|网课|刷课|(mooc|考试|学习).*(答题|挂机)|(网盘|網盤|云盘).*(vip|直链)|优惠劵|優惠券|AntiGame|split|Agar|\\.io(\\b|:|\\/|\\.|$)|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Blah Blah|Orc Clan Script|Astro\\s*Empires|^\\s*Attack|^\\s*Battle|BiteFight|Blood\\s*Wars|Bots|Bots4|Brawler|\\bBvS\\b|Business\\s*Tycoon|Castle\\s*Age|City\\s*Ville|Comunio|Conquer\\s*Club|CosmoPulse|Dark\\s*Orbit|Dead\\s*Frontier|\\bDOA\\b|DotD|Dossergame|Dragons\\s*of\\s*Atlantis|Dugout|\\bDS[a-z]+\\n|Empire\\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\\s*Ville|Ghost\\s*Trapper|Gladiatus|Goalline|Gondal|Grepolis|Hobopolis|\\bhwm(\\b|_)|Ikariam|\\bIT2\\b|Jellyneo|Kapi\\s*Hospital|Kings\\s*Age|Kingdoms?\\s*of|knastv(ö|oe)gel|Knight\\s*Fight|\\b(Power)?KoC(Atta?ck)?\\b|\\bKOL\\b|Kongregate|Last\\s*Emperor|Legends?\\s*of|Light\\s*Rising|Lockerz|\\bLoU\\b|Mafia\\s*(Wars|Mofo)|Menelgame|Mob\\s*Wars|Mouse\\s*Hunt|Molehill\\s*Empire|NeoQuest|MyFreeFarm|Neopets|Nemexia|\\bOGame\\b|Ogar(io)?|Pardus|Pennergame|Pigskin\\s*Empire|PlayerScripts|Popmundo|Po?we?r\\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|slitheriogameplay|SpaceWars|\\bSW_[a-z]+\\n|\\bSnP\\b|The\\s*Crims|The\\s*West|Travian|Treasure\\s*Isl(and|e)|Tribal\\s*Wars|TW.?PRO|Vampire\\s*Wars|War\\s*of\\s*Ninja|West\\s*Wars|\\bWoD\\b|World\\s*of\\s*Dungeons|wtf\\s*battles|Wurzelimperium`;
    var sortDiv=document.querySelector("#script-list-sort"),refreshIcon=document.createElement("span"),inUserPage=document.querySelector("#user-script-list")!=null,goodRating,okRating,badRating,totalInstalls,dailyInstalls;
    refreshIcon.innerHTML=`<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2274"><path d="M981.314663 554.296783a681.276879 681.276879 0 0 1-46.986468 152.746388q-105.706098 230.734238-360.983096 242.19829a593.06288 593.06288 0 0 1-228.689008-33.853939v-1.022615l-31.808709 79.979258a55.759429 55.759429 0 0 1-20.506122 22.551352 40.043451 40.043451 0 0 1-21.04434 5.382184 51.076928 51.076928 0 0 1-19.483507-5.382184 95.210839 95.210839 0 0 1-13.347817-7.158305 52.314831 52.314831 0 0 1-5.382184-4.628679L71.671707 731.908862a57.427906 57.427906 0 0 1-7.158305-21.528737 46.932646 46.932646 0 0 1 1.022615-17.438277 35.952991 35.952991 0 0 1 7.158305-13.347816 74.435608 74.435608 0 0 1 10.279972-10.279972 60.495751 60.495751 0 0 1 11.248765-7.373593 50.431066 50.431066 0 0 1 8.18092-3.606063 6.189512 6.189512 0 0 0 3.067845-1.776121l281.003839-74.866183a91.497132 91.497132 0 0 1 35.899168-2.583448 122.337047 122.337047 0 0 1 22.174599 6.404799 21.528737 21.528737 0 0 1 12.325202 12.325202 76.157907 76.157907 0 0 1 4.628679 14.854829 47.63233 47.63233 0 0 1 0 14.370431 55.167388 55.167388 0 0 1-2.04523 10.764369 10.764368 10.764368 0 0 0-1.022615 3.606063l-32.831324 79.979258a677.50935 677.50935 0 0 0 164.264262 39.505232q77.395809 7.696523 131.809692-3.606063a358.507291 358.507291 0 0 0 101.023598-36.921784 381.27393 381.27393 0 0 0 73.951211-50.753997 352.64071 352.64071 0 0 0 48.708767-55.382676 410.391547 410.391547 0 0 0 26.910921-41.550462c3.767529-7.481236 6.673908-13.616926 8.719139-18.460892zM40.885614 449.667121a685.69027 685.69027 0 0 1 63.563595-176.427998q118.0313-212.273346 374.330913-207.160271a571.803252 571.803252 0 0 1 207.160271 39.989629l33.853939-78.956643A75.619688 75.619688 0 0 1 735.187378 9.189165a37.67529 37.67529 0 0 1 15.393047-8.234742 42.303968 42.303968 0 0 1 14.854829-0.538219 47.578509 47.578509 0 0 1 13.347817 3.606064 102.907362 102.907362 0 0 1 11.302586 6.13569 49.569917 49.569917 0 0 1 6.673909 4.628678l3.067845 3.067845 154.84544 276.913379a81.970666 81.970666 0 0 1 6.13569 22.712817 46.986468 46.986468 0 0 1-1.022615 17.438277 32.293105 32.293105 0 0 1-7.696523 13.347817 69.322533 69.322533 0 0 1-10.764369 9.741753 92.142994 92.142994 0 0 1-11.302587 6.673909l-8.18092 4.09046a7.104483 7.104483 0 0 1-3.067845 1.022615l-283.049068 67.546412a112.003254 112.003254 0 0 1-46.125319-1.022615c-11.571696-3.390776-19.160576-8.019454-22.551352-13.832214a41.173709 41.173709 0 0 1-5.382184-21.04434 97.256069 97.256069 0 0 1 1.291724-17.438277 24.381295 24.381295 0 0 1 3.067845-8.234742L600.632773 296.81309a663.730958 663.730958 0 0 0-164.102797-43.057474q-77.987849-9.203535-131.809692 0a348.227319 348.227319 0 0 0-101.292707 33.853938 368.571976 368.571976 0 0 0-75.350579 49.246986 383.31916 383.31916 0 0 0-50.269601 54.360061 408.507783 408.507783 0 0 0-28.740863 41.012244A113.025869 113.025869 0 0 0 40.885614 449.667121z m0 0" fill="#ffffff" p-id="2275"></path></svg>`;
    if(inUserPage){
        var ratingSpan=document.createElement("span");
        goodRating=document.createElement("span");
        okRating=document.createElement("span");
        badRating=document.createElement("span");
        totalInstalls=document.createElement("span");
        dailyInstalls=document.createElement("span");
        goodRating.className="good-rating-count";
        okRating.className="ok-rating-count";
        badRating.className="bad-rating-count";
        totalInstalls.className="good-rating-count";
        dailyInstalls.className="good-rating-count";
        ratingSpan.appendChild(goodRating);
        ratingSpan.appendChild(okRating);
        ratingSpan.appendChild(badRating);
        document.querySelector("#script-list-sort ul>li:nth-child(1)").appendChild(dailyInstalls);
        document.querySelector("#script-list-sort ul>li:nth-child(2)").appendChild(totalInstalls);
        document.querySelector("#script-list-sort ul>li:nth-child(3)").appendChild(ratingSpan);
        ratingSpan.style.display=totalInstalls.style.display=dailyInstalls.style.display="none";
        goodRating.innerHTML=okRating.innerHTML=badRating.innerHTML=totalInstalls.innerHTML=dailyInstalls.innerHTML="0";
    }
    storage.getItem("GeasyforkBullshit",v=>{
        bullshit=v;
        if(!bullshit)bullshit=bullshit_o;
        if(/greasyfork\.org\/.*\/scripts\/23840[^\/]*$/.test(location.href)){
            var p=document.createElement("p"),_bullshit;
            p.style.width="99%";
            p.innerHTML="<b>Filter RegExp</b><button id='ok' style='margin-left: 20px;'>Save</button><button id='reset' style='margin-left: 20px;'>Reset</button>";
            var okBtn=p.querySelector("#ok");
            var resetBtn=p.querySelector("#reset");
            var filterTextarea=document.createElement("pre");
            var prettifyScript=document.createElement("script");
            prettifyScript.src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js?skin=sons-of-obsidian";
            document.head.appendChild(prettifyScript);
            var prettifyStyle=document.createElement("link");
            prettifyStyle.rel="stylesheet";
            prettifyStyle.href="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.css";
            document.head.appendChild(prettifyStyle);
            filterTextarea.contentEditable="true";
            filterTextarea.className="prettyprint lang-js";
            filterTextarea.style.whiteSpace="pre-wrap";
            filterTextarea.style.overflowWrap="break-word";
            filterTextarea.style.width="100%";
            filterTextarea.innerHTML=bullshit;
            var additionalInfo=document.querySelector("#additional-info");
            p.appendChild(filterTextarea);
            additionalInfo.insertBefore(p,additionalInfo.firstChild);
            prettifyScript.onload=()=>{PR.prettyPrint();};
            okBtn.onclick=()=>{
                _bullshit=filterTextarea.innerText;
                storage.setItem("GeasyforkBullshit", _bullshit);
                alert("Saved");
                //_GM_notification("Saved");
            };
            resetBtn.onclick=()=>{
                storage.setItem("GeasyforkBullshit", bullshit_o);
                alert("Reset over");
                location.reload();
                //_GM_notification("Reset over");
            };
        }
        initFilter();
    });

    function addScore(script){
        var separator=script.querySelector('h2>span.name-description-separator');
        var description=script.querySelector('h2>span.description');
        if(separator){
            var score=document.createElement("strong");
            score.style.color="#e09015";
            score.innerHTML=script.dataset.scriptRatingScore;
            separator.parentNode.insertBefore(score,separator);
        }
        if(description){
            count(script);
            var scriptHref=script.querySelector('h2>a').href;
            let version=script.dataset.scriptVersion;
            let format=script.dataset.scriptLanguage;
            let cssAtag=script.dataset.scriptLanguage=="js"?"":`<a class="install-link" data-install-format="css" data-ping-url href="${scriptHref.replace(/\.org\/.*\/scripts\//,".org/scripts/")}/code/script.user.css">Install as user style</a>`;
            description.innerHTML+=`<strong>Ver.${version}</strong>
            <div id="install-area" class="list-install-area">
            <a class="install-link" data-install-format="js" data-ping-url href="${scriptHref.replace(/\.org\/.*\/scripts\//,".org/scripts/")}/code/script.user.js">Install</a><a style="cursor:pointer;" class="install-help-link refresh-info" title="Check status" rel="nofollow"></a>
            ${cssAtag}
            </div><div id="installation-instructions-modal-js" aria-hidden="true"><p class="installation-instructions-modal-content-bypass"><a href="#"></a></p></div><div id="installation-instructions-modal-css" aria-hidden="true"><p class="installation-instructions-modal-content-bypass"><a href="#"></a></p></div>`;
            var installArea=description.querySelector("#install-area");
            let installLink=installArea.querySelector(".install-link");
            let checkInfo=installArea.querySelector(".install-help-link");
            script.onmouseenter=e=>{
                checkInfo.appendChild(refreshIcon);
            };
            script.onmouseleave=e=>{
                if(refreshIcon && refreshIcon.parentNode)refreshIcon.parentNode.removeChild(refreshIcon);
            };
            checkInfo.onclick=()=>{
                _GM_xmlhttpRequest({
                    method: 'GET',
                    url: scriptHref.replace(/(.*)-.*/,"$1.json"),
                    onload: function(result) {
                        var data = null;
                        try {
                            data = JSON.parse(result.responseText);
                        }
                        catch (e) {
                            console.log('parse error');
                        }
                        if(data){
                            let setInfo=info=>{
                                if(info.installed){
                                    if(parseFloat(info.version) < parseFloat(version)){
                                        installLink.innerHTML="Update to version "+version;
                                    }else if(parseFloat(info.version) > parseFloat(version)){
                                        installLink.innerHTML="Downgrade to version "+version;
                                    }else{
                                        installLink.innerHTML="Reinstall version "+version;
                                    }

                                    if(!info.enabled){
                                        installLink.style.backgroundColor="#6a6a6a";
                                    }else{
                                        installLink.style.backgroundColor="";
                                    }
                                }else{
                                    installLink.innerHTML="Install version "+version;
                                }
                            };
                            if(window.external.Tampermonkey){
                                window.external.Tampermonkey.isInstalled(data.name, data.namespace, e=>{
                                    setInfo(e);
                                });
                            }else if(window.external.Violentmonkey){
                                window.external.Violentmonkey.isInstalled(data.name, data.namespace).then(e=>{
                                    setInfo(e);
                                });
                            }
                        }
                    }
                });
            };
            if(!window.external.Tampermonkey && !window.external.Violentmonkey){
                checkInfo.style.display="none";
            }
        }
    }

    function count(script){
        var dailySpan=script.querySelector("dd.script-list-daily-installs>span");
        if(!dailySpan)return;
        var goodCount=parseInt(script.querySelector("dd.script-list-ratings>span>.good-rating-count").innerHTML.replace(/[^\d]/g,""));
        var okCount=parseInt(script.querySelector("dd.script-list-ratings>span>.ok-rating-count").innerHTML.replace(/[^\d]/g,""));
        var badCount=parseInt(script.querySelector("dd.script-list-ratings>span>.bad-rating-count").innerHTML.replace(/[^\d]/g,""));
        if(badCount && badCount>2 && badCount>goodCount){
            let scriptLink=script.querySelector('.script-link');
            if(scriptLink){
                var warn=document.createTextNode("⚠");
                scriptLink.style.textDecoration="line-through";
                scriptLink.style.color="#67000080";
                scriptLink.title="May be dangerous!";
                scriptLink.parentNode.insertBefore(warn,scriptLink);
            }
        }

        if(!inUserPage)return;
        var dailyCount=parseInt(dailySpan.innerHTML.replace(/[^\d\.\-]/g,""));
        var totalCount=parseInt(script.querySelector("dd.script-list-total-installs>span").innerHTML.replace(/[^\d]/g,""));
        goodRating.innerHTML=parseInt(goodRating.innerHTML)+goodCount;
        okRating.innerHTML=parseInt(okRating.innerHTML)+okCount;
        badRating.innerHTML=parseInt(badRating.innerHTML)+badCount;
        totalInstalls.innerHTML=parseInt(totalInstalls.innerHTML)+totalCount;
        dailyInstalls.innerHTML=parseInt(dailyInstalls.innerHTML)+dailyCount;
        ratingSpan.style.display=totalInstalls.style.display=dailyInstalls.style.display="";
    }

    _GM_registerMenuCommand("Configure the Filter", ()=>{
        location.href="https://greasyfork.org/scripts/23840#additional-info";
        /*var _bullshit=window.prompt("Configure the Filter", bullshit);
        if(_bullshit == ""){
            bullshit=bullshit_o;
            storage.setItem("GeasyforkBullshit", bullshit);
            location.reload();
        }else if(_bullshit != null){
            bullshit=_bullshit;
            storage.setItem("GeasyforkBullshit", bullshit);
            location.reload();
        }*/
    });

    function initFilter(){
        var enableFilter;
        if(sortDiv){
            storage.getItem("disableFilter",v=>{
                enableFilter=!v;
                var switchFilter=document.createElement("div");
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                var observer = new MutationObserver(function(records){
                    records.map(function(record) {
                        for(var i=0;i<record.addedNodes.length;i++){
                            var curNode=record.addedNodes[i];
                            if(curNode.className=="script-list"){
                                var scripts=curNode.querySelectorAll('li');
                                for(let i=0;i<scripts.length;i++){
                                    let script=scripts[i];
                                    addScore(script);
                                }
                                if(enableFilter)filter(curNode);
                            }else if(curNode.tagName=="LI"){
                                addScore(curNode);
                                if(enableFilter)filter(curNode);
                            }
                        }
                    });
                });
                var option = {
                    'childList': true
                };
                observer.observe(document.querySelector("body>.width-constraint .sidebarred-main-content"), option);
                var scriptList=document.querySelector("#browse-script-list,#user-script-list,ol.script-list");
                if(scriptList)observer.observe(scriptList, option);
                var scripts=document.querySelectorAll('ol.script-list>li');
                for(let i=0;i<scripts.length;i++){
                    let script=scripts[i];
                    addScore(script);
                }
                //Modify from GreasyFork Bullshit Filter,Thanks to darkred
                var style = document.createElement('style');
                style.textContent = `
                li.filtered {
                     display: none !important;
                }
                .list-option{
                     position: relative;
                }
                #script-list-sort li>span{
                     position: absolute;
                     top: 4px;
                     right: 2px;
                     pointer-events: none;
                     font-weight: 500;
                }
                #script-list-sort li>span:lang(ar), #script-list-sort li>span:lang(he), #script-list-sort li>span:lang(ug){
                     right: unset;
                     left: 2px;
                }
                #script-list-sort li>span>span{
                     margin: 0 0 0 2px;
                }
                .script-list>li .list-install-area{
                     display: none;
                     float: right;
                     position: relative;
                }
                .script-list>li:hover .list-install-area {
                     display: block;
                }
                @-webkit-keyframes spin {
                 from {
                     -webkit-transform: rotate(0deg);
                 }
                 to {
                     -webkit-transform: rotate(360deg);
                 }
                }
                @keyframes spin {
                 from {
                     transform: rotate(0deg);
                 }
                 to {
                     transform: rotate(360deg);
                 }
                }
                .refresh-info:hover>span {
                     display: block;
                     -webkit-animation: spin 1s linear 1s 5 alternate;
                     animation: spin 1s linear infinite;
                }`;
                style.type = 'text/css';
                document.querySelector('head').appendChild(style);
                var bullshitReg=new RegExp(bullshit,"i");
                var filterName="Enable Filter",filteredNum=0;
                var filter=function(t){
                    [].forEach.call(t.querySelectorAll('article>h2'), function(item) {
                        if(bullshitReg.test(item.innerText.replace("\n"," "))){
                            item.parentNode.parentNode.classList.add('filtered');
                            filteredNum++;
                        }
                    });
                };
                if(enableFilter)filter(document);
                switchFilter.innerHTML='<input type="checkBox" name="switchFilter" id="switchFilter"/><label for="switchFilter">'+filterName+(filteredNum?' ('+filteredNum+' filtered)':'')+'</label>';
                var switchFilterCheckbox=switchFilter.querySelector('#switchFilter');
                var switchFilterLabel=switchFilterCheckbox.nextSibling;
                switchFilterCheckbox.checked=enableFilter;
                switchFilterCheckbox.onclick=function(){
                    if(enableFilter){
                        [].forEach.call(document.querySelectorAll('li.filtered'), function(item) {
                            item.classList.remove('filtered');
                        });
                        switchFilterLabel.innerHTML=filterName;
                    }else{
                        filteredNum=0;
                        filter(document);
                        switchFilterLabel.innerHTML=filterName+' ('+filteredNum+' filtered)';
                    }
                    storage.setItem("disableFilter",enableFilter);
                    enableFilter=!enableFilter;
                };
                sortDiv.insertBefore(switchFilter,sortDiv.firstChild);
            });
        }
    }
})();