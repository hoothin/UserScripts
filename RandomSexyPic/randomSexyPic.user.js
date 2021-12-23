// ==UserScript==
// @name         RandomSexyPic
// @namespace    hoothin
// @version      0.6
// @description  Random Sexy Pictures
// @author       hoothin
// @match        https://api.lolicon.app/setu*
// @match        https://api.nyan.xyz/httpapi/sexphoto*
// @match        https://huanmengii.xyz/ZY/aCOS/cos*
// @match        https://api.uomg.com/api/rand.img3*
// @match        https://api.vvhan.com/api/tao*
// @match        https://www.hlapi.cn/api/mjx*
// @match        https://api.ghser.com/tao*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @run-at       document-start
// @license      MIT
// ==/UserScript==


(function() {
    'use strict';
    var setuConfig={
        "api.lolicon.app":{
            name:"Lolicon ACG SexyPic",
            url:"https://api.lolicon.app/setu/v2?r18=1&num=5",
            run:()=>{
                if(jsonData){
                    var datas=jsonData.data;
                    datas.forEach(function(data){
                        let img=createImg(data.urls?data.urls.original:data.url);
                        img.title=data.title+" - "+data.author;
                    });
                }else{
                    location.href=curConfig.url;
                }
            },
            getSearch:(r18, num)=>{
                return `v2?r18=${r18}&num=${num}`;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                var searchR18=getSearchParam("r18");
                numInput.value=searchNum;
                r18Check.checked=searchR18==1||searchR18==2;
                sfwCheck.checked=searchR18==0||searchR18==2;
            }
        },
        "api.nyan.xyz":{
            name:"Nyan ACG SexyPic",
            url:"https://api.nyan.xyz/httpapi/sexphoto/?r18=true&num=5",
            run:()=>{
                var urls=jsonData.data.url;
                if(!urls instanceof Array){
                    urls=[urls];
                }
                urls.forEach(function(data){
                    createImg(data);
                });
            },
            getSearch:(r18, num)=>{
                return `?r18=${r18!=0?"true":"false"}&num=${num}`;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                var searchR18=getSearchParam("r18");
                numInput.value=searchNum;
                r18Check.checked=searchR18=="true";
                sfwCheck.checked=searchR18=="false";
            }
        },
        "buyersShow":{
            name:"Taobao Buyers Show",
            url:"https://api.uomg.com/api/rand.img3?format=json&num=10",
            run:()=>{
                var buyersShowApis=["https://api.uomg.com/api/rand.img3","https://api.vvhan.com/api/tao","https://www.hlapi.cn/api/mjx","https://api.ghser.com/tao"];
                r18Check.style.display=sfwCheck.style.display=r18CheckLabel.style.display=sfwCheckLabel.style.display="none";
                var searchNum=getSearchParam("num");
                for(var i=0;i<searchNum;i++){
                    var randomApi=Math.floor(Math.random()*buyersShowApis.length);
                    createImg(buyersShowApis[randomApi]+"?r="+Math.random());
                }
            },
            getSearch:(r18, num)=>{
                return location.pathname+"?format=json&num="+num;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                numInput.value=searchNum;
            }
        },
        "api.uomg.com":"buyersShow",
        "api.vvhan.com":"buyersShow",
        "www.hlapi.cn":"buyersShow",
        "api.ghser.com":"buyersShow",
        "huanmengii.xyz":{
            name:"Cosplay Show",
            url:"https://huanmengii.xyz/ZY/aCOS/cos/cos.php?num=10",
            run:()=>{
                r18Check.style.display=sfwCheck.style.display=r18CheckLabel.style.display=sfwCheckLabel.style.display="none";
                var searchNum=getSearchParam("num");
                for(var i=0;i<searchNum;i++){
                    createImg("https://huanmengii.xyz/ZY/aCOS/cos/index.php?r="+Math.random());
                }
            },
            getSearch:(r18, num)=>{
                return "cos.php?num="+num;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                numInput.value=searchNum;
            }
        }
    };
    var curConfig=setuConfig[document.domain],jsonData,hasFloatImg=false;
    if(!curConfig.run)curConfig=setuConfig[curConfig];
    document.title=curConfig.name;
    try{
        jsonData=JSON.parse(document.body.innerText);
    }catch{}
    document.body.innerHTML="";
    var imgCon=document.createElement("div");
    var btns=document.createElement("div");
    var numInput=document.createElement("input");
    var r18Check=document.createElement("input");
    var r18CheckLabel=document.createElement("label");
    var sfwCheck=document.createElement("input");
    var sfwCheckLabel=document.createElement("label");
    var submit=document.createElement("button");
    var referrerMeta=document.createElement("meta");
    for(var name in setuConfig){
        if(!setuConfig[name].run)continue;
        var siteA=document.createElement("a");
        siteA.href=setuConfig[name].url;
        siteA.innerHTML=setuConfig[name].name;
        btns.appendChild(siteA);
    }
    btns.appendChild(numInput);
    btns.appendChild(r18Check);
    btns.appendChild(r18CheckLabel);
    btns.appendChild(sfwCheck);
    btns.appendChild(sfwCheckLabel);
    btns.appendChild(submit);
    referrerMeta.name="referrer";
    referrerMeta.content="never";
    document.head.appendChild(referrerMeta);

    curConfig.run();
    if(curConfig.initSearch)curConfig.initSearch();

    function createImg(url){
        let img=document.createElement("img");
        img.src=url;
        img.style.width="100%";
        img.onclick=()=>{
            window.scrollTo(0,0);
            if(img.style.zIndex==2){
                img.style.zIndex=0;
                img.style.width="100%";
                img.style.position="";
                hasFloatImg=false;
                img.scrollIntoView();
            }else if(img.style.zIndex==1){
                img.style.width="";
                img.style.zIndex=2;
            }else{
                if(hasFloatImg)return;
                hasFloatImg=true;
                if(img.naturalWidth>document.documentElement.clientWidth){
                    img.style.zIndex=1;
                }else{
                    img.style.width="";
                    img.style.zIndex=2;
                }
                img.style.position="absolute";
            }
        };
        imgCon.appendChild(img);
        return img;
    }

    function getSearchParam(name){
        let reg = new RegExp("(&|^)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        };
        return null;
    }

    function submitParam(){
        var num=numInput.value;
        var r18=2;
        if(sfwCheck.checked && !r18Check.checked){
            r18=0;
        }else if(!sfwCheck.checked && r18Check.checked){
            r18=1;
        }
        if(numInput.value != ""){
            location.href=curConfig.getSearch(r18, num);
        }else{
            location.reload();
        }
    }

    GM_addStyle(".img-con{column-count: 5;-moz-column-count: 5;-webkit-column-count: 5;width: 100%;display: block;}img{-webkit-column-break-inside: avoid; break-inside: avoid; float: left; margin-bottom: 15px; margin-right: 15px; overflow: hidden; position: relative; top: 0; left: 0; right: 0; margin: auto;}.btns{padding-bottom: 10px;}.btns>a{padding: 5px;}");

    btns.className="btns";
    document.body.appendChild(btns);
    numInput.placeholder="Number of Sex pics";
    r18Check.type="checkbox";
    r18Check.id="r18Check";
    r18CheckLabel.innerHTML="R18 ";
    r18CheckLabel.htmlFor="r18Check";
    sfwCheck.type="checkbox";
    sfwCheck.id="sfwCheck";
    sfwCheckLabel.innerHTML="SFW ";
    sfwCheckLabel.htmlFor="sfwCheck";
    submit.innerHTML="Refresh";
    submit.onclick=submitParam;
    document.onkeyup = function(e) {
        var event = e || window.event;
        var key = event.which || event.keyCode || event.charCode;
        if (key == 13) {
            submitParam();
        }
    };

    imgCon.className="img-con";
    document.body.appendChild(imgCon);
})();