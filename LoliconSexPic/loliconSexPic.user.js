// ==UserScript==
// @name         loliconSexPic
// @namespace    hoothin
// @version      0.3
// @description  lolicon色图
// @author       hoothin
// @match        https://api.lolicon.app/setu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

//https://api.lolicon.app/setu/v2?r18=1&num=5

(function() {
    'use strict';
    GM_addStyle(".img-con{column-count: 5;-moz-column-count: 5;-webkit-column-count: 5;width: 100%;display: block;}img{-webkit-column-break-inside: avoid; break-inside: avoid; float: left; margin-bottom: 15px; margin-right: 15px; overflow: hidden; position: relative;}");
    var btns=document.createElement("div");
    var imgCon=document.createElement("div");
    var datas=JSON.parse(document.body.innerText).data;
    var referrerMeta=document.createElement("meta");
    referrerMeta.name="referrer";
    referrerMeta.content="never";
    document.head.appendChild(referrerMeta);

    btns.className="btns";
    document.body.appendChild(btns);
    var numInput=document.createElement("input");
    numInput.placeholder="Number of Sex pics";
    var r18Check=document.createElement("input");
    r18Check.type="checkbox";
    r18Check.id="r18Check";
    var r18CheckLabel=document.createElement("label");
    r18CheckLabel.innerHTML="R18 ";
    r18CheckLabel.htmlFor="r18Check";
    var sfwCheck=document.createElement("input");
    sfwCheck.type="checkbox";
    sfwCheck.id="sfwCheck";
    var sfwCheckLabel=document.createElement("label");
    sfwCheckLabel.innerHTML="SFW ";
    sfwCheckLabel.htmlFor="sfwCheck";
    var submit=document.createElement("button");
    submit.innerHTML="Refresh";
    submit.onclick=()=>{
        var num=numInput.value;
        var r18=2;
        if(sfwCheck.checked && !r18Check.checked){
            r18=0;
        }else if(!sfwCheck.checked && r18Check.checked){
            r18=1;
        }
        if(numInput.value != ""){
            location.href=`v2?r18=${r18}&num=${num}`;
        }else{
            location.reload();
        }
    };
    btns.appendChild(numInput);
    btns.appendChild(r18Check);
    btns.appendChild(r18CheckLabel);
    btns.appendChild(sfwCheck);
    btns.appendChild(sfwCheckLabel);
    btns.appendChild(submit);

    imgCon.className="img-con";
    document.body.appendChild(imgCon);
    datas.forEach(function(data){
        let img=document.createElement("img");
        img.src=data.urls?data.urls.original:data.url;
        img.style.width="100%";
        img.onclick=()=>{
            if(img.style.zIndex==1){
                img.style.zIndex=0;
                img.style.width="100%";
                img.style.position="";
                img.style.left="";
            }else{
                img.style.zIndex=1;
                img.style.width="";
                img.style.position="absolute";
                img.style.left=0;
            }
        };
        imgCon.appendChild(img);
    });
})();