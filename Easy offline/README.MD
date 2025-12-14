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

### 用法
 - 按下 **`F9`** 快速在當前網站禁用或啓用並記錄選擇
 - **`Alt + F9`** 自定義下載，選中文本則下載文字對應的鏈接，鼠標指向鏈接則下載該鏈接，沒有選中則彈框粘貼鏈接下載
 - 按住 **`Ctrl + Shift`** 點擊批量離線當前頁面中所有資源（如果我給該網盤寫了批量離線功能的話），實際也沒鳥用，度盤批量離線時動不動就網絡繁忙了
 - 網盤排序功能，設置頁面拖拽圖標即可進行排序
 - 網盤設置功能，點擊圖標可設置是否啓用網盤
 - 度盤默認下載路徑設置
 - 設置頁面填入正則表達式可增加支持鏈接，可設置是否僅當鼠標經過時顯示圖標
 - **`Alt + x`** 批量複製頁面資源

### 自定義設置示例
* 安卓安裝包 `\.apk$`
* 某服裝擴展 `\.Outfit\d{4}\.txx$`
* 某ftp `^ftp:\/\/user:pass@127\.0\.0\.1`
* 某帶參mp4視頻 `mp4\?[^\/]+$`

### 自定義例子 - Github鏡像加速下載，點擊下方導入
配置方法在設置項内，有其他規則用`<pre>`標簽分享到 [反饋](https://github.com/hoothin/UserScripts/issues) 亦可點擊導入。例如此處的下載圖標：[Github](https://github.com/hoothin/imgCodeCheck/releases/tag/0.1)
<pre>
https://download.fastgit.org/${https?://[^/]+(.*)}@@Fastgit@@github\.com.*(releases\/download|archive\/refs\/)@@@@ffff9f
https://pd.zwc365.com/seturl/$url@@ZWC365@@github\.com.*(releases\/download|archive\/refs\/)@@@@0fffff
https://gh.api.99988866.xyz/$url@@99988866@@github\.com.*(releases\/download|archive\/refs\/)@@@@9fffff
https://ghproxy.com/$url@@Ghproxy@@github\.com.*(releases\/download|archive\/refs\/)@@@@ff0fff
https://github.rc1844.workers.dev${https?://[^/]+(.*)}@@RC1844@@github\.com.*(releases\/download|archive\/refs\/)@@@@ff9fff
https://ghproxy.fsou.cc/$url@@Fsou@@github\.com.*(releases\/download|archive\/refs\/)@@@@ffff0f
</pre>

### 自定義例子2 - Aria2 下載
同樣是點擊下方導入
<pre>
http://aria.hoothin.com/#!/new/$base64@@Aria2@@@@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABOFBMVEUAAADSVF7SVF7SVF7LVWDSVF7QVF/SVF7SVF7SVF7SVF7SVF7SVF7RVF7SVF7SVF7SVF7SVF7SVF7SVF7SVF7SVF7SVF5ma4Di4uLSVF7v7+9DQ0NvaX1+ZniUYXGtXGppan+cYG+TYXLs7OyyW2h4tsiVlJWxs7ylpaWgoKBwaX2JZHVRVFxNT1VNTU1KSkxGRkd0uMzKysp5tceHipjDV2JYWFrr5ufa2tvT09Pjycu9v8a5u8PCwsK+vr6rrbego6+Tp62pqamZnKmloaGjj5l5fY+MfY60gozDfIa3foJkaHzTX2hYW2i6UVluSEuK2/Pd3d7X0NLExcm1tbWRlKKbm5uohJCOjo6GhoqOeInPgIh0coV8fHx7e3vRbXbObXaNY3SgX25hYmRhYWHJVmGOTFGNTFENIl9FAAAAF3RSTlMAJNEM+vr1iQjpyFfr6pybmjLusJhyIzaw7jcAAAHlSURBVDjLfZNnU+NADIbXduyQBBLq2fK6JcQmF0gvtOOOztGv90Ln//8Ddm3txkNmeD54vNI7klYrkRFaYT6f0/Vcfr6gkXGUklH13HoQ1F2vapSUZ+6JbKbsmIzvR/zrlDPZibT/lerXTc4fuDJj6r6aCjKTq5gJZwDH+FvJzcj0U8to/A+M93hYnlIwv+qh6RhijkQMNakj66PhF8BBr3cAZwEa/GxcYMbB8284CT90whOZxMnwJKUyHvurG/thpxPub3wykXKR9c8QATZtu7YT9nZqlvVVhDA0Uqji4XDVtrdeM95a1uYhGqsFMi2usGfb9uJWrcb81toeGr1pknfxf8nmLFox79Do5smkKOFNWrAkipgkevCSINBRMJ5CCmSK7ZTg47ZMMSqyHwt+fOOCbl8WObrm0OKC4R0X7A5PxTVlo87pFy5oNrngLz0XjZKtXqH/uIBSLmjRhmw1KSaP1WIuIdiltCUfiyjJc7cp/bm2vt5qd7ufbylt43OPBoayqFEUNZtRZJ42KE0GBkeuwgUr7FIAl5cArHWNdjxyWmpomd+8AXh8ALjmNcuhTY/9AODiAsCXYy9RVN/hGRLuXVafWJz06nmAeLh6z5d3AMjAKCpkHG1hTp3V9Vl1biG1/k8fR16xKi9r1wAAAABJRU5ErkJggg==@@ff2a00
</pre>
*之所以把Aria2做成自定義是因為每個人的Aria2UI網址都不一樣，用我的伺服器管理本地的Aria2服務需要允許Chrome訪問本地資源，訪問 chrome://flags/#block-insecure-private-network-requests 並關閉即可。不想關閉的話直接打開設置把上面的網址換成自己本地的即可，例如 127.0.0.1

### 自定義例子3 - Post 請求 RPC 遠程下載
<pre>
p:http://192.168.32.1:6800/jsonrpc?id=$random&jsonrpc=2.0&method=aria2.addUri&amp;params=["token:123456",["$url"]]@@Aria2RPC@@@@@@df2a00
</pre>
導入后需要自行修改網址与 token 密鑰

### 自定義例子4 - 複製所有包含 “22590-easy-offline” 的連結為 markdown 格式
（按住 Alt 顯示圖標，使用 ctrl + shift 複製全部）
<pre>
c:[$text "$title"]($url)@@Markdown@@22590-easy-offline@@@@df2a00@@1
</pre>

### 自定義例子5 - 谷歌翻譯選中文本
默認是按住Alt鍵划選
<pre>
https://translate.google.com/?client=gtx&dj=1&q=$text&sl=auto&tl=zh-CN&hl=zh-CN&ie=UTF-8&oe=UTF-8&source=icon&dt=t&dt=bd@@Translate@@@@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAExklEQVRoge2Y+08UVxTH/dNmtYRHwNKHDW1tIWl/sK1QbFoSitXa9i642wWxKIK0ysOCLBSwBSWQslpboD54SGVNbAkB0cqjIIic+5jTH2b2gczM7o7DzpLsyfeHzeydmfM5994z555dEoEdrV22e5AEsNuDJIDdHiQB7PYgCRBpRJoLDtazggbzym9g+fX0je+oDQCfXGDL62iJCRlbhnhcAdLdsPzUGu+D9uVPLH4A+Q00Gp/WNnBhFRfXogLoGRUJB1DZyyUC+05GNbjvThLANEDPmChqYVuVU0UlAqnHoaiZBfVZQO5unigAtQNmckhuDU0UgJ9HxKEmFlShjjLcIBHI9EBhEytsZKWXEmYGojEuMKucSgTc3Szh9kA0dmdGVu69fk8kNMBXHSzDDVkeeLQsh193dzOJwMsVFLQnIGEARqfVSJdfDnm6sIppLpAInOrnejcmCgAiHmpiEoGXSuHvf9VJIF1MIpBSBg83T0uCAvjn5D2lIBH44BxlHPsnhIOARKCyVzf8iQWAgW+wRKDEy1KPg0TgtUq6Yli9xhWgIBLAM4q5NaEqf7cThu5rJx97AAobdVJJwGaX5APnQgBpLuif0AaQA5qal1sGeTRqHuTFFyPX3iYBGMeLwyLdHYq98iOlDB6vGFPHZq3DEeqXmAG4wF//EuErp7iVPViSm37naS4gXREmLVaTEd85Y3QWjQFgbQM7b25yfW857R0XwZQ5syiPTOsmUNNW2Gi0kGIAuOYXjsBScTiBdLEoT2GJAoCI3/v4nlIo8TL/nPWRjgeAkHFhFSnHF2lVzD/BsWl5bFqemJE3oigXzQN8rLWJKccSL3v3DJ1fNTkJ4Y2JlkGjz/aLAmz9EiveK//ur6bzT2JmWFzDlLLQK/JqI0+BeYC3TtNwB8O9N81w4Q81r795Ss1mE7MRnmAeQCLQfoPreW+CQZbx7dNUIpBdQe8+kJXiT+/sZg2Ag8DRdtY7Lr5oYxKBTI/GmP3V1Dcprk6Kq5NidskI5taUWghV93NE/PA8lQhkuOEpbBvAc+qbEAUNRo9r+9NoU37dySQCDidML8iI+MuIytM9alQCWglw/Z5YBzRgMABYWUel5D5Yr27ctQ31BPfReaNVZCXANb9AxHXAombth3qHdQHab6jbtycs3sohzuGEqXndtWclwG9+9d2M42GtPf3KCfrPY21X3q+jEoH0zSv+9pR6tq7q0yXfFgCFQYnfVoa5/55n8M+pju47Sb/t4UG5urlyLs2uoFQHwUqADDfdWx5Slke70M2pog83M1RcjtyWHLirvZWtBIheOVU02Jt4RlFBdRA4cYWf9fE6H6/z8doBXjvAP29V/fv0R+2tbA+AwvBoRUbEK+Nqujzwg0bhsLKOqS6QCOx2wta1ZydAbg1VDgz5gbTbdUt7mX/TqQ6o82kMsAcgt4YuriIizizKWeWQ6YHsCtDruAzdF5keyPRAXi0VW+bABoC8QOwtsXgDBGO/IwHyauiCpd7HG8C4mNsBAMWtFveFgOGrlWb7QibkINBxM0J7NCbvnZcidBe3JQu9d5Ye62DhOtqurcNtrMTLSrzsyObrxzrYkXb2umHstxEgnkoC2K0kgN1KAtitJIDd+h//4oa1H68RnAAAAABJRU5ErkJggg==@@4085f9
</pre>

### 自定義例子6 - 去除選中連結中的表情漢字並跳轉
默認是按住Alt鍵劃選，比如h❤ttps://補丁baidu.😀com
<pre>
$text{[^\w\-_\.~!\*'();:@&=\+\$,\/\?#\[\]%]}@@GetLink@@@@@@f9ff9f
</pre>

### 自定義例子7 - Post 請求 OpenList（原AList）遠程下載
<pre>
p:https://alist.domain.com/api/fs/add_offline_download?path=/115网盘/OpList离线下载&tool=115%20Cloud&delete_policy=delete_on_upload_succeed&urls=["$url"]$headers{"Content-Type": "application/json","Authorization": "alist-50a563b4-and-more-token-chars", "Accept": "*/*", "Host": "alist.domain.com", "Connection": "keep-alive"}@@OpenList@@@@@@df2a11
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
