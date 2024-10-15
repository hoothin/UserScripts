// ==UserScript==
// @name           flashViewer
// @author         NLF & Hoothin
// @description    围观Flash，增加 HTML5 视频速度与亮度调整
// @version        1.2.1.8
// @created        2013-12-27
// @lastUpdated    2024-8-10
// @grant          none
// @run-at         document-start
// @namespace      http://userscripts.org/users/NLF
// @homepage       http://userscripts.org/scripts/show/187351
// @downloadURL    https://userscripts.org/scripts/source/187351.user.js
// @updateURL      https://userscripts.org/scripts/source/187351.meta.js
// @include        *
// @match          *://*/*
// @exclude        http://www.toodledo.com/tasks/*
// @exclude        *://maps.google.*/*
// @exclude        *://www.google.*/
// ==/UserScript==

/*
    本脚本用的部分高级特性：
    feature: ie, firefox, chrome, opera

    MutationObserver: 11+, 14+, (18-26(WebKit), 27+), 15+
    JSON: 8+, 3.5+, 4+, 10.5+
    Function.prototype.bind: 9+, 4+, 7+, 12+
    Function.prototype.forEach: 9+, 3+, 5+, 10.1+
    Function.prototype.some: 9+, 3+, 5+, 10.1+
    Array.isArray: 9+, 4+, 5+, 10.5+
    element.classList: 10+, 3.6+, 8+, 11.5+
    querySelector,querySelectorAll: 9+, 3.5+, 4.0+, 10+
    requestAnimationFrame: 10+, 4+, 10+, 15+
*/


