東方永頁機 [Wiki](https://hoothin.github.io/PagetualGuide)
==
Auto Page for 90% of all web sites !

---

[Buy me a coffee if it helps you with PayPal.Me](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation)
![donate](https://s2.loli.net/2022/01/06/lEqKWLHG7UBO6AY.jpg)

Rules
==
<pre>
[
  {
    "name":"yande",
    "action":"0",
    "url":"^https:\/\/yande\\.re\/",
    "pageElement":"ul#post-list-posts>li",
    "nextLink":"a.next_page",
    "css":".javascript-hide {display: inline-block !important;}"
  },
  {
    "name":"tieba",
    "action":"1",
    "url":"^https:\/\/tieba\\.baidu.com\/f\\?kw=",
    "pageElement":"ul#thread_list>li",
    "nextLink":".next.pagination-item "
  },
  {
    "name":"xxgame",
    "action":0,
    "url":"^http://www\\.xxgame\\.net/chinese",
    "pageElement":"div.layui-row>div.layui-col-md4:not(div:nth-child(5),div:nth-child(6),div:nth-child(7))",
    "nextLinkByUrl":["(http://www\\.xxgame\\.net/chinese/?)(?:\\?page=|$)(\\d*)","$1?page={($2.0||1)+1}"]
  }
]
</pre>

name
--
Name of the target site

url
--
Regexp of the url of target site

enable
--
0 means stop action when all matched

wait
--
The time to wait for page ready when you are sure the url match the site

type
--
0 means xpath, 1 or undifined means css selector

action
--
0 means load url and insert to div, 1 means load by iframe so that js on page may action, 2 means force insert to bottom

nextLink
--
Selector of next page link

nextLinkByUrl
--
If there is no next element, you can use this to generate a href from current url, [0] means RegExp string, [1] means replace string, you can use {} to eval simple code

nextLinkByJs [ :(doc) ]
--
Use this to eval js code and return target url of next page with doc (document of every page loaded)

pageElement
--
Selector of main content which need to insert

pageElementByJs [ :(over) ]
--
Use this to eval js code and create the elements whatever you want to insert, a over([]) is needed to callback with elements array for insert

lazyImgSrc
--
The attr of image which target to real src

css
--
Add css so you can show some hided element

insert
--
Which position you want to insert

insertPos
--
1 means insert before, 2 means just append to the bottom of target

pageAction [ :(doc, eles) ]
--
The js code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule)

init [ :(document) ]
--
The js code to run with current main page with document:(document of main page)
