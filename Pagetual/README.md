[☯️](https://greasyfork.org/scripts/438684 "Install from greasyfork")東方永頁機 [v.1.9.37.117](https://greasyfork.org/scripts/438684-pagetual/code/Pagetual.user.js "Latest version")
==
*Pagetual - Perpetual pages. Auto loading paginated web pages for 90% of all web sites !*

<a name="otherconfig" title="For restricted environment" href="https://pagetual.hoothin.com/en/rule.html"><strong>🔧CONFIGURATION PAGE🔧</strong></a>

<p name="click2import"></p>
<pre name="pagetual">
https://raw.githubusercontent.com/hoothin/UserScripts/master/Pagetual/pagetualRules.json
</pre>

---

<table>
    <tr>
        <th colspan="5">Buy me a coffee if you get help💞</th>
    </tr>
    <tr>
        <th><a href="https://paypal.me/hoothin"><img src="https://www.paypal.me/favicon.ico"><br>PayPal</a></th>
        <th><a href="https://ko-fi.com/hoothin"><img src="https://ko-fi.com/favicon-32x32.png"><br>Ko-fi</a></th>
        <th><a href="https://afdian.com/@hoothin"><img src="https://static.afdiancdn.com/favicon.ico"><br>愛發電</a></th>
    </tr>
    <tr>
        <th colspan="3"><a href="https://discord.com/invite/keqypXC6wD">Join our 💬Discord</a></th>
    </tr>
    <tr>
        <th colspan="3"><a href="mailto:rixixi@gmail.com">Send me an 📧email</a></th>
    </tr>
    <tr>
        <th colspan="3">Made with ❤️ by <a href="https://github.com/hoothin">Hoothin</a></th>
    </tr>
    <tr>
        <th colspan="5"><a href="https://pagetual.hoothin.com/sponsors.svg"><img style="" wmode="transparent" id="sponsors" src="https://pagetual.hoothin.com/sponsors.svg?2023.12.9"></a></th>
    </tr>
</table>

 <details>
<summary><h3>Pagetual User-defined rules cases</h3></summary>
     
+ [TerenceCK pagetualRules](https://github.com/TerenceCK/pagetualRules/blob/main/happymh.json)
+ [Liu's-Pagetual-Rule](https://github.com/JPLiu/TestFiles/blob/main/UserScripts/Pagetual/Liu's-Pagetual-Rule.json)
+ [skofkyo pagetualRules_EX](https://github.com/skofkyo/AutoPager/blob/main/pagetualRules_EX.json)
+ [MovByte eToolsPagetual](https://gist.github.com/MovByte/a585456490d2e1c8ca815871db0887f7)
 </details>

 <details>
<summary>
<h3>Call functionality from other extensions</h3>
</summary>

1. **Immediately load next page**

> Please send the following message body:
```
command: "pagetual"
action: "nextPage"
detail: The number of pages to turn, 0 for unlimited, -1 to stop
```

> For example:
```
window.postMessage({ action: 'nextPage', command: 'patetual', detail: 5 }, '*');
```

2. **Set configuration**

> Please send the following message body:
```
command: "pagetual"
action: "config"
detail: The configuration item to be changed
```

> For example:
```
window.postMessage({ action: 'config', command: 'patetual', detail: {enableWhiteList: true} }, '*');
```

3. **Click load more button**

> Please send the following message body:
```
command: "pagetual"
action: "loadMore"
detail: null by default, 0 for unlimited checking load more button, -1 to stop
```

> For example:
```
window.postMessage({ action: 'loadMore', command: 'patetual', detail: 0 }, '*');
```
+ **Receive messages**

> When the next page is inserted, the following message body will be sent:
```
{
  action: 'insert',
  command: 'patetual'
}
```

> When the last page has been reached, the following message body will be sent:
```
{
  action: 'lastPage',
  command: 'patetual'
}
```

 </details>

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

[url](https://pagetual.hoothin.com/rules/url.html)
--
RegExp for the url of target site

[nextLink](https://pagetual.hoothin.com/rules/nextLink.html)
--
Selector or xpath of next page link, disable when set to 0, you can let it to be a array to contains multiple next links. You may leave it empty because it will be generated automatically.

[pageElement](https://pagetual.hoothin.com/rules/pageElement.html)
--
Selector or xpath of main content which need to insert, you can let it to be a array to contains multiple page elements. You may leave it empty because it will be generated automatically.

[enable](https://pagetual.hoothin.com/rules/enable.html)
--
0 means stop action when all matched

[include](https://pagetual.hoothin.com/rules/include.html)
--
Selector or xpath of the element which must include

[exclude](https://pagetual.hoothin.com/rules/exclude.html)
--
Selector or xpath of the element which must not include

[action](https://pagetual.hoothin.com/rules/action.html)
--
0 means load url and insert with static html, 1 means load by iframe so that dynamic javaScript code on page may effect, 2 means force insert iframe to bottom

[loadMore](https://pagetual.hoothin.com/rules/loadMore.html)
--
Selector of "load more" button you want to auto click