;(function () {
    'use strict';

    if (window.top != window.self) {
        try {
            if (window.self.innerWidth < 300 || window.self.innerHeight < 300) {
                return;
            }
        } catch(e) {
            return;
        }
    }

    function contentScript(messageID) {
        'use strict';

        // console.log(messageID);

        // 选项
        var prefs = {
            // 是否允许按照一定规则重新初始化flash让你获得允许flash全屏，开关自动播放，允许跳转回主页观看等等功能
            allowReinitFlash: true,
            // 浮动工具栏相关设置.
            floatBar: {
                // 按钮排列顺序'pop'(弹出视频),'reload'(重载视频),'close'(关闭视频然后显示占位符（点击占位符的关闭彻底移除视频）)
                // 不想显示的按钮，就不要填，比如改成 ['pop','reload'] 之后 'close'按钮就不会显示了
                butonOrder: ['pop','reload','close'],
                // 浮动工具栏显示延时.单位(毫秒)
                showDelay: 366,
                // 取值为: 'top left'(左上角) 或者 'top right'(右上角) 'bottom right'(右下角) 'bottom left'(左下角);
                position: 'top left',
                //浮动工具栏偏移.单位(像素)
                offset: {
                    // x轴偏移(正值,向右偏移,负值向左)
                    x: -15,
                    // y轴偏移(正值,向下,负值向上)
                    y: -25,
                },
                // 当摸到的视频大于等于设定尺寸的时候才显示悬浮工具栏（用来过滤一些非视频类的flash插件）
                minSizeLimit: {
                    height: 100,
                    width: 100,
                },
            },
            // 弹出的视频相关设置
            popVideo: {
                // 弹出视频后默认关灯
                lightOff: {
                    enabled: false,
                    // 0.01-1.00之间，数字越大越暗。
                    opacity: 0.95,
                } ,
                // 默认钉住，position fixed效果。
                pin: false,
                // 默认最大化
                maximize: false,
            },
        };


        // 按照规则重载object 和 embed标签引用的flash插件
        var rules = [
            {name: '优酷外链',// 给这条规则取个名字，方便自己修改的时候方便
                // 匹配youku外链播放器的正则表达式
                url: /^https?:\/\/(?:static|player)\.youku\.com\/.+/i,
                // 是否让这条规则生效
                enabled: true,
                // 不生效的页面，比如优酷自己的网站上引用的视频。
                excludes: /^https?:\/\/(?:www|v)\.youku\.com\//i,
                // 允许flash全屏['true'|'false']
                // 如果你想外链的视频的全屏播放功能生效，请设置为'true'
                allowFullscreen: 'true',
                // 允许脚本访问['sameDomain'|'never'|'always']
                // 相关请看这里：http://clin003.com/ideas/adobe-actionscript-3-allownetworking-internal-1792/
                allowScriptAccess: 'sameDomain',
                // 允许网络访问['all'|'internal'|'none]
                // 如果你想点击外链视频右下角的youku图标返回youku页面观看，请设置为'all'
                // 设置为 'none' 会导致视频无法加载，除非你不想看视频否则请不要设置为none
                allowNetWorking: 'all',
                // 传递给flash的参数，注意大小写敏感
                // 如果源已经存在的变量会被覆盖掉，
                // 比如源已经有了 a=1&b=2
                // 在这里填上了 a=0&c=3
                // 最后会变成 a=0&b=2&c=3
                flashVars: 'isAutoPlay=false&winType=',
            },
            {name: '土豆外链',
                url: /^https?:\/\/www\.tudou\.com\/\w\/.+/i,
                excludes: /^https?:\/\/www\.tudou\.com\//i,
                enabled: true,
                allowFullscreen: 'true',
                allowNetWorking: 'all',
                flashVars: 'autoPlay=false',
            },
            {name: '腾讯视频外链',
                url: /^https?:\/\/static\.video\.qq\.com\/.+/i,
                excludes: /^https?:\/\/v\.qq\.com\//i,
                enabled: true,
                allowFullscreen: 'true',
                allowNetWorking: 'all',
                flashVars: 'auto=0',
            },
            {name: '新浪视频外链',
                url: /^https?:\/\/(?:p\.)?you\.video\.sina\.com\.cn\/.+/i,
                excludes: /^https?:\/\/video\.sina\.com\.cn\//i,
                enabled: true,
                allowFullscreen: 'true',
                allowNetWorking: 'all',
                flashVars: 'autoPlay=0',
            },
            {name: '乐视外链',
                url: /^https?:\/\/(?:img1\.c0|i7\.imgs)\.letv\.com\//i,
                excludes: /^https?:\/\/www\.letv\.com\//i,
                enabled: true,
                allowFullscreen: 'true',
                allowNetWorking: 'all',
                flashVars: 'autoPlay=0',
            },
            {name: 'youtube外链',
                url: /^(?:https?:)?\/\/www\.youtube(-nocookie)?\.com\/v\/.+/i,
                excludes: /https?:\/\/www\.youtube\.com\//i,
                enabled: true,
                allowFullscreen: 'true',
                allowNetWorking: 'all',
                flashVars: 'autoplay=0',
            },
            {name: '17173视频外链',
                url: /^https?:\/\/(?:f\.v\.17173cdn|v\.17173|17173\.tv\.sohu)\.com\//i,
                excludes: /^https?:\/\/(?:17173\.tv\.sohu|v\.17173)\.com\//i,
                enabled: true,
                allowNetWorking: 'all',
                flashVars: 'autoplay=0',
            },
            {name: '音悦台外链',
                url: /^https?:\/\/player\.yinyuetai\.com\//i,
                excludes: /^https?:\/\/v\.yinyuetai\.com\//i,
                enabled: true,
                allowNetWorking: 'all',
                flashVars: 'autostart=false',
            },
        ];


        // 这里的规则为了兼容一些特殊的网站弹出视频时和页面本身冲突功能的修正
        // 这个规则没有定型的模版，会通过各特殊网站进行不断的修正。
        var popVideoRules = [
            {name: '优酷',
                url: /^https?:\/\/v\.youku\.com\/.+/i,
                command: 'addStyle',
                css: getMStr(function () {
                    var cssText;
                    /*
                        #player {
                            position: relative !important;
                            z-index: auto !important;
                            opacity: 1 !important;

                        }
                        #playBox {
                            z-index: auto !important;
                        }
                    */
                }).cssText,

            },
        ];

        // 用到的图标
        var icons = {
            // 浮动工具栏
            floatBar: {
                pop: 'data:image/gif;base64,R0lGODlhGAAYANUAALe3t1VVVVhYWHh4eFZWVnp6enl5eVRUVHd3d2RkZHV1dWlpaV9fX2BgYGdnZ2JiYltbW1lZWV1dXXR0dHJycnBwcGtra25ubqOjo21tbWpqanZ2dmVlZWZmZrOzs0NDQ1FRUWFhYUJCQkRERGNjYzQ0NDc3N4qKimhoaF5eXp2dnaurqzg4OIyMjI2NjUxMTDY2NktLSwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQyMURFRUQ4M0E3MUUzMTE5NkU5QkE5QzUwNzQwMEU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU2OTFDOEExNzE1QzExRTNBMjczRDBCODI5NDdEMEJEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU2OTFDOEEwNzE1QzExRTNBMjczRDBCODI5NDdEMEJEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkI0NUQ4MjE0QTcxRTMxMTgxNTRFOEY2NjZDRTQ2QjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxREVFRDgzQTcxRTMxMTk2RTlCQTlDNTA3NDAwRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAGAAYAAAG6MCCcEgsGoeGpHLJbCoH0Kh0So0irtjsZjTaZL8IhXg8rrA2G1OFzJ643+5FqQUAuEoLOJzC71NSMCp1dSomKX59FYqLICIrg4MrIiCLixeXlx8BHpCQHgEfmJcZpBkvCJ2pAAgxpRkWsBYnGLQYqbUYJ7EWC72+vRapvL++DsbHxhqpGsjICc/QzyipKNHRD9jZ2B2pHdraDeHi4RypHOPjDOrr6gmpCezsEvP08ySpJPX1EPz9/CGpQvjzF6GgwYLKOmk4eFCAw4cQI0p8SKCixYsYM1oMwLGjx48gOx4YSbKkyZMkgwAAOw==',
                reload: 'data:image/gif;base64,R0lGODlhGAAYAOYAALe3t3l5eVVVVVhYWFZWVnh4eFRUVHp6end3d2dnZ2RkZGJiYllZWXV1dVtbW2lpaXR0dF1dXXJycmBgYGtra25ubl9fX3BwcG1tbba2tkVFRWhoaKioqG9vb0tLS66urrW1tbCwsExMTGFhYUdHRykpKXFxcVpaWq+vr3x8fFNTU2xsbHNzc6WlpZ+fn0hISGpqapqamkFBQZaWlq2trUNDQ5CQkCoqKlxcXE5OTrGxsYWFhZWVlbS0tGNjYzk5OUZGRn9/f0JCQkpKSoKCgjg4OKenpz09PZSUlJmZmWVlZaKiok1NTZycnEBAQIiIiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQyMURFRUQ4M0E3MUUzMTE5NkU5QkE5QzUwNzQwMEU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYyNjVDMjI3NzE1QzExRTM4RUQzRjUxMzM4ODcyQTdFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyNjVDMjI2NzE1QzExRTM4RUQzRjUxMzM4ODcyQTdFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkI0NUQ4MjE0QTcxRTMxMTgxNTRFOEY2NjZDRTQ2QjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxREVFRDgzQTcxRTMxMTk2RTlCQTlDNTA3NDAwRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAGAAYAAAH/4AHgoOEhYaDAYmKi4yNigWQkZKTlJEIl5iZmhoNmpcNoKGgJgwvMiQODiweoqEQr7AQIiU5FAEdHkMAK0qxrxLAwB1FPjQAx8gAPSQmwcAX0NBOT8nVADMi0dAV3BU4KcgZRi5L1QsK3RUY6xgEGcccARgPI9UhGuwYFPsUQccfEvZtQGHNBT8KDxI+aHFsh8IOiVhIqLBCocIEGBO8A1Aho8ePHhWIVEAQQIKRKFOiXMByQZJjSI60ZKlips0JOCcQQbbhhgYmNUr8AJKz6AQLSC2M4IDMhgAhA3iAUKEhqdUIWLFW0GHtGIgCWcOmGusABlNrLTaQHcugrVsGJyxSNPmQIUSMACfevh3At6/fv4D7EhhMuLDhw4QFKF7MuLHjxQYiS55MubLkQAA7',
                close: 'data:image/gif;base64,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',
                download: 'data:image/gif;base64,R0lGODlhGAAYANUAALe3t1VVVXp6enl5eXh4eFZWVlRUVHJycltbW25ubnV1dRYWFnd3d3BwcF1dXW1tbWtra3R0dGBgYF9fX2JiYmdnZ2RkZGlpaVlZWRoaGlhYWB4eHm9vb4+Pj6qqqnNzc5qamoqKihsbG7a2tq+vr39/f2ZmZlxcXEZGRqOjo7OzswAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQyMURFRUQ4M0E3MUUzMTE5NkU5QkE5QzUwNzQwMEU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5RUQ0NTlBODhDQjExRTNCQjg5OEU4OUZBQjhDMkI1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5RUQ0NTk5ODhDQjExRTNCQjg5OEU4OUZBQjhDMkI1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0YyQUU2MUE4RTg4RTMxMUI2RjlCQzlERDZBMTVBQ0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxREVFRDgzQTcxRTMxMTk2RTlCQTlDNTA3NDAwRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAGAAYAAAG4UCBcEgsGoeDpHLJbCoJ0Kh0So0yrthrZcPtVrJZhXgs/gDO6A+ZHGm72ww0mvF+H+54vPyc7zf+gH8HewAHgYEJiYqJDYQNi4sPkpOSCYQJlJQQm5ybHIQcnZ0XpBcoIhmphKkZIiilFxWyFSEjhIQjIbMVFr29JSq3aColvr0UyMkKJMIkCsnJEtLTEg8ehB4P1NMT3d7dJilyKSbf3w7o6ekSIGcgEurxCPP09ScdHSf1+wgY/gsAAwocGNAfBg0IhSkEgFBDgYcQI0qcCDGAxYsYM2q8aKCjx48gQ3oMAgA7',
            },
            video: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMkRFNjYyMDhENzFFMzExQjkxNkMyNkM2NzNFMDY5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQ0YzRUQxMDcxOEQxMUUzOEM4MEM5QzZGOUY2N0Y0MCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQ0YzRUQwRjcxOEQxMUUzOEM4MEM5QzZGOUY2N0Y0MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyREU2NjIwOEQ3MUUzMTFCOTE2QzI2QzY3M0UwNjk1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyREU2NjIwOEQ3MUUzMTFCOTE2QzI2QzY3M0UwNjk1Ii8+IDwvcmRmOkRlc2NyaXB0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',
            popVideo: {
                light: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTNFNTRGM0VGNzJFMzExQTk3OEU1QTlDRTYyMTQxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNDcyQjNDODcyRjQxMUUzOTY4MTkxQTIxRTI2MDQxRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNDcyQjNDNzcyRjQxMUUzOTY4MTkxQTIxRTI2MDQxRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM1M0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxM0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hGQmOwAAAVlJREFUeNpi/P//PwMMMDIyMpACkPWy4FDDBsQBQOwGxDIgO4D4ARDvA+INQPwTXQMjFhfxc3JyTgwLC7OxtbUVFxMT4wSKMz5//vzrsWPHXq1aterIt2/f8oHqPqLoRTdIRkampbGxMV9KSooHm1OfPXv2pb6+fuKTJ09qkPUyoStMS0tLwGUICIDkQGrQxTEM0tfXFycUyNjUMGGJia9ExNZXggYBw2k6IYOYmJhmETSIjY2t5devXy9xGQKSY2VlbSJokKen51cWFpZCXAaB5IBqvhA0COr0lV+/fn2LLg4SA8lh1YNNEGjjv7dv3x5FFweJgeSINggaVjuQExyIDRLD6WVcErt3775gZ2f3CegVcL759+/f/yNHjpwn2SB3d/efoqKiPMDkwAR10T9XV9efS5YsYSDJa8DMeh1oSByQeQqEgex4oNhNXOoZaVIeIUuQCgACDACBq40082MQ7QAAAABJRU5ErkJggg==',
                pin: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTNFNTRGM0VGNzJFMzExQTk3OEU1QTlDRTYyMTQxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NTdFMkFBNjc3REMxMUUzOTZDRkEyNzhDMDBDNDk2MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NTdFMkFBNTc3REMxMUUzOTZDRkEyNzhDMDBDNDk2MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCRDhFQTc3RDk3N0UzMTFBREY2RDY5RjA2NzE0RDY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxM0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NizQpgAAAQVJREFUeNpi/P//PwM1AAuMwcjISJYBMIew4JCfBcSqOOSuAXE2Thchg1WrVrnw8vIqYpP79OmTZHh4OIY4EzbFX79+nYfLK1++fJmPTZwJh+JNuAz68ePHTqINWr169T9cBgHlfhNtEDMzsxeeWPIk1iBpNTW1JFwGqaurJ4PUEDLIXEVFZZ6Hh4cyLoOAciogNUCmKbI4IyxBgRLk9u3bQc4GKZIgkA5fAHGCp6fnTrh+ZIPQwZo1a/y5ubk3QJNEYEhIyAZSUzYYAA3Z9QcIoOyd+NQy4ZMEOv37u3fvLr1///4SiE1UpsUDNhBTQhA0SExMbBkxpQDewCarGKG0gAMIMADVBmTLVR+q4gAAAABJRU5ErkJggg==',
                maximize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTNFNTRGM0VGNzJFMzExQTk3OEU1QTlDRTYyMTQxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ0RjU1NzcyRjExMUUzQTQxOEUyMEJDOTgzMDMyRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ0RjU1NjcyRjExMUUzQTQxOEUyMEJDOTgzMDMyRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzM0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxM0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Ew1ICQAAAFdJREFUeNpiYKASYNy+fTtFBnh6eoJpFihnP4UOcoS56D+FrmJkolYYsSCHF5lmgH1DNReNGjQUDWJBSp1kZRNYXmVBEnCghosYKc39jP///x9cgQ0QYADnCRQCpacviQAAAABJRU5ErkJggg==',
                fullscreen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTNFNTRGM0VGNzJFMzExQTk3OEU1QTlDRTYyMTQxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RjNGMTg5RDdGQTkxMUUzQTU5M0VBNTI3NTkxRUZCNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RjNGMTg5QzdGQTkxMUUzQTU5M0VBNTI3NTkxRUZCNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCRDhFQTc3RDk3N0UzMTFBREY2RDY5RjA2NzE0RDY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxM0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vtFRgAAAAQRJREFUeNrMVLsNgzAQtSPWQPIIwASkpMKZgJRsARTsQBkmSDrKKBMQVoBBnOfIRo4DThEi5SR8p7vnM+/5Q4UQ5K+Mdl1HkiS5WvkW+dPSBGCPcJmV3ntyxKTYKtzWVgaWwcVWc7KzgX3fX+BKB4tSYV7srdE4jgFWyNa6yJrE2HnPiCs5pGla+L7PpU5Ljeq65lEUMY2HFWajyqQD4Cov1Aa4wab/3LVvTAo9a2RqIuNPGln1bKaW53mpO8sYGt1dGk3TFJj4pmlaTwnMNGcVty6N8HETj0azRsI8R2EYHly6AHMGhht06U/OEdG/qui5rghbvLRbbD/d6j3abfUePQQYAKVCbeBNpwQ1AAAAAElFTkSuQmCC',
                restore: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MjFERUVEODNBNzFFMzExOTZFOUJBOUM1MDc0MDBFNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MzBCNUQyMTcyRjMxMUUzOTM2RTg4MTQyQUEyRDU1MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MzBCNUQyMDcyRjMxMUUzOTM2RTg4MTQyQUEyRDU1MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyQkY0RjY0NUM3MUUzMTE5MEQ3RTAwRDBEMUUxQUQ5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQyMURFRUQ4M0E3MUUzMTE5NkU5QkE5QzUwNzQwMEU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KuIDRQAAAPpJREFUeNpi+P//PwM1ACPIIEZGRmxyc4FYCU3sHhAnk2TQwoUL34mJiQkii7169ep9fHy8EDaDmBioBEYNoqNBLEhsbyCOhnH+/v3Liq4YKrYMSWgpEG9FSUfbt29P+fnzZ9OXL18EQBICAgLszMzMTGgG/fvw4cNPEJubm/sjBwdHraen5xyMBAk0LB7InwXks+HzBlDNL6CadKAhC3CmbKBhNkCxjUAxIRyGvAPK+QMNOUIwiwANUwaKbwaKa6IZcgMo5gM05C7ReQ1oGD9QbjVQzhVqyG4gOxRoyEdScz/IMFCs9oPUAXEB0JA/+AKOOgmJWgYBBBgAo+l8rgH6VgYAAAAASUVORK5CYII=',
                close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTNFNTRGM0VGNzJFMzExQTk3OEU1QTlDRTYyMTQxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzU4MzJGMTg4QjkxMUUzOTk4NzlCNUFFM0FFQkRBMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzU4MzJGMDg4QjkxMUUzOTk4NzlCNUFFM0FFQkRBMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNEMkFFNjFBOEU4OEUzMTFCNkY5QkM5REQ2QTE1QUNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxM0U1NEYzRUY3MkUzMTFBOTc4RTVBOUNFNjIxNDExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gwuo4wAAAahJREFUeNpi/P//PwM1ABMDtQA1XAQygwWJnwbEkUj8WUC8HE1PBBCnI/FXAPFMEANu0Pbt25WAlAOMv2bNGtm5c+e+BjL3QIVckpKSWkJDQ5WRDDrl6emJEUaVQCcug3GCg4OV/f39+4FMKyC2BLFDQkKUkbwDUlsB4zOC/MfIyAhzFdu/f//WMTExeYP4f//+/Tdx4sQLIDUFBQUGzMzMYIuBarYB1QQCXfMLFkYoBkEN4wIacBCoyQTE//37918QzcrKygw1/AxQzh5oyDfkwMYwCGqY6K9fv46ysbGpIosDxe4AxayAhrxGjzWs6Qjk5I6Ojpvo4kCxG0C538QmSHZxcfH+lJQUR3QJkJiEhAQoAtgJGcTCy8vb3NjYGCwlJcUNdfYPEAaxQWINDQ1BIDXISQfdIEZ2dvaq2traRHl5eT6oIX+A4RcOwiA2SAwkB1LDyclZBdKDYRAwOlOrqqqydHV1RWBhCDQgARgmm0AYxAaJgSRAaioqKrJAejAM2rp1q6KZmZk4kgurgAYsRYoAELsKxgepBemhTaalhmFUK48AAgwALD+0S2sZwIQAAAAASUVORK5CYII=',
            },

        };

        // 第一时间备份一些方法,防止被页面脚本覆盖掉
        var nativeMethods = {
            forEach: Array.prototype.forEach,
            some: Array.prototype.some,
        };

        //获取内容区域到版边的距离
        function getContentClientRect(elem) {
            var rect = elem.getBoundingClientRect();
            var compStyle = getComputedStyle(elem);

            var top = rect.top + parseFloat(compStyle.paddingTop) + parseFloat(compStyle.borderTopWidth);
            var left = rect.left + parseFloat(compStyle.paddingLeft) + parseFloat(compStyle.borderLeftWidth);

            var right = rect.right - parseFloat(compStyle.paddingRight) - parseFloat(compStyle.borderRightWidth);
            var bottom = rect.bottom - parseFloat(compStyle.paddingBottom) - parseFloat(compStyle.borderBottomWidth);

            return {
                top: top,
                right: right,
                bottom: bottom,
                left: left,
                width: right - left,
                height: bottom - top,
            };
        };


        var escapeHTMLPolicy;
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
            escapeHTMLPolicy=window.trustedTypes.createPolicy('pvcep_default', {
                createHTML: (string, sink) => string,
                createScriptURL: string => string,
                createScript: string => string
            });
        }

        function createHTML(html){
            return escapeHTMLPolicy?escapeHTMLPolicy.createHTML(html):html;
        }

        //获取窗口大小.
        function getWindowSize() {
/*
            //包含滚动条
            return {
                h:window.innerHeight,
                w:window.innerWidth,
            };
*/

            //去除滚动条的窗口大小
            var de = document.documentElement;
            var body = document.body;
            var backCompat = document.compatMode == 'BackCompat';
            return {
                height: backCompat? body.clientHeight : de.clientHeight,
                width: backCompat? body.clientWidth : de.clientWidth,
            };

        };

        //获取已滚动的距离
        function getScrolled(container) {
            if (container) {
                return {
                    x:container.scrollLeft,
                    y:container.scrollTop,
                };
            };
            /*
            window.scrollX,scollY的值是可以被覆盖的，不靠谱
            */
            var de = document.documentElement;
            var body = document.body;
            return {
                x: 'pageXOffset' in window ? window.pageXOffset : de.scrollLeft || body.scrollLeft,
                y: 'pageYOffset' in window ? window.pageYOffset : de.scrollTop || body.scrollTop,
            };
        };

        // 事件支持检测.
        // 比如 eventSupported('fullscreenchange', document);
        function eventSupported(eventName, elem) {
            elem = elem || document.createElement('div');
            var prefix = ['o', 'ms', 'moz', 'webkit', ''];

            var l = prefix.length;
            var pEventName;
            var isFunction;
            var setAttr;

            while(l --) {
                pEventName = 'on' + prefix[l] + eventName;

                if (pEventName in elem) {
                    return pEventName.slice(2);
                } else if (typeof elem.setAttribute == 'function') { // setAttribute 是元素节点的方法
                    setAttr = false;
                    if (!elem.hasAttribute(pEventName)) {
                        setAttr = true;
                        elem.setAttribute(pEventName, 'return;');
                    };

                    isFunction = typeof elem[pEventName] == 'function';

                    if (setAttr) elem.removeAttribute(pEventName);

                    if (isFunction) {
                        return pEventName.slice(2);
                    };
                };
            };

            return false;

        };

        // 在指定对象上保存数据
        var data = (function () {
            'use strict';

            var cache = {
                objs: [],
                data: {},
            };


            function data(obj, key, value) {
                var id = cache.objs.indexOf(obj);
                if (id == -1) {
                    id = cache.objs.push(obj) - 1;
                };
                if (!cache.data[id]) {//初始化
                    cache.data[id] = {};
                };
                if (typeof value == 'undefined') {// 取值
                    return typeof key == 'undefined' ? cache.data[id] : cache.data[id][key];
                } else {
                    return cache.data[id][key] = value;
                };
            };

            return data;
        })();

        // 为mouseleave mouseenter事件做个兼容
        // 需要 eventSupported， data函数支持
        var mouseEventListener = (function () {

            var support = {
                mouseleave : eventSupported('mouseleave'),
                mouseenter : eventSupported('mouseenter'),
            };

            var map = {
                mouseleave : 'mouseout',
                mouseenter : 'mouseover',
            };

            return {
                add : function (type, ele, callback) { //事件类型，元素，监听函数
                    if (support[type]) {
                        ele.addEventListener(type, callback, false); //mouseleave,enter不冒泡，所以在冒泡阶段监听事件，不要担心子孙元素进出发生的事件冒泡上来。
                    } else {
                        var listener = data(callback, 'mouseELListener');
                        if (!listener) {
                            listener = function (e) {
                                var relatedTarget = e.relatedTarget; //mouseout，去往的元素；mouseover，来自的元素
                                // 当mouseout（离开ele）去往的元素不是自己的子孙元素
                                // 当mouseover（进入ele）来自的元素不是自己的子孙元素
                                if (!ele.contains(relatedTarget)) { // contains函数，自己.contains(自己) 返回true
                                    callback.call(ele, e);
                                };
                            };
                            data(callback, 'mouseELListener', listener);
                        };

                        ele.addEventListener(map[type], listener, true);
                    };
                },
                remove : function (type, ele, callback) {
                    if (support[type]) {
                        ele.removeEventListener(type, callback, false);
                    } else {
                        ele.removeEventListener(map[type], data(callback, 'mouseELListener'), true);
                    };
                },
            };
        })();

        // 从函数中获取多行注释的字符串
        function getMStr(fn) {
            var fnSource = fn.toString();
            var ret = {};
            fnSource = fnSource.replace(/^[^{]+/, '');
            // console.log(fnSource);
            var matched;
            var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
            while (matched = reg.exec(fnSource)) {
                // console.log(matched);
                ret[matched[1]] = matched[2];
            };

            return ret;
        };

        //对象克隆,接受{}和[]
        function cloneObject(obj, deep) {
            var value;
            var ret = Array.isArray(obj) ? [] : {};

            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

                value = obj[key];

                if (value === obj) {// 引用自己
                    ret[key] = ret;
                } else if (deep && (Array.isArray(value) || Object.prototype.toString.call(value) == '[object Object]')) {
                    ret[key] = cloneObject(value, true);
                } else {
                    ret[key] = value;
                };
            };
            return ret;
        };

        //检测属性支持 (property 非 attribute)
        //返回带前缀的可以直接执行是属性
        // 比如proSupported('requestFullscreen');
        function proSupported(proName, obj) {
            obj = obj || document.createElement("div");

            if (proName in obj)
                return proName;

            //判断第一个字母是否大写，如果是的话，为构造函数，前缀也要 特定 的大写
            var prefix = /^[A-Z]/.test(proName) ? ['O', 'MS', 'Moz', 'WebKit'] : ['o', 'ms', 'moz', 'webkit'];

            // console.log(prefix);

            // 加前缀前首字母大写
            proName = proName.replace(/^./, function (m) {
                    return m.toUpperCase();
            });

            var l = prefix.length;
            var pProName;
            while (l--) {
                pProName = prefix[l] + proName;
                // console.log(pProName);
                if (pProName in obj) {
                    return pProName;
                };
            };

            return false;
        };

        // css属性支持
        // 比如WebkitTransform,MozTransform,OTransfomr
        // chrome浏览器大小写前缀都行。
        // firefox,opera只能大写
        // ie 9+只能小写
        // 比如cssProSupported('user-select');
        function cssProSupported(proName, elem) {
            elem = elem || document.createElement('div');
            var style = elem.style;

            // 转为驼峰，border-top-width >> borderTopWidth
            proName = proName.replace(/-([a-z])/g, function (a, b) {
                    return b.toUpperCase();
            });

            if (proName in style) {
                return proName;
            };

            var prefix = ['-o-', '-ms-', '-moz-', '-webkit-'];
            var l = prefix.length;

            var camelPro;
            while (l--) {
                camelPro = (prefix[l] + proName).replace(/-([a-z])/g, function (a, b) {
                    return b.toUpperCase();
                });
                if (camelPro in style) { // 大写前缀
                    return camelPro;
                };

                camelPro = camelPro.replace(/^./, function (a) { // 小写前缀
                        return a.toLowerCase();
                });
                if (camelPro in style) { // 大写前缀
                    return camelPro;
                };
            };

            return false;
        };

        // css属性值支持
        // 比如cssValueSupported('cursor', 'grabbing')
        function cssValueSupported(proName, value, elem) {
            elem = elem || document.createElement('div');
            var style = elem.style;

            // 转为驼峰，border-top-width >> borderTopWidth
            proName = proName.replace(/-([a-z])/g, function (a, b) {
                    return b.toUpperCase();
            });

            var prefix = ['-o-', '-ms-', '-moz-', '-webkit-', ''];
            var l = prefix.length;

            var pValue;
            while (l--) {
                pValue = prefix[l] + value;
                style[proName] = pValue;
                if (style[proName] === pValue) {
                    return pValue;
                };
            };

            return false;
        };


        // 特性支持情况
        var support = {
            MutationObserver: proSupported('MutationObserver', window),
            cssBoxSizing: cssProSupported('box-sizing'),

            // 请求全屏
            requestFullscreen: proSupported('requestFullscreen') || proSupported('requestFullScreen'),
            // 返回当前页面是否允许全屏
            fullscreenEnabled: proSupported('fullscreenEnabled', document) || proSupported('fullScreenEnabled', document),
            // 返回当前全屏的元素，否则返回null
            fullscreenElement: proSupported('fullscreenElement', document)
                || proSupported('fullScreenElement', document)
                || proSupported('currentFullScreenElement', document),
            // fullscreen 事件
            fullscreenchange: eventSupported('fullscreenchange', document),

        };

        // console.log(support);

        // fx库
        var fx = (function () {
            'use strict';

            function $(selector, context) {
                return new init(selector, context);
            };


            function init(selector, context) {

                if (selector instanceof HTMLElement) { // 单个 html element 节点
                    [].push.call(this, selector);
                    return this;
                };

                if (Array.isArray(selector)) {// 单纯的元素组成的数组
                    // 去重
                    var unique = [];
                    selector.forEach(function (node) {
                        if (node.nodeType === 1 && unique.indexOf(node) == -1) {
                            unique.push(node);
                        };
                    });

                    [].push.apply(this, unique);
                    return this;
                };

                if (typeof selector == 'string') {// css字符串
                    if (!context || !context.nodeType || context.nodeType != 1) {// 不是元素节点的话，context指向document
                        context = document;
                    };
                    selector = context.querySelectorAll(selector); // NodeList

                    [].push.apply(this, selector);
                    return this;
                };

                if (selector instanceof NodeList) {// NodeList
                    // 去除非元素节点
                    var elems = [];
                    each(selector, function () {
                        if (this.nodeType == 1) {
                            elems.push(this);
                        };
                    });

                    [].push.apply(this, elems);
                    return this;
                };

                if (selector instanceof HTMLCollection) { // HTMLCollection
                    [].push.apply(this, selector);
                    return this;
                };

            };

            // 遍历类数组
            function each(elems, fn) {
                [].forEach.call(elems, function (elem, index) {
                    fn.call(elem);
                });
            };

            init.prototype = {

                animate: function (pros, opts) {
                    // 判断pros是否有属性
                    for (var pro in pros) {
                        if (!pros.hasOwnProperty(pro)) continue;
                        break;
                    };
                    if (!pro) return this;

                    // 修正opts参数
                    if (!opts) {
                        opts = {};
                    };

                    // 动画持续时间
                    if (typeof opts.duration != 'number') {
                        opts.duration = 400;
                    };

                    // 动画算法
                    if (!opts.easing || !easing[opts.easing]) {
                        opts.easing = 'swing';
                    };

                    // 是否将动画放入队列
                    if (opts.queue !== false) {
                        opts.queue = true;
                    };

                    // 为每个属性指定特定的动画方法
                    opts.specialEasing = opts.specialEasing || {};

                    // 每个元素的所有属性动画完成之后都会调用
                    opts.complete = opts.complete  || emptyFn;
                    // 封装complete
                    opts.completeW = function () {
                        opts.complete.call(this);
                        // 召唤下一个动画
                        if (opts.queue) {
                            $(this).dequeue();
                        };
                    };

                    // 每个元素的每个属性的每一步都会调用
                    opts.step = opts.step  || emptyFn;


                    return this[opts.queue ? 'queue' : 'each'](function () {
                        var elem = this;

                        // 复制pros对象
                        var prosC = cloneObject(pros);
                        // 复制opts对象
                        var optsC = cloneObject(opts);
                        // 复制pros对象，用来确认单个元素完成了什么属性动画
                        optsC.curAnim = cloneObject(pros);

                        // 缓存计算后的样式
                        var cS = getComputedStyle(elem);
                        // 是否已经隐藏了
                        var isHidden = cS.display == 'none';

                        var pro;
                        var value;
                        // 判断是否是特殊操作，比如toggle show hide
                        for (pro in prosC) {
                            if (!prosC.hasOwnProperty(pro)) continue;
                            value = prosC[pro];
                            break;
                        };

                        // 判断toggle是该执行show还是hide动画
                        if (value === 'toggle') {
                            value = isHidden ? 'show' : 'hide';

                            for (pro in prosC) {
                                if (!prosC.hasOwnProperty(pro)) continue;
                                prosC[pro] = value;
                            };
                        };


                        var style = elem.style;

                        var allAniData = [];
                        if (value === 'show') {// show操作
                            if (!isHidden) {
                                optsC.completeW.call(elem);
                                return;
                            };
                            // 显示
                            style.display = '';
                            if (cS.display == 'none') {
                                style.display = 'block';
                                if (cS.display == 'none') {
                                    style.setProperty('display', 'block', 'important');
                                };
                            };

                            optsC.show = true;// 标记show操作

                        } else if (value === 'hide') {// hide操纵
                            if (isHidden) {
                                optsC.completeW.call(elem);
                                return;
                            };

                            optsC.hide = true;// 标记show操作
                        };



                        // 获取当前值
                        function getCur(pro) {
                            if (pro in style) {
                                return cS[pro];
                            } else if (pro in elem) {
                                return elem[pro];
                            };
                        };

                        var start;// 开始
                        var end;// 结束
                        var unit;// 单位
                        var parts;
                        var parts2;
                        var unit2;
                        var reg = /^([+-]=)?([\d+-.]+)(.*)$/;

                        // 保存原始样式
                        optsC.orig = {};

                        for (pro in prosC) {// 每个动画属性生成一个FX对象
                            if (!prosC.hasOwnProperty(pro)) continue;

                            value = prosC[pro];

                            // 备份当前值,show或者hide操作的时候最后还原样式。
                            optsC.orig[pro] = style[pro];

                            if (value === 'show') {
                                start = 0;
                                end = parseFloat(cS[pro]);
                                parts = cS[pro].match(reg);
                                if (parts) {
                                    unit = parts[3];
                                };
                            } else if (value === 'hide') {
                                end = 0;
                                start = parseFloat(cS[pro]);
                                parts = cS[pro].match(reg);
                                if (parts) {
                                    unit = parts[3];
                                };
                            } else {// 保持单位一样
                                parts = value.toString().match(reg);
                                if (parts) {
                                    unit = parts[3];
                                    end = parseFloat(parts[2]);

                                    start = getCur(pro).toString();
                                    parts2 = start.match(reg);

                                    if (parts2) {
                                        start = parseFloat(parts2[2]);
                                        unit2 = parts2[3];
                                        if (unit != unit2) {
                                            // 计算开始的值=(end/cur)*start
                                            style[pro] = (end || 1) + unit;
                                            start = ((end || 1) / parseFloat(getCur(pro))) * start;
                                        };

                                        if (parts[1]) {// +=/-=,做相对运行
                                            end = ((parts[1] == "-=" ? -1 : 1) * end) + start;
                                        };
                                    };
                                };
                            };

                            if (typeof start == 'number' && typeof end == 'number' && typeof unit == 'string') {
                                allAniData.push([elem, pro, optsC, start, end, unit]);
                                // new FX(elem, pro, optsC).custom(start, end, unit);// 开始动画
                            } else {// 不理会，直接标记动画完成
                                optsC.curAnim[pro] = true;
                            };
                        };

                        // 等所有动画数据都获取完成后才开始动画，
                        // 否则对于show之类的操作，如果width先绘制第一帧设置width为0之后，容器会发生伸缩，导致height的可能获取不正确
                        allAniData.forEach(function (data) {
                            new FX(data[0], data[1], data[2]).custom(data[3], data[4], data[5]);
                        });

                    });

                },

                show: function (opts) {
                    return this.animate(genFx('show', {
                        o: true,
                        v: true,
                        h: true,
                    }), opts);
                },
                hide: function (opts) {
                    return this.animate(genFx('hide', {
                        o: true,
                        v: true,
                        h: true,
                    }), opts);
                },
                toggle: function (opts) {
                    return this.animate(genFx('toggle', {
                        o: true,
                        v: true,
                        h: true,
                    }), opts);
                },

                fadeIn: function (opts) {
                    return this.animate(genFx('show', {
                        o: true,
                    }), opts);
                },
                fadeOut: function (opts) {
                    return this.animate(genFx('hide', {
                        o: true,
                    }), opts);
                },
                fadeToggle: function (opts) {
                    return this.animate(genFx('toggle', {
                        o: true,
                    }), opts);
                },
                fadeTo: function (opacity, opts) {
                    return this.animate({
                        opacity: opacity,
                    }, opts);
                },

                slideDown: function (opts) {
                    return this.animate(genFx('show', {
                        v: true,
                        o: true,
                    }), opts);
                },
                slideUp: function (opts) {
                    return this.animate(genFx('hide', {
                        v: true,
                        o: true,
                    }), opts);
                },
                slideToggle: function (opts) {
                    return this.animate(genFx('toggle', {
                        v: true,
                        o: true,
                    }), opts);
                },

                // 立即停止当前动画
                stop: function (clearQueue, jumpToEnd) {
                    if (clearQueue) {
                        this.clearQueue();
                    };

                    this.each(function () {
                        for (var i = timers.length - 1; i >= 0; i--) {
                            if (timers[i].elem == this) {//是当前元素的属性动画
                                timers[i](jumpToEnd);
                                timers.splice(i, 1);
                            };
                        };
                    });

                    // 手动出列
                    if (!jumpToEnd) {
                        this.dequeue();
                    };


                    return this;
                },
                clearQueue: function () {
                    this.queue([]);

                    return this;
                },
                delay: function (duration) {
                    return this.queue(function () {
                        var elem = this;
                        setTimeout(function () {
                            $(elem).dequeue();
                        }, duration);
                    });
                },


                each: function (fn) {
                    each(this, fn);

                    return this;
                },
                queue: function (fn, type) {
                    type = type || 'fx';

                    return this.each(function () {

                        // 取出队列
                        var q = data(this, type + 'queue');
                        if (!q) {// 初始化
                            q = [];
                        };


                        if (typeof fn == 'function') {
                            q.push(fn);
                        } else if (Array.isArray(fn)) { // array类型，直接覆盖掉
                            q = fn;
                        };

                        data(this, type + 'queue', q);

                        if (type == 'fx' && q.length == 1) { // 如果动画队列中只有自己，立即执行
                            q[0].call(this);
                        };

                    });
                },
                dequeue: function (type) {
                    type = type || 'fx';

                    return this.each(function () {
                        // 取出队列
                        var q = data(this, type + 'queue');
                        if (!q) {// 初始化
                            q = [];
                        };

                        q.shift();// 删除第一个

                        data(this, type + 'queue', q);

                        if (q[0]) {
                            q[0].call(this);
                        };

                    });
                },
            };


            //对象克隆,接受{}和[]
            function cloneObject(obj, deep) {
                var value;
                var ret = Array.isArray(obj) ? [] : {};

                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) continue;
                    value = obj[key];
                    if (deep && (Array.isArray(value) || Object.prototype.toString.call(value) == '[object Object]')) {
                        ret[key] = cloneObject(value, deep);
                    } else {
                        ret[key] = value;
                    };
                };
                return ret;
            };

            // 获取当前时间
            function now() {
                return Date.now();
            };

            // 空函数
            function emptyFn() {
            };



            // 在指定对象上保存数据
            var data = (function () {
                'use strict';

                var cache = {
                    objs: [],
                    data: {},
                };


                function data(obj, key, value) {
                    var id = cache.objs.indexOf(obj);
                    if (id == -1) {
                        id = cache.objs.push(obj) - 1;
                    };
                    if (!cache.data[id]) {//初始化
                        cache.data[id] = {};
                    };
                    if (typeof value == 'undefined') {// 取值
                        return typeof key == 'undefined' ? cache.data[id] : cache.data[id][key];
                    } else {
                        return cache.data[id][key] = value;
                    };
                };

                return data;
            })();


            var timers = [];
            var aning  = null;
            var requestAF = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame;

            // 算法
            var easing = {
                linear: function( p, n, firstNum, diff ) {
                    return firstNum + diff * p;
                },
                swing: function( p, n, firstNum, diff ) {
                    return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
                },
            };

            // 生成show,hide,toggle动画属性
            function genFx(type, opts) {
                var pros = {
                    o: ['opacity',],
                    h: ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth', 'marginLeft', 'marginRight',],
                    v: ['height', 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth', 'marginTop', 'marginBottom',],
                };

                var ret = {};
                for (var i in pros) {
                    if (!pros.hasOwnProperty(i)) continue;
                    if (opts[i]) {
                        pros[i].forEach(function (pro) {
                            ret[pro] = type;
                        });
                    };
                };

                return ret;
            };

            // 绘制动画
            function draw() {
                for ( var i = 0, l = timers.length; i < l; i++ ) {
                    if ( !timers[i]() ) {
                        timers.splice(i, 1);//删除完成的属性对象
                        i--;
                        l--;
                    };
                };

                if ( timers.length ) {
                    requestAF(draw);
                } else {
                    aning = null;
                };
            };


            // 每个属性创建一个FX实例
            function FX(elem, pro, opts) {
                // 配置
                this.opts = opts;
                // 元素
                this.elem = elem;
                // 动画属性
                this.pro = pro;
            };

            FX.off = false;// 关闭动画

            FX.prototype = {
                // 更新属性值
                update: function () {
                    var pro = this.pro;
                    var elem = this.elem;
                    var opts = this.opts;

                    // 调用step函数，可以修改this对象
                    opts.step.call( elem, this.now, this );

                    var style = elem.style;

                    if (pro in style) {
                        if ((pro == 'height' || pro == 'width') && typeof opts.overflowX == 'undefined') {
                            opts.overflowX = style.overflowX;
                            opts.overflowY = style.overflowY;
                            style.overflow = 'hidden';
                        };

                        style[pro] = this.now + this.unit;
                    } else if (pro in elem) {
                        elem[pro] = this.now;
                    };
                },
                // 开启动画
                custom: function (from, to, unit) {
                    this.startTime = now();//动画开始时间

                    this.start = from;//位置开始点
                    this.end = to;//位置结果点

                    this.unit = unit;// 单位

                    this.now = this.start;//位置当前点

                    //pos是按一定算法把时间上的比率折算到位置上的比率
                    //state是时间间隔在总的duration的比率
                    this.pos = this.state = 0;

                    //根据this.now位置当前点的值来设定元素的属性显示出来
                    this.update();

                    var self = this;
                    function t(jumpToEnd){
                        return self.step(jumpToEnd);
                    };
                    t.elem = this.elem;//删除的时候做判断用

                    //timers栈是公共的，不同的元素的不同的属性step都是放在这里面。
                    timers.push(t);

                    if ( aning == null ) {
                        aning = true;
                        requestAF(draw);
                    };

                },
                step: function (jumpToEnd) {
                    var t = now();//运行到当前的时间

                    var opts = this.opts;

                     // 强行指定结束或当前时间大于startTime+duration
                    if (FX.off || jumpToEnd || t >= opts.duration + this.startTime ) {
                        this.now = this.end;//当前的位置为结束位置
                        this.pos = this.state = 1;//当前的state,pos的比率为1.最大。
                        this.update();//显示

                        //标识这个属性的动画已经完成
                        var curAnim = opts.curAnim;
                        curAnim[ this.pro ] = true;

                        //再一次判断是否这个元素的所有属性都已完成
                        var done = true;
                        for ( var i in curAnim ) {
                            if (!curAnim.hasOwnProperty(i)) continue;

                            if ( curAnim[i] !== true ) {
                                done = false;
                                break;
                            };
                        };

                        if ( done ) {
                            var style = this.elem.style;

                            if (opts.hide || opts.show) {
                                if (opts.hide) {
                                    style.display = 'none';
                                    if (getComputedStyle(this.elem) != 'none') {
                                        style.setProperty('display', 'none', 'important');
                                    };
                                };

                                // 还原css属性
                                var orig = opts.orig;
                                for (var i in orig) {
                                    if (!orig.hasOwnProperty(i)) continue;
                                    style[i] = orig[i];
                                };
                            };

                            if (typeof opts.overflowX != 'undefined') {
                                style.overflowX = opts.overflowX;
                                style.overflowY = opts.overflowY;
                            };

                            // 执行回调函数
                            opts.completeW.call( this.elem );

                        };

                        return false;
                    };


                    var n = t - this.startTime;//时间间隔
                    this.state = n / opts.duration;//时间间隔比率

                    //根据时间间隔的比率再按一定的算法比率来计算当前的运动的位置点的比率。默认是swing的算法
                    var easingFn = easing[opts.specialEasing[this.pro]] || easing[opts.easing];
                    this.pos = easingFn(this.state, n, 0, 1, opts.duration);
                    //当前的位置
                    this.now = this.start + ((this.end - this.start) * this.pos);

                    // 显示
                    this.update();

                    return true;

                },
            };


            return $;

        })();



        var url = location.href;


        // 重新初始化插件
        function reinitPlugin(plugin) {
            // 重载flash让参数生效
            // chrome firefox 切换display none就能引发重载，ie不行。
            // chrome firefox 删除后，添加进dom引发重载，ie不行
            // chrome 切换常规流绝对定位流引发重载，ie不行

            var pluNS = plugin.nextSibling;
            var pluPN = plugin.parentNode;
            pluPN.removeChild(plugin);

            // 加个延时，否则firefox无法重载
            setTimeout(function () {
                if(pluNS){
                    pluPN.insertBefore(plugin, pluNS);
                }else{
                    pluPN.appendChild(plugin);
                };
            }, 20);

/*          var pStyle = plugin.style;
            var oSDis = pStyle.display;
            pStyle.display = 'none';
            setTimeout(function () {
                pStyle.display = oSDis;
            }, 0); */
        };


        function reinitFlash() {

            // 找到的插件统统由这个函数处理
            function initializer(plugins) {
                // console.log(plugins);

                plugins.forEach(function (plugin) {

                    // plugin是否在已插入文档中
                    if (!document.contains(plugin)) return;
                    // 处理过的跳过
                    if (plugin.fvReInitialized === true) return;

                    var src;
                    var type;
                    var isObject = plugin.nodeName == 'OBJECT';

                    if (isObject) {
                        if (plugin.hasAttribute('data')) {
                            src = plugin.data;
                        };
                        if (plugin.hasAttribute('type')) {
                            type = plugin.type;
                        };

                        if (src === undefined || type === undefined) {
                            nativeMethods.some.call(plugin.children, function (child){
                                if (child.nodeName != 'PARAM') return;

                                var key = child.name;
                                var value = child.value;
                                if (/^(?:src|movie)$/i.test(key)) {
                                    src = value;
                                } else if (/^type$/i.test(key)) {
                                    type = value;
                                };
                                if (src !== undefined && type !== undefined) {
                                    return true;
                                };
                            });
                        };

                        type = type || '';
                    } else {// embed标签
                        src = plugin.src;
                        type = plugin.type;
                    };

                    // console.log(isObject, type, src);

                    // 如果不存在src或者不是flash插件
                    if (!src || !/^(?:|application\/x-shockwave-flash)$/i.test(type)) return;

                    // 匹配到的规则
                    var matched;
                    rules.some(function (rule) {
                        if (rule.enabled && rule.url.test(src)){
                            matched = rule;
                            return true;
                        };
                    });
                    if (!matched) return;

                    // 给object标签添加param
                    var pFragment;
                    function addParamO(name, value) {
                        name = name.toLowerCase();

                        if (!nativeMethods.some.call(plugin.children, function (child) {
                            if (child.nodeName != 'PARAM') return;

                            if (child.name.toLowerCase() == name){
                                if (name == 'flashvars'){
                                    child.value = gFlashVars(child.value, value);
                                } else {
                                    child.value = value;
                                };

                                return true;
                            };
                        })) {// 如果不存在参数，则新建
                            var param = document.createElement('param');
                            param.name = name;
                            param.value = value;
                            // 先装进fragment，最后一起添加进dom，防止flash多次重载消耗性能
                            pFragment = pFragment ? pFragment : document.createDocumentFragment();
                            pFragment.appendChild(param);
                        };

                    };

                    // 生成新的flashvars字符串
                    function gFlashVars(oValue, add) {
                        if (!oValue) return add;
                        if (!add) return oValue;

                        // 转成数组 ['a=1', 'b=2', 'c=']之类的形式
                        oValue = oValue.split('&');
                        add = add.split('&');

                        // 转成字典 {a:'1', b:'2', c:''}之类的形式
                        var oVDict = {};

                        function gDict(kv) {
                            if (!kv) return;

                            var index = kv.indexOf('=');
                            if (index == -1) {
                                if (kv !=' ') {
                                    oVDict[kv] = '';
                                };
                            } else {
                                if (index > 0) {
                                    oVDict[kv.slice(0, index)] = kv.slice(index + 1);
                                };
                            };
                        };

                        // 用新的值覆盖旧的值
                        oValue.forEach(gDict);
                        add.forEach(gDict);

                        // 转会字符串
                        var fVars = [];
                        for (var key in oVDict) {
                            if (!oVDict.hasOwnProperty(key)) continue;
                            fVars.push(key + '=' + oVDict[key]);
                        };
                        fVars = fVars.join('&');

                        return fVars;
                    };

                    if (matched.hasOwnProperty('allowFullscreen')) {
                        var af = matched.allowFullscreen;
                        if (isObject) {
                            addParamO('allowFullscreen', af);
                        } else {
                            plugin.setAttribute('allowFullscreen', af);
                        };
                    };
                    if (matched.hasOwnProperty('allowScriptAccess')) {
                        var as = matched.allowScriptAccess;
                        if (isObject) {
                            addParamO('allowScriptAccess', as);
                        } else {
                            plugin.setAttribute('allowScriptAccess', as);
                        };
                    };
                    if (matched.hasOwnProperty('allowNetWorking')) {
                        var an = matched.allowNetWorking;
                        if (isObject) {
                            addParamO('allowNetWorking', an);
                        } else {
                            plugin.setAttribute('allowNetWorking', an);
                        };
                    };

                    if (matched.hasOwnProperty('flashVars')) {
                        var fvs = matched.flashVars;
                        if (isObject) {
                            addParamO('flashVars', fvs);
                        } else {
                            plugin.setAttribute('flashVars', gFlashVars(plugin.getAttribute('flashVars') || '', fvs));

                        };
                    };

                    if (pFragment) {
                        plugin.appendChild(pFragment);
                    };


                    // 标记已经修改
                    plugin.fvReInitialized = true;

                    reinitPlugin(plugin);
                });
            };


            // 一些规则根据excludes强行设置enabled为false
            rules.forEach(function (rule) {
                if (rule.hasOwnProperty('excludes') && rule.excludes.test(url)) {
                    // console.log('根据excludes禁用规则', rule);
                    rule.enabled = false;
                };

            });


            // 先处理脚本运行前已经加载的flash
            initializer([].slice.call(document.querySelectorAll('object, embed'), 0));


            // 建立一个监视事件，处理后来追加的插件
            if(support.MutationObserver)
            (new window[support.MutationObserver](function (mRecords) {
                // 发现的等待处理的插件数组集合
                var wPlugins = [];

                mRecords.forEach(function (mRecord) {
                    // console.log(mRecord);
                    var addedNodes = mRecord.addedNodes;
                    if (!addedNodes.length) return;// 非添加节点操作

                    nativeMethods.forEach.call(addedNodes, function (node) {
                        if (node.nodeType != 1) return;
                        // 如果节点本身就是插件
                        if (/^(?:OBJECT|EMBED)$/.test(node.nodeName)) {
                            wPlugins.push(node);
                        };

                        [].push.apply(wPlugins, node.querySelectorAll('object, embed'));

                    });

                });

                // console.log(wPlugins);

                initializer(wPlugins);

            })).observe(document, {
                childList: true,
                subtree: true,
            });



        };

        if (prefs.allowReinitFlash) {
            // console.log(document.contentType);
            // 修复firefox标签单独请求一个flash，加载本脚本后导致不能正常加载flash的问题

            if (typeof document.contentType != 'string' || document.contentType != 'application/x-shockwave-flash') {
                reinitFlash();
            };

        };


    // --------------------------------------------
        // 弹出视频
        function PopVideo(video) {
            this.video = video;
            this.init();
        };

        PopVideo.maxIndex = 1000000000;
        PopVideo.styleAdded = false;
        PopVideo.movingHelperStyle = null;
        PopVideo.all = [];
        PopVideo.timerId = null;
        PopVideo.scrollFx = null;
        PopVideo.topVideo = null;


        PopVideo.prototype = {
            lighting: true,
            maximized: false,
            pinned: false,
            isFullscreen: false,
            minWidth: 325,
            minHeight: 150,

            scale: function (e) {
                if (e.deltaY > 0) {
                    this.zoomLevel += -0.1;
                    if (this.zoomLevel > 3) this.zoomLevel = 1;
                    else if (this.zoomLevel < 0.1) this.zoomLevel = 0.1;
                } else {
                    this.zoomLevel += 0.1;
                    if (this.zoomLevel < 0.5) this.zoomLevel = 1;
                }
                var oriSize = {
                    h: parseInt(this.vOriStyle.height),
                    w: parseInt(this.vOriStyle.width)
                };
                var afterSize = {
                    h: oriSize.h * this.zoomLevel || 10,
                    w: oriSize.w * this.zoomLevel || 10,
                };
                var controlLayerSize = {
                    h: parseInt(this.controlLayer.style.height),
                    w: parseInt(this.controlLayer.style.width)
                };
                var ratio = {
                    x: e.offsetX / controlLayerSize.w,
                    y: e.offsetY / controlLayerSize.h
                };
                this.controlLayer.style.width = afterSize.w + "px";
                this.controlLayer.style.height = afterSize.h + "px";
                this.controlLayer.style.top = parseInt(this.controlLayer.style.top) - (afterSize.h - controlLayerSize.h) * ratio.y + "px";
                this.controlLayer.style.left = parseInt(this.controlLayer.style.left) - (afterSize.w - controlLayerSize.w) * ratio.x + "px";
                e.preventDefault();
            },

            videoMouseDown: function (e) {
                if (this.zoomLevel === 1) return;
                e.stopPropagation();
                let self = this, mousemoved = false;
                let oriPos = {
                    x: parseInt(this.controlLayer.style.left),
                    y: parseInt(this.controlLayer.style.top)
                };
                let oriMouse = {
                    x: e.pageX,
                    y: e.pageY
                };
                let mouseupHandler = e => {
                    document.removeEventListener("mouseup", mouseupHandler);
                    document.removeEventListener("mousemove", mousemoveHandler);
                    if (mousemoved) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                };
                let mouseclickHandler = e => {
                    document.removeEventListener("click", mouseclickHandler);
                    if (mousemoved) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                };
                let mousemoveHandler = e => {
                    mousemoved = true;
                    self.controlLayer.style.top = oriPos.y + (e.pageY - oriMouse.y) + "px";
                    self.controlLayer.style.left = oriPos.x + (e.pageX - oriMouse.x) + "px";
                    e.preventDefault();
                    e.stopPropagation();
                };
                document.addEventListener("mouseup", mouseupHandler);
                document.addEventListener("click", mouseclickHandler);
                document.addEventListener("mousemove", mousemoveHandler);
            },

            init: function () {
                this.addStyle();

                var self = this;

                var video = this.video;
                this.vOriControls = video.controls;
                var vNodeName = video.nodeName;

                // 如果是这些元素，那么pin的时候直接用fixed方式（这些元素随便调整position不会引发重载）
                var fixedPin = /^(?:IFRAME|VIDEO|AUDIO)$/.test(vNodeName);
                this.fixedPin = fixedPin;

                video.fvPopVideo = true;// 标记弹出中。
                this.zoomLevel = 1;
                video.addEventListener("wheel", this.scale.bind(this));
                video.addEventListener("mousedown", this.videoMouseDown.bind(this), true);

                // 很多网站加载flash为了兼容现代浏览器和ie，经常使用 object classid嵌套object或者embed的格式
                var vPEIsObject;
                var vCEIsPlugin;

                if (/^(?:EMBED|OBJECT)$/.test(vNodeName)) {// object,embed标签
                    if ((vPEIsObject = video.parentElement) && vPEIsObject.nodeName == 'OBJECT') {// 弹出的是被嵌套的object或者embed
                        vPEIsObject.fvPopVideo = true;
                        this.vPEIsObject = vPEIsObject;
                    } else if (vNodeName == 'OBJECT' && (vCEIsPlugin = video.querySelector('object, embed'))) { // 弹出的是objecj元素，查看是否嵌套了object或者embed
                        vCEIsPlugin.fvPopVideo = true;
                        this.vCEIsPlugin = vCEIsPlugin;
                        vCEIsPlugin.classList.add('fv-p-v-video-child-plugin'); // 添加样式拉伸嵌套的object,embed
                    } else {// 独立的object或者embed标签
                        // console.log('独立标签：', video);
                    };
                } else if(/^(?:VIDEO|AUDIO)$/.test(vNodeName)) {// html5 video,audio标签
                    video.controls = true; // 显示播放控件
                } else {// iframe 标签

                };


                // 创建创造关灯效果的黑色覆盖层
                var fixedOverlayer = document.createElement('fvspan');
                this.fixedOverlayer = fixedOverlayer;
                fixedOverlayer.className = 'fv-p-v-light-off';
                document.body.appendChild(fixedOverlayer);


                // 创建控制video缩放的控制层，放在video的下面，但是在light层的上面
                var controlLayer = document.createElement('fvspan');
                this.controlLayer = controlLayer;
                controlLayer.className = 'fv-p-v-control-layer';

                controlLayer.innerHTML = createHTML(getMStr(function () {
                    var innerHTML;
                    /*
                        <fvspan class="fv-p-v-control-title-bar">
                            <fvspan class="fv-p-v-control-title-bar-left-side">
                                <fvspan class="fv-p-v-control-size-info"></fvspan>
                            </fvspan>
                            <fvspan class="fv-p-v-control-title-bar-right-side">
                                <fvspan class="fv-p-v-control-command fv-p-v-control-word fv-p-v-control-open-bright" title="亮度">亮
                                    <select class="fv-p-v-control-command fv-p-v-control-bright">
                                        <option value="1">原亮度</option>
                                        <option value="1.5">1.5倍亮度</option>
                                        <option value="2">二倍亮度</option>
                                        <option value="3">三倍亮度</option>
                                        <option value="5">五倍亮度</option>
                                        <option value="0.5">一半亮度</option>
                                        <option value="0.2">0.2亮度</option>
                                        <option value="0.1">0.1亮度</option>
                                        <option value="input">自定义输入</option>
                                        <option disabled="disabled" style='display: none' value=''>自定义输入</option>
                                    </select>
                                </fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-word fv-p-v-control-open-rate" title="速度">速
                                    <select class="fv-p-v-control-command fv-p-v-control-rate">
                                        <option value="1">原速</option>
                                        <option value="1.25">1.25倍速</option>
                                        <option value="1.5">1.5倍速</option>
                                        <option value="1.75">1.75倍速</option>
                                        <option value="2">二倍速</option>
                                        <option value="3">三倍速</option>
                                        <option value="5">五倍速</option>
                                        <option value="0.75">0.75倍速</option>
                                        <option value="0.5">半速</option>
                                        <option value="0.25">0.25倍速</option>
                                        <option value="0.1">0.1速</option>
                                        <option value="input">自定义输入</option>
                                        <option disabled="disabled" style='display: none' value=''>自定义输入</option>
                                    </select>
                                </fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-word fv-p-v-control-open-ratio" title="长宽比">比
                                    <select class="fv-p-v-control-command fv-p-v-control-ratio">
                                        <option value="">原始比例</option>
                                        <option value="1.335,1">16 / 9</option>
                                        <option value=".75,1">4 / 3</option>
                                    </select>
                                </fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-light" title="关灯"></fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-pin" title="固定"></fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-maximize" title="最大化"></fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-fullscreen" title="全屏"></fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-restore" title="还原视频"></fvspan>
                                <fvspan class="fv-p-v-control-command fv-p-v-control-close" title="关闭视频"></fvspan>
                                <fvspan class="fv-p-v-vertical-align-helper"></fvspan>
                            </fvspan>
                        </fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-n"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-s"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-w"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-e"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-nw"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-ne"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-se"></fvspan>
                        <fvspan class="fv-p-v-control-resize-hand fv-p-v-control-resize-hand-sw"></fvspan>
                    */
                }).innerHTML);

                document.body.appendChild(controlLayer);

                // 获取元素
                var cTitleBar = controlLayer.querySelector('.fv-p-v-control-title-bar');
                this.cTitleBar = cTitleBar;

                this.cSizeInfo = controlLayer.querySelector('.fv-p-v-control-size-info');

                var cCommandL = controlLayer.querySelector('.fv-p-v-control-light');
                this.cCommandL = cCommandL;
                var cCommandP = controlLayer.querySelector('.fv-p-v-control-pin');
                this.cCommandP = cCommandP;
                var cCommandM = controlLayer.querySelector('.fv-p-v-control-maximize');
                this.cCommandM = cCommandM;
                var cCommandF = controlLayer.querySelector('.fv-p-v-control-fullscreen');
                this.cCommandF = cCommandF;
                var cCommandR = controlLayer.querySelector('.fv-p-v-control-restore');
                this.cCommandR = cCommandR;
                var cCommandC = controlLayer.querySelector('.fv-p-v-control-close');
                this.cCommandC = cCommandC;
                var cCommandRate = controlLayer.querySelector('.fv-p-v-control-rate');
                this.cCommandRate = cCommandRate;
                cCommandRate.value = video.playbackRate;
                cCommandRate.addEventListener('change', function (e) {
                    let rate = e.target.value;
                    if (rate === 'input') {
                        rate = prompt('输入速度');
                        e.target.value = "";
                    }
                    video.playbackRate = rate;
                }, true);

                var cCommandBright = controlLayer.querySelector('.fv-p-v-control-bright');
                this.cCommandBright = cCommandBright;
                let bright = video.style.filter.match(/.*brightness\((.*?)\).*/);
                if (bright) cCommandBright.value = bright[1];
                cCommandBright.addEventListener('change', function (e) {
                    let bright = e.target.value;
                    if (bright === 'input') {
                        bright = prompt('输入亮度');
                        e.target.value = "";
                    }
                    video.style.filter = `brightness(${bright})`;
                }, true);

                var cCommandRatio = controlLayer.querySelector('.fv-p-v-control-ratio');
                this.cCommandRatio = cCommandRatio;
                let ratio = video.style.transform.match(/.*scale\((.*?)\).*/);
                if (ratio) cCommandRatio.value = ratio[1];
                cCommandRatio.addEventListener('change', function (e) {
                    let ratio = e.target.value;
                    video.style.transform = ratio ? `scale(${ratio})` : "";
                }, true);

                // 监听标题栏的命令点击
                cTitleBar.addEventListener('click', function (e) {
                    if (e.button != 0) return;

                    var target = e.target;
                    var classList = target.classList;

                    if (!classList.contains('fv-p-v-control-command')) return;

                    switch (target) {
                        case cCommandL:
                            self.toggleLight();
                        break;
                        case cCommandP:
                            self.togglePin();
                        break;
                        case cCommandM:
                            self.toggleMaximize();
                        break;
                        case cCommandR:
                            self.restore();
                        break;
                        case cCommandF:
                            if (support.fullscreenEnabled && support.requestFullscreen) {
                                if (!document[support.fullscreenEnabled]) {// 全屏allowfullscreen属性不为true的iframe子元素的时候
                                    alert('当前网页无法全屏');
                                } else {
                                    video[support.requestFullscreen]();
                                };
                            } else {
                                alert('你的浏览器不支持全屏特性');
                            };

                        break;
                        case cCommandC:
                            self.restore(true);
                        break;
                    };

                }, true);

                // 双击标题栏切换最大化和还原
                cTitleBar.addEventListener('dblclick', function (e) {
                    if (e.button != 0) return;

                    var target = e.target;
                    if (target != this) return;

                    self.toggleMaximize();
                }, true);


                // 给resize添加监听函数
                controlLayer.addEventListener('mousedown', function (e) {
                    if (e.button != 0) return;// 非左键

                    if (self.maximized) return; //最大化后禁止使用拖拽缩放和移动功能

                    var target = e.target
                    var classList = target.classList;
                    // 如果不是缩放手柄和标题栏
                    if (!classList.contains('fv-p-v-control-resize-hand') && target != cTitleBar) return;

                    e.preventDefault(); // 禁止拖曳的时候选中文字

                    // 点击时鼠标的位置，controlLayer 的长宽，top left的坐标
                    var mCoor = {
                        pageX: e.pageX,
                        pageY: e.pageY,
                    };
                    var offset = {
                        top: parseFloat(cLS.top),
                        left: parseFloat(cLS.left),
                    };
                    var size = {
                        height: parseFloat(cLS.height),
                        width: parseFloat(cLS.width),
                    };

                    // 缩放处理函数
                    function reize(allowSize, allowOffset) {

                        function move(e) {
                            video.style.transform = "";
                            cCommandRatio.value = "";
                            var mCoorA = {
                                pageX: e.pageX,
                                pageY: e.pageY,
                            };


                            var height;
                            if (allowSize.height) {
                                var yMove = mCoorA.pageY - mCoor.pageY;
                                height = (allowSize.hMinus ? -yMove : yMove) + size.height;
                            };

                            var minHeight = self.minHeight;

                            if (allowOffset.top) {
                                var top = offset.top + mCoorA.pageY - mCoor.pageY;

                                if (typeof height == 'number') {
                                    if (height >= minHeight) {
                                        if (top >= 0) {
                                            cLS.height = height + 'px';
                                            cLS.top = top + 'px';
                                        } else {
                                            cLS.top = 0;
                                            cLS.height = height + top + 'px';
                                        };
                                    } else {
                                        cLS.height = minHeight + 'px';
                                        cLS.top = top - (minHeight - height) + 'px';
                                    }
                                } else { // 单纯的移动
                                    cLS.top = Math.max(0, top) + 'px';
                                };
                            } else {
                                cLS.height =  Math.max(minHeight, height) + 'px';
                            };



                            var width;
                            if (allowSize.width) {
                                var xMove = mCoorA.pageX - mCoor.pageX;
                                width = (allowSize.wMinus ? -xMove : xMove) + size.width;
                            };

                            var minWidth = self.minWidth;

                            if (allowOffset.left) {
                                var left = offset.left + mCoorA.pageX - mCoor.pageX;

                                if (typeof width == 'number') {
                                    if (width >= minWidth) {
                                        if (left >= 0) {
                                            cLS.left = left + 'px';
                                            cLS.width = width  + 'px';
                                        } else {
                                            cLS.left = 0;
                                            cLS.width = width + left + 'px';
                                        };
                                    } else {
                                        cLS.left = left - (minWidth - width) + 'px';
                                        cLS.width = minWidth  + 'px';
                                    };

                                } else { // 单纯的移动
                                    cLS.left = Math.max(0, left) + 'px';
                                };
                            } else {
                                cLS.width =  Math.max(minWidth, width) + 'px';
                            };



                        };



                        // 结束拖拽
                        function up() {
                            PopVideo.movingHelperStyle.disabled = true;

                            // 重新订一下
                            if (self.pinned) {
                                self.beforePin();

                                if (!fixedPin) {
                                    self.unpin();
                                    self.pin();
                                };
                            };

                            document.removeEventListener('mousemove', move, true);
                            document.removeEventListener('mouseup', up, true);
                        };

                        document.addEventListener('mousemove', move, true);
                        document.addEventListener('mouseup', up, true);
                    };


                    // 移动的时候取消iframe的pointer-events，否则移动到iframe上面的时候mousemove事件检测不到。
                    PopVideo.movingHelperStyle.disabled = false;

                    if (target == cTitleBar) {
                        reize({
                        }, {
                            top: true,
                            left: true,
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-n')) {// 北
                        reize({
                            height: true,

                            hMinus: true,// 标记反向
                        }, {
                            top: true,
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-s')) {// 南
                        reize({
                            height: true,
                        }, {
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-w')) {// 西
                        reize({
                            width: true,

                            wMinus: true,// 标记反向
                        }, {
                            left: true,
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-e')) {// 东
                        reize({
                            width: true,
                        }, {
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-nw')) {// 西北
                        reize({
                            width: true,
                            height: true,

                            wMinus: true,
                            hMinus: true,
                        }, {
                            left: true,
                            top: true,
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-se')) {// 东南
                        reize({
                            width: true,
                            height: true,
                        }, {
                        });
                    } else if (classList.contains('fv-p-v-control-resize-hand-ne')) {// 东北
                        reize({
                            width: true,
                            height: true,

                            hMinus: true,
                        }, {
                            top: true,
                        });
                    } else if  (classList.contains('fv-p-v-control-resize-hand-sw')) {// 西南
                        reize({
                            width: true,
                            height: true,

                            wMinus: true,
                        }, {
                            left: true,
                        });
                    };
                }, true);


                // 多个video时，最后摸到的那个提升到顶层
                this.videoEnterHandler =  function () {
                    self.setZIndex();
                };
                mouseEventListener.add('mouseenter', video, this.videoEnterHandler);
                mouseEventListener.add('mouseenter', controlLayer, this.videoEnterHandler);


                // 调整前video的位置
                var vCCliRect = getContentClientRect(video);
                // console.log(vCCliRect);

                // 控制层的大小和video保持一致
                var cLS = controlLayer.style;
                cLS.width = Math.max(vCCliRect.width, this.minWidth) + 'px';// 内容区域的宽度
                cLS.height = Math.max(vCCliRect.height, this.minHeight) + 'px';// 内容区域的高度


                // 为了以后还原，先保存一些需要更改的旧值
                var vOriStyle = {};
                this.vOriStyle = vOriStyle;

                var vStylePros = [
                    'position', 'z-index',
                    'width', 'height',
                    'top', 'left',
                ];

                var vS = video.style;

                vStylePros.forEach(function (pro) {
                    vOriStyle[pro] = [vS.getPropertyValue(pro), vS.getPropertyPriority(pro)];
                });
                // console.log(vOriStyle);


                // 如果是特殊站点，通过特殊规则修复兼容
                popVideoRules.some(function (rule) {
                    if (rule.url.test(url)) {
                        switch (rule.command) {
                            case 'addStyle' :
                            var style = document.createElement('style');
                            style.type = 'text/css';
                            style.textContent = rule.css;
                            var parentNode = document.head || document.documentElement;
                            parentNode.appendChild(style);

                            self.removePopVideoFix = function () {
                                parentNode.removeChild(style);
                            };
                            break;

                        };

                        return true;
                    };
                });

                // 修改video样式
                video.classList.add('fv-p-v-video');

                vS.setProperty('top', 0, 'important');
                vS.setProperty('left', 0, 'important');

                // 用zindex提升flash层级，先设置position为relative或absolute
                // 为避免更改position导致flash重载，不要让flash在常规流和绝对定位之间切换（chrome）

                if (/^(?:static|relative)/.test(getComputedStyle(video).position)) {
                    vS.setProperty('position', 'relative', 'important');
                } else {
                    vS.setProperty('position', 'absolute', 'important');
                };


                // 允许flash到最高层，不要被祖父级别的层叠上下文给限制主。 设置祖先的z-index为auto
                // 允许调整大小，设置祖先(包含块)的overflow等于 visible
                var ancestor = video;
                var ancestorStyle;
                var ancestorData;

                var ancestors = []; //保存所有的祖先的引用
                this.ancestors = ancestors;
                var docBody = document.body;

                while ((ancestor = ancestor.parentElement) && ancestor != docBody) {
                    ancestors.push(ancestor);

                    ancestorData = data(ancestor, 'data');
                    if (ancestorData) {// 保存的修改之前的样式数据
                        ancestorData.count ++ ;// 多个video共用的祖先，标记+1。还原的时候，检测这个值，如果不等于1就不还原这个祖先元素的样式
                    } else {
                        ancestorStyle = ancestor.style;
                        ancestorData = {
                            count : 1,
                            style : {
                                'overflow-x': [ancestorStyle.getPropertyValue('overflow-x'), ancestorStyle.getPropertyPriority('overflow-x')],
                                'overflow-y': [ancestorStyle.getPropertyValue('overflow-y'), ancestorStyle.getPropertyPriority('overflow-y')],
                                'z-index': [ancestorStyle.getPropertyValue('z-index'), ancestorStyle.getPropertyPriority('z-index')],
                                'position': [ancestorStyle.getPropertyValue('position'), ancestorStyle.getPropertyPriority('position')],
                            },
                        };

                        // 保存
                        data(ancestor, 'data', ancestorData);

                        ancestorStyle.setProperty('overflow', 'visible', 'important');
                        ancestorStyle.setProperty('z-index', 'auto', 'important');
                        // 有绝对定位的父元素，改成absolute。
                        if (ancestorStyle.position == 'fixed' || getComputedStyle(ancestor).position == 'fixed') {
                            ancestorStyle.setProperty('position', 'absolute', 'important');
                        };
                    }
                };


                // 注册controlLayer的监控函数，让video永远跟着走。
                if(support.MutationObserver){
                var cLObserver = new window[support.MutationObserver](function (ms) {
                    // console.log(ms);
                    self.followControlLayer();

                });
                this.cLObserver = cLObserver;

                cLObserver.observe(controlLayer, {
                    attributes: true,
                    attributeFilter: ['style'],
                });
                }




                // 让控制层摆放在视频弹出前所在的位置
                cLS.top = 0;
                cLS.left = 0;
                var cLCCliRect = getContentClientRect(controlLayer);
                // 保证top不要小于0否则标题栏会到窗口外面去。
                cLS.top = Math.max(vCCliRect.top - cLCCliRect.top, 0) + 'px';
                cLS.left = vCCliRect.left - cLCCliRect.left + 'px';


                // 一定的时间之内，同步一次位置
                PopVideo.all.push(this);

                if (!PopVideo.timerId) {
                    PopVideo.timerId = setInterval(function () {

                        var all = PopVideo.all;

                        all.forEach(function (obj) {
                            obj.followControlLayer();
                        });

                        if (!all.length) {
                            clearInterval(PopVideo.timerId);
                            PopVideo.timerId = null;
                        };
                    }, 1500);
                };

                // 调整窗口监控
                this.wResizeListener = function () {
                    self.followControlLayer();
                };

                window.addEventListener('resize', this.wResizeListener, true);

                // 全屏事件监听
                this.fullscreenchangeListener = function () {
                    // 退出全屏
                    var fsE = document[support.fullscreenElement];
                    // console.log('全屏元素：', fsE);

                    if (!fsE) {
                        self.exitFullscreen();
                    } else if (fsE == video) {
                        self.fullscreen();
                    };
                };

                document.addEventListener(support.fullscreenchange, this.fullscreenchangeListener, true);


                // 提升到顶层
                this.setZIndex();

                // 关灯
                if (prefs.popVideo.lightOff.enabled) {
                    this.lightOff();
                };

                // pin
                if (prefs.popVideo.pin) {
                    this.beforePin();
                    this.pin();
                };

                // 最大化
                if (prefs.popVideo.maximize) {
                    this.maximize();
                };

                if (!this.pinned) {
                    this.smoothScrollIntoView(controlLayer);
                };
            },
            exitFullscreen: function () {
                if (!this.isFullscreen) return;
                this.isFullscreen = false;

                this.setZIndex(true);
            },
            fullscreen: function () {

                var video = this.video;
                var vS = video.style;

                // firefox 会将全屏的元素自动fixed处理，然后拉伸
/*              :-moz-full-screen:not(:root) {
                    -moz-box-sizing: border-box !important;
                    background: none repeat scroll 0 0 #000000;
                    bottom: 0 !important;
                    height: 100% !important;
                    left: 0 !important;
                    margin: 0 !important;
                    max-height: none !important;
                    max-width: none !important;
                    min-height: 0 !important;
                    min-width: 0 !important;
                    position: fixed !important;
                    right: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    z-index: 2147483647 !important;
                } */

                // chrome 只有当全屏元素是iframe的时候才会做fixed处理，并且拉伸
                // 其他元素的时候，当元素为非绝对定位流的时候会全屏居中，绝对定位流时以屏幕左上角为原点定位
/*              video:-webkit-full-screen {
                  width: 100%;
                  height: 100%;
                }
                audio:-webkit-full-screen {
                    background-color: transparent;
                    position: relative;
                    margin: 0px;
                    height: 100%;
                    width: 100%;
                    flex: 1 1 0px;
                    display: block;
                }
                iframe:-webkit-full-screen {
                    margin: 0px;
                    padding: 0px;
                    border: 0px;
                    border-image-source: initial;
                    border-image-slice: initial;
                    border-image-width: initial;
                    border-image-outset: initial;
                    border-image-repeat: initial;
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    left: 0px;
                    top: 0px;
                }
                :-webkit-full-screen {
                    background-color: white;
                    z-index: 2147483647;
                } */
                vS.setProperty('top', 0, 'important');
                vS.setProperty('left', 0, 'important');
                vS.setProperty('height', '100%', 'important');
                vS.setProperty('width', document.body.clientWidth+'px', 'important');
                vS.setProperty('z-index', 2147483647, 'important');

                // 标记全屏状态中
                this.isFullscreen = true;
            },

            maximize: function () {
                if (this.maximized) return;
                this.maximized = true;

                var controlLayer = this.controlLayer;
                controlLayer.classList.add('fv-p-v-control-layer_maximized');

                // 去掉滚动条
                var style = document.createElement('style');
                style.type = 'text/css';
                style.textContent = getMStr(function () {
                    var cssText;
                    /*
                        html,body {
                            overflow: hidden !important;
                        }
                    */
                }).cssText;
                (document.head || document.documentElement).appendChild(style);


                var cLS = controlLayer.style;
                var cBCRect = controlLayer.getBoundingClientRect();

                // 备份数据，等下还原用
                this.maximizeBackup = {
                    pinned: this.pinned,// 备份之前的状态
                    style: style,
                    height: cLS.height,
                    width: cLS.width,
                    offset: {
                        top: cBCRect.top,
                        left: cBCRect.left,
                    },
                };

                cLS.top = parseFloat(cLS.top) - cBCRect.top + 'px';
                cLS.left = parseFloat(cLS.left) - cBCRect.left + 'px';

                function fitScreen() {
                    var wSize = getWindowSize();
                    cLS.height = wSize.height - 30 + 'px';
                    cLS.width = wSize.width - 10 + 'px';
                };

                fitScreen();

                // 固定
                if (this.pinned) {
                    if (!this.fixedPin) {
                        this.unpin();
                        this.pin();
                    };
                } else {
                    this.pin();
                    this.cCommandP.classList.remove('fv-p-v-control-command-selected');
                };

                this.maximizeResizeHandler = fitScreen;
                window.addEventListener('resize', this.maximizeResizeHandler, true);

                this.cCommandM.classList.add('fv-p-v-control-command-selected');


            },
            exitMaximize: function () {
                if (!this.maximized) return;
                this.maximized = false;

                var controlLayer = this.controlLayer;
                var cLS = controlLayer.style;

                controlLayer.classList.remove('fv-p-v-control-layer_maximized');

                var mBackup = this.maximizeBackup;

                cLS.top = parseFloat(cLS.top) + mBackup.offset.top + 'px';
                cLS.left = parseFloat(cLS.left) + mBackup.offset.left + 'px';
                cLS.width = mBackup.width;
                cLS.height = mBackup.height;

                mBackup.style.parentNode.removeChild(mBackup.style);

                // 还原最大化前的固定状态
                if (mBackup.pinned) {
                    if (!this.fixedPin) {
                        this.unpin();
                        this.pin();
                    };
                } else {
                    this.unpin();
                };


                window.removeEventListener('resize', this.maximizeResizeHandler, true);
                this.cCommandM.classList.remove('fv-p-v-control-command-selected');
            },
            toggleMaximize: function () {
                if (this.maximized) {
                    this.exitMaximize();
                } else {
                    this.maximize();
                };
            },

            beforePin: function () {// pin的时候确保不要pin到可视范围外面去。
                var controlLayer = this.controlLayer;
                var cLS = controlLayer.style;

                var wSize = getWindowSize();

                // 如果pin的时候，标题栏不在浏览器窗口，调整top
                var cLBCRect = controlLayer.getBoundingClientRect();

                if (cLBCRect.top < 0) {
                    cLS.top = parseFloat(cLS.top) - cLBCRect.top + 'px';
                } else if (cLBCRect.top > wSize.height - 50) {
                    cLS.top = parseFloat(cLS.top) - (cLBCRect.top - (wSize.height - 50)) + 'px';
                };

                if (cLBCRect.left < 0) {
                    cLS.left = parseFloat(cLS.left) - cLBCRect.left + 'px';
                } else if (cLBCRect.left > wSize.width - 50) {
                    cLS.left = parseFloat(cLS.left) - (cLBCRect.left - (wSize.width - 50)) + 'px';
                };
            },
            pin: function () {
                if (this.pinned) return;
                this.pinned = true;

                this.cCommandP.classList.add('fv-p-v-control-command-selected');

                var controlLayer = this.controlLayer;
                var cLS = controlLayer.style;

                // 针对iframe video audio 元素，直接设置fixed获取更好的效果
                if (this.fixedPin) {
                    this.pinData = {}; // 备份数据

                    var cLBCRect = controlLayer.getBoundingClientRect();
                    cLS.position = 'fixed';
                    cLS.top = cLBCRect.top + 'px';
                    cLS.left = cLBCRect.left + 'px';

                    var vS = this.video.style;

                    this.pinData.position = vS.position;
                    vS.setProperty('position', 'fixed', 'important');
                } else {
                    var scrolled = getScrolled();
                    var offset = {
                        top: parseFloat(cLS.top),
                        left: parseFloat(cLS.left),
                    };

                    this.pinScrollHandler = function () {
                        var scrolledA = getScrolled();

                        var top = scrolledA.y - scrolled.y + offset.top;
                        cLS.top = top + 'px';

                        var left = scrolledA.x - scrolled.x + offset.left;
                        cLS.left = left + 'px';
                    };

                    window.addEventListener('scroll', this.pinScrollHandler, true);
                };
            },
            unpin: function () {
                if (!this.pinned) return;
                this.pinned = false;
                this.cCommandP.classList.remove('fv-p-v-control-command-selected');

                if (this.fixedPin) {
                    var controlLayer = this.controlLayer;
                    var cLS = controlLayer.style;
                    var scrolled = getScrolled();

                    cLS.position = 'absolute';
                    cLS.top = parseFloat(cLS.top) + scrolled.y + 'px';
                    cLS.left = parseFloat(cLS.left) + scrolled.x + 'px';

                    this.video.style.setProperty('position', this.pinData.position, 'important');
                } else {
                    window.removeEventListener('scroll', this.pinScrollHandler, true);
                };
            },
            togglePin: function () {
                if (this.maximized) {// 最大化的时候，先保存状态，退出后在进行切换
                    this.cCommandP.classList[(this.maximizeBackup.pinned = !this.maximizeBackup.pinned) ? 'add' : 'remove']('fv-p-v-control-command-selected');
                    return;
                };

                if (this.pinned) {
                    this.unpin();
                } else {
                    this.pin();
                };
            },

            lightOn: function () {
                if (this.lighting) return;
                this.lighting = true;

                var lOS = this.fixedOverlayer.style;
                lOS.opacity = 0;

                this.lightOnTimerId = setTimeout(function () {
                    lOS.display = 'none';
                }, 200);

                this.cCommandL.classList.remove('fv-p-v-control-command-selected');
            },
            lightOff: function () {
                if (!this.lighting) return;
                this.lighting = false;

                var lOS = this.fixedOverlayer.style;
                lOS.display = 'block';
                clearTimeout(this.lightOnTimerId);
                setTimeout(function () {
                    lOS.opacity = prefs.popVideo.lightOff.opacity;
                }, 100);

                this.cCommandL.classList.add('fv-p-v-control-command-selected');
            },
            toggleLight: function () {
                if (this.lighting) {
                    this.lightOff();
                } else {
                    this.lightOn();
                };
            },

            restore: function (close) {
                // 从所有列表中删除自己
                PopVideo.all.splice(PopVideo.all.indexOf(this), 1);

                var video = this.video;
                video.removeEventListener("wheel", this.scale.bind(this));
                video.removeEventListener("mousedown", this.videoMouseDown.bind(this), true);

                this.unpin();// 解除scroll监听

                this.exitMaximize();// 解除resize监听

                // 移除各种监听
                this.cLObserver.disconnect();

                window.removeEventListener('resize', this.wResizeListener, true);
                mouseEventListener.remove('mouseenter', video, this.videoEnterHandler);
                document.removeEventListener(support.fullscreenchange, this.fullscreenchangeListener, true);

                // 移除dom
                this.fixedOverlayer.parentNode.removeChild(this.fixedOverlayer);
                this.controlLayer.parentNode.removeChild(this.controlLayer);

                // 还原video相关的domstyle;

                var vS = video.style;
                video.controls = this.vOriControls;
                var vOriStyle = this.vOriStyle;

                for (var pro in vOriStyle) {
                    if (!vOriStyle.hasOwnProperty(pro)) continue;
                    // console.log(pro);
                    // chrome 用setProperty覆盖style上原有的值上存在important声明的时候
                    // 设置的值也必须有important声明，否则设置不上，并且就算有important声明，setProperty传递null或空字符串时，也无法删除原值。
                    //removeProperty移除有 important声明的时候，组合值必须一个一个移除。比如 removeProperty('padding') 无效，需要单独移除每个padding

                    vS.removeProperty(pro);
                    vS.setProperty(pro, vOriStyle[pro][0], vOriStyle[pro][1]);
                };
                video.classList.remove('fv-p-v-video');


                // 移除popVideo标记
                delete video.fvPopVideo;

                if (this.vPEIsObject) {
                    delete this.vPEIsObject.fvPopVideo;
                } else if (this.vCEIsPlugin) {
                    delete this.vCEIsPlugin.fvPopVideo;
                    this.vCEIsPlugin.classList.remove('fv-p-v-video-child-plugin');
                };

                // 还原video的祖先元素们的样式
                var ancestors = this.ancestors;

                ancestors.forEach(function (ancestor) {
                    var ancestorData = data(ancestor, 'data');
                    if (ancestorData.count == 1) {
                        var ancestorStyle = ancestor.style;
                        var aDataStyle = ancestorData.style;
                        for (var pro in aDataStyle) {
                            if (!ancestorData.style.hasOwnProperty(pro)) continue;
                            ancestorStyle.removeProperty(pro);
                            ancestorStyle.setProperty(pro, aDataStyle[pro][0], aDataStyle[pro][1]);
                        };
                        delete data(ancestor).data;
                    } else {
                        ancestorData.count -- ;
                    };
                });


                // 还原特殊修正
                if (this.removePopVideoFix) {
                    this.removePopVideoFix();
                };

                // 是否是直接关闭视频
                if (close) {
                    new CloseVideo(video);
                } else {
                    // 平滑滚动到视频处
                    this.smoothScrollIntoView(video);
                };

            },
            setZIndex: function (force) {
                if (!force && PopVideo.topVideo == this) return;

                PopVideo.topVideo = this;

                this.fixedOverlayer.style.zIndex = PopVideo.maxIndex ++;
                this.controlLayer.style.zIndex = PopVideo.maxIndex;

                this.video.style.setProperty('z-index', PopVideo.maxIndex ++, 'important');
            },
            followControlLayer: function () {
                // 全屏状态禁止调整video的大小
                if (this.isFullscreen) return;

                var video = this.video;

                if (!document.contains(video) || getComputedStyle(video).display == 'none') {
                    this.restore();
                    return;
                };

                var controlLayer = this.controlLayer;

                var cLS = controlLayer.style;
                var vS = video.style;

                vS.setProperty('height', cLS.height, 'important');
                vS.setProperty('width', cLS.width, 'important');

                this.cSizeInfo.textContent = 'W: ' + parseFloat(cLS.width) + ' H: ' + parseFloat(cLS.height);

                var cLCRect = getContentClientRect(controlLayer);
                var vCRect = getContentClientRect(video);

                // 使用top left 修正到和之前的位置一样
                if (!video.style.transform) {
                    vS.setProperty('top', parseFloat(vS.top) + cLCRect.top - vCRect.top + 'px', 'important');
                    vS.setProperty('left', parseFloat(vS.left) + cLCRect.left - vCRect.left + 'px', 'important');
                }

            },
            smoothScrollIntoView: function (elem) {
                if (!document.contains(elem) || getComputedStyle(elem).display == 'none') return;

                var eBCRect = elem.getBoundingClientRect();
                var wSize = getWindowSize();
                var scrolled = getScrolled();
                var pros = {};

                // y轴
                if (eBCRect.top < 0 || eBCRect.top > wSize.height) {
                    pros.scrollTop = Math.max(scrolled.y + eBCRect.top - 10, 0);
                };

                // x轴
                if (eBCRect.left < 0 || eBCRect.left > wSize.width) {
                    pros.scrollLeft = Math.max(scrolled.x + eBCRect.left - 10, 0);
                };


                var scrollFx = PopVideo.scrollFx;
                if (!scrollFx) {
                    scrollFx = PopVideo.scrollFx = fx('html,body');
                };
                scrollFx.stop();
                scrollFx.animate(pros,{
                    duration: 400,
                });

            },

            addStyle: function () {
                if (PopVideo.styleAdded) return;
                PopVideo.styleAdded = true;

                var style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'flash-viewer-pop-video';

                style.textContent = getMStr(function () {
                    var cssText;
                    /*
                        .fv-p-v-vertical-align-helper {
                            display: inline-block;
                            vertical-align: middle;
                            width: 0;
                            height: 100%;
                            white-space: nowrap;
                            opacity: 0;
                            visibility: hidden;
                            overflow: hidden;
                        }

                        .fv-p-v-video {
                            min-width: 0 !important;
                            min-height: 0 !important;
                            max-width: none !important;
                            max-height: none !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            border: none !important;
                            transition: none !important;
                            bottom: auto !important;
                            right: auto !important;
                            background-color: black !important;
                        }
                        iframe.fv-p-v-video {
                            background-color: white !important;
                        }

                        .fv-p-v-video-child-plugin {
                            border: none !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            width: 100% !important;
                            height: 100% !important;
                        }

                        .fv-p-v-light-off {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            opacity: 0;
                            display: none;
                            transition: opacity 0.2s ease-in-out;
                            background-color: #000;
                        }

                        .fv-p-v-control-layer {
                            position: absolute;
                            padding: 5px;
                            padding-top: 25px;
                            opacity: 0.3;
                            transition: opacity 0.3s ease-in-out;
                            pointer-events: none;
                        }
                        .fv-p-v-control-layer_maximized {
                            opacity: 1 !important;
                        }

                        .fv-p-v-control-layer:hover {
                            opacity: 1;
                        }

                        .fv-p-v-control-resize-hand,
                        .fv-p-v-control-title-bar {
                            position: absolute;
                            background-color: #535353;
                            pointer-events: all;
                        }

                        .fv-p-v-control-title-bar {
                            -moz-user-select: none;
                            -webkit-user-select: none;
                            user-select: none;
                            cursor: move;
                            cursor: -moz-grab;
                            cursor: -webkit-grab;
                            cursor: grab;
                            top: 5px;
                            left: 0;
                            right: 0;
                            padding: 0 36px 0 10px;
                            margin: 0 5px;
                            height: 20px;
                            line-height: 20px;
                            font-size: 13px;
                            text-align: right;
                            white-space: nowrap;
                        }
                        .fv-p-v-control-title-bar:active {
                            cursor: -moz-grabbing;
                            cursor: -webkit-grabbing;
                            cursor: grabbing;
                        }

                        .fv-p-v-control-title-bar-left-side {
                            float: left;
                            color: #AFAFAF;
                            height: 100%;
                            background-color: #535353;
                            pointer-events: none;
                        }
                        .fv-p-v-control-title-bar-right-side {
                            display: inline-block;
                            height: 100%;
                            vertical-align: top;
                            background-color: #535353;
                            font-size: 0;
                            line-height: 0;
                        }

                        .fv-p-v-control-title-bar select,
                        .fv-p-v-control-title-bar input,
                        .fv-p-v-control-title-bar option {
                            font-size: 13px;
                            width: auto;
                            color: white;
                            background: #535353;
                        }

                        .fv-p-v-control-resize-hand-n {
                            height: 5px;
                            top: 0;
                            left: 0;
                            right: 0;
                            margin: 0 5px;
                            cursor: ns-resize;
                        }
                        .fv-p-v-control-resize-hand-s {
                            height: 5px;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: 0 5px;
                            cursor: ns-resize;
                        }
                        .fv-p-v-control-resize-hand-e {
                            width: 5px;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            margin: 5px 0;
                            cursor: ew-resize;
                        }
                        .fv-p-v-control-resize-hand-w {
                            width: 5px;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            margin: 5px 0;
                            cursor: ew-resize;
                        }
                        .fv-p-v-control-resize-hand-nw {
                            width: 5px;
                            height: 5px;
                            top: 0;
                            left: 0;
                            cursor: nwse-resize;
                        }
                        .fv-p-v-control-resize-hand-se {
                            width: 5px;
                            height: 5px;
                            bottom: 0;
                            right: 0;
                            cursor: nwse-resize;
                        }
                        .fv-p-v-control-resize-hand-ne {
                            width: 5px;
                            height: 5px;
                            top: 0;
                            right: 0;
                            cursor: nesw-resize
                        }
                        .fv-p-v-control-resize-hand-sw {
                            width: 5px;
                            height: 5px;
                            bottom: 0;
                            left: 0;
                            cursor: nesw-resize
                        }

                        .fv-p-v-control-command {
                            cursor: pointer;
                            display: inline-block;
                            vertical-align: middle;
                            height: 18px;
                            width: 18px;
                            padding: 0 3px;
                            background: transparent center no-repeat;
                            opacity: 0.6;
                            transition: opacity 0.2s ease-in-out;

                        }
                        .fv-p-v-control-command-selected {
                            background-color: #404040;
                        }

                        .fv-p-v-control-command:hover {
                            opacity: 1;
                        }
                        .fv-p-v-control-word {
                            color: #bababa;
                            font-size: 14px;
                            line-height: 18px;
                            font-family: system-ui;
                            width: auto;
                        }
                        .fv-p-v-control-word>.fv-p-v-control-command {
                            display: none;
                        }
                        .fv-p-v-control-word:hover>.fv-p-v-control-command {
                            display: unset;
                        }

                        .fv-p-v-control-light {
                            background-image:url("$light$")
                        }
                        .fv-p-v-control-pin {
                            background-image:url("$pin$");
                        }
                        .fv-p-v-control-maximize {
                            background-image:url("$maximize$");
                        }
                        .fv-p-v-control-fullscreen {
                            background-image:url("$fullscreen$");
                        }
                        .fv-p-v-control-restore {
                            background-image:url("$restore$");
                        }
                        .fv-p-v-control-close {
                            background-image:url("$close$");
                        }

                        */
                }).cssText.replace('$light$', icons.popVideo.light)
                    .replace('$pin$', icons.popVideo.pin)
                    .replace('$maximize$', icons.popVideo.maximize)
                    .replace('$fullscreen$', icons.popVideo.fullscreen)
                    .replace('$restore$', icons.popVideo.restore)
                    .replace('$close$', icons.popVideo.close);


                var style2 = document.createElement('style');
                PopVideo.movingHelperStyle = style2;

                style2.type = 'text/css';
                style2.id = 'flash-viewer-pop-video-moving-helper';

                style2.textContent = getMStr(function () {
                    var cssText;
                    /*
                        iframe,
                        .fv-p-v-video {
                            pointer-events: none !important;
                        }
                    */
                }).cssText;
                var parentEle = document.head || document.documentElement;

                parentEle.appendChild(style);
                parentEle.appendChild(style2);

                style2.disabled = true;// style添加到文档之后disabled属性才有效

            },
        };


        // 关闭视频之后的占位符
        function CloseVideo(plugin) {
            this.plugin = plugin;
            this.init();
        };
        CloseVideo.styleAdded = false;

        CloseVideo.prototype = {
            init: function () {
                this.addStyle();

                var plugin = this.plugin;

                // 如果父元素是object，那么隐藏object元素
                var pluginP;
                if ((pluginP = plugin.parentElement) && pluginP.nodeName == 'OBJECT') {
                    plugin = pluginP;
                };

                this.plugin = plugin;


                var pCStyle = getComputedStyle(plugin);

                // 设置一个占位符
                var placeholder = document.createElement('fvspan');
                placeholder.className = 'fv-c-v-placeholder';
                placeholder.title = "点击还原视频";

                placeholder.innerHTML = createHTML(getMStr(function () {
                    var innerHTML;
                    /*
                    <fvspan class="fv-c-v-close" title="彻底删除这个视频"></fvspan>
                    */
                }).innerHTML);


                // 复制样式
                var phStyle = placeholder.style;
                var pros = [// 尽量拆开写，浏览器对复合值的返回不一样
                    'display', 'cssFloat',
                    'position', 'zIndex',
                    'top', 'bottom', 'left', 'right',
                    'height', 'width',
                    'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth',
                    'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
                    'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
                    support.cssBoxSizing,
                ];

                pros.forEach(function (pro) {
                    phStyle[pro] = pCStyle[pro];
                });

                // iframe,audio,video默认display inline。但是普通元素的的话inline设置height width是无效的
                if (phStyle.display == 'inline') {
                    phStyle.display = 'inline-block';
                };

                // 如果是static定位那么改成relative定位，为占位符的内部关闭按钮做包含块
                if (phStyle.position = 'static') {
                    phStyle.position = 'relative';
                    phStyle.zIndex = 'auto';
                };


                // 监听占位符的点击操作
                placeholder.addEventListener('click', function (e) {
                    placeholder.parentNode.removeChild(placeholder);

                    var target = e.target;
                    if (target == this) {//显示视频
                        plugin.classList.remove('fv-c-v-hide-plugin');
                        if (oSrc) {// iframe
                            plugin.src = oSrc
                        };
                    } else {// 移除视频
                        plugin.parentNode.removeChild(plugin);
                    };
                }, true);

                // 插入占位符
                var pluginNS = plugin.nextSibling;
                pluginP = plugin.parentNode;
                if (pluginNS) {
                    pluginP.insertBefore(placeholder, pluginNS);
                } else {
                    pluginP.appendChild(placeholder);
                };

                // 隐藏插件
                var pNName = plugin.nodeName;
                var oSrc;
                plugin.classList.add('fv-c-v-hide-plugin');

                if (/^(?:VIDEO|AUDIO)$/.test(pNName)) {// video audio标签，暂停播放
                    plugin.pause();
                } else if (pNName == 'IFRAME') {
                    oSrc = plugin.src;
                    plugin.src = 'about:blank';
                };
            },
            addStyle: function () {
                if (CloseVideo.styleAdded) return;
                CloseVideo.styleAdded = true;

                var style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'flash-viewer-close-video'

                style.textContent = getMStr(function () {
                    var cssText;
                    /*
                        .fv-c-v-placeholder {
                            border-radius: 3px;
                            border-style: solid;
                            border-color: #ccc;
                            cursor: pointer;
                            background:#767676 url("$video$") center no-repeat;
                            opacity: 0.8;
                            transition: opacity 0.2s ease-in-out;
                        }
                        .fv-c-v-placeholder:hover {
                            opacity: 1;
                        }

                        .fv-c-v-close {
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            opacity: 0.8;
                            width: 18px;
                            height: 18px;
                            border: 1px solid #A9A9A9;
                            border-radius: 30px;
                            box-shadow: 0 0 3px 0px rgba(0,0,0,1);
                            background: transparent center no-repeat;
                            background-size: 100% 100%;
                            background-origin: content-box;
                            background-image: url("$close$");
                            transition: width 0.2s ease-in-out,
                                height 0.2s ease-in-out,
                                opacity 0.2s ease-in-out;
                        }
                        .fv-c-v-close:hover {
                            opacity: 1;
                            width: 24px;
                            height: 24px;
                        }

                        .fv-c-v-hide-plugin {
                            display: none !important;
                        }
                    */
                }).cssText.replace('$close$', icons.floatBar.close)
                    .replace('$video$', icons.video);

                (document.head || document.documentElement).appendChild(style);

            },
        };

        // 浮动工具栏
        function FloatBar() {
            this.init();
        };
        FloatBar.styleAdded = false;

        FloatBar.prototype = {
            hideDelay: 566,
            hidden: true,

            init: function () {
                this.addStyle();

                // 浮动工具栏
                var floatBar = document.createElement('fvspan');
                this.floatBar = floatBar;
                floatBar.id = 'fv-f-b-container';

                floatBar.innerHTML = createHTML(getMStr(function () {
                    var innerHTML;
                    /*
                        <fvspan class="fv-f-b-button"></fvspan>
                        <fvspan class="fv-f-b-button"></fvspan>
                        <fvspan class="fv-f-b-button"></fvspan>
                        <fvspan class="fv-f-b-button"></fvspan>
                        <fvspan class="fv-f-b-button word">
                          速
                          <select class="fv-p-v-control-rate">
                            <option value="1">原速</option>
                            <option value="1.25">1.25倍速</option>
                            <option value="1.5">1.5倍速</option>
                            <option value="1.75">1.75倍速</option>
                            <option value="2">二倍速</option>
                            <option value="3">三倍速</option>
                            <option value="5">五倍速</option>
                            <option value="0.75">0.75倍速</option>
                            <option value="0.5">半速</option>
                            <option value="0.25">0.25倍速</option>
                            <option value="0.1">0.1速</option>
                            <option value="input">自定义输入</option>
                            <option disabled="disabled" style='display: none' value=''>自定义输入</option>
                          </select>
                        </fvspan>
                        <fvspan class="fv-f-b-button word">
                          比
                          <select class="fv-p-v-control-ratio">
                            <option value="">原始比例</option>
                            <option value="1.335,1">16 / 9</option>
                            <option value="0.75,1">4 / 3</option>
                            <option value="2,2">两倍大小</option>
                          </select>
                        </fvspan>
                        <fvspan class="fv-f-b-button word">
                          亮
                          <select class="fv-p-v-control-bright">
                            <option value="1">原亮度</option>
                            <option value="1.5">1.5倍亮度</option>
                            <option value="2">二倍亮度</option>
                            <option value="3">三倍亮度</option>
                            <option value="5">五倍亮度</option>
                            <option value="0.5">一半亮度</option>
                            <option value="0.2">0.2亮度</option>
                            <option value="0.1">0.1亮度</option>
                            <option value="input">自定义输入</option>
                            <option disabled="disabled" style='display: none' value=''>自定义输入</option>
                          </select>
                        </fvspan>
                    */
                }).innerHTML);

                var butonOrder = prefs.floatBar.butonOrder.slice(0);
                butonOrder.push('download');
                butonOrder.push('rate');
                butonOrder.push('ratio');
                butonOrder.push('bright');

                nativeMethods.forEach.call(floatBar.children, function (child) {
                    var classlist = child.classList;
                    if (!classlist.contains('fv-f-b-button')) return;

                    var bName = butonOrder.shift();
                    if (!bName) {
                        child.style.display = 'none';
                        return;
                    };

                    classlist.add('fv-f-b-button-' + bName);

                    var titleMap = {
                        pop: '弹出视频',
                        reload: '重载视频',
                        close: '移除视频',
                        download: '用flvcd解析视频地址',
                        rate: '播放速度',
                        ratio: '长宽比',
                        bright: '亮度'
                    };

                    child.title = titleMap[bName];

                    // 相关命令保存在dom上
                    child.dataset.clickCommand = bName;

                });

                document.body.appendChild(floatBar);

                this.downloadButton = floatBar.querySelector('.fv-f-b-button-download');

                var self = this;
                this.rateSelect = floatBar.querySelector('.fv-p-v-control-rate');
                this.ratioSelect = floatBar.querySelector('.fv-p-v-control-ratio');
                this.brightSelect = floatBar.querySelector('.fv-p-v-control-bright');
                this.rateSelect.addEventListener('change', function (e) {
                    let rate = e.target.value;
                    if (rate === 'input') {
                        rate = prompt('输入速度');
                        e.target.value = "";
                    }
                    self.target.playbackRate = rate;
                }, true);

                this.brightSelect.addEventListener('change', function (e) {
                    let bright = e.target.value;
                    if (bright === 'input') {
                        bright = prompt('输入亮度');
                        e.target.value = "";
                    }
                    self.target.style.filter = `brightness(${bright})`;
                }, true);

                this.ratioSelect.addEventListener('change', function (e) {
                    let ratio = e.target.value;
                    self.target.style.transform = ratio ? `scale(${ratio})` : "";
                }, true);

                // 监听按钮点击
                floatBar.addEventListener('click', function (e) {
                    if (e.button !=0) return;// 非左键点击

                    var plugin = self.target;

                    // 如果点击按钮的时候，插件被删除了，或者被隐藏了
                    if (!document.contains(plugin) || getComputedStyle(plugin).display == 'none') {
                        self.hide();
                        return;
                    };

                    var bName = e.target.dataset.clickCommand;
                    if (!bName) return;
                    // console.log(bName);

                    switch (bName) {
                        // 点击了弹出命令按钮
                        case 'pop':
                            self.hide();

                            new PopVideo(plugin);
                        break;
                        // 点击了重载命令按钮
                        case 'reload':
                             self.hide();

                             var pNName = plugin.nodeName;
                             if (/^(?:VIDEO|AUDIO)$/.test(pNName)) {// video 和 audio标签
                                plugin.load();
                             } else if (pNName == 'IFRAME') {// iframe
                                var oSrc = plugin.src;
                                plugin.src = 'about:blank';
                                setTimeout(function () {
                                    plugin.src = oSrc;
                                }, 10);
                             } else {
                                reinitPlugin(plugin);
                             };
                        break;
                        // 点击了关闭命令按钮
                        case 'close':
                            self.hide();

                            new CloseVideo(plugin);
                        break;
                        case 'download':
                            self.hide();

                            window.open('http://www.flvcd.com/parse.php?kw=' + encodeURIComponent(self.downloadUrl));
                        break;
                    };

                }, true);

                // 监听mouse进出
                mouseEventListener.add('mouseleave', floatBar, function (e) {
                    self.hideTimerId = setTimeout(function () {
                        self.hide();
                    }, self.hideDelay);
                });

                mouseEventListener.add('mouseenter', floatBar, function (e) {
                    clearTimeout(self.hideTimerId);
                });
            },
            show: function () {
                if (!this.hidden) return;
                this.hidden = false;

                this.setPosition();
                this.downloadable();

                var fbs = this.floatBar.style;
                fbs.display = 'block';
                setTimeout(function () {
                    fbs.opacity = 1;
                }, 30);
            },
            hide: function () {
                if (this.hidden) return;
                this.hidden = true;

                var fbs = this.floatBar.style;
                fbs.display = 'none';
                fbs.opacity = 0;
            },
            downloadable: function () {// 如果可下载，那么显示下载按钮
                var plugin = this.target;
                var pNName = plugin.nodeName;

                if (!/^(?:OBJECT|EMBED)$/.test(pNName)) {
                    this.downloadButton.style.display = 'none';
                    return;
                };

                function convertFVars2Obj(fVars) {
                    var ret = {};

                    fVars.split('&').forEach(function (item) {
                        if (!item) return;

                        var index = item.indexOf('=');
                        if (index == -1) {
                            if (item !=' ') {
                                ret[item] = '';
                            };
                        } else {
                            if (index > 0) {
                                ret[item.slice(0, index)] = item.slice(index + 1);
                            };
                        };
                    });

                    return ret;
                };

                var src;
                var fVars;

                if (pNName == 'EMBED') {
                    src = plugin.src;
                    fVars = plugin.getAttribute('flashvars');
                } else {// object
                    src = plugin.data;

                    nativeMethods.some.call(plugin.children, function (child) {
                        if (child.nodeName != 'PARAM') return;

                        var name = child.name.toLowerCase();
                        var value = child.value;
                        switch (name) {
                            case 'movie':
                            case 'src':
                                if (!src) {
                                    src = value;
                                };
                            break;
                            case 'flashvars':
                                fVars = value;
                            break;
                        };

                        if (src && fVars) return true;
                    });

                };

                if (!src) {
                    this.downloadButton.style.display = 'none';
                    return;
                };

                fVars = fVars || '';

                fVars = convertFVars2Obj(fVars);

                var qIndex;
                var hIndex;
                var qFVars;
                var key;

                qIndex = src.indexOf('?');

                if (qIndex != -1) {
                    qIndex ++;

                    hIndex = src.indexOf('#');
                    hIndex = hIndex == -1 ? src.length : hIndex;

                    qFVars = src.slice(qIndex, hIndex);

                    qFVars = convertFVars2Obj(qFVars);

                    // 合并参数
                    for (key in fVars) {
                        if (!fVars.hasOwnProperty(key)) continue;

                        qFVars[key] = fVars[key];
                    };

                    fVars = qFVars;
                };


                var downloadUrl;

                var youkuId;
                var qqVid;
                var yytId;

                var srcOrigin = src.match(/[^:]+:\/\/[^/]+/)[0];

                if (/\.youku\.com/i.test(srcOrigin)) {// youku
                    if (youkuId = src.match(/\/sid\/(\w{13,})\//)) {
                        youkuId = youkuId[1];
                    } else {
                        youkuId = fVars.VideoIDS;
                    };

                    if (youkuId) {
                        downloadUrl = 'http://v.youku.com/v_show/id_' + youkuId + '.html';
                    };
                } else if (/\.qq\.com/.test(srcOrigin)) {// 腾讯视频
                    qqVid = fVars.vid;

                    if (qqVid) {
                        downloadUrl = 'http://static.video.qq.com/TPout.swf?vid=' + qqVid;
                    };
                } else if (/player\.yinyuetai\.com/.test(srcOrigin)) {// 音悦台

                    if (yytId = src.match(/^https?:\/\/player\.yinyuetai\.com\/video\/swf\/(\d+)\//)) {
                        downloadUrl = 'http://v.yinyuetai.com/video/' + yytId[1];
                    };
                } else if (/s\.yytcdn\.com/.test(srcOrigin)) {// 音悦台本站
                    if (yytId = fVars.videoId) {
                        downloadUrl = 'http://v.yinyuetai.com/video/' + yytId;
                    };
                };

                if (downloadUrl) {
                    this.downloadUrl = downloadUrl;
                    this.downloadButton.style.display = '';
                } else {
                    this.downloadButton.style.display = 'none';
                };
            },
            setPosition: function () {
                var targetPosi = getContentClientRect(this.target);
                var windowSize = getWindowSize();

                var floatBarPosi = prefs.floatBar.position.toLowerCase().split(/\s+/);

                var offsetX = prefs.floatBar.offset.x;
                var offsetY = prefs.floatBar.offset.y;


                var scrolled = getScrolled();

                var fbs = this.floatBar.style;

                var setPosition = {
                    top: function () {
                        var top = targetPosi.top + scrolled.y;
                        if (targetPosi.top + offsetY < 0) {//满足图标被遮住的条件.
                            top = scrolled.y;
                            offsetY = 0;
                        };
                        fbs.top = top + offsetY + 'px';
                    },
                    right: function () {
                        var rRight = windowSize.width - targetPosi.right;// 目标的右边到浏览器右边的距离
                        var right =  rRight - scrolled.x;
                        if (rRight - offsetX < 0) {
                            right = -scrolled.x;
                            offsetX = 0;
                        };
                        fbs.right = right - offsetX + 'px';
                    },
                    bottom: function () {
                        var rBottom = windowSize.height - targetPosi.bottom;// 目标的下边到浏览器下边的距离
                        var bottom = rBottom - scrolled.y;
                        if (rBottom - offsetY < 0) {
                            bottom = -scrolled.y;
                            offsetY = 0;
                        };
                        fbs.bottom = bottom - offsetY + 'px';
                    },
                    left: function () {
                        var left = targetPosi.left + scrolled.x;
                        if (targetPosi.left + offsetX < 0) {
                            left = scrolled.x;
                            offsetX = 0;
                        };
                        fbs.left = left + offsetX + 'px';
                    },
                };

                setPosition[floatBarPosi[0]]();
                setPosition[floatBarPosi[1]]();
            },
            start: function (target) {

                if (this.target) {
                    mouseEventListener.remove('mouseleave', this.target, this.targetLeaveHandler);
                };

                this.target = target;
                // console.log(target);

                if (target && target.playbackRate) {
                    this.rateSelect.parentNode.style.display = "";
                    this.brightSelect.parentNode.style.display = "";
                    this.ratioSelect.parentNode.style.display = "";
                    this.rateSelect.value = target.playbackRate;

                    let bright = target.style.filter.match(/.*brightness\((.*?)\).*/);
                    if (bright) this.brightSelect.value = bright[1];
                    let ratio = target.style.transform.match(/.*scale\((.*?)\).*/);
                    if (ratio) this.ratioSelect.value = ratio[1].replace(/ /g, '');
                    if (!target.dataset.isInit) {
                        target.dataset.isInit = 1;
                        let lastPos = 0;
                        let speedUpTimer;
                        let mouseDown = false;
                        let mouseMoving = false;
                        let lastRate;
                        target.addEventListener('mousedown', function (e) {
                            clearTimeout(speedUpTimer);
                            mouseMoving = false;
                            if (!target.ended) {
                                mouseDown = true;
                                lastRate = target.playbackRate;
                                speedUpTimer = setTimeout(() => {
                                    target.playbackRate = 5;
                                    target.play();
                                }, 500);
                                lastPos = e.clientX;
                            }
                        });
                        target.addEventListener('click', function (e) {
                            clearTimeout(speedUpTimer);
                            if (target.playbackRate != lastRate) {
                                target.playbackRate = lastRate;
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            mouseMoving = false;
                            mouseDown = false;
                        }, true);
                        target.addEventListener('mousemove', function (e) {
                            if (!mouseDown) return;
                            if (!mouseMoving) {
                                if (Math.abs(e.clientX - lastPos) > 10) {
                                    mouseMoving = true;
                                }
                                return;
                            }
                            clearTimeout(speedUpTimer);
                            target.playbackRate = lastRate;
                            target.pause();
                            target.currentTime += (e.clientX - lastPos) / 5;
                            lastPos = e.clientX;
                        });
                        target.addEventListener('mouseleave', function (e) {
                            clearTimeout(speedUpTimer);
                            mouseDown = false;
                        });
                    }
                } else {
                    this.rateSelect.parentNode.style.display = "none";
                    this.brightSelect.parentNode.style.display = "none";
                    this.ratioSelect.parentNode.style.display = "none";
                }

                var self = this;

                var targetLeaveHandler = function (e) {
                    mouseEventListener.remove('mouseleave', target, targetLeaveHandler);

                    if (self.hidden) {
                        clearTimeout(self.showTimerId);
                    } else {
                        self.floatBar.style.opacity = 0.5;
                        self.hideTimerId = setTimeout(function () {
                            self.hide();
                        }, self.hideDelay);
                    };

                };
                this.targetLeaveHandler = targetLeaveHandler;

                // chrome的鼠标事件发生顺序坑爹，鼠标从a进入b，a(leave) > b(enter) > a(out) > b(over)
                // firefox a(out) > a(leave) > b(over) > b(enter)

                // 注册鼠标离开插件后隐藏浮动栏
                mouseEventListener.add('mouseleave', target, targetLeaveHandler);

                clearTimeout(this.hideTimerId);

                if (this.hidden) {
                    this.showTimerId = setTimeout(function () {
                        self.show();
                    }, prefs.floatBar.showDelay);
                } else {
                    this.floatBar.style.opacity = 1;
                    this.downloadable();
                    this.setPosition();
                };

            },
            addStyle: function () {
                if (FloatBar.styleAdded) return;
                FloatBar.styleAdded = true;

                var style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'flash-viewer-float-bar';

                /*z-index的最大值为：2147483647*/
                style.textContent = getMStr(function () {
                    var cssText;
                    // 在wmode=window 的 flash上放置元素的话，firefox只能绘制不含有透明度的background的元素，
                    // 比如border-radius，box-shadow都不能正确绘制
                    // 如果这个元素有子元素，并且所需绘制范围在这个元素的background范围内，那么子元素就能正确被绘制
                    // chrome 不存在以上问题
                    /*
                        #fv-f-b-container {
                            position: absolute;
                            top: -100px;
                            left: -100px;
                            display: none;
                            padding: 5px;
                            border-radius: 3px;
                            z-index: 2147483647;
                            line-height: 0;
                            font-size: 0;
                            opacity: 0;
                            transition: top 0.2s ease-in-out,
                                left 0.2s ease-in-out,
                                opacity 0.2s ease-in-out;
                        }
                        #fv-f-b-container:hover {
                            opacity: 1 !important;
                        }
                        #fv-f-b-container:hover+#pv-float-bar-container {
                            display: none!important;
                        }

                        .fv-f-b-button {
                            display: inline-block;
                            vertical-align: top;
                            cursor: pointer;
                            width: 18px;
                            height: 18px;
                            margin-right: -14px;
                            border-radius: 2px;
                            position: relative;
                            box-shadow: 0 0 3px 0px rgba(0, 0, 0, 1);
                            background: transparent center no-repeat;
                            background-size: 100% 100%;
                            background-origin: content-box;
                            transition: margin-right 0.15s ease-in-out,
                                width 0.15s ease-in-out,
                                height 0.15s ease-in-out;
                        }
                        .fv-f-b-button:hover {
                            box-shadow: 0 0 3px 0px rgba(0, 0, 0, 1),
                                inset 0 24px 0px 0px rgba(255, 255, 255, 0.2);
                        }
                        .fv-f-b-button:nth-last-child(1) {
                            z-index: 1
                        }
                        .fv-f-b-button:nth-last-child(2) {
                            z-index: 2
                        }
                        .fv-f-b-button:nth-last-child(3) {
                            z-index: 3
                        }
                        .fv-f-b-button:nth-last-child(4) {
                            z-index: 4
                        }
                        .fv-f-b-button:nth-last-child(5) {
                            z-index: 5
                        }
                        .fv-f-b-button:nth-last-child(6) {
                            z-index: 6
                        }
                        .fv-f-b-button:nth-last-child(7) {
                            z-index: 7
                        }

                        #fv-f-b-container:hover > .fv-f-b-button {
                            width: 24px;
                            height: 24px;
                            margin-right: 6px;
                            display: inline-block;
                        }

                        .fv-f-b-button-pop {
                            background-image: url("$pop$");
                        }
                        .fv-f-b-button-reload {
                            background-image: url("$reload$");
                        }
                        .fv-f-b-button-close {
                            background-image: url("$close$");
                        }
                        .fv-f-b-button-download {
                            background-image: url("$download$");
                        }
                        .fv-f-b-button.word {
                            font-size: 18px;
                            font-weight: bold;
                            line-height: 24px;
                            text-align: center;
                            color: #b7b7b7;
                            background: #5f5f5f;
                            display: none;
                        }
                        .fv-f-b-button.word>select {
                            font-size: 15px;
                            width: auto;
                            color: white;
                            background: #535353;
                            opacity: 0;
                            transition: opacity 0.2s ease-in-out;
                            pointer-events: none;
                        }
                        .fv-f-b-button.word:hover>select {
                            opacity: 1;
                            pointer-events: all;
                        }


                    */
                }).cssText.replace('$close$', icons.floatBar.close)
                    .replace('$pop$', icons.floatBar.pop)
                    .replace('$reload$', icons.floatBar.reload)
                    .replace('$download$', icons.floatBar.download);

                (document.head || document.documentElement).appendChild(style);
            },
        };

        var plugFloatBar;
        // 监控鼠标是否摸到了插件
        document.addEventListener('mouseover', function (e) {
            var target = e.target;
            var tNName = target.nodeName;
            let video = target.querySelectorAll('video');
            if (video.length === 1) {
                target = video[0];
                tNName = 'VIDEO';
            }

            // 可弹出元素
            const availableNode = /^(?:OBJECT|EMBED|VIDEO|AUDIO|IFRAME)$/i;
            if (!availableNode.test(tNName)) {
                target = null;
                if (document.elementsFromPoint) {
                    let elements = document.elementsFromPoint(e.clientX, e.clientY);
                    let checkLen = Math.min(elements.length, 5);
                    for (let i = 0; i < checkLen; i++) {
                        let ele = elements[i];
                        if (!ele) continue;
                        if (availableNode.test(ele.nodeName)) {
                            target = ele;
                            tNName = ele.nodeName;
                            break;
                        }
                    }
                }
                if (!target) {
                    return;
                }
            }

            // console.log(target);

            // popVideo中。
            if (target.fvPopVideo) return;

            // 如果是插件判断是否为flash插件
            if (/^(?:OBJECT|EMBED)$/.test(tNName)) {
                // console.log(target);

                if (tNName == 'EMBED') {
                    if (!/^(?:application\/x-shockwave-flash|)$/.test(target.type) || !target.src) {
                        return;
                    };
                } else {// object
                    if (target.data) {
                        if (!/^(?:application\/x-shockwave-flash|)$/.test(target.type)) {
                            return;
                        };
                    };
                };
            };

            // 如果flash太小，一般不是引用视频，不出现工具栏
            var cCRect = getContentClientRect(target);
            if (!(cCRect.width >= prefs.floatBar.minSizeLimit.width && cCRect.height >= prefs.floatBar.minSizeLimit.height)) {
                // console.log(cCRect);
                return;
            };


            if (!plugFloatBar) {
                plugFloatBar = new FloatBar();
            };

            plugFloatBar.start(target);

        }, true);

    };

    var _isunsafe = null;
    function isunsafe(){
        if (_isunsafe === null) {
            try {
                let escapeHTMLPolicy;
                let win = typeof unsafeWindow == 'undefined'? window : unsafeWindow;
                if (win.trustedTypes && win.trustedTypes.createPolicy) {
                    escapeHTMLPolicy = win.trustedTypes.createPolicy('fv_default', {
                        createScript: string => string
                    });
                }
                function createScript(html) {
                    return escapeHTMLPolicy ? escapeHTMLPolicy.createScript(html) : html;
                }
                _isunsafe = unsafeWindow.eval(createScript("false"));
            } catch (e) {
                _isunsafe = true;
            }
        }
        return _isunsafe;
    }

    // 如果发生通信的话，需要一个独一无二的ID
    var messageID = Math.random().toString();

    // 把指定函数丢到真实环境中执行，规避一切脚本管理器乱七八糟的执行环境产生的奇葩Bug，
    // 特别是chrome上的那个坑爹tampermonkey。。。
    function runInPageContext(fn) {
        if (typeof fn !== 'function') {
            return;
        }
        if (isunsafe()) {
            fn();
            return;
        }

        // 创建一个脚本插入到pageContext执行
        var script = document.createElement('script');
        script.type = 'text/javascript';

        // 去掉函数名，防止污染全局环境。
        var sContent = ';(' + fn.toString().replace(/[^(]+/, 'function ') + ')(' + JSON.stringify(messageID) + ');';

        // console.log('执行的脚本实际内容\n', sContent);

        script.textContent = sContent;

        // 检测html元素是否可访问
        // scriptish @run-at document-start时，html元素在第一时间不可访问
        var de = document.documentElement;

        if (de) {
            // console.log(de.outerHTML);

            try {
                de.appendChild(script);
                de.removeChild(script);
            } catch (e) {
                fn();
            }
        } else {
            if(support.MutationObserver)
            new (window.MutationObserver || window.WebKitMutationObserver)(function (ms, observer) {

                var de = document.documentElement;
                if (de) {
                    // console.log(de.outerHTML);

                    observer.disconnect();
                    try {
                        de.appendChild(script);
                        de.removeChild(script);
                    } catch (e) {
                        fn();
                    }
                };
            }).observe(document, {
                childList: true,
            });
        };

    };

    runInPageContext(contentScript);
})();
