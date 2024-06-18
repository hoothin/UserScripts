// ==UserScript==
// @name         草榴小助手
// @namespace    hoothin
// @version      0.7.3
// @description  草榴小助手修复，提供“加亮今日帖子”、“移除viidii跳转”、“图片自动缩放”、“种子链接转磁力链”、“预览整页图片”、“游客站内搜索”、“返回顶部”等功能！
// @author       NewType & hoothin
// @match        *://*.t66y.com/*
// @run-at       document-end
// @grant        none
// @license      MIT License
// ==/UserScript==

(function() {
    'use strict';

    const enable1024sDelay = true;
    const defaultReply = "1024 感謝分享";
    var helper = {
        addCss: function(css) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        addScript: function(js) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.appendChild(document.createTextNode(js));
            document.body.appendChild(script);
        },
        getCss: function(src) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        getScript: function(src, onload) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = onload;
            script.src = src;
            document.body.appendChild(script);
        },
        timeFormat: function(data, format) { // eg:data=new Data() eg:format="yyyy-MM-dd hh:mm:ss";
            var o = {
                'M+': data.getMonth() + 1,
                'd+': data.getDate(),
                'h+': data.getHours(),
                'm+': data.getMinutes(),
                's+': data.getSeconds(),
                'q+': Math.floor((data.getMonth() + 3) / 3),
                'S': data.getMilliseconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return format;
        },
        hash: function(url) {
            var hash = url.split('hash=');
            return hash[1].substring(3);
        },
        inurl: function(str) {
            var url = document.location.href;
            return url.indexOf(str) >= 0;
        }
    };

    /*-------------------------------------------------------------------------------------------------------------------------------------------*/
    var t66y = function() {
        if(typeof($) == "undefined")return;
        if (helper.inurl('/thread')) {
            // 高亮今天发表的帖子
            helper.addCss('.newTag{border-bottom:1px dotted red; color:red !important}.newPost{color:#ff5722; background:#fafff4;}.newPost a[target=_blank]{color:#5656ff;}');
            var today = new Date();
            today = helper.timeFormat(today, 'yyyy-MM-dd');
            $('tr.tr3').each(function() {
                var isToday = $(this).children('td').eq(2).find('div.f12').text().split(" ")[0];
                if (isToday === today || isToday == "今天") {
                    $(this).find('td:first').children().html('NEW').addClass('newTag');
                    $(this).addClass('newPost');
                }
            });
        }

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        if (helper.inurl('/htm_data/') || helper.inurl('read.php?')) {
            // 移除图片viidii跳转 & 图片自动缩放
            var imgList = new Array(0);
            var maxWidth = parseInt($("div#main").width() - 200) + 'px';
            $(document).ready(function() {
                $('img[ess-data]').each(function() {
                    $(this).off("click");

                    $(this).attr('onclick', 'window.open(this.src);').css('max-width', maxWidth);
                    if($(this).attr('src')){
                        imgList.push($(this).attr('src'));
                    }
                });
                if (imgList.length > 0) {
                    ImageView(imgList);
                }
            });

            // 移除a标签viidii跳转
            $("a[href*=\'.viidii.\']").each(function() {
                var href = $(this).attr('href');
                var newHref = href.replace('http://www.viidii.com/?', '').replace('http://www.viidii.info/?', '').replace(/______/g, '.').replace(/&z/g, '');
                $(this).attr('href', newHref);
            });
            $("a[href*=\'.redircdn.\']").each(function() {
                var href = $(this).attr('href');
                var newHref = href.replace('https://to.redircdn.com/?', '').replace(/______/g, '.').replace(/&z/g, '');
                $(this).attr('href', newHref);
            });

            $.fn.isInViewport = function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                return elementBottom > viewportTop && elementTop < viewportBottom;
            };


            // 种子链接转磁力链
            var torLink = $("a[href*=\'?hash\=\']");
            if( torLink.length > 0 ){
                var tmpNode = '<summary>本页共有 ' + torLink.length + ' 个磁力链！</summary>';
                torLink.each(function() {
                    var torrent = $(this).attr('href');
                    var hash = helper.hash(torrent);
                    var magnet = 'magnet:?xt=urn:btih:' + hash;
                    tmpNode += '<p><a target="_blank" href="' + magnet + '">【 磁力链:　' + magnet + ' 】</a>　　<a target="_blank" href="' + torrent + '">【 下载种子 】</a>　　<a target="_blank" href="http://apiv.ga/magnet/' + hash + '">【 九秒磁力云播 】</a></p>';
                });
                $('body').append('<div style="position:fixed;top:0px;background:#def7d4;width:100%;padding:4px;text-align:center;"><details>' + tmpNode + '</details></div>');
            }
            helper.addCss('div#main>form[name="FORM"] { position: fixed; bottom: 0; left: 0; background: #f9f9ec; white-space: nowrap; } form[name="FORM"] tbody>tr:last-child { height: 0px; display: block; overflow: hidden; transition: height 0.5s ease; } form[name="FORM"]:hover tbody>tr:last-child,form[name="FORM"]:focus-within tbody>tr:last-child { height: 200px; }');
            var submitBtn = $('form[name="FORM"] .btn[name="Submit"]');
            var textarea = $('form[name="FORM"] [name="atc_content"]');
            if (submitBtn.length && textarea.length) {
                var quickReplyStr = '快速回复';
                var quickReply = $( `<input style="margin-left: 10px" class="btn" type="button" value="${quickReplyStr}">` );
                quickReply.insertAfter( "form .btn" );
                var replyStr = defaultReply;

                helper.getScript('//cdn.jsdelivr.net/npm/jquery.cookie@1.4.1/jquery.cookie.min.js', e => {
                    var $tLike = $(".t_like");
                    if ($tLike.length) {
                        var $tLikeClone = $tLike.clone();
                        $("#conttpc").prepend($tLikeClone);

                        $(window).on("resize scroll", function() {
                            if ($tLike.isInViewport()) {
                                if ($tLikeClone.parent().length) $tLikeClone.detach();
                            } else {
                                if ($tLikeClone.parent().length == 0) $("#conttpc").prepend($tLikeClone);
                            }
                        });
                    }
                    function getCurrentDate() {
                        var myDate = new Date();
                        return myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
                    }
                    var currentDate = getCurrentDate();
                    if (currentDate == $.cookie('lastSignDate')) {
                        document.title = "✅" + document.title;
                    }
                    var lastReplyTime = $.cookie('lastReplyTime');
                    var customReplyStr = $.cookie('customReplyStr');
                    var isCheckIn = document.title.indexOf("打卡签到") !== -1;
                    if (customReplyStr) {
                        replyStr = customReplyStr;
                        $.cookie('customReplyStr', replyStr, { expires: 365, path: '/' });
                    }
                    if (isCheckIn) {
                        var spaceStr = "";
                        var spaceLen = Math.floor(Math.random() * 10);
                        for (var i = 0; i < spaceLen; i++) {
                            spaceStr += " ";
                        }
                        replyStr = "今日签到";// + spaceStr;
                    }
                    quickReply.attr('title', replyStr + "（右击修改）");
                    var formTitle = $("form td.h>b").text();
                    function setCountdown() {
                        if (!enable1024sDelay) return;
                        quickReply.attr("disabled", true);
                        quickReply.css("background", "initial");
                        var leftTime = parseInt((lastReplyTime - Date.now()) / 1000 + 1025);
                        quickReply.val(quickReplyStr + ": " + leftTime + "s");
                        $("form td.h>b").html(`${formTitle}<font color=red>（${leftTime + "s"}）</font>`);
                        var countTimer = setInterval(() => {
                            leftTime = parseInt((lastReplyTime - Date.now()) / 1000 + 1025);
                            if (leftTime <= 0) {
                                quickReply.val(quickReplyStr);
                                $("form td.h>b").text(formTitle);
                                quickReply.removeAttr("disabled");
                                quickReply.css("background", "");
                                clearInterval(countTimer);
                            } else {
                                quickReply.val(quickReplyStr + ": " + leftTime + "s");
                                $("form td.h>b").html(`${formTitle}<font color=red>（${leftTime + "s"}）</font>`);
                            }
                        }, 1000);
                    }
                    if (lastReplyTime && Date.now() - parseFloat(lastReplyTime) < 1024000 + 1000) {
                        setCountdown();
                    }
                    let form = $('form[name="FORM"]');
                    function replyFail() {
                        submitBtn.val("提 交");
                        quickReply.val("回复失败");
                        $("form td.h").css("background", "rgb(244, 67, 54)");
                        setTimeout(() => {
                            quickReply.val(quickReplyStr);
                            $("form td.h").css("background", "");
                        }, 2000);
                    }
                    let rushSuccess = false;
                    function replySuccess() {
                        rushSuccess = true;
                        lastReplyTime = Date.now();
                        $.cookie('lastReplyTime', lastReplyTime, { expires: 7, path: '/' });
                        if (isCheckIn) {
                            $.cookie('lastSignDate', currentDate, { expires: 7, path: '/' });
                        }
                        submitBtn.val("提 交");
                        quickReply.val("回复成功");
                        quickReply.css("background", "yellow");
                        $("form td.h").css("background", "yellow");
                        setTimeout(() => {
                            setCountdown();
                            $("form td.h").css("background", "");
                        }, 2000);
                    }
                    function isRushTime() {
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var today = date.getDate();
                        var hour = date.getHours();
                        if (hour < 20) return false;

                        var newYear = year;
                        var newMonth = month++;
                        if (month > 12) {
                            newMonth = 1;
                            newYear++;
                        }
                        var newDate = new Date(newYear, newMonth, 1);
                        var monthLast2Day = (new Date(newDate.getTime() - 2 * 1000 * 60 * 60 * 24)).getDate();
                        return (today == monthLast2Day);
                    }
                    function submitReply() {
                        $.ajax({
                            type: form.attr('method'),
                            url: form.attr('action'),
                            data: form.serialize(),
                            success: function (res) {
                                if (res.indexOf("發貼完畢點擊進入主題列表") == -1) {
                                    replyFail();
                                    alert($(res).find("ol").text() || $(res).find("center").text());
                                    quickReply.removeAttr("disabled");
                                } else {
                                    replySuccess();
                                }
                            },
                            fail: function (e) {
                                replyFail();
                                quickReply.removeAttr("disabled");
                            }
                        });
                    }
                    if (isCheckIn && isRushTime()) {
                        let reachRushMinute = false;
                        var rushReply = $( `<input style="margin-left: 10px" class="btn" type="button" value="定時搶簽">` );
                        function requestRush(gap) {
                            if (rushSuccess) return;
                            submitReply();
                            setInterval(() => {
                                if (!rushSuccess) {
                                    requestRush(gap);
                                }
                            }, gap);
                        }
                        function checkRush(timeGap) {
                            setTimeout(() => {
                                let date = new Date();
                                if (date.getHours() == 0) {
                                    textarea.val("今日签到");
                                    submitReply();
                                    let rushTimes = 5;
                                    let rushTimer = setInterval(() => {
                                        if (--rushTimes > 0) {
                                            requestRush(100);
                                        } else {
                                            clearInterval(rushTimer);
                                            rushReply.val("搶簽結束");
                                        }
                                    }, 5);
                                } else {
                                    if (reachRushMinute) {
                                        if (date.getSeconds() == 59) {
                                            checkRush(1);
                                        } else if (date.getSeconds() > 57) {
                                            checkRush(5);
                                        } else if (date.getSeconds() > 50) {
                                            checkRush(500);
                                        } else {
                                            checkRush(1000);
                                        }
                                    } else if (date.getHours() == 23 && date.getMinutes() == 59) {
                                        reachRushMinute = true;
                                        checkRush(1000);
                                    } else {
                                        checkRush(5000);
                                    }
                                }
                            }, timeGap);
                        }
                        rushReply.insertAfter( "form .btn:last-child" );
                        rushReply.click(function() {
                            checkRush(5000);
                            rushReply.attr("disabled", true);
                            rushReply.val("搶簽中……");
                            rushSuccess = false;
                        });
                    }
                    document.FORM.onsubmit = function(event) {
                        if (checkpost(document.FORM)) {
                            submitReply();
                        }
                        event.preventDefault();
                        return false;
                    };
                    quickReply.click(function() {
                        textarea.val(replyStr);
                        submitBtn.click();
                        quickReply.attr("disabled", true);
                    });
                    quickReply.on('contextmenu', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        customReplyStr = prompt("输入自定义回复内容", replyStr || defaultReply);
                        if (customReplyStr) {
                            replyStr = customReplyStr;
                            quickReply.attr('title', replyStr + "（右击修改）");
                            $.cookie('customReplyStr', customReplyStr, { expires: 365, path: '/' });
                        }
                    });
                });
            }
        }

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        // 预处理整页图片
        function ImageView(imgList) {
            helper.getCss('//cdn.jsdelivr.net/lightgallery/1.3.7/css/lightgallery.min.css');
            helper.getScript('//cdn.jsdelivr.net/picturefill/2.3.1/picturefill.min.js');
            helper.getScript('//cdn.jsdelivr.net/lightgallery/1.3.7/js/lightgallery.min.js');
            helper.getScript('//cdn.jsdelivr.net/g/lg-fullscreen,lg-thumbnail,lg-autoplay,lg-zoom');
            helper.getScript('//cdn.jsdelivr.net/mousewheel/3.1.13/jquery.mousewheel.min.js');

            helper.addCss('#viewer{max-width:1280px;margin:auto;display:none}#viewer > ul{margin-bottom:0;padding:0;column-count:5;-moz-column-count:5;-webkit-column-count:5;}#viewer > ul > li{-moz-page-break-inside: avoid; -webkit-column-break-inside: avoid; break-inside: avoid;float:left;margin-bottom:15px;margin-right:15px;width:240px;list-style-type:none}#viewer > ul > li a{border:3px solid #FFF;border-radius:3px;display:block;overflow:hidden;position:relative;float:left}#viewer > ul > li a > img{transition:transform .3s ease 0s;transform:scale3d(1, 1, 1);width:240px}#viewer > ul > li a:hover > img{transform:scale3d(1.1, 1.1, 1.1);opacity:.9}');
            $('div#main').before('<div id="viewer"><ul id="lightgallery" class="list-unstyled row"></ul></div>');

            var lightGallery = $('#lightgallery');
            $.each(imgList, function(i, n) {
                i++;
                lightGallery.append('<li data-src="' + n + '" data-sub-html="<h4>Image' + i + '</h4><p>' + n + '</p>"><a href=""><img class="img-responsive" src="' + n + '"></a></li>');
            });

            helper.addCss('.viewer{position:fixed; top:7px; right:7px; cursor:pointer;}');
            helper.addScript('function Viewer(){ $("#lightgallery").lightGallery(); $("html,body").animate({scrollTop:0}, 500); $("div#viewer,div#main,div#footer").fadeToggle(300); }');
            $('body').append(`<svg class="viewer" onmousedown="this.style.opacity=0;" onclick="Viewer();this.style.opacity=1;" title="预览整页图片" style="width: 50px;height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M871.125 433.75a119.85 119.85 0 1 0 0-239.66 119.85 119.85 0 0 0 0 239.66z m209.622-399.318H102.272c-38.955 0-69.93 31.701-69.93 70.656v817.067c0 38.954 30.975 70.656 69.93 70.656h978.475c38.954 0 69.93-31.702 69.93-70.656V105.088c0-38.955-30.976-70.656-69.93-70.656z m-257.28 493.44a42.837 42.837 0 0 0-31.958-15.488c-12.714 0-21.674 5.973-31.957 14.208l-46.677 39.467c-9.728 6.997-17.494 11.733-28.672 11.733a41.301 41.301 0 0 1-27.478-10.24 338.09 338.09 0 0 1-10.752-10.24L511.701 412.075a55.04 55.04 0 0 0-41.685-18.774c-16.725 0-32.213 8.278-41.941 19.499L112.213 793.643V143.53c2.475-16.982 15.702-29.227 32.683-29.227h892.928c17.237 0 31.19 12.757 32.213 29.952l0.726 649.899L823.38 527.872z"></path></svg>`);
        }

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        // 返回顶部
        $('body').append('<svg class="icon" onclick="$(document.body).animate({scrollTop:0},300);$(document.documentElement).animate({scrollTop:0},300);" title="返回顶部" style="position:fixed; bottom:20px; right:10px; cursor:pointer; width: 50px;height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6473"><path d="M256 170.666667h512v85.333333H256z m213.333333 426.666666v256h85.333334v-256h213.333333l-256-256-256 256z" p-id="6474"></path></svg>');

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        // 游客站内搜索
        $(function() {
            helper.addScript('(function(){var cx = "017632740523370213667:kcbl-j-fmok";var gcse = document.createElement("script");gcse.type = "text/javascript";gcse.async = true;gcse.src = "https://cse.google.com/cse.js?cx=" + cx;var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(gcse, s);})();');
            helper.addCss('.gsrch{width:400px;float:right;margin:15px -25px 0 0;}.gsc-control-cse {background-color:#0f7884 !important;border:0 !important;padding:0 !important;}');
            $('.banner').append('<div class="gsrch"><gcse:search></gcse:search></div>');
        });
    };

    /*-------------------------------------------------------------------------------------------------------------------------------------------*/

    //helper.getScript('//cdn.staticfile.org/jquery/1.12.4/jquery.min.js', t66y);
    t66y();
})();