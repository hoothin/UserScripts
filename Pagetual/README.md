東方永頁機 [Wiki](https://hoothin.github.io/PagetualGuide/en)
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
    "url":"^https://yande\\.re\/",
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
    "url":"^http://www\\.xxgame\\.net/chinese",
    "pageElement":"div.layui-row>div.layui-col-md4:not(div:nth-child(5),div:nth-child(6),div:nth-child(7))",
    "nextLinkByUrl":[
      "(http://www\\.xxgame\\.net/chinese/?)(?:\\?page=|$)(\\d*)",
      "$1?page={$2+1}"
    ]
  }
]
</pre>

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

author
--
Author of this rule

example
--
Example url of this rule

url
--
RegExp for the url of target site

pinUrl
--
Sometimes the next link or page element will be inexistence, set this to true so you can pin the rule just with url instead of finding elements by intelligent rules

enable
--
0 means stop action when all matched

include
--
Selector of the element which must include

exclude
--
Selector of the element which must not include

wait
--
The time to wait for page ready when you are sure the url match the site, you can also use a javaScript code which return a boolean to check if the page is ready instead

waitElement
--
The array["exist", "not exist"] contains "selector of element must exist (for some lazyload element)" & "selector of element must not exist (for some loading placeholder which need scroll into view to load)"

type
--
0 means crawl by xpath, 1 or undefined means css selector

action
--
0 means load url and insert with static html, 1 means load by iframe so that dynamic javaScript code on page may effect, 2 means force insert iframe to bottom

nextLink
--
Selector of next page link, disable when set to 0

nextLinkByUrl
--
If there is no next element, you can use this to generate a href from current url, [0] means RegExp string, [1] means replace string, you can use {} to eval simple code

nextLinkByJs `(doc)`
--
Use this to eval javaScript code and return target url of next page with doc (document of every page loaded)

pageElement
--
Selector of main content which need to insert

pageElementByJs `(over)`
--
Use this to eval javaScript code and create the elements whatever you want to insert, a over(eles) is needed to callback with elements array for insert

lazyImgSrc
--
The attr of image which target to real src

css
--
Add css so you can show some hidden element, start with "inIframe:" then this css will effect only in next iframe page

insert
--
Which position you want to insert

insertPos
--
1 means insert before, 2 means just append to the bottom of target

init `(document)`
--
The javaScript code to run only once with current main page with document:(document of main page)

pagePre `(response)`
--
The javaScript code to run after get response from URL of next link, you can modify the response content and return it

pageInit `(doc, eles)`
--
The javaScript code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule), run before inserted, you can trigger event like onView()

pageAction `(doc, eles)`
--
The javaScript code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule), run after inserted, you can add functions like click()

loadMore
--
Selector of "load more" button 

sleep
--
Sleep time (ms) when load next page if site is limited by time interval

rate
--
The multi-windowHeight which you can set to 2 or 3 while some sites load next page slowly 

pageNum
--
Point the page number with $p in current url, you can use{} to eval result string from page number, like {$p\*25+1}

pageBar `(pageBar)`
--
The javaScript code to change pageBar, 0 means hide

pageBarText
--
Set to 1 so the document title of next page will be shown on pagebar

autoClick
--
The css selector or xpath of element which you want to click automatically

history
--
Set to 0 then history writing will be disable. Set to 1 then history writing will be enable. No matter what value is the general option.

lockScroll
--
Set to true if you don't want the page to auto scroll when navigate to next page

wheel
--
Set to true so the next page action will only effect when the mouse wheel roll

fitWidth
--
Set to false if you find the pageElement get the wrong small width

pageElementStyle
--
Custom cssText of style for pageElement

delay
--
The javaScript code to delay next action until return true, use this prop to get complete page elements with lazy load.

manualMode
--
Set to true to enable manual mode, then paging will stop, right arrow (or 'pagetual.next' event) will be bound to click next link.

child script
--
If the site has some limit for code eval. You can make a child script with function under object `window`. You should name them start with `pagetual` use camelCase. Like `window.pagetualWait`, `window.pagetualNextLinkByJs`, `window.pagetualPageInit`, `window.pagetualPageAction`, `window.pagetualInit`, `window.pagetualPageBarText`.
