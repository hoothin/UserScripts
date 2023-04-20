☯️東方永頁機 v.1.9.36.2
==
*Pagetual - Perpetual pages. Auto loading paginated web pages for 90% of all web sites ! [**Wiki**](https://pagetual.hoothin.com/en/)*

<a name="otherconfig" title="for restricted environment" href="https://pagetual.hoothin.com/en/rule.html"><strong>🔧【Configuration page on wiki site】</strong></a>

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
        <th colspan="3">Buy me a coffee if it helps you💞</th>
    </tr>
    <tr>
        <td><a href="https://paypal.me/hoothin">PayPal.Me❤️</a></td><td><a href="https://buymeacoffee.com/hoothin">BuyMeACoffee❤️</a></td>
    </tr>
</table>

![donate](https://s2.loli.net/2023/02/06/afTMxeASm48z5vE.jpg)

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
RegExp for the url of target site

[nextLink](https://pagetual.hoothin.com/en/rules/nextLink.html)
--
Selector or xpath of next page link, disable when set to 0, you can let it to be a array to contains multiple next links.

[pageElement](https://pagetual.hoothin.com/en/rules/pageElement.html)
--
Selector or xpath of main content which need to insert, you can let it to be a array to contains multiple page elements.

[enable](https://pagetual.hoothin.com/en/rules/enable.html)
--
0 means stop action when all matched

[pinUrl](https://pagetual.hoothin.com/en/rules/pinUrl.html)
--
Sometimes the next link or page element will be inexistence, set this to true so you can pin the rule just with url instead of finding elements by intelligent rules

[include](https://pagetual.hoothin.com/en/rules/include.html)
--
Selector or xpath of the element which must include

[exclude](https://pagetual.hoothin.com/en/rules/exclude.html)
--
Selector or xpath of the element which must not include

[wait](https://pagetual.hoothin.com/en/rules/wait.html)
--
The time to wait for page ready when you are sure the url match the site, you can also use a javaScript code which return a boolean to check if the page is ready instead

[waitElement](https://pagetual.hoothin.com/en/rules/waitElement.html)
--
The array["exist", "not exist"] contains "selector or xpath of element must exist (for some lazyload element)" & "selector or xpath of element must not exist (for some loading placeholder which need scroll into view to load)"

[action](https://pagetual.hoothin.com/en/rules/action.html)
--
0 means load url and insert with static html, 1 means load by iframe so that dynamic javaScript code on page may effect, 2 means force insert iframe to bottom

[nextLinkByUrl](https://pagetual.hoothin.com/en/rules/nextLinkByUrl.html)
--
If there is no next element, you can use this to generate a href from current url, [0] means RegExp string, [1] means replace string, [2] means selector or xpath of the element which must include, [3] means selector or xpath of the element which must not include, you can use {} to eval simple code

[nextLinkByJs `(doc)`](https://pagetual.hoothin.com/en/rules/nextLinkByJs.html)
--
Use this to eval javaScript code and return target url of next page with doc (document of every page loaded)

[stopSign](https://pagetual.hoothin.com/en/rules/stopSign.html)
--
Stop to load next page when matching this sign

[pageElementByJs `(over, pageNum)`](https://pagetual.hoothin.com/en/rules/pageElementByJs.html)
--
Use this to eval javaScript code and create the elements whatever you want to insert, a over(eles) is needed to callback with elements array for insert

[replaceElement](https://pagetual.hoothin.com/en/rules/replaceElement.html)
--
Selector or xpath of element which you want to replace with new one, can be a array

[lazyImgSrc](https://pagetual.hoothin.com/en/rules/lazyImgSrc.html)
--
The attr of image which target to real src, can be set by ["lazysrc", "removeProp1,removeProp2"] to remove props of image

[css](https://pagetual.hoothin.com/en/rules/css.html)
--
Add css so you can show some hidden element, start with "inIframe:" then this css will effect only in next iframe page

[insert](https://pagetual.hoothin.com/en/rules/insert.html)
--
Which position you want to insert, you can let it to be a array to contains multiple positions.

[insertPos](https://pagetual.hoothin.com/en/rules/insertPos.html)
--
1 means insert before, 2 means just append to the bottom of target

[init `(doc,win,iframe)`](https://pagetual.hoothin.com/en/rules/init.html)
--
The javaScript code to run only once with current main page with doc:(document of main page)

[pagePre `(response)`](https://pagetual.hoothin.com/en/rules/pagePre.html)
--
The javaScript code to run after get response from URL of next link, you can modify the response content and return it

[pageInit `(doc, eles)`](https://pagetual.hoothin.com/en/rules/pageInit.html)
--
The javaScript code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule), run before inserted, you can trigger event like onView()

[pageAction `(doc, eles)`](https://pagetual.hoothin.com/en/rules/pageAction.html)
--
The javaScript code to run with every page inserted with doc:(document of every page loaded) and eles:(elements found with rule), run after inserted, you can add functions like click()

[loadMore](https://pagetual.hoothin.com/en/rules/loadMore.html)
--
Selector of "load more" button 

[sleep](https://pagetual.hoothin.com/en/rules/sleep.html)
--
Sleep time (ms) when load next page if site is limited by time interval

[rate](https://pagetual.hoothin.com/en/rules/rate.html)
--
The multi-windowHeight which you can set to 2 or 3 while some sites load next page slowly 

[autoLoadNum](https://pagetual.hoothin.com/en/rules/autoLoadNum.html)
--
The amount of pages for auto turning after page opening

[pageNum](https://pagetual.hoothin.com/en/rules/pageNum.html)
--
Point the page number with $p in current url, you can use{} to eval result string from page number, like {$p\*25+1}

[pageBar `(pageBar)`](https://pagetual.hoothin.com/en/rules/pageBar.html)
--
The javaScript code to change pageBar, 0 means hide

[pageBarText](https://pagetual.hoothin.com/en/rules/pageBarText.html)
--
Set to 1 so the document title of next page will be shown on pagebar

[autoClick](https://pagetual.hoothin.com/en/rules/autoClick.html)
--
The css selector or xpath of element which you want to click automatically

[manualMode](https://pagetual.hoothin.com/en/rules/manualMode.html)
--
Set to true to enable manual mode, then paging will stop, right arrow (or 'pagetual.next' event) will be bound to click next link.

[clickMode](https://pagetual.hoothin.com/en/rules/clickMode.html)
--
Set to true to enable click mode, will automatically click the next link when scrolling to the end of the page.
