// ==UserScript==
// @name         SearchJumper levenshtein addon
// @name:zh-CN   搜索酱单词模式扩展
// @name:zh-TW   搜尋醬單詞模式擴展
// @namespace    hoothin
// @version      0.2
// @description  Add similarity search based on Levenshtein distance to the highlight feature of SearchJumper.
// @description:zh-CN  为搜索酱的页内高亮添加基于莱文斯坦距离的相似度查找
// @description:zh-TW  為搜尋醬的頁内高亮添加基於萊文斯坦距離的相似度查找
// @author       hoothin
// @match        *://*/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var _unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    if (!_unsafeWindow.searchJumperAddons) _unsafeWindow.searchJumperAddons = [];
    function levenshteinDistance(a, b) {
        //構造矩陣
        const distanceMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
        //第一行
        for (let i = 0; i <= a.length; i += 1) {
            distanceMatrix[0][i] = i;
        }
        //第一列
        for (let j = 0; j <= b.length; j += 1) {
            distanceMatrix[j][0] = j;
        }
        for (let j = 1; j <= b.length; j += 1) {
            for (let i = 1; i <= a.length; i += 1) {
                const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
                distanceMatrix[j][i] = Math.min(
                    distanceMatrix[j][i - 1] + 1, // 前一個，增加位數，必須加一
                    distanceMatrix[j - 1][i] + 1, // 上一個，增加位數，必須加一
                    distanceMatrix[j - 1][i - 1] + indicator, // 斜方向一個，位數不變
                );
            }
        }
        return distanceMatrix[b.length][a.length];
    }
    const gapStr = "[\n\/\\'\"‘’“”,.!\?，。！？…\(\) ]";
    const gapStrs = new RegExp(gapStr + "+", "g");
    _unsafeWindow.searchJumperAddons.push({
        name: "Levenshtein",
        type: "findInPage",
        sort: 0,
        run: (text, keywords) => {
            if (!text || !keywords) return {matched: false};
            if (keywords.charCodeAt(0) > 255) {
                let len = keywords.length;
                let pos = text.toUpperCase().indexOf(keywords.toUpperCase());
                return {matched: pos != -1, pos: pos, len: len};
            }
            text = text.toLowerCase();
            keywords = keywords.toLowerCase();
            let wordArr = text.replace(gapStrs, " ").split(" ");
            let kwArr = keywords.replace(gapStrs, " ").split(" ");
            let matched = false, pos = -1, len = 0, matchedStr = [];
            for (let i = 0; i < wordArr.length; i++) {
                matched = true;
                matchedStr = [];
                for (let j = 0; j < kwArr.length; j++) {
                    let kwLen = kwArr[j].length;
                    let maxTolerance = kwLen>>2;
                    if (kwLen > 3) maxTolerance++;
                    if (!wordArr[i + j] || levenshteinDistance(kwArr[j], wordArr[i + j]) > maxTolerance) {
                        matched = false;
                        break;
                    } else {
                        matchedStr.push(wordArr[i + j].replace(/([\[\]\(\)\^\$\.\+\*\?\|\{\}\-])/g, "\\$1"));
                    }
                }
                if (matched) {
                    break;
                }
            }
            if (matched) {
                let wordMatch = text.match(new RegExp(`(\\b|\\s)(` + matchedStr.join(gapStr + "+") + `)(\\b|\\s)`, "i"));
                if (wordMatch) {
                    let content = wordMatch[2];
                    len = content.length;
                    pos = wordMatch.index + wordMatch[1].length;
                }
            }
            return {matched: matched, pos: pos, len: len};
        }
    });
})();