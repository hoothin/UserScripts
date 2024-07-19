// ==UserScript==
// @name         Hide saladict icon
// @name:zh-CN   隐藏沙拉查词图标
// @namespace    hoothin
// @version      2024-07-19
// @description  Hide saladict icon for SearchJumper
// @description:zh-CN  隐藏沙拉查词图标，转而用搜索酱来调用，以避免遮挡
// @author       hoothin
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    //搜索酱沙拉查词引擎： #p{click(#saladict-saladbowl-root>.saladict-external \=>> .isAnimate>div)}
    GM_addStyle(`
     #saladict-saladbowl-root.saladict-div.saladict-external {
         display:none!important;
     }
    `)
})();