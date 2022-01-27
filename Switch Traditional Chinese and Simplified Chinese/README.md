+ 默認自動切換至用戶所使用的默認語言
+ `Ctrl + F8` 切換 **簡體中文** 與 **正體中文**（若輸入框為活動控件則只轉換輸入框内文字）
+ 使用命令菜單中的 「繁簡切換【Ctrl + F8】」 可於當前網域禁用轉換
+ 切換后會保存當前網站語言選擇
+ 如果想自動切換，把 `auto = false` 改爲 `auto = true` 即可
+ 轉換頁面中所有的文字內容、描述字符、提示文字等

我創建了一個sc2tc數組，裡面是一簡多繁的對照，有興趣的朋友可以修改並分享至[GITHUB](https://github.com/hoothin/UserScripts/blob/master/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese.user.js)

如果你只是有更好的繁簡對照表，也歡迎提交給我。

例如：
<pre>'恶':[
     '惡',
    ['噁','恶心'],
    ['噁','心恶','恶心心']
],</pre>
第一個 “恶” 是簡體字，第二個 “惡” 是默認轉換的正體字。<br>接下來是一個或者數個數組，指向這個簡體對應的其他正體字。<br>數組第一位為正體字字元，後面則是對應的簡體應用詞匯
<br><br>
以及一個用語轉換數組

例如：
<pre>'鼠标':'滑鼠'
</pre>
