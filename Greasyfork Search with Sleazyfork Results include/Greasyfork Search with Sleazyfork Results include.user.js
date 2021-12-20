// ==UserScript==
// @name         Greasyfork Search with Sleazyfork Results include
// @name:zh-CN   大人的Greasyfork
// @name:zh-TW   大人的Greasyfork
// @name:ja      大人のGreasyfork
// @namespace    hoothin
// @version      0.91
// @description  Merge adult results of sleazyfork into greasyfork when the script is no longer anonymously available, add rating score and version for scripts then
// @description:zh-CN 在Greasyfork的搜索结果中添加Sleazyfork上的成人脚本，增加评分与版本号，并在访问匿名不可用脚本时跳转至Sleazyfork
// @description:zh-TW 在Greasyfork的搜索結果中添加Sleazyfork上的成人腳本，增加評分與版本號，並在訪問匿名不可用腳本時跳轉至Sleazyfork
// @description:ja    脚本付けるSleazyfork上の成人脚本検索結果からGreasyfork、脚本付ける採点とバージョン番号を訪問匿名利用できない脚本にジャンプからSleazyfork
// @author       hoothin
// @include      http*://greasyfork.org/*
// @include      http*://www.greasyfork.org/*
// @include      http*://sleazyfork.org/*
// @include      http*://www.sleazyfork.org/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    if(document.querySelector('span.sign-in-link')){
        var otherSite=/greasyfork\.org/.test(location.hostname)?"sleazyfork":"greasyfork";
        if(/scripts\/\d+/.test(location.href)){
            if(!document.querySelector("#script-info") && (otherSite == "greasyfork" || document.querySelector("div.width-constraint>section>p>a").href.indexOf("sign_in")!=-1)){
                location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org");
            }
        }else if(/\/(scripts|users)(\/|.*(\?|&)q=|.*\?set=)/.test(location.href)){
            GM_xmlhttpRequest({
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
            var scriptHref=script.querySelector('h2>a').href;
            let version=script.dataset.scriptVersion;
            description.innerHTML+=`<strong>Ver.${version}</strong>
            <div id="install-area" class="list-install-area" style="display:none;float: right;position: relative;">
            <a class="install-link" href="${scriptHref.replace(/(\d)-.*/,"$1")}/code/script.user.js">Install</a><a style="cursor:pointer;" class="install-help-link refresh-info" title="Check info" rel="nofollow"><span>🗘</span></a>
            </div>`;
            var installArea=description.querySelector("#install-area");
            let installLink=installArea.querySelector(".install-link");
            let checkInfo=installArea.querySelector(".install-help-link");
            checkInfo.onclick=()=>{
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: scriptHref,
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
                        var installInfo=doc.querySelector("#install-area>.install-link");
                        if(installInfo){
                            let setInfo=info=>{
                                if(info.installed){
                                    if(parseFloat(info.version) < parseFloat(version)){
                                        installLink.innerHTML="Update to version "+version;
                                    }else if(parseFloat(info.version) > parseFloat(version)){
                                        installLink.innerHTML="Downgrade to version "+version;
                                    }else{
                                        installLink.innerHTML="Reinstall version "+version;
                                    }
                                }else{
                                    installLink.innerHTML="Install version "+version;
                                }
                                if(!info.enabled){
                                    installLink.style.backgroundColor="#6a6a6a";
                                }else{
                                    installLink.style.backgroundColor="";
                                }
                            };
                            if(window.external.Tampermonkey){
                                window.external.Tampermonkey.isInstalled(installInfo.dataset.scriptName, installInfo.dataset.scriptNamespace, e=>{
                                    setInfo(e);
                                });
                            }else if(window.external.Violentmonkey){
                                window.external.Violentmonkey.isInstalled(installInfo.dataset.scriptName, installInfo.dataset.scriptNamespace).then(e=>{
                                    setInfo(e);
                                });
                            }
                        }
                    }
                });
            };
        }
    }
    var sortDiv=document.querySelector("#script-list-sort");
    if(sortDiv){
        var switchFilter=document.createElement("div"),enableFilter=!GM_getValue("disableFilter");
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
        observer.observe(document.querySelector("#browse-script-list,#user-script-list"), option);
        var scripts=document.querySelectorAll('ol.script-list>li');
        for(let i=0;i<scripts.length;i++){
            let script=scripts[i];
            addScore(script);
        }
        //Modify from GreasyFork Bullshit Filter,Thanks to darkred
        var style = document.createElement('style');
        style.textContent = `
        li.filtered {
             display:none !important;
        }
        .script-list>li:hover .list-install-area {
             display:block!important;
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
        var bullshit=/vip.*视频|网课|刷课|(mooc|考试|学习).*答题|(网盘|網盤|云盘).*(vip|直链|下载助手|链接)|AntiGame|split|Agar|\.io(\b|:|\/|\.|$)|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Blah Blah|Orc Clan Script|Astro\s*Empires|^\s*Attack|^\s*Battle|BiteFight|Blood\s*Wars|Bots|Bots4|Brawler|\bBvS\b|Business\s*Tycoon|Castle\s*Age|City\s*Ville|Comunio|Conquer\s*Club|CosmoPulse|Dark\s*Orbit|Dead\s*Frontier|\bDOA\b|DotD|Dossergame|Dragons\s*of\s*Atlantis|Dugout|\bDS[a-z]+\n|Empire\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\s*Ville|Ghost\s*Trapper|Gladiatus|Goalline|Gondal|Grepolis|Hobopolis|\bhwm(\b|_)|Ikariam|\bIT2\b|Jellyneo|Kapi\s*Hospital|Kings\s*Age|Kingdoms?\s*of|knastv(ö|oe)gel|Knight\s*Fight|\b(Power)?KoC(Atta?ck)?\b|\bKOL\b|Kongregate|Last\s*Emperor|Legends?\s*of|Light\s*Rising|Lockerz|\bLoU\b|Mafia\s*(Wars|Mofo)|Menelgame|Mob\s*Wars|Mouse\s*Hunt|Molehill\s*Empire|NeoQuest|MyFreeFarm|Neopets|Nemexia|\bOGame\b|Ogar(io)?|Pardus|Pennergame|Pigskin\s*Empire|PlayerScripts|Popmundo|Po?we?r\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|slitheriogameplay|SpaceWars|\bSW_[a-z]+\n|\bSnP\b|The\s*Crims|The\s*West|Travian|Treasure\s*Isl(and|e)|Tribal\s*Wars|TW.?PRO|Vampire\s*Wars|War\s*of\s*Ninja|West\s*Wars|\bWoD\b|World\s*of\s*Dungeons|wtf\s*battles|Wurzelimperium/mi;
        var filterName="Enable Filter",filteredNum=0;
        var filter=function(t){
            [].forEach.call(t.querySelectorAll('article>h2'), function(item) {
                if(bullshit.test(item.innerText.replace("\n",""))){
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
            GM_setValue("disableFilter",enableFilter);
            enableFilter=!enableFilter;
        };
        sortDiv.insertBefore(switchFilter,sortDiv.firstChild);
    }
})();