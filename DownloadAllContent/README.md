起點等都推薦用這個腳本[【小說】下載腳本](https://github.com/dodying/UserJs/tree/master/novel/novelDownloader)，遇到沒人願意適配的小站再考慮我的腳本。

勿用于版權站，如造成侵權或對象站點損失，後果自負。

輕量級抓取腳本，用於下載網頁小説或其他文字內容，理論上通用於任何靜態寫入正文的小說網站、論壇、貼吧等而無需規則。

腳本會自動檢索頁面中的主要內容並下載（<del>省得複製完gal攻略還要手動逐條刪除「某某某13級頭銜水龍王發表於X年X月X日來自XX客戶端」</del>）。
如果位於小說目錄頁會遍歷所有章節並排序拼接後存為TXT文檔。

[![img](https://img.shields.io/github/stars/hoothin/UserScripts?style=social)](https://github.com/hoothin/UserScripts#StarMe) ⭐[Star Me](https://github.com/hoothin/UserScripts#StarMe)

---

# 操作說明
+ 打開小說目錄頁、論壇或貼吧內容頁
+ 按下 `CTRL+F9` 或點擊命令菜單
+ 按下 `SHIFT+CTRL+F9` 忽略目錄，僅下載當前頁

若是遇到下載出錯的站點，可隨意提交 issue 至 [Github](https://github.com/hoothin/UserScripts/)。請幫我點亮 Star !

*對你有幫助的話，可透過 [![i](https://static.afdiancdn.com/favicon.ico) 愛發電](https://afdian.com/a/hoothin) 或者 [![i](https://ko-fi.com/favicon-32x32.png) Ko-fi](https://ko-fi.com/hoothin) 請我喝一杯奶茶。歡迎加入 [💬Discord 群組](https://discord.com/invite/keqypXC6wD)。*

![donate](https://s2.loli.net/2023/02/06/afTMxeASm48z5vE.jpg)

[怠惰小説下載器 ZIP 擴充](https://greasyfork.org/scripts/476943) 下載時分章節保存 TXT 並打包為 ZIP

[圖片驗證碼辨識](https://github.com/hoothin/ImgCodeCheck) 開啟`保留內文圖片的網址`後配合 ZIP 擴充可自動轉換圖片文字，詳閱[愛發電](https://afdian.net/p/c7fc3abc8e8411ee9b1852540025c377)

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
 下載內容可能含有幹擾碼，此時只需點擊**懶人小說下載設置**，輸入幹擾碼的 css 選擇器即可排除幹擾碼。例如 `.mask,.ksam,font.jammer`，代表刪除 class 為 mask 或者 ksam 的元素或者 class 為 jammer 的 font 元素。
### 第六層心法（超難）

 倘若正文不在內頁正文，是頁面加載後處理得到的，可點擊**自定義下載**，輸入自定義代碼對內頁進行分析獲取正確結果。例如 【`眾神的風車@@@@@@var noval=JSON.parse(doc.querySelector("#meta-preload-data").content).novel;noval[Object.keys(noval)[0]].content;`】，即可通過自定義代碼處理返回頁面獲取內容。代碼中使用 doc 可以獲得返回頁面的 document，最後一個表達式的值為最終寫入的內容。
 
 如果返回 false，代表異步回調，可自行抓取內容並等待抓取成功後用 cb(content) 返回抓取到的 content。

 倘若章節沒有連結，點擊後方纔生成連結跳轉，可通過 `>>` 管道處理抓取到的元素生成章節連結，詳情見下方例子。
### 第七層心法（極難）

 倘若正文已經經過加密，需要解密才能獲取正確內容，可打開瀏覽器的控製臺，自定義 dacProcess 函數，調取頁面中網站自身的解密代碼處理抓取的加密數據。例如控製臺輸入`dacProcess=data=>{return decrypt(xxx);}` 代表調用網站的 decrypt 解密章節頁面返回的數據。然後再點擊**自定義下載**，需要注意自定義下載時標記章節是必需的。

### 關於配置項
 **【以下功能需要通過 Tampermonkey 等管理器的命令菜單進入】**

![img](https://greasyfork.s3.us-east-2.amazonaws.com/grg0pe1t13eth8t012bd1absp9id)
 - 自定義目錄：如`https://xxx.xxx/book-**[20-99]**.html,https://xxx.xxx/book-**[01-10]**.html`，意思為下載book-20.html到book-99.html，以及book-01.html到book-10.html，使用**[1-10]**則不補0。
 - 章節選擇器自定義：輸入章節連結的 css 選擇器即可，後面可以接上 url 替換碼、以及自定義處理代碼。
 - 幹擾碼：填入幹擾碼的 css 選擇器，如`.mask,.ksam`，意為刪除 class 為 mask 或者 ksam 的元素。
 - 按標題名重新排序：是則把目錄頁所有連結按標題名排序後存入txt，否則按頁面位置順序排列。
 - 下載線程數：同時下載的線程數，默認為20，遇到存在限製的站點(例如下載時總有章節獲取失敗)可調低。

### 完整格式說明
<code>某個章節名 / CSS 選擇器【選擇器後可跟 >> 傳入 item 處理】 **@@** 抓取到 URL 的正則匹配 **@@** 正則替換 URL **@@** 根據爬取返回內容 data 處理並返回最終文本</code>
#### 内頁處理範例
假設章節元素為 `a.links`
+ 使用 iframe 處理内頁内容
  `a.links@@@@@@iframe:`
 - iframe 添加 sandbox
   `a.links@@@@@@iframe:sandbox:{allow-same-origin}`
 - iframe 添加初始化程式碼
   `a.links@@@@@@iframe:init:{win.top=win.self}`
+ 自定義内頁中分頁抓取方式
  - 透過選擇器抓取
    `a.links@@@@@@next:{a.next}`
  - 透過程式碼生成
    `a.links@@@@@@next:{return await getNextElement()}` 可以用多層 `{}` 來避免程式碼中出現大括號產生的問題

<a id="example"></a>
### 自定義下載範例，打開目錄頁點擊【自定義下載】粘貼後使用，僅爲規則實例引導，有出入請自行修改
+ [📕po18](https://www.po18.tw/books/755779/articles)
> 章節的選擇器為 `.l_chaptname>a` ，輸入並下載後發現通過 url 無法下載正文內容，正文是 ajax 通過 articlescontent 下載的。此時可後接 `@@articles@@articlescontent` (@@ 分隔) 將章節 url 中的 articles 替換為 articlescontent 。 `.l_chaptname>a@@articles@@articlescontent` 粘貼進命令菜單即可下載。其中第一個 articles 可使用正則，例如 `@@articles(\d+)@@$1content` 代表將連結中的「articles1」「articles2」等替換為「1content」「2content」。
 ``` css
.l_chaptname>a@@articles@@articlescontent
 ```
 > 如果需要下載已購買的vip章節，用這個規則
 ``` javascript
 a.btn_L_blue>>let a=document.createElement("a");a.innerText=item.parentNode.parentNode.querySelector('.l_chaptname').innerText;a.href=item.href;return a;@@articles@@articlescontent
 ```
+ [📕pixiv](https://www.pixiv.net/novel/series/7807554)
> p站小說的章節選擇器為`main>section ul>li div>a`，無需替換連結，因此後兩項留空。有6個@了 😂。正文在meta裡，需要自定義代碼提取meta-preload數據的content項。其中 "doc" 代表抓取網頁的document對象，若返回的是純文本，則用 `doc.body.innerText` 獲取。
 ``` javascript
main>section ul>li div>a@@@@@@var noval=JSON.parse(doc.querySelector("#meta-preload-data").content).novel;noval[Object.keys(noval)[0]].content;
 ```
+ [📕紅薯中文網](https://g.hongshu.com/chapterlist/91735.do)
> 這個站沒有目錄連結，此時可以遍歷標籤自己創建目錄連結下載
 ``` javascript
ul#lists>li>>let href=item.getAttribute("onclick").replace(/.*(http.*html).*/,"$1"),innerText=item.querySelector("span").innerText;return {href:href,innerText:innerText};@@@@@@let rdtext=data.querySelector('div.rdtext');let sc=data.querySelector('div.ewm+script');if(sc&&rdtext){let code=sc.innerText.replace(/for\(var i=0x0;i<words.*/,"window.words=words;");eval(code);[].forEach.call(rdtext.querySelectorAll('span[class]'),span=>{let id=span.className.replace(/[^\d]/ig,"");span.innerText=words[id]}),rdtext.innerText};
 ```
+ [📕yuyan](https://yuyan.pw/)
 ``` css
https://yuyan.pw/novel/xxx/[xxxxxxx-xxxxxxx].html@@@@@@var c=data.querySelector('body>script:nth-of-type(8)').innerHTML.match(/var chapter =(.*?);\\n/)[1];eval(c).replaceAll("<br />","");
 ```
+ [📕翠微居](https://www.cuiwei.org/book/28975/yijiequanyuledashi_mulu.html)
 ``` javascript 
 .chapter-table>a@@@@@@fetch(data.querySelector("div.box-border>script").innerHTML.match(/\/chapter\/(.*?)"/)[0]) .then(response => response.text()) .then(d => {eval("window.txtObj="+d.match(/_txt_call\((.*)\);/)[1]);for(k in txtObj.replace){txtObj.content=txtObj.content.replaceAll(txtObj.replace[k],k)}cb(unescape(txtObj.content.replace(/&#x(.*?);/g,'%u$1')));});return false;
 ```
+ [📕某乎](https://www.某乎.com/xen/market/remix/paid_column/1465280726219968513)
> 此頁章節沒有連結，使用以下規則可獲取章節連結，僅可下載免費可見内容，付費内容請自充會員。具體操作請自行摸索，後果自負。
 ``` javascript
 [class^=ChapterItem-root]>>let a=document.createElement("a");let pre=`https://${location.host}/market/paid_column/${location.href.replace(/\D*(\d+)$/,"$1")}/section/`;a.href=pre+JSON.parse(item.dataset.zaExtraModule).card.content.id;a.innerText=item.querySelector("div").innerText;return a;
 ```
+ [📕腐女屋](http://m.funvwu.com/)
 ``` javascript
 .chapterList>ul>li>a>>let href=item.href.replace(/.*goChapter\((\d+)\)/,"/noval/"+localStorage.booklist+"/$1.html");item.href=href;return item;
 ```
+ [📕若初文學網](https://www.ruochu.com/chapter/146456)
 ``` javascript
 ul.float-list>li>a@@www\\.ruochu\\.com/book/\d+/(\d+)@@a.ruochu.com/ajax/chapter/content/$1@@var content = data.body.innerText.match(/"htmlContent":"(.*)","status"/);if(!content)console.log(data.body.innerText);else{content=content[1];content.replace(/\\r/g,'\n')}
 ```
+ [📕明月中文網](https://www.56bok.com/list/27/27742.html)
 ``` javascript 
 ul.readlist>li>a>>let href=item.getAttribute("onclick").replace(/.\*open\\('(.\*)','.\*/,"$1");item.href=href;return item;
 ```
+ [📕東北人小説網](https://www.dbrxs.org/86/86323/)
> 此站有內分頁，故需要使用異步方法，抓取內容後暫不返回，待請求所有分頁內容再拼接後一起返回。
 ``` javascript
 .chapterList li>a>>item.href=item.href.replace(/.*gotochapter\('(\d+)','(\d+)','(\d+)'\).*/,"/$1/$2/$3.html");return item;@@@@@@let content=data.querySelector('#contentinfo,#ChapterView>div:nth-child(3)>div');if(!content)return data.body.innerText;content.innerHTML=content.innerHTML.replace(/<br>/g,"\n");content=content.innerText;let pages=data.querySelectorAll(".chapterPages>a:not(.curr)");if(pages){let num=pages.length,cur=0;content=[content];[].forEach.call(pages, (page,i)=>{let url=page.href.replace(/.*\((\d+),(\d+),(\d+),(\d+)\).*/,"/$1/$2/$3_$4.html");fetch(url).then(r => r.text()).then(d => {let doc = document.implementation.createHTMLDocument(''); doc.documentElement.innerHTML = d;let c=doc.querySelector('#contentinfo,#ChapterView>div:nth-child(3)>div');if(c){c.innerHTML=c.innerHTML.replace(/<br>/g,"\n"); content[i+1]=c.innerText;if(++cur>=num)cb(content.join("\n"));} }); });return false;}return content;
 ```
+ [📕暢讀小説網](https://www.cdxsw.cc/53/53458/)
> 此站同樣有內分頁，不同之處在於它的內分頁需要加載後才能知道是否存在，故同樣異步返回，並且回調fetch直至分頁全部分析完
 ``` javascript
.section-list>li>a@@@@@@let content="";let checkContent=(doc,over)=>{word=doc.querySelector('.word_read');if(!word)content+='\n'+doc.body.innerText;else [].forEach.call(word.querySelectorAll('p,h3'),c=>content+='\n'+c.innerText);let next=doc.querySelector(".read_btn>a:nth-child(4)");if(next&&/_\d\.html/.test(next.href)){fetch(next.href).then(r => r.text()).then(d => {let _doc = document.implementation.createHTMLDocument('');_doc.documentElement.innerHTML = d;checkContent(_doc,over);});}else over();};checkContent(data,()=>{cb(content)});return false;
 ```
+ [📕lofter](https://kuencar.lofter.com/view)
> 此站包含雜項博文，故需要手動抓取篩選並且排序後下載
 ``` javascript
body>>let title="俞亮/時光",chs=[];item.querySelectorAll("ul.list>li>a").forEach(a=>{if(a.children[0].innerText.indexOf(title)!=-1)chs.push(a)});return chs.reverse();
 ```
+ [📕頂點小説網](https://m.biqugeu.net/booklist/20128662.html)
> 此站同11項
 ``` javascript
.book_last>dl>dd>a:not([style])@@@@@@let content="";let checkContent=(doc,over)=>{word=doc.querySelector('#chaptercontent');if(!word)content+='\n'+doc.body.innerText;else {word.innerHTML=word.innerHTML.replace(/<br>/g,'\n');content+='\n'+word.innerText;}let next=doc.querySelector("#pb_next");if(next&&/_\d\.html/.test(next.href)){fetch(next.href).then(r => r.arrayBuffer()).then(d => {let decoder = new TextDecoder("gbk");let text = decoder.decode(d);let _doc = document.implementation.createHTMLDocument('');_doc.documentElement.innerHTML = text;checkContent(_doc,over);});}else over();};checkContent(data,()=>{cb(content)});return false;
 ```
+ [📕宅男小説網](http://www.zhainanxs.com/mytool/getChapterList/)
> 此站目錄鏈接被隱藏了，因此需要手動構造，同10項。但是因為此站文字被占位圖片替換了，因此需要有人整理對照表，否則缺字。如若在設置中開啓`保留內文圖片的網址`，配合 zip 擴展使用，可以將圖片全部保存在 zip 中，此時使用 OCR 識別程式（例如[ImgCodeCheck](https://github.com/hoothin/ImgCodeCheck/)），即可獲取對應文字，批量替換即可。
 ``` javascript
#list-chapterAll>dd>a>>item.href=item.href.replace(/.*book\('(\d+)','(\d+)'\).*/,"/go/$1/$2.html");return item;@@@@@@let content=data.querySelector('h1~div');if(!content)return data.body.innerText;content.innerHTML=content.innerHTML.replace(/<br>/g,"\n");content=content.innerText;let pages=data.querySelectorAll(".chapterPages>a:not(.curr)");if(pages){let num=pages.length,cur=0;content=[content];[].forEach.call(pages, (page,i)=>{let url=page.href.replace(/.*'(\d+)','([\d_]+)'.*/,"/go/$1/$2.html");fetch(url).then(r => r.text()).then(d => {let doc = document.implementation.createHTMLDocument(''); doc.documentElement.innerHTML = d;let c=doc.querySelector('h1~div');if(c){[].forEach.call(c.querySelectorAll("img[src]"), img => { let imgTxt=`![img](${location.origin+img.getAttribute("src")})`; let imgTxtNode=document.createTextNode(imgTxt); img.parentNode.replaceChild(imgTxtNode, img); });c.innerHTML=c.innerHTML.replace(/<br>/g,"\n"); content[i+1]=c.innerText;if(++cur>=num)cb(content.join("\n"));} }); });return false;}return content;
 ```
+ [📕免費小説網](http://www.huazhuangsheying.com/book/3659/)
> 也是有分頁，fetch後簡單處理一下就ok。
 ``` javascript
.section-box+h2+.section-box>.section-list>.book-item>a@@@@@@let content=data.querySelector('#content');if(!content)return data.body.innerText;if(content.children[0].tagName=='DIV')content.removeChild(content.children[0]);content.innerHTML=content.innerHTML.replace(/<br>/g,"\n");content=content.innerText;let nextpage=data.querySelector(a[href$="_2.html"]);if(nextpage){fetch(nextpage.href).then(r => r.text()).then(d => {let doc = document.implementation.createHTMLDocument(''); doc.documentElement.innerHTML = d;let c=doc.querySelector('#content');if(c){if(c.children[0].tagName=='DIV')c.removeChild(c.children[0]);c.innerHTML=c.innerHTML.replace(/<br>/g,"\n"); content+=c.innerText;}cb(content);});return false;}return content;
 ```
+ [📕海棠文化](https://haitbook.com/?act=showinfo&bookwritercode=EB20160922203907769482&bookid=67166&pavilionid=a)
> token在頁面中，直接match拿到然後請求了事。
 ``` javascript
.uk-list>li>a@@@@@@let contentMatch=data.body.innerHTML.match(/url: '\/showpapercolor.php',[\s\S]*?paperid:\s*'(\w+)',\s*vercodechk:\s*'(\w+)'/);if(!contentMatch)return "";$.ajax({url: '/showpapercolor.php',type: 'POST',data: { paperid: `${contentMatch[1]}`, vercodechk: `${contentMatch[2]}`},error: function (xhr) {cb("");},success: function (colorresponse) {cb(colorresponse.replace(/<img.*?>/,"").replace(/<br \/>/g,""))}});return false;
 ```
+ [📕樂文網](https://www.mylewen.com/book/183921/catalog/)
> 分兩段，前半明文，後半加密，調用頁面自身方法解密后拼接。
 ``` javascript
.BCsectionTwo-top-chapter>a@@@@@@let content=doc.querySelector("#C0NTENT");let r="\n",ps=content.querySelectorAll("p");for(let i=0;i<ps.length;i++){let p=ps[i];if(p.style.cssText)break;else r+=p.innerText+"\n"};let script=content.nextElementSibling;let other=script.innerText.match(/html\(d\((".*?"), "(.*?)"\)\);/);let a=JSON.parse(other[1]),b=other[2];let cryptojs=document.createElement("script");cryptojs.src="/assets/js/cryptojs.min.js";cryptojs.charset="UTF-8";cryptojs.onload=()=>{function d(a, b) { b = CryptoJS.MD5(b).toString(); var d = CryptoJS.enc.Utf8.parse(b.substring(0, 16)); var e = CryptoJS.enc.Utf8.parse(b.substring(16)); return CryptoJS.AES.decrypt(a, e, { iv: d, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8) };cb(r+d(a,b).replace(/<p>/g,"").replace(/<\/p>/g,"\n"));};document.head.appendChild(cryptojs);return false;
 ```
+ [📕某瓣](https://read.某瓣.com/column/64079189/)
 ``` css
 a.chapter-item
 ```
> 礙於法律問題，不會給出具體規則。只因爲有朋友詢問，所以手癢分析了一下，給出相關思路以供技術研究，請勿來問我要現成規則。後期如若有變動不再跟進。具體操作請自行摸索，後果自負。
> 首先，某瓣的内頁只有部分内容是明文，全文被加密了。每次訪問内頁，它會先檢索本地存儲中是否存在密文，如果不存在的話就去抓取密文，密文為 digest 的 sha256 加密得到。
> 因此步驟如下，首先調用 article_v2/get_reader_data, 透過表單形式提供當前章節的 aid（即爲 chapter 后的數字串），獲取 json.data 即爲密文，然後透過上方的解密方法獲取正文。正文位於 posts[0].contents 中，遍歷后讀取 data.text[0].content 拼接。
> 解密方法如下：
``` javascript
function decode(t) {
    const s = (new TextDecoder).decode(new Uint8Array([65, 69, 83, 45, 67, 66, 67]))
    	, r = (new TextDecoder).decode(new Uint8Array([99, 114, 121, 112, 116, 111]))
    	, o = (new TextDecoder).decode(new Uint8Array([115, 117, 98, 116, 108, 101]))
        , a = (new TextDecoder).decode(new Uint8Array([100, 105, 103, 101, 115, 116]))
        , h = (new TextDecoder).decode(new Uint8Array([83, 72, 65, 45, 50, 53, 54]))
        , l = (new TextDecoder).decode(new Uint8Array([105, 109, 112, 111, 114, 116, 75, 101, 121]))
        , c = (new TextDecoder).decode(new Uint8Array([100, 101, 99, 114, 121, 112, 116]))
        , u = (new TextDecoder).decode(new Uint8Array([105, 118]));
    const e = Uint8Array.from(window.atob(t), (t=>t.charCodeAt(0)))
        , i = e.buffer
        , d = e.length - 16 - 13
        , p = new Uint8Array(i,d,16)
        , f = new Uint8Array(i,0,d)
        , g = {};
    return g.name = s,
    	g[u] = p,
    	function() {
            const t = Ark.user
                , e = t.isAnonymous ? document.cookie.replace(/.*bid=(\w+).*/,"$1") : t.id
                , i = (new TextEncoder).encode(e);
            return window[r][o][a](h, i).then((t=>window[r][o][l]("raw", t, s, !0, [c])))
        }().then((t=>window[r][o][c](g, t, f))).then((t=>JSON.parse((new TextDecoder).decode(t))))
}
```

+ [📕愛發電](https://愛發電/album/afee5ce2462d11ee897e52540025c377)
> 我也是愛發電用戶，拿人手短，就不欺負它了。只給個思路，用第四層心法取 album_id 與 章節 id 去 /api/post 請求數據即可。
+ [📕頭文字小説](https://m.touwz.net/dushi/yinhezhuiluo/)
> 簡單的分頁，沒啥難點。惟一需要注意的是，分頁連結藏在 js 代碼裏，用正則取出完事。
``` javascript
.chapter>li>a@@@@@@let content="\n";let checkContent=(doc,over)=>{word=doc.querySelector('.content-div');if(!word)content+='\n'+doc.body.innerText;else {let ps=[];[].forEach.call(word.children, p=>{if(p.className!='moreinfo')ps.push(p.innerText)});content+=ps.join('\n');}let next=doc.querySelector("#pt_next");if(next){fetch(location.href+ doc.body.innerHTML.match(/'([^\|']+)\|[^']+'\.split/)[1]+".html").then(r => r.text()).then(d => {let _doc = document.implementation.createHTMLDocument('');_doc.documentElement.innerHTML = d;checkContent(_doc,over);});}else over();};checkContent(data,()=>{cb(content.replace(/\s*「如章节缺失请退#出#阅#读#模#式」\s*|\s*本章未完，点下一页继续阅读。>>>\s*/g,''))});return false;
```
+ [📕H圖書館](https://hlib.cc/s/sis-9732262)
> 簡單的分頁，可以使用簡化規則，傳入内分頁的選擇器，其餘交給脚本自動處理。
``` javascript
.list-group-item>div>a.text-decoration-none@@@@@@next:{[aria-label='后一页']+a}
```
+ [📕又一個頂點小説網](https://www.booktxts.com/book/77/77540/2.html)
> 首先遍歷目錄，生成實際鏈接，再分析頁内代碼，調用網站自身的解密函數解密内容，最後分析下一頁鏈接，把分頁内容補上。
``` javascript
.yanqing_list>li>a>>item.href=item.getAttribute('onclick').replace(/.*\((.*)\)/, location.href.replace(/\d+\.html/,'').replace('/book/','/books/')+'$1.html');return item;@@@@@@let content='';let anylize=doc=>{let contentTags=doc.body.innerHTML.match(/<script>document\.writeln\(qsbs\.bb\('(.*?)'\)\);<\/script>/g);if(!contentTags)return cb(content);contentTags.forEach(c=>{content+=qsbs.bb(c.replace("<script>document.writeln(qsbs.bb('",'').replace("'));</script>",'')).replace(/<.?p>/g,'')+'\n'}); let nextLink=doc.querySelector('.read_btn>a:last-child'); if(/\_\d+\.html/.test(nextLink.href)){ let fetchNext=()=>{return fetch(nextLink.href).then(res => res.text()).then(d=>{let _doc = document.implementation.createHTMLDocument(''); _doc.documentElement.innerHTML = d;anylize(_doc);})}; fetchNext().catch(e=>{fetchNext()}); }else{cb(content);} };let script=document.createElement('script');script.src='https://www.booktxts.com/yanqing/pc/js/yueduqsbs.js';script.type = "text/javascript";document.body.appendChild(script);script.onload=e=>{anylize(doc);};return false;
```

### 測試網頁
+ http://www.gulongbbs.com/zhentan/bdlr/plje/Index.html
+ http://www.jhshe.com/thread-1837-1-1.html
+ http://tieba.baidu.com/p/4871634479

### FAQ
- 章節沒有「第幾章第幾節」的字樣怎麼辦？ <br>
參考第二層心法輸入其中一個章節名即可
- 下載一定數量章節後抓取超時失敗怎麼辦？ <br>
可能是網站限制了並發數，在設定中調低執行緒數即可。 設為正數代表執行緒數，負數則代表間隔x秒下載一章，例如`-2`代表每隔2秒下載一章
- 按下快捷鍵沒有反應怎麼辦？ <br>
可能是快捷鍵被其他應用程式接管了，使用腳本管理器中的命令選單下載即可
- 有無關幹擾字元怎麼辦？ <br>
設定裡輸入乾擾碼css選擇器即可，多個選擇器以逗號分隔
- 章節順序不對怎麼辦？ <br>
預設是按網頁內出現位置排序。 點擊設置，嘗試更改為“按網址重新排序”或“按章節名重新排序”即可
- 章節標題有誤怎麼辦？ <br>
預設是取章節連結文字為標題，可以在設定中自訂章節標題，輸入 title 即為抓取分頁頁面的標題，輸入 h1 即為抓取分頁頁面 h1 等級的文章標題
- 下載内容不全怎麽辦？<br>
可能因爲頁内正文是動態加載的，可嘗試在設置頁勾選“下載前打開篩選窗口”，然後選中“使用 iframe 後臺加載内容”
- 抓取失敗是因為？ <br>
NETWORK ERROR 説明網路錯誤，可能是當前本機網路故障，也可能是被目標網站封鎖了 IP。 TIMEOUT 説明訪問超時，可能是因爲當前網路速率過慢或目標網站流量超限
- 其他問題歡迎透過 email 聯絡我，有空可幫你解決。

### 為啥要寫這個腳本？
主要是<img src="https://stickershop.line-scdn.net/stickershop/v1/product/8692/LINEStorePC/main.png;compress=true" width=50 alt="怠惰啊" title="怠惰啊"/>
因為我要下載馳星周的漂流街，卻發現前人的輪子「【小說】下載腳本」不能用，又不想為這破站 🙃 寫規則，而且<del>我就是看不上霸道總裁修仙穿越你咬我啊</del>指不定它三天兩頭改個版呢。寫個通用規則的腳本，一來可以不用追著數不清的小說站適配修改更新，二來也免去了法律風險。
這個腳本會自動去查找主要內容並下載，不需要寫規則。當然如果你家網站廣告內容比正文還多我也沒辦法。
遇到特殊網站還是建議用「【小說】下載腳本」。
