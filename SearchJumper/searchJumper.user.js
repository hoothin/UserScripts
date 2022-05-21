// ==UserScript==
// @name         SearchJumper
// @name:zh-CN   搜索酱
// @name:zh-TW   搜索醬
// @name:ja      検索ちゃん
// @namespace    hoothin
// @version      0.8
// @description  Jump to any search engine quickly and easily!
// @description:zh-CN  又一个搜索引擎跳转脚本
// @description:zh-TW  又一個搜尋引擎跳轉脚本
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
// @grant        GM.notification
// @grant        GM_notification
// @grant        GM.setClipboard
// @grant        GM_setClipboard
// @grant        GM.openInTab
// @grant        GM_openInTab
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    if (window.top != window.self || document.getElementById("search-jumper")) {
        return;
    }
    var searchData = {};
    /**
     * s 搜索关键词
     * e 编码
     * c 客户端 pc,mobile
     * u 当前网站url
     * t 图片src
     * b 图片src去头
     *
     * name 站点名
     * url 站点地址
     * keywords 站点关键词提取
     * match 匹配当前站点
     * icon 站点icon
     * charset 站点编码
     */
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
                url: "http://cn.bing.com/dict/search?q=%s"
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
                url: "http://so.1ting.com/all.do?q=%s"
            }, {
                name: "QQ音乐",
                url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
            }, {
                name: "百度音乐",
                url: "http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s"
            }, {
                name: "酷我音乐",
                url: "http://sou.kuwo.cn/ws/NSearch?type=all&key=%s"
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
                url: "https://github.com/search?utf8=✓&q=%s"
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
                name: "萌娘百科",
                url: "https://zh.moegirl.org/%s",
                icon: "https://zh.moegirl.org.cn/favicon.ico"
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
                url: "https://pan.baidu.com/disk/home?#/search?key=%s"
            }, {
                name: "大力盘",
                url: "https://www.dalipan.com/search?keyword=%s"
            }, {
                name: "大圣盘",
                url: "https://www.dashengpan.com/search?keyword=%s"
            }, {
                name: "罗马盘",
                url: "https://www.luomapan.com/search?keyword=%s"
            }, {
                name: "小白盘",
                url: "https://www.xiaobaipan.com/list-%s.html?from=1"
            }, {
                name: "56网盘",
                url: "https://www.56wangpan.com/search/kw%s"
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
                url: "https://www.google.com/search?q=%s&ie=%e&oe=%e",
                keywords: "\\?q=(.*?)&",
                match: "https://www\\.google\\..*/search\\?q=",
                icon: "http://www.google.com/favicon.ico",
                charset: "utf-8"
            }, {
                name: "百度",
                url: "https://www.baidu.com/s?wd=%s&ie=%e",
                match: "https://www\\.baidu\\.com/.*wd="
            }, {
                name: "You",
                url: "https://you.com/search?q=%s",
                icon: "https://you.com/favicon/favicon-32x32.png"
            }, {
                name: "头条搜索",
                url: "https://so.toutiao.com/search/?dvpf=%c&keyword=%s"
            }, {
                name: "必应",
                url: "https://cn.bing.com/search?q=%s"
            }, {
                name: "DDG",
                url: "https://duckduckgo.com/?q=%s"
            }, {
                name: "360",
                url: "https://www.so.com/s?ie=utf-8&q=%s"
            }, {
                name: "雅虎",
                url: "https://search.yahoo.com/search;?p=%s"
            }, {
                name: "搜狗",
                url: "https://www.sogou.com/web?query=%s"
            }, {
                name: "Yandex",
                url: "https://yandex.com/search/?text=%s"
            }, {
                name: "startpage",
                url: "https://www.startpage.com/sp/search?query=%s",
                icon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
            } ]
        },
        {
            type: "站内搜索",
            icon: "sitemap",
            selectTxt: true,
            openInNewTab: true,
            sites: [ {
                name: "Google",
                url: "https://www.google.com/search?q=%s%20site%3A%h&ie=%e&oe=%e",
                keywords: "\\?q=(.*?)&",
                match: "https://www\\.google\\..*/search\\?q=",
                icon: "http://www.google.com/favicon.ico",
                charset: "utf-8"
            }, {
                name: "头条搜索",
                url: "https://so.toutiao.com/search/?dvpf=%c&keyword=%s%20site%3A%h"
            }, {
                name: "百度",
                url: "https://www.baidu.com/s?wd=%s%20site%3A%h&ie=%e"
            }, {
                name: "必应",
                url: "https://cn.bing.com/search?q=%s%20site%3A%h"
            }, {
                name: "DDG",
                url: "https://duckduckgo.com/?q=%s%20site%3A%h"
            }, {
                name: "360",
                url: "https://www.so.com/s?ie=utf-8&q=%s%20site%3A%h"
            }, {
                name: "雅虎",
                url: "https://search.yahoo.com/search;?p=%s%20site%3A%h"
            }, {
                name: "搜狗",
                url: "https://www.sogou.com/web?query=%s%20site%3A%h"
            }, {
                name: "Yandex",
                url: "https://yandex.com/search/?text=%s%20site%3A%h"
            }, {
                name: "startpage",
                url: "https://www.startpage.com/sp/search?query=%s%20site%3A%h",
                icon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
            } ]
        },
        {
            //右键长按或者当前处于图片搜索网站并存储有图片网址
            type: "以图搜图",
            icon: "sitemap",
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
                name: "ZXing QRCode",
                url: "https://zxing.org/w/decode?full=true&u=%t"
            }, {
                name: "ImgOps",
                url: "https://imgops.com/%b"
            } ]
        },
        {
            type: "VIP",
            icon: "diamond",
            match: "://v\\.qq\\.com/x/",
            sites: [ {
                name: "52wyb",
                icon: 0,
                url: "https://api.52wyb.com/webcloud/?v=%u",
            } ]
        }
    ];
    searchData.prefConfig = {
        position: {
            x: "top",
            y: "center"
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
        autoClose: false
    };
    const lang = navigator.appName == "Netscape" ? navigator.language : navigator.userLanguage;
    let config = {};
    switch (lang) {
        case "zh-CN":
        case "zh-SG":
            config = {
                scriptName: '搜索酱',
                importOrNot: '是否导入配置？',
                settings: '配置脚本'
            };
            break;
        case "zh-TW":
        case "zh-HK":
            config = {
                scriptName: "搜索醬",
                importOrNot: '是否導入配置？',
                settings: '配置脚本'
            };
            break;
        default:
            config = {
                scriptName: "Search Jumper",
                importOrNot: 'Do you want to import this config?',
                settings: 'Settings'
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

    var _GM_registerMenuCommand, _GM_notification, _GM_setClipboard, _GM_openInTab;
    if (typeof GM_registerMenuCommand != 'undefined') {
        _GM_registerMenuCommand = GM_registerMenuCommand;
    } else if (typeof GM != 'undefined' && typeof GM.registerMenuCommand != 'undefined') {
        _GM_registerMenuCommand = GM.registerMenuCommand;
    } else {
        _GM_registerMenuCommand = (s, f) => {};
    }
    if(typeof GM_notification != 'undefined'){
        _GM_notification = GM_notification;
    }else if(typeof GM != 'undefined' && typeof GM.notification != 'undefined') {
        _GM_notification = GM.notification;
    }else{
        _GM_notification = (s) => {alert(s)};
    }
    if(typeof GM_setClipboard != 'undefined'){
        _GM_setClipboard = GM_setClipboard;
    }else if(typeof GM != 'undefined' && typeof GM.setClipboard != 'undefined') {
        _GM_setClipboard = GM.setClipboard;
    }else{
        _GM_setClipboard = (s) => {};
    }
    if(typeof GM_openInTab != 'undefined'){
        _GM_openInTab = GM_openInTab;
    }else if(typeof GM != 'undefined' && typeof GM.openInTab != 'undefined') {
        _GM_openInTab = GM.openInTab;
    }else{
        _GM_openInTab = (s) => {};
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
    if (unsafeWindow.trustedTypes && unsafeWindow.trustedTypes.createPolicy) {
        escapeHTMLPolicy=unsafeWindow.trustedTypes.createPolicy('default', {
            createHTML: (string, sink) => string
        });
    }

    function createHTML(html){
        return escapeHTMLPolicy?escapeHTMLPolicy.createHTML(html):html;
    }

    var logoBtn, searchBar, searchTypes = [], currentSite = false, cacheKeywords;
    var logoBtnSvg = `<svg class="search-jumper-logoBtnSvg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><title>${i18n("scriptName")}</title><path d="M.736 510.464c0-281.942 228.335-510.5 510-510.5 135.26 0 264.981 53.784 360.625 149.522 95.643 95.737 149.375 225.585 149.375 360.978 0 281.94-228.335 510.5-510 510.5-281.665 0-510-228.56-510-510.5zm510-510.5v1021m-510-510.5h1020" fill="#fefefe"/><path d="M237.44 346.624a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0zM699.904 346.624a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0zM423.296 759.296c-64 0-115.712-52.224-115.712-115.712 0-26.624 9.216-52.224 25.6-72.704 9.216-11.776 26.112-13.312 37.888-4.096s13.312 26.112 4.096 37.888c-9.216 11.264-13.824 24.576-13.824 38.912 0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-4.096-.512-8.192-1.024-11.776-2.56-14.848 6.656-28.672 21.504-31.744 14.848-2.56 28.672 6.656 31.744 21.504 1.536 7.168 2.048 14.336 2.048 22.016-.512 63.488-52.224 115.712-116.224 115.712z" fill="#333"/><path d="M602.08 760.296c-64 0-115.712-52.224-115.712-115.712 0-14.848 12.288-27.136 27.136-27.136s27.136 12.288 27.136 27.136c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-15.36-5.632-30.208-15.872-41.472-9.728-11.264-9.216-28.16 2.048-37.888 11.264-9.728 28.16-9.216 37.888 2.048 19.456 21.504 29.696 48.64 29.696 77.824 0 62.976-52.224 115.2-116.224 115.2z" fill="#333"/><ellipse ry="58" rx="125" cy="506.284" cx="201.183" fill="#faf"/><ellipse ry="58" rx="125" cy="506.284" cx="823.183" fill="#faf"/></svg>`;
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
     }
     .search-jumper-searchBar {
         overflow-wrap: break-word;
         background: #505050;
         border-radius: 20px;
         border: 1px solid #b3b3b3;
         display: inline-flex;
         pointer-events: all;
         margin-top: -20px;
         opacity: 0.3;
         vertical-align: top;
         transition:margin-top 0.25s ease, opacity 0.25s;
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
         margin-left: 20px;
     }
     .search-jumper-scroll.search-jumper-right>.search-jumper-searchBar:hover {
         margin-left: 0px;
     }
     .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar {
         margin-top: 0px;
     }
     .search-jumper-scroll.search-jumper-bottom>.search-jumper-searchBar:hover {
         margin-top: 0px;
     }
     .search-jumper-searchBar:hover {
         margin-top: 0;
         opacity: 0.9;
     }
     .search-jumper-left,
     .search-jumper-left .search-jumper-type,
     .search-jumper-left>.search-jumper-searchBar,
     .search-jumper-right,
     .search-jumper-right .search-jumper-type,
     .search-jumper-right>.search-jumper-searchBar {
         flex-direction: column;
         max-width: 42px;
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
         height: 38px;
     }
     .search-jumper-left>.search-jumper-searchBar {
         margin-top: 0;
         margin-left: -20px;
     }
     .search-jumper-right>.search-jumper-searchBar {
         margin-top: 0;
         margin-left: 0px;
         position: fixed;
     }
     .search-jumper-left>.search-jumper-searchBar:hover {
         margin-top: unset;
         margin-left: 0;
     }
     .search-jumper-right>.search-jumper-searchBar:hover {
         margin-top: unset;
         margin-left: -20px;
     }
     .search-jumper-bottom>.search-jumper-searchBar {
         position: relative;
         margin-top: 0px;
         transition: transform 0.25s;
         -webkit-transform:scale(.9);
         -moz-transform:scale(.9);
         transform:scale(.9);
     }
     .search-jumper-bottom>.search-jumper-searchBar:hover {
         margin-top: 0px;
         -webkit-transform:scale(1);
         -moz-transform:scale(1);
         transform:scale(1);
     }
     .search-jumper-btn {
         position: relative;
         display: grid;
         padding: 1px;
         margin: 3px;
         cursor: pointer;
         transition:margin-left 0.25s ease, width 0.25s, height 0.25s, transform 0.25s;
         width: 32px;
         height: 32px;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         text-decoration:none;
         min-width: 32px;
         min-height: 32px;
     }
     .search-jumper-btn>i {
         line-height: 32px;
     }
     .search-jumper-logoBtnSvg {
         width: 32px;
         height: 32px;
         overflow: hidden;
         vertical-align: top;
         cursor: grab;
     }
     .search-jumper-type.search-jumper-needInPage,
     .search-jumper-type.search-jumper-targetImg {
         display: none;
     }
     .search-jumper-isInPage>.search-jumper-type.search-jumper-needInPage,
     .search-jumper-isTargetImg>.search-jumper-type.search-jumper-targetImg {
         display: inline-flex;
     }
     .search-jumper-type {
         display: inline-flex;
         background: #c5c5c5;
         border-radius: 20px;
         overflow: hidden;
         transition:width 0.25s ease, height 0.25s;
     }
     .search-jumper-searchBar.disable-pointer>.search-jumper-type {
         pointer-events: none;
     }
     .search-jumper-word {
         background: black;
         color: white;
         border-radius: 20px;
         font-size: 16px;
         line-height: 32px;
         width: 32px;
         height: 32px;
         min-width: 32px;
         min-height: 32px;
     }
     .search-jumper-type img {
         width: 32px;
         height: 32px;
     }
     .search-jumper-type.search-jumper-hide {
         background: unset;
     }
     .search-jumper-searchBar .search-jumper-btn:hover {
         -webkit-transform:scale(1.2);
         -moz-transform:scale(1.2);
         transform:scale(1.2);
         color: white;
         text-decoration:none;
     }`;

    var targetImgSrc, targetImgBaseSrc;

    //const configPage = 'http://localhost:3000/';
    const configPage = 'https://hoothin.github.io/SearchJumper/';

    const importPageReg = /^https:\/\/github\.com\/hoothin\/SearchJumper\/issues\/|^https:\/\/greasyfork\.org\/.*\/scripts\/445274[\-\/]/i;

    class SearchBar {
        constructor() {
            let styleEle = document.createElement("style");
            styleEle.innerHTML = createHTML(cssText);
            document.documentElement.appendChild(styleEle);

            let linkEle = document.createElement("link");
            linkEle.rel="stylesheet";
            linkEle.href = "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.1.1/css/all.min.css";
            document.documentElement.insertBefore(linkEle, document.documentElement.children[0]);


            logoBtn = document.createElement("span");
            logoBtn.innerHTML = createHTML(logoBtnSvg);
            logoBtn.className = "search-jumper-btn";

            let bar = document.createElement("span");
            bar.className = "search-jumper-searchBar";
            bar.appendChild(logoBtn);
            let touchHandler = e => {
                bar.removeEventListener('touchstart', touchHandler, true);
                bar.classList.add('disable-pointer');
                setTimeout(() => {
                    bar.classList.remove('disable-pointer');
                }, 250);
            };
            bar.addEventListener('touchstart', touchHandler, true);

            let searchBarCon = document.createElement("div");
            searchBarCon.id = "search-jumper";
            searchBarCon.className = "search-jumper-searchBarCon";
            searchBarCon.appendChild(bar);

            this.bar = bar;

            document.documentElement.appendChild(searchBarCon);

        }

        initRun() {
            this.fontPool = [];
            searchData.sitesConfig.forEach(siteConfig => {
                this.createType(siteConfig);
            });
            this.bar.style.display = "none";
            if (currentSite) {
                setTimeout(() => {
                    this.bar.style.display = "";
                }, 100);
                this.initPos(
                    searchData.prefConfig.position.x,
                    searchData.prefConfig.position.y,
                    searchData.prefConfig.offset.x,
                    searchData.prefConfig.offset.y
                );
            }
            this.waitForFontAwesome(() => {
                this.fontPool.forEach(font => {
                    font.innerText = '';
                    font.style.fontSize = '';
                });
            });

            if (searchData.prefConfig.autoClose) {
                var hideHandler = () => {
                    let openType = this.bar.querySelector('.search-jumper-type:not(.search-jumper-hide)>span');
                    if (openType) {
                        let mouseDownEvent = new PointerEvent("mousedown");
                        openType.dispatchEvent(mouseDownEvent);
                    }
                };
                var hideTimeout = setTimeout(hideHandler, 2000);
                this.bar.addEventListener('mouseenter', e => {
                    clearTimeout(hideTimeout);
                }, false);
                this.bar.addEventListener('mouseleave', e => {
                    hideTimeout = setTimeout(hideHandler, 2000);
                }, false);
            }
        }

        waitForFontAwesome(callback) {
            var retries = 25;
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
                if ( data[0] !== 255 && data[1] !== 255 && data[2] !== 255 ) {
                    if ( retries > 0 ) {
                        setTimeout( checkReady, 200 );
                    }
                } else {
                    if ( typeof callback === 'function' ) {
                        callback();
                    }
                }
            }

            checkReady();
        }

        createType(data) {
            let self = this;
            let type = data.type;
            let icon = data.icon;
            let inPage = data.selectTxt;
            let selectImg = data.selectImg;
            let sites = data.sites;
            let match = data.match;
            let openInNewTab = data.openInNewTab;
            if (match && new RegExp(match).test(location.href) == false) {
                return;
            }
            let ele = document.createElement("span");
            ele.className = "search-jumper-type search-jumper-hide";
            ele.title = type;
            let typeBtn = document.createElement("span");
            ele.appendChild(typeBtn);
            if (icon) {
                if (/^http/.test(icon)) {
                    let img = document.createElement("img");
                    img.src = icon;
                    img.className = "search-jumper-btn";
                    typeBtn.appendChild(img);
                } else {
                    let i = document.createElement("i");
                    i.className = "fa fa-" + icon;
                    i.innerText = type;
                    i.style.fontSize = '14px';
                    this.fontPool.push(i);
                    typeBtn.appendChild(i);
                    typeBtn.classList.add("search-jumper-word");
                    typeBtn.classList.add("search-jumper-btn");
                }
            } else {
                typeBtn.classList.add("search-jumper-word");
                typeBtn.classList.add("search-jumper-btn");
                let word = document.createElement("span");
                word.innerText = type;
                typeBtn.appendChild(word);
            }
            typeBtn.addEventListener('mousedown', e => {
                ele.style.width = "";
                ele.style.height = "";
                if (ele.classList.contains("search-jumper-hide")) {
                    ele.classList.remove("search-jumper-hide");
                    if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                        self.bar.parentNode.classList.contains("search-jumper-right")) {
                        ele.style.height = ele.dataset.width;
                    } else {
                        ele.style.width = ele.dataset.width;
                    }
                    setTimeout(() => {
                        ele.style.flexWrap = "wrap";
                    }, 250);
                    searchTypes.forEach(type => {
                        if (ele != type) {
                            type.classList.add("search-jumper-hide");
                            type.style.width = "38px";
                            type.style.height = "38px";
                            type.style.flexWrap = "";
                        }
                    });
                } else {
                    ele.classList.add("search-jumper-hide");
                    if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                        self.bar.parentNode.classList.contains("search-jumper-right")) {
                        ele.style.height = "38px";
                    } else {
                        ele.style.width = "38px";
                    }
                    ele.style.flexWrap = "";
                }
                setTimeout(() => {
                    let viewWidth = window.innerWidth || document.documentElement.clientWidth;
                    let viewHeight = window.innerHeight || document.documentElement.clientHeight;
                    if (self.bar.scrollWidth > viewWidth || self.bar.scrollHeight > viewHeight) {
                        if (!self.bar.parentNode.classList.contains("search-jumper-scroll")) {
                            self.bar.style.cssText = "";
                        }
                        self.bar.parentNode.classList.add("search-jumper-scroll");
                    } else {
                        if (self.bar.parentNode.classList.contains("search-jumper-scroll")) {
                            self.bar.style.cssText = "";
                        }
                        self.bar.parentNode.classList.remove("search-jumper-scroll");
                    }
                }, 250);
            }, false);
            let isCurrent = false;
            sites.forEach(site => {
                let siteEle = this.createSiteBtn(site.name, site.icon, site, openInNewTab);
                ele.appendChild(siteEle);
                if (!currentSite && (siteEle.dataset.current || match)) {
                    isCurrent = true;
                    currentSite = site;
                }
            });
            if (isCurrent) {
                self.bar.insertBefore(ele, self.bar.children[0]);
                ele.dataset.width = ele.scrollWidth + "px";
                ele.classList.remove("search-jumper-hide");
                ele.style.width = ele.dataset.width;
            } else {
                self.bar.insertBefore(ele, self.bar.children[self.bar.children.length - 1]);
                ele.dataset.width = ele.scrollWidth + "px";
                ele.style.width = "38px";
            }
            if (inPage) {
                ele.classList.add("search-jumper-needInPage");
            }
            if (selectImg) {
                ele.classList.add("search-jumper-targetImg");
            }
            searchTypes.push(ele);
            return ele;
        }

        /**
        * s 搜索关键词
        * e 编码
        * c 客户端 pc,mobile
        * u 当前网站 url
        * h 当前网站 host
        *
        * name 站点名
        * icon 站点icon
        * url 站点地址
        * keywords 站点关键词提取
        * match 匹配当前站点
        * charset 站点编码
        */
        createSiteBtn(name, icon, data, openInNewTab) {
            let ele = document.createElement("a");
            ele.className = "search-jumper-btn";
            ele.title = name;
            ele.classList.add("search-jumper-word");
            let word = document.createElement("span");
            word.innerText = name;
            ele.appendChild(word);
            let img = document.createElement("img");
            img.style.opacity = 0;
            ele.appendChild(img);
            img.onload = e => {
                ele.classList.remove("search-jumper-word");
                ele.removeChild(word);
                img.style.opacity = 1;
            };
            if (icon == 0) {
            } else if (icon) {
                img.src = icon;
            } else {
                img.src = data.url.replace(/(https?:\/\/[^\/]*\/).*$/, "$1favicon.ico");
            }
            let urlReg = data.url.replace(/^https?/, "").replace(/\?.*/, "\\?").replace(/\./g, "\\.").replace(/%[secu]/g, ".*");
            if (data.match) {
                if (new RegExp(data.match).test(location.href)) {
                    ele.dataset.current = true;
                }
            } else if (new RegExp(urlReg).test(location.href)) {
                ele.dataset.current = true;
            }
            if (openInNewTab || searchData.prefConfig.openInNewTab) {
                ele.setAttribute("target", "_blank");
            }
            if (!ele.dataset.url) {
                ele.dataset.url = data.url.replace('%e', document.charset).replace('%c', (isMobile?"mobile":"pc")).replace('%u', location.href).replace('%h', location.host);
            }
            if (data.charset) {
                ele.href = data.url;
                ele.onclick = e => {
                    let keywords = getKeywords();
                    let url = ele.dataset.url.replace('%t', targetImgSrc).replace('%b', targetImgBaseSrc).replace('%s', keywords);
                    this.encodeToSubmit(data.charset, url, ele.getAttribute("target") || '_self');
                    return false;
                };
            } else {
                ele.addEventListener('mousedown', e => {
                    let keywords = getKeywords();
                    ele.href = ele.dataset.url.replace('%t', targetImgSrc).replace('%b', targetImgBaseSrc).replace('%s', keywords);
                }, false);
            }
            return ele;
        }

        encodeToSubmit(charset, url, target) {
            const formId ="searchJumper_form";
            var form = document.getElementById(formId);
            if (!form) {
                form = document.createElement("form");
                form.id = formId;
                form.method = 'get';
                form.style.display = "none";
                document.documentElement.appendChild(form);
            }
            form.innerHTML = createHTML('');
            form.target = target;
            form.acceptCharset = charset;
            form.action = url;
            var params = new URLSearchParams(new URL(url).search);
            params.forEach((v, k) => {
                let input = document.createElement("input");
                input.name = k;
                input.value = v;
                form.appendChild(input);
            });
            return form.submit();
        }

        showInPage(selectImg) {
            if (this.bar.style.display == "none") {
                this.bar.style.display = "";
                this.initPos(
                    searchData.prefConfig.position.x,
                    searchData.prefConfig.position.y,
                    searchData.prefConfig.offset.x,
                    searchData.prefConfig.offset.y
                );
            }
            let mouseDownEvent = new PointerEvent("mousedown");
            let firstType;
            if (selectImg) {
                this.bar.classList.add("search-jumper-isTargetImg");
                firstType = this.bar.querySelector('.search-jumper-targetImg>span');
            } else {
                this.bar.classList.add("search-jumper-isInPage");
                firstType = this.bar.querySelector('.search-jumper-needInPage>span');
            }
            if (firstType && firstType.parentNode.classList.contains('search-jumper-hide')) firstType.dispatchEvent(mouseDownEvent);
        }

        initPos(relX, relY, posX, posY) {
            let self = this;
            let setClass = className => {
                self.bar.style.cssText = "";
                self.bar.parentNode.className = "search-jumper-searchBarCon " + className;
                searchTypes.forEach(ele => {
                    ele.style.width = "";
                    ele.style.height = "";
                    if (ele.classList.contains("search-jumper-hide")) {
                        if (self.bar.parentNode.classList.contains("search-jumper-left") ||
                            self.bar.parentNode.classList.contains("search-jumper-right")) {
                            ele.style.height = "38px";
                        } else {
                            ele.style.width = "38px";
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
            if (posX < 0) {
                posX = 0;
            } else if (posX > viewWidth - self.bar.scrollWidth) {
                posX = viewWidth - self.bar.scrollWidth;
            }
            if (posY < 0) {
                posY = 0;
            } else if (posY > viewHeight - self.bar.scrollHeight) {
                posY = viewHeight - self.bar.scrollHeight;
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
            if (self.bar.scrollWidth > viewWidth || self.bar.scrollHeight > viewHeight) {
                self.bar.parentNode.classList.add("search-jumper-scroll");
            } else {
                self.bar.parentNode.classList.remove("search-jumper-scroll");
            }
            searchData.prefConfig.position.x = relX;
            searchData.prefConfig.position.y = relY;
            searchData.prefConfig.offset.x = posX;
            searchData.prefConfig.offset.y = posY;
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
        if (!currentSite) return '';
        if (cacheKeywords) return cacheKeywords;
        let keywordsMatch, keywords = '';
        if (currentSite.keywords) {
            keywordsMatch = location.href.match(new RegExp(currentSite.keywords));
            if (keywordsMatch) {
                keywords = keywordsMatch[1];
            }
        } else if (currentSite.url.indexOf("%s") != -1) {
            if (location.href.indexOf("?") != -1) {
                keywordsMatch = currentSite.url.match(/[\?&]([^&]*?)=%s.*/);
                if (keywordsMatch) {
                    keywords = new URLSearchParams(location.search).get(keywordsMatch[1]);
                }
            } else {
                keywordsMatch = currentSite.url.match(/(.*)%s/);
                if (keywordsMatch) {
                    keywordsMatch = location.href.match(new RegExp(keywordsMatch[1] + "(.*?)(\/|$)"));
                    if (keywordsMatch) {
                        keywords = keywordsMatch[1];
                    }
                }
            }
        }
        cacheKeywords = keywords;
        return keywords;
    }

    function initListener() {
        _GM_registerMenuCommand(i18n('settings'), () => {
            _GM_openInTab(configPage)
        });
        let logoSvg = logoBtn.children[0];
        let inGrab = false;
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
            document.removeEventListener('mouseup', mouseUpHandler, false);
            document.removeEventListener('mousemove', mouseMoveHandler, false);
            document.removeEventListener('touchend', mouseUpHandler, false);
            document.removeEventListener('touchmove', mouseMoveHandler, false);
            if (!inGrab) {
                _GM_openInTab(configPage);
                return;
            }
            inGrab = false;
            let viewWidth = window.innerWidth || document.documentElement.clientWidth;
            let viewHeight = window.innerHeight || document.documentElement.clientHeight;
            let baseWidth = viewWidth / 3;
            let baseHeight = viewHeight / 3;
            let relX, relY, posX, posY;
            if (clientX(e) < baseWidth) {
                relX = "left";
                posX = parseInt(searchBar.bar.style.left) > 0?parseInt(searchBar.bar.style.left):"0";
            } else if (clientX(e) < baseWidth * 2) {
                relX = "center";
                posX = parseInt(searchBar.bar.style.left) - viewWidth / 2;
            } else {
                relX = "right";
                posX = viewWidth - parseInt(searchBar.bar.style.left) - searchBar.bar.scrollWidth;
            }
            if (clientY(e) < viewHeight / 2) {
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
            searchBar.bar.style.pointerEvents = "";
            searchBar.initPos(relX, relY, posX, posY);
            storage.setItem("searchData", searchData);
        };
        let mouseMoveHandler = e => {
            if (!inGrab) {
                logoSvg.style.cursor = "grabbing";
                searchBar.bar.style.position = "fixed";
                searchBar.bar.style.marginLeft = "";
                searchBar.bar.style.marginTop = "";
                searchBar.bar.style.right = "";
                searchBar.bar.style.bottom = "";
                searchBar.bar.style.left = clientX(e) - searchBar.bar.scrollWidth + 20 + "px";
                searchBar.bar.style.top = clientY(e) - searchBar.bar.scrollHeight + 40 + "px";
                searchBar.bar.parentNode.classList.remove("search-jumper-scroll");
                setTimeout(() => {searchBar.bar.style.pointerEvents = "none"}, 100);
            }
            inGrab = true;
            searchBar.bar.style.left = clientX(e) - searchBar.bar.scrollWidth + 20 + "px";
            searchBar.bar.style.top = clientY(e) - searchBar.bar.scrollHeight + 40 + "px";
        };
        logoBtn.addEventListener('mousedown', e => {
            setTimeout(() => {
                document.addEventListener('mouseup', mouseUpHandler, false);
                document.addEventListener('mousemove', mouseMoveHandler, false);
            }, 1);
        }, false);
        logoBtn.addEventListener('touchstart', e => {
            setTimeout(() => {
                document.addEventListener('touchend', mouseUpHandler, false);
                document.addEventListener('touchmove', mouseMoveHandler, false);
            }, 1);
        }, false);

        if (searchData.prefConfig.enableInPage) {
            let shown = false;
            document.addEventListener('mousedown', e => {
                shown = false;
                if ((!getSelectStr() && e.target.tagName != 'IMG') ||
                    searchData.prefConfig.altKey && !e.altKey ||
                    searchData.prefConfig.ctrlKey && !e.ctrlKey ||
                    searchData.prefConfig.shiftKey && !e.shiftKey ||
                    searchData.prefConfig.metaKey && !e.metaKey) {
                    return;
                }
                if (e.target.tagName === 'IMG' &&
                    e.target.parentNode.className === 'search-jumper-btn') return;
                let selectImg = e.target.tagName === 'IMG';
                if (selectImg) {
                    targetImgSrc = e.target.src;
                    targetImgBaseSrc = targetImgSrc.replace(/https?:\/\//i,"");
                }
                let showToolbarTimer = setTimeout(() => {
                    searchBar.showInPage(selectImg);
                    e.stopPropagation();
                    e.preventDefault();
                    shown = true;
                }, 500);
                let mouseUpHandler = e => {
                    if (shown) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    clearTimeout(showToolbarTimer);
                    document.removeEventListener('mouseup', mouseUpHandler, false);
                };
                document.addEventListener('mouseup', mouseUpHandler, false);
            }, false);
            document.oncontextmenu = function (event) {
                if (shown) event.preventDefault();
            };
        }
    }

    function initConfig() {
        if (location.href === configPage) {
            _unsafeWindow.searchData = searchData;
            document.addEventListener('saveConfig', e => {
                searchData = _unsafeWindow.searchData;
                storage.setItem("searchData", searchData);
                if (e.notification) {
                    _GM_notification('Configuration imported successfully!');
                }
            });
            document.addEventListener('copyConfig', e => {
                _GM_setClipboard(JSON.stringify(_unsafeWindow.searchData, null, 2));
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
        if (_searchData) {
            searchData = _searchData;
        }
    }

    async function init() {
        await initData();
        initView();
        initRun();
        initConfig();
    }

    init();
})();