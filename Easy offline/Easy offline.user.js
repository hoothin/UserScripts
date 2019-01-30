// ==UserScript==
// @name         Easy offline
// @name:zh-CN   一键离线下载
// @name:zh-TW   一鍵離綫下載
// @description  Find out all magnet links and torrents and video links in current page, and stream them from cloud storage automatically.
// @description:zh-CN 一键自动将磁链、bt种子或其他下载资源离线下载至网盘
// @description:zh-TW 一鍵自動將磁鏈、bt種子或其他下載資源離綫下載至網盤
// @namespace    http://tampermonkey.net/
// @require      https://cdn.jsdelivr.net/jquery/1.7.2/jquery.min.js
// @require      https://cdn.jsdelivr.net/hi-base64/0.2.0/base64.min.js
// @version      1.5.8
// @author       Hoothin
// @mail         rixixi@gmail.com
// @include      http*://*/*
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
        baidu:{
            regex:/pan\.baidu\.com/,
            url:"https://pan.baidu.com/disk/home",
            bgColor:"ffffff",
            canMul:true,
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABjFBMVEX////7+/v+/v/8/Pwyf/wzc/w0bvza5f4xffz5+//0+P8ybPz8/f4yevw0cPwza/z39/cwe/UxdfzSPyr4+v/2+f/m7/53nv0vf/wvce9pof1tlPwxf/gzfPYwePPp8f7Z5/7S4v7P4P7L3f7I2f2Gtf2Rr/1hkP0yd/1FiPwygfxAdPxspftYkvUtc/Dg6f7C2f7F1f54oP1flf0/hfwsbu7i7f/w9f7b5v7X5f7V4v6nyv6oxv6jwP6Ns/2Lsf1/rv1+ov1zof1xof10nf1jm/1djP0xe/2NufxalvxHj/xPhvxKgPxHffw+efw0ePyXu/mqxPg5hfiTtvdyo/dgmfdOj/dBhfVflfQvefT+9fOIqvMyefNMhvFIgO9MeePyycVjZbzKb3DaZVa/Q0Dx9f+Bp/1olv1gkPw0dvzg6Pu2zPk0gflNjPctc/c9gfX88/JJfO3n3+ni2unHxuSGktNpdtBJY8paashRW71nXqp7YpyDYJKpaIKPU33AVFXARkTVTTvFQjrUPypKwHq1AAACAklEQVQ4y4WTB3OqQBSFF3BpAk+KIBixJ2rs0fTee68vvbzee+9//O1Cio46npmFPfd8d2cY9gIASMJHUESDKFQmAZJAUKCFKELA/WSr3A3d/tZnAF99C8fVHYhiosbxxflsdr7I15SIWiCe3exA2szGmwOJXTkUkvHaTTQD9NyBLO/t7OzJ8kFObwKs2/bRdrSvL7p9ZNvrjQC/n8/nwngXzuXz+3wDED42zS13u2Wax+EGQD+pmhvudsOsnuj1gBAZSp5+/XRIYkMeVu1XyaGIcAfoycVM4Pn3qx9vcW3gRUcmE8gsJvUboNfyeDyBwLd/6sX7wtNnC45DD6vXBbRx1sOmrQ+/VFX9efomhFzFstLoNa45QKzCijMx/vXZpar+/fKSZecWijwfmxHZSgzFFBgWxXQUIJ39UX9/nhPFngHsomlRHEYxRY6mlCkOl+5fXp2vraV6IgCLm1JSoyQGxhRlUnCAi/PUEwXnWMKkooxhAIxAuNSPS+8+Qgi7GOB3zutfgnAExQSIr0JoMJw2GJSghPLSo4eDGscYEK7Gna/gy7QkLRvTK5JEP2bAgy4vvTJtLCNX5h0AMLNemvbihfqBv3zjZpHDACKM7ntI3RMFgFSYcJ3B3P0sf6kzGOxM+AFwXAK7kuNurz2pcWTt7deuna/t4LQdvbbD23b8/wPY0UTO99dD5gAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                var gsi = setInterval(function() {
                    var newOffBtn = document.querySelector('.g-button[data-button-id=b35]');
                    if(newOffBtn){
                        clearInterval(gsi);
                        newOffBtn.click();
                        var bsi = setInterval(function() {
                            var newTaskBtn = document.querySelector('#_disk_id_2');
                            if(newTaskBtn){
                                clearInterval(bsi);
                                newTaskBtn.click();
                                var bsl = setInterval(function() {
                                    var offLink=document.querySelector('#share-offline-link');
                                    if(offLink){
                                        clearInterval(bsl);
                                        var beginOffline=function(){
                                            if(curlink.length===0)return;
                                            if(Object.prototype.toString.call(curlink) === '[object Array]')
                                                offLink.value = curlink.shift();
                                            else{
                                                offLink.value = curlink;
                                                curlink="";
                                            }
                                            delLink();
                                            var baiduPathStr=GM_getValue("baiduPath"),isBt=/^magnet|torrent$/.test(offLink.value);
                                            if(baiduPathStr){
                                                unsafeWindow.require("function-widget-1:offlineDownload/util/newOfflineDialog.js").obtain()._checkPath=baiduPathStr;
                                            }
                                            $("#newoffline-dialog").find("span:contains('确定')[class='text']").click();
                                            if(isBt)
                                                var i=0, bsb = setInterval(function(){
                                                    var btList=document.querySelector('#offlinebtlist-dialog');
                                                    if(btList && btList.style.display!="none"){
                                                        clearInterval(bsb);
                                                        if($(".content-title-name").html()=="文件名")$("a.checked-all")[0].click();
                                                        btList.querySelectorAll('.dialog-footer>.g-button')[1].click();
                                                    }else if(++i>50){
                                                        clearInterval(bsb);
                                                    }
                                                }, 200);
                                            var ckeckEnd=function(){
                                                var bck=setInterval(function(){
                                                    if(document.querySelector("#offlinelist-dialog").style.display!="none"){
                                                        clearInterval(bck);
                                                        beginOffline();
                                                    }else if(document.querySelector("#dialog1").style.display!="none"){
                                                        clearInterval(bck);
                                                        var inputCode=$("#dialog1").find(".input-code");
                                                        inputCode.focus();
                                                        bck=setInterval(function(){
                                                            if(inputCode.val().length==4){
                                                                clearInterval(bck);
                                                                $("#dialog1").find("span:contains('确定')[class='text']").click();
                                                                ckeckEnd();
                                                            }
                                                        },200);
                                                    }
                                                },500);
                                            };ckeckEnd();
                                        };beginOffline();
                                    }
                                }, 500);
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
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEX///////8bytT///8fy9UbytQbytQfy9Ufy9UmzNYbytQgy9UizNUbytT///8bytQey9Ufy9Ugy9VG1NxB09sbytRg2uFS194bytT///9G1Nzx/Pzi+PpT19+c6OxZ7rqXAAAAGHRSTlMBG/AHxYAh49O3oWJBMRUR4bOLYV9RQz9fW5zbAAAAbUlEQVQY043MRxLCMBBE0WYkOQcyXybc/5hIhUuww2/3u2pGG1WdYV1VujcyG9ceWdmcM8jDK8bHE0LqCzMQF5Y7NOnNgeE7MATBMQ+fE/q9wCwNkDUetUAZPLVuxq+z3LWlqE9OctOumFL/9QYClwvt3NkDkgAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                var psc = setInterval(function() {
                    var upBtn = document.querySelector('div.upload_button');
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
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUhRYr///+XqcjV3OmJnMFTb6QoS45PbKLu8fbZ4OvBy95xiLRifKxbdqlXcqYxU5P3+Prh5u/O1uXH0eK6xduks89/lLtGZJ4ysMfhAAAAVUlEQVQY04WPSQ6AMAwD6ySkdKHs8P+fckyDhPBtRoojhyG4GP6FEjPvxhGZiKKJPM7uoAHYSif0Lgdw+tppQfOGIF4ILsea3CetvMa+UaRq+Mh7/gPkxAHFh9WDUQAAAABJRU5ErkJggg==",
            offFunc:function(delLink){
                var rsc = setInterval(function() {
                    if (document.readyState == 'complete') {
                        clearInterval(rsc);
                        setTimeout(function() {
                            unsafeWindow.Core.OFFL5Plug.OpenLink();
                            setTimeout(function() {
                                $('#js_offline_new_add').val(curlink);
                                delLink();
                            }, 1);
                        }, 1000);
                    }
                }, 300);
            }
        },
        furk:{
            regex:/www\.furk\.net/,
            url:"https://www.furk.net/users/files/add",
            bgColor:"fff",
            hide:false,
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
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAllBMVEXGKBPGKBPGKBPGKBPORDLJMh3uv7nQTDvILRjprKPmoZjbdmnLOyjKNSHtvLbrtK3opp3lm5Hhj4Tac2XZb2HXalvUXEzLOibGKBPGKBPGKBPqsarjlovehHjXaFnTWkrMQC3GKBPGKBPGKBP////44+H77u323Nj01dHxycP88vH66+n23dr019Tyz8rxzMfvw73vwrxYVj9BAAAAJHRSTlP7yb+j+/v9+/v9/f37+/39/f39/f39+/uxmSj9/f37+/uXNR2Gd9E6AAAAmUlEQVQY003NVxKDMAxFUQVsbHqv6YkMIT3731wEZoD7oZl3fgQXY7PKaKACKn93BxirwaArWsQXH8EcYYeUu4BnDRAsUKgBWjZDeqfduXKGmHbPT3YiJ9giPtj+qUJWavghxoUSHFxLAz3JIgcAypsGBzF3bAJvAvHB5PiVnm8HGoBZIffTVvWMoIIhX4KIMg5whsbcrKqvf29uDBcu2+SAAAAAAElFTkSuQmCC",
            offFunc:function(delLink){
                var sdi = setInterval(function() {
                    if($('#upload-button').css("display") != "none"){
                        window.clearInterval(sdi);
                        setTimeout(function() {
                            $(':text[name="torrent"]').val(curlink);
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
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAAARsPUSr/QWsfkTsvUWuv8RsvkSr/URsPUSsPQr1f8RsPUSsPYRr/USr/USr/USsfQSsPUTsPURsPURsfYSsPUTsPgRr/UxdyaHAAAAF3RSTlMA1LsuMw0q8pSPBrSK28ygeHJqZjqqRB/r5Z8AAACRSURBVBjTZc9bFoMgDARQogRFBMpDZ/877UDtl/PHPTAkZsR52Tbxzvxy7HiyH/PsBFLu3hKwDNnX5dRy5aof3uF7EE6rNkRLccYTwuwKURO8EYKdYFEbxGwEnaDIHRuh5/+NZSUIWn06BghLk8YwfgGBpSvwsRGMnATHwSha81WUsI/RFyC1fheBuOO93Gv9Lw0KCbAF32RQAAAAAElFTkSuQmCC",
            offFunc:function(delLink){
                var rsc = setInterval(function(){
                    var offBtn=document.querySelector('.js-cloud-download');
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
            regex:/lixian\.vip\.xunlei\.com/,
            url:"http://lixian.vip.xunlei.com/?furl=",
            bgColor:"2e71f1",
            directUrl:function(offUrl){
                return this.url+offUrl;
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABC1BMVEUAAAArcPUscPQkavJSd79UdrhTdrled6kjae8ucfAqbOwoa+0pa+xTd71WdrNad61dea4pbO4vcvEsb/Aqbe8sbu8ucfArbu8ucfEpbe0oa+4vcPH///4ZYe7j8fne7fknbPAkaO41dfDa6vgcY+/o8/rV6PchZ+4bZO79//3u+fklavIiaO8VXu3x9/3t9fve7veLsfYqcfZNhvE5d/AfZO36/fz0+/ry+vrb6PrG2vnR5fbL4faXufbG3fWqyPWjw/WErPWixPR4pPR0ovOIsfJsnPJYj+9Bfe/1+v3l7f3p8Pzg7fq+0/mlw/fY6/aQtPaHrfZnl/S41fORt/KAqvKZvvFJhO8eZe4RVCzFAAAAEXRSTlMA+P74gnpzWP329OrohXJgXOQVaEcAAAFOSURBVCjPZczneoIwGIbhqNXuEQORYGIBQXDvvbfde5z/kfSTi1Kx9798z/UGIXQQUuJBSiiGwDmEPUklFIVFDcI/4doVqilUCSIFArdjlAxQFE1Ir41EMhlGlFKiEerRhPFy29O3byiyUTccx9HiVBbxYYm3jAL1ilyvPlerhl1wFnec83mRuoUQSgr2lPP7Bn3g2dJNtm6TLSggUXzMZrtdXi6X+dCR/QLEtGV1SpZltXvfGtkt5qSdcnXmpmlit8guc5K79vTHK0OCk1eaq1x6q2LlUunBUsZQEi5sj3MZMJp9bLCuynCCjUvX3yuVzKBRFLqK4TNvA+Qj8TV7Si1E4heSfKZYj/pUlzxQfFjQt2XRL/iPJDXVz43tvRBmO6SmsdaZS0N5zHZnOpMwYNoJiuU1pu5j+fwhQtGIynAQUyMXCFyeqntFPYPFD095Qx8x+n7CAAAAAElFTkSuQmCC"
        },
        xiaomi:{
            regex:/miwifi\.com/,
            url:"http://d.miwifi.com/d2r/?url=",
            bgColor:"f97306",
            directUrl:function(offUrl){
                return this.url+base64.encode(offUrl)+"&src=EasyOffline";
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
            hide:true,
            directUrl:function(offUrl){
                return this.url+offUrl.split("&")[0].replace("magnet:?xt=urn:btih:","");
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAS1BMVEXq5N+Lgnl/dGw1Jxzt5uDy7eju6eO1rKTk3tdPRDjb1M2vpZ1jWU9WST6+tq+qoJiYkIp4bWNCNCbg2dTIwLi5squroplYT0dFNyua0/V8AAAAA3RSTlP+/v6VFoksAAAAaklEQVQ4y+XSSw6AIAwEUMCC5Svg9/4nFQ/AsDTGWb+kk0nFNMgfQawDsKQ4AOxUReBgZm8BmEWLK1cfEJEx5CMG2riCgG4xudehiQesCp7Qe4AdWJ6oJKUAd2AJh6ItWDS1z/b1j/osuAHroA3qksST5QAAAABJRU5ErkJggg=="
        },
        torrent:{
            regex:/torrent\.org\.cn/,
            url:"http://www.torrent.org.cn/Home/torrent/download.html?hash=",
            bgColor:"f2f2f2",
            noHttp:true,
            noEd2k:true,
            noFtp:true,
            directUrl:function(offUrl){
                return this.url+offUrl.replace("magnet:?xt=urn:btih:","");
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
            directUrl:function(offUrl){
                return this.url+offUrl.replace("magnet:?xt=urn:btih:","");
            },
            bgImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA9lBMVEUAAACgoqOipKUAAAC4ubq1traXl5jX19g9PT4GBga2t7ixsrOur7Cmp6jMzM1+f39ZWVpnZ2eChIXMzc3BwcKvsrLGxsacnZ3f399zdHS9vr61trZZW1upq6vIysq7vb2nqKliZGTS09O6vLzg4OC2uLhQUVHi4uK+v79OTk4hISHT1NQZGRnf4OCPkpKsra3KysxmZ2d+f3/y8vOUlZW+vr+2tridnp/Z2dmAgYJ4enptbm5YWVn39/fv7/DDw8Td3d7U1dXU1NTOztC4ubuoqamlpaWcnJyYmJp6fHxwcXFTVVX29/bHyMnHx8e3t7qgoaGHiYm1AxJpAAAAL3RSTlMAHhgF4NbW2jQU4uDg3sybVDUkHhcF6Ojk5ODc2dfJycPDra17ezkuLiUlIRUREf6sWL0AAAC0SURBVBjTjY9HEoJAAAQXVwVzAMw5Z5YMgoBizv7/M7JwoLw5t+lD1wzAYVcEPaeXLAgyHvTazTpJtvrDCe5M1nUReiiK/ERZxgNEVLYdy1GFz1uuET54IfGucTq/5qIYRGIKEjcaJ3ggFsEgrp/tnSwZJi/EMSDSqqQeJeNmXk+pwLFHlrg9CPzl16H/7ygmQ0eyCACkMuGODAUBTORzHbJSKlcb3Vw+AfE9uJgWCiNq5rcvfNwgjdumYdQAAAAASUVORK5CYII="
        }
    };
    var enableUrl = 'a[href^="magnet"],[href^="ed2k://|file"],[href$=".torrent"],[href$=".mp4"],[href$=".rar"],[href$=".7z"],[href$=".zip"],[href$=".rmvb"],[href$=".mkv"],[href$=".avi"],[href$=".iso"]';
    var disableUrl=[".torrentkitty.","bt.box.n0808.com"];
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    var showType=!!GM_getValue("showType");
    $=jQuery;
    switch (lang){
        case "zh-CN":
            i18n={
                configure:"一键离线下载设置",
                yyw:"115网盘",
                baidu:"百度网盘",
                furk:"Furk网盘",
                seedr:"Seedr网盘",
                pcloud:"Pcloud网盘",
                xunlei:"迅雷离线",
                xiaomi:"小米路由器",
                weiyun:"腾讯微云",
                bitqiu:"比特球",
                apiv:"九秒云播",
                torrent:"Torrent.org种子下载",
                btcache:"Btcache.me种子下载",
                enable:"启用",
                disable:"禁用"
            };
            break;
        default:
            i18n={
                configure:"EasyOffline - Configure",
                yyw:"115",
                baidu:"BaiduPan",
                furk:"Furk",
                seedr:"Seedr",
                pcloud:"Pcloud",
                xunlei:"Xunlei",
                xiaomi:"MiWifi",
                weiyun:"Weiyun",
                bitqiu:"bitqiu",
                apiv:"Apiv Online play",
                torrent:"Torrent download in torrent.org",
                btcache:"Torrent download in btcache.me",
                enable:"Enable ",
                disable:"Disable "
            };
            break;
    }

    var sitesArr=[],siteSort=GM_getValue("siteSort"),siteName;
    if(!siteSort)siteSort=["baidu","yyw","furk","seedr"];
    siteSort.forEach(function(item) {
        var siteConfig=sites[item];
        siteConfig.name=item;
        sitesArr.push(siteConfig);
    });
    for(siteName in sites){
        var hasSite=false;
        siteSort.forEach(function(item){if(item==siteName)hasSite=true;});
        if(hasSite)continue;
        var siteConfig=sites[siteName];
        siteConfig.name=siteName;
        sitesArr.push(siteConfig);
    }
    function include(things,obj) {
        for (var i = things.length - 1; i >= 0; i--) {
            if ($(things[i]).attr('href')===$(obj).attr('href')){
                return true;
            }
        }
    }

    var isInited=false;
    function init(){
        if(isInited)return;
        isInited=true;
        $("body").append(parentDiv);
        setCss();
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
            a.whx-a:hover{
                animation:rotateAni 2s infinite;
                animation-direction:alternate;
                -webkit-animation:rotateAni 2s infinite;
                -webkit-animation-direction:alternate;
            }
            @keyframes rotateAni{
                from {transform: rotate(0deg);}
                to {transform: rotate(360deg);}
            }
            @-webkit-keyframes rotateAni{
                from {transform: rotate(0deg);}
                to {transform: rotate(360deg);}
            }
        </style>`);
    }

    var parentDiv=$("<div style='display:none;position:absolute;z-index:99999;overflow:visible;text-align:left;'></div>");
    var regs=GM_getValue("eoReg");
    function hideIcons(){
        parentDiv.css("display","none");
        for(var node of offNodes){
            node.css("margin-top","0px");
        }
    }
    var offNodes=[];
    var offUrl,allUrl=[];
    for(var x = 0; x < sitesArr.length; x++){
        let offNode=$("<a></a>");
        offNode.addClass('whx-a').css("position","absolute").css("margin-top","0px").css("margin-left","0px").attr("target","_blank");
        let siteConfig=sitesArr[x];
        offNode.css("background-color","#"+siteConfig.bgColor).attr("title",i18n[siteConfig.name] ).attr("href", siteConfig.url).attr("name", siteConfig.name);
        offNode.click(function(e){
            offUrl=getRightUrl(offUrl);
            if(siteConfig.directUrl){
                offNode.attr('href', siteConfig.directUrl(offUrl));
            }else{
                if(e.ctrlKey && e.shiftKey && siteConfig.canMul)
                    GM_setValue(siteConfig.name+":eoUrl",allUrl);
                else GM_setValue(siteConfig.name+":eoUrl",offUrl);
            }
            e.stopPropagation();
        });
        if(siteConfig.bgImg)offNode.css("background-image","url(\""+siteConfig.bgImg+"\")");
        if(siteConfig.hide || GM_getValue("eoHide"+siteConfig.name))continue;
        offNodes.push(offNode);
        parentDiv.prepend(offNode);
    }
    if(typeof(HTMLElement)!="undefined"){
        HTMLElement.prototype.contains=function(obj) {
            while(obj){
                if(obj==this)
                    return true;
                obj=obj.parentNode;
            }
            return false;
        };
    }
    var marginTop=offNodes.length*25;
    parentDiv.prepend($('<div style="position:absolute;width:25px;height:'+marginTop+'px;margin-top:-'+(marginTop-25)+'px;background-color:white;opacity:0.001;"></div>'));
    parentDiv.mouseout(function(e){
        var relatedTarget=(e.relatedTarget||e.fromElement);
        if(relatedTarget && !parentDiv[0].contains(relatedTarget))
        hideIcons();
    });
    parentDiv.mouseover(function(e){
        e.stopPropagation();
    });
    document.addEventListener("mouseover", function(e){
        if(parentDiv.css("display")!="none")hideIcons();
    });
    var preNode;
    if(showType){
        document.addEventListener("click", function(){
            if(preNode)preNode.hide(300);
        });
    }

    var sNodes=[];
    if(!Array.prototype.indexOf)
        Array.prototype.indexOf = function(e){
            for(var i=0;i<this.length;i++){
                if(e===this[i]){
                    return i;
                }
            }
            return -1;
        };
    function getAllEnableUrl(target) {
        if(GM_getValue('eoDisable_'+document.domain))return;
        var rawnodes=(target?$(target).find(enableUrl):$(enableUrl)).get(),customnodes=[];
        var nodes = [];
        var i;
        var curNode;
        if(regs){
            var aTags = (target?$(target).find("a"):$("a")).get();
            for(var aTag of aTags){
                for(var reg of regs){
                    if(reg==="")continue;
                    var patt=new RegExp(reg);
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

        if(nodes.length > 0){
            init();
            var codeList = [];
            var listLen = nodes.length;
            if (listLen !== 0) {
                for (i = 0; i < listLen; i++) {
                    curNode = nodes[i];
                    if(curNode.classList.contains("whx-a"))continue;
                    if(target){
                        if(sNodes.indexOf(curNode)!=-1)continue;
                        sNodes.push(curNode);
                    }
                    let href=curNode.href;
                    let clone=$("<a></a>").attr("style",curNode.getAttribute("style")).attr("href",href).addClass('whx-a').css("background-color","#e1e1e1").css("background-image",'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAYM5vMOA/ENGegK2olI6G1b97Z0sXENA+jAAAAKFJREFUKM+FklkSxCAIRHFfss3K/Y86iQSDVqzpH7FfgQpCVfAmGx+gl9JI0qrxrcNLzooEbKUG4EKWdkCiDRV0N0RTrZ5wvdgTTgp4SzCAHxAPZkAM5GOJWuuT7FE5OVPOBFLTYb3Oc2YB5uJ8+G6pgkTGt74ntcCJHiwFLHw10Tdc93jlGXGvSRtsHNpuPs+/o1ODfxAtSL0f7HPC+L/9AF60G3QxO1UaAAAAAElFTkSuQmCC")');
                    if(allUrl.toString().indexOf(href)==-1)allUrl.push(href);
                    clone.mouseover(function(e){
                        var basePos=clone.offset();
                        showDiskIcons(href,basePos.top,basePos.left);
                        e.stopPropagation();
                    });
                    $(curNode).after(clone);
                    if(showType){
                        clone.hide();
                        $(curNode).mouseover(function(){
                            if(clone.is(':hidden')){
                                if(preNode)preNode.hide(300);
                                clone.show(500);
                                preNode=clone;
                            }
                        });
                    }
                }
            }
        }
    }

    function showDiskIcons(url, top, left){
        offUrl=url;
        parentDiv.css("display","block");
        parentDiv.offset({top:top,left:left});
        let j=0;
        for(var x=0;x<offNodes.length;x++){
            let node=offNodes[x];
            let siteConfig=sites[node.attr("name")];
            if(/^http/i.test(offUrl) && siteConfig.noHttp){
                node.hide();
            }else if(/^magnet/i.test(offUrl) && siteConfig.noMag){
                node.hide();
            }else if(/^ftp/i.test(offUrl) && siteConfig.noFtp){
                node.hide();
            }else if(/^ed2k:\/\//i.test(offUrl) && siteConfig.noEd2k){
                node.hide();
            }else{
                node.show();
                node.css("margin-top",-j*25+"px");
                j++;
            }
        }
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
        var bin =  "", returnStr = "", i;
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

    var i=0;
    var curlink;
    var isDisk=false;
    for(x = 0; x < sitesArr.length; x++){
        let siteConfig=sitesArr[x];
        if(siteConfig.regex.test(location.hostname)){
            isDisk=true;
            curlink=GM_getValue(siteConfig.name+':eoUrl');
            if(curlink){
                if(siteConfig.offFunc)siteConfig.offFunc(function(){GM_deleteValue(siteConfig.name+':eoUrl');});
            }
            break;
        }
    }
    if(location.href.indexOf("pan.baidu.com/wap/home") != -1){
        if(curlink)location.href="https://pan.baidu.com/disk/home";
    }else if(location.href.indexOf("github.com/hoothin/UserScripts/tree/master/Easy%20offline") != -1){
        setting();
    }else if(!isDisk){
        setTimeout(function(){getAllEnableUrl();},10);
        var MutationObserver = unsafeWindow.MutationObserver || unsafeWindow.WebKitMutationObserver || unsafeWindow.MozMutationObserver;
        var observer = new MutationObserver(function(records){
            records.map(function(record) {
                if(record.addedNodes.length)setTimeout(function(){getAllEnableUrl(record.addedNodes);},501);
            });
        });
        var option = {
            'childList': true,
            'subtree': true
        };
        observer.observe(document.body, option);
    }

    function setting(){
         $('head').append(`
            <style>
                .whx-btn{
                    background-color:#3892ed;
                    transition:background-color 0.15s ease;
                }
                .whx-btn:hover{
                    background-color:#83c1ff;
                }
            </style>`);
        var configContent=document.createElement("div");
        document.body.appendChild(configContent);
        configContent.outerHTML=`
            <div id="configContent" style="display: none;">
                <div style="width:300px;height:300px;position:fixed;left:50%;top:50%;margin-top:-150px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                    <div style="text-align:center;font-size: 12px;margin-top: 28px;">自定义需要启用一键下载的链接正则，一行一条</div>
                    <textarea id="configInput" placeholder="例：http:.*\\.php\\?getRes=\\d+" style="position:absolute;left:20px;top:50px;width:260px;height:110px"></textarea>
                    <div style="text-align:center;font-size:12px;margin-top:125px;" title="不需要加'我的网盘/全部文件'">度盘存储路径：<input id="baiduPath" placeholder="例：/av" style="width:170px;"></div>
                    <div id="icons" style="position:absolute;left:0px;top:202px"></div>
                    <label style="position:absolute;left:60px;top:230px;"><input id="showType" type="checkbox"/>仅当鼠标经过时显示图标</label>
                    <button id="configSave" class="whx-btn" type="button" style="position:absolute;left:110px;top:260px;width:80px;height:30px;color:white;border-radius:5px;border:0px;outline:none;">设置</button>
                    <div id="configQuit" class="whx-btn" style="width:28px;height:28px;border-radius:14px;position:absolute;right:2px;top:2px;cursor:pointer;">
                        <span style="height:28px;line-height:28px;display:block;color:#FFF;text-align:center;font-size:20px;">╳</span>
                    </div>
                </div>
            </div>`;
        var configInput=document.querySelector("#configInput");
        var configQuit=document.querySelector("#configQuit");
        var configSave=document.querySelector("#configSave");
        var showTypeCheck=document.querySelector("#showType");
        var baiduPath=document.querySelector("#baiduPath");
        var icons=$("#icons"),dragIcon;
        icons[0].ondrop=function(e){
            var nextIcon;
            $("#icons>div").each(function(){
                nextIcon=$(this);
                if(e.pageX<nextIcon.offset().left){
                    if(this!=dragIcon)
                        nextIcon.before(dragIcon);
                    return false;
                }
            });
            siteSort=[];
            $("#icons>div").each(function(){
                siteSort.push($(this).attr("name"));
            });
            GM_setValue("siteSort",siteSort);
        };
        icons[0].ondragover=function(e){
            e.preventDefault();
        };
        for(var x = 0; x < sitesArr.length; x++){
            let siteConfig=sitesArr[x];
            if(siteConfig.hide)continue;
            let icon=$("<div style='height:25px;width:25px;float:left;border-radius:50%;background-position:center;background-repeat:no-repeat;background-size:20px;margin-left:2px;cursor:pointer'></div>");
            icon.css("background-color","#"+siteConfig.bgColor).attr("title",i18n.disable+i18n[siteConfig.name] ).attr("draggable",true).attr("name",siteConfig.name);
            icon[0].ondragstart=function(e){
                dragIcon=this;
            };
            if(GM_getValue("eoHide"+siteConfig.name)){
                icon.css("opacity","0.2");
                icon.attr("title",i18n.enable+i18n[siteConfig.name] );
            }
            if(siteConfig.bgImg)icon.css("background-image","url(\""+siteConfig.bgImg+"\")");
            icon.on("click", function(){
                var eoHide=GM_getValue("eoHide"+siteConfig.name);
                if(!eoHide){
                    var allHide=true;
                    $("#icons>div").each(function(){
                        if(this!=icon[0] && $(this).css("opacity")!="0.2"){
                            allHide=false;
                            return false;
                        }
                    });
                    if(allHide){
                        alert("不能全部禁用！");
                        return;
                    }
                }
                GM_setValue("eoHide"+siteConfig.name, !eoHide);
                icon.css("opacity",eoHide?"1":"0.2");
                icon.attr("title",(eoHide?i18n.disable:i18n.enable)+i18n[siteConfig.name] );
            });
            icons.append(icon);
        }
        configContent=document.querySelector("#configContent");
        configContent.style.display="block";
        if(GM_getValue("eoReg"))$(configInput).val(GM_getValue("eoReg").join("\n"));
        if(GM_getValue("baiduPath"))$(baiduPath).val(GM_getValue("baiduPath"));
        if(GM_getValue("showType"))showTypeCheck.checked=true;
        $(configQuit).click(function (event) {configContent.style.display="none";});
        $(configSave).click(function (event) {
            var regStr=$(configInput).val();
            var baiduPathStr=$(baiduPath).val();
            if(baiduPathStr)GM_setValue("baiduPath",baiduPathStr);
            if(/^\s*$/.test(regStr)){
                GM_deleteValue("eoReg");
            }else{
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
            }
            GM_setValue("showType", showTypeCheck.checked);
            alert("设置成功");
        });
    }

    function toggleIcon(){
        $('.whx-a').toggle(500);
        if(GM_getValue('eoDisable_'+document.domain)){
            GM_deleteValue('eoDisable_'+document.domain);
            if($('.whx-a').length<1)getAllEnableUrl();
        }else{
            GM_setValue('eoDisable_'+document.domain,true);
        }
    }

    function goSetting(){
        location.href="https://github.com/hoothin/UserScripts/tree/master/Easy offline#一键离线下载";
    }

    function checkSel(e){
        var sel=document.getSelection();
        var link=sel.toString(),validReg=/^\s*(magnet:\?xt=urn:btih:|ed2k:\/\/\|file|https?:|ftp:)/i;
        if(link==="" || !validReg.test(link)){
            if(targetA) link=targetA.href;
            else link=prompt("输入需要离线下载的链接：","magnet:?xt=urn:btih:");
        }/*else{
            var focusedElement = sel.focusNode.parentElement;
            if(focusedElement.tagName == "A"){
                link=focusedElement.href;
            }
        }*/
        if(validReg.test(link)){
            init();
            showDiskIcons(link,mouseEve.pageY-10,mouseEve.pageX-10);
        }
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

    document.addEventListener("keydown", function(e) {
        if(e.keyCode == 120) {
            if(e.altKey){
                checkSel(e);
            }else{
                toggleIcon();
            }
        }
    });
    GM_registerMenuCommand(i18n.configure, goSetting);
})();