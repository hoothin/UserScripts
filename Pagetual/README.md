[☯️](https://greasyfork.org/scripts/438684 "Install from greasyfork")東方永頁機 [v.1.9.36.88](https://greasyfork.org/scripts/438684-pagetual/code/Pagetual.user.js "Latest version")
==
*Pagetual - Perpetual pages. Auto loading paginated web pages for 90% of all web sites !* [**📖Guide**](https://pagetual.hoothin.com/en/ "Wiki site for pagetual")

<a name="otherconfig" title="For restricted environment" href="https://pagetual.hoothin.com/en/rule.html"><strong>🔧CONFIGURATION PAGE🔧</strong></a>

<p name="click2import"></p>
<pre name="pagetual">
https://raw.githubusercontent.com/hoothin/UserScripts/master/Pagetual/pagetualRules.json
</pre>

---

<table>
    <tr>
        <th colspan="4">Buy me a coffee if you get help💞</th>
    </tr>
    <tr>
        <td><a href="https://paypal.me/hoothin"><img src="https://www.paypal.me/favicon.ico"><br>PayPal</a></td><td><a href="https://ko-fi.com/hoothin"><img src="https://ko-fi.com/favicon-32x32.png"><br>Ko-fi</a></td><td><a href="https://afdian.net/@hoothin"><img src="https://static.afdiancdn.com/favicon.ico"><br>愛發電</a></td>
        <td rowspan="3"><img src="https://s2.loli.net/2023/02/06/afTMxeASm48z5vE.jpg" alt="donate"></td>
    </tr>
    <tr>
        <th colspan="3">📧<a href="mailto:rixixi@gmail.com">Send me an email</a></th>
    </tr>
    <tr>
        <th colspan="3">Made with ❤️ by <a href="https://github.com/hoothin">Hoothin</a></th>
    </tr>
</table>


[Rules example](https://pagetual.hoothin.com/en/rule.html)
==
``` json
[
  {
    "name":"beauty",
    "url":"^https://www\\.jpmn-demo\\.com/",
    "pageElement":"p>img"
  },
  {
    "name":"Expreview",
    "url":"^https://www\\.expreview-demo\\.com/",
    "loadMore":"span.load"
  }
]
```

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
Selector or xpath of next page link, disable when set to 0, you can let it to be a array to contains multiple next links. You may leave it empty because it will be generated automatically.

[pageElement](https://pagetual.hoothin.com/en/rules/pageElement.html)
--
Selector or xpath of main content which need to insert, you can let it to be a array to contains multiple page elements. You may leave it empty because it will be generated automatically.

[enable](https://pagetual.hoothin.com/en/rules/enable.html)
--
0 means stop action when all matched

[include](https://pagetual.hoothin.com/en/rules/include.html)
--
Selector or xpath of the element which must include

[exclude](https://pagetual.hoothin.com/en/rules/exclude.html)
--
Selector or xpath of the element which must not include

[action](https://pagetual.hoothin.com/en/rules/action.html)
--
0 means load url and insert with static html, 1 means load by iframe so that dynamic javaScript code on page may effect, 2 means force insert iframe to bottom

[loadMore](https://pagetual.hoothin.com/en/rules/loadMore.html)
--
Selector of "load more" button you want to auto click
