東方永頁機 [Wiki](https://hoothin.github.io/PagetualGuide)
==
*Pagetual - Perpetual pages. Auto loading paginated web pages for 90% of all web sites !*

<p name="click2import"></p>
<pre name="pagetual">
https://raw.githubusercontent.com/hoothin/UserScripts/master/Pagetual/pagetualRules.json
</pre>

---

Rules example
==
<pre>
[
  {
    "name":"yande",
    "action":0,
    "url":"^https:\/\/yande\\.re\/",
    "pageElement":"ul#post-list-posts>li",
    "nextLink":"a.next_page",
    "css":".javascript-hide {display: inline-block !important;}"
  },
  {
    "name":"beauty",
    "url":"^https://www\\.jpmn8\\.com/",
    "pageElement":"p>img"
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

[More examples of rule](pagetualRules.json)

[Buy me a coffee if it helps you with PayPal.Me](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation)
![donate](https://s2.loli.net/2022/01/06/lEqKWLHG7UBO6AY.jpg)

name
--
Name of the target site

author
--
Author of this rule

example
--
Example url of this rule

url
--
Regexp of the url of target site

pinUrl
--
Sometimes the next link and page element will be inexistence, set this to true so you can select the rule just with url

enable
--
0 means stop action when all matched

wait
--
The time to wait for page ready when you are sure the url match the site, you can also use a js code which return a boolean to check if the page is ready instead

type
--
0 means xpath, 1 or undifined means css selector

action
--
0 means load url and insert to div, 1 means load by iframe so that js on page may action, 2 means force insert to bottom

nextLink
--
Selector of next page link, disable when set to 0

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
The js code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule), run after inserted, you can add functions like click

pageInit [ :(doc, eles) ]
--
The js code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule), run before inserted, you can trigger event like onView

init [ :(document) ]
--
The js code to run with current main page with document:(document of main page)

loadMore
--
Selector of load more button 

sleep
--
Sleep time when get next page if site is limited

rate
--
The multi-windowHeight which you can set to 2 or 3 while some sites load next page slowly 
