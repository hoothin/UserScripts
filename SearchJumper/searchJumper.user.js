// ==UserScript==
// @name         SearchJumper
// @name:zh-CN   搜索酱
// @name:zh-TW   搜索醬
// @name:ja      検索ちゃん
// @namespace    hoothin
// @version      1.6.5.6.3
// @description  Jump to any search engine quickly and easily, the most powerful, most complete search enhancement script!
// @description:zh-CN  又一个多搜索引擎切换脚本，在搜索时一键跳转各大搜索引擎，支持任意页面右键划词搜索与全面自定义
// @description:zh-TW  又一個多搜尋引擎切換脚本，在搜索時一鍵跳轉各大搜尋引擎，支持任意頁面右鍵劃詞搜索與全面自定義
// @description:ja  任意の検索エンジンにすばやく簡単にジャンプします！
// @author       hoothin
// @match        *://*/*
// @icon         data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic2VhcmNoLWp1bXBlci1sb2dvQnRuU3ZnIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uNzM2IDUxMC40NjRjMC0yODEuOTQyIDIyOC4zMzUtNTEwLjUgNTEwLTUxMC41IDEzNS4yNiAwIDI2NC45ODEgNTMuNzg0IDM2MC42MjUgMTQ5LjUyMiA5NS42NDMgOTUuNzM3IDE0OS4zNzUgMjI1LjU4NSAxNDkuMzc1IDM2MC45NzggMCAyODEuOTQtMjI4LjMzNSA1MTAuNS01MTAgNTEwLjUtMjgxLjY2NSAwLTUxMC0yMjguNTYtNTEwLTUxMC41em01MTAtNTEwLjV2MTAyMW0tNTEwLTUxMC41aDEwMjAiIGZpbGw9IiNmZWZlZmUiLz48cGF0aCBkPSJNMjM3LjQ0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek02OTkuOTA0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek00MjMuMjk2IDc1OS4yOTZjLTY0IDAtMTE1LjcxMi01Mi4yMjQtMTE1LjcxMi0xMTUuNzEyIDAtMjYuNjI0IDkuMjE2LTUyLjIyNCAyNS42LTcyLjcwNCA5LjIxNi0xMS43NzYgMjYuMTEyLTEzLjMxMiAzNy44ODgtNC4wOTZzMTMuMzEyIDI2LjExMiA0LjA5NiAzNy44ODhjLTkuMjE2IDExLjI2NC0xMy44MjQgMjQuNTc2LTEzLjgyNCAzOC45MTIgMCAzNC4zMDQgMjcuNjQ4IDYxLjk1MiA2MS45NTIgNjEuOTUyczYxLjk1Mi0yNy42NDggNjEuOTUyLTYxLjk1MmMwLTQuMDk2LS41MTItOC4xOTItMS4wMjQtMTEuNzc2LTIuNTYtMTQuODQ4IDYuNjU2LTI4LjY3MiAyMS41MDQtMzEuNzQ0IDE0Ljg0OC0yLjU2IDI4LjY3MiA2LjY1NiAzMS43NDQgMjEuNTA0IDEuNTM2IDcuMTY4IDIuMDQ4IDE0LjMzNiAyLjA0OCAyMi4wMTYtLjUxMiA2My40ODgtNTIuMjI0IDExNS43MTItMTE2LjIyNCAxMTUuNzEyeiIgZmlsbD0iIzMzMyIvPjxwYXRoIGQ9Ik02MDIuMDggNzYwLjI5NmMtNjQgMC0xMTUuNzEyLTUyLjIyNC0xMTUuNzEyLTExNS43MTIgMC0xNC44NDggMTIuMjg4LTI3LjEzNiAyNy4xMzYtMjcuMTM2czI3LjEzNiAxMi4yODggMjcuMTM2IDI3LjEzNmMwIDM0LjMwNCAyNy42NDggNjEuOTUyIDYxLjk1MiA2MS45NTJzNjEuOTUyLTI3LjY0OCA2MS45NTItNjEuOTUyYzAtMTUuMzYtNS42MzItMzAuMjA4LTE1Ljg3Mi00MS40NzItOS43MjgtMTEuMjY0LTkuMjE2LTI4LjE2IDIuMDQ4LTM3Ljg4OCAxMS4yNjQtOS43MjggMjguMTYtOS4yMTYgMzcuODg4IDIuMDQ4IDE5LjQ1NiAyMS41MDQgMjkuNjk2IDQ4LjY0IDI5LjY5NiA3Ny44MjQgMCA2Mi45NzYtNTIuMjI0IDExNS4yLTExNi4yMjQgMTE1LjJ6IiBmaWxsPSIjMzMzIi8+PGVsbGlwc2Ugcnk9IjU4IiByeD0iMTI1IiBjeT0iNTA2LjI4NCIgY3g9IjIwMS4xODMiIGZpbGw9IiNmYWYiLz48ZWxsaXBzZSByeT0iNTgiIHJ4PSIxMjUiIGN5PSI1MDYuMjg0IiBjeD0iODIzLjE4MyIgZmlsbD0iI2ZhZiIvPjwvc3ZnPg==
// @grant        GM.getValue
// @grant        GM_getValue
// @grant        GM.setValue
// @grant        GM_setValue
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
// @grant        unsafeWindow
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    if (window.top != window.self || document.getElementById("search-jumper")) {
        return;
    }
    //const configPage = 'http://localhost:3000/';
    const configPage = 'https://hoothin.github.io/SearchJumper';
    const importPageReg = /^https:\/\/github\.com\/hoothin\/SearchJumper\/issue|^https:\/\/greasyfork\.org\/.*\/scripts\/445274[\-\/].*\/discussions/i;

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
            type: "视频",
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
                match: "https://github\\.com/search\\?.*&q="
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
                match: "https://www\\.google\\..*/search"
            }, {
                name: "百度",
                url: "https://www.baidu.com/s?wd=%s&ie=utf-8",
                keywords: "(?:wd|word)=(.*?)(&|$)",
                match: "https://(www|m)\\.baidu\\.com/.*(wd|word)="
            }, {
                name: "You",
                url: "https://you.com/search?q=%s",
                icon: "https://you.com/favicon/favicon-32x32.png"
            }, {
                name: "SearX",
                url: "https://searx.be/search?q=%s"
            }, {
                name: "头条搜索",
                url: "https://so.toutiao.com/search/?dvpf=%c&keyword=%s"
            }, {
                name: "必应",
                url: "https://www.bing.com/search?q=%s",
                match: "^https://(www|cn)\\.bing\\..*/search"
            }, {
                name: "鸭鸭",
                url: "https://duckduckgo.com/?q=%s"
            }, {
                name: "360",
                url: "https://www.so.com/s?ie=utf-8&q=%s",
                match: "\\.so\\.com/s\\?.*&q="
            }, {
                name: "雅虎",
                url: "https://search.yahoo.com/search?p=%s"
            }, {
                name: "搜狗",
                url: "https://www.sogou.com/web?query=%s",
                keywords: "(?:query|keyword)=(.*?)(&|$)",
                match: "\\.sogou\\.com/.*(query|keyword)="
            }, {
                name: "Yandex",
                url: "https://yandex.com/search/?text=%s"
            }, {
                name: "startpage",
                url: "https://www.startpage.com/sp/search?query=%s",
                match: "www\\.startpage\\.com/sp/search",
                icon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
            }, {
                name: "谷歌高级搜索",
                description: "不需要参数可清空",
                url: "https://www.google.com/search?q=%s%input{请输入限制文件类型, filetype:doc}%input{请输入结果限制语言,&lr=lang_zh-CN|lang_zh-TW}%input{请输入限制日期,&as_qdr=w1}&ie=utf-8&oe=utf-8"
            } ]
        },
        {
            type: "站内搜索",
            icon: "sitemap",
            selectTxt: true,
            openInNewTab: true,
            sites: [ {
                name: "Google站内搜",
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
                name: "Google",
                url: "https://www.google.com/searchbyimage?image_url=%t"
            }, {
                name: "Yandex",
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
                name: "Baidu",
                url: "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=%t"
            }, {
                name: "Bing",
                url: "https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:%t"
            }, {
                name: "TinEye",
                url: "https://www.tineye.com/search?url=%t"
            }, {
                name: "Sogou",
                url: "https://pic.sogou.com/ris?query=%t"
            }, {
                name: "360",
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
            } ]
        },
        {
            type: "当前网页",
            icon: "list",
            selectLink: true,
            selectPage: true,
            openInNewTab: true,
            sites: [ {
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
        ctrlKey: false,
        shiftKey: false,
        metaKey: false,
        autoClose: false,
        autoDelay: 1000,
        shortcut: false,
        initShow: true,
        customSize: 100,
        typeOpenTime: 250,
        longPressTime: 500,
        noIcons: false,
        showSiteLists: true,
        cacheSwitch: false,
        noAni: false,
        quickAddRule: true
    };
    function run() {
        const lang = navigator.appName == "Netscape" ? navigator.language : navigator.userLanguage;
        let config = {};
        switch (lang) {
            case "zh-CN":
            case "zh-SG":
                config = {
                    scriptName: '搜索酱',
                    importOrNot: '是否导入配置？',
                    settings: '配置脚本',
                    batchOpen: '确定要批量打开吗？',
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
                    siteAddOver: '站点添加成功'
                };
                break;
            case "zh-TW":
            case "zh-HK":
                config = {
                    scriptName: "搜索醬",
                    importOrNot: '是否導入配置？',
                    settings: '配置脚本',
                    batchOpen: '確定要批量打開嗎？',
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
                    siteAddOver: '站點添加成功'
                };
                break;
            default:
                config = {
                    scriptName: "SearchJumper",
                    importOrNot: 'Do you want to import this config?',
                    settings: 'Settings',
                    batchOpen: 'Batch open urls?',
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
                    siteAddOver: 'Site added successfully'
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
                console.debug(str);
            }
        };

        var _GM_xmlhttpRequest, _GM_registerMenuCommand, _GM_notification, _GM_setClipboard, _GM_openInTab;
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
        if (typeof GM_notification != 'undefined') {
            _GM_notification = GM_notification;
        } else if (typeof GM != 'undefined' && typeof GM.notification != 'undefined') {
            _GM_notification = GM.notification;
        } else {
            _GM_notification = (s) => {alert(s)};
        }
        if (typeof GM_setClipboard != 'undefined') {
            _GM_setClipboard = GM_setClipboard;
        } else if (typeof GM != 'undefined' && typeof GM.setClipboard != 'undefined') {
            _GM_setClipboard = GM.setClipboard;
        } else {
            _GM_setClipboard = (s) => {};
        }
        if (typeof GM_openInTab != 'undefined') {
            _GM_openInTab = GM_openInTab;
        } else if (typeof GM != 'undefined' && typeof GM.openInTab != 'undefined') {
            _GM_openInTab = GM.openInTab;
        } else {
            _GM_openInTab = (s, t) => {window.open(s)};
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
                if (this.operaUJSStorage) {
                    this.operaUJSStorage.setItem(key, value);
                } else if (this.mxAppStorage) {
                    this.mxAppStorage.setConfig(key, value);
                } else if (this.supportGM) {
                    GM_setValue(key, value);
                    if(value === "" && typeof GM_deleteValue != 'undefined'){
                        GM_deleteValue(key);
                    }
                } else if (this.supportGMPromise) {
                    GM.setValue(key, value);
                    if(value === "" && typeof GM != 'undefined' && typeof GM.deleteValue != 'undefined'){
                        GM.deleteValue(key);
                    }
                } else if (window.localStorage) {
                    window.localStorage.setItem(key, value);
                }
            },
            getItem: function (key, cb) {
                var value;
                if (this.operaUJSStorage) {
                    value = this.operaUJSStorage.getItem(key);
                } else if (this.mxAppStorage) {
                    value = this.mxAppStorage.getConfig(key);
                } else if (this.supportGM) {
                    value = GM_getValue(key);
                } else if (this.supportGMPromise) {
                    value = GM.getValue(key).then(v=>{cb(v)});
                    return;
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

        function createHTML(html){
            return escapeHTMLPolicy?escapeHTMLPolicy.createHTML(html):html;
        }

        var logoBtn, searchBar, searchTypes = [], currentSite = false, cacheKeywords, localKeywords, lastSign, cacheIcon, cachePool = [], currentFormParams;
        var logoBtnSvg = `<svg class="search-jumper-logoBtnSvg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><title>${i18n("scriptName")}</title><path d="M.736 510.464c0-281.942 228.335-510.5 510-510.5 135.26 0 264.981 53.784 360.625 149.522 95.643 95.737 149.375 225.585 149.375 360.978 0 281.94-228.335 510.5-510 510.5-281.665 0-510-228.56-510-510.5zm510-510.5v1021m-510-510.5h1020" fill="#fefefe"/><path d="M237.44 346.624a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0zM699.904 346.624a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0zM423.296 759.296c-64 0-115.712-52.224-115.712-115.712 0-26.624 9.216-52.224 25.6-72.704 9.216-11.776 26.112-13.312 37.888-4.096s13.312 26.112 4.096 37.888c-9.216 11.264-13.824 24.576-13.824 38.912 0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-4.096-.512-8.192-1.024-11.776-2.56-14.848 6.656-28.672 21.504-31.744 14.848-2.56 28.672 6.656 31.744 21.504 1.536 7.168 2.048 14.336 2.048 22.016-.512 63.488-52.224 115.712-116.224 115.712z" fill="#333"/><path d="M602.08 760.296c-64 0-115.712-52.224-115.712-115.712 0-14.848 12.288-27.136 27.136-27.136s27.136 12.288 27.136 27.136c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-15.36-5.632-30.208-15.872-41.472-9.728-11.264-9.216-28.16 2.048-37.888 11.264-9.728 28.16-9.216 37.888 2.048 19.456 21.504 29.696 48.64 29.696 77.824 0 62.976-52.224 115.2-116.224 115.2z" fill="#333"/><ellipse ry="58" rx="125" cy="506.284" cx="201.183" fill="#faf"/><ellipse ry="58" rx="125" cy="506.284" cx="823.183" fill="#faf"/></svg>`;
        var logoBase64 = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic2VhcmNoLWp1bXBlci1sb2dvQnRuU3ZnIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uNzM2IDUxMC40NjRjMC0yODEuOTQyIDIyOC4zMzUtNTEwLjUgNTEwLTUxMC41IDEzNS4yNiAwIDI2NC45ODEgNTMuNzg0IDM2MC42MjUgMTQ5LjUyMiA5NS42NDMgOTUuNzM3IDE0OS4zNzUgMjI1LjU4NSAxNDkuMzc1IDM2MC45NzggMCAyODEuOTQtMjI4LjMzNSA1MTAuNS01MTAgNTEwLjUtMjgxLjY2NSAwLTUxMC0yMjguNTYtNTEwLTUxMC41em01MTAtNTEwLjV2MTAyMW0tNTEwLTUxMC41aDEwMjAiIGZpbGw9IiNmZWZlZmUiLz48cGF0aCBkPSJNMjM3LjQ0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek02OTkuOTA0IDM0Ni42MjRhNDguNjQgNDguNjQgMCAxIDAgOTcuMjggMCA0OC42NCA0OC42NCAwIDEgMC05Ny4yOCAwek00MjMuMjk2IDc1OS4yOTZjLTY0IDAtMTE1LjcxMi01Mi4yMjQtMTE1LjcxMi0xMTUuNzEyIDAtMjYuNjI0IDkuMjE2LTUyLjIyNCAyNS42LTcyLjcwNCA5LjIxNi0xMS43NzYgMjYuMTEyLTEzLjMxMiAzNy44ODgtNC4wOTZzMTMuMzEyIDI2LjExMiA0LjA5NiAzNy44ODhjLTkuMjE2IDExLjI2NC0xMy44MjQgMjQuNTc2LTEzLjgyNCAzOC45MTIgMCAzNC4zMDQgMjcuNjQ4IDYxLjk1MiA2MS45NTIgNjEuOTUyczYxLjk1Mi0yNy42NDggNjEuOTUyLTYxLjk1MmMwLTQuMDk2LS41MTItOC4xOTItMS4wMjQtMTEuNzc2LTIuNTYtMTQuODQ4IDYuNjU2LTI4LjY3MiAyMS41MDQtMzEuNzQ0IDE0Ljg0OC0yLjU2IDI4LjY3MiA2LjY1NiAzMS43NDQgMjEuNTA0IDEuNTM2IDcuMTY4IDIuMDQ4IDE0LjMzNiAyLjA0OCAyMi4wMTYtLjUxMiA2My40ODgtNTIuMjI0IDExNS43MTItMTE2LjIyNCAxMTUuNzEyeiIgZmlsbD0iIzMzMyIvPjxwYXRoIGQ9Ik02MDIuMDggNzYwLjI5NmMtNjQgMC0xMTUuNzEyLTUyLjIyNC0xMTUuNzEyLTExNS43MTIgMC0xNC44NDggMTIuMjg4LTI3LjEzNiAyNy4xMzYtMjcuMTM2czI3LjEzNiAxMi4yODggMjcuMTM2IDI3LjEzNmMwIDM0LjMwNCAyNy42NDggNjEuOTUyIDYxLjk1MiA2MS45NTJzNjEuOTUyLTI3LjY0OCA2MS45NTItNjEuOTUyYzAtMTUuMzYtNS42MzItMzAuMjA4LTE1Ljg3Mi00MS40NzItOS43MjgtMTEuMjY0LTkuMjE2LTI4LjE2IDIuMDQ4LTM3Ljg4OCAxMS4yNjQtOS43MjggMjguMTYtOS4yMTYgMzcuODg4IDIuMDQ4IDE5LjQ1NiAyMS41MDQgMjkuNjk2IDQ4LjY0IDI5LjY5NiA3Ny44MjQgMCA2Mi45NzYtNTIuMjI0IDExNS4yLTExNi4yMjQgMTE1LjJ6IiBmaWxsPSIjMzMzIi8+PGVsbGlwc2Ugcnk9IjU4IiByeD0iMTI1IiBjeT0iNTA2LjI4NCIgY3g9IjIwMS4xODMiIGZpbGw9IiNmYWYiLz48ZWxsaXBzZSByeT0iNTgiIHJ4PSIxMjUiIGN5PSI1MDYuMjg0IiBjeD0iODIzLjE4MyIgZmlsbD0iI2ZhZiIvPjwvc3ZnPg==";
        var targetElement;

        class SearchBar {
            constructor() {
                this.scale = searchData.prefConfig.customSize / 100;
                var cssText = `
                 .search-jumper-searchBarCon {
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
                 }
                 .search-jumper-searchBar {
                     overflow-wrap: break-word;
                     background: #505050;
                     border-radius: ${this.scale * 20}px!important;
                     border: 1px solid #b3b3b3;
                     display: inline-flex;
                     pointer-events: all;
                     margin-top: -${this.scale * 25}px;
                     opacity: 0.3;
                     vertical-align: top;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-top 1s ease, margin-left 1s, opacity 1s, transform 1s;"}
                     user-select: none;
                     box-sizing:content-box;
                     text-align: center;
                     position: relative;
                 }
                 .search-jumper-searchBarCon::-webkit-scrollbar {
                     width: 0 !important;
                     height: 0 !important;
                 }
                 .search-jumper-searchBarCon.search-jumper-scroll {
                     pointer-events: all;
                 }
                 .search-jumper-scroll.search-jumper-bottom {
                     overflow-y: hidden;
                 }
                 .search-jumper-scroll>.search-jumper-searchBar {
                     position: static !important;
                 }
                 .search-jumper-scroll.search-jumper-right>.search-jumper-searchBar {
                     margin-left: ${this.scale * 20}px;
                 }
                 .search-jumper-scroll.search-jumper-right>.search-jumper-searchBar:hover,
                 .search-jumper-scroll.search-jumper-right>.search-jumper-searchBar.initShow {
                     margin-left: 0px;
                 }
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar {
                     margin-top: 0px;
                 }
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar:hover,
                 .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar.initShow {
                     margin-top: 0px;
                 }
                 .search-jumper-searchBar:hover {
                     margin-top: 0;
                     opacity: 1;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-top 0.25s ease, margin-left 0.25s, opacity 0.25s, transform 0.25s;"}
                 }
                 .search-jumper-searchBar.initShow {
                     margin-top: 0;
                     opacity: 0.8;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-top 0.25s ease, margin-left 0.25s, opacity 0.25s, transform 0.25s;"}
                 }
                 .search-jumper-left,
                 .search-jumper-left .search-jumper-type,
                 .search-jumper-left>.search-jumper-searchBar,
                 .search-jumper-right,
                 .search-jumper-right .search-jumper-type,
                 .search-jumper-right>.search-jumper-searchBar {
                     flex-direction: column;
                     max-width: ${42 * this.scale}px;
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
                 .search-jumper-bottom {
                     top: unset;
                     bottom: 0;
                     height: ${this.scale * 38}px;
                 }
                 .search-jumper-left>.search-jumper-searchBar {
                     margin-top: 0;
                     margin-left: -${this.scale * 20}px;
                 }
                 .search-jumper-right>.search-jumper-searchBar {
                     margin-top: 0;
                     margin-left: 0px;
                     position: fixed;
                 }
                 .search-jumper-left>.search-jumper-searchBar:hover,
                 .search-jumper-left>.search-jumper-searchBar.initShow {
                     margin-top: unset;
                     margin-left: 0;
                 }
                 .search-jumper-right>.search-jumper-searchBar:hover,
                 .search-jumper-right>.search-jumper-searchBar.initShow {
                     margin-top: unset;
                     margin-left: -${this.scale * 20}px;
                 }
                 .search-jumper-bottom>.search-jumper-searchBar {
                     position: relative;
                     margin-top: 0px;
                     -webkit-transform:scale(.9);
                     -moz-transform:scale(.9);
                     transform:scale(.9);
                 }
                 .search-jumper-bottom>.search-jumper-searchBar:hover,
                 .search-jumper-bottom>.search-jumper-searchBar.initShow {
                     margin-top: 0px;
                     -webkit-transform:unset;
                     -moz-transform:unset;
                     transform:unset;
                 }
                 .search-jumper-btn {
                     position: relative;
                     display: grid;
                     padding: 1px;
                     margin: 3px;
                     cursor: pointer;
                     ${searchData.prefConfig.noAni ? "" : "transition:margin-left 0.25s ease, width 0.25s, height 0.25s, transform 0.25s;"}
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     white-space: nowrap;
                     text-decoration:none;
                     min-width: ${32 * this.scale}px;
                     min-height: ${32 * this.scale}px;
                 }
                 .search-jumper-btn>i {
                     line-height: ${32 * this.scale}px;
                     letter-spacing: 0;
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
                 .search-jumper-isTargetLink>.search-jumper-type {
                     display: none;
                 }
                 .search-jumper-searchBar>.search-jumper-type.search-jumper-targetAll {
                     display: inline-flex;
                 }
                 .search-jumper-isInPage>.search-jumper-type.search-jumper-needInPage,
                 .search-jumper-isTargetImg>.search-jumper-type.search-jumper-targetImg,
                 .search-jumper-isTargetAudio>.search-jumper-type.search-jumper-targetAudio,
                 .search-jumper-isTargetVideo>.search-jumper-type.search-jumper-targetVideo,
                 .search-jumper-isTargetLink>.search-jumper-type.search-jumper-targetLink,
                 .search-jumper-isTargetPage>.search-jumper-type {
                     display: inline-flex;
                 }
                 .search-jumper-type {
                     display: inline-flex;
                     background: #d0d0d0;
                     border-radius: ${20 * this.scale}px!important;
                     overflow: hidden;
                     ${searchData.prefConfig.noAni ? "" : `transition:width ${searchData.prefConfig.typeOpenTime}ms ease, height ${searchData.prefConfig.typeOpenTime}ms;`}
                 }
                 .search-jumper-type>.sitelist {
                     position: fixed;
                     text-align: left;
                     background: #00000000;
                     max-height: 95vh;
                     overflow: scroll;
                 }
                 .search-jumper-type>.sitelist>.sitelistCon {
                     margin: 10px;
                     border-radius: 10px;
                     box-shadow: 0px 0px 10px 0px #7a7a7a;
                     padding: 0 0 10px 0;
                     background: white;
                     opacity: 0.9;
                 }
                 .search-jumper-type>.sitelist>.sitelistCon:hover {
                     opacity: 1;
                 }
                 .search-jumper-type>.sitelist::-webkit-scrollbar {
                     width: 0 !important;
                     height: 0 !important;
                 }
                 .search-jumper-type>.sitelist>.sitelistCon>div {
                     padding: 0 10px;
                 }
                 .search-jumper-type>.sitelist>.sitelistCon>div:hover {
                     background: #f5f7fa;
                 }
                 .search-jumper-type>.sitelist a {
                     display: flex;
                     align-items: center;
                     text-decoration: none;
                 }
                 .search-jumper-type>.sitelist a>img {
                     width: 20px;
                     height: 20px;
                     margin-right: 10px;
                     margin-top: unset;
                 }
                 .search-jumper-type>.sitelist a>p {
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
                 .search-jumper-type>.sitelist>.sitelistCon>p {
                     color: #565656;
                     margin: 0;
                     text-align: center;
                     font-size: 16px;
                     font-family: Arial,sans-serif;
                     font-weight: bold;
                     background: #f6f6f6;
                     border-radius: 10px 10px 0 0;
                     max-width: 200px;
                     overflow: hidden;
                     white-space: nowrap;
                     margin: 0 auto;
                     text-overflow: ellipsis;
                 }
                 .search-jumper-searchBar.disable-pointer>.search-jumper-type {
                     pointer-events: none;
                 }
                 .search-jumper-word {
                     background: black;
                     color: white!important;
                     text-shadow: 0px 0px 5px black;
                     font-family: system-ui,Arial,sans-serif;
                     font-weight: bold;
                     border-radius: ${20 * this.scale}px!important;
                     font-size: ${15 * this.scale}px;
                     line-height: ${32 * this.scale}px;
                     width: ${32 * this.scale}px;
                     height: ${32 * this.scale}px;
                     min-width: ${32 * this.scale}px;
                     min-height: ${32 * this.scale}px;
                     letter-spacing: 2px;
                 }
                 a.search-jumper-word {
                     background: #505050;
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
                 .search-jumper-type.search-jumper-hide {
                     background: unset;
                 }
                 span.search-jumper-word>img {
                     width: ${20 * this.scale}px;
                     height: ${20 * this.scale}px;
                     margin: auto;
                 }
                 .search-jumper-searchBar .search-jumper-btn:hover {
                     -webkit-transform:scale(1.2);
                     -moz-transform:scale(1.2);
                     transform:scale(1.2);
                     color: white;
                     text-decoration:none;
                 }`;
                if (searchData.prefConfig.cssText) cssText += searchData.prefConfig.cssText;
                let styleEle = document.createElement("style");
                styleEle.innerHTML = createHTML(cssText);
                document.documentElement.appendChild(styleEle);

                let logoCon = document.createElement("span");
                logoCon.className = "search-jumper-type search-jumper-hide search-jumper-logo";
                logoBtn = document.createElement("span");
                logoBtn.innerHTML = createHTML(logoBtnSvg);
                logoBtn.className = "search-jumper-btn";
                logoCon.addEventListener('mouseenter', e => {
                    if (this.preList) {
                        this.preList.style.display = "none";
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

                let enterHandler = e => {
                    //bar.removeEventListener('mouseenter', enterHandler, false);
                    bar.classList.remove("initShow");
                };
                bar.addEventListener('mouseenter', enterHandler, false);
                if (searchData.prefConfig.initShow) {
                    bar.classList.add("initShow");
                } else {
                    let touchHandler = e => {
                        bar.removeEventListener('touchstart', touchHandler, true);
                        bar.classList.add('disable-pointer');
                        setTimeout(() => {
                            bar.classList.remove('disable-pointer');
                        }, 250);
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

            }

            removeBar() {
                if (this.bar.parentNode.parentNode) {
                    this.bar.parentNode.parentNode.removeChild(this.bar.parentNode);
                }
            }

            appendBar() {
                if (!this.bar.parentNode.parentNode) {
                    document.documentElement.appendChild(this.bar.parentNode);
                }
            }

            initRun() {
                let self = this;
                this.fontPool = [];
                this.allSiteBtns = [];
                searchData.sitesConfig.forEach(siteConfig => {
                    this.createType(siteConfig);
                });
                this.bar.style.display = "none";
                if (currentSite && /%s\b/.test(currentSite.url)) {
                    this.bar.style.display = "";
                    this.initPos(
                        searchData.prefConfig.position.x,
                        searchData.prefConfig.position.y,
                        searchData.prefConfig.offset.x,
                        searchData.prefConfig.offset.y
                    );
                }
                if (this.fontPool.length > 0 || location.href.indexOf(configPage) === 0) {
                    let linkEle = document.createElement("link");
                    linkEle.rel="stylesheet";
                    linkEle.href = searchData.prefConfig.fontAwesomeCss || "https://lib.baomitu.com/font-awesome/6.0.0-beta2/css/all.css";
                    let appendCss = () => {
                        if (document.readyState == 'complete') {
                            document.documentElement.insertBefore(linkEle, document.documentElement.children[0]);
                            this.waitForFontAwesome(() => {
                                this.fontPool.forEach(font => {
                                    font.innerText = '';
                                    font.style.fontSize = '';
                                    font.style.color = '';
                                    cachePool.push(font);
                                });
                                setTimeout(() => {cacheManager()}, 1000);
                            });
                        }
                    };
                    if (document.readyState == 'complete') {
                        appendCss();
                    }
                    document.addEventListener('readystatechange', event => {
                        appendCss();
                    })
                } else {
                    cacheManager();
                }

                var delay = searchData.prefConfig.autoDelay || 1000;
                var hideHandler = () => {
                    self.bar.classList.remove("search-jumper-isInPage");
                    self.bar.classList.remove("search-jumper-isTargetImg");
                    self.bar.classList.remove("search-jumper-isTargetAudio");
                    self.bar.classList.remove("search-jumper-isTargetVideo");
                    self.bar.classList.remove("search-jumper-isTargetLink");
                    self.bar.classList.remove("search-jumper-isTargetPage");
                    if (searchData.prefConfig.autoClose) {
                        let openType = this.bar.querySelector('.search-jumper-type:not(.search-jumper-hide)>span');
                        if (openType) {
                            openType.onmousedown();
                        }
                    }
                    this.hideTimeout = null;
                };
                this.bar.addEventListener('mouseenter', e => {
                    if (this.hideTimeout) {
                        clearTimeout(this.hideTimeout);
                    }
                }, false);
                this.bar.addEventListener('mouseleave', e => {
                    this.hideTimeout = setTimeout(hideHandler, delay);
                    if (this.preList) {
                        this.preList.style.display = "none";
                    }
                }, false);

                if (/^2:/.test(lastSign)) {
                    let targetSite = this.bar.querySelector(`a[href="${lastSign.replace(/^2:/,"").replace(/(["'])/g,'\\$1')}"]`);
                    if (targetSite) {
                        let mouseDownEvent = new PointerEvent("mousedown");
                        targetSite.dispatchEvent(mouseDownEvent);
                        targetSite.click();
                    }
                }
                lastSign = 0;
                storage.setItem("lastSign", 0);
            }

            setCurrentSite(data) {
                currentSite = data;
                localKeywords = "";
                let keywords = getKeywords();
                if (keywords && keywords != cacheKeywords) {
                    cacheKeywords = keywords;
                    storage.setItem("cacheKeywords", keywords);
                }
            }

            refresh() {
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
                        let typeBtn = this.bar.querySelector(`.search-jumper-type.search-jumper-hide[title="${typeData.type}"]>span`);
                        if (typeBtn) {
                            this.bar.insertBefore(typeBtn.parentNode, this.bar.children[0]);
                            typeBtn.onmousedown();
                        }
                    }
                }
            }

            waitForFontAwesome(callback) {
                var retries = 100;
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
                    context.fillText( '\uf0c8', 10, 18 );
                    var data = context.getImageData( 2, 10, 1, 1 ).data;
                    if ( data[0] == 0 && data[1] == 0 && data[2] == 0 ) {
                        context.font = '16pt "Font Awesome 6 Free"';
                        context.fillText( '\uf0c8', 10, 18 );
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

                setTimeout( checkReady, 50 );
            }

            createList(sites, type) {
                let list = document.createElement("div");
                list.className = "sitelist";
                let con = document.createElement("div");
                con.className = "sitelistCon";
                list.appendChild(con);
                let title = document.createElement("p");
                title.innerText = type;
                con.appendChild(title);
                sites.forEach(siteEle => {
                    let icon = siteEle.querySelector("img");
                    let url = siteEle.href;
                    let li = document.createElement("div");
                    let a = document.createElement("a");
                    a.setAttribute("target", siteEle.target);
                    a.href = url;
                    a.addEventListener('mousedown', e => {
                        siteEle.dispatchEvent(new PointerEvent("mousedown", {altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey}));
                        a.href = siteEle.href;
                        if (!a.onclick && siteEle.onclick) {
                            a.onclick = siteEle.onclick;
                        }
                    }, false);
                    li.appendChild(a);
                    if (icon && icon.src) {
                        let img = document.createElement("img");
                        img.src = icon.src;
                        a.appendChild(img);
                    }
                    let p = document.createElement("p");
                    p.innerText = siteEle.dataset.name;
                    li.title = siteEle.title;
                    a.appendChild(p);
                    con.appendChild(li);
                });
                return list;
            }

            listPos(ele, list) {
                if (this.preList) {
                    this.preList.style.display = "none";
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
                    this.preList.style.display = "none";
                }
                let ew = clingEle.clientWidth;
                let eh = clingEle.clientHeight;
                let clientX = clingEle.offsetLeft + ew / 2 - this.bar.parentNode.scrollLeft;
                let clientY = clingEle.offsetTop + eh / 2 - this.bar.parentNode.scrollTop;
                let current = clingEle.offsetParent;

                while (current !== null){
                    clientX += current.offsetLeft;
                    clientY += current.offsetTop;
                    current = current.offsetParent;
                }
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                if (clientY < eh) {
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

            createType(data) {
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
                let openInNewTab = data.openInNewTab;
                let siteEles = [];
                let ele = document.createElement("span");
                if (data.match === '0') {
                    ele.style.display = 'none';
                } else if (data.match) {
                    if (new RegExp(data.match).test(location.href) == false) {
                        ele.style.display = 'none';
                    } else {
                        match = true;
                    }
                }
                ele.className = "search-jumper-type search-jumper-hide";
                if (typeof data.description !== 'undefined') {
                    ele.dataset.title = data.description;
                } else {
                    ele.dataset.title = type;
                }
                let typeBtn = document.createElement("span");
                ele.appendChild(typeBtn);
                typeBtn.classList.add("search-jumper-word");
                typeBtn.classList.add("search-jumper-btn");
                if (icon) {
                    if (/^[a-z\-]+$/.test(icon)) {
                        let cache = searchData.prefConfig.cacheSwitch && cacheIcon[icon];
                        if (cache) {
                            let img = document.createElement("img");
                            img.src = cache;
                            img.style.width = '100%';
                            img.style.height = '100%';
                            typeBtn.appendChild(img);
                        } else {
                            let i = document.createElement("i");
                            i.className = "fa fa-" + icon;
                            i.innerText = type;
                            i.style.fontSize = 14 * this.scale + 'px';
                            i.style.color = 'wheat';
                            this.fontPool.push(i);
                            typeBtn.appendChild(i);
                        }
                    } else {
                        let img = document.createElement("img");
                        let isBase64 = /^data:/.test(icon);
                        if (isBase64) {
                            img.src = icon;
                        } else {
                            let cache = searchData.prefConfig.cacheSwitch && cacheIcon[icon];
                            if (cache) {
                                img.src = cache;
                            } else {
                                img.src = icon;
                                if (searchData.prefConfig.cacheSwitch) cachePool.push(img);
                            }
                        }
                        typeBtn.appendChild(img);
                    }
                } else {
                    let i = document.createElement("i");
                    i.innerText = type;
                    i.style.fontSize = 14 * this.scale + 'px';
                    i.style.color = 'wheat';
                    typeBtn.appendChild(i);
                }
                let batchOpen = () => {
                    if (!ele.classList.contains("search-jumper-hide") || window.confirm(i18n('batchOpen'))) {
                        self.batchOpening = true;
                        siteEles.forEach(siteEle => {
                            if (siteEle.dataset.nobatch || siteEle.dataset.current) return;
                            let isJs = /^javascript:/.test(siteEle.href);
                            if (!isJs) {
                                siteEle.setAttribute("target", "_blank");
                            }
                            let mouseDownEvent = new PointerEvent("mousedown");
                            siteEle.dispatchEvent(mouseDownEvent);
                            if (siteEle.onclick || isJs) {
                                siteEle.click();
                            } else {
                                _GM_openInTab(siteEle.href);
                            }
                            siteEle.setAttribute("target", siteEle.dataset.target == 1 ? "_blank" : "");
                        });
                        self.batchOpening = false;
                    }
                };
                if (searchData.prefConfig.shortcut && data.shortcut) {
                    ele.dataset.title += ` (${data.shortcut.toUpperCase()})`;
                    document.addEventListener('keydown', e => {
                        if ((data.ctrl && !e.ctrlKey) ||
                            (data.alt && !e.altKey) ||
                            (data.shift && !e.shiftKey) ||
                            (data.meta && !e.metaKey)) {
                            return;
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            }
                        }
                        var key = String.fromCharCode(e.keyCode).toLowerCase();
                        if (data.shortcut == key) {
                            batchOpen();
                        }
                    });
                }
                let typeAction = e => {
                    let baseSize = Math.min(self.bar.scrollWidth, self.bar.scrollHeight);
                    if (e) {
                        if (e.which === 3) {
                            batchOpen();
                            return false;
                        } if (e.which === 1 && (e.shiftKey || e.altKey || e.ctrlKey)) {
                            return false;
                        }
                    }
                    ele.style.width = "";
                    ele.style.height = "";
                    if (self.preList) {
                        self.preList.style.display = "none";
                    }
                    if (ele.classList.contains("search-jumper-hide")) {
                        ele.classList.remove("search-jumper-hide");
                        if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                            self.bar.parentNode.classList.contains("search-jumper-right")) {
                            ele.style.height = ele.dataset.width;
                        } else {
                            ele.style.width = ele.dataset.width;
                        }
                        setTimeout(() => {
                            if (!ele.classList.contains("search-jumper-hide")) {
                                ele.style.flexWrap = "wrap";
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
                    } else {
                        ele.classList.add("search-jumper-hide");
                        if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                            self.bar.parentNode.classList.contains("search-jumper-right")) {
                            ele.style.height = baseSize + "px";
                        } else {
                            ele.style.width = baseSize + "px";
                        }
                        ele.style.flexWrap = "";
                    }
                    setTimeout(() => {
                        self.checkScroll();
                    }, 251);
                };
                typeBtn.onmousedown = typeAction;
                typeBtn.oncontextmenu = function (event) {
                    event.preventDefault();
                };

                typeBtn.addEventListener('click', e => {
                    if (e.which === 1 && e.altKey && e.shiftKey) {
                        self.batchOpening = true;
                        let urls=[];
                        for (let i = 0;i < siteEles.length;i++) {
                            let siteEle = siteEles[i];
                            if (!siteEle.dataset.nobatch && !/^javascript:/.test(siteEle.href) && !siteEle.onclick) {
                                let mouseDownEvent = new PointerEvent("mousedown");
                                siteEle.dispatchEvent(mouseDownEvent);
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
                            _unsafeWindow.open(urls[i], "_blank", `width=${_width-10}, height=${_height}, location=0, resizable=1, menubar=0, scrollbars=0, left=${left}, top=${top}`);
                        }
                    } else if (e.which === 1 && e.altKey) {
                        self.batchOpening = true;
                        let html = '<title>SearchJumper Multi</title>';
                        for (let i = 0;i < siteEles.length;i++) {
                            let siteEle = siteEles[i];
                            if (!siteEle.dataset.nobatch && !/^javascript:/.test(siteEle.href) && !siteEle.onclick) {
                                let mouseDownEvent = new PointerEvent("mousedown");
                                siteEle.dispatchEvent(mouseDownEvent);
                                let iframe = document.createElement('iframe');
                                iframe.width = '50%';
                                iframe.height = '100%';
                                iframe.frameBorder = '0';
                                iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
                                iframe.src = siteEle.href;
                                html += iframe.outerHTML;
                            }
                        }
                        let c = _unsafeWindow.open("", "_blank");
                        c.document.write(html);
                        c.document.close();
                    } else if (e.which === 1 && e.shiftKey) {
                        self.batchOpening = true;
                        for (let i = 0;i < siteEles.length;i++) {
                            let siteEle = siteEles[i];
                            if (!siteEle.dataset.nobatch && !/^javascript:/.test(siteEle.href) && !siteEle.onclick) {
                                storage.setItem("lastSign", 1);
                                let mouseDownEvent = new PointerEvent("mousedown");
                                siteEle.dispatchEvent(mouseDownEvent);
                                window.open(siteEle.href, '_blank');
                                self.batchOpening = false;
                                return;
                            }
                        }
                    }
                    self.batchOpening = false;
                }, false);

                let siteList;

                let showTimer;
                typeBtn.addEventListener('mouseenter', e => {
                    if (searchData.prefConfig.showSiteLists && ele.classList.contains("search-jumper-hide")) {
                        self.listPos(ele, siteList);
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
                sites.forEach(site => {
                    let siteEle = self.createSiteBtn(site.name, (searchData.prefConfig.noIcons?'':site.icon), site, openInNewTab);
                    self.allSiteBtns.push(siteEle);
                    ele.appendChild(siteEle);
                    siteEles.push(siteEle);
                    if (!currentSite && (siteEle.dataset.current || match)) {
                        isCurrent = true;
                        self.setCurrentSite(site);
                    }
                });
                if (searchData.prefConfig.showSiteLists) {
                    siteList = this.createList(siteEles, ele.dataset.title);
                    siteList.style.display = "none";
                    ele.appendChild(siteList);
                }
                if (isCurrent) {
                    self.bar.insertBefore(ele, self.bar.children[0]);
                    ele.dataset.width = ele.scrollWidth + "px";
                    ele.classList.remove("search-jumper-hide");
                    if (lastSign === 1) {
                        batchOpen();
                        lastSign = 0;
                    }
                } else {
                    self.bar.insertBefore(ele, self.bar.children[self.bar.children.length - 1]);
                    ele.dataset.width = ele.scrollWidth + "px";
                }
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

            createSiteBtn(name, icon, data, openInNewTab) {
                let self = this;
                let isBookmarklet = /^javascript:/.test(data.url);
                let ele = document.createElement("a");
                ele.className = "search-jumper-btn";
                if (typeof data.description !== 'undefined') ele.title = data.description;
                ele.dataset.name = name;
                ele.classList.add("search-jumper-word");
                let word = document.createElement("span");
                word.innerText = name;
                ele.appendChild(word);
                let img = document.createElement("img");
                img.style.opacity = 0;
                ele.appendChild(img);
                if (data.nobatch) ele.dataset.nobatch = 1;
                img.onload = e => {
                    ele.classList.remove("search-jumper-word");
                    ele.removeChild(word);
                    img.style.opacity = 1;
                };
                let imgSrc;
                if (icon == 0) {
                } else if (icon) {
                    imgSrc = icon;
                } else if (/^http/.test(data.url)) {
                    imgSrc = data.url.replace(/^(https?:\/\/[^\/]*\/).*$/, "$1favicon.ico");
                }
                let isBase64 = /^data:/.test(imgSrc);
                if (isBase64) {
                    img.src = imgSrc;
                } else if (imgSrc) {
                    let cache = searchData.prefConfig.cacheSwitch && cacheIcon[imgSrc];
                    if (cache) {
                        img.src = cache;
                    } else {
                        img.src = imgSrc;
                        if (searchData.prefConfig.cacheSwitch) cachePool.push(img);
                    }
                }
                let customInput = false;
                self.stopInput = false;
                if (searchData.prefConfig.shortcut && data.shortcut) {
                    ele.dataset.name += ` (${data.shortcut.toUpperCase()})`;
                    let shortcutCover = document.createElement("div");
                    shortcutCover.innerText = data.shortcut.toUpperCase();
                    ele.appendChild(shortcutCover);
                    document.addEventListener('keydown', e => {
                        if (!self.hideTimeout) {
                            if ((data.ctrl && !e.ctrlKey) ||
                                (data.alt && !e.altKey) ||
                                (data.shift && !e.shiftKey) ||
                                (data.meta && !e.metaKey)) {
                                return;
                            }
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            }
                        }
                        var key = String.fromCharCode(e.keyCode).toLowerCase();
                        if (data.shortcut == key) {
                            if (action() !== false && !customInput) {
                                ele.click();
                            }
                        }
                    });
                }
                if (!currentSite || data.hideNotMatch) {
                    if (data.match === '0') {
                        ele.style.display = 'none';
                    } else if (data.match) {
                        if (new RegExp(data.match).test(location.href)) {
                            ele.dataset.current = true;
                        }
                    } else if (data.url.indexOf(location.host) != -1) {
                        if (data.url.indexOf("site") != -1) {
                            let siteMatch = data.url.match(/site(%3A|:)(.+?)[\s%]/);
                            if (siteMatch && location.href.indexOf(siteMatch[2]) != -1 && data.url.replace(siteMatch[0], "").indexOf(location.host) != -1) {
                                ele.dataset.current = true;
                            }
                        } else if (!currentSite && data.url.replace(/^https?:\/\//, "").replace(location.host, "").replace(/\/?[\?#].*/, "") == location.pathname.replace(/\/$/, "")) {
                            if (data.url.indexOf("#p{") != -1) {
                                ele.dataset.current = true;
                            } else {
                                let urlReg = data.url.match(/[^\/\?&]+(?=%[stb])/g);
                                if (urlReg) {
                                    urlReg = urlReg.join('.*');
                                    if (new RegExp(urlReg).test(location.href)) {
                                        ele.dataset.current = true;
                                    }
                                } else {
                                    ele.dataset.current = true;
                                }
                            }
                        }
                    }
                    if (ele.dataset.current) {
                        if (!currentSite) {
                            let submitParams = location.href.match(/#p{(.*?)}/);
                            if (submitParams) {
                                submitParams = submitParams[1];
                                let params = submitParams.split("&");
                                let submitAction = () => {
                                    setTimeout(() => {
                                        if (document.readyState === "loading") {
                                            submitAction();
                                            return;
                                        }
                                        let form, input;
                                        for (let i = 0; i < params.length; i++) {
                                            let curPair = decodeURIComponent(params[i]);
                                            let index = curPair.replace(/http.*/, "").lastIndexOf("=");
                                            let k = curPair.slice(0, index);
                                            let v = curPair.slice(index + 1);
                                            input = document.querySelector(k);
                                            if (!input) {
                                                submitAction();
                                                return;
                                            }
                                            if (v === 'click()') {
                                                emuClick(input);
                                            } else {
                                                input.focus();
                                                input.value = v;
                                                let inputEvent = new InputEvent("input");
                                                input.dispatchEvent(inputEvent);
                                            }
                                        }
                                        form = input.parentNode;
                                        while (form.tagName != 'FORM') {
                                            form = form.parentNode;
                                            if (!form) break;
                                        }
                                        if (form) {
                                            let submitBtn = form.querySelector("[type=submit]");
                                            if(submitBtn) submitBtn.click();
                                            else form.submit();
                                        }
                                    }, 500);
                                };
                                submitAction();
                            }
                        }
                    } else if (data.hideNotMatch) {
                        ele.style.display = 'none';
                    }
                }
                if (!isBookmarklet && (openInNewTab || searchData.prefConfig.openInNewTab)) {
                    ele.setAttribute("target", "_blank");
                    ele.dataset.target = 1;
                }
                let getUrl = () => {
                    customInput = false;
                    let keywords = getKeywords();
                    if (keywords && keywords != cacheKeywords) {
                        cacheKeywords = keywords;
                        storage.setItem("cacheKeywords", keywords);
                    }
                    if (!ele.dataset.url) {
                        ele.dataset.url = data.url.replace(/%e\b/g, document.charset).replace(/%c\b/g, (isMobile?"mobile":"pc")).replace(/%u\b/g, location.href).replace(/%U\b/g, encodeURIComponent(location.href)).replace(/%h\b/g, location.host);
                    }
                    let selStr = getSelectStr();
                    let targetUrl = '';
                    let targetName = selStr || document.title;
                    let imgBase64 = '', resultUrl = ele.dataset.url;
                    if (targetElement) {
                        targetUrl = targetElement.src || targetElement.href || '';
                        targetName = targetElement.title || targetElement.alt || document.title;
                        if (targetElement.tagName == 'IMG' && /%i\b/.test(ele.dataset.url)) {
                            if (/^data/.test(targetElement.src)) {
                                resultUrl = resultUrl.replace(/%i\b/g, targetElement.src);
                            } else if (targetElement.src.split("/")[2] == document.domain) {
                                imgBase64 = image2Base64(targetElement);
                                resultUrl = resultUrl.replace(/%i\b/g, imgBase64);
                            }
                        }
                    }
                    while (resultUrl.indexOf('%input{') !== -1) {
                        let inputMatch = resultUrl.match(/%input{(.*?)}/);
                        if (!inputMatch) return false;
                        customInput = true;
                        if (self.stopInput) return false;
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
                    }
                    let targetBaseUrl = targetUrl.replace(/^https?:\/\//i, "");
                    if (!keywords && /%s\b/.test(resultUrl)) {
                        customInput = true;
                        if (self.stopInput) return false;
                        let promptStr = window.prompt(i18n("keywords"));
                        if (promptStr === null) return false;
                        localKeywords = promptStr;
                        setTimeout(() => {localKeywords = ''}, 1);
                        resultUrl = resultUrl.replace(/%s\b/g, promptStr);
                    }
                    if (targetUrl === '') {
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
                            customInput = true;
                            if (getTargetUrl() === false) return false;
                            resultUrl = resultUrl.replace(/%t\b/g, promptStr);
                        }
                        if (/%T\b/.test(resultUrl)) {
                            customInput = true;
                            if (getTargetUrl() === false) return false;
                            resultUrl = resultUrl.replace(/%T\b/g, encodeURIComponent(promptStr));
                        }
                        if (/%b\b/.test(resultUrl)) {
                            customInput = true;
                            if (getTargetUrl() === false) return false;
                            resultUrl = resultUrl.replace(/%b\b/g, promptStr.replace(/^https?:\/\//i, ""));
                        }
                        if (/%B\b/.test(resultUrl)) {
                            customInput = true;
                            if (getTargetUrl() === false) return false;
                            resultUrl = resultUrl.replace(/%B\b/g, encodeURIComponent(promptStr.replace(/^https?:\/\//i, "")));
                        }
                    }
                    return resultUrl.replace(/%t\b/g, targetUrl).replace(/%T\b/g, encodeURIComponent(targetUrl)).replace(/%b\b/g, targetBaseUrl).replace(/%B\b/g, encodeURIComponent(targetBaseUrl)).replace(/%n\b/g, targetName).replace(/%s\b/g, keywords).replace(/%S\b/g, (cacheKeywords || keywords));
                };
                let action = e => {
                    if (/^\[/.test(data.url)) {
                        if (!ele.onclick) {
                            let targetSites = [];
                            let siteNames = JSON.parse(data.url);
                            siteNames.forEach(n => {
                                for (let i = 0; i < self.allSiteBtns.length; i++) {
                                    let siteBtn = self.allSiteBtns[i];
                                    if (/^\[/.test(siteBtn.href)) continue;
                                    if (siteBtn != ele && siteBtn.title == n) {
                                        targetSites.push(siteBtn);
                                        break;
                                    }
                                }
                            });
                            ele.onclick = e => {
                                if (e.which === 1 && e.altKey && e.shiftKey) {
                                    let urls=[];
                                    for (let i = 0;i < targetSites.length;i++) {
                                        let siteEle = targetSites[i];
                                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                                            let mouseDownEvent = new PointerEvent("mousedown");
                                            siteEle.dispatchEvent(mouseDownEvent);
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
                                        _unsafeWindow.open(urls[i], "_blank", `width=${_width-10}, height=${_height}, location=0, resizable=1, menubar=0, scrollbars=0, left=${left}, top=${top}`);
                                    }
                                    return false;
                                } else if (e.which === 1 && e.altKey) {
                                    let html = '<title>SearchJumper Multi</title>';
                                    for (let i = 0;i < targetSites.length;i++) {
                                        let siteEle = targetSites[i];
                                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                                            let mouseDownEvent = new PointerEvent("mousedown");
                                            siteEle.dispatchEvent(mouseDownEvent);
                                            let iframe = document.createElement('iframe');
                                            iframe.width = '50%';
                                            iframe.height = '100%';
                                            iframe.frameBorder = '0';
                                            iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
                                            iframe.src = siteEle.href;
                                            html += iframe.outerHTML;
                                        }
                                    }
                                    let c = _unsafeWindow.open("", "_blank");
                                    c.document.write(html);
                                    c.document.close();
                                    return false;
                                } else if (e.which === 1 && e.shiftKey) {
                                    for (let i = 0;i < targetSites.length;i++) {
                                        let siteEle = targetSites[i];
                                        if (/^http/.test(siteEle.href) && !siteEle.onclick) {
                                            storage.setItem("lastSign", "2:" + data.url);
                                            let mouseDownEvent = new PointerEvent("mousedown");
                                            siteEle.dispatchEvent(mouseDownEvent);
                                            window.open(siteEle.href, '_blank');
                                            return false;
                                        }
                                    }
                                }
                                targetSites.forEach(siteEle => {
                                    if (siteEle.dataset.current) return;
                                    let isJs = /^javascript:/.test(siteEle.href);
                                    if (!isJs) {
                                        siteEle.setAttribute("target", "_blank");
                                    }
                                    let mouseDownEvent = new PointerEvent("mousedown");
                                    siteEle.dispatchEvent(mouseDownEvent);
                                    if (siteEle.onclick || isJs) {
                                        siteEle.click();
                                    } else {
                                        _GM_openInTab(siteEle.href);
                                    }
                                    siteEle.setAttribute("target", siteEle.dataset.target==1?"_blank":"");
                                });
                                return false;
                            };
                        }
                    } else if (/[:%]P{/.test(data.url)) {
                        if (!ele.onclick) {
                            ele.onclick = e => {
                                let url = getUrl();
                                if (url === false) return false;
                                let postBody = url.match(/[:%]P{(.*?)}/), postParam = {};
                                if (postBody) {
                                    url = url.replace(postBody[0], '');
                                    postBody = postBody[1];
                                    postBody = new URLSearchParams(postBody);
                                    postBody.forEach((v, k) => {
                                        postParam[k] = v;
                                    });
                                }
                                _GM_xmlhttpRequest({
                                    method: "POST", url: url, data: JSON.stringify(postParam),
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
                                return false;
                            };
                        }
                    } else if ((data.charset && data.charset != 'utf-8') || /[:%]p{/.test(data.url)) {
                        if (!ele.onclick) {
                            ele.onclick = e => {
                                let url = getUrl();
                                if (url === false) return false;
                                submitByForm(data.charset, url, ele.getAttribute("target") || '_self');
                                return false;
                            };
                        }
                    } else {
                        let alt = e && e.altKey;
                        let url = getUrl();
                        if (url === false) {
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
                                return false;
                            };
                        } else ele.href = url;
                        let isJs = /^javascript:/.test(url);
                        let checkAlt = () => {
                            if (alt && !isJs) {
                                ele.onclick = e => {
                                    ele.onclick = null;
                                    _unsafeWindow.open(url, "_blank", "width=800, height=1000, location=0, resizable=1, menubar=0, scrollbars=0");
                                    return false;
                                };
                                return true;
                            }
                            return false;
                        };
                        if (customInput) {
                            if (self.batchOpening !== true) {
                                //lose click, click one more time
                                if (checkAlt() || isJs) {
                                    ele.click();
                                } else {
                                    _GM_openInTab(url, {active: true});
                                }
                            }
                        } else {
                            if (!checkAlt()) {
                                ele.onclick = null;
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

            checkScroll() {
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
            }

            showInPage() {
                if (targetElement &&
                    targetElement.parentNode &&
                    targetElement.parentNode.className &&
                    targetElement.parentNode.classList.contains("search-jumper-btn")) {
                    return;
                }
                this.appendBar();
                let firstType;
                let self = this;
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                }
                var delay = searchData.prefConfig.autoDelay || 1000;
                delay = delay * 3;
                var hideHandler = () => {
                    self.bar.classList.remove("search-jumper-isInPage");
                    self.bar.classList.remove("search-jumper-isTargetImg");
                    self.bar.classList.remove("search-jumper-isTargetAudio");
                    self.bar.classList.remove("search-jumper-isTargetVideo");
                    self.bar.classList.remove("search-jumper-isTargetLink");
                    self.bar.classList.remove("search-jumper-isTargetPage");
                    self.bar.classList.remove("initShow");
                    self.hideTimeout = null;
                };
                //this.hideTimeout = setTimeout(hideHandler, delay);
                this.bar.classList.remove("search-jumper-isInPage");
                this.bar.classList.remove("search-jumper-isTargetImg");
                this.bar.classList.remove("search-jumper-isTargetAudio");
                this.bar.classList.remove("search-jumper-isTargetVideo");
                this.bar.classList.remove("search-jumper-isTargetLink");
                this.bar.classList.remove("search-jumper-isTargetPage");
                this.bar.classList.add("initShow");
                if (getSelectStr()) {
                    this.bar.classList.add("search-jumper-isInPage");
                    if (this.bar.style.display == "none") {
                        firstType = this.bar.querySelector('.search-jumper-needInPage>span');
                    } else {
                        let openType = this.bar.querySelector(".search-jumper-type:not(.search-jumper-hide,.search-jumper-targetPage,.search-jumper-targetImg,.search-jumper-targetAudio,.search-jumper-targetVideo,.search-jumper-targetLink)");
                        if (!openType) firstType = this.bar.querySelector('.search-jumper-needInPage>span');
                    }
                } else {
                    switch (targetElement.tagName) {
                        case 'IMG':
                            this.bar.classList.add("search-jumper-isTargetImg");
                            firstType = this.bar.querySelector('.search-jumper-targetImg>span');
                            break;
                        case 'AUDIO':
                            this.bar.classList.add("search-jumper-isTargetAudio");
                            firstType = this.bar.querySelector('.search-jumper-targetAudio>span');
                            break;
                        case 'VIDEO':
                            this.bar.classList.add("search-jumper-isTargetVideo");
                            firstType = this.bar.querySelector('.search-jumper-targetVideo>span');
                            break;
                        case 'A':
                            this.bar.classList.add("search-jumper-isTargetLink");
                            firstType = this.bar.querySelector('.search-jumper-targetLink>span');
                            break;
                        default:
                            this.bar.classList.add("search-jumper-isTargetPage");
                            firstType = this.bar.querySelector('.search-jumper-targetPage>span');
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
                if (firstType && firstType.parentNode.classList.contains('search-jumper-hide')) firstType.onmousedown();
                this.checkScroll();
            }

            initPos(relX, relY, posX, posY) {
                let self = this;
                let setClass = className => {
                    self.bar.style.cssText = "";
                    self.bar.parentNode.className = "search-jumper-searchBarCon " + className;
                    searchTypes.forEach(ele => {
                        ele.style.width = "";
                        ele.style.height = "";
                        if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                            self.bar.parentNode.classList.contains("search-jumper-right")) {
                            ele.style.height = ele.dataset.width;
                        } else {
                            ele.style.width = ele.dataset.width;
                        }
                    });
                    let baseSize = Math.min(self.bar.scrollWidth, self.bar.scrollHeight);
                    searchTypes.forEach(ele => {
                        ele.style.width = "";
                        ele.style.height = "";
                        if (ele.classList.contains("search-jumper-hide")) {
                            if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                                self.bar.parentNode.classList.contains("search-jumper-right")) {
                                ele.style.height = baseSize + "px";
                            } else {
                                ele.style.width = baseSize + "px";
                            }
                        } else {
                            if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                                self.bar.parentNode.classList.contains("search-jumper-right")) {
                                ele.style.height = ele.dataset.width;
                            } else {
                                ele.style.width = ele.dataset.width;
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
                } else if (relX == "right" && relY == "center") {
                    //右中
                    setClass("search-jumper-right");
                    self.bar.style.position = "absolute";
                    self.bar.style.marginTop = posY + "px";
                }
                setTimeout(() => {
                    if (self.bar.scrollWidth > viewWidth || self.bar.scrollHeight > viewHeight) {
                        self.bar.parentNode.classList.add("search-jumper-scroll");
                    } else {
                        self.bar.parentNode.classList.remove("search-jumper-scroll");
                    }
                }, 1);
                searchData.prefConfig.position.x = relX;
                searchData.prefConfig.position.y = relY;
                searchData.prefConfig.offset.x = posX;
                searchData.prefConfig.offset.y = posY;
            }
        }

        function emuClick(btn){
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
            var mouseEvent = new PointerEvent("mousedown",eventParam);
            btn.dispatchEvent(mouseEvent);
            mouseEvent = new PointerEvent("mouseup",eventParam);
            btn.dispatchEvent(mouseEvent);
            btn.click();
        }

        function submitByForm(charset, url, target) {
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
            if (postBody) {
                url = url.replace(postBody[0], '');
                postBody = postBody[1];
                form.method = 'post';
                params = new URLSearchParams(postBody);
            } else {
                form.method = 'get';
                params = new URLSearchParams(new URL(url).search);
            }
            if (charset) {
                form.acceptCharset = charset;
            }
            form.innerHTML = createHTML('');
            form.target = target;
            form.action = url;
            params.forEach((v, k) => {
                let input = document.createElement("input");
                input.name = k;
                input.value = v;
                form.appendChild(input);
            });
            currentFormParams = {charset: charset, url: url, target: target};
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
            if (cache == 'data:,' || !cache) return;
            cacheIcon[img.src] = cache;
            storage.setItem("cacheIcon", cacheIcon);
        }

        function cacheFontIcon(icon) {
            let iconName = icon.className.replace('fa fa-', '');
            if (cacheIcon[iconName]) return;
            let cache = icon2Base64(icon);
            if (cache == 'data:,' || !cache) return;
            cacheIcon[iconName] = cache;
            storage.setItem("cacheIcon", cacheIcon);
        }

        async function cacheAction(target) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 10);
            });
            if (!searchData.prefConfig.cacheSwitch) return;
            if (target.tagName == 'IMG') {
                let cache;
                if (target.complete) {
                    if (target.naturalHeight && target.naturalWidth) {
                        await cacheImg(target);
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
                }
            } else {
                cacheFontIcon(target);
            }
        }

        async function cacheManager() {
            let needCache = cachePool.length > 0;
            while (cachePool.length > 0) {
                await cacheAction(cachePool.shift());
            }
            if (needCache) {
                console.log('SearchJumper all icons cached!');
            }
            if (searchBar.bar.style.display === "none") {
                searchBar.removeBar();
            }
        }

        function getSelectStr() {
            let selStr = window.getSelection().toString();
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
                return encodeURIComponent(selStr);
            }
            if (localKeywords) return localKeywords;
            if (!currentSite) return '';
            //if (localKeywords === '' && cacheKeywords) return cacheKeywords;

            let keywordsMatch, keywords = '';
            if (currentSite.keywords) {
                keywordsMatch = location.href.match(new RegExp(currentSite.keywords));
                if (keywordsMatch) {
                    keywords = keywordsMatch[1];
                }
            } else if (/%s\b/.test(currentSite.url)) {
                if (location.href.indexOf("?") != -1) {
                    keywordsMatch = currentSite.url.match(/[\?&]([^&]*?)=%s\b.*/);
                    if (keywordsMatch) {
                        keywords = new URLSearchParams(location.search).get(keywordsMatch[1]);
                    }
                } else {
                    keywordsMatch = currentSite.url.match(/https?:\/\/[^\/]*\/(.*)%s\b/);
                    if (keywordsMatch) {
                        keywordsMatch = location.href.match(new RegExp(keywordsMatch[1] + "(.*?)(\/|$)"));
                        if (keywordsMatch) {
                            keywords = keywordsMatch[1];
                        }
                    }
                }
            }
            if (keywords == '') {
                let firstInput = document.querySelector('input[type=text],input:not([type])');
                if (firstInput) keywords = encodeURIComponent(firstInput.value);
            }
            localKeywords = keywords;
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

        function initListener() {
            _GM_registerMenuCommand(i18n('settings'), () => {
                _GM_openInTab(configPage, {active: true});
            });
            let logoSvg = logoBtn.children[0];
            let grabState = 0;//0 未按下 1 已按下 2 已拖动
            let hideTimer;

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
                    _GM_openInTab(configPage, {active: true});
                    return;
                }
                grabState = 0;
                let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                let baseWidth = viewWidth / 3;
                let baseHeight = viewHeight / 3;
                let relX, relY, posX, posY;
                let curX = clientX(e) - searchBar.bar.scrollWidth / 2;
                let curY = clientY(e) - searchBar.bar.scrollHeight / 2;
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
                if (e.which === 3) {
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

            if (searchData.prefConfig.enableInPage) {
                let shown = false;
                let showToolbarTimer;
                if (searchData.prefConfig.shortcutKey) {
                    document.addEventListener('keydown', e => {
                        if ((searchData.prefConfig.altKey && !e.altKey) ||
                            (searchData.prefConfig.ctrlKey && !e.ctrlKey) ||
                            (searchData.prefConfig.shiftKey && !e.shiftKey) ||
                            (searchData.prefConfig.metaKey && !e.metaKey)) {
                            return;
                        }
                        if (!searchData.prefConfig.enableInInput) {
                            if (document.activeElement &&
                                (document.activeElement.tagName == 'INPUT' ||
                                 document.activeElement.tagName == 'TEXTAREA' ||
                                 document.activeElement.contentEditable == 'true')) {
                                return;
                            }
                        }
                        var key = String.fromCharCode(e.keyCode).toLowerCase();
                        if (searchData.prefConfig.shortcutKey == key) {
                            if (!targetElement) targetElement = document.body;
                            searchBar.showInPage();
                        }
                    });
                }
                document.addEventListener('mousedown', e => {
                    if (e.target.classList.contains('search-jumper-btn') ||
                        e.target.tagName === 'CANVAS' ||
                        (e.target.parentNode && e.target.parentNode.classList && e.target.parentNode.classList.contains('search-jumper-btn'))) {
                        return;
                    }
                    shown = false;
                    targetElement = e.target;
                    if ((searchData.prefConfig.altKey && !e.altKey) ||
                        (searchData.prefConfig.ctrlKey && !e.ctrlKey) ||
                        (searchData.prefConfig.shiftKey && !e.shiftKey) ||
                        (searchData.prefConfig.metaKey && !e.metaKey)) {
                        return;
                    }
                    if (!searchData.prefConfig.selectToShow &&
                        (e.which === 1 || e.which === 2) && !searchData.prefConfig.leftMouse) {
                        return;
                    }
                    let selectImg = e.target.tagName === 'IMG';
                    let matchKey = searchData.prefConfig.altKey ||
                        searchData.prefConfig.ctrlKey ||
                        searchData.prefConfig.shiftKey ||
                        searchData.prefConfig.metaKey;
                    showToolbarTimer = setTimeout(() => {
                        if (targetElement != e.target) return;
                        if ((e.which === 1 || e.which === 2) && !searchData.prefConfig.leftMouse) return;
                        searchBar.showInPage();
                        shown = true;
                    }, parseInt(searchData.prefConfig.longPressTime));
                    let mouseUpHandler = e => {
                        if (shown) {
                            e.stopPropagation();
                            e.preventDefault();
                        }else if (matchKey || (searchData.prefConfig.selectToShow && getSelectStr())) {
                            searchBar.showInPage();
                        }
                        clearTimeout(showToolbarTimer);
                        document.removeEventListener('mouseup', mouseUpHandler, false);
                    };
                    document.addEventListener('mouseup', mouseUpHandler, false);
                }, true);
                document.addEventListener('contextmenu', e => {
                    if (shown) e.preventDefault();
                    shown = false;
                });
            }
            if (searchData.prefConfig.quickAddRule) {
                document.addEventListener('click', e => {
                    if (!e.ctrlKey || !e.altKey) return;
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
                        [].forEach.call(parentForm.querySelectorAll("input[type='text'][name],input[name]:not([type])"), input => {
                            let value = input.value;
                            if (e.target.name === input.name) {
                                value = "%s";
                            }
                            params.push(input.name + "=" + value);
                        });
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
            window.addEventListener('yt-navigate-finish', changeHandler);
            window.addEventListener("securitypolicyviolation", (e) => {
                if (e.violatedDirective === 'form-action') {
                    let jumpTo = `https://hoothin.github.io/SearchJumper/jump.html#jump{url=${encodeURIComponent(currentFormParams.url)}&charset=${currentFormParams.charset}}`;
                    if (currentFormParams.target == '_self') {
                        location.href = jumpTo;
                    } else {
                        _GM_openInTab(jumpTo);
                    }
                }
            });
        }

        function preAction() {
            if (location.href.indexOf('#jump{') != -1) {
                let submitParams = location.href.match(/#jump{url=(.*)&charset=(.*)}/);
                if (submitParams) {
                    submitByForm(submitParams[2], decodeURIComponent(submitParams[1]), '_self');
                }
            }
        }

        function initConfig() {
            if (location.href.indexOf(configPage) === 0) {
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
                    let newCache = {};
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
                    }
                    storage.setItem("cacheIcon", newCache);
                    if (e.notification || (e.detail && e.detail.notification)) {
                        _GM_notification('Configuration imported successfully!');
                    }
                });
                document.addEventListener('copyConfig', e => {
                    _GM_setClipboard(JSON.stringify(searchData, null, 2));
                    _GM_notification('Configuration copied successfully!');
                });
            } else if (importPageReg.test(location.href)) {
                document.addEventListener("mousedown", e => {
                    if (e.target.tagName === "PRE") {
                        let hasMove = false;
                        let mouseUpHandler = e => {
                            if (hasMove) {
                                return;
                            }
                            document.removeEventListener('mouseup', mouseUpHandler, false);
                            document.removeEventListener('mousemove', mouseMoveHandler, false);
                            if (getSelectStr() ==='' && window.confirm(i18n("importOrNot"))) {
                                let configTxt = e.target.innerText.trim(), configData;
                                try {
                                    configData = JSON.parse(configTxt);
                                    searchData.sitesConfig = configData;
                                    storage.setItem("searchData", searchData);
                                    _GM_notification('Over!');
                                } catch (e) {
                                    _GM_notification(e.toString());
                                }
                            }
                        };
                        let mouseMoveHandler = e => {
                            hasMove = true;
                            document.removeEventListener('mouseup', mouseUpHandler, false);
                            document.removeEventListener('mousemove', mouseMoveHandler, false);
                        };
                        document.addEventListener('mouseup', mouseUpHandler, false);
                        document.addEventListener('mousemove', mouseMoveHandler, false);
                    }
                })
            }
        }

        var addFrame, nameInput, descInput, urlInput, iconInput, iconShow, iconsCon, typeSelect, testBtn, cancelBtn, addBtn;
        function showSiteAdd(name, description, url, icons, charset) {
            if (!addFrame) {
                addFrame = document.createElement("div");
                addFrame.innerHTML = createHTML(`
                <style>
                    .searchJumperFrame-body {
                        width: 300px;
                        min-height: 300px;
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
                    .searchJumperFrame-title {
                        background: #458bd1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 10px 10px 0 0;
                    }
                    .searchJumperFrame-title>img {
                        margin: 5px;
                    }
                    .searchJumperFrame-input-title {
                        font-size: 9pt;
                        font-family: Roboto, Helvetica, Arial, sans-serif;
                        display: inline-block;
                        background-color: white;
                        position: relative;
                        left: 20px;
                        padding: 0px 4px;
                        text-align: left;
                        color: #646464;
                    }
                    .searchJumperFrame-body>input,.searchJumperFrame-body>select {
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
                    .searchJumperFrame-buttons {
                        text-align: center;
                        margin-bottom: 5px;
                    }
                    .searchJumperFrame-buttons>button {
                        width: 32%;
                        font-size: 16px;
                        cursor: pointer;
                        color: #363636;
                    }
                    .searchJumperFrame-buttons>button:hover {
                        color: black;
                    }
                    .searchJumperFrame-body>img {
                        float: right;
                        margin-top: -33px;
                        position: relative;
                        right: 5px;
                        opacity: 0.8;
                    }
                    .searchJumperFrame-body>.iconsCon {
                        max-height: 150px;
                        overflow: overlay;
                    }
                    .searchJumperFrame-body>.iconsCon>img {
                        margin: 5px;
                        cursor: pointer;
                        max-width: 90%;
                        border: 2px solid #ffffff;
                    }
                    .searchJumperFrame-body>.iconsCon>img:hover {
                        border: 2px solid #4e91d3;
                        box-sizing: border-box;
                    }
                </style>
                <div class="searchJumperFrame-body">
                    <a href="${configPage}" class="searchJumperFrame-title" target="_blank">
                        <img width="32px" height="32px" src=${logoBase64}>${i18n("scriptName")}
                    </a>
                    <div class="searchJumperFrame-input-title">${i18n("siteName")}</div>
                    <input name="siteName" type="text">
                    <div class="searchJumperFrame-input-title">${i18n("siteDesc")}</div>
                    <input name="description" type="text">
                    <div class="searchJumperFrame-input-title">${i18n("siteUrl")}</div>
                    <input name="url" type="text">
                    <div class="searchJumperFrame-input-title">${i18n("siteIcon")}</div>
                    <input name="icon" type="text">
                    <img width="27px" height="27px">
                    <div class="iconsCon"></div>
                    <div class="searchJumperFrame-input-title">${i18n("siteType")}</div>
                    <select>
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
                iconShow = addFrame.querySelector(".searchJumperFrame-body>img");
                iconsCon = addFrame.querySelector(".iconsCon");
                testBtn = addFrame.querySelector("#test");
                cancelBtn = addFrame.querySelector("#cancel");
                addBtn = addFrame.querySelector("#add");
                typeSelect = addFrame.querySelector("select");
                for (let i = 0; i < searchData.sitesConfig.length; i++) {
                    let typeConfig = searchData.sitesConfig[i];
                    let option = document.createElement("option");
                    option.value = i;
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
                            if (curSite.url == url) {
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
                    if (charset && charset.toLowerCase() != 'utf-8') {
                        siteObj.charset = charset;
                    }
                    searchData.sitesConfig[typeSelect.value].sites.push(siteObj);
                    storage.setItem("searchData", searchData);
                    _GM_notification(i18n("siteAddOver"));
                });
            }
            document.body.appendChild(addFrame);
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
                iconsCon.style.display = "";
                iconsCon.innerHTML = createHTML("");
                icons.forEach(iconSrc => {
                    let curIcon = document.createElement("img");
                    curIcon.src = iconSrc;
                    curIcon.addEventListener("click", e => {
                        iconInput.value = iconSrc;
                        iconShow.src = iconSrc;
                    });
                    iconsCon.appendChild(curIcon);
                });
            } else {
                iconsCon.style.display = "none";
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
            window.addEventListener("load", e => {
                checkLinks();
            });
        }

        function initView() {
            searchBar = new SearchBar();
        }

        function initRun() {
            initListener();
            searchBar.initRun();
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
            cacheIcon = await new Promise((resolve) => {
                storage.getItem("cacheIcon", data => {
                    resolve(data || {});
                });
            });
            if (_searchData) {
                searchData = _searchData;
            }
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
        }

        async function init() {
            preAction();
            await initData();
            initView();
            initRun();
            initConfig();
            initMycroft();
        }

        function visibilitychangeHandler() {
            document.removeEventListener('visibilitychange', visibilitychangeHandler);
            init();
        }

        if (document.hidden) {
            document.addEventListener('visibilitychange', visibilitychangeHandler);
        } else {
            init();
        }
    }
    if (document && document.documentElement) {
        run();
    } else {
        let checkReady = () => {
            if (document && document.documentElement) {
                run();
            } else {
                setTimeout(() => {
                    checkReady();
                }, 100);
            }
        };
        checkReady();
    }
})();