// ==UserScript==
// @name         X-Downloader-Script
// @name:zh-CN   X-Downloader-Script
// @name:zh-TW   X-Downloader-Script
// @name:ja      X-Downloader-Script
// @namespace    hoothin
// @version      2025-08-18
// @license      MIT
// @description      Enhances your Twitter (X) experience by adding a convenient download button to images and videos (GIFs), enabling easy, one-click saving of media.
// @description:zh-CN  优化你的推特 (X) 浏览体验，直接在图片和视频（GIF）上添加一个便捷的下载按钮，一键轻松保存喜欢的媒体内容。
// @description:zh-TW  優化您的 Twitter (X) 瀏覽體驗，直接在圖片及影片（GIF）上新增一個便捷的下載按鈕，一鍵輕鬆儲存喜愛的媒體內容。
// @description:ja     Twitter (X) の画像や動画（GIF）に便利なダウンロードボタンを追加し、ワンクリックでお気に入りのメディアを簡単に保存できるようにします。
// @author       hoothin
// @match        https://x.com/*
// @match        https://twitter.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/545186/X-Downloader-Script.user.js
// @updateURL https://update.greasyfork.org/scripts/545186/X-Downloader-Script.meta.js
// ==/UserScript==

(function() {
    'use strict';
    let downloadBtn = document.createElement("a"), touch = false, simpleClick = false;
    downloadBtn.target = "_blank";
    downloadBtn.style.cssText = "background: #000000aa; border-radius: 50%; transition: opacity ease 0.3s; position: absolute; top: 0; right: 0px; cursor: pointer; opacity: 0; padding: 5px;";
    downloadBtn.innerHTML = `<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    downloadBtn.addEventListener("mousedown", e => {
        let parent = downloadBtn.parentNode;
        if (!parent) return;
        simpleClick = false;
        let img = parent.querySelector('[data-testid="tweetPhoto"]>img,[data-testid="card.layoutLarge.media"] img');
        if (img) {
            let newsrc = img.src.replace("_normal.",".").replace("_200x200.",".").replace("_mini.",".").replace("_bigger.",".").replace(/_x\d+\./,"."), imgname;
            if (/\.svg$/.test(newsrc)) return;
            if (newsrc == img.src) {
                newsrc=newsrc.replace(/\?format=/i, ".").replace(/\&name=/i, ":").replace(/\.(?=[^\.\/]*$)/, "?format=").replace( /(:large|:medium|:small|:orig|:thumb|:[\dx]+)/i, "");
                if (newsrc != img.src) {
                    newsrc = newsrc + "&name=orig";
                }
            }
            while(parent) {
                if (parent.nodeName == "ARTICLE" && parent.dataset && parent.dataset.testid == "tweet") {
                    break;
                }
                parent = parent.parentNode;
            }
            if (parent) {
                const time = parent.querySelector('time[datetime]');
                const user = parent.querySelector('[role="link"]>div>div>span>span');
                let formatMatch = img.src.match(/format=(\w+)/), ext = "jpg";
                if (formatMatch) {
                    ext = formatMatch[1];
                } else {
                    formatMatch = newsrc.match(/\.(\w+)/);
                    if (formatMatch) {
                        ext = formatMatch[1];
                    }
                }
                imgname = `${user.innerText} ${time.innerText.replace(/(.*) · (.*)/, "$2 $1")}.${ext}`;
            }
            downloadBtn.href = newsrc;
            if ((e.button === 0 && !e.ctrlKey) || touch) {
                simpleClick = true;
                downloadByFetch(newsrc, imgname);
            }
        } else {
            while(parent) {
                if (parent.nodeName == "ARTICLE" && parent.dataset && parent.dataset.testid == "tweet") {
                    break;
                }
                parent = parent.parentNode;
            }
            if (parent) {
                downloadBtn.removeAttribute('download');
                let link = parent.querySelector('a[role="link"][aria-label][href^="/"]');
                downloadBtn.href = `https://twitter.luopo.org/?url=${encodeURIComponent(link ? link.href : document.location.href)}`;
                if (e.altKey || touch) {
                    window.open(downloadBtn.href, "_blank");
                }
            }
        }
    });
    downloadBtn.addEventListener("click", e => {
        if (simpleClick || e.altKey || touch) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    downloadBtn.addEventListener("mouseenter", () => {
        downloadBtn.style.opacity = 1;
    });
    downloadBtn.addEventListener("mouseleave", () => {
        setTimeout(() => {
            downloadBtn.style.opacity = 0.1;
        }, 100);
    });
    async function downloadByFetch(imageUrl, filename) {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('CORS request failed');
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.href = blobUrl;
            tempLink.setAttribute('download', filename);
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('error:', error);
            window.open(imageUrl, '_blank');
        }
    }
    const show = (ele) => {
        ele.appendChild(downloadBtn);
        setTimeout(() => {
            downloadBtn.style.opacity = touch ? 0.8 : 0.6;
        }, 0);
    };
    const addBtn = e => {
        if (e.target.dataset && e.target.dataset.testid == "card.layoutLarge.media") {
            show(e.target.parentNode);
        } else if (e.target.dataset && e.target.dataset.testid == "tweetPhoto") {
            show(e.target.parentNode);
        } else if (e.target.dataset && /^video\-player/.test(e.target.dataset.testid)) {
            show(e.target.parentNode);
        } else if (e.target.parentNode && e.target.parentNode.dataset && e.target.parentNode.dataset.testid == "tweetPhoto") {
            show(e.target.parentNode.parentNode);
        }
    };
    function isElementVisible(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.top > 0 && rect.bottom >= 0;
    }
    function findFirstVisibleElement(selector) {
        const elements = document.querySelectorAll(selector);
        const firstVisibleElement = Array.from(elements).find(el => {
            return isElementVisible(el);
        });
        return firstVisibleElement;
    }
    let checkTimer;
    const touchCheck = e => {
        clearTimeout(checkTimer);
        if (e.target == downloadBtn) return;
        checkTimer = setTimeout(() => {
            if (isElementVisible(downloadBtn)) return;
            let target = findFirstVisibleElement("[data-testid='card.layoutLarge.media']");
            if (target) {
                return show(target.parentNode);
            }
            target = findFirstVisibleElement("[data-testid='tweetPhoto']");
            if (target) {
                return show(target.parentNode);
            }
            target = findFirstVisibleElement("[data-testid^='video-player']");
            if (target) {
                return show(target.parentNode);
            }
        }, 100);
    };
    document.addEventListener("mouseenter", addBtn, true);
    document.addEventListener("touchstart", e => {touch = true; addBtn(e);}, true);
    document.addEventListener("touchend", touchCheck, true);
})();