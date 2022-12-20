東方永頁機 [Wiki](https://pagetual.hoothin.com/en/)
==
*Pagetual - Perpetual pages. Auto loading paginated web pages for 90% of all web sites !*

<p name="click2import"></p>
<pre name="pagetual">
https://raw.githubusercontent.com/hoothin/UserScripts/master/Pagetual/pagetualRules.json
</pre>

---

[Rules example](https://pagetual.hoothin.com/en/rule.html)
==
``` json
[
  {
    "name":"beauty",
    "url":"^https://www\\.jpmn8\\.com/",
    "pageElement":"p>img"
  },
  {
    "name":"Expreview",
    "url":"^https://www\\.expreview\\.com/",
    "loadMore":"span.load"
  }
]
```

<table>
    <tr>
        <th colspan="3">💞Buy me a coffee if it helps you</th>
    </tr>
    <tr>
        <td><a href="https://paypal.me/hoothin">PayPal.Me</a></td><td><a href="https://buymeacoffee.com/hoothin">BuyMeACoffee</a></td>
    </tr>
</table>

![donate](https://s2.loli.net/2022/01/06/lEqKWLHG7UBO6AY.jpg)

name
--
Name of the target site
```JSON
"name": "Site name"
```

author
--
Author of this rule
```JSON
"author": "Hoothin"
```

example
--
Example url of this rule
```JSON
"example": "https://abc.com"
```

[url](https://pagetual.hoothin.com/en/rules/url.html)
--
```JSON
"url": "^https://abc\\.com/\\d+"
```

[pinUrl](https://pagetual.hoothin.com/en/rules/pinUrl.html)
--
```JSON
"pinUrl": true
```

[enable](https://pagetual.hoothin.com/en/rules/enable.html)
--
```JSON
"enable": 0
```

[include](https://pagetual.hoothin.com/en/rules/include.html)
--
```JSON
"include": "div.content"
```

[exclude](https://pagetual.hoothin.com/en/rules/exclude.html)
--
```JSON
"exclude": "div.content"
```

[wait](https://pagetual.hoothin.com/en/rules/wait.html)
--
```JSON
"wait": 500
"wait": "let img=doc.querySelector('ul.list img');return img!=null"
```

[waitElement](https://pagetual.hoothin.com/en/rules/waitElement.html)
--
```JSON
"waitElement": [
    ".summary",
    "#popular.fade:not(.in)"
]
```

[action](https://pagetual.hoothin.com/en/rules/action.html)
--
```JSON
"action": 1
```

[nextLink](https://pagetual.hoothin.com/en/rules/nextLink.html)
--
```JSON
"nextLink": ".page-next>a"
"nextLink": [
    ".page1-next>a",
    ".page2-next>a",
    ".page3-next>a"
]
```

[nextLinkByUrl](https://pagetual.hoothin.com/en/rules/nextLinkByUrl.html)
--
```JSON
"nextLinkByUrl": [
    "(&page=(\\d+))?$",
    "&page={$2+1}"
]
"nextLinkByUrl": [
    "(&page=(\\d+))?$",
    "&page={$2+1}",
    ".disable>button"
]
```

[nextLinkByJs](https://pagetual.hoothin.com/en/rules/nextLinkByJs.html)
--
```JSON
"nextLinkByJs": "let n=doc.querySelector('a.curr+a');if(n)return n.href.replace(/^javascript:.*\\((\\d+)'\\);/,'$1_.html');"
```

[stopSign](https://pagetual.hoothin.com/en/rules/stopSign.html)
--
```JSON
"stopSign": ["#pagenum", ".disable"] 
```
```JSON
"stopSign": [
    [
        "#pagenum",
        "(\\d+)"
    ],
    [
        "#pagenum",
        "\\/(\\d+)"
    ]
]
```
```JSON
"stopSign": ["#pagenum", ".disable",
    [
        "#pagenum",
        "(\\d+)"
    ],
    [
        "#pagenum",
        "\\/(\\d+)"
    ]
] 
```
```JSON
"stopSign": "if (doc.querySelector('.disable')) return true; if (nextLink.className === 'disable') return true; return false;" 
```

[pageElement](https://pagetual.hoothin.com/en/rules/pageElement.html)
--
```JSON
"pageElement": ".Context>.Article"
```

[pageElementByJs](https://pagetual.hoothin.com/en/rules/pageElementByJs.html)
--
```JSON
"pageElementByJs": "let src=match[1]+match[3];img.onload=()=>{over([img])};img.onerror=e=>{over()};img.src=src;"
```

[replaceElement](https://pagetual.hoothin.com/en/rules/replaceElement.html)
--
```JSON
"replaceElement": "#page"
"replaceElement": ["#page1", "#page2"]
```

[lazyImgSrc](https://pagetual.hoothin.com/en/rules/lazyImgSrc.html)
--
```JSON
"lazyImgSrc": "data-cfsrc"
"lazyImgSrc": ["data-lazy-src", "removeProp1,removeProp2"]
```

[css](https://pagetual.hoothin.com/en/rules/css.html)
--
```JSON
"css": ".card-lazy{display:none}"
```

[insert](https://pagetual.hoothin.com/en/rules/insert.html)
--
```JSON
"insert": "ul#feed-main"
```

[insertPos](https://pagetual.hoothin.com/en/rules/insertPos.html)
--
```JSON
"insertPos": 2
```

[init](https://pagetual.hoothin.com/en/rules/init.html)
--
```JSON
"init": "if(doc)doc.querySelector('[data-title=sh]').click();"
```

[pagePre](https://pagetual.hoothin.com/en/rules/pagePre.html)
--
```JSON
"pagePre": "return decodeURI(response).replace(/[\\\\]/g,'')"
```

[pageInit](https://pagetual.hoothin.com/en/rules/pageInit.html)
--
```JSON
"pageInit": "let ops=doc.querySelectorAll('op');[].forEach.call(ops,op=>{img.src=op.value;imgCon.appendChild(img)})"
```

[pageAction](https://pagetual.hoothin.com/en/rules/pageAction.html)
--
```JSON
"pageAction": "let j=document.querySelector('.lazy');eles.forEach(i=>{i.src=i.dataset.srcset;})"
```

[loadMore](https://pagetual.hoothin.com/en/rules/loadMore.html)
--
```JSON
"loadMore": ".loadMore"
```

[sleep](https://pagetual.hoothin.com/en/rules/sleep.html)
--
```JSON
"sleep": 1000
```

[rate](https://pagetual.hoothin.com/en/rules/rate.html)
--
```JSON
"rate": 3
```

[autoLoadNum](https://pagetual.hoothin.com/en/rules/autoLoadNum.html)
--
```JSON
"autoLoadNum": 5
```

[listenHashChange](https://pagetual.hoothin.com/en/rules/listenHashChange.html)
--
```JSON
"listenHashChange": true
```

[refreshByClick](https://pagetual.hoothin.com/en/rules/refreshByClick.html)
--
```JSON
"refreshByClick": "#sreach"
```

[pageNum](https://pagetual.hoothin.com/en/rules/pageNum.html)
--
```JSON
"pageNum": "&start={15*($p-1)}"
```

[pageBar](https://pagetual.hoothin.com/en/rules/pageBar.html)
--
```JSON
"pageBar": "pageBar.classList.add('j_thread_list');"
```

[pageBarText](https://pagetual.hoothin.com/en/rules/pageBarText.html)
--
```JSON
"pageBarText": 1
```

[autoClick](https://pagetual.hoothin.com/en/rules/autoClick.html)
--
```JSON
"autoClick": "#btn-sky"
```

[history](https://pagetual.hoothin.com/en/rules/history.html)
--
```JSON
"history": 1
```

[lockScroll](https://pagetual.hoothin.com/en/rules/lockScroll.html)
--
```JSON
"lockScroll": true
```

[wheel](https://pagetual.hoothin.com/en/rules/wheel.html)
--
```JSON
"wheel": true
```

[fitWidth](https://pagetual.hoothin.com/en/rules/fitWidth.html)
--
```JSON
"fitWidth": false
```

[pageElementStyle](https://pagetual.hoothin.com/en/rules/pageElementStyle.html)
--
```JSON
"pageElementStyle": "font-size: xx-large;"
```

[delay](https://pagetual.hoothin.com/en/rules/delay.html)
--
```JSON
"delay": "return document.querySelector('#feed_pagenation>li.cur').innerText>=curpage"
```

[manualMode](https://pagetual.hoothin.com/en/rules/manualMode.html)
--
```JSON
"manualMode": true
```

[child script](https://pagetual.hoothin.com/en/rules/child-script.html)
--
If the site has some limit for code eval. You can make a child script with function under object `window`. You should name them start with `pagetual` use camelCase. Like `window.pagetualWait`, `window.pagetualNextLinkByJs`, `window.pagetualPageInit`, `window.pagetualPageAction`, `window.pagetualInit`, `window.pagetualPageBarText`.
