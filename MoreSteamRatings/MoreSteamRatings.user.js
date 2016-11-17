// ==UserScript==
// @name         MoreSteamRatings
// @name:zh-CN   Steam游戏评分集
// @name:zh-TW   Steam遊戲評分集
// @namespace    hoothin
// @version      0.2.2
// @description  Show more game ratings on steam store
// @description:zh-CN 在Steam游戏详情页显示更多网站评分
// @description:zh-TW 在Steam遊戲詳情頁顯示更多網站評分
// @author       hoothin
// @include      http*://store.steampowered.com/app/*
// @grant        GM_xmlhttpRequest
// @connect      www.metacritic.com
// @connect      www.gamerankings.com
// @connect      www.gamespot.com
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

var appName=document.querySelector("div.apphub_AppName");
if(!appName)return;
var gameName=getRightName(appName.innerHTML);
var userReviews=document.querySelector("div.user_reviews");
var metascore=document.querySelector("div.responsive_apppage_reviewblock");
//getMcScore();
getGsScore();
getGrScore();

function getRightName(s){
    return s.replace(/:\s|:|\s/g,"-").toLowerCase();
}

function getMcScore(){
    getResult("http://www.metacritic.com/game/pc/"+gameName, function(d){
        let score=d.querySelector("span[itemprop=ratingValue]");
        if(score){
            let title=document.createElement("div");
            title.onclick=function(){window.open("http://www.metacritic.com/game/pc/"+gameName);};
            title.style.cssText="color:#8f98a0;cursor: pointer;";
            title.innerHTML="<div>Metacritic:</div>";
            userReviews.parentNode.insertBefore(title,userReviews.nextSibling);
            let scoreSpan=document.createElement("span");
            scoreSpan.style.cssText="color:#A34C25;font-size:14px";
            scoreSpan.innerHTML=score.innerHTML;
            title.appendChild(scoreSpan);
        }
    });
}

function getGsScore(){
    getResult("http://www.gamespot.com/"+gameName, function(d){
        let score=d.querySelector("span[itemprop=ratingValue]");
        if(score){
            /*let title=document.createElement("div");
            title.onclick=function(){window.open("http://www.gamespot.com/"+gameName);};
            title.style.cssText="color:#8f98a0;cursor: pointer;";
            title.innerHTML="<div>Gamespot:</div>";
            userReviews.parentNode.insertBefore(title,userReviews.nextSibling);
            let scoreSpan=document.createElement("span");
            scoreSpan.style.cssText="color:#A34C25;font-size:14px";
            scoreSpan.innerHTML=score.innerHTML;
            title.appendChild(scoreSpan);*/

            let gameScore=metascore.cloneNode(true);
            var gameBack=gameScore.querySelector("#game_area_metascore");
            gameBack.style.backgroundImage="url(http://static1.gamespot.com/bundles/gamespotsite/images/logo-flat-midsize.png)";
            gameBack.style.backgroundSize="141px";
            gameBack.style.backgroundPosition="0 -10px";
            let scoreValue=gameBack.querySelectorAll("span");
            scoreValue[0].innerHTML=score.innerHTML;
            scoreValue[2].innerHTML="10";
            let scoreLink=gameScore.querySelector("#game_area_metalink>a");
            scoreLink.href="http://www.gamespot.com/"+gameName;
            scoreLink.innerHTML="Read Gamespot Reviews";
            metascore.parentNode.appendChild(gameScore);
        }
    });
}

function getGrScore(){
    getResult("http://www.gamerankings.com/browse.html?search="+encodeURI(appName.innerHTML)+"&site=pc&numrev=3", function(d){
        let score=d.querySelector(".pod>.body>table>tbody>tr");
        if(score){
            let link="http://www.gamerankings.com"+score.querySelector("td>a").getAttribute("href");
            /*let title=document.createElement("div");
            title.onclick=function(){window.open(link);};
            title.style.cssText="color:#8f98a0;cursor: pointer;";
            title.innerHTML="<div>Gamerankings:</div>";
            userReviews.parentNode.insertBefore(title,userReviews.nextSibling);
            let scoreSpan=document.createElement("span");
            scoreSpan.style.cssText="color:#A34C25;font-size:14px";
            scoreSpan.innerHTML=score.querySelector("td>span").innerHTML;
            title.appendChild(scoreSpan);*/

            let gameScore=metascore.cloneNode(true);
            var gameBack=gameScore.querySelector("#game_area_metascore");
            gameBack.style.backgroundImage="url(http://img.gamefaqs.net/images/default/gr_logo.gif)";
            gameBack.style.backgroundSize="160px";
            let scoreValue=gameBack.querySelectorAll("span");
            scoreValue[0].innerHTML=score.querySelector("td>span").innerText;
            scoreValue[1].innerHTML=scoreValue[2].innerHTML="";
            let scoreLink=gameScore.querySelector("#game_area_metalink>a");
            scoreLink.href=link;
            scoreLink.innerHTML="Read Gamerankings Reviews";
            metascore.parentNode.appendChild(gameScore);
        }
    });
}

function getResult(url,callBack){
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (d) {
            let doc = document.implementation.createHTMLDocument('');
            doc.documentElement.innerHTML = d.responseText;
            callBack(doc);
        }
    });
}