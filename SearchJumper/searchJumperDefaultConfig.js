let lang = navigator.appName === "Netscape" ? navigator.language : navigator.userLanguage;
let sitesConfig = {};
switch (lang) {
    case "zh-CN":
    case "zh-SG":
        sitesConfig = [
            {
                "type": "百科",
                "icon": "book-open-reader",
                "sites": [
                    {
                        "name": "维基",
                        "url": "https://zh.wikipedia.org/wiki/%s",
                        "description": "The largest and most-read reference work in history.#wiki"
                    },
                    {
                        "name": "百度百科",
                        "url": "https://baike.baidu.com/search/word?pic=1&sug=1&word=%s",
                        "description": "A semi-regulated Chinese-language collaborative online encyclopedia owned by the Chinese technology company Baidu.#wiki",
                        "match": "baike\\.baidu\\.com/search/"
                    },
                    {
                        "name": "百度文库",
                        "url": "https://wenku.baidu.com/search?word=%s&ie=utf-8"
                    },
                    {
                        "name": "豆丁文档",
                        "url": "https://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s"
                    },
                    {
                        "name": "爱问知识",
                        "url": "https://iask.sina.com.cn/search?searchWord=%s"
                    },
                    {
                        "name": "萌娘百科",
                        "url": "https://zh.moegirl.org.cn/Special:?search=%s",
                        "icon": "https://zh.moegirl.org.cn/favicon.ico",
                        "description": "以ACGN相关文化为主题的在线百科全书。最初名为“绿坝娘wiki”，后来改名为“中华萌娘小百科”，2011年5月1日简化为“萌娘百科”。#wiki"
                    },
                    {
                        "name": "果壳",
                        "url": "https://www.guokr.com/search/all/?wd=%s"
                    },
                    {
                        "name": "Quora",
                        "url": "https://www.quora.com/search?q=%s"
                    },
                    {
                        "name": "Metacritic",
                        "url": "https://www.metacritic.com/search/%s/"
                    },
                    {
                        "name": "豆瓣",
                        "url": "https://www.douban.com/search?source=suggest&q=%s.replace(/\\./g,\" \")"
                    },
                    {
                        "name": "Bangumi 番组计划",
                        "url": "https://bgm.tv/subject_search%p{cat=all&search_text=%s}",
                        "icon": "https://bgm.tv/img/favicon.ico"
                    }
                ]
            },
            {
                "type": "社交",
                "icon": "users",
                "sites": [
                    {
                        "name": "知乎",
                        "url": "https://www.zhihu.com/search?q=%s&type=content"
                    },
                    {
                        "name": "V2ex",
                        "url": "https://www.sov2ex.com/?q=%s",
                        "icon": "https://sov2ex.oss-cn-shanghai.aliyuncs.com/assets/favicon/apple-icon-57x57.png"
                    },
                    {
                        "name": "推特",
                        "url": "https://twitter.com/search?q=%s"
                    },
                    {
                        "name": "百度贴吧",
                        "url": "https://tieba.baidu.com/f/search/res?ie=utf-8&qw=%s",
                        "keywords": "kw|qw",
                        "match": "^https?://tieba\\.baidu\\.com/f"
                    },
                    {
                        "name": "新浪微博",
                        "url": "https://s.weibo.com/weibo?q=%s"
                    },
                    {
                        "name": "脸书",
                        "url": "https://www.facebook.com/search/results.php?q=%s"
                    },
                    {
                        "name": "微信搜索",
                        "url": "https://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s"
                    }
                ]
            },
            {
                "type": "图片",
                "icon": "image",
                "sites": [
                    {
                        "name": "百度图片",
                        "url": "https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s"
                    },
                    {
                        "name": "谷歌图片",
                        "url": "https://www.google.com/search?q=%s&tbm=isch",
                        "match": "www\\.google\\..*tbm=isch"
                    },
                    {
                        "name": "图片聚合搜索",
                        "url": "https://www.google.com/search?tbm=isch&as_q=%s%20(site:www.pexels.com%20OR%20site:pixabay.com%20OR%20site:unsplash.com%20OR%20site:stocksnap.io%20OR%20site:pxhere.com%20OR%20site:www.hippopx.com%20OR%20site:foter.com%20OR%20site:freepik.com%20OR%20site:colorhub.me)"
                    },
                    {
                        "name": "必应图片",
                        "url": "https://www.bing.com/images/search?q=%s"
                    },
                    {
                        "name": "搜狗图片",
                        "url": "https://pic.sogou.com/pics?query=%s"
                    },
                    {
                        "name": "花瓣",
                        "url": "https://huaban.com/search?q=%s"
                    },
                    {
                        "name": "Pinterest",
                        "url": "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
                    },
                    {
                        "name": "yandex",
                        "url": "https://yandex.com/images/search?text=%s"
                    },
                    {
                        "name": "pixabay",
                        "url": "https://pixabay.com/images/search/%s/",
                        "icon": "https://pixabay.com/favicon-32x32.png"
                    },
                    {
                        "name": "unsplash",
                        "url": "https://unsplash.com/s/photos/%s"
                    },
                    {
                        "name": "500px",
                        "url": "https://500px.com/search?q=%s"
                    },
                    {
                        "name": "Deviantart",
                        "url": "https://www.deviantart.com/browse/all/?q=%s"
                    },
                    {
                        "name": "Wallhaven",
                        "url": "https://wallhaven.cc/search?q=%s"
                    },
                    {
                        "name": "Pixabay",
                        "url": "https://pixabay.com/zh/images/search/?manual_search=1&q=%s&hp=&order=&cat=&min_width=&min_height=",
                        "icon": "https://pixabay.com/favicon-32x32.png"
                    },
                    {
                        "name": "Backiee",
                        "url": "https://backiee.com/search/%s",
                        "icon": "https://backiee.com/assets/favicon/favicon-32x32.png"
                    },
                    {
                        "name": "ChatGPT搜索GIF",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&[class*\\='ChatMessageInputContainer'] textarea=hey ChatGPT. hope you're having a great day. From now on you will respond to anything I say with the perfect gif response. Once you know what gif you want to use, compile the most accurate and perfect search phrase that will result in the specific gif you want to send. respond with url: \" Sure, I'm happy to help you!\\n http://scythe-spot-carpenter.glitch.me/search?search_term\\=<SEARCH+PHRASE>.gif \n%s&click(button[class*\\='ChatMessageSendButton_sendButton'])}",
                        "openInNewTab": true
                    }
                ]
            },
            {
                "type": "搜索",
                "icon": "search",
                "description": "搜索引擎主分类",
                "sites": [
                    {
                        "name": "百度",
                        "url": "https://www.baidu.com/s?wd=%s&ie=utf-8",
                        "keywords": "(?:wd|word)=(.*?)(&|$)",
                        "match": "https?://(www|m)\\.baidu\\.com/.*(wd|word)=",
                        "shortcut": "KeyB",
                        "alt": true
                    },
                    {
                        "name": "百度高级搜索",
                        "url": "https://www.baidu.com/s?wd=%s%input{请输入限制文件类型, filetype:doc/ filetype:ppt/ filetype:xls/ filetype:pdf}%input{请输入限制日期/过去一小时/过去一天/过去一周/过去一个月/过去一年,&gpc=stf%3D%date{/1000-3600}%2C%date{/1000}%7Cstftype%3D1/&gpc=stf%3D%date{/1000-86400}%2C%date{/1000}%7Cstftype%3D1/&gpc=stf%3D%date{/1000-604800}%2C%date{/1000}%7Cstftype%3D1/&gpc=stf%3D%date{/1000-2592000}%2C%date{/1000}%7Cstftype%3D1/&gpc=stf%3D%date{/1000-31536000}%2C%date{/1000}%7Cstftype%3D1}",
                        "match": "https://www\\.baidu\\.com/(s|baidu)",
                        "nobatch": true,
                        "hideNotMatch": true,
                        "openInNewTab": false
                    },
                    {
                        "name": "SearX",
                        "url": "https://searx.work/search?q=%s",
                        "icon": "https://searx.work/static/themes/simple/img/favicon.png",
                        "match": "0"
                    },
                    {
                        "name": "头条搜索",
                        "url": "https://so.toutiao.com/search/?dvpf=%c&keyword=%s"
                    },
                    {
                        "name": "必应",
                        "url": "https://www.bing.com/search?q=%s",
                        "match": "^https://(www|cn|global)\\.bing\\.com/search"
                    },
                    {
                        "name": "360",
                        "url": "https://www.so.com/s?ie=utf-8&q=%s",
                        "match": "(www|m)\\.so\\.com/s\\?.*[&\\?]q="
                    },
                    {
                        "name": "搜狗",
                        "url": "https://www.sogou.com/web?query=%s",
                        "keywords": "(?:query|keyword)=(.*?)(&|$)",
                        "match": "(www|wap|m)\\.sogou\\.com/(web|web/searchList\\.jsp).*(query|keyword)="
                    },
                    {
                        "name": "F搜",
                        "url": "https://fsoufsou.com/search?q=%s",
                        "nobatch": true
                    },
                    {
                        "name": "中国搜索",
                        "url": "https://www.chinaso.com/newssearch/all/allResults?q=%s",
                        "nobatch": true
                    }
                ]
            },
            {
                "type": "开发",
                "icon": "code",
                "sites": [
                    {
                        "name": "MDN",
                        "url": "https://developer.mozilla.org/zh-CN/search?q=%s"
                    },
                    {
                        "name": "stackoverflow",
                        "url": "https://stackoverflow.com/search?q=%s"
                    },
                    {
                        "name": "掘金",
                        "url": "https://juejin.im/search?query=%s&type=all"
                    },
                    {
                        "name": "Can I Use",
                        "url": "https://caniuse.com/#search=%s",
                        "icon": "https://caniuse.com/img/favicon-128.png"
                    },
                    {
                        "name": "GitHub",
                        "url": "https://github.com/search?q=%s",
                        "match": "https://github\\.com/search.*[&\\?]q="
                    },
                    {
                        "name": "w3c",
                        "url": "https://www.runoob.com/?s=%s"
                    },
                    {
                        "name": "GreasyFork",
                        "url": "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓",
                        "icon": "https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png"
                    },
                    {
                        "name": "Unicode字符大全",
                        "url": "https://unicode-table.com/cn/search/?q=%s"
                    },
                    {
                        "name": "npm",
                        "url": "https://www.npmjs.org/search?q=%s",
                        "icon": "https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png"
                    },
                    {
                        "name": "AI生成正则",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&textarea[class^\\='ChatMessageInput']=Can you help me to write a RegExp which can detect %input{Target,Email address/Phone number} on `%s`&click([class^\\='ChatMessageInputView_sendButton']>button)}",
                        "openInNewTab": true
                    }
                ]
            },
            {
                "type": "词典",
                "icon": "language",
                "sites": [
                    {
                        "name": "百度翻译",
                        "url": "https://fanyi.baidu.com/#auto/zh/%s"
                    },
                    {
                        "name": "DeepL",
                        "url": "https://www.deepl.com/translator#zh/en/%s",
                        "icon": "https://www.deepl.com/img/favicon/favicon_96.png"
                    },
                    {
                        "name": "谷歌翻译",
                        "url": "https://translate.google.com/?text=%s",
                        "match": "translate\\.google\\.com.*\\btext="
                    },
                    {
                        "name": "有道词典",
                        "url": "https://dict.youdao.com/search?q=%s",
                        "icon": "https://shared.ydstatic.com/images/favicon.ico"
                    },
                    {
                        "name": "必应翻译",
                        "url": "https://cn.bing.com/dict/search?q=%s"
                    },
                    {
                        "name": "Forvo发音",
                        "url": "https://zh.forvo.com/search/%s"
                    },
                    {
                        "name": "CNKI翻译",
                        "url": "https://dict.cnki.net/index#p{[name\\='translateArea']=%s&click(.hanlder-left-right>button)}"
                    },
                    {
                        "name": "汉典",
                        "url": "https://www.zdic.net/hans/%s"
                    },
                    {
                        "name": "海词",
                        "url": "https://dict.cn/%s"
                    },
                    {
                        "name": "金山词霸",
                        "url": "https://www.iciba.com/word?w=%s",
                        "icon": "https://cdn.iciba.com/www/img/www/favicon.ico"
                    },
                    {
                        "name": "词源词根词典",
                        "url": "https://www.etymonline.com/index.php?term=%s"
                    },
                    {
                        "name": "沪江",
                        "url": "https://dict.hjenglish.com/w/%s"
                    },
                    {
                        "name": "Urban Dictionary",
                        "url": "https://www.urbandictionary.com/search.php%p{term=%s}"
                    },
                    {
                        "name": "POE",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&[class*\\='ChatMessageInputContainer']>textarea=Please help me to translate \\`%s\\` to English, please return only translated content not include the origin text&click(button[class*\\='ChatMessageSendButton_sendButton'])}"
                    },
                    {
                        "name": "ChatGPT翻译",
                        "url": "https://pandapy.com/#p{textarea[data-id\\='root']=Please help me to translate \\`%s\\` to Chinese, please return only translated content not include the origin text&click(.send-btn)}"
                    },
                    {
                        "name": "Ludwig",
                        "url": "https://ludwig.guru/s/%s",
                        "icon": "https://ludwig.guru/icons/icon_192x192.png"
                    },
                    {
                        "name": "Linggle",
                        "url": "https://linggle.com/?q=%s"
                    }
                ]
            },
            {
                "type": "影视",
                "icon": "video",
                "sites": [
                    {
                        "name": "bilibili",
                        "url": "https://search.bilibili.com/all?keyword=%s"
                    },
                    {
                        "name": "腾讯视频",
                        "url": "https://v.qq.com/x/search/?q=%s"
                    },
                    {
                        "name": "爱奇艺",
                        "url": "https://so.iqiyi.com/so/q_%s",
                        "icon": "https://www.iqiyi.com/favicon.ico"
                    },
                    {
                        "name": "优酷",
                        "url": "https://so.youku.com/search_video/q_%s",
                        "icon": "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png"
                    },
                    {
                        "name": "AcFun",
                        "url": "https://www.acfun.cn/search?keyword=%s"
                    },
                    {
                        "name": "搜狐",
                        "url": "https://so.tv.sohu.com/mts?wd=%s"
                    },
                    {
                        "name": "樱花动漫",
                        "url": "https://www.yhdmz.org/list/?ex=1&kw=%s"
                    },
                    {
                        "name": "在线之家",
                        "url": "https://www.zxzj.org/vodsearch/-------------.html?wd=%s",
                        "icon": "https://zxzj.vip/statics/img/favicon.ico"
                    },
                    {
                        "name": "小苹果影院",
                        "url": "https://www.163kp.cc/index.php?m=vod-search&wd=%s&submit="
                    },
                    {
                        "name": "谍影网",
                        "url": "https://www.tvdie.cc/search.html%p{searchword=%s}",
                        "icon": "https://www.tvdie.cc/favicon.ico"
                    },
                    {
                        "name": "茶杯狐",
                        "url": "https://cupfox.app/s/%s",
                        "icon": "https://p0.meituan.net/dpgroup/cd088044f183d2719f3f9fe56d5c34204207.png"
                    },
                    {
                        "name": "HOHO TV",
                        "url": "https://www.hoho.tv/vod/search.html%p{wd=%s}",
                        "icon": "https://www.hoho.tv/img/left_logo.png"
                    },
                    {
                        "name": "西瓜视频",
                        "url": "https://www.ixigua.com/search/%s/",
                        "icon": "https://sf1-cdn-tos.douyinstatic.com/obj/eden-cn/lpqpflo/ixigua_favicon.ico"
                    },
                    {
                        "name": "量子资源网",
                        "url": "http://lzizy.net/index.php/vod/search.html?wd=%s"
                    },
                    {
                        "name": "蚂蚁4K",
                        "url": "https://www.mayi4k.com/vodsearch/-------------.html?wd=%s",
                        "icon": "https://www.mayi4k.com/upload/mxcms/20230718-1/4bdda0aaaa64c431daf6254f99a5cae1.png",
                        "description": " 4K蓝光原盘磁力链115网盘下载"
                    }
                ]
            },
            {
                "type": "新闻",
                "icon": "newspaper",
                "sites": [
                    {
                        "name": "百度新闻",
                        "url": "https://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
                        "icon": "https://www.baidu.com/favicon.ico"
                    },
                    {
                        "name": "网易-百度",
                        "url": "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com%20",
                        "icon": "https://news.163.com/favicon.ico",
                        "match": "site%3Anews\\.163\\.com"
                    },
                    {
                        "name": "腾讯新闻",
                        "url": "https://www.sogou.com/sogou?site=news.qq.com&query=%s",
                        "icon": "https://news.qq.com/favicon.ico"
                    },
                    {
                        "name": "凤凰新闻",
                        "url": "https://so.ifeng.com/?q=%s&c=1"
                    },
                    {
                        "name": "今日头条",
                        "url": "https://www.toutiao.com/search/?keyword=%s"
                    }
                ]
            },
            {
                "type": "划词搜索",
                "icon": "sitemap",
                "selectTxt": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "百度 ",
                        "url": "[\"百度\"]"
                    },
                    {
                        "name": "📄  复制",
                        "url": "c:%sr",
                        "nobatch": true
                    },
                    {
                        "name": "🔆 页内搜索",
                        "url": "find:%sr"
                    },
                    {
                        "name": "百度站内搜",
                        "url": "https://www.baidu.com/s?wd=%s%20site%3A%h&ie=utf-8"
                    },
                    {
                        "name": "文字转二维码",
                        "url": "https://hoothin.com/qrcode#%s",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "发送到手机",
                        "url": "https://s.hoothin.com/#p{wait(x-peer)&call(document.querySelector('x-peer').dispatchEvent(new Event('contextmenu')))&#textInput=%s&click(#textInput+div>button)}",
                        "icon": "https://s.hoothin.com/images/favicon-96x96.png",
                        "description": "自动发送选中文字到第一个匹配的设备"
                    },
                    {
                        "name": "问AI",
                        "url": "[\"Poe - Sage AI Chat\"]"
                    },
                    {
                        "name": "豆瓣评分",
                        "url": "showTips:https://www.douban.com/search?cat=1002&q=%s \n{name} \n<br/>\n<p style=\"margin: 5px;\">\n{h3>a}\n<span style=\"position: absolute; right: 10px; color: orange;\">{.rating_nums}</span>\n</p>\n<div style=\"display: flex; font-size: 20px; width: 500px;\">\n<img src=\"https://images.weserv.nl/?url={.pic>a>img|src}\"/>\n<div>\n<div>{.subject-cast}</div>\n<div style=\"font-size: 16px; margin-top: 10px; border-top: 1px solid;\">{.content>p}</div>\n</div>\n</div>",
                        "icon": "https://www.douban.com/favicon.ico"
                    },
                    {
                        "name": "Metacritic评分",
                        "url": "showTips:https://www.metacritic.com/autosearch%p{search_term=%s&image_size=98&search_each=false} \n<div style=\"display: flex; font-size: 25px;\">\n<img src=\"{json.autoComplete.results.0.imagePath}\"/>\n<div>\n<p>{json.autoComplete.results.0.name}</p>\n<div style=\"display: flex; justify-content: space-between; align-items: center;    border-top: 1px solid;\">\n<span style=\"margin: 0 10px;\">{json.autoComplete.results.0.refType}</span>\n<span style=\"margin: 0 10px;\">{json.autoComplete.results.0.itemDate}</span>\n<span style=\"color: orange;margin: 0 10px;\">{json.autoComplete.results.0.metaScore}</span>\n</div>\n</div>\n</div>",
                        "icon": "https://www.metacritic.com/favicon.ico"
                    },
                    {
                        "name": "展开所有引擎",
                        "url": "https://search.hoothin.com/all#%s"
                    },
                    {
                        "name": "磁力转种子-lolicon",
                        "url": "https://m2t.lolicon.app/#p{#magnet=%s}",
                        "kwFilter": "^magnet:",
                        "description": "磁力转种子",
                        "nobatch": true
                    },
                    {
                        "name": "Magnet-vip",
                        "url": "https://magnet-vip.com/#p{.form-group input=%s&click(.btn-outline-secondary)}",
                        "icon": "https://magnet-vip.com/favicon.png",
                        "kwFilter": "^magnet:",
                        "description": "磁力转种子",
                        "nobatch": true
                    },
                    {
                        "name": "📏英里转公里",
                        "url": "showTips:let s=\"%sr\".match(/(\\d+)(英里|英?哩|mi(le)?)/)[1];let km=(s*1.609344).toFixed(2);return `<i>${s} mi = ${km} km</i>`;",
                        "kwFilter": "\\d+\\s*(英里|英?哩|mi(le)?\\b)"
                    },
                    {
                        "name": "💲美元转人民币",
                        "url": "showTips:http://apilayer.net/api/convert?from=USD&to=CNY&amount=1&access_key=%template{apilayer key} \n{name}<br/><i>%s USD = {json.result|*%s.replace(/\\D/g,'')} RMB</i>",
                        "kwFilter": "\\d\\$|\\$\\d",
                        "nobatch": true
                    },
                    {
                        "name": "💞 AV预览",
                        "url": "showTips:https://www.javbus.com/%sr.replace(/^(\\w+?)[\\-_]?(\\d+)$/,\"$1-$2\") \n<span style='font-size:22px;line-height:1.2;'>{h3}</span>\n<p style=\"margin: 0; font-size: 18px; font-weight: normal;\">{.info>p:nth-child(2)}</p>\n<p style=\"margin: 0; font-size: 18px; font-weight: normal;\">{.info>p:nth-child(6)}</p>\n<p style=\"margin: 0;\">{.genre a|<mark style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">()</mark>}</p>\n<img src='https://www.javbus.com{a.bigImage>img|src}' referrerpolicy='no-referrer'/>",
                        "kwFilter": "^[0-9a-zA-Z]+[\\-_]?\\d+$",
                        "nobatch": true
                    },
                    {
                        "name": "📦 批量打开链接",
                        "url": "%s[all]",
                        "kwFilter": "^https?:"
                    },
                    {
                        "name": "🔗  打开文字链接",
                        "url": "%sr.replace(/(点|。)/g,\".\").replace(/[^ \\w\\-_\\.~!\\*';:@&=\\+\\$,\\/\\?#\\[\\]%]/g,\"\").replace(/.*([ :：]|^)(1[a-z0-9]{22,}).*?\\b([a-z0-9]{4}\\b|$).*/i,\"https://pan.baidu.com/s/$1?pwd=$2\").replace(/ /g,\"\").replace(/^/,\"http://\").replace(/^http:\\/\\/(https?:)/,\"$1\")",
                        "kwFilter": "\\w.*[\\.点。].*\\w|1[a-zA-Z0-9]{22,}",
                        "description": "支持类似“pan点baidu。com😄河蟹”以及“1bP23pzUpIV4CMuoMjOfxFA提取码:prt4”的分享链接",
                        "nobatch": true
                    },
                    {
                        "name": "汉语读音",
                        "url": "showTips:https://dict.baidu.com/s?wd=%s&ptype=zici\n<p style=\"margin: 3px\">{.means>div>dl>dt}</p>\n<span style=\"font-size: 18px; line-height: 25px; font-weight: normal; display: block; text-align: left;\">{.means>div>dl>dd}</span>",
                        "icon": "https://m.baidu.com/static/index/icon/w_icon2.png"
                    },
                    {
                        "name": "有道词典英译中",
                        "url": "showTips:https://dict.youdao.com/result?word=%s&lang=en\n{.phone_con}\n{.word-exp|<div style=\"font-size: 20px; line-height: initial; font-weight: normal;\">()</div>}",
                        "kwFilter": "^[a-zA-Z]+$"
                    },
                    {
                        "name": "↩️ 短链接还原",
                        "url": "showTips:%s\n{url}",
                        "kwFilter": "^https?://."
                    }
                ]
            },
            {
                "type": "以图搜图",
                "icon": "eye",
                "selectImg": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "谷歌以图搜图",
                        "url": "https://www.google.com/searchbyimage?sbisrc=cr_1_0_0&image_url=%T"
                    },
                    {
                        "name": "二维码解码",
                        "url": "https://hoothin.com/qrdecode#p{#fileInput=%i}",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "谷歌翻译图片",
                        "url": "https://translate.google.com/?op=images#p{input[accept^\\=\"image\"]=%i}"
                    },
                    {
                        "name": "WhatAnime",
                        "url": "https://trace.moe/?url=%T",
                        "icon": "https://trace.moe/favicon.png"
                    },
                    {
                        "name": "Lunapic",
                        "url": "https://www.lunapic.com/editor/index.php?action=url&url=%t",
                        "description": "使用 Lunapic 编辑图片",
                        "nobatch": true
                    },
                    {
                        "name": "Gif控制器-以图搜图",
                        "url": "[\"Gif控制器\"]"
                    },
                    {
                        "name": "Pixlr easy",
                        "url": "https://pixlr.com/x/#p{click(#home-open-url)&#image-url=%t&click(.dialog>.buttons>a.button.positive)}",
                        "description": "使用 Pixlr easy 编辑图片",
                        "nobatch": true
                    },
                    {
                        "name": "SauceNAO",
                        "url": "https://saucenao.com/search.php?db=999&url=%t"
                    },
                    {
                        "name": "IQDB",
                        "url": "https://iqdb.org/?url=%t"
                    },
                    {
                        "name": "Yandex以图搜图",
                        "url": "https://yandex.com/images/search?source=collections&rpt=imageview&url=%T"
                    },
                    {
                        "name": "3D IQDB",
                        "url": "https://3d.iqdb.org/?url=%t"
                    },
                    {
                        "name": "百度以图搜图",
                        "url": "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=%T"
                    },
                    {
                        "name": "必应以图搜图",
                        "url": "https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:%T"
                    },
                    {
                        "name": "TinEye",
                        "url": "https://www.tineye.com/search?url=%T"
                    },
                    {
                        "name": "搜狗以图搜图",
                        "url": "https://pic.sogou.com/ris?query=%T"
                    },
                    {
                        "name": "360以图搜图",
                        "url": "https://st.so.com/stu?imgurl=%t"
                    },
                    {
                        "name": "ImgOps",
                        "url": "https://imgops.com/%b"
                    },
                    {
                        "name": "Photopea",
                        "url": "https://www.photopea.com/#%7B%22files%22:%5B%22%t%22%5D,%22environment%22:%7B%7D%7D",
                        "nobatch": true
                    },
                    {
                        "name": "二维码生成-以图搜图",
                        "url": "[\"二维码生成\"]"
                    },
                    {
                        "name": "Google lens",
                        "url": "https://www.google.com/imghp#p{click([aria-label\\=\"Search by image\"])&[name\\=\"encoded_image\"]=%i}"
                    }
                ]
            },
            {
                "type": "APP",
                "icon": "archive",
                "sites": [
                    {
                        "name": "Play",
                        "url": "https://play.google.com/store/search?q=%s"
                    },
                    {
                        "name": "Coolapk",
                        "url": "https://www.baidu.com/s?wd=%s%20site%3Acoolapk.com",
                        "match": "coolapk\\.com"
                    },
                    {
                        "name": "Apkpure",
                        "url": "https://apkpure.com/cn/search?q=%s"
                    },
                    {
                        "name": "APKMirror",
                        "url": "https://www.apkmirror.com/?s=%s"
                    },
                    {
                        "name": "Chrome Store",
                        "url": "https://chrome.google.com/webstore/search/%s",
                        "icon": "https://www.google.com/images/icons/product/chrome_web_store-32.png"
                    },
                    {
                        "name": "牛麦子",
                        "url": "https://niumaizi.cn/?s=%s",
                        "icon": "http://niumaizi.cn/wp-content/uploads/2022/01/%E7%89%9B%E9%BA%A6%E5%AD%90-%E5%89%AF%E6%9C%AC.jpg"
                    },
                    {
                        "name": "MSDN, 我告诉你",
                        "url": "https://msdn.itellyou.cn/?keyword=%s"
                    },
                    {
                        "name": "腾讯软件中心",
                        "url": "https://pc.qq.com/?keyword=%s",
                        "icon": "https://pc1.gtimg.com/finance/softweb/fav/favicon_32x32.ico"
                    }
                ]
            },
            {
                "type": "音乐",
                "icon": "music",
                "sites": [
                    {
                        "name": "网易音乐",
                        "url": "https://music.163.com/#/search/m/?s=%s",
                        "icon": "https://s1.music.126.net/style/favicon.ico"
                    },
                    {
                        "name": "一听",
                        "url": "https://so.1ting.com/all.do?q=%s"
                    },
                    {
                        "name": "QQ音乐",
                        "url": "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
                    },
                    {
                        "name": "百度音乐",
                        "url": "https://music.91q.com/search?ie=utf-8&oe=utf-8&key=%s"
                    },
                    {
                        "name": "酷我音乐",
                        "url": "https://www.kuwo.cn/search/list?key=%s"
                    },
                    {
                        "name": "酷狗",
                        "url": "http://search.5sing.kugou.com/?keyword=%s",
                        "icon": "https://5sing.kugou.com/favicon.ico"
                    }
                ]
            },
            {
                "type": "购物",
                "icon": "shopping-cart",
                "sites": [
                    {
                        "name": "淘宝",
                        "url": "https://s.taobao.com/search?q=%s",
                        "icon": "https://www.taobao.com/favicon.ico"
                    },
                    {
                        "name": "京东",
                        "url": "https://search.jd.com/search?keyword=%s&enc=utf-8",
                        "icon": "https://www.jd.com/favicon.ico"
                    },
                    {
                        "name": "苏宁",
                        "url": "https://search.suning.com/%s/"
                    },
                    {
                        "name": "亚马逊",
                        "url": "https://www.amazon.cn/s/?field-keywords=%s",
                        "icon": "https://www.amazon.cn/favicon.ico"
                    },
                    {
                        "name": "天猫",
                        "url": "https://list.tmall.com/search_product.htm?q=%s"
                    },
                    {
                        "name": "值得买",
                        "url": "https://search.smzdm.com/?c=home&s=%s"
                    },
                    {
                        "name": "当当网",
                        "url": "https://search.dangdang.com/?key=%s"
                    },
                    {
                        "name": "1688",
                        "url": "https://s.1688.com/selloffer/offer_search.htm?keywords=%s",
                        "charset": "gbk"
                    },
                    {
                        "name": "慢慢买",
                        "url": "https://ss.manmanbuy.com/Default.aspx?key=%s",
                        "charset": "GBK"
                    }
                ]
            },
            {
                "type": "电子书",
                "icon": "book",
                "description": "电子书下载",
                "sites": [
                    {
                        "name": "读书小站 – 悦读不孤读",
                        "url": "https://ibooks.org.cn/?s=%s",
                        "icon": "https://ibooks.org.cn/wp-content/uploads/2021/07/1625331935-%E8%B5%84%E6%BA%90-1.png"
                    },
                    {
                        "name": "SoBooks",
                        "url": "https://sobooks.net/search/%s"
                    },
                    {
                        "name": "知轩藏书",
                        "url": "http://zxcs.me/index.php?keyword=%s",
                        "description": "藏尽网络中最好的精校小说"
                    },
                    {
                        "name": "Mox.moe",
                        "url": "https://mox.moe/list.php?s=%s",
                        "icon": "https://mox.moe/img/mox-logo-256.png",
                        "description": " [Kindle漫畫|Kobo漫畫|epub漫畫]"
                    },
                    {
                        "name": "书享家",
                        "url": "http://www.shuxiangjia.cn/search.php?q=%s"
                    },
                    {
                        "name": "Anna’s Archive",
                        "url": "https://annas-archive.org/search?q=%s",
                        "icon": "https://annas-archive.org/favicon-32x32.png",
                        "match": "annas\\-archive\\.org/search"
                    },
                    {
                        "name": "无名图书",
                        "url": "https://www.book123.info/list?key=%s"
                    },
                    {
                        "name": "Hallowlib",
                        "url": "https://bk.hallowlib.org/#p{#searchText input=%s&click(#sBtn)}"
                    },
                    {
                        "name": "Freembook",
                        "url": "https://freembook.com/#p{#search-input=%s&click([aria-label=search])}"
                    },
                    {
                        "name": "知搜",
                        "url": "https://zhiso.top/search/?q=%s",
                        "icon": "https://zhiso.top/static/image/favicon.ico"
                    },
                    {
                        "name": "苦瓜书盘",
                        "url": "https://kgbook.com/e/search/index.php%p{keyboard=%s&show=title,booksay,bookwriter&tbname=download&tempid=1}"
                    }
                ]
            },
            {
                "type": "阅读",
                "icon": "book-open",
                "sites": [
                    {
                        "name": "BookLink.Me",
                        "url": "https://booklink.me/after_search.php%p{name=%s}"
                    },
                    {
                        "name": "起点中文网",
                        "url": "https://www.qidian.com/soushu/%s.html",
                        "icon": "https://qidian.gtimg.com/qd/favicon/qd_icon.ico"
                    },
                    {
                        "name": "创世中文",
                        "url": "https://chuangshi.qq.com/search/searchindex?type=all&wd=%s",
                        "icon": "https://img1.chuangshi.qq.com/chuangshi/p1/ico/c_mini_logo.ico"
                    },
                    {
                        "name": "纵横中文网",
                        "url": "http://search.zongheng.com/s?keyword=%s"
                    },
                    {
                        "name": "笔趣阁",
                        "url": "https://www.xbiquge.so/modules/article/search.php?searchkey=%s",
                        "charset": "GBK"
                    },
                    {
                        "name": "微信读书",
                        "url": "https://weread.qq.com/#p{click(.navBar_home_inputText)&.search_input_text=%s&click(.search_input_right)}"
                    },
                    {
                        "name": "轻小说文库",
                        "url": "https://www.wenku8.net/so.php%p{searchtype=articlename&searchkey=%s&charset=gbk}",
                        "charset": "GBK"
                    },
                    {
                        "name": "轻之国度",
                        "url": "https://www.lightnovel.us/cn/search?keywords=%s"
                    },
                    {
                        "name": "哔哩轻小说",
                        "url": "https://www.linovelib.com/S6/%p{searchkey=%s&searchtype=all}",
                        "description": "日本动漫轻小说在线阅读"
                    },
                    {
                        "name": "魔笔小说",
                        "url": "https://www.mobinovels.com/?s=%s",
                        "description": "轻小说 资源收集"
                    },
                    {
                        "name": "Z-Library",
                        "url": "https://zh.usa1lib.org/s/?q=%s"
                    },
                    {
                        "name": "小说搜搜",
                        "url": "https://www.xssousou.com/s/?wd=%s"
                    }
                ]
            },
            {
                "type": "学术",
                "icon": "graduation-cap",
                "sites": [
                    {
                        "name": "谷歌学术",
                        "url": "https://scholar.google.com/scholar?hl=zh-CN&q=%s"
                    },
                    {
                        "name": "百度学术",
                        "url": "https://xueshu.baidu.com/s?wd=%s"
                    },
                    {
                        "name": "中文维基",
                        "url": "https://zh.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch"
                    },
                    {
                        "name": "英文维基",
                        "url": "https://en.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch"
                    },
                    {
                        "name": "日本维基",
                        "url": "https://ja.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch"
                    },
                    {
                        "name": "Google Book",
                        "url": "https://www.google.com/search?q=%s&btnG=搜索图书&tbm=bks&tbo=1&hl=zh-CN&gws_rd=ssl"
                    },
                    {
                        "name": "中国知网",
                        "url": "https://kns.cnki.net/KNS8/DefaultResult/Index?dbcode=CFLS&kw=%s"
                    },
                    {
                        "name": "爱学术",
                        "url": "https://www.ixueshu.com/search/index.html?search_type=&q=%s",
                        "icon": "https://www.ixueshu.com/static/favicon.ico"
                    },
                    {
                        "name": "维普",
                        "url": "http://lib.cqvip.com/Qikan/Search/Index?from=Qikan_Search_Index/%p{isNoteHistory=1&isLog=1&indexIdentifier=U&indexKey=%s}"
                    },
                    {
                        "name": "krugle",
                        "url": "http://opensearch.krugle.org/document/search/#query=%s",
                        "icon": "https://opensearch.krugle.org/media/images/favicon.ico"
                    },
                    {
                        "name": "读秀知识",
                        "url": "http://qw.duxiu.com/getPage?sw=%s&ecode=utf-8",
                        "icon": "https://mycroftproject.com/updateos.php/id0/duxiu.ico"
                    },
                    {
                        "name": "读秀书籍",
                        "url": "http://book.duxiu.com/search?Field=all&channel=search&sw=%s&ecode=utf-8&edtype=&searchtype=1&view=0",
                        "icon": "https://mycroftproject.com/updateos.php/id0/duxiu.ico"
                    },
                    {
                        "name": "罗马图书馆",
                        "url": "https://www.bibliotechediroma.it/opac/query/%s?context=catalogo",
                        "icon": "https://www.bibliotechediroma.it/sebina/repository/sebinayou/temi/biblioteche_roma/img/favicon.png"
                    },
                    {
                        "name": "籍合网",
                        "url": "http://www.ancientbooks.cn/publishfulltextsearch?keyWord=%s",
                        "icon": "http://www.ancientbooks.cn/images/favicon.ico"
                    },
                    {
                        "name": "深圳文献港",
                        "url": "http://m.szwxg.5read.com/search/goSearch.jspx%p{tag=qw&sw=%s}"
                    },
                    {
                        "name": "高级检索",
                        "url": "http://publish.ancientbooks.cn/docShuju/platformAdvanceSearchResult.jspx?libId=5%p{modelId=2&order=0&aa=&libId=5&column1=title&text1=%s&relation2=and&column2=txt&text2=&relation3=and&column3=book_title&text3=&relation4=and&column4=book_author&text4=&relation5=and&column5=book_author_arranger&text5=&relation6=and&column6=book_publisher&text6=&synonyms=on&properNouns=on&punc=on}"
                    },
                    {
                        "name": "库问搜索",
                        "url": "http://www.koovin.com/?q=%s",
                        "description": "免费开源文献资源共享平台"
                    },
                    {
                        "name": "掌桥科研",
                        "url": "https://www.zhangqiaokeyan.com/search.html?sertext=%s"
                    },
                    {
                        "name": "PubMed",
                        "url": "https://pubmed.ncbi.nlm.nih.gov/?term=%s",
                        "icon": "https://cdn.ncbi.nlm.nih.gov/coreutils/nwds/img/favicons/favicon.ico"
                    },
                    {
                        "name": "文津搜索",
                        "url": "http://find.nlc.cn/search/doSearch?query=%s&secQuery=&actualQuery=%s"
                    },
                    {
                        "name": "SCI影响因子",
                        "url": "https://www.letpub.com.cn/index.php?page=journalapp%p{addcomment_s1_comments=&addcomment_s2_comments=&searchname=%s&addcomment_month=&addcomment_sorttype=&journalidcommentscenter=&journalnamecommentscenter=&addcomment_contributionflaghidden=}",
                        "icon": "https://www.letpub.com.cn/images/favicon.ico"
                    },
                    {
                        "name": "英文DOI",
                        "url": "https://dx.doi.org/%p{hdl=%s}",
                        "icon": "https://dx.doi.org/static/img/favicon.png"
                    },
                    {
                        "name": "剑桥大学知识库",
                        "url": "https://www.repository.cam.ac.uk/discover?scope=/&query=%s",
                        "icon": "https://www.repository.cam.ac.uk/themes/Cambridge/images/favicon.ico"
                    },
                    {
                        "name": "国学宝典",
                        "url": "http://www.gxbd.com/#p{#entry_my_adv=%s&click(#entry_my_adv+input)}"
                    },
                    {
                        "name": "汉语大词典",
                        "url": "https://www.hanyudacidian.cn/#p{[type\\=search]=%s&click(#com-search-button)}"
                    },
                    {
                        "name": "CALIS联合目录",
                        "url": "http://opac.calis.edu.cn/opac/doSimpleQuery.do%p{condition=%s&query=(cql.anywhere=\"*%s*\")&pageno=1&pagingType=0&version=1.1&maximumRecords=50&startRecord=1}"
                    },
                    {
                        "name": "影印古籍丛书",
                        "url": "http://39.98.95.7:90/default/search#p{.search-query=%s&click(#search)}"
                    },
                    {
                        "name": "以观书法",
                        "url": "https://web.ygsf.com/#p{click(.m-navigator>li:last-child)&sleep(1000)&input.van-field__control=%s&click(.van-search__action>div)}"
                    },
                    {
                        "name": "汉语大字典",
                        "url": "http://www.homeinmists.com/hd/search2.html#p{#queryString1=%s&click(#queryString1+input)}"
                    },
                    {
                        "name": "中华古籍",
                        "url": "http://bib.ancientbooks.cn/docGuji/shuMuSearch.jspx%p{searchType=1&bookType=0&title=%s}#from{docGuji/}"
                    }
                ]
            },
            {
                "type": "网盘",
                "icon": "cloud-download",
                "sites": [
                    {
                        "name": "百度网盘",
                        "url": "https://pan.baidu.com/disk/home?#/search?key=%s",
                        "icon": "https://nd-static.bdstatic.com/m-static/v20-main/favicon-main.ico"
                    },
                    {
                        "name": "大力盘",
                        "url": "https://www.dalipan.com/search?keyword=%s"
                    },
                    {
                        "name": "大圣盘",
                        "url": "https://www.dashengpan.com/search?keyword=%s"
                    },
                    {
                        "name": "罗马盘",
                        "url": "https://www.luomapan.com/search?keyword=%s"
                    },
                    {
                        "name": "小白盘",
                        "url": "https://www.xiaobaipan.com/list-%s.html?from=1",
                        "icon": "https://www.xiaobaipan.com/static/assets/ico/favicon.png"
                    },
                    {
                        "name": "56网盘",
                        "url": "https://www.56wangpan.com/search/kw%s"
                    },
                    {
                        "name": "凌风云",
                        "url": "https://www.lingfengyun.com/Search/Search?wd=%s"
                    },
                    {
                        "name": "优聚搜",
                        "url": "https://v3.ujuso.com/#/main?kw=%s",
                        "icon": "https://cdn-1251935463.file.myqcloud.com/jujuso/favicon-32x32.png"
                    },
                    {
                        "name": "夸克网盘搜索",
                        "url": "https://kzurl01.cn/LfJrE#p{#search=%s&click(#submitSearch)}",
                        "match": "http://kl\\.kelezj\\.com/apps/index\\.html\\?"
                    },
                    {
                        "name": "小猪快盘，网盘搜索",
                        "url": "https://www.xiaozhukuaipan.com/s/search?q=%s",
                        "icon": "https://www.xiaozhukuaipan.com/media/img/logo/favicon.ico"
                    },
                    {
                        "name": "盘么么",
                        "url": "http://www.panmeme.com/query?key=%s"
                    },
                    {
                        "name": "网盘搜索-小白盘",
                        "url": "https://www.xiaobaipan.com/?k=%s",
                        "icon": "https://www.xiaobaipan.com/static/assets/ico/favicon.png"
                    },
                    {
                        "name": "热盘搜",
                        "url": "http://www.repanso.com/q?wd=%s"
                    },
                    {
                        "name": "好去网",
                        "url": "https://www.haogow.com/search?keyword=%s",
                        "icon": "https://www.haogow.com/template/default/images/favicon.ico"
                    },
                    {
                        "name": "V盘搜",
                        "url": "http://www.vpansou.com/query?wd=%s"
                    },
                    {
                        "name": "百度网盘搜索",
                        "url": "https://aizhaomu.com/search/kw%p{keyword=%s}"
                    },
                    {
                        "name": "搜度网",
                        "url": "http://www.sodu123.com/sodu/so.php?q=%s"
                    },
                    {
                        "name": "盘搜网",
                        "url": "http://www.pansou.com/?q=%s"
                    },
                    {
                        "name": "fastsoso网盘搜索",
                        "url": "https://www.fastsoso.cn/search?k=%s"
                    },
                    {
                        "name": "51搜盘",
                        "url": "http://www.51sopan.cn/search?&time=2keywords=%s",
                        "icon": "http://www.51sopan.cn/img/favicon.ico"
                    },
                    {
                        "name": "两仪鸟搜索",
                        "url": "http://www.baiduyunsousou.com/search?kw=%s",
                        "icon": "http://www.baiduyunsousou.com/dist/images/logo/e_m.png"
                    },
                    {
                        "name": "微盘搜索",
                        "url": "http://www.vpanso.com/s?wd=%s"
                    },
                    {
                        "name": "云盘搜索大师",
                        "url": "https://www.xxhh360.com/search?q=%s"
                    },
                    {
                        "name": "盘大大",
                        "url": "https://www.pandada.net/all/s-ypzdn%s.html",
                        "icon": "https://static.pandada.net/img/favicon.ico"
                    },
                    {
                        "name": "众人搜索网",
                        "url": "http://wangpan.renrensousuo.com/jieguo?q=%s"
                    },
                    {
                        "name": "猪猪盘",
                        "url": "http://www.zhuzhupan.com/search?query=%s"
                    },
                    {
                        "name": "猫狸盘搜",
                        "url": "https://www.alipansou.com/search?k=%s"
                    },
                    {
                        "name": "小马盘",
                        "url": "https://www.xiaomapan.com/#/main/search?keyword=%s"
                    },
                    {
                        "name": "来搜一下",
                        "url": "https://www.laisoyixia.com/s/search?q=%s",
                        "icon": "https://www.laisoyixia.com/media/image/logo/favicon.ico"
                    },
                    {
                        "name": "xxggg",
                        "url": "http://xxggg.net/app/index.html?name=%s&id=test&token=i69"
                    },
                    {
                        "name": "440066",
                        "url": "http://440066.cn/app/index.html?name=%s&id=test&token=i69"
                    },
                    {
                        "name": "9dups",
                        "url": "http://www.9dups.com/app/index.html?name=%s&id=test&token=u3vp96f4b5o"
                    },
                    {
                        "name": "kkkob",
                        "url": "http://m.kkkob.com/apps/index.html?name=%s&token=nevv7nb902"
                    }
                ]
            },
            {
                "type": "下载",
                "icon": "download",
                "sites": [
                    {
                        "name": "BTDigg",
                        "url": "https://btdig.com/search?q=%s"
                    },
                    {
                        "name": "Btsow",
                        "url": "https://btsow.com/search/%s",
                        "icon": "https://btsow.bar/app/bts/View/img/favicon.ico",
                        "match": "btsow\\..*/search/"
                    },
                    {
                        "name": "torrentkitty",
                        "url": "https://www.torrentkitty.app/search/%s"
                    },
                    {
                        "name": "idope",
                        "url": "https://idope.se/torrent-list/%s",
                        "icon": "https://idope.se/static/search/pc/img/favicon.ico"
                    },
                    {
                        "name": "limetorrents.co",
                        "url": "https://www.limetorrents.co/search/all/%s"
                    },
                    {
                        "name": "limetorrents.asia",
                        "url": "https://www.limetorrents.asia/search/all/%s"
                    },
                    {
                        "name": "limetorrents.pro",
                        "url": "https://www.limetor.pro/search/all/%s"
                    },
                    {
                        "name": "cdsoso",
                        "url": "https://www.cdsoso.cc/searches-%s-hot-1-null.html"
                    },
                    {
                        "name": "射手网(伪)",
                        "url": "https://assrt.net/sub/?searchword=%s"
                    },
                    {
                        "name": "sub HD",
                        "url": "https://subhd.la/search/%s",
                        "icon": "https://img.huo720.com/favicon-32x32.png"
                    },
                    {
                        "name": "Subscene",
                        "url": "https://subscene.com/subtitles/searchbytitle:p{query=%s}"
                    },
                    {
                        "name": "R3SUB",
                        "url": "https://r3sub.com/search.php?s=%s"
                    },
                    {
                        "name": "Torrentz2",
                        "url": "https://www.torrentz2.xyz/?q=%s"
                    },
                    {
                        "name": "Torrentz2k",
                        "url": "https://torrentz2k.xyz/search/:p{q=%s&category=all}"
                    },
                    {
                        "name": "1337x.to",
                        "url": "https://www.1377x.to/search/%s/1/"
                    },
                    {
                        "name": "Torlock",
                        "url": "https://www.torlock2.com/all/torrents/%s.html"
                    },
                    {
                        "name": "TD",
                        "url": "https://www.torrentdownloads.me/search/?search=%s"
                    },
                    {
                        "name": "rarbgprx",
                        "url": "https://rarbgprx.org/torrents.php?search=%s"
                    },
                    {
                        "name": "rarbgproxy",
                        "url": "https://rarbgproxy.org/torrents.php?search=%s"
                    },
                    {
                        "name": "kickass(镜像1)",
                        "url": "https://kat.sx/search.php?q=%s",
                        "icon": "https://kat.sx/kastatic/favicon.ico"
                    },
                    {
                        "name": "kickasstorrents",
                        "url": "https://kickasstorrents.to/usearch/%s"
                    },
                    {
                        "name": "kickass1.to",
                        "url": "https://kickass1.to/usearch/%s/"
                    },
                    {
                        "name": "kat.am",
                        "url": "https://kat.am/usearch/%s/"
                    },
                    {
                        "name": "kickasstorrent.cr",
                        "url": "https://kickasstorrent.cr/usearch/%s/"
                    },
                    {
                        "name": "6v电影",
                        "url": "https://www.hao6v.tv/e/search/index.php%p{show=title%2Csmalltext&tempid=1&keyboard=%s&tbname=article}",
                        "charset": "GBK"
                    }
                ]
            },
            {
                "type": "福利",
                "icon": "female",
                "match": "t66y\\.com",
                "selectTxt": true,
                "sites": [
                    {
                        "name": "JAVlibrary",
                        "url": "http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=%s",
                        "icon": "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAA3AQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAP5JREFUeJylkzFKBDEUhr+3SQZdF8vFxmobwT2AtXgHCzsbQbyANuJVbLyAnR7BTlFBrGwUsRBcGdckz2JFd5zMzA7+Vf6Q9+XPSyIfc2fKP9RJznYNZncZpBkgpQQC2fvGjx3Pn7dLIP2seds6gD6N0YccgHj63AiwpQSrPbCC374injy2BHQN7mJtMnbp/v5VYZXZXPo1ruIKsg6yspAGYKeKTBpgj4fo7WgGQEUAffksllQC+g73uk7YukRHAfGKRiXs3dQApurtwYBwdI8Me4gAi5a4f1c+UjroROZwUPAhASj2II/w5iEP4PXbB/zOdeWTLv+FlprttdToC7F9R7urpLwHAAAAAElFTkSuQmCC"
                    },
                    {
                        "name": "Jable",
                        "url": "https://jable.tv/search/%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4jWP4m9xX9y+p9+e/pL7/pOHen3+T++oYyNMMxz8ZKND8/19S33/CBmRM+v9v3dH//5qWkmlA/vT///////9v8d5RAxbvoacByf0IdvcaiAEzt5FgwPxd//89efP/351n////+v3//5uP///lTCXBgKKZkEDbcOz/vwW7///LnUZBSiSAKcxMvT8ZyM/OfT//J/fVAQB8gvyNVegtUAAAAABJRU5ErkJggg==",
                        "nobatch": true
                    },
                    {
                        "name": "JavDB",
                        "url": "https://javdb.com/search?q=%s.replace(/\\-/,\"_\")"
                    },
                    {
                        "name": "JavMenu",
                        "url": "https://javmenu.com/search?wd=%s",
                        "icon": "https://javmenu.com/assets/images/logo.png",
                        "match": "^https://javmenu\\.com/.*search"
                    },
                    {
                        "name": "MissAV",
                        "url": "https://missav.com/search/%s",
                        "icon": "https://cdn26.akamai-content-network.com/img/favicon.ico"
                    },
                    {
                        "name": "nhentai",
                        "url": "https://nhentai.net/search/?q=%s"
                    },
                    {
                        "name": "ExHentai",
                        "url": "https://exhentai.org/?f_search=%s"
                    }
                ]
            },
            {
                "type": "ACG",
                "icon": "gamepad",
                "sites": [
                    {
                        "name": "nyaa.si",
                        "url": "https://nyaa.si/?f=0&c=0_0&q=%s",
                        "icon": "https://nyaa.si/static/favicon.png"
                    },
                    {
                        "name": "Tokyotosho",
                        "url": "https://www.tokyotosho.info/search.php?terms=%s"
                    },
                    {
                        "name": "Mikan",
                        "url": "http://mikanani.me/Home/Search?searchstr=%s"
                    },
                    {
                        "name": "＊MioBT＊",
                        "url": "http://www.miobt.com/search.php?keyword=%s",
                        "icon": "http://www.miobt.com/images/favicon/miobt.ico"
                    },
                    {
                        "name": "shana project",
                        "url": "https://www.shanaproject.com/search/?title=%s"
                    },
                    {
                        "name": "简单动漫",
                        "url": "https://www.36dm.com/search.php?keyword=%s"
                    },
                    {
                        "name": "KOTOMI RSS",
                        "url": "https://moe4sale.in/?kw=%s"
                    },
                    {
                        "name": "ACG.RIP",
                        "url": "https://acg.rip/?term=%s"
                    },
                    {
                        "name": "Glodls",
                        "url": "https://glodls.to/search_results.php?search=%s"
                    },
                    {
                        "name": "AcgnX Ero",
                        "url": "https://www.anix.moe/search.php?sort_id=0&keyword=%s"
                    },
                    {
                        "name": "AniRena",
                        "url": "https://www.anirena.com/?s=%s"
                    },
                    {
                        "name": "GGBases",
                        "url": "http://www.ggbases.com/search.so?title=%s",
                        "description": "GGBases is a torrent site dedicated to h-games, gal-games and anime. Tags hgame, h-game, doujin game, galgame, RPG"
                    },
                    {
                        "name": "爱恋动漫BT",
                        "url": "https://www.kisssub.org/search.php?keyword=%s",
                        "icon": "https://www.kisssub.org/images/favicon/kisssub.ico"
                    },
                    {
                        "name": "VCB-Studio",
                        "url": "https://vcb-s.com/?s=%s",
                        "icon": "https://vcb-s.com/wp-content/customRes/favicon@48.png",
                        "description": "BD 动画下载，收藏级"
                    },
                    {
                        "name": "金手指",
                        "url": "https://duckduckgo.com/?q=%s+cheat+tables+site%3Aforum.cheatengine.org&t=ffab&atb=v318-7&ia=web"
                    }
                ]
            },
            {
                "type": "Etc",
                "icon": "suitcase",
                "sites": [
                    {
                        "name": "邮编库",
                        "url": "http://www.youbianku.com/%s"
                    },
                    {
                        "name": "AMO",
                        "url": "https://addons.mozilla.org/zh-CN/firefox/search/?q=%s"
                    },
                    {
                        "name": "企查查",
                        "url": "https://www.qcc.com/search?key=%s",
                        "match": "^https?:\\/\\/www\\.qcc\\.com\\/(?:web|firm|search)"
                    },
                    {
                        "name": "天眼查",
                        "url": "https://www.tianyancha.com/search?key=%s",
                        "match": "^https?:\\/\\/www\\.tianyancha\\.com\\/(?:search|company)"
                    },
                    {
                        "name": "中國大陸地方志書目查詢系統",
                        "url": "https://webgis.sinica.edu.tw/place/query.asp?A1=%E5%9C%B0%E6%96%B9%E5%BF%97%E5%90%8D&B1=containing&C1=%s&Page_setup=10&D1=AND&A2=99&B2=containing&C2=&D2=AND&A3=99&B3=containing&C3=&page=1",
                        "charset": "Big5"
                    },
                    {
                        "name": "金山文档 · 一起办公才高效",
                        "url": "https://edu.kdocs.cn/?show=all#p{#app input.kdv-input__inner=%s}"
                    }
                ]
            },
            {
                "type": "Github",
                "icon": "fa-brands fa-github  ",
                "match": "github\\.com",
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "页面镜像 - Fastgit",
                        "url": "%u.replace(/https:\\/\\/github\\.com/,\"https://hub.fastgit.xyz\")",
                        "kwFilter": "https:\\/\\/github\\.com"
                    },
                    {
                        "name": "Raw镜像 - Fastgit",
                        "url": "%t.replace(/raw\\.githubusercontent\\.com/,\"raw.fastgit.org\").replace(/github.com(.*)\\/blob\\/(.*)/,\"raw.fastgit.org$1/$2\")",
                        "kwFilter": "github.com.*\\/blob\\/"
                    },
                    {
                        "name": "Assets镜像 - Fastgit",
                        "url": "%t.replace(/github\\.githubassets\\.com/,\"assets.fastgit.orgz\")",
                        "kwFilter": "github\\.githubassets\\.com"
                    },
                    {
                        "name": "Download镜像- Fastgit",
                        "url": "%t.replace(/github\\.com(.*\\/download\\/)/,\"download.fastgit.org$1\")",
                        "kwFilter": "github\\.com.*\\/download\\/"
                    },
                    {
                        "name": "Archive镜像- Fastgit",
                        "url": "%t.replace(/github\\.com(.*\\/archive\\/)/,\"download.fastgit.org$1\")",
                        "kwFilter": "github\\.com.*\\/archive\\/"
                    },
                    {
                        "name": "Ghproxy镜像加速",
                        "url": "https://ghproxy.com/%t"
                    }
                ]
            },
            {
                "type": "VIP",
                "icon": "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9ImhlaWdodDogMWVtO2ZpbGw6IHdoaXRlO292ZXJmbG93OiBoaWRkZW47IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcC1pZD0iODI3Ij48cGF0aCBkPSJNNjgzLjE5NTM2MyA1NjcuNjE1NDY5djM0OS4xNDQzOTloNzMuMzY5NDQyVjc4OS45NzUwMTdjMTE3LjI2ODMxMiAxLjczOTU4MiAxNzYuNzIxMDk1LTMuNDc5MTY1IDE5My4xOTU5NjItMTAzLjU1NjMxIDUuMjE4NzQ3LTI5LjI2NTkxNC01LjIxODc0Ny02Mi4xMTMzMjEtMTguMjE0NDQ5LTgwLjEyMzExNC0zOC42ODAxMjQtNTIuMzkyMTI2LTE1NS4wMjc0ODEtMzkuMzk2NDIzLTI0OC4zNTA5NTUtMzguNjgwMTI0ek03NTYuNTY0ODA1IDczMC42MjQ1NjN2LTEwMS44MTY3MjhjNTQuNDM4NjkzLTEuNzM5NTgyIDExMi4wNDk1NjUtNy43NzY5NTYgMTIxLjU2NjEwMyAzNi4yMjQyNDMgMTUuNjU2MjQxIDczLjU3NDA5OC02MC4zNzM3MzggNjcuMzMyMDY4LTEyMS41NjYxMDMgNjUuNTkyNDg1ek01NDEuODc5ODg0IDU2OS4zNTUwNTFjMC44MTg2MjcgMTE1LjUyODczIDAuODE4NjI3IDIzMS44NzYwODcgMS43Mzk1ODIgMzQ3LjQwNDgxN2g3MS42Mjk4NTlWNTY3LjYxNTQ2OWMtMjQuMTQ5NDk1IDEuMDIzMjg0LTQ4LjQwMTMxOSAxLjAyMzI4NC03My4zNjk0NDEgMS43Mzk1ODJ6TTY4MC43Mzk0ODIgMTAyLjEyMzcxM2MtMTEzLjA3Mjg0OSAxMTIuODY4MTkyLTIyNS44Mzg3MTMgMjI0LjkxNzc1OC0zMzkuNzMwMTg5IDMzNy45OTA2MDdWMTAyLjEyMzcxM0g2Ny42OTAyMTdjMC44MTg2MjcgMjIuNDA5OTEzIDAuODE4NjI3IDQ1LjYzODQ1MyAxLjczOTU4MiA2OC4xNTA2OTVoNjYuNDExMTEydjc0NS45NzM4MThjMjcxLjU3OTQ5NC0yNzEuNzg0MTUxIDU0Mi4zNDAzNjItNTQyLjU0NTAxOCA4MTMuOTE5ODU2LTgxNC4xMjQ1MTNINjgwLjczOTQ4MnoiIHAtaWQ9IjgyOCIvPjwvc3ZnPg==",
                "match": "v\\.qq\\.com/x/|\\.mgtv\\.com/.*b/|v\\.youku\\.com/(v_show|video)/|\\.iqiyi\\.com/(v_|dianying)",
                "sites": [
                    {
                        "name": "无名小站",
                        "url": "https://www.administratorw.com/video.php?url=%u"
                    },
                    {
                        "name": "小小解析",
                        "url": "http://tv.hzwdd.cn/#p{#url=%u&click(.btn-play)}",
                        "icon": "http://tv.hzwdd.cn/img/favicon.ico"
                    }
                ]
            },
            {
                "type": "辅助工具",
                "icon": "list-alt",
                "selectTxt": true,
                "selectImg": true,
                "selectAudio": true,
                "selectVideo": true,
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "手机号码聚合搜索",
                        "url": "[\"360\",\"搜狗\"]",
                        "icon": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAcFBQYFBAcGBQYIBwcIChELCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJChQLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/wAARCABAAEADASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAMIAgcBBQYE/8QAMxAAAQMDAgIIBAYDAAAAAAAAAQIDBAAFEQYSByEIEzFBUWFxgRQyUmIVIzNCkbFyoeH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AsPSlKBSlKBSo2X2pDfWR3UPI+ptYUP5FSUClKUCo33kRo7j7ytrbSCtZxnAAyf8AQqSsHWkPtLacGUOJKFehGD/dBU2+9JPV0nVZmWFbUK0tL/Kgusoc61Hi4rGcn7SMd3jVotPXpjUel7deY6drU+KiQEZzt3JyU+xyPaqFXSzvWvUsuzyilp6NKVGWpw4CSle3JPh31efQ2mjo/QtrsJkiUuExtU8OxaiSo4+3KiB5YoNbWXTvC3VE5Y4cXuTp2+N5KfgH3WHQR4su8lp8QO6vWaT1beIepTozXoZ/GOrL0C4sJ2s3NodpA/a4O9Pr79XJjwuLFsukOdZ3dPaxsTiercKwXojpG5paHU43IVjs/wCGun1FepWqeAto10W+rvtifbmBSU7T1rboaeH+Khzx2dlBuqlRsPIkR232vkdQFp9CMj+6koFKUoKxdJPh29DvA1pbGSqJL2t3AJH6ToGErPkoADP1D7hXp+CfGy33GzxdNatmIiXGKgMxpT6tqJKBySkqPILA5c/m5d9bvmQ41whPRJzDciM+gtutOp3JWk8iCO8VWriJ0bJ8OS7cNAH4yIolRtzqwHmvJCjyWPI4V60G/NSa40zo8sDUl4jQFyRlpC8qUseOEgnHn2V9tl1BZdRRS/YbnDuLKcbjGdSvbnxA5j3FUKvFrvNrkiPfYc2I80OrCJba0FIHcN3d6VtLo22K+yuIyLzBS41aYbbiJrx5Id3IIS0PqO7ary258MhbalKUClKUClKUGDrTb7ex9CXUH9riQofwa4ZYajtBqO0hptPYhtISB7CpKUClKUH/2Q=="
                    },
                    {
                        "name": "🧮  计算器",
                        "url": "calculator://"
                    },
                    {
                        "name": "🔎  Everything搜索",
                        "url": "ES://%s"
                    },
                    {
                        "name": "🦊  打开火狐",
                        "url": "FirefoxURL-308046B0AF4A39CB://%u"
                    },
                    {
                        "name": "⏰  时钟",
                        "url": "ms-clock://"
                    },
                    {
                        "name": "✂️  屏幕截图",
                        "url": "ms-screenclip://"
                    },
                    {
                        "name": "☑️  ToDo",
                        "url": "ms-todo://",
                        "description": "微软To-Do"
                    },
                    {
                        "name": "📓  Onenote",
                        "url": "onenote://"
                    },
                    {
                        "name": "⌨️  VSCode",
                        "url": "vscode://%u"
                    },
                    {
                        "name": "提取文本中链接并打开",
                        "url": "%sr.replace(/(点|。)/g,\".\").replace(/[^\\w\\-_\\.~!\\*'\\(\\);:@&=\\+\\$,\\/\\?#\\[\\]%]/g,\"\")"
                    },
                    {
                        "name": "测量尺寸",
                        "url": "javascript:void('http://centricle.com/tools/favelets/');marqueeColor=prompt('Marquee%20Color:','red');initMarquee=document.createElement('div');marquee=document.body.appendChild(initMarquee);marquee.style.position='absolute';marquee.style.border='dashed%201px%20red';initControls=document.createElement('div');controls=document.body.appendChild(initControls);controls.style.position='absolute';controls.style.top='-300px';controls.style.left='-300px';controls.style.width='85px';controls.style.background='%23eee';controls.style.padding='5px';controls.style.border='solid%201px%20%23ccc';controls.style.font='10px%20verdana,sans-serif';controls.style.width='85px';controls.style.zIndex='99';controls.innerHTML='%3Cb%3ECurrent:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22currentX%22%3E0%3C/span%3E%20y:%3Cspan%20id=%22currentY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EBegin:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22beginX%22%3E0%3C/span%3E%20y:%3Cspan%20id=%22beginY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EEnd:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22endX%22%3E0%3C/span%3E%20y:%3Cspan%20id%20=%22endY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EDimensions:%3C/b%3E%3Cbr%3E%20w:%3Cspan%20id=%22dimX%22%3E0%3C/span%3E%20h:%3Cspan%20id=%22dimY%22%3E0%3C/span%3E';document.onmousemove=follow;document.onmousedown=beginDrag;document.onmouseup=endDrag;currentX=document.getElementById('currentX');currentY=document.getElementById('currentY');beginX=document.getElementById('beginX');beginY=document.getElementById('beginY');endX=document.getElementById('endX');endY=document.getElementById('endY');dimX=document.getElementById('dimX');dimY=document.getElementById('dimY');var%20marqueeLeft=0;var%20marqueeTop=0;dragging=false;void(document.body.style.cursor='crosshair');function%20follow(e){x=e.pageX;y=e.pageY;controls.style.left=x+15+'px';controls.style.top=y+15+'px';currentX.innerHTML=x;currentY.innerHTML=y;if(dragging){marquee.style.width=x-dragstartX+'px';dimX.innerHTML=Math.abs(x-dragstartX);marquee.style.height=y-dragstartY+'px';dimY.innerHTML=Math.abs(y-dragstartY);}return%20true;};function%20beginDrag(e){marquee.style.width=0;marquee.style.height=0;marquee.style.borderColor=marqueeColor;dragging=true;x=e.pageX;y=e.pageY;marquee.style.visibility='visible';marquee.style.left=x+'px';marquee.style.top=y+'px';dragstartX=x;dragstartY=y;beginX.innerHTML=x;beginY.innerHTML=y;return%20true;}function%20endDrag(e){dragging=false;x=e.pageX;y=e.pageY;endX.innerHTML=x;endY.innerHTML=y;return%20true;}"
                    },
                    {
                        "name": "查询字体",
                        "url": "javascript:(function(){if(!document.getElementById('fountscript')){var%20founts=document.createElement('script');founts.src='https://fount.artequalswork.com/fount.js';founts.id='fountscript';document.body.appendChild(founts);}})();"
                    },
                    {
                        "name": "网页设计工具",
                        "url": "javascript:function%20fnStartDesign(sUrl)%20{var%20nScript%20=%20document.createElement('script');nScript.setAttribute('language','JavaScript');nScript.setAttribute('src',sUrl);document.body.appendChild(nScript);}fnStartDesign('//www.sprymedia.co.uk/design/design/media/js/design-loader.js');"
                    },
                    {
                        "name": "敏感词查询",
                        "url": "http://www.txttool.com/t/?id=NDY4#p{#wordkey=%sr&click(.panel-body>div>button)}"
                    },
                    {
                        "name": "IP查询",
                        "url": "https://www.ipuu.net/query/ip?search=%sr"
                    },
                    {
                        "name": "⭐ 查找当前Favicon",
                        "url": "javascript:let ico=document.querySelector(\"link[rel='shortcut icon'],link[rel='icon']\");if(ico)window.open(ico.href, \"_blank\");else window.open(location.origin + \"/favicon.ico\", \"_blank\")"
                    },
                    {
                        "name": "🛠️ 扩展",
                        "url": "chrome://extensions/"
                    },
                    {
                        "name": "🐞 远程调试",
                        "url": "chrome://inspect/#devices"
                    },
                    {
                        "name": "🔖 书签管理器",
                        "url": "chrome://bookmarks/"
                    }
                ]
            },
            {
                "type": "当前网页",
                "icon": "list",
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "小众软件评论",
                        "url": "showTips:%t \n<style>\n#topic-title, #post_1, footer, header, .meta{\n display: none;\n}\n#main-outlet {\n  padding: 20px;\n  text-align: left;\n}\na {\n color: gray;\n}\n.crawler-post-meta {\n font-size: 12px;\n}\naside.quote {\n    margin: 10px 0px 0px 20px;\n    font-style: italic;\n}\nimg {\n    max-height: 200px;\n    width: auto;\n}\naside.onebox {\n    font-size: small;\n    border: 1px solid;\n    border-radius: 10px;\n    padding: 10px;\n    margin: 5px;\n}\n#main-outlet {\n    max-height: 800px;\n    overflow: auto;\n    pointer-events: all;\n}\n</style>\n{noscript[data-path]|innerHTML}",
                        "icon": "https://www.appinn.com/favicon.ico",
                        "kwFilter": "https://meta\\.appinn\\.net/t/topic/"
                    },
                    {
                        "name": "⏬ BBDown",
                        "url": "SearchJumper-BBDown://%u",
                        "description": "需要自行配置软件与注册表",
                        "match": "bilibili\\.com",
                        "hideNotMatch": true
                    },
                    {
                        "name": "SEO查询",
                        "url": "http://seo.chinaz.com/?q=%h"
                    },
                    {
                        "name": "自动下载到百度网盘",
                        "url": "https://pan.baidu.com/disk/main#p{click([data-id\\=downloadLink])&div.nd-download-link div[role\\=dialog] input=%t&click(.nd-download-link button.u-button--primary)}",
                        "icon": "https://nd-static.bdstatic.com/m-static/v20-main/favicon-main.ico"
                    },
                    {
                        "name": "编辑当前网页",
                        "url": "javascript:(function(){document.body.setAttribute('contenteditable', 'true');alert('已开启网页编辑，按ESC键取消');document.onkeydown = function (e) {e = e || window.event;if(e.keyCode==27){document.body.setAttribute('contenteditable', 'false');}}})();",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik05NjAgOTYwSDY0di02NGg4OTZ2NjR6IG0tNzMuNi02ODYuNGwtODQgODQtNDUuNiA0NS42TDM4NCA3NzZsLTE5MiA1NiA1Ni0xOTIgNTAyLjQtNTAyLjRjNC00IDkuNi02LjQgMTQuNC02LjQgNCAwIDggMS42IDEwLjQgNEw4ODggMjQ4YzcuMiA3LjIgNS42IDE3LjYtMS42IDI1LjZ6TTcxMiAzNTcuNkw2NjYuNCAzMTIgMzA0LjggNjczLjZsLTE4LjQgNjQgNjQtMTguNEw3MTIgMzU3LjZ6IG05Ny42LTk3LjZsLTQ1LjYtNDUuNi01MiA1MiA0NS42IDQ1LjYgNTItNTJ6Ij48L3BhdGg+PC9zdmc+",
                        "nobatch": true
                    },
                    {
                        "name": "限制去除",
                        "url": "javascript:var d=document,b=d.body;with(b.onselectstart=b.oncopy=b.onpaste=b.onkeydown=b.oncontextmenu=b.onmousemove=b.ondragstart=d.oncopy=d.onpaste=null,d.onselectstart=d.oncontextmenu=d.onmousedown=d.onkeydown=function(){return!0},d.wrappedJSObject||d)onmouseup=null,onmousedown=null,oncontextmenu=null;for(var a=d.getElementsByTagName(\"*\"),i=a.length-1;i>=0;i--){var o=a[i];with(o.wrappedJSObject||o)onmouseup=null,onmousedown=null}var h=d.getElementsByTagName(\"head\")[0];if(h){var s=d.createElement(\"style\");s.innerHTML=\"html,*{user-select:text!important;-moz-user-select:text!important;-webkit-user-select:text!important;-webkit-user-drag:text!important;-khtml-user-select:text!important;-khtml-user-drag:text!important;pointer-events:auto!important;}\",h.appendChild(s)}Event.prototype.preventDefault=function(){};",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik04MDAgNDQ4SDcwNFYzMjBjMC0xMDYuNC04NS42LTE5Mi0xOTItMTkyUzMyMCAyMTMuNiAzMjAgMzIwaDY0YzAtNzAuNCA1Ny42LTEyOCAxMjgtMTI4czEyOCA1Ny42IDEyOCAxMjh2MTI4SDIyNGMtMTcuNiAwLTMyIDE0LjQtMzIgMzJ2Mzg0YzAgMTcuNiAxNC40IDMyIDMyIDMyaDU3NmMxNy42IDAgMzItMTQuNCAzMi0zMlY0ODBjMC0xNy42LTE0LjQtMzItMzItMzJ6TTUxMiA3MzZjLTM1LjIgMC02NC0yOC44LTY0LTY0czI4LjgtNjQgNjQtNjQgNjQgMjguOCA2NCA2NC0yOC44IDY0LTY0IDY0eiI+PC9wYXRoPjwvc3ZnPg==",
                        "description": "去除网页右键以及复制限制",
                        "nobatch": true
                    },
                    {
                        "name": "打开链接",
                        "url": "%t",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik03MjIuOCA0NTlsLTE4LjkgMTguOS0yLjcgMi43LTQuNyA0LjgtNTIuNyA1Mi43IDI2LjMgMjYuMyA1Mi43LTUyLjcgMTg0LjQgMTg0LjQtMjEwLjcgMjEwLjgtMTg0LjQtMTg0LjQgNTIuNi01Mi43LTI2LjMtMjYuNC01Mi43IDUyLjctMjYuMyAyNi40IDIzNy4xIDIzNy4xIDI2My40LTI2My41eiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMjcuNyAzNTMuNmwzNDIuNSAzNDIuNSAyNi4zLTI2LjNMMzU0IDMyNy4zeiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMDEuMyA1MTEuN0wxMTYuOSAzMjcuM2wyMTAuOC0yMTAuN0w1MTIuMSAzMDFsLTUyLjcgNTIuNiAyNi4zIDI2LjQgNTIuNy01Mi43IDI2LjMtMjYuNC0yMzctMjM3TDY0LjIgMzI3LjNsMjM3LjEgMjM3LjEgMjYuMy0yNi4zIDUyLjgtNTIuN0wzNTQgNDU5eiIgZmlsbD0iIzA2MDAwMSIvPjwvc3ZnPg==",
                        "description": "ctrl 后台标签页 alt 小窗 ctrl+shift 隐身窗口",
                        "openInNewTab": true
                    },
                    {
                        "name": "二维码生成",
                        "url": "https://hoothin.com/qrcode#%U",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "短网址生成",
                        "url": "https://cui.la#p{#url=%u}",
                        "icon": "https://cui.la/content/151952ahk56ovvoqhnv557.png.icon.png"
                    },
                    {
                        "name": "分享到微博",
                        "url": "https://service.weibo.com/share/share.php?url=%u&title=%n",
                        "nobatch": true
                    },
                    {
                        "name": "存档当前网页",
                        "url": "https://web.archive.org/save/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico",
                        "nobatch": true
                    },
                    {
                        "name": "万能命令",
                        "url": "https://wn.run/%u",
                        "nobatch": true
                    },
                    {
                        "name": "⏬ 全网视频下载",
                        "url": "lux://%u",
                        "description": "需要配合注册表补丁使用，详阅项目主页",
                        "nobatch": true
                    },
                    {
                        "name": "复制链接为 Markdown",
                        "url": "copy:[%sr](%t)",
                        "nobatch": true
                    },
                    {
                        "name": "新浪短网址",
                        "url": "https://sina.lt/index.php?url=%u"
                    },
                    {
                        "name": "is.gd",
                        "url": "https://is.gd/create.php%p{url=%u&opt=0}",
                        "icon": "https://is.gd/isgd_favicon.ico"
                    },
                    {
                        "name": "URL Shortener",
                        "url": "https://bitly.com/%p{url=%u}",
                        "icon": "https://docrdsfx76ssb.cloudfront.net/static/1678306332/pages/wp-content/uploads/2019/02/favicon.ico"
                    },
                    {
                        "name": "Gif控制器",
                        "url": "javascript:(function(){var n=null,C=false;function h(m){d(m,\"jsgif_overlaid\");m.removeEventListener(\"click\",i,C)}function i(m){var o=this;c.forEach(h);setTimeout(function(){j(o)},0);m.preventDefault()}function d(m,p){var o=m.className.split(/s/).filter(function(r){return r!==p});m.className=g(o,\" \")}function g(m,o){if(o===undefined){o=\"\"}return m.reduce(function(p,r){return p+o+r},\"\")}function j(ai){function ag(p,m){return function(q){p(q);T(m)}}function ac(){}function T(m){ab(\"Decoding (frame \"+(M.length+1)+\")...\",Z.i,Z.data.length,m)}function I(){G=C;o.insertBefore(ai,L);o.removeChild(L)}function F(){N&&M.push({data:N.getImageData(0,0,ae.width,ae.height),f:Y})}function V(m){af=m;ae={width:ai.width,height:ai.height};M=[];O.fillStyle=\"black\";O.fillRect(0,0,ae.width,ae.height);O.strokeStyle=\"red\";O.lineWidth=3;O.moveTo(0,0);O.lineTo(ae.width,ae.height);O.moveTo(0,ae.height);O.lineTo(ae.width,0);O.stroke();setTimeout(x,0)}function ah(m){m.lengthComputable&&ab(\"Loading...\",m.loaded,m.total,true)}function ab(u,p,r,t){K.style.visibility=p===r?\"\":\"visible\";if(t){t=Math.min(J.height>>3,J.height);var q=J.height-t>>1,m=p/r*J.width;O.fillStyle=\"rgba(255,160,122,0.5)\";O.fillRect(m,q,J.width-m,t);O.fillStyle=\"rgba(0,128,128,0.5)\";O.fillRect(0,q,p/r*J.width,t)}K.innerHTML=u+\" \"+Math.floor(p/r*100)+\"%\"}function ad(){try{b(Z,aj)}catch(m){V(\"parse\")}}var Z,ae,af=n,U=n,Y=n,w=n,s=n,N=n,G=true,P=true,M=[],x=function(){function y(){function S(){G=!G;aa();W.focus();u()}function aa(){if(G){W.innerHTML=\"&#10073;&#10073;\";W.title=\"Pause\";R.style.visibility=\"hidden\";Q.style.visibility=\"hidden\"}else{W.innerHTML=P?\"&#9654;\":\"&#9664;\";W.title=\"Play\";R.style.visibility=\"\";Q.style.visibility=\"\"}K.style.visibility=r?\"visible\":\"\";z.style.display=m?\"\":\"none\";E.innerHTML=\"i\";E.title=\"Show info/more tools\";D.innerHTML=P?\"&larr;\":\"&rarr;\";D.title=P?\"Reverse\":\"Un-reverse\";R.innerHTML=\"&#9664;&#10073;\";R.title=\"Previous frame\";Q.innerHTML=\"&#10073;&#9654;\";Q.title=\"Next frame\";B.innerHTML=r?\"&#9675;\":\"&#8857;\";B.title=r?\"Unpin\":\"Pin\";A.innerHTML=\"&#10006;\";A.title=\"Close jsgif and go back to original image\";v.disabled=G;q.disabled=G;K.innerHTML=\"\";H.innerHTML=\"\";z.innerHTML=\"\";if(M.length<2){if(af==\"xhr\"){K.appendChild(document.createTextNode(\"Load failed; cross-domain? \"));var al=ak(\"button\",\"popup\");al.addEventListener(\"click\",function(){window.open(ai.src)});al.innerHTML=\"&nearr;\";al.title=\"Click to open GIF in new window; try running jsgif there instead\";K.appendChild(al)}else{af==\"parse\"&&K.appendChild(document.createTextNode(\"Parse failed \"))}K.appendChild(A)}else{al=function(an,ao){an.innerHTML=\"\";ao.forEach(function(ap){an.appendChild(ap)})};var am=P?[E,D,R,W,Q,B,A]:[E,D,Q,W,R,B,A];al(K,[H,z]);al(H,am);al(z,[document.createTextNode(\" frame: \"),v,document.createTextNode(\" / \"),document.createTextNode(M.length),document.createTextNode(\" (delay: \"),q,document.createTextNode(\")\")])}}function ak(am,an,al){am=document.createElement(am);if(an){am.className=\"jsgif_\"+an}for(var ao in al){am[ao]=al[ao]}return am}var H=ak(\"div\",\"simple_tools\"),D=ak(\"button\",\"rev\"),E=ak(\"button\",\"show_info\"),R=ak(\"button\",\"prev\"),W=ak(\"button\",\"play_pause\"),Q=ak(\"button\",\"next\"),B=ak(\"button\",\"pin\"),A=ak(\"button\",\"close\"),z=ak(\"div\",\"info_tools\");v=ak(\"input\",\"cur_frame\",{type:\"text\"});q=ak(\"input\",\"delay_info\",{type:\"text\"});E.addEventListener(\"click\",function(){m=!m;aa();E.focus()},C);D.addEventListener(\"click\",function(){P=!P;aa();D.focus()},C);v.addEventListener(\"change\",function(){var al=+v.value;if(isNaN(al)||al<1||al>M.length){v.value=t+1}else{t=al-1;O.putImageData(M[t].data,0,0)}},C);R.addEventListener(\"click\",function(){p(-1)},C);W.addEventListener(\"click\",S,C);Q.addEventListener(\"click\",function(){p(1)},C);B.addEventListener(\"click\",function(){r=!r;aa();B.focus()},C);A.addEventListener(\"click\",I,C);q.addEventListener(\"change\",function(){var al=+q.value;if(!isNaN(al)){M[t].f=al}},C);J.addEventListener(\"click\",S,C);L.addEventListener(\"click\",function(al){al.preventDefault()},C);aa()}function p(z){t=(t+z+M.length)%M.length;v.value=t+1;q.value=M[t].f;O.putImageData(M[t].data,0,0)}var t=-1,v,q,m=C,r=C,u=function(){function z(){if(A=G){p(P?1:-1);var B=M[t].f*10;B||(B=100);setTimeout(z,B)}}var A=C;return function(){A||setTimeout(z,0)}}();return function(){setTimeout(y,0);if(!af){J.width=ae.width;J.height=ae.height;u()}}}(),aj={p:ag(function(m){ae=m;J.width=ae.width;J.height=ae.height;L.style.width=ae.width+\"px\";K.style.minWidth=ae.width+\"px\";X.width=ae.width;X.height=ae.height}),o:ag(function(m){F();Y=U=n;s=w;N=w=n;U=m.L?m.M:n;Y=m.u;w=m.v}),m:ag(ac),c:{l:ag(ac)},q:ag(function(q){N||(N=X.getContext(\"2d\"));var m=q.r?q.C:ae.w,p=N.getImageData(q.g,q.k,q.width,q.height);q.h.forEach(function(t,r){if(U!==t){p.data[r*4+0]=m[t][0];p.data[r*4+1]=m[t][1];p.data[r*4+2]=m[t][2];p.data[r*4+3]=255}else{if(s===2||s===3){p.data[r*4+3]=0}}});N.putImageData(p,q.g,q.k);O.putImageData(p,q.g,q.k)},true),n:function(){F();T(C);K.innerHTML=\"Playing...\";x()}},o=ai.parentNode,L=document.createElement(\"div\"),J=document.createElement(\"canvas\"),O=J.getContext(\"2d\"),K=document.createElement(\"div\"),X=document.createElement(\"canvas\");J.width=ai.width;J.height=ai.height;K.style.minWidth=ai.width+\"px\";L.className=\"jsgif\";K.className=\"jsgif_toolbar\";L.appendChild(J);L.appendChild(K);o.insertBefore(L,ai);o.removeChild(ai);K.innerHTML=\"Loading...\";(function(){var m=new XMLHttpRequest;m.overrideMimeType(\"text/plain; charset=x-user-defined\");m.onload=function(){Z=new f(m.responseText);setTimeout(ad,0)};m.onprogress=ah;m.onerror=function(){V(\"xhr\")};m.open(\"GET\",ai.src,true);m.send()})()}function b(o,u){function r(){var q={};q.s=o.a();switch(String.fromCharCode(q.s)){case\"!\":q.type=\"ext\";p(q);break;case\",\":q.type=\"img\";s(q);break;case\";\":q.type=\"eof\";u.n&&u.n(q);break;default:throw Error(\"Unknown block: 0x\"+q.s.toString(16))}q.type!==\"eof\"&&setTimeout(r,0)}function s(q){function v(F,I){function J(y,B){var D=F.slice(B*I,(B+1)*I);A.splice.apply(A,[y*I,I].concat(D))}for(var A=Array(F.length),E=F.length/I,H=[0,4,2,1],G=[8,8,4,2],x=0,K=0;K<4;K++){for(var z=H[K];z<E;z+=G[K]){J(z,x);x++}}return A}q.g=o.b();q.k=o.b();q.width=o.b();q.height=o.b();var w=l(o.a());q.r=w.shift();q.B=w.shift();q.J=w.shift();q.H=w.splice(0,2);q.D=e(w.splice(0,3));if(q.r){q.C=m(1<<q.D+1)}q.F=o.a();w=t();q.h=a(q.F,w);if(q.B){q.h=v(q.h,q.width)}u.q&&u.q(q)}function p(q){function w(A){function z(B){o.a();B.t=o.a();B.R=o.b();B.K=o.a();u.c&&u.c.l&&u.c.l(B)}o.a();A.identifier=o.d(8);A.O=o.d(3);switch(A.identifier){case\"NETSCAPE\":z(A);break;default:(function(B){B.N=t();u.c&&u.c[B.identifier]&&u.c[B.identifier](B)})(A)}}function x(z){o.a();z.V=o.j(12);z.U=t();u.G&&u.G(z)}function v(z){z.Q=t();u.m&&u.m(z)}function y(A){o.a();var z=l(o.a());A.H=z.splice(0,3);A.v=e(z.splice(0,3));A.W=z.shift();A.L=z.shift();A.u=o.b();A.M=o.a();A.K=o.a();u.o&&u.o(A)}q.label=o.a();switch(q.label){case 249:q.e=\"gce\";y(q);break;case 254:q.e=\"com\";v(q);break;case 1:q.e=\"pte\";x(q);break;case 255:q.e=\"app\";w(q);break;default:q.e=\"unknown\";(function(z){z.data=t();u.t&&u.t(z)})(q)}}function t(){var q,v;v=\"\";do{q=o.a();v+=o.d(q)}while(q!==0);return v}function m(q){for(var v=[],w=0;w<q;w++){v.push(o.j(3))}return v}u||(u={});(function(){var q={};q.I=o.d(3);q.X=o.d(3);if(q.I!==\"GIF\"){throw Error(\"Not a GIF file.\")}q.width=o.b();q.height=o.b();var v=l(o.a());q.z=v.shift();q.P=e(v.splice(0,3));q.J=v.shift();q.A=e(v.splice(0,3));q.bgColor=o.a();q.T=o.a();if(q.z){q.w=m(1<<q.A+1)}u.p&&u.p(q)})();setTimeout(r,0)}function a(y,w){function s(){t=[];r=y+1;for(var q=0;q<o;q++){t[q]=[q]}t[o]=[];t[x]=n}function m(A){for(var z=0,q=0;q<A;q++){if(w.charCodeAt(B>>3)&1<<(B&7)){z|=1<<q}B++}return z}for(var B=0,v=[],o=1<<y,x=o+1,r=y+1,t=[],p,u;;){u=p;p=m(r);if(p===o){s()}else{if(p===x){break}if(p<t.length){u!==o&&t.push(t[u].concat(t[p][0]))}else{if(p!==t.length){throw Error(\"Invalid LZW code.\")}t.push(t[u].concat(t[u][0]))}v.push.apply(v,t[p]);t.length===1<<r&&r<12&&r++}}return v}function f(m){this.data=m;this.S=this.data.length;this.i=0;this.a=function(){if(this.i>=this.data.length){throw Error(\"Attempted to read past end of stream.\")}return m.charCodeAt(this.i++)&255};this.j=function(r){for(var o=[],p=0;p<r;p++){o.push(this.a())}return o};this.d=function(r){for(var o=\"\",p=0;p<r;p++){o+=String.fromCharCode(this.a())}return o};this.b=function(){var o=this.j(2);return(o[1]<<8)+o[0]}}function l(m){for(var p=[],o=7;o>=0;o--){p.push(!!(m&1<<o))}return p}function e(m){return m.reduce(function(p,o){return p*2+o},0)}var k=function(m){for(var p=[],o=0;o<m.length;o++){p.push(m[o])}return p}(document.getElementsByTagName(\"img\")),c=k.filter(function(m){return m.src.slice(-4).toLowerCase()===\".gif\"});if(c.length===0){c=k}(function(m){var o=document.createElement(\"style\");o.type=\"text/css\";o.textContent=m;document.body.appendChild(o)})(\".jsgif{display:inline;position:relative;padding-bottom:3px;}.jsgif_toolbar{visibility:hidden;font-family:sans-serif;background-color:#555;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;overflow:visible;white-space:nowrap;padding:3px;position:absolute;left:0;text-align:center;z-index:50;}.jsgif_toolbar button{width:3em;color:black;text-align:center;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;margin:1px;cursor:pointer;background-color:#ddd;}.jsgif_cur_frame{width:2em;color:black;}.jsgif_delay_info{width:2em;color:black;}.jsgif_toolbar button:hover{color:red;}.jsgif:hover .jsgif_toolbar{visibility:visible;}.jsgif{text-decoration:none;color:black;}.jsgif_overlaid{border:5px solid red;}.jsgif_overlaid:hover{border:5px solid blue;}\");c.forEach(function(m){if(m.className.split(/s/).indexOf(\"jsgif_overlaid\")===-1){m.className+=\" jsgif_overlaid\";m.addEventListener(\"click\",i,C)}})})();",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcwNCAwSDE5MmE2NCA2NCAwIDAgMC02NCA2NHYzMjBoNTc2YTY0IDY0IDAgMCAxIDY0IDY0djQxNmE2NCA2NCAwIDAgMS02NCA2NEgxMjh2MzJhNjQgNjQgMCAwIDAgNjQgNjRoNzY4YTY0IDY0IDAgMCAwIDY0LTY0VjMyMHoiIGZpbGw9IiNFQUVBRUEiPjwvcGF0aD48cGF0aCBkPSJNNzA0IDB2MjU2YTY0IDY0IDAgMCAwIDY0IDY0aDI1NnoiIGZpbGw9IiM0MzQ4NTQiPjwvcGF0aD48cGF0aCBkPSJNNzY4IDMyMGwyNTYgMjU2VjMyMEg3Njh6IiBvcGFjaXR5PSIuMSI+PC9wYXRoPjxwYXRoIGQ9Ik03MDQgODMyYTMyIDMyIDAgMCAxLTMyIDMySDMyYTMyIDMyIDAgMCAxLTMyLTMyVjQ4MGEzMiAzMiAwIDAgMSAzMi0zMmg2NDBhMzIgMzIgMCAwIDEgMzIgMzJ6IiBmaWxsPSIjQ0M3NTk4Ij48L3BhdGg+PHBhdGggZD0iTTI4OCA2NzJoLTgwYTE2IDE2IDAgMCAwIDAgMzJoNDhhMzIgMzIgMCAwIDEtMzIgMzJoLTMyYTMyIDMyIDAgMCAxLTMyLTMydi05NmEzMiAzMiAwIDAgMSAzMi0zMmgzMmEzMiAzMiAwIDAgMSAzMiAzMiAxNiAxNiAwIDAgMCAzMiAwIDY0IDY0IDAgMCAwLTY0LTY0aC0zMmE2NCA2NCAwIDAgMC02NCA2NHY5NmE2NCA2NCAwIDAgMCA2NCA2NGgzMmE2NCA2NCAwIDAgMCA2NC02NCAxNiAxNiAwIDAgMCAwLTMyeiBtOTYgODBhMTYgMTYgMCAwIDEtMTYgMTYgMTYgMTYgMCAwIDEtMTYtMTZWNTYwYTE2IDE2IDAgMCAxIDE2LTE2IDE2IDE2IDAgMCAxIDE2IDE2eiBtMTc2LTIwOGgtOTZhMTYgMTYgMCAwIDAtMTYgMTZ2MTkyYTE2IDE2IDAgMCAwIDMyIDB2LTgwaDQ4YTE2IDE2IDAgMCAwIDAtMzJoLTQ4di02NGg4MGExNiAxNiAwIDAgMCAwLTMyeiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPjwvc3ZnPg==",
                        "description": "启用后点击页面中的Gif"
                    },
                    {
                        "name": "⌨️ 按行输入",
                        "url": "#p{@=%s[]}",
                        "description": "将剪贴板内容按行分割后依次粘贴到当前焦点所在输入框"
                    },
                    {
                        "name": "Google lens-搜索剪贴板图片",
                        "url": "[\"Google lens\"]",
                        "description": "搜索剪贴板图片"
                    },
                    {
                        "name": "Mainonly by jerrylus",
                        "url": "javascript:(function(){var e=document.body;let n=document.head.appendChild(document.createElement(\"style\"));n.textContent=\".mainonly { outline: 2px solid red; }\";let t=CSS.supports(\"selector(:has(*))\");function o(n){n instanceof HTMLElement&&(e.classList.remove(\"mainonly\"),(e=n).classList.add(\"mainonly\"))}function i(e){o(e.target)}function l(o){if(o.preventDefault(),t)n.textContent=\":not(:has(.mainonly), .mainonly, .mainonly *) { visibility: hidden; }\";else{n.textContent=\":not(.mainonly *, .mainonly-ancestor) { visibility: hidden; }\";var i=e;do i.classList.add(\"mainonly-ancestor\");while(i=i.parentElement)}r()}function s(o){if(\"Escape\"===o.key){o.preventDefault();var i=window.scrollY||document.documentElement.scrollTop;if(n.remove(),document.removeEventListener(\"keydown\",s),r(),e?.classList.remove(\"mainonly\"),!t)for(let l of document.getElementsByClassName(\"mainonly-ancestor\"))l.classList.remove(\"mainonly-ancestor\");window.scrollTo(0,i)}}function a(n){n.preventDefault(),n.deltaY<0?o(e.parentElement):o(e.firstElementChild)}function r(){document.removeEventListener(\"mouseover\",i),document.removeEventListener(\"click\",l),document.removeEventListener(\"wheel\",a)}document.addEventListener(\"mouseover\",i),document.addEventListener(\"click\",l),document.addEventListener(\"wheel\",a,{passive:!1}),document.addEventListener(\"keydown\",s)}())"
                    }
                ]
            },
            {
                "type": "网页快照",
                "icon": "clock-rotate-left",
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "Wayback Machine all",
                        "url": "https://web.archive.org/web/*/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico"
                    },
                    {
                        "name": "Wayback Machine",
                        "url": "https://web.archive.org/web/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico"
                    },
                    {
                        "name": "Google 快照",
                        "url": "https://webcache.googleusercontent.com/search?q=cache:%u"
                    },
                    {
                        "name": "Google 文本快照",
                        "url": "https://webcache.googleusercontent.com/search?strip=1&q=cache:%u"
                    },
                    {
                        "name": "Bing 快照",
                        "url": "https://www.bing.com/search?q=url:%u&go=Search&qs=bs&form=QBRE#p{click(ol#b_results li.b_algo:first-of-type div.b_attribution a.trgr_icon)&open(ol#b_results li.b_algo:first-of-type div.b_attribution a[href*\\=\"cc.bingj.com/cache\"])}"
                    },
                    {
                        "name": "Archive.is",
                        "url": "https://archive.is/newest/%u"
                    },
                    {
                        "name": "Archive.is all",
                        "url": "https://archive.is/%u"
                    },
                    {
                        "name": "Memento",
                        "url": "http://timetravel.mementoweb.org/memento/0/%u",
                        "icon": "http://mementoweb.org/static/css/images/timetravel_logo_20x20.png"
                    },
                    {
                        "name": "Megalodon",
                        "url": "https://megalodon.jp/?url=%u"
                    },
                    {
                        "name": "Yahoo 快照",
                        "url": "https://search.yahoo.com/search?p=url:%u#p{open(#results li:first-of-type a[href*\\=\"cc.bingj.com/cache\"], #results li:first-of-type a[href*\\=\"cc.bingj.com%2fcache\"])}"
                    },
                    {
                        "name": "Ghostarchive",
                        "url": "https://ghostarchive.org/search?term=%u"
                    },
                    {
                        "name": "WebCite",
                        "url": "https://webcitation.org/query?url=%u"
                    }
                ]
            },
            {
                "type": "一键搜题",
                "icon": "question",
                "sites": [
                    {
                        "name": "答案网",
                        "url": "https://www.zqnf.com/Search.html:p{Skey=%s}"
                    },
                    {
                        "name": "作业无忧",
                        "url": "https://www.xilvedu.cn/search.aspx?key=%s"
                    },
                    {
                        "name": "问答库",
                        "url": "https://www.asklib.com/s/%s"
                    },
                    {
                        "name": "简答题",
                        "url": "https://www.jiandati.com/search.aspx?key=%s"
                    },
                    {
                        "name": "刷刷题",
                        "url": "https://www.shuashuati.com/s?word=%s"
                    },
                    {
                        "name": "题库网",
                        "url": "https://so.tikuol.com/?q=%s"
                    },
                    {
                        "name": "PP题库",
                        "url": "https://www.ppkao.com/so/?q=%s",
                        "icon": "https://m.ppkao.com/favicon.ico"
                    },
                    {
                        "name": "查题吧",
                        "url": "https://www.chatiba.com/s?s=%s"
                    },
                    {
                        "name": "考试宝",
                        "url": "https://so.kaoshibao.com/search/question?keyword=%s"
                    },
                    {
                        "name": "我要搜题网",
                        "url": "https://www.woyaosouti.com/search?content=%s"
                    }
                ]
            },
            {
                "type": "地图",
                "icon": "map",
                "sites": [
                    {
                        "name": "高德地图",
                        "url": "https://ditu.amap.com/search?query=%s"
                    },
                    {
                        "name": "百度地图",
                        "url": "https://map.baidu.com/search/?querytype=s&wd=%s"
                    },
                    {
                        "name": "谷歌地图",
                        "url": "https://www.google.com/maps/?q=%s"
                    },
                    {
                        "name": "Bing地图",
                        "url": "https://cn.bing.com/maps?q=%s"
                    },
                    {
                        "name": "腾讯地图",
                        "url": "https://map.qq.com/#p{#PoiSearch=%s}"
                    },
                    {
                        "name": "360地图",
                        "url": "https://map.so.com/#p{.search-box input=%s&click(.action-container>.search)}"
                    }
                ]
            },
            {
                "type": "常用",
                "icon": "fire",
                "selectTxt": true,
                "selectImg": true,
                "selectAudio": true,
                "selectVideo": true,
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "谷歌翻译",
                        "url": "[\"谷歌翻译\"]"
                    },
                    {
                        "name": "微信搜索",
                        "url": "[\"微信搜索\"]"
                    },
                    {
                        "name": "🔎  Everything搜索",
                        "url": "[\"🔎  Everything搜索\"]"
                    },
                    {
                        "name": "去除网页限制",
                        "url": "[\"限制去除\"]"
                    },
                    {
                        "name": "编辑当前网页",
                        "url": "[\"编辑当前网页\"]"
                    },
                    {
                        "name": "小纸条",
                        "url": "https://u.gitcafe.net/#p{#wp-filter-search-input=%s}"
                    },
                    {
                        "name": "雕龍",
                        "url": "https://libvpn.nankai.edu.cn/https/77726476706e69737468656265737421e4fc0f9f222061557d468aa3951b203b/ancientc/ancientkm#p{sleep(1000)&click(.menu_bg>ul>li:nth-child(3)>a)&td>input[type\\=text]=%s&click(input[title\\='查詢'])}"
                    }
                ]
            },
            {
                "type": "视频",
                "icon": "circle-play",
                "selectVideo": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "M3u8播放器",
                        "url": "https://players.akamai.com/players/hlsjs?streamUrl=%t"
                    },
                    {
                        "name": "去视频水印",
                        "url": "https://parse.bqrdh.com/smart/#p{.ant-input=%u&click(.ant-input-search-button)}"
                    }
                ]
            },
            {
                "type": "AI",
                "icon": "robot",
                "sites": [
                    {
                        "name": "Bard",
                        "url": "https://bard.google.com/chat#p{.ql-editor.textarea=%s}",
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg"
                    },
                    {
                        "name": "Poe - Sage AI Chat",
                        "url": "https://poe.com/#p{sleep(2000)&[class*\\=ChatMessageInputContainer]>textarea=%s&click([class*\\=ChatMessageSendButton])}"
                    },
                    {
                        "name": "ChatGPT",
                        "url": "https://chat.openai.com/#p{#prompt-textarea=%s&click(#prompt-textarea+button)}"
                    },
                    {
                        "name": "Futurepedia - Find The Best AI Tools & Software",
                        "url": "https://www.futurepedia.io/#p{input[name\\=q]=%s&click(button[type\\=submit]:not([disabled]))}"
                    }
                ]
            },
            {
                "type": "回收站",
                "icon": "recycle",
                "match": "0",
                "sites": [
                    {
                        "name": "复制知乎回答 ",
                        "url": "c:%element{.AuthorInfo>[itemprop='name']}.prop(content)\n%element{.CopyrightRichText-richText}\n%element{.ContentItem-time}"
                    },
                    {
                        "name": "forfrigg",
                        "url": "http://forfrigg.com/#gsc.tab=0&gsc.q=%s&gsc.sort=",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFQUlEQVR4nMWXT4tlSRHFfxGZee97VdXaOroRBuYbCLpwIaMtbl26Ety7HETQxegX8A8uXLkVP4AwMAgiyKCCqMwoCuKgojjWOI12t1317s3MiHCRr9rpnq56U90LAx6XR76XcfJEnBM3JSIE4DOf/9IL6Y2ffuve2Y6LyCmRn7vF04aKnIvw4kvf+8a3H12TiBAR0U/futU/9fzH+N1vXuPDH/kob56e8tvXfs1nv/JdTDMybZimmQCSCN0DiWA7ZwDWZuSkuEE1Y8qJtXUc+Nvrf+DVV37sL3//m1NE+NsB5ItnRPCn1//I7dtv8de//Jnbt98C4Pf/+A+hGc2NMjdUhGrGunSmOdOqkbPSu7OZM0vttOZMRUmq7JbOsx98jpKT7vPVh9h55Dm+qCIiAIRDb8E8JZII5kavDiIUVUpO4+QetOZYD25sC/OUWKshArUaIvqOPJcCeKhGCtOcuH/ecIIIcAIBzpZKSoIIEFBbZypK92C3jOQi+/VL8lya+CLWarQ26AVwBxxKUXJSlrXjBkiwmQvzlDk7b8yTgkBrRsTl++fLl/YIdX88oHdn7UYQrIuBQskJc8Mddkuj5oQq1OpMKdHE2WwuT3OQARVISVHAAsKCpON0SZXWjW6BR5BzorcOIkgSlto4OS7Uak8OYLd0rAUhMGfh5o2ZIPAY/eEetOqEQ107200ZElwac8ncvbcOwJfEwRLklEhFqatRNoV791dKSeRkJBGON4W1GggIwm7p5KxsN4XajHnKXJTwiRjo3tktFSMwC3IRWuu4D4nulqGOpEJtxnaT6N1Y1g4hIOBP04RzzsxHE0uH6UgokanitO4jcUrjJCIcbTIEnBxPuAVLNVRGoz4xgJITZpCTEAFrdcwckSBrwnHMRj/U1QenaxCM/4gIu6Veuv/BEpwtjbPdikdQu9PMSVmYS2K3jnqHBOFjXYDaHLOg9+B8167c/7AMFTZTZlk6WYWswhgnylwUAqaUEFGmSShJOd4WFCEnmKe0b8THx2EVqGI+ZoGKoCr05qzRcGNvw0LrRm3BWV9JIsxTwh26Ofo2L742AE1KUqEFnC2dpELKwpQTZ2vHHMw6qso8Cds5YR7kJKzNqdWxhyfw9QC4GVOZmEomNOPuRATNgqJK7cZcEq0HhLP04HibaT0oScknBb9ChwcBIEK3YLHG0VHBI8Y7QbNhQONHlCQESgnHA5KCuUOMGXJZHGxCsxhzwIKIQBDOzitTVt57Y0JEhkSB3hxNym7XHshQk1zpAwcBjLnfuHFUEITejZIT1ZxlNbZzQlVQgXmTEAm224wA988bEXBFDx4uQVLBXHCH5n00ZRLqOvzfHTSCtTllEnDoPijPOdFteMITM9B8jNnmTk46qO6BxTAfGVZAKcK6Gr075mNkBwEB7k/RA0rg4eNkFnh3WjOyKrI3JXNHRJhKIgAJwczJ+9LkdzULvPG+9z/Dm6dvcOM9N7lz59+oKh965gTNE5pnQhKigvcgZYEQLIb9XkhN9i+IIkJE4A7JlsMAvJ3zq1/+AoCf/+wVAMrJB7C/v8rjSni1wz8c5+s6WLwKQN7exOoOLVsAnv/kJ3jxq19jXddrpHp81O584ctfvxKAR0QNb5OvQ8M/+eFL/OjlH/Dsxz83Zq0oSALNoBlJGUll/5mQVNBckIs1/V/d651T1rWeAu+g4QEA0/k7mpYXvC0Ko7Onacty985TMxARt+/+659ffByAB3dD4AQ44t3Y8/WjA+fA/UfvhnJxO96DyAxpHpTnNWJ/laE/mvwhAP+v+C9sz+VdwyQu0gAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "威锋网",
                        "url": "https://s.feng.com/index.php?srchtxt=%s",
                        "icon": "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAAAAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAsdJREFUeJyNkl1IUwEUx3+73nbVTV13zaZlsw8VIyvbSkiyeimjHtKHIkSiwCAwhIiIoIceCqJeyqIg6qUoiIigDyOKCsUinPmxMpZmpubH5pz7crve7fZQSSuIztvhnP///M//HN3zL9OaMqOyUtaRKxv4n5gKK5zrCeAtkhEe2lJ5sMTIoX4NZ6/nvwhudI0x5ZhHToaAYALMAlhLjZx+rxCORP8JVtU4LaMxxJ+58HvRF5fodvUAEI6pOIciPOkN0eSa4ONwAABRTGHu2DdGxsEPiH5ABXxe8LU5mb+mmFa3l2tBA2ORcQDMjnymvbD46SgNjgzqNy9k3/kmJjZVoNvRltDiMRh69pZdmR/YsGUbjQYrEXczL2r2I5ksrL90hsRMFGlhGYlOH9e3zyUUDPCs+R26xptPtGHPJKWLjJSXr6ehSyTDnsDVeI3RVg+WiloE5Q0dZ0+w/dVTJOsKClq6ObWn5MdK9TVbZz1ock2g5qXzYGslaeZlFNbUIWWm4r7dTn71cbKLlqDMgRa/Ad9UCDnLmGxi50iALJtI6eF6YgEV962rtB6tZdIdYu2RGkyZ6WgqqFIqx+5+IpZg9hoA6AWJiA9K9uwkz74O5+V7yGuqkB12gsEp/AGJRDydeGCadr2e665gsgJ7joC/L05QA3NhLvLyfLKKV2GwptF74y2Pqg8w8nKQac84WTmZdAz6kgkcS+eR9vELk1/B3eam8/wVoqMfSLPEsFWtIkU00n32JOEBJ4piZnN6IJnAIIkcWR3B8/gzfXe6AcguL0M0yuizC5Hte8mdb6JEjlJncrN70wp0mqZpf77roxdOTly6jyc4g6WiFoDIwHuqlic4XFuJxWya7U0yMRJVuNA8TI/OiliwGke4n4MbFVL1IrYFG7AtyPlzVrKCi68H6SnLQxIgFIVPj72cW6lhX2b5C/grvgPjZxiC9n+r/wAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "我的小书屋",
                        "url": "http://mebook.cc/?s=%s%input{Please select your cup/rare/excellent/So big, A/B/C}",
                        "icon": "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAC2AQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAX1JREFUeJylk7Gq6mAQhL8NtxMDAdu/DphKUvgCQdKr8SG08DFSWsp5gxT2FrGNIAo2thY2lkqKaKHurY4ajxzk3oGFhf2Zf2bYFdd1lf+A9d2ICO/6jwlUH0Ke+98gIvx5NzDGEEURnucBMJ/PSZKEPM9L71QVec3AGMNkMsG2bbIswxiDMYbNZkO73S4RnE6nsgIRIQxDbNtmOBwynU4BGI1GhGGI53ksFgvyPKcoCm6324NARFDVu8woigDIsozBYMDxeCTPcy6XS9mv67r6Wl9fX/qM5XKpURSpiPysd3twvV6pVqs0m00ajQbdbhfHcWi1WqRpelcMlDNQVfr9PvV6nV6vx3q9BmA2m5EkCb7vk6bp3S487cH5fGa327Hf7wmCgPF4TBAEBEFAp9MBYLvd3j8qZVCr1VRE1LIstSxL4zjWV8Rx/MO/ZVkqlUpFi6J4jQHHcfB9H4DVasXhcCjNvzMQEfnnYxKRRwYvrB8RqGr5GlW1lPAn+Asf+sooQi/6SwAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "B-OK",
                        "url": "http://b-ok.xyz/s/?q=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEN0lEQVR4nOWWTWxUZRSGn3O/+W3Lj7VtaGlri1UUBEy6IPEnRBMTiYFVW6MmJmDUGHDjlo3EpRsTDQmJUSORhYCYYnDhQkCNhJ8FhM4ChKFUBEMJUjrTzsz9vuPiOkOnc6ftlKILz2Ly5TvvOe97zz2578D/PaTWgp7D5+PxTKxXPdoEbUc9dWovR9T83tjceeboc+IvuIDH96U3esIWlD5EZqlRpyq7UftFauDhE/cmQFWe2H+lV8X9CNIwF7GlUrgRcaw/O9CVnpeAtQd+a7EaGQFitRBXCFH+Wqxe2/GBzomwvBd2ufLb4TbfmV33Sg4gwtIxse+v/fJafWh++kWwZNGJsHetxR+pLJwpB6Cq2VR/d4WIigkkMtHXiuRWwVfFE0gYoSluaEka6iMSEN7lpCHi0ZI0NCUMES/I+6o4LU5C6lZ9PfzMjBNYvT/9Ccg2gJgn/LK5g4SREmjCKqpQFwluPjs/RmvSsLGjHqeQ9R1RT4ibIO8UxgqOpw+NIMEUfFS3pwZW7C5yRsrHJP0ioApL4x5JI1wcKzB4ZZw/sparGR+nyprGOM8uS7L10cUAHLw8zrHrE4xkfOojwuoH4rTWGV5sr6c5YYh5QsEpIhJR4U2gUsCaAyPtTm1LcaweglXlw7O3+PnP8gU+dyvPngtjpPq6uJmz7Dh1E2/KLE+P5gDIW+WNlUvKxixI70OfpxPDW7onYcoOOLXrp7+fqhsFiAhOFasaDijWh0Rysekpnj2A3sGrdapsm3uL2hDTwzj7VpmAfME1gnbW3GmWqC5NHuk5fD5eEmCt60JYtuACqikQ7TH5+IMlARiNCWJCsQutCkAlavJ+pCRA8O4o5EKx90OAaCaGnSgJUMst0PH7wVUlbrrJRdmSgNRQxyVROfrv8cuhs6+3ZkoC2ClOhV9nK1OCr2S1nNPq+XKwniweS1/CzB39tGGRfDwV5wEvLK9jU2c9jf8YkRG4lrWcHJ0MGgjseLKRtY0xmhIG38H1CZ/RSUtzMnSvGervPlI8TzOjyzkgpkBzwnDkpfaywpwN3C051Q0VPAmePmcD5yyaUTHWfTOMvTuZ60N9Xa0VEwBw6Mse7BGkYXTS8tTgCDmnZH1FUYq+qChLooafNrWT9ZUN3wW4qXlBWBQVBCmRK5p2YjZP5SwTUKgrfB/Pxr4C3ga4XXAIEDxQuaWMFxzvHb/B7bzDV4hIeR4g4yugpUpP5aNUX+c5KpDTYtW+9EURWRGWm3cox4b6uzZMvw79T6jCu6qMLCD9Cet5tZvd6n3pHxCeBwkVOmsoOYS9Q31dW6tBZmwc1cKrKB/Mj1wVZXsiFt0+E2xOXtO7+1Q009S0xii7FB4TWBLKCTdE9YyqeSc11HGJneJm612T2a07mF6a93WlIK8g0iFKmwqKckUg7am3N5YwF09vXp6tpe9/Gn8DQrStezS4ePUAAAAASUVORK5CYII="
                    },
                    {
                        "name": "数字图书馆",
                        "url": "https://zh.b-ok.cc/s/?q=%s",
                        "icon": "https://zh.b-ok.cc/favicon.svg"
                    },
                    {
                        "name": "努努影院",
                        "url": "https://www.nunuyy1.org/so/%s-%s--.html"
                    },
                    {
                        "name": "77影院",
                        "url": "https://www.77zyy.com/vodsearch.html?wd=%s",
                        "icon": "https://www.77zyy.com/template/vfed1/asset/img/favicon.png"
                    },
                    {
                        "name": "美剧天堂",
                        "url": "https://www.meijutt.net/sousuo/index.asp%p{searchword=%s}",
                        "charset": "GBK"
                    },
                    {
                        "name": "哔咪动漫",
                        "url": "https://www.bimiacg4.net/vod/search/%p{wd=%s}",
                        "description": "哔咪哔咪,火影忍者,海贼王,这里是兴趣使然的无名小站_bimibimi"
                    },
                    {
                        "name": "💞 AV预览啰嗦版",
                        "url": "showTips:let javbus='https://www.javbus.com';let avid='%sr.replace(/^(\\w+?)[\\-_]?(\\d+)$/,\"$1-$2\")';let avDatas=await storage.getItem(\"avDatas\");if(!avDatas)avDatas=[];let url=javbus+'/'+avid;let genehtml=(title,img,labels)=>`<span style='font-size:22px;line-height:1.2;'>${title}</span><br/><p style=\"margin: 0;\">${(labels || []).reduce((result, label)=>`${result}<mark style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">${label}</mark>`, '')}</p><img src='${img}' referrerpolicy='no-referrer'/>`;let d=avDatas.find(avData=>avData.id==avid);if(d)return [genehtml(d.title, d.img, d.labels),url];let doc=await fetch(url).then(r=>r.text()).then(r=>{let doc=document.implementation.createHTMLDocument('');doc.documentElement.innerHTML=r;return doc;}).catch(alert);let title=doc.title;let img=doc.querySelector('a.bigImage>img');let labels=[];doc.querySelectorAll(\".genre a\").forEach(a=>labels.push(a.innerText));if(!img)return;img=javbus+img.getAttribute('src');avDatas.push({id:avid,title:title,img:img,labels:labels});if(avDatas.length>20)avDatas.shift();storage.setItem(\"avDatas\",avDatas);return[`${genehtml(title,img,labels)}`,url];",
                        "kwFilter": "^[0-9a-zA-Z]+[\\-_]?\\d+$"
                    },
                    {
                        "name": "💲美元转人民币啰嗦版",
                        "url": "showTips:let usd2rmb=await storage.getItem(\"usd2rmb\");let usd2rmbUpdate=await storage.getItem(\"usd2rmbUpdate\");if(!usd2rmbUpdate || usd2rmbUpdate > Date.now()+3600000){usd2rmb=await fetch(`https://api.exchangerate.host/convert?from=USD&to=CNY&amount=1`).then(r=>r.json()).then(r=>r.result).catch(alert);storage.setItem(\"usd2rmb\",usd2rmb||7);storage.setItem(\"usd2rmbUpdate\",Date.now());}let usd=\"%sr\".replace(/\\D/g,\"\"); let rmb=(usd * parseFloat(usd2rmb||7)).toFixed(2);return [`${usd} USD = ${rmb} RMB`,rmb]",
                        "kwFilter": "\\d\\$|\\$\\d"
                    },
                    {
                        "name": "🔆  高亮关键词",
                        "url": "javascript:(function()%7Bvar%20count=0,text,dv;text=prompt(%22%E6%90%9C%E7%B4%A2%E9%85%B1%EF%BC%9A%E8%AF%B7%E8%BE%93%E5%85%A5%E9%AB%98%E4%BA%AE%E5%85%B3%E9%94%AE%E8%AF%8D%EF%BC%8Calt%E5%B7%A6%E9%94%AE%E5%8D%95%E5%87%BB%E4%B8%8B%E4%B8%80%E4%B8%AA%EF%BC%8Calt%E5%8F%B3%E9%94%AE%E4%B8%8A%E4%B8%80%E4%B8%AA%EF%BC%8Cr%E8%BF%98%E5%8E%9F%EF%BC%8Cc%7C%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%86%E9%9A%94(%E7%AB%96%E6%9D%A0)%EF%BC%8Co%E5%8E%9F%E5%A7%8B%E6%96%87%E6%9C%AC:%22,%20%22%S%22);if%20(text==null%7C%7Ctext.length==0)return;if(text===%22r%22)%7B%5B%5D.forEach.call(document.querySelectorAll(%22mark.searchJumper%22),mark=%3E%7Blet%20newNode=document.createTextNode(mark.innerText);mark.parentNode.replaceChild(newNode,mark);%7D);return;%7Dif(text.indexOf(%22o%22)===0)%7Btext=%5Btext.substr(1)%5D;%7Delse%20if(text.indexOf(%22c%22)===0)%7Btext=text.substr(1);text=text.substr(1).split(text.substr(0,1));%7Delse%20text=%5Btext%5D;dv=document.defaultView;let%20marks=%7B%7D;let%20focusMark;function%20setFocus(ele)%7BfocusMark.style.border=%22%22;focusMark=ele;focusMark.scrollIntoView(%7Bbehavior:%22smooth%22,block:%22center%22,inline:%22nearest%22%7D);focusMark.style.border=%222px%20dashed%20red%22;%7Dfunction%20searchWithinNode(node,te,len)%20%7Bvar%20pos,skip,spannode,middlebit,middleclone;skip=0;if(node.nodeType==3)%7Bpos=node.data.toUpperCase().indexOf(te);if%20(pos%3E=0)%20%7Blet%20index=marks%5Bte%5D.length;spannode=document.createElement(%22mark%22);spannode.className=%22searchJumper%22;spannode.addEventListener(%22mousedown%22,e=%3E%7Bif%20(!e.altKey)return;if(e.which===1)%7Bif(index!=marks%5Bte%5D.length-1)%7BsetFocus(marks%5Bte%5D%5Bindex+1%5D);%7D%7Delse%20if(e.which===3)%7Bif(index!=0)%7BsetFocus(marks%5Bte%5D%5Bindex-1%5D);%7D%7D%7D);spannode.addEventListener(%22click%22,e=%3E%7Be.stopPropagation();e.preventDefault();return%20false;%7D);middlebit=node.splitText(pos);middlebit.splitText(len);middleclone=middlebit.cloneNode(true);spannode.appendChild(middleclone);middlebit.parentNode.replaceChild(spannode,middlebit);marks%5Bte%5D.push(spannode);focusMark=spannode;++count;skip%20=%201;%7D%7D%20else%20if%20(node.nodeType==1&&node.childNodes&&node.tagName.toUpperCase()!=%22SCRIPT%22&&node.tagName.toUpperCase()!=%22STYLE%22&&node.tagName.toUpperCase()!=%22MARK%22)%7Bfor%20(var%20child=0;child%3Cnode.childNodes.length;++child)%7Bchild=child+searchWithinNode(node.childNodes%5Bchild%5D,te,len);%7D%7Dreturn%20skip;%7Dtext.forEach(t=%3E%7Bt=t.toUpperCase();marks%5Bt%5D=%5B%5D;searchWithinNode(document.body,t,t.length);%7D)%0A%7D)();"
                    },
                    {
                        "name": "将svg图片复制为base64",
                        "url": "javascript:(()=>{let svg=window.targetElement&&window.targetElement.querySelector('svg');if(svg){navigator.clipboard.writeText('data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(svg)))));alert(\"copy over!\")}})()"
                    }
                ]
            }
        ];
        break;
    default:
        sitesConfig = [
            {
                "type": "Image",
                "icon": "image",
                "sites": [
                    {
                        "name": "Google image",
                        "url": "https://www.google.com/search?q=%s&tbm=isch",
                        "match": "www\\.google\\..*tbm=isch"
                    },
                    {
                        "name": "Bing image",
                        "url": "https://www.bing.com/images/search?q=%s"
                    },
                    {
                        "name": "Pixiv",
                        "url": "http://www.pixiv.net/search.php?word=%s"
                    },
                    {
                        "name": "Flickr",
                        "url": "http://www.flickr.com/search/?q=%s"
                    },
                    {
                        "name": "Pinterest",
                        "url": "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
                    },
                    {
                        "name": "Yandex image",
                        "url": "https://yandex.com/images/search?text=%s"
                    },
                    {
                        "name": "Pixabay",
                        "url": "https://pixabay.com/images/search/%s/",
                        "icon": "https://pixabay.com/favicon-32x32.png"
                    },
                    {
                        "name": "Unsplash",
                        "url": "https://unsplash.com/s/photos/%s"
                    },
                    {
                        "name": "500px",
                        "url": "https://500px.com/search?q=%s"
                    },
                    {
                        "name": "Deviantart",
                        "url": "https://www.deviantart.com/browse/all/?q=%s"
                    },
                    {
                        "name": "Search GIF by ChatGPT",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&[class*\\='ChatMessageInputContainer'] textarea=hey ChatGPT. hope you're having a great day. From now on you will respond to anything I say with the perfect gif response. Once you know what gif you want to use, compile the most accurate and perfect search phrase that will result in the specific gif you want to send. respond with url: \" Sure, I'm happy to help you!\\n http://scythe-spot-carpenter.glitch.me/search?search_term\\=.gif \n%s&click(button[class*\\='ChatMessageSendButton_sendButton'])}"
                    }
                ]
            },
            {
                "type": "Video",
                "icon": "video",
                "sites": [
                    {
                        "name": "Youtube",
                        "url": "https://www.youtube.com/results?search_query=%s"
                    },
                    {
                        "name": "Niconico",
                        "url": "http://www.nicovideo.jp/search/%s"
                    }
                ]
            },
            {
                "type": "News",
                "icon": "newspaper",
                "sites": [
                    {
                        "name": "Google News",
                        "url": "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
                        "icon": "https://www.google.com/favicon.ico"
                    },
                    {
                        "name": "CNN",
                        "url": "https://edition.cnn.com/search/?q=%s"
                    },
                    {
                        "name": "BBC",
                        "url": "https://www.bbc.co.uk/search?q=%s"
                    }
                ]
            },
            {
                "type": "Translate",
                "icon": "language",
                "sites": [
                    {
                        "name": "DeepL",
                        "url": "https://www.deepl.com/translator#*/en/%s",
                        "icon": "https://www.deepl.com/img/favicon/favicon_96.png"
                    },
                    {
                        "name": "Google translate",
                        "url": "https://translate.google.com/?text=%s",
                        "match": "translate\\.google\\.com.*\\btext="
                    },
                    {
                        "name": "Bing translate",
                        "url": "http://www.bing.com/dict/search?q=%s"
                    },
                    {
                        "name": "Forvo",
                        "url": "https://www.forvo.com/search/%s"
                    },
                    {
                        "name": "Translate with ChatGPT",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&[class*\\='ChatMessageInputContainer'] textarea=Please help me to translate \\`%s\\` to English, please return only translated content not include the origin text&click(button[class*\\='ChatMessageSendButton_sendButton'])}"
                    }
                ]
            },
            {
                "type": "Develop",
                "icon": "code",
                "sites": [
                    {
                        "name": "MDN",
                        "url": "https://developer.mozilla.org/zh-CN/search?q=%s"
                    },
                    {
                        "name": "Stackoverflow",
                        "url": "https://stackoverflow.com/search?q=%s"
                    },
                    {
                        "name": "Can I Use",
                        "url": "http://caniuse.com/#search=%s",
                        "icon": "https://caniuse.com/img/favicon-128.png"
                    },
                    {
                        "name": "GitHub",
                        "url": "https://github.com/search?utf8=✓&q=%s",
                        "match": "https://github\\.com/search\\?.*&q="
                    },
                    {
                        "name": "W3c",
                        "url": "http://www.runoob.com/?s=%s"
                    },
                    {
                        "name": "GreasyFork",
                        "url": "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓",
                        "icon": "https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png"
                    },
                    {
                        "name": "Gen RegExp by AI",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&textarea[class^\\='ChatMessageInput']=Can you help me to write a RegExp which can detect %input{Target,Email address/Phone number} on `%s`&click([class^\\='ChatMessageInputView_sendButton']>button)}",
                        "openInNewTab": true
                    }
                ]
            },
            {
                "type": "Wiki",
                "icon": "book-open-reader",
                "sites": [
                    {
                        "name": "Wikipedia",
                        "url": "http://en.wikipedia.org/wiki/%s",
                        "description": "The largest and most-read reference work in history.#wiki"
                    },
                    {
                        "name": "Quora",
                        "url": "https://www.quora.com/search?q=%s"
                    }
                ]
            },
            {
                "type": "Social",
                "icon": "users",
                "sites": [
                    {
                        "name": "Twitter",
                        "url": "https://twitter.com/search?q=%s"
                    },
                    {
                        "name": "Facebook",
                        "url": "https://www.facebook.com/search/results.php?q=%s"
                    },
                    {
                        "name": "V2ex",
                        "url": "https://www.sov2ex.com/?q=%s",
                        "icon": "https://sov2ex.oss-cn-shanghai.aliyuncs.com/assets/favicon/apple-icon-57x57.png"
                    }
                ]
            },
            {
                "type": "APP",
                "icon": "archive",
                "sites": [
                    {
                        "name": "Play",
                        "url": "https://play.google.com/store/search?q=%s"
                    },
                    {
                        "name": "Coolapk",
                        "url": "https://www.coolapk.com/search?q=%s"
                    },
                    {
                        "name": "Apkpure",
                        "url": "https://apkpure.com/cn/search?q=%s"
                    },
                    {
                        "name": "APKMirror",
                        "url": "https://www.apkmirror.com/?s=%s"
                    },
                    {
                        "name": "Chrome Store",
                        "url": "https://chrome.google.com/webstore/search/%s",
                        "icon": "https://www.google.com/images/icons/product/chrome_web_store-32.png"
                    }
                ]
            },
            {
                "type": "Music",
                "icon": "music",
                "sites": [
                    {
                        "name": "Jango",
                        "url": "https://www.jango.com/music/%s",
                        "icon": "https://s1.cdn107.com/assets/logos/jango/favicon-32x32-2d45face09da6b62b25031d8b9afeefc9274656a5a969c75e6afc644bf85eb96.png"
                    },
                    {
                        "name": "QQ Music",
                        "url": "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
                    }
                ]
            },
            {
                "type": "Shopping",
                "icon": "shopping-cart",
                "sites": [
                    {
                        "name": "Amazon",
                        "url": "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s",
                        "icon": "https://www.amazon.cn/favicon.ico"
                    },
                    {
                        "name": "1688",
                        "url": "https://s.1688.com/selloffer/offer_search.htm?keywords=%s"
                    }
                ]
            },
            {
                "type": "E-book",
                "icon": "book",
                "sites": [
                    {
                        "name": "Jiumodiary",
                        "url": "https://www.jiumodiary.com/#p{#SearchWord=%s}",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABi0lEQVR4nJ2VsU4CQRRFzy66GCtLrWysjMbEyi+wNFHBmGDpH1jYWJtAq5WxpoFEorXxB6xs1CBBI4WJVhpNoPBayMAuuzOw3FcwvMe5eTOzy0OYIGCHMk3ayBJf3FMmTxCieotN6lZwMOpsRQzIUBwZNlEk0zdIjwtR7BqQGwsXIicg4HVsgxYBFGzlGS1pepjFHlSSCiUZ/ehQS9rVerJB1eOZeUKapINNXjz14jMbzdhxWImn5oi2dCa3FuObCH85HoJL0o3mIgYeMt0o3qBVbaZ659LlfpOOyCHza5/ewsPjKJXJv0L7ORjhDIwSDnGi+/kxAv6QfAsIvY+At5SxGSxbkEshtKqanpS1PwcmGgN4xfE6hZ4DowXqlitLkh9PlVJe42e8rYvIBr4dG6ANj0mF/ZBBw2Xw7HOX1NY5Hlfd9b2r/1ufmq22gcc18OYyqA39U53Smr3aIosg7zJwRt4MltJYeEn0R9tJavw0NNqEYDvVcM31uH6WgAJVmnSsYIcmVQrh8f4HufpcPqh3SFcAAAAASUVORK5CYII=",
                        "match": "https://www\\.jiumodiary\\.com"
                    },
                    {
                        "name": "Forfrigg",
                        "url": "http://forfrigg.com/#gsc.tab=0&gsc.q=%s&gsc.sort=",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFQUlEQVR4nMWXT4tlSRHFfxGZee97VdXaOroRBuYbCLpwIaMtbl26Ety7HETQxegX8A8uXLkVP4AwMAgiyKCCqMwoCuKgojjWOI12t1317s3MiHCRr9rpnq56U90LAx6XR76XcfJEnBM3JSIE4DOf/9IL6Y2ffuve2Y6LyCmRn7vF04aKnIvw4kvf+8a3H12TiBAR0U/futU/9fzH+N1vXuPDH/kob56e8tvXfs1nv/JdTDMybZimmQCSCN0DiWA7ZwDWZuSkuEE1Y8qJtXUc+Nvrf+DVV37sL3//m1NE+NsB5ItnRPCn1//I7dtv8de//Jnbt98C4Pf/+A+hGc2NMjdUhGrGunSmOdOqkbPSu7OZM0vttOZMRUmq7JbOsx98jpKT7vPVh9h55Dm+qCIiAIRDb8E8JZII5kavDiIUVUpO4+QetOZYD25sC/OUWKshArUaIvqOPJcCeKhGCtOcuH/ecIIIcAIBzpZKSoIIEFBbZypK92C3jOQi+/VL8lya+CLWarQ26AVwBxxKUXJSlrXjBkiwmQvzlDk7b8yTgkBrRsTl++fLl/YIdX88oHdn7UYQrIuBQskJc8Mddkuj5oQq1OpMKdHE2WwuT3OQARVISVHAAsKCpON0SZXWjW6BR5BzorcOIkgSlto4OS7Uak8OYLd0rAUhMGfh5o2ZIPAY/eEetOqEQ107200ZElwac8ncvbcOwJfEwRLklEhFqatRNoV791dKSeRkJBGON4W1GggIwm7p5KxsN4XajHnKXJTwiRjo3tktFSMwC3IRWuu4D4nulqGOpEJtxnaT6N1Y1g4hIOBP04RzzsxHE0uH6UgokanitO4jcUrjJCIcbTIEnBxPuAVLNVRGoz4xgJITZpCTEAFrdcwckSBrwnHMRj/U1QenaxCM/4gIu6Veuv/BEpwtjbPdikdQu9PMSVmYS2K3jnqHBOFjXYDaHLOg9+B8167c/7AMFTZTZlk6WYWswhgnylwUAqaUEFGmSShJOd4WFCEnmKe0b8THx2EVqGI+ZoGKoCr05qzRcGNvw0LrRm3BWV9JIsxTwh26Ofo2L742AE1KUqEFnC2dpELKwpQTZ2vHHMw6qso8Cds5YR7kJKzNqdWxhyfw9QC4GVOZmEomNOPuRATNgqJK7cZcEq0HhLP04HibaT0oScknBb9ChwcBIEK3YLHG0VHBI8Y7QbNhQONHlCQESgnHA5KCuUOMGXJZHGxCsxhzwIKIQBDOzitTVt57Y0JEhkSB3hxNym7XHshQk1zpAwcBjLnfuHFUEITejZIT1ZxlNbZzQlVQgXmTEAm224wA988bEXBFDx4uQVLBXHCH5n00ZRLqOvzfHTSCtTllEnDoPijPOdFteMITM9B8jNnmTk46qO6BxTAfGVZAKcK6Gr075mNkBwEB7k/RA0rg4eNkFnh3WjOyKrI3JXNHRJhKIgAJwczJ+9LkdzULvPG+9z/Dm6dvcOM9N7lz59+oKh965gTNE5pnQhKigvcgZYEQLIb9XkhN9i+IIkJE4A7JlsMAvJ3zq1/+AoCf/+wVAMrJB7C/v8rjSni1wz8c5+s6WLwKQN7exOoOLVsAnv/kJ3jxq19jXddrpHp81O584ctfvxKAR0QNb5OvQ8M/+eFL/OjlH/Dsxz83Zq0oSALNoBlJGUll/5mQVNBckIs1/V/d651T1rWeAu+g4QEA0/k7mpYXvC0Ko7Onacty985TMxARt+/+659ffByAB3dD4AQ44t3Y8/WjA+fA/UfvhnJxO96DyAxpHpTnNWJ/laE/mvwhAP+v+C9sz+VdwyQu0gAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "Library Genesis",
                        "url": "http://gen.lib.rus.ec/search.php?req=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADfElEQVR4nM2XQWgbRxSGv5SFncNSDXQhexB4aQUVRhARDBFOwSEt2PRSU3pI6CFJL8mtLTmEnEoOxYRSQm/pLaE15FCa9NCSQy+FYmQwRQFTVmCCAqJsQIQR7GEWBtrDaFeqsaVdieI+GObtaPa9f2b+9+/o1KtXvb85QXvtJJP/LwA4ZSbv7Bsu33mEEIJACgJfUl+SrDVDLja9uQCcKsuBW/f3ebD9G3gC9Hg8CCs8/uoSb/qmFIDSR3D3RgNZPW0fPEDYFkcv+Wa7XTbcfBy4sBKCBikrBIFtSMHTvV7pWKWPYNJel9XcV0oT9RXL1XJHUJiEz2OHXqyIlUYbjdaA6ZMaS4SKZ0mplGC1UZzbhWaeufYDcX9oHwxgtO2zt3NfWE44sPXpOp9sVI+I9m8rdAQ7keHy7UdonYJwbcIMfpbcpIBr/SRFBhW63300E0AhEq7WHe7d2rBlZwBS+0PmG8Bxx2MCtNZHRJoTAMCHLZ9mawl0apOZ1LYESFIYDG2v7VgYyEJxSynhlXebdJ5281VKv0IYSKQnEA5oA/FAEUUv2VyrF4pZugy/eLC/kPQuDCCzP/sO8cCWpUo0w0QjRvvpCoEUEPhyJtCZR/BLO2E36tHpxvQGGqUUOhkRT2twxHhyXhHjcem7PL539ViBmroD17/e48n3u1bzHWGDZ5Az1h9ejjnUD4a03nmbn7beOzLH1B349uYKwRuC+9u74LnjWp80M1kV2VgGwgVP0IvVsTlmluGdqw1ufHwOBlnyUfnlySdAOIz6CbHCVsfcADIQuQbAeMWOa0GJETCyXZoAZCD05WIAALauXxh57pgLJp0QIcYA9chPUhhoNs6Fx8YtLERnaw71xhLRXjcnpAwqNGsBzbcClqqS0JdIKZCeQCWaqBfzoq/4/FJtcQAAV9brPEw0G2t11lshZ2tHvW7Y2Y9ZbXgsV33AnxpzoQvJYfvx9wEPf+7Q/rXLZzfXuT1l5ZmV2oFJex479AaKZwcx7WcxnShGxUMb0RMoVexrWBjAX8rj2pdP7I1Ia5QaES9TPYHVCgdQKULMCFgWgEo0nb0XNhHYMvMgr4r8nmA1YG0lLBS3cBkuVw1B7TRkWzspRnp8DyAesrl5houNYl/LUiT848Bwd7tNdBATJzpXO+kJAl9QDwM+OB/yfms68+cG8F/Yif85/QdlMHLuJQQjHQAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "B-OK",
                        "url": "http://b-ok.xyz/s/?q=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEN0lEQVR4nOWWTWxUZRSGn3O/+W3Lj7VtaGlri1UUBEy6IPEnRBMTiYFVW6MmJmDUGHDjlo3EpRsTDQmJUSORhYCYYnDhQkCNhJ8FhM4ChKFUBEMJUjrTzsz9vuPiOkOnc6ftlKILz2Ly5TvvOe97zz2578D/PaTWgp7D5+PxTKxXPdoEbUc9dWovR9T83tjceeboc+IvuIDH96U3esIWlD5EZqlRpyq7UftFauDhE/cmQFWe2H+lV8X9CNIwF7GlUrgRcaw/O9CVnpeAtQd+a7EaGQFitRBXCFH+Wqxe2/GBzomwvBd2ufLb4TbfmV33Sg4gwtIxse+v/fJafWh++kWwZNGJsHetxR+pLJwpB6Cq2VR/d4WIigkkMtHXiuRWwVfFE0gYoSluaEka6iMSEN7lpCHi0ZI0NCUMES/I+6o4LU5C6lZ9PfzMjBNYvT/9Ccg2gJgn/LK5g4SREmjCKqpQFwluPjs/RmvSsLGjHqeQ9R1RT4ibIO8UxgqOpw+NIMEUfFS3pwZW7C5yRsrHJP0ioApL4x5JI1wcKzB4ZZw/sparGR+nyprGOM8uS7L10cUAHLw8zrHrE4xkfOojwuoH4rTWGV5sr6c5YYh5QsEpIhJR4U2gUsCaAyPtTm1LcaweglXlw7O3+PnP8gU+dyvPngtjpPq6uJmz7Dh1E2/KLE+P5gDIW+WNlUvKxixI70OfpxPDW7onYcoOOLXrp7+fqhsFiAhOFasaDijWh0Rysekpnj2A3sGrdapsm3uL2hDTwzj7VpmAfME1gnbW3GmWqC5NHuk5fD5eEmCt60JYtuACqikQ7TH5+IMlARiNCWJCsQutCkAlavJ+pCRA8O4o5EKx90OAaCaGnSgJUMst0PH7wVUlbrrJRdmSgNRQxyVROfrv8cuhs6+3ZkoC2ClOhV9nK1OCr2S1nNPq+XKwniweS1/CzB39tGGRfDwV5wEvLK9jU2c9jf8YkRG4lrWcHJ0MGgjseLKRtY0xmhIG38H1CZ/RSUtzMnSvGervPlI8TzOjyzkgpkBzwnDkpfaywpwN3C051Q0VPAmePmcD5yyaUTHWfTOMvTuZ60N9Xa0VEwBw6Mse7BGkYXTS8tTgCDmnZH1FUYq+qChLooafNrWT9ZUN3wW4qXlBWBQVBCmRK5p2YjZP5SwTUKgrfB/Pxr4C3ga4XXAIEDxQuaWMFxzvHb/B7bzDV4hIeR4g4yugpUpP5aNUX+c5KpDTYtW+9EURWRGWm3cox4b6uzZMvw79T6jCu6qMLCD9Cet5tZvd6n3pHxCeBwkVOmsoOYS9Q31dW6tBZmwc1cKrKB/Mj1wVZXsiFt0+E2xOXtO7+1Q009S0xii7FB4TWBLKCTdE9YyqeSc11HGJneJm612T2a07mF6a93WlIK8g0iFKmwqKckUg7am3N5YwF09vXp6tpe9/Gn8DQrStezS4ePUAAAAASUVORK5CYII="
                    }
                ]
            },
            {
                "type": "Download",
                "icon": "download",
                "sites": [
                    {
                        "name": "ThePiratebay",
                        "url": "https://thepiratebay.org/search/%s",
                        "icon": "data:image/jpeg;base64,AAABAAEAEBAAAAAAIAA2AgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgCAAAAkJFoNgAAAf1JREFUeJx9kj9r8nAQxy8xLQatGmPtIoiigoKCoAZHyeQutEtBHHRpl7yELq6+AP+8AIcWOxURQRzMIDhEyeLilIKDQYUg+eWeIT48VujzWe4Ovtzd9zgKEeEvl/kVFEXZCWMHVVUlSTIMg6bpK6ndpV6vPz4+nmtE7Pf7v/W2qVQqtvI8gWHOyc3NDSGE4zhCyH6/BwDLshDx9vbWFvxYIJ1Oz+fz5+fnXq8ny3KtVnt/f282m5f2mMtFWZblef50Or2+vjqdTtM0X15eFEWx5/zzhIjtdtsuvV7v5cy7uzuHwwEAhULhdDoh4vVNdF0Ph8MulwsAEomEYRiEEAA4Ho9nD8vlUpIk0zTtToIg5PN5n88HAMViURAEjuMAIBgMMgxDCKHG43GpVHp7e3O73Q8PDxzHHQ4H0zTtVVmWpWmapulcLjcYDKbTKTMcDgFgPB5blhWJRDKZjCiKqVTKPvRut1utVqqqdrvdVquVTqepr6+vz89PRVEajcZiseh0OtvtNhAIxONxTdMMw4jFYqFQ6Pv7W9M0QgiFiJqmJZNJn88XjUbv7+89Hk8ikbAsS5ZlVVV5ns9msx8fH6IoVqtVQMT9fu/3+yVJ0nUdf6Lr+mQyeXp6AoDZbIaIgIimaY5Go+12i7+w2WzK5fJ6vUZE6j8vfQki2h/+B8UpLqpv9VygAAAAAElFTkSuQmCC"
                    },
                    {
                        "name": "Google cse",
                        "url": "https://cse.google.com/?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q",
                        "icon": "https://www.google.com/favicon.ico"
                    },
                    {
                        "name": "BTDigg",
                        "url": "https://btdig.com/search?q=%s"
                    },
                    {
                        "name": "Btsow",
                        "url": "https://btsow.com/search/%s",
                        "icon": "https://btsow.bar/app/bts/View/img/favicon.ico",
                        "match": "btsow\\."
                    },
                    {
                        "name": "Torrentkitty",
                        "url": "https://www.torrentkitty.app/search/%s"
                    },
                    {
                        "name": "Idope",
                        "url": "https://idope.se/torrent-list/%s",
                        "icon": "https://idope.se/static/search/pc/img/favicon.ico"
                    },
                    {
                        "name": "limetorrents.co",
                        "url": "https://www.limetorrents.co/search/all/%s"
                    },
                    {
                        "name": "limetorrents.asia",
                        "url": "https://www.limetorrents.asia/search/all/%s"
                    },
                    {
                        "name": "limetorrents.pro",
                        "url": "https://www.limetor.pro/search/all/%s"
                    },
                    {
                        "name": "Cdsoso",
                        "url": "https://www.cdsoso.cc/searches-%s-hot-1-null.html"
                    },
                    {
                        "name": "Sub HD",
                        "url": "https://subhd.la/search/%s",
                        "icon": "https://img.huo720.com/favicon-32x32.png"
                    },
                    {
                        "name": "Subscene",
                        "url": "https://subscene.com/subtitles/searchbytitle:p{query=%s}"
                    },
                    {
                        "name": "R3SUB",
                        "url": "https://r3sub.com/search.php?s=%s"
                    }
                ]
            },
            {
                "type": "Porn",
                "icon": "female",
                "sites": [
                    {
                        "name": "JAVlibrary",
                        "url": "http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=%s",
                        "icon": "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAA3AQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAP5JREFUeJylkzFKBDEUhr+3SQZdF8vFxmobwT2AtXgHCzsbQbyANuJVbLyAnR7BTlFBrGwUsRBcGdckz2JFd5zMzA7+Vf6Q9+XPSyIfc2fKP9RJznYNZncZpBkgpQQC2fvGjx3Pn7dLIP2seds6gD6N0YccgHj63AiwpQSrPbCC374injy2BHQN7mJtMnbp/v5VYZXZXPo1ruIKsg6yspAGYKeKTBpgj4fo7WgGQEUAffksllQC+g73uk7YukRHAfGKRiXs3dQApurtwYBwdI8Me4gAi5a4f1c+UjroROZwUPAhASj2II/w5iEP4PXbB/zOdeWTLv+FlprttdToC7F9R7urpLwHAAAAAElFTkSuQmCC"
                    },
                    {
                        "name": "JAVbus",
                        "url": "https://www.javbus.com/search/%s",
                        "icon": "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAMxWAADM2wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzNsAAMxWAADM2wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM2wAAzP8AAMz/AADM/wAAzP8AAMz/AADL/wAAzP8BAcz/AADL/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/BATN/0VF2v+Jief/kZHp/15e3/8PD8//AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADL/0hI2v/q6vv//Pz+//b2/f/6+v7/iIjn/wUFzf8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wEBzP+YmOr//////4uL6P9LS9v/4eH5/9zc+P8dHdL/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8CAsz/Skrb/39/5v8oKNT/DAzO/7+/8v/t7fv/Li7V/wAAy/8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAy/8AAMz/AADM/w0Nz/++vvL/7e38/zAw1v8AAMv/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8NDc//vr7y/+3t+/8wMNb/AADL/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/DQ3P/76+8v/t7fv/MDDW/wAAy/8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/w0Nz/++vvL/7e37/zAw1v8AAMv/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8NDc//urrx/+jo+v8vL9X/AADL/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/BATN/0BA2f9QUNz/EBDP/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMv/AADL/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzNsAAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzNsAAMxWAADM2wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzP8AAMz/AADM/wAAzNsAAMxWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
                    },
                    {
                        "name": "Jable",
                        "url": "https://jable.tv/search/%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4jWP4m9xX9y+p9+e/pL7/pOHen3+T++oYyNMMxz8ZKND8/19S33/CBmRM+v9v3dH//5qWkmlA/vT///////9v8d5RAxbvoacByf0IdvcaiAEzt5FgwPxd//89efP/351n////+v3//5uP///lTCXBgKKZkEDbcOz/vwW7///LnUZBSiSAKcxMvT8ZyM/OfT//J/fVAQB8gvyNVegtUAAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "PornHub",
                        "url": "https://cn.pornhub.com/video/search?search=%s",
                        "icon": "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABorAAACAwAAwP8AAG+5AAA0VgAAUYkAAInkAAA/aQAAMFEAAJf/AABZlAAAmv8AAGSnAAAaLAAAERwAAKP/AABHZAAABAcAAC0xAACp/wAArP8AALL/AABDcAAAbowAAI/uAAAKEAAAht4AALv/AAAtSwAAiOEAAI3sAACV/wAAmP8AAJv/AAABAQAAnv8AAHrHAABlpwAA//8AAND/AACh/wAAiOIAAC9PAABqsgAApP8AAEVkAABJegAAp/8AADFSAACq/wAAGSoAAAECAACt/wAAM1UAAIjjAAA+aAAAfcgAALb/AAAdMAAAT4MAADpjAABAawAAuf8AAAsQAAC//wAAAAYAAML/AAADBgAACQ4AAMX/AACW/wAAmf8AADdcAACc/wAAn/8AABAcAABRhwAAov8AAIXdAADX/wAAqP8AAKv/AACQ8AAAWI0AAC5NAACx/wAAIEMAALT/AACF3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISAxISEhISCIiSEgMIkhICkpWLSBIIUg1MEcgEDUiCk4ZCAQUSCQiMTwUNQ0xHxBSTwAvQ0sQSgAzWBw4AFkyUSoABjpOPykANihQCwA3UVEHAjRCRVQyD0wuETs0B1FRNyNVGAkAJh0CGkASAgdRUR4ALCdOAD0BVUFGTQA3UVIbAEQTAAA5AA4/Az4AWTJOUxcFV0klNSs8FDUNMR8QCkoWFhZYNSEVMEcgEDUiCkhIDAwMSEhIIiJISAwiSEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
                    }
                ]
            },
            {
                "type": "Search",
                "icon": "search",
                "sites": [
                    {
                        "name": "Google",
                        "url": "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
                        "match": "https://www\\.google\\..*/search",
                        "charset": "utf-8",
                        "keywords": "textarea[name='q']",
                        "shortcut": "g",
                        "alt": true
                    },
                    {
                        "name": "Google advanced",
                        "url": "https://www.google.com/search?q=%s%input{Filetype, filetype:doc/ filetype:ppt/ filetype:xls/ filetype:pdf}%input{Limit lang/zh-CN/zh-TW/zh-ALL/JA/EN,&lr=lang_zh-CN/&lr=lang_zh-TW/&lr=lang_zh-CN|lang_zh-TW/&lr=lang_ja/&lr=lang_en}%input{Limit date/Last hour/Last day/Last week/Last month/Last year,&as_qdr=h1/&as_qdr=d1/&as_qdr=w1/&as_qdr=m1/&as_qdr=y1}&ie=utf-8&oe=utf-8",
                        "match": "https://www\\.google\\..*/search",
                        "hideNotMatch": true
                    },
                    {
                        "name": "Baidu",
                        "url": "https://www.baidu.com/s?wd=%s&ie=utf-8",
                        "keywords": "(?:wd|word)=(.*?)(&|$)",
                        "match": "https?://(www|m)\\.baidu\\.com/.*(wd|word)="
                    },
                    {
                        "name": "SearX",
                        "url": "https://searx.be/search?q=%s"
                    },
                    {
                        "name": "You",
                        "url": "https://you.com/search?q=%s",
                        "icon": "https://you.com/favicon/favicon-32x32.png"
                    },
                    {
                        "name": "Bing",
                        "url": "https://www.bing.com/search?q=%s"
                    },
                    {
                        "name": "DuckDuckGo",
                        "url": "https://duckduckgo.com/?q=%s"
                    },
                    {
                        "name": "Yahoo",
                        "url": "https://search.yahoo.com/search;?p=%s"
                    },
                    {
                        "name": "Yandex",
                        "url": "https://yandex.com/search/?text=%s"
                    },
                    {
                        "name": "Startpage",
                        "url": "https://www.startpage.com/sp/search?query=%s",
                        "icon": "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
                    },
                    {
                        "name": "Fsou",
                        "url": "https://fsoufsou.com/search?q=%s"
                    },
                    {
                        "name": "Qwant",
                        "url": "https://www.qwant.com/?q=%s"
                    },
                    {
                        "name": "Ecosia",
                        "url": "https://www.ecosia.org/search?method=index&q=%s",
                        "icon": "https://cdn-static.ecosia.org/static/icons/favicon.ico"
                    },
                    {
                        "name": "Brave",
                        "url": "https://search.brave.com/search?q=%s",
                        "icon": "https://cdn.search.brave.com/serp/v1/static/brand/16c26cd189da3f0f7ba4e55a584ddde6a7853c9cc340ff9f381afc6cb18e9a1e-favicon-32x32.png"
                    }
                ]
            },
            {
                "type": "Search in page",
                "icon": "sitemap",
                "selectTxt": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "Google ",
                        "url": "[\"Google\"]"
                    },
                    {
                        "name": "📏 Mile to Km",
                        "url": "showTips:let s=\"%sr\".match(/(\\d+)(mi(le)?)/)[1];return `<i>${s} mi = ${(s*1.609344).toFixed(2)} km</i>`;",
                        "kwFilter": "\\d+\\s*(mi(le)?\\b)"
                    },
                    {
                        "name": "💲USD to RMB",
                        "url": "showTips:http://apilayer.net/api/convert?from=USD&to=CNY&amount=1&access_key=%template{apilayer key} \n{name}<br/><i>%s USD = {json.result|*%s.replace(/\\D/,'')} RMB</i>",
                        "kwFilter": "\\d\\$|\\$\\d"
                    },
                    {
                        "name": "Google Search in site",
                        "url": "https://www.google.com/search?q=%s%20site%3A%h&ie=utf-8&oe=utf-8"
                    },
                    {
                        "name": "📄  Copy",
                        "url": "c:%sr"
                    },
                    {
                        "name": "🔆 Find in page",
                        "url": "find:%sr"
                    },
                    {
                        "name": "🔗  Open text link",
                        "url": "%sr.replace(/。/g,\".\").replace(/[^ \\w\\-_\\.~!\\*'\\(\\);:@&=\\+\\$,\\/\\?#\\[\\]%]/g,\"\").replace(/ /g,\"\").replace(/^/,\"http://\").replace(/^http:\\/\\/(https?:)/,\"$1\")",
                        "kwFilter": "\\w.*[\\.。].*\\w|1[a-zA-Z0-9]{22,}",
                        "nobatch": true
                    },
                    {
                        "name": "Words to qrcode",
                        "url": "https://hoothin.com/qrcode#%s",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "IMDb rating",
                        "url": "showTips:let query = \"%s\";\nlet url = `https://www.imdb.com/find/?q=${query}&exact=true`;\nlet geneHTML = (title, intro, labels, director, writer, stars, image, rating, year) => {\nif (!title) return \"No result\";\nreturn `\n<p style=\"margin: 5px;\">\n${title}\n<span style=\"position: absolute; right: 10px; color: orange;\">${rating}</span>\n</p>\n<div style=\"display: flex; font-size: 20px; width: 500px;\">\n<img style=\"height: fit-content;\" src=\"${image}\"/>\n<div style=\"font-size: 16px; line-height: 1.5; text-align: left; margin: 5px;\">\n<div>${labels.reduce((r, c) => `${r}<span style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">${c}</span>`, \"\")}</div>\n<div>Year: ${year}</div>\n<div>Director: ${director}</div>\n<div>Writer: ${writer}</div>\n<div>Stars: ${stars}</div>\n<div style=\"font-size: 16px; margin-top: 10px; border-top: 1px solid;\">${intro}</div>\n</div>\n</div>`;};\nlet imdbData = await storage.getItem(\"imdbData\");\nif (!imdbData) imdbData=[];\nlet d = imdbData.find(data => data.query == query);\nif (d) {\nd = d.data;\nreturn[geneHTML(d.title, d.intro, d.labels, d.director, d.writer, d.stars, d.image, d.rating, d.year), url];\n}\nlet result = await fetch(url).then(r => r.text()).then(async r => {\nlet doc = document.implementation.createHTMLDocument(''); doc.documentElement.innerHTML = r;\nlet item = doc.querySelector('.find-title-result .ipc-metadata-list-summary-item__t');\nif (!item) return null;\nlet _result = {title: item.innerText};\nurl = \"https://www.imdb.com/\" + item.getAttribute(\"href\");\nawait fetch(url).then(r => r.text()).then(r => {\nlet doc = document.implementation.createHTMLDocument(''); doc.documentElement.innerHTML = r;\n_result.image = doc.querySelector(\".ipc-image\").src;\n_result.year = doc.querySelector(\"h1+ul>li>.ipc-link\").innerText;\n_result.intro = doc.querySelector(\"section>p>span\").innerText;\n_result.labels = [];\n[].forEach.call(doc.querySelectorAll(\"a.ipc-chip\"), ele => {\n_result.labels.push(ele.innerText)\n});\n_result.director = [];\n[].forEach.call(doc.querySelectorAll(\"section>div>div>.title-pc-list>li:nth-child(1) li\"), ele => {\n_result.director.push(ele.innerText)\n});\n_result.director = _result.director.join(\"/\");\n_result.writer = [];\n[].forEach.call(doc.querySelectorAll(\"section>div>div>.title-pc-list>li:nth-child(2) li\"), ele => {\n_result.writer.push(ele.innerText)\n});\n_result.writer = _result.writer.join(\"/\");\n_result.stars = [];\n[].forEach.call(doc.querySelectorAll(\"section>div>div>.title-pc-list>li:nth-child(3) li\"), ele => {\n_result.stars.push(ele.innerText)\n});\n_result.stars = _result.stars.join(\"/\");\n_result.rating = doc.querySelector(\".ipc-btn__text>div>div>div\").innerText;\n});\nreturn _result;\n}).catch(alert);\nif (!result) result = {};\nimdbData.push({query:query, data:result});\nif (imdbData.length > 50) imdbData.shift();\nstorage.setItem(\"imdbData\", imdbData);\nd = result;\nreturn[geneHTML(d.title, d.intro, d.labels, d.director, d.writer, d.stars, d.image, d.rating, d.year), url];",
                        "icon": "https://www.imdb.com/favicon.ico"
                    },
                    {
                        "name": "💞 AV preview",
                        "url": "showTips:https://www.javbus.com/%sr.replace(/^(\\w+?)[\\-_]?(\\d+)$/,\"$1-$2\") \n<span style='font-size:22px;line-height:1.2;'>{h3}</span>\n<p style=\"margin: 0; font-size: 18px; font-weight: normal;\">{.info>p:nth-child(2)}</p>\n<p style=\"margin: 0; font-size: 18px; font-weight: normal;\">{.info>p:nth-child(6)}</p>\n<p style=\"margin: 0;\">{.genre a|<mark style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">()</mark>}</p>\n<img src='https://www.javbus.com{a.bigImage>img|src}' referrerpolicy='no-referrer'/>",
                        "kwFilter": "^[0-9a-zA-Z]+[\\-_]?\\d+$"
                    },
                    {
                        "name": "📦 Batch open links",
                        "url": "%s[all]",
                        "kwFilter": "^https?:"
                    },
                    {
                        "name": "Magnet2Torrent-lolicon",
                        "url": "https://m2t.lolicon.app/#p{#magnet=%s}",
                        "kwFilter": "^magnet:",
                        "nobatch": true
                    },
                    {
                        "name": "Magnet-vip",
                        "url": "https://magnet-vip.com/#p{.form-group input=%s&click(.btn-outline-secondary)}",
                        "icon": "https://magnet-vip.com/favicon.png",
                        "kwFilter": "^magnet:",
                        "nobatch": true
                    },
                    {
                        "name": "↩️ Short link restore",
                        "url": "showTips:%s\n{url}",
                        "kwFilter": "^https?://."
                    }
                ]
            },
            {
                "type": "Web cache",
                "icon": "clock-rotate-left",
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "Wayback Machine all",
                        "url": "https://web.archive.org/web/*/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico"
                    },
                    {
                        "name": "Wayback Machine",
                        "url": "https://web.archive.org/web/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico"
                    },
                    {
                        "name": "Google cache",
                        "url": "https://webcache.googleusercontent.com/search?q=cache:%u"
                    },
                    {
                        "name": "Google cache text",
                        "url": "https://webcache.googleusercontent.com/search?strip=1&q=cache:%u"
                    },
                    {
                        "name": "Bing cache",
                        "url": "https://www.bing.com/search?q=url:%u&go=Search&qs=bs&form=QBRE#p{click(ol#b_results li.b_algo:first-of-type div.b_attribution a.trgr_icon)&open(ol#b_results li.b_algo:first-of-type div.b_attribution a[href*\\=\"cc.bingj.com/cache\"])}"
                    },
                    {
                        "name": "Archive.is",
                        "url": "https://archive.is/newest/%u"
                    },
                    {
                        "name": "Archive.is all",
                        "url": "https://archive.is/%u"
                    },
                    {
                        "name": "Memento",
                        "url": "http://timetravel.mementoweb.org/memento/0/%u",
                        "icon": "http://mementoweb.org/static/css/images/timetravel_logo_20x20.png"
                    },
                    {
                        "name": "Megalodon",
                        "url": "https://megalodon.jp/?url=%u"
                    },
                    {
                        "name": "Yahoo cache",
                        "url": "https://search.yahoo.com/search?p=url:%u#p{open(#results li:first-of-type a[href*\\=\"cc.bingj.com/cache\"], #results li:first-of-type a[href*\\=\"cc.bingj.com%2fcache\"])}"
                    },
                    {
                        "name": "Ghostarchive",
                        "url": "https://ghostarchive.org/search?term=%u"
                    },
                    {
                        "name": "WebCite",
                        "url": "https://webcitation.org/query?url=%u"
                    }
                ]
            },
            {
                "type": "Search by image",
                "icon": "eye",
                "selectImg": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "Google Search by image",
                        "url": "https://www.google.com/searchbyimage?image_url=%t"
                    },
                    {
                        "name": "Google translate image",
                        "url": "https://translate.google.com/?op=images#p{input[accept^\\=\"image\"]=%i}"
                    },
                    {
                        "name": "Lunapic editor",
                        "url": "https://www.lunapic.com/editor/index.php?action=url&url=%t",
                        "nobatch": true
                    },
                    {
                        "name": "Pixlr easy editor",
                        "url": "https://pixlr.com/x/#p{click(#home-open-url)&#image-url=%t&click(.dialog>.buttons>a.button.positive)}",
                        "nobatch": true
                    },
                    {
                        "name": "Photopea editor",
                        "url": "https://www.photopea.com/#%7B%22files%22:%5B%22%t%22%5D,%22environment%22:%7B%7D%7D",
                        "nobatch": true
                    },
                    {
                        "name": "Gif controller",
                        "url": "javascript:(function(){var n=null,C=false;function h(m){d(m,\"jsgif_overlaid\");m.removeEventListener(\"click\",i,C)}function i(m){var o=this;c.forEach(h);setTimeout(function(){j(o)},0);m.preventDefault()}function d(m,p){var o=m.className.split(/s/).filter(function(r){return r!==p});m.className=g(o,\" \")}function g(m,o){if(o===undefined){o=\"\"}return m.reduce(function(p,r){return p+o+r},\"\")}function j(ai){function ag(p,m){return function(q){p(q);T(m)}}function ac(){}function T(m){ab(\"Decoding (frame \"+(M.length+1)+\")...\",Z.i,Z.data.length,m)}function I(){G=C;o.insertBefore(ai,L);o.removeChild(L)}function F(){N&&M.push({data:N.getImageData(0,0,ae.width,ae.height),f:Y})}function V(m){af=m;ae={width:ai.width,height:ai.height};M=[];O.fillStyle=\"black\";O.fillRect(0,0,ae.width,ae.height);O.strokeStyle=\"red\";O.lineWidth=3;O.moveTo(0,0);O.lineTo(ae.width,ae.height);O.moveTo(0,ae.height);O.lineTo(ae.width,0);O.stroke();setTimeout(x,0)}function ah(m){m.lengthComputable&&ab(\"Loading...\",m.loaded,m.total,true)}function ab(u,p,r,t){K.style.visibility=p===r?\"\":\"visible\";if(t){t=Math.min(J.height>>3,J.height);var q=J.height-t>>1,m=p/r*J.width;O.fillStyle=\"rgba(255,160,122,0.5)\";O.fillRect(m,q,J.width-m,t);O.fillStyle=\"rgba(0,128,128,0.5)\";O.fillRect(0,q,p/r*J.width,t)}K.innerHTML=u+\" \"+Math.floor(p/r*100)+\"%\"}function ad(){try{b(Z,aj)}catch(m){V(\"parse\")}}var Z,ae,af=n,U=n,Y=n,w=n,s=n,N=n,G=true,P=true,M=[],x=function(){function y(){function S(){G=!G;aa();W.focus();u()}function aa(){if(G){W.innerHTML=\"&#10073;&#10073;\";W.title=\"Pause\";R.style.visibility=\"hidden\";Q.style.visibility=\"hidden\"}else{W.innerHTML=P?\"&#9654;\":\"&#9664;\";W.title=\"Play\";R.style.visibility=\"\";Q.style.visibility=\"\"}K.style.visibility=r?\"visible\":\"\";z.style.display=m?\"\":\"none\";E.innerHTML=\"i\";E.title=\"Show info/more tools\";D.innerHTML=P?\"&larr;\":\"&rarr;\";D.title=P?\"Reverse\":\"Un-reverse\";R.innerHTML=\"&#9664;&#10073;\";R.title=\"Previous frame\";Q.innerHTML=\"&#10073;&#9654;\";Q.title=\"Next frame\";B.innerHTML=r?\"&#9675;\":\"&#8857;\";B.title=r?\"Unpin\":\"Pin\";A.innerHTML=\"&#10006;\";A.title=\"Close jsgif and go back to original image\";v.disabled=G;q.disabled=G;K.innerHTML=\"\";H.innerHTML=\"\";z.innerHTML=\"\";if(M.length<2){if(af==\"xhr\"){K.appendChild(document.createTextNode(\"Load failed; cross-domain? \"));var al=ak(\"button\",\"popup\");al.addEventListener(\"click\",function(){window.open(ai.src)});al.innerHTML=\"&nearr;\";al.title=\"Click to open GIF in new window; try running jsgif there instead\";K.appendChild(al)}else{af==\"parse\"&&K.appendChild(document.createTextNode(\"Parse failed \"))}K.appendChild(A)}else{al=function(an,ao){an.innerHTML=\"\";ao.forEach(function(ap){an.appendChild(ap)})};var am=P?[E,D,R,W,Q,B,A]:[E,D,Q,W,R,B,A];al(K,[H,z]);al(H,am);al(z,[document.createTextNode(\" frame: \"),v,document.createTextNode(\" / \"),document.createTextNode(M.length),document.createTextNode(\" (delay: \"),q,document.createTextNode(\")\")])}}function ak(am,an,al){am=document.createElement(am);if(an){am.className=\"jsgif_\"+an}for(var ao in al){am[ao]=al[ao]}return am}var H=ak(\"div\",\"simple_tools\"),D=ak(\"button\",\"rev\"),E=ak(\"button\",\"show_info\"),R=ak(\"button\",\"prev\"),W=ak(\"button\",\"play_pause\"),Q=ak(\"button\",\"next\"),B=ak(\"button\",\"pin\"),A=ak(\"button\",\"close\"),z=ak(\"div\",\"info_tools\");v=ak(\"input\",\"cur_frame\",{type:\"text\"});q=ak(\"input\",\"delay_info\",{type:\"text\"});E.addEventListener(\"click\",function(){m=!m;aa();E.focus()},C);D.addEventListener(\"click\",function(){P=!P;aa();D.focus()},C);v.addEventListener(\"change\",function(){var al=+v.value;if(isNaN(al)||al<1||al>M.length){v.value=t+1}else{t=al-1;O.putImageData(M[t].data,0,0)}},C);R.addEventListener(\"click\",function(){p(-1)},C);W.addEventListener(\"click\",S,C);Q.addEventListener(\"click\",function(){p(1)},C);B.addEventListener(\"click\",function(){r=!r;aa();B.focus()},C);A.addEventListener(\"click\",I,C);q.addEventListener(\"change\",function(){var al=+q.value;if(!isNaN(al)){M[t].f=al}},C);J.addEventListener(\"click\",S,C);L.addEventListener(\"click\",function(al){al.preventDefault()},C);aa()}function p(z){t=(t+z+M.length)%M.length;v.value=t+1;q.value=M[t].f;O.putImageData(M[t].data,0,0)}var t=-1,v,q,m=C,r=C,u=function(){function z(){if(A=G){p(P?1:-1);var B=M[t].f*10;B||(B=100);setTimeout(z,B)}}var A=C;return function(){A||setTimeout(z,0)}}();return function(){setTimeout(y,0);if(!af){J.width=ae.width;J.height=ae.height;u()}}}(),aj={p:ag(function(m){ae=m;J.width=ae.width;J.height=ae.height;L.style.width=ae.width+\"px\";K.style.minWidth=ae.width+\"px\";X.width=ae.width;X.height=ae.height}),o:ag(function(m){F();Y=U=n;s=w;N=w=n;U=m.L?m.M:n;Y=m.u;w=m.v}),m:ag(ac),c:{l:ag(ac)},q:ag(function(q){N||(N=X.getContext(\"2d\"));var m=q.r?q.C:ae.w,p=N.getImageData(q.g,q.k,q.width,q.height);q.h.forEach(function(t,r){if(U!==t){p.data[r*4+0]=m[t][0];p.data[r*4+1]=m[t][1];p.data[r*4+2]=m[t][2];p.data[r*4+3]=255}else{if(s===2||s===3){p.data[r*4+3]=0}}});N.putImageData(p,q.g,q.k);O.putImageData(p,q.g,q.k)},true),n:function(){F();T(C);K.innerHTML=\"Playing...\";x()}},o=ai.parentNode,L=document.createElement(\"div\"),J=document.createElement(\"canvas\"),O=J.getContext(\"2d\"),K=document.createElement(\"div\"),X=document.createElement(\"canvas\");J.width=ai.width;J.height=ai.height;K.style.minWidth=ai.width+\"px\";L.className=\"jsgif\";K.className=\"jsgif_toolbar\";L.appendChild(J);L.appendChild(K);o.insertBefore(L,ai);o.removeChild(ai);K.innerHTML=\"Loading...\";(function(){var m=new XMLHttpRequest;m.overrideMimeType(\"text/plain; charset=x-user-defined\");m.onload=function(){Z=new f(m.responseText);setTimeout(ad,0)};m.onprogress=ah;m.onerror=function(){V(\"xhr\")};m.open(\"GET\",ai.src,true);m.send()})()}function b(o,u){function r(){var q={};q.s=o.a();switch(String.fromCharCode(q.s)){case\"!\":q.type=\"ext\";p(q);break;case\",\":q.type=\"img\";s(q);break;case\";\":q.type=\"eof\";u.n&&u.n(q);break;default:throw Error(\"Unknown block: 0x\"+q.s.toString(16))}q.type!==\"eof\"&&setTimeout(r,0)}function s(q){function v(F,I){function J(y,B){var D=F.slice(B*I,(B+1)*I);A.splice.apply(A,[y*I,I].concat(D))}for(var A=Array(F.length),E=F.length/I,H=[0,4,2,1],G=[8,8,4,2],x=0,K=0;K<4;K++){for(var z=H[K];z<E;z+=G[K]){J(z,x);x++}}return A}q.g=o.b();q.k=o.b();q.width=o.b();q.height=o.b();var w=l(o.a());q.r=w.shift();q.B=w.shift();q.J=w.shift();q.H=w.splice(0,2);q.D=e(w.splice(0,3));if(q.r){q.C=m(1<<q.D+1)}q.F=o.a();w=t();q.h=a(q.F,w);if(q.B){q.h=v(q.h,q.width)}u.q&&u.q(q)}function p(q){function w(A){function z(B){o.a();B.t=o.a();B.R=o.b();B.K=o.a();u.c&&u.c.l&&u.c.l(B)}o.a();A.identifier=o.d(8);A.O=o.d(3);switch(A.identifier){case\"NETSCAPE\":z(A);break;default:(function(B){B.N=t();u.c&&u.c[B.identifier]&&u.c[B.identifier](B)})(A)}}function x(z){o.a();z.V=o.j(12);z.U=t();u.G&&u.G(z)}function v(z){z.Q=t();u.m&&u.m(z)}function y(A){o.a();var z=l(o.a());A.H=z.splice(0,3);A.v=e(z.splice(0,3));A.W=z.shift();A.L=z.shift();A.u=o.b();A.M=o.a();A.K=o.a();u.o&&u.o(A)}q.label=o.a();switch(q.label){case 249:q.e=\"gce\";y(q);break;case 254:q.e=\"com\";v(q);break;case 1:q.e=\"pte\";x(q);break;case 255:q.e=\"app\";w(q);break;default:q.e=\"unknown\";(function(z){z.data=t();u.t&&u.t(z)})(q)}}function t(){var q,v;v=\"\";do{q=o.a();v+=o.d(q)}while(q!==0);return v}function m(q){for(var v=[],w=0;w<q;w++){v.push(o.j(3))}return v}u||(u={});(function(){var q={};q.I=o.d(3);q.X=o.d(3);if(q.I!==\"GIF\"){throw Error(\"Not a GIF file.\")}q.width=o.b();q.height=o.b();var v=l(o.a());q.z=v.shift();q.P=e(v.splice(0,3));q.J=v.shift();q.A=e(v.splice(0,3));q.bgColor=o.a();q.T=o.a();if(q.z){q.w=m(1<<q.A+1)}u.p&&u.p(q)})();setTimeout(r,0)}function a(y,w){function s(){t=[];r=y+1;for(var q=0;q<o;q++){t[q]=[q]}t[o]=[];t[x]=n}function m(A){for(var z=0,q=0;q<A;q++){if(w.charCodeAt(B>>3)&1<<(B&7)){z|=1<<q}B++}return z}for(var B=0,v=[],o=1<<y,x=o+1,r=y+1,t=[],p,u;;){u=p;p=m(r);if(p===o){s()}else{if(p===x){break}if(p<t.length){u!==o&&t.push(t[u].concat(t[p][0]))}else{if(p!==t.length){throw Error(\"Invalid LZW code.\")}t.push(t[u].concat(t[u][0]))}v.push.apply(v,t[p]);t.length===1<<r&&r<12&&r++}}return v}function f(m){this.data=m;this.S=this.data.length;this.i=0;this.a=function(){if(this.i>=this.data.length){throw Error(\"Attempted to read past end of stream.\")}return m.charCodeAt(this.i++)&255};this.j=function(r){for(var o=[],p=0;p<r;p++){o.push(this.a())}return o};this.d=function(r){for(var o=\"\",p=0;p<r;p++){o+=String.fromCharCode(this.a())}return o};this.b=function(){var o=this.j(2);return(o[1]<<8)+o[0]}}function l(m){for(var p=[],o=7;o>=0;o--){p.push(!!(m&1<<o))}return p}function e(m){return m.reduce(function(p,o){return p*2+o},0)}var k=function(m){for(var p=[],o=0;o<m.length;o++){p.push(m[o])}return p}(document.getElementsByTagName(\"img\")),c=k.filter(function(m){return m.src.slice(-4).toLowerCase()===\".gif\"});if(c.length===0){c=k}(function(m){var o=document.createElement(\"style\");o.type=\"text/css\";o.textContent=m;document.body.appendChild(o)})(\".jsgif{display:inline;position:relative;padding-bottom:3px;}.jsgif_toolbar{visibility:hidden;font-family:sans-serif;background-color:#555;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;overflow:visible;white-space:nowrap;padding:3px;position:absolute;left:0;text-align:center;z-index:50;}.jsgif_toolbar button{width:3em;color:black;text-align:center;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;margin:1px;cursor:pointer;background-color:#ddd;}.jsgif_cur_frame{width:2em;color:black;}.jsgif_delay_info{width:2em;color:black;}.jsgif_toolbar button:hover{color:red;}.jsgif:hover .jsgif_toolbar{visibility:visible;}.jsgif{text-decoration:none;color:black;}.jsgif_overlaid{border:5px solid red;}.jsgif_overlaid:hover{border:5px solid blue;}\");c.forEach(function(m){if(m.className.split(/s/).indexOf(\"jsgif_overlaid\")===-1){m.className+=\" jsgif_overlaid\";m.addEventListener(\"click\",i,C)}})})();",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcwNCAwSDE5MmE2NCA2NCAwIDAgMC02NCA2NHYzMjBoNTc2YTY0IDY0IDAgMCAxIDY0IDY0djQxNmE2NCA2NCAwIDAgMS02NCA2NEgxMjh2MzJhNjQgNjQgMCAwIDAgNjQgNjRoNzY4YTY0IDY0IDAgMCAwIDY0LTY0VjMyMHoiIGZpbGw9IiNFQUVBRUEiPjwvcGF0aD48cGF0aCBkPSJNNzA0IDB2MjU2YTY0IDY0IDAgMCAwIDY0IDY0aDI1NnoiIGZpbGw9IiM0MzQ4NTQiPjwvcGF0aD48cGF0aCBkPSJNNzY4IDMyMGwyNTYgMjU2VjMyMEg3Njh6IiBvcGFjaXR5PSIuMSI+PC9wYXRoPjxwYXRoIGQ9Ik03MDQgODMyYTMyIDMyIDAgMCAxLTMyIDMySDMyYTMyIDMyIDAgMCAxLTMyLTMyVjQ4MGEzMiAzMiAwIDAgMSAzMi0zMmg2NDBhMzIgMzIgMCAwIDEgMzIgMzJ6IiBmaWxsPSIjQ0M3NTk4Ij48L3BhdGg+PHBhdGggZD0iTTI4OCA2NzJoLTgwYTE2IDE2IDAgMCAwIDAgMzJoNDhhMzIgMzIgMCAwIDEtMzIgMzJoLTMyYTMyIDMyIDAgMCAxLTMyLTMydi05NmEzMiAzMiAwIDAgMSAzMi0zMmgzMmEzMiAzMiAwIDAgMSAzMiAzMiAxNiAxNiAwIDAgMCAzMiAwIDY0IDY0IDAgMCAwLTY0LTY0aC0zMmE2NCA2NCAwIDAgMC02NCA2NHY5NmE2NCA2NCAwIDAgMCA2NCA2NGgzMmE2NCA2NCAwIDAgMCA2NC02NCAxNiAxNiAwIDAgMCAwLTMyeiBtOTYgODBhMTYgMTYgMCAwIDEtMTYgMTYgMTYgMTYgMCAwIDEtMTYtMTZWNTYwYTE2IDE2IDAgMCAxIDE2LTE2IDE2IDE2IDAgMCAxIDE2IDE2eiBtMTc2LTIwOGgtOTZhMTYgMTYgMCAwIDAtMTYgMTZ2MTkyYTE2IDE2IDAgMCAwIDMyIDB2LTgwaDQ4YTE2IDE2IDAgMCAwIDAtMzJoLTQ4di02NGg4MGExNiAxNiAwIDAgMCAwLTMyeiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPjwvc3ZnPg==",
                        "description": "Click Gif on the page, source from slbkbs.org/jsgif/"
                    },
                    {
                        "name": "Yandex Search by image",
                        "url": "https://yandex.com/images/search?source=collections&rpt=imageview&url=%t"
                    },
                    {
                        "name": "QRCode detection",
                        "url": "https://hoothin.com/qrdecode#p{#fileInput=%i}",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "SauceNAO",
                        "url": "https://saucenao.com/search.php?db=999&url=%t"
                    },
                    {
                        "name": "IQDB",
                        "url": "https://iqdb.org/?url=%t"
                    },
                    {
                        "name": "3D IQDB",
                        "url": "https://3d.iqdb.org/?url=%t"
                    },
                    {
                        "name": "Baidu Search by image",
                        "url": "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=%t"
                    },
                    {
                        "name": "Bing Search by image",
                        "url": "https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:%t"
                    },
                    {
                        "name": "TinEye",
                        "url": "https://www.tineye.com/search?url=%t"
                    },
                    {
                        "name": "Sogou Search by image",
                        "url": "https://pic.sogou.com/ris?query=%t"
                    },
                    {
                        "name": "WhatAnime",
                        "url": "https://trace.moe/?url=%t",
                        "icon": "https://trace.moe/favicon.png"
                    },
                    {
                        "name": "360 Search by image",
                        "url": "http://st.so.com/stu?imgurl=%t"
                    },
                    {
                        "name": "ZXing QRCode",
                        "url": "https://zxing.org/w/decode?full=true&u=%t"
                    },
                    {
                        "name": "ImgOps",
                        "url": "https://imgops.com/%b"
                    }
                ]
            },
            {
                "type": "Scholar",
                "icon": "graduation-cap",
                "sites": [
                    {
                        "name": "Google scholar",
                        "url": "https://scholar.google.com/scholar?hl=zh-CN&q=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4jYWT2UtUURzHL/QH1LMP9hKVNUKFWpP7TDrjU9uEo4WPWlERUbSoueSMaTWjTBCRGV3HiCsSWrTQApVSZBtZWEZSUWZkC3PPne3OzKeHK1NKy4Hfyzl8P+d3vt/fkSRJmpWSVbU9vbxbMZXJSnqZrMx3yErqmrN/r7V+Zf76jjNz5mYXSilZldtKfGBrA5sXcg7Dpg5wX/lzNV+FlmuwsRNy6r9HJFO5v9feBlaXILNWxenT+Pgtzr/W2Oc4azwalqMgLXZ29di9JMXj/xH3P4pybjDKhvYg1qMgpZfKyko3lPk0xr9PF7/4EOfTjwQAiQRcfqpjrlMZeBVjc2eI/FaQ5jlkZWs3qKHENPH7yTg5DYKKExp6DGJxcLRprHILAJr7w5hdIC1wyMquHmNj3/kQN57rALz9Eie/SZBRo/JwLAZAtRLC4jIA7r4pQHqprBS0QkaNysLdAXbKIQAiOjh9Gml7VOS7kaSooGkGwFQqKzYvWFyCgiZBbqPg3mvjRv9ABNPeANeHdSbVBOu8GvYWA9ByMcyKmQCLS5DToFLSKlDuR/kmEox+Moyt6w2TtidAUbPgyKUwZceDWI7MAFhdRgdL9quk7ghw8bGeNPXdZJzKjiCZNSpZtSp5jQKb9zeA1SUw16ms9WqcvBlhcDTG4KsYoxO/ohXhBFWng5jrVCwuQbHnN0B2vaDiRJCJqdzvvtRZfUyQ3SA4dSuCbtjC0JsY5npBYRLg9PfaPEYK14f15NA4fRpLD6jkHxKY9ga4PWKcvRyPk9toGF7sBWmR45S/pN0Y5a6BaLLdroEoGTUqy6oNc99NGk85dCHM8oMCqzuIvQ2k2XPzLAWNX9UiD9i90D0EE8Yo8GQc/A/g2QSMfIHaPsg9DMUe4/dmbrnz8CdxKwtDTtdexQAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "EBSCO",
                        "url": "http://web.b.ebscohost.com/ehost/results?sid=8e76c941-084d-4b93-b05a-d5f182196017%40sessionmgr102&vid=1&hid=128&bquery=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJ0lEQVQ4jZWT3UtTYRzHT+w4pzddeRFdBAbd1Z8giXtJz9mKvBDCxMqkrK57u6kEyx13zjHWIl8TEbMptaLpZMeMCgdBS8dSRC8WWAS9UJRS1j5d7AWnjuqB78UPHj58n+f7+wpFLp0il45Z1hBs7nVS0krPdoXM/YyEIpdOgaRSWt/JGZ9BvWeUOiXIUXWMxvZxGrQQTd4wTd4wrkv3sDh1LOsBYpVKaX0XPaEYmfPx6wqHlSAHLt/nlDdMZO4tyWSSHXUdmKrUXECxS0eUVIS9V3kYWQTAiCYQKlpT1itaESs9BKYWqHU/QrApuYDsYFMYnJwF4PH0G0RJxeLUKJQ1BKubbYdusvNIF2ZZzQOwKww9mcsCTJKKKKmU1PgoPzvElkoPBZK68RM3AxjRRMp++TWO6yFGns3nT2EzwIcvyzyILBB+mWD1128GJl7nvP2vgOjie6zn/Ow77+d5fInhp/P/BzCiCQSrG6GsBfsFP/1GHMHRhsX5j4BMCoWyxtaD19l1rBuzrGGWVYr3t+cH3Jmc2xijU8NU5UFwKFwZmGLPyb7sMmUBZllDKGvhbtrBxKv0ItmVlMpaqG4O8O7TN7bX3kKU1gDMskZJjY/G9nG+r/wEYPnHKg1aCMfFYaqbA6gjLwCYX/pMYdpVFmCq9LD7xG36jTg9oRgdwWm6x2L0heN0js7QOx5jcHKW3lCM0zcMxPVdyKmzdY3SFc6ptKMtJ4U/fkBXz/LD6BYAAAAASUVORK5CYII="
                    },
                    {
                        "name": "WOS",
                        "url": "http://apps.webofknowledge.com/UA_GeneralSearch.do?fieldCount=3&action=search&product=UA&search_mode=GeneralSearch&max_field_count=25&max_field_notice=Notice%3A+You+cannot+add+another+field.&input_invalid_notice=Search+Error%3A+Please+enter+a+search+term.&input_invalid_notice_limits=+%3Cbr%2F%3ENote%3A+Fields+displayed+in+scrolling+boxes+must+be+combined+with+at+least+one+other+search+field.&sa_img_alt=Select+terms+from+the+index&value(input1)=%s&value%28select1%29=TI&value%28hidInput1%29=initVoid&value%28hidShowIcon1%29=0&value%28bool_1_2%29=AND&value%28input2%29=&value%28select2%29=AU&value%28hidInput2%29=initAuthor&value%28hidShowIcon2%29=1&value%28bool_2_3%29=AND&value%28input3%29=&value%28select3%29=SO&value%28hidInput3%29=initSource&value%28hidShowIcon3%29=1&limitStatus=collapsed&expand_alt=Expand+these+settings&expand_title=Expand+these+settings&collapse_alt=Collapse+these+settings&collapse_title=Collapse+these+settings&SinceLastVisit_UTC=&SinceLastVisit_DATE=&timespanStatus=display%3A+block&timeSpanCollapsedListStatus=display%3A+none&period=Range+Selection&range=ALL&ssStatus=display%3Anone&ss_lemmatization=On&ss_query_language=&rsStatus=display%3Anone&rs_rec_per_page=10&rs_sort_by=PY.D%3BLD.D%3BVL.D%3BSO.A%3BPG.A%3BAU.A&rs_refinePanel=visibility%3Ashow",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABr0lEQVQ4jZ2TPYobQRCFvyNUMpGTjgQbGAqBEZs1i5AD4VWzBoNgF1cihB0NONyk1/mgEwxzgmFuMHMD6Sa7RxgHQ8uzI+HAFRXUT79+7xVMQjPUO/zxFyfv8ONcM3Tafw4nuHZPlxZM62lBu6dzgrsYNsWKNQcA/YAW9xyKew5xSSy/UhWfh1qx5mCKvVsS74ivz7wB2CcsrogAAiIgmqGmWP+bHuD1mbd4N/RgitVbGic4zdBwQxAQm2NxSSwfqI4/OYUZwRSrv9FohtZbGlOMckPVv9ALSP1IAxA+EsYQNUPTYPs08NS/0JcbKvIFeZgRNEM1Q53gwg1hSqIpZoqVG6roiWFGyBfk9JG+j/Te4cOMkN+SX5PLO3x+OzzmHT7NnRFETyw3VKZYviC/QDAfmE9IzwgSB+P/HXecxiic4GyOAdSPNAJy5mCsQvtEFz1RM/S451RvaeKSmIZtjnmHF5CzClMftN/pTDHN0OQDgLj6u+idD5JMyYkCUj5QFevBhcUXDnE1oBKQ5MQLop3g2h1dgnlNBZtj7e7KLYwjHVP7gy5dY8r/eY3/G38A1vO4VlociLQAAAAASUVORK5CYII="
                    },
                    {
                        "name": "JSTOR",
                        "url": "http://www.jstor.org/action/doAdvancedSearch?q0=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADl0lEQVQ4jS2RS0zbdQCA/3cvJh71ollMICN0FhpwbBlZx+Zg0NdC3/23pbQ8B91YGQOtCAOZJQrIaillLVDgJ6+BPMTJU91Bl7mwOBQQjEuGzJMHTbx8HvD+5Uu+fFLGSy/XlipVQlaohC1NKeT0TOFSZgm3MlvYUtOF+ViKMB9LEbbUdOFWZgk5TXnEKVRCTkkTkkeRMb/cEGS+sZb1T5r54sZVRpwuhq1ONsUU+6tr7C2v8jg5TtLh5uv2Bta7mllqaWDRX49kS1OKe9eqCBvP0u+8RNynI+rIp/nEcdqyT/HX4Qv+/fsfomYnd4xq4j4NAyWFDFboSJjsSLbjSjEbqKXPdpGBEi19lgJWoteZD1XRVZTD1uoyz59uM1hup18uoM9eSMSSz0CJjmGHG0lWqETCZKfPns9Mq5fuwrOETRfpNeQRNqp5srjEwdYO4zfKGasz06vPY/ZWGZ3nThHTWpBsqQqx8tF7DFYYmGnx0u8o5MPT2UwFS2jPUbI5t8Qf27vEnBbW4wG++tSPCNiZft9DTP+/YLUzyFCFHlHvYK6jgpD6FBFrAWHTeX76coXDnT169VrmbvuYD1VyS6Uk5iwiZrAiyYpMMSK7GHAXMtHkouN0FiN+MzOtpfTocvnt4fc839ohJpu569EwVFlM3GsgYslnrNSH5M7MEuELOlpU6QyU6Ih7DWwM3iTpNxPKO8mzzR85+GWXXq2GHl0uC53VDFYW06vPY+HdAJIt9S2xGAww21bK/fA1OvNOU/vKa/Ro1ISNeWx/84DD3T367UaGqi8T9+rp1qi5/urrDFqdSI40pZj2VzHR6GC2vYzlSB3JKya+TTYx0+Zh/4eHHGztcNdtZaJJRtTZWI3VE3UUEdWYkFxKlejXGmlVKYi5tEw0ygx4tIzV2bhzWc32xgN+f/yEhM9BxPIOwzUmQuocItZ8Rj1eJGuqQiwG61kIlSMCNrouFXA7921C5zL5rDifP/ee8WhqluYTGYiAlc8bZKKOIkZqTExUVx1tvN92kz7bBbo1ZxitvcLPa+tMNtSxtbzMi1/3GaupYbLJzr0PSrljOM90sIS4V0//UUKWGHN7SZQbGKoyErUU8V0iydOVNR7dmyPhKmPEb2Ej0cjoVTsfX8il48xJxhucDFncSNY33pxfvBJg1F3GbN11kg4Pw3Y3k9V+hK+SIYsT4a1gzFNBUi5lxFXGqLuMqepaplw+/gNcwmcGmhKGRAAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "Springer",
                        "url": "http://rd.springer.com/search?query=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jbWRsQ2EMAxFMwjFzULHJvR0GeAaKL2GV4jEANmBiorqOipf5ejH+Dg46b5kRYLv5x8niKNl3SQSC6fs/a4UvOamG0pxyrKs231A24+H8xKg7cdi1ukKjcTngEhcjBobT72SC0ADmjA6pyxNN/gApHPKEoklElcAHYJLDRpdjXaJNrL9FjCaNnrTTwEK0RfAl7gMsCBPH3eAzfYaWN5eDgnuqgLs8ySv5+Nr7fP0J8AvegOhkGr6AYHSEgAAAABJRU5ErkJggg=="
                    },
                    {
                        "name": "Wikipedia",
                        "url": "https://en.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch"
                    },
                    {
                        "name": "Internet Archive",
                        "url": "https://archive.org/search.php?query=%s"
                    },
                    {
                        "name": "Scholar",
                        "url": "http://scholar.google.com/scholar?hl=zh-CN&q=%s&btnG=&lr="
                    },
                    {
                        "name": "Google Book",
                        "url": "https://www.google.com/search?q=%s&btnG=搜索图书&tbm=bks&tbo=1&hl=zh-CN&gws_rd=ssl"
                    },
                    {
                        "name": "krugle",
                        "url": "http://opensearch.krugle.org/document/search/#query=%s",
                        "icon": "https://opensearch.krugle.org/media/images/favicon.ico"
                    },
                    {
                        "name": "npm",
                        "url": "https://www.npmjs.org/search?q=%s",
                        "icon": "https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png"
                    }
                ]
            },
            {
                "type": "Movie",
                "icon": "video",
                "sites": [
                    {
                        "name": "Thepiratebay",
                        "url": "https://thepiratebay.org/search/%s"
                    },
                    {
                        "name": "Torrentz2",
                        "url": "https://www.torrentz2.xyz/?q=%s"
                    },
                    {
                        "name": "Torrentz2k",
                        "url": "https://torrentz2k.xyz/search/:p{q=%s&category=all}"
                    },
                    {
                        "name": "1337x.to",
                        "url": "https://www.1377x.to/search/%s/1/"
                    },
                    {
                        "name": "Torlock",
                        "url": "https://www.torlock2.com/all/torrents/%s.html"
                    },
                    {
                        "name": "TD",
                        "url": "https://www.torrentdownloads.me/search/?search=%s"
                    },
                    {
                        "name": "rarbgprx",
                        "url": "https://rarbgprx.org/torrents.php?search=%s"
                    },
                    {
                        "name": "rarbgproxy",
                        "url": "https://rarbgproxy.org/torrents.php?search=%s"
                    },
                    {
                        "name": "kickass1",
                        "url": "https://kat.sx/search.php?q=%s",
                        "icon": "https://kat.sx/kastatic/favicon.ico"
                    },
                    {
                        "name": "kickasstorrents",
                        "url": "https://kickasstorrents.to/usearch/%s"
                    },
                    {
                        "name": "kickass1.to",
                        "url": "https://kickass1.to/usearch/%s/"
                    },
                    {
                        "name": "kat.am",
                        "url": "https://kat.am/usearch/%s/"
                    },
                    {
                        "name": "kickasstorrent.cr",
                        "url": "https://kickasstorrent.cr/usearch/%s/"
                    }
                ]
            },
            {
                "type": "ACG",
                "icon": "gamepad",
                "sites": [
                    {
                        "name": "nyaa.si",
                        "url": "https://nyaa.si/?f=0&c=0_0&q=%s",
                        "icon": "https://nyaa.si/static/favicon.png"
                    },
                    {
                        "name": "Tokyotosho",
                        "url": "https://www.tokyotosho.info/search.php?terms=%s"
                    },
                    {
                        "name": "Mikan",
                        "url": "http://mikanani.me/Home/Search?searchstr=%s"
                    },
                    {
                        "name": "＊MioBT＊",
                        "url": "http://www.miobt.com/search.php?keyword=%s",
                        "icon": "http://www.miobt.com/images/favicon/miobt.ico"
                    },
                    {
                        "name": "shana project",
                        "url": "https://www.shanaproject.com/search/?title=%s"
                    },
                    {
                        "name": "KOTOMI RSS",
                        "url": "https://moe4sale.in/?kw=%s"
                    },
                    {
                        "name": "ACG.RIP",
                        "url": "https://acg.rip/?term=%s"
                    }
                ]
            },
            {
                "type": "Sukebei",
                "icon": "file",
                "sites": [
                    {
                        "name": "nyaa.si",
                        "url": "https://sukebei.nyaa.si/?f=0&c=0_0&q=%s",
                        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAHmElEQVRYw8WXXYxdVRXHf2vvc849537MvTOdmQ4zUygtpS0FIWL4iBEE9cGqAU0gojHBxAef9MFETXwhRmM00ReNia8kmhh9g0R8kISYiFjAKqYNhZa2Qzud7897zz0fey8fzqVzoS2UJ3Zyc25y99nrt/7rv9feV+J7v6t8hCMAmHn4B+BK1nrwYWmSmtDuGIoSapGhfnSCe6Ys+9KMn/xq8Yr5cSz0+1WU9NgvK4BW3XJhuQThQxFMjVtanZBGM4SmoTvbpD+XYls1FnslYQA2EAiUVkPo3JbQfrCBnU9ZfzXn+LGBAllWUrrrDxxa2LuvQdauI6Js1UJIDJIbwpplxAhrnZgbn9xNs2NwiWAbBp8IpVHKXZbG7SX8dgDQqMFo3bDW8x8YfM+UpdjVYS6pEwfQMxAZCEuwfUgbMXXxrDuPaUf0IwgC8B6kAELBGoPB7Hjg9IJjdswQRZZ+rqS5p3BVpkkEtVpAGFuKZsJc2CKwkCiIDqrmwQuYHKwFV8BiKRCAsaAGVEBM9d2LQcTuALRCh8tz+hoTJyGmVWMxs2RBwGoY4YxBQogUYgXjoXTgqT4CiICUEGTw13khSwzSALWAqZ7qgBJUBB8MKTBvRin6FqzFZh7XD8EKlAIi2AhCD1arwIVCU5SOZiR5l17cwqihIKDplLQniAEJwJuBCgMlGKigZgigdLZKQRXnDYgfvKngwJcBTqAsoKGOvfTYfnuT5dTTbAjx4RG6GtARz2SoXOhbbAAagNjqWUk/kGsAchlAnUKo1SwHhO8U1gCKlp5CDXtGCqZ7K5y6WFw2ZS+FJkKA56Fpz2JmOdODpF+t7mylgBjIBUYtZMVAjcscrsoU0aqojqohlIAqOE+Nkhm3wen54t2NKIS6lDx8g9J1hhcXBAP4HPpdaBSK5Mp6Hx4IlMdrnrQAimEAtIJQrWyVQyyeelBCZpiqO+6MNzl9PsW9p1GluRI6z9ltwzNnDVLx0i/hwY5jv3VMqfJo3fOzScidkBXg3VAJqmwFFEwN9rS61Cws5BF3tdfJu543Nq7eIrMS+r0SXxciFK9C5uBLN3oS4zHe8PUZ5eHdlkLhlW1PWyAvZQegYTNGGpZdsedcGrNZBFgXMKGbnFv44BZ5aKRkcsLxr0V4o2uZbSqlQj0Qvn1QWcmF1Ux5etETldAMhI1Cd0owYjMaps9aatnqwlrPsr/eZWX7/YPXY8ON0zUO70m4tFmSltWhdKjtmQgLasbzn0VHwyp/nvMciaGXw1wq+GEPNGsxvTJkslUymRQ8MLPNqYX8ioAiEBolsp5WIgQGfFZwcFfAha7lzDp8dsbzi/uUvIA/vBXx1PGI584r97cVxfDCsmWvKr8eHwIwpIjPiQKYTDJee7u8asaqUHghd4Y0U/JCKb3y6rzn2GLAZKx87QDsblpeW7e8vqp8YgLun4SXl+DHx+GxMeXpfbAnHDLhcs8w3jSsbjuWtz645hMjljCArZ5jeQNeX/aIwsGOcs8NBiPC7x4yPHfOsTvxzLYCnp2Db92kPHlAWM6VUnUHYLSubKRKVvrrCB4wMRpxaq5H6aEeCf84H9DzsK8tTDUqd9/QNHzziMGrcnxJeeIWODxmcF4ZCYVTm24HYKX7/jeROBScVwoHzhWsrHlKD9bA7M2jvLQaIiE8ckCueLdfKIdGhXpY/WaNYIEXN+1wH7j2aETCSN2ytFn5opsJogVguWNvwptbwkSUgRVaYTBo9kM7JTJXrFk65fiyDnfCaw/nlW6/5J3qVF3b0qkLa0XEnihjNspoaMbf5+T6LqJW+NEhuT6AYlDnHXooHExPRiRlj0whzlPGJWNtu7jqGl5hK1eOL/nLhb4wUPQ6FIB6zTI5sjO1HQvqISs8DfG8tVDQxHFkQvjnhSrEySXPwrbn3IZHFeqhsK9tLhfo8Nj7eCC0VZYAVpSVLcdUJ2ArrU6yZmzppg7n4OJSykhiuGUm4ZM3BTz1glK3JRsZnN1QujlcGLHcOmYYr8tlRU6tm6sDPPbxmEfvbnLsbI/nT+Rc2ihBYTNVJKixd6TERoZurvRKQ2c04ct3Nbht2jDdEvY0PeupMtGwjDdgqatsZMM7TOkXjmfPypUABycN3z/aZv/uiM9/LOGHR5U/Hsv4+V9S5rc9G7nlwmaMJPC5Wy37d1mO3hHQ7Xs+s99wft3znXuFzFmWujAaDS6tKjSjyk8vX3T86d89/rv6HgWSEJ64r8H+3dFloCgQvnF/zBfujPj9Sxm3zwScnHecWHT85rE6AG8ue0pf1TMrlHbHsrDlOTAunF4uiULDagrfe95xcs2QnVvFW2C8tWPCqRgkF75yd/OqRhyrGw5NWUILzRr89IsJzisgWPGERlnteg5MVCC7WwYRYbptSQs4s+7Z6pasn7rExZWCotPgHPEOwMmTBZ86XGN27Np9aXmz5G8nMh65s0Y7MdjBrTYtDP+bd9y8693vnlhwPHOyYCyGzQwevxXeXi7JSiX1AQe0P7wNDV+9t3HN4KpwftXzxD0x7USG7AR54fn0LSF2aEOfWfG8PFdyZNKSO5huCAcmQ+o1w1hD6GPIL21UR/xH/ff8/7zueff8JH+eAAAAAElFTkSuQmCC"
                    },
                    {
                        "name": "Glodls",
                        "url": "https://glodls.to/search_results.php?search=%s"
                    },
                    {
                        "name": "AniDex",
                        "url": "https://anidex.info/?q=%s",
                        "icon": "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWiwAAG1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2PeQti3vsaX7niAQE3VgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2Yggdi6P85z///Qq7n/wMDZYsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOmggdh6/84zP//Sr7s/xUuongAAAAAAAAAAAAAAAAAAAAAAAAAAzI0OEpKTVF8QUNHfBkbHUsAAAAAFRy8VTaF5f81zf//Sr7v/xMoqoIAAAAAAAAAAAAAAAAAAAAAODo9RXx+gNynpJ//ubOr/6+qov+HhIH/R0lKz2Zmgdra5d3/Xrru/w8ntYIAAAAAAAAAAAAAAAAAAAAAQEJFP56dnf/t387///Ld///14f//9uL//O7Z/7ywov+iopz/dniT1R4XwF0AAAAAAAAAAAAAAAAAAAAAAAAAEJSWl9n55tH///DW///s1f//69P//+vT///u2f//+N//uaqZ/zI0NNAAAAAAAAAAAAAAAAAAAAAAAAAAAFNZX5bRx73//+vL///nyv//48T//+LC///jw///5cj//+zT//3jxf9wa2b/AQMGSwAAAAAAAAAAAAAAAAAAAAB+hYv07NfD///ft///163//9Kj///RoP//0qP//9er///euv//6cb/mIl8/xQbIH0AAAAAAAAAAAAAAAAAAAAAhI2U+u/TvP//zpn//8uW///Mmf//zZv//82a///Ll///z5z//9uu/5yJe/8ZIih+AAAAAAAAAAAAAAAAAAAAAGVweKndx7r//8mR///UqP//16///9mz///YsP//1Kj//9Gf///Ej/+AdG7/Bw0SSwAAAAAAAAAAAAAAAAAAAAABBwocrq6w5f/Kp///3rj//+XI///jx///4sX//+LB///crv/RoID/VFlc4wAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAGFrb1TCuLX/+sKl///bwf//7tv//+vV//7Tsv/apYn/eXd3/xkgJEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYmxxWKqnqN3OraL+2ayd/9Gllf+xlIr9eHp80ScvM0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeb3+GpIiUmPV9io/uUWFokwAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//kAAP/wAAD/4AAA/8EAAPCDAADABwAAgA8AAAAfAAAADwAAAA8AAAAPAAAADwAAAB8AAIAfAADAPwAA4H8AAA=="
                    },
                    {
                        "name": "AcgnX Ero",
                        "url": "https://www.anix.moe/search.php?sort_id=0&keyword=%s"
                    },
                    {
                        "name": "AniRena",
                        "url": "https://www.anirena.com/?s=%s"
                    },
                    {
                        "name": "GGBases",
                        "url": "http://www.ggbases.com/search.so?title=%s"
                    }
                ]
            },
            {
                "type": "Assit",
                "icon": "list-alt",
                "selectTxt": true,
                "selectImg": true,
                "selectAudio": true,
                "selectVideo": true,
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "QRcode",
                        "url": "https://hoothin.com/qrcode#%U",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "Show all engines",
                        "url": "https://search.hoothin.com/all#%s"
                    },
                    {
                        "name": "Share to Twitter",
                        "url": "https://twitter.com/intent/tweet?url=%T"
                    },
                    {
                        "name": "Send by Gmail",
                        "url": "https://mail.google.com/mail/u/0/?tf=cm&source=mailto&body=%n %T"
                    },
                    {
                        "name": "Share to Facebook",
                        "url": "https://www.facebook.com/sharer/sharer.php?u=%T&t=%n"
                    },
                    {
                        "name": "🧮  Calculator",
                        "url": "calculator://"
                    },
                    {
                        "name": "🔎  Everything",
                        "url": "ES://%s"
                    },
                    {
                        "name": "🦊  Firefox",
                        "url": "FirefoxURL-308046B0AF4A39CB://%u"
                    },
                    {
                        "name": "⏰  Clock",
                        "url": "ms-clock://"
                    },
                    {
                        "name": "✂️  Screenclip",
                        "url": "ms-screenclip://"
                    },
                    {
                        "name": "☑️  ToDo",
                        "url": "ms-todo://",
                        "description": "Microsoft To-Do"
                    },
                    {
                        "name": "📓  Onenote",
                        "url": "onenote://"
                    },
                    {
                        "name": "⌨️  VSCode",
                        "url": "vscode://%u"
                    },
                    {
                        "name": "Open the link inside words",
                        "url": "%sr.replace(/[^\\w\\-_\\.~!\\*'\\(\\);:@&=\\+\\$,\\/\\?#\\[\\]%]/g,\"\")"
                    },
                    {
                        "name": "Copy to Markdown",
                        "url": "c:[%sr](%t)"
                    },
                    {
                        "name": "📱 Send to phone",
                        "url": "https://s.hoothin.com/#p{wait(x-peer)&call(document.querySelector('x-peer').dispatchEvent(new Event('contextmenu')))&#textInput=%s&click(#textInput+div>button)}",
                        "icon": "https://s.hoothin.com/images/favicon-96x96.png"
                    },
                    {
                        "name": "Bing Search in site",
                        "url": "https://www.bing.com/search?q=%s%20site%3A%h"
                    },
                    {
                        "name": "Duckduckgo Search in site",
                        "url": "https://duckduckgo.com/?q=%s%20site%3A%h"
                    },
                    {
                        "name": "Yahoo Search in site",
                        "url": "https://search.yahoo.com/search;?p=%s%20site%3A%h"
                    },
                    {
                        "name": "Yandex Search in site",
                        "url": "https://yandex.com/search/?text=%s%20site%3A%h"
                    },
                    {
                        "name": "Startpage Search in site",
                        "url": "https://www.startpage.com/sp/search?query=%s%20site%3A%h",
                        "icon": "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
                    },
                    {
                        "name": "Douban rating",
                        "url": "showTips:https://www.douban.com/search?cat=1002&q=%s \n<p style=\"margin: 5px;\">\n{h3>a}\n<span style=\"position: absolute; right: 10px; color: orange;\">{.rating_nums}</span>\n</p>\n<div style=\"display: flex; font-size: 20px; width: 500px;\">\n<img src=\"https://images.weserv.nl/?url={.pic>a>img|src}\"/>\n<div>\n<div>{.subject-cast}</div>\n<div style=\"font-size: 16px; margin-top: 10px; border-top: 1px solid;\">{.content>p}</div>\n</div>\n</div>",
                        "icon": "https://www.douban.com/favicon.ico"
                    },
                    {
                        "name": "Metacritic rating",
                        "url": "showTips:https://www.metacritic.com/autosearch%p{search_term=%s&image_size=98&search_each=false}\n<div style=\"display: flex; font-size: 25px;\">\n<img src=\"{json.autoComplete.results.0.imagePath}\"/>\n<div>\n<p>{json.autoComplete.results.0.name}</p>\n<div style=\"display: flex; justify-content: space-between; align-items: center;    border-top: 1px solid;\">\n<span style=\"margin: 0 10px;\">{json.autoComplete.results.0.refType}</span>\n<span style=\"margin: 0 10px;\">{json.autoComplete.results.0.itemDate}</span>\n<span style=\"color: orange;margin: 0 10px;\">{json.autoComplete.results.0.metaScore}</span>\n</div>\n</div>\n</div>",
                        "icon": "https://www.metacritic.com/favicon.ico"
                    },
                    {
                        "name": "Preview wikipedia",
                        "url": "showTips:https://en.wikipedia.org/wiki/%s\n<div style=\"max-height: 500px; margin: 5px; overflow: hidden; font-size: large; text-align: left; font-weight: initial; line-height: initial;\">\n<img style=\"max-width: 250px; margin: 0 10px;\" align=\"left\" src=\"{.infobox .image>img|src}\"/>\n{.mw-parser-output>p}\n</div>"
                    },
                    {
                        "name": "Google lens",
                        "url": "https://www.google.com/imghp#p{click([aria-label\\=\"Search by image\"])&[name\\=\"encoded_image\"]=%i}",
                        "description": "Search for clipboard images"
                    },
                    {
                        "name": "🛠️ Copy selected（pic&link）",
                        "url": "c:%element{}"
                    },
                    {
                        "name": "🛠️ Copy selected（txt(link)）",
                        "url": "c:%element{}.replace(/!\\[.*?\\]\\(.*?\\)/g,\"\").replace(/\\[ *\\]\\(.*?\\)\\s*/g,\"\").replace(/\\[((.|\\n)*?)\\](\\(.*?\\))/g,\"$1$3\")"
                    },
                    {
                        "name": "🛠️ Copy selected（{ txt | link }）",
                        "url": "c:%element{}.replace(/!\\[.*?\\]\\(.*?\\)/g,\"\").replace(/\\[\\s*\\]\\(.*?\\)\\s*/g,\"\").replace(/\\[((.|\\n)*?)\\]\\((.*?)\\)/g,\"{ $1 | $3 }\")"
                    }
                ]
            },
            {
                "type": "Page",
                "icon": "list",
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "Search cache",
                        "url": "https://2tool.top/kuaizhao.php?k=%u",
                        "icon": "data:image/svg+xml,%3Csvg xmlns=\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 256\"%3E%3Cg fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"%3E%3Cpath d=\"M 239.98507%2C55.993592 A 111.98507%2C39.994664 0 0 1 128%2C95.988256 111.98507%2C39.994664 0 0 1 16.01493%2C55.993592 111.98507%2C39.994664 0 0 1 128%2C15.998927 111.98507%2C39.994664 0 0 1 239.98507%2C55.993592 Z\"%2F%3E%3Cpath d=\"m 239.98507%2C199.97441 a 111.98507%2C39.994664 0 0 1 -55.99253%2C34.63639 111.98507%2C39.994664 0 0 1 -111.985079%2C0 111.98507%2C39.994664 0 0 1 -55.992531%2C-34.6364\"%2F%3E%3Cpath d=\"m 239.98507%2C151.9808 a 111.98507%2C39.994664 0 0 1 -55.99253%2C34.6364 111.98507%2C39.994664 0 0 1 -111.985079%2C-1e-5 A 111.98507%2C39.994664 0 0 1 16.01493%2C151.9808\"%2F%3E%3Cpath d=\"m 239.98507%2C103.9872 a 111.98507%2C39.994664 0 0 1 -55.99253%2C34.6364 111.98507%2C39.994664 0 0 1 -111.985079%2C0 111.98507%2C39.994664 0 0 1 -55.992531%2C-34.6364\"%2F%3E%3Cpath d=\"M 16.01493%2C55.99377 V 199.97441\"%2F%3E%3Cpath d=\"M 239.98507%2C55.993592 V 199.97441\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    },
                    {
                        "name": "Web archive",
                        "url": "https://web.archive.org/web/*/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico"
                    },
                    {
                        "name": "Save archive",
                        "url": "https://web.archive.org/save/%u",
                        "icon": "https://web.archive.org/_static/images/archive.ico"
                    },
                    {
                        "name": "Edit current page",
                        "url": "javascript:(function(){document.body.setAttribute('contenteditable', 'true');alert('Now you can modify the page, cancel by ESC');document.onkeydown = function (e) {e = e || window.event;if(e.keyCode==27){document.body.setAttribute('contenteditable', 'false');}}})();"
                    },
                    {
                        "name": "Open url",
                        "url": "%t",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik03MjIuOCA0NTlsLTE4LjkgMTguOS0yLjcgMi43LTQuNyA0LjgtNTIuNyA1Mi43IDI2LjMgMjYuMyA1Mi43LTUyLjcgMTg0LjQgMTg0LjQtMjEwLjcgMjEwLjgtMTg0LjQtMTg0LjQgNTIuNi01Mi43LTI2LjMtMjYuNC01Mi43IDUyLjctMjYuMyAyNi40IDIzNy4xIDIzNy4xIDI2My40LTI2My41eiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMjcuNyAzNTMuNmwzNDIuNSAzNDIuNSAyNi4zLTI2LjNMMzU0IDMyNy4zeiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMDEuMyA1MTEuN0wxMTYuOSAzMjcuM2wyMTAuOC0yMTAuN0w1MTIuMSAzMDFsLTUyLjcgNTIuNiAyNi4zIDI2LjQgNTIuNy01Mi43IDI2LjMtMjYuNC0yMzctMjM3TDY0LjIgMzI3LjNsMjM3LjEgMjM3LjEgMjYuMy0yNi4zIDUyLjgtNTIuN0wzNTQgNDU5eiIgZmlsbD0iIzA2MDAwMSIvPjwvc3ZnPg==",
                        "description": "ctrl: backTab | alt: mini-window | ctrl+shift: inPrivate",
                        "openInNewTab": true
                    },
                    {
                        "name": "Copy target svg to base64",
                        "url": "javascript:(()=>{let svg=window.targetElement&&window.targetElement.querySelector('svg');if(svg){navigator.clipboard.writeText('data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(svg)))));alert(\"copy over!\")}})()"
                    }
                ]
            }
        ];
        break;
}