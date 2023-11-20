// ==UserScript==
// @name         SearchJumper pinyin addon
// @name:zh-CN   搜索酱拼音扩展
// @name:zh-TW   搜尋醬拼音擴展
// @namespace    hoothin
// @version      0.3
// @description  Add pinyin support for SearchJumper
// @description:zh-CN  为搜索酱的页内高亮查找添加拼音支持
// @description:zh-TW  為搜尋醬的頁内高亮查找添加拼音支援
// @author       hoothin
// @match        *://*/*
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://unpkg.com/pinyin-match/dist/traditional.js
// ==/UserScript==

(function() {
    'use strict';
    var _unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    if (!_unsafeWindow.searchJumperAddons) _unsafeWindow.searchJumperAddons = [];
    var { match } = PinyinMatch;
    var pinyinSearch = (text, pinyin) => {
        let matchResult = match(text, pinyin);
        if (matchResult) {
            return {matched: true, pos: matchResult[0], len: matchResult[matchResult.length - 1] - matchResult[0] + 1};
        }
        return {matched: false};
    }
    _unsafeWindow.searchJumperPinyin = pinyinSearch;
    _unsafeWindow.searchJumperAddons.push({
        sort: 1,
        name: "拼音",
        type: "findInPage",
        run: pinyinSearch
    });
})();