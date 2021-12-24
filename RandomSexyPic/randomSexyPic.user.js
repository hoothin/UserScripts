// ==UserScript==
// @name         RandomSexyPic
// @namespace    hoothin
// @version      0.8
// @description  Random Sexy Pictures
// @author       hoothin
// @match        https://api.lolicon.app/setu/v2*
// @match        https://api.nyan.xyz/httpapi/sexphoto*
// @match        https://huanmengii.xyz/ZY/aCOS/cos*
// @match        https://api.uomg.com/api/rand.img3*
// @match        https://api.vvhan.com/api/tao*
// @match        https://www.hlapi.cn/api/mjx*
// @match        https://api.ghser.com/tao*
// @match        https://3650000.xyz/api/?*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @run-at       document-body
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
                var urls=jsonData.data.url;
                if(!urls instanceof Array){
                    urls=[urls];
                }
                urls.forEach(function(data){
                    createImg(data);
                });
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
            url:"https://api.uomg.com/api/rand.img3?format=json&num=15",
            run:()=>{
                var buyersShowApis=["https://api.uomg.com/api/rand.img3","https://api.vvhan.com/api/tao","https://www.hlapi.cn/api/mjx","https://api.ghser.com/tao"];
                r18Check.style.display=sfwCheck.style.display=r18CheckLabel.style.display=sfwCheckLabel.style.display="none";
                var searchNum=getSearchParam("num");
                for(var i=0;i<searchNum;i++){
                    var randomApi=Math.floor(Math.random()*buyersShowApis.length);
                    createImg(buyersShowApis[randomApi]+"?r="+Math.random());
                }
            },
            getSearch:(param)=>{
                return `${location.pathname}?format=json&num=${param.num}`;
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
                for(var i=0;i<searchNum;i++){
                    createImg("https://huanmengii.xyz/ZY/aCOS/cos/index.php?r="+Math.random());
                }
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
                var sleep=(fn,param,time)=>{
                    return new Promise((resolve) => {
                        setTimeout(() => resolve(fn(param)), time)
                    })
                }
                async function createImgs(num) {
                    while(num>0){
                        var loadNum=5;
                        if(num<5)loadNum=num;
                        num-=loadNum;
                        const slow = await sleep(loadNum=>{
                            for(let i=0;i<loadNum;i++){
                                createImg(`http://3650000.xyz/api/?mode=${searchMode}&r=${Math.random()}`);
                            }
                        },loadNum,1000);
                    }
                }
                createImgs(searchNum);
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
    var modeSelect=document.createElement("select");
    var submit=document.createElement("button");
    var referrerMeta=document.createElement("meta");
    var viewportMeta=document.createElement("meta");
    var overMask=document.createElement("div");
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
    btns.appendChild(modeSelect);
    btns.appendChild(submit);
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

    function createImg(url){
        let img=document.createElement("img");
        img.src=url;
        img.style.width="100%";
        img.onclick=()=>{
            window.scrollTo(0,0);
            if(img.style.zIndex==2){
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
                hasFloatImg=true;
                document.body.style.overflow="hidden";
                img.style.bottom=0;
                if(img.naturalWidth>document.documentElement.clientWidth || img.naturalHeight>document.documentElement.clientHeight){
                    img.style.zIndex=1;
                    img.style.maxWidth="100%";
                    img.style.maxHeight="100%";
                }else{
                    img.style.zIndex=2;
                    img.style.maxWidth="";
                    img.style.maxHeight="";
                }
                img.style.width="";
                img.style.position="absolute";
                img.style.margin="auto";
                overMask.style.display="block";
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

    GM_addStyle("@media screen and (min-width: 1024px) {.img-con{overflow: auto;column-count: 5;-moz-column-count: 5;-webkit-column-count: 5;width: 100%;display: block;}}@media screen and (max-width: 1024px) {.img-con{overflow: auto;column-count: 2;-moz-column-count: 2;-webkit-column-count: 2;width: 100%;display: block;}}select{display:none;}.over-mask{display:none;width: 100%; height: 100%; background-color: #000000e6; position: fixed; z-index: 1; top: 0; left: 0;}img{-webkit-column-break-inside: avoid; break-inside: avoid; float: left; margin-bottom: 15px; margin-right: 15px; overflow: hidden; position: relative; top: 0; left: 0; right: 0;}.btns{padding-bottom: 10px;}.btns>a{padding: 5px;}");

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