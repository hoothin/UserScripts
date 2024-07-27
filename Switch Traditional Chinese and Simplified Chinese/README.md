簡介
---

+ 預設會自動切換至使用者所使用的語言。
+ 按下 `Ctrl + F8` 可在簡體中文與繁體中文之間切換（如果輸入框為活動控制項,則只有輸入框內的文字會被轉換;選取文字時,只有對應的文字會被轉換,且不會被記憶）。
+ 使用命令選單中的「繁簡切換【Ctrl + F8】」功能可在當前網域禁用轉換。
+ 切換語言後,會儲存目前網站的語言選擇。
+ 可轉換頁面中所有的文字內容、描述字元、提示文字、標題等。
+ 支援在漢字上方顯示對應的漢語拼音字母。
+ 支援彈幕,以及動態插入的元素。
+ 可自訂用語轉換詞典。
+ 可透過通配符自訂生效網址,以在不同網域套用不同的用語詞典。

客制化
---

[**Ch'ü Tsê-t'ien 的簡繁用語轉換配置文件**](https://hoothin.github.io/UserScripts/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese/%E7%B0%A1%E7%B9%81%E8%BD%89%E6%8F%9B%20by%20Ch'%C3%BC%20Ts%C3%AA-t'ien.json) 下載此檔案后在`自訂簡繁用語轉換`旁點擊按鈕匯入即可

我建立了一個 sc2tc 陣列,其中包含了簡體中文到繁體中文的對照表。有興趣的朋友可以修改並分享至[GITHUB](https://github.com/hoothin/UserScripts/blob/master/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese.user.js)。

如果你只是有更好的繁簡對照表，也歡迎提交給我。

例如：
<pre>'恶':[
     '惡',
    ['噁','恶心'],
    ['噁','心恶','恶心心']
],</pre>
第一個 “恶” 是簡體字，第二個 “惡” 是默認轉換的正體字。<br>接下來是一個或者數個陣列，指向這個簡體對應的其他正體字。<br>陣列第一位為正體字字元，後面則是對應的簡體應用詞匯。
<br><br>
以及一個用語轉換陣列。

例如：
<pre>'鼠标':'滑鼠'
</pre>

npm 前端庫
---

```
npm install switch-chinese
```

[訪問位址](lib)
