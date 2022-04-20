// ==UserScript==
// @name         91wii
// @namespace    hoothin
// @version      0.6
// @description  91wii签到
// @author       hoothin
// @match        https://*.91wii.com/*
// @match        https://*.91tvg.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-idle
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(()=>{
        var formula = document.querySelector("b"),dcsignin = document.querySelector("#dcsignin_tips");
        if(formula && /^[\d\s\+-=?]+$/.test(formula.innerText.trim())){
            setTimeout(function(){
                document.querySelector("input[type=text]").value=eval(formula.innerText.match(/[\d\s\+-]+/)[0]);
                document.querySelector("input[type=submit]").click();
            },10);
        }else if(dcsignin){
            if(dcsignin.style.background.indexOf("signin_yes") != -1)return;
            unsafeWindow.showWindow('sign', 'plugin.php?id=dc_signin:sign');
            var checkTimes=0;
            let signInterval=setInterval(()=>{
                var signWin=document.querySelector("#fwin_sign");
                if(signWin){
                    signWin.style.display="none";
                }
                var dialogWin=document.querySelector("#fwin_dialog");
                if(dialogWin){
                    dialogWin.style.display="none";
                }
                let emotIndex=parseInt(Math.random() * 10) + 1;
                if(document.querySelector("#emot_" + emotIndex)){
                    clearInterval(signInterval);
                    document.querySelector("#emot_" + emotIndex).click();
                    //document.querySelector('#content').value = '君子有四时，朝以听政，昼以访问，夕以修令，夜以安身。';
                    document.querySelector("button[name=signpn]").click();
                    unsafeWindow.hideWindow('sign');
                }else if(checkTimes++>15){
                    clearInterval(signInterval);
                    unsafeWindow.hideWindow('sign');
                }
            }, 100);
        }
    },2000);
})();