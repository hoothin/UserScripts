//Open setting page to change data, NOT HERE!
let lang = navigator.appName === "Netscape" ? navigator.language : navigator.userLanguage;
const linkPreviewLabels = {
    "zh-CN": ["在新标签页打开", "关闭预览", "链接预览"],
    "zh-TW": ["在新分頁開啟", "關閉預覽", "連結預覽"],
    "ja": ["新しいタブで開く", "プレビューを閉じる", "リンクプレビュー"],
    "ru": ["Открыть в новой вкладке", "Закрыть просмотр", "Предпросмотр ссылки"]
}[lang === "zh-SG" ? "zh-CN" : lang] || ["Open in new tab", "Close preview", "Link preview"];
const linkPreviewUrl = `showTips:
<style>
.search-jumper-tips:has(.sj-link-preview) {
  background: none; box-shadow: none; border: 0; padding: 0;
  max-width: calc(100vw - 24px); max-height: calc(100vh - 24px);
  width: auto; overflow: visible;
}
.search-jumper-tips:has(.sj-link-preview) > div { padding: 0; margin: 0; max-width: none; }
.sj-link-preview {
  --preview-surface: #fff; --preview-header: #f5f6f8; --preview-text: #30353c;
  --preview-muted: #6a7380; --preview-line: #dde1e6; --preview-hover: #e7eaf0;
  display: flex; flex-direction: column; box-sizing: border-box;
  width: min(640px, calc(100vw - 24px)); height: min(540px, calc(100vh - 24px));
  min-width: min(280px, calc(100vw - 24px)); min-height: min(200px, calc(100vh - 24px));
  max-width: calc(100vw - 24px); max-height: calc(100vh - 24px);
  resize: both; overflow: hidden; border: 1px solid var(--preview-line); border-radius: 10px;
  background: var(--preview-surface); color: var(--preview-text);
  box-shadow: 0 8px 28px #0002; font: 14px/1.4 system-ui, sans-serif; text-shadow: none; text-align: left;
}
.sj-link-preview * { margin: 0; max-width: none; }
.sj-link-preview .sj-preview-header {
  display: flex; align-items: center; gap: 10px; flex: 0 0 42px; box-sizing: border-box; width: 100%;
  padding: 0 8px 0 14px; border-bottom: 1px solid var(--preview-line);
  background: var(--preview-header);
}
.sj-link-preview .sj-preview-header svg { width: 16px; height: 16px; flex: none; color: var(--preview-muted); }
.sj-link-preview .sj-preview-header a {
  display: block; flex: 1; min-width: 0; overflow: hidden; white-space: nowrap;
  text-overflow: ellipsis; color: inherit; text-decoration: none; font: 500 13px/1.5 system-ui, sans-serif;
}
.sj-link-preview .sj-preview-header a:hover { text-decoration: underline; }
.search-jumper-tips .sj-link-preview button[data-close] {
  position: static; display: grid; place-items: center; flex: none; width: 28px; height: 28px;
  margin: 0; padding: 0; border: 0; border-radius: 6px; cursor: pointer;
  background: transparent; color: var(--preview-muted); font: 22px/1 system-ui, sans-serif;
}
.search-jumper-tips .sj-link-preview button[data-close]:hover { background: var(--preview-hover); color: var(--preview-text); }
.sj-link-preview a:focus-visible, .sj-link-preview button:focus-visible { outline: 2px solid #8ca8c9; outline-offset: 2px; }
.sj-link-preview iframe { display: block; flex: 1; min-height: 0; width: 100%; height: 100%; border: 0; background: #fff; }
@media (prefers-color-scheme: dark) {
  .sj-link-preview {
    --preview-surface: #1c2127; --preview-header: #24292f; --preview-text: #d3d8df;
    --preview-muted: #9aa4b1; --preview-line: #ffffff1a; --preview-hover: #ffffff12;
    color-scheme: dark; box-shadow: 0 8px 28px #0005;
  }
}
</style>
<div class="sj-link-preview">
  <div class="sj-preview-header" data-drag>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 4h6v6m0-6L10 14M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/></svg>
    <a href="%t" target="_blank" rel="noopener noreferrer" title="${linkPreviewLabels[0]}" data-drag>%t</a>
    <button type="button" data-close title="${linkPreviewLabels[1]}" aria-label="${linkPreviewLabels[1]}">×</button>
  </div>
  <iframe src="%t" title="${linkPreviewLabels[2]}"></iframe>
</div>`;
let sitesConfig = {};
switch (lang) {
    case "zh-CN":
    case "zh-SG":
        sitesConfig = [
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
                "type": "划词搜索",
                "icon": "sitemap",
                "selectTxt": true,
                "openInNewTab": true,
                "sites": [
                    {
                        "name": "关注我的公众号",
                        "url": "https://mp.weixin.qq.com/s/ldpYIQGfveILJK_VabIBQA",
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
                        "match": "https://www\\.google\\..*/search((?!udm=2).)*$"
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
                        "url": "showTips:\n<iframe src=\"https://m.baidu.com/s?word=%s\" style=\" width: 600px; height: 400px; \">\n</iframe>\n<style>\n.search-jumper-tips{\n    background:unset;\n    box-shadow:unset;\n}\n.search-jumper-tips iframe{\n    background: #f5f5f5e0;\n    box-shadow: 0px 0px 10px 0px #000;\n    width: 600px;\n    height: 400px;\n}\n</style>",
                        "icon": "https://m.baidu.com/favicon.ico"
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
                        "url": "https://s.hoothin.com/#p{wait(x-peer)&rclick(x-peer)&#textInput=%s&click(#textInput+div>button)}",
                        "icon": "https://s.hoothin.com/images/favicon-96x96.png",
                        "description": "自动发送选中文字到第一个匹配的设备"
                    },
                    {
                        "name": "问AI",
                        "url": "[\"Poe - Sage AI Chat\"]"
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
                        "url": "showTips:http://apilayer.net/api/convert?from=USD&to=CNY&amount=1&access_key=%template{apilayer key} \n{name}<br/><i>%sr USD = {json.result|*%sr.replace(/\\D/g,'')} RMB</i>",
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
                        "url": "%sr.replace(/(点|。)/g,\".\").replace(/[^\\s\\w\\-_\\.~!\\*';:@&=\\+\\$,\\/\\?#\\[\\]%]/g,\"\").replace(/https:\\/\\/pan\\.baidu\\.com\\/s\\//,\"\").replace(/.*([\\s:：]|^)(1[a-z_0-9\\-]{22,})[\\s\\S]*?\\b([a-z0-9]{4}\\b|$).*/i,\"https://pan.baidu.com/s/$2?pwd=$3\").replace(/ /g,\"\").replace(/^/,\"http://\").replace(/^http:\\/\\/(https?:)/,\"$1\")",
                        "kwFilter": "\\w\\S*\\.\\S*\\w|\\w.*[点。].*\\w|1[a-zA-Z0-9]{22,}",
                        "description": "支持类似“pan点baidu。com😄河蟹”以及“1bP23pzUpIV4CMuoMjOfxFA提取码:prt4”的分享链接",
                        "nobatch": true
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
                        "name": "🔓 解码 base64",
                        "url": "showTips:\n📋 <span data-copy style=\"user-select: all;\">%bd</span>",
                        "kwFilter": "^\\s*[0-9a-zA-z\\+\\/\\=]{4,}\\s*$"
                    },
                    {
                        "name": "🔒 base64加密",
                        "url": "paste:%be"
                    },
                    {
                        "name": "📎 批量替换选中文字",
                        "url": "paste:%sr.replace(/%input{请输入匹配正则}/g,\"%input{请输入替换字符串}\")"
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
                        "name": "一键抠图",
                        "url": "https://www.remove.bg/zh/upload#p{wait()&body=%i}"
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
                "type": "当前网页",
                "icon": "list",
                "selectLink": true,
                "selectPage": true,
                "openInNewTab": true,
                "sites": [
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
                        "name": "🔗 链接预览",
                        "url": linkPreviewUrl,
                        "description": "需要配合扩展“Ignore X-Frame headers”使用"
                    },
                    {
                        "name": "打开链接",
                        "url": "%t",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik03MjIuOCA0NTlsLTE4LjkgMTguOS0yLjcgMi43LTQuNyA0LjgtNTIuNyA1Mi43IDI2LjMgMjYuMyA1Mi43LTUyLjcgMTg0LjQgMTg0LjQtMjEwLjcgMjEwLjgtMTg0LjQtMTg0LjQgNTIuNi01Mi43LTI2LjMtMjYuNC01Mi43IDUyLjctMjYuMyAyNi40IDIzNy4xIDIzNy4xIDI2My40LTI2My41eiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMjcuNyAzNTMuNmwzNDIuNSAzNDIuNSAyNi4zLTI2LjNMMzU0IDMyNy4zeiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMDEuMyA1MTEuN0wxMTYuOSAzMjcuM2wyMTAuOC0yMTAuN0w1MTIuMSAzMDFsLTUyLjcgNTIuNiAyNi4zIDI2LjQgNTIuNy01Mi43IDI2LjMtMjYuNC0yMzctMjM3TDY0LjIgMzI3LjNsMjM3LjEgMjM3LjEgMjYuMy0yNi4zIDUyLjgtNTIuN0wzNTQgNDU5eiIgZmlsbD0iIzA2MDAwMSIvPjwvc3ZnPg==",
                        "description": "ctrl 后台标签页 alt 小窗 ctrl+shift 隐身窗口",
                        "openInNewTab": true
                    },
                    {
                        "name": "☁️便宜服务器",
                        "url": "https://my.racknerd.com/aff.php?aff=12390&pid=903",
                        "description": "👍性价比最高的服务器，一年仅需11美元\n可以用支付宝付款\n已经稳定运行6年"
                    },
                    {
                        "name": "便宜域名",
                        "url": "https://www.namesilo.com/domain/search-domains?rid=44fb284bf",
                        "description": "比阿里云便宜，可以用支付宝支付"
                    },
                    {
                        "name": "二维码生成",
                        "url": "https://hoothin.com/qrcode#%U",
                        "icon": "https://hoothin.com/qrcode/favicon.svg"
                    },
                    {
                        "name": "自动下载到百度网盘",
                        "url": "https://pan.baidu.com/disk/main#p{click([data-id\\=downloadLink])&div.nd-download-link div[role\\=dialog] input=%t&click(.nd-download-link button.u-button--primary)}",
                        "icon": "https://nd-static.bdstatic.com/m-static/v20-main/favicon-main.ico"
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
                "type": "AI",
                "icon": "robot",
                "selectTxt": true,
                "openInNewTab": 1,
                "sites": [
                    {
                        "name": "解释以下内容-秘塔",
                        "url": "https://metaso.cn/#p{textarea.search-consult-textarea=请解释以下内容\n`%s`&click(button.send-arrow-button)}"
                    },
                    {
                        "name": "解释以下内容-Gemini",
                        "url": "https://gemini.google.com/app#p{.ql-editor.textarea=请解释以下内容\n`%s`} ",
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg"
                    },
                    {
                        "name": "Bard",
                        "url": "https://gemini.google.com/app#p{.ql-editor.textarea=%s}",
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg"
                    },
                    {
                        "name": "Poe - Sage AI Chat",
                        "url": "https://poe.com/#p{sleep(2000)&[class*\\=ChatMessageInputContainer]>textarea=%s&click([data-button-send])}"
                    },
                    {
                        "name": "ChatGPT",
                        "url": "https://chat.openai.com/#p{#prompt-textarea=%s&click(#prompt-textarea+button)}"
                    },
                    {
                        "name": "Futurepedia - Find The Best AI Tools & Software",
                        "url": "https://www.futurepedia.io/search?search=%s"
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
                        "name": "将svg图片复制为base64",
                        "url": "javascript:(()=>{let svg=window.targetElement&&window.targetElement.querySelector('svg');if(svg){navigator.clipboard.writeText('data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(svg)))));alert(\"copy over!\")}})()"
                    }
                ]
            }
        ];
        break;
    case "ja":
        sitesConfig = [
            {
                "description": "検索エンジンの主分類",
                "icon": "search",
                "sites": [
                    {
                        "keywords": "textarea[name='q']",
                        "match": "https://www\\.google\\..*/search((?!udm=2).)*$",
                        "name": "Google",
                        "url": "https://www.google.co.jp/search?q=%s&ie=utf-8&oe=utf-8"
                    },
                    {
                        "match": "https://search\\.yahoo\\.co\\.jp/search",
                        "name": "Yahoo! JAPAN",
                        "url": "https://search.yahoo.co.jp/search?p=%s"
                    },
                    {
                        "match": "^https://(www|cn|global)\\.bing\\.com/search",
                        "name": "Bing",
                        "url": "https://www.bing.com/search?q=%s"
                    },
                    {
                        "name": "Goo",
                        "url": "https://service.smt.docomo.ne.jp/portal/search/web/result.html?q=%s"
                    },
                    {
                        "match": "https://duckduckgo\\.com",
                        "name": "DuckDuckGo",
                        "url": "https://duckduckgo.com/?q=%s"
                    },
                    {
                        "match": "https://www\\.ecosia\\.org/search",
                        "name": "Ecosia",
                        "url": "https://www.ecosia.org/search?q=%s"
                    },
                    {
                        "match": "https://www\\.perplexity\\.ai/search",
                        "name": "Perplexity",
                        "url": "https://www.perplexity.ai/search?q=%s"
                    },
                    {
                        "icon": "https://www.amazon.co.jp/favicon.ico",
                        "name": "Amazon.co.jpで検索",
                        "url": "https://www.amazon.co.jp/s?k=%s"
                    },
                    {
                        "icon": "https://www.rakuten.co.jp/favicon.ico",
                        "name": "楽天市場で検索",
                        "url": "https://search.rakuten.co.jp/search/mall/%s/"
                    }
                ],
                "type": "検索"
            },
            {
                "icon": "sitemap",
                "openInNewTab": true,
                "selectTxt": true,
                "sites": [
                    {
                        "name": "Googleで検索",
                        "url": "[\"Google\"]"
                    },
                    {
                        "name": "📄  コピー",
                        "nobatch": true,
                        "url": "c:%sr"
                    },
                    {
                        "name": "📝  貼り付け",
                        "url": "paste:"
                    },
                    {
                        "name": "🔆 ページ内検索",
                        "url": "find:%sr"
                    },
                    {
                        "name": "Googleサイト内検索",
                        "url": "https://www.google.co.jp/search?q=%s%20site%3A%h"
                    },
                    {
                        "name": "AIに質問",
                        "url": "[\"この内容を解説 (Gemini)\"]"
                    },
                    {
                        "name": "Yahoo! サイト内検索",
                        "url": "https://search.yahoo.co.jp/search?p=%s%20site%3A%h"
                    },
                    {
                        "icon": "https://hoothin.com/qrcode/favicon.svg",
                        "name": "テキストをQRコードに変換",
                        "url": "https://hoothin.com/qrcode#%s"
                    },
                    {
                        "name": "ウィキペディアプレビュー",
                        "url": "showTips:https://ja.wikipedia.org/wiki/%s\n<div style=\"max-height: 500px; margin: 5px; overflow: hidden; font-size: large; text-align: left; font-weight: initial; line-height: initial;\">\n<img style=\"max-width: 250px; margin: 0 10px;\" align=\"left\" src=\"{.infobox img,figure>a>img|src}\"/>\n{.mw-parser-output>p}\n</div>"
                    },
                    {
                        "name": "Metacriticスコア",
                        "url": "showTips:https://www.metacritic.com/search/%s/\n<div style=\"display: flex; font-size: 25px;\">\n<img src=\"{img.g-container-rounded-small|src}\"/>\n<div>\n<h2>{.c-pageSiteSearch-results-item>div>p}</h2>\n<div style=\"display: flex; justify-content: space-between; align-items: center;    border-top: 1px solid;\">\n<span style=\"margin: 0 10px;\">{.u-text-uppercase}</span>\n<span style=\"margin: 0 10px;\">{.c-pageSiteSearch-results-item strong}</span>\n<span style=\"color: orange;margin: 0 10px;\">{.c-siteReviewScore}</span>\n</div>\n</div>\n</div>"
                    },
                    {
                        "name": "IMDbスコア",
                        "url": "showTips:https://www.imdb.com/find/?q=%s&exact=true.then{.find-title-result .ipc-metadata-list-summary-item__t}\n<h2 style=\"margin: 5px;\">\n{.hero__primary-text}\n<span style=\"position: absolute; right: 10px; color: orange;\">{.ipc-btn__text>div>div>div}</span>\n</h2>\n<div style=\"display: flex; font-size: 20px; width: 500px;\">\n<img style=\"height: fit-content;\" src=\"{.ipc-image|src}\"/>\n<div style=\"font-size: 16px; line-height: 1.5; text-align: left; margin: 5px;\">\n<div>{a.ipc-chip|<span style=\"white-space: nowrap;margin: 5px; font-size: 16px; border-radius: 5px; padding: 2px; box-shadow: 0px 0px 10px 0px #000;\">()</span>}</div>\n<div>Year: {h1+ul>li>.ipc-link}</div>\n<div>Director: {section>div>div>.title-pc-list>li:nth-child(1) li}</div>\n<div>Writer: {section>div>div>.title-pc-list>li:nth-child(2) li}</div>\n<div>Stars: {section>div>div>.title-pc-list>li:nth-child(3) li|()}</div>\n<div style=\"font-size: 16px; margin-top: 10px; border-top: 1px solid;\">{section>p>span}</div>\n</div>\n</div>"
                    },
                    {
                        "name": "すべてのエンジンを展開",
                        "url": "https://search.hoothin.com/all#%s"
                    },
                    {
                        "kwFilter": "\\d\\$|\\$\\d",
                        "name": "💴ドルを円に変換",
                        "nobatch": true,
                        "url": "showTips:http://apilayer.net/api/convert?from=USD&to=JPY&amount=1&access_key=%template{apilayer key} \n{name}<br/><i>%sr USD = {json.result|*%sr.replace(/\\D/g,'')} JPY</i>"
                    },
                    {
                        "kwFilter": "^https?:",
                        "name": "📦 リンクを一括オープン",
                        "url": "%s[all]"
                    },
                    {
                        "description": "「example.com」などのテキストリンクをサポート",
                        "kwFilter": "\\w\\S*\\.\\S*\\w|\\w.*[点。].*\\w",
                        "name": "🔗  テキストリンクを開く",
                        "nobatch": true,
                        "url": "%sr.replace(/(点|。)/g,\".\").replace(/[^\\s\\w\\-_\\.~!\\*';:@&=\\+\\$,\\/\\?#\\[\\]%]/g,\"\").replace(/ /g,\"\").replace(/^/,\"http://\").replace(/^http:\\/\\/(https?:)/,\"$1\")"
                    },
                    {
                        "icon": "https://ejje.weblio.jp/favicon.ico",
                        "kwFilter": "^[a-zA-Z\\s]+$",
                        "name": "Weblio英和・和英辞典",
                        "url": "showTips:https://ejje.weblio.jp/content/%s\n<div style=\"font-size: 16px; line-height: 1.5; text-align: left; margin: 5px;\">\n<b>{.summaryM.midashigo}</b><br/>\n{.summaryM.level_v15} <br/>\n{.summaryM.wordclass} {.summaryM.Jtnhj}\n</div>"
                    },
                    {
                        "kwFilter": "^[a-zA-Z]+$",
                        "name": "DeepL英語から日本語",
                        "url": "https://www.deepl.com/translator#en/ja/%s"
                    },
                    {
                        "kwFilter": "^https?://.",
                        "name": "↩️ 短縮URLを復元",
                        "url": "showTips:%s\n{url}"
                    },
                    {
                        "kwFilter": "^\\s*[0-9a-zA-z\\+\\/\\=]{4,}\\s*$",
                        "name": "🔓 base64デコード",
                        "url": "showTips:\n📋 <span data-copy style=\"user-select: all;\">%bd</span>"
                    },
                    {
                        "name": "🔒 base64エンコード",
                        "url": "paste:%be"
                    },
                    {
                        "name": "📎 選択テキストを一括置換",
                        "url": "paste:%sr.replace(/%input{マッチング正規表現を入力}/g,\"%input{置換文字列を入力}\")"
                    },
                    {
                        "kwFilter": "^http.*\\.(3gpp|m4v|mkv|mp4|ogv|webm)\\b",
                        "name": "📺 ビデオプレビュー",
                        "url": "showTips:\n<video loop autoplay src=\"%s\">\n<a href=\"%s\" download=\"%s\">ビデオをダウンロード</a>\n</video>"
                    },
                    {
                        "kwFilter": "^http.*\\.(flac|m4a|mp3|oga|ogg|opus|wav)\\b",
                        "name": "🎵 オーディオプレビュー",
                        "url": "showTips:\n<audio loop autoplay src=\"%s\">\n<a href=\"%s\" download=\"%s\">オーディオをダウンロード</a>\n</audio>"
                    },
                    {
                        "kwFilter": "^http.*\\.(avif|bmp|gif|gifv|ico|jfif|jpe|jpeg|jpg|png|svg|webp|xbm)\\b",
                        "name": "🏞️ 画像プレビュー",
                        "url": "showTips:\n<img src=\"%s\">"
                    }
                ],
                "type": "選択テキスト検索"
            },
            {
                "icon": "eye",
                "openInNewTab": true,
                "selectImg": true,
                "sites": [
                    {
                        "name": "Google画像検索",
                        "url": "https://www.google.com/searchbyimage?sbisrc=cr_1_0_0&image_url=%T"
                    },
                    {
                        "name": "Google Lens",
                        "url": "https://www.google.com/imghp#p{sleep(500)&click([data-propagated-experiment-ids])&[name\\=\"encoded_image\"]=%i}"
                    },
                    {
                        "icon": "https://hoothin.com/qrcode/favicon.svg",
                        "name": "QRコードデコード",
                        "url": "https://hoothin.com/qrdecode#p{#fileInput=%i}"
                    },
                    {
                        "name": "Google翻訳画像",
                        "url": "https://translate.google.com/?op=images#p{input[accept^\\=\"image\"]=%i}"
                    },
                    {
                        "name": "一键抠图",
                        "url": "https://www.remove.bg/ja/upload#p{wait()&body=%i}"
                    },
                    {
                        "icon": "https://trace.moe/favicon.png",
                        "name": "アニメシーン検索",
                        "url": "https://trace.moe/?url=%T"
                    },
                    {
                        "description": "Lunapicで画像を編集",
                        "name": "Lunapic",
                        "nobatch": true,
                        "url": "https://www.lunapic.com/editor/index.php?action=url&url=%t"
                    },
                    {
                        "name": "Bing画像検索",
                        "url": "https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:%T"
                    },
                    {
                        "name": "TinEye",
                        "url": "https://www.tineye.com/search?url=%T"
                    },
                    {
                        "name": "QRコード生成",
                        "url": "[\"QRコード生成\"]"
                    }
                ],
                "type": "画像検索"
            },
            {
                "icon": "list",
                "openInNewTab": true,
                "selectLink": true,
                "selectPage": true,
                "sites": [
                    {
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik05NjAgOTYwSDY0di02NGg4OTZ2NjR6IG0tNzMuNi02ODYuNGwtODQgODQtNDUuNiA0NS42TDM4NCA3NzZsLTE5MiA1NiA1Ni0xOTIgNTAyLjQtNTAyLjRjNC00IDkuNi02LjQgMTQuNC02LjQgNCAwIDggMS42IDEwLjQgNEw4ODggMjQ4YzcuMiA3LjIgNS42IDE3LjYtMS42IDI1LjZ6TTcxMiAzNTcuNkw2NjYuNCAzMTIgMzA0LjggNjczLjZsLTE4LjQgNjQgNjQtMTguNEw3MTIgMzU3LjZ6IG05Ny42LTk3LjZsLTQ1LjYtNDUuNi01MiA1MiA0NS42IDQ1LjYgNTItNTJ6Ij48L3BhdGg+PC9zdmc+",
                        "name": "現在のページを編集",
                        "nobatch": true,
                        "url": "javascript:(function(){document.body.setAttribute('contenteditable', 'true');alert('ウェブページ編集を有効にしました。ESCキーでキャンセル');document.onkeydown = function (e) {e = e || window.event;if(e.keyCode==27){document.body.setAttribute('contenteditable', 'false');}}})();"
                    },
                    {
                        "description": "ウェブページの右クリックおよびコピー制限を解除",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik04MDAgNDQ4SDcwNFYzMjBjMC0xMDYuNC04NS42LTE5Mi0xOTItMTkyUzMyMCAyMTMuNiAzMjAgMzIwaDY0YzAtNzAuNCA1Ny42LTEyOCAxMjgtMTI4czEyOCA1Ny42IDEyOCAxMjh2MTI4SDIyNGMtMTcuNiAwLTMyIDE0LjQtMzIgMzJ2Mzg0YzAgMTcuNiAxNC40IDMyIDMyIDMyaDU3NmMxNy42IDAgMzItMTQuNCAzMi0zMlY0ODBjMC0xNy42LTE0LjQtMzItMzItMzJ6TTUxMiA3MzZgLTM1LjIgMC02NC0yOC44LTY0LTY0czI4LjgtNjQgNjQtNjQgNjQgMjguOCA2NCA2NC0yOC44IDY0LTY0IDY0eiI+PC9wYXRoPjwvc3ZnPg==",
                        "name": "制限解除",
                        "nobatch": true,
                        "url": "javascript:var d=document,b=d.body;with(b.onselectstart=b.oncopy=b.onpaste=b.onkeydown=b.oncontextmenu=b.onmousemove=b.ondragstart=d.oncopy=d.onpaste=null,d.onselectstart=d.oncontextmenu=d.onmousedown=d.onkeydown=function(){return!0},d.wrappedJSObject||d)onmouseup=null,onmousedown=null,oncontextmenu=null;for(var a=d.getElementsByTagName(\"*\"),i=a.length-1;i>=0;i--){var o=a[i];with(o.wrappedJSObject||o)onmouseup=null,onmousedown=null}var h=d.getElementsByTagName(\"head\")[0];if(h){var s=d.createElement(\"style\");s.innerHTML=\"html,*{user-select:text!important;-moz-user-select:text!important;-webkit-user-select:text!important;-webkit-user-drag:text!important;-khtml-user-select:text!important;-khtml-user-drag:text!important;pointer-events:auto!important;}\",h.appendChild(s)}Event.prototype.preventDefault=function(){};"
                    },
                    {
                        "description": "拡張機能“Ignore X-Frame headers”と併用する必要があります",
                        "name": "🔗  リンクプレビュー",
                        "url": linkPreviewUrl
                    },
                    {
                        "description": "ctrl バックグラウンドタブ alt 小窓 ctrl+shift シークレットウィンドウ",
                        "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik03MjIuOCA0NTlsLTE4LjkgMTguOS0yLjcgMi43LTQuNyA0LjgtNTIuNyA1Mi43IDI2LjMgMjYuMyA1Mi43LTUyLjcgMTg0LjQgMTg0LjQtMjEwLjcgMjEwLjgtMTg0LjQtMTg0LjQgNTIuNi01Mi43LTI2LjMtMjYuNC01Mi43IDUyLjctMjYuMyAyNi40IDIzNy4xIDIzNy4xIDI2My40LTI2My41eiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMjcuNyAzNTMuNmwzNDIuNSAzNDIuNSAyNi4zLTI2LjNMMzU0IDMyNy4zeiIgZmlsbD0iIzA2MDAwMSIvPjxwYXRoIGQ9Ik0zMDEuMyA1MTEuN0wxMTYuOSAzMjcuM2wyMTAuOC0yMTAuN0w1MTIuMSAzMDFsLTUyLjcgNTIuNiAyNi4zIDI2LjQgNTIuNy01Mi43IDI2LjMtMjYuNC0yMzctMjM3TDY0LjIgMzI3LjNsMjM3LjEgMjM3LjEgMjYuMy0yNi4zIDUyLjgtNTIuN0wzNTQgNDU5eiIgZmlsbD0iIzA2MDAwMSIvPjwvc3ZnPg==",
                        "name": "リンクを開く",
                        "openInNewTab": true,
                        "url": "%t"
                    },
                    {
                        "icon": "https://hoothin.com/qrcode/favicon.svg",
                        "name": "QRコード生成",
                        "url": "https://hoothin.com/qrcode#%U"
                    },
                    {
                        "icon": "https://web.archive.org/_static/images/archive.ico",
                        "name": "現在のページをアーカイブ",
                        "nobatch": true,
                        "url": "https://web.archive.org/save/%u"
                    },
                    {
                        "name": "万能コマンド",
                        "nobatch": true,
                        "url": "https://wn.run/%u"
                    },
                    {
                        "icon": "https://is.gd/isgd_favicon.ico",
                        "name": "is.gd",
                        "url": "https://is.gd/create.php%p{url=%u&opt=0}"
                    },
                    {
                        "icon": "https://docrdsfx76ssb.cloudfront.net/static/1678306332/pages/wp-content/uploads/2019/02/favicon.ico",
                        "name": "URL Shortener",
                        "url": "https://bitly.com/%p{url=%u}"
                    },
                    {
                        "description": "クリップボードの内容を行ごとに分割して、現在のフォーカス入力ボックスに順次貼り付け",
                        "name": "⌨️ 行ごとに入力",
                        "url": "#p{@=%s[]}"
                    },
                    {
                        "description": "クリップボード画像を検索",
                        "name": "Google Lens - クリップボード画像検索",
                        "url": "[\"Google Lens\"]"
                    },
                    {
                        "name": "Mainonly by jerrylus",
                        "url": "javascript:(function(){var e=document.body;let n=document.head.appendChild(document.createElement(\"style\"));n.textContent=\".mainonly { outline: 2px solid red; }\";let t=CSS.supports(\"selector(:has(*))\");function o(n){n instanceof HTMLElement&&(e.classList.remove(\"mainonly\"),(e=n).classList.add(\"mainonly\"))}function i(e){o(e.target)}function l(o){if(o.preventDefault(),t)n.textContent=\":not(:has(.mainonly), .mainonly, .mainonly *) { visibility: hidden; }\";else{n.textContent=\":not(.mainonly *, .mainonly-ancestor) { visibility: hidden; }\";var i=e;do i.classList.add(\"mainonly-ancestor\");while(i=i.parentElement)}r()}function s(o){if(\"Escape\"===o.key){o.preventDefault();var i=window.scrollY||document.documentElement.scrollTop;if(n.remove(),document.removeEventListener(\"keydown\",s),r(),e?.classList.remove(\"mainonly\"),!t)for(let l of document.getElementsByClassName(\"mainonly-ancestor\"))l.classList.remove(\"mainonly-ancestor\");window.scrollTo(0,i)}}function a(n){n.preventDefault(),n.deltaY<0?o(e.parentElement):o(e.firstElementChild)}function r(){document.removeEventListener(\"mouseover\",i),document.removeEventListener(\"click\",l),document.removeEventListener(\"wheel\",a)}document.addEventListener(\"mouseover\",i),document.addEventListener(\"click\",l),document.addEventListener(\"wheel\",a,{passive:!1}),document.addEventListener(\"keydown\",s)}())"
                    },
                    {
                        "kwFilter": "^http.*\\.(3gpp|m4v|mkv|mp4|ogv|webm)(\\?|#|$)",
                        "name": "📺 ビデオプレビュー - 現在のページ",
                        "url": "[\"📺 ビデオプレビュー\"]"
                    },
                    {
                        "kwFilter": "^http.*\\.(flac|m4a|mp3|oga|ogg|opus|wav)(\\?|#|$)",
                        "name": "🎵 オーディオプレビュー - 現在のページ",
                        "url": "[\"🎵 オーディオプレビュー\"]"
                    },
                    {
                        "kwFilter": "^http.*\\.(avif|bmp|gif|gifv|ico|jfif|jpe|jpeg|jpg|png|svg|webp|xbm)(\\?|#|$)",
                        "name": "🏞️ 画像プレビュー - 現在のページ",
                        "url": "[\"🏞️ 画像プレビュー\"]"
                    }
                ],
                "type": "現在のページ"
            },
            {
                "icon": "robot",
                "openInNewTab": 1,
                "selectTxt": true,
                "sites": [
                    {
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg",
                        "name": "この内容を解説 (Gemini)",
                        "url": "https://gemini.google.com/app#p{.ql-editor.textarea=以下の内容を説明してください\n`%s`} "
                    },
                    {
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg",
                        "name": "Gemini",
                        "url": "https://gemini.google.com/app#p{.ql-editor.textarea=%s}"
                    },
                    {
                        "name": "Poe - AIチャット",
                        "url": "https://poe.com/#p{sleep(2000)&[class*\\=ChatMessageInputContainer]>textarea=%s&click([data-button-send])}"
                    },
                    {
                        "name": "ChatGPT",
                        "url": "https://chat.openai.com/#p{#prompt-textarea=%s&click(#prompt-textarea+button)}"
                    },
                    {
                        "name": "Futurepedia - AIツールを検索",
                        "url": "https://www.futurepedia.io/search?search=%s"
                    }
                ],
                "type": "AI"
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
                        "name": "Twitterで共有",
                        "url": "https://twitter.com/intent/tweet?url=%T"
                    },
                    {
                        "icon": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE3LjQ5NCAyMS40ODhjLTIuMTQgMC00LjEzOS0uNzYtNS44MDgtMi4xM0w0LjM5MiAxOS4zOXYtMi41ODNjLS41NzktMS40NDgtLjkxMi0zLjA0OC0uOTEyLTQuNzY0IDAtNS4xNiA0Ljc4OC05LjM0OCA5LjAxMi05LjM0OCA0LjIyNCAwIDkuMDEyIDQuMTg4IDkuMDEyIDkuMzQ4IDAgNS4xNi00Ljc4OCA5LjM0OC05LjAxMiA5LjM0OHptLjAwOC0xNy4zMDVjLTMuNTUyIDAtNi40MyA3LjU4My02LjQzIDcuNTgzczIuODc4IDcuNTgzIDYuNDMgNy41ODNjMy41NTIgMCA2LjQzLTcuNTgzIDYuNDMtNy41ODNzLTIuODc4LTcuNTgzLTYuNDMtNy41ODN6bS0uNjYgMTAuMTE0Yy0uMzk2IDAtLjcxNC0uMzE4LS43MTQtLjcxNHMuMzE4LS43MTQuNzE0LS43MTRjLjM5NiAwIC43MTQuMzE4LjcxNC43MTRzLS4zMTguNzE0LS43MTQuNzE0em0yLjY0IDBjLS4zOTYgMC0uNzE0LS4zMTgtLjcxNC0uNzE0cy4zMTgtLjcxNC43MTQtLjcxNGMuMzk2IDAgLjcxNC4zMTguNzE0LjcxNHMtLjMxOC43MTQtLjcxNC43MTR6bS01LjI4IDBjLS4zOTYgMC0uNzE0LS4zMTgtLjcxNC0uNzE0cy4zMTgtLjcxNC43MTQtLjcxNGMuMzk2IDAgLjcxNC4zMTguNzE0LjcxNHMtLjMxOC43MTQtLjcxNC43MTR6IiBmaWxsPSIjMDZDMzAwIj48L3BhdGg+PC9zdmc+",
                        "name": "LINEで共有",
                        "nobatch": true,
                        "url": "https://line.me/R/share?text=%n%20%u"
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
                        "name": "リンクをMarkdownでコピー",
                        "url": "c:[%sr](%t)"
                    },
                    {
                        "name": "📱 Send to phone",
                        "url": "https://s.hoothin.com/#p{wait(x-peer)&rclick(x-peer)&#textInput=%s&click(#textInput+div>button)}",
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
            },
            {
                "icon": "recycle",
                "match": "0",
                "sites": [],
                "type": "ごみ箱"
            }
        ]
        break;
    default:
        sitesConfig = [
            {
                "type": "Search",
                "icon": "search",
                "sites": [
                    {
                        "name": "Google",
                        "url": "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
                        "match": "https://www\\.google\\..*/search((?!udm=2).)*$",
                        "charset": "utf-8",
                        "keywords": "textarea[name='q']",
                        "shortcut": "g",
                        "alt": true
                    },
                    {
                        "name": "Google advanced",
                        "url": "https://www.google.com/search?q=%sr.replace(/ \\w+:.*/,\"\")%input{In site/Reddit/Engadget, site:reddit.com/ site:engadget.com}%input{Filetype, filetype:doc/ filetype:ppt/ filetype:xls/ filetype:pdf/ filetype:txt}%input{Limit lang/Japanese/zh-CN/zh-TW/ZH/EN,&lr=lang_ja/&lr=lang_zh-CN/&lr=lang_zh-TW/&lr=lang_zh-CN|lang_zh-TW/&lr=lang_en}%input{Limit date/Last hour/Last day/Last week/Last month/Last year,&as_qdr=h1/&as_qdr=d1/&as_qdr=w1/&as_qdr=m1/&as_qdr=y1}&ie=utf-8&oe=utf-8",
                        "match": "https://www\\.google\\..*/search((?!udm=2).)*$",
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
                        "url": "https://www.bing.com/search?q=%s",
                        "match": "^https://(www|cn|global)\\.bing\\.com/search"
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
                        "name": "Baidu",
                        "url": "https://www.baidu.com/s?wd=%s&ie=utf-8",
                        "keywords": "(?:wd|word)=(.*?)(&|$)",
                        "match": "https?://(www|m)\\.baidu\\.com/.*(wd|word)="
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
                "type": "Image",
                "icon": "image",
                "sites": [
                    {
                        "name": "Google image",
                        "url": "https://www.google.com/search?q=%s&udm=2",
                        "match": "www\\.google\\..*udm=2"
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
                        "url": "https://poe.com/ChatGPT#p{sleep(1000)&[class*\\='ChatMessageInputContainer'] textarea=hey ChatGPT. hope you're having a great day. From now on you will respond to anything I say with the perfect gif response. Once you know what gif you want to use, compile the most accurate and perfect search phrase that will result in the specific gif you want to send. respond with url: \" Sure, I'm happy to help you!\\n http://scythe-spot-carpenter.glitch.me/search?search_term\\=.gif \n%s&click([data-button-send])}"
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
                        "url": "showTips:http://apilayer.net/api/convert?from=USD&to=CNY&amount=1&access_key=%template{apilayer key} \n{name}<br/><i>%sr USD = {json.result|*%sr.replace(/\\D/g,'')} RMB</i>",
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
                        "kwFilter": "\\w\\S*\\.\\S*\\w|\\w.*[点。].*\\w|1[a-zA-Z0-9]{22,}",
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
                        "name": "🔓 Decode base64",
                        "url": "showTips:\n📋 <span data-copy style=\"user-select: all;\">%bd</span>",
                        "kwFilter": "^\\s*[0-9a-zA-z\\+\\/\\=]{4,}\\s*$"
                    },
                    {
                        "name": "🔒 Encode base64",
                        "url": "paste:%be"
                    },
                    {
                        "name": "📎 Batch replace selected text",
                        "url": "paste:%sr.replace(/%input{regular expression}/g,\"%input{replacement string}\")"
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
                        "name": "🔗 Preview link",
                        "url": linkPreviewUrl
                    },
                    {
                        "name": "Cheap VPS",
                        "url": "https://my.racknerd.com/aff.php?aff=12390&pid=903",
                        "description": "Most cost-effective server, $11 per year"
                    },
                    {
                        "name": "Cheap Domain",
                        "url": "https://www.namesilo.com/domain/search-domains?rid=44fb284bf",
                        "description": "Buy Website Domain Name"
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
                        "name": "Remove bg",
                        "url": "https://www.remove.bg/upload#p{wait()&body=%i}"
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
                "type": "AI",
                "icon": "robot",
                "selectTxt": true,
                "openInNewTab": 1,
                "sites": [
                    {
                        "name": "Explain the following-Gemini",
                        "url": "https://gemini.google.com/app#p{.ql-editor.textarea=Explain the following content please\n`%s`} ",
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg"
                    },
                    {
                        "name": "Bard",
                        "url": "https://gemini.google.com/app#p{.ql-editor.textarea=%s}",
                        "icon": "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg"
                    },
                    {
                        "name": "Poe - Sage AI Chat",
                        "url": "https://poe.com/#p{sleep(2000)&[class*\\=ChatMessageInputContainer]>textarea=%s&click([data-button-send])}"
                    },
                    {
                        "name": "ChatGPT",
                        "url": "https://chat.openai.com/#p{#prompt-textarea=%s&click(#prompt-textarea+button)}"
                    },
                    {
                        "name": "Futurepedia - Find The Best AI Tools & Software",
                        "url": "https://www.futurepedia.io/search?search=%s"
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
                        "url": "https://s.hoothin.com/#p{wait(x-peer)&rclick(x-peer)&#textInput=%s&click(#textInput+div>button)}",
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
