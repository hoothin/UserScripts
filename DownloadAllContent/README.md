起點等都推薦用這個腳本[【小說】下載腳本](https://github.com/dodying/UserJs/tree/master/novel/novelDownloader)，遇到沒人願意適配的小站再考慮我的腳本。

輕量級抓取腳本，用於下載網頁小説或其他文字內容，理論上通用於任何靜態寫入正文的小說網站、論壇、貼吧等而無需規則。

腳本會自動檢索頁面中的主要內容並下載（<del>省得複製完gal攻略還要手動逐條刪除「某某某13級頭銜水龍王發表於X年X月X日來自XX客戶端」</del>）。
如果位於小說目錄頁會遍歷所有章節並排序拼接後存為TXT文檔。

[![img](https://img.shields.io/github/stars/hoothin/UserScripts?style=social)](https://github.com/hoothin/UserScripts) [【高亮或者格式化網頁中選中的代碼，並統計字數】](https://greasyfork.org/scripts/24150-highlight-every-code)

---

# 操作說明
+ 打開小說目錄頁、論壇或貼吧內容頁
+ 按下 `CTRL+F9` 或點擊命令菜單
+ 按下 `SHIFT+CTRL+F9` 忽略目錄，僅下載當前頁

若是遇到下載出錯的站點，可隨意提交issue至[Github](https://github.com/hoothin/UserScripts/issues)，我若恰好有空便會嘗試幫你查錯或編寫自定義規則。

*對你有幫助的話，請透過[PayPal管道](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation)请我喝一杯奶茶*

<img src='https://s2.loli.net/2022/01/06/lEqKWLHG7UBO6AY.jpg' alt="donation" width=420>

## 怠惰心法
<del>名喚怠惰，實為勤勉</del>
此功共有七層，以第一層最易，第七層最難。
### 第一層心法（極易）

 **CTRL+F9** 就完事了唄。
### 第二層心法（超易）

 倘若章節連結沒有xx章、xx節、xx話之類的特徵字樣，可點擊**自定義下載**，輸入隨便一個章節名，例如 「眾神的風車」，即可標記所有同級連結為目錄章節並下載。假如頁面有兩套章節格式，也可標記多個，例如「眾神的風車,風車的眾神」。亦可標記排除項，例如「眾神的風車01!02!03,風車的眾神!鐵幕」，代表標記「眾神的風車01」同級連結並排除含有 02 的項和含有 03 的項，同時標記「風車的眾神」同級連結並排除含有「鐵幕」的項。
### 第三層心法（略易）

 如果內頁沒有正文，但章節連結與真實內容連結有關聯，可通過**自定義下載**，替換連結內容獲取真實內容。例如 【`眾神的風車@@articles@@articlescontent`】，即可替換章節 URL 中的 articles 為 articlescontent 並自動獲取內容。
### 第四層心法（略難）

 如果連結無法由直接替換得到最終地址，可用正則替換，例如【`眾神的風車@@articles(\d+)@@articlescontent_$1b`】，即可替換章節 URL 中的 articles1、articles2 為
 `articlescontent_1b、articlescontent_2b`
### 第五層心法（難）

 輸入章節的 css 選擇器可以更精確地標記章節連結。例如`.l_chaptname>a`，代表 class 為 l_chaptname 的元素下的 a 連結。
 下載內容可能含有干擾碼，此時只需點擊**懶人小說下載設置**，輸入干擾碼的 css 選擇器即可排除干擾碼。例如 `.mask,.ksam,font.jammer`，代表刪除 class 為 mask 或者 ksam 的元素或者 class 為 jammer 的 font 元素。
### 第六層心法（超難）

 倘若正文不在內頁正文，是頁面加載後處理得到的，可點擊**自定義下載**，輸入自定義代碼對內頁進行分析獲取正確結果。例如 【`眾神的風車@@@@@@var noval=JSON.parse(data.querySelector("#meta-preload-data").content).novel;noval[Object.keys(noval)[0]].content;`】，即可通過自定義代碼處理返回頁面獲取內容。代碼中使用 data 可以獲得返回頁面的 document，最後一個表達式的值為最終寫入的內容。
 
 如果返回 false，代表異步回調，可自行抓取内容並等待抓取成功后用 cb(content) 返回抓取到的 content。

 倘若章節沒有連結，點擊後方才生成連結跳轉，可通過 `>>` 管道處理抓取到的元素生成章節連結，詳情見下方例子。
### 第七層心法（極難）

 倘若正文已經經過加密，需要解密才能獲取正確內容，可打開瀏覽器的控制台，自定義 dacProcess 函數，調取頁面中網站自身的解密代碼處理抓取的加密數據。例如控制台輸入`dacProcess=data=>{return decrypt(xxx);}` 代表調用網站的 decrypt 解密章節頁面返回的數據。然後再點擊**自定義下載**，需要注意自定義下載時標記章節是必需的。

### 關於配置項
 **【以下功能需要通過 Tampermonkey 等管理器的命令菜單進入】**

![img](https://greasyfork.s3.us-east-2.amazonaws.com/grg0pe1t13eth8t012bd1absp9id)
 - 自定義目錄：如`https://xxx.xxx/book-**[20-99]**.html,https://xxx.xxx/book-**[01-10]**.html`，意思為下載book-20.html到book-99.html，以及book-01.html到book-10.html，使用**[1-10]**則不補0。
 - 章節選擇器自定義：輸入章節連結的 css 選擇器即可，後面可以接上 url 替換碼、以及自定義處理代碼。
 - 干擾碼：填入干擾碼的 css 選擇器，如`.mask,.ksam`，意為刪除 class 為 mask 或者 ksam 的元素。
 - 按標題名重新排序：是則把目錄頁所有連結按標題名排序後存入txt，否則按頁面位置順序排列。
 - 下載線程數：同時下載的線程數，默認為20，遇到存在限制的站點(例如下載時總有章節獲取失敗)可調低。

### 完整格式說明
<code>某個章節名/CSS選擇器【選擇器後可跟>>傳入item添加處理代碼】 **@@** 抓取到URL的正則匹配 **@@** 對應匹配生成替換URL **@@** 根據爬取返回內容data處理並返回最終文本</code>

### 簡易自定義例子
 1. [po18](https://www.po18.tw/books/755779/articles)，章節的選擇器為 `.l_chaptname>a` ，輸入並下載後發現通過 url 無法下載正文內容，正文是 ajax 通過 articlescontent 下載的。此時可後接 `@@articles@@articlescontent` (@@ 分隔) 將章節 url 中的 articles 替換為 articlescontent 。 綜上 【`.l_chaptname>a@@articles@@articlescontent`】 可適配該站，粘貼進命令菜單即可下載。其中第一個 articles 可使用正則，例如 `@@articles(\d+)@@$1content` 代表將連結中的「articles1」「articles2」等替換為「1content」「2content」。
 2. [pixiv](https://www.pixiv.net/novel/series/7807554)，p站小說的章節選擇器為`main>section ul>li>div>a`，無需替換連結，因此後兩項留空。有6個@了 😂。正文在meta里，需要自定義代碼提取meta-preload數據的content項。綜上 【`main>section ul>li>div>a@@@@@@var noval=JSON.parse(data.querySelector("#meta-preload-data").content).novel;noval[Object.keys(noval)[0]].content;`】 即可下載p站小說。其中 "data" 代表抓取網頁的document對象，若返回的是純文本，則用 `data.body.innerText` 獲取。
 3. [紅薯中文網](https://g.hongshu.com/chapterlist/91735.do)，這個站沒有目錄連結，此時可以遍歷標籤自己創建目錄連結下載【`ul#lists>li>>let href=item.getAttribute("onclick").replace(/.*(http.*html).*/,"$1"),innerText=item.querySelector("span").innerText;return {href:href,innerText:innerText};@@@@@@let rdtext=data.querySelector('div.rdtext');let sc=data.querySelector('div.ewm+script');if(sc&&rdtext){let code=sc.innerText.replace(/for\(var i=0x0;i<words.*/,"window.words=words;");eval(code);[].forEach.call(rdtext.querySelectorAll('span[class]'),span=>{let id=span.className.replace(/[^\d]/ig,"");span.innerText=words[id]}),rdtext.innerText};`】
 4. [yuyan](https://yuyan.pw/)
 ``` javascript
yuyan.pw/novel/xxx/[xxxxxxx-xxxxxxx].html@@@@@@var c=data.querySelector('body>script:nth-of-type(8)').innerHTML.match(/var chapter =(.*?);\\n/)[1];eval(c).replaceAll("<br />","");
 ```
 6. [翠微居](https://www.cuiwei.org/book/28975/yijiequanyuledashi_mulu.html)
 ``` javascript 
 .chapter-table>a@@@@@@fetch(data.querySelector("div.box-border>script").innerHTML.match(/\/chapter\/(.*?)"/)[0]) .then(response => response.text()) .then(d => {eval("window.txtObj="+d.match(/_txt_call\((.*)\);/)[1]);for(k in txtObj.replace){txtObj.content=txtObj.content.replaceAll(txtObj.replace[k],k)}cb(unescape(txtObj.content.replace(/&#x(.*?);/g,'%u$1')));});return false;
 ```
 8. [知乎鹽選](https://www.zhihu.com/xen/market/remix/paid_column/1465280726219968513)
 ``` javascript
 [class^=ChapterItem-root]>>let a=document.createElement("a");let pre=\`https://www.zhihu.com/market/paid_column/${location.href.replace(/\D*(\d+)$/,"$1")}/section/\`;a.href=pre+JSON.parse(item.dataset.zaExtraModule).card.content.id;a.innerText=item.querySelector("div").innerText;return a;
 ```
 10. [腐女屋](http://m.funvwu.com/)
 ``` javascript
 .chapterList>ul>li>a>>let href=item.href.replace(/.*goChapter\((\d+)\)/,"/noval/"+localStorage.booklist+"/$1.html");item.href=href;return item;
 ```
 11. [若初文學網](https://www.ruochu.com/chapter/146456)
 ``` javascript
 ul.float-list>li>a@@www\\.ruochu\\.com/book/\d+/(\d+)@@a.ruochu.com/ajax/chapter/content/$1@@var content = data.body.innerText.match(/"htmlContent":"(.*)","status"/);if(!content)console.log(data.body.innerText);else{content=content[1];content.replace(/\\r/g,'\n')}
 ```
 13. [明月中文網](https://www.56bok.com/list/27/27742.html)
 ``` javascript 
 ul.readlist>li>a>>let href=item.getAttribute("onclick").replace(/.\*open\\('(.\*)','.\*/,"$1");item.href=href;return item;
 ```

### 測試網頁
+ http://www.gulongbbs.com/zhentan/bdlr/plje/Index.html
+ http://www.jhshe.cn/thread-1837-1-1.html
+ http://tieba.baidu.com/p/4871634479

### FAQ
- 章節沒有「第幾章第幾節」的字樣怎麼辦？<br>
參考第二層心法輸入其中一個章節名即可
- 下載一定章節後失敗怎麼辦？<br>
可能是網站限制了並發數，在設置中調低線程數即可
- 按下快捷鍵無效怎麼辦？<br>
可能是快捷鍵被其他應用接管了，使用腳本管理器中的命令菜單下載即可
- 有無關干擾字符怎麼辦？<br>
設置里輸入干擾碼css選擇器即可，多個選擇器用逗號分隔

### 為啥要寫這個腳本？
主要是<img src="https://stickershop.line-scdn.net/stickershop/v1/product/8692/LINEStorePC/main.png;compress=true" width=50 alt="怠惰啊" title="怠惰啊"/>
因為我要下載馳星周的漂流街，卻發現前人的輪子「【小說】下載腳本」不能用，又不想為這破站 🙃 寫規則，而且<del>我就是看不上霸道總裁修仙穿越你咬我啊</del>指不定它三天兩頭改個版呢。寫個通用規則的腳本，一來可以不用追著數不清的小說站適配修改更新，二來也免去了法律風險。
這個腳本會自動去查找主要內容並下載，不需要寫規則。當然如果你家網站廣告內容比正文還多我也沒辦法。
遇到特殊網站還是建議用「【小說】下載腳本」。
