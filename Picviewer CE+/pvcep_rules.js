/*
PVCEP - Rules for Picviewer CE+
<https://github.com/hoothin/UserScripts/blob/master/Picviewer%20CE%2B/pvcep_rules.js>

(c) 2021-2022 Hoothin <rixixi [at] gmail.com>
Licenced under the MIT license.

最少僅需
{
 name: 站點名
 r: 圖片地址正則或者待替換字符串
 s: 替換目標字符串
}
或者
{
 name: 站點名
 getImage: 指向圖片時的地址替換函數，詳情見下方例子
}
其他參數項按需添加即可。
需要注意 css/ext/xhr/lazyAttr（懶加載的原圖 URL 屬性名）/description（收藏圖片時的描述，支持選擇器或 xpath）/clickToOpen 在指定站點 URL 之後方可使用
xhr 為內頁圖片獲取屬性，配合 getImage 使用。
    1. 首先使用 getImage 篩選並返回父級 a 標籤的 url，然後腳本會自動抓取該 url 指向的網頁。
    2. 透過 xhr 獲取圖片。
        2.1 其中 xhr.q 為圖片（可以為多張，多張將添加到圖庫）的選擇器或者函數
        2.2 xhr.c 為圖片的文字描述，抓取方式同上
如果鼠標指向對象非圖片，可使用 getExtSrc 生成想要的圖片地址，詳情見下方 youtube 例子

#####################################################################################

minimum
{
  name: site name
  r: regular image url or string to be replaced
  s: replacement target string
}
or
{
  name: site name
  getImage: The address replacement function when pointing to an image, see the example below for details
}
Other parameter items can be added as needed.
you need to pay attention to css/ext/xhr/lazyAttr (lazy loaded original image URL attribute name)/description (description when collecting images, support selector or xpath)/clickToOpen in the specified site URL available after
xhr is used to obtain the attributes of the pictures on the inner pages. It is used together with getImage. 
    1. First, use getImage to filter and return the url of the parent a tag, and then the script will automatically grab the webpage pointed to by the url.
    2. And get pictures through xhr.
        2.1 xhr.q is the picture (you can For multiple, multiple will be added to the gallery) selector or function
        2.2 xhr.c is the description of picture
If the mouse points to an object other than a picture, you can use getExtSrc to generate the desired picture url, see the youtube example below for details
 */
var siteInfo = [
{
 name: "google 图片搜索",
 
 //網址例子 ( 方便測試和查看 )
 example: "http://www.google.com.hk/search?q=firefox&tbm=isch",
 
 //是否啟用
 enabled: true,
 
 //站點正則，匹配站點url該條規則才會生效
 url: /https?:\/\/www.google(\.\w{1,3}){1,3}\/search\?.*&tbm=isch/,
 
 //鼠標點擊直接打開（僅當高級規則的getImage()或者r/s替換有返回值的時候生效）
 clickToOpen: {
     enabled: false,
     preventDefault: true,//是否嘗試阻止點擊的默認行為（比如如果是你點的是一個鏈接，默認行為是打開這個鏈接，如果是true，js會嘗試阻止鏈接的打開(如果想臨時打開這個鏈接，請使用右鍵的打開命令)）
     button: 0,//0：鼠標左鍵 1：滾輪按鈕或中間按鈕（如果有） 2：鼠標右鍵。默認為 0
     alt: false,//是否需要按下alt鍵
     ctrl: false,//是否需要按下ctrl鍵
     shift: false,//是否需要按下shift鍵
     meta: false,//是否需要按下meta鍵
     type: 'actual',//默認的打開方式: 'actual'(彈出,原始圖片) 'magnifier'(放大鏡) 'current'(彈出,當前圖片)
 },
 
 //獲取圖片實際地址的處理函數,
 //this 為當前鼠標懸浮圖片的引用,
 //第一個參數為當前圖片的父元素中第一個a元素(可能不存在)
 //第二個參數為保存當前圖片所有父元素的數組
 getImage: function(a) {
     if(!a) return;
     let jsaction = a.getAttribute("jsaction");
     if (!jsaction || jsaction.indexOf('touchstart') == -1) return;
     if (a.href.match(/imgurl=(.*?\.\w{1,5})&/i)) {
         return decodeURIComponent(RegExp.$1);
     } else {
         var fakeEvent = new TouchEvent('touchstart', {bubbles: true});
         a.dispatchEvent(fakeEvent);
         fakeEvent = new TouchEvent('touchend', {bubbles: true});
         a.dispatchEvent(fakeEvent);
         if (a.href.match(/imgurl=(.*?\.\w{1,5})&/i)) {
             return decodeURIComponent(RegExp.$1);
         }
     }
 }
 
 // 自定義樣式
 // css: '',
 
 // 如果圖片藏在非img標籤後面，使用此項獲取被遮擋的img元素。
 // 其中previous代表前面一個元素，previous-2代表前面第二個元素，next代表後面一個元素。
 // 或者直接用函數獲取，傳入當前元素，返回查找到的元素或是null。
 // ext: 'previous-2',
 
 // 排除的圖片正則
 // exclude: /weixin_code\.png$/i,
 
 // 需要替換的圖片正則，匹配上圖片url該條規則才生效
 // src: /avatar/i,
 
 // 正則或字符串檢測內容，可以為含有多組規則的數組，若為字符串則只進行字符串替換
 // r: /\?.*$/i,
 
 // 正則或字符串替換內容，可以與上一條一一對應，也可以以數組對應檢測正則的其中一條，比如希望有多個結果嘗試顯示原圖
 // s: ''
},
{
 name: "123rf",
 url: /123rf\.com/,
 r: /us\.123rf\.com\/\d+wm\//i,
 s: "previews.123rf.com/images/"
},
{
 name: "126",
 src: /\.126\.net/i,
 r: /\/\d+\.\d+x\d+\.\d+\.([^\.]+)$/i,
 s: '/5.5000x5000.100.$1'
},
{
 name:"178.com",
 enabled:true,
 url:/^https?:\/\/(?:\w+\.)+178\.com\//i,
 clickToOpen:{
     enabled:true,
     preventDefault:true,
     type:'actual',
 },
 getImage:function(a){
     if(!a)return;
     var reg=/^https?:\/\/(?:\w+\.)+178\.com\/.+?(https?:\/\/img\d*.178.com\/[^.]+\.(?:jpg|jpeg|png|gif|bmp))/i;
     return (a.href.match(reg) || [])[1];
 }
},
{
 name: "24meitu",
 url: /24meitu\.com|25meinv\.com|aisimeinv\.com|24tupian\.com|24meinv\.|24mntp\.|24cos\.|24fh\.|24shipin\.|24mn\./,
 r: [/\/m([^\/]+)$/i,
    /imgs\./i],
 s: ["/$1","bimg."]
},
{
 name: "bing 图片搜索",
 example:"http://cn.bing.com/images/search?q=%E7%BE%8E%E5%A5%B3",
 enabled:true,
 url: /^https?:\/\/[^.]*\.bing\.com\/images\//i,
 getImage:function(a){
     if (!a) return;
     var oldsrc=this.src;
     var $ = /,imgurl:"([^"]+)/.exec(a.getAttribute('m'));
     var newsrc= $ ? $[1] : '';
     if(newsrc!=oldsrc)return newsrc;
 }
},
{
 name:"百度贴吧",
 enabled:true,
 url:/^https?:\/\/tieba\.baidu\.[^\/]+\//i,
 r: [/\/sys\/portrait/i,
     /^(http:\/\/tiebapic\.baidu\.com\/forum\/)ab(pic\/item\/[\w.]+)/i],
 s: ["/sys/portraitl", "$1$2"],
 getImage: function(a, p, rule) {
   rule.stopXhr = true;
   let pid = this.src.match(/\.baidu\.com\/forum\/w.*\/(\w+)\./);
   if (!pid) return null;
   pid = pid[1];
   let tid = 0;
   let tidm = location.href.match(/\/p\/(\d+)/);
   if (tidm) tid = tidm[1];
   if (tid) {
    let kw = document.querySelector(`#wd2`);
    if (kw && kw.value) {
     rule.stopXhr = false;
     return `https://tieba.baidu.com/photo/bw/picture/guide?kw=${kw.value}&tid=${tid}&pic_id=${pid}&see_lz=0&from_page=0&alt=jview`;
    }
   }
   let bsrc = this.getAttribute('bpic');
   return bsrc || null;
 },
 xhr: {
     q: function(html, doc, url) {
        let data = JSON.parse(html);
        if (!data) return null;
        let pid = url.match(/&pic_id=(\w+)/)[1];
        for (let key in data.data.pic_list) {
         let pic = data.data.pic_list[key];
         if (pic.img.screen.id == pid) return pic.img.screen.waterurl;
        }
        return null;
     }
 }
},
{
 name: "百度图片搜索",
 example: "http://image.baidu.com/i?ie=utf-8&word=%E9%A3%8E%E6%99%AF&oq=%E9%A3%8E%E6%99",
 enabled: true,
 url: /^https?:\/\/image\.baidu\.com\/.*&word=/i,
 getImage: function(a) {
     if (!a) return;
     var reg = /&objurl=(http.*?\.(?:jpg|jpeg|png|gif|bmp))/i;
     if (a.href.match(reg)) {
         return decodeURIComponent(RegExp.$1);
     }
 }
},
{
 name:"豆瓣",
 example:"http://movie.douban.com/photos/photo/1000656155/",
 enabled: true,
 url:/^https?:\/\/[^.]*\.douban\.com/i,
 getImage:function(){
     var oldsrc = this.src,
         newsrc = oldsrc;
     var pic = /\/view\/photo\/(?:photo|albumcover|albumicon|thumb|sqxs)\/public\//i;
     var movieCover = /\/view\/movie_poster_cover\/[si]pst\/public\//i;
     var bookCover = /\/view\/ark_article_cover\/cut\/public\//i;
     var spic = /(img\d+.douban.com)\/[sm]pic\//i;
     var ratio = /s_ratio_poster/i;
     if(/\/subject\/\d+\/discussion/.test(location.href)){
     } else if (pic.test(oldsrc)) {
         newsrc = oldsrc.replace(pic, '/view/photo/raw/public/');
     } else if (movieCover.test(oldsrc)) {
         newsrc = oldsrc.replace(movieCover, '/view/photo/raw/public/');
     } else if (bookCover.test(oldsrc)) {
         newsrc = oldsrc.replace(bookCover, '/view/ark_article_cover/retina/public/');
     } else if (spic.test(oldsrc)) {
         newsrc = oldsrc.replace(spic, '$1/lpic/');
     } else if (ratio.test(oldsrc)) {
         newsrc = oldsrc.replace(ratio, 'l');
     }
     return newsrc == oldsrc ? null : [newsrc,newsrc.replace(/photo\/raw/,"photo/photo")];
 }
},
{
 name:"bilibili",
 enabled:true,
 url:/^https?:\/\/[^.]+\.bilibili.com/i,
 ext: function(target) {
    if(target && target.parentNode){
        return target.parentNode.querySelector("img");
    }
 },
 r: /\d+_\d+\/|\d+_x\d+\.jpg$|@\d+w_\d+h.*\.webp$|_\d+x\d+\.jpg$/i,
 s: ""
},
{
 name: "deviantart",
 example: "http://www.deviantart.com",
 enabled:true,
 url:/^https?:\/\/[^.]*\.deviantart\.com/i,
 getImage:function(a, p){
     let id,self=this;
     if(p[1] && p[1].dataset.hook=="deviation_link"){
         id=p[1].href.replace(/.*?(\d+)$/,"$1");
     }else if(p[2] && p[2].dataset.hook=="deviation_link"){
         id=p[2].href.replace(/.*?(\d+)$/,"$1");
     }
     if(/\?token/.test(this.src)){
         if(!this.dataset.pvsrc && id){
             this.dataset.pvsrc="t";
             GM_xmlhttpRequest({
                 method: 'get',
                 responseType: "json",
                 url: '/_napi/shared_api/deviation/extended_fetch?deviationid='+id+'&type=art&include_session=false',
                 onload: function(d) {
                     var media = (d.response && d.response.deviation)?d.response.deviation.media:null;
                     var fullview = media && media.types && media.types.find(t=>{return t.t=='fullview'});
                     if(media && media.baseUri && fullview && media.token){
                         var resultUrl=media.baseUri+(fullview.c?fullview.c.replace("<prettyName>",media.prettyName).replace(/,q_\d+/,",q_100"):"")+"?token="+media.token[0];
                         self.dataset.pvsrc=resultUrl;
                         if(floatBar){
                             floatBar.update(self, self.dataset.pvsrc);
                         }
                     }
                 }
             });
         }else if(this.dataset.pvsrc!="t" && id){
             return this.dataset.pvsrc;
         }
     }
     return null;
 },
},
{
 name: '花瓣网',
 enabled: true,
 url: /^https?:\/\/huaban\.com\//i,
 ext: 'previous-2',
 r: /(.*img.hb.aicdn.com\/.*)_fw(?:236|320)$/i,
 s: '$1_fw658',
 description: './../following-sibling::p[@class="description"]',
 // css: '.pin a.img .cover { display: none; }',
 exclude: /weixin_code\.png$/i,
},
{
 name: "wikipedia",
 enabled:true,
 url:/^https?:\/\/.+\.wikipedia\.org\//i,
 r: /(https?:\/\/.*)\/thumb(\/.*)\/\d+px-.*/i,
 s: "$1$2"
},
{
 name:"沪江碎碎",
 enabled:true,
 url:/^https?:\/\/([^.]+\.)*(?:yeshj\.com|hjenglish\.com|hujiang\.com)/i,
 r: /^(https?:\/\/(?:[^.]+\.)*hjfile.cn\/.+)(_(?:s|m))(\.\w+)$/i,
 s: '$1$3'
},
{
 name: '大众点评',
 example: 'http://www.dianping.com/shop/17873296/photos',
 url: /^https?:\/\/www.dianping.com\/shop/i,
 r: /(.+?dpfile\.com\/.+)\(240c180\)\/(thumb\..+)/i,
 s: '$1(700x700)/$2'
},
{
 name: 'trakt.tv',
 url: /^http:\/\/trakt\.tv\//i,
 example: 'http://trakt.tv/shows',
 r: /(.*\/images\/posters\/\d+)-(?:300|138)\.jpg\?(\d+)$/i,
 s: "$1.jpg?$2"
},
{
 name: '网易云音乐',
 url: 'http://music.163.com/*',
 ext: 'previous',
 getImage: function() {
     var oldsrc = this.src;
     if(this.data){
         var newsrc = this.data('src');
         if (oldsrc != newsrc) {
             return newsrc;
         }
     }
     if (oldsrc.match(/(.*)\?param=\d+y\d+$/)) {
         return RegExp.$1;
     }
 }
},
{
 name: "美女薄情馆",
 url: /^http:\/\/boqingguan\.com\//i,
 example: 'http://boqingguan.com/Picture/31637',
 lazyAttr: 'data-original',
 getImage: function(a) {
     var oldsrc = this.getAttribute('data-original') || this.src;
     if (oldsrc) {
         var newsrc = oldsrc.replace(/![a-z\d]+$/, '');
         return newsrc == oldsrc ? '' : newsrc;
     }
 }
},
{
 name:"极限主题社区",
 enabled:true,
 url:/^https?:\/\/bbs\.themex\.net\/.+/i,
 clickToOpen:{
     enabled:true,
     preventDefault:true,
     type:'actual',
 },
 r: /^(https?:\/\/bbs\.themex\.net\/attachment\.php\?.+)&thumb=1(.+)/i,
 s: '$1$2'
},
{
 name:"opera官方论坛",
 example:"http://bbs.operachina.com",
 enabled:true,
 url:/^http:\/\/bbs\.operachina\.com/i,
 src: /file.php\?id=\d+$/i,
 r: /.*/,
 s: "$1&mode=view"
},
{
 name: 'github 修正',
 url: /^https?:\/\/github\.com\//i,
 clickToOpen: {
     enabled: false,
     preventDefault: true,
     type: 'actual',
 },
 getImage: function(a) {
     if (a && a.href.indexOf('/blob/master/') > 0) {
         return this.src;
     }
 }
},
{
 name: '优美图',
 url: /http:\/\/(?:www\.)?topit\.me\//,
 getImage: function(a) {
     if (a && a.href.match(/topit\.me\/item\/\d+/)) {
         return a.href;
     }
 },
 lazyAttr: 'data-original',
 xhr: {
     q: ['a[download]', 'a#item-tip'],
 }
},
{
 name: '半次元',
 url: /^https?:\/\/bcy\.net\//,
 r: [/\/\dX\d$|\/w\d+$/i,
    "/cover/",
    /\/(middle|small)\.jpg/i],
 s: ["", "/post/", "/big.jpg"]
},
{
 name: 'Steampowered',
 url: /\.steampowered\.com/,
 r: /\.\d+x\d+\.jpg/i,
 s: ".jpg"
},
{
 name: 'Steamcommunity',
 url: /steamcommunity\.com/,
 r: /output\-quality=\d+&fit=inside\|\d+\:\d+/i,
 s: "output-quality=100&fit=inside|0:0"
},
{
 name: '知乎',
 url: /(zhihu|zhimg)\.com/,
 r: /_(b|xs|s|l|\d+x\d+)\./i,
 s: "."
},
{
 name: '500px',
 url: /500px\./,
 r: [/\/w%3D\d+_h%3D\d+\/v2.*/i,
    /^((?:(?:pp?cdn|s\\d\\.amazonaws\\.com\/photos|gp\\d+\\.wac\\.edgecastcdn\\.net\/806614\/photos\/photos)\\.500px|djlhggipcyllo\\.cloudfront)\\.(?:net|org)\/\\d+\/[\\da-f]{40}\/)\\d+\\./],
 s: ["/m%3D2048_k%3D1_of%3D1/v2",
    "$12048.jpg"]
},
{
 name: 'Nyaa',
 url: /nyaa\.se/,
 r: /upload\/small\//i,
 s: "upload/big/"
},
{
 name: "itunes",
 url: /itunes\.apple\.com/,
 r: /\d+x\d+bb\./i,
 s: "1400x1400bb."
},
{
 name: "汽车之家",
 url: /\.autohome\.com\.cn/,
 r: /(\?imageView.*|\d+x\d+_\d+_|f_m_|t_|s_)/i,
 s: ""
},
{
 name: "易车",
 url: /\.bitauto\.com/,
 r: /_\d+\.jpg$/i,
 s: "_12.jpg"
},
{
 name: "爱卡",
 url: /\.xcar\.com\.cn/,
 r: /\-\d+x\d+\.jpg/i,
 s: ""
},
{
 name: "太平洋汽车",
 url: /\.pcauto\.com\.cn/,
 r: /_\d+x\d+\.jpg$/i,
 s: ".jpg"
},
{
 name: "新浪汽车",
 url: /\.auto\.sina\.com\.cn/,
 r: /_\d+\.jpg$/i,
 s: "_src.jpg"
},
{
 name: "greasyfork",
 url: /(greasyfork|sleazyfork)\.org/,
 getImage: function() {
     if(this.parentNode.nodeName=="A" && /amazonaws\.com/.test(this.parentNode.href)){
         return this.parentNode.href;
     }
     return this.src.replace(/\/thumb\//i,"/original/").replace(/\/thumbnails\//i,"/").replace(/(\/forum\/uploads\/userpics\/.*\/)n([^\/]+)$/,"$1p$2");
 }
},
{
 name: "dribbble",
 url: /dribbble\.com/,
 r: [/_teaser(.[^\.]+)$/i,
    /_1x\./i,
    /\?compress=.*/],
 s: ["$1",".",""]
},
{
 name: "百度百科",
 url: /baike\.baidu\.com/,
 r: [/.*bdstatic\.com.*\/([^\/]+)\.jpg/i,
    /(.*bkimg\.cdn\.bcebos\.com.*\?x-bce-process=image).*/i],
 s: ["http://imgsrc.baidu.com/baike/pic/item/$1.jpg",
    "$1"]
},
{
 name: "nvshens",
 url: /nvshens\.com|onvshen\.com/,
 r: /(\img\.onvshen\.com.*)(?:thumb\/|_s)(.*)/i,
 s: "$1$2"
},
{
 name: "Tumblr",
 url: /tumblr\.com/,
 exclude: /\/avatar_/i,
 r: /[^\/]*(media\.tumblr\.com.*_)\d+(\.[^\.]+)$/i,
 s: "$1raw$2"
},
{
 name: "Tumblr",
 url: /tumblr\.com/,
 src: /\/avatar_/i,
 r: /(media\.tumblr\.com.*_)[^_]+(\.[^\.]+)$/i,
 s: "$1512$2"
},
{
 name: "Acgget",
 url: /acg18\.us|acgget\./,
 r: /(pic\.acgget\.com\/thumb\/)w\d+_h\d+\//i,
 s: "$1w9999_h9999/"
},
{
 name: "Pixiv",
 url: /pixiv\.net|pximg\.net/,
 src: /pximg\.net\/c\/\d+x\d+/i,
 r: /pximg\.net\/c\/\d+x\d+.*\/img\/(.*)_.*$/i,
 s: ["pximg.net/img-original/img/$1.jpg","pximg.net/img-original/img/$1.png"]
},
{
 name: "Wallhaven",
 url: /wallhaven\./,
 src: /wallpapers\/thumb\/small\/th|th\.wallhaven\.cc\/(small|lg)\//i,
 r: [/wallpapers\/thumb\/small\/th(.*)\./i,
    /th\.wallhaven\.cc\/(small|lg)\/(.*)?\/(.*)\..*/i],
 s: [["wallpapers/full/wallhaven$1.jpg","wallpapers/full/wallhaven$1.png"],
     ["w.wallhaven.cc/full/$2/wallhaven-$3.jpg","w.wallhaven.cc/full/$2/wallhaven-$3.png"]],
 getImage() {
    let srcReg1 = /wallpapers\/thumb\/small\/th(.*)\./i;
    let srcReg2 = /th\.wallhaven\.cc\/(small|lg)\/(.*)?\/(.*)\..*/i;
    let res1 = "wallpapers/full/wallhaven$1.";
    let res2 = "w.wallhaven.cc/full/$2/wallhaven-$3.";
    let png, ne;
    if (this.nextElementSibling && this.nextElementSibling.nextElementSibling) {
        ne = this.nextElementSibling.nextElementSibling;
        if (ne.className != "thumb-info") ne = null;
        else png = !!ne.querySelector('.png');
    }
    if (srcReg1.test(this.src)) {
        return ne ? this.src.replace(srcReg1, res1 + (png ? "png" : "jpg")) : [this.src.replace(srcReg1, res1 + "jpg"), this.src.replace(srcReg1, res1 + "png")];
    }
    if (srcReg2.test(this.src)) {
        return ne ? this.src.replace(srcReg2, res2 + (png ? "png" : "jpg")) : [this.src.replace(srcReg2, res2 + "jpg"), this.src.replace(srcReg2, res2 + "png")];
    }
 }
},
{
 name: "lofter",
 url: /lofter\./,
 getImage: function(a) {
     if(a && a.href && a.hasAttribute("bigimgsrc")){
         return a.getAttribute("bigimgsrc");
     }
     return this.src.replace(/\?.*/i,"");
 }
},
{
 name: "sohu",
 url: /(sohu|sohucs)\.com/,
 r: /(sohucs\.com\/).*\/(images\/|os\/)/i,
 s: "$1$2"
},
{
 name: "moegirl",
 url: /(moegirl|mengniang)\.org/,
 r: /(common)\/thumb(.*)\/[^\/]+/i,
 s: "$1$2"
},
{
 name: "fanfou",
 url: /fanfou\.com/,
 r: /@.+/i,
 s: ""
},
{
 name: "meitudata",
 url: /meipai\.com/,
 r: /!thumb.+/i,
 s: ""
},
{
 name: "mafengwo",
 url: /mafengwo\.cn/,
 r: /\?imageMogr.*/i,
 s: ""
},
{
 name: "discordapp",
 url: /(discordapp\.|discord\.)(com|net)/,
 r: /\?width=\d+&height=\d+$/i,
 s: ""
},
{
 name: "推特",
 url: /twitter\.com|pbs\.twimg\.com/,
 getImage: function(){
     let newsrc=this.src.replace("_normal.",".").replace("_200x200.",".").replace("_mini.",".");
     if(newsrc!=this.src)return newsrc;
     newsrc=newsrc.replace(/\?format=/i, ".").replace(/\&name=/i, ":").replace(/\.(?=[^.]*$)/, "?format=").replace( /(:large|:medium|:small|:orig|:thumb|:[\dx]+)/i, "");
     if(newsrc!=this.src)return newsrc+"&name=orig";
 },
 ext: function(target) {
    if(target.parentNode && target.parentNode.previousElementSibling){
        let imgs=target.parentNode.previousElementSibling.querySelectorAll("img");
        if(imgs.length==1)return imgs[0];
    }
    return null;
 }
},
{
 name: "Fandom",
 url: /fandom\.com/,
 r: [/scale\-to\-width\-down\/\d+/i,
    /smart\/width\/\d+\/height\/\d+/i],
 s: ["",""]
},
{
 name: "yande",
 url: /yande\.re|konachan\.(net|com)/,
 getImage: function(a, p) {
     if(p[1] && p[1].nextSibling && p[1].nextSibling.classList &&
        p[1].nextSibling.classList.contains("largeimg")){
         return p[1].nextSibling.href.replace(/\/(preview|jpeg|sample)\/(.*\.)jpg$/, "/image/$2png");
     }
     return this.src.replace(/\/(preview|jpeg|sample)\/(.*\.)jpg$/, "/image/$2png");
 }
},
{
 name:"绅士漫画",
 url:/^https?:\/\/wnacg\./,
 src: /\/\/t(\w\.qy.*data\/)t\//,
 r: /\/\/t(\w\.qy.*data\/)t\//,
 s: "//img$1",
 getImage: function(a, p) {
     if (p && p[1] && p[1].className === 'pic_box tb' && a && a.href) {
         return a.href;
     }
 },
 xhr: {
     q: ['#picarea']
 }
},
{
 name:"xlysauc",
 url:/^https?:\/\/xlysauc\.com\//,
 r: /\/x\/(\d+\.jpg)/,
 s: "/d/$1",
 ext: function(target) {
    if (target.parentNode.className === 'imgbg' || target.className === 'pp_hoverContainer'){
        let img = target.parentNode.querySelector("img");
        if (img) return img;
    }
    return null;
 }
},
{
 name: "E621",
 url: /e621\.net/,
 getImage: function(a, p) {
     if(p[2] && p[2].dataset.fileUrl){
         return p[2].dataset.fileUrl;
     }
     return this.src;
 }
},
{
 name: "Pinterest",
 url: /pinterest\.com/,
 getImage: function(a, p) {
    if(this.srcset){
        var srcs=this.srcset.split(","),minSize=0,newSrc;
        srcs.forEach(srci=>{
            let srcInfo=srci.trim().split(" "),curSize=parseInt(srcInfo[1]);
            if(srcInfo[1] && (curSize>minSize || minSize==0)){
                minSize=curSize;
                newSrc=srcInfo[0];
            }
        });
        if(newSrc)return newSrc;
    }
    return this.src.replace(/\/\d+x\//i, "/736x/");
 }
},
{
 name: "Zhisheji",
 url: /zhisheji\.com/,
 r: /thumbnail\/.*/i,
 s: ""
},
{
 name: "imgbox",
 src: /imgbox\.com/,
 r: /thumbs(\d\.imgbox.*)_t\./i,
 s: "images$1_o."
},
{
 name: "Reddit",
 url: /reddit\.com|redd\.it/,
 r: /https?:\/\/preview\.redd.it\/([^\?]+)?.*/i,
 s: "https://i.redd.it/$1"
},
{
 name: "Rule34hentai",
 url: /rule34hentai\.net/,
 r: "/_thumbs/",
 s: "/_images/"
},
{
 name: "Rule34",
 url: /rule34\.xxx/,
 src: /\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_/i,
 r: /\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_(.*)\..*/i,
 s: ["/images/$2/$4.jpeg","/images/$2/$4.png","/images/$2/$4.jpg"]
},
{
 name: "Photosight",
 url: /photosight\.ru/,
 r: /(cdny\.de.*\/)t\//i,
 s: "$1x/"
},
{
 name: "Xiaohongshu",
 url: /xiaohongshu\.com/,
 ext: function(target) {
     if (target.className == 'change-pic') {
         var imgs=target.previousElementSibling.querySelectorAll('li'),i=0;
         for(i=0;i<imgs.length;i++){
             if(imgs[i].style.display!="none")
                 return imgs[i].childNodes[0];
         }
     }
     return target;
 },
 r: /\/w\/\d+\/(h\/\d+\/)?(q\/\d+\/)?/i,
 s: "/w/1080/"
},
{
 name: "Youtube",
 url: /youtube\.com/,
 ext: function(target) {
     if (target.tagName == "ytd-thumbnail") {
        return target.querySelector("img");
     }
 },
 getExtSrc: function() {
    let newsrc = "";
    if (this.id == "thumbnail-container") {
        let img = this.querySelector('img');
        if (!img) return;
        newsrc = img.src;
    } else if (this.parentNode && this.parentNode.className == "ytp-inline-preview-ui") {
        newsrc = this.parentNode.parentNode.querySelector(".ytp-cued-thumbnail-overlay-image").style.backgroundImage.replace(/url\("(.*)"\)/,"$1");
    }
    return newsrc.replace(/\?.*$/i,"");
 },
 getImage: function(a, p) {
     var newsrc=this.src;
     if(p[2] && this.classList.contains('ytd-moving-thumbnail-renderer')){
         newsrc = p[2].querySelector("img").src;
     }
     if(!newsrc || newsrc.indexOf("ytimg.com") == -1) return;
     return newsrc.replace(/\?.*$/i,"");
 }
},
{
 name: "588ku",
 url: /588ku\.com/,
 r: /!\/fw.*/,
 s: ""
},
{
 name: "ibaotu",
 url: /ibaotu\.com/,
 ext: 'previous',
 r: "!fwc238",
 s: "!ww7002"
},
{
 name: "58pic",
 url: /58pic\.com/,
 ext: function(target){
     if(target.className=="no-login" && target.style.opacity==""){
         target.style.opacity=0.99;
         setTimeout(()=>{target.style.display="none";},1000);
     }
     return null;
 },
 r: /!.*/i,
 s: "!w1024"
},
{
 name: "gelbooru",
 url: /gelbooru\.com/,
 src: /(thumbnails|samples)\/(.*)\/(thumbnail|sample)_/i,
 r: /.*\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_(.*)\..*/i,
 s: ["https://img3.gelbooru.com/images/$2/$4.png","https://img3.gelbooru.com/images/$2/$4.jpg"]
},
{
 name: "donmai",
 url: /donmai\.us/,
 src: /(thumbnails|sample)\/(.*)\/(thumbnail|sample)_|\/\d+x\d+\//i,
 r: [/\/(thumbnails|sample)\/(.*)\/(thumbnail|sample)_(.*)/i,
     /\/\d+x\d+\//i
    ],
 s: ["/original/$2/$4","/original/"]
},
{
 name: "erosberry",
 url: /erosberry\.com/,
 r: /(\/\d+\/)tn_(\d+\.[^\/]+)$/i,
 s: "$1$2"
},
{
 name: "javdb",
 url: /javdb/,
 r: "/thumbs/",
 s: "/covers/"
},
{
 name: "javbus",
 url: /javbus\.|busjav\./,
 r: /\/thumbs?(\/\w+)\.jpg$/i,
 s: "/cover$1_b.jpg"
},
{
 name: "avmoo",
 url: /avmoo\./,
 r: "ps.jpg",
 s: "pl.jpg"
},
{
 name: "asiansister",
 url: /asiansister\.com/,
 r: "_t.",
 s: "."
},
{
 name: "jianshu",
 url: /jianshu\.com/,
 r: /(upload-images\.jianshu\.io\/.*)\?.*/i,
 s: "$1"
},
{
 name: "artstation",
 ext: 'next',
 url: /artstation\.com/,
 r: /\/(\d{14}\/)?smaller_square\//i,
 s: "/large/",
 getImage: function(a, p) {
    if (p && p[0] && p[0].className === 'project-image') return a.href.replace('/artwork/', '/projects/') + '.json';
 },
 xhr: {
     q: function(html) {
        let datas = JSON.parse(html);
        let urls = [];
        datas.assets.forEach(d => {
            urls.push(d.image_url)
        });
        return urls;
     }
 }
},
{
 name: "flickr",
 url: /flickr\.com/,
 ext: function(target){
     if(target.nodeName=="A" && target.className=="overlay" && target.parentNode && target.parentNode.parentNode && target.parentNode.parentNode.parentNode){
         return target.parentNode.parentNode.parentNode;
     }else if(target.nodeName=="DIV" && target.classList.contains("photo-notes-scrappy-view")){
         return target.previousElementSibling.querySelector(".main-photo");
     }else if(target.classList.contains("context-thumb")){
         return target;
     }
     return null;
 },
 r: /_\w\./i,
 s: "_c."
},
{
 name: "wikiart",
 url: /wikiart\.org/,
 r: /!.*/i,
 s: ''
},
{
 name: "discuz",
 r: [/(.+\/attachments?\/.+)\.thumb\.\w{2,5}$/i,
     /((wp-content|moecdn\.org)\/uploads\/.*)\-\d+x\d+(-c)?/i,
     /.*(?:url|src)=(https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp)).*/i,
     /.*thumb\.php\?src=([^&]*).*/i],
 s: '$1'
},
{
 name: "weibo",
 r: /(\.sinaimg\.(cn|com)\/)(?:bmiddle|orj360|mw\d+)/i,
 s: '$1large'
},
{
 name: "weibo2",
 r: /(\.sinaimg\.(cn|com)\/)(?:square|thumbnail)/i,
 s: '$1mw1024'
},
{
 name: "sina head",
 r: /(\.sinaimg\.(cn|com)\/\d+)\/50\//i,
 s: '$1/180/'
},
{
 name: "新浪相册",
 src: /\.sinaimg\.(cn|com)\/thumb\d+\/\w+/i,
 r: /thumb\d+/,
 s: 'mw690'
},
{
 name: "sina sports",
 src: /k\.sinaimg\.cn\/n\//i,
 r: /k\.sinaimg\.cn\/n\/(.*)\/(w\d+)?h\d+[^\/]+$/,
 s: 'n.sinaimg.cn/$1'
},
{
 name: "gravatar",
 src: /gravatar\.com\/avatar\/|\/gravatar\//i,
 r: /(avatar\/.*[\?&]s=).*/,
 s: '$11920'
},
{
 name: "ucServerAvatar",
 src: /uc_server\/avatar\.php/i,
 r: /(uc_server\/avatar\.php\?uid=\d+&size=).*/,
 s: '$1big'
},
{
 name: "md",
 src: /\.md\./i,
 r: /\.md(\.[^\.]+)$/i,
 s: '$1'
},
{
 name: "ytimg",
 src: /\.ytimg\.com/i,
 exclude: /mqdefault_6s/i,
 r: /\?.*$/i,
 s: ''
},
{
 name: "meituan",
 url: /\.meituan\.net/i,
 r: /\/avatar\/\w{2}/i,
 s: '/avatar/o0'
},
{
 name: "hdslb",
 src: /hdslb\.com\//i,
 r: /@.*/i,
 s: ''
},
{
 name: "coolapk",
 url: /\.coolapk\.com\//i,
 r: /\.s\.\w+$/i,
 s: ''
},
{
 name: "aicdn",
 src: /\.aicdn\.com\//i,
 r: /_fw\d+$/i,
 s: ''
},
{
 name: "duitang",
 src: /duitang\.com\//i,
 r: /.thumb.(\d+_)?\d*\./i,
 s: '.'
},
{
 name: "imgur",
 src: /imgur\.com\//i,
 r: [/h(\.[^\/]+)$/i,/maxwidth=\d+/i],
 s: ["$1","maxwidth=99999"]
},
{
 name: "dmm",
 src: /pics\.dmm\.co\.jp/i,
 r: "ps.jpg",
 s: "pl.jpg"
},
{
 name: "whd",
 src: /\/w\/\d+\/h\/\d+($|\/|\?)/i,
 r: /\/w\/\d+\/h\/\d+/i,
 s: ""
},
{
 name: "百度图片、贴吧等",
 src: /(hiphotos|imgsrc)\.baidu\.com/i,
 r: /(hiphotos|imgsrc)\.baidu\.com\/(.+?)\/.+?([0-9a-f]{40})/i,
 s: "$1.baidu.com/$2/pic/item/$3"
},
{
 name: "GoogleContent",
 src: /\/w\/\d+\/h\/\d+($|\/|\?)/i,
 getImage:function(){
     var $ = /^((?:(?:lh|gp|yt)\d+\.g(?:oogleuserconten|gph)|\d\.bp\.blogspo)t\.com\/)(?:([_-](?:[\w\-]{11}\/){4})[^\/]+(\/[^?#]+)?|([^=]+)).*/i.exec(this.src);
     var newsrc= $ ? ('http://' + $[1] + ($[4] ? $[4] + '=' : $[2]) + 's2634' + ($[3] || '')) : '';
     if(newsrc!=this.src)return newsrc;
 }
},
{
 name: "pixiv",
 src: /pixiv\.net/i,
 r: /(pixiv.net\/img\d+\/img\/.+\/\d+)_[ms]\.(\w{2,5})$/i,
 s: "$1.$2"
},
{
 name: "douban",
 url: /douban\.com/i,
 getImage:function(){
     var $ = /(img\d+\.douban\.com\/)(?:(view\/)(?:photo|movie_poster_cover)\/(?!large)[^\/]+|(icon\/u(?=\d))|[sm](?=pic\/))(.*)/i.exec(this.src);
     var newsrc= $ ? ('http://' + $[1] + ($[2] ? $[2] + 'photo/photo' : (($[3]||'') + 'l')) + $[4]) : '';
     if(newsrc!=this.src)return newsrc;
 }
},
{
 name: "taobaocdn",
 src: /(taobaocdn|alicdn)\.com/i,
 r: [/.*((?:img\d\d\.taobaocdn|img(?:[^.]*\.?){1,2}?\.alicdn)\.com\/)(?:img\/|tps\/http:\/\/img\d\d+\.taobaocdn\.com\/)?((?:imgextra|bao\/uploaded)\/.+\.(?:jpe?g|png|gif|bmp))_.+\.jpg$/i,
    /(.*\.alicdn\.com\/.*?)((.jpg|.png)(\.|_)\d+x\d+.*)\.jpg(_\.webp)?$/i,
    /(.*\.alicdn\.com\/.*?)((\.|_)\d+x\d+.*|\.search|\.summ)\.jpg(_\.webp)?$/i],
 s: ["http://$1$2",
    "$1$3",
    "$1.jpg"]
},
{
 name: "taobao",
 url: /item\.taobao\.com/i,
 r: [/.*((?:img\d\d\.taobaocdn|img(?:[^.]*\.?){1,2}?\.alicdn)\.com\/)(?:img\/|tps\/http:\/\/img\d\d+\.taobaocdn\.com\/)?((?:imgextra|bao\/uploaded)\/.+\.(?:jpe?g|png|gif|bmp))_.+\.jpg$/i,
    /(.*\.alicdn\.com\/.*?)((.jpg|.png)(\.|_)\d+x\d+.*)\.jpg(_\.webp)?$/i,
    /(.*\.alicdn\.com\/.*?)((\.|_)\d+x\d+.*|\.search|\.summ)\.jpg(_\.webp)?$/i],
 s: ["http://$1$2",
    "$1$3",
    "$1.jpg"],
 getExtSrc:function(){
    if(this.tagName=='A' && this.style.background){
        return this.style.background.replace(/.*url\(['"](https?:)?(.*)['"]\).*/,"https:$2").replace(/_\d+x\d+\.\w+$/,"")
    }
 }
},
{
 name: "yihaodianimg",
 url: /yhd\.com/i,
 src: /yihaodianimg\.com/i,
 r: /(.*\.yihaodianimg\.com\/.*)_\d+x\d+\.jpg$/i,
 s: "$1.jpg"
},
{
 name: "jd",
 url: /jd\.com/i,
 src: /360buyimg\.com/i,
 r: [/(.*360buyimg\.com\/)n\d\/.+?\_(.*)/i,
    /(.*360buyimg\.com\/)n\d\/(.*)/i,
    /(.*360buyimg\.com\/.*)s\d+x\d+_(.*)/i],
 s: ["$1imgzone/$2","$1n0/$2","$1$2"]
},
{
 name: "dangdang",
 url: /dangdang\.com/i,
 src: /ddimg\.cn/i,
 r: /(.*ddimg.cn\/.*?)_[bw]_(\d+\.jpg$)/i,
 s: "$1_e_$2"
},
{
 name: "duokan",
 url: /duokan\.com/i,
 r: /(cover.read.duokan.com.*?\.jpg)!\w+$/i,
 s: "$1"
},
{
 name: "yyets",
 url: /yyets\.com/i,
 r: /^(res\.yyets\.com.*?\/ftp\/(?:attachment\/)?\d+\/\d+)\/[ms]_(.*)/i,
 s: "http://$1/$2"
},
{
 name: "mozilla",
 url: /addons\.mozilla\.org/i,
 r: "addons.cdn.mozilla.net/user-media/previews/thumbs/",
 s: "/thumbs/full/"
},
{
 name: "firefox",
 url: /firefox\.net\.cn/i,
 r: "www.firefox.net.cn/attachment/thumb/",
 s: "www.firefox.net.cn/attachment/"
},
{
 name: "crsky",
 url: /\.crsky\.com/i,
 r: /pic\.crsky\.com.*_s\.gif$/i,
 s: "/_s././",
 example: "http://www.crsky.com/soft/5357.html"
},
{
 name: "zol",
 url: /\.zol\.com/i,
 r: /(\w+\.zol-img\.com\.cn\/product\/\d+)_\d+x\d+\/(.*\.jpg)/i,
 s: "$1/$2",
 example: "http://detail.zol.com.cn/240/239857/pic.shtml"
},
{
 name: "yesky",
 url: /\.yesky\.com/i,
 r: /_\d+x\d+\.([a-z]+)$/i,
 s: ".$1",
 example: "http://game.yesky.com/tupian/165/37968665.shtml"
},
{
 name:"巴哈姆特",
 url:/^https:\/\/\w+\.gamer\.com\.tw/,
 src: /bahamut\.com\.tw/,
 r: "/S/",
 s: "/B/"
},
{
 name: "sgamer",
 url: /\.sgamer\.com/i,
 r: /\/s([^\.\/]+\.[a-z]+$)/i,
 s: "/$1",
 example: "http://dota2.sgamer.com/albums/201407/8263_330866.html"
},
{
 name: "nhentai",
 url: /nhentai\.net/i,
 r: /\/\/\w+(\..*\/)(\d+)t(\.[a-z]+)$/i,
 s: "//i$1$2$3",
 example: "http://nhentai.net/g/113475/"
},
{
 name: "GithubAvatars",
 url: /github\.com/i,
 r: /(avatars\d*\.githubusercontent\.com.*)\?.*$/i,
 s: "$1",
 example: "https://avatars2.githubusercontent.com/u/3233275/"
},
{
 name: "ggpht",
 src: /ggpht\.com/i,
 r: /=s\d+.*/i,
 s: "=s9999"
},
{
 name: "kodansha",
 url: /kodansha\.co\.jp/i,
 src: /kodansha\.co\.jp/i,
 r: 't_og_image_center',
 s: 'c_limit'
},
{
 name: "fanseven",
 url: /fanseven\.com/i,
 src: /fanseven\.com/i,
 r: /w=\d+&h=\d+/i,
 s: 'w=9999&h=9999'
},
{
 name: "appstore",
 url: /^https:\/\/apps\.apple\.com\//i,
 getImage:function(){
    if(this.parentNode.nodeName=="PICTURE"){
        let source=this.parentNode.querySelector("source:last-of-type");
        let maxSize=0;
        let result="";
        source.srcset.split(", ").forEach(srcset=>{
            let srcArr=srcset.split(" ");
            let curSize=parseInt(srcArr[1]);
            if(curSize>maxSize){
                maxSize=curSize;
                result=srcArr[0];
            }
        });
        return result;
    }
    return null;
 }
},
{
 name:"coomer.party & kemono.party",
 url:/^https:\/\/(coomer|kemono)\.party\/.*\/post\//,
 getImage:function(a){
    if(a) return a.href;
 }
},
{
 name:"instagram",
 url:/^https?:\/\/[^.]+\.instagram\.com/i,
 ext: function(target) {
    if(target && target.previousElementSibling){
        let imgs=target.previousElementSibling.querySelectorAll("img");
        if(imgs && imgs.length==1)return imgs[0];
    }else if(target.tagName=='UL' && target.parentNode && target.parentNode.parentNode && target.parentNode.parentNode.tagName=='A'){
        return target.parentNode.parentNode.querySelector('img');
    }
 }
},
{
 name: "hentai-cosplays",
 url: /^https:\/\/(.*\.)?(hentai\-cosplays|porn\-images\-xxx)\.com/,
 r: /\/p=[\dx]+(\/\d+\.\w+)$/i,
 s: '$1'
},
{
 name:"beta.kemono.party",
 url:/^https:\/\/(\w+\.)?kemono\.party\/.*\/post\//,
 getImage:function(a){
  if(a) return a.href;
 }
},
{
 name:"imdb",
 url:/^https?:\/\/www\.imdb\.com/,
 src: /media\-amazon/,
 r: /@.*(\.\w)/i,
 s: '@$1'
},
{
 name:"nsfw.xxx",
 url:/^https?:\/\/nsfw\.xxx/,
 src: /thumbnails/,
 getImage: function(a,p) {
     if (a && a.className==='slider_init_href' && a.href && !this.nextElementSibling) {
         return a.href;
     }
 },
 xhr: {
     q: '.sh-section__image>img',
 }
},
{
 name: "雪球",
 url: /^https?:\/\/xueqiu\.com\//,
 src: /^https?:\/\/xqimg\.imedao\.com\//i,
 r: /!\d+(x\d+[a-z]?)?\.\w+$/,
 s: ''
},
{
 name: "小众论坛",
 url: /^https?:\/\/meta\.appinn\.net/,
 src: /meta\-cdn/,
 r: /\/optimized\/(.*)_\d+_\d+x\d+(\.\w+)$/,
 s: "/original/$1$2"
},
{
 name: "诱惑福利图",
 url: /www\.yhflt\.com/,
 src: /imgs\.yhflt\.com/,
 r: /imgs(\..*\/)q/,
 s: "pic$1"
},
{
 name: "Sankaku Complex",
 url:/sankakucomplex\.com/,
 src:/\/data\/preview\//,
 getImage:function(a){
  return a?a.href:null;
 },
 xhr:{
  q:["img#image"]
 }
},
{
 name:"极简壁纸",
 url:/https:\/\/bz\.zzzmh\.cn\//i,
 getImage: function(a,p){
  if(p&&p[1]&&p[1].classList.contains("img-box")){
   let saveEle=p[1].querySelector("a");
   if(saveEle) return saveEle.href;
  }
 }
}
];
