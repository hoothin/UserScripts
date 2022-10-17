// ==UserScript==
// @name         SearchJumper
// @name:zh-CN   搜索酱
// @name:zh-TW   搜尋醬
// @name:ja      検索ちゃん - SearchJumper
// @namespace    hoothin
// @version      1.6.6.46.51
// @description  Assistant for switching search engines. Jump to any search engine quickly, can also search anything (selected text / image / link) on any engine with a simple right click or a variety of menus and shortcuts.
// @description:zh-CN  高效搜索引擎辅助增强，在搜索时一键切换各大搜索引擎，支持任意页面右键划词搜索与全面自定义
// @description:zh-TW  高效搜尋引擎輔助增强，在搜尋時一鍵切換各大搜尋引擎，支持任意頁面右鍵劃詞搜尋與全面自定義
// @description:ja  任意の検索エンジンにすばやく簡単にジャンプします！
// @author       hoothin
// @match        *://*/*
// @icon         data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic2VhcmNoLWp1bXBlci1sb2dvQnRuU3ZnIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uNzM2IDUxMC40NjRjMC0yODEuOTQyIDIyOC4zMzUtNTEwLjUgNTEwLTUxMC41IDEzNS4yNiAwIDI2NC45ODEgNTMuNzg0IDM2MC42MjUgMTQ5LjUyMiA5NS42NDMgOTUuNzM3IDE0OS4zNzUgMjI1LjU4NSAxNDkuMzc1IDM2MC45NzggMCAyODEuOTQtMjI4LjMzNSA1MTAuNS01MTAgNTEwLjUtMjgxLjY2NSAwLTUxMC0yMjguNTYtNTEwLTUxMC41em01MTAtNTEwLjV2MTAyMW0tNTEwLTUxMC41aDEwMjAiIGZpbGw9IiNmZWZlZmUiLz48cGF0aCBkPSJNMjM3LjQ0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek02OTkuOTA0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek00MjMuMjk2IDc1OS4yOTZjLTY0IDAtMTE1LjcxMi01Mi4yMjQtMTE1LjcxMi0xMTUuNzEyIDAtMjYuNjI0IDkuMjE2LTUyLjIyNCAyNS42LTcyLjcwNCA5LjIxNi0xMS43NzYgMjYuMTEyLTEzLjMxMiAzNy44ODgtNC4wOTZzMTMuMzEyIDI2LjExMiA0LjA5NiAzNy44ODhjLTkuMjE2IDExLjI2NC0xMy44MjQgMjQuNTc2LTEzLjgyNCAzOC45MTIgMCAzNC4zMDQgMjcuNjQ4IDYxLjk1MiA2MS45NTIgNjEuOTUyczYxLjk1Mi0yNy42NDggNjEuOTUyLTYxLjk1MmMwLTQuMDk2LS41MTItOC4xOTItMS4wMjQtMTEuNzc2LTIuNTYtMTQuODQ4IDYuNjU2LTI4LjY3MiAyMS41MDQtMzEuNzQ0IDE0Ljg0OC0yLjU2IDI4LjY3MiA2LjY1NiAzMS43NDQgMjEuNTA0IDEuNTM2IDcuMTY4IDIuMDQ4IDE0LjMzNiAyLjA0OCAyMi4wMTYtLjUxMiA2My40ODgtNTIuMjI0IDExNS43MTItMTE2LjIyNCAxMTUuNzEyeiIgZmlsbD0iIzMzMyIvPjxwYXRoIGQ9Ik02MDIuMDggNzYwLjI5NmMtNjQgMC0xMTUuNzEyLTUyLjIyNC0xMTUuNzEyLTExNS43MTIgMC0xNC44NDggMTIuMjg4LTI3LjEzNiAyNy4xMzYtMjcuMTM2czI3LjEzNiAxMi4yODggMjcuMTM2IDI3LjEzNmMwIDM0LjMwNCAyNy42NDggNjEuOTUyIDYxLjk1MiA2MS45NTJzNjEuOTUyLTI3LjY0OCA2MS45NTItNjEuOTUyYzAtMTUuMzYtNS42MzItMzAuMjA4LTE1Ljg3Mi00MS40NzItOS43MjgtMTEuMjY0LTkuMjE2LTI4LjE2IDIuMDQ4LTM3Ljg4OCAxMS4yNjQtOS43MjggMjguMTYtOS4yMTYgMzcuODg4IDIuMDQ4IDE5LjQ1NiAyMS41MDQgMjkuNjk2IDQ4LjY0IDI5LjY5NiA3Ny44MjQgMCA2Mi45NzYtNTIuMjI0IDExNS4yLTExNi4yMjQgMTE1LjJ6IiBmaWxsPSIjMzMzIi8+PGVsbGlwc2Ugcnk9IjU4IiByeD0iMTI1IiBjeT0iNTA2LjI4NCIgY3g9IjIwMS4xODMiIGZpbGw9IiNmYWYiLz48ZWxsaXBzZSByeT0iNTgiIHJ4PSIxMjUiIGN5PSI1MDYuMjg0IiBjeD0iODIzLjE4MyIgZmlsbD0iI2ZhZiIvPjwvc3ZnPg==
// @grant        GM.getValue
// @grant        GM_getValue
// @grant        GM.setValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM.addStyle
// @grant        GM.registerMenuCommand
// @grant        GM_registerMenuCommand
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @grant        GM.notification
// @grant        GM_notification
// @grant        GM.setClipboard
// @grant        GM_setClipboard
// @grant        GM.openInTab
// @grant        GM_openInTab
// @grant        GM.info
// @grant        GM_info
// @grant        unsafeWindow
// @supportURL   https://github.com/hoothin/SearchJumper/issues
// @homepage     https://github.com/hoothin/SearchJumper
// @downloadURL  https://greasyfork.org/scripts/445274-searchjumper/code/SearchJumper.user.js
// @updateURL    https://greasyfork.org/scripts/445274-searchjumper/code/SearchJumper.user.js
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    if (document.getElementById("search-jumper")) {
        return;
    }

    const configPage = 'https://hoothin.github.io/SearchJumper';
    const importPageReg = /^https:\/\/github\.com\/hoothin\/SearchJumper\/issue|^https:\/\/greasyfork\.org\/.*\/scripts\/445274[\-\/].*\/discussions/i;
    const mobileUa = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    var searchData = {};
    searchData.sitesConfig = [
        {
            type: "翻译",
            icon: "language",
            sites: [ {
                name: "百度翻译",
                url: "http://fanyi.baidu.com/#auto/zh/%s"
            }, {
                name: "DeepL",
                url: "https://www.deepl.com/translator#zh/en/%s",
                icon: "https://www.deepl.com/img/favicon/favicon_96.png"
            }, {
                name: "谷歌翻译",
                url: "https://translate.google.com/?text=%s",
                match: "translate\\.google\\.com.*\\btext="
            }, {
                name: "有道词典",
                url: "http://dict.youdao.com/search?q=%s",
                icon: "https://shared.ydstatic.com/images/favicon.ico"
            }, {
                name: "必应翻译",
                url: "http://www.bing.com/dict/search?q=%s"
            } ]
        },
        {
            type: "影视",
            icon: "video",
            sites: [ {
                name: "bilibili",
                url: "http://search.bilibili.com/all?keyword=%s"
            }, {
                name: "腾讯视频",
                url: "https://v.qq.com/x/search/?q=%s"
            }, {
                name: "爱奇艺",
                url: "http://so.iqiyi.com/so/q_%s",
                icon: "https://www.iqiyi.com/favicon.ico"
            }, {
                name: "youtube",
                url: "https://www.youtube.com/results?search_query=%s"
            }, {
                name: "优酷",
                url: "http://www.soku.com/search_video/q_%s",
                icon: "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png"
            }, {
                name: "AcFun",
                url: "https://www.acfun.cn/search?keyword=%s"
            }, {
                name: "搜狐",
                url: "http://so.tv.sohu.com/mts?wd=%s"
            }, {
                name: "niconico",
                url: "http://www.nicovideo.jp/search/%s"
            } ]
        },
        {
            type: "音乐",
            icon: "music",
            sites: [ {
                name: "网易音乐",
                url: "http://music.163.com/#/search/m/?s=%s",
                icon: "https://s1.music.126.net/style/favicon.ico"
            }, {
                name: "一听",
                url: "https://so.1ting.com/all.do?q=%s"
            }, {
                name: "QQ音乐",
                url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
            }, {
                name: "百度音乐",
                url: "https://music.91q.com/search?ie=utf-8&oe=utf-8&key=%s"
            }, {
                name: "酷我音乐",
                url: "https://www.kuwo.cn/search/list?key=%s"
            }, {
                name: "酷狗",
                url: "http://search.5sing.kugou.com/?keyword=%s"
            } ]
        },
        {
            type: "社交",
            icon: "users",
            sites: [ {
                name: "知乎",
                url: "https://www.zhihu.com/search?q=%s&type=content"
            }, {
                name: "推特",
                url: "https://twitter.com/search/%s"
            }, {
                name: "豆瓣",
                url: "https://www.douban.com/search?source=suggest&q=%s"
            }, {
                name: "百度贴吧",
                url: "https://tieba.baidu.com/f?kw=%s&ie=utf-8"
            }, {
                name: "新浪微博",
                url: "https://s.weibo.com/weibo?q=%s"
            }, {
                name: "脸书",
                url: "https://www.facebook.com/search/results.php?q=%s"
            }, {
                name: "微信搜索",
                url: "http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s"
            } ]
        },
        {
            type: "图片",
            icon: "image",
            sites: [ {
                name: "谷歌图片",
                url: "https://www.google.com/search?q=%s&tbm=isch",
                match: "www\\.google\\..*tbm=isch"
            }, {
                name: "百度图片",
                url: "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s"
            }, {
                name: "必应图片",
                url: "https://www.bing.com/images/search?q=%s"
            }, {
                name: "搜狗图片",
                url: "https://pic.sogou.com/pics?query=%s"
            }, {
                name: "pixiv",
                url: "http://www.pixiv.net/search.php?word=%s"
            }, {
                name: "flickr",
                url: "http://www.flickr.com/search/?q=%s"
            }, {
                name: "花瓣",
                url: "http://huaban.com/search/?q=%s"
            }, {
                name: "Pinterest",
                url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
            }, {
                name: "yandex",
                url: "https://yandex.com/images/search?text=%s"
            }, {
                name: "pixabay",
                url: "https://pixabay.com/images/search/%s/",
                icon: "https://pixabay.com/favicon-32x32.png"
            }, {
                name: "unsplash",
                url: "https://unsplash.com/s/photos/%s"
            } ]
        },
        {
            type: "新闻",
            icon: "newspaper",
            sites: [ {
                name: "谷歌新闻",
                url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
                icon: "https://www.google.com/favicon.ico"
            }, {
                name: "百度新闻",
                url: "http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
                icon: "https://www.baidu.com/favicon.ico"
            }, {
                name: "网易-百度",
                url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com%20",
                icon: "https://news.163.com/favicon.ico",
                match: "site%3Anews\\.163\\.com"
            }, {
                name: "腾讯新闻",
                url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s",
                icon: "https://news.qq.com/favicon.ico"
            }, {
                name: "凤凰新闻",
                url: "https://so.ifeng.com/?q=%s&c=1"
            }, {
                name: "CNN",
                url: "https://edition.cnn.com/search/?q=%s"
            }, {
                name: "BBC",
                url: "https://www.bbc.co.uk/search?q=%s"
            }, {
                name: "今日头条",
                url: "https://www.toutiao.com/search/?keyword=%s"
            } ]
        },
        {
            type: "搜索",
            icon: "search",
            sites: [ {
                name: "Google",
                url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
                match: "https://www\\.google\\..*/search",
                icon: "data:image/jpeg;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///zD9/f2W/f392P39/fn9/f35/f391/39/ZT+/v4uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Cf39/Zn///////////////////////////////////////////39/ZX///8IAAAAAAAAAAAAAAAA/v7+Cf39/cH/////+v35/7TZp/92ul3/WKs6/1iqOv9yuFn/rNWd//j79v///////f39v////wgAAAAAAAAAAP39/Zn/////7PXp/3G3WP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP+Or1j//vDo///////9/f2VAAAAAP///zD/////+vz5/3G3V/9TqDT/WKo6/6LQkf/U6cz/1urO/6rUm/+Zo0r/8IZB//adZ////v7///////7+/i79/f2Y/////4nWzf9Lqkj/Vqo4/9Xqzv///////////////////////ebY//SHRv/0hUL//NjD///////9/f2U/f392v////8sxPH/Ebzt/43RsP/////////////////////////////////4roL/9IVC//i1jf///////f391/39/fr/////Cr37/wW8+/+16/7/////////////////9IVC//SFQv/0hUL/9IVC//SFQv/3pnX///////39/fn9/f36/////wu++/8FvPv/tuz+//////////////////SFQv/0hUL/9IVC//SFQv/0hUL/96p7///////9/f35/f392/////81yfz/CrL5/2uk9v///////////////////////////////////////////////////////f392P39/Zn/////ks/7/zdS7P84Rur/0NT6///////////////////////9/f////////////////////////39/Zb+/v4y//////n5/v9WYu3/NUPq/ztJ6/+VnPT/z9L6/9HU+v+WnfT/Ul7t/+Hj/P////////////////////8wAAAAAP39/Z3/////6Or9/1hj7v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9sdvD////////////9/f2YAAAAAAAAAAD///8K/f39w//////5+f7/paz2/11p7v88Suv/Okfq/1pm7v+iqfX/+fn+///////9/f3B/v7+CQAAAAAAAAAAAAAAAP///wr9/f2d///////////////////////////////////////////9/f2Z/v7+CQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f2Z/f392/39/fr9/f36/f392v39/Zj///8wAAAAAAAAAAAAAAAAAAAAAPAPAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAPAPAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/g3+/v5X/f39mf39/cj9/f3q/f39+f39/fn9/f3q/f39yP39/Zn+/v5W////DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f2c/f399f/////////////////////////////////////////////////////9/f31/f39mv7+/iMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/gn9/f2K/f39+////////////////////////////////////////////////////////////////////////////f39+v39/Yf///8IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4k/f390v////////////////////////////////////////////////////////////////////////////////////////////////39/dD///8iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////MP39/er//////////////////////////+r05v+v16H/gsBs/2WxSf9Wqjj/Vqk3/2OwRv99vWX/pdKV/97u2P////////////////////////////39/ej+/v4vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f3q/////////////////////+v15/+Pxnv/VKk2/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/36+Z//d7tf///////////////////////39/ej///8iAAAAAAAAAAAAAAAAAAAAAAAAAAD///8K/f390//////////////////////E4bn/XKw+/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1apN/+x0pv///////////////////////39/dD///8IAAAAAAAAAAAAAAAAAAAAAP39/Yv/////////////////////sdij/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/YKU1/8qOPv/5wZ////////////////////////39/YcAAAAAAAAAAAAAAAD+/v4l/f39+////////////////8Lgt/9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9utlT/n86N/7faqv+426v/pdKV/3u8ZP9UqDX/U6g0/3egN//jiUH/9IVC//SFQv/82MP//////////////////f39+v7+/iMAAAAAAAAAAP39/Z3////////////////q9Ob/W6w+/1OoNP9TqDT/U6g0/1OoNP9nskz/zOXC/////////////////////////////////+Dv2v+osWP/8YVC//SFQv/0hUL/9IVC//WQVP/++fb//////////////////f39mgAAAAD+/v4O/f399v///////////////4LHj/9TqDT/U6g0/1OoNP9TqDT/dblc//L58P/////////////////////////////////////////////8+v/3p3f/9IVC//SFQv/0hUL/9IVC//rIqf/////////////////9/f31////DP7+/ln////////////////f9v7/Cbz2/zOwhv9TqDT/U6g0/2KwRv/v9+z///////////////////////////////////////////////////////738//1kFT/9IVC//SFQv/0hUL/9plg///////////////////////+/v5W/f39nP///////////////4jf/f8FvPv/Bbz7/yG1s/9QqDz/vN2w//////////////////////////////////////////////////////////////////rHqP/0hUL/9IVC//SFQv/0hUL//vDn//////////////////39/Zn9/f3L////////////////R878/wW8+/8FvPv/Bbz7/y7C5P/7/fr//////////////////////////////////////////////////////////////////ere//SFQv/0hUL/9IVC//SFQv/718H//////////////////f39yP39/ez///////////////8cwvv/Bbz7/wW8+/8FvPv/WNL8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqv/////////////////9/f3q/f39+v///////////////we9+/8FvPv/Bbz7/wW8+/993P3///////////////////////////////////////SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+cGf//////////////////39/fn9/f36////////////////B737/wW8+/8FvPv/Bbz7/33c/f//////////////////////////////////////9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/6xaX//////////////////f39+f39/e3///////////////8cwvv/Bbz7/wW8+/8FvPv/WdP8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vVv//////////////////9/f3q/f39y////////////////0bN/P8FvPv/Bbz7/wW8+/8hrvn/+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////39/cj9/f2c////////////////ht/9/wW8+/8FvPv/FZP1/zRJ6/+zuPf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////f39mf7+/lr////////////////d9v7/B7n7/yB38f81Q+r/NUPq/0hV7P/u8P3////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v5X////D/39/ff///////////////9tkPT/NUPq/zVD6v81Q+r/NUPq/2Fs7//y8v7////////////////////////////////////////////09f7//////////////////////////////////////////////////f399f7+/g0AAAAA/f39n////////////////+Tm/P89Suv/NUPq/zVD6v81Q+r/NUPq/1Bc7f/IzPn/////////////////////////////////x8v5/0xY7P+MlPP////////////////////////////////////////////9/f2cAAAAAAAAAAD+/v4n/f39/P///////////////7W69/81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9ZZe7/k5v0/6609/+vtff/lJv0/1pm7v81Q+r/NUPq/zVD6v+GjvL//v7//////////////////////////////f39+/7+/iQAAAAAAAAAAAAAAAD9/f2N/////////////////////6Cn9f81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v+BivL////////////////////////////9/f2KAAAAAAAAAAAAAAAAAAAAAP7+/gv9/f3V/////////////////////7W69/8+S+v/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/P0zr/7q/+P///////////////////////f390v7+/gkAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3r/////////////////////+Xn/P94gfH/NkTq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NkTq/3Z/8f/l5/z///////////////////////39/er+/v4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f3r///////////////////////////k5vz/nqX1/2p08P9IVez/OEbq/zdF6v9GU+z/aHLv/5qh9f/i5Pz////////////////////////////9/f3q////MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3V/////////////////////////////////////////////////////////////////////////////////////////////////f390v7+/iQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wr9/f2N/f39/P///////////////////////////////////////////////////////////////////////////f39+/39/Yv+/v4JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4n/f39n/39/ff//////////////////////////////////////////////////////f399v39/Z3+/v4lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Dv7+/lr9/f2c/f39y/39/e39/f36/f39+v39/ez9/f3L/f39nP7+/ln+/v4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AA///AAD//AAAP/gAAB/wAAAP4AAAB8AAAAPAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAcAAAAPAAAAD4AAAB/AAAA/4AAAf/AAAP/8AAP//wAP/"
            }, {
                name: "百度",
                url: "https://www.baidu.com/s?wd=%s&ie=utf-8",
                keywords: "wd|word",
                match: "https://(www|m)\\.baidu\\.com/.*(wd|word)="
            }, {
                name: "You",
                url: "https://you.com/search?q=%s",
                icon: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAguSURBVHjaZZdfjF1VFcZ/a+99zr13ZtpO/2BpETP45wkIMUrExESMNEEwUsWoGP71QULwD+UBI0ajJMbEJ+dRIgkqDz5ojBisBIlCokGipEEJCQ+NQ5QWi7YDtJ17z9l7fT7sc6fTcJKVc87Myf6+/a1vrb2useU6ePD0ciLca+jaYKwEtBJNRINo0JiTInzoI8b+dxmTCUwmxtl157kjHW0jmghtEqmBJtVIydZSYo1YXkiWVoG1T9y3DwCbg994/Zk7zMqqEZeDRQJGoAInE9FEE2rs2wfX35yYLMBkwRgvwK9Wz6FetEmbwM3wnJKISYRYsMbXo+lBYPWG+99JAjjw8bfunXVl1WxMpAGJQI1oUMxJBh4cNzj+imMWGU+M8aDC8p7EyWMZS0AEUg0lUDLUGE2TIPfLfex+2DTp9JEfnPhpuvaa0yvTmb5rjDEaTFWWMEQ0UQyKCTdQrB+cPC727jdGE6OdGEvLgX9vCMX6jZLwCJ5qlEZ4Y6Q2ERJ0fbcqy4+lDYXD1sVlbACXKgEzIlAAN+FmKAjlyqzvxWhSCYwXjOU9gX4KJGFBlcRAZk5CjeG90Y4SinmZFA6nrrOrAgnMQMIEwaoK0aqaboabkBkyQYCUjPFijWYE7tD1QBFEQRBEUJinof5Ppd5DG7BiH02lsFJkm240VS4BcMCt3mXDYmZYgHdcEpgsGO2ofv/6cSf3wgJYAZvLF4V5XczKcJeRZKhoJeWeFbMAgAQBGzwgDKsEhpCzaZD3XRFoxxUc4OSros9GCCKHKkAIEByyg7koyTBEGJaRtJKKc74eVXc790BgkH1QAAOZOPDJyM49tgkO8NJfM6NoRBlBNRMhajMbLqtKztW0+py8zOmcX2z+6kMlaK4AoGDccU+q4KofP/90pi+VcJLhaAAzXCCG0ioDcAHlgYDmwAJpMOJ87SH/DkSrzvzSVwIXX2KbTCX4w2OZ7EZDoOA4AeFVNamyt2owc8OcTV+kOZpUtyMMaXhSzRnUBW76rHHXV8PW7s3J4+LZp5xxrODFbPDLUDHUVNmQiiAjOAQ35EYK89yqAlfBqt5bxOG2Q8YD396S9IHX/Xd2FFWpfZ4rAywQJIK8AruIobo/iVoFboTrDsBl74YQVF0bqpMtwvYdcPU1xqM/N77xLbtg5/O6PXAwDqmbGyVgsmGnRlQgyWiGe5KRvJo1ykgf+CBcdx3EZJw6BWfOwGhkXH45vPc9cNFFXOD2rZcEt3050Rj8+keZQCDgRAWiREIkiUaiQTQyGkGDkSQkI23bDtt2wNJSVWJpsT4vLcJo9HZwDY1qa9V84Z5EG+CJh3oStYVXMKcVNIJWRis236MMlxGWtott2+YxgC/BeFwbyRwU4G9HxS23Z378cKm+tPN++MzdiZvubmjMaM1omYMao817JTByaL3+Lb1+Wlx6aQVdXKgxHp332Zmz4uVj4qGfOc8fdZLDvx6t5/2dd8atfuTGuxILQTz3cMfIxJghBCOJVqopkBEFxYUduP2URpMJl+5PXHwR7N9b9X31pHj5n+LEf8SbZ2o/jy6iG62LNsOhWxO33Nq8rTJ+/70prxzpWEBMAoyDGIX5tAQpQUhOjlPshq/9T8XGZA9khyLhTi0rfGiJA4EimgJNEeMeJj188fMjDt4yOu+N4frL98/y2u+mTEyMTIwCNLGSSMmw5OS4QWp2Fiz40PI0HMnDTOCO5u9FpAJNFqMsRj2MZ/DkYzMW44QDn1u6QIVrvrnIi9Zz6smzjBFtqKNdE6jNx5xgHSnsLIRQS8hcBAnJCRKOMDnmGnYvmt5pOzHuxWRa48+Pn2Updnz45l3nDxKDKx5YZi3OeOupN2iCSIEakWFmmJFsR4aUNxu73DePIpMwFayIUJxYnKZ3Rp0znjqTViy2YmnD+fuRt1gKM6789L4toy6sfH0vay+fhNenpDAMOQkUwW1G0vYepVhHLvlmuIbTQk7wUgnkQuoKTVdoW2fcFCbJmURnoXGOPXGKpTjlsk9dtklg/ZfHiG+eII0hWZ22QjQURaEnaTHjTYebUeQUCj6QgEJQQV6gZKwvxD6TZoU2ZUYxM46FSSosNDVO/P6/LKQz7L3hSt74zT849/iLjBbraBdNdc4I4AESmVQW+rXSsJINsgpFjuOIDCpIBfOMSoacsa4npp6UOpqYGcWeccyMU2bSFCats/7H1+j+9CzN2RmjbdVXEQgDAQsGOEm+lrzt1koqKyUZWYVMwVUQGaMQPGPKKPcodxB7LM6IoSNZRwo9TexoU0/bZNqu0OZCKk6zTTQ+/Maos2w9moMhHCtaS33TPZODrs1NJFPolXEyomDqiSqY9+TQ4bFHYQY2xWxGsBkxDGRSR9P1NDnT9IVUCkkiDpUV0ObAa2aUXJDshdSFc6vZdG+PLXcJsjKuHqdgZKL3mPVk6+ltRmFGYUqxKc4GsimEGTQzrO2x3BFKqeE+zAM1BfPi6IvwwnqYptX09Ps/tn710d/e1+fySDboExTlmgJlSugxegIdDR2dpvRs0DMls0EOG5S4gTczSp6h3KHSg5ehh5RhCq7Nrc/OLAvl9CAj1jYr9vIXfnG40+w7XWDZo1cFLBOVabxn7B0L3rHdpyyXKbvyBrvzOfbkDfaUKbvzBstlxg6fsVg6Jp4ZqdCoEFU7bCnCi9Y9x/uAn+w89BIXnPYrRx9ZyZTDRf1VTr+C8oopk5QZqWfBO5a8Y4dvsLNM2VXOsdun7C7n2FWm7PIpOzRjm3dMvGeszIhCktaCtIbsGc6EVWB956E1AP4PY6C4mP9pgiAAAAAASUVORK5CYII=",
                nobatch: true
            }, {
                name: "头条搜索",
                url: "https://so.toutiao.com/search/?dvpf=%c&keyword=%s"
            }, {
                name: "必应",
                url: "https://www.bing.com/search?q=%s",
                match: "^https://(www|cn|global)\\.bing\\.com/search"
            }, {
                name: "鸭鸭",
                url: "https://duckduckgo.com/?q=%s",
                icon: "data:image/jpeg;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVZ4Ss0Wd+PM1nf1Tpd4PM6XeDzM1nf1TRZ3481WeErAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVYD/BjRa3pRQcOP9tMLy/83q2f/m9uv//f7+//L0/P+qu+7/UHDj/TRa3pRVgP8GAAAAAAAAAAAAAAAAVYD/BjNZ372Jnuv/9/j9/8nT9v+D0pj/R71m/02+a/9Kr3z/XreM//f4/f+Jnuv/M1nfvVWA/wYAAAAAAAAAADRa3pSJnuv/4Ob6/1h25P+8yPT/ntyv/6zhuv+Fvrj/PpKY/0Cbjf9YduT/4Ob6/4me6/80Wt6UAAAAADVZ4StQcOP99/j9/1h25P8zWN7/5+z7////////////Z4Lm/zNY3v8zWd3/M1je/1h25P/3+P3/UHDj/TVZ4Ss0Wd+PrLvx/5ut7v8zWN7/Rmfh/////////////////0Jo4P8neuf/IY/s/yZ85/8yXN//m63u/6y78f80Wd+PM1nf1ert+/9ObuL/M1je/3CK5////////////9j4//8RyPv/J3vn/ytx5P8lg+n/KHjm/05u4v/p7fv/M1nf1Tpd4PP4+f3/M1je/zNY3v+bre7////////////X+P//JNL8/yDJ+v8Utvb/II/t/y9j4P8zWN7/+Pn9/zpd4PM6XeDz+Pn9/zNY3v8zWN7/w871///////////////////////k+v//T5zt/xyc7/8UtPX/L2Ph//j5/f86XeDzM1nf1ert+/9ObuL/M1je/9vi+f//////oXZf////////////oXZf/2N/5f8zWN7/M1je/05u4v/q7fv/M1nf1TRZ34+su/H/m63u/zNY3v/H0fX//////////////////////+js+/83W97/M1je/zNY3v+bre7/rLvx/zRZ3481WeErUHDj/ff4/f9YduT/X3zl//Hz/P////////////j5/f9yi+j/M1je/zNY3v9YduT/9/j9/1Bw4/01WeErAAAAADRa3pSJnuv/4Ob6/1h25P9MbOL/2N/4/73J9P9DZeD/M1je/zNY3v9YduT/4Ob6/4me6/80Wt6UAAAAAAAAAABVgP8GM1nfvYme6//3+P3/m63u/05u4v8zWN7/M1je/05u4v+bre7/9/j9/4me6/8zWd+9VYD/BgAAAAAAAAAAAAAAAFWA/wY0Wt6UUHDj/ay78f/p7fv/+Pn9//j5/f/p7fv/rLvx/1Bw4/00Wt6UVYD/BgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVZ4Ss0Wd+PM1nf1Tpd4PM6XeDzM1nf1TRZ3481WeErAAAAAAAAAAAAAAAAAAAAAPAPAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAPAPAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFWA/wY2Wt9HM1nelTRY3780WN7ZM1je8zNY3vM0WN7ZNFjfvzNZ3pU2Wt9HVYD/BgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVg3xgzWN+WNFne8TNY3v9ceuT/iJ7r/52v7/+ywPL/ssDy/52v7/+Inuv/XHrk/zNY3v80Wd7xM1jfljVg3xgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAElt/wczWOCCM1nf9Ets4v+ouPH/6e37/+vv+//a4Pj/2eD4/9zi+f/c4vn/2eD4/9rg+P/m6vv/6e37/6i48f9LbOL/M1nf9DNY4IJJbf8HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1YN8YM1jfxz9i4P+js/D/8fP8/6Cx7/+7x/P/5fbp/1zEd/+o4Lb/9vz4////////////3+T5/zVZ3v9Xed3/obPu//Hz/P+js/D/P2Hf/zNY38c1YN8YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN1njLjRZ3uNTcuP/4eb6/7PB8v9IaeH/M1je/9rg+f/H69D/Rrxl/0a8Zf9NtV//RrRa/063Yv9fpqf/QqWA/0a8Zf87gqv/SGnh/7TC8v/h5vr/U3Lj/zRZ3uMzW+MtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVg3xg0Wd7jZ4Pm/+/x/P+Emuv/M1je/zNY3v87Xt///P3+/7rmxv9GvGX/Rrxl/0azWv9GvGX/Rrxl/0a8ZP9GvGX/Rrxl/zyIo/8zWN7/M1je/4Sa6//v8fz/Z4Lm/zRZ3uM1YN8YAAAAAAAAAAAAAAAAAAAAAAAAAABJbf8HM1jfx1Ny4//v8fz/aoXm/zNY3v8zWN7/M1je/2N/5f//////tOTB/0a8Zf9HvWb/c8mH/1W+bv9IuWj/Qqp7/0a8Zf9GvGX/PIWo/zNY3v8zWN7/M1je/2qF5v/v8fz/U3Lj/zNY38dJbf8HAAAAAAAAAAAAAAAAAAAAADNY4II/YuD/4eb6/4Sa6/8zWN7/M1je/zNY3v8zWN7/j6Ps///////W8d3/pt+1/+X26v//////8/X9/zhc3v80Wdz/PIek/0a4av85d7j/M1je/zNY3v8zWN7/M1je/4Sa6//h5vr/P2Hf/zNY4IIAAAAAAAAAAAAAAAA1YN8YM1nf9KOz8P+0wvL/M1je/zNY3v8zWN7/M1je/zNY3v+6xvP///////////////////////////+zwfL/M1je/zNY3v8zWN7/NFzY/zNZ3f8zWN7/M1je/zNY3v8zWN7/M1je/7TC8v+js/D/M1nf9DVg3xgAAAAAAAAAADNY35ZLbOL/8fP8/0hp4f8zWN7/M1je/zNY3v8zWN7/M1je/+Xq+v///////////////////////////32U6v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/SGnh//Hz/P9LbOL/M1jflgAAAABVgP8GNFne8ai48f+hsu//M1je/zNY3v8zWN7/M1je/zNY3v9DZeD/////////////////////////////////V3bj/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/obLv/6i48f80Wd7xVYD/BjZa30czWN7/6e37/1Z04/8zWN7/M1je/zNY3v8zWN7/M1je/2+J5/////////////////////////////////9RcOL/Lmfi/yKN7P8XrPP/EML5/w3K+/8Suvf/HZnu/y5n4v8zWN7/M1je/zNY3v9WdOP/6e37/zNY3v82Wt9HM1nelVx65P/j6Pr/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/mavu////////////////////////////7/z//yK79v8K0v3/Fq/0/yKN7P8iiev/IY7s/xqh8P8Suff/Dcr7/y5o4v8zWN7/M1je/zNY3v/j6Pr/XHrk/zNZ3pU0WN+/iJ7r/6++8v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v/DzvX///////////////////////////9k4/7/CtL9/xK59/8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/6++8v+Inuv/NFjfvzRY3tmdr+//mqzu/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/+7x/P///////////////////////////2Xj/v8K0v3/C9D9/xmm8f8YqfP/Gafy/yKN7P8vZuH/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/mqzu/52v7/80WN7ZM1je87LA8v+Fm+v/M1je/zNY3v8zWN7/M1je/zNY3v9La+H/////////////////////////////////+P7//3Pm/v8P0/3/CtL9/wrS/f8K0v3/CtL9/wrR/f8VsvX/JYPp/zNb3v8zWN7/M1je/zNY3v+Fm+v/ssDy/zRZ3vIzWN7zssDy/4Wb6/8zWN7/M1je/zNY3v8zWN7/M1je/3SN6P////////////////////////////////////////////b+///T9///vPP//1q/9v8WrfT/DMv8/wrS/f8K0v3/DsX6/yl25v8zWN7/M1je/4Wb6/+ywPL/M1je8zRY3tmdr+//mqzu/zNY3v8zWN7/M1je/zNY3v8zWN7/m63u////////////0LWn/7qTfv/////////////////////////////+/v//////s8Dy/zNY3v8zWt7/KXbm/x2b7v8bn/D/KnPl/zNY3v8zWN7/mqzu/52v7/80WN7ZNFjfv4me6/+vvvL/M1je/zNY3v8zWN7/M1je/zNY3v+zwPL///////////+sfWT/om5R//v59///////////////////////pHFV/8Cdiv+ruvH/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v+vvvL/iJ7r/zRY378zWd6VXHrk/+Po+v8zWN7/M1je/zNY3v8zWN7/M1je/7/K9P////////////z6+f/38u/////////////////////////////NsKH/4dDH/3uT6f8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/+Po+v9ceuT/M1nelTZa30czWN7/6e37/1Z04/8zWN7/M1je/zNY3v8zWN7/p7fw///////k1c3////////////////////////////////////////////3+f3/Q2Xg/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v9WdOP/6e37/zNY3v82Wt9HVYD/BjRZ3vGouPH/oLHv/zNY3v8zWN7/M1je/zNY3v92j+j//////+7l3//gz8b/+/j2///////////////////////p3db/2MK2/6mz5P8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/6Gy7/+ouPH/NFne8VWA/wYAAAAAM1jflkts4v/x8/z/SGnh/zNY3v8zWN7/M1je/zNY3v/U3Pj////////////////////////////////////////////s7/z/RWfg/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v9IaeH/8fP8/0ts4v8zWN+WAAAAAAAAAAA1YN8YM1nf9KOz8P+zwfL/M1je/zNY3v8zWN7/M1je/0Fj4P/DzvX/////////////////////////////////8PP8/2WB5v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/7TC8v+js/D/M1nf9DVg3xgAAAAAAAAAAAAAAAAzWOCCP2Lg/+Hm+v+Emuv/M1je/zNY3v8zWN7/R2jh/0do4f97k+n/1dz4////////////7/L8/4Oa6/9CZOD/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v+Fm+v/4eb6/z9i4P8zWOCCAAAAAAAAAAAAAAAAAAAAAElt/wczWN/HU3Lj/+/x/P9qheb/M1je/zNY3v+Xqe7/7vH8/////////////////87X9/9TcuP/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/aoXm/+/x/P9TcuP/M1jfx0lt/wcAAAAAAAAAAAAAAAAAAAAAAAAAADVg3xg0Wd7jZ4Lm/+/x/P+Emuv/M1je/2J+5f+puPH/rrzx/5Kl7f9PbuL/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/4Sa6//v8fz/Z4Lm/zRZ3uM1YN8YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADdZ4y40Wd7jU3Lj/+Hm+v+0wvL/SGnh/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/0hp4f+0wvL/4eb6/1Ny4/80Wd7jM1vjLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVg3xgzWN/HP2Lg/6Oz8P/x8/z/obLv/1Z04/8zWN7/M1je/zNY3v8zWN7/M1je/zNY3v8zWN7/M1je/1Z04/+hsu//8fP8/6Oz8P8/Yd//M1jfxzVg3xgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAElt/wczWOCCM1nf9Ets4v+ouPH/6e37/+Po+v+vvvL/mqzu/4Wb6/+Fm+v/mqzu/6++8v/j6Pr/6e37/6i48f9LbOL/M1nf9DNY4IJJbf8HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1YN8YM1jfljRZ3vEzWN7/XHrk/4ie6/+dr+//ssDy/7LA8v+dr+//iJ7r/1x65P8zWN7/NFne8TNY35Y1YN8YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVYD/BjZa30czWd6VNFjfvzRY3tkzWN7zM1je8zRY3tk0WN+/M1nelTZa30dVgP8GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AA///AAD//AAAP/gAAB/wAAAP4AAAB8AAAAPAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAcAAAAPAAAAD4AAAB/AAAA/4AAAf/AAAP/8AAP//wAP/",
                nobatch: true
            }, {
                name: "360",
                url: "https://www.so.com/s?ie=utf-8&q=%s",
                match: "(www|m)\\.so\\.com/s\\?.*[&\?]q="
            }, {
                name: "雅虎",
                url: "https://search.yahoo.com/search?p=%s",
                icon: "data:image/jpeg;base64,AAABAAEAICAAAAEACACoCAAAFgAAACgAAAAgAAAAQAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSAWAA0gJhANIDYQDSBGIA0gVjANMHZADTCWUA0wtmANQMZwDUDWgA1BBpANURagDVE2sA1RRsANYbcADXHnIA1yBzANgkdgDZKXkA2St6ANoufADaMH0A2zaBANw5gwDcO4QA3UGIAN9LjgDfTI8A4FCRAOBSkwDgVJQA4ViWAOFZlwDiXJkA5GuiAOVsowDlb6UA5XClAOd4qgDneasA6H6uAOiArwDogrEA6oi0AOqMtwDrkrsA7JS8AOyVvADslr0A7ZrAAO2cwQDuocQA7qLFAO6kxgDvqMgA8KvKAPCtywDyuNIA8rrTAPO+1gD0wtgA9MTaAPTG2wD1yNwA9s7gAPbP4QD31OQA99XkAPfX5gD42ecA+NvoAPnf6wD54ewA+uTuAPrl7gD87vQA/PD1APzx9gD88vYA/fT4AP31+AD99vkA/vr7AP77/AD+/P0A/v39AP7+/gD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0V1dXOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABVXV1dUEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtXV1csAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1dXV0wIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdV1dXVyIAAAcwSEEfAAAAAAAAAAAAAAAAAAAAAAAAAD1XV1dXRQAAL1dXV1YYAAAAAAAAAAAAAAAAAAAAAAAWV1dXV1dXGgBDV1dXVyoAAAAAAAAAAAAAAAAAAAAAADZXV1dXV1c6ADNXV1dXIAAAAAAAAAAAAAAAAAAAAAAPU1dXU05XV1cTDTlWUy0AAAAAAAAAAAAAAAAAAAAAACxXV1c3LVdXVzEAAAkFAAAAAAAAAAAAAAAAAAAAAAAJTVdXVxkSV1dXUQwGRkZGRjEAAAAAAAAAAAAAAAAAACVXV1dEAAA7V1dXJwA8V1dXVREAAAAAAAAAAAAAAAACR1dXVyQAAB5XV1dJAxxXV1dXLgAAAAAAAAAAAAAAAB5XV1dQCgAAA0pXV1cfAUZXV1dPCwAAAAAAAAAAAAAAPldXVzIAAAAAKVdXVz8AI1dXV1cmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHS1dXV0oEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArV1dXVyEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5SV1dXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVXV1dXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFEJCQkIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
            }, {
                name: "搜狗",
                url: "https://www.sogou.com/web?query=%s",
                keywords: "query|keyword",
                match: "(www|wap|m)\\.sogou\\.com/(web|web/searchList\\.jsp).*(query|keyword)="
            }, {
                name: "Yandex",
                url: "https://yandex.com/search/?text=%s",
                icon: "data:image/jpeg;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAsAAAAUwAAAF8AAABfAAAAXwAAAF8AAABfAAAAXwAAAF8AAABfAAAAXwAAADjBwcEAwcHBAMHBwQDBwcEAAAAAUbq6uurExMT/xMTE/8TExP/ExMT/xMTE/8TExP/ExMT/xMTE/8TExP9ubm6QAAAALcTExADExMQAxMTEAAAAAFrHx8f/x8fH/8fHx/+7u8j/AADS/wAA0v+wsMj/x8fH/8fHx//Hx8f/vr6+7h4eHmQAAAAQx8fHAMfHxwAAAABXy8vL/8vLy//Ly8v/v7/M/wAA2/8AANv/s7PN/8vLy//Ly8v/y8vL/8vLy/+kpKS6AAAAM8vLywDLy8sAAAAAU9DQ0P/Q0ND/0NDQ/8TE0f8AAOX/AADl/7i40v/Q0ND/0NDQ/9DQ0P/Q0ND/0NDQ/2VlZXsAAAAk0NDQAAAAAE/U1NT/1NTU/9TU1P/IyNb/AADw/wAA8P+7u9f/1NTU/9TU1P/U1NT/1NTU/9TU1P/JycnkDw8PUwAAAAcAAABL2dnZ/9nZ2f/Z2dn/np7i/wAA+f8AAPn/goLm/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/6ioqKYAAAAqAAAASOLi4v/i4uL/4uLi/0hI9v8AAP//BQX+/yAg+//f3+L/4uLi/+Li4v/i4uL/4uLi/+Li4v/g4OD7AAAARgAAAETx8fH/8fHx/9jZ8v8LD///HiL+/3h6+P8IDP//lJX3//Hx8f/x8fH/8fHx//Hx8f/x8fH/7+/v+wAAAEIAAABA9vb2//b29v+Ah/v/Ex///3N6+//Z2vf/FiL//ys2/v/r7Pb/9vb2//b29v/29vb/9vb2/8jIyKMAAAAkAAAAPPn5+f/09Pn/NEf+/yA0///Gy/r/+fn5/1hn/f8gNP//jpj8//n5+f/5+fn/+fn5//Dw8OMXFxdBAAAABgAAADj7+/v/tb/8/y5K//9GX///+/v7//v7+/+zvfz/Lkr//zhS///l6Pv/+/v7//v7+/+Tk5NnAAAAGfv7+wAAAAA1/f39/3OM/v85Xf//mqz+//39/f/9/f3/9vf9/0do//85Xf//fpX+//39/f/c3NysAAAAH/39/QD9/f0AAAAAMv7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v+VrP//QWn//0Fp///T3PrtPj4+PgAAAAn+/v4A/v7+AAAAACn39/fi////////////////////////////////////////////////tbW1cgAAABf///8A////AP///wAAAAAVAAAAKAAAAC4AAAAuAAAALgAAAC4AAAAuAAAALgAAAC4AAAAuAAAALgAAABv///8A////AP///wD///8AAA8AAAAHAAAAAwAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAADAAAABwAAAA8AAA=="
            }, {
                name: "startpage",
                url: "https://www.startpage.com/sp/search?query=%s",
                match: "www\\.startpage\\.com/sp/search",
                icon: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB60lEQVQ4jZWTPWhTARDHf5ePlzQ2oDXVKCJVKFIHEdGAFmMRg9QPikXRCkoHnQQXF6cguDgpOImDQ4QuNkHsKCKCYDFLKYKFYq1N0EATLe2SvJeXc3i8NC+hWA8O7v+/D+6DE9O0s6CjIvyXqAoi5MQ069qerCosV8CyoDcGRlA3KAKB9uTZr8LklFCuODgUgqETwoWU4vd7C4mAmKbdZL/MwbOMoArxHRDpgsUC2A1IHIbxq52dBFrBqylBVbh+qcFgwuF+luDJcyE/A8njsH+vt4DPNZYrUK7Anl3aTAbYHYfh08r2bbBU7NyDWJatqlCtQfk39Gx1Wm+ds1qtUa3V6AqHMQyjvQNFRAkGbLK5DA8fPWZ1bQ0Rh1dVbt9Jc+zkFT58zOPGu9rcQSDgY25+gXfvP7HwvcC9u+NEu7fw4mWO6fwMsVgPycGjtF9NLKveXG25ssLNW/eZ/7bYMeuB/n1kJ54SCgU9vD+dTj9wQSQSZnQkRTTaTUOV+M5ezp89RaFYYqlY4s/KKkPJhLcL07T1Xzr9eVb7Dw1r30BKJ1+/9fg2VcA0bc1MvNG+gTN68MhF/VH41eR9bFKuXT7HjbERDCOIXbfXl2iadYWNX1HEeZp1Udx4EcUH5NzbOk7vnVux46fVzv0FyTAep7bqlzwAAAAASUVORK5CYII="
            }, {
                name: "谷歌高级搜索",
                url: "https://www.google.com/search?q=%s%input{请输入限制文件类型, filetype:doc}%input{请输入结果限制语言,&lr=lang_zh-CN|lang_zh-TW}%input{请输入限制日期,&as_qdr=w1}&ie=utf-8&oe=utf-8",
                icon: "data:image/jpeg;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///zD9/f2W/f392P39/fn9/f35/f391/39/ZT+/v4uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Cf39/Zn///////////////////////////////////////////39/ZX///8IAAAAAAAAAAAAAAAA/v7+Cf39/cH/////+v35/7TZp/92ul3/WKs6/1iqOv9yuFn/rNWd//j79v///////f39v////wgAAAAAAAAAAP39/Zn/////7PXp/3G3WP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP+Or1j//vDo///////9/f2VAAAAAP///zD/////+vz5/3G3V/9TqDT/WKo6/6LQkf/U6cz/1urO/6rUm/+Zo0r/8IZB//adZ////v7///////7+/i79/f2Y/////4nWzf9Lqkj/Vqo4/9Xqzv///////////////////////ebY//SHRv/0hUL//NjD///////9/f2U/f392v////8sxPH/Ebzt/43RsP/////////////////////////////////4roL/9IVC//i1jf///////f391/39/fr/////Cr37/wW8+/+16/7/////////////////9IVC//SFQv/0hUL/9IVC//SFQv/3pnX///////39/fn9/f36/////wu++/8FvPv/tuz+//////////////////SFQv/0hUL/9IVC//SFQv/0hUL/96p7///////9/f35/f392/////81yfz/CrL5/2uk9v///////////////////////////////////////////////////////f392P39/Zn/////ks/7/zdS7P84Rur/0NT6///////////////////////9/f////////////////////////39/Zb+/v4y//////n5/v9WYu3/NUPq/ztJ6/+VnPT/z9L6/9HU+v+WnfT/Ul7t/+Hj/P////////////////////8wAAAAAP39/Z3/////6Or9/1hj7v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9sdvD////////////9/f2YAAAAAAAAAAD///8K/f39w//////5+f7/paz2/11p7v88Suv/Okfq/1pm7v+iqfX/+fn+///////9/f3B/v7+CQAAAAAAAAAAAAAAAP///wr9/f2d///////////////////////////////////////////9/f2Z/v7+CQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f2Z/f392/39/fr9/f36/f392v39/Zj///8wAAAAAAAAAAAAAAAAAAAAAPAPAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAPAPAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/g3+/v5X/f39mf39/cj9/f3q/f39+f39/fn9/f3q/f39yP39/Zn+/v5W////DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f2c/f399f/////////////////////////////////////////////////////9/f31/f39mv7+/iMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/gn9/f2K/f39+////////////////////////////////////////////////////////////////////////////f39+v39/Yf///8IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4k/f390v////////////////////////////////////////////////////////////////////////////////////////////////39/dD///8iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////MP39/er//////////////////////////+r05v+v16H/gsBs/2WxSf9Wqjj/Vqk3/2OwRv99vWX/pdKV/97u2P////////////////////////////39/ej+/v4vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f3q/////////////////////+v15/+Pxnv/VKk2/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/36+Z//d7tf///////////////////////39/ej///8iAAAAAAAAAAAAAAAAAAAAAAAAAAD///8K/f390//////////////////////E4bn/XKw+/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1apN/+x0pv///////////////////////39/dD///8IAAAAAAAAAAAAAAAAAAAAAP39/Yv/////////////////////sdij/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/YKU1/8qOPv/5wZ////////////////////////39/YcAAAAAAAAAAAAAAAD+/v4l/f39+////////////////8Lgt/9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9utlT/n86N/7faqv+426v/pdKV/3u8ZP9UqDX/U6g0/3egN//jiUH/9IVC//SFQv/82MP//////////////////f39+v7+/iMAAAAAAAAAAP39/Z3////////////////q9Ob/W6w+/1OoNP9TqDT/U6g0/1OoNP9nskz/zOXC/////////////////////////////////+Dv2v+osWP/8YVC//SFQv/0hUL/9IVC//WQVP/++fb//////////////////f39mgAAAAD+/v4O/f399v///////////////4LHj/9TqDT/U6g0/1OoNP9TqDT/dblc//L58P/////////////////////////////////////////////8+v/3p3f/9IVC//SFQv/0hUL/9IVC//rIqf/////////////////9/f31////DP7+/ln////////////////f9v7/Cbz2/zOwhv9TqDT/U6g0/2KwRv/v9+z///////////////////////////////////////////////////////738//1kFT/9IVC//SFQv/0hUL/9plg///////////////////////+/v5W/f39nP///////////////4jf/f8FvPv/Bbz7/yG1s/9QqDz/vN2w//////////////////////////////////////////////////////////////////rHqP/0hUL/9IVC//SFQv/0hUL//vDn//////////////////39/Zn9/f3L////////////////R878/wW8+/8FvPv/Bbz7/y7C5P/7/fr//////////////////////////////////////////////////////////////////ere//SFQv/0hUL/9IVC//SFQv/718H//////////////////f39yP39/ez///////////////8cwvv/Bbz7/wW8+/8FvPv/WNL8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqv/////////////////9/f3q/f39+v///////////////we9+/8FvPv/Bbz7/wW8+/993P3///////////////////////////////////////SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+cGf//////////////////39/fn9/f36////////////////B737/wW8+/8FvPv/Bbz7/33c/f//////////////////////////////////////9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/6xaX//////////////////f39+f39/e3///////////////8cwvv/Bbz7/wW8+/8FvPv/WdP8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vVv//////////////////9/f3q/f39y////////////////0bN/P8FvPv/Bbz7/wW8+/8hrvn/+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////39/cj9/f2c////////////////ht/9/wW8+/8FvPv/FZP1/zRJ6/+zuPf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////f39mf7+/lr////////////////d9v7/B7n7/yB38f81Q+r/NUPq/0hV7P/u8P3////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v5X////D/39/ff///////////////9tkPT/NUPq/zVD6v81Q+r/NUPq/2Fs7//y8v7////////////////////////////////////////////09f7//////////////////////////////////////////////////f399f7+/g0AAAAA/f39n////////////////+Tm/P89Suv/NUPq/zVD6v81Q+r/NUPq/1Bc7f/IzPn/////////////////////////////////x8v5/0xY7P+MlPP////////////////////////////////////////////9/f2cAAAAAAAAAAD+/v4n/f39/P///////////////7W69/81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9ZZe7/k5v0/6609/+vtff/lJv0/1pm7v81Q+r/NUPq/zVD6v+GjvL//v7//////////////////////////////f39+/7+/iQAAAAAAAAAAAAAAAD9/f2N/////////////////////6Cn9f81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v+BivL////////////////////////////9/f2KAAAAAAAAAAAAAAAAAAAAAP7+/gv9/f3V/////////////////////7W69/8+S+v/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/P0zr/7q/+P///////////////////////f390v7+/gkAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3r/////////////////////+Xn/P94gfH/NkTq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NkTq/3Z/8f/l5/z///////////////////////39/er+/v4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f3r///////////////////////////k5vz/nqX1/2p08P9IVez/OEbq/zdF6v9GU+z/aHLv/5qh9f/i5Pz////////////////////////////9/f3q////MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3V/////////////////////////////////////////////////////////////////////////////////////////////////f390v7+/iQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wr9/f2N/f39/P///////////////////////////////////////////////////////////////////////////f39+/39/Yv+/v4JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4n/f39n/39/ff//////////////////////////////////////////////////////f399v39/Z3+/v4lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Dv7+/lr9/f2c/f39y/39/e39/f36/f39+v39/ez9/f3L/f39nP7+/ln+/v4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AA///AAD//AAAP/gAAB/wAAAP4AAAB8AAAAPAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAcAAAAPAAAAD4AAAB/AAAA/4AAAf/AAAP/8AAP//wAP/",
                nobatch: true
            } ]
        },
        {
            type: "划词搜索",
            icon: "sitemap",
            selectTxt: true,
            openInNewTab: true,
            sites: [ {
                name: "Google ",
                url: "[\"Google\"]"
            }, {
                name: "百度 ",
                url: "[\"百度\"]"
            }, {
                name: "谷歌站内搜",
                url: "https://www.google.com/search?q=%s%20site%3A%h&ie=utf-8&oe=utf-8",
            }, {
                name: "头条站内搜",
                url: "https://so.toutiao.com/search/?dvpf=%c&keyword=%s%20site%3A%h"
            }, {
                name: "百度站内搜",
                url: "https://www.baidu.com/s?wd=%s%20site%3A%h&ie=utf-8"
            }, {
                name: "必应站内搜",
                url: "https://www.bing.com/search?q=%s%20site%3A%h"
            }, {
                name: "鸭鸭站内搜",
                url: "https://duckduckgo.com/?q=%s%20site%3A%h"
            }, {
                name: "360站内搜",
                url: "https://www.so.com/s?ie=utf-8&q=%s%20site%3A%h"
            }, {
                name: "文字转二维码-草料",
                url: "https://cli.im/text#p{#text-content=%s&click(#click-create)}"
            }, {
                name: "雅虎站内搜",
                url: "https://search.yahoo.com/search;?p=%s%20site%3A%h"
            }, {
                name: "搜狗站内搜",
                url: "https://www.sogou.com/web?query=%s%20site%3A%h"
            }, {
                name: "Yandex站内搜",
                url: "https://yandex.com/search/?text=%s%20site%3A%h"
            }, {
                name: "Startpage站内搜",
                url: "https://www.startpage.com/sp/search?query=%s%20site%3A%h",
                icon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
            } ]
        },
        {
            type: "以图搜图",
            icon: "eye",
            selectImg: true,
            openInNewTab: true,
            sites: [ {
                name: "谷歌搜图",
                url: "https://www.google.com/searchbyimage?image_url=%t"
            }, {
                name: "Yandex搜图",
                url: "https://yandex.com/images/search?source=collections&rpt=imageview&url=%t"
            }, {
                name: "SauceNAO",
                url: "https://saucenao.com/search.php?db=999&url=%t"
            }, {
                name :"IQDB",
                url: "https://iqdb.org/?url=%t"
            }, {
                name: "3D IQDB",
                url: "https://3d.iqdb.org/?url=%t"
            }, {
                name: "Lunapic",
                url: "https://www.lunapic.com/editor/index.php?action=url&url=%t",
                description: "使用 Lunapic 编辑图片"
            }, {
                name: "Pixlr easy",
                url: "https://pixlr.com/x/#p{click(#home-open-url)&#image-url=%t&click(.dialog>.buttons>a.button.positive)}",
                description: "使用 Pixlr easy 编辑图片"
            }, {
                name: "百度搜图",
                url: "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=%t"
            }, {
                name: "Bing搜图",
                url: "https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:%t"
            }, {
                name: "TinEye",
                url: "https://www.tineye.com/search?url=%t"
            }, {
                name: "搜狗搜图",
                url: "https://pic.sogou.com/ris?query=%t"
            }, {
                name: "360搜图",
                url: "http://st.so.com/stu?imgurl=%t"
            }, {
                name: "WhatAnime",
                url: "https://trace.moe/?url=%t"
            }, {
                name: "Ascii2D",
                url: "https://ascii2d.net/search/url/%t"
            }, {
                name: "Trace Moe",
                url: "https://trace.moe/?url=%t"
            }, {
                name: "KarmaDecay",
                url: "http://karmadecay.com/%t"
            }, {
                name: "ZXing二维码解码",
                url: "https://zxing.org/w/decode?full=true&u=%t"
            }, {
                name: "ImgOps",
                url: "https://imgops.com/%b"
            } ]
        },
        {
            type: "VIP",
            icon: "key",
            match: "://v\\.qq\\.com/x/",
            sites: []
        },
        {
            type: "视频",
            icon: "circle-play",
            selectVideo: true,
            sites: [ {
                name: "M3u8播放器",
                url: "https://players.akamai.com/players/hlsjs?streamUrl=%t"
            }, {
                name: "去视频水印",
                url: "https://parse.bqrdh.com/smart/#p{.ant-input=%u&click(.ant-input-search-button)}"
            } ]
        },
        {
            type: "学术",
            icon: "graduation-cap",
            sites: [ {
                name: "百度学术",
                url: "http://xueshu.baidu.com/s?wd=%s"
            }, {
                name: "万方",
                url: "https://s.wanfangdata.com.cn/paper?q=%s",
                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVQ4jdWSvY4BURhAPwoS8TuTqESC3lN4DZGYVqGTaPQa4g1UYjqxdN5EoURI/CQ0M9/ZYnYya9fsRrHFFqe5Jzm5936ftEXatog9EZm+ii1iy1xkQbUKlgXNpodlQb0O8TjUao/O940GJJPIRGRKr4fCd0wTXa2eO4BK5SPQ6XiHqh6Ans+oYaCz2aPz/e0GpdJfBk4nL7BcPn+C60K5/MsNTBMdj9HDAd1uA3Y7dLOBYvGHwPWKFgqoSCiI/BC4XNB8HrUsdDRCB4OA4RDt98EwwgOcz2guFzpG/sEYXwp0uziuq59x73d1DEOdxUK/Osd11XUcDfag1UKPx2DO+z2s194nhuwB/h7MRd6IxSCbhXTaI5OBVAoiEUgkHp1PKgXRKO8NfBp7UCxd2QAAAABJRU5ErkJggg=="
            }, {
                name: "Scholar",
                url: "http://scholar.google.com/scholar?hl=zh-CN&q=%s"
            }, {
                name: "Google Book",
                url: "https://www.google.com/search?q=%s&btnG=搜索图书&tbm=bks&tbo=1&hl=zh-CN&gws_rd=ssl"
            }, {
                name: "中国知网",
                url: "https://kns.cnki.net/KNS8/DefaultResult/Index?dbcode=CFLS&kw=%s"
            }, {
                name: "爱学术",
                url: "https://www.ixueshu.com/search/index.html?search_type=&q=%s",
                icon: "https://www.ixueshu.com/static/favicon.ico"
            }, {
                name: "维普",
                url: "http://lib.cqvip.com/Qikan/Search/Index?from=Qikan_Search_Index/%p{isNoteHistory=1&isLog=1&indexIdentifier=U&indexKey=%s}"
            }, {
                name: "krugle",
                url: "http://opensearch.krugle.org/document/search/#query=%s",
                icon: "https://opensearch.krugle.org/media/images/favicon.ico"
            }, {
                name: "npm",
                url: "https://www.npmjs.org/search?q=%s",
                icon: "https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png"
            }, {
                name: "中国大学MOOC",
                url: "https://www.icourse163.org/search.htm?search=%s"
            }, {
                name: "读秀知识",
                url: "http://qw.duxiu.com/getPage?sw=%s&ecode=utf-8",
                icon: "https://mycroftproject.com/updateos.php/id0/duxiu.ico"
            }, {
                name: "读秀书籍",
                url: "http://book.duxiu.com/search?Field=all&channel=search&sw=%s&ecode=utf-8&edtype=&searchtype=1&view=0",
                icon: "https://mycroftproject.com/updateos.php/id0/duxiu.ico"
            } ]
        },
        {
            type: "开发",
            icon: "code",
            sites: [ {
                name: "MDN",
                url: "https://developer.mozilla.org/zh-CN/search?q=%s"
            }, {
                name: "stackoverflow",
                url: "https://stackoverflow.com/search?q=%s"
            }, {
                name: "掘金",
                url: "https://juejin.im/search?query=%s&type=all"
            }, {
                name: "Can I Use",
                url: "http://caniuse.com/#search=%s",
                icon: "https://caniuse.com/img/favicon-128.png"
            }, {
                name: "GitHub",
                url: "https://github.com/search?utf8=✓&q=%s",
                match: "https://github\\.com/search\\?.*[&\?]q="
            }, {
                name: "w3c",
                url: "http://www.runoob.com/?s=%s"
            }, {
                name: "GreasyFork",
                url: "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓",
                icon: "https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png"
            } ]
        },
        {
            type: "百科",
            icon: "book-open-reader",
            sites: [ {
                name: "维基",
                url: "http://zh.wikipedia.org/wiki/%s"
            }, {
                name: "百度百科",
                url: "http://baike.baidu.com/search/word?pic=1&sug=1&word=%s"
            }, {
                name: "百度文库",
                url: "http://wenku.baidu.com/search?word=%s&ie=utf-8"
            }, {
                name: "豆丁文档",
                url: "http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s"
            }, {
                name: "爱问知识",
                url: "http://iask.sina.com.cn/search?searchWord=%s"
            }, {
                name: "果壳",
                url: "http://www.guokr.com/search/all/?wd=%s"
            }, {
                name: "Quora",
                url: "https://www.quora.com/search?q=%s"
            } ]
        },
        {
            type: "网盘",
            icon: "cloud-download",
            sites: [ {
                name: "百度网盘",
                url: "https://pan.baidu.com/disk/main?#/search?key=%s"
            }, {
                name: "大力盘",
                url: "https://www.dalipan.com/search?keyword=%s"
            }, {
                name: "大圣盘",
                url: "https://www.dashengpan.com/search?keyword=%s"
            }, {
                name: "优聚搜",
                url: "https://v3.ujuso.com/#/main?kw=%s"
            } ]
        },
        {
            type: "购物",
            icon: "shopping-cart",
            sites: [ {
                name: "淘宝",
                url: "http://s.taobao.com/search?q=%s",
                icon: "https://www.taobao.com/favicon.ico"
            }, {
                name: "京东",
                url: "http://search.jd.com/search?keyword=%s&enc=utf-8",
                icon: "https://www.jd.com/favicon.ico"
            }, {
                name: "苏宁",
                url: "https://search.suning.com/%s/"
            }, {
                name: "亚马逊",
                url: "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s",
                icon: "https://www.amazon.cn/favicon.ico"
            }, {
                name: "天猫",
                url: "http://list.tmall.com/search_product.htm?q=%s"
            }, {
                name: "值得买",
                url: "http://search.smzdm.com/?c=home&s=%s"
            }, {
                name: "当当网",
                url: "http://search.dangdang.com/?key=%s"
            }, {
                name: "1688",
                url: "https://s.1688.com/selloffer/offer_search.htm?keywords=%s"
            } ]
        },
        {
            type: "Github",
            icon: "fa-brands fa-github",
            match: "github\\.com",
            selectLink: true,
            selectPage: true,
            openInNewTab: true,
            sites: [ {
                name: "页面镜像 - Fastgit",
                url: "%u.replace(/https:\\/\\/github\\.com/,\"https://hub.fastgit.xyz\")",
                match: "https:\\/\\/github\\.com",
                hideNotMatch: true
            }, {
                name: "Raw镜像 - Fastgit",
                url: "%u.replace(/raw\\.githubusercontent\\.com/,\"raw.fastgit.org\").replace(/github.com(.*)\\/blob\\/(.*)/,\"raw.fastgit.org$1/$2\")",
                match: "github.com.*\\/blob\\/",
                hideNotMatch: true
            }, {
                name: "Assets镜像 - Fastgit",
                url: "%u.replace(/github\\.githubassets\\.com/,\"assets.fastgit.orgz\")",
                match: "github\\.githubassets\\.com",
                hideNotMatch: true
            }, {
                name: "Download镜像- Fastgit",
                url: "%u.replace(/github\\.com(.*\\/download\\/)/,\"download.fastgit.org$1\")",
                match: "github\\.com.*\\/download\\/",
                hideNotMatch: true
            }, {
                name: "Archive镜像- Fastgit",
                url: "%u.replace(/github\\.com(.*\\/archive\\/)/,\"download.fastgit.org$1\")",
                match: "github\\.com.*\\/archive\\/",
                hideNotMatch: true
            }, {
                name: "Ghproxy镜像加速",
                url: "https://ghproxy.com/%u"
            } ]
        },
        {
            type: "辅助工具",
            icon: "list-alt",
            selectTxt: true,
            selectImg: true,
            selectAudio: true,
            selectVideo: true,
            selectLink: true,
            selectPage: true,
            openInNewTab: true,
            sites: [ {
                name: "生成二维码",
                url: "https://www.lofter.com/genBitmaxImage?h=330&w=330&url=%T"
            }, {
                name: "分享到微博",
                url: "https://service.weibo.com/share/share.php?url=%t&title=%n"
            }, {
                name: "分享到推特",
                url: "https://twitter.com/intent/tweet?url=%T"
            }, {
                name: "使用Gmail发送",
                url: "https://mail.google.com/mail/u/0/?tf=cm&source=mailto&body=%n %T"
            }, {
                name: "分享到Facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u=%T&t=%n"
            }, {
                name: "手机号码聚合搜索",
                url: "[\"360\",\"搜狗\"]",
                icon: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAcFBQYFBAcGBQYIBwcIChELCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJChQLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/wAARCABAAEADASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAMIAgcBBQYE/8QAMxAAAQMDAgIIBAYDAAAAAAAAAQIDBAAFEQYSByEIEzFBUWFxgRQyUmIVIzNCkbFyoeH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AsPSlKBSlKBSo2X2pDfWR3UPI+ptYUP5FSUClKUCo33kRo7j7ytrbSCtZxnAAyf8AQqSsHWkPtLacGUOJKFehGD/dBU2+9JPV0nVZmWFbUK0tL/Kgusoc61Hi4rGcn7SMd3jVotPXpjUel7deY6drU+KiQEZzt3JyU+xyPaqFXSzvWvUsuzyilp6NKVGWpw4CSle3JPh31efQ2mjo/QtrsJkiUuExtU8OxaiSo4+3KiB5YoNbWXTvC3VE5Y4cXuTp2+N5KfgH3WHQR4su8lp8QO6vWaT1beIepTozXoZ/GOrL0C4sJ2s3NodpA/a4O9Pr79XJjwuLFsukOdZ3dPaxsTiercKwXojpG5paHU43IVjs/wCGun1FepWqeAto10W+rvtifbmBSU7T1rboaeH+Khzx2dlBuqlRsPIkR232vkdQFp9CMj+6koFKUoKxdJPh29DvA1pbGSqJL2t3AJH6ToGErPkoADP1D7hXp+CfGy33GzxdNatmIiXGKgMxpT6tqJKBySkqPILA5c/m5d9bvmQ41whPRJzDciM+gtutOp3JWk8iCO8VWriJ0bJ8OS7cNAH4yIolRtzqwHmvJCjyWPI4V60G/NSa40zo8sDUl4jQFyRlpC8qUseOEgnHn2V9tl1BZdRRS/YbnDuLKcbjGdSvbnxA5j3FUKvFrvNrkiPfYc2I80OrCJba0FIHcN3d6VtLo22K+yuIyLzBS41aYbbiJrx5Id3IIS0PqO7ary258MhbalKUClKUClKUGDrTb7ex9CXUH9riQofwa4ZYajtBqO0hptPYhtISB7CpKUClKUH/2Q=="
            }, {
                name: "🧮  计算器",
                url: "calculator://"
            }, {
                name: "🔎  Everything搜索",
                url: "ES://%s"
            } ]
        },
        {
            type: "当前网页",
            icon: "list",
            selectLink: true,
            selectPage: true,
            openInNewTab: true,
            sites: [ {
                name: "SEO查询",
                url: "http://seo.chinaz.com/?q=%h"
            }, {
                name: "网页快照查询",
                url: "https://2tool.top/kuaizhao.php?k=%u",
                icon: "data:image/svg+xml,%3Csvg xmlns=\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 256\"%3E%3Cg fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"%3E%3Cpath d=\"M 239.98507%2C55.993592 A 111.98507%2C39.994664 0 0 1 128%2C95.988256 111.98507%2C39.994664 0 0 1 16.01493%2C55.993592 111.98507%2C39.994664 0 0 1 128%2C15.998927 111.98507%2C39.994664 0 0 1 239.98507%2C55.993592 Z\"%2F%3E%3Cpath d=\"m 239.98507%2C199.97441 a 111.98507%2C39.994664 0 0 1 -55.99253%2C34.63639 111.98507%2C39.994664 0 0 1 -111.985079%2C0 111.98507%2C39.994664 0 0 1 -55.992531%2C-34.6364\"%2F%3E%3Cpath d=\"m 239.98507%2C151.9808 a 111.98507%2C39.994664 0 0 1 -55.99253%2C34.6364 111.98507%2C39.994664 0 0 1 -111.985079%2C-1e-5 A 111.98507%2C39.994664 0 0 1 16.01493%2C151.9808\"%2F%3E%3Cpath d=\"m 239.98507%2C103.9872 a 111.98507%2C39.994664 0 0 1 -55.99253%2C34.6364 111.98507%2C39.994664 0 0 1 -111.985079%2C0 111.98507%2C39.994664 0 0 1 -55.992531%2C-34.6364\"%2F%3E%3Cpath d=\"M 16.01493%2C55.99377 V 199.97441\"%2F%3E%3Cpath d=\"M 239.98507%2C55.993592 V 199.97441\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            }, {
                name: "网页存档查询",
                url: "https://web.archive.org/web/*/%u",
                icon: "https://web.archive.org/_static/images/archive.ico"
            }, {
                name: "存档当前网页",
                url: "https://web.archive.org/save/%u",
                icon: "https://web.archive.org/_static/images/archive.ico"
            }, {
                name: "编辑当前网页",
                url: "javascript:(function(){document.body.setAttribute('contenteditable', 'true');alert('已开启网页编辑，按ESC键取消');document.onkeydown = function (e) {e = e || window.event;if(e.keyCode==27){document.body.setAttribute('contenteditable', 'false');}}})();"
            }, {
                name: "万能命令",
                url: "https://wn.run/%u"
            }, {
                name: "当前网址-草料",
                url: "https://cli.im/url#p{#url_content=%u&click(#click-create)}"
            } ]
        }
    ];
    searchData.prefConfig = {
        position: {
            x: "left",
            y: "top"
        },
        offset: {
            x: "0",
            y: "0"
        },
        openInNewTab: false,
        enableInPage: true,
        altKey: false,
        ctrlKey: true,
        shiftKey: false,
        metaKey: false,
        autoClose: false,
        autoDelay: 1000,
        shortcut: true,
        initShow: false,
        customSize: 100,
        typeOpenTime: 250,
        longPressTime: 500,
        noIcons: false,
        showSiteLists: true,
        alwaysShowSiteLists: false,
        cacheSwitch: false,
        noAni: false,
        quickAddRule: true,
        multiline: 2,//0 关闭 1 开启 2 询问
        multilineGap: 1000,
        historyLength: 0,
        dragToSearch: true,
        hideDragHistory: false,
        sortType: false,
        autoHide: false,
        autoHideAll: false,
        showCurrent: true,
        shortcutKey: '`',
        showInSearchEngine: false,
        showInSearchJumpPage: true,
        limitInPageLen: 1,
        ignoreWords: ["a", "in", "into", "the", "to", "on", "among", "between", "and", "an", "of", "by", "with", "about", "under"],
        inPageRule: {},
        firstFiveWordsColor: [],
        inPageWordsStyles: [],
        altToHighlight: true,
        defaultPicker: false,
        disableInputOnWords: false,
        callBarAlt: false,
        callBarCtrl: false,
        callBarShift: false,
        callBarMeta: false,
        defaultFindTab: false,
        disableAutoOpen: false,
        hideOnSearchEngine: false,
        minSizeMode: false,
        hidePopup: false,
        minPopup: false
    };
    function run() {
        const lang = navigator.appName == "Netscape" ? navigator.language : navigator.userLanguage;
        let config = {};
        switch (lang) {
            case "zh-CN":
            case "zh-SG":
                config = {
                    scriptName: '搜索酱',
                    import: '导入',
                    filter: '筛选',
                    selectAll: '全选',
                    importOrNot: '是否导入配置？',
                    settings: '配置脚本',
                    batchOpen: '批量打开',
                    batchOpenConfirm: '确定要批量打开吗？',
                    postOver: '发送成功：',
                    postError: '发送失败：',
                    keywords: '请输入搜索词',
                    targetUrl: '请输入搜索URL',
                    siteName: '站名',
                    siteDesc: '描述',
                    siteUrl: '地址',
                    siteIcon: '图标',
                    siteTest: '测试',
                    siteCancel: '取消',
                    siteAdd: '添加',
                    siteType: '分类',
                    siteExist: '已存在相同规则，终止添加',
                    siteAddOver: '站点添加成功',
                    multiline: '是否以换行符分隔多行搜索？',
                    multilineTooMuch: '行数超过10行，是否继续搜索？',
                    inputPlaceholder: '输入关键词筛选站点，支持 * ? 通配符，$代表末尾，^代表开头，类别**站点 可筛选指定类别，例如【图片**baidu】，tab 下一项',
                    inputKeywords: '输入搜索关键词',
                    inPageTips: '自定义分隔符：$c 加分隔符，例如 $c| search | jumper，默认空格作为分隔符\n原始文本不分隔：$o 加文本，例如$oopai liked by hero\n正则表达式：/re/，例如 $c, /google/i , /aPPle/\n添加提示文本：搜索文本$t{提示文本}，例如 linux$t{linux is not unix}\n添加自定义样式：搜索文本$s{背景;其他}，例如 google$s{#333333;color:red;}\n左键点击关键词跳转至下一个，右键点击关键词跳转至上一个',
                    inPagePlaceholder: '输入文字，按下回车进行页内查找',
                    pickerBtn: '抓取元素',
                    editBtn: '编辑查找文字',
                    emptyBtn: '清空查找文字',
                    copyInPageBtn: '复制查找文字',
                    copyEleBtn: '复制选中元素',
                    maxEleBtn: '展开选中元素',
                    minEleBtn: '收起选中元素',
                    expandAll: '全部展开',
                    collapseAll: '全部合起',
                    rename: '重命名',
                    recoverBtn: '恢复查找文字',
                    pinBtn: '固定查找文字',
                    locBtn: '定位侧边栏',
                    filterSites: '筛选搜索引擎',
                    searchInPage: '页内查找',
                    removeBtn: '移除搜索词',
                    saveRuleBtn: '保存当前站点的搜索词',
                    wordContent: '搜索词内容',
                    wordHide: '隐藏父级元素',
                    wordHideTips: '元素深度，0为当前父级',
                    wordStyle: '搜索词样式',
                    wordTitle: '搜索词注释',
                    modify: '修改',
                    cancel: '取消',
                    modifyWord: '修改页内搜索词',
                    addSearchEngine: '添加搜索引擎',
                    expand: '展开剩余站点',
                    add: '添加',
                    addWord: '添加新词语',
                    wordRange: '生效范围',
                    customInputFrame: '自定义搜索参数',
                    customSubmit: '提交搜索',
                    finalSearch: '目标搜索字串',
                    search: '搜索此项',
                    siteKeywords: '关键词',
                    siteMatch: '站点 URL 匹配',
                    openSelect: '打开选项',
                    openInDefault: '默认',
                    openInNewTab: '新标签页打开',
                    openInCurrent: '当前页打开',
                    currentType: '当前分类',
                    maxAddSiteBtn: '最大化',
                    minAddSiteBtn: '还原'
                };
                break;
            case "zh-TW":
            case "zh-HK":
                config = {
                    scriptName: "搜索醬",
                    import: '導入',
                    filter: '篩選',
                    selectAll: '全選',
                    importOrNot: '是否導入配置？',
                    settings: '配置脚本',
                    batchOpen: '批量打開',
                    batchOpenConfirm: '確定要批量打開嗎？',
                    postOver: '發送成功：',
                    postError: '發送失敗：',
                    keywords: '請輸入搜索詞',
                    targetUrl: '請輸入搜索URL',
                    siteName: '站名',
                    siteDesc: '描述',
                    siteUrl: '地址',
                    siteIcon: '圖標',
                    siteTest: '測試',
                    siteCancel: '取消',
                    siteAdd: '添加',
                    siteType: '分類',
                    siteExist: '已存在相同規則，終止添加',
                    siteAddOver: '站點添加成功',
                    multiline: '是否以換行符分隔多行搜索？',
                    multilineTooMuch: '行數超過10行，是否繼續搜索？',
                    inputPlaceholder: '輸入關鍵詞篩選站點，支持 * ? 通配符，$代表末尾，^代表開頭，類別**站點 可篩選指定類別，例如【圖片**goo】，tab 下一項',
                    inputKeywords: '輸入搜索關鍵詞',
                    inPageTips: '自定義分隔符：$c 加分隔符，例如 $c| search | jumper，默認空格作為分隔符\n原始文本不分隔：$o 加文本，例如$oopai liked by hero\n正則表達式：/re/，例如 $c, /google/i , /aPPle/\n添加提示文本：搜索文本$t{提示文本}，例如 linux$t{linux is not unix}\n添加自定義樣式：搜索文本$s{背景;其他}，例如 google$s{#333333;color:red;}\n左鍵點擊關鍵詞跳轉至下一個，右鍵點擊關鍵詞跳轉至上一個',
                    inPagePlaceholder: '輸入文字，按下回車進行頁內查找',
                    pickerBtn: '抓取元素',
                    editBtn: '編輯查找文字',
                    emptyBtn: '清空查找文字',
                    copyInPageBtn: '複製查找文字',
                    copyEleBtn: '複製選中元素',
                    maxEleBtn: '展開選中元素',
                    minEleBtn: '收起選中元素',
                    expandAll: '全部展開',
                    collapseAll: '全部合起',
                    rename: '重命名',
                    recoverBtn: '恢復查找文字',
                    pinBtn: '固定查找文字',
                    locBtn: '定位側邊欄',
                    filterSites: '篩選搜尋引擎',
                    searchInPage: '頁內查找',
                    removeBtn: '移除搜索詞',
                    saveRuleBtn: '保存當前站點的搜索詞',
                    wordContent: '搜索詞內容',
                    wordHide: '隱藏父級元素',
                    wordHideTips: '元素深度，0為當前父級',
                    wordStyle: '搜索詞樣式',
                    wordTitle: '搜索詞注釋',
                    modify: '修改',
                    cancel: '取消',
                    modifyWord: '修改頁內搜索詞',
                    addSearchEngine: '添加搜尋引擎',
                    expand: '展開剩餘站點',
                    add: '添加',
                    addWord: '添加新詞語',
                    wordRange: '生效範圍',
                    customInputFrame: '自定義搜索參數',
                    customSubmit: '提交搜索',
                    finalSearch: '目標搜尋字串',
                    search: '搜索此項',
                    siteKeywords: '關鍵詞',
                    siteMatch: '站點 URL 匹配',
                    openSelect: '打開選項',
                    openInDefault: '默認',
                    openInNewTab: '新標籤頁打開',
                    openInCurrent: '當前頁打開',
                    currentType: '當前分類',
                    maxAddSiteBtn: '最大化',
                    minAddSiteBtn: '還原'
                };
                break;
            default:
                config = {
                    scriptName: "SearchJumper",
                    import: 'Import',
                    filter: 'Filter',
                    selectAll: 'SelectAll',
                    importOrNot: 'Do you want to import this config?',
                    settings: 'Settings',
                    batchOpen: 'Batch open',
                    batchOpenConfirm: 'Batch open urls?',
                    postOver: 'Post over: ',
                    postError: 'Post fail: ',
                    keywords: 'Input keywords',
                    targetUrl: 'Input URL',
                    siteName: 'Site Name',
                    siteDesc: 'Description',
                    siteUrl: 'Site Url',
                    siteIcon: 'Site Icon',
                    siteTest: 'Test',
                    siteCancel: 'Cancel',
                    siteAdd: 'Add',
                    siteType: 'Category',
                    siteExist: 'Abort as the site is already exist',
                    siteAddOver: 'Site added successfully',
                    multiline: 'Search as multilines?',
                    multilineTooMuch: 'The number of lines exceeds 10, do you want to continue searching?',
                    inputPlaceholder: 'Enter keywords to filter sites, support * ? wildcards, $ means end, ^ means start, type name**site name to filter type like "image**google", tab to next ',
                    inputKeywords: 'Enter search keywords',
                    inPageTips: 'Custom delimiter: $c + delimiter, such as $c| search | jumper, space as delimiter by default\nOriginal text without delimited: $o + text, such as $oopai liked by hero\nRegular expression: /re/, such as $c, /google/i , /aPPle/\nTips text: search text$t{tips text}, such as linux$t{linux is not unix}\nCustom style: Search text$s{background;other}, such as google$s{#333333;color:red;}\nLeft-click keyword to jump to the next, right-click keyword to jump to the previous',
                    inPagePlaceholder: 'Input text, press Enter to find in the page',
                    pickerBtn: 'Pick a element',
                    editBtn: 'Edit search text',
                    emptyBtn: 'Empty search text',
                    copyInPageBtn: 'Copy search text',
                    copyEleBtn: 'Copy selected elements',
                    maxEleBtn: 'Expand selected elements',
                    minEleBtn: 'Collapse selected elements',
                    expandAll: 'Expand All',
                    collapseAll: 'Collapse All',
                    rename: 'Rename',
                    recoverBtn: 'Recover find text',
                    pinBtn: 'Pin search text',
                    locBtn: 'Sidebar to locate',
                    filterSites: 'Filter search engines',
                    searchInPage: 'Find in page',
                    removeBtn: 'Remove search term',
                    saveRuleBtn: 'Save the search term of the current site',
                    wordContent: 'Search word content',
                    wordHide: 'Hide parent element',
                    wordHideTips: 'Element depth, 0 means the current',
                    wordStyle: 'Search word style',
                    wordTitle: 'Search word annotation',
                    modify: 'Modify',
                    cancel: 'Cancel',
                    modifyWord: 'Modify search word',
                    addSearchEngine: 'Add search engine',
                    expand: 'Expand other sites',
                    add: 'Add',
                    addWord: 'Add new word',
                    wordRange: 'Effective range',
                    customInputFrame: 'Custom search parameters',
                    customSubmit: 'Submit',
                    finalSearch: 'Target search string',
                    search: 'Search this',
                    siteKeywords: 'Keywords',
                    siteMatch: 'Match site URL',
                    openSelect: 'Open option',
                    openInDefault: 'Default',
                    openInNewTab: 'Open a new tab',
                    openInCurrent: 'Open in current',
                    currentType: 'Current',
                    maxAddSiteBtn: 'Maximize',
                    minAddSiteBtn: 'Restore'
                };
                break;
        }
        var i18n = (name, param) => {
            return config[name] ? config[name].replace("#t#",param) : name;
        };
        const isMobile = ('ontouchstart' in document.documentElement);
        var enableDebug = true;
        var debug = str => {
            if(enableDebug) {
                console.log(
                    `%c【SearchJumper v.${_GM_info.script.version}】 debug`,
                    'color: yellow;font-size: large;font-weight: bold;',
                    str
                );
            }
        };

        var _GM_xmlhttpRequest, _GM_registerMenuCommand, _GM_notification, _GM_setClipboard, _GM_openInTab, _GM_addStyle, _GM_info;
        if (typeof GM_xmlhttpRequest != 'undefined') {
            _GM_xmlhttpRequest = GM_xmlhttpRequest;
        } else if (typeof GM != 'undefined' && typeof GM.xmlHttpRequest != 'undefined') {
            _GM_xmlhttpRequest = GM.xmlHttpRequest;
        } else {
            _GM_xmlhttpRequest = (f) => {fetch(f.url).then(response => response.text()).then(data => {let res = {response: data};f.onload(res)}).catch(f.onerror())};
        }
        if (typeof GM_registerMenuCommand != 'undefined') {
            _GM_registerMenuCommand = GM_registerMenuCommand;
        } else if (typeof GM != 'undefined' && typeof GM.registerMenuCommand != 'undefined') {
            _GM_registerMenuCommand = GM.registerMenuCommand;
        } else {
            _GM_registerMenuCommand = (s, f) => {};
        }
        if (typeof GM_openInTab != 'undefined') {
            _GM_openInTab = GM_openInTab;
        } else if (typeof GM != 'undefined' && typeof GM.openInTab != 'undefined') {
            _GM_openInTab = GM.openInTab;
        } else {
            _GM_openInTab = (s, t) => {window.open(s)};
        }
        if (typeof GM_notification != 'undefined') {
            _GM_notification = s => GM_notification({text: s, onclick: e => _GM_openInTab(configPage, {active: true})});
        } else if (typeof GM != 'undefined' && typeof GM.notification != 'undefined') {
            _GM_notification = s => GM.notification({text: s, onclick: e => _GM_openInTab(configPage, {active: true})});
        } else {
            _GM_notification = (s) => {alert(s)};
        }
        if (typeof GM_setClipboard != 'undefined') {
            _GM_setClipboard = GM_setClipboard;
        } else if (typeof GM != 'undefined' && typeof GM.setClipboard != 'undefined') {
            _GM_setClipboard = GM.setClipboard;
        } else {
            _GM_setClipboard = (s, i) => {};
        }
        if (typeof GM_addStyle != 'undefined') {
            _GM_addStyle = GM_addStyle;
        } else if (typeof GM != 'undefined' && typeof GM.addStyle != 'undefined') {
            _GM_addStyle = GM.addStyle;
        } else {
            _GM_addStyle = cssStr => {
                let styleEle = document.createElement("style");
                styleEle.innerHTML = cssStr;
                document.head.appendChild(styleEle);
                return styleEle;
            };
        }
        if (typeof GM_info != 'undefined') {
            _GM_info = GM_info;
        } else if (typeof GM != 'undefined' && typeof GM.info != 'undefined') {
            _GM_info = GM.info;
        } else {
            _GM_info = { script:1 };
        }
        var _unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
        var storage = {
            supportGM: typeof GM_getValue == 'function' && typeof GM_getValue('a', 'b') != 'undefined',
            supportGMPromise: typeof GM != 'undefined' && typeof GM.getValue == 'function' && typeof GM.getValue('a','b') != 'undefined',
            mxAppStorage: (function() {
                try {
                    return window.external.mxGetRuntime().storage;
                } catch(e) {
                }
            })(),
            operaUJSStorage: (function() {
                try {
                    return window.opera.scriptStorage;
                } catch(e) {
                }
            })(),
            setItem: function (key, value) {
                if (this.supportGM) {
                    GM_setValue(key, value);
                    if(value === "" && typeof GM_deleteValue != 'undefined'){
                        GM_deleteValue(key);
                    }
                } else if (this.supportGMPromise) {
                    GM.setValue(key, value);
                    if(value === "" && typeof GM != 'undefined' && typeof GM.deleteValue != 'undefined'){
                        GM.deleteValue(key);
                    }
                } else if (this.operaUJSStorage) {
                    this.operaUJSStorage.setItem(key, value);
                } else if (this.mxAppStorage) {
                    this.mxAppStorage.setConfig(key, value);
                } else if (window.localStorage) {
                    window.localStorage.setItem(key, value);
                }
            },
            getItem: function (key, cb) {
                var value;
                if (this.supportGM) {
                    value = GM_getValue(key);
                } else if (this.supportGMPromise) {
                    value = GM.getValue(key).then(v=>{cb(v)});
                    return;
                } else if (this.operaUJSStorage) {
                    value = this.operaUJSStorage.getItem(key);
                } else if (this.mxAppStorage) {
                    value = this.mxAppStorage.getConfig(key);
                } else if (window.localStorage) {
                    value = window.localStorage.getItem(key);
                };
                cb(value);
            }
        };
        var escapeHTMLPolicy;
        if (_unsafeWindow.trustedTypes && _unsafeWindow.trustedTypes.createPolicy) {
            escapeHTMLPolicy = _unsafeWindow.trustedTypes.createPolicy('default', {
                createHTML: (string, sink) => string
            });
        }

        if (typeof String.prototype.replaceAll != 'function') {
            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };
        }
        if (typeof String.prototype.endsWith != 'function') {
            String.prototype.endsWith = function(search, this_len) {
                if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                }
                return this.substring(this_len - search.length, this_len) === search;
            };
        }
        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function(search, pos){
                return this.slice(pos || 0, search.length) === search;
            };
        }

        function createHTML(html = "") {
            return escapeHTMLPolicy ? escapeHTMLPolicy.createHTML(html) : html;
        }

        function getElementByXpath(xpath, contextNode, doc) {
            doc = doc || document;
            contextNode = contextNode || doc;
            try {
                var result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
            } catch (err) {
                throw new Error(`Invalid xpath: ${xpath}`);
            }
        }

        function isXPath(xpath) {
            if (!xpath) return false;
            return /^\(*(descendant::|\.\/|\/\/|id\()/.test(xpath);
        }

        function getElement(sel, doc) {
            if (!doc) doc = document;
            try {
                if (!isXPath(sel)) {
                    return doc.querySelector(sel);
                }
            } catch(e) {
                debug(e);
            }
            return getElementByXpath(sel, doc, doc);
        }

        function getElementTop(ele) {
            var actualTop = ele.offsetTop;
            var current = ele.offsetParent;
            while (current) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            if (ele.ownerDocument != document) {
                let iframes = document.getElementsByTagName("iframe");
                for (let i = 0; i < iframes.length; i++) {
                    let iframe = iframes[i];
                    let iframeDoc;
                    try {
                        iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    } catch(e) {
                        break;
                    }
                    if (iframeDoc == ele.ownerDocument) {
                        current = iframe;
                        while (current) {
                            actualTop += current.offsetTop;
                            current = current.offsetParent;
                        }
                        break;
                    }
                }
            }
            return actualTop;
        }

        function getElementLeft(ele) {
            var actualLeft = ele.offsetLeft;
            var current = ele.offsetParent;
            while (current) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            if (ele.ownerDocument != document) {
                let iframes = document.getElementsByTagName("iframe");
                for (let i = 0; i < iframes.length; i++) {
                    let iframe = iframes[i];
                    let iframeDoc;
                    try {
                        iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    } catch(e) {
                        break;
                    }
                    if (iframeDoc == ele.ownerDocument) {
                        current = iframe;
                        while (current) {
                            actualLeft += current.offsetLeft;
                            current = current.offsetParent;
                        }
                        break;
                    }
                }
            }
            return actualLeft;
        }

        function waitForFontAwesome(callback) {
            var retries = 50;
            var text = '\uf0c8';
            var checkReady = function() {
                var canvas, context;
                retries -= 1;
                canvas = document.createElement('canvas');
                canvas.width = 20;
                canvas.height = 20;
                context = canvas.getContext('2d');
                context.fillStyle = 'rgba(0,0,0,1.0)';
                context.fillRect( 0, 0, 20, 20 );
                context.font = '16pt FontAwesome';
                context.textAlign = 'center';
                context.fillStyle = 'rgba(255,255,255,1.0)';
                context.fillText(text, 10, 18 );
                var data = context.getImageData( 2, 10, 1, 1 ).data;
                if ( data[0] == 0 && data[1] == 0 && data[2] == 0 ) {
                    context.font = '16pt "Font Awesome 6 Free"';
                    context.fillText(text, 10, 18 );
                    data = context.getImageData( 2, 10, 1, 1 ).data;
                    if ( data[0] == 0 && data[1] == 0 && data[2] == 0 ) {
                        if ( retries > 0 ) {
                            setTimeout( checkReady, 150 );
                        }
                    } else if ( typeof callback === 'function' ) {
                        callback();
                    }
                } else {
                    if ( typeof callback === 'function' ) {
                        callback();
                    }
                }
            }

            setTimeout( checkReady, 100 );
        }

        var logoBtn, searchBar, searchTypes = [], currentSite = false, cacheKeywords, localKeywords, lastSign, inPagePostParams, cacheIcon, historySites, sortTypeNames, cachePool = [], cacheFontPool = [], currentFormParams, globalInPageWords, navEnable, referrer, lastAddType;
        var logoBtnSvg = `<svg class="search-jumper-logoBtnSvg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><title>${i18n("scriptName")}</title><path d="M.736 510.464c0-281.942 228.335-510.5 510-510.5 135.26 0 264.981 53.784 360.625 149.522 95.643 95.737 149.375 225.585 149.375 360.978 0 281.94-228.335 510.5-510 510.5-281.665 0-510-228.56-510-510.5zm510-510.5v1021m-510-510.5h1020" fill="#fefefe"/><path d="M237.44 346.624a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0zM699.904 346.624a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0zM423.296 759.296c-64 0-115.712-52.224-115.712-115.712 0-26.624 9.216-52.224 25.6-72.704 9.216-11.776 26.112-13.312 37.888-4.096s13.312 26.112 4.096 37.888c-9.216 11.264-13.824 24.576-13.824 38.912 0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-4.096-.512-8.192-1.024-11.776-2.56-14.848 6.656-28.672 21.504-31.744 14.848-2.56 28.672 6.656 31.744 21.504 1.536 7.168 2.048 14.336 2.048 22.016-.512 63.488-52.224 115.712-116.224 115.712z" fill="#333"/><path d="M602.08 760.296c-64 0-115.712-52.224-115.712-115.712 0-14.848 12.288-27.136 27.136-27.136s27.136 12.288 27.136 27.136c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-15.36-5.632-30.208-15.872-41.472-9.728-11.264-9.216-28.16 2.048-37.888 11.264-9.728 28.16-9.216 37.888 2.048 19.456 21.504 29.696 48.64 29.696 77.824 0 62.976-52.224 115.2-116.224 115.2z" fill="#333"/><ellipse ry="58" rx="125" cy="506.284" cx="201.183" fill="#faf"/><ellipse ry="58" rx="125" cy="506.284" cx="823.183" fill="#faf"/></svg>`;
        var logoBase64 = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic2VhcmNoLWp1bXBlci1sb2dvQnRuU3ZnIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uNzM2IDUxMC40NjRjMC0yODEuOTQyIDIyOC4zMzUtNTEwLjUgNTEwLTUxMC41IDEzNS4yNiAwIDI2NC45ODEgNTMuNzg0IDM2MC42MjUgMTQ5LjUyMiA5NS42NDMgOTUuNzM3IDE0OS4zNzUgMjI1LjU4NSAxNDkuMzc1IDM2MC45NzggMCAyODEuOTQtMjI4LjMzNSA1MTAuNS01MTAgNTEwLjUtMjgxLjY2NSAwLTUxMC0yMjguNTYtNTEwLTUxMC41em01MTAtNTEwLjV2MTAyMW0tNTEwLTUxMC41aDEwMjAiIGZpbGw9IiNmZWZlZmUiLz48cGF0aCBkPSJNMjM3LjQ0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek02OTkuOTA0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek00MjMuMjk2IDc1OS4yOTZjLTY0IDAtMTE1LjcxMi01Mi4yMjQtMTE1LjcxMi0xMTUuNzEyIDAtMjYuNjI0IDkuMjE2LTUyLjIyNCAyNS42LTcyLjcwNCA5LjIxNi0xMS43NzYgMjYuMTEyLTEzLjMxMiAzNy44ODgtNC4wOTZzMTMuMzEyIDI2LjExMiA0LjA5NiAzNy44ODhjLTkuMjE2IDExLjI2NC0xMy44MjQgMjQuNTc2LTEzLjgyNCAzOC45MTIgMCAzNC4zMDQgMjcuNjQ4IDYxLjk1MiA2MS45NTIgNjEuOTUyczYxLjk1Mi0yNy42NDggNjEuOTUyLTYxLjk1MmMwLTQuMDk2LS41MTItOC4xOTItMS4wMjQtMTEuNzc2LTIuNTYtMTQuODQ4IDYuNjU2LTI4LjY3MiAyMS41MDQtMzEuNzQ0IDE0Ljg0OC0yLjU2IDI4LjY3MiA2LjY1NiAzMS43NDQgMjEuNTA0IDEuNTM2IDcuMTY4IDIuMDQ4IDE0LjMzNiAyLjA0OCAyMi4wMTYtLjUxMiA2My40ODgtNTIuMjI0IDExNS43MTItMTE2LjIyNCAxMTUuNzEyeiIgZmlsbD0iIzMzMyIvPjxwYXRoIGQ9Ik02MDIuMDggNzYwLjI5NmMtNjQgMC0xMTUuNzEyLTUyLjIyNC0xMTUuNzEyLTExNS43MTIgMC0xNC44NDggMTIuMjg4LTI3LjEzNiAyNy4xMzYtMjcuMTM2czI3LjEzNiAxMi4yODggMjcuMTM2IDI3LjEzNmMwIDM0LjMwNCAyNy42NDggNjEuOTUyIDYxLjk1MiA2MS45NTJzNjEuOTUyLTI3LjY0OCA2MS45NTItNjEuOTUyYzAtMTUuMzYtNS42MzItMzAuMjA4LTE1Ljg3Mi00MS40NzItOS43MjgtMTEuMjY0LTkuMjE2LTI4LjE2IDIuMDQ4LTM3Ljg4OCAxMS4yNjQtOS43MjggMjguMTYtOS4yMTYgMzcuODg4IDIuMDQ4IDE5LjQ1NiAyMS41MDQgMjkuNjk2IDQ4LjY0IDI5LjY5NiA3Ny44MjQgMCA2Mi45NzYtNTIuMjI0IDExNS4yLTExNi4yMjQgMTE1LjJ6IiBmaWxsPSIjMzMzIi8+PGVsbGlwc2Ugcnk9IjU4IiByeD0iMTI1IiBjeT0iNTA2LjI4NCIgY3g9IjIwMS4xODMiIGZpbGw9IiNmYWYiLz48ZWxsaXBzZSByeT0iNTgiIHJ4PSIxMjUiIGN5PSI1MDYuMjg0IiBjeD0iODIzLjE4MyIgZmlsbD0iI2ZhZiIvPjwvc3ZnPg==";
        var targetElement, cssText, mainStyleEle;
        var inMinMode = false;

        class SearchBar {
            constructor() {
                this.scale = searchData.prefConfig.customSize / 100;
                cssText = `
                 #search-jumper.search-jumper-showall {
                     overflow-y: hidden;
                     pointer-events: all;
                     overscroll-behavior: contain;
                     -ms-scroll-chaining: contain;
                     flex-direction: unset;
                     max-width: unset;
                     max-height: unset;
                     text-align: center;
                     top: 0;
                     bottom: unset;
                     height: 100%;
                 }
                 #search-jumper.search-jumper-showall>.search-jumper-searchBar {
                     display: none;
                 }
                 #search-jumper.search-jumper-showall .search-jumper-showallInput {
                     background-color: #212022;
                     color: white;
                     border: none;
                     font-size: 20px;
                     height: 40px;
                     margin-bottom: 0;
                     padding: 5px;
                     margin: 0 10px;
                     box-shadow: #333 0px 0px 2px;
                     outline: none;
                     box-sizing: border-box;
                     cursor: text;
                     user-select: none;
                     -webkit-user-select: none;
                     -moz-user-select: none;
                     -khtml-user-select: none;
                     -ms-user-select: none;
                     position: fixed;
                     width: 50%;
                     left: 25%;
                     top: 1%;
                     border-radius: 10px;
                     box-shadow: 0px 0px 10px 0px #7a7a7a;
                 }
                 #search-jumper.search-jumper-showall #search-jumper-alllist>.sitelist {
                     visibility: visible!important;
                     opacity: 1;
                     pointer-events: all;
                     text-align: left;
                     position: static;
                     display: block!important;
                     height: fit-content;
                     max-height: calc(100vh - 120px);
                 }
                 #search-jumper.search-jumper-showall #search-jumper-alllist>.sitelist>.sitelistCon {
                     opacity: 1;
                 }
                 #search-jumper.search-jumper-showall #search-jumper-alllist>.sitelist>.sitelistCon>p {
                     pointer-events: all;
                     cursor: pointer;
                 }
                 #search-jumper.search-jumper-showall #search-jumper-alllist>.sitelist:hover {
                     z-index: 1;
                 }
                 #search-jumper.search-jumper-showall.search-jumper-searchBarCon {
                     -ms-overflow-style: unset;
                     scrollbar-width: unset;
                 }
                 #search-jumper-alllist {
                     width: fit-content;
                     display: none;
                     top: 110px;
                     position: absolute;
                 }
                 #search-jumper-alllist>.search-jumper-btn {
                     position: fixed;
                     top: 1%;
                     right: 25%;
                     filter: drop-shadow(1px 1px 3px #00000060);
                     cursor: pointer;
                 }
                 #search-jumper-alllist>.search-jumper-btn>svg {
                     cursor: pointer;
                 }
                 .search-jumper-showallBg {
                     position: fixed;
                     left: 0;
                     top: 0;
                     width: 100%;
                     height: calc(100% - 15px);
                     z-index: -1;
                     background-color: rgba(255, 255, 255, 0.1);
                     backdrop-filter: blur(10px);
                     -webkit-backdrop-filter: blur(5px);
                 }
                 .search-jumper-historylist {
                     display: flex;
                     position: fixed;
                     width: 100%;
                     justify-content: center;
                     left: 0;
                     top: 60px;
                     background: white;
                     border-bottom: 1px solid #ddd;
                 }
                 .search-jumper-historylist>a.search-jumper-btn {
                 }
                 #search-jumper.search-jumper-showall #search-jumper-alllist {
                     display: flex;
                     min-width: 100%;
                     justify-content: center;
                 }
                 .search-jumper-searchBarCon {
                     all: unset;
                     position: fixed;
                     top: 0;
                     left: 0;
                     width: 100%;
                     z-index: 2147483646;
                     pointer-events: none;
                     text-align: center;
                     overflow: scroll;
                     display: block;
                     -ms-overflow-style: none;
                     scrollbar-width: none;
                     box-sizing: border-box;
                     z-index: 2147483647;
                     user-select: none;
                 }
                 .search-jumper-searchBar {
                     overflow-wrap: break-word;
                     background: #505050;
                     border-radius: ${this.scale * 21}px!important;
                     border: 1px solid #b3b3b3;
                     display: inline-flex;
                     pointer-events: all;
                     margin-top: -${this.scale * 25}px;
                     opacity: 0.3;
                     vertical-align: top;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-top 1s ease, margin-left 1s, right 1s, opacity 1s, transform 1s;"}
                     user-select: none;
                     text-align: center;
                     position: relative;
                     box-sizing: border-box;
                 }
                 .search-jumper-searchBarCon:not(.search-jumper-showall)::-webkit-scrollbar {
                     width: 0 !important;
                     height: 0 !important;
                 }
                 .search-jumper-searchBarCon.search-jumper-scroll {
                     pointer-events: all;
                     overscroll-behavior: contain;
                     -ms-scroll-chaining: contain;
                 }
                 .search-jumper-scroll.search-jumper-bottom {
                     overflow-y: hidden;
                 }
                 .search-jumper-scroll>.search-jumper-searchBar {
                     position: static !important;
                 }
                 .search-jumper-scroll.search-jumper-right>.search-jumper-searchBar {
                     position: absolute !important;
                     top: 0;
                 }
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar {
                     margin-top: 0px;
                 }
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar:hover,
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar.initShow,
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar.funcKeyCall,
                 #search-jumper.in-input.search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar {
                     margin-top: 0px;
                 }
                 .search-jumper-searchBar:hover {
                     margin-top: 0;
                     opacity: 1;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-top 0.25s ease, margin-left 0.25s, right 0.25s, opacity 0.25s, transform 0.25s;"}
                 }
                 .search-jumper-searchBar.initShow {
                     margin-top: 0;
                     opacity: 0.8;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-top 0.25s ease, margin-left 0.25s, right 0.25s, opacity 0.25s, transform 0.25s;"}
                 }
                 .search-jumper-searchBar.initShow.funcKeyCall {
                     ${searchData.prefConfig.noAni ? "" : "transition:opacity 0.5s ease-out;"}
                 }
                 .search-jumper-searchBar.funcKeyCall {
                     background: none;
                     border: none;
                     max-width: unset!important;
                     ${searchData.prefConfig.minPopup && !searchData.prefConfig.noAni ? 'transition: transform 0.25s ease;' : ''}
                     ${searchData.prefConfig.minPopup ? 'transform: scale(0.7);' : ''}
                 }
                 .search-jumper-searchBar.funcKeyCall:hover {
                     ${searchData.prefConfig.minPopup ? 'transform: scale(1);' : ''}
                 }
                 .in-input>.search-jumper-searchBar,
                 .search-jumper-searchBar.funcKeyCall {
                     opacity: 1;
                     display: inline-flex!important;
                 }
                 #search-jumper>.search-jumper-searchBar.funcKeyCall>.search-jumper-type {
                     height: ${searchData.prefConfig.minPopup ? '24px' : 'auto'}!important;
                     width: ${searchData.prefConfig.minPopup ? 24 : (240 * this.scale)}px!important;
                     max-width: unset;
                     max-height: ${108 * this.scale + 10}px;
                     flex-wrap: wrap!important;
                     flex-direction: row;
                     padding: 5px;
                     box-shadow: #000000 0px 0px 10px;
                     overflow: auto;
                     scrollbar-width: none;
                     overscroll-behavior: contain;
                     -ms-scroll-chaining: contain;
                     transition: none;
                     background: #d0d0d0d0;
                 }
                 #search-jumper>.funcKeyCall>.search-jumper-type>.sitelist {
                     display: none;
                 }
                 #search-jumper>.search-jumper-searchBar.funcKeyCall>.search-jumper-type>a.search-jumper-btn {
                     ${searchData.prefConfig.minPopup ? 'visibility: hidden;' : ''}
                 }
                 #search-jumper>.search-jumper-searchBar.funcKeyCall>.search-jumper-type:hover>a.search-jumper-btn {
                     ${searchData.prefConfig.minPopup ? 'visibility: visible;' : ''}
                 }
                 #search-jumper>.search-jumper-searchBar.funcKeyCall>.search-jumper-type:hover {
                     height: auto!important;
                     width: ${240 * this.scale}px!important;
                 }
                 #search-jumper>.search-jumper-searchBar.funcKeyCall>.search-jumper-type::-webkit-scrollbar {
                     width: 0 !important;
                     height: 0 !important;
                 }
                 .search-jumper-left,
                 .search-jumper-left .search-jumper-type,
                 .search-jumper-left>.search-jumper-searchBar,
                 .search-jumper-right,
                 .search-jumper-right .search-jumper-type,
                 .search-jumper-right>.search-jumper-searchBar {
                     flex-direction: column;
                     max-width: ${42 * this.scale}px;
                     max-height: unset;
                 }
                 .search-jumper-left {
                     height: 100%;
                     text-align: initial;
                 }
                 .search-jumper-right {
                     left: unset;
                     right: 0;
                     height: 100%;
                 }
                 .searchJumperExpand {
                     opacity: 0.8;
                 }
                 .searchJumperExpand:hover {
                     opacity: 1;
                 }
                 .searchJumperExpand>svg {
                     transform: rotate(-90deg);
                     border-radius: 20px;
                     filter: drop-shadow(0px 0px 2px black);
                     width: unset;
                     height: unset;
                     color: black;
                 }
                 .search-jumper-type:not(.search-jumper-hide)>span.search-jumper-word {
                     filter: drop-shadow(0px 0px 2px black);
                 }
                 .search-jumper-left .searchJumperExpand>svg,
                 .search-jumper-right .searchJumperExpand>svg {
                     transform: unset;
                 }
                 .search-jumper-bottom {
                     top: unset;
                     bottom: 0;
                     height: ${this.scale * 43}px;
                     max-height: ${this.scale * 43}px;
                     overflow-y: hidden;
                 }
                 .search-jumper-left>.search-jumper-searchBar {
                     margin-top: 0;
                     margin-left: -${this.scale * 20}px;
                 }
                 .search-jumper-right>.search-jumper-searchBar {
                     margin-top: 0;
                     right: -${this.scale * 20}px;
                     position: fixed;
                 }
                 .search-jumper-left>.search-jumper-searchBar:hover,
                 .search-jumper-left>.search-jumper-searchBar.initShow,
                 .search-jumper-left>.search-jumper-searchBar.funcKeyCall,
                 #search-jumper.in-input.search-jumper-left>.search-jumper-searchBar {
                     margin-top: unset;
                     margin-left: 0;
                 }
                 .search-jumper-right>.search-jumper-searchBar:hover,
                 .search-jumper-right>.search-jumper-searchBar.initShow,
                 .search-jumper-right>.search-jumper-searchBar.funcKeyCall,
                 #search-jumper.in-input.search-jumper-right>.search-jumper-searchBar {
                     margin-top: unset;
                     right: 0;
                 }
                 .search-jumper-bottom>.search-jumper-searchBar {
                     position: relative;
                     margin-top: 0px;
                     vertical-align: bottom;
                 }
                 .search-jumper-bottom>.search-jumper-searchBar:hover,
                 .search-jumper-bottom>.search-jumper-searchBar.initShow,
                 .search-jumper-bottom>.search-jumper-searchBar.funcKeyCall,
                 #search-jumper.in-input.search-jumper-bottom>.search-jumper-searchBar {
                     margin-top: 0px;
                 }
                 .search-jumper-btn {
                     position: relative;
                     display: grid;
                     padding: ${1 * this.scale}px;
                     margin: ${3 * this.scale}px;
                     cursor: pointer;
                     box-sizing: content-box;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-left 0.25s ease, width 0.25s, height 0.25s, transform 0.25s;"}
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     white-space: nowrap;
                     text-decoration:none;
                     min-width: ${32 * this.scale}px;
                     min-height: ${32 * this.scale}px;
                     filter: drop-shadow(1px 1px 3px #00000020);
                 }
                 .search-jumper-btn>img {
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                 }
                 .search-jumper-btn>b {
                     line-height: ${32 * this.scale}px;
                     letter-spacing: 0;
                     color: white;
                 }
                 .search-jumper-btn.noIcon>b {
                     color: #f6e9d2;
                 }
                 .search-jumper-btn.noIcon:hover>b {
                     color: wheat;
                 }
                 .search-jumper-btn>div {
                     position: absolute;
                     width: 100%;
                     height: 100%;
                     line-height: ${32 * this.scale}px;
                     background: black;
                     border-radius: ${20 * this.scale}px;
                     font-size: ${30 * this.scale}px;
                     color: wheat;
                     display: none;
                 }
                 .search-jumper-isInPage .search-jumper-btn>div,
                 .search-jumper-isTargetImg .search-jumper-btn>div,
                 .search-jumper-isTargetAudio .search-jumper-btn>div,
                 .search-jumper-isTargetVideo .search-jumper-btn>div,
                 .search-jumper-isTargetLink .search-jumper-btn>div,
                 .search-jumper-isTargetPage .search-jumper-btn>div {
                     animation-name: changeOpacity;
                     animation-duration: 2.5s;
                     animation-iteration-count: infinite;
                     animation-delay: 0.1s;
                     display: block;
                     opacity: 0.1;
                 }
                 @keyframes changeOpacity {
                     0%   {opacity: 0.1;}
                     50%  {opacity: 0.6;}
                     100% {opacity: 0.1;}
                 }
                 .searchJumper-loading {
                     animation-name: changeScale;
                     animation-duration: 2.5s;
                     animation-iteration-count: infinite;
                 }
                 @keyframes changeScale {
                     0% {
                         -webkit-transform:rotate(0deg) scale(1);
                         -moz-transform:rotate(0deg) scale(1);
                         transform:rotate(0deg) scale(1);
                     }
                     50% {
                         -webkit-transform:rotate(180deg) scale(1.5);
                         -moz-transform:rotate(180deg) scale(1.5);
                         transform:rotate(180deg) scale(1.5);
                     }
                     100% {
                         -webkit-transform:rotate(360deg) scale(1);
                         -moz-transform:rotate(360deg) scale(1);
                         transform:rotate(360deg) scale(1);
                     }
                 }
                 .search-jumper-logoBtnSvg {
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                     overflow: hidden;
                     vertical-align: top;
                     cursor: grab;
                 }
                 .search-jumper-type.search-jumper-needInPage,
                 .search-jumper-type.search-jumper-targetImg,
                 .search-jumper-type.search-jumper-targetAudio,
                 .search-jumper-type.search-jumper-targetVideo,
                 .search-jumper-type.search-jumper-targetLink,
                 .search-jumper-type.search-jumper-targetPage,
                 .search-jumper-isTargetImg>.search-jumper-type,
                 .search-jumper-isTargetAudio>.search-jumper-type,
                 .search-jumper-isTargetVideo>.search-jumper-type,
                 .search-jumper-isTargetLink>.search-jumper-type,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-needInPage,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-targetImg,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-targetAudio,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-targetVideo,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-targetLink,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-targetPage,
                 .search-jumper-searchBar.search-jumper-isTargetImg:hover>.search-jumper-type,
                 .search-jumper-searchBar.search-jumper-isTargetAudio:hover>.search-jumper-type,
                 .search-jumper-searchBar.search-jumper-isTargetVideo:hover>.search-jumper-type,
                 .search-jumper-searchBar.search-jumper-isTargetLink:hover>.search-jumper-type {
                     display: none;
                 }
                 #search-jumper.in-input .search-jumper-type:not(.search-jumper-hide) {
                     width: auto!important;
                     height: auto!important;
                 }
                 #search-jumper.in-input .sitelistCon>div:not(.input-hide)>a {
                     display: flex!important;
                 }
                 #search-jumper.in-input .input-hide {
                     display: none!important;
                 }
                 #search-jumper.in-input .search-jumper-type:not(.input-hide) {
                     display: inline-flex!important;
                     flex-wrap: nowrap!important;
                 }
                 #search-jumper.in-input .search-jumper-btn:not(.input-hide) {
                     display: grid!important;
                 }
                 #search-jumper>.search-jumper-searchBar>.search-jumper-logo {
                     display: inline-flex;
                     background: unset;
                     padding: 0px;
                 }
                 #search-jumper>.search-jumper-searchBar.funcKeyCall>.search-jumper-logo {
                     display: none;
                 }
                 .search-jumper-searchBar>.search-jumper-type.search-jumper-targetAll,
                 .search-jumper-searchBar:hover>.search-jumper-type.search-jumper-targetAll {
                     display: inline-flex;
                 }
                 .search-jumper-isInPage>.search-jumper-type.search-jumper-needInPage,
                 .search-jumper-isTargetImg>.search-jumper-type.search-jumper-targetImg,
                 .search-jumper-isTargetAudio>.search-jumper-type.search-jumper-targetAudio,
                 .search-jumper-isTargetVideo>.search-jumper-type.search-jumper-targetVideo,
                 .search-jumper-isTargetLink>.search-jumper-type.search-jumper-targetLink,
                 .search-jumper-isTargetPage>.search-jumper-type,
                 .search-jumper-searchBar.search-jumper-isInPage:hover>.search-jumper-type.search-jumper-needInPage,
                 .search-jumper-searchBar.search-jumper-isTargetImg:hover>.search-jumper-type.search-jumper-targetImg,
                 .search-jumper-searchBar.search-jumper-isTargetAudio:hover>.search-jumper-type.search-jumper-targetAudio,
                 .search-jumper-searchBar.search-jumper-isTargetVideo:hover>.search-jumper-type.search-jumper-targetVideo,
                 .search-jumper-searchBar.search-jumper-isTargetLink:hover>.search-jumper-type.search-jumper-targetLink,
                 .search-jumper-searchBar.search-jumper-isTargetPage:hover>.search-jumper-type {
                     display: inline-flex;
                 }
                 .search-jumper-type,
                 .search-jumper-logo {
                     display: inline-flex;
                     box-sizing: content-box;
                     background: #d0d0d0;
                     border-radius: ${20 * this.scale}px!important;
                     overflow: hidden;
                     padding: 0.2px;
                     height: ${40 * this.scale}px;
                     width: ${40 * this.scale}px;
                     max-height: ${this.scale * 40}px;
                     min-height: ${this.scale * 40}px;
                     min-width: ${this.scale * 40}px;
                     ${searchData.prefConfig.noAni ? "" : `transition:width ${searchData.prefConfig.typeOpenTime}ms ease, height ${searchData.prefConfig.typeOpenTime}ms;`}
                 }
                 .search-jumper-right>.searchJumperNavBar {
                     right: unset;
                     left: 0;
                 }
                 .search-jumper-right>.searchJumperNavBar>#navMarks>div.navPointer {
                     right: unset;
                     left: 20px;
                     transform: rotate(180deg);
                 }
                 .search-jumper-bottom>.search-jumper-input {
                     bottom: unset;
                     top: 5%;
                 }
                 .search-jumper-type.not-expand>a:nth-of-type(10)~a {
                     display: none;
                 }
                 #search-jumper .sitelist {
                     position: fixed;
                     text-align: left;
                     background: #00000000;
                     max-height: 95vh;
                     overflow: scroll;
                     border: 0;
                     pointer-events: none;
                     opacity: 0;
                     ${searchData.prefConfig.noAni ? "" : "transition:opacity 0.25s ease;"}
                     scrollbar-width: none;
                     box-sizing: content-box;
                 }
                 #search-jumper .search-jumper-type:hover>.sitelist {
                     pointer-events: all;
                     opacity: 1;
                 }
                 #search-jumper .sitelist>.sitelistCon {
                     margin: 10px;
                     border-radius: 10px;
                     box-shadow: 0px 0px 10px 0px #7a7a7a;
                     padding: 0 0 10px 0;
                     background: white;
                     opacity: 0.9;
                     border: 0;
                 }
                 #search-jumper .sitelist>.sitelistCon:hover {
                     opacity: 1;
                 }
                 #search-jumper .sitelist::-webkit-scrollbar {
                     width: 0 !important;
                     height: 0 !important;
                 }
                 #search-jumper .sitelist>.sitelistCon>div {
                     padding: 0 10px;
                 }
                 #search-jumper .sitelist>.sitelistCon>div:hover {
                     background: #f5f7fa;
                 }
                 #search-jumper .sitelist a {
                     display: flex;
                     align-items: center;
                     text-decoration: none;
                 }
                 #search-jumper .sitelist a>img {
                     width: 20px;
                     height: 20px;
                     margin-right: 10px;
                     margin-top: unset;
                     max-width: unset;
                 }
                 #search-jumper .sitelist a>p {
                     display: inline-block;
                     font-size: 15px;
                     font-family: Arial,sans-serif;
                     line-height: 25px;
                     margin: 5px auto;
                     color: #6b6e74;
                     flex: 1;
                     text-align: left;
                     white-space: nowrap;
                 }
                 #search-jumper .sitelist>.sitelistCon>p {
                     color: #565656;
                     margin: 0;
                     text-align: center;
                     font-size: 16px;
                     font-family: Arial, sans-serif;
                     font-weight: bold;
                     background: #f6f6f6;
                     border-radius: 10px 10px 0 0;
                     overflow: hidden;
                     white-space: nowrap;
                     margin: 0 auto;
                     text-overflow: ellipsis;
                     padding: 3px 10px;
                     position: sticky;
                     top: 0;
                     pointer-events: none;
                 }
                 .search-jumper-searchBar.disable-pointer>.search-jumper-type {
                     pointer-events: none;
                 }
                 .search-jumper-word {
                     background: black;
                     color: #ffffff!important;
                     font-family: Arial, sans-serif;
                     font-weight: bold;
                     border-radius: ${20 * this.scale}px!important;
                     font-size: ${15 * this.scale}px;
                     line-height: ${32 * this.scale}px;
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                     min-width: ${32 * this.scale}px;
                     min-height: ${32 * this.scale}px;
                     letter-spacing: 0px;
                 }
                 a.search-jumper-word {
                     background: #f7f7f7d9;
                     color: #111111!important;
                     filter: drop-shadow(1px 1px 3px #00000060);
                 }
                 .search-jumper-word {
                     text-shadow: unset;
                 }
                 .search-jumper-word:hover {
                     text-shadow: 0px 0px 5px #d0d0d0;
                 }
                 .search-jumper-type img {
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                     margin-top: unset;
                 }
                 .search-jumper-tips {
                     pointer-events: none;
                     position: fixed;
                     font-size: xx-large;
                     background: #f5f5f5e0;
                     border-radius: 10px!important;
                     padding: 5px;
                     box-shadow: 0px 0px 10px 0px #000;
                     font-weight: bold;
                     ${searchData.prefConfig.noAni ? "" : "transition: all 0.2s ease;"}
                     color: black;
                     white-space: nowrap;
                     line-height: 35px;
                 }
                 .search-jumper-searchBar>.search-jumper-type.search-jumper-hide {
                     background: unset;
                     padding: 0px;
                     ${searchData.prefConfig.minSizeMode ? 'display: none;' : ''}
                 }
                 .search-jumper-searchBar:hover>.search-jumper-hide {
                     ${searchData.prefConfig.minSizeMode ? 'display: inline-flex;' : ''}
                 }
                 .search-jumper-searchBar.funcKeyCall>.search-jumper-type.search-jumper-hide {
                     display: none;
                 }
                 .search-jumper-searchBar.funcKeyCall:hover>.search-jumper-hide {
                     display: none;
                 }
                 span.search-jumper-word>img {
                     width: ${20 * this.scale}px;
                     height: ${20 * this.scale}px;
                     margin: auto;
                 }
                 .search-jumper-searchBar .search-jumper-btn.search-jumper-word:hover {
                     background: black;
                 }
                 .search-jumper-searchBar a.search-jumper-btn.search-jumper-word:hover {
                     background: white;
                 }
                 .search-jumper-btn:hover {
                     -webkit-transform:scale(1.2);
                     -moz-transform:scale(1.2);
                     transform:scale(1.2);
                     color: white;
                     text-decoration:none;
                 }
                 .search-jumper-searchBar .search-jumper-btn.current {
                     overflow: visible;
                 }
                 .search-jumper-searchBar .search-jumper-btn.current::before {
                     content: '';
                     position: absolute;
                     right: -2px;
                     top: -2px;
                     border: 1px solid #00000099;
                     display: inline-block;
                     width: 10px;
                     height: 10px;
                     border-radius: 50%;
                     background: white;
                     box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 80%);
                     opacity: 0.8;
                 }
                 .in-input .search-jumper-input {
                     display: block;
                     box-sizing: content-box;
                 }
                 .lock-input .search-jumper-lock-input {
                     float: left;
                     font-size: 20px;
                     top: 14px;
                     left: 25px;
                     color: darkgrey;
                     position: absolute;
                     border-right: 2px solid #32373a;
                     padding-right: 10px;
                     display: block;
                 }
                 .search-jumper-input {
                     width: 80%;
                     min-width: 500px;
                     bottom: 3%;
                     left: 50%;
                     margin: 0 0 0 -40%;
                     position: fixed;
                     font-family: sans-serif;
                     background: #F1F1F1;
                     text-align: left;
                     box-shadow: 0px 2px 10px rgb(0 0 0 / 80%);
                     border: 1px solid rgb(179 179 179 / 70%);
                     border-radius: 28px;
                     background-color: rgb(51 56 59 / 90%);
                     padding: 10px;
                     display: none;
                     z-index: 2139999999;
                     font-size: 20px;
                     height: 36px;
                     touch-action: none;
                 }
                 .inputGroup {
                     cursor: grab;
                     display: flex;
                 }
                 .inputGroup * {
                     cursor: default;
                 }
                 .search-jumper-input input {
                     background-color: #212022;
                     color: white;
                     border: none;
                     font-size: 20px;
                     height: 35px;
                     margin-bottom: 0;
                     padding: 5px;
                     margin: 0 10px;
                     border-radius: 3px;
                     box-shadow: #333 0px 0px 2px;
                     width: calc(100% - 20px);
                     outline: none;
                     box-sizing: border-box;
                     cursor: text;
                 }
                 #searchJumperInput,
                 #searchJumperInputKeyWords {
                     width: calc(50% - 11px);
                     float: left;
                     transition: 0.25s width ease;
                 }
                 #searchJumperInput {
                     margin: 0 1px 0 10px;
                 }
                 #searchJumperInputKeyWords {
                     margin: 0 10px 0 1px;
                 }
                 #filterSites>input:focus {
                     width: calc(200% - 20px);
                 }
                 .search-jumper-input * {
                     box-sizing: border-box;
                 }
                 .search-jumper-input input[type="radio"] {
                     display: none;
                 }
                 .search-jumper-input input:checked + label {
                     background: #3a444add;
                     color: white;
                     font-size: 18px;
                 }
                 .search-jumper-input input#filterSitesTab:checked ~ .line {
                     left: 25px;
                 }
                 .search-jumper-input input#filterSitesTab:checked ~ .content-container #filterSites {
                     opacity: 1;
                     pointer-events: all;
                 }
                 .search-jumper-input input#searchInPageTab:checked ~ .line {
                     left: 231px;
                 }
                 .search-jumper-input input#searchInPageTab:checked ~ .content-container #searchInPage {
                     opacity: 1;
                     pointer-events: all;
                 }
                 .search-jumper-input label {
                     display: inline-block;
                     font-size: 18px;
                     height: 36px;
                     line-height: 36px;
                     width: 200px;
                     text-align: center;
                     background: #2a343acc;
                     color: #959595;
                     position: relative;
                     transition: 0.25s background ease;
                     cursor: pointer;
                     position: relative;
                     top: -46px;
                     left: 15px;
                     border-radius: 5px 5px 0 0;
                     user-select: none;
                     pointer-events: all;
                     max-width: 40%;
                     white-space: nowrap;
                     overflow: hidden;
                     text-overflow: ellipsis;
                 }
                 .search-jumper-input label::after {
                     content: "";
                     height: 1px;
                     width: 100%;
                     position: absolute;
                     display: block;
                     background: #ccc;
                     bottom: 0;
                     opacity: 0;
                     left: 0;
                     transition: 0.25s ease;
                 }
                 .search-jumper-input label:hover::after {
                     opacity: 1;
                 }
                 .search-jumper-input .line {
                     background: #1E88E5;
                     width: 200px;
                     height: 1px;
                     top: -1px;
                     left: 0;
                     transition: 0.25s ease;
                     position: absolute;
                 }
                 .inputGroup>.svgBtns {
                     right: 25px;
                     top: 15px;
                     position: absolute;
                     user-select: none;
                     background: rgb(0 0 0 / 50%);
                     white-space: nowrap;
                     overflow: hidden;
                 }
                 .inputGroup>.svgBtns:hover {
                     width: auto;
                 }
                 .inputGroup svg.checked {
                     fill: #1E88E5;
                 }
                 @media screen and (max-width: 800px) {
                     .search-jumper-input .line {
                         display: none;
                     }
                     .search-jumper-input {
                         min-width: 300px;
                     }
                     .inputGroup>.svgBtns {
                         width: 25px;
                     }
                 }
                 .search-jumper-input .content-container {
                     background: #eee;
                     position: static;
                     font-size: 16px;
                 }
                 .search-jumper-input .content-container .inputGroup {
                     position: absolute;
                     padding: 10px;
                     width: 100%;
                     top: 0;
                     left: 0;
                     opacity: 0;
                     pointer-events: none;
                     transition: 0.25s ease;
                     color: #333;
                 }
                 .search-jumper-input svg,
                 .searchJumperNavBar svg {
                     width: 25px;
                     height: 25px;
                     fill: white;
                     cursor: pointer;
                     opacity: 0.8;
                     transition: 0.25s all ease;
                     font-size: 0px;
                 }
                 .search-jumper-input .inputGroup:hover svg,
                 .searchJumperNavBar.show svg {
                     pointer-events: all;
                 }
                 .search-jumper-input svg *,
                 .searchJumperNavBar svg * {
                     cursor: pointer;
                 }
                 .search-jumper-input svg:hover,
                 .searchJumperNavBar svg:hover {
                     -webkit-transform:scale(1.2);
                     -moz-transform:scale(1.2);
                     transform:scale(1.2);
                     opacity: 1;
                 }
                 #search-jumper.selectedEle #filterSites>.svgBtns>svg {
                     display: inline-block!important;
                 }
                 .search-jumper-input>.closeBtn {
                     position: absolute;
                     right: 0px;
                     top: -39px;
                     width: 35px;
                     height: 35px;
                     vertical-align: middle;
                     fill: #454a4b;
                     overflow: hidden;
                     background: white;
                     border-radius: 20px;
                     pointer-events: all;
                 }
                 #searchInPage>.lockWords {
                     max-width: 50%;
                     position: absolute;
                     bottom: 8px;
                     left: 20px;
                     color: white;
                     font-size: 18px;
                     display: flex;
                     flex-wrap: wrap-reverse;
                     max-height: 38px;
                     overflow: hidden;
                 }
                 #searchInPage>.lockWords:hover {
                     overflow-y: auto;
                     height: auto;
                     max-height: 90vh;
                 }
                 #searchInPage>.lockWords>span {
                     position: relative;
                     padding: 5px;
                     cursor: alias;
                     user-select: none;
                     background: yellow;
                     color: black;
                     border: 1px solid;
                     margin: 2px;
                     display: flex;
                     align-items: center;
                     white-space: nowrap;
                     max-width: 100%;
                 }
                 #searchInPage>.lockWords .removeWord {
                     position: absolute;
                     right: 0;
                     top: 0;
                     display: none;
                     opacity: 0.3;
                 }
                 #searchInPage>.lockWords .removeWord:hover {
                     opacity: 1;
                 }
                 #searchInPage>.lockWords>span:hover .removeWord {
                     display: block;
                     pointer-events: all;
                 }
                 #searchInPage>.lockWords .removeWord>svg {
                     width: 15px;
                     height: 15px;
                     fill: black;
                     color: black;
                     border: 1px solid white;
                     border-radius: 10px;
                     background: white;
                 }
                 #searchInPage>.lockWords>span>em {
                     font-size: 12px;
                     margin-right: 5px;
                     color: unset;
                 }
                 .searchJumperNavBar {
                     all: unset;
                     top: 0px;
                     bottom: 0px;
                     right: 0px;
                     position: fixed;
                     width: 20px;
                     z-index: 2147483647;
                     background: #00000066;
                     text-align: center;
                     pointer-events: none;
                     font-size: 0px;
                     opacity: 0;
                 }
                 .searchJumperNavBar.show {
                     pointer-events: all;
                     opacity: 1;
                 }
                 .searchJumperNavBar>.closeNavBtn {
                     width: 16px;
                     height: 16px;
                     fill: white;
                     cursor: pointer;
                 }
                 #navMarks>div.navPointer {
                     pointer-events: none;
                     position: absolute;
                     right: 20px;
                     text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
                     font-size: 30px;
                     line-height: 0px;
                     border: 0;
                     margin-top: 2px;
                     opacity: 0.8;
                     color: black;
                 }
                 #navMarks {
                     height: 100%;
                     width: 100%;
                     position: absolute;
                 }
                 #navMarks>span {
                     height: 0.5vh;
                     width: 100%;
                     position: absolute;
                     border: 1px solid #beb7b7;
                     min-height: 3px;
                     box-sizing: border-box;
                     left: 0;
                     border-radius: 0px!important;
                 }
                 mark.searchJumper {
                     visibility: visible;
                     font-style: normal;
                     box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 3px;
                     border-radius: 3px;
                     text-decoration: none;
                     padding: 1px 0;
                 }
                 mark.searchJumper[data-current=true] {
                     border-bottom: 0.2em solid;
                     border-bottom-left-radius: 0;
                     border-bottom-right-radius: 0;
                     animation: 0.5s linear 0s 5 normal none running currentMark;
                 }
                 .searchJumperPosBar {
                     background: rgba(29, 93, 163, 0.3);
                     position: absolute;
                     min-height: 10px;
                     min-width: 10px;
                     animation-duration: 3s;
                     z-index: 2147483647;
                     margin: 0;
                     opacity: 0;
                     pointer-events: none;
                     transition: 0.25s all ease;
                 }
                 .searchJumperPosBar.searchJumperPosW {
                     width: 100%;
                     left: 0;
                 }
                 .searchJumperPosBar.searchJumperPosH {
                     height: 100%;
                     top: 0;
                     position: fixed;
                 }
                 @keyframes fadeit {
                     from {opacity: 1;}
                     to {opacity: 0;}
                 }
                 @keyframes currentMark {
                     from {border-color: unset}
                     to {border-color: transparent;}
                 }
                 #rightSizeChange {
                     top: 0;
                     opacity: 0;
                     height: 55px;
                     width: 5px;
                     position: absolute;
                     cursor: e-resize;
                     right: 0;
                 }
                 .searchJumper-hide {
                     display: none!important;
                 }
                 `;
                if (searchData.prefConfig.cssText) cssText += searchData.prefConfig.cssText;
                mainStyleEle = _GM_addStyle(cssText);

                let logoCon = document.createElement("span");
                logoCon.className = "search-jumper-hide search-jumper-logo";
                logoBtn = document.createElement("span");
                logoBtn.innerHTML = createHTML(logoBtnSvg);
                logoBtn.className = "search-jumper-btn";
                logoCon.addEventListener('mouseenter', e => {
                    if (this.preList) {
                        this.preList.style.visibility = "hidden";
                    }
                });

                logoCon.appendChild(logoBtn);

                let bar = document.createElement("span");
                bar.className = "search-jumper-searchBar";
                bar.appendChild(logoCon);

                let searchBarCon = document.createElement("div");
                searchBarCon.id = "search-jumper";
                searchBarCon.className = "search-jumper-searchBarCon";
                searchBarCon.appendChild(bar);
                searchBarCon.setAttribute("translate", "no");

                let alllist = document.createElement("div");
                alllist.id = "search-jumper-alllist";
                searchBarCon.appendChild(alllist);
                this.alllist = alllist;

                let showallBg = document.createElement("div");
                showallBg.className = "search-jumper-showallBg";
                alllist.appendChild(showallBg);
                alllist.addEventListener(getSupportWheelEventName(), e => {
                    if (e.target != alllist && e.target != showallBg) return;
                    var deltaX, deltaY;
                    if(e.type !== 'wheel'){
                        var x = 0, y = 0;
                        if (typeof e.axis == 'number') {
                            if (e.axis == 2) {
                                y = e.detail;
                            } else {
                                x = e.detail;
                            }
                        } else {
                            if (typeof e.wheelDeltaY == 'undefined' || e.wheelDeltaY != 0) {
                                y = -e.wheelDelta / 40;
                            } else {
                                x = -e.wheelDelta / 40;
                            };
                        };
                        deltaY = y;
                        deltaX = x;

                    } else {
                        deltaX = e.deltaX;
                        deltaY = e.deltaY;
                    }
                    e.preventDefault();
                    e.stopPropagation();

                    searchBarCon.scrollLeft += deltaY;
                }, false);

                let showallInput = document.createElement("input");
                showallInput.className = "search-jumper-showallInput";
                alllist.appendChild(showallInput);
                this.showallInput = showallInput;

                let logoConfigBtn = document.createElement("span");
                logoConfigBtn.innerHTML = createHTML(logoBtnSvg);
                logoConfigBtn.className = "search-jumper-btn";
                logoConfigBtn.addEventListener('click', e => {
                    _GM_openInTab(configPage, {active: true});
                });
                alllist.appendChild(logoConfigBtn);

                let historylist = document.createElement("div");
                historylist.className = "search-jumper-historylist";
                alllist.appendChild(historylist);
                this.historylist = historylist;

                let enterHandler = e => {
                    bar.classList.remove("initShow");
                };
                bar.addEventListener('mouseenter', enterHandler, false);
                if (searchData.prefConfig.initShow) {
                    bar.classList.add("initShow");
                } else {
                    let touched = false;
                    let touchBodyHandler = e => {
                        touched = false;
                        document.body.removeEventListener('touchstart', touchBodyHandler);
                    };
                    let touchHandler = e => {
                        if (touched) return;
                        touched = true;
                        bar.classList.add('disable-pointer');
                        setTimeout(() => {
                            bar.classList.remove('disable-pointer');
                        }, 250);
                        document.body.addEventListener("touchstart", touchBodyHandler);
                    };
                    bar.addEventListener('touchstart', touchHandler, true);
                }

                this.bar = bar;

                let tips = document.createElement("span");
                tips.className = "search-jumper-tips";
                tips.style.opacity = 0;
                searchBarCon.appendChild(tips);
                this.tips = tips;

                this.appendBar();

                let searchJumperNavBar = document.createElement("div");
                searchJumperNavBar.className = "searchJumperNavBar";
                searchJumperNavBar.style.display = "none";
                searchJumperNavBar.innerHTML = createHTML(`
                  <svg class="closeNavBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Close navigation</title><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                  <div id="navMarks"></div>
                `);
                searchBarCon.appendChild(searchJumperNavBar);

                let searchJumperExpand = document.createElement("span");
                searchJumperExpand.title = i18n('expand');
                searchJumperExpand.className = "searchJumperExpand search-jumper-btn input-hide";
                searchJumperExpand.innerHTML = createHTML(`
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect height="450" width="600" y="300" x="200" fill="#fff"></rect><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m0 640L240 432l45.6-45.6L512 613.6l226.4-226.4 45.6 45.6L512 704z"></path></svg>
                `);
                this.searchJumperExpand = searchJumperExpand;

                this.navMarks = searchJumperNavBar.querySelector("#navMarks");
                this.closeNavBtn = searchJumperNavBar.querySelector(".closeNavBtn");
                this.searchJumperNavBar = searchJumperNavBar;

                let searchInputDiv = document.createElement("div");
                searchInputDiv.className = "search-jumper-input";
                searchInputDiv.innerHTML = createHTML(`
                <svg class="closeBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Close search input</title><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                <input type="radio" id="filterSitesTab" name="tab" ${searchData.prefConfig.defaultFindTab? "" : "checked"}>
                <label for="filterSitesTab">${i18n("filterSites")}</label>
                <input type="radio" id="searchInPageTab" name="tab" ${searchData.prefConfig.defaultFindTab? "checked" : ""}>
                <label for="searchInPageTab">${i18n("searchInPage")}</label>
                <div class="line"></div>
                <div class="content-container">
                  <div class="inputGroup" id="filterSites">
                    <input spellcheck="false" id="searchJumperInput" placeholder="${i18n("inputPlaceholder")}" list="filterGlob">
                    <input spellcheck="false" id="searchJumperInputKeyWords" placeholder="${i18n("inputKeywords")}">
                    <datalist id="filterGlob">
                    </datalist>
                    <span class="search-jumper-lock-input"></span>
                    <span class="svgBtns">
                      <svg id="copyEleBtn" style="display:none;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("copyEleBtn")}</title><path d="M706.5 188.4H190.2c-29.8 0-54 24.2-54 54v662.9c0 29.8 24.2 54 54 54h516.3c29.8 0 54-24.2 54-54V242.4c0-29.8-24.2-54-54-54z m-18 698.9H208.2V260.4h480.3v626.9zM313.7 512.2h275.2c19.9 0 36-16.1 36-36s-16.1-36-36-36H313.7c-19.9 0-36 16.1-36 36s16.1 36 36 36zM313.7 715.2h201.6c19.9 0 36-16.1 36-36s-16.1-36-36-36H313.7c-19.9 0-36 16.1-36 36s16.1 36 36 36zM837.2 64.7H302.9c-19.9 0-36 16.1-36 36s16.1 36 36 36h516.3v662.9c0 19.9 16.1 36 36 36s36-16.1 36-36V118.7c0-29.8-24.2-54-54-54z"></path></svg>
                      <svg id="maxEleBtn" style="display:none;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("maxEleBtn")}</title><path d="M192 832h160a32 32 0 0 1 0 64H160a32 32 0 0 1-32-32V672a32 32 0 0 1 64 0zM182.72 886.72a32 32 0 0 1-45.44-45.44l224-224a32 32 0 0 1 45.44 45.44zM832 832V672a32 32 0 0 1 64 0v192a32 32 0 0 1-32 32H672a32 32 0 0 1 0-64zM886.72 841.28a32 32 0 0 1-45.44 45.44l-224-224a32 32 0 0 1 45.44-45.44zM192 192v160a32 32 0 0 1-64 0V160a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64zM137.28 182.72a32 32 0 0 1 45.44-45.44l224 224a32 32 0 0 1-45.44 45.44zM832 192H672a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0zM841.28 137.28a32 32 0 1 1 45.44 45.44l-224 224a32 32 0 0 1-45.44-45.44z"></path></svg>
                      <svg id="minEleBtn" style="display:none;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("minEleBtn")}</title><path d="M672 352h160a32 32 0 0 1 0 64H640a32 32 0 0 1-32-32V192a32 32 0 0 1 64 0zM662.72 406.72a32 32 0 0 1-45.44-45.44l224-224a32 32 0 1 1 45.44 45.44zM352 352V192a32 32 0 0 1 64 0v192a32 32 0 0 1-32 32H192a32 32 0 0 1 0-64zM406.72 361.28a32 32 0 0 1-45.44 45.44l-224-224a32 32 0 0 1 45.44-45.44zM672 672v160a32 32 0 0 1-64 0V640a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64zM617.28 662.72a32 32 0 0 1 45.44-45.44l224 224a32 32 0 0 1-45.44 45.44zM192 672a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V672zM361.28 617.28a32 32 0 0 1 45.44 45.44l-224 224a32 32 0 0 1-45.44-45.44z"></path></svg>
                      <svg id="pickerBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("pickerBtn")}</title><path d="M874.048 533.333333C863.424 716.629333 716.629333 863.424 533.333333 874.048V917.333333a21.333333 21.333333 0 0 1-42.666666 0v-43.285333C307.370667 863.424 160.576 716.629333 149.952 533.333333H106.666667a21.333333 21.333333 0 0 1 0-42.666666h43.285333C160.576 307.370667 307.370667 160.576 490.666667 149.952V106.666667a21.333333 21.333333 0 0 1 42.666666 0v43.285333c183.296 10.624 330.090667 157.418667 340.714667 340.714667h42.816a21.333333 21.333333 0 1 1 0 42.666666H874.026667z m-42.752 0h-127.786667a21.333333 21.333333 0 0 1 0-42.666666h127.786667C820.778667 330.922667 693.056 203.221333 533.333333 192.704V320a21.333333 21.333333 0 0 1-42.666666 0V192.704C330.922667 203.221333 203.221333 330.944 192.704 490.666667H320a21.333333 21.333333 0 0 1 0 42.666666H192.704c10.517333 159.744 138.24 287.445333 297.962667 297.962667V704a21.333333 21.333333 0 0 1 42.666666 0v127.296c159.744-10.517333 287.445333-138.24 297.962667-297.962667zM512 554.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z"></path></svg>
                    </span>
                  </div>
                  <div class="inputGroup" id="searchInPage">
                    <span class="lockWords"></span>
                    <input spellcheck="false" id="searchJumperInPageInput" title="${i18n("inPageTips")}" placeholder="${i18n("inPagePlaceholder")}">
                    <span class="svgBtns">
                      <svg id="editBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("editBtn")}</title><path d="M928 365.664a32 32 0 0 0-32 32V864a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h429.6a32 32 0 0 0 0-64H160a96 96 0 0 0-96 96v704a96 96 0 0 0 96 96h704a96 96 0 0 0 96-96V397.664a32 32 0 0 0-32-32z"></path><path d="M231.616 696.416a38.4 38.4 0 0 0 44.256 53.792l148-38.368L950.496 185.248 814.72 49.472 290.432 573.76l-58.816 122.656z m111.808-85.12L814.72 140l45.248 45.248-468.992 468.992-77.824 20.16 30.272-63.104z"></path></svg>
                      <svg id="addWord" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("addWord")}</title><path d="M821.364 962h-618.75C123.864 962 62 900.114 62 821.364v-618.75c0-78.75 61.864-140.635 140.614-140.635h618.75c78.75 0 140.636 61.885 140.636 140.635v618.75C962 900.114 900.114 962 821.364 962z m79.265-756.814c0-46.586-35.25-81.815-81.815-81.815H205.186c-46.843-0.214-84.557 34.758-83.165 82.393-0.128 14.4 1.35 613.05 1.35 613.05 0 46.565 35.25 81.815 81.815 81.815h613.628c46.565 0 81.815-35.25 81.815-81.815V205.186z m-173.55 347.657H552.843v174.236c0 16.95-13.736 30.685-30.686 30.685h-0.236a30.686 30.686 0 0 1-30.685-30.685V552.843H296.92a30.686 30.686 0 0 1-30.685-30.686v-0.236c0-16.95 13.735-30.685 30.685-30.685h194.315V296.92c0-16.95 13.735-30.685 30.685-30.685h0.236c16.95 0 30.686 13.735 30.686 30.685v194.315h174.236c16.95 0 30.685 13.735 30.685 30.685v0.236c0 16.95-13.735 30.686-30.685 30.686z"></path></svg>
                      <svg id="emptyBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("emptyBtn")}</title><path d="m159.45829,231.40004l-48.83334,0a36.625,34.1375 0 0 1 0,-68.275l805.75004,0a36.625,34.1375 0 0 1 0,68.275l-683.6667,0l0,603.09581a61.04167,56.89583 0 0 0 61.04167,56.89584l439.50002,0a61.04167,56.89583 0 0 0 61.04167,-56.89584l0,-500.68332a36.625,34.1375 0 0 1 73.25,0l0,500.68332c0,69.12844 -60.12604,125.17084 -134.29167,125.17084l-439.50002,0c-74.16563,0 -134.29167,-56.0424 -134.29167,-125.17084l0,-603.09581zm256.37501,-113.79167a36.625,34.1375 0 0 1 0,-68.275l195.33334,0a36.625,34.1375 0 0 1 0,68.275l-195.33334,0zm-36.625,307.23749a36.625,34.1375 0 0 1 73.25,0l0,273.09999a36.625,34.1375 0 0 1 -73.25,0l0,-273.09999zm195.33334,0a36.625,34.1375 0 0 1 73.25,0l0,273.09999a36.625,34.1375 0 0 1 -73.25,0l0,-273.09999z"/></svg>
                      <svg id="copyInPageBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("copyInPageBtn")}</title><path d="M706.5 188.4H190.2c-29.8 0-54 24.2-54 54v662.9c0 29.8 24.2 54 54 54h516.3c29.8 0 54-24.2 54-54V242.4c0-29.8-24.2-54-54-54z m-18 698.9H208.2V260.4h480.3v626.9zM313.7 512.2h275.2c19.9 0 36-16.1 36-36s-16.1-36-36-36H313.7c-19.9 0-36 16.1-36 36s16.1 36 36 36zM313.7 715.2h201.6c19.9 0 36-16.1 36-36s-16.1-36-36-36H313.7c-19.9 0-36 16.1-36 36s16.1 36 36 36zM837.2 64.7H302.9c-19.9 0-36 16.1-36 36s16.1 36 36 36h516.3v662.9c0 19.9 16.1 36 36 36s36-16.1 36-36V118.7c0-29.8-24.2-54-54-54z"></path></svg>
                      <svg id="recoverBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("recoverBtn")}</title><path d="M502.26 289.06c-0.02 16.95 13.26 30.94 30.18 31.8 123.47 8.79 236.97 70.94 310.89 170.21 73.92 99.28 100.91 225.84 73.93 346.65-41.65-181.74-195.38-316.12-381.05-333.08-8.89-0.6-17.63 2.55-24.09 8.7a31.798 31.798 0 0 0-9.86 23.64v85.15a32.343 32.343 0 0 1-50.67 26.41L114.21 413.02a32.341 32.341 0 0 1-14.46-26.95c0-10.84 5.43-20.96 14.46-26.95L451.6 124.68a32.358 32.358 0 0 1 33.28-2.03 32.355 32.355 0 0 1 17.39 28.44v137.97h-0.01z"></path></svg>
                      <svg id="saveRuleBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("saveRuleBtn")}</title><path d="M579.7 291.4c18.8 0 34.1-15.3 34.1-34.1v-34.1c0-18.8-15.4-34.1-34.1-34.1-18.8 0-34.1 15.3-34.1 34.1v34.1c0 18.7 15.4 34.1 34.1 34.1zM944.7 216.3L808.2 79.9c-6.8-6.8-15.3-10.2-23.9-10.2H170.4c-56.3 0-102.3 46-102.3 102.3v682.1c0 56.3 46 102.3 102.3 102.3H852.5c56.3 0 102.3-46 102.3-102.3V240.2c0.1-8.5-3.3-17-10.1-23.9zM358 137.9h307v182.5c0 11.9-10.2 22.2-22.2 22.2H380.2c-11.9 0-22.2-10.2-22.2-22.2V137.9z m358.1 750.3H306.9V652.9c0-20.5 17.1-37.5 37.5-37.5h334.2c20.5 0 37.5 17 37.5 37.5v235.3z m170.6-34.1c0 18.8-15.3 34.1-34.1 34.1h-66.5V652.9c0-58-47.7-105.7-105.7-105.7h-336c-58 0-105.7 47.7-105.7 105.7v235.3h-68.2c-18.8 0-34.1-15.3-34.1-34.1V172c0-18.8 15.3-34.1 34.1-34.1h119.4v182.5c0 49.5 40.9 90.4 90.4 90.4h262.6c49.5 0 90.4-40.9 90.4-90.4V137.9h37.5l116 116v600.2z"></path></svg>
                      <svg id="pinBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("pinBtn")}</title><path d="m674.8822,92.83803a81.61801,81.04246 0 0 1 25.30158,17.09996l213.75757,212.46631a81.61801,81.04246 0 0 1 -24.70304,131.36982l-75.74151,33.30845l-142.09696,141.257l-11.26329,155.3854a81.61801,81.04246 0 0 1 -139.13151,51.46196l-137.98885,-137.15085l-235.14149,234.56388l-57.83996,-57.18896l235.27751,-234.69896l-142.7499,-141.85131a81.61801,81.04246 0 0 1 51.6642,-138.09635l160.95072,-11.94025l139.5668,-138.74469l32.78324,-75.09935a81.61801,81.04246 0 0 1 107.35489,-42.14208zm-32.45675,74.36997l-38.95901,89.22775l-171.94193,170.99958l-191.25821,14.1284l338.46989,336.3262l13.43977,-185.47917l174.33607,-173.32279l89.69819,-39.44067l-213.78477,-212.43929z"></path></svg>
                      <svg id="locBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("locBtn")}</title><path d="M357.6 832l-255.2 56c-20 4.8-39.2-10.4-39.2-31.2V569.6c0-15.2 10.4-28 24.8-31.2L243.2 504l53.6 53.6L139.2 592c-7.2 1.6-12.8 8-12.8 16v188c0 10.4 9.6 17.6 19.2 16l192.8-42.4 12.8-3.2 12.8 2.4 306.4 60.8 210.4-47.2c7.2-1.6 12.8-8 12.8-16V580c0-10.4-9.6-17.6-19.2-16L688 606.4l-12 2.4L760 524.8l160.8-36c20-4.8 39.2 10.4 39.2 31.2v286.4c0 15.2-10.4 28-24.8 31.2L672.8 896M512 128c-115.2 0-206.4 101.6-190.4 220 5.6 41.6 26.4 80 56 109.6l0.8 0.8L512 591.2l133.6-132.8 0.8-0.8c29.6-29.6 49.6-68 56-109.6C719.2 229.6 627.2 128 512 128m0-64c141.6 0 256 114.4 256 256 0 70.4-28 133.6-74.4 180L512 681.6 330.4 500C284.8 453.6 256 390.4 256 320 256 178.4 371.2 64 512 64z m64.8 193.6c0-35.2-28.8-64-64-64s-64 28.8-64 64 28.8 64 64 64 64-28 64-64z"></path></svg>
                    </span>
                  </div>
                </div>
                <div id="rightSizeChange"></div>
                `);
                searchBarCon.appendChild(searchInputDiv);
                this.searchInputDiv = searchInputDiv;
                this.searchInput = searchInputDiv.querySelector("#searchJumperInput");
                this.searchJumperInputKeyWords = searchInputDiv.querySelector("#searchJumperInputKeyWords");
                this.searchLockInput = searchInputDiv.querySelector(".search-jumper-lock-input");
                this.searchJumperInPageInput = searchInputDiv.querySelector("#searchJumperInPageInput");
                this.pickerBtn = searchInputDiv.querySelector("#pickerBtn");
                this.minEleBtn = searchInputDiv.querySelector("#minEleBtn");
                this.maxEleBtn = searchInputDiv.querySelector("#maxEleBtn");
                this.copyEleBtn = searchInputDiv.querySelector("#copyEleBtn");
                this.editBtn = searchInputDiv.querySelector("#editBtn");
                this.addWord = searchInputDiv.querySelector("#addWord");
                this.recoverBtn = searchInputDiv.querySelector("#recoverBtn");
                this.saveRuleBtn = searchInputDiv.querySelector("#saveRuleBtn");
                this.pinBtn = searchInputDiv.querySelector("#pinBtn");
                this.locBtn = searchInputDiv.querySelector("#locBtn");
                this.emptyBtn = searchInputDiv.querySelector("#emptyBtn");
                this.copyInPageBtn = searchInputDiv.querySelector("#copyInPageBtn");
                this.closeBtn = searchInputDiv.querySelector(".closeBtn");
                this.filterSitesTab = searchInputDiv.querySelector("#filterSitesTab");
                this.searchInPageTab = searchInputDiv.querySelector("#searchInPageTab");
                this.searchInPageLockWords = searchInputDiv.querySelector("#searchInPage>.lockWords");
                this.contentContainer = searchInputDiv.querySelector(".content-container");
                this.rightSizeChange = searchInputDiv.querySelector("#rightSizeChange");
                this.filterGlob = searchInputDiv.querySelector("#filterGlob");
            }

            showInPageSearch() {
                this.searchInPageTab.checked = true;
                this.showSearchInput();
                this.initSetInPageWords();
            }

            initSetInPageWords() {
                if (this.searchInPageTab.checked && !this.searchJumperInPageInput.value) {
                    let words = this.searchJumperInputKeyWords.value.replace(/^\*/, "") || getKeywords();
                    if (words) {
                        try {
                            words = decodeURIComponent(words);
                        } catch (e) {}
                    }
                    if (this.lockWords && this.lockWords.indexOf(words) !== -1) return;
                    this.searchJumperInPageInput.value = words || globalInPageWords;
                    if (!this.lockWords) {
                        this.submitIgnoreSpace(this.searchJumperInPageInput.value);
                        this.submitInPageWords();
                    }
                }
            }

            anylizeInPageWords(words, add, init) {
                if (!words) return [];
                let self = this;
                let result = [];
                if (!add) {
                    if (words.indexOf("$c") === 0 && words.length > 2) {
                        this.splitSep = words.substr(2, 1);
                        words = words.substr(3).trim();
                    } else if (words.indexOf("$o") === 0) {
                        this.splitSep = null;
                        words = words.substr(2).trim();
                    } else this.splitSep = " ";
                    this.curWordIndex = 0;
                }
                if (this.splitSep) {
                    words.split(this.splitSep).forEach(word => {
                        let oriWord = word;
                        word = word.trim();
                        if (!word) return;
                        if (init) {
                            if (word.length < (searchData.prefConfig.limitInPageLen || 1)) return;
                            if ((searchData.prefConfig.ignoreWords || []).includes(word)) return;
                        }
                        let title = "";
                        let style = "";
                        let hideParent;
                        let inRange;
                        let isRe = false;
                        let reCase = "";
                        let titleReg = /\$t{(.*?)}($|\$)/;
                        let titleMatch = word.match(titleReg);
                        if (titleMatch) {
                            title = titleMatch[1];
                            word = word.replace(titleReg, "$2");
                        }
                        let hideParentReg = /\$p{(.*?)}($|\$)/;
                        let hideParentMatch = word.match(hideParentReg);
                        if (hideParentMatch) {
                            hideParent = parseInt(hideParentMatch[1]) || 0;
                            word = word.replace(hideParentReg, "$2");
                        }
                        let inRangeReg = /\$in{(.*?)}($|\$)/;
                        let inRangeMatch = word.match(inRangeReg);
                        if (inRangeMatch) {
                            inRange = inRangeMatch[1] || '';
                            word = word.replace(inRangeReg, "$2");
                        }
                        let styleReg = /\$s{(.*?)}($|\$)/;
                        let styleMatch = word.match(styleReg);
                        if (styleMatch) {
                            styleMatch = styleMatch[1].match(/(.*?);(.*)/);
                            style = self.getHighlightStyle(self.curWordIndex, styleMatch[1], styleMatch[2]);
                            word = word.replace(styleReg, "$2");
                        } else {
                            style = self.getHighlightStyle(self.curWordIndex, "", "");
                        }
                        let reMatch = word.match(/^\/(.*)\/(i?)($|\$)/);
                        if (reMatch) {
                            isRe = true;
                            word = reMatch[1];
                            reCase = reMatch[2];
                        }
                        result.push({content: word, isRe: isRe, reCase: reCase, title: title, style: style, oriWord: oriWord, hideParent: hideParent, inRange: inRange});
                        self.curWordIndex++;
                    });
                } else {
                    this.curWordIndex = 0;
                    let word = (add || "").replace(/^\$o/, "") + words;
                    result = [{content: word, isRe: false, reCase: "", title: "", style: ""}];
                }
                return result;
            }

            submitInPageWords(init) {
                let self = this;
                let words = this.searchJumperInPageInput.value;
                let wordSpans = [];
                if (!words) {
                    if (!this.lockWords) {
                        this.highlight("");
                        this.highlightSpans = {};
                    } else this.highlight("insert");
                    return wordSpans;
                }
                let targetWords = this.anylizeInPageWords(words, this.lockWords, !!init);
                if (!targetWords || targetWords.length == 0) return wordSpans;
                if (this.lockWords) {
                    this.lockWords += this.splitSep + words;
                } else this.lockWords = words;
                this.searchJumperInPageInput.value = "";
                if (!this.splitSep) {
                    this.searchInPageLockWords.innerHTML = createHTML();
                    this.highlight("");
                }
                this.highlight(targetWords);
                targetWords.forEach(word => {
                    if (!word) return;
                    let wordSpan = document.createElement("span");
                    wordSpan.innerHTML = word.content;
                    wordSpan.title = word.title ? JSON.parse('"' + word.title + '"') : word.content;
                    let background = word.style.match(/background: *(#?\w+)/);
                    if (background) wordSpan.style.background = background[1];
                    let color = word.style.match(/color: *(#?\w+)/);
                    if (color) wordSpan.style.color = color[1];

                    wordSpan.addEventListener("click", e => {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                    wordSpan.oncontextmenu = e => {
                        event.preventDefault();
                    };
                    wordSpan.addEventListener('dblclick', e => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (e.target.tagName === 'EM') return;
                        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
                        this.showModifyWindow(word, wordSpan);
                    }, true);
                    wordSpan.addEventListener("mousedown", e => {
                        if (e.which === 1 ) {
                            this.focusHighlightByText(word.content, true, wordSpan);
                        } else if (e.which === 3){
                            this.focusHighlightByText(word.content, false, wordSpan);
                        }
                    });
                    let removeBtn = document.createElement("div");
                    removeBtn.addEventListener("mousedown", e => {
                        wordSpan.parentNode.removeChild(wordSpan);
                        this.removeHighlightWord(word);
                        e.stopPropagation();
                        e.preventDefault();
                    });
                    removeBtn.className = "removeWord";
                    removeBtn.innerHTML = createHTML(`<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("removeBtn")}</title><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>`);
                    wordSpan.appendChild(removeBtn);

                    this.setHighlightSpan(wordSpan, -1, this.marks[word.content].length);
                    this.highlightSpans[word.content] = wordSpan;

                    this.searchInPageLockWords.appendChild(wordSpan);
                    wordSpans.push(wordSpan);
                });
                if (this.searchInPageLockWords.scrollTop <= 0) this.searchInPageLockWords.scrollTop = this.searchInPageLockWords.scrollHeight;
                this.searchJumperInPageInput.style.paddingLeft = this.searchInPageLockWords.clientWidth + 3 + "px";
                return wordSpans;
            }

            showCustomInputWindow(url, callback) {
                this.customInputCallback = callback;
                if (!this.customInputFrame) {
                    this.customInputCssText = `
                    .customInputFrame-body {
                        width: 300px;
                        min-height: 200px;
                        position: fixed;
                        text-align: left;
                        left: 50%;
                        top: 50%;
                        margin-top: -160px;
                        margin-left: -150px;
                        z-index: 100000;
                        background-color: #ffffff;
                        border: 1px solid #afb3b6;
                        border-radius: 10px;
                        opacity: 0.95;
                        filter: alpha(opacity=95);
                        box-shadow: 5px 5px 20px 0px #000;
                        color: #6e7070;
                    }
                    .customInputFrame-title {
                        background: #458bd1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white!important;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 10px 10px 0 0;
                    }
                    .customInputFrame-title>img {
                        margin: 5px;
                    }
                    .customInputFrame-input-title {
                        font-size: 9pt;
                        font-family: Arial, sans-serif;
                        display: inline-block;
                        background-color: white;
                        position: relative;
                        left: 20px;
                        padding: 0px 4px;
                        text-align: left;
                        color: #646464;
                        word-break: break-all;
                        max-width: 85%;
                    }
                    .customInputFrame-body input[type=text],
                    .customInputFrame-body input[type=number],
                    .customInputFrame-body textarea,
                    .customInputFrame-body select {
                        resize: both;
                        font-size: 11pt;
                        font-weight: normal;
                        border-radius: 4px;
                        border: 1px solid rgba(0, 0, 0, 0.23);
                        margin: 4px;
                        font-family: inherit;
                        background-color: #FFF;
                        width: calc(100% - 17px);
                        color: #4A4A4A;
                        margin-top: -8px;
                        padding: 4px;
                        padding-top: 8px;
                        box-sizing: content-box;
                    }
                    .customInputFrame-buttons {
                        text-align: center;
                        margin-bottom: 5px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .customInputFrame-buttons>button {
                        width: 32%;
                        font-size: 16px;
                        cursor: pointer;
                        border: 1px solid #1976d2;
                        border-radius: 4px;
                        transition: all .3s;
                        color: #fff;
                        background-color: #458bd1;
                        line-height: 25px;
                    }
                    .customInputFrame-buttons>button:hover {
                        color: #e3f2fd;
                    }
                    `;
                    this.customInputCssEle = _GM_addStyle(this.customInputCssText);
                    let customInputFrame = document.createElement("div");
                    this.customInputFrame = customInputFrame;
                    customInputFrame.innerHTML = createHTML(`
                     <div class="customInputFrame-body">
                         <a href="${configPage}" class="customInputFrame-title" target="_blank">
                             <img width="32px" height="32px" src=${logoBase64}>${i18n("customInputFrame")}
                         </a>
                         <div id="customGroup">
                         </div>
                         <div class="customInputFrame-input-title">${i18n("finalSearch")}</div>
                         <textarea name="finalSearch" type="text"></textarea>
                         <div class="customInputFrame-buttons">
                             <button id="cancel" type="button">${i18n("cancel")}</button>
                             <button id="customSubmit" type="button">${i18n("customSubmit")}</button>
                         </div>
                     </div>
                    `);
                    let cancelBtn = customInputFrame.querySelector("#cancel");
                    cancelBtn.addEventListener("click", e => {
                        if (customInputFrame.parentNode) {
                            customInputFrame.parentNode.removeChild(customInputFrame);
                        }
                    });
                    let customGroup = this.customInputFrame.querySelector("#customGroup");
                    this.customGroup = customGroup;
                    let finalSearch = this.customInputFrame.querySelector("[name='finalSearch']");
                    this.finalSearch = finalSearch;
                    finalSearch.addEventListener("click", e => {
                        let finalValue = finalSearch.dataset.url;
                        [].forEach.call(customGroup.children, ele => {
                            if (ele.tagName === 'DIV') return;
                            finalValue = finalValue.replace('◎', ele.value || '');
                        });
                        finalSearch.value = finalValue;
                    });
                    let customSubmit = customInputFrame.querySelector("#customSubmit");
                    customSubmit.addEventListener("click", e => {
                        if (finalSearch.value) {
                            this.customInputCallback(finalSearch.value);
                        }
                    });
                }
                this.customGroup.innerHTML = createHTML();
                let tempUrl = url;
                let inputMatch = tempUrl.match(/%input{(.*?)}/);
                while (inputMatch) {
                    let param = inputMatch[1];
                    if (param.indexOf("\"") === 0 && param.indexOf("\",\"") !== -1) {
                        param = param.substr(1, param.length - 2).split("\",\"");
                    } else {
                        param = param.split(",");
                    }
                    if (param.length === 2) {//select
                        let titleSplit = param[0];
                        if (titleSplit.indexOf("'") === 0 && titleSplit.indexOf("'/'") !== -1) {
                            titleSplit = titleSplit.substr(1, titleSplit.length - 2).split("'/'");
                        } else {
                            titleSplit = titleSplit.split("/");
                        }
                        let optionSplit = param[1];
                        if (optionSplit.indexOf("'") === 0 && optionSplit.indexOf("'/'") !== -1) {
                            optionSplit = optionSplit.substr(1, optionSplit.length - 2).split("'/'");
                        } else {
                            optionSplit = optionSplit.split("/");
                        }
                        let singleTitle = titleSplit.length === optionSplit.length + 1;
                        let inputTitle = document.createElement('div');
                        inputTitle.className = 'customInputFrame-input-title';
                        inputTitle.innerText = titleSplit[0];
                        this.customGroup.appendChild(inputTitle);
                        let paramSelect = document.createElement('select');

                        let option = document.createElement("option");
                        option.value = '';
                        option.innerText = '';
                        paramSelect.appendChild(option);

                        for (let i = 0; i < optionSplit.length; i++) {
                            let value = optionSplit[i];
                            let option = document.createElement("option");
                            option.value = value;
                            option.innerText = singleTitle ? titleSplit[i + 1] : value;
                            paramSelect.appendChild(option);
                        }
                        paramSelect.addEventListener("change", e => {
                            this.finalSearch.click();
                        });
                        this.customGroup.appendChild(paramSelect);
                    } else if (param.length === 1) {//input
                        let inputTitle = document.createElement('div');
                        inputTitle.className = 'customInputFrame-input-title';
                        inputTitle.innerText = param[0];
                        this.customGroup.appendChild(inputTitle);
                        let paramInput = document.createElement('input');
                        paramInput.type = 'text';
                        paramInput.addEventListener("change", e => {
                            this.finalSearch.click();
                        });
                        this.customGroup.appendChild(paramInput);
                    }
                    tempUrl = tempUrl.replace(inputMatch[0], '◎');
                    inputMatch = tempUrl.match(/%input{(.*?)}/);
                }
                this.finalSearch.dataset.url = tempUrl;
                this.finalSearch.value = tempUrl.replace(/◎/g, '');
                if (!this.customInputCssEle || !this.customInputCssEle.parentNode) this.customInputCssEle = _GM_addStyle(this.customInputCssText);
                document.body.appendChild(this.customInputFrame);
            }

            showModifyWindow(word, wordSpan) {
                let oriWord;
                this.modifyWord = {};
                this.addNew = !word && !wordSpan;
                if (!this.addNew) {
                    oriWord = word.oriWord;
                    if (!oriWord) return;
                    this.modifyWord = word;
                    this.modifySpan = wordSpan;
                }
                if (!this.modifyFrame) {
                    this.modifyCssText = `
                    .searchJumperModify-body {
                        width: 300px;
                        min-height: 200px;
                        position: fixed;
                        text-align: left;
                        left: 50%;
                        top: 50%;
                        margin-top: -160px;
                        margin-left: -150px;
                        z-index: 100000;
                        background-color: #ffffff;
                        border: 1px solid #afb3b6;
                        border-radius: 10px;
                        opacity: 0.95;
                        filter: alpha(opacity=95);
                        box-shadow: 5px 5px 20px 0px #000;
                        color: #6e7070;
                    }
                    .searchJumperModify-title {
                        background: #458bd1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white!important;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 10px 10px 0 0;
                    }
                    .searchJumperModify-title>img {
                        margin: 5px;
                    }
                    .searchJumperModify-input-title {
                        font-size: 9pt;
                        font-family: Arial, sans-serif;
                        display: inline-block;
                        background-color: white;
                        position: relative;
                        left: 20px;
                        padding: 0px 4px;
                        text-align: left;
                        color: #646464;
                    }
                    .searchJumperModify-body>input[type=text],
                    .searchJumperModify-body>input[type=number],
                    .searchJumperModify-body>textarea {
                        resize: both;
                        font-size: 11pt;
                        font-weight: normal;
                        border-radius: 4px;
                        border: 1px solid rgba(0, 0, 0, 0.23);
                        margin: 4px;
                        font-family: inherit;
                        background-color: #FFF;
                        width: calc(100% - 17px);
                        color: #4A4A4A;
                        margin-top: -8px;
                        padding: 4px;
                        padding-top: 8px;
                        box-sizing: content-box;
                    }
                    .searchJumperModify-buttons {
                        text-align: center;
                        margin-bottom: 5px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .searchJumperModify-buttons>button {
                        width: 32%;
                        font-size: 16px;
                        cursor: pointer;
                        border: 1px solid #1976d2;
                        border-radius: 4px;
                        transition: all .3s;
                        color: #fff;
                        background-color: #458bd1;
                        line-height: 25px;
                    }
                    .searchJumperModify-buttons>button:hover {
                        color: #e3f2fd;
                    }
                    #rangePickerBtn {
                        width: 28px;
                        float: right;
                        margin-top: -33px;
                        margin-right: 4px;
                        position: sticky;
                        display: block;
                        cursor: pointer;
                        background: rgb(255 255 255 / 80%);
                    }
                    `;
                    this.modifyCssEle = _GM_addStyle(this.modifyCssText);
                    let modifyFrame = document.createElement("div");
                    this.modifyFrame = modifyFrame;
                    modifyFrame.id = "searchJumperModifyWord";
                    modifyFrame.innerHTML = createHTML(`
                     <div class="searchJumperModify-body">
                         <a href="${configPage}" class="searchJumperModify-title" target="_blank">
                             <img width="32px" height="32px" src=${logoBase64}>${i18n("modifyWord")}
                         </a>
                         <div class="searchJumperModify-input-title">${i18n("wordContent")}</div>
                         <input name="wordContent" type="text">
                         <div class="searchJumperModify-input-title">${i18n("wordHide")}</div>
                         <input name="wordHide" min="0" placeholder="${i18n("wordHideTips")}" type="number">
                         <div class="searchJumperModify-input-title">${i18n("wordRange")}</div>
                         <input name="wordRange" placeholder="#main" type="text">
                         <svg id="rangePickerBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("pickerBtn")}</title><path d="M874.048 533.333333C863.424 716.629333 716.629333 863.424 533.333333 874.048V917.333333a21.333333 21.333333 0 0 1-42.666666 0v-43.285333C307.370667 863.424 160.576 716.629333 149.952 533.333333H106.666667a21.333333 21.333333 0 0 1 0-42.666666h43.285333C160.576 307.370667 307.370667 160.576 490.666667 149.952V106.666667a21.333333 21.333333 0 0 1 42.666666 0v43.285333c183.296 10.624 330.090667 157.418667 340.714667 340.714667h42.816a21.333333 21.333333 0 1 1 0 42.666666H874.026667z m-42.752 0h-127.786667a21.333333 21.333333 0 0 1 0-42.666666h127.786667C820.778667 330.922667 693.056 203.221333 533.333333 192.704V320a21.333333 21.333333 0 0 1-42.666666 0V192.704C330.922667 203.221333 203.221333 330.944 192.704 490.666667H320a21.333333 21.333333 0 0 1 0 42.666666H192.704c10.517333 159.744 138.24 287.445333 297.962667 297.962667V704a21.333333 21.333333 0 0 1 42.666666 0v127.296c159.744-10.517333 287.445333-138.24 297.962667-297.962667zM512 554.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z"></path></svg>
                         <div class="searchJumperModify-input-title">${i18n("wordStyle")}</div>
                         <input name="wordStyle" placeholder="#333333;color:red;" type="text">
                         <div class="searchJumperModify-input-title">${i18n("wordTitle")}</div>
                         <textarea name="wordTitle" type="text"></textarea>
                         <div class="searchJumperModify-buttons">
                             <button id="cancel" type="button">${i18n("cancel")}</button>
                             <button id="modify" type="button">${i18n("modify")}</button>
                         </div>
                     </div>
                    `);
                    let cancelBtn = modifyFrame.querySelector("#cancel");
                    cancelBtn.addEventListener("click", e => {
                        if (modifyFrame.parentNode) {
                            modifyFrame.parentNode.removeChild(modifyFrame);
                        }
                    });
                    let rangePickerBtn = modifyFrame.querySelector("#rangePickerBtn");
                    rangePickerBtn.addEventListener("click", e => {
                        Picker.getInstance().getSelector(selector => {
                            wordRange.value = selector;
                            modifyFrame.style.display = '';
                        });
                        modifyFrame.style.display = 'none';
                    });
                    let modifyBtn = modifyFrame.querySelector("#modify");
                    this.modifyBtn = modifyBtn;
                    modifyBtn.addEventListener("click", e => {
                        let newWord = wordContent.value;
                        if (!newWord) return;
                        let contentChange = newWord !== this.modifyWord.content;
                        let hide = wordHide.value;
                        if (hide) {
                            if (this.splitSep) hide = hide.replaceAll(this.splitSep, "");
                            hide = hide >= 0 ? hide : 0;
                            newWord += `$p{${hide}}`;
                        }
                        let style = wordStyle.value;
                        if (style) {
                            if (this.splitSep) style = style.replaceAll(this.splitSep, "");
                            newWord += `$s{${style}}`;
                        }
                        let title = JSON.stringify(wordTitle.value).replace(/^"|"$/g, "");
                        if (title) {
                            if (this.splitSep) title = title.replaceAll(this.splitSep, "");
                            newWord += `$t{${title}}`;
                        }
                        let range = wordRange.value;
                        if (range) {
                            if (this.splitSep) range = range.replaceAll(this.splitSep, "");
                            if (range !== this.modifyWord.inRange) contentChange = true;
                            newWord += `$in{${range}}`;
                        }
                        if (this.addNew) {
                            this.searchJumperInPageInput.value = newWord;
                            this.submitInPageWords();
                        } else {
                            this.replaceWord(this.modifyWord, newWord, this.modifySpan, contentChange);
                        }
                        if (modifyFrame.parentNode) {
                            modifyFrame.parentNode.removeChild(modifyFrame);
                        }
                    });
                }
                let wordContent = this.modifyFrame.querySelector("[name='wordContent']"),
                wordStyle = this.modifyFrame.querySelector("[name='wordStyle']"),
                wordTitle = this.modifyFrame.querySelector("[name='wordTitle']"),
                wordRange = this.modifyFrame.querySelector("[name='wordRange']"),
                wordHide = this.modifyFrame.querySelector("[name='wordHide']");

                if (this.addNew) {
                    wordContent.value = "";
                    wordStyle.value = "";
                    wordRange.value = "";
                    wordHide.value = "";
                    wordTitle.value = "";
                    this.modifyBtn.innerText = i18n('add');
                } else {
                    this.modifyBtn.innerText = i18n('modify');
                    let style = "";
                    let styleReg = /\$s{(.*?)}($|\$)/;
                    let styleMatch = oriWord.match(styleReg);
                    if (styleMatch) {
                        style = styleMatch[1];
                    }

                    wordContent.value = word.content || "";
                    wordStyle.value = style || "";
                    wordRange.value = word.inRange || "";
                    if (typeof word.hideParent !== 'undefined') wordHide.value = word.hideParent;
                    try {
                        wordTitle.value = word.title !== word.content ? JSON.parse('"' + word.title + '"') : "";
                    } catch (e) {
                        debug(e);
                    }
                }
                if (!this.modifyCssEle || !this.modifyCssEle.parentNode) this.modifyCssEle = _GM_addStyle(this.modifyCssText);
                document.body.appendChild(this.modifyFrame);
            }

            replaceWord(word, newWord, modifySpan, contentChange) {
                if (contentChange) {
                    if (modifySpan.parentNode) modifySpan.parentNode.removeChild(modifySpan);
                    this.removeHighlightWord(word);
                    this.searchJumperInPageInput.value = newWord;
                    this.submitInPageWords();
                } else {
                    let title = "";
                    let style = "";
                    let hideParent = -1;
                    let titleReg = /\$t{(.*?)}($|\$)/;
                    let titleMatch = newWord.match(titleReg);
                    if (titleMatch) {
                        title = titleMatch[1];
                        title = JSON.parse('"' + title + '"');
                    }
                    word.title = title;
                    modifySpan.title = title;
                    let styleReg = /\$s{(.*?)}($|\$)/;
                    let styleMatch = newWord.match(styleReg);
                    if (styleMatch) {
                        styleMatch = styleMatch[1].match(/(.*?);(.*)/);
                        style = self.getHighlightStyle(this.curWordIndex, styleMatch[1], styleMatch[2]);
                        word.style = style;
                        modifySpan.style = style;
                    }
                    let hideChange = false;
                    let hideParentReg = /\$p{(.*?)}($|\$)/;
                    let hideParentMatch = newWord.match(hideParentReg);
                    if (hideParentMatch) {
                        hideParent = parseInt(hideParentMatch[1]) || 0;
                        hideChange = hideParent != word.hideParent;
                    } else hideChange = typeof word.hideParent !== 'undefined';

                    if (hideChange) {
                        [].forEach.call(document.querySelectorAll(".searchJumper-hide"), hide => {
                            if (hide.dataset.content === word.content) {
                                hide.classList.remove("searchJumper-hide");
                                hide.removeAttribute('data-content');
                            }
                        });
                    }

                    this.marks[word.content].forEach(mark => {
                        if (mark) {
                            mark.title = title;
                            if (style) mark.style = style;

                            if (hideChange && hideParent != -1) {
                                let parentDepth = hideParent;
                                let parent = mark.parentElement;
                                while(parentDepth-- > 0) {
                                    parent = parent.parentElement;
                                }
                                if (parent) {
                                    parent.dataset.content = word.content;
                                    parent.classList.add("searchJumper-hide");
                                }
                            }
                        }
                    });
                    if (hideParent == -1) {
                        delete word.hideParent;
                    } else word.hideParent = hideParent;
                    this.lockWords = this.lockWords.replace(word.oriWord, newWord);
                    word.oriWord = newWord;
                }
            }

            removeHighlightWord(word) {
                if (!this.lockWords) return;
                if (!this.splitSep) this.emptyInPageWords();
                if (!word.oriWord) return;
                if (this.lockWords.indexOf(word.oriWord) === -1) return;
                let preStr = this.lockWords.match(/^\$(c.|o)/);
                preStr = preStr ? preStr[0] : "";
                let targetArr = this.lockWords.replace(preStr, "").split(this.splitSep);
                let findIndex = targetArr.indexOf(word.oriWord);
                if (findIndex < 0) return;
                targetArr.splice(findIndex, 1);
                this.lockWords = preStr + targetArr.join(this.splitSep);
                delete this.highlightSpans[word.content];
                findIndex = this.curHighlightWords.indexOf(word);
                if (findIndex < 0) return;
                this.curHighlightWords.splice(findIndex, 1);

                this.marks[word.content].forEach(mark => {
                    if (mark.parentNode) {
                        let newNode = document.createTextNode(mark.innerText);
                        mark.parentNode.replaceChild(newNode, mark);
                        newNode.parentNode.normalize();
                    }
                });
                delete this.marks[word.content];
                let targetNav = this.navMarks.querySelector(`[data-content="${word.content}"]`);
                if (targetNav) targetNav.parentNode.removeChild(targetNav);
                this.searchJumperInPageInput.style.paddingLeft = this.searchInPageLockWords.clientWidth + 3 + "px";
            }

            emptyInPageWords() {
                this.searchInPageLockWords.innerHTML = createHTML();
                this.highlight("");
            }

            focusHighlightByText(text, fw, span) {
                let curList = this.marks[text];
                if (!curList || curList.length === 0) return;
                if (text != this.focusText) {
                    this.focusIndex = 0;
                    this.focusText = text;
                } else {
                    if (fw) {
                        if (this.focusIndex != curList.length - 1) {
                            this.focusIndex = this.focusIndex + 1;
                        } else this.focusIndex = 0;
                    } else {
                        if (this.focusIndex != 0) {
                            this.focusIndex = this.focusIndex - 1;
                        } else this.focusIndex = curList.length - 1;
                    }
                }
                this.focusHighlight(curList[this.focusIndex]);
                this.setHighlightSpan(span, this.focusIndex, curList.length);
            }

            focusHighlight(ele) {
                if (!ele) return;
                if (this.focusMark) this.focusMark.removeAttribute('data-current');
                setTimeout(() => {
                    ele.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    ele.dataset.current=true;
                }, 0);
                this.focusMark = ele;
                if (!this.wPosBar) {
                    this.wPosBar = document.createElement("div");
                    this.hPosBar = document.createElement("div");
                    this.wPosBar.className = "searchJumperPosBar searchJumperPosW";
                    this.hPosBar.className = "searchJumperPosBar searchJumperPosH";
                }
                if (!this.wPosBar.parentNode) {
                    document.body.appendChild(this.wPosBar);
                    document.body.appendChild(this.hPosBar);
                }

                this.wPosBar.style.top = getElementTop(ele) + "px";
                this.wPosBar.style.height = ele.offsetHeight + "px";

                this.hPosBar.style.left = getElementLeft(ele) + "px";
                this.hPosBar.style.width = ele.offsetWidth + "px";

                this.wPosBar.style.animationName = "";
                this.hPosBar.style.animationName = "";
                setTimeout(() => {
                    this.wPosBar.style.animationName = "fadeit";
                    this.hPosBar.style.animationName = "fadeit";
                }, 0);

            }

            getHighlightSpanByText(text) {
                return this.highlightSpans[text];
            }

            setHighlightSpan(span, index, len) {
                if (!span) return;
                let numEle = span.querySelector("em");
                if (!numEle) {
                    numEle = document.createElement("em");
                    span.insertBefore(numEle, span.firstChild);
                }
                index++;
                numEle.innerHTML = createHTML("[" + index + "/" + len + "]");
            }

            getHighlightStyle(index, background, addCssText) {
                if (!background && !addCssText) {
                    let setCss = searchData.prefConfig.inPageWordsStyles[index];
                    if (setCss) return setCss;
                }
                addCssText = addCssText || "";
                function geneRandomColor() {
                    let r, g, b;
                    r = Math.floor(256 * Math.random());
                    g = Math.floor(256 * Math.random());
                    b = Math.floor(256 * Math.random());
                    r = r.toString(16);
                    if (r.length === 1) r = "0" + r;
                    g = g.toString(16);
                    if (g.length === 1) g = "0" + g;
                    b = b.toString(16);
                    if (b.length === 1) b = "0" + b;
                    return "#" + r + g + b;
                }

                function getWordColor(bg) {
                    if (bg.indexOf("#") !== 0) return "";
                    if (bg === "#ffff00") return "";
                    bg = bg.substr(1);
                    let r, g, b;
                    r = parseInt(bg.substr(0, 2), 16);
                    g = parseInt(bg.substr(2, 2), 16);
                    b = parseInt(bg.substr(4, 2), 16);
                    let bgBrightness = r * 0.299 + g * 0.587 + b * 0.114;
                    r = 255 - r;
                    g = 255 - g;
                    b = 255 - b;

                    let wordBrightness = r * 0.299 + g * 0.587 + b * 0.114;
                    let diff = Math.abs(wordBrightness - bgBrightness);
                    if (diff <= 128) {
                        if (bgBrightness > 158) {
                            return "#000000";
                        } else {
                            return "#FFFFFF";
                        }
                    }
                    r = r.toString(16);
                    if (r.length === 1) r = "0" + r;
                    g = g.toString(16);
                    if (g.length === 1) g = "0" + g;
                    b = b.toString(16);
                    if (b.length === 1) b = "0" + b;
                    return "#" + r + g + b;
                }
                if (!background) {
                    background = searchData.prefConfig.firstFiveWordsColor[index];
                }
                if (!background) {
                    switch (index) {
                        case 0:
                            background = "";
                            break;
                        case 1:
                            background = "#e91e63";
                            break;
                        case 2:
                            background = "#00bcd4";
                            break;
                        case 3:
                            background = "#008000";
                            break;
                        case 4:
                            background = "#800080";
                            break;
                        default:
                            background = geneRandomColor();
                            break;
                    }
                }
                if (background) {
                    let color = getWordColor(background);
                    if (color) color = "color:" + color + ";";
                    background = `background:${background};${color}`;
                }
                return `${background}${addCssText}`;
            }

            highlight(words, ele, root) {
                if (!words && !this.curHighlightWords) return;
                if (!ele) {
                    this.highlight(words, document.body, root);
                    [].forEach.call(document.getElementsByTagName("iframe"), iframe => {
                        let iframeDoc;
                        try {
                            iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        } catch(e) {
                            return;
                        }
                        if (iframeDoc && iframeDoc.body) {
                            this.highlight(words, iframeDoc.body, root);
                        }
                    });
                    return;
                }
                ele = ele || document.body;
                let preEles = [];
                let searchingPre = false;
                let self = this;
                if (words === "") {
                    Object.values(this.marks).forEach(markList => {
                        if (!markList) return;
                        markList.forEach(mark => {
                            if (!mark.parentNode) return;
                            let newNode = document.createTextNode(mark.innerText);
                            mark.parentNode.replaceChild(newNode, mark);
                            newNode.parentNode.normalize();
                        });
                    });
                    [].forEach.call(ele.querySelectorAll(".searchJumper-hide"), hide => {
                        hide.classList.remove("searchJumper-hide");
                        hide.removeAttribute('data-content');
                    });
                    this.navMarks.innerHTML = createHTML();
                    this.marks = {};
                    this.curHighlightWords = [];
                    return;
                }
                if (words === "insert") {
                    words = this.curHighlightWords;
                    this.refreshNavMarks();
                } else {
                    this.curHighlightWords = (this.curHighlightWords || []).concat(words);
                }
                function searchWithinNode(node, word) {
                    let len, pos = -1, skip, spannode, middlebit, middleclone;
                    skip = 0;
                    if (node.nodeType == 3 && (node.parentNode.tagName == "BODY" || node.parentNode.offsetParent || (node.parentNode.scrollHeight && node.parentNode.scrollWidth))) {
                        if (word.isRe) {
                            let wordMatch = node.data.match(new RegExp(word.content, word.reCase));
                            if (wordMatch) {
                                let content = wordMatch[0] || wordMatch;
                                len = content.length;
                                pos = node.data.indexOf(content);
                            }
                        } else {
                            len = word.content.length;
                            pos = node.data.toUpperCase().indexOf(word.content.toUpperCase());
                        }
                        if (pos >= 0) {
                            if (typeof word.hideParent !== 'undefined') {
                                let parentDepth = word.hideParent;
                                let parent = node.parentElement;
                                while(parentDepth-- > 0) {
                                    parent = parent.parentElement;
                                }
                                if (parent) {
                                    parent.dataset.content = word.content;
                                    parent.classList.add("searchJumper-hide");
                                }
                            }
                            let curList = self.marks[word.content];
                            let index = curList.length;
                            spannode = document.createElement("mark");
                            spannode.className = "searchJumper";
                            if (word.title) spannode.title = JSON.parse('"' + word.title + '"');
                            spannode.style.cssText = word.style;
                            spannode.addEventListener("click", e => {
                                if (!e.altKey) return;
                                e.stopPropagation();
                                e.preventDefault();
                                return false;
                            });
                            spannode.dataset.content = word.content;
                            spannode.addEventListener("mousedown", e => {
                                if (!e.altKey) return;
                                let target;
                                if (e.which === 1 ) {
                                    if (index != curList.length - 1) {
                                        self.focusIndex = index + 1;
                                    } else self.focusIndex = 0;
                                } else if (e.which === 3){
                                    if (index != 0) {
                                        self.focusIndex = index - 1;
                                    } else self.focusIndex = curList.length - 1;
                                }
                                target = curList[self.focusIndex];
                                self.focusHighlight(target);
                                self.setHighlightSpan(self.getHighlightSpanByText(word.content), self.focusIndex, curList.length);
                                self.focusText = word.content;
                            });
                            middlebit = node.splitText(pos);
                            middlebit.splitText(len);
                            middleclone = middlebit.cloneNode(true);
                            spannode.appendChild(middleclone);
                            middlebit.parentNode.replaceChild(spannode, middlebit);
                            self.marks[word.content].push(spannode);

                            let navMark = document.createElement("span");
                            let top = getElementTop(spannode);
                            navMark.dataset.top = top;
                            navMark.dataset.content = word.content;
                            navMark.style.top = top / document.documentElement.scrollHeight * 100 + "vh";
                            navMark.style.background = spannode.style.background || "yellow";
                            navMark.addEventListener("click", e => {
                                e.stopPropagation();
                                e.preventDefault();
                                self.focusIndex = index;
                                self.focusHighlight(spannode);
                                self.setHighlightSpan(self.getHighlightSpanByText(word.content), index, curList.length);
                                self.navMarks.appendChild(self.navPointer);
                                self.navPointer.style.top = navMark.style.top;
                                return false;
                            }, true);
                            self.navMarks.appendChild(navMark);

                            skip = 1;
                        }
                    } else if ((!root || node === ele) &&
                               node.nodeType == 1 &&
                               node.childNodes &&
                               node.tagName != "SCRIPT" &&
                               node.tagName != "STYLE" &&
                               node.tagName != "TEXTAREA" &&
                               node.tagName != "MARK") {
                        if (!searchingPre && (node.tagName === "PRE" || node.tagName === "CODE")) {
                            preEles.push(node);
                        } else {
                            for (var child = 0; child < node.childNodes.length; ++child) {
                                child = child + searchWithinNode(node.childNodes[child], word);
                            }
                        }
                    }
                    return skip;
                }
                words.forEach(w => {
                    if (!self.marks[w.content]) {
                        self.marks[w.content] = [];
                    }
                    if (w.inRange) {
                        [].forEach.call(ele.querySelectorAll(w.inRange), e => {
                            searchWithinNode(e, w);
                        })
                    } else searchWithinNode(ele, w);
                });
                setTimeout(() => {
                    searchingPre = true;
                    words.forEach(w => {
                        preEles.forEach(e => {
                            searchWithinNode(e, w);
                        });
                    });
                }, 500);
                if (this.navMarks.innerHTML != "") {
                    this.searchJumperNavBar.classList.add("show");
                }
            }

            refreshPageWords() {
                this.lockWords = "";
                this.searchJumperInPageInput.value = "";
                this.searchInPageLockWords.innerHTML = createHTML();
                this.searchJumperInPageInput.style.paddingLeft = "";
                this.submitInPageWords();
                if (globalInPageWords) {
                    this.searchJumperInPageInput.value = globalInPageWords;
                    this.submitInPageWords();
                    this.appendBar();
                }
            }

            refreshNav() {
                this.setNav(navEnable);
            }

            refreshNavMarks() {
                if (this.refreshNavMarksTimer) clearTimeout(this.refreshNavMarksTimer);
                this.refreshNavMarksTimer = setTimeout(() => {
                    [].forEach.call(this.navMarks.querySelectorAll("span"), m => {
                        m.style.top = m.dataset.top / document.documentElement.scrollHeight * 100 + "vh";
                    });
                }, 500);
            }

            checkCharacterData(target) {
                this.highlight("insert", target, true);
            }

            removeMark(removedNode) {
                let content = removedNode.dataset.content;
                let markList = this.marks[content];
                if (!markList) return;
                var index = markList.indexOf(removedNode);
                if (index === -1) return;
                markList.splice(index, 1);
                this.marks[content] = markList;
                let navMark = this.navMarks.querySelectorAll(`span[data-content="${content}"]`)[index];
                if (navMark) this.navMarks.removeChild(navMark);
            }

            submitIgnoreSpace(value) {
                if (!value) return;
                if (!this.lockWords && value.indexOf("$c") !== 0 && value.indexOf("$o") !== 0 && value.indexOf(" ") !== -1) {
                    this.splitSep = "◎";
                    value = "$c" + this.splitSep + value;
                }
                this.searchJumperInPageInput.value = value;
                this.submitInPageWords();
            }

            showAllSites() {
                if (!this.bar.parentNode || !this.bar.parentNode.parentNode || this.bar.parentNode.classList.contains("search-jumper-showall")) return;
                let self = this;
                this.bar.parentNode.classList.add("search-jumper-showall");
                searchTypes.forEach(type => {
                    if (type.style.display != 'none') {
                        let sitelist = type.querySelector('.sitelist');
                        if (sitelist) self.alllist.appendChild(sitelist);
                    }
                });
                this.historySiteBtns.slice(0, 10).forEach(btn => {
                    self.historylist.appendChild(btn);
                });
                let kw = getKeywords();
                this.showallInput.value = kw;
                setTimeout(() => {
                    let mouseHandler = e => {
                        if (e.target.id === 'search-jumper-alllist' || e.target.className === 'search-jumper-showallBg' || e.target.className === 'search-jumper-historylist') {
                            document.removeEventListener("mousedown", mouseHandler);
                            self.bar.parentNode.classList.remove("search-jumper-showall");
                            self.showallInput.value = "";
                            self.historySiteBtns.slice(0, 10).forEach(btn => {
                                for (let i = 0; i < searchTypes.length; i++) {
                                    let typeBtn = searchTypes[i];
                                    if (typeBtn.dataset.type == btn.dataset.type) {
                                        if (btn.dataset.id) {
                                            typeBtn.insertBefore(btn, typeBtn.children[parseInt(btn.dataset.id) + 1]);
                                        } else typeBtn.insertBefore(btn, typeBtn.children[1]);
                                        break;
                                    }
                                }
                            });
                            self.bar.style.display = "";
                            self.initPos(
                                searchData.prefConfig.position.x,
                                searchData.prefConfig.position.y,
                                searchData.prefConfig.offset.x,
                                searchData.prefConfig.offset.y
                            );
                        }
                    };
                    document.addEventListener("mousedown", mouseHandler);
                    this.showallInput.focus();
                }, 0);
            }

            showSearchInput() {
                if (this.bar.parentNode && this.bar.parentNode.classList.contains("search-jumper-showall")) return;
                let selectStr = getSelectStr();
                this.recoveHistory();
                this.bar.parentNode.classList.add("in-input");
                this.searchInput.value = "";
                if (this.filterSitesTab.checked) {
                    this.searchInput.focus();
                    if (!this.initShowPicker && searchData.prefConfig.defaultPicker) {
                        this.initShowPicker = true;
                        this.pickerBtn.classList.toggle("checked");
                        Picker.getInstance().toggle();
                    }
                    if (this.bar.classList.contains("search-jumper-isInPage")) {
                        //this.lockSearchInput("*");
                        this.searchJumperInputKeyWords.value = selectStr;
                        //this.searchJumperInputKeyWords.focus();
                    } else if (!this.searchJumperInputKeyWords.value && currentSite) {
                        this.searchJumperInputKeyWords.value = getKeywords();
                        this.searchJumperInputKeyWords.focus();
                    }
                } else if (this.searchInPageTab.checked) {
                    this.searchJumperInPageInput.focus();
                    if (!this.searchJumperInPageInput.value) {
                        this.submitIgnoreSpace(selectStr);
                    }
                }
                searchTypes.forEach(type => {
                    type.classList.remove("input-hide");
                });
                this.allSiteBtns.forEach(btn => {
                    btn.classList.remove("input-hide");
                });
                this.allListBtns.forEach(listItem => {
                    listItem.classList.remove("input-hide");
                });
                this.inInput = true;
                if (this.lockWords) this.searchJumperInPageInput.style.paddingLeft = this.searchInPageLockWords.clientWidth + 3 + "px";
                if (searchData.prefConfig.altToHighlight) {
                    document.removeEventListener("mouseup", this.checkSelHandler);
                    document.addEventListener("mouseup", this.checkSelHandler);
                }
            }

            hideSearchInput() {
                this.inInput = false;
                this.bar.parentNode.classList.remove("in-input");
                this.bar.parentNode.classList.remove("lock-input");
                this.searchInput.value = "";
                this.searchJumperInputKeyWords.value = "";
                this.pickerBtn.classList.remove("checked");
                Picker.getInstance().close();
                document.removeEventListener("mouseup", this.checkSelHandler);
                let openType = this.bar.querySelector('.search-jumper-type:not(.search-jumper-hide)>span');
                if (openType) {
                    openType.onmousedown();
                }
            }

            removeBar() {
                if (this.bar.parentNode.parentNode) {
                    this.bar.parentNode.parentNode.removeChild(this.bar.parentNode);
                }
            }

            appendBar() {
                if (!this.bar.parentNode.parentNode) {
                    document.documentElement.appendChild(this.bar.parentNode);
                    let minSize = Math.min(this.bar.parentNode.offsetWidth, this.bar.parentNode.offsetHeight);
                    if (minSize > 500) {
                        this.removeBar();
                    }
                }
            }

            searchBySiteName(siteName, e) {
                for (let i = 0; i < this.allSiteBtns.length; i++) {
                    let siteBtn = this.allSiteBtns[i];
                    if (siteBtn.dataset.name == siteName) {
                        let mouseDownEvent = new PointerEvent("mousedown", {altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey})
                        siteBtn.dispatchEvent(mouseDownEvent);
                        if (!this.customInput) {
                            if (siteBtn.onclick) {
                                siteBtn.onclick(e);
                            } else {
                                siteBtn.click();
                            }
                        }
                        return;
                    }
                }
            }

            autoGetFirstType() {
                if (!targetElement) targetElement = document.body;
                let firstType;
                switch (targetElement.tagName) {
                    case 'IMG':
                        firstType = this.bar.querySelector('.search-jumper-targetImg:not(.notmatch)');
                        break;
                    case 'AUDIO':
                        firstType = this.bar.querySelector('.search-jumper-targetAudio:not(.notmatch)');
                        break;
                    case 'VIDEO':
                        firstType = this.bar.querySelector('.search-jumper-targetVideo:not(.notmatch)');
                        break;
                    case 'A':
                        if (getSelectStr()) {
                            firstType = this.bar.querySelector('.search-jumper-needInPage:not(.notmatch)');
                        } else {
                            firstType = this.bar.querySelector('.search-jumper-targetLink:not(.notmatch)');
                        }
                        break;
                    default:
                        if (getSelectStr()) {
                            firstType = this.bar.querySelector('.search-jumper-needInPage:not(.notmatch)');
                        } else if (targetElement.parentNode.tagName === 'A') {
                            firstType = this.bar.querySelector('.search-jumper-targetLink:not(.notmatch)');
                        } else {
                            firstType = this.bar.querySelector('.search-jumper-targetPage:not(.notmatch)');
                        }
                        break;
                }
                if (!firstType) firstType = this.bar.querySelector('.search-jumper-type');
                return firstType;
            }

            searchAuto(index, e) {
                if (!index) index = 0;
                let firstType = this.autoGetFirstType();
                let targetSite = firstType.querySelector(`a.search-jumper-btn:nth-of-type(${index + 1})`);
                this.searchBySiteName(targetSite.dataset.name, e);
            }

            setNav(enable) {
                if (enable != navEnable) {
                    storage.setItem("navEnable", enable || "");
                }
                if (enable) {
                    this.locBtn.classList.add("checked");
                    this.searchJumperNavBar.style.display = "";
                } else {
                    this.locBtn.classList.remove("checked");
                    this.searchJumperNavBar.style.display = "none";
                    if (this.navPointer.parentNode) this.navPointer.parentNode.removeChild(this.navPointer);
                }
            }

            lockSearchInput(lockWords) {
                this.lockSiteKeywords = true;
                this.searchLockInput.innerText = lockWords;
                this.bar.parentNode.classList.add("lock-input");
                this.searchInput.value = "";
                this.searchInput.style.paddingLeft = `${15 + this.searchLockInput.scrollWidth}px`;
                this.searchInput.placeholder = i18n("inputKeywords");
            }

            async initRun() {
                let self = this;
                this.customInput = false;
                this.fontPool = [];
                this.allSiteBtns = [];
                this.allListBtns = [];
                this.bar.style.visibility = "hidden";
                let sitesNum = 0;
                let bookmarkTypes = [];
                this.checkSelHandler = e => {
                    if (!e.altKey) return;
                    if (this.searchInPageTab.checked && window.getSelection().toString()) {
                        this.showSearchInput();
                    }
                };

                //Search in page
                this.splitSep = " ";
                this.lockWords = "";
                this.marks = {};
                this.initInPageWords = [];
                this.highlightSpans = {};
                this.curHighlightWords = [];
                this.curWordIndex = 0;
                this.navPointer = document.createElement("div");
                this.navPointer.className = "navPointer";
                this.navPointer.innerHTML = createHTML(">");
                let editFunc = () => {
                    this.searchJumperInPageInput.focus();
                    this.highlight("");
                    let words = this.lockWords.trim();
                    if (!words) {
                        this.submitInPageWords();
                        return;
                    }
                    if (this.searchJumperInPageInput.value) words += this.splitSep + this.searchJumperInPageInput.value;
                    this.lockWords = "";
                    this.searchJumperInPageInput.value = words;
                    this.searchInPageLockWords.innerHTML = createHTML();
                    this.searchJumperInPageInput.style.paddingLeft = "";
                };
                document.addEventListener("keydown", e => {
                    if (e.keyCode === 27) {
                        if (this.inInput) {
                            this.hideSearchInput();
                        } else {
                            this.highlight("");
                        }
                    }
                });
                this.searchJumperInPageInput.addEventListener("keydown", e => {
                    switch(e.keyCode) {
                        case 8://退格
                            if (!this.searchJumperInPageInput.value) {
                                editFunc();
                            }
                            break;
                        case 9://tab
                            e.stopPropagation();
                            e.preventDefault();
                            this.filterSitesTab.checked = true;
                            this.searchInput.focus();
                            break;
                        case 13://回车
                            {
                                let spans = this.submitInPageWords();
                                if (spans && spans.length > 0) {
                                    let lastSpan = spans.pop();
                                    var mouseEvent = new PointerEvent("mousedown", {which: 1});
                                    lastSpan.dispatchEvent(mouseEvent);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                });
                this.editBtn.addEventListener("click", e => {
                    editFunc();
                });
                this.addWord.addEventListener("click", e => {
                    this.showModifyWindow();
                });
                this.searchInPageTab.addEventListener("change", e => {
                    this.initSetInPageWords();
                });
                if (globalInPageWords) {
                    this.recoverBtn.addEventListener("click", e => {
                        this.lockWords = "";
                        this.searchJumperInPageInput.value = globalInPageWords;
                        this.searchInPageLockWords.innerHTML = createHTML();
                        this.highlight("");
                        this.submitInPageWords();
                        this.searchJumperInPageInput.focus();
                    });
                    this.pinBtn.classList.add("checked");
                } else {
                    this.recoverBtn.style.display = "none";
                }
                this.pinBtn.addEventListener("click", e => {
                    this.submitInPageWords();
                    if (this.pinBtn.classList.contains("checked")) {
                        storage.setItem("globalInPageWords", "");
                        this.pinBtn.classList.remove("checked");
                    } else if (this.lockWords) {
                        storage.setItem("globalInPageWords", this.lockWords);
                        this.pinBtn.classList.add("checked");
                    }
                });
                this.saveRuleBtn.addEventListener("click", e => {
                    if (!this.lockWords) return;
                    let inPageRule = searchData.prefConfig.inPageRule || {};
                    inPageRule[location.href] = this.lockWords;
                    searchData.prefConfig.inPageRule = inPageRule;
                    storage.setItem("searchData", searchData);
                    _GM_notification(i18n("save completed"));
                });
                this.emptyBtn.addEventListener("click", e => {
                    this.lockWords = "";
                    this.searchJumperInPageInput.value = "";
                    this.searchInPageLockWords.innerHTML = createHTML();
                    this.searchJumperInPageInput.style.paddingLeft = "";
                    this.submitInPageWords();
                    this.searchJumperInPageInput.focus();
                });
                this.copyInPageBtn.addEventListener("click", e => {
                    if (!this.lockWords) return;
                    _GM_setClipboard(this.lockWords);
                    _GM_notification('Copied successfully!');
                });
                this.setNav(navEnable);
                this.locBtn.addEventListener("click", e => {
                    this.setNav(!this.locBtn.classList.contains("checked"));
                });
                this.closeNavBtn.addEventListener("click", e => {
                    this.setNav(false);
                });
                this.navMarks.addEventListener("click", e => {
                    let topPercent = e.offsetY / this.navMarks.clientHeight * 100;
                    let sortedMarks = [].slice.call(this.navMarks.querySelectorAll("span"));
                    sortedMarks.sort((a, b) => {
                        a = parseFloat(a.style.top);
                        b = parseFloat(b.style.top);
                        if (a > b) return 1;
                        if (a < b) return -1;
                        return 0;
                    });
                    let mark;
                    for (let i = 0; i < sortedMarks.length; i++) {
                        mark = sortedMarks[i];
                        let markTop = parseFloat(mark.style.top);
                        if (markTop > topPercent) {
                            if (i > 0) {
                                let preMark = sortedMarks[i - 1];
                                let preMarkTop = parseFloat(preMark.style.top);
                                if (markTop - topPercent > topPercent - preMarkTop) {
                                    mark = preMark;
                                }
                            }
                            break;
                        }
                    }
                    mark.click();
                });
                //Search in page

                this.searchJumperExpand.addEventListener("click", e => {
                    let typeEle = this.searchJumperExpand.parentNode;
                    typeEle.classList.remove('not-expand');
                    let leftRight = this.bar.parentNode.classList.contains("search-jumper-left") ||
                        this.bar.parentNode.classList.contains("search-jumper-right");
                    typeEle.removeChild(this.searchJumperExpand);
                    let scrollSize = Math.max(typeEle.scrollWidth, typeEle.scrollHeight) + 5 + "px";
                    if (leftRight) {
                        typeEle.style.height = scrollSize;
                        typeEle.style.width = "";
                    } else {
                        typeEle.style.width = scrollSize;
                        typeEle.style.height = "";
                    }
                    setTimeout(() => {
                        self.checkScroll();
                    }, 251);
                });
                this.pickerBtn.addEventListener("click", e => {
                    this.searchJumperInputKeyWords.value = "";
                    this.pickerBtn.classList.toggle("checked");
                    Picker.getInstance().toggle();
                });
                this.maxEleBtn.addEventListener("click", e => {
                    Picker.getInstance().expand();
                });
                this.minEleBtn.addEventListener("click", e => {
                    Picker.getInstance().collapse();
                });
                this.copyEleBtn.addEventListener("click", e => {
                    Picker.getInstance().copy();
                });
                for (let siteConfig of searchData.sitesConfig) {
                    let isBookmark = siteConfig.bookmark || siteConfig.sites.length > 100 || (/^BM/.test(siteConfig.type) && siteConfig.icon === "bookmark");
                    if (isBookmark) {
                        bookmarkTypes.push(siteConfig);
                        continue;
                    }
                    await this.createType(siteConfig);
                    sitesNum += siteConfig.sites.length;
                    if (sitesNum > 500) {
                        await sleep(1);
                        sitesNum = 0;
                    }
                }
                this.initHistorySites();
                this.initSort();
                this.bar.style.visibility = "";
                this.bar.style.display = "none";
                this.searchInPageRule();
                if (currentSite && /%s\b/.test(currentSite.url)) {
                    this.inSearchEngine();
                }
                if (this.fontPool.length > 0 || isInConfigPage()) {
                    let linkEle = document.createElement("link");
                    linkEle.rel="stylesheet";
                    linkEle.href = searchData.prefConfig.fontAwesomeCss || "https://lib.baomitu.com/font-awesome/6.1.2/css/all.css";
                    document.documentElement.insertBefore(linkEle, document.documentElement.children[0]);
                    waitForFontAwesome(() => {
                        let hasFont = false;
                        this.fontPool.forEach(font => {
                            font.innerText = '';
                            font.style.fontSize = '';
                            font.style.color = '';
                            hasFont = true;
                            cacheFontPool.unshift(font);
                        });
                        if (hasFont) {
                            setTimeout(() => {cacheFontManager()}, 5000);
                        }
                    });
                }
                cacheImgManager();

                this.bar.addEventListener('mouseenter', e => {
                    if (this.hideTimeout) {
                        clearTimeout(this.hideTimeout);
                    }
                    this.checkScroll(true);
                }, false);
                this.bar.addEventListener('mouseleave', e => {
                    this.waitForHide();
                }, false);

                if (lastSign && lastSign !== 0) {
                    this.batchOpen(lastSign, {which: 3});
                }
                lastSign = 0;
                let inputTimer;
                this.inInput = false;
                this.searchInput.addEventListener("input", e => {
                    clearTimeout(inputTimer);
                    inputTimer = setTimeout(() => self.searchSiteBtns(), 500);
                });
                this.searchInput.addEventListener("keydown", e => {
                    switch(e.keyCode) {
                        case 9:
                            if (e.shiftKey) {
                                e.stopPropagation();
                                e.preventDefault();
                                this.searchInPageTab.checked = true;
                                this.searchJumperInPageInput.focus();
                                this.initSetInPageWords();
                            }
                            break;
                        case 13://回车
                            this.searchJumperInputKeyWords.focus();
                            break;
                        case 8://退格
                            /*if (self.lockSiteKeywords && !self.searchInput.value) {
                                self.searchInput.value = self.searchLockInput.innerText;
                                self.searchLockInput.innerText = "";
                                self.lockSiteKeywords = false;
                                self.bar.parentNode.classList.remove("lock-input");
                                self.searchInput.style.paddingLeft = "";
                                self.searchInput.placeholder = i18n("inputPlaceholder");
                            }*/
                            break;
                        default:
                            break;
                    }
                });
                this.searchJumperInputKeyWords.addEventListener("keydown", e => {
                    switch(e.keyCode) {
                        case 9:
                            if (!e.shiftKey) {
                                e.stopPropagation();
                                e.preventDefault();
                                this.searchInPageTab.checked = true;
                                this.searchJumperInPageInput.focus();
                                this.initSetInPageWords();
                            }
                            break;
                        case 13://回车
                            {
                                clearTimeout(inputTimer);
                                let siteEle, forceTarget = "";
                                if (currentSite && !self.searchInput.value) {
                                    siteEle = self.bar.querySelector(".search-jumper-btn.current");
                                    forceTarget = "_self";
                                } else {
                                    siteEle = self.bar.querySelector(".search-jumper-type:not(.search-jumper-hide)>a.search-jumper-btn:not(.input-hide)") || self.bar.querySelector("a.search-jumper-btn:not(.input-hide)");
                                    forceTarget = "_blank";
                                }
                                if (siteEle) {
                                    self.openSiteBtn(siteEle, forceTarget);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                });
                this.closeBtn.addEventListener("mousedown", e => {
                    self.hideSearchInput();
                });

                let startLeft = window.innerWidth / 2;
                let startBottom;
                let halfContainerWidth = 0.4 * window.innerWidth;
                let currentGroup, startX, startY;

                let clientX = e => {
                    if (e.type.indexOf('mouse') === 0) {
                        return e.clientX;
                    } else {
                        return e.changedTouches[0].clientX;
                    }
                };

                let clientY = e => {
                    if (e.type.indexOf('mouse') === 0) {
                        return e.clientY;
                    } else {
                        return e.changedTouches[0].clientY;
                    }
                };


                let grabMouseupHandler = e => {
                    document.removeEventListener("mouseup", grabMouseupHandler);
                    document.removeEventListener("mousemove", grabMousemoveHandler);
                    document.removeEventListener("touchend", grabMouseupHandler);
                    document.removeEventListener("touchmove", grabMousemoveHandler);
                    currentGroup.style.cursor = "";
                    startLeft += clientX(e) - startX;
                    startBottom -= clientY(e) - startY;
                };
                let grabMousemoveHandler = e => {
                    let left = startLeft + clientX(e) - startX;
                    self.searchInputDiv.style.top = 'unset';
                    self.searchInputDiv.style.left = left + "px";
                    self.searchInputDiv.style.bottom = startBottom - (clientY(e) - startY) + "px";
                    if (left > window.innerWidth / 2) {
                        let maxWidth = window.innerWidth - left + halfContainerWidth - 50;
                        self.searchInputDiv.style.maxWidth = maxWidth + "px";
                    } else {
                        let maxWidth = left + halfContainerWidth;
                        if (left < halfContainerWidth) {
                            left += halfContainerWidth - left;
                            self.searchInputDiv.style.left = left + "px";
                        }
                        self.searchInputDiv.style.maxWidth = maxWidth + "px";
                    }
                    e.stopPropagation();
                    e.preventDefault();
                };

                let setStartBottom = () => {
                    if (!startBottom) startBottom = self.bar.parentNode.classList.contains('search-jumper-bottom') ? window.innerHeight * 0.95 - 60 : window.innerHeight * 0.03;
                };

                let touchStart = false;
                this.searchInputDiv.addEventListener("touchstart", e => {
                    touchStart = true;
                    if (e.target.className === 'inputGroup' || e.target.tagName === 'LABEL') {
                        setStartBottom();
                        currentGroup = e.target;
                        currentGroup.style.cursor = "grabbing";
                        startX = clientX(e);
                        startY = clientY(e);
                        document.addEventListener("touchend", grabMouseupHandler);
                        document.addEventListener("touchmove", grabMousemoveHandler);
                    }
                });

                this.searchInputDiv.addEventListener("mousedown", e => {
                    if (touchStart) {
                        touchStart = false;
                        return;
                    }
                    if (e.target.className === 'inputGroup' || e.target.tagName === 'LABEL') {
                        setStartBottom();
                        currentGroup = e.target;
                        currentGroup.style.cursor = "grabbing";
                        startX = e.clientX;
                        startY = e.clientY;
                        document.addEventListener("mouseup", grabMouseupHandler);
                        document.addEventListener("mousemove", grabMousemoveHandler);
                    }
                });
                let initWidth, initX;
                let sizeChangeMouseMove = e => {
                    let width = e.clientX - initX + initWidth + 20;
                    this.searchInputDiv.style.width = width + "px";
                };
                let sizeChangeMouseUp = e => {
                    document.removeEventListener("mousemove", sizeChangeMouseMove);
                    document.removeEventListener("mouseup", sizeChangeMouseUp);
                };
                this.rightSizeChange.addEventListener("mousedown", e => {
                    initX = e.clientX;
                    initWidth = this.searchInput.clientWidth * 2 + 2;
                    document.addEventListener("mousemove", sizeChangeMouseMove);
                    document.addEventListener("mouseup", sizeChangeMouseUp);
                    e.stopPropagation();
                    e.preventDefault();
                });

                let dragSiteBtn;
                let dragOpenDropHandler = e => {
                    if (!this.bar.contains(e.target)){
                        let isPage = /^(https?|ftp):/.test(dragSiteBtn.href);
                        if (isPage) {
                            dragSiteBtn.setAttribute("target", "_blank");
                        }
                        if (!this.customInput || this.batchOpening) {
                            if (dragSiteBtn.onclick || !isPage) {
                                dragSiteBtn.click();
                            } else {
                                _GM_openInTab(dragSiteBtn.href, {active: false});
                            }
                        }
                        dragSiteBtn.setAttribute("target", dragSiteBtn.dataset.target==1?"_blank":"");
                    }
                    document.body.removeEventListener('dragover', dragOpenOverHandler);
                    document.removeEventListener('drop', dragOpenDropHandler);
                    document.removeEventListener('dragover', dragOpenOverHandler);
                };
                let dragOpenOverHandler = e => {
                    e.preventDefault();
                };
                let dragOpenEndHandler = e => {
                    document.body.removeEventListener('dragover', dragOpenOverHandler);
                    document.removeEventListener('drop', dragOpenDropHandler);
                    document.removeEventListener('dragover', dragOpenOverHandler);
                };
                this.bar.addEventListener("dragstart", e => {
                    let target = e.target;
                    let parentNode = target.parentNode;
                    if (target.tagName !== 'IMG' && target.tagName !== 'A') return;
                    if (target.classList && target.classList.contains('search-jumper-btn')) {
                        dragSiteBtn = target;
                        document.body.addEventListener('dragover', dragOpenOverHandler);
                        document.addEventListener('drop', dragOpenDropHandler);
                        document.addEventListener('dragend', dragOpenEndHandler);
                    } else if (parentNode && parentNode.classList && parentNode.classList.contains('search-jumper-btn')) {
                        dragSiteBtn = parentNode;
                        document.body.addEventListener('dragover', dragOpenOverHandler);
                        document.addEventListener('drop', dragOpenDropHandler);
                        document.addEventListener('dragend', dragOpenEndHandler);
                    }
                }, true);

                sitesNum = 0;
                let hasCurrent = currentSite !== false;
                for (let siteConfig of bookmarkTypes) {
                    await this.createType(siteConfig);
                    sitesNum += siteConfig.sites.length;
                    if (sitesNum > 200) {
                        await sleep(1);
                        sitesNum = 0;
                    }
                }
                if (!hasCurrent && currentSite && /%s\b/.test(currentSite.url)) {
                    this.inSearchEngine();
                } else if (!currentSite && window.top == window.self) {
                    this.checkSearchJump();
                }
                if (inMinMode || (this.bar.style.display === "none" && !navEnable)) {
                    this.removeBar();
                }
            }

            waitForHide(delay) {
                let self = this;
                var hideHandler = () => {
                    self.bar.classList.remove("search-jumper-isInPage");
                    self.bar.classList.remove("search-jumper-isTargetImg");
                    self.bar.classList.remove("search-jumper-isTargetAudio");
                    self.bar.classList.remove("search-jumper-isTargetVideo");
                    self.bar.classList.remove("search-jumper-isTargetLink");
                    self.bar.classList.remove("search-jumper-isTargetPage");
                    self.bar.classList.remove("initShow");
                    //self.recoveHistory();
                    if (searchData.prefConfig.autoClose) {
                        let openType = this.bar.querySelector('.search-jumper-type:not(.search-jumper-hide)>span');
                        if (openType) {
                            openType.onmousedown();
                        }
                    }
                    if ((!currentSite && searchData.prefConfig.autoHideAll) || self.bar.classList.contains("funcKeyCall")) {
                        self.bar.classList.remove("funcKeyCall");
                        self.bar.style.display = 'none';
                    }
                    this.hideTimeout = null;
                };
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                }
                let delayTime = delay || (this.bar.classList.contains("funcKeyCall") ? 300 : (searchData.prefConfig.autoDelay || 1000));

                this.hideTimeout = setTimeout(hideHandler, delayTime);
                if (this.preList) {
                    this.preList.style.visibility = "hidden";
                }
            }

            setInPageWords(inPageWords) {
                this.initInPageWords.push(inPageWords);
                this.searchInPageTab.checked = true;
                if (document.readyState == "loading") {
                    let loadHandler = e => {
                        document.removeEventListener("DOMContentLoaded", loadHandler);
                        if (document.body.style.display === "none") document.body.style.display = "";
                        let word = this.initInPageWords.shift();
                        while (word) {
                            this.searchJumperInPageInput.value = word;
                            this.submitInPageWords(true);
                            word = this.initInPageWords.shift();
                        }
                    };
                    document.addEventListener("DOMContentLoaded", loadHandler);
                } else {
                    if (document.body.style.display === "none") document.body.style.display = "";
                    let word = this.initInPageWords.shift();
                    while (word) {
                        this.searchJumperInPageInput.value = word;
                        this.submitInPageWords(true);
                        word = this.initInPageWords.shift();
                    }
                }
            }

            searchInPageRule() {
                if (searchData.prefConfig.inPageRule) {
                    let keys = Object.keys(searchData.prefConfig.inPageRule);
                    for (let i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        if (!key) continue;
                        if (this.globMatch(key, location.href)) {
                            let rule = searchData.prefConfig.inPageRule[key];
                            if (!rule) continue;
                            this.setInPageWords(rule);
                            break;
                        }
                    }
                }
            }

            checkSearchJump() {
                let inPageWords;
                if (searchData.prefConfig.showInSearchJumpPage && referrer) {
                    if (document.referrer.indexOf(referrer) != -1) {
                        inPageWords = cacheKeywords;
                        try {
                            inPageWords = decodeURIComponent(inPageWords);
                        } catch (e) {}
                        //storage.setItem("referrer", location.hostname);
                    } else {
                        //storage.setItem("referrer", "");
                    }
                }
                inPageWords = inPageWords || globalInPageWords;
                if (inPageWords) {
                    this.setInPageWords(inPageWords);
                }
            }

            inSearchEngine() {
                if (!searchData.prefConfig.hideOnSearchEngine) {
                    this.bar.style.display = "";
                    this.initPos(
                        searchData.prefConfig.position.x,
                        searchData.prefConfig.position.y,
                        searchData.prefConfig.offset.x,
                        searchData.prefConfig.offset.y
                    );
                }
                this.insertHistory(this.currentType);
                let inPageWords = searchData.prefConfig.showInSearchEngine ? getKeywords() : globalInPageWords;
                if (inPageWords) {
                    this.setInPageWords(inPageWords.replace(/[:;]/g, ' '));
                }
            }

            searchSiteBtns() {
                if (!this.inInput) return;
                let inputWords = this.searchInput.value;
                let checkIndex = inputWords.indexOf('**'), checkType;
                if (checkIndex > 0) {
                    checkType = inputWords.slice(0, checkIndex);
                    inputWords = inputWords.slice(checkIndex + 2);
                }
                let canCheckHost = !/[^\w\.\/\:\*\?\^\$]/.test(inputWords);
                this.allListBtns.forEach(listItem => {
                    listItem.classList.add("input-hide");
                });
                searchTypes.forEach(type => {
                    type.classList.add("input-hide");
                });
                let optionNum = 0;
                this.filterGlob.innerHTML = createHTML();
                this.allSiteBtns.forEach(btn => {
                    let typeNode = btn.parentNode;
                    let globMatchName = "";
                    if (checkType) {
                        let typeMatch = this.globMatch(checkType, typeNode.dataset.type);
                        if (!typeMatch) return;
                        globMatchName = checkType + "**";
                    }
                    let canMatch = false;
                    if (!btn.dataset.clone) {
                        if (this.globMatch(inputWords, btn.dataset.name)) {
                            canMatch = true;
                            globMatchName += '^' + btn.dataset.name + '$';
                        } else if (btn.title && this.globMatch(inputWords, btn.title)) {
                            canMatch = true;
                            globMatchName += '^' + btn.title + '$';
                        }
                    }
                    if (!canMatch) {
                        if (canCheckHost) {
                            if (!btn.dataset.host) {
                                let hostReg = /^https?:\/\/([^\/]*)\/.*$/;
                                let href = btn.getAttribute("href");
                                btn.dataset.host = hostReg.test(href) ? href.replace(hostReg, "$1") : href;
                            }
                            canMatch = this.globMatch(inputWords, btn.dataset.host);
                        }
                        if (!canMatch) {
                            btn.classList.add("input-hide");
                        } else {
                            globMatchName += '^' + btn.dataset.host + '$';
                        }
                    }
                    if (canMatch) {
                        btn.classList.remove("input-hide");
                        typeNode.classList.remove("input-hide");
                        let listItem = typeNode.querySelector("#list" + btn.dataset.id);
                        if (listItem) listItem.classList.remove("input-hide");
                        if (optionNum < 50 && inputWords && this.searchInput.value !== globMatchName) {
                            optionNum++;
                            let option = document.createElement('option');
                            option.value = globMatchName;
                            this.filterGlob.appendChild(option);
                        }
                    }
                });
                let showType = this.bar.querySelector(".search-jumper-type:not(.input-hide)");
                if (showType && showType.classList.contains("search-jumper-hide")) showType.querySelector("span.search-jumper-btn").onmousedown();
            }

            globMatch(glob, target, inner) {
                if (glob.length == 0 || glob === '*') {
                    return true;
                }

                if (glob.length === 1 && glob[0] === '$') {
                    return target.length === 0;
                }

                if (glob.length > 1 && glob[0] === '*' &&
                    target.length === 0) {
                    return false;
                }

                if (!inner) {
                    inner = true;
                    if (glob.length > 1 && glob[0] === '^' &&
                        target.length !== 0) {
                        glob = glob.substring(1);
                        if (glob[0] !== target[0]) {
                            return false;
                        }
                    } else if (glob[0] !== '*') {
                        glob = '*' + glob;
                    }
                }

                if ((glob.length > 1 && glob[0] === '?') ||
                    (glob.length != 0 && target.length !== 0 &&
                     glob[0] === target[0])) {
                    return this.globMatch(glob.substring(1),
                                     target.substring(1), !!inner);
                }

                if (glob.length > 0 && glob[0] === '*') {
                    return this.globMatch(glob.substring(1), target, !!inner) ||
                        this.globMatch(glob, target.substring(1), !!inner);
                }

                return false;
            }

            setCurrentSite(data) {
                currentSite = data;
                localKeywords = "";
                if (!/#p{/.test(data.url)) {
                    let keywords = getKeywords();
                    if (keywords && keywords != cacheKeywords) {
                        cacheKeywords = keywords;
                        storage.setItem("cacheKeywords", keywords);
                    }
                    storage.setItem("referrer", location.hostname);
                }
            }

            refresh() {
                if (this.refreshInPageTimer) {
                    clearTimeout(this.refreshInPageTimer);
                }
                this.refreshInPageTimer = setTimeout(() => {
                    let oldWords = this.curHighlightWords;
                    this.highlight("");
                    this.highlight(oldWords);
                }, 500);
                if (!currentSite && this.bar.style.display == "none") {
                    let typeData;
                    for (let i in searchData.sitesConfig) {
                        if (currentSite) break;
                        typeData = searchData.sitesConfig[i];
                        if (!typeData) {
                            continue;
                        }
                        let sites = typeData.sites;
                        for (let j in sites) {
                            if (currentSite) break;
                            let data = sites[j];
                            if (!data || !data.url) {
                                continue;
                            }
                            if (data.match === '0') {
                            } else if (data.match) {
                                if (new RegExp(data.match).test(location.href)) {
                                    this.setCurrentSite(data);
                                }
                            } else if (data.url.indexOf(location.host) != -1) {
                                if (data.url.indexOf("site") != -1) {
                                    let siteMatch = data.url.match(/site(%3A|:)(.+?)[\s%]/);
                                    if (siteMatch && location.href.indexOf(siteMatch[2]) != -1 && data.url.replace(siteMatch[0], "").indexOf(location.host) != -1) {
                                        this.setCurrentSite(data);
                                    }
                                } else if (!currentSite && data.url.replace(/^https?:\/\//, "").replace(location.host, "").replace(/\/?[\?#].*/, "") == location.pathname.replace(/\/$/, "")) {
                                    let urlReg = data.url.match(/[^\/\?&]+(?=%[stb])/g);
                                    if (urlReg) {
                                        urlReg = urlReg.join('.*');
                                        if (new RegExp(urlReg).test(location.href)) {
                                            this.setCurrentSite(data);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (currentSite) {
                        this.appendBar();
                        this.bar.style.display = "";
                        this.initPos(
                            searchData.prefConfig.position.x,
                            searchData.prefConfig.position.y,
                            searchData.prefConfig.offset.x,
                            searchData.prefConfig.offset.y
                        );
                        let typeBtn = this.bar.querySelector(`.search-jumper-type.search-jumper-hide[data-type="${typeData.type}"]>span`);
                        if (typeBtn) {
                            this.bar.insertBefore(typeBtn.parentNode, this.bar.children[0]);
                            if (!searchData.prefConfig.disableAutoOpen) {
                                typeBtn.onmousedown();
                            }
                        }
                    }
                }
            }

            initSort() {
                if (!searchData.prefConfig.sortType) return;
                let self = this;
                searchTypes.sort((a, b) => {
                    let aTypeValue = sortTypeNames[a.dataset.type] || 0;
                    let bTypeValue = sortTypeNames[b.dataset.type] || 0;
                    return bTypeValue - aTypeValue;
                });
                let allHide = self.bar.children[0].classList.contains("search-jumper-hide");
                for (let i = searchTypes.length - 1; i >= 0; i--) {
                    let typeEle = searchTypes[i];
                    let curValue = sortTypeNames[typeEle.dataset.type] || 0;
                    if (i == searchTypes.length - 1) {
                        if (curValue > 0) sortTypeNames[typeEle.dataset.type] = 0;
                    } else {
                        let preValue = sortTypeNames[searchTypes[i + 1].dataset.type] || 0;
                        if (curValue - preValue > 50) {
                            sortTypeNames[typeEle.dataset.type] = preValue + 50;
                        }
                    }
                    self.bar.insertBefore(typeEle, self.bar.children[allHide ? 0 : 1]);
                }
                storage.setItem("sortTypeNames", sortTypeNames);
            }

            initHistorySites() {
                this.historySiteBtns = [];
                let self = this;
                historySites.forEach(n => {
                    for (let i = 0; i < self.allSiteBtns.length; i++) {
                        let siteBtn = self.allSiteBtns[i];
                        if (siteBtn.dataset.name == n) {
                            self.historySiteBtns.push(siteBtn);
                            break;
                        }
                    }
                });
            }

            insertHistory(typeEle) {
                if (searchData.prefConfig.disableAutoOpen) return;
                if (!searchData.prefConfig.historyLength) return;
                typeEle.style.width = "auto";
                typeEle.style.height = "auto";
                let self = this;
                this.historyInserted = true;
                this.historySiteBtns.slice(0, searchData.prefConfig.historyLength).forEach(btn => {
                    if (btn.parentNode != typeEle) {
                        let sites = typeEle.querySelectorAll("a.search-jumper-btn");
                        for (let i = 0; i < sites.length; i++) {
                            let site = sites[i];
                            if (site.href == btn.href) return;
                        }
                        if (self.searchJumperExpand.parentNode == typeEle) {
                            typeEle.insertBefore(btn, self.searchJumperExpand);
                        } else typeEle.appendChild(btn);
                    }
                });
                typeEle.style.width = typeEle.scrollWidth + "px";
                typeEle.style.height = typeEle.scrollHeight + "px";
            }

            recoveHistory() {
                if (!searchData.prefConfig.historyLength) return;
                if (!this.historyInserted) return;
                this.historyInserted = false;
                let self = this;
                this.historySiteBtns.slice(0, searchData.prefConfig.historyLength).forEach(btn => {
                    let curParent = btn.parentNode;
                    for (let i = 0; i < searchTypes.length; i++) {
                        let typeBtn = searchTypes[i];
                        if (typeBtn.dataset.type == btn.dataset.type) {
                            if (btn.dataset.id) {
                                typeBtn.insertBefore(btn, typeBtn.children[parseInt(btn.dataset.id) + 1]);
                            } else typeBtn.insertBefore(btn, typeBtn.children[1]);
                            break;
                        }
                    }
                    if (!curParent.classList.contains("search-jumper-hide")) {
                        curParent.style.width = "auto";
                        curParent.style.height = "auto";
                        curParent.style.width = curParent.scrollWidth + "px";
                        curParent.style.height = curParent.scrollHeight + "px";
                    }
                });
            }

            bindSite(a, siteEle) {
                if (a.getAttribute("bind")) return;
                a.setAttribute("bind", true);
                a.href = siteEle.href;
                a.style.display = siteEle.style.display;
                a.addEventListener('mousedown', e => {
                    siteEle.dispatchEvent(new PointerEvent("mousedown", {altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey}));
                    a.setAttribute("target", siteEle.target);
                    a.href = siteEle.href;
                    if (!a.onclick && siteEle.onclick) {
                        a.onclick = e => {
                            siteEle.onclick(e);
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }
                    }
                }, false);
            }

            async createList(sites, type, batchSiteNames) {
                let self = this;
                let list = document.createElement("div");
                list.className = "sitelist";
                let con = document.createElement("div");
                con.className = "sitelistCon";
                list.appendChild(con);
                let title = document.createElement("p");
                title.innerText = type;
                title.title = i18n('batchOpen');
                title.addEventListener('click', e => {
                    self.batchOpen(batchSiteNames, {ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey, metaKey: e.metaKey, which: (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) ? 1 : 3});
                });
                list.dataset.type = type;
                con.appendChild(title);
                function createItem(siteEle, index) {
                    let li = document.createElement("div");
                    li.id = "list" + index;
                    let icon = siteEle.querySelector("img");
                    let a = document.createElement("a");
                    a.setAttribute("ref", "noopener noreferrer");
                    self.bindSite(a, siteEle);
                    li.appendChild(a);
                    self.allListBtns.push(li);
                    con.appendChild(li);
                    if (icon) {
                        let iconSrc = icon.src || icon.dataset.src;
                        if (iconSrc) {
                            let img = document.createElement("img");
                            a.appendChild(img);
                            if (!/^data:/.test(iconSrc)) {
                                img.onload = e => {
                                    img.style.width = "";
                                    img.style.height = "";
                                    img.style.display = "";
                                };
                                img.dataset.src = iconSrc;
                                img.style.width = "1px";
                                img.style.height = "1px";
                                img.style.display = "none";
                            } else {
                                img.src = iconSrc;
                            }
                        }
                    }
                    let p = document.createElement("p");
                    p.innerText = siteEle.dataset.name;
                    li.title = siteEle.title;
                    li.dataset.name = siteEle.dataset.name;
                    a.appendChild(p);
                }
                try {
                    for (let [index, siteEle] of sites.entries()) {
                        createItem(siteEle, index)
                        if (index%50 === 49) await sleep(1);
                    }
                } catch(e) {
                    for (let index = 0; index < sites.length; index++) {
                        createItem(sites[index], index);
                    }
                }
                return list;
            }

            listPos(ele, list) {
                if (this.preList) {
                    //this.preList.style.visibility = "hidden";
                }
                if (!list.dataset.inited) {
                    list.dataset.inited = true;
                    [].forEach.call(list.querySelectorAll("div>a>img"), img => {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.dataset.src = "";
                        }
                    });
                }
                list.style = "";
                this.preList = list;
                let ew = ele.clientWidth;
                let eh = ele.clientHeight;
                let clientX = ele.offsetLeft + ew / 2 - this.bar.parentNode.scrollLeft;
                let clientY = ele.offsetTop + eh / 2 - this.bar.parentNode.scrollTop;
                let current = ele.offsetParent;

                while (current !== null){
                    clientX += current.offsetLeft;
                    clientY += current.offsetTop;
                    current = current.offsetParent;
                }
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                if (this.bar.clientWidth > this.bar.clientHeight) {
                    //横
                    if (clientY - eh / 2 < 100) {
                        list.style.top = this.bar.clientHeight + "px";
                    } else {
                        list.style.bottom = this.bar.clientHeight + "px";
                    }
                    clientX -= list.scrollWidth / 2;
                    if (clientX > viewWidth - list.scrollWidth - 20) clientX = viewWidth - list.scrollWidth - 20;
                    if (clientX < 10) clientX = 10;
                    list.style.left = clientX + "px";
                } else {
                    //竖
                    if (clientX - ew / 2 < 100) {
                        list.style.left = this.bar.clientWidth + "px";
                    } else {
                        list.style.right = this.bar.clientWidth + "px";
                    }
                    clientY -= list.scrollHeight / 2;
                    if (clientY > viewHeight - list.scrollHeight - 20) clientY = viewHeight - list.scrollHeight - 20;
                    if (clientY < 10) clientY = 10;
                    list.style.top = clientY + "px";
                }
            }

            clingPos(clingEle, target, close) {
                if (this.preList) {
                    //this.preList.style.visibility = "hidden";
                }
                let ew = clingEle.clientWidth;
                let eh = clingEle.clientHeight;
                let clientX = clingEle.offsetLeft + ew / 2 - this.bar.parentNode.scrollLeft;
                let clientY = clingEle.offsetTop + eh / 2 - this.bar.parentNode.scrollTop - clingEle.parentNode.scrollTop;
                let current = clingEle.offsetParent;
                let funcKeyCall = this.bar.classList.contains("funcKeyCall");
                let showall = this.bar.parentNode && this.bar.parentNode.classList.contains("search-jumper-showall");

                while (current !== null){
                    clientX += current.offsetLeft;
                    clientY += current.offsetTop;
                    current = current.offsetParent;
                }
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                if (showall) {
                    clientX -= target.scrollWidth / 2 - this.bar.parentNode.scrollLeft;
                    clientY += this.bar.parentNode.scrollTop;
                    if (clientY > viewHeight / 2) clientY -= (target.scrollHeight / 2 + eh / 2 + 30);
                    else clientY += (eh / 2 + 10);
                    target.style.right = "";
                    target.style.bottom = "";
                    target.style.left = clientX + "px";
                    target.style.top = clientY + "px";
                } else if (funcKeyCall) {
                    clientX -= target.scrollWidth / 2;
                    if (clientY > viewHeight / 2) clientY -= (target.scrollHeight / 2 + eh / 2 + 30);
                    else clientY += (eh / 2 + 10);
                    target.style.right = "";
                    target.style.bottom = "";
                    target.style.left = clientX + "px";
                    target.style.top = clientY + "px";
                } else if (clientY < eh) {
                    target.style.left = "";
                    target.style.right = "";
                    target.style.bottom = "";
                    clientX -= target.scrollWidth / 2;
                    clientY += target.scrollHeight / 2;
                    if (clientX < 5) {
                        clientX = 5;
                        target.style.left = "5px";
                    } else if (clientX > viewWidth - target.scrollWidth) {
                        target.style.right = "5px";
                    } else {
                        target.style.left = clientX + "px";
                    }
                    target.style.top = (close ? eh : eh + 20) + "px";
                } else if (clientY > viewHeight - eh) {
                    target.style.left = "";
                    target.style.right = "";
                    target.style.top = "";
                    clientX -= target.scrollWidth / 2;
                    if (clientX < 5) {
                        target.style.left = "5px";
                    } else if (clientX > viewWidth - target.scrollWidth) {
                        target.style.right = "5px";
                    } else {
                        target.style.left = clientX + "px";
                    }
                    target.style.bottom = (close ? eh : eh + 20) + "px";
                } else if (clientX > viewWidth - ew - 10) {
                    target.style.left = "";
                    target.style.bottom = "";
                    clientY -= target.scrollHeight / 2;
                    if (clientY < 5) clientY = 5;
                    target.style.right = (close ? ew : ew + 20) + "px";
                    target.style.top = clientY + "px";
                } else if (clientX < ew) {
                    target.style.right = "";
                    target.style.bottom = "";
                    clientY -= target.scrollHeight / 2;
                    if (clientY < 5) clientY = 5;
                    target.style.left = (close ? ew : ew + 20) + "px";
                    target.style.top = clientY + "px";
                } else {
                    target.style.right = "";
                    target.style.bottom = "";
                    target.style.left = clientX + "px";
                    target.style.top = clientY + "px";
                }
            }

            tipsPos(ele, type) {
                this.tips.innerText = type;
                this.tips.style.opacity = 1;
                this.clingPos(ele, this.tips);
            }

            async createType(data) {
                let self = this;
                let type = data.type;
                let icon = searchData.prefConfig.noIcons?'':data.icon;
                let inPage = data.selectTxt;
                let selectImg = data.selectImg;
                let selectAudio = data.selectAudio;
                let selectVideo = data.selectVideo;
                let selectLink = data.selectLink;
                let selectPage = data.selectPage;
                let sites = data.sites;
                let match = false;
                let openInNewTab = typeof data.openInNewTab === 'undefined' ? searchData.prefConfig.openInNewTab : data.openInNewTab;
                let siteEles = [];
                let ele = document.createElement("span");
                ele.className = "search-jumper-type search-jumper-hide not-expand";
                if (data.match === '0') {
                    ele.style.display = 'none';
                    ele.classList.add("notmatch");
                } else if (data.match) {
                    if (new RegExp(data.match).test(location.href) == false) {
                        ele.style.display = 'none';
                        ele.classList.add("notmatch");
                    } else {
                        match = true;
                    }
                }
                if (typeof data.description !== 'undefined') {
                    ele.dataset.title = type + " - " + data.description;
                } else {
                    ele.dataset.title = type;
                }
                ele.dataset.type = type;
                let typeBtn = document.createElement("span");
                let img = document.createElement("img");
                let iEle = document.createElement("b");
                if (type.length >= 3) {
                    iEle.innerText = type.substr(0, 3).trim();
                    if (!/^\w+$/.test(iEle.innerText)) iEle.innerText = iEle.innerText.substr(0, 2);
                } else iEle.innerText = type;
                iEle.style.fontSize = 14 * this.scale + 'px';
                //iEle.style.color = 'wheat';
                typeBtn.appendChild(iEle);
                img.style.display = "none";
                img.onload = e => {
                    img.style.display = "";
                    iEle.innerText = '';
                    iEle.style.fontSize = '';
                    iEle.style.color = '';
                };
                ele.appendChild(typeBtn);
                typeBtn.classList.add("search-jumper-word");
                typeBtn.classList.add("search-jumper-btn");
                typeBtn.classList.add("noIcon");
                let isBookmark = /^BM/.test(type) && data.icon === "bookmark";//書簽就不緩存了
                if (icon) {
                    typeBtn.classList.remove("noIcon");
                    if (/^[a-z\- ]+$/.test(icon)) {
                        let cache = searchData.prefConfig.cacheSwitch && cacheIcon[icon];
                        if (cache === 'fail') {
                        } else if (cache) {
                            img.src = cache;
                            img.style.width = '100%';
                            img.style.height = '100%';
                            typeBtn.appendChild(img);
                        } else {
                            iEle.className = icon.indexOf("fa") === 0 ? icon : "fa fa-" + icon;
                            this.fontPool.push(iEle);
                        }
                    } else {
                        let isBase64 = /^data:/.test(icon);
                        if (isBase64) {
                            img.src = icon;
                        } else {
                            let cache = searchData.prefConfig.cacheSwitch && cacheIcon[icon];
                            if (cache === 'fail') {
                            } else if (cache) {
                                img.src = cache;
                            } else {
                                img.src = icon;
                                if (searchData.prefConfig.cacheSwitch && !isBookmark) cachePool.push(img);
                            }
                        }
                        typeBtn.appendChild(img);
                    }
                }
                let batchSiteNames = [];
                let batchOpenConfirm = (e) => {
                    if (!ele.classList.contains("search-jumper-hide") || window.confirm(i18n('batchOpenConfirm'))) {
                        self.batchOpen(batchSiteNames, e);
                    }
                };
                if (searchData.prefConfig.shortcut && data.shortcut) {
                    ele.dataset.title += ` (${data.shortcut.toUpperCase()})`;
                    document.addEventListener('keydown', e => {
                        if (e.target.id === "searchJumperInput") return;
                        if ((!data.ctrl == e.ctrlKey) ||
                            (!data.alt == e.altKey) ||
                            (!data.shift == e.shiftKey) ||
                            (!data.meta == e.metaKey)) {
                            return;
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            } else {
                                let contentEditable = false;
                                let parent = document.activeElement;
                                while (parent) {
                                    contentEditable = parent.contentEditable == 'true';
                                    if (contentEditable || parent.tagName == 'BODY') {
                                        break;
                                    }
                                    parent = parent.parentNode;
                                }
                                if (contentEditable) return;
                            }
                        }
                        var key = (e.key || String.fromCharCode(e.keyCode)).toLowerCase();
                        if (data.shortcut == key) {
                            batchOpenConfirm(e);
                            e.stopPropagation();
                        }
                    });
                }
                let typeAction = e => {
                    let baseSize = Math.min(self.bar.scrollWidth, self.bar.scrollHeight);
                    if (e) {
                        if (e.which === 3) {
                            batchOpenConfirm(e);
                            return false;
                        } if (e.which === 1 && (e.shiftKey || e.altKey || e.ctrlKey)) {
                            return false;
                        }
                    }
                    let funcKeyCall = self.bar.classList.contains("funcKeyCall");
                    if (funcKeyCall) {
                        self.bar.classList.remove("funcKeyCall");
                        self.bar.style.display = "none";
                        setTimeout(() => {
                            self.bar.style.display = "";
                            self.initPos(
                                searchData.prefConfig.position.x,
                                searchData.prefConfig.position.y,
                                searchData.prefConfig.offset.x,
                                searchData.prefConfig.offset.y
                            );
                        }, 0);
                        return false;
                    }
                    ele.style.width = "";
                    ele.style.height = "";
                    let leftRight = self.bar.parentNode.classList.contains("search-jumper-left") ||
                        self.bar.parentNode.classList.contains("search-jumper-right");
                    if (self.preList) {
                        self.preList.style.visibility = "hidden";
                    }
                    self.recoveHistory();
                    if (ele.classList.contains("search-jumper-hide")) {
                        ele.classList.remove("search-jumper-hide");
                        if (sites.length > 10) {
                            ele.classList.add("not-expand");
                            ele.appendChild(self.searchJumperExpand);
                        }
                        let scrollSize = Math.max(ele.scrollWidth, ele.scrollHeight) + 5 + "px";
                        if (leftRight) {
                            ele.style.height = scrollSize;
                            ele.style.width = "";
                        } else {
                            ele.style.width = scrollSize;
                            ele.style.height = "";
                        }
                        setTimeout(() => {
                            if (!ele.classList.contains("search-jumper-hide")) {
                                ele.style.flexWrap = "nowrap";
                            }
                        }, searchData.prefConfig.typeOpenTime);
                        searchTypes.forEach(type => {
                            if (ele != type) {
                                type.classList.add("search-jumper-hide");
                                type.style.width = baseSize + "px";
                                type.style.height = baseSize + "px";
                                type.style.flexWrap = "";
                            }
                        });
                        let href = (targetElement && (targetElement.href || targetElement.src)) || location.href;
                        siteEles.forEach((se, i) => {
                            let si = se.querySelector("img");
                            if (si && !si.src && si.dataset.src) {
                                si.src = si.dataset.src;
                                si.dataset.src = "";
                            }
                            let data = sites[i];
                            if (data.match && data.hideNotMatch) {
                                if (new RegExp(data.match).test(href)) {
                                    se.style.display = '';
                                } else {
                                    se.style.display = 'none';
                                }
                            }
                        });


                    } else {
                        ele.classList.add("search-jumper-hide");
                        if (leftRight) {
                            ele.style.height = baseSize + "px";
                        } else {
                            ele.style.width = baseSize + "px";
                        }
                        ele.style.flexWrap = "";
                    }
                    setTimeout(() => {
                        self.checkScroll();
                    }, 500);
                };
                typeBtn.onmousedown = typeAction;
                typeBtn.oncontextmenu = function (event) {
                    event.preventDefault();
                };

                typeBtn.addEventListener('click', e => {
                    self.batchOpen(batchSiteNames, e);
                    return false;
                }, false);
                typeBtn.addEventListener('dblclick', e=>{
                    e.stopPropagation();
                    e.preventDefault();
                }, true);

                let showTimer, siteList;
                typeBtn.addEventListener('mouseenter', e => {
                    if (!self.bar.classList.contains("funcKeyCall") && searchData.prefConfig.showSiteLists && (searchData.prefConfig.alwaysShowSiteLists || ele.classList.contains("search-jumper-hide"))) {
                        ele.appendChild(siteList);
                        self.listPos(ele.children[0], siteList);
                    } else {
                        self.tipsPos(typeBtn, ele.dataset.title);
                    }
                    if (searchData.prefConfig.overOpen) {
                        if (!ele.classList.contains("search-jumper-hide")) return;
                        showTimer = setTimeout(() => {
                            typeAction(e);
                        }, 500);
                    }
                }, false);
                typeBtn.addEventListener('mouseleave', e => {
                    self.tips.style.opacity = 0;
                    if (searchData.prefConfig.overOpen) {
                        clearTimeout(showTimer);
                    }
                }, false);
                let isCurrent = false;
                let tooLoog = sites && sites.length > 200;
                async function createItem(site, i) {
                    let siteEle = await self.createSiteBtn((tooLoog || searchData.prefConfig.noIcons ? 0 : site.icon), site, openInNewTab, isBookmark);
                    siteEle.dataset.type = type;
                    siteEle.dataset.id = siteEles.length;
                    self.allSiteBtns.push(siteEle);
                    ele.appendChild(siteEle);
                    siteEles.push(siteEle);
                    if (!site.nobatch) batchSiteNames.push(site.name);
                    if (!currentSite && (siteEle.dataset.current || match)) {
                        isCurrent = true;
                        siteEle.classList.add('current');
                        if (!searchData.prefConfig.showCurrent) {
                            siteEle.style.display = 'none';
                        }
                        self.setCurrentSite(site);
                        self.currentType = ele;
                    }
                }
                try {
                    for (let [i, site] of sites.entries()) {
                        await createItem(site, i);
                        if (i % 50 === 49) await sleep(1);
                    }
                } catch(e) {
                    for (let i = 0; i < sites.length; i++) {
                        createItem(sites[i], i);
                    }
                    await sleep(1);
                }
                siteList = await self.createList(siteEles, ele.dataset.title, batchSiteNames);
                if (isCurrent) {
                    self.bar.insertBefore(ele, self.bar.children[0]);
                    if (!searchData.prefConfig.disableAutoOpen) {
                        ele.classList.remove("search-jumper-hide");
                        if (sites.length > 10) {
                            ele.classList.add("not-expand");
                            ele.appendChild(self.searchJumperExpand);
                        }
                        siteEles.forEach(se => {
                            let si = se.querySelector("img");
                            if (si && !si.src && si.dataset.src) {
                                si.src = si.dataset.src;
                            }
                        });
                    }
                } else {
                    self.bar.insertBefore(ele, self.bar.children[self.bar.children.length - 1]);
                }

                ele.style.width = ele.scrollHeight + "px";
                ele.style.height = ele.scrollHeight + "px";
                siteList.style.display = "none";
                ele.appendChild(siteList);
                if (inPage && selectImg && selectAudio && selectVideo && selectLink && selectPage) {
                    ele.classList.add("search-jumper-targetAll");
                } else {
                    if (inPage) {
                        ele.classList.add("search-jumper-needInPage");
                    }
                    if (selectImg) {
                        ele.classList.add("search-jumper-targetImg");
                    }
                    if (selectAudio) {
                        ele.classList.add("search-jumper-targetAudio");
                    }
                    if (selectVideo) {
                        ele.classList.add("search-jumper-targetVideo");
                    }
                    if (selectLink) {
                        ele.classList.add("search-jumper-targetLink");
                    }
                    if (selectPage) {
                        ele.classList.add("search-jumper-targetPage");
                    }
                }
                searchTypes.push(ele);
                return ele;
            }

            openSiteBtn(siteEle, forceTarget) {
                let isPage = /^(https?|ftp):/.test(siteEle.href);
                if (!forceTarget) forceTarget = "_blank";
                if (isPage) {
                    siteEle.setAttribute("target", forceTarget);
                }
                let mouseDownEvent = new PointerEvent("mousedown");
                siteEle.dispatchEvent(mouseDownEvent);
                if (!this.customInput || this.batchOpening) {
                    if (siteEle.onclick || !isPage) {
                        siteEle.click();
                    } else {
                        if (forceTarget == "_blank") {
                            _GM_openInTab(siteEle.href, {active: true});
                        } else location.href = siteEle.href;
                    }
                }
                if (isPage) siteEle.setAttribute("target", siteEle.dataset.target == 1 ? "_blank" : "");
            }

            batchOpen(siteNames, e) {
                let self = this;
                self.batchOpening = true;
                self.customInput = false;
                let targetSites = self.getTargetSitesByName(siteNames);
                if (e.which === 1 && e.altKey && e.shiftKey) {
                    let html = '<title>SearchJumper Multi</title><style>body{background: black; margin: 0;}iframe{box-sizing: border-box;}iframe:nth-child(odd){padding: 0 5px 10px 0;}iframe:nth-child(even){padding: 0 0 10px 5px;}</style>';
                    let c = window.open("", "_blank");
                    for (let i = 0;i < targetSites.length;i++) {
                        let siteEle = targetSites[i];
                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                            let mouseDownEvent = new PointerEvent("mousedown");
                            siteEle.dispatchEvent(mouseDownEvent);
                            if (self.stopInput) return;
                            let iframe = document.createElement('iframe');
                            iframe.width = '50%';
                            iframe.height = '100%';
                            iframe.frameBorder = '0';
                            iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
                            iframe.id = "searchJumper" + i;
                            iframe.style.display = "none";
                            html += iframe.outerHTML;
                            _GM_xmlhttpRequest({
                                method: 'GET',
                                url: siteEle.href,
                                headers: {
                                    referer: siteEle.href,
                                    origin: siteEle.href
                                },
                                onload: function(d) {
                                    let curIframe = c.document.querySelector('iframe#' + iframe.id);
                                    let waitReady = () => {
                                        let doc = curIframe.contentDocument || (curIframe.contentWindow && curIframe.contentWindow.document);
                                        if (doc) {
                                            curIframe.style.display = "";
                                            curIframe.src = siteEle.href;
                                            let base = `<base href="${siteEle.href.replace(/[^\/]*$/, "")}">`;
                                            let docContent = d.response.indexOf("<head>") !== -1 ? d.response.replace("<head>", "<head>" + base) : base + d.response;
                                            doc.write(docContent);
                                        } else {
                                            setTimeout(() => {
                                                waitReady();
                                            }, 500);
                                        }
                                    };
                                    if (curIframe) {
                                        waitReady();
                                    }
                                },
                                onerror: function(e){
                                    debug(e);
                                },
                                ontimeout: function(e){
                                    debug(e);
                                }
                            });
                        }
                    }
                    c.document.write(html);
                    c.document.close();
                } else if (e.which === 1 && (e.ctrlKey || e.metaKey) && e.shiftKey) {
                    for (let i = 0;i < targetSites.length;i++) {
                        let siteEle = targetSites[i];
                        let mouseDownEvent = new PointerEvent("mousedown");
                        siteEle.dispatchEvent(mouseDownEvent);
                        if (self.stopInput) return;
                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                            storage.setItem("lastSign", siteNames);
                            _GM_openInTab(siteEle.href, {incognito: true});
                            setTimeout(() => {
                                storage.setItem("lastSign", 0);
                            }, 2000);
                            break;
                        }
                    }
                } else if (e.which === 1 && e.altKey) {
                    let urls=[];
                    for (let i = 0;i < targetSites.length;i++) {
                        let siteEle = targetSites[i];
                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                            let mouseDownEvent = new PointerEvent("mousedown");
                            siteEle.dispatchEvent(mouseDownEvent);
                            if (self.stopInput) return;
                            urls.push(siteEle.href);
                        }
                    }
                    let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                    let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                    let numPerLine = parseInt(viewWidth / 800);
                    if (numPerLine > urls.length) numPerLine = urls.length;
                    let _width = parseInt(viewWidth / numPerLine);
                    let _height = viewHeight / (parseInt((urls.length - 1) / numPerLine) + 1) - 10;
                    for (let i = 0; i< urls.length; i++) {
                        let left = (i % numPerLine) * _width;
                        let top = parseInt(i / numPerLine) * (_height + 70);
                        window.open(urls[i] + "#searchJumperMin", "_blank", `width=${_width-10}, height=${_height}, location=0, resizable=1, status=0, toolbar=0, menubar=0, scrollbars=0, left=${left}, top=${top}`);
                    }
                } else if (e.which === 1 && e.shiftKey) {
                    for (let i = 0;i < targetSites.length;i++) {
                        let siteEle = targetSites[i];
                        let mouseDownEvent = new PointerEvent("mousedown");
                        siteEle.dispatchEvent(mouseDownEvent);
                        if (self.stopInput) return;
                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                            storage.setItem("lastSign", siteNames);
                            window.open(siteEle.href, '_blank');
                            setTimeout(() => {
                                storage.setItem("lastSign", 0);
                            }, 2000);
                            break;
                        }
                    }
                } else if (e.which === 1 && (e.ctrlKey || e.metaKey)) {
                    for (let i = 0;i < targetSites.length;i++) {
                        let siteEle = targetSites[i];
                        let isPage = /^(https?|ftp):/.test(siteEle.href);
                        if (isPage) {
                            siteEle.setAttribute("target", "_blank");
                        }
                        let mouseDownEvent = new PointerEvent("mousedown");
                        siteEle.dispatchEvent(mouseDownEvent);
                        if (self.stopInput) return;
                        siteEle.click();
                        siteEle.setAttribute("target", siteEle.dataset.target==1?"_blank":"");
                    }
                } else if (e.which === 3) {
                    targetSites.forEach(siteEle => {
                        if (siteEle.dataset.current) return;
                        self.openSiteBtn(siteEle);
                    });
                }
                self.batchOpening = false;
            }

            getTargetSitesByName(siteNames) {
                let self = this;
                let targetSites = [];
                siteNames.forEach(n => {
                    for (let i = 0; i < self.allSiteBtns.length; i++) {
                        let siteBtn = self.allSiteBtns[i];
                        if (siteBtn.dataset.pointer) continue;
                        if (siteBtn.dataset.name == n) {
                            targetSites.push(siteBtn);
                            break;
                        }
                    }
                });
                return targetSites;
            }

            async submitAction(params) {
                params = params.slice();
                if (document.readyState !== 'complete') {
                    await sleep(500);
                    this.submitAction(params);
                    return;
                }
                let form, input, clicked = false;

                for (let param of params) {
                    if (inPagePostParams) {
                        inPagePostParams.shift();
                        storage.setItem("inPagePostParams_" + location.host, inPagePostParams ? inPagePostParams : "");
                    }
                    if (param[0] === "sleep" || param[0] === "@sleep") {
                        await sleep(param[1]);
                        continue;
                    } else if (param[0] === "@click") {
                        clicked = true;
                        await emuClick(param[1]);
                        continue;
                    } else if (param[1] === 'click' && param[0].indexOf('@') === 0) {
                        clicked = true;
                        await emuClick(param[0].substr(1));
                    } else {
                        if (!localKeywords) localKeywords = param[1];
                        await emuInput(param[0], param[1]);
                        input = getElement(param[0]);
                    }
                }

                if (!clicked && input) {
                    form = input.parentNode;
                    while (form.tagName != 'FORM') {
                        form = form.parentNode;
                        if (!form) break;
                    }
                    if (form) {
                        let submitBtn = form.querySelector("[type=submit]");
                        if (submitBtn) submitBtn.click();
                        else form.submit();
                    }
                }
            }

            async createSiteBtn(icon, data, openInNewTab, isBookmark) {
                let self = this;
                let ele = document.createElement("a");
                ele.setAttribute("ref", "noopener noreferrer");
                let name = data.name;
                let pointer = !isBookmark && /^\[/.test(data.url);
                if (pointer) {
                    ele.dataset.pointer = true;
                    let siteNames = JSON.parse(data.url);
                    if (siteNames.length === 1) {
                        ele.dataset.clone = true;
                        let findSite = false;
                        for (let i = 0; i < searchData.sitesConfig.length; i++) {
                            if (findSite) break;
                            let typeConfig = searchData.sitesConfig[i];
                            for (let j = 0; j < typeConfig.sites.length; j++) {
                                let siteData = typeConfig.sites[j];
                                if (/^\[/.test(siteData.url)) continue;
                                if (siteData.name == siteNames[0]) {
                                    findSite = true;
                                    data = siteData;
                                    break;
                                }
                            }
                        }
                    }
                } else if (/^d:/.test(data.url)) {
                    ele.setAttribute('download', '');
                    data.url = data.url.replace(/^d:/, '');
                }
                if (typeof data.openInNewTab !== 'undefined') {
                    openInNewTab = data.openInNewTab;
                }
                let isPage = /^(https?|ftp):/.test(data.url);
                ele.className = "search-jumper-btn";
                if (typeof data.description !== 'undefined') ele.title = name + " - " + data.description;
                ele.dataset.name = name;
                ele.classList.add("search-jumper-word");
                let word = document.createElement("span");
                if (!isBookmark && name.length >= 3) {
                    word.innerText = name.substr(0, 3).trim();
                    if (!/^\w+$/.test(word.innerText)) word.innerText = word.innerText.substr(0, 2);
                } else word.innerText = name;
                ele.appendChild(word);
                let img = document.createElement("img");
                img.style.display = "none";
                ele.appendChild(img);
                if (data.nobatch) ele.dataset.nobatch = 1;
                img.onload = e => {
                    ele.classList.remove("search-jumper-word");
                    ele.removeChild(word);
                    img.style.display = "";
                };
                let imgSrc;
                if (icon == 0) {
                } else if (icon) {
                    imgSrc = icon;
                } else if (!isBookmark && isPage) {
                    imgSrc = data.url.replace(/^(https?:\/\/[^\/]*\/).*$/, "$1favicon.ico");
                }
                let isBase64 = imgSrc && /^data:/.test(imgSrc);
                if (isBase64) {
                    img.src = imgSrc;
                } else if (imgSrc) {
                    let cache = searchData.prefConfig.cacheSwitch && cacheIcon[imgSrc];
                    if (cache === 'fail') {
                    } else if (cache) {
                        img.src = cache;
                    } else {
                        img.dataset.src = imgSrc;
                        if (!isBookmark && searchData.prefConfig.cacheSwitch) cachePool.push(img);
                    }
                }
                self.stopInput = false;
                if (searchData.prefConfig.shortcut && data.shortcut && !ele.dataset.clone) {
                    let shortcutCover = document.createElement("div");
                    shortcutCover.innerText = data.shortcut.toUpperCase();
                    ele.appendChild(shortcutCover);
                    document.addEventListener('keydown', e => {
                        if (e.target.id === "searchJumperInput") return;
                        if (!self.hideTimeout) {
                            if ((!data.ctrl == e.ctrlKey) ||
                                (!data.alt == e.altKey) ||
                                (!data.shift == e.shiftKey) ||
                                (!data.meta == e.metaKey)) {
                                return;
                            }
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            } else {
                                let contentEditable = false;
                                let parent = document.activeElement;
                                while (parent) {
                                    contentEditable = parent.contentEditable == 'true';
                                    if (contentEditable || parent.tagName == 'BODY') {
                                        break;
                                    }
                                    parent = parent.parentNode;
                                }
                                if (contentEditable) return;
                            }
                        }
                        var key = (e.key || String.fromCharCode(e.keyCode)).toLowerCase();
                        if (data.shortcut == key) {
                            if (action({altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey}) !== false && !self.customInput) {
                                ele.click();
                            }
                            e.stopPropagation();
                        }
                    });
                }
                ele.dataset.inPagePost = (data.url.indexOf("#p{") != -1) ? 't' : 'f';
                let inPagePost = ele.dataset.inPagePost === 't';
                if (!isBookmark && (!currentSite || data.hideNotMatch) && window.top == window.self) {
                    if (data.match === '0') {
                        ele.style.display = 'none';
                        ele.classList.add("notmatch");
                    } else if (data.match) {
                        if (new RegExp(data.match).test(location.href)) {
                            ele.dataset.current = true;
                        }
                    } else if (!pointer && data.url.indexOf(location.host) != -1) {
                        if (!this.inSiteMatch) this.inSiteMatch = /site(%3A|:)(.+?)[\s%]/;
                        let match = data.url.match(this.inSiteMatch);
                        if (match) {
                            if (location.href.indexOf(match[2]) != -1 && data.url.replace(match[0], "").indexOf(location.host) != -1) {
                                ele.dataset.current = true;
                            }
                        } else {
                            if (!this.pathMatch) this.pathMatch = new RegExp("^https?://" + location.host + location.pathname + "?([\\?#].*|$)");
                            if (this.pathMatch.test(data.url)) {
                                if (!this.postMatch) this.postMatch = /[#:%]p{/;
                                if (this.postMatch.test(data.url)) {
                                    ele.dataset.current = true;
                                } else {
                                    if (!this.paramMatch) this.paramMatch = /[^\/\?&]+(?=%[stb])/g;
                                    let urlReg = data.url.match(this.paramMatch);
                                    if (urlReg) {
                                        urlReg = urlReg.join('.*');
                                        if (new RegExp(urlReg).test(location.href)) {
                                            ele.dataset.current = true;
                                        }
                                    } else {
                                        ele.dataset.current = true;
                                    }
                                }
                            } else if (data.url.indexOf("?") === -1) {
                                if (!this.keywordMatch) this.keywordMatch = /%[stb][a-z]?\b/g;
                                if (new RegExp(data.url.replace(/^https?/, "").replace(/\./g, "\\.").replace(this.keywordMatch, ".*")).test(location.href)) {
                                    ele.dataset.current = true;
                                }
                            }
                        }
                    }
                    if (ele.dataset.current) {
                        if (!currentSite && inPagePostParams) {
                            if (inPagePost) {
                                await this.submitAction(inPagePostParams);
                            } else {
                                //storage.setItem("inPagePostParams", false);
                            }
                        }
                    } else if (data.hideNotMatch) {
                        ele.style.display = 'none';
                        ele.classList.add("notmatch");
                    }
                }
                if (isPage && openInNewTab) {
                    ele.setAttribute("target", "_blank");
                    ele.dataset.target = 1;
                }
                let getUrl = () => {
                    self.customInput = false;
                    let keywords;
                    if (self.bar.parentNode && self.bar.parentNode.classList.contains("search-jumper-showall")) {
                        keywords = self.showallInput.value;
                    } else if (self.searchJumperInputKeyWords.value) {
                        keywords = self.searchJumperInputKeyWords.value;
                    } else {
                        keywords = getKeywords();
                    }
                    if (keywords && keywords != cacheKeywords) {
                        cacheKeywords = keywords;
                        storage.setItem("cacheKeywords", keywords);
                    }
                    let postMatch;
                    if (inPagePost) {
                        postMatch = data.url.match(/#p{(.*[^\\])}/);
                    }
                    let host = location.host;
                    let href = location.href;
                    let keyToReg = (key, sign, more) => {
                        if (!more) {
                            if (/\w$/.test(key)) {
                                more = '(\\b|$)';
                            } else more = '';
                        }
                        return new RegExp(key.replace(/([\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/])/g, "\\$1") + more, sign);
                    }
                    let customReplaceSingle = (str, key, value) => {
                        if (str.indexOf(key + ".replace(/") !== -1) {
                            let replaceMatch = str.match(keyToReg(key, "", "\\.replace\\(/(.*?[^\\\\])/(.*?),\s*[\"'](.*?[^\\\\])??[\"']\\)"));
                            if (!replaceMatch) return str.replace(keyToReg(key, "g"), value);
                            value = value.replace(new RegExp(replaceMatch[1], replaceMatch[2]), replaceMatch[3] || '');
                            str = str.replace(replaceMatch[0], key);
                            return customReplaceSingle(str, key, value);
                        } else {
                            return str.replace(keyToReg(key, "g"), value);
                        }
                    };
                    let needDecode = (/^c:|[#:%]P{/i.test(data.url));
                    let keywordsU, keywordsL, keywordsR;
                    let customReplaceKeywords = str => {
                        str = customReplaceSingle(str, "%su", keywordsU);
                        str = customReplaceSingle(str, "%sl", keywordsL);
                        str = customReplaceSingle(str, "%sr", keywordsR);
                        str = customReplaceSingle(str, "%s", keywords);
                        return str;
                    };
                    let customSelectElement = str => {
                        let selectorMatch = str.match(/%element{(.*?)}(\.prop\((.*?)\))?/);
                        let runTimes = 0;
                        while (selectorMatch) {
                            if (runTimes++ > 100) break;
                            let selector = selectorMatch[1];
                            let prop = selectorMatch[3];
                            let value = "";
                            let ele = getElement(selector);
                            if (ele) {
                                if (prop) {
                                    value = ele.getAttribute(prop) || ele[prop];
                                } else {
                                    value = ele.innerText;
                                }
                            }
                            str = customReplaceSingle(str, selectorMatch[0], value);
                            selectorMatch = str.match(/%element{(.*?)}(\.prop\((.*?)\))?/);
                        }
                        return str;
                    }
                    if (!ele.dataset.url) {
                        let tempUrl = data.url;
                        if (inPagePost) {
                            tempUrl = tempUrl.replace(postMatch[0], "");
                        }
                        ele.dataset.url = customSelectElement(tempUrl.replace(/%e\b/g, document.charset).replace(/%c\b/g, (isMobile?"mobile":"pc")).replace(/%h\b/g, host));
                    }
                    let selStr = getSelectStr();
                    let targetUrl = '';
                    let targetName = selStr || document.title;
                    let imgBase64 = '', resultUrl = ele.dataset.url.replace(/%date/g, new Date().getTime());
                    let hasWordParam = /%s[lur]?\b/.test(data.url);
                    if (targetElement) {
                        targetUrl = targetElement.src || targetElement.href || '';
                        if (targetElement.tagName == "VIDEO" || targetElement.tagName == "AUDIO") {
                            if (!targetUrl) {
                                let source = targetElement.querySelector("source");
                                if (source) targetUrl = source.src;
                            }
                            if (targetUrl) targetUrl = targetUrl.replace(/^blob:/, "");
                        }
                        targetName = targetElement.title || targetElement.alt || document.title;
                        if (targetElement.tagName == 'IMG' && /%i\b/.test(ele.dataset.url)) {
                            if (targetElement.src) {
                                if (/^data/.test(targetElement.src)) {
                                    resultUrl = resultUrl.replace(/%i\b/g, targetElement.src);
                                } else {
                                    imgBase64 = image2Base64(targetElement);
                                    resultUrl = resultUrl.replace(/%i\b/g, imgBase64);
                                }
                            }
                        } else if ((targetElement.tagName == 'A' || (targetElement.parentNode && targetElement.parentNode.tagName == 'A')) && hasWordParam && !keywords) {
                            if (targetElement.textContent.trim()) keywords = encodeURIComponent(targetElement.textContent);
                        }
                    }
                    if (!keywordsU && !keywordsL && !keywordsR) {
                        keywordsR = keywords;
                        keywordsU = keywordsR.toUpperCase();
                        keywordsL = keywordsR.toLowerCase();
                        if (!needDecode) keywords = encodeURIComponent(keywords);
                    }
                    while (resultUrl.indexOf('%input{') !== -1) {
                        let inputMatch = resultUrl.match(/%input{(.*?)}/);
                        if (!inputMatch) return false;
                        self.customInput = true;
                        if (self.stopInput) return false;
                        if (self.batchOpening) {
                            let promptStr;
                            if (inputMatch[1].indexOf("\"") === 0 && inputMatch[1].indexOf("\",\"") !== -1) {
                                promptStr = inputMatch[1].substr(1, inputMatch[1].length - 2).split("\",\"");
                            } else {
                                promptStr = inputMatch[1].split(",");
                            }
                            if (promptStr.length === 2) {
                                promptStr = window.prompt(promptStr[0], promptStr[1]);
                            } else {
                                promptStr = window.prompt(inputMatch[1]);
                            }
                            if (promptStr === null) return false;
                            resultUrl = resultUrl.replace(inputMatch[0], promptStr);
                        } else break;
                    }
                    let targetBaseUrl = targetUrl.replace(/^https?:\/\//i, "");
                    if (!keywords && hasWordParam) {
                        self.customInput = true;
                        if (self.stopInput) return false;
                        let promptStr = window.prompt(i18n("keywords"));
                        if (promptStr === null) return false;
                        localKeywords = promptStr;
                        setTimeout(() => {localKeywords = ''}, 1);
                        keywords = promptStr;
                        resultUrl = customReplaceKeywords(resultUrl);
                    }
                    if (targetUrl === '') {
                        let canBeUrl = getSelectStr() || self.searchJumperInputKeyWords.value;
                        if (canBeUrl && !hasWordParam) {
                            targetUrl = canBeUrl;
                        } else {
                            let promptStr = false;
                            let getTargetUrl = () => {
                                if (self.stopInput) return false;
                                if (promptStr === false) {
                                    promptStr = window.prompt(i18n("targetUrl"), "https://www.google.com/favicon.ico");
                                    if (promptStr) {
                                        let preTargetElement = targetElement;
                                        targetElement = {src: promptStr};
                                        setTimeout(() => {targetElement = preTargetElement}, 1);
                                    }
                                }
                                if (promptStr === null) return false;
                                return true;
                            };
                            if (/%t\b/.test(resultUrl)) {
                                self.customInput = true;
                                if (getTargetUrl() === false) return false;
                                resultUrl = customReplaceSingle(resultUrl, "%t", promptStr);
                            }
                            if (/%T\b/.test(resultUrl)) {
                                self.customInput = true;
                                if (getTargetUrl() === false) return false;
                                resultUrl = resultUrl.replace(/%T\b/g, encodeURIComponent(promptStr));
                            }
                            if (/%b\b/.test(resultUrl)) {
                                self.customInput = true;
                                if (getTargetUrl() === false) return false;
                                resultUrl = resultUrl.replace(/%b\b/g, promptStr.replace(/^https?:\/\//i, ""));
                            }
                            if (/%B\b/.test(resultUrl)) {
                                self.customInput = true;
                                if (getTargetUrl() === false) return false;
                                resultUrl = resultUrl.replace(/%B\b/g, encodeURIComponent(promptStr.replace(/^https?:\/\//i, "")));
                            }
                        }
                    }
                    if (targetUrl && !/%t\b/i.test(ele.dataset.url)) {
                        href = targetUrl;
                    }
                    if (inPagePost) {
                        let postParams = [];
                        postMatch[1].replace(/([^\\])&/g, "$1SJ^PARAM").split("SJ^PARAM").forEach(pair => {//ios不支持零宽断言，哭唧唧
                            pair = pair.trim();
                            if (pair.startsWith("click(") && pair.endsWith(')')) {
                                let click = pair.slice(6, pair.length - 1);
                                if (click) {
                                    postParams.push(['@click', click.replace(/\\([\=&])/g, "$1").trim()]);
                                }
                            } else if (/^sleep\(\d+\)$/.test(pair)) {
                                let sleep = pair.match(/sleep\((.*)\)/);
                                if (sleep) {
                                    postParams.push(['@sleep', sleep[1]]);
                                }
                            } else {
                                pair = pair.replace(/([^\\])\=/g, "$1SJ^PARAM").replace(/\\([\=&])/g, "$1");
                                let pairArr = pair.split("SJ^PARAM");
                                if (pairArr.length === 2) {
                                    let k = pairArr[0];
                                    let v = customReplaceKeywords(pairArr[1].replace(/\\([\=&])/g, "$1").replace(/%e\b/g, document.charset).replace(/%c\b/g, (isMobile?"mobile":"pc")).replace(/%U\b/g, encodeURIComponent(href)).replace(/%h\b/g, host).replace(/%T\b/g, encodeURIComponent(targetUrl)).replace(/%b\b/g, targetBaseUrl).replace(/%B\b/g, encodeURIComponent(targetBaseUrl)).replace(/%n\b/g, targetName).replace(/%S\b/g, (cacheKeywords || keywords)));
                                    v = customReplaceSingle(v, "%t", targetUrl);
                                    v = customReplaceSingle(v, "%u", href);
                                    postParams.push([k, v]);
                                } else if (pair.endsWith('.click()') || pair.endsWith('.click')) {
                                    postParams.push(['@' + pair.replace(/\.click(\(\))?$/, ''), 'click']);
                                }
                            }
                        });
                        if (resultUrl === "" || resultUrl === location.href) {
                            inPagePostParams = postParams;
                            this.submitAction(postParams);
                            return false;
                        } else {
                            storage.setItem("inPagePostParams_" + resultUrl.replace(/^https?:\/\/([^\/]+).*/, "$1"), postParams);
                        }
                    }
                    resultUrl = customReplaceKeywords(resultUrl.replace(/%U\b/g, encodeURIComponent(href)).replace(/%T\b/g, encodeURIComponent(targetUrl)).replace(/%b\b/g, targetBaseUrl).replace(/%B\b/g, encodeURIComponent(targetBaseUrl)).replace(/%n\b/g, targetName).replace(/%S\b/g, (cacheKeywords || keywords)));
                    resultUrl = customReplaceSingle(resultUrl, "%t", targetUrl);
                    resultUrl = customReplaceSingle(resultUrl, "%u", href);
                    if (openInNewTab && /^(https?|ftp):/.test(resultUrl)) {
                        ele.setAttribute("target", "_blank");
                        ele.dataset.target = 1;
                    } else {
                        ele.dataset.target = 0;
                    }
                    return resultUrl;
                };
                let action = e => {
                    if (!self.batchOpening && !isBookmark) {
                        let historyLength = Math.max(searchData.prefConfig.historyLength, 20);
                        if (!ele.dataset.clone && historyLength) {
                            storage.getItem("historySites", data => {
                                historySites = (data || []);
                                historySites = historySites.filter(site => {return site && site != name});
                                historySites.unshift(name);
                                if (historySites.length > historyLength) {
                                    historySites = historySites.slice(0, historyLength);
                                }
                                storage.setItem("historySites", historySites);
                                self.initHistorySites();
                            });
                        }
                        if (searchData.prefConfig.sortType) {
                            storage.getItem("sortTypeNames", data => {
                                sortTypeNames = (data || {});
                                if (!sortTypeNames[ele.dataset.type]) {
                                    sortTypeNames[ele.dataset.type] = 1;
                                } else {
                                    sortTypeNames[ele.dataset.type] = sortTypeNames[ele.dataset.type] + 1;
                                }
                                storage.setItem("sortTypeNames", sortTypeNames);
                            });
                        }
                    }
                    if (/^c:/.test(data.url)) {
                        let url = getUrl();
                        if (!url) {
                            ele.href = "#";
                            return false;
                        } else if (url.indexOf('%input{') !== -1) {
                            self.showCustomInputWindow(url, _url => {
                                _GM_setClipboard(_url.replace(/^c:/, ""));
                                _GM_notification('Copied successfully!');
                            });
                        } else {
                            _GM_setClipboard(url.replace(/^c:/, ""));
                            _GM_notification('Copied successfully!');
                        }
                    } else if (/^\[/.test(data.url)) {
                        if (!ele.onclick) {
                            let siteNames = JSON.parse(data.url);
                            ele.onclick = e => {
                                self.batchOpen(siteNames, e);
                                return false;
                            };
                        }
                    } else if (/[:%]P{/.test(data.url)) {
                        if (!ele.onclick) {
                            ele.onclick = e => {
                                e.stopPropagation();
                                e.preventDefault();

                                let url = getUrl();
                                if (url === false) return false;
                                let postHandler = _url => {
                                    let postBody = _url.match(/[:%]P{(.*?)}/), postParam = {};
                                    if (postBody) {
                                        _url = _url.replace(postBody[0], '');
                                        postBody = postBody[1];
                                        postBody = new URLSearchParams(postBody);
                                        postBody.forEach((v, k) => {
                                            postParam[k] = v;
                                        });
                                    }
                                    _GM_xmlhttpRequest({
                                        method: "POST", url: _url, data: JSON.stringify(postParam),
                                        onload: (d) => {
                                            _GM_notification(i18n("postOver") + d.statusText);
                                        },
                                        onerror: (e) => {
                                            _GM_notification(i18n("postError") + (e.statusText || e.error));
                                        },
                                        ontimeout: (e) => {
                                            _GM_notification(i18n("postError") + (e.statusText || e.error));
                                        }
                                    });
                                }
                                if (url.indexOf('%input{') !== -1) {
                                    self.showCustomInputWindow(url, _url => {
                                        postHandler(_url);
                                    });
                                } else {
                                    postHandler(url);
                                }
                                return false;
                            };
                        }
                    } else if ((data.charset && data.charset != 'utf-8') || /[:%]p{/.test(data.url)) {
                        if (!ele.onclick) {
                            ele.onclick = e => {
                                ele.onclick = null;
                                e.stopPropagation();
                                e.preventDefault();
                                let url = getUrl();
                                if (url === false) return false;
                                if (url.indexOf('%input{') !== -1) {
                                    self.showCustomInputWindow(url, _url => {
                                        storage.setItem("postUrl", [_url, data.charset]);
                                        ele.href = _url.replace(/\?.*/, "").replace(/[:%]p{.*/, '');
                                        if (ele.target === '_blank') {
                                            _GM_openInTab(ele.href, {active: true});
                                        } else {
                                            location.href = ele.href;
                                        }
                                    });
                                } else {
                                    storage.setItem("postUrl", [url, data.charset]);
                                    ele.href = url.replace(/\?.*/, "").replace(/[:%]p{.*/, '');
                                    if (ele.target === '_blank') {
                                        _GM_openInTab(ele.href, {active: true});
                                    } else {
                                        location.href = ele.href;
                                    }
                                }
                                return false;
                            };
                        }
                    } else {
                        let alt = e && e.altKey;
                        let ctrl = e && (e.ctrlKey || e.metaKey);
                        let shift = e && e.shiftKey;
                        let url = getUrl();
                        if (!url) {
                            //wait for all input stoped
                            if (!self.stopInput) {
                                self.stopInput = true;
                                setTimeout(() => {
                                    self.stopInput = false;
                                }, 1);
                            }
                            //disable click
                            ele.onclick = e => {
                                ele.onclick = null;
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            };
                        } else {
                            ele.href = url;
                            if (!self.batchOpening) {
                                let isPage = /^(https?|ftp):/.test(url);
                                let checkAlt = () => {
                                    if (shift && !ctrl && !alt && e.isTrusted) return false;
                                    if ((alt || ctrl || shift) && isPage) {
                                        ele.onclick = e => {
                                            ele.onclick = null;
                                            if (ctrl && shift) {
                                                _GM_openInTab(url, {incognito: true});
                                            } else if (ctrl) {
                                                _GM_openInTab(url);
                                            } else if (alt) {
                                                if (data.match) {
                                                    let match = data.match.replace(/\\/g, "");
                                                    let mobileMatch = match.match(/\((www)\|([^\)\|]+)/);
                                                    while (mobileMatch) {
                                                        url = url.replace(mobileMatch[1], mobileMatch[2]);
                                                        match = match.replace(mobileMatch[0], "");
                                                        mobileMatch = match.match(/\(([^\)\|]+)\|([^\)\|]+)/);
                                                    }
                                                }
                                                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                                                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                                                let left = viewWidth - 450;
                                                let top = (viewHeight - 800) / 2;
                                                window.open(url + "#searchJumperMin" + (/#p{/.test(data.url) ? 'Post' : ''), "_blank", `width=450, height=800, location=0, resizable=1, status=0, toolbar=0, menubar=0, scrollbars=0, left=${left}, top=${top}`);
                                            } else if (shift) {
                                                _GM_openInTab(url, {active: true});
                                            }
                                            if (e.preventDefault) e.preventDefault();
                                            if (e.stopPropagation) e.stopPropagation();
                                            return false;
                                        };
                                        return true;
                                    }
                                    return false;
                                };
                                if (self.customInput) {
                                    //lose click, click one more time
                                    let checkCustomHandler = _url => {
                                        ele.href = _url;
                                        if (checkAlt() || !isPage) {
                                            ele.click();
                                        } else {
                                            _GM_openInTab(_url, {active: true});
                                        }
                                    };
                                    if (url.indexOf('%input{') !== -1) {
                                        ele.onclick = e => {
                                            ele.onclick = null;
                                            if (e.preventDefault) e.preventDefault();
                                            if (e.stopPropagation) e.stopPropagation();
                                            return false;
                                        };
                                        self.showCustomInputWindow(url, _url => {
                                            checkCustomHandler(_url);
                                        });
                                        return false;
                                    } else {
                                        checkCustomHandler(url);
                                    }
                                } else {
                                    if (!checkAlt()) {
                                        if (searchData.prefConfig.multiline == 1 || searchData.prefConfig.multiline == 2) {
                                            let selStr = getSelectStr();
                                            if (selStr &&
                                                /%s\b/.test(ele.dataset.url) &&
                                                selStr.indexOf("\n") !== -1) {
                                                if (searchData.prefConfig.multiline == 1 ||
                                                    confirm(i18n("multiline"))) {
                                                    let selStrArr = selStr.split("\n");
                                                    if (selStrArr.length > 10 && !confirm(i18n("multilineTooMuch"))) return;
                                                    let encodeSelStr = encodeURIComponent(selStr);
                                                    let searchIndex = 0;
                                                    let searchByLine = () => {
                                                        _GM_openInTab(url.replace(encodeSelStr, encodeURIComponent(selStrArr[searchIndex++])));
                                                        if (searchIndex < selStrArr.length) {
                                                            setTimeout(() => {
                                                                searchByLine();
                                                            }, searchData.prefConfig.multilineGap || 1000);
                                                        }
                                                    };
                                                    searchByLine();
                                                    if (searchData.prefConfig.multiline == 1) {
                                                        ele.onclick = e => {
                                                            ele.onclick = null;
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            return false;
                                                        };
                                                    }
                                                } else {
                                                    ele.click();
                                                }
                                                return false;
                                            }
                                        }
                                        ele.onclick = null;
                                    }
                                }
                            }
                        }
                    }
                };
                ele.href = data.url;
                ele.addEventListener('mousedown', action, false);

                ele.addEventListener('mouseenter', e => {
                    self.tipsPos(ele, ele.dataset.name);
                }, false);
                ele.addEventListener('mouseleave', e => {
                    self.tips.style.opacity = 0;
                }, false);
                return ele;
            }

            checkScroll(noIntoView) {
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                if (this.bar.scrollWidth > viewWidth || this.bar.scrollHeight > viewHeight) {
                    if (!this.bar.parentNode.classList.contains("search-jumper-scroll")) {
                        this.bar.style.cssText = "";
                        this.bar.parentNode.classList.add("search-jumper-scroll");
                    }
                } else {
                    if (this.bar.parentNode.classList.contains("search-jumper-scroll")) {
                        this.bar.style.cssText = "";
                        this.bar.parentNode.classList.remove("search-jumper-scroll");
                    }
                }
                if (noIntoView) return;
                let firstType = this.bar.querySelector(".search-jumper-type:not(.search-jumper-hide)");
                if (firstType) {
                    setTimeout(() => {
                        firstType.scrollIntoView({behavior: "smooth"});
                    }, 0);
                    if (firstType.style.width === "0px") {
                        firstType.style.width = "auto";
                    }
                    if (firstType.style.height === "0px") {
                        firstType.style.height = "auto";
                    }
                }
            }

            showInPage(funcKeyCall, e) {
                if (this.bar.contains(targetElement) || this.inInput || (!funcKeyCall && this.bar.classList.contains("funcKeyCall"))) {
                    return;
                }
                if (searchData.prefConfig.hidePopup) funcKeyCall = false;
                if (this.bar.parentNode && this.bar.parentNode.classList.contains("search-jumper-showall")) return;
                if (!targetElement) targetElement = document.body;
                let _targetElement = targetElement, children;
                while (_targetElement) {
                    if (_targetElement.tagName == 'IMG' || _targetElement.tagName == 'AUDIO' || _targetElement.tagName == 'VIDEO' || _targetElement.tagName == 'A') break;
                    if (_targetElement.parentNode) {
                        children = _targetElement.parentNode.querySelectorAll("img,audio,video,a");
                        if (children && children.length === 1 && children[0].clientHeight && _targetElement.clientHeight / children[0].clientHeight < 2) {
                            _targetElement = children[0];
                            break;
                        }
                    }
                    _targetElement = _targetElement.parentNode;
                }
                if (_targetElement) targetElement = _targetElement;
                this.appendBar();
                //this.recoveHistory();
                let firstType;
                let self = this;
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                }
                var delay = searchData.prefConfig.autoDelay || 1000;
                var hideHandler = () => {
                    self.bar.classList.remove("search-jumper-isInPage");
                    self.bar.classList.remove("search-jumper-isTargetImg");
                    self.bar.classList.remove("search-jumper-isTargetAudio");
                    self.bar.classList.remove("search-jumper-isTargetVideo");
                    self.bar.classList.remove("search-jumper-isTargetLink");
                    self.bar.classList.remove("search-jumper-isTargetPage");
                    self.bar.classList.remove("initShow");
                    self.hideTimeout = null;
                    if (searchData.prefConfig.autoHideAll) {
                        self.bar.style.display = 'none';
                    }
                };
                if (searchData.prefConfig.autoHide) this.hideTimeout = setTimeout(hideHandler, delay);
                this.bar.classList.remove("search-jumper-isInPage");
                this.bar.classList.remove("search-jumper-isTargetImg");
                this.bar.classList.remove("search-jumper-isTargetAudio");
                this.bar.classList.remove("search-jumper-isTargetVideo");
                this.bar.classList.remove("search-jumper-isTargetLink");
                this.bar.classList.remove("search-jumper-isTargetPage");
                this.bar.classList.add("initShow");
                if (getSelectStr()) {
                    this.bar.classList.add("search-jumper-isInPage");
                    if (this.bar.style.display == "none" || funcKeyCall) {
                        firstType = this.bar.querySelector('.search-jumper-needInPage:not(.notmatch)>span');
                    } else {
                        let openType = this.bar.querySelector(".search-jumper-type:not(.search-jumper-hide)");
                        if (!openType || openType.classList.contains('notmatch') ||
                            openType.classList.contains('search-jumper-targetPage') ||
                            openType.classList.contains('search-jumper-targetImg') ||
                            openType.classList.contains('search-jumper-targetAudio') ||
                            openType.classList.contains('search-jumper-targetVideo') ||
                            openType.classList.contains('search-jumper-targetLink')) {
                            firstType = this.bar.querySelector('.search-jumper-needInPage:not(.notmatch)>span');
                        }
                    }
                } else {
                    let parentNode = targetElement.parentNode;
                    switch (targetElement.tagName) {
                        case 'IMG':
                            this.bar.classList.add("search-jumper-isTargetImg");
                            firstType = this.bar.querySelector('.search-jumper-targetImg:not(.notmatch)>span');
                            break;
                        case 'AUDIO':
                            this.bar.classList.add("search-jumper-isTargetAudio");
                            firstType = this.bar.querySelector('.search-jumper-targetAudio:not(.notmatch)>span');
                            break;
                        case 'VIDEO':
                            this.bar.classList.add("search-jumper-isTargetVideo");
                            firstType = this.bar.querySelector('.search-jumper-targetVideo:not(.notmatch)>span');
                            break;
                        case 'A':
                            this.bar.classList.add("search-jumper-isTargetLink");
                            firstType = this.bar.querySelector('.search-jumper-targetLink:not(.notmatch)>span');
                            break;
                        default:
                            this.bar.classList.add("search-jumper-isTargetPage");
                            firstType = this.bar.querySelector('.search-jumper-targetPage:not(.notmatch)>span');
                            break;
                    }
                }
                if (this.bar.style.display == "none") {
                    this.bar.style.display = "";
                    this.initPos(
                        searchData.prefConfig.position.x,
                        searchData.prefConfig.position.y,
                        searchData.prefConfig.offset.x,
                        searchData.prefConfig.offset.y
                    );
                }
                this.bar.classList.remove("funcKeyCall");
                if (firstType && firstType.parentNode.classList.contains('search-jumper-hide')) {
                    if (!searchData.prefConfig.disableAutoOpen || funcKeyCall) {
                        firstType.onmousedown();
                    }
                    self.insertHistory(firstType.parentNode);
                }
                if (funcKeyCall) {
                    this.bar.classList.add("funcKeyCall");
                    this.bar.parentNode.classList.remove("search-jumper-scroll");
                } else {
                    this.bar.style.display = "";
                    this.initPos(
                        searchData.prefConfig.position.x,
                        searchData.prefConfig.position.y,
                        searchData.prefConfig.offset.x,
                        searchData.prefConfig.offset.y
                    );
                }

                if (funcKeyCall) {
                    self.bar.style.cssText = "";
                    self.bar.parentNode.style.cssText = "";
                    let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                    let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                    self.bar.style.position = "fixed";
                    let clientX = e.clientX - self.bar.clientWidth / 2;
                    if (clientX < 0) clientX = 5;
                    else if (clientX + self.bar.clientWidth > viewWidth) clientX = viewWidth - self.bar.clientWidth - 20;
                    let clientY = e.clientY;
                    if (clientY > viewHeight / 5) clientY -= (self.bar.clientHeight + 20);
                    else clientY += 30;
                    if (clientX < viewWidth / 2) {
                        self.bar.style.left = clientX + "px";
                        self.bar.style.transformOrigin = '0 0';
                    } else {
                        self.bar.style.right = viewWidth - clientX - self.bar.clientWidth - 15 + "px";
                        self.bar.style.transformOrigin = '100% 0';
                    }
                    self.bar.style.top = clientY + "px";
                    self.removeBar();
                    self.bar.style.opacity = 0;
                    setTimeout(() => {
                        self.appendBar();
                        setTimeout(() => {
                            self.bar.style.opacity = 1;
                        }, 10);
                    }, 1);
                } else {
                    setTimeout(() => {
                        self.checkScroll();
                    }, 251);
                }
            }

            initPos(relX, relY, posX, posY) {
                let self = this;
                let setClass = className => {
                    self.bar.style.cssText = "";
                    self.bar.parentNode.style.cssText = "";
                    self.bar.parentNode.className = "search-jumper-searchBarCon " + className;
                    let baseSize = Math.min(self.bar.scrollWidth, self.bar.scrollHeight);
                    let leftRight = self.bar.parentNode.classList.contains("search-jumper-left") ||
                        self.bar.parentNode.classList.contains("search-jumper-right");
                    searchTypes.forEach(ele => {
                        ele.style.width = "";
                        ele.style.height = "";
                        let scrollSize = Math.max(ele.scrollWidth, ele.scrollHeight) + "px";
                        if (ele.classList.contains("search-jumper-hide")) {
                            if (leftRight) {
                                ele.style.height = baseSize + "px";
                            } else {
                                ele.style.width = baseSize + "px";
                            }
                        } else {
                            if (leftRight) {
                                ele.style.height = scrollSize;
                            } else {
                                ele.style.width = scrollSize;
                            }
                        }
                    });
                };
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                var maxSize = Math.max(self.bar.scrollWidth, self.bar.scrollHeight);

                if (posX > viewWidth - maxSize) {
                    posX = viewWidth - maxSize;
                }
                if (posX < 0) {
                    posX = 0;
                }

                if (posY > viewHeight - maxSize) {
                    posY = viewHeight - maxSize;
                }
                if (posY < 0) {
                    posY = 0;
                }
                if (relX == "center" && relY == "top") {
                    //上中
                    setClass("");
                    self.bar.style.position = "relative";
                } else if (relX == "left" && relY == "top") {
                    if (posX > posY) {
                        //上左
                        setClass("");
                        self.bar.style.position = "fixed";
                        self.bar.style.left = posX + "px";
                    } else {
                        //左上
                        setClass("search-jumper-left");
                        self.bar.style.position = "fixed";
                        self.bar.style.top = posY + "px";
                    }
                } else if (relX == "right" && relY == "top") {
                    if (posX > posY) {
                        //上右
                        setClass("");
                        self.bar.style.position = "fixed";
                        self.bar.style.right = posX + "px";
                    } else {
                        //右上
                        setClass("search-jumper-right");
                        self.bar.style.position = "fixed";
                        self.bar.style.top = posY + "px";
                    }
                } else if (relX == "center" && relY == "bottom") {
                    //下中
                    setClass("search-jumper-bottom");
                    self.bar.style.position = "relative";
                } else if (relX == "left" && relY == "bottom") {
                    if (posX > posY) {
                        //下左
                        setClass("search-jumper-bottom");
                        self.bar.style.position = "fixed";
                        self.bar.style.left = posX + "px";
                    } else {
                        //左下
                        setClass("search-jumper-left");
                        self.bar.style.position = "fixed";
                        self.bar.style.bottom = posY + "px";
                    }
                } else if (relX == "right" && relY == "bottom") {
                    if (posX >= posY) {
                        //下右
                        setClass("search-jumper-bottom");
                        self.bar.style.position = "fixed";
                        self.bar.style.right = posX + "px";
                    } else {
                        //右下
                        setClass("search-jumper-right");
                        self.bar.style.position = "fixed";
                        self.bar.style.bottom = posY + "px";
                    }
                } else if (relX == "left" && relY == "center") {
                    //左中
                    setClass("search-jumper-left");
                    self.bar.style.position = "absolute";
                    self.bar.style.marginTop = posY + "px";
                    self.bar.parentNode.style.display = "flex";
                    self.bar.parentNode.style.justifyContent = "center";
                } else if (relX == "right" && relY == "center") {
                    //右中
                    setClass("search-jumper-right");
                    self.bar.style.position = "absolute";
                    self.bar.style.marginTop = posY + "px";
                    self.bar.parentNode.style.display = "flex";
                    self.bar.parentNode.style.justifyContent = "center";
                    self.bar.parentNode.style.alignItems = "flex-end";
                }
                searchData.prefConfig.position.x = relX;
                searchData.prefConfig.position.y = relY;
                searchData.prefConfig.offset.x = posX;
                searchData.prefConfig.offset.y = posY;
                setTimeout(() => {
                    if (!searchData.prefConfig.disableAutoOpen) {
                        if (self.currentType && !self.currentType.classList.contains('search-jumper-hide')) {
                            self.currentType.style.width = self.currentType.scrollWidth + "px";
                            self.currentType.style.height = self.currentType.scrollHeight + "px";
                        }
                    }
                    if (self.bar.scrollWidth > viewWidth || self.bar.scrollHeight > viewHeight) {
                        self.bar.parentNode.classList.add("search-jumper-scroll");
                    } else {
                        self.bar.parentNode.classList.remove("search-jumper-scroll");
                    }
                }, 251);
                setTimeout(() => {
                    self.checkScroll();
                }, 251);
            }
        }

        class Picker {
            static picker;
            constructor() {
                this.init();
            }

            static getInstance() {
                if (!Picker.picker) {
                    Picker.picker = new Picker();
                }
                return Picker.picker;
            }

            getSelector(callback) {
                this.close();
                this.toggle();
                this.callback = callback;
            }

            init() {
                let self = this;
                this.clickedIndex = 0;
                this.signList = [];//所有标记
                this.clickedEles = {};//点击的元素
                let cssText = `
                 body.searchJumper-picker,
                 body.searchJumper-picker *:hover,
                 body.searchJumper-picker a:hover {
                  cursor: crosshair !important;
                 }
                `;
                _GM_addStyle(cssText);
                this.mainSignDiv = this.createSignDiv();
                this.setImportant(this.mainSignDiv, "pointer-events", "none");
                this.moveHandler = e => {
                    if (e.target === document) return;
                    self.adjustSignDiv(self.mainSignDiv, self.getTarget(e.target));
                };
                this.leaveHandler = e => {
                    if (this.mainSignDiv.parentNode) this.mainSignDiv.parentNode.removeChild(this.mainSignDiv);
                };
                this.enterHandler = e => {
                    document.body.appendChild(this.mainSignDiv);
                };
                this.clickHandler = e => {
                    if (self.inPicker) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    let target = self.getTarget(e.target);
                    if (self.callback) {
                        if (target) {
                            let sel = self.geneSelector(target, true);
                            self.callback(sel);
                            self.close();
                        }
                        return;
                    }
                    let sign = self.createSignDiv();
                    self.clickedEles[self.clickedIndex] = target;
                    self.appendSign(sign, target, self.clickedIndex);
                    self.clickedIndex++;
                    searchBar.bar.parentNode.classList.add("selectedEle");
                };
            }

            appendSign(sign, target, index) {
                target.dataset.signNum = parseInt(target.dataset.signNum || 0) + 1;
                sign.dataset.target = index;
                document.body.appendChild(sign);
                this.adjustSignDiv(sign, target);
                this.signList.push([sign, target]);
            }

            removeSign(sign) {
                document.body.removeChild(sign);
                for (let i = 0; i < this.signList.length; i++) {
                    let signArr = this.signList[i];
                    if (signArr[0] === sign) {
                        this.signList.splice(i, 1);
                        break;
                    }
                }
                let targetIndex = sign.dataset.target;
                let target = this.clickedEles[targetIndex];
                if (!target) return;
                let signNum = parseInt(target.dataset.signNum || 0) - 1;
                target.dataset.signNum = signNum;
                if (signNum <= 0) {
                    delete this.clickedEles[targetIndex];
                }
            }

            getTarget(ele) {
                while (ele.parentNode && (ele.offsetWidth === 0 || ele.offsetHeight === 0)) {
                    ele = ele.parentNode;
                }
                return ele;
            }

            close() {
                this.callback = null;
                this.clearSigns();
                this.clickedEles = {};
                if (this.mainSignDiv.parentNode) this.mainSignDiv.parentNode.removeChild(this.mainSignDiv);
                document.body.classList.remove("searchJumper-picker");
                searchBar.bar.parentNode.classList.remove("selectedEle");
                searchBar.bar.parentNode.removeEventListener("mouseenter", this.leaveHandler, true);
                document.body.removeEventListener("mousemove", this.moveHandler, true);
                document.body.removeEventListener("mouseenter", this.enterHandler, true);
                document.body.removeEventListener("click", this.clickHandler, true);
                this.inPicker = false;
            }

            setImportant(ele, prop, value) {
                ele.style.setProperty(prop, value, "important");
            }

            createSignDiv() {
                let signDiv = document.createElement("div");
                this.setImportant(signDiv, "position", "absolute");
                this.setImportant(signDiv, "z-index", "2147483647");
                this.setImportant(signDiv, "background", "rgba(120, 170, 210, 0.6)");
                this.setImportant(signDiv, "transition", "all 0.15s ease-out");
                this.setImportant(signDiv, "box-shadow", "rgb(0 0 0) 0px 0px 3px 0px");
                this.setImportant(signDiv, "cursor", "pointer");
                signDiv.addEventListener("mouseenter", e => {
                    if (this.mainSignDiv.parentNode) this.mainSignDiv.parentNode.removeChild(this.mainSignDiv);
                }, true);
                signDiv.addEventListener("mouseleave", e => {
                    document.body.appendChild(this.mainSignDiv);
                }, true);
                signDiv.addEventListener("mousedown", e => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.removeSign(signDiv);
                    document.body.appendChild(this.mainSignDiv);
                }, true);
                return signDiv;
            }

            adjustSignDiv(div, target) {
                let rect = target.getBoundingClientRect();
                this.setImportant(div, "width", rect.width + "px");
                this.setImportant(div, "height", rect.height + "px");
                this.setImportant(div, "left", rect.left + window.scrollX + "px");
                this.setImportant(div, "top", rect.top + window.scrollY + "px");
            }

            geneSelector(ele, id) {
                let selector = ele.tagName.toLowerCase();
                if (ele.tagName !== "HTML" && ele.tagName !== "BODY") {
                    if (id && ele.id) selector += '#' + ele.id;
                    if (ele.className) {
                        let classLen = ele.classList.length;
                        selector += [].map.call(ele.classList, d => /^[\w]+$/.test(d) || (classLen < 3 && /^[\w\-_]+$/.test(d)) ? ('.' + d) : "").join('');
                    }
                    let parent = ele.parentElement;
                    if (parent) {
                        selector = this.geneSelector(parent, !!id) + ' > ' + selector;
                    }
                }
                return selector;
            }

            copy() {
                let self = this;
                let html = "", text = "";
                this.signList.forEach(sign => {
                    text += "\n" + sign[1].innerText;
                    html += sign[1].outerHTML;
                });
                text = text.trim();
                const htmlData = new Blob([html], {type: 'text/html'})
                const textData = new Blob([text], {type: 'text/plain'})
                try {
                    const item = new ClipboardItem({'text/html': htmlData, 'text/plain': textData});
                    navigator.clipboard.write([item]).then(
                        () => {
                            _GM_notification('Copied successfully!');
                        },
                        (e) => {
                            _GM_setClipboard(text);
                            console.log(e);
                        }
                    );
                } catch(e) {
                    _GM_setClipboard(text);
                }
            }

            getPickerStr() {
                if (!this.inPicker) return "";
                let resultStr = "";
                this.signList.forEach(sign => {
                    resultStr += "\n" + sign[1].innerText;
                });
                return resultStr.trim();
            }

            expand() {
                let self = this;
                this.clearSigns();
                Object.keys(this.clickedEles).forEach(index => {
                    let target = self.clickedEles[index];
                    let sel = self.geneSelector(target);
                    target.dataset.signNum = 0;
                    [].forEach.call(document.querySelectorAll(sel), ele => {
                        let sign = self.createSignDiv();
                        document.body.appendChild(sign);
                        self.appendSign(sign, ele, index);
                    });
                });
            }

            collapse() {
                let self = this;
                this.clearSigns();
                Object.keys(this.clickedEles).forEach(index => {
                    let target = self.clickedEles[index];
                    target.dataset.signNum = 0;
                    let sign = self.createSignDiv();
                    document.body.appendChild(sign);
                    self.appendSign(sign, target, index);
                });
            }

            clearSigns() {
                this.signList.forEach(sign => {
                    sign = sign[0];
                    if (sign.parentNode) sign.parentNode.removeChild(sign);
                });
                this.signList = [];
            }

            toggle() {
                if (this.inPicker) {
                    this.close();
                    return;
                }
                this.inPicker = true;
                document.body.appendChild(this.mainSignDiv);
                document.body.classList.add("searchJumper-picker");

                searchBar.bar.parentNode.addEventListener("mouseenter", this.leaveHandler, true);
                document.body.addEventListener("mousemove", this.moveHandler, true);
                document.body.addEventListener("mouseenter", this.enterHandler, true);
                document.body.addEventListener("click", this.clickHandler, true);
            }
        }

        async function emuInput(sel, v) {
            await new Promise((resolve) => {
                let checkInv = setInterval(() => {
                    let input = getElement(sel);
                    if (input) {
                        let event = new Event('focus', { bubbles: true });
                        input.dispatchEvent(event);
                        let lastValue = input.value;
                        if (input.tagName == "INPUT") {
                            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                            nativeInputValueSetter.call(input, v);
                        } else {
                            var nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
                            nativeTextareaValueSetter.call(input, v);
                        }
                        event = new Event('input', { bubbles: true });
                        let tracker = input._valueTracker;
                        if (tracker) {
                            tracker.setValue(lastValue);
                        }
                        input.dispatchEvent(event);
                        event = new Event('change', { bubbles: true });
                        input.dispatchEvent(event);

                        clearInterval(checkInv);
                        resolve();
                    }
                }, 100);
            });
        }

        async function emuClick(sel) {
            await new Promise((resolve) => {
                let checkInv = setInterval(() => {
                    let btn = getElement(sel);;
                    if (btn) {
                        clearInterval(checkInv);
                        if(!PointerEvent) return btn.click();
                        let eventParam = {
                            isTrusted: true,
                            altKey: false,
                            azimuthAngle: 0,
                            bubbles: true,
                            button: 0,
                            buttons: 0,
                            clientX: 1,
                            clientY: 1,
                            cancelBubble: false,
                            cancelable: true,
                            composed: true,
                            ctrlKey: false,
                            defaultPrevented: false,
                            detail: 1,
                            eventPhase: 2,
                            fromElement: null,
                            height: 1,
                            isPrimary: false,
                            metaKey: false,
                            pointerId: 1,
                            pointerType: "mouse",
                            pressure: 0,
                            relatedTarget: null,
                            returnValue: true,
                            shiftKey: false,
                            toElement: null,
                            twist: 0,
                            which: 1
                        };
                        btn.focus();
                        var mouseEvent = new PointerEvent("mouseover",eventParam);
                        btn.dispatchEvent(mouseEvent);
                        mouseEvent = new PointerEvent("pointerover",eventParam);
                        btn.dispatchEvent(mouseEvent);
                        mouseEvent = new PointerEvent("mousedown",eventParam);
                        btn.dispatchEvent(mouseEvent);
                        mouseEvent = new PointerEvent("pointerdown",eventParam);
                        btn.dispatchEvent(mouseEvent);
                        mouseEvent = new PointerEvent("mouseup",eventParam);
                        btn.dispatchEvent(mouseEvent);
                        mouseEvent = new PointerEvent("pointerup",eventParam);
                        btn.dispatchEvent(mouseEvent);
                        btn.click();
                        resolve();
                    }
                }, 100);
            });
        }

        function submitByForm(charset, url, target) {
            currentFormParams = {charset: charset, url: url, target: target};
            if (url.indexOf("#submitBySearchJumper") !== -1) {
                currentFormParams = {charset: charset, url: url.replace("#submitBySearchJumper", ""), target: target};
                jumpBySearchJumper();
                return;
            }
            const formId ="searchJumper_form";
            var form = document.getElementById(formId);
            if (!form) {
                form = document.createElement("form");
                form.id = formId;
                form.style.display = "none";
                document.documentElement.appendChild(form);
            }
            var params;
            let postBody = url.match(/[:%]p{(.*?)}/);
            let targetUrl = url;
            if (postBody) {
                targetUrl = url.replace(postBody[0], '');
                postBody = postBody[1];
                form.method = 'post';
                params = new URLSearchParams(postBody);
            } else {
                form.method = 'get';
                params = new URLSearchParams(new URL(targetUrl).search);
            }
            if (charset) {
                form.acceptCharset = charset;
            }
            form.innerHTML = createHTML();
            form.target = target;
            form.action = targetUrl;
            params.forEach((v, k) => {
                let input = document.createElement("input");
                input.name = k;
                input.value = v;
                form.appendChild(input);
            });
            return form.submit();
        }

        async function image2Base64(img) {
            if (!img || !img.src) return null;
            let urlSplit=img.src.split("/");
            if (urlSplit[2] == document.domain) {
                let imgStyle = getComputedStyle(img);
                var canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth || img.width || parseInt(imgStyle.width);
                canvas.height = img.naturalHeight || img.height || parseInt(imgStyle.height);
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                return (canvas.toDataURL("image/png"));
            } else {
                return new Promise((resolve) => {
                    _GM_xmlhttpRequest({
                        method: 'GET',
                        url: img.src,
                        responseType:'arraybuffer',
                        headers: {
                            origin: urlSplit[0] + "//" + urlSplit[2],
                            referer: img.src,
                            accept: "*/*"
                        },
                        onload: function(d) {
                            var binary = '';
                            var bytes = new Uint8Array(d.response);
                            for (var len = bytes.byteLength, i = 0; i < len; i++) {
                                binary += String.fromCharCode(bytes[i]);
                            }
                            resolve(`data:image/jpeg;base64,${window.btoa(binary)}`);
                        },
                        onerror: function(){
                            resolve(null);
                        },
                        ontimeout: function(){
                            resolve(null);
                        }
                    });
                });
            }
        }

        function icon2Base64(icon) {
            let iconStyle = getComputedStyle(icon);
            let content = getComputedStyle(icon,':before').content.replace(/"/g, '');
            if (!content) return false;
            var canvas = document.createElement("canvas");
            canvas.width = icon.clientWidth || parseInt(iconStyle.lineHeight);
            canvas.height = icon.clientHeight || parseInt(iconStyle.lineHeight);
            var ctx = canvas.getContext("2d");
            ctx.font = iconStyle.font;
            ctx.strokeStyle = iconStyle.color || "black";
            ctx.fillStyle = iconStyle.color || "black";
            ctx.textBaseline = "top";
            let metrics = ctx.measureText(content);
            ctx.fillText(content, (canvas.width - metrics.width) / 2, (canvas.height - parseInt(iconStyle.fontSize)) / 2);
            return canvas.toDataURL("image/png");
        }

        async function cacheImg(img) {
            if (cacheIcon[img.src]) return;
            let cache = await image2Base64(img);
            if (cache == 'data:,' || !cache) cache = 'fail';
            cacheIcon[img.src] = cache;
            storage.setItem("cacheIcon", cacheIcon);
        }

        function cacheFontIcon(icon) {
            let iconName = icon.className.replace('fa fa-', '');
            if (cacheIcon[iconName]) return;
            let cache = icon2Base64(icon);
            if (cache == 'data:,' || !cache) cache = 'fail';
            cacheIcon[iconName] = cache;
            storage.setItem("cacheIcon", cacheIcon);
        }

        async function cacheAction(target) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1);
            });
            if (!searchData.prefConfig.cacheSwitch) return;
            if (target.tagName == 'IMG') {
                if (!target.src && target.dataset.src) target.src = target.dataset.src;
                let cache;
                if (target.complete) {
                    if (target.naturalHeight && target.naturalWidth) {
                        await cacheImg(target);
                    } else {
                        cacheIcon[target.src] = 'fail';
                        storage.setItem("cacheIcon", cacheIcon);
                    }
                } else {
                    let loaded = await new Promise((resolve) => {
                        target.addEventListener('load', e => {
                            resolve(true);
                        }, true);
                        target.addEventListener('error', e => {
                            resolve(false);
                        }, true);
                    });
                    if (loaded) await cacheImg(target);
                    else {
                        cacheIcon[target.src] = 'fail';
                        storage.setItem("cacheIcon", cacheIcon);
                    }
                }
            } else {
                cacheFontIcon(target);
            }
        }

        async function cacheImgManager() {
            if (searchData.prefConfig.cacheSwitch) {
                let needCache = cachePool.length > 0;
                while (cachePool.length > 0) {
                    await cacheAction(cachePool.shift());
                }
                if (needCache) {
                    debug('SearchJumper all img icons cached!');
                }
            }
        }

        async function cacheFontManager() {
            if (searchData.prefConfig.cacheSwitch) {
                let needCache = cacheFontPool.length > 0;
                while (cacheFontPool.length > 0) {
                    await cacheAction(cacheFontPool.shift());
                }
                if (needCache) {
                    debug('SearchJumper all font icons cached!');
                }
            }
        }

        function getSelectStr() {
            let selStr = Picker.getInstance().getPickerStr() || window.getSelection().toString();
            if (selStr) {
                selStr = selStr.trim();
                if (selStr) {
                    return selStr;
                }
            }
            return "";
        }

        function getKeywords() {
            let selStr = getSelectStr();
            if (selStr) {
                return selStr;
            }
            if (!currentSite) return localKeywords || '';
            //if (localKeywords === '' && cacheKeywords) return cacheKeywords;

            let keywordsMatch, keywords = '';
            if (currentSite.charset && currentSite.charset != 'UTF-8') {
                let firstInput = document.body.querySelector('input[type=text]:not([readonly]),input:not([type])');
                if (firstInput) keywords = firstInput.value;
            } else {
                if (currentSite.keywords) {
                    if (/^[\w\|]+$/.test(currentSite.keywords)) {
                        let keywordsList = currentSite.keywords.split("|");
                        let urlParams = new URLSearchParams(location.search);
                        for (let i = 0; i < keywordsList.length; i++) {
                            keywords = urlParams.get(keywordsList[i]);
                            if (keywords) break;
                        }
                    } else {
                        keywordsMatch = location.href.match(new RegExp(currentSite.keywords));
                        if (keywordsMatch) {
                            keywords = keywordsMatch[1];
                        }
                    }
                } else if (/%s\b/.test(currentSite.url) && !/[#:%]p{/.test(currentSite.url)) {
                    if (location.href.indexOf("?") != -1) {
                        keywordsMatch = currentSite.url.match(/[\?&]([^&]*?)=%s\b.*/);
                        if (keywordsMatch) {
                            keywords = new URLSearchParams(location.search).get(keywordsMatch[1]);
                        }
                    } else {
                        keywordsMatch = currentSite.url.match(/https?:\/\/[^\/]*\/(.*)%s\b/);
                        if (keywordsMatch) {
                            keywordsMatch = location.href.match(new RegExp((keywordsMatch[1] || (location.host.replace(/\./g, "\\.") + "/")) + "(.*?)(\/|$)"));
                            if (keywordsMatch) {
                                keywords = keywordsMatch[1];
                            }
                        }
                    }
                }
                if (keywords) {
                    try {
                        keywords = decodeURIComponent(keywords);
                    } catch (e) {}
                }
            }
            if (keywords == '' && document.body) {
                let firstInput = document.body.querySelector('input[type=text]:not([readonly]),input:not([type])');
                if (firstInput) keywords = firstInput.value;
            }
            if (keywords) localKeywords = keywords;
            return localKeywords;//!localKeywords ? cacheKeywords : localKeywords;
        }

        function eventSupported(eventName, elem) {
            elem = elem || document.createElement("div");
            eventName = "on" + eventName;
            var isSupported = (eventName in elem);
            if (!isSupported) {
                if (!elem.setAttribute) {
                    elem = document.createElement("div");
                };
                var setAttr;
                if (!elem.hasAttribute(eventName)) {
                    setAttr = true;
                    elem.setAttribute(eventName, "return;");
                };
                isSupported = typeof elem[eventName] == "function";
                if (setAttr) elem.removeAttribute(eventName);
            }
            return isSupported;
        }

        function getSupportWheelEventName() {
            var ret = 'DOMMouseScroll';
            if (eventSupported('wheel')) {
                ret = 'wheel';
            } else if (eventSupported('mousewheel')) {
                ret = 'mousewheel';
            }
            return ret;
        }

        let draging = false;
        function initListener() {
            _GM_registerMenuCommand(i18n('settings'), () => {
                _GM_openInTab(configPage, {active: true});
            });
            _GM_registerMenuCommand(i18n('searchInPage'), () => {
                searchBar.showInPage();
                searchBar.showInPageSearch();
            });
            _GM_registerMenuCommand(i18n('search'), () => {
                searchBar.searchAuto(0, {});
            });
            let logoSvg = logoBtn.children[0];
            let grabState = 0;//0 未按下 1 已按下 2 已拖动
            let hideTimer;
            let touchStart = false;

            let clientX = e => {
                if (e.type.indexOf('mouse') === 0) {
                    return e.clientX;
                } else {
                    return e.changedTouches[0].clientX;
                }
            };

            let clientY = e => {
                if (e.type.indexOf('mouse') === 0) {
                    return e.clientY;
                } else {
                    return e.changedTouches[0].clientY;
                }
            };

            let mouseUpHandler = e => {
                clearTimeout(hideTimer);
                document.removeEventListener('mouseup', mouseUpHandler, false);
                document.removeEventListener('mousemove', mouseMoveHandler, false);
                document.removeEventListener('touchend', mouseUpHandler, false);
                document.removeEventListener('touchmove', mouseMoveHandler, false);
                searchBar.bar.style.marginLeft = "";
                searchBar.bar.style.marginTop = "";
                searchBar.bar.style.transform = "";
                if (grabState === 1) {
                    grabState = 0;
                    searchBar.showAllSites();
                    //_GM_openInTab(configPage, {active: true});
                    return;
                }
                grabState = 0;
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                let baseWidth = viewWidth / 3;
                let baseHeight = viewHeight / 3;
                let relX, relY, posX, posY;
                let curX = clientX(e);
                let curY = clientY(e);
                if (curX < baseWidth) {
                    relX = "left";
                    posX = parseInt(searchBar.bar.style.left) > 0 ? parseInt(searchBar.bar.style.left) : "0";
                } else if (curX < baseWidth * 2) {
                    relX = "center";
                    posX = parseInt(searchBar.bar.style.left) - viewWidth / 2;
                } else {
                    relX = "right";
                    posX = viewWidth - parseInt(searchBar.bar.style.left) - searchBar.bar.scrollWidth;
                }
                if (curY < viewHeight / 2) {
                    relY = "top";
                    posY = parseInt(searchBar.bar.style.top);
                } else {
                    relY = "bottom";
                    posY = viewHeight - parseInt(searchBar.bar.style.top) - searchBar.bar.scrollHeight;
                    if (posY < 0) {
                        posY = 0;
                    }
                }
                logoSvg.style.cursor = "";
                let firstType = searchBar.bar.querySelector('.search-jumper-type:not(.search-jumper-hide)>span');
                if (firstType) firstType.onmousedown();
                searchBar.initPos(relX, relY, posX, posY);
                storage.setItem("searchData", searchData);
            };

            let mouseMoveHandler = e => {
                if (grabState === 1) {
                    clearTimeout(hideTimer);
                    logoSvg.style.cursor = "grabbing";
                    searchBar.bar.style.position = "fixed";
                    searchBar.bar.style.marginLeft = "0";
                    searchBar.bar.style.marginTop = "0";
                    searchBar.bar.style.right = "";
                    searchBar.bar.style.bottom = "";
                    searchBar.bar.style.transform = "unset";
                    searchBar.bar.parentNode.classList.remove("search-jumper-scroll");
                    searchBar.bar.className = "search-jumper-searchBar";
                }
                grabState = 2;
                searchBar.bar.style.left = clientX(e) - searchBar.bar.scrollWidth + 20 + "px";
                searchBar.bar.style.top = clientY(e) - searchBar.bar.scrollHeight + 20 + "px";
            };

            logoBtn.oncontextmenu = function (event) {
                searchBar.bar.style.display = 'none';
                document.removeEventListener('mouseup', mouseUpHandler, false);
                document.removeEventListener('mousemove', mouseMoveHandler, false);
                document.removeEventListener('touchend', mouseUpHandler, false);
                document.removeEventListener('touchmove', mouseMoveHandler, false);
                event.preventDefault();
            };

            logoBtn.addEventListener('mousedown', e => {
                if (touchStart) {
                    touchStart = false;
                    return;
                }
                if (e.which === 3) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (searchBar.inInput || e.which === 2 || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                    _GM_openInTab(configPage, {active: true});
                    return;
                }
                grabState = 1;
                document.addEventListener('mouseup', mouseUpHandler, false);
                setTimeout(() => {
                    if (grabState === 1) {
                        document.addEventListener('mousemove', mouseMoveHandler, false);
                    }
                }, 100);
                hideTimer = setTimeout(() => {
                    searchBar.bar.style.display = 'none';
                    document.removeEventListener('mouseup', mouseUpHandler, false);
                    document.removeEventListener('mousemove', mouseMoveHandler, false);
                }, 2000);
            }, false);

            logoBtn.addEventListener('touchstart', e => {
                e.preventDefault();
                e.stopPropagation();
                touchStart = true;
                grabState = 1;
                document.addEventListener('touchend', mouseUpHandler, false);
                setTimeout(() => {
                    if (grabState === 1) {
                        document.addEventListener('touchmove', mouseMoveHandler, false);
                    }
                }, 100);
                hideTimer = setTimeout(() => {
                    searchBar.bar.style.display = 'none';
                    document.removeEventListener('touchend', mouseUpHandler, false);
                    document.removeEventListener('touchmove', mouseMoveHandler, false);
                }, 2000);
            }, false);

            searchBar.bar.addEventListener(getSupportWheelEventName(), e => {
                let targetClassList = searchBar.bar.parentNode.classList;
                if (!targetClassList.contains('search-jumper-scroll')) return;
                if (targetClassList.contains('search-jumper-left') ||
                    targetClassList.contains('search-jumper-right')) return;
                var deltaX, deltaY;
                if(e.type !== 'wheel'){
                    var x = 0, y = 0;
                    if (typeof e.axis == 'number') {
                        if (e.axis == 2) {
                            y = e.detail;
                        } else {
                            x = e.detail;
                        }
                    } else {
                        if (typeof e.wheelDeltaY == 'undefined' || e.wheelDeltaY != 0) {
                            y = -e.wheelDelta / 40;
                        } else {
                            x = -e.wheelDelta / 40;
                        };
                    };
                    deltaY = y;
                    deltaX = x;

                } else {
                    deltaX = e.deltaX;
                    deltaY = e.deltaY;
                }
                e.preventDefault();
                e.stopPropagation();

                searchBar.bar.parentNode.scrollLeft += deltaY;
            }, false);

            document.addEventListener('searchJumper', e => {
                switch (e.detail.action) {
                    case "search":
                        if (e.detail.name) {
                            searchBar.searchBySiteName(e.detail.name, e.detail.key || {});
                        } else {
                            searchBar.searchAuto(e.detail.index, e.detail.key || {});
                        }
                        break;
                    case "show":
                        searchBar.showInPage();
                        break;
                }
            });
            if (searchData.prefConfig.enableInPage) {
                let shown = false;
                let showToolbarTimer;
                if (searchData.prefConfig.shortcutKey) {
                    document.addEventListener('keydown', e => {
                        if (e.target.id === "searchJumperInput") return;
                        if ((searchData.prefConfig.callBarAlt && !e.altKey) ||
                            (searchData.prefConfig.callBarCtrl && !e.ctrlKey) ||
                            (searchData.prefConfig.callBarShift && !e.shiftKey) ||
                            (searchData.prefConfig.callBarMeta && !e.metaKey)) {
                            return;
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            } else {
                                let contentEditable = false;
                                let parent = document.activeElement;
                                while (parent) {
                                    contentEditable = parent.contentEditable == 'true';
                                    if (contentEditable || parent.tagName == 'BODY') {
                                        break;
                                    }
                                    parent = parent.parentNode;
                                }
                                if (contentEditable) return;
                            }
                        }
                        var key = (e.key || String.fromCharCode(e.keyCode)).toLowerCase();
                        if (searchData.prefConfig.shortcutKey == key) {
                            searchBar.bar.classList.remove("funcKeyCall");
                            searchBar.showInPage();
                            if (!searchData.prefConfig.disableInputOnWords || searchBar.inInput || !getSelectStr()) {
                                searchBar.showSearchInput();
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }

                if (searchData.prefConfig.showAllShortcutKey) {
                    document.addEventListener('keydown', e => {
                        if (e.target.id === "searchJumperInput") return;
                        if ((searchData.prefConfig.showAllAlt && !e.altKey) ||
                            (searchData.prefConfig.showAllCtrl && !e.ctrlKey) ||
                            (searchData.prefConfig.showAllShift && !e.shiftKey) ||
                            (searchData.prefConfig.showAllMeta && !e.metaKey)) {
                            return;
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            } else {
                                let contentEditable = false;
                                let parent = document.activeElement;
                                while (parent) {
                                    contentEditable = parent.contentEditable == 'true';
                                    if (contentEditable || parent.tagName == 'BODY') {
                                        break;
                                    }
                                    parent = parent.parentNode;
                                }
                                if (contentEditable) return;
                            }
                        }
                        var key = (e.key || String.fromCharCode(e.keyCode)).toLowerCase();
                        if (searchData.prefConfig.showAllShortcutKey == key) {
                            searchBar.bar.classList.remove("funcKeyCall");
                            searchBar.appendBar();
                            searchBar.showAllSites();
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }

                let clientRect;
                if (searchData.prefConfig.leftMouse) {
                    document.addEventListener('selectionchange', (e) => {
                        if (window.getSelection().toString()) {
                            const selection = window.getSelection();
                            const range = selection.getRangeAt(0);
                            clientRect = range.getBoundingClientRect();
                        } else {
                            clientRect = null;
                        }
                    });
                }
                let waitForMouse = false;
                let clickHandler = e => {
                    if (shown) {
                        e.preventDefault();
                    }
                    shown = false;
                    document.removeEventListener('click', clickHandler, true);
                };
                let mouseDownHandler = e => {
                    if ((waitForMouse && e.type === 'mousedown' && e.which === 1) ||
                        e.target.classList.contains('search-jumper-btn') ||
                        e.target.tagName === 'CANVAS' ||
                        e.target.tagName === 'HTML' ||
                        searchBar.bar.contains(e.target)) {
                        return;
                    }
                    let inputSign = false;
                    if (!searchData.prefConfig.enableInInput) {
                        if (e.target.tagName == 'INPUT' ||
                            e.target.tagName == 'TEXTAREA' ||
                            e.target.contentEditable == 'true') {
                            inputSign = true;
                            //searchBar.waitForHide();
                            //return;
                        } else {
                            let contentEditable = false;
                            let parent = e.target;
                            while (parent) {
                                contentEditable = parent.contentEditable == 'true';
                                if (contentEditable || parent.tagName == 'BODY') {
                                    break;
                                }
                                parent = parent.parentNode;
                            }
                            if (contentEditable) {
                                inputSign = true;
                                //searchBar.waitForHide();
                                //return;
                            }
                        }
                    }
                    if (inputSign && e.type === 'dblclick') return;
                    waitForMouse = true;
                    setTimeout(() => {
                        waitForMouse = false;
                    }, 500);
                    shown = false;
                    targetElement = e.target;
                    let matchKey = false;
                    if ((searchData.prefConfig.altKey ||
                         searchData.prefConfig.ctrlKey ||
                         searchData.prefConfig.shiftKey ||
                         searchData.prefConfig.metaKey) &&
                        !((searchData.prefConfig.altKey && !e.altKey) ||
                          (searchData.prefConfig.ctrlKey && !e.ctrlKey) ||
                          (searchData.prefConfig.shiftKey && !e.shiftKey) ||
                          (searchData.prefConfig.metaKey && !e.metaKey))) {
                        matchKey = true;
                    }
                    if (!searchData.prefConfig.selectToShow &&
                        (e.which === 1 || e.which === 2) && !searchData.prefConfig.leftMouse) {
                        return;
                    }
                    let startX = e.clientX;
                    let startY = e.clientY;
                    let mouseMoveHandler = e => {
                        if (Math.abs(startX - e.clientX) + Math.abs(startY - e.clientY) > 2) {
                            clearTimeout(showToolbarTimer);
                            document.removeEventListener('mousemove', mouseMoveHandler, true);
                            e.target.removeEventListener('scroll', scrollHandler);
                        }
                    };
                    let scrollHandler = e => {
                        clearTimeout(showToolbarTimer);
                        document.removeEventListener('mousemove', mouseMoveHandler, true);
                        e.target.removeEventListener('scroll', scrollHandler);
                    };
                    let mouseUpHandler = e => {
                        draging = false;
                        if (shown) {
                            e.stopPropagation();
                            e.preventDefault();
                        } else if (!inputSign) {
                            setTimeout(() => {
                                if ((matchKey && e.which !== 1) || (e.which === 1 && searchData.prefConfig.selectToShow && getSelectStr())) {
                                    searchBar.showInPage(true, e);
                                } else {
                                    searchBar.waitForHide();
                                }
                            }, 0);
                        }
                        clearTimeout(showToolbarTimer);
                        document.removeEventListener('mouseup', mouseUpHandler, true);
                        document.removeEventListener('mousemove', mouseMoveHandler, true);
                        e.target.removeEventListener('scroll', scrollHandler);
                    };
                    if (e.type === 'dblclick') {
                        if (getSelectStr() !== '') {
                            shown = true;
                            document.removeEventListener('mousemove', mouseMoveHandler, true);
                            e.target.removeEventListener('scroll', scrollHandler);
                            clearTimeout(showToolbarTimer);
                            searchBar.showInPage(true, e);
                        }
                        return;
                    }
                    if ((e.which === 1 && clientRect && !inputSign &&
                         e.clientX > clientRect.left && e.clientX < clientRect.left + clientRect.width &&
                         e.clientY > clientRect.top && e.clientY < clientRect.top + clientRect.height) ||
                        (matchKey && e.which !== 1)) {
                        setTimeout(() => {
                            if (!draging) {
                                searchBar.showInPage(true, e);
                            }
                            document.removeEventListener('mousemove', mouseMoveHandler, true);
                            e.target.removeEventListener('scroll', scrollHandler);
                        }, 200);
                        shown = true;
                        clearTimeout(showToolbarTimer);
                        document.addEventListener('mouseup', mouseUpHandler, true);
                        document.addEventListener('click', clickHandler, true);
                        return false;
                    }
                    if (showToolbarTimer) clearTimeout(showToolbarTimer);
                    showToolbarTimer = setTimeout(() => {
                        if (draging) return;
                        if (targetElement != e.target) return;
                        if ((e.which === 1 || e.which === 2) && !searchData.prefConfig.leftMouse) return;
                        if (e.which === 1 && getSelectStr() !== '') return;
                        searchBar.showInPage();
                        shown = true;
                    }, parseInt(searchData.prefConfig.longPressTime));
                    document.addEventListener('mousemove', mouseMoveHandler, true);
                    document.addEventListener('mouseup', mouseUpHandler, true);
                    e.target.addEventListener('scroll', scrollHandler);
                };
                document.addEventListener('mousedown', mouseDownHandler);
                document.addEventListener('dblclick', mouseDownHandler);
                document.addEventListener('contextmenu', e => {
                    if (shown) e.preventDefault();
                    shown = false;
                });
                if (searchData.prefConfig.dragToSearch && !isInConfigPage()) {
                    document.body.addEventListener('dragstart', e => {
                        targetElement = e.target;
                        if (targetElement.getAttribute && targetElement.getAttribute("draggable") == "true") return;
                        showDragSearch(e.clientX, e.clientY);
                        searchBar.waitForHide(1);
                        document.removeEventListener('click', clickHandler, true);
                        draging = true;
                    });
                }
            }
            if (searchData.prefConfig.quickAddRule) {
                document.addEventListener('click', e => {
                    if (!(((e.ctrlKey || e.metaKey) && e.shiftKey) || ((e.ctrlKey || e.metaKey) && e.altKey) || (e.altKey && e.shiftKey))) return;
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') return;
                    let parentForm, url;
                    if (e.target.name) {
                        parentForm = e.target.parentNode;
                        while (parentForm) {
                            if (parentForm.tagName === "FORM") {
                                break;
                            }
                            parentForm = parentForm.parentNode;
                        }
                    }
                    if (parentForm) {
                        url = parentForm.action;
                        let params = [];
                        let formData = new FormData(parentForm);
                        for (let [key, value] of formData) {
                            if (e.target.name === key) {
                                value = "%s";
                            }
                            params.push(key + "=" + value);
                        }
                        if (parentForm.method.toLowerCase() == "post") {
                            url += "%p{" + params.join("&") + "}";
                        } else {
                            if (url.indexOf("?") === -1) {
                                url += "?";
                            }
                            url += params.join("&");
                        }
                    } else if (e.target.value) {
                        if (location.href.indexOf(e.target.value) !== -1) {
                            url = location.href.replace(e.target.value, "%s");
                        } else {
                            let encodeValue = encodeURIComponent(e.target.value);
                            if (location.href.indexOf(encodeValue) !== -1) {
                                url = location.href.replace(encodeValue, "%s");
                            } else {
                                return;
                            }
                        }
                    } else {
                        return;
                    }
                    let icons = [];
                    [].forEach.call(document.querySelectorAll("link[rel='shortcut icon'],link[rel='icon']"), link => {
                        icons.push(link.href);
                    });
                    showSiteAdd(document.title.replace(e.target.value, ""), "", url, icons, document.charset);
                }, true);
            }
            let changeHandler = e => {
                setTimeout(()=>{
                    searchBar.refresh();
                },0);
            }
            document.addEventListener("fullscreenchange", e => {
                if (document.fullscreenElement) {
                    searchBar.bar.style.display = 'none';
                }
            })
            let _wr = function(type) {
                var orig = history[type];
                return function() {
                    var rv = orig.apply(this, arguments);
                    var e = new Event(type);
                    e.arguments = arguments;
                    window.dispatchEvent(e);
                    return rv;
                };
            };
            history.pushState = _wr('pushState');
            history.replaceState = _wr('replaceState');
            window.addEventListener('pushState', changeHandler);
            window.addEventListener('replaceState', changeHandler);
            window.addEventListener('yt-navigate-finish', changeHandler);
            window.addEventListener("securitypolicyviolation", (e) => {
                if (e.violatedDirective === 'form-action') {
                    jumpBySearchJumper();
                }
            });

            let headObserverOptions = {
                childList: true
            };
            let checkCssEle = ele => {
                if (ele === mainStyleEle) {
                    mainStyleEle = _GM_addStyle(cssText);
                }
            };
            let headObserver = new MutationObserver((mutationsList, observer) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.removedNodes.length) {
                        [].forEach.call(mutation.removedNodes, removedNode => {
                            checkCssEle(removedNode);
                        });
                    }
                }
            });
            headObserver.observe(document.head, headObserverOptions);

            let removeMark = node => searchBar.removeMark(node);
            let highlight = (words, node) => searchBar.highlight(words, node);
            let bodyObserverOptions = {
                childList: true,
                characterData: true,
                subtree: true
            };
            let bodyObserver = new MutationObserver((mutationsList, observer) => {
                let lockWords = searchBar.lockWords;
                if (lockWords) {
                    for (let mutation of mutationsList) {
                        if (mutation.type === "characterData") {
                            let parentNode = mutation.target.parentNode;
                            if (!parentNode ||
                                (mutation.target.previousElementSibling && mutation.target.previousElementSibling.className === "searchJumper") ||
                                (mutation.target.nextElementSibling && mutation.target.nextElementSibling.className === "searchJumper")) {
                                return;
                            }
                            searchBar.checkCharacterData(parentNode);
                        }
                        if (mutation.removedNodes.length) {
                            [].forEach.call(mutation.removedNodes, removedNode => {
                                if (removedNode.nodeType === 1) {
                                    if (removedNode.className === "searchJumper") {
                                        removeMark(removedNode);
                                    } else if (removedNode.children.length) {
                                        [].forEach.call(removedNode.querySelectorAll("mark.searchJumper"), node => {
                                            removeMark(node);
                                        });
                                    }
                                }
                            });
                        }
                        if (mutation.addedNodes.length) {
                            [].forEach.call(mutation.addedNodes, addedNode => {
                                if (addedNode.nodeType === 1 && addedNode.className !== "searchJumper") {
                                    highlight("insert", addedNode);
                                }
                            });
                        }
                    }
                }
            });
            bodyObserver.observe(document.body, bodyObserverOptions);
        }

        const jumpHtml = "https://hoothin.github.io/SearchJumper/jump.html";
        function jumpBySearchJumper() {
            let jumpTo = `${jumpHtml}#jump{url=${encodeURIComponent(currentFormParams.url)}&charset=${currentFormParams.charset}}`;
            if (currentFormParams.target == '_self') {
                location.href = jumpTo;
            } else {
                _GM_openInTab(jumpTo, {active: true});
            }
        }

        function preAction() {
            if (location.href.indexOf(jumpHtml) != -1) {
                let submitParams = location.href.match(/#jump{url=(.*)&charset=(.*)}/);
                if (submitParams) {
                    submitByForm(submitParams[2], decodeURIComponent(submitParams[1]), '_self');
                }
            }
        }

        function isInConfigPage() {
            if (location.href.indexOf(configPage) === 0) {
                return true;
            }
            if (location.href === "http://localhost:3000/" && document.title === "SearchJumper Settings") {
                return true;
            }
            return false;
        }

        function initConfig() {
            if (isInConfigPage()) {
                var sendMessageTimer, received = false;
                let loadConfig = () => {
                    sendMessageTimer = setTimeout(() => {
                        if (!received) {
                            loadConfig();
                        }
                    }, 50);
                    window.postMessage({
                        searchData: searchData,
                        command: 'loadConfig'
                    }, '*');
                }

                document.addEventListener('received', e => {
                    received = true;
                    clearTimeout(sendMessageTimer);
                });

                loadConfig();

                document.addEventListener('saveConfig', e => {
                    let preSwitch = searchData.prefConfig.cacheSwitch;
                    searchData = (e.detail ? e.detail.searchData : e.searchData) || _unsafeWindow.searchData;
                    storage.setItem("searchData", searchData);
                    let newCache = {}, oldCacheLength = cacheIcon ? Object.keys(cacheIcon).length : 0;
                    if (preSwitch == searchData.prefConfig.cacheSwitch) {
                        searchData.sitesConfig.forEach(type => {
                            if (/^[a-z\-]+$/.test(type.icon) || /^http/.test(type.icon)) {
                                let typeCache = cacheIcon[type.icon];
                                if (typeCache) {
                                    newCache[type.icon] = typeCache;
                                }
                            }
                            type.sites.forEach(site => {
                                let icon = site.icon;
                                if (!icon) icon = site.url.replace(/^(https?:\/\/[^\/]*\/).*$/, "$1favicon.ico");
                                if (/^http/.test(icon)) {
                                    let siteCache = cacheIcon[icon];
                                    if (siteCache) {
                                        newCache[icon] = siteCache;
                                    }
                                }
                            });
                        });
                        if (oldCacheLength !== Object.keys(newCache).length) {
                            cacheIcon = newCache;
                            storage.setItem("cacheIcon", newCache);
                        }
                    } else {
                        searchData.sitesConfig.forEach(type => {
                            if (/^http/.test(type.icon)) {
                                let typeCache = cacheIcon[type.icon];
                                if (typeCache && typeCache !== 'fail') {
                                    newCache[type.icon] = typeCache;
                                }
                            }
                            type.sites.forEach(site => {
                                let icon = site.icon;
                                if (!icon) icon = site.url.replace(/^(https?:\/\/[^\/]*\/).*$/, "$1favicon.ico");
                                if (/^http/.test(icon)) {
                                    let siteCache = cacheIcon[icon];
                                    if (siteCache && siteCache !== 'fail') {
                                        newCache[icon] = siteCache;
                                    }
                                }
                            });
                        });
                        storage.setItem("cacheIcon", newCache);
                    }
                    if (e.notification || (e.detail && e.detail.notification)) {
                        _GM_notification('Configuration imported successfully!');
                    }
                });
                document.addEventListener('copyConfig', e => {
                    let copyTarget = searchData.sitesConfig.filter(type => {return type && !(/^BM/.test(type.type) && type.icon === "bookmark")});
                    _GM_setClipboard(JSON.stringify(copyTarget, null, 2));
                    _GM_notification('Configuration copied successfully!');
                });
            } else if (importPageReg.test(location.href)) {
                let targetPre;
                let importBtn = document.createElement("button");
                let filterBtn = document.createElement("button");
                importBtn.innerText = i18n("import");
                importBtn.style.position = "absolute";
                importBtn.style.display = "block";
                importBtn.style.fontSize = "20px";
                importBtn.style.right = "35px";
                importBtn.style.opacity = "0.8";
                importBtn.addEventListener("click", e => {
                    if (targetPre) {
                        if (window.confirm(i18n("importOrNot"))) {
                            if (importBtn.parentNode) {
                                importBtn.parentNode.removeChild(importBtn);
                                filterBtn.parentNode.removeChild(filterBtn);
                            }
                            let configTxt = targetPre.innerText.trim(), configData;
                            if (!configTxt || configTxt.indexOf('[') !== 0) return;
                            try {
                                configData = JSON.parse(configTxt);
                                searchData.sitesConfig = configData;
                                storage.setItem("searchData", searchData);
                                _GM_notification('Over!');
                            } catch (e) {
                                _GM_notification(e.toString());
                            }
                        }
                    }
                });

                filterBtn.innerText = i18n("filter");
                filterBtn.style.position = "absolute";
                filterBtn.style.display = "block";
                filterBtn.style.fontSize = "20px";
                filterBtn.style.right = "115px";
                filterBtn.style.opacity = "0.8";
                filterBtn.addEventListener("click", e => {
                    if (targetPre) {
                        if (importBtn.parentNode) {
                            importBtn.parentNode.removeChild(importBtn);
                            filterBtn.parentNode.removeChild(filterBtn);
                        }
                        let configTxt = targetPre.innerText.trim(), configData;
                        if (!configTxt || configTxt.indexOf('[') !== 0) return;
                        try {
                            configData = JSON.parse(configTxt);
                            ImportFilter.getInstance().open(configData);
                        } catch (e) {
                            _GM_notification(e.toString());
                        }
                    }
                });

                document.addEventListener("mouseover", e => {
                    if (e.target.tagName === "PRE" && importPageReg.test(location.href)) {
                        targetPre = e.target;
                        let top = `${e.target.offsetTop + 40}px`;
                        importBtn.style.top = top;
                        e.target.parentNode.appendChild(importBtn);
                        filterBtn.style.top = top;
                        e.target.parentNode.appendChild(filterBtn);
                    }
                });
            }
        }

        class ImportFilter {
            static importFilter;
            constructor() {
                this.init();
            }

            static getInstance() {
                if (!ImportFilter.importFilter) {
                    ImportFilter.importFilter = new ImportFilter();
                }
                return ImportFilter.importFilter;
            }

            init() {
                let self = this;
                this.openList = [];
                this.filterCss = `
                    #searchJumperFilter {
                        width: 100%;
                        height: 100%;
                        position: fixed;
                        top: 0;
                        left: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 100000;
                        background-color: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(5px);
                    }
                    .searchJumperFrame-body {
                        width: 350px;
                        text-align: left;
                        background-color: #ffffff;
                        border: 1px solid #afb3b6;
                        border-radius: 10px;
                        opacity: 0.95;
                        filter: alpha(opacity=95);
                        box-shadow: 5px 5px 20px 0px #000;
                        color: #6e7070;
                        transition:all 0.25s ease;
                        border: 0;
                    }
                    .searchJumperFrame-title {
                        background: #458bd1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white!important;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 10px 10px 0 0;
                    }
                    .searchJumperFrame-title>img {
                        margin: 5px;
                    }
                    .searchJumperFrame-buttons {
                        text-align: center;
                        margin: 5px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .searchJumperFrame-buttons>button {
                        width: 32%;
                        font-size: 16px;
                        cursor: pointer;
                        border: 1px solid #1976d2;
                        border-radius: 4px;
                        transition: all .3s;
                        color: #fff;
                        background-color: #458bd1;
                        line-height: 25px;
                        padding: 3px;
                    }
                    .searchJumperFrame-buttons>button:hover {
                        color: #e3f2fd;
                    }
                    .searchJumperFrame-body>.sitesCon {
                        max-height: 70vh;
                        overflow: auto;
                        width: 100%;
                        border-top: 1px solid rgba(0, 0, 0, 0.23);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.23);
                        padding: 5px;
                        user-select: none;
                        white-space: nowrap;
                    }
                    .searchJumperFrame-body>.sitesCon>details>summary>span,
                    .searchJumperFrame-body>.sitesCon>details>div>span {
                        line-height: 25px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 180px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .searchJumperFrame-body>.sitesCon>details>summary>button {
                        display: none;
                    }
                    .searchJumperFrame-body>.sitesCon>details>summary:hover>button {
                        display: inline-block;
                    }
                    .searchJumperFrame-body>.sitesCon input {
                        margin: 2px 5px;
                        width: 20px;
                        height: 20px;
                        vertical-align: sub;
                    }
                    .searchJumperFrame-body>.sitesCon div {
                        margin-left: 32px;
                    }
                    .searchJumperFrame-body>.sitesCon div.exist {
                        text-decoration:line-through;
                    }
                `;
                this.filterCssEle = _GM_addStyle(this.filterCss);
                this.filterFrame = document.createElement("div");
                this.filterFrame.id = "searchJumperFilter";
                this.filterFrame.innerHTML = createHTML(`
                <div class="searchJumperFrame-body">
                    <a href="${configPage}" class="searchJumperFrame-title" target="_blank">
                        <img width="32px" height="32px" src=${logoBase64}>${i18n("addSearchEngine")}
                    </a>
                    <div class="searchJumperFrame-buttons">
                        <button id="expandAll" type="button">${i18n("expandAll")}</button>
                        <button id="collapseAll" type="button">${i18n("collapseAll")}</button>
                    </div>
                    <div class="sitesCon"></div>
                    <div class="searchJumperFrame-buttons">
                        <button id="cancel" type="button">${i18n("siteCancel")}</button>
                        <button id="selectAll" type="button">${i18n("selectAll")}</button>
                        <button id="add" type="button">${i18n("import")}</button>
                    </div>
                </div>
                `);
                this.sitesCon = this.filterFrame.querySelector(".sitesCon");
                let add = this.filterFrame.querySelector("#add");
                let selectAll = this.filterFrame.querySelector("#selectAll");
                let expandAll = this.filterFrame.querySelector("#expandAll");
                let collapseAll = this.filterFrame.querySelector("#collapseAll");
                let checkMark = false;
                expandAll.addEventListener("click", e => {
                    [].forEach.call(this.filterFrame.querySelectorAll("details"), details => {
                        details.setAttribute("open", "open");
                    });
                });
                collapseAll.addEventListener("click", e => {
                    [].forEach.call(this.filterFrame.querySelectorAll("details"), details => {
                        details.removeAttribute("open");
                    });
                });
                selectAll.addEventListener("click", e => {
                    checkMark = !checkMark;
                    [].forEach.call(this.filterFrame.querySelectorAll("input[type=checkbox]"), checkbox => {
                        checkbox.checked = checkMark;
                    });
                });
                add.addEventListener("click", e => {
                    let canImport = false;
                    [].forEach.call(this.filterFrame.querySelectorAll("details"), details => {
                        let typeName = details.children[0].children[0];
                        let typeData = self.typeDict[typeName.title];
                        typeData.type = typeName.innerText.trim();
                        typeData.sites = [];
                        [].forEach.call(details.querySelectorAll('div>[type="checkbox"]'), checkSite => {
                            if (checkSite.checked) {
                                canImport = true;
                                let curData = self.siteDict[checkSite.parentNode.title];
                                let otherType = checkSite.nextElementSibling;
                                if (!curData || !otherType) return;
                                if (otherType.value === "0") {
                                    typeData.sites.push(curData);
                                } else {
                                    let typeIndex = self.searchType(otherType.value);
                                    searchData.sitesConfig[typeIndex].sites.push(curData);;
                                }
                            }
                        });
                        if (typeData.sites.length) {
                            let typeIndex = self.searchType(typeData.type);
                            if (typeIndex === false) {
                                searchData.sitesConfig.push(typeData);
                            } else {
                                searchData.sitesConfig[typeIndex].sites = searchData.sitesConfig[typeIndex].sites.concat(typeData.sites);
                            }
                        }
                    });
                    if (canImport) {
                        storage.setItem("searchData", searchData);
                        _GM_notification('Over!');
                        this.close();
                    }
                });
                this.filterFrame.addEventListener("click", e => {
                    if (e.target.id == "searchJumperFilter" || e.target.id == "cancel") {
                        this.close();
                    }
                });
            }

            searchType(type) {
                for (let i = 0; i < searchData.sitesConfig.length; i++) {
                    let typeData = searchData.sitesConfig[i];
                    if (typeData.type == type) return i;
                }
                return false;
            }

            searchUrl(url) {
                for (let i = 0; i < searchData.sitesConfig.length; i++) {
                    let sites = searchData.sitesConfig[i].sites;
                    for (let j = 0; j < sites.length; j++) {
                        if (sites[j].url.replace(/^https?/, "") == url.replace(/^https?/, "")) return true;
                    }
                }
                return false;
            }

            searchName(name) {
                for (let i = 0; i < searchData.sitesConfig.length; i++) {
                    let sites = searchData.sitesConfig[i].sites;
                    for (let j = 0; j < sites.length; j++) {
                        if (sites[j].name == name) {
                            let newName = name + "_1";
                            return this.searchName(newName);
                        }
                    }
                }
                return name;
            }

            anylizeType(typeData) {
                let self = this;
                let details = document.createElement("details");
                let summary = document.createElement("summary");
                let typeName = document.createElement("span");
                typeName.title = typeData.type;
                typeName.innerText = typeData.type;
                summary.appendChild(typeName);
                let checkType = document.createElement("input");
                checkType.type = 'checkbox';
                summary.appendChild(checkType);
                let renameBtn = document.createElement("button");
                renameBtn.innerText = i18n("rename");
                renameBtn.addEventListener("click", e => {
                    let newName = window.prompt(i18n('rename'), typeName.innerText);
                    if (newName) typeName.innerText = newName;
                });
                summary.appendChild(renameBtn);
                details.appendChild(summary);
                for (let i = 0; i < this.openList.length; i++) {
                    if (this.openList[i] == typeData.type) {
                        details.setAttribute("open", "open");
                        break;
                    }
                }
                let sites = [];
                this.typeDict[typeData.type] = typeData;
                if (typeData.sites) {
                    typeData.sites.forEach(siteData => {
                        let siteCon = document.createElement("div");
                        let siteName = document.createElement("span");
                        siteName.innerText = siteData.name;
                        siteData.name = self.searchName(siteData.name);
                        siteCon.appendChild(siteName);
                        siteCon.title = siteData.url;
                        details.appendChild(siteCon);
                        if (self.searchUrl(siteData.url)) {
                            siteCon.classList.add("exist");
                            return;
                        }
                        let checkSite = document.createElement("input");
                        checkSite.type = 'checkbox';
                        checkSite.onclick = e => {
                            if (!checkSite.checked) {
                                checkType.checked = false;
                            } else {
                                let allchecked = true;
                                for (let i = 0; i < sites.length; i++) {
                                    if (!sites[i].checked) {
                                        allchecked = false;
                                        break;
                                    }
                                }
                                if (allchecked) checkType.checked = true;
                            }
                        };
                        siteCon.appendChild(checkSite);
                        siteCon.addEventListener("click", e => {
                            if (e.target.tagName == 'SPAN') {
                                checkSite.click();
                            }
                        });
                        let typeSelect = document.createElement("select");
                        let option = document.createElement("option");
                        option.value = 0;
                        option.innerText = i18n("currentType");
                        typeSelect.appendChild(option);
                        for (let i = 0; i < searchData.sitesConfig.length; i++) {
                            let _type = searchData.sitesConfig[i];
                            if (_type.type != typeData.type) {
                                let option = document.createElement("option");
                                option.value = _type.type;
                                option.innerText = _type.type;
                                typeSelect.appendChild(option);
                            }
                        }
                        siteCon.appendChild(typeSelect);
                        self.siteDict[siteData.url] = siteData;
                        sites.push(checkSite);
                    });
                }
                if (sites.length == 0) {
                    checkType.style.display = "none";
                    renameBtn.style.display = "none";
                }
                checkType.addEventListener("click", e => {
                    sites.forEach(checkSite => {
                        checkSite.checked = checkType.checked;
                    });
                });
                this.sitesCon.appendChild(details);
            }

            close() {
                this.openList = [];
                [].forEach.call(this.sitesCon.querySelectorAll("details"), details => {
                    if (details.hasAttribute("open")) {
                        this.openList.push(details.querySelector("summary").innerText);
                    }
                });
                if (this.filterFrame.parentNode) {
                    this.filterFrame.parentNode.removeChild(this.filterFrame);
                }
            }

            open(configData) {
                let self = this;
                this.siteDict = {};
                this.typeDict = {};
                if (!this.filterCssEle || !this.filterCssEle.parentNode) this.filterCssEle = _GM_addStyle(this.filterCss);
                document.documentElement.appendChild(this.filterFrame);
                this.sitesCon.innerHTML = createHTML('');
                configData.forEach(type => {
                    self.anylizeType(type);
                });
                //storage.setItem("searchData", searchData);
                //_GM_notification('Over!');
            }
        }

        var dragRoundFrame, dragSiteCurSpans, dragSiteHistorySpans, dragEndHandler, dragenterHandler, dragCssEle, dragCssText;
        function showDragSearch(left, top) {
            if (!searchBar || !searchBar.bar) return;
            if (!dragRoundFrame) {
                dragCssText = `
                    #searchJumperWrapper * {
                      margin: 0;
                      padding: 0;
                      border: none;
                      outline: none;
                      user-select: none;
                      box-sizing: content-box;
                      font-size: 12px;
                      line-height: normal;
                    }
                    #searchJumperWrapper {
                      position: fixed;
                      height: 300px;
                      width: 300px;
                      padding: 20px;
                      margin: 20px;
                      background-color: #000000${searchData.prefConfig.hideDragHistory ? "10" : "9e"};
                      box-shadow: #000000 0px 0px 10px;
                      border-radius: 50%;
                      z-index: 2147483647;
                      box-sizing: content-box;
                      opacity: 0;
                      transform: scale(.5);
                      -moz-transition:opacity 0.3s ease, transform 0.3s;
                      -webkit-transition:opacity 0.3s ease, transform 0.3s;
                      transition:opacity 0.3s ease, transform 0.3s;
                    }
                    #searchJumperWrapper>.panel {
                      position: relative;
                    }
                    #searchJumperWrapper .sector:nth-child(2n+1) .sector-inner {
                      background: #454545;
                      color: white;
                    }
                    #searchJumperWrapper .sector:nth-child(2n) .sector-inner {
                      background: #ffffff;
                      color: black;
                    }
                    #searchJumperWrapper .sector.out:nth-child(2n+1) .sector-inner {
                      background: #353535;
                    }
                    #searchJumperWrapper .sector.out:nth-child(2n) .sector-inner {
                      background: #eeeeee;
                    }
                    #searchJumperWrapper .sector {
                      position: absolute;
                      left: 150px;
                      top: 50px;
                      width: 100px;
                      height: 200px;
                      font-size: 14px;
                      border-radius: 0px 100px 100px 0;
                      overflow: hidden;
                      transform-origin: left center;
                      z-index: 1;
                      -moz-transition:transform 0.3s ease;
                      -webkit-transition:transform 0.3s ease;
                      transition:transform 0.3s ease;
                      pointer-events: none;
                    }
                    #searchJumperWrapper .sector.out {
                      left: 150px;
                      top: 0px;
                      width: 150px;
                      height: 300px;
                      font-size: 14px;
                      border-radius: 0px 150px 150px 0;
                      overflow: hidden;
                      transform-origin: left center;
                      z-index: 0;
                      ${searchData.prefConfig.hideDragHistory ? "display: none;" : ""}
                    }
                    #searchJumperWrapper .sector-inner {
                      text-align: center;
                      display: block;
                      width: 40px;
                      padding: 5px 3px 0 57px;
                      height: 195px;
                      transform: translateX(-100px) rotate(60deg);
                      transform-origin: right center;
                      border-radius: 100px 0 0 100px;
                    }
                    #searchJumperWrapper .sector.out>.sector-inner {
                      text-align: center;
                      display: block;
                      width: 90px;
                      height: 295px;
                      transform: translateX(-150px) rotate(36deg);
                      transform-origin: right center;
                      border-radius: 150px 0 0 150px;
                    }
                    #searchJumperWrapper .sector-inner span {
                      transform-origin: center;
                      padding: 20px 0;
                      pointer-events: all;
                      opacity: 0.8;
                      word-break: break-word;
                      height: 55px;
                      font-size: 12px;
                      font-weight: bold;
                      font-family: Arial, sans-serif;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: space-evenly;
                    }
                    #searchJumperWrapper .sector-inner span {
                      width: 70px;
                      margin-left: -15px;
                    }
                    #searchJumperWrapper .sector-inner span>p {
                      max-width: 58px;
                    }
                    #searchJumperWrapper .sector.out>.sector-inner span {
                      width: unset;
                      margin-left: unset;
                    }
                    #searchJumperWrapper .over>.sector-inner span {
                      opacity: 1;
                    }
                    #searchJumperWrapper .sector-inner span>img {
                      width: 25px;
                      height: 25px;
                    }
                    #searchJumperWrapper .sector-inner span:hover {
                      opacity: 1;
                    }
                    #searchJumperWrapper .dragLogo {
                      position: absolute;
                      left: 150px;
                      top: 150px;
                      border-radius: 50%;
                      box-shadow: #000000 0px 0px 10px;
                      z-index: 10;
                      font-size: 0;
                      -moz-transition:transform 0.3s ease;
                      -webkit-transition:transform 0.3s ease;
                      transition:transform 0.3s ease;
                    }
                    .dragLogo>svg {
                      width: 40px;
                      height: 40px;
                      pointer-events: none;
                    }
                `;
                dragCssEle = _GM_addStyle(dragCssText);
                dragSiteCurSpans = [];
                dragSiteHistorySpans = [];
                dragRoundFrame = document.createElement("div");
                dragRoundFrame.id = "searchJumperWrapper";
                dragRoundFrame.innerHTML = createHTML(`
                <div class="panel"></div>
                <div class="dragLogo">${logoBtnSvg}</div>
                `);
                const sector1Num = 6;
                const sector2Num = 10;
                let sectorCon = dragRoundFrame.querySelector(".panel");
                let sector1Gap = 360 / sector1Num;
                let sector2Gap = 360 / sector2Num;
                let sector1Start = -sector1Gap / 2;
                let sector2Start = -sector2Gap / 2;
                let dragSector;
                let dragLogo = dragRoundFrame.querySelector(".dragLogo");
                dragLogo.addEventListener("dragover", e => {
                    if (dragSector) {
                        dragSector.style.transform = `rotate(${dragSector.dataset.deg}deg) ${searchData.prefConfig.hideDragHistory ? 'scale(1.2)' : ''}`;
                        dragSector.classList.remove("over");
                    }
                    dragSector = null;
                    dragLogo.style.transform = `scale(1.35)`;
                    e.preventDefault();
                }, true);
                let geneSector = (className, deg, spanTransform) => {
                    let sector = document.createElement("div");
                    sector.className = className;
                    let sectorInner = document.createElement("div");
                    sectorInner.className = "sector-inner";
                    let sectorSpan = document.createElement("span");
                    sectorInner.appendChild(sectorSpan);
                    sector.appendChild(sectorInner);
                    let transform = `rotate(${deg}deg)`;
                    sectorSpan.style.transform = spanTransform;
                    sector.style.transform = transform + (searchData.prefConfig.hideDragHistory ? 'scale(1.2)' : '');
                    sector.dataset.deg = deg;
                    sectorCon.appendChild(sector);
                    sectorSpan.addEventListener("dragover", e => {
                        if (!sectorSpan.innerText) return;
                        if (dragSector) {
                            dragSector.style.transform = `rotate(${dragSector.dataset.deg}deg) ${searchData.prefConfig.hideDragHistory ? 'scale(1.2)' : ''}`;
                            dragSector.classList.remove("over");
                        }
                        dragLogo.style.transform = "";
                        sector.style.transform = `scale(${searchData.prefConfig.hideDragHistory ? '1.6' : '1.35'}) ${transform}`;
                        sector.classList.add("over");
                        dragSector = sector;
                        e.preventDefault();
                    }, true);
                    return sectorSpan;
                };
                for (let i = 0; i < sector1Num; i++) {
                    let sectorSpan = geneSector("sector", sector1Start + sector1Gap * i, `translateX(-10px) translateY(-10px) rotate(${sector1Start - sector1Gap * i}deg)`);
                    dragSiteCurSpans.push(sectorSpan);
                }
                for (let i = 0; i < sector2Num; i++) {
                    let sectorSpan = geneSector("sector out", sector2Start + sector2Gap * i, `translateX(12px) translateY(-15px) rotate(${sector2Start - sector2Gap * i}deg)`);
                    dragSiteHistorySpans.push(sectorSpan);
                }
                let removeFrame = () => {
                    document.removeEventListener('dragend', dragEndHandler, true);
                    document.removeEventListener('dragenter', dragenterHandler, true);
                    if (dragRoundFrame.parentNode) {
                        dragRoundFrame.parentNode.removeChild(dragRoundFrame);
                        dragRoundFrame.style.opacity = "";
                        dragRoundFrame.style.transform = '';
                    }
                    draging = false;
                };
                dragEndHandler = e => {
                    removeFrame();
                }
                dragRoundFrame.addEventListener('click', e => {
                    removeFrame();
                });
                dragRoundFrame.addEventListener('drop', e => {
                    if (e.target === dragLogo) {
                        searchBar.bar.classList.remove("funcKeyCall");
                        searchBar.showInPage();
                    } else if (dragSector) {
                        searchBar.searchBySiteName(dragSector.children[0].dataset.name, e);
                        dragSector.style.transform = `rotate(${dragSector.dataset.deg}deg)`;
                        dragSector.classList.remove("over");
                        dragSector = null;
                    }
                    e.preventDefault();
                });
                let minClientX, maxClientX, minClientY, maxClientY;
                dragenterHandler = e => {
                    if (!dragRoundFrame.contains(e.target)){
                        removeFrame();
                        return;
                    }
                };
            }
            if (!dragCssEle || !dragCssEle.parentNode) dragCssEle = _GM_addStyle(dragCssText);
            searchBar.recoveHistory();
            let firstType = searchBar.autoGetFirstType();
            let siteBtns = firstType.querySelectorAll("a.search-jumper-btn:not(.notmatch)");
            dragSiteCurSpans.forEach((span, i) => {
                span.innerHTML = createHTML();
                span.parentNode.parentNode.style.filter = 'contrast(0.5)';
                let targetSite = siteBtns[i];
                if (!targetSite) return;
                span.parentNode.parentNode.style.filter = '';
                span.parentNode.dataset.name = targetSite.dataset.name;
                let word = document.createElement("p");
                word.innerText = targetSite.dataset.name.substr(0, 10).trim();
                if (!/^\w+$/.test(word.innerText)) word.innerText = word.innerText.substr(0, 6);
                let img = document.createElement("img");
                img.style.display = "none";
                span.appendChild(img);
                span.appendChild(word);
                img.onload = e => {
                    img.style.display = "";
                };
                let targetIcon = targetSite.querySelector("img");
                if (targetIcon) img.src = targetIcon.src || targetIcon.dataset.src;
            });
            let findIndex = 0;
            let getHistorySiteBtn = () => {
                let result = null;
                for (let i = findIndex; i < searchBar.historySiteBtns.length; i++) {
                    let btn = searchBar.historySiteBtns[i];
                    if (btn.style.display !== 'none') {
                        result = btn;
                        findIndex = i + 1;
                        break;
                    }
                }
                return result;
            };
            dragSiteHistorySpans.forEach((span, i) => {
                let dragleaveEvent = new DragEvent("dragleave");
                span.dispatchEvent(dragleaveEvent);
                span.innerHTML = createHTML();
                span.parentNode.parentNode.style.opacity = 0.6;
                let targetSite = getHistorySiteBtn();
                if (!targetSite) return;
                span.parentNode.parentNode.style.opacity = 1;
                span.parentNode.dataset.name = targetSite.dataset.name;
                let word = document.createElement("p");
                word.innerText = targetSite.dataset.name.substr(0, 10).trim();
                if (!/^\w+$/.test(word.innerText)) word.innerText = word.innerText.substr(0, 6);
                let img = document.createElement("img");
                img.style.display = "none";
                span.appendChild(img);
                span.appendChild(word);
                img.onload = e => {
                    img.style.display = "";
                };
                let targetIcon = targetSite.querySelector("img");
                if (targetIcon) img.src = targetIcon.src || targetIcon.dataset.src;
            });

            if (left - 190 < 0) {
                left = 190;
            } else if (document.documentElement.clientWidth - left - 190 < 0) {
                left = document.documentElement.clientWidth - 190;
            }
            if (top - 190 < 0) {
                top = 190;
            } else if (document.documentElement.clientHeight - top - 190 < 0) {
                top = document.documentElement.clientHeight - 190;
            }
            dragRoundFrame.style.left = left - 190 + "px";
            dragRoundFrame.style.top = top - 190 + "px";
            dragRoundFrame.style.opacity = "";
            dragRoundFrame.style.transform = '';
            setTimeout(() => {
                document.addEventListener('dragend', dragEndHandler, true);
                document.documentElement.appendChild(dragRoundFrame);
                setTimeout(() => {
                    dragRoundFrame.style.opacity = 1;
                    dragRoundFrame.style.transform = 'scale(1)';
                }, 10);
                setTimeout(() => {
                    document.addEventListener('dragenter', dragenterHandler, true);
                }, 100);
            }, 0);
        }

        var addFrame, nameInput, descInput, urlInput, iconInput, iconShow, iconsCon, typeSelect, testBtn, cancelBtn, addBtn, addFrameCssText, addFrameCssEle, siteKeywords, siteMatch, openSelect;
        function showSiteAdd(name, description, url, icons, charset) {
            if (!addFrame) {
                addFrameCssText = `
                    .searchJumperFrame-body {
                        width: 300px;
                        min-height: 300px;
                        position: fixed;
                        text-align: left;
                        left: 50%;
                        top: 45%;
                        margin-top: -250px;
                        margin-left: -150px;
                        z-index: 100000;
                        background-color: #ffffff;
                        border: 1px solid #afb3b6;
                        border-radius: 10px;
                        opacity: 0.95;
                        filter: alpha(opacity=95);
                        box-shadow: 5px 5px 20px 0px #000;
                        color: #6e7070;
                        transition:all 0.25s ease;
                        border: 0;
                    }
                    .searchJumperFrame-title {
                        background: #458bd1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white!important;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 10px 10px 0 0;
                    }
                    .searchJumperFrame-title>img {
                        margin: 5px;
                    }
                    .searchJumperFrame-input-title {
                        font-size: 9pt;
                        font-family: Arial, sans-serif;
                        display: inline-block;
                        background-color: white;
                        position: relative;
                        left: 20px;
                        padding: 0px 4px;
                        text-align: left;
                        color: #646464;
                    }
                    .searchJumperFrame-inputs>input,
                    .searchJumperFrame-inputs>textarea,
                    .searchJumperFrame-inputs>select,
                    .searchJumperFrame-body select {
                        resize: both;
                        font-size: 11pt;
                        font-weight: normal;
                        border-radius: 4px;
                        border: 1px solid rgba(0, 0, 0, 0.23);
                        margin: 4px;
                        font-family: inherit;
                        background-color: #FFF;
                        width: calc(100% - 17px);
                        color: #4A4A4A;
                        margin-top: -8px;
                        padding: 4px;
                        padding-top: 8px;
                        box-sizing: content-box;
                        height: 25px;
                    }
                    .searchJumperFrame-inputs>input:focus,
                    .searchJumperFrame-inputs>textarea:focus,
                    .searchJumperFrame-inputs>select:focus,
                    .searchJumperFrame-body select:focus {
                        background-color: #FFF;
                    }
                    .searchJumperFrame-buttons {
                        text-align: center;
                        margin-bottom: 5px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .searchJumperFrame-buttons>button {
                        width: 32%;
                        font-size: 16px;
                        cursor: pointer;
                        border: 1px solid #1976d2;
                        border-radius: 4px;
                        transition: all .3s;
                        color: #fff;
                        background-color: #458bd1;
                        line-height: 25px;
                        padding: 3px;
                    }
                    .searchJumperFrame-buttons>button:hover {
                        color: #e3f2fd;
                    }
                    .searchJumperFrame-inputs>img {
                        float: right;
                        margin-top: -40px;
                        position: relative;
                        right: 20px;
                        opacity: 0.8;
                        background: rgb(0 0 0 / 50%);
                        border-radius: 5px;
                        pointer-events: none;
                    }
                    .searchJumperFrame-body>.iconsCon {
                        max-height: 150px;
                        overflow: auto;
                        width: 100%;
                        border-top: 1px solid rgba(0, 0, 0, 0.23);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.23);
                    }
                    .searchJumperFrame-body>.iconsCon>img {
                        margin: 5px;
                        cursor: pointer;
                        max-width: 120px;
                        border: 2px solid #ffffff;
                        box-sizing: border-box;
                    }
                    .searchJumperFrame-body>.iconsCon>img:hover {
                        border: 2px solid #4e91d3;
                    }
                    .maxContent .searchJumperFrame-inputs {
                        width: 50%;
                        float: left;
                    }
                    .searchJumperFrame-body>.moreItem {
                        display: none;
                    }
                    .maxContent>.searchJumperFrame-body>.moreItem {
                        display: block;
                    }
                    .maxContent>.searchJumperFrame-body {
                        width: 600px;
                        margin-left: -300px;
                    }
                    .searchJumperFrame-maxBtn {
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        color: white;
                        width: 25px;
                        cursor: pointer;
                        transition:width 0.25s ease;
                    }
                    .searchJumperFrame-maxBtn:hover {
                        width: 30px;
                    }
                    .searchJumperFrame-maxBtn>#maxBtn {
                        display: block;
                    }
                    .searchJumperFrame-maxBtn>#minBtn {
                        display: none;
                    }
                    .maxContent .searchJumperFrame-maxBtn>#maxBtn {
                        display: none;
                    }
                    .maxContent .searchJumperFrame-maxBtn>#minBtn {
                        display: block;
                    }
                `;
                addFrameCssEle = _GM_addStyle(addFrameCssText);
                addFrame = document.createElement("div");
                addFrame.innerHTML = createHTML(`
                <div class="searchJumperFrame-body">
                    <a href="${configPage}" class="searchJumperFrame-title" target="_blank">
                        <img width="32px" height="32px" src=${logoBase64}>${i18n("addSearchEngine")}
                    </a>
                    <div class="searchJumperFrame-maxBtn">
                        <svg id="maxBtn" fill="white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("maxAddSiteBtn")}</title><path d="M192 832h160a32 32 0 0 1 0 64H160a32 32 0 0 1-32-32V672a32 32 0 0 1 64 0zM182.72 886.72a32 32 0 0 1-45.44-45.44l224-224a32 32 0 0 1 45.44 45.44zM832 832V672a32 32 0 0 1 64 0v192a32 32 0 0 1-32 32H672a32 32 0 0 1 0-64zM886.72 841.28a32 32 0 0 1-45.44 45.44l-224-224a32 32 0 0 1 45.44-45.44zM192 192v160a32 32 0 0 1-64 0V160a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64zM137.28 182.72a32 32 0 0 1 45.44-45.44l224 224a32 32 0 0 1-45.44 45.44zM832 192H672a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0zM841.28 137.28a32 32 0 1 1 45.44 45.44l-224 224a32 32 0 0 1-45.44-45.44z"></path></svg>
                        <svg id="minBtn" fill="white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("minAddSiteBtn")}</title><path d="M672 352h160a32 32 0 0 1 0 64H640a32 32 0 0 1-32-32V192a32 32 0 0 1 64 0zM662.72 406.72a32 32 0 0 1-45.44-45.44l224-224a32 32 0 1 1 45.44 45.44zM352 352V192a32 32 0 0 1 64 0v192a32 32 0 0 1-32 32H192a32 32 0 0 1 0-64zM406.72 361.28a32 32 0 0 1-45.44 45.44l-224-224a32 32 0 0 1 45.44-45.44zM672 672v160a32 32 0 0 1-64 0V640a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64zM617.28 662.72a32 32 0 0 1 45.44-45.44l224 224a32 32 0 0 1-45.44 45.44zM192 672a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V672zM361.28 617.28a32 32 0 0 1 45.44 45.44l-224 224a32 32 0 0 1-45.44-45.44z"></path></svg>
                    </div>
                    <div class="searchJumperFrame-inputs">
                        <div class="searchJumperFrame-input-title">${i18n("siteName")}</div>
                        <input name="siteName" type="text">
                        <div class="searchJumperFrame-input-title">${i18n("siteDesc")}</div>
                        <textarea name="description" type="text"></textarea>
                        <div class="searchJumperFrame-input-title">${i18n("siteUrl")}</div>
                        <textarea name="url" type="text"></textarea>
                        <div class="searchJumperFrame-input-title">${i18n("siteIcon")}</div>
                        <textarea name="icon" type="text"></textarea>
                        <img width="27px" height="27px">
                    </div>
                    <div class="searchJumperFrame-inputs moreItem">
                        <div class="searchJumperFrame-input-title">${i18n("siteKeywords")}</div>
                        <input name="siteKeywords" placeholder="kw|key" type="text">
                        <div class="searchJumperFrame-input-title">${i18n("siteMatch")}</div>
                        <input name="siteMatch" placeholder="(www|m)\\.google\\.com" type="text"></textarea>
                        <div class="searchJumperFrame-input-title">${i18n("openSelect")}</div>
                        <select name="openSelect">
                            <option value='-1'>${i18n("openInDefault")}</option>
                            <option value='true'>${i18n("openInNewTab")}</option>
                            <option value='false'>${i18n("openInCurrent")}</option>
                        </select>
                    </div>
                    <div class="iconsCon"></div>
                    <div class="searchJumperFrame-input-title">${i18n("siteType")}</div>
                    <select name="typeSelect">
                    </select>
                    <div class="searchJumperFrame-buttons">
                        <button id="test" type="button">${i18n("siteTest")}</button>
                        <button id="cancel" type="button">${i18n("siteCancel")}</button>
                        <button id="add" type="button">${i18n("siteAdd")}</button>
                    </div>
                </div>
                `);
                nameInput = addFrame.querySelector("[name='siteName']");
                descInput = addFrame.querySelector("[name='description']");
                urlInput = addFrame.querySelector("[name='url']");
                iconInput = addFrame.querySelector("[name='icon']");
                iconShow = addFrame.querySelector(".searchJumperFrame-inputs>img");
                iconsCon = addFrame.querySelector(".iconsCon");
                testBtn = addFrame.querySelector("#test");
                cancelBtn = addFrame.querySelector("#cancel");
                addBtn = addFrame.querySelector("#add");
                typeSelect = addFrame.querySelector("select[name='typeSelect']");
                siteKeywords = addFrame.querySelector("[name='siteKeywords']");
                siteMatch = addFrame.querySelector("[name='siteMatch']");
                openSelect = addFrame.querySelector("select[name='openSelect']");
                let maxBtn = addFrame.querySelector("#maxBtn");
                maxBtn.addEventListener("click", e => {
                    addFrame.classList.add("maxContent");
                });
                let minBtn = addFrame.querySelector("#minBtn");
                minBtn.addEventListener("click", e => {
                    addFrame.classList.remove("maxContent");
                });
                for (let i = 0; i < searchData.sitesConfig.length; i++) {
                    let typeConfig = searchData.sitesConfig[i];
                    let option = document.createElement("option");
                    option.value = i;
                    if (lastAddType !== "" && lastAddType == i) {
                        option.selected = "selected";
                    }
                    option.innerText = typeConfig.type;
                    typeSelect.appendChild(option);
                }
                testBtn.addEventListener("click", e => {
                    if (/[:%]p{/.test(urlInput.value) || (charset && charset.toLowerCase() != 'utf-8')) {
                        submitByForm(charset, urlInput.value.replace(/%s\b/g, "searchJumper"), "_blank");
                    } else {
                        _GM_openInTab(urlInput.value.replace(/%s\b/g, "searchJumper"), {active: true});
                    }
                });
                cancelBtn.addEventListener("click", e => {
                    if (addFrame.parentNode) {
                        addFrame.parentNode.removeChild(addFrame);
                    }
                });
                addBtn.addEventListener("click", e => {
                    for (let i = 0; i < searchData.sitesConfig.length; i++) {
                        let typeConfig = searchData.sitesConfig[i];
                        for (let j = 0; j < typeConfig.sites.length; j++) {
                            let curSite = typeConfig.sites[j];
                            if (curSite.url == urlInput.value) {
                                _GM_notification(i18n("siteExist"));
                                return;
                            }
                        }
                    }
                    let siteObj = {
                        name: nameInput.value,
                        url: urlInput.value
                    };
                    if (iconInput.value && iconInput.value != urlInput.value.replace(/^(https?:\/\/[^\/]*\/).*$/, "$1favicon.ico")) {
                        siteObj.icon = iconInput.value;
                    }
                    if (descInput.value && descInput.value != nameInput.value) {
                        siteObj.description = descInput.value;
                    }
                    if (siteKeywords.value) {
                        siteObj.keywords = siteKeywords.value;
                    }
                    if (siteMatch.value) {
                        siteObj.match = siteMatch.value;
                    }
                    if (openSelect.value && openSelect.value != '-1') {
                        siteObj.openInNewTab = openSelect.value === 'true';
                    }
                    if (charset && charset.toLowerCase() != 'utf-8') {
                        siteObj.charset = charset;
                    }
                    searchData.sitesConfig[typeSelect.value].sites.push(siteObj);
                    storage.setItem("lastAddType", typeSelect.value);
                    storage.setItem("searchData", searchData);
                    _GM_notification(i18n("siteAddOver"));
                    if (addFrame.parentNode) {
                        addFrame.parentNode.removeChild(addFrame);
                    }
                });
            }
            if (!addFrameCssEle || !addFrameCssEle.parentNode) addFrameCssEle = _GM_addStyle(addFrameCssText);
            document.body.appendChild(addFrame);
            siteKeywords.value = "";
            siteMatch.value = "";
            nameInput.value = name;
            descInput.value = description;
            urlInput.value = url;
            if (icons[0]) {
                iconShow.style.display = "";
                iconInput.value = icons[0];
                iconShow.src = icons[0];
            } else {
                iconShow.style.display = "none";
            }
            if (icons && icons.length > 1) {
                iconsCon.style.opacity = "";
                iconsCon.innerHTML = createHTML();
                icons.forEach(iconSrc => {
                    let curIcon = document.createElement("img");
                    curIcon.src = iconSrc;
                    curIcon.addEventListener("click", e => {
                        iconInput.value = iconSrc;
                        iconShow.src = iconSrc;
                    });
                    curIcon.onload = e => {
                        curIcon.title = curIcon.naturalWidth + " x " + curIcon.naturalHeight + "\n" + iconSrc.replace(/.*\/([^\/]+)/, "$1");
                    };
                    iconsCon.appendChild(curIcon);
                });
            } else {
                iconsCon.style.opacity = 0;
            }
        }

        function initMycroft() {
            if (location.hostname !== "mycroftproject.com") return;
            let checkLinks = () => {
                let installLinks = document.querySelectorAll("img.icon+a");
                if (installLinks.length <= 0) return;
                let isLoading = false;
                [].forEach.call(installLinks, installLink => {
                    if (installLink.previousElementSibling && installLink.previousElementSibling.classList.contains("searchJumperIcon")) return;
                    if (installLink.previousElementSibling && installLink.previousElementSibling.previousElementSibling && installLink.previousElementSibling.previousElementSibling.classList.contains("searchJumperIcon")) return;
                    let urlMatch = installLink.href.match(/\?id=(\d+)&basename=(.+?)&/);
                    if (urlMatch === null) {
                        return;
                    }
                    let icon = document.createElement("img");
                    icon.className = "icon searchJumperIcon";
                    icon.style.cssText = "border: 1px solid #4c4c4c; border-radius: 9px; box-sizing: border-box; margin-right: 4px; cursor: pointer;";
                    icon.title = "Add to SearchJumper";
                    icon.src = logoBase64;
                    installLink.parentNode.insertBefore(icon, installLink);
                    icon.onclick = e => {
                        if (isLoading) return;
                        isLoading = true;
                        icon.classList.add("searchJumper-loading");
                        _GM_xmlhttpRequest({
                            method: "GET",
                            url: `https://mycroftproject.com/installos.php/${urlMatch[1]}/${urlMatch[2]}.xml`,
                            onload: (d) => {
                                isLoading = false;
                                icon.classList.remove("searchJumper-loading");
                                let shortName = d.responseXML.querySelector("ShortName");
                                let description = d.responseXML.querySelector("Description");
                                let urlparam = d.responseXML.querySelector("Url[method]");
                                let image = d.responseXML.querySelector("Image");
                                let inputEncoding = d.responseXML.querySelector("InputEncoding");
                                let postParams = urlparam.querySelectorAll("Param");
                                let name = shortName.textContent;
                                let desc = description.textContent;
                                let url = urlparam.getAttribute("template");
                                let ico = image.textContent;
                                let charset = inputEncoding.textContent;
                                if (postParams.length > 0) {
                                    let params = [];
                                    [].forEach.call(postParams, postParam => {
                                        params.push(`${postParam.getAttribute("name")}=${postParam.getAttribute("value")}`);
                                    });
                                    url += `%p{${params.join("&")}}`;
                                }
                                showSiteAdd(name, desc, url.replace(/{searchTerms}/g, "%s"), [ico], charset);
                            },
                            onerror: (e) => {
                                isLoading = false;
                                icon.classList.remove("searchJumper-loading");
                                _GM_notification(e.statusText || e.error);
                            },
                            ontimeout: (e) => {
                                isLoading = false;
                                icon.classList.remove("searchJumper-loading");
                                _GM_notification(e.statusText || e.error);
                            }
                        });
                    };
                });
            };
            checkLinks();
            let checkInterval = setInterval(() => {
                checkLinks();
            }, 1000);
            window.addEventListener("load", e => {
                clearInterval(checkInterval);
                checkLinks();
            });
        }

        function initView() {
            searchBar = new SearchBar();
        }

        async function initRun() {
            await searchBar.initRun();
            initListener();
        }

        async function sleep(time) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, time);
            })
        }

        async function initData() {
            let _searchData = await new Promise((resolve) => {
                storage.getItem("searchData", data => {
                    resolve(data);
                });
            });
            cacheKeywords = await new Promise((resolve) => {
                storage.getItem("cacheKeywords", data => {
                    resolve(data || '');
                });
            });
            lastSign = await new Promise((resolve) => {
                storage.getItem("lastSign", data => {
                    resolve(data || 0);
                });
            });
            storage.setItem("lastSign", 0);
            inPagePostParams = await new Promise((resolve) => {
                storage.getItem("inPagePostParams_" + location.host, data => {
                    resolve(data || false);
                });
            });
            cacheIcon = await new Promise((resolve) => {
                storage.getItem("cacheIcon", data => {
                    resolve(data || {});
                });
            });
            historySites = await new Promise((resolve) => {
                storage.getItem("historySites", data => {
                    resolve(data || []);
                });
            });
            sortTypeNames = await new Promise((resolve) => {
                storage.getItem("sortTypeNames", data => {
                    resolve(data || {});
                });
            });
            globalInPageWords = await new Promise((resolve) => {
                storage.getItem("globalInPageWords", data => {
                    resolve(data || '');
                });
            });
            navEnable = await new Promise((resolve) => {
                storage.getItem("navEnable", data => {
                    resolve(data || false);
                });
            });
            referrer = await new Promise((resolve) => {
                storage.getItem("referrer", data => {
                    resolve(data || "");
                });
            });
            lastAddType = await new Promise((resolve) => {
                storage.getItem("lastAddType", data => {
                    resolve(data || "");
                });
            });
            if (_searchData) {
                searchData = _searchData;
            }
            //旧版兼容
            if (typeof searchData.prefConfig.customSize === "undefined") {
                searchData.prefConfig.customSize = 100;
            }
            if (typeof searchData.prefConfig.typeOpenTime === "undefined") {
                searchData.prefConfig.typeOpenTime = 250;
            }
            if (typeof searchData.prefConfig.longPressTime === "undefined") {
                searchData.prefConfig.longPressTime = 500;
            }
            if (typeof searchData.prefConfig.cacheSwitch === "undefined") {
                searchData.prefConfig.cacheSwitch = false;
            }
            if (typeof searchData.prefConfig.noIcons === "undefined") {
                searchData.prefConfig.noIcons = false;
            }
            if (typeof searchData.prefConfig.noAni === "undefined") {
                searchData.prefConfig.noAni = false;
            }
            if (typeof searchData.prefConfig.quickAddRule === "undefined") {
                searchData.prefConfig.quickAddRule = true;
            }
            if (typeof searchData.prefConfig.multiline === "undefined") {
                searchData.prefConfig.multiline = 2;
            }
            if (typeof searchData.prefConfig.multilineGap === "undefined") {
                searchData.prefConfig.multilineGap = 1000;
            }
            if (typeof searchData.prefConfig.historyLength === "undefined") {
                searchData.prefConfig.historyLength = 0;
            }
            if (typeof searchData.prefConfig.dragToSearch === "undefined") {
                searchData.prefConfig.dragToSearch = true;
            }
            if (typeof searchData.prefConfig.firstFiveWordsColor === "undefined") {
                searchData.prefConfig.firstFiveWordsColor = [];
            }
            if (typeof searchData.prefConfig.inPageWordsStyles === "undefined") {
                searchData.prefConfig.inPageWordsStyles = [];
            }
        }

        if (location.href.indexOf("#searchJumperMin") != -1) {
            if (location.href.indexOf("#searchJumperMinPost") != -1) {
                window.history.replaceState(null, '', location.href.replace(/#searchJumperMin(Post)?/, ""));
                inMinMode = true;
            } else {
                if (location.href.indexOf("#searchJumperMinMobile") != -1) {
                    Object.defineProperty(Object.getPrototypeOf(navigator), 'userAgent', { get:function() { return mobileUa }});
                    _GM_xmlhttpRequest({
                        method: 'GET',
                        url: location.href,
                        headers: {
                            referer: location.href,
                            "User-Agent": mobileUa
                        },
                        onload: function(d) {
                            document.open();
                            document.write(d.response);
                            document.close();
                        },
                        onerror: function(){
                        },
                        ontimeout: function(){
                        }
                    });
                }
                window.history.replaceState(null, '', location.href.replace(/#searchJumperMin(Mobile)?/, ""));
                return;
            }
        }
        if (document.title == 'SearchJumper Multi') return;

        var inited = false;
        async function init(cb) {
            if (window.top != window.self && document.body.clientHeight < 100 && document.body.clientWidth < 100) {
                return;
            }
            if (inited) {
                if (cb) cb();
                return;
            }
            if (!document.hidden) {
                inited = true;
                preAction();
                await initData();
                initView();
                initConfig();
                initMycroft();
                initRun();
                if (cb) cb();
            }
            document.addEventListener('visibilitychange', visibilitychangeHandler);
        }

        function visibilitychangeHandler() {
            if (document.hidden) return;
            init(() => {
                let oldGlobalInPageWords = globalInPageWords;
                storage.getItem("globalInPageWords", data => {
                    globalInPageWords = (data || '');
                    if (oldGlobalInPageWords != globalInPageWords) {
                        searchBar.refreshPageWords();
                    }
                });
                let oldNavEnable = navEnable;
                storage.getItem("navEnable", data => {
                    navEnable = (data || false);
                    if (oldNavEnable != navEnable) {
                        searchBar.refreshNav();
                    }
                });
            });
        }


        storage.getItem("postUrl", postUrl => {
            if (postUrl && postUrl[0].indexOf(location.host) != -1) {
                storage.setItem("postUrl", '');
                submitByForm(postUrl[1], postUrl[0], '_self');
            } else {
                if (document.documentElement && document.head && document.body) {
                    init();
                } else {
                    let checkReady = () => {
                        if (document.documentElement && document.head && document.body) {
                            init();
                        } else {
                            setTimeout(() => {
                                checkReady();
                            }, 10);
                        }
                    };
                    checkReady();
                }
            }
        });
    }

    if (document) {
        run();
    } else {
        let checkReady = () => {
            if (document) {
                run();
            } else {
                setTimeout(() => {
                    checkReady();
                }, 10);
            }
        };
        checkReady();
    }
})();