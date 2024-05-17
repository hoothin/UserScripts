//Open setting page to change data, NOT HERE!
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
                        "name": "果壳",
                        "url": "https://www.guokr.com/search/all/?wd=%s"
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
                        "name": "Pinterest",
                        "url": "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
                    },
                    {
                        "name": "Deviantart",
                        "url": "https://www.deviantart.com/browse/all/?q=%s"
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
                        "name": "POE",
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&[class*\\='ChatMessageInputContainer']>textarea=Please help me to translate \\`%s\\` to English, please return only translated content not include the origin text&click(button[class*\\='ChatMessageSendButton_sendButton'])}"
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
                        "name": "樱花动漫",
                        "url": "https://www.yhdmz.org/list/?ex=1&kw=%s"
                    },
                    {
                        "name": "在线之家",
                        "url": "https://www.zxzj.org/vodsearch/-------------.html?wd=%s",
                        "icon": "https://zxzj.vip/statics/img/favicon.ico"
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
                        "name": "关注我的公众号",
                        "url": "https://mp.weixin.qq.com/s?__biz=MzkxMjY1NjkzNQ==&mid=2247483662&idx=1&sn=faf637ec27d15fe02522ff0c6cd4957e",
                        "icon": "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
                        "description": "打开配置页删除此项"
                    },
                    {
                        "name": "百度 ",
                        "url": "[\"百度\"]"
                    },
                    {
                        "name": "Google",
                        "url": "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
                        "keywords": "textarea[name='q']",
                        "match": "https://www\\.google\\..*/search(?!.*tbm=isch)"
                    },
                    {
                        "name": "📄  复制",
                        "url": "c:%sr",
                        "nobatch": true
                    },
                    {
                        "name": "📝  粘贴",
                        "url": "paste:"
                    },
                    {
                        "name": "🔆 页内搜索",
                        "url": "find:%sr"
                    },
                    {
                        "name": "百度小窗搜索",
                        "url": "showTips:https://m.baidu.com/s?word=%s\n<iframe src=\"{url}\" style=\" width: 600px; height: 400px; \">\n</iframe>\n<style>\n.search-jumper-tips{\n    background: unset;\n    padding: 0;\n}\n</style>"
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
                        "name": "维基百科预览",
                        "url": "showTips:https://zh.wikipedia.org/wiki/%s\n<div style=\"max-height: 500px; margin: 5px; overflow: hidden; font-size: large; text-align: left; font-weight: initial; line-height: initial;\">\n<img style=\"max-width: 250px; margin: 0 10px;\" align=\"left\" src=\"{.infobox img,figure>a>img|src}\"/>\n{.mw-parser-output>p}\n</div>"
                    },
                    {
                        "name": "Metacritic评分",
                        "url": "showTips:https://www.metacritic.com/search/%s/\n<div style=\"display: flex; font-size: 25px;\">\n<img src=\"{img.g-container-rounded-small|src}\"/>\n<div>\n<h2>{.c-pageSiteSearch-results-item>div>p}</h2>\n<div style=\"display: flex; justify-content: space-between; align-items: center;    border-top: 1px solid;\">\n<span style=\"margin: 0 10px;\">{.u-text-uppercase}</span>\n<span style=\"margin: 0 10px;\">{.c-pageSiteSearch-results-item strong}</span>\n<span style=\"color: orange;margin: 0 10px;\">{.c-siteReviewScore}</span>\n</div>\n</div>\n</div>"
                    },
                    {
                        "name": "IMDb评分",
                        "url": "showTips:https://www.imdb.com/find/?q=%s&exact=true.then{.find-title-result .ipc-metadata-list-summary-item__t}\n<h2 style=\"margin: 5px;\">\n{.hero__primary-text}\n<span style=\"position: absolute; right: 10px; color: orange;\">{.ipc-btn__text>div>div>div}</span>\n</h2>\n<div style=\"display: flex; font-size: 20px; width: 500px;\">\n<img style=\"height: fit-content;\" src=\"{.ipc-image|src}\"/>\n<div style=\"font-size: 16px; line-height: 1.5; text-align: left; margin: 5px;\">\n<div>{a.ipc-chip|<span style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">()</span>}</div>\n<div>Year: {h1+ul>li>.ipc-link}</div>\n<div>Director: {section>div>div>.title-pc-list>li:nth-child(1) li}</div>\n<div>Writer: {section>div>div>.title-pc-list>li:nth-child(2) li}</div>\n<div>Stars: {section>div>div>.title-pc-list>li:nth-child(3) li|()}</div>\n<div style=\"font-size: 16px; margin-top: 10px; border-top: 1px solid;\">{section>p>span}</div>\n</div>\n</div>"
                    },
                    {
                        "name": "展开所有引擎",
                        "url": "https://search.hoothin.com/all#%s"
                    },
                    {
                        "name": "💲美元转人民币",
                        "url": "showTips:http://apilayer.net/api/convert?from=USD&to=CNY&amount=1&access_key=%template{apilayer key} \n{name}<br/><i>%s USD = {json.result|*%s.replace(/\\D/g,'')} RMB</i>",
                        "kwFilter": "\\d\\$|\\$\\d",
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
                    },
                    {
                        "name": "📺 预览视频",
                        "url": "showTips:\n<video loop autoplay src=\"%s\">\n<a href=\"%s\" download=\"%s\">Download video</a>\n</video>",
                        "kwFilter": "^http.*\\.(3gpp|m4v|mkv|mp4|ogv|webm)\\b"
                    },
                    {
                        "name": "🎵 预览音频",
                        "url": "showTips:\n<audio loop autoplay src=\"%s\">\n<a href=\"%s\" download=\"%s\">Download audio</a>\n</audio>",
                        "kwFilter": "^http.*\\.(flac|m4a|mp3|oga|ogg|opus|wav)\\b"
                    },
                    {
                        "name": "🏞️ 预览图片",
                        "url": "showTips:\n<img src=\"%s\">",
                        "kwFilter": "^http.*\\.(avif|bmp|gif|gifv|ico|jfif|jpe|jpeg|jpg|png|svg|webp|xbm)\\b"
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
                        "name": "Google lens",
                        "url": "https://www.google.com/imghp#p{sleep(500)&click([data-propagated-experiment-ids])&[name\\=\"encoded_image\"]=%i}"
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
                        "name": "二维码生成-以图搜图",
                        "url": "[\"二维码生成\"]"
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
                    },
                    {
                        "name": "📺 预览视频-当前网页",
                        "url": "[\"📺 预览视频\"]",
                        "kwFilter": "^http.*\\.(3gpp|m4v|mkv|mp4|ogv|webm)(\\?|#|$)"
                    },
                    {
                        "name": "🎵 预览音频-当前网页",
                        "url": "[\"🎵 预览音频\"]",
                        "kwFilter": "^http.*\\.(flac|m4a|mp3|oga|ogg|opus|wav)(\\?|#|$)"
                    },
                    {
                        "name": "🏞️ 预览图片-当前网页",
                        "url": "[\"🏞️ 预览图片\"]",
                        "kwFilter": "^http.*\\.(avif|bmp|gif|gifv|ico|jfif|jpe|jpeg|jpg|png|svg|webp|xbm)(\\?|#|$)"
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
                        "url": "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓"
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
                        "url": "https://www.jango.com/music/%s"
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
                        "url": "https://search.brave.com/search?q=%s"
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
                        "name": "📝  Paste",
                        "url": "paste:"
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
                        "url": "showTips:https://www.imdb.com/find/?q=%s&exact=true.then{.find-title-result .ipc-metadata-list-summary-item__t}\n<h2 style=\"margin: 5px;\">\n{.hero__primary-text}\n<span style=\"position: absolute; right: 10px; color: orange;\">{.ipc-btn__text>div>div>div}</span>\n</h2>\n<div style=\"display: flex; font-size: 20px; width: 500px;\">\n<img style=\"height: fit-content;\" src=\"{.ipc-image|src}\"/>\n<div style=\"font-size: 16px; line-height: 1.5; text-align: left; margin: 5px;\">\n<div>{a.ipc-chip|<span style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">()</span>}</div>\n<div>Year: {h1+ul>li>.ipc-link}</div>\n<div>Director: {section>div>div>.title-pc-list>li:nth-child(1) li}</div>\n<div>Writer: {section>div>div>.title-pc-list>li:nth-child(2) li}</div>\n<div>Stars: {section>div>div>.title-pc-list>li:nth-child(3) li|()}</div>\n<div style=\"font-size: 16px; margin-top: 10px; border-top: 1px solid;\">{section>p>span}</div>\n</div>\n</div>"
                    },
                    {
                        "name": "📦 Batch open links",
                        "url": "%s[all]",
                        "kwFilter": "^https?:"
                    },
                    {
                        "name": "↩️ Short link restore",
                        "url": "showTips:%s\n{url}",
                        "kwFilter": "^https?://."
                    },
                    {
                        "name": "📺 Preview video",
                        "url": "showTips:\n<video loop autoplay src=\"%s\">\n<a href=\"%s\" download=\"%s\">Download video</a>\n</video>",
                        "kwFilter": "^http.*\\.(3gpp|m4v|mkv|mp4|ogv|webm)\\b"
                    },
                    {
                        "name": "🎵 Preview audio",
                        "url": "showTips:\n<audio loop autoplay src=\"%s\">\n<a href=\"%s\" download=\"%s\">Download audio</a>\n</audio>",
                        "kwFilter": "^http.*\\.(flac|m4a|mp3|oga|ogg|opus|wav)\\b"
                    },
                    {
                        "name": "🏞️ Preview image",
                        "url": "showTips:\n<img src=\"%s\">",
                        "kwFilter": "^http.*\\.(avif|bmp|gif|gifv|ico|jfif|jpe|jpeg|jpg|png|svg|webp|xbm)\\b"
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
                    },
                    {
                        "name": "Google lens-search image from clipboard",
                        "url": "[\"Google lens\"]",
                        "description": "search image from clipboard"
                    },
                    {
                        "name": "Mainonly by jerrylus",
                        "url": "javascript:(function(){var e=document.body;let n=document.head.appendChild(document.createElement(\"style\"));n.textContent=\".mainonly { outline: 2px solid red; }\";let t=CSS.supports(\"selector(:has(*))\");function o(n){n instanceof HTMLElement&&(e.classList.remove(\"mainonly\"),(e=n).classList.add(\"mainonly\"))}function i(e){o(e.target)}function l(o){if(o.preventDefault(),t)n.textContent=\":not(:has(.mainonly), .mainonly, .mainonly *) { visibility: hidden; }\";else{n.textContent=\":not(.mainonly *, .mainonly-ancestor) { visibility: hidden; }\";var i=e;do i.classList.add(\"mainonly-ancestor\");while(i=i.parentElement)}r()}function s(o){if(\"Escape\"===o.key){o.preventDefault();var i=window.scrollY||document.documentElement.scrollTop;if(n.remove(),document.removeEventListener(\"keydown\",s),r(),e?.classList.remove(\"mainonly\"),!t)for(let l of document.getElementsByClassName(\"mainonly-ancestor\"))l.classList.remove(\"mainonly-ancestor\");window.scrollTo(0,i)}}function a(n){n.preventDefault(),n.deltaY<0?o(e.parentElement):o(e.firstElementChild)}function r(){document.removeEventListener(\"mouseover\",i),document.removeEventListener(\"click\",l),document.removeEventListener(\"wheel\",a)}document.addEventListener(\"mouseover\",i),document.addEventListener(\"click\",l),document.addEventListener(\"wheel\",a,{passive:!1}),document.addEventListener(\"keydown\",s)}())"
                    },
                    {
                        "name": "📺 Preview video-Page",
                        "url": "[\"📺 Preview video\"]",
                        "kwFilter": "^http.*\\.(3gpp|m4v|mkv|mp4|ogv|webm)(\\?|#|$)"
                    },
                    {
                        "name": "🎵 Preview audio-Page",
                        "url": "[\"🎵 Preview audio\"]",
                        "kwFilter": "^http.*\\.(flac|m4a|mp3|oga|ogg|opus|wav)(\\?|#|$)"
                    },
                    {
                        "name": "🏞️ Preview image-Page",
                        "url": "[\"🏞️ Preview image\"]",
                        "kwFilter": "^http.*\\.(avif|bmp|gif|gifv|ico|jfif|jpe|jpeg|jpg|png|svg|webp|xbm)(\\?|#|$)"
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
                        "name": "Google lens",
                        "url": "https://www.google.com/imghp#p{sleep(500)&click([data-propagated-experiment-ids])&[name\\=\"encoded_image\"]=%i}",
                        "description": "Search for clipboard images"
                    },
                    {
                        "name": "Lunapic editor",
                        "url": "https://www.lunapic.com/editor/index.php?action=url&url=%t",
                        "nobatch": true
                    },
                    {
                        "name": "QRCode detection",
                        "url": "https://hoothin.com/qrdecode#p{#fileInput=%i}",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "TinEye",
                        "url": "https://www.tineye.com/search?url=%t"
                    },
                    {
                        "name": "WhatAnime",
                        "url": "https://trace.moe/?url=%t",
                        "icon": "https://trace.moe/favicon.png"
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
                        "url": "https://www.google.com/search?q=%s&tbm=bks&tbo=1&hl=en&gws_rd=ssl"
                    },
                    {
                        "name": "krugle",
                        "url": "http://opensearch.krugle.org/document/search/#query=%s",
                        "icon": "https://opensearch.krugle.org/media/images/favicon.ico"
                    },
                    {
                        "name": "npm",
                        "url": "https://www.npmjs.org/search?q=%s"
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
                        "url": "showTips:https://www.metacritic.com/search/%s/\n<div style=\"display: flex; font-size: 25px;\">\n<img src=\"{img.g-container-rounded-small|src}\"/>\n<div>\n<h2>{.c-pageSiteSearch-results-item>div>p}</h2>\n<div style=\"display: flex; justify-content: space-between; align-items: center;    border-top: 1px solid;\">\n<span style=\"margin: 0 10px;\">{.u-text-uppercase}</span>\n<span style=\"margin: 0 10px;\">{.c-pageSiteSearch-results-item strong}</span>\n<span style=\"color: orange;margin: 0 10px;\">{.c-siteReviewScore}</span>\n</div>\n</div>\n</div>"
                    },
                    {
                        "name": "Preview wikipedia",
                        "url": "showTips:https://en.wikipedia.org/wiki/%s\n<div style=\"max-height: 500px; margin: 5px; overflow: hidden; font-size: large; text-align: left; font-weight: initial; line-height: initial;\">\n<img style=\"max-width: 250px; margin: 0 10px;\" align=\"left\" src=\"{.infobox .image>img|src}\"/>\n{.mw-parser-output>p}\n</div>"
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
            }
        ];
        break;
}