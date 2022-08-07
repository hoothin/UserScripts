// ==UserScript==
// @name         Easy Offline
// @name:zh-CN   全载
// @name:zh-TW   全載
// @description  Find out all magnet links and torrents and video links in current page, and stream them from cloud storage automatically.
// @description:zh-CN 一键离线下载 - 一键自动将磁链、bt种子或其他下载资源离线下载至网盘
// @description:zh-TW 一鍵離綫下載 - 一鍵自動將磁鏈、bt種子或其他下載資源離綫下載至網盤
// @namespace    https://github.com/hoothin/UserScripts/tree/master/Easy%20offline
// @require      http://code.jquery.com/jquery-1.7.2.min.js
// @version      1.9.39.2
// @author       Hoothin
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAQlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////8IX9KGAAAAFXRSTlMAwT7hFahN0LZWJgqIavB7YJuRdDPJsaCPAAAA6ElEQVQ4y8WRW5aEIAxEDUGgAQUftf+tjgYOjcPMb3d96Im5pkIxfVgmOuY5mX/afkYVqb/6EXDGh+CNA7axvwOvZrUiDfalX6UY5y+AkZ687Ut9WNgw9SLYQ3cDYfNz4kIAq2Z/wYN0AiSRQN16iroMXnD3K2F+f1oBLK2ckeWpmjFEsc2Tfxn6ndUBLGgjNVgAX8oNa56AO8dKeAEccnW89ruB6bQVWGTL2IcmQJOTdXSdOAIRrMtxsekR8AQ5XyHARLTrAhi6xH0iYWfcOguQpeAtPJJXSvlqEdSl4XaGHb4HEE0f1w+Jcw2XCZjSwgAAAABJRU5ErkJggg==
// @match        *://*/*
// @exclude      http://www.toodledo.com/tasks/*
// @exclude      *://*.google.*/*
// @exclude      *://mega.*/*
// @exclude      *://*.mega.*/*
// @exclude      *://*.youku.com/v_*
// @exclude      *://*pan.baidu.com
// @exclude      *://*.iqiyi.com/v_*
// @exclude      *://*.iqiyi.com/w_*
// @exclude      *://*.iqiyi.com/a_*
// @exclude      *://*.le.com/ptv/vplay/*
// @exclude      *://v.qq.com/x/cover/*
// @exclude      *://v.qq.com/x/page/*
// @exclude      *://v.qq.com/tv/*
// @exclude      *://*.tudou.com/listplay/*
// @exclude      *://*.tudou.com/albumplay/*
// @exclude      *://*.tudou.com/programs/view/*
// @exclude      *://*.mgtv.com/b/*
// @exclude      *://film.sohu.com/album/*
// @exclude      *://tv.sohu.com/v/*
// @exclude      *://*.bilibili.com/video/*
// @exclude      *://*.bilibili.com/bangumi/play/*
// @exclude      *://*.baofeng.com/play/*
// @exclude      *://vip.pptv.com/show/*
// @exclude      *://v.pptv.com/show/*
// @exclude      *://www.le.com/ptv/vplay/*
// @exclude      *://www.wasu.cn/Play/show/*
// @exclude      *://m.v.qq.com/x/cover/*
// @exclude      *://m.v.qq.com/x/page/*
// @exclude      *://m.v.qq.com/*
// @exclude      *://m.iqiyi.com/*
// @exclude      *://m.iqiyi.com/kszt/*
// @exclude      *://m.youku.com/alipay_video/*
// @exclude      *://m.mgtv.com/b/*
// @exclude      *://m.tv.sohu.com/v/*
// @exclude      *://m.film.sohu.com/album/*
// @exclude      *://m.le.com/ptv/vplay/*
// @exclude      *://m.pptv.com/show/*
// @exclude      *://m.acfun.cn/v/*
// @exclude      *://m.bilibili.com/video/*
// @exclude      *://m.bilibili.com/anime/*
// @exclude      *://m.bilibili.com/bangumi/play/*
// @exclude      *://m.wasu.cn/Play/show/*
// @exclude      *://www.youtube.com
// @exclude      *://www.youtube.com/
// @exclude      *://www.youtube.com/watch*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @grant        GM.deleteValue
// @grant        GM.xmlHttpRequest
// @grant        GM.notification
// @grant        GM.setClipboard
// @grant        unsafeWindow
// @run-at       document-end
// @supportURL   http://www.hoothin.com
// @license      MIT License
// @require      https://greasyfork.org/scripts/436827/code/manageLinksLib.js?version=1047951
// ==/UserScript==
(function() {
    'use strict';
    var sites={
        baidu:{
            regex:/pan\.baidu\.com/,
            url:"https://pan.baidu.com/disk/home",
            bgColor:"ffffff",
            canMul:true,
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABjFBMVEX////7+/v+/v/8/Pwyf/wzc/w0bvza5f4xffz5+//0+P8ybPz8/f4yevw0cPwza/z39/cwe/UxdfzSPyr4+v/2+f/m7/53nv0vf/wvce9pof1tlPwxf/gzfPYwePPp8f7Z5/7S4v7P4P7L3f7I2f2Gtf2Rr/1hkP0yd/1FiPwygfxAdPxspftYkvUtc/Dg6f7C2f7F1f54oP1flf0/hfwsbu7i7f/w9f7b5v7X5f7V4v6nyv6oxv6jwP6Ns/2Lsf1/rv1+ov1zof1xof10nf1jm/1djP0xe/2NufxalvxHj/xPhvxKgPxHffw+efw0ePyXu/mqxPg5hfiTtvdyo/dgmfdOj/dBhfVflfQvefT+9fOIqvMyefNMhvFIgO9MeePyycVjZbzKb3DaZVa/Q0Dx9f+Bp/1olv1gkPw0dvzg6Pu2zPk0gflNjPctc/c9gfX88/JJfO3n3+ni2unHxuSGktNpdtBJY8paashRW71nXqp7YpyDYJKpaIKPU33AVFXARkTVTTvFQjrUPypKwHq1AAACAklEQVQ4y4WTB3OqQBSFF3BpAk+KIBixJ2rs0fTee68vvbzee+9//O1Cio46npmFPfd8d2cY9gIASMJHUESDKFQmAZJAUKCFKELA/WSr3A3d/tZnAF99C8fVHYhiosbxxflsdr7I15SIWiCe3exA2szGmwOJXTkUkvHaTTQD9NyBLO/t7OzJ8kFObwKs2/bRdrSvL7p9ZNvrjQC/n8/nwngXzuXz+3wDED42zS13u2Wax+EGQD+pmhvudsOsnuj1gBAZSp5+/XRIYkMeVu1XyaGIcAfoycVM4Pn3qx9vcW3gRUcmE8gsJvUboNfyeDyBwLd/6sX7wtNnC45DD6vXBbRx1sOmrQ+/VFX9efomhFzFstLoNa45QKzCijMx/vXZpar+/fKSZecWijwfmxHZSgzFFBgWxXQUIJ39UX9/nhPFngHsomlRHEYxRY6mlCkOl+5fXp2vraV6IgCLm1JSoyQGxhRlUnCAi/PUEwXnWMKkooxhAIxAuNSPS+8+Qgi7GOB3zutfgnAExQSIr0JoMJw2GJSghPLSo4eDGscYEK7Gna/gy7QkLRvTK5JEP2bAgy4vvTJtLCNX5h0AMLNemvbihfqBv3zjZpHDACKM7ntI3RMFgFSYcJ3B3P0sf6kzGOxM+AFwXAK7kuNurz2pcWTt7deuna/t4LQdvbbD23b8/wPY0UTO99dD5gAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                var gsi = setInterval(function() {
                    var newOffBtn = document.querySelector('[data-id=downloadLink]');
                    if(newOffBtn){
                        clearInterval(gsi);
                        newOffBtn.click();
                        var bsl = setInterval(function() {
                            newOffBtn.click();
                            var offLink=document.querySelector('div.nd-download-link div[role=dialog] input');
                            if(offLink){
                                clearInterval(bsl);
                                var beginOffline=function(){
                                    if(curlink.length===0)return;
                                    offLink=document.querySelector('div.nd-download-link div[role=dialog] input');
                                    if(Object.prototype.toString.call(curlink) === '[object Array]')
                                        offLink.value = curlink.shift();
                                    else{
                                        offLink.value = curlink;
                                        curlink="";
                                    }
                                    var event = document.createEvent('HTMLEvents');
                                    event.initEvent("input", false, true);
                                    offLink.dispatchEvent(event);
                                    delLink();
                                    var baiduPathStr,isBt=/^magnet|torrent$/.test(offLink.value);
                                    storage.getItem("baiduPath",v=>{
                                        baiduPathStr=v;
                                        if(baiduPathStr){
                                            _unsafeWindow.require("function-widget-1:offlineDownload/util/newOfflineDialog.js").obtain()._checkPath=baiduPathStr;
                                        }
                                    });
                                    $("div.nd-download-link div[role=dialog]").find("button.nd-download-link__action>span:contains('确定')").click();
                                    if(isBt){
                                        var i=0, bsb = setInterval(function(){
                                            var btList=document.querySelector('div[aria-label="链接任务"]');
                                            if(btList && !$(btList).is(":hidden")){
                                                clearInterval(bsb);
                                                if($(".nd-remote-download__list-select>span").html()=="全选")$(".nd-remote-download__file-list .u-checkbox__original")[0].click();
                                                btList.querySelectorAll('button.nd-remote-download__save-btn')[0].click();
                                            }else if(++i>50){
                                                clearInterval(bsb);
                                            }
                                        }, 200);
                                    }
                                };setTimeout(()=>beginOffline(),500);
                            }
                        }, 500);
                    }
                }, 500);
            }
        },
        pcloud:{
            regex:/my\.pcloud\.com/,
            url:"https://my.pcloud.com/",
            bgColor:"f1f1f1",
            noMag:true,
            noEd2k:true,
            noFtp:true,
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEX///////8bytT///8fy9UbytQbytQfy9Ufy9UmzNYbytQgy9UizNUbytT///8bytQey9Ufy9Ugy9VG1NxB09sbytRg2uFS194bytT///9G1Nzx/Pzi+PpT19+c6OxZ7rqXAAAAGHRSTlMBG/AHxYAh49O3oWJBMRUR4bOLYV9RQz9fW5zbAAAAbUlEQVQY043MRxLCMBBE0WYkOQcyXybc/5hIhUuww2/3u2pGG1WdYV1VujcyG9ceWdmcM8jDK8bHE0LqCzMQF5Y7NOnNgeE7MATBMQ+fE/q9wCwNkDUetUAZPLVuxq+z3LWlqE9OctOumFL/9QYClwvt3NkDkgAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                var psc = setInterval(function() {
                    var upBtn = document.querySelector('div.uploadfiles');
                    if (upBtn) {
                        clearInterval(psc);
                        upBtn.click();
                        document.querySelector('span.remoteupload-ctrl').click();
                        var remotearea=document.querySelector('textarea.remotearea');
                        remotearea.value=curlink;
                        delLink();
                        remotearea.nextSibling.click();
                    }
                }, 500);
            }
        },
        yyw:{
            regex:/115\.com/,
            url:"http://115.com/?tab=offline&mode=wangpan",
            bgColor:"21458a",
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUhRYr///+XqcjV3OmJnMFTb6QoS45PbKLu8fbZ4OvBy95xiLRifKxbdqlXcqYxU5P3+Prh5u/O1uXH0eK6xduks89/lLtGZJ4ysMfhAAAAVUlEQVQY04WPSQ6AMAwD6ySkdKHs8P+fckyDhPBtRoojhyG4GP6FEjPvxhGZiKKJPM7uoAHYSif0Lgdw+tppQfOGIF4ILsea3CetvMa+UaRq+Mh7/gPkxAHFh9WDUQAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                var rsc = setInterval(function() {
                    if (document.readyState == 'complete') {
                        clearInterval(rsc);
                        setTimeout(function() {
                            _unsafeWindow.Core.OFFL5Plug.OpenLink();
                            setTimeout(function() {
                                $('#js_offline_new_add').val(curlink);
                                delLink();
                                document.querySelector('[data-btn=start]').click();
                            }, 1);
                        }, 500);
                    }
                }, 300);
            }
        },
        furk:{
            regex:/www\.furk\.net/,
            url:"https://www.furk.net/users/files/add",
            bgColor:"fff",
            hide:false,
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAflBMVEX///+CuuaGv+rjXKniTaiDu+d3tufiXq/nUqxAn9+t1vGiz/FOnt/sj8nol8bhcLJRo97b7vp5uOpCoeGQw+m31/XW6/er0++Iwe330uZUpuHssNjni8Tqf7/o9Pn68PSUx+732eucyuvzzuJjq+H0v97sm8q12vDto8/rcrjt831UAAABmUlEQVRIx+2T6W6DMBCE8dr4aEgw0KS5kzZH2/d/we7aliJlN6KR+rNjgYwYfxrwuPrXXwkeaC7ba1nqU7YrWfV83N6rm95G7ZCWlNnL6Kfa20zBA7tNEl7KSsjl5In/rsBOnqArtfx1GGXVGH112Wwuq2KnMMDp2nnUtaquOsttchik15yeLGZ68tpp7403elXo4pZn5Ld3zpg03VWFjkOme51kcGj/nu1p7wF6QPU0cjKDVIyBRrfbtdptM4XYqYIoSKP+KHQ04X17wKfDF8JJYJUt9cqrVH2sUOg0hJ4Ju5rNRSWMIb9r70uA4a2lRRSrx9stDF6ne7tCrz12XbdfLPbdAicVCdFEr5gdQGq306Qt6wz5gR81+t2tmXI6SbLT5sx4ga1YMdNidM/sAMQXOmOoBVPxeMidaaUwFsSjbVBa+NS0RdyequgYXS0pjhSmlegWcKxfRbrmdFBwjpHbMblEV+cQwiDSnUBfD8PQNMDtVBpOH2IYhjVInZHosYkxBh7GGZEeGpRg161Ib0ITQhTCMPrz+gG1shF4koHETAAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                setTimeout(function() {
                    if(!$('#url').length)return;
                    $('#url').val(curlink);
                    delLink();
                    $(":submit[value='Add download']").click();
                }, 500);
            }
        },
        seedr:{
            regex:/www\.seedr\.cc/,
            url:"https://www.seedr.cc/files",
            bgColor:"ca2a15",
            hide:false,
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAllBMVEXGKBPGKBPGKBPGKBPORDLJMh3uv7nQTDvILRjprKPmoZjbdmnLOyjKNSHtvLbrtK3opp3lm5Hhj4Tac2XZb2HXalvUXEzLOibGKBPGKBPGKBPqsarjlovehHjXaFnTWkrMQC3GKBPGKBPGKBP////44+H77u323Nj01dHxycP88vH66+n23dr019Tyz8rxzMfvw73vwrxYVj9BAAAAJHRSTlP7yb+j+/v9+/v9/f37+/39/f39/f39+/uxmSj9/f37+/uXNR2Gd9E6AAAAmUlEQVQY003NVxKDMAxFUQVsbHqv6YkMIT3731wEZoD7oZl3fgQXY7PKaKACKn93BxirwaArWsQXH8EcYYeUu4BnDRAsUKgBWjZDeqfduXKGmHbPT3YiJ9giPtj+qUJWavghxoUSHFxLAz3JIgcAypsGBzF3bAJvAvHB5PiVnm8HGoBZIffTVvWMoIIhX4KIMg5whsbcrKqvf29uDBcu2+SAAAAAAElFTkSuQmCC",
            offFunc:function(delLink){
                var sdi = setInterval(function() {
                    if($('#upload-button').css("display") != "none"){
                        window.clearInterval(sdi);
                        setTimeout(function() {
                            $(':text[name="link"]').val(curlink);
                            delLink();
                            $('#upload-button').click();
                        }, 500);
                    }
                },500);
            }
        },
        weiyun:{
            regex:/www\.weiyun\.com/,
            url:"https://www.weiyun.com/disk/index.html",
            bgColor:"3c95ee",
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUed9E4htg2hNI2g84KJkMSKkMJIjwHEBr///8lh+k5k+49lu4hhegyj+wri+s/lu+s0vfg7vzX6vy/3PlWou+w1PicyfaWxvXf7fzB3fmHvfSBuvNfp/GhDGXVAAAACHRSTlPm5uDeSkhCHO7HIjkAAAB4SURBVBjTZYuJDsIwDEM9TnfDodc2rv//TtoKITqeosR+UnAcrj/szhimjj2mDRgbM8nYEj59GRfOX/Fg3a+2IUWSUh0vCfKhRUbFaiAqs1L0PVAw2vrM3sx8sFJgieUGWwNzzXAukTeSqX46B7fhX+DSARzQ9dMbRIkLk61eQagAAAAASUVORK5CYII=",
            offFunc:function(delLink){
                var rsc = setInterval(function(){
                    var offBtn=document.querySelector('.icon-bt-s');
                    if(offBtn){
                        clearInterval(rsc);
                        var wsc = setInterval(function() {
                            offBtn.click();
                            var textarea=document.querySelector('textarea.input-block');
                            if(textarea){
                                clearInterval(wsc);
                                document.querySelector(".modal-dialog-bt ul>li:nth-child(2)").click();
                                setTimeout(function() {
                                    textarea.value=curlink;
                                    delLink();
                                    var event = document.createEvent('HTMLEvents');
                                    event.initEvent("input", false, true);
                                    textarea.dispatchEvent(event);
                                    document.querySelector('div.modal-dialog-ft>button:nth-child(2)').click();
                                    setTimeout(function() {
                                        document.querySelector('div.modal-dialog-ft>button:nth-child(2)').click();
                                    }, 1000);
                                }, 500);
                            }
                        },200);
                    }
                },1000);
            }
        },
        bitqiu:{
            regex:/pan\.bitqiu\.com/,
            url:"https://pan.bitqiu.com",
            bgColor:"ffffff",
            noTxt:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAAARsPUSr/QWsfkTsvUWuv8RsvkSr/URsPUSsPQr1f8RsPUSsPYRr/USr/USr/USsfQSsPUTsPURsPURsfYSsPUTsPgRr/UxdyaHAAAAF3RSTlMA1LsuMw0q8pSPBrSK28ygeHJqZjqqRB/r5Z8AAACRSURBVBjTZc9bFoMgDARQogRFBMpDZ/877UDtl/PHPTAkZsR52Tbxzvxy7HiyH/PsBFLu3hKwDNnX5dRy5aof3uF7EE6rNkRLccYTwuwKURO8EYKdYFEbxGwEnaDIHRuh5/+NZSUIWn06BghLk8YwfgGBpSvwsRGMnATHwSha81WUsI/RFyC1fheBuOO93Gv9Lw0KCbAF32RQAAAAAElFTkSuQmCC",
            offFunc:function(delLink){
                var rsc = setInterval(function(){
                    var offBtn=document.querySelector('a[data-track=clouddown]');
                    if(offBtn){
                        clearInterval(rsc);
                        offBtn.click();
                        var wsc = setInterval(function() {
                            var tab=document.querySelector('.cloud-download-container');
                            if(tab){
                                clearInterval(wsc);
                                var textarea=tab.querySelector('textarea');
                                textarea.innerHTML=curlink;
                                delLink();
                                document.querySelector('.js-confirm').click();
                            }
                        },200);
                    }
                },1000);
            }
        },
        xunlei:{
            regex:/lixian.*\.xunlei\.com/,
            url:"http://lixian.xunlei.com/",
            bgColor:"328fec",
            noTxt:true,
            offFunc:function(delLink){
                var rsc = setInterval(function(){
                    var offBtn=document.querySelector('.ico_add');
                    if(offBtn){
                        clearInterval(rsc);
                        var wsc = setInterval(function() {
                            offBtn.parentNode.parentNode.click();
                            var tab=document.querySelector('.pop_task');
                            if(tab){
                                clearInterval(wsc);
                                var textarea=tab.querySelector('textarea');
                                textarea.value=curlink;
                                var event = document.createEvent('HTMLEvents');
                                event.initEvent("input", false, true);
                                textarea.dispatchEvent(event);
                                document.querySelector('.j-com-sub').click();
                                delLink();
                            }
                        },200);
                    }
                },1000);
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACSVBMVEUAAABcZmwsMTUqO0U5PUH5+vvx+v665fZUhaAzTV4bLzwbLDY8P0Hg+P4Bh9pKcoRNgZ86U2OU2PoFk+QBi+AKs/5jwPKr3fS68frS7vqU0++EyO0JfMMmMTcXICfK+f+x6P4FqPuj3/q05PlPvPdVt/Cr4fpPw/qx4PYQmuyh2fb09/iw5fcGjuCq3PEJitiZ2PGYzuCKtMtkpcV6p8Beip1pkqpEcYpJZXQbT2pVi6sTNUg/YHVldX+G6//8/PzY8Po3wvmY0/QAgdbF5/Ywq+/s9/l/zflzw/GG0vag1/Afk9g2ot95v+ak2OhPreJEvOxwtd6ax9zb6fMCaKd1udWSv9G5yNGDqLUOYZaQqrh2n7M3dJcLXIsWWX60ydY9bIdieoqYq7did4IiRVo0UmM1RE5idIFVbHiSnaWCjJM/SlJV0v9kz/tI4PwcwPyK2/sAe8ly2/yb7Pk3rO/E6ewMleYOg8wAZ7Pb7vHr8PPi5+q72+eKwNsymdGu0dzL2eJoqtEwoM3E0dlYq8ywvsaXsL6tusGjrbR4nKeHpbREeptrjpt6iY8ddJdxeX9OaXp0hI7////u+v/1/f/f9P7K7v36/f/b9P0Bkenp9/7Y8f3S8P3j9f7D6/wAme3n+P7D/v+x8v+36v6u5f4CnfCo5/8Do/u65fktrvIbo+619f+98//j/f6X3/0AmvoBofYKofMUoPIAlO4AhNfs///I///Z/P8oyP8rtv6C0vscsPhlxvZ0yfQmnuOX8v+n8f9u7/+MzvJIjWZiAAAAknRSTlMAIhZGD/r++rZkTD0I/v6PbGz+/v79/fz6+fPx7zQh/v7+/v7+/vz8/Pz7+fn49/b15MvJxrOyn4B0cFpVMPz8/Pz8/Pv6+ff39vb19PDu7uri3tjX1dLPy764t7CvmJaNiIZ+fn1gXUI8Myz+/v39/f38+PT09PT08/Ls6+ni29HRzMvLyMC9ta+ppJ6enZF0b+TVr9MAAAKHSURBVDjLvZLlcxpBGIcPDoIFTXDi7u7ubo27e93d3Xt3HBxpcEloPMTTVP6y7lFKJzN8zrOzX/b3vO+8u7PQmeNPmZudnaPQfGZg04Kmx4aHx77AVN/lQVOfXj9rb3/86oOQ40sJGn1xL4EOSLjz6D3sf6q2aAaG2ePdGOJhL41P9vjfe/xtX9/L7rv/cmz3Wief481pnMme+3I5F0VK6Al0DVZCr5b9KH5e4BWKRntucFe5O5jmLwjixyj+1Zrnvex0OmN1Z1VdjaJ+GJAwICRevVj2keMxqLlpIXtaLteIug0MRRA0/Pz+pacjMNWds7KSQ3B5qVq9qCMVVKdBjJf3xeLWDP7UPMgLM5stely+oAWG0agDYBr8gtghjqlLy/wcDLH51l0LA/8KBLexiGKYeq0sbD0sZs1kzy6A+P1mk4WhJw2yx6IWRXThMUeOdUfk2oq98x2U2ZUoiyAFYACBHGLp+CjMsb4ZVR4br2yD0s9Fh0ZH6HG3sbCgw3RL35c3Nja2tyTx0vK6GiCEWqKlS8AAAm6NwEG+abMZCGetNFZUUwv1d63I4uulsYzKylKt9ThSIgG5gQhMamxKThQ1PYFy38hM9nBrqAWMoT9ctjmdNoPBQBAnUb+tZlHGCMTJbTZ9M4NlClkRRcUR2yANILa3Ig/t5p/KHDZEg7MfKFJTFYr65FRJVRxBEAEBgbyKhhalQtnGZFHBU7IncrKYTGZWdkZLVdzNpKSUFJ6qo3eAycyZYAdDJMEwSygUsiYHGg+coNrlutIxlMcSskDsgUYBzBcMnhxs8Vy8wIrbg4Xkyel/C4YZeni9QaW6laLqzaNAPqDMCPLzBQJBvqCwCDpL/gAILu9mqnp+uQAAAABJRU5ErkJggg=="
        },
        xunleipan:{
            regex:/pan\.xunlei\.com/,
            url:"http://pan.xunlei.com/",
            bgColor:"2e71f1",
            noTxt:true,
            offFunc:function(delLink){
                var rsc = setInterval(function(){
                    var offBtn=document.querySelector('.pan-dropdown-menu.plus-menu>a:nth-child(2)');
                    if(offBtn){
                        clearInterval(rsc);
                        var wsc = setInterval(function() {
                            offBtn.click();
                            var textarea=document.querySelector('.fileurl-input__container>textarea');
                            if(textarea){
                                clearInterval(wsc);
                                textarea.value=curlink;
                                var event = document.createEvent('HTMLEvents');
                                event.initEvent("input", false, true);
                                textarea.dispatchEvent(event);
                                document.querySelector('.pan-dialog-btn__primary').click();
                                delLink();
                            }
                        },200);
                    }
                },1000);
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABC1BMVEUAAAArcPUscPQkavJSd79UdrhTdrled6kjae8ucfAqbOwoa+0pa+xTd71WdrNad61dea4pbO4vcvEsb/Aqbe8sbu8ucfArbu8ucfEpbe0oa+4vcPH///4ZYe7j8fne7fknbPAkaO41dfDa6vgcY+/o8/rV6PchZ+4bZO79//3u+fklavIiaO8VXu3x9/3t9fve7veLsfYqcfZNhvE5d/AfZO36/fz0+/ry+vrb6PrG2vnR5fbL4faXufbG3fWqyPWjw/WErPWixPR4pPR0ovOIsfJsnPJYj+9Bfe/1+v3l7f3p8Pzg7fq+0/mlw/fY6/aQtPaHrfZnl/S41fORt/KAqvKZvvFJhO8eZe4RVCzFAAAAEXRSTlMA+P74gnpzWP329OrohXJgXOQVaEcAAAFOSURBVCjPZczneoIwGIbhqNXuEQORYGIBQXDvvbfde5z/kfSTi1Kx9798z/UGIXQQUuJBSiiGwDmEPUklFIVFDcI/4doVqilUCSIFArdjlAxQFE1Ir41EMhlGlFKiEerRhPFy29O3byiyUTccx9HiVBbxYYm3jAL1ilyvPlerhl1wFnec83mRuoUQSgr2lPP7Bn3g2dJNtm6TLSggUXzMZrtdXi6X+dCR/QLEtGV1SpZltXvfGtkt5qSdcnXmpmlit8guc5K79vTHK0OCk1eaq1x6q2LlUunBUsZQEi5sj3MZMJp9bLCuynCCjUvX3yuVzKBRFLqK4TNvA+Qj8TV7Si1E4heSfKZYj/pUlzxQfFjQt2XRL/iPJDXVz43tvRBmO6SmsdaZS0N5zHZnOpMwYNoJiuU1pu5j+fwhQtGIynAQUyMXCFyeqntFPYPFD095Qx8x+n7CAAAAAElFTkSuQmCC"
        },
        xiaomi:{
            regex:/miwifi\.com/,
            url:"http://d.miwifi.com/d2r/?url=",
            bgColor:"f97306",
            noTxt:true,
            directUrl:function(offUrl){
                return this.url+btoa(offUrl)+"&src=EasyOffline";
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEX4cwD+/v7+/vz+/f7+zKr+mU/++vj93cf8hiv+28T+z6/+z6v8lUv+kkn8gSf+fCL98OP92sH+17z+yqf+yaX+wJX9lk/7mkz8kkb9jj79gyr6hyn9exv++/r+9/X96+H+xJz9v47+mFP+mEr+dh37dhn+dhL+cAw9Nvl9AAAAf0lEQVQY053NWQ6DMAwE0LFNEkqahLK0hdJ9u/8NcXIERpY/nkY2NuVS1zoRwDL/dL9vIkJsXcRgjwqG7uP4fLTcw5NROJGH5iUOFWcw3KBqJ9AOFe1zQzwcBXCBcqPBgc8FuIAoiILTRv4SbI/OTrAdhmuAZk5Y4h/pg2/Clqzm5QVwiFSSmAAAAABJRU5ErkJggg=="
        },
        apiv:{
            regex:/apiv\.ga/,
            url:"https://apiv.ga/magnet/",
            bgColor:"35271c",
            noHttp:true,
            noEd2k:true,
            noFtp:true,
            noTxt:true,
            hide:true,
            directUrl:function(offUrl){
                return this.url+offUrl.split("&")[0].replace("magnet:?xt=urn:btih:","");
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAS1BMVEXq5N+Lgnl/dGw1Jxzt5uDy7eju6eO1rKTk3tdPRDjb1M2vpZ1jWU9WST6+tq+qoJiYkIp4bWNCNCbg2dTIwLi5squroplYT0dFNyua0/V8AAAAA3RSTlP+/v6VFoksAAAAaklEQVQ4y+XSSw6AIAwEUMCC5Svg9/4nFQ/AsDTGWb+kk0nFNMgfQawDsKQ4AOxUReBgZm8BmEWLK1cfEJEx5CMG2riCgG4xudehiQesCp7Qe4AdWJ6oJKUAd2AJh6ItWDS1z/b1j/osuAHroA3qksST5QAAAABJRU5ErkJggg=="
        },
        torrent:{
            regex:/itorrents\.org/,
            url:"https://itorrents.org/torrent/",
            bgColor:"f2f2f2",
            noHttp:true,
            noEd2k:true,
            noFtp:true,
            noTxt:true,
            directUrl:function(offUrl){
                return this.url+offUrl.replace("magnet:?xt=urn:btih:","").replace(/&.*/,"")+".torrent";
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAh1BMVEUAAAARzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW6Q4LCTAAAALHRSTlMABCboGRPMNdIrH/Pu6sS+pC/iuZg5CfnaeUWFZD88Dtayq5GLgFz3VE5Jaw0PQwoAAAFJSURBVDjL1ZLZdoQgEERHQBBwAfd9xnW2/v/vSxRNJifOe3JfPC1F0V1w+l+cy2m6C+u9oJYA13wkb5ZF/XBhwdfHggo3PaxQftiADzHLjaKzDwTkAvJRhqsgmw8EtgPg8NYxbRxYpMGygPjyyfKjLoqQ+r7Sos+rB7NT6/cZLGkThiwbtVUXBOqJfmisJKahh3NFUO+aTsMYvcwQe7AyagpfXO67CQrAgJmCF/B9C6nb/0Q6zKoi8vbaMac8M1OGE2IuRDehRwyGYotgwR2QuDEP4EpnW8fbzZ1NygAyas6z4/C1x2vUpEwtLjlZEuhCOpQk6SXIsjDWnmqIvlWqXucgbVtOweoZ8QgMLlXF3KTmrfieBENWm5E3qDAx1njfFosTGb6nLPegWXzBHnaGZLFM2ehgKTEtxMtdEK6Rbe2VzZOEf5Z/hQ9XijJkclXFpgAAAABJRU5ErkJggg=="
        },
        btcache:{
            regex:/btcache\.me/,
            url:"http://btcache.me/torrent/",
            bgColor:"f30000",
            noHttp:true,
            noEd2k:true,
            noFtp:true,
            noTxt:true,
            directUrl:function(offUrl){
                return this.url+offUrl.replace("magnet:?xt=urn:btih:","").replace(/&.*/,"");
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA9lBMVEUAAACgoqOipKUAAAC4ubq1traXl5jX19g9PT4GBga2t7ixsrOur7Cmp6jMzM1+f39ZWVpnZ2eChIXMzc3BwcKvsrLGxsacnZ3f399zdHS9vr61trZZW1upq6vIysq7vb2nqKliZGTS09O6vLzg4OC2uLhQUVHi4uK+v79OTk4hISHT1NQZGRnf4OCPkpKsra3KysxmZ2d+f3/y8vOUlZW+vr+2tridnp/Z2dmAgYJ4enptbm5YWVn39/fv7/DDw8Td3d7U1dXU1NTOztC4ubuoqamlpaWcnJyYmJp6fHxwcXFTVVX29/bHyMnHx8e3t7qgoaGHiYm1AxJpAAAAL3RSTlMAHhgF4NbW2jQU4uDg3sybVDUkHhcF6Ojk5ODc2dfJycPDra17ezkuLiUlIRUREf6sWL0AAAC0SURBVBjTjY9HEoJAAAQXVwVzAMw5Z5YMgoBizv7/M7JwoLw5t+lD1wzAYVcEPaeXLAgyHvTazTpJtvrDCe5M1nUReiiK/ERZxgNEVLYdy1GFz1uuET54IfGucTq/5qIYRGIKEjcaJ3ggFsEgrp/tnSwZJi/EMSDSqqQeJeNmXk+pwLFHlrg9CPzl16H/7ygmQ0eyCACkMuGODAUBTORzHbJSKlcb3Vw+AfE9uJgWCiNq5rcvfNwgjdumYdQAAAAASUVORK5CYII="
        },
        PikPak:{
            regex:/mypikpak\.com/,
            url:"http://user.mypikpak.com/",
            bgColor:"2265ff",
            noTxt:true,
            linkRegExp: /^magnet:\?xt|^PikPak:\/\/|\.(torrent|mp4|mp3|rar|7z|zip|rmvb|mkv|avi|iso)$/i,
            directUrl:function(offUrl){
                //此段代码引用自 mumuchenchen 大佬的 PikPak 保存助手 https://greasyfork.org/scripts/435219
                //mumuchenchen 的第三方 Pikpak 网页客户端 推荐大家前往 fork https://github.com/mumuchenchen/pikpak
                storage.getItem("pikpakUserInfo",info=>{
                    if(!info){
                        let userName=prompt(i18n("userName"));
                        if(!userName)return;
                        let userPass=prompt(i18n("userPass"));
                        if(!userPass)return;
                        info={userName:userName,userPass:userPass};
                        storage.setItem("pikpakUserInfo",info);
                    }
                    var postUrl=()=>{
                        let postData;
                        if(offUrl.indexOf('PikPak://') === 0) {
                            const urlData = offUrl.substring(9).split('|')
                            postData = {
                                kind: "drive#file",
                                name: urlData[0],
                                size: urlData[1],
                                hash: urlData[2],
                                upload_type: "UPLOAD_TYPE_RESUMABLE",
                                objProvider: {
                                    provider: "UPLOAD_TYPE_UNKNOWN"
                                }
                            }
                        } else {
                            postData = {
                                kind: "drive#file",
                                name: "",
                                upload_type: "UPLOAD_TYPE_URL",
                                url: {
                                    url: offUrl
                                },
                                params: {"from":"file"},
                                folder_type: "DOWNLOAD"
                            }
                        }
                        _GM_xmlhttpRequest({
                            method: 'POST',
                            url: 'https://api-drive.mypikpak.com/drive/v1/files',
                            data: JSON.stringify(postData),
                            headers: {
                                authorization: info.loginInfo.token_type + ' ' + info.loginInfo.access_token
                            },
                            onload: (res) => {
                                if(res.status === 200) {
                                    _GM_notification("Task OK");
                                } else if(res.status === 401) {
                                    info.loginInfo=null;
                                    storage.setItem("pikpakUserInfo",info);
                                    const msg = JSON.parse(res.responseText).error_description;
                                    alert(msg);
                                } else if(res.status === 400) {
                                    const msg = JSON.parse(res.responseText).error_description;
                                    alert(msg);
                                } else if(res.status === 403) {
                                    const msg = JSON.parse(res.responseText).error_description;
                                    alert(msg);
                                }
                            }
                        })
                    };
                    if(!info.loginInfo || info.loginInfo.expires < new Date().getTime()){
                        _GM_xmlhttpRequest({
                            method: 'POST',
                            url: 'https://user.mypikpak.com/v1/auth/signin',
                            data: JSON.stringify({
                                "client_id": "YNxT9w7GMdWvEOKa",
                                "client_secret": "dbw2OtmVEeuUvIptb1Coyg",
                                "password": info.userPass,
                                "username": info.userName
                            }),
                            headers: {
                                'user-agent': 'accessmode/ devicename/Netease_Mumu appname/android-com.pikcloud.pikpak cmd/login appid/ action_type/ clientid/YNxT9w7GMdWvEOKa deviceid/56e000d71f4660700ca974f2305171c5 refresh_token/ grant_type/ networktype/WIFI devicemodel/MuMu accesstype/ sessionid/ osversion/6.0.1 datetime/1636364470779 sdkversion/1.0.1.101600 protocolversion/200 clientversion/ providername/NONE clientip/ session_origin/ devicesign/div101.56e000d71f4660700ca974f2305171c5b94c3d4196a9dd74e49d7710a7af873d platformversion/10 usrno/null'
                            },
                            onload: (res) => {
                                if(res.status === 200) {
                                    info.loginInfo=JSON.parse(res.responseText);
                                    if(!info.loginInfo.expires && info.loginInfo.expires_in){
                                        info.loginInfo.expires = new Date().getTime() + 1000 * info.loginInfo.expires_in;
                                    }
                                    storage.setItem("pikpakUserInfo",info);
                                    postUrl();
                                } else if(res.status === 401) {
                                    storage.setItem("pikpakUserInfo","");
                                    const msg = JSON.parse(res.responseText).error_description;
                                    alert(msg);
                                } else if(res.status === 400) {
                                    storage.setItem("pikpakUserInfo","");
                                    const msg = JSON.parse(res.responseText).error_description;
                                    alert(msg);
                                } else if(res.status === 403) {
                                    storage.setItem("pikpakUserInfo","");
                                    const msg = JSON.parse(res.responseText).error_description;
                                    alert(msg);
                                }
                            }
                        })
                    }else{
                        postUrl();
                    }
                });
                return false;
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAArbP5MdNFMdNIrbP4sbP1QdctQdcwvbv////8dYf8sbP9smP/09/8qaf/V4f8iZf/u8/+lwP+duv+UtP+PsP9hkP92n/9nlP/K2v/F1v+7z/+Ytv9Wif9Aef91nv9e7pgKAAAACHRSTlMA+puT/PWHhQBB7XEAAACQSURBVBjTTY8JCsQwCEWdrjFm37p37n/LMdAJfSTgf4IoAPQf8fDpgek4N9NxnwQZJx0/w+UMNd/XV6nluqsBQbRp79Xqvd7ICBCuaHuElMJhdXEspMKGko/YA2LYXyKuiGt8Ca3rfwm052nbjILV1IyFBZFZck4xppwXQ8Srk2wQzXzcIBpDB8w0/vM4AfwACl4LKjajMX0AAAAASUVORK5CYII="
        },
        putio:{
            regex:/app\.put\.io/,
            url:"https://app.put.io/files",
            bgColor:"313131",
            noTxt:true,
            offFunc:function(delLink){
                var rsc = setInterval(function(){
                    var offBtn=document.querySelector('.new-transfer-cta>button');
                    if(offBtn){
                        clearInterval(rsc);
                        var wsc = setInterval(function() {
                            offBtn.click();
                            var textarea=document.querySelector('textarea.mantine-Textarea-input');
                            var root=document.querySelector('.mantine-Skeleton-root');
                            if(textarea && root && root.innerText.indexOf('Loading')==-1){
                                clearInterval(wsc);
                                let lastValue = textarea.value;
                                textarea.value=curlink;
                                let tracker = textarea._valueTracker;
                                if (tracker) {
                                    tracker.setValue(lastValue);
                                }
                                let inputevent = new Event('input', { bubbles: true });
                                textarea.dispatchEvent(inputevent);
                                var event = document.createEvent('HTMLEvents');
                                event.initEvent("input", false, true);
                                textarea.dispatchEvent(event);
                                document.querySelector('.modal-footer-action>button').click();
                                delLink();
                            }
                        },200);
                    }
                },1000);
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABcVBMVEUwMDAtLS09PT0AAAA5OTkwMDA2NjY2NjZ0dHQyMjIxMTH////8/P37+/v+/v35+fk0NDQzMzIiIiIvLzCUlJQ2NDIqKzAgIy8oKCgmJibk5OVQUFFHQjP09PSnp6gmKTAqKiokJCT29vWhoaGMj5tra2tSUlXqwkI6OjuehDo3NjYjJi+Abi4uLi4sLC3f39/Y2NrKy9C5ur62uLqrrriqqqqTlZyZmZl0d4NfXlz/5khGRkb20EW9oD/Vsj6slT6nkz6PejvQrDlSSzhuYDevlTabgTKfgy98ai40MCdJPiAbHBz39/bv7+/q6urR0dLHx8fAwMCws7+vs76dnZ6UlpuFiJKKi4+Hh4dwcXJYXWxnZ2djY2NNTU391kr/2klMS0j/4Ef/10bwxkbvyETYuUA8PUBEQj/juj2iiDyPejy7nDqKdjq1lzmNeTl4aDlaUTdlWTZdUzWegjEZHi91Yy51Yi4NFS1gUihIPiIrJx+VLWttAAAACXRSTlP9+3IAnfahnwf3t+iJAAACD0lEQVQ4y31TB3viMAwV0BuxnRiTC0kgQNmb697tdVz37b333nv011euExLo9/WB41h6epJjC86OxIAQoh0DGgFOJ2DkFCgC0Qj+/SkgQBy6BNQaf2j0uQg5AYkBoD9giKSEIKSvBQTCBRGjxWIxVXQ0ETFCX10z3Wx5Op+ffuQ4QonKAWoD+Oy28jkqoU/MO6oWpaD8wlkcQ5/Ouc4ovedowdbBjzeT1ylnOkUwpDx0k4ME4ZYpNwyamRnnyDCu9VRlioDoNa6gOXf37b9v8xmDMVZ1ZZK+gjaaLRmczuy9frp8cF/HVJO7lhkSzGTqHGZg2ZX6D7PXOI/vU78vFkSogARDEta//hIkiQQ61blgW+YAQdfp7f+e1krVLmM5N3ZWbWtAgeqMlar77v7jDGWM3ums2mKIYDB6qXxrFv2GbtTWh1NgXmRIMNzPhLcUFhkSKBbCdcbp1TcfX2H8sRR4ElyqjDc2F760BRkukh4hNzbX+rzQTBPEkALPVyqVuWcbnfqLZtqURxglMG5M7m1tb/98V3+5vKHio596lpbozZ0nH9bWPn0n6YJ/UpHDqmVo7sHW+79t2y6gy48PrhwOd7Ga/fO82baEJWSEGsGlPbrRu5tLK15axapwVUNo8DxL+QMQv7vUC17LNBERd9A4pmLItVBT6NcAYnDGRBoibNBod3fjkIif0P6xeOIQIYVNqqOTMbQAAAAASUVORK5CYII="
        }
    };
    var enableUrl = 'a[href^="magnet"],[href^="ed2k://|file"],[href$=".torrent"],[href$=".mp4"],[href$=".rar"],[href$=".7z"],[href$=".zip"],[href$=".rmvb"],[href$=".mkv"],[href$=".avi"],[href$=".iso"],[href$=".exe"],[href$=".dmg"]';
    var defaultReg = "^(magnet|ed2k:)|\\.(torrent|mp4|rar|7z|zip|rmvb|mkv|avi|iso|exe|dmg)$";
    var disableUrl=[".torrentkitty.","bt.box.n0808.com"];
    var manageLinksLang={};
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n=(name)=>{
        var config={};
        switch (lang){
            case "zh-CN":
            case "zh-SG":
                config={
                    configure:"全载设置",
                    yyw:"115网盘",
                    baidu:"百度网盘",
                    furk:"Furk网盘",
                    seedr:"Seedr网盘",
                    pcloud:"Pcloud网盘",
                    xunlei:"迅雷离线",
                    xunleipan:"迅雷网盘",
                    xiaomi:"小米路由器",
                    weiyun:"腾讯微云",
                    bitqiu:"比特球",
                    apiv:"九秒云播",
                    torrent:"Itorrents种子下载",
                    btcache:"Btcache.me种子下载",
                    enable:"启用",
                    disable:"禁用",
                    addIcon:"添加站点",
                    settingTitle:"全载",
                    urlRegexpTips:"自定义需要启用一键下载的链接正则，一行一条",
                    disableOnSite:"已于此站点禁用，点击启用",
                    bdPathTips:"不需要加'我的网盘/全部文件'",
                    bdPathTitle:"度盘存储路径：",
                    settingMouseOver:"仅当鼠标经过时显示图标",
                    settingBtn:"设置",
                    allDisableError:"不能全部禁用！",
                    siteRuleSetOK:"设置成功，刷新生效",
                    setOK:"设置成功",
                    regExpError:"含有无效正则，请重新输入",
                    addSiteRuleTitle:"自定义新增图标规则，一行一条",
                    siteRulePlaceholder:"站点 @@ 站名 @@ 下载链接正则 @@ 图标base64 @@ 图标背景颜色 @@ 是否隐藏图标\n\n@@ 分隔，目标站点中用 $url 代替目标链接，$hash 代表目标磁链的 hash 值，${reg}用正则提取，$text代表链接文本，$title代表链接title\n\n可用//注释规则\n\n例如：http://192.168.2.1/d2r?u=$url@@路由器下载\nhttp://xxx.com/magnet/$hash@@磁链下载@@^magnet@@data:image/png;base64,AAA@@ffffff",
                    inputLink:"输入需要离线下载的链接：",
                    importOrNot:"是否导入规则？",
                    importCustomAlert:"点击确定追加规则，点击取消覆盖规则",
                    importOver:"规则导入完毕!",
                    postOver:"发送成功，返回消息：",
                    copyOver:"复制成功！",
                    postError:"发送失败，错误内容：",
                    importCustomSame:"存在同名规则，是否覆盖？",
                    copyLinks:"嗅探下载资源",
                    noLinks:"当前页面没有资源！",
                    userName:"请输入用户账号",
                    userPass:"请输入用户密码",
                    seekKey:"嗅探快捷键："
                };
                manageLinksLang={
                    copyAll:"全部复制",
                    copySel:"复制选中",
                    addTips:"%i代表递增 %n代表文件名",
                    sortByName:"按文件名排序",
                    sortByUrl:"按网址排序",
                    sortByType:"按扩展名排序",
                    preHolder:"批量前缀",
                    nextHolder:"批量后缀",
                    closeBtn:"关闭",
                    typeHead:"类型："
                };
                break;
            case "zh-TW":
            case "zh-HK":
            case "zh-MO":
                config={
                    configure:"全載設置",
                    yyw:"115網盤",
                    baidu:"百度網盤",
                    furk:"Furk網盤",
                    seedr:"Seedr網盤",
                    pcloud:"Pcloud網盤",
                    xunlei:"迅雷離線",
                    xunleipan:"迅雷網盤",
                    xiaomi:"小米路由器",
                    weiyun:"騰訊微雲",
                    bitqiu:"比特球",
                    apiv:"九秒雲播",
                    torrent:"Itorrents種子下載",
                    btcache:"Btcache.me種子下載",
                    enable:"啟用",
                    disable:"禁用",
                    addIcon:"添加站點",
                    settingTitle:"全載",
                    urlRegexpTips:"自定義需要啟用一鍵下載的連結正則，一行一條",
                    disableOnSite:"已於此站點禁用，點擊啟用",
                    bdPathTips:"不需要加'我的網盤/全部文件'",
                    bdPathTitle:"度盤存儲路徑：",
                    settingMouseOver:"僅當滑鼠經過時顯示圖標",
                    settingBtn:"設置",
                    allDisableError:"不能全部禁用！",
                    siteRuleSetOK:"設置成功，刷新生效",
                    setOK:"設置成功",
                    regExpError:"含有無效正則，請重新輸入",
                    addSiteRuleTitle:"自定義新增圖標規則，一行一條",
                    siteRulePlaceholder:"站點 @@ 站名 @@ 下載鏈接正則 @@ 圖標base64 @@ 圖標背景顏色 @@ 是否隱藏圖標\n\n@@ 分隔，目標站點中用 $url 代替目標連結，$hash 代表目標磁鏈的 hash 值，${reg}用正则提取，$text代表連結文本，$title代表連結title\n\n可用//注釋規則\n\n例如：http://192.168.2.1/d2r?u=$url@@路由器下載\nhttp://xxx.com/magnet/$hash@@磁鏈下載@@^magnet@@data:image/png;base64,AAA@@ffffff",
                    inputLink:"輸入需要離線下載的連結：",
                    importOrNot:"是否導入規則？",
                    importCustomAlert:"點擊確定追加規則，點擊取消覆蓋規則",
                    importOver:"規則導入完畢!",
                    postOver:"發送成功，返回消息：",
                    copyOver:"複製成功！",
                    postError:"發送失敗，錯誤内容：",
                    importCustomSame:"存在同名規則，是否覆蓋？",
                    copyLinks:"嗅探下載資源",
                    noLinks:"當前頁面沒有資源！",
                    userName:"請輸入用戶賬號",
                    userPass:"請輸入用戶密碼",
                    seekKey:"嗅探快捷鍵："
                };
                manageLinksLang={
                    copyAll:"全部複製",
                    copySel:"複製選中",
                    addTips:"%i代表遞增 %n代表文件名",
                    sortByName:"按文件名排序",
                    sortByUrl:"按網址排序",
                    sortByType:"按擴展名排序",
                    preHolder:"批量前綴",
                    nextHolder:"批量後綴",
                    closeBtn:"關閉",
                    typeHead:"類型："
                };
                break;
            default:
                config={
                    configure:"Easy-Offline Configure",
                    yyw:"115",
                    baidu:"BaiduPan",
                    furk:"Furk",
                    seedr:"Seedr",
                    pcloud:"Pcloud",
                    xunlei:"Xunlei",
                    xunleipan:"XunleiPan",
                    xiaomi:"MiWifi",
                    weiyun:"Weiyun",
                    bitqiu:"bitqiu",
                    apiv:"Apiv Online play",
                    torrent:"Torrent download in itorrent.org",
                    btcache:"Torrent download in btcache.me",
                    enable:"Enable ",
                    disable:"Disable ",
                    addIcon:"Add new site",
                    settingTitle: "Easy Offline",
                    urlRegexpTips: "Customize the Link Regexp, one per line",
                    disableOnSite: "Disabled currently, click to enable",
                    bdPathTips: "No need to add'/all files'",
                    bdPathTitle: "Path of BDpan:",
                    settingMouseOver: "Display the icon only when the mouse passes over",
                    settingBtn: "Save",
                    allDisableError: "Cannot disable all!",
                    siteRuleSetOK: "Set successfully, refresh takes effect",
                    setOK: "Set successfully",
                    regExpError: "Contains invalid regularity, please re-enter",
                    addSiteRuleTitle: "Customize new icon rules, one per line",
                    siteRulePlaceholder: "site @@ sitename @@ link regexp @@ icon base64 @@ icon background color @@ hide icon\n\nUse @@ to separated, use $url for the target Link, $hash for the hash of the target magnet link, ${reg} for regexp result on link, $text for link text, $title for link title\n\nUse // to comment rule\n\nFor example: http://192.168.2.1/d2r?u=$url@@MyRouter\nhttp://xxx.com/magnet/$hash@@MyMagnetLinkDownload@@^magnet@@data:image/png;base64,AAA@@ffffff",
                    inputLink: "Enter the link that needs to be downloaded with this:",
                    importOrNot:"Do you want to import rules?",
                    importCustomAlert:"Ok to add rule，Cancel to cover rule",
                    importOver:"Rules import over!",
                    postOver:"Post over, return: ",
                    copyOver:"Copy over!",
                    postError:"Fail in post, error: ",
                    importCustomSame:"Rule exists, overwritten?",
                    copyLinks:"Seek downloadable links",
                    noLinks:"No links！",
                    userName:"Input user name",
                    userPass:"Input user pass",
                    seekKey:"Seek key: "
                };
                manageLinksLang={
                    copyAll: "Copy all",
                    copySel: "Copy selected",
                    addTips: "%i means increment, %n means file name",
                    sortByName: "Sort by name",
                    sortByUrl: "Sort by URL",
                    sortByType: "Sort by type",
                    preHolder: "Batch Prefix",
                    nextHolder: "Batch Suffix",
                    closeBtn: "Close",
                    typeHead: "Type:"
                };
                break;
        }
        return config[name]?config[name]:name;
    };

    var _GM_xmlhttpRequest,_GM_registerMenuCommand,_GM_notification,_GM_setClipboard;
    if(typeof GM_xmlhttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM_xmlhttpRequest;
    }else if(typeof GM!='undefined' && typeof GM.xmlHttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM.xmlHttpRequest;
    }else{
        _GM_xmlhttpRequest=(f)=>{fetch(f.url).then(response=>response.text()).then(data=>{let res={response:data};f.onload(res)}).catch(f.onerror())};
    }
    if(typeof GM_registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM_registerMenuCommand;
    }else if(typeof GM!='undefined' && typeof GM.registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM.registerMenuCommand;
    }else{
        _GM_registerMenuCommand=(s,f)=>{};
    }
    if(typeof GM_notification!='undefined'){
        _GM_notification=GM_notification;
    }else if(typeof GM!='undefined' && typeof GM.notification!='undefined'){
        _GM_notification=GM.notification;
    }else{
        _GM_notification=(s)=>{alert(s)};
    }
    if(typeof GM_setClipboard!='undefined'){
        _GM_setClipboard=GM_setClipboard;
    }else if(typeof GM!='undefined' && typeof GM.setClipboard!='undefined'){
        _GM_setClipboard=GM.setClipboard;
    }else{
        _GM_setClipboard=(f)=>{};
    }

    var _unsafeWindow=(typeof unsafeWindow=='undefined')?window:unsafeWindow;
    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',
        supportGMPromise: typeof GM!='undefined' && typeof GM.getValue=='function' && typeof GM.getValue('a','b')!='undefined',
        mxAppStorage:(function(){
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            }
        })(),
        operaUJSStorage:(function(){
            try{
                return window.opera.scriptStorage;
            }catch(e){
            }
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
            }else if(this.supportGMPromise){
                GM.setValue(key,value);
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            }
        },
        getItem:function(key,cb){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(this.supportGMPromise){
                value=GM.getValue(key).then(v=>{cb(v)});
                return;
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            cb(value);
        },
        delItem:function(key){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,"");
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,"");
            }else if(this.supportGM){
                GM_deleteValue(key);
            }else if(this.supportGMPromise){
                GM.deleteValue(key);
            }else if(window.localStorage){
                window.localStorage.setItem(key,"");
            }
        }
    };
    var showType,siteRule;
    //$=jQuery;

    var addIconBg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAALVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBoCg+AAAADnRSTlMAYK1vMOA/ENJ/zmdLF4e4IG4AAACPSURBVBjTYwAB9uTJ6QwwwLju3bt3C6Eclrh3IBAC4cm9gwABsLp3UPAQxPMDMh4pgbgOQB5IFwMDH5BcAFII4UGUciB4rxgY6hC8dwUMeUA2EID5CQx27x5BeEzv3hkwzEPiTUCRm4Ci7wCKmReQ7XuK4pbHKO4MwPADwn/ofkeESws0mLj7gJxGEAs1PAEp8ZbkUx9Q7gAAAABJRU5ErkJggg==";
    var downIconBg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAYM5vMOA/ENGegK2olI6G1b97Z0sXENA+jAAAAKFJREFUKM+FklkSxCAIRHFfss3K/Y86iQSDVqzpH7FfgQpCVfAmGx+gl9JI0qrxrcNLzooEbKUG4EKWdkCiDRV0N0RTrZ5wvdgTTgp4SzCAHxAPZkAM5GOJWuuT7FE5OVPOBFLTYb3Oc2YB5uJ8+G6pgkTGt74ntcCJHiwFLHw10Tdc93jlGXGvSRtsHNpuPs+/o1ODfxAtSL0f7HPC+L/9AF60G3QxO1UaAAAAAElFTkSuQmCC";
    var sitesArr=[],siteSort,regs,overRegs=[];
    var isInited=false;
    var offNodes=[];
    var offUrl,allUrl=[],nodeDict={};
    var i=0;
    var curlink;
    var isDisk=false;
    var configContent;
    var easyOfflineDisable;
    var preNode,targetNode;
    var sNodes=[];
    var parentDiv=$("<div style='display:none;position:absolute;z-index:9999999;overflow:visible;text-align:left;'></div>");

    var funcKey="alt";
    var seekKey="x";

    if(typeof(HTMLElement)!="undefined"){
        HTMLElement.prototype.contains=function(obj) {
            while(obj){
                if(obj==this){
                    return true;
                }
                obj=obj.parentNode;
            }
            return false;
        };
    }

    if(!Array.prototype.indexOf){
        Array.prototype.indexOf = function(e){
            for(var i=0;i<this.length;i++){
                if(e===this[i]){
                    return i;
                }
            }
            return -1;
        };
    }
    storage.getItem("eoReg",v=>{
        regs=v||[];
        if(regs.length){
            defaultReg+='|'+regs.join('|');
        }
        defaultReg=new RegExp(defaultReg, 'i');
        addCustomSites(()=>{
            storage.getItem("siteSort",v=>{
                siteSort=v;
                if(!siteSort)siteSort=["baidu","yyw","furk","seedr"];
                siteSort.forEach(function(item) {
                    var siteConfig=sites[item];
                    if(siteConfig){
                        siteConfig.name=item;
                        sitesArr.push(siteConfig);
                    }
                });
                for(let siteName in sites){
                    let hasSite=false;
                    siteSort.forEach(function(item){if(item==siteName)hasSite=true;});
                    if(hasSite)continue;
                    var siteConfig=sites[siteName];
                    siteConfig.name=siteName;
                    sitesArr.push(siteConfig);
                }
                pageRun();
            });
        });
    });

    function checkKey(e){
        switch(funcKey){
            case "alt":
                return e.altKey;
                break;
            case "ctrl":
                return e.ctrlKey;
                break;
            case "shift":
                return e.shiftKey;
                break;
            case "meta":
                return e.metaKey;
                break;
            default:
                return true;
                break;
        }
        return false;
    }

    function include(things,obj) {
        for (var i = things.length - 1; i >= 0; i--) {
            if ($(things[i]).attr('href')===$(obj).attr('href')){
                return true;
            }
        }
    }

    function init(){
        if(isInited)return;
        isInited=true;
        $("body").append(parentDiv);
        setCss();
    }

    function setCss(){
        $('head').append(`
        <style>
            a.whx-a,a.whx-a-node{
                display:inline-block;
                margin-left:5px;
                background-size:20px!important;
                border-radius:50%;
                border:0px!important;
                vertical-align:middle;
                transition:margin-top 0.25s ease;
                outline:none!important;
                padding:0px!important;
                height:26px!important;
                width:26px!important;
                left:0px!important;
                top:0px!important;
                cursor: pointer;
                background-position:center!important;
                background-repeat:no-repeat!important;
            }
            a.whx-a:hover{
                animation:rotateAni 2s infinite;
                animation-direction:alternate;
                -webkit-animation:rotateAni 2s infinite;
                -webkit-animation-direction:alternate;
                z-index:1;
            }
            @keyframes rotateAni{
                from {transform: rotate(0deg) scale3d(1.2, 1.2, 1.2);}
                to {transform: rotate(360deg);}
            }
            @-webkit-keyframes rotateAni{
                from {transform: rotate(0deg) scale3d(1.2, 1.2, 1.2);}
                to {transform: rotate(360deg);}
            }
            @keyframes rotateAdd{
                from {box-shadow: 0 0 5px 0px #505050;}
                to {box-shadow: 0 0 8px 2px #505050;}
            }
            @-webkit-keyframes rotateAdd{
                from {box-shadow: 0 0 5px 0px #505050;}
                to {box-shadow: 0 0 8px 2px #505050;}
            }
        </style>`);
    }

    function hideIcons(){
        parentDiv.css("display","none");
        for(var node of offNodes){
            node.css("margin-top","0px");
        }
    }

    function addCustomSites(cb){
        storage.getItem("siteRule",v=>{
            siteRule=v;
            if(siteRule){
                var rules=siteRule.split("\n");
                rules.forEach(rule=>{
                    if(/^\s*\/\//.test(rule))return;
                    var ruleArr=rule.split(/\s*@@\s*/);
                    var siteConfig={custom:true};
                    if(ruleArr[1] && (ruleArr[0].indexOf("$url")!=-1 || ruleArr[0].indexOf("$hash")!=-1 || ruleArr[0].indexOf("${")!=-1 || ruleArr[0].indexOf("$base64")!=-1)){
                        siteConfig.noTxt=true;
                        siteConfig.directUrl=function(offUrl, targetNode){
                            let regIndex=ruleArr[0].indexOf("${");
                            if(regIndex!=-1){
                                var strMatch=ruleArr[0].match(/\${(.*?)}/);
                                var regStr=strMatch?strMatch[1]:"";
                                if(!regStr)return;
                                var linkReg,linkMatch,linkResult;
                                if(regIndex==0 || (regIndex==2 && /^[cp]:/.test(ruleArr[0]))){
                                    linkReg=new RegExp(regStr,"i");
                                    return offUrl.replace(linkReg, ruleArr[0].replace(strMatch[0],""));
                                }
                                //全匹配为提取模式
                                linkReg=new RegExp("^"+regStr+"$","i");
                                linkMatch=offUrl.match(linkReg);
                                if(linkMatch){
                                    linkResult=linkMatch[1]||linkMatch[0];
                                    return linkResult?ruleArr[0].replace(/\${.*?}/,linkResult):ruleArr[0];
                                }else{
                                    //部分匹配为替换模式
                                    linkReg=new RegExp(regStr,"gi");
                                    return offUrl.replace(linkReg,"");
                                }
                            }
                            var hash=offUrl.replace("magnet:?xt=urn:btih:","").replace(/&.*/,"");
                            var base64Str=btoa(offUrl);
                            return ruleArr[0].replace("$url", offUrl).replace("$hash", hash).replace("$base64", base64Str).replace("$title", targetNode&&targetNode.title?targetNode.title:document.title).replace("$text", targetNode&&targetNode.innerText?targetNode.innerText:offUrl).replace("$random", Math.random());
                        };
                        if(ruleArr[3]) siteConfig.bgImg=ruleArr[3];
                        else siteConfig.bgImg=downIconBg;
                        if(ruleArr[4]) siteConfig.bgColor=ruleArr[4];
                        else siteConfig.bgColor="f2f2f2";
                        if(ruleArr[2]) {
                            siteConfig.linkRegExp=new RegExp(ruleArr[2],"i");
                            if(ruleArr[5]) {
                                siteConfig.overToShow=true;
                                overRegs.push(ruleArr[2]);
                            }else{
                                regs.push(ruleArr[2]);
                            }
                        }
                        sites[ruleArr[1]]=siteConfig;
                    }else if(ruleArr[1] && ruleArr[0].indexOf("$text")!=-1){
                        siteConfig.directUrl=function(offUrl, targetNode){
                            ruleArr[0]=ruleArr[0].replace("$text{","${");
                            let regIndex=ruleArr[0].indexOf("${");
                            if(regIndex!=-1){
                                var strMatch=ruleArr[0].match(/\${(.*?)}/);
                                var regStr=strMatch?strMatch[1]:"";
                                if(!regStr)return;
                                var linkReg,linkMatch,linkResult;
                                if(regIndex==0 || (regIndex==2 && /^[cp]:/.test(ruleArr[0]))){
                                    linkReg=new RegExp(regStr,"i");
                                    return offUrl.replace(linkReg, ruleArr[0].replace(strMatch[0],""));
                                }
                                //全匹配为提取模式
                                linkReg=new RegExp("^"+regStr+"$","i");
                                linkMatch=offUrl.match(linkReg);
                                if(linkMatch){
                                    linkResult=linkMatch[1]||linkMatch[0];
                                    return linkResult?ruleArr[0].replace(/\${.*?}/,linkResult):ruleArr[0];
                                }else{
                                    //部分匹配为替换模式
                                    linkReg=new RegExp(regStr,"gi");
                                    return offUrl.replace(linkReg,"");
                                }
                            }
                            return ruleArr[0].replace("$text", offUrl).replace("$random", Math.random());
                        };
                        if(ruleArr[3]) siteConfig.bgImg=ruleArr[3];
                        else siteConfig.bgImg=downIconBg;
                        if(ruleArr[4]) siteConfig.bgColor=ruleArr[4];
                        else siteConfig.bgColor="f2f2f2";
                        if(ruleArr[2]) {
                            siteConfig.linkRegExp=new RegExp(ruleArr[2],"i");
                            if(ruleArr[5]) {
                                siteConfig.overToShow=true;
                                overRegs.push(ruleArr[2]);
                            }else{
                                regs.push(ruleArr[2]);
                            }
                        }
                        sites[ruleArr[1]]=siteConfig;
                    }
                });
                let linksReg=regs.concat(overRegs);
                if(linksReg && linksReg.length>0)setLinkCustomReg(new RegExp(linksReg.join("|"),"i"));
            }
            cb();
        });
    }

    function getAllEnableUrl(target) {
        storage.getItem('eoDisable_'+document.domain,v=>{
            if(!v){
                var rawnodes=(target?$(target).find(enableUrl):$(enableUrl)).get(),customnodes=[];
                var nodes = [];
                var i;
                var curNode;
                if(regs){
                    let aTags = (target?$(target).find("a"):$("a")).get();
                    for(let aTag of aTags){
                        for(let reg of regs){
                            reg=reg.trim();
                            if(reg==="")continue;
                            let patt=new RegExp(reg,"i");
                            if(patt.test(aTag.href) && $.inArray(aTag, rawnodes)==-1){
                                customnodes.push(aTag);
                                break;
                            }
                        }
                    }
                }

                if(rawnodes.length > 0){
                    for (i = 0; i < rawnodes.length; i++) {
                        var disable = false;
                        curNode = rawnodes[i];
                        if(curNode.className=="whx-a-node")continue;
                        if(curNode.nextElementSibling && curNode.nextElementSibling.className=="whx-a-node" && curNode.nextElementSibling.parentNode){
                            continue;
                        }
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
                if(customnodes.length > 0){
                    for (i = 0; i < customnodes.length; i++) {
                        curNode = customnodes[i];
                        if(!include(nodes,curNode)){
                            nodes.push(curNode);
                        }
                    }
                }

                let overArr=[];
                if(overRegs){
                    let aTags = (target?$(target).find("a"):$("a")).get();
                    for(let aTag of aTags){
                        for(let reg of overRegs){
                            reg=reg.trim();
                            if(reg==="")continue;
                            let patt=new RegExp(reg,"i");
                            if(patt.test(aTag.href) && !include(nodes, aTag)){
                                nodes.push(aTag);
                                overArr.push(aTag);
                                break;
                            }
                        }
                    }
                }

                if(nodes.length > 0){
                    init();
                    var codeList = [];
                    var listLen = nodes.length;
                    if (listLen !== 0) {
                        for (i = 0; i < listLen; i++) {
                            let curNode = nodes[i];
                            if(curNode.classList.contains("whx-a"))continue;
                            if(target){
                                if(sNodes.indexOf(curNode)!=-1)continue;
                                sNodes.push(curNode);
                            }
                            let href=curNode.href;
                            let clone=$("<a></a>").attr("style",curNode.getAttribute("style")).attr("href",href).addClass('whx-a-node').css("background-color","#e1e1e1").css("background-image",'url("'+downIconBg+'")');
                            if(allUrl.toString().indexOf(href)==-1)allUrl.push(href);
                            clone.mouseover(function(e){
                                var basePos=clone.offset();
                                targetNode=clone[0];
                                showDiskIcons(href,basePos.top,basePos.left);
                                e.stopPropagation();
                            });
                            nodeDict[clone[0]]=curNode;
                            $(curNode).after(clone);
                            let mouseOverType=include(overArr, curNode);
                            if(showType || mouseOverType){
                                clone.hide();
                                $(curNode).mouseover(function(e){
                                    if(clone.is(':hidden') && checkKey(e)){
                                        if(preNode)preNode.hide(100);
                                        clone.show(100);
                                        preNode=clone;
                                    }
                                });
                                clone.mouseout(function(e){
                                    clone.hide();
                                });
                            }
                        }
                    }
                }
            }
        });
    }

    function showDiskIcons(url, top, left){
        offUrl=url;
        let j=0,x;
        parentDiv.css("display","block");
        for(x=0;x<offNodes.length;x++){
            let node=offNodes[x];
            let siteConfig=sites[node.attr("name")];
            if(/^https?:\/\/\w/i.test(offUrl) && siteConfig.noHttp){
                node.hide();
            }else if(/^magnet:\?/i.test(offUrl) && siteConfig.noMag){
                node.hide();
            }else if(/^ftp:\/\/\w/i.test(offUrl) && siteConfig.noFtp){
                node.hide();
            }else if(/^ed2k:\/\/\w/i.test(offUrl) && siteConfig.noEd2k){
                node.hide();
            }else if(!/^(https?|ftp|ed2k):\/\/\w|^magnet:\?/i.test(offUrl) && siteConfig.noTxt){
                node.hide();
            }else if(siteConfig.linkRegExp && !siteConfig.linkRegExp.test(offUrl)){
                node.hide();
            }else if(!defaultReg.test(offUrl) && !siteConfig.custom){
                node.hide();
            }else{
                node.show();
                node.css("margin-top",-j*25+"px");
                j++;
            }
        }
        if(j==0){
            parentDiv.css("display","none");
            return;
        }
        parentDiv.offset({top:top,left:left});
        var minTop=$(document).scrollTop()+(j-1)*25;
        if(top<minTop){
            parentDiv.offset({top:minTop,left:left});
            var lastTop=parentDiv.position().top;
            var lastLeft=parentDiv.position().left;
            parentDiv.offset({top:top,left:left});
            parentDiv.animate({top:lastTop+"px",left:lastLeft+"px"});
        }
    }

    function getRightUrl(url){
        var newUrl = url;
        if(/^magnet/.test(url)){
            newUrl=newUrl.split("&")[0].substring(20);
            if(newUrl.length==32){
                newUrl="magnet:?xt=urn:btih:" + base32To16(newUrl);
            }else{
                newUrl=url;
            }
        }else if(/^\/\//.test(url)){
            newUrl=location.protocol+url;
        }
        return newUrl;
    }

    function base32To16(str){
        if(str.length % 8 !== 0 || /[0189]/.test(str)){
            return str;
        }
        str = str.toUpperCase();
        var bin = "", returnStr = "", i;
        for(i = 0;i < str.length;i++){
            var charCode=str.charCodeAt(i);
            if(charCode<65)charCode-=24;
            else charCode-=65;
            charCode='0000'+charCode.toString(2);
            charCode=charCode.substr(charCode.length-5);
            bin+=charCode;
        }
        for(i = 0;i < bin.length;i+=4){
            returnStr += parseInt(bin.substring(i,i+4),2).toString(16);
        }
        return returnStr;
    }

    function urlArgs(query){
        let args = {};
        let param=query.match(/\[.*\]/);
        let pairs = query.replace(param, "!@_@!").split('&');
        pairs.forEach((item) => {
            item=item.replace("!@_@!", param);
            let pos = item.indexOf('=');
            if (pos != -1) {
                let name = item.substr(0,pos);
                let value = item.substr(pos+1);
                value = decodeURIComponent(value);
                if(/^[\[{]/.test(value)){
                    try{
                        value = JSON.parse(value);
                    }catch(e){}
                }
                args[name] = value;
            }
        })
        return args;
    }

    function pageRun(){
        for(var x = 0; x < sitesArr.length; x++){
            let offNode=$("<a></a>");
            offNode.addClass('whx-a').css("position","absolute").css("margin-top","0px").css("margin-left","0px").attr("target","_blank");
            let siteConfig=sitesArr[x];
            offNode.css("background-color","#"+siteConfig.bgColor).attr("title",i18n(siteConfig.name) ).attr("href", siteConfig.url).attr("name", siteConfig.name);
            offNode.click(function(e){
                offUrl=getRightUrl(offUrl);
                if(siteConfig.directUrl){
                    if(e.ctrlKey && e.shiftKey){
                        let linkRegExp=siteConfig.linkRegExp || /.*/;
                        let aTags = $("a.whx-a-node").get(),urlArr=[];
                        for(let aTag of aTags){
                            aTag=nodeDict[aTag];
                            if(!aTag)continue;
                            if(linkRegExp.test(aTag.href)){
                                let url=siteConfig.directUrl(getRightUrl(aTag.href), aTag);
                                if(/^c:/.test(url)){
                                    urlArr.push(url.replace(/^c:/i,""));
                                }else if(/^p:/.test(url)){
                                    url=url.match(/p:(.*?)\?(.*)/);
                                    if(!url)return;
                                    let postData=JSON.stringify(urlArgs(url[2]));
                                    url=url[1];
                                    _GM_xmlhttpRequest({
                                        method: "POST", url: url, data: postData,
                                        onload: (d) => {
                                            _GM_notification(i18n("postOver")+d.statusText);
                                        },
                                        onerror: (e) => {
                                            _GM_notification(i18n("postError")+(e.statusText||e.error));
                                        },
                                        ontimeout: (e) => {
                                            _GM_notification(i18n("postError")+(e.statusText||e.error));
                                        }
                                    });
                                    e.preventDefault();
                                }else if(url){
                                    window.open(/:\/\//.test(url)?url:("http://"+url));
                                }else{
                                    e.preventDefault();
                                }
                            }
                        }
                        if(urlArr.length>0){
                            _GM_setClipboard(urlArr.join("\n"));
                            _GM_notification(i18n("copyOver"));
                        }
                    }else{
                        let url=siteConfig.directUrl(offUrl, nodeDict[targetNode]);
                        if(/^c:/.test(url)){
                            _GM_setClipboard(url.replace(/^c:/i,""));
                            _GM_notification(i18n("copyOver"));
                        }else if(/^p:/.test(url)){
                            url=url.match(/p:(.*?)\?(.*)/);
                            if(!url)return;
                            let postData=JSON.stringify(urlArgs(url[2]));
                            url=url[1];
                            _GM_xmlhttpRequest({
                                method: "POST", url: url, data: postData,
                                onload: (d) => {
                                    _GM_notification(i18n("postOver")+d.statusText);
                                },
                                onerror: (e) => {
                                    _GM_notification(i18n("postError")+(e.statusText||e.error));
                                },
                                ontimeout: (e) => {
                                    _GM_notification(i18n("postError")+(e.statusText||e.error));
                                }
                            });
                            e.preventDefault();
                        }else if(url){
                            offNode.attr('href', /:\/\//.test(url)?url:("http://"+url));
                        }else{
                            e.preventDefault();
                        }
                    }
                }else{
                    if(e.ctrlKey && e.shiftKey && siteConfig.canMul){
                        storage.setItem(siteConfig.name+":eoUrl",allUrl);
                    }else storage.setItem(siteConfig.name+":eoUrl",offUrl);
                }
                e.stopPropagation();
            });
            if(siteConfig.bgImg)offNode.css("background-image","url(\""+siteConfig.bgImg+"\")");
            if(siteConfig.hide)continue;
            storage.getItem("eoHide"+siteConfig.name,v=>{
                if(!v){
                    offNodes.push(offNode);
                    parentDiv.prepend(offNode);
                }
            });
        }
        var marginTop=offNodes.length*25;
        parentDiv.prepend($('<div style="position:absolute;width:25px;height:'+marginTop+'px;margin-top:-'+(marginTop-25)+'px;background-color:white;opacity:0.001;"></div>'));
        parentDiv.mouseout(function(e){
            var relatedTarget=(e.relatedTarget||e.fromElement);
            if(relatedTarget && !parentDiv[0].contains(relatedTarget)){
                hideIcons();
            }
        });
        parentDiv.mouseover(function(e){
            e.stopPropagation();
        });
        document.addEventListener("mouseover", function(e){
            //if(parentDiv.css("display")!="none")hideIcons();
        });
        storage.getItem("showType",v=>{
            showType=!!v;
            if(showType){
                document.addEventListener("click", function(){
                    if(preNode)preNode.hide(300);
                });
            }
        });
        storage.getItem("funcKey",v=>{
            funcKey=v||"alt";
        });
        storage.getItem("seekKey",v=>{
            seekKey=v||"x";
        });

        for(x = 0; x < sitesArr.length; x++){
            let siteConfig=sitesArr[x];
            if(siteConfig.regex && siteConfig.regex.test(location.hostname)){
                isDisk=true;
                storage.getItem(siteConfig.name+':eoUrl',v=>{
                    curlink=v;
                    if(curlink){
                        if(siteConfig.offFunc)siteConfig.offFunc(function(){storage.delItem(siteConfig.name+':eoUrl');});
                    }
                });
                break;
            }
        }
        if(/greasyfork\.org\/.*scripts\/22590[^\/]*(\/discussions|\/?$)|github\.com\/hoothin\/UserScripts\/(tree\/master\/Easy%20offline|issues)/.test(location.href)){
            $("pre").attr("contentEditable", true);
            $("pre").mousedown(e=>{
                let selObj=document.getSelection().anchorNode;
                if(selObj && selObj.parentNode){
                    selObj=selObj.parentNode;
                    if(selObj.tagName=="CODE"){
                        selObj=selObj.parentNode;
                    }
                    if(selObj==e.currentTarget && selObj.tagName=="PRE"){
                        return;
                    }
                }
                let targetText=e.target.innerText.trim();
                if(e.target.childNodes.length!=1 || targetText.indexOf("@@")==-1 || !window.confirm(i18n("importOrNot")))return;
                if(siteRule != targetText && (!siteRule || siteRule.indexOf(targetText)==-1)){
                    if(siteRule && window.confirm(i18n("importCustomAlert"))){
                        let rules=targetText.split("\n"),sameArr=[],diffArr=[];
                        rules.forEach(rule=>{
                            var ruleArr=rule.replace(/\s/g,"").split("@@");
                            if(ruleArr[1] && sites[ruleArr[1]]){
                                sameArr.push(rule);
                            }else{
                                diffArr.push(rule);
                            }
                        });
                        if(sameArr.length>0){
                            if(window.confirm(i18n("importCustomSame"))){
                                sameArr.forEach(sameRule=>{
                                    var sArr=sameRule.replace(/\s/g,"").split("@@");
                                    siteRule = siteRule.replace(new RegExp("\\S+@@"+sArr[1]+"\\S+"),sameRule);
                                });
                            }
                            siteRule=siteRule.trim()+"\n"+diffArr.join("\n");
                        }else{
                            siteRule=siteRule.trim()+"\n"+targetText;
                        }
                    }else{
                        siteRule=targetText;
                    }
                    storage.setItem("siteRule", siteRule);
                }
                alert(i18n("importOver"));
            });
        }
        if(location.href.indexOf("github.com/hoothin/UserScripts/tree/master/Easy%20offline") != -1){
            setting();
        }else if(!isDisk){
            if(/greasyfork\.org\/.*scripts\/22590[^\/]*$/.test(location.href)){
                //setting();
            }
            setTimeout(function(){
                getAllEnableUrl();
                var MutationObserver = _unsafeWindow.MutationObserver || _unsafeWindow.WebKitMutationObserver || _unsafeWindow.MozMutationObserver;
                if(MutationObserver){
                    var observer = new MutationObserver(function(records){
                        records.map(function(record) {
                            if(record.addedNodes.length && record.addedNodes[0].className!="whx-a-node")setTimeout(function(){getAllEnableUrl(record.addedNodes);},501);
                        });
                    });
                    var option = {
                        'childList': true,
                        'subtree': true
                    };
                    observer.observe(document.body, option);
                }
            },1000);
        }
    }

    function setting(){
        init();
        if(!configContent){
            $('head').append(`
            <style>
                .whx-btn{
                    background-color:#3892ed;
                    transition:background-color 0.15s ease;
                }
                .whx-btn:hover{
                    background-color:#83c1ff;
                }
                #configContent a{
                    color:#5c5c5c;
                    transition: color 0.25s ease-out;
                }
                #configContent a:hover{
                    color:red;
                }
            </style>`);
            configContent=document.createElement("div");
            configContent.id="configContent";
            configContent.style.display="none";
            document.body.appendChild(configContent);
            configContent.innerHTML=`
                <div style="text-align: center;width:300px;min-height:300px;position:fixed;left:50%;top:50%;margin-top:-250px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;color:#6e7070;">
                    <a href="https://greasyfork.org/scripts/22590#additional-info" style="position: absolute; width: 100%; left: 0; text-decoration: underline;">${i18n("settingTitle")}</a>
                    <a id="easyOfflineDisable" href="#" style="color: red;top: 18px; position: absolute; width: 100%; left: 0; text-decoration: underline;display:none;">${i18n("disableOnSite")}</a>
                    <div style="text-align:center;font-size: 12px;margin-top: 38px;">${i18n("urlRegexpTips")}</div>
                    <textarea id="configInput" placeholder="http:.*\\.php\\?getRes=\\d+\n\\.doc$\n\\.xls$\n\\.ppt$" style="position:absolute;left:18px;top:60px;width:260px;height:110px;background-color:white;color:black;"></textarea>
                    <div style="text-align:center;font-size:12px;margin-top:125px;" title="${i18n("bdPathTips")}">${i18n("bdPathTitle")}<input id="baiduPath" placeholder="例：/av" style="width:170px;border-width:1px;border:solid 1px;"></div>
                    <div id="icons" style="position: static; display: inline-block; margin-top: 10px;width: 100%;margin-left: 10px;"></div>
                    <label style="position: static; width: 300px;"><input id="showType" type="checkbox"/>${i18n("settingMouseOver")}</label>
                    <select style="position: static;width: 80px;margin: 10px 110px 10px;" id="funcKey">
                        <option value="alt">Alt key</option>
                        <option value="ctrl">Ctrl key</option>
                        <option value="shift">Shift key</option>
                        <option value="meta">Meta key</option>
                        <option value="noKey">No key</option>
                    </select>
                    <div style="text-align:center;font-size:12px;">${i18n("seekKey")}<input id="seekKey" placeholder="x" style="width:20px;border-width:1px;border:solid 1px;" value="x"></div>
                    <button id="configSave" class="whx-btn" type="button" style="position:static;width:80px;height:30px;color:white;border-radius:5px;border:0px;outline:none;cursor:pointer;margin: 10px 110px 10px;">${i18n("settingBtn")}</button>
                    <div id="configQuit" class="whx-btn" style="width:28px;height:28px;border-radius:14px;position:absolute;right:2px;top:2px;cursor:pointer;">
                        <span style="height:28px;line-height:28px;display:block;color:#FFF;text-align:center;font-size:10px;">╳</span>
                    </div>
                </div>`;
            var configInput=configContent.querySelector("#configInput");
            var configQuit=configContent.querySelector("#configQuit");
            var configSave=configContent.querySelector("#configSave");
            var showTypeCheck=configContent.querySelector("#showType");
            var baiduPath=configContent.querySelector("#baiduPath");
            var funcKeySelect=configContent.querySelector("#funcKey");
            var seekKeyInput=configContent.querySelector("#seekKey");
            var icons=$("#icons"),dragIcon;
            easyOfflineDisable = configContent.querySelector("#easyOfflineDisable");
            $(easyOfflineDisable).click(function (event) {
                easyOfflineDisable.style.display="none";
                toggleIcon("enable");
            });
            icons[0].ondrop=function(e){
                var nextIcon;
                $("#icons>div").each(function(){
                    nextIcon=$(this);
                    if(e.pageX<nextIcon.offset().left+25 && e.pageY<nextIcon.offset().top+25){
                        if(this!=dragIcon)
                            nextIcon.before(dragIcon);
                        return false;
                    }
                });
                siteSort=[];
                $("#icons>div").each(function(){
                    siteSort.push($(this).attr("name"));
                });
                storage.setItem("siteSort",siteSort);
            };
            icons[0].ondragover=function(e){
                e.preventDefault();
            };
            for(var x = 0; x < sitesArr.length; x++){
                let siteConfig=sitesArr[x];
                if(siteConfig.hide)continue;
                let icon=$("<div style='height:26px;width:26px;float:left;border-radius:50%;background-position:center;background-repeat:no-repeat;background-size:20px;margin-left:2px;cursor:pointer'></div>");
                icon.css("background-color","#"+siteConfig.bgColor).attr("title",i18n("disable")+i18n(siteConfig.name) ).attr("draggable",true).attr("name",siteConfig.name);
                icon[0].ondragstart=function(e){
                    dragIcon=this;
                };
                storage.getItem("eoHide"+siteConfig.name,v=>{
                    if(v){
                        icon.css("opacity","0.2");
                        icon.attr("title",i18n("enable")+i18n(siteConfig.name) );
                    }
                });
                if(siteConfig.bgImg)icon.css("background-image","url(\""+siteConfig.bgImg+"\")");
                icon.on("click", function(){
                    storage.getItem("eoHide"+siteConfig.name,v=>{
                        var eoHide=v;
                        if(!eoHide){
                            var allHide=true;
                            $("#icons>div").each(function(){
                                if(this!=icon[0] && $(this).css("opacity")!="0.2"){
                                    allHide=false;
                                    return false;
                                }
                            });
                            if(allHide){
                                alert(i18n("allDisableError"));
                                return;
                            }
                        }
                        storage.setItem("eoHide"+siteConfig.name, !eoHide);
                        icon.css("opacity",eoHide?"1":"0.2");
                        icon.attr("title",(eoHide?i18n("disable"):i18n("enable"))+i18n(siteConfig.name) );
                    });
                });
                icons.append(icon);
            }
            var addSiteRules=document.createElement("div");
            addSiteRules.innerHTML=`
                <div style="width:300px;min-height: 455px;position:fixed;left:50%;top:50%;margin-top:-250px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;color:#6e7070;">
                    <div style="text-align:center;font-size: 12px;margin-top: 28px;">${i18n("addSiteRuleTitle")}</div>
                    <button id="siteRuleSave" class="whx-btn" type="button" style="position: absolute;width:80px;height:30px;bottom: 0px;color:white;border-radius:5px;border:0px;outline:none;margin: 10px 110px 10px;cursor:pointer;left:0;">${i18n("settingBtn")}</button>
                    <textarea id="siteRuleInput" placeholder="${i18n("siteRulePlaceholder")}" style="resize: auto;position: absolute;left: 18px;top: 55px;width: 260px;height: 350px;background-color: white;color: black;margin-top: 0px;margin-bottom: 0px;"></textarea>
                    <div id="siteRuleQuit" class="whx-btn" style="width:28px;height:28px;border-radius:14px;position:absolute;right:2px;top:2px;cursor:pointer;">
                        <span style="height:28px;line-height:28px;display:block;color:#FFF;text-align:center;font-size:10px;">╳</span>
                    </div>
                </div>`;
            let addIcon=$("<span style='height:26px;width:26px;float:left;border-radius:50%;background-position:center;background-repeat:no-repeat;background-size:20px;margin-left:2px;cursor:pointer;animation: rotateAdd 1s infinite; animation-direction: alternate; -webkit-animation: rotateAdd 1s infinite; -webkit-animation-direction: alternate;'></span>");
            addIcon.attr("title",i18n("addIcon")).css("background-image","url(\""+addIconBg+"\")");
            addIcon[0].onclick=function(e){
                document.body.appendChild(addSiteRules);
            };
            icons.append(addIcon);
            $("#siteRuleInput", addSiteRules).val(siteRule);
            $("#siteRuleQuit", addSiteRules).click(function (event) {
                if(addSiteRules.parentNode)addSiteRules.parentNode.removeChild(addSiteRules);
            });
            $("#siteRuleSave", addSiteRules).click(function (event) {
                storage.setItem("siteRule", $("#siteRuleInput", addSiteRules).val());
                alert(i18n("siteRuleSetOK"));
                if(addSiteRules.parentNode)addSiteRules.parentNode.removeChild(addSiteRules);
            });

            configContent.style.display="block";
            storage.getItem("eoReg",v=>{if(v)$(configInput).val(v.join("\n"))});
            storage.getItem("baiduPath",v=>{if(v)$(baiduPath).val(v)});
            storage.getItem("seekKey",v=>{if(v)$(seekKeyInput).val(v)});
            storage.getItem("funcKey",v=>{if(v)$(funcKeySelect).val(v)});
            storage.getItem("showType",v=>{if(v)showTypeCheck.checked=true});
            $(configQuit).click(function (event) {configContent.style.display="none";});
            $(configSave).click(function (event) {
                var regStr=$(configInput).val();
                var baiduPathStr=$(baiduPath).val().trim();
                if(baiduPathStr)storage.setItem("baiduPath",/^\//.test(baiduPathStr)?baiduPathStr:("/"+baiduPathStr));
                if(/^\s*$/.test(regStr)){
                    storage.delItem("eoReg");
                }else{
                    var regStrs=regStr.split("\n");
                    for(var reg of regStrs){
                        try{
                            new RegExp(reg,"i");
                        }catch(e){
                            alert(i18n("regExpError"));
                            return;
                        }
                    }
                    storage.setItem("eoReg",regStrs);
                }
                storage.setItem("showType", showTypeCheck.checked);
                funcKey=funcKeySelect.value;
                storage.setItem("funcKey", funcKey);
                seekKey=seekKeyInput.value;
                storage.setItem("seekKey", seekKey);
                alert(i18n("setOK"));
            });
        }
        configContent.style.display="block";
        storage.getItem('eoDisable_'+document.domain,v=>{
            easyOfflineDisable.style.display=v?"block":"none";
        });
    }

    function toggleIcon(force){
        $('.whx-a-node').toggle(500);
        $('.whx-a-node').mouseout();
        storage.getItem('eoDisable_'+document.domain,v=>{
            if(force=="enable" || v){
                storage.delItem('eoDisable_'+document.domain);
                if($('.whx-a-node').length<1)getAllEnableUrl();
            }else{
                storage.setItem('eoDisable_'+document.domain,true);
            }
        });
    }

    function goSetting(){
        setting();
        //location.href="https://github.com/hoothin/UserScripts/tree/master/Easy offline#一键离线下载";
    }

    function checkSel(e){
        var sel=document.getSelection();
        var link=sel.toString(),validReg=/^\s*(magnet:\?xt=urn:btih:|ed2k:\/\/\|file|https?:|ftp:)/i;
        if(!link){
            if(targetA) link=targetA.href;
            else link=prompt(i18n("inputLink"),"magnet:?xt=urn:btih:");
        }else{
            init();
            showDiskIcons(link.trim(),mouseEve.pageY-10,mouseEve.pageX-10);
        }
    }
    initLang(manageLinksLang);
    function copyLink() {
        showLinkFrame(function(r){
            if(r){
                _GM_setClipboard(r);
                _GM_notification(i18n("copyOver"));
            }else{
                _GM_notification(i18n("noLinks"));
            }
        });
    }

    var mouseEve,targetA;
    document.addEventListener("mousemove", function(e) {
        mouseEve=e;
    });
    document.addEventListener("mouseover", function(e) {
        if(e.target && e.target.tagName=="A"){
            targetA=e.target;
        }else{
            targetA=null;
        }
    });
    document.addEventListener("mouseup", function(e) {
        hideIcons();
        var sel=document.getSelection().toString();
        if(sel && checkKey(e)){
            checkSel(e);
            parentDiv.offset({top:mouseEve.pageY-38,left:mouseEve.pageX-10});
        }
    });
    document.addEventListener("keydown", function(e) {
        if(e.keyCode == 120) {
            if(checkKey(e)){
                checkSel(e);
            }else if(!(e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)){
                toggleIcon();
            }
        }else if(String.fromCharCode(e.keyCode).toLowerCase() == seekKey && checkKey(e)) {
            copyLink();
            e.stopPropagation();
        }
    },true);
    _GM_registerMenuCommand(i18n("configure"), goSetting);
    _GM_registerMenuCommand(i18n("copyLinks"), copyLink);
})();