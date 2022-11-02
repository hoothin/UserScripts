// ==UserScript==
// @name         Pagetual
// @name:zh-CN   东方永页机
// @name:zh-TW   東方永頁機
// @name:ja      東方永頁機
// @name:ru      Pagetual
// @name:de      Pagetual
// @name:es      Pagetual
// @name:fr      Pagetual
// @name:it      Pagetual
// @name:ko      東方永頁機
// @namespace    hoothin
// @version      1.9.32.33
// @description  Perpetual pages - Most powerful auto-pager script. Auto loading next paginated web pages and inserting into current page. Support thousands of web sites without any rule.
// @description:zh-CN  自动翻页 - 加载并拼接下一分页内容至当前页尾，无需规则自动适配任意网页
// @description:zh-TW  自動翻頁 - 加載並拼接下一分頁內容至當前頁尾，無需規則自動適配任意網頁
// @description:ja     Webページを自動で読み込み継ぎ足し表示を行うブラウザ拡張です、次のページ付けされた Web ページの自動読み込みと現在のページへの挿入 ルールなしで何千もの Web サイトをサポートします。
// @description:ru     Автоматическая загрузка следующих веб-страниц с разбивкой на страницы и вставка на текущую страницу. Поддержка тысяч веб-сайтов без каких-либо правил.
// @description:de     Automatisches Laden der nächsten paginierten Webseiten und Einfügen in die aktuelle Seite. Unterstützen Sie Tausende von Websites ohne Regeln.
// @description:es     Carga automática de las siguientes páginas web paginadas e inserción en la página actual. Admite miles de sitios web sin ninguna regla.
// @description:fr     Chargement automatique des pages Web paginées suivantes et insertion dans la page en cours. Prend en charge des milliers de sites Web sans aucune règle.
// @description:it     Caricamento automatico delle pagine Web impaginate successive e inserimento nella pagina corrente. Supporta migliaia di siti web senza alcuna regola.
// @description:ko     페이지가 매겨진 다음 웹 페이지를 자동으로 로드하고 현재 페이지에 삽입합니다. 규칙 없이 수천 개의 웹 사이트를 지원합니다.
// @author       hoothin
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAdVBMVEUAAAD3VU33VU32VEz8U073VU32VU33VU32VUz0Uk/3VE32VU32VUz2VU32VU32VU32VU33VU33U0z2VU34Wkv3VE32VUz/mpj/nJj2VUz2VU32VE33VEz2VU32VU32VUz3VE32VEz3VE3/mZf2Vkz2VU3/mpilFFolAAAAJXRSTlMA3Lp/GvTBT5YQLuawZ/DOyZwlPQeKc21N04+FX1bqpm9DNoB4T68ePwAAAitJREFUWMPt1tuasiAUBuCFCG5Rs3QybTPV1/1f4v/3PDkyIojn8x5qBrI+ltAfh32/yysmBKvyXb+njb6bDL9kzTd5SzjDAsYT8nFoGSxYe6BVqoNDp2jFDit25BRgVUAODB4YWcETWVTwVNGiGN5iWtBgg4YMCpsoI38dNunmmWyxUTvbPwwbsYR0fIzZLQ0pTG8eieRmBLMmpdH9uimQEf6TNRnXXKLZHixpJtywLzOgMHtFCqdM64DahHRnOE1dsrekm9wr2WtLcAlpdHwcp1pAJySXYnERclzp4+v19jXdmcTvQUJtz+ZaI4i05/V/UGYrCxbaAsOYoNfIKEQxpqQuzCgJJJ/3f42O8ywEZuMVWi/8hODxGj3GW2b0udkbGULLDOjimAG0S3fLGlBnXQM9irG1CiQdVQi0dqQsOSDlyEEz7Vy9OxxfR71VCXsSB23jMrKJYZXSjw57sqgLn5Z0wolsOCz0RyJkyeYjgz7pwwVq20eboZwtVUl2EnN5gJ50dQZFdryATvABRTr/tJXkUMdaAK5pwtCapwtFLskguwuyMh/Sd9WChQ4sIvIUYSk3PYqQvCQlOC04IfN7PkdjOyRKWhdKXMmiAFt9i3sJ5jxoRuR0vqAghxxwHuqfQE5OHGDKOrwEnqs1DgAZ2e4Eev1d45TN7JfhrQLKgfwMFYAsvp33dXII073aVQLI2gN5S58lfmGnKKFtah7nkgnBZB7zlP7Y/QNiTM6sYNzawwAAAABJRU5ErkJggg==
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_openInTab
// @grant        GM_deleteValue
// @grant        GM_info
// @grant        GM_setClipboard
// @grant        GM.xmlHttpRequest
// @grant        GM.registerMenuCommand
// @grant        GM.notification
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.addStyle
// @grant        GM.openInTab
// @grant        GM.deleteValue
// @grant        GM.info
// @grant        GM.setClipboard
// @downloadURL  https://greasyfork.org/scripts/438684-pagetual/code/Pagetual.user.js
// @updateURL    https://greasyfork.org/scripts/438684-pagetual/code/Pagetual.user.js
// @supportURL   https://github.com/hoothin/UserScripts/issues
// @connect      wedata.net
// @connect      githubusercontent.com
// @connect      ghproxy.com
// @connect      hoothin.github.io
// @run-at       document-idle
// @exclude      http://www.toodledo.com/tasks/*
// @exclude      http*://maps.google.com*/*
// @exclude      *://www.google.*/_/chrome/newtab*
// @exclude      *://mega.*/*
// @exclude      *://*.mega.*/*
// @exclude      *://*.youku.com/v_*
// @exclude      *://*pan.baidu.com
// @exclude      *://*.iqiyi.com/v_*
// @exclude      *://*.iqiyi.com/w_*
// @exclude      *://*.iqiyi.com/a_*
// @exclude      *://*.le.com/ptv/vplay/*
// @exclude      *://v.qq.com/x/cover/*
// @exclude      *://v.qq.com/x/page/*
// @exclude      *://v.qq.com/tv/*
// @exclude      *://*.tudou.com/listplay/*
// @exclude      *://*.tudou.com/albumplay/*
// @exclude      *://*.tudou.com/programs/view/*
// @exclude      *://*.mgtv.com/b/*
// @exclude      *://film.sohu.com/album/*
// @exclude      *://tv.sohu.com/v/*
// @exclude      *://*.bilibili.com/video/*
// @exclude      *://*.bilibili.com/bangumi/play/*
// @exclude      *://*.baofeng.com/play/*
// @exclude      *://vip.pptv.com/show/*
// @exclude      *://v.pptv.com/show/*
// @exclude      *://www.le.com/ptv/vplay/*
// @exclude      *://www.wasu.cn/Play/show/*
// @exclude      *://m.v.qq.com/*
// @exclude      *://m.iqiyi.com/*
// @exclude      *://m.youku.com/alipay_video/*
// @exclude      *://m.mgtv.com/b/*
// @exclude      *://m.tv.sohu.com/v/*
// @exclude      *://m.film.sohu.com/album/*
// @exclude      *://m.le.com/ptv/vplay/*
// @exclude      *://m.pptv.com/show/*
// @exclude      *://m.acfun.cn/v/*
// @exclude      *://m.bilibili.com/video/*
// @exclude      *://m.bilibili.com/anime/*
// @exclude      *://m.bilibili.com/bangumi/play/*
// @exclude      *://m.wasu.cn/Play/show/*
// @exclude      *://www.youtube.com
// @exclude      *://www.youtube.com/*
// @exclude      *://twitter.com/*
// @exclude      *://www.youtube.com/watch*
// @exclude      *://baike.baidu.com/*
// @exclude      *://*.instagram.com/*
// @exclude      *://order.jd.com/*
// @exclude      *://pagetual.hoothin.com/*
// @exclude      *://wenku.baidu.com/view/*
// @exclude      *://pan.baidu.com/*
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

    if (window.name === 'pagetual-iframe' || (window.frameElement && window.frameElement.name === 'pagetual-iframe')) {
        var domloaded = function (){
            window.scroll(window.scrollX, 999999);
            window.parent.postMessage('pagetual-iframe:DOMLoaded', '*');
        };
        if(window.opera){
            document.addEventListener('DOMContentLoaded', domloaded, false);
        } else {
            domloaded();
        }
        if (getComputedStyle(document.documentElement).display == 'none') document.documentElement.style.display = 'block';
        if (getComputedStyle(document.body).display == 'none') document.body.style.display = 'block';
        return;
    }

    if(window.top != window.self){
        try{
            if (top.location.hostname != window.location.hostname || window.top != window.parent) {
                return;
            }
        }catch(e){
            return;
        }
    }

    const noRuleTest = false;
    const lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    let config={};
    switch (lang){
        case "zh-CN":
        case "zh-SG":
            config = {
                enableDebug:"调试模式，输出信息至控制台",
                disable:"暂时禁用",
                disableSite:"切换禁用状态",
                disableSiteTips:"已在此站禁用",
                enableSiteTips:"已在此站启用",
                enable:"启用翻页",
                toTop:"回到顶部",
                toBottom:"前往页尾",
                current:"当前页",
                forceIframe:"强制拼接",
                cancelForceIframe:"取消强制拼接",
                configure:"打开配置页面",
                firstUpdate:"点击此处初始化规则",
                update:"更新规则",
                click2update:"点击立即更新规则",
                loadNow:"立即翻页",
                loadConfirm:"要翻几页？（0为不间断）",
                noNext:"没有找到下一页，请新建规则",
                passSec:"更新于 #t# 秒前",
                passMin:"更新于 #t# 分钟前",
                passHour:"更新于 #t# 小时前",
                passDay:"更新于 #t# 天前",
                cantDel:"无法删除内置规则",
                confirmDel:"是否确认要删除此规则？",
                updateSucc:"更新成功",
                beginUpdate:"正在更新，请耐心等待，不要关闭页面",
                customUrls:"导入 Pagetual 或 AutoPagerize 规则 url，一行一条",
                customRules:"输入【东方永页机】格式的自定义规则",
                save:"保存设置",
                loadingText:"少女祈祷中...",
                opacity:"不透明值",
                opacityPlaceholder:"0: 隐藏分隔条",
                hideBar:"隐藏分页隔条",
                hideBarButNoStop:"隐藏但不停止",
                dbClick2Stop:"空白处双击暂停翻页",
                sortTitle:"排序在下次更新规则后生效",
                autoRun:"自动启用，否则为白名单模式",
                autoLoadNum:"自动加载指定页数",
                inputPageNum:"输入页码跳转",
                enableHistory:"翻页后写入历史记录",
                enableHistoryAfterInsert:"拼接后立即写入历史记录，否则浏览完毕后再行写入",
                initRun:"打开页面后立即尝试翻页，否则滚动至页尾再翻页",
                preload:"翻页前预读下一页，加速浏览",
                click2ImportRule:"点击下方添加特殊规则库，并静待更新成功：",
                forceAllBody:"是否拼接整个页面？",
                openInNewTab:"使拼接页面的内容在新页面打开",
                importSucc:"导入成功",
                import:"导入",
                editCurrent:"编辑此站规则",
                editBlacklist:"编辑黑名单网址，一行一条，支持? *通配符",
                upBtnImg:"回到页首图标",
                downBtnImg:"前往页尾图标",
                loadingTextTitle:"加载中文字",
                dbClick2StopCtrl:"Ctrl 键",
                dbClick2StopAlt:"Alt 键",
                dbClick2StopShift:"Shift 键",
                dbClick2StopMeta:"Meta 键",
                dbClick2StopKey:"快捷键",
                pageElementCss:"页面主体框架的样式",
                customCss:"自定义 CSS",
                firstAlert:"你还未导入规则库，请选择合适的规则库导入哦",
                picker:"东方永页机主体元素抓取器",
                closePicker:"关闭东方永页机抓取器",
                pickerPlaceholder:"没想法建议留空",
                pickerCheck:"检查你编辑的选择器并复制",
                switchSelector:"点击切换元素",
                gotoEdit:"使用当前的选择器前往编辑规则",
                manualMode:"禁用拼接，手动用右方向键翻页，可使用 Alt + 左方向键返回",
                clickMode:"禁用拼接，滚动至页尾时自动点击下一页",
                pageBarMenu:"点击分隔条中间弹出菜单",
                nextSwitch:"切换其他页码",
                arrowToScroll:"左方向键滚动至上一页，右方向键滚动至下一页",
                hideLoadingIcon:"隐藏加载动画",
                duplicate:"检测到永页机重复安装，请删除其他脚本管理器中的永页机!",
                forceStateIframe:"以 iframe 嵌入整页",
                forceStateDynamic:"通过 iframe 加载动态内容后取出",
                forceStateDisable:"在此站禁用"
            };
            break;
        case "zh-TW":
        case "zh-HK":
            config = {
                enableDebug:"調試模式，輸出信息至控制台",
                disable:"暫時禁用",
                disableSite:"切換禁用狀態",
                disableSiteTips:"已在此站禁用",
                enableSiteTips:"已在此站啟用",
                enable:"啟用翻頁",
                toTop:"回到頂部",
                toBottom:"前往頁尾",
                current:"當前頁",
                forceIframe:"強制拼接",
                cancelForceIframe:"取消强制拼接",
                configure:"打開配置頁面",
                firstUpdate:"點擊此處初始化規則",
                update:"更新規則",
                click2update:"點擊立即更新規則",
                loadNow:"立即翻頁",
                loadConfirm:"要翻几頁？（0為不間斷）",
                noNext:"沒有找到下一頁，請新建規則",
                passSec:"更新于 #t# 秒前",
                passMin:"更新于 #t# 分鐘前",
                passHour:"更新于 #t# 小時前",
                passDay:"更新于 #t# 天前",
                cantDel:"無法刪除内置規則",
                confirmDel:"是否確認要刪除此規則？",
                updateSucc:"更新成功",
                beginUpdate:"正在更新，請稍候",
                customUrls:"導入 Pagetual 或 AutoPagerize 規則 url，一行一條",
                customRules:"輸入【東方永頁機】格式的自定義規則",
                save:"存儲設置",
                loadingText:"少女祈禱中...",
                opacity:"不透明值",
                opacityPlaceholder:"0: 隱藏分隔條",
                hideBar:"隱藏分頁隔條",
                hideBarButNoStop:"隱藏但不停止",
                dbClick2Stop:"空白處雙擊暫停翻頁",
                sortTitle:"排序在下次更新規則後生效",
                autoRun:"自動啓用，否則為白名單模式",
                autoLoadNum:"自動加載指定頁數",
                inputPageNum:"輸入頁碼跳轉",
                enableHistory:"翻頁后寫入歷史記錄",
                enableHistoryAfterInsert:"拼接後立即寫入歷史記錄，否則瀏覽完畢後再行寫入",
                initRun:"打開頁面后立即嘗試翻頁，否則滾動至頁尾再翻頁",
                preload:"翻頁前預讀下一頁，加速瀏覽",
                click2ImportRule:"點擊下方添加特殊規則庫，并靜待更新成功：",
                forceAllBody:"是否拼接整個頁面？",
                openInNewTab:"使拼接頁面的内容在新頁面打開",
                importSucc:"導入成功",
                import:"導入",
                editCurrent:"編輯此站規則",
                editBlacklist:"編輯黑名單網址，一行一條，支持? *通配符",
                upBtnImg:"回到頁首圖標",
                downBtnImg:"前往頁尾圖標",
                loadingTextTitle:"加載中文字",
                dbClick2StopCtrl:"Ctrl 鍵",
                dbClick2StopAlt:"Alt 鍵",
                dbClick2StopShift:"Shift 鍵",
                dbClick2StopMeta:"Meta 鍵",
                dbClick2StopKey:"快捷鍵",
                pageElementCss:"頁面主體框架的樣式",
                customCss:"自定義 CSS",
                firstAlert:"你還未導入規則庫，請選擇合適的規則庫導入哦",
                picker:"東方永頁機主體元素抓取器",
                closePicker:"關閉東方永頁機抓取器",
                pickerPlaceholder:"沒想法建議留空",
                pickerCheck:"檢查你編輯的選擇器並複製",
                switchSelector:"點擊切換元素",
                gotoEdit:"使用當前的選擇器前往編輯規則",
                manualMode:"禁用拼接，手動用右方向鍵翻頁",
                clickMode:"禁用拼接，滾動至頁尾時自動點擊下一頁",
                pageBarMenu:"點擊分隔條中間彈出菜單",
                nextSwitch:"切換其他頁碼",
                arrowToScroll:"左方向鍵滾動至上一頁，右方向鍵滾動至下一頁",
                hideLoadingIcon:"隱藏加載動畫",
                duplicate:"檢測到永頁機重複安裝，請刪除其他腳本管理器中的永頁機!",
                forceStateIframe:"以 iframe 嵌入整頁",
                forceStateDynamic:"通過 iframe 加載動態內容後取出",
                forceStateDisable:"在此站禁用"
            };
            break;
        case "ja":
            config = {
                enableDebug:"デバッグモード",
                disable: "一時的に無効にする",
                disableSite:"無効状態の切り替え",
                disableSiteTips:"このサイトで既に無効になっています",
                enableSiteTips:"このサイトで既に有効になっています",
                enable: "ページめくりを有効にする",
                toTop: "トップに戻る",
                toBottom: "ページの下部に移動",
                current: "現在のページ",
                forceIframe: "強制ステッチ",
                cancelForceIframe: "強制ステッチをキャンセル",
                configure: "設定ページを開く",
                firstUpdate:"ここをクリックしてルールを初期化します",
                update: "更新ルール",
                click2update:"今すぐルールを更新してください",
                loadNow:"今すぐページをめくる",
                loadConfirm:"数ページめくりたいですか？（0は途切れない）",
                noNext:"次のページが見つかりません、新しいルールを作成してください",
                passSec: "#t#秒前に更新",
                passMin: "#t#分前に更新",
                passHour: "#t#時間前に更新",
                passDay: "#t#日前に更新",
                cantDel: "組み込みルールを削除できません",
                confirmDel: "このルールを削除してもよろしいですか？",
                updateSucc: "更新に成功しました",
                beginUpdate: "更新中、お待ちください",
                customUrls: "インポートルールのURL、1行に1つ",
                customRules: "【東方永頁機】の形式でカスタムルールを入力してください",
                save: "設定を保存",
                loadingText: "少女祈祷中...",
                opacity:"不透明値",
                opacityPlaceholder:"0: 隠す",
                hideBar:"ページ区切り文字を非表示にします",
                hideBarButNoStop:"非表示にするが停止しない",
                dbClick2Stop:"空白部分をダブルクリックしてページめくりを一時停止します",
                sortTitle:"並べ替えは、次のルールの更新後に有効になります",
                autoRun:"自動的に有効",
                autoLoadNum:"指定したページ数を自動的に読み込みます",
                inputPageNum:"ジャンプするページ番号を入力",
                enableHistory:"ページめくり後の履歴を書く",
                enableHistoryAfterInsert: "スプライシングの直後に履歴レコードを書き込みます。それ以外の場合は、閲覧後に書き込みます",
                initRun:"Webページを開いた直後にページをめくる",
                preload:"事前に次のページを読む",
                click2ImportRule:"以下をクリックして、ルールベースを追加します：",
                forceAllBody:"フルページ埋め込み？",
                openInNewTab:"スプライスされたページのコンテンツを新しいページで開きます",
                importSucc:"インポート完了",
                import:"インポート",
                editCurrent:"現在のルールの編集",
                editBlacklist:"ブラックリストのURLを編集し、1行ずつ、サポート? *ワイルドカード",
                upBtnImg:"トップアイコンに戻る",
                downBtnImg:"フッターアイコンに移動",
                loadingTextTitle:"テキストをロード",
                dbClick2StopCtrl:"Ctrlキー",
                dbClick2StopAlt:"Altキー",
                dbClick2StopShift:"Shiftキー",
                dbClick2StopMeta:"Metaキー",
                dbClick2StopKey:"Shortcutキー",
                pageElementCss:"ページ本文フレームの STYLE",
                customCss:"カスタム CSS",
                firstAlert:"ルールベースをインポートしていないため、インポートする適切なルールベースを選択してください",
                picker:"Pagetualページ要素ピッカー",
                closePicker:"Pagetualピッカーを閉じる",
                pickerPlaceholder:"わからない場合は空のままにしてください",
                pickerCheck:"セレクターをチェックしてコピー",
                switchSelector:"クリックして要素を切り替えます",
                gotoEdit:"現在のセレクターでルールを編集する",
                manualMode:"スプライシングを無効にします。手動で右の矢印キーを使用してページをめくります",
                clickMode: "スティッチングを無効にします。ページの最後までスクロールすると、次のページが自動的にクリックされます",
                pageBarMenu:"ページバーの中央をクリックしてメニューをポップアップ表示",
                nextSwitch:"次のページに切り替え",
                arrowToScroll:"左矢印キーで前へ、右矢印キーで次へ",
                hideLoadingIcon:"読み込み中のアニメーションを隠す",
                duplicate: "Pagetual の重複インストールが検出されました。他のスクリプト マネージャで永続的なページ マシンを削除してください!",
                forceStateIframe: "iframe にページ全体を埋め込む",
                forceStateDynamic: "iframe 経由で動的コンテンツを読み込む",
                forceStateDisable: "このステーションでのページめくりを無効にする"
            };
            break;
        case "ru":
        case "ru-RU":
            config = {
                enableDebug:"Включить отладку",
                disable:"Отключить",
                disableSite:"Переключить состояние отключения",
                disableSiteTips:"Отключено на этом сайте",
                enableSiteTips:"Включено на этом сайте",
                enable:"Включить",
                toTop:"В начало",
                toBottom:"В конец",
                current:"Текущая страница",
                forceIframe:"Принудительно присоединить следующую страницу",
                cancelForceIframe:"Отменить принудительное присоединение",
                configure:"Настроить",
                firstUpdate:"Нажмите здесь, чтобы инициализировать правила",
                update:"Обновить правила онлайн",
                click2update:"Нажмите, чтобы обновить правила по URL сейчас",
                loadNow:"Загрузить следующую страницу сейчас",
                loadConfirm:"Сколько страниц вы хотите загрузить? (0 означает бесконечность)",
                noNext:"Ссылка на следующую страницу не найдена, пожалуйста, создайте новое правило",
                passSec:"Обновлено #t# секунд назад",
                passMin:"Обновлено #t# минут назад",
                passHour:"Обновлено #t# часов назад",
                passDay:"Обновлено #t# дней назад",
                cantDel:"Невозможно удалить встроенные правила",
                confirmDel:"Вы уверены, что хотите удалить это правило?",
                updateSucc:"Обновление прошло успешно",
                beginUpdate:"Обновление начато, подождите минуту, пожалуйста",
                customUrls:"Импортировать URL-адрес правила Пэйджтуал или AutoPagerize по одному URL на строку",
                customRules:"Введите пользовательские правила с форматом [Pagetual]",
                save:"Сохранить",
                loadingText:"Shojo загружается...",
                opacity:"Непрозрачность",
                opacityPlaceholder:"0: скрыть",
                hideBar:"скрыть промежуток переключения страниц",
                hideBarButNoStop:"Скрыть, но не остановить",
                dbClick2Stop:"Двойной щелчок по пустому пространству для паузы",
                sortTitle:"Сортировка вступает в силу после следующего обновления правила",
                autoRun:"Автозапуск (режим черного списка)",
                autoLoadNum:"Количество для предварительной загрузки страниц",
                inputPageNum:"Введите номер страницы для перехода",
                enableHistory:"Записать историю после переключения страниц",
                enableHistoryAfterInsert: "Записать запись истории сразу после сплайсинга, в противном случае запишите после просмотра",
                initRun:"Переключать страницы сразу после открытия",
                preload:"Предварительная загрузка следующей страницы для ускорения",
                click2ImportRule:"Нажмите, чтобы импортировать ссылку базовых правил, затем дождитесь завершения обновления:",
                forceAllBody:"Присоединить полное тело страницы?",
                openInNewTab:"Открыть дополнительные URL-адреса в новой вкладке",
                importSucc:"Импорт завершен",
                import:"Импорт",
                editCurrent:"Редактировать правило для текущего",
                editBlacklist:"Редактировать URL-адреса черного списка, по одной строке, поддержка ? * для подстановочного знака",
                upBtnImg:"Иконка возврата к началу",
                downBtnImg:"Иконка перехода в нижний колонтитул",
                loadingTextTitle:"Текст загрузки",
                dbClick2StopCtrl:"Клавиша Ctrl",
                dbClick2StopAlt:"Клавиша Alt",
                dbClick2StopShift:"Клавиша Shift",
                dbClick2StopMeta:"Клавиша Meta",
                dbClick2StopKey:"Клавиша быстрого доступа",
                pageElementCss:"Пользовательский стиль для основных элементов страницы",
                customCss:"Полный пользовательский CSS",
                firstAlert:"Вы не импортировали базовое правило, пожалуйста, выберите соответствующее правило для импорта",
                picker:"Выбор элемента страницы Пэйджтуал",
                closePicker:"Закрыть выбор Пэйджтуал",
                pickerPlaceholder:"Оставьте пустым, если вы не знаете",
                pickerCheck:"Проверить селектор и скопируй",
                switchSelector:"нажмите для переключения элемента",
                gotoEdit:"Перейти к редактированию правила с текущим селектором",
                manualMode:"Отключить автоматическую перелистывание страниц, перелистывать страницы вручную с помощью стрелок справа (или вызвать событие 'pagetual.next')",
                clickMode: "Отключить сшивание, автоматически переходить на следующую страницу при прокрутке до конца",
                pageBarMenu:"Щелкните середину панели страниц, чтобы открыть меню.",
                nextSwitch:"Переключить ссылку на следующую страницу",
                arrowToScroll:"Нажмите клавишу со стрелкой влево для предыдущего и клавишу со стрелкой вправо для следующего",
                hideLoadingIcon:"Скрыть анимацию загрузки",
                duplicate: "Обнаружена двойная установка Pagetual, пожалуйста, удалите постоянную страничную машину в других менеджерах скриптов!",
                forceStateIframe: "Вставить полную страницу как iframe",
                forceStateDynamic:"Загружать динамический контент через iframe",
                forceStateDisable: "Отключить перелистывание страниц на этой станции"
            };
            break;
        default:
            config = {
                enableDebug:"Enable debug output",
                disable:"Disable",
                disableSite:"Toggle disabled state",
                disableSiteTips:"Disabled on this site",
                enableSiteTips:"Enabled on this site",
                enable:"Enable",
                toTop:"To Top",
                toBottom:"To Bottom",
                current:"Current Page",
                forceIframe:"Force to join next page",
                cancelForceIframe:"Cancel Force join",
                configure:"Configure",
                firstUpdate:"Click here to initialize the rules",
                update:"Update online rules",
                click2update:"Click to update rules from url now",
                loadNow:"Load next page manually",
                loadConfirm:"How much pages do you want to load? (0 means infinite)",
                noNext:"No next link found, please create a new rule",
                passSec:"Updated #t# seconds ago",
                passMin:"Updated #t# minutes ago",
                passHour:"Updated #t# hours ago",
                passDay:"Updated #t# days ago",
                cantDel:"Can't delete buildin rules",
                confirmDel:"Are you sure you want to delete this rule?",
                updateSucc:"Update succeeded",
                beginUpdate:"Begin update, wait a minute please",
                customUrls:"Import Pagetual or AutoPagerize rule url, One url per line",
                customRules:"Input custom rules with [Pagetual] format",
                save:"Save",
                loadingText:"Shojo Now Loading...",
                opacity:"Opacity",
                opacityPlaceholder:"0: hide",
                hideBar:"Hide the paging spacer",
                hideBarButNoStop:"Hide but not stop",
                dbClick2Stop:"Double-click on the blank space to pause",
                sortTitle:"Sorting takes effect after the next rule update",
                autoRun:"Auto run (black list mode)",
                autoLoadNum:"Amount for preload pages",
                inputPageNum:"Enter page number to jump",
                enableHistory:"Write history after page turning",
                enableHistoryAfterInsert: "Write history immediately after splicing, otherwise write after browsing",
                initRun:"Turn pages immediately after opening",
                preload:"Preload next page for speeding up",
                click2ImportRule:"Click to import base rules link, then wait until the update is complete:",
                forceAllBody:"Join full body of page?",
                openInNewTab:"Open urls of additions in new tab",
                importSucc:"Import completed",
                import:"Import",
                editCurrent:"Edit rule for current",
                editBlacklist:"Edit the blacklist urls, line by line, Support ? * for wildcard",
                upBtnImg:"Icon of back to top",
                downBtnImg:"Icon of go to footer",
                loadingTextTitle:"Loading text",
                dbClick2StopCtrl:"Ctrl key",
                dbClick2StopAlt:"Alt key",
                dbClick2StopShift:"Shift key",
                dbClick2StopMeta:"Meta key",
                dbClick2StopKey:"Shortcut key",
                pageElementCss:"Custom style for main page elements",
                customCss:"Custom complete css",
                firstAlert:"You have not imported the base rule, please select the appropriate rule to import",
                picker:"Pagetual page element picker",
                closePicker:"Close Pagetual picker",
                pickerPlaceholder:"Leave empty if you have no idea",
                pickerCheck:"Check selector and copy",
                switchSelector:"Click to switch element",
                gotoEdit:"Go to edit rule with current selector",
                manualMode:"Disable splicing, manually turn pages with the right arrow keys (or dispatch event 'pagetual.next')",
                clickMode: "Disable splicing, automatically click the next page when scrolling to the end of the page",
                pageBarMenu:"Click the middle of the page bar to open the menu",
                nextSwitch:"Switch next link",
                arrowToScroll:"Press left arrow key to scroll prev and right arrow key to scroll next",
                hideLoadingIcon:"Hide loading animation",
                duplicate:"Duplicate Pagetual have been installed, check your script manager!",
                forceStateIframe: "Embed full page as iframe",
                forceStateDynamic: "Load dynamic content via iframe",
                forceStateDisable: "Disable page turning on this site"
            };
            break;
    }
    var enableDebug=true;
    function i18n(name, param) {
        return config[name]?config[name].replace("#t#",param):name;
    };

    function debug(str, title) {
        if(enableDebug){
            console.log(
                `%c【Pagetual v.${_GM_info.script.version}】 ${title ? title : 'debug'}:`,
                'color: yellow;font-size: large;font-weight: bold;background-color: darkblue;',
                str
            );
        }
    };

    var _GM_xmlhttpRequest,_GM_registerMenuCommand,_GM_notification,_GM_addStyle,_GM_openInTab,_GM_info,_GM_setClipboard;
    if(typeof GM_xmlhttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM_xmlhttpRequest;
    }else if(typeof GM!='undefined' && typeof GM.xmlHttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM.xmlHttpRequest;
    }else{
        _GM_xmlhttpRequest=(f)=>{fetch(f.url).then(response=>response.text()).then(data=>{let res={response:data};f.onload(res)}).catch(e => f.onerror(e))};
    }
    if(typeof GM_registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM_registerMenuCommand;
    }else if(typeof GM!='undefined' && typeof GM.registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM.registerMenuCommand;
    }else{
        _GM_registerMenuCommand=(s,f)=>{};
    }
    if(typeof GM_info!='undefined'){
        _GM_info=GM_info;
    }else if(typeof GM!='undefined' && typeof GM.info!='undefined'){
        _GM_info=GM.info;
    }else{
        _GM_info={script:1};
    }
    if(typeof GM_notification!='undefined'){
        _GM_notification=GM_notification;
    }else if(typeof GM!='undefined' && typeof GM.notification!='undefined'){
        _GM_notification=GM.notification;
    }else{
        _GM_notification=(s)=>{showTips(s)};
    }
    if(typeof GM_openInTab!='undefined'){
        _GM_openInTab=GM_openInTab;
    }else if(typeof GM!='undefined' && typeof GM.openInTab!='undefined'){
        _GM_openInTab=GM.openInTab;
    }else{
        _GM_openInTab=(s,t)=>{window.open(s)};
    }
    if(typeof GM_addStyle!='undefined'){
        _GM_addStyle=GM_addStyle;
    }else if(typeof GM!='undefined' && typeof GM.addStyle!='undefined'){
        _GM_addStyle=GM.addStyle;
    }else{
        _GM_addStyle=cssStr=>{
            let styleEle=document.createElement("style");
            styleEle.innerHTML=cssStr;
            document.head.appendChild(styleEle);
            return styleEle;
        };
    }
    if (typeof GM_setClipboard != 'undefined') {
        _GM_setClipboard = GM_setClipboard;
    } else if (typeof GM != 'undefined' && typeof GM.setClipboard != 'undefined') {
        _GM_setClipboard = GM.setClipboard;
    } else {
        _GM_setClipboard = (s, i) => {};
    }
    var _unsafeWindow=(typeof unsafeWindow=='undefined')?window:unsafeWindow;//兼容 ios userscripts 的寫法
    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',
        supportGMPromise: typeof GM!='undefined' && typeof GM.getValue=='function' && typeof GM.getValue('a','b')!='undefined',
        mxAppStorage:(function(){
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            }
        })(),
        operaUJSStorage:(function(){
            try{
                return window.opera.scriptStorage;
            }catch(e){
            }
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
                if(value==="" && typeof GM_deleteValue!='undefined'){
                    GM_deleteValue(key);
                }
            }else if(this.supportGMPromise){
                GM.setValue(key,value);
                if(value==="" && typeof GM!='undefined' && typeof GM.deleteValue!='undefined'){
                    GM.deleteValue(key);
                }
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            }
        },
        getItem:function(key,cb){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(this.supportGMPromise){
                value=GM.getValue(key).then(v=>{cb(v)});
                return;
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            cb(value);
        }
    };
    var rulesData={},ruleUrls,updateDate;
    const configPage=["https://github.com/hoothin/UserScripts/tree/master/Pagetual",
                     "https://hoothin.github.io/UserScripts/Pagetual/"];
    const guidePage=/^https?:\/\/.*\/PagetualGuide\/.*rule\.html/;
    const ruleImportUrlReg=/greasyfork\.org\/.*scripts\/438684[^\/]*(\/discussions|\/?$)|github\.com\/hoothin\/UserScripts\/(tree\/master\/Pagetual|issues\/)/i;
    const allOfBody="body>*";
    _GM_registerMenuCommand(i18n("configure"), ()=>{
        _GM_openInTab(configPage[0],{active:true});
    });
    _GM_registerMenuCommand(i18n("editCurrent"), ()=>{
        Picker.getInstance().start();
    });

    function getElementByXpath(xpath, contextNode, doc){
        doc = doc || document;
        contextNode = contextNode || doc;
        try {
            var result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
        } catch (err) {
            debug(`Invalid xpath: ${xpath}`);
        }
        return null;
    }

    function getAllElementsByXpath(xpath, contextNode, doc){
        doc = doc || document;
        contextNode = contextNode || doc;
        var result = [];
        try {
            var query = doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < query.snapshotLength; i++) {
                var node = query.snapshotItem(i);
                if (node.nodeType === 1) result.push(node);
            }
        } catch (err) {
            debug(`Invalid xpath: ${xpath}`);
        }
        return result;
    }

    function isXPath(xpath) {
        if (!xpath) return false;
        return /^\(*(descendant::|\.\/|\/\/|id\()/.test(xpath);
    }

    function getAllElements(sel, doc) {
        try {
            if (!isXPath(sel)) {
                return doc.querySelectorAll(sel);
            }
        } catch(e) {
            debug(e, 'Error selector');
        }
        return getAllElementsByXpath(sel, doc, doc);
    }

    function getElement(sel, doc) {
        try {
            if (!isXPath(sel)) {
                return doc.querySelector(sel);
            }
        } catch(e) {
            debug(e, 'Error selector');
        }
        return getElementByXpath(sel, doc, doc);
    }

    function geneSelector(ele, addID){
        let selector=ele.tagName.toLowerCase();
        //Google id class都是隨機。百度更過分，style script順序都是隨機的
        if(ele.tagName!="HTML" && ele.tagName!="BODY"){
            if (addID && ele.id) selector += '#' + ele.id;
            let className = "";
            if (ele.className) {
                let classList = ele.classList, i = 0;
                for (let i = 0; i < classList.length; i++) {
                    let c = classList[i];
                    if (/^[\w-_]+$/.test(c) && !/\d{3,}/.test(c)) {
                        className += '.' + c;
                    }
                }
                selector += className;
            }
            let parent = ele.parentElement;
            if (parent) {
                selector = geneSelector(parent, addID) + ' > ' + selector;
                if(!className && (!ele.id || !addID) && parent.children.length>1){
                    let i,j=0;
                    for(i=0;i<parent.children.length;i++){
                        if(parent.children[i].tagName==ele.tagName){
                            j++;
                            if(parent.children[i]==ele){
                                break;
                            }
                        }
                    }
                    selector += (parent.tagName=="HTML"?"":`:nth-of-type(${j})`);
                }
            }
        }
        return selector;
    }

    function createXPathFromElement(elm) {
        let allNodes = document.getElementsByTagName('*'), segs;
        for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
            if (elm.hasAttribute('id')) {
                var uniqueIdCount = 0;
                for (var n=0;n < allNodes.length;n++) {
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                    if (uniqueIdCount > 1) break;
                }
                if ( uniqueIdCount == 1) {
                    segs.unshift('id("' + elm.getAttribute('id') + '")');
                    return segs.join('/');
                } else {
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                }
            } else if (elm.hasAttribute('class')) {
                segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
            } else {
                let i, sib;
                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName == elm.localName) i++;
                }
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
            }
        }
        return segs.length ? '/' + segs.join('/') : null;
    }

    var escapeHTMLPolicy;
    if (_unsafeWindow.trustedTypes && _unsafeWindow.trustedTypes.createPolicy) {
        escapeHTMLPolicy = _unsafeWindow.trustedTypes.createPolicy('default', {
            createHTML: (string, sink) => string
        });
    }

    function createHTML(html){
        return escapeHTMLPolicy?escapeHTMLPolicy.createHTML(html):html;
    }

    class RuleParser {
        constructor() {
            this.hpRules = [];
            this.smartRules = [];
            this.customRules = [];
            this.rules = [];
            this.pageDoc = document;
            this.nextLinkHref = null;
            this.nextTitle = "";
            this.oldUrl = "";
            this.curUrl = location.href;
            this.curSiteRule = {};
            this.initGetPage = true;
        }

        initSavedRules(callback) {
            var self = this;
            storage.getItem("smartRules", smartRules => {
                if (smartRules) self.smartRules = smartRules;
                storage.getItem("hpRules", hpRules => {
                    if (hpRules) self.hpRules = hpRules;
                    storage.getItem("customRules", customRules => {
                        if (customRules) self.customRules = customRules;
                        storage.getItem("rules", rules => {
                            if (rules) self.rules = rules;
                            callback();
                        });
                    });
                });
            });
        }

        saveCurSiteRule(){
            /*if(!this.curSiteRule || !this.curSiteRule.url || this.curSiteRule.singleUrl || this.curSiteRule.url.length<13)return;
            this.hpRules=this.hpRules.filter(item=>{return item&&item.url!=this.curSiteRule.url});
            this.hpRules.unshift(this.curSiteRule);
            if(this.hpRules.length>30){
                this.hpRules.pop();
            }
            storage.setItem("hpRules", this.hpRules);*/
        }

        requestJSON(url, callback){
            _GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                timeout: 20000,
                onload: function(res) {
                    let json=null;
                    try{
                        json=JSON.parse(res.response||res.responseText);
                    }catch(e){
                        debug(e, 'Error json');
                    }
                    callback(json);
                },
                onerror: function(e) {
                    callback(null, e);
                },
                ontimeout: function(e) {
                    callback(null, e);
                }
            });
        }

        formatRule(item, from){
            if(item.data && item.data.url){
                let result = {
                    name:item.name,
                    from:from,
                    action:item.data.forceIframe=="true"?1:0,
                    url:item.data.url,
                    pageElement:item.data.pageElement,
                    nextLink:item.data.nextLink,
                    insert:item.data.insertBefore||undefined,
                    updatedAt:item.updated_at
                };
                let _css = (item.data.Stylus || '') + (item.data.CSS || '');
                if (_css) result.css = _css;
                if (item.data.bookmarklet) result.pageAction = item.data.bookmarklet;
                return result;
            }else{
                item.from=from;
                return item;
            }
            return null;
        }

        addRuleByUrl(url, from, callback) {
            if(url.indexOf("?")==-1){
                url=url+"?"+Date.now();
            }else{
                url=url+"&"+Date.now();
            }
            this.requestJSON(url, (json,err)=>{
                if(!json){
                    debug(err, "Update "+url+" rules fail!");
                }
                this.addRules(json, from);
                callback(json, err);
            });
        }

        addRules(rules, from) {
            if(rules && rules.length>0){
                this.rules=this.rules.filter(item=>{return item.from!=from});
                rules.forEach(item=>{
                    let rule=this.formatRule(item, from);
                    if(rule){
                        this.rules.unshift(rule);
                    }
                });
            }
        }

        ruleMatch(r) {
            let findIndex = 0;
            if (r.nextLink && r.nextLink != "0" && r.nextLink != 0) {
                let nextLinkSel = r.nextLink, nextLink;
                if (Array && Array.isArray && Array.isArray(nextLinkSel)) {
                    nextLink = !nextLinkSel.every((sel, i) => {
                        let ele = getElement(sel, document);
                        if (ele) findIndex = i;
                        return !ele;
                    });
                } else nextLink = getElement(nextLinkSel, document);
                if (!nextLink) return false;
            }
            if (r.pageElement) {
                let pageElementSel = r.pageElement, pageElement;
                if (Array && Array.isArray && Array.isArray(pageElementSel)) {
                    pageElementSel = pageElementSel[findIndex];
                }
                pageElement = getElement(pageElementSel, document);
                if (!pageElement) return false;
            }
            if (r.insert) {
                let insertSel = r.insert, insert;
                if (Array && Array.isArray && Array.isArray(insertSel)) {
                    insertSel = insertSel[findIndex];
                }
                insert = getElement(insertSel, document);
                if (!insert) return false;
            }
            //if (findIndex !== 0) nextIndex = findIndex;
            return true;
        }

        scrollToShow(sel, doc) {
            let exclude = getElement(sel, doc);
            if (exclude) {
                var actualTop = exclude.offsetTop;
                var current = exclude.offsetParent;
                while(current !== null){
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                doc.body.scrollTop = 0;
                doc.documentElement.scrollTop = 0;
                setTimeout(() => {
                    doc.body.scrollTop = actualTop;
                    doc.documentElement.scrollTop = actualTop;
                }, 1);
                setTimeout(() => {
                    doc.body.scrollTop = actualTop + 10;
                    doc.documentElement.scrollTop = actualTop + 10;
                }, 2);
                setTimeout(() => {
                    doc.body.scrollTop = actualTop + 50;
                    doc.documentElement.scrollTop = actualTop + 50;
                }, 3);
                setTimeout(() => {
                    doc.body.scrollTop = actualTop + 200;
                    doc.documentElement.scrollTop = actualTop + 200;
                }, 4);
                return false;
            }
            return true;
        }

        waitElement(doc, selArr) {
            if (!selArr) selArr = this.curSiteRule.waitElement;
            if (selArr[0].trim()) {
                let include = getElement(selArr[0], doc);
                if (!include) {
                    if (selArr.length == 2 && selArr[1].trim()) {
                        this.scrollToShow(selArr[1], doc);
                    }
                    return false;
                }
            }
            if (doc === document) return true;
            if (selArr.length == 2 && selArr[1].trim()) {
                if (!this.scrollToShow(selArr[1], doc)) {
                    return false;
                }
            }
            return true;
        }

        getRule(callback) {
            if(noRuleTest){
                this.curSiteRule={};
                this.curSiteRule.url=location.origin+location.pathname;
                this.curSiteRule.singleUrl=true;
                callback();
                return;
            }
            if(this.curSiteRule && this.curSiteRule.url){
                return this.curSiteRule;
            }
            var self=this;

            function setRule(r) {
                self.curSiteRule=r;
                if (!r.singleUrl) {
                    debug(r, 'Match rule');
                }
                callback();
            }

            function checkRule(r) {
                if (r.from == 1 && r.url.length <= 13) return false;
                let urlReg=new RegExp(r.url, "i");
                if(urlReg.test(location.href)){
                    if(r.include){
                        let include=getElement(r.include, document);
                        if(!include)return false;
                    }
                    if(r.exclude){
                        let exclude=getElement(r.exclude, document);
                        if(exclude)return false;
                    }
                    if(r.waitElement){
                        let waitTime=500;
                        let checkReady=()=>{
                            setTimeout(()=>{
                                if(!self.waitElement(document, r.waitElement)){
                                    checkReady();
                                }else{
                                    setRule(r);
                                }
                            },parseInt(waitTime));
                        };
                        checkReady();
                        return true;
                    }else if(r.wait){
                        let waitTime=500, checkEval, maxCheckTimes=20;
                        if(isNaN(r.wait)){
                            try{
                                checkEval=(typeof _unsafeWindow.pagetualWait=='undefined') ? Function("doc",'"use strict";' + r.wait) : _unsafeWindow.pagetualWait;
                            }catch(e){
                                debug(e, 'Error when checkeval');
                            }
                        }else{
                            waitTime=r.wait;
                        }
                        let checkReady=()=>{
                            if(maxCheckTimes--<=0){
                                debug("Wait for rule ready but failed");
                                setRule(r);
                                return;
                            }
                            setTimeout(()=>{
                                if(!self.ruleMatch(r) || (checkEval && !checkEval(document))){
                                    checkReady();
                                }else{
                                    setRule(r);
                                }
                            },parseInt(waitTime));
                        };
                        checkReady();
                        return true;
                    }
                    if(r.pinUrl){
                        setRule(r);
                        return true;
                    }
                    if(!self.ruleMatch(r)){
                        return false;
                    }
                    setRule(r);
                    return true;
                }
                return false;
            }

            for (let i in this.hpRules) {
                let rule = this.hpRules[i];
                if (!rule || !rule.url) continue;
                if (rule.singleUrl) {
                    continue;
                }
                if (checkRule(rule)) return;
            }
            for (let i in this.customRules) {
                let rule = this.customRules[i];
                if (!rule || !rule.url) continue;
                if (checkRule(rule)) return;
            }
            for (let i in this.smartRules) {
                let rule = this.smartRules[i];
                if (!rule || !rule.url) continue;
                if (rule.singleUrl) {
                    if (location.origin + location.pathname == rule.url) {
                        setRule(rule);
                        return;
                    }
                    continue;
                }
            }
            let r = 0;
            function searchByTime(){
                setTimeout(()=>{
                    let end=r+50;
                    end=end>self.rules.length?self.rules.length:end;
                    for(;r<end;r++){
                        let rule=self.rules[r];
                        if(checkRule(rule))return;
                    }
                    if(end>=self.rules.length){
                        self.curSiteRule={};
                        self.curSiteRule.url=location.origin+location.pathname;
                        self.curSiteRule.singleUrl=true;
                        callback();
                        return;
                    }else{
                        searchByTime();
                    }
                },1);
            }
            searchByTime();
        }

        replaceElement(doc) {
            if (!doc || doc === document) return;
            let replaceElementSel = this.curSiteRule.replaceElement;
            if (replaceElementSel) {
                if (!Array.isArray(replaceElementSel)) {
                    replaceElementSel = [replaceElementSel];
                }
                replaceElementSel.forEach(sel => {
                    let pageEles = getAllElements(sel, document);
                    let replaceEles = getAllElements(sel, doc);
                    for (let i = 0; i < pageEles.length; i++) {
                        let replaceEle = replaceEles[i];
                        let pageEle = pageEles[i];
                        if (replaceEle) {
                            pageEle.parentNode.replaceChild(replaceEle.cloneNode(true), pageEle);
                        } else break;
                    }
                });
            }
        }

        refreshByClick() {
            let refreshByClickSel = this.curSiteRule.refreshByClick;
            if (refreshByClickSel) {
                document.addEventListener("click", e => {
                    let checkEles = getAllElements(refreshByClickSel, document);
                    for (let i = 0; i < checkEles.length; i++) {
                        if (checkEles[i] === e.target) {
                            urlChanged = true;
                            isPause = true;
                            if (!ruleParser.nextLinkHref) isLoading = false;
                            break;
                        }
                    }
                });
            }
        }

        getPageElement(doc, curWin, dontFind) {
            if(doc==document && this.docPageElement){
                let parent=this.docPageElement;
                while(parent && parent.nodeName!="BODY"){
                    parent=parent.parentNode;
                }
                if(parent && parent.nodeName=="BODY"){
                    return this.docPageElement;
                }
            }
            let pageElement=null;
            let self=this;
            let body=doc.body;
            if(this.curSiteRule.pageElement){
                let pageElementSel=this.curSiteRule.pageElement;
                if(Array && Array.isArray && Array.isArray(pageElementSel)){
                    pageElementSel=pageElementSel[nextIndex<pageElementSel.length?nextIndex:0];
                }
                pageElement=getAllElements(pageElementSel, doc);
            }
            if(pageElement && pageElement.length===1 && pageElement[0].style.display==='none'){
                pageElement=[body];
            }
            if(this.curSiteRule.singleUrl && pageElement && pageElement.length>0 && pageElement[0].tagName=="TR"){
                let mainTr=this.insert.parentNode.querySelector('tr'),mainTdNum=0,newTdNum=0;
                [].forEach.call(mainTr.children, el=>{
                    if(el.tagName=="TD" || el.tagName=="TH"){
                        mainTdNum+=el.colSpan||1;
                    }
                });
                [].forEach.call(pageElement[0].children, el=>{
                    if(el.tagName=="TD" || el.tagName=="TH"){
                        newTdNum+=el.colSpan||1;
                    }
                });
                if(mainTdNum!=newTdNum){
                    this.curSiteRule.pageElement=allOfBody;
                    pageElement=[body];
                    this.getInsert(true);
                }
            }
            if((this.curSiteRule.singleUrl || !this.curSiteRule.pageElement) && (!pageElement || pageElement.length==0) && curWin && !dontFind){
                if(!body)return null;
                let bodyHeight=parseInt(body.offsetHeight || body.scrollHeight);
                let curHeight=bodyHeight;
                let windowHeight=window.innerHeight || document.documentElement.clientHeight;
                let needCheckNext=(doc==document && this.initNext);
                function checkElement(ele){
                    if (ele.tagName == "PRE" || ele.tagName == "CODE") {
                        self.curSiteRule.pageElement = geneSelector(ele.parentNode);
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return [ele.parentNode];
                    }
                    if(ele.childNodes && ele.childNodes.length==1)ele=ele.childNodes[0];
                    if(ele.tagName=="PICTURE"){
                        self.curSiteRule.pageElement=geneSelector(ele.parentNode)+">"+ele.tagName.toLowerCase();
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return [ele];
                    }
                    if(curHeight/bodyHeight<=0.25){
                        self.curSiteRule.pageElement=allOfBody;
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return [body];
                    }
                    if(ele.tagName=="FORM" && ele.parentNode!=document.body){
                        self.curSiteRule.pageElement=geneSelector(ele)+">*";
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return ele.children;
                    }
                    if(ele.children.length==0 && !self.curSiteRule.pageElement){
                        if(ele.parentNode.tagName=="P")ele=ele.parentNode;
                        self.curSiteRule.pageElement=geneSelector(ele.parentNode)+">"+ele.tagName.toLowerCase();
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return [ele];
                    }
                    let i,maxHeight=curHeight*0.55,curMaxEle=null,curMaxArea=0,maxWidth=0;
                    let isHori=true;
                    let offsetTop=ele.children[0].offsetTop;
                    for(i=1;i<ele.children.length;i++){
                        if(ele.children[i].offsetTop!=offsetTop){
                            isHori=false;
                            break;
                        }
                    }
                    let hasSameClass = false;
                    let articleNum = 0;
                    for (i = 0; i < ele.children.length; i++) {
                        let curNode = ele.children[i];
                        if (curNode.tagName == "CANVAS") continue;
                        if (curNode.tagName == "NAV") continue;
                        if (!curNode.offsetParent) continue;
                        if (curNode.tagName != "IMG" && curNode.querySelector('img') == null && /^\s*$/.test(curNode.innerText)) continue;
                        if (needCheckNext && !curNode.contains(self.initNext) && getElementTop(curNode) > windowHeight) {
                            continue;
                        }
                        if (curNode.tagName == "ARTICLE") articleNum++;
                        let comStyle = curWin.getComputedStyle(curNode);
                        let h = parseInt(curNode.offsetHeight || curNode.scrollHeight);
                        let w = parseInt(curNode.scrollWidth);
                        if (isNaN(h) || isNaN(w)) continue;
                        if (isHori && h <= 50) continue;
                        let a = h * w + h, moreChild = curNode.children[0];
                        while (moreChild) {
                            comStyle = curWin.getComputedStyle(moreChild);
                            let ch = parseInt(moreChild.offsetHeight || moreChild.scrollHeight);
                            let cw = parseInt(moreChild.scrollWidth);
                            if (h < ch) h = ch;
                            if (moreChild.innerText != "" && !isNaN(ch) && !isNaN(cw)) {
                                a += ch * cw;
                            }
                            moreChild = moreChild.nextElementSibling;
                        }
                        let isMax = false;
                        if (isHori) {
                            if (maxWidth < w) {
                                isMax = true;
                            } else if (maxWidth < w + 300 && curMaxArea < a) {
                                isMax = true;
                            }
                        } else {
                            isMax = curMaxArea < a;
                        }
                        if (curMaxEle == null || isMax) {
                            if (h > 0 || !isHori) curHeight = h;
                            curMaxArea = a;
                            maxWidth = w;
                            curMaxEle = curNode;
                        }
                    }
                    if (curMaxEle) {
                        for(i = 0; i < ele.children.length; i++) {
                            let curNode = ele.children[i];
                            if (curMaxEle != curNode && curNode.className && curNode.style.display !== 'none' && curMaxEle.className == curNode.className && curMaxEle.tagName == curNode.tagName){
                                hasSameClass = true;
                                break;
                            }
                        }
                    }
                    if (curMaxEle && !hasSameClass && (isHori || curHeight > maxHeight || (needCheckNext && curHeight > windowHeight && ele.contains(self.initNext)))) {
                        return checkElement(curMaxEle);
                    }
                    if (ele.parentNode.children.length == 1 && curWin.getComputedStyle(ele.parentNode).float == 'none')ele=ele.parentNode;
                    else if(ele.tagName=="P" || ele.tagName=="BR")ele=ele.parentNode;
                    else if(ele.tagName=="TD")ele=ele.parentNode;
                    else if(ele.tagName=="TBODY"){
                        self.curSiteRule.pageElement=geneSelector(ele)+">*";
                        if(ele.children.length>0 && ele.children[0].querySelector("th")){
                            self.curSiteRule.pageElement+=":not(:first-child)";
                        }
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return ele.children;
                    }
                    let imgs = ele.querySelectorAll('img');
                    if (imgs.length == 1) {
                        let img = imgs[0];
                        if (img.offsetWidth > ele.offsetWidth / 3 * 2 && img.offsetHeight > ele.offsetHeight / 2) {
                            ele = img;
                        }
                    }
                    self.curSiteRule.pageElement=geneSelector(ele);
                    if (ele.children.length > 1) {
                        if (curWin.getComputedStyle(ele).gridArea) {
                            self.curSiteRule.pageElement += ">*";
                            ele = ele.children;
                        } else if (articleNum > 1) {
                            self.curSiteRule.pageElement += ">article";
                            ele = ele.children;
                        } else {
                            let hasText=false;
                            for(let i in ele.childNodes){
                                let child=ele.childNodes[i];
                                if(child.nodeType==3 && child.nodeValue.trim()!=''){
                                    hasText=true;
                                    ele=[ele];
                                    break;
                                }
                            }
                            if(!hasText){
                                let middleChild=ele.children[parseInt(ele.children.length/2)];
                                if(curWin.getComputedStyle(ele).display==='flex' || (rulesData.opacity!=0 && curWin.getComputedStyle(ele.parentNode).display.indexOf('flex')==-1)){
                                    ele=[ele];
                                }else if((middleChild.style && middleChild.style.position=="absolute" && middleChild.style.left && middleChild.style.top) || ele.tagName=="UL" || curHeight==0){
                                    ele=[ele];
                                }else{
                                    self.curSiteRule.pageElement+=">*";
                                    ele=ele.children;
                                }
                            }
                        }
                    }else{
                        ele=[ele];
                    }
                    debug(self.curSiteRule.pageElement, 'Page element');
                    return ele;
                }
                pageElement=checkElement(body);
                if (pageElement && pageElement.length > 0) {
                    let lastBottom = getElementBottom(pageElement[pageElement.length - 1]);
                    if (lastBottom && getElementTop(self.initNext) - lastBottom > 1000) {
                        debug("Stop as too long between next & page element");
                        isPause = true;
                        pageElement = [];
                    } else {
                        if (pageElement.length == 1 && pageElement[0].tagName == "IMG") {
                            self.curSiteRule.pageBar = 0;
                        }
                    }
                }
                //if(pageElement)this.saveCurSiteRule();
            }
            if(doc==document && !this.docPageElement){
                this.docPageElement=pageElement;
            }
            if(pageElement && pageElement.length>0){
                let pageElementCss=self.curSiteRule.pageElementCss || self.curSiteRule.pageElementStyle || rulesData.pageElementCss;
                if(pageElementCss){
                    [].forEach.call(pageElement, ele=>{
                        if(!ele.dataset.pagetualPageElement){
                            ele.style.cssText=(ele.style.cssText||'')+pageElementCss;
                            ele.dataset.pagetualPageElement=1;
                        }
                    });
                }
            }
            if (doc !== document) this.lazyImgAction(pageElement);
            return pageElement;
        }

        getPage(doc){
            if(typeof _unsafeWindow.Discourse!='undefined')return {};
            let video=document.querySelector("video,iframe[src*=player]");
            if(video){
                let scrollWidth = video.scrollWidth || video.offsetWidth;
                let scrollHeight = video.scrollHeight || video.offsetHeight;
                if(scrollWidth>500 && scrollHeight>500){
                    debug("Won't run when video found");
                    return {};
                }
            }
            let canSave=false;//發現頁碼選擇器在其他頁對不上，還是別保存了
            let url = this.curUrl.replace("index.php?","?");
            let _url=url.replace(/\.s?html?$/i,"");
            let pageNum=1,preStr="",afterStr="";
            let pageMatch1=url.match(/(.*[a-z\/\-_](?:p|page)?\/?)(\d+)(\.s?html?$|\/?$)/i);
            let pageMatch2=url.match(/(.*[\?&]p(?:age)?=)(\d+)($|[#&].*)/i);
            if(pageMatch1){
                preStr=pageMatch1[1];
                pageNum=parseInt(pageMatch1[2]);
                afterStr=pageMatch1[3];
                if (/^\/?$/.test(afterStr) && !/(p(age)?|_|\-|\/)$/.test(preStr)) {
                    preStr = "";
                    afterStr = "";
                }
            }else if(pageMatch2){
                preStr=pageMatch2[1];
                pageNum=parseInt(pageMatch2[2]);
                afterStr=pageMatch2[3];
            }
            let curPage=doc,i,cur,jsNext,body=doc.body||doc;
            let next1,next2,next3,next4,nextJs1,nextJs2,nextJs3;
            let next=body.querySelector(".page-next>a")||
                body.querySelector("a.next_page")||
                body.querySelector("#next_page")||
                body.querySelector(".nextPage")||
                body.querySelector("a[data-pagination=next]")||
                body.querySelector("ul.pagination>li.active+li>a")||
                body.querySelector(".pagination a[rel=next]")||
                body.querySelector(".pagination-nav__item--next>a")||
                body.querySelector("a.pageright")||
                body.querySelector(".page-numbers.current+a")||
                body.querySelector("a[title='Next page']")||
                body.querySelector("[title='Next page']")||
                body.querySelector("[title='下一页']")||
                body.querySelector("[title='下一頁']")||
                body.querySelector("input[value='next']")||
                body.querySelector("input[value='Next page']")||
                body.querySelector("input[value='下一页']")||
                body.querySelector("input[value='下一頁']")||
                body.querySelector("a#pb_next")||
                body.querySelector("a#rightFix")||
                body.querySelector("a#btnPreGn")||
                body.querySelector("a.page-next")||
                body.querySelector("a.pages-next")||
                body.querySelector("a.page.right")||
                body.querySelector("a#next")||
                body.querySelector(".next>a")||
                body.querySelector(".next>button")||
                body.querySelector("a[alt=next]")||
                body.querySelector("button.next")||
                body.querySelector("[title=next]")||
                body.querySelector("a#linkNext")||
                getElementByXpath("//a[contains(@class, 'page__next')]",curPage,curPage);
            if(!next){
                let nexts=body.querySelectorAll("a.next");
                for(i=0;i<nexts.length;i++){
                    if(!/^([上前首尾][一ー1]?[页頁张張]|previous(\s*page)?\s*›?$|前のページ)/i.test(nexts[i].innerText.trim()) &&
                       nexts[i].style.display!=="none" &&
                       nexts[i].parentNode.style.display!=="none"){
                        next=nexts[i];
                        break;
                    }
                }
            }
            if(next && (!next.href || /^(javascript|#)/.test(next.href.replace(location.href,"")))){
                jsNext=next;
                next=null;
            }
            if(!next){
                next=body.querySelectorAll("[aria-label='Next page']");
                if(next && next.length==1){
                    next=next[0];
                    if(!next.href || /^(javascript|#)/.test(next.href.replace(location.href,""))){
                        if(!jsNext)jsNext=next;
                        next=null;
                    }
                }else{
                    next=null;
                }
            }
            if(!next){
                next=body.querySelectorAll("[aria-label='Next']");
                if(next && next.length==1){
                    next=next[0];
                    if(!next.href || /^(javascript|#)/.test(next.href.replace(location.href,""))){
                        if(!jsNext)jsNext=next;
                        next=null;
                    }
                }else{
                    next=null;
                }
            }
            if(next && /^[下后後][一ー1]?[章话話篇]/i.test(next.innerText.trim())){
                next2=next;
                next=null;
            }
            if(!next){
                next=body.querySelector("a.curr+a");
            }
            if(!next){
                next=body.querySelector("div.wp-pagenavi>span.current+a,div.page-nav>span.current+a,div.article-paging>span+a");
            }
            if(!next){
                let pageDiv=body.querySelector("div.pages>ul");
                if(pageDiv){
                    cur=pageDiv.querySelector("li>b");
                    if(cur)next=cur.parentNode.nextElementSibling;
                    if(next)next=next.querySelector("a");
                }
            }
            if(!next){
                next=body.querySelector(".number>ul>li.active+li>a");
            }
            if(!next){
                next=body.querySelector(".pages>a[href='javascript:;']+a");
                if(next && (next.href=="javascript:;" || next.getAttribute("href")=="#"))next=null;
            }
            if(!next){
                let pageDiv=body.querySelector(".pagination");
                if(pageDiv){
                    cur=pageDiv.querySelector("[class*=current]");
                    if(cur)next=cur.parentNode.nextElementSibling;
                    if(next)next=next.querySelector("a");
                }
            }
            if(!next){
                let aTags=body.querySelectorAll("a,button,[type='button']");
                for(i=aTags.length-1;i>=0;i--){
                    if(next1 && next2 && next3 && next4)break;
                    let aTag=aTags[i];
                    if(aTag.innerText=="§")continue;
                    if(aTag.innerText.length>50)continue;
                    if(aTag.style.display=="none")continue;
                    if(aTag.href && /next$/i.test(aTag.href))continue;
                    if(aTag.className && /slick|slide|gallery/i.test(aTag.className))continue;
                    if(aTag.parentNode && aTag.parentNode.className && /slick|slide|gallery/i.test(aTag.parentNode.className))continue;
                    if(aTag.classList && aTag.classList.contains('disabled'))continue;
                    if(aTag.parentNode && aTag.parentNode.classList && aTag.parentNode.classList.contains('disabled'))continue;
                    let innerText = (aTag.innerText||aTag.value||'').replace(/ /g, '');
                    let isJs = !aTag.href || /^(javascript|#)/.test(aTag.href.replace(location.href,""));
                    if(innerText.length<=18){
                        if(!next1){
                            if(/^翻?[下后後次][一ー1]?[页頁张張]|^next([ _-]?page)\s*[›>→»]?$|次のページ|^次へ?$/i.test(innerText)){
                                if(isJs){
                                    if(!nextJs1)nextJs1=aTag;
                                }else{
                                    next1=aTag;
                                }
                            }
                        }
                        if(!next2){
                            if(/^[下后後次][一ー1]?[章话話节節篇个個幅]/i.test(innerText) || /nextpage/i.test(aTag.className) || innerText=="»" || innerText==">>"){
                                if(isJs){
                                    if(!nextJs2)nextJs2=aTag;
                                }else{
                                    next2=aTag;
                                }
                            }
                        }
                        if(!next3){
                            if(innerText=="Next" || innerText=="next" || innerText=="&gt;" || innerText=="▶" || innerText==">" || innerText=="›" || innerText=="→"){
                                if(isJs){
                                    if(!nextJs3)nextJs3=aTag;
                                }else{
                                    next3=aTag;
                                }
                            }
                        }
                    }
                    if (isJs) continue;
                    if (!next4) {
                        let prevEle = aTag.previousElementSibling;
                        if (prevEle && (prevEle.tagName == 'B' || prevEle.tagName == 'SPAN' || prevEle.tagName == 'STRONG')) {
                            if (/^\d+$/.test(aTag.innerText.trim()) && /^\d+$/.test(prevEle.innerText.trim()) && parseInt(aTag.innerText) == parseInt(prevEle.innerText) + 1) {
                                next4 = aTag;
                            }
                        }
                    }
                    if (!next4 && aTag.href.length < 250) {
                        let _aHref = aTag.href.replace("?&", "?").replace("index.php?", "?");
                        let _aHrefTrim = _aHref;
                        if (preStr) _aHrefTrim = _aHrefTrim.replace(preStr, "");
                        if (afterStr) _aHrefTrim = _aHrefTrim.replace(afterStr, "");
                        if ((preStr || afterStr) && pageNum < 999 && _aHrefTrim == pageNum + 1) {
                            next4 = aTag;
                        } else if (this.curUrl != aTag.href) {
                            _aHref = _aHref.replace(/\.s?html?$/i, "");
                            if (_aHref.indexOf(_url) != -1 && /^[\/\?&]?[_-]?(p|page)?=?\/?2(\/|\?|&|$)/i.test(_aHref.replace(_url, ""))) {
                                let curHref = aTag.getAttribute("href");
                                let pageOne = curHref.replace(/\/2(\/|\?|&|$)/,"/1$1");
                                if (pageOne == curHref) pageOne = null;
                                else pageOne = body.querySelector(`a[href='${pageOne}']`);
                                if (!pageOne || pageOne.className != curHref.className) next4 = aTag;
                            }
                        }
                    }
                }
                if(next3){
                    let eles=getAllElements(`//a[text()='${next3.innerText}']`, curPage);
                    if(eles.length>2)next3=null;
                }
                if(nextJs3){
                    let eles=getAllElements(`//a[text()='${nextJs3.innerText}']`, curPage);
                    if(eles.length>2)nextJs3=null;
                }
            }
            if (!next) next = next1 || next4 || next3 || next2;
            if (!next && (this.initGetPage || doc != document)) {
                this.initGetPage = false;
                next = jsNext || nextJs1 || nextJs3 || nextJs2;
                if (next && next.parentNode.className.indexOf('tab') != -1) next = null;
            }
            if (next && next.classList && next.classList.contains("results-more")) next=null;
            return {next:next, canSave:canSave};
        }

        canonicalUri(src) {
            if (!src) {
                return "";
            }
            if (src.charAt(0) == "#") return this.curUrl + src;
            if (src.charAt(0) == "?") return this.curUrl.replace(/^([^\?#]+).*/, "$1" + src);
            let origin = location.protocol + '//' + location.host;
            let url = this.basePath || origin;
            url = url.replace(/(\?|#).*/, "");
            if (/https?:\/\/[^\/]+$/.test(url)) url = url + '/';
            if (url.indexOf("http") !== 0) url = origin + url;
            var root_page = /^[^\?#]*\//.exec(url)[0],
                root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
                absolute_regex = /^\w+\:\/\//;
            this.updateUrl = false;
            while (src.indexOf("../") === 0) {
                src = src.substr(3);
                root_page = root_page.replace(/\/[^\/]+\/$/, "/");
                this.updateUrl = true;
            }
            src = src.replace(/\.\//, "");
            if (/^\/\/\/?/.test(src)) {
                src = location.protocol + src;
            }
            return (absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src));
        }

        getLinkByPage(url, pageNum) {
            if(!url)return;
            if(this.curSiteRule.pageNum){
                let result=this.curSiteRule.pageNum;
                let strMatch=result.match(/\{.*?}/);
                if(!strMatch)return null;
                let urlReg=new RegExp("("+result.replace(strMatch[0], ")\\d+(")+")","i");
                let code=strMatch[0].replace(/^{/,"").replace(/}$/,"").replace(/\$p/g,pageNum);
                if(code==pageNum){
                    result=url.replace(urlReg,"$1"+code+"$2");
                }else{
                    try{
                        code=Function('"use strict";return ' + code)();
                        result=url.replace(urlReg,"$1"+code+"$2");
                    }catch(e){
                        debug(e);
                    }
                }
                if(result!=url){
                    return result;
                }
            }
            return url.replace(/([&\/\?](p=|page[=\/_-]?))\d+/i, "$1"+pageNum).replace(/([_-])\d+\./i, "$1"+pageNum+".");
        }

        getPageNumFromUrl(url) {
            if(!url)return curPage;
            if(this.curSiteRule.pageNum){
                let result=this.curSiteRule.pageNum;
                let strMatch=result.match(/\{.*?}/);
                if(!strMatch)return null;
                let urlReg=new RegExp(".*"+result.replace(strMatch[0], "(\\d+)")+".*","i");
                let curShowNum=url.replace(urlReg,"$1");
                if (curShowNum!=url){
                    let code=strMatch[0].replace(/^{/,"").replace(/}$/,"");
                    if(code=="$p"){
                        return curShowNum;
                    }else{
                        try{
                            let page1=Function('"use strict";return ' + code.replace("$p", "0"))();
                            let page2=Function('"use strict";return ' + code.replace("$p", "1"))();
                            let numGap=page2-page1;
                            return (curShowNum - page1) / numGap;
                        }catch(e){
                            debug(e);
                        }
                    }
                } else {
                    return 1;
                }
            }
            let pageNum=url.replace(/.*[&\/\?](p=|page[=\/_-]?)(\d+).*/i, "$2");
            return pageNum==url?curPage:pageNum;
        }

        getNextLink(doc) {
            let nextLink = null, page, href;
            let getNextLinkByForm = (form, n) => {
                let params = [];
                [].forEach.call(form.querySelectorAll("input"), input => {
                    if (n && /^(p|page)$/i.test(input.name)) {
                        params.push('p=' + n);
                    } else {
                        params.push(input.name + '=' + input.value);
                    }
                });
                return form.action + '?' + params.join('&');
            };
            if (this.curSiteRule.pageElementByJs) {
                this.nextLinkHref = "#";
                return true;
            } else if (this.curSiteRule.nextLinkByJs) {
                try {
                    let targetUrl = ((typeof _unsafeWindow.pagetualNextLinkByJs == 'undefined') ? Function("doc", '"use strict";' + this.curSiteRule.nextLinkByJs) : _unsafeWindow.pagetualNextLinkByJs)(doc);
                    if (targetUrl) nextLink = {href: targetUrl};
                } catch(e) {
                    debug(e);
                }
            } else if (this.curSiteRule.nextLinkByUrl) {
                let targetUrl = this.curUrl.replace(new RegExp(this.curSiteRule.nextLinkByUrl[0], "i"), this.curSiteRule.nextLinkByUrl[1]);
                if (targetUrl != this.curUrl) {
                    let includeSel = this.curSiteRule.nextLinkByUrl[2];
                    let excludeSel = this.curSiteRule.nextLinkByUrl[3];
                    if (includeSel) {
                        includeSel = includeSel.trim();
                        if (!getElement(includeSel, doc)) {
                            this.nextLinkHref=false;
                            return null;
                        }
                    }
                    if (excludeSel) {
                        excludeSel = excludeSel.trim();
                        if (getElement(excludeSel, doc)) {
                            this.nextLinkHref=false;
                            return null;
                        }
                    }
                    let reps = targetUrl.match(/{.*?}/g);
                    if (reps) {
                        reps.forEach(rep => {
                            let code = rep.replace("{","").replace("}", "").replace(/\(\)/g, "0");
                            let result = code.match(/^(\d*)\+1$/);
                            if (result) {
                                result = parseInt(result[1] || 1) + 1;
                            } else {
                                try {
                                    result = Function('"use strict";return ' + code)();
                                } catch(e) {
                                    debug(e);
                                }
                            }
                            targetUrl = targetUrl.replace(rep, result);
                        });
                    }
                }
                nextLink = {href: targetUrl};
            } else if (this.curSiteRule.nextLink) {
                let nextLinkSel = this.curSiteRule.nextLink;
                if (nextLinkSel != "0" && nextLinkSel != 0) {
                    if (Array && Array.isArray && Array.isArray(nextLinkSel)) {
                        nextLink = getElement(nextLinkSel[nextIndex], doc);
                    } else nextLink = getElement(nextLinkSel, doc);
                }
            }else{
                page=this.getPage(doc);
                nextLink=page.next;
                if(nextLink){
                    if(nextLink.tagName=="INPUT" || nextLink.type=="submit"){
                        let form = nextLink.parentNode;
                        while (form) {
                            if (form.tagName == "FORM") break;
                            else form = form.parentNode;
                        }
                        if (form) {
                            nextLink.href=getNextLinkByForm(form);
                        }
                    }
                    if((nextLink.className && /slick|slide/i.test(nextLink.className)) || (nextLink.parentNode && nextLink.parentNode.className && /slick|slide/i.test(nextLink.parentNode.className))){
                        this.nextLinkHref=false;
                        return null;
                    }else if(nextLink.parentNode.style.display=="none" || nextLink.style.display=="none" || nextLink.classList.contains("noClick") || nextLink.hasAttribute("disabled")){
                        this.nextLinkHref=false;
                        return null;
                    }else if(doc==document){
                        if((!nextLink.href || /^(javascript|#)/.test(nextLink.href.replace(location.href,""))) && !isVisible(nextLink, _unsafeWindow)){
                            this.nextLinkHref=false;
                            return null;
                        }else{
                            let nextLinkCs=_unsafeWindow.getComputedStyle(nextLink);
                            if(nextLinkCs.cursor=="not-allowed"){
                                this.nextLinkHref=false;
                                return null;
                            }
                            this.initNext=nextLink;
                        }
                    }
                    let form=doc.querySelector('#search-form');
                    if(!nextLink.href && nextLink.hasAttribute("onclick") && form){
                        if(form && /^\d+$/.test(nextLink.innerText)){
                            href=getNextLinkByForm(form, nextLink.innerText);
                        }
                    }
                }
            }
            if (nextLink) {
                if (this.curSiteRule.stopSign) {
                    if (Array && Array.isArray && Array.isArray(this.curSiteRule.stopSign)) {
                        let includeSel = this.curSiteRule.stopSign[0];
                        let excludeSel = this.curSiteRule.stopSign[1];
                        let curSign = this.curSiteRule.stopSign[2];
                        let maxSign = this.curSiteRule.stopSign[3];
                        if (Array && Array.isArray && Array.isArray(includeSel) && !curSign) {
                            curSign = includeSel;
                            includeSel = false;
                        }
                        if (Array && Array.isArray && Array.isArray(excludeSel) && !maxSign) {
                            maxSign = excludeSel;
                            excludeSel = false;
                        }
                        if (includeSel) {
                            includeSel = includeSel.trim();
                            if (!getElement(includeSel, doc)) {
                                this.nextLinkHref=false;
                                return null;
                            }
                        }
                        if (excludeSel) {
                            excludeSel = excludeSel.trim();
                            if (getElement(excludeSel, doc)) {
                                this.nextLinkHref=false;
                                return null;
                            }
                        }
                        if (curSign && maxSign) {
                            let currentEle = getElement(curSign[0], doc);
                            let maxEle = getElement(maxSign[0], doc);
                            if (currentEle && maxEle) {
                                let currentSignNum, maxSignNum;
                                if (/\(.*\)/.test(curSign[1])) {
                                    currentSignNum = currentEle.innerText.match(new RegExp(curSign[1]));
                                    if (currentSignNum) currentSignNum = currentSignNum[1];
                                } else if (currentEle.getAttribute) {
                                    currentSignNum = currentEle.getAttribute(curSign[1]);
                                }
                                if (/\(.*\)/.test(maxSign[1])) {
                                    maxSignNum = maxEle.innerText.match(new RegExp(maxSign[1]));
                                    if (maxSignNum) maxSignNum = maxSignNum[1];
                                } else if (maxEle.getAttribute) {
                                    maxSignNum = maxEle.getAttribute(maxSign[1]);
                                }
                                if (currentSignNum && maxSignNum && currentSignNum == maxSignNum) {
                                    this.nextLinkHref = false;
                                    return null;
                                }
                            }
                        }
                    } else {
                        try {
                            let stopSign = ((typeof _unsafeWindow.stopSign == 'undefined') ? Function("doc", "nextLink", '"use strict";' + this.curSiteRule.stopSign) : _unsafeWindow.stopSign)(doc, nextLink);
                            if (stopSign) {
                                this.nextLinkHref = false;
                                return null;
                            }
                        } catch(e) {
                            debug(e);
                        }
                    }
                }
                if (this.curSiteRule.action == 3) {
                    if (doc == document) debug(nextLink, 'Next link');
                    this.nextLinkHref = '#';
                } else {
                    let needUrl = (this.curSiteRule.action == 0 || this.curSiteRule.action == 1);
                    if (!href) href = nextLink.href;
                    if (href && nextLink.getAttribute) {
                        let _href = nextLink.getAttribute("href");
                        if (_href) {
                            if (_href.charAt(0) == "#" || _href == "?"){
                                href = "#";
                            } else {
                                href = _href;
                            }
                        }
                    }

                    if(needUrl && (href===""||href===null)){
                        this.nextLinkHref=false;
                    }else if(needUrl && /^(javascript:(void\(0\)|;)|#)/.test(href)){
                        this.nextLinkHref=false;
                    }else{
                        this.nextLinkHref=(href && !/^(javascript:|#)/.test(href))?this.canonicalUri(href):"#";
                        if(this.nextLinkHref!="#" && (this.nextLinkHref==this.curUrl || this.nextLinkHref==this.curUrl+"#" || this.nextLinkHref==this.oldUrl || this.nextLinkHref==this.oldUrl+"#")){
                            this.nextLinkHref=false;
                        }else if(doc==document)debug(nextLink, 'Next link');
                    }
                }
            }else{
                this.nextLinkHref=false;
            }
            this.preload();
            return nextLink;
        }

        preload(){
            if(!rulesData.preload)return;
            if(!this.nextLinkHref || this.nextLinkHref=="#")return;
            let self=this;
            _GM_xmlhttpRequest({
                url: this.nextLinkHref,
                method: 'GET',
                overrideMimeType: 'text/html;charset='+document.charset,
                headers: {
                    'Referer': location.href
                },
                timeout: 5000,
                onload: function(res) {
                    var doc=null;
                    try {
                        doc=document.implementation.createHTMLDocument('');
                        doc.documentElement.innerHTML=res.response;
                        var body = doc.body;
                        if (body && body.firstChild) {
                            self.lazyImgAction(body.children);
                        }
                        if(!self.preloadDiv){
                            self.preloadDiv = document.createElement('div');
                            self.preloadDiv.id = "pagetual-preload";
                            self.preloadDiv.style.cssText = 'display:none!important;';
                            document.body.appendChild(self.preloadDiv);
                            self.checkedImgs={};
                        }
                        [].forEach.call(doc.images, i=>{
                            let iSrc=i.src;
                            if(iSrc && !self.checkedImgs[iSrc]){
                                self.checkedImgs[iSrc] = true;
                                let img = document.createElement('img');
                                img.src = iSrc;
                                self.preloadDiv.appendChild(img);
                            }
                        });
                    }
                    catch (e) {
                        return;
                    }
                }
            });
        }

        getInsert(refresh) {
            if(refresh){
                this.insert=null;
            }
            if(this.insert && !refresh){
                let parent=this.insert;
                if (parent.parentNode) {
                    if (parent.parentNode.nodeName === 'HTML' || parent.parentNode.nodeName === 'BODY') return this.insert;
                    else if (isVisible(parent.parentNode, _unsafeWindow)) {
                        while(parent && parent.nodeName != "BODY"){
                            parent=parent.parentNode;
                        }
                        if(parent && parent.nodeName == "BODY"){
                            return this.insert;
                        }
                    }
                }
            }
            if (this.curSiteRule.insert) {
                let insertSel = this.curSiteRule.insert;
                if (Array && Array.isArray && Array.isArray(insertSel)) {
                    insertSel = insertSel[nextIndex < insertSel.length ? nextIndex : 0];
                }
                this.insert=getElement(insertSel, document);
            } else {
                let pageElement = this.getPageElement(document, _unsafeWindow);
                if (this.curSiteRule.singleUrl && this.nextLinkHref == "#" && this.curSiteRule.pageElement === 'body') {
                    debug("Stop as jsNext & whole body");
                    isPause = true;
                    return null;
                }
                if (pageElement && pageElement.length > 0) {
                    var pELast = pageElement[pageElement.length - 1];
                    this.insert = pELast.nextSibling ? pELast.nextSibling : pELast.parentNode.appendChild(document.createTextNode(' '));
                }
            }
            return this.insert;
        }

        pageInit(doc,eles){
            let code=this.curSiteRule.pageInit;
            if(code){
                let initFunc=((typeof _unsafeWindow.pagetualPageInit=='undefined') ? Function("doc", "eles", '"use strict";' + code) : _unsafeWindow.pagetualPageInit);
                let checkInit=(resolve)=>{
                    try{
                        if(initFunc(doc, eles)===false){
                            setTimeout(()=>{
                                checkInit(resolve);
                            },100);
                        } else {
                            resolve(true);
                        }
                    }catch(e){
                        resolve(false);
                        debug(e);
                    }
                };
                return new Promise((resolve) => {
                    checkInit(function(e) {
                        resolve(e)
                    });
                })
            }
        }

        pageAction(doc,eles){
            let code=this.curSiteRule.pageAction;
            if(code){
                try{
                    ((typeof _unsafeWindow.pagetualPageAction=='undefined') ? Function("doc", "eles", '"use strict";' + code) : _unsafeWindow.pagetualPageAction)(doc, eles);
                }catch(e){
                    debug(e);
                }
            }
            this.openInNewTab(eles);
            this.replaceElement(doc);
        }

        openInNewTab(eles){
            if(rulesData.openInNewTab){
                [].forEach.call(eles, ele=>{
                    if(ele.tagName=="A" && ele.href && !/^(mailto:|javascript:)|#/.test(ele.href)){
                        ele.setAttribute('target', '_blank');
                    }else{
                        [].forEach.call(ele.querySelectorAll('a[href]:not([href^="mailto:"]):not([href^="javascript:"]):not([href^="#"])'), a=>{
                            a.setAttribute('target', '_blank');
                            if (a.getAttribute('onclick') == 'atarget(this)') {
                                a.removeAttribute('onclick');
                            }
                        });
                    }
                });
            }
        }

        lazyImgAction(eles) {
            if (!eles || eles.length == 0) return;
            let lazyImgSrc = this.curSiteRule.lazyImgSrc;
            if (lazyImgSrc === 0 || lazyImgSrc === '0') return;
            let setLazyImg = img => {
                let realSrc;
                if (lazyImgSrc) {
                    if (!Array.isArray(lazyImgSrc)) {
                        lazyImgSrc = [lazyImgSrc];
                    }
                    realSrc = img.getAttribute(lazyImgSrc[0]);
                    if (lazyImgSrc.length == 2) {
                        let removeProps = lazyImgSrc[1].split(",");
                        removeProps.forEach(prop => {
                            img.removeAttribute(prop.trim());
                        });
                    }
                }
                if (!realSrc) {
                    if (img.getAttribute("_src") && !img.src) {
                        realSrc = img.getAttribute("_src");
                    } else if (img.dataset) {
                        if (img.dataset.original) {
                            realSrc = img.dataset.original;
                        } else if (img.dataset.lazySrc) {
                            realSrc = img.dataset.lazySrc;
                        } else if (img.dataset.lazy) {
                            realSrc = img.dataset.lazy;
                        } else if (img.dataset.src) {
                            realSrc = img.dataset.src;
                        } else if (img.dataset.origFile) {
                            realSrc = img.dataset.origFile;
                        }
                    }
                    if (!realSrc && img._lazyrias && img._lazyrias.srcset) {
                        realSrc = img._lazyrias.srcset[img._lazyrias.srcset.length - 1];
                    }
                    if (realSrc) {
                        img.removeAttribute("srcset");
                    } else if (img.srcset) {
                        var srcs = img.srcset.split(/[xw],/), largeSize = 0;
                        srcs.forEach(srci => {
                            let srcInfo = srci.trim().split(" "), curSize = parseInt(srcInfo[1]);
                            if (srcInfo[1] && curSize > largeSize) {
                                largeSize = curSize;
                                realSrc = srcInfo[0];
                            }
                        });
                    }
                }
                if (realSrc) {
                    img.src = realSrc;
                    if (img.style.display == "none") {
                        img.style.display = "";
                    }
                    if (img.style.visibility == "hidden") {
                       img.style.visibility = "";
                    }
                    if (img.style.opacity == 0) {
                        img.style.opacity = "";
                    }
                }
            };
            [].forEach.call(eles, ele=>{
                if(ele.tagName=="IMG"){
                    setLazyImg(ele);
                }else{
                    [].forEach.call(ele.querySelectorAll("img"), img=>{
                        setLazyImg(img);
                    });
                    [].forEach.call(ele.querySelectorAll("div[data-src][data-thumb]"), div=>{
                        div.style.setProperty("background-image", "url("+div.dataset.src+")", "important");
                    });
                }
                if(ele.tagName=="A" && ele.classList.contains("lazyload")){
                    if(ele.dataset.original){
                        ele.style.backgroundImage='url("'+ele.dataset.original+'")';
                    }
                }else{
                    [].forEach.call(ele.querySelectorAll("a.lazyload"), a=>{
                        if(a.dataset.original){
                            a.style.backgroundImage='url("'+a.dataset.original+'")';
                        }
                    });
                }
            });
        }

        initPage(callback){
            let self=this;
            curPage=1;
            //if(this.curSiteRule.url && !this.curSiteRule.singleUrl)return;
            this.curSiteRule={};
            this.pageDoc=document;
            this.nextLinkHref=null;
            this.curUrl=location.href;
            let base=document.querySelector("base");
            this.basePath=base?base.href:location.href;
            this.getRule(()=>{
                if(self.curSiteRule.enable==0){
                    debug("Stop as rule disable");
                    isPause=true;
                    return;
                }
                //若是再亂匹配就不緩存wedata，或者只在找完本地規則之後再考慮wedata的緩存
                if (self.curSiteRule.singleUrl) {
                    self.curSiteRule.pageElement = "";
                    self.smartRules = self.smartRules.filter(item => {return item && item.url != self.curSiteRule.url});
                    self.smartRules.unshift(self.curSiteRule);
                    if (self.smartRules.length > 100) {
                        self.smartRules.pop();
                    }
                    storage.setItem("smartRules", self.smartRules);
                } else if (self.curSiteRule && self.curSiteRule.url.length > 13) {
                    self.hpRules = self.hpRules.filter(item => {return item && item.url != self.curSiteRule.url});
                    self.hpRules.unshift(self.curSiteRule);
                    if (self.hpRules.length > 30) {
                        self.hpRules.pop();
                    }
                    storage.setItem("hpRules", self.hpRules);
                }
                let css=self.curSiteRule.css || rulesData.customCss;
                if(css && !/^inIframe:/.test(css)){
                    _GM_addStyle(css);
                }
                let autoClick=self.curSiteRule.autoClick;
                if(autoClick){
                    let autoClickBtn;
                    autoClickBtn=getElement(autoClick, document);
                    if(autoClickBtn){
                        emuClick(autoClickBtn);
                    }
                }
                let code=self.curSiteRule.init;
                if(code){
                    try{
                        ((typeof _unsafeWindow.pagetualInit=='undefined') ? Function('doc','win','iframe','"use strict";' + code) : _unsafeWindow.pagetualInit)(null,null,null);
                    }catch(e){
                        debug(e);
                    }
                }
                self.getNextLink(document);
                self.refreshByClick();
                callback();
            });
        }

        insertElement(ele) {
            if(this.curSiteRule.insertPos==2){
                this.insert.appendChild(ele);
            }else{
                this.insert.parentNode.insertBefore(ele, this.insert);
            }
        }

        async insertPage(doc, eles, url, callback, tried) {
            this.oldUrl=this.curUrl;
            let oldTitle=this.pageDoc.title;
            this.pageDoc=doc;
            this.curUrl=url;
            let nextLink=this.getNextLink(doc);
            this.nextTitle="";
            if(this.curSiteRule.pageBarText){
                if(this.curSiteRule.pageBarText==1 || this.curSiteRule.pageBarText==true){
                    this.nextTitle=doc.title;
                }else{
                    try{
                        this.nextTitle=((typeof _unsafeWindow.pagetualPageBarText=='undefined') ? Function("doc",'"use strict";' + this.curSiteRule.pageBarText) : _unsafeWindow.pagetualPageBarText)(doc);
                    }catch(e){
                        debug(e);
                    }
                }
            }
            if(curPage==1 && !tried && !nextLink && this.curSiteRule.singleUrl && this.curSiteRule.pageElement && this.curSiteRule.action!=0){
                this.curSiteRule.action=1;
                this.curUrl=location.href;
                return false;
            }
            if(callback)callback(eles);
            this.getInsert();
            var self=this,newEles=[];
            if(!eles || eles.length==0 || !self.insert || !self.insert.parentNode){
            }else{
                isLoading=true;
                await this.pageInit(doc, eles);
                let curScroll=document.body.scrollTop||document.documentElement.scrollTop;
                [].forEach.call(eles, ele=>{
                    let newEle=ele.cloneNode(true);
                    let oldCanvass=ele.querySelectorAll("canvas");
                    let newCanvass=newEle.querySelectorAll("canvas");
                    if(self.updateUrl){
                        [].forEach.call(newEle.querySelectorAll("img"), img=>{
                            if (img.getAttribute("src")) img.src=self.canonicalUri(img.getAttribute("src"));
                        });
                        [].forEach.call(newEle.querySelectorAll("a"), a=>{
                            if (a.getAttribute("href")) a.href = self.canonicalUri(a.getAttribute("href"));
                        });
                    }
                    for(let i=0;i<oldCanvass.length;i++){
                        let oldCanvas=oldCanvass[i];
                        let newCanvas=newCanvass[i];
                        newCanvas.getContext('2d').drawImage(oldCanvas, 0, 0);
                    }
                    self.insertElement(newEle);
                    newEles.push(newEle);
                });
                document.body.scrollTop=curScroll;
                document.documentElement.scrollTop=curScroll;
            }
            this.pageAction(doc, newEles);
            let enableHistory = this.curSiteRule.history;
            let enableHistoryAfterInsert = false;
            if (enableHistory == 1) {
                enableHistory = true;
            } else if (enableHistory == 2) {
                enableHistory = true;
                enableHistoryAfterInsert = true;
            } else if (enableHistory == 0) {
                enableHistory = false;
            } else {
                enableHistory = rulesData.enableHistory;
                enableHistoryAfterInsert = rulesData.enableHistoryAfterInsert;
            }
            if (enableHistory) {
                let historyUrl = enableHistoryAfterInsert ? this.curUrl : this.oldUrl;
                if(historyUrl != location.href) {
                    let isJs=/^(javascript|#)/.test(historyUrl.replace(location.href, ""));
                    if(!isJs){
                        let historyTitle = enableHistoryAfterInsert ? doc.title : oldTitle;
                        _unsafeWindow.history.replaceState(undefined, historyTitle, historyUrl);
                        document.title = historyTitle;
                    }
                }
            }
            isLoading = false;
            return true;
        }
    }
    var ruleParser = new RuleParser();

    class NextSwitch {
        static nextSwitch;
        constructor() {
            this.init();
        }

        static getInstance() {
            if (!NextSwitch.nextSwitch) {
                NextSwitch.nextSwitch = new NextSwitch();
            }
            return NextSwitch.nextSwitch;
        }

        init() {
            let self = this;
            let cssText = `
             #pagetual-nextSwitch {
              position: fixed;
              top: 10px;
              left: calc(50% - 160px);
              background: aliceblue;
              padding: 10px;
              border-radius: 5px;
              text-align: center;
              opacity: 0.95;
              color: #161616;
              z-index: 2147483647;
              font-size: 16px;
              box-shadow: rgb(0 0 0) 0px 0px 10px;
             }
             #pagetual-nextSwitch>.title {
              margin: -5px 45px 10px 45px;
              font-size: 20px;
              font-weight: bold;
              border-bottom: 1px solid black;
              user-select: none;
              color: orangered;
             }
             #pagetual-nextSwitch>.group {
              display: flex;
              flex-direction: column;
             }
             #pagetual-nextSwitch>.group>span {
              color: #161616;
              cursor: pointer;
              margin: 3px;
              font-size: larger;
             }
             #pagetual-nextSwitch>.group>span:hover {
              color: red;
             }
             #pagetual-nextSwitch>.group>span.current {
              border: 2px dotted red;
              border-radius: 10px;
             }
             #pagetual-nextSwitch>.closeSwitch {
              position: absolute;
              top: 3px;
              right: 10px;
              background: none;
              border: none;
              vertical-align: top;
              transition: transform .15s ease-in-out;
              float: right;
              cursor: pointer;
             }
             #pagetual-nextSwitch svg {
              width: 30px;
              height: 30px;
              vertical-align: middle;
              fill: #161616;
              overflow: hidden;
             }
             #pagetual-nextSwitch button:hover {
              transform: scale(1.2);
             }
            `;
            _GM_addStyle(cssText);
            let frame = document.createElement("div");
            frame.id = "pagetual-nextSwitch";
            frame.innerHTML = createHTML(`
                <div class="title">${i18n("nextSwitch")}</div>
                <button type="button" class="closeSwitch">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2754">
                    <path d="M512 128c212 0 384 172 384 384s-172 384-384 384-384-172-384-384 172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m238.4 254.4l-45.6-45.6L512 467.2 318.4 273.6l-45.6 45.6L467.2 512 273.6 705.6l45.6 45.6L512 557.6l193.6 193.6 45.6-45.6L557.6 512l192.8-193.6z" p-id="2755">
                    </path>
                  </svg>
                </button>
                <div class="group"></div>
            `);
            let group = frame.querySelector(".group");
            let closeBtn = frame.querySelector(".closeSwitch");
            closeBtn.addEventListener("click", e => {
                self.close();
            }, true);
            this.frame = frame;
            let currentSpan;
            ruleParser.curSiteRule.nextLink.forEach((link, i) => {
                let span = document.createElement("span");
                let target = getElement(link, document);
                let index = "<b>" + (i + 1) + "</b>: ";
                if (target) {
                    let targetInner = target.innerText.trim();
                    span.innerHTML = index + (targetInner || link);
                } else {
                    span.innerHTML = index + "Not Found";
                }
                span.title = link;
                span.addEventListener("click", e => {
                    if (currentSpan) currentSpan.classList.remove("current");
                    span.classList.add("current");
                    currentSpan = span;
                    nextIndex = i;
                    storage.setItem("nextSwitch_" + location.host, nextIndex === 0 ? "" : nextIndex);
                    ruleParser.curUrl += "#pagetual";
                    ruleParser.oldUrl = ruleParser.curUrl;
                    autoLoadNum = -1;
                    if (!ruleParser.nextLinkHref) {
                        isLoading = false;
                    }
                    ruleParser.getNextLink(ruleParser.pageDoc || document);
                    self.close();
                }, true);
                if (i == nextIndex) {
                    span.classList.add("current");
                    currentSpan = span;
                }
                group.appendChild(span);
            });
        }

        start() {
            document.documentElement.appendChild(this.frame);
        }

        close() {
            if (this.frame.parentNode) this.frame.parentNode.removeChild(this.frame);
        }
    }

    class Picker {
        static picker;
        constructor() {
            this.init();
        }

        static getInstance() {
            if (!Picker.picker) {
                Picker.picker = new Picker();
            }
            return Picker.picker;
        }

        init() {
            let self = this;
            this.signList = [];
            let cssText = `
             body.pagetual-picker,
             body.pagetual-picker *:hover,
             body.pagetual-picker a:hover {
              cursor: crosshair !important;
             }
             #pagetual-picker {
              position: fixed;
              top: 10px;
              left: calc(50% - 178px);
              background: aliceblue;
              padding: 10px;
              border-radius: 5px;
              text-align: center;
              opacity: 0.95;
              color: #161616;
              z-index: 2147483647;
              font-size: 16px;
              box-shadow: rgb(0 0 0) 0px 0px 10px;
             }
             #pagetual-picker>.title {
              margin: -5px 45px 10px 45px;
              font-size: 20px;
              font-weight: bold;
              cursor: move;
              border-bottom: 1px solid black;
              user-select: none;
              color: orangered;
              font-family: Times New Roman;
             }
             #pagetual-picker button {
              background: none;
              border: none;
              vertical-align: top;
              transition: transform .15s ease-in-out;
              float: right;
              cursor: pointer;
             }
             #pagetual-picker button:hover {
              transform: scale(1.2);
             }
             #pagetual-picker>.closePicker {
              position: absolute;
              top: 3px;
              right: 10px;
             }
             #pagetual-picker>.logoToHome {
              position: absolute;
              top: 3px;
              left: 10px;
             }
             #pagetual-picker .selector{
              display: inline-block;
              width: 290px;
              height: 20px;
              max-width: calc(65vw - 50px);
              padding: 6px 12px;
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;
              color: #495057;
              background-color: #fff;
              background-clip: padding-box;
              border: 1px solid #ced4da;
              border-radius: 4px;
              transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
              box-sizing: content-box;
             }
             #pagetual-picker .selector:focus {
              color: #495057;
              background-color: #fff;
              border-color: #80bdff;
              outline: 0;
              box-shadow: 0 0 0 3.2px rgb(0 123 255 / 25%);
             }
             #pagetual-picker [type=checkbox],
             #pagetual-picker [type=radio] {
              line-height: 20px;
              height: 25px;
              width: 25px;
              margin-left: 5px;
              vertical-align: middle;
              appearance: auto;
              display: inline-block;
             }
             #pagetual-picker label {
              font-size: 18px;
              line-height: 25px;
              vertical-align: middle;
              display: inline-block;
              color: black;
             }
             #pagetual-picker .bottom {
              text-align: left;
              margin: 10px 0;
              width: 100%;
             }
             #pagetual-picker .bottom>button {
              float: right;
             }
             #pagetual-picker svg {
              width: 30px;
              height: 30px;
              vertical-align: middle;
              fill: #161616;
              overflow: hidden;
             }
             #pagetual-picker .allpath {
              font-size: 18px;
              margin: 10px;
              max-width: 350px;
              word-break: break-all;
              cursor: context-menu;
              overflow: hidden;
              max-height: 42px;
              -moz-transition:max-height 1s ease-in;
              -webkit-transition:max-height 1s ease-in;
              transition:max-height 1s ease-in;
              color: black;
             }
             #pagetual-picker .allpath:hover {
              max-height: calc(100vh - 130px);
              overflow: auto;
             }
             #pagetual-picker .allpath>span.path {
              cursor: pointer;
             }
             #pagetual-picker .allpath>span.path:hover {
              color: orangered;
             }
             #pagetual-picker .moreConfig {
              display: flex;
              justify-content: space-between;
              border-top: 1px solid;
              padding-top: 10px;
              width: 100%;
             }
             #pagetual-picker .command {
              width: 100%;
              color: black;
              text-align: center;
              font-size: large;
              margin-top: 10px;
             }
             #pagetual-picker .command:hover {
              color: orangered;
             }
            `;
            _GM_addStyle(cssText);
            this.mainSignDiv = this.createSignDiv();
            this.allSignDiv = [];
            let frame = document.createElement("div");
            frame.id = "pagetual-picker";
            frame.innerHTML = createHTML(`
                <button title="Pagetual" type="button" class="logoToHome">
                  <svg width="30" height="30" class="upSvg pagetual" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#604b4a"></path></svg>
                </button>
                <div class="title">${i18n("picker")}</div>
                <button title="${i18n("closePicker")}" type="button" class="closePicker">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 128c212 0 384 172 384 384s-172 384-384 384-384-172-384-384 172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m238.4 254.4l-45.6-45.6L512 467.2 318.4 273.6l-45.6 45.6L467.2 512 273.6 705.6l45.6 45.6L512 557.6l193.6 193.6 45.6-45.6L557.6 512l192.8-193.6z" fill="#604b4a"></path></svg>
                </button>
                <div class="allpath" title="${i18n("switchSelector")}"></div>
                <div>
                  <textarea class="selector" spellcheck="false" name="selector" placeholder="${i18n("pickerPlaceholder")}"></textarea>
                  <button id="check" title="${i18n("pickerCheck")}" type="button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z m0-85.333333c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667zM696.149333 298.666667L768 349.866667 471.594667 725.333333 256 571.733333l53.888-68.266666 143.744 102.4z" fill="#604b4a"></path></svg>
                  </button>
                </div>
                <div class="bottom">
                  <input name="xpath" id="checkbox_id" type="checkbox">
                  <label for="checkbox_id">XPath</label>
                  <button id="edit" title="${i18n("gotoEdit")}" type="button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="color: orangered;fill: orangered;">
                      <path d="M775.84 392.768l-155.2-172.352L160.768 643.264l-38.368 187.936 190.56-12.832zM929.952 229.952l-131.2-150.944-0.288-0.32a16 16 0 0 0-22.592-0.96l-131.168 120.576 155.168 172.352 128.832-118.464a15.936 15.936 0 0 0 1.248-22.24zM96 896h832v64H96z">
                      </path>
                    </svg>
                  </button>
                </div>
                <div class="moreConfig">
                  <div title="${i18n('forceStateIframe')}">
                    <input name="forceState" id="forceStateIframe" type="radio">
                    <label for="forceStateIframe">Iframe</label>
                  </div>
                  <div title="${i18n('forceStateDynamic')}">
                    <input name="forceState" id="forceStateDynamic" type="radio">
                    <label for="forceStateDynamic">Dynamic</label>
                  </div>
                  <div title="${i18n('forceStateDisable')}">
                    <input name="forceState" id="forceStateDisable" type="radio">
                    <label for="forceStateDisable">Disable</label>
                  </div>
                </div>
                <button id="nextSwitch" class="command" title="${i18n("nextSwitch")}" type="button">${i18n("nextSwitch")}</button>
                <button id="loadNow" class="command" title="${i18n("loadNow")}" type="button">${i18n("loadNow")}</button>
            `);
            let forceStateIframe = frame.querySelector("#forceStateIframe");//forceState 1 禁用 2 强嵌 3 动态
            let forceStateDynamic = frame.querySelector("#forceStateDynamic");
            let forceStateDisable = frame.querySelector("#forceStateDisable");
            let clickRadio = e => {
                let radio = e.currentTarget.querySelector('input');
                if (radio.checked) {
                    forceState = "";
                } else {
                    switch (radio.id) {
                        case "forceStateIframe":
                            forceState = 2;
                            break;
                        case "forceStateDynamic":
                            forceState = 3;
                            break;
                        case "forceStateDisable":
                            forceState = 1;
                            break;
                        default:
                            return;
                    }
                }
                storage.setItem("forceState_"+location.host, forceState);
                self.close();
                location.reload();
            };
            forceStateIframe.parentNode.addEventListener("mousedown", clickRadio);
            forceStateDynamic.parentNode.addEventListener("mousedown", clickRadio);
            forceStateDisable.parentNode.addEventListener("mousedown", clickRadio);
            if (forceState == 1) forceStateDisable.checked = true;
            else if (forceState == 2) forceStateIframe.checked = true;
            else if (forceState == 3) forceStateDynamic.checked = true;
            let closeBtn = frame.querySelector(".closePicker");
            let homeBtn = frame.querySelector(".logoToHome");
            let title = frame.querySelector(".title");
            let allpath = frame.querySelector(".allpath");
            let selectorInput = frame.querySelector(".selector");
            let xpath = frame.querySelector("#checkbox_id");
            let checkBtn = frame.querySelector("#check");
            let editBtn = frame.querySelector("#edit");
            let nextSwitch = frame.querySelector("#nextSwitch");
            let loadNow = frame.querySelector("#loadNow");
            nextSwitch.addEventListener("click", e => {
                self.close();
                NextSwitch.getInstance().start();
            }, true);
            loadNow.addEventListener("click", e => {
                self.close();
                let loadNum=window.prompt(i18n("loadConfirm"), "1");
                if(loadNum==="" || loadNum===null)return;
                autoLoadNum=Math.abs(parseInt(loadNum));
                nextPage();
            }, true);
            closeBtn.addEventListener("click", e => {
                self.close();
            }, true);
            homeBtn.addEventListener("click", e => {
                _GM_openInTab(configPage[0], {active: true});
            }, true);
            let moving = false;
            let moveHanlder = e => {
                frame.style.left = e.clientX - 200 + "px";
                frame.style.top = e.clientY - 15 + "px";
                e.stopPropagation();
                e.preventDefault();
            };
            let upHanlder = e => {
                moving = false;
                document.removeEventListener("mousemove", moveHanlder, true);
                title.removeEventListener("mouseup", upHanlder, true);
                e.stopPropagation();
                e.preventDefault();
            };
            title.addEventListener("mousedown", e => {
                moving = true;
                document.addEventListener("mousemove", moveHanlder, true);
                title.addEventListener("mouseup", upHanlder, true);
            });
            frame.addEventListener("mouseenter", e => {
                if (moving) return;
                if (self.mainSignDiv.parentNode) self.mainSignDiv.parentNode.removeChild(self.mainSignDiv);
                self.checkInputSelector();
            });
            frame.addEventListener("mouseleave", e => {
                if (moving) return;
                document.body.appendChild(self.mainSignDiv);
                self.clearSigns();
            });
            checkBtn.addEventListener("click", e => {
                self.checkInputSelector();
                if (this.selectorInput.value) _GM_setClipboard(this.selectorInput.value);
            });
            xpath.addEventListener("click", e => {
                if (!selectorInput.value) {
                    self.setSelectorDiv("");
                    return;
                }
                let element = getElement(selectorInput.value, document);
                let selector = self.getSelectorFromEle(element);
                self.setSelectorDiv(selector);
                selectorInput.value = selector;
            });
            editBtn.addEventListener("click", e => {
                let editTemp;
                if (ruleParser.curSiteRule.url && !ruleParser.curSiteRule.singleUrl) {
                    editTemp = ruleParser.curSiteRule;
                } else {
                    editTemp = {
                        name: document.title,
                        url: "^" + location.origin.replace(/^https?/, "https?").replace(/\./g,"\\.") + "/"
                    };
                }
                if (selectorInput.value) {
                    editTemp.pageElement = selectorInput.value;
                }
                delete editTemp.from;
                delete editTemp.type;
                delete editTemp.updatedAt;
                rulesData.editTemp = editTemp;
                storage.setItem("rulesData", rulesData);
                _GM_openInTab(configPage[0], {active: true});
            });
            this.frame = frame;
            this.xpath = xpath;
            this.allpath = allpath;
            this.selectorInput = selectorInput;
            this.nextSwitch = nextSwitch;
            this.loadNow = loadNow;
            this.moveHandler = e => {
                if (e.target === document) return;
                self.adjustSignDiv(self.mainSignDiv, self.getTarget(e.target));
            };
            this.clickHandler = e => {
                if (self.inPicker) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                let target = self.getTarget(e.target);
                let selector = self.getSelectorFromEle(target);
                self.setSelectorDiv(selector);
                selectorInput.value = selector;
            };
        }

        getTarget(ele) {
            while (ele.parentNode && (ele.scrollWidth === 0 || ele.scrollHeight === 0)) {
                ele = ele.parentNode;
            }
            return ele;
        }

        close() {
            this.clearSigns();
            if (this.frame.parentNode) this.frame.parentNode.removeChild(this.frame);
            if (this.mainSignDiv.parentNode) this.mainSignDiv.parentNode.removeChild(this.mainSignDiv);
            document.body.classList.remove("pagetual-picker");
            document.body.removeEventListener("mousemove", this.moveHandler, true);
            document.body.removeEventListener("click", this.clickHandler, true);
            this.inPicker = false;
        }

        setImportant(ele, prop, value) {
            ele.style.setProperty(prop, value, "important");
        }

        createSignDiv() {
            let signDiv = document.createElement("div");
            this.setImportant(signDiv, "position", "absolute");
            this.setImportant(signDiv, "pointer-events", "none");
            this.setImportant(signDiv, "z-index", "2147483647");
            this.setImportant(signDiv, "background", "rgba(120, 170, 210, 0.6)");
            this.setImportant(signDiv, "transition", "all 0.15s ease-out");
            this.setImportant(signDiv, "box-shadow", "rgb(0 0 0) 0px 0px 3px 0px");
            return signDiv;
        }

        adjustSignDiv(div, target) {
            let rect = target.getBoundingClientRect();
            this.setImportant(div, "width", rect.width + "px");
            this.setImportant(div, "height", rect.height + "px");
            this.setImportant(div, "left", rect.left + window.scrollX + "px");
            this.setImportant(div, "top", rect.top + window.scrollY + "px");
        }

        getSelectorFromEle(ele) {
            return this.xpath.checked ? createXPathFromElement(ele) : geneSelector(ele, true);
        }

        setSelectorDiv(selector) {
            let self = this;
            this.allpath.innerHTML = createHTML("");
            if (!selector) return;
            if (this.xpath.checked) {
                let span = document.createElement("span");
                span.innerText = selector;
                span.addEventListener("click", e => {
                    self.selectorInput.value = selector;
                    self.checkInputSelector();
                }, true);
                this.allpath.appendChild(span);
            } else {
                selector.split(">").forEach((item, index) => self.geneSelectorItem(item, index));
            }
        }

        geneSelectorItem(item, index) {
            let self = this;
            item = item.trim();
            if (!item) return;
            if (index !== 0) {
                let span = document.createElement("span");
                span.innerText = " > ";
                this.allpath.appendChild(span);
            }
            let span = document.createElement("span");
            span.className = "path";
            span.innerText = item;
            span.addEventListener("click", e => {
                let selector = "";
                let target = e.target;
                while (target) {
                    selector = target.innerText + selector;
                    target = target.previousElementSibling;
                }
                self.selectorInput.value = selector;
                self.checkInputSelector();
            }, true);
            this.allpath.appendChild(span);
        }

        checkInputSelector() {
            let self = this;
            this.clearSigns();
            if (!this.selectorInput.value) return;
            let eles = getAllElements(this.selectorInput.value, document);
            if (eles && eles.length > 0) {
                eles.forEach(ele => {
                    let sign = self.createSignDiv();
                    document.body.appendChild(sign);
                    self.adjustSignDiv(sign, ele);
                    self.signList.push(sign);
                });
            }
        }

        clearSigns() {
            this.signList.forEach(sign => {
                if (sign.parentNode) sign.parentNode.removeChild(sign);
            });
            this.signList = [];
        }

        start() {
            if (this.inPicker) return;
            this.inPicker = true;
            document.documentElement.appendChild(this.frame);
            document.body.appendChild(this.mainSignDiv);
            document.body.classList.add("pagetual-picker");

            document.body.addEventListener("mousemove", this.moveHandler, true);
            document.body.addEventListener("click", this.clickHandler, true);
            this.xpath.checked = isXPath(ruleParser.curSiteRule.pageElement);

            this.loadNow.style.display = ruleParser.nextLinkHref ? "block" : "none";
            if (ruleParser.curSiteRule.nextLink && Array && Array.isArray && Array.isArray(ruleParser.curSiteRule.nextLink)) {
                this.nextSwitch.style.display = "block";
            } else {
                this.nextSwitch.style.display = "none";
            }

            let pageElementSel=ruleParser.curSiteRule.pageElement || "";
            if(Array && Array.isArray && Array.isArray(pageElementSel)){
                pageElementSel=pageElementSel[nextIndex<pageElementSel.length?nextIndex:0];
            }
            this.setSelectorDiv(pageElementSel);
        }
    }

    function initConfig(){
        initView();
        _GM_registerMenuCommand(i18n(forceState==1?"enable":"disableSite"), ()=>{
            forceState=(forceState==1?0:1);
            storage.setItem("forceState_"+location.host, forceState);
            showTips(i18n(forceState==1?"disableSiteTips":"enableSiteTips"));
            if(!ruleParser.curSiteRule.url) location.reload();
        });
        _GM_registerMenuCommand(i18n("update"), ()=>{
            updateRules(()=>{
                showTips(i18n("updateSucc"));
                location.reload();
            },(rule,err)=>{
                showTips("Update "+rule.url+" rules fail!");
            });
            showTips(i18n("beginUpdate"));
        });
        if(guidePage.test(location.href)){
            function createEdit(){
                var options = {
                    mode: 'code',
                    modes: ['code', 'tree'],
                    templates: [
                        {
                            text: 'New site',
                            title: 'Insert a new site',
                            className: 'jsoneditor-type-object',
                            field: 'SiteTemplate',
                            value: {
                                'name': 'Site name',
                                'url': 'Site url'
                            }
                        }
                    ],
                    schema: {
                        "title": "Sites data",
                        "description": "Object containing site config",
                        "type": "array",
                        "items": {
                            "type": 'object',
                            "properties": {
                                "name": {
                                    "title": "Site Name",
                                    "description": "The site's name.",
                                    "examples": [
                                        "Google"
                                    ],
                                    "type": "string"
                                },
                                "url": {
                                    "title": "Site Url",
                                    "description": "The Regexp of site's url.",
                                    "examples": [
                                        "^https:\/\/yande\\.re\/"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": ["name", "url"]
                        }
                    }
                };
                var container = document.getElementById("jsoneditor");
                container.style.height='800px';
                var editor = new JSONEditor(container, options);
                editor.set(ruleParser.customRules);
                document.querySelector("#saveBtn").onclick=e=>{
                    try{
                        storage.setItem("hpRules", []);
                        storage.setItem("smartRules", []);
                        let customRules=editor.get();
                        if(!customRules){
                            storage.setItem("customRules", "");
                        }else{
                            if(Array && Array.isArray && !Array.isArray(customRules)){
                                showTips("Rules must be a Array!");
                                return;
                            }
                            debug(customRules);
                            storage.setItem("customRules", customRules);
                        }
                    }catch(e){
                        debug(e);
                        showTips("JSON error, check again!");
                        return;
                    }
                    showTips("Edit successfully");
                };
            }
            if(JSONEditor){
                createEdit();
            }else{
                window.onload = e => {
                    createEdit();
                }
            }
            return true;
        }
        if(location.href.indexOf("PagetualGuide")!=-1) return true;

        var configCon,insertPos;
        var noRules=!rulesData.urls || rulesData.urls.length===0;

        let inConfig = false;
        for (let i = 0; i < configPage.length; i++) {
            if (configPage[i] == location.href) {
                inConfig = true;
                break;
            }
        }
        if(ruleImportUrlReg.test(location.href) || inConfig){
            let importing = false;
            if(noRules){
                setTimeout(() => {
                    if (!importing) showTips(i18n("firstAlert"));
                }, 3000);
                setTimeout(() => {
                    if (!importing) showTips(i18n("firstAlert"));
                }, 6000);
                showTips(i18n("firstAlert"));
            }
            let createImportBtn = () => {
                let importBtn = document.createElement("button");
                importBtn.innerText = i18n("import");
                importBtn.style.marginTop = "100px";
                importBtn.style.float = "right";
                importBtn.style.position = "relative";
                importBtn.style.display = "block";
                importBtn.style.fontSize = "20px";
                importBtn.addEventListener("click", e => {
                    let parentNode = importBtn.parentNode;
                    if (!parentNode) return;
                    parentNode.removeChild(importBtn);
                    try {
                        let rules=parentNode.innerText.trim();
                        let isContent=/['"]name['"]/i.test(rules);
                        if(isContent){
                            let ruleList=JSON.parse(`[${rules}]`);
                            for(let i in ruleList){
                                let hasRule = false;
                                let r = ruleList[i];
                                for(let j in ruleParser.customRules){
                                    if(ruleParser.customRules[j].name == r.name){
                                        ruleParser.customRules[j] = r;
                                        hasRule = true;
                                        break;
                                    }
                                }
                                if(!hasRule)ruleParser.customRules.push(r);
                            }
                            storage.setItem("customRules", ruleParser.customRules);
                            storage.setItem("hpRules", []);
                            storage.setItem("smartRules", []);
                            showTips(i18n("importSucc"));
                        }else{
                            rules=rules.split("\n");
                            let diff=false;
                            for(let c=0;c<rules.length;c++){
                                let urlArr=rules[c].split("|"),url,type=1;
                                if(urlArr.length==1){
                                    url=urlArr[0].trim();
                                    if(!/^http/.test(url)){
                                        showTips("Wrong url, check again!");
                                        return;
                                    }
                                }else if(urlArr.length==2){
                                    type=urlArr[0].trim();
                                    url=urlArr[1].trim();
                                    if(!/^http/.test(url)){
                                        showTips("Wrong url, check again!");
                                        return;
                                    }
                                }else{
                                    break;
                                }
                                let maxId=0,hasUrl=false;
                                if(!rulesData.urls){
                                    rulesData.urls=[];
                                    maxId=1;
                                }else{
                                    rulesData.urls.forEach(u=>{
                                        if(maxId<u.id){
                                            maxId=u.id;
                                        }
                                        if(u.url==url){
                                            hasUrl=true;
                                        }
                                    });
                                    if(hasUrl)break;
                                }
                                diff=true;
                                if(!rulesData.sort)rulesData.sort=[1];
                                rulesData.urls.push({id:maxId+1,url:url,type:type});
                                rulesData.sort.unshift(maxId+1);
                            }
                            if(!diff){
                                showTips("Already exists!");
                                return;
                            }
                            storage.setItem("rulesData", rulesData);

                            if(rulesData.urls)ruleUrls=ruleUrls.concat(rulesData.urls);
                            if(rulesData.sort){
                                let urls=[];
                                rulesData.sort.forEach(id=>{
                                    for(let s=0;s<ruleUrls.length;s++){
                                        if(id==ruleUrls[s].id){
                                            urls.push(ruleUrls[s]);
                                            break;
                                        }
                                    }
                                });
                                ruleUrls=urls;
                            }
                            updateRules(()=>{
                                showTips(i18n("updateSucc"));
                                location.reload();
                            },(rule,err)=>{
                                showTips("Update "+rule.url+" rules fail!");
                            });
                            importing = true;
                            showTips(i18n("beginUpdate"));
                        }
                    } catch (e) {
                        _GM_notification(e.toString());
                    }
                });
                return importBtn;
            };
            [].forEach.call(document.querySelectorAll('pre[name=pagetual],pre[name=user-content-pagetual]'), pre => {
                let importBtn = createImportBtn();
                let clientHeight = 35 - pre.clientHeight;
                if (clientHeight > -20) clientHeight = -20;
                importBtn.style.marginTop = `${clientHeight}px`;
                pre.appendChild(importBtn);
            });
            document.addEventListener("mouseover", e => {
                if (e.target.tagName === "PRE") {
                    let nameAttr=e.target.getAttribute("name");
                    if(nameAttr=="pagetual" || nameAttr=="user-content-pagetual"){
                        if (e.target.querySelector('button')) return;
                        let importBtn = createImportBtn();
                        let clientHeight = 35 - e.target.clientHeight;
                        if (clientHeight > -20) clientHeight = -20;
                        importBtn.style.marginTop = `${clientHeight}px`;
                        e.target.appendChild(importBtn);
                    }
                }
            });

            if(inConfig){
                _GM_addStyle(`
                 p>span:nth-child(1),p>span:nth-child(2),p>span:nth-child(3){
                  cursor: pointer;
                  user-select: none;
                 }
                 p>span:nth-child(1):hover,p>span:nth-child(2):hover,p>span:nth-child(3):hover{
                  color:red;
                 }
                 .updateDate{
                  cursor: pointer;
                  user-select: none;
                 }
                 .updateDate:hover{
                  color:red;
                 }
                 input[type=number]::-webkit-inner-spin-button,
                 input[type=number]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                 }
                 input[type=number] {
                  -moz-appearance:textfield;
                 }
                `);
                document.querySelector("[name='user-content-click2import'],[name='click2import']").innerText=i18n("click2ImportRule")
                configCon=document.querySelector(".markdown-body");
                insertPos=configCon.querySelector("hr");

                if(!noRules){
                    document.querySelector("pre[name='user-content-pagetual'],pre[name='pagetual']").style.display="none";
                    document.querySelector("p[name='user-content-click2import'],p[name='click2import']").style.display="none";
                }
            }else return true;
        }else return false;
        class Rulebar {
            init(ruleUrl){
                this.ruleUrl=ruleUrl;
                this.item=document.createElement("p");
                this.item.dataset.id=this.ruleUrl.id;
                let url=document.createElement("span");
                url.innerHTML=ruleUrl.url;
                let up=document.createElement("span");
                up.innerHTML="↑ ";
                up.title=i18n("sortTitle");
                let down=document.createElement("span");
                down.innerHTML="↓ ";
                down.title=i18n("sortTitle");
                let del=document.createElement("span");
                del.innerHTML="× ";
                up.onclick=e=>{
                    this.moveUp();
                };
                down.onclick=e=>{
                    this.moveDown();
                };
                del.onclick=e=>{
                    this.del();
                };
                this.item.appendChild(up);
                this.item.appendChild(down);
                this.item.appendChild(del);
                this.item.appendChild(url);
                configCon.insertBefore(this.item, insertPos);
            }
            saveSort(){
                let sort=[];
                [].forEach.call(this.item.parentNode.querySelectorAll("p[data-id]"), i=>{
                    sort.push(i.dataset.id);
                });
                rulesData.sort=sort;
                storage.setItem("rulesData", rulesData);
            }
            moveUp(){
                let preE=this.item.previousElementSibling;
                if(preE.tagName=="P" && preE.children.length>1){
                    this.item.parentNode.insertBefore(this.item,preE);
                    this.saveSort();
                }
            }
            moveDown(){
                let nextE=this.item.nextElementSibling;
                if(nextE.tagName=="P" && nextE.children.length>1){
                    this.item.parentNode.insertBefore(nextE,this.item);
                    this.saveSort();
                }
            }
            del(){
                if(this.ruleUrl.id<2){
                    showTips(i18n("cantDel"));
                }else if(window.confirm(i18n("confirmDel"))){
                    for(let u=0;u<rulesData.urls.length;u++){
                        if(this.ruleUrl.id==rulesData.urls[u].id){
                            rulesData.urls.splice(u,1);
                            break;
                        }
                    }
                    for(let u=0;u<ruleUrls.length;u++){
                        if(this.ruleUrl.id==ruleUrls[u].id){
                            ruleUrls.splice(u,1);
                            break;
                        }
                    }
                    for(let u=0;u<rulesData.sort.length;u++){
                        if(this.ruleUrl.id==rulesData.sort[u]){
                            rulesData.sort.splice(u,1);
                            break;
                        }
                    }
                    storage.setItem("rulesData", rulesData);
                    ruleParser.rules=ruleParser.rules.filter(item=>{return item.from!=this.ruleUrl.id});
                    storage.setItem("rules", ruleParser.rules);
                    this.item.parentNode.removeChild(this.item);
                    //location.reload();
                }
            }
        }
        let updateP=document.createElement("p"),i=0;
        let now=new Date().getTime(),inUpdate=false;


        let pastDate=(new Date(updateDate)).toString(),passStr;
        let passTime=(now-updateDate)/1000;
        if(isNaN(passTime)){
            passStr=i18n("firstUpdate");
        }else if(passTime<60){
            passStr=i18n("passSec", parseInt(passTime))+" 👆 "+i18n("click2update");
        }else if(passTime<60*60){
            passStr=i18n("passMin", parseInt(passTime/60))+" 👆 "+i18n("click2update");
        }else if(passTime<60*60*24){
            passStr=i18n("passHour", parseInt(passTime/3600))+" 👆 "+i18n("click2update");
        }else{
            passStr=i18n("passDay", parseInt(passTime/86400))+" 👆 "+i18n("click2update");
        }


        updateP.className="updateDate";
        updateP.innerHTML=passStr;
        updateP.title=i18n("update")+" - "+pastDate;
        updateP.onclick=e=>{
            updateRules(()=>{
                showTips(i18n("updateSucc"));
                updateP.innerHTML=i18n("passSec", 0);
                updateP.title=i18n("update");
            },(rule,err)=>{
                showTips("Update "+rule.url+" rules fail!");
            });
            showTips(i18n("beginUpdate"));
        };
        configCon.insertBefore(updateP, insertPos);
        if(ruleUrls){
            ruleUrls.forEach(ruleUrl=>{
                var rulebar=new Rulebar();
                rulebar.init(ruleUrl);
            });
        }
        let customUrlsTitle=document.createElement("h2");
        customUrlsTitle.innerHTML=i18n("customUrls");
        configCon.insertBefore(customUrlsTitle, insertPos);
        let customUrlsInput=document.createElement("textarea");
        customUrlsInput.style.width="100%";
        customUrlsInput.placeholder="http://wedata.net/databases/AutoPagerize/items_all.json";
        customUrlsInput.spellcheck=false;
        configCon.insertBefore(customUrlsInput, insertPos);

        let btns=document.createElement("div");
        btns.style.display="flex";
        configCon.insertBefore(btns, insertPos);
        let upBtnImg=document.createElement("div");
        upBtnImg.style.width="50%";
        let upBtnImgTitle=document.createElement("h2");
        upBtnImgTitle.style.whiteSpace="nowrap";
        upBtnImgTitle.style.overflow="auto";
        upBtnImgTitle.innerHTML=i18n("upBtnImg");
        upBtnImg.appendChild(upBtnImgTitle);
        let upBtnImgInput=document.createElement("input");
        upBtnImgInput.style.width="100%";
        upBtnImgInput.placeholder="data:image/png;base64,UpBtn";
        upBtnImgInput.value=rulesData.upBtnImg||'';
        upBtnImgInput.spellcheck=false;
        upBtnImg.appendChild(upBtnImgInput);
        btns.appendChild(upBtnImg);

        let downBtnImg=document.createElement("div");
        downBtnImg.style.width="50%";
        let downBtnImgTitle=document.createElement("h2");
        downBtnImgTitle.style.whiteSpace="nowrap";
        downBtnImgTitle.style.overflow="auto";
        downBtnImgTitle.innerHTML=i18n("downBtnImg");
        downBtnImg.appendChild(downBtnImgTitle);
        let downBtnImgInput=document.createElement("input");
        downBtnImgInput.style.width="100%";
        downBtnImgInput.placeholder="data:image/png;base64,DownBtn";
        downBtnImgInput.value=rulesData.downBtnImg||'';
        downBtnImgInput.spellcheck=false;
        downBtnImg.appendChild(downBtnImgInput);
        btns.appendChild(downBtnImg);

        let otherBtns=document.createElement("div");
        otherBtns.style.display="flex";
        configCon.insertBefore(otherBtns, insertPos);
        let loadingText=document.createElement("div");
        loadingText.style.width="100%";
        let loadingTextTitle=document.createElement("h2");
        loadingTextTitle.style.whiteSpace="nowrap";
        loadingTextTitle.style.overflow="auto";
        loadingTextTitle.innerHTML=i18n("loadingTextTitle");
        loadingText.appendChild(loadingTextTitle);
        let loadingTextInput=document.createElement("input");
        loadingTextInput.value=rulesData.loadingText||'';
        loadingTextInput.placeholder=i18n("loadingText");
        loadingTextInput.style.width="100%";
        loadingTextInput.style.margin="0";
        loadingTextInput.spellcheck=false;
        loadingText.appendChild(loadingTextInput);
        otherBtns.appendChild(loadingText);

        let opacity=document.createElement("div");
        let opacityTitle=document.createElement("h2");
        opacityTitle.style.whiteSpace="nowrap";
        opacityTitle.style.overflow="visible";
        opacityTitle.innerHTML=i18n("opacity");
        opacity.appendChild(opacityTitle);
        let opacityInput=document.createElement("input");
        opacityInput.value=rulesData.opacity*100;
        opacityInput.type="number";
        opacityInput.style.width="110px";
        opacityInput.style.margin="0";
        opacityInput.placeholder=i18n("opacityPlaceholder");
        opacityInput.spellcheck=false;
        opacity.appendChild(opacityInput);
        otherBtns.appendChild(opacity);

        let pageElementCss=document.createElement("div");
        pageElementCss.style.marginBottom="30px";
        let pageElementCssTitle=document.createElement("h2");
        pageElementCssTitle.innerHTML=i18n("pageElementCss");
        pageElementCss.appendChild(pageElementCssTitle);
        let pageElementCssInput=document.createElement("input");
        pageElementCssInput.value=rulesData.pageElementCss||'';
        pageElementCssInput.style.width="100%";
        pageElementCssInput.style.margin="0";
        pageElementCssInput.placeholder="font-size: xx-large;";
        pageElementCssInput.spellcheck=false;
        pageElementCss.appendChild(pageElementCssInput);
        configCon.insertBefore(pageElementCss, insertPos);

        let customCss=document.createElement("div");
        customCss.style.marginBottom="50px";
        let customCssTitle=document.createElement("h2");
        customCssTitle.innerHTML=i18n("customCss");
        customCss.appendChild(customCssTitle);
        let customCssInput=document.createElement("textarea");
        customCssInput.value=rulesData.customCss||'';
        customCssInput.style.width="100%";
        customCssInput.style.margin="0";
        customCssInput.placeholder=".pagetual{\n}";
        customCssInput.spellcheck=false;
        customCss.appendChild(customCssInput);
        configCon.insertBefore(customCss, insertPos);

        let configTable=document.createElement("table");
        configTable.style.width="100%";
        let configTbody=document.createElement("tbody");
        configTbody.style.width="100%";
        configTbody.style.display="inline-table";
        configTable.appendChild(configTbody);
        configCon.insertBefore(configTable, insertPos);
        function createCheckbox(innerText, val, tag, parentCheck, otherType) {
            if (typeof val == 'undefined') val = "";
            let title=document.createElement(tag || "h3");
            title.innerHTML = innerText;
            title.style.overflowWrap = "normal";
            let input = document.createElement("input");
            if (otherType === 'key') {
                input.type = 'text';
                input.setAttribute('readOnly', 'readonly');
                input.addEventListener("keydown", e => {
                    if (e.key === 'Escape' || e.key === 'Backspace') input.value = '';
                    else input.value = e.key;
                    e.stopPropagation();
                    e.preventDefault();
                });
            } else {
                input.type = otherType || "checkbox";
            }
            input.style.width = "30px";
            input.style.height = "20px";
            input.style.float = "left";
            input.style.margin = "5px";
            input.value = val;
            input.checked = val;
            let td = document.createElement("td");
            td.appendChild(input);
            if (parentCheck) {
                title.style.margin = "0";
                td.appendChild(title);
                let parent = parentCheck.parentNode.nextElementSibling;
                let tr = parent.querySelector("tr");
                if (!tr) {
                    tr = document.createElement("tr");
                    parent.appendChild(tr);
                }
                tr.appendChild(td);
                if (!parentCheck.checked) {
                    td.style.display = "none";
                }
                parentCheck.addEventListener("click", e => {
                    td.style.display = parentCheck.checked ? "" : "none";
                });
            } else {
                let tr = document.createElement("tr");
                tr.appendChild(td);
                td = document.createElement("td");
                td.appendChild(title);
                tr.appendChild(td);
                configTable.children[0].appendChild(tr);
            }
            return input;
        }

        let enableWhiteListInput=createCheckbox(i18n("autoRun"), rulesData.enableWhiteList!=true);
        let enableDebugInput=createCheckbox(i18n("enableDebug"), rulesData.enableDebug!=false);
        let enableHistoryInput=createCheckbox(i18n("enableHistory"), rulesData.enableHistory===true);
        let enableHistoryAfterInsertInput=createCheckbox(i18n("enableHistoryAfterInsert"), rulesData.enableHistoryAfterInsert===true);
        let openInNewTabInput=createCheckbox(i18n("openInNewTab"), rulesData.openInNewTab!=false);
        let hideLoadingIconInput=createCheckbox(i18n("hideLoadingIcon"), rulesData.hideLoadingIcon!=false);
        let initRunInput=createCheckbox(i18n("initRun"), rulesData.initRun!=false);
        let autoLoadNumInput=createCheckbox(i18n("autoLoadNum"), rulesData.autoLoadNum, "h4", initRunInput, "number");
        let preloadInput=createCheckbox(i18n("preload"), rulesData.preload!=false);
        let dbClick2StopInput=createCheckbox(i18n("dbClick2Stop"), rulesData.dbClick2Stop);
        let manualModeInput=createCheckbox(i18n("manualMode"), rulesData.manualMode);
        let clickModeInput=createCheckbox(i18n("clickMode"), rulesData.clickMode);
        let pageBarMenuInput=createCheckbox(i18n("pageBarMenu"), rulesData.pageBarMenu);
        let arrowToScrollInput=createCheckbox(i18n("arrowToScroll"), rulesData.arrowToScroll);

        let hideBarInput = createCheckbox(i18n("hideBar"), rulesData.hideBar && !rulesData.hideBarButNoStop, "h4", dbClick2StopInput, 'radio');
        hideBarInput.name = 'hideBar';
        let hideBarButNoStopInput = createCheckbox(i18n("hideBarButNoStop"), rulesData.hideBarButNoStop, "h4", dbClick2StopInput, 'radio');
        hideBarButNoStopInput.name = 'hideBar';
        hideBarInput.addEventListener('mouseup', e => {
            if (hideBarInput.checked) {
                setTimeout(() => {hideBarInput.checked = false}, 0);
            }
        });
        hideBarButNoStopInput.addEventListener('mouseup', e => {
            if (hideBarButNoStopInput.checked) {
                setTimeout(() => {hideBarButNoStopInput.checked = false}, 0);
            }
        });

        let dbClick2StopCtrlInput=createCheckbox(i18n("dbClick2StopCtrl"), rulesData.dbClick2StopCtrl, "h4", dbClick2StopInput);
        let dbClick2StopAltInput=createCheckbox(i18n("dbClick2StopAlt"), rulesData.dbClick2StopAlt, "h4", dbClick2StopInput);
        let dbClick2StopShiftInput=createCheckbox(i18n("dbClick2StopShift"), rulesData.dbClick2StopShift, "h4", dbClick2StopInput);
        let dbClick2StopMetaInput=createCheckbox(i18n("dbClick2StopMeta"), rulesData.dbClick2StopMeta, "h4", dbClick2StopInput);
        let dbClick2StopKeyInput=createCheckbox(i18n("dbClick2StopKey"), rulesData.dbClick2StopKey, "h4", dbClick2StopInput, "key");

        let customRulesTitle=document.createElement("h2");
        customRulesTitle.innerHTML=i18n("customRules");
        configCon.insertBefore(customRulesTitle, insertPos);
        let customRulesInput=document.createElement("textarea");
        customRulesInput.spellcheck=false;
        configCon.insertBefore(customRulesInput, insertPos);
        if(rulesData.editTemp){
            if(!ruleParser.customRules){
                ruleParser.customRules=[];
            }
            for(let i in ruleParser.customRules){
                if(ruleParser.customRules[i].url==rulesData.editTemp.url){
                    ruleParser.customRules.splice(i, 1);
                    break;
                }
            }
            ruleParser.customRules.unshift(rulesData.editTemp);
            rulesData.editTemp=null;
            storage.setItem("rulesData", rulesData);
            customRulesInput.previousElementSibling.scrollIntoView();
        }
        customRulesInput.style.width="100%";
        customRulesInput.style.height="800px";
        customRulesInput.placeholder=`[\n  {\n    "name":"yande",\n    "action":"0",\n    "url":"^https:\/\/yande\\.re\/",\n    "pageElement":"ul#post-list-posts>li",\n    "nextLink":"a.next_page",\n    "css":".javascript-hide {display: inline-block !important;}"\n  },\n  {\n    "name":"tieba",\n    "action":"1",\n    "url":"^https:\/\/tieba\\.baidu.com\/f\\?kw=",\n    "pageElement":"ul#thread_list>li",\n    "nextLink":".next.pagination-item "\n  }\n]`;
        customRulesInput.value=getFormatJSON(ruleParser.customRules);
        let blacklistInput=document.createElement("textarea");
        blacklistInput.style.width="100%";
        blacklistInput.style.height="500px";
        blacklistInput.style.display="none";
        blacklistInput.spellcheck=false;
        blacklistInput.placeholder="http://*.xxx.com/*/y";
        blacklistInput.value=rulesData.blacklist?rulesData.blacklist.join("\n"):"";
        let blacklistBtn=document.createElement("button");
        blacklistBtn.innerText=i18n("editBlacklist");
        blacklistBtn.style.width="100%";
        blacklistBtn.onclick=e=>{
            blacklistInput.style.display=blacklistInput.style.display=="none"?"":"none";
        };
        configCon.insertBefore(blacklistBtn, insertPos);
        configCon.insertBefore(blacklistInput, insertPos);
        let saveBtn=document.createElement("button");
        saveBtn.innerHTML=i18n("save");
        saveBtn.style.width="100%";
        saveBtn.style.position="fixed";
        saveBtn.style.zIndex="999";
        saveBtn.style.bottom=0;
        saveBtn.style.left=0;
        saveBtn.style.fontSize="x-large";
        configCon.insertBefore(saveBtn, insertPos);
        saveBtn.onclick=e=>{
            try{
                storage.setItem("hpRules", []);
                storage.setItem("smartRules", []);
                if(customRulesInput.value==""){
                    storage.setItem("customRules", "");
                }else{
                    let customRules=JSON.parse(customRulesInput.value);
                    if(Array && Array.isArray && !Array.isArray(customRules)){
                        showTips("Rules must be a Array!");
                        return;
                    }
                    debug(customRules);
                    storage.setItem("customRules", customRules);
                    customRulesInput.value=JSON.stringify(customRules, null, 4);
                }
            }catch(e){
                debug(e);
                showTips("JSON error, check again!");
                return;
            }
            rulesData.opacity = opacityInput.value / 100;
            rulesData.blacklist = blacklistInput.value ? blacklistInput.value.split("\n") : "";
            rulesData.hideBar = hideBarInput.checked;
            rulesData.hideBarButNoStop = hideBarButNoStopInput.checked;
            rulesData.dbClick2Stop = dbClick2StopInput.checked;
            rulesData.enableWhiteList = !enableWhiteListInput.checked;
            rulesData.enableDebug = enableDebugInput.checked;
            rulesData.enableHistory = enableHistoryInput.checked;
            rulesData.enableHistoryAfterInsert = enableHistoryAfterInsertInput.checked;
            rulesData.openInNewTab = openInNewTabInput.checked;
            rulesData.hideLoadingIcon = hideLoadingIconInput.checked;
            rulesData.initRun = initRunInput.checked;
            rulesData.autoLoadNum = autoLoadNumInput.value !== "0" ? autoLoadNumInput.value : '';
            rulesData.preload = preloadInput.checked;
            rulesData.manualMode = manualModeInput.checked;
            rulesData.clickMode = clickModeInput.checked;
            rulesData.pageBarMenu = pageBarMenuInput.checked;
            rulesData.arrowToScroll = arrowToScrollInput.checked;
            rulesData.pageElementCss = pageElementCssInput.value;
            rulesData.customCss = customCssInput.value;
            rulesData.upBtnImg = upBtnImgInput.value;
            rulesData.downBtnImg = downBtnImgInput.value;
            rulesData.loadingText = loadingTextInput.value;
            rulesData.dbClick2StopCtrl = dbClick2StopCtrlInput.checked;
            rulesData.dbClick2StopAlt = dbClick2StopAltInput.checked;
            rulesData.dbClick2StopShift = dbClick2StopShiftInput.checked;
            rulesData.dbClick2StopMeta = dbClick2StopMetaInput.checked;
            rulesData.dbClick2StopKey = dbClick2StopKeyInput.value;
            storage.setItem("rulesData", rulesData);
            let customUrls = customUrlsInput.value.trim();
            if (customUrls) {
                customUrls = customUrls.split(/\n/);
                for (let c = 0; c < customUrls.length; c++) {
                    let url;
                    if(/^0\s*\|/.test(customUrls[c])){
                        url=customUrls[c].replace(/^0\s*\|\s*/, "").trim();
                        if(!/^http/.test(url)){
                            showTips("Wrong url, check again!");
                            return;
                        }
                    }else{
                        url=customUrls[c].trim();
                        if(!/^http/.test(url)){
                            showTips("Wrong url, check again!");
                            return;
                        }
                    }
                    let maxId=1,hasUrl=false;
                    if(!rulesData.urls){
                        rulesData.urls=[];
                    }
                    ruleUrls.forEach(u=>{
                        if(maxId<u.id){
                            maxId=u.id;
                        }
                        if(u.url==url){
                            hasUrl=true;
                        }
                    });
                    if(hasUrl)break;
                    if(!rulesData.sort)rulesData.sort=[1];
                    rulesData.urls.push({id:maxId+1,url:url});
                    rulesData.sort.push(maxId+1);
                    storage.setItem("rulesData", rulesData);
                }
            }
            showTips("The settings are saved, refresh to view");
            //location.reload();
        };
        return true;
    }

    var inUpdate=false;
    function updateRules(success,fail){
        if(inUpdate)return;
        inUpdate=true;
        let ruleIndex=ruleUrls.length-1;
        storage.setItem("hpRules", []);
        storage.setItem("smartRules", []);
        function addNextRule(){
            if(ruleIndex<0){
                let now=new Date().getTime();
                storage.setItem("ruleLastUpdate", now);
                storage.setItem("rules", ruleParser.rules);
                inUpdate=false;
                success();
            }else{
                let rule=ruleUrls[ruleIndex--];
                ruleParser.addRuleByUrl(rule.url, rule.id, (json,err)=>{
                    if(!json){
                        fail(rule,err);
                    }
                    addNextRule();
                })
            }
        }
        addNextRule();
    }

    function objIsArr(obj) {
        return obj &&
            typeof obj === 'object' &&
            typeof obj.length === 'number' &&
            !(obj.propertyIsEnumerable('length'));
    }

    function isVisible(el, win) {
        if(!el || !el.offsetParent)return false;
        var loopable = true,
            visible = el.tagName && win.getComputedStyle(el).display != 'none' && win.getComputedStyle(el).visibility != 'hidden';
        while(loopable && visible) {
            el = el.parentNode;

            if(el && el.tagName && el.tagName!="BODY") {
                visible = win.getComputedStyle(el).display != 'none' && win.getComputedStyle(el).visibility != 'hidden';
            }else {
                loopable = false;
            }
        }
        return visible;
    }

    function getElementTop(ele) {
        var actualTop = ele.offsetTop;
        var current = ele.offsetParent;
        while (current) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    function getElementBottom(ele) {
        return getElementTop(ele) + ele.offsetHeight;
    }

    function getFormatJSON(obj){
        if(!objIsArr(obj) || obj.length === 0)return "";
        return JSON.stringify(obj, null, 4);
        let ret="[\n";
        let len=obj.length,i=0,isLast;
        obj.forEach(item=>{
            ret+="  {\n";
            let iLen=Object.keys(item).length,j=0;
            for(let key in item){
                isLast=(++j)==iLen;
                let value=item[key];
                if(objIsArr(value)){
                    let vstr="[",v=0,vIsLast=false;
                    value.forEach(vi=>{
                        vIsLast=(++v)==value.length;
                        vstr+="\""+vi.replace(/\\/g,"\\\\")+"\""+(vIsLast?"":",");
                    });
                    vstr+="]";
                    ret+="    \""+key+"\":"+vstr+""+(isLast?"":",")+"\n";
                }else{
                    if(typeof value=="string"){
                        value=value.replace(/\\/g,"\\\\").replace(/"/g,"\\\"");
                        value="\""+value+"\"";
                    }
                    ret+="    \""+key+"\":"+value+""+(isLast?"":",")+"\n";
                }
            }
            isLast=(++i)==len;
            ret+="  }"+(isLast?"":",")+"\n";
        });
        ret+="]";
        return ret;
    }

    function globMatch(first, second) {
        if (first.length == 0 && second.length == 0){
            return true;
        }

        if (first.length > 1 && first[0] == '*' &&
            second.length == 0){
            return false;
        }

        if ((first.length > 1 && first[0] == '?') ||
            (first.length != 0 && second.length != 0 &&
             first[0] == second[0])){
            return globMatch(first.substring(1),
                         second.substring(1));
        }

        if (first.length > 0 && first[0] == '*'){
            return globMatch(first.substring(1), second) ||
                globMatch(first, second.substring(1));
        }

        return false;
    }

    function initRules(callback) {
        /*0 wedata格式，1 pagetual格式*/
        ruleUrls=[
            {
                id:1,
                url:'http://wedata.net/databases/AutoPagerize/items_all.json',
                type:0,
            }
        ];var i=0,j=0;

        ruleParser.initSavedRules(()=>{
            storage.getItem("rulesData", data=>{
                if(data){
                    rulesData=data;
                    if(data.urls)ruleUrls=ruleUrls.concat(data.urls);
                    if(data.sort){
                        let urls=[];
                        data.sort.forEach(id=>{
                            for(let s=0;s<ruleUrls.length;s++){
                                if(id==ruleUrls[s].id){
                                    urls.push(ruleUrls[s]);
                                    break;
                                }
                            }
                        });
                        ruleUrls=urls;
                    }
                }
                let upBtnImg=rulesData.upBtnImg,downBtnImg=rulesData.downBtnImg;
                if(upBtnImg && downBtnImg){
                    downSvgCSS=downSvgCSS.replace("transform: rotate(180deg);","");
                }else if(upBtnImg && !downBtnImg){
                    downBtnImg=upBtnImg;
                }else if(downBtnImg && !upBtnImg){
                    upBtnImg=downBtnImg;
                }
                if(upBtnImg){
                    upSvg=`<img class="pagetual" src="${upBtnImg}"/>`;
                }
                if(downBtnImg){
                    downSvg=`<img class="pagetual" src="${downBtnImg}"/>`;
                }
                setLoadingDiv(rulesData.loadingText || i18n("loadingText"));
                if(typeof(rulesData.opacity)=="undefined"){
                    rulesData.opacity=0.3;
                }
                if(typeof(rulesData.hideBar)=="undefined"){
                    rulesData.hideBar=false;
                }
                if(typeof(rulesData.dbClick2Stop)=="undefined"){
                    rulesData.dbClick2Stop=true;
                }
                if(typeof(rulesData.enableWhiteList)=="undefined"){
                    rulesData.enableWhiteList=false;
                }
                if(typeof(rulesData.enableHistory)=="undefined"){
                    rulesData.enableHistory=false;
                }
                if(typeof(rulesData.openInNewTab)=="undefined"){
                    rulesData.openInNewTab=true;
                }
                if(typeof(rulesData.enableDebug)=="undefined"){
                    rulesData.enableDebug=true;
                }
                if(typeof(rulesData.initRun)=="undefined"){
                    rulesData.initRun=true;
                }
                if(typeof(rulesData.preload)=="undefined"){
                    rulesData.preload=true;
                }
                if(typeof(rulesData.manualMode)=="undefined"){
                    rulesData.manualMode=false;
                }
                if(typeof(rulesData.clickMode)=="undefined"){
                    rulesData.clickMode=false;
                }
                if(typeof(rulesData.pageBarMenu)=="undefined"){
                    rulesData.pageBarMenu=false;
                }
                if(typeof(rulesData.arrowToScroll)=="undefined"){
                    rulesData.arrowToScroll=false;
                }
                if(typeof(rulesData.hideLoadingIcon)=="undefined"){
                    rulesData.hideLoadingIcon=false;
                }
                if(rulesData.blacklist && rulesData.blacklist.length>0){
                    for(let b in rulesData.blacklist){
                        let curGlob=rulesData.blacklist[b];
                        if(globMatch(curGlob, location.href)){
                            return;
                        }
                    }
                }
                if(rulesData.autoLoadNum){
                    autoLoadNum=parseInt(rulesData.autoLoadNum);
                }
                enableDebug=rulesData.enableDebug;
                storage.getItem("nextSwitch_"+location.host, i=>{
                    storage.getItem("forceState_"+location.host, v=>{
                        storage.getItem("ruleLastUpdate", date=>{
                            if(typeof(i)!=="undefined"){
                                nextIndex=i;
                            }
                            if(typeof(v)=="undefined"){
                                v=(rulesData.enableWhiteList?1:0);
                            }
                            forceState=v;
                            updateDate=date;
                            if(initConfig())return;
                            if(forceState==1)return;
                            let now=new Date().getTime();
                            if(!date || now-date>2*24*60*60*1000){
                                updateRules(()=>{
                                },(rule,err)=>{});
                                storage.setItem("ruleLastUpdate", now);
                            }
                            callback();
                        });
                    });
                });
            });
        });
    }

    function requestDoc(url, callback){
        _GM_xmlhttpRequest({
            url: url,
            method: 'GET',
            overrideMimeType: 'text/html;charset='+document.charset,
            headers: {
                'Referer': location.href,
                "Content-Type": "text/html;charset="+document.charset,
            },
            timeout: 5000,
            onload: function(res) {
                var doc=null,response=res.response;
                let preCode=ruleParser.curSiteRule.pageElementPre || ruleParser.curSiteRule.pagePre;
                if(preCode){
                    try{
                        if (typeof _unsafeWindow.pagetualPagePre!='undefined') {
                            response = _unsafeWindow.pagetualPagePre(response);
                        } else if (preCode.length == 2) {
                            response = response.replace(new RegExp(preCode[0], "gi"), preCode[1]);
                        } else {
                            response = Function("response",'"use strict";' + preCode)(response);
                        }
                    }catch(e){
                        debug(e);
                    }
                }
                try {
                    doc=document.implementation.createHTMLDocument('');
                    doc.documentElement.innerHTML=response;
                    let base=doc.querySelector("base");
                    ruleParser.basePath=base?base.href:url;
                }
                catch (e) {
                    debug('parse error'+e.toString());
                }
                let pageElement=ruleParser.getPageElement(doc);
                if(inCors && (!pageElement || pageElement.length==0)){
                    ruleParser.curSiteRule.pageElement=allOfBody;
                    pageElement=ruleParser.getPageElement(doc);
                    ruleParser.getInsert(true);
                }
                //只有1的話怕不是圖片哦
                if(pageElement && (pageElement.length>1 || (pageElement.length==1 && pageElement[0].tagName!="IMG") )){
                    ruleParser.insertPage(doc, pageElement, url, callback, false);
                    if(ruleParser.curSiteRule.action==1){
                        requestFromIframe(url, (doc, eles)=>{
                            loadPageOver();
                            if(eles){
                                ruleParser.insertPage(doc, eles, url, callback, true);
                            }
                        });
                    }else ruleParser.curSiteRule.action=0;
                }else if(ruleParser.curSiteRule.singleUrl || curPage==1){
                    ruleParser.curSiteRule.action=1;
                    requestFromIframe(url, (doc, eles)=>{
                        loadPageOver();
                        if(eles){
                            ruleParser.insertPage(doc, eles, url, callback, true);
                        }
                    });
                }else{
                    debug("Stop as no page element");
                    isPause=true;
                    callback(false);
                }
            },
            onerror: function(e){
                debug(e);
                callback(false);
            },
            ontimeout: function(e){
                debug(e);
                callback(false);
            }
        });
    }

    function initPage(){
        ruleParser.initPage(()=>{
            if(ruleParser.curSiteRule.autoLoadNum){
                autoLoadNum=ruleParser.curSiteRule.autoLoadNum;
            }
            if(ruleParser.curSiteRule.nextLink && Array && Array.isArray && Array.isArray(ruleParser.curSiteRule.nextLink)){
                _GM_registerMenuCommand(i18n("nextSwitch"), ()=>{
                    NextSwitch.getInstance().start();
                });
            }
            if(ruleParser.nextLinkHref){
                let isJs=/^(javascript|#)/.test(ruleParser.nextLinkHref.replace(location.href,""));
                if(!isJs){
                    let inForce=(forceState == 2 || forceState == 3);
                    _GM_registerMenuCommand(i18n(inForce?"cancelForceIframe":"forceIframe"), ()=>{
                        if(inForce){
                            storage.setItem("forceState_"+location.host, "");
                        }else{
                            let _state=ruleParser.curSiteRule.action>0 || confirm(i18n("forceAllBody"))?2:3;
                            storage.setItem("forceState_"+location.host, _state);
                        }
                        location.reload();
                    });
                }
                _GM_registerMenuCommand(i18n("loadNow"), ()=>{
                    let loadNum=window.prompt(i18n("loadConfirm"), "1");
                    if(loadNum==="" || loadNum===null)return;
                    autoLoadNum=Math.abs(parseInt(loadNum));
                    nextPage();
                });
            }
            initListener();
            let initRun = typeof ruleParser.curSiteRule.initRun == 'undefined' ? rulesData.initRun : ruleParser.curSiteRule.initRun;
            if (initRun && initRun != 0 && initRun != '0') nextPage();
        });
    }

    var pageBarStyle;
    function initView(){
        _GM_addStyle(`
         .pagetual_pageBar{
           -moz-transition:opacity 0.3s ease-in-out 0s;
           -webkit-transition:opacity 0.3s ease-in-out 0s;
           transition:opacity 0.3s ease-in-out 0s;
           font-family: Arial,sans-serif !important;
         }
         .pagetual_pageBar.stop {
           -webkit-filter: invert(100%);
           filter: invert(100%);
           opacity: 1!important;
         }
         .pagetual_pageBar.hide {
           display: none!important;
         }
         .pagetual_pageBar:hover {
           opacity: 1!important;
         }
         .pagetual_pageBar span {
           vertical-align: super;
         }
         .pagetual_pageBar a>span {
           margin-top: 0!important;
           pointer-events: none;
           opacity: 0;
           -moz-transition:all 0.3s ease-in-out 0s;
           -webkit-transition:all 0.3s ease-in-out 0s;
           transition:all 0.3s ease-in-out 0s;
         }
         .pagetual_pageBar a>span:hover {
           color: red;
         }
         .pagetual_pageBar a:hover>span {
           opacity: 1;
         }
         .pagetual_pageBar span.prevScreen,
         .pagetual_pageBar span.nextScreen {
           display: block!important;
         }
         .pagetual_pageBar a:hover>span.prevScreen {
           margin-top: -30px!important;
           pointer-events: all;
         }
         .pagetual_pageBar a:hover>span.nextScreen {
           margin-top: 30px!important;
           pointer-events: all;
         }
         .pagetual_pageBar span>svg {
           -moz-transition:transform 0.5s ease, opacity 0.3s ease;
           -webkit-transition:transform 0.5s ease, opacity 0.3s ease;
           transition:transform 0.5 ease, opacity 0.3s ease;
           opacity: 0;
         }
         .pagetual_pageBar:hover span>svg {
           opacity: 1;
         }
         .pagetual_pageBar span>svg.upSvg:hover {
           transform: rotate(360deg) scale3d(1.2, 1.2, 1.2);
         }
         .pagetual_pageBar span>svg.downSvg:hover {
           transform: rotate(540deg) scale3d(1.2, 1.2, 1.2)!important;
         }
         .pagetual_pageBar .pagetual_pageNum{
           color: #55555f;
         }
         .pagetual_pageBar .pagetual_pageNum:hover{
           color: #ff6464;
         }
         .pagetual_tipsWords{
           font-size: 50px;
           font-weight: bold;
           font-family: "黑体", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
             "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
             "Segoe UI Emoji", "Segoe UI Symbol";
           color: #ffffff;
           min-height: 70px;
           max-width: 80%;
           line-height: 70px;
           position: fixed;
           left: 50%;
           top: 10%;
           margin-left: -150px;
           padding: 0 10px;
           z-index: 999999999;
           background-color: #000;
           border: 1px solid black;
           border-radius: 10px;
           opacity: 0;
           filter: alpha(opacity=65);
           box-shadow: 5px 5px 20px 0px #000;
           -moz-transition:opacity 0.3s ease-in-out 0s;
           -webkit-transition:opacity 0.3s ease-in-out 0s;
           transition:opacity 0.3s ease-in-out 0s;
           pointer-events: none;
         }
         .pagetual_loading {
           width: 50px;
           height: 50px;
           margin: 10px auto;
           border-radius: 100%;
           display: flex;
           -webkit-animation: pagetual_loading_scaleout 1.0s infinite ease-in-out;
           animation: pagetual_loading_scaleout 1.0s infinite ease-in-out;
         }
         @-webkit-keyframes pagetual_loading_scaleout {
           0% { -webkit-transform: scale(0.0) }
           100% {
             -webkit-transform: scale(1.0);
             opacity: 0;
           }
         }
         @keyframes pagetual_loading_scaleout {
           0% {
             transform: scale(0.0);
             -webkit-transform: scale(0.0);
           } 100% {
           transform: scale(1.0);
             -webkit-transform: scale(1.0);
             opacity: 0;
           }
         }
         .pagetual_loading_text {
           white-space: nowrap;
           -webkit-animation: pagetual_loading_opacity 2.6s infinite ease-in-out;
           animation: pagetual_loading_opacity 2.6s infinite ease-in-out;
         }
         @-webkit-keyframes pagetual_loading_opacity {
           0% { opacity: 1 }
           50% { opacity: 0.2 }
           100% { opacity: 1 }
         }
         @keyframes pagetual_loading_opacity {
           0% { opacity: 1 }
           50% { opacity: 0.2 }
           100% { opacity: 1 }
         }
        `);
        pageBarStyle=`vertical-align: super;line-height:1;opacity:${rulesData.opacity};display:${rulesData.opacity==0?"none":"inline-flex"};padding:0;box-shadow: 0px 0px 10px 0px #000000aa;border-radius: 20px;background-color: rgb(240 240 240 / 80%);font-size: 30px;visibility: visible; position: initial; width: auto; height: 30px; float: none; clear: both; margin: 5px auto; text-align: center!important;justify-content: center;`;
    }
    var loadingDiv=document.createElement("div");
    loadingDiv.style.cssText="cy: initial;d: initial;dominant-baseline: initial;empty-cells: initial;fill: initial;fill-opacity: initial;fill-rule: initial;filter: initial;flex: initial;flex-flow: initial;float: initial;flood-color: initial;flood-opacity: initial;grid: initial;grid-area: initial;height: initial;hyphens: initial;image-orientation: initial;image-rendering: initial;inline-size: initial;inset-block: initial;inset-inline: initial;isolation: initial;letter-spacing: initial;lighting-color: initial;line-break: initial;list-style: initial;margin-block: initial;margin: 0px auto;margin-inline: initial;marker: initial;mask: initial;mask-type: initial;max-block-size: initial;max-height: initial;max-inline-size: initial;max-width: initial;min-block-size: initial;min-height: initial;min-inline-size: initial;min-width: initial;mix-blend-mode: initial;object-fit: initial;object-position: initial;offset: initial;opacity: initial;order: initial;origin-trial-test-property: initial;orphans: initial;outline: initial;outline-offset: initial;overflow-anchor: initial;overflow-clip-margin: initial;overflow-wrap: initial;overflow: initial;overscroll-behavior-block: initial;overscroll-behavior-inline: initial;overscroll-behavior: initial;padding-block: initial;padding: initial;padding-inline: initial;page: initial;page-orientation: initial;paint-order: initial;perspective: initial;perspective-origin: initial;pointer-events: initial;position: initial;quotes: initial;r: initial;resize: initial;ruby-position: initial;rx: initial;ry: initial;scroll-behavior: initial;scroll-margin-block: initial;scroll-margin: initial;scroll-margin-inline: initial;scroll-padding-block: initial;scroll-padding: initial;scroll-padding-inline: initial;scroll-snap-align: initial;scroll-snap-stop: initial;scroll-snap-type: initial;scrollbar-gutter: initial;shape-image-threshold: initial;shape-margin: initial;shape-outside: initial;shape-rendering: initial;size: initial;speak: initial;stop-color: initial;stop-opacity: initial;stroke: initial;stroke-dasharray: initial;stroke-dashoffset: initial;stroke-linecap: initial;stroke-linejoin: initial;stroke-miterlimit: initial;stroke-opacity: initial;stroke-width: initial;tab-size: initial;table-layout: initial;text-align: initial;text-align-last: initial;text-anchor: initial;text-combine-upright: initial;text-decoration: initial;text-decoration-skip-ink: initial;text-indent: initial;text-overflow: initial;text-shadow: initial;text-size-adjust: initial;text-transform: initial;text-underline-offset: initial;text-underline-position: initial;touch-action: initial;transform: initial;transform-box: initial;transform-origin: initial;transform-style: initial;transition: initial;user-select: initial;vector-effect: initial;vertical-align: initial;visibility: initial;border-spacing: initial;-webkit-border-image: initial;-webkit-box-align: initial;-webkit-box-decoration-break: initial;-webkit-box-direction: initial;-webkit-box-flex: initial;-webkit-box-ordinal-group: initial;-webkit-box-orient: initial;-webkit-box-pack: initial;-webkit-box-reflect: initial;-webkit-highlight: initial;-webkit-hyphenate-character: initial;-webkit-line-break: initial;-webkit-line-clamp: initial;-webkit-mask-box-image: initial;-webkit-mask: initial;-webkit-mask-composite: initial;-webkit-perspective-origin-x: initial;-webkit-perspective-origin-y: initial;-webkit-print-color-adjust: initial;-webkit-rtl-ordering: initial;-webkit-ruby-position: initial;-webkit-tap-highlight-color: initial;-webkit-text-combine: initial;-webkit-text-decorations-in-effect: initial;-webkit-text-emphasis: initial;-webkit-text-emphasis-position: initial;-webkit-text-fill-color: initial;-webkit-text-security: initial;-webkit-text-stroke: initial;-webkit-transform-origin-x: initial;-webkit-transform-origin-y: initial;-webkit-transform-origin-z: initial;-webkit-user-drag: initial;-webkit-user-modify: initial;white-space: initial;widows: initial;width: initial;will-change: initial;word-break: initial;word-spacing: initial;x: initial;y: initial;z-index: 2147483647;";

    const loadingCSS=`display: block; position: initial; margin: auto auto 5px auto; shape-rendering: auto; vertical-align: middle; visibility: visible; width: initial; height: initial; text-align: center; color: #6e6e6e; flex: 0;`;
    function setLoadingDiv(loadingText){
        loadingDiv.innerHTML=`<p class="pagetual_loading_text" style="${loadingCSS}display: inline-block;">${loadingText}</p>${rulesData.hideLoadingIcon ? "" : `<div class="pagetual_loading"><svg width="50" height="50" style="position:relative;cursor: pointer;width: 50px;height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#6e6e6e"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#6e6e6e"></path></svg></div>`}`;
    }

    var upSvg=`<svg width="30" height="30" class="upSvg pagetual" style="display:initial;position:relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#604b4a"></path></svg>`;
    var upSvgCSS=`display:initial;position:relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;`;
    var downSvg=`<svg width="30" height="30" class="downSvg pagetual" style="display:initial;position:relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;transform: rotate(180deg);" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#604b4a"></path></svg>`;
    var downSvgCSS=`display:initial;position:relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;transform: rotate(180deg);`;

    const initStyle=`display: contents;right: unset;left: unset;top: unset;bottom: unset;inset: unset;clear: both;cy: initial;d: initial;dominant-baseline: initial;empty-cells: initial;fill: initial;fill-opacity: initial;fill-rule: initial;filter: initial;flex: initial;flex-flow: initial;float: initial;flood-color: initial;flood-opacity: initial;grid: initial;grid-area: initial;height: initial;hyphens: initial;image-orientation: initial;image-rendering: initial;inline-size: initial;inset-block: initial;inset-inline: initial;isolation: initial;letter-spacing: initial;lighting-color: initial;line-break: initial;list-style: initial;margin-block: initial;margin: 0px 5px;margin-inline: initial;marker: initial;mask: initial;mask-type: initial;max-block-size: initial;max-height: initial;max-inline-size: initial;max-width: initial;min-block-size: initial;min-height: initial;min-inline-size: initial;min-width: initial;mix-blend-mode: initial;object-fit: initial;object-position: initial;offset: initial;opacity: initial;order: initial;orphans: initial;outline: initial;outline-offset: initial;overflow-anchor: initial;overflow-clip-margin: initial;overflow-wrap: initial;overflow: initial;overscroll-behavior-block: initial;overscroll-behavior-inline: initial;overscroll-behavior: initial;padding-block: initial;padding: initial;padding-inline: initial;page: initial;page-orientation: initial;paint-order: initial;perspective: initial;perspective-origin: initial;pointer-events: initial;position: relative;quotes: initial;r: initial;resize: initial;ruby-position: initial;rx: initial;ry: initial;scroll-behavior: initial;scroll-margin-block: initial;scroll-margin: initial;scroll-margin-inline: initial;scroll-padding-block: initial;scroll-padding: initial;scroll-padding-inline: initial;scroll-snap-align: initial;scroll-snap-stop: initial;scroll-snap-type: initial;scrollbar-gutter: initial;shape-image-threshold: initial;shape-margin: initial;shape-outside: initial;shape-rendering: initial;size: initial;speak: initial;stop-color: initial;stop-opacity: initial;stroke: initial;stroke-dasharray: initial;stroke-dashoffset: initial;stroke-linecap: initial;stroke-linejoin: initial;stroke-miterlimit: initial;stroke-opacity: initial;stroke-width: initial;tab-size: initial;table-layout: initial;text-align: initial;text-align-last: initial;text-anchor: initial;text-combine-upright: initial;text-decoration: initial;text-decoration-skip-ink: initial;text-indent: initial;text-overflow: initial;text-shadow: initial;text-size-adjust: initial;text-transform: initial;text-underline-offset: initial;text-underline-position: initial;touch-action: initial;transform: initial;transform-box: initial;transform-origin: initial;transform-style: initial;transition: initial;user-select: initial;vector-effect: initial;vertical-align: initial;visibility: initial;border-spacing: initial;-webkit-border-image: initial;-webkit-box-align: initial;-webkit-box-decoration-break: initial;-webkit-box-direction: initial;-webkit-box-flex: initial;-webkit-box-ordinal-group: initial;-webkit-box-orient: initial;-webkit-box-pack: initial;-webkit-box-reflect: initial;-webkit-highlight: initial;-webkit-hyphenate-character: initial;-webkit-line-break: initial;-webkit-line-clamp: initial;-webkit-mask-box-image: initial;-webkit-mask: initial;-webkit-mask-composite: initial;-webkit-perspective-origin-x: initial;-webkit-perspective-origin-y: initial;-webkit-print-color-adjust: initial;-webkit-rtl-ordering: initial;-webkit-ruby-position: initial;-webkit-tap-highlight-color: initial;-webkit-text-combine: initial;-webkit-text-decorations-in-effect: initial;-webkit-text-emphasis: initial;-webkit-text-emphasis-position: initial;-webkit-text-fill-color: initial;-webkit-text-security: initial;-webkit-text-stroke: initial;-webkit-transform-origin-x: initial;-webkit-transform-origin-y: initial;-webkit-transform-origin-z: initial;-webkit-user-drag: initial;-webkit-user-modify: initial;white-space: initial;widows: initial;width: initial;will-change: initial;word-break: initial;word-spacing: initial;x: initial;y: initial;`;
    const pageTextStyle=`background: unset!important;line-height: 30px;text-decoration: none;user-select: none;visibility: visible;position: initial;width: auto;max-width: 80%; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;height: auto;float: none;clear: both;margin: 0px;text-align: center;display: inline-block;font-weight: bold;font-style: normal;font-size: 16px;letter-spacing: initial;vertical-align: top;color: rgb(85, 85, 95)!important;`;

    var tipsWords=document.createElement("div");
    tipsWords.className="pagetual_tipsWords";

    var isPause = false, isHideBar = false, isLoading = false, curPage = 1, forceState = 0, bottomGap = 1000, autoLoadNum = -1, nextIndex = 0, stopScroll = false;

    function changeStop(stop) {
        isPause = stop;
        [].forEach.call(document.querySelectorAll(".pagetual_pageBar"), bar => {
            if (isPause) {
                bar.classList.add("stop");
            } else {
                bar.classList.remove("stop");
            }
        });
    }

    function changeHideBar(hide) {
        isHideBar = hide;
        [].forEach.call(document.querySelectorAll(".pagetual_pageBar"), bar => {
            if (isHideBar) {
                bar.classList.add("hide");
            } else {
                bar.classList.remove("hide");
            }
        });
    }

    function isInViewPort(element) {
        if(!document.body.contains(element))return false;
        if(_unsafeWindow.getComputedStyle(element).display=="none")return false;
        const viewWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        const {
            top,
            right,
            bottom,
            left,
        } = element.getBoundingClientRect();

        return (
            top >= 0 &&
            left >= 0 &&
            right <= viewWidth + 1 &&
            bottom <= viewHeight * 2
        );
    }

    var urlChanged=false;
    var _wr = function(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    var changeHandler = e => {
        urlChanged = true;
        isPause = true;
        setTimeout(() => {
            lastActiveUrl = location.href;
            if (location.href == configPage[0] || guidePage.test(location.href)) {
                location.reload();
            } else if (!ruleParser.ruleMatch(ruleParser.curSiteRule)) {
                initPage();
            }
            if (!ruleParser.nextLinkHref) isLoading = false;
        },1);
    };
    history.pushState = _wr('pushState');
    window.addEventListener('pushState', changeHandler);

    function initListener(){
        let loadmoreBtn,loading=true,lastScroll=0,checkLoadMoreTimes=0;
        if (ruleParser.curSiteRule.loadMore) {
            loading=false;
        } else {
            let checkLoadMore=setInterval(()=>{
                loadmoreBtn=getLoadMore(document);
                if(loadmoreBtn && isVisible(loadmoreBtn, _unsafeWindow)){
                    loading=false;
                    clearInterval(checkLoadMore);
                }else if(checkLoadMoreTimes++>30){
                    clearInterval(checkLoadMore);
                }
            },300);
        }
        let clickMode = typeof ruleParser.curSiteRule.clickMode == 'undefined' ? rulesData.clickMode : ruleParser.curSiteRule.clickMode;
        let clickNext=() => {
            let nextLink=ruleParser.nextLinkHref;
            if(!nextLink)return;
            let isJs=/^(javascript|#)/.test(nextLink.replace(location.href,""));
            if(isJs){
                let nextBtn=ruleParser.getNextLink(document);
                if(nextBtn)emuClick(nextBtn);
            }else{
                window.location.href = nextLink;
            }
        };
        let checkScrollReach=()=>{
            let scrolly=window.scrollY;
            let windowHeight=window.innerHeight || document.documentElement.clientHeight;
            let scrollH=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            if(clickMode){
                if(scrollH-scrolly-windowHeight<10){
                    clickNext();
                }
            }else if(scrollH-scrolly-windowHeight<bottomGap){
                nextPage();
            }
        };
        let scrollHandler = e=>{
            if(urlChanged && !isLoading){
                ruleParser.initPage(()=>{
                    if(ruleParser.nextLinkHref){
                        initView();
                    }
                    isPause=false;
                });
                urlChanged=false;
            }
            if(isPause)return;
            if(!loading){
                if(ruleParser.curSiteRule.loadMore || !loadmoreBtn || !document.body.contains(loadmoreBtn)){
                    loadmoreBtn=getLoadMore(document);
                }
                if(loadmoreBtn){
                    if(isInViewPort(loadmoreBtn)){
                        emuClick(loadmoreBtn);
                        loading=true;
                        setTimeout(()=>{loading=false},200);
                    }
                }else{
                    loading=true;
                    setTimeout(()=>{loading=false},200);
                }
            }
            if(!isLoading && !stopScroll){
                checkScrollReach();
            }
            if(ruleParser.curSiteRule.lockScroll){
                let curScroll=document.body.scrollTop||document.documentElement.scrollTop;
                if(isLoading && Math.abs(lastScroll-curScroll)>350){
                    document.body.scrollTop=lastScroll;
                    document.documentElement.scrollTop=lastScroll;
                }else{
                    lastScroll=curScroll;
                }
            }
        };
        document.addEventListener('dblclick', e=>{
            if(forceState==1 || e.target.tagName=='INPUT' || e.target.tagName=='TEXTAREA') return;
            if(!rulesData.dbClick2StopKey){
                if((rulesData.dbClick2StopCtrl && !e.ctrlKey) ||
                   (rulesData.dbClick2StopAlt && !e.altKey) ||
                   (rulesData.dbClick2StopShift && !e.shiftKey) ||
                   (rulesData.dbClick2StopMeta && !e.metaKey)){
                    return;
                }
            }
            if(e.target.tagName !== "BODY" && e.target.className !== 'pagetual_pageBar'){
                let selStr=document.getSelection().toString();
                if(selStr && selStr.trim()){
                    return;
                }
            }
            if(rulesData.dbClick2Stop && (ruleParser.nextLinkHref || loadmoreBtn)){
                setTimeout(()=>{
                    if (rulesData.hideBarButNoStop || rulesData.hideBar) {
                        changeHideBar(!isHideBar);
                    }
                    if (!rulesData.hideBarButNoStop) {
                        changeStop(!isPause);
                        showTips(i18n(isPause?"disable":"enable"));
                    }
                    if(!isPause){
                        checkScrollReach();
                    }
                },10);
            }
        });
        if(rulesData.dbClick2StopKey){
            document.addEventListener('keydown', e=>{
                if((rulesData.dbClick2StopCtrl && !e.ctrlKey) ||
                   (rulesData.dbClick2StopAlt && !e.altKey) ||
                   (rulesData.dbClick2StopShift && !e.shiftKey) ||
                   (rulesData.dbClick2StopMeta && !e.metaKey)){
                    return;
                }
                if (document.activeElement &&
                    (document.activeElement.tagName == 'INPUT' ||
                     document.activeElement.tagName == 'TEXTAREA')) {
                    return;
                }
                var key = e.key.toLowerCase();
                if(rulesData.dbClick2StopKey.toLowerCase()==key){
                    forceState=(forceState==1?0:1);
                    showTips(i18n(forceState==1?"disableSiteTips":"enableSiteTips"));
                    if(!ruleParser.curSiteRule.url) {
                        storage.setItem("forceState_"+location.host, forceState);
                        location.reload();
                    }
                }
            });
        }
        if (ruleParser.curSiteRule.listenHashChange) {
            window.addEventListener('hashchange', () => {
                urlChanged = true;
                isPause = true;
                if (!ruleParser.nextLinkHref) isLoading = false;
            }, false);
        }
        let manualMode = typeof ruleParser.curSiteRule.manualMode == 'undefined' ? rulesData.manualMode : ruleParser.curSiteRule.manualMode;
        if (manualMode) {
            document.addEventListener('keydown', e => {
                if (document.activeElement &&
                    (document.activeElement.tagName == 'INPUT' ||
                     document.activeElement.tagName == 'TEXTAREA' ||
                     document.activeElement.contentEditable == 'true')) {
                    return;
                }
                if(e.keyCode == 39){
                    clickNext();
                }
            });
            document.addEventListener('pagetual.next', function() {
                clickNext();
            }, false);
            return;
        }
        if (rulesData.arrowToScroll) {
            let getPageBar = () => {
                let preBar = null, nextBar = null;
                let pageBars = [].slice.call(document.querySelectorAll(".pagetual_pageBar"));
                for (let i = 0; i < pageBars.length; i++) {
                    let pageBar = pageBars[i];
                    if (!pageBar || !document.body.contains(pageBar)) continue;
                    let {
                        top,
                        right,
                        bottom,
                        left,
                    } = pageBar.getBoundingClientRect();
                    if (top > 500) {
                        nextBar = pageBar;
                        preBar = (i - 1 >= 0 ? pageBars[i - 1] : null);
                        if (pageBar && document.body.contains(pageBar)) {
                            let {
                                top,
                                right,
                                bottom,
                                left,
                            } = pageBar.getBoundingClientRect();
                            if (top < -500) {
                                preBar = pageBar;
                            } else preBar = (i - 2 >= 0 ? pageBars[i - 2] : null);
                        }
                        break;
                    }
                }
                if (!nextBar) preBar = pageBars[pageBars.length - 2];
                return {preBar: preBar, nextBar: nextBar};
            };
            document.addEventListener('keyup', e => {
                if (document.activeElement &&
                    (document.activeElement.tagName == 'INPUT' ||
                     document.activeElement.tagName == 'TEXTAREA' ||
                     document.activeElement.contentEditable == 'true')) {
                    return;
                }
                if (e.keyCode == 39) {
                    let nextPageBar=getPageBar().nextBar;
                    if (nextPageBar) {
                        scrollToPageBar(nextPageBar);
                    } else {
                        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                        window.scrollTo({ top: scrollTop + (window.innerHeight || document.documentElement.clientHeight), behavior: 'smooth'});
                    }
                } else if (e.keyCode == 37) {
                    let prePageBar = getPageBar().preBar;
                    if (prePageBar) {
                        scrollToPageBar(prePageBar);
                    } else {
                        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                        window.scrollTo({ top: scrollTop - (window.innerHeight || document.documentElement.clientHeight), behavior: 'smooth'});
                    }
                }
            });
        }
        if (!ruleParser.curSiteRule.wheel) {
            document.addEventListener('scroll', scrollHandler, true);
        }
        document.addEventListener('wheel', scrollHandler, true);
    }

    function showTips(content, wordColor, backColor){
        document.body.appendChild(tipsWords);
        tipsWords.style.opacity=0.8;
        tipsWords.innerText=content;
        tipsWords.style.marginLeft=-tipsWords.offsetWidth/2+"px";
        tipsWords.style.color=wordColor||0xFFFFFF;
        tipsWords.style.backgroundColor=backColor||0x000;
        setTimeout(()=>{tipsWords.style.opacity=0},1000);
    }

    function getLoadMore(doc) {
        if (ruleParser.curSiteRule.loadMore === "") return null;
        let btnSel = ruleParser.curSiteRule.loadMore || ".LoadMore,.load-more,.button-show-more,button[data-testid='more-results-button']", loadmoreBtn;
        if (btnSel) {
            loadmoreBtn = getElement(btnSel, doc);
        }
        if (!loadmoreBtn) {
            let buttons = doc.querySelectorAll("input,button,a,div[onclick]"), loadmoreReg = /^\s*(加载更多|加載更多|load\s*more|もっと読み込む)\s*$/i;
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                if (button.innerText.length > 20) continue;
                if (button && loadmoreReg.test(button.innerText)) {
                    loadmoreBtn = button;
                    break;
                }
            }
        }
        if (loadmoreBtn && !ruleParser.curSiteRule.loadMore && loadmoreBtn.dataset.ajax !== "true") {
            let href = loadmoreBtn.getAttribute("href");
            if (href && href != "/" && !/^(javascript|#)/.test(href.replace(location.href,""))) {
                loadmoreBtn = null;
            }
        }
        return loadmoreBtn;
    }

    function scrollToPageBar(bar){
        let yOffset = -20;
        if (typeof ruleParser.curSiteRule.pageBarTop !== 'undefined') {
            yOffset = -ruleParser.curSiteRule.pageBarTop;
        }
        const y = bar.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth'});
    }

    const pageNumReg=/[&\/\?](p=|page[=\/_-]?)\d+|[_-]\d+\./;
    function createPageBar(url){
        let insert=ruleParser.getInsert();
        if(!insert || !insert.parentNode)return;
        curPage++;
        let example=ruleParser.curSiteRule.insertPos==2?insert.children[0]:(insert.parentNode.children[parseInt(insert.parentNode.children.length/2)]||insert);
        if (example.className=="pagetual_pageBar") {
            example=example.previousElementSibling;
        }
        if(!example || !example.parentNode)example=insert;
        let exampleStyle = _unsafeWindow.getComputedStyle(example);
        let inTable, inLi;
        if (forceState == 2) {
            inTable = inLi = false;
        } else {
            inTable=example.parentNode.tagName=="TABLE" ||
            example.parentNode.tagName=="TBODY" ||
            example.tagName=="TR" ||
            example.tagName=="TBODY" ||
            exampleStyle.display=="table-row" ||
            (example.previousElementSibling && example.previousElementSibling.tagName=="TR") ||
            (example.previousElementSibling && example.previousElementSibling.tagName=="TBODY");
            inLi=example.tagName=="LI" || (example.previousElementSibling && example.previousElementSibling.tagName=="LI");
        }
        let pageBar=document.createElement(inTable?"tr":(inLi?"li":"div"));
        let upSpan=document.createElement("span");
        let downSpan=document.createElement("span");
        let pageText=document.createElement("a");
        let pageNum;
        let scrollH=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        pageBar.className=isHideBar?"pagetual_pageBar hide":"pagetual_pageBar";
        pageBar.id="pagetual_pageBar"+curPage;
        pageBar.setAttribute("translate", "no");
        if(isPause){
            pageBar.classList.add("stop");
        }
        pageBar.style.cssText=pageBarStyle;
        pageBar.title=i18n(isPause?"enable":"disable");
        upSpan.innerHTML=upSvg;
        upSpan.children[0].style.cssText=upSvgCSS;
        upSpan.title=i18n("toTop");
        downSpan.innerHTML=downSvg;
        downSpan.children[0].style.cssText=downSvgCSS;
        downSpan.title=i18n("toBottom");
        upSpan.style.cssText=initStyle;
        downSpan.style.cssText=initStyle;
        pageText.href=url;
        pageText.style.cssText=pageTextStyle;
        pageText.title=i18n("current");
        if(rulesData.openInNewTab)pageText.target="_blank";
        pageBar.appendChild(upSpan);
        pageBar.appendChild(pageText);
        if(rulesData.pageBarMenu){
            pageText.addEventListener("click", e=>{
                e.stopPropagation();
                e.preventDefault();
                Picker.getInstance().start();
            });
        }
        let touched = false;
        let touchBodyHandler = e => {
            touched = false;
            document.body.removeEventListener('touchstart', touchBodyHandler);
        };
        pageText.addEventListener("touchstart", e => {
            if (touched) return;
            touched = true;
            pageText.style.pointerEvents = 'none';
            setTimeout(() => {
                pageText.style.pointerEvents = 'all';
            }, 250);
            document.body.addEventListener("touchstart", touchBodyHandler);
        });
        if(ruleParser.nextTitle){
            pageText.innerHTML=ruleParser.nextTitle+" ";
            pageText.title=ruleParser.nextTitle;
        }
        if(ruleParser.curSiteRule.pageNum || pageNumReg.test(url)){
            pageText.innerHTML+="Page ";
            pageNum=document.createElement("span");
            pageNum.innerHTML=ruleParser.getPageNumFromUrl(url);
            pageNum.className="pagetual_pageNum";
            pageNum.title=i18n("inputPageNum");
            pageNum.style.cssText=pageTextStyle;
            pageNum.style.cursor="pointer";
            pageNum.style.color="";
            pageNum.style.marginLeft="5px";
            pageNum.addEventListener("click", e=>{
                let pageInput=prompt(i18n("inputPageNum"), "1");
                if(pageInput){
                    let pageLink=ruleParser.getLinkByPage(url, pageInput);
                    if(pageLink){
                        _GM_openInTab(pageLink,{active:true});
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            });
            pageBar.appendChild(pageNum);
        }else{
            pageText.innerHTML+="Page "+curPage;
        }
        let preBtn=document.createElement("span");
        preBtn.innerHTML="∧";
        preBtn.title="Prev page";
        preBtn.className="prevScreen";
        preBtn.style.cssText="display: none;text-align: center;right: unset; float: left; margin-top: -30px; width: 40px; background: rgba(240, 240, 240, 0.8); position: absolute; border-radius: 20px 20px 0 0; box-shadow: rgb(0 0 0 / 50%) 0px -5px 5px;z-index:9999999";
        let nextBtn=document.createElement("span");
        nextBtn.innerHTML="∨";
        nextBtn.title="Next page";
        nextBtn.className="nextScreen";
        nextBtn.style.cssText="display: none;text-align: center;right: unset; float: left; margin-top: 30px; width: 40px; background: rgba(240, 240, 240, 0.8); position: absolute; border-radius: 0 0 20px 20px; box-shadow: rgb(0 0 0 / 50%) 0px 5px 5px;z-index:9999999";
        let localPage=curPage;
        preBtn.addEventListener("click", e=>{
            e.stopPropagation();
            e.preventDefault();
            let prePageBar = document.querySelector("#pagetual_pageBar"+(localPage-1));
            if (prePageBar) {
                scrollToPageBar(prePageBar);
            } else {
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                window.scrollTo({ top: scrollTop - (window.innerHeight || document.documentElement.clientHeight), behavior: 'smooth'});
            }
        });
        nextBtn.addEventListener("click", e=>{
            e.stopPropagation();
            e.preventDefault();
            let nextPageBar=document.querySelector("#pagetual_pageBar"+(localPage+1));
            if (nextPageBar) {
                scrollToPageBar(nextPageBar);
            } else {
                let nextEle = pageBar.parentNode.nextElementSibling;
                if (nextEle) scrollToPageBar(nextEle);
                else {
                    scrollH=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    window.scrollTo({ top: scrollH || 9999999, behavior: 'smooth'});
                }
            }
        });
        pageText.insertBefore(preBtn, pageText.firstChild);
        pageText.insertBefore(nextBtn, pageText.firstChild);
        pageBar.appendChild(downSpan);
        if (forceState == 2) {
            pageBar.style.width = "99%";
        } else {
            let parentStyle=_unsafeWindow.getComputedStyle(example.parentNode);
            let parentWidth=example.parentNode.offsetWidth||parseInt(parentStyle.width);
            pageBar.style.width=parentWidth-parseInt(parentStyle.paddingLeft)-parseInt(parentStyle.paddingRight)-10+"px";
            pageBar.style.margin='10px 5px';
            if(parentStyle.display=="grid" || parentStyle.display=="inline-grid"){
                pageBar.style.gridColumnStart=1;
                pageBar.style.gridColumnEnd=1+parseInt(example.parentNode.offsetWidth/example.offsetWidth);
            }
            if(inTable){
                example=(example.tagName=="TR" || example.tagName=="TBODY")?example:example.previousElementSibling;
                if(example.tagName=="TBODY")example=example.querySelector("tr");
                let preTr=example;
                while(preTr && preTr.children.length==0)preTr=preTr.previousElementSibling;
                if(preTr)example=preTr;
                let tdNum=0;
                if (exampleStyle.display=="table-row") {
                    [].forEach.call(example.children, el=>{
                        tdNum+=el.colSpan||1;
                    });
                } else {
                    [].forEach.call(example.children, el=>{
                        if(el.tagName=="TD" || el.tagName=="TH"){
                            tdNum+=el.colSpan||1;
                        }
                    });
                }
                pageBar.style.display="table-row";
                pageBar.style.backgroundColor="unset";
                pageBar.style.lineHeight="20px";
                pageBar.style.boxShadow="";
                pageBar.style.height="35px";
                let td=document.createElement("td");
                td.colSpan=tdNum||1;
                let inTd=document.createElement("div");
                inTd.style.backgroundColor="rgb(240 240 240 / 80%)";
                inTd.style.borderRadius="20px";
                inTd.style.padding="0 0";
                inTd.style.margin="0";
                inTd.style.lineHeight="20px";
                inTd.style.textAlign="center";
                inTd.style.boxShadow="rgb(0 0 0 / 67%) 0px 0px 10px 0px";
                inTd.appendChild(upSpan);
                inTd.appendChild(pageText);
                if(pageNum)inTd.appendChild(pageNum);
                inTd.appendChild(downSpan);
                td.appendChild(inTd);
                pageBar.appendChild(td);
            }else if(inLi){
                example=example.tagName=="LI"?example:example.previousElementSibling;
                pageBar.style.display=getComputedStyle(example).display;
                pageBar.style.backgroundColor="unset";
                pageBar.style.lineHeight="20px";
                pageBar.style.boxShadow="";
                pageBar.style.height="35px";
                let td=document.createElement("td");
                td.colSpan=example.children.length;
                td.style.width='100%';
                let inTd=document.createElement("div");
                inTd.style.backgroundColor="rgb(240 240 240 / 80%)";
                inTd.style.borderRadius="20px";
                inTd.style.margin="0"
                inTd.style.padding="0 0";
                inTd.style.textAlign="center";
                inTd.style.minWidth="150px";
                inTd.appendChild(upSpan);
                inTd.appendChild(pageText);
                inTd.style.width='calc(100% - 20px)';
                inTd.style.boxShadow="rgb(0 0 0 / 67%) 0px 0px 10px 0px";
                if(pageNum)inTd.appendChild(pageNum);
                inTd.appendChild(downSpan);
                if (pageBar.style.display === 'table-row') {
                    td.appendChild(inTd);
                    pageBar.appendChild(td);
                } else {
                    inTd.style.width='100%';
                    pageBar.appendChild(inTd);
                }
            }
        }

        upSpan.addEventListener("click", e=>{
            document.body.scrollTop=0;
            document.documentElement.scrollTop=0;
            e.preventDefault();
            e.stopPropagation();
        });
        downSpan.addEventListener("click", e=>{
            changeStop(true);
            pageBar.title = i18n(isPause ? "enable" : "disable");
            scrollH=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            document.body.scrollTop = scrollH || 9999999;
            document.documentElement.scrollTop = scrollH || 9999999;
            e.preventDefault();
            e.stopPropagation();
        });
        pageBar.addEventListener("click", e=>{
            changeStop(!isPause);
            pageBar.title=i18n(isPause?"enable":"disable");
        });
        ruleParser.insertElement(pageBar);
        if(ruleParser.curSiteRule.pageBar && ruleParser.curSiteRule.pageBar !== 0){
            try{
                ((typeof _unsafeWindow.pagetualPageBar=='undefined') ? Function("pageBar",'"use strict";' + ruleParser.curSiteRule.pageBar) : _unsafeWindow.pagetualPageBar)(pageBar);
            }catch(e){
                debug(e);
            }
        }

        let posEle=pageBar.nextElementSibling||pageBar;
        while(posEle && !posEle.offsetParent){
            posEle=posEle.previousElementSibling||posEle.parentNode;
        }
        if(posEle){
            let actualTop = getElementTop(posEle);
            bottomGap=scrollH-actualTop+(window.innerHeight||document.documentElement.clientHeight)*(ruleParser.curSiteRule.rate||1);
            if(bottomGap<100)bottomGap=100;
        }else{
            bottomGap=1000;
        }
        if(rulesData.opacity==0 || ruleParser.curSiteRule.pageBar === 0)pageBar.style.display="none";
        return pageBar;
    }

    function emuClick(btn){
        let orgHref=btn.getAttribute('href');
        if(orgHref){
            btn.setAttribute('href', orgHref.replace(/#$/,""));
        }
        if(!PointerEvent)return btn.click();
        let eventParam={
            isTrusted: true,
            altKey: false,
            azimuthAngle: 0,
            bubbles: true,
            button: 0,
            buttons: 0,
            clientX: 1,
            clientY: 1,
            cancelBubble: false,
            cancelable: true,
            composed: true,
            ctrlKey: false,
            defaultPrevented: false,
            detail: 1,
            eventPhase: 2,
            fromElement: null,
            height: 1,
            isPrimary: false,
            metaKey: false,
            pointerId: 1,
            pointerType: "mouse",
            pressure: 0,
            relatedTarget: null,
            returnValue: true,
            shiftKey: false,
            toElement: null,
            twist: 0,
            which: 1
        };
        let mouseEvent = new PointerEvent("mousedown",eventParam);
        btn.dispatchEvent(mouseEvent);
        mouseEvent = new PointerEvent("mouseup",eventParam);
        btn.dispatchEvent(mouseEvent);
        let dispatchTouchEvent = (ele, type) => {
            let touchEvent;
            try {
                touchEvent = document.createEvent('TouchEvent')
                touchEvent.initTouchEvent(type, true, true)
            } catch (err) {
                try {
                    touchEvent = document.createEvent('UIEvent')
                    touchEvent.initUIEvent(type, true, true)
                } catch (err) {
                    touchEvent = document.createEvent('Event')
                    touchEvent.initEvent(type, true, true)
                }
            }
            touchEvent.targetTouches = [{
                pageX: 1,
                pageY: 1,
                clientX: 1,
                clientY: 1,
                target: btn
            }];
            touchEvent.touches = [{
                pageX: 1,
                pageY: 1,
                clientX: 1,
                clientY: 1,
                target: btn
            }];
            touchEvent.changedTouches = [{
                pageX: 1,
                pageY: 1,
                clientX: 1,
                clientY: 1,
                target: btn
            }];
            ele.dispatchEvent(touchEvent);
        }
        dispatchTouchEvent(btn, "touchstart");
        dispatchTouchEvent(btn, "touchend");

        btn.click();
        if(orgHref){
            setTimeout(()=>btn.setAttribute('href', orgHref),0);
        }
    }

    var failFromIframe=0;
    var inCors=false;
    var checkRemoveIntv;
    function requestFromIframe(url, callback){
        url = url.indexOf('=') == -1 ? url.replace(/#[^#]*/,"") : url;
        let iframe = document.createElement('iframe');
        iframe.name = 'pagetual-iframe';
        iframe.width = '100%';
        iframe.height = '1000';
        iframe.frameBorder = '0';
        if(ruleParser.curSiteRule.sandbox!=false){
            iframe.sandbox="allow-same-origin allow-scripts allow-popups allow-forms";
        }
        iframe.style.cssText = 'margin:0!important;padding:0!important;visibility:hidden!important;flex:0;opacity:0!important;pointer-events:none!important;position:fixed;top:0px;left:0px;z-index:-2147483647;';
        let waitTime=100,checkEval;
        if(ruleParser.curSiteRule.waitElement){
            checkEval = doc => {
                return ruleParser.waitElement(doc);
            };
        }else if(ruleParser.curSiteRule.wait){
            if(isNaN(ruleParser.curSiteRule.wait)){
                try{
                    checkEval=(typeof _unsafeWindow.pagetualWait=='undefined') ? Function("doc",'"use strict";' + ruleParser.curSiteRule.wait) : _unsafeWindow.pagetualWait;
                }catch(e){
                    debug(e);
                }
            }else{
                waitTime=ruleParser.curSiteRule.wait;
            }
        }
        if (checkRemoveIntv) clearInterval(checkRemoveIntv);
        checkRemoveIntv = setInterval(() => {
            if (!iframe || !document.body.contains(iframe)) {
                clearInterval(checkRemoveIntv);
                loadPageOver();
            }
        }, 500);
        let loadedHandler = e => {
            if(e.data != 'pagetual-iframe:DOMLoaded' && e.type != 'load')return;
            clearInterval(checkRemoveIntv);
            window.removeEventListener('message', loadedHandler, false);
            iframe.removeEventListener('load', loadedHandler, false);
            let tryTimes=0;
            function checkIframe(){
                if (urlChanged || isPause) {
                    return callback(false, false);
                }
                try{
                    let doc=iframe.contentDocument || iframe.contentWindow.document;
                    let base=doc.querySelector("base");
                    ruleParser.basePath=base?base.href:url;
                    let eles=ruleParser.getPageElement(doc, iframe.contentWindow);
                    if(checkEval && !checkEval(doc)){
                        setTimeout(()=>{
                            checkIframe();
                        },waitTime);
                        return;
                    }else if(eles && eles.length>0){
                        callback(doc, eles);
                    }else if(tryTimes++ < 100){
                        setTimeout(()=>{
                            checkIframe();
                        },waitTime);
                        return;
                    }else{
                        if(failFromIframe++ > 2){
                            failFromIframe=0;
                            debug("Stop as failFromIframe");
                            isPause=true;
                            callback(false, false);
                        }else{
                            callback(false, false);
                        }
                    }
                }catch(e){
                    debug("Stop as cors");
                    inCors=true;
                    if (forceState === 3) {
                        isPause=true;
                    }
                    if(!ruleParser.curSiteRule.pageElement){
                        ruleParser.curSiteRule.pageElement=allOfBody;
                        ruleParser.getInsert(true);
                    }
                    ruleParser.curSiteRule.action=0;
                    ruleParser.nextLinkHref=url;
                    callback(false, false);
                    nextPage();
                }
                document.body.removeChild(iframe);
            }
            setTimeout(()=>{
                checkIframe();
            },waitTime);
        };
        window.addEventListener('message', loadedHandler, false);
        iframe.addEventListener('load', loadedHandler, false);
        iframe.src=url;
        document.body.appendChild(iframe);
    }

    var emuIframe,lastActiveUrl;
    function emuPage(callback){
        let orgPage=null,orgContent=null,preContent=null,iframeDoc,times=0,loadmoreBtn,pageEle,nextLink,loadmoreEnd=false,waitTimes=10,changed=false;
        function returnFalse(log){
            debug(log);
            isPause=true;
            callback(false, false);
            if(emuIframe && emuIframe.parentNode){
                emuIframe.parentNode.removeChild(emuIframe);
                emuIframe=null;
            }
        }
        function checkPage(){
            if(isPause)return loadPageOver();
            try{
                iframeDoc=emuIframe.contentDocument || emuIframe.contentWindow.document;
            }catch(e){
                returnFalse("Stop as cors");
                return;
            }

            let waitTime=200,checkEval;
            if(ruleParser.curSiteRule.waitElement){
                checkEval = doc => {
                    return ruleParser.waitElement(doc);
                };
            }else if(ruleParser.curSiteRule.wait){
                if(isNaN(ruleParser.curSiteRule.wait)){
                    try{
                        checkEval=(typeof _unsafeWindow.pagetualWait=='undefined') ? Function("doc", '"use strict";' + ruleParser.curSiteRule.wait) : _unsafeWindow.pagetualWait;
                    }catch(e){
                        debug(e);
                    }
                }else{
                    waitTime=ruleParser.curSiteRule.wait;
                }
            }

            if(!orgPage){
                if(!loadmoreEnd){
                    loadmoreBtn=getLoadMore(iframeDoc);
                    if(loadmoreBtn && isVisible(loadmoreBtn, iframeDoc.defaultView)){
                        emuClick(loadmoreBtn);
                        let intv=setInterval(()=>{
                            loadmoreBtn=getLoadMore(iframeDoc);
                            if(!loadmoreBtn || !document.body.contains(loadmoreBtn) || !isVisible(loadmoreBtn, iframeDoc.defaultView)){
                                clearInterval(intv);
                                loadmoreEnd=true;
                                setTimeout(()=>{
                                    checkPage();
                                },500);
                            }else if(isInViewPort(loadmoreBtn)){
                                emuClick(loadmoreBtn);
                            }
                        },200);
                        return;
                    }else{
                        loadmoreEnd=true;
                    }
                }
                if(checkEval && !checkEval(iframeDoc)){
                    waitTimes=10;
                    setTimeout(()=>{
                        checkPage();
                    },waitTime);
                    return;
                }else {
                    nextLink=ruleParser.getNextLink(iframeDoc);
                    pageEle=ruleParser.getPageElement(iframeDoc, iframeDoc.defaultView, true);
                    if(!pageEle || pageEle.length==0 || !nextLink){
                        if(waitTimes-->0){
                            setTimeout(()=>{
                                checkPage();
                            },waitTime);
                            return;
                        }
                    }
                }
                orgPage=pageEle;
                if(!orgPage || orgPage.length==0){
                    returnFalse("Stop as no page when emu");
                    return;
                }
                if(orgPage[0].tagName=="UL")orgPage=orgPage[0].children;
                if(nextLink){
                    orgPage=orgPage[parseInt(orgPage.length/2)];
                    if(orgPage.tagName=="IMG"){
                        if (!ruleParser.curSiteRule.lazyImgSrc) ruleParser.curSiteRule.lazyImgSrc = "0";
                        if (orgPage.src) {
                            orgContent = orgPage.src;
                        } else {
                            setTimeout(()=>{
                                checkPage();
                            },500);
                            return;
                        }
                    }else{
                        orgContent=orgPage.innerHTML;
                    }
                    preContent=orgContent;
                    if(!isVisible(nextLink, iframeDoc.defaultView)){
                        returnFalse("Stop as next hide when emu");
                    }else{
                        emuClick(nextLink);
                        setTimeout(()=>{
                            checkPage();
                        },500);
                    }
                }else{
                    returnFalse("Stop as no next when emu");
                }
                return;
            }
            nextLink = nextLink || ruleParser.getNextLink(iframeDoc);
            if(!nextLink){
                if(waitTimes-->0){
                    setTimeout(()=>{
                        checkPage();
                    },waitTime);
                    return;
                }
            }
            if(times++ > 100){
                returnFalse("Stop as timeout when emu");
                return;
            }
            let eles=ruleParser.getPageElement(iframeDoc, iframeDoc.defaultView, true),checkItem;
            if(eles && eles.length>0){
                checkItem=eles;
                if(eles[0].tagName=="UL")checkItem=eles[0].children;
                checkItem=checkItem[parseInt(checkItem.length/2)];
            }
            if(!checkItem || (checkEval && !checkEval(iframeDoc))){
                setTimeout(()=>{
                    checkPage();
                },waitTime);
            }else{
                let checkInner;
                if (checkItem.tagName == "IMG") {
                    if (checkItem.src) {
                        checkInner = checkItem.src;
                    } else {
                        setTimeout(() => {
                            checkPage();
                        }, waitTime);
                        return;
                    }
                }else{
                    checkInner=checkItem.innerHTML;
                }
                if(orgPage!=checkItem || checkInner!=preContent){
                    changed=true;
                    orgPage=checkItem;
                    preContent=checkInner;
                    setTimeout(()=>{
                        checkPage();
                    },waitTime);
                }else if(changed){
                    if (orgContent == preContent) {
                        returnFalse("Stop as same content");
                    } else {
                        callback(iframeDoc, eles);
                    }
                }else{
                    if (times % 5 === 1) {
                        emuClick(nextLink);
                    }
                    setTimeout(()=>{
                        checkPage();
                    },waitTime);
                }
            }
        }
        if(!emuIframe){
            let loaded=false;
            emuIframe = document.createElement('iframe');
            emuIframe.name = 'pagetual-iframe';
            if(ruleParser.curSiteRule.sandbox!=false){
                emuIframe.sandbox="allow-same-origin allow-scripts allow-popups allow-forms";
            }
            emuIframe.width = '100%';
            emuIframe.height = '100';
            emuIframe.frameBorder = '0';
            emuIframe.style.cssText = 'margin:0!important;padding:0!important;flex:0;opacity:0!important;pointer-events:none!important;position:fixed;top:0px;left:0px;z-index:-2147483647;';
            emuIframe.addEventListener("load", e => {
                setTimeout(() => {
                    try {
                        iframeDoc = emuIframe.contentDocument || emuIframe.contentWindow.document;
                    } catch(e) {
                        returnFalse("Stop as cors");
                        return;
                    }
                    let code = ruleParser.curSiteRule.init;
                    if (code) {
                        try {
                            Function('doc','win','iframe','"use strict";' + code)(iframeDoc, iframeDoc.defaultView, emuIframe);
                        } catch(e) {
                            debug(e);
                        }
                    }
                    if (loaded) return;
                    loaded = true;
                    checkPage();
                },500);
            });
            if (!lastActiveUrl) lastActiveUrl=location.href;
            emuIframe.src = lastActiveUrl;
            document.body.appendChild(emuIframe);
        }else{
            if (emuIframe.src != lastActiveUrl) emuIframe.src = lastActiveUrl;
            checkPage();
        }
    }

    var scrollToResizeInited = false;
    var resizePool = [];
    var scrollingToResize = false;

    function scrollToResize(e) {
        if (scrollingToResize) return;
        else {
            scrollingToResize = true;
            let fitWidth = ruleParser.curSiteRule.fitWidth !== false;
            let resizeHandler = () => {
                resizePool.forEach(resizeArr => {
                    let iframe = resizeArr[1]();
                    let frameDoc = resizeArr[2]();
                    if(ruleParser.curSiteRule.singleUrl || forceState === 2){
                        iframe.style.height = (frameDoc.body.scrollHeight || frameDoc.body.offsetHeight) + "px";
                        iframe.style.minHeight = iframe.style.height;
                        iframe.style.width = "100%";
                        frameDoc.documentElement.scrollTop = 0;
                        frameDoc.documentElement.scrollLeft = 0;
                    }else{
                        let pageEle = resizeArr[0]();
                        if(pageEle){
                            let targetElement = pageEle[0];
                            if(pageEle.length > 1){
                                targetElement = targetElement.parentNode;
                            }
                            let scrollHeight = targetElement.scrollHeight || targetElement.offsetHeight;
                            if(parseInt(iframe.style.height)==scrollHeight) return;
                            iframe.style.height=scrollHeight+"px";
                            let scrollTop = 0, scrollLeft = 0;
                            frameDoc.body.scrollTop = 0;
                            frameDoc.body.scrollLeft = 0;
                            while(targetElement && targetElement.offsetParent){
                                targetElement.offsetParent.scrollTop = targetElement.offsetTop;
                                if(targetElement.offsetParent.scrollTop == 0){
                                    scrollTop += targetElement.offsetTop;
                                }
                                if(fitWidth){
                                    targetElement.offsetParent.scrollLeft = targetElement.offsetLeft;
                                    if(targetElement.offsetParent.scrollLeft == 0){
                                        scrollLeft += targetElement.offsetLeft;
                                    }
                                }
                                targetElement = targetElement.offsetParent;
                            }
                            frameDoc.documentElement.scrollTop = scrollTop;
                            frameDoc.documentElement.scrollLeft = scrollLeft;
                            if (frameDoc.documentElement.scrollTop == 0 && frameDoc.documentElement.scrollLeft == 0) {
                                frameDoc.body.scrollTop += scrollTop;
                                frameDoc.body.scrollLeft += scrollLeft;
                            }
                            if(!fitWidth && iframe.style.marginLeft == '0px'){
                                iframe.style.width = "100vw";
                                iframe.style.marginLeft = -iframe.getBoundingClientRect().left + "px";
                            }
                        }
                    }
                });
            };
            setTimeout(() => {
                resizeHandler();
                scrollingToResize = false
            }, 200);
            resizeHandler();
        }
    }

    function forceIframe(url, callback){
        url = url.indexOf('=') == -1 ? url.replace(/#[^#]*/,"") : url;
        let curIframe = document.createElement('iframe'),iframeDoc,isloaded=false,inAction=true;
        let loadedHandler = ()=>{
            inAction=false;
            if(isloaded)return;
            isloaded=true;
            ruleParser.insertPage(iframeDoc, [], url, null, true);
            callback(curIframe, true);
            let getIframe = () => {
                return curIframe;
            };
            let getFrameDoc = () => {
                return iframeDoc;
            };
            if(ruleParser.curSiteRule.singleUrl){
                resizePool.push([() => {}, getIframe, getFrameDoc]);
            }else{
                let pageElement = ruleParser.getPageElement(iframeDoc,iframeDoc.defaultView);
                let getPageEle = () => {
                    if (!pageElement || pageElement.length===0) {
                        pageElement = ruleParser.getPageElement(iframeDoc,iframeDoc.defaultView);
                    }
                    return pageElement;
                };
                resizePool.push([getPageEle, getIframe, getFrameDoc]);
            }
            scrollToResize();
        };
        curIframe.name = 'pagetual-iframe';
        curIframe.sandbox="allow-same-origin allow-scripts allow-popups allow-forms";
        curIframe.frameBorder = '0';
        curIframe.scrolling="no";
        curIframe.style.cssText = 'display: block; visibility: visible; float: none; clear: both; width: 100%;height:0;background: initial; border: 0px; border-radius: 0px; margin: 0px 0px 2rem; padding: 0px; z-index: 2147483647;';
        curIframe.addEventListener("load", e=>{
            try{
                iframeDoc=curIframe.contentDocument || curIframe.contentWindow.document;
            }catch(e){
                debug("Stop as cors");
                isPause=true;
                callback(false, false);
                return;
            }
            let css=ruleParser.curSiteRule.css || rulesData.customCss;
            if(css){
                css = css.replace(/^inIframe:/, "");
                let styleEle=iframeDoc.createElement("style");
                styleEle.innerHTML=css;
                iframeDoc.head.appendChild(styleEle);
            }
            loadedHandler();
            let code=ruleParser.curSiteRule.init;
            if(code){
                try{
                    Function('doc','win','iframe','"use strict";' + code)(iframeDoc,iframeDoc.defaultView,curIframe);
                }catch(e){
                    debug(e);
                }
            }
        });
        let checkTimes=0,findPageEle=false;
        let forceRefresh=e=>{
            if(inAction || !iframeDoc)return;
            inAction=true;
            let foundNext=()=>{
                document.removeEventListener("scroll", forceRefresh);
            }
            setTimeout(()=>{
                inAction=false;
                if(!ruleParser.nextLinkHref){
                    checkTimes++;
                    ruleParser.getNextLink(iframeDoc);
                    if(ruleParser.nextLinkHref){
                        foundNext();
                    }else if(checkTimes>=10){
                        foundNext();
                    }else if(checkTimes>=3 && !findPageEle){
                        let pageElement = ruleParser.getPageElement(iframeDoc,iframeDoc.defaultView);
                        if(!pageElement){
                            inAction=true;
                            curIframe.contentWindow.location.reload();
                        }else{
                            findPageEle=true;
                        }
                    }
                }else{
                    foundNext();
                }
            },50);
        };
        document.addEventListener("scroll", forceRefresh);
        curIframe.src=url;
        let insert=ruleParser.getInsert();
        if(ruleParser.curSiteRule.singleUrl || forceState==2){
            document.body.appendChild(loadingDiv);
            document.body.appendChild(curIframe);
        }else{
            ruleParser.insertElement(curIframe);
        }

        if (!scrollToResizeInited) {
            scrollToResizeInited = true;
            document.addEventListener("scroll", scrollToResize);
        }
        return curIframe;
    }

    function loadPageOver(){
        isLoading = false;
        stopScroll = true;
        setTimeout(() => {stopScroll = false}, 500);
        if(loadingDiv.parentNode){
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
    }

    var tryTimes = 0;

    function nextPage(){
        if(typeof ruleParser.curSiteRule.manualMode=='undefined' ? rulesData.manualMode : ruleParser.curSiteRule.manualMode)return;
        if(typeof ruleParser.curSiteRule.clickMode=='undefined' ? rulesData.clickMode : ruleParser.curSiteRule.clickMode)return;
        if(isPause || isLoading || forceState==1)return;
        if(ruleParser.curSiteRule.delay){
            try{
                let checkDelay=((typeof _unsafeWindow.pagetualDelay=='undefined') ? Function('"use strict";' + ruleParser.curSiteRule.delay) : _unsafeWindow.pagetualDelay)();
                if(!checkDelay)return;
            }catch(e){
                debug(e);
            }
        }
        if(ruleParser.curSiteRule.pageElementCss || ruleParser.curSiteRule.pageElementStyle || rulesData.pageElementCss){
            ruleParser.getPageElement(document, _unsafeWindow);
        }
        let nextLink=ruleParser.nextLinkHref;
        if(!nextLink){
            if(curPage==1){
                ruleParser.getNextLink(document);
                nextLink=ruleParser.nextLinkHref;
            }
            if(!nextLink){
                isLoading=true;
                if(curPage==1 && (ruleParser.curSiteRule.pinUrl || tryTimes++ <= 10)){
                    setTimeout(()=>{isLoading=false},500);
                }
                return;
            }
        }
        let pvGallery=document.querySelector("span.pv-gallery-container");
        if(pvGallery && pvGallery.style.display!="none")return;
        let insert=ruleParser.getInsert();
        if (insert) {
            if (curPage == 1) {
                /*window.postMessage({
                    insert: geneSelector(ruleParser.curSiteRule.insertPos == 2 ? insert : insert.parentNode, true),
                    command: 'pagetual.insert'
                }, '*');*/
            }
            let isJs = ruleParser.curSiteRule.action == 3 || /^(javascript|#)/.test(nextLink.replace(location.href,""));
            if(!isJs){
                emuIframe=null;
                lastActiveUrl=nextLink;
                if(location.protocol=="https:" && /^http:/.test(nextLink)){
                    nextLink=nextLink.replace(/^http/,"https");
                }
            }
            isLoading=true;
            ruleParser.insertElement(loadingDiv);
            let parent=loadingDiv.parentNode;
            if(parent.tagName=="TBODY"){
                parent=parent.parentNode;
            }
            if(parent.tagName=="TABLE"){
                parent.parentNode.appendChild(loadingDiv);
            }
            loadingDiv.style.cssText=loadingCSS;
            let sleep=ruleParser.curSiteRule.sleep||0;
            setTimeout(()=>{
                if(ruleParser.curSiteRule.pageElementByJs){
                    var over=ele=>{
                        loadPageOver();
                        if (urlChanged || isPause) return;
                        if (ele) {
                            createPageBar(nextLink);
                            ruleParser.insertPage(null, ele, nextLink, null, true);
                            if(autoLoadNum>=0){
                                if(autoLoadNum!=0 && --autoLoadNum==0){
                                    autoLoadNum=-1;
                                }else{
                                    setTimeout(() => nextPage(), 1);
                                }
                            }
                        }else{
                            debug("Stop as no page when get by js");
                            isPause=true;
                        }
                    };
                    try{
                        ((typeof _unsafeWindow.pagetualPageElementByJs=='undefined') ? Function("over",'"use strict";' + ruleParser.curSiteRule.pageElementByJs) : _unsafeWindow.pagetualPageElementByJs)(over);
                    }catch(e){
                        debug(e);
                    }
                }else if((forceState==2||ruleParser.curSiteRule.action==2) && !isJs){
                    forceIframe(nextLink, (iframe, eles)=>{
                        loadPageOver();
                        if (urlChanged || isPause) return;
                        let pageBar = createPageBar(nextLink);
                        if (pageBar) iframe.parentNode.insertBefore(pageBar, iframe);
                        if (autoLoadNum >= 0) {
                            if (autoLoadNum != 0 && --autoLoadNum == 0) {
                                autoLoadNum=-1;
                            } else {
                                setTimeout(() => nextPage(), 1);
                            }
                        }
                    });
                }else if((forceState==3||ruleParser.curSiteRule.action==1) && !isJs){
                    requestFromIframe(nextLink, (doc, eles)=>{
                        loadPageOver();
                        if (urlChanged || isPause) return;
                        if (eles) {
                            ruleParser.insertPage(doc, eles, nextLink, ()=>{
                                createPageBar(nextLink);
                            }, true);
                            if(autoLoadNum>=0){
                                if(autoLoadNum!=0 && --autoLoadNum==0){
                                    autoLoadNum=-1;
                                }else{
                                    setTimeout(() => nextPage(), 1);
                                }
                            }
                        }
                    });
                }else{
                    if(!isJs){
                        requestDoc(nextLink, (eles)=>{
                            loadPageOver();
                            if (urlChanged || isPause) return;
                            if (eles) {
                                createPageBar(nextLink);
                                if(autoLoadNum>=0){
                                    if(autoLoadNum!=0 && --autoLoadNum==0){
                                        autoLoadNum=-1;
                                    }else{
                                        setTimeout(() => nextPage(), 1);
                                    }
                                }
                            }
                        });
                    }else{
                        emuPage((doc, eles)=>{
                            loadPageOver();
                            if (urlChanged || isPause) return;
                            if (eles) {
                                ruleParser.insertPage(doc, eles, "", ()=>{
                                    createPageBar(nextLink);
                                }, true);
                                if(autoLoadNum>=0){
                                    if(autoLoadNum!=0 && --autoLoadNum==0){
                                        autoLoadNum=-1;
                                    }else{
                                        setTimeout(() => nextPage(), 1);
                                    }
                                }
                            }
                        });
                    }
                }
            },sleep);
        }
    }

    function init(){
        try{
            if(_unsafeWindow.initedPagetual){
                if(ruleImportUrlReg.test(location.href)){
                    showTips(i18n('duplicate'));
                }
                return;
            }
            _unsafeWindow.initedPagetual=true;
        }catch(e){}
        initRules(()=>{
            initPage();
        });
    }

    function visibilitychangeHandler(){
        document.removeEventListener('visibilitychange', visibilitychangeHandler);
        init();
    }

    setTimeout(()=>{
        if (document.hidden) {
            document.addEventListener('visibilitychange', visibilitychangeHandler);
        } else {
            init();
        }
    },100);
})();