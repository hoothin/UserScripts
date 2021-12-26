// ==UserScript==
// @name         RandomSexyPic
// @namespace    hoothin
// @version      1.3.2
// @description  Random Sexy Pictures
// @author       hoothin
// @include      https://api.lolicon.app/setu/v2*
// @include      https://api.nyan.xyz/httpapi/sexphoto*
// @include      https://huanmengii.xyz/ZY/aCOS/cos*
// @include      https://api.uomg.com/api/rand.img3*
// @include      https://api.vvhan.com/api/tao*
// @include      https://www.hlapi.cn/api/mjx*
// @include      https://3650000.xyz/api/?*
// @icon         data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABgcICQX/xAAsEAABAwMEAQIFBQEAAAAAAAABAgMEBQYRAAcSITEIQRMUIjJRIyRCYYHB/8QAFgEBAQEAAAAAAAAAAAAAAAAABgQF/8QAIxEAAgEDBAEFAAAAAAAAAAAAAQMCABESBCFBUQUVMWHB8P/aAAwDAQACEQMRAD8AHNrPQdFYZlXBX6fJuRqns/NhptIUmSodhCG0nsdeCcqOAPOnVLvK3r227YVFjy6OEpLaWavEMKU2cY4utn7eseMjAHeq7vuaxtDs/VnaRSG6nIp9MffjwnMhD7jTKlpQsgZ7KcfnWQFv+sO6d0txKOxcFuw7ibqUpDUmPT4vwnWStQT+ksKJPHOfqB6Hf50Qd4vUOjlKWUj3x8Dik6PIJhO2Nojr7qo6fGtG1YUVNSrcJMl7PAzpjcZtPXkKUQCP+6CNz7Ttq+rdmP1iOKnDhq5iTBd5OMjoFbS0+evbvIGmfbm2dgVrcmq29W4MauJSwWYqpzaHUK4r+ocVAgE9eOzpmVnYaj2zt4qZQ4saOWnlhuBGYRHa+AnyPhoAGcknx3qD05qEiUY2MeR+vWgNeljTAm4l3T6vCDG3k2YffoFQfDdRhplQ5UNYK1j7hxPvyHX+6yhqm3tV2XuqrV2mJpLkpt1TiXFMltb5UMlOBnifOR1351f3owrEmgekbb52mKXVG2qU0ostjms9q5cO++8jGkp6lrQtLca6H7lp8gUCsrBcqESYSxyUPKig/wAseT76ZLcJQBB3omV4zsfapo2gq993nuhR6vUGl01EV/5pNOhO/uJCgfpSpRGG289n+vfV/wBs3LMNoNxn1olzo6HEvSgrkyHVrJWEqx2lOeIPvjU02Kzbe3VBkvPzIkl+SOSni5kke3+f1jXN3i9Vsdi2GqDakOUoBHFElCShAI8qB/GfbUmoeFrMb7mrFJLGAgbCv//Z
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @license      MIT
// ==/UserScript==


(function() {
    'use strict';
    var setuConfig={
        "api.lolicon.app":{
            name:"Lolicon ACG SexyPic",
            url:"https://api.lolicon.app/setu/v2?r18=1&num=5",
            run:()=>{
                var searchNum=getSearchParam("num");
                var leftNum=searchNum;
                if(jsonData != "Forbidden"){
                    let datas=jsonData.data;
                    datas.forEach(function(data){
                        leftNum--;
                        let img=createImg(data.urls?data.urls.original:data.url);
                        img.title=data.title+" - "+data.author;
                    });
                }else{
                    location.href=curConfig.url;
                }
                processByTime(leftNum,loadNum=>{
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: curConfig.url.replace("num=5","num="+loadNum),
                        timeout:15000,
                        onload: function(result) {
                            let datas=JSON.parse(result.responseText).data;
                            datas.forEach(function(data){
                                let img=createImg(data.urls?data.urls.original:data.url);
                                img.title=data.title+" - "+data.author;
                            });
                        }
                    });
                },5,1000);
            },
            getSearch:(param)=>{
                return `v2?r18=${param.r18}&num=${param.num}`;
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
                var searchNum=getSearchParam("num");
                var leftNum=searchNum;
                var urls=jsonData.data.url;
                if(!urls instanceof Array){
                    urls=[urls];
                }
                urls.forEach(function(data){
                    leftNum--;
                    createImg(data);
                });
                processByTime(leftNum,loadNum=>{
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: curConfig.url.replace("num=5","num="+loadNum),
                        timeout:15000,
                        onload: function(result) {
                            urls=JSON.parse(result.responseText).data.url;
                            urls.forEach(function(data){
                                createImg(data);
                            });
                        }
                    });
                },5,1000);
            },
            getSearch:(param)=>{
                return `?r18=${param.r18!=0?"true":"false"}&num=${param.num}`;
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
            urls:["https://api.uomg.com/api/rand.img3?format=json&num=15",
                 "https://api.vvhan.com/api/tao?type=json&num=15",
                 "https://www.hlapi.cn/api/mjx1?type=json&num=15"],
            run:()=>{
                r18Check.style.display=sfwCheck.style.display=r18CheckLabel.style.display=sfwCheckLabel.style.display="none";
                var searchNum=getSearchParam("num");
                processByTime(searchNum,loadNum=>{
                    for(let i=0;i<loadNum;i++){
                        createImg(location.href.replace(/1?\?.*/,"?")+"r="+Math.random());
                    }
                },5,1000);
            },
            getSearch:(param)=>{
                return location.href.replace(/\d+$/,"")+param.num;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                numInput.value=searchNum;
            }
        },
        "huanmengii.xyz":{
            name:"Cosplay Show",
            url:"https://huanmengii.xyz/ZY/aCOS/cos/?type=json&num=15",
            run:()=>{
                r18Check.style.display=sfwCheck.style.display=r18CheckLabel.style.display=sfwCheckLabel.style.display="none";
                var searchNum=getSearchParam("num");
                processByTime(searchNum,loadNum=>{
                    for(let i=0;i<loadNum;i++){
                        createImg("https://huanmengii.xyz/ZY/aCOS/cos/index.php?r="+Math.random());
                    }
                },5,1000);
            },
            getSearch:(param)=>{
                return "?type=json&num="+param.num;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                numInput.value=searchNum;
            }
        },
        "3650000.xyz":{
            name:"3650000",
            url:"https://3650000.xyz/api/?type=json&mode=7&num=15",
            run:()=>{
                r18Check.style.display=sfwCheck.style.display=r18CheckLabel.style.display=sfwCheckLabel.style.display="none";
                var searchNum=getSearchParam("num");
                var searchMode=getSearchParam("mode");
                processByTime(searchNum,loadNum=>{
                    for(let i=0;i<loadNum;i++){
                        createImg(`http://3650000.xyz/api/?mode=${searchMode}&r=${Math.random()}`);
                    }
                },5,1000);
            },
            getSearch:(param)=>{
                return location.pathname+`?type=json&mode=${param.mode}&num=${param.num}`;
            },
            initSearch:()=>{
                var searchNum=getSearchParam("num");
                var searchMode=getSearchParam("mode");
                var modeObj=[
                    ["Public",""],
                    ["Weibo","1"],
                    ["Instagram","2"],
                    ["Cosplay","3"],
                    ["Nsfw","66"],
                    ["Mtcos","5"],
                    ["Legs","7"],
                    ["MoreCoser","8"],
                    ["Tuwan","9"]
                ];
                modeObj.forEach(item=>{
                    var option=document.createElement("option");
                    option.value=item[1];
                    option.innerHTML=item[0];
                    if(item[1]==searchMode){
                        option.selected=true;
                    }
                    modeSelect.appendChild(option);
                });
                modeSelect.style.display="inline";
                numInput.value=searchNum;
            }
        },
        "api.uomg.com":"buyersShow",
        "api.vvhan.com":"buyersShow",
        "www.hlapi.cn":"buyersShow",
        "api.ghser.com":"buyersShow"
    };
    var curConfig=setuConfig[document.domain],jsonData,hasFloatImg=false;
    if(!curConfig.run)curConfig=setuConfig[curConfig];
    document.title=curConfig.name;
    try{
        var firstText = "";
        for (var i = 0; i < document.body.childNodes.length; i++) {
            var curNode = document.body.childNodes[i];
            if (curNode.nodeType == 1 || curNode.nodeName == "PRE") {
                firstText = curNode.nodeValue || curNode.innerText;
                break;
            }
        }
        jsonData=JSON.parse(firstText);
    }catch(e){
        console.log(e);
        jsonData = firstText;
    }
    document.body.innerHTML="";
    var imgCon=document.createElement("div");
    var btns=document.createElement("div");
    var numInput=document.createElement("input");
    var r18Check=document.createElement("input");
    var r18CheckLabel=document.createElement("label");
    var sfwCheck=document.createElement("input");
    var sfwCheckLabel=document.createElement("label");
    var modeSelect=document.createElement("select");
    var submit=document.createElement("button");
    var referrerMeta=document.createElement("meta");
    var viewportMeta=document.createElement("meta");
    var overMask=document.createElement("div");
    var homepage=document.createElement("a");
    for(var name in setuConfig){
        var config=setuConfig[name];
        if(!config.run)continue;
        var siteA=document.createElement("a");
        var url=config.url;
        if(config.urls){
            var randomIndex=Math.floor(Math.random()*config.urls.length);
            url=config.urls[randomIndex];
            config.url=url;
        }
        siteA.href=url;
        siteA.innerHTML=config.name;
        btns.appendChild(siteA);
    }
    btns.appendChild(numInput);
    btns.appendChild(r18Check);
    btns.appendChild(r18CheckLabel);
    btns.appendChild(sfwCheck);
    btns.appendChild(sfwCheckLabel);
    btns.appendChild(modeSelect);
    btns.appendChild(submit);
    btns.appendChild(homepage);
    overMask.className="over-mask";
    imgCon.appendChild(overMask);
    referrerMeta.name="referrer";
    referrerMeta.content="never";
    document.head.appendChild(referrerMeta);
    viewportMeta.name="viewport";
    viewportMeta.content="width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);

    curConfig.run();
    if(curConfig.initSearch)curConfig.initSearch();

    function sleep(fn,param,time) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(fn(param)), time)
        })
    }
    async function processByTime(num,fn,limit,time) {
        while(num>0){
            var loadNum=limit;
            if(num<limit)loadNum=num;
            num-=loadNum;
            await sleep(fn,loadNum,time);
        }
    }

    overMask.onclick=e=>{
        if(hasFloatImg){
            restoreImg(hasFloatImg);
        }
    };

    function restoreImg(img){
        hasFloatImg=false;
        img.style.zIndex=0;
        img.style.bottom="";
        img.style.width="100%";
        img.style.position="";
        img.style.margin="";
        img.scrollIntoView();
        document.body.style.overflow="";
        imgCon.style.maxHeight="";
        imgCon.style.maxWidth="";
        overMask.style.display="none";
        overMask.style.opacity=0;
        img.className="list-show";
    }

    function createImg(url){
        let img=document.createElement("img");
        img.src=url;
        img.className="list-show";
        img.style.width="100%";
        img.onclick=()=>{
            window.scrollTo(0,0);
            if(img.style.zIndex==2){
                restoreImg(img);
            }else if(img.style.zIndex==1){
                img.style.bottom="";
                img.style.width="";
                img.style.maxWidth="";
                img.style.maxHeight="";
                img.style.zIndex=2;
                document.body.style.overflow="";
                imgCon.style.maxHeight="100vh";
                imgCon.style.maxWidth="100vw";
            }else{
                if(hasFloatImg)return;
                hasFloatImg=img;
                document.body.style.overflow="hidden";
                img.style.bottom=0;
                if(img.naturalWidth>document.documentElement.clientWidth || img.naturalHeight>document.documentElement.clientHeight){
                    img.style.zIndex=1;
                    img.style.maxWidth="99%";
                    img.style.maxHeight="99%";
                }else{
                    img.style.zIndex=2;
                    img.style.maxWidth="";
                    img.style.maxHeight="";
                }
                img.style.width="";
                img.style.position="absolute";
                img.style.margin="auto";
                overMask.style.display="block";
                img.className="";
                setTimeout(()=>{
                    overMask.style.opacity=1;
                }, 0);
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
        return "";
    }

    function submitParam(){
        var num=numInput.value,mode;
        if(modeSelect.options.length>0){
            mode=modeSelect.options[modeSelect.selectedIndex].value;
        }
        var r18=2;
        if(sfwCheck.checked && !r18Check.checked){
            r18=0;
        }else if(!sfwCheck.checked && r18Check.checked){
            r18=1;
        }
        if(numInput.value != ""){
            location.href=curConfig.getSearch({"r18":r18, "num":num, "mode":mode});
        }else{
            location.reload();
        }
    }

    GM_addStyle(`
    @media screen and (min-width: 1024px) {
      .img-con{
        overflow: auto;column-count: 5;
        -moz-column-count: 5;
        -webkit-column-count: 5;
        width: 100%;
        display: block;
      }
    }
    @media screen and (max-width: 1024px) {
      .img-con{
        overflow: auto;
        column-count: 2;
        -moz-column-count: 2;
        -webkit-column-count: 2;
        width: 100%;
        display: block;
      }
    }
    body{
      background: black;
    }
    select{
      display: none;
      height: 29px;
      border-radius: 3px 0 0 3px;
      -moz-border-radius: 3px 0 0 3px;
      -webkit-border-radius: 3px 0 0 3px;
      -ms-border-radius: 3px 0 0 3px;
      -o-border-radius: 3px 0 0 3px;
      border: none;
      color: #cacaca;
      background-color: #363636;
      font-size: 14px;
      outline: 0;
      padding: 2px 5px;
      vertical-align: top;
    }
    .over-mask{
      display: none;
      opacity: 0;
      width: 100%;
      height: 100%;
      background-color: #000000e6;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      transition: opacity .3s ease-in-out;
      -moz-transition: opacity .3s ease-in-out;
      -webkit-transition: opacity .3s ease-in-out;
    }
    .list-show:hover{
      opacity: 1;
    }
    .list-show{
      opacity: 0.6;
      transition: opacity .3s ease-in-out;
      -moz-transition: opacity .3s ease-in-out;
      -webkit-transition: opacity .3s ease-in-out;
    }
    img{
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
      float: left;
      margin-bottom: 15px;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
    }
    .btns{
      padding: 10px 0;
      text-align: center;
      line-height: 30px;
      position: fixed;
      z-index: 1;
      width: 100%;
      top: 0;
      left: 0;
      background: #000000de;
    }
    .btns>a{
      padding: 5px;
      background: #f8981e;
      color: black;
      border-radius: 5px;
      font-weight: bold;
      text-decoration: none;
      margin: 1px;
    }
    .btns>a:hover{
      background: #ffa31a;
    }
    label{
      background: #f8981e;
      color: black;
      border-radius: 5px;
      font-weight: bold;
      text-decoration: none;
      padding: 3px;
    }
    input[type=checkbox]{
      width:20px;
      height:20px;
      vertical-align: top;
    }
    input[type=number]{
      width: 50px;
      height: 25px;
      border-radius: 3px 0 0 3px;
      -moz-border-radius: 3px 0 0 3px;
      -webkit-border-radius: 3px 0 0 3px;
      -ms-border-radius: 3px 0 0 3px;
      -o-border-radius: 3px 0 0 3px;
      border: none;
      color: #cacaca;
      background-color: #363636;
      display: inline-block;
      font-size: 14px;
      outline: 0;
      padding: 2px 5px;
      vertical-align: top;
      margin: 0 5px;
    }
    button{
      cursor: pointer;
      background: #0075ff;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      text-decoration: none;
      padding: 6px;
      margin: 0px 10px 0 10px;
      border: 0;
    }`);

    btns.className="btns";
    document.body.appendChild(btns);
    homepage.innerHTML="Homepage";
    homepage.href="https://sleazyfork.org/en/users/8227-hoothin";
    homepage.target="_blank";
    numInput.type="number";
    numInput.title=numInput.placeholder="Number of sexy pictures";
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