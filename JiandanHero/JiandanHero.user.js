// ==UserScript==
// @name         煎蛋侠
// @name:en      Jandan Hero
// @name:zh-TW   煎蛋俠
// @namespace    hoothin
// @version      2.0
// @icon         http://cdn.jandan.net/static/img/favicon.ico
// @description  为煎蛋jandan.net提供左右方向键快捷翻页、上下方向键快捷切图、鼠标悬停显示大图、屏蔽指定用户发言等功能
// @description:en  Tools for jandan.net
// @description:zh-TW  為煎蛋jandan.net提供左右方向鍵快捷翻頁、上下方向鍵快捷切圖、鼠標懸停顯示大圖、屏蔽指定用戶發言等功能
// @author       hoothin
// @match        http*://jandan.net/*
// @match        http*://i.jandan.net/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    var timer,tempImg=document.createElement("img"),getImgWH=function(img,callBack){
        if(timer)clearInterval(timer);
        tempImg.src="";
        tempImg.src=img.src;
        var check=function(){
            if(tempImg.width>0 || tempImg.height>0){
                if(timer)clearInterval(timer);
                callBack(tempImg.width,tempImg.height);
                return true;
            }else{
                return false;
            }
        };
        var geted=check();
        if(!geted){
            timer = setInterval(check,40);
        }
    };

    document.addEventListener("keyup", function(e) {
        if(/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;
        switch(e.keyCode){
            case 37://←
                var next=document.querySelector("span#nav_next>a");
                if(next)next.click();
                break;
            case 39://→
                var pre=document.querySelector("span#nav_prev>a");
                if(pre)pre.click();
                break;
            case 38://↑
                if(/jandan\.net\/(ooxx|pic|girl|top|zoo|dzh)/.test(location.href)){
                    moveToPic(false);
                }
                break;
            case 40://↓
                if(/jandan\.net\/(ooxx|pic|girl|top|zoo|dzh)/.test(location.href)){
                    moveToPic(true);
                }
                break;
        }
    });

    var pic,pics,currentPic,i;
    var isHttps=location.protocol=="https:",selector;
    var isTucao=document.querySelector(".tucao-list")!=null;
    var isTop=location.href.indexOf("jandan.net/top")!=-1;
    var isMobile=location.href.indexOf("i.jandan.net")!=-1;

    function moveToPic(d){
        pics=document.querySelectorAll(".commentlist .text img,.tucao-list img");
        if(!currentPic && pics)currentPic=pics[0];
        else{
            for(i=0;i<pics.length;i++){
                pic=pics[i];
                if(isTucao){
                    if(($(window).scrollTop() + $(window).height() / 2) < ($(pic).offset().top + $(pic).outerHeight()) &&
                       ($(window).scrollTop() + $(window).height() / 2) > $(pic).offset().top){
                        currentPic=pic;
                        break;
                    }
                }else{
                    if($(window).scrollTop() < ($(pic).offset().top + $(pic).outerHeight()) &&
                       ($(window).scrollTop() + $(window).height()) > $(pic).offset().top){
                        currentPic=pic;
                        break;
                    }
                }
            }
            if(!currentPic && pics)currentPic=pics[0];
            for(var i=0;i<pics.length;i++){
                pic=pics[i];
                var pi;
                if(currentPic==pic){
                    if(d && pics.length>(i+1)){
                        pi=i+1;
                        currentPic=pics[pi];
                        while($(currentPic).is(":hidden") && ++pi<pics.length){
                            currentPic=pics[pi];
                        }
                    }else if(!d && i>0){
                        pi=i-1;
                        currentPic=pics[pi];
                        while($(currentPic).is(":hidden") && --pi>0){
                            currentPic=pics[pi];
                        }
                    }
                    break;
                }
            }
        }
        setTimeout(()=>{
            if(isTucao){
                currentPic.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            }else if(currentPic.nextSibling && currentPic.nextSibling.className=="gif-mask"){
                currentPic.nextSibling.click();
            }
            currentPic.click();
        },100);
    }

    function checkBan(author){
        let authorId;
        let changeBtn = author.querySelector("#changeBtn");
        if(changeBtn == null){
            changeBtn=document.createElement("a");
            changeBtn.href=`javascript:void(0);`;
            changeBtn.id="changeBtn";
            if(isMobile){
                author=author.querySelector("b");
                if(!author)return;
                authorId=author.innerText;
                author.parentNode.insertBefore(changeBtn,author.parentNode.querySelector(".righttext"));
            }else if(isTucao){
                authorId=author.querySelector(".tucao-author").innerText;
                author.insertBefore(changeBtn,author.querySelector(".tucao-author").nextSibling);
            }else{
                authorId=isTop?author.querySelector("strong").innerText:author.querySelector("strong").title.replace(/防伪码：/,"");
                author.insertBefore(changeBtn,author.querySelector("br"));
            }
            changeBtn.onclick=function(){
                var author_s,j,shown;
                if(author.parentNode.classList.contains("hide")){
                    shown=false;
                    GM_deleteValue("jandanDis_"+authorId);
                }else{
                    shown=true;
                    GM_setValue("jandanDis_"+authorId,true);
                }
                var authors=document.querySelectorAll("div.author,.tucao-author-bar,.commentlist>li>b");
                for(j=0;j<authors.length;j++){
                    author_s=authors[j];
                    var changeBtn_s=author_s.querySelector("#changeBtn");
                    var isSame=false;
                    if(isMobile){
                        isSame=author_s.childNodes[0].nodeValue==authorId;
                    }else if(isTucao){
                        isSame=author_s.querySelector(".tucao-author").innerText==authorId;
                    }else if(isTop){
                        isSame=author_s.querySelector("strong").innerText==authorId;
                    }else{
                        isSame=author_s.querySelector("strong").title.replace(/防伪码：/,"")==authorId;
                    }
                    if(isSame){
                        //author_s.nextSibling.nextSibling.style.display=shown?"none":"block";
                        if(shown){
                            author_s.parentNode.classList.add("hide");
                            if(changeBtn_s)changeBtn_s.innerHTML="显";
                        }else{
                            author_s.parentNode.classList.remove("hide");
                            if(changeBtn_s)changeBtn_s.innerHTML="隐";
                        }
                    }
                }
            };
            if(GM_getValue("jandanDis_"+authorId)){
                author.parentNode.classList.add("hide");
                changeBtn.innerHTML="显";
            }else{
                changeBtn.innerHTML="隐";
            }
        }
        return changeBtn;
    }

    if(isMobile){
        selector=".commentlist>li";
    }else{
        selector="div.author,.tucao-author-bar";
    }
    [].forEach.call(document.querySelectorAll(selector), item=>{
        checkBan(item);
    });
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records){
        records.map(function(record) {
            for(var i=0;i<record.addedNodes.length;i++){
                var curNode=record.addedNodes[i];
                if(curNode.className=="tucao-row"){
                    checkBan(curNode.querySelector(selector));
                }
            }
        });
    });
    var option = {
        'childList': true
    };
    var tucaoList=document.querySelector("div.tucao-list");
    if(tucaoList)observer.observe(tucaoList, option);
    $("body").on("mouseover", selector, e=>{
        let changeBtn=checkBan(e.currentTarget);
        changeBtn.style.display="initial";
        //console.log(e);
    });
    $("body").on("mouseout", selector, e=>{
        let author=e.currentTarget;
        let changeBtn = author.querySelector("#changeBtn");
        if(changeBtn)changeBtn.style.display="";
    });
    /*for(i=0;i<authors.length;i++){
        let author=authors[i];
        let changeBtn=document.createElement("a");
        changeBtn.href=`javascript:void(0);`;
        changeBtn.id="changeBtn";
        changeBtn.style.display="none";
        let authorId;
        if(isTucao){
            authorId=author.querySelector(".tucao-author").innerText;
            author.appendChild(changeBtn);
        }else{
            authorId=isTop?author.querySelector("strong").innerText:author.querySelector("strong").title.replace(/防伪码：/,"");
            author.insertBefore(changeBtn,author.querySelector("br"));
        }
        if(GM_getValue("jandanDis_"+authorId)){
            author.parentNode.classList.add("hide");
            changeBtn.innerHTML="显";
        }else{
            changeBtn.innerHTML="隐";
        }
        author.onmouseover=function(){
            changeBtn.style.display="block";
        };
        author.onmouseout=function(){
            changeBtn.style.display="none";
        };
        changeBtn.onclick=function(){
            var author_s,j,shown;
            if(author.parentNode.classList.contains("hide")){
                shown=false;
                GM_deleteValue("jandanDis_"+authorId);
            }else{
                shown=true;
                GM_setValue("jandanDis_"+authorId,true);
            }
            for(j=0;j<authors.length;j++){
                author_s=authors[j];
                if((isTucao && author_s.querySelector(".tucao-author").innerText==authorId) || !isTucao &&(
                    (!isTop && author_s.querySelector("strong").title.replace(/防伪码：/,"")==authorId) ||
                   (isTop && author_s.querySelector("strong").innerText==authorId))){
                    //author_s.nextSibling.nextSibling.style.display=shown?"none":"block";
                    if(shown){
                        author_s.parentNode.classList.add("hide");
                        author_s.querySelector("#changeBtn").innerHTML="显";
                    }else{
                        author_s.parentNode.classList.remove("hide");
                        author_s.querySelector("#changeBtn").innerHTML="隐";
                    }
                }
            }
        };
    }*/
    var left,top,src;
    var bigImg=document.createElement("img");
    bigImg.className="big_img";
    $("body").on("mouseover","img",e=>{
        if(isMobile)return;
        let img=e.currentTarget;
        src=img.src.replace(/\b(!(custom|square))\b/,"").replace(/\b(custom|square)\b/,"medium").replace(/\.sinaimg\.cn\/thumb\d+/,".sinaimg.cn/large");
        src=isHttps?src.replace(/http\:\/\//,"https://"):src.replace(/https\:\/\//,"http://");
        bigImg.src=img.src;
        bigImg.src=src;
        left=e.clientX;
        top=e.clientY;
        document.body.appendChild(bigImg);
        setTimeout(()=>{
            bigImg.style.opacity=1;
        },0);
        relocBigImg(left, top);
        getImgWH(bigImg,function(w,h){
            relocBigImg(left, top, w, h);
        });
        bigImg.onload=function(){
            relocBigImg(left, top);
        };
    });
    $("body").on("mouseout","img",e=>{
        if(isMobile)return;
        if(bigImg.parentNode){
            bigImg.style.opacity=0;
            bigImg.parentNode.removeChild(bigImg);
        }
        bigImg.removeAttribute("height");
        bigImg.removeAttribute("width");
    });
    $("body").on("mousemove","img",e=>{
        if(isMobile)return;
        left=e.clientX;
        top=e.clientY;
        if(!bigImg.src || bigImg.src===""){
            img.onmouseover(e);
        }
        relocBigImg(left, top);
    });
    /*for(i=0;i<imgs.length;i++){
        let img=imgs[i];
        img.onmouseover=function(e){
            src=img.src.replace(/\b(!(custom|square))\b/,"").replace(/\b(custom|square)\b/,"medium").replace(/\.sinaimg\.cn\/thumb\d+/,".sinaimg.cn/large");
            src=isHttps?src.replace(/http\:\/\//,"https://"):src.replace(/https\:\/\//,"http://");
            bigImg.src=img.src;
            bigImg.src=src;
            left=e.clientX;
            top=e.clientY;
            document.body.appendChild(bigImg);
            setTimeout(()=>{
                bigImg.style.opacity=1;
            },500);
            relocBigImg(left, top);
            getImgWH(bigImg,function(w,h){
                relocBigImg(left, top, w, h);
            });
            bigImg.onload=function(){
                relocBigImg(left, top);
            };
        };
        img.onmouseout=function(e){
            if(bigImg.parentNode){
                bigImg.style.opacity=0;
                bigImg.parentNode.removeChild(bigImg);
            }
            bigImg.removeAttribute("height");
            bigImg.removeAttribute("width");
        };
        img.onmousemove=function(e){
            left=e.clientX;
            top=e.clientY;
            if(!bigImg.src || bigImg.src===""){
                img.onmouseover(e);
            }
            relocBigImg(left, top);
        };
    }*/
    $("body").on("mouseover","div.gif-mask",function(e){
        if(isMobile)return;
        src=this.previousSibling.getAttribute("org_src").replace(/\b(!(custom|square))\b/,"").replace(/\b(custom|square)\b/,"medium").replace(/\.sinaimg\.cn\/(mw600|thumb\d+)/,".sinaimg.cn/large");
        src=isHttps?src.replace(/http\:\/\//,"https://"):src.replace(/https\:\/\//,"http://");
        bigImg.src=this.previousSibling.src;
        bigImg.src=src;
        document.body.appendChild(bigImg);
        setTimeout(()=>{
            bigImg.style.opacity=1;
        },0);
        getImgWH(bigImg,function(w,h){
            relocBigImg(left, top, w, h);
        });
        bigImg.onload=function(){
            relocBigImg(left, top);
        };
    });
    $("body").on("mouseout","div.gif-mask",function(e){
        if(isMobile)return;
        if(bigImg.parentNode){
            bigImg.style.opacity=0;
            bigImg.parentNode.removeChild(bigImg);
        }
        bigImg.removeAttribute("height");
        bigImg.removeAttribute("width");
    });
    $("body").on("mousemove","div.gif-mask",function(e){
        if(isMobile)return;
        if(e){
            left=e.clientX;
            top=e.clientY;
        }
        if(!bigImg.src || bigImg.src===""){
            this.onmouseover(e);
        }
        relocBigImg(left, top);
    });
    function relocBigImg(left, top, w, h){
        var imgWidth=w?w:bigImg.width;
        var imgHeight=h?h:bigImg.height;
        var type=imgHeight/imgWidth>document.documentElement.clientHeight/document.documentElement.clientWidth;
        if(type && imgHeight>document.documentElement.clientHeight){
            imgHeight=bigImg.height=document.documentElement.clientHeight;
        }
        if(!type && imgWidth>document.documentElement.clientWidth){
            imgWidth=bigImg.width=document.documentElement.clientWidth;
        }
        if(top-imgHeight<0){
            top=0;
        }else{
            top-=imgHeight;
        }
        if(left>document.documentElement.clientWidth/2){
            if(left+imgWidth>document.documentElement.clientWidth){
                left=document.documentElement.clientWidth-imgWidth;
            }
            left+=10;
        }else{
            left=left-imgWidth;
            if(left<0){
                left=0;
            }else left-=10;
        }
        bigImg.style.left=left+"px";
        bigImg.style.top=top+"px";
    }
    GM_addStyle(`
    .row.hide,.tucao-row.hide{
      opacity: 0.1;
    }
    .row.hide div.text,.tucao-row.hide .tucao-content,.tucao-row.hide .tucao-image,li.hide>.commenttext{
      display: none;
    }
    .row.hide:hover,.tucao-row.hide:hover{
      opacity: 0.5;
    }
    .tucao-author-bar #changeBtn{
      padding: 0 10px;
    }
    #changeBtn{
      display: none;
    }
    .big_img{
      pointer-events: none;
      position: fixed;
      z-index: 999;
      opacity: 0;
      transition: opacity .5s ease-in-out;
      -moz-transition: opacity .5s ease-in-out;
      -o-transition: opacity .5s ease-in-out;
      -webkit-transition: opacity .5s ease-in-out;
    }
    `);
})();