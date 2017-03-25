// ==UserScript==
// @name         Greasyfork Search with Sleazyfork Results include
// @name:zh-CN   大人的Greasyfork
// @name:zh-TW   大人的Greasyfork
// @name:ja      大人のGreasyfork
// @namespace    hoothin
// @version      0.69
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
            if(!document.querySelector("#script-info") && (otherSite == "greasyfork" || document.querySelector("div.width-constraint>section>p>a"))){
                location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org");
            }
        }else if(/\/(scripts|users)(\/|\?q=|\?set=)/.test(location.href)){
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
                            var list=document.querySelector('body>div.width-constraint');
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
                                if(!ml.querySelector("li[data-script-id='"+sc.getAttribute("data-script-id")+"']")){
                                    addScore(sc);
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
            score.innerHTML=script.getAttribute("data-script-rating-score");
            separator.parentNode.insertBefore(score,separator);
        }
        if(description)description.innerHTML+="<strong>Ver."+script.getAttribute("data-script-version")+"</strong>";
    }
    var sortDiv=document.querySelector("#script-list-sort");
    if(sortDiv){
        var scripts=document.querySelectorAll('ol.script-list>li');
        for(let i=0;i<scripts.length;i++){
            let script=scripts[i];
            addScore(script);
        }
        //Modify from GreasyFork Bullshit Filter,Thanks to darkred
        var style = document.createElement('style');
        style.textContent = 'li.filtered { display:none !important; }';
        style.type = 'text/css';
        document.querySelector('head').appendChild(style);
        var bullshit="百度(云|网盘)|AntiGame|split|Agar|agar\.io|alis\.io|angel\.io|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Blah Blah|Orc Clan Script|Astro\s*Empires|^\s*Attack|^\s*Battle|BiteFight|Blood\s*Wars|Bots|Bots4|Brawler|\bBvS\b|Business\s*Tycoon|Castle\s*Age|City\s*Ville|chopcoin\.io|Comunio|Conquer\s*Club|CosmoPulse|cursors\.io|Dark\s*Orbit|Dead\s*Frontier|Diep\.io|\bDOA\b|doblons\.io|DotD|Dossergame|Dragons\s*of\s*Atlantis|driftin\.io|Dugout|\bDS[a-z]+\n|elites\.io|Empire\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\s*Ville|Ghost\s*Trapper|Gladiatus|Goalline|Gondal|gota\.io|Grepolis|Hobopolis|\bhwm(\b|_)|Ikariam|\bIT2\b|Jellyneo|Kapi\s*Hospital|Kings\s*Age|Kingdoms?\s*of|knastv(ö|oe)gel|Knight\s*Fight|\b(Power)?KoC(Atta?ck)?\b|\bKOL\b|Kongregate|Last\s*Emperor|Legends?\s*of|Light\s*Rising|lite\.ext\.io|Lockerz|\bLoU\b|Mafia\s*(Wars|Mofo)|Menelgame|Mob\s*Wars|Mouse\s*Hunt|Molehill\s*Empire|NeoQuest|MyFreeFarm|narwhale\.io|Neopets|Nemexia|\bOGame\b|Ogar(io)?|Pardus|Pennergame|Pigskin\s*Empire|PlayerScripts|pokeradar\.io|Popmundo|Po?we?r\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|slither\.io|slitherplus\.io|slitheriogameplay|SpaceWars|splix\.io|\bSW_[a-z]+\n|\bSnP\b|The\s*Crims|The\s*West|torto\.io|Travian|Treasure\s*Isl(and|e)|Tribal\s*Wars|TW.?PRO|Vampire\s*Wars|vertix\.io|War\s*of\s*Ninja|West\s*Wars|wings\.io|\bWoD\b|World\s*of\s*Dungeons|wtf\s*battles|Wurzelimperium";
        var filterName="Enable Filter",filteredNum;
        var filter=function(){
            filteredNum=0;
            [].forEach.call(document.querySelectorAll('article>h2'), function(item) {
                if(new RegExp(bullshit,"i").test(item.innerText)){
                    item.parentNode.parentNode.classList.add('filtered');
                    filteredNum++;
                }
            });
        };
        var switchFilter=document.createElement("div"),enableFilter=!GM_getValue("disableFilter");
        if(enableFilter)filter();
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
                filter();
                switchFilterLabel.innerHTML=filterName+' ('+filteredNum+' filtered)';
            }
            GM_setValue("disableFilter",enableFilter);
            enableFilter=!enableFilter;
        };
        sortDiv.insertBefore(switchFilter,sortDiv.firstChild);
    }
})();