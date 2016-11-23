// ==UserScript==
// @name         Easy offline
// @name:zh-CN   一键离线下载
// @name:zh-TW   一鍵離綫下載
// @description  Be easy to find out all magnet links and torrents and video links in current page, and stream them from cloud storage automatically.
// @description:zh-CN 一键自动将磁链、bt种子或其他下载资源离线下载至网盘
// @description:zh-TW 一鍵自動將磁鏈、bt種子或其他下載資源離綫下載至網槃
// @namespace    http://tampermonkey.net/
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version      1.0.39
// @author       Hoothin
// @mail         rixixi@gmail.com
// @include      http*://*/*
// @exclude      http*://www.baidu.*
// @exclude      http*://www.google.*
// @exclude      http*://www.bing.*
// @include      http*://pan.baidu.com/*
// @include      http*://115.com/*
// @include      https://www.furk.net/*
// @include      https://www.seedr.cc/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_deleteValue
// @grant        unsafeWindow
// @supportURL   http://www.hoothin.com
// @license      MIT License
// @compatible        chrome
// @compatible        firefox
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==
(function() {
    'use strict';
    var sites={
        0:{
            name:"baidu",
            url:"https://pan.baidu.com/disk/home",
            bgColor:"ffffff",
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABjFBMVEX////7+/v+/v/8/Pwyf/wzc/w0bvza5f4xffz5+//0+P8ybPz8/f4yevw0cPwza/z39/cwe/UxdfzSPyr4+v/2+f/m7/53nv0vf/wvce9pof1tlPwxf/gzfPYwePPp8f7Z5/7S4v7P4P7L3f7I2f2Gtf2Rr/1hkP0yd/1FiPwygfxAdPxspftYkvUtc/Dg6f7C2f7F1f54oP1flf0/hfwsbu7i7f/w9f7b5v7X5f7V4v6nyv6oxv6jwP6Ns/2Lsf1/rv1+ov1zof1xof10nf1jm/1djP0xe/2NufxalvxHj/xPhvxKgPxHffw+efw0ePyXu/mqxPg5hfiTtvdyo/dgmfdOj/dBhfVflfQvefT+9fOIqvMyefNMhvFIgO9MeePyycVjZbzKb3DaZVa/Q0Dx9f+Bp/1olv1gkPw0dvzg6Pu2zPk0gflNjPctc/c9gfX88/JJfO3n3+ni2unHxuSGktNpdtBJY8paashRW71nXqp7YpyDYJKpaIKPU33AVFXARkTVTTvFQjrUPypKwHq1AAACAklEQVQ4y4WTB3OqQBSFF3BpAk+KIBixJ2rs0fTee68vvbzee+9//O1Cio46npmFPfd8d2cY9gIASMJHUESDKFQmAZJAUKCFKELA/WSr3A3d/tZnAF99C8fVHYhiosbxxflsdr7I15SIWiCe3exA2szGmwOJXTkUkvHaTTQD9NyBLO/t7OzJ8kFObwKs2/bRdrSvL7p9ZNvrjQC/n8/nwngXzuXz+3wDED42zS13u2Wax+EGQD+pmhvudsOsnuj1gBAZSp5+/XRIYkMeVu1XyaGIcAfoycVM4Pn3qx9vcW3gRUcmE8gsJvUboNfyeDyBwLd/6sX7wtNnC45DD6vXBbRx1sOmrQ+/VFX9efomhFzFstLoNa45QKzCijMx/vXZpar+/fKSZecWijwfmxHZSgzFFBgWxXQUIJ39UX9/nhPFngHsomlRHEYxRY6mlCkOl+5fXp2vraV6IgCLm1JSoyQGxhRlUnCAi/PUEwXnWMKkooxhAIxAuNSPS+8+Qgi7GOB3zutfgnAExQSIr0JoMJw2GJSghPLSo4eDGscYEK7Gna/gy7QkLRvTK5JEP2bAgy4vvTJtLCNX5h0AMLNemvbihfqBv3zjZpHDACKM7ntI3RMFgFSYcJ3B3P0sf6kzGOxM+AFwXAK7kuNurz2pcWTt7deuna/t4LQdvbbD23b8/wPY0UTO99dD5gAAAABJRU5ErkJggg=="
        },
        1:{
            name:"pcloud",
            url:"https://my.pcloud.com/",
            bgColor:"f1f1f1",
            noMag:true,
            noEd2k:true,
            noFtp:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEX///////8bytT///8fy9UbytQbytQfy9Ufy9UmzNYbytQgy9UizNUbytT///8bytQey9Ufy9Ugy9VG1NxB09sbytRg2uFS194bytT///9G1Nzx/Pzi+PpT19+c6OxZ7rqXAAAAGHRSTlMBG/AHxYAh49O3oWJBMRUR4bOLYV9RQz9fW5zbAAAAbUlEQVQY043MRxLCMBBE0WYkOQcyXybc/5hIhUuww2/3u2pGG1WdYV1VujcyG9ceWdmcM8jDK8bHE0LqCzMQF5Y7NOnNgeE7MATBMQ+fE/q9wCwNkDUetUAZPLVuxq+z3LWlqE9OctOumFL/9QYClwvt3NkDkgAAAABJRU5ErkJggg=="
        },
        2:{
            name:"yyw",
            url:"http://115.com/?tab=offline&mode=wangpan",
            bgColor:"21458a",
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUhRYr///+XqcjV3OmJnMFTb6QoS45PbKLu8fbZ4OvBy95xiLRifKxbdqlXcqYxU5P3+Prh5u/O1uXH0eK6xduks89/lLtGZJ4ysMfhAAAAVUlEQVQY04WPSQ6AMAwD6ySkdKHs8P+fckyDhPBtRoojhyG4GP6FEjPvxhGZiKKJPM7uoAHYSif0Lgdw+tppQfOGIF4ILsea3CetvMa+UaRq+Mh7/gPkxAHFh9WDUQAAAABJRU5ErkJggg=="
        },
        3:{
            name:"furk",
            url:"https://www.furk.net/users/files/add",
            bgColor:"f1f1f1",
            hide:false,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAflBMVEX///+CuuaGv+rjXKniTaiDu+d3tufiXq/nUqxAn9+t1vGiz/FOnt/sj8nol8bhcLJRo97b7vp5uOpCoeGQw+m31/XW6/er0++Iwe330uZUpuHssNjni8Tqf7/o9Pn68PSUx+732eucyuvzzuJjq+H0v97sm8q12vDto8/rcrjt831UAAABmUlEQVRIx+2T6W6DMBCE8dr4aEgw0KS5kzZH2/d/we7aliJlN6KR+rNjgYwYfxrwuPrXXwkeaC7ba1nqU7YrWfV83N6rm95G7ZCWlNnL6Kfa20zBA7tNEl7KSsjl5In/rsBOnqArtfx1GGXVGH112Wwuq2KnMMDp2nnUtaquOsttchik15yeLGZ68tpp7403elXo4pZn5Ld3zpg03VWFjkOme51kcGj/nu1p7wF6QPU0cjKDVIyBRrfbtdptM4XYqYIoSKP+KHQ04X17wKfDF8JJYJUt9cqrVH2sUOg0hJ4Ju5rNRSWMIb9r70uA4a2lRRSrx9stDF6ne7tCrz12XbdfLPbdAicVCdFEr5gdQGq306Qt6wz5gR81+t2tmXI6SbLT5sx4ga1YMdNidM/sAMQXOmOoBVPxeMidaaUwFsSjbVBa+NS0RdyequgYXS0pjhSmlegWcKxfRbrmdFBwjpHbMblEV+cQwiDSnUBfD8PQNMDtVBpOH2IYhjVInZHosYkxBh7GGZEeGpRg161Ib0ITQhTCMPrz+gG1shF4koHETAAAAABJRU5ErkJggg=="
        },
        4:{
            name:"seedr",
            url:"https://www.seedr.cc/files",
            bgColor:"ca2a15",
            hide:false,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAllBMVEXGKBPGKBPGKBPGKBPORDLJMh3uv7nQTDvILRjprKPmoZjbdmnLOyjKNSHtvLbrtK3opp3lm5Hhj4Tac2XZb2HXalvUXEzLOibGKBPGKBPGKBPqsarjlovehHjXaFnTWkrMQC3GKBPGKBPGKBP////44+H77u323Nj01dHxycP88vH66+n23dr019Tyz8rxzMfvw73vwrxYVj9BAAAAJHRSTlP7yb+j+/v9+/v9/f37+/39/f39/f39+/uxmSj9/f37+/uXNR2Gd9E6AAAAmUlEQVQY003NVxKDMAxFUQVsbHqv6YkMIT3731wEZoD7oZl3fgQXY7PKaKACKn93BxirwaArWsQXH8EcYYeUu4BnDRAsUKgBWjZDeqfduXKGmHbPT3YiJ9giPtj+qUJWavghxoUSHFxLAz3JIgcAypsGBzF3bAJvAvHB5PiVnm8HGoBZIffTVvWMoIIhX4KIMg5whsbcrKqvf29uDBcu2+SAAAAAAElFTkSuQmCC"
        },
        5:{
            name:"xunlei",
            url:"http://lixian.vip.xunlei.com/lixian_login.html?furl=",
            bgColor:"2e71f1",
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABC1BMVEUAAAArcPUscPQkavJSd79UdrhTdrled6kjae8ucfAqbOwoa+0pa+xTd71WdrNad61dea4pbO4vcvEsb/Aqbe8sbu8ucfArbu8ucfEpbe0oa+4vcPH///4ZYe7j8fne7fknbPAkaO41dfDa6vgcY+/o8/rV6PchZ+4bZO79//3u+fklavIiaO8VXu3x9/3t9fve7veLsfYqcfZNhvE5d/AfZO36/fz0+/ry+vrb6PrG2vnR5fbL4faXufbG3fWqyPWjw/WErPWixPR4pPR0ovOIsfJsnPJYj+9Bfe/1+v3l7f3p8Pzg7fq+0/mlw/fY6/aQtPaHrfZnl/S41fORt/KAqvKZvvFJhO8eZe4RVCzFAAAAEXRSTlMA+P74gnpzWP329OrohXJgXOQVaEcAAAFOSURBVCjPZczneoIwGIbhqNXuEQORYGIBQXDvvbfde5z/kfSTi1Kx9798z/UGIXQQUuJBSiiGwDmEPUklFIVFDcI/4doVqilUCSIFArdjlAxQFE1Ir41EMhlGlFKiEerRhPFy29O3byiyUTccx9HiVBbxYYm3jAL1ilyvPlerhl1wFnec83mRuoUQSgr2lPP7Bn3g2dJNtm6TLSggUXzMZrtdXi6X+dCR/QLEtGV1SpZltXvfGtkt5qSdcnXmpmlit8guc5K79vTHK0OCk1eaq1x6q2LlUunBUsZQEi5sj3MZMJp9bLCuynCCjUvX3yuVzKBRFLqK4TNvA+Qj8TV7Si1E4heSfKZYj/pUlzxQfFjQt2XRL/iPJDXVz43tvRBmO6SmsdaZS0N5zHZnOpMwYNoJiuU1pu5j+fwhQtGIynAQUyMXCFyeqntFPYPFD095Qx8x+n7CAAAAAElFTkSuQmCC"
        },
    };
    var enableUrl = 'a[href^="magnet"],[href^="ed2k://|file"],[href$=".torrent"],[href$=".mp4"],[href$=".rar"],[href$=".7z"],[href$=".zip"],[href$=".rmvb"],[href$=".mkv"],[href$=".avi"],[href$=".iso"]';
    var disableUrl=[".torrentkitty.","bt.box.n0808.com"];
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    $=jQuery;
    switch (lang){
        case "zh-CN":
            i18n={
                toggle:"显示或隐藏一键离线按钮",
                yyw:"115网盘",
                baidu:"百度网盘",
                furk:"Furk网盘",
                seedr:"Seedr网盘",
                pcloud:"Pcloud网盘",
                xunlei:"迅雷离线"
            };
            break;
        default:
            i18n={
                toggle:"Toggle visibility of EasyOffline",
                yyw:"115",
                baidu:"BaiduPan",
                furk:"Furk",
                seedr:"Seedr",
                pcloud:"Pcloud",
                xunlei:"Xunlei"
            };
            break;
    }

    function include(things,obj) {
        for (var i = things.length - 1; i >= 0; i--) {
            if ($(things[i]).attr('href')===$(obj).attr('href')){
                return true;
            }
        }
    }

    function setCss(){
        $('head').append(`
        <style>
            a.whx-a{
                display:inline-block;
                margin-left:5px;
                background-size:20px;
                border-radius:50%;
                border:0px;
                vertical-align:middle;
                transition:margin-top 0.25s ease;
                outline:none!important;
                padding:0px!important;
                height:25px!important;
                width:25px!important;
                left:0px!important;
                top:0px!important;
                background-position:center!important;
                background-repeat:no-repeat!important;
            }
        </style>`);
    }

    function getAllEnableUrl() {
        if(GM_getValue('eoDisable_'+location.href))return;
        var parentDiv=$("<div style='display:none;position:relative;z-index:99999;overflow:visible;text-align:left;'></div>");
        var rawnodes = $(enableUrl).get();
        var nodes = [];
        var i,x;
        var curNode;
        var offUrl;
        var offNodes=[];
        var regs=GM_getValue("eoReg");
        if(regs){
            var aTags = $("a").get();
            for(var aTag of aTags){
                for(var reg of regs){
                    var patt=new RegExp(reg);
                    if(patt.test(aTag.href) && $.inArray(aTag, rawnodes)==-1){
                        rawnodes.push(aTag);
                        break;
                    }
                }
            }
        }
        function hideIcons(){
            parentDiv.css("display","none");
            for(var node of offNodes){
                node.css("margin-top","0px");
            }
        }
        for(x = 0; x < Object.keys(sites).length; x++){
            let offNode=$("<a></a>");
            offNode.addClass('whx-a').css("position","absolute").css("margin-top","0px").css("margin-left","0px").attr("target","_blank");
            let siteConfig=sites[x];
            offNode.css("background-color","#"+siteConfig.bgColor).attr("title",i18n[siteConfig.name] ).attr("href", siteConfig.url);
            if(siteConfig.name!="xunlei")offNode.click(function (event) {GM_setValue("eoUrl",getRightMagnetUrl(offUrl));});
            if(siteConfig.bgImg)offNode.css("background-image","url(\""+siteConfig.bgImg+"\")");
            /*switch(x){
            case 0:
                offNode.css("background-color","#e1e1e1").attr("title",i18n.baidu ).attr("href", "http://pan.baidu.com/disk/home");
                break;
            case 1:
                offNode.css("background-color","#F44336").attr("title",i18n.seedr ).attr("href", "https://www.seedr.cc/files");
                break;
            case 2:
                offNode.css("background-color","#3BEBFF").attr("title",i18n.furk ).attr("href", "https://www.furk.net/users/files/add");
                break;
            case 3:
                offNode.css("background-color","#5e5eff").attr("title",i18n.yyw ).attr("href", "http://115.com/?tab=offline&mode=wangpan");
                break;
            }*/
            offNodes.push(offNode);
            if(siteConfig.hide)continue;
            parentDiv.prepend(offNode);
        }
        parentDiv.mouseover(function(e){
            e.stopPropagation();
        });
        document.addEventListener("mouseover", function(e){
            hideIcons();
        });

        if(rawnodes.length > 0){
            for (i = 0; i < rawnodes.length; i++) {
                var disable = false;
                curNode = rawnodes[i];
                if(!/^magnet|^ed2k:\/\//.test(curNode.href)){
                    if(/[#\?]|\/\.[^\.]+$/.test(curNode.href))continue;
                    for(var j = 0; j < disableUrl.length; j++){
                        var temp = disableUrl[j];
                        if(curNode.href.indexOf(temp)!=-1){
                            disable = true;
                            break;
                        }
                    }
                    if(disable)continue;
                }
                if(!include(nodes,curNode)){
                    nodes.push(curNode);
                }
            }
        }

        if(nodes.length > 0){
            $("body").append(parentDiv);
            var codeList = [];
            var listLen = 0;
            listLen = nodes.length;
            setCss();
            if (listLen !== 0) {
                for (i = 0; i < listLen; i++) {
                    curNode = nodes[i];
                    let clone=$("<a></a>").attr("style",curNode.getAttribute("style")).attr("href",curNode.getAttribute("href")).addClass('whx-a').css("background-color","#e1e1e1").css("background-image",'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAYM5vMOA/ENGegK2olI6G1b97Z0sXENA+jAAAAKFJREFUKM+FklkSxCAIRHFfss3K/Y86iQSDVqzpH7FfgQpCVfAmGx+gl9JI0qrxrcNLzooEbKUG4EKWdkCiDRV0N0RTrZ5wvdgTTgp4SzCAHxAPZkAM5GOJWuuT7FE5OVPOBFLTYb3Oc2YB5uJ8+G6pgkTGt74ntcCJHiwFLHw10Tdc93jlGXGvSRtsHNpuPs+/o1ODfxAtSL0f7HPC+L/9AF60G3QxO1UaAAAAAElFTkSuQmCC")');
                    clone.mouseover(function(e){
                        offUrl=clone.attr("href");
                        parentDiv.css("display","block");
                        var basePos=clone.offset();
                        parentDiv.offset({top:basePos.top,left:basePos.left});
                        let j=0;
                        for(var x=0;x<offNodes.length;x++){
                            let node=offNodes[x];
                            if(/^magnet/i.test(offUrl) && sites[x].noMag){
                                node.hide();
                            }else if(/^ftp/i.test(offUrl) && sites[x].noFtp){
                                node.hide();
                            }else if(/^ed2k:\/\//i.test(offUrl) && sites[x].noEd2k){
                                node.hide();
                            }else{
                                node.show();
                                node.css("margin-top",-j*25+"px");
                                j++;
                                if(sites[x].name=="xunlei")node.attr('href', sites[x].url+offUrl);
                            }
                        }
                        e.stopPropagation();
                    });
                    $(curNode).after(clone);
                }
            }
        }
    }

    function getRightMagnetUrl(url){
        var newUrl = url;
        if(/^magnet/.test(url)){
            newUrl=newUrl.split("&")[0].substring(20);
            if(newUrl.length==32){
                newUrl="magnet:?xt=urn:btih:" + base32ToHex(newUrl);
            }else{
                newUrl=url;
            }
        }
        return newUrl;
    }

    var b32 = {'a':'00000','b':'00001','c':'00010','d':'00011','e':'00100','f':'00101','g':'00110','h':'00111','i':'01000','j':'01001','k':'01010','l':'01011','m':'01100','n':'01101','o':'01110','p':'01111','q':'10000','r':'10001','s':'10010','t':'10011','u':'10100','v':'10101','w':'10110','x':'10111','y':'11000','z':'11001','2':'11010','3':'11011','4':'11100','5':'11101','6':'11110','7':'11111'};
    var b16 = {'0000':'0','0001':'1','0010':'2','0011':'3','0100':'4','0101':'5','0110':'6','0111':'7','1000':'8','1001':'9','1010':'a','1011':'b','1100':'c','1101':'d','1110':'e','1111':'f'};
    function base32ToHex(str){
        if(str.length % 8 !== 0 || /[0189].test(str)/){
            return str;
        }
        str = str.toLowerCase();
        var bin =  "", returnStr = "", i;
        for(i = 0;i < str.length;i++){
            bin += b32[str.substring(i,i+1)];
        }
        for(i = 0;i < bin.length;i+=4){
            returnStr += b16[bin.substring(i,i+4)];
        }
        return returnStr;
    }

    var i=0;
    var t=window.setInterval(function() {
        var curlink;
        if (location.href.indexOf("github.com/hoothin/UserScripts/tree/master/Easy%20offline") != -1){
            window.clearInterval(t);
            var configContent=document.createElement("div");
            document.body.appendChild(configContent);
            configContent.outerHTML=`
            <div id="configContent" style="display: none;">
                <div style="width:300px;height:300px;position:fixed;left:50%;top:50%;margin-top:-150px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                    <div style="text-align:center;font-size: 12px;margin-top: 25px;">自定义需要启用一键下载的链接正则，一行一条</div>
                    <textarea id="configInput" placeholder="例：http:.*\\.php\\?getRes=\\d+" style="position:absolute;left:20px;top:50px;width:260px;height:200px"></textarea>
                    <button id="configSave" type="button" style="position:absolute;left:110px;top:260px;width:80px;height:30px;background-color:#3892ed;color:white;border-radius:5px;border:0px;">设置</button>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA5FBMVEUAAAD+/v7////9/f7////////+/v7+/v7////+/v7+/v7////+/v7+/v7////+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7////////////+/v7+/v7+/v7+/v7+/v4uje3///82ke7s9P3N5PtQoPDI4fqCu/Tu9v5Im+/6/P+VxfZgqPFNnvDp8/3f7fq42Pmnz/d1tPNvsfNkq/JCmO/4+/7X6fz19/rn8PqYx/aNwfV8uPRqrvJZpfFUovAzkO3Q5vu92/mr0fieyva92fWx0vQ6lO5pygFTAAAAJHRSTlMAmfD+RMGwgj2mknlIKR/36+XGnIyHfnJfVDk2My8S4E1CJBvTatKDAAABY0lEQVQoz4WSZ1fCMBRA05ahLPfemkspBUFwgGz3+P//x/hK6ZBzvB/ak96+kZeoGCtFK5eziitqCSfWOnM2CuWUrOyQYPc0bjM2htHXh+/ffQ4lQ6zEPoZ6TwdUp10M56EtAe5MR7y0HGAeX7Ghe6MTzIZwFtTfBrepUzw4UFSGY8CUTTMGLo3eglv58By21pRnB7aNBqTwPfWq/OVey9sH22wZXiWo6Yr3GtRl/f0IRyoPYy14v97YWjVY12BPrcK9XvhaZPUdWCoLbR35yOoW5P7R8eQ3JrmbSp6HVmSrXuTrmNYyUAs2JkL6D6YjG1PgNGXK87F4nWAsUxmL2gyH6oVD7cuhdqFg9CE4T/oPE6CsgvBOP21715AP7ugaDFK+3YD1KyUcAG47bn0TSylxFd8WDTwMMByoBSUHw+jd9/3JbQODnVExygUS7FRUksPVtdDZW8dqCZm8lc1auxcq4gc02GVGTUchmgAAAABJRU5ErkJggg==" id="configQuit" style="position:absolute;right:0px;top:0px;cursor: pointer;" />
                </div>
            </div>`;
            var configInput=document.querySelector("#configInput");
            var configQuit=document.querySelector("#configQuit");
            var configSave=document.querySelector("#configSave");
            configContent=document.querySelector("#configContent");
            configContent.style.display="block";
            $(configInput).val(GM_getValue("eoReg").join("\n"));
            $(configQuit).click(function (event) {configContent.style.display="none";});
            $(configSave).click(function (event) {
                var regStr=$(configInput).val();
                var regStrs=regStr.split("\n");
                for(var reg of regStrs){
                    try{
                        new RegExp(reg);
                    }catch(e){
                        alert("含有无效正则，请重新输入");
                        return;
                    }
                }
                GM_setValue("eoReg",regStrs);
                alert("设置成功");
            });
        }else if (location.href.indexOf("furk.net/users/files/add") != -1){
            window.clearInterval(t);
            curlink = GM_getValue('eoUrl');
            if(curlink){
                setTimeout(function() {
                    $('#url').val(curlink);
                    GM_deleteValue('eoUrl');
                    $(":submit[value='Add download']").click();
                }, 500);
            }
        }else if(location.href.indexOf("seedr.cc/files") != -1){
            if($('#upload-button').css("display") != "none"){
                window.clearInterval(t);
                curlink = GM_getValue('eoUrl');
                if(curlink){
                    setTimeout(function() {
                        $(':text[name="torrent"]').val(curlink);
                        GM_deleteValue('eoUrl');
                        $('#upload-button').click();
                    }, 500);
                }
            }
        }else if(location.href.indexOf("pan.baidu.com/disk/home") != -1){
            window.clearInterval(t);
            curlink = GM_getValue('eoUrl');
            if(curlink){
                document.querySelector('.g-button[data-button-id=b13]').click();
                var bsi = setInterval(function() {
                    var newTaskBtn = document.querySelector('#_disk_id_2');
                    if(newTaskBtn){
                        clearInterval(bsi);
                        newTaskBtn.click();
                        var bsl = setInterval(function() {
                            var offLink=document.querySelector('#share-offline-link');
                            if(offLink){
                                clearInterval(bsl);
                                offLink.value = curlink;
                                document.querySelectorAll('#newoffline-dialog>.dialog-footer>.g-button')[1].click();
                                if(/^magnet|torrent$/.test(curlink))
                                    var i=0, bsb = setInterval(function(){
                                        var btList=document.querySelector('#offlinebtlist-dialog');
                                        if(++i>50 || (btList && btList.style.display!="none")){
                                            clearInterval(bsb);
                                            btList.querySelectorAll('.dialog-footer>.g-button')[1].click();
                                        }
                                    }, 200);
                            }
                        }, 500);
                    }
                }, 500);
                GM_deleteValue('eoUrl');
            }
        }else if(location.href.indexOf("115.com/?tab=offline&mode=wangpan") != -1){
            window.clearInterval(t);
            curlink = GM_getValue('eoUrl');
            if(curlink){
                var rsc = setInterval(function() {
                    if (document.readyState == 'complete') {
                        clearInterval(rsc);
                        setTimeout(function() {
                            Core['OFFL5Plug'].OpenLink();
                            setTimeout(function() {
                                $('#js_offline_new_add').val(curlink);
                            }, 300);
                        }, 1000);
                    }
                }, 400);
                GM_deleteValue('eoUrl');
            }
        }else if(location.href.indexOf("my.pcloud.com") != -1){
            window.clearInterval(t);
            curlink = GM_getValue('eoUrl');
            if(curlink){
                var psc = setInterval(function() {
                    var upBtn = document.querySelector('div.upload_button');
                    if (upBtn) {
                        clearInterval(psc);
                        upBtn.click();
                        document.querySelector('span.remoteupload-ctrl').click();
                        var remotearea=document.querySelector('textarea.remotearea');
                        remotearea.value=curlink;
                        remotearea.nextSibling.click();
                    }
                }, 500);
                GM_deleteValue('eoUrl');
            }
        }else if(i > 6 || ((i++) === 0 && $(enableUrl).length > 0)){
            window.clearInterval(t);
            getAllEnableUrl();
        }
    }, 500);
    if(/pan\.baidu\.com\/wap\/home/.test(location.href) && GM_getValue('eoUrl')){
        location.href="https://pan.baidu.com/disk/home";
    }
    function toggleIcon(){
        $('.whx-a').toggle(500);
        if(GM_getValue('eoDisable_'+location.href)){
            GM_deleteValue('eoDisable_'+location.href);
            if($('.whx-a').length<1)getAllEnableUrl();
        }else{
            GM_setValue('eoDisable_'+location.href,true);
        }
    }
    GM_registerMenuCommand(i18n.toggle, toggleIcon);
})();