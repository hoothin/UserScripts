/*
PVCEP - Rules for Picviewer CE+
<https://github.com/hoothin/UserScripts/blob/master/Picviewer%20CE%2B/pvcep_rules.js>

(c) 2021-2024 Hoothin <rixixi [at] gmail.com>
Licenced under the MIT license.

minimum
{
  name: site name
  r: regular image url or string to be replaced
  s: replacement target string
}
or
{
  name: site name
  getImage(a, p): Replace the image URL when pointing to an image, 'a' refers to the first parent A element, and 'p' is an array of all parent elements, see the example below for details
}
Other parameter items can be added as needed.
Note that css/ext/xhr/lazyAttr (lazy loaded original image URL attribute name)/description (description when collecting images, support selector or xpath)/clickToOpen should only be used after specifying the url.
xhr is used to obtain the attributes of the pictures on the inner pages.
    1. First, use xhr.url() to filter and return the url of the parent a tag, and then the script will automatically grab the webpage pointed to by the url.
    2. And get pictures through xhr.
        2.1 xhr.query is the picture (you can For multiple, multiple will be added to the gallery) selector or function
        2.2 xhr.caption is the description of picture
If the mouse points to an object other than a picture, you can use getExtSrc to generate the desired picture url, see the youtube example below for details
ext is the method for capturing nearby image elements when the mouse hovers over a non-image element. "previous" indicates detecting the previous sibling node, "previous-2" indicates detecting the second sibling node in reverse order, and "next" indicates detecting the next sibling node.
getExtSrc is the method for directly obtaining the image URL based on a non-image element.
 */
var siteInfo = [
    {
        name: "google 图片搜索",
        //網址例子 ( 方便測試和查看 )
        example: "http://www.google.com.hk/search?q=firefox&tbm=isch",
        //是否啟用
        enabled: true,
        //站點正則，匹配站點url該條規則才會生效
        url: /https?:\/\/www.google(\.\w{1,3}){1,3}\/search\?.*&(tbm=isch|udm=2)/,
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
        getImage: function(a) {
            //獲取圖片實際地址的處理函數,
            //this 為當前鼠標懸浮圖片的引用,
            //第一個參數為當前圖片的父元素中第一個a元素(可能不存在)
            //第二個參數為保存當前圖片所有父元素的數組
            if(!a) return;
            let jsaction = a.getAttribute("jsaction");
            if (a.href.match(/imgurl=(.*?)&/i)) {
                return decodeURIComponent(RegExp.$1);
            } else if (jsaction && jsaction.indexOf('touchstart') !== -1) {
                const touchList = [new Touch({
                    identifier: 1,
                    target: document.documentElement,
                    clientX: 0,
                    clientY: 0
                })];
                var fakeEvent = new TouchEvent('touchstart', {bubbles: true, touches: touchList});
                a.dispatchEvent(fakeEvent);
                fakeEvent = new TouchEvent('touchend', {bubbles: true});
                a.dispatchEvent(fakeEvent);
                if (a.href.match(/imgurl=(.*?)&/i)) {
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
        getImage: function(a, p) {
            let bsrc = this.getAttribute('bpic');
            return bsrc || null;
        },
        xhr: {
            url: function(a, p) {
                if (!this.src) return null;
                let pid = this.src.match(/\.baidu\.com\/forum\/w.*\/(\w+)\./);
                if (!pid) return null;
                pid = pid[1];
                let tid = 0;
                let tidm = location.href.match(/\/p\/(\d+)/);
                if (tidm) tid = tidm[1];
                if (tid) {
                    let kw = document.querySelector(`#wd2`);
                    if (kw && kw.value) {
                        return `https://tieba.baidu.com/photo/bw/picture/guide?kw=${kw.value}&tid=${tid}&pic_id=${pid}&see_lz=0&from_page=0&alt=jview`;
                    }
                }
                return null;
            },
            query: function(html, doc, url) {
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
            var reg = /&objurl=(http.*?\.(?:jpg|jpeg|png|gif|bmp|webp))/i;
            if (a.href.match(reg)) {
                let url = RegExp.$1;
                try {
                    url = decodeURIComponent(url);
                    url = decodeURIComponent(url);
                }catch(e){}
                return url;
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
        r: /\d+_\d+\/|\d+_x\d+\.jpg$|@\d+w_\d+h.*\.webp$|_\d+x\d+\.jpg$/i,
        s: ""
    },
    /*{
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
    name:"deviantart",
    url:/^https?:\/\/[^.]*\.deviantart\.com/i,
    xhr: {
        url: 'a[data-hook = "deviation_link"]',
        query: '[property="contentUrl"]'
    }
},*/
    {
        name:"deviantart",
        url:/^https?:\/\/[^.]*\.deviantart\.com/i,
        getImage: function(a, p) {
            if (a) {
                let media =Object.keys(a).filter(prop => prop.indexOf("__reactProps") === 0);
                if (media && a[media] && a[media].children && a[media].children.props && a[media].children.props.deviation) {
                    media = a[media].children.props.deviation.media;
                    let fullview = media.types.filter(d => d.t === "fullview");
                    let ext = media.baseUri.match(/\.\w+$/);
                    if (fullview && ext) {
                        fullview = fullview[0];
                        ext = ext[0];
                        return media.baseUri + `/v1/fill/w_${fullview.w},h_${fullview.h}/${media.prettyName}-fullview${ext}?token=` + media.token[0];
                    }
                }
            }
            return this.src && this.src.replace(/,q_\d+,/, ",q_100,").replace(/\/v1\/fill\/[^?]+\-pre\.\w+\?/, "?");
        }
    },
    {
        name: '花瓣网',
        url: /^https?:\/\/huaban\.com\//i,
        ext: 'previous-2',
        r: [/(.*img.hb.aicdn.com\/.*)_fw(?:236|320)$/i, /_fw\d+\w+/i],
        s: ['$1_fw658', ''],
        description: './../following-sibling::p[@class="description"]',
        exclude: /weixin_code\.png$/i
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
        url: 'https://music.163.com/*',
        ext: 'previous',
        getImage: function() {
            var oldsrc = this.src;
            if(this.data){
                var newsrc = this.data('src');
                if (oldsrc != newsrc) {
                    return newsrc;
                }
            }
            if (oldsrc.match(/(.*)\?param=\d+y\d+/)) {
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
        lazyAttr: 'data-original',
        xhr: {
            url: /topit\.me\/item\/\d+/,
            query: ['a[download]', 'a#item-tip'],
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
        r: /_(b|qhd|xs|s|l|\d+(x\d+|w))\./i,
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
            if(this.parentNode && this.parentNode.nodeName=="A" && /amazonaws\.com/.test(this.parentNode.href)){
                return this.parentNode.href;
            }
            return this.src && this.src.replace(/\/thumb\//i,"/original/").replace(/\/thumbnails\//i,"/").replace(/(\/forum\/uploads\/userpics\/.*\/)n([^\/]+)$/,"$1p$2");
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
        r: [/pximg\.net\/c\/\d+x\d+.*\/img\/(.*)_.*$/i, /(pixiv.net\/img\d+\/img\/.+\/\d+)_[ms]\.(\w{2,5})$/i],
        s: [["pximg.net/img-original/img/$1.jpg","pximg.net/img-original/img/$1.png"],
            "$1.$2"],
        getImage: function(a, p) {
            if (this.src && a && /(\/artworks\/|member_illust\.php\?mode="|\/group\/)/.test(a.href)) {
                let dateMatch = this.src.match(/\/img\/(\d+\/(\d\d\/?(?!\d{3})){5})\/(\d+)_/);
                let countMatch = a.outerHTML.match(/<span>(\d+)<\/span>/);
                if (dateMatch && countMatch) {
                    return {all:Array(parseInt(countMatch[1])).keys().reduce(
                      (acc, cur) => acc.concat(`https://i.pximg.net/img-master/img/${dateMatch[1]}/${dateMatch[3]}_p${cur}_master1200.jpg`),
                      []
                    )}
                }
            }
            return null;
        }
    },
    {
        name: "Wallhaven",
        url: /wallhaven\./,
        src: /wallpapers\/thumb\/small\/th|th\.wallhaven\.cc\/(small|lg)\//i,
        r: [/wallpapers\/thumb\/small\/th(.*)\./i,
            /th\.wallhaven\.cc\/(small|lg)\/(.*)?\/(.*)\..*/i],
        s: [["wallpapers/full/wallhaven$1.jpg","wallpapers/full/wallhaven$1.png"],
            ["w.wallhaven.cc/full/$2/wallhaven-$3.jpg","w.wallhaven.cc/full/$2/wallhaven-$3.png"]],
        getImage: function() {
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
        r: [/\?width=\d+&height=\d+$/i, /.*\/external\/.*\/(https?)\/(.*)\?format.*/, /media\.discordapp\.net/],
        s: ["", "$1://$2", "cdn.discordapp.com"]
    },
    {
        name: "推特",
        url: /https:\/\/(www\.)?(x|twitter)\.com|pbs\.twimg\.com/,
        description: ["./..", "aria-label"],
        getImage: function(a, p){
            let newsrc = this.src.replace("_normal.",".").replace("_200x200.",".").replace("_mini.",".").replace("_bigger.",".").replace(/_x\d+\./,".");
            if (newsrc != this.src) return newsrc;
            if (/\.svg$/.test(newsrc)) return;
            newsrc=newsrc.replace(/\?format=/i, ".").replace(/\&name=/i, ":").replace(/\.(?=[^\.\/]*$)/, "?format=").replace( /(:large|:medium|:small|:orig|:thumb|:[\dx]+)/i, "");
            if (newsrc != this.src) {
                if (a && a.role == 'link') {
                    let match = a.href.match(/\/([^\/]+)\/status\/([^\/]+)\/photo\/(\d+)/);
                    if (match) {
                        let time = p[14] && p[14].querySelector('time');
                        if (time) {
                            this.alt = match[1] + " - " + time.innerText + "_" + match[3];
                        }
                    }
                }
                return newsrc+"&name=orig";
            }
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
        url: /\bfandom\.com/,
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
        url:/^https?:\/\/(www\.)?wnacg\./,
        src: /\/\/t(\w\.qy.*data\/)t\//,
        r: /\/\/t(\w\.qy.*data\/)t\//,
        s: "//img$1",
        xhr: {
            url: function(a, p) {
                if (p && p[1] && p[1].className === 'pic_box tb' && a && a.href) {
                    return a.href;
                }
            },
            query: '#picarea'
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
        url: /\be621\.net/,
        getImage: function(a, p) {
            if(p[2] && p[2].dataset.fileUrl){
                return p[2].dataset.fileUrl;
            }
            return this.src;
        }
    },
    {
        name: "Pinterest",
        url: /\bpinterest\.com/,
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
        url: /\bzhisheji\.com/,
        r: /thumbnail\/.*/i,
        s: ""
    },
    {
        name: "imgbox",
        src: /\bimgbox\.com/,
        r: /thumbs(\d\.imgbox.*)_t\./i,
        s: "images$1_o."
    },
    {
        name: "Twitch",
        url: /^https:\/\/(www\.twitch\.tv\/|www\.reddit\.com\/r\/TwitchClips\/)/,
        xhr: {
            url: function(a, p, xhr) {
                if (!a) return;
                if (!/twitch\.tv/.test(a.href)) return;
                let m = a.href.match(/(\/clip\/|clips\.twitch\.tv\/)([^?]{1,})/);
                if (m) {
                    var slug = m[2];
                    var operationNameClip = "VideoAccessToken_Clip";
                    var operationNameLiveOrVOD = "PlaybackAccessToken";
                    var sha256HashClip = "36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11";
                    var sha256HashLiveOrVOD = "0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712";
                    return `https://gql.twitch.tv/gql#p{{"operationName":"${operationNameClip}","variables":{"slug":"${slug}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"${sha256HashClip}"}}}}`;
                } else {
                    m = a.href.match(/(?:m\.|www\.)?twitch\.tv\/(?:(?!directory|downloads|jobs|store|twitchartists|turbo|privacy)(\w+)$|(?:\w+\/)?videos\/(\d+))/);
                    if (m) {
                        return `https://gql.twitch.tv/gql#p{{"operationName":"PlaybackAccessToken_Template","query":"query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!, $platform: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: $platform, playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isLive) {    value    signature   authorization { isForbidden forbiddenReasonCode }   __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: $platform, playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isVod) {    value    signature   __typename  }}","variables":{"isLive":${m[1]?'true':'false'},"login":"${m[1]||''}","isVod":true,"vodID":"${m[2]||''}","playerType":"site","platform":"web"}}}`;
                    }
                }
            },
            headers: function(url, xhr, getCookie) {
                return {"Client-ID":"kimne78kx3ncx6brgo4mv6wki5h1ko", "X-Device-Id": getCookie('unique_id') || getCookie('unique_id_durable') || 'd56e8463c57c7cd7'}
            },
            cacheNum: 20,
            query: function(html, doc, u, xhr) {
                try {
                    let r = JSON.parse(html);
                    if (r.data.clip) {
                        let signature = r.data.clip.playbackAccessToken.signature;
                        let token = r.data.clip.playbackAccessToken.value;
                        let t = JSON.parse(token);
                        let clip_uri = r.data.clip.videoQualities[0].sourceURL;
                        let fullsizeUrl = clip_uri + '?sig=' + signature + '&token=' + encodeURIComponent(token);

                        return {url: ["video:" + fullsizeUrl], cap: ""};
                    } else {
                        let m = u.match(/"login":"(.*?)".*"vodID":"(.*?)"/);
                        let tokens = r.data.streamPlaybackAccessToken || r.data.videoPlaybackAccessToken;
                        if (!tokens) return;
                        let hex = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        let url = m[1] ? 'api/channel/hls': 'vod';
                        let p = Math.floor(999999 * Math.random());
                        let id = '';
                        for (let i = 0; i < 32; i++) id += hex[Math.floor(Math.random() * 16)];
                        return `video:https://usher.ttvnw.net/${url}/${m[1]||m[2]}.m3u8?acmb=eyJBcHBWZXJzaW9uIjoiYjlhNjU4ZWMtMTcyMS00Y2FjLThkMjgtZjk0NmJmY2E3YzUwIn0%3D&allow_source=true&p=${p}&platform=web&play_session_id=${id}&sig=${tokens.signature}&supported_codecs=av1,h264&token=${encodeURIComponent(tokens.value)}&transcode_mode=cbr_v1`;
                    }
                } catch { }
            }
        }
    },
    {
        name: "streamain",
        url: /^https:\/\/(streamain\.com\/|www\.reddit\.com\/)/,
        xhr: {
            url: /^https:\/\/streamain\.com\/.*\/watch$/,
            query: '#playbob-video'
        }
    },
    {
        name: "Reddit",
        url: /\breddit\.com|redd\.it/,
        getImage: function(a, p) {
            if (a && /review\.redd\.it/.test(a.href)) {
                return a.href;
            } else if (this.srcset) {
                let srcs = this.srcset.split(/[xw],\s*/i);
                let maxSize = 0;
                let result = "";
                srcs.forEach(srcset => {
                    let srcArr = srcset.split(" ");
                    let curSize = parseInt(srcArr[1]);
                    if (srcArr[0].indexOf("?width") == -1) return srcArr[0];
                    if (curSize > maxSize) {
                        maxSize = curSize;
                        result = srcArr[0];
                    }
                });
                if (this.src.indexOf("?width") !== -1) return result;
            } else if (/^https?:\/\/preview\./.test(this.src)){
                return this.src.replace("preview", "i").replace(/\?.*/, "");
            }
            return this.src;
        },
        getExtSrc: function() {
            if (this.getAttribute("reason") == "nsfw") {
                if (!this.firstElementChild) return;
                let img = this.firstElementChild.querySelector("img");
                if (!img) return;
                return img.src.replace(/^https:\/\/preview\.redd\.it\/(.*)\?.*/, "https://i.redd.it/$1");
            }
        },
        xhr: {
            url: function(a, p, self) {
                let aHref = a && a.href;
                if (/\/\/v.redd\.it\/\w+\/?$/.test(aHref)) {
                    return aHref + '/DASHPlaylist.mpd';
                } else if (/^https:\/\/www\.reddit\.com\/gallery\//.test(aHref)) {
                    return aHref.replace(/.*(reddit\.com\/)gallery\/([\da-z]+).*/, "https://www.$1by_id/t3_$2.json");
                } else if (/redgifs\.com\//.test(aHref)) {
                    const apiUrl = 'https://api.redgifs.com/v2';
                    if (!self.redgifsToken) {
                        self.redgifsToken = "1";
                        fetch(`${apiUrl}/auth/temporary`).then(res => res.json()).then((data) => {
                            if (data && data.token) {
                                self.redgifsToken = data.token;
                            }
                        });
                    }
                    return apiUrl + "/gifs/" + aHref.replace(/.*redgifs.com\/(..\/)?(\w+\/)?(\w+)(?:\.\w+)?/, '$3');;
                } else if (p[1] && p[1].classList && p[1].classList.contains("search-result")) {
                    let link = p[1].querySelector("a.search-link");
                    if (link && link.href) {
                        if (/\/\/v.redd\.it\/\w+\/?$/.test(link.href)) {
                            return link.href + '/DASHPlaylist.mpd';
                        } else if (/^https:\/\/www\.reddit\.com\/gallery\//.test(link.href)) {
                            return link.href;
                        }
                    }
                } else if (a && this.src && p[2] && p[2].nodeName == "FACEPLATE-IMG") {
                    return a.href;
                } else if (p[3]) {
                    let a = p[3].querySelector("a.group");
                    if (a) return a.href;
                    else if(p[3].previousElementSibling && p[3].previousElementSibling.getAttribute('slot') == 'full-post-link') {
                        return p[3].previousElementSibling.href;
                    }
                }
            },
            headers: (url, self) => {
                if (/redgifs\.com\//.test(url)) {
                    return { Authorization:`Bearer ${self.redgifsToken}` };
                }
            },
            query: function(html, doc, url) {
                try {
                    if (/redgifs\.com\//.test(url)) {
                        let data;
                        try {
                            data = JSON.parse(html);
                        } catch (e) {
                            return;
                        }
                        if (data && data.gif) {
                            return data.gif.urls.gif || data.gif.urls.hd;
                        }
                    } else if (/\/by_id\//.test(url)) {
                        let data;
                        try {
                            data = JSON.parse(html);
                        } catch (e) {
                            return;
                        }
                        data = data.data.children[0].data;
                        return (data.gallery_data && data.gallery_data.items || []).map(function(c, i) {
                            var u=data.media_metadata[c.media_id].s
                            return [
                                (u.u ? u.u.replace(/preview(\.redd.it\/[^?]+).*/, 'i$1') : (u.mp4 ? u.mp4 + '#mp4' : u.gif)),
                                (!i ? '[' + new Date(data.created_utc*1e3).toLocaleString() + ' | ' + data.title + '] ' : '') + (c.caption || '')
                            ]
                        })
                    } else if (/\/r\//.test(url)) {
                        let imgs = doc.querySelectorAll("img[src*='preview.redd.it/'],img[data-lazy-src^='https://preview.redd.it/']");
                        let urls = [];
                        [].forEach.call(imgs, img => {
                            if (!img.src && img.getAttribute("data-lazy-src")) {
                                img.src = img.getAttribute("data-lazy-src");
                            }
                            if (!img.srcset && img.getAttribute("data-lazy-srcset")) {
                                img.srcset = img.getAttribute("data-lazy-srcset");
                            }
                            if (img.srcset) {
                                let srcs = img.srcset.split(/[xw],\s*/i);
                                let maxSize = 0;
                                let result = "";
                                srcs.forEach(srcset => {
                                    let srcArr = srcset.split(" ");
                                    let curSize = parseInt(srcArr[1]);
                                    if (srcArr[0].indexOf("?width") == -1) return urls.push(srcArr[0]);
                                    if (curSize > maxSize) {
                                        maxSize = curSize;
                                        result = srcArr[0];
                                    }
                                });
                                if (img.src.indexOf("?width") !== -1) return urls.push(result);
                            }
                            urls.push(img.src);
                        });
                        if (urls.length) return urls;
                        let json = doc.querySelector("[packaged-media-json]");
                        if (json) {
                            let mediaJson = json.getAttribute("packaged-media-json");
                            if (mediaJson) {
                                return JSON.parse(mediaJson).playbackMp4s.permutations.pop().source.url;
                            }
                        }
                        return;
                    }
                    var xmlDoc = (new DOMParser()).parseFromString(html, 'application/xml');
                    var highestRes = [].slice.call(xmlDoc.querySelectorAll('Representation[frameRate]'))
                    .sort(function (r1, r2) {
                        var w1 = parseInt(r1.getAttribute('width')), w2 = parseInt(r2.getAttribute('width'));
                        return w1 > w2 ? -1 : (w1 < w2 ? 1 : 0);
                    })
                    .find(function (repr) { return !!repr.querySelector('BaseURL'); });

                    if (highestRes) {
                        var baseUrl = highestRes.querySelector('BaseURL').textContent.trim();
                        return baseUrl.indexOf('//') !== -1 ? baseUrl : url.replace('DASHPlaylist.mpd', baseUrl);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },
    {
        name: "imgurLink",
        xhr: {
            url: function(a, p) {
                if (!a) return;
                const imgurReg = /^https?:\/\/(?:(?:[im].)?(?:imgur.(?:com|io)|filmot.(?:com|org))\/+(?:(?:(a|gallery(?!\/random|\/custom)|t(?:opic)?\/[^/]+)|r\/[^/]+)\/(?:[^-/]+-)*([^W_]{5}(?:[^_W]{2})?)|(?:[^W_]{5}(?:[^W_]{2})?[,&])+[^_W]{5}(?:[^W_]{2})?)).*/;
                if (a.href.match && imgurReg.test(a.href)) {
                    const m = a.href.match(imgurReg);
                    return m[1] ? 'https://imgur.com/' + (m[1] == 'a' ? 'a/' + m[2] + '/embed' : m[1] + '/' + m[2] + '/hit.json') : m[0];
                }
            },
            query: function(html, doc, url) {
                if (/^https:\/\/imgur\.com\//.test(url)) {
                    var cap = [], urls = [], im, g, c, x, i, t, u, l = '//i.imgur.com/', p404='404 page</title>';
                    try {
                        if (typeof html == 'string' && html[0]!='{') {
                            if(html.lastIndexOf(p404, 300) > -1) throw true;
                            x = html.match(/(?:album|image)\s*[:=] +([^\n\r]+),/);
                            x = JSON.parse(x[1])
                            t = window.t; if (window.t) delete window.t;
                            if (!t&&'title' in x)t = x;
                            x.album_images&&(x=x.album_images);
                            x.images&&(x=x.images)||x.items&&(x=x.items);
                        } else {
                            html=JSON.parse(html);
                            if(html.album){
                                x=html.album
                                t={title:x.title, description: x.description}
                                x=x.images
                            } else {
                                x=html.data.image
                                if (x.is_album) {
                                    t={title:x.title, description: x.description}
                                    if (x.album_images.count != x.album_images.images.length) {
                                        window.t=t
                                        return;
                                    }
                                    x=x.album_images.images
                                }
                            }
                            if (window.t) delete window.t;
                        }

                        if (!x)throw html.lastIndexOf(p404, 300) > -1;

                        t = t && [t.title, t.description].filter(Boolean).join(' - ') || !1
                        x = Array.isArray(x)?x:[x]
                        for (i = 0; i < x.length; ++i) {
                            im = x[i].image||x[i];
                            c = [im.title, im.caption, im.description].filter(Boolean).join(' - ');
                            if (!i && t && t!=c) c='['+t+'] ' + c;
                            im.ext = im.ext || x[i].links.original.match(/\.[^.]+$/)[0];
                            g = (''+im.animated)=='true'
                            u = l + im.hash;
                            urls.push(!g && im.width <= 1200 && im.height <= 1200 ? u + im.ext : (g ? [u + '.mp4', u + '.gif'] : ['#' + u + im.ext, u + 'h' + im.ext]));
                            cap.push(c);
                        }
                    } catch (ex) {}
                    return urls.length ? {url: urls, cap: cap} : null
                }
            }
        }
    },
    {
        name: "Rule34hentai",
        url: /\brule34hentai\.net/,
        r: "/_thumbs/",
        s: "/_images/"
    },
    {
        name: "Rule34",
        url: /\b(rule34\.xxx|realbooru\.com)/,
        src: /\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_/i,
        xhr: {
            url: function(a, p) {
                if (!a) return;
                const re = /^https?:\/\/(?:www\.)?(?:(realbooru\.com|rule34\.xxx))\/index\.php\?page=post&s=view&id=(\d+).*/;
                const m = a.href.match(re);
                if (m) {
                    return a.href;
                }
            },
            query: function(html, doc, url) {
                try {
                    const o = doc.querySelector(".link-list>ul>li>a[href^=http]");
                    return o && o.href;
                } catch { }
            }
        }
    },
    {
        name: "Photosight",
        url: /\bphotosight\.ru/,
        r: /(cdny\.de.*\/)t\//i,
        s: "$1x/"
    },
    {
        name: "Xiaohongshu",
        url: /\bxiaohongshu\.com/,
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
        r: [/\/w\/\d+\/(h\/\d+\/)?(q\/\d+\/)?/i, /.*\.xhscdn\.com.*\d\/(\w+)(!.*|$)/i],
        s: ["/w/1080/", "https://sns-img-bd.xhscdn.com/$1"]
    },
    {
        name: "Youtube",
        url: /\byoutube\.com/,
        ext: function(target) {
            if (target.tagName == "ytd-thumbnail" || target.id == "thumbnail-container") {
                return target.querySelector("img");
            }
        },
        getExtSrc: function() {
            let newsrc = "";
            if (this.id == "thumbnail-container" && this.children[0].hasAttribute("loaded")) {
                let img = this.querySelector('img');
                if (!img) return;
                newsrc = img.src;
            }
            return newsrc.replace(/\?.*$/i,"").replace(/\/an_webp\/([^\/]+)\/mqdefault_6s\.webp/, "/vi/$1/maxresdefault.jpg").replace(/hq\w+\.jpg/, "maxresdefault.jpg");
        },
        getImage: function(a, p) {
            var newsrc=this.src;
            if(p[2] && this.classList.contains('ytd-moving-thumbnail-renderer')){
                newsrc = p[2].querySelector("img").src;
            }
            if(!newsrc || newsrc.indexOf("i.ytimg.com") == -1) return;
            return newsrc.replace(/\?.*$/i,"").replace(/\/an_webp\/([^\/]+)\/mqdefault_6s\.webp/, "/vi/$1/maxresdefault.jpg").replace(/hq\w+\.jpg/, "maxresdefault.jpg");
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
        s: ["https://img2.gelbooru.com/images/$2/$4.png","https://img2.gelbooru.com/images/$2/$4.jpg","https://img2.gelbooru.com/images/$2/$4.jpeg","https://img2.gelbooru.com/images/$2/$4.gif"]
    },
    {
        name: "donmai",
        url: /donmai\.us/,
        src: /(thumbnails|sample)\/(.*)\/(thumbnail|sample)_|\/\d+x\d+\//i,
        r: [/\/(thumbnails|sample)\/(.*)\/(thumbnail|sample)_(.*)/i,
            /\/\d+x\d+\/(.*)\..*/i
           ],
        s: ["/original/$2/$4",["/original/$1.jpg", "/original/$1.png"]]
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
        xhr: {
            url: function(a, p) {
                if (a && a.href.match('/artwork/')) return a.href.replace('/artwork/', '/projects/') + '.json';
            },
            query: function(html) {
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
        name: "weibo 视频",
        url: /^https:\/\/(www\.|s\.|m\.)?weibo\.com/,
        getExtSrc: function() {
            if (this.classList.contains('hoverMask')) {
                let video = this.parentNode.firstElementChild;
                if (video && video.nodeName == 'VIDEO') return [video.poster, video.src];
            }
        },
        video: /video$/
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
        src: /\bgravatar\.com\/avatar\/|\/gravatar\//i,
        r: /(avatar\/.*[\?&]s=).*/,
        s: '$11920'
    },
    {
        name: "ucServerAvatar",
        src: /\buc_server\/avatar\.php/i,
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
        name: "thumbnail",
        src: /\.thumbnail\./i,
        r: /\.thumbnail(\.[^\.]+)$/i,
        s: '$1'
    },
    {
        name: "ytimg",
        src: /i\.ytimg\.com/i,
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
        url: /duitang\.com\//i,
        r: /.thumb.(\d+_)?\d*(_c)?\./i,
        s: '.'
    },
    {
        name: "imgur",
        src: /imgur\.com\//i,
        r: [/h(\.[^\/]+)$/i,/maxwidth=\d+/i,/b\./],
        s: ["$1","maxwidth=99999","."]
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
        name: "douban",
        url: /\bdouban\.com/i,
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
        url: /\bitem\.taobao\.com/i,
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
        url: /\byhd\.com/i,
        src: /yihaodianimg\.com/i,
        r: /(.*\.yihaodianimg\.com\/.*)_\d+x\d+\.jpg$/i,
        s: "$1.jpg"
    },
    {
        name: "jd",
        url: /\bjd\.com/i,
        src: /360buyimg\.com/i,
        r: [/(.*360buyimg\.com\/)n\d\/.+?\_(.*)/i,
            /(.*360buyimg\.com\/)n\d\/(.*)/i,
            /(.*360buyimg\.com\/.*)s\d+x\d+_(.*)/i],
        s: ["$1imgzone/$2","$1n0/$2","$1$2"]
    },
    {
        name: "dangdang",
        url: /\bdangdang\.com/i,
        src: /\bddimg\.cn/i,
        r: /(.*ddimg.cn\/.*?)_[bw]_(\d+\.jpg$)/i,
        s: "$1_e_$2"
    },
    {
        name: "duokan",
        url: /\bduokan\.com/i,
        r: /(cover.read.duokan.com.*?\.jpg)!\w+$/i,
        s: "$1"
    },
    {
        name: "yyets",
        url: /\byyets\.com/i,
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
        url: /\bnhentai\./i,
        r: [/(cdn\..*\d+)t(\.[a-z]+)$/, /\/\/\w+(\..*\/)(\d+)t(\.[a-z]+)(\.[a-z]+)?$/i],
        s: ["$1$2","//i$1$2$3"],
        example: "http://nhentai.net/g/113475/"
    },
    {
        name: "GithubAvatars",
        url: /\bgithub\.com/i,
        r: /(avatars\d*\.githubusercontent\.com.*)\?.*$/i,
        s: "$1",
        example: "https://avatars2.githubusercontent.com/u/3233275/"
    },
    {
        name: "ggpht",
        src: /\bggpht\.com/i,
        r: /=s\d+.*/i,
        s: "=s9999"
    },
    {
        name: "kodansha",
        url: /\bkodansha\.co\.jp/i,
        src: /\bkodansha\.co\.jp/i,
        r: 't_og_image_center',
        s: 'c_limit'
    },
    {
        name: "fanseven",
        url: /\bfanseven\.com/i,
        src: /\bfanseven\.com/i,
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
        },
        xhr: {
            url: function(a, p) {
                if (!a) return;
                const re = /\/(p|reel)\/([^/]{1,})/
                const m = a.href.match(re);
                if (m && a.querySelector('svg')) {
                    const shortcode = m[2];
                    const lower = 'abcdefghijklmnopqrstuvwxyz';
                    const upper = lower.toUpperCase();
                    const numbers = '0123456789';
                    const ig_alphabet = upper + lower + numbers + '-_';
                    const o = shortcode.replace(/\S/g, m => (ig_alphabet.indexOf(m) >>> 0).toString(2).padStart(6, '0'));
                    let mediaId = BigInt('0b' + o).toString(10);
                    return `https://www.instagram.com/api/v1/media/${mediaId}/info/`;
                }
            },
            headers: {"X-IG-App-ID":"936619743392459"},
            cacheNum: 20,
            query: function(html) {
                try {
                    const o = JSON.parse(html);
                    const items0 = o.items[0];
                    const videos = items0.video_versions;
                    const images = items0.image_versions2;
                    const carousel = items0.carousel_media;
                    if (videos) {
                        const videoUrl = "video:" + videos[0].url;
                        let videoAudioSubtitlesUrl = videoUrl;
                        const caption = (items0.caption ? items0.caption.text : (items0.accessibility_caption ? items0.accessibility_caption : items0.user.full_name));
                        return {url: [videoUrl], cap: caption};
                    } else if (carousel) {
                        let gallery = [];
                        const caption = (items0.caption ? items0.caption.text : (items0.accessibility_caption ? items0.accessibility_caption : items0.user.full_name));
                        carousel.map(c => { gallery.push(c.video_versions ? c.video_versions[0].url : c.image_versions2.candidates[0].url); });
                        return {url: gallery, cap: caption};
                    } else if (images) {
                        const imagesUrl = images.candidates[0].url;
                        return imagesUrl;
                    }
                } catch { }
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
        xhr: {
            url: function(a,p) {
                if (a && a.className==='slider_init_href' && a.href && !this.nextElementSibling) {
                    return a.href;
                }
            },
            query: '.sh-section__image>img',
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
        xhr:{
            url: ["^https?://(?:www\\.)?(sankaku)complex(\\.com/)(?:\\w{2}/)?(post)s?/(?:show/)?([a-zA-Z0-9]+).*", "https://$1api$2$3s/$4/fu"],
            query: function(html, doc, url) {
                const re = /^https?:\/\/((?:idol|chan|www)\.)?(sankaku)complex(\.com\/)(?:\w{2}\/)?(post)s?\/(?:show\/)?([a-zA-Z0-9]+).*/;
                const $ = url.match(re);
                if(html[0]!=='{') return;
                let meta = document.querySelector('head > meta[name="referrer"]');
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'referrer';
                    meta.content = 'same-origin';
                    document.getElementsByTagName('head')[0].appendChild(meta);
                } else if (meta.attributes.content.value !== 'same-origin') {
                    meta.attributes.content.value = 'same-origin';
                }
                let lowres_url, highres_url;
                lowres_url = html.match(/(?:(?:Resized: <a|<a id="lowres"[^>]+?) href=|sample_url": ?)"([^"]+)/)?.[1];
                highres_url = html.match(/(?:(?:Original: <a|<a id="highres"[^>]+?) href="|file_url":"?)([^(,")]+)/)?.[1];
                return highres_url;
            }
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
    },
    {
        name: "blogger",
        src: /blogger\.googleusercontent\.com\/img/,
        r: /\/[sw]\d+\/.*/,
        s: "/s0"
    },
    {
        name: "煎蛋",
        url: /^https:\/\/jandan\.net\//,
        r: [/\/(thumb\d+|mw\d+)\//, /!square/],
        s: ["/large/", ""]
    },
    {
        name:"辉夜白兔",
        url:/47\.101\.137\.235/,
        r:"thumb",
        s:"regular"
    },
    {
        name: "Civitai",
        url: /^https:\/\/civitai\.com\//,
        r: /\/width=\d+\//,
        s: "/"
    },
    {
        name: "網易雲音樂",
        url: /^https:\/\/music\.163\.com\//,
        getExtSrc:function() {
            if (this.tagName === 'A' && this.className === "msk") {
                return this.previousElementSibling.src.replace(/\?param=\d+y\d+/, "");
            }
        },
        r: /\?param=\d+y\d+/,
        s: ""
    },
    {
        name: "Dlsite",
        src: /^https:\/\/img\.dlsite\.jp\//,
        r: /\/resize\/(.*)_\d+x\d+/,
        s: "/modpub/$1"
    },
    {
        name: "postype",
        url: /^https:\/\/www\.postype\.com\//,
        r: [/\/resize(\/.*\/)\d+x\d+x\d+\/\w+?\//, /\?w=.*/],
        s: ["$1", ""]
    },
    {
        name: "piccoma jp",
        url: /^https:\/\/piccoma\.com\//,
        r: [/(thumbnail|cover)_x\d/, /x\d$/],
        s: ["cover_x3", "x3"],
        getExtSrc: function() {
            if (this.children[0] && this.children[0].nodeName === "IMG") {
                return this.children[0].src.replace(/(thumbnail|cover)_x\d/, "cover_x3").replace(/x\d$/, "x3");
            }
        }
    },
    {
        name: "bunkr",
        url: /bunkr\.si/,
        r: /\/thumbs(\/.*)png/,
        s: "$1jpg"
    },
    {
        name:"vk",
        url:/vk\.com/,
        xhr:{
            url: function() {
                if (this.classList.contains("photos_row")) {
                    return this.firstElementChild && this.firstElementChild.href;
                }
            },
            query: function(html, doc) {
                let r = doc.querySelector('meta[name="og:image"]');
                if (!r) return;
                r = r.getAttribute("value");
                if (!r) return;
                r = r.match(/\/([\w\-]+)\.(jpg|png)/);
                if (!r) return;
                r = r[1];
                r = html.match(new RegExp(`"z_src":"([^"]*?${r}[^"]*?)","z_"`));
                return r && r[1];
            }
        }
    },
    {
        name: "sspai",
        url: /^https?:\/\/sspai\.com\//,
        r: /\?imageMogr.*/,
        s: ""
    },
    {
        name: "la-croix",
        url: /^https?:\/\/www\.la\-croix\.com\//,
        r: /\/\d+x\d+\//,
        s: "/x/"
    },
    {
        name:"e-hentai",
        url:/^https?:\/\/(e\-|ex)hentai\.org\//i,
        xhr: {
            url: function(a, p) {
                if (!a || !/blank\.gif$/.test(this.src)) return;
                const re = /\/s\//i;
                const m = a.href.match(re);
                return m && a.href;
            },
            query: function(html, doc) {
                let img = doc.querySelector("#img");
                return img && img.src;
            }
        }
    },
    {
        name:"turboimagehost",
        url:/^https?:\/\/www\.turboimagehost\.com\//i,
        xhr: {
            url: ".bbc_link",
            query: "#imageid"
        }
    },
    {
        name:"freepik",
        url:/^https?:\/\/www\.freepik\.com\//i,
        xhr: {
            url: ".showcase__link",
            query: "img[fetchpriority]"
        }
    },
    {
        name: "imgtraffic",
        r: /^(https:\/\/imgtraffic\.com\/\d+)s\//,
        s: "$1/"
    },
    {
        name: "dailymail",
        url: /^https:\/\/(www\.)?dailymail\.co\.uk\//i,
        xhr: {
            url: "a[href*='/article']",
            query: "video,img.img-share,[data-testid='image-component']>img"
        }
    },
    {
        name: "zerochan",
        url: /^https:\/\/(www\.)?zerochan\.net\//i,
        xhr: {
            url: "a.thumb",
            query: "#large>a.preview"
        }
    },
    {
        name: "rutracker",
        url: /^https:\/\/rutracker\.net\//i,
        getImage: function(a) {
            if (a && /fastpic\.ru/.test(a.href)) {
                let matched = a.href.match(/\.(\w+)\.html(&|$)/);
                return matched && this.src.replace("/thumb/", "/big/").replace(/\w+(\?.*|$)/, matched[1]);
            }
        }
    },
    {
        name: "rule34.paheal",
        url: /^https:\/\/rule34\.paheal\.net\//,
        getImage: function(a, p) {
            let result = this.src.match(/.*\/_thumbs\/((..)(..).*)\//);
            if (result) {
                result = `https://r34i.paheal-cdn.net/${result[2]}/${result[3]}/${result[1]}`;
                if (p[1] && p[1].dataset.ext === "mp4") result = "video:" + result;
                return result;
            }
        }
    },
    {
        name: "amazon",
        url: /^https?:\/\/www\.amazon\./,
        lazyAttr: "data-a-hires",
        r: [/_?(_AC_|_CR0).*\./, /\._S.\d+\_?/],
        s: ["", ""]
    },
    {
        name: "hentaigifz",
        url: /^https:\/\/hentaigifz\.com/,
        r: /-thumbnail.*/,
        s: ".gif"
    },
    {
        name: "Bangumi",
        url: /^https:\/\/(bgm|bangumi)\.tv\//,
        r: ["/c/","/m/"],
        s: "/l/"
    },
    {
        name: "porngifmag",
        url: /^https:\/\/porngifmag\.com/,
        xhr: {
            url: ".thumb-image>a",
            query: ".single-image>img"
        }
    },
    {
        name: "behance",
        url: /^https:\/\/www\.behance\.net/,
        xhr: {
            url: /^\/gallery\//,
            query: "img[class^='ImageElement-image']"
        },
        getExtSrc: function() {
            if (this.className && this.className.indexOf && this.className.indexOf("ProjectCoverNeue-link") !== -1) {
                let img = this.parentNode.parentNode.querySelector("picture>img");
                if (img) return img.src;
            }
        }
    },
    {
        name: "postimg host",
        src: /^https:\/\/i\.postimg\.cc/,
        xhr: {
            url: /^https:\/\/postimg\.cc\//,
            query: "#main-image"
        }
    },
    {
        name: "postimg Link",
        xhr: {
            url: /^https:\/\/postimg\.cc\//,
            query: function(html, doc, url) {
                if (url.indexOf("gallery") != -1) {
                    let urls = [];
                    [].forEach.call(doc.querySelectorAll("#thumb-list>.thumb-container"), ele => {
                        let hotlink = ele.dataset.hotlink;
                        let name = ele.dataset.name;
                        let ext = ele.dataset.ext;
                        if (hotlink && name && ext) {
                            urls.push(`https://i.postimg.cc/${hotlink}/${name}.${ext}`);
                        }
                    });
                    if (urls.length) return urls;
                }
                let img = doc.querySelector("#download");
                if (img) {
                    return img.href;
                } else img = doc.querySelector("#main-image");
                return img && img.src;
            }
        }
    },
    {
        name: "postimg",
        url: /^https:\/\/postimg\.cc/,
        xhr: {
            url: ".thumb>a",
            query: "#main-image"
        }
    },
    {
        name: "imagebam",
        src: /^https:\/\/thumbs\d*\.imagebam\.com\//,
        xhr: {
            url: function(a, p) {
                let imageId = this.src.match(/\/(\w+)\_\w\./);
                if (!imageId) return null;
                return `https://www.imagebam.com/view/${imageId[1]}`;
            },
            query: ".main-image"
        }
    },
    {
        name: "Yupoo main",
        url: /\byupoo\.com\//,
        xhr: {
            url: /^\/albums\//,
            query: "[data-type=photo]>img[data-src]",
        }
    },
    {
        name: "Google review",
        url: /\bgoogle\.com\//,
        r: [/=w\d+\-h\d+\-\w/, /=s\d+/],
        s: ["=s0-v1", "=s0"]
    },
    {
        name: "MAL Anime/Manga",
        src: /^https:\/\/cdn\.myanimelist\.net/,
        r: /(\/r\/\d+x\d+)?(\/images\/(anime|manga)\/\d+\/\d+)\.(webp|jpg).+/,
        s: "$2l.jpg"
    },
    {
        name: "afdiancdn",
        url: /^https:\/\/afdian\.net\//,
        r: "/(w/\\d+/)?h/\\d+/i",
        s: ""
    },
    {
        name: "携程",
        url: /^https:\/\/(www\.|m\.)?ctrip\.com/,
        r: /_(C|D)_\d[^\.]*/i,
        s: ""
    },
    {
        name: "nozomi",
        url: "^https://nozomi\\.la",
        r: "///qtn(\\..*)\\.\\w+\\.webp/i",
        s: "//w$1.webp"
    },
    {
        name: "hentaizap",
        url: /\bhentaizap\.com\//,
        r: /t\.jpg$/,
        s: ".webp"
    },
    {
        name: "Wjcodes",
        url: /^https:\/\/[^\.]+\.wjcodes\.com\//,
        getImage: function(a, p) {
            if (!p[0]) return;
            let dtEle;
            if (dtEle = p[0].querySelector("[d=t]")) {
                let onclick = dtEle.getAttribute("onclick");
                if (onclick) return onclick.replace(/.*download_file\('([^']+).*/, "$1");
            }
        }
    },
    {
        name: "anime-pictures",
        url: /^https:\/\/anime\-pictures\.net\//,
        xhr: {
            url: /^\/posts\//,
            query: "a.icon-download"
        }
    },
    {
        name: "hentai-sharing",
        url: /^https:\/\/hentai\-sharing\.net\//,
        getImage: function(a, p) {
            if (a && a.href.indexOf("https://hentai-sharing.net/nyaa/") == 0) {
                let link = atob(a.href.replace("https://hentai-sharing.net/nyaa/", ""));
                return /\.(?:jpe?|pn)g/.test(link) ? link : '';
            }
        }
    },
    {
        name: "streamain",
        url: "^https://(www\\.)?img(?:inn|sed)\\.com/",
        xhr: {
            url: "/^https://(www\\.)?img(?:inn|sed)\\.com/p/[\\w-]/",
            query: '.swiper-slide,.downloads a'
        }
    },
    {
        name: "zlib",
        src: /^https:\/\/[^\/]+\.cdn\-zlib\./i,
        r: /covers\d+/i,
        s: 'covers4096'
    }
];
