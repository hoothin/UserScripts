// ==UserScript==
// @name         Valentine's Day
// @name:zh-CN   情人节惊喜
// @name:zh-TW   情人節驚喜
// @namespace    hoothin
// @version      0.1
// @description  A script to make a surprise for Valentine's Day
// @description:zh-CN 伪装成百度新闻的情人节惊喜
// @description:zh-TW 僞裝成百度新聞的情人節驚喜
// @author       hoothin
// @license      MIT License
// @include      *://www.baidu.com/
// @include      *://www.baidu.com/home*
// @include      *://www.baidu.com/?tn=*
// @include      *://www.baidu.com/index.php*
// @include      *://www.baidu.com/s?wd=Valentine*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';
    var valentinePhotoUrl="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=58952482,3191586726&fm=80&w=179&h=119&img.JPG";    //新闻图链接
    var valentineWords="AAA：颜值对我来说不是问题";    //新闻标题
    var valentinName="AAA";    //情人名字
    var myName="BBB";    //自己名字
    var time="2007 1 12";    //纪念日
    
    var date=new Date();
    var dateDay=date.getDate(),dateMonth=date.getMonth()+1;
    if(dateDay!=14||dateMonth!=2)return;
    if(/wd=Valentine/.test(location.href)){
        var dayArr=time.split(" ");
        var html=`
        <!DOCTYPE HTML>
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
        <head>
            <title>Our Love Story</title>
            <meta http-equiv="content-type" content="text/html; charset=UTF-8">
            <link href="https://cdn.rawgit.com/hoothin/UserScripts/master/Valentine's%20Day/css/default.css" type="text/css" rel="stylesheet">
            <script type="text/javascript" src="https://cdn.rawgit.com/hoothin/UserScripts/master/Valentine's%20Day/js/jquery.js"></script>
            <script type="text/javascript" src="https://cdn.rawgit.com/hoothin/UserScripts/master/Valentine's%20Day/js/garden.js"></script>
            <script type="text/javascript" src="https://cdn.rawgit.com/hoothin/UserScripts/master/Valentine's%20Day/js/functions.js"></script>
        </head>
        <body>
            <div id="mainDiv">
                <div id="content">
                    <div id="loveHeart">
                        <canvas id="garden"></canvas>
                        <div id="words">
                            <div id="messages">
                                ${valentinName}, I have fallen in love with you for
                                <div id="elapseClock"></div>
                            </div>
                            <div id="loveu">
                                Love u forever and ever.<br/>
                                <div class="signature">- ${myName}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script type="text/javascript">
                var offsetX = $("#loveHeart").width() / 2;
                var offsetY = $("#loveHeart").height() / 2 - 55;
                var together = new Date();
                together.setFullYear(${dayArr[0]}, ${dayArr[1]}, ${dayArr[2]});
                together.setHours(20);
                together.setMinutes(0);
                together.setSeconds(0);
                together.setMilliseconds(0);
                if (!document.createElement('canvas').getContext) {
                    var msg = document.createElement("div");
                    msg.id = "errorMsg";
                    msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
                    document.body.appendChild(msg);
                    document.execCommand("stop");
                } else {
                    startHeartAnimation();
                    timeElapse(together);
                    setInterval(function () {
                        timeElapse(together);
                    }, 500);
                }
            </script>
        </body>
        </html>`;
        GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(html),false);
    }else{
        var listWrapper=document.querySelector(".s-news-list-wrapper");
        if(listWrapper){
            var valentineItem=document.createElement("div");
            valentineItem.className="s-news-special s-news-item s-news-special-item-tpl-2 s-opacity-blank8";
            valentineItem.innerHTML=`<div class="s-pic-content"><div class="s-pic-content-own"> <ul class="s-news-content-imgs clearfix"> <li class="item-img-wrap"> <a href="https://www.baidu.com/s?wd=Valentine" target="_blank" title="${valentineWords}"> <img class="s-news-img" src="${valentinePhotoUrl}" height="119" width="179"> </a>   </li></ul></div></div> <div class="s-block-container"> <div class="s-block-container-own"> <div class="s-text-content"> <h2><a href="https://www.baidu.com/s?wd=Valentine" title="${valentineWords}" target="_blank" class="s-title-yahei">${valentineWords}</a><a href="javascript:;" class="del"></a></h2>  </div> <div class="from">  <span class="src-net"> <a href="http://ent.chinadaily.com.cn" target="_blank" data-src="1" data-click="LOG_LINK"> 中国日报网 </a> </span>  <span class="src-time">02-11 15:58</span>  <div class="dustbin" data-click="LOG_BTN_DUSTBIN"></div></div> </div> </div>`;
            listWrapper.insertBefore(valentineItem,listWrapper.firstChild);
        }
    }
})();