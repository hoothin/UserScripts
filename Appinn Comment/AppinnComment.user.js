// ==UserScript==
// @name         Appinn comment
// @namespace    hoothin
// @version      2024-06-08
// @description  将小众软件论坛的评论内容显示在主站对应页面下部
// @author       hoothin
// @match        https://www.appinn.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @connect      meta.appinn.net
// @downloadURL https://update.greasyfork.org/scripts/497293/Appinn%20comment.user.js
// @updateURL https://update.greasyfork.org/scripts/497293/Appinn%20comment.meta.js
// ==/UserScript==

(function() {
    'use strict';
    const commentLink = document.querySelector('a.wpdc-join-discussion-link');
    if (!commentLink) return;
    GM_xmlhttpRequest({
        url: commentLink.href,
        method: 'GET',
        onload: function(res) {
            try {
                let doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = res.response;
                let dataPreloaded = doc.getElementById('data-preloaded');
                if (!dataPreloaded) return;
                dataPreloaded = JSON.parse(JSON.parse(dataPreloaded.dataset.preloaded)["topic_" + commentLink.href.match(/\d+/)[0]]).post_stream.posts;
                let posts = document.createElement("ul");
                posts.style.maxHeight = '100vh';
                posts.style.overflow = 'auto';
                posts.style.margin = '0';
                let title = document.createElement("h3");
                title.innerText = "评论内容";
                document.querySelector('article').appendChild(title);
                document.querySelector('article').appendChild(posts);
                dataPreloaded.forEach(item => {
                    posts.innerHTML += `<li style='border-top: 1px solid #313131;'><p style='font-weight: bold;'>${item.display_username || item.username}</p>${item.cooked}</li>`;
                });
            } catch (e) {
            }
        }
    });
})();