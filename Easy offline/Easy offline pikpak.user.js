// ==UserScript==
// @name         Easy Offline pikpak addon
// @namespace    hoothin
// @version      2024-08-16
// @description  Add pikpak support for Easy Offline
// @author       hoothin
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://unpkg.com/crypto-js@4.2.0/crypto-js.js
// @connect      user.mypikpak.com
// @connect      api-drive.mypikpak.com
// ==/UserScript==

(function() {
    'use strict';
    let info = GM_getValue("pikpakUserInfo"), device_id, user_id;
    const CLIENT_ID = "YNxT9w7GMdWvEOKa";
    const CLIENT_SECRET = "dbw2OtmVEeuUvIptb1Coyg";
    const CLIENT_VERSION = "1.47.1";
    const PACKAG_ENAME = "com.pikcloud.pikpak";
    const SDK_VERSION = "2.0.4.204000";
    const APP_NAME = "com.pikcloud.pikpak";
    function captchaInit() {
        return new Promise(resolve => {
            let meta = {};
            if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(info.userName)) {
                meta.email = info.userName;
            } else if (/\d{11,18}/.test(info.userName)) {
                meta.phone_number = info.userName;
            } else {
                meta.username = info.userName;
            }
            let params = {
                "client_id": CLIENT_ID,
                "action": "POST:https://user.mypikpak.com/v1/auth/signin",
                "device_id": device_id,
                "meta": meta
            }
            GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://user.mypikpak.com/v1/shield/captcha/init',
                data: JSON.stringify(params),
                onload: (res) => {
                    if(res.status === 200) {
                        let data = JSON.parse(res.responseText);
                        resolve(data);
                    } else {
                        info.loginInfo = null;
                        GM_setValue("pikpakUserInfo", info);
                        const msg = JSON.parse(res.responseText).error_description;
                        alert(msg);
                    }
                },
                onerror: (e) => {
                    GM_notification("Error: " + (e.statusText || e.error));
                },
                ontimeout: (e) => {
                    GM_notification("Error: " + (e.statusText || e.error));
                }
            });
        });
    }
    function buildCustomUserAgent() {
        let signature_base = `${device_id}${PACKAG_ENAME}1appkey`;
        let sha1_result = CryptoJS.SHA1(signature_base).toString(CryptoJS.enc.Hex);
        let md5_result = CryptoJS.MD5(sha1_result).toString(CryptoJS.enc.Hex);

        let device_sign = `div101.${device_id}${md5_result}`;

        let user_agent_parts = [
            `ANDROID-${APP_NAME}/${CLIENT_VERSION}`,
            "protocolVersion/200",
            "accesstype/",
            `clientid/${CLIENT_ID}`,
            `clientversion/${CLIENT_VERSION}`,
            "action_type/",
            "networktype/WIFI",
            "sessionid/",
            `deviceid/${device_id}`,
            "providername/NONE",
            `devicesign/${device_sign}`,
            "refresh_token/",
            `sdkversion/${SDK_VERSION}`,
            `datetime/${Date.now()}`,
            `usrno/${user_id}`,
            `appname/${APP_NAME}`,
            "session_origin/",
            "grant_type/",
            "appid/",
            "clientip/",
            "devicename/Xiaomi_M2004j7ac",
            "osversion/13",
            "platformversion/10",
            "accessmode/",
            "devicemodel/M2004J7AC",
        ]

        return user_agent_parts.join(" ");
    }
    document.addEventListener("click", function(e) {
        if (e.target && e.target.getAttribute && e.target.getAttribute("name") === "pikpak" && e.target.parentNode.id === "icons") {
            GM_setValue("pikpakUserInfo", "");
            alert("PikPak account has been cleared");
        }
    });
    var _unsafeWindow = (typeof unsafeWindow === 'undefined') ? window : unsafeWindow;
    if (!_unsafeWindow.eoAddons) _unsafeWindow.eoAddons = {};
    _unsafeWindow.eoAddons.pikpak = {
        regex: /mypikpak\.com/,
        url: "http://user.mypikpak.com/",
        bgColor: "2265ff",
        noTxt: true,
        linkRegExp: /^magnet:\?xt|^PikPak:\/\/|\.(torrent|mp4|mp3|rar|7z|zip|rmvb|mkv|avi|iso)$/i,
        directUrl: function(offUrl) {
            if (!info) {
                let userName = prompt("userName");
                if (!userName) return;
                let userPass = prompt("userPass");
                if (!userPass) return;
                info = {userName: userName, userPass: userPass};
                GM_setValue("pikpakUserInfo", info);
            }
            var postUrl = async () => {
                let postData;
                if (offUrl.indexOf('PikPak://') === 0) {
                    const urlData = offUrl.substring(9).split('|')
                    postData = {
                        kind: "drive#file",
                        name: urlData[0],
                        size: urlData[1],
                        hash: urlData[2],
                        upload_type: "UPLOAD_TYPE_RESUMABLE",
                        objProvider: {
                            provider: "UPLOAD_TYPE_UNKNOWN"
                        }
                    }
                } else {
                    postData = {
                        kind: "drive#file",
                        name: "",
                        upload_type: "UPLOAD_TYPE_URL",
                        url: {
                            url: offUrl
                        },
                        params: {"from":"file"},
                        folder_type: "DOWNLOAD"
                    }
                }
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'https://api-drive.mypikpak.com/drive/v1/files',
                    data: JSON.stringify(postData),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        authorization: info.loginInfo.token_type + ' ' + info.loginInfo.access_token,
                        "X-Captcha-Token": info.captchaData.captcha_token
                    },
                    onload: (res) => {
                        if(res.status === 200) {
                            GM_notification("Task OK");
                        } else if(res.status === 401) {
                            info.loginInfo=null;
                            GM_setValue("pikpakUserInfo", info);
                            const msg = JSON.parse(res.responseText).error_description;
                            alert(msg);
                        } else if(res.status === 400) {
                            const msg = JSON.parse(res.responseText).error_description;
                            alert(msg);
                        } else if(res.status === 403) {
                            const msg = JSON.parse(res.responseText).error_description;
                            alert(msg);
                        }
                    },
                    onerror: (e) => {
                        GM_notification("Error: " + (e.statusText || e.error));
                    },
                    ontimeout: (e) => {
                        GM_notification("Error: " + (e.statusText || e.error));
                    }
                })
            };
            device_id = CryptoJS.MD5(`${info.userName}${info.userPass}`).toString(CryptoJS.enc.Hex);
            (async () => {
                if (!info.captchaData || info.captchaData.expires < new Date().getTime()) {
                    let captchaData = await captchaInit();
                    info.captchaData = captchaData;
                    if (!info.captchaData.expires && info.captchaData.expires_in) {
                        info.captchaData.expires = new Date().getTime() + 1000 * info.captchaData.expires_in;
                    }
                    GM_setValue("pikpakUserInfo", info);
                }
                if (!info.loginInfo || info.loginInfo.expires < new Date().getTime()) {
                    let data = {
                        "client_id": CLIENT_ID,
                        "client_secret": CLIENT_SECRET,
                        "password": info.userPass,
                        "username": info.userName,
                        "captcha_token": info.captchaData.captcha_token,
                    }
                    GM_xmlhttpRequest({
                        method: 'POST',
                        url: 'https://user.mypikpak.com/v1/auth/signin',
                        data: JSON.stringify(data),
                        headers: {
                            'user-agent': 'accessmode/ devicename/Netease_Mumu appname/android-com.pikcloud.pikpak cmd/login appid/ action_type/ clientid/YNxT9w7GMdWvEOKa deviceid/56e000d71f4660700ca974f2305171c5 refresh_token/ grant_type/ networktype/WIFI devicemodel/MuMu accesstype/ sessionid/ osversion/6.0.1 datetime/1636364470779 sdkversion/1.0.1.101600 protocolversion/200 clientversion/ providername/NONE clientip/ session_origin/ devicesign/div101.56e000d71f4660700ca974f2305171c5b94c3d4196a9dd74e49d7710a7af873d platformversion/10 usrno/null'
                        },
                        onload: (res) => {
                            if (res.status === 200) {
                                info.loginInfo = JSON.parse(res.responseText);
                                if (!info.loginInfo.expires && info.loginInfo.expires_in) {
                                    info.loginInfo.expires = new Date().getTime() + 1000 * info.loginInfo.expires_in;
                                }
                                GM_setValue("pikpakUserInfo", info);
                                postUrl();
                            } else if (res.status === 401) {
                                GM_setValue("pikpakUserInfo","");
                                const msg = JSON.parse(res.responseText).error_description;
                                alert(msg);
                            } else if (res.status === 400) {
                                GM_setValue("pikpakUserInfo","");
                                const msg = JSON.parse(res.responseText).error_description;
                                alert(msg);
                            } else if (res.status === 403) {
                                GM_setValue("pikpakUserInfo","");
                                const msg = JSON.parse(res.responseText).error_description;
                                alert(msg);
                            }
                        },
                        onerror: (e) => {
                            GM_notification("Error: " + (e.statusText || e.error));
                        },
                        ontimeout: (e) => {
                            GM_notification("Error: " + (e.statusText || e.error));
                        }
                    })
                } else {
                    postUrl();
                }
            })();
            return false;
        },
        bgImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAArbP5MdNFMdNIrbP4sbP1QdctQdcwvbv////8dYf8sbP9smP/09/8qaf/V4f8iZf/u8/+lwP+duv+UtP+PsP9hkP92n/9nlP/K2v/F1v+7z/+Ytv9Wif9Aef91nv9e7pgKAAAACHRSTlMA+puT/PWHhQBB7XEAAACQSURBVBjTTY8JCsQwCEWdrjFm37p37n/LMdAJfSTgf4IoAPQf8fDpgek4N9NxnwQZJx0/w+UMNd/XV6nluqsBQbRp79Xqvd7ICBCuaHuElMJhdXEspMKGko/YA2LYXyKuiGt8Ca3rfwm052nbjILV1IyFBZFZck4xppwXQ8Srk2wQzXzcIBpDB8w0/vM4AfwACl4LKjajMX0AAAAASUVORK5CYII="
    };
})();