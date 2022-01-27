一鍵離線下載
=
在磁力鏈接(magnet)\種子(torrent)\電驢(ed2k)\視頻\壓縮包或其他下載鏈接旁添加按鈕，點擊自動離線下載至網盤

### 默認支持鏈接
* 磁力鏈接
* 電驢鏈接
* 種子文件
* 壓縮包 `rar 7z zip`
* 鏡像文件 `iso`
* 視頻文件 `mp4 rmvb mkv avi`

### 自定義設置示例
* 安卓安裝包 `\.apk$`
* 某服裝擴展 `\.Outfit\d{4}\.txx$`
* 某ftp `^ftp:\/\/user:pass@127\.0\.0\.1`
* 某帶參mp4視頻 `mp4\?[^\/]+$`

### 自定義例子 - Github鏡像加速下載，點擊下方導入
配置方法在設置項内，有其他規則用`<pre>`標簽分享到反饋亦可點擊導入。例如此處的下載圖標：[Github](https://github.com/hoothin/imgCodeCheck/releases/tag/0.1)
<pre>
https://download.fastgit.org/${https?://[^/]+(.*)}@@Fastgit@@github\.com.*(releases\/download|archive\/refs\/)@@@@ffff9f
https://pd.zwc365.com/seturl/$url@@ZWC365@@github\.com.*(releases\/download|archive\/refs\/)@@@@0fffff
https://gh.api.99988866.xyz/$url@@99988866@@github\.com.*(releases\/download|archive\/refs\/)@@@@9fffff
https://ghproxy.com/$url@@Ghproxy@@github\.com.*(releases\/download|archive\/refs\/)@@@@ff0fff
https://github.rc1844.workers.dev${https?://[^/]+(.*)}@@RC1844@@github\.com.*(releases\/download|archive\/refs\/)@@@@ff9fff
https://ghproxy.fsou.cc/$url@@Fsou@@github\.com.*(releases\/download|archive\/refs\/)@@@@ffff0f
</pre>

### 自定義例子2 - Aria2下載
同樣是點擊下方導入
<pre>
http://aria.hoothin.com/#!/new/$base64@@Aria2@@@@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABOFBMVEUAAADSVF7SVF7SVF7LVWDSVF7QVF/SVF7SVF7SVF7SVF7SVF7SVF7RVF7SVF7SVF7SVF7SVF7SVF7SVF7SVF7SVF7SVF5ma4Di4uLSVF7v7+9DQ0NvaX1+ZniUYXGtXGppan+cYG+TYXLs7OyyW2h4tsiVlJWxs7ylpaWgoKBwaX2JZHVRVFxNT1VNTU1KSkxGRkd0uMzKysp5tceHipjDV2JYWFrr5ufa2tvT09Pjycu9v8a5u8PCwsK+vr6rrbego6+Tp62pqamZnKmloaGjj5l5fY+MfY60gozDfIa3foJkaHzTX2hYW2i6UVluSEuK2/Pd3d7X0NLExcm1tbWRlKKbm5uohJCOjo6GhoqOeInPgIh0coV8fHx7e3vRbXbObXaNY3SgX25hYmRhYWHJVmGOTFGNTFENIl9FAAAAF3RSTlMAJNEM+vr1iQjpyFfr6pybmjLusJhyIzaw7jcAAAHlSURBVDjLfZNnU+NADIbXduyQBBLq2fK6JcQmF0gvtOOOztGv90Ln//8Ddm3txkNmeD54vNI7klYrkRFaYT6f0/Vcfr6gkXGUklH13HoQ1F2vapSUZ+6JbKbsmIzvR/zrlDPZibT/lerXTc4fuDJj6r6aCjKTq5gJZwDH+FvJzcj0U8to/A+M93hYnlIwv+qh6RhijkQMNakj66PhF8BBr3cAZwEa/GxcYMbB8284CT90whOZxMnwJKUyHvurG/thpxPub3wykXKR9c8QATZtu7YT9nZqlvVVhDA0Uqji4XDVtrdeM95a1uYhGqsFMi2usGfb9uJWrcb81toeGr1pknfxf8nmLFox79Do5smkKOFNWrAkipgkevCSINBRMJ5CCmSK7ZTg47ZMMSqyHwt+fOOCbl8WObrm0OKC4R0X7A5PxTVlo87pFy5oNrngLz0XjZKtXqH/uIBSLmjRhmw1KSaP1WIuIdiltCUfiyjJc7cp/bm2vt5qd7ufbylt43OPBoayqFEUNZtRZJ42KE0GBkeuwgUr7FIAl5cArHWNdjxyWmpomd+8AXh8ALjmNcuhTY/9AODiAsCXYy9RVN/hGRLuXVafWJz06nmAeLh6z5d3AMjAKCpkHG1hTp3V9Vl1biG1/k8fR16xKi9r1wAAAABJRU5ErkJggg==@@ff2a00
</pre>
*之所以把Aria2做成自定義是因為每個人的Aria2UI網址都不一樣，用我的伺服器管理本地的Aria2服務需要允許Chrome訪問本地資源，訪問 chrome://flags/#block-insecure-private-network-requests 並關閉即可。不想關閉的話直接打開設置把上面的網址換成自己本地的即可，例如 127.0.0.1

### 自定義例子3 - Post請求RPC遠程下載
<pre>
p:http://192.168.32.1:6800/jsonrpc?id=$random&jsonrpc=2.0&method=aria2.addUri&params=["token:123456",["$url"]]@@Aria2RPC@@@@@@df2a00
</pre>
導入后需要自行修改網址与 token 密鑰

### 自定義例子4 - 複製所有包含 “22590-easy-offline” 的連結為 markdown 格式（按住 ctrl 顯示圖標，使用 ctrl + shift 複製全部）
<pre>
c:[$text "$title"]($url)@@Markdown@@22590-easy-offline@@@@df2a00@@1
</pre>


### Update
 - **`Alt + F9`** 自定義下載，選中文本超鏈則下載文本超鏈，鼠標指向鏈接則下載鏈接，沒有選中則彈框輸入鏈接下載
 - 按住 **`Ctrl + Shift`** 點擊批量離線當前頁面中所有資源（如果我給該網盤寫了批量離線功能的話），實際也沒鳥用，度盤批量離線時動不動就網絡繁忙了
 - 添加度盤默認下載路徑設置
 - 添加網盤設置功能，點擊圖標可設置是否啟用網盤
 - 添加網盤排序功能，設置頁面拖拽圖標即可進行排序
 - 添加設置項，填入正則表達式可增加支持鏈接，可設置是否僅當鼠標經過時顯示圖標
 - 按下 **`F9`** 快速在當前網站禁用或啟用並記錄選擇
 - 離線時將32位磁力鏈接轉換為40位磁力鏈接，便於網盤識別動漫花園之類的資源
 - 修復百度網盤超級vip問題，感謝Psnowy

---
![img1](https://greasyfork.s3.us-east-2.amazonaws.com/s1beg1iderkn42jq7yl8ogg3z4pr)

### 支持服務
* 百度網盤 http://pan.baidu.com
* 115 http://115.com
* Furk http://www.furk.net
* Seedr http://www.seedr.cc
* 迅雷離線 http://lixian.xunlei.com
* Pcloud http://www.pcloud.com
* 小米路由器 http://miwifi.com
* 騰訊微雲 http://weiyun.com
* 九秒雲播 http://apiv.ga
* Torrent.org http://torrent.org.cn
