// ==UserScript==
// @name         Pagetual
// @name:zh-CN   东方永页机
// @name:zh-TW   東方永頁機
// @name:ja      東方永頁機
// @name:ko      東方永頁機
// @name:ru      Pagetual
// @name:de      Pagetual
// @name:es      Pagetual
// @name:fr      Pagetual
// @name:it      Pagetual
// @namespace    hoothin
// @version      1.9.37.86
// @description  Perpetual pages - powerful auto-pager script. Auto fetching next paginated web pages and inserting into current page for infinite scroll. Support thousands of web sites without any rule.
// @description:zh-CN  终极自动翻页 - 加载并拼接下一分页内容至当前页尾，智能适配任意网页
// @description:zh-TW  終極自動翻頁 - 加載並拼接下一分頁內容至當前頁尾，智能適配任意網頁
// @description:ja     Webページを自動で読み込み継ぎ足し表示を行うブラウザ拡張です、次のページ付けされた Web ページの自動読み込みと現在のページへの挿入 ルールなしで何千もの Web サイトをサポートします。
// @description:ko     페이지가 매겨진 다음 웹 페이지를 자동으로 로드하고 현재 페이지에 삽입합니다. 규칙 없이 수천 개의 웹 사이트를 지원합니다.
// @description:ru     Автоматическая подгрузка следующих страниц и вставка их содержимого в текущую страницу. Поддерживает тысячи сайтов даже с настройками по умолчанию.
// @description:de     Automatisches Laden der nächsten paginierten Webseiten und Einfügen in die aktuelle Seite. Unterstützen Sie Tausende von Websites ohne Regeln.
// @description:es     Carga automática de las siguientes páginas web paginadas e inserción en la página actual. Admite miles de sitios web sin ninguna regla.
// @description:fr     Chargement automatique des pages Web paginées suivantes et insertion dans la page en cours. Prend en charge des milliers de sites Web sans aucune règle.
// @description:it     Caricamento automatico delle pagine Web impaginate successive e inserimento nella pagina corrente. Supporta migliaia di siti web senza alcuna regola.
// @author       hoothin
// @license      MPL-2.0
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
// @homepage     https://github.com/hoothin/UserScripts/tree/master/Pagetual
// @supportURL   https://github.com/hoothin/UserScripts/issues
// @connect      wedata.net
// @connect      githubusercontent.com
// @connect      ghproxy.com
// @connect      hoothin.github.io
// @run-at       document-end
// @connect      *
// @contributionURL      https://ko-fi.com/hoothin
// @contributionAmount   1
// @downloadURL https://update.greasyfork.org/scripts/438684/Pagetual.user.js
// @updateURL https://update.greasyfork.org/scripts/438684/Pagetual.meta.js
// ==/UserScript==

(function() {
    'use strict';
    const pauseVideo = () => {
        setTimeout(() => {
            [].forEach.call(document.querySelectorAll("video"), video => {
                video.removeAttribute && video.removeAttribute("autoplay");
                video.pause && video.pause();
            });
        }, 1000);
    };
    if (window.name === 'pagetual-iframe' || (window.frameElement && window.frameElement.name === 'pagetual-iframe')) {
        [].forEach.call(document.querySelectorAll("iframe"), iframe => {
            iframe.name = 'pagetual-iframe';
        });
        var domloaded = function() {
            window.parent.postMessage('pagetual-iframe:DOMLoaded', '*');
        };
        if (window.opera) {
            document.addEventListener('DOMContentLoaded', domloaded, false);
            pauseVideo();
        } else {
            domloaded();
            if (document.readystate === 'complete') {
                pauseVideo();
            } else {
                window.addEventListener('load', () => {
                    pauseVideo();
                }, false);
            }
        }
        if (getComputedStyle(document.documentElement).display === 'none') {
          document.documentElement.style.display = 'block';
        }
        if (document.body && getComputedStyle(document.body).display === 'none') {
          document.body.style.display = 'block';
        }
        return;
    }

    if (window.top !== window.self) {
        try {
            if (window.self.innerWidth < 300 || window.self.innerHeight < 300) {
                return;
            }
        } catch(e) {
            return;
        }
    }

    const noRuleTest = false;
    const lang = navigator.appName === "Netscape" ? navigator.language : navigator.userLanguage;
    const langData = [
        {
            // English translation update by github.com/https433, admin@abby0666.xyz.
            name: "English",
            match: ["en"],
            lang: {
                enableDebug: "Enable debug output to console.",
                updateNotification: "Notification after rules updated",
                disable: "Temporarily disable.",
                disableSite: "Toggle disabled state.",
                disableSiteTips: "Disabled on this site.",
                enableSiteTips: "Enabled on this site.",
                enable: "Enable automatic page turning.",
                toTop: "Back to Top.",
                toBottom: "Go to Bottom.",
                current: "Current Page.",
                forceIframe: "Force to join next page",
                cancelForceIframe: "Cancel Force join",
                configure: "Configure Pagetual",
                firstUpdate: "Click here to initialize the default rule list",
                update: "Update online rules",
                click2update: "Click to update rules from url now",
                loadNow: "Load next automatically",
                loadConfirm: "How many pages do you want to load? (0 means infinite)",
                noNext: "No next link found, please create a new rule",
                passSec: "Updated #t# seconds ago",
                passMin: "Updated #t# minutes ago",
                passHour: "Updated #t# hours ago",
                passDay: "Updated #t# days ago",
                cantDel: "Can't delete builtin rules",
                confirmDel: "Are you sure you want to delete this rule?",
                updateSucc: "Update succeeded",
                beginUpdate: "Begin update, wait a moment please",
                customUrls: "Import Pagetual or AutoPagerize rule url, one url per line.",
                customRules: "Input custom rules. <a href='#t#'>✍️Contribute rules</a>",
                save: "Save",
                loadingText: "Shojo Now Loading...",
                opacity: "Opacity",
                opacityPlaceholder: "0: hide spacer",
                hideBar: "Hide the pagnation spacer",
                hideBarButNoStop: "Hide but not stop",
                dbClick2Stop: "Double-click on the blank space to pause",
                sortTitle: "Sorting takes effect after the next rule update",
                autoRun: "Auto enable (blacklist mode)",
                autoLoadNum: "Amount for preload pages",
                turnRate: "Turn the next page when it's less than 【X】 times page height from the footer",
                inputPageNum: "Enter page number to jump",
                enableHistory: "Write browsing history after page turning",
                enableHistoryAfterInsert: "Write browsing history immediately after splicing, otherwise write after browsing",
                contentVisibility: "Automatically switch content-visibility to improve rendering performance",
                initRun: "Turn pages immediately after opening",
                preload: "Preload next page for speeding up",
                click2ImportRule: "Click to import base rules link, and then wait until the update is complete: ",
                forceAllBody: "Join full body of page?",
                openInNewTab: "Open urls of additions in new tab",
                importSucc: "Import complete",
                import: "Import",
                editCurrent: "Edit rule for current website.",
                editBlacklist: "Edit the url blacklist, one entry per line, Supports [?,*] wildcarding.",
                upBtnImg: "Icon of back to top",
                downBtnImg: "Icon of go to footer",
                sideControllerIcon: "Icon of sidebar",
                loadingTextTitle: "Loading.",
                dbClick2StopCtrl: "Ctrl key",
                dbClick2StopAlt: "Alt key",
                dbClick2StopShift: "Shift key",
                dbClick2StopMeta: "Meta key",
                dbClick2StopKey: "Shortcut key",
                pageElementCss: "Custom style for main page elements",
                customCss: "Custom complete css",
                firstAlert: "You have not imported the base rule, please select the appropriate rule to import",
                picker: "Pagetual page element picker",
                closePicker: "Close Pagetual picker",
                pickerPlaceholder: "Element selector, (Advanced users only, leave blank otherwise)",
                pickerCheck: "Check selector and copy",
                switchSelector: "Click to switch element",
                gotoEdit: "Go to edit rule with current selector",
                manualMode: "Disable splicing, manually advance next page using the right arrow key (or dispatch event 'pagetual.next')",
                clickMode: "Disable splicing, automatically click the next page when scrolling to the end of the page",
                pageBarMenu: "Click the center of the page bar to open the picker menu",
                nextSwitch: "Switch next link",
                arrowToScroll: "Press left arrow to scroll back and right arrow to advance page",
                sideController: "Display the paging control bar in the sidebar",
                sideControllerScroll: "Scroll toggle",
                sideControllerAlways: "Always show",
                hideLoadingIcon: "Hide loading animation",
                hideBarArrow: "Hide arrow for page bar",
                duplicate: "Duplicate Pagetual have been installed, check your script manager!",
                forceStateIframe: "Embed full page as iframe",
                forceStateDynamic: "Load dynamic content via iframe",
                forceStateDisable: "Disable page turning on this site",
                autoScrollRate: "Scroll speed (1~1000)",
                disableAutoScroll: "Stop Auto Scroll",
                enableAutoScroll: "Enable Auto Scroll",
                toggleAutoScroll: "Toggle Auto Scroll",
                ruleRequest: "Rule Request",
                page: "Page ",
                prevPage: "Prev page",
                nextPage: "Next page",
                errorRulesMustBeArray: "Rules must be an Array!",
                errorJson: "JSON error, Check again!",
                editSuccess: "Edit successfully",
                errorWrongUrl: "Wrong url, Check again!",
                errorAlreadyExists: "A rule already exists!",
                settingsSaved: "The settings are saved, refresh to view",
                iframe: "Forced split by iframe.",
                dynamic: "Dynamic loading.",
                reloadPage: "Edit completed, reload now?",
                copied: "Copied",
                noValidContent: "No valid content detected, a Captcha may be present",
                outOfDate: "The script is outdated, update to the latest version please.",
                hideBarTips: "Hide the pagination bar, toggle immersive experience",
                setConfigPage: "Set current page as the default configuration page",
                wedata2github: "Change the wedata address to the mirror address in the github repository",
                addOtherProp: "Add rule properties",
                addNextSelector: "Add selector content as nextLink",
                addPageSelector: "Add selector content as pageElement",
                propName: "Enter rule property name",
                propValue: "Enter rule property value",
                customFirst: "Ignore cache for local custom rules",
                rulesExample: "Rules Example",
                lastPage: "Reached the last page",
                lastPageTips: "Show tips when reaching the last page"
            }
        },
        {
            // Translated by SrKalopsia (srkalopsia@gmail.com).
            name: "Español",
            match: ["es", "es-ES"],
            lang: {
                enableDebug: "Habilitar salida de depuración",
                updateNotification: "Notificación después de actualizar las reglas",
                disable: "Desactivar",
                disableSite: "Alternar estado desactivado",
                disableSiteTips: "Desactivado en este sitio",
                enableSiteTips: "Activado en este sitio",
                enable: "Habilitar",
                toTop: "Ir al inicio",
                toBottom: "Ir al final",
                current: "Página actual",
                forceIframe: "Forzar para unirse a la siguiente página",
                cancelForceIframe: "Cancelar unión forzada",
                configure: "Configurar",
                firstUpdate: "Haga clic aquí para inicializar las reglas",
                update: "Actualizar reglas en línea",
                click2update: "Haga clic para actualizar las reglas desde la URL ahora",
                loadNow: "Cargar el siguiente automáticamente",
                loadConfirm: "¿Cuántas páginas desea cargar? (0 significa infinito)",
                noNext: "No se encontró el enlace siguiente, por favor cree una nueva regla",
                passSec: "Actualizado hace #t# segundos",
                passMin: "Actualizado hace #t# minutos",
                passHour: "Actualizado hace #t# horas",
                passDay: "Actualizado hace #t# días",
                cantDel: "No se pueden eliminar las reglas incorporadas",
                confirmDel: "¿Está seguro de que desea eliminar esta regla?",
                updateSucc: "Actualización exitosa",
                beginUpdate: "Comenzar actualización, espere un momento por favor",
                customUrls: "Importar URL de reglas de Pagetual o AutoPagerize, una URL por línea",
                customRules: "Introduzca reglas personalizadas. <a href='#t#'>✍️Contribuir reglas</a>",
                save: "Guardar",
                loadingText: "Shojo Cargando...",
                opacity: "Opacidad",
                opacityPlaceholder: "0: ocultar espaciador",
                hideBar: "Ocultar el espaciador de paginación",
                hideBarButNoStop: "Ocultar pero no detener",
                dbClick2Stop: "Haga doble clic en el espacio en blanco para pausar",
                sortTitle: "La ordenación surtirá efecto después de la próxima actualización de reglas",
                autoRun: "Habilitar automáticamente (modo lista negra)",
                autoLoadNum: "Cantidad de páginas para precargar",
                turnRate: "Pasar a la siguiente página cuando esté a menos de 【X】 veces la altura de la página desde el pie de página",
                inputPageNum: "Ingrese el número de página para saltar",
                enableHistory: "Escribir historial de navegación después de pasar la página",
                enableHistoryAfterInsert: "Escribir historial de navegación inmediatamente después de unir, de lo contrario escribir después de navegar",
                contentVisibility: "Cambiar automáticamente la visibilidad del contenido para mejorar el rendimiento de renderización",
                initRun: "Pasar páginas inmediatamente después de abrir",
                preload: "Precargar la siguiente página para acelerar",
                click2ImportRule: "Haga clic para importar el enlace de reglas base, luego espere hasta que la actualización esté completa: ",
                forceAllBody: "¿Unir el cuerpo completo de la página?",
                openInNewTab: "Abrir URLs de adiciones en una nueva pestaña",
                importSucc: "Importación completada",
                import: "Importar",
                editCurrent: "Editar regla para la actual",
                editBlacklist: "Editar URLs de la lista negra, una por línea, admite ? * para comodín",
                upBtnImg: "Icono de volver al inicio",
                downBtnImg: "Icono de ir al pie de página",
                sideControllerIcon: "Icono de la barra lateral",
                loadingTextTitle: "Texto de carga",
                dbClick2StopCtrl: "Tecla Ctrl",
                dbClick2StopAlt: "Tecla Alt",
                dbClick2StopShift: "Tecla Shift",
                dbClick2StopMeta: "Tecla Meta",
                dbClick2StopKey: "Tecla de acceso rápido",
                pageElementCss: "Estilo personalizado para los elementos principales de la página",
                customCss: "CSS completo personalizado",
                firstAlert: "No ha importado la regla base, por favor seleccione la regla adecuada para importar",
                picker: "Selector de elementos de página de Pagetual",
                closePicker: "Cerrar selector de Pagetual",
                pickerPlaceholder: "Selector de elementos, déjelo vacío si no tiene idea",
                pickerCheck: "Comprobar selector y copiar",
                switchSelector: "Haga clic para cambiar el elemento",
                gotoEdit: "Ir a editar la regla con el selector actual",
                manualMode: "Deshabilitar unión, pasar páginas manualmente con las teclas de flecha derecha (o despachar evento 'pagetual.next')",
                clickMode: "Deshabilitar unión, hacer clic automáticamente en la siguiente página al desplazarse al final de la página",
                pageBarMenu: "Haga clic en el centro de la barra de página para abrir el menú del selector",
                nextSwitch: "Cambiar al siguiente enlace",
                arrowToScroll: "Presione la tecla de flecha izquierda para desplazarse anterior y la tecla de flecha derecha para desplazarse siguiente",
                sideController: "Mostrar la barra de control de paginación en la barra lateral",
                sideControllerScroll: "Alternar desplazamiento",
                sideControllerAlways: "Mostrar siempre",
                hideLoadingIcon: "Ocultar animación de carga",
                hideBarArrow: "Ocultar flecha para la barra de página",
                duplicate: "Pagetual duplicado ha sido instalado, ¡revise su gestor de scripts!",
                forceStateIframe: "Incrustar página completa como iframe",
                forceStateDynamic: "Cargar contenido dinámico a través de iframe",
                forceStateDisable: "Deshabilitar pasar páginas en este sitio",
                autoScrollRate: "Velocidad de desplazamiento (1~1000)",
                disableAutoScroll: "Detener desplazamiento automático",
                enableAutoScroll: "Habilitar desplazamiento automático",
                toggleAutoScroll: "Alternar desplazamiento automático",
                ruleRequest: "Solicitud de regla",
                page: "Página ",
                prevPage: "Página anterior",
                nextPage: "Página siguiente",
                errorRulesMustBeArray: "¡Las reglas deben ser un array!",
                errorJson: "Error JSON, ¡verifique de nuevo!",
                editSuccess: "Editado exitosamente",
                errorWrongUrl: "URL incorrecta, ¡verifique de nuevo!",
                errorAlreadyExists: "¡Ya existe!",
                settingsSaved: "La configuración se ha guardado, actualice para ver",
                iframe: "Iframe",
                dynamic: "Dinámico",
                reloadPage: "Edición completada, ¿recargar página ahora?",
                copied: "Copiado",
                noValidContent: "No se detectó contenido válido, puede ser necesario realizar una acción de Captcha, haga clic para ver",
                outOfDate: "El script está desactualizado, ¡actualice a la última versión a tiempo!",
                hideBarTips: "Ocultar la barra de paginación, alternar experiencia inmersiva",
                setConfigPage: "Establecer la página actual como la página de configuración predeterminada",
                wedata2github: "Cambiar la dirección de wedata a la dirección espejo en el repositorio de GitHub",
                addOtherProp: "Agregar propiedad de regla",
                addNextSelector: "Agregar contenido del selector como nextLink",
                addPageSelector: "Agregar contenido del selector como pageElement",
                propName: "Ingrese el nombre de la propiedad de la regla",
                propValue: "Ingrese el valor de la propiedad de la regla",
                customFirst: "Ignorar caché para reglas personalizadas locales",
                rulesExample: "Ejemplo de reglas",
                lastPage: "Llegó a la última página",
                lastPageTips: "Mostrar consejos al llegar a la última página"
            }
        },
        {
            // Translated by Prankster 199 (vfggf95565).
            name: "Arabic",
            match: ["ar", "ar-AE", "ar-BH", "ar-DZ", "ar-EG", "ar-IQ", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-OM", "ar-QA", "ar-SA", "ar-SY", "ar-TN", "ar-YE"],
            encode: true, // In Firefox, Arabic characters may cause issues.
            lang: {
                enableDebug: "%D8%AA%D9%85%D9%83%D9%8A%D9%86%20%D8%AA%D8%B5%D8%AD%D9%8A%D8%AD%20%D8%A7%D9%84%D8%A3%D8%AE%D8%B7%D8%A7%D8%A1",
                updateNotification: "%D8%A5%D8%B4%D8%B9%D8%A7%D8%B1%20%D8%A8%D8%B9%D8%AF%20%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF",
                disable: "%D9%85%D8%B9%D8%B7%D9%84",
                disableSite: "%D8%AA%D8%A8%D8%AF%D9%8A%D9%84%20%D8%AD%D8%A7%D9%84%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D8%B7%D9%8A%D9%84/%D8%A7%D9%84%D8%AA%D9%81%D8%B9%D9%8A%D9%84%20%D9%84%D9%84%D9%85%D9%88%D9%82%D8%B9",
                disableSiteTips: "%D9%85%D8%B9%D8%B7%D9%84%20%D8%B9%D9%84%D9%89%20%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9",
                enableSiteTips: "%D9%85%D9%81%D8%B9%D9%84%20%D8%B9%D9%84%D9%89%20%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9",
                enable: "%D9%85%D9%81%D8%B9%D9%84",
                toTop: "%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89",
                toBottom: "%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%A3%D8%B3%D9%81%D9%84",
                current: "%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AD%D8%A7%D9%84%D9%8A%D8%A9",
                forceIframe: "%D8%A5%D8%AC%D8%A8%D8%A7%D8%B1%20%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%84%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9",
                cancelForceIframe: "%D8%A5%D9%84%D8%BA%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D8%A7%D9%84%D9%82%D8%B3%D8%B1%D9%8A",
                configure: "%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF",
                firstUpdate: "%D8%A7%D9%86%D9%82%D8%B1%20%D9%87%D9%86%D8%A7%20%D9%84%D8%AA%D9%81%D8%B9%D9%8A%D9%84%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D9%84%D8%A3%D9%88%D9%84%20%D9%85%D8%B1%D8%A9",
                update: "%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%B9%D8%A8%D8%B1%20%D8%A7%D9%84%D8%A5%D9%86%D8%AA%D8%B1%D9%86%D8%AA",
                click2update: "%D8%A7%D9%86%D9%82%D8%B1%20%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D9%85%D9%86%20%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B7%20%D8%A7%D9%84%D8%A2%D9%86",
                loadNow: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%20%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A%D9%8B%D8%A7",
                loadConfirm: "%D9%83%D9%85%20%D8%B9%D8%AF%D8%AF%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%8A%20%D8%AA%D8%B1%D8%BA%D8%A8%20%D8%AA%D8%AD%D9%85%D9%8A%D9%84%D9%87%D8%A7%D8%9F%20(0%20%D9%8A%D8%B9%D9%86%D9%8A%20%D9%84%D8%A7%D9%86%D9%87%D8%A7%D8%A6%D9%8A)",
                noNext: "%D9%84%D9%85%20%D9%8A%D8%AA%D9%85%20%D8%A7%D9%84%D8%B9%D8%AB%D9%88%D8%B1%20%D8%B9%D9%84%D9%89%20%D8%B1%D8%A7%D8%A8%D8%B7%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9%D8%8C%20%D9%8A%D8%B1%D8%AC%D9%89%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9",
                passSec: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%85%D9%86%D8%B0%20#t#%20%D8%AB%D8%A7%D9%86%D9%8A%D8%A9",
                passMin: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%85%D9%86%D8%B0%20#t#%20%D8%AF%D9%82%D9%8A%D9%82%D8%A9",
                passHour: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%85%D9%86%D8%B0%20#t#%20%D8%B3%D8%A7%D8%B9%D8%A9",
                passDay: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%85%D9%86%D8%B0%20#t#%20%D9%8A%D9%88%D9%85",
                cantDel: "%D9%84%D8%A7%20%D9%8A%D9%85%D9%83%D9%86%20%D8%AD%D8%B0%D9%81%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%A7%D9%84%D9%85%D8%AF%D9%85%D8%AC%D8%A9",
                confirmDel: "%D9%87%D9%84%20%D8%A3%D9%86%D8%AA%20%D9%85%D8%AA%D8%A3%D9%83%D8%AF%20%D9%85%D9%86%20%D8%AD%D8%B0%D9%81%20%D9%87%D8%B0%D9%87%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%D8%9F",
                updateSucc: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D8%A8%D9%86%D8%AC%D8%A7%D8%AD",
                beginUpdate: "%D8%A8%D8%AF%D8%A3%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%D8%8C%20%D9%8A%D8%B1%D8%AC%D9%89%20%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%B8%D8%A7%D8%B1%20%D9%84%D8%AD%D8%B8%D8%A9",
                customUrls: "%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF%20%D8%B1%D8%A7%D8%A8%D8%B7%20%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20Pagetual%20%D8%A3%D9%88%20AutoPagerize%D8%8C%20%D8%B1%D8%A7%D8%A8%D8%B7%20%D9%88%D8%A7%D8%AD%D8%AF%20%D9%84%D9%83%D9%84%20%D8%B3%D8%B7%D8%B1",
                customRules: "%D8%A5%D8%AF%D8%AE%D8%A7%D9%84%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%A7%D9%84%D9%85%D8%AE%D8%B5%D8%B5%D8%A9.%20%3Ca%20href='#t#'%3E%E2%9C%8D%EF%B8%8F%D8%B3%D8%A7%D9%87%D9%85%20%D8%A8%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%3C/a%3E",
                save: "%D8%AD%D9%81%D8%B8",
                loadingText: "%D8%AC%D8%A7%D8%B1%D9%8D%20%D8%A7%D9%84%D8%AA%D8%AD%D9%85%D9%8A%D9%84...",
                opacity: "%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D9%81%D9%8A%D8%A9",
                opacityPlaceholder: "0:%20%D8%A5%D8%AE%D9%81%D8%A7%D8%A1%20%D8%A7%D9%84%D9%81%D8%A7%D8%B5%D9%84",
                hideBar: "%D8%A5%D8%AE%D9%81%D8%A7%D8%A1%20%D8%A7%D9%84%D9%81%D8%A7%D8%B5%D9%84%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D8%AD%D9%8A",
                hideBarButNoStop: "%D8%A5%D8%AE%D9%81%D8%A7%D8%A1%D8%8C%20%D9%84%D9%83%D9%86%20%D9%84%D8%A7%20%D8%AA%D8%AA%D9%88%D9%82%D9%81",
                dbClick2Stop: "%D8%A7%D9%86%D9%82%D8%B1%20%D9%85%D8%B2%D8%AF%D9%88%D8%AC%20%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%AD%D8%A9%20%D8%A7%D9%84%D9%81%D8%A7%D8%B1%D8%BA%D8%A9%20%D9%84%D9%84%D8%A5%D9%8A%D9%82%D8%A7%D9%81",
                sortTitle: "%D9%8A%D8%AA%D9%85%20%D8%AA%D9%81%D8%B9%D9%8A%D9%84%20%D8%A7%D9%84%D9%81%D8%B1%D8%B2%20%D8%A8%D8%B9%D8%AF%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%20%D9%84%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF",
                autoRun: "%D8%AA%D9%85%D9%83%D9%8A%D9%86%20%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A%20(%D9%88%D8%B6%D8%B9%20%D8%A7%D9%84%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D9%84%D8%B3%D9%88%D8%AF%D8%A7%D8%A1)",
                autoLoadNum: "%D8%B9%D8%AF%D8%AF%20%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D8%B3%D8%A8%D9%82",
                turnRate: "%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D9%82%D8%A7%D9%84%20%D9%84%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9%20%D8%B9%D9%86%D8%AF%D9%85%D8%A7%20%D8%AA%D9%83%D9%88%D9%86%20%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D9%81%D8%A9%20%D8%A3%D9%82%D9%84%20%D9%85%D9%86%20%E3%80%90X%E3%80%91%20%D9%85%D8%B1%D8%A7%D8%AA%20%D8%A7%D8%B1%D8%AA%D9%81%D8%A7%D8%B9%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D9%85%D9%86%20%D8%A7%D9%84%D8%AA%D8%B0%D9%8A%D9%8A%D9%84",
                inputPageNum: "%D8%A3%D8%AF%D8%AE%D9%84%20%D8%B1%D9%82%D9%85%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D9%84%D9%84%D8%A7%D9%86%D8%AA%D9%82%D8%A7%D9%84",
                enableHistory: "%D9%83%D8%AA%D8%A7%D8%A8%D8%A9%20%D8%B3%D8%AC%D9%84%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D8%AD%20%D8%A8%D8%B9%D8%AF%20%D8%AA%D8%AD%D9%88%D9%8A%D9%84%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9",
                enableHistoryAfterInsert: "%D9%83%D8%AA%D8%A7%D8%A8%D8%A9%20%D8%B3%D8%AC%D9%84%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D8%AD%20%D9%81%D9%88%D8%B1%D9%8B%D8%A7%20%D8%A8%D8%B9%D8%AF%20%D8%A7%D9%84%D8%AF%D9%85%D8%AC%D8%8C%20%D8%A3%D9%88%20%D8%A8%D8%B9%D8%AF%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D8%AD",
                contentVisibility: "%D8%A7%D9%84%D8%AA%D9%86%D9%82%D9%84%20%D8%A7%D9%84%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A%20%D9%84%D8%B1%D8%A4%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D9%88%D9%89,%20%D9%84%D8%AA%D8%AD%D8%B3%D9%8A%D9%86%20%D8%A3%D8%AF%D8%A7%D8%A1%20%D8%A7%D9%84%D8%B9%D8%B1%D8%B6",
                initRun: "%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D9%82%D8%A7%D9%84%20%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D9%81%D9%88%D8%B1%20%D8%A7%D9%84%D9%81%D8%AA%D8%AD",
                preload: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9%20%D9%85%D8%B3%D8%A8%D9%82%D9%8B%D8%A7%20%D9%84%D8%AA%D8%B3%D8%B1%D9%8A%D8%B9%20%D8%A7%D9%84%D8%A3%D8%AF%D8%A7%D8%A1",
                click2ImportRule: "%D8%A7%D9%86%D9%82%D8%B1%20%D9%84%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF%20%D8%B1%D8%A7%D8%A8%D8%B7%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%A7%D9%84%D8%A3%D8%B3%D8%A7%D8%B3%D9%8A%D8%A9%D8%8C%20%D8%AB%D9%85%20%D8%A7%D9%86%D8%AA%D8%B8%D8%B1%20%D8%AD%D8%AA%D9%89%20%D9%8A%D9%83%D8%AA%D9%85%D9%84%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB",
                forceAllBody: "%D8%AF%D9%85%D8%AC%20%D9%83%D8%A7%D9%85%D9%84%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D9%83%D8%A5%D8%B7%D8%A7%D8%B1%D8%9F",
                openInNewTab: "%D9%81%D8%AA%D8%AD%20%D8%A7%D9%84%D8%B1%D9%88%D8%A7%D8%A8%D8%B7%20%D8%A7%D9%84%D8%A5%D8%B6%D8%A7%D9%81%D9%8A%D8%A9%20%D9%81%D9%8A%20%D8%B9%D9%84%D8%A7%D9%85%D8%A9%20%D8%AA%D8%A8%D9%88%D9%8A%D8%A8%20%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9",
                importSucc: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF%20%D8%A8%D9%86%D8%AC%D8%A7%D8%AD",
                import: "%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF",
                editCurrent: "%D8%AA%D8%AD%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20%D9%84%D9%84%D8%AD%D8%A7%D9%84%D9%8A%D8%A9",
                editBlacklist: "%D8%AA%D8%AD%D8%B1%D9%8A%D8%B1%20%D8%B9%D9%86%D8%A7%D9%88%D9%8A%D9%86%20%D8%A7%D9%84%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D9%84%D8%B3%D9%88%D8%AF%D8%A7%D8%A1%D8%8C%20%D8%B3%D8%B7%D8%B1%20%D8%A8%D8%B3%D8%B7%D8%B1%D8%8C%20%D8%AF%D8%B9%D9%85%D8%9F%20*%20%D9%84%D9%84%D8%B1%D9%85%D9%88%D8%B2%20%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%B1%D9%83%D8%A9",
                upBtnImg: "%D8%A3%D9%8A%D9%82%D9%88%D9%86%D8%A9%20%D8%A7%D9%84%D8%B9%D9%88%D8%AF%D8%A9%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89",
                downBtnImg: "%D8%A3%D9%8A%D9%82%D9%88%D9%86%D8%A9%20%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D9%82%D8%A7%D9%84%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%A3%D8%B3%D9%81%D9%84",
                sideControllerIcon: "%D8%A3%D9%8A%D9%82%D9%88%D9%86%D8%A9%20%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D8%B7%20%D8%A7%D9%84%D8%AC%D8%A7%D9%86%D8%A8%D9%8A",
                loadingTextTitle: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%86%D8%B5",
                dbClick2StopCtrl: "%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20Ctrl",
                dbClick2StopAlt: "%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20Alt",
                dbClick2StopShift: "%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20Shift",
                dbClick2StopMeta: "%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20Meta",
                dbClick2StopKey: "%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD%20%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D8%B5%D8%A7%D8%B1",
                pageElementCss: "%D9%86%D9%85%D8%B7%20%D9%85%D8%AE%D8%B5%D8%B5%20%D9%84%D8%B9%D9%86%D8%A7%D8%B5%D8%B1%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9",
                customCss: "%D9%85%D8%AE%D8%B5%D8%B5%20%D8%A8%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%20CSS%20%D9%86%D9%85%D8%B7",
                firstAlert: "%D9%84%D9%85%20%D8%AA%D8%B3%D8%AA%D9%88%D8%B1%D8%AF%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%A7%D9%84%D8%A3%D8%B3%D8%A7%D8%B3%D9%8A%D8%A9%20%D8%A8%D8%B9%D8%AF%D8%8C%20%D9%8A%D8%B1%D8%AC%D9%89%20%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9%20%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF",
                picker: "%D9%85%D8%AD%D8%AF%D8%AF%20%D8%B9%D9%86%D8%A7%D8%B5%D8%B1%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20Pagetual",
                closePicker: "%D8%A5%D8%BA%D9%84%D8%A7%D9%82%20%D9%85%D8%AD%D8%AF%D8%AF%20Pagetual",
                pickerPlaceholder: "%D9%85%D8%AD%D8%AF%D8%AF%20%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D8%B5%D8%B1%D8%8C%20%D8%A7%D8%AA%D8%B1%D9%83%D9%87%20%D9%81%D8%A7%D8%B1%D8%BA%D9%8B%D8%A7%20%D8%A5%D8%B0%D8%A7%20%D9%83%D9%86%D8%AA%20%D9%84%D8%A7%20%D8%AA%D8%B9%D8%B1%D9%81",
                pickerCheck: "%D8%AA%D8%AD%D9%82%D9%82%20%D9%85%D9%86%20%D8%A7%D9%84%D9%85%D8%AD%D8%AF%D8%AF%20%D9%88%D9%86%D8%B3%D8%AE",
                switchSelector: "%D8%A7%D9%86%D9%82%D8%B1%20%D9%84%D9%84%D8%AA%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D8%B5%D8%B1",
                gotoEdit: "%D8%A7%D8%B0%D9%87%D8%A8%20%D9%84%D8%AA%D8%AD%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%A8%D8%A7%D9%84%D9%85%D8%AD%D8%AF%D8%AF%20%D8%A7%D9%84%D8%AD%D8%A7%D9%84%D9%8A",
                manualMode: "%D8%AA%D8%B9%D8%B7%D9%8A%D9%84%20%D8%A7%D9%84%D8%AF%D9%85%D8%AC/%D8%A7%D9%84%D8%B1%D8%A8%D8%B7%D8%8C%20%D9%88%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85%20%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20%D8%A7%D9%84%D8%A7%D8%AA%D8%AC%D8%A7%D9%87%20%D8%A7%D9%84%D8%A3%D9%8A%D9%85%D9%86%20%D9%8A%D8%AF%D9%88%D9%8A%D9%8B%D8%A7%20%D9%84%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%D8%8C%20%D9%88%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85%20%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20%D8%A7%D9%84%D8%B3%D9%87%D9%85%20%D8%A7%D9%84%D8%A3%D9%8A%D8%B3%D8%B1%20%D9%84%D9%84%D8%B1%D8%AC%D9%88%D8%B9",
                clickMode: "%D8%AA%D8%B9%D8%B7%D9%8A%D9%84%20%D8%A7%D9%84%D8%AF%D9%85%D8%AC/%D8%A7%D9%84%D8%B1%D8%A8%D8%B7%D8%8C%20%D8%B9%D9%86%D8%AF%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20%D8%A5%D9%84%D9%89%20%D9%86%D9%87%D8%A7%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%D8%8C%20%D8%B3%D9%8A%D8%AA%D9%85%20%D8%A7%D9%84%D9%86%D9%82%D8%B1%20%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A%D9%8B%D8%A7%20%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9",
                pageBarMenu: "%D8%A7%D9%86%D9%82%D8%B1%20%D8%B9%D9%84%D9%89%20%D9%85%D8%B1%D9%83%D8%B2%20%D8%B4%D8%B1%D9%8A%D8%B7%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D9%84%D9%81%D8%AA%D8%AD%20%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AF",
                nextSwitch: "%D8%AA%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B7%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A",
                arrowToScroll: "%D8%A7%D9%86%D9%82%D8%B1%20%D8%B9%D9%84%D9%89%20%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20%D8%A7%D9%84%D8%B3%D9%87%D9%85%20%D8%A7%D9%84%D8%A3%D9%8A%D9%85%D9%86%20%D9%84%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%20%D9%88%D9%85%D9%81%D8%AA%D8%A7%D8%AD%20%D8%A7%D9%84%D8%B3%D9%87%D9%85%20%D8%A7%D9%84%D8%A3%D9%8A%D8%B3%D8%B1%20%D9%84%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D8%B3%D8%A7%D8%A8%D9%82",
                sideController: "%D8%B9%D8%B1%D8%B6%20%D8%B4%D8%B1%D9%8A%D8%B7%20%D8%A7%D9%84%D8%AA%D8%AD%D9%83%D9%85%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D8%AD%20%D8%A7%D9%84%D8%AA%D8%B1%D9%82%D9%8A%D9%85%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D8%B7%20%D8%A7%D9%84%D8%AC%D8%A7%D9%86%D8%A8%D9%8A",
                sideControllerScroll: "%D8%AA%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1",
                sideControllerAlways: "%D8%B9%D8%B1%D8%B6%20%D8%AF%D8%A7%D8%A6%D9%85%D9%8B%D8%A7",
                hideLoadingIcon: "%D8%A5%D8%AE%D9%81%D8%A7%D8%A1%20%D8%B1%D9%85%D8%B2%20%D8%A7%D9%84%D8%AA%D8%AD%D9%85%D9%8A%D9%84",
                hideBarArrow: "%D8%A5%D8%AE%D9%81%D8%A7%D8%A1%20%D8%B3%D9%87%D9%85%20%D8%B4%D8%B1%D9%8A%D8%B7%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9",
                duplicate: "%D8%AA%D9%85%20%D8%AA%D8%AB%D8%A8%D9%8A%D8%AA%20Pagetual%20%D9%85%D9%83%D8%B1%D8%B1%D8%8C%20%D8%AA%D8%AD%D9%82%D9%82%20%D9%85%D9%86%20%D9%85%D8%AF%D9%8A%D8%B1%20%D8%A7%D9%84%D9%86%D8%B5%D9%88%D8%B5%20%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AE%D8%A7%D8%B5%20%D8%A8%D9%83!",
                forceStateIframe: "%D8%AA%D8%B6%D9%85%D9%8A%D9%86%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A8%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%20%D9%83%D8%A5%D8%B7%D8%A7%D8%B1",
                forceStateDynamic: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D9%88%D9%89%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%D8%A7%D9%85%D9%8A%D9%83%D9%8A%20%D8%B9%D8%A8%D8%B1%20%D8%A7%D9%84%D8%A5%D8%B7%D8%A7%D8%B1",
                forceStateDisable: "%D8%AA%D8%B9%D8%B7%D9%8A%D9%84%20%D8%AA%D8%AD%D9%88%D9%8A%D9%84%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D8%B9%D9%84%D9%89%20%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9",
                autoScrollRate: "%D8%B3%D8%B1%D8%B9%D8%A9%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20(1~1000)",
                disableAutoScroll: "%D8%A5%D9%8A%D9%82%D8%A7%D9%81%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A",
                enableAutoScroll: "%D8%AA%D9%85%D9%83%D9%8A%D9%86%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A",
                toggleAutoScroll: "%D8%AA%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B1%20%D8%A7%D9%84%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A",
                ruleRequest: "%D8%B7%D9%84%D8%A8%20%D9%82%D8%A7%D8%B9%D8%AF%D8%A9",
                page: "%D8%B5%D9%81%D8%AD%D8%A9%20",
                prevPage: "%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%B3%D8%A7%D8%A8%D9%82%D8%A9",
                nextPage: "%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9",
                errorRulesMustBeArray: "%D9%8A%D8%AC%D8%A8%20%D8%A3%D9%86%20%D8%AA%D9%83%D9%88%D9%86%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D9%85%D8%B5%D9%81%D9%88%D9%81%D8%A9!",
                errorJson: "%D8%AE%D8%B7%D8%A3%20%D9%81%D9%8A%20JSON%D8%8C%20%D8%AA%D8%AD%D9%82%D9%82%20%D9%85%D8%B1%D8%A9%20%D8%A3%D8%AE%D8%B1%D9%89!",
                editSuccess: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AA%D8%AD%D8%B1%D9%8A%D8%B1%20%D8%A8%D9%86%D8%AC%D8%A7%D8%AD",
                errorWrongUrl: "%D8%B9%D9%86%D9%88%D8%A7%D9%86%20URL%20%D8%AE%D8%A7%D8%B7%D8%A6%D8%8C%20%D8%AA%D8%AD%D9%82%D9%82%20%D9%85%D8%B1%D8%A9%20%D8%A3%D8%AE%D8%B1%D9%89!",
                errorAlreadyExists: "%D9%85%D9%88%D8%AC%D9%88%D8%AF%20%D8%A8%D8%A7%D9%84%D9%81%D8%B9%D9%84!",
                settingsSaved: "%D8%AA%D9%85%20%D8%AD%D9%81%D8%B8%20%D8%A7%D9%84%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D8%A7%D8%AA%D8%8C%20%D9%82%D9%85%20%D8%A8%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%84%D8%B9%D8%B1%D8%B6",
                iframe: "%D8%A5%D8%B7%D8%A7%D8%B1",
                dynamic: "%D8%AF%D9%8A%D9%86%D8%A7%D9%85%D9%8A%D9%83%D9%8A",
                reloadPage: "%D8%A7%D9%83%D8%AA%D9%85%D9%84%20%D8%A7%D9%84%D8%AA%D8%AD%D8%B1%D9%8A%D8%B1%D8%8C%20%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9%20%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%A2%D9%86%D8%9F",
                copied: "%D8%AA%D9%85%20%D8%A7%D9%84%D9%86%D8%B3%D8%AE",
                noValidContent: "%D9%84%D9%85%20%D9%8A%D8%AA%D9%85%20%D8%A7%D9%84%D9%83%D8%B4%D9%81%20%D8%B9%D9%86%20%D9%85%D8%AD%D8%AA%D9%88%D9%89%20%D8%B5%D8%A7%D9%84%D8%AD%D8%8C%20%D9%82%D8%AF%20%D9%8A%D9%83%D9%88%D9%86%20%D8%A7%D9%84%D8%A5%D8%AC%D8%B1%D8%A7%D8%A1%20Captcha%20%D9%85%D8%B7%D9%84%D9%88%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A7%D9%86%D9%82%D8%B1%20%D9%84%D8%B9%D8%B1%D8%B6",
                outOfDate: "%D8%A7%D9%84%D9%86%D8%B5%20%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D9%8A%20%D9%82%D8%AF%D9%8A%D9%85%D8%8C%20%D9%82%D9%85%20%D8%A8%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1%20%D8%A7%D9%84%D8%A3%D8%AD%D8%AF%D8%AB%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%88%D9%82%D8%AA%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8!",
                hideBarTips: "%D8%A5%D8%AE%D9%81%D8%A7%D8%A1%20%D8%B4%D8%B1%D9%8A%D8%B7%20%D8%A7%D9%84%D8%AA%D8%AD%D9%83%D9%85%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D8%AD%20%D8%A7%D9%84%D8%AA%D8%B1%D9%82%D9%8A%D9%85%20%D8%8C%20%D9%88%D8%A7%D9%84%D8%AA%D8%A8%D8%AF%D9%8A%D9%84%20%D9%84%D9%88%D8%B6%D8%B9%20%D9%83%D8%A7%D9%85%D9%84%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9",
                setConfigPage: "%D8%AA%D8%B9%D9%8A%D9%8A%D9%86%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AD%D8%A7%D9%84%D9%8A%D8%A9%20%D9%83%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%20%D8%A7%D9%84%D8%A7%D9%81%D8%AA%D8%B1%D8%A7%D8%B6%D9%8A%D8%A9",
                wedata2github: "%D8%AA%D8%BA%D9%8A%D9%8A%D8%B1%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%D8%A7%D9%84%D9%88%D9%8A%D8%A8%20%D8%AF%D8%A7%D8%AA%D8%A7%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%D8%A7%D9%84%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D8%B1%D8%A2%D8%A9,%20%D9%81%D9%8A%20%D9%85%D8%B3%D8%AA%D9%88%D8%AF%D8%B9%20%D8%AC%D9%8A%D8%AA%20%D9%87%D8%A7%D8%A8",
                addOtherProp: "%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20%D8%AE%D8%A7%D8%B5%D9%8A%D8%A9%20%D9%82%D8%A7%D8%B9%D8%AF%D8%A9",
                addNextSelector: "%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20%D9%85%D8%AD%D8%AA%D9%88%D9%89%20%D8%A7%D9%84%D9%85%D8%AD%D8%AF%D8%AF%20%D9%83%D9%80%20nextLink",
                addPageSelector: "%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20%D9%85%D8%AD%D8%AA%D9%88%D9%89%20%D8%A7%D9%84%D9%85%D8%AD%D8%AF%D8%AF%20%D9%83%D9%80%20pageElement",
                propName: "%D8%A3%D8%AF%D8%AE%D9%84%20%D8%A7%D8%B3%D9%85%20%D8%AE%D8%A7%D8%B5%D9%8A%D8%A9%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9",
                propValue: "%D8%A3%D8%AF%D8%AE%D9%84%20%D9%82%D9%8A%D9%85%D8%A9%20%D8%AE%D8%A7%D8%B5%D9%8A%D8%A9%20%D8%A7%D9%84%D9%82%D8%A7%D8%B9%D8%AF%D8%A9",
                customFirst: "%D8%AA%D8%AC%D8%A7%D9%87%D9%84%20%D8%B0%D8%A7%D9%83%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AE%D8%B2%D9%8A%D9%86%20%D8%A7%D9%84%D9%85%D8%A4%D9%82%D8%AA%20%D9%84%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%A7%D9%84%D9%85%D8%AE%D8%B5%D8%B5%D8%A9%20%D8%A7%D9%84%D9%85%D8%AD%D9%84%D9%8A%D8%A9",
                rulesExample: "%D9%85%D8%AB%D8%A7%D9%84%20%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF",
                lastPage: "%D8%AA%D9%85%20%D8%A7%D9%84%D9%88%D8%B5%D9%88%D9%84%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1%D8%A9",
                lastPageTips: "%D8%B9%D8%B1%D8%B6%20%D8%AA%D9%84%D9%85%D9%8A%D8%AD%D8%A7%D8%AA%20%D8%B9%D9%86%D8%AF%20%D8%A7%D9%84%D9%88%D8%B5%D9%88%D9%84%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1%D8%A9"
            }
        },
        {
            name: "简体中文",
            match: ["zh-CN", "zh-SG"],
            lang: {
                enableDebug: "调试模式，输出信息至控制台",
                updateNotification: "规则更新后提示",
                disable: "暂时禁用",
                disableSite: "站点禁用开关",
                disableSiteTips: "已在此站禁用",
                enableSiteTips: "已在此站启用",
                enable: "启用自动翻页",
                toTop: "回到顶部",
                toBottom: "前往页尾",
                current: "当前页",
                forceIframe: "强制拼接",
                cancelForceIframe: "取消强制拼接",
                configure: "打开配置页面",
                firstUpdate: "点击此处初始化规则",
                update: "更新在线规则",
                click2update: "点击立即更新规则",
                loadNow: "立即翻页",
                loadConfirm: "要翻几页？（0为不间断）",
                noNext: "没有找到下一页，请新建规则",
                passSec: "更新于 #t# 秒前",
                passMin: "更新于 #t# 分钟前",
                passHour: "更新于 #t# 小时前",
                passDay: "更新于 #t# 天前",
                cantDel: "无法删除内置规则",
                confirmDel: "是否确认要删除此规则？",
                updateSucc: "更新成功",
                beginUpdate: "正在更新，请耐心等待，不要关闭页面",
                customUrls: "导入 Pagetual 或 AutoPagerize 规则 url，一行一条",
                customRules: "输入【东方永页机】格式的自定义规则 <a href='#t#'>✍️贡献规则</a>",
                save: "保存设置",
                loadingText: "少女祈祷中...",
                opacity: "不透明值",
                opacityPlaceholder: "0: 隐藏分隔条",
                hideBar: "隐藏分页隔条",
                hideBarButNoStop: "隐藏但不停止",
                dbClick2Stop: "空白处双击暂停翻页",
                sortTitle: "排序在下次更新规则后生效",
                autoRun: "自动启用，否则为白名单模式",
                autoLoadNum: "自动加载指定页数",
                turnRate: "距离页尾【X】倍页面高度时就开始翻页",
                inputPageNum: "输入页码跳转",
                enableHistory: "翻页后写入历史记录",
                enableHistoryAfterInsert: "拼接后立即写入历史记录，否则浏览完毕后再行写入",
                contentVisibility: "自动切换 contentVisibility，提升渲染性能",
                initRun: "打开页面后立即尝试翻页，否则滚动至页尾再翻页",
                preload: "翻页前预读下一页，加速浏览",
                click2ImportRule: "点击下方任意一条添加规则库，并静待更新成功，请预先打开链接确认能正常访问再行导入：",
                forceAllBody: "是否拼接整个页面？",
                openInNewTab: "使拼接页面的内容在新页面打开",
                importSucc: "导入成功",
                import: "导入",
                editCurrent: "编辑此站规则",
                editBlacklist: "编辑黑名单网址，一行一条，支持? *通配符与正则",
                upBtnImg: "回到页首图标",
                downBtnImg: "前往页尾图标",
                sideControllerIcon: "侧边栏图标",
                loadingTextTitle: "加载中文字",
                dbClick2StopCtrl: "Ctrl",
                dbClick2StopAlt: "Alt",
                dbClick2StopShift: "Shift",
                dbClick2StopMeta: "Meta",
                dbClick2StopKey: "快捷键",
                pageElementCss: "页面主体框架的样式",
                customCss: "自定义 css",
                firstAlert: "你还未导入规则库，请选择合适的规则库导入哦",
                picker: "东方永页机主体元素抓取器",
                closePicker: "关闭东方永页机抓取器",
                pickerPlaceholder: "元素选择器，没想法建议留空",
                pickerCheck: "检查你编辑的选择器并复制",
                switchSelector: "点击切换元素",
                gotoEdit: "使用当前的选择器前往编辑规则",
                manualMode: "禁用拼接，手动用右方向键翻页，可使用左方向键返回",
                clickMode: "禁用拼接，滚动至页尾时自动点击下一页",
                pageBarMenu: "点击分隔条中间弹出菜单",
                nextSwitch: "切换其他页码",
                arrowToScroll: "左方向键滚动至上一页，右方向键滚动至下一页",
                sideController: "在侧边显示翻页控制栏",
                sideControllerScroll: "滚动开关",
                sideControllerAlways: "始终显示",
                hideLoadingIcon: "隐藏加载动画",
                hideBarArrow: "隐藏分隔条定位箭头",
                duplicate: "检测到永页机重复安装，请删除其他脚本管理器中的永页机!",
                forceStateIframe: "以 iframe 嵌入整页",
                forceStateDynamic: "通过 iframe 加载动态内容后取出",
                forceStateDisable: "在此站禁用",
                autoScrollRate: "滚动速度（1~1000）",
                disableAutoScroll: "停止自动滚动",
                enableAutoScroll: "开启自动滚动",
                toggleAutoScroll: "自动滚动开关",
                ruleRequest: "适配请求",
                page: "Page ",
                prevPage: "上一页",
                nextPage: "下一页",
                errorRulesMustBeArray: "规则必须为数组形式!",
                errorJson: "JSON 格式有错，请重新检查!",
                editSuccess: "编辑成功",
                errorWrongUrl: "URL 错误, 请重新检查!",
                errorAlreadyExists: "已经存在!",
                settingsSaved: "设置已保存，刷新后生效",
                iframe: "强制拼接",
                dynamic: "动态加载",
                reloadPage: "编辑完成，是否立即刷新页面？",
                copied: "已复制",
                noValidContent: "没有检测到有效内容，可能需要人机校验，点击查看",
                outOfDate: "脚本已过时，请及时更新到最新版本！",
                hideBarTips: "隐藏分页隔条，沉浸式体验",
                setConfigPage: "将当前页面设为默认配置页",
                wedata2github: "将 wedata 地址更改为 github 仓库内的镜像地址",
                addOtherProp: "添加规则属性",
                addNextSelector: "添加选择器内容为 nextLink",
                addPageSelector: "添加选择器内容为 pageElement",
                propName: "输入规则属性名",
                propValue: "输入规则属性值",
                customFirst: "为本地自定义规则忽略缓存",
                rulesExample: "自定义规则详解",
                lastPage: "已到达最后一页",
                lastPageTips: "到达最后一页时进行提示"
            }
        },
        {
            name: "正體中文",
            match: ["zh", "zh-TW", "zh-HK"],
            lang: {
                enableDebug: "調試模式，輸出信息至控制台",
                updateNotification: "規則更新后提示",
                disable: "暫時禁用",
                disableSite: "站點禁用開關",
                disableSiteTips: "已在此站禁用",
                enableSiteTips: "已在此站啟用",
                enable: "啟用自動翻頁",
                toTop: "回到頂部",
                toBottom: "前往頁尾",
                current: "當前頁",
                forceIframe: "強制拼接",
                cancelForceIframe: "取消强制拼接",
                configure: "打開配置頁面",
                firstUpdate: "點擊此處初始化規則",
                update: "更新在綫規則",
                click2update: "點擊立即更新規則",
                loadNow: "立即翻頁",
                loadConfirm: "要翻几頁？（0為不間斷）",
                noNext: "沒有找到下一頁，請新建規則",
                passSec: "更新于 #t# 秒前",
                passMin: "更新于 #t# 分鐘前",
                passHour: "更新于 #t# 小時前",
                passDay: "更新于 #t# 天前",
                cantDel: "無法刪除内置規則",
                confirmDel: "是否確認要刪除此規則？",
                updateSucc: "更新成功",
                beginUpdate: "正在更新，請稍候",
                customUrls: "導入 Pagetual 或 AutoPagerize 規則 url，一行一條",
                customRules: "輸入【東方永頁機】格式的自定義規則 <a href='#t#'>✍️貢獻規則</a>",
                save: "存儲設置",
                loadingText: "少女祈禱中...",
                opacity: "不透明值",
                opacityPlaceholder: "0: 隱藏分隔條",
                hideBar: "隱藏分頁隔條",
                hideBarButNoStop: "隱藏但不停止",
                dbClick2Stop: "空白處雙擊暫停翻頁",
                sortTitle: "排序在下次更新規則後生效",
                autoRun: "自動啓用，否則為白名單模式",
                autoLoadNum: "自動加載指定頁數",
                turnRate: "距離頁尾【X】倍頁面高度時就開始翻頁",
                inputPageNum: "輸入頁碼跳轉",
                enableHistory: "翻頁后寫入歷史記錄",
                enableHistoryAfterInsert: "拼接後立即寫入歷史記錄，否則瀏覽完畢後再行寫入",
                contentVisibility: "自動切換 contentVisibility，提升渲染性能",
                initRun: "打開頁面后立即嘗試翻頁，否則滾動至頁尾再翻頁",
                preload: "翻頁前預讀下一頁，加速瀏覽",
                click2ImportRule: "點擊下方添加特殊規則庫，并靜待更新成功：",
                forceAllBody: "是否拼接整個頁面？",
                openInNewTab: "使拼接頁面的内容在新頁面打開",
                importSucc: "導入成功",
                import: "導入",
                editCurrent: "編輯此站規則",
                editBlacklist: "編輯黑名單網址，一行一條，支持? *通配符與正則",
                upBtnImg: "回到頁首圖標",
                downBtnImg: "前往頁尾圖標",
                sideControllerIcon: "側邊欄圖標",
                loadingTextTitle: "加載中文字",
                dbClick2StopCtrl: "Ctrl",
                dbClick2StopAlt: "Alt",
                dbClick2StopShift: "Shift",
                dbClick2StopMeta: "Meta",
                dbClick2StopKey: "快捷鍵",
                pageElementCss: "頁面主體框架的樣式",
                customCss: "自定義 css",
                firstAlert: "你還未導入規則庫，請選擇合適的規則庫導入哦",
                picker: "東方永頁機主體元素抓取器",
                closePicker: "關閉東方永頁機抓取器",
                pickerPlaceholder: "元素選擇器，沒想法建議留空",
                pickerCheck: "檢查你編輯的選擇器並複製",
                switchSelector: "點擊切換元素",
                gotoEdit: "使用當前的選擇器前往編輯規則",
                manualMode: "禁用拼接，手動用右方向鍵翻頁，左方向鍵返回",
                clickMode: "禁用拼接，滾動至頁尾時自動點擊下一頁",
                pageBarMenu: "點擊分隔條中間彈出菜單",
                nextSwitch: "切換其他頁碼",
                arrowToScroll: "左方向鍵滾動至上一頁，右方向鍵滾動至下一頁",
                sideController: "在側邊顯示翻頁控制欄",
                sideControllerScroll: "滾燈開關",
                sideControllerAlways: "始終顯示",
                hideLoadingIcon: "隱藏加載動畫",
                hideBarArrow: "隱藏分隔條定位箭頭",
                duplicate: "檢測到永頁機重複安裝，請刪除其他腳本管理器中的永頁機!",
                forceStateIframe: "以 iframe 嵌入整頁",
                forceStateDynamic: "通過 iframe 加載動態內容後取出",
                forceStateDisable: "在此站禁用",
                autoScrollRate: "滾動速度（1~1000）",
                disableAutoScroll: "停止自動滾動",
                enableAutoScroll: "開啟自動滾動",
                toggleAutoScroll: "自動滾動開關",
                ruleRequest: "適配請求",
                page: "Page ",
                prevPage: "上一頁",
                nextPage: "下一頁",
                errorRulesMustBeArray: "規則必須為陣列形式!",
                errorJson: "JSON 格式有錯，請重新檢查!",
                editSuccess: "編輯成功",
                errorWrongUrl: "URL 錯誤, 請重新檢查!",
                errorAlreadyExists: "已經存在!",
                settingsSaved: "設置已保存，刷新後生效",
                iframe: "強制拼接",
                dynamic: "動態加載",
                reloadPage: "編輯完成，是否立即刷新頁面？",
                copied: "已復制",
                noValidContent: "沒有檢測到有效内容，可能需要人機校驗，點擊查看",
                outOfDate: "脚本已過時，請及時更新到最新版本！",
                hideBarTips: "隱藏分頁隔條，沉浸式體驗",
                setConfigPage: "將當前頁面設為默認配置頁",
                wedata2github: "將 wedata 地址更改為 github 倉庫內的鏡像地址",
                addOtherProp: "添加規則屬性",
                addNextSelector: "添加選擇器內容為 nextLink",
                addPageSelector: "添加選擇器內容為 pageElement",
                propName: "輸入規則屬性名",
                propValue: "輸入規則屬性值",
                customFirst: "為本地自定義規則忽略緩存",
                rulesExample: "自定義規則詳解",
                lastPage: "已到達最後一頁",
                lastPageTips: "到達最後一頁時進行提示"
            }
        },
        {
            name: "日本語",
            match: ["ja"],
            lang: {
                enableDebug: "デバッグモード",
                updateNotification: "ルール更新後の通知",
                disable: "一時的に無効",
                disableSite: "無効状態の切り替え",
                disableSiteTips: "このサイトで既に無効になっています",
                enableSiteTips: "このサイトで既に有効になっています",
                enable: "ページめくりを有効にする",
                toTop: "トップに戻る",
                toBottom: "ページの下部に移動",
                current: "現在のページ",
                forceIframe: "強制ステッチ",
                cancelForceIframe: "強制ステッチをキャンセル",
                configure: "設定ページを開く",
                firstUpdate: "ここをクリックしてルールを初期化します",
                update: "更新ルール",
                click2update: "今すぐルールを更新してください",
                loadNow: "今すぐページをめくる",
                loadConfirm: "数ページめくりたいですか？（0は途切れない）",
                noNext: "次のページが見つかりません、新しいルールを作成してください",
                passSec: "#t#秒前に更新",
                passMin: "#t#分前に更新",
                passHour: "#t#時間前に更新",
                passDay: "#t#日前に更新",
                cantDel: "組み込みルールを削除できません",
                confirmDel: "このルールを削除してもよろしいですか？",
                updateSucc: "更新に成功しました",
                beginUpdate: "更新中、お待ちください",
                customUrls: "インポートルールのURL、1行に1つ",
                customRules: "【東方永頁機】の形式でカスタムルールを入力してください <a href='#t#'>✍️寄稿ルール</a>",
                save: "設定を保存",
                loadingText: "少女祈祷中...",
                opacity: "不透明値",
                opacityPlaceholder: "0: 隠す",
                hideBar: "ページ区切り文字を非表示にします",
                hideBarButNoStop: "非表示にするが停止しない",
                dbClick2Stop: "空白部分をダブルクリックしてページめくりを一時停止します",
                sortTitle: "並べ替えは、次のルールの更新後に有効になります",
                autoRun: "自動的に有効",
                autoLoadNum: "指定したページ数を自動的に読み込みます",
                turnRate: "ページの端からページの高さの【X】倍になったらページをめくる",
                inputPageNum: "ジャンプするページ番号を入力",
                enableHistory: "ページめくり後の履歴を書く",
                enableHistoryAfterInsert: "スプライシングの直後に履歴レコードを書き込みます。それ以外の場合は、閲覧後に書き込みます",
                contentVisibility: "contentVisibility を自動的に切り替えてレンダリング パフォーマンスを向上させる",
                initRun: "Webページを開いた直後にページをめくる",
                preload: "事前に次のページを読む",
                click2ImportRule: "以下をクリックして、ルールベースを追加します：",
                forceAllBody: "フルページ埋め込み？",
                openInNewTab: "スプライスされたページのコンテンツを新しいページで開きます",
                importSucc: "インポート完了",
                import: "インポート",
                editCurrent: "現在のルールの編集",
                editBlacklist: "ブラックリストのURLを編集し、1行ずつ、サポート? *ワイルドカード",
                upBtnImg: "トップアイコンに戻る",
                downBtnImg: "フッターアイコンに移動",
                sideControllerIcon: "サイドバー アイコン",
                loadingTextTitle: "テキストをロード",
                dbClick2StopCtrl: "Ctrlキー",
                dbClick2StopAlt: "Altキー",
                dbClick2StopShift: "Shiftキー",
                dbClick2StopMeta: "Metaキー",
                dbClick2StopKey: "Shortcutキー",
                pageElementCss: "ページ本文フレームの STYLE",
                customCss: "カスタム css",
                firstAlert: "ルールベースをインポートしていないため、インポートする適切なルールベースを選択してください",
                picker: "Pagetualページ要素ピッカー",
                closePicker: "Pagetualピッカーを閉じる",
                pickerPlaceholder: "わからない場合は空のままにしてください",
                pickerCheck: "セレクターをチェックしてコピー",
                switchSelector: "クリックして要素を切り替えます",
                gotoEdit: "現在のセレクターでルールを編集する",
                manualMode: "スプライシングを無効にします。手動で右の矢印キーを使用してページをめくります",
                clickMode: "スティッチングを無効にします。ページの最後までスクロールすると、次のページが自動的にクリックされます",
                pageBarMenu: "ページバーの中央をクリックしてメニューをポップアップ表示",
                nextSwitch: "次のページに切り替え",
                arrowToScroll: "左矢印キーで前へ、右矢印キーで次へ",
                sideController: "サイドバーにページング コントロール バーを表示する",
                sideControllerScroll: "スクロール スイッチ",
                sideControllerAlways: "常に表示",
                hideLoadingIcon: "読み込み中のアニメーションを隠す",
                hideBarArrow: "分割線の位置矢印を隠す",
                duplicate: "Pagetual の重複インストールが検出されました。他のスクリプト マネージャで永続的なページ マシンを削除してください!",
                forceStateIframe: "iframe にページ全体を埋め込む",
                forceStateDynamic: "iframe 経由で動的コンテンツを読み込む",
                forceStateDisable: "このステーションでのページめくりを無効にする",
                autoScrollRate: "スクロール速度 (1~1000)",
                disableAutoScroll: "自動スクロールを停止します",
                enableAutoScroll: "自動スクロールを有効にする",
                toggleAutoScroll: "自動スクロールの切り替え",
                ruleRequest: "ルール要求",
                page: "Page ",
                prevPage: "Prev page",
                nextPage: "Next page",
                errorRulesMustBeArray: "Rules must be a Array!",
                errorJson: "JSON error, check again!",
                editSuccess: "Edit successfully",
                errorWrongUrl: "Wrong url, check again!",
                errorAlreadyExists: "Already exists!",
                settingsSaved: "The settings are saved, refresh to view",
                iframe: "Iframe",
                dynamic: "Dynamic",
                reloadPage: "Edit completed, reload page now?",
                copied: "Copied",
                noValidContent: "有効なコンテンツが検出されませんでした。クリックして表示",
                outOfDate: "スクリプトが古くなっています。最新バージョンに更新してください。",
                hideBarTips: "ページネーション バーを非表示にします。没入型エクスペリエンス",
                setConfigPage: "現在のページをデフォルト設定ページとして設定",
                wedata2github: "wedata アドレスを github ウェアハウスのミラー アドレスに変更",
                addOtherProp: "ルールプロパティを追加",
                addNextSelector: "セレクターのコンテンツを nextLink として追加",
                addPageSelector: "セレクタ コンテンツを pageElement として追加",
                propName: "ルールのプロパティ名を入力してください",
                propValue: "ルールのプロパティ値を入力してください",
                customFirst: "ローカルカスタムルールのキャッシュを無視する",
                rulesExample: "カスタムルールの詳しい説明",
                lastPage: "最後のページに到達しました",
                lastPageTips: "最後のページに到達した時にヒントを表示する"
            }
        },
        {
            name: "Русский",
            match: ["ru", "ru-RU"],
            lang: {
                enableDebug: "Включить отладку",
                updateNotification: "Уведомление после обновления правила",
                disable: "Выключить",
                disableSite: "Включить/выключить на сайте",
                disableSiteTips: "Выключено для этого сайта",
                enableSiteTips: "Включено для этого сайта",
                enable: "Включить",
                toTop: "Наверх",
                toBottom: "Вниз",
                current: "Текущая страница",
                forceIframe: "Подгрузить ещё страницу",
                cancelForceIframe: "Отменить подгрузку",
                configure: "Настройки",
                firstUpdate: "Нажмите здесь, чтобы инициализировать правила",
                update: "Обновить правила",
                click2update: "Нажмите, чтобы обновить правила",
                loadNow: "Загрузить следующую страницу",
                loadConfirm: "Сколько страниц вы хотите загрузить? (0 означает бесконечность)",
                noNext: "Ссылка на следующую страницу не найдена. Пожалуйста, создайте новое правило",
                passSec: "Обновлено #t# секунд назад",
                passMin: "Обновлено #t# минут назад",
                passHour: "Обновлено #t# часов назад",
                passDay: "Обновлено #t# дней назад",
                cantDel: "Нельзя удалить правила по умолчанию",
                confirmDel: "Вы уверены, что хотите удалить эту ссылку?",
                updateSucc: "Правила обновлены",
                beginUpdate: "Обновление. Пожалуйста, немного подождите",
                customUrls: "Ссылки с правилами для импорта. Одна ссылка на строку",
                customRules: "Введите пользовательские правила в формате Pagetual. <a href='#t#'>✍️Улучшить встроенные правила</a>",
                save: "Сохранить настройки",
                loadingText: "Следующая страница подгружается…",
                opacity: "Прозрачность",
                opacityPlaceholder: "0 - скрыть",
                hideBar: "Скрыть разделитель страниц",
                hideBarButNoStop: "Скрыть, но не останавливать",
                dbClick2Stop: "Двойной клик на странице для выключения",
                sortTitle: "Правило сортировки применится после следующего обновления правил",
                autoRun: "Автозапуск (режим черного списка)",
                autoLoadNum: "Количество страниц для предзагрузки",
                turnRate: "Подгрузить страницу, когда она будет в 【X】 раз больше высоты страницы от конца страницы",
                inputPageNum: "Введите номер страницы для перехода",
                enableHistory: "Записать историю после переключения страниц",
                enableHistoryAfterInsert: "Записать запись истории сразу после вставки, иначе записать после просмотра",
                contentVisibility: "Автоматически переключать contentVisibility для повышения производительности рендеринга",
                initRun: "Подгружать страницы сразу после открытия",
                preload: "Предзагрузка следующей страницы",
                click2ImportRule: "Нажмите, чтобы импортировать базовые правила: ",
                forceAllBody: "Присоединить страницу целиком?",
                openInNewTab: "Открыть дополнительные ссылки в новой вкладке",
                importSucc: "Импорт завершен",
                import: "Импорт",
                editCurrent: "Изменить правило для текущего сайта",
                editBlacklist: "Изменить черный список. Одна ссылка на строку. Поддерживаются метасимволы: ? и *",
                upBtnImg: "Иконка перехода к началу",
                downBtnImg: "Иконка перехода к концу",
                sideControllerIcon: "Значок боковой панели",
                loadingTextTitle: "Текст во время загрузки",
                dbClick2StopCtrl: "Ctrl",
                dbClick2StopAlt: "Alt",
                dbClick2StopShift: "Shift",
                dbClick2StopMeta: "Meta",
                dbClick2StopKey: "Клавиша",
                pageElementCss: "Пользовательский стиль для основных элементов страницы",
                customCss: "Полный пользовательский CSS",
                firstAlert: "Вы не импортировали базовое правило. Пожалуйста, выберите соответствующее правило для импорта",
                picker: "Pagetual: выбор элемента страницы",
                closePicker: "Закрыть окно Pagetual",
                pickerPlaceholder: "Если не знаете, что тут писать — оставьте поле пустым",
                pickerCheck: "Проверить и скопировать селектор",
                switchSelector: "Нажмите для выбора элемента",
                gotoEdit: "Перейти к редактированию правила с текущим селектором",
                manualMode: "Отключить автоматическую загрузку страниц. Загружать вручную с помощью стрелки вправо (или вызова события 'pagetual.next')",
                clickMode: "Отключить \"сшивание\" страниц. При прокрутке до конца автоматически переходить на следующую страницу",
                pageBarMenu: "Открывать меню кликом на середину панели страниц",
                nextSwitch: "Переключить ссылку на следующую страницу",
                arrowToScroll: "Листать страницы клавишами со стрелками влево и вправо",
                sideController: "Показать справа панель перемещения по вкладке",
                sideControllerScroll: "Переключатель прокрутки",
                sideControllerAlways: "Всегда показывать",
                hideLoadingIcon: "Скрыть анимацию загрузки",
                hideBarArrow: "Скрыть кнопки перемещения на разделителе",
                duplicate: "Похоже, Pagetual установлен несколько раз. Пожалуйста, удалите Pagetual из других менеджеров скриптов!",
                forceStateIframe: "Вставить полную страницу как iframe",
                forceStateDynamic: "Загружать динамический контент через iframe",
                forceStateDisable: "Отключить перелистывание страниц на этой станции",
                autoScrollRate: "Скорость прокрутки (1~1000)",
                disableAutoScroll: "Остановить автоматическую прокрутку",
                enableAutoScroll: "Включить автопрокрутку",
                toggleAutoScroll: "Переключить автопрокрутку",
                ruleRequest: "Запрос правил",
                page: "Страница ",
                prevPage: "Предыдущая страница",
                nextPage: "Следующая страница",
                errorRulesMustBeArray: "Правила должны быть массивом!",
                errorJson: "Ошибка разбора JSON. Пожалуйста, исправьте его",
                editSuccess: "Редактирование успешно",
                errorWrongUrl: "Ссылка некорректна. Пожалуйста, исправьте её",
                errorAlreadyExists: "Уже существует!",
                settingsSaved: "Настройки сохранены. Обновите страницы",
                iframe: "iframe",
                dynamic: "Динамически",
                reloadPage: "Редактирование завершено. Обновить страницу?",
                copied: "Скопировано",
                noValidContent: "Действительный контент не обнаружен, нажмите для просмотра",
                outOfDate: "Скрипт устарел, своевременно обновляйте до последней версии!",
                hideBarTips: "Скрыть панель разбиения на страницы, иммерсивный опыт",
                setConfigPage: "Установить текущую страницу в качестве страницы конфигурации по умолчанию",
                wedata2github: "Изменить адрес wedata на зеркальный адрес на складе github",
                addOtherProp: "Добавить свойство правила",
                addNextSelector: "Добавить содержимое селектора как nextLink",
                addPageSelector: "Добавить содержимое селектора как pageElement",
                propName: "Введите имя свойства правила",
                propValue: "Введите значение свойства правила",
                customFirst: "Игнорировать кеш для локальных пользовательских правил",
                rulesExample: "Подробное объяснение настраиваемых правил",
                lastPage: "Достигнута последняя страница",
                lastPageTips: "Показывать подсказки при достижении последней страницы"
            }
        }
    ];
    var langList = {};
    langData.forEach(lang => {
        langList[lang.match[0]] = lang.name;
    });
    var i18nData = langData[0].lang;
    function setLang(la) {
        for (let i = 0; i < langData.length; i++) {
            let lang = langData[i];
            if (lang && lang.match.indexOf(la) !== -1) {
                i18nData = lang.lang;
                if (lang.encode) {
                    for (let k in i18nData) {
                        i18nData[k] = decodeURI(i18nData[k]);
                    }
                }
                break;
            }
        }
    }
    setLang(lang);
    var enableDebug = true;
    var _GM_xmlhttpRequest, _GM_registerMenuCommand, _GM_notification, _GM_addStyle, _GM_openInTab, _GM_info, _GM_setClipboard;
    function i18n(name, param) {
        return i18nData[name] ? i18nData[name].replace("#t#", param) : name;
    }

    function debug(str, title) {
        if (enableDebug) {
            console.log(
                `%c【Pagetual v.${_GM_info.script.version}】 ${title ? title : 'debug'}:`,
                'color: yellow;font-size: large;font-weight: bold;background-color: darkblue;',
                str
            );
        }
    }

    if (typeof GM_xmlhttpRequest !== 'undefined') {
        _GM_xmlhttpRequest = GM_xmlhttpRequest;
    } else if (typeof GM !== 'undefined' && typeof GM.xmlHttpRequest !== 'undefined') {
        _GM_xmlhttpRequest = GM.xmlHttpRequest;
    } else {
        _GM_xmlhttpRequest = (f) => {fetch(f.url, {method: f.method || 'GET', body: f.data, headers: f.headers}).then(response => response.text()).then(data => {f.onload && f.onload({response: data})}).catch(f.onerror && f.onerror())};
    }
    if (typeof GM_registerMenuCommand !== 'undefined') {
        _GM_registerMenuCommand = GM_registerMenuCommand;
    } else if (typeof GM !== 'undefined' && typeof GM.registerMenuCommand !== 'undefined') {
        _GM_registerMenuCommand = GM.registerMenuCommand;
    } else {
        _GM_registerMenuCommand = (s, f) => {debug(s); debug(f);};
    }
    if (typeof GM_info !== 'undefined') {
        _GM_info = GM_info;
    } else if (typeof GM !== 'undefined' && typeof GM.info !== 'undefined') {
        _GM_info = GM.info;
    } else {
        _GM_info = {script: {}};
    }
    if (typeof GM_notification !== 'undefined') {
        _GM_notification = GM_notification;
    } else if (typeof GM !== 'undefined' && typeof GM.notification !== 'undefined') {
        _GM_notification = GM.notification;
    } else {
        _GM_notification = (s) => {showTips(String(s.text || s));};
    }
    if (typeof GM_openInTab !== 'undefined') {
        _GM_openInTab = GM_openInTab;
    } else if (typeof GM !== 'undefined' && typeof GM.openInTab !== 'undefined') {
        _GM_openInTab = GM.openInTab;
    } else {
        _GM_openInTab = (s,t) => {window.open(s); debug(t);};
    }
    if (typeof GM_addStyle !== 'undefined') {
        _GM_addStyle = GM_addStyle;
    } else if (typeof GM !== 'undefined' && typeof GM.addStyle !== 'undefined') {
        _GM_addStyle = GM.addStyle;
    } else {
        _GM_addStyle = cssStr => {
            let styleEle = document.createElement("style");
            styleEle.innerHTML = cssStr;
            document.head.appendChild(styleEle);
            return styleEle;
        };
    }
    if (typeof GM_setClipboard !== 'undefined') {
        _GM_setClipboard = GM_setClipboard;
    } else if (typeof GM !== 'undefined' && typeof GM.setClipboard !== 'undefined') {
        _GM_setClipboard = GM.setClipboard;
    } else {
        _GM_setClipboard = (s, i) => {debug(s); debug(i);};
    }
    const _unsafeWindow = (typeof unsafeWindow === 'undefined') ? window : unsafeWindow;//兼容 ios userscripts 的寫法
    const storage = {
        supportGM: typeof GM_getValue === 'function' && typeof GM_getValue('a', 'b') !== 'undefined',
        supportGMPromise: typeof GM !== 'undefined' && typeof GM.getValue === 'function' && typeof GM.getValue('a', 'b') !== 'undefined' && typeof GM.getValue('a', 'b').then === 'function',
        supportCrossSave: function() {
            return this.supportGM || this.supportGMPromise;
        },
        mxAppStorage: (function() {
            try {
                return window.external.mxGetRuntime().storage;
            } catch(e) {
            }
        })(),
        operaUJSStorage: (function() {
            try {
                return window.opera.scriptStorage;
            } catch(e) {
            }
        })(),
        setItem: function(key, value) {
            if (this.supportGMPromise) {
                GM.setValue(key, value);
                if (value === "" && typeof GM !== 'undefined' && typeof GM.deleteValue !== 'undefined') {
                    GM.deleteValue(key);
                }
            } else if (this.supportGM) {
                GM_setValue(key, value);
                if (value === "" && typeof GM_deleteValue !== 'undefined') {
                    GM_deleteValue(key);
                }
            } else if (this.operaUJSStorage) {
                this.operaUJSStorage.setItem(key, value);
            } else if (this.mxAppStorage) {
                this.mxAppStorage.setConfig(key, value);
            } else if (window.localStorage) {
                window.localStorage.setItem(key, value);
            }
        },
        getItem: function(key, cb) {
            var value;
            if (this.supportGMPromise) {
                value = GM.getValue(key).then(v => {cb(v);});
                return;
            } else if (this.supportGM) {
                value = GM_getValue(key);
            } else if (this.operaUJSStorage) {
                value = this.operaUJSStorage.getItem(key);
            } else if (this.mxAppStorage) {
                value = this.mxAppStorage.getConfig(key);
            } else if (window.localStorage) {
                value = window.localStorage.getItem(key);
            }
            cb(value);
        }
    };
    async function getData(key) {
        return new Promise((resolve) => {
            storage.getItem(key, value => {
                resolve(value);
            });
        });
    }
    async function getListData(list, key) {
        return new Promise((resolve) => {
            storage.getItem(list, listData => {
                let value;
                if (listData) {
                    for(var i = 0; i < listData.length; i++) {
                        let data = listData[i];
                        if (data.k === key) {
                            value = data.v;
                            break;
                        }
                    }
                }
                resolve(value);
            });
        });
    }
    function setListData(list, key, value, length) {
        storage.getItem(list, listData => {
            if (!listData) {
              listData = [];
            }
            listData = listData.filter(data => data && data.k !== key);
            if (value !== "") {
                listData.unshift({k: key, v: value});
                if (listData.length > (length || 100)) {
                  listData.pop();
                }
            }
            storage.setItem(list, listData);
        });
    }
    const isMobile = ('ontouchstart' in document.documentElement);
    const configPage = [`https://pagetual.hoothin.com/${lang === 'zh-CN' ? 'cn/' : ''}rule.html`,
                        "https://github.com/hoothin/UserScripts/tree/master/Pagetual",
                        "https://hoothin.github.io/UserScripts/Pagetual/"];
    const firstRunPage = "https://pagetual.hoothin.com/firstRun";
    const guidePage = /^https?:\/\/.*pagetual.*rule\.html/i;
    const ruleImportUrlReg = /greasyfork\.org\/.*scripts\/438684(\-[^\/]*)?(\/discussions|\/?$|\/feedback)|github\.com\/hoothin\/UserScripts\/(tree\/master\/Pagetual|issues)|^https:\/\/pagetual\.hoothin\.com\/.*firstRun\.html/i;
    const allOfBody = "body>*";
    const mainSel = ["article,.article","[role=main],main,.main,#main","#results"];
    const nextTextReg1 = new RegExp("\u005e\u7ffb\u003f\u005b\u4e0b\u540e\u5f8c\u6b21\u005d\u005b\u4e00\u30fc\u0031\u005d\u003f\u005b\u9875\u9801\u5f20\u5f35\u005d\u007c\u005e\u006e\u0065\u0078\u0074\u005b\u005c\u0073\u005f\u002d\u005d\u003f\u0070\u0061\u0067\u0065\u005c\u0073\u002a\u005b\u203a\u003e\u2192\u00bb\u005d\u003f\u0024\u007c\u6b21\u306e\u30da\u30fc\u30b8\u007c\u005e\u6b21\u3078\u003f\u0024\u007c\u0412\u043f\u0435\u0440\u0435\u0434", "i");
    const nextTextReg2 = new RegExp("\u005e\u0028\u005b\u4e0b\u540e\u5f8c\u6b21\u005d\u005b\u4e00\u30fc\u0031\u005d\u003f\u005b\u7ae0\u8bdd\u8a71\u8282\u7bc0\u5e45\u005d\u007c\u006e\u0065\u0078\u0074\u002e\u003f\u0063\u0068\u0061\u0070\u0074\u0065\u0072\u0029\u0028\u005b\u003a\uff1a\u005c\u002d\u005f\u2014\u005c\u0073\u005c\u002e\u3002\u003e\u0023\u00b7\u005c\u005b\u3010\u3001\uff08\u005c\u0028\u002f\u002c\uff0c\uff1b\u003b\u2192\u005d\u007c\u0024\u0029", "i");
    const lazyImgAttr = ["data-lazy-src", "data-s", "data-lazy", "data-isrc", "data-url", "data-orig-file", "zoomfile", "file", "original", "load-src", "imgsrc", "real_src", "src2", "origin-src", "data-lazyload", "data-lazyload-src", "data-lazy-load-src", "data-ks-lazyload", "data-ks-lazyload-custom", "data-src", "data-defer-src", "data-actualsrc", "data-cover", "data-original", "data-thumb", "data-imageurl", "data-placeholder", "lazysrc"];
    var rulesData = {uninited: true, firstRun: true, sideController: !isMobile}, ruleUrls, updateDate, loadNowNum = 5, autoScrollRate = 50;
    var isPause = false, manualPause = false, isHideBar = false, isLoading = false, curPage = 1, forceState = 0, autoScroll = 0, autoScrollInterval, bottomGap = 1000, autoLoadNum = -1, nextIndex = 0, stopScroll = false, clickMode = false, openInNewTab = 0, charset = "UTF-8", charsetValid = true, urlWillChange = false, hidePageBar = false;
    var tryTimes = 0, showedLastPageTips = false, rate = 1, author = '';

    function getBody(doc) {
        return doc.body || doc.querySelector('body') || doc;
    }

    function getElementByXpath(xpath, doc, contextNode) {
        if (doc && doc.ownerDocument) doc = doc.ownerDocument;
        doc = (doc && doc.evaluate) ? doc : document;
        contextNode = contextNode || doc;
        try {
            let xpathNode = (s, d, n) => {
                let result = d.evaluate(s, n, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
                return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
            };
            let selSplit = xpath.split(" =>> ");
            if (selSplit.length === 2) {
                let ele = xpathNode(selSplit[0], doc, contextNode);
                if (ele && ele.shadowRoot) {
                    return xpathNode(selSplit[1], ele.shadowRoot, ele.shadowRoot);
                }
            } else {
                return xpathNode(xpath, doc, contextNode);
            }
        } catch (err) {
            debug(`Invalid xpath: ${xpath}`);
        }
        return null;
    }

    function getAllElementsByXpath(xpath, contextNode, doc) {
        if (doc && doc.ownerDocument) doc = doc.ownerDocument;
        doc = (doc && doc.evaluate) ? doc : document;
        contextNode = contextNode || doc;
        var result = [];
        try {
            var query = doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < query.snapshotLength; i++) {
                var node = query.snapshotItem(i);
                if (node.nodeType === 1) {
                  result.push(node);
                }
            }
        } catch (err) {
            debug(`Invalid xpath: ${xpath}`);
        }
        return result;
    }

    function isXPath(xpath) {
        if (!xpath) {
          return false;
        }
        return /^\(*(descendant::|\.\/|\/|id\()/.test(xpath);
    }

    function getAllElements(sel, doc, contextNode) {
        try {
            if (sel.indexOf(" =>> ") !== -1) {
                let result = getElement(sel, doc, contextNode);
                return result && [result];
            }
            if (!isXPath(sel)) {
                return doc.querySelectorAll(sel);
            }
        } catch(e) {
            debug(e, 'Error selector');
        }
        return getAllElementsByXpath(sel, contextNode, doc);
    }

    function getElement(sel, doc, contextNode, bySort) {
        try {
            if (!isXPath(sel)) {
                let checkShadow = s => {
                    let selSplit = s.split(" =>> ");
                    if (selSplit.length === 2) {
                        let ele = doc.querySelector(selSplit[0]);
                        return ele && ele.shadowRoot && ele.shadowRoot.querySelector(selSplit[1]);
                    } else return doc.querySelector(s);
                };
                if (!bySort) {
                    return checkShadow(sel);
                } else {
                    let selArr = sel.split(",");
                    try {
                        for (let i = 0; i < selArr.length; i++) {
                            let ele = checkShadow(selArr[i].trim());
                            if (ele) {
                              return ele;
                            }
                        }
                    } catch(e) {
                        return checkShadow(sel);
                    }
                    return null;
                }
            }
        } catch(e) {
            debug(e, 'Error selector');
        }
        return getElementByXpath(sel, doc, contextNode);
    }

    function compareNodeName(node, names) {
        if (!node || !node.nodeName || !node.nodeName.toLowerCase) {
          return false;
        }
        let nodeName = node.nodeName.toLowerCase();
        for (let i = 0; i < names.length; i++) {
            if (names[i] === nodeName) {
              return true;
            }
        }
        return false;
    }

    function geneSelector(ele, addID, exact) {
        let selector = ele.nodeName.toLowerCase();
        //Google id class都是隨機。百度更過分，style script順序都是隨機的
        if (selector !== "html" && selector !== "body") {
            let hasId = false;
            if (addID && ele.id && /^[a-z_][\w\-_]*$/i.test(ele.id)) {
                if (ele.ownerDocument && ele.ownerDocument.querySelectorAll("#" + ele.id).length === 1) {
                    hasId = true;
                    selector = '#' + ele.id;
                }
            }
            if (!hasId) {
                let className = "";
                if (ele.className) {
                    let classList = ele.classList;
                    for (let i = 0; i < classList.length; i++) {
                        let c = classList[i];
                        if (c !== 'scrolling' && /^[a-z_][\w\-_]*$/.test(c) && !/\d{4,}/.test(c)) {
                            className += '.' + c;
                        }
                    }
                    selector += className;
                }
                let parent = ele.parentElement;
                if (parent) {
                    if (exact) {
                        let i, nth = 0, all = 0;
                        for (i = 0; i < parent.children.length; i++) {
                            if (parent.children[i].nodeName === ele.nodeName) {
                                all++;
                                if (parent.children[i] === ele) {
                                    nth = all;
                                }
                                if (nth > 0 && all > 1) {
                                    break;
                                }
                            }
                        }
                        selector += (all === 1 ? "" : `:nth-of-type(${nth})`);
                    } else if (!className && !hasId && parent.children.length > 1 && !compareNodeName(parent, ["html"])) {
                        let prevE = ele.previousElementSibling;
                        if (prevE && prevE.className) {
                            let classList = prevE.classList;
                            for (let i = 0; i < classList.length; i++) {
                                let c = classList[i];
                                if (c !== 'scrolling' && /^[a-z_][\w\-_]*$/.test(c) && !/\d{4,}/.test(c)) {
                                    className += '.' + c;
                                }
                            }
                            if (className) {
                                selector = prevE.nodeName.toLowerCase() + className + "+" + selector;
                            }
                        }
                        if (!className) {
                            let i, nth = 0, all = 0;
                            for (i = 0; i < parent.children.length; i++) {
                                if (parent.children[i].nodeName === ele.nodeName) {
                                    all++;
                                    if (parent.children[i] === ele) {
                                        nth = all;
                                    }
                                    if (nth > 0 && all > 1) {
                                      break;
                                    }
                                }
                            }
                            selector += (all === 1 ? "" : `:nth-of-type(${nth})`);
                        }
                    }
                    selector = geneSelector(parent, addID, exact) + ' > ' + selector;
                }
            }
        }
        return selector;
    }

    function createXPathFromElement(elm) {
        let allNodes = document.getElementsByTagName('*'), segs;
        for (segs = []; elm && elm.nodeType === 1; elm = elm.parentNode) {
            if (compareNodeName(elm, ["body", "html"])) {
                segs.unshift(elm.localName.toLowerCase());
                continue;
            }
            if (elm.hasAttribute && elm.hasAttribute('id')) {
                var uniqueIdCount = 0;
                for (var n = 0; n < allNodes.length; n++) {
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id === elm.id) {
                      uniqueIdCount++;
                    }
                    if (uniqueIdCount > 1) {
                      break;
                    }
                }
                if ( uniqueIdCount === 1) {
                    segs.unshift('id("' + elm.getAttribute('id') + '")');
                    return segs.join('/');
                } else {
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                }
            } else if (elm.hasAttribute && elm.hasAttribute('class')) {
                segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
            } else {
                let i, sib;
                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName === elm.localName) {
                      i++;
                    }
                }
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
            }
        }
        return segs.length ? '/' + segs.join('/') : null;
    }

    const escapeHTMLPolicy = (_unsafeWindow.trustedTypes && _unsafeWindow.trustedTypes.createPolicy) ? _unsafeWindow.trustedTypes.createPolicy('pagetual_default', {
        createHTML: (string, sink) => string
    }) : null;

    function createHTML(html) {
        return escapeHTMLPolicy ? escapeHTMLPolicy.createHTML(html) : html;
    }

    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

    async function sleep(time) {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
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
        }

        async initSavedRules(callback) {
            var self = this;
            let smartRules = await getData("smartRules");
            if (smartRules) self.smartRules = smartRules;
            let hpRules = await getData("hpRules");
            if (hpRules) self.hpRules = hpRules;
            let customRules = await getData("customRules");
            if (customRules) self.customRules = customRules;
            if (_unsafeWindow.pagetualRules && _unsafeWindow.pagetualRules.length) {
                _unsafeWindow.pagetualRules.forEach(rule => {
                    rule.isScript = true;
                });
                self.customRules = _unsafeWindow.pagetualRules.concat(self.customRules);
            }
            let rules = await getData("rules");
            if (rules) self.rules = rules;
            callback();
        }

        saveCurSiteRule() {
            /*if(!this.curSiteRule || !this.curSiteRule.url || this.curSiteRule.smart || this.curSiteRule.url.length<13)return;
            this.hpRules=this.hpRules.filter(item=>{return item&&item.url!=this.curSiteRule.url});
            this.hpRules.unshift(this.curSiteRule);
            if(this.hpRules.length>30){
                this.hpRules.pop();
            }
            storage.setItem("hpRules", this.hpRules);*/
        }

        requestJSON(url, callback) {
            _GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                timeout: 1000000,
                headers: {
                    'accept': 'application/json,text/html',
                    'Referer': url,
                },
                onload: function(res) {
                    let json = null;
                    try {
                        json = JSON.parse(res.response || res.responseText);
                    } catch(e) {
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

        formatRule(item, from) {
            if (item.data && item.data.url) {
                let result = {
                    name: item.name,
                    from: from,
                    action: item.data.forceIframe === "true" ? 1 : undefined,
                    url: item.data.url,
                    pageElement: item.data.pageElement,
                    nextLink: item.data.nextLink,
                    insert: item.data.insertBefore||undefined,
                    updatedAt: item.updated_at
                };
                let _css = (item.data.Stylus || '') + (item.data.CSS || '');
                if (_css) result.css = _css;
                if (item.data.bookmarklet) result.pageAction = item.data.bookmarklet;
                return result;
            } else {
                item.from = from;
                return item;
            }
            return null;
        }

        addRuleByUrl(url, from, callback) {
            if (url.indexOf("?") === -1) {
                url = url + "?" + Date.now();
            } else {
                url = url + "&" + Date.now();
            }
            this.requestJSON(url, (json,err) => {
                if (!json) {
                    debug(err, "Failed to update " + url + " rules!");
                }
                this.addRules(json, from);
                callback(json, err);
            });
        }

        addRules(rules, from) {
            if (rules && rules.length > 0) {
                let first = -1;
                this.rules = this.rules.filter((item, i) => {
                    if (item.from === from) {
                        if (first === -1) first = i;
                        return false;
                    } else return true;
                });
                if (first === -1) first = 0;
                rules.forEach(item => {
                    let rule = this.formatRule(item, from);
                    if (rule) {
                        this.rules.splice(first, 0, rule)
                    }
                });
            }
        }

        ruleMatchPre(r) {
            if (r.include) {
                let include;
                if (Array && Array.isArray && Array.isArray(r.include)) {
                    include = r.include.every((sel, i) => {
                        let ele = getElement(sel, document);
                        return !!ele;
                    });
                } else include = getElement(r.include, document);
                if (!include) return false;
            }
            if (r.exclude) {
                let exclude;
                if (Array && Array.isArray && Array.isArray(r.exclude)) {
                    exclude = !r.exclude.every((sel, i) => {
                        let ele = getElement(sel, document);
                        return !ele;
                    });
                } else exclude = getElement(r.exclude, document);
                if (exclude) return false;
            }
            return true;
        }

        ruleMatchReady(r) {
            let findIndex = 0;
            if (r.nextLink && r.nextLink !== 0) {
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

        ruleMatch(r) {
            return this.ruleMatchPre(r) && this.ruleMatchReady(r);
        }

        scrollToShow(sel, doc) {
            let exclude = getElement(sel, doc);
            if (exclude) {
                var actualTop = exclude.offsetTop;
                var current = exclude.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                getBody(doc).scrollTop = 0;
                doc.documentElement.scrollTop = 0;
                let maxHeight = Math.max(getBody(doc).scrollHeight, doc.documentElement.scrollHeight);
                getBody(doc).scrollTop = actualTop - 10;
                doc.documentElement.scrollTop = actualTop - 10;
                setTimeout(() => {
                    while (actualTop < maxHeight) {
                        actualTop += 200;
                        getBody(doc).scrollTop = actualTop;
                        doc.documentElement.scrollTop = actualTop;
                    }
                }, 0);
                return false;
            }
            return true;
        }

        waitElement(doc, selArr) {
            if (!selArr) selArr = this.curSiteRule.waitElement;
            if (!Array.isArray(selArr)) {
                selArr = [selArr];
            }
            let includeSel = selArr[0].trim(), excludeSel;
            if (selArr.length === 2) {
                excludeSel = selArr[1].trim().replace(/^!/, '');
            } else if (includeSel.indexOf('!') === 0) {
                excludeSel = includeSel.replace(/^!/, '');
                includeSel = '';
            }
            if (includeSel) {
                let include = getElement(includeSel, doc);
                if (!include) {
                    if (doc !== document) {
                        getBody(doc).scrollTop = 9999999;
                        if (doc.documentElement) {
                            doc.documentElement.scrollTop = 9999999;
                        }
                    }
                    return false;
                }
            }
            if (doc === document) return true;
            if (excludeSel) {
                if (!this.scrollToShow(excludeSel, doc)) {
                    if (!loadingDiv.offsetParent && this.insert.parentNode) {
                        this.insertElement(loadingDiv);
                    }
                    return false;
                }
            }
            return true;
        }

        runPageBar(pageBar) {
            if (this.curSiteRule.pageBar && this.curSiteRule.pageBar !== 0) {
                try {
                    ((typeof this.curSiteRule.pageBar === 'function') ? this.curSiteRule.pageBar : Function("pageBar",'"use strict";' + this.curSiteRule.pageBar))(pageBar);
                } catch(e) {
                    debug(e);
                }
            }
        }

        runWait(cb) {
            let checkEval = null, waitTime = 0;
            if (this.curSiteRule.waitElement) {
                checkEval = async doc => {
                    return await this.waitElement(doc);
                };
            } else if(this.curSiteRule.wait) {
                if (isNaN(this.curSiteRule.wait)) {
                    try {
                        checkEval = (typeof this.curSiteRule.wait === 'function') ? this.curSiteRule.wait : new AsyncFunction("doc", '"use strict";' + this.curSiteRule.wait);
                    } catch(e) {
                        debug(e);
                    }
                } else {
                    waitTime = this.curSiteRule.wait;
                }
            }
            cb(checkEval, waitTime);
        }

        findNoNext() {
            if (!this.curSiteRule || !this.curSiteRule.smart || this.curSiteRule.nextLink === 0 || this.possibleRule) return;
            let self = this;
            self.curSiteRule.nextLink = 0;
            self.smartRules = self.smartRules.filter(item => {return item && item.url !== self.curSiteRule.url;});
            self.smartRules.unshift(self.curSiteRule);
            storage.setItem("smartRules", self.smartRules);
        }

        async getRule(callback) {
            var href = location.href.slice(0, 500);
            if (noRuleTest) {
                this.curSiteRule = {};
                this.curSiteRule.url = href;
                this.curSiteRule.smart = true;
                callback();
                return;
            }
            if (_unsafeWindow.pagetualRule) {
                this.curSiteRule = _unsafeWindow.pagetualRule;
                if (!this.curSiteRule.url) this.curSiteRule.url = ".";
                this.curSiteRule.isScript = true;
            }
            if (this.curSiteRule && this.curSiteRule.url && !this.curSiteRule.smart) {
                let urlReg = new RegExp(this.curSiteRule.url, "i");
                if (urlReg.test(href) && this.ruleMatch(this.curSiteRule)) {
                    return callback();
                }
            }
            if (this.possibleRule) {
                let urlReg = new RegExp(this.possibleRule.url, "i");
                if (urlReg.test(href) && this.ruleMatch(this.possibleRule)) {
                    this.curSiteRule = this.possibleRule;
                    debug(this.curSiteRule, 'Match');
                    return callback();
                }
            }
            this.curSiteRule = {};
            var self = this;

            function setRule(r) {
                if (self.preSiteRule) {
                    href = location.href.slice(0, 500);
                    let urlReg = new RegExp(self.preSiteRule.url, "i");
                    if (urlReg.test(href) && self.ruleMatch(self.preSiteRule)) {
                        self.curSiteRule = self.preSiteRule;
                        return callback();
                    }
                }
                if (r.from === 2) {
                    delete r.autoLoadNum;
                    delete r.history;
                    delete r.sideController;
                    if (r.pageBar === 0) delete r.pageBar;
                }
                if (!r.smart) {
                    self.insert = null;
                    self.curSiteRule = r;
                    self.preSiteRule = r;
                    if (r.enable !== 0) debug(r, 'Match');
                } else if (!self.curSiteRule || !self.curSiteRule.smart) self.curSiteRule = r;
                callback();
            }

            function checkRule(r) {
                if (r.from === 1 && r.url.length <= 13) return false;
                let urlReg = new RegExp(r.url, "i");
                if (urlReg.test(href)) {
                    if (!self.ruleMatchPre(r)) return false;
                    if (r.url.length > 15 && r.from !== 1) {
                        self.possibleRule = r;
                    }
                    if (r.waitElement) {
                        let waitTime = 500;
                        let checkReady = () => {
                            setTimeout(() => {
                                if (!self.waitElement(document, r.waitElement) || !self.ruleMatchReady(r)) {
                                    checkReady();
                                } else {
                                    setRule(r);
                                }
                            }, parseInt(waitTime));
                        };
                        checkReady();
                        debug(r, 'Wait for');
                        return true;
                    } else if (r.wait) {
                        let waitTime = 500, checkEval, maxCheckTimes = 50;
                        if (isNaN(r.wait)) {
                            try {
                                checkEval = (typeof r.wait === 'function') ? r.wait : AsyncFunction("doc",'"use strict";' + r.wait);
                            } catch(e) {
                                debug(e, 'Error when checkeval');
                            }
                        } else {
                            waitTime = r.wait;
                        }
                        let checkReady = () => {
                            if (maxCheckTimes-- <= 0) {
                                debug("Wait for rule ready but failed");
                                setRule(r);
                                return;
                            }
                            setTimeout(async() => {
                                if (!self.ruleMatchReady(r) || (checkEval && !await checkEval(document))) {
                                    checkReady();
                                } else {
                                    setRule(r);
                                }
                            }, parseInt(waitTime));
                        };
                        checkReady();
                        debug(r, 'Wait for');
                        return true;
                    }
                    if (r.pinUrl) {
                        setRule(r);
                        return true;
                    }
                    if (!self.ruleMatchReady(r)) {
                        return false;
                    }
                    setRule(r);
                    return true;
                }
                return false;
            }

            function checkHpRules() {
                for (let i in self.hpRules) {
                    let rule = self.hpRules[i];
                    if (!rule || !rule.url || rule.smart) continue;
                    if (checkRule(rule)) return true;
                }
                return false;
            }

            function checkCustomRules() {
                for (let i in self.customRules) {
                    let rule = self.customRules[i];
                    if (!rule || !rule.url) continue;
                    if (checkRule(rule)) return true;
                }
                return false;
            }

            if (rulesData.customFirst) {
                if (checkCustomRules()) return;
                await sleep(1);
                if (checkHpRules()) return;
            } else {
                if (checkHpRules()) return;
                await sleep(1);
                if (checkCustomRules()) return;
            }
            await sleep(1);

            for (let i in this.smartRules) {
                let rule = this.smartRules[i];
                if (!rule || !rule.url || !rule.smart) continue;
                if (href === rule.url) {
                    setRule(rule);
                    return;
                } else if (rule.listenUrlChange === false && href.replace(/[^\/]+$/, "") === rule.url) {
                    setRule(rule);
                    return;
                }
            }
            let r = 0;
            async function searchByTime() {
                while (document.hidden) {
                    await sleep(1000);
                }
                setTimeout(() => {
                    let end = r + 20;
                    end = end > self.rules.length ? self.rules.length : end;
                    for (; r < end; r++) {
                        let rule = self.rules[r];
                        if (checkRule(rule)) return;
                    }
                    if (end >= self.rules.length) {
                        if (document.documentElement && document.documentElement.className && document.documentElement.className.indexOf && document.documentElement.className.indexOf('discourse') !== -1) {
                            setRule({url: href.replace(/[^\/]+$/, ""), smart: true, nextLink: 0, listenUrlChange: false});
                        } else {
                            setRule({url: href, smart: true});
                        }
                        return;
                    } else {
                        searchByTime();
                    }
                }, 1);
            }
            searchByTime();
        }

        addToHpRules(instead) {
            try {
                if (this.curSiteRule.isScript) return;
                if (!this.hpRules) this.hpRules = [];
                let url = this.curSiteRule && this.curSiteRule.url, self = this;
                let href = location.href.slice(0, 500);
                let matchedRules = this.hpRules.filter(rule => rule != self.curSiteRule && new RegExp(rule.url, "i").test(href) && self.ruleMatch(rule));
                if (url) matchedRules.unshift(this.curSiteRule);
                matchedRules.sort((a, b) => {
                    if ((a.include || a.exclude) && (!b.include && !b.exclude)) {
                        return -1;
                    } else if ((b.include || b.exclude) && (!a.include && !a.exclude)) {
                        return 1;
                    } else {
                        if ((a.nextLink || a.pageElement) && (!b.nextLink && !b.pageElement)) {
                            return -1;
                        } else if ((b.nextLink || b.pageElement) && (!a.nextLink && !a.pageElement)) {
                            return 1;
                        } else {
                            if (a.url.length > b.url.length) {
                                return -1;
                            } else if (a.url.length < b.url.length) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }
                });
                this.hpRules = this.hpRules.filter(item => {
                    return item && !matchedRules.find(rule => item.url == rule.url && JSON.stringify(item) == JSON.stringify(rule));
                });
                if (instead) {
                    if (url) {
                        this.hpRules.unshift(this.curSiteRule);
                        matchedRules = [];
                    }
                } else {
                    this.hpRules = matchedRules.concat(this.hpRules);
                }
                if (matchedRules && matchedRules.length) this.curSiteRule = matchedRules[0];
                if (this.hpRules.length > 30) {
                    this.hpRules.pop();
                }
                if (!rulesData.sort) rulesData.sort = [1];
                this.hpRules.sort((a, b) => {
                    let aSort = -1, bSort = -1;
                    for (let s = 0; s < rulesData.sort.length; s++) {
                        if (a.from == rulesData.sort[s]) aSort = s;
                        if (b.from == rulesData.sort[s]) bSort = s;
                        if (aSort > -1 && bSort > -1) break;
                    }
                    return aSort - bSort;
                });
                storage.setItem("hpRules", this.hpRules);
            } catch (e) {
                debug(e);
            }
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
                let self = this;
                if (!this.refreshByClickHandler) {
                    this.refreshByClickHandler = e => {
                        if (!self.refreshing) {
                            self.refreshing = true;
                            setTimeout(() => {
                                self.refreshing = false;
                                let checkEles = getAllElements(refreshByClickSel, document);
                                for (let i = 0; i < checkEles.length; i++) {
                                    let curEle = checkEles[i];
                                    if (curEle === e.target || curEle.contains(e.target)) {
                                        ruleParser.urlChanged();
                                        isPause = true;
                                        if (!ruleParser.nextLinkHref) isLoading = false;
                                        break;
                                    }
                                }
                            }, 300);
                        }
                    }
                }
                document.removeEventListener("click", this.refreshByClickHandler);
                document.addEventListener("click", this.refreshByClickHandler);
            }
        }

        getValidSize(ele, win) {
            if (!win) return {h: 0, w: 0};
            let eleStyle = win.getComputedStyle(ele);
            if (!ele.offsetParent && eleStyle.display !== "contents" && (eleStyle.position !== "fixed" || eleStyle.opacity === 0)) {
                return {h: 0, w: 0};
            }
            if (ele.children && ele.children.length === 1 && (ele.offsetWidth === 0 || ele.offsetHeight === 0)) {
                ele = ele.children[0];
            }
            let h = ele.scrollHeight, w;
            if (eleStyle.overflow === "hidden") {
                h = ele.offsetHeight;
                w = ele.offsetWidth;
            } else w = parseInt(ele.offsetWidth || ele.scrollWidth);
            if (h === 0 && ele.parentNode && ele.parentNode.children.length === 1) {
                h = ele.parentNode.scrollHeight;
            }
            while (h === 0 && ele.children && ele.children.length === 1) {
                ele = ele.children[0];
                h = ele.scrollHeight;
            }
            if (h === 0 && ele.children && ele.children.length) {
                let maxChildSize = {h: 0}, self = this;
                [].forEach.call(ele.children, el => {
                    let childSize = self.getValidSize(el, win);
                    if (childSize.h > maxChildSize.h) maxChildSize = childSize;
                });
                if (maxChildSize.h !== 0) return maxChildSize;
            }
            const maxNum = 2147483647;
            let moreChild = ele.children[0], minOffsetTop = maxNum;
            while (moreChild) {
                if ((moreChild.offsetParent === ele || moreChild.offsetParent === ele.offsetParent)) {
                    let curOffsetTop = moreChild.offsetParent === ele.offsetParent ? moreChild.offsetTop - ele.offsetTop : moreChild.offsetTop;
                    if (curOffsetTop < minOffsetTop) {
                        minOffsetTop = curOffsetTop;
                    }
                }
                moreChild = moreChild.nextElementSibling;
            }
            if (h && minOffsetTop !== maxNum && minOffsetTop > 0) {
                h -= minOffsetTop;
            }
            return {h: h, w: w};
        }

        checkTargetChildren(ele, curWin, articleNum, curHeight) {
            let pf = false;
            if (ele.parentNode) {
                let paStyle = curWin.getComputedStyle(ele.parentNode);
                let paDisplay = paStyle.display;
                let paOverflow = paStyle.overflow;
                pf = (paDisplay.indexOf('flex') !== -1 && paStyle.flexDirection.indexOf("row") === 0 && paStyle.flexWrap !== "wrap") || compareNodeName(ele.parentNode, ["ul"]) || paDisplay.indexOf('grid') !== -1 || paOverflow === "hidden";
            }
            let curStyle = curWin.getComputedStyle(ele);
            if (ele.children.length > 1) {
                if (articleNum > 1) {
                    return ">article";
                } else {
                    let hasText = false;
                    for (let i in ele.childNodes) {
                        let child = ele.childNodes[i];
                        if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
                            hasText = true;
                            break;
                        }
                    }
                    let gridArea = curStyle.gridArea;
                    if (gridArea && gridArea !== "auto" && gridArea !== "auto / auto / auto / auto") {
                        return ">*";
                    } else {
                        let middleChild = ele.children[parseInt(ele.children.length / 2)];
                        if ((curStyle.display === 'flex' && curStyle.flexDirection.indexOf("row") === 0 && curStyle.flexWrap !== "wrap") || (curStyle.float === "none" && curStyle.display !== "table-cell" && (rulesData.opacity !== 0 || hasText) && !pf)) {
                            return "";
                        } else if ((middleChild.style && middleChild.style.position === "absolute" && middleChild.style.left && middleChild.style.top) || compareNodeName(ele, ["ul"]) || curHeight === 0) {
                            return "";
                        } else {
                            return ">*";
                        }
                    }
                }
            } else if (pf || curStyle.position === "absolute") {
                return ">*";
            }
            return "";
        }

        getPageElement(doc, curWin, dontFind) {
            if (doc === document && this.docElementValid()) {
                return this.docPageElement;
            }
            let pageElement = null;
            let self = this;
            let body = getBody(doc);
            if (this.curSiteRule.pageElement) {
                let pageElementSel = this.curSiteRule.pageElement;
                if (Array && Array.isArray && Array.isArray(pageElementSel)) {
                    pageElementSel = pageElementSel[nextIndex < pageElementSel.length ? nextIndex : 0];
                }
                pageElement = getAllElements(pageElementSel, doc);
                if (this.curSiteRule.smart && (!pageElement || pageElement.length === 0)) {
                    const childSelMatch = />\s*\*$/;
                    const targetChild = childSelMatch.test(pageElementSel);
                    if (targetChild) pageElementSel = pageElementSel.replace(childSelMatch, "");
                    let pageElementSelSplit = pageElementSel.split(">");
                    while(pageElementSelSplit && pageElementSelSplit.length > 5) {
                        pageElementSelSplit.shift();
                        let tempSel = pageElementSelSplit.join(">");
                        pageElement = getAllElements(tempSel, doc);
                        if (pageElement && pageElement.length === 1) {
                            if (targetChild) {
                                pageElement = pageElement.children;
                            }
                            this.curSiteRule.pageElement = tempSel + (targetChild ? ">*" : "");
                            break;
                        }
                    }
                    if (!pageElement || pageElement.length === 0) {
                        pageElementSel = pageElementSel.replace(/:nth-of-type\(\d+\)/g, "");
                        pageElement = getAllElements(pageElementSel, doc);
                        if (pageElement && pageElement.length === 1) {
                            if (targetChild) {
                                pageElement = pageElement.children;
                            }
                            this.curSiteRule.pageElement = pageElementSel + (targetChild ? ">*" : "");
                        }
                    }
                }
                if (this.curSiteRule.smart && pageElement && pageElement.length && curWin && curWin !== _unsafeWindow) {
                    if (pageElement.length === 1 && !pageElement[0].src && pageElement[0].innerHTML.trim() === "") {
                        pageElement = null;
                    } else {
                        let parent = pageElement[0].parentNode;
                        let loading = parent.querySelector('[class*=loading]');
                        if (loading && loading.offsetParent && loading.offsetHeight > parent.offsetHeight>>2) {
                            pageElement = null;
                        }
                    }
                }
            }
            if (pageElement && pageElement.length === 1 && pageElement[0].style.display === 'none') {
                pageElement = [body];
            }
            if (this.curSiteRule.smart && pageElement && pageElement.length > 0 && compareNodeName(pageElement[0], ["tr"])) {
                let mainTr = this.insert.parentNode.querySelectorAll('tr'), mainTdNum = 0, newTdNum = 0;
                mainTr = mainTr[mainTr.length - 1];
                [].forEach.call(mainTr.children, el => {
                    if (compareNodeName(el, ["td", "th"])) {
                        mainTdNum += el.colSpan || 1;
                    }
                });
                [].forEach.call(pageElement[0].children, el => {
                    if (compareNodeName(el, ["td", "th"])) {
                        newTdNum += el.colSpan || 1;
                    }
                });
                if (mainTdNum !== newTdNum) {
                    this.curSiteRule.pageElement = this.curSiteRule.pageElement.replace(/> *table.*/, ">table");
                    this.getInsert(true);
                    return this.getPageElement(doc, curWin, dontFind);
                }
            }
            if ((this.curSiteRule.smart || !this.curSiteRule.pageElement) && (!pageElement || pageElement.length == 0) && curWin && !dontFind) {
                if (!body) return null;
                let bodyHeight = parseInt(body.offsetHeight || body.scrollHeight);
                let curHeight = bodyHeight, curWidth = 0;
                let windowHeight = window.innerHeight || document.documentElement.clientHeight;
                let windowWidth = window.innerWidth || document.documentElement.clientWidth;
                let needCheckNext = (doc == document && this.initNext), nextLeftPos = 0;
                if (needCheckNext && this.initNext.getBoundingClientRect) {
                    nextLeftPos = this.initNext.getBoundingClientRect().left;
                }
                function checkElement(ele) {
                    if (compareNodeName(ele, ["pre", "code"])) {
                        self.curSiteRule.pageElement = geneSelector(ele.parentNode);
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return [ele.parentNode];
                    }
                    if (ele.children && ele.children.length === 1) {
                        let hasText = false;
                        for (let i in ele.childNodes) {
                            let child = ele.childNodes[i];
                            if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
                                hasText = true;
                                break;
                            }
                        }
                        if (!hasText) {
                            ele = ele.children[0];
                            let validSize = self.getValidSize(ele, curWin);
                            curHeight = validSize.h;
                            curWidth = validSize.w;
                        }
                    }
                    if (compareNodeName(ele, ["picture"]) || !ele.innerText || ele.innerText.trim() === '') {
                        self.curSiteRule.pageElement = geneSelector(ele.parentNode) + ">" + ele.nodeName.toLowerCase();
                        debug(self.curSiteRule.pageElement, 'Page element');
                        let eles = [];
                        for (let i = 0; i < ele.parentNode.children.length; i++) {
                            let curNode = ele.parentNode.children[i];
                            if (curNode.nodeName === ele.nodeName && curNode.id === ele.id && curNode.className === ele.className) {
                                eles.push(curNode);
                            }
                        }
                        return eles;
                    }
                    if (compareNodeName(ele, ["form"]) && ele.parentNode !== getBody(document)) {
                        self.curSiteRule.pageElement = geneSelector(ele) + ">*";
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return ele.children;
                    }
                    if (ele.children.length === 0 && !self.curSiteRule.pageElement) {
                        if (compareNodeName(ele.parentNode, ["p"])) ele = ele.parentNode;
                        self.curSiteRule.pageElement = geneSelector(ele.parentNode) + ">" + ele.nodeName.toLowerCase();
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return getAllElements(self.curSiteRule.pageElement, doc);
                    }
                    let i, minHeight = curHeight * 0.52, curMaxEle = null, curMaxArea = 0, minWidth = Math.min(curWidth * 0.38, 500);
                    let isHori, preOffsetTop = -1;
                    let articleNum = 0;
                    for (i = 0; i < ele.children.length; i++) {
                        let curNode = ele.children[i];
                        if (ele !== body && /^H\d$/i.test(curNode.nodeName) && curNode.offsetParent) {
                            curMaxEle = null;
                            break;
                        }
                        if (compareNodeName(curNode, ["canvas", "nav"])) continue;
                        let curStyle = curWin.getComputedStyle(curNode);
                        if (!curNode.offsetParent && curStyle.display !== "contents" && (curStyle.position !== "fixed" || curStyle.opacity === 0)) {
                            continue;
                        }
                        if (!compareNodeName(curNode, ["img"]) && curNode.querySelector('img') === null && /^\s*$/.test(curNode.innerText)) continue;
                        if (needCheckNext && !curNode.contains(self.initNext) && getElementTop(curNode) > windowHeight) {
                            continue;
                        }
                        if (compareNodeName(curNode, ["article"])) articleNum++;
                        let validSize = self.getValidSize(curNode, curWin);
                        let h = validSize.h;
                        let w = validSize.w;
                        if (isNaN(h) || isNaN(w) || !h || !w) continue;
                        isHori = Math.abs(preOffsetTop - curNode.offsetTop) <= 20 ? true : (preOffsetTop === -1 && curNode.nextElementSibling && curNode.nextElementSibling.offsetTop === curNode.offsetTop);
                        if (isHori && h <= 50) continue;
                        /*if (isHori && nextLeftPos && curMaxEle && curWidth > 500 && curHeight > 500) {
                            let curRect = curNode.getBoundingClientRect();
                            if (curRect.left > windowWidth>>2 && curRect.left <= nextLeftPos && curRect.right > nextLeftPos) {
                                continue;
                            }
                        }*/
                        let a = h * w, moreChild = curNode.children[0];
                        while (moreChild) {
                            let validSize = self.getValidSize(moreChild, curWin);
                            let ch = validSize.h;
                            let cw = validSize.w;
                            if (h < ch) {
                                h = ch;
                            }
                            if (moreChild.innerText !== "" && ch && cw) {
                                a += ch * cw;
                            }
                            moreChild = moreChild.nextElementSibling;
                        }
                        let isMax = false;
                        if (isHori) {
                            if (curMaxEle) {
                                if (w > curWidth && (windowWidth>>1) > curWidth) {
                                    isMax = true;
                                } else if (w + 300 > curWidth && a > curMaxArea) {
                                    isMax = true;
                                }
                            }
                        } else {
                            if (curMaxEle && curMaxEle.offsetParent === curNode.offsetParent && curMaxEle.offsetTop === curNode.offsetTop) {
                                if (curMaxArea * 2 > a) continue;
                            }
                            isMax = curMaxArea < a;
                        }
                        if (curMaxEle === null || isMax) {
                            if (isHori) {
                                if (w < minWidth) {
                                    continue;
                                }
                            }
                            if (h < minHeight) {
                                if (!needCheckNext || h < (minHeight>>1)) {
                                    continue;
                                }
                                if (!ele.contains(self.initNext)) {
                                    continue;
                                } else if (!curNode.contains(self.initNext) && h < curHeight >> 1) {
                                    continue;
                                }
                            }
                            curHeight = h;
                            curMaxArea = a;
                            curWidth = w;
                            curMaxEle = curNode;
                            preOffsetTop = curNode.offsetTop;
                        }
                    }
                    let curHeightPercent = curHeight / bodyHeight;
                    if (curMaxEle && curHeightPercent <= 0.18) {
                        let article;
                        for (let i = 0; i < mainSel.length; i++) {
                            article = doc.querySelectorAll(mainSel[i]);
                            if (article && article.length === 1) break;
                        }
                        if (article && article.length === 1) {
                            article = article[0];
                            let childrenEnd = self.checkTargetChildren(article, curWin, articleNum, curHeight);
                            self.curSiteRule.pageElement = article.nodeName.toLowerCase() + (article.id ? "#" + article.id : "") + (article.className ? "." + article.className.replace(/ /g, ".") : "") + childrenEnd;
                            debug(self.curSiteRule.pageElement, 'Page element');
                            return childrenEnd ? article.children : [article];
                        }
                        curMaxEle = null;
                    }
                    if (curMaxEle && (!compareNodeName(curMaxEle, ["ul"]) || curHeightPercent > 0.8)) {
                        let sameClassNum = 0, hasDifferent = false;
                        if (curMaxEle.className) {
                            for(i = 0; i < ele.children.length; i++) {
                                let curNode = ele.children[i];
                                if (curMaxEle !== curNode && curNode.style.display !== 'none' && curMaxEle.className === curNode.className && curMaxEle.nodeName === curNode.nodeName){
                                    sameClassNum++;
                                } else if (curMaxEle.className !== curNode.className) {
                                    hasDifferent = true;
                                }
                            }
                        }
                        if (sameClassNum < 2 || (sameClassNum < 5 && hasDifferent)) {
                            return checkElement(curMaxEle);
                        }
                    }
                    if (ele.nodeName === "APP-ROOT") {
                        isPause = true;
                        debug(ele, "Angular root");
                        return null;
                    }
                    while (compareNodeName(ele, ["p", "br", "td"])) {
                        ele = ele.parentNode;
                    }
                    if (compareNodeName(ele, ["tbody"])) {
                        self.curSiteRule.pageElement = geneSelector(ele) + ">*";
                        if (ele.children.length > 0 && ele.children[0].querySelector("th")) {
                            self.curSiteRule.pageElement += ":not(:first-child)";
                        }
                        debug(self.curSiteRule.pageElement, 'Page element');
                        return ele.children;
                    }
                    let imgs = ele.querySelectorAll('img');
                    if (imgs.length === 1) {
                        let img = imgs[0];
                        if (img.offsetWidth > ele.offsetWidth / 3 * 2 && img.offsetHeight > ele.offsetHeight / 2) {
                            ele = img;
                        }
                    }
                    let childrenEnd = self.checkTargetChildren(ele, curWin, articleNum, curHeight);
                    if (childrenEnd) {
                        self.curSiteRule.pageElement = geneSelector(ele) + childrenEnd;
                        ele = ele.children;
                    } else {
                        if (ele.scrollHeight === 0 && ele.parentNode.children.length === 1) {
                            ele = ele.parentNode;
                        }
                        self.curSiteRule.pageElement = geneSelector(ele);
                        ele = [ele];
                    }
                    debug(self.curSiteRule.pageElement, 'Page element');
                    return ele;
                }
                pageElement = checkElement(body);
                if (doc === document && pageElement && pageElement.length > 0 && self.initNext) {
                    let posEle = pageElement[pageElement.length - 1];
                    while (posEle && !posEle.offsetParent) {
                        posEle = posEle.previousElementSibling || posEle.parentNode;
                    }
                    if (posEle && posEle.lastElementChild) {
                        if (posEle.scrollHeight === 0) posEle = posEle.lastElementChild;
                        else if (posEle.lastElementChild.offsetTop > 500) {
                            posEle = posEle.lastElementChild;
                        }
                    }
                    let lastBottom = forceState !== 2 && forceState !== 3 && posEle && getElementBottom(posEle);
                    if (lastBottom && getElementTop(self.initNext) - lastBottom > 1000) {
                        debug("Stop as too long between next & page element, try to enable Force-Join mode.");
                        isPause = true;
                        pageElement = [];
                        sideController.remove();
                    } else {
                        if (pageElement.length === 1 && compareNodeName(pageElement[0], ["img"])) {
                            self.curSiteRule.pageBar = 0;
                        }
                    }
                }
                //if(pageElement)this.saveCurSiteRule();
            }

            if (doc !== document) {
                this.setPageElementCss(pageElement);
                this.lazyImgAction(pageElement, doc);
                this.filterEles(doc, pageElement);
            } else if (!this.docPageElement) {
                this.setPageElementCss(pageElement, true);
                this.docPageElement = pageElement;
                this.filterEles(doc, pageElement);
                if (this.nextLinkHref) {
                    this.openInNewTab(pageElement);
                }
            }
            return pageElement;
        }

        showAddedElements() {
            if (!this.addedElementsIsHide) return;
            if (this.addedElePool && this.addedElePool.length) {
                this.addedElePool.forEach(ele => {
                    ele.classList && ele.classList.remove("pagetual-hide");
                });
            }
            this.addedElementsIsHide = false;
        }

        hideAddedElements() {
            if (this.addedElePool && this.addedElePool.length) {
                this.addedElePool.forEach(ele => {
                    ele.classList && ele.classList.add("pagetual-hide");
                });
            }
            this.addedElementsIsHide = true;
        }

        toggleAddedElements() {
            if (this.addedElementsIsHide) {
                this.showAddedElements();
            } else {
                this.hideAddedElements();
            }
        }

        changeVisibility() {
            let contentVisibility = this.curSiteRule.contentVisibility || rulesData.contentVisibility;
            if (!contentVisibility) return;
            if (!this.changingVisibility) {
                clearTimeout(this.changeVisibilityTimer);
                this.changeVisibilityTimer = setTimeout(() => {
                    this.changingVisibility = true;
                    this.changeVisibility();
                }, 300);
                return;
            }
            this.changingVisibility = false;
            if (!this.visibilityItems || !this.visibilityItems.length || this.visibleIndex < 0) return;
            let tempIndex = this.visibleIndex, findVisible = false, lastVisible = 0;
            let viewPortHeight = window.innerHeight || document.documentElement.clientHeight || getBody(document).clientHeight;
            let checkItem = this.visibilityItems[tempIndex];
            while(checkItem) {
                if (checkItem.offsetParent) {
                    if (!checkItem.style.containIntrinsicSize) return;
                    let clientRect = checkItem.getBoundingClientRect();
                    let top = clientRect && clientRect.top;
                    let bottom = clientRect && clientRect.bottom;
                    if (bottom > 0 && top < viewPortHeight) {
                        if (!findVisible) {
                            findVisible = true;
                            lastVisible = tempIndex;
                        }
                        checkItem.style.contentVisibility = "visible";
                    } else {
                        if (top < viewPortHeight && checkItem.style.contentVisibility === "auto") {
                            break;
                        } else checkItem.style.contentVisibility = "auto";
                    }
                }
                if (tempIndex === 0) break;
                tempIndex--;
                checkItem = this.visibilityItems[tempIndex];
            }
            tempIndex = this.visibleIndex + 1;
            if (findVisible) {
                this.visibleIndex = lastVisible;
            }
            checkItem = this.visibilityItems[tempIndex];
            while(checkItem) {
                if (checkItem.offsetParent) {
                    if (!checkItem.style.containIntrinsicSize) return;
                    let clientRect = checkItem.getBoundingClientRect();
                    let top = clientRect && clientRect.top;
                    let bottom = clientRect && clientRect.bottom;
                    if (bottom > 0 && top < viewPortHeight) {
                        findVisible = true;
                        lastVisible = tempIndex;
                        checkItem.style.contentVisibility = "visible";
                    } else {
                        if (findVisible && checkItem.style.contentVisibility === "auto") {
                            break;
                        } else checkItem.style.contentVisibility = "auto";
                    }
                }
                if (tempIndex === this.visibilityItems.length - 1) break;
                tempIndex++;
                checkItem = this.visibilityItems[tempIndex];
            }
            if (findVisible) {
                this.visibleIndex = lastVisible;
            }
        }

        setPageElementCss(pageElement, init) {
            let self = this;
            if (pageElement && pageElement.length > 0) {
                let pageElementCss = this.curSiteRule.pageElementCss || rulesData.pageElementCss;
                if (!pageElementCss && init && !this.nextLinkHref) return;
                let contentVisibility = this.curSiteRule.contentVisibility || rulesData.contentVisibility;
                if (!contentVisibility && !pageElementCss) return;
                [].forEach.call(pageElement, (ele, i) => {
                    if (!compareNodeName(ele, ["link", "meta", "style", "script"])) {
                        if (pageElementCss) {
                            if (pageElementCss !== '0' && !ele.dataset.pagetualPageElement) {
                                ele.style.cssText = (ele.style.cssText || '') + pageElementCss;
                                ele.dataset.pagetualPageElement = 1;
                            }
                        }
                        if (contentVisibility) {
                            ele.style.containIntrinsicSize = `auto ${ele.offsetHeight || self.preVisibleHeight || 100}px`;
                            if (ele.style.containIntrinsicSize) {
                                if (ele.offsetHeight) self.preVisibleHeight = ele.offsetHeight;
                                if (init) {
                                    ele.style.contentVisibility = "visible";
                                    self.visibilityItems.push(ele);
                                    self.visibleIndex++;
                                } else {
                                    ele.style.contentVisibility = emuIframe ? "visible" : "auto";
                                }
                            }
                        }
                    }
                });
            }
        }

        clearAddedElements() {
            if (this.addedElePool && this.addedElePool.length) {
                this.addedElePool.forEach(ele => {
                    if (ele.parentNode) ele.parentNode.removeChild(ele);
                });
            }
            this.addedElePool = [];
            sideController.remove();
        }

        linkHasHref(link) {
            return link && link.href && link.href.replace && !this.hrefIsJs(link.href);
        }

        hrefIsJs(href) {
            return /^(javascript|#|$)/.test(href.trim().replace("#p{", "").replace(location.href, ""));
        }

        async querySelectorList(source, list, defaultView) {
            for (let i = 0; i < list.length; i++) {
                await sleep(1);
                let sel = list[i];
                let result = getAllElements(sel, source);
                if (result.length > 0) {
                    if (defaultView) {
                        for (let i = result.length - 1; i >= 0; i--) {
                            let ele = result[i];
                            if (isVisible(ele, defaultView)) return ele;
                        }
                    }
                    return result[result.length - 1];
                }
            }
            return null;
        }

        verifyElement(ele) {
            let verifyHandler = e => {
                if (e.nodeType == 9) return true;
                if (e.style.display === "none" || e.getAttribute("aria-disabled") === "true") {
                    return false;
                }
                if (e.className) {
                    if (/slick|slide|carousel|gallery|disabled\s*$/i.test(e.className)) {
                        return false;
                    } else if (e.classList) {
                        if (e.classList.contains('disabled') || e.classList.contains('active')) {
                            return false;
                        }
                    }
                }
                let ariaLabel = e.getAttribute("aria-label");
                if (ariaLabel && /slick|slide|carousel|gallery/i.test(ariaLabel)) return false;
                return true;
            };
            if (!ele) return false;
            let i = 0;
            while (ele && i++ < 6) {
                if (!verifyHandler(ele)) return false;
                ele = ele.parentNode;
            }
            return true;
        }

        async getPage(doc, exist) {
            let body = getBody(doc);
            let canSave = false;//發現頁碼選擇器在其他頁對不上，還是別保存了
            let url = this.curUrl.slice(0, 250).replace("index.php?", "?");
            let _url = url.replace(/\.s?html?$/i, "").toLowerCase();
            let pageNum = 1, preStr = "", afterStr = "";
            let pageTwoReg = /^[\/\?&]?[_-]?(p|page)?=?\/?2(\/[^\/]*$|\?|&|$)/i;
            let pageMatch1 = url.match(/(.*[\?&]p(?:age)?=)(\d+)($|[#&].*)/i);
            let doubtTextReg = /^\s*(»|>>)\s*$/;
            if (pageMatch1) {
                preStr = pageMatch1[1];
                pageNum = parseInt(pageMatch1[2]);
                afterStr = pageMatch1[3];
            } else {
                let pageMatch2 = url.match(/(.*[a-z\/\-_](?:p|page)?\/?)(\d+)(\.s?html?$|\/?$)/i);
                if (pageMatch2) {
                    preStr = pageMatch2[1];
                    pageNum = parseInt(pageMatch2[2]);
                    afterStr = pageMatch2[3];
                    if (/^\/?$/.test(afterStr) && !/(p(age)?|_|\-|\/)$/.test(preStr)) {
                        preStr = "";
                        afterStr = "";
                    }
                }
            }
            if (pageNum > 999) {
                pageNum = 1;
                preStr = "";
                afterStr = "";
            }
            let curPage = doc, i, cur, jsNext;
            let next1, next2, next3, next4, nextJs1, nextJs2;
            let selectorList = [
                ".page-next>a",
                "a.next_page",
                "#next_page",
                ".curPage+a",
                ".nextPage",
                ".pagination-next>a",
                "a[data-pagination=next]",
                ".pageButtonsCurrent+a",
                "a[class*=nextpage]",
                "li.page-current+li>a",
                "[class^=pag] a[rel=next]",
                "[class^=Pag] [aria-label=next]",
                "[aria-label='Next Page']",
                "[aria-label='Next page']",
                "[aria-label='next page']",
                ".pagination-nav__item--next>a",
                "a.pageright",
                ".page-numbers.current+a",
                "a.page-numbers.next",
                "body [class*=pagination] li.active+span+li>a",
                "body [class*=pagination] li.active+li>a",
                "body [class^=pag] .current+a",
                ".page_current+a",
                "input[value='next']",
                "input[value='Next page']",
                "input[value='下一页']",
                "input[value='下一頁']",
                "a#pb_next",
                "a#rightFix",
                "a#btnPreGn",
                "a.page-next",
                "a.pages-next",
                "a.page.right",
                ".paging>.active+.item",
                "a#next",
                ".next>a",
                ".next>button",
                "a[alt=next]",
                ".pg_area>em+a",
                "button.next:not([disabled])",
                ".btn_next:not([disabled])",
                ".btn-next:not([disabled])",
                "a#linkNext",
                "body a[class*=page__next]",
                "body [class*=pager]>a.next",
                "body [class*=pagination-next]>a",
                "body [class*=pagination-next]>button",
                "body [class*=page--current]+li>a",
                "body [class*=Pages]>.curr+a",
                "body [class*=pagination] [class*=next]",
                ".page>em+a",
                "[name*=nextPage]",
                '//button[contains(@class, "Page")][text()="Next"]',
                '//button[contains(@class, "page")][text()="next"]'
            ];
            let next = await this.querySelectorList(body, selectorList, doc.defaultView);
            if (!next) {
                await sleep(1);
                let nexts = body.querySelectorAll("a.next");
                const prevReg = /^\s*([上前首尾]|previous)/i;
                for (i = 0; i < nexts.length; i++) {
                    let n = nexts[i];
                    if (this.verifyElement(n) && this.linkHasHref(n) && !prevReg.test(n.innerText.trim())) {
                        next = n;
                        break;
                    }
                }
            }
            if (next) {
                let innerText = next.innerText;
                let isJs = !this.linkHasHref(next);
                if (innerText && nextTextReg2.test(innerText.trim())) {
                    if (isJs) {
                        if (this.verifyElement(next)) {
                            nextJs2 = next;
                        }
                    } else {
                        next2 = next;
                    }
                    next = null;
                } else {
                    if (isJs) {
                        if (this.verifyElement(next)) {
                            jsNext = next;
                        }
                        next = null;
                    }
                }
            }
            if (!next) {
                await sleep(1);
                next = body.querySelector("a.curr+a") ||
                    body.querySelector("div.wp-pagenavi>span.current+a,div.page-nav>span.current+a,div.article-paging>span+a") ||
                    body.querySelector(".number>ul>li.active+li>a,.pager a.next");
            }
            if (!next) {
                await sleep(1);
                let pageDiv = body.querySelector(".pages>ul,.page_no>ul");
                if (pageDiv) {
                    cur = pageDiv.querySelector("li>b,li>strong");
                    if (cur) next = cur.parentNode.nextElementSibling;
                    if (next) next = next.querySelector("a");
                }
            }
            if (!next) {
                await sleep(1);
                next = body.querySelector(".pages>a[href='javascript:;']+a");
                if (next && (next.href === "javascript:;" || next.getAttribute("href") === "#")) next = null;
            }
            if (!next) {
                await sleep(1);
                let pageDiv = body.querySelector(".pagination");
                if (pageDiv) {
                    cur = pageDiv.querySelector("[class*=current],.page-selected");
                    if (cur) next = cur.parentNode.nextElementSibling;
                    if (next) next = next.querySelector("a");
                }
            }
            if (!next) {
                await sleep(1);
                cur = body.querySelector(".paginator td strong");
                if (cur) {
                    while (cur && !compareNodeName(cur, ["td"])) {
                        cur = cur.parentNode;
                    }
                    next = cur && cur.nextElementSibling;
                    if (next) next = next.querySelector("a");
                }
            }
            if (!next) {
                await sleep(1);
                let pageDivs = body.querySelectorAll("[class*=pagination],[class*=Pagination]");
                if (pageDivs && pageDivs.length) {
                    for (let i = pageDivs.length - 1; i >= 0; i--) {
                        let p = pageDivs[i];
                        if (/(next\s*(»|>>|>|›|→|❯)?|&gt;|▶|>|›|→|❯)/i.test(p.title || p.value || '')) {
                            next = p.querySelector("a,button,[type='button']") || p;
                            break;
                        } else if (/^(next\s*(»|>>|>|›|→|❯)?|&gt;|▶|>|›|→|❯)$/i.test((p.innerText || '').trim())) {
                            next = p.querySelector("a,button,[type='button']") || p;
                            break;
                        }
                    }
                    if (next && !this.linkHasHref(next)) {
                        if (!jsNext) jsNext = next;
                        next = null;
                    }
                }
            }
            if (!next) {
                let isApp = !!body.querySelector("main#app");
                let aTags = body.querySelectorAll("a,button,[type='button'],.btn-action");
                for (i = aTags.length - 1; i >= 0; i--) {
                    if (next1) break;
                    if (i % 100 === 0) {
                        await sleep(1);
                    }
                    let aTag = aTags[i];
                    let title = aTag.title || "";
                    let value = aTag.value || "";
                    let innerText = aTag.innerText || "";
                    if (innerText === "" || (title !== "" && title.length < innerText.length)) {
                        innerText = title;
                    }
                    if (innerText === "" || (value !== "" && value.length < innerText.length)) {
                        innerText = value;
                    }
                    if (innerText !== "") {
                        if (innerText === "§") continue;
                        innerText = innerText.trim();
                        if (innerText.length > 80) continue;
                    }
                    if (!this.verifyElement(aTag)) continue;
                    if (aTag.dataset && aTag.dataset.preview) continue;
                    let availableHref = aTag.href && aTag.href.length < 250 && !/^(javascript:|#)/.test(aTag.href);
                    if (availableHref && /next\-?(page)?$|\/video\/|\/vod\/play\//i.test(aTag.href)) continue;
                    if (compareNodeName(aTag.parentNode, ["blockquote"])) continue;
                    if (aTag.previousElementSibling && /\b(play|volume)\b/.test(aTag.previousElementSibling.className)) continue;
                    if (aTag.nextElementSibling && /\b(play|volume)\b/.test(aTag.nextElementSibling.className)) continue;
                    let isJs = !this.linkHasHref(aTag);
                    if (exist && isJs && !aTag.offsetParent) continue;
                    if (innerText) {
                        innerText = innerText.split(/\n/)[0].replace(/ /g, '');
                        if (isJs && /^(»|>>|>|›|→|❯)$/.test(innerText)) continue;
                        if (innerText && innerText.length <= 25) {
                            if (!next1) {
                                if (nextTextReg1.test(innerText)) {
                                    if (isJs) {
                                        if (!nextJs1) nextJs1 = aTag;
                                    } else {
                                        next1 = aTag;
                                    }
                                }
                            }
                            if (!next4) {
                                if (!next2) {
                                    if (nextTextReg2.test(innerText) || /nextpage|pager\-older|next.chap/i.test(aTag.className) || /^(»|>>)$/.test(innerText)) {
                                        if (isJs) {
                                            if (!nextJs2) nextJs2 = aTag;
                                        } else {
                                            next2 = aTag;
                                        }
                                    }
                                }
                                if (!isApp && !next3 && !isJs) {
                                    if (/^(next\s*(»|>>|>|›|→|❯)?|&gt;|▶|>|›|→|❯)$/i.test(aTag.textContent) && aTag.parentNode.hasAttribute && !aTag.parentNode.hasAttribute("jsaction")) {
                                        next3 = aTag;
                                    }
                                }
                            }
                        }
                    }
                    if (isJs) continue;
                    if (!next4) {
                        let prevEle = aTag.previousElementSibling;
                        if (prevEle && compareNodeName(prevEle, ["b", "span", "strong"])) {
                            if (/^\d+$/.test(aTag.innerText.trim()) && /^\d+$/.test(prevEle.innerText.trim()) && parseInt(aTag.innerText) === parseInt(prevEle.innerText) + 1) {
                                next4 = aTag;
                            }
                        }
                    }
                    if (urlWillChange) continue;
                    if (!next4 && availableHref) {
                        let aHref = aTag.href.indexOf("http") === 0 ? aTag.href : this.canonicalUri(aTag.href);
                        if (aHref.indexOf(location.hostname) === -1) continue;
                        let _aHref = aHref.replace("?&", "?").replace("index.php?", "?");
                        if (preStr || afterStr) {
                            let _aHrefTrim = _aHref;
                            if (preStr) _aHrefTrim = _aHrefTrim.replace(preStr, "");
                            if (afterStr) _aHrefTrim = _aHrefTrim.replace(afterStr, "");
                            if (_aHrefTrim == pageNum + 1) {
                                next4 = aTag;
                            }
                        } else if (this.curUrl !== aHref) {
                            _aHref = _aHref.replace(/\.s?html?$/i, "").toLowerCase();
                            if (_aHref.indexOf(_url) !== -1) {
                                let pageTwoMatch = _aHref.replace(_url, "").match(pageTwoReg);
                                if (pageTwoMatch) {
                                    afterStr = pageTwoMatch[2];
                                    next4 = aTag;
                                }
                            }
                        }
                        if (next4 && !/page/.test(next4.href)) {
                            let curHref = next4.getAttribute("href");
                            let curPageReg = new RegExp("(.*)" + (pageNum + 1) + afterStr.replace(/([\.\?])/g, '\\$1'));
                            let otherPageHref = curHref.replace(curPageReg, `$1${pageNum}${afterStr}`);
                            let otherPageEle = body.querySelector(`a[href='${otherPageHref}']`);
                            if (!otherPageEle) {
                                otherPageHref = curHref.replace(curPageReg, `$1${pageNum + 2}${afterStr}`);
                                otherPageEle = body.querySelector(`a[href='${otherPageHref}']`);
                            }
                            if (otherPageEle) {
                                let parent = otherPageEle.parentNode;
                                if (parent && parent.parentNode) {
                                    parent = parent.parentNode;
                                    if (parent.parentNode) {
                                        parent = parent.parentNode;
                                    }
                                }
                                if (parent && parent.contains(next4) && !/^\d+$/.test(next4.innerText.trim())) {
                                    next4 = null;
                                }
                            }
                        }
                    }
                }
                if (next2 && doubtTextReg.test(next2.innerText)) {
                    next2 = this.verifyNext(next2, doc, false);
                }
                if (nextJs2 && doubtTextReg.test(nextJs2.innerText)) {
                    nextJs2 = this.verifyNext(nextJs2, doc, true);
                }
                if (next3) {
                    next3 = this.verifyNext(next3, doc, false);
                }
            }
            if (!next) next = next1 || next4 || next3 || next2;
            if (!next && location.pathname + location.search !== "/") {
                next = jsNext || nextJs1 || nextJs2;
                if (next && next.parentNode.className && next.parentNode.className.indexOf && next.parentNode.className.indexOf('tab') !== -1) next = null;
            }
            if (next && next.classList && (next.classList.contains("results-more") || next.classList.contains("no"))) next = null;
            if (next && next.hasAttribute && next.hasAttribute("disabled")) next = null;
            if (next && next.parentNode.href && compareNodeName(next.parentNode, ["a"])) next = next.parentNode;
            return {next:next, canSave:canSave};
        }

        verifyNext(next, doc, isJs) {
            if (!next) return null;
            if (!isJs) {
                let href = next.getAttribute("href");
                if (href && !/\d/.test(next.getAttribute("href"))) {
                    return null;
                }
            }
            if (next.previousElementSibling && compareNodeName(next.previousElementSibling, ["br"])) return null;
            let eles = [];
            if (next.innerText && next.innerText.indexOf("\n") === -1) {
                eles = getAllElements(`//${next.nodeName}[text()='${next.innerText}']`, doc);
            }
            if (eles.length >= 2 && eles[0].href !== eles[1].href) {
                next = null;
            } else if (doc === document) {
                let left = getElementLeft(next);
                if (left < 20 || (document.documentElement.scrollWidth > 500 && left < 250)) {
                    next = null;
                } else {
                    let top = getElementTop(next);
                    if (top < 20 || (left < window.innerWidth / 3 && top < window.innerHeight / 3)) {
                        next = null;
                    } else {
                        let bottom = top + next.offsetHeight || 0;
                        let scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
                        if (scrollH - bottom < 10) next = null;
                    }
                }
            }
            return next;
        }

        canonicalUri(src) {
            if (!src) {
                return "";
            }
            if (src.charAt(0) === "#") return this.curUrl + src;
            if (src.charAt(0) === "?") return this.curUrl.replace(/^([^\?#]+).*/, "$1" + src);
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
            return (absolute_regex.test(src) ? src : ((src.charAt(0) === "/" ? root_domain : root_page) + src));
        }

        getLinkByPage(url, pageNum) {
            if (!url) return null;
            if (this.curSiteRule.pageNum) {
                let result = this.curSiteRule.pageNum;
                let strMatch = result.match(/\{.*?}/);
                if (!strMatch) return null;
                let urlReg = new RegExp("(" + result.replace(strMatch[0], ")\\d+(") + ")", "i");
                let code = strMatch[0].replace(/^{/, "").replace(/}$/, "").replace(/\$p/g, pageNum);
                if (code === pageNum) {
                    result = url.replace(urlReg, "$1" + code + "$2");
                } else {
                    try {
                        code = Function('"use strict";return ' + code)();
                        if (code && code % 1 == 0) {
                            result = url.replace(urlReg, "$1" + code + "$2");
                        } else return null;
                    } catch(e) {
                        debug(e);
                    }
                }
                if (result != url) {
                    return result;
                }
            }
            return url.replace(/([&\/\?](p=|page[=\/_-]?))\d+/i, "$1" + pageNum).replace(/([_-])\d+\./i, "$1" + pageNum + ".");
        }

        getPageNumFromUrl(url, defaultPage) {
            if (!url) return defaultPage;
            if (this.curSiteRule.pageNum) {
                let result = this.curSiteRule.pageNum;
                let strMatch = result.match(/\{.*?}/);
                if (!strMatch) return defaultPage;
                let urlReg = new RegExp(".*" + result.replace(strMatch[0], "(\\d+)") + ".*", "i");
                let curShowNum = url.replace(urlReg, "$1");
                if (curShowNum !== url) {
                    let code = strMatch[0].replace(/^{/, "").replace(/}$/, "");
                    if (code === "$p") {
                        return curShowNum;
                    } else {
                        try {
                            let page1 = parseInt(Function('"use strict";return ' + code.replace("$p", "0"))());
                            let page2 = parseInt(Function('"use strict";return ' + code.replace("$p", "1"))());
                            let numGap = page2 - page1;
                            let _page = (parseInt(curShowNum) - page1) / numGap;
                            if (_page && _page % 1 === 0) return _page;
                            else {
                                this.curSiteRule.pageNum = null;
                                return defaultPage;
                            }
                        } catch(e) {
                            debug(e);
                        }
                    }
                } else {
                    return defaultPage;
                }
            }
            let pageNum = url.replace(/.*[&\/\?](p=|page[=\/_-]?)(\d+).*/i, "$2");
            return pageNum === url ? defaultPage : (pageNum.length > 4 ? defaultPage : pageNum);
        }

        reachedLastPage() {
            if (rulesData.lastPageTips) {
                showTips(i18n("lastPage"), "", 800);
            }
            _unsafeWindow.postMessage({
                action: "lastPage",
                command: 'pagetual'
            }, '*');
            if (sideController.inited) {
                sideController.frame.classList.add("end");
            }
        }

        async getNextLink(doc, exist) {
            let nextLink = null, page, href;
            let getNextLinkByForm = (form, submitBtn, n) => {
                let params = [];
                let formData = new FormData(form);
                if (submitBtn && submitBtn.getAttribute) {
                    let btnValue, btnName;
                    btnName = submitBtn.getAttribute("name");
                    btnValue = submitBtn.getAttribute("value");
                    if (btnName && btnValue) params = [btnName + "=" + encodeURIComponent(btnValue)];
                }
                for (let [key, value] of formData) {
                    if (n && /^(p|page)$/i.test(key)) {
                        params.push(key + '=' + n);
                    } else {
                        params.push(key + '=' + encodeURIComponent(value));
                    }
                }
                params = params.join('&');
                return form.action + (form.action.indexOf('?') === -1 ? '?' : '&') + params + (form.method === 'post' ? '#p{' + params + '}' : '');
            };
            if (this.curSiteRule.pageElementByJs) {
                this.nextLinkHref = "#";
                return true;
            } else if (this.curSiteRule.nextLinkByJs) {
                try {
                    let over = _url => {};
                    let targetUrl = await ((typeof this.curSiteRule.nextLinkByJs === 'function') ? this.curSiteRule.nextLinkByJs : new AsyncFunction("doc", '"use strict";' + this.curSiteRule.nextLinkByJs))(doc);
                    if (targetUrl) nextLink = {href: targetUrl};
                } catch(e) {
                    debug(e);
                }
            } else if (this.curSiteRule.nextLinkByUrl) {
                let targetUrl = this.curUrl.replace(new RegExp(this.curSiteRule.nextLinkByUrl[0], "i"), this.curSiteRule.nextLinkByUrl[1]);
                if (targetUrl !== this.curUrl) {
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
                            let code = rep.replace("{", "").replace("}", "").replace(/\(\)/g, "0");
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
            } else if (typeof this.curSiteRule.nextLink !== 'undefined') {
                let nextLinkSel = this.curSiteRule.nextLink;
                if (nextLinkSel != 0) {
                    if (Array && Array.isArray && Array.isArray(nextLinkSel)) {
                        nextLink = getElement(nextLinkSel[nextIndex], doc, null, true);
                        if (!nextLink && curPage === 1 && nextIndex !== 0) {
                            nextIndex = 0;
                            nextLink = getElement(nextLinkSel[nextIndex], doc, null, true);
                        }
                    } else nextLink = getElement(nextLinkSel, doc, null, true);
                }
                if (nextLink && (this.curSiteRule.action == 0 || this.curSiteRule.action == 1 || this.curSiteRule.action == 2)) {
                    let form = doc.querySelector('#search-form');
                    if (!nextLink.href && nextLink.hasAttribute && nextLink.hasAttribute("onclick") && form) {
                        if (/^\d+$/.test(nextLink.innerText)) {
                            nextLink.href = getNextLinkByForm(form, nextLink, nextLink.innerText);
                        }
                    } else if (compareNodeName(nextLink, ["input"]) || nextLink.type === "submit") {
                        form = nextLink.parentNode;
                        while (form) {
                            if (compareNodeName(form, ["form"])) break;
                            else form = form.parentNode;
                        }
                        if (form) {
                            nextLink.href = getNextLinkByForm(form, nextLink);
                        }
                    }
                    if (nextLink.href && this.curSiteRule.action != 0) {
                        nextLink.href = nextLink.href.replace(/#p{.*/, "");
                    }
                }
            } else {
                page = await this.getPage(doc, exist);
                nextLink = page.next;
                if (nextLink) {
                    if (compareNodeName(nextLink, ["input"]) || nextLink.type === "submit") {
                        if (!/next/i.test(nextLink.getAttribute("onclick"))) {
                            let form = nextLink.parentNode;
                            while (form) {
                                if (compareNodeName(form, ["form"])) break;
                                else form = form.parentNode;
                            }
                            if (form) {
                                nextLink.href = getNextLinkByForm(form, nextLink);
                            }
                        }
                    }
                    let parent = nextLink;
                    while (parent && !compareNodeName(parent, ["body"])) {
                        if (parent.hasAttribute && parent.hasAttribute("disabled")) {
                            this.nextLinkHref = false;
                            return null;
                        }
                        if (parent.className && parent.classList) {
                            if (parent.classList.contains("noClick") || parent.classList.contains("no-pages") || parent.classList.contains("disabled")) {
                                this.nextLinkHref = false;
                                return null;
                            }
                        }
                        if (parent.style && parent.style.display === "none") {
                            this.nextLinkHref = false;
                            return null;
                        }
                        parent = parent.parentNode;
                    }
                    if (doc === document) {
                        if (!this.linkHasHref(nextLink)) {
                            if (!isVisible(nextLink, _unsafeWindow)) {
                                this.nextLinkHref = false;
                                return null;
                            }
                            let video = document.querySelector("video,iframe[id*=play],[id*=play]>iframe,iframe[src*=player],iframe[src*=m3u8]");
                            if (video) {
                                if (video.offsetParent && video.name !== 'pagetual-iframe') {
                                    let scrollWidth = video.scrollWidth || video.offsetWidth;
                                    let scrollHeight = video.scrollHeight || video.offsetHeight;
                                    if (compareNodeName(video, ["iframe"])) {
                                    } else if (scrollWidth > 100 && scrollHeight > 100) {
                                        let winWidth = window.innerWidth || document.documentElement.clientWidth;
                                        let winHeight = window.innerHeight || document.documentElement.clientHeight;
                                        if (scrollWidth > winWidth>>1 && scrollHeight > winHeight>>1) {
                                            debug("Disable when large media found");
                                        } else {
                                            video = null;
                                        }
                                    } else {
                                        video = null;
                                    }
                                } else {
                                    video = null;
                                }
                            }
                            if (video) {
                                isPause = true;
                                this.clearAddedElements();
                                this.nextLinkHref = false;
                                return null;
                            }
                        }

                        let nextLinkCs = _unsafeWindow.getComputedStyle(nextLink);
                        if (nextLinkCs.cursor === "not-allowed") {
                            this.nextLinkHref = false;
                            return null;
                        }
                        this.initNext = nextLink;
                    }
                    let form = doc.querySelector('#search-form');
                    if (!nextLink.href && nextLink.hasAttribute("onclick") && form) {
                        if (form && /^\d+$/.test(nextLink.innerText)) {
                            href = getNextLinkByForm(form, nextLink, nextLink.innerText);
                        }
                    }
                }
            }
            if (nextLink) {
                if (doc === document && nextLink.offsetParent) {
                    let scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
                    let actualBottom = getElementBottom(nextLink);
                    bottomGap = scrollH - actualBottom + (window.innerHeight || document.documentElement.clientHeight) * rate;
                    if (bottomGap < 100) bottomGap = 100;
                }
                if (!this.checkStopSign(nextLink, doc)) {
                    if (curPage > 1) {
                        this.reachedLastPage();
                    }
                    return null;
                }
                if (this.curSiteRule.action == 3) {
                    if (doc == document) debug(nextLink, 'Next link');
                    this.nextLinkHref = '#';
                } else {
                    let needUrl = (this.curSiteRule.action == 0 || this.curSiteRule.action == 1 || this.curSiteRule.action == 2);
                    if (!href) href = nextLink.href;
                    if (href && nextLink.getAttribute) {
                        let _href = nextLink.getAttribute("href");
                        if (_href) {
                            let realHref = _href.replace(location.href, "");
                            if (realHref.charAt(0) === "#" || realHref === "?"){
                                href = "#";
                            } else {
                                href = _href;
                            }
                        } else if (_href === "") {
                            href = _href;
                        }
                    }

                    if (needUrl && (href === "" || href === null)) {
                        this.nextLinkHref = false;
                    } else if (needUrl && /^(javascript:|#)/.test(href)) {
                        this.nextLinkHref = false;
                    } else {
                        this.nextLinkHref = (href && !/^(javascript:|#)/.test(href)) ? this.canonicalUri(href) : "#";
                        let tempUrl = this.nextLinkHref;
                        if (tempUrl !== "#" && (this.compareUrl(tempUrl, this.initUrl) || this.compareUrl(tempUrl, this.curUrl) || this.compareUrl(tempUrl, this.curUrl + "#") || this.compareUrl(tempUrl, this.oldUrl) || this.compareUrl(tempUrl, this.oldUrl + "#"))) {
                            this.nextLinkHref = false;
                        } else if (doc === document) {
                            debug(nextLink, 'Next link');
                        }
                    }
                }
            } else {
                this.nextLinkHref = false;
            }
            this.nextLinkEle = nextLink;
            this.preload();
            return nextLink;
        }

        compareUrl(url1, url2) {
            if (url1 === url2) return true;
            if (!url1 || !url2) return false;
            let url1Arr = url1.split("?");
            let url2Arr = url2.split("?");
            if (url1Arr[0] != url2Arr[0]) return false;
            if (!url1Arr[1] || !url2Arr[1]) return false;
            url1Arr = url1Arr[1].split("&").sort().join("&");
            url2Arr = url2Arr[1].split("&").sort().join("&");
            return url1Arr === url2Arr;
        }

        filterEles(doc, eles) {
            let filter = this.curSiteRule.filter;
            if (!filter || !eles || eles.length === 0) return;
            if (eles.length === 1) {
                eles = eles[0].children;
                if (eles.length === 1) {
                    eles = eles[0].children;
                }
            }
            if (typeof filter === "string") {
                if (/^\d+$/.test(filter)) {
                    filter = {count: parseInt(filter)};
                } else filter = {words: filter};
            }
            [].forEach.call(eles, ele => {
                if (!ele.parentNode) return;
                let canKeep = (() => {
                    let innerText = (ele.innerText && ele.innerText.trim()) || "";
                    if (filter.count) {
                        if (innerText.length < filter.count) return false;
                    }
                    if (filter.words) {
                        let wordsRegExp = new RegExp(filter.words, "i");
                        if (innerText && wordsRegExp.test(innerText)) return false;
                    }
                    if (filter.link) {
                        let linkRegExp = new RegExp(filter.link, "i");
                        if (compareNodeName(ele, ["a"]) && linkRegExp.test(ele.href)) return false;
                        let aChildren = ele.querySelectorAll("a");
                        for (let i = 0; i < aChildren.length; i++) {
                            let child = aChildren[i];
                            if (linkRegExp.test(child.href)) return false;
                        }
                    }
                    if (filter.selector) {
                        if (getElement(filter.selector, doc, ele)) return false;
                    }
                    return true;
                })();
                if (!canKeep) {
                    ele.parentNode.removeChild(ele);
                }
            });
        }

        checkStopSign(nextLink, doc) {
            if (this.curSiteRule.stopSign) {
                let typeArray = Array && Array.isArray && Array.isArray(this.curSiteRule.stopSign);
                let typeObject = !typeArray && (this.curSiteRule.stopSign.include || this.curSiteRule.stopSign.exclude || this.curSiteRule.stopSign.pageNum);
                if (typeArray || typeObject) {
                    let includeSel, excludeSel, curSign, maxSign;
                    if (typeArray) {
                        includeSel = this.curSiteRule.stopSign[0];
                        excludeSel = this.curSiteRule.stopSign[1];
                        curSign = this.curSiteRule.stopSign[2];
                        maxSign = this.curSiteRule.stopSign[3];
                        if (Array && Array.isArray && Array.isArray(includeSel) && !curSign) {
                            curSign = includeSel;
                            includeSel = false;
                        }
                        if (excludeSel && Array && Array.isArray && Array.isArray(excludeSel) && !maxSign) {
                            maxSign = excludeSel;
                            excludeSel = false;
                        }
                    } else {
                        includeSel = this.curSiteRule.stopSign.include;
                        excludeSel = this.curSiteRule.stopSign.exclude;
                        curSign = this.curSiteRule.stopSign.pageNum;
                    }
                    if (includeSel) {
                        includeSel = includeSel.trim();
                        if (!getElement(includeSel, doc)) {
                            isPause = true;
                            this.nextLinkHref = false;
                            return false;
                        }
                    }
                    if (excludeSel) {
                        excludeSel = excludeSel.trim();
                        if (getElement(excludeSel, doc)) {
                            isPause = true;
                            this.nextLinkHref = false;
                            return false;
                        }
                    }
                    if (curSign) {
                        if (!maxSign) maxSign = curSign.slice(2);
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
                                isPause = true;
                                this.nextLinkHref = false;
                                return false;
                            }
                        }
                    }
                } else {
                    try {
                        let stopSign = ((typeof this.curSiteRule.stopSign === 'function') ? this.curSiteRule.stopSign : Function("doc", "nextLink", '"use strict";' + this.curSiteRule.stopSign))(doc, nextLink);
                        if (stopSign) {
                            isPause = true;
                            this.nextLinkHref = false;
                            return false;
                        }
                    } catch(e) {
                        debug(e);
                    }
                }
            }
            return true;
        }

        preloadImageHandler() {
            if (this.preloadingImage || !this.unCheckedImgs.length) return;
            this.preloadingImage = true;
            setTimeout(() => {
                this.preloadingImage = false;
                this.preloadImageHandler();
            }, 10);
            let iSrc = this.unCheckedImgs.shift();
            let img = document.createElement('img');
            img.src = iSrc;
            this.preloadDiv.appendChild(img);
        }

        preload() {
            if (!rulesData.preload) return;
            if (this.curSiteRule.preload === 0) return;
            if (!this.nextLinkHref || this.nextLinkHref == "#") return;
            if (this.readyStateUnComplete) return;
            if (document.readyState !== 'complete') {
                this.readyStateUnComplete = true;
                let self = this;
                window.addEventListener("load", e => {
                    self.readyStateUnComplete = false;
                    self.preload();
                });
                return;
            }
            let self = this, url = this.nextLinkHref;
            let postParams = url.match(/#p{(.*)}$/);
            if (postParams) {
                postParams = postParams[1];
                url = url.replace(/#p{.*/, "");
            }
            _GM_xmlhttpRequest({
                url: url,
                method: postParams ? 'POST' : 'GET',
                data: postParams,
                overrideMimeType: 'text/html;charset=' + charset,
                headers: {
                    'Referer': location.href,
                    'User-Agent': navigator.userAgent,
                    "Content-Type": (postParams ? "application/x-www-form-urlencoded" : "text/html") + ";charset=" + charset,
                },
                timeout: 10000,
                onload: function(res) {
                    var doc = null;
                    try {
                        doc = document.implementation.createHTMLDocument('');
                        doc.documentElement.innerHTML = createHTML(res.response);
                        var body = getBody(doc);
                        if (!self.preloadDiv) {
                            self.preloadDiv = document.createElement('div');
                            self.preloadDiv.id = "pagetual-preload";
                            self.preloadDiv.style.cssText = 'display:none!important;';
                            getBody(document).appendChild(self.preloadDiv);
                            self.checkedImgs = {};
                            self.unCheckedImgs = [];
                        }
                        let code = self.curSiteRule.preloadImages;
                        if (code) {
                            let imgSrcArr = new Function("doc", '"use strict";' + code)(doc);
                            if (imgSrcArr && imgSrcArr.length) {
                                imgSrcArr.forEach(imgSrc => {
                                    if (imgSrc && !self.checkedImgs[imgSrc]) {
                                        self.checkedImgs[imgSrc] = true;
                                        self.unCheckedImgs.push(imgSrc);
                                    }
                                });
                            }
                            self.preloadImageHandler();
                        } else if (code !== 0 && code !== false) {
                            if (body && body.firstChild) {
                                self.lazyImgAction(body.children, doc);
                            }
                            [].forEach.call(doc.images, i => {
                                let iSrc = i.src;
                                if (iSrc && !self.checkedImgs[iSrc]) {
                                    self.checkedImgs[iSrc] = true;
                                    self.unCheckedImgs.push(iSrc);
                                }
                            });
                            self.preloadImageHandler();
                        }
                    }
                    catch(e) {
                        debug(e);
                        return;
                    }
                }
            });
        }

        getInsert(refresh) {
            if (refresh) {
                this.insert = null;
            }
            if (this.insert && this.insert.parentNode && document.documentElement.contains(this.insert)) {
                return this.insert;
            }
            if (this.curSiteRule.insert) {
                let insertSel = this.curSiteRule.insert;
                if (Array && Array.isArray && Array.isArray(insertSel)) {
                    insertSel = insertSel[nextIndex < insertSel.length ? nextIndex : 0];
                }
                this.insert = getElement(insertSel, document, null, true);
            } else {
                this.docPageElement = null;
                let pageElement = this.getPageElement(document, _unsafeWindow);
                if (this.curSiteRule.smart && this.nextLinkHref == "#" && this.curSiteRule.pageElement === 'body') {
                    debug("Stop as jsNext & whole body");
                    isPause = true;
                    return null;
                }
                if (pageElement && pageElement.length > 0) {
                    let pEIndex = pageElement.length - 1;
                    let pELast = pageElement[pEIndex];
                    while(pELast && compareNodeName(pELast, ["link", "meta", "style", "script"])) {
                        pEIndex--;
                        pELast = pageElement[pEIndex];
                    }
                    this.insert = pELast.nextSibling ? pELast.nextSibling : pELast.parentNode.appendChild(document.createTextNode(' '));
                }
            }
            return this.insert;
        }

        pageInit(doc, eles) {
            let code = this.curSiteRule.pageInit;
            if (code) {
                let initFunc = ((typeof code == 'function') ? code : Function("doc", "eles", '"use strict";' + code));
                let checkInit = (resolve) => {
                    try {
                        if (initFunc(doc, eles) === false) {
                            setTimeout(() => {
                                checkInit(resolve);
                            }, 100);
                        } else {
                            resolve(true);
                        }
                    } catch(e) {
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

        pageAction(doc, eles) {
            let code = this.curSiteRule.pageAction;
            if (code) {
                try {
                    ((typeof code == 'function') ? code : Function("doc", "eles", '"use strict";' + code))(doc, eles);
                } catch(e) {
                    debug(e);
                }
            }
            this.openInNewTab(eles);
            this.replaceElement(doc);
        }

        openInNewTab(eles) {
            if (openInNewTab) {
                [].forEach.call(eles, ele => {
                    if (compareNodeName(ele, ["a"]) && ele.href && !/^(mailto:|javascript:)|#/.test(ele.href)) {
                        ele.setAttribute('target', openInNewTab == 1 ? '_blank' : '_self');
                    } else {
                        [].forEach.call(ele.querySelectorAll('a[href]:not([href^="mailto:"]):not([href^="javascript:"]):not([href^="#"])'), a => {
                            if (openInNewTab == 1) {
                                a.setAttribute('target', '_blank');
                                if (a.getAttribute('onclick') == 'atarget(this)') {
                                    a.removeAttribute('onclick');
                                }
                            } else a.setAttribute('target', '_self');
                        });
                    }
                });
            }
        }

        lazyImgAction(eles, doc) {
            if (!eles || eles.length == 0) return;
            let lazyImgSrc = this.curSiteRule.lazyImgSrc;
            if (lazyImgSrc === 0 || lazyImgSrc === '0') return;
            let imgLazyAttrs = [];
            let lazyAttrs = ["div[data-thumb]|data-src", "div.img|data-src", "div.lazy|data-src", "div.lazy|data-original", "a.lazy|data-bg", "a.lazyload|data-original"];
            let removeProps = [];
            let setLazyImg = img => {
                let realSrc;
                imgLazyAttrs.forEach(attr => {
                    realSrc = img.getAttribute(lazyImgSrc[0]);
                    if (realSrc) {
                        removeProps.forEach(prop => {
                            img.removeAttribute(prop.trim());
                        });
                        img.src = realSrc;
                        return;
                    }
                })
                if (!realSrc) {
                    let lazyAttr = "";
                    if (img.getAttribute("_src") && !img.src) {
                        lazyAttr = "_src";
                        realSrc = img.getAttribute(lazyAttr);
                    } else {
                        for (let i in lazyImgAttr) {
                            lazyAttr = lazyImgAttr[i];
                            let attrValue = img.getAttribute(lazyAttr);
                            if (attrValue) {
                                realSrc = attrValue;
                                break;
                            }
                        }
                    }
                    if (!realSrc && img._lazyrias && img._lazyrias.srcset) {
                        realSrc = img._lazyrias.srcset[img._lazyrias.srcset.length - 1];
                        lazyAttr = "_lazyrias";
                    }
                    if (!realSrc && img.srcset) {
                        lazyAttr = "srcset";
                        var srcs = img.srcset.split(/[xw],/i), largeSize = 0;
                        srcs.forEach(srci => {
                            let srcInfo = srci.trim().split(" "), curSize = parseInt(srcInfo[1]);
                            if (srcInfo[1] && curSize > largeSize) {
                                largeSize = curSize;
                                realSrc = srcInfo[0];
                            }
                        });
                    }
                    if (realSrc) {
                        img.src = realSrc;
                        img.removeAttribute("srcset");
                        img.removeAttribute(lazyAttr);
                        if (img.classList && img.classList.contains && img.classList.contains("lazy")) {
                            img.classList.remove("lazy");
                        }
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
                }
            };
            if (lazyImgSrc) {
                if (!Array.isArray(lazyImgSrc)) {
                    lazyAttrs = lazyImgSrc.split(",");
                } else {
                    lazyAttrs = lazyImgSrc[0].split(",");
                    removeProps = lazyImgSrc[1].split(",");
                }
            }
            lazyAttrs.forEach(attr => {
                let attrArr = attr.split("|");
                if (attrArr.length !== 2) {
                    imgLazyAttrs.push(attr.trim());
                } else {
                    let selector = attrArr[0].trim();
                    let lazyAttr = attrArr[1].trim();
                    if (selector == "img") {
                        imgLazyAttrs.push(lazyAttr);
                    } else {
                        selector += "[" + lazyAttr + "]";
                        [].forEach.call(doc.querySelectorAll(selector), ele => {
                            ele.style.setProperty("background-image", "url(" + ele.getAttribute(lazyAttr) + ")", "important");
                            removeProps.forEach(prop => {
                                ele.removeAttribute(prop.trim());
                            });
                        });
                    }
                }
            });
            [].forEach.call(doc.querySelectorAll("img,picture>source"), img => {
                setLazyImg(img);
            });
        }

        canListenUrlChange() {
            if (this.curSiteRule) {
                if (this.curSiteRule.listenUrlChange === true) return true;
                if (this.curSiteRule.listenUrlChange === false) return false;
                if (this.docElementValid()) {
                    return false;
                }
            }
            return true;
        }

        checkClickHref() {
            if (this.curSiteRule.smart && this.nextLinkEle && !this.linkHasHref(this.nextLinkEle)) {
                this.urlChanged();
                isPause = true;
                if (!this.nextLinkHref) isLoading = false;
            }
        }

        docElementValid() {
            if (!this.docPageElement || this.docPageElement.length == 0) return false;
            if (!this.checkPageEle) {
                let ele;
                if (this.docPageElement.length == 1) {
                    ele = this.docPageElement[0];
                } else {
                    ele = this.docPageElement[Math.floor(this.docPageElement.length / 2)];
                }
                if (ele.children.length) {
                    ele = ele.children[Math.floor(ele.children.length / 2)];
                }
                this.checkPageEle = ele;
            }
            return document.documentElement.contains(this.checkPageEle);
        }

        urlChanged() {
            urlChanged = true;
            this.clearAddedElements();
        }

        initPage(callback) {
            let self = this;
            if (self.initing) return;
            self.initing = true;
            setTimeout(() => {
                self.initing = false;
            }, 100);
            curPage = 1;
            urlChanged = false;
            tryTimes = 0;
            this.clearAddedElements();
            this.insert = null;
            this.visibilityItems = [];
            this.visibleIndex = -1;
            this.pageDoc = document;
            this.nextLinkHref = null;
            this.curUrl = location.href;
            this.oldUrl = "";
            this.initUrl = location.href;
            this.historyUrl = "";
            this.possibleCheck = 0;
            let base = document.querySelector("base");
            this.basePath = (base && base.href) || location.href;
            this.getRule(async () => {
                if (self.curSiteRule.sideController === true || (self.curSiteRule.sideController !== false && rulesData.sideController)) {
                    isPause = manualPause;
                }
                hidePageBar = rulesData.opacity == 0 || self.curSiteRule.pageBar === 0;
                if (typeof(self.curSiteRule.rate) !== "undefined") {
                    rate = self.curSiteRule.rate;
                }
                if (self.curSiteRule.enable == 0) {
                    debug("Stop as rule disable");
                    isPause = true;
                    _GM_registerMenuCommand(i18n("enable"), () => {
                        showTips(i18n("enableSiteTips"));
                        if(!self.customRules) {
                            self.customRules = [];
                        }
                        for (let i in self.customRules) {
                            if (self.customRules[i].url == self.curSiteRule.url) {
                                self.customRules.splice(i, 1);
                                break;
                            }
                        }
                        self.curSiteRule.enable = 1;
                        self.customRules.unshift(self.curSiteRule);
                        storage.setItem("customRules", self.customRules);
                        location.reload();
                    });
                    return;
                }
                if (rulesData.sideControllerAlways) {
                    sideController.setup();
                }
                //若是再亂匹配就不緩存wedata，或者只在找完本地規則之後再考慮wedata的緩存
                if (self.curSiteRule.smart) {
                    delete self.curSiteRule.pageElement;
                    if (!self.possibleRule) {
                        self.smartRules = self.smartRules.filter(item => {return item && item.url != self.curSiteRule.url});
                        self.smartRules.unshift(self.curSiteRule);
                        if (self.smartRules.length > 100) {
                            self.smartRules.pop();
                        }
                        storage.setItem("smartRules", self.smartRules);
                    }
                } else if (self.curSiteRule && self.curSiteRule.url.length > 13) {
                    self.addToHpRules();
                }
                let css;
                if (rulesData.customCss && self.curSiteRule.css) {
                    let globalCssArr = rulesData.customCss.split("inIframe:");
                    let ruleCssArr = self.curSiteRule.css.split("inIframe:");
                    let mainCss = globalCssArr[0] + ruleCssArr[0], inCss = (globalCssArr[1] || "") + (ruleCssArr[1] || "");
                    css = mainCss + (inCss ? ("inIframe:" + inCss) : "");
                } else {
                    css = self.curSiteRule.css || rulesData.customCss;
                }
                if (css) {
                    let cssArr = css.split("inIframe:");
                    if (cssArr && cssArr.length) {
                        _GM_addStyle(cssArr[0]);
                    }
                }
                if (/sidesearch=(1|true)$/.test(self.curUrl)) {
                    openInNewTab = 0;
                } else if (typeof self.curSiteRule.openInNewTab !== 'undefined') {
                    openInNewTab = self.curSiteRule.openInNewTab ? 1 : 2;
                }
                let autoClick = self.curSiteRule.autoClick;
                if (autoClick) {
                    let autoClickBtn;
                    autoClickBtn = getElement(autoClick, document, null, true);
                    if (autoClickBtn) {
                        emuClick(autoClickBtn);
                    }
                }
                let code = self.curSiteRule.init;
                if (code) {
                    try {
                        await ((typeof code == 'function') ? code : new AsyncFunction('doc', 'win', 'iframe', 'click', 'enter', 'input', 'sleep', '"use strict";' + code))(null, null, null, async sel => {await clickAction(sel, document)}, async sel => {await enterAction(sel, document)}, async (sel, v) =>{await inputAction(sel, v, document)}, async time => {await sleep(time)});
                    } catch(e) {
                        debug(e);
                    }
                }
                await self.getNextLink(document, true);
                if (self.curSiteRule.pageNum && self.nextLinkHref && self.nextLinkHref != "#") {
                    let num1st = self.getPageNumFromUrl(location.href, 1);
                    let num2nd = self.getPageNumFromUrl(self.nextLinkHref, 1);
                    if (parseInt(num2nd) != parseInt(num1st) + 1) {
                        self.curSiteRule.pageNum = null;
                    }
                }
                if (self.curSiteRule.smart && self.nextLinkHref == false && self.possibleRule) {
                    let urlReg = new RegExp(self.possibleRule.url, "i");
                    function checkPossible () {
                        if (self.possibleCheck++ < 3) {
                            setTimeout(() => {
                                if (self.curSiteRule.smart) {
                                    var href = location.href.slice(0, 500);
                                    if (urlReg.test(href) && self.ruleMatch(self.possibleRule)) {
                                        self.initPage(() => {});
                                    } else checkPossible();
                                }
                            }, 3000);
                        }
                    }
                    checkPossible();
                }
                self.refreshByClick();
                if (emuIframe && emuIframe.parentNode) {
                    emuIframe.parentNode.removeChild(emuIframe);
                    emuIframe = null;
                }

                let pageElementCss = self.curSiteRule.pageElementCss || rulesData.pageElementCss;
                if (pageElementCss && pageElementCss !== '0') {
                    self.getPageElement(document, _unsafeWindow);
                }
                callback();
                let initRun = typeof self.curSiteRule.initRun == 'undefined' ? rulesData.initRun : self.curSiteRule.initRun;
                if (self.nextLinkHref) {
                    sideController.setup();
                    if (initRun && initRun != false) {
                        setTimeout(() => {
                            nextPage();
                        }, 300);
                    }
                } else isPause = false;
            });
        }

        async hookUrlSetEle(ele, doc) {
            let self = this;
            return new Promise((resolve) => {
                let catchUrl = e => {
                    ele.dataset.url = self.catchedUrl;
                    ele.setAttribute('onclick', 'window.open(this.dataset.url)');
                    window.removeEventListener('pagetual_openUrl', catchUrl);
                    resolve();
                };
                window.addEventListener('pagetual_openUrl', catchUrl);
                emuClick(ele, doc);
            });
        }

        async hookUrl(doc) {
            let sel = this.curSiteRule.hookUrl;
            if (!sel) return;
            let self = this;
            if (!this.initHook) {
                this.initHook = true;
                Object.defineProperty(doc.defaultView, 'open', {
                    get: function () {
                        return (s) => {
                            self.catchedUrl = s;
                            var e = new CustomEvent('pagetual_openUrl');
                            window.dispatchEvent(e);
                        }
                    }
                });
            }
            let eles = getAllElements(sel, doc);
            for (let i = 0; i < eles.length; i++) {
                await sleep(1);
                let ele = eles[i];
                if (!ele.dataset.url) {
                    await this.hookUrlSetEle(ele, doc);
                }
            }
        }

        beginLoading() {
            isLoading = true;
            if (targetY >= 0) {
                window.scrollTo({ top: targetY, behavior: 'instant'});
                targetY = -1;
            }
            let lastScrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
            ruleParser.insertElement(loadingDiv);
            if (forceState == 2) {
                getBody(document).appendChild(loadingDiv);
            } else {
                let parent = loadingDiv.parentNode;
                if (compareNodeName(parent, ["tbody"])) {
                    parent = parent.parentNode;
                }
                if (compareNodeName(parent, ["table"])) {
                    parent.parentNode.appendChild(loadingDiv);
                }
            }
            getBody(document).scrollTop = lastScrollTop;
            document.documentElement.scrollTop = lastScrollTop;
            if (sideController.inited) {
                sideController.frame.classList.add("loading");
            }
        }

        insertElement(ele) {
            if (!this.insert || !this.insert.parentNode) {
                this.getInsert();
            }
            if (this.insert && this.insert.parentNode) {
                let self = this;
                if (ele.nodeName == "#document-fragment") {
                    [].forEach.call(ele.children, el => {
                        self.addedElePool.push(el);
                    });
                } else {
                    this.addedElePool.push(ele);
                }
                if (this.curSiteRule.insertPos == 2 || this.curSiteRule.insertPos == "in") {
                    this.insert.appendChild(ele);
                } else {
                    this.insert.parentNode.insertBefore(ele, this.insert);
                }
            }
        }

        noValidContent(url) {
            if (!this.curSiteRule.nextLinkByUrl) showTips(i18n("noValidContent"), url);
        }

        async insertPage(doc, eles, url, callback, tried) {
            this.oldUrl = this.curUrl;
            let oldTitle = document.title;
            try {
                let oldTitle = this.pageDoc.title;
            } catch (e) {}
            this.pageDoc = doc;
            this.curUrl = url;
            isLoading = true;
            let nextLink = await this.getNextLink(doc);
            this.nextTitle = "";
            if (this.curSiteRule.pageBarText) {
                if (this.curSiteRule.pageBarText == 1 || this.curSiteRule.pageBarText == true) {
                    this.nextTitle = doc.title;
                } else {
                    try {
                        this.nextTitle = ((typeof this.curSiteRule.pageBarText == 'function') ? this.curSiteRule.pageBarText : Function("doc",'"use strict";' + this.curSiteRule.pageBarText))(doc);
                    } catch(e) {
                        debug(e);
                    }
                }
            }
            if (curPage == 1 && !tried && !nextLink && this.curSiteRule.smart && this.curSiteRule.pageElement && this.curSiteRule.action != 0) {
                this.curSiteRule.action = 1;
                this.curUrl = location.href;
                isLoading = false;
                return false;
            }

            if (targetY >= 0) {
                window.scrollTo({ top: targetY, behavior: 'instant'});
                targetY = -1;
            }
            let lastScrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
            this.getInsert();
            await this.pageInit(doc, eles);
            var self = this, newEles = [];
            if (!eles || eles.length == 0 || !self.insert || !self.insert.parentNode) {
                if (callback) callback(eles);
                loadPageOver();
            } else {
                if (callback) callback(eles);
                loadPageOver();
                const collection = document.createDocumentFragment();
                [].forEach.call(eles, ele => {
                    let newEle = ele.cloneNode(true);
                    let oldCanvass = ele.querySelectorAll("canvas");
                    let newCanvass = newEle.querySelectorAll("canvas");
                    if (self.updateUrl) {
                        [].forEach.call(newEle.querySelectorAll("img"), img => {
                            if (img.getAttribute("src")) img.src = self.canonicalUri(img.getAttribute("src"));
                        });
                        [].forEach.call(newEle.querySelectorAll("a"), a => {
                            if (a.getAttribute("href")) a.href = self.canonicalUri(a.getAttribute("href"));
                        });
                    }
                    for (let i = 0; i < oldCanvass.length; i++) {
                        let oldCanvas = oldCanvass[i];
                        let newCanvas = newCanvass[i];
                        newCanvas.getContext('2d').drawImage(oldCanvas, 0, 0);
                    }
                    if (!compareNodeName(newEle, ["style", "script"])) self.visibilityItems.push(newEle);
                    collection.appendChild(newEle)
                    newEles.push(newEle);
                });
                let css = this.curSiteRule.css;
                let addCss = (parent) => {
                    if (css) {
                        let cssArr = css.split("inIframe:");
                        if (cssArr && cssArr.length == 2) {
                            let styleEle = document.createElement("style");
                            styleEle.innerHTML = cssArr[1];
                            parent.appendChild(styleEle);
                        }
                    }
                };
                if (this.curSiteRule.surround === "iframe") {
                    let ele = document.createElement("iframe");
                    ele.style.border = "unset";
                    ele.style.maxWidth = "100%";
                    ele.style.width = "100vw";
                    self.insertElement(ele);
                    try {
                        let doc = ele.contentDocument || ele.contentWindow.document;
                        doc.body.appendChild(collection);
                        ele.style.width = doc.body.scrollWidth + "px";
                        ele.style.height = doc.body.scrollHeight + "px";
                        doc.documentElement.style.overflow = "hidden";
                        doc.body.style.overflow = "hidden";
                        addCss(doc.body);
                    } catch(e) {
                        console.log(e);
                    }
                } else if (this.curSiteRule.surround === "shadowDom") {
                    let ele = document.createElement("div");
                    self.insertElement(ele);
                    let shadowRoot = ele.attachShadow({ mode: "open" });
                    shadowRoot.appendChild(collection);
                    addCss(shadowRoot);
                } else {
                    self.insertElement(collection);
                }
            }
            getBody(document).scrollTop = lastScrollTop;
            document.documentElement.scrollTop = lastScrollTop;
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
                this.historyUrl = enableHistoryAfterInsert ? this.curUrl : this.oldUrl;
                if(this.historyUrl != location.href) {
                    let isJs = this.hrefIsJs(this.historyUrl);
                    if (!isJs) {
                        let historyTitle = enableHistoryAfterInsert ? doc.title : oldTitle;
                        _unsafeWindow.history.replaceState(undefined, historyTitle, this.historyUrl);
                        document.title = historyTitle;
                    }
                }
            }
            isLoading = false;
            _unsafeWindow.postMessage({
                action: "insert",
                command: 'pagetual'
            }, '*');
            return true;
        }
    }
    var ruleParser = new RuleParser();

    class SideController {
        //static controller;
        constructor() {
            this.inited = false;
        }

        /*static getInstance() {
            if (!SideController.controller) {
                SideController.controller = new SideController();
            }
            return SideController.controller;
        }*/

        setup() {
            if (ruleParser.curSiteRule.sideController === false) return;
            if (!rulesData.sideController && !ruleParser.curSiteRule.sideController) return;
            this.addToStage();
        }

        init() {
            if (this.inited) return;
            this.inited = true;
            let self = this;
            this.cssText = `
             #pagetual-sideController {
                 position: fixed;
                 top: calc(50% - 83px);
                 left: calc(99% - 40px);
                 width: 40px;
                 border-radius: 20px;
                 box-shadow: rgb(0 0 0) 0px 0px 10px;
                 text-align: center;
                 background: #ffffffd0!important;
                 user-select: none;
                 z-index: 2147483646!important;
                 padding: 0!important;
                 opacity: 0.5;
                 transition: opacity .5s ease, background .5s, box-shadow .5s;
             }
             #pagetual-sideController.end {
                 opacity: 0.3;
             }
             #pagetual-sideController * {
                 font-weight: bold;
                 font-family: arial;
                 font-style: normal;
                 font-size: 20px!important;
                 color: black!important;
                 line-height: normal;
                 float: none;
                 text-align: center;
             }
             #pagetual-sideController.stop {
                 -webkit-filter: invert(100%);
                 filter: invert(100%);
             }
             .pagetual-sideController-btn {
                 padding: 5px 0;
                 cursor: pointer;
                 transition: transform .15s ease-in-out, opacity .3s ease;
             }
             #pagetual-sideController .pagetual-sideController-btn:hover {
                 transform: scale(1.5);
                 color: red!important;
             }
             #pagetual-sideController #pagetual-sideController-move > svg {
                 transition: transform .3s ease;
             }
             #pagetual-sideController #pagetual-sideController-move > svg:hover {
                 transform: scale(1.2);
             }
             ${rulesData.hideLoadingIcon ? '' : `
             #pagetual-sideController.minSize #pagetual-sideController-move::before {
                 content: '';
                 position: absolute;
                 width: 34px;
                 height: 34px;
                 background-color: #1a232a;
                 background-repeat: no-repeat;
                 background-position: 0 0;
                 z-index: -1;
                 margin: -2px;
                 border-radius: 50%;
             }
             #pagetual-sideController.minSize.loading #pagetual-sideController-move::before {
                 background-image: conic-gradient(transparent, #a8efff, transparent 30%);
                 -webkit-animation: siderotate 1s linear infinite;
                 animation: siderotate 1s linear infinite;
             }
             @keyframes siderotate {
                 100% {
                     transform: rotate(1turn);
                 }
             }`}
             #pagetual-sideController.minSize #pagetual-sideController-move > svg {
                 background: white;
                 opacity: 0;
             }
             #pagetual-sideController #pagetual-sideController-move > img,
             #pagetual-sideController #pagetual-sideController-move > span {
                 width: 35px;
                 height: 35px;
                 cursor: pointer;
             }
             #pagetual-sideController.minSize #pagetual-sideController-move > img,
             #pagetual-sideController.minSize #pagetual-sideController-move > span {
                 border-radius: 50px;
                 text-shadow: rgb(255 255 255) 0px 0px 10px;
             }
             #pagetual-sideController #pagetual-sideController-pagenum {
                 font-size: 15px!important;
                 line-height: 30px;
                 text-align: center;
                 position: absolute;
                 right: calc(50% - 15px);
                 top: calc(50% - 15px);
                 border: 1px solid #00000099;
                 display: inline-block;
                 width: 30px;
                 height: 30px;
                 box-sizing: border-box;
                 border-radius: 50%;
                 background: white;
                 opacity: 0;
                 transition: opacity .5s ease;
                 pointer-events: none;
             }
             #pagetual-sideController.minSize #pagetual-sideController-pagenum {
                 opacity: 1;
             }
             #pagetual-sideController:hover {
                 opacity: 1;
             }
             #pagetual-sideController>.extra {
                 bottom: 170px;
                 left: 0px;
                 width: 40px;
                 position: absolute;
             }
             #pagetual-sideController>.extra>svg {
                 width: 40px;
                 height: 30px;
                 opacity: 0.1;
                 cursor: pointer;
                 margin: 0 0 5px 0;
                 transition: opacity .3s ease;
             }
             #pagetual-sideController.minSize>.extra>svg {
                 opacity: 0;
             }
             #pagetual-sideController>.extra>svg:hover {
                 opacity: 1;
             }
             #pagetual-sideController.minSize {
                 box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px;
                 background: #00000000!important;
                 pointer-events: none;
             }
             #pagetual-sideController.minSize #pagetual-sideController-move {
                 pointer-events: all;
                 height: 30px;
             }
             #pagetual-sideController.minSize .pagetual-sideController-btn {
                 opacity: 0;
             }
            `;
            let frame = document.createElement("div");
            frame.id = "pagetual-sideController";
            frame.innerHTML = createHTML(`
                <div class="extra">
                  <svg id="loadNow" class="pagetual" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("loadNow")}</title><path d="M712.106667 525.653333l-291.413334 247.893334a21.333333 21.333333 0 0 1-14.506666 5.546666 20.053333 20.053333 0 0 1-22.186667-19.2V264.106667a20.053333 20.053333 0 0 1 20.906667-19.2 20.906667 20.906667 0 0 1 14.506666 5.546666l291.413334 247.893334a17.92 17.92 0 0 1 1.28 27.306666zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z" fill="#5E5C5C"></path></svg>
                  <svg id="scroll" class="pagetual" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>${i18n("sideControllerScroll")}</title><path d="M912 544v82.64C912 846.096 732.912 1024 512 1024S112 846.096 112 626.64V544h800z" fill="#5E5C5C"></path><path d="M478.656 0v43.328a96 96 0 0 1-32.48 71.952c-27.68 24.448-41.968 48.128-42.896 71.04l-0.096 4.352v104c0 24.224 14.512 49.344 43.52 75.312a96 96 0 0 1 31.952 71.52V496H112.032L112 393.712C112 181.648 264.848 8.72 472.352 0.208L478.656 0z" fill="#999999"></path><path d="M534.24 0C747.584 5.232 912 179.504 912 393.728v102.256L534.208 496v-52.912a96 96 0 0 1 33.536-72.88c28.48-24.416 43.2-48.16 44.16-71.2l0.096-4.336v-104c0-24.352-14.928-49.52-44.784-75.488a96 96 0 0 1-33.008-72.432V0z" fill="#5E5C5C"></path></svg>
                </div>
                <div id="pagetual-sideController-top" class="pagetual-sideController-btn">⊼</div>
                <div>
                  <div id="pagetual-sideController-pre" class="pagetual-sideController-btn">∧</div>
                  <div id="pagetual-sideController-move"><svg class="pagetual" width="30" height="30" style="border-radius: 15px;display: initial;position: relative;cursor: pointer;margin: 0;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#604b4a"></path></svg><div id="pagetual-sideController-pagenum"></div></div>
                  <div id="pagetual-sideController-next" class="pagetual-sideController-btn">∨</div>
                </div>
                <div id="pagetual-sideController-bottom" class="pagetual-sideController-btn">⊻</div>
            `);
            frame.classList.add("stop");
            let top = frame.querySelector("#pagetual-sideController-top");
            let pre = frame.querySelector("#pagetual-sideController-pre");
            let move = frame.querySelector("#pagetual-sideController-move");
            let next = frame.querySelector("#pagetual-sideController-next");
            let bottom = frame.querySelector("#pagetual-sideController-bottom");
            let pagenum = frame.querySelector("#pagetual-sideController-pagenum");
            let scroll = frame.querySelector("#scroll");
            let loadNow = frame.querySelector("#loadNow");
            if (rulesData.sideControllerScroll === false) {
                scroll.style.display = "none";
            }
            if (rulesData.sideControllerLoadNow === false) {
                loadNow.style.display = "none";
            }
            if (sideControllerIcon) move.innerHTML = sideControllerIcon;

            frame.addEventListener("dblclick", e => {
                e.preventDefault();
                e.stopPropagation();
            });

            frame.addEventListener("mouseenter", e => {
                clearTimeout(self.hideTimer);
                frame.classList.remove("minSize");
            });

            frame.addEventListener("mouseleave", e => {
                clearTimeout(self.hideTimer);
                self.hideTimer = setTimeout(() => {
                    frame.classList.add("minSize");
                }, 800);
            });

            document.body.addEventListener('touchstart', e => {
                if (e.target === frame || frame.contains(e.target)) {
                    frame.classList.remove("minSize");
                } else {
                    frame.classList.add("minSize");
                }
            });

            scroll.addEventListener("click", e => {
                autoScroll = (autoScroll ? 0 : prompt(i18n("autoScrollRate"), autoScrollRate)) || 0;
                autoScroll = parseInt(autoScroll) || 0;
                if (autoScroll < 0) autoScroll = 0;
                if (autoScroll && autoScroll != autoScrollRate) {
                    autoScrollRate = autoScroll;
                    storage.setItem("autoScrollRate", autoScrollRate);
                }
                setListData("autoScroll", location.host + location.pathname, autoScroll);
                startAutoScroll();
            }, true);

            loadNow.addEventListener("click", e => {
                if (autoLoadNum != -1) {
                    autoLoadNum = -1;
                    return;
                }
                let loadNum = window.prompt(i18n("loadConfirm"), loadNowNum);
                if (loadNum === "" || loadNum === null) return;
                loadNum = Math.abs(parseInt(loadNum)) || 0;
                if (loadNowNum != loadNum) {
                    loadNowNum = loadNum;
                    storage.setItem("loadNowNum", loadNowNum);
                }
                autoLoadNum = loadNum;
                nextPage();
            }, true);

            pre.addEventListener("click", e => {
                let prePageBar = getPageBar().preBar;
                if (prePageBar) {
                    scrollToPageBar(prePageBar);
                } else {
                    let scrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
                    targetY = scrollTop - (window.innerHeight || document.documentElement.clientHeight);
                    window.scrollTo({ top: targetY, behavior: 'smooth'});
                }
            }, true);

            next.addEventListener("click", e => {
                let pageBarObj = getPageBar();
                let nextPageBar = pageBarObj.nextBar;
                if (nextPageBar) {
                    scrollToPageBar(nextPageBar);
                } else {
                    if (pageBarObj.preBar) {
                        let scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
                        targetY = scrollH || 9999999;
                        window.scrollTo({ top: targetY, behavior: 'smooth'});
                    } else {
                        let scrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
                        targetY = scrollTop + (window.innerHeight || document.documentElement.clientHeight);
                        window.scrollTo({ top: targetY, behavior: 'smooth'});
                    }
                }
            }, true);

            top.addEventListener("click", e => {
                getBody(document).scrollTop=0;
                document.documentElement.scrollTop=0;
                e.preventDefault();
                e.stopPropagation();
            }, true);

            bottom.addEventListener("click", e => {
                if (!e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    changeStop(true);
                }
                let scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
                getBody(document).scrollTop = scrollH || 9999999;
                document.documentElement.scrollTop = scrollH || 9999999;
                e.preventDefault();
                e.stopPropagation();
            }, true);

            let initX, initY, moving = false;
            let removeTimer;
            move.addEventListener("click", e => {
                if (!moving) {
                    changeStop(!isPause, true);
                }
            }, true);
            move.addEventListener("dblclick", e => {
                clearTimeout(removeTimer);
                document.removeEventListener("mousemove", mouseMoveHandler, true);
                document.removeEventListener("mouseup", mouseUpHandler, true);
                changeStop(!isPause, true);
                if (isPause) {
                    ruleParser.hideAddedElements();
                } else {
                    ruleParser.showAddedElements();
                }
            }, true);

            move.oncontextmenu = e => {
                e.preventDefault();
                picker.start();
            };

            let clientX = e => {
                if (e.type.indexOf('mouse') === 0) {
                    return e.clientX;
                } else {
                    return e.changedTouches[0].clientX;
                }
            };

            let clientY = e => {
                if (e.type.indexOf('mouse') === 0) {
                    return e.clientY;
                } else {
                    return e.changedTouches[0].clientY;
                }
            };

            let mouseMoveHandler = e => {
                if (moving) {
                    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
                    let windowWidth = window.innerWidth || document.documentElement.clientWidth;
                    initX = (clientX(e) - 10 + 40) / windowWidth * 100;
                    initY = (clientY(e) - 83 + 83) / windowHeight * 100;
                    this.frame.style.top = `calc(${initY}% - 83px)`;
                    this.frame.style.left = `calc(${initX}% - 40px)`;
                } else if (Math.abs(clientX(e) - initX) + Math.abs(clientY(e) - initY) > 5) {
                    moving = true;
                    clearTimeout(removeTimer);
                }
            };
            let mouseUpHandler = e => {
                clearTimeout(removeTimer);
                document.removeEventListener("mousemove", mouseMoveHandler, true);
                document.removeEventListener("mouseup", mouseUpHandler, true);
                document.removeEventListener("touchmove", mouseMoveHandler, true);
                document.removeEventListener("touchend", mouseUpHandler, true);
                if (moving) {
                    rulesData.sideControllerPos = {x: parseInt(initX), y: parseInt(initY)};
                    storage.setItem("rulesData", rulesData);
                }
            };
            let mouseDownHandler = e => {
                initX = clientX(e);
                initY = clientY(e);
                moving = false;
                clearTimeout(removeTimer);
                removeTimer = setTimeout(() => {
                    if (e.type === "touchstart") {
                        picker.start();
                    } else {
                        self.remove();
                    }
                }, 1500);
                document.addEventListener("mousemove", mouseMoveHandler, true);
                document.addEventListener("mouseup", mouseUpHandler, true);
                document.addEventListener("touchmove", mouseMoveHandler, true);
                document.addEventListener("touchend", mouseUpHandler, true);
                e.stopPropagation();
                e.preventDefault();
            };

            move.addEventListener("mousedown", mouseDownHandler, true);
            move.addEventListener("touchstart", mouseDownHandler, { passive: false, capture: true });

            this.frame = frame;
            this.pagenum = pagenum;
            if (rulesData.sideControllerPos) {
                this.frame.style.top = `calc(${rulesData.sideControllerPos.y}% - 83px)`;
                this.frame.style.left = `calc(${rulesData.sideControllerPos.x}% - 40px)`;
            }
        }

        addToStage() {
            this.init();
            if (!this.styleEle || !this.styleEle.parentNode) {
                this.styleEle = _GM_addStyle(this.cssText);
            }
            if (!isPause) {
                this.frame.classList.remove("stop");
            }
            this.pagenum.innerHTML = createHTML(curPage);
            this.frame.title = i18n("page") + curPage;
            if (this.frame.parentNode) return;
            getBody(document).appendChild(this.frame);
            clearTimeout(this.hideTimer);
            this.frame.classList.add("minSize");
        }

        remove() {
            if (this.frame && this.frame.parentNode) this.frame.parentNode.removeChild(this.frame);
        }
    }
    const sideController = new SideController();

    class NextSwitch {
        //static nextSwitch;
        constructor() {
            this.inited = false;
        }

        /*static getInstance() {
            if (!NextSwitch.nextSwitch) {
                NextSwitch.nextSwitch = new NextSwitch();
            }
            return NextSwitch.nextSwitch;
        }*/

        init() {
            if (this.inited) return;
            this.inited = true;
            let self = this;
            this.cssText = `
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
                    setListData("nextSwitch", location.host, nextIndex === 0 ? "" : nextIndex);
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
            this.init();
            if (!this.styleEle || !this.styleEle.parentNode) {
                this.styleEle = _GM_addStyle(this.cssText);
            }
            document.documentElement.appendChild(this.frame);
        }

        close() {
            if (this.frame.parentNode) this.frame.parentNode.removeChild(this.frame);
        }
    }
    const nextSwitch = new NextSwitch();

    class Picker {
        //static picker;
        constructor() {
            this.inited = false;
        }

        /*static getInstance() {
            if (!Picker.picker) {
                Picker.picker = new Picker();
            }
            return Picker.picker;
        }*/

        init() {
            if (this.inited) return;
            this.inited = true;
            let self = this;
            this.signList = [];
            this.cssText = `
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
              z-index: 2147483646;
              font-size: 16px;
              overflow: hidden;
              box-shadow: rgb(0 0 0) 0px 0px 10px;
             }
             #pagetual-picker * {
              margin: 0;
              padding: 0;
              font-family: Times New Roman;
              overflow: initial;
              user-select: none;
              line-height: unset;
              min-width: unset;
              min-height: unset;
             }
             #pagetual-picker>.title {
              margin: -5px 45px 10px 45px;
              font-size: 20px;
              font-weight: bold;
              cursor: pointer;
              border-bottom: 1px solid black;
              user-select: none;
              color: orangered;
              height: initial;
              width: initial;
              position: initial;
              transition: transform .3s ease;
             }
             #pagetual-picker>.title:hover {
              transform: scale(1.1);
             }
             #pagetual-picker button {
              background: none;
              border: none;
              vertical-align: top;
              transition: transform .15s ease-in-out;
              float: right;
              cursor: pointer;
              overflow: hidden;
              background-color: unset!important;
             }
             #pagetual-picker button:hover {
              transform: scale(1.2);
             }
             #pagetual-picker>.closePicker {
              position: absolute;
              top: 3px;
              right: 10px;
             }
             #pagetual-picker>.logoIcon {
              position: absolute;
              top: 3px;
              left: 10px;
             }
             #pagetual-picker>.logoIcon.showSign>svg>path {
              fill: gray!important;
             }
             #pagetual-picker textarea{
              display: inline-block;
              width: calc(100% - 65px);
              height: 20px;
              min-width: 250px;
              max-width: calc(65vw - 50px);
              min-height: unset;
              max-height: unset;
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
              margin-right: 5px;
              resize: both;
              box-shadow: 0 1px 5px 1px #ddd;
              overflow-wrap: anywhere;
             }
             #pagetual-picker textarea:focus {
              color: black;
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
              position: initial;
             }
             #pagetual-picker [type=checkbox]:after,
             #pagetual-picker [type=radio]:after,
             #pagetual-picker [type=checkbox]:before,
             #pagetual-picker [type=radio]:before {
              border: none;
              background: none;
             }
             #pagetual-picker label {
              font-size: 18px;
              line-height: 25px;
              vertical-align: middle;
              display: inline-block;
              color: black;
              position: initial;
              cursor: pointer;
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
             #pagetual-picker svg * {
              pointer-events: none;
             }
             #pagetual-picker .allpath {
              font-size: 18px;
              margin: 10px auto;
              max-width: 330px;
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
              opacity: 0.6;
             }
             #pagetual-picker .allpath>span.path:hover,
             #pagetual-picker .allpath>span.path.checked {
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
              color: black!important;
              text-align: center;
              font-size: large;
              margin-top: 10px;
              box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12);
              border-radius: 5px;
             }
             #pagetual-picker .command:hover {
              color: orangered;
             }
             #pagetual-picker #showDetail {
              float: initial;
              margin-top: 10px;
             }
             #pagetual-picker.showDetail #showDetail {
              float: right;
             }
             #pagetual-picker #showDetail>svg {
              -moz-transition:transform 0.3s ease;
              -webkit-transition:transform 0.3s ease;
              transition:transform 0.3 ease;
             }
             #pagetual-picker.showDetail #showDetail>svg {
              transform: rotate(180deg);
             }
             #pagetual-picker .tempRule {
              display: none;
              margin-top: 10px;
              height: 300px;
              min-height: 150px;
             }
             #pagetual-picker.showDetail .tempRule {
              display: inline-block;
              word-break: break-all;
             }
             #pagetual-picker #saveDetail {
              display: none;
              position: absolute;
              bottom: 10px;
              right: 8px;
             }
             #pagetual-picker.showDetail #saveDetail {
              display: inline-block;
             }
             #pagetual-picker #saveDetail svg {
              width: 35px;
              height: 35px;
             }
             #pagetual-picker .addProp {
              display: none;
              flex-direction: column;
              position: absolute;
              bottom: 45px;
              right: 12px;
             }
             #pagetual-picker.showDetail .addProp {
              display: flex;
             }
             #pagetual-picker .addProp>button {
              font-size: 30px;
              font-family: Arial,sans-serif;
              line-height: 35px;
              color: #161616;
             }
             #pagetual-picker #edit{
              -webkit-animation: jumpAnimation .6s 5;
              animation: jumpAnimation .6s 5;
             }
             @keyframes jumpAnimation {
              0% {
                transform: scale(1) translateY(0);
                animation-timing-function: ease-out;
              }
              50% {
                transform: scale(1.2) translateY(-5px);
                animation-timing-function: ease-in;
              }
              100% {
                transform: scale(1) translateY(0);
                animation-timing-function: ease-out;
              }
             }
             @-webkit-keyframes jumpAnimation {
              0% {
                -webkit-transform: scale(1) translateY(0);
                animation-timing-function: ease-out;
              }
              50% {
                -webkit-transform: scale(1.2) translateY(-5px);
                animation-timing-function: ease-in;
              }
              100% {
                -webkit-transform: scale(1) translateY(0);
                animation-timing-function: ease-out;
              }
             }
            `;
            this.mainSignDiv = this.createSignDiv();
            this.allSignDiv = [];
            let frame = document.createElement("div");
            frame.id = "pagetual-picker";
            frame.innerHTML = createHTML(`
                <button title="Pagetual" type="button" class="logoIcon">
                  <svg width="30" height="30" class="upSvg pagetual" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" style="fill: #604b4a;" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" style="fill: #604b4a;" fill="#604b4a"></path></svg>
                </button>
                <div class="title" title="${i18n("configure")}">${i18n("picker")}</div>
                <button title="${i18n("closePicker")}" type="button" class="closePicker">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 128c212 0 384 172 384 384s-172 384-384 384-384-172-384-384 172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m238.4 254.4l-45.6-45.6L512 467.2 318.4 273.6l-45.6 45.6L467.2 512 273.6 705.6l45.6 45.6L512 557.6l193.6 193.6 45.6-45.6L557.6 512l192.8-193.6z" style="fill: #604b4a;" fill="#604b4a"></path></svg>
                </button>
                <div class="allpath" title="${i18n("switchSelector")}"></div>
                <div>
                  <textarea class="selector" spellcheck="false" name="selector" placeholder="${i18n("pickerPlaceholder")}"></textarea>
                  <button id="check" title="${i18n("pickerCheck")}" type="button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z m0-85.333333c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667zM696.149333 298.666667L768 349.866667 471.594667 725.333333 256 571.733333l53.888-68.266666 143.744 102.4z" style="fill: #604b4a;" fill="#604b4a"></path></svg>
                  </button>
                </div>
                <div class="bottom">
                  <input name="xpath" id="checkbox_id" type="checkbox" />
                  <label for="checkbox_id">XPath</label>
                  <button id="edit" title="${i18n("gotoEdit")}" type="button">
                    <svg viewBox="0 0 1024 1024" style="color: orangered;fill: orangered;" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M775.84 392.768l-155.2-172.352L160.768 643.264l-38.368 187.936 190.56-12.832zM929.952 229.952l-131.2-150.944-0.288-0.32a16 16 0 0 0-22.592-0.96l-131.168 120.576 155.168 172.352 128.832-118.464a15.936 15.936 0 0 0 1.248-22.24zM96 896h832v64H96z">
                      </path>
                    </svg>
                  </button>
                </div>
                <div class="moreConfig">
                  <div title="${i18n('forceStateIframe')}">
                    <input name="forceState" id="forceStateIframe" type="radio" />
                    <label for="forceStateIframe">${i18n('iframe')}</label>
                  </div>
                  <div title="${i18n('forceStateDynamic')}">
                    <input name="forceState" id="forceStateDynamic" type="radio" />
                    <label for="forceStateDynamic">${i18n('dynamic')}</label>
                  </div>
                  <div title="${i18n('forceStateDisable')}">
                    <input name="forceState" id="forceStateDisable" type="radio" />
                    <label for="forceStateDisable">${i18n('disable')}</label>
                  </div>
                </div>
                <button id="nextSwitch" class="command" title="${i18n("nextSwitch")}" type="button">${i18n("nextSwitch")}</button>
                <button id="loadNow" class="command" title="${i18n("loadNow")}" type="button">${i18n("loadNow")}</button>
                <button id="autoScroll" class="command" title="${i18n("toggleAutoScroll")}" type="button"></button>
                <button id="ruleRequest" class="command" title="${i18n("ruleRequest")}" type="button">${i18n("ruleRequest")}</button>
                <div>
                  <textarea class="tempRule" spellcheck="false" placeholder="{Rule object}" title="Rule for current site"></textarea>
                  <button id="showDetail" title="" type="button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M511.1 63.7c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448z m281.2 374.5L535.6 694.9c-12.5 12.5-32.8 12.5-45.3 0l-255.8-256c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l210.7 210.7c12.5 12.5 32.8 12.5 45.3 0l211.4-211.4c12.5-12.5 32.8-12.5 45.3 0 12.3 12.5 12.3 32.8-0.2 45.3z" style="fill: orangered;" fill="orangered"></path></svg>
                  </button>
                  <div class="addProp">
                    <button id="addOtherProp" title="${i18n("addOtherProp")}" type="button">+</button>
                    <button id="addNextSelector" title="${i18n("addNextSelector")}" type="button">></button>
                    <button id="addPageSelector" title="${i18n("addPageSelector")}" type="button">❏</button>
                  </div>
                  <button id="saveDetail" title="${i18n("save")}" type="button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M704 128H192c-35.2 0-64 28.8-64 64v640c0 35.2 28.8 64 64 64h640c35.2 0 64-28.8 64-64V320L704 128zM256 256h320v128H256V256z m256 512c-70.4 0-128-57.6-128-128s57.6-128 128-128 128 57.6 128 128-57.6 128-128 128z" style="fill: orangered;" fill="orangered"></path></svg>
                  </button>
                </div>
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
                setListData("forceState", location.host, forceState);
                self.close();
                setTimeout(() => {
                    location.reload();
                }, 500);
            };
            forceStateIframe.parentNode.addEventListener("mousedown", clickRadio);
            forceStateDynamic.parentNode.addEventListener("mousedown", clickRadio);
            forceStateDisable.parentNode.addEventListener("mousedown", clickRadio);
            if (forceState == 1) forceStateDisable.checked = true;
            else if (forceState == 2) forceStateIframe.checked = true;
            else if (forceState == 3) forceStateDynamic.checked = true;
            let closeBtn = frame.querySelector(".closePicker");
            let logoBtn = frame.querySelector(".logoIcon");
            let title = frame.querySelector(".title");
            let allpath = frame.querySelector(".allpath");
            let selectorInput = frame.querySelector(".selector");
            let xpath = frame.querySelector("#checkbox_id");
            let checkBtn = frame.querySelector("#check");
            let editBtn = frame.querySelector("#edit");
            let nextSwitchBtn = frame.querySelector("#nextSwitch");
            let autoScrollBtn = frame.querySelector("#autoScroll");
            let loadNow = frame.querySelector("#loadNow");
            let tempRule = frame.querySelector(".tempRule");
            let showDetailBtn = frame.querySelector("#showDetail");
            let saveDetailBtn = frame.querySelector("#saveDetail");
            let addOtherProp = frame.querySelector("#addOtherProp");
            let addNextSelector = frame.querySelector("#addNextSelector");
            let addPageSelector = frame.querySelector("#addPageSelector");
            let ruleRequestBtn = frame.querySelector("#ruleRequest");
            ruleRequestBtn.addEventListener("click", e => {
                _GM_openInTab("https://github.com/hoothin/UserScripts/issues/new?labels=Pagetual&template=custom-rule-request.md&title=Request%20Pagetual%20support%20for%20" + location.hostname + "#" + location.href, {active: true});
            }, true);
            autoScrollBtn.addEventListener("click", e => {
                self.close();
                autoScroll = (autoScroll ? 0 : prompt(i18n("autoScrollRate"), autoScrollRate)) || 0;
                autoScroll = parseInt(autoScroll) || 0;
                if (autoScroll < 0) autoScroll = 0;
                if (autoScroll && autoScroll != autoScrollRate) {
                    autoScrollRate = autoScroll;
                    storage.setItem("autoScrollRate", autoScrollRate);
                }
                setListData("autoScroll", location.host + location.pathname, autoScroll);
                startAutoScroll();
            }, true);
            addOtherProp.addEventListener("click", e => {
                let propName = prompt(i18n("propName"), "author");
                if (!propName) return;
                let propValue = prompt(i18n("propValue"));
                if (!propValue) return;
                if (propValue === "true") propValue = true;
                else if (propValue === "false") propValue = false;
                else if (/^\d+$/.test(propValue)) propValue = parseInt(propValue);
                if (propName === "author" && propValue) {
                    author = propValue;
                    storage.setItem("author", propValue);
                }
                let editTemp = self.getTempRule();
                if (!editTemp) return;
                editTemp[propName] = propValue;
                self.tempRule.value = JSON.stringify(editTemp, null, 4);
            }, true);
            addNextSelector.addEventListener("click", e => {
                let editTemp = self.getTempRule();
                if (!editTemp) return;
                let selector = self.selectorInput.value;
                if (selector) {
                    editTemp.nextLink = selector;
                }
                self.tempRule.value = JSON.stringify(editTemp, null, 4);
            }, true);
            addPageSelector.addEventListener("click", e => {
                let editTemp = self.getTempRule();
                if (!editTemp) return;
                let selector = self.selectorInput.value;
                if (selector) {
                    editTemp.pageElement = selector;
                }
                self.tempRule.value = JSON.stringify(editTemp, null, 4);
            }, true);
            showDetailBtn.addEventListener("click", e => {
                frame.classList.toggle("showDetail");
            }, true);
            saveDetailBtn.addEventListener("click", e => {
                let editTemp = self.getTempRule(true);
                if (tempRule.value && !editTemp) {
                    return;
                }
                if(!ruleParser.customRules) {
                    ruleParser.customRules = [];
                }
                ruleParser.customRules = ruleParser.customRules.filter(item => {return item.url != editTemp.url || item.name != editTemp.name});
                if (tempRule.value) {
                    ruleParser.customRules.unshift(editTemp);
                    ruleParser.curSiteRule = editTemp;
                } else {
                    ruleParser.curSiteRule = {};
                    isPause = true;
                }
                storage.setItem("customRules", ruleParser.customRules);
                if (ruleParser.hpRules && ruleParser.curSiteRule && !ruleParser.curSiteRule.smart) {
                    ruleParser.addToHpRules(true);
                }
                if (window.confirm(i18n("reloadPage"))) {
                    setTimeout(() => {location.reload()}, 100);
                }
            }, true);
            nextSwitchBtn.addEventListener("click", e => {
                self.close();
                nextSwitch.start();
            }, true);
            loadNow.addEventListener("click", e => {
                self.close();
                let loadNum = window.prompt(i18n("loadConfirm"), "1");
                if (loadNum === "" || loadNum === null) return;
                autoLoadNum = Math.abs(parseInt(loadNum));
                nextPage();
            }, true);
            closeBtn.addEventListener("click", e => {
                self.close();
            }, true);
            this.showSign = true;
            logoBtn.addEventListener("click", e => {
                logoBtn.classList.toggle("showSign");
                self.showSign = !self.showSign;
                getBody(document).classList.toggle("pagetual-picker");
            }, true);
            let moving = false;
            let initX = 0, initY = 0, initPos = {x: 0, y: 0};
            let moveHanlder = e => {
                if (moving) {
                    frame.style.left = e.clientX - initX + "px";
                    frame.style.top = e.clientY - initY + "px";
                    e.stopPropagation();
                    e.preventDefault();
                } else if(Math.abs(e.clientX - initPos.x) + Math.abs(e.clientY - initPos.y) > 20) {
                    moving = true;
                }
            };
            let upHanlder = e => {
                if (moving) {
                    moving = false;
                } else {
                    _GM_openInTab(rulesData.configPage || configPage[0], {active: true});
                }
                document.removeEventListener("mousemove", moveHanlder, true);
                title.removeEventListener("mouseup", upHanlder, true);
                e.stopPropagation();
                e.preventDefault();
            };
            title.addEventListener("mousedown", e => {
                initPos = {x: e.clientX, y: e.clientY};
                initX = e.clientX - parseInt(getComputedStyle(frame).left);
                initY = e.clientY - parseInt(getComputedStyle(frame).top);
                document.addEventListener("mousemove", moveHanlder, true);
                title.addEventListener("mouseup", upHanlder, true);
            });
            frame.addEventListener("mouseenter", e => {
                if (!self.showSign || moving) return;
                if (self.mainSignDiv.parentNode) self.mainSignDiv.parentNode.removeChild(self.mainSignDiv);
                self.checkInputSelector(false);
            });
            frame.addEventListener("mouseleave", e => {
                if (!self.showSign) {
                    if (self.mainSignDiv.parentNode) self.mainSignDiv.parentNode.removeChild(self.mainSignDiv);
                    self.clearSigns();
                    return;
                }
                if (moving) return;
                document.documentElement.appendChild(self.mainSignDiv);
                self.clearSigns();
            });
            checkBtn.addEventListener("click", e => {
                self.checkInputSelector();
                if (this.selectorInput.value && self.foundEle) {
                    debug(self.foundEle);
                    self.foundEle[0].scrollIntoView({ behavior: "smooth" });
                    _GM_setClipboard(this.selectorInput.value);
                    showTips(i18n("copied"));
                } else showTips("Null");
            });
            xpath.addEventListener("click", e => {
                if (!selectorInput.value) {
                    self.setSelectorDiv("");
                    return;
                }
                let element = getElement(selectorInput.value, document);
                let selector = self.getSelectorFromEle(element);
                selectorInput.value = selector;
                self.setSelectorDiv(selector);
            });
            editBtn.addEventListener("click", e => {
                rulesData.editTemp = self.getTempRule();
                storage.setItem("rulesData", rulesData);
                _GM_openInTab(rulesData.configPage || configPage[0], {active: true});
            });
            editBtn.oncontextmenu = e => {
                e.preventDefault();
                _GM_openInTab(rulesData.configPage || configPage[0], {active: true});
            };
            this.frame = frame;
            this.xpath = xpath;
            this.allpath = allpath;
            this.selectorInput = selectorInput;
            this.nextSwitchBtn = nextSwitchBtn;
            this.autoScrollBtn = autoScrollBtn;
            this.loadNow = loadNow;
            this.tempRule = tempRule;
            this.logoBtn = logoBtn;
            let setTitleTimer;
            this.moveHandler = e => {
                if (!self.showSign || e.target === document) return;
                let target = self.getTarget(e.target);
                self.adjustSignDiv(self.mainSignDiv, target);
                clearTimeout(setTitleTimer);
                setTitleTimer = setTimeout(() => {
                    if (self.inPicker && target.hasAttributes()) {
                        let title = target.nodeName.toLowerCase() + "\n";
                        for (const attr of target.attributes) {
                            title += `【${attr.name}】${attr.value ? " ➡️ " + attr.value : ""}\n`;
                        }
                        getBody(document).title = title;
                    }
                }, 100);
            };
            this.clickHandler = e => {
                if (!self.showSign || !e.isTrusted) return;
                if (self.inPicker) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                let target = self.getTarget(e.target);
                let selector = self.getSelectorFromEle(target);
                selectorInput.value = selector;
                self.setSelectorDiv(selector);
            };
        }

        getTempRule(detail) {
            if (this.tempRule.value) {
                try {
                    this.editTemp = JSON.parse(this.tempRule.value);
                } catch (e) {
                    this.editTemp = null;
                    if (detail) {
                        let pos = e && e.message && e.message.match(/position (\d+)/);
                        if (pos) {
                            pos = parseInt(pos[1]);
                            this.tempRule.value = this.tempRule.value.slice(0, pos) + "➡️" + this.tempRule.value.slice(pos);
                        }
                        showTips(i18n("errorJson"));
                        return null;
                    }
                }
            }
            if (!this.editTemp) {
                if (ruleParser.curSiteRule.url && !ruleParser.curSiteRule.smart) {
                    this.editTemp = ruleParser.curSiteRule;
                } else {
                    this.editTemp = {
                        name: document.title,
                        url: "^" + (location.origin + location.pathname).replace(/[^\/]*$/, "").replace(/^https?/, "https?").replace(/\./g, "\\."),
                        example: location.href
                    };
                    if (author) this.editTemp.author = author;
                }
                delete this.editTemp.from;
                delete this.editTemp.type;
                delete this.editTemp.updatedAt;
            }
            if (this.selectorInput.value && (!this.frame.classList.contains("showDetail") || !this.editTemp || !this.editTemp.pageElement)) {
                if (this.foundEle && this.foundEle.length === 1) {
                    let foundEleRect = this.foundEle[0].getBoundingClientRect();
                    if (foundEleRect.height < 100) {
                        showTips("Next Link", "", 500);
                        this.editTemp.nextLink = this.selectorInput.value;
                        return this.editTemp;
                    }
                }
                showTips("Page Element", "", 500);
                this.editTemp.pageElement = this.selectorInput.value;
            }
            return this.editTemp;
        }

        getTarget(ele) {
            while (ele.parentNode && (ele.offsetWidth === 0 || ele.offsetHeight === 0)) {
                ele = ele.parentNode;
            }
            return ele;
        }

        close() {
            this.clearSigns();
            if (this.frame.parentNode) this.frame.parentNode.removeChild(this.frame);
            if (this.mainSignDiv.parentNode) this.mainSignDiv.parentNode.removeChild(this.mainSignDiv);
            getBody(document).classList.remove("pagetual-picker");
            getBody(document).removeEventListener("mousemove", this.moveHandler, true);
            getBody(document).removeEventListener("click", this.clickHandler, true);
            getBody(document).title = "";
            this.inPicker = false;
        }

        setImportant(ele, prop, value) {
            ele.style.setProperty(prop, value, "important");
        }

        createSignDiv() {
            let signDiv = document.createElement("div");
            this.setImportant(signDiv, "position", "absolute");
            this.setImportant(signDiv, "pointer-events", "none");
            this.setImportant(signDiv, "z-index", "2147483645");
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

        fillTempRuleTextarea() {
            if (!this.frame.classList.contains("showDetail") || !this.editTemp || !this.editTemp.pageElement) this.tempRule.value = JSON.stringify(this.getTempRule(), null, 4);
        }

        setSelectorDiv(selector) {
            let self = this;
            this.allpath.innerHTML = createHTML("");
            if (selector) {
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
            this.checkInputSelector();
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
                if (self.checkedPath) {
                    self.checkedPath.classList.remove("checked");
                }
                span.classList.add("checked");
                self.checkedPath = span;
            }, true);
            this.allpath.appendChild(span);
        }

        checkInputSelector(fill = true) {
            let self = this;
            this.clearSigns();
            if (!this.selectorInput.value) return;
            let eles = getAllElements(this.selectorInput.value, document);
            this.foundEle = null;
            if (eles && eles.length > 0) {
                this.foundEle = eles;
                eles.forEach(ele => {
                    let sign = self.createSignDiv();
                    document.documentElement.appendChild(sign);
                    self.adjustSignDiv(sign, ele);
                    self.signList.push(sign);
                });
                if (fill) this.fillTempRuleTextarea();
            }
        }

        clearSigns() {
            this.signList.forEach(sign => {
                if (sign.parentNode) sign.parentNode.removeChild(sign);
            });
            this.signList = [];
        }

        start() {
            this.init();
            if (this.inPicker) return;
            this.inPicker = true;
            if (!this.styleEle || !this.styleEle.parentNode) {
                this.styleEle = _GM_addStyle(this.cssText);
            }
            document.documentElement.appendChild(this.frame);
            document.documentElement.appendChild(this.mainSignDiv);
            getBody(document).classList.add("pagetual-picker");

            this.logoBtn.classList.remove("showSign");
            this.showSign = true;

            getBody(document).addEventListener("mousemove", this.moveHandler, true);
            getBody(document).addEventListener("click", this.clickHandler, true);
            this.xpath.checked = isXPath(ruleParser.curSiteRule.pageElement);
            this.tempRule.value = "";
            this.editTemp = null;
            this.frame.classList.remove("showDetail");

            this.loadNow.style.display = ruleParser.nextLinkHref ? "block" : "none";
            if (ruleParser.curSiteRule.nextLink && Array && Array.isArray && Array.isArray(ruleParser.curSiteRule.nextLink)) {
                this.nextSwitchBtn.style.display = "block";
            } else {
                this.nextSwitchBtn.style.display = "none";
            }
            this.autoScrollBtn.innerText = i18n(autoScroll ? "disableAutoScroll" : "enableAutoScroll");

            let pageElementSel = ruleParser.curSiteRule.pageElement || "";
            if (Array && Array.isArray && Array.isArray(pageElementSel)) {
                pageElementSel = pageElementSel[nextIndex < pageElementSel.length ? nextIndex : 0];
            }
            this.setSelectorDiv(pageElementSel);
            this.fillTempRuleTextarea();
        }
    }
    const picker = new Picker();

    var editor, editorChanged = false, customRulesInput;
    function createEdit() {
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
            },
            onChange: () => {
                editorChanged = true;
            }
        };
        setTimeout(() => {
            var container = document.getElementById("jsoneditor");
            if (!container) {
                container = document.createElement("div");
                configCon.appendChild(container);
            }
            container.style.height = '800px';
            container.innerHTML = "";
            try {
                editor = new _unsafeWindow.JSONEditor(container, options);
                editor.set(ruleParser.customRules);
            } catch (e) {
                editor = null;
                container.style.display = 'none';
                customRulesInput.style.display = "";
            }
        }, 500);
    }

    function checkGuidePage(href) {
        if (guidePage.test(href)) {
            if (typeof _unsafeWindow.JSONEditor !== 'undefined') {
                createEdit();
            } else {
                let timeout = 30;
                let checkEditorReady = setInterval(() => {
                    if (typeof _unsafeWindow.JSONEditor !== 'undefined') {
                        createEdit();
                        clearInterval(checkEditorReady);
                    } else if (timeout-- <= 0) {
                        editor = null;
                        customRulesInput.style.display = "";
                        clearInterval(checkEditorReady);
                    }
                }, 100);
            }
            return true;
        }
        return false;
    }

    function startAutoScroll() {
        clearInterval(autoScrollInterval);
        if (autoScroll <= 0) return;
        let scrollRange_o = 1;
        if (autoScroll > 1000) {
            scrollRange_o = parseInt(autoScroll / 1000);
        }
        let devicePixelRatio = window.devicePixelRatio;
        let scrollRange = Math.ceil(scrollRange_o / devicePixelRatio);

        let scrollTarget, body = getBody(document);
        let checkOverflow = ele => {
            return ele.scrollHeight !== ele.clientHeight && getComputedStyle(ele).overflowY !== "hidden";
        };
        if (document.documentElement.scrollTop || checkOverflow(document.documentElement)) {
            scrollTarget = document.documentElement;
        } else if (body.scrollTop || checkOverflow(body)) {
            scrollTarget = body;
        } else {
            let tempEle;
            let img = body.querySelector('img');
            if (img) {
                tempEle = img;
                while (tempEle && !checkOverflow(tempEle)) {
                    tempEle = tempEle.parentNode;
                }
            }
            if (!tempEle && document.activeElement) {
                let tempEle = document.activeElement;
                while (tempEle && !checkOverflow(tempEle)) {
                    tempEle = tempEle.parentNode;
                }
            }
            if (tempEle) scrollTarget = tempEle;
        }
        scrollTarget = scrollTarget || document.documentElement;

        autoScrollInterval = setInterval(() => {
            if (isPause && !urlChanging) return;
            if (devicePixelRatio !== window.devicePixelRatio) {
                devicePixelRatio = window.devicePixelRatio;
                scrollRange = Math.ceil(scrollRange_o / devicePixelRatio);
            }
            scrollTarget.scrollTop += scrollRange;
        }, parseInt(1000 / autoScroll));
    }

    var inUpdate = false;
    var importHandler, configCon;
    function initConfig(href) {
        if (location.hostname === "github.com") {
            if (location.href.indexOf("https://github.com/hoothin/UserScripts/issues/new?labels=Pagetual&template=custom-rule-request.md&title=Request%20Pagetual%20support%20for%20") === 0) {
                let issue_body = document.getElementById("issue_body");
                if (!issue_body) return true;
                issue_body.value = issue_body.value.replace("\n", "\n" + location.hash.slice(1) + "\n");
                let starButton = document.createElement("a");
                starButton.href = "https://github.com/hoothin/UserScripts#star";
                starButton.className = "js-toggler-target rounded-left-2 btn-with-aria-count btn-sm btn";
                starButton.innerHTML = createHTML('<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-star d-inline-block mr-2"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg><span class="d-inline">Star</span>');
                starButton.style.float = "right";
                document.querySelector(".Layout-main>h2").appendChild(starButton);
                return true;
            } else if (location.href === "https://github.com/hoothin/UserScripts#star") {
                let starButton = document.querySelector(".starring-container:not(.on)>.unstarred>form>button");
                if (starButton) emuClick(starButton);
                return true;
            }
        }
        let isGuidePage = checkGuidePage(href);

        var click2import, importUrlPres;

        let inConfig = isGuidePage;
        if (!inConfig) {
            for (let i = 0; i < configPage.length; i++) {
                if (configPage[i] == location.href) {
                    inConfig = true;
                    break;
                }
            }
        }
        if (!isGuidePage) {
            if (location.hostname === "hoothin.github.io" || location.hostname === "pagetual.hoothin.com") isGuidePage = true;
        }
        configCon = document.getElementById("configCon");
        if (configCon) {
            configCon.parentNode.removeChild(configCon);
        }
        if (ruleImportUrlReg.test(href) || inConfig) {
            let importing = false;
            if (!inUpdate && rulesData.uninited) {
                setTimeout(() => {
                    if (!inUpdate && !importing) showTips(i18n("firstAlert"));
                }, 3000);
                showTips(i18n("firstAlert"));
            }
            let defaultOption = document.querySelector('#discussion_rating_4');
            if (defaultOption) defaultOption.checked = true;
            let createImportBtn = (pre) => {
                let importBtn = document.createElement("button");
                importBtn.id = "pagetualImport";
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
                        let rules = parentNode.innerText.trim();
                        let isContent = /['"]name['"]/i.test(rules);
                        if (isContent) {
                            let ruleList = JSON.parse(`[${rules}]`);
                            for (let i in ruleList) {
                                let hasRule = false;
                                let r = ruleList[i];
                                for (let j in ruleParser.customRules) {
                                    if (ruleParser.customRules[j].name == r.name) {
                                        ruleParser.customRules[j] = r;
                                        hasRule = true;
                                        break;
                                    }
                                }
                                if (!hasRule) ruleParser.customRules.push(r);
                                ruleParser.hpRules.unshift(r);
                            }
                            storage.setItem("customRules", ruleParser.customRules);
                            storage.setItem("hpRules", ruleParser.hpRules);
                            storage.setItem("smartRules", []);
                            showTips(i18n("importSucc"));
                        } else {
                            rules = rules.split("\n");
                            let diff = false;
                            for (let c = 0; c < rules.length; c++) {
                                let urlArr = rules[c].split("|"), url, type = 1;
                                if (urlArr.length == 1) {
                                    url = urlArr[0].trim();
                                    if (!/^http/.test(url)) {
                                        showTips(i18n("errorWrongUrl"));
                                        return;
                                    }
                                } else if (urlArr.length == 2) {
                                    type = urlArr[0].trim();
                                    url = urlArr[1].trim();
                                    if (!/^http/.test(url)) {
                                        showTips(i18n("errorWrongUrl"));
                                        return;
                                    }
                                } else {
                                    break;
                                }
                                let maxId = 1, hasUrl = false;
                                if (!rulesData.urls) {
                                    rulesData.urls = [];
                                    maxId = 1;
                                } else {
                                    rulesData.urls.forEach(u => {
                                        if (maxId < u.id) {
                                            maxId = u.id;
                                        }
                                        if (u.url == url) {
                                            hasUrl = true;
                                        }
                                    });
                                    if (hasUrl) break;
                                }
                                diff = true;
                                if (!rulesData.sort) rulesData.sort = [1];
                                rulesData.urls.push({id: maxId + 1, url: url, type: type});
                                rulesData.sort.unshift(maxId + 1);
                            }
                            if (!diff) {
                                showTips(i18n("errorAlreadyExists"));
                                setTimeout(() => {
                                    showTips(i18n("beginUpdate"), "", 50000);
                                    updateRules(() => {
                                        showTips(i18n("updateSucc"));
                                        location.reload();
                                    }, (rule, err) => {
                                        showTips(`Failed to update ${rule.url} rules!`);
                                        debug(err);
                                    });
                                }, 500);
                                return;
                            }
                            storage.setItem("rulesData", rulesData);

                            if (rulesData.urls) ruleUrls = ruleUrls.concat(rulesData.urls);
                            if (rulesData.sort) {
                                let urls = [];
                                rulesData.sort.forEach(id => {
                                    for (let s = 0; s < ruleUrls.length; s++) {
                                        if (id == ruleUrls[s].id) {
                                            urls.push(ruleUrls[s]);
                                            break;
                                        }
                                    }
                                });
                                ruleUrls = urls;
                            }
                            showTips(i18n("beginUpdate"), "", 30000);
                            updateRules(() => {
                                showTips(i18n("updateSucc"));
                                location.reload();
                            }, (rule, err) => {
                                showTips(`Failed to update ${rule.url} rules!`);
                                debug(err);
                            });
                            importing = true;
                        }
                    } catch (e) {
                        _GM_notification(e.toString());
                    }
                });
                if (pre) {
                    let clientHeight = 35 - pre.clientHeight;
                    if (clientHeight > -20) clientHeight = -20;
                    importBtn.style.marginTop = `${clientHeight}px`;
                    pre.appendChild(importBtn);
                }
                return importBtn;
            };
            [].forEach.call(document.querySelectorAll('pre[name=pagetual],pre[name=user-content-pagetual]'), pre => {
                let importBtn = createImportBtn(pre);
                if (rulesData.uninited) {
                    pre.style.display = "";
                }
            });
            click2import = document.querySelector("[name='user-content-click2import'],[name='click2import']");
            if (click2import) {
                click2import.innerText = i18n("click2ImportRule");
                click2import.style.display = rulesData.uninited ? "block" : "none";
            }
            if (!importHandler) {
                importHandler = e => {
                    if (compareNodeName(e.target, ["pre"])) {
                        let nameAttr = e.target.getAttribute("name");
                        if (nameAttr == "pagetual" || nameAttr == "user-content-pagetual") {
                            if (e.target.querySelector('#pagetualImport')) return;
                            let importBtn = createImportBtn(e.target);
                        }
                    }
                };
            }
            document.removeEventListener("mouseover", importHandler);
            document.addEventListener("mouseover", importHandler);

            if (inConfig) {
                if (!inUpdate && _GM_info.script && _GM_info.script.version && _GM_info.script.version !== '1.0.0') {
                    let versionEle = document.querySelector('.markdown-body>h1[id],article>h1');
                    let latestVer = versionEle && versionEle.innerText.match(/\d[\d\.]+/)[0];
                    if (latestVer && latestVer != _GM_info.script.version) {
                        showTips(i18n('outOfDate'), "", 3000);
                    }
                }
                _GM_addStyle(`
                 p>span:nth-child(1),p>span:nth-child(2),p>span:nth-child(3){
                  cursor: pointer;
                  user-select: none;
                  display: inline-block;
                  margin-right: 5px;
                  -moz-transition:color 0.3s ease, transform 0.3s;
                  -webkit-transition:color 0.3s ease, transform 0.3s;
                  transition:color 0.3s ease, transform 0.3s;
                 }
                 p>span:nth-child(1):hover,p>span:nth-child(2):hover,p>span:nth-child(3):hover{
                  color:red;
                  transform: scale(1.5);
                  -webkit-transform: scale(1.5);
                 }
                 .updateDate{
                  cursor: pointer;
                  user-select: none;
                  -moz-transition:color 0.3s ease, transform 0.3s;
                  -webkit-transition:color 0.3s ease, transform 0.3s;
                  transition:color 0.3s ease, transform 0.3s;
                  transform-origin: left;
                  -webkit-transform-origin: left;
                 }
                 .updateDate:hover{
                  color:red;
                  transform: scale(1.1);
                  -webkit-transform: scale(1.1);
                 }
                 input[type=number]::-webkit-inner-spin-button,
                 input[type=number]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                 }
                 input[type=number] {
                  -moz-appearance:textfield;
                 }
                 table td>h3 {
                  margin: 16px!important;
                  padding: 0!important;
                 }
                 table td>h4 {
                  padding: 0!important;
                 }
                 #saveBtn {
                  width: 60vw;
                  position: fixed;
                  z-index: 999;
                  bottom: 0;
                  left: 20vw;
                  font-size: xx-large;
                  opacity: 0.6;
                  cursor: pointer;
                  -moz-transition:all 0.3s ease;
                  -webkit-transition:all 0.3s ease;
                  transition:all 0.3s ease;
                 }
                 #configCon #saveBtn:hover {
                  opacity: 1;
                  margin-bottom: 0px;
                 }
                 #configCon #saveBtn {
                  margin-bottom: -30px;
                 }
                 #configCon.showSave #saveBtn {
                  margin-bottom: 0px;
                 }
                `);
                configCon = document.querySelector(".markdown-body,.theme-default-content");
                if (!configCon) {
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                    return true;
                }
                let insertPos = configCon.querySelector("hr,#jsoneditor");
                configCon = document.createElement("div");
                configCon.id = "configCon";
                insertPos.parentNode.insertBefore(configCon, insertPos);

                importUrlPres = document.querySelectorAll("pre[name='user-content-pagetual'],pre[name='pagetual']");
                if (importUrlPres) {
                    [].forEach.call(importUrlPres, importUrlPre => {
                        importUrlPre.style.overflow = "hidden";
                        importUrlPre.style.display = rulesData.uninited ? "block" : "none";
                    });
                }
                let otherconfig = document.querySelector("a[name='user-content-otherconfig'],a[name='otherconfig']");
                if (otherconfig) otherconfig.parentNode.removeChild(otherconfig);
                let rulesExample = document.querySelector("#user-content-rules-example+a,#rules-example>a");
                if (rulesExample) {
                    rulesExample.innerText = i18n("rulesExample");
                    if (lang == "zh-CN") {
                        rulesExample.href = rulesExample.href.replace("en", "cn");
                    } else if (lang == "zh-TW" || lang == "zh-HK") {
                        rulesExample.href = rulesExample.href.replace("/en", "");
                    }
                }
                document.documentElement.scrollTop = 0;

                let newPos, lastPos = 0;
                window.addEventListener('scroll', function(e) {
                    newPos = window.scrollY;
                    if (newPos > lastPos) {
                        configCon.classList.add("showSave");
                    } else {
                        configCon.classList.remove("showSave");
                    }
                    lastPos = newPos;
                });
            } else return isGuidePage;
        } else return isGuidePage;
        let ruleBarInsertPos = document.createTextNode(' ');
        configCon.appendChild(ruleBarInsertPos);
        class Rulebar {
            init(ruleUrl) {
                let id = ruleUrl.id;
                this.ruleUrl = ruleUrl;
                this.item = document.createElement("p");
                this.item.dataset.id = id;
                let url = document.createElement("a");
                url.href = ruleUrl.url;
                url.innerHTML = ruleUrl.url;
                url.title = ruleUrl.url;
                let up = document.createElement("span");
                up.innerHTML = "↑ ";
                up.title = i18n("sortTitle");
                let down = document.createElement("span");
                down.innerHTML = "↓ ";
                down.title = i18n("sortTitle");
                let del = document.createElement("span");
                del.innerHTML = "× ";
                up.onclick = e => {
                    this.moveUp();
                };
                down.onclick = e => {
                    this.moveDown();
                };
                del.onclick = e => {
                    this.del();
                };
                this.item.appendChild(up);
                this.item.appendChild(down);
                this.item.appendChild(del);
                this.item.appendChild(url);
                if (ruleParser.rules) {
                    url.style.maxWidth = "calc(100% - 150px)";
                    url.style.overflow = "hidden";
                    url.style.display = "inline-block";
                    url.style.textOverflow = "ellipsis";
                    url.style.verticalAlign = "bottom";
                    url.style.whiteSpace = "nowrap";
                    let rulesLength = ruleParser.rules.reduce((acc, cur) => acc + (cur.from == id ? 1 : 0), 0);
                    let idSpan = document.createElement("span");
                    idSpan.style.float = "right";
                    idSpan.innerHTML = `[rules: ${rulesLength}]`;
                    this.item.appendChild(idSpan);
                    this.idSpan = idSpan;
                }
                configCon.insertBefore(this.item, ruleBarInsertPos);
            }
            updateNum() {
                if (ruleParser.rules) {
                    let rulesLength = ruleParser.rules.reduce((acc, cur) => acc + (cur.from == this.item.dataset.id ? 1 : 0), 0);
                    this.idSpan.innerHTML = `[rules: ${rulesLength}]`;
                }
            }
            saveSort() {
                let sort = [];
                [].forEach.call(this.item.parentNode.querySelectorAll("p[data-id]"), i => {
                    sort.push(i.dataset.id);
                });
                rulesData.sort = sort;
                let urls = [];
                sort.forEach(id => {
                    for (let s = 0; s < ruleUrls.length; s++) {
                        if (id == ruleUrls[s].id) {
                            urls.push(ruleUrls[s]);
                            break;
                        }
                    }
                });
                ruleUrls = urls;
                storage.setItem("rulesData", rulesData);
                showTips(i18n("sortTitle"));
            }
            moveUp() {
                let preE = this.item.previousElementSibling;
                if (compareNodeName(preE, ["p"]) && preE.children.length > 1) {
                    this.item.parentNode.insertBefore(this.item, preE);
                    this.saveSort();
                }
            }
            moveDown() {
                let nextE = this.item.nextElementSibling;
                if (compareNodeName(nextE, ["p"]) && nextE.children.length > 1) {
                    this.item.parentNode.insertBefore(nextE, this.item);
                    this.saveSort();
                }
            }
            del() {
                if (this.ruleUrl.id < 2) {
                    showTips(i18n("cantDel"));
                } else if (window.confirm(i18n("confirmDel"))) {
                    for (let u = 0; u < rulesData.urls.length; u++) {
                        if (this.ruleUrl.id == rulesData.urls[u].id) {
                            rulesData.urls.splice(u, 1);
                            break;
                        }
                    }
                    for (let u = 0; u < ruleUrls.length; u++) {
                        if (this.ruleUrl.id == ruleUrls[u].id) {
                            ruleUrls.splice(u, 1);
                            break;
                        }
                    }
                    for (let u = 0; u < rulesData.sort.length; u++) {
                        if (this.ruleUrl.id == rulesData.sort[u]) {
                            rulesData.sort.splice(u, 1);
                            break;
                        }
                    }
                    rulesData.ruleVersion = 0;
                    storage.setItem("rulesData", rulesData);
                    ruleParser.rules = ruleParser.rules.filter(item => {return item.from != this.ruleUrl.id});
                    storage.setItem("rules", ruleParser.rules);
                    this.item.parentNode.removeChild(this.item);
                    //location.reload();
                }
            }
        }
        let langSelect = document.createElement("select");
        langSelect.style.float = "right";
        langSelect.style.position = "relative";
        langSelect.style.zIndex = "1";
        let option = document.createElement("option");
        option.value = "";
        option.innerText = "Language";
        langSelect.appendChild(option);
        for (let key in langList) {
            let option = document.createElement("option");
            option.value = key;
            option.innerText = langList[key];
            langSelect.appendChild(option);
        }
        langSelect.value = rulesData.lang || "";
        configCon.appendChild(langSelect);

        let updateP = document.createElement("p"), i = 0;
        let now = new Date().getTime();


        let pastDate = (new Date(updateDate)).toString(), passStr;
        let passTime = (now - updateDate) / 1000;
        if (isNaN(passTime)) {
            passStr = i18n("firstUpdate");
        } else {
            if (passTime < 60) {
                passStr = i18n("passSec", parseInt(passTime));
            } else if (passTime < 60 * 60) {
                passStr = i18n("passMin", parseInt(passTime / 60));
            } else if (passTime < 60 * 60 * 24) {
                passStr = i18n("passHour", parseInt(passTime / 3600));
            } else {
                passStr = i18n("passDay", parseInt(passTime / 86400));
            }
            passStr += " 🖱 " + i18n("click2update");
        }

        let rulebarList = [], updateFail = false;
        updateP.className = "updateDate";
        updateP.innerHTML = passStr;
        updateP.title = i18n("update") + " - " + pastDate;
        configCon.appendChild(updateP);
        if (ruleUrls) {
            ruleUrls.forEach(ruleUrl => {
                let rulebar = new Rulebar();
                rulebar.init(ruleUrl);
                rulebarList.push(rulebar);
            });
        }
        let customUrlsTitle = document.createElement("h2");
        customUrlsTitle.innerHTML = i18n("customUrls");
        configCon.appendChild(customUrlsTitle);
        let customUrlsInput = document.createElement("textarea");
        customUrlsInput.style.width = "100%";
        customUrlsInput.style.position = "relative";
        customUrlsInput.placeholder = "http://wedata.net/databases/AutoPagerize/items_all.json \nhttps://hoothin.github.io/UserScripts/Pagetual/pagetualRules.json";
        customUrlsInput.spellcheck = false;
        configCon.appendChild(customUrlsInput);

        let btns = document.createElement("div");
        btns.style.display = "flex";
        configCon.appendChild(btns);
        let upBtnImg = document.createElement("div");
        upBtnImg.style.width = "33%";
        let upBtnImgTitle = document.createElement("h2");
        upBtnImgTitle.style.whiteSpace = "nowrap";
        upBtnImgTitle.style.overflow = "auto";
        upBtnImgTitle.innerHTML = i18n("upBtnImg");
        upBtnImg.appendChild(upBtnImgTitle);
        let upBtnImgInput = document.createElement("input");
        upBtnImgInput.style.width = "100%";
        upBtnImgInput.style.position = "relative";
        upBtnImgInput.placeholder = "data:image/png;base64,UpBtn";
        upBtnImgInput.value = rulesData.upBtnImg || '';
        upBtnImgInput.spellcheck = false;
        upBtnImg.appendChild(upBtnImgInput);
        btns.appendChild(upBtnImg);

        let downBtnImg = document.createElement("div");
        downBtnImg.style.width = "33%";
        let downBtnImgTitle = document.createElement("h2");
        downBtnImgTitle.style.whiteSpace = "nowrap";
        downBtnImgTitle.style.overflow = "auto";
        downBtnImgTitle.innerHTML = i18n("downBtnImg");
        downBtnImg.appendChild(downBtnImgTitle);
        let downBtnImgInput = document.createElement("input");
        downBtnImgInput.style.width = "100%";
        downBtnImgInput.style.position = "relative";
        downBtnImgInput.placeholder = "data:image/png;base64,DownBtn";
        downBtnImgInput.value = rulesData.downBtnImg || '';
        downBtnImgInput.spellcheck = false;
        downBtnImg.appendChild(downBtnImgInput);
        btns.appendChild(downBtnImg);

        let sideControllerIconDiv = document.createElement("div");
        sideControllerIconDiv.style.width = "33%";
        let sideControllerIconTitle = document.createElement("h2");
        sideControllerIconTitle.style.whiteSpace = "nowrap";
        sideControllerIconTitle.style.overflow = "auto";
        sideControllerIconTitle.innerHTML = i18n("sideControllerIcon");
        sideControllerIconDiv.appendChild(sideControllerIconTitle);
        let sideControllerIconInput = document.createElement("input");
        sideControllerIconInput.style.width = "100%";
        sideControllerIconInput.style.position = "relative";
        sideControllerIconInput.placeholder = "📄";
        sideControllerIconInput.value = rulesData.sideControllerIcon || '';
        sideControllerIconInput.spellcheck = false;
        sideControllerIconDiv.appendChild(sideControllerIconInput);
        btns.appendChild(sideControllerIconDiv);

        let otherBtns = document.createElement("div");
        otherBtns.style.display = "flex";
        configCon.appendChild(otherBtns);
        let loadingText = document.createElement("div");
        loadingText.style.width = "100%";
        let loadingTextTitle = document.createElement("h2");
        loadingTextTitle.style.whiteSpace = "nowrap";
        loadingTextTitle.style.overflow = "auto";
        loadingTextTitle.innerHTML = i18n("loadingTextTitle");
        loadingText.appendChild(loadingTextTitle);
        let loadingTextInput = document.createElement("input");
        loadingTextInput.value = rulesData.loadingText || '';
        loadingTextInput.placeholder = i18n("loadingText");
        loadingTextInput.style.width = "100%";
        loadingTextInput.style.position = "relative";
        loadingTextInput.style.margin = "0";
        loadingTextInput.spellcheck = false;
        loadingText.appendChild(loadingTextInput);
        otherBtns.appendChild(loadingText);

        let opacity = document.createElement("div");
        let opacityTitle = document.createElement("h2");
        opacityTitle.style.whiteSpace = "nowrap";
        opacityTitle.style.overflow = "visible";
        opacityTitle.innerHTML = i18n("opacity");
        opacity.appendChild(opacityTitle);
        let opacityInput = document.createElement("input");
        opacityInput.value = rulesData.opacity * 100;
        opacityInput.type = "number";
        opacityInput.min = 0;
        opacityInput.max = 100;
        opacityInput.style.width = "110px";
        opacityInput.style.position = "relative";
        opacityInput.style.margin = "0";
        opacityInput.placeholder = i18n("opacityPlaceholder");
        opacityInput.spellcheck = false;
        opacityInput.oninput = e => {
            if (opacityInput.value > 100) opacityInput.value = 100;
            else if (opacityInput.value < 0) opacityInput.value = 0;
        };
        opacity.appendChild(opacityInput);
        otherBtns.appendChild(opacity);

        let pageElementCss = document.createElement("div");
        pageElementCss.style.marginBottom = "30px";
        let pageElementCssTitle = document.createElement("h2");
        pageElementCssTitle.innerHTML = i18n("pageElementCss");
        pageElementCss.appendChild(pageElementCssTitle);
        let pageElementCssInput = document.createElement("input");
        pageElementCssInput.value = rulesData.pageElementCss || '';
        pageElementCssInput.style.width = "100%";
        pageElementCssInput.style.position = "relative";
        pageElementCssInput.style.margin = "0";
        pageElementCssInput.placeholder = "font-size: xx-large;";
        pageElementCssInput.spellcheck = false;
        pageElementCss.appendChild(pageElementCssInput);
        configCon.appendChild(pageElementCss);

        let customCss = document.createElement("div");
        customCss.style.marginBottom = "50px";
        let customCssTitle = document.createElement("h2");
        customCssTitle.innerHTML = i18n("customCss");
        customCss.appendChild(customCssTitle);
        let customCssInput = document.createElement("textarea");
        customCssInput.value = rulesData.customCss || '';
        customCssInput.style.width = "100%";
        customCssInput.style.position = "relative";
        customCssInput.style.margin = "0";
        customCssInput.placeholder = ".pagetual {\n}";
        customCssInput.spellcheck = false;
        customCss.appendChild(customCssInput);
        configCon.appendChild(customCss);

        let configTable = document.createElement("table");
        configTable.style.width = "100%";
        let configTbody = document.createElement("tbody");
        configTbody.style.width = "99%";
        configTbody.style.display = "inline-table";
        configTable.appendChild(configTbody);
        configCon.appendChild(configTable);
        function createCheckbox(innerText, val, tag, parentCheck, otherType, alwaysShow) {
            if (typeof val == 'undefined') val = "";
            let title = document.createElement(tag || "h3");
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
            input.style.width = "35px";
            input.style.height = "20px";
            input.style.float = "left";
            input.style.margin = "0 2px";
            input.value = val;
            input.checked = val;
            let td = document.createElement("td");
            td.appendChild(input);
            if (parentCheck) {
                title.appendChild(input);
                title.style.margin = "0";
                td.appendChild(title);
                let parent = parentCheck.parentNode.nextElementSibling;
                let tr = parent.querySelector("tr");
                if (!tr) {
                    tr = document.createElement("tr");
                    parent.appendChild(tr);
                }
                tr.appendChild(td);
                if (!alwaysShow) {
                    if (!parentCheck.checked) {
                        td.style.display = "none";
                    }
                    parentCheck.addEventListener("click", e => {
                        td.style.display = parentCheck.checked ? "" : "none";
                    });
                }
            } else {
                let tr = document.createElement("tr");
                tr.appendChild(td);
                td = document.createElement("td");
                td.appendChild(title);
                tr.appendChild(td);
                configTable.children[0].appendChild(tr);
            }
            let xNodePos = innerText.indexOf('【X】');
            if (xNodePos !== -1) {
                input.style.float = "";
                let xNode = title.firstChild.splitText(xNodePos);
                xNode.splitText(3);
                xNode.parentNode.replaceChild(input, xNode);
            }
            return input;
        }

        let setConfigPageInput = createCheckbox(i18n("setConfigPage"), false);
        let enableWhiteListInput = createCheckbox(i18n("autoRun"), rulesData.enableWhiteList != true);
        let sideControllerInput = createCheckbox(i18n("sideController"), rulesData.sideController);
        let sideControllerAlwaysInput = createCheckbox(i18n("sideControllerAlways"), rulesData.sideControllerAlways, "h4", sideControllerInput);
        let sideControllerScrollInput = createCheckbox(i18n("sideControllerScroll"), rulesData.sideControllerScroll !== false, "h4", sideControllerInput);
        let sideControllerLoadNowInput = createCheckbox(i18n("loadNow"), rulesData.sideControllerLoadNow !== false, "h4", sideControllerInput);
        let enableDebugInput = createCheckbox(i18n("enableDebug"), rulesData.enableDebug != false);
        let enableHistoryInput = createCheckbox(i18n("enableHistory"), rulesData.enableHistory === true);
        let enableHistoryAfterInsertInput = createCheckbox(i18n("enableHistoryAfterInsert"), rulesData.enableHistoryAfterInsert === true, "h4", enableHistoryInput);
        let openInNewTabInput = createCheckbox(i18n("openInNewTab"), rulesData.openInNewTab != false);
        let hidePageBarInput = createCheckbox(i18n("hideBarTips"), rulesData.opacity == 0);
        let hidePageBarArrowInput = createCheckbox(i18n("hideBarArrow"), rulesData.hideBarArrow);
        let hideLoadingIconInput = createCheckbox(i18n("hideLoadingIcon"), rulesData.hideLoadingIcon != false);
        let initRunInput = createCheckbox(i18n("initRun"), rulesData.initRun != false);
        let autoLoadNumInput = createCheckbox(i18n("autoLoadNum"), rulesData.autoLoadNum, "h4", initRunInput, "number");
        let preloadInput = createCheckbox(i18n("preload"), rulesData.preload != false);
        let rateInput = createCheckbox(i18n("turnRate"), rulesData.rate, "h4", preloadInput, "number", true);
        let dbClick2StopInput = createCheckbox(i18n("dbClick2Stop"), rulesData.dbClick2Stop);
        let manualModeInput = createCheckbox(i18n("manualMode"), rulesData.manualMode);
        let clickModeInput = createCheckbox(i18n("clickMode"), rulesData.clickMode);
        let pageBarMenuInput = createCheckbox(i18n("pageBarMenu"), rulesData.pageBarMenu != false);
        let arrowToScrollInput = createCheckbox(i18n("arrowToScroll"), rulesData.arrowToScroll);
        let contentVisibilityInput = createCheckbox(i18n("contentVisibility"), rulesData.contentVisibility);
        let wedata2githubInput = createCheckbox(i18n("wedata2github"), rulesData.wedata2github);
        let customFirstInput = createCheckbox(i18n("customFirst"), rulesData.customFirst);
        let lastPageTipsInput = createCheckbox(i18n("lastPageTips"), rulesData.lastPageTips);
        let updateNotificationInput = createCheckbox(i18n("updateNotification"), rulesData.updateNotification != false);

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
        hidePageBarInput.addEventListener('click', e => {
            opacityInput.value = hidePageBarInput.checked ? 0 : 100;
        });

        let dbClick2StopCtrlInput = createCheckbox(i18n("dbClick2StopCtrl"), rulesData.dbClick2StopCtrl, "h4", dbClick2StopInput);
        let dbClick2StopAltInput = createCheckbox(i18n("dbClick2StopAlt"), rulesData.dbClick2StopAlt, "h4", dbClick2StopInput);
        let dbClick2StopShiftInput = createCheckbox(i18n("dbClick2StopShift"), rulesData.dbClick2StopShift, "h4", dbClick2StopInput);
        let dbClick2StopMetaInput = createCheckbox(i18n("dbClick2StopMeta"), rulesData.dbClick2StopMeta, "h4", dbClick2StopInput);
        let dbClick2StopKeyInput = createCheckbox(i18n("dbClick2StopKey"), rulesData.dbClick2StopKey, "h4", dbClick2StopInput, "key");

        let otherConfigPage = (rulesData.configPage || configPage[0]) != location.href.replace(/#.*/, "");
        if (!otherConfigPage) {
            setConfigPageInput.parentNode.parentNode.style.display = "none";
        }

        updateP.onclick = e => {
            updateFail = false;
            //ruleParser.rules = [];
            showTips(i18n("beginUpdate"), "", 30000);
            updateRules(() => {
                if (!updateFail) {
                    showTips(i18n("updateSucc"));
                    if (importUrlPres) {
                        [].forEach.call(importUrlPres, importUrlPre => {
                            importUrlPre.style.display = "none";
                        });
                    }
                    if (click2import) click2import.style.display = "none";
                }
                updateP.innerHTML = i18n("passSec", 0);
                updateP.title = i18n("update");
                rulebarList.forEach(rulebar => {
                    rulebar.updateNum();
                });
            }, (rule, err) => {
                if (rule.id == 1) {
                    showTips(`Failed to update wedata rules! Try to switch to wedata mirror!`);
                    wedata2githubInput.scrollIntoView({ behavior: "smooth" });
                } else {
                    showTips(`Failed to update ${rule.url} rules!`);
                }
                debug(err);
                updateFail = true;
            });
        };
        let customRulesTitle = document.createElement("h2");
        customRulesTitle.innerHTML = i18n("customRules", /tree/.test(location.href) ? location.href.replace('tree', 'edit').replace(/\/$/, '') + '/pagetualRules.json' : 'https://github.com/hoothin/UserScripts/edit/master/Pagetual/pagetualRules.json');
        configCon.appendChild(customRulesTitle);
        customRulesInput = document.createElement("textarea");
        customRulesInput.spellcheck = false;
        configCon.appendChild(customRulesInput);
        if (rulesData.editTemp) {
            if (!ruleParser.customRules) {
                ruleParser.customRules = [];
            }
            for (let i in ruleParser.customRules) {
                if (ruleParser.customRules[i].url == rulesData.editTemp.url) {
                    ruleParser.customRules.splice(i, 1);
                    break;
                }
            }
            ruleParser.customRules.unshift(rulesData.editTemp);
            rulesData.editTemp = null;
            storage.setItem("rulesData", rulesData);
            customRulesInput.previousElementSibling.scrollIntoView();
        }
        customRulesInput.style.width = "100%";
        customRulesInput.style.height = "800px";
        customRulesInput.placeholder = `[\n  {\n    "name":"yande",\n    "action":"0",\n    "url":"^https:\/\/yande\\.re\/",\n    "pageElement":"ul#post-list-posts>li",\n    "nextLink":"a.next_page",\n    "css":".javascript-hide {display: inline-block !important;}"\n  },\n  {\n    "name":"tieba",\n    "action":"1",\n    "url":"^https:\/\/tieba\\.baidu.com\/f\\?kw=",\n    "pageElement":"ul#thread_list>li",\n    "nextLink":".next.pagination-item "\n  }\n]`;
        let preCustom = getFormatJSON(ruleParser.customRules);
        customRulesInput.value = preCustom;
        if (isGuidePage) customRulesInput.style.display = "none";
        let blacklistInput = document.createElement("textarea");
        blacklistInput.style.width = "100%";
        blacklistInput.style.height = "500px";
        blacklistInput.style.display = "none";
        blacklistInput.spellcheck = false;
        blacklistInput.placeholder = "http://*.xxx.com/*/y\n/^https?://.*\\.xxx\\.com/i \t\t<= Regexp\n//http://*.aaa.com/ \t\t<= Disable\n/*http://*.bbb.com\nhttp://*.ccc.com*/ \t\t<= Block comment";
        blacklistInput.value = rulesData.blacklist ? rulesData.blacklist.join("\n") : "";
        let blacklistBtn = document.createElement("button");
        blacklistBtn.innerText = i18n("editBlacklist");
        blacklistBtn.style.width = "100%";
        blacklistBtn.onclick = e => {
            blacklistInput.style.display = blacklistInput.style.display == "none" ? "" : "none";
        };
        configCon.appendChild(blacklistBtn);
        configCon.appendChild(blacklistInput);
        let saveBtn = document.createElement("button");
        saveBtn.innerHTML = i18n("save");
        saveBtn.id = "saveBtn";
        configCon.appendChild(saveBtn);
        saveBtn.onclick = e => {
            try {
                let customRules;
                if (editor) {
                    if (editorChanged) {
                        editorChanged = false;
                        storage.setItem("hpRules", []);
                        storage.setItem("smartRules", []);
                    }
                    customRules = editor.get();
                    if (!customRules) {
                        customRules = "";
                    } else {
                        if (Array && Array.isArray && !Array.isArray(customRules)) {
                            showTips(i18n("errorRulesMustBeArray"));
                            return;
                        }
                    }
                } else {
                    if (customRulesInput.value != preCustom) {
                        storage.setItem("hpRules", []);
                        storage.setItem("smartRules", []);
                    }
                    if (customRulesInput.value == "") {
                        customRules = "";
                    } else {
                        customRules = JSON.parse(customRulesInput.value);
                        if (Array && Array.isArray && !Array.isArray(customRules)) {
                            showTips(i18n("errorRulesMustBeArray"));
                            return;
                        }
                        customRulesInput.value = JSON.stringify(customRules, null, 4);
                    }
                }
                debug(customRules);
                storage.setItem("customRules", customRules);
            } catch(e) {
                debug(e);
                let pos = e && e.message && e.message.match(/position (\d+)/);
                if (pos && !editor) {
                    pos = parseInt(pos[1]);
                    customRulesInput.value = customRulesInput.value.slice(0, pos) + "➡️" + customRulesInput.value.slice(pos);
                }
                showTips(i18n("errorJson"));
                return;
            }
            rulesData.lang = langSelect.value || "";
            if (setConfigPageInput.checked) rulesData.configPage = location.href;
            rulesData.wedata2github = wedata2githubInput.checked;
            let opacity = parseInt(opacityInput.value) || 0;
            if (opacity > 100) opacity = 100;
            else if (opacity < 0) opacity = 0;
            rulesData.opacity = opacity / 100;
            rulesData.blacklist = blacklistInput.value ? blacklistInput.value.trim().split("\n") : "";
            rulesData.hideBar = hideBarInput.checked;
            rulesData.hideBarButNoStop = hideBarButNoStopInput.checked;
            rulesData.dbClick2Stop = dbClick2StopInput.checked;
            rulesData.enableWhiteList = !enableWhiteListInput.checked;
            rulesData.enableDebug = enableDebugInput.checked;
            rulesData.updateNotification = updateNotificationInput.checked;
            rulesData.enableHistory = enableHistoryInput.checked;
            rulesData.enableHistoryAfterInsert = enableHistoryAfterInsertInput.checked;
            rulesData.openInNewTab = openInNewTabInput.checked;
            rulesData.hideLoadingIcon = hideLoadingIconInput.checked;
            rulesData.hideBarArrow = hidePageBarArrowInput.checked;
            rulesData.customFirst = customFirstInput.checked;
            rulesData.lastPageTips = lastPageTipsInput.checked;
            rulesData.initRun = initRunInput.checked;
            rulesData.autoLoadNum = autoLoadNumInput.value !== "0" ? autoLoadNumInput.value : '';
            rulesData.rate = parseFloat(rateInput.value) || 0;
            rulesData.preload = preloadInput.checked;
            rulesData.manualMode = manualModeInput.checked;
            rulesData.clickMode = clickModeInput.checked;
            rulesData.pageBarMenu = pageBarMenuInput.checked;
            rulesData.arrowToScroll = arrowToScrollInput.checked;
            rulesData.contentVisibility = contentVisibilityInput.checked;
            if (rulesData.sideController != sideControllerInput.checked) {
                rulesData.sideControllerPos = false;
            }
            rulesData.sideController = sideControllerInput.checked;
            rulesData.sideControllerScroll = sideControllerScrollInput.checked;
            rulesData.sideControllerLoadNow = sideControllerLoadNowInput.checked;
            rulesData.sideControllerAlways = sideControllerAlwaysInput.checked;
            rulesData.pageElementCss = pageElementCssInput.value;
            rulesData.customCss = customCssInput.value;
            rulesData.upBtnImg = upBtnImgInput.value;
            rulesData.downBtnImg = downBtnImgInput.value;
            rulesData.sideControllerIcon = sideControllerIconInput.value;
            rulesData.loadingText = loadingTextInput.value;
            rulesData.dbClick2StopCtrl = dbClick2StopCtrlInput.checked;
            rulesData.dbClick2StopAlt = dbClick2StopAltInput.checked;
            rulesData.dbClick2StopShift = dbClick2StopShiftInput.checked;
            rulesData.dbClick2StopMeta = dbClick2StopMetaInput.checked;
            rulesData.dbClick2StopKey = dbClick2StopKeyInput.value;
            storage.setItem("rulesData", rulesData);
            let customUrls = customUrlsInput.value.trim(), urlImported = false;
            if (customUrls) {
                customUrls = customUrls.split(/\n/);
                for (let c = 0; c < customUrls.length; c++) {
                    let url;
                    if (/^0\s*\|/.test(customUrls[c])) {
                        url = customUrls[c].replace(/^0\s*\|\s*/, "").trim();
                        if (!/^http/.test(url)) {
                            showTips(i18n("errorWrongUrl"));
                            return;
                        }
                    } else {
                        url = customUrls[c].trim();
                        if (!/^http/.test(url)) {
                            showTips(i18n("errorWrongUrl"));
                            return;
                        }
                    }
                    let maxId = 1, hasUrl = false;
                    if (!rulesData.urls) {
                        rulesData.urls = [];
                    }
                    ruleUrls.forEach(u => {
                        if (maxId < u.id) {
                            maxId = u.id;
                        }
                        if (u.url == url) {
                            hasUrl = true;
                        }
                    });
                    if (hasUrl) break;
                    if (!rulesData.sort) rulesData.sort = [1];
                    let newRule = {id: maxId + 1, url: url};
                    ruleUrls.push(newRule);
                    rulesData.urls.push(newRule);
                    rulesData.sort.push(maxId + 1);
                    storage.setItem("rulesData", rulesData);
                    let rulebar = new Rulebar();
                    rulebar.init(newRule);
                    rulebarList.push(rulebar);
                }
            }
            showTips(i18n("settingsSaved"));
        };
        return true;
    }

    function updateRules (success, fail, keepCache) {
        if (!storage.supportCrossSave()) {
            fail({url:''}, "Not support cross storage");
            showTips("Current platform do not support cross storage!");
            return;
        }
        if (inUpdate) return;
        inUpdate = true;
        let ruleIndex = ruleUrls.length - 1;
        if (!keepCache) {
            storage.setItem("hpRules", []);
            storage.setItem("smartRules", []);
        }
        let allOk = true;
        let preLength = ruleParser.rules.length;
        let fetchVersion = -1;
        async function needUpdate(url, id) {
            if (!/^https:\/\/hoothin\.github\.io\/|\/hoothin\/UserScripts\/.*\/Pagetual\/pagetualRules\.json/i.test(url)) {
                return true;
            }
            let rulesLength = ruleParser.rules.reduce((acc, cur) => acc + (cur.from == id ? 1 : 0), 0);
            if (rulesLength === 0) return true;
            if (fetchVersion >= 0) {
                return fetchVersion > (rulesData.ruleVersion || 0);
            }
            fetchVersion = await new Promise(resolve => {
                _GM_xmlhttpRequest({
                    url: url.replace(/\/\w+\.json/i, "/version"),
                    method: 'GET',
                    timeout: 20000,
                    headers: {
                        'accept': 'application/json,text/html'
                    },
                    onload: function(res) {
                        let version = parseInt(res.response || res.responseText);
                        resolve(version || -1);
                    },
                    onerror: function(e) {
                        resolve(-1);
                    },
                    ontimeout: function(e) {
                        resolve(-1);
                    }
                });
            });
            return fetchVersion > (rulesData.ruleVersion || 0);
        }
        async function addNextRule() {
            if (ruleIndex < 0) {
                let now = new Date().getTime();
                storage.setItem("ruleLastUpdate", now);
                storage.setItem("rules", ruleParser.rules);
                let curLength = ruleParser.rules.length;
                if (curLength !== preLength && rulesData.updateNotification) {
                    _GM_notification({
                        text: `Rules has updated( ${preLength} => ${curLength} )`,
                        title: "Pagetual rules updated",
                        onclick: (event) => {
                            event.preventDefault();
                            _GM_openInTab(rulesData.configPage || configPage[0], {active: true});
                        }
                    });
                }
                inUpdate = false;
                let rulesDataChanged = false;
                if (fetchVersion >= 0 && rulesData.ruleVersion !== fetchVersion) {
                    rulesData.ruleVersion = fetchVersion;
                    rulesDataChanged = true;
                }
                if (rulesData.uninited && allOk && ruleUrls.length > 1) {
                    rulesData.uninited = false;
                    rulesDataChanged = true;
                }
                if (rulesDataChanged) {
                    storage.setItem("rulesData", rulesData);
                }
                success();
            } else {
                let rule = ruleUrls[ruleIndex--];
                if (await needUpdate(rule.url, rule.id)) {
                    ruleParser.addRuleByUrl(rule.url, rule.id, (json, err) => {
                        if (!json) {
                            allOk = false;
                            fail(rule, err);
                        }
                        addNextRule();
                    });
                } else {
                    addNextRule();
                }
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
            visible = el.nodeName && win.getComputedStyle(el).display != 'none' && win.getComputedStyle(el).visibility != 'hidden';
        while(loopable && visible) {
            el = el.parentNode;

            if(el && el.nodeType === 1 && !compareNodeName(el, ["body"])) {
                visible = win.getComputedStyle(el).display != 'none' && win.getComputedStyle(el).visibility != 'hidden';
            }else {
                loopable = false;
            }
        }
        return visible;
    }

    function getElementTop(ele) {
        if (!ele) return 0;
        if (ele.getBoundingClientRect) {
            return ele.getBoundingClientRect().top + document.documentElement.scrollTop;
        }
        var actualTop = ele.offsetTop;
        var current = ele.offsetParent;
        while (current) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    function getElementLeft(ele) {
        if (!ele) return 0;
        if (ele.getBoundingClientRect) {
            return ele.getBoundingClientRect().left + document.documentElement.scrollLeft;
        }
        var actualLeft = ele.offsetLeft;
        var current = ele.offsetParent;
        while (current) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }

    function getElementBottom(ele) {
        return getElementTop(ele) + (ele.offsetHeight || ele.scrollHeight);
    }

    function getFormatJSON(obj){
        if(!objIsArr(obj) || obj.length === 0)return "";
        return JSON.stringify(obj, null, 4);
    }

    function globMatch(first, second) {
        if (first === '*') {
            return true;
        }
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

    let pageReady = false;
    function initRules(callback) {
        charset = (document.characterSet || document.charset || document.inputEncoding);
        let equiv = document.querySelector('[http-equiv="Content-Type"]');
        if (equiv && equiv.content) {
            let innerCharSet = equiv.content.match(/charset\=([^;]+)/);
            if (!innerCharSet) {
                charsetValid = false;
            } else if (innerCharSet[1].replace("-", "").toLowerCase() != charset.replace("-", "").toLowerCase()) {
                charsetValid = false;
            }
        } else charsetValid = false;
        storage.getItem("rulesData", data => {
            /*0 wedata格式，1 pagetual格式*/
            ruleUrls = [{
                id: 1,
                url: data && data.wedata2github ? 'https://hoothin.github.io/UserScripts/Pagetual/items_all.json' : 'http://wedata.net/databases/AutoPagerize/items_all.json',
                type: 0,
            }];
            if (data) {
                rulesData = data;
                if (data.urls) ruleUrls = ruleUrls.concat(data.urls);
                if (data.sort) {
                    let urls = [];
                    data.sort.forEach(id => {
                        for (let s = 0; s < ruleUrls.length; s++) {
                            if (id == ruleUrls[s].id) {
                                urls.push(ruleUrls[s]);
                                break;
                            }
                        }
                    });
                    ruleUrls = urls;
                }
            }
            if (rulesData.lang) {
                setLang(rulesData.lang);
            }
            if (rulesData.firstRun) {
                rulesData.firstRun = false;
                storage.setItem("rulesData", rulesData);
                setTimeout(() => {
                    storage.getItem("rulesData", data => {
                        if (data.firstRun === false) {
                            _GM_openInTab(firstRunPage, {active: true});
                        }
                    });
                }, 100);
            }
            _GM_registerMenuCommand(i18n("configure"), () => {
                _GM_openInTab(rulesData.configPage || configPage[0], {active: true});
            });
            if (rulesData.blacklist && rulesData.blacklist.length > 0) {
                let href = location.href.slice(0, 500);
                let commentStart = false;
                for (let i = 0; i < rulesData.blacklist.length; i++) {
                    let curGlob = rulesData.blacklist[i];
                    if (!curGlob) continue;
                    if (curGlob.indexOf("//") == 0) continue;
                    if (commentStart) {
                        if (/\*\/$/.test(curGlob)) {
                            commentStart = false;
                        }
                        continue;
                    }
                    if (curGlob.indexOf("/*") == 0) {
                        commentStart = true;
                        continue;
                    }
                    if (curGlob.indexOf("/") == 0) {
                        let regMatch = curGlob.match(/^\/(.*)\/(\w*)$/);
                        if (regMatch && new RegExp(regMatch[1], regMatch[2]).test(href)) {
                            forceState == 1;
                            return;
                        }
                    } else if (globMatch(curGlob, href)) {
                        forceState == 1;
                        return;
                    }
                }
            }
            _GM_registerMenuCommand(i18n("editCurrent"), () => {
                picker.start();
            });
            ruleParser.initSavedRules(async () => {
                let upBtnImg = rulesData.upBtnImg, downBtnImg = rulesData.downBtnImg, _sideControllerIcon = rulesData.sideControllerIcon;
                if (upBtnImg && downBtnImg) {
                    downSvgCSS = downSvgCSS.replace("transform: rotate(180deg);", "");
                } else if (upBtnImg && !downBtnImg) {
                    downBtnImg = upBtnImg;
                } else if(downBtnImg && !upBtnImg) {
                    upBtnImg = downBtnImg;
                }
                if (upBtnImg) {
                    upSvg = /https?:|data/.test(upBtnImg) ? `<img class="pagetual" src="${upBtnImg}"/>` : `<span>${upBtnImg}</span>`;
                }
                if (downBtnImg) {
                    downSvg = /https?:|data/.test(downBtnImg) ? `<img class="pagetual" src="${downBtnImg}"/>` : `<span>${downBtnImg}</span>`;
                }
                if (_sideControllerIcon) {
                    sideControllerIcon = /https?:|data/.test(_sideControllerIcon) ? `<img class="pagetual" src="${_sideControllerIcon}"/>` : `<span>${_sideControllerIcon}</span>`;
                }
                setLoadingDiv(rulesData.loadingText || i18n("loadingText"));
                if (typeof(rulesData.opacity) == "undefined") {
                    rulesData.opacity = 1;
                }
                if (typeof(rulesData.hideBar) == "undefined") {
                    rulesData.hideBar = false;
                }
                if (typeof(rulesData.dbClick2Stop) == "undefined") {
                    rulesData.dbClick2Stop = true;
                }
                if (typeof(rulesData.enableWhiteList) == "undefined") {
                    rulesData.enableWhiteList = false;
                }
                if (typeof(rulesData.enableHistory) == "undefined") {
                    rulesData.enableHistory = false;
                }
                if (typeof(rulesData.openInNewTab) == "undefined") {
                    rulesData.openInNewTab = false;
                }
                if (typeof(rulesData.enableDebug) == "undefined") {
                    rulesData.enableDebug = true;
                }
                if (typeof(rulesData.updateNotification) == "undefined") {
                    rulesData.updateNotification = true;
                }
                if (typeof(rulesData.initRun) == "undefined") {
                    rulesData.initRun = true;
                }
                if (typeof(rulesData.preload) == "undefined") {
                    rulesData.preload = true;
                }
                if (typeof(rulesData.customFirst) == "undefined") {
                    rulesData.customFirst = false;
                }
                if (typeof(rulesData.manualMode) == "undefined") {
                    rulesData.manualMode = false;
                }
                if (typeof(rulesData.clickMode) == "undefined") {
                    rulesData.clickMode = false;
                }
                if (typeof(rulesData.pageBarMenu) == "undefined") {
                    rulesData.pageBarMenu = true;
                }
                if (typeof(rulesData.arrowToScroll) == "undefined") {
                    rulesData.arrowToScroll = false;
                }
                if (typeof(rulesData.hideLoadingIcon) == "undefined") {
                    rulesData.hideLoadingIcon = false;
                }
                if (typeof(rulesData.hideBarArrow) == "undefined") {
                    rulesData.hideBarArrow = false;
                }
                if (typeof(rulesData.lastPageTips) == "undefined") {
                    rulesData.lastPageTips = true;
                }
                if (typeof(rulesData.rate) == "undefined") {
                    rulesData.rate = 1;
                }
                rate = rulesData.rate;
                if (rulesData.autoLoadNum && rulesData.initRun) {
                    autoLoadNum = parseInt(rulesData.autoLoadNum);
                }
                openInNewTab = rulesData.openInNewTab ? 1 : 0;
                enableDebug = rulesData.enableDebug;

                let _nextSwitch = await getListData("nextSwitch", location.host);
                if (typeof(_nextSwitch) !== "undefined") {
                    nextIndex = _nextSwitch || 0;
                }

                let _forceState = await getListData("forceState", location.host);
                if (typeof(_forceState) == "undefined") {
                    _forceState = await getData("forceState_" + location.host);
                }
                if (typeof(_forceState) == "undefined") {
                    _forceState = (rulesData.enableWhiteList ? 1 : 0);
                }
                forceState = _forceState;

                autoScroll = await getListData("autoScroll", location.host + location.pathname) || 0;

                updateDate = await getData("ruleLastUpdate");

                let _loadNowNum = await getData("loadNowNum");
                if (typeof(_loadNowNum) != "undefined") {
                    loadNowNum = _loadNowNum;
                }
                let _autoScrollRate = await getData("autoScrollRate");
                if (_autoScrollRate) {
                    autoScrollRate = _autoScrollRate;
                }

                author = await getData("author") || "";

                manualPause = !!await getListData("pauseState", location.host);

                let href = location.href.slice(0, 100);
                try {
                    if (_unsafeWindow.initedPagetual) {
                        if (ruleImportUrlReg.test(href)) {
                            showTips(i18n('duplicate'));
                        }
                        return;
                    }
                    _unsafeWindow.initedPagetual = true;
                } catch(e) {showTips(e)}
                listenUrl();
                _GM_registerMenuCommand(i18n("update"), () => {
                    showTips(i18n("beginUpdate"), "", 60000);
                    updateRules(() => {
                        showTips(i18n("updateSucc"));
                        location.reload();
                    },(rule, err) => {
                        showTips(`Failed to update ${rule.url} rules!`);
                        debug(err);
                    });
                });
                _GM_registerMenuCommand(i18n(forceState == 1 ? "enable" : "disableSite"), () => {
                    if (forceState == 1) {
                        forceState = 0;
                        showTips(i18n("enableSiteTips"));
                        changeStop(false, true);
                    } else {
                        forceState = 1;
                        showTips(i18n("disableSiteTips"));
                        changeStop(true, true);
                        sideController.remove();
                    }
                    setListData("forceState", location.host, forceState);
                    if (!ruleParser.curSiteRule.url) {
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    }
                });
                _GM_registerMenuCommand(i18n("toggleAutoScroll"), () => {
                    autoScroll = (autoScroll ? 0 : prompt(i18n("autoScrollRate"), autoScrollRate)) || 0;
                    autoScroll = parseInt(autoScroll) || 0;
                    if (autoScroll < 0) autoScroll = 0;
                    if (autoScroll && autoScroll != autoScrollRate) {
                        autoScrollRate = autoScroll;
                        storage.setItem("autoScrollRate", autoScrollRate);
                    }
                    setListData("autoScroll", location.host + location.pathname, autoScroll);
                    startAutoScroll();
                });
                startAutoScroll();


                if (initConfig(href)) {
                    document.addEventListener("click", e => {
                        if (e.target && typeof e.target.dataset.pagetualPicker !== 'undefined') {
                            e.preventDefault();
                            e.stopPropagation();
                            picker.start();
                        }
                    });
                    return;
                }
                pageReady = true;
                if (forceState == 1) return;
                let now = new Date().getTime();
                if (!updateDate || now - updateDate > 2 * 24 * 60 * 60 * 1000) {
                    updateRules(() => {
                    }, (rule, err) => {}, true);
                    storage.setItem("ruleLastUpdate", now);
                }
                callback();
            });
        });
    }

    let xhrFailed = false;
    function requestDoc(url, callback) {
        let postParams = url.match(/#p{(.*)}$/);
        if (postParams) {
            postParams = postParams[1];
            url = url.replace(/#p{.*/, "");
        }
        let ruleHeaders = ruleParser.curSiteRule.headers;
        let headers = {
            'Referer': location.href,
            'User-Agent': navigator.userAgent,
            'accept': 'text/html,application/xhtml+xml,application/xml',
            "Content-Type": (postParams ? "application/x-www-form-urlencoded" : "text/html") + ";charset=" + charset,
        };
        if (ruleHeaders) {
            if (ruleHeaders.referer) {
                headers.referer = ruleHeaders.referer;
            }
            if (ruleHeaders.userAgent) {
                headers.userAgent = ruleHeaders.userAgent;
            }
            if (ruleHeaders.accept) {
                headers.accept = ruleHeaders.accept;
            }
            if (ruleHeaders.contentType) {
                headers.contentType = ruleHeaders.contentType;
                let ruleCharset = ruleHeaders.contentType.match(/charset\=([^;]+)/);
                if (ruleCharset) charset = ruleCharset[1];
            }
            if (ruleHeaders.cookie) {
                headers.cookie = ruleHeaders.cookie;
            }
        }
        _GM_xmlhttpRequest({
            url: url,
            method: postParams ? 'POST' : 'GET',
            data: postParams,
            overrideMimeType: 'text/html;charset=' + charset,
            headers: headers,
            timeout: 50000,
            onload: async function(res) {
                if (isPause) return callback(false);
                var doc = null, response = res.response;
                try {
                    doc = document.implementation.createHTMLDocument('');
                    doc.documentElement.innerHTML = response;
                } catch (e) {
                    debug('parse error:' + e.toString());
                }
                let pageElement = null;
                let preCode = ruleParser.curSiteRule.pagePre;
                if (preCode) {
                    try {
                        let preResult;
                        if (typeof preCode == 'function') {
                            preResult = await preCode(response, doc);
                        } else if (preCode.length == 2) {
                            preResult = response.replace(new RegExp(preCode[0], "gi"), preCode[1]);
                        } else {
                            preResult = await new AsyncFunction("response", "doc", '"use strict";' + preCode)(response, doc);
                        }
                        if (typeof preResult !== "undefined") {
                            if (typeof preResult === "string") {
                                doc.documentElement.innerHTML = preResult;
                            } else pageElement = preResult;
                        }
                    } catch(e) {
                        debug(e);
                    }
                }
                let base = doc.querySelector("base");
                ruleParser.basePath = (base && base.href) || url;
                if (charsetValid && !ruleHeaders) {
                    let equiv = doc.querySelector('[http-equiv="Content-Type"]');
                    if (equiv && equiv.content) {
                        let innerCharSet = equiv.content.match(/charset\=([^;]+)/);
                        if (innerCharSet && innerCharSet[1].replace("-", "").toLowerCase() != charset.replace("-", "").toLowerCase()) {
                            charset = innerCharSet[1];
                            return requestDoc(url, callback);
                        }
                    }
                }
                if (pageElement === null) {
                    pageElement = ruleParser.getPageElement(doc);
                }
                if ((!pageElement || pageElement.length == 0) && res.status >= 400) {
                    debug(res.status + " " + url + " " + response, "Error status");
                    if (!ruleParser.curSiteRule.smart || !xhrFailed) {
                        xhrFailed = true;
                        return callback(false);
                    }
                }
                if (inCors && (!pageElement || pageElement.length == 0) && ruleParser.curSiteRule.smart) {
                    let article;
                    for (let i = 0; i < mainSel.length; i++) {
                        article = doc.querySelectorAll(mainSel[i]);
                        if (article && article.length === 1) break;
                    }
                    if (article && article.length == 1) {
                        article = article[0];
                        ruleParser.curSiteRule.pageElement = article.nodeName.toLowerCase() + (article.id ? "#" + article.id : "") + (article.className ? "." + article.className.replace(/ /g, ".") : "") + ">*";
                        pageElement = article.children;
                    } else {
                        ruleParser.curSiteRule.pageElement = allOfBody;
                        pageElement = ruleParser.getPageElement(doc);
                    }
                    ruleParser.getInsert(true);
                }
                //只有1的話怕不是圖片哦
                if (pageElement && (pageElement.length > 1 || (pageElement.length == 1 && !compareNodeName(pageElement[0], ["img"])))) {
                    await ruleParser.insertPage(doc, pageElement, url, callback, false);
                    if (ruleParser.curSiteRule.action == 1) {
                        isLoading = true;
                        requestFromIframe(url, async (doc, eles) => {
                            if (eles) {
                                await ruleParser.insertPage(doc, eles, url, callback, true);
                            } else isLoading = false;
                        });
                    } else ruleParser.curSiteRule.action = 0;
                } else if ((ruleParser.curSiteRule.smart || curPage == 1) && !inCors) {
                    ruleParser.curSiteRule.action = 1;
                    requestFromIframe(url, async (doc, eles) => {
                        if (eles) {
                            await ruleParser.insertPage(doc, eles, url, callback, true);
                        } else isLoading = false;
                    });
                } else {
                    debug("Stop as no page element");
                    ruleParser.noValidContent(url);
                    changeStop(true);
                    callback(false);
                }
            },
            onerror: function(e) {
                debug(e, "NetError");
                callback(false);
            },
            ontimeout: function(e) {
                debug(e, "NetTimeout");
                callback(false);
            }
        });
    }

    function initPage() {
        ruleParser.initPage(() => {
            if (ruleParser.curSiteRule.autoLoadNum) {
                autoLoadNum = ruleParser.curSiteRule.autoLoadNum;
            }
            if (ruleParser.curSiteRule.nextLink && Array && Array.isArray && Array.isArray(ruleParser.curSiteRule.nextLink)) {
                _GM_registerMenuCommand(i18n("nextSwitch"), () => {
                    nextSwitch.start();
                });
            }
            if (ruleParser.nextLinkHref) {
                let isJs = ruleParser.hrefIsJs(ruleParser.nextLinkHref);
                if (!isJs) {
                    let inForce = (forceState == 2 || forceState == 3);
                    _GM_registerMenuCommand(i18n(inForce ? "cancelForceIframe" : "forceIframe"), () => {
                        if (inForce) {
                            setListData("forceState", location.host, "");
                        } else {
                            let _state = ruleParser.curSiteRule.action > 0 || confirm(i18n("forceAllBody")) ? 2 : 3;
                            setListData("forceState", location.host, _state);
                        }
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    });
                }
                _GM_registerMenuCommand(i18n("loadNow"), () => {
                    if (autoLoadNum != -1) {
                        autoLoadNum = -1;
                        return;
                    }
                    let loadNum = window.prompt(i18n("loadConfirm"), loadNowNum);
                    if (loadNum === "" || loadNum === null) return;
                    loadNum = Math.abs(parseInt(loadNum)) || 0;
                    if (loadNowNum != loadNum) {
                        loadNowNum = loadNum;
                        storage.setItem("loadNowNum", loadNowNum);
                    }
                    autoLoadNum = loadNum;
                    nextPage();
                });
            }
            initListener();
        });
    }

    var pageBarStyle, mainStyleEle, mainStyleStyle;
    function initView() {
        if (!mainStyleStyle) {
            mainStyleStyle = `
         .pagetual_pageBar{
           -moz-transition:all 0.3s ease-in-out 0s;
           -webkit-transition:all 0.3s ease-in-out 0s;
           transition:all 0.3s ease-in-out 0s;
           font-family: Arial,sans-serif !important;
           text-align: center !important;
         }
         .pagetual_pageBar.stop {
           -webkit-filter: invert(100%);
           filter: invert(100%);
           opacity: 1!important;
         }
         .pagetual_pageBar.hide {
           display: none!important;
         }
         .pagetual-hide {
           display: none!important;
         }
         .pagetual_pageBar:hover {
           opacity: 1!important;
           box-shadow: 0px 0px 10px 0px #000000aa;
           border-radius: 20px;
           background-color: rgb(240 240 240 / 80%);
           border-color: transparent!important;
         }
         .pagetual_pageBar span {
           vertical-align: super;
         }
         .pagetual_pageBar a::before,
         .pagetual_pageBar a::after {
           content: none;
         }
         .pagetual_pageBar a>span {
           margin-top: 0!important;
           pointer-events: none;
           padding: unset;
           opacity: 0;
           -moz-transition:margin-top 0.3s ease-in-out 0s, opacity .3s;
           -webkit-transition:margin-top 0.3s ease-in-out 0s, opacity .3s;
           transition:margin-top 0.3s ease-in-out 0s, opacity .3s;
           transform: none;
           left: 0;
           margin-left: calc(50% - 20px);
         }
         .pagetual_pageBar a>span:hover {
           color: red;
         }
         .pagetual_pageBar a:hover>span {
           opacity: 1!important;
         }
         .pagetual_pageBar span.prevScreen,
         .pagetual_pageBar span.nextScreen {
           display: block!important;
           top: unset !important;
           padding: unset !important;
           opacity: 0!important;
         }
         .pagetual_pageBar a:hover>span.prevScreen {
           margin-top: -${rulesData.opacity == 1 ? 31 : 30}px!important;
           pointer-events: all;
         }
         .pagetual_pageBar span.refreshRing {
           position: absolute;
           top: 0;
           opacity: 0;
           height: 30px;
           margin-left: calc(50% - 23px);
           display: block!important;
         }
         .pagetual_pageBar span.refreshRing>svg {
           background: white;
           border-radius: 50%;
         }
         .pagetual_pageBar a:hover>span.refreshRing {
           opacity: 0.3;
           -webkit-animation: pagetual_ring 2.0s infinite linear;
           animation: pagetual_ring 2.0s infinite linear;
         }
         @-webkit-keyframes pagetual_ring {
           0% { -webkit-transform: rotate(0deg) }
           100% {
             -webkit-transform: rotate(360deg);
           }
         }
         @keyframes pagetual_ring {
           0% {
             transform: rotate(0deg);
             -webkit-transform: rotate(0deg);
           } 100% {
             transform: rotate(360deg);
             -webkit-transform: rotate(360deg);
           }
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
         .pagetual_pageBar.stop span>svg{
           opacity: 1;
         }
         .pagetual_pageBar.stop span>svg>path{
           transform: scale(.8);
           transform-origin: center;
           -moz-transition:transform 0.3s ease;
           -webkit-transition:transform 0.3s ease;
           transition:transform 0.3 ease;
         }
         .pagetual_pageBar.stop:hover span>svg>path{
           transform: unset;
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
         .pagetual_tipsWords {
           font-size: 50px;
           font-weight: bold;
           font-family: "黑体", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
             "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
             "Segoe UI Emoji", "Segoe UI Symbol";
           color: #ffffff;
           min-height: 70px;
           max-width: 80%;
           line-height: 1.5;
           position: fixed;
           left: 50%;
           top: 10%;
           margin-left: -99999px;
           padding: 0 15px;
           z-index: 2147483647;
           background-color: #000;
           border: 1px solid #303030;
           border-radius: 10px;
           opacity: 0;
           filter: alpha(opacity=65);
           box-shadow: 5px 5px 20px 0px #000;
           -moz-transition:opacity 0.3s ease-in-out 0s;
           -webkit-transition:opacity 0.3s ease-in-out 0s;
           transition:opacity 0.3s ease-in-out 0s;
           pointer-events: none;
           word-break: break-all;
         }
         .pagetual_tipsWords>a {
           color: #ffffff;
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
        `;
            pageBarStyle = `overflow: visible;text-indent: initial;vertical-align: super;line-height:1;opacity:${rulesData.opacity};display:${rulesData.opacity == 0 ? "none" : "inline-flex"};padding:0;font-size: 30px;visibility: visible; position: relative; width: auto; max-width: 100vw; height: 30px; float: none; clear: both; margin: 5px auto; text-align: center;justify-content: center;box-sizing: content-box;${rulesData.opacity == 1 ? "border-top: 1px solid rgb(80, 80, 80);" : "box-shadow: 0px 0px 10px 0px #000000aa;border-radius: 20px;background-color: rgb(240 240 240 / 80%);"}`;
        }
        if (!mainStyleEle || !mainStyleEle.parentNode) {
            mainStyleEle = _GM_addStyle(mainStyleStyle);
        }
    }
    var loadingDiv = document.createElement("div");
    if (loadingDiv.style) loadingDiv.style.cssText = "text-indent: initial;cy: initial;d: initial;dominant-baseline: initial;empty-cells: initial;fill: initial;fill-opacity: initial;fill-rule: initial;filter: initial;flex: initial;flex-flow: initial;float: initial;flood-color: initial;flood-opacity: initial;grid: initial;grid-area: initial;height: initial;hyphens: initial;image-orientation: initial;image-rendering: initial;inline-size: initial;inset-block: initial;inset-inline: initial;isolation: initial;letter-spacing: initial;lighting-color: initial;line-break: initial;list-style: initial;margin-block: initial;margin: 0px auto;margin-inline: initial;marker: initial;mask: initial;mask-type: initial;max-block-size: initial;max-height: initial;max-inline-size: initial;max-width: initial;min-block-size: initial;min-height: initial;min-inline-size: initial;min-width: initial;mix-blend-mode: initial;object-fit: initial;object-position: initial;offset: initial;opacity: initial;order: initial;origin-trial-test-property: initial;orphans: initial;outline: initial;outline-offset: initial;overflow-anchor: initial;overflow-clip-margin: initial;overflow-wrap: initial;overflow: initial;overscroll-behavior-block: initial;overscroll-behavior-inline: initial;overscroll-behavior: initial;padding-block: initial;padding: initial;padding-inline: initial;page: initial;page-orientation: initial;paint-order: initial;perspective: initial;perspective-origin: initial;pointer-events: initial;position: initial;quotes: initial;r: initial;resize: initial;ruby-position: initial;rx: initial;ry: initial;scroll-behavior: initial;scroll-margin-block: initial;scroll-margin: initial;scroll-margin-inline: initial;scroll-padding-block: initial;scroll-padding: initial;scroll-padding-inline: initial;scroll-snap-align: initial;scroll-snap-stop: initial;scroll-snap-type: initial;scrollbar-gutter: initial;shape-image-threshold: initial;shape-margin: initial;shape-outside: initial;shape-rendering: initial;size: initial;speak: initial;stop-color: initial;stop-opacity: initial;stroke: initial;stroke-dasharray: initial;stroke-dashoffset: initial;stroke-linecap: initial;stroke-linejoin: initial;stroke-miterlimit: initial;stroke-opacity: initial;stroke-width: initial;tab-size: initial;table-layout: initial;text-align: initial;text-align-last: initial;text-anchor: initial;text-combine-upright: initial;text-decoration: initial;text-decoration-skip-ink: initial;text-indent: initial;text-overflow: initial;text-shadow: initial;text-size-adjust: initial;text-transform: initial;text-underline-offset: initial;text-underline-position: initial;touch-action: initial;transform: initial;transform-box: initial;transform-origin: initial;transform-style: initial;transition: initial;user-select: initial;vector-effect: initial;vertical-align: initial;visibility: initial;border-spacing: initial;-webkit-border-image: initial;-webkit-box-align: initial;-webkit-box-decoration-break: initial;-webkit-box-direction: initial;-webkit-box-flex: initial;-webkit-box-ordinal-group: initial;-webkit-box-orient: initial;-webkit-box-pack: initial;-webkit-box-reflect: initial;-webkit-highlight: initial;-webkit-hyphenate-character: initial;-webkit-line-break: initial;-webkit-line-clamp: initial;-webkit-mask-box-image: initial;-webkit-mask: initial;-webkit-mask-composite: initial;-webkit-perspective-origin-x: initial;-webkit-perspective-origin-y: initial;-webkit-print-color-adjust: initial;-webkit-rtl-ordering: initial;-webkit-ruby-position: initial;-webkit-tap-highlight-color: initial;-webkit-text-combine: initial;-webkit-text-decorations-in-effect: initial;-webkit-text-emphasis: initial;-webkit-text-emphasis-position: initial;-webkit-text-fill-color: initial;-webkit-text-security: initial;-webkit-text-stroke: initial;-webkit-transform-origin-x: initial;-webkit-transform-origin-y: initial;-webkit-transform-origin-z: initial;-webkit-user-drag: initial;-webkit-user-modify: initial;white-space: initial;widows: initial;width: initial;will-change: initial;word-break: initial;word-spacing: initial;x: initial;y: initial;z-index: 2147483647;";

    const loadingCSS = `font-size: initial; text-indent: unset; display: block; position: initial; margin: auto auto 5px auto; shape-rendering: auto; vertical-align: middle; visibility: visible; width: initial; height: initial; text-align: center; color: #6e6e6e; flex: 0;`;
    function setLoadingDiv(loadingText) {
        loadingDiv.innerHTML = createHTML(`<p class="pagetual_loading_text" style="${loadingCSS}display: inline-block;width: 100%;">${loadingText}</p>${rulesData.hideLoadingIcon ? "" : `<div class="pagetual_loading"><svg width="50" height="50" style="position:relative;cursor: pointer;width: 50px;height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" style="fill: #6e6e6e;" fill="#6e6e6e"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" style="fill: #6e6e6e;" fill="#6e6e6e"></path></svg></div>`}`);
    }

    var upSvg = `<svg width="30" height="30" class="upSvg pagetual" style="display:initial;position:relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: baseline;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" style="fill: #604b4a;" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" style="fill: #604b4a;" fill="#604b4a"></path></svg>`;
    var upSvgCSS = `text-align: center;display: initial;position: relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: baseline;fill: currentColor;overflow: hidden;`;
    var downSvg = `<svg width="30" height="30" class="downSvg pagetual" style="display:initial;position:relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: baseline;fill: currentColor;overflow: hidden;transform: rotate(180deg);" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" style="fill: #604b4a;" fill="#604b4a"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" style="fill: #604b4a;" fill="#604b4a"></path></svg>`;
    var downSvgCSS = `text-align: center;display: initial;position: relative;cursor: pointer;margin: 0 8px;width: 30px;height: 30px;vertical-align: baseline;fill: currentColor;overflow: hidden;transform: rotate(180deg);`;

    const initStyle = `text-indent: initial;display: contents;right: unset;left: unset;top: unset;bottom: unset;inset: unset;clear: both;cy: initial;d: initial;dominant-baseline: initial;empty-cells: initial;fill: initial;fill-opacity: initial;fill-rule: initial;filter: initial;flex: initial;flex-flow: initial;float: initial;flood-color: initial;flood-opacity: initial;grid: initial;grid-area: initial;height: initial;hyphens: initial;image-orientation: initial;image-rendering: initial;inline-size: initial;inset-block: initial;inset-inline: initial;isolation: initial;letter-spacing: initial;lighting-color: initial;line-break: initial;list-style: initial;margin-block: initial;margin: 0px 5px;margin-inline: initial;marker: initial;mask: initial;mask-type: initial;max-block-size: initial;max-height: initial;max-inline-size: initial;max-width: initial;min-block-size: initial;min-height: initial;min-inline-size: initial;min-width: initial;mix-blend-mode: initial;object-fit: initial;object-position: initial;offset: initial;opacity: initial;order: initial;orphans: initial;outline: initial;outline-offset: initial;overflow-anchor: initial;overflow-clip-margin: initial;overflow-wrap: initial;overflow: initial;overscroll-behavior-block: initial;overscroll-behavior-inline: initial;overscroll-behavior: initial;padding-block: initial;padding: initial;padding-inline: initial;page: initial;page-orientation: initial;paint-order: initial;perspective: initial;perspective-origin: initial;pointer-events: initial;position: relative;quotes: initial;r: initial;resize: initial;ruby-position: initial;rx: initial;ry: initial;scroll-behavior: initial;scroll-margin-block: initial;scroll-margin: initial;scroll-margin-inline: initial;scroll-padding-block: initial;scroll-padding: initial;scroll-padding-inline: initial;scroll-snap-align: initial;scroll-snap-stop: initial;scroll-snap-type: initial;scrollbar-gutter: initial;shape-image-threshold: initial;shape-margin: initial;shape-outside: initial;shape-rendering: initial;size: initial;speak: initial;stop-color: initial;stop-opacity: initial;stroke: initial;stroke-dasharray: initial;stroke-dashoffset: initial;stroke-linecap: initial;stroke-linejoin: initial;stroke-miterlimit: initial;stroke-opacity: initial;stroke-width: initial;tab-size: initial;table-layout: initial;text-align: initial;text-align-last: initial;text-anchor: initial;text-combine-upright: initial;text-decoration: initial;text-decoration-skip-ink: initial;text-indent: initial;text-overflow: initial;text-shadow: initial;text-size-adjust: initial;text-transform: initial;text-underline-offset: initial;text-underline-position: initial;touch-action: initial;transform: initial;transform-box: initial;transform-origin: initial;transform-style: initial;transition: initial;user-select: initial;vector-effect: initial;vertical-align: initial;visibility: initial;border-spacing: initial;-webkit-border-image: initial;-webkit-box-align: initial;-webkit-box-decoration-break: initial;-webkit-box-direction: initial;-webkit-box-flex: initial;-webkit-box-ordinal-group: initial;-webkit-box-orient: initial;-webkit-box-pack: initial;-webkit-box-reflect: initial;-webkit-highlight: initial;-webkit-hyphenate-character: initial;-webkit-line-break: initial;-webkit-line-clamp: initial;-webkit-mask-box-image: initial;-webkit-mask: initial;-webkit-mask-composite: initial;-webkit-perspective-origin-x: initial;-webkit-perspective-origin-y: initial;-webkit-print-color-adjust: initial;-webkit-rtl-ordering: initial;-webkit-ruby-position: initial;-webkit-tap-highlight-color: initial;-webkit-text-combine: initial;-webkit-text-decorations-in-effect: initial;-webkit-text-emphasis: initial;-webkit-text-emphasis-position: initial;-webkit-text-fill-color: initial;-webkit-text-security: initial;-webkit-text-stroke: initial;-webkit-transform-origin-x: initial;-webkit-transform-origin-y: initial;-webkit-transform-origin-z: initial;-webkit-user-drag: initial;-webkit-user-modify: initial;white-space: initial;widows: initial;width: initial;will-change: initial;word-break: initial;word-spacing: initial;x: initial;y: initial;`;
    const pageTextStyle = `opacity: 1!important;text-indent: initial;padding: unset;border: none;background: unset!important;line-height: 30px;text-decoration: none;user-select: none;visibility: visible;position: initial;width: auto;max-width: 80%; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;height: auto;float: none;clear: both;margin: 0px;text-align: center;display: inline-block;font-weight: bold;font-style: normal;font-size: 16px;letter-spacing: initial;vertical-align: top;color: rgb(85, 85, 95)!important;`;
    var sideControllerIcon = '';

    var tipsWords = document.createElement("div");
    tipsWords.className = "pagetual_tipsWords";

    function changeStop(stop, save) {
        isPause = stop;
        [].forEach.call(getBody(document).querySelectorAll(".pagetual_pageBar,#pagetual-sideController"), bar => {
            if (isPause) {
                bar.classList.add("stop");
            } else {
                bar.classList.remove("stop");
            }
        });
        if (!isPause) ruleParser.showAddedElements();
        manualPause = isPause;
        if (save && sideController.inited) setListData("pauseState", location.host, isPause ? true : "");
    }

    function changeHideBar(hide) {
        isHideBar = hide;
        [].forEach.call(getBody(document).querySelectorAll(".pagetual_pageBar"), bar => {
            if (isHideBar) {
                bar.classList.add("hide");
            } else {
                bar.classList.remove("hide");
            }
        });
    }

    function isInViewPort(element) {
        const viewWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        const {
            top,
            right,
            bottom,
            left,
        } = element.getBoundingClientRect();

        return (
            top >= 0 &&
            left >= 0 &&
            right <= viewWidth + 1 &&
            top <= viewHeight * rate &&
            isVisible(element, _unsafeWindow)
        );
    }

    function getPageBar() {
        let preBar = null, nextBar = null;
        let pageBars = [].slice.call(document.querySelectorAll(".pagetual_pageBar"));
        for (let i = 0; i < pageBars.length; i++) {
            let pageBar = pageBars[i];
            if (!pageBar || !getBody(document).contains(pageBar)) continue;
            let {
                top,
                right,
                bottom,
                left,
            } = pageBar.getBoundingClientRect();
            if (top > 500) {
                nextBar = pageBar;
                preBar = (i - 1 >= 0 ? pageBars[i - 1] : null);
                if (pageBar && getBody(document).contains(pageBar)) {
                    let {
                        top,
                        right,
                        bottom,
                        left,
                    } = pageBar.getBoundingClientRect();
                    if (top < -500) {
                        preBar = pageBar;
                    } else preBar = (i - 2 >= 0 ? pageBars[i - 2] : null);
                }
                break;
            }
        }
        if (!nextBar) preBar = pageBars[pageBars.length - 2];
        return {preBar: preBar, nextBar: nextBar};
    }

    var urlChanged = false;
    var urlChanging = false;
    var urlchangeHandler = e => {
        if (ruleParser && ruleParser.curSiteRule && ruleParser.curSiteRule.listenUrlChange == false) return;
        isPause = true;
        setTimeout(() => {
            lastActiveUrl = location.href;
            if (urlChanging) return;
            urlChanging = true;
            let href = location.href.slice(0, 60);
            if (href == configPage[1]) {
                setTimeout(() => {
                    initConfig(href);
                    urlChanging = false;
                }, 1000);
            } else {
                setTimeout(() => {
                    if (guidePage.test(href)) {
                        setTimeout(() => {
                            initConfig(href);
                            urlChanging = false;
                        }, 1000);
                    } else {
                        ruleParser.urlChanged();
                        if (!ruleParser.nextLinkHref) {
                            isLoading = false;
                        }
                        urlChanging = false;
                        //if (!pageReady && !ruleImportUrlReg.test(href)) location.reload();
                    }
                }, 500);
            }
        }, 1);
    };
    window.addEventListener('pagetual_pushState', urlchangeHandler);
    /*var _wr = function(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event('pagetual_' + type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = _wr('pushState');*/

    function listenUrl() {
        var prevPathname = window.location.pathname;
        var prevSearch = window.location.search;
        var checkUrlTime = 100;
        var checkUrlTimer;
        var checkClickedEle = null;
        var clickedSth = false;
        var checkFunc = () => {
            if (forceState == 1) return;
            if (checkClickedEle) {
                if (typeof ruleParser.curSiteRule.refreshByClick !== "undefined") {
                } else if (!clickedSth && checkClickedEle && checkClickedEle.nodeName) {
                    if (compareNodeName(checkClickedEle, ["a", "button"])) {
                        clickedSth = true;
                    } else {
                        let targetStyle = _unsafeWindow.getComputedStyle(checkClickedEle);
                        if (targetStyle.cursor == "pointer") clickedSth = true;
                    }
                }
                checkClickedEle = null;
            }
            if (checkUrlTime < 5000) {
                checkUrlTime += checkUrlTime>>1;
            }
            clearTimeout(checkUrlTimer);
            checkUrlTimer = setTimeout(checkFunc, checkUrlTime);
            if (document.hidden) return;
            if (clickedSth) {
                ruleParser.checkClickHref();
                clickedSth = false;
            } else if (!ruleParser.canListenUrlChange()) {
                return;
            }
            if ((prevPathname !== window.location.pathname || prevSearch !== window.location.search) && window.location.href != ruleParser.historyUrl) {
                checkUrlTime = 2000;
                urlWillChange = true;
                var e = new Event('pagetual_pushState');
                e.arguments = arguments;
                window.dispatchEvent(e);
                clickedSth = false;
            }
            prevPathname = window.location.pathname;
            prevSearch = window.location.search;
        };
        checkUrlTimer = setTimeout(checkFunc, checkUrlTime);

        document.addEventListener("click", e => {
            if (!checkClickedEle) {
                checkClickedEle = e.target;
                checkUrlTime = 300;
                clearTimeout(checkUrlTimer);
                checkUrlTimer = setTimeout(checkFunc, checkUrlTime);
            }
        });
    }

    let scrollContainer;
    function distToBottom () {
        let scrolly = window.scrollY;
        let windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (!scrollContainer || !document.documentElement.contains(scrollContainer)) {
            if (curPage > 1 || ruleParser.nextLinkHref) {
                let pageEle = ruleParser.getPageElement(document);
                if (pageEle && pageEle.length) {
                    let parent = pageEle[0].parentNode, pageScrollY = parent.scrollTop;
                    while (parent && pageScrollY == 0) {
                        parent = parent.parentNode;
                        pageScrollY = parent.scrollTop;
                    }
                    if (pageScrollY) {
                        scrollContainer = parent;
                        return scrollContainer.scrollHeight - pageScrollY - windowHeight;
                    }
                }
            }
        }
        if (scrollContainer) {
            return scrollContainer.scrollHeight - scrollContainer.scrollTop - windowHeight;
        }

        let scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
        return scrollH - scrolly - windowHeight;
    }

    let scrollHandler, clickToResetHandler, dblclickHandler, keydownHandler, hashchangeHandler, manualModeKeyHandler, pagetualNextHandler, keyupHandler, messageHandler;
    function initListener () {
        document.removeEventListener('scroll', scrollHandler, true);
        document.removeEventListener('wheel', scrollHandler, true);
        document.removeEventListener('dblclick', dblclickHandler);
        document.removeEventListener('keydown', keydownHandler);
        window.removeEventListener('hashchange', hashchangeHandler, false);
        document.removeEventListener('keydown', manualModeKeyHandler);
        document.removeEventListener('pagetual.next', pagetualNextHandler, false);
        document.removeEventListener('keyup', keyupHandler);
        _unsafeWindow.removeEventListener('message', messageHandler, true);
        let loadmoreBtn, loadingMore = true, lastScroll = 0, checkLoadMoreTimes = 0, loadMoreInv;
        if (ruleParser.curSiteRule.smart) {
            loadingMore = false;
        } else if (ruleParser.curSiteRule.loadMore) {
            loadingMore = false;
        }
        clickMode = typeof ruleParser.curSiteRule.clickMode == 'undefined' ? rulesData.clickMode : ruleParser.curSiteRule.clickMode;
        let clickingNext = false;
        let clickNext = async () => {
            if (clickingNext) return;
            clickingNext = true;
            setTimeout(() => {
                clickingNext = false;
            }, 1500);
            let nextLink = ruleParser.nextLinkHref;
            if (!nextLink) return;
            let isJs = ruleParser.hrefIsJs(nextLink);
            if (isJs) {
                let nextBtn = ruleParser.nextLinkEle;
                if (!nextBtn || !nextBtn.offsetParent) nextBtn = await ruleParser.getNextLink(document, true);
                if (nextBtn) emuClick(nextBtn);
            } else {
                window.location.href = nextLink;
            }
        };
        let checkScrollReach = () => {
            let dist = distToBottom();
            if (clickMode) {
                if (dist < 10) {
                    clickNext();
                }
            } else if (dist < bottomGap) {
                nextPage();
            }
        };
        messageHandler = e => {
            if (e.data.command === 'pagetual') {
                let action = e.data.action;
                let detail = e.data.detail;
                switch (action) {
                    case "config":
                        if (!detail || typeof detail !== 'object') return;
                        rulesData = {
                            ...rulesData,
                            ...detail
                        }
                        storage.setItem("rulesData", rulesData);
                        break;
                    case "nextPage":
                        if (detail === "" || detail === null) return;
                        detail = parseInt(detail) || 0;
                        if (loadNowNum != detail) {
                            loadNowNum = detail;
                        }
                        autoLoadNum = detail;
                        nextPage();
                        break;
                    case "loadMore":
                        clearInterval(loadMoreInv);
                        if (detail === -1) return;
                        loadmoreBtn = getLoadMore(document, loadmoreBtn);
                        loadmoreBtn && emuClick(loadmoreBtn);
                        if (detail === 0) {
                            loadMoreInv = setInterval(() => {
                                loadmoreBtn = getLoadMore(document, loadmoreBtn);
                                loadmoreBtn && emuClick(loadmoreBtn);
                            }, 500);
                        }
                        break;
                }
            }
            return true;
        }
        _unsafeWindow.addEventListener('message', messageHandler, true);
        scrollHandler = e => {
            if (urlChanged && !isLoading) {
                ruleParser.initPage(() => {});
                urlChanged = false;
                loadingMore = false;
                return;
            }
            if (isPause) return;
            if (!loadingMore) {
                loadmoreBtn = getLoadMore(document, loadmoreBtn);
                if (loadmoreBtn) {
                    if (isInViewPort(loadmoreBtn)) {
                        emuClick(loadmoreBtn);
                        loadingMore = true;
                        setTimeout(() => {loadingMore = false}, 200);
                    }
                } else {
                    loadingMore = true;
                    if (!ruleParser.curSiteRule.smart || checkLoadMoreTimes++ < 3) {
                        setTimeout(() => {loadingMore = false}, 200);
                    }
                }
            }
            if (!isLoading && !stopScroll) {
                checkScrollReach();
            }
            ruleParser.changeVisibility();
            let curScroll = getBody(document).scrollTop || document.documentElement.scrollTop;
            if (ruleParser.curSiteRule.lockScroll) {
                if (isLoading && Math.abs(lastScroll - curScroll) > 350) {
                    getBody(document).scrollTop = lastScroll;
                    document.documentElement.scrollTop = lastScroll;
                } else {
                    lastScroll = curScroll;
                }
            }
            if (targetY >= 0) {
                if (Math.abs(targetY - curScroll) < 100) {
                    targetY = -1;
                }
            }
            if (curScroll <= 20 && curScroll > 0) {
                if (sideController.inited) {
                    sideController.pagenum.innerHTML = createHTML("1");
                }
            }
        };
        dblclickHandler = e => {
            if (forceState == 1 || compareNodeName(e.target, ["input", "textarea", "select", "a", "button", "svg", "use", "img", "path"])) return;
            if (!rulesData.dbClick2StopKey) {
                if ((rulesData.dbClick2StopCtrl && !e.ctrlKey) ||
                   (rulesData.dbClick2StopAlt && !e.altKey) ||
                   (rulesData.dbClick2StopShift && !e.shiftKey) ||
                   (rulesData.dbClick2StopMeta && !e.metaKey)) {
                    return;
                }
            }
            if (!compareNodeName(e.target, ["body"]) && !e.target.classList.contains('pagetual_pageBar')) {
                try {
                    let selection = window.getSelection();
                    let selStr = selection.toString().trim();
                    if (!selStr) {
                        selection = selection.getRangeAt(0);
                        selStr = selection && selection.cloneContents().children[0];
                        if (selStr && !compareNodeName(selStr, ["img"])) selStr = false;
                    }
                    if (selStr) {
                        return;
                    }
                } catch (e) {}
            }
            if (rulesData.dbClick2Stop && (ruleParser.nextLinkHref || loadmoreBtn)) {
                setTimeout(() => {
                    if (rulesData.hideBarButNoStop || rulesData.hideBar) {
                        changeHideBar(!isHideBar);
                    }
                    if (!rulesData.hideBarButNoStop) {
                        changeStop(!isPause);
                        showTips(i18n(isPause ? "disable" : "enable"));
                    }
                    if (!isPause) {
                        checkScrollReach();
                    }
                }, 10);
            }
        };
        document.addEventListener('dblclick', dblclickHandler);
        clickToResetHandler = e => {
            if (!ruleParser.nextLinkHref) isLoading = false;
        };
        document.addEventListener('click', clickToResetHandler);
        if (rulesData.dbClick2StopKey) {
            keydownHandler = e => {
                if ((rulesData.dbClick2StopCtrl && !e.ctrlKey) ||
                   (rulesData.dbClick2StopAlt && !e.altKey) ||
                   (rulesData.dbClick2StopShift && !e.shiftKey) ||
                   (rulesData.dbClick2StopMeta && !e.metaKey)) {
                    return;
                }
                if (document.activeElement &&
                    (compareNodeName(document.activeElement, ["input", "textarea"]) ||
                     document.activeElement.contentEditable == 'true')) {
                    return;
                }
                var key = e.key.toLowerCase();
                if (rulesData.dbClick2StopKey.toLowerCase() == key) {
                    if (forceState == 1) {
                        forceState = 0;
                        showTips(i18n("enableSiteTips"));
                        changeStop(false, true);
                    } else {
                        forceState = 1;
                        showTips(i18n("disableSiteTips"));
                        changeStop(true, true);
                        sideController.remove();
                    }
                    if (!ruleParser.curSiteRule.url) {
                        setListData("forceState", location.host, forceState);
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    }
                }
            };
            document.addEventListener('keydown', keydownHandler);
        }
        if (ruleParser.curSiteRule.listenHashChange) {
            hashchangeHandler = () => {
                isPause = true;
                ruleParser.urlChanged();
                if (!ruleParser.nextLinkHref) isLoading = false;
            };
            window.addEventListener('hashchange', hashchangeHandler, false);
        }
        let manualMode = typeof ruleParser.curSiteRule.manualMode == 'undefined' ? rulesData.manualMode : ruleParser.curSiteRule.manualMode;
        if (manualMode) {
            manualModeKeyHandler = e => {
                if (document.activeElement &&
                    (compareNodeName(document.activeElement, ["input", "textarea"]) ||
                     document.activeElement.contentEditable == 'true')) {
                    return;
                }
                if (e.keyCode == 39) {
                    clickNext();
                } else if (e.keyCode == 37) {
                    history.back();
                }
            };
            document.addEventListener('keydown', manualModeKeyHandler);
            pagetualNextHandler = () => {
                clickNext();
            };
            document.addEventListener('pagetual.next', pagetualNextHandler, false);
            return;
        }
        if (rulesData.arrowToScroll) {
            keyupHandler = e => {
                if (document.activeElement &&
                    (compareNodeName(document.activeElement, ["input", "textarea"]) ||
                     document.activeElement.contentEditable == 'true')) {
                    return;
                }
                if (e.keyCode == 39) {
                    let nextPageBar=getPageBar().nextBar;
                    if (nextPageBar) {
                        scrollToPageBar(nextPageBar);
                    } else {
                        let scrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
                        window.scrollTo({ top: scrollTop + (window.innerHeight || document.documentElement.clientHeight), behavior: 'instant'});
                    }
                } else if (e.keyCode == 37) {
                    let prePageBar = getPageBar().preBar;
                    if (prePageBar) {
                        scrollToPageBar(prePageBar);
                    } else {
                        let scrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
                        window.scrollTo({ top: scrollTop - (window.innerHeight || document.documentElement.clientHeight), behavior: 'instant'});
                    }
                }
            };
            document.addEventListener('keyup', keyupHandler);
        }
        if (!ruleParser.curSiteRule.wheel) {
            document.addEventListener('scroll', scrollHandler, true);
        }
        document.addEventListener('wheel', scrollHandler, true);
    }

    let hideTipsTimeout;
    function showTips(content, href, time, wordColor, backColor) {
        initView();
        document.documentElement.appendChild(tipsWords);
        tipsWords.style.color = wordColor || 0xFFFFFF;
        tipsWords.style.backgroundColor = backColor || 0x000;
        let _time = 1500;
        if (href) {
            _time = 3500;
            tipsWords.innerHTML = createHTML(`<a href='${href}' target='_blank'>${content}</a>`);
            tipsWords.style.pointerEvents = 'all';
        } else {
            tipsWords.innerHTML = createHTML(content);
        }
        tipsWords.style.marginLeft = -tipsWords.offsetWidth / 2 + "px";
        setTimeout(() => {
            tipsWords.style.marginLeft = -tipsWords.offsetWidth / 2 + "px";
        }, 0);
        setTimeout(() => {
            tipsWords.style.opacity = 0.8;
            clearTimeout(hideTipsTimeout);
            hideTipsTimeout = setTimeout(() => {
                tipsWords.style.opacity = 0;
                tipsWords.style.pointerEvents = '';
            }, time || _time);
        }, 1);
    }

    const loadmoreReg = /^\s*((点击)?加载更多|(點擊)?加載更多|load\s*more( comments)?|もっと読み込む)[\.…▼\s]*$/i;
    const defaultLoadmoreSel = ".loadMore,.LoadMore,[class*='load-more'],button.show_more,.button-show-more,button[data-testid='more-results-button'],#btn_preview_remain,.view-more-btn";
    function getLoadMore(doc, loadmoreBtn) {
        if (!loadmoreBtn || !getBody(doc).contains(loadmoreBtn) || /less/.test(loadmoreBtn.innerText)) loadmoreBtn = null;
        if (!ruleParser.curSiteRule.smart && !ruleParser.curSiteRule.loadMore) return null;
        if (loadmoreBtn) return loadmoreBtn;
        let btnSel = ruleParser.curSiteRule.loadMore || defaultLoadmoreSel;
        if (btnSel) {
            loadmoreBtn = getElement(btnSel, doc, null, true);
        }
        if (!loadmoreBtn) {
            let buttons = getBody(doc).querySelectorAll("input,button,a,div[onclick]");
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                if (!button.innerText || button.innerText.length > 20) continue;
                if (button && loadmoreReg.test(button.innerText)) {
                    loadmoreBtn = button;
                    break;
                }
            }
        }
        if (loadmoreBtn && !ruleParser.curSiteRule.loadMore && loadmoreBtn.dataset.ajax !== "true") {
            let href = loadmoreBtn.getAttribute("href");
            if (href && href != "/" && !ruleParser.hrefIsJs(href)) {
                loadmoreBtn = null;
            }
        }
        if (loadmoreBtn && /less/.test(loadmoreBtn.innerText)) loadmoreBtn = null;
        if (loadmoreBtn) debug(loadmoreBtn, 'Load more button');
        return loadmoreBtn;
    }

    var targetY = -1;
    function scrollToPageBar(bar) {
        if (window.pageYOffset == 0) {
            bar.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        } else {
            let yOffset = -20;
            if (typeof ruleParser.curSiteRule.pageBarTop !== 'undefined') {
                yOffset = -ruleParser.curSiteRule.pageBarTop;
            }
            targetY = bar.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: targetY, behavior: 'smooth'});
        }
    }

    const pageNumReg=/[&\/\?](p=|page[=\/_-]?)\d+|[_-]\d+\./;
    function createPageBar(url) {
        curPage++;
        sideController.setup();
        let posEle = null;
        let scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
        let insert = ruleParser.getInsert();
        if (!insert || !insert.parentNode) return;
        if (forceState == 2) {
            posEle = getBody(document);
            posEle = posEle.children[posEle.children.length - 1];
        } else {
            posEle = insert;
        }
        while (posEle && !posEle.offsetParent) {
            posEle = posEle.previousElementSibling || posEle.parentNode;
        }
        if (posEle) {
            let actualBottom = getElementBottom(posEle);
            bottomGap = scrollH - actualBottom + (window.innerHeight || document.documentElement.clientHeight) * rate;
            if (bottomGap < 100) bottomGap = 100;
        } else {
            bottomGap = 1000;
        }
        if (hidePageBar) return null;
        url = url.replace(/#p{.*/, "");
        let example = (ruleParser.curSiteRule.insertPos == 2 || ruleParser.curSiteRule.insertPos == "in") ? insert.children[0] : (insert.parentNode.children[0] || insert);
        while (example && (compareNodeName(example, ["script", "style"]) || example.className == "pagetual_pageBar")) {
            example = example.nextElementSibling;
        }
        if (!example || !example.parentNode) example = insert;
        if (example.nodeType != 1) {
            example = example.previousElementSibling || example.parentNode;
            if (!example || example.nodeType != 1) return;
        }
        let exampleStyle = _unsafeWindow.getComputedStyle(example);
        let inTable, inLi;
        if (forceState == 2) {
            inTable = inLi = false;
        } else {
            inTable = compareNodeName(example.parentNode, ["table", "tbody"]) ||
            compareNodeName(example, ["tr", "tbody"]) ||
            exampleStyle.display == "table-row" ||
            (example.nextElementSibling && compareNodeName(example.nextElementSibling, ["tr", "tbody"]));
            inLi = compareNodeName(example, ["li"]) || (example.nextElementSibling && compareNodeName(example.nextElementSibling, ["li"]));
        }
        let pageBar = document.createElement(inTable ? "tr" : (inLi ? "li" : "div"));
        let upSpan = document.createElement("span");
        let downSpan = document.createElement("span");
        let pageText = document.createElement("a");
        let pageNum;
        pageBar.className = isHideBar ? "pagetual_pageBar hide" : "pagetual_pageBar";
        pageBar.id = "pagetual_pageBar" + curPage;
        pageBar.setAttribute("translate", "no");
        if (isPause) {
            pageBar.classList.add("stop");
        }
        pageBar.style.cssText = pageBarStyle;
        pageBar.title = i18n(isPause ? "enable" : "disable");
        upSpan.innerHTML = createHTML(upSvg);
        upSpan.children[0].style.cssText = upSvgCSS;
        upSpan.title = i18n("toTop");
        downSpan.innerHTML = createHTML(downSvg);
        downSpan.children[0].style.cssText = downSvgCSS;
        downSpan.title = i18n("toBottom");
        upSpan.style.cssText = initStyle;
        downSpan.style.cssText = initStyle;
        pageText.href = url;
        pageText.style.cssText = pageTextStyle;
        pageText.title = i18n("current");
        if (openInNewTab == 1) pageText.target = "_blank";
        pageBar.appendChild(upSpan);
        pageBar.appendChild(pageText);
        let touched = false;
        let touchBodyHandler = e => {
            touched = false;
            getBody(document).removeEventListener('touchstart', touchBodyHandler, { passive: false, capture: false });
        };
        pageText.addEventListener("touchstart", e => {
            if (touched) return;
            touched = true;
            pageText.style.pointerEvents = 'none';
            setTimeout(() => {
                pageText.style.pointerEvents = 'all';
            }, 250);
            getBody(document).addEventListener("touchstart", touchBodyHandler, { passive: false, capture: false });
        }, { passive: false, capture: false });
        if (ruleParser.nextTitle) {
            pageText.innerHTML = createHTML(ruleParser.nextTitle + " ");
            pageText.title = ruleParser.nextTitle;
        }
        if (ruleParser.curSiteRule.pageNum || pageNumReg.test(url)) {
            pageText.innerHTML = createHTML(pageText.innerHTML + i18n("page"));
            pageNum = document.createElement("span");
            let num = ruleParser.getPageNumFromUrl(url, curPage);
            pageNum.innerHTML = createHTML(num + "<i style='font-size: 0;'>&nbsp;</i>");
            pageNum.className = "pagetual_pageNum";
            pageNum.title = i18n("inputPageNum");
            pageNum.style.cssText = pageTextStyle;
            pageNum.style.cursor = "pointer";
            pageNum.style.color = "";
            pageNum.style.marginLeft = "5px";
            pageNum.addEventListener("click", e => {
                let pageInput = prompt(i18n("inputPageNum"), num || "1");
                if (pageInput) {
                    let localPageBar = document.querySelector("#pagetual_pageBar" + pageInput);
                    if (localPageBar) {
                        scrollToPageBar(localPageBar);
                    } else {
                        let pageLink = ruleParser.getLinkByPage(url, pageInput);
                        if (pageLink) {
                            _GM_openInTab(pageLink, {active:true});
                        }
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            });
            pageBar.appendChild(pageNum);
        } else {
            pageText.innerHTML = createHTML(pageText.innerHTML + i18n("page") + curPage + "<i style='font-size: 0;'>&nbsp;</i>");
        }
        let preBtn = document.createElement("span");
        preBtn.innerHTML = createHTML("∧");
        preBtn.title = i18n("prevPage");
        preBtn.className = "prevScreen";
        preBtn.style.cssText = "display: none;text-align: center;right: unset; float: left; width: 40px; background: rgba(240, 240, 240, 0.8); position: absolute; z-index: 9999999; box-shadow: rgb(0 0 0 / 50%) 0px -5px 5px; border-radius: 20px 20px 0 0; margin-top: -30px; ";
        let nextBtn = document.createElement("span");
        nextBtn.innerHTML = createHTML("∨");
        nextBtn.title = i18n("nextPage");
        nextBtn.className = "nextScreen";
        nextBtn.style.cssText = "display: none;text-align: center;right: unset; float: left; width: 40px; background: rgba(240, 240, 240, 0.8); position: absolute; z-index: 9999999; box-shadow: rgb(0 0 0 / 50%) 0px 5px 5px; border-radius: 0 0 20px 20px; margin-top: 30px; ";
        let localPage = curPage;
        preBtn.addEventListener("click", e => {
            e.stopPropagation();
            e.preventDefault();
            let prePageBar = document.querySelector("#pagetual_pageBar" + (localPage - 1));
            if (prePageBar) {
                scrollToPageBar(prePageBar);
            } else {
                let scrollTop = getBody(document).scrollTop || document.documentElement.scrollTop;
                targetY = scrollTop - (window.innerHeight || document.documentElement.clientHeight);
                window.scrollTo({ top: targetY, behavior: 'smooth'});
            }
        });
        nextBtn.addEventListener("click", e => {
            e.stopPropagation();
            e.preventDefault();
            let nextPageBar = document.querySelector("#pagetual_pageBar" + (localPage + 1));
            if (nextPageBar) {
                scrollToPageBar(nextPageBar);
            } else {
                scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
                targetY = scrollH || 9999999;
                window.scrollTo({ top: targetY, behavior: 'smooth'});
            }
        });
        if (!rulesData.hideBarArrow) {
            pageText.insertBefore(preBtn, pageText.firstChild);
            pageText.insertBefore(nextBtn, pageText.firstChild);
        }
        if (curForceIframe) {
            let bgRing = document.createElement("span");
            bgRing.className = "refreshRing";
            bgRing.style.display = "none";
            bgRing.innerHTML = createHTML(upSvg);
            pageText.title = "Refresh";
            pageText.appendChild(bgRing);
            pageText.addEventListener("click", e => {
                e.stopPropagation();
                if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
                e.preventDefault();
                let nextEle = pageBar && pageBar.nextElementSibling;
                if (nextEle && nextEle.name == 'pagetual-iframe') {
                    if (curForceIframe == nextEle) {
                        nextEle.setAttribute("loaded", "refresh");
                    }
                    nextEle.src = nextEle.src;
                }
            });
        } else if (rulesData.pageBarMenu) {
            pageText.addEventListener("click", e => {
                e.stopPropagation();
                if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
                e.preventDefault();
                picker.start();
            });
        }
        pageBar.appendChild(downSpan);
        if (forceState == 2) {
            pageBar.style.width = "99%";
        } else {
            let parentStyle = _unsafeWindow.getComputedStyle(example.parentNode);
            let parentWidth = example.parentNode.offsetWidth || parseInt(parentStyle.width);
            pageBar.style.width = parentWidth - parseInt(parentStyle.paddingLeft) - parseInt(parentStyle.paddingRight) - 10 + "px";
            pageBar.style.margin = '10px 5px';
            if (parentStyle.display == "grid" || parentStyle.display == "inline-grid") {
                pageBar.style.gridColumn = "1/-1";
            }
            if (inTable) {
                example = compareNodeName(example, ["tr", "tbody"]) ? example : example.nextElementSibling || example;
                if (compareNodeName(example, ["tbody"])) example = example.querySelector("tr");
                let nextTr = example;
                while (nextTr && nextTr.children.length == 0) nextTr = nextTr.nextElementSibling;
                if (nextTr) example = nextTr;
                let tdNum = 0;
                if (exampleStyle.display == "table-row") {
                    [].forEach.call(example.children, el => {
                        tdNum += el.colSpan || 1;
                    });
                } else {
                    [].forEach.call(example.children, el => {
                        if (compareNodeName(el, ["td", "th"])) {
                            tdNum += el.colSpan || 1;
                        }
                    });
                }
                pageBar.style.cssText = "";
                pageBar.style.display = "table-row";
                pageBar.style.backgroundColor = "unset";
                pageBar.style.lineHeight = "20px";
                pageBar.style.boxShadow = "";
                let td = document.createElement("td");
                td.colSpan = tdNum || 1;
                let inTd = document.createElement("div");
                inTd.style.cssText = pageBarStyle;
                inTd.style.display = "";
                inTd.className = pageBar.className;
                pageBar.className = "";
                inTd.appendChild(upSpan);
                inTd.appendChild(pageText);
                if (pageNum) inTd.appendChild(pageNum);
                inTd.appendChild(downSpan);
                td.appendChild(inTd);
                pageBar.appendChild(td);
            } else if (inLi) {
                example = compareNodeName(example, ["li"]) ? example : example.nextElementSibling || example;
                pageBar.style.opacity = 1;
                pageBar.style.display = getComputedStyle(example).display;
                pageBar.style.backgroundColor = "unset";
                pageBar.style.lineHeight = "20px";
                pageBar.style.boxShadow = "";
                pageBar.style.border = "";
                pageBar.style.width = "";
                pageBar.style.maxWidth = "unset";
                pageBar.style.flex = "auto";
                let inTd = document.createElement("div");
                inTd.style.cssText = pageBarStyle;
                inTd.style.display = "";
                inTd.style.margin = "0"
                inTd.style.padding = "0 0";
                inTd.style.textAlign = "center";
                inTd.style.minWidth = "150px";
                inTd.style.width = 'calc(100% - 20px)';
                inTd.className = pageBar.className;
                pageBar.className = "";
                inTd.appendChild(upSpan);
                inTd.appendChild(pageText);
                if (pageNum) inTd.appendChild(pageNum);
                inTd.appendChild(downSpan);
                if (pageBar.style.display === 'table-row') {
                    let td = document.createElement("td");
                    td.colSpan = example.children.length;
                    td.style.width = '100%';
                    td.appendChild(inTd);
                    pageBar.appendChild(td);
                } else {
                    inTd.style.width = '100%';
                    pageBar.appendChild(inTd);
                }
            }
        }

        upSpan.addEventListener("click", e => {
            getBody(document).scrollTop = 0;
            document.documentElement.scrollTop = 0;
            e.preventDefault();
            e.stopPropagation();
        });
        downSpan.addEventListener("click", e => {
            if (!e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                changeStop(true);
            }
            pageBar.title = i18n(isPause ? "enable" : "disable");
            scrollH = Math.max(document.documentElement.scrollHeight, getBody(document).scrollHeight);
            getBody(document).scrollTop = scrollH || 9999999;
            document.documentElement.scrollTop = scrollH || 9999999;
            e.preventDefault();
            e.stopPropagation();
        });
        pageBar.addEventListener("click", e => {
            changeStop(!isPause, true);
            pageBar.title = i18n(isPause ? "enable" : "disable");
        });
        ruleParser.insertElement(pageBar);
        ruleParser.runPageBar(pageBar);

        if (sideController.inited) {
            try {
                let observer = new IntersectionObserver(entries => {
                    if (entries[0].intersectionRatio > 0) {
                        sideController.pagenum.innerHTML = createHTML(localPage);
                    }
                });
                observer.observe(pageBar);
            } catch(e) {}
        }
        return pageBar;
    }

    async function waitForElement(sel, doc, maxTime) {
        if (!sel) return null;
        return new Promise((resolve) => {
            let passedTime = 0;
            let checkInv = setInterval(() => {
                let result = getElement(sel, doc, null, true);
                if (result) {
                    clearInterval(checkInv);
                    resolve(result);
                } else if (maxTime) {
                    passedTime += 100;
                    if (passedTime >= maxTime) {
                        clearInterval(checkInv);
                        resolve(result);
                    }
                }
            }, 100);
        });
    }

    async function clickAction(sel, doc) {
        let btn = await waitForElement(sel, doc);
        emuClick(btn, doc);
    }

    async function enterAction(sel, doc) {
        let btn = await waitForElement(sel, doc);
        let eventParam = { key: "Enter", keyCode: 13, bubbles: true };
        let event = new KeyboardEvent('keydown', eventParam);
        btn.dispatchEvent(event);
        event = new KeyboardEvent('keyup', eventParam);
        btn.dispatchEvent(event);
        event = new KeyboardEvent('keypress', eventParam);
        btn.dispatchEvent(event);
    }

    async function inputAction(sel, v, doc) {
        let input = await waitForElement(sel, doc);
        let event = new Event('focus', { bubbles: true });
        input.dispatchEvent(event);
        let lastValue = input.value;
        if (input.nodeName.toUpperCase() == "INPUT") {
            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            nativeInputValueSetter.call(input, v);
        } else if (input.nodeName.toUpperCase() == "TEXTAREA") {
            var nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            nativeTextareaValueSetter.call(input, v);
        } else {
            input.innerHTML = createHTML(v);
        }
        event = new Event('input', { bubbles: true });
        let tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
        debug(input, `input ${sel}`);
    }

    function emuClick(btn, doc) {
        if (!doc) doc = document;
        let curScroll = getBody(doc).scrollTop || doc.documentElement.scrollTop;
        let orgHref = btn.getAttribute('href');
        if (orgHref && orgHref.replace(location.origin + location.pathname, "").indexOf("#") === 0) {
            let hashAction = e => {
                e.preventDefault();
                getBody(doc).scrollTop = curScroll;
                doc.documentElement.scrollTop = curScroll;
                btn.removeEventListener('click', hashAction, false);
            };
            btn.addEventListener('click', hashAction, false);
        }
        if (!PointerEvent) return btn.click();
        let eventParam = {
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
        let mouseEvent = new PointerEvent("mousedown", eventParam);
        btn.dispatchEvent(mouseEvent);
        mouseEvent = new PointerEvent("mouseup", eventParam);
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
            if (touchEvent) {
                try {
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
                } catch (err) {}
                ele.dispatchEvent(touchEvent);
            }
        }
        dispatchTouchEvent(btn, "touchstart");
        dispatchTouchEvent(btn, "touchend");

        btn.click();
    }

    function emuInput(input, v) {
        let result = false;
        if (!input) return true;
        let event = new Event('focus', { bubbles: true });
        input.dispatchEvent(event);
        let lastValue = input.value;
        if (input.type == 'file') {
            let file = v;
            let blob = new Blob([file], {
                type: 'text/plain'
            });
            file = new File([blob], 'noname.txt', { type: blob.type });
            let dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;
            v = "c:/fakepath/fakefile";
        } else if (/INPUT/i.test(input.nodeName)) {
            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            nativeInputValueSetter.call(input, v);
        } else if (/SELECT/i.test(input.nodeName)) {
            var nativeSelectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value").set;
            nativeSelectValueSetter.call(input, v);
        } else if (input.nodeName.toUpperCase() == "TEXTAREA") {
            var nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            nativeTextareaValueSetter.call(input, v);
        } else {
            input.innerHTML = createHTML(v);
        }
        event = new Event('input', { bubbles: true });
        let tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
        return result;
    }

    var failFromIframe = 0;
    var inCors = false;
    var checkRemoveIntv;
    function requestFromIframe(url, callback){
        if (location.protocol === 'https:' && !/^https:/.test(url)) {
            ruleParser.noValidContent(url);
        }
        url = url.indexOf('=') == -1 ? url.replace(/#[^#]*/,"") : url;
        let iframe = document.createElement('iframe');
        iframe.name = 'pagetual-iframe';
        iframe.width = '100%';
        iframe.height = '1000';
        iframe.frameBorder = '0';
        if (ruleParser.curSiteRule.sandbox != false) {
            iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
        }
        iframe.style.cssText = 'margin:0!important;padding:0!important;visibility:hidden!important;flex:0;opacity:0!important;pointer-events:none!important;position:fixed;top:0px;left:0px;z-index:-2147483647;';
        let waitTime = 100, checkEval;
        ruleParser.runWait((_checkEval, _waitTime) => {
            if (_checkEval) {
                checkEval = _checkEval;
            }
            if (_waitTime) {
                waitTime = _waitTime;
            }
        });
        if (checkRemoveIntv) clearInterval(checkRemoveIntv);
        checkRemoveIntv = setInterval(() => {
            if (!iframe || !getBody(document).contains(iframe)) {
                clearInterval(checkRemoveIntv);
                loadPageOver();
            }
        }, 500);
        let loadedHandler = async e => {
            if (e.data != 'pagetual-iframe:DOMLoaded' && e.type != 'load') return;
            clearInterval(checkRemoveIntv);
            window.removeEventListener('message', loadedHandler, false);
            iframe.removeEventListener('load', loadedHandler, false);
            let pageEleTryTimes = 0;
            async function checkIframe() {
                if (urlChanged || isPause) {
                    return callback(false, false);
                }
                try {
                    let doc = iframe.contentDocument || iframe.contentWindow.document;
                    if (checkEval && !await checkEval(doc)) {
                        setTimeout(() => {
                            checkIframe();
                        }, waitTime);
                        return;
                    } else {
                        let preCode = ruleParser.curSiteRule.pagePre, eles = null;
                        if (preCode) {
                            try {
                                let preResult;
                                if (typeof preCode == 'function') {
                                    preResult = await preCode(doc.documentElement.innerHTML, doc);
                                } else if (preCode.length == 2) {
                                    preResult = doc.documentElement.innerHTML.replace(new RegExp(preCode[0], "gi"), preCode[1]);
                                } else {
                                    preResult = await new AsyncFunction("response", "doc", '"use strict";' + preCode)(doc.documentElement.innerHTML, doc);
                                }
                                if (typeof preResult !== "undefined") {
                                    if (typeof preResult === "string") {
                                        doc.documentElement.innerHTML = preResult;
                                    } else eles = preResult;
                                }
                            } catch(e) {
                                debug(e);
                            }
                        }
                        let base = doc.querySelector("base");
                        ruleParser.basePath = (base && base.href) || url;
                        if (eles === null) eles = ruleParser.getPageElement(doc, iframe.contentWindow, pageEleTryTimes < 25);
                        if (eles && eles.length > 0) {
                            await ruleParser.hookUrl(doc);
                            await callback(doc, eles);
                        } else if (pageEleTryTimes++ < 100) {
                            getBody(doc).scrollTop = 9999999;
                            if (doc.documentElement) {
                                doc.documentElement.scrollTop = 9999999;
                            }
                            setTimeout(() => {
                                checkIframe();
                            }, waitTime);
                            return;
                        } else {
                            if (failFromIframe++ > 2) {
                                failFromIframe = 0;
                                debug("Stop as failFromIframe");
                                changeStop(true);
                                callback(false, false);
                            } else {
                                ruleParser.noValidContent(url);
                                callback(false, false);
                            }
                        }
                    }
                } catch(e) {
                    inCors = true;
                    if (forceState === 3) {
                        debug("Stop as cors");
                        isPause = true;
                    }
                    if (!ruleParser.curSiteRule.pageElement) {
                        ruleParser.curSiteRule.pageElement = allOfBody;
                        ruleParser.getInsert(true);
                    }
                    ruleParser.curSiteRule.action = 0;
                    ruleParser.nextLinkHref = url;
                    callback(false, false);
                    nextPage();
                }
                if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
            }
            setTimeout(() => {
                checkIframe();
            }, waitTime);
        };
        let code = ruleParser.curSiteRule.iframeInit;
        if (code) {
            let checkReady = setInterval(() => {
                let doc;
                try {
                    doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
                } catch(e) {
                    clearInterval(checkReady);
                    return;
                }
                if (doc) {
                    clearInterval(checkReady);
                    try {
                        Function('win', 'iframe', '"use strict";' + code)(iframe.contentWindow, iframe);
                    } catch(e) {
                        debug(e);
                    }
                }
            }, 50);
        }
        window.addEventListener('message', loadedHandler, false);
        iframe.addEventListener('load', loadedHandler, false);
        iframe.src = url;
        try {
            getBody(document).appendChild(iframe);
        } catch (e) {
            return callback(false, false);
        }
    }

    var emuIframe, lastActiveUrl, orgContent, meetCors = false;
    function emuPage(callback) {
        let orgPage = null, preContent = null, iframeDoc, checkTimes = 0, loadmoreBtn, pageEle, nextLink, loadmoreEnd = false, waitTimes = 80, changed = false, checkNext = 0;
        let activeClass = "active";
        if (typeof ruleParser.curSiteRule.activeClass !== 'undefined') {
            activeClass = ruleParser.curSiteRule.activeClass;
        }
        function returnFalse(log) {
            if (curPage > 1) {
                ruleParser.reachedLastPage();
            } else {
                sideController.remove();
            }
            debug(log);
            isPause = true;
            callback(false, false);
            if (emuIframe && emuIframe.parentNode) {
                emuIframe.parentNode.removeChild(emuIframe);
                emuIframe = null;
            }
        }
        async function cloneStatus() {
            if (!iframeDoc) return;
            let inputs = document.querySelectorAll("input:not([type=button],[type=image],[type=reset],[type=submit])");
            let selectOptions = document.querySelectorAll("select>option");
            [...inputs].forEach(input => {
                let sel = geneSelector(input, true, true);
                let mirrorEle = iframeDoc.querySelector(sel);
                if (!mirrorEle) return;
                emuInput(mirrorEle, input.value);
            });
            [...selectOptions].forEach(option => {
                let sel = geneSelector(option, true, true);
                let mirrorEle = iframeDoc.querySelector(sel);
                if (!mirrorEle) return;
                let selected = option.selected;
                mirrorEle.selected = !!selected;
                mirrorEle.parentNode.dispatchEvent(new Event('change'));
            });
            if (activeClass) {
                let actives = document.querySelectorAll("." + activeClass);
                for (let active of actives) {
                    let sel = geneSelector(active, true, true).replace("." + activeClass, "");
                    let mirrorEle = await waitForElement(sel, iframeDoc, 5000);
                    if (!mirrorEle || mirrorEle.classList.contains(activeClass)) {
                        continue;
                    }
                    emuClick(mirrorEle);
                    await sleep(300);
                }
            }
        }
        async function checkPage() {
            if (isPause) return loadPageOver();
            try {
                iframeDoc = emuIframe.contentDocument || emuIframe.contentWindow.document;
            } catch(e) {
                returnFalse("Stop as cors");
                return;
            }
            getBody(iframeDoc).scrollTop = 9999999;
            if (iframeDoc.documentElement) {
                iframeDoc.documentElement.scrollTop = 9999999;
            }

            let waitTime = 200, checkEval;
            ruleParser.runWait((_checkEval, _waitTime) => {
                if (_checkEval) {
                    checkEval = _checkEval;
                }
                if (_waitTime) {
                    waitTime = _waitTime;
                }
            });

            if (!orgPage) {
                if (!loadmoreEnd) {
                    loadmoreBtn = getLoadMore(iframeDoc);
                    if (loadmoreBtn && isVisible(loadmoreBtn, emuIframe.contentWindow)) {
                        emuClick(loadmoreBtn, iframeDoc);
                        let intv = setInterval(() => {
                            loadmoreBtn = getLoadMore(iframeDoc);
                            if (!loadmoreBtn || !getBody(document).contains(loadmoreBtn) || !isVisible(loadmoreBtn, emuIframe.contentWindow)) {
                                clearInterval(intv);
                                loadmoreEnd = true;
                                setTimeout(() => {
                                    checkPage();
                                }, 500);
                            } else if (isInViewPort(loadmoreBtn)) {
                                emuClick(loadmoreBtn, iframeDoc);
                            }
                        }, 200);
                        return;
                    } else {
                        loadmoreEnd = true;
                    }
                }
                if (checkEval && !await checkEval(iframeDoc)) {
                    waitTimes = 50;
                    setTimeout(() => {
                        checkPage();
                    }, waitTime);
                    return;
                } else {
                    if (!nextLink || !nextLink.offsetParent) nextLink = await ruleParser.getNextLink(iframeDoc, true);
                    if (nextLink) pageEle = ruleParser.getPageElement(iframeDoc, emuIframe.contentWindow, true);
                    if (!pageEle || pageEle.length == 0 || !nextLink) {
                        getBody(iframeDoc).scrollTop = 9999999;
                        if (iframeDoc.documentElement) {
                            iframeDoc.documentElement.scrollTop = 9999999;
                        }
                        if (waitTimes-- > 0) {
                            setTimeout(() => {
                                checkPage();
                            }, waitTime);
                            return;
                        }
                    }
                }
                if (!pageEle || pageEle.length == 0) {
                    returnFalse("Stop as no page when emu");
                    return;
                }
                pageEle = [].filter.call(pageEle, ele => {return ele && !compareNodeName(ele, ["style", "script", "meta"])});
                if (compareNodeName(pageEle[0], ["ul"]) || pageEle.length == 1) pageEle = pageEle[0];
                else if (pageEle[0].parentNode == pageEle[1].parentNode) {
                    pageEle = pageEle[0].parentNode;
                } else {
                    pageEle = pageEle[0];
                }
                if (ruleParser.curSiteRule.smart && orgContent != pageEle.innerHTML) {
                    orgContent = pageEle.innerHTML;
                    if (waitTimes-- > 0) {
                        setTimeout(() => {
                            checkPage();
                        }, 500);
                        return;
                    }
                }
                orgPage = pageEle;
                if (nextLink) {
                    if (compareNodeName(orgPage, ["img"])) {
                        if (!ruleParser.curSiteRule.lazyImgSrc) ruleParser.curSiteRule.lazyImgSrc = "0";
                        if (orgPage.src) {
                            orgContent = orgPage.src;
                        } else {
                            setTimeout(() => {
                                checkPage();
                            }, 500);
                            return;
                        }
                    } else {
                        orgContent = orgPage.innerHTML;
                    }
                    preContent = orgContent;
                    if (!isVisible(nextLink, emuIframe.contentWindow)) {
                        returnFalse("Stop as next hide when emu");
                    } else {
                        emuClick(nextLink, iframeDoc);
                        setTimeout(() => {
                            checkPage();
                        }, 500);
                    }
                } else {
                    returnFalse("Stop as no next when emu");
                }
                return;
            }
            if (!ruleParser.checkStopSign(nextLink, iframeDoc)) {
                return returnFalse("Stop as stopSign");
            }
            if (checkTimes++ > 200) {
                returnFalse("Stop as timeout when emu");
                return;
            }
            if (checkEval && !await checkEval(iframeDoc)) {
                checkTimes = 0;
                setTimeout(() => {
                    checkPage();
                }, waitTime);
                return;
            }
            let eles = ruleParser.getPageElement(iframeDoc, emuIframe.contentWindow, true), checkItem;
            if (eles && eles.length > 0) {
                eles = [].filter.call(eles, ele => {return ele && !compareNodeName(ele, ["style", "script", "meta"])});
                if (compareNodeName(eles[0], ["ul"]) || eles.length == 1) checkItem = eles[0];
                else if (eles[0].parentNode == eles[1].parentNode) {
                    checkItem = eles[0].parentNode;
                } else {
                    checkItem = eles[0];
                }
            }
            if (!checkItem) {
                setTimeout(() => {
                    checkPage();
                }, waitTime);
            } else {
                let checkInner;
                if (compareNodeName(checkItem, ["img"])) {
                    if (checkItem.src) {
                        checkInner = checkItem.src;
                    } else {
                        setTimeout(() => {
                            checkPage();
                        }, waitTime);
                        return;
                    }
                } else {
                    checkInner = checkItem.innerHTML;
                }
                if (orgPage != checkItem || checkInner != preContent) {
                    changed = true;
                    checkNext = 0;
                    orgPage = checkItem;
                    preContent = checkInner;
                    setTimeout(() => {
                        checkPage();
                    }, ruleParser.curSiteRule.smart ? 1000 : 500);
                } else if (changed) {
                    checkTimes = 0;
                    if (orgContent == preContent && (ruleParser.curSiteRule.smart || ruleParser.curSiteRule.stopSame)) {
                        returnFalse("Stop as same content");
                    } else {
                        orgContent = preContent;
                        await ruleParser.hookUrl(iframeDoc);
                        if (!nextLink || !nextLink.offsetParent) {
                            nextLink = await ruleParser.getNextLink(iframeDoc, true);
                        }
                        if (!nextLink && ++checkNext < 5) {
                            setTimeout(() => {
                                checkPage();
                            }, waitTime);
                        }
                        callback(iframeDoc, eles);
                    }
                } else {
                    if (checkTimes % 10 === 5) {
                        if (!nextLink || !nextLink.offsetParent) {
                            nextLink = await ruleParser.getNextLink(iframeDoc, true);
                        }
                        if (nextLink) {
                            emuClick(nextLink, iframeDoc);
                        }
                    }
                    setTimeout(() => {
                        checkPage();
                    }, waitTime);
                }
            }
        }
        if (!emuIframe) {
            let loaded = false;
            emuIframe = document.createElement('iframe');
            emuIframe.name = 'pagetual-iframe';
            let notSetSandbox = typeof ruleParser.curSiteRule.sandbox == 'undefined';
            if (notSetSandbox || ruleParser.curSiteRule.sandbox == true) {
                emuIframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
            } else if (ruleParser.curSiteRule.sandbox) {
                emuIframe.sandbox = ruleParser.curSiteRule.sandbox;
            }
            emuIframe.width = '100%';
            emuIframe.height = '100%';
            emuIframe.frameBorder = '0';
            emuIframe.style.cssText = 'margin:0!important;padding:0!important;flex:0;opacity:0!important;pointer-events:none!important;position:fixed;top:0px;left:0px;z-index:-2147483647;';
            emuIframe.addEventListener("load", e => {
                try {
                    iframeDoc = emuIframe.contentDocument || emuIframe.contentWindow.document;
                } catch(e) {
                    if (e.message && e.message.indexOf("cross-origin") != -1 && notSetSandbox && emuIframe.hasAttribute("sandbox")) {
                        emuIframe.removeAttribute("sandbox");
                        meetCors = true;
                        callback(false, false);
                        if (ruleParser.curSiteRule.smart) {
                            ruleParser.findNoNext();
                        }
                    } else {
                        returnFalse("Stop as cors");
                    }
                    return;
                }
                setTimeout(async () => {
                    if (meetCors && ruleParser.curSiteRule.smart) {
                        ruleParser.smartRules = ruleParser.smartRules.filter(item => {return item && item.url !== ruleParser.curSiteRule.url;});
                        storage.setItem("smartRules", ruleParser.smartRules);
                    }
                    meetCors = false;
                    let code = ruleParser.curSiteRule.init;
                    if (code) {
                        try {
                            await new AsyncFunction('doc','win','iframe','click', 'enter', 'input', 'sleep', '"use strict";' + code)(iframeDoc, emuIframe.contentWindow, emuIframe, async sel => {await clickAction(sel, iframeDoc)}, async sel => {await enterAction(sel, iframeDoc)}, async (sel, v) =>{await inputAction(sel, v, iframeDoc)}, async time => {await sleep(time)});
                        } catch(e) {
                            debug(e);
                        }
                    } else {
                        let refreshByClickSel = ruleParser.curSiteRule.refreshByClick;
                        if (iframeDoc && refreshByClickSel) {
                            let clickBtn = await waitForElement(refreshByClickSel, iframeDoc);
                            await sleep(500);
                            await cloneStatus();
                            emuClick(clickBtn, iframeDoc);
                            await sleep(500);
                        } else {
                            await cloneStatus();
                            await sleep(500);
                        }
                    }
                    if (loaded) return;
                    loaded = true;
                    checkPage();
                }, 500);
            });
            let code = ruleParser.curSiteRule.iframeInit;
            if (code) {
                let checkReady = setInterval(() => {
                    try {
                        iframeDoc = emuIframe.contentDocument || (emuIframe.contentWindow && emuIframe.contentWindow.document);
                    } catch(e) {
                        clearInterval(checkReady);
                        return;
                    }
                    if (iframeDoc) {
                        clearInterval(checkReady);
                        try {
                            Function('win', 'iframe', '"use strict";' + code)(emuIframe.contentWindow, emuIframe);
                        } catch(e) {
                            debug(e);
                        }
                    }
                }, 50);
            }
            if (!lastActiveUrl) lastActiveUrl = location.href;
            emuIframe.src = lastActiveUrl;
            getBody(document).appendChild(emuIframe);
        } else {
            if (emuIframe.src != lastActiveUrl || meetCors) {
                emuIframe.src = lastActiveUrl;
                return;
            }
            checkPage();
        }
    }

    var scrollToResizeInited = false;
    var resizePool = [];
    var scrollingToResize = false;

    function isTouchViewPort(element) {
        const viewWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        const {
            top,
            right,
            bottom,
            left,
        } = element.getBoundingClientRect();

        return (
            top < viewHeight &&
            left < viewWidth &&
            right > 0 &&
            bottom > 0
        );
    }

    function resizeIframe(iframe, frameDoc, pageEle) {
        if (targetY >= 0) {
            window.scrollTo({ top: targetY, behavior: 'instant'});
            targetY = -1;
        }
        let curScroll = getBody(document).scrollTop || document.documentElement.scrollTop;
        if (ruleParser.curSiteRule.smart || forceState === 2) {
            let height = (getBody(frameDoc).scrollHeight || getBody(frameDoc).offsetHeight || 500);
            if (!iframe.style.height || parseInt(iframe.style.height) === 0 || height - parseInt(iframe.style.height) > window.innerHeight) {
                iframe.style.height = height + "px";
                iframe.style.minHeight = iframe.style.height;
            }
            iframe.style.width = "100%";
            frameDoc.documentElement.scrollTop = 0;
            frameDoc.documentElement.scrollLeft = 0;
        } else {
            if (pageEle) {
                if (document.body.scrollWidth) frameDoc.documentElement.style.width = document.body.scrollWidth + "px";
                let fitWidth = ruleParser.curSiteRule.fitWidth !== false;
                let targetElement = pageEle[0];
                if (!targetElement) return;
                if (pageEle.length > 1) {
                    targetElement = targetElement.parentNode;
                }
                let scrollHeight = targetElement.scrollHeight || targetElement.offsetHeight || 500;
                iframe.style.height = scrollHeight + "px";
                let scrollTop = 0, scrollLeft = 0;
                getBody(frameDoc).scrollTop = 0;
                getBody(frameDoc).scrollLeft = 0;
                while (targetElement && targetElement.offsetParent) {
                    targetElement.offsetParent.scrollTop = targetElement.offsetTop;
                    if (targetElement.offsetParent.scrollTop == 0) {
                        scrollTop += targetElement.offsetTop;
                    }
                    if (fitWidth) {
                        targetElement.offsetParent.scrollLeft = targetElement.offsetLeft;
                        if (targetElement.offsetParent.scrollLeft == 0) {
                            scrollLeft += targetElement.offsetLeft;
                        }
                    }
                    targetElement = targetElement.offsetParent;
                }
                frameDoc.documentElement.scrollTop = scrollTop;
                frameDoc.documentElement.scrollLeft = scrollLeft;
                if (frameDoc.documentElement.scrollTop == 0 && frameDoc.documentElement.scrollLeft == 0) {
                    getBody(frameDoc).scrollTop += scrollTop;
                    getBody(frameDoc).scrollLeft += scrollLeft;
                }
                if (!fitWidth && iframe.style.marginLeft == '0px') {
                    iframe.style.width = "100vw";
                    iframe.style.maxWidth = "100vw";
                    iframe.style.minWidth = "100vw";
                    var cWidth = document.body.clientWidth || document.documentElement.clientWidth;
                    var iWidth = window.innerWidth;
                    iframe.style.marginLeft = -iframe.getBoundingClientRect().left - (iWidth - cWidth) / 2 + "px";
                }
            }
        }
        let newScroll = getBody(document).scrollTop || document.documentElement.scrollTop;
        if (newScroll != curScroll) {
            getBody(document).scrollTop = curScroll;
            document.documentElement.scrollTop = curScroll;
        }
    }

    function scrollToResize(e) {
        if (scrollingToResize) return;
        else {
            scrollingToResize = true;
            let resizeHandler = () => {
                let touched = 0;
                for (let i = 0; i < resizePool.length; i++) {
                    let resizeArr = resizePool[i];
                    let iframe = resizeArr[1]();
                    if (isTouchViewPort(iframe)) {
                        touched++;
                        let pageEle = resizeArr[0]();
                        let frameDoc = resizeArr[2]();
                        resizeIframe(iframe, frameDoc, pageEle);
                    } else if (touched) {
                        if (touched == 1) {
                            let pageEle = resizeArr[0]();
                            let frameDoc = resizeArr[2]();
                            resizeIframe(iframe, frameDoc, pageEle);
                        }
                        break;
                    } else if (!iframe.parentNode) {
                        resizePool.splice(i, 1);
                        break;
                    }
                }
            };
            setTimeout(() => {
                scrollingToResize = false;
            }, 300);
            resizeHandler();
        }
    }

    var curForceIframe;
    function forceIframe(url, callback) {
        url = url.indexOf('=') == -1 ? url.replace(/#[^#]*/,"") : url;
        let curIframe = document.createElement('iframe'), iframeDoc, pageElement = null, inAction = true;
        let loadedHandler = () => {
            let getPageEle = () => {
                if (ruleParser.curSiteRule.smart) {
                    return null;
                } else {
                    if (!pageElement || pageElement.length === 0 || !pageElement[0].offsetParent) {
                        pageElement = ruleParser.getPageElement(iframeDoc, curIframe.contentWindow);
                    }
                    return pageElement;
                }
            };
            resizeIframe(curIframe, iframeDoc, getPageEle());
            let loaded = curIframe.getAttribute("loaded");
            if (loaded == "true") {
                return;
            }
            curIframe.setAttribute("loaded", "true");
            let getIframe = () => {
                return curIframe;
            };
            let getFrameDoc = () => {
                return iframeDoc;
            };
            ruleParser.insertPage(iframeDoc, [], url, ele => {
                callback(curIframe, loaded == "refresh");
                inAction = false;
            }, true);
            if (!loaded) {
                resizePool.push([getPageEle, getIframe, getFrameDoc]);
            }
        };
        let checkIframeTimer = setInterval(() => {
            if (!curIframe.parentNode) {
                clearInterval(checkIframeTimer);
                return curIframe.getAttribute("loaded") == "true" || callback(false);
            }
        }, 500);
        let code = ruleParser.curSiteRule.iframeInit;
        if (code) {
            let checkReady = setInterval(() => {
                try {
                    iframeDoc = curIframe.contentDocument || (curIframe.contentWindow && curIframe.contentWindow.document);
                } catch(e) {
                    clearInterval(checkReady);
                    return;
                }
                if (iframeDoc) {
                    clearInterval(checkReady);
                    try {
                        Function('win', 'iframe', '"use strict";' + code)(curIframe.contentWindow, curIframe);
                    } catch(e) {
                        debug(e);
                    }
                }
            }, 50);
        }
        let waitTime = 300, checkEval;
        ruleParser.runWait((_checkEval, _waitTime) => {
            if (_checkEval) {
                checkEval = _checkEval;
            }
            if (_waitTime) {
                waitTime = _waitTime;
            }
        });
        async function checkIframe() {
            if (checkEval && !await checkEval(iframeDoc)) {
                setTimeout(() => {
                    checkIframe();
                }, waitTime);
                return;
            }
            loadedHandler();
        }
        curIframe.name = 'pagetual-iframe';
        curIframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
        curIframe.frameBorder = '0';
        curIframe.scrolling = "no";
        curIframe.style.cssText = 'display: block; visibility: visible; float: none; clear: both; width: 100%; height: 0; background: initial; border: 0px; border-radius: 0px; margin: 0px; padding: 0px; z-index: 2147483645;content-visibility: auto;contain-intrinsic-size: auto 300px;';
        curIframe.addEventListener("load", async e => {
            clearInterval(checkIframeTimer);
            if (isPause) return callback(false);
            try {
                iframeDoc = curIframe.contentDocument || curIframe.contentWindow.document;
            } catch(e) {
                debug("Stop as cors");
                isPause = true;
                callback(false);
                return;
            }
            let css;
            if (rulesData.customCss && ruleParser.curSiteRule.css) {
                let globalCssArr = rulesData.customCss.split("inIframe:");
                let ruleCssArr = ruleParser.curSiteRule.css.split("inIframe:");
                let mainCss = globalCssArr[0] + ruleCssArr[0], inCss = (globalCssArr[1] || "") + (ruleCssArr[1] || "");
                css = mainCss + (inCss ? ("inIframe:" + inCss) : "");
            } else {
                css = ruleParser.curSiteRule.css || rulesData.customCss;
            }
            if (css) {
                let cssArr = css.split("inIframe:");
                if (cssArr && cssArr.length > 1) {
                    let styleEle = iframeDoc.createElement("style");
                    styleEle.innerHTML = cssArr[1];
                    iframeDoc.head.appendChild(styleEle);
                }
            }
            curIframe.style.height = "";
            checkIframe();
            iframeDoc.addEventListener('wheel', e => {
                document.dispatchEvent(new Event('wheel'));
            }, true);
        });
        let checkTimes = 0, findPageEle = false;
        let forceRefresh = e => {
            if (inAction || !iframeDoc) return;
            inAction = true;
            let foundNext = () => {
                document.removeEventListener("scroll", forceRefresh);
            }
            setTimeout(async () => {
                inAction = false;
                if (!ruleParser.nextLinkHref && !isPause) {
                    checkTimes++;
                    await ruleParser.getNextLink(iframeDoc, true);
                    if (ruleParser.nextLinkHref) {
                        foundNext();
                        if (isLoading) isLoading = false;
                    } else if (checkTimes >= 10) {
                        foundNext();
                    } else if (checkTimes >= 3 && !findPageEle) {
                        if (!pageElement) pageElement = ruleParser.getPageElement(iframeDoc, curIframe.contentWindow);
                        if (!pageElement) {
                            inAction = true;
                            curIframe.contentWindow.location.reload();
                        } else {
                            findPageEle = true;
                        }
                    }
                } else {
                    foundNext();
                }
            }, 100);
        };
        document.addEventListener("scroll", forceRefresh);
        curIframe.src = url;
        curForceIframe = curIframe;
        let insert = ruleParser.getInsert();
        let body = getBody(document);
        let curScroll = body.scrollTop || document.documentElement.scrollTop;
        if (forceState == 2) {
            document.documentElement.appendChild(loadingDiv);
            body.appendChild(curIframe);
            let bodyStyle = getComputedStyle(body);
            if (bodyStyle.display == "flex" || bodyStyle.display == "inline-flex") {
                body.style.flexDirection = "column";
            }
        } else {
            ruleParser.insertElement(curIframe);
        }
        body.scrollTop = curScroll;
        document.documentElement.scrollTop = curScroll;

        if (!scrollToResizeInited) {
            scrollToResizeInited = true;
            document.addEventListener("scroll", scrollToResize);
        }
        return curIframe;
    }

    function loadPageOver() {
        isLoading = false;
        stopScroll = true;
        setTimeout(() => {stopScroll = false;}, 300);
        if (loadingDiv.parentNode) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
        if (rate !== 1 && !clickMode) {
            setTimeout(() => {
                if (distToBottom() < bottomGap) {
                    nextPage();
                }
            }, 1);
        }
        if (sideController.inited) {
            sideController.frame.classList.remove("loading");
        }
    }

    function checkAutoLoadNum() {
        if (autoLoadNum >= 0) {
            if (autoLoadNum !== 0 && --autoLoadNum === 0) {
                autoLoadNum = -1;
            } else {
                setTimeout(() => nextPage(), 1);
            }
        }
    }

    async function nextPage() {
        if (isPause || isLoading || forceState === 1) return;
        if (ruleParser.curSiteRule.delay) {
            try {
                let checkDelay = ((typeof ruleParser.curSiteRule.delay === 'function') ? ruleParser.curSiteRule.delay : Function('"use strict";' + ruleParser.curSiteRule.delay))();
                if (!checkDelay) return;
            } catch(e) {
                debug(e);
            }
        }
        let nextLink = ruleParser.nextLinkHref;
        if (!nextLink) {
            isLoading = true;
            if (curPage === 1) {
                await ruleParser.getNextLink(document, true);
                nextLink = ruleParser.nextLinkHref;
            }
            if (!nextLink) {
                if (curPage === 1) {
                    if (ruleParser.curSiteRule.pinUrl) {
                        setTimeout(() => {isLoading = false;}, 500);
                    } else if (tryTimes++ < 5) {
                        setTimeout(() => {isLoading = false;}, 1000);
                    } else {
                        ruleParser.findNoNext();
                    }
                } else if (!showedLastPageTips) {
                    ruleParser.reachedLastPage();
                    showedLastPageTips = true;
                }
                return;
            }
            isLoading = false;
        }
        showedLastPageTips = false;
        let pvGallery = document.querySelector("span.pv-gallery-container");
        if (pvGallery && pvGallery.style.display !== "none") return;
        let insert = ruleParser.getInsert();
        if (insert) {
            if (curPage === 1) {
                initView();
            }
            /*if (curPage == 1) {
                window.postMessage({
                    command: 'pagetual.insert'
                }, '*');
            }*/
            let isJs = ruleParser.curSiteRule.action == 3 || ruleParser.hrefIsJs(nextLink);
            if (!isJs) {
                emuIframe = null;
                lastActiveUrl = nextLink;
                if (location.protocol === "https:" && /^http:/.test(nextLink)) {
                    nextLink = nextLink.replace(/^http/, "https");
                }
            }
            isLoading = true;
            if (curPage !== 1 || !isJs || !ruleParser.curSiteRule.smart) {
                ruleParser.beginLoading(loadingDiv);
            } else {
                if (sideController.inited) {
                    sideController.frame.classList.add("loading");
                }
            }
            let sleep = ruleParser.curSiteRule.sleep || 0;
            setTimeout(() => {
                if (ruleParser.curSiteRule.pageElementByJs) {
                    var over = eles => {
                        if (urlChanged || isPause) {
                            loadPageOver();
                            return;
                        }
                        if (eles) {
                            ruleParser.insertPage(document, eles, nextLink, () => {
                                createPageBar(nextLink);
                                checkAutoLoadNum();
                            }, true);
                        } else {
                            debug("Stop as no page when get by js");
                            isPause = true;
                            loadPageOver();
                        }
                    };
                    try {
                        ((typeof ruleParser.curSiteRule.pageElementByJs === 'function') ? ruleParser.curSiteRule.pageElementByJs : Function("over", "pageNum",'"use strict";' + ruleParser.curSiteRule.pageElementByJs))(over, curPage);
                    } catch(e) {
                        debug(e);
                    }
                } else if ((forceState === 2 || ruleParser.curSiteRule.action == 2) && !isJs) {
                    forceIframe(nextLink, (iframe, refresh) => {
                        if (urlChanged || isPause) {
                            loadPageOver();
                            return;
                        }
                        if (!refresh) {
                            let pageBar = createPageBar(nextLink);
                            if (pageBar && iframe && iframe.parentNode) iframe.parentNode.insertBefore(pageBar, iframe);
                        }
                        loadPageOver();
                        checkAutoLoadNum();
                    });
                } else if ((forceState === 3 || ruleParser.curSiteRule.action == 1) && !isJs) {
                    requestFromIframe(nextLink, async (doc, eles) => {
                        if (urlChanged || isPause) {
                            loadPageOver();
                            return;
                        }
                        if (eles) {
                            await ruleParser.insertPage(doc, eles, nextLink, () => {
                                createPageBar(nextLink);
                                checkAutoLoadNum();
                            }, true);
                        } else {
                            loadPageOver();
                            if (autoLoadNum >= 0) {
                                setTimeout(() => nextPage(), 2000);
                            }
                        }
                    });
                } else {
                    if (!isJs) {
                        requestDoc(nextLink, (eles) => {
                            if (urlChanged || isPause) {
                                loadPageOver();
                                return;
                            }
                            if (eles) {
                                createPageBar(nextLink);
                                checkAutoLoadNum();
                            } else {
                                loadPageOver();
                                if (autoLoadNum >= 0) {
                                    setTimeout(() => nextPage(), 2000);
                                }
                            }
                        });
                    } else {
                        emuPage((doc, eles) => {
                            if (urlChanged || isPause) {
                                loadPageOver();
                                return;
                            }
                            if (eles) {
                                ruleParser.insertPage(doc, eles, "", () => {
                                    createPageBar(nextLink);
                                    checkAutoLoadNum();
                                }, true);
                            } else {
                                loadPageOver();
                                if (autoLoadNum >= 0) {
                                    setTimeout(() => nextPage(), 2000);
                                }
                            }
                        });
                    }
                }
            }, sleep);
        }
    }

    function init() {
        if (document.readyState === 'loading' || document.readyState === 'uninitialized') {
            let domReady = e => {
                initRules(() => {
                    initPage();
                });
                document.removeEventListener("DOMContentLoaded", domReady, false);
            };
            document.addEventListener("DOMContentLoaded", domReady, false);
        } else {
            initRules(() => {
                initPage();
            });
        }
    }

    function visibilitychangeHandler() {
        document.removeEventListener('visibilitychange', visibilitychangeHandler);
        init();
    }

    setTimeout(() => {
        if (document.hidden) {
            document.addEventListener('visibilitychange', visibilitychangeHandler);
        } else {
            init();
        }
    }, 300);
})();
