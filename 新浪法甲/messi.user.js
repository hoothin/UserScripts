// ==UserScript==
// @name         新浪法甲
// @namespace    hoothin
// @version      0.1
// @description  赛程列表滚动
// @author       hoothin
// @match        http://sports.sina.com.cn/g/ligue1/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(".results{overflow: overlay;padding: 10px;width: 380px;}.result_wrap{width: 380px;}");
})();