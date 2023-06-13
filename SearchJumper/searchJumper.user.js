[
    {
        "name": "youtube",
        "url": "^https?://(m\\.|www\\.)?youtube\\.com",
        "enable": 1,
        "from": 2
    },
    {
        "name": "gettyimages",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?gettyimages\\.com"
    },
    {
        "name": "pixabay",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?pixabay\\.com"
    },
    {
        "name": "unsplash",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?unsplash\\.com"
    },
    {
        "name": "reddit",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?reddit\\.com"
    },
    {
        "name": "stackoverflow",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?stackoverflow\\.com"
    },
    {
        "name": "gyfycat",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?gfycat\\.com"
    },
    {
        "name": "redgifs",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?redgifs\\.com"
    },
    {
        "name": "tumblr",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?tumblr\\.com"
    },
    {
        "name": "imgur",
        "author": "4ndr0666",
        "url": "^https?://(m\\.|www\\.)?imgur\\.com"
    },
    {
        "name": "ICONFINDER ",
        "enable": 0,
        "example": "https://www.iconfinder.com/search?q=Download",
        "url": "^https?://www\\.iconfinder\\.com/"
    },
    {
        "name": "菜鸟工具 - JS/CSS/JSON/HTML 調整為上下欄",
        "enable": 1,
        "example": "https://c.runoob.com/front-end/51/，https://c.runoob.com/front-end/52/，https://c.runoob.com/front-end/7683/，https://c.runoob.com/front-end/47/",
        "url": "^https?://c\\.runoob\\.com/front-end/(47|51|52|7683)/",
        "init": "if(location.href.indexOf('7683')==-1){clearAll()}document.querySelectorAll('div.col-md-6').forEach(div=>{div.setAttribute('class','code');div.style='width:100%;max-width:100%;position:relative;padding-right:15px;padding-left:15px;'})",
        "pinUrl": true
    },
    {
        "name": "webtoons - 手機版閱讀 (手動翻頁模式，預讀下一話圖片)",
        "example": "https://m.webtoons.com/zh-hant/time-slip/estatedeveloper/%E7%AC%AC1%E8%A9%B1/viewer?title_no=4354&episode_no=1",
        "url": "^https?://m\\.webtoons\\.com/.+/viewer\\?",
        "manualMode": true,
        "pinUrl": true,
        "init": "document.addEventListener('dblclick',()=>{let n=document.querySelector('.paginate a.lk_next');if(n)location.href=n.href});let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/imageList/)>-1).innerHTML;let imgData=eval(code.match(/imageList[^;]+/g)[0]);let imgs=document.querySelectorAll('._checkVisible');for(let i=0;i<imgs.length;i++){imgs[i].src=imgData[i].url}",
        "nextLink": ".paginate a.lk_next",
        "preloadImages": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/imageList/)>-1).innerHTML;let imgData=eval(code.match(/imageList[^;]+/g)[0]);let imgSrcArr=[];for(let i=0;i<imgData.length;i++){let imgSrc=imgData[i].url;imgSrcArr.push(imgSrc)}return imgSrcArr",
        "css": "#_webRetentionArea,.pagetual_tipsWords{display:none!important}"
    },
    {
        "name": "webtoons - 手機版閱讀 (自動翻頁模式會越來越卡)",
        "example": "https://m.webtoons.com/zh-hant/time-slip/estatedeveloper/%E7%AC%AC1%E8%A9%B1/viewer?title_no=4354&episode_no=1",
        "enable": 0,
        "url": "^https?://m\\.webtoons\\.com/.+/viewer\\?",
        "history": 2,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/imageList/)>-1).innerHTML;let imgData=eval(code.match(/imageList[^;]+/g)[0]);let imgs=document.querySelectorAll('._checkVisible');for(let i=0;i<imgs.length;i++){imgs[i].src=imgData[i].url}",
        "nextLink": ".paginate a.lk_next",
        "pageElement": ".flick-ct._imageWrap",
        "replaceElement": ".h1_viewer,#sequence_scroll,.btn_comment,.paginate",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/imageList/)>-1).innerHTML;let imgData=eval(code.match(/imageList[^;]+/g)[0]);let imgs=doc.querySelectorAll('._checkVisible');for(let i=0;i<imgs.length;i++){imgs[i].src=imgData[i].url}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('#bottomEpisodeList img[data-url]').forEach(e=>{e.src=e.dataset.url});let titles=gae('.pagetual_pageBar');if(titles.length>5){titles[0].remove();let removes=gae('#_viewer>*');for(let i in removes){if(/pagetual_pageBar/.test(removes[i].className)){break}removes[i].remove()}}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/imageList/)>-1).innerHTML;let imgData=eval(code.match(/imageList[^;]+/g)[0]);let imgSrcArr=[];for(let i=0;i<imgData.length;i++){let imgSrc=imgData[i].url;imgSrcArr.push(imgSrc)}return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.h1_viewer>._goTop');if(t)return t.innerText",
        "rate": 3,
        "css": "#_viewer{height:auto !important}#_webRetentionArea{display:none!important}"
    },
    {
        "name": "webtoons - 閱讀",
        "example": "https://www.webtoons.com/zh-hant/time-slip/estatedeveloper/%E7%AC%AC1%E8%A9%B1/viewer?title_no=4354&episode_no=1",
        "url": "^https?://www\\.webtoons\\.com/.+/viewer\\?",
        "pinUrl": true,
        "history": 2,
        "init": "document.querySelectorAll('img[data-url]').forEach(e=>{e.src=e.dataset.url})",
        "nextLink": "//div[@class='episode_cont']//li[a[starts-with(@class,'on')]]/following-sibling::li[1]/a",
        "pageElement": "#_imageList>img",
        "replaceElement": ".subj_info>h1,.paginate.v2,.episode_cont",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('#bottomEpisodeList img[data-url]').forEach(e=>{e.src=e.dataset.url});let titles=gae('.pagetual_pageBar');if(titles.length>5){titles[0].remove();let removes=gae('#_imageList>*');for(let i in removes){if(/pagetual_pageBar/.test(removes[i].className)){break}removes[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.subj_info>h1');if(t)return t.innerText",
        "rate": 3
    },
    {
        "name": "webtoons - 目錄",
        "example": "https://www.webtoons.com/zh-hant/time-slip/estatedeveloper/list?title_no=4354",
        "url": "^https?://www\\.webtoons\\.com/.+/list\\?",
        "pinUrl": true,
        "nextLink": "//div[@class='paginate']/a[span[@class='on']]/following-sibling::a[1]",
        "pageElement": "._episodeItem",
        "replaceElement": ".paginate",
        "pageBar": 0
    },
    {
        "name": "webtoons - 首頁禁用",
        "url": "^https?://www\\.webtoons\\.com/([^/]+/)?$",
        "pinUrl": true,
        "nextLink": "0",
        "enable": 0
    },
    {
        "name": "仙漫网 - 手機版目錄",
        "example": "https://m.xianmanwang.com/wodetianjienvyou/",
        "url": "^https?://m\\.xianmanwang\\.com/\\w+/$",
        "include": "a.mm",
        "autoClick": "a.mm",
        "nextLink": "0",
        "css": "[class^='ad']{display:none!important}"
    },
    {
        "name": "仙漫网 - 手機版閱讀",
        "example": "https://m.xianmanwang.com/kaijujiuwudi/0.html",
        "url": "^https?://m\\.xianmanwang\\.com/\\w+/\\d+\\.html",
        "pinUrl": true,
        "init": "let hasTouchEvents=()=>{if(('ontouchstart'in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0)){return true}return false};if(hasTouchEvents()===false){let style=document.createElement('style');style.id='PagetualStyle';style.innerHTML='#cp_img>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}';document.head.appendChild(style)}let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.match(/eval.+\\)\\)/)[0].slice(4);let imgData=eval(eval(code).match(/picdata[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src='https://res.xiaoqinre.com/'+e;F.appendChild(img)});let E=document.querySelector('#cp_img');E.innerHTML='';E.appendChild(F);",
        "nextLink": "a.next[href$=html]",
        "pageElement": "#cp_img",
        "replaceElement": "head>title,#title[style*='30'],.btn.prev,.btn.next",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.match(/eval.+\\)\\)/)[0].slice(4);let imgData=eval(eval(code).match(/picdata[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src='https://res.xiaoqinre.com/'+e;F.appendChild(img)});let E=doc.querySelector('#cp_img');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#cp_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.match(/eval.+\\)\\)/)[0].slice(4);let imgData=eval(eval(code).match(/picdata[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc='https://res.xiaoqinre.com/'+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector(\"#title[style*='30']\");if(t)return t.innerText",
        "rate": 2,
        "css": "img[style*='18vh'],.dropload-down{display:none!important}.recommendList{display:block!important}"
    },
    {
        "name": "仙漫网 - 閱讀",
        "example": "https://www.xianmanwang.com/kaijujiuwudi/0.html",
        "url": "^https?://www\\.xianmanwang\\.com/\\w+/\\d+\\.html",
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);if(ge('img[src*=banquan]')){location.replace(location.href.replace('www','m'))}else{let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).match(/picdata[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imgDomain+e;F.appendChild(img)});let E=ge('.comiclist');E.innerHTML='';E.appendChild(F)}",
        "nextLink": "//li[a[@class='active']]/preceding-sibling::li[1]/a",
        "pageElement": ".comiclist",
        "replaceElement": "head>title,h1.title",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).match(/picdata[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imgDomain+e;F.appendChild(img)});let E=doc.querySelector('.comiclist');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.comiclist');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).match(/picdata[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=imgDomain+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('a.active');if(t)return t.innerText.match(/[^（]+/)[0].trim();",
        "css": "h1.title>span{display:none!important}.comiclist>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫画牛 - 閱讀",
        "example": "http://www.manhua666.com/13_13215/1208996.html#p=1",
        "url": "^https?://www\\.manhua666\\.com/\\w+/\\d+\\.html",
        "init": "let ge=e=>document.querySelector(e);let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!ge('.pageselect')){gx(\"//a[text()='分页阅读']\").click()}let F='';imgs.forEach(e=>{F+=e});let E=ge('#contents');E.innerHTML=F;",
        "nextLink": "a[rel=next][href$=html]",
        "pageElement": "#contents",
        "replaceElement": "head>title,.con_top,.bottem1,.bottem2",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/imgs/)>-1).innerHTML;let imgData=eval(code.match(/imgs[^;]+/)[0]);let F='';imgs.forEach(e=>{F+=e});let E=doc.querySelector('#contents');E.innerHTML=F;",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#contents');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/imgs/)>-1).innerHTML;let imgData=eval(code.match(/imgs[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=e.match(/http[^\"]+/)[0];imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.bookname');if(t)return t.innerText.match(/[^（]+/)[0].trim();",
        "css": ".box_con #content{font-size:0!important}.bookname,.imgpage,.imgpage2,h3,.readtj{display:none!important}"
    },
    {
        "name": "漫画牛 - 分類",
        "example": "http://www.manhua666.com/sort/1/1.html",
        "url": "^https?://www\\.manhua666\\.com/",
        "include": ".pages",
        "pinUrl": true,
        "nextLink": "strong+a[href$=html]",
        "pageElement": "h2~.item",
        "replaceElement": ".pages",
        "pageBar": 0
    },
    {
        "name": "開車漫画 - 閱讀",
        "example": "https://18p.fun/ForInject/Chapter/?id=641992",
        "url": "^https?://(www\\.)?(18p|gohaveababy|imynest|healthway|beforeout)\\.[a-z]{2,5}/(ForInject/|Article/|content/)",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('img[data-src]');if(set){clearInterval(loop);if(location.hostname!='18p.fun'&&window.$_curChap){location.replace('https://18p.fun/ForInject/Chapter/?id='+window.$_curChap.id)};document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src});let hasTouchEvents=()=>{if(('ontouchstart'in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0)){return true}return false};let toggleToolbar=()=>{var e=e||window.event;if(e.wheelDelta<0||e.detail>0){ge('[my-id=header]').setAttribute('style','top: -60px;');ge('[class^=footerbox]').setAttribute('style','display:none;')}else{ge('[my-id=header]').removeAttribute('style');ge('[class^=footerbox]').removeAttribute('style')}};if(hasTouchEvents()===false){document.addEventListener('wheel',toggleToolbar);document.addEventListener('DOMMouseScroll',toggleToolbar)}ge('[class^=pictures]').addEventListener('click',()=>{let t=ge('[my-id=header][style]');if(t){ge('[my-id=header]').removeAttribute('style');ge('[class^=footerbox]').removeAttribute('style')}else{ge('[my-id=header]').setAttribute('style','top: -60px;');ge('[class^=footerbox]').setAttribute('style','display:none;')}})}},200);",
        "nextLinkByJs": "let next=doc.querySelector('[class^=picnexta]>a');if(next&&next.dataset.url)return next.dataset.url",
        "pageElement": "[class^=pictures]>img[data-src],[class^=needfee]",
        "replaceElement": "[class^=footerbox] li:nth-child(n+3):nth-child(-n+6)",
        "pageInit": "document.querySelector('h1').outerHTML=doc.querySelector('h1').outerHTML;let na=document.querySelector('[class^=picnexta]');let a=null;if(na){a=na.querySelector('a')}let rna=doc.querySelector('[class^=picnexta]');let ra=null;if(rna){ra=rna.querySelector('a')}if(ra!=null&&ra.dataset.url){a.dataset.url=ra.dataset.url;a.innerHTML=ra.innerHTML}else if(rna){na.innerHTML=rna.innerHTML}let needfee=doc.querySelector('[class^=needfee]');if(needfee){let css=Array.from(doc.querySelectorAll('style')).find(s=>s.innerHTML.search(/needfee/)>-1).innerHTML;let style=document.createElement('style');style.id='PagetualStyle';style.innerHTML=css;document.head.appendChild(style)}",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar a').forEach(e=>{if(/pi=/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('[class^=pictures]>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}};setTimeout(()=>{gae('div[class^=picnexta],[class^=footerbox] li:nth-child(n+3):nth-child(-n+6)').forEach(e=>{e.addEventListener('click',()=>{let a=e.querySelector('a');if(a&&a.dataset.url){location.replace(a.dataset.url)}})});ge('[class^=footerbox] li:nth-child(7)').addEventListener('click',()=>{location.replace('https://18p.fun/book/'+window.$_curChap.bookid)})},200)",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerText.split('\"')[2].replace(/第\\d+页?頁?$/,'').trim();"
    },
    {
        "name": "開車漫画 - 分類",
        "example": "https://18p.fun/library/?cid=3&tid=1702",
        "url": "^https?://18p\\.fun/",
        "include": ".loadmore",
        "init": "let gae=e=>document.querySelectorAll(e);let openInNewTab=()=>gae('#itemlist li>a:not([target=_blank])').forEach(a=>{a.setAttribute('target','_blank')});let setImgSrc=()=>gae('img.lazy[src$=svg]').forEach(img=>{img.src=img.dataset.src});openInNewTab();setImgSrc();new MutationObserver(()=>{openInNewTab();setImgSrc()}).observe(document.body,{childList:true,subtree:true});",
        "nextLink": "0",
        "loadMore": ".loadmore>button",
        "css": ".page{display:none!important}.loadmore{display:block!important}"
    },
    {
        "name": "大树漫画 - 閱讀",
        "example": "https://www.dashumanhua.com/comic/douluodalu5zhongshengtangsan/read-0.html",
        "url": "^https?://www\\.dashumanhua\\.com/comic/[^/]+/read-\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/picTree/)>-1).innerHTML;let m=code.replace(/eval.+\\)\\)/,'').match(/eval.+\\)\\)/)[0].slice(4);let imgData=eval(eval(m).slice(12,-1));let E=ge('#pic-list');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);$('head').append('<style>#pre-loading+#pic-list>img:nth-child('+imgData.length+')~* {display:none!important}</style>')",
        "nextLink": "//a[text()='下一话' and not(contains(@href,'--1'))]",
        "pageElement": "#pic-list",
        "replaceElement": "head>title,h2,.prev,.huiname,.next,.setnmh-pagedos",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/picTree/)>-1).innerHTML;let m=code.replace(/eval.+\\)\\)/,'').match(/eval.+\\)\\)/)[0].slice(4);let imgData=eval(eval(m).slice(12,-1));let E=ge('#pic-list');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);let c=gae('#pic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}setTimeout(()=>{ge('.prev>a').href=ge('.prev>.tandiv>a').href;let n=ge('.next>.tandiv>a');if(n){ge('.next>a').href=n.href;ge('.next>a+span').remove();ge('a[v-if=booknext]+span').remove()}else{ge('div[v-if=booknext]').remove();ge('.next>a').classList.add('hui')}},100)",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/picTree/)>-1).innerHTML;let m=code.replace(/eval.+\\)\\)/,'').match(/eval.+\\)\\)/)[0].slice(4);let imgSrcArr=eval(eval(m).slice(12,-1));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.setnmh-bookname>h2');if(t)return t.innerText",
        "rate": 3,
        "css": "#pic-list img{box-shadow:none!important}.setnmh-seebox>*:first-child:not(.loading-box),.loading-box,.aboutmh>*:last-child{display:none!important}"
    },
    {
        "name": "大树漫画 - 目錄",
        "example": "https://www.dashumanhua.com/comic/shendijianglinwoyouyiwanshuxingdian/",
        "url": "^https?://www\\.dashumanhua\\.com/",
        "include": "//a[text()='开始阅读']",
        "autoClick": "//div[span[text()='全部目录']]",
        "css": "[class^='ad']{display:none!important}"
    },
    {
        "name": "大树漫画 - 分類",
        "example": "https://www.dashumanhua.com/category/all/",
        "url": "^https?://www\\.dashumanhua\\.com/",
        "nextLink": "//a[text()='下页']",
        "pageElement": "//dt[div[@class='img']/a/img[@alt]]",
        "replaceElement": ".mypage",
        "pageBar": 0
    },
    {
        "name": "Manga Koma 閱讀",
        "example": "https://mangakoma01.com/manga/pick-me-up-direa-ying-xiongno-chengri-shanggari/1hua/25650",
        "url": "^https?://mangakoma\\d+\\.com/",
        "action": 1,
        "waitElement": [
            "",
            "img[alt='Lazy']"
        ],
        "init": "setTimeout(()=>{document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.getAttribute('data-src');e.classList.add('loaded')})},5000)",
        "nextLink": "a.nextBtn:not([disabled])",
        "pageElement": "#chapterContent",
        "replaceElement": "head>title,.i-block:nth-child(3) span[itemprop='name'],h1.fs-25,.prevBtn,a.nextBtn",
        "pageInit": "doc.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.getAttribute('data-src');e.classList.add('loaded')})"
    },
    {
        "name": "K-漫神 閱讀",
        "example": "https://kmansin09.com/bbs/board.php?bo_table=2001&wr_id=9984280",
        "url": "^https?://kmansin\\d+\\.com/",
        "include": "#ep_box",
        "nextLink": ".panel-heading a[title='次']",
        "pageElement": ".view-content",
        "rate": 10,
        "css": ".view-padding{padding:0px!important}.remote{display:none!important}"
    },
    {
        "name": "K-漫神 目錄",
        "example": "https://kmansin09.com/bbs/board.php?bo_table=2001&wr_id=9984203&sfl=wr_subject&stx=PICK+ME+UP",
        "url": "^https?://kmansin\\d+\\.com/",
        "exclude": "#ep_box",
        "nextLink": ".pagination li.active+li:not(.disabled)>a[href]",
        "pageElement": ".list-body",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "rate": 10
    },
    {
        "name": "嗨皮漫畫 - 給本王顯示全部章節",
        "example": "https://m.happymh.com/manga/daiwangraoming",
        "url": "^https?://m\\.happymh\\.com/manga/",
        "autoClick": "#expandButton"
    },
    {
        "name": "嗨皮漫畫 - 更新頁",
        "example": "https://m.happymh.com/latest",
        "url": "^https?://m\\.happymh\\.com/latest$",
        "loadMore": ".more-div-btn"
    },
    {
        "name": "嗨皮漫畫 - 閱讀 - 禁用",
        "example": "https://m.happymh.com/manga/shishijilingdishejishi",
        "url": "^https?://m\\.happymh\\.com/reads/",
        "enable": "0"
    },
    {
        "name": "包子漫畫分類 - 漫畫在新分頁打開",
        "example": "https://www.webmota.com/",
        "url": "^https?://[^/]+/",
        "include": [
            "//title[contains(text(),'包子漫畫') or contains(text(),'包子漫画')]",
            ".comics-card"
        ],
        "exclude": [
            ".comic-contain",
            ".comics-detail"
        ],
        "init": "let openInNewTab=()=>document.querySelectorAll('.comics-card a:not([target=_blank])').forEach(a=>{a.setAttribute('target','_blank')});openInNewTab();new MutationObserver(()=>{openInNewTab()}).observe(document.body,{childList:true,subtree:true});",
        "nextLink": "0"
    },
    {
        "name": "包子漫畫 - 查看全部章節",
        "example": "https://www.baozimh.com/comic/dawangraoming-yuedongwenhua",
        "url": "^https?://[^/]+/comic/",
        "include": [
            "//title[contains(text(),'包子漫畫') or contains(text(),'包子漫画')]",
            "#button_show_all_chatper"
        ],
        "nextLink": "0",
        "autoClick": "#button_show_all_chatper"
    },
    {
        "name": "包子漫畫 - 閱讀",
        "example": "https://www.kukuc.co/comic/chapter/dawangraoming-yuedongwenhua/0_0.html",
        "url": "^https?://[^/]+/comic/chapter/[^/]+/\\w+\\.html",
        "include": [
            "//title[contains(text(),'包子漫畫') or contains(text(),'包子漫画')]",
            ".chapter-main.scroll-mode>.comic-contain amp-img>img[amp-img-id]"
        ],
        "history": 2,
        "action": 1,
        "pinUrl": true,
        "init": "let gae=e=>document.querySelectorAll(e);let E=gae('.comic-contain')[0];let F=new DocumentFragment();let imgs=gae('.comic-contain amp-img');imgs.forEach(e=>{let img=new Image();img.className='comic-contain__item';img.src=e.getAttribute('src');F.appendChild(img)});E.innerHTML='';E.appendChild(F);let loop=setInterval(()=>{let set=document.querySelector('#interstitial_fade');if(set){clearInterval(loop);set.remove()}},100);setTimeout(()=>{if(loop)clearInterval(loop)},5000)",
        "nextLink": "#next-chapter",
        "pageElement": ".comic-contain",
        "replaceElement": "//head/title | //span[@class='title'] | //div[@class='comic-chapter']/div[@class='next_chapter'] | //div[@class='bottom-bar']",
        "pageInit": "let gae=e=>doc.querySelectorAll(e);let E=gae('.comic-contain')[0];let F=new DocumentFragment();let imgs=gae('.comic-contain amp-img');imgs.forEach(e=>{let img=new Image();img.className='comic-contain__item';img.src=e.getAttribute('src');F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar a').forEach(e=>{if(/\\/\\d+_\\d+_\\d+\\.html$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>10){ps[0].remove();let ds=gae('.chapter-main>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('span.title');if(t)return t.innerText",
        "css": ".mobadsq{display:none!important}ul{margin-block-start:-2px!important;margin-block-end:2px!important}.pagetual_pageBar{margin-top:7px!important}"
    },
    {
        "name": "包子漫畫2 - 閱讀",
        "example": "https://baozimh.org/manga/kaijuyizuoshan-yulemeicuo/0_2/",
        "url": "^https?://baozimh\\.org/manga/[^/]+/\\w+/",
        "history": 2,
        "pinUrl": true,
        "init": "let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let E=gx(\"//div[(div/img) and contains(@class,'gb-container')]\");let F=new DocumentFragment();document.querySelectorAll('img[data-src]').forEach(e=>{let img=new Image();img.src=e.dataset.src;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "nextLink": "//a[span[text()='下一话']]",
        "pageElement": "//div[(div/img) and contains(@class,'gb-container')] | //div[(img) and contains(@class,'gb-container')]",
        "replaceElement": "head>title,.gb-inside-container>h1,.last,#pagenation",
        "pageInit": "let gx=x=>doc.evaluate(x,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let E=gx(\"//div[(div/img) and contains(@class,'gb-container')]\");let F=new DocumentFragment();doc.querySelectorAll('img[data-src]').forEach(e=>{let img=new Image();img.src=e.dataset.src;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "function gax(x){let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes}let c=gax(\"//div[(img) and contains(@class,'gb-container')]\");if(c.length>10){c[0].remove()}let p=gax(\"//*[contains(@class,'pagetual_pageBar')]\");if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.last');if(t)return t.innerText",
        "css": ".pagetual_pageBar+.gb-container{margin-top:-3px!important}"
    },
    {
        "name": "包子漫畫2 - 分類/搜索",
        "example": "https://baozimh.org/",
        "url": "^https?://baozimh\\.org/",
        "nextLink": "span.current+a,a[aria-label='Next page']",
        "pageElement": "#main>article article,header.page-header~article",
        "replaceElement": "nav.ct-pagination,.paging-navigation",
        "pageBar": 0
    },
    {
        "name": "GODA漫画  - 閱讀",
        "example": "https://chapter.godamanga.com/manga/wozhendebushiqiyunzhizi-vv/0_0/",
        "url": "^https?://([a-z]{2,7}\\.)?godamanga\\.com/manga/[^/]+/\\w+/",
        "history": 2,
        "init": "document.querySelectorAll('img[data-lazy-src]').forEach(e=>{e.src=e.getAttribute('data-lazy-src')})",
        "nextLink": "//a[span[text()='下一话']]",
        "pageElement": "//div[div/div/div/img[@decoding='async']]",
        "replaceElement": "head>title,.hero-section,#pagenation",
        "pageAction": "function gax(x){let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes}let c=gax(\"//div[div/div/div/img[@decoding='async']]\");if(c.length>10){c[0].remove()}let p=gax(\"//*[contains(@class,'pagetual_pageBar')]\");if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.last-item>span');if(t)return t.innerText",
        "css": ".pagetual_pageBar+.stk-row{margin-top:-3px!important}"
    },
    {
        "name": "GODA漫画 - 分類/搜索",
        "example": "https://godamanga.com/",
        "url": "^https?://(cn\\.)?godamanga\\.com/",
        "nextLink": "span.current+a,a[aria-label='Next page']",
        "pageElement": "//article[a/img]",
        "replaceElement": "nav.ct-pagination,.paging-navigation",
        "pageBar": 0
    },
    {
        "name": "COCOMANGA - 閱讀 - 雙擊前往下一章，鍵盤左右鍵上下章",
        "example": "https://www.colamanhua.com/15177/1/2.html",
        "url": "^https?://www\\.colamanhua\\.com/",
        "include": ".mh_comicpic",
        "init": "let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;function next(e){let key=window.event?e.keyCode:e.which;if(key==39){e.preventDefault();let n=gx(\"//a[contains(@href,'html') and text()='下一章']\");if(n){n.click()}else{alert('沒有下一章了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){e.preventDefault();let p=gx(\"//a[contains(@href,'html') and text()='上一章']\");if(p){p.click()}else{alert('沒有上一章了！')}}};document.addEventListener('keydown',prev);function dcnext(){let n=gx(\"//a[contains(@href,'html') and text()='下一章']\");if(n){n.click()}else{alert('沒有下一章了！')}};document.addEventListener('dblclick',dcnext);",
        "nextLink": "0",
        "pinUrl": true,
        "css": ".mh_wrap{width:100%!important;min-width:100%!important}"
    },
    {
        "name": "COCOMANGA - 分類/搜索",
        "example": "https://www.colamanhua.com/show?orderBy=update",
        "url": "^https?://www\\.colamanhua\\.com/(show|search)",
        "init": "let w = document.querySelector(`h2 a[href*='weeklyCount']`); if (!location.search) w.click()",
        "nextLinkByJs": "let next=doc.querySelector('.fed-page-info a.fed-btns-green+a[onclick]');if(next)return location.origin+location.pathname+location.search.replace(/&page=\\d+$/,'')+'&page='+next.innerText",
        "pageElement": "//div[contains(@class,'fed-list-head')]/following-sibling::ul[li/a/span] | //dl[dt/a/span]",
        "pageInit": "doc.querySelectorAll('a[data-original]').forEach(a=>{a.style.backgroundImage=`url('${a.dataset.original}')`})",
        "replaceElement": ".fed-page-info"
    },
    {
        "name": "看漫画手機版 - 閱讀",
        "example": "https://m.manhuagui.com/comic/30278/405998.html",
        "url": "^https?://m\\.manhuagui\\.com/comic/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "$('body').append('<div class=\"goback\" title=\"返回頂部\" onclick=\"window.scrollTo({top: 0})\" style=\"background: url(/images/bg_main.png) -258px -80px no-repeat;opacity:0.3;position:fixed;left:50%;margin-left:-20px;bottom:0px;width:40px;height:40px;\"></div>');let ge=e=>document.querySelector(e);let str=`var imagesObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){observer.unobserve(entry.target);let realSrc=entry.target.dataset.src,nE=entry.target.nextElementSibling;if(realSrc){entry.target.src=realSrc;}if(nE&&nE.tagName=='IMG'&&nE.dataset.src){nE.src=nE.dataset.src;}}})});var loading_bak='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAAAAACbDccAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cDDhUEC4m58W4AAAABb3JOVAHPoneaAAAF+UlEQVR42u3SQQkAMAzAwPo3MatVEQblTkEemQeB+R3ATcYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBILoeSc6MiLXg0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDMtMTRUMjE6MDM6NDcrMDA6MDBTB1yAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAzLTE0VDIxOjAzOjQ3KzAwOjAwIlrkPAAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMy0xNFQyMTowNDoxMSswMDowMLyj5cQAAAAASUVORK5CYII=';`;let script=document.createElement('script');script.type='text/javascript';script.innerHTML=str;ge('body').appendChild(script);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/x6c/)>-1).innerHTML.slice(26,-1);let imgDataCode=eval(code).slice(10,-11);let imgData=eval(imgDataCode);let loop=setInterval(()=>{let set=ge('#manga img');if(set){clearInterval(loop);let domain='https://i.hamreus.com';let F=new DocumentFragment();imgData.images.forEach(e=>{let img=new Image();img.src=loading_bak;img.dataset.src=`${domain+e}?e=${imgData.sl.e}&m=${imgData.sl.m}`;imagesObserver.observe(img);F.appendChild(img)});let E=ge('#manga');E.innerHTML='';E.appendChild(F);let n=ge(\"a[data-action='chapter.next']\");if(imgData.nextId==0){n.href=location.pathname.replace(/\\d+\\.html$/,'');n.innerText='返回目录'}}},100)",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/x6c/)>-1).innerHTML.slice(26,-1);let imgDataCode=eval(code).slice(10,-11);let imgData=eval(imgDataCode);let n=imgData.nextId;if(n!=0)return location.href.replace(/\\d+\\.html$/,'')+n+'.html';",
        "pageElement": "//script[contains(text(),'x6c')]",
        "insert": "#manga",
        "insertPos": 2,
        "replaceElement": "#mangaTitle",
        "pageInit": "let ge=e=>document.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/x6c/)>-1).innerHTML.slice(26,-1);let imgDataCode=eval(code).slice(10,-11);let imgData=eval(imgDataCode);let domain='https://i.hamreus.com';let F=new DocumentFragment();imgData.images.forEach(e=>{let img=new Image();img.src=loading_bak;img.dataset.src=`${domain+e}?e=${imgData.sl.e}&m=${imgData.sl.m}`;imagesObserver.observe(img);F.appendChild(img)});let E=ge('#manga');E.appendChild(F);let n=ge(\"a[data-action='chapter.next']\");if(imgData.nextId==0){n.href=location.pathname.replace(/\\d+\\.html$/,'');n.innerText='返回目录'}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let titles=gae('.pagetual_pageBar');if(titles.length>10){titles[0].remove();let removes=gae('#manga>*');for(let i in removes){if(/pagetual_pageBar/.test(removes[i].className)){break}removes[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('#mangaTitle');if(t)return t.innerHTML.replace(/<.+>\\s?/g,'')",
        "css": ".action-list li{width:50%!important}#action>ul>li:nth-child(n+2):nth-child(-n+3),.manga-page,.clickforceads{display:none!important}.manga-box img{border-top:0px!important;border-bottom:0px!important}"
    },
    {
        "name": "看漫画手機版 - 最新更新/排行榜/書架/搜索/漫画大全 檢視下20條記錄 - 漫畫在新分頁打開",
        "example": "https://m.manhuagui.com/list/update.html",
        "url": "^https?://m\\.manhuagui\\.com/",
        "exclude": [
            "#manga",
            "#chapter"
        ],
        "init": "let openInNewTab=()=>document.querySelectorAll('.top-slider-wrap a,.main-list a:not([target=_blank]),.cont-list a:not([target=_blank])').forEach(a=>{a.setAttribute('target','_blank')});openInNewTab();new MutationObserver(()=>{openInNewTab()}).observe(document.body,{childList:true,subtree:true});",
        "loadMore": "#more:not([style*='none'])>.more-go",
        "css": ".clickforceads{display:none!important}"
    },
    {
        "name": "看漫画 - 閱讀",
        "example": "https://www.manhuagui.com/comic/30278/405998.html",
        "url": "^https?://(tw|www)\\.manhuagui\\.com/comic/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let str=`var imagesObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){observer.unobserve(entry.target);let realSrc=entry.target.dataset.src,nE=entry.target.nextElementSibling;if(realSrc){entry.target.src=realSrc;}if(nE&&nE.tagName=='IMG'&&nE.dataset.src){nE.src=nE.dataset.src;}}})});var loading_bak='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAAAAACbDccAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cDDhUEC4m58W4AAAABb3JOVAHPoneaAAAF+UlEQVR42u3SQQkAMAzAwPo3MatVEQblTkEemQeB+R3ATcYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBILoeSc6MiLXg0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDMtMTRUMjE6MDM6NDcrMDA6MDBTB1yAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAzLTE0VDIxOjAzOjQ3KzAwOjAwIlrkPAAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMy0xNFQyMTowNDoxMSswMDowMLyj5cQAAAAASUVORK5CYII=';`;let script=document.createElement('script');script.type='text/javascript';script.innerHTML=str;ge('body').appendChild(script);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/x6c/)>-1).innerHTML.slice(26,-1);let imgDataCode=eval(code).slice(11,-11);let imgData=eval(imgDataCode);let loop=setInterval(()=>{let set=ge('.pr.tbCenter.cb img');if(set){clearInterval(loop);let domain='https://i.hamreus.com';let F=new DocumentFragment();imgData.files.forEach(e=>{let img=new Image();img.src=loading_bak;img.dataset.src=`${domain+imgData.path+e}?e=${imgData.sl.e}&m=${imgData.sl.m}`;imagesObserver.observe(img);F.appendChild(img)});let E=ge('.pr.tbCenter.cb');E.innerHTML='';E.appendChild(F)}},100)",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/x6c/)>-1).innerHTML.slice(26,-1);let imgDataCode=eval(code).slice(11,-11);let imgData=eval(imgDataCode);let n=imgData.nextId;if(n!=0)return location.href.replace(/\\d+\\.html$/,'')+n+'.html';",
        "pageElement": "//script[contains(text(),'x6c')]",
        "insert": ".pr.tbCenter.cb",
        "insertPos": 2,
        "replaceElement": ".title h2",
        "pageInit": "let ge=e=>document.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/x6c/)>-1).innerHTML.slice(26,-1);let imgDataCode=eval(code).slice(11,-11);let imgData=eval(imgDataCode);let domain='https://i.hamreus.com';let F=new DocumentFragment();imgData.files.forEach(e=>{let img=new Image();img.src=loading_bak;img.dataset.src=`${domain+imgData.path+e}?e=${imgData.sl.e}&m=${imgData.sl.m}`;imagesObserver.observe(img);F.appendChild(img)});let E=ge('.pr.tbCenter.cb');E.appendChild(F);let pc=ge('.btn-red.prevC');let curl=location.href.replace(/\\d+\\.html.*/,'');let purl=curl+imgData.prevId+'.html';let nurl=curl+imgData.nextId+'.html';pc.href=purl;pc.removeAttribute('onclick');let p=ge('.btn-red.prev');p.href=purl;p.removeAttribute('onclick');if(imgData.nextId!=0){ge('.btn-red.nextC').href=nurl;let n=ge('.btn-red.next+a');n.href=nurl;n.removeAttribute('onclick')}else{ge('.btn-red.nextC').href=curl;let n=ge('.btn-red.next+a');n.href=curl;n.innerText=ge('#viewList').innerText;n.removeAttribute('onclick')}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let titles=gae('.pagetual_pageBar');if(titles.length>10){titles[0].remove();let removes=gae('.pr.tbCenter.cb>*');for(let i in removes){if(/pagetual_pageBar/.test(removes[i].className)){break}removes[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": ".title>div:not(.fr)>span,#pageSelect,.main-btn>a[href^='j'],.pager>a[href*='goPage'],.pager>span{display:none!important}.pr.tbCenter.cb>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "看漫画 - 分類",
        "example": "https://www.manhuagui.com/list/lianzai/",
        "url": "^https?://(www|tw)\\.manhuagui\\.com/list/",
        "nextLink": "span.current+a",
        "pageElement": "#contList",
        "replaceElement": ".pager-cont,.result-count",
        "css": ".pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "漫畫屋 - 閱讀",
        "example": "https://mh5.tw/series-wunalfy-484928-1-%E4%B8%8D%E5%B9%B8%E8%81%B7%E6%A5%AD%E7%9A%84%E5%B9%B8%E9%81%8B?",
        "url": "^https?://mh5\\.tw/series",
        "pinUrl": true,
        "nextLinkByJs": "let ge=e=>doc.querySelector(e);let np=ge('.num>.cur+a');let nc=ge('.next>a:not(.hui)');let c=ge('.num>.cur').innerText;let m=ge('.num>a:last-child').innerText-1;if(c!=m){return np.href}else if(nc){return nc.href}else return;",
        "pageElement": ".ptview>img:not([style])",
        "replaceElement": ".setnmh-pagedos",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let d=gae('img[alt][style]')[0];if(d)d.remove();gae('.pagetual_pageBar>a').forEach(e=>{if(!/-1-/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('.ptview>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText.replace(/\\（\\d+P\\）/,'')",
        "rate": 10,
        "css": ".setnmh-seebox img{max-width: 100% !important;display: block !important;margin: 0 auto !important;box-shadow:none!important}.setnmh-seebox{width:auto !important;max-width:800px !important}.num>a:last-child{display:none!important}"
    },
    {
        "name": "漫畫屋 - 分類",
        "example": "https://mh5.tw/allcartoonlist",
        "url": "^https?://mh5\\.tw/allcartoonlist",
        "nextLink": "a.cur+a",
        "pageElement": "dl.alllist",
        "replaceElement": "div.num",
        "css": ".pagetual_pageBar{margin-bottom:0px!important}.pagetual_pageBar+dl{margin-top:-10px!important}"
    },
    {
        "name": "zero搬运网 - PC版閱讀",
        "example": "http://www.zerobywgeat.com/plugin.php?id=jameson_manhua&a=read&zjid=346180",
        "url": "^https?://www\\.zerobywgeat\\.com/plugin\\.php",
        "nextLink": "//a[span[contains(@uk-icon,'right')]]",
        "pageElement": ".uk-zjimg",
        "replaceElement": ".uk-grid-collapse,.uk-text-center,head>title",
        "pageBarText": 1,
        "css": ".uk-text-center.xg1.xs2{display:none!important}img[id]{margin-top:0px!important;margin-bottom:0px!important}"
    },
    {
        "name": "zero搬运网 - 分類",
        "example": "http://www.zerobywgeat.com/",
        "url": "^https?://www\\.zerobywgeat\\.com/",
        "nextLink": "a.nxt",
        "pageElement": "//div[div[contains(@class,'mbm')] and contains(@class,'rootcate')]",
        "replaceElement": ".pg.page",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "Mangabz / Xmanhua - 漫畫目錄展開章節",
        "example": "https://xmanhua.com/1904xm/，https://www.mangabz.com/1904bz/",
        "url": "^https?://(www\\.)?(mangabz|xmanhua)\\.com/\\d+(bz|xm)/$",
        "pinUrl": true,
        "init": "showMoreItem()",
        "autoClick": "//a[text()='章節']"
    },
    {
        "name": "Xmanhua - 手機版閱讀",
        "example": "https://xmanhua.com/m10344/",
        "url": "^https?://(www\\.)?xmanhua\\.com/m\\d+(-p\\d+)?/",
        "include": ".bottom-bar",
        "history": 2,
        "pinUrl": true,
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src});",
        "nextLink": "//a[text()='下一章']",
        "pageElement": "#cp_img",
        "replaceElement": ".top-title,.bottom-bar,.toast-win,head>title",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgData=eval(eval(code.trim().slice(4)).slice(12));let E=doc.querySelector('#cp_img');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);let c=gae('#cp_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}setTimeout(()=>{let m=document.title.match(/([^_]+)_([^_]+)/);let t=ge('.top-title');t.innerText=m[1].replace('漫畫','')+'_'+m[2]},100);let cs=gae('#cp_img');let last=cs.length-1;cs[last].addEventListener('click',()=>{let t=ge('body.toolbar');if(t){$('body').removeClass('toolbar')}else{$('body').addClass('toolbar')}});",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgSrcArr=eval(eval(code.trim().slice(4)).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.top-title');if(t)return t.innerText.replace(/XManhua\\?.+\\?/,'')"
    },
    {
        "name": "Mangabz - 手機版閱讀",
        "example": "https://www.mangabz.com/m38701/",
        "url": "^https?://(www\\.)?mangabz\\.com/m\\d+(-p\\d+)?/",
        "include": ".bottom-bar",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let b=ge('body.viewbody');if(b){b.innerHTML=b.innerHTML.replace('<!--','').replace('-->','');setTimeout(()=>{$('.top-bar-tool').removeAttr('style');$('.bottom-bar').removeAttr('style')},0)}function showtoolbar(){let t=ge('body.toolbar');if(t){$('body').removeClass('toolbar')}else{$('body').addClass('toolbar')}};document.addEventListener('click',showtoolbar);document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src});",
        "nextLink": "//a[text()='下一章']",
        "pageElement": "#cp_img",
        "replaceElement": ".bottom-bar,.toast-win,head>title",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgData=eval(eval(code.trim().slice(4)).slice(12));let E=ge('#cp_img');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#cp_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}setTimeout(()=>{let m=document.title.match(/([^_]+)_([^_]+)/);let t=document.querySelector('.top-title');t.innerText=m[1].replace('漫畫','')+'_'+m[2];$('.bottom-bar').removeAttr('style')},100);",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgSrcArr=eval(eval(code.trim().slice(4)).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('title');if(t)return t.innerText.match(/_(.+)_/)[1]"
    },
    {
        "name": "Xmanhua - PC版閱讀",
        "example": "https://xmanhua.com/m10344/",
        "url": "^https?://(www\\.)?xmanhua\\.com/m\\d+(-p\\d+)?/",
        "include": ".reader-bottom-page-list",
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#cp_img>img');if(set){clearInterval(loop);ge('#cp_img').innerHTML=ge('#cp_img>img').outerHTML;ge('#showimage').removeAttribute('style');}},100);function showtoolbar(){let t=ge('.header.toolbar');if(t){$('.header').removeClass('toolbar');$('.header').removeAttr('style')}else{$('.header').addClass('toolbar');$('.header').attr('style','top: -64px;')}let b=ge('.reader-bottom.toolbar');if(b){$('.reader-bottom').removeClass('toolbar');$('.reader-bottom').removeAttr('style')}else{$('.reader-bottom').addClass('toolbar');$('.reader-bottom').attr('style','bottom: -50px;')}};document.addEventListener('click',showtoolbar);function hidetoolbar(){var e=e||window.event;if(e.wheelDelta<0||e.detail>0){$('.header').addClass('toolbar');$('.header').attr('style','top: -64px;');$('.reader-bottom').addClass('toolbar');$('.reader-bottom').attr('style','bottom: -50px;')}else{$('.header').removeClass('toolbar');$('.header').removeAttr('style');$('.reader-bottom').removeClass('toolbar');$('.reader-bottom').removeAttr('style')}};document.addEventListener('wheel',hidetoolbar);document.addEventListener('DOMMouseScroll',hidetoolbar);function keyhidetoolbar(e){let key=window.event?e.keyCode:e.which;if(key=='34'||key=='32'||key=='40'){$('.header').addClass('toolbar');$('.header').attr('style','top: -64px;');$('.reader-bottom').addClass('toolbar');$('.reader-bottom').attr('style','bottom: -50px;')}else{$('.header').removeClass('toolbar');$('.header').removeAttr('style');$('.reader-bottom').removeClass('toolbar');$('.reader-bottom').removeAttr('style')}};document.addEventListener('keydown',keyhidetoolbar);",
        "nextLinkByJs": "let m=doc.querySelector('.relative>a').innerText.match(/(\\d+)\\/(\\d+)/);let nc=doc.querySelector('img[src*=right-2]');if(m[1]!=m[2]){let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/XMANHUA_CURL/)>-1).innerHTML;let c=eval(code.match(/XMANHUA_CURL[^;]+/)[0]);let url=location.origin+c;let next=url.replace(/(-p\\d+)?\\/$/,'')+'-p'+(parseInt(m[1])+1)+'/';return next}else if(nc&&nc.parentNode){if(/javascript/.test(nc.parentNode.href)){return;}else{return nc.parentNode.href}}",
        "pageElement": "#cp_img>img",
        "replaceElement": ".container",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-p\\d+\\/$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#cp_img>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.reader-title>a:last-child');if(t)return t.innerText.trim()",
        "rate": 5,
        "css": ".container{width:auto!important}#cp_img img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.reader-img-con{padding:64px 0 50px !important;}"
    },
    {
        "name": "Mangabz - PC版閱讀",
        "example": "https://www.mangabz.com/m38701/",
        "url": "^https?://(www\\.)?mangabz\\.com/m\\d+(-p\\d+)?/",
        "include": ".container",
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#cp_img>img');if(set){clearInterval(loop);ge('#cp_img').innerHTML=ge('#cp_img>img').outerHTML}},100);function hidetoolbar(){var e=e||window.event;if(e.wheelDelta<0||e.detail>0){$('.top-bar').attr('style','top: -74px;')}else{$('.top-bar').removeAttr('style')}};document.addEventListener('wheel',hidetoolbar);document.addEventListener('DOMMouseScroll',hidetoolbar);function keyhidetoolbar(e){let key=window.event?e.keyCode:e.which;if(key=='34'||key=='32'||key=='40'){$('.top-bar').attr('style','top: -74px;')}else{$('.top-bar').removeAttr('style')}};document.addEventListener('keydown',keyhidetoolbar);",
        "nextLinkByJs": "let m=doc.querySelector('[class^=bottom-page]').innerText.match(/(\\d+)-(\\d+)/);let nc=doc.querySelector('img[src*=xiayizhang]');if(m[1]!=m[2]){let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/MANGABZ_CURL/)>-1).innerHTML;let c=eval(code.match(/MANGABZ_CURL[^;]+/)[0]);let url=location.origin+c;let next=url.replace(/(-p\\d+)?\\/$/,'')+'-p'+(parseInt(m[1])+1)+'/';return next}else if(nc&&nc.parentNode){if(/javascript/.test(nc.parentNode.href)){return;}else{return nc.parentNode.href}}",
        "pageElement": "#cp_img>img",
        "replaceElement": ".container",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-p\\d+\\/$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#cp_img>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.top-title');if(t)return t.innerText.trim()",
        "rate": 5,
        "css": "a[href^='j']{display:none!important}.container{width:auto!important}#cp_img img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "Mangabz / Xmanhua - 分類",
        "example": "https://www.mangabz.com/manga-list-0-0-0/，https://xmanhua.com/manga-list-0-0-0/",
        "url": "^https?://(www\\.)?(mangabz|xmanhua)\\.com/(manga-list|search)",
        "nextLink": "//div[contains(@class,'page-pagination')]//a[contains(text(), '>')]",
        "pageElement": "ul.mh-list",
        "replaceElement": ".page-pagination",
        "css": ".mh-list{padding-bottom:0px!important}.pagetual_pageBar+.mh-list{padding-top:10px!important}.pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "风之动漫 - 閱讀",
        "example": "https://manhua.fffdm.com/2/1040/，https://www.fffdm.com/manhua/132/222/",
        "url": "^https?://(manhua|www)\\.fffdm\\.com/(manhua/)?\\d+/.+/",
        "pinUrl": true,
        "init": "let loop=setInterval(()=>{let mhpic=document.querySelector('#mhpic');if(mhpic&&mhpic.parentNode){let a=mhpic.parentNode;a.nextElementSibling.remove();a.outerHTML=a.innerHTML;clearInterval(loop)}},100);setTimeout(()=>{try{clearInterval(loop)}catch(e){}},5000)",
        "nextLink": "//div[@class='navigation']/a[text()='下一页'][@href]",
        "pageElement": "#mhpic",
        "replaceElement": ".text-xl,.navigation",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#mhpic{border:none!important;padding:0!important;border-radius:0px!important;width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}#main>div>div:not([id]){display:none!important}"
    },
    {
        "name": "動漫狂 - 手機版閱讀",
        "example": "https://www.cartoonmad.com/m/comic/618700022010001.html",
        "url": "^https?://www\\.cartoonmad\\.(cc|com)/m/comic/\\d+\\.html",
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let _src=ge('img[oncontextmenu]').src.replace(/\\d+$/,'');let max=ge('.onpage').parentNode.lastElementChild.previousElementSibling.innerText;let F=new DocumentFragment();for(let i=1;i<=max;i++){let imgSrc;if(i<10){imgSrc=_src+'00'+i}else if(i<100){imgSrc=_src+'0'+i}else{imgSrc=_src+i}let img=new Image();img.className='PagetualImg';img.src=imgSrc;F.appendChild(img)};let E=ge('img[oncontextmenu]').parentNode.parentNode;E.innerHTML='';E.appendChild(F);",
        "nextLinkByJs": "let lastPage=doc.querySelector('.onpage').parentNode.lastElementChild.previousElementSibling;let parseHTML=srt=>new DOMParser().parseFromString(srt,'text/html');return fetch(lastPage.href).then(res=>res.text()).then(async res=>{let fdoc=parseHTML(res);let ele=fdoc.querySelector('body>table>tbody>tr:nth-child(3)>td>a');return await fetch(ele.href).then(res=>res.text()).then(res=>{let ffdoc=parseHTML(res);let next=ffdoc.querySelector('.pages');if(next){return next.href}else{return null}})})",
        "pageElement": "script[src*='/init.js']",
        "insert": "body>table>tbody>tr:nth-child(3)>td",
        "insertPos": 2,
        "pageInit": "let ge=e=>doc.querySelector(e);let _src=ge('img[oncontextmenu]').src.replace(/\\d+$/,'');let max=ge('.onpage').parentNode.lastElementChild.previousElementSibling.innerText;let F=new DocumentFragment();for(let i=1;i<=max;i++){let imgSrc;if(i<10){imgSrc=_src+'00'+i}else if(i<100){imgSrc=_src+'0'+i}else{imgSrc=_src+i}let img=new Image();img.className='PagetualImg';img.src=imgSrc;F.appendChild(img)};let E=document.querySelector('.PagetualImg').parentNode;E.appendChild(F);",
        "pageAction": "let ps=document.querySelectorAll('.pagetual_pageBar');if(ps.length>10){ps[0].remove();let ds=document.querySelector('.PagetualImg').parentNode.querySelectorAll('*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}};const fetchPicSrc=url=>{return fetch(url).then(res=>{return res.url})};document.querySelectorAll('img.PagetualImg[src*=file]').forEach(async(img)=>{img.src=await fetchPicSrc(img.src)})",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let ge=e=>doc.querySelector(e);let _src=ge('img[oncontextmenu]').src.replace(/\\d+$/,'');let max=ge('.onpage').parentNode.lastElementChild.previousElementSibling.innerText;let imgSrcArr=[];for(let i=1;i<=max;i++){let imgSrc;if(i<10){imgSrc=_src+'00'+i}else if(i<100){imgSrc=_src+'0'+i}else{imgSrc=_src+i}imgSrcArr.push(imgSrc)};return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('body>table>tbody>tr:nth-child(1)>td>table>tbody>tr>td:nth-child(2)>li>a:nth-child(3)');if(t)return t.innerText;",
        "css": ".PagetualImg{max-width: 100% !important;display: block !important;margin: 0 auto !important;}body>table>tbody>tr:nth-child(5){display:none!important}"
    },
    {
        "name": "動漫狂 - 閱讀",
        "url": "^https?://www\\.cartoonmad\\.(cc|com)/comic/\\d+\\.html",
        "example": "https://www.cartoonmad.com/comic/6187.html",
        "history": 2,
        "init": "document.onkeydown=null;let ge=e=>document.querySelector(e);let _src=ge('img[onload]').src.replace(/\\d+$/,'');let max=document.querySelectorAll('option[value]').length;let E=ge('img[onload]').parentNode.parentNode;let F=new DocumentFragment();for(let i=1;i<=max;i++){let imgSrc;if(i<10){imgSrc=_src+'00'+i}else if(i<100){imgSrc=_src+'0'+i}else{imgSrc=_src+i}let img=new Image();img.className='PagetualImg';img.src=imgSrc;F.appendChild(img)};E.innerHTML='';E.appendChild(F);let p=ge('body>table>tbody>tr:nth-child(2)').cloneNode(true);let c=ge('body>table>tbody>tr:last-child');c.parentNode.insertBefore(p,c);",
        "nextLink": "//a[img[@src='/image/rad.gif']]",
        "pageElement": "//script[contains(text(),'top.')]",
        "replaceElement": "head>title",
        "insert": "//td[@align]//td",
        "insertPos": 2,
        "pageInit": "let docge=e=>doc.querySelector(e);let ge=e=>document.querySelector(e);let _src=docge('img[onload]').src.replace(/\\d+$/,'');let max=doc.querySelectorAll('option[value]').length;let E=ge('.PagetualImg').parentNode;let F=new DocumentFragment();for(let i=1;i<=max;i++){let imgSrc;if(i<10){imgSrc=_src+'00'+i}else if(i<100){imgSrc=_src+'0'+i}else{imgSrc=_src+i}let img=new Image();img.className='PagetualImg';img.src=imgSrc;F.appendChild(img)};E.appendChild(F);let re=docge('body>table>tbody>tr:nth-child(2)').outerHTML;ge('body>table>tbody>tr:nth-child(2)').outerHTML=re;ge('body>table>tbody>tr:nth-child(6)').outerHTML=re;",
        "pageAction": "let ps=document.querySelectorAll('.pagetual_pageBar');if(ps.length>10){ps[0].remove();let ds=document.querySelector('.PagetualImg').parentNode.querySelectorAll('*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}};const fetchPicSrc=url=>{return fetch(url).then(res=>{return res.url})};document.querySelectorAll('img.PagetualImg[src*=file]').forEach(async(img)=>{img.src=await fetchPicSrc(img.src)})",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let ge=e=>doc.querySelector(e);let _src=ge('img[onload]').src.replace(/\\d+$/,'');let max=doc.querySelectorAll('option[value]').length;let imgSrcArr=[];for(let i=1;i<=max;i++){let imgSrc;if(i<10){imgSrc=_src+'00'+i}else if(i<100){imgSrc=_src+'0'+i}else{imgSrc=_src+i}imgSrcArr.push(imgSrc)};return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('b+a[style]');if(t)return t.innerText;",
        "css": ".PagetualImg{max-width: 100% !important;display: block !important;margin: 0 auto !important;}td[valign='top'][width='160'],td[width='12'],select[name],body>table>tbody>tr:nth-child(5){display:none!important}"
    },
    {
        "name": "動漫狂 - 分類",
        "example": "https://www.cartoonmad.com/hotrank.html",
        "url": "^https?://www\\.cartoonmad\\.(cc|com)/(hotrank|topcm|newcm|comic\\d+)(\\.\\d+)?\\.html",
        "nextLink": "a.onpage+a",
        "pageElement": "//table[tbody/tr/td/table/tbody/tr/td/a/span[@class='covers']]",
        "replaceElement": "td[align='right']>table:last-child",
        "css": ".pagetual_pageBar{margin-bottom:0px!important}"
    },
    {
        "name": "漫画人 / dm5 動漫屋 / 極速漫畫 - 手機版 - 漫畫在新分頁打開",
        "example": "https://m.dm5.com/",
        "url": "^https?://(www\\.manhuaren|m\\.dm5|m\\.1kkk)\\.com/",
        "exclude": [
            "#cp_img",
            "#tempc"
        ],
        "init": "let openInNewTab=()=>document.querySelectorAll('.swiper-wrapper a:not([target=_blank]),.manga-list a:not([target=_blank]),.rank-list a:not([target=_blank])').forEach(a=>{a.setAttribute('target','_blank')});openInNewTab();new MutationObserver(()=>{openInNewTab()}).observe(document.body,{childList:true,subtree:true});"
    },
    {
        "name": "漫画人 / dm5 動漫屋 / 極速漫畫 - 手機版閱讀",
        "example": "https://www.manhuaren.com/manhua-list-s2/，https://www.manhuaren.com/m198122/，https://m.dm5.com/m1331307/，https://m.1kkk.com/ch1063-1331307/，https://m.1kkk.com/vol1-4761/",
        "url": "^https?://(www|m)\\.(manhuaren|1kkk|dm5)\\.(com|cn)/(m|ch|vol|other)[-_0-9]+/$",
        "exclude": ".view-paging",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#cp_img img');if(set){clearInterval(loop);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML.slice(4,-1);let imgData=eval(eval(code).replace('var',''));let E=ge('#cp_img');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F)}},100)",
        "nextLinkByJs": "let gx=x=>doc.evaluate(x,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let next=gx(\"//ul[@class='view-bottom-bar']//a[text()='下一章' and not(contains(@href,'-end'))]\");if(next)return location.origin+next.href.split(\"'\")[1]",
        "pageElement": "#cp_img",
        "replaceElement": "head>title,.view-fix-top-bar-title,ul.view-bottom-bar,.view-fix-bottom-bar",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML.slice(4,-1);let imgData=eval(eval(code).replace('var',''));let E=doc.querySelector('#cp_img');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let cs=gae('#cp_img');let last=cs.length-1;cs[last].addEventListener('click',()=>{let t=document.querySelector('body.toolbar');if(t){$('body').removeClass('toolbar')}else{$('body').addClass('toolbar')}});let c=gae('#cp_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}setTimeout(()=>{gae('a[href*=pushHistory]').forEach(a=>{a.href=a.href.split(\"'\")[1]})},300);",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML.slice(4,-1);let imgSrcArr=eval(eval(code).replace('var',''));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('title');if(t)return t.innerText.match(/_([^_]+)/)[1]",
        "css": ".view-bottom-bar>li:nth-child(n+2):nth-child(-n+3),.view-fix-bottom-bar>a:nth-child(2),.guide{display:none!important}.view-bottom-bar li{width:50%!important}.view-fix-bottom-bar>a{width:25%!important}"
    },
    {
        "name": "極速漫畫 - PC版單行本閱讀",
        "example": "https://www.1kkk.com/vol1-4761/",
        "url": "^https?://(www|hk)\\.1kkk\\.com/vol[-_0-9]+/$",
        "include": "#chapterpager",
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#cp_img img');if(set){clearInterval(loop);document.body.style.overflow='scroll';ge('#cp_img').innerHTML='';let pcData=async(page)=>{if(page>DM5_IMAGE_COUNT){return}if(!mkey){var mkey=''}let apiUrl=location.href+'chapterfun.ashx'+`?cid=${DM5_CID}&page=${page}&key=${mkey}&language=1>k=6&_cid=${DM5_CID}&_mid=${DM5_MID}&_dt=${DM5_VIEWSIGN_DT}&_sign=${DM5_VIEWSIGN}`;let res=await fetch(apiUrl);let resText=await res.text();let imgSrc=await eval(resText)[0];let img=new Image();img.src=imgSrc;ge('#cp_img').appendChild(img);page++;pcData(page)};pcData(1)}},100)",
        "nextLink": "//a[text()='下一章']",
        "manualMode": true,
        "css": "a[href^='j'],.chapterpager,.view-comment{display:none!important}#cp_img>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.container{width:auto!important}"
    },
    {
        "name": "dm5 動漫屋 / 極速漫畫 - PC版閱讀",
        "example": "https://www.dm5.com/m1331307/，https://www.1kkk.com/ch1063-1331307/",
        "url": "^https?://(www|tel|en|cnc)?\\.?(dm5|1kkk)\\.(com|cn)/(m|ch)[-_0-9]+/$",
        "include": "#chapterpager",
        "pinUrl": true,
        "init": "let ge=(e)=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#cp_img>img');if(set){clearInterval(loop);ge('body').removeAttribute('style');ge('#cp_img').innerHTML=ge('#cp_img>img').outerHTML}},100);",
        "nextLinkByJs": "let ge=(e)=>doc.querySelector(e);let gx=x=>doc.evaluate(x,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let c=ge('.chapterpager>span.current').innerText;let m=ge('.chapterpager>*:last-child').innerText;let nc=gx(\"//a[text()='下一章']\");if(c!=m){let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/DM5_CURL/)>-1).innerHTML;let dc=eval(code.match(/DM5_CURL[^;]+/)[0]);let url=location.origin+dc;let next=url.replace(/(-p\\d+)?\\/$/,'')+'-p'+(parseInt(c)+1)+'/';return next}else if(nc){return nc.href}else{return null}",
        "pageElement": "#cp_img>img",
        "replaceElement": ".container",
        "pageAction": "let gae=(e)=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-p\\d+\\/$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#cp_img>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.active');if(t)return t.innerText.trim()",
        "rate": 10,
        "css": "a[href^='j'],.chapterpager{display:none!important}#cp_img>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.container{width:auto!important}"
    },
    {
        "name": "dm5 動漫屋 / 極速漫畫 - 分類",
        "example": "https://www.dm5.com/manhua-list/，https://www.1kkk.com/manhua-list/",
        "url": "^https?://(www|tel|en|cnc|hk)?\\.?(dm5|1kkk)\\.(com|cn)/manhua-([a-z]+/|list-area|list-tag|list-char)",
        "init": "document.querySelectorAll('.cat-filter a').forEach(a=>{a.setAttribute('onclick','setTimeout(()=>{location.reload()}, 1000)')})",
        "nextLink": "//a[text()=' > ']",
        "pinUrl": true,
        "pageElement": ".box-body",
        "replaceElement": ".page-pagination"
    },
    {
        "name": "無限動漫手機版 - 漫畫閱讀 - 雙擊下一集，鍵盤左右鍵上下集",
        "example": "https://8.twobili.com/comic/insurance_15059.html?ch=1",
        "url": "^https?://8\\.twobili\\.com/comic/insurance",
        "pinUrl": true,
        "init": "ge=e=>document.querySelector(e);function next(e){let key=window.event?e.keyCode:e.which;if(key==39){let n=ge('#nextvol:not([style])');if(n){n.click()}else{alert('沒有下一集了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){let p=ge('#prevvol');if(ch==1){alert('沒有上一集了！')}else{p.click()}}};document.addEventListener('keydown',prev);function dcnext(e){let n=ge('#nextvol:not([style])');if(n){n.click()}else{alert('沒有下一集了！')}};document.addEventListener('dblclick',dcnext);let E=ge('#TheTable>ul>li');let F=new DocumentFragment();for(let i=1;i<=ps;i++){let imgSrc='//img'+ss(c,4,2)+'.8comic.com/'+ss(c,6,1)+'/'+ti+'/'+ss(c,0,4)+'/'+nn([i])+'_'+ss(c,mm([i])+10,3,f)+'.jpg';let img=new Image();img.src=imgSrc;F.appendChild(img)};E.innerHTML='';E.appendChild(F);let ul=ge('#TheTable>ul');let v1=ge('.view_tmenu').cloneNode(true);let v2=document.querySelectorAll('.view_menut')[1];ul.appendChild(v2);ul.appendChild(v1);let b1=ge('.book_inc_title');let b2=ge('.book_link_item');ul.appendChild(b1);ul.appendChild(b2);",
        "nextLink": "0",
        "css": ".pinch-zoom-container{height: auto!important; display: contents!important}#pagenum,[onclick^='j'],#pageindex,ico+a+.material-icons.right-logo{display:none!important}.view_menut a{width:33.3%!important;max-width:33.3%!important}"
    },
    {
        "name": "無限動漫手機版 - 分類",
        "example": "https://m.comicbus.com/category/update_comic-1.html",
        "url": "^https?://m\\.comicbus\\.com/category/",
        "nextLink": "//a[span/@class='mdi mdi-skip-next mdi-next-btn']",
        "pageElement": "#list_dl",
        "replaceElement": ".pager",
        "css": ".pagetual_pageBar{margin-top:-1px!important;margin-bottom:5px!important}"
    },
    {
        "name": "無限動漫 - 漫畫閱讀2 - 鍵盤左右鍵上下集",
        "example": "https://www.comicabc.com/online/new-18722.html?ch=26",
        "url": "^https?://www\\.comicabc\\.com/online/new-\\d+\\.html(\\?ch=\\d+(-\\d+)?)?$",
        "init": "if(location.href.indexOf('ch=')==-1)location.href=location.href+'?ch=1';function ge(e){return document.querySelector(e)}function next(e){let key=window.event?e.keyCode:e.which;if(key==39){let n=ge('#nextvol:not([style])');if(n){n.click()}else{alert('沒有下一集了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){let p=ge('#prevvol');if(location.href.match(/ch=(\\d+)/)[1]==1){alert('沒有上一集了！')}else{p.click()}}};document.addEventListener('keydown',prev);",
        "nextLinkByUrl": [
            "(ch=\\d+)(-(\\d+))?$",
            "$1-{($3.0||1)+1}"
        ],
        "stopSign": [
            [
                "#pagenum",
                "(\\d+)"
            ],
            [
                "#pagenum",
                "\\/(\\d+)"
            ]
        ],
        "pageElement": "#TheImg",
        "replaceElement": "#pagenum",
        "css": "img[name='TheImg'] {max-width: 100% !important;display: block !important;margin: 0 auto !important;}#TheTable td:nth-child(1),#TheTable td:nth-child(3),.comment_block,#prevnext2,#prev,#next{display:none!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "無限動漫 - 漫畫閱讀 - 鍵盤左右鍵上下集",
        "example": "https://www.comicabc.com/ReadComic/103/1/1_FU4_LD9_7.html",
        "url": "^https?://www\\.comicabc\\.com/ReadComic/\\d+/\\d+/\\w+\\.html",
        "init": "function ge(e){return document.querySelector(e)}function next(e){let key=window.event?e.keyCode:e.which;if(key==39){let n=ge('#nextvol:not([style])');if(n){n.click()}else{alert('沒有下一集了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){let p=ge('#prevvol');if(location.pathname.split('/')[3]==1){alert('沒有上一集了！')}else{p.click()}}};document.addEventListener('keydown',prev);",
        "nextLinkByUrl": [
            "html(\\?p=(\\d+))?$",
            "html?p={($2.0||1)+1}"
        ],
        "stopSign": [
            [
                "#pagenum",
                "(\\d+)"
            ],
            [
                "#pagenum",
                "\\/(\\d+)"
            ]
        ],
        "pageElement": "#TheImg",
        "replaceElement": "#pagenum",
        "css": "img[name='TheImg'] {max-width: 100% !important;display: block !important;margin: 0 auto !important;}#TheTable td:nth-child(1),#TheTable td:nth-child(3),.comment_block,#prevnext2,#prev,#next{display:none!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "無限動漫 - 動漫大全",
        "example": "https://www.comicabc.com/list/all_all_all/",
        "url": "^https?://www\\.comicabc\\.com/list/",
        "nextLink": "//a[span/@class='mdi mdi-skip-next']",
        "pageElement": ".default_row_width .row>.p-0",
        "replaceElement": ".pager",
        "css": ".pagetual_pageBar{margin-top:-14px!important}"
    },
    {
        "name": "無限動漫 - 分類",
        "example": "https://www.comicabc.com/comic/6-1.html",
        "url": "^https?://www\\.comicabc\\.com/comic/[a-z0-9-]+\\.html",
        "nextLink": "//a[span/@class='mdi mdi-skip-next']",
        "pageElement": ".default_row_width>.p-0",
        "replaceElement": ".pager",
        "css": ".pagetual_pageBar{margin-top:-14px!important}"
    },
    {
        "name": "無限動漫 - 圖庫原圖瀏覽",
        "example": "https://www.comicabc.com/photo/p6038.html?n=1",
        "url": "^https?://www\\.comicabc\\.com/photo/p\\d+\\.html\\?n=\\d+$",
        "nextLinkByUrl": [
            "(\\?n=(\\d+))$",
            "?n={$2+1}",
            "#next:not([style])"
        ],
        "pageElement": "img[name='TheImg']",
        "replaceElement": ".photo_main_div > div:nth-child(1)",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "img[name='TheImg'] {max-width: 98% !important;display: block !important;margin: 0 auto !important;}"
    },
    {
        "name": "無限動漫 - 圖庫清單載入大圖",
        "example": "https://www.comicabc.com/photo/6041.html",
        "url": "^https?://www\\.comicabc\\.com/photo/\\d+\\.html$",
        "init": "document.querySelectorAll('#dl img').forEach(img=>{let f=img.src.replace('.jpe','.jpg');img.src=f})",
        "pinUrl": true
    },
    {
        "name": "無限動漫 - 圖庫",
        "example": "https://www.comicabc.com/photo/1-1.html",
        "url": "^https?://www\\.comicabc\\.com/photo/[0-9-]+\\.html$",
        "nextLink": "//a[span/@class='mdi mdi-skip-next']",
        "pageElement": ".photo_main_div .row",
        "replaceElement": ".pager"
    },
    {
        "name": "無限動漫 - 類別停止自動匹配",
        "example": "https://www.comicabc.com/html/1/",
        "url": "^https?://www\\.comicabc\\.com/html/\\d+/$",
        "nextLink": "0"
    },
    {
        "name": "砂之船动漫家 / 361中文漫画 - 手機版閱讀",
        "example": "https://www.szcdmj.com/szcchapter/736400，https://www.361zw.com/361zwchapter/318949",
        "url": "^https?://www\\.(szcdmj|361zw)\\.com/\\w{3,5}chapter/\\d+(\\?page=\\d+)?",
        "include": ".view-bottom-bar",
        "history": 2,
        "pinUrl": true,
        "nextLink": "//a[@href][text()='下一页' or text()='下一话']",
        "pageElement": "#cp_img>img",
        "replaceElement": ".view-bottom-bar,.view-fix-top-bar,.view-fix-bottom-bar",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/page=/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#cp_img>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.view-fix-top-bar-title');if(t)return t.innerText",
        "css": ".view-bottom-bar>li:nth-child(n+3):nth-child(-n+4),.view-fix-bottom-bar-item:nth-child(n+4):nth-child(-n+5){display:none!important}.view-fix-bottom-bar-item,.view-bottom-bar>li{width:33.33%!important}"
    },
    {
        "name": "砂之船动漫家 / 361中文漫画 / 土豪漫画 - PC版閱讀",
        "example": "https://www.szcdmj.com/szcchapter/736400，https://www.361zw.com/361zwchapter/318168，https://7hxy.com/chapter/968191?page=8&id=968191",
        "url": "^https?://(www\\.)?(szcdmj|361zw|7hxy)\\.com/\\w{0,5}chapter/\\d+",
        "include": ".read-section",
        "history": 2,
        "pinUrl": true,
        "nextLink": "//a[@href][text()='下一页' or text()='下一话' or text()='下一章']",
        "pageElement": ".comiclist>.comicpage",
        "replaceElement": ".fanye",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/page=/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('.comiclist>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.title');if(t)return t.innerText.match(/\\s(.+)/)[1]",
        "css": ".comiclist img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "砂之船动漫家 / 361中文漫画 - 分類",
        "example": "https://www.szcdmj.com/szcbolist",
        "url": "^https?://www\\.(szcdmj|361zw)\\.com/(szcbolist|booklist)",
        "nextLink": "#nextPage,a[title='下一页'],li.active+li>a",
        "pageElement": ".mh-list,.manga-list>ul",
        "replaceElement": ".pagination",
        "pageAction": "document.querySelectorAll('.mh-cover').forEach(e=>{e.style=e.getAttribute('style')})",
        "css": ".mh-list+.pagetual_pageBar{margin-top:20px!important}.manga-list-2-cover-img{opacity: 1!important}"
    },
    {
        "name": "生辰漫画网 - 手機版閱讀",
        "example": "https://m.chashengchen.com/manhua/xianziniyoudaxiongzhizhao/2867318.html",
        "url": "^https?://m\\.chashengchen\\.com/manhua/\\w+/\\d+\\.html",
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let F=new DocumentFragment();document.querySelectorAll('#image,.scroll-item img').forEach(e=>{let img=new Image();if(e.dataset.src){img.src=e.dataset.src}else{img.src=e.src}F.appendChild(img)});let E=ge('#scroll-image');E.innerHTML='';E.appendChild(F);ge('.erPag').remove();",
        "nextLink": "//a[text()='下一章' and contains(@href,'html')]",
        "pageElement": "#scroll-image",
        "replaceElement": "head>title,h1,#action",
        "pageInit": "let F=new DocumentFragment();doc.querySelectorAll('#image,.scroll-item img').forEach(e=>{let img=new Image();if(e.dataset.src){img.src=e.dataset.src}else{img.src=e.src}F.appendChild(img)});let E=doc.querySelector('#scroll-image');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#scroll-image');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1>span');if(t)return t.innerText.replace(/[^>]+>/,'')",
        "css": ".action-list li{width:50%!important}.right,#action>ul>li:nth-child(n+2):nth-child(-n+3),.UnderPage+div+script+div[id]{display:none!important}"
    },
    {
        "name": "漫画连 - 閱讀",
        "example": "https://www.100mhl.com/manhua/yuanlaiwoshixianjiezhizun/1268523.html",
        "url": "^https?://www\\.100mhl\\.com/manhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=ge('#imagesOld');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(e.indexOf('http')!=-1){img.src=e}else{img.src=SinConf.resHost[0].domain+e}F.appendChild(img)});E.innerHTML='';E.appendChild(F);$('head').append('<style>#tbCenter>#imagesOld:nth-child(1)>img:nth-child('+imgData.length+')~* {display:none!important}</style>')",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#imagesOld",
        "replaceElement": "head>title,h1",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=ge('#imagesOld');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(e.indexOf('http')!=-1){img.src=e}else{img.src=SinConf.resHost[0].domain+e}F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerHTML.replace(/\\s<.+>/,'')",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span,.img_info{display:none!important}#imagesOld>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}"
    },
    {
        "name": "生辰漫画网 / 奇妙漫画 - 閱讀",
        "example": "https://www.chashengchen.com/manhua/xianziniyoudaxiongzhizhao/2867318.html",
        "url": "^https?://www\\.(chashengchen|qmiaomh)\\.com/manhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=ge('#images');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(e.indexOf('http')!=-1){img.src=e}else{img.src=SinConf.resHost[0].domain+e}F.appendChild(img)});E.innerHTML='';E.appendChild(F);$('head').append('<style>#tbCenter>#images:nth-child(1)>img:nth-child('+imgData.length+')~* {display:none!important}</style>')",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,h1",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=ge('#images');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(e.indexOf('http')!=-1){img.src=e}else{img.src=SinConf.resHost[0].domain+e}F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc;if(e.indexOf('http')!=-1){imgSrc=e}else{imgSrc=SinConf.resHost[0].domain+e}imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerHTML.replace(/\\s<.+>/,'')",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span,.img_info{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}"
    },
    {
        "name": "来漫画 - 手機版閱讀",
        "example": "https://m.laimanhua.net/kanmanhua/kaijujiangliyiyitiaoming/1684241122.html",
        "url": "^https?://m\\.laimanhua\\.net/kanmanhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/mhInfo/)>-1).innerHTML;let json=eval(code.match(/mhInfo[^;]+/)[0]);let E=ge('#manga');let F=new DocumentFragment();json.images.forEach(e=>{let img=new Image();img.src=realurl+json.path+e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/mhInfo/)>-1).innerHTML;let json=eval(code.match(/mhInfo[^;]+/)[0]);let next=json.nextUrlid;if(next>0)return location.href.replace(/\\d+\\.html$/,'')+next+'.html';",
        "pageElement": "#manga",
        "replaceElement": "head>title,#mangaTitle",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/mhInfo/)>-1).innerHTML;let json=eval(code.match(/mhInfo[^;]+/)[0]);let E=ge('#manga');let F=new DocumentFragment();json.images.forEach(e=>{let img=new Image();img.src=realurl+json.path+e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#manga');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/mhInfo/)>-1).innerHTML;let json=eval(code.match(/mhInfo[^;]+/)[0]);let imgSrcArr=[];json.images.forEach(e=>{let imgSrc=realurl+json.path+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('#mangaTitle');if(t)return t.innerHTML.replace(/.+<.+>/g,'').trim()",
        "css": ".action-list li{width:50%!important}#action>ul>li:nth-child(n+2):nth-child(-n+3),.manga-page,[id^='jusha']{display:none!important}.manga-box img{border-top:0px!important;border-bottom:0px!important}"
    },
    {
        "name": "来漫画 - 閱讀",
        "example": "https://www.laimanhua.net/kanmanhua/kaijujiangliyiyitiaoming/1684241122.html",
        "url": "^https?://www\\.laimanhua\\.net/kanmanhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/picTree/)>-1).innerHTML;let base64=eval(code.match(/picTree[^;]+/)[0]);let imgData=base64_decode(base64).split('$qingtiandy$');let host=getpicdamin();let E=ge('#pic-list');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=encodeURI(host+e);F.appendChild(img)});E.innerHTML='';E.appendChild(F);$('head').append('<style>.loading-box+#pic-list>img:nth-child('+imgData.length+')~* {display:none!important}</style>')",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextUrlid/)>-1).innerHTML;let next=eval(code.match(/nextUrlid[^,]+/)[0]);if(next>0)return location.href.replace(/\\d+\\.html$/,'')+next+'.html'",
        "pageElement": "#pic-list",
        "replaceElement": "head>title,h1,#position>b",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/picTree/)>-1).innerHTML;let base64=eval(code.match(/picTree[^;]+/)[0]);let imgData=base64_decode(base64).split('$qingtiandy$');let host=getpicdamin();let E=ge('#pic-list');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=encodeURI(host+e);F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#pic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/picTree/)>-1).innerHTML;let base64=eval(code.match(/picTree[^;]+/)[0]);let imgData=base64_decode(base64).split('$qingtiandy$');let host=getpicdamin();let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=encodeURI(host+e);imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('#position>b');if(t)return t.innerText",
        "css": ".img_info{display:none!important}#pic-list>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}.pagetual_pageBar+.img-box{margin-top:0px!important}"
    },
    {
        "name": "漫画吧 / 漫画连 - 手機版閱讀",
        "example": "https://m.dmhua8.com/manhua/shengnvyintaiguowanmeibugoukeaierbeifeichuhunyuebingmaidaolinguo/966591.html",
        "url": "^https?://m\\.(d?mhua8|100mhl)\\.com/manhua/[a-z]+/\\d+\\.html",
        "init": "let gae=e=>document.querySelectorAll(e);let Imgs=gae('#images')[0];let Img=gae('img[alt]');let _img='';for(let i=0;i<Img.length;i++){_img+=Img[i].outerHTML}Imgs.innerHTML=_img;",
        "action": 1,
        "wait": "let img=doc.querySelector('#images img[alt]');return img!=null",
        "nextLinkByJs": "let n=doc.querySelector('.action-list li:nth-child(3)>a');if(/html$/.test(n.href))return n.href",
        "pageElement": "#images img[alt]",
        "replaceElement": "head>title,.BarTit,#action",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-\\d+\\.html$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>9){ps[0].remove();let ds=document.querySelectorAll('#images>*');for(let i=0;i<ds.length;i++){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText;",
        "rate": 10,
        "css": "#images~[id]:not(.control_bottom){display:none!important}#images img{margin:0 auto!important}"
    },
    {
        "name": "漫画吧 - 閱讀",
        "example": "https://www.dmhua8.com/manhua/shengnvyintaiguowanmeibugoukeaierbeifeichuhunyuebingmaidaolinguo/966404.html",
        "url": "^https?://www\\.d?mhua8\\.com/manhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "autoClick": "#chapter-scroll:not(.active)",
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let E=ge('#images');let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);let style=document.createElement('style');style.innerHTML='#tbCenter>#images:nth-child(1)>img:nth-child('+chapterImages.length+')~*{display: none!important}';ge('head').appendChild(style);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,h2",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=doc.querySelector('#images');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": "#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}.img_info{display:none!important}"
    },
    {
        "name": "85漫画网手機版 - 漫畫閱讀",
        "example": "https://m.85iu.com/manhua/mofaxueyuandeweizhuangjiaoshi/2740936.html",
        "url": "^https?://m\\.85iu\\.com/manhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "init": "let Imgs=document.querySelector('.erPag');let Img=document.querySelector('.erPag img');Imgs.innerHTML=Img.outerHTML;",
        "nextLink": "//a[text()='下一页' and contains(@href,'html')]",
        "pageElement": ".erPag img",
        "replaceElement": "head>title,h1,#action",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-\\d+\\.html$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('.erPag>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('h1>span');if(t)return t.innerText.replace(/[^>]+>/,'')",
        "rate": 10,
        "css": ".right{display:none!important}"
    },
    {
        "name": "xlsmh下拉式漫画 / 奇妙漫画 - 手機版閱讀",
        "example": "https://m.xlsmh.com/manhua/wodetexingnengwuxianchengzhang/1308826.html",
        "url": "^https?://m\\.(xlsmh|qmiaomh)\\.com/manhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let F=new DocumentFragment();document.querySelectorAll('#image,.scroll-item img').forEach(e=>{let img=new Image();if(e.dataset.src){img.src=e.dataset.src}else{img.src=e.src}F.appendChild(img)});let E=ge('#scroll-image');E.innerHTML='';E.appendChild(F);ge('#images').remove();",
        "nextLink": "//a[contains(text(),'下一章') and contains(@href,'html')]",
        "pageElement": "#scroll-image",
        "replaceElement": "head>title,h1,.letchepter",
        "pageInit": "let F=new DocumentFragment();doc.querySelectorAll('#image,.scroll-item img').forEach(e=>{let img=new Image();if(e.dataset.src){img.src=e.dataset.src}else{img.src=e.src}F.appendChild(img)});let E=doc.querySelector('#scroll-image');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#scroll-image');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1>span');if(t)return t.innerText.replace(/[^>]+>/,'')",
        "css": ".right,.letchepter+p,.action-list{display:none!important}"
    },
    {
        "name": "xlsmh下拉式漫画 / 85漫画网 - 閱讀",
        "example": "https://www.xlsmh.com/manhua/wodetexingnengwuxianchengzhang/1308826.html，https://www.85iu.com/manhua/mofaxueyuandeweizhuangjiaoshi/2740936.html",
        "url": "^https?://www\\.(xlsmh|85iu)\\.com/manhua/\\w+/\\d+\\.?\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let E=ge('#images');let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);let style=document.createElement('style');style.innerHTML='#tbCenter>#images:nth-child(1)>img:nth-child('+chapterImages.length+')~*{display: none!important}';ge('head').appendChild(style);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,h1",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=doc.querySelector('#images');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgSrcArr=eval(code.match(/chapterImages[^;]+/)[0]);return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerHTML.match(/\\S+([^<]+)<.+>/)[1]",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span,.img_info{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}"
    },
    {
        "name": "爱米推漫画 / 蔷薇漫画 - 手機版閱讀",
        "example": "https://m.imitui.com/manhua/yuanzun/3683.html，https://m.qwmanhua.com/manhua/woshenmeshihouwudile/1239188.html",
        "url": "^https?://m\\.(imitui|qwmanhua)\\.com/manhua/\\w+/\\d+\\.html",
        "action": 1,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);let prev=eval(code.match(/prevChapterData[^;]+/)[0]);document.querySelectorAll('.comic-panel a:last-child').forEach(e=>{e.removeAttribute('onclick');if(next.id>0){e.href=next.url}else{e.href='';e.innerText='無下一章'}});document.querySelectorAll('.comic-panel a:first-child').forEach(e=>{e.removeAttribute('onclick');if(prev.id>0)e.href=prev.url});let ge=e=>document.querySelector(e);let F=new DocumentFragment();document.querySelectorAll('#image,.scroll-item img').forEach(e=>{let img=new Image();if(e.dataset.src){img.src=e.dataset.src}else{img.src=e.src}F.appendChild(img)});let E=ge('#scroll-image');E.innerHTML='';E.appendChild(F);ge('#images').remove();",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#scroll-image",
        "replaceElement": "head>title,h1,.BarTit",
        "pageInit": "let F=new DocumentFragment();doc.querySelectorAll('#image,.scroll-item img').forEach(e=>{let img=new Image();if(e.dataset.src){img.src=e.dataset.src}else{img.src=e.src}F.appendChild(img)});let E=doc.querySelector('#scroll-image');E.innerHTML='';E.appendChild(F);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);let prev=eval(code.match(/prevChapterData[^;]+/)[0]);document.querySelectorAll('.comic-panel a:last-child').forEach(e=>{if(next.id>0){e.href=next.url}else{e.href='';e.innerText='無下一章'}});document.querySelectorAll('.comic-panel a:first-child').forEach(e=>{if(prev.id>0)e.href=prev.url});",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#scroll-image');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText;",
        "css": ".nav+div{display:none!important}#scroll-image img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫画芯 / 最漫画 - 手機版閱讀",
        "example": "https://m.mhxin.com/manhua/douluodalu/631505.html，https://m.zuimh.com/manhua/douluodalu/314222.html",
        "url": "^https?://m\\.(mhxin|zuimh)\\.com/manhua/[a-z]+/\\d+\\.html",
        "init": "let a=document.querySelector('#images a');a.outerHTML=a.innerHTML;",
        "nextLinkByJs": "let ge=e=>doc.querySelector(e);let m=ge('.image-content>p:last-child').innerText.match(/(\\d+)\\/(\\d+)/);let np=ge('.action-list li:nth-child(3)>a');let nc=ge('.action-list li:nth-child(4)>a');if(m[1]!=m[2]){return np.href}else if(/html$/.test(nc.href)){return nc.href}",
        "pinUrl": true,
        "pageElement": "#images img[id]",
        "replaceElement": ".image-content>p:last-child",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-\\d+\\.html$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>5){ps[0].remove();let ds=document.querySelector('#images img[id]').parentNode.querySelectorAll('*');for(let i=0;i<ds.length;i++){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText",
        "rate": 10,
        "css": "#image-msg,ul.nav+div:not(#images),ul.nav+div+div:not(#images),.action-list>ul>li:nth-child(n+2):nth-child(-n+3){display:none!important}.action-list li{width:50%!important}.chapter-view #images img{margin:0 auto 0px!important}"
    },
    {
        "name": "最漫画 / 爱米推漫画 - PC版閱讀",
        "example": "https://www.zuimh.com/manhua/maoshendoumaocao/1755415.html，https://www.imitui.com/manhua/yuanzun/3683.html",
        "url": "^https?://www\\.(zuimh|imitui)\\.com/manhua/[a-z]+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "autoClick": "#chapter-scroll:not(.active)",
        "init": "let ge=e=>document.querySelector(e);let E=ge('#images');let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);let style=document.createElement('style');style.innerHTML='#tbCenter>#images:nth-child(1)>img:nth-child('+chapterImages.length+')~*{display: none!important}';ge('head').appendChild(style);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,h2",
        "pageInit": "let gae=e=>document.querySelectorAll(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let E=doc.querySelector('#images');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);setTimeout(()=>{let c=eval(code.match(/comicUrl[^;]+/)[0]);let p=eval(code.match(/prevChapterData[^;]+/)[0]);let n=eval(code.match(/nextChapterData[^;]+/)[0]);gae('.nextC').forEach(e=>{if(n.id>0){e.href=n.url}else{e.href=c;e.innerHTML=e.innerHTML.replace('下一章','返回目录')}});gae('.prevC').forEach(e=>{e.href=p.url})},300)",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgSrcArr=eval(code.match(/chapterImages[^;]+/)[0]);return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}"
    },
    {
        "name": "前未漫画 / 漫画芯 / 蔷薇漫画 - PC版閱讀",
        "example": "https://www.mhxin.com/manhua/taixugongyu/2345840.html，https://www.qianmh.com/manhua/dianjuren/253973.html，https://www.qwmanhua.com/manhua/woshenmeshihouwudile/1239187.html",
        "url": "^https?://www\\.(qianmh|mhxin|qwmanhua)\\.com/manhua/[a-z]+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=ge('#images');if(E){E.innerHTML='';E.appendChild(F)}let style=document.createElement('style');style.innerHTML='.comic_wraCon>#images:nth-child(1)>img:nth-child('+chapterImages.length+')~*{display: none!important}';ge('head').appendChild(style);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0 && !document.querySelector('.ip-body'))return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,.wrap_last_head,.wrap_last_mid",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=ge('#images');if(E){E.innerHTML='';E.appendChild(F)}",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}setTimeout(()=>{let n=ge('.next>a');if(n){ge('.btm_chapter_btn.fr').href=n.href}else{ge('.btm_chapter_btn').href=ge('.head_wz>a+a').href}let p=ge('.pre>a');if(p){ge('.btm_chapter_btn.fl').href=p.href}},300);",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgSrcArr=eval(code.match(/chapterImages[^;]+/)[0]);return imgSrcArr",
        "pageBarText": "let t=document.querySelector('.head_wz');let t2=document.querySelector('a+h1');if(t){return t.innerHTML.replace(/.+;/,'').replace(/\\s-\\s漫画芯/,'')}else if(t2){return t2.innerText.match(/\\S+\\s(\\S+\\s\\S+)/)[1]}",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}body,.autoHeight,.wrap_last_mid .pre,.wrap_last_mid .next,.chapter-view .panel,.mainNav_inner{width:auto!important;min-width:auto!important}"
    },
    {
        "name": "古风漫画网 - 手機版閱讀",
        "example": "https://m.gufengmh.com/manhua/wokeyiwuxianzhaohuan/2042963.html",
        "url": "^https?://m\\.gufengmh\\.com/manhua/[a-z]+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);ge('body>div:nth-child(1)').innerHTML=ge('#panel-title').innerHTML;ge('.iconRet').href=comicUrl;gae('.beforeChapter,.afterChapter').forEach(e=>{e.removeAttribute('onclick')});let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgPath=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imghost+imgPath+e;F.appendChild(img)});let E=ge('#images');E.innerHTML='';E.appendChild(F);let next=eval(code.match(/nextChapterData[^;]+/)[0]);let prev=eval(code.match(/prevChapterData[^;]+/)[0]);if(next.id>0){gae('.afterChapter').forEach(e=>{e.href=comicUrl+next.id+'.html'})}else{gae('.afterChapter').forEach(e=>{e.href=comicUrl;})}if(prev.id>0){gae('.beforeChapter').forEach(e=>{e.href=comicUrl+prev.id+'.html'})}",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return comicUrl+next.id+'.html'",
        "pageElement": "#images",
        "pageInit": "let gae=e=>document.querySelectorAll(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgPath=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imghost+imgPath+e;F.appendChild(img)});let E=doc.querySelector('#images');E.innerHTML='';E.appendChild(F);let next=eval(code.match(/nextChapterData[^;]+/)[0]);let prev=eval(code.match(/prevChapterData[^;]+/)[0]);if(next.id>0){gae('.afterChapter').forEach(e=>{e.href=comicUrl+next.id+'.html'})}else{gae('.afterChapter').forEach(e=>{e.href=comicUrl;})}if(prev.id>0){gae('.beforeChapter').forEach(e=>{e.href=comicUrl+prev.id+'.html'})}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgPath=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=imghost+imgPath+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText.trim()",
        "css": "#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}body>div:nth-child(1) .iconRet{position:absolute;left:0px;width:45px;height:45px;top:-3px;display:block;background:url(https://m.gufengmh.com/assets/f0660635/images/bg_icon_ret.png) no-repeat 20px 14px;background-size:9px 17px}"
    },
    {
        "name": "古风漫画网 - 手機版分類",
        "example": "https://m.gufengmh.com/update/",
        "url": "^https?://m\\.gufengmh\\.com/",
        "nextLink": ".pagination li.active+li>a",
        "pageElement": "//div[@class='UpdateList'] | //ul[li[@class='list-comic']]",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar+.UpdateList{margin-top:0px!important}"
    },
    {
        "name": "古风漫画网 - PC版閱讀",
        "example": "https://www.gufengmh.com/manhua/yuanlaiwoshixianjiezhizun/2053294.html",
        "url": "^https?://www\\.gufengmh\\.com/manhua/[a-z]+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "autoClick": "#chapter-pagination:not(.active)",
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgPath=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imghost+imgPath+e;F.appendChild(img)});let E=document.querySelector('#images');E.innerHTML='';E.appendChild(F);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return comicUrl+next.id+'.html'",
        "pageElement": "#images",
        "replaceElement": "h2,.wrap_last_head,.wrap_last_mid",
        "pageInit": "let gae=e=>document.querySelectorAll(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgPath=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imghost+imgPath+e;F.appendChild(img)});let E=doc.querySelector('#images');E.innerHTML='';E.appendChild(F);let next=eval(code.match(/nextChapterData[^;]+/)[0]);let prev=eval(code.match(/prevChapterData[^;]+/)[0]);if(next.id>0){gae('.nextC').forEach(e=>{e.href=comicUrl+next.id+'.html'})}else{gae('.nextC').forEach(e=>{e.href=comicUrl;e.style.display='none';})}if(prev.id>0){gae('.prevC').forEach(e=>{e.href=comicUrl+prev.id+'.html'})}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgPath=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=imghost+imgPath+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}body,.autoHeight,.wrap_last_mid .pre,.wrap_last_mid .next,.chapter-view .panel,.mainNav_inner{width:auto!important;min-width:auto!important}"
    },
    {
        "name": "优酷漫画手機版 - 閱讀",
        "example": "http://wap.ykmh.com/manhua/yiquanchaoren/346.html",
        "url": "^https?://wap\\.ykmh\\.com/manhua/[a-z]+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "init": "$('#images').unbind('click',SinTheme.nextPage);$('#images').unbind('mousedown');let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgs=eval(code.match(/chapterImages[^;]+/)[0]);let host=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+/)[0];let F=new DocumentFragment();imgs.forEach(e=>{let img=new Image();img.src=host+e;F.appendChild(img)});let E=document.querySelector('#images');E.innerHTML='';E.appendChild(F);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url;",
        "pageElement": "#images",
        "replaceElement": "head>title,.BarTit",
        "pageInit": "let ge=e=>document.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgs=eval(code.match(/chapterImages[^;]+/)[0]);let host=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+/)[0];let F=new DocumentFragment();imgs.forEach(e=>{let img=new Image();img.src=host+e;F.appendChild(img)});let E=doc.querySelector('#images');E.innerHTML='';E.appendChild(F);let next=eval(code.match(/nextChapterData[^;]+/)[0]);let n=ge('#action>ul>li:nth-child(4)>a');let n2=ge('.afterChapter');if(next.id>0){n.href=next.uri;n2.outerHTML=`<a href=\"${next.uri}\"class=\"afterChapter\">下一章></a>`}else{n.removeAttribute('href');n.innerText='無下一章';n2.outerHTML=`<a href class=\"afterChapter\">無下一章</a>`}let prev=eval(code.match(/prevChapterData[^;]+/)[0]);let p=ge('#action>ul>li:nth-child(1)>a');let p2=ge('.beforeChapter');if(prev.id>0){p.href=prev.uri;p2.outerHTML=`<a href=\"${prev.uri}\"class=\"beforeChapter\"><上一章</a>`}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgs=eval(code.match(/chapterImages[^;]+/)[0]);let host=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+/)[0];let imgSrcArr=[];imgs.forEach(e=>{let imgSrc=host+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerHTML.match(/\\n?([^<]+)/)[1]",
        "css": ".subHeader span,#action>ul>li:nth-child(n+2):nth-child(-n+3),.letchepter>section,.letchepter>svg,i~div[id][class],body>span~div:not(#pagetual-preload):not(.pagetual_tipsWords),.comic-comment{display:none!important}.action-list li{width:50%!important}.chapter-view #images img{margin:0 auto 0px!important}"
    },
    {
        "name": "优酷漫画 - PC版閱讀",
        "example": "http://www.ykmh.com/manhua/yiquanchaoren/346.html",
        "url": "^https?://www\\.ykmh\\.com/manhua/[a-z]+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imghost+e;F.appendChild(img)});let E=document.querySelector('#images');E.innerHTML='';E.appendChild(F);",
        "nextLink": ".next>a",
        "pageElement": "#images",
        "replaceElement": "head>title,.wrap_last_head,.wrap_last_mid",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=imghost+e;F.appendChild(img)});let E=doc.querySelector('#images');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imghost=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=imghost+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.head_wz');if(t)return t.innerHTML.replace(/.+;/,'')",
        "pageNum": "{$p}\\.html$",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}body,.autoHeight,.wrap_last_mid .pre,.wrap_last_mid .next,.chapter-view .panel,.mainNav_inner{width:auto!important;min-width:auto!important}"
    },
    {
        "name": "90漫畫網手機版 - 漫畫閱讀",
        "example": "http://wap.90mh.com/manhua/DRAWINGzuiqiangmanhuajialiyonghuihuajinengzaiyishijiekaiwushuang/204311.html",
        "url": "^https?://wap\\.90mh\\.com/manhua/",
        "init": "let Imgs=document.querySelector('#chapter-image');let Img=document.querySelector('#chapter-image img');Imgs.innerHTML=Img.outerHTML;",
        "nextLinkByJs": "function ge(e){return doc.querySelector(e)}let page=ge('#k_page').innerText;let total=ge('#k_total').innerText;let np=ge('.action-list li:nth-child(3) a');let nc=ge('.action-list li:nth-child(4) a');if(page!=total){return np.href}else if(/html$/.test(nc.href)){return nc.href}",
        "pageElement": "#chapter-image img",
        "replaceElement": "head>title,h1,#m_r_bottom",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar>a').forEach(e=>{if(/-\\d+\\.html$/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#chapter-image>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerText.match(/>(.+)\\n/)[1];",
        "rate": 10,
        "css": ".friendly,#action>ul>li:nth-child(n+2):nth-child(-n+3){display:none!important}.action-list li{width:50%!important}"
    },
    {
        "name": "90漫畫網 / 生辰漫画网 - 手機版分類",
        "example": "http://wap.90mh.com/update/，https://m.chashengchen.com/list/update/",
        "url": "^https?://(wap|m)\\.(90mh|chashengchen)\\.com/(update|list)/",
        "nextLink": "#update_list li.next>a,#w0 li.next>a",
        "pageElement": ".itemBox,.list-comic",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "90漫畫網 - PC版閱讀",
        "example": "http://www.90mh.com/manhua/DRAWINGzuiqiangmanhuajialiyonghuihuajinengzaiyishijiekaiwushuang/204311.html",
        "url": "^https?://www\\.90mh\\.com/manhua/\\w+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "autoClick": "#chapter-scroll:not(.active)",
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=ih+cp+e;F.appendChild(img)});let E=document.querySelector('#images');E.innerHTML='';E.appendChild(F);let style=document.createElement('style');style.innerHTML='#tbCenter>#images:nth-child(1)>img:nth-child('+imgData.length+')~*{display: none!important}';ge('head').appendChild(style);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,h2",
        "pageInit": "let gae=e=>document.querySelectorAll(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=ih+cp+e;F.appendChild(img)});let E=doc.querySelector('#images');E.innerHTML='';E.appendChild(F);setTimeout(()=>{let c=eval(code.match(/comicUrl[^;]+/)[0]);let p=eval(code.match(/prevChapterData[^;]+/)[0]);let n=eval(code.match(/nextChapterData[^;]+/)[0]);gae('.nextC').forEach(e=>{if(n.id>0){e.href=n.uri}else{e.href=c;e.innerHTML=e.innerHTML.replace('下一章','返回目录')}});gae('.prevC').forEach(e=>{e.href=p.uri})},300)",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=ih+cp+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}"
    },
    {
        "name": "90漫畫網 - 分類",
        "example": "http://www.90mh.com/update/",
        "url": "^https?://www\\.90mh\\.com/(update|list)/",
        "nextLink": "li.next>a",
        "pageElement": "#contList",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "古漫画 / 360 漫画 - 手機版分類",
        "example": "https://m.izhegu.com/update/，https://m.100fanwo.com/update/",
        "url": "^https?://(m)\\.(100fanwo|izhegu)\\.com/",
        "nextLink": "li.next>a",
        "pageElement": ".UpdateList>.itemBox,.list-comic",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "古漫画 / 360 漫画 - PC版閱讀",
        "example": "https://www.izhegu.com/manhua/banbenDAYS/2011818.html，https://www.100fanwo.com/manhua/banbenDAYS/3434626.html",
        "url": "^https?://www\\.(izhegu|100fanwo)\\.com/manhua/[a-z]+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imghost='https://res1.izhegu.com';let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(e.indexOf('http')!=-1){img.src=e}else{img.src=imghost+e}F.appendChild(img)});let E=ge('#images');E.innerHTML='';E.appendChild(F);let style=document.createElement('style');style.innerHTML='#tbCenter>#images:nth-child(1)>img:nth-child('+imgData.length+')~*{display: none!important}';ge('head').appendChild(style);",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "replaceElement": "head>title,h2",
        "pageInit": "let gae=e=>document.querySelectorAll(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imghost='https://res1.izhegu.com';let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(e.indexOf('http')!=-1){img.src=e}else{img.src=imghost+e}F.appendChild(img)});let E=doc.querySelector('#images');E.innerHTML='';E.appendChild(F);setTimeout(()=>{let c=eval(code.match(/comicUrl[^;]+/)[0]);let p=eval(code.match(/prevChapterData[^;]+/)[0]);let n=eval(code.match(/nextChapterData[^;]+/)[0]);gae('.nextC').forEach(e=>{if(n.id>0){e.href=n.uri}else{e.href=c;e.innerHTML=e.innerHTML.replace('下一章','返回目录')}});gae('.prevC').forEach(e=>{e.href=p.uri})},300)",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}.w996,.tbCenter{width:auto!important}"
    },
    {
        "name": "漫画456 - 手機版章節全部展開",
        "example": "https://m.manhua456.com/manhua/zhongniannandeyishijiewanggoushenghuo/",
        "url": "^https?://m\\.manhua456\\.com/manhua/\\w+/$",
        "pinUrl": true,
        "autoClick": "//a[@title='全部展开']"
    },
    {
        "name": "漫画456 - 手機版閱讀",
        "example": "https://m.manhua456.com/manhua/moliwuxiandezuiqiangmonvyongchuangzaomofazaiyishijieyouzaishenghuo/537951.html",
        "url": "^https?://m\\.manhua456\\.com/manhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "$('#images').unbind('click',SinTheme.nextPage);$('#images').unbind('mousedown');let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#images img');if(set){clearInterval(loop);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih = eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=ih+cp+e;F.appendChild(img)});let E=ge('#images');E.innerHTML='';E.appendChild(F)}},200)",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "#images",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih = eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=ih+cp+e;F.appendChild(img)});let E=ge('#images');E.innerHTML='';E.appendChild(F);",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih=eval(code.match(/pageImage[^;]+/)[0]).match(/^https?:\\/\\/[^/]+\\//)[0];let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=ih+cp+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText.trim()",
        "css": "#page-info,#action li:nth-child(2),#action li:nth-child(3),.control_bottom~*:not(.pagetual_tipsWords),.chapter-view~*:not(.pagetual_tipsWords),#loading{display:none!important}#action li{width:50%!important}.chapter-view>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫画456 - PC版閱讀",
        "example": "https://www.manhua456.com/manhua/wodeshifumeidaodaxiancaitupo/766673.html",
        "url": "^https?://www\\.manhua456\\.com/manhua/[a-z]+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#images img');if(set){clearInterval(loop);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih;if(SinConf.resHost1){ih=SinConf.resHost1+'/'}else{ih=SinMH.getResHostDomain()+'/'}let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=ih+cp+e;F.appendChild(img)});let E=ge('#images');E.innerHTML='';E.appendChild(F);let style=document.createElement('style');style.innerHTML='.comic_wraCon>#images:nth-child(1)>img:nth-child('+imgData.length+')~*{display: none!important}';ge('head').appendChild(style)}},200)",
        "nextLink": ".next>a",
        "pageElement": "#images",
        "replaceElement": "head>title,.wrap_last_head,.wrap_last_mid",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih;if(SinConf.resHost1){ih=SinConf.resHost1+'/'}else{ih=SinMH.getResHostDomain()+'/'}let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=ih+cp+e;F.appendChild(img)});let E=ge('#images');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let ih;if(SinConf.resHost1){ih=SinConf.resHost1+'/'}else{ih=SinMH.getResHostDomain()+'/'}let cp=eval(code.match(/chapterPath[^;]+/)[0]);let imgData=eval(code.match(/chapterImages[^;]+/)[0]);let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=ih+cp+e;imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.head_wz');if(t)return t.innerHTML.replace(/.+;/,'')",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span,.block.clearfix{display:none!important}#images>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}body,.autoHeight,.wrap_last_mid .pre,.wrap_last_mid .next,.chapter-view .panel,.mainNav_inner{width:auto!important;min-width:auto!important}"
    },
    {
        "name": "亲亲漫画 - 手機版漫畫在新分頁打開",
        "example": "https://m.acgqd.com/update/",
        "url": "^https?://m\\.acg(u|q)d\\.com/(update|list|list/wanjie)?/?$",
        "pinUrl": true,
        "init": "let openInNewTab=()=>document.querySelectorAll('.itemBox a:not([target=_blank]),.list-comic a:not([target=_blank])').forEach(a=>{a.setAttribute('target','_blank')});openInNewTab();new MutationObserver(()=>{openInNewTab()}).observe(document.body,{childList:true,subtree:true});"
    },
    {
        "name": "亲亲漫画 - 手機版章節全部展開",
        "example": "https://m.acgqd.com/manhua/38496/",
        "url": "^https?://m\\.acg(u|q)d\\.com/manhua/\\d+/$",
        "pinUrl": true,
        "autoClick": "//a[@title='全部展开']",
        "css": "script+a{display:none!important}.Introduct_Sub{background:url(https://m.idmzj.com/images/int_bg.png)!important;background-size:100% 100%!important}"
    },
    {
        "name": "亲亲漫画 - 手機版閱讀",
        "example": "https://m.acgqd.com/manhua/39305/1277010.html",
        "url": "^https?://m\\.acg(u|q)d\\.com/manhua/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);$('.control_bottom').append('<div class=\"side_public scroll-top\"id=\"sidePublic\"style=\"display: block;\"><a href=\"javascript:SinMH.scrollTo(0);\"id=\"returnTop\"class=\"return-top\"></a></div>');let imgs=document.createElement('div');imgs.className='PagetualImgBox';let host=SinConf.resHost[0].domain+'/';let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=host+chapterPath+e;F.appendChild(img)});imgs.appendChild(F);let x=ge('#loading');x.parentNode.insertBefore(imgs,x);ge('a.iconRet').href=comicUrl;let n=ge('#action li:nth-child(4)>a');if(nextChapterData.id==null){n.href=comicUrl;n.innerText='返回目录'}",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextChapterData/)>-1).innerHTML;let next=eval(code.match(/nextChapterData[^;]+/)[0]);if(next.id>0)return next.url",
        "pageElement": "//script[contains(text(),'chapterImages')]",
        "replaceElement": "head>title,.BarTit",
        "insert": "#loading",
        "insertPos": 1,
        "pageInit": "let ge=e=>document.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;let s=document.createElement('script');s.textContent=code;let x=document.querySelector('#loading');x.parentNode.insertBefore(s,x);let cd=eval(code.match(/comicUrl[^;]+/)[0]);let pd=eval(code.match(/prevChapterData[^;]+/)[0]);let nd=eval(code.match(/nextChapterData[^;]+/)[0]);let p=ge('#action li:nth-child(1)>a');let n=ge('#action li:nth-child(4)>a');if(nd.id>0){n.href=nd.uri;n.innerText='下一章'}else{n.href=cd;n.innerText='返回目录'}p.href=pd.uri;",
        "pageAction": "jmzz20191018();let imgs=document.createElement('div');imgs.className='PagetualImgBox';let host=SinConf.resHost[0].domain+'/';let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=host+chapterPath+e;F.appendChild(img)});imgs.appendChild(F);let x=document.querySelector('#loading');x.parentNode.insertBefore(imgs,x);let gae=e=>document.querySelectorAll(e);let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#images~*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText.match(/[^(]+/)[0];",
        "sleep": 1000,
        "css": "#page-info,#action li:nth-child(2),#action li:nth-child(3),.control_bottom~*,.chapter-view~*,#images{display:none!important}#action li{width:50%!important}.chapter-view img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.side_public{opacity:0.4;border-radius: 50%;position:fixed;bottom:60px;right:13px;width:36px;height:35px;display:none;margin-left:20px}.side_public a{border-radius: 50%;display:inline-block;*zoom:1;*display:inline;width:36px;height:36px;border:1px solid #e6e6e6;}.side_public a.return-top{background:#fff url(https://www.acgqd.com/assets/4155373f/images/side_ico.png) no-repeat 2px -81px}"
    },
    {
        "name": "亲亲漫画 - PC版閱讀",
        "example": "http://www.acgud.com/manhua/39305/1277010.html",
        "url": "^https?://www\\.acg(u|q)d\\.com/manhua/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let imgs=document.createElement('div');imgs.className='PagetualImgBox';let host=SinConf.resHost[0].domain+'/';let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=host+chapterPath+e;F.appendChild(img)});imgs.appendChild(F);document.querySelector('.comic_wraCon').appendChild(imgs);",
        "nextLink": "span.next>a",
        "pageElement": "//script[contains(text(),'chapterImages')]",
        "replaceElement": "head>title,.wrap_last_head,.wrap_last_mid,.btmBtnBox",
        "insert": ".comic_wraCon",
        "insertPos": 2,
        "pageInit": "let code = Array.from(doc.scripts).find(s=>s.innerHTML.search(/chapterImages/)>-1).innerHTML;document.querySelector('.comic_wraCon').appendChild(document.createElement('script')).textContent = code;",
        "pageAction": "jmzz20191018();let imgs=document.createElement('div');imgs.className='PagetualImgBox';let host=SinConf.resHost[0].domain+'/';let F=new DocumentFragment();chapterImages.forEach(e=>{let img=new Image();img.src=host+chapterPath+e;F.appendChild(img)});imgs.appendChild(F);document.querySelector('.comic_wraCon').appendChild(imgs);let gae=e=>document.querySelectorAll(e);let ps=gae('.pagetual_pageBar');if(ps.length>4){ps[0].remove();let ds=gae('#images~*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText;",
        "sleep": 1000,
        "css": ".comic_wraCon img{border:none!important;padding:0!important;width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}select,.img_land_prev,.img_land_next,#images{display:none!important}body,.autoHeight,.wrap_last_mid .pre,.wrap_last_mid .next,.chapter-view .panel,.mainNav_inner{width:auto!important;min-width:auto!important}"
    },
    {
        "name": "古风漫画网 / 优酷漫画 / 360 漫画 / 古漫画 / 前未漫画 / 最漫画 / 漫画芯 / 亲亲漫画 / 漫画456 / 爱米推漫画 / 蔷薇漫画 - 分類",
        "example": "www.gufengmh.com，www.ykmh.com，www.qianwee.com，www.100fanwo.com，www.izhegu.com，www.zuimh.com，www.mhxin.com，www.acgud.com，www.manhua456.com，www.imitui.com，www.qwmanhua.com",
        "url": "^https?://www\\.(gufengmh|ykmh|qianwee|100fanwo|izhegu|zuimh|mhxin|acg(u|q)d|manhua456|imitui|qwmanhua)\\.com/",
        "nextLink": "li.next>a",
        "pageElement": "li.item-lg,.list-comic",
        "replaceElement": "ul.pagination",
        "css": ".pagetual_pageBar{margin-top:-30px!important;margin-bottom:10px!important}"
    },
    {
        "name": "动漫啦 - 手機版閱讀",
        "example": "https://m.dongman.la/manhua/chapter/5985/54979/",
        "url": "^https?://m\\.dongman\\.la/manhua/chapter/\\d+/\\d+/",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "wait": 1000,
        "init": "let gae=e=>document.querySelectorAll(e);let _img='';gae('img[data-src]').forEach(e=>{_img+=`<img src='${e.dataset.src}'>`});let loop=setInterval(()=>{let set=gae('.chapter-images img')[0];if(set){clearInterval(loop);gae('.chapter-images')[0].innerHTML=_img}},200)",
        "nextLink": "//a[label[text()='下一章']][starts-with(@href,'http')]",
        "pageElement": ".chapter-images",
        "replaceElement": "//head/title | //a[@class='mdui-typo-title'] | //div[@class='main']/following-sibling::footer[1]//a",
        "pageInit": "let gae=e=>doc.querySelectorAll(e);let _img='';gae('img[data-src]').forEach(e=>{_img+=`<img src='${e.dataset.src}'>`});gae('.chapter-images')[0].innerHTML=_img",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.chapter-images');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.mdui-typo-title');if(t)return t.innerText",
        "css": ".chapter-images>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "动漫啦 - PC版閱讀 - 单页滚动模式 - 雙擊下一章，鍵盤左右鍵上下章",
        "example": "https://www.dongman.la/manhua/chapter/5985/54979/1.html",
        "url": "^https?://www\\.dongman\\.la/manhua/chapter/\\d+/\\d+/",
        "include": "//a[text()='分页查看模式 ']",
        "pinUrl": true,
        "init": "document.querySelectorAll(\"a[href*='m.d']\").forEach(a=>{a.href=a.href.replace('/m.','/www.')});function gx(x){return document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function next(e){let key=window.event?e.keyCode:e.which;if(key==39){let n=gx(\"//a[label[text()='下一章']][starts-with(@href,'http')]\");if(n){n.click()}else{alert('沒有下一章了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){let p=gx(\"//a[label[text()='上一章']][starts-with(@href,'http')]\");if(p){p.click()}else{alert('沒有上一章了！')}}};document.addEventListener('keydown',prev);function dcnext(){let n=gx(\"//a[label[text()='下一章']][starts-with(@href,'http')]\");if(n){n.click()}else{alert('沒有下一章了！')}};document.addEventListener('dblclick',dcnext);",
        "nextLink": "0",
        "manualMode": true,
        "css": ".pagetual_tipsWords{display:none!important}"
    },
    {
        "name": "动漫啦 - PC版閱讀 - 分页查看模式 - 雙擊下一章，鍵盤左右鍵上下章",
        "example": "https://www.dongman.la/manhua/chapter/5985/54979/1.html",
        "url": "^https?://www\\.dongman\\.la/manhua/chapter/\\d+/\\d+/",
        "include": "//a[text()='单页滚动模式 ']",
        "init": "document.querySelectorAll(\"a[href*='m.d']\").forEach(a=>{a.href=a.href.replace(\"/m.\",'/www.')});setTimeout(()=>{let link=document.querySelector('.imgListBox>a');link.removeAttribute('href')},100);function gx(x){return document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function next(e){let key=window.event?e.keyCode:e.which;if(key==39){let n=gx(\"//a[label[text()='下一章']][starts-with(@href,'http')]\");if(n){n.click()}else{alert('沒有下一章了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){let p=gx(\"//a[label[text()='上一章']][starts-with(@href,'http')]\");if(p){p.click()}else{alert('沒有上一章了！')}}};document.addEventListener('keydown',prev);function dcnext(){let n=gx(\"//a[label[text()='下一章']][starts-with(@href,'http')]\");if(n){n.click()}else{alert('沒有下一章了！')}};document.addEventListener('dblclick',dcnext);",
        "nextLink": ".imgListBox>a[href^='http']",
        "pageElement": ".imgListBox img",
        "replaceElement": "button.prePic,button.nextPic",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "a.mdui-btn.mdui-btn-icon,button.prePic,button.nextPic,button.allBtn{display:none!important}.mdui-container{width:100%!important;padding:0px!important}.imgListBox img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto!important}.pagetual_tipsWords{display:none!important}"
    },
    {
        "name": "动漫啦 / 免追漫画 - 分類",
        "example": "https://www.dongman.la/manhua/oumei/2.html，https://www.mianzhui.com/category/list/1",
        "url": "^https?://www\\.(dongman|mianzhui)\\.(la|com)/",
        "include": ".NewPages",
        "pinUrl": true,
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".cy_list_mh",
        "replaceElement": ".NewPages",
        "pageBar": 0
    },
    {
        "name": "七夕漫画",
        "example": "http://www.qiximh2.com/21429/999975.html，http://m.qiximh2.com/22914/1235326.html",
        "url": "^https?://(www|m)\\.qiximh\\d\\.com/\\d+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src;img.removeAttribute('data-src')})",
        "nextLink": "//a[img[@alt='下一章'] and contains(@href,'html')] | //a[p[text()='下一篇'] and contains(@href,'html')]",
        "pageElement": ".main_img",
        "replaceElement": "h1.chaptitle,.imgFloat>p:not(.chappl),head>title,.bottom_menu,.bottom-fix,.bottom-nav,.top_left,.readend",
        "pageBarText": "let t1=doc.querySelector('.chaptitle');let t2=doc.querySelector('.chapter_title');if(t1){return t1.innerText}else if(t2){return t2.innerText}",
        "lazyImgSrc": [
            "data-src",
            "data-src"
        ],
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);if(location.hostname=='www.qiximh2.com'){setTimeout(()=>{let last=ge('.imgFloat>p:nth-child(3)>a:not([href$=html])');if(last){ge('.cy_intro_r.wxfocus').innerHTML='<br><br><br><br><br><br><p>^_^感谢您的阅读，已经沒有下一章了哦！</p><br><p>点击下一章按钮可以返回目录哦！</p><br><br><br>'}},100)};if(location.hostname=='m.qiximh2.com'){let cs=document.querySelectorAll('.main_img');let last=cs.length-1;cs[last].addEventListener('click',()=>{let t=document.querySelector('.top-layout.hide_nav.show_nav');if(t){$('.top-layout.hide_nav').removeClass('show_nav');$('.bottom-layout.hide_footer').removeClass('show_footer')}else{$('.top-layout.hide_nav').addClass('show_nav');$('.bottom-layout.hide_footer').addClass('show_footer')}})};let c=gae('.main_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "css": ".cy_intro_r>img,.cy_intro_r>p:nth-child(3),.logo.lbc{display:none!important}.cy_intro_r{height:30px!important;}"
    },
    {
        "name": "漫画星球手機版 - 閱讀",
        "example": "http://m.mhxqiu2.com/22914/1235326.html",
        "url": "^https?://m\\.mhxqiu\\d\\.com/\\d+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.removeAttribute('data-src')})",
        "nextLink": "//a[i[@class='ift-next']]",
        "pageElement": ".main_img",
        "replaceElement": "head>title,.chapter_title,.bottom-nav,.bottom_menu",
        "pageInit": "doc.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.removeAttribute('data-src')})",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let cs=gae('.main_img');let last=cs.length-1;cs[last].addEventListener('click',()=>{let t=document.querySelector('.nav-box.show_nav');if(t){$('.nav-box').removeClass('show_nav');$('.bottom-box').removeClass('show_footer')}else{$('.nav-box').addClass('show_nav');$('.bottom-box').addClass('show_footer')}});let c=gae('.main_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.chapter_title');if(t)return t.innerText",
        "css": "#adhtml,.pinglunadd-btn{display:none!important}"
    },
    {
        "name": "七夕漫画手機版 / 漫画星球手機版 - 点击加载更多",
        "example": "http://m.qiximh2.com/sort/1-1.html，http://m.mhxqiu2.com/sort/1.html",
        "url": "^https?://m\\.(qiximh\\d|mhxqiu\\d)\\.com/",
        "include": ".list_notdone>button",
        "nextLink": "0",
        "loadMore": ".list_notdone>button"
    },
    {
        "name": "七夕漫画 / 漫画星球 - 分類",
        "example": "http://www.qiximh2.com/sort/1-1.html，http://www.mhxqiu2.com/sort/1-1.html",
        "url": "^https?://www\\.(qiximh\\d|mhxqiu\\d)\\.com/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".cy_list_mh",
        "replaceElement": ".NewPages",
        "css": ".pagetual_pageBar{margin-bottom:0px!important}.pagetual_pageBar+div{margin-top:-20px!important;}"
    },
    {
        "name": "6 漫画手機版 - 閱讀",
        "example": "http://m.6mh66.com/25528/1411234.html",
        "url": "^https?://m\\.6mh66\\.com/\\d+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).slice(12));let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let loop=setInterval(()=>{let set=ge('.main_img img');if(set){clearInterval(loop);let E=ge('.main_img');E.innerHTML='';E.appendChild(F)}},200)",
        "nextLink": ".next>a[href$='html']",
        "pageElement": ".main_img",
        "replaceElement": ".swiper-chapter,head>title,.title>h1,.end-btns",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).slice(12));let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=doc.querySelector('.main_img');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ge=e=>document.querySelector(e);let cs=gae('.main_img');let last=cs.length-1;cs[last].addEventListener('click',()=>{let v=ge('.van-nav-bar:not([style])');let vn=ge('.van-nav-bar[style*=none]');let vb=ge('.van-nav-bar[style*=block]');let b=ge('.reader-footer:not([style])');let bn=ge('.reader-footer[style*=none]');let bb=ge('.reader-footer[style*=flex]');if(v){v.setAttribute('style','display: block;')}if(b){b.setAttribute('style','display: flex;')}if(vn){vn.style.display='block'}else{vb.style.display='none'}if(bn){bn.style.display='flex'}else{bb.style.display='none'}});let c=gae('.main_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgSrcArr=eval(eval(code).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerText",
        "css": "#adhtml{display:none!important}.main_img>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "奇漫屋手機版 - 閱讀",
        "example": "http://qiman59.com/21429/999975.html",
        "url": "^https?://(m\\.)?qiman\\d{2}\\.com/\\d+/\\d+\\.html",
        "include": ".bottom-tool-bar",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).slice(12));let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let loop=setInterval(()=>{let set=ge('.comic-list img');if(set){clearInterval(loop);let E=ge('.comic-list');E.innerHTML='';E.appendChild(F)}},200)",
        "nextLink": ".next>a[href$='html']",
        "pageElement": ".comic-list",
        "replaceElement": "head>title,h1.comic-name,li.prev-chapter,li.next-chapter,.chapter-end,p.read-pos",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgData=eval(eval(code).slice(12));let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=ge('.comic-list');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.comic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML.trim().slice(4);let imgSrcArr=eval(eval(code).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h1.comic-name');if(t)return t.innerText",
        "css": "#adhtml,.guide-download,.read-end~*:not(.pagetual_tipsWords):not(.bottom-tool-bar){display:none!important}.comic-list>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "奇漫屋 / 漫画星球 / 6 漫画 - PC閱讀",
        "example": "http://www.qiman58.com/21429/1416724.html，http://www.mhxqiu2.com/22914/1235326.html，http://www.6mh66.com/22914/1235327.html",
        "url": "^https?://(www\\.qiman5\\d\\.com|www\\.mhxqiu\\d\\.com|www\\.6mh66\\.com)/\\d+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);$('#mainView').removeAttr('style');let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgData=eval(eval(code.trim().slice(4)).slice(12));let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let loop=setInterval(()=>{let set=ge('#comicContain>li');if(set){clearInterval(loop);let E=ge('#comicContain');E.innerHTML='';E.appendChild(F)}},200)",
        "nextLink": "#mainControlNext",
        "pageElement": "#comicContain",
        "replaceElement": "head>title,.main_control,#mainView~a",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgData=eval(eval(code.trim().slice(4)).slice(12));let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=ge('#comicContain');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#comicContain');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgSrcArr=eval(eval(code.trim().slice(4)).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.chaptername_title');if(t)return t.innerText",
        "css": "body.view .logo-sub-wrap,.guide-download{display:none!important}#mainView img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.pagetual_pageBar{margin-top:30px!important;margin-bottom:22px!important}"
    },
    {
        "name": "漫画星球 / 6 漫画 / 奇漫屋 - 手機版分類",
        "example": "m.mhxqiu1.com，m.sixmh7.com，m.qiman57.com",
        "url": "^https?://(m\\.)?((six|6)mh\\d+|mhxqiu\\d|qiman\\d+)\\.com/(sort|rank)/",
        "loadMore": ".getmore,.getmore1",
        "nextLink": "0"
    },
    {
        "name": "57漫画网 - 漫畫閱讀",
        "example": "http://www.wuqimh.com/45107/01.html",
        "url": "^https?://(www|m)\\.wuqimh\\.com/\\d+/\\d+(\\.html|/)$",
        "include": "//script[contains(text(),'images') and contains(text(),'tingliu')]",
        "pinUrl": true,
        "history": 2,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/images/)>-1).innerHTML.match(/eval[^$]+/)[0].trim().slice(4);let data=eval('('+eval(code).replace(/^[^{]+/,'').replace(/;$/,'')+')');let _img='';for(let i=0;i<data.fs.length;i++){_img+=`<img src='${data.fs[i]}'>`};document.querySelector('.cf:not([id])).innerHTML=_img;",
        "nextLink": ".nextC:not([href^='j'])",
        "pageElement": ".cf:not([id])",
        "replaceElement": "head>title,.title>h2,.main-btn,#mangaTitle,#action",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/images/)>-1).innerHTML.match(/eval[^$]+/)[0].trim().slice(4);let data=eval('('+eval(code).replace(/^[^{]+/,'').replace(/;$/,'')+')');let _img='';for(let i=0;i<data.fs.length;i++){_img+=`<img src='${data.fs[i]}'>`};doc.querySelector('.cf:not([id])').innerHTML=_img;",
        "pageAction": "function ge(e){return document.querySelector(e)}setTimeout(()=>{let ph=ge('.prevC').href;let nh=ge('.nextC').href;ge('#pager>.prev').outerHTML=`<a class=\"prev\"href='${ph}'>上一章</a>`;ge('#pager>.next:last-child').outerHTML=`<a class=\"next\"href='${nh}'>下一章</a>`},1000);function gae(e){return document.querySelectorAll(e)};setTimeout(()=>{let c=gae('#subNav~.cf');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}},10000)",
        "pageBarText": 1,
        "css": ".title>*:nth-child(n+5):nth-child(-n+6):not(.cf),.bd_960_90,.main-btn>*:nth-child(n+3):nth-child(-n+5),.help,#pager>*:not(.prev):not(.next:last-child),.bd_960_90+[style]:not(.w996),#action~*:not(#pageNo):not(.pagetual_tipsWords),span.manga-page,#action>ul>li:nth-child(n+2):nth-child(-n+3){display:none!important}.cf>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.action-list li{width:50%!important}body{padding-bottom:0px!important}"
    },
    {
        "name": "x18漫画网 - 漫畫閱讀",
        "example": "https://www.x18mh.com/manhua/60497/996071.html，https://m.x18mh.com/manhua/60497/996071.html",
        "url": "^https?://(www|m)\\.x18mh\\.com/manhua/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=eval(code.match(/qTcms_S_m_murl_e[^;]+/)[0]);let imgData=window.atob(imgBase64).split('$qingtiandy$');let p='/statics/pic/?p=';let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(location.origin.indexOf('/m.')==-1){img.src=p+e}else{img.src=p+e;img.id='qTcms_pic';img.setAttribute('width','100%')}F.appendChild(img)});if(location.origin.indexOf('/m.')==-1){let E=ge('.cf:not([id])');E.innerHTML='';E.appendChild(F)}else{let E=ge('.UnderPage');E.innerHTML='';E.appendChild(F)}",
        "nextLink": "#k_Pic_nextArr[href$='html']",
        "pageElement": ".cf:not([id]),.UnderPage",
        "replaceElement": "head>title,.title>h2,.main-btn,#pager,#m_r_title,#action",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=eval(code.match(/qTcms_S_m_murl_e[^;]+/)[0]);let imgData=window.atob(imgBase64).split('$qingtiandy$');let p='/statics/pic/?p=';let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(location.origin.indexOf('/m.')==-1){img.src=p+e}else{img.src=p+e;img.id='qTcms_pic';img.setAttribute('width','100%')}F.appendChild(img)});if(location.origin.indexOf('/m.')==-1){let E=ge('.cf:not([id])');E.innerHTML='';E.appendChild(F)}else{let E=ge('.UnderPage');E.innerHTML='';E.appendChild(F)}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let cf=gae('#subNav~.cf');if(cf.length>10){cf[0].remove()}let c=gae('.UnderPage');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t1=doc.querySelector('h2');let t2=doc.querySelector('.BarTit');if(t1){return t1.innerText}else if(t2){return t2.innerText.match(/[^(]+/)[0].trim()}",
        "css": "#subNav,#prev,#k_next,#k_pageSelect,#pager,.title.pr>em:nth-child(5),.title.pr>span,.control_bottom+.img_001{display:none!important}.cf>img,.UnderPage>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}#action>ul>li:nth-child(n+2):nth-child(-n+3){display:none!important}.action-list li{width:50%!important}"
    },
    {
        "name": "爱漫之家 - 漫畫閱讀",
        "example": "http://www.17fuman.com/rszimukaitou/34599/171775.html，http://m.17fuman.com/rszimukaitou/34669/172185.html，http://m.fumanhua44.com/rszimukaitou/34761/172779.html",
        "url": "^https?://(www|m\\d?)\\.(17fuman|fumanhua-?\\d+)\\.com/[a-z]+/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/var qTcms_S_m_murl_e=\"([^\"]+)/)[1];let imgData=base64_decode(imgBase64).split('$qingtiandy$');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(location.origin.indexOf('/m.')==-1){img.src=e}else{img.src=qTcms_m_weburl+e;img.id='qTcms_pic';img.setAttribute('width','100%')}F.appendChild(img)});let E=ge('#qTcms_pic').parentNode;E.innerHTML='';E.appendChild(F);",
        "nextLink": "#k_Pic_nextArr[href$='html']",
        "pageElement": ".cf:not([id]),.UnderPage",
        "replaceElement": "head>title,.title>h2,.main-btn,#pager,#m_r_title,#action",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/var qTcms_S_m_murl_e=\"([^\"]+)/)[1];let imgData=base64_decode(imgBase64).split('$qingtiandy$');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(location.origin.indexOf('/m.')==-1){img.src=e}else{img.src=qTcms_m_weburl+e;img.id='qTcms_pic';img.setAttribute('width','100%')}F.appendChild(img)});let E=ge('#qTcms_pic').parentNode;E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);if(location.origin.indexOf('/m.')==-1){let cf=gae('.cf:not([id])');if(cf.length>10){cf[0].remove()}}else{let c=gae('.UnderPage');if(c.length>10){c[0].remove()}}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/var qTcms_S_m_murl_e=\"([^\"]+)/)[1];let imgData=base64_decode(imgBase64).split('$qingtiandy$');let imgSrcArr=[];imgData.forEach(e=>{let imgSrc;if(location.origin.indexOf('/m.')==-1){imgSrc=e}else{imgSrc=qTcms_m_weburl+e}imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t1=doc.querySelector('h2');let t2=doc.querySelector('.BarTit');if(t1){return t1.innerText}else if(t2){return t2.innerText.match(/[^(]+/)[0].trim()}",
        "css": "#subNav,#prev,#k_next,#k_pageSelect,#pager,.title.pr>em:nth-child(5),.title.pr>span,#bd1,.globalPadding{display:none!important}.cf>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}#action>ul>li:nth-child(n+2):nth-child(-n+3){display:none!important}.action-list li{width:50%!important}"
    },
    {
        "name": "73漫画 - 閱讀",
        "example": "http://www.73mh.net/mh/63788_1633109/1",
        "url": "^https?://www\\.73mh\\.net/mh/\\w+/\\d+",
        "pinUrl": true,
        "history": 2,
        "init": "document.querySelectorAll('section .v_con_box>p').forEach(e=>{e.outerHTML=e.innerHTML})",
        "nextLink": "//a[text()='下一话']",
        "pageElement": "//div[@class='v_con_box'][p/img] | //div[@class='v_con_box'][img]",
        "replaceElement": "head>title,.v-page",
        "pageInit": "doc.querySelectorAll('section .v_con_box>p').forEach(e=>{e.outerHTML=e.innerHTML})",
        "pageAction": "function gax(x){let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes}let gae=e=>document.querySelectorAll(e);let c=gae(\"//div[@class='v_con_box'][img]\");if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.v-page>span');if(t)return t.innerText",
        "css": ".v_con_box>img{margin-bottom:-6px!important}.icon>.container{padding-right:0px!important;padding-left:0px!important}"
    },
    {
        "name": "漫画160 - 手機版閱讀",
        "example": "https://m.mh160.cc/kanmanhua/yuanlaiwoshixianjiezhizun/1689580801.html",
        "url": "^https?://m\\.mh160\\.cc/kanmanhua/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/qTcms_S_m_murl_e=([^;]+)/)[1].replaceAll('\"','');let imgData=base64_decode(imgBase64).split('$qingtiandy$');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=f_qTcms_Pic_curUrl_realpic(e);F.appendChild(img)});let E=document.querySelector('#commicBox');E.innerHTML='';E.appendChild(F);",
        "nextLink": "#k_Pic_nextArr[href$='html']",
        "pageElement": "#commicBox",
        "replaceElement": ".BarTit,#action",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/qTcms_S_m_murl_e=([^;]+)/)[1].replaceAll('\"','');let imgData=base64_decode(imgBase64).split('$qingtiandy$');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=f_qTcms_Pic_curUrl_realpic(e);F.appendChild(img)});let E=doc.querySelector('#commicBox');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#commicBox');if(c.length>10){c[0].parentNode.remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/qTcms_S_m_murl_e=([^;]+)/)[1].replaceAll('\"','');let imgData=base64_decode(imgBase64).split('$qingtiandy$');let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=f_qTcms_Pic_curUrl_realpic(e);imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText.match(/[^\\(]+/)[0].trim()",
        "css": "#commicBox>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}.action-list li{width:50%!important}#action>ul>li:nth-child(n+2):nth-child(-n+3){display:none!important}"
    },
    {
        "name": "733 动漫 - 手機版漫畫閱讀",
        "example": "https://m.733.so/mh/54709/1353912/1.html",
        "url": "^https?://m\\.733\\.so/mh/\\d+/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let imgs = Array.from(document.scripts).find(s => s.innerHTML.search(/temp_pic_all/) > -1).innerHTML.slice(18, -1).replace(/<\\/?p>/g,'');document.querySelector('#pic_box').innerHTML = imgs;",
        "nextLink": "//a[text()='下一话']",
        "pageElement": "#pic_box",
        "replaceElement": "head>title,.v-page",
        "pageInit": "let imgs = Array.from(doc.scripts).find(s => s.innerHTML.search(/temp_pic_all/) > -1).innerHTML.slice(18, -1).replace(/<\\/?p>/g,'');doc.querySelector('#pic_box').innerHTML = imgs;",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#pic_box');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let imgs=Array.from(doc.scripts).find(s=>s.innerHTML.search(/temp_pic_all/)>-1).innerHTML.slice(18);let html=new DOMParser().parseFromString(imgs,'text/html');let imgData=html.querySelectorAll('img');let imgSrcArr=[];imgData.forEach(e=>{imgSrcArr.push(e.src)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.v-page>span');if(t)return t.innerText",
        "css": "#pic_box img{margin-bottom:-6px!important}.icon>.container{padding-right:0px!important;padding-left:0px!important}"
    },
    {
        "name": "733 动漫 / 73漫画 - 手機版分類",
        "example": "https://m.733.so/all/all/all/all/0/1.html，http://www.73mh.net/neidi/",
        "url": "^https?://(m\\.733\\.so|www\\.73mh\\.net)/",
        "exclude": [
            "#pic_box",
            "//div[@class='v_con_box'][p/img]"
        ],
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".tv-list",
        "replaceElement": ".v-page",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "733 动漫 / 漫画160 - PC版閱讀",
        "example": "https://www.733.so/mh/33671/614269.html，https://www.mh160.cc/kanmanhua/tianqiyubao/1668716868.html",
        "url": "^https?://www\\.(733|mh160)\\.(so|cc)/(mh|kanmanhua)/\\w+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/qTcms_S_m_murl_e=([^;]+)/)[1].replaceAll('\"','');let imgData=base64_decode(imgBase64).split('$qingtiandy$');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=f_qTcms_Pic_curUrl_realpic(e);F.appendChild(img)});let E=document.querySelector('#qTcms_Pic_middle').parentNode;E.innerHTML='';E.appendChild(F);",
        "nextLink": "#k_Pic_nextArr[href$='html']",
        "pageElement": ".cf:not([id])",
        "replaceElement": "head>title,.title>h2,.main-btn,#pager",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/qTcms_S_m_murl_e=([^;]+)/)[1].replaceAll('\"','');let imgData=base64_decode(imgBase64).split('$qingtiandy$');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=f_qTcms_Pic_curUrl_realpic(e);F.appendChild(img)});let E=doc.querySelector('#qTcms_Pic_middle').parentNode;E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.cf:not([id])');if(c.length>10){c[0].parentNode.remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/qTcms_S_m_murl_e/)>-1).innerHTML;let imgBase64=code.match(/qTcms_S_m_murl_e=([^;]+)/)[1].replaceAll('\"','');let imgData=base64_decode(imgBase64).split('$qingtiandy$');let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=f_qTcms_Pic_curUrl_realpic(e);imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": "#subNav,#prev,#k_next,#k_pageSelect,#pager,.title.pr>em:nth-child(5),.title.pr>span{display:none!important}.cf>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫画星球 / 6 漫画 / 733 动漫 /  爱漫之家 / x18漫画网 / 57漫画网 / 奇漫屋 / 漫画160 - 分類",
        "example": "www.mhxqiu1.com，www.sixmh7.com，www.733.so，www.17fuman.com，https://www.x18mh.com/，http://www.wuqimh.com/list/，http://www.qiman58.com/，www.mh160.cc",
        "url": "^https?://(www|m)\\.((six|6)mh\\d+|mhxqiu\\d|733|17fuman|x18mh|wuqimh|qiman58|mh160)\\.(com|so|cc)/",
        "nextLink": "//a[text()='下一页'] | //li[a[@class='active']]/following-sibling::li[1]/a",
        "pageElement": ".cy_list_r,.grid-row.clearfix,#dmList,#contList,[class^='bookList'],.mh-search-list",
        "replaceElement": ".NewPages,.pager,.page_moreDiv",
        "css": ".pagetual_pageBar{margin-top:0px!important;margin-bottom:0px!important}.mh-search-list+.pagetual_pageBar{display:none!important}"
    },
    {
        "name": "木马漫画 - 閱讀",
        "example": "https://www.omyschool.com/article_detail/19057/672194/%E7%A5%9E%E6%98%8E%E5%AD%B8%E6%A0%A1%E7%9A%84%E5%B7%AE%E7%AD%89%E7%94%9F/01%E8%A9%B1/",
        "url": "^https?://www\\.omyschool\\.com/article_detail/\\d+/\\d+/",
        "history": 2,
        "init": "const gax=xpath=>{let nodes=[];let results=document.evaluate(xpath,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes};setTimeout(()=>{[...gax('//div[span[@style]]')].forEach(e=>{e.remove()})},0)",
        "nextLink": ".nav_button.next",
        "pageElement": "//div[amp-img]",
        "pageBarText": "return doc.querySelector('.uk-breadcrumb').innerText.trim().slice(2).trim()",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let arr=[];[...doc.querySelectorAll('#imgs amp-img')].forEach(e=>{arr.push(e.getAttribute('src'))});return arr",
        "css": "#col_right{display:none!important}"
    },
    {
        "name": "木马漫画 - 分類",
        "example": "https://www.omyschool.com/rank/update/",
        "url": "^https?://www\\.omyschool\\.com/",
        "nextLink": "a.next",
        "pageElement": "#book_list>.item",
        "replaceElement": ".uk-pagination",
        "pageBar": 0
    },
    {
        "name": "动漫之家 - 手機版 - 漫畫在新分頁打開",
        "example": "https://m.idmzj.com/",
        "url": "^https?://m\\.i?dmzj\\.com/",
        "exclude": [
            "div[id^='charpet']",
            "#list"
        ],
        "init": "let openInNewTab=()=>document.querySelectorAll('.main_image a[href]:not([target=_blank]),.imgBox a[href]:not([target=_blank]),.UpdateList a[href]:not([target=_blank]),.topicList a[href]:not([target=_blank])').forEach(a=>{a.setAttribute('target','_blank')});openInNewTab();new MutationObserver(()=>{openInNewTab()}).observe(document.body,{childList:true,subtree:true});"
    },
    {
        "name": "动漫之家手機版 - 閱讀",
        "example": "https://m.idmzj.com/view/60351/119828.html",
        "url": "^https?://m\\.i?dmzj\\.com/view/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);ge('.iconRet').setAttribute('onclick','goBack();');gae('.letchepter>a[onclick]').forEach(a=>{a.removeAttribute('onclick')});let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/comic_id/)>-1).innerHTML.replaceAll('\"','');let n=code.search(/next_chap/);let p=code.search(/prev_chap/);let cm=code.match(/comic_id:(\\d+)/)[1];if(n>-1){let nm=code.match(/next_chap_id:(\\d+)/)[1];let url='/view/'+cm+'/'+nm+'.html';ge('.afterChapter').href=url}else{ge('.afterChapter').href=ge('.ChapterLestMune').href}if(p>-1){let pm=code.match(/prev_chap_id:(\\d+)/)[1];let url='/view/'+cm+'/'+pm+'.html';ge('.beforeChapter').href=url}else{ge('.beforeChapter').href=ge('.ChapterLestMune').href}",
        "nextLinkByJs": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/comic_id/)>-1).innerHTML.replaceAll('\"','');let n=code.search(/next_chap/);if(n>-1){let cm=code.match(/comic_id:(\\d+)/)[1];let nm=code.match(/next_chap_id:(\\d+)/)[1];return location.origin+'/view/'+cm+'/'+nm+'.html'}",
        "pageElement": "div[id^='charpet']",
        "replaceElement": "head>title,a.BarTit,.botNav .tc",
        "pageInit": "let ge=e=>doc.querySelector(e);let gae=e=>doc.querySelectorAll(e);ge('.iconRet').setAttribute('onclick','goBack();');gae('.letchepter>a[onclick]').forEach(a=>{a.removeAttribute('onclick')});let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/comic_id/)>-1).innerHTML.replaceAll('\"','');let n=code.search(/next_chap/);let p=code.search(/prev_chap/);let cm=code.match(/comic_id:(\\d+)/)[1];if(n>-1){let nm=code.match(/next_chap_id:(\\d+)/)[1];let url='/view/'+cm+'/'+nm+'.html';ge('.afterChapter').href=url}else{ge('.afterChapter').href=ge('.ChapterLestMune').href}if(p>-1){let pm=code.match(/prev_chap_id:(\\d+)/)[1];let url='/view/'+cm+'/'+pm+'.html';ge('.beforeChapter').href=url}else{ge('.beforeChapter').href=ge('.ChapterLestMune').href}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('div[id^=charpet]');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/initData/)>-1).innerHTML;let imgSrcArr=eval(code.match(/page_url.+(\\[.+\\])/)[1]);return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.BarTit');if(t)return t.innerText",
        "css": "#commicBox img{opacity:1!important}#m_r_panelbox,#khdDown,#divAD,.appTil{display:none!important}"
    },
    {
        "name": "动漫之家2 - 閱讀",
        "example": "https://www.idmzj.com/view/siwangleyuan/75382.html",
        "url": "^https?://www\\.i?dmzj\\.com/view/",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "waitElement": [
            ".btmBtnBox"
        ],
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/arr_img/)>-1).innerHTML.slice(71,-1);let Data=eval('('+eval(code).slice(11,-2)+')');let imgData=Data.page_url.split('\\r\\n');let host='https://images.idmzj.com/';let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=host+decodeURI(e).replace(/amp;/g,'');F.appendChild(img)});let E=document.querySelector('.comic_wraCon');E.innerHTML='';E.appendChild(F);",
        "nextLink": "span.next>a",
        "pageElement": ".comic_wraCon",
        "replaceElement": "head>title,.wrap_last_head,.wrap_last_mid,.btmBtnBox",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/arr_img/)>-1).innerHTML.slice(71,-1);let Data=eval('('+eval(code).slice(11,-2)+')');let imgData=Data.page_url.split('\\r\\n');let host='https://images.idmzj.com/';let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=host+decodeURI(e).replace(/amp;/g,'');F.appendChild(img)});let E=doc.querySelector('.comic_wraCon');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.comic_wraCon');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/arr_img/)>-1).innerHTML.slice(71,-1);let Data=eval('('+eval(code).slice(11,-2)+')');let imgData=Data.page_url.split('\\r\\n');let host='https://images.idmzj.com/';let imgSrcArr=[];imgData.forEach(e=>{let imgSrc=host+decodeURI(e).replace(/amp;/g,'');imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h2');if(t)return t.innerText",
        "css": ".nav-pagination,.img_land_prev,.img_land_next,#page_select,.img_info,.title.pr>em:nth-child(5),.title.pr>span,.user_show,.login_tip.out,#floatCode,.ad_bottom_code,script[src]+[style*=both]{display:none!important}.comic_wraCon>img{max-width: 100% !important;display: block !important;margin: 0 auto -2px auto !important;border:0px!important;padding:0px!important;}body,.autoHeight,.wrap_last_mid .pre,.wrap_last_mid .next,.chapter-view .panel,.mainNav_inner{width:auto!important;min-width:auto!important}.head_wz,.foot-detail-wrap{width:auto!important}"
    },
    {
        "name": "动漫之家2 - 分類",
        "example": "https://www.idmzj.com/update/",
        "url": "^https?://www\\.i?dmzj\\.com/(update|category|rank)",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".list_con_li,.ph_r_con_li",
        "replaceElement": ".top_page.page,.bottom_page.page",
        "css": ".wrap_list,.wrap_mhlist .wrap_mhlist_l,.wrap_mhlist .wrap_mhlist_r{height:auto!important}.pagetual_pageBar{margin-top:-10px!important;margin-bottom:0px!important}.ph_r_con_li+.pagetual_pageBar{display:none!important}"
    },
    {
        "name": "动漫之家 - 閱讀",
        "example": "https://manhua.idmzj.com/shenghuomosgushimentiaozhanmigong/118093.shtml",
        "url": "^https?://manhua\\.i?dmzj\\.com/[a-z]+/\\d+\\.shtml",
        "pinUrl": true,
        "autoClick": "//a[@id='qiehuan_txt' and text()='切换到上下滚动阅读']",
        "history": 2,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let F=new DocumentFragment();eval(pages).forEach(e=>{let img=new Image();img.src='//images.idmzj.com/'+decodeURI(e);F.appendChild(img)});let loop=setInterval(()=>{let set=ge('#center_box img');if(set){clearInterval(loop);let E=ge('#center_box');E.innerHTML='';E.appendChild(F)}},100)",
        "nextLink": "a.fr",
        "pageElement": "#center_box",
        "replaceElement": "head>title,.display_graybg,.btmBtnBox",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML;let imgs=eval(code.match(/eval.+\\)\\)/)[0].slice(4));let imgsArr=eval(imgs.match(/\\[.+\\]/)[0]);let F=new DocumentFragment();imgsArr.forEach(e=>{let img=new Image();img.src='//images.idmzj.com/'+decodeURI(e);F.appendChild(img)});let E=ge('#center_box');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#center_box');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/eval/)>-1).innerHTML;let imgs=eval(code.match(/eval.+\\)\\)/)[0].slice(4));let imgsArr=eval(imgs.match(/\\[.+\\]/)[0]);let imgSrcArr=[];imgsArr.forEach(e=>{let imgSrc='//images.dmzj.com/'+decodeURI(e);imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('span.redhotl');if(t)return t.innerText",
        "css": "#center_box img{opacity:1!important;width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important;border: none!important;padding: 0px!important;}"
    },
    {
        "name": "动漫之家 - 分類",
        "example": "https://manhua.idmzj.com/update_1.shtml",
        "url": "^https?://manhua\\.i?dmzj\\.com/",
        "action": 1,
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".newpic_bg,.newpic_bgno,.tcaricature_block.tcaricature_block2",
        "replaceElement": ".pages",
        "css": ".pagetual_pageBar{margin:20px 5px 0!important}.newpic_bgno,.tcaricature_block+.pagetual_pageBar{margin-top:5px!important}.pagetual_pageBar+.tcaricature_block{margin-top:0px!important}"
    },
    {
        "name": "漫画猫 - 閱讀",
        "example": "https://www.maofly.com/manga/39027/515484.html",
        "url": "^https?://www\\.maofly\\.com/manga/",
        "pinUrl": true,
        "history": 2,
        "init": "let vgrdata=document.querySelector('.vg-r-data');let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/img_data/)>-1).innerHTML;let Base64=eval(code.match(/img_data = \".+\"/g)[0]);let imgData=LZString.decompressFromBase64(Base64).split(',');let imgPre='/uploads/';let assetDomain=vgrdata.getAttribute('data-chapter-domain');let assetKey=vgrdata.getAttribute('data-chapter-key');let _img='';for(let i=0;i<imgData.length;i++){let imgSrc=assetDomain+imgPre+imgData[i];_img+=`<img class=\"img-fluid show-pic\"src='${imgSrc}'>`};document.querySelector('.img-content').innerHTML=_img;",
        "nextLinkByJs": "let vgrdata=doc.querySelector('.vg-r-data');let num=vgrdata.getAttribute('data-chapter_num');let type=vgrdata.getAttribute('data-chapter-type');let n=1;let json='/chapter_num?chapter_id='+num+'&ctype='+n+'&type='+type;return fetch(json).then((response)=>{return response.json()}).then((json)=>{if(json.code!='0000'){return null}else{return json.url}}).then((res)=>{return res});",
        "pageElement": ".img-content",
        "replaceElement": "head>title,.breadcrumb-item.active,.h4.text-center",
        "pageInit": "let vgrdata=doc.querySelector('.vg-r-data');let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/img_data/)>-1).innerHTML;let Base64=eval(code.match(/img_data = \".+\"/g)[0]);let imgData=LZString.decompressFromBase64(Base64).split(',');let imgPre='/uploads/';let assetDomain=vgrdata.getAttribute('data-chapter-domain');let assetKey=vgrdata.getAttribute('data-chapter-key');let _img='';for(let i=0;i<imgData.length;i++){let imgSrc=assetDomain+imgPre+imgData[i];_img+=`<img class=\"img-fluid show-pic\"src='${imgSrc}'>`};doc.querySelector('.img-content').innerHTML=_img;",
        "pageAction": "function gae(e){return document.querySelectorAll(e)};setTimeout(()=>{let c=gae('.img-content');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}},10000)",
        "pageBarText": 1,
        "css": "a[onclick],a[href*='false']{display:none!important}.img-content>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫画猫 - 分類",
        "example": "https://www.maofly.com/update.html",
        "url": "^https?://www\\.maofly\\.com/(update|list)",
        "nextLink": "//a[text()=' 下一页']",
        "pageElement": "//div[(div/a/img) and @class='row m-0'] | //div[(a/img) and contains(@class,'media')] | //div[(a/img) and contains(@class,'media')]/following-sibling::hr[1]",
        "replaceElement": ".pagination",
        "css": ".row+.pagetual_pageBar{margin-top:-1px!important;margin-bottom:15px!important}hr+.pagetual_pageBar{display:none!important}"
    },
    {
        "name": "漫画DB - 閱讀",
        "example": "https://www.manhuadb.com/manhua/1167/1315_13028.html",
        "url": "^https?://www\\.manhuadb\\.com/manhua/\\d+/\\w+\\.html",
        "pinUrl": true,
        "history": 2,
        "init": "let code=Array.from(document.scripts).find(s=>s.innerHTML.search(/img_data/)>-1).innerHTML;let Base64=eval(code.replace('var',''));let imgData=eval(atob(Base64));let vgrdata=document.querySelector('.vg-r-data');let imgHost=vgrdata.getAttribute('data-host');let imgPre=vgrdata.getAttribute('data-img_pre');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.className='img-fluid show-pic';if(is_webp!=1&&e.img_webp){img.src=imgHost+imgPre+e.img_webp}else{img.src=imgHost+imgPre+e.img}F.appendChild(img)});let E=document.querySelector('#all');E.innerHTML='';E.appendChild(F);",
        "nextLinkByJs": "return new Promise((resolve)=>{let v=doc.querySelector('.vg-r-data');let n=v.dataset.num;$.ajax({type:'post',url:'/book/goNumPage',data:{ccid:v.dataset.ccid,id:v.dataset.id,num:parseInt(n)+1,d:v.dataset.d,type:'next'},dataType:'json',success:function(json){if(json.state==0){resolve(null)}else{let url=json.url;resolve(location.origin+url)}}})}).then((res)=>{return res});",
        "pageElement": "#all",
        "replaceElement": "head>title,.h4.text-center,ol.breadcrumb",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/img_data/)>-1).innerHTML;let Base64=eval(code.replace('var',''));let imgData=eval(atob(Base64));let vgrdata=doc.querySelector('.vg-r-data');let imgHost=vgrdata.getAttribute('data-host');let imgPre=vgrdata.getAttribute('data-img_pre');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.className='img-fluid show-pic';if(is_webp!=1&&e.img_webp){img.src=imgHost+imgPre+e.img_webp}else{img.src=imgHost+imgPre+e.img}F.appendChild(img)});let E=doc.querySelector('#all');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#all');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/img_data/)>-1).innerHTML;let Base64=eval(code.replace('var',''));let imgData=eval(atob(Base64));let vgrdata=doc.querySelector('.vg-r-data');let imgHost=vgrdata.getAttribute('data-host');let imgPre=vgrdata.getAttribute('data-img_pre');let imgSrcArr=[];imgData.forEach(e=>{let imgSrc;if(is_webp!=1&&e.img_webp){imgSrc=imgHost+imgPre+e.img_webp}else{imgSrc=imgHost+imgPre+e.img}imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.h4.text-center');if(t)return t.innerText",
        "css": "nav.d-none+div.row,#left,#right,.pagination .form-inline>*:nth-child(n+2):nth-child(-n+4){display:none!important}.row>*{padding:0px!important}#all,img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫画DB - 分類",
        "example": "https://www.manhuadb.com/manhua/list-r-4-a-4-c-12.html",
        "url": "^https?://www\\.manhuadb\\.com/manhua/list",
        "nextLink": "a[title='下一页']",
        "pageElement": ".comic-main-section>*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "快岸漫画 - 閱讀",
        "example": "https://www.kanbook.net/comic/1661/1/1",
        "url": "^https?://(www\\.)?kanbook\\.net/",
        "include": "nav+.container-fluid+.container-fluid",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let str=`var imagesObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){let realSrc=entry.target.dataset.src,nE=entry.target.nextElementSibling;if(realSrc){entry.target.src=realSrc;}if(nE&&nE.tagName=='IMG'&&nE.dataset.src){nE.src=nE.dataset.src;}}})});var loading_bak='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAAAAACbDccAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cDDhUEC4m58W4AAAABb3JOVAHPoneaAAAF+UlEQVR42u3SQQkAMAzAwPo3MatVEQblTkEemQeB+R3ATcYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBLGImEsEsYiYSwSxiJhLBILoeSc6MiLXg0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDMtMTRUMjE6MDM6NDcrMDA6MDBTB1yAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAzLTE0VDIxOjAzOjQ3KzAwOjAwIlrkPAAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMy0xNFQyMTowNDoxMSswMDowMLyj5cQAAAAASUVORK5CYII=';var addGlobalscript=code=>{let script=document.createElement('script');script.type='text/javascript';script.innerHTML=code;document.body.appendChild(script)}`;let script=document.createElement('script');script.type='text/javascript';script.innerHTML=str;ge('body').appendChild(script);setTimeout(()=>{let imgData=[];if(is_refresh==0){for(let i=0;i<pageNum;i++){imgData.push(Gm.getImgUrl(comic_id+'/'+version_id+'/'+part_id+'/'+my_sha2(x_tokens[i])))}}else{for(let i=0;i<data.url.length;i++){imgData.push(Gm.getImgUrl(data.url[i]))}}let F=new DocumentFragment();for(let i=0;i<imgData.length;i++){let img=new Image();img.src=loading_bak;img.dataset.src=imgData[i];imagesObserver.observe(img);F.appendChild(img)}let E=ge('nav+.container-fluid+.container-fluid');E.innerHTML='';E.appendChild(F)},1000)",
        "nextLink": "//a[text()='下一章' and not(starts-with(@href,'javascript'))]",
        "pageElement": "//script[contains(text(),'x_tokens')]",
        "insert": "nav+.container-fluid+.container-fluid",
        "insertPos": 2,
        "replaceElement": ".paginationContent",
        "pageInit": "let code1=Array.from(doc.scripts).find(s=>s.innerHTML.search(/comic_id/)>-1).innerHTML;addGlobalscript(code1);let code2=Array.from(doc.scripts).find(s=>s.innerHTML.search(/x_tokens/)>-1).innerHTML;addGlobalscript(code2);",
        "pageAction": "let ge=e=>document.querySelector(e);let imgData=[];if(is_refresh==0){for(let i=0;i<pageNum;i++){imgData.push(Gm.getImgUrl(comic_id+'/'+version_id+'/'+part_id+'/'+my_sha2(x_tokens[i])))}}else{for(let i=0;i<data.url.length;i++){imgData.push(Gm.getImgUrl(data.url[i]))}}let F=new DocumentFragment();for(let i=0;i<imgData.length;i++){let img=new Image();img.src=loading_bak;img.dataset.src=imgData[i];imagesObserver.observe(img);F.appendChild(img)}let E=ge('nav+.container-fluid+.container-fluid');E.appendChild(F);let gae=e=>document.querySelectorAll(e);let titles=gae('.pagetual_pageBar');if(titles.length>9){titles[0].remove();let removes=gae('nav+.container-fluid+.container-fluid>*');for(let i in removes){if(/pagetual_pageBar/.test(removes[i].className)){break}removes[i].remove()}}",
        "sleep": 1000,
        "pageBarText": "let t=doc.querySelector('div.justify-content-center.mt-3.mt-md-4.text-left.view-title.one-line>span:nth-child(5)');if(t)return t.innerText",
        "css": "nav+.container-fluid+.container-fluid>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}h2~span:not(.h4),.ppre,.pnext,#page-selector,.pagination>a:nth-child(1)~*:not(.next_part){display:none!important}.container-fluid{max-width:1000px}"
    },
    {
        "name": "快岸漫画 - 分類",
        "example": "https://www.kanbook.net/list-r-1",
        "url": "^https?://www\\.kanbook\\.net/(update|list|rank|news)",
        "nextLink": "//a[@title='下一页' or @title='下一頁']",
        "pageElement": "//div[div/div/a/img[starts-with(@class,'comic-book-cover')]] | //div[div/div/div/div/a/img][starts-with(@class,'comic-main-section')] | //ul[li/div/a/img][starts-with(@class,'top10-list')] | //ul[@class='list-body'] | //div[div/div[starts-with(@class,'comicbook-index')]]",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "動漫戲說 - 漫畫閱讀",
        "example": "https://comic.acgn.cc/view-202.htm",
        "url": "^https?://comic\\.acgn\\.cc/view-",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let c=ge('.tbCenter>tbody').cloneNode(true);ge('.tbCenter').appendChild(c);let F=new DocumentFragment();document.querySelectorAll('.pic[_src][id]').forEach(e=>{let img=new Image();img.src=e.getAttribute('_src');F.appendChild(img)});let E=ge('#pic_list');E.innerHTML='';E.appendChild(F);",
        "nextLink": "#next_chapter",
        "pageElement": "#pic_list",
        "replaceElement": "#top,#breadcrumb,[class^='display_'],head>title",
        "pageInit": "let F=new DocumentFragment();doc.querySelectorAll('.pic[_src][id]').forEach(e=>{let img=new Image();img.src=e.getAttribute('_src');F.appendChild(img)});let E=doc.querySelector('#pic_list');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#pic_list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}setTimeout(()=>{let ge=e=>document.querySelector(e);ge('.tbCenter>tbody:last-child').outerHTML=ge('.tbCenter>tbody').outerHTML},200)",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let imgSrcArr=[];doc.querySelectorAll('.pic[_src][id]').forEach(e=>{let imgSrc=e.getAttribute('_src');imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerText",
        "css": ".btn_wrap,#ss-toolbar{display:none!important}#pic_list>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "動漫戲說 - 分類",
        "example": "https://comic.acgn.cc/cate-1.htm",
        "url": "^https?://comic\\.acgn\\.cc/",
        "nextLink": "a[rel='next']",
        "pageElement": "ul#display",
        "replaceElement": "#pagination",
        "css": ".pagetual_pageBar{margin-bottom:0px!important}"
    },
    {
        "name": "新新漫画 - 閱讀 - 沒有顯示圖片時需要換服務器",
        "example": "https://www.77mh.xyz/202102/481169.html，http://m.77mh.xyz/202102/481169.html",
        "url": "^https?://(www|m)\\.77mh\\.[a-z]{2,3}/\\d+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "wait": 1000,
        "init": "let ge=e=>document.querySelector(e);setTimeout(()=>{let code=eval(Array.from(document.scripts).find(s=>s.innerHTML.search(/msg/)>-1).innerHTML.trim().slice(4));let imgData=eval(code.match(/msg[^;]+/)[0]).split('|');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(location.hostname.indexOf('m.77mh')!=-1){img.src=ImgSvrList+e}else{img.src=img_qianz+e}F.appendChild(img)});if(location.hostname.indexOf('m.77mh')!=-1){let E=ge('.mg-co');E.innerHTML='';E.appendChild(F)}else{let E=ge('#comicImg');E.innerHTML='';E.appendChild(F)}},1000)",
        "nextLinkByJs": "let code=eval(Array.from(doc.scripts).find(s=>s.innerHTML.search(/nextLink_b/)>-1).innerHTML.trim().slice(4));let next=eval(code.match(/nextLink_b[^;]+/)[0]);if(next.indexOf('html')!=-1)return location.origin+next",
        "pageElement": "#comicImg,.mg-co",
        "replaceElement": "head>title,#subTitle>h1,#pnpage,.page_num,.nav.nav-back",
        "pageInit": "let ge=e=>doc.querySelector(e);let code=eval(Array.from(doc.scripts).find(s=>s.innerHTML.search(/msg/)>-1).innerHTML.trim().slice(4));let imgData=eval(code.match(/msg[^;]+/)[0]).split('|');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();if(location.hostname.indexOf('m.77mh')!=-1){img.src=ImgSvrList+e}else{img.src=img_qianz+e}F.appendChild(img)});if(location.hostname.indexOf('m.77mh')!=-1){let E=ge('.mg-co');E.innerHTML='';E.appendChild(F)}else{let E=ge('#comicImg');E.innerHTML='';E.appendChild(F)}",
        "pageAction": "let gae=e=>document.querySelectorAll(e);if(location.hostname.indexOf('m.77mh')!=-1){let m=gae('.mg-co');if(m.length>10){gae('.mg-co')[0].remove()}}else{let c=gae('#comicImg');if(c.length>10){gae('#comicImg')[0].remove()}}let p=gae('.pagetual_pageBar');if(p.length>10){gae('.pagetual_pageBar')[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=eval(Array.from(doc.scripts).find(s=>s.innerHTML.search(/msg/)>-1).innerHTML.trim().slice(4));let imgData=eval(code.match(/msg[^;]+/)[0]).split('|');let imgSrcArr=[];imgData.forEach(e=>{let imgSrc;if(location.hostname.indexOf('m.77mh')!=-1){imgSrc=ImgSvrList+e}else{imgSrc=img_qianz+e}imgSrcArr.push(imgSrc)});return imgSrcArr",
        "pageBarText": "let t1=doc.querySelector('h1>a');let t2=doc.querySelector('.tit>a');if(t1){return t1.innerText.replace(/\\S+/,'').trim()}else if(t2){return t2.innerText.replace(/\\S+/,'').trim()}",
        "css": "#main>*:not(#comicImg):not(.pagetual_pageBar),.qrcode_div,.content~*:not(#toApp),body>p{display:none!important}#comicImg>img,.mg-co>img{max-width:100%!important;display:block!important;margin: 0 auto !important;border:0px!important;}"
    },
    {
        "name": "新新漫画手機版 - 分類",
        "example": "http://m.77mh.xyz/lianzai/index.html",
        "url": "^https?://(m|so)\\.77mh\\.[a-z]{2,3}/",
        "include": ".lpagelist",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//ul[a/li/img]",
        "replaceElement": ".lpagelist"
    },
    {
        "name": "新新漫画 - 分類",
        "example": "http://www.77mh.xyz/lianzai/index.html",
        "url": "^https?://(www|so)\\.77mh\\.[a-z]{2,3}/",
        "include": ".pages_s",
        "nextLink": "a.current+a, a.next",
        "pageElement": "//ul[dl/dt/a/img] | //div[ul/li/a/img and @class='ar_list_co']",
        "replaceElement": ".pages_s",
        "css": ".pagetual_pageBar{margin-top:3px!important}"
    },
    {
        "name": "漫漫聚 / KuKu动漫 - 閱讀",
        "example": "http://www.manmanju.com/comiclist/3658/97532/1.htm，http://manhua.ikukudm.com/comiclist/3756/102656/1.htm，http://m.manmanju.com/comiclist/3658/97532/1.htm，",
        "url": "^https?://(m|a|b|www|manhua)\\.(manmanju|ikukudm)\\.com/comiclist/\\d+/\\d+/\\d+\\.htm$",
        "action": 1,
        "init": "let ia = document.querySelector('input~a');let sa = document.querySelector('script[language]+a');if(ia){ia.removeAttribute('href');}else{sa.removeAttribute('href');}",
        "nextLink": "//a[./img[@src='/images/d.gif']][not(@href='/exit/exit.htm')] | //a[span[text()='下一页']][not(@href='/exit/exit.htm')]",
        "pageElement": "//script[@language]/following-sibling::a/img[@src][not(contains(@src,'.gif'))]",
        "replaceElement": "//a[./img[@src='/images/d.gif']] | //a[./img[@src='/images/t.gif']] | //div[@class='bottom']/ul[@class='subNav'] | //li[@class='txtA']",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "漫漫聚 / KuKu动漫 - 分類",
        "example": "http://www.manmanju.com/comictype/3_1.htm，http://manhua.ikukudm.com/comictype/3_1.htm",
        "url": "^https?://(m|www|manhua)\\.(manmanju|ikukudm)\\.com/comictype/",
        "nextLink": "//a[text()='下一页'] | //a[span[text()='下一页']]",
        "pageElement": "//dl[@id='comicmain'] | //div[@class='imgBox']",
        "replaceElement": "//dl[@id='comicmain']/preceding-sibling::table | //dl[@id='comicmain']/following-sibling::table | //ul[@class='subNav']",
        "css": ".pagetual_pageBar+dl,.imgBox+.pagetual_pageBar{margin-top:-2px!important}"
    },
    {
        "name": "鬼罗丽漫画",
        "example": "http://www.gllmh.com/",
        "url": "^https?://www\\.gllmh\\.com/",
        "pinUrl": true,
        "nextLink": "li.thisclass+li>a",
        "pageElement": ".article-content img, #newsArticle img, .listl>ul, ul.news_list_1",
        "replaceElement": ".pagination, .pages, .page",
        "css": ".article-content img, #newsArticle img{visibility:visible!important;opacity:1!important;}"
    },
    {
        "name": "漫画屋 / 免追漫画 - 手機版閱讀",
        "example": "https://www.mhua5.com/chapter-1582203.html，https://www.mh5.org/index.php/chapter/233329",
        "url": "^https?://(www|m)\\.(mh5|mhua5|mianzhui)\\.(org|com)/(chapter-\\d+\\.html|index\\.php/chapter/\\d+|[0-9-]+\\.html)",
        "include": ".bottom-tool-bar",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let nh=ge('li.next-chapter').getAttribute('_href');let ph=ge('li.prev-chapter').getAttribute('_href');setTimeout(()=>{let p=ge('.prev-chapter.prev-btn');p.setAttribute('class','chapterprev');p.removeAttribute('_href');if(ph.indexOf('/')!=-1){let plink=`location.href='` + ph + `'`;p.setAttribute('onclick',plink)};if(nh.indexOf('/')!=-1){let n=ge('.next-chapter.next-btn');n.setAttribute('class','chapternext');n.removeAttribute('_href');let nlink=`location.href='` + nh + `'`;n.setAttribute('onclick',nlink)};let s=gx(\"//li[@class='switch'][span[text()='卷轴']]\");if(s){s.click()}},1000);setTimeout(()=>{if(location.hostname=='m.mianzhui.com'){document.querySelectorAll('img.lazy-image[data-original]').forEach(e=>{e.src=e.dataset.original})}},100);setTimeout(()=>{if(ph.indexOf('/')!=-1){ge('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a href=\"'+ph+'\">上一章</a></li>'}else{ge('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a _href>無上一章</a></li>'}if(nh.indexOf('/')!=-1){ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a href=\"'+nh+'\">下一章</a></li>'}else{ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a _href>無下一章</a></li>'}},150)",
        "nextLinkByJs": "let n = doc.querySelector('li.next-chapter');if (n.getAttribute('_href').indexOf('/')!=-1) return location.origin+n.getAttribute('_href');",
        "pageElement": ".comic-list,.read-end:not(.hide)",
        "replaceElement": "head>title,h1.comic-name,.end-txt",
        "pageInit": "let docge=e=>doc.querySelector(e);let ge=e=>document.querySelector(e);let gae=e=>doc.querySelectorAll(e);gae(`.comic-page[style='display: none;']`).forEach(e=>{e.style.display='list-item'});gae('.ldimg[mob-ec]').forEach(e=>{e.src=e.getAttribute('mob-ec')});let nh=docge('li.next-chapter').getAttribute('_href');let ph=docge('li.prev-chapter').getAttribute('_href');setTimeout(()=>{if(nh.indexOf('/')!=-1){ge('.end-itm.next').outerHTML=`<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a href=\"'${nh}'\">下一章</a></li>`;let nlink=`location.href='${nh}'`;ge('.chapternext').setAttribute('onclick',nlink)}else{ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a _href>無下一章</a></li>';ge('.chapternext').removeAttribute('onclick')}ge('.end-itm.prev').outerHTML=`<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a href=\"${ph}\">上一章</a></li>`;let plink=`location.href='${ph}'`;ge('.chapterprev').setAttribute('onclick',plink)},200)",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.comic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1.comic-name');if(t)return t.innerText",
        "css": ".read-pos,.ds,ins{display:none!important}"
    },
    {
        "name": "漫画屋 / 免追漫画 - PC版閱讀",
        "example": "https://www.mhua5.com/chapter-1612038.html，https://mh5.org/index.php/chapter/741258",
        "url": "^https?://(www\\.)?(mh5|mhua5|mianzhui)\\.(org|com)/(chapter-\\d+\\.html|index\\.php/chapter/\\d+|[0-9-]+\\.html)",
        "exclude": ".bottom-tool-bar",
        "pinUrl": true,
        "autoClick": "//div[@class='rd-aside__item j-rd-mod'][span[text()='卷轴']]",
        "history": 2,
        "action": 1,
        "wait": 1000,
        "init": "document.querySelectorAll('img[data-original]').forEach(e=>{e.src=e.dataset.original})",
        "nextLinkByJs": "let next = doc.querySelector('.rd-aside__item.j-rd-next:not([style])'); if (next) return location.origin + next.getAttribute('_href')",
        "pageElement": ".rd-article-wr",
        "replaceElement": ".last-crumb,.rd-aside__item.j-rd-prev,.rd-aside__item.j-rd-next,head>title",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.rd-article-wr');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.last-crumb');if(t)return t.innerText",
        "css": ".ds,.adv-img,.page-index__btn{display:none!important}.rd-article-wr>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫客栈手機版 - 閱讀",
        "example": "https://m.mkzhan.com/216512/1006597.html",
        "url": "^https?://m\\.mkzhan\\.com/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "waitElement": [
            ".next-chapter[data-href]"
        ],
        "nextLinkByJs": "let n = doc.querySelector('.next-chapter[data-href$=html]');if (n) return location.origin+n.getAttribute('data-href');",
        "pageElement": ".comic-list,.read-end",
        "replaceElement": "head>title,h1.comic-name,.prev-chapter,.next-chapter,.chapter-end",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.comic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1.comic-name');if(t)return t.innerText",
        "css": "p.read-pos{display:none!important}"
    },
    {
        "name": "漫客栈 - 卷軸模式",
        "example": "https://www.mkzhan.com/216512/1007019.html",
        "url": "^https?://www\\.mkzhan\\.com/\\d+/\\d+\\.html",
        "history": 2,
        "action": 1,
        "waitElement": [
            "#pages-tpl>*"
        ],
        "init": "document.querySelectorAll('img.lazy-read').forEach(img=>{let dc=img.getAttribute('data-src');img.src=dc})",
        "nextLinkByJs": "let next=doc.querySelector('.rd-aside__item.j-rd-next:not([style])');if(next)return location.origin+next.getAttribute('href')",
        "pageElement": "#pages-tpl",
        "replaceElement": ".rd-aside__item.j-rd-prev,.rd-aside__item.j-rd-next,head>title,.last-crumb",
        "pageInit": "doc.querySelectorAll('img.lazy-read').forEach(img=>{let dc=img.getAttribute('data-src');img.src=dc})",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#pages-tpl');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.last-crumb');if(t)return t.innerText",
        "css": ".ds,.adv-img,.page-index__btn{display:none!important}#mainView{margin-top:0px!important}.rd-article__pic{min-height: auto!important}"
    },
    {
        "name": "好漫 6手機版 - 閱讀",
        "example": "https://www.haoman6.com/chapter/520621",
        "url": "^https?://www\\.haoman6\\.com/chapter/\\d+",
        "include": ".bottom-tool-bar",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "init": "let ge=e=>document.querySelector(e);let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;$('#mainView').removeAttr('style');let nh=ge('li.next-chapter').getAttribute('_href');let ph=ge('li.prev-chapter').getAttribute('_href');setTimeout(()=>{let p=ge('.prev-chapter.prev-btn');p.setAttribute('class','chapterprev');p.removeAttribute('_href');if(ph.indexOf('/')!=-1){let plink=`location.href='${ph}'`;p.setAttribute('onclick',plink)};if(nh.indexOf('/')!=-1){let n=ge('.next-chapter.next-btn');n.setAttribute('class','chapternext');n.removeAttribute('_href');let nlink=`location.href='${nh}'`;n.setAttribute('onclick',nlink)};let s=gx(\"//li[@class='switch'][span[text()='卷轴']]\");if(s){s.click()}},1000);setTimeout(()=>{if(ph.indexOf('/')!=-1){ge('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a href=\"'+ph+'\">上一章</a></li>'}else{ge('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a _href>無上一章</a></li>'}if(nh.indexOf('/')!=-1){ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a href=\"'+nh+'\">下一章</a></li>'}else{ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a _href>無下一章</a></li>'}},150);setTimeout(()=>{let F=new DocumentFragment();document.querySelectorAll('.ldimg[mob-ec]').forEach(e=>{let img=new Image();img.src=e.getAttribute('mob-ec');F.appendChild(img)});let E=ge('.main_img');E.innerHTML='';E.appendChild(F)},100);",
        "nextLinkByJs": "let n = doc.querySelector('li.next-chapter');if (n.getAttribute('_href').indexOf('/')!=-1) return location.origin+n.getAttribute('_href');",
        "pageElement": ".comic-list,.read-end:not(.hide)",
        "replaceElement": "head>title,h1.comic-name,.end-txt",
        "pageInit": "let docge=e=>doc.querySelector(e);let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);let nh=docge('li.next-chapter').getAttribute('_href');let ph=docge('li.prev-chapter').getAttribute('_href');setTimeout(()=>{if(nh.indexOf('/')!=-1){ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a href=\"'+nh+'\">下一章</a></li>';let nlink=`location.href='${nh}'`;ge('.chapternext').setAttribute('onclick',nlink)}else{ge('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a _href>無下一章</a></li>';ge('.chapternext').removeAttribute('onclick')}ge('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a href=\"'+ph+'\">上一章</a></li>';let plink=`location.href='${ph}'`;ge('.chapterprev').setAttribute('onclick',plink)},200);let F=new DocumentFragment();doc.querySelectorAll('.ldimg[mob-ec]').forEach(e=>{let img=new Image();img.src=e.getAttribute('mob-ec');F.appendChild(img)});let E=docge('.main_img');E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.comic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1.comic-name');if(t)return t.innerText",
        "css": ".read-pos,.ds,.top-tool-bar+div[style]{display:none!important}.comic-list>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "好漫 6 - 閱讀 - 修正PC版漫畫下架",
        "example": "https://www.haoman6.com/chapter/1630368",
        "url": "^https?://www\\.haoman6\\.com/chapter/\\d+",
        "exclude": ".bottom-tool-bar",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "wait": 1000,
        "init": "document.querySelectorAll(`.rd-article__pic[style='display: none;']`).forEach(e=>{e.style.display='block'});document.querySelectorAll('img.lazy-read').forEach(img=>{img.src=img.getAttribute('data-ecp')})",
        "nextLinkByJs": "let next = doc.querySelector('.rd-aside__item.j-rd-next:not([style])'); if (next) return location.origin + next.getAttribute('_href')",
        "pageElement": ".rd-article-wr",
        "replaceElement": ".last-crumb,.rd-aside__item.j-rd-prev,.rd-aside__item.j-rd-next,head>title",
        "pageInit": "doc.querySelectorAll(`.rd-article__pic[style='display: none;']`).forEach(e=>{e.style.display='block'});doc.querySelectorAll('img.lazy-read').forEach(img=>{img.src=img.getAttribute('data-ecp')})",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.rd-article-wr');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.last-crumb');if(t)return t.innerText",
        "css": ".ds,.adv-img,.page-index__btn{display:none!important}#mainView{margin-top:0px!important}.rd-article__pic{min-height: auto!important}"
    },
    {
        "name": "好漫 6 / 漫客栈 / 漫画屋 - 分類",
        "example": "https://www.haoman6.com/category/，https://www.mkzhan.com/category/，https://www.mhua5.com/category/，https://mh5.org/index.php/category/",
        "url": "^https?://(www\\.)?(haoman6|g-lens|mkzhan|mhua5|mh5)\\.(com|org)/((category|search)|index\\.php/(category|search))",
        "nextLink": "a.next",
        "pageElement": ".cate-comic-list",
        "replaceElement": "#Pagination",
        "css": ".pagetual_pageBar{margin-top:-20px!important}.pagetual_pageBar+.cate-comic-list{margin-top:2px!important}"
    },
    {
        "name": "好漫 6 手機版 - 加載更多",
        "example": "https://www.haoman6.com/，http://www.g-lens.com/",
        "url": "^https?://www\\.(haoman6|g-lens)\\.com/category/(tags|finish|pay|list)/",
        "include": ".getmore",
        "loadMore": ".getmore"
    },
    {
        "name": "漫本 - 手機版閱讀",
        "example": "http://www.manben.com/m1149741/",
        "url": "^https?://www\\.manben\\.com/m\\d+(#page_\\d+)?",
        "exclude": "id('mainControlNext')",
        "init": "window.onscroll=null;let ge=e=>document.querySelector(e);function showtoolbar(){let t=ge(\".titleBar[style*='40px']\");if(t){$('.titleBar').attr('style','background-color:#373737;top: 0px;')}else{$('.titleBar').attr('style','background-color:#373737;top: -40px;')}let b=ge('.toolBar[style]');if(b){$('.toolBar').removeAttr('style')}else{$('.toolBar').attr('style','bottom: -65px;')}};document.addEventListener('click',showtoolbar);function keyshowtoolbar(e){let key=window.event?e.keyCode:e.which;if(key=='34'||key=='32'||key=='40'){return}else{$('.titleBar').attr('style','background-color:#373737;top: 0px;');$('.toolBar').removeAttr('style')}};document.addEventListener('keydown',keyshowtoolbar);let F=new DocumentFragment();newImgs.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=ge('#cp_img');E.innerHTML='';E.appendChild(F);",
        "history": 2,
        "pinUrl": true,
        "nextLink": "//p[text()='下一章']/preceding-sibling::a[starts-with(@href,'/m')] | //a[@class='readTipForm' and not(@href='/m0/')]",
        "pageElement": "#cp_img",
        "replaceElement": "//head/title | id('title') | //a[@class='readTipForm'] | //p[contains(text(), '上一章') or contains(text(), '下一章')]/preceding-sibling::a",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgData=eval(eval(code.trim().slice(4)).slice(12));let E=doc.querySelector('#cp_img');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#cp_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgSrcArr=eval(eval(code.trim().slice(4)).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('#title');if(t)return t.innerText.replace(/\\S+/,'').trim()"
    },
    {
        "name": "漫本 - PC版閱讀",
        "example": "http://www.manben.com/m1149741/",
        "url": "^https?://www\\.manben\\.com/m\\d+(#page_\\d+)?",
        "include": "//script[contains(text(),'eval') and contains(text(),'newImgs')]",
        "exclude": "//p[text()='下一章'] | //a[@class='readTipForm']",
        "pinUrl": true,
        "init": "$('#mainView').removeAttr('style');let ge=e=>document.querySelector(e);let loop=setInterval(()=>{let set=ge('#comicContain img');if(set){clearInterval(loop);let F=new DocumentFragment();newImgs.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});let E=ge('#comicContain');E.innerHTML='';E.appendChild(F)}},100)",
        "nextLink": "id('mainControlNext') | //a[img[@alt='下一章'] and not(@href='javascript:void(0);')]",
        "pageElement": "#comicContain",
        "replaceElement": "head>title,.title-comicHeading,.main_control,.catalog~a",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgData=eval(eval(code.trim().slice(4)).slice(12));let E=doc.querySelector('#comicContain');let F=new DocumentFragment();imgData.forEach(e=>{let img=new Image();img.src=e;F.appendChild(img)});E.innerHTML='';E.appendChild(F);",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('#comicContain');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "preloadImages": "document.querySelector('#pagetual-preload').innerHTML='';let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/newImgs/)>-1).innerHTML;let imgSrcArr=eval(eval(code.trim().slice(4)).slice(12));return imgSrcArr",
        "pageBarText": "let t=doc.querySelector('.title-comicHeading');if(t)return t.innerText",
        "css": "p.num,p.say,.comic-text{display:none!important}#comicContain img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "漫本 - PC/手機版查看更多",
        "example": "http://www.manben.com/mh-updated/",
        "url": "^https?://www\\.manben\\.com/(mh-updated|mh-list)/",
        "loadMore": "#moreDiv",
        "css": "div[class^=''floatBar][style*='.png']{display:none!important}"
    },
    {
        "name": "好漫8手機版 - 閱讀",
        "example": "http://haoman8.com/comic/222/746937",
        "url": "^https?://(www\\.)?haoman8\\.com/comic/\\d+/\\d+",
        "include": ".bottom-tool-bar",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "wait": 2000,
        "init": "function gx(x){return document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}setTimeout(()=>{document.querySelectorAll('img[data-echo]').forEach(e=>{e.src=e.getAttribute('data-echo')})},2000);let nh=document.querySelector('li.next-chapter').getAttribute('_href');let ph=document.querySelector('li.prev-chapter').getAttribute('_href');setTimeout(()=>{let p=document.querySelector('.prev-chapter.prev-btn');p.setAttribute('class','chapterprev');p.removeAttribute('_href');if(ph.indexOf('/')!=-1){let plink=`location.href='` + ph + `'`;p.setAttribute('onclick',plink)};if(nh.indexOf('/')!=-1){let n=document.querySelector('.next-chapter.next-btn');n.setAttribute('class','chapternext');n.removeAttribute('_href');let nlink=`location.href='` + nh + `'`;n.setAttribute('onclick',nlink)};let s=gx(\"//li[@class='switch'][span[text()='卷轴']]\");if(s){s.click()}},1000);setTimeout(()=>{if(ph.indexOf('/')!=-1){document.querySelector('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a href=\"'+ph+'\">上一章</a></li>'}else{document.querySelector('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a _href>無上一章</a></li>'}if(nh.indexOf('/')!=-1){document.querySelector('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a href=\"'+nh+'\">下一章</a></li>'}else{document.querySelector('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a _href>無下一章</a></li>'}},150)",
        "nextLinkByJs": "let n = doc.querySelector('li.next-chapter');if (n.getAttribute('_href').indexOf('/')!=-1) return location.origin+n.getAttribute('_href');",
        "pageElement": ".comic-list,.read-end:not(.hide)",
        "replaceElement": "head>title,h1.comic-name,.end-txt",
        "lazyImgSrc": [
            "data-echo",
            "data-echo"
        ],
        "pageInit": "let nh=doc.querySelector('li.next-chapter').getAttribute('_href');let ph=doc.querySelector('li.prev-chapter').getAttribute('_href');setTimeout(()=>{if(nh.indexOf('/')!=-1){document.querySelector('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a href=\"'+nh+'\">下一章</a></li>';let nlink=`location.href='` + nh + `'`;document.querySelector('.chapternext').setAttribute('onclick',nlink)}else{document.querySelector('.end-itm.next').outerHTML='<li class=\"end-itm next\"><i class=\"i-rd-next\"></i><a _href>無下一章</a></li>';document.querySelector('.chapternext').removeAttribute('onclick')}document.querySelector('.end-itm.prev').outerHTML='<li class=\"end-itm prev\"><i class=\"i-rd-prev\"></i><a href=\"'+ph+'\">上一章</a></li>';let plink=`location.href='` + ph + `'`;document.querySelector('.chapterprev').setAttribute('onclick',plink)},200)",
        "pageAction": "function gae(e){return document.querySelectorAll(e)};setTimeout(()=>{let c=gae('.comic-list');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}let r=gae('.read-end')[0];if(r){gae('.prev-chapter')[0].remove()}},10000);",
        "pageBarText": 1,
        "css": ".read-pos,.ds{display:none!important}.comic-list>.comic-page{margin-top:-3px!important}"
    },
    {
        "name": "好漫8 - 閱讀 - 修正PC版漫畫下架",
        "example": "http://haoman8.com/comic/222/718631",
        "url": "^https?://(www\\.)?haoman8\\.com/comic/\\d+/\\d+",
        "exclude": ".bottom-tool-bar",
        "pinUrl": true,
        "init": "setTimeout(()=>{let s=document.querySelector('#js_swichV:not(.hide)');if(s){s.click()}},1000);let _img='';document.querySelectorAll('img[data-echo]').forEach(e=>{_img+=`<img src='${e.getAttribute('data-echo')}'>`});document.querySelector('#reader-scroll').innerHTML=_img",
        "nextLinkByJs": "let next = document.querySelector(`#js_pageNextBtn[_href^='/']`); if (next) return location.origin + next.getAttribute('_href')",
        "manualMode": true
    },
    {
        "name": "好漫8 - 分類",
        "example": "http://haoman8.com/category/",
        "url": "^https?://haoman8\\.com/category/",
        "nextLink": "a.on+a",
        "pageElement": ".acgn-comic-list",
        "replaceElement": ".acgn-pages",
        "css": ".pagetual_pageBar{margin-top:-15px!important}.acgn-comic-list{margin-bottom:0px!important}"
    },
    {
        "name": "拷貝漫畫 - PC版閱讀 - 雙擊下一話，鍵盤左右鍵下一話",
        "example": "https://www.copymanga.site/comic/huizuoliaolidemofashi/chapter/6120a218-4b02-11ed-8536-024352452ce0",
        "url": "^https?://(www\\.)?copymanga\\.site/comic/\\w+/chapter/",
        "init": "function gx(x){return document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function next(e){let key=window.event?e.keyCode:e.which;if(key==39){let n=gx(\"//a[text()='下一話' and starts-with(@href,'/')]\");if(n){n.click()}else{alert('沒有下一話了！')}}};document.addEventListener('keydown',next);function prev(e){let key=window.event?e.keyCode:e.which;if(key==37){let p=gx(\"//a[text()='上一話' and starts-with(@href,'/')]\");if(p){p.click()}else{alert('沒有上一話了！')}}};document.addEventListener('keydown',prev);function dcnext(){let n=gx(\"//a[text()='下一話' and starts-with(@href,'/')]\");if(n){n.click()}else{alert('沒有下一話了！')}};document.addEventListener('dblclick',dcnext);document.querySelector('.container-fluid').setAttribute('style','padding-right: 0px;padding-left: 0px;');document.querySelectorAll(`[class*='comic-size']`).forEach(div=>{let c=div.getAttribute('class').replace(/comic-size-\\d+/,'comic-size-99');div.setAttribute('class',c);div.setAttribute('style','min-width: 800px !important;')})",
        "nextLink": "0",
        "pinUrl": true,
        "manualMode": true
    },
    {
        "name": "拷貝漫畫 - 分類頁",
        "example": "https://copymanga.site/comics",
        "url": "^https?://copymanga\\.site/comics",
        "action": 1,
        "nextLink": "li.next>a",
        "pageElement": ".container.exemptComicList",
        "replaceElement": ".container>.page-all"
    },
    {
        "name": "拷貝漫畫 - 推薦頁",
        "example": "https://copymanga.site/recommend",
        "url": "^https?://copymanga\\.site/recommend",
        "nextLink": "li.next>a",
        "pageElement": ".container.correlationList",
        "replaceElement": ".container>.page-all",
        "css": ".pagetual_pageBar {margin-top: -10px !important;margin-bottom: 20px !important;}"
    },
    {
        "name": "二次元動漫 - 閱讀",
        "example": "https://www.2animx.com/index-look-name-%E5%A6%96%E7%A5%9E%E8%A8%98-cid-22592-id-235546",
        "url": "^https?://www\\.2animx\\.com/index-look-name",
        "init": "document.querySelectorAll('#img_ad_img>img[style*=none]').forEach(e=>{e.remove()});document.querySelectorAll('#ComicPic').forEach(e=>{e.outerHTML=`<img src='${e.src}'>`});",
        "nextLink": "//a[text()='下一頁'][not(starts-with(@href,'javascript'))] | //a[text()='下一章']",
        "pageElement": "#img_ad_img>img",
        "replaceElement": "head>title,script+div.c,.e+.c,.b",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('#img_ad_img>img[style*=none]').forEach(e=>{e.remove()});gae('#ComicPic').forEach(e=>{e.outerHTML=`<img src='${e.src}'>`});gae('.pagetual_pageBar>a').forEach(e=>{if(/-p-/.test(e.href))e.parentNode.remove()});let ps=gae('.pagetual_pageBar');if(ps.length>5){ps[0].remove();let ds=gae('#img_ad_img>*');for(let i in ds){if(/pagetual/.test(ds[i].id)){break};ds[i].remove()}}",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerText.match(/-([^-]+)/)[1].trim();",
        "rate": 10,
        "css": ".e>h1,.e>p,.fb-share-button,#index_mian,.c>.fanye,.c>select,#k_zsy,.lookpage{display:none!important}#img_ad_img>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "二次元動漫 - 分類",
        "example": "https://www.2animx.com/index-html-status-1",
        "url": "^https?://www\\.2animx\\.com/index-html-status",
        "nextLink": "//a[text()='下一頁']",
        "pageElement": ".box.across.list>.box-bd>.liemh.htmls.indliemh",
        "replaceElement": ".pagination"
    },
    {
        "name": "酷漫屋 - 閱讀",
        "example": "http://www.kumw7.com/24186/1259138.html",
        "url": "^https?://www\\.(kumw|kuman)\\d+\\.com/\\d+/\\d+\\.html$",
        "history": 2,
        "action": 1,
        "nextLink": "a.next[href$='html']",
        "pageElement": ".main_img",
        "replaceElement": ".chaptitle,.chapend,head>title",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.main_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('h1');if(t)return t.innerText",
        "css": ".chapter-img-box{margin-bottom:-1px!important}.chapend .next,.chapend .prev{margin:0 auto!important}"
    },
    {
        "name": "酷漫屋 - 分類",
        "example": "http://www.kumw7.com/sort/13-1.html",
        "url": "^https?://www\\.(kumw|kuman)\\d+\\.com/(sort|rank)/",
        "nextLink": "//a[text()=' > ']",
        "pageElement": ".box.container",
        "replaceElement": "section+footer",
        "css": ".pagetual_pageBar {margin-top: -8px !important;}.pagetual_pageBar+section {margin-top: 5px !important;}"
    },
    {
        "name": "酷漫屋手機版 - 閱讀",
        "example": "http://kumw7.com/25387/1391494.html",
        "url": "^https?://(m\\.)?(kumw|kuman)\\d+\\.com/\\d+/\\d+\\.html",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.removeAttribute('data-src')});let ge=e=>document.querySelector(e);",
        "nextLink": "li.end-itm.next>a[href$='html']",
        "pageElement": ".main_img",
        "replaceElement": ".chapter-end,.rd-static,div.title,head>title",
        "lazyImgSrc": [
            "data-src",
            "data-src"
        ],
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ge=e=>document.querySelector(e);let cs=gae('.main_img');let last=cs.length-1;cs[last].addEventListener('click',()=>{let v=ge('.van-nav-bar:not([style])');let vn=ge('.van-nav-bar[style*=none]');let vb=ge('.van-nav-bar[style*=block]');let b=ge('.bottom-tool-bar:not([style])');let bn=ge('.bottom-tool-bar[style*=none]');let bb=ge('.bottom-tool-bar[style*=block]');if(v){v.setAttribute('style','display: block;')}if(b){b.setAttribute('style','display: block;')}if(vn){vn.style.display='block'}else{vb.style.display='none'}if(bn){bn.style.display='block'}else{bb.style.display='none'}});let c=gae('.main_img');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "pageBarText": "let t=doc.querySelector('.rd-static>span');if(t)return t.innerText",
        "css": ".img_Page,.morepl,#adhtml{display:none!important}"
    },
    {
        "name": "酷漫屋手機版 - 分類",
        "example": "http://kumw7.com/rank/5-1.html",
        "url": "^https?://(m\\.)?(kumw|kuman)\\d+\\.com/(sort|rank)/",
        "nextLink": "//a[text()=' > ']",
        "pageElement": ".manList>ul",
        "replaceElement": "div+footer",
        "css": "aside{display:none!important}.pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "快看 - 分類",
        "example": "https://www.kuaikanmanhua.com/tag/0",
        "url": "^https?://www\\.kuaikanmanhua\\.com/tag/\\d+",
        "init": "let ge=e=>document.querySelector(e);let link=ge('.headerContent>div>ul>li:nth-child(2)>a');link.href='/tag/0\\?region=1&pays=0&state=0&sort=1&page=1';link.removeAttribute('target');if(!location.search){ge('.selList.fl.cls>a:first-child').click()}",
        "action": 1,
        "nextLinkByUrl": [
            "&page=(\\d+)$",
            "&page={$1+1}",
            "ul.pagination>li:not(.disabled):last-child"
        ],
        "pageElement": ".tagContent.cls>*",
        "replaceElement": ".TagPages.pagesBox",
        "pageAction": "setTimeout(()=>{let ge=e=>document.querySelector(e);let url=location.search.replace(/(\\d+)$/,'');document.querySelectorAll('.itemBten:not(.active)>a:not(.prev):not(.Next)').forEach(a=>{a.href=url+a.innerText});let cp=ge('.pagination>li.active>a').innerText;let ppn=cp-1;let hb=ge('.pagination>li:not(.disabled):first-child>a');if(hb){hb.href=url+ppn}let pb=ge('a.prev');if(pb){pb.href=url+ppn}let next=ge('.pagination>li.active+li>a');let nb=ge('a.Next');if(next){nb.href=url+next.innerText}let enb=ge('.pagination>li:not(.disabled):last-child>a');if(enb){enb.href=url+next.innerText}},1000)",
        "css": ".pagetual_pageBar{margin-top:-20px!important}.blankImg"
    },
    {
        "name": "快看 - 閱讀",
        "example": "https://www.kuaikanmanhua.com/web/comic/190217/",
        "url": "^https?://www\\.kuaikanmanhua\\.com/web/comic/\\d+",
        "history": 2,
        "pinUrl": true,
        "action": 1,
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src})",
        "nextLink": "//a[not(@href='javascript:void(0);') and text()='下一话']",
        "pageElement": ".imgList",
        "replaceElement": ".comicDetails h3,.AdjacentChapters,head>title",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let c=gae('.imgList');if(c.length>10){c[0].remove()}let p=gae('.pagetual_pageBar');if(p.length>10){p[0].remove()}",
        "css": ".giude{display:none!important}",
        "pageBarText": "let t=doc.querySelector('title');if(t)return t.innerText.match(/[^|]+/)[0].trim()"
    },
    {
        "name": "comic.bh3.com",
        "example": "https://comic.bh3.com/book/1001/1",
        "url": "^https?://comic\\.bh3\\.com/book/\\d+/\\d+",
        "nextLinkByJs": "let n=doc.querySelector('.comic-wrapper>a:last-child');if(n){return location.origin+n.href.split('\\'')[3]}",
        "pageElement": "img.comic_img,.comic-wrapper>.read-next",
        "replaceElement": ".comic-wrapper>a:last-child,.header_word",
        "css": ".comic-wrapper {overflow-y: initial !important;} .comic_img{display: inline;}"
    },
    {
        "name": "kantv.io",
        "example": "http://kantv.io/home/",
        "url": "^https?://kantv\\.io/",
        "nextLink": "li.active+li>a",
        "pageElement": ".subom-post",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-8px!important;}"
    },
    {
        "name": "R3SUB - 搜索",
        "example": "https://r3sub.com/search.php?s=king",
        "url": "^https?://r3sub\\.com/search\\.php",
        "nextLink": "li.active+li>a",
        "pageElement": ".movie.movie--preview.ddd",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:10px!important;}.pagetual_pageBar+.movie{margin-top:-2px!important;}"
    },
    {
        "name": "SubHD",
        "example": "https://subhd.tv/sub/movie",
        "url": "^https?://subhd(tw)?\\.(tv|com|la|cc|me)/(zu|sub|search)/",
        "include": "nav.clearfix",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".bg-white.shadow-sm.rounded-3",
        "replaceElement": ".pagination",
        "insert": "nav.clearfix",
        "insertPos": 1,
        "css": ".col-lg-3.pt-5{display:none!important}.pagetual_pageBar{margin-top:-10px!important;}",
        "rate": 3,
        "sleep": 1000
    },
    {
        "name": "伪射手网",
        "example": "http://assrt.net/xml/list/sub/",
        "url": "^https?://assrt\\.net/",
        "nextLinkByJs": "let next = doc.querySelector('#pl-current+a'); if (next) return location.origin + location.pathname + '?page=' + next.innerText",
        "pageElement": ".subitem:not([style])",
        "replaceElement": ".pagelinkcard",
        "insert": ".pagelinkcard",
        "insertPos": 1,
        "css": ".pagetual_pageBar{margin-top:10px!important}.pagetual_pageBar+.subitem{margin-top:-2px!important}"
    },
    {
        "name": "A4k 字幕網",
        "example": "https://www.a4k.net/",
        "url": "^https?://www\\.a4k\\.net/",
        "nextLink": "a.pager__item--next",
        "pageElement": ".list>.item",
        "replaceElement": "nav.pager",
        "pageBar": 0
    },
    {
        "name": "字幕库 zmk",
        "example": "https://zimuku.org/",
        "url": "^https?://zimuku\\.org/",
        "nextLink": "a.next",
        "pageElement": "table>tbody",
        "replaceElement": ".pagination"
    },
    {
        "name": "中文字幕网 zimuzimu",
        "example": "http://cn.zimuzimu.com/so_zimu.htm?q=2020",
        "url": "^https?://cn\\.zimuzimu\\.com/",
        "nextLink": "li.page-item.active+li>a",
        "pageElement": "li.thread",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "點點字幕",
        "example": "http://www.ddzimu.com/download/xslist.php?key=king",
        "url": "^https?://www\\.ddzimu\\.com/\\w+/xslist\\.php",
        "nextLink": "li.disabled+li>a",
        "pageElement": ".list>ul>li:not(.first)",
        "replaceElement": "div.pagination"
    },
    {
        "name": "SkrBT / BT1207",
        "example": "http://ibt120701.xyz/search?keyword=king",
        "url": "^https?://.*(bt1207|skrbt)[^/]+/",
        "include": "#search-form",
        "nextLinkByJs": "let n=doc.querySelector('ul.pagination>li.active+li>a');if(!n)return null;let params=[];let form=doc.querySelector('#search-form');form.querySelectorAll('input').forEach(input=>{if(input.name=='p')params.push('p='+n.innerText);else params.push(input.name+'='+input.value)});return form.action+'?'+params.join('&')",
        "pageElement": "ul.list-unstyled",
        "replaceElement": "nav>.pagination",
        "css": ".pagetual_pageBar+.list-unstyled{margin-top:0px!important;}#right-panel{display:none!important}"
    },
    {
        "name": "RARBG",
        "example": "https://rarbg.to/torrents.php?category=movies",
        "url": "^https?://(proxy|unblocked)?rarbg([a-z0-9]+)?\\.(to|org|com)/",
        "pinUrl": true,
        "action": 2,
        "include": "#pager_links",
        "nextLink": "#pager_links>a[title='next page']",
        "pageElement": "//table[tbody/tr[@class='lista2']/td/a/img]",
        "replaceElement": "#pager_links",
        "pageAction": "document.querySelectorAll('iframe[name]').forEach(iftame=>{iftame.style.margin='0 -2px 2px 0px'});let w=document.querySelector('.lista2t .lista2>td[align=center]:not([width])').clientWidth-2;let iframes=document.getElementsByTagName('iframe');for(let i=0;i<iframes.length;i++){let iframe=iframes[i].contentWindow.document;iframe.body.querySelectorAll('.lista2t .lista2>td[align=center]:not([width])').forEach(e=>{e.setAttribute('width',w)})};",
        "sleep": 1000,
        "css": "inIframe:body,table{margin:0!important;padding:0!important;width:100.1%!important}td[width='100'],.lista2t tr:not(.lista2){display:none!important}body{background:none!important}table.lista2t{border-top:2px solid #a0cff0}"
    },
    {
        "name": "limetorrents.cc",
        "example": "https://www.limetorrents.lol/browse-torrents/Movies/",
        "url": "^https?://www\\.limetorrents\\.lol/(browse-torrents|search)/",
        "nextLink": "#next",
        "pageElement": "table.table2>tbody>tr:not(:first-of-type)",
        "replaceElement": ".search_stat"
    },
    {
        "name": "BT 之家",
        "example": "https://www.btbtt15.com/forum-index-fid-950.htm",
        "url": "^https?://www\\.btbtt\\d+\\.com/",
        "pinUrl": true,
        "nextLink": "//div[@class='page']/a[text()='▶' or text()='下一页']",
        "pageElement": "#threadlist>.thread",
        "replaceElement": "div+div.page",
        "pageBar": 0,
        "rate": 3
    },
    {
        "name": "蜜柑计划",
        "example": "https://mikanani.me/Home/Classic",
        "url": "^https?://mikanani\\.me/Home/Classic",
        "action": 1,
        "nextLinkByJs": "let next=doc.querySelector('.pagination>li.active+li:not([style]):not([class])>a');if(next)return location.origin+location.pathname.replace(/\\/\\d+$/,'')+'/'+next.innerText",
        "pageElement": "//table/tbody/tr",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "動漫花園",
        "example": "http://share.dmhy.org/topics/list/sort_id/2",
        "url": "^https?://(www|share|dmhy)?(\\.)?(dmhy|anoneko)\\.(org|com)",
        "action": 1,
        "nextLink": "//a[text()='下一頁']",
        "pageElement": "thead+tbody",
        "replaceElement": ".table.clear>.nav_title,script+.nav_title",
        "pageBar": 0,
        "rate": 3
    },
    {
        "name": "愛戀動漫&MioBT",
        "example": "http://www.kisssub.org/，http://miobt.com/",
        "url": "^https?://(www\\.|m|share\\.)?(kisssub|miobt|comicat|acgnx|anix|36dm)\\.(org|com|se|moe|club)",
        "action": 1,
        "nextLink": "span.current+a",
        "pageElement": "#data_list>tr,.lists",
        "replaceElement": ".pages.clear",
        "pageBar": 0,
        "rate": 3
    },
    {
        "name": "言耽社 - 閱讀",
        "example": "https://yandanshe.com/",
        "url": "^https?://yandanshe\\.com/\\d+",
        "nextLink": "span.current+a",
        "pageElement": "title,.article-content",
        "replaceElement": ".list",
        "pageBarText": "let t=doc.querySelector('.article-content');if(t)return t.innerText"
    },
    {
        "name": "言耽社 - 分类页",
        "example": "https://yandanshe.com/",
        "url": "^https?://yandanshe\\.com/b",
        "nextLink": ".next-page>a",
        "pageElement": ".excerpts",
        "replaceElement": ".pagination"
    },
    {
        "name": "MINI4K",
        "example": "https://www.mini4k.com/movies",
        "url": "^https?://www\\.mini4k\\.com/movies",
        "nextLink": "a.pager__item--next",
        "pageElement": "div[class*='-item-list']>ul>.column",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "WebHD - 搜索页",
        "example": "http://webhd.cc/search/king",
        "url": "^https?://webhd\\.cc/search/",
        "nextLink": "//a[@class='page-link'][contains(text(), '下一页')]",
        "pageElement": ".col-lg-9 .bg-white.shadow-sm.rounded-3",
        "replaceElement": "ul.pagination",
        "insert": "nav[aria-label='pagination']",
        "insertPos": 1,
        "pageBar": 0
    },
    {
        "name": "WebHD",
        "example": "http://webhd.cc/",
        "url": "^https?://webhd\\.cc/",
        "nextLink": "//a[@class='page-link'][contains(text(), '下一页')]",
        "pageElement": ".col-lg-9 .bg-white.shadow-sm.rounded-3>.row.gx-0",
        "replaceElement": "ul.pagination",
        "pageBar": 0
    },
    {
        "name": "limetorrents",
        "example": "https://ww1.limetorrents.icu/movies",
        "url": "^https?://(\\w{1,3}\\.)?limetorrents\\.icu/",
        "nextLink": "a[rel='next']",
        "pageElement": "section>.row",
        "replaceElement": ".tsc_pagination",
        "css": "#social_popup{display:none!important}.pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "TorrentGalaxy",
        "example": "https://torrentgalaxy.to/torrents.php",
        "url": "^https?://torrentgalaxy\\.to/",
        "nextLink": "li.page-item.active+li.page-item>a",
        "pageElement": ".tgxtable>.tgxtablerow",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "kickasss",
        "example": "https://kickasss.to/",
        "url": "^https?://(kickasss|katcr)\\.",
        "nextLink": "a.active+a",
        "pageElement": "table.data.frontPageWidget>tbody>tr:not(.firstr)",
        "replaceElement": ".pages",
        "pageBar": 0
    },
    {
        "name": "1337x",
        "example": "https://www.1377x.to/",
        "url": "^https?://www\\.1377x\\.",
        "nextLink": ".pagination li.active+li>a",
        "pageElement": "table.table-list>tbody",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "YTS",
        "example": "https://yts.mx/browse-movies",
        "url": "^https?://yts\\.mx/browse-movies",
        "nextLink": "//ul[contains(@class, 'tsc_pagination')]/li[a/@class='current']/following-sibling::li[1]/a",
        "pageElement": ".browse-movie-wrap",
        "replaceElement": ".tsc_pagination",
        "pageBar": 0
    },
    {
        "name": "萌番组 lite",
        "example": "https://bangumi.moe/lite/",
        "url": "^https?://bangumi\\.moe/lite/",
        "nextLink": "//section/a[span[contains(@class, 'next')]]",
        "pageElement": ".torrents-ul",
        "replaceElement": ".page-btn-section",
        "pageAction": "eval(document.querySelector('head>script:not([src])').innerHTML)",
        "css": ".pagetual_pageBar+ul{padding-top:0px!important}"
    },
    {
        "name": "萌番组",
        "example": "https://bangumi.moe/",
        "url": "^https?://bangumi\\.moe/",
        "loadMore": "[torrent-list='lattorrents'] button[ng-click='loadMore()'] ,[torrent-list='torrents'] button[ng-click='loadMore()']"
    },
    {
        "name": "AniRena",
        "example": "https://www.anirena.com/",
        "url": "^https?://www\\.anirena\\.com/",
        "nextLink": "a.disabled+a:not(.disabled)",
        "pageElement": ".full2, .full2+script",
        "replaceElement": ".full3.buttons",
        "pageAction": "let ss=document.querySelectorAll('.full2+script');let n=Math.ceil(ss.length/100);for(let i=(n-1)*100-1;i<ss.length;i++){eval(ss[i].innerHTML)};"
    },
    {
        "name": "ACG.RIP",
        "example": "https://acg.rip/",
        "url": "^https?://acg\\.rip/",
        "nextLink": "li.next>a",
        "pageElement": "table.post-index>tbody",
        "replaceElement": "ul.pagination"
    },
    {
        "name": "anime1.me",
        "example": "https://anime1.me/",
        "url": "^https?://anime1\\.me/",
        "nextLink": "a.next",
        "pageElement": "#table-list>tbody>tr"
    },
    {
        "name": "233 动漫 - 排行榜",
        "example": "https://www.dm233.cc/rank/",
        "url": "^https?://www\\.dm233\\.cc/rank/",
        "nextLink": "//div[@class='pagelist']//a[contains(text(), '下一页') or contains(text(), '下一頁')]",
        "pageElement": ".side-update.normal-wai>.normal-nei",
        "replaceElement": ".pagelist"
    },
    {
        "name": "233 动漫",
        "example": "https://www.dm233.cc/catalog/",
        "url": "^https?://www\\.dm233\\.cc/",
        "nextLink": "//div[@class='pagelist']//a[contains(text(), '下一页') or contains(text(), '下一頁')]",
        "pageElement": ".dhnew ul, .xgyd ul",
        "replaceElement": ".pagelist"
    },
    {
        "name": "AGE 动漫 - 排行榜",
        "example": "https://www.agemys.cc/rank",
        "url": "^https?://www\\.agemys\\.cc/rank",
        "nextLink": "id('container')/ul[@style][not(@class)]/li/a[contains(text(), '下一页')]",
        "pageElement": "#container>.div_right .blockcontent.div_right_r_3>ul",
        "replaceElement": "#container>ul[style]:not([class])",
        "css": ".pagetual_pageBar+ul{margin-top:-5px!important}"
    },
    {
        "name": "AGE 动漫",
        "example": "https://www.agemys.net/catalog/all-all-all-all-all-time-1",
        "url": "^https?://www\\.agemys\\.[^/]+/",
        "nextLink": "id('container')//div[@class='blockcontent']/div[@style][not(@class)]/li/a[contains(text(), '下一页')]",
        "pageElement": "#container .blockcontent1>div, #container .blockcontent>ul:not(.search-list)>li",
        "replaceElement": "#container .blockcontent>div[style]:not([class])"
    },
    {
        "name": "漫岛动漫",
        "example": "https://www.mandao.tv/list/lm1.html",
        "url": "^https?://www\\.mandao\\.tv/",
        "nextLink": "//div[contains(@class, 'page')]/a[text()='>']",
        "pageElement": ".index-tj>ul",
        "replaceElement": ".page",
        "css": ".pagetual_pageBar{margin-top:-30px!important}"
    },
    {
        "name": "妮可动漫",
        "example": "http://www.nicotv.me/video/type3/-----4-addtime.html",
        "url": "^https?://www\\.nicotv\\.me/",
        "nextLink": "//ul[contains(@class, 'pagination ')]//a[text()='»']",
        "pageElement": "ul.list-unstyled",
        "replaceElement": "ul.pagination"
    },
    {
        "name": "怡萱动漫",
        "example": "https://www.yxdmlove.com/resource/",
        "url": "^https?://www\\.yxdmlove\\.com/",
        "nextLink": "//a[@class='nextPage' or text()='下一页']",
        "pageElement": ".dhnew>ul",
        "replaceElement": ".pagelist"
    },
    {
        "name": "LIBVIO",
        "example": "https://libvio.me/type/1.html",
        "url": "^https?://libvio\\.me/",
        "action": 1,
        "wait": 1000,
        "nextLink": "li.active+li>a",
        "pageElement": ".stui-vodlist",
        "replaceElement": ".stui-page__item",
        "pageInit": "let defaultImg='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ae4eabf5-1b15-425e-bdc9-144e48cded99/c9d2141e-8569-4996-9c73-d633a0669fa8.gif';doc.querySelectorAll('a.lazyload').forEach((item)=>{let imgUrl=item.dataset.original;let image=new Image();image.src=imgUrl;if(!image.complete){item.style.backgroundImage=`url(${defaultImg})`}})",
        "css": ".stui-page__all{display:none!important}"
    },
    {
        "name": "筆趣影視",
        "example": "http://biquys.com/acg/y2022/",
        "url": "^https?://(www\\.)?biquys.com/(acg|zongyi|mov|tv)/",
        "action": 1,
        "nextLink": "//a[@class='a1' and text()='下一页']",
        "pageElement": ".index-tj",
        "replaceElement": ".page",
        "wait": "let img=doc.querySelector('ul.main img');return img!=null",
        "css": ".pagetual_pageBar{margin-top:-10px!important;}.mb {margin-bottom: 10px!important;}"
    },
    {
        "name": "libgen.rs",
        "example": "http://libgen.rs/search.php?&req=The+Way+Out&phrase=1&view=simple&column=def&sort=def&sortmode=ASC&page=1",
        "url": "^https?://libgen\\.rs/",
        "action": 1,
        "waitElement": [
            "//td[span/strong]"
        ],
        "nextLink": "//td[span/strong]/following-sibling::td[1]//a | //table/tbody/tr/td/font[@color]/a",
        "pageElement": "//tr[td[@nowrap]]",
        "replaceElement": "//div[contains(@class,'paginator')] | //table[tbody/tr/td/font[@color]]"
    },
    {
        "name": "99images",
        "example": "https://www.99images.com/celebrities/aisha-sharma",
        "url": "^https?://www.99images.com/",
        "action": 1,
        "init": "document.querySelectorAll('.gallery-images-container').forEach(e=>{e.nextElementSibling.remove()})",
        "nextLink": "a[rel='next']",
        "pageElement": ".gallery-images-container",
        "replaceElement": ".pagination"
    },
    {
        "name": "steamcommunity.com",
        "url": "^https?://steamcommunity\\.com/",
        "include": ".workshopBrowsePaging",
        "nextLink": "a.pagebtn:last-child",
        "pageElement": ".workshopBrowseItems",
        "replaceElement": ".workshopBrowsePaging",
        "pageAction": "let ps=document.querySelectorAll('.workshopBrowseItems');let last=ps.length-1;ps[last].querySelectorAll('script').forEach(e=>{eval(e.innerHTML)})",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "游研社",
        "example": "https://www.yystv.cn/docs",
        "url": "^https?://www\\.yystv\\.cn/",
        "action": 1,
        "nextLinkByJs": "let next = doc.querySelector('.cur-page+li'); if (next) return location.origin + location.pathname + '?page=' + next.innerText",
        "pageElement": ".list-container>li,.video-list,.img-mode",
        "replaceElement": ".page-list",
        "css": ".pagetual_pageBar{margin-top:-5px!important}",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);gae('.scale-img').forEach(e=>{e.style=e.getAttribute('style')});setTimeout(()=>{let ls=gae('.page-num-list li:not([class])');let lp=location.pathname;ls.forEach(e=>{let p=e.innerText;let link=lp+'?page='+p;let ps=`location.href='${link}'`;e.setAttribute('onclick',ps)});let h=ge('.page-list>li:nth-child(1)');let gohp=`location.href='${lp}'`;h.setAttribute('onclick',gohp);let n=ge('.page-list>li:nth-child(2)');let np=ge('.cur-page+li');if(n&&np){let link=lp+'?page='+np.innerText;let next=`location.href='${link}'`;n.setAttribute('onclick',next)}else{n.removeAttribute('onclick')}let input=ge('.page-list-custom-input');input.addEventListener('keydown',(e)=>{let key=window.event?e.keyCode:e.which;if(key=='13'){let url=location.href.replace(/\\?page=\\d+/,'');if(input.value>0)location.href=url+'?page='+input.value}})},500)"
    },
    {
        "name": "Vilipix",
        "example": "https://www.vilipix.com/new",
        "url": "^https?://www\\.vilipix\\.com/",
        "action": 2,
        "nextLinkByJs": "let next=doc.querySelector('li.number.active+li.number');if(next)return location.origin+location.pathname+'?p='+next.innerText",
        "pageElement": "ul.illust-content",
        "replaceElement": "ul.el-pager",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);setTimeout(()=>{let cpn=ge('.el-pager>.number.active').innerText;let ps=gae('.el-pager>.number:not(.active)');let lp=location.pathname;ps.forEach(e=>{let p=e.innerText;let lpp=lp+'?p='+p;let link=`location.href='${lpp}'`;e.setAttribute('onclick',link)});let pb=ge('button.btn-prev');if(pb){if(cpn>1){pb.removeAttribute('disabled');let p=cpn-1;let lpp=lp+'?p='+p;let link=`location.href='${lpp}'`;pb.setAttribute('onclick',link)}}let nb=ge('button.btn-next');if(nb){let last=ge('.el-pager>li.active:last-child');if(last){nb.setAttribute('disabled','disabled')}else{let npn=ge('.el-pager>.number.active+li').innerText;let p=parseInt(cpn)+1;let lpp=lp+'?p='+p;let link=`location.href='${lpp}'`;nb.setAttribute('onclick',link)}}},500)"
    },
    {
        "name": "吐槽弹幕网 - 搜索页",
        "example": "https://www.tucao.lol/index.php?m=content&c=search&a=init&catid=24&dosubmit=1&orderby=a.id+DESC&info%5Btitle%5D=%E8%BD%AC%E7%94%9F&page=3",
        "action": 1,
        "url": "^https?://www\\.tucao\\.[a-z]{3}/index\\.php\\?",
        "nextLink": "//a[@class='a1' and contains(text(), '下一页')]",
        "pageElement": "//div[div[@class='search_info']]",
        "replaceElement": ".newpages",
        "css": ".pagetual_pageBar{margin-bottom:0px!important}.pagetual_pageBar+div{margin-top:10px!important}"
    },
    {
        "name": "吐槽弹幕网",
        "example": "https://www.tucao.lol/list/7/",
        "url": "^https?://www\\.tucao\\.[a-z]{3}/",
        "nextLink": ".pagego a",
        "pageElement": ".list>ul",
        "replaceElement": ".newpages,.pagego,#float_sho"
    },
    {
        "name": "ZzzFun 动漫",
        "example": "http://www.zzzfun.com/vod_type_id_1.html",
        "url": "^https?://www\\.zzzfun\\.com/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".main-guide>.search-result>a",
        "replaceElement": "#page",
        "pageBar": 0
    },
    {
        "name": "91 美剧网",
        "example": "https://91mjw.vip/category/dianying",
        "url": "^https?://(91mjw|91mj)\\.vip/",
        "nextLink": ".next-page>a",
        "pageElement": ".m-movies>.u-movie",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "核桃影院",
        "example": "http://kkkk.plus/vodshow/1-----------.html",
        "url": "^https?://kkkk\\.plus/",
        "nextLink": ".page-next",
        "pageElement": ".module-items",
        "replaceElement": "#page",
        "css": ".pagetual_pageBar{margin-bottom:20px!important}"
    },
    {
        "name": "低端影视",
        "example": "https://ddys.tv/category/movie/",
        "url": "^https?://ddys\\d?\\.[a-z]{2,3}/",
        "nextLink": "a.next",
        "pageElement": ".post-box-list",
        "replaceElement": ".pagination_wrap",
        "pageBar": 0
    },
    {
        "name": "马克喵",
        "example": "https://www.macat.vip/%e5%ad%97%e4%bd%93",
        "url": "^https?://www\\.macat\\.vip/",
        "include": ".posts-wrapper.row",
        "nextLink": ".next",
        "pageElement": ".posts-wrapper>div",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "电影狗",
        "example": "https://www.dianyinggou.com/yingku/",
        "url": "^https?://www\\.dianyinggou\\.com/",
        "nextLink": ".mainPage li.selected+li>a",
        "pageElement": ".movies,.celebrity,.cntBox.articles",
        "replaceElement": ".mainPage ",
        "lazyImgSrc": "data-url",
        "css": ".movies+.pagetual_pageBar,.celebrity+.pagetual_pageBar{margin-top:-40px!important}"
    },
    {
        "name": "厂长资源",
        "example": "https://czzy01.com/",
        "url": "^https?://[^/]+/",
        "include": "//title[contains(text(),'厂长资源')]",
        "nextLink": ".current+a",
        "pageElement": ".bt_img>ul",
        "replaceElement": ".pagenavi_txt",
        "pageBar": 0
    },
    {
        "name": "NO视频",
        "example": "https://www.novipnoad.com/movie/",
        "url": "^https?://www\\.novipnoad\\.com/",
        "nextLink": "a.nextpostslink",
        "pageElement": "//div[div[@id and contains(@class,'video-item')] and contains(@class,'col-md-3')] | //div[@id and contains(@class,'blog-item video-item')]",
        "replaceElement": ".wp-pagenavi",
        "pageBar": 0
    },
    {
        "name": "115看劇 - 分類",
        "example": "https://115kanju.com/center",
        "url": "^https?://115kanju\\.com/",
        "nextLink": "li[title='下一页']",
        "pageElement": "//div[div/div/a/img[@alt]]",
        "replaceElement": ".ant-pagination",
        "css": ".pagetual_pageBar{margin-bottom:20px!important}"
    },
    {
        "name": "飛極速線上",
        "example": "http://www.fjisu2.com/acg/japan/",
        "url": "^https?://(www\\.|m\\.)?(fjisu|feijisu)\\d+\\.com/\\w+/\\w+/",
        "action": 1,
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".b-listtab,.picTxt>.picTxt",
        "replaceElement": ".pages",
        "css": ".pagetual_pageBar+div {margin-top: -10px !important;}"
    },
    {
        "name": "淘豆网 - 閱讀",
        "example": "https://m.taodocs.com/p-118668992.html",
        "url": "^https?://m\\.taodocs\\.com/",
        "autoClick": ".view",
        "loadMore": "#moreBtn"
    },
    {
        "name": "200btsow.vip",
        "example": "https://200btsow.vip/",
        "url": "^https?://200btsow\\.vip/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//tr[td/a[@title]]",
        "replaceElement": "//a[text()='下一页']",
        "pageBar": 0
    },
    {
        "name": "onehu.xyz",
        "example": "https://onehu.xyz/",
        "url": "^https?://onehu\\.xyz/",
        "nextLink": "span.current+a",
        "pageElement": "//div[article]",
        "replaceElement": "#pagination",
        "pageBar": 0
    },
    {
        "name": "www.thingiverse.com",
        "example": "https://www.thingiverse.com/",
        "url": "^https?://www\\.thingiverse\\.com/",
        "action": 1,
        "waitElement": [
            "img[alt='Make Card'][loading]"
        ],
        "nextLink": "//a[div[span[text()='More']]]",
        "pageElement": "[class^='SearchResult__searchResultItems']",
        "replaceElement": "[class^='Pagination__pagination']",
        "css": ".pagetual_pageBar{margin-top:2px!important;margin-bottom:0px!important}"
    },
    {
        "name": "https://www.orcy.net.cn/",
        "example": "https://www.orcy.net.cn/",
        "url": "^https?://www\\.orcy\\.net\\.cn/",
        "nextLink": ".nextpostslink",
        "pageElement": ".Article__content",
        "replaceElement": ".wp-pagenavi"
    },
    {
        "name": "小众软件",
        "example": "https://www.appinn.com/abouttime/amp/",
        "url": "^https?://www\\.appinn\\.com/",
        "nextLink": "a.next,.next>a",
        "pageElement": "article,.amp-post-title,.amp-featured-image,.cntn-wrp",
        "replaceElement": "#pagination,.pagination,.sp-lt,.s_stk",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "ijtsrd.com",
        "example": "https://www.ijtsrd.com/archive/21/volume-3/issue-4",
        "url": "^https?://www\\.ijtsrd\\.com/",
        "include": "//ul[li[@class='active'] and @class='pagination']/following-sibling::ul[1]//a[@href]",
        "nextLinkByJs": "let gx=x=>doc.evaluate(x,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let next=gx(\"//ul[li[@class='active'] and @class='pagination']/following-sibling::ul[1]//a[@href]\");if(next)return location.href.replace(/\\/p-\\d+$/,'')+'/p-'+next.innerText",
        "pageElement": ".mGrid",
        "replaceElement": "ul.pagination"
    },
    {
        "name": "scloud.ws",
        "url": "^https?://scloud\\.ws/",
        "nextLink": ".js-ls-pagination-next",
        "pageElement": ".topic-card-wrapper"
    },
    {
        "name": "Winaero",
        "example": "https://winaero.com/category/windows-10/",
        "url": "^https?://winaero\\.com/",
        "nextLink": "a.next",
        "pageElement": "#main>article",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "cahdroid",
        "example": "https://cahdroid.com/",
        "url": "^https?://cahdroid\\.com/",
        "include": ".pagination",
        "nextLink": "span.page-numbers.current+a",
        "pageElement": ".relat,.post-show",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "4download",
        "example": "https://4download.net/software/",
        "url": "^https?://4download\\.net/",
        "include": ".pagi-nav.clearfix.ignore-select",
        "nextLink": "span.pnext>a",
        "pageElement": ".short-item",
        "replaceElement": ".pagi-nav",
        "rate": 2,
        "pageBar": 0
    },
    {
        "name": "docs.oracle.com",
        "example": "https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html",
        "url": "^https?://docs\\.oracle\\.com/",
        "action": 2,
        "nextLink": "//a[text()='Next']",
        "pageElement": ".chapter,.index,.appendix"
    },
    {
        "name": "w3school.com.cn",
        "example": "https://www.w3school.com.cn/js/index.asp",
        "url": "^https?://www\\.w3school\\.com\\.cn/",
        "action": 1,
        "nextLinkByJs": "let next=doc.querySelector('li.next>a[href]');if(next&&next.href.indexOf('/index.')===-1)return next.href",
        "pageElement": "#maincontent>*:not([class*='prenextnav']):not(#bpn):not(#tpn)",
        "replaceElement": "ul.prenext, #navsecond",
        "insert": "id('bpn') | //div[contains(@class, 'prenextnav')][last()]",
        "insertPos": 1,
        "pageBarText": 1,
        "initRun": 1,
        "autoLoadNum": 2
    },
    {
        "name": "菜鸟教程 - 分类页",
        "example": "https://www.runoob.com/w3cnote",
        "url": "^https?://www\\.runoob\\.com/w3cnote",
        "nextLink": "li.next-page>a",
        "pageElement": ".archive-list>.archive-list-item",
        "replaceElement": "#wp_page_numbers"
    },
    {
        "name": "菜鸟教程 - 文章页",
        "example": "https://www.runoob.com/js/js-tutorial.html",
        "url": "^https?://www\\.runoob\\.com/[a-z/-]+\\.html",
        "action": 1,
        "nextLink": "a[style^='b']+a,a[style^='b']+br+h2+a",
        "pageElement": ".article-heading, .article-body",
        "waitElement": [
            "a[target='_top'][style^='background']"
        ],
        "replaceElement": ".sidebar-box"
    },
    {
        "name": "奔跑中的奶酪",
        "example": "http://www.runningcheese.com/",
        "url": "^https?://www\\.runningcheese\\.com/",
        "nextLink": "a.next",
        "pageElement": ".ajaxpost",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "423down",
        "example": "https://www.423down.com/",
        "url": "^https?://www\\.423down\\.com/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".content>.excerpt, .commentlist>li",
        "replaceElement": ".paging, .pagenav",
        "pageBar": 0
    },
    {
        "name": "大眼仔旭",
        "example": "http://www.dayanzai.me/",
        "url": "^https?://www\\.dayanzai\\.me/",
        "nextLink": ".page>span+a",
        "pageElement": "ul.c-news",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "果核剥壳",
        "example": "https://www.ghxi.com/category/all/pcsoft",
        "url": "^https?://www\\.ghxi\\.com/",
        "nextLink": "a.next",
        "pageElement": "ul.post-loop>.item",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "億破姐&電腦系統吧",
        "example": "http://www.dnxitong.com/soft/",
        "url": "^https?://www\\.(ypojie|dnxitong)\\.com/",
        "nextLink": ".next-page>a",
        "pageElement": "article[class^='excerpt excerpt-']",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "FC Portables",
        "example": "https://www.fcportables.com/",
        "url": "^https?://www\\.fcportables\\.com/",
        "nextLink": "a.next",
        "pageElement": "article[class^='post']",
        "replaceElement": ".pagination",
        "pageInit": "doc.querySelectorAll('a.img-holder').forEach(a=>{a.style.backgroundImage=`url('${a.dataset.src}')`;a.classList.add('b-loaded');a.removeAttribute('data-src')})",
        "pageBar": 0
    },
    {
        "name": "KaranPc",
        "example": "https://karanpc.com/windows/download-managers/",
        "url": "^https?://karanpc\\.com/",
        "include": "#nav-below",
        "nextLink": "a.next",
        "pageElement": "article[id^='post']",
        "replaceElement": "#nav-below",
        "pageBar": 0
    },
    {
        "name": "阿榮福利味",
        "example": "https://www.azofreeware.com/",
        "url": "^https?://www\\.azofreeware\\.com/",
        "action": 1,
        "nextLink": ".blog-pager-older-link",
        "pageElement": ".blog-posts.hfeed",
        "replaceElement": "#blog-pager"
    },
    {
        "name": "Apkpure",
        "example": "https://apkpure.com/tw/game",
        "url": "^https?://apkpure\\.com/",
        "nextLink": "a.loadmore",
        "pageElement": "#pagedata",
        "replaceElement": ".loadmore",
        "pageBar": 0
    },
    {
        "name": "軟體部落",
        "example": "https://softblog.tw/green-portable",
        "url": "^https?://softblog\\.tw/",
        "include": ".page-numbers",
        "nextLink": "a.next",
        "pageElement": "#blog-entries",
        "replaceElement": ".oceanwp-pagination.clr",
        "pageBar": 0
    },
    {
        "name": "Gdaily",
        "example": "https://www.gdaily.org/software",
        "url": "^https?://www\\.gdaily\\.org/(search|software|app|online|teaching)",
        "init": "document.querySelectorAll('.adsbygoogle').forEach(e=>{e.parentNode.parentNode.remove()})",
        "nextLink": "li.active+li>a",
        "pageElement": ".columns .column",
        "replaceElement": ".navigation",
        "pageInit": "doc.querySelectorAll('.adsbygoogle').forEach(e=>{e.parentNode.parentNode.remove()})",
        "pageBar": 0
    },
    {
        "name": "94i.in - 自動簽到",
        "example": "https://94i.in/",
        "url": "^https?://94i\\.in/",
        "autoClick": "#pper_a:not([style='display: none;'])"
    },
    {
        "name": "Mobile01 - 手機版內文",
        "example": "https://m.mobile01.com/topicdetail.php?f=300&t=6660682",
        "url": "^https?://m\\.mobile01\\.com/topicdetail",
        "nextLink": ".c-pagination--next",
        "pageElement": ".u-gapNextV--lg>.u-gapNextV--md",
        "replaceElement": ".u-gapNextV--lg.u-tac",
        "pageBar": 0,
        "rate": 2,
        "sleep": 1000
    },
    {
        "name": "Mobile01 - 內文",
        "example": "https://www.mobile01.com/topicdetail.php?f=300&t=6660682",
        "url": "^https?://www\\.mobile01\\.com/topicdetail",
        "nextLink": "li.l-pagination__page.is-active+li>a",
        "pageElement": "//div[(div/@class='l-articlePage__author') and @class='l-articlePage']",
        "replaceElement": "ul.l-pagination",
        "pageBar": 0,
        "rate": 2,
        "sleep": 1000
    },
    {
        "name": "Mobile01 - 文章列表",
        "example": "https://www.mobile01.com/topiclist.php?f=300",
        "url": "^https?://(www|m)\\.mobile01\\.com/(forumtopic|topiclist)",
        "nextLink": "li.l-pagination__page.is-active+li>a,.c-pagination--next",
        "pageElement": ".l-listTable__tbody,.u-gapNextV--lg>.u-gapNextV--lg>div[class$='u-gapNextV--lg'] .l-articleList",
        "replaceElement": ".l-tabulate__action,.l-pagination",
        "rate": 3,
        "sleep": 2000
    },
    {
        "name": "巴哈姆特 - 內文",
        "example": "https://forum.gamer.com.tw/C.php?bsn=23805&snA=610529&tnum=14858",
        "url": "^https?://forum\\.gamer\\.com.tw/C\\.php",
        "nextLink": "a.next",
        "pageElement": ".c-section[id*='post']",
        "replaceElement": [
            "div.forum-ad_top+section>.c-section__main>#BH-pagebtn",
            "section+section>.c-section__main>#BH-pagebtn"
        ],
        "pageBar": 0
    },
    {
        "name": "巴哈姆特 - 文章列表",
        "example": "https://forum.gamer.com.tw/B.php?bsn=23805",
        "url": "^https?://forum\\.gamer\\.com.tw/B\\.php",
        "nextLink": "a.next",
        "pageElement": ".b-list>tbody>tr:not(.b-list__head)",
        "replaceElement": [
            ".forum-ad_top+.b-pager.pager",
            ".b-popular.popular+.b-pager.pager"
        ],
        "pageAction": "Forum.B.lazyThumbnail();Forum.Common.drawNoImageCanvas()",
        "pageBar": 0
    },
    {
        "name": "Erowall.com",
        "example": "https://erowall.com/",
        "url": "^https?://erowall\\.com/",
        "nextLink": "//a[contains(text(),'Next')]",
        "pageElement": ".wpmini",
        "replaceElement": ".paginator",
        "pageBar": 0
    },
    {
        "name": "ftopx.com",
        "example": "https://ftopx.com/",
        "url": "^https?://ftopx\\.com/",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[div[@class='thumbnail']]",
        "replaceElement": "#pagination",
        "pageBar": 0
    },
    {
        "name": "448人体艺术",
        "example": "https://488xm.com/666rentiyishu/",
        "url": "^https?://488xm\\.com/\\w+/",
        "pageElement": "#container>.grid",
        "replaceElement": ".pagelist"
    },
    {
        "name": "gogo人体艺术 - 圖片",
        "example": "https://gogortrt.com/gmgqdd/1305/",
        "url": "^https?://gogortrt\\.[a-z]{2,3}/[a-z]+/\\d+/",
        "init": "let a=document.querySelector('.main>div:not(.atc_new_head)>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".main>div:not(.atc_new_head):not(.keywords) img[alt]",
        "replaceElement": ".Mrlsr55,.RlpeZsp,.cgdijkn,.d70rZyL,.i09cWt8,.pages,.pfb45A1,.vd7O8HI,.wpwRCvy,.zrLIsoJ",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "gogo人体艺术",
        "example": "https://gogortrt.com/gmgqdd/",
        "url": "^https?://gogortrt\\.[a-z]{2,3}/[a-z]+/",
        "include": ".index_list",
        "nextLink": "//a[text()='下一页' and contains(@href,'html')]",
        "pageElement": ".ulPic",
        "replaceElement": ".pages",
        "pageBar": 0,
        "css": "iframe{height:55px!important}"
    },
    {
        "name": "956体艺术 - 圖片",
        "example": "https://956n.com/rbddszysz/1398/",
        "url": "^https?://956[a-z]{1,2}\\.[a-z]{2,3}/[a-z]+/\\d+/(\\d+\\.html$)?",
        "init": "document.querySelectorAll('.content>a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//a[text()='下一页' and contains(@href,'html')]",
        "pageElement": ".content img[alt]",
        "replaceElement": ".page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "956人体艺术",
        "example": "https://956n.com/rbddszysz/",
        "url": "^https?://956[a-z]{1,2}\\.[a-z]{2,3}/",
        "exclude": ".title",
        "nextLink": "//a[text()='下一页' and contains(@href,'html')]",
        "pageElement": "//ul[li/a/@title]",
        "replaceElement": ".page",
        "css": ".pagetual_pageBar{margin-top:0px!important;margin-bottom:0px!important}"
    },
    {
        "name": "666人体艺术 - 圖片",
        "example": "https://6666rt.com/ArtZG/2152/1.html",
        "url": "^https?://[6]{3,4}[a-z]{2}\\.[a-z]{2,3}/[a-zA-Z]+/\\d+/\\d+\\.html",
        "init": "document.querySelectorAll('.imgbox>a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//a[text()='下一页 >>' and contains(@href,'html')]",
        "pageElement": ".imgbox img[alt]",
        "replaceElement": ".page,span>h1,.www",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "img[alt]{margin-top:0px!important;margin-bottom:0px!important}.dis{display:none!important}"
    },
    {
        "name": "666人体艺术",
        "example": "https://6666rt.com/ArtZG/",
        "url": "^https?://[6]{3,4}[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".tpm02>.fzltp>ul",
        "replaceElement": ".pagelist"
    },
    {
        "name": "64体艺术 - 圖片",
        "example": "http://www.64ay.com/xxrtddbkxb/313.html",
        "url": "^https?://www\\.64[a-z]{2}\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "init": "document.querySelectorAll('.tu>a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".tu img[alt]",
        "replaceElement": ".page-show",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "img[alt]{margin-top:0px!important;margin-bottom:0px!important}"
    },
    {
        "name": "64人体艺术",
        "example": "http://www.64ay.com/xxrtddbkxb/",
        "url": "^https?://www\\.64[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".tu_list",
        "replaceElement": ".page-show",
        "css": ".wzlist{height:auto!important}"
    },
    {
        "name": "98体艺术 - 圖片",
        "example": "http://www.98ah.com/GOGOqqddgqrt/415.html",
        "url": "^https?://www\\.98[a-z]{2}\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "init": "let a=document.querySelector('.content-pic>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".content-pic img[alt]",
        "replaceElement": ".page-show",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "img[alt]{margin-top:0px!important;margin-bottom:0px!important}"
    },
    {
        "name": "98人体艺术",
        "example": "http://www.98ah.com/gogoltmnysxz/",
        "url": "^https?://www\\.98[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".main>dl>dd",
        "replaceElement": ".page-show"
    },
    {
        "name": "54体艺术 - 圖片",
        "example": "http://www.54aj.com/gogogmbspqq/432.html",
        "url": "^https?://www\\.54[a-z]{2}\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "init": "let a=document.querySelector('.content>a:not([href*=tags])');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".content img[alt]",
        "replaceElement": ".page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "54人体艺术",
        "example": "http://www.54aj.com/gogogmbspqq/",
        "url": "^https?://www\\.54[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//div[(li/a/img/@alt) and @class='yyy']",
        "replaceElement": ".page"
    },
    {
        "name": "48人体艺术 - 圖片",
        "example": "http://www.48gd.com/yyrtdd/448.html",
        "url": "^https?://www\\.48[a-z]{2}\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "init": "let a=document.querySelector('#content>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "#content img[alt]",
        "replaceElement": ".pagelist,h3",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "48人体艺术",
        "example": "http://www.48gd.com/qltysz/",
        "url": "^https?://www\\.48[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".grid",
        "replaceElement": ".pagelist"
    },
    {
        "name": "42人体艺术 - 圖片",
        "example": "http://www.42jd.com/ddrGOGOtysgq/417.html",
        "url": "^https?://www\\.42[a-z]{2}\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "action": 1,
        "init": "let a=document.querySelector('.imgbox>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".imgbox img[alt]",
        "replaceElement": ".pagelist,.imgbox>h1",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "42人体艺术 - 搜索",
        "example": "http://www.42jd.com/plus/search.php?keyword=%E7%BE%8E%E5%A5%B3&searchtype=titlekeyword&channeltype=0&orderby=&kwtype=0&pagesize=24&typeid=0&TotalResult=50&PageNo=1",
        "url": "^https?://www\\.[0-9]{2}[a-z]{2}\\.[a-z]{2,3}/plus/search\\.php",
        "action": 1,
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//ul[li/a/@title]",
        "replaceElement": ".page-show"
    },
    {
        "name": "42人体艺术",
        "example": "http://www.42jd.com/ddxxltmnrt/",
        "url": "^https?://www\\.42[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".fzltp>ul",
        "replaceElement": ".pagelist"
    },
    {
        "name": "36人体艺术 - 圖片",
        "example": "www.36ut.com，xixirt.org",
        "url": "^https?://(www\\.)?(36[a-z]{2}|xixirt)\\.[a-z]{2,3}/[a-z]+/(\\d+/|\\d+(_\\d+)?\\.html)",
        "action": 1,
        "init": "let a=document.querySelector('.pp>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".pp img",
        "replaceElement": ".page-show",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".picTip{display:none!important}"
    },
    {
        "name": "36人体艺术",
        "example": "www.36ut.com，xixirt.org",
        "url": "^https?://(www\\.)?(36[a-z]{2}|xixirt)\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".detail-list",
        "replaceElement": ".page-show",
        "css": ".pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "23人体艺术 - 圖片",
        "example": "http://www.23fe.com/gogoddppys/435.html",
        "url": "^https?://www\\.23[a-z]{2}\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "action": 1,
        "init": "let a=document.querySelector('#content-p a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "#content-p img",
        "replaceElement": ".gengduo",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "img[alt]{margin-bottom:0px!important}"
    },
    {
        "name": "23人体艺术",
        "example": "http://www.23fe.com/gogoddppys/",
        "url": "^https?://www\\.23[a-z]{2}\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".fitCont_2>ul",
        "replaceElement": ".gengduo"
    },
    {
        "name": "AJ人体艺术 - 圖片",
        "example": "https://www.02aj.com/yzrt/8674.html",
        "url": "^https?://www\\.02aj\\.[a-z]{2,3}/[a-z]+/\\d+(_\\d+)?\\.html",
        "action": 1,
        "init": "document.querySelectorAll('.content>a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".content img",
        "replaceElement": ".paging",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "img[alt]{margin-bottom:0px!important}"
    },
    {
        "name": "AJ人体艺术",
        "example": "https://www.02aj.com/yzrt/",
        "url": "^https?://www\\.\\d+aj\\.[a-z]{2,3}/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//div[(div/div/a/img/@alt) and @class='list']",
        "replaceElement": ".page-list",
        "css": ".pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "139人体艺术手機版 - 圖片",
        "example": "https://m.139tu.com/rtysyz/20200710/7479.html",
        "url": "^https?://(m|wap)\\.([0-9]{2,4}[a-z]{1,5}|[a-z]{2,5}[0-9]{1,3}|\\d+aj|\\d+|xixirt|gogortrt|7m11)\\.[a-z]{2,3}/[a-zA-Z]+/(\\d+/(\\d+\\.html$)?|\\d+(_\\d+)?\\.html$|\\d+/\\d+(_\\d+)?\\.html$)",
        "init": "document.querySelectorAll('.tal>a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".tal img[alt]",
        "replaceElement": ".page,body>[style='font-size:14px;'],.tip",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "[style='margin:3px 0 0 0;']{display:none!important}img[alt]{opacity: 1!important}"
    },
    {
        "name": "139人体艺术手機版",
        "example": "88rtys.com，https://m.139tu.com/rtysyz/",
        "url": "^https?://(m|wap)\\.([0-9]{2,4}[a-z]{1,5}|[a-z]{2,5}[0-9]{1,3}|\\d+aj|\\d+|xixirt|gogortrt|7m11)\\.[a-z]{2,3}/",
        "include": ".page-show",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".listmain",
        "replaceElement": ".page-show",
        "lazyImgSrc": "lazysrc",
        "css": "[style='margin:3px 0 0 0;']{display:none!important}img[alt]{opacity: 1!important}"
    },
    {
        "name": "139人体艺术 - 圖片",
        "example": "https://www.139tu.com/rtysyz/20210829/8674.html",
        "url": "^https?://www\\.139tu\\.[a-z]{2,3}/[a-z]+/\\d+/\\d+(_\\d+)?\\.html",
        "action": 1,
        "init": "document.querySelectorAll('.img_box>a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".img_box img",
        "replaceElement": "#pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "139人体艺术",
        "example": "88rtys.com，https://www.139tu.com/rtysyz/",
        "url": "^https?://www\\.139tu\\.[a-z]{2,3}/",
        "include": ".list_tags",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".list-box",
        "replaceElement": "#pages",
        "lazyImgSrc": "data-echo",
        "css": ".pagetual_pageBar{margin-top:4px!important}"
    },
    {
        "name": "GOGO人体艺术 - 圖片",
        "example": "http://www.gogort2.com/html/yazhou/9988.html",
        "url": "^https?://www\\.gogort\\d?\\.[a-z]{2,3}/html/\\w+/\\d+(_\\d+)?\\.html$",
        "action": 1,
        "init": "document.querySelectorAll('.main>div>a[title]').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "span+a:not(.a1)",
        "pageElement": ".avrquwl img,.stmyzbx img,.cgdijkk img,.pwb45A1 img,.wppRCvy img,.zKLIsoJ img,.RlHeZsp img,.d70qZyL img,.vI7O8HI img,.i099Wt8 img,.Mrlhr55 img,.ApxBGcj img,.O5hE1YO img,.bFzVVIb img,.cgKhHJm img,.NpowfkG img,.fFva0bX img,.ARSR2Ka img,.flZ0dv3 img,.oP7WdAw img,.wd8SrVn img,.UsP0xCk img,.yH0NSlb img,.HStHSH0 img,.re8tbBu img",
        "replaceElement": "//div[a/@class='a1']",
        "css": ".main>iframe{display:none!important}iframe{height:55px!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "GOGO人体艺术 - 標籤",
        "example": "http://www.gogort2.net/index.php?m=content&c=tag&a=lists&tag=%B3%AC%B4%F3%B3%DF%B6%C8",
        "url": "^https?://www\\.gogort\\d?\\.[a-z]{2,3}/index\\.php\\?m=content&c=tag",
        "nextLink": "span+a:not(.a1)",
        "pageElement": ".search_list ul",
        "replaceElement": ".pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "10"
    },
    {
        "name": "GOGO人体艺术 - 搜索",
        "example": "http://www.gogort2.com/index.php?m=search&c=index&a=init&typeid=&siteid=1&q=%B4%F3%B5%A8",
        "url": "^https?://www\\.gogort\\d?\\.[a-z]{2,3}/index\\.php\\?m=search",
        "nextLink": "span+a:not(.a1)",
        "pageElement": ".search_content",
        "replaceElement": ".pages",
        "pageBar": 0
    },
    {
        "name": "GOGO人体艺术",
        "example": "http://www.gogort2.com/html/yazhou/index_2.html",
        "url": "^https?://www\\.gogort\\d?\\.[a-z]{2,3}/html/[a-z]+/(index_\\d+\\.html)?",
        "include": ".index_list",
        "nextLink": "span+a:not(.a1)",
        "pageElement": ".ulPic",
        "replaceElement": ".pages",
        "pageBar": 0,
        "css": "iframe{height:55px!important}"
    },
    {
        "name": "图集岛",
        "example": "https://www.tujidao03.com/u/?action=gengxin",
        "url": "^https?://www\\.tujidao\\d+\\.com/",
        "nextLink": ".num+.next",
        "pageElement": ".hezi>ul",
        "replaceElement": "#pages"
    },
    {
        "name": "Kemono - post",
        "example": "https://kemono.party/fantia/user/17148/post/1528173",
        "url": "^https?://kemono\\.party/fantia/user/\\d+/post/\\d+$",
        "nextLink": ".post__nav-item>a.next",
        "pageElement": ".post__header,.post__body"
    },
    {
        "name": "Kemono - user",
        "example": "https://kemono.party/fantia/user/17148?o=0",
        "url": "^https?://kemono\\.party/fantia/user/\\d+\\?o=",
        "nextLink": "a.pagination-button-after-current",
        "stopSign": [
            "",
            "li.pagination-button-disabled.pagination-button-current+li.pagination-button-disabled.pagination-button-after-current"
        ],
        "pageElement": ".card-list__items>article",
        "pageBar": 0
    },
    {
        "name": "Kemono - posts",
        "example": "https://kemono.party/posts",
        "url": "^https?://kemono\\.party/posts",
        "nextLink": "a.pagination-button-after-current",
        "stopSign": [
            "",
            ".card-list__item--no-results"
        ],
        "pageElement": ".card-list.card-list--legacy"
    },
    {
        "name": "全图网 - 圖片 - 直接載入全部圖片",
        "example": "http://qq.quantuwang1.com/m/fb9deaa66efefa21.html，http://m.54mn.cc/m/29491/1.html",
        "url": "^https?://(qq?|t|w|m)\\.(quantuwang\\d?|54mn)\\.(com|cc)/m/",
        "include": [
            ".index_c_img img[alt]",
            ".index_c_page"
        ],
        "pinUrl": true,
        "nextLink": "0",
        "init": "let ge=e=>document.querySelector(e);let end=ge('.index_c_page>a:last-child').innerText;let m=ge('.index_c_img img').src.match(/(^.+\\/)(\\d+)(\\.[a-z]{3}$)/);let path=m[1];let start=m[2];let ex=m[3];let max=parseInt(end)+parseInt(start)-1;let _img='';for(let i=start;i<=max;i++){let imgSrc=path+i+ex;let p;if(i<10){p='00'+i}else if(i<100){p='0'+i}else{p=i}let alt=ge('.index_c_title').innerText+'_P'+p;_img+=`<img src='${imgSrc}'alt='${alt}'>`};ge('.index_c_img').innerHTML=_img;",
        "css": "body>[style*='z-index'],img[src*='/aaa/'],.index_c_page{display:none!important}body{padding-bottom:0px!important}"
    },
    {
        "name": "全图网 - 分類",
        "example": "http://qq.quantuwang1.com/meinv/taotu/，http://m.54mn.cc/meinv/taotu/",
        "url": "^https?://(qq?|t|w|m)\\.(quantuwang\\d?|54mn)\\.(com|cc)/",
        "exclude": ".index_c_img img[alt]",
        "nextLink": "span+a",
        "pageElement": ".index_middle_c",
        "replaceElement": ".index_c_page,.list_page",
        "css": "body>[style*='z-index'],img[src*='/aaa/']{display:none!important}"
    },
    {
        "name": "套图之家 - 圖片",
        "example": "https://taotuhome.com/19377.html",
        "url": "^https?://taotuhome\\.com/",
        "nextLink": "span.current+a",
        "pageElement": "//p[img[@alt]]",
        "replaceElement": ".page-links",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "套图之家 - 分類",
        "example": "https://taotuhome.com/category/xgyw/",
        "url": "^https?://taotuhome\\.com/",
        "nextLink": "span.current+a",
        "pageElement": "//main[@id='main'][article/figure[@class='thumbnail']]",
        "replaceElement": ".pagenav-clear",
        "pageBar": 0
    },
    {
        "name": "俊美图 - 圖片",
        "example": "https://www.meijuntu.com/beauty/wanghongnenmo_abbyliya_wanmeishencainvshen_mistar_vol_144.html",
        "url": "^https?://www\\.meijuntu\\.com/",
        "include": ".next_picture",
        "init": "document.querySelectorAll('.pictures>a').forEach(e=>{e.remove()})",
        "nextLink": ".pages>span +a:not(.a1)",
        "pageElement": ".pictures>img[alt]",
        "replaceElement": ".pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "看妹图",
        "example": "https://kanmeitu1.cc/p/",
        "url": "^https?://kanmeitu\\d\\.cc/p/(index_\\d+.html)?",
        "pageElement": ".sou-con-list>ul",
        "replaceElement": ".pages"
    },
    {
        "name": "俊美图 - 分類",
        "example": "https://www.meijuntu.com/beauty/",
        "url": "^https?://www\\.meijuntu\\.com/",
        "exclude": ".next_picture",
        "nextLink": ".pages>span +a:not(.a1)",
        "pageElement": ".pic-list>ul>*",
        "replaceElement": ".th_page"
    },
    {
        "name": "美女图片网 - 圖片",
        "example": "https://www.mevtu.com/xingganmm/15275.html",
        "url": "^https?://www\\.mevtu\\.com/",
        "include": ".page_imges",
        "init": "let a=document.querySelector('.imageclick-href');a.outerHTML=a.innerHTML;",
        "nextLink": "span.current+a:not(.prev)",
        "pageElement": "#image_div img[alt]",
        "replaceElement": ".nav-links,.mbx-nav-right",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#content>a{display:none!important}"
    },
    {
        "name": "美女图片网 - 分類",
        "example": "https://www.mevtu.com/",
        "url": "^https?://www\\.mevtu\\.com/",
        "include": ".nav-links",
        "nextLink": "span.current+a",
        "pageElement": "#index_ajax_list>*",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "Pic Yailay - 圖片",
        "example": "https://pic.yailay.com/articles/UTVKYXJDOFRFVy8zVGlINHUySk1Ldz09.html，https://nungvl.net/gallerys/87379.cg?page=1",
        "url": "^https?://(pic\\.yailay\\.com|nungvl\\.net)/(articles|gallerys)",
        "pinUrl": true,
        "nextLink": "//a[text()='Next >']",
        "pageElement": "img[onerror]+br,img[onerror]",
        "replaceElement": ".article-header>h1,.entry-title,.dept-ct.show-less,.pagination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".spa-title,.spa-title+div{display:none!important}"
    },
    {
        "name": "Pic Yailay",
        "example": "https://pic.yailay.com/?page=1",
        "url": "^https?://(pic\\.yailay\\.com|nungvl\\.net)/",
        "nextLink": ".pagination-next",
        "pageElement": ".blog",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "imhentai.xxx - 圖片",
        "example": "https://imhentai.xxx/view/932112/1/",
        "url": "^https?://imhentai\\.xxx/view/\\d+/\\d+/",
        "nextLink": ".nav_next",
        "pageElement": "#gimg",
        "replaceElement": "span.current",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".nav_pagination,#bar,#footer,.prev_nav.page_prev,.next_nav.page_next{display:none!important}"
    },
    {
        "name": "imhentai.xxx - 圖片清單檢視全部",
        "example": "https://imhentai.xxx/gallery/928466/",
        "url": "^https?://imhentai\\.xxx/gallery/\\d+/$",
        "pinUrl": true,
        "nextLink": "0",
        "init": "let loop=setInterval(()=>{let b=document.querySelector('#load_all:not([style])');if(b){b.click()}if(!b){clearInterval(loop)}},2000)"
    },
    {
        "name": "imhentai.xxx",
        "example": "https://imhentai.xxx/?page=1",
        "url": "^https?://imhentai\\.xxx/(\\?page=\\d+|search)?",
        "nextLink": ".page-item.active+li:not(.disabled)>a",
        "pageElement": ".thumb",
        "replaceElement": ".pagination"
    },
    {
        "name": "nhentai - 閱讀",
        "example": "https://nhentai.net/g/422938/1/",
        "url": "^https?://n(ya)?hentai\\.(net|to|xxx|red)/g/\\d+/\\d+/?",
        "init": "let a = document.querySelector('#image-container>a');a.outerHTML=a.innerHTML;",
        "nextLink": "a.next",
        "stopSign": [
            [
                "span.current",
                "(\\d+)"
            ],
            [
                "span.num-pages",
                "(\\d+)"
            ]
        ],
        "pageElement": "#content>img,.container>img,#image-container",
        "replaceElement": ".reader-pagination,span.current",
        "pageInit": "let a = doc.querySelector('#image-container>a');a.outerHTML=a.innerHTML;",
        "pageAction": "document.querySelectorAll('#image-container').forEach(e=>{e.outerHTML=e.innerHTML});document.querySelectorAll('img').forEach(e=>{e.src=e.src})",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#content>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "nhentai",
        "example": "https://nhentai.net/",
        "url": "^https?://(n(ya)?hentai|cathentai)\\.(net|to|xxx|red)/(search|\\?page=|tags|artists|characters|parodies|groups)?",
        "nextLink": "a.next,a.current+a,a.last,span.next>a",
        "pageElement": "//section[contains(@class,'pagination')]/preceding-sibling::div[1]/div",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar+div{margin-top:0px!important}"
    },
    {
        "name": "Simply Hentai",
        "example": "https://www.simply-hentai.com/",
        "url": "^https?://www\\.simply-hentai\\.com/",
        "pageElement": "//div[div[article[a[div[@class='image-wrapper']/img[@data-src]]]]]",
        "insert": "nav.pagination",
        "insertPos": 1,
        "pageInit": "doc.querySelectorAll('.image-loader').forEach(e=>{e.remove()});",
        "css": ".text-center{display:none!important}"
    },
    {
        "name": "西图阁",
        "example": "https://www.xtg123.cc/xrall",
        "url": "^https?://www\\.xtg123\\.cc/([a-z]+|\\?s=)",
        "nextLink": "a.next",
        "pageElement": ".posts-wrapper>.row",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "妹妹图",
        "example": "https://mm.tvv.tw/",
        "url": "^https?://mm\\.tvv\\.tw/",
        "action": 1,
        "nextLink": "a.next",
        "pageElement": "//div[div/div[@class='blog-image']]",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "留园酷18",
        "example": "https://www.cool18.com/bbs/index.php?app=forum&act=cachepage&cp=tree1",
        "url": "^https?://www\\.cool18\\.com/bbs",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "#d_list",
        "replaceElement": "#d_list_page,#d_list_foot"
    },
    {
        "name": "24tupian - 圖片原圖",
        "example": "https://www.24tupian.org/2022/10-12/tuimo52612_1.html",
        "url": "^https?://www\\.24tupian\\.org/\\d+/[0-9-]+/\\w+\\.html",
        "init": "let a=document.querySelector('#imgshow>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//div[@class='bb']//li[img/@id='bimg']/following-sibling::li[1]/a",
        "pageElement": "#imgshow img",
        "replaceElement": ".bb ul,.hddiv+span",
        "css": "#imgshow img {max-width: 100%;}",
        "pageBar": 0,
        "rate": 3
    },
    {
        "name": "24tupian - 圖片清單",
        "example": "https://www.24tupian.org/hd2/tuimo52612.html",
        "url": "^https?://www\\.24tupian\\.org/hd\\d+/\\w+\\.html",
        "nextLink": "a.on+a[href$=html]",
        "pageElement": ".gtps.fl>ul",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "24tupian",
        "example": "https://www.24tupian.org/",
        "url": "^https?://www\\.24tupian\\.org/(meinv|nvyou|tuimo|gaoqing|model|class|Serch)",
        "nextLink": "a.on+a[href$='html']",
        "pageElement": ".lbleft>.lbl,.paihan.fl>ul,.model,.big.fl>ul,.gtps.fl>ul",
        "replaceElement": ".page"
    },
    {
        "name": "新老友图社 - 看圖",
        "example": "https://m.xtushe.com/photo/10377.html",
        "url": "^https?://m\\.xtushe\\.com/photo/\\w+\\.html",
        "nextLink": "li.next>a[title='下一张']",
        "pageElement": "#content-photo>img",
        "replaceElement": "#content-title,.pagebreak",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "新老友图社",
        "example": "https://m.xtushe.com/catalog/xinggan.html",
        "url": "^https?://m\\.xtushe\\.com/",
        "nextLink": "li.next>a[title='下一页']",
        "pageElement": "#content-list",
        "replaceElement": ".pagebreak",
        "pageBar": 0
    },
    {
        "name": "爱看图吧 - 看圖",
        "example": "https://www.9iktb.com/gallery/46215",
        "url": "^https?://www\\.9iktb\\.com/gallery/",
        "nextLink": "li.active+li>a",
        "pageElement": ".gallery-detail-img",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "爱看图吧",
        "example": "https://www.9iktb.com/galleryList/",
        "url": "^https?://www\\.9iktb\\.com/(galleryList|search)",
        "nextLink": "a[aria-label='Next']",
        "pageElement": ".book-list>*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "美女目录网 - 圖片列表模式載入原圖",
        "example": "https://www.girldir.com/photos/aozhongmaqin_list/",
        "url": "^https?://[^/]+/photos/",
        "include": [
            "//nav[@id='topNavBar']/a[@class='navbar-brand']/img[@src='/assets/logo.png']",
            ".page-item.active",
            "nav.pagination"
        ],
        "action": 1,
        "init": "document.querySelectorAll('source').forEach(e=>{e.remove()});document.querySelectorAll('picture>img').forEach(img=>{img.src=img.src.match(/[^/]+\\/\\/[^/]+\\/[^.]+\\.[a-z]{3}/)[0]})",
        "nextLink": "li.page-item.active+li>a",
        "pageElement": ".photo-list.row",
        "replaceElement": "nav.pagination",
        "pageInit": "doc.querySelectorAll('source').forEach(e=>{e.remove()});doc.querySelectorAll('picture>img').forEach(img=>{img.src=img.src.match(/[^/]+\\/\\/[^/]+\\/[^.]+\\.[a-z]{3}/)[0]})"
    },
    {
        "name": "美女目录网 - 圖片",
        "example": "http://www.girldir.com/photos/lichengmin_1156859/",
        "url": "^https?://[^/]+/photos/",
        "include": "//title[contains(text(), '美女目录网')]",
        "action": 1,
        "init": "function ge(e){return document.querySelector(e)}let a = ge('.photo-box>a');a.outerHTML=a.innerHTML;ge('source').remove()",
        "nextLink": "//a[text()='下一张>']",
        "pageElement": ".photo-box picture img[alt]",
        "replaceElement": ".tools row",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "美女目录网 - 分類停止自動匹配",
        "example": "http://www.girldir.com/star/v_siwa/",
        "url": "^https?://[^/]+/star/",
        "include": "//title[contains(text(), '美女目录网')]",
        "nextLink": "0"
    },
    {
        "name": "3G 壁纸 - 圖片",
        "example": "https://www.3gbizhi.com/meinv/mn1869.html",
        "url": "^https?://www\\.3gbizhi\\.com/meinv/\\w+\\.html",
        "init": "function ge(e){return document.querySelector(e)}ge('#showimg').appendChild(ge('#showpicnow'));document.querySelectorAll('#showimg>a').forEach(e=>{e.remove()})",
        "nextLinkByUrl": [
            "/([^_]+)(_(\\d+))?\\.html$",
            "/$1_{$3+1}.html"
        ],
        "stopSign": [
            [
                ".showtitle>h2",
                "(\\d+)"
            ],
            [
                ".showtitle>h2",
                "\\/(\\d+)"
            ]
        ],
        "pageElement": "#showpicnow",
        "replaceElement": "h2,.showpicboxw",
        "insert": "#showimg",
        "insertPos": 2,
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".morew,#showimg>a{display:none!important}"
    },
    {
        "name": "3G 壁纸",
        "example": "https://www.3gbizhi.com/meinv/",
        "url": "^https?://www\\.3gbizhi\\.com/",
        "init": "document.querySelectorAll('img[alt][lazysrc]').forEach(img=>{img.src=img.getAttribute('lazysrc');img.removeAttribute('lazysrc');img.setAttribute('srcset',img.getAttribute('lazysrc2x'));img.removeAttribute('lazysrc2x');img.style='width: 100%; display: inline;'})",
        "nextLink": "#pageNum span+a",
        "pageElement": "//ul[@class='cl'][li/a[@class='imgw']/div[@class='img']/img]",
        "replaceElement": "#pageNum",
        "pageInit": "doc.querySelectorAll('img[alt][lazysrc]').forEach(img=>{img.src=img.getAttribute('lazysrc');img.removeAttribute('lazysrc');img.setAttribute('srcset',img.getAttribute('lazysrc2x'));img.removeAttribute('lazysrc2x');img.style='width: 100%; display: inline;'})",
        "pageAction": "document.querySelectorAll('img').forEach(img=>{img.src=img.src})",
        "css": ".pagetual_pageBar{margin-top:-8px!important}"
    },
    {
        "name": "nvsheng - 圖片",
        "example": "www.nvsheng.cc，m.nvsheng.cc",
        "url": "^https?://(www|m)\\.nvsheng\\.cc/.+\\.html",
        "nextLink": ".now-page+a",
        "pageElement": ".info-imtg-box>img",
        "replaceElement": ".pagebar",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".img-next{display:none!important}"
    },
    {
        "name": "nvsheng",
        "example": "www.nvsheng.cc，m.nvsheng.cc",
        "url": "^https?://(www|m)\\.nvsheng\\.cc/(meizi|weibo|mx|cos|search)/",
        "nextLink": "a[title='›']",
        "pageElement": ".main.wide>.row>*",
        "replaceElement": ".pagebar",
        "pageBar": 0
    },
    {
        "name": "遛无写真 - 看圖",
        "example": "https://www.6evu.com/30131.html",
        "url": "^https?://www\\.6evu\\.com/\\d+\\.html",
        "nextLink": ".pagelist>span+a",
        "init": "function gae(e){return document.querySelectorAll(e)}let _img='';gae('#post_content img').forEach(e=>{_img+=e.outerHTML});gae('#post_content')[0].innerHTML=_img;",
        "pageElement": "#post_content img",
        "replaceElement": ".pagelist",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "遛无写真",
        "example": "https://www.6evu.com/jgmntp",
        "url": "^https?://www\\.6evu\\.com/",
        "include": ".pagination",
        "nextLink": "a.next",
        "pageElement": "#post_container",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-8px!important}"
    },
    {
        "name": "爱美女 - 看圖",
        "example": "www.2meinv.com，wap.2meinv.com",
        "url": "^https?://(www|wap)\\.2meinv\\.com/article",
        "init": "function ge(e){return document.querySelector(e)}let a=ge('.hh+.pp > a');let a2=ge('.clearfix.arcmain a');if(a){a.outerHTML=a.innerHTML}else{a2.outerHTML=a2.innerHTML}",
        "nextLink": "//div[@class='page-show' or contains(@class,'article-page')]/a[contains(@href,'html') and text()='下一页']",
        "pageElement": ".hh+.pp img[alt],.clearfix.arcmain img",
        "replaceElement": ".page-show,h1>span,.article-page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".pgg1+.hh{display:none!important}"
    },
    {
        "name": "爱美女",
        "example": "www.2meinv.com，wap.2meinv.com",
        "url": "^https?://(www|wap)\\.2meinv\\.com/(search|tags|index)?",
        "exclude": ".title,h1>span",
        "nextLink": "//a[contains(@href,'html') and text()='下一页']",
        "pageElement": "ul.detail-list, .arcmain li, #listcon>ul",
        "replaceElement": ".page-show, .article-page"
    },
    {
        "name": "娱乐吧 - 圖片",
        "example": "www.yuleba.org，m.yuleba.org",
        "url": "^https?://(www|m)\\.yuleba\\.org/a/",
        "nextLink": "//div[@class='paging']/a[text()='下一页']",
        "pageElement": ".picture>p, .a_img>p",
        "replaceElement": ".paging",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "娱乐吧",
        "example": "www.yuleba.org，m.yuleba.org",
        "url": "^https?://(www|m)\\.yuleba\\.org/b/",
        "nextLink": "//div[@class='paging']/a[text()='下一页']",
        "pageElement": ".b_txt,.b_img:not(:nth-child(7))>ul",
        "replaceElement": ".paging"
    },
    {
        "name": "新闻吧 - xinwenba.net",
        "example": "www.xinwenba.net，m.xinwenba.net",
        "url": "^https?://(www|m)\\.xinwenba\\.net/plus/view",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".picture>p, .view_img>p",
        "replaceElement": ".paging",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "新闻吧 - xinwenba.net",
        "example": "www.xinwenba.net，m.xinwenba.net",
        "url": "^https?://(www|m)\\.xinwenba\\.net/plus/list",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".list_image>ul>li,.list_img",
        "replaceElement": ".paging"
    },
    {
        "name": "凸凹吧/撸女吧/女优吧/撸哥吧/欲女吧 - 圖片",
        "example": "www.tuao.one，www.63mm.cc，www.97mm.cc，www.luge8.co，luge8.co",
        "url": "^https?://(www\\.)?(tuao8?|tumm|\\d+mm|luge8?)\\.[a-z]{2,3}/(post|web)/",
        "init": "let a=document.querySelector('img[title][original]').parentNode;a.outerHTML=a.innerHTML;",
        "nextLink": "li.next-page>a",
        "pageElement": ".entry img, .article-content img",
        "replaceElement": "#dm-fy",
        "css": "img[src$='.gif'],body>[style*='float']{display: none !important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "凸凹吧/撸女吧/女优吧/撸哥吧/欲女吧 - 手機版分類",
        "example": "www.tuao.one，www.63mm.cc，www.97mm.cc，www.luge8.co，luge8.co",
        "url": "^https?://(www\\.)?(tuao\\d?|tumm|\\d+mm|luge8?)\\.[a-z]{2,3}/",
        "include": ".pagination",
        "nextLink": ".next-page>a",
        "pageElement": ".excerpt",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "凸凹吧/撸女吧/女优吧/撸哥吧/欲女吧 - 分類",
        "example": "www.tuao.one，www.63mm.cc，www.97mm.cc，www.luge8.co，luge8.co",
        "url": "^https?://(www\\.)?(tuao\\d?|tumm|\\d+mm|luge8?)\\.[a-z]{2,3}/",
        "include": ".pagenavi",
        "nextLink": ".now-page+a",
        "pageElement": "main.main>article",
        "replaceElement": ".pagenavi",
        "css": "img[src$='.gif'],body>[style*='float']{display: none !important;}"
    },
    {
        "name": "美图录 - 看圖",
        "example": "https://meitulu.me/item/3242.html",
        "url": "^https?://meitulu\\.me/item/\\d+\\.html",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".container-inner-fix-m>img",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "美图录 - 分類",
        "example": "https://meitulu.me/t/nvshen/",
        "url": "^https?://meitulu\\.me/(t|xihuan|rihan|gangtai|guochan|search)",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".row.my-gutters-b",
        "replaceElement": ".pagination"
    },
    {
        "name": "胴体的诱惑",
        "example": "https://dongti.blog.2nt.com/",
        "url": "^https?://dongti\\.blog\\.2nt\\.com/",
        "action": 1,
        "nextLink": "//li[span[@class='current']]/following-sibling::li[1]/a",
        "pageElement": "#grid-container>*",
        "replaceElement": ".pager"
    },
    {
        "name": "胴体的秘密 - 看圖",
        "example": "https://dongti2022.com/751999.html",
        "url": "^https?://dongti[^/]+/",
        "include": [
            ".j-wpcom-lightbox:not([href*='loding'])",
            ".entry-content"
        ],
        "pinUrl": true,
        "init": "setTimeout(()=>{document.querySelectorAll(\"a.j-wpcom-lightbox:not([href*='loding'])\").forEach(e=>{e.parentNode.outerHTML=`<img src='${e.href}'>`})},1000)"
    },
    {
        "name": "胴体的秘密 - 標籤",
        "example": "https://dongti2022.com/tag/%e6%a1%9c%e4%ba%95%e5%ae%81%e5%ae%81",
        "url": "^https?://dongti[^/]+/tag/",
        "nextLink": "li.active+li>a",
        "pageElement": ".post-loop",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "胴体的秘密",
        "example": "https://dongtidemimi.org/",
        "url": "^https?://dongti[^/]+/(category|\\?s=)",
        "nextLink": "a.next",
        "pageElement": "ul.post-loop.post-loop-image.cols-4,.post-loop-default",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "MEITU131 - 手機版看圖",
        "example": "https://m.meitu131.com/meinv/8140/",
        "url": "^https?://m\\.meitu131\\.com/",
        "include": ".uk-article",
        "init": "let a=document.querySelector('.uk-article-bd a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".uk-article-bd img[alt]",
        "replaceElement": ".uk-page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "MEITU131 手機版",
        "example": "https://m.meitu131.com/meinv/",
        "url": "^https?://m\\.meitu131\\.com/",
        "exclude": ".uk-article",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".uk-container li",
        "replaceElement": ".uk-page",
        "pageBar": 0
    },
    {
        "name": "MEITU131 - 看圖",
        "example": "https://www.meitu131.net/meinv/7672/",
        "url": "^https?://www\\.meitu131\\.net/meinv/\\d+",
        "init": "document.querySelectorAll('p>a').forEach(e=>{e.outerHTML=e.innerHTML})",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".work-content img",
        "replaceElement": "#pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "MEITU131",
        "example": "https://www.meitu131.net/rank/dalu/",
        "url": "^https?://www\\.meitu131\\.net/(e/search|rank|meinv|shouji|sucai|nvshen|hot)/([a-z]+)?",
        "exclude": "h1",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".details>ul,.cover-list",
        "replaceElement": "#pages",
        "lazyImgSrc": "data-echo",
        "css": ".cover-list+.pagetual_pageBar{margin-top:0px!important}.pagetual_pageBar+.cover-list{margin-top:-4px!important}"
    },
    {
        "name": "亿图全景图库 - 手機版看圖",
        "example": "https://m.yeitu.com/meinv/xinggan/20221205_32251.html",
        "url": "^https?://m\\.yeitu\\.com/",
        "include": ".uk-article",
        "init": "let a=document.querySelector('.gallery-item>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".gallery-item img[alt]",
        "replaceElement": ".yt-pages,.imageset-current",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "亿图全景图库手機版",
        "example": "https://m.yeitu.com/meinv/xinggan/",
        "url": "^https?://m.yeitu.com/",
        "include": ".uk-pagination",
        "nextLink": "//a[@class='a1' and text()='下一页']",
        "pageElement": ".uk-container>ul li",
        "replaceElement": ".uk-pagination",
        "pageBar": 0
    },
    {
        "name": "亿图全景图库 - 看圖",
        "example": "https://www.yeitu.com/meinv/xinggan/20220725_31887.html",
        "url": "^https?://www\\.yeitu\\.com/",
        "include": ".img_content",
        "init": "let a=document.querySelector('.img_box>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[@class='a1' and text()='下一页']",
        "pageElement": ".img_box img[alt]",
        "replaceElement": "#pages,.imageset-current",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "亿图全景图库",
        "example": "https://www.yeitu.com/meinv/xinggan/",
        "url": "^https?://www\\.yeitu\\.com/",
        "include": "#pages",
        "nextLink": "//a[@class='a1' and text()='下一页']",
        "pageElement": ".list-box-p",
        "replaceElement": "#pages",
        "lazyImgSrc": "data-echo",
        "css": ".pagetual_pageBar{margin-top:-8px!important}"
    },
    {
        "name": "Make Girls",
        "example": "https://asdcosplay.com/category/collections/djawa/",
        "url": "^https?://asdcosplay\\.com/(\\?s=|category)?",
        "nextLink": "a.next",
        "pageElement": "article.post",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "Asian Girls",
        "example": "https://allasiangirls.net/category/free-content/",
        "url": "^https?://allasiangirls\\.net/(category|\\?s=)",
        "nextLink": "a.next",
        "pageElement": "//div[div/@class='col post-item']",
        "replaceElement": ".page-numbers",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": 4
    },
    {
        "name": "Yellow Fever",
        "example": "https://yellowfever18.com/chinese/",
        "url": "^https?://yellowfever18\\.com/(tag|chinese|korean|japanese|\\?s=)",
        "nextLink": "a.next",
        "pageElement": ".jeg_postblock_15 .jeg_post",
        "replaceElement": ".jeg_block_navigation",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "ASD ASFD CN",
        "example": "https://asdasfd.net/",
        "url": "^https?://asdasfd\\.net/(category|\\?s=)",
        "nextLink": "//a[text()='Older posts']",
        "pageElement": "article.post",
        "replaceElement": ".navigation",
        "pageBar": 0
    },
    {
        "name": "NudeBird",
        "example": "https://nudebird.biz/",
        "url": "^https?://nudebird\\.biz/(tag|category|\\?s=)?",
        "nextLink": "li.current+li>a",
        "pageElement": ".excerpt",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "NUDECOSPLAY - 圖片",
        "example": "https://nudecosplaygirls.com/%e4%b9%a0%e5%91%86%e5%91%86-%e5%88%bb%e6%99%b4/",
        "url": "^https?://nudecosplaygirls\\.com/",
        "include": [
            ".entry-content img[decoding='async']:not(.lazy)"
        ],
        "pinUrl": true,
        "init": "let imgs=document.querySelectorAll(\".entry-content img[decoding='async']\");let _img='';for(let i=0;i<imgs.length;i++){let p=parseInt(i)+1;if(i<9){p='00'+p}else if(i<99){p='0'+p}let alt=document.querySelector('h1.entry-title').innerText+'_P'+p;_img+=`<img src='${imgs[i].src}'alt='${alt}'>`};document.querySelector('.entry-content').innerHTML=_img;",
        "css": ".entry-content>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}#secondary{display:none!important}h1.g1-mega{text-align:center}"
    },
    {
        "name": "NUDECOSPLAY - 圖片",
        "example": "https://nudecosplaygirls.com/haneame-summer/",
        "url": "^https?://nudecosplaygirls\\.com/",
        "include": [
            ".entry-content",
            "img[decoding='async'].lazy"
        ],
        "pinUrl": true,
        "init": "let imgs=document.querySelectorAll('img.lazy');let _img='';for(let i=0;i<imgs.length;i++){let p=parseInt(i)+1;if(i<9){p='00'+p}else if(i<99){p='0'+p}let alt=document.querySelector('h1.entry-title').innerText+'_P'+p;_img+=`<img src='${imgs[i].getAttribute('src')}'alt='${alt}'>`};document.querySelector('.entry-content').innerHTML=_img;",
        "css": ".entry-content>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}#secondary{display:none!important}h1.g1-mega{text-align:center}"
    },
    {
        "name": "NUDECOSPLAY",
        "example": "https://nudecosplaygirls.com/",
        "url": "^https?://nudecosplaygirls\\.com/(category)?",
        "nextLink": "a.next",
        "pageElement": ".g1-collection-viewport li",
        "replaceElement": ".g1-pagination",
        "pageBar": 0
    },
    {
        "name": "Nlegs - 預覽圖清單",
        "example": "https://www.nlegs.com/girls/2022/10/01/28219.html",
        "url": "^https?://www\\.nlegs\\.com/girls/[^.]+\\.html",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[a/div[contains(@style,'thumb') and span]]",
        "replaceElement": "#dnav",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".col-md-12.col-xs-12>img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "Nlegs",
        "example": "https://www.nlegs.com/",
        "url": "^https?://www\\.nlegs\\.com/",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[div/a/div/@class='img-div']",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:10px!important}.pagetual_pageBar+div{margin-top:0px!important}"
    },
    {
        "name": "Mitaku - 看圖",
        "enable": 0,
        "example": "https://mitaku.net/ero-cosplay/byoru-riamu-yumemi-nekomini/",
        "url": "^https?://mitaku\\.net/",
        "include": ".msacwl-slider-wrap",
        "pinUrl": true
    },
    {
        "name": "Mitaku",
        "example": "https://mitaku.net/",
        "url": "^https?://mitaku\\.net/",
        "nextLink": ".current+a",
        "pageElement": "article.post",
        "replaceElement": ".wp-pagenavi",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "idol.gravureprincess.date",
        "example": "http://idol.gravureprincess.date/",
        "url": "^https?://idol\\.gravureprincess\\.date/",
        "pinUrl": true,
        "init": "document.querySelectorAll('.date-outer').forEach(e=>{e.removeAttribute('style')})",
        "nextLink": ".blog-pager-older-link",
        "pageElement": ".blog-posts>.date-outer",
        "replaceElement": "#blog-pager",
        "pageInit": "doc.querySelectorAll('.date-outer').forEach(e=>{e.removeAttribute('style')})"
    },
    {
        "name": "NongMo.Zone",
        "example": "http://www.ilovexs.com/",
        "url": "^https?://www\\.ilovexs\\.com/(category)?",
        "nextLink": ".nav-next>a",
        "pageElement": "//div[article]",
        "replaceElement": ".nav-links",
        "rate": 3,
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": 10
    },
    {
        "name": "CoserBOX - 分類",
        "example": "https://coserbox.org/rootcategory/62b6e84d412f63180e09d1a0，https://picacg.org/rootcategory/62fd110a5a40959e2fed9352",
        "url": "^https?://[^/]+/(rootcategory|category|search)",
        "include": "//img[contains(@alt,'CoserBOX')]",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[a[@class='category']] | //div[div[@class='card']]",
        "replaceElement": ".catalog__paginator-wrap",
        "pageBar": 0
    },
    {
        "name": "CoserBOX - 首頁",
        "enable": 0,
        "example": "https://acg.coserbox.net/，https://coserbox.org/，https://picacg.org/，https://loli.pub/",
        "url": "^https?://[^/]+/$",
        "include": "//img[contains(@alt,'CoserBOX')]",
        "loadMore": ".load-more:not(:disabled)"
    },
    {
        "name": "Cosplaytele - 分類",
        "example": "https://cosplaytele.com/",
        "url": "^https?://cosplaytele\\.com/",
        "action": 1,
        "nextLink": "a.next",
        "pageElement": "#content .row .row",
        "replaceElement": ".page-numbers",
        "pageBar": 0
    },
    {
        "name": "4KHD - 圖片",
        "example": "https://www.4khd.com/2023/01/15/puremedia-vol210-seer.html",
        "url": "^https?://www\\.4khd\\.com/[^.]+\\.html",
        "action": 1,
        "init": "document.querySelectorAll('a[data-fancybox]').forEach(e=>{e.outerHTML=`<img src='${e.href}'>`})",
        "nextLink": "li.current+li>a",
        "pageElement": ".wp-block-image",
        "pageInit": "doc.querySelectorAll('a[data-fancybox]').forEach(e=>{e.outerHTML=`<img src='${e.href}'>`})",
        "replaceElement": ".page-link-box",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "4KHD - 分類",
        "example": "https://www.4khd.com/",
        "url": "^https?://www\\.4khd\\.com/",
        "nextLink": "span.current+a",
        "pageElement": ".wp-block-post-template.is-flex-container",
        "replaceElement": "nav[aria-label='Pagination']",
        "pageBar": 0
    },
    {
        "name": "4KUP - 分類",
        "example": "https://www.4kup.net/",
        "url": "^https?://www\\.4kup\\.net/",
        "include": "#pagination",
        "pinUrl": true,
        "pageElement": "article.item-post",
        "pageBar": 0,
        "css": ".lazyload{opacity:1!important}"
    },
    {
        "name": "Goddess247",
        "example": "https://goddess247.com/",
        "url": "^https?://goddess247\\.com/",
        "nextLink": "a.next",
        "pageElement": "article[class*=post]",
        "replaceElement": "nav.elementor-pagination",
        "css": ".pagetual_pageBar{margin-top:10px!important}.pagetual_pageBar+div{margin-top:-6px!important}"
    },
    {
        "name": "Popular JAV",
        "example": "https://javme.net/",
        "url": "^https?://javme\\.net/",
        "nextLink": ".pagination-next",
        "pageElement": ".column.is-one-fifth-desktop",
        "replaceElement": "nav.pagination",
        "pageBar": 0
    },
    {
        "name": "Buon Dua - 看圖",
        "example": "https://buondua.com/saint-photolife-%E2%80%93-zzyuri-%EC%AE%B8%EB%A6%AC-blueming-part-2-57-photos-27769",
        "url": "^https?://buondua\\.com/",
        "init": "document.querySelectorAll('.article-fulltext>*:not(p)').forEach(e=>{e.remove()});",
        "nextLink": "//span[a/@class='pagination-link is-current']/following-sibling::span/a",
        "pageElement": ".article-fulltext p",
        "replaceElement": "nav.pagination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".content p:not(:last-child){margin-bottom:0!important}"
    },
    {
        "name": "Buon Dua - 分類",
        "example": "https://buondua.com/",
        "url": "^https?://buondua\\.com/",
        "nextLink": ".pagination-next",
        "pageElement": ".blog.columns",
        "replaceElement": "nav.pagination",
        "initRun": 1,
        "autoLoadNum": 1,
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "BAOBUA.COM - 看圖",
        "example": "https://www.baobua.com/post/d00yYmh4WFNoZERNdFd5Q1QwNHhrNmZPZlMzUUI5UUo3OFVDRm5jWG11OFZ6aDJaeXpHdGh0Sm5sU0s4WjF5aXVIR0pLTTJvb0h3SDdlM1NSR0JxSHc9PQ==",
        "url": "^https?://www\\.baobua\\.com/post/",
        "nextLink": ".current+a,.current+.dots+a",
        "pageElement": ".entry-content.read-details>.wp-block-image",
        "replaceElement": "nav.pagination,.trail-items",
        "pageAction": "document.querySelectorAll('.entry-content.read-details>*:not(.wp-block-image)').forEach(e=>{e.remove()});",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".wp-block-image{margin-bottom:0!important}"
    },
    {
        "name": "BAOBUA.COM - 搜索",
        "example": "https://www.baobua.com/?cat=Tm1ydGlaZ1A2YWM3a3BvYWh6L3dIdz09",
        "url": "^https?://www\\.baobua\\.com/\\?cat=",
        "action": 1,
        "nextLinkByUrl": [
            "(\\?cat=[^&]+)(\\&page=(\\d+))?$",
            "$1&page={($3.0||1)+1}",
            ".next.page-numbers"
        ],
        "pageElement": "main#main article",
        "replaceElement": "nav.pagination",
        "rate": 3,
        "wait": 500,
        "pageBar": 0
    },
    {
        "name": "BAOBUA.COM - 影片分類",
        "example": "https://www.baobua.com/video/index.html",
        "url": "^https?://www\\.baobua\\.com/video/index\\.html",
        "action": 1,
        "wait": 500,
        "nextLinkByUrl": [
            "html(\\?&page=(\\d+))?$",
            "html?&page={($2.0||1)+1}",
            ".next.page-numbers"
        ],
        "pageElement": "main#main article",
        "replaceElement": "nav.pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "BAOBUA.COM - 圖片分類",
        "example": "https://www.baobua.com/?page=1",
        "url": "^https?://www\\.baobua\\.com/\\?page=",
        "action": 1,
        "nextLinkByUrl": [
            "page=(\\d+)$",
            "page={$1+1}",
            ".next.page-numbers"
        ],
        "pageElement": "main#main article",
        "replaceElement": "nav.pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "BaoBua.Com - 看圖",
        "example": "https://blog.baobua.com/mlem/6350798069264574102~rogle-song-hana-%EC%86%A1%ED%95%98%EB%82%98-leggings",
        "url": "^https?://(blog|fb)\\.baobua\\.com/",
        "include": "img[data-original]",
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);ge('#fix_scale').setAttribute('id','fix');let fimgs=document.querySelectorAll('.article-content img[data-original]');let _img='';for(let i=0;i<fimgs.length;i++){let imgSrc=fimgs[i].dataset.original;let p=parseInt(i)+1;if(i<9){p='0'+p}let alt=ge('h1').innerText.match(/[^@]+/)[0].trim()+'_P'+p;_img+=`<img src='${imgSrc}'alt='${alt}'>`};ge('.article-body').innerHTML=_img;"
    },
    {
        "name": "BaoBua.Com - 搜索",
        "example": "https://blog.baobua.com/mlem?cat=korean",
        "url": "^https?://blog\\.baobua\\.com/mlem\\?cat=",
        "include": ".pagination-custom",
        "nextLinkByUrl": [
            "(cat=[^&]+)(&page=(\\d+))?$",
            "$1&page={$3+1}",
            "span.nextPage"
        ],
        "pageElement": ".large--one-third",
        "replaceElement": ".pagination-custom",
        "rate": 3,
        "initRun": 1,
        "autoLoadNum": 4,
        "pageBar": 0
    },
    {
        "name": "BaoBua.Com - 分類",
        "example": "https://blog.baobua.com/mlem",
        "url": "^https?://blog\\.baobua\\.com/mlem(\\?&page=(\\d+))?$",
        "include": ".pagination-custom",
        "nextLinkByUrl": [
            "mlem(\\?&page=(\\d+))?$",
            "mlem?&page={$2+1}",
            "span.nextPage"
        ],
        "pageElement": ".large--one-third",
        "replaceElement": ".pagination-custom",
        "rate": 3,
        "initRun": 1,
        "autoLoadNum": 4,
        "pageBar": 0
    },
    {
        "name": "HOTGIRLchina - 看圖",
        "example": "https://hotgirlchina.com/xiuren-no-5261-zhu-ke-er-%e6%9c%b1%e5%8f%af%e5%84%bfflora-115-photos/",
        "url": "^https?://hotgirlchina\\.com/.+photos/",
        "nextLink": ".nextpostslink",
        "pageElement": ".entry-inner>p",
        "replaceElement": "nav.pagination",
        "css": ".entry p{margin-bottom:0!important}[id^='boxzilla']{display:none!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "HOTGIRLchina - 搜索 - 修正頁碼錯誤",
        "example": "https://hotgirlchina.com/?s=XIUREN",
        "url": "^https?://hotgirlchina\\.com/(page/(\\d+)/)?\\?s=",
        "init": "setTimeout(()=>{document.querySelectorAll('.wp-pagenavi a').forEach(a=>{a.href=a.href.replace(/\\/$/,'')})},1000)",
        "nextLinkByUrl": [
            "(page/(\\d+)/)?(\\?s=\\w+)$",
            "page/{($2.0||1)+1}/$3",
            ".nextpostslink"
        ],
        "pageElement": "#grid-wrapper article",
        "pageAction": "setTimeout(()=>{document.querySelectorAll('.wp-pagenavi a').forEach(a=>{a.href=a.href.replace(/\\/$/,'')})},1000)",
        "replaceElement": "nav.pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "HOTGIRLchina - 分類",
        "example": "https://hotgirlchina.com/tag/xiuren/",
        "url": "^https?://hotgirlchina\\.com/tag/",
        "nextLink": ".nextpostslink",
        "pageElement": "#grid-wrapper article",
        "replaceElement": "nav.pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "BeautyLeg - 圖片",
        "example": "http://www.beautyleg6.com/xingganmeinv/201406/133.html",
        "url": "^https?://www.beautyleg\\d+\\.com/.+\\.html",
        "init": "function gae(e){return document.querySelectorAll(e)}let imgs=gae('.contents img');let _img='';for(let i=0;i<imgs.length;i++){_img+=imgs[i].outerHTML};gae('.contents')[0].innerHTML=_img;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".contents img",
        "replaceElement": ".page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "BeautyLeg - 分類",
        "example": "https://www.beautyleg6.com/weimeixiezhen/",
        "url": "^https?://www.beautyleg\\d+\\.com/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".pic",
        "replaceElement": ".page",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "艾薇福利社 - 圖片",
        "example": "https://www.aiweifulishe.net/dress/silkstocking/whitesilkstocking/68742.html",
        "url": "^https?://www\\.aiweifulishe\\.net/.+\\.html",
        "action": 1,
        "nextLink": ".current+a",
        "pageElement": "#content img",
        "replaceElement": ".nav-links",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "艾薇福利社 - 分類",
        "example": "https://www.aiweifulishe.net/heji",
        "url": "^https?://www\\.aiweifulishe\\.net/",
        "nextLink": "a.next",
        "pageElement": "#index_ajax_list li",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "色情圖片網 - 分類",
        "example": "https://www.photos18.com/cat/5",
        "url": "^https?://www\\.photos18\\.com/",
        "nextLink": ".next>a",
        "pageElement": "#videos",
        "replaceElement": ".pagination"
    },
    {
        "name": "MM131美女图片手機版 - 看圖",
        "example": "https://m.mmm131.com/xinggan/5761.html",
        "url": "^https?://m\\.mmm131\\.com/.+\\html$",
        "init": "let a=document.querySelector('.post-content>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一张']",
        "pageElement": ".post-content img",
        "replaceElement": ".paging",
        "css": ".bannert_ios,.bannerb_ios,.tips{display:none!important}.single-post-content{line-height: 0!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "MM131美女图片手機版 - 分類",
        "example": "https://m.mmm131.com/xinggan/",
        "url": "^https?://m\\.mmm131\\.com/",
        "include": "#listm",
        "init": "document.querySelectorAll('.post.nop').forEach(e=>{e.classList.remove('nop')})",
        "nextLink": "//a[text()='下一页' and contains(@href,'html')]",
        "pageElement": ".post",
        "replaceElement": "#webpage",
        "lazyImgSrc": "data-img",
        "pageAction": "document.querySelectorAll('.post.nop').forEach(e=>{e.classList.remove('nop')})",
        "pageBar": 0
    },
    {
        "name": "MM131美女图片手機版 - 首頁",
        "example": "https://m.mmm131.com/",
        "url": "^https?://m\\.mmm131\\.com/$",
        "css": ".bannert_ios,.bannerb_ios,.tips{display:none!important}",
        "nextLinkByJs": "homemore()"
    },
    {
        "name": "MM131美女图片 - 看圖",
        "example": "https://www.mmm131.com/xinggan/5774.html",
        "url": "^https?://www\\.mmm131\\.com/.+\\html$",
        "init": "let a=document.querySelector('.content-pic>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".content-pic img",
        "replaceElement": ".content-page",
        "css": ".content-tips{display:none!important}.content-pic img{margin-top:0px!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "MM131美女图片 - 列表",
        "example": "https://www.mmm131.com/xinggan/",
        "url": "^https?://www\\.mmm131\\.com/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//dl[@class='list-left public-box']/dd[a/@target]",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "Nsfwp",
        "example": "https://nsfwx.pics/",
        "url": "^https?://nsfwx\\.pics/",
        "nextLink": "a.next",
        "pageElement": "article[id^='post']",
        "replaceElement": ".pag-wrapper",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "推图网 - 展開全圖",
        "example": "https://m.tuiimg.com/meinv/2653/",
        "url": "^https?://(www|m)\\.tuiimg\\.com/meinv/\\d+/",
        "init": "goshowall()",
        "pinUrl": true
    },
    {
        "name": "推图网 - 手機版 - 查看更多",
        "example": "https://m.tuiimg.com/",
        "url": "^https?://m\\.tuiimg\\.com/$",
        "nextLinkByJs": "showmore()"
    },
    {
        "name": "推图网 - 手機版",
        "example": "https://m.tuiimg.com/meinv/",
        "url": "^https?://m\\.tuiimg\\.com/",
        "nextLink": ".now+a",
        "pageElement": "#main",
        "replaceElement": ".page",
        "lazyImgSrc": "realsrc",
        "pageBar": 0
    },
    {
        "name": "推图网",
        "example": "https://www.tuiimg.com/meinv/",
        "url": "^https?://www\\.tuiimg\\.com/",
        "nextLink": "em+a",
        "pageElement": ".beauty>ul,.main>ul",
        "replaceElement": ".page",
        "css": ".beauty>.pagetual_pageBar+ul{padding-top:15px!important}.main>ul+.pagetual_pageBar{margin-top:10px!important}.main>.pagetual_pageBar+ul{margin-top:-14px!important}"
    },
    {
        "name": "Mrcong - 看圖",
        "enable": 0,
        "example": "https://mrcong.com/xiaoyu-vol-831-yang-chen-chen-yome-74-anh/",
        "url": "^https?://mrcong\\.com/",
        "init": "document.querySelectorAll('p>br').forEach(br=>{br.remove()})",
        "nextLink": ".page-link>span+a",
        "pageElement": "p>img",
        "replaceElement": ".page-link",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "Mrcong",
        "example": "https://mrcong.com/",
        "url": "^https?://mrcong\\.com/(page/\\d+/)?",
        "nextLink": ".current+a",
        "pageElement": "article.item-list",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "宅男女神 - 看圖",
        "example": "www.gnvshen.com，www.fnvshen.com",
        "url": "^https?://www\\.(gnvshen|fnvshen|)\\.com/g/",
        "nextLink": "#pages>span +a:not(.a1), a.cur+a",
        "pageElement": "#hgallery>img",
        "replaceElement": "#pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#hgallery img{margin:0px!important}"
    },
    {
        "name": "宅男女神",
        "example": "www.gnvshen.com，www.fnvshen.com",
        "url": "^https?://www\\.(gnvshen|fnvshen)\\.com/(gallery|tag)/",
        "nextLink": "a.cur+a",
        "pageElement": "#listdiv>ul>li",
        "replaceElement": ".pagesYY",
        "css": ".pagetual_pageBar{margin-bottom:-5px!important}"
    },
    {
        "name": "爱女神 - 看圖",
        "example": "https://www.99nvshen.com/gallery/15123",
        "url": "^https?://www\\.99nvshen\\.com/(gallery|galleryImg)/\\d+",
        "nextLink": ".pagination-box li.active+li>a",
        "pageElement": ".gallery-detail-img,.gallery-img",
        "replaceElement": ".pagination-box",
        "pageAction": "document.querySelectorAll('.gallery-img').forEach(a=>{a.removeAttribute('href')})",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".book-list>div[style]{display:none!important}"
    },
    {
        "name": "爱女神",
        "example": "https://www.99nvshen.com/galleryList/",
        "url": "^https?://www\\.99nvshen\\.com/(articles|galleryList|modelList|paihang)",
        "nextLink": ".pagination-box li.active+li>a",
        "pageElement": ".book-list-title+.book-list,.book-list>.row",
        "replaceElement": ".pagination-box",
        "css": ".pagetual_pageBar{margin-bottom:-5px!important}"
    },
    {
        "name": "Sexyxbody - 看圖",
        "example": "https://cn.sexyxbody.com/sexy_article/i103swym3j/",
        "url": "^https?://cn\\.sexyxbody\\.com/sexy_article",
        "nextLink": "//a[text()='下一页»']",
        "pageElement": ".album-post-body>.separator,.album-post-body>br",
        "initRun": 1,
        "autoLoadNum": "0",
        "pageBar": 0,
        "replaceElement": ".pgz-pagination,.album-post-inner,.breadcrumbs"
    },
    {
        "name": "Sexyxbody",
        "example": "https://cn.sexyxbody.com/zone_detail/ouz5i1j",
        "url": "^https?://cn\\.sexyxbody\\.com/(zone_detail|tag_list|tag_detail)",
        "nextLink": "a.next",
        "pageElement": ".blog-posts",
        "initRun": 1,
        "autoLoadNum": 1,
        "rate": 3,
        "replaceElement": ".pgz-pagination"
    },
    {
        "name": "爱看 INS",
        "example": "https://www.ikanins.com/",
        "url": "^https?://www\\.ikanins\\.com/",
        "nextLink": "a[rel='next']",
        "pageElement": "#masonry",
        "replaceElement": ".wp-pagenavi"
    },
    {
        "name": "Dmmtu 美女图 - 看圖",
        "example": "https://www.dmmtu.com/xiezhen/25837.html",
        "url": "^https?://www\\.dmmtu\\.com/",
        "include": ".link_pages",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".main-body>img",
        "replaceElement": ".link_pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "Dmmtu 美女图 - 分類",
        "example": "https://www.dmmtu.com/new/",
        "url": "^https?://www\\.dmmtu\\.com/",
        "include": "#pagenavi",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "#postlist>*",
        "replaceElement": "#pagenavi",
        "pageBar": 0
    },
    {
        "name": "jpmnb 精品美女吧 - 搜索",
        "example": "https://www.jpmnb.net/plus/search/index.asp?keyword=XiuRen",
        "url": "^https?://www\\.jpmnb\\.net/plus/search/",
        "nextLink": "a.current+a",
        "pageElement": ".list>.node",
        "replaceElement": ".pagination1",
        "pageBar": 0
    },
    {
        "name": "jpmnb 精品美女吧 - 看圖",
        "example": "https://www.jpmnb.net/Xrqj/XiuRen/19379.html",
        "url": "^https?://www\\.jpmnb\\.net/",
        "init": "document.querySelectorAll('p br').forEach(br=>{br.remove()})",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "p img",
        "replaceElement": ".pagination1",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "jpmnb 精品美女吧 - 分類",
        "example": "https://www.jpmnb.net/Xrqj/XiuRen/",
        "url": "^https?://www\\.jpmnb\\.net/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".container>.excerpt",
        "replaceElement": ".pagination1",
        "pageBar": 0
    },
    {
        "name": "MM 范 - 圖片",
        "example": "https://www.95mm.tv/65309.html",
        "url": "^https?://www\\.95mm\\.\\w+/\\w+\\.html",
        "init": "let a=document.querySelector('.post a');a.outerHTML=a.innerHTML;",
        "include": ".post img[alt]",
        "nextLinkByUrl": [
            "/(\\d+)(/)?(\\d+)?(\\.html)",
            "/$1/{($3.0||1)+1}$4"
        ],
        "stopSign": [
            [
                ".post-title",
                "(\\d+)"
            ],
            [
                ".post-title",
                "\\/(\\d+)"
            ]
        ],
        "pageElement": ".post img",
        "replaceElement": "h1.h3",
        "pageAction": "document.querySelectorAll('.post img[title]').forEach(img=>{img.removeAttribute('title')})",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "span.d-md-inline-block.d-none:not(.mx-1),.text-xs.text-muted>b{display:none!important}"
    },
    {
        "name": "MM 范",
        "example": "https://www.95mm.org/qingchun",
        "url": "^https?://www\\.95mm\\.org/(qingchun|sifang|xinggan|tag)?",
        "include": ".dposts-ajax-load",
        "loadMore": ".dposts-ajax-load"
    },
    {
        "name": "Everia.club",
        "example": "https://everia.club/category/gravure/",
        "url": "^https?://everia\\.club/category",
        "nextLink": ".next",
        "pageElement": ".posts-wrapper article",
        "replaceElement": ".page-numbers",
        "pageBar": 0
    },
    {
        "name": "Xiuren 秀人网",
        "example": "http://www.xiuren.org/category/TuiGirl.html",
        "url": "^https?://www\\.xiuren\\.org/",
        "include": "#page",
        "pinUrl": true,
        "nextLink": ".next",
        "pageElement": "#main>.loop",
        "replaceElement": "#page",
        "rate": 3
    },
    {
        "name": "套圖吧手機版",
        "example": "https://m.taotu8.xyz/",
        "url": "^https?://m\\.taotu8\\.(top|com|xyz)/",
        "include": "#morepic",
        "nextLink": "0",
        "loadMore": "#morepic"
    },
    {
        "name": "套圖吧 - 看圖",
        "example": "https://www.taotu8.xyz/gq/meinv/xiaoyu847.html",
        "url": "^https?://(www|m)\\.(192[a-z+]|taotu8)\\.(top|com|xyz)/",
        "include": ".picmainer>h1",
        "action": 1,
        "nextLinkByUrl": [
            "/([^_]+)(_)?(\\d+)?(\\.html)$",
            "/$1_{($3.0||1)+1}$4",
            ".next[href*='_']"
        ],
        "pageElement": ".picsbox img",
        "replaceElement": ".next,.pre,.picmainer>h1",
        "waitElement": [
            ".picsbox img[style]"
        ],
        "css": ".picsbox img{opacity: 1!important}.national-day,.picpege,.pictopline p.pright,#back-to-top{display:none!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "套圖吧",
        "example": "https://www.taotu8.xyz/",
        "url": "^https?://(www|m)\\.(192[a-z+]|taotu8)\\.(top|com|xyz)/",
        "include": ".page",
        "nextLink": ".page b+a",
        "pageElement": ".piclist>ul",
        "lazyImgSrc": [
            "lazysrc",
            "lazysrc"
        ],
        "replaceElement": ".page",
        "css": ".pagetual_pageBar{margin-top:-20px!important;margin-bottom:10px!important}"
    },
    {
        "name": "蕾丝猫 - 圖片",
        "example": "https://www.lesmao.site/thread-31035-1-1.html",
        "url": "^https?://www\\.(lsm|lesmao|lsmpx)\\.(site|me|pro|co|com|org)/thread",
        "nextLink": "strong+a,a.r",
        "pageElement": "#thread-pic li,#pic",
        "replaceElement": "#thread-page",
        "css": "#thread-pic li,#pic li{margin-bottom: 0px!important;}#pic img{width:100%!important;height:auto!important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "蕾丝猫",
        "example": "https://www.lesmao.site/",
        "url": "^https?://www\\.(lsm|lesmao|lsmpx)\\.(site|me|pro|co|com|org)/",
        "nextLink": ".current+a,strong+a",
        "pageElement": "#index-pic,#ul-pic",
        "replaceElement": ".pg",
        "css": ".pagetual_pageBar{margin-bottom:20px!important}#ul-pic img{display:none!important}"
    },
    {
        "name": "Wndfx 妹子图 - 圖片",
        "example": "https://www.wndfx.com/gogort/zg/8364.html",
        "url": "^https?://www\\.wndfx\\.com/gogort/",
        "include": ".nav-links.page_imges",
        "nextLink": "span+a",
        "pageElement": ".article-content img",
        "replaceElement": ".nav-links.page_imges",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "Wndfx 妹子图",
        "example": "https://www.wndfx.com/",
        "url": "^https?://www.\\wndfx\\.com/",
        "include": "nav.pagination",
        "nextLink": "//a[text()='下一页 »']",
        "pageElement": ".update_area_lists",
        "replaceElement": "nav.pagination",
        "css": ".update_area_lists+.pagetual_pageBar{margin-top:-15px!important}.pagetual_pageBar+.update_area_lists{margin-top:-5px!important}"
    },
    {
        "name": "优美图库 - 圖片",
        "example": "https://www.umei.cc/meinvtupian/xingganmeinv/255974.htm",
        "url": "^https?://(www\\.)?(umeitu|umei)\\.(com|fun|cc)/",
        "include": ".pages",
        "nextLink": "li.thisclass+li>a",
        "pageElement": ".big-pic>a",
        "replaceElement": ".pages",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "优美图库 - 分類",
        "example": "https://www.umei.cc/meinvtupian/xingganmeinv/",
        "url": "^https?://(www\\.)?(umeitu|umei)\\.(com|fun|cc)/",
        "include": "#pageNum",
        "nextLink": ".thisclass+a",
        "pageElement": "#infinite_scroll,.pic-list>ul",
        "replaceElement": "#pageNum",
        "css": "#infinite_scroll+.pagetual_pageBar{margin-top:-15px!important}.pagetual_pageBar+#infinite_scroll{margin-top:-15px!important}ul+.pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "Hentai Image - 圖片",
        "example": "hentai-img.com，hentai-cosplays.com，porn-images-xxx.com",
        "url": "^https?://(.+)?(porn-images-xxx|hentai-cosplays|hentai-img)\\.com/image/",
        "nextLink": "//a[contains(text(),'>') or contains(text(),'next')]",
        "pageElement": "#display_image_detail img",
        "replaceElement": "script+#paginator,#detail_tag+div+div",
        "css": "#display_image_detail a[id]{display:none!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "Hentai Image - 分類",
        "example": "https://ja.porn-images-xxx.com/search/",
        "url": "^https?://(.+)?(porn-images-xxx|hentai-cosplays|hentai-img)\\.com/(search|recently|ranking|search-video|ranking-video)/",
        "nextLink": "span+a",
        "pageElement": "#center>#display_area_image",
        "replaceElement": ".wp-pagenavi",
        "css": ".pagetual_pageBar{margin-top:-30px!important;}#post_list_title+#display_area_image,.pagetual_pageBar+#display_area_image{margin-bottom:0px!important;}",
        "initRun": 1,
        "autoLoadNum": 1,
        "rate": 3
    },
    {
        "name": "24fa",
        "example": "https://www.24fa.com/n93763c49.aspx",
        "url": "^https?://(www\\.)?\\d{2,3}(m|w|faw|fa|aa)?\\.[a-z]{2,4}/m?n\\w+\\.aspx$",
        "include": "//title[contains(text(),'24FA')]",
        "init": "document.querySelectorAll('#content br').forEach(br=>{br.remove()})",
        "nextLink": "li.p_current+li>a",
        "pageElement": "#content img[alt]",
        "replaceElement": ".pager",
        "css": "img{margin-top:0px!important;margin-bottom:1px!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "無名網",
        "example": "https://9wm9.info/viewforum/38",
        "url": "^https?://9wm9\\.info/",
        "nextLink": "//a[text()='Next page']",
        "pageElement": ".box tbody",
        "replaceElement": "nav.pagination"
    },
    {
        "name": "小丑擼 輕便版",
        "example": "https://www.jokerlutxt.top/index.php/vodtype/131.html",
        "url": "^https?://www\\.jokerlutxt\\.top/index\\.php/vodtype/.+\\.html",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".box tbody",
        "replaceElement": "nav.pagination"
    },
    {
        "name": "小丑擼",
        "example": "https://www.jokerlu357.cc/index.php/vodtype/121.html",
        "url": "^https?://www\\.jokerlu\\d+\\.cc/index\\.php/vodtype/.+\\.html",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".main-grids>.top-grids+.recommended>.recommended-grids.english-grid",
        "replaceElement": ".recommended+.recommended>.recommended-grids.english-grid>.clearfix>.pagination",
        "css": ".pagetual_pageBar{margin-top:12px!important;}"
    },
    {
        "name": "亞色影庫",
        "example": "https://www.yasetube.com/video/category/javhd",
        "url": "^https?://www\\.yasetube\\.com/",
        "action": 1,
        "waitElement": [
            ".video-preview+img[data-src].loaded",
            ".video-preview+img[data-src]:not(.loaded)"
        ],
        "nextLink": "//li[a/@class='current']/following-sibling::li[1]/a",
        "pageElement": ".videos-list article",
        "replaceElement": ".pagination",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let url=gae('#wpst-main-js')[0].src;if(url){fetch(url).then(res=>res.text()).then((res)=>{eval(res)})}let ps=gae('.videos-list');let last=ps.length-1;ps[last].querySelectorAll('img.loaded').forEach(img=>{if(!img.parentNode.getAttribute('data-thumbs')){img.onmouseenter=e=>{img.classList.add('video-img--hidden')}}})",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "黃色倉庫",
        "example": "http://2364ck.cc/vodtype/15.html",
        "url": "^https?://[^/]+/",
        "include": "//title[contains(text(),'黄色仓库')]",
        "pinUrl": true,
        "nextLink": "li.hidden-xs.active+li>a",
        "pageElement": ".stui-pannel-bd",
        "replaceElement": ".stui-pannel-ft",
        "css": "body>*:nth-child(1),.stui-vodlist>li:nth-child(n+1):nth-child(-n+3){display:none!important}.pagetual_pageBar{margin-top:0px!important;margin-bottom:0px!important}.pagetual_pageBar+*{margin-top:-10px!important;}a[data-original]{opacity:1!important}"
    },
    {
        "name": "r18.clickme.net",
        "example": "https://r18.clickme.net/c/new",
        "url": "^https?://r18\\.clickme\\.net/",
        "nextLink": "li.active+li>a",
        "pageElement": "#article-list",
        "replaceElement": "#pages"
    },
    {
        "name": "fc2cm 去模糊",
        "example": "https://fc2cm.com/?c=sensen321&nc=0",
        "url": "^https?://fc2cm\\.com/",
        "pinUrl": true,
        "nextLink": "span+a",
        "pageElement": "#contentInner aside dl",
        "replaceElement": ".st-pagelink",
        "pageBar": 0,
        "css": ".sampleimg_b,img{-webkit-filter:none!important}img{-moz-opacity:1!important;opacity:1!important}"
    },
    {
        "name": "fc2hub",
        "example": "https://fc2hub.com/",
        "url": "^https?://fc2hub\\.com/",
        "action": 1,
        "nextLink": "a[rel='next']",
        "pageElement": "//div[(div/div/@class='card shadow') and @class='row']",
        "replaceElement": ".pagination"
    },
    {
        "name": "PPP.Porn",
        "example": "https://ppp.porn/",
        "url": "^https?://ppp\\.porn/",
        "nextLink": "//li[a/@class='pagination__item  pagination__item--selected']/following-sibling::li[1]/a",
        "pageElement": "div[id^='list_videos']",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ps=gae(\"div[id^='list_videos']\");let last=ps.length-1;ps[last].querySelectorAll('figure.aspect-ratio>a').forEach(a=>{a.onmouseenter=e=>{let v=document.createElement('VIDEO');let img=a.querySelector('img');$(v).attr({loop:'',autoplay:'',src:img.getAttribute('data-preview'),webkitplaysinline:'true',playsinline:'true'});$(v).css({position:'absolute',left:'0',top:'0',width:img.offsetWidth+'px',height:img.offsetHeight+'px',background:'#000000',visibility:'visible'});a.appendChild(v)};a.onmouseleave=e=>{a.querySelector('VIDEO').remove()}})",
        "replaceElement": "nav.pagination",
        "css": ".pagetual_pageBar{margin-top:0px!important;margin-bottom:16px!important}.padding-bottom-md{padding-bottom:unset!important}nav.pagination{padding-top:var(--space-md)!important}"
    },
    {
        "name": "PPP.Porn - 首頁(載入更多 …)",
        "example": "https://ppp.porn/",
        "url": "^https?://ppp\\.porn/$",
        "loadMore": ".btn.btn--sm"
    },
    {
        "name": "YavTube",
        "example": "https://yavtube.com/，https://r18hub.com/",
        "url": "^https?://(yavtube|r18hub)\\.com/",
        "exclude": ".model-wrapper",
        "nextLink": "li.active+li.wave-effect>a",
        "pageElement": "ul.item-list",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "magnetdl.com",
        "example": "www.magnetdl.com",
        "url": "^https?://www\\.magnetdl\\.com/",
        "nextLink": "id('pages')/a[contains(string(),'>')]",
        "pageElement": ".download>tbody>tr:nth-last-child(n+4)",
        "replaceElement": "#pages"
    },
    {
        "name": "tokyomotion",
        "example": "https://www.tokyomotion.net/videos",
        "url": "^https?://www\\.tokyomotion\\.net/(videos|albums)",
        "nextLink": "ul.pagination:not(.pagination-lg) li.active+li>a",
        "pageElement": ".well.well-sm+.row,#wrapper>.container>.row .row>*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "tokyomotion - 相簿原圖",
        "example": "https://www.tokyomotion.net/photo/884869/",
        "url": "^https?://www\\.tokyomotion\\.net/photo",
        "nextLink": "//a[text()='下一步' or text()='Next']",
        "pageElement": ".thumb-overlay",
        "replaceElement": ".clearfix+div.pull-left+div",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "tokyomotion - 相簿",
        "example": "https://www.tokyomotion.net/album/67719",
        "url": "^https?://www\\.tokyomotion\\.net/album/\\d+",
        "nextLink": "ul.pagination:not(.pagination-lg) li.active+li>a",
        "pageElement": ".row>div[id^=album_photo_]",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "tokyomotion",
        "example": "https://www.tokyomotion.net/",
        "url": "^https?://www\\.tokyomotion\\.net/(page=\\d+)?$",
        "action": 1,
        "nextLink": "li.active+li>a",
        "pageElement": ".col-sm-12>.row>.col-sm-12>.row>*",
        "replaceElement": ".pagination",
        "wait": "let img=doc.querySelector('.col-lg-4 img');return img!=null",
        "pageBar": 0
    },
    {
        "name": "7mmtv - 分類",
        "example": "https://7mmtv.sx/zh/uncensored_random/all/index.html",
        "url": "^https?://7mmtv\\.sx/(zh|en|ja|ko)/[a-z]+_(random|list)/",
        "nextLink": "li.page-item.current+li.page-item>a",
        "pageElement": ".row.content",
        "replaceElement": "nav.pagination-row",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ps=gae('.row.content');let last=ps.length-1;ps[last].querySelectorAll('.video').forEach(div=>{div.onmouseenter=e=>{let v=div.querySelector('video[data-src]');v.setAttribute('src',v.getAttribute('data-src'));$(v).css({visibility:'visible'});let l=div.querySelector('.video-loader');$(l).css({visibility:'visible'});setTimeout(()=>{$(l).css({visibility:'hidden'})},500)};div.onmouseleave=e=>{let v=div.querySelector('video[data-src]');let l=div.querySelector('.video-loader');v.setAttribute('src','');v.setAttribute('style','');$(l).css({visibility:'hidden'})}})",
        "css": ".pagetual_pageBar{margin-top:-10px!important}"
    },
    {
        "name": "tktube",
        "example": "https://www.tktube.com/categories/fc2/",
        "url": "^https?://(www\\.)?tktube\\.com/",
        "nextLink": ".next>a",
        "pageElement": ".list-videos",
        "replaceElement": "[id$='pagination']",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ps=gae('.list-videos');let last=ps.length-1;ps[last].querySelectorAll('.item>a>.img').forEach(div=>{div.onmouseenter=e=>{let v=document.createElement('video');let img=div.querySelector('.thumb');$(v).attr({loop:'',autoplay:'',src:img.getAttribute('data-preview'),webkitplaysinline:'true',playsinline:'true'});$(v).css({position:'absolute',left:'0',top:'0',width:img.offsetWidth+'px',height:img.offsetHeight+'px',background:'#000000',visibility:'visible'});div.appendChild(v)};div.onmouseleave=e=>{div.querySelector('video').remove()}})"
    },
    {
        "name": "RIRI TV / playav",
        "example": "https://ri1.site/?filter=random，https://playav.tv/category/chinese-model",
        "url": "^https?://(ri1\\.site|playav\\.tv)/",
        "pinUrl": true,
        "nextLink": "//li[a/@class='current']/following-sibling::li[1]/a",
        "pageElement": "#main .thumb-block",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageInit": "doc.querySelectorAll('.post-thumbnail-container>img:not(.loaded)').forEach(img=>{if(img){img.setAttribute('class','loaded')}})",
        "pageAction": "let url=document.querySelector('#wpst-main-js').src;if(url)fetch(url).then(res=>res.text()).then((res)=>{eval(res)})",
        "pageBar": 0,
        "css": "#dclm_modal_screen,#dclm_modal_content,[class^='happy'],.widget.widget_text{display:none!important}"
    },
    {
        "name": "JAVCT",
        "example": "https://javct.net/uncensored",
        "url": "^https?://javct\\.net/",
        "nextLink": "li.paginator__item.paginator__item--next>a",
        "pageElement": ".container>.row.row--grid>*",
        "replaceElement": ".paginator",
        "rate": 3,
        "pageBar": 0,
        "css": ".text__links{display:none!important}"
    },
    {
        "name": "Jable",
        "example": "https://jable.tv/new-release/",
        "url": "^https?://(jable|fs1)\\.(tv|app)/",
        "init": "document.querySelectorAll('#list_videos_common_videos_list_sort_list a').forEach(a=>{a.setAttribute('onclick','setTimeout(()=>{location.reload()}, 800)')})",
        "nextLink": "//li[span/@class='page-link active disabled']/following-sibling::li[1]/a",
        "pageElement": "section>.row",
        "replaceElement": ".pagination",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ps=gae('section>.row');let last=ps.length-1;ps[last].querySelectorAll('.img-box>a').forEach(a=>{a.onmouseenter=e=>{let v=document.createElement('video');let img=a.querySelector('img');let src=img.getAttribute('data-preview');$(v).attr({loop:'',autoplay:'',src:img.getAttribute('data-preview')});$(v).css({position:'absolute',left:'0',top:'0',width:img.offsetWidth+'px',height:img.offsetHeight+'px',background:'#000000',visibility:'visible'});a.appendChild(v)};a.onmouseleave=e=>{a.querySelector('video').remove()}})",
        "css": ".pagetual_pageBar{margin-top:0px!important;margin-bottom:20px!important}"
    },
    {
        "name": "javpark.net",
        "example": "https://javpark.net/category/movie/",
        "url": "^https?://javpark\\.net/category/",
        "action": 1,
        "nextLink": "a.next.page-numbers",
        "pageElement": "#main article",
        "replaceElement": "nav.navigation.pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "壹纳网 - 內文",
        "example": "https://yinaw.com/23035.html",
        "url": "^https?://yinaw\\.com/\\d+\\.html",
        "nextLink": ".fenye span+a",
        "pageElement": ".article-content>p,.article-content>h2,.article-content>#erphpdown",
        "replaceElement": ".fenye",
        "pageBar": 0
    },
    {
        "name": "壹纳网 - 文章",
        "example": "https://yinaw.com/",
        "url": "^https?://yinaw\\.com/",
        "nextLink": ".next-page>a",
        "pageElement": ".excerpt",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar+.excerpt{margin-top:-2px!important;}"
    },
    {
        "name": "mangabtt - 漫畫閱讀",
        "example": "https://mangabtt.com/manga/transmigrating-to-the-otherworld-once-more/chapter-30-eng-li/291628",
        "url": "^https?://mangabtt\\.com/",
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.getAttribute('data-src')})",
        "include": "option[selected]",
        "nextLink": "#nextChapter",
        "pageElement": ".reading-detail",
        "replaceElement": "#chapter-nav"
    },
    {
        "name": "klmanga - 漫畫閱讀",
        "example": "https://klmanga.net/bsaq-i-became-a-magical-cheat-loli-witch-my-different-world-life-with-my-reincarnation-privilege-creation-magic-and-the-seed-of-magic-manga-chapter-5.html",
        "url": "^https?://klmanga\\.net/",
        "include": "option[selected]",
        "pinUrl": true,
        "action": 1,
        "history": 2,
        "nextLinkByJs": "function gx(x){return doc.evaluate(x,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}let next = gx('//option[@selected]/preceding-sibling::option[1]'); if (next) return location.href.replace(/[^-]+\\.html$/,'') + next.innerText.match(/[0-9.]+/)[0]+'.html'",
        "pageElement": "center .chapter-content",
        "replaceElement": ".navbar-nav"
    },
    {
        "name": "Rawkuma - 漫畫閱讀",
        "example": "https://rawkuma.com/mikata-ga-yowa-sugite-hojo-mahou-ni-toushite-ita-kyuutei-mahou-shi-tsuihou-sarete-saikyou-wo-mezasu-chapter-1/",
        "url": "^https?://rawkuma\\.com/",
        "pinUrl": true,
        "action": 1,
        "history": 2,
        "nextLink": ".ch-next-btn",
        "pageElement": "#readerarea",
        "replaceElement": ".chnav.ctop"
    },
    {
        "name": "manga1001 - 漫畫閱讀",
        "example": "manga1001.in，manga1001.su，mangaraw.vip",
        "url": "^https?://(manga1001|mangaraw)\\.(in|su|vip)/chapters/",
        "pinUrl": true,
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.getAttribute('data-src')})",
        "nextLink": "a[rel='next'],.nextchapter",
        "manualMode": true
    },
    {
        "name": "MANGAROW - 漫畫閱讀",
        "url": "^https?://mangarow\\.org/chapters/",
        "pinUrl": true,
        "history": 2,
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.getAttribute('data-src')})",
        "nextLink": "a[rel='next']",
        "pageElement": ".container-chapter-reader",
        "replaceElement": "//div[div/div/select]"
    },
    {
        "name": "MANGA1000 - 漫畫閱讀",
        "example": "https://manga1000.top/197/8175/",
        "url": "^https?://manga1000\\.top/\\d+/\\d+/",
        "pinUrl": true,
        "history": 2,
        "init": "setTimeout(()=>{document.querySelectorAll('img.chapter-img').forEach(img=>{img.src=img.src.replace('https://welovekai.com/proxy.php?link=','')})},500)",
        "nextLinkByJs": "let n = doc.querySelector('ul.chapter_select option[selected]').previousElementSibling;if(n!=null) return location.origin+n.value",
        "pageElement": "div.chapter-content>img",
        "pageInit": "doc.querySelectorAll('img.chapter-img').forEach(img=>{img.src=img.src.replace('https://welovekai.com/proxy.php?link=','')})",
        "replaceElement": "span[itemprop='name']",
        "css": "img.chapter-img{max-width: 98% !important;display: block !important;margin: 0 auto !important;}"
    },
    {
        "name": "MANGA1000 - 分类/搜索页",
        "example": "https://manga1000.top/",
        "url": "^https?://manga1000\\.top/",
        "include": ".pagination",
        "nextLink": "//a[text()='»']",
        "pinUrl": true,
        "pageElement": ".thumb-item-flow",
        "replaceElement": ".pagination, .col-md-8>.btn-group:first-child"
    },
    {
        "name": "鹹濕仔日報",
        "example": "https://jdaily18.com/view1/category/%e5%af%ab%e7%9c%9f/",
        "url": "^https?://jdaily18\\.com/",
        "nextLink": "a.next",
        "pageElement": "#post_container>*",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "ACG漫画网 - 阅读",
        "example": "https://www.acgxmh.com/h/314618.html",
        "url": "^https?://www\\.acgxmh\\.com/",
        "nextLink": "#pages span+a",
        "pageElement": ".manga-page img",
        "replaceElement": "#pages",
        "pageBar": 0,
        "css": ".manga-page a{display:none!important}"
    },
    {
        "name": "ACG漫画网 - 分类页",
        "example": "https://www.acgxmh.com/hentai/",
        "url": "^https?://www\\.acgxmh\\.com/",
        "nextLink": ".page.bigpage span+a",
        "pageElement": "#list,#doujin_album",
        "replaceElement": ".page.bigpage"
    },
    {
        "name": "ACGN小鎮/皮皮动漫社",
        "example": "https://www.bbsacgn.com/，https://pipidm.top/，https://www.pipidm.top/",
        "url": "^https?://(www\\.bbsacgn\\.com|pipidm\\.top|www\\.pipidm\\.top)/",
        "pageElement": ".posts-wrapper.scroll>*",
        "replaceElement": ".pagination"
    },
    {
        "name": "18x78",
        "example": "https://18x78.com/",
        "url": "^https?://18x78\\.com/",
        "nextLink": "a.next",
        "pageElement": ".posts-wrapper",
        "replaceElement": ".page-numbers",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "绅士漫画 - 閱讀",
        "example": "https://wnacg.org/photos-view-id-15403544.html",
        "url": "^https?://(www\\.)?(wnacg|htcomic|ssmh\\d+)\\.[^/]+/photos-view",
        "include": "span.newpagelabel",
        "init": "let a=document.querySelector('#imgarea>a');a.outerHTML=a.innerHTML;",
        "nextLink": "//a[text()='下一頁']",
        "stopSign": "let p=doc.querySelector('span.newpagelabel').textContent;let m=p.match(/(\\d+)\\/(\\d+)/);if(m[1]==m[2])return true;",
        "pageElement": "#picarea",
        "replaceElement": ".newpagewrap,.png.bread,.grid_2.cc",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "绅士漫画",
        "example": "https://wnacg.org/albums-index-cate-9.html",
        "url": "^https?://(www\\.)?(wnacg|htcomic|ssmh\\d+)\\.[^/]+/(albums|search|photos-index)",
        "nextLink": "span.thispage+a",
        "pageElement": "li.gallary_item",
        "replaceElement": ".paginator",
        "pageBar": 0
    },
    {
        "name": "松鼠症倉庫 - 閱讀",
        "example": "https://ahri8.top/readOnline2.php?ID=97432&host_id=0",
        "url": "^https?://[^/]+/readOnline2\\.php",
        "include": "//div[@id='logo-group']//a[contains(text(),'松鼠症倉庫') or contains(text(),'松鼠症仓库')]",
        "action": 1,
        "pageElement": "[id^=read_online_image]",
        "replaceElement": "#page_num1,#next_page_btn_area,#page_num2,#next_page_btn_area2",
        "pageBar": 0,
        "css": "#content>.col-lg-12,[id^=read_online_ads_area],#Big_Image~*{display:none!important}"
    },
    {
        "name": "松鼠症倉庫",
        "example": "https://ahri8.top/dnew.php?t=1669824000",
        "url": "^https?://[^/]+/dnew\\.php",
        "include": "//div[@id='logo-group']//a[contains(text(),'松鼠症倉庫') or contains(text(),'松鼠症仓库')]",
        "action": 1,
        "nextLink": ".pagination li.active+li>a",
        "pageElement": "#gallery",
        "replaceElement": ".pagination",
        "css": "#content>[style^='text-align']{display:none!important}"
    },
    {
        "name": "绅士会所",
        "example": "www.hentaiclub.net，www.sshs.club",
        "url": "^https?://www\\.(hentaiclub|sshs)\\.(net|club)/",
        "nextLink": "li.next-page>a",
        "pageElement": "article[class]:not(.excerpt-minic-index)",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "绅士仓库 - 排行/作者墙",
        "example": "https://cangku.icu/",
        "url": "^https?://cangku\\.[^/]+/(rank|author)",
        "loadMore": ".container .el-button:not(.is-loading)"
    },
    {
        "name": "绅士仓库",
        "example": "https://cangku.icu/",
        "url": "^https?://cangku\\.",
        "action": 1,
        "nextLink": "li.number.active+li.number",
        "pageElement": ".post-list>.row, .category-post>.row, #user-post>.row, #user-favorite>.row, #user-comment .comment-list",
        "waitElement": [
            ".post-card-content>.cover"
        ],
        "replaceElement": ".page-pagination",
        "css": ".pagetual_pageBar{margin-top:-12px!important}"
    },
    {
        "name": "LoLHentai",
        "example": "https://www.lolhentai.net/",
        "url": "^https?://www\\.lolhentai\\.net/",
        "action": 1,
        "wait": 2000,
        "nextLink": "a[rel='next']",
        "pageElement": "//div[ul/li/div/a/img[@class='thumbnail']]",
        "replaceElement": ".pagination",
        "rate": 3
    },
    {
        "name": "The Hentai World",
        "example": "https://thehentaiworld.com/?new",
        "url": "^https?://thehentaiworld\\.com/",
        "nextLink": "a.next, .current+.minithumb>a",
        "papageElementeE": ".thumb, #doujin>a",
        "replaceElement": ".navigation, #miniThumbContainer"
    },
    {
        "name": "Danbooru",
        "example": "danbooru.donmai.us，e621.net",
        "url": "^https?://(danbooru\\.)?(donmai|e621)\\.(us|net)/",
        "nextLink": "a[rel='next']",
        "pageElement": "article",
        "replaceElement": ".paginator"
    },
    {
        "name": "Rule34",
        "example": "rule34hentai.net，rule34.paheal.net",
        "url": "^https?://rule34(hentai|\\.paheal)\\.net/",
        "nextLink": "//a[text()='Next']",
        "pageElement": ".thumb",
        "replaceElement": "#paginator"
    },
    {
        "name": "Gelbooru",
        "example": "gelbooru.com，tbib.org，safebooru.org，illusioncards.booru.org，rule34.xxx，hypnohub.net，xbooru.com",
        "url": "^https?://(illusioncards\\.)?(gelbooru|tbib|safebooru|booru|rule34|hypnohub|xbooru)\\.(com|org|xxx|net)/.+s=list",
        "nextLink": "a[alt='next']",
        "pageElement": ".thumbnail-container, span.thumb",
        "replaceElement": "#paginator",
        "pageBar": 0
    },
    {
        "name": "yande",
        "example": "konachan.net，konachan.com，yande.re，www.sakugabooru.com",
        "url": "^https?://(konachan\\.net|konachan\\.com|yande\\.re|www\\.sakugabooru\\.com)/(post|comment)($|\\?|#|/search\\?)",
        "pageElement": "//li[contains(@class, 'creator-id-')]|//div[@id='comment-list']/div[@class='post']|//table[@class='highlightable']",
        "nextLink": "//a[@class='next_page']",
        "replaceElement": "#paginator",
        "pageBar": 0,
        "css": ".javascript-hide { display: inline-block !important; }.pagetual_pageBar { display: inline-flex!important;width: 100%!important; }"
    },
    {
        "name": "hitomi - Gallery Info",
        "example": "https://hitomi.la/doujinshi/akisame-mabara-ni-natte-%E4%B8%AD%E6%96%87-2431684.html#1",
        "url": "^https?://hitomi\\.la/(cg|manga|doujinshi|gamecg)/.+\\.html#1$",
        "pinUrl": true,
        "css": "li[class^='simplePagerPage']{display: inline-block!important;}.simplePagerNav{display:none!important}"
    },
    {
        "name": "hitomi - 分類",
        "example": "https://hitomi.la/?page=2",
        "url": "^https?://hitomi\\.la/",
        "include": ".page-container",
        "action": 1,
        "nextLinkByUrl": [
            "([^?]+)(\\?page=(\\d+))?$",
            "$1?page={($3.0||1)+1}",
            ".page-container>ul>li:last-child>a"
        ],
        "pageElement": ".gallery-content>*",
        "replaceElement": ".page-container",
        "waitElement": [
            "",
            ".gallery-content[style]"
        ],
        "pageBar": 0
    },
    {
        "name": "Orzqwq",
        "example": "https://orzqwq.com/manga-genre/big-breasts/",
        "url": "^https?://orzqwq\\.com/",
        "action": 1,
        "nextLink": ".nextpostslink,li.active+li>a",
        "pageElement": ".page-content-listing.item-big_thumbnail,.chapter-images-list>.image-item",
        "replaceElement": ".wp-pagenavi,.pagination",
        "rate": 3,
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": 10
    },
    {
        "name": "E-Hentai",
        "example": "http://(e-hentai|exhentai).org/",
        "url": "^https?://e-hentai\\.org/",
        "nextLink": "//table[@class='ptt']//a[string()='>'] | id('next') | id('unext')",
        "pageElement": ".itg>div, .itg>tbody>tr:not(:first-of-type), #gdt>div:not(.c), #img",
        "replaceElement": ".ptt, .ptb, .sn, .searchnav",
        "css": "#img {max-width: 100% !important;height: auto !important;min-height: 400px;}"
    },
    {
        "name": "ExHentai.org",
        "url": "^https?://exhentai\\.org/(?!g)",
        "nextLink": "body > div.ido > div:nth-of-type(2) > div.searchnav > div:nth-of-type(5) > a",
        "pageElement": "body > div.ido > div:nth-of-type(2)",
        "insert": "body > div.ido > div:nth-of-type(2)",
        "insertPos": 2,
        "pinUrl": true
    },
    {
        "name": "177 漫画/xxiav - 圖片",
        "example": "www.177picyy.com，www.xxiav.com",
        "url": "^https?://www.(177picyy|177pica|xxiav).com/",
        "init": "let _img='';document.querySelectorAll('img[data-lazy-src]').forEach(e=>{_img+=`<img src='${e.getAttribute('data-lazy-src')}'>`});document.querySelector('.single-content').innerHTML=_img;",
        "include": ".page-links",
        "nextLink": "//div[@class='page-links']/a[span/i[@class='be be-arrowright']]",
        "pageElement": ".single-content",
        "replaceElement": ".page-links",
        "pageInit": "let _img='';doc.querySelectorAll('img[data-lazy-src]').forEach(e=>{_img+=`<img src='${e.getAttribute('data-lazy-src')}'>`});doc.querySelector('.single-content').innerHTML=_img;",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".single-content+.single-content{margin-top:0px!important}"
    },
    {
        "name": "177 漫画/xxiav - 分類",
        "example": "www.177picyy.com，www.xxiav.com",
        "url": "^https?://www.(177picyy|177pica|xxiav)\\.com/",
        "include": ".nav-links",
        "nextLink": "span.current+a",
        "pageElement": "#main article",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "18 禁漫 - 閱讀",
        "example": "https://www.18mh.cc/index-look-name-%E8%AB%8B%E6%BB%91%E5%85%A5%E8%A7%A3%E9%8E%96-cid-NaTcMaxcMjYO0O0O-id-619923",
        "url": "^https?://www\\.18mh\\.cc/index-look",
        "nextLink": "//div[@class='c']/a[text()='下一頁'][not(@class='n fanye')]",
        "pageElement": ".e>img:not([style='display:none;'])",
        "replaceElement": ".c, .b",
        "css": ".e img {display: block; margin: 0 auto;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "lazyImgSrc": "data-url"
    },
    {
        "name": "18 禁漫 - 分類",
        "example": "https://www.18mh.cc/index-html-status-2",
        "url": "^https?://www\\.18mh\\.cc/",
        "nextLink": "//a[text()='下一頁']",
        "pageElement": ".liemh.htmls.indliemh>*",
        "replaceElement": ".pagination",
        "lazyImgSrc": "data-url",
        "pageBar": 0
    },
    {
        "name": "禁漫天堂 - 分类页",
        "example": "https://18comic.vip/，https://18comic.org/",
        "url": "^https?://18comic\\.(vip|org)/(album|search|blogs|videos|movies|promotes)",
        "pinUrl": true,
        "init": "setTimeout(()=>{let c=document.querySelector('button#chk_cover');if(c){c.click()}},2000);document.querySelectorAll(`img[src*='blank.jpg'][data-original]`).forEach(img=>{img.src=img.getAttribute('data-original')})",
        "nextLink": "#wrapper>.container>div:not(.row)>.pagination .prevnext",
        "pageElement": "#wrapper>.container>.row:not(:last-of-type):not(.visible-xs)",
        "replaceElement": "#wrapper>.container>div:not(.row)>.pagination",
        "autoClick": "#chk_cover",
        "css": ".row>[style='z-index: 0;'], .col-lg-3.col-md-3.col-sm-3.col-xs-6 {display: none !important;}"
    },
    {
        "name": "Hanime1 - 漫画",
        "example": "https://hanime1.me/comic/80357/1",
        "url": "^https?://hanime1\\.me/comic\\/\\d+\\/\\d",
        "nextLink": "a.comic-show-content-nav-item-wrapper.arrow-right",
        "pageElement": "img#current-page-image",
        "replaceElement": ".comic-show-content-nav",
        "css": "#current-page-image {display: block !important; margin: 0 auto !important; max-height: calc(250vh) !important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "Hanime1 - 圖片清單檢視全部",
        "example": "https://hanime1.me/comic/65225",
        "url": "^https?://hanime1\\.me/comic/\\d+$",
        "pinUrl": true,
        "nextLink": "0",
        "init": "let loop=setInterval(()=>{let b=document.querySelector(\"#comics-thumbnail-show-btn-wrapper:not([style*='none'])\");if(b){b.querySelector('#show-all-comics-btn').click()}if(!b){clearInterval(loop)}},2000)"
    },
    {
        "name": "Hanime1",
        "example": "https://hanime1.me/search?genre=%E8%A3%8F%E7%95%AA&duration=&sort=&query=&year=&month=",
        "url": "^https?://hanime1\\.me/(search|comics)",
        "nextLink": "a[rel='next']",
        "pageElement": ".home-rows-videos-wrapper>a,.content-padding-new,.comics-related-wrapper>.comic-rows-videos-div",
        "replaceElement": ".pagination",
        "lazyImgSrc": "data-srcset",
        "css": ".home-rows-videos-div{margin-bottom:10px!important;}.search-pagination{margin-top:-50px!important;}"
    },
    {
        "name": "免费私房图 - 看圖",
        "example": "http://www.mfsft.com/gaoqing/photo/20221021/139363.html，http://www.ywmtw.com/yao/kantu/20240223/160249.html",
        "url": "^https?://[^/]+/",
        "include": "#ztlui3",
        "action": 1,
        "init": "document.querySelectorAll('#picg a').forEach(a=>{a.outerHTML=a.innerHTML})",
        "nextLink": "//div[@class='page']/div[@class='pagelist']//a[text()='下一页']",
        "pageElement": "#picg img[alt]",
        "replaceElement": ".page>.pagelist",
        "css": "#picg img:hover{transform:none !important}#picg img{max-width:100% !important;display:block !important;margin:0 auto !important;filter:blur(0px) !important}body>br,.interestline+center,center+#pic,#xzpap1,#divpsgx,#bdivpx,#divfts,#divftsp,#app+div,#xzappsq,div.bg-text,#divpsg,#divStayTopright2,#bdssy,#qrcode2,#d5tig,#pcapicb,#google_translate_element,#d5a>*:not([id]):not([class]){display:none !important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "免费私房图 - 分類",
        "example": "http://www.mfsft.com/gaoqing/tulie/1_1.html，http://www.ywmtw.com/yao/kantum/1_1.html",
        "url": "^https?://[^/]+/",
        "include": ".pagelist a[title='尾页']",
        "init": "let gax=x=>{let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes};gax(\"//div[@id='list']/ul/li[a[not(@title)] or starts-with(@id,'listmmt')]\").forEach(e=>{e.remove()})",
        "nextLink": "//div[@class='pagelist']/p/u[b]/following-sibling::a[1]",
        "pageElement": "//div[@id='list']/ul/li[a[@title and img[@class='lazy']]/following-sibling::div[@class='title']]",
        "replaceElement": ".pagelist",
        "rate": 4,
        "pageBar": 0,
        "css": "[href^='https://www.358a.vip/'],#span_xzappsq,#span_listp,#bdssx,#listmt,#listmt2,#listmt3,#listmt4,#listmmt2,#xzappsq,#listp,#listja,.interestline~br{display:none!important}"
    },
    {
        "name": "秀人集 / 秀人美女網 / 爱美女网 - 搜索",
        "example": "https://www.xiurenba.cc/plus/search/index.asp?keyword=XiuRen，https://www.xrmn01.cc/plus/search/index.asp?keyword=XiuRen，http://www.imn5.net/plus/search/index.asp?keyword=XiuRen",
        "url": "^https?://www\\.(xiuren|xrmn|imn5)(\\w{1,2})?\\.[a-z]{2,3}/plus/search/",
        "nextLink": "a.current+a",
        "pageElement": ".list>.node",
        "replaceElement": ".page",
        "pageBar": 0,
        "css": "section.container>p{display:none!important}"
    },
    {
        "name": "秀人集 / 秀人美女網 / 爱美女网 - 看圖",
        "example": "https://www.xiurenba.cc/XiuRen/11496.html，https://www.xrmn01.cc/XiuRen/2022/202212158.html，http://www.imn5.net/XiuRen/XiuRen/11535.html",
        "url": "^https?://www\\.(xiuren|xrmn|imn5)(\\w{1,2})?\\.[a-z]{2,3}/",
        "init": "document.querySelectorAll('br').forEach(br=>{br.remove()})",
        "nextLink": "//a[text()='下页']",
        "pageElement": ".content img,.imgwebp img",
        "replaceElement": ".page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".item_title>[id],section.container>p{display:none!important}"
    },
    {
        "name": "秀人集 / 秀人美女網 / 爱美女网 - 分類",
        "example": "https://www.xiurenba.cc/XiuRen/，https://www.xrmn01.cc/XiuRen/，http://www.imn5.net/XiuRen/XiuRen/",
        "url": "^https?://www\\.(xiuren|xrmn|imn5)(\\w{1,2})?\\.[a-z]{2,3}/",
        "exclude": [
            ".item_info",
            ".imgwebp"
        ],
        "nextLink": "//a[text()='下页']",
        "pageElement": "div.page+ul.update_area_lists>*,script+ul.update_area_lists>*,.excerpts>.excerpt",
        "replaceElement": "div.page",
        "pageBar": 0
    },
    {
        "name": "秀人图集 - 分類",
        "example": "http://xiuren0.com/",
        "url": "^https?://xiuren0\\.com/",
        "init": "let gax=x=>{let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes};gax(\"//div[div[a[img[contains(@data-src,'igusoft')]]]]\").forEach(e=>{e.remove()})",
        "pageElement": "//div[div[a[img[not(contains(@data-src,'igusoft.com'))]]]]",
        "replaceElement": ".pagination"
    },
    {
        "name": "Xiutaku - 分類",
        "example": "https://xiutaku.com/brand/1",
        "url": "^https?://xiutaku\\.com/(\\w+/\\d+|\\w+)?$",
        "init": "document.querySelectorAll('.search-form~*,.blog~*:not([class]),.pagination~*').forEach(e=>{e.remove()});",
        "pageElement": ".columns",
        "replaceElement": ".pagination"
    },
    {
        "name": "萝丝派 - 分類",
        "example": "https://www.yylsp.com/",
        "url": "^https?://www\\.yylsp\\.com/",
        "pageElement": ".posts-item.card",
        "insert": ".pagenav.ajax-pag",
        "insertPos": 1,
        "replaceElement": ".pagenav"
    },
    {
        "name": "绅士猫 - 分類",
        "example": "https://www.cos6.net/",
        "url": "^https?://www\\.cos6\\.net/",
        "pageElement": "posts.posts-item",
        "insert": ".pagenav.ajax-pag",
        "insertPos": 1,
        "replaceElement": ".pagenav"
    },
    {
        "name": "COSPLAY ZIP - 分類",
        "example": "https://www.coszip.com/",
        "url": "^https?://www\\.coszip\\.com/",
        "pageElement": ".jeg_inner_content .jeg_block_container",
        "insert": ".jeg_block_navigation",
        "insertPos": 1,
        "replaceElement": ".jeg_block_navigation"
    },
    {
        "name": "Chinese Beauties - 分類",
        "example": "https://sxchinesegirlz.one/",
        "url": "^https?://sxchinesegirlz\\.one/",
        "nextLinkByJs": "let next=doc.querySelector('span.current+a');if(next)return next.href.replace(/\\?fbclid=\\w+/i,'');",
        "pageElement": ".latestPost.excerpt",
        "insert": ".pagination",
        "insertPos": 1,
        "replaceElement": ".pagination"
    },
    {
        "name": "图宅网 - 分類",
        "example": "https://www.tuzac.com/",
        "url": "^https?://www\\.tuzac\\.com/",
        "pageElement": ".node-teaser",
        "insert": "#pager",
        "insertPos": 1,
        "replaceElement": "#pager",
        "css": ".content-container .content{margin-right:0px!important}.ad-side-right,.footer{display:none!important}"
    },
    {
        "name": "Fuskator- 分類",
        "example": "https://fuskator.com/",
        "url": "^https?://fuskator\\.com/",
        "pageElement": ".thumblinks",
        "replaceElement": "td.pages"
    },
    {
        "name": "Asianude4u - 分類",
        "example": "https://www.asianude4u.net/",
        "url": "^https?://www\\.asianude4u\\.net/",
        "action": 1,
        "pageElement": "#infinite-articles",
        "replaceElement": ".wp-pagenavi",
        "css": ".ms-item.homeimg{display:none!important}"
    },
    {
        "name": "美人图 - 看圖",
        "example": "https://meirentu.cc/pic/147617207297.html",
        "url": "^https?://meirentu\\.cc/pic/",
        "include": ".item_info",
        "init": "document.querySelectorAll('.content br').forEach(br=>{br.remove()})",
        "nextLink": "//a[text()='下页']",
        "pageElement": ".content img",
        "replaceElement": "div.page",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "美人图 - 分類",
        "example": "https://meirentu.cc/group/xiuren.html",
        "url": "^https?://meirentu\\.cc/",
        "include": ".fl_title",
        "nextLink": "//a[text()='下页']",
        "stopSign": [
            "ul.update_area_lists img"
        ],
        "pageElement": "ul.update_area_lists",
        "replaceElement": "div.page",
        "css": ".pagetual_pageBar{margin-top: -10px!important;margin-bottom: -10px!important;}.update_area_lists{margin-top: -10px!important;margin-bottom: 0px!important;}"
    },
    {
        "name": "NEXE channels/models",
        "example": "https://nehen.xyz/models",
        "url": "^https?://[^/]+/(models|channels)",
        "pinUrl": true,
        "include": "//title[contains(text(),'NEXE')]",
        "nextLink": "//li[a/@class='active']/following-sibling::li[1][not(@title)]/a",
        "pageElement": ".margin-top-sm>.hex,.padding-lr-sm>.hex",
        "replaceElement": ".pagination",
        "pageInit": "doc.querySelectorAll('div.media[data-src]').forEach(div=>{div.style.width=div.dataset.width;div.style.height=div.dataset.height+'px';div.style.backgroundImage=`url('${div.dataset.src}')`;div.removeAttribute('data-src');div.removeAttribute('data-height');div.removeAttribute('data-width');div.classList.remove('loading')})",
        "css": "h2~.pagetual_pageBar{margin-top:-20px!important}.pagetual_pageBar{margin-top:2px!important}.padding-lr-xs.margin-tb-xs {display: none !important;}.mobile .content{padding:0!important}"
    },
    {
        "name": "NEXE",
        "example": "https://nehen.xyz/",
        "url": "^https?://[^/]+/(\\?forwarding.+|best.+|search.+|index.+|amateur.+|danmaku.*|keywords.*)?$",
        "pinUrl": true,
        "include": "//title[contains(text(),'NEXE')]",
        "nextLink": "//li[a/@class='active']/following-sibling::li[1][not(@title)]/a",
        "pageElement": ".margin-top-sm>.hex,.hot-keywords",
        "replaceElement": ".pagination",
        "pageInit": "doc.querySelectorAll('div.media[data-thumb]').forEach(div=>{div.style.backgroundImage=`url('${div.dataset.src}')`;div.removeAttribute('data-src');div.classList.remove('loading');})",
        "pageAction": "let es=document.querySelectorAll('.margin-top-sm>.hex');if(es.length>1){let last=[...es].pop();last.querySelectorAll('div[data-thumb]').forEach(e=>{let img=new Image();img.src=e.getAttribute('data-thumb');img.onerror=()=>{e.classList.add('error')}})}",
        "css": ".pagetual_pageBar{margin-top:0px!important}.hot-keywords+.pagetual_pageBar{margin-top:6px!important}.pagetual_pageBar+.hot-keywords{margin-top:0px!important}.padding-lr-xs.margin-tb-xs {display: none !important;}.mobile .content{padding:0!important}"
    },
    {
        "name": "JieAV",
        "example": "www.jieav.com，www.qinav.com，www.qinimg.com，www.yinmh.com，www.txtxi.com，www.dnaav.com，www.jiedm.com，www.tasexy.com，www.feiav.com，www.liliav.com，www.keaiav.com，www.miliav.com，www.huiav.com，www.heihd.com，www.pornff.com，www.comfff.com",
        "url": "^https?://(www|cn|jp|kr|ru)\\.(jieav|qinav|qinimg|yinmh|txtxi|dnaav|jiedm|tasexy|feiav|liliav|keaiav|miliav|huiav|heihd|pornff|comfff)\\.(com|xyz|top)/",
        "nextLink": "a.active+a",
        "pageElement": ".list_box>ul:not([id]):not([class]),.site+.actor_box>ul",
        "replaceElement": ".pages",
        "lazyImgSrc": "img",
        "rate": 3,
        "initRun": 1,
        "autoLoadNum": 1,
        "pageInit": "doc.querySelectorAll(`.image>img[img^='h']`).forEach(img=>{img.src=img.getAttribute('img');img.setAttribute('img','')})",
        "pageBar": 0
    },
    {
        "name": "成人色情分享論壇",
        "example": "https://www.rouav.com/magnet/index.html",
        "url": "^https?://www\\.rouav\\.com/magnet",
        "nextLink": ".active+a",
        "pageElement": "//div[@class='magnet']",
        "replaceElement": ".pages",
        "css": ".pagetual_pageBar{margin-top:-17px!important;margin-bottom:0px!important}"
    },
    {
        "name": "成人色情分享論壇",
        "example": "https://www.rouav.com/",
        "url": "^https?://www\\.rouav\\.com/(home)?",
        "nextLink": ".active+a",
        "pageElement": "//div[not(div/@id='loading') and @class='box']",
        "replaceElement": ".pages",
        "lazyImgSrc": "img",
        "pageBar": 0
    },
    {
        "name": "CartoonPornVideos",
        "example": "https://www.cartoonpornvideos.com/popular",
        "url": "^https?://www\\.cartoonpornvideos\\.com/",
        "nextLink": ".next",
        "pageElement": ".thumb-list>div",
        "replaceElement": ".content>.pagination"
    },
    {
        "name": "hentai.tv",
        "example": "https://hentai.tv/",
        "url": "^https?://hentai\\.tv/(trending|genre)",
        "nextLink": "button[data-next]",
        "pageElement": "[data-results]",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "FC2 电子市场",
        "example": "https://adult.contents.fc2.com/search/?q=&genre=30&type=1",
        "url": "^https?://adult\\.contents\\.fc2\\.com/search",
        "nextLink": "span.items+a[data-link-name='pager']",
        "pageElement": ".c-cntCard-110-f",
        "replaceElement": ".c-pager-101",
        "pageBar": 0
    },
    {
        "name": "俺の3Dエロ動画",
        "example": "https://oreno3d.com/",
        "url": "^https?://oreno3d\\.com/",
        "nextLink": "a[rel='next']",
        "pageElement": ".g-main-grid>article",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "Sex Nori",
        "example": "https://www.sexnori26.me/bbs/board.php?bo_table=av_korea",
        "url": "^https?://www\\.sexnori(\\d+)?\\.me/",
        "nextLink": "a.next",
        "pageElement": ".gallery-item",
        "replaceElement": ".eb-pagination",
        "css": ".pagetual_pageBar{margin-top:12px!important}.gallery-item {position: static !important;float: left !important;}"
    },
    {
        "name": "UraakaList",
        "example": "https://uraakalist.com/",
        "url": "^https?://uraakalist\\.com/",
        "action": 1,
        "nextLink": "a.next_page",
        "pageElement": ".image-list,.prof-list",
        "replaceElement": "#pagenation",
        "css": ".pagetual_pageBar{margin-top:-4px!important;margin-bottom:10px!important}.prof-list+.pagetual_pageBar{margin-top:10px!important;margin-bottom:10px!important}"
    },
    {
        "name": "JavTorrent",
        "example": "ijavtorrent.com，projectjav.com",
        "url": "^https?://(ijavtorrent|projectjav)\\.com/",
        "nextLink": "a.btn-secondary+a",
        "pageElement": ".movie-list, .articles-list, .actress-list",
        "replaceElement": "//a[contains(@class, 'gonext')]/parent::div",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "JAV Library",
        "example": "https://www.javlibrary.com/",
        "url": "^https?://www\\.javlibrary\\.com/",
        "nextLink": "a.next",
        "pageElement": ".video, table.pubgroup>tbody>tr:not(#header), table.post",
        "replaceElement": ".page_selector"
    },
    {
        "name": "JavBooks",
        "example": "https://javbooks.com/，https://jmvbt.com/",
        "url": "^https?://(javbooks|jmvbt)\\.com/",
        "nextLink": "span.pageback>a",
        "pageElement": ".Po_topic, .Po_u_topic",
        "replaceElement": ".PageBar",
        "css": ".pagetual_pageBar{margin-top:10px!important;margin-bottom:2px!important}"
    },
    {
        "name": "141 JAV",
        "example": "https://www.141jav.com/new",
        "url": "^https?://www\\.(141jav|141ppv)\\.com/",
        "nextLink": "a.pagination-next",
        "pageElement": "body>.container>.card, body>.container>.columns",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-10px!important;margin-bottom:20px!important;}"
    },
    {
        "name": "AV6K",
        "example": "https://av6k.com/rihanwuma/",
        "url": "^https?://av6k\\.com/(rihanwuma|rihanyouma|jxny|chinese-av-porn|surenzipai|oumeiwuma|chengrendongman|plus)",
        "nextLink": ".thisclass+li>a,td[width='50']>a",
        "pageElement": ".listA:not(.clickadulist)",
        "replaceElement": ".pages_c"
    },
    {
        "name": "AV皇8影城",
        "example": "https://www.royal888.xyz/news",
        "url": "^https?://www\\.royal888\\.xyz/",
        "nextLink": "a[rel='next']",
        "pageElement": ".recommended-grids>.resent-grid",
        "replaceElement": ".pagination"
    },
    {
        "name": "85TUBE",
        "example": "https://85tube.com/latest-updates/",
        "url": "^https?://85tube\\.com/",
        "nextLink": ".next>a",
        "pageElement": "#list_videos_most_recent_videos_items,#list_videos_latest_videos_list_items,#list_videos_common_videos_list_items",
        "replaceElement": ".pagination",
        "pageAction": "let url=document.querySelector(\"script[src*='main.min.js']\").src;if(url)fetch(url).then(res=>res.text()).then((res)=>{eval(res)})",
        "css": ".pagetual_pageBar{margin-top:10px!important}"
    },
    {
        "name": "JavDove 番号鸽",
        "example": "https://www.javdove.com/videos/uncensored",
        "url": "^https?://www\\.javdove\\.com/",
        "nextLink": ".prevnext[rel='next']",
        "pageElement": ".row>.col-video",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "BuzzAV - photo",
        "example": "https://www.buzzav.com/photo/3972/",
        "url": "^https?://www\\.buzzav\\.com/photo/\\d+",
        "init": "document.querySelector('.thumb-overlay>a').removeAttribute('href');",
        "nextLink": "//a[text()='Next']",
        "pageElement": ".img-responsive-mw",
        "replaceElement": ".float-right",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "BuzzAV - album",
        "example": "https://www.buzzav.com/album/260/jk",
        "url": "^https?://www\\.buzzav\\.com/album/\\d+",
        "nextLink": ".page-item.active+li>a",
        "pageElement": ".row>.col-12>.row.content-row",
        "replaceElement": ".pagination,.well-info",
        "pageBar": 0
    },
    {
        "name": "BuzzAV",
        "example": "https://www.buzzav.com/videos",
        "url": "^https?://www\\.buzzav\\.com/(videos|albums)",
        "nextLink": ".page-item.active+li>a",
        "pageElement": ".content-left>.row.content-row",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "JAVMOST",
        "example": "https://www.javmost.cx/category/uncensor/",
        "url": "^https?://\\w+\\.javmost\\.[a-z]{2,3}/",
        "nextLink": ".pagination>li.active+li>a",
        "pageElement": "#content-update",
        "replaceElement": ".pagination,#nav-page",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "爱漫福利社",
        "example": "https://jav889.xyz/",
        "url": "^https?://jav889\\.[^/]+/",
        "nextLink": "//li[span/@class='page-numbers current']/following-sibling::li[1]/a",
        "pageElement": ".posts-wrapper",
        "replaceElement": ".page-numbers",
        "css": ".pagetual_pageBar{margin-top:-16px!important}"
    },
    {
        "name": "MOVIEFFM",
        "example": "https://www.movieffm.net/category/hd-uncensored/",
        "url": "^https?://www\\.movieffm\\.net/",
        "nextLink": "span.current+a",
        "pinUrl": true,
        "pageElement": "#archive-content,.items,.blog-list-items",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-25px!important}"
    },
    {
        "name": "258PORN",
        "example": "http://www.258porn.com/list/%E6%97%A5%E9%9F%93%E7%84%A1%E7%A2%BC/0.html",
        "url": "^https?://www\\.258porn\\.com/",
        "nextLink": ".next-page>a",
        "pageElement": ".excerpts-wrapper",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-30px!important}"
    },
    {
        "name": "CCAVB",
        "example": "https://ccavb.tv/category/%E6%9C%80%E6%96%B0%E4%B8%8A%E5%82%B3",
        "url": "^https?://ccavb\\.tv/",
        "init": "document.querySelectorAll('div.__mantine-ref-control').forEach(div=>{div.setAttribute('onclick','setTimeout(()=>{location.reload()}, 200)')})",
        "nextLinkByJs": "let next=doc.querySelector('[aria-current]+button[tabindex]');if(next)return location.origin+location.pathname.replace(/\\/\\d+$/,'')+'/'+next.textContent;",
        "pageElement": "//div[div/a/div/figure]",
        "insert": "//div[div/div/div/a/div/figure][2]",
        "insertPos": 2,
        "replaceElement": "[role='navigation']",
        "pageAction": "let ge=e=>document.querySelector(e);let url=location.pathname.replace(/\\/\\d+$/,'');setTimeout(()=>{let bs=document.querySelectorAll(`button[tabindex='0']`);bs.forEach(button=>{let link=url+'/'+button.textContent;let lh=`location.href='${link}'`;button.setAttribute('onclick',lh)});let pb=ge(`button[aria-disabled='false']:first-child`);let nb=ge(`button[aria-disabled='false']:last-child`);let cp=ge('[aria-current]').textContent;let pn=cp-1;if(pb){let link=url+'/'+pn;let lh=`location.href='${link}'`;pb.setAttribute('onclick',lh)}if(nb){let nn=ge('[aria-current]+button[tabindex]').textContent;let link=url+'/'+nn;let lh=`location.href='${link}'`;nb.setAttribute('onclick',lh)}},1000)",
        "css": "[style='margin-top:20px'],[style='margin-top: 20px;'],.mantine-SimpleGrid-root[style^='margin-bottom']>div:nth-child(1),[style='width:300px;height:190px;margin:0 auto'],[style='width: 300px; height: 190px; margin: 0px auto;'],#__next>.mantine-Stack-root{display:none!important}.mantine-Container-root .mantine-Image-image{margin: 0 auto !important;width: auto!important;height: 210px!important}",
        "pageBar": 0
    },
    {
        "name": "Jav223",
        "example": "https://www.jav223.com/?m=video_list*5*1",
        "url": "^https?://www\\.jav223\\.com/",
        "action": 1,
        "nextLinkByJs": "let next = doc.querySelector('span.curwrpage+a'); if (next) return location.href.replace(/\\d+$/,'') + next.innerText",
        "pageElement": ".video-content",
        "waitElement": [
            "span.curwrpage"
        ],
        "replaceElement": "#wr-page",
        "pageAction": "let ge=e=>document.querySelector(e);let url=location.search.replace(/\\d+$/,'');setTimeout(()=>{let as=document.querySelectorAll('a.wrpage_number');as.forEach(a=>{a.href=url+a.innerText});let hp=ge('a.wr_pagefirst');if(hp){hp.href=url+'1'}let ep=ge('a.wr_pageend');if(ep){let epn=ge('span.wr_pagefirst').innerText.match(/(\\d+)/)[1];ep.href=url+epn}let pp=ge('a.wr_pagepre');if(pp){let cp=ge('span.curwrpage').innerText;let cpn=cp-1;pp.href=url+cpn}let np=ge('a.wr_pagenext');if(np){let npn=ge('span.curwrpage+a').innerText;np.href=url+npn}},1000)",
        "css": ".pagetual_pageBar{margin-top:-5px!important}"
    },
    {
        "name": "Avgle & AV01",
        "example": "avgle.com，www.av01.tv",
        "url": "^https?://(www\\.)?(avgle|av01)\\.(com|tv)/",
        "nextLink": ".prevnext",
        "pageElement": "//div[(div/div/a/div/@class='thumb-overlay') and @class='row']",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-9px!important}"
    },
    {
        "name": "GGJAV",
        "example": "https://ggjav.com/main/uncensored",
        "url": "^https?://ggjav\\.com/",
        "nextLink": ".pager>a:last-child[href]",
        "pageElement": ".item.columns:not(.native_ads), .columns.model_chunk",
        "replaceElement": ".pager"
    },
    {
        "name": "Porn87",
        "example": "https://porn87.com/",
        "url": "^https?://porn87\\.com/",
        "nextLink": ".pagination-next:not(.mobile_pagination)>a",
        "pageElement": ".column:not(.native_ads)",
        "replaceElement": ".pagination"
    },
    {
        "name": "porn78.info",
        "example": "https://porn78.info/，https://nyaa.porn78.info/",
        "url": "^https?://(nyaa\\.)?porn78.info/",
        "action": 1,
        "nextLink": ".next>a",
        "pageElement": "#portfolio>li",
        "replaceElement": ".general-pagination"
    },
    {
        "name": "JavDisk",
        "example": "https://javdoe.to/，https://javfinder.li/",
        "url": "^https?://(javdoe|javfinder)\\.[a-z]{2,3}/",
        "action": 1,
        "nextLink": "//a[text()='Next']",
        "pageElement": ".videos-list",
        "replaceElement": ".pagination"
    },
    {
        "name": "Javhd.today",
        "example": "https://javhd.today/",
        "url": "^https?://javhd\\.today/",
        "nextLink": ".pagination>li.active+li>a",
        "pageElement": "ul.videos,ul.playlists,div.models,[id^='blog']",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:10px!important}"
    },
    {
        "name": "JavBus / AVMOO",
        "example": "https://www.javbus.com/，https://avmoo.click/tw",
        "url": "^https?://(www\\.)?(javbus|avmoo)\\.(com|click)/",
        "nextLink": "#next, .pagination>.active+li>a",
        "pageElement": "#waterfall>.item",
        "replaceElement": ".pagination",
        "css": "#waterfall>.item {position: static !important; float: left !important; height: 400px !important;}",
        "pageBar": 0
    },
    {
        "name": "JavDB",
        "example": "https://javdb.com/",
        "url": "^https?://javdb\\.com/",
        "nextLink": "a.pagination-next",
        "pageElement": ".movie-list, #videos, #makers, #series, #actors>div",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:5px!important}"
    },
    {
        "name": "H 次元",
        "example": "https://h-ciyuan.com/",
        "url": "^https?://h-ciyuan\\.com/",
        "nextLink": ".next",
        "pageElement": ".gridview-posts",
        "replaceElement": ".nav-links"
    },
    {
        "name": "Avbebe",
        "example": "https://avbebe.com/",
        "url": "^https?://avbebe\\.com/",
        "nextLink": ".next",
        "pageElement": ".jeg_block_container",
        "replaceElement": ".jeg_block_navigation",
        "css": ".pagetual_pageBar{margin-top:-16px!important}"
    },
    {
        "name": "Hentai Anime Zone / HentaiDLs / Hentai-Hot",
        "example": "https://hentaianimezone.com/，https://hentaidls.com/，https://hentai-hot.com/",
        "url": "^https?://(hentaianimezone|hentaidls|hentai-hot)\\.com/",
        "nextLink": ".navigation>span+a,.nav-links>span.current+a,.pagi-nav span.pnext>a",
        "pageElement": "#dle-content>article,.writemag-compact-post-wrapper,.skladchik-item",
        "replaceElement": ".navigation,.nav-links,.pagi-nav",
        "pageBar": 0
    },
    {
        "name": "Latino Hentai",
        "example": "https://latinohentai.com/",
        "url": "^https?://latinohentai\\.com/",
        "nextLink": ".current+a",
        "pageElement": ".items",
        "replaceElement": ".pagination"
    },
    {
        "name": "ACG RW",
        "example": "https://www.acgrw.net/category/lifan/",
        "url": "^https?://www\\.acgrw\\.net/",
        "nextLink": "a.next",
        "pageElement": ".uk-animation-slide-bottom-small",
        "replaceElement": ".nav-links",
        "pageInit": "doc.querySelectorAll('.media-content.scrollLoading:not(.ojbk)').forEach(div=>{div.style.backgroundImage=`url('${div.dataset.xurl}')`;div.classList.add('ojbk');div.removeAttribute('data-xurl')})"
    },
    {
        "name": "DaftSex - other",
        "example": "https://daftsex.com/browse",
        "url": "^https?://daftsex\\.com/",
        "nextLink": "li.active+li>a",
        "pageElement": ".video-item",
        "replaceElement": ".pagination",
        "pageInit": "doc.querySelectorAll('.video-thumb').forEach(div=>{div.style.backgroundImage=`url('${div.dataset.thumb}')`})",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "DaftSex - 首頁",
        "example": "https://daftsex.com/",
        "url": "^https?://daftsex\\.com/$",
        "loadMore": ".more"
    },
    {
        "name": "YouJizz",
        "example": "https://www.youjizz.com/",
        "url": "^https?://www\\.youjizz\\.com/",
        "action": 1,
        "nextLink": ".pagination-next",
        "pageElement": "//div[div[@class='video-thumb']]",
        "replaceElement": ".pagination, .mobilePager",
        "pageInit": "doc.querySelectorAll('video[preload]').forEach(e=>{e.src=e.parentNode.getAttribute('data-clip')})",
        "pageAction": "function gax(x){let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes}let ps=gax(\"//div[div[@class='video-thumb']]\");let last=ps.length-1;ps[last].querySelectorAll('a.frame.video').forEach(a=>{a.onmouseenter=e=>{let v=a.querySelector('video');v.style='';v.setAttribute('loop','')};a.onmouseleave=e=>{let v=a.querySelector('video');v.style.display='none';v.removeAttribute('loop')}})"
    },
    {
        "name": "EPORNER Photo",
        "example": "https://www.eporner.com/photo/02USX1vSH4e/8/",
        "url": "^https?://[a-z]{2,3}\\.eporner\\.com/photo/",
        "init": "let img = document.querySelector('.photohref>img[alt]');img.src = img.parentNode.href;",
        "nextLink": "#photobitrighta",
        "pageElement": "#gridphoto>.photohref,#gridphoto>.mainphoto",
        "pageInit": "let img = doc.querySelector('.photohref>img[alt]');img.src = img.parentNode.href;",
        "pageAction": "document.querySelectorAll('.photohref').forEach(e=>{e.outerHTML=e.innerHTML})",
        "replaceElement": "#photobitlefta,#photobitrighta",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#photobitlefta,#photobitrighta{display:none!important}#gridphoto *{overflow: initial !important;position: initial !important;}img[alt]{max-width: 98% !important;display: block !important;margin: 0 auto !important;}"
    },
    {
        "name": "EPORNER",
        "example": "https://www.eporner.com/",
        "url": "^https?://[a-z]{2,3}\\.eporner\\.com/",
        "nextLink": ".nmnext",
        "pageElement": "#vidresults>[id],.photosgrid,main>.mbprofile",
        "replaceElement": ".numlist2",
        "pageAction": "EPtbnsStandardRebind()",
        "css": ".pagetual_pageBar{margin-top:-15px!important}.photosgrid+.pagetual_pageBar{margin-top:10px!important}.mbprofile+.pagetual_pageBar{margin-top:0px!important}.mbphoto2+.pagetual_pageBar{display:none!important}"
    },
    {
        "name": "xHamster gallery2",
        "example": "https://zh.xhamster.com/photos/gallery/15979608/513740284",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/photos/gallery/",
        "exclude": ".gallery-list",
        "nextLink": ".fotorama__arr--next",
        "stopSign": [
            [
                ".photo-amounts-info",
                "^(\\d+)"
            ],
            [
                ".photo-amounts-info",
                "(\\d+)$"
            ]
        ],
        "pageElement": ".fotorama__active>img",
        "replaceElement": ".gallery-thumbs,.photo-amounts-info",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#photo_slider *{overflow: initial !important;position: initial !important;}.fotorama__stage{height:auto!important;}.fotorama__loaded--img:not(.fotorama__active){display:none!important}.fotorama__img {max-width: 98% !important;display: block !important;margin: 0 auto !important;}"
    },
    {
        "name": "xHamster gallery1 在清單頁面載入大圖",
        "example": "https://zh.xhamster.com/photos/gallery/selfie-porn-pic-134-15984561，https://zh.xhamster.com/photos/gallery/selfie-porn-pic-122-15979608",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/photos/gallery/",
        "include": ".gallery-list",
        "pinUrl": true,
        "init": "let F=new DocumentFragment();window.initials.photosGalleryModel.photos.forEach(e=>{let a=document.createElement('a');a.href=e.pageURL;let img=new Image();img.src=e.imageURL;a.appendChild(img);F.appendChild(a)});let E=document.querySelector('.gallery-list');E.innerHTML='';E.appendChild(F);",
        "action": 1,
        "waitElement": [
            "",
            ".image-thumb:not([style])"
        ],
        "nextLink": ".next>a[href^='http']",
        "pageElement": ".gallery-list",
        "replaceElement": ".pager-section>[data-sync]",
        "pageInit": "let code=Array.from(doc.scripts).find(s=>s.innerHTML.search(/initials/)>-1).innerHTML;let imgData=eval(code).photosGalleryModel.photos;let F=new DocumentFragment();imgData.forEach(e=>{let a=document.createElement('a');a.href=e.pageURL;let img=new Image();img.src=e.imageURL;a.appendChild(img);F.appendChild(a)});let E=doc.querySelector('.gallery-list');E.innerHTML='';E.appendChild(F);",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".gallery-list img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}"
    },
    {
        "name": "xHamster photos",
        "example": "https://zh.xhamster.com/photos",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/photos",
        "nextLink": "li.next>a",
        "pageElement": ".thumb-list.gallery.thumb-list--sidebar",
        "replaceElement": ".pager-section",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "xHamster channels",
        "example": "https://zh.xhamster.com/channels",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/channels",
        "nextLink": "li.next>a",
        "pageElement": ".best-list-block>.width-wrap>.channels-thumbs",
        "replaceElement": ".pager-section",
        "rate": 3,
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "xHamster creators",
        "example": "https://zh.xhamster.com/creators",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/creators",
        "nextLink": "li.next>a",
        "pageElement": ".best-list-block>.width-wrap>.thumb-container",
        "replaceElement": ".pager-section",
        "rate": 3,
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "xHamster pornstars",
        "example": "https://zh.xhamster.com/pornstars",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/pornstars",
        "nextLink": "li.next>a",
        "pageElement": ".thumb-container",
        "replaceElement": ".pager-section",
        "rate": 3,
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "xHamster",
        "example": "https://zh.xhamster.com/newest",
        "url": "^https?://([a-z]{2}\\.)?xhamster\\.com/",
        "exclude": ".fotorama__img",
        "nextLink": "a[rel='next']",
        "pageElement": ".thumb-list",
        "replaceElement": ".pager-section",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let ps=gae('.thumb-list');let last=ps.length-1;ps[last].querySelectorAll('a[data-previewvideo]').forEach(a=>{a.onmouseenter=e=>{let v=document.createElement('video');v.setAttribute('loop','loop');v.setAttribute('autoplay','autoplay');v.setAttribute('playsinline','playsinline');v.setAttribute('webkitplaysinline','webkitplaysinline');v.setAttribute('src',a.getAttribute('data-previewvideo'));v.setAttribute('class','thumb-image-container__video');v.setAttribute('eid1','156');a.appendChild(v)};a.onmouseleave=e=>{a.querySelector('video').remove()}})"
    },
    {
        "name": "色色啦",
        "example": "https://www.seselah.com/",
        "url": "^https?://www\\.seselah\\.com/",
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.classList.add('loaded');e.previousElementSibling.setAttribute('srcset',e.previousElementSibling.getAttribute('data-srcset'))})",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[a/div/picture]",
        "replaceElement": ".pagination",
        "pageInit": "doc.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.classList.add('loaded');e.previousElementSibling.setAttribute('srcset',e.previousElementSibling.getAttribute('data-srcset'))})",
        "pageBar": 0
    },
    {
        "name": "91Porn",
        "example": "http://91porn.com/index.php",
        "url": "^https?://(0118\\.)?(91porn|workarea7)\\.(com|live)/",
        "nextLink": "//a[text()='»']",
        "pageElement": ".row .row>div",
        "replaceElement": "#paging",
        "pageBar": 0
    },
    {
        "name": "Thumbzilla",
        "example": "https://www.thumbzilla.com/newest",
        "url": "^https?://www\\.thumbzilla\\.com/",
        "nextLink": ".page_next>a",
        "pageElement": ".responsiveListing>li:not([id]",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "Tube8",
        "example": "https://www.tube8.com/newest.html",
        "url": "^https?://[a-z]{2,3}\\.tube8\\.com/",
        "nextLink": "#pagination_next",
        "pageElement": "#category_video_list .video_box, #result_container>.video_box, .sectionWrapper .video_box",
        "replaceElement": "#pagination",
        "lazyImgSrc": "data-thumb",
        "pageBar": 0,
        "css": "#home_page_wrapper>.sectionWrapper:nth-last-child(-n+3) {display: none;}"
    },
    {
        "name": "RedTube",
        "example": "https://www.redtube.com/hot?cc=us",
        "url": "^https?://www\\.redtube\\.com/",
        "exclude": "#trending_country_section",
        "nextLink": "#wp_navNext",
        "pageElement": ".videoblock_list:not([id*='_vid_']):not([id*='_premium_']), .content_limit>ul>li.channel-box",
        "replaceElement": "#w_pagination",
        "pageAction": "let url=document.querySelector(\"script[src*='default-redtube.js']\").src;if(url)fetch(url).then(res=>res.text()).then((res)=>{eval(res)})",
        "css": ".pagetual_pageBar{margin-top:0px!important;margin-bottom:0px!important}"
    },
    {
        "name": "YouPorn",
        "example": "https://www.youporn.com/recommended/",
        "url": "^https?://www\\.youporn\\.com/",
        "pinUrl": true,
        "nextLink": "li.current+li>a",
        "pageElement": ".full-row-thumbs>[data-espnode='videobox'],.channelLists .full-row-channel,.all-erotica-section>.erotica-box,.fifteen-column .porn-star-list",
        "replaceElement": "#pagination",
        "pageBar": 0
    },
    {
        "name": "Porned Up",
        "example": "https://pornedup.com/",
        "url": "^https?://pornedup.com/pics/\\d+/[^/]+/",
        "nextLink": "a.control.next",
        "pageElement": "div.main"
    },
    {
        "name": "PicHunter",
        "example": "https://www.pichunter.com/",
        "url": "^https?://www\\.pichunter\\.com/",
        "enable": 0
    },
    {
        "name": "PornHub photo",
        "example": "https://cn.pornhub.com/photo/825175581",
        "url": "^https?://[a-z]{2,3}\\.pornhub\\.com/photo/\\d+",
        "init": "let a=document.querySelector('.centerImage img[alt]').parentNode;a.outerHTML=a.innerHTML;",
        "nextLink": ".arrowRight",
        "stopSign": [
            [
                ".itemCount",
                "(\\d+)$"
            ],
            [
                ".itemCount",
                "^(\\d+)"
            ]
        ],
        "pageElement": ".centerImage img[alt]",
        "replaceElement": ".arrowLeft,.arrowRight,.thumbSliderButtons,.thumbSliderContent,.itemCount",
        "pageBar": 0,
        "css": ".arrowLeft,.arrowRight{display:none!important}#photoImageSection img{margin:0!important}"
    },
    {
        "name": "PornHub album",
        "example": "https://cn.pornhub.com/albums，https://cn.pornhub.com/album/10042641",
        "url": "^https?://[a-z]{2,3}\\.pornhub\\.com/album",
        "pinUrl": true,
        "nextLink": ".page_next:not(.disabled)>a",
        "pageElement": ".photoAlbumListContainer,#albumListResults>*,.photosAlbumsListing,.albumList>*",
        "replaceElement": ".paginationGated",
        "pageInit": "doc.querySelectorAll('.js_lazy_bkg').forEach(div=>{div.style.backgroundImage=`url('${div.dataset.bkg}')`})",
        "lazyImgSrc": "data-thumb_url",
        "pageBar": 0
    },
    {
        "name": "Pornhub",
        "example": "https://cn.pornhub.com/",
        "url": "^https?://[a-z]{2,3}\\.pornhub\\.com/",
        "exclude": [
            ".photoAlbumListContainer",
            "#albumListResults",
            ".photosAlbumsListing",
            ".albumList",
            ".centerImage img[alt]"
        ],
        "pinUrl": true,
        "action": 1,
        "nextLink": ".page_next:not(.disabled)>a",
        "pageElement": "#singleFeedSection>.pcVideoListItem,#videoCategory>.pcVideoListItem,#videoSearchResult>.pcVideoListItem,.videoList,.homeSection",
        "replaceElement": ".paginationGated"
    },
    {
        "name": "XVIDEOS",
        "example": "https://www.xvideos.com/",
        "url": "^https?://www\\.(xvideos|xnxx)\\.com/",
        "nextLink": "//li[a/@class='active']/following-sibling::li[1]/a",
        "pinUrl": true,
        "pageElement": ".mozaique.cust-nb-cols",
        "replaceElement": ".pagination",
        "pageAction": "xv.thumb_block_initiator.init_listing()"
    },
    {
        "name": "麻豆村",
        "example": "https://madoucun.com/",
        "url": "^https?://madoucun\\.com/",
        "pageElement": ".hl-list-item",
        "replaceElement": ".hl-page-wrap",
        "pageInit": "doc.querySelectorAll('a[data-original]').forEach(a=>{a.style.backgroundImage=`url('${a.dataset.original}')`})"
    },
    {
        "name": "麻豆社,草麻豆",
        "example": "https://madou.club/，https://xxxmadou.com/",
        "url": "^https?://(madou|xxxmadou|)\\.(club|com)/",
        "loadMore": ".ias_trigger>a"
    },
    {
        "name": "牛C網 - 列表",
        "example": "https://niuc.icu/sex",
        "url": "^https?://niuc[^/]+/(blog|sex|pornhub|apps)",
        "init": "document.querySelectorAll('a[data-src]').forEach(a=>{a.style.backgroundImage=`url('${a.dataset.src}')`})",
        "nextLink": "span.current+a",
        "pageElement": ".cat_list",
        "replaceElement": ".posts-nav",
        "pageInit": "doc.querySelectorAll('a[data-src]').forEach(a=>{a.style.backgroundImage=`url('${a.dataset.src}')`})",
        "css": ".pagetual_pageBar{margin-top:-4px!important}#search+div.row.mb-4,#content>.slide-blog.mb-4{display:none!important}"
    },
    {
        "name": "牛C網 - 看圖",
        "example": "https://niuc.icu/78111.html",
        "url": "^https?://niuc[^/]+/\\d+\\.html",
        "init": "document.querySelectorAll('a.js').forEach(e=>{e.outerHTML=e.innerHTML})",
        "nextLink": "span+a",
        "pageElement": "div.panel-body.single.mt-2 > p",
        "replaceElement": ".page-nav",
        "css": ".alignnone,p{margin:0!important}.post-apd{display: none!important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "牛C網 - 正文",
        "example": "https://niuc.icu/67307.html",
        "url": "^https?://niuc[^/]+/\\d+\\.html",
        "exclude": ".page-nav",
        "nextLink": ".nav.previous>a",
        "pageElement": ".panel.card,.single-top-area.text-sm.card.mt-4",
        "replaceElement": ".near-navigation.rounded.mt-4.py-2",
        "pageAction": "let ps=document.querySelectorAll('.panel.card');let last=ps.length-1;ps[last].querySelectorAll('script').forEach(e=>{eval(e.innerHTML)})",
        "css": "#content>main>div.content-wrap>div>h4,h4+div,#comments.comments,.post-apd{display: none!important;}.pagetual_pageBar{margin-top:0px!important;margin-bottom:1rem!important}"
    },
    {
        "name": "HPJAV",
        "example": "https://hpav.tv/ja/category/uncensored",
        "url": "^https?://(hpav|hpjav)\\.tv/",
        "init": "document.querySelectorAll('img[data-original]').forEach(img=>{img.src=img.getAttribute('data-original')})",
        "nextLink": "li.active+li>a",
        "pageElement": ".post-list>*,.models-list>.col-md-2",
        "replaceElement": "nav>.pagination",
        "pageBar": 0
    },
    {
        "name": "CableAV",
        "example": "https://cableav.tv/playlist/lk4cv1f3j1v/",
        "url": "^https?://cableav\\.tv/",
        "nextLink": "span.current+a",
        "pageElement": ".blog-items>article",
        "replaceElement": ".wp-pagenavi",
        "pageBar": 0
    },
    {
        "name": "肉漫屋 - 閱讀",
        "example": "https://rouman5.com/books/354b56da-1ab9-4909-9330-743842c5a5bf/0",
        "url": "^https?://rouman[0-9]{1,2}\\.[a-z]{3}/books/[^/]+/",
        "history": 2,
        "action": 2,
        "init": "document.querySelector(\"div[class^='id_chapterRoot']\").setAttribute('style','padding-right:0px!important;padding-left:0px!important;');",
        "nextLink": "//a[text()='下一頁']",
        "pageElement": "//div[div/img[@id]]",
        "replaceElement": "div[class^='id_pagination']",
        "pageAction": "function gax(x){let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes}let p=gax(\"//*[@class='pagetual_pageBar']\");if(p.length>1){if(gax('//div[div/img[@id]]').length>0){gax(\"//div[div/img[@id]]/preceding-sibling::*[not(contains(@class,'id_pagination'))]\").forEach(e=>{e.remove()});gax('//div[div/img[@id]]')[0].remove()}gax('//iframe')[0].remove();p[0].remove()}",
        "pageBarText": 1,
        "css": "inIframe:nav.navbar,#__next>div[class^='footer'],.row,div[class^='id_pagination']{display:none!important}.container{padding-right:0px!important;padding-left:0px!important;max-width: 800px!important;}"
    },
    {
        "name": "肉漫屋",
        "example": "https://rouman5.com/books，https://rouman01.xyz/books",
        "url": "^https?://rouman\\d{1,2}\\.[a-z]{3}/",
        "include": "div[class^='pagination']",
        "nextLink": "//a[text()='下一頁']",
        "pageElement": "ul[class^='books_list']>li",
        "replaceElement": "div[class^='pagination']",
        "pageBar": 0
    },
    {
        "name": "肉視頻",
        "example": "https://rouv01.xyz/t/%E6%8E%A2%E8%8A%B1",
        "url": "^https?://(rouv\\d+|rou)\\.(xyz|video)/(t|v|search)",
        "pinUrl": true,
        "nextLink": "//a[text()='下一頁']",
        "pageElement": ".grid-cols-2>.shadow",
        "replaceElement": ".bg-white.px-4.py-3",
        "pageBar": 0,
        "css": ".col-span-2.md\\:col-span-1{display:none!important}"
    },
    {
        "name": "jav9999",
        "example": "https://jav9999.com/uded/1",
        "url": "^https?://jav9999\\.com/(1|uded|amateur|chinese|actress|wuman|search)?",
        "nextLink": "//a[text()='下一頁']",
        "pageElement": ".yps>.yp",
        "replaceElement": ".row+.ad-list+.row.text-center.fanye>ul.text-center",
        "pageBar": 0
    },
    {
        "name": "onejav.com",
        "example": "https://onejav.com/new",
        "url": "^https?://onejav\\.com/(new|popular|tag|actress|search)",
        "nextLink": "//a[text()='Next']",
        "pageElement": "div.card.mb-3,.columns.is-multiline",
        "replaceElement": "nav.pagination",
        "css": ".pagetual_pageBar {margin-top: -10px !important;margin-bottom: 21px !important;}"
    },
    {
        "name": "onejav.com - 首頁",
        "example": "https://onejav.com/",
        "url": "^https?://onejav\\.com/$",
        "loadMore": "#button-load-more"
    },
    {
        "name": "微圖坊 - 看圖",
        "example": "https://www.v2ph.com/album/SSA-392",
        "url": "^https?://(www\\.)?v2ph\\.(com|net|ovh)/album/",
        "nextLink": ".active.page-item+li>a",
        "pageElement": "div.album-photo",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "css": ".album-photo,.photos-list img{opacity:1 !important;position:unset !important;padding:0 !important}"
    },
    {
        "name": "微圖坊 - 分類",
        "example": "https://www.v2ph.com/country/taiwan",
        "url": "^https?://(www\\.)?v2ph\\.(com|net|ovh)/",
        "nextLink": ".active.page-item+li>a",
        "pageElement": "//div[(div/div/div/a/@class='media-cover') and contains(@class,'albums-list')]",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar {margin-top: 5px!important;}.pagetual_pageBar+div {margin-top: -8px!important;}img{opacity:1!important}"
    },
    {
        "name": "美图乐 - 分類",
        "example": "https://www.meitule.cc/i/",
        "url": "^https?://www\\.meitule\\.cc/",
        "pageElement": ".list-item",
        "replaceElement": ".page",
        "css": ".list-img img{opacity:1!important}"
    },
    {
        "name": "極品性感美女 - 搜索",
        "example": "https://www.xgmn01.com/plus/search/index.asp?keyword=XiuRen",
        "url": "^https?://[^/]+/plus/search/index\\.asp\\?keyword=",
        "include": "body>.container>.container+font>font>font>.list>.list>.node+.pagination",
        "nextLink": ".current+a",
        "pageElement": ".node",
        "replaceElement": ".node+.pagination",
        "css": ".pagetual_pageBar {margin-top: -5px !important;margin-bottom: 15px !important;}"
    },
    {
        "name": "極品性感美女 - 看圖",
        "example": "https://www.xgmn01.com/Xiuren/Xiuren23112.html",
        "url": "^https?://[^/]+/\\w+/\\w+\\.html",
        "include": [
            "body>section.container>div.content-wrap>div.content>article.article-content img[alt]",
            ".article-content>.pagination",
            "//div[@class='content']//a[text()='极品性感美女']"
        ],
        "action": 1,
        "nextLink": ".current+a",
        "pageElement": ".article-content img[alt]:not([width])",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "pageAction": "document.querySelectorAll('article img[alt]').forEach(img=>{img.removeAttribute('title')})",
        "initRun": 1,
        "autoLoadNum": "0",
        "css": ".article-content img[width],.article-content br{display:none!important}"
    },
    {
        "name": "極品性感美女 - 分類",
        "example": "https://www.xgmn01.com/Xiuren/",
        "url": "^https?://[^/]+/\\w+/",
        "include": [
            "body>.container>.content-wrap>.content>.speedbar+.widget-title",
            ".widget-title+.pagination",
            "//div[@class='content']//a[text()='极品性感美女']"
        ],
        "nextLink": ".current+a",
        "pageElement": ".widget-title",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-15px !important}"
    },
    {
        "name": "Nyaa",
        "example": "https://sukebei.nyaa.si/",
        "url": "^https?://(sukebei\\.)?nyaa\\.si/",
        "nextLink": "a[rel='next'], li.next>a",
        "pageElement": "table.torrent-list>tbody>tr",
        "replaceElement": "ul.pagination"
    },
    {
        "name": "U9A9",
        "example": "https://u9a9.net/",
        "url": "^https?://u9a9\\.[a-z]{2,3}",
        "nextLink": "li.active+li>a",
        "pageElement": "table>tbody>tr",
        "replaceElement": "nav>.pagination"
    },
    {
        "name": "Jerk-Off Instruction",
        "example": "https://joi-me.com/lastnews/",
        "url": "^https?://joi-me\\.com",
        "action": "1",
        "waitElement": [
            "article[style]"
        ],
        "nextLink": ".page_next>a",
        "pageElement": "#container",
        "replaceElement": ".navigation",
        "pageBar": 0
    },
    {
        "name": "Mixfemdomcc",
        "example": "https://mixfemdomcc.com/lastnews/",
        "url": "^https?://mixfemdomcc.com/",
        "nextLink": ".nnext>a",
        "pageElement": ".gray-block",
        "replaceElement": ".basenavi",
        "pageAction": "eval(document.querySelector('.gray-block>script').innerHTML)",
        "pageBar": 0
    },
    {
        "name": "Femdom",
        "example": "https://femdomup.net/lastnews/",
        "url": "^https?://femdomup\\.net/",
        "nextLink": "//a[text()='Next']",
        "pageElement": "article.shortstory",
        "replaceElement": ".navigation",
        "pageAction": "let url=document.querySelector(\"script[src*='cat.js']\").src;if(url)fetch(url).then(res=>res.text()).then((res)=>{eval(res)})",
        "pageBar": 0
    },
    {
        "name": "xstarshub",
        "example": "https://xstarshub.com/",
        "url": "^https?://xstarshub.com/",
        "nextLink": "a.next",
        "pageElement": ".posts-list>article",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "New Videos",
        "example": "https://watchporn.to/latest-updates/",
        "url": "^https?://watchporn\\.to/",
        "nextLink": "//a[text()='Next']",
        "pageElement": ".list-videos",
        "replaceElement": ".pagination",
        "pageAction": "let url=document.querySelector(\"script[src*='main.min.js']\").src;if(url)fetch(url).then(res=>res.text()).then((res)=>{eval(res)})"
    },
    {
        "name": "SpankBang",
        "example": "https://jp.spankbang.com/trending_videos/",
        "url": "^https?://([a-z]{2}\\.)?spankbang\\.com/",
        "pinUrl": true,
        "nextLink": ".next:not(.disabled)>a,a.next",
        "pageElement": ".video-list .video-item[id],#pornstars ul.results li",
        "replaceElement": ".pagination",
        "pageAction": "image_rotate('.video-rotate .thumb')",
        "pageBar": 0
    },
    {
        "name": "MISSAV",
        "example": "https://missav.com/fc2",
        "url": "^https?://missav.com/",
        "nextLink": "a[rel='next']",
        "pageElement": "//div[div/div/a/video] | //div[div/a/img[@data-src] and contains(@class,'shadow-lg')]",
        "replaceElement": "nav.flex",
        "pageBar": 0
    },
    {
        "name": "愛污傳媒",
        "example": "https://aiwucm.com/",
        "url": "aiw",
        "include": [
            "//title[contains(text(),'爱污传媒')]",
            ".pagination.justify-content-center"
        ],
        "nextLink": "a[title='Go to next page!']",
        "pageElement": ".grid.mx-auto.videos>.cell.video",
        "replaceElement": ".pagination.justify-content-center",
        "pageBar": 0
    },
    {
        "name": "3xchina.net",
        "example": "https://3xchina.net/category/chinese-av/",
        "url": "^https?://3xchina\\.net/",
        "nextLink": "//a[text()='Next']",
        "pageElement": ".videos-list>article",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "fanxxx.net",
        "example": "https://fanxxx.net/",
        "url": "^https?://fanxxx\\.net/",
        "nextLink": "a[rel='next']",
        "pageElement": ".video-list",
        "replaceElement": ".pagenavi",
        "pageBar": 0
    },
    {
        "name": "JAVDAY",
        "example": "https://javday.tv/category/uncensored-leaked/",
        "url": "^https?://javday\\.tv/(category|search)/",
        "nextLink": ".layui-laypage-next",
        "pageElement": ".videoGroup .video-wrapper .col-style.loaded",
        "replaceElement": "div.av",
        "pageBar": 0
    },
    {
        "name": "AV RBO",
        "example": "https://avbro.top/index.php/vod/type/id/12.html",
        "url": "^https?://avbro\\.top/index\\.php/vod/",
        "nextLink": ".page>li.active+li>a",
        "pageElement": ".vodlist.clearfix",
        "replaceElement": ".page",
        "pageAction": "document.querySelectorAll('a[data-original]').forEach(a=>{a.style.backgroundImage=`url('${a.dataset.original}')`})",
        "pageBar": 0
    },
    {
        "name": "AVPRO - 搜索",
        "example": "https://avpro.cc/search?keyword=%E7%BE%8E%E5%A5%B3&page_id=1",
        "url": "^https?://avpro\\.cc/search",
        "nextLinkByUrl": [
            "(keyword=[^&]+)(&page_id=(\\d+))?$",
            "$1&page_id={($3.0||1)+1}",
            "li.active+li>a:not([title='Last Page']"
        ],
        "pageElement": ".videos-latest-list>*",
        "replaceElement": ".pagination,.showing_pages",
        "pageAction": "let ge=e=>document.querySelector(e);setTimeout(()=>{let as=document.querySelectorAll('a.waves-effect:not([title])');let ls=location.search.replace(/&page_id=\\d+/,'');as.forEach(a=>{let p=a.innerText;let ap=ls+'&page_id='+p;a.href=ap;a.removeAttribute('onclick')});let fp=ge(`a[title='First Page']`);fp.href=ls;fp.removeAttribute('onclick');let cp=ge('li.active>a').innerText;let app=ge(`a[title='Previous Page']`);if(app!=null){let pp=cp-1;app.href=ls+'&page_id='+pp;app.removeAttribute('onclick')}let np=ge('li.active+li>a').innerText;let anp=ge(`a[title='Next Page']`);if(anp!=null){anp.href=ls+'&page_id='+np;anp.removeAttribute('onclick')}let lp=ge('.showing_pages').innerText;let match=lp.match(/of (\\d+)/);let alp=ge(`a[title='Last Page']`);alp.href=ls+'&page_id='+match[1];alp.removeAttribute('onclick')},1000)",
        "pageBar": 0
    },
    {
        "name": "AVPRO",
        "example": "https://avpro.cc/videos/category/847?page_id=1",
        "url": "^https?://avpro\\.cc/",
        "nextLink": "a[title='Next Page']",
        "pageElement": ".videos-latest-list>*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "AV時間",
        "example": "https://avtime.tv/category/28/",
        "url": "^https?://avtime\\.tv/",
        "nextLink": "//li[(span) and @class='page-item']/following-sibling::li[1]/a",
        "pageElement": "//div[div/div/@class='img-box cover-md']",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "癡漢隊長",
        "example": "https://javcaptain.com/uncensored",
        "url": "^https?://javcaptain\\.com/(en/|ja/|zh/|ko/)?(rank/|series/)?(censored|uncensored|western|fc2|hanime|search)",
        "nextLink": "a.page-link[rel='next']",
        "pageElement": ".card-deck.row>.px-1",
        "replaceElement": ".pagination.pagination-sm",
        "pageBar": 0
    },
    {
        "name": "Supjav 自動點擊SERVER TV播放按鈕",
        "url": "^https?://supjav\\.com/(zh/|ja/)?\\d+\\.html",
        "init": "let loop=setInterval(()=>{let play=document.querySelector('#vserver.play-button');if(play){play.click();clearInterval(loop)}},100);let t=document.querySelector('title');t.innerText=t.innerText.replace(/-\\sSupjav.com.+/,'').trim()",
        "pinUrl": true
    },
    {
        "name": "Supjav",
        "example": "https://supjav.com/ja/category/uncensored-jav",
        "url": "^https?://supjav\\.com/(zh/|ja/)?(\\?s=|popular|category)",
        "nextLink": "li.active+li>a",
        "pageElement": ".posts.clearfix>*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "加勒逼A片網",
        "example": "https://159i.com/video/",
        "url": "^https?://159i\\.com/video/((category|search)/.+/)?$",
        "nextLink": ".next>a",
        "pageElement": "#content>.post.f",
        "replaceElement": ".page-navigator",
        "pageBar": 0
    },
    {
        "name": "NETFLAV3",
        "example": "https://netflav.com/all?genre=%E6%80%A7%E6%84%9F%E7%9A%84&page=2",
        "url": "^https?://(www\\.)?netflav\\.com/all\\?(genre|actress)=.+(&page=\\d+)?$",
        "init": "let gae=e=>document.querySelectorAll(e);let ds=document.querySelectorAll(\"div[class^='genre_filter_item']\");ds.forEach(div=>{div.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});let as=document.querySelectorAll('.desktop_header_root>div>a.desktop_header_item:not([href=\"/\"])');as.forEach(a=>{a.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});",
        "action": 1,
        "nextLinkByJs": "let next=doc.querySelector('a.active.item+a.item:not(.icon)');if(next)return location.origin+location.pathname+location.search.replace(/&page=\\d+/,'')+'&page='+next.getAttribute('value')",
        "pageElement": ".video_grid_container>.grid_root>*",
        "waitElement": [
            "a[aria-current='true']+a",
            "div.lazyload-placeholder,.grid_cover.image:not(.fadeIn)"
        ],
        "replaceElement": ".general_pagination",
        "rate": 3,
        "pageAction": "setTimeout(()=>{let as=document.querySelectorAll('#general-pagination a');as.forEach(a=>{let link=location.search.replace(/&page=\\d+/,'')+'&page='+a.getAttribute('value');a.href=link})},200)",
        "pageBar": 0
    },
    {
        "name": "NETFLAV2",
        "example": "https://netflav.com/uncensored?genre=FC2PPV",
        "url": "^https?://(www\\.)?netflav\\.com/(censored|uncensored|chinese-sub|actress)\\?genre=[^&]+(&page=\\d+)?$",
        "init": "let gae=e=>document.querySelectorAll(e);let ds=gae(\"div[class^='genre_filter_item']\");ds.forEach(div=>{div.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});let as=gae('.desktop_header_root>div>a.desktop_header_item:not([href=\"/\"])');as.forEach(a=>{a.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});",
        "action": 1,
        "nextLinkByJs": "let next=doc.querySelector('a.active.item+a.item:not(.icon)');if(next)return location.origin+location.pathname+location.search.replace(/&page=\\d+/,'')+'&page='+next.getAttribute('value')",
        "pageElement": ".video_grid_container>.grid_root>*",
        "waitElement": [
            "a[aria-current='true']+a",
            "div.lazyload-placeholder,.grid_cover.image:not(.fadeIn)"
        ],
        "replaceElement": ".general_pagination",
        "rate": 3,
        "pageAction": "setTimeout(()=>{let as=document.querySelectorAll('#general-pagination a');as.forEach(a=>{let link=location.search.replace(/&page=\\d+/,'')+'&page='+a.getAttribute('value');a.href=link})},200)",
        "pageBar": 0
    },
    {
        "name": "NETFLAV1",
        "example": "https://netflav.com/uncensored",
        "url": "^https?://(www\\.)?netflav\\.com/(censored|uncensored|chinese-sub|actress)(\\?page=\\d+)?$",
        "init": "let gae=e=>document.querySelectorAll(e);let ds=gae(\"div[class^='genre_filter_item']\");ds.forEach(div=>{div.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});let as=gae('.desktop_header_root>div>a.desktop_header_item:not([href=\"/\"])');as.forEach(a=>{a.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});",
        "action": 1,
        "nextLinkByJs": "let next=doc.querySelector('a.active.item+a.item:not(.icon)');if(next)return location.origin+location.pathname+'?page='+next.getAttribute('value')",
        "pageElement": "//div[@class='video_grid_container']/div[contains(@class,'grid_root')]/* | //div[a[@href]/div/img[@class='ui image']]",
        "waitElement": [
            "a[aria-current='true']+a",
            "div.lazyload-placeholder,.grid_cover.image:not(.fadeIn)"
        ],
        "replaceElement": ".general_pagination",
        "rate": 3,
        "pageAction": "setTimeout(()=>{let as=document.querySelectorAll('#general-pagination a');as.forEach(a=>{let link=location.pathname+'?page='+a.getAttribute('value');a.href=link})},200)",
        "pageBar": 0
    },
    {
        "name": "avple.tv - 類別",
        "example": "https://avple.tv/tags/135/1/date",
        "url": "^https?://avple\\.tv/tags/\\d+/\\d+/\\w+$",
        "action": 1,
        "nextLinkByUrl": [
            "(/\\d+/)(\\d+)(/\\w+)$",
            "$1{$2+1}$3",
            "[aria-label='Go to next page']:not(.Mui-disabled)"
        ],
        "pageElement": ".jss23",
        "replaceElement": ".jss15",
        "waitElement": [
            ".lazyload-wrapper>img",
            ".lazyload-placeholder"
        ],
        "pageInit": "doc.querySelectorAll('img.jss29').forEach(img=>{img.setAttribute('class','jss28');img.src=img.src})",
        "pageAction": "let ge=e=>document.querySelector(e);setTimeout(()=>{let bs=document.querySelectorAll(`button[aria-label^='Go to page']`);let pp=ge(`button[aria-label='Go to previous page']:not(.Mui-disabled)`);let cp=ge('button.Mui-selected');let np=ge(`button[aria-label='Go to next page']:not(.Mui-disabled)`);let lp=location.pathname;let lps=lp.split('/');bs.forEach(button=>{let pn=button.textContent;let link='/'+lps[1]+'/'+lps[2]+'/'+pn+'/'+lps[4];let lh=`location.href='${link}'`;button.setAttribute('onclick',lh)});if(pp){let cpn=cp.textContent;let p=cpn-1;let link='/'+lps[1]+'/'+lps[2]+'/'+p+'/'+lps[4];let lh=`location.href='${link}'`;pp.setAttribute('onclick',lh)}if(np){let npn=cp.parentNode.nextSibling.textContent;let link='/'+lps[1]+'/'+lps[2]+'/'+npn+'/'+lps[4];let lh=`location.href='${link}'`;np.setAttribute('onclick',lh)}},1000)",
        "css": ".lazyload-wrapper+span.jss28{display:none!important}"
    },
    {
        "name": "avple.tv - 搜索",
        "example": "https://avple.tv/search?key=FC2PPV&page=1&sort=date",
        "action": 1,
        "url": "^https?://avple\\.tv/search\\?key=",
        "nextLinkByUrl": [
            "(&page=)(\\d+)(&.+)$",
            "$1{$2+1}$3",
            "[aria-label='Go to next page']:not(.Mui-disabled)"
        ],
        "pageElement": ".jss23",
        "replaceElement": ".jss15",
        "waitElement": [
            ".lazyload-wrapper>img",
            ".lazyload-placeholder"
        ],
        "pageInit": "doc.querySelectorAll('img.jss29').forEach(img=>{img.setAttribute('class','jss28');img.src=img.src})",
        "pageAction": "let ge=e=>document.querySelector(e);setTimeout(()=>{let bs=document.querySelectorAll(`button[aria-label^='Go to page']`);let pp=ge(`button[aria-label='Go to previous page']:not(.Mui-disabled)`);let cp=ge('button.Mui-selected');let np=ge(`button[aria-label='Go to next page']:not(.Mui-disabled)`);let ls=location.search;let m=ls.match(/^(\\?key=)([^&]+)(&page=)(\\d+)(&sort=date|&sort=view_count|&sort=favorite)/);bs.forEach(button=>{let pn=button.textContent;let link=m[1]+m[2]+m[3]+pn+m[5];let lh=`location.href='${link}'`;button.setAttribute('onclick',lh)});if(pp){let cpn=cp.textContent;let p=cpn-1;let link=m[1]+m[2]+m[3]+p+m[5];let lh=`location.href='${link}'`;pp.setAttribute('onclick',lh)}if(np){let npn=cp.parentNode.nextSibling.textContent;let link=m[1]+m[2]+m[3]+npn+m[5];let lh=`location.href='${link}'`;np.setAttribute('onclick',lh)}},1000)",
        "css": ".lazyload-wrapper+span.jss28{display:none!important;}"
    },
    {
        "name": "X5AV",
        "example": "https://x5av.com/e/action/ListInfo/?classid=2",
        "url": "^https?://x5av\\.com/(e|popular)/((action|search)/)?",
        "pageElement": ".videos-container>*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "javbangers.com",
        "example": "https://www.javbangers.com/latest-updates/",
        "url": "^https?://www\\.javbangers\\.com/",
        "include": ".pagination",
        "nextLink": "li.page-current+li.page>a",
        "pageElement": ".porntrex-box .video-item,.box .item",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "HOTGIRL.asia - 清單",
        "example": "https://hotgirl.asia/genre/china/",
        "url": "^https?://hotgirl\\.asia/(\\?s=|genre|tag|photos|livestream|china|korea|videos)(\\/)?",
        "nextLink": "li.active+li>a",
        "pageElement": ".vl-item,.movies-list,#myimg",
        "replaceElement": "#pagination"
    },
    {
        "name": "HOTGIRL.asia - 寫真",
        "example": "https://hotgirl.asia/imiss%e7%88%b1%e8%9c%9c%e7%a4%be-vol-693-lavinia%e8%82%89%e8%82%89/",
        "url": "^https?://hotgirl\\.asia/[^/]+/",
        "include": ".mx-auto",
        "init": "document.querySelectorAll(\"img[alt][src^='data']\").forEach(e=>{e.parentNode.remove()})",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[@class='galeria_img'][img[starts-with(@src,'http')]]",
        "css": "#footer,#commentfb,.content-kuss{display: none!important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "imgasd",
        "example": "https://imgasd.com/",
        "url": "^https?://imgasd\\.com",
        "nextLink": "a.active+a",
        "pageElement": ".list>li",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "Taotuxp.com - 看圖",
        "example": "https://www.taotucc.com/252555.html",
        "url": "^https?://www\\.taotucc\\.com/\\d+\\.html",
        "nextLink": ".pagelist>span+a",
        "pageElement": "#post_content>p",
        "replaceElement": ".pagelist",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "#post_content img{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}#content p{margin:0!important}"
    },
    {
        "name": "Taotuxp.com - 分類",
        "example": "https://www.taotucc.com/",
        "url": "^https?://www\\.taotucc\\.com/",
        "nextLink": "a.current+a",
        "pageElement": "#post_container",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-8px!important}"
    },
    {
        "name": "超级美女图库 - 手機版看圖",
        "example": "https://m.2avtt.com/xiuren/56166.html",
        "url": "^https?://m\\.[^/]+/",
        "include": "//title[contains(text(),'超级美女图库')]",
        "action": 1,
        "init": "document.querySelectorAll('.wallpaper-container br').forEach(e=>{e.remove()});let a=document.querySelector('.wallpaper-container>a');a.outerHTML=a.innerHTML;",
        "nextLinkByUrl": [
            "/([^_]+)(_(\\d+))?\\.html$",
            "/$1_{$3+1}.html"
        ],
        "stopSign": [
            [
                ".title>h2>em",
                "(\\d+)"
            ],
            [
                ".title>h2>i",
                "(\\d+)"
            ]
        ],
        "pageElement": ".wallpaper-container img",
        "replaceElement": ".title>h2>em",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "strong,.wallpaper-container+div[align]{display:none!important}"
    },
    {
        "name": "超级美女图库 - 手機版分類",
        "example": "https://m.2avtt.com/xingan/",
        "url": "^https?://m\\.[^/]+/",
        "include": "//title[contains(text(),'超级美女图库')]",
        "nextLink": "//a[@class='last' and text()='下一页']",
        "pageElement": "//div[(span) and @class='items']",
        "replaceElement": "p.action",
        "pageBar": 0
    },
    {
        "name": "超级美女图库 - 看圖",
        "example": "https://www.2avtt.com/xingan/54985.html",
        "url": "^https?://[^/]+/",
        "include": "//title[contains(text(),'超级美女图库')]",
        "action": 1,
        "init": "let a=document.querySelector('#nextPageTagA');a.outerHTML=a.innerHTML;",
        "nextLink": "li.thisclass+li>a",
        "pageElement": "#photoMain img[alt]",
        "replaceElement": ".page,.local>span",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "css": "div[align='center']+div[align='center'],#photoMain br{display:none!important}"
    },
    {
        "name": "超级美女图库 - 分類",
        "example": "https://www.2avtt.com/xingan/",
        "url": "^https?://[^/]+/",
        "include": "//title[contains(text(),'超级美女图库')]",
        "nextLink": "li.thisclass+li>a",
        "pageElement": "//div[@class='col-left-right'][div/div[@align='center']/following-sibling::div[1]/div[@class='item']]",
        "replaceElement": ".page",
        "css": ".pagetual_pageBar{margin-top:0px!important}"
    },
    {
        "name": "Xgirls - 看圖",
        "example": "https://xgirlscollection.com/collection/2015",
        "url": "^https?://xgirlscollection\\.com/",
        "nextLink": "//a[i[@class='fa fa-angle-right']]",
        "pageElement": "img[id].collection-image",
        "replaceElement": ".pagination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "Xgirls - 分類",
        "example": "https://xgirlscollection.com/collections",
        "url": "^https?://xgirlscollection\\.com/",
        "nextLink": "//a[i[@class='fa fa-angle-right']]",
        "pageElement": "//div[@class='container']/div[@class='row']/div/div[div/div[@class='card-wrapper']/div[@class='card-img']/a/img][@class='row']/*",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "Porn Pics - 圖片清單載入大圖",
        "example": "https://www.pornpics.com/galleries/brunette-asian-girl-yui-uehara-gives-a-blowjob-and-gets-fucked-by-two-knobs-29982680/",
        "url": "^https?://www\\.pornpics\\.com/galleries/[^/]+/",
        "include": "a[data-tid]",
        "pinUrl": true,
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.parentNode.href})"
    },
    {
        "name": "优丝库HD - 分類",
        "example": "https://yskhd.com/archives/category/xiuren/xiuren%e7%a7%80%e4%ba%ba%e7%bd%91?t",
        "url": "^https?://yskhd\\.com/",
        "include": ".pagination",
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.getAttribute('data-src')})",
        "nextLink": "li.active+li>a",
        "pageElement": ".posts",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar{margin-top:-8px!important}.grids{margin:0 -10px 0px!important}"
    },
    {
        "name": "心动美图 - 看圖",
        "example": "https://www.wai77.com/xiuren%e7%a7%80%e4%ba%ba%e7%bd%91-no-5566-manuela%e7%8e%9b%e9%b2%81%e5%a8%9c-%e6%b7%a1%e7%bb%bf%e7%81%b0%e8%89%b2%e4%b8%8a%e8%a1%a3%e6%90%ad%e9%85%8d%e7%99%bd%e8%89%b2%e7%9f%ad%e8%a3%99/",
        "url": "^https?://www\\.wai77\\.com/[^/]+/",
        "init": "let fimgs=document.querySelectorAll('div[data-src]');let alts=document.querySelectorAll('#lightgallery img[alt]');let _img='';for(let i=0;i<fimgs.length;i++){_img+=`<img src='${fimgs[i].dataset.src}'alt='${alts[i].getAttribute('alt')}'>`};document.querySelector('#lightgallery').innerHTML=_img;",
        "nextLink": "span.current+a",
        "pageElement": "#lightgallery",
        "replaceElement": ".single-nav-links",
        "pageInit": "let fimgs=doc.querySelectorAll('div[data-src]');let alts=doc.querySelectorAll('#lightgallery img[alt]');let _img='';for(let i=0;i<fimgs.length;i++){_img+=`<img src='${fimgs[i].dataset.src}'alt='${alts[i].getAttribute('alt')}'>`};doc.querySelector('#lightgallery').innerHTML=_img;",
        "css": ".cbox{display:block!important}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "心动美图 - 分類",
        "example": "https://www.wai77.com/tag/%E7%A7%80%E4%BA%BA%E7%BD%91/",
        "url": "^https?://www\\.wai77\\.com/(tag|category|\\?s=)",
        "nextLink": "span.current+a",
        "pageElement": "#recent-content>[id^='post']",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "秀色女神 - 手機版看圖",
        "example": "https://m.xsnvshen.co/album/39844?p=1",
        "url": "^https?://m\\.xsnvshen\\.[a-z]{2,3}/album/\\d+(\\?p=\\d+)?",
        "pinUrl": true,
        "action": 1,
        "init": "document.querySelectorAll('#arcbox img.nolazy').forEach(img=>{img.src=img.src.replace(/thumb[^/]+\\//,'');img.removeAttribute('style');img.parentNode.outerHTML=img.outerHTML});document.querySelectorAll('#arcbox img.lazy[alt]').forEach(img=>{img.src=img.getAttribute('data-original').replace(/thumb[^/]+\\//,'');img.removeAttribute('data-original');img.setAttribute('class','nolazy');img.removeAttribute('style');img.parentNode.outerHTML=img.outerHTML});",
        "nextLink": "a.pg_next",
        "pageElement": "#arcbox img[alt]",
        "replaceElement": "#pageNum",
        "pageInit": "doc.querySelectorAll('#arcbox img.nolazy').forEach(img=>{img.src=img.src.replace(/thumb[^/]+\\//,'');img.removeAttribute('style');});doc.querySelectorAll('#arcbox img.lazy[alt]').forEach(img=>{img.src=img.getAttribute('data-original').replace(/thumb[^/]+\\//,'');img.removeAttribute('data-original');img.removeAttribute('style');img.setAttribute('class','nolazy')});",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0",
        "sleep": 5000,
        "css": "#arcbox img[alt]{width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0px auto !important}[id^='ad']{display:none!important}"
    },
    {
        "name": "秀色女神 - 分類",
        "example": "https://www.xsnvshen.co/girl/",
        "url": "^https?://www\\.xsnvshen\\.[a-z]{2,3}/",
        "include": "#pageNum",
        "nextLink": "a.active+a",
        "pageElement": "//ul[li[contains(@class,'min')]/a[@class='itemimg']]",
        "replaceElement": "#pageNum",
        "pageBar": 0
    },
    {
        "name": "X成人论坛 帖子內",
        "example": "https://xbbs.me/thread/id-620bd15362b3d.html",
        "url": "^https?://(tw\\.)?xbbs\\.me/thread/[^.]+\\.html",
        "pinUrl": true,
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.removeAttribute('data-src')})",
        "nextLink": "a.next",
        "pageElement": "//div[div[@class='xbbs-thread-content reply']]",
        "insert": ".pager",
        "insertPos": 1,
        "replaceElement": ".pager"
    },
    {
        "name": "X成人论坛 帖子",
        "example": "https://xbbs.me/forum/id-61fe70f2b9631.html",
        "url": "^https?://(tw\\.)?xbbs\\.me/forum/[^.]+\\.html",
        "nextLink": "a.next",
        "pageElement": ".xbbs-item",
        "replaceElement": [
            "div.article>div.pager:first-child",
            "div.article>div.pager:last-child"
        ],
        "css": ".slider-ad,.push-top{display:none!important}"
    },
    {
        "name": "丽图·污漫画 - 閱讀",
        "example": "https://litu100.xyz/comic/id-624428abcf548/1.html",
        "url": "^https?://litu100\\.xyz/comic/id-\\w+/\\d+\\.html",
        "init": "document.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.removeAttribute('data-src')})",
        "nextLink": "a.next",
        "pageElement": ".article.comic",
        "pageInit": "doc.querySelectorAll('img[data-src]').forEach(e=>{e.src=e.dataset.src;e.removeAttribute('data-src')})",
        "replaceElement": ".prevNext",
        "pageBarText": "return doc.querySelector('.tag[checked=true]').innerText;",
        "css": ".banner_ad{display:none!important}.pagetual_pageBar{margin-top:2px!important}"
    },
    {
        "name": "丽图·污漫画 - 分類",
        "example": "https://litu100.xyz/comics.html",
        "url": "^https?://litu100\\.xyz/",
        "nextLink": "a.next",
        "pageElement": ".list>.item",
        "replaceElement": ".pager",
        "css": "._728x90{display:none!important}"
    },
    {
        "name": "海棠小说网 - 手机阅读",
        "example": "https://m.haitangtxt.net/19/19363/1736943.html",
        "url": "^https?://m\\.haitangtxt\\.net/",
        "nextLink": "//a[contains(text(),'下一页') or contains(text(),'下一章')]",
        "pageElement": ".content_title,#articlecontent",
        "replaceElement": ".content_top,.novelbutton",
        "pageBar": 0
    },
    {
        "name": "海棠小说网 - 分类页",
        "example": "https://m.haitangtxt.net/top/",
        "url": "^https?://m\\.haitangtxt\\.net/",
        "nextLink": "//a[text()='下一页' or text()='下页']",
        "pageElement": ".articlegeneral,.full_content,.chapters>li",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "小黃書 - 成人小說閱讀",
        "example": "https://tw.xchina.co/fiction/id-64036d06046a5/1.html",
        "url": "^https?://(tw\\.)?xchina\\.co/fiction/id-\\w+/\\d+\\.html",
        "nextLink": "a.next",
        "pageElement": ".article.large",
        "replaceElement": ".prevNext",
        "css": ".banner_ad{display:none!important}"
    },
    {
        "name": "小黃書 - 模特、小說目錄",
        "example": "https://tw.xchina.co/fiction/id-64036d06046a5.html，https://tw.xchina.co/model/id-605849cd980ad.html",
        "url": "^https?://(tw\\.)?xchina\\.co/(fiction|model)/id-\\w+\\.html",
        "pinUrl": true,
        "nextLink": "0",
        "css": ".aside>.center,.banner_ad{display:none!important}"
    },
    {
        "name": "小黃書 - 搜索",
        "example": "https://tw.xchina.co/search/keyword-%E4%B8%9D%E8%A2%9C/mode-photo.html",
        "url": "^https?://([a-z-]{2}\\.)?(xchina|8se)\\.(co|me|pro)/search/",
        "init": "let bs = document.querySelector('body[style]');if(bs)bs.removeAttribute('style');",
        "nextLink": "a.next",
        "pageElement": ".article.result>.list",
        "replaceElement": [
            "div.article:not(.result)+div.pager",
            "div.article.result+div.pager"
        ],
        "css": ".pagetual_pageBar+div{margin-top:-5px !important;}.slider-ad,.jquery-modal.blocker.current,.article.ad,.body>*:not(.article):not(.pager),.banner_ad{display:none!important}",
        "rate": 3
    },
    {
        "name": "小黃書 - 原圖瀏覽",
        "example": "https://tw.xchina.co/photoShow.php?server=1&id=6311c6080f9a5&index=0&pageSize=19&title=%E3%80%90%E6%9C%AA%E5%88%86%E9%A1%9E%E4%BA%BA%E9%AB%94%E6%94%9D%E5%BD%B1%E3%80%91%E9%87%91%E9%AD%9Akinngyo%E3%80%8A%E5%A4%8F%E6%97%A5%E5%8D%88%E5%BE%8C%E3%80%8B",
        "url": "^https?://([a-z-]{2}\\.)?(xchina|8se)\\.(co|me|pro)/photoShow\\.php",
        "action": 1,
        "nextLink": "//div[@class='image']/a[3][i[@class='fa fa-arrow-right right']][not(starts-with(@href,'java'))]",
        "pageElement": ".container > img",
        "replaceElement": ".image>.index,.image>a",
        "css": ".image>a:nth-child(3),.image>a:nth-child(4),body>.image~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords){display: none!important;}.container>img {max-width: 100% !important;display: block !important;margin: 0 auto !important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "小黃書 - 圖片清單",
        "example": "https://tw.xchina.co/photo/id-63d02a8cdaf75.html，https://8se.me/photo/id-63938c1972fde.html",
        "url": "^https?://([a-z-]{2}\\.)?(xchina|8se)\\.(co|me|pro)/photo/",
        "include": "img.cr_only",
        "pinUrl": true,
        "action": 1,
        "waitElement": [
            "img.cr_only"
        ],
        "nextLink": "a.next",
        "pageElement": ".photos > a",
        "replaceElement": [
            "div.article>div.pager:first-child",
            "div.article>div.pager:last-child"
        ],
        "css": ".photos>div.item,.jquery-modal.blocker.current,.slider-ad,.article.ad,.pager>.tips,body>footer~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords):not(.customPicDownloadMsg):not(#customPicDownload),.photoMask,.banner_ad{display: none!important;}",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "小黃書 - 分類",
        "example": "https://tw.xchina.co/photos/kind-2.html，https://8se.me/photos/model-61be1af337a19.html",
        "url": "^https?://([a-z-]{2}\\.)?(xchina|8se)\\.(co|me|pro)/(photos|videos|models|fictions|torrents)",
        "exclude": "body>.image",
        "init": "let bs = document.querySelector('body[style]');if(bs)bs.removeAttribute('style');",
        "pinUrl": true,
        "nextLink": "a.next",
        "pageElement": ".list>.item,.list>.fiction,.list>.torrent,.videos>.item",
        "replaceElement": [
            "div.article>div.pager:first-child",
            "div.article>div.pager:last-child"
        ],
        "rate": 3,
        "css": ".pagetual_pageBar{margin-bottom:5px!important}.videos .pagetual_pageBar{margin-top:30px!important;margin-bottom:0px!important}.slider-ad,.article.ad,.jquery-modal.blocker.current,.banner_ad,.tips,.aside>.center{display:none!important}"
    },
    {
        "name": "hitxhot - 寫真",
        "example": "https://www.hitxhot.org/gallerys/TUNPcCtCSVhEMXNPZU52TWI2ZnB2Zz09.html",
        "url": "^https?://www\\.hitxhot\\.org/gallerys/",
        "action": 1,
        "init": "let F=new DocumentFragment();document.querySelectorAll('.contentme img').forEach(e=>{let img=new Image();img.src=e.src;F.appendChild(img)});let E=document.querySelector('.contentme');E.innerHTML='';E.appendChild(F);",
        "nextLink": "//a[contains(text(),'Next')]",
        "pageElement": ".contentme img",
        "replaceElement": ".pag>.pagination-site,.c-denomination.s-denomination",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "hitxhot - 清單",
        "example": "https://www.hitxhot.org/",
        "url": "^https?://www\\.hitxhot\\.org/(\\?page=\\d+)?$",
        "include": ".pag>.pagination-site",
        "nextLink": "//a[contains(text(),'Next')]",
        "pageElement": ".videos>.thumb-view",
        "replaceElement": ".pag>.pagination-site",
        "pageBar": 0
    },
    {
        "name": "女神研究所",
        "example": "https://www.simracingzone.net/",
        "url": "^https?://www\\.simracingzone\\.net/",
        "nextLink": "span.current+a",
        "pageElement": "#index_ajax_list>*",
        "replaceElement": ".nav-links",
        "pageBar": 0
    },
    {
        "name": "秘图社",
        "example": "https://www.sssins.com/，https://www.nicesss.com/",
        "url": "^https?://www\\.(sssins|nicesss)\\.com/",
        "nextLink": "//li[span[@aria-current='page']]/following-sibling::li[1]/a",
        "pageElement": ".posts-wrapper>*",
        "replaceElement": "ul.page-numbers",
        "pageBar": 0
    },
    {
        "name": "MediaFire 自動下載",
        "url": "^https?://www\\.mediafire\\.com/",
        "autoClick": ".download_link:not(.started) #downloadButton",
        "pinUrl": true,
        "nextLink": "0"
    },
    {
        "name": "ouo.io 自動跳轉",
        "url": "^https?://ouo\\.",
        "init": "let loop=setInterval(()=>{let set=document.querySelector('#btn-main:not(.disabled)');if(set){clearInterval(loop);set.click()}},100)",
        "include": "#btn-main",
        "pinUrl": true,
        "nextLink": "0"
    },
    {
        "name": "YINGPIAN影片社",
        "example": "https://yingpian89.com/",
        "url": "^https?://(yingpian89|69avfilm).com/",
        "nextLink": "a[rel='next'],.nav-previous>a",
        "pageElement": "div[id^='post-']",
        "replaceElement": ".wp-pagenavi",
        "wait": "let img=doc.querySelector('#content img');return img!=null",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "國模網",
        "example": "https://gm23.xyz/",
        "url": "^https?://gm\\d+\\.xyz/",
        "init": "document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src})",
        "nextLink": "a.next",
        "pageElement": "#main > article",
        "replaceElement": "#nav-below",
        "pageBar": 0
    },
    {
        "name": "性趣套圖 - 搜索",
        "example": "https://myjkwd.com/e/search/result/?searchid=7898",
        "url": "^https?://myjkwd\\.com/e/search/",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "h2.r,table[width^='8']",
        "replaceElement": ".list_page",
        "css": "table.nav,table[width^='8'] tr:nth-child(1){display:none!important;}td{font:12px/1.5 Verdana,Arial,Helvetica,sans-serif,'微软雅黑'!important}",
        "pageBar": 0
    },
    {
        "name": "性趣套圖 - 看圖",
        "example": "https://myjkwd.com/e/action/ShowInfo.php?classid=1&id=23726",
        "url": "^https?://myjkwd\\.com/e/action/ShowInfo\\.php",
        "pinUrl": true,
        "init": "let ge=e=>document.querySelector(e);let e=ge('.entry');e.innerHTML=e.innerHTML.replace('\"&gt;','');document.addEventListener('keydown',(e)=>{let key=window.event?e.keyCode:e.which;if(key=='39'){let n=ge('.nextinfo a');if(n)n.click()}});document.addEventListener('keydown',(e)=>{let key=window.event?e.keyCode:e.which;if(key=='37'){let p=ge('.nextinfo p:last-child a');if(p)p.click()}});",
        "nextLink": ".pageLink b+a",
        "pageElement": ".entry img",
        "replaceElement": ".pageLink",
        "pageBar": 0,
        "rate": 10,
        "css": "aside.side,.pageLink{display:none!important;}.main-content{margin-left:0px!important;}"
    },
    {
        "name": "性趣套圖 - 列表",
        "example": "https://myjkwd.com/e/action/ListInfo/?classid=1",
        "url": "^https?://myjkwd.com/e/action/ListInfo",
        "nextLink": "//a[text()='下一页']",
        "pageElement": ".bloglist > ul",
        "replaceElement": ".pageLink",
        "css": ".pagetual_pageBar{width:98.6%!important;}aside.side{display:none!important;}.main-content{margin-left:0px!important;}body{background:#EDEDED!important;}",
        "initRun": 1,
        "autoLoadNum": 1
    },
    {
        "name": "雅拉伊",
        "example": "https://www.yalayi.com/gallery/",
        "url": "^https?://www\\.yalayi\\.com/",
        "action": 1,
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//ul[li/div[@class='img-box']] | //div[@class='girls']/ul",
        "replaceElement": ".pages",
        "css": ".pagetual_pageBar{margin-top:-10px!important;margin-bottom:0px!important}"
    },
    {
        "name": "Bookshop.tw",
        "example": "https://www.bookshop.tw/",
        "url": "^https?://www\\.bookshop\\.tw",
        "action": 1,
        "waitElement": [
            "#url_ne[href$='htm']"
        ],
        "nextLink": "#url_ne[href$='htm']",
        "pageElement": ".listbg0",
        "replaceElement": "//td[a/@id='url_fr']",
        "pageBar": 0
    },
    {
        "name": "Mox.moe",
        "example": "https://mox.moe/",
        "url": "^https?://mox\\.moe",
        "action": 1,
        "nextLink": "//a[button/text()='下頁']",
        "pageElement": ".listbg",
        "replaceElement": "td.listtitle[colspan='5']",
        "pageBar": 0
    },
    {
        "name": "BOOK☆WALKER TW 更多",
        "example": "https://www.bookwalker.com.tw/block/1",
        "url": "^https?://www\\.bookwalker\\.com\\.tw/",
        "nextLink": "//li[span/@class='active']/following-sibling::li[1]/a",
        "pageElement": ".book_package",
        "replaceElement": ".bw_main2 > div:first-child,.bw_main2 > div:last-child,.pagebar",
        "initRun": 1,
        "autoLoadNum": 4,
        "pageBar": 0
    },
    {
        "name": "BOOK☆WALKER TW",
        "example": "https://www.bookwalker.com.tw/search?m=2&series_display=1&vertical=0&order=sell_desc&s=19",
        "url": "^https?://www\\.bookwalker\\.com\\.tw/search",
        "nextLink": "//li[span/@class='active']/following-sibling::li[1]/a",
        "pageElement": ".bookdesc2.clearfix,.row.listbox.clearfix+.row.mar0pad0",
        "replaceElement": ".bw_main2 > div:first-child,.bw_main2 > div:last-child,.pagebar",
        "initRun": 1,
        "autoLoadNum": 2,
        "pageBar": 0
    },
    {
        "name": "BOOK☆WALKER JP - 手機版",
        "example": "https://bookwalker.jp/new/?qsto=st2",
        "url": "^https?://bookwalker\\.jp/(category|search|new)/",
        "include": ".o-pager-box",
        "nextLink": "li.o-select-box+li>a",
        "pageElement": ".o-tile-list>.o-tile",
        "replaceElement": ".o-pager-box",
        "pageBar": 0,
        "rate": 3
    },
    {
        "name": "BOOK☆WALKER JP",
        "example": "https://bookwalker.jp/new/?qsto=st2",
        "url": "^https?://bookwalker\\.jp/(category|search|new)/",
        "include": ".o-list--menu,.o-list--footer",
        "nextLink": ".o-pager-next>a",
        "pageElement": ".o-contents-section__body .m-tile",
        "replaceElement": [
            ".o-list--menu",
            ".o-list--footer"
        ],
        "pageBar": 0
    },
    {
        "name": "优书网 - 書籍分類",
        "example": "https://www.yousuu.com/booklists/?type=man",
        "url": "^https?://www\\.yousuu\\.com/(bookstore|booklists)/",
        "action": 1,
        "waitElement": [
            "",
            ".loadingBlock"
        ],
        "init": "setTimeout(()=>{document.querySelectorAll('label.tab').forEach(e=>{e.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});document.querySelectorAll('h1>span').forEach(e=>{e.setAttribute('onclick','setTimeout(()=>{location.reload()}, 100)')});},1000)",
        "nextLinkByJs": "let next=doc.querySelector('li.number.active+li.number');if(next)return location.origin+location.pathname+location.search.replace(/&page=\\d+$/,'')+'&page='+next.innerText",
        "pageElement": ".booklist-card",
        "replaceElement": ".pagination",
        "pageAction": "let ge=e=>document.querySelector(e);let gae=e=>document.querySelectorAll(e);let lsr=location.search.replace(/&page=\\d+$/,'');setTimeout(()=>{gae('.number:not(.active)').forEach(e=>{let ls=lsr+'&page='+e.innerText;let link=`location.href='${ls}'`;e.setAttribute('onclick',link)});let pb=ge('.btn-prev');let nb=ge('.btn-next');let c=ge('.number.active');let n=ge('.number.active+.number');if(n){let ls=lsr+'&page='+n.innerText;let link=`location.href='${ls}'`;nb.setAttribute('onclick',link)}if(c.innerText>1){let p=c.innerText-1;let ls=lsr+'&page='+p;let link=`location.href='${ls}'`;pb.setAttribute('onclick',link)}},200)",
        "pageBar": 0
    },
    {
        "name": "www.shoujixs.net_手机小说 - 阅读",
        "example": "https://www.shoujixs.net/shoujixs_161450_40736191.html",
        "url": "^https?://www\\.shoujixs\\.net/\\w+\\.html$",
        "history": 2,
        "nextLink": "//a[text()='下一章' and contains(@href,'html')]",
        "pageElement": "//div[@class='bookname']/h1 | //div[@id and p]",
        "replaceElement": ".bottem1,.bottem2",
        "pageBar": 0,
        "css": "[id]+h1{padding-top:10px;text-align:center}"
    },
    {
        "name": "www.shoujixs.net_手机小说 - 分类页",
        "example": "https://www.shoujixs.net/xhqh/",
        "url": "^https?://www\\.shoujixs\\.net/",
        "nextLink": "#pagelink strong+a:not([class])",
        "pageElement": ".shoujixsl li,.c_row",
        "replaceElement": "#pagelink"
    },
    {
        "name": "博仕書屋手機版 - 閱讀",
        "example": "https://m.77z5.com/boshi/28_28437/14990400.html",
        "url": "^https?://m\\.(boshisw|77z5)\\.com/boshi/\\w+/[0-9_]+\\.html",
        "history": 2,
        "nextLink": "#pt_next",
        "pageElement": "header#top,#chaptercontent",
        "replaceElement": "head>title,.Readpage",
        "pageBar": 0,
        "css": "#chaptercontent p[style],#chaptercontent p[style]+p,#chaptercontent+#top a,[style='text-align: left;color: #028aa0;font-size: 18px;font-weight:bold;']{display: none!important;}#chaptercontent+#top{height:30px!important;line-height:30px!important}",
        "initRun": 1,
        "autoLoadNum": 1
    },
    {
        "name": "博仕書屋手機版 - 小說章節",
        "example": "https://m.77z5.com/boshi/28_28437/all.html",
        "url": "^https?://m\\.(boshisw|77z5)\\.com/boshi/\\w+/(all|p\\d+)\\.html",
        "init": "let b = document.querySelector('body');b.innerHTML = b.innerHTML.replace(/<br>\\n<b>\\w+<\\/b>[^<]+<b>[^<]+<\\/b>[^<]+<b>\\d+<\\/b><br>/,'');",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "//div[@id='chapterlist']/p[a/@title]",
        "replaceElement": ".listpage",
        "pageBar": 0,
        "css": "#chapterlist>p[style]{display:none!important;}"
    },
    {
        "name": "博仕書屋手機版 - 書籍分類",
        "example": "https://m.77z5.com/boshi/quanben.html",
        "url": "^https?://m\\.(boshisw|77z5)\\.com/boshi/\\w+\\.html",
        "nextLink": "//a[text()='下一页']",
        "pageElement": "#main",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "博仕書屋 - 閱讀",
        "example": "https://www.77z5.com/boshi/28_28437/14990400.html",
        "url": "^https?://www\\.(boshisw|77z5)\\.com/boshi/\\w+/\\d+\\.html",
        "history": 2,
        "nextLink": "//a[text()='下一章']",
        "pageElement": ".bookname>h1,#content",
        "replaceElement": "head>title,.bottem1,bottem2",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('h1');let t=gae('#content');if(t.length>10){h[0].remove();t[0].remove()}",
        "css": "table+h1,#content+h1,.bookname+h1{padding-top:20px;text-align:center}"
    },
    {
        "name": "博仕書屋 - 書籍分類",
        "example": "https://www.77z5.com/boshi/xuanhuanqihuan/",
        "url": "^https?://www\\.(boshisw|77z5)\\.com/(boshi|modules)/(xuanhuanqihuan|wuxiaxianxia|dushiyanqing|lishijunshi|kehuanlingyi|wangyoudongman|wanben|article)/",
        "nextLink": "a.next",
        "pageElement": "#newscontent>.l>h2,#newscontent>.l>ul,#content>table.grid #nr",
        "replaceElement": ".page_b,.pages"
    },
    {
        "name": "歡喜冤家小說網 - 閱讀",
        "example": "https://www.huanxiyuanjia.com/12_12849/5258090.html",
        "url": "^https?://www.huanxiyuanjia.com/[0-9_]+/\\d+\\.html",
        "init": "let gae=e=>document.querySelectorAll(e);gae('#TextContent>*:not(p):nth-child(n+1):nth-child(-n+999)').forEach(e=>{e.remove()});gae('#TextContent>p:nth-child(n+1):nth-child(-n+2)').forEach(e=>{e.remove()});let t=gae('#TextContent')[0];t.innerHTML=t.innerHTML.replace('huanxiyuanjia.com 欢喜冤家','');",
        "action": 1,
        "history": 2,
        "nextLink": "#next_url",
        "pageElement": "h1,#TextContent",
        "replaceElement": "head>title,.mlfy_page+.mlfy_page",
        "pageBar": 0,
        "css": ".mlfy_main h1{padding-bottom:0px!important;border-bottom:none!important}#TextContent>p:nth-child(n+2):nth-child(-n+3){display: none!important;}",
        "pageInit": "let gae=e=>doc.querySelectorAll(e);gae('#TextContent>*:not(p):nth-child(n+1):nth-child(-n+999)').forEach(e=>{e.remove()});gae('#TextContent>p:nth-child(n+1):nth-child(-n+2)').forEach(e=>{e.remove()});let t=gae('#TextContent')[0];t.innerHTML=t.innerHTML.replace('huanxiyuanjia.com 欢喜冤家','');",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('h1');let t=gae('#TextContent');if(t.length>10){h[0].remove();t[0].remove()}"
    },
    {
        "name": "歡喜冤家小說網 - 書籍分類",
        "example": "https://www.huanxiyuanjia.com/fenlei/xuanhuan/1/",
        "url": "^https?://www.huanxiyuanjia.com/fenlei/",
        "nextLink": "//a[text()='>>']",
        "pageElement": "#sitebox",
        "replaceElement": ".pages",
        "pageBar": 0
    },
    {
        "name": "筆趣閣bqg9527 - 手機版閱讀",
        "example": "https://m.bqg9527.com/zh_hant/book/265472/194745565.html",
        "url": "^https?://m\\.bqg9527\\.com/(zh_hant/)?book/\\d+/\\d+\\.html",
        "action": 1,
        "history": 2,
        "nextLink": "//a[text()='下一章']",
        "pageElement": "#nr_title,#nr.nr_nr",
        "replaceElement": "head>title,.nr_page",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('#nr_title');let t=gae('#nr.nr_nr');if(t.length>10){h[0].remove();t[0].remove()}"
    },
    {
        "name": "筆趣閣bqg9527 - PC版閱讀",
        "example": "https://www.bqg9527.com/zh_hant/book/265472/194745565.html",
        "url": "^https?://www\\.bqg9527\\.com/(zh_hant/)?book/\\d+/\\d+\\.html",
        "action": 1,
        "history": 2,
        "nextLink": "//a[text()='下一章']",
        "pageElement": ".bookname>h1,#content",
        "replaceElement": "head>title,.bottem1,.bottem2",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('h1');let t=gae('#content');if(t.length>10){h[0].remove();t[0].remove()}",
        "css": ".read-top-ad{display:none!important}h1{font: 30px 黑体!important;text-align:center!important}"
    },
    {
        "name": "筆趣閣bqg9527 - 書籍分類",
        "example": "https://www.bqg9527.com/sort/1/",
        "url": "^https?://www\\.bqg9527\\.com/",
        "include": "#newscontent",
        "nextLink": "0"
    },
    {
        "name": "筆趣閣biqu86 - 閱讀",
        "example": "https://www.biqu86.com/xiuzhen/3211/1.html",
        "url": "^https?://(www|m)\\.biqu86\\.com/[a-z]+/\\d+/\\d+\\.html",
        "action": 1,
        "history": 2,
        "nextLink": "//a[text()='下一章']",
        "pageElement": ".bookname>h1,#content",
        "replaceElement": "head>title,.bottem1,.bottem2",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('h1');let t=gae('#content');if(t.length>10){h[0].remove();t[0].remove()}",
        "css": "#ifexplorer+h1,#content+h1{font:35px 雅黑;padding-top:20px;text-align:center}.read-top-ad{display:none!important}"
    },
    {
        "name": "筆趣閣biqu86 - 書籍分類",
        "example": "https://www.biqu86.com/xuanhuan/",
        "url": "^https?://(www|m)\\.biqu86\\.com/(xuanhuan|xiuzhen|chuanyue|dushi|lishi|wangyou|kehuan|xiaoshuodaquan)",
        "action": 1,
        "nextLink": "li.current+li>a",
        "pageElement": ".l>ul",
        "replaceElement": ".pages",
        "css": "img{opacity:1!important}"
    },
    {
        "name": "和圖書手機版 - 目錄",
        "example": "https://m.hetubook.com/book/5849/catalog-1.html",
        "url": "^https?://m\\.(hetubook|hetushu)\\.com/book/\\d+/catalog-\\d+\\.html",
        "nextLink": "//a[text()='下一頁']",
        "pageElement": ".dir>dd:not([id])",
        "pageBar": 0,
        "initRun": 1,
        "autoLoadNum": "0"
    },
    {
        "name": "和圖書手機版 - 閱讀",
        "example": "https://m.hetubook.com/book/5849/4387851.html",
        "url": "^https?://m\\.(hetubook|hetushu)\\.com/book2?/\\d+/\\d+\\.html",
        "action": 1,
        "history": 2,
        "nextLink": "a#next",
        "pageElement": ".title>h2,#content",
        "waitElement": [
            "",
            ".cmask"
        ],
        "replaceElement": "head>title,#spage",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('.title>h2');let t=gae('#content');if(t.length>10){h[0].remove();t[0].remove()}",
        "css": ".body>h2{text-align:center!important;}"
    },
    {
        "name": "和圖書 -閱讀",
        "example": "https://www.hetubook.com/book/5849/4387851.html",
        "url": "^https?://www\\.(hetubook|hetushu)\\.com/book2?/\\d+/\\d+\\.html",
        "action": 1,
        "history": 2,
        "nextLink": "a#next",
        "pageElement": "#content",
        "waitElement": [
            "",
            ".mask.mask2"
        ],
        "replaceElement": "head>title,#right",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let t=gae('#content');if(t.length>10){t[0].remove()}",
        "css": "body,#center,#cbox,#content {overflow: initial !important;position: initial !important;} #right,.sidebarbox{position: fixed !important;right: 0;}#content+#content{padding-top:-10px!important}"
    },
    {
        "name": "和圖書 -分類",
        "example": "https://www.hetubook.com/book/index.php",
        "url": "^https?://www\\.(hetubook|hetushu)\\.com/book2?/index\\.php",
        "nextLink": "span.current+a",
        "pageElement": "#list",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "同人圈 -閱讀",
        "example": "http://tongrenquan.org/tongren/7070/1.html",
        "url": "^https?://tongrenquan\\.org/tongren/\\d+/\\d+\\.html",
        "pinUrl": true,
        "history": 2,
        "action": 1,
        "nextLink": "//a[text()='下一章']",
        "pageElement": ".read_chapterName,.read_chapterDetail",
        "replaceElement": "head>title,.pageNav",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('.read_chapterName');let t=gae('.read_chapterDetail');if(t.length>10){h[0].remove();t[0].remove()}",
        "css": ".read_chapterName h1{font:24px 'Microsoft YaHei'!important}.read_chapterName{margin-top:25px!important;margin-bottom:15px!important}"
    },
    {
        "name": "同人圈 -分類",
        "example": "http://tongrenquan.org/",
        "url": "^https?://tongrenquan\\.org/",
        "pinUrl": true,
        "nextLink": ".page b+a",
        "pageElement": ".books>.bk",
        "replaceElement": ".page",
        "pageBar": 0
    },
    {
        "name": "69書吧 -閱讀",
        "example": "https://www.69shu.com/txt/38161/26369110",
        "url": "^https?://www\\.69shu\\.com/txt/\\d+/\\d+",
        "history": 2,
        "action": 1,
        "nextLink": "//a[text()='下一章']",
        "pageElement": ".txtnav",
        "replaceElement": "head>title",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let t=gae('.txtnav');if(t.length>10)t[0].remove()"
    },
    {
        "name": "乐文小说网 -閱讀",
        "example": "http://www.lewenlou.org/132/132683/41065575.html",
        "url": "^https?://www\\.lewenlou\\.org/\\d+/\\d+/\\d+\\.html",
        "history": 2,
        "nextLink": ".next>a",
        "pageElement": "//div[div[contains(@class,'content-body')]]",
        "replaceElement": "head>title,.pager",
        "pageAction": "let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;let t=gax(\"//div[div[contains(@class,'content-body')]]\");if(t.length>10){t[0].remove()}",
        "pageBar": 0,
        "css": ".chaptera,#pccontent_tip{display:none!important}"
    },
    {
        "name": "乐文小说网 - 分類",
        "example": "http://www.lewenlou.org/list/1-1.html",
        "url": "^https?://www\\.lewenlou\\.org/list/",
        "nextLink": "li.active+li>a",
        "pageElement": "//div[@class='panel-body'][div[contains(@class,'col-sm-index')]]",
        "replaceElement": ".pagination",
        "rate": 3,
        "pageBar": 0
    },
    {
        "name": "69書吧 - 書籍分類",
        "example": "https://www.69shu.com/top/0.htm",
        "url": "^https?://www\\.69shu\\.com/top/",
        "nextLink": "0"
    },
    {
        "name": "次元姬小说 - 閱讀",
        "example": "https://www.ciyuanji.com/chapter/5077_2227754.html",
        "url": "^https?://www\\.ciyuanji\\.com/chapter/\\w+\\.htm",
        "history": 2,
        "nextLink": "//a[button[text()='下一章']]",
        "pageElement": "[class^=chapter_title],[class^=chapter_list],[class^=chapter_article]",
        "replaceElement": "head>title,[class^='chapter_footer']",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('[class^=chapter_title]');let t=gae('[class^=chapter_article]');let l=gae('[class^=chapter_list]');if(t.length>10){h[0].remove();t[0].remove();l[0].remove()}",
        "pageBar": 0,
        "css": "[class^=chapter_article]+[class^=chapter_title]{padding-top:0px!important}"
    },
    {
        "name": "轻小说文库 - 閱讀",
        "example": "https://www.wenku8.net/novel/1/1973/69567.htm",
        "url": "^https?://www\\.wenku8\\.net/novel/\\d+/\\d+/\\d+\\.htm",
        "pinUrl": true,
        "init": "document.querySelectorAll('#contentmain>[id^=adv]').forEach(e=>{e.remove()})",
        "action": 1,
        "history": 2,
        "nextLink": "//a[text()='下一页' or text()='下一頁' and contains(@href,'.htm')]",
        "pageElement": "#title,#content",
        "replaceElement": "head>title,#footlink",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('#title');let t=gae('#content');if(t.length>10){h[0].remove();t[0].remove()}",
        "pageBar": 0
    },
    {
        "name": "稷下書院 - 閱讀",
        "example": "https://www.novel543.com/1004298677/8001_1.html",
        "url": "^https?://www\\.novel543\\.com/\\d+/\\w+\\.html",
        "history": 2,
        "init": "let ge=e=>document.querySelector(e);let h=ge('h1');h.innerText=h.innerText.split('-')[1].trim();let c=ge('.content');c.innerHTML=c.innerHTML.replace(/[^\\u4e00-\\u9fa5]+(<br>)?/,'<br>').replace(/[^\\u4e00-\\u9fa5]+$/,'');let ad=ge('.gadBlock,.adBlock');if(ad){ad.remove()}c.innerHTML=c.innerHTML.replace(/<br><br>/g,'<br>');",
        "nextLink": "//a[text()='下一章' and not(contains(@href,'end'))]",
        "pageElement": "h1,.content",
        "replaceElement": "head>title,.is-active,.foot-nav",
        "pageInit": "let ge=e=>doc.querySelector(e);let h=ge('h1');h.innerText=h.innerText.split('-')[1].trim();let c=ge('.content');c.innerHTML=c.innerHTML.replace(/[^\\u4e00-\\u9fa5]+(<br>)?/,'<br>').replace(/[^\\u4e00-\\u9fa5]+$/,'');let ad=ge('.gadBlock,.adBlock');if(ad){ad.remove()}c.innerHTML=c.innerHTML.replace(/<br><br>/g,'<br>');",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('amp-addthis').forEach(e=>{e.remove()});let h=gae('h1');let t=gae('.content');if(t.length>10){h[0].remove();t[0].remove()}",
        "pageBar": 0,
        "css": ".gadBlock,.adBlock{display:none!important}#read h1{padding:20px 0 0px!important}"
    },
    {
        "name": "稷下書院 - 分類",
        "example": "https://www.novel543.com/bookstack/",
        "url": "^https?://www\\.novel543\\.com/",
        "nextLink": ".next>a",
        "pageElement": ".layui-row>li",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "天天看小說 - 顯示全部目錄",
        "example": "https://tw.ttkan.co/novel/chapters/yedemingmingshu-huishuohuadezhouzi",
        "url": "^https?://[^/]+/novel/chapters/",
        "include": [
            "//title[contains(text(),'天天看小說') or contains(text(),'天天看小说')]",
            "#button_show_all_chatper"
        ],
        "nextLink": "0",
        "autoClick": "#button_show_all_chatper"
    },
    {
        "name": "天天看小說 - 閱讀",
        "example": "https://tw.bg3.co/novel/pagea/yedemingmingshu-huishuohuadezhouzi_1.html",
        "url": "^https?://[^/]+/novel/pagea/[^.]+\\.html",
        "include": "//title[contains(text(),'天天看小說') or contains(text(),'天天看小说')]",
        "action": 1,
        "history": 2,
        "nextLink": ".next_page_links>a[href$='html']",
        "pageElement": ".title,.content",
        "replaceElement": "head>title,.prev_page,.next_page_links",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('amp-addthis').forEach(e=>{e.remove()});let h=gae('.title');let t=gae('.content');if(t.length>10){h[0].remove();t[0].remove()}",
        "pageBar": 0,
        "css": ".content>center{display:none!important}"
    },
    {
        "name": "小說狂人 - 閱讀",
        "example": "https://czbooks.net/n/ul6pe/ukcme",
        "url": "^https?://czbooks\\.net/n/\\w+/\\w+",
        "action": 1,
        "history": 2,
        "nextLink": "//a[text()='下一章']",
        "pageElement": ".name,.content",
        "replaceElement": "head>title,.container .chapter-nav,.main>.chapter-nav,#mm-5>.chapter-nav",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('.name');let t=gae('.content');if(t.length>10){h[0].remove();t[0].remove()}",
        "pageBar": 0
    },
    {
        "name": "小說狂人 - 書籍分類",
        "example": "https://czbooks.net/c/xuanhuan",
        "url": "^https?://czbooks\\.net/c/\\w+",
        "nextLink": ".nav.paginate>li.active+li>a",
        "pageElement": ".novel-list>.novel-item-wrapper",
        "replaceElement": ".nav.paginate",
        "pageBar": 0
    },
    {
        "name": "新笔下文学 - 手機版閱讀",
        "example": "https://www.bxwx.cc/112/112794/56123570.html",
        "url": "^https?://www\\.bxwx\\.cc/\\d+/\\d+/\\w+\\.html",
        "history": 2,
        "action": 1,
        "nextLink": "#pb_next",
        "pageElement": "#chaptername,#txt",
        "replaceElement": "head>title,.chapter-page-btn",
        "pageBar": 0
    },
    {
        "name": "新笔下文学 - 閱讀",
        "example": "https://www.bxwx.cc/112/112794/56123570.html",
        "url": "^https?://www\\.bxwx\\.cc/\\d+/\\d+/\\w+\\.html",
        "history": 2,
        "action": 1,
        "nextLink": "//a[contains(text(),'下一章')]",
        "pageElement": ".word_read>*:not(.read_btn)",
        "replaceElement": "head>title,.read_btn",
        "pageBar": 0
    },
    {
        "name": "笔下文学bixia - 閱讀",
        "example": "http://www.bixia.org/book/3726/9586349.html",
        "url": "^https?://www\\.bixia\\.org/book/\\d+/\\d+\\.html",
        "history": 2,
        "action": 1,
        "nextLink": "//a[contains(text(),'下一页')]|//a[contains(text(),'下一頁')]|//a[contains(text(),'下一章')]",
        "pageElement": ".chapter-name,#content",
        "replaceElement": "head>title,.g-content-nav",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let gx=x=>document.evaluate(x,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;setTimeout(()=>{let n=gx(\"//a[contains(text(),'下一章')]\");if(n){let l=gae('.chapter-name').length-1;gae('.chapter-name')[l].remove()}},0);setTimeout(()=>{let t=gae('.chapter-name');if(t.length>10){gae('.g-reader>*:not(.chapter-opt):nth-child(n+1):nth-child(-n+4)').forEach(e=>{e.remove()})}},1000)",
        "pageBar": 0,
        "css": ".chapter-name{font-size:20px!important;font-weight:bold!important;padding-top:10px;padding-bottom:10px;}"
    },
    {
        "name": "笔下文学bixia - 目錄",
        "example": "http://www.bixia.org/book/3726/",
        "url": "^https?://www\\.bixia\\.org/book/\\d+/",
        "nextLink": "//a[contains(text(),'下一页')]|//a[contains(text(),'下一頁')]",
        "pageElement": "#main .list>li",
        "replaceElement": ".pages",
        "pageBar": 0
    },
    {
        "name": "起點小說 - 閱讀",
        "example": "https://read.qidian.com/chapter/9r9u8W1evJUCpOPIBxLXdQ2/EKq5eZhajBtMs5iq0oQwLQ2/",
        "url": "^https?://read\\.qidian\\.com/chapter/",
        "history": 2,
        "nextLink": "#j_chapterNext:not(.disabled)",
        "pageElement": ".text-head,.read-content",
        "replaceElement": "head>title,.chapter-control.dib-wrap",
        "css": ".admire-wrap,.chapter-end-qrcode{display:none!important}",
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('.text-head');let t=gae('.read-content');if(t.length>10){h[0].remove();t[0].remove()}"
    },
    {
        "name": "起點小說 - 分類",
        "example": "https://www.qidian.com/finish/size5-update1/",
        "url": "^https?://www\\.qidian\\.com/(all|finish|rank|free)/(chanId|size|vip|sign|update|tag)?",
        "nextLink": "//li[a/@class='lbf-pagination-page  lbf-pagination-current']/following-sibling::li[1]/a[not(starts-with(@href,'javascript'))]",
        "pinUrl": true,
        "pageElement": "#book-img-text",
        "replaceElement": ".pagination",
        "pageBar": 0
    },
    {
        "name": "無限小說 - 閱讀",
        "example": "https://www.8book.com/read/125687/?312407",
        "url": "^https?://(www\\.)?8book\\.com/read/",
        "action": 1,
        "history": 2,
        "init": "setTimeout(()=>{let t=document.querySelector('#text');t.innerHTML=t.innerHTML.replace(/[<br>]{4}[⒏8８⒏⑧⑻ВbｂьＯσｏоοoＫkкｃсcｍmм．。·.]{9,10}/gi,'')},1000)",
        "nextLink": "span.next>a",
        "pageElement": "//div[div/@id='subtitle'] | id('text')",
        "waitElement": [
            "#text>br"
        ],
        "replaceElement": "//head/title | //div[@class='row mx-0 read_btn_gp']",
        "pageInit": "let t=doc.querySelector('#text');t.innerHTML=t.innerHTML.replace(/[<br>]{4}[⒏8８⒏⑧⑻ВbｂьＯσｏоοoＫkкｃсcｍmм．。·.]{9,10}/gi,'')",
        "pageAction": "function gax(x){let nodes=[];let results=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);let node;while(node=results.iterateNext()){nodes.push(node)}return nodes}gax(\"//*[contains(@class,'pagetual_pageBar')]\")[0].remove();let t=gax(\"//div[@id='text']\");let s=gax(\"//div[div/@id='subtitle']\");if(t.length>4){t[0].remove();s[0].remove()}",
        "css": "#text>br:nth-child(even){display:none!important}#subtitle{margin-bottom:0px!important}"
    },
    {
        "name": "無限小說 - 書籍分類",
        "example": "https://www.8book.com/booklists/update/",
        "url": "^https?://(www\\.)?8book\\.com/booklists/(update|newrelease|finish|list|\\d+)/",
        "nextLink": "li[onclick]+li>a",
        "pageElement": ".row>div.p-2",
        "replaceElement": ".row>li",
        "pageBar": 0
    },
    {
        "name": "UU看書 - 手機版 - 閱讀",
        "example": "https://t.uukanshu.com/read.aspx?tid=47854&sid=32186",
        "url": "^https?://(t|sj)\\.uukanshu\\.com/read\\.aspx",
        "init": "$('.ad_content').remove()",
        "action": 1,
        "history": 2,
        "nextLink": "#read_next",
        "pageElement": "#divContent > h3,#bookContent",
        "replaceElement": "head>title,#read-page>.rp-switch",
        "pageAction": "let gae=e=>document.querySelectorAll(e);gae('.pagetual_pageBar')[0].remove();let h=gae('h3');let t=gae('#bookContent');if(t.length>10){h[0].remove();t[0].remove()}gae('.ad_content')[0].remove()"
    },
    {
        "name": "UU看書手機版 - 列表(加載更多小說)",
        "example": "https://t.uukanshu.com/booklist.aspx?c=1",
        "url": "^https?://(t|sj)\\.uukanshu\\.com/(booklist|quanben|)\\.aspx",
        "loadMore": "#showMore"
    },
    {
        "name": "UU看書 - 閱讀",
        "example": "https://www.uukanshu.com/b/47854/32175.html",
        "url": "^https?://(www|tw)\\.uukanshu\\.com/b/",
        "action": 1,
        "history": 2,
        "nextLink": "#next",
        "pageElement": ".h1title,.contentbox",
        "replaceElement": "head>title,.fanye",
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('.h1title');let t=gae('#contentbox');if(t.length>10){h[0].remove();t[0].remove()}"
    },
    {
        "name": "UU看書 - 書籍列表",
        "example": "https://www.uukanshu.com/list/xuanhuan-1.html",
        "url": "^https?://(www|tw)\\.uukanshu\\.com/list/",
        "nextLink": "//a[text()='下一頁' or text()='下一页']",
        "pageElement": ".content.clearfix>span",
        "replaceElement": "#page",
        "pageBar": 0
    },
    {
        "name": "UU看書網uuks.org手機版 - 閱讀",
        "example": "https://m.uuks.org/b/59/731.html",
        "url": "^https?://m\\.uuks\\.org/b/",
        "action": 1,
        "history": 2,
        "nextLink": "#read_next",
        "pageElement": "#top,#bookContent",
        "replaceElement": "head>title,#read>.rp-switch,#read-page>.rp-switch",
        "css": "#read-page .iconback,#read-page .iconhome{display: none!important;}",
        "insert": "#read-page>.rp-switch",
        "insertPos": 1,
        "pageBar": 0
    },
    {
        "name": "UU看書網uuks.org - 閱讀",
        "example": "https://www.uuks.org/b/53487/668581.html",
        "url": "^https?://www\\.uuks\\.org/b/",
        "action": 1,
        "history": 2,
        "nextLink": "#next",
        "pageElement": ".h1title,#contentbox",
        "replaceElement": ".fanye",
        "insert": ".fanye",
        "insertPos": 1,
        "pageBar": 0,
        "pageAction": "let gae=e=>document.querySelectorAll(e);let h=gae('.h1title');let t=gae('#contentbox');if(t.length>10){h[0].remove();t[0].remove()}"
    },
    {
        "name": "愛下電子書 - 閱讀",
        "example": "https://tw.ixdzs.com/read/38804/p1.html",
        "url": "^https?://tw\\.ixdzs\\.com/read/\\d+/\\w+\\.html",
        "history": 2,
        "nextLink": "a.chapter-paging.chapter-next",
        "pageElement": "#page .page-content",
        "replaceElement": "head>title,.page-d.page-turn,.page-d-top,.read-next,.read-pre,.read-prog-info",
        "pageAction": "function gae(e){return document.querySelectorAll(e)}gae('.pagetual_pageBar')[0].remove();let t=gae('#page .page-content');if(t.length>10){t[0].remove()}",
        "css": ".page-content{margin-top:.16rem!important}.page-content h3{line-height:.20rem!important;font-size:.24rem!important;text-align:center!important}"
    },
    {
        "name": "愛下電子書 - 書籍列表",
        "example": "https://tw.ixdzs.com/sort/1/",
        "url": "^https?://tw\\.ixdzs\\.com/(sort|hot|end)/",
        "nextLink": "a.num.current+a",
        "pageElement": ".u-list",
        "replaceElement": "div.panel+div>.pagei",
        "pageBar": 0
    },
    {
        "name": "Discuz Archiver",
        "example": "https://bbs.yxfanfan.com/archiver/?fid-13.html，https://bbs.yxfanfan.com/archiver/?tid-225893.html",
        "url": "^https?://[^/]+/archiver/\\?(fid|tid)",
        "nextLink": "strong+a",
        "pageElement": "#content",
        "css": ".pagetual_pageBar{margin-bottom:0px!important}"
    },
    {
        "name": "Yandex",
        "url": "^https?://yandex\\.(com|ru)/search/",
        "pageElement": "#search-result>li",
        "pageElementCss": "content-visibility:visible"
    },
    {
        "name": "yandex web search mobile",
        "example": "https://yandex.com/",
        "url": "^https?://yandex\\.(com|ru)/",
        "include": ".Pager-More",
        "loadMore": ".Pager-More"
    },
    {
        "name": "yandex Images Video search mobile",
        "example": "https://yandex.com/",
        "url": "^https?://yandex\\.(com|ru)/",
        "include": ".more_direction_next",
        "loadMore": ".more_direction_next>button"
    },
    {
        "name": "google search mobile",
        "action": 0,
        "url": "^https://(?:www\\.)?google\\..*/search",
        "pageElement": "id('rso')/div|id('rso')/style",
        "insert": "//div[@role=\"progressbar\"]/following-sibling::a[@role=\"button\"]|id(\"extrares\")//span[count(a)>0]/span/following-sibling::a",
        "nextLink": 0,
        "loadMore": "div[role='progressbar']+a[role='button']"
    },
    {
        "name": "Google Search",
        "nextLink": [
            "id('pnnext')|id('navbar navcnt nav')//td[span]/following-sibling::td[1]/a|id('nn')/parent::a",
            "id('pnprev')|id('navbar navcnt nav')//td[span]/following-sibling::td[1]/a|id('nn')/parent::a"
        ],
        "pageElement": "id('rso')|id('center_col')/style[contains(.,'relative')][id('rso')]|id('search')/div/div/style[1]",
        "action": 1,
        "pageNum": "&start={10*($p-1)}",
        "pageBarTop": 55,
        "url": "^https?://[^./]+\\.google(?:\\.[^./]{2,3}){1,2}/(?:c(?:se|ustom)|search|webhp|m|#)",
        "replaceElement": "[role='navigation']>[role='presentation']",
        "css": "ol>li{display: inline-flex;}"
    },
    {
        "name": "Google cse",
        "nextLink": ".gsc-cursor-current-page+div",
        "pageElement": ".gsc-expansionArea>.gsc-result",
        "url": "^https://cse\\.google\\.com.*&gsc\\.q=",
        "wait": 2000
    },
    {
        "name": "Apphot",
        "url": "^https?://apphot\\.cc/",
        "pageElement": "section.container > div.content-wrap > div.content > article"
    },
    {
        "name": "Soccercatch shows",
        "url": "^https://www\\.soccercatch\\.com.*#shows",
        "nextLink": ".tabs-page[data-title=shows] .pagination-next",
        "init": "if(doc)doc.querySelector('[data-title=shows]').click();",
        "pageElement": ".show-item"
    },
    {
        "name": "16Personalities",
        "url": "^https://www\\.16personalities\\.com",
        "enable": 0
    },
    {
        "name": "Linux Tips, Tricks and Tutorials | Linuxize",
        "url": "^https://linuxize\\.com",
        "pageElement": ".post-list>.flex-wrap>section",
        "lazyImgSrc": "data-cfsrc"
    },
    {
        "name": "Vipergirls",
        "pageElement": "#threads,.posts",
        "url": "^https://vipergirls\\.to",
        "nextLink": [
            "a[rel='next']",
            "a[rel='prev']"
        ],
        "pageNum": "page{$p}$"
    },
    {
        "name": "linuxfromscratch",
        "url": "^https://www\\.linuxfromscratch\\.org",
        "pageElement": "body>*",
        "css": ".sect1{overflow-wrap: break-word;}div.navheader{position: relative;}"
    },
    {
        "name": "Standards DOC",
        "url": "\\.html$",
        "nextLink": ".header>p>[rel=next]",
        "pageElement": ".header~*"
    },
    {
        "name": "xda-developers",
        "url": "^https://forum\\.xda\\-developers\\.com/t/",
        "pageElement": ".block-body>article"
    },
    {
        "name": "Pixabay",
        "url": "^https://pixabay\\.com",
        "pageAction": "eles.forEach(ele=>{let media=ele.querySelector('div.media');let timer;media.onmouseenter=e=>{timer=setTimeout((function() {var mp4 = media.dataset.mp4, webm = media.dataset.webm ? mp4.rsplit(\".\", 1)[0] + \".webm\": \"\", mp4Source = '<source type=\"video/mp4\" src=\"'.concat(mp4, '\">'), webmSource = webm ?' <source type=\"video/webm\" src=\"'.concat(webm, '\">') : \"\", videoElement = '<video style=\"display:none\" onloadeddata=\"$(this).addClass(\\'playing\\').show();\" autoplay muted loop>'.concat(mp4Source, \"                                 \").concat(webmSource, \"</video>\");media.insertBefore($(videoElement)[0], media.firstChild)}), 300);};media.onmouseleave=e=>{clearTimeout(timer);if(media.firstChild.tagName==='VIDEO')media.removeChild(media.firstChild)};})",
        "pageElement": ".video-search-results>.row-masonry-cell",
        "nextLink": ".media_list>a.pure-button",
        "lazyImgSrc": "data-lazy"
    },
    {
        "name": "Bing",
        "action": 1,
        "url": "^https://.*\\.bing\\.com/",
        "nextLink": "a[title='Next page'],a.sb_pagN,a.sb_halfnext,a.sb_fullnpl",
        "pageElement": "ol#b_results>li.b_algo",
        "wait": "if(doc==document)return true;doc.documentElement.scrollTop=99999;return doc.querySelector('a[title=\\'Next page\\'],a.sb_pagN,a.sb_halfnext,a.sb_fullnpl')",
        "pageBar": "pageBar.className='b_pageBar'"
    },
    {
        "name": "Duckduckgo",
        "url": "^https://duckduckgo\\.com/\\?",
        "loadMore": ".result--more>a"
    },
    {
        "name": "F 搜",
        "url": "^https://fsoufsou\\.com/search",
        "nextLink": ".bottom-pagination-bar+.turn-page-btn",
        "pinUrl": true,
        "css": "svg{visibility: visible;}",
        "pageElement": "div.organic-results>div",
        "stopSign": [
            "",
            ".empty-result-container"
        ]
    },
    {
        "name": "gog",
        "action": 1,
        "url": "^https://www\\.gog\\.com/",
        "pageElement": "paginated-products-grid.ng-star-inserted",
        "nextLinkByUrl": [
            "(&page=(\\d+))?$",
            "&page={$2+1}"
        ],
        "pageAction": "[].forEach.call(eles, ele=>{[].forEach.call(ele.querySelectorAll('source[lazyload]'), source=>{source.setAttribute('srcset',source.getAttribute('lazyload'))})})"
    },
    {
        "name": "Pixiv",
        "url": "^https://www\\.pixiv\\.net/",
        "action": 2,
        "pageElement": "section>div>div>ul,section>div>ul,div.sc-l7cibp-0.juyBTC>*,div.sc-1eop7y7-0.cJYTWr>*",
        "nextLink": "a[class*='filterProps-Styled-Component']:last-child",
        "wait": 500,
        "fitWidth": false,
        "css": "@media (min-width: 1000px) {@supports (display:grid)  {.krFoBL { grid-template-columns: repeat(6, 184px); }}}"
    },
    {
        "name": "Z-Library",
        "url": "^https?://.*(1lib\\.(to|us|org)|z-lib\\.org|booksc\\.(org|eu)|bookfi\\.net|b\\-ok\\.(asia|africa)|1lib\\.pl|sg1lib\\.org|2lib\\.org|book4you\\.org)/s/",
        "pageElement": "#searchResultBox"
    },
    {
        "name": "Startpage",
        "url": "^https://www\\.startpage\\.com/",
        "pageElement": "section.w-gl>div.w-gl__result",
        "nextLink": "button.next",
        "action": 0
    },
    {
        "name": "图书书目检索",
        "url": "^https?://pcpt\\.nlc\\.cn/",
        "pageElement": "#content > div.list-panel.thelist > div.block > table.table",
        "nextLinkByJs": "let max=doc.querySelector(`.pagination>.result>b:nth-child(2)`),cur=doc.querySelector(`.pagination>.result>b:nth-child(3)`);let form=doc.querySelector('#fm_id'),params=[];if(!max||!cur||max.innerText==cur.innerText||!form)return null;let formData = new FormData(form); for (let [key, value] of formData) {params.push(key+'='+encodeURIComponent(value))};return form.action.replace(/\\?pageCount.*/,'')+'?pageCount='+(parseInt(cur.innerText) + 1)+'#p{'+params.join('&')+'}'"
    },
    {
        "name": "全國古籍普查登記基本數據庫",
        "url": "^https?://202\\.96\\.31\\.78/",
        "pageElement": "body > div.wrap > div#side.list > div.item",
        "nextLinkByJs": "let n=doc.querySelector('[title=\"Next Page\"]');if(!n)return;let params=n.getAttribute('onclick').match(/JavaScript:toUrl\\('(.*)',(\\d+)\\);/);let temp=params[1];let index=params[2];if(temp.indexOf('&cGFn')!=-1)temp=temp.substring(0,temp.indexOf('&cGFn'));let code=window.btoa('page='+index);return temp+'&'+code;"
    },
    {
        "name": "Search Getty Images",
        "url": "^https://www\\.gettyimages\\.ie",
        "nextLink": "button[title='Next page']",
        "pageElement": "[data-testid=galleryMosaicAsset]"
    },
    {
        "name": "IMHentai",
        "url": "^https://imhentai\\.xxx",
        "pageElement": "#gimg",
        "nextLink": ".nav_next",
        "css": "#footer,#bar{display:none}.pre_img+.nav_pagination{bottom: 10px; position: fixed; width: 100%;left:0;}.return_btn{bottom: 0; position: fixed; width: 100%;left:0;}",
        "lazyImgSrc": 0
    },
    {
        "name": "Moebooru:Danbooru clones",
        "url": "^https?://(konachan\\.com|yande\\.re|www\\.sakugabooru\\.com)/(post|comment)($|\\?|#|/search\\?)",
        "pageElement": "//li[contains(@class, 'creator-id-')]|//div[@id='comment-list']/div[@class='post']|//table[@class='highlightable']",
        "nextLink": "//a[@class='next_page']",
        "css": ".javascript-hide { display: inline-block !important; }.pagetual_pageBar { display: inline-flex!important;width: 100%!important; }"
    },
    {
        "name": "developer.wordpress",
        "url": "^https://developer\\.wordpress\\.org/",
        "pageElement": "#primary>*",
        "nextLink": "[rel=next]"
    },
    {
        "name": "playstation",
        "action": 1,
        "css": ".psw-visually-hide{opacity:1!important}.pagetual_loading{display:none!important}[name='pagetual-iframe']{display:none}",
        "url": "^https://store\\.playstation\\.com/.*/\\d+$",
        "pageElement": "ul.psw-grid-list",
        "wait": "let img=doc.querySelector('ul.psw-grid-list img');return img!=null",
        "nextLinkByUrl": [
            "(.*/)(\\d+)$",
            "$1{$2+1}"
        ],
        "pageAction": "[].forEach.call(eles[0].querySelectorAll('[loading=lazy]'),img=>{img.src=img.src.replace('w=54&thumb=true','w=230&thumb=false');img.classList.remove('psw-blur')});"
    },
    {
        "name": "yande",
        "action": 0,
        "url": "^https://yande\\.re/",
        "pageElement": "ul#post-list-posts>li",
        "nextLink": "a.next_page",
        "css": ".javascript-hide {display: inline-block !important;}"
    },
    {
        "name": "Expreview",
        "url": "^https://www\\.expreview\\.com/",
        "loadMore": "span.load"
    },
    {
        "name": "goddessfantasy",
        "type": 0,
        "url": "^https://www\\.goddessfantasy\\.net/bbs/",
        "pageElement": "//div[@id='messageindex']|//form[@id='quickModForm']",
        "nextLink": "//div[@class='pagelinks']/a[text()='»']",
        "pinUrl": true
    },
    {
        "name": "哈啦區 - 巴哈姆特",
        "url": "^https?://forum\\.gamer\\.com\\.tw/(index|$)",
        "enable": 0
    },
    {
        "name": "COCOMANGA",
        "url": "^https?://www\\.cocomanga\\.com/",
        "pageElement": "body > div#mangalist.mh_mangalist",
        "action": 2
    },
    {
        "name": "古籍館 - 閲讀",
        "url": "^https?://(www\\.)?gujiguan\\.com/Book_View\\.aspx",
        "pageElement": "div#content > img#book"
    },
    {
        "name": "古籍館 - 檢索",
        "url": "^https?://(www\\.)?gujiguan\\.com/Search_Result\\.aspx",
        "pageElement": "#DataList1>tbody>tr",
        "wait": "let nv=doc.querySelector('#keyValue'),ov=document.querySelector('#keyValue');if(!nv||!ov)return false;if(nv.value==ov.value)return true;nv.value=ov.value;doc.querySelector('#sreach').click();doc.querySelector('#DataList1').innerHTML='';return false;",
        "refreshByClick": "#sreach"
    },
    {
        "name": "SkrBT",
        "url": "^https://skrbt",
        "pageElement": "ul.list-unstyled",
        "nextLinkByJs": "let form=doc.querySelector('#search-form'),params=[];if(!form)return null;[].forEach.call(form.querySelectorAll('input'),input=>{params.push(input.name+'='+(input.name=='p'?parseInt(input.value)+1:input.value))});return form.action+'?'+params.join('&')"
    },
    {
        "name": "Discuz! mobile postlist1",
        "url": ".",
        "pageElement": ".postlist>div[id^=pid]",
        "nextLink": ".page>#select_a+a:not([class])",
        "action": 1
    },
    {
        "name": "Discuz! mobile postlist2",
        "url": ".",
        "pageElement": ".bm:not(#postlist)>div[id^=post_],.bm:not(#postlist)>div[id^=post_]+div",
        "nextLink": "a.nxt",
        "action": 1
    },
    {
        "name": "bbsPostlist1",
        "url": ".",
        "nextLink": [
            "a.nxt",
            "a.prev"
        ],
        "pageNum": "\\-\\d+\\-{$p}\\-\\d+\\.html",
        "pageElement": "div#postlist>*",
        "replaceElement": ".pgt>div.pg"
    },
    {
        "name": "bbsPostlist2",
        "url": ".",
        "nextLink": ".page-item.active+.page-item>a",
        "pageElement": "ul.postlist>*",
        "replaceElement": "ul.pagination"
    },
    {
        "name": "bbsThreadlist1",
        "url": "/f",
        "nextLink": [
            "a.nxt",
            "a.prev"
        ],
        "pageNum": "\\-\\d+\\-{$p}\\.html",
        "pageElement": "div#threadlist form",
        "replaceElement": "#pgt div.pg"
    },
    {
        "name": "Discuz7.2Postlist",
        "url": "\\?tid",
        "nextLink": "a.next",
        "pageNum": "page={$p}",
        "pageElement": "div#postlist>*"
    },
    {
        "name": "Discuz7.2Threadlist",
        "url": "\\?fid",
        "nextLink": "a.next",
        "pageNum": "page={$p}",
        "pageElement": "div#threadlist form"
    },
    {
        "name": "chevereto",
        "url": ".",
        "nextLink": "a[data-pagination='next']",
        "pageAction": "let w=document.querySelector('.list-item').style.width;let content=eles[0].querySelector('.pad-content-listing');content.style.display='flex';content.style.flexFlow='row wrap';[].forEach.call(eles[0].querySelectorAll('.list-item'),i=>{i.style.display='block';i.style.width=w;i.style.position='sticky';i.querySelector('.list-item-image').style.height=w;})",
        "pageElement": "div#content-listing-tabs"
    },
    {
        "name": "FC Portables",
        "url": "^https://www\\.fcportables\\.com",
        "pageElement": ".listing-blog>article",
        "pageAction": "eles.forEach(e=>{let a=e.querySelector('.img-holder');if(!a)return;a.style.backgroundImage=`url(\"${a.dataset.src}\")`;a.classList.add('b-loaded')})"
    },
    {
        "name": "1688全部商品页",
        "url": "^https://.*\\.1688\\.com/page",
        "pageElement": "#bd_1_container_0 > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(6) > div",
        "pageAction": "window.setUrl=null;window.index=0;eles.forEach(e=>{let img=e.querySelector('.main-picture[src^=data]');if(!img)return;img.src=img.nextElementSibling.children[0].src;e.onclick=()=>window.open(e.dataset.url,'_blank')})",
        "pageInit": "if(!window.index)window.index=0;if(!window.setUrl){window.setUrl=()=>{setTimeout(()=>{if(window.url){eles[window.index++].dataset.url=window.url;window.url=null;}if(eles[window.index]){eles[window.index].click();window.setUrl()}},1)};Object.defineProperty(doc.defaultView, 'open', { get: function () { return (s)=>window.url=s; } });window.setUrl();}if(eles.length<=window.index)return true;else return false;"
    },
    {
        "name": "blog1",
        "url": ".",
        "pageElement": "section.posts-expand>article.post",
        "nextLink": "li.pagination-active+li>a",
        "css": "section.posts-expand>article.post{opacity:1}"
    },
    {
        "name": "AfreecaTV 搜索",
        "url": "^https?://afreecatv\\.com/total_search",
        "pageElement": "ul#detailVideoPageList>li",
        "nextLink": ".pg_area>em+a",
        "wait": 500,
        "replaceElement": ".pg_area"
    },
    {
        "name": "Baidu",
        "insertPos": 1,
        "nextLink": [
            "//*[@id=\"page\"]/div/a[contains(text(),'下')]",
            "//*[@id=\"page\"]/div/a[contains(text(),'上')]"
        ],
        "pageElement": "//*[@id=\"content_style\"]|//*[@id=\"content_left\"]/*",
        "pageNum": "&pn={10*($p-1)}",
        "url": "^https?://www\\.baidu\\.com/(s|baidu)\\b.",
        "pageBarTop": 75,
        "replaceElement": "#page",
        "wait": 500
    },
    {
        "name": "手机百度",
        "url": "^https://(m|www|wap)\\.baidu\\.com/",
        "nextLink": "a.new-nextpage-only,a.new-nextpage",
        "pageElement": "#results"
    },
    {
        "name": "百度贴吧列表",
        "action": 1,
        "pageBar": "pageBar.classList.add('j_thread_list');pageBar.dataset.field='{}'",
        "url": "^https?://tieba\\.baidu\\.com/.+",
        "pageElement": "ul#thread_list>li",
        "pageNum": "&pn={50*($p-1)}",
        "nextLink": ".next.pagination-item "
    },
    {
        "name": "百度贴吧看贴",
        "pageBar": "pageBar.classList.add('l_post')",
        "nextLink": "//div[@class=\"pb_footer\"]//a[starts-with(text(), '下一页')]",
        "pageElement": "//div[@class=\"p_postlist\"]/div[starts-with(@class, 'l_post')]",
        "type": 0,
        "action": 1,
        "pageNum": "&pn={$p}",
        "url": "^https?://tieba\\.baidu\\.com/p/.+",
        "wait": "if(doc==document)return true;let lzl=doc.querySelector('div.hideLzl');if(lzl){var actualTop=lzl.offsetTop;var current=lzl.offsetParent;while(current!==null){actualTop+=current.offsetTop;current=current.offsetParent;}doc.body.scrollTop=actualTop;doc.documentElement.scrollTop=actualTop;return false}else{return true}",
        "history": 0
    },
    {
        "name": "搜狗wap",
        "url": "^https?://wap\\.sogou\\.com/web/(searchList\\.jsp|sl\\?)",
        "loadMore": "#ajax_next_page",
        "nextLink": 0
    },
    {
        "name": "Camp Firefox Forum",
        "url": "^https://www\\.camp-firefox\\.de/forum/ungelesene-beitraege/",
        "pageElement": "#content > div > ol.tabularList",
        "nextLink": "nav.pagination > ul > li.skip:last-child > a",
        "updatedAt": "2022-09-10",
        "author": "benzBrake"
    },
    {
        "name": "秀人网",
        "url": "^https://www\\.(?:imn5|mntp|jpmnb|jpmn8|mn5|xgmn|jpxgmn|jpxgyw|xiurenji|xiurenb|xrmn|xrmn5)\\.(?:com|net|vip|cc|top)/.*\\.html",
        "pageElement": "p>img",
        "author": "bmp4cwa"
    },
    {
        "name": "美女图123",
        "url": "^https://(www|m)\\.meinvtu123\\.cc/",
        "pageElement": "div>img",
        "author": "bmp4cwa"
    },
    {
        "name": "雪球",
        "url": "^https://xueqiu\\.com/",
        "pageElement": ".status-list>article",
        "nextLink": "a.pagination__next"
    },
    {
        "name": "行情 - 雪球",
        "url": "^https?://xueqiu\\.com/hq",
        "pageElement": "div#stockList table.portfolio",
        "pinUrl": true,
        "action": 3
    },
    {
        "name": "中国知网",
        "url": "^https://kns\\.cnki\\.net/kns8/defaultresult/index",
        "nextLink": "a#PageNext",
        "pageElement": ".result-table-list tbody>*",
        "init": "if(doc){let fn1=window.BriefExtend.setFullTextState;window.BriefExtend.setFullTextState=()=>{fn1();win.$('#PageNext').attr('data-curPage',window.$('#PageNext').attr('data-curPage'))}; win.BriefParam._getSearchPaperArgModel=(isSearch, cPage)=>{return window.BriefParam._getSearchPaperArgModel(isSearch, (!!cPage ? cPage : win.BriefParam._getCurPage()))};doc.querySelector('#txt_search').value=document.querySelector('#txt_search').value;doc.querySelector('.search-btn').click()}",
        "initRun": 0,
        "wait": 1000
    },
    {
        "name": "图怪兽",
        "url": "^https://818ps\\.com/",
        "pageElement": "#masonry"
    },
    {
        "name": "创客贴",
        "url": "^https://www\\.chuangkit\\.com/",
        "type": 0,
        "nextLink": "//div[@class='number']/ul/li[@class='item active']/following-sibling::li/a",
        "pageElement": "//div[@class='ckt-waterfall-content']",
        "pageAction": "let infos=doc.querySelector('body>script').innerText.match(/designTemplateId:\\d+,designTemplateImageUrl:\".*?\"/g),infoMap;if(infos){infoMap={};infos.forEach(i=>{let id=i.replace(/designTemplateId:(\\d+).*/,'$1');let src=i.replace(/.*designTemplateImageUrl:\"(.+)\"/,'$1');src=JSON.stringify(src);src=src.replace(/\\\\\\\\/g,'\\\\');src=JSON.parse(src);infoMap[id]=src;})};[].forEach.call(eles[0].querySelectorAll('.temp-sec__bottom>div>a'),a=>{let id=a.href.replace(/.*?(\\d+).*/,'$1');let src=infoMap[id];let img=a.parentNode.parentNode.previousElementSibling.querySelector('img');img.src=src;img.style.opacity=1;})"
    },
    {
        "name": "水木桌面端",
        "url": "^https://www\\.mysmth\\.net/nForum/#!article/",
        "nextLink": "a[title='下一页']",
        "pageElement": "div.b-content"
    },
    {
        "name": "水木移动端",
        "url": "^https://m\\.mysmth\\.net/article/",
        "pageElement": "#m_main>ul.list"
    },
    {
        "name": "汽车之家",
        "url": "^https://club\\.autohome\\.com\\.cn",
        "pageElement": "#js-reply-list-container",
        "action": 2,
        "nextLink": ".athm-page__next"
    },
    {
        "name": "煎蛋吐槽",
        "url": "^https?://jandan\\.net/",
        "nextLink": "a.previous-comment-page",
        "pageElement": "ol.commentlist>li",
        "pageAction": "let gif_click_load = getCookie('gif-click-load');let bad_click_load = getCookie('bad-click-load');let nsfw_click_load = getCookie('nsfw-click-load');let gif_on = (gif_click_load == 'on' || gif_click_load == null) ? true : false;let nsfw_on = (nsfw_click_load == 'on' || nsfw_click_load == null) ? true : false;let bad_on = (bad_click_load == 'on' || bad_click_load == null) ? true : false;[].forEach.call(eles, e => { let tucao = e.querySelector('a.tucao-btn'); if (tucao) tucao.onclick = e => { var n = $(e.currentTarget); var m = n.data('id'); var o = n.closest('li'); var l = o.find('div.jandan-tucao'); if (l.length) { l.slideToggle('fast') } else { tucao_load_content(o, m) } }; e=$(e);var is_bad = false; if (bad_on) { var oo = parseInt(e.find('.comment-like').next('span').text()); var xx = parseInt(e.find('.comment-unlike').next('span').text());if ( (oo + xx) >= 50 && (oo / xx) < 0.618 ) {is_bad = true;var r = e.find(\"p\").not('.bad_content');r.hide();e.find('.righttext').after('<p class=\"bad_content\" style=\"color:#ddd\">因不受欢迎已被超载鸡自动隐藏.<a href=\"javascript:;\" class=\"view_bad\">[手贱一回]</a></p>');e.find(\".view_bad\").click(function () {if (this.innerHTML == '[手贱一回]' || this.innerHTML == '[再手贱一回]') {r.show();if (this.innerHTML == '[手贱一回]') {r.find('.gif-mask').remove();r.find('img').each(function() {var org_src = this.getAttribute('org_src');if (org_src)this.src = org_src;});}this.innerHTML = '[真不该手贱]';} else {r.hide();this.innerHTML = '[再手贱一回]';}});}}if ( ! is_bad && nsfw_on) {var p = e.find(\"p\").not('.bad_content');if (p.length == 0) return;let content = p.html();if (content.indexOf('NSFW') > -1) {p.hide();e.find('.righttext').after('<p class=\"nsfw_content\" style=\"color:#ff6600\">此图被标记为<b>NSFW</b>被超载鸡自动隐藏.<a href=\"javascript:;\" class=\"view_nsfw\">[旁边没人]</a></p>');e.find(\".view_nsfw\").click(function () {if (this.innerHTML == '[旁边没人]' || this.innerHTML == '[旁边还是没人]') {p.show();p.find('.gif-mask').remove();if (this.innerHTML == '[旁边没人]') {p.find('img').each(function() {var org_src = this.getAttribute('org_src');if (org_src)this.src = org_src;});}this.innerHTML = '[看完了，擦键盘]';} else {p.hide();this.innerHTML = '[旁边还是没人]';}});}}let img=e.find('p>img');if(img){img.css('max-width', '100%');img.css('max-height', '450px').click(function () {var $this = img;if ($this.css('max-height') == 'none') {var max_width = img.parent().parent().width();$this.css('max-width', max_width);$this.css('max-height', '450px');} else {if ($this.parent().hasClass('acv_comment'))$this.css('max-width', 'none');$this.css('max-height', 'none');}$(\"html,body\").animate({scrollTop: $this.offset().top - 40},325);});}})"
    },
    {
        "name": "xxgame",
        "action": 0,
        "url": "^http://www\\.xxgame\\.net/chinese",
        "pageElement": "div.layui-row>div.layui-col-md4:not(div:nth-child(5),div:nth-child(6),div:nth-child(7))",
        "nextLinkByUrl": [
            "(http://www\\.xxgame\\.net/chinese/?)(?:\\?page=|$)(\\d*)",
            "$1?page={($2.0||1)+1}"
        ]
    },
    {
        "name": "斗鱼",
        "url": "^https://www\\.douyu\\.com/directory/",
        "nextLink": "li.dy-Pagination-next[aria-disabled='false']",
        "pageElement": "ul.layout-Cover-list",
        "wait": 1000,
        "enable": 0
    },
    {
        "name": "Literotica",
        "type": 0,
        "action": 0,
        "url": "^https://www\\.literotica\\.com/.",
        "pageElement": "//div[contains(@class,\"panel article\") or @class=\"b-story-list\"]/div",
        "nextLink": "//a[@title='Next Page' or @class='b-pager-next']",
        "wait": 3000
    },
    {
        "name": "站酷",
        "url": "^https://www\\.zcool\\.com\\.cn/search/content",
        "action": 2,
        "nextLinkByUrl": [
            "(.*/content\\?&?word=[^&]+)(?:&page=|$)(\\d*)",
            "$1&page={($2.0||1)+1}"
        ]
    },
    {
        "name": "masuit",
        "action": 0,
        "url": "^https://masuit\\.com/",
        "pageElement": ".ibox.wow",
        "nextLink": "a[aria-label=Next]"
    },
    {
        "name": "佛弟子文库",
        "url": "^https?://www\\.fodizi\\.net/",
        "nextLink": "a.current+a",
        "pageElement": "div.wrap>*:not(.page)"
    },
    {
        "name": "动漫之家",
        "action": 1,
        "url": "^https?://(www|manhua)\\.(dmzj|178)\\.com/.*/\\d+\\.s?html",
        "nextLink": "a.btm_chapter_btn.fr",
        "pageElement": "div.comic_wraCon",
        "init": "let imgCon=document.querySelector('div.comic_wraCon'),ops=document.querySelectorAll('option');imgCon.innerHTML='';[].forEach.call(ops,op=>{let img=document.createElement('img');img.src=op.value;imgCon.appendChild(img)})",
        "pageInit": "let imgCon=eles[0],ops=doc.querySelectorAll('option');imgCon.innerHTML='';[].forEach.call(ops,op=>{let img=document.createElement('img');img.src=op.value;imgCon.appendChild(img)})"
    },
    {
        "name": "smzdm",
        "action": 0,
        "url": "^https://.*\\.smzdm\\.com",
        "pageElement": "ul#feed-main-list>li",
        "nextLink": ".pagenation-list>li.current+li>a",
        "insert": "ul#feed-main-list",
        "insertPos": 2
    },
    {
        "name": "mhgui",
        "action": 0,
        "url": "^https://.*\\.mhgui\\.com/comic/\\d+",
        "pageElementByJs": "let link=document.querySelector('#mangaBox>img').src; let match=link.match(/(.*)(\\d{3})(\\.jpg.*)/); window.i=window.i||parseInt(match[2]);window.i++; let src=match[1]+(window.i>99?window.i:(window.i>9?'0'+window.i:'00'+window.i))+match[3]; let img=document.createElement('img');img.onload=()=>{over([img])};img.onerror=e=>{over()};img.src=src;",
        "insert": "#mangaBox",
        "insertPos": 2
    },
    {
        "name": "manga1000",
        "url": "^https://manga1000\\.top/\\d+/\\d+",
        "pageElement": "div.chapter-content>*",
        "css": ".chapter-content>img{display:unset!important}",
        "nextLink": "ul.chapter_select a.next"
    },
    {
        "name": "javdb",
        "action": 0,
        "url": "^https://javdb\\.com/",
        "pageElement": "#videos.video-container",
        "css": ".grid.columns{display: flex; flex-wrap: wrap;}"
    },
    {
        "name": "喜马拉雅",
        "url": "^https://www\\.ximalaya\\.com/",
        "nextLink": ".page-next>a",
        "wait": 1000,
        "action": 2,
        "pageElement": ".list-container,.main-content"
    },
    {
        "name": "方正字库",
        "url": "^https://www\\.foundertype\\.com/",
        "nextLink": "#page>a.on+a",
        "pageElement": "#fonPar,#chinese_ft1",
        "action": 1
    },
    {
        "name": "Trakt",
        "url": "^https://trakt\\.tv",
        "pageElement": "section#info-wrapper > div.container > div.row > div#overview>*",
        "action": 1,
        "waitElement": [
            ".summary-activity",
            "#popular-comments.fade:not(.in)"
        ]
    },
    {
        "name": "北邮人论坛",
        "url": "bbs\\.byr\\.cn(|/(|#!)default)$",
        "listenHashChange": true,
        "pinUrl": true
    },
    {
        "name": "北邮人论坛-版块",
        "url": "bbs\\.byr\\.cn/(|#!)board",
        "listenHashChange": true,
        "pageElement": ".b-content> table>tbody",
        "pinUrl": true,
        "history": 0,
        "action": 1
    },
    {
        "name": "北邮人论坛-帖子内",
        "url": "bbs\\.byr\\.cn/(|#!)article",
        "listenHashChange": true,
        "pageElement": ".b-content",
        "replaceElement": ".page",
        "pinUrl": true,
        "history": 0,
        "action": 1
    },
    {
        "name": "北大未名BBS-版块",
        "url": "bbs\\.pku\\.edu\\.cn/v2/thread.php",
        "pageElement": "#list-content",
        "nextLink": "//div[contains(text(),'下一页')]/a",
        "replaceElement": ".paging"
    },
    {
        "name": "北大未名BBS-帖子内",
        "url": "bbs\\.pku\\.edu\\.cn/v2/post-read.php",
        "pageElement": ".card-list",
        "nextLink": "//div[contains(text(),'下一页')]/a",
        "replaceElement": ".paging"
    },
    {
        "name": "bilibili search",
        "action": 1,
        "url": "^https://search\\.bilibili\\.com",
        "pageElement": "ul>li.video-item,div.video-list.row>*",
        "nextLinkByUrl": [
            "(.*keyword=.*?)(?:&page=|$)(\\d*).*",
            "$1&page={($2.0||1)+1}"
        ],
        "sandbox": false,
        "wait": "return doc.querySelector('.bili-video-card__wrap')"
    },
    {
        "name": "bilibili space",
        "url": "^https://space\\.bilibili\\.com/",
        "sandbox": false,
        "pageElement": "ul.cube-list>li,ul.video-list>li",
        "nextLink": ".be-pager-next,.next-page",
        "wait": 1000
    },
    {
        "name": "动漫屋1",
        "action": 1,
        "url": "^https?://www\\.(dm5|1kkk)\\.(com|cn)/(m|ch)",
        "pageElement": ".view-main>.item",
        "nextLink": "span.current+a,div#chapterpager+a+a",
        "rate": 3
    },
    {
        "name": "动漫屋2",
        "action": 1,
        "type": 0,
        "url": "^https?://www\\.(dm5|1kkk)\\.(com|cn)/(m|ch)",
        "pageElement": "//div[@id=\"barChapter\"]/img",
        "nextLink": "//div[@class=\"view-paging\"]/div/a[contains(text(),'下一')]",
        "rate": 3
    },
    {
        "name": "异次元",
        "url": "^https://www\\.iplaysoft\\.com/",
        "pageElement": "#postlist",
        "nextLink": ".pagenavi>a[title='下一页']"
    },
    {
        "name": "魂+",
        "url": "^https?://((www\\.|bbs\\.)?(south|north|level|white|soul|snow|east|spring|summer|blue)-plus.(net|org)|bbs.imoutolove.me)/",
        "action": 1,
        "sleep": 1000
    },
    {
        "name": "魂+阅读页",
        "url": "^https?://((www\\.|bbs\\.)?(south|north|level|white|soul|snow|east|spring|summer|blue)-plus.(net|org)|bbs.imoutolove.me)/",
        "action": 1,
        "type": 0,
        "pageElement": "//div[@id='main']/form",
        "nextLink": "//div[@class='pages']/ul/li[.//b]/following-sibling::li/a",
        "sleep": 1000,
        "pageNum": "page-{$p}.html"
    },
    {
        "name": "魂+列表页",
        "url": "^https?://((www\\.|bbs\\.)?(south|north|level|white|soul|snow|east|spring|summer|blue)-plus.(net|org)|bbs.imoutolove.me)/",
        "action": 1,
        "type": 0,
        "pageElement": "//tr[@align='center']",
        "nextLink": "//div[@class='pages']/ul/li[.//b]/following-sibling::li/a",
        "sleep": 1000,
        "pageNum": "page-{$p}.html"
    },
    {
        "name": "动漫啦",
        "url": "^https://www\\.dongman\\.la/manhua/chapter/",
        "pageElement": ".chapter-images img",
        "nextLink": ".mdui-bottom-nav>a+a",
        "init": "let is=document.querySelectorAll('.chapter-images img'),j=document.querySelector('.lazyBox');is.forEach(i=>{i.src=i.dataset.srcset;j.appendChild(i);})",
        "pageAction": "let j=document.querySelector('.lazyBox');eles.forEach(i=>{i.src=i.dataset.srcset;})",
        "insert": ".lazyBox",
        "insertPos": 2
    },
    {
        "name": "bookmarkearth",
        "action": 0,
        "url": "^https://www\\.bookmarkearth\\.com(?:/?$|/page\\?currentPage=)",
        "pageElement": ".source>.document-piece",
        "nextLinkByUrl": [
            "(.*\\.com)(?:/?$|/page\\?currentPage=)(\\d*)",
            "$1/page?currentPage={($2.0||1)+1}"
        ]
    },
    {
        "name": "音范丝",
        "action": 1,
        "url": "^https://www\\.yinfans\\.me/",
        "pageElement": "#post_container",
        "nextLink": "a.next",
        "waitElement": [
            "#post_container[style]"
        ]
    },
    {
        "name": "bookmarkearth search",
        "action": 0,
        "url": "^https://www\\.bookmarkearth\\.com/s/search\\?q=",
        "pageElement": ".source>.document-piece",
        "nextLinkByUrl": [
            "(.*/s/search\\?q=.*&currentPage=)(\\d*)",
            "$1{$2+1}"
        ]
    },
    {
        "name": "深圳人社局通知公告",
        "action": 0,
        "url": "^http://hrss\\.sz\\.gov\\.cn/tzgg",
        "pageElement": ".newsList>ul",
        "nextLink": "a.next"
    },
    {
        "name": "什么值得买社区",
        "action": 0,
        "url": "^https://post\\.smzdm\\.com/p",
        "pageElement": "#comment",
        "nextLink": ".pagedown>a"
    },
    {
        "name": "51元素",
        "action": 1,
        "url": "^https://www\\.51yuansu\\.com",
        "pageElement": ".f-content",
        "nextLink": "a.nextpage"
    },
    {
        "name": "Asian Sister",
        "url": "^https://asiansister\\.com/",
        "pageElement": "div.itemBox,div.itemBox_video"
    },
    {
        "name": "小说站1",
        "type": 0,
        "nextLink": "//a[contains(text(),'下一页')]|//a[contains(text(),'下一頁')]|//a[contains(text(),'下一章')]",
        "pageElement": "//div[@id='content']|//div[@id='chaptercontent']|//div[@id='BookText']",
        "url": "\\d+/[\\d_-]+\\.html?$",
        "pageBarText": 1
    },
    {
        "name": "小说站2",
        "type": 0,
        "nextLink": "//a[contains(text(),'下一页')]|//a[contains(text(),'下一頁')]|//a[contains(text(),'下一章')]",
        "pageElement": "//div[@class='content']|//div[@class='chaptercontent']",
        "url": "\\d+/[\\d_-]+\\.html?$",
        "pageBarText": 1
    },
    {
        "name": "晋江文学城",
        "url": "^http://www\\.jjwxc\\.net",
        "pageElement": "div.noveltext,#lockpage",
        "pageBarText": 1
    },
    {
        "name": "厚海网",
        "url": "^http://www\\.houhaiwang\\.com",
        "pageElement": ".col-a1>.row-b7",
        "pageBarText": 1,
        "nextLink": ".col-d3>span>a"
    },
    {
        "name": "17K小说网_免费章节",
        "url": "^https://www\\.17k\\.com",
        "pageElement": ".area>.read,.area>.comment",
        "css": ".infoPath,.read_tit,.rightSide,.tuijian{display:none}.readAreaBox{width:auto}",
        "pageBarText": 1,
        "nextLink": ".nextChapter"
    },
    {
        "name": "17K小说网_付费章节",
        "url": "^https://www\\.17k\\.com",
        "pageElement": ".Context>.Article",
        "pageBarText": 1,
        "action": 1,
        "nextLink": ".nextChapter",
        "wait": "return doc.querySelector('.copy')==null",
        "include": "div.content"
    },
    {
        "name": "netflav",
        "url": "^https://netflav\\.com/",
        "pageElement": ".video_grid_container>.grid_root",
        "nextLink": "#general-pagination>div>a[aria-current='true']+a",
        "waitElement": [
            "a[aria-current='true']+a",
            "div.lazyload-placeholder,.grid_cover.image:not(.fadeIn)"
        ]
    },
    {
        "name": "版主小说",
        "url": "/\\d+/\\d+/\\d+\\.html",
        "pageElement": "div.page-content",
        "nextLinkByJs": "let next=doc.querySelector('a.curr+a');if(next)return next.href.replace(/^javascript:.*\\('\\d+','\\d+','(\\d+)','(\\d+)'\\);/,'$1_$2.html');",
        "action": 2
    },
    {
        "name": "纵横中文网手机版",
        "url": "^https://m\\.zongheng\\.com/h5/chapter",
        "type": 0,
        "pageElement": "//div[@class='title']|//div[@class='text']",
        "nextLink": "//div[contains(text(),'下一页')]|//div[contains(text(),'下一章')]",
        "wait": 500,
        "css": ".text>div,#fukerr_bot,#fukerr{display:none!important}",
        "pageBarText": 1
    },
    {
        "name": "Yurifans",
        "url": "^https://yuri\\.website/[a-z]",
        "type": 0,
        "action": 1,
        "pageElement": "id('post-list')/ul",
        "nextLink": "//div[@class='btn-pager']/button[text()='❯']",
        "wait": "500",
        "include": "id('post-list')/ul/li"
    },
    {
        "name": "拷貝漫畫",
        "url": "^https://copymanga\\.org/comic/.*/chapter/",
        "pageElement": "ul.comicContent-list>li",
        "nextLink": ".comicContent-next>a",
        "action": 1,
        "insert": "ul.comicContent-list",
        "insertPos": 2,
        "wait": "if(doc==document)return true;let sy=doc.defaultView.scrollY;let cur=doc.querySelector('.comicIndex').innerText;let max=doc.querySelector('.comicCount').innerText;if(window._cur==cur){doc.defaultView.scroll(0, 0);window._cur='';}else{doc.defaultView.scroll(0, sy+9999999);window._cur=cur;}return cur==max;"
    },
    {
        "name": "Hacker News",
        "action": 0,
        "url": "^https?://news\\.ycombinator\\.com/",
        "pageElement": "table.itemlist>tbody>tr",
        "nextLink": "a.morelink"
    },
    {
        "name": "ekşi sözlük",
        "action": 0,
        "url": "^https://eksisozluk\\.com",
        "pageElement": "#entry-item-list",
        "nextLinkByJs": "let pager=doc.querySelector('.pager');if(!pager || pager.dataset.currentpage==pager.dataset.pagecount)return null;else return location.href.replace(/&p=\\d+/,'')+'&p='+(parseInt(pager.dataset.currentpage)+1)"
    },
    {
        "name": "参考消息手机版",
        "action": 1,
        "url": "^http://m\\.cankaoxiaoxi\\.com/",
        "pageElement": "div.content",
        "nextLink": "li.next>a"
    },
    {
        "name": "58pic",
        "url": "^https://www\\.58pic\\.com/tupian/",
        "css": ".card-lazy{display:none}.pagetual_pageBar{margin-bottom: 20px!important;}",
        "pageElement": "div.search-v3-content>.card-grid-box"
    },
    {
        "name": "千库网",
        "url": "^https://588ku\\.com/",
        "action": 1,
        "pageElement": ".data-box>.data-list"
    },
    {
        "name": "Freepik",
        "url": "^https?://www\\.freepik\\.com/",
        "pageElement": "div.list-content > section.showcase",
        "action": 0,
        "css": ".showcase:not(.showcase--completed){display:flex;flex-wrap: wrap;}.showcase:not(.showcase--completed)>figure{visibility: visible;}.showcase:not(.showcase--completed)>div{display: none!important;}"
    },
    {
        "name": "中国大学MOOC课程评论区",
        "url": "^https://www\\.icourse163\\.org/course/",
        "action": 1,
        "wait": 1000,
        "type": 0,
        "init": "if(doc)doc.querySelector('#review-tag-button').click()",
        "nextLink": "//ul[@class='ux-pager']/li/a[text()='下一页']",
        "pageElement": "//div[@class='ux-mooc-comment-course-comment_comment-list']/div[@class='ux-mooc-comment-course-comment_comment-list_item']"
    },
    {
        "name": "铅笔小说",
        "nextLinkByJs": "let script=doc.querySelector('body>.mlfy_main>script:nth-of-type(2)');if(!script)return null;return location.origin+script.innerText.match(/.*url_next:'([^']+)'.*/i)[1]",
        "pageElement": "#mlfy_main_text",
        "url": "^https://www\\.23qb\\.(net|com)/book/"
    },
    {
        "name": "NGA",
        "url": "^https?://(.*\\.nga\\.cn|nga\\.178\\.com|ngabbs\\.com)/read\\.php",
        "nextLink": "a[title='下一页']",
        "action": 2,
        "pageElement": "div#m_posts",
        "init": "doc&&doc.addEventListener('mouseover',e=>{e.preventDefault();e.stopPropagation()},true)"
    },
    {
        "name": "NGA列表页",
        "url": "^https?://(.*\\.nga\\.cn|nga\\.178\\.com|ngabbs\\.com)/thread\\.php",
        "action": 1,
        "pageElement": "#topicrows"
    },
    {
        "name": "淮安新闻网",
        "url": "^http://www\\.hynews\\.net/",
        "loadMore": "#_more"
    },
    {
        "name": "淘股吧内贴",
        "url": "^https://www\\.taoguba\\.com\\.cn/Article/\\d+/\\d+",
        "pageElement": "#new_wrap_container",
        "nextLinkByJs": "let pageSpan=doc.querySelector('.t_page>.left>span:last-child');if(!pageSpan)return false;let maxPage=pageSpan.innerText.replace(/.*\\/(\\d+).*/,'$1'),curPage=pageSpan.querySelector('b').innerText.trim();if(parseInt(curPage)<parseInt(maxPage))return location.href.replace(/(.*?)\\d+$/,'$1')+(parseInt(curPage)+1);else return false;"
    },
    {
        "name": "淘股吧列表页1",
        "url": "^https://www\\.taoguba\\.com\\.cn/(bbs|zongban|ttcl)",
        "pageElement": ".kuaixun,.Notspmatch,.p_list,#contents",
        "nextLinkByJs": "let pageSpan=doc.querySelector('.t_page>.left>span:last-child');if(!pageSpan)return false;let maxPage=pageSpan.innerText.replace(/.*\\/(\\d+).*/,'$1'),curPage=pageSpan.querySelector('b').innerText.trim();if(parseInt(curPage)<parseInt(maxPage))return location.href.replace(/(\\D+)\\d*(.*)$/,'$1')+(parseInt(curPage)+1)+'/0';else return false;"
    },
    {
        "name": "淘股吧列表页2",
        "url": "^https://www\\.taoguba\\.com\\.cn/(jinghua|dianzan)",
        "pageElement": ".kuaixun,.Notspmatch,.p_list,#contents",
        "nextLinkByJs": "let pageSpan=doc.querySelector('.t_page>.left>span:last-child');if(!pageSpan)return false;let maxPage=pageSpan.innerText.replace(/.*\\/(\\d+).*/,'$1'),curPage=pageSpan.querySelector('b').innerText.trim();if(parseInt(curPage)<parseInt(maxPage))return location.href.replace(/(\\D+)\\d*(.*)$/,'$1')+(parseInt(curPage)+1)+'-0';else return false;"
    },
    {
        "name": "淘股吧生活吧",
        "url": "^https://www\\.taoguba\\.com\\.cn/shenghuoba/",
        "pageElement": ".lifeContent-topicList-item",
        "nextLinkByJs": "let pageSpan=doc.querySelector('#N_go_pageBtn');if(!pageSpan)return false;let maxPage=pageSpan.dataset.total,curPage=pageSpan.dataset.now;if(parseInt(curPage)<parseInt(maxPage))return location.href.replace(/(\\D+\\/)[^\\/]*$/,'$1')+'H-'+(parseInt(curPage)+1);else return false;"
    },
    {
        "name": "K.F. 绯月列表页",
        "url": "^https://(bbs\\.9shenmi\\.com|kf\\.miaola\\.work)/thread.php",
        "pageElement": "//table[@class=\"thread1\"]/tbody/tr[position()>3]",
        "type": 0,
        "nextLink": "//ul[@class=\"pages\"]/li/a[contains(text(),'下一页')]"
    },
    {
        "name": "K.F. 绯月阅读页",
        "url": "^https://(bbs\\.9shenmi\\.com|kf\\.miaola\\.work)/read.php",
        "pageElement": "//form/div[@class=\"readlou\"]|//form/div[@class=\"readtext\"]|//form/div[@class=\"c\"]",
        "type": 0,
        "nextLink": "//ul[@class=\"pages\"]/li/a[contains(text(),'下一页')]"
    },
    {
        "name": "alternativeto",
        "url": "^https://alternativeto\\.net/",
        "nextLink": "nav[aria-label='Pagination Navigation']>a",
        "action": 1,
        "pageElement": "div.container>ol>li",
        "pageInit": "eles.forEach(e=>{let span=e.querySelector('div>div>div>span');if(span)span.onVisible()})"
    },
    {
        "name": "hirelateral",
        "url": "^https://www\\.hirelateral\\.com/",
        "pageElement": "div.mainwrap > div.contentwrap > div.leftwrap > table.table-bordered > tbody> tr"
    },
    {
        "name": "Agristudyinfo & 20govtjobs",
        "url": "^(https://agristudyinfo\\.in/|https://20govtjobs\\.com/)",
        "pageElement": "#main>article",
        "nextLink": ".page-numbers.current+a"
    },
    {
        "name": "秀色女神",
        "url": "^https://www\\.xsnvshen\\.co",
        "pageElement": ".container> div.longConWhite> div.workContentWrapper > div.workShow > ul > li > img#bigImg",
        "nextLink": "span#next"
    },
    {
        "name": "Anime Time",
        "url": "^https://www\\.animetime\\.pw",
        "pageElement": "div.blog-posts.container > div.grid-posts",
        "nextLink": "a.page-num.page-next",
        "waitElement": [
            "",
            "img.post-thumb:not(.lazy-yard)"
        ]
    },
    {
        "name": "YTS Movies",
        "type": 0,
        "url": "^https://yts\\.mx/browse-movies",
        "pageElement": "//section/div[@class=\"row\"]/div",
        "nextLink": "//li[./a[@class=\"current\"]]/following-sibling::li[1]/a",
        "css": "img{visibility: visible!important; display: block!important;}",
        "lazyImgSrc": "data-cfsrc"
    },
    {
        "name": "Mobilism",
        "type": 0,
        "url": "^https://forum\\.mobilism\\.org/",
        "pageElement": "id('page-body')//section|id('page-body')/main/table[last()]/tbody/tr|//div[@class='row-fluid blue-bar']",
        "nextLink": "//a[i/@class='icon-chevron-right']",
        "css": "table.phone .stats-color,table.phone .last-color,table.phone td.center { display: none; }"
    },
    {
        "name": "不死鸟",
        "url": "^https://iao\\.su/",
        "pageElement": "#index>article",
        "action": 1
    },
    {
        "name": "3DM搜索",
        "url": "^https://so\\.3dmgame\\.com",
        "pageElement": "body > div.content > div.search_wrap > div.search_lis",
        "action": 1
    },
    {
        "name": "deviantArt",
        "url": "^https://www\\.deviantart\\.com/search",
        "pageElement": "div[data-hook='all_content']>div>div>div:not([class])"
    },
    {
        "name": "豆瓣小组内页",
        "url": "^https://www\\.douban\\.com/group/topic/",
        "pageElement": "ul#comments>li",
        "pageNum": "start={100*($p-1)}"
    },
    {
        "name": "Github issues and pulls",
        "type": 0,
        "action": 0,
        "url": "^https:\\/\\/github\\.com\\/[^/]+\\/[^/]+\\/(?:issues|pulls)",
        "pageElement": "//div[starts-with(@id,'issue_')]",
        "nextLink": "//a[@class='next_page']",
        "pinUrl": true
    },
    {
        "name": "Repository search results · GitHub",
        "url": "^https?://github\\.com/search",
        "example": "https://github.com/search?q=C%2B%2B",
        "nextLinkByUrl": [
            "(&p=(\\d+))?$",
            "&p={$2+1}"
        ],
        "pageElement": "[data-testid='results-list']",
        "action": 0,
        "include": "[rel='next']"
    },
    {
        "name": "Actions · github",
        "action": 0,
        "url": "^https?://github\\.com/",
        "pageElement": "div.Box-row.js-socket-channel.js-updatable-content",
        "nextLink": "//a[text()='Next']"
    },
    {
        "name": "Hoothin github page",
        "url": "^https?://hoothin\\.github\\.io/",
        "enable": 0
    },
    {
        "name": "360搜索",
        "url": "^https://www\\.so\\.com/s",
        "lazyImgSrc": "data-isrc",
        "css": ".so-lazyimg{opacity:1!important}.so-rich-news .pics li{float:left;margin-right:17px;}",
        "pageNum": "pn={$p}"
    },
    {
        "name": "Mixfemdomcc",
        "url": "^https://mixfemdomcc\\.com",
        "css": ".gray-block a.highslide_new > img{transform:unset}"
    },
    {
        "name": "Handpicked Jerk-Off Instruction (JOI) Videos",
        "url": "^https://joi-me\\.com",
        "action": "1",
        "pageElement": "#container"
    },
    {
        "name": "Konachan.com Anime Wallpapers",
        "url": "^https://konachan\\.com/post",
        "nextLink": "id(\"post-view\")/div[@class=\"sidebar\"]/div[5]/ul/li[2]/a",
        "pageElement": "id(\"image\")"
    },
    {
        "name": "Femdom",
        "url": "^https://femdomup\\.net",
        "pageElement": ".cat-shortstory>article",
        "pageAction": "eles.forEach(ele=>{let video=ele.querySelector('video');video.onmouseenter=e=>{video.src=video.dataset.src;video.classList.add('prev-video')};video.onmouseleave=e=>{video.src='/templates/videok2s/dleimages/plug.webm';video.classList.remove('prev-video')}})"
    },
    {
        "name": "Amedia",
        "url": "^https://amedia\\.online",
        "pageElement": "#dle-content",
        "css": "img[data-src] { opacity: 1; }"
    },
    {
        "name": "XFantazy",
        "url": "^https://xfantazy\\.com",
        "pageElement": ".MuiGrid-container",
        "action": 2,
        "fitWidth": false,
        "init": "if(!doc||win.loaded)return;win.loaded=true;doc.querySelector('[data-stats=\"feed:button:choose-sort\"]').click();doc.querySelector('[data-stats=\"feed:button:sort:mostViewed\"]').click()"
    },
    {
        "name": "PornAV",
        "url": "^https://pornav\\.co",
        "pageElement": "div#grid-container",
        "css": ".cbp-lightbox{visibility: visible;}.cbp-caption-defaultWrap{-webkit-transition: -webkit-transform .6s cubic-bezier(.19,1,.22,1); transition: transform .6s cubic-bezier(.19,1,.22,1)}.cbp-caption:hover .cbp-caption-defaultWrap{-webkit-transform: scale(1.25); -moz-transform: scale(1.25); transform: scale(1.25);}.cbp-caption-activeWrap{opacity:0}.cbp-caption-activeWrap:hover{opacity:1}#grid-container.cbp-l-grid-blog{visibility: visible;}"
    },
    {
        "name": "Pornhub.com",
        "action": 0,
        "url": "^https://[^.]+\\.pornhub\\.com/(?!view_video\\.php).+",
        "pageElement": "id(\"videoCategory\") | \r\nid(\"incategoryVideos\") | \r\nid(\"videoSearchResult\") | \r\nid(\"mostRecentVideosSection\") | \r\nid(\"photosAlbumsSection\") | \r\nid(\"claimedRecentVideoSection\") | \r\n//div[@class='recommendedVideosContainer']/ul | \r\nid(\"popularPornstars\") | \r\n//ul[contains(concat(' ', normalize-space(@class), ' '), ' streamateContent ')] | \r\nid('filterChannelsSection') | \r\nid('playListSection')",
        "nextLink": "//li[contains(concat(\" \", normalize-space(@class), \" \"), \" page_next \")][not(contains(@class, \"disabled\"))]/a"
    },
    {
        "name": "草榴社區",
        "type": 0,
        "url": "htm_data/\\d+/\\d+/\\d+\\.html|read\\.php\\?tid=|thread0806\\.php\\?fid=",
        "pageElement": "id('ajaxtable')//tr[.//a][./preceding-sibling::tr or ./following-sibling::tr]|//div[@class='t t2']",
        "sleep": 2000,
        "nextLink": "//div[@class='pages']/a[u]/following-sibling::a[1]",
        "action": 0
    },
    {
        "name": "起点中文网",
        "url": "^https?://www\\.qidian\\.com/",
        "nextLink": "//a[contains(@class,'lbf-pagination-current')]/parent::li/following::li/a[not(contains(@class,'lbf-pagination-disabled'))]",
        "pinUrl": true
    },
    {
        "name": "phpwind read",
        "url": "/read\\.php\\?",
        "pageElement": ".main-box>.bbs-read-subbox"
    },
    {
        "name": "phpwind old read",
        "url": "/read\\.php\\?",
        "pageElement": "form[name='delatc']>a[name]",
        "nextLink": "td>b+a",
        "insert": "form[name='delatc']>a:last-child>table:nth-child(2)",
        "insertPos": 1
    },
    {
        "name": "phpwind old list",
        "url": "/thread\\.php\\?",
        "pageElement": "tr.t_two",
        "nextLink": "td>b+a"
    },
    {
        "name": "虎扑",
        "url": "^https?://bbs\\.hupu\\.com/\\d+",
        "pageElement": ".bbs-post-wrapper-content",
        "nextLink": "li.hupu-rc-pagination-next>a:not([disabled])"
    },
    {
        "name": "小木虫论坛",
        "url": "^http://muchong\\.com",
        "pageElement": "div#maincontent"
    },
    {
        "name": "极简",
        "url": "^https://bz\\.zzzmh\\.cn/",
        "pageElement": "div.img-box",
        "nextLink": "div.vue_pagination_next",
        "wait": "let preload=doc.querySelector('.v-image__image--preload');if(preload){var actualTop=preload.offsetTop;var current=preload.offsetParent;while(current!==null){actualTop+=current.offsetTop;current=current.offsetParent;}doc.documentElement.scrollTop=actualTop;return false;}return doc.querySelector('div.vue_pagination_next');",
        "init": "if(iframe){iframe.style.position='fixed';iframe.style.top=0;iframe.height=1000;let mask=doc.querySelector('div.mask');setInterval(()=>{if(mask.style.display!='none'){iframe.style.visibility='';}else{iframe.style.visibility='hidden'}},1000)}",
        "enable": 0
    },
    {
        "name": "极简",
        "url": "^https://chrome\\.zzzmh\\.cn/",
        "pageElement": ".row>.index-card-box",
        "nextLink": "[aria-label='Next page']",
        "waitElement": [
            "!.v-image__image--preload"
        ]
    },
    {
        "name": "东方财富",
        "url": "^http://quote\\.eastmoney\\.com/",
        "pinUrl": true,
        "nextLink": "a.next:not(.disabled)",
        "pageElement": "#table_wrapper-table>tbody>tr"
    },
    {
        "name": "mikuclub",
        "url": "^https://www\\.mikuclub\\.cc/",
        "loadMore": "button.get-next-page",
        "nextLink": "0"
    },
    {
        "name": "smzdm jingxuan",
        "action": 0,
        "url": "^https://.*\\.smzdm\\.com/jingxuan",
        "pageElement": "ul#feed-main-list>li",
        "nextLinkByUrl": [
            "(.*jingxuan)(/p)?(\\d*)",
            "$1/p{($3.0||1)+3}"
        ],
        "insert": "ul#feed-main-list",
        "insertPos": 2,
        "delay": "let curpage=location.href.match(/\\d+$/);if(curpage)curpage=parseInt(curpage[0])+2;else curpage=3;return document.querySelector('#J_feed_pagenation>li.current').innerText>=curpage&&document.querySelector('#J_feed_loading').style.display=='none'"
    },
    {
        "name": "天涯列表页",
        "url": "^http://bbs\\.tianya\\.cn/list",
        "pageElement": "table.tab-bbs-list>tbody:not(tbody:nth-of-type(1))"
    },
    {
        "name": "天涯内容页",
        "url": "^http://bbs\\.tianya\\.cn/post",
        "pageElement": ".atl-main>.atl-item"
    },
    {
        "name": "Fiction.live",
        "url": "^https://fiction\\.live/",
        "pageElement": "#storyPosts>div>article.chapter",
        "nextLink": ".nextChapter",
        "action": 1,
        "wait": 500
    },
    {
        "name": "微博搜索",
        "url": "^https://s\\.weibo\\.com/weibo",
        "pageElement": "#pl_feedlist_index>div>div.card-wrap",
        "action": 1,
        "pageAction": "eles.forEach(e=>{let vc=e.querySelector('a.WB_video_h5');if(vc){let v=vc.querySelector('video');let b=vc.querySelector('button.wbpv-big-play-button');b.onclick=e=>{v.style.zIndex=9;v.controls=true;v.play()}}})"
    },
    {
        "name": "某小说站",
        "url": "^https://yuyan\\.pw/novel/\\d+/\\d+",
        "pageElement": "#nr>div",
        "pageAction": "eles[0].innerHTML='　　'+eval(doc.querySelector('body>script:nth-of-type(8)').innerHTML.match(/var chapter =(.*?);\\n/)[1]);"
    },
    {
        "name": "翠微居",
        "url": "^https://www\\.cuiwei\\.org/book/\\d+/\\d+\\.html",
        "action": 1,
        "nextLink": "a.next",
        "pageElement": "#chapter-content>p"
    },
    {
        "name": "套图吧",
        "url": "^https://www\\.192tp\\.com/",
        "pageElement": ".picsboxcenter"
    },
    {
        "name": "昵图网",
        "url": "^https://www\\.nipic\\.com/",
        "css": "a.new-works-img-box>span>img{display:initial!important}"
    },
    {
        "name": "inoveltranslation",
        "url": "^https://inoveltranslation\\.com/",
        "pageElement": ".chakra-skeleton>p",
        "insert": "#chapterreadtrck",
        "nextLink": "button[aria-label='next chapter']"
    },
    {
        "name": "lightnovelstranslations",
        "url": "^https://lightnovelstranslations\\.com/",
        "nextLink": "p.alignright>a",
        "pageElement": ".entry-content>p"
    },
    {
        "name": "书山有路",
        "url": "^https?://www\\.ssylu\\.com/",
        "nextLink": ".pagenavi>span.current+a"
    },
    {
        "name": "bjav",
        "url": "^https://thebjav\\.com/|^https://sexbjcam\\.com/",
        "css": "img[data-src]{opacity: 1;}"
    },
    {
        "name": "scribblehub",
        "url": "^https://www\\.scribblehub\\.com/read",
        "pageElement": "#chp_raw",
        "nextLink": "a.btn-next",
        "pageAction": "eles.forEach(ele=>{[].forEach.call(ele.querySelectorAll('.sp-head'),sp=>{sp.onclick=e=>{sp.nextElementSibling.classList.toggle('folded')}})})"
    },
    {
        "name": "serx.ml",
        "url": "^https?://serx\\.ml/",
        "pageElement": "article.result"
    },
    {
        "name": "Ru.Board",
        "url": "^https?://forum\\.ru-board\\.com/",
        "nextLink": "table .small>b+a"
    },
    {
        "name": "淘宝已买到的宝贝",
        "url": "^https://buyertrade\\.taobao\\.com/",
        "pageElement": "table[data-reactid]",
        "lockScroll": true
    },
    {
        "name": "淘宝店铺1",
        "url": "^https?://.*\\.taobao\\.com/search\\.htm",
        "pageElement": ".skin-box-bd>.grid>.item3line1",
        "pagePre": "return decodeURI(response).replace(/[\\\\]/g,'')",
        "nextLinkByJs": "let n=doc.querySelector('.pagination>a.next');if(!n)return;return n.href.replace(/(.*)\\/search\\.htm\\?(.*)/,'$1/i/asynSearch.htm?$2').replace(/&callback=.*?&/,'&')",
        "wait": 500
    },
    {
        "name": "423Down评论",
        "url": "^https?://www\\.423down\\.com/",
        "pageElement": "div#postcomments > ol.commentlist> li.comment"
    },
    {
        "name": "奔跑的奶酪",
        "url": "^https://www\\.runningcheese\\.com/",
        "pageElement": "ul.ajaxposts>li"
    },
    {
        "name": "奔跑的奶酪内页禁用",
        "url": "^https://www\\.runningcheese\\.com/",
        "pageElement": "section#scroll article.entry",
        "enable": 0
    },
    {
        "name": "异星软件",
        "url": "^https://www\\.yxssp\\.com/",
        "pageElement": ".td-modules-container",
        "nextLink": "span.current+a"
    },
    {
        "name": "题目列表 - 洛谷",
        "url": "^https://www\\.luogu\\.com\\.cn/problem/list",
        "nextLinkByUrl": [
            "(\\?page=|$)(\\d*)",
            "?page={$2+1}"
        ],
        "wait": 1000,
        "pagePre": [
            "<a href=\"(.*?)\">(.*?)</a></li>",
            "<div data-v-c06fccc2=\"\" data-v-24f898d2=\"\" class=\"row\"><!----> <span data-v-c06fccc2=\"\" data-v-24f898d2=\"\" class=\"status\"><svg data-v-1b44b3e6=\"\" data-v-c06fccc2=\"\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"minus\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"icon svg-inline--fa fa-minus fa-w-14\" data-v-24f898d2=\"\" style=\"opacity: 0.7;\"><path data-v-1b44b3e6=\"\" fill=\"currentColor\" d=\"M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z\" class=\"\"></path></svg></span> <span data-v-c06fccc2=\"\" data-v-24f898d2=\"\" class=\"pid\">$1</span> <div data-v-c06fccc2=\"\" data-v-24f898d2=\"\" class=\"title\"><a data-v-303bbf52=\"\" data-v-c06fccc2=\"\" href=\"/problem/$1\" target=\"_blank\" colorscheme=\"default\" class=\"title color-default\" data-v-24f898d2=\"\">$2</a></div> <div data-v-187aafe9=\"\" data-v-c06fccc2=\"\" class=\"tags\" data-v-24f898d2=\"\"><div data-v-187aafe9=\"\" class=\"tags-wrap multiline\"></div></div> <div data-v-c06fccc2=\"\" data-v-24f898d2=\"\" class=\"difficulty\"></div> <div data-v-c06fccc2=\"\" data-v-24f898d2=\"\" class=\"progress\"><div data-v-47712372=\"\" data-v-c06fccc2=\"\" class=\"progress-frame has-tooltip\" data-original-title=\"null\" data-v-24f898d2=\"\"><div data-v-47712372=\"\" style=\"width: 37.2682%; background-color: rgb(52, 152, 219);\"></div></div></div></div>"
        ],
        "pageElement": ".row"
    },
    {
        "name": "题单广场 - 洛谷",
        "url": "^https://www\\.luogu\\.com\\.cn/training/list",
        "nextLinkByUrl": [
            "(&page=|$)(\\d*)",
            "&page={$2+1}"
        ],
        "wait": 1000,
        "pagePre": [
            "<li><a href=\"(.*?)\">(.*?)</a></li>",
            "<div data-v-128051e7=\"\" data-v-24f898d2=\"\" class=\"row\"><span data-v-128051e7=\"\" data-v-24f898d2=\"\" class=\"id\">$1</span> <span data-v-128051e7=\"\" data-v-24f898d2=\"\" class=\"name\"><a data-v-303bbf52=\"\" data-v-128051e7=\"\" href=\"/training/$1\" target=\"_blank\" colorscheme=\"default\" class=\"color-default\" data-v-24f898d2=\"\"> $2 </a></span> <!----> <span data-v-128051e7=\"\" data-v-24f898d2=\"\" class=\"problem-count\">0</span> <span data-v-128051e7=\"\" data-v-24f898d2=\"\" class=\"collection\">0</span> <span data-v-128051e7=\"\" class=\"creator\" data-v-24f898d2=\"\"><span data-v-dfb4a326=\"\"><span data-v-58fd269e=\"\" data-v-dfb4a326=\"\"><span data-v-58fd269e=\"\"><a data-v-303bbf52=\"\" data-v-dfb4a326=\"\" href=\"/user/0\" target=\"_blank\" colorscheme=\"none\" class=\"color-none\" data-v-58fd269e=\"\"><span data-v-dfb4a326=\"\" data-v-303bbf52=\"\" style=\"font-weight: bold; color: rgb(254, 76, 97);\"> author </span></a></span> </span></span></span></div>"
        ],
        "pageElement": ".row"
    },
    {
        "name": "SteamPY",
        "url": "^https?://steampy\\.com/",
        "pageElement": ".market-detail > div.ivu-tabs > div.ivu-tabs-content > div.ivu-tabs-tabpane div.flex-row > .gameblock",
        "nextLink": ".page-ul > li.active + li:not(.disabled)",
        "pinUrl": true
    },
    {
        "name": "Steam Community Workshop Items",
        "url": "^https?://steamcommunity\\.com/",
        "pageElement": "#leftContents>div.workshopBrowsePaging+div.workshopBrowseItems"
    },
    {
        "name": "buondua",
        "url": "^https://(.*\\.)?buondua\\.com/",
        "type": 0,
        "pageElement": "//div[@class='article-fulltext']",
        "nextLink": "//span[.//a[@class='pagination-link is-current']]/following-sibling::span/a"
    },
    {
        "name": "Alibaba",
        "url": "^https://www\\.alibaba\\.com//?trade/search",
        "pageElement": ".organic-list>*",
        "nextLink": ".seb-pagination__pages>span+a",
        "action": 1,
        "pageAction": "eles.forEach(ele=>{let img=ele.querySelector('div[data-image]>img');if(!img)return;img.src=img.parentNode.dataset.image})",
        "wait": "return doc.querySelector('.seb-pagination__pages') && !doc.querySelector('.organic-list>p>i.ui2-icon-loading')"
    },
    {
        "name": "MGS Videos",
        "url": "^https?://tktube\\.com/",
        "pageElement": " div.list-videos > div#list_videos_common_videos_list_items > div.item",
        "nextLink": ".next>a[href^='#']",
        "pageAction": "eles.forEach(ele=>{let img=ele.querySelector('img[data-preview]');if(!img)return;let video=document.createElement('video');video.src=img.dataset.preview;video.setAttribute('playsinline','true');video.setAttribute('autoplay','');video.setAttribute('loop','');video.style.cssText='position: absolute; left: 0px; top: 0px; width: 318px; height: 179px; background: rgb(0, 0, 0); visibility: visible;';ele.onmouseenter=e=>{video.play();img.parentNode.appendChild(video)};ele.onmouseleave=e=>{img.parentNode.removeChild(video)}})"
    },
    {
        "name": "初音社",
        "url": "^https://www\\.mikuclub\\.online",
        "pageElement": "#post-list > div.col.card",
        "lazyImgSrc": "file",
        "css": "img.sl_lazyimg{opacity:1}",
        "pageAction": "eles.forEach(ele=>{let img=ele.querySelector('img');img.classList.remove('sl_lazyimg')})"
    },
    {
        "name": "易书 电子书聚合搜索引擎",
        "url": "^https?://search\\.zhelper\\.net/",
        "pinUrl": true,
        "nextLink": "//a[text()='下一页']",
        "pageElement": "ol.list-group>a",
        "pageAction": "eles.forEach(ele=>{let source=ele.querySelector('.card-title').nextSibling.data.match(/书源：(\\S+)/)[1];let id=ele.querySelector('small').innerText.match(/ID：(\\d+)/)[1];ele.onclick=e=>{axios.post('https://api.ylibrary.org/api/detail/', {id: id,source: source}).then(response=>{if (response.data.errorn) {alert(response.data.msg)} else {let detail=response.data;document.querySelector('#detailModal .modal-body').innerHTML=`<div class='modal-body'>书名：${detail.title}，书源：${detail.source} <br> 作者：${detail.author}，出版社：，出版时间： <br> MD5： ${detail.md5}<br> 文件大小：${detail.filesize}<!----><p></p><div class='modal-footer'><a class='btn btn-secondary' href='http://libgendown.1kbtool.com/${detail.md5}' target='_blank'> Libgen </a><a class='btn btn-secondary' href='https://ipfs-checker.1kbtool.com/${detail.ipfs_cid}?filename=${detail.title}_${detail.author}_zhelper-search.pdf' target='_blank'> IPFS </a><a class='btn btn-secondary' href='https://rulite.1kbtool.com/${detail.md5}#${detail.filesize}#${detail.title}_${detail.author}_zhelper-search.pdf' target='_blank'>秒传</a><!----><!----></div></div>`}}).catch(error=>{if (error.toJSON().status == 429) {alert('请求过于频繁，请稍等一下再次尝试(429)')} else {alert(`未知错误，请打开控制台查看(${error.message})`)}});var myModal = new bootstrap.Modal(document.getElementById('detailModal'),{});myModal.toggle()}})"
    },
    {
        "name": "Gamersky.com",
        "url": "^https://(.+)?gamersky\\.com/",
        "pageElement": "(id('gspaging')|//div[contains(@class,'Mid')][contains(@class,'L')][contains(@class,'con')])/p",
        "nextLink": "//div[@class='page_css']/b/following-sibling::a[1]",
        "action": 0,
        "css": ".post_ding{position: fixed; bottom: 5%; left: 0; z-index: 11;}.post_ding>.Content_Paging{padding: 5px 20px; width: auto;}.post_ding>.Content_Paging>.hd{width: auto;}.post_ding>.Content_Paging>.bd{display: none;}.post_ding:hover>.Content_Paging>.bd{display: block;}"
    },
    {
        "name": "Zoeken met Startpagina en Google",
        "url": "^https?://startgoogle\\.startpagina\\.nl/.*query=",
        "pinUrl": true,
        "history": 0,
        "nextLinkByUrl": [
            "/(search)?\\?(.*)&(query|q)=(\\w+)(&page=(\\d+))?.*",
            "/search?$2&q=$4&page={$6+1}&start={($6-1)*10}&num=10"
        ],
        "pageElement": "#organic-results>.organic",
        "pagePre": "let lis=[];JSON.parse(response).results.forEach(r=>{let li=`<li><h2><a href='${r.url}' target='_blank'>${r.title}</a></h2><div class='url'>${r.display_url}</div><div class='lines'>${r.snippet}</div></li>`;lis.push(li)});return `<div id='organic-results'><ul class='organic'>${lis.join('')}</ul></div>`;"
    },
    {
        "name": "Parts search",
        "url": "^https?://pcpph\\.in/",
        "init": "$('#search_results')[0].dataset.pageLength=100;$('#search_results_length select').val(100).trigger('change');"
    },
    {
        "name": "SpankBang",
        "example": "https://jp.spankbang.com/trending_videos/",
        "url": "^https?://([a-z]{2}\\.)?spankbang\\.com/(trending_videos|new_videos|category|pornstar|upcoming|most_popular|s)",
        "nextLinkByUrl": [
            "/(\\d+)/$",
            "/{$1+1}/"
        ],
        "pageElement": ".video-list.video-rotate.video-list-with-ads",
        "replaceElement": ".pagination",
        "css": ".pagetual_pageBar+div {margin-top: -5px !important;}"
    },
    {
        "name": "法務部行政執行署拍賣公告查詢系統",
        "url": "^https?://www\\.tpkonsale\\.moj\\.gov\\.tw/",
        "nextLinkByUrl": [
            "&PAGINATION_PAGE_NO=(\\d+)",
            "&PAGINATION_PAGE_NO={$1+1}"
        ],
        "pageElement": ".table_scroll"
    },
    {
        "name": "贵州省图",
        "url": "^https?://sxgzlib\\.chineseall\\.cn/",
        "nextLink": ".item.twocol>span:nth-child(2)",
        "css": "#bookContent{overflow: scroll;}"
    },
    {
        "name": "夺宝岛列表-京东_拍拍",
        "url": "^https?://1paipai\\.jd\\.com/",
        "nextLink": ".btn-next",
        "pinUrl": true,
        "stopSign": [
            "",
            ".btn-next[disabled]"
        ],
        "pageElement": "body > div:nth-of-type(1) > div.auction-list > div.list-selector > div.container > div:nth-of-type(2)"
    },
    {
        "name": "高校古文献資源庫读者检索系统",
        "url": "^https?://rbsc\\.calis\\.edu\\.cn:8086/",
        "pageElement": "input~tr"
    },
    {
        "name": "Ru.Board",
        "url": "^https?://forum\\.ru-board\\.com/",
        "nextLink": "table .small>b+a"
    },
    {
        "name": "iconfont-阿里巴巴矢量图标库",
        "url": "^https://www\\.iconfont\\.cn",
        "pageElement": "ul.block-icon-list>li",
        "wait": 500,
        "nextLink": "a.next"
    },
    {
        "name": "16Personalities",
        "url": "^https://www\\.16personalities\\.com",
        "enable": 0
    },
    {
        "name": "Soccercatch.com",
        "url": "^https://www\\.soccercatch\\.com",
        "nextLink": ".tabs-page[data-active=true] .pagination-next",
        "init": "if(doc){let tabName=document.querySelector('[data-active=true]').dataset.title;doc.querySelector('[data-title='+tabName+']').click()}",
        "pageElement": "[data-active=true]>section>*",
        "wait": "if(doc==document)return true;let tabName=document.querySelector('[data-active=true]').dataset.title;doc.querySelector('[data-title='+tabName+']').click();return true;"
    },
    {
        "name": "All the Internet",
        "url": "^https://www\\.alltheinternet\\.com",
        "pageElement": ".gsc-result",
        "nextLink": ".pagebuttons",
        "wait": 500
    },
    {
        "name": "Lukol",
        "url": "^https://www\\.lukol\\.com",
        "pageElement": ".gsc-result",
        "nextLink": ".gsc-cursor-current-page+div",
        "wait": 500
    },
    {
        "name": "微博",
        "url": "^https://weibo\\.com",
        "pageElement": ".WB_feed",
        "nextLink": "a.next",
        "exclude": ".container",
        "wait": 500
    },
    {
        "name": "蝦皮購物台灣",
        "url": "^https?://shopee\\.tw/",
        "pinUrl": true,
        "nextLink": "button.shopee-icon-button--right",
        "pageElement": ".shopee-search-item-result__items",
        "waitElement": [
            "",
            ".shopee-search-item-result__item img:not([src]),.shopee-image-placeholder"
        ]
    },
    {
        "name": "露天市集",
        "url": "^https?://www\\.ruten\\.com\\.tw/find/",
        "nextLink": "button[aria-label='下一頁']",
        "pageElement": ".search-result-container",
        "wait": 1000
    },
    {
        "name": "Free Porn Videos & Sex Tube Movies at xHamster",
        "url": "^https://xhopen\\.com",
        "pageElement": ".thumb-list.thumb-list--sidebar",
        "action": 2
    },
    {
        "name": "全站书库-优书网",
        "url": "^https://www\\.yousuu\\.com",
        "pageElement": "div.result",
        "nextLink": "button.btn-next",
        "lockScroll": true
    },
    {
        "name": "infinitenoveltranslations",
        "url": "^https://infinitenoveltranslations\\.net",
        "type": 0,
        "pageElement": "//div[@class='entry-content']",
        "nextLink": "//a[contains(text(),'Next Chapter')]",
        "autoClick": "//a[contains(text(),'Enjoy')]",
        "pinUrl": true
    },
    {
        "name": "搜狗wap",
        "url": "^https?://wap\\.sogou\\.com/web/searchList\\.jsp",
        "loadMore": "#ajax_next_page",
        "nextLink": 0
    },
    {
        "name": "bt1207",
        "url": "^https://bt1207ao\\.xyz/",
        "nextLinkByJs": "let n=doc.querySelector('ul.pagination>li.active+li>a');if(!n)return null;let params=[]; let form=doc.querySelector('#search-form'); [].forEach.call(form.querySelectorAll('input'), input=>{ if(input.name=='p')params.push('p='+n.innerText);else params.push(input.name+'='+input.value); }); return form.action+'?'+params.join('&');",
        "pageElement": "ul.list-unstyled"
    },
    {
        "name": "REPACK скачать",
        "url": "^https?://lrepacks\\.net/",
        "css": ".animated .slideUp{opacity:1}"
    },
    {
        "name": "豆瓣电影",
        "url": "^https://movie\\.douban\\.com",
        "wheel": true,
        "loadMore": ".explore-more>button"
    },
    {
        "name": "威锋",
        "url": "^https?://www\\.feng\\.com/",
        "nextLink": ".next:not(.disable)",
        "pinUrl": true,
        "loadMore": ".load-more-btn>button"
    },
    {
        "name": "游戏怀旧灌水首页禁用",
        "url": "^https?://www\\.yxhjgs\\.com/$",
        "enable": 0
    },
    {
        "name": "百度跳转页禁用",
        "url": "^https?://jump\\d?\\.bdimg\\.com/safecheck",
        "enable": 0
    },
    {
        "name": "检测到AC百度就不运行",
        "url": ".",
        "pageElement": ".AC-style-logo",
        "enable": 0
    },
    {
        "name": "pan.baidu",
        "url": "^https?://.*pan\\.baidu\\.com",
        "enable": 0
    },
    {
        "name": "baike.baidu",
        "url": "^https?://baike\\.baidu\\.com",
        "enable": 0
    },
    {
        "name": "wenku.baidu",
        "url": "^https?://wenku\\.baidu\\.com/view",
        "enable": 0
    },
    {
        "name": "baofeng",
        "url": "^https?://((m|www)\\.)?baofeng\\.com/play",
        "enable": 0
    },
    {
        "name": "bilibili",
        "url": "^https?://((m|www|live)\\.)?bilibili\\.com/(bangumi/play|video|anime|\\d)",
        "enable": 0
    },
    {
        "name": "instagram",
        "url": "^https?://((m|www)\\.)?instagram\\.com",
        "enable": 0
    },
    {
        "name": "iqiyi",
        "url": "^https?://((m|www)\\.)?iqiyi\\.com/(a_|v_|w_|$)",
        "enable": 0
    },
    {
        "name": "letv",
        "url": "^https?://((m|www)\\.)?le\\.com/ptv/vplay",
        "enable": 0
    },
    {
        "name": "mega",
        "url": "^https?://(.*\\.)?mega\\.",
        "enable": 0
    },
    {
        "name": "mgtv",
        "url": "^https?://((m|www)\\.)?mgtv\\.com/b",
        "enable": 0
    },
    {
        "name": "tudou",
        "url": "^https?://((m|i|v|www|play)\\.)?tudou\\.com/(albumplay|listplay|programs/view)",
        "enable": 0
    },
    {
        "name": "youku",
        "url": "^https?://((m|i|v|www|play)\\.)?youku\\.com/(v_|alipay_video)",
        "enable": 0
    },
    {
        "name": "youtube",
        "url": "^https?://(m\\.|www\\.)?youtube\\.com",
        "enable": 0
    },
    {
        "name": "sohu tv",
        "url": "^https?://(m\\.)?(film|tv)\\.sohu\\.com/(album|v)",
        "enable": 0
    },
    {
        "name": "acfun",
        "url": "^https?://((m|www|live)\\.)?acfun\\.cn/(v|live)",
        "enable": 0
    },
    {
        "name": "pptv",
        "url": "^https?://(m|v|vip)\\.pptv\\.com/show",
        "enable": 0
    },
    {
        "name": "qqtv",
        "url": "^https?://(m\\.)?v\\.qq\\.com/(tv|x/cover|x/page)",
        "enable": 0
    },
    {
        "name": "wasu",
        "url": "^https?://(m|www)\\.wasu\\.cn/Play/show",
        "enable": 0
    },
    {
        "name": "map.google",
        "url": "^https?://(maps\\.google\\.|www\\.google\\..*/maps)",
        "enable": 0
    },
    {
        "name": "order.jd",
        "url": "^https?://order\\.jd\\.com",
        "enable": 0
    },
    {
        "name": "twitter",
        "url": "^https?://(m\\.|www\\.)?twitter\\.com",
        "enable": 0
    },
    {
        "name": "google newtab",
        "url": "^https?://www\\.google\\..*/_/chrome/newtab",
        "enable": 0
    },
    {
        "name": "toodledo",
        "url": "^https?://www\\.toodledo\\.com/tasks",
        "enable": 0
    },
    {
        "name": "imgur",
        "url": "^https?://imgur\\.com/",
        "enable": 0
    }
]
