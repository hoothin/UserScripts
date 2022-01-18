東方永頁機
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
    "type":"1",
    "name":"yande",
    "action":"0",
    "url":"^https:\/\/yande\\.re\/",
    "pageElement":"ul#post-list-posts>li",
    "nextLink":"a.next_page",
    "css":".javascript-hide {display: inline-block !important;}"
},
{
    "type":"1",
    "name":"tieba",
    "action":"1",
    "url":"^https:\/\/tieba\\.baidu.com\/f\\?kw=",
    "pageElement":"ul#thread_list>li",
    "nextLink":".next.pagination-item "
},
{
    type:1,
    name:"xxgame",
    action:0,
    url:"^http:\/\/www\.xxgame\.net/",
    pageElement:"div.layui-row>div.layui-col-md4",
    nextLinkByUrl:["(http://www\\.xxgame\\.net/chinese/?(?:\\?page=|$))(\\d*)","$1{$2+1}"]
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
0 means disable

type
--
0 means xpath format, 1 means selector

action
--
0 means load url and insert to div, 1 means load by iframe so that js on page may action, 2 means force insert to bottom

nextLink
--
Selector of next page link

nextLinkByUrl
--
If there is no next element, you can use this to generate a href from current url, [0] means RegExp string, [1] means replace string, you can use {} to eval simple code

pageElement
--
Selector of page main content which need to insert

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

pageAction:(document, eles)
--
The js code to run with every page inserted

init:(document)
--
The js code to run with current main page
