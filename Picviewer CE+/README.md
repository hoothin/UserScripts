# Popup/scale/rotate/batch save pictures and load pictures from next pages automatically. 

Press CTRL+g to enter gallery quickly. Hold CTRL to view larger picture when mouse over images or links.

More settings in "Picviewer CE+ config" to be customized, reviewing them is currently the best way to learn about what the script is capable of. try to seach more functions by yourself ! 

+ **Adjust:** Scale/rotate/batch save every picture

+ **View:** Find and popup large version for pictures with click or mouse over

+ **Fetch:** Auto load and parse next paginated web
 pages and show ALL pics

+ **Download:** Pictures export to page or package into ZIP

+ **Search:** Search similar image by picture

+ View long image by scroll

+ Change webp to png

+ And so on ...

If you are glad to help me translate Picviewer CE+, [come here](https://github.com/hoothin/UserScripts/blob/master/Picviewer%20CE%2B/pvcep_lang.js#L1).
It will help the people who speak the same language just like you. Thank you.

If you wish to add more rules for peculiar sites, come to [my Github](https://github.com/hoothin/UserScripts/blob/master/Picviewer%20CE%2B/pvcep_rules.js) and pull requests or open issues.

### Custom rules example for config:

**1.**
This can add click-to-open for existing asiansister rule. Place it into the '[]' of rule textarea.
<pre>
{
&nbsp;name: "asiansister",
&nbsp;clickToOpen:{
&nbsp;&nbsp;enabled:true,
&nbsp;&nbsp;preventDefault:true,
&nbsp;&nbsp;type:'actual'
&nbsp;}
}
</pre> 
<br>
<b>2.</b>
This can add large-image rule for dmm to view high-definition original images or download them.
<pre>
{
&nbsp;name: "dmm",
&nbsp;src: /pics\.dmm\.co\.jp/i,
&nbsp;r: "ps.jpg",
&nbsp;s: "pl.jpg"
}
</pre>

*Buy me a coffee with [PayPal.Me](https://paypal.me/hoothin) or [BuyMeACoffee](https://buymeacoffee.com/hoothin) to keep my scripts always up to date.*

<img src='https://v2fy.com/asset/063_picviewer_ce/72723103-d911ce00-3bba-11ea-9541-0be746977dbc.gif' width=330><img src='https://v2fy.com/asset/063_picviewer_ce/72767872-7eb35480-3c30-11ea-814d-ce4678c81089.gif' width=330><img src='https://v2fy.com/asset/063_picviewer_ce/73130353-c4598e00-4031-11ea-810e-9498677a40d1.gif' width=330>

Thousands compatible sites for find larger or original images like
--
deviantart.com
google.com
wikipedia.org
dribbble.com
bing.com
imdb.com
github.com
tumblr.com
youtube.com
pixiv.net
steampowered.com
itunes.apple.com
pinterest.com
gelbooru.com
discordapp.com
twitter.com
fandom.com
reddit.com
yande.re
wallhaven.cc
500px
nyaa
e621.net
nhentai.net
tieba.baidu.com
douban.com
weibo.com
bilibili.com
t.qq.com
huaban.com
hujiang.com
dianping.com
trakt.tv
music.163.com
rule34hentai.net
photosight.ru
boqingguan.com
178.com
zhisheji.com
themex.net
operachina.com
topit.me
bcy.net
zhihu.com
autohome.com.cn
bitauto.com
xcar.com.cn
pcauto.com.cn
auto.sina.com.cn
baike.baidu.com
nvshens.com
24meitu.com
acgget.com
lofter.com
sohu.com
taobao.com
alibaba.com
yihaodian.com
addons.mozilla.org
crsky.com
firefox.net.cn
jd.com
dangdang.com
detail.zol.com.cn
duokan.com
youku.com
yyets.com
xiaohongshu.com
moegirl.org
fanfou.com
meipai.com
game.yesky.com
dota2.sgamer.com
mafengwo.cn
588ku.com
ibaotu.com
58pic.com

And so on ...
