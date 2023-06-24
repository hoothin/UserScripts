// ==UserScript==
// @name                 Picviewer CE+
// @name:zh-CN           Picviewer CE+
// @name:zh-TW           Picviewer CE+
// @name:pt-BR           Picviewer CE+
// @name:ru              Picviewer CE+
// @author               NLF && ywzhaiqi && hoothin
// @description          Powerful picture viewing tool online, which can popup/scale/rotate/batch save pictures automatically
// @description:zh-CN    在线看图工具，支持图片翻转、旋转、缩放、弹出大图、批量保存
// @description:zh-TW    線上看圖工具，支援圖片翻轉、旋轉、縮放、彈出大圖、批量儲存
// @description:pt-BR    Poderosa ferramenta de visualização de imagens on-line, que pode pop-up/dimensionar/girar/salvar em lote imagens automaticamente
// @description:ru       Мощный онлайн-инструмент для просмотра изображений, который может автоматически отображать/масштабировать/вращать/пакетно сохранять изображения
// @version              2023.6.24.2
// @icon                 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAD////29vbKysoqKioiIiKysrKhoaGTk5N9fX3z8/Pv7+/r6+vk5OTb29vOzs6Ojo5UVFQzMzMZGRkREREMDAy4uLisrKylpaV4eHhkZGRPT08/Pz/IfxjQAAAAgklEQVQoz53RRw7DIBBAUb5pxr2m3/+ckfDImwyJlL9DDzQgDIUMRu1vWOxTBdeM+onApENF0qHjpkOk2VTwLVEF40Kbfj1wK8AVu2pQA1aBBYDHJ1wy9Cf4cXD5chzNAvsAnc8TjoLAhIzsBao9w1rlVTIvkOYMd9nm6xPi168t9AYkbANdajpjcwAAAABJRU5ErkJggg==
// @namespace            https://github.com/hoothin/UserScripts
// @homepage             https://www.hoothin.com
// @supportURL           https://github.com/hoothin/UserScripts/issues
// @connect              www.google.com
// @connect              www.google.com.hk
// @connect              www.google.co.jp
// @connect              ipv4.google.com
// @connect              image.baidu.com
// @connect              www.tineye.com
// @connect              *
// @grant                GM_getValue
// @grant                GM_setValue
// @grant                GM_addStyle
// @grant                GM_openInTab
// @grant                GM_setClipboard
// @grant                GM_xmlhttpRequest
// @grant                GM_registerMenuCommand
// @grant                GM_notification
// @grant                GM_download
// @grant                GM.getValue
// @grant                GM.setValue
// @grant                GM.addStyle
// @grant                GM.openInTab
// @grant                GM.setClipboard
// @grant                GM.xmlHttpRequest
// @grant                GM.registerMenuCommand
// @grant                GM.notification
// @grant                unsafeWindow
// @require              https://greasyfork.org/scripts/6158-gm-config-cn/code/GM_config%20CN.js?version=23710
// @require              https://greasyfork.org/scripts/438080-pvcep-rules/code/pvcep_rules.js?version=1209976
// @require              https://greasyfork.org/scripts/440698-pvcep-lang/code/pvcep_lang.js?version=1185366
// @downloadURL          https://greasyfork.org/scripts/24204-picviewer-ce/code/Picviewer%20CE+.user.js
// @updateURL            https://greasyfork.org/scripts/24204-picviewer-ce/code/Picviewer%20CE+.user.js
// @match                *://*/*
// @exclude              http://www.toodledo.com/tasks/*
// @exclude              http*://maps.google.com*/*
// @exclude              *://www.google.*/_/chrome/newtab*
// @exclude              *://mega.*/*
// @exclude              *://*.mega.*/*
// @exclude              *://onedrive.live.com/*
// @created              2011-6-15
// @contributionURL      https://www.buymeacoffee.com/hoothin
// @contributionAmount   1
// ==/UserScript==

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  /*
  * FileSaver.js
  * A saveAs() FileSaver implementation.
  *
  * By Eli Grey, http://eligrey.com
  *
  * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
  * source  : http://purl.eligrey.com/github/FileSaver.js
  */
  // The one and only way of getting global scope in all environments
  // https://stackoverflow.com/q/3277182/1008999
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
      autoBom: false
    };else if (typeof opts !== 'object') {
      console.warn('Deprecated: Expected third argument to be a object');
      opts = {
        autoBom: !opts
      };
    } // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  }

  function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      saveAs(xhr.response, name, opts);
    };

    xhr.onerror = function () {
      console.error('could not download file');
    };

    xhr.send();
  }

  function corsEnabled(url) {
    var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

    xhr.open('HEAD', url, false);

    try {
      xhr.send();
    } catch (e) {}

    return xhr.status >= 200 && xhr.status <= 299;
  } // `a.click()` doesn't work for all browsers (#465)


  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  } // Detect WebView inside a native macOS app by ruling out all browsers
  // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
  // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos


  var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
  var saveAs = _global.saveAs || ( // probably in some web worker
  typeof window !== 'object' || window !== _global ? function saveAs() {}
  /* noop */
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
  : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener'; // tabnabbing
    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
      // Support regular links
      a.href = blob;

      if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
      } else {
        click(a);
      }
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4E4); // 40s

      setTimeout(function () {
        click(a);
      }, 0);
    }
  } // Use msSaveOrOpenBlob as a second approach
  : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
    name = name || blob.name || 'download';

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_blank';
        setTimeout(function () {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  } // Fallback to using FileReader and a popup
  : function saveAs(blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
      // Safari doesn't allow downloading of blob URLs
      var reader = new FileReader();

      reader.onloadend = function () {
        var url = reader.result;
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        if (popup) popup.location.href = url;else location = url;
        popup = null; // reverse-tabnabbing #460
      };

      reader.readAsDataURL(blob);
    } else {
      var URL = _global.URL || _global.webkitURL;
      var url = URL.createObjectURL(blob);
      if (popup) popup.location = url;else location.href = url;
      popup = null; // reverse-tabnabbing #460

      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4E4); // 40s
    }
  });
  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});

/*!

JSZip v3.7.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JSZip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var support = require('./support');
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;

    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
        remainingBytes = len - i;

        if (!isArray) {
            chr1 = input.charCodeAt(i++);
            chr2 = i < len ? input.charCodeAt(i++) : 0;
            chr3 = i < len ? input.charCodeAt(i++) : 0;
        } else {
            chr1 = input[i++];
            chr2 = i < len ? input[i++] : 0;
            chr3 = i < len ? input[i++] : 0;
        }

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

    }

    return output.join("");
};

// public method for decoding
exports.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;

    var dataUrlPrefix = "data:";

    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
        // This is a common error: people give a data url
        // (data:image/png;base64,iVBOR...) with a {base64: true} and
        // wonders why things don't work.
        // We can detect that the string input looks like a data url but we
        // *can't* be sure it is one: removing everything up to the comma would
        // be too dangerous.
        throw new Error("Invalid base64 input, it looks like a data url.");
    }

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    var totalLength = input.length * 3 / 4;
    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if (totalLength % 1 !== 0) {
        // totalLength is not an integer, the length does not match a valid
        // base64 content. That can happen if:
        // - the input is not a base64 content
        // - the input is *almost* a base64 content, with a extra chars at the
        //   beginning or at the end
        // - the input uses a base64 variant (base64url for example)
        throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
        output = new Uint8Array(totalLength|0);
    } else {
        output = new Array(totalLength|0);
    }

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[resultIndex++] = chr1;

        if (enc3 !== 64) {
            output[resultIndex++] = chr2;
        }
        if (enc4 !== 64) {
            output[resultIndex++] = chr3;
        }

    }

    return output;
};

},{"./support":30,"./utils":32}],2:[function(require,module,exports){
'use strict';

var external = require("./external");
var DataWorker = require('./stream/DataWorker');
var Crc32Probe = require('./stream/Crc32Probe');
var DataLengthProbe = require('./stream/DataLengthProbe');

/**
 * Represent a compressed object, with everything needed to decompress it.
 * @constructor
 * @param {number} compressedSize the size of the data compressed.
 * @param {number} uncompressedSize the size of the data after decompression.
 * @param {number} crc32 the crc32 of the decompressed file.
 * @param {object} compression the type of compression, see lib/compressions.js.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
 */
function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
}

CompressedObject.prototype = {
    /**
     * Create a worker to get the uncompressed content.
     * @return {GenericWorker} the worker.
     */
    getContentWorker: function () {
        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
            .pipe(this.compression.uncompressWorker())
            .pipe(new DataLengthProbe("data_length"));

        var that = this;
        worker.on("end", function () {
            if (this.streamInfo['data_length'] !== that.uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }
        });
        return worker;
    },
    /**
     * Create a worker to get the compressed content.
     * @return {GenericWorker} the worker.
     */
    getCompressedWorker: function () {
        return new DataWorker(external.Promise.resolve(this.compressedContent))
            .withStreamInfo("compressedSize", this.compressedSize)
            .withStreamInfo("uncompressedSize", this.uncompressedSize)
            .withStreamInfo("crc32", this.crc32)
            .withStreamInfo("compression", this.compression)
            ;
    }
};

/**
 * Chain the given worker with other workers to compress the content with the
 * given compression.
 * @param {GenericWorker} uncompressedWorker the worker to pipe.
 * @param {Object} compression the compression object.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {GenericWorker} the new worker compressing the content.
 */
CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker
        .pipe(new Crc32Probe())
        .pipe(new DataLengthProbe("uncompressedSize"))
        .pipe(compression.compressWorker(compressionOptions))
        .pipe(new DataLengthProbe("compressedSize"))
        .withStreamInfo("compression", compression);
};

module.exports = CompressedObject;

},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){
'use strict';

var GenericWorker = require("./stream/GenericWorker");

exports.STORE = {
    magic: "\x00\x00",
    compressWorker : function (compressionOptions) {
        return new GenericWorker("STORE compression");
    },
    uncompressWorker : function () {
        return new GenericWorker("STORE decompression");
    }
};
exports.DEFLATE = require('./flate');

},{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');

/**
 * The following functions come from pako, from pako/lib/zlib/crc32.js
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Use ordinary array, since untyped makes no boost here
function makeTable() {
    var c, table = [];

    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
    }

    return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

// That's all for the pako functions.

/**
 * Compute the crc32 of a string.
 * This is almost the same as the function crc32, but for strings. Using the
 * same function for the two use cases leads to horrible performances.
 * @param {Number} crc the starting value of the crc.
 * @param {String} str the string to use.
 * @param {Number} len the length of the string.
 * @param {Number} pos the starting position for the crc32 computation.
 * @return {Number} the computed crc32.
 */
function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

module.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if(isArray) {
        return crc32(crc|0, input, input.length, 0);
    } else {
        return crc32str(crc|0, input, input.length, 0);
    }
};

},{"./utils":32}],5:[function(require,module,exports){
'use strict';
exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = true;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;

},{}],6:[function(require,module,exports){
/* global Promise */
'use strict';

// load the global object first:
// - it should be better integrated in the system (unhandledRejection in node)
// - the environment may have a custom Promise implementation (see zone.js)
var ES6Promise = null;
if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
} else {
    ES6Promise = require("lie");
}

/**
 * Let the user use/change some implementations.
 */
module.exports = {
    Promise: ES6Promise
};

},{"lie":37}],7:[function(require,module,exports){
'use strict';
var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = require("pako");
var utils = require("./utils");
var GenericWorker = require("./stream/GenericWorker");

var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";

/**
 * Create a worker that uses pako to inflate/deflate.
 * @constructor
 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
 * @param {Object} options the options to use when (de)compressing.
 */
function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);

    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    // the `meta` object from the last chunk received
    // this allow this worker to pass around metadata
    this.meta = {};
}

utils.inherits(FlateWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
FlateWorker.prototype.processChunk = function (chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
};

/**
 * @see GenericWorker.flush
 */
FlateWorker.prototype.flush = function () {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push([], true);
};
/**
 * @see GenericWorker.cleanUp
 */
FlateWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
};

/**
 * Create the _pako object.
 * TODO: lazy-loading this object isn't the best solution but it's the
 * quickest. The best solution is to lazy-load the worker list. See also the
 * issue #446.
 */
FlateWorker.prototype._createPako = function () {
    this._pako = new pako[this._pakoAction]({
        raw: true,
        level: this._pakoOptions.level || -1 // default compression
    });
    var self = this;
    this._pako.onData = function(data) {
        self.push({
            data : data,
            meta : self.meta
        });
    };
};

exports.compressWorker = function (compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
};
exports.uncompressWorker = function () {
    return new FlateWorker("Inflate", {});
};

},{"./stream/GenericWorker":28,"./utils":32,"pako":38}],8:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');
var utf8 = require('../utf8');
var crc32 = require('../crc32');
var signature = require('../signature');

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */
var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

    var result = unixPermissions;
    if (!unixPermissions) {
        // I can't use octal values in strict mode, hence the hexa.
        //  040775 => 0x41fd
        // 0100664 => 0x81b4
        result = isDir ? 0x41fd : 0x81b4;
    }
    return (result & 0xFFFF) << 16;
};

/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */
var generateDosExternalFileAttr = function (dosPermissions, isDir) {

    // the dir flag is already set for compatibility
    return (dosPermissions || 0)  & 0x3F;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {Object} streamInfo the hash with information about the compressed file.
 * @param {Boolean} streamedContent is the content streamed ?
 * @param {Boolean} streamingEnded is the stream finished ?
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @param {Function} encodeFileName the function to encode the file name / comment.
 * @return {Object} the zip parts.
 */
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo['file'],
    compression = streamInfo['compression'],
    useCustomEncoding = encodeFileName !== utf8.utf8encode,
    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
    comment = file.comment,
    encodedComment = utils.transformTo("string", encodeFileName(comment)),
    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
    useUTF8ForComment = utfEncodedComment.length !== comment.length,
    dosTime,
    dosDate,
    extraFields = "",
    unicodePathExtraField = "",
    unicodeCommentExtraField = "",
    dir = file.dir,
    date = file.date;


    var dataInfo = {
        crc32 : 0,
        compressedSize : 0,
        uncompressedSize : 0
    };

    // if the content is streamed, the sizes/crc32 are only available AFTER
    // the end of the stream.
    if (!streamedContent || streamingEnded) {
        dataInfo.crc32 = streamInfo['crc32'];
        dataInfo.compressedSize = streamInfo['compressedSize'];
        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
    }

    var bitflag = 0;
    if (streamedContent) {
        // Bit 3: the sizes/crc32 are set to zero in the local header.
        // The correct values are put in the data descriptor immediately
        // following the compressed data.
        bitflag |= 0x0008;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
        // Bit 11: Language encoding flag (EFS).
        bitflag |= 0x0800;
    }


    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
        // dos or unix, we set the dos dir flag
        extFileAttr |= 0x00010;
    }
    if(platform === "UNIX") {
        versionMadeBy = 0x031E; // UNIX, version 3.0
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else { // DOS or other, fallback to DOS
        versionMadeBy = 0x0014; // DOS, version 2.0
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }

    // date
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;

    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getUTCMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(encodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(crc32(encodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    header += decToHex(bitflag, 2);
    // compression method
    header += compression.magic;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(dataInfo.crc32, 4);
    // compressed size
    header += decToHex(dataInfo.compressedSize, 4);
    // uncompressed size
    header += decToHex(dataInfo.uncompressedSize, 4);
    // file name length
    header += decToHex(encodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
        // version made by (00: DOS)
        decToHex(versionMadeBy, 2) +
        // file header (common to file and central directory)
        header +
        // file comment length
        decToHex(encodedComment.length, 2) +
        // disk number start
        "\x00\x00" +
        // internal file attributes TODO
        "\x00\x00" +
        // external file attributes
        decToHex(extFileAttr, 4) +
        // relative offset of local header
        decToHex(offset, 4) +
        // file name
        encodedFileName +
        // extra field
        extraFields +
        // file comment
        encodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord
    };
};

/**
 * Generate the EOCD record.
 * @param {Number} entriesCount the number of entries in the zip file.
 * @param {Number} centralDirLength the length (in bytes) of the central dir.
 * @param {Number} localDirLength the length (in bytes) of the local dir.
 * @param {String} comment the zip file comment as a binary string.
 * @param {Function} encodeFileName the function to encode the comment.
 * @return {String} the EOCD record.
 */
var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));

    // end of central dir signature
    dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(entriesCount, 2) +
        // total number of entries in the central directory
        decToHex(entriesCount, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(encodedComment.length, 2) +
        // .ZIP file comment
        encodedComment;

    return dirEnd;
};

/**
 * Generate data descriptors for a file entry.
 * @param {Object} streamInfo the hash generated by a worker, containing information
 * on the file entry.
 * @return {String} the data descriptors.
 */
var generateDataDescriptors = function (streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR +
        // crc-32                          4 bytes
        decToHex(streamInfo['crc32'], 4) +
        // compressed size                 4 bytes
        decToHex(streamInfo['compressedSize'], 4) +
        // uncompressed size               4 bytes
        decToHex(streamInfo['uncompressedSize'], 4);

    return descriptor;
};


/**
 * A worker to concatenate other workers to create a zip file.
 * @param {Boolean} streamFiles `true` to stream the content of the files,
 * `false` to accumulate it.
 * @param {String} comment the comment to use.
 * @param {String} platform the platform to use, "UNIX" or "DOS".
 * @param {Function} encodeFileName the function to encode file names and comments.
 */
function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    // The number of bytes written so far. This doesn't count accumulated chunks.
    this.bytesWritten = 0;
    // The comment of the zip file
    this.zipComment = comment;
    // The platform "generating" the zip file.
    this.zipPlatform = platform;
    // the function to encode file names and comments.
    this.encodeFileName = encodeFileName;
    // Should we stream the content of the files ?
    this.streamFiles = streamFiles;
    // If `streamFiles` is false, we will need to accumulate the content of the
    // files to calculate sizes / crc32 (and write them *before* the content).
    // This boolean indicates if we are accumulating chunks (it will change a lot
    // during the lifetime of this worker).
    this.accumulate = false;
    // The buffer receiving chunks when accumulating content.
    this.contentBuffer = [];
    // The list of generated directory records.
    this.dirRecords = [];
    // The offset (in bytes) from the beginning of the zip file for the current source.
    this.currentSourceOffset = 0;
    // The total number of entries in this zip file.
    this.entriesCount = 0;
    // the name of the file currently being added, null when handling the end of the zip file.
    // Used for the emitted metadata.
    this.currentFile = null;



    this._sources = [];
}
utils.inherits(ZipFileWorker, GenericWorker);

/**
 * @see GenericWorker.push
 */
ZipFileWorker.prototype.push = function (chunk) {

    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;

    if(this.accumulate) {
        this.contentBuffer.push(chunk);
    } else {
        this.bytesWritten += chunk.data.length;

        GenericWorker.prototype.push.call(this, {
            data : chunk.data,
            meta : {
                currentFile : this.currentFile,
                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
            }
        });
    }
};

/**
 * The worker started a new source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the new source.
 */
ZipFileWorker.prototype.openedSource = function (streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo['file'].name;

    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

    // don't stream folders (because they don't have any content)
    if(streamedContent) {
        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
    } else {
        // we need to wait for the whole file before pushing anything
        this.accumulate = true;
    }
};

/**
 * The worker finished a source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the finished source.
 */
ZipFileWorker.prototype.closedSource = function (streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

    this.dirRecords.push(record.dirRecord);
    if(streamedContent) {
        // after the streamed file, we put data descriptors
        this.push({
            data : generateDataDescriptors(streamInfo),
            meta : {percent:100}
        });
    } else {
        // the content wasn't streamed, we need to push everything now
        // first the file record, then the content
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
        while(this.contentBuffer.length) {
            this.push(this.contentBuffer.shift());
        }
    }
    this.currentFile = null;
};

/**
 * @see GenericWorker.flush
 */
ZipFileWorker.prototype.flush = function () {

    var localDirLength = this.bytesWritten;
    for(var i = 0; i < this.dirRecords.length; i++) {
        this.push({
            data : this.dirRecords[i],
            meta : {percent:100}
        });
    }
    var centralDirLength = this.bytesWritten - localDirLength;

    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

    this.push({
        data : dirEnd,
        meta : {percent:100}
    });
};

/**
 * Prepare the next source to be read.
 */
ZipFileWorker.prototype.prepareNextSource = function () {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
        this.previous.pause();
    } else {
        this.previous.resume();
    }
};

/**
 * @see GenericWorker.registerPrevious
 */
ZipFileWorker.prototype.registerPrevious = function (previous) {
    this._sources.push(previous);
    var self = this;

    previous.on('data', function (chunk) {
        self.processChunk(chunk);
    });
    previous.on('end', function () {
        self.closedSource(self.previous.streamInfo);
        if(self._sources.length) {
            self.prepareNextSource();
        } else {
            self.end();
        }
    });
    previous.on('error', function (e) {
        self.error(e);
    });
    return this;
};

/**
 * @see GenericWorker.resume
 */
ZipFileWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this.previous && this._sources.length) {
        this.prepareNextSource();
        return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
        this.end();
        return true;
    }
};

/**
 * @see GenericWorker.error
 */
ZipFileWorker.prototype.error = function (e) {
    var sources = this._sources;
    if(!GenericWorker.prototype.error.call(this, e)) {
        return false;
    }
    for(var i = 0; i < sources.length; i++) {
        try {
            sources[i].error(e);
        } catch(e) {
            // the `error` exploded, nothing to do
        }
    }
    return true;
};

/**
 * @see GenericWorker.lock
 */
ZipFileWorker.prototype.lock = function () {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for(var i = 0; i < sources.length; i++) {
        sources[i].lock();
    }
};

module.exports = ZipFileWorker;

},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){
'use strict';

var compressions = require('../compressions');
var ZipFileWorker = require('./ZipFileWorker');

/**
 * Find the compression to use.
 * @param {String} fileCompression the compression defined at the file level, if any.
 * @param {String} zipCompression the compression defined at the load() level.
 * @return {Object} the compression object to use.
 */
var getCompression = function (fileCompression, zipCompression) {

    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
};

/**
 * Create a worker to generate a zip file.
 * @param {JSZip} zip the JSZip instance at the right root level.
 * @param {Object} options to generate the zip file.
 * @param {String} comment the comment to use.
 */
exports.generateWorker = function (zip, options, comment) {

    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {

        zip.forEach(function (relativePath, file) {
            entriesCount++;
            var compression = getCompression(file.options.compression, options.compression);
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
            var dir = file.dir, date = file.date;

            file._compressWorker(compression, compressionOptions)
            .withStreamInfo("file", {
                name : relativePath,
                dir : dir,
                date : date,
                comment : file.comment || "",
                unixPermissions : file.unixPermissions,
                dosPermissions : file.dosPermissions
            })
            .pipe(zipFileWorker);
        });
        zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
        zipFileWorker.error(e);
    }

    return zipFileWorker;
};

},{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){
'use strict';

/**
 * Representation a of zip file in js
 * @constructor
 */
function JSZip() {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZip)) {
        return new JSZip();
    }

    if(arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    // NOTE: we use a null prototype because we do not
    // want filenames like "toString" coming from a zip file
    // to overwrite methods and attributes in a normal Object.
    this.files = Object.create(null);

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    this.clone = function() {
        var newObj = new JSZip();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip.prototype = require('./object');
JSZip.prototype.loadAsync = require('./load');
JSZip.support = require('./support');
JSZip.defaults = require('./defaults');

// TODO find a better way to handle this version,
// a require('package.json').version doesn't work with webpack, see #327
JSZip.version = "3.7.1";

JSZip.loadAsync = function (content, options) {
    return new JSZip().loadAsync(content, options);
};

JSZip.external = require("./external");
module.exports = JSZip;

},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var external = require("./external");
var utf8 = require('./utf8');
var ZipEntries = require('./zipEntries');
var Crc32Probe = require('./stream/Crc32Probe');
var nodejsUtils = require("./nodejsUtils");

/**
 * Check the CRC32 of an entry.
 * @param {ZipEntry} zipEntry the zip entry to check.
 * @return {Promise} the result.
 */
function checkEntryCRC32(zipEntry) {
    return new external.Promise(function (resolve, reject) {
        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
        worker.on("error", function (e) {
            reject(e);
        })
            .on("end", function () {
                if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                    reject(new Error("Corrupted zip : CRC32 mismatch"));
                } else {
                    resolve();
                }
            })
            .resume();
    });
}

module.exports = function (data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
        base64: false,
        checkCRC32: false,
        optimizedBinaryString: false,
        createFolders: false,
        decodeFileName: utf8.utf8decode
    });

    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }

    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
        .then(function (data) {
            var zipEntries = new ZipEntries(options);
            zipEntries.load(data);
            return zipEntries;
        }).then(function checkCRC32(zipEntries) {
            var promises = [external.Promise.resolve(zipEntries)];
            var files = zipEntries.files;
            if (options.checkCRC32) {
                for (var i = 0; i < files.length; i++) {
                    promises.push(checkEntryCRC32(files[i]));
                }
            }
            return external.Promise.all(promises);
        }).then(function addFiles(results) {
            var zipEntries = results.shift();
            var files = zipEntries.files;
            for (var i = 0; i < files.length; i++) {
                var input = files[i];
                zip.file(input.fileNameStr, input.decompressed, {
                    binary: true,
                    optimizedBinaryString: true,
                    date: input.date,
                    dir: input.dir,
                    comment: input.fileCommentStr.length ? input.fileCommentStr : null,
                    unixPermissions: input.unixPermissions,
                    dosPermissions: input.dosPermissions,
                    createFolders: options.createFolders
                });
            }
            if (zipEntries.zipComment.length) {
                zip.comment = zipEntries.zipComment;
            }

            return zip;
        });
};

},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){
"use strict";

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');

/**
 * A worker that use a nodejs stream as source.
 * @constructor
 * @param {String} filename the name of the file entry for this stream.
 * @param {Readable} stream the nodejs stream.
 */
function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
}

utils.inherits(NodejsStreamInputAdapter, GenericWorker);

/**
 * Prepare the stream and bind the callbacks on it.
 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
 * @param {Stream} stream the nodejs stream to use.
 */
NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
    var self = this;
    this._stream = stream;
    stream.pause();
    stream
    .on("data", function (chunk) {
        self.push({
            data: chunk,
            meta : {
                percent : 0
            }
        });
    })
    .on("error", function (e) {
        if(self.isPaused) {
            this.generatedError = e;
        } else {
            self.error(e);
        }
    })
    .on("end", function () {
        if(self.isPaused) {
            self._upstreamEnded = true;
        } else {
            self.end();
        }
    });
};
NodejsStreamInputAdapter.prototype.pause = function () {
    if(!GenericWorker.prototype.pause.call(this)) {
        return false;
    }
    this._stream.pause();
    return true;
};
NodejsStreamInputAdapter.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if(this._upstreamEnded) {
        this.end();
    } else {
        this._stream.resume();
    }

    return true;
};

module.exports = NodejsStreamInputAdapter;

},{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){
'use strict';

var Readable = require('readable-stream').Readable;

var utils = require('../utils');
utils.inherits(NodejsStreamOutputAdapter, Readable);

/**
* A nodejs stream using a worker as source.
* @see the SourceWrapper in http://nodejs.org/api/stream.html
* @constructor
* @param {StreamHelper} helper the helper wrapping the worker
* @param {Object} options the nodejs stream options
* @param {Function} updateCb the update callback.
*/
function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;

    var self = this;
    helper.on("data", function (data, meta) {
        if (!self.push(data)) {
            self._helper.pause();
        }
        if(updateCb) {
            updateCb(meta);
        }
    })
    .on("error", function(e) {
        self.emit('error', e);
    })
    .on("end", function () {
        self.push(null);
    });
}


NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
};

module.exports = NodejsStreamOutputAdapter;

},{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){
'use strict';

module.exports = {
    /**
     * True if this is running in Nodejs, will be undefined in a browser.
     * In a browser, browserify won't include this file and the whole module
     * will be resolved an empty object.
     */
    isNode : typeof Buffer !== "undefined",
    /**
     * Create a new nodejs Buffer from an existing content.
     * @param {Object} data the data to pass to the constructor.
     * @param {String} encoding the encoding to use.
     * @return {Buffer} a new Buffer.
     */
    newBufferFrom: function(data, encoding) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(data, encoding);
        } else {
            if (typeof data === "number") {
                // Safeguard for old Node.js versions. On newer versions,
                // Buffer.from(number) / Buffer(number, encoding) already throw.
                throw new Error("The \"data\" argument must not be a number");
            }
            return new Buffer(data, encoding);
        }
    },
    /**
     * Create a new nodejs Buffer with the specified size.
     * @param {Integer} size the size of the buffer.
     * @return {Buffer} a new Buffer.
     */
    allocBuffer: function (size) {
        if (Buffer.alloc) {
            return Buffer.alloc(size);
        } else {
            var buf = new Buffer(size);
            buf.fill(0);
            return buf;
        }
    },
    /**
     * Find out if an object is a Buffer.
     * @param {Object} b the object to test.
     * @return {Boolean} true if the object is a Buffer, false otherwise.
     */
    isBuffer : function(b){
        return Buffer.isBuffer(b);
    },

    isStream : function (obj) {
        return obj &&
            typeof obj.on === "function" &&
            typeof obj.pause === "function" &&
            typeof obj.resume === "function";
    }
};

},{}],15:[function(require,module,exports){
'use strict';
var utf8 = require('./utf8');
var utils = require('./utils');
var GenericWorker = require('./stream/GenericWorker');
var StreamHelper = require('./stream/StreamHelper');
var defaults = require('./defaults');
var CompressedObject = require('./compressedObject');
var ZipObject = require('./zipObject');
var generate = require("./generate");
var nodejsUtils = require("./nodejsUtils");
var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} originalOptions the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, originalOptions) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;


    /*
     * Correct options.
     */

    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) {
        o.compression = o.compression.toUpperCase();
    }

    if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
    }

    // UNX_IFDIR  0040000 see zipinfo.c
    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
        o.dir = true;
    }
    // Bit 4    Directory
    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
        o.dir = true;
    }

    if (o.dir) {
        name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
        o.binary = !isUnicodeString;
    }


    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
        o.base64 = false;
        o.binary = true;
        data = "";
        o.compression = "STORE";
        dataType = "string";
    }

    /*
     * Convert content to fit.
     */

    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
        zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }

    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
    /*
    TODO: we can't throw an exception because we have async promises
    (we can have a promise of a Date() for example) but returning a
    promise is useless because file(name, data) returns the JSZip
    object for chaining. Should we break that to allow the user
    to catch the error ?

    return external.Promise.resolve(zipObjectContent)
    .then(function () {
        return object;
    });
    */
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) === '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};

/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */
var forceTrailingSlash = function(path) {
    // Check the name ends with a /
    if (path.slice(-1) !== "/") {
        path += "/"; // IE doesn't like substr(-1)
    }
    return path;
};

/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

    name = forceTrailingSlash(name);

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
}

// return the actual prototype of JSZip
var out = {
    /**
     * @see loadAsync
     */
    load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },


    /**
     * Call a callback function for each entry at this folder level.
     * @param {Function} cb the callback function:
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     */
    forEach: function(cb) {
        var filename, relativePath, file;
        /* jshint ignore:start */
        // ignore warning about unwanted properties because this.files is a null prototype object
        for (filename in this.files) {
            file = this.files[filename];
            relativePath = filename.slice(this.root.length, filename.length);
            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
            }
        }
        /* jshint ignore:end */
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [];
        this.forEach(function (relativePath, entry) {
            if (search(relativePath, entry)) { // the file matches the function
                result.push(entry);
            }

        });
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                var obj = this.files[this.root + name];
                if (obj && !obj.dir) {
                    return obj;
                } else {
                    return null;
                }
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) !== "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },

    /**
     * Generate the complete zip file as an internal stream.
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {StreamHelper} the streamed zip file.
     */
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
          opts = utils.extend(options || {}, {
              streamFiles: false,
              compression: "STORE",
              compressionOptions : null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: 'application/zip',
              encodeFileName: utf8.utf8encode
          });

          opts.type = opts.type.toLowerCase();
          opts.compression = opts.compression.toUpperCase();

          // "binarystring" is preferred but the internals use "string".
          if(opts.type === "binarystring") {
            opts.type = "string";
          }

          if (!opts.type) {
            throw new Error("No output type specified.");
          }

          utils.checkSupport(opts.type);

          // accept nodejs `process.platform`
          if(
              opts.platform === 'darwin' ||
              opts.platform === 'freebsd' ||
              opts.platform === 'linux' ||
              opts.platform === 'sunos'
          ) {
              opts.platform = "UNIX";
          }
          if (opts.platform === 'win32') {
              opts.platform = "DOS";
          }

          var comment = opts.comment || this.comment || "";
          worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateAsync: function(options, onUpdate) {
        return this.generateInternalStream(options).accumulate(onUpdate);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateNodeStream: function(options, onUpdate) {
        options = options || {};
        if (!options.type) {
            options.type = "nodebuffer";
        }
        return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
};
module.exports = out;

},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){
/*
 * This file is used by module bundlers (browserify/webpack/etc) when
 * including a stream implementation. We use "readable-stream" to get a
 * consistent behavior between nodejs versions but bundlers often have a shim
 * for "stream". Using this shim greatly improve the compatibility and greatly
 * reduce the final size of the bundle (only one stream implementation, not
 * two).
 */
module.exports = require("stream");

},{"stream":undefined}],17:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function ArrayReader(data) {
    DataReader.call(this, data);
  for(var i = 0; i < this.data.length; i++) {
    data[i] = data[i] & 0xFF;
  }
}
utils.inherits(ArrayReader, DataReader);
/**
 * @see DataReader.byteAt
 */
ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i - this.zero;
        }
    }

    return -1;
};
/**
 * @see DataReader.readAndCheckSignature
 */
ArrayReader.prototype.readAndCheckSignature = function (sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3),
        data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
};
/**
 * @see DataReader.readData
 */
ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = ArrayReader;

},{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){
'use strict';
var utils = require('../utils');

function DataReader(data) {
    this.data = data; // type : see implementation
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specified index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < this.zero + newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurrence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurrence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Read the signature (4 bytes) at the current position and compare it with sig.
     * @param {string} sig the expected signature
     * @return {boolean} true if the signature matches, false otherwise.
     */
    readAndCheckSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(Date.UTC(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1)); // second
    }
};
module.exports = DataReader;

},{"../utils":32}],19:[function(require,module,exports){
'use strict';
var Uint8ArrayReader = require('./Uint8ArrayReader');
var utils = require('../utils');

function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
}
utils.inherits(NodeBufferReader, Uint8ArrayReader);

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;

},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function StringReader(data) {
    DataReader.call(this, data);
}
utils.inherits(StringReader, DataReader);
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
};
/**
 * @see DataReader.readAndCheckSignature
 */
StringReader.prototype.readAndCheckSignature = function (sig) {
    var data = this.readData(4);
    return sig === data;
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;

},{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){
'use strict';
var ArrayReader = require('./ArrayReader');
var utils = require('../utils');

function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
}
utils.inherits(Uint8ArrayReader, ArrayReader);
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;

},{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var support = require('../support');
var ArrayReader = require('./ArrayReader');
var StringReader = require('./StringReader');
var NodeBufferReader = require('./NodeBufferReader');
var Uint8ArrayReader = require('./Uint8ArrayReader');

/**
 * Create a reader adapted to the data.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
 * @return {DataReader} the data reader.
 */
module.exports = function (data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
        return new StringReader(data);
    }
    if (type === "nodebuffer") {
        return new NodeBufferReader(data);
    }
    if (support.uint8array) {
        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
};

},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){
'use strict';
exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

},{}],24:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var utils = require('../utils');

/**
 * A worker which convert chunks to a specified type.
 * @constructor
 * @param {String} destType the destination type.
 */
function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
}
utils.inherits(ConvertWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
ConvertWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : utils.transformTo(this.destType, chunk.data),
        meta : chunk.meta
    });
};
module.exports = ConvertWorker;

},{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var crc32 = require('../crc32');
var utils = require('../utils');

/**
 * A worker which calculate the crc32 of the data flowing through.
 * @constructor
 */
function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
}
utils.inherits(Crc32Probe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Crc32Probe.prototype.processChunk = function (chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
};
module.exports = Crc32Probe;

},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

/**
 * A worker which calculate the total length of the data flowing through.
 * @constructor
 * @param {String} propName the name used to expose the length
 */
function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
}
utils.inherits(DataLengthProbe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
DataLengthProbe.prototype.processChunk = function (chunk) {
    if(chunk) {
        var length = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
};
module.exports = DataLengthProbe;


},{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

// the size of the generated chunks
// TODO expose this as a public variable
var DEFAULT_BLOCK_SIZE = 16 * 1024;

/**
 * A worker that reads a content and emits chunks.
 * @constructor
 * @param {Promise} dataP the promise of the data to split
 */
function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";

    this._tickScheduled = false;

    dataP.then(function (data) {
        self.dataIsReady = true;
        self.data = data;
        self.max = data && data.length || 0;
        self.type = utils.getTypeOf(data);
        if(!self.isPaused) {
            self._tickAndRepeat();
        }
    }, function (e) {
        self.error(e);
    });
}

utils.inherits(DataWorker, GenericWorker);

/**
 * @see GenericWorker.cleanUp
 */
DataWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
};

/**
 * @see GenericWorker.resume
 */
DataWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this._tickScheduled && this.dataIsReady) {
        this._tickScheduled = true;
        utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
};

/**
 * Trigger a tick a schedule an other call to this function.
 */
DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if(this.isPaused || this.isFinished) {
        return;
    }
    this._tick();
    if(!this.isFinished) {
        utils.delay(this._tickAndRepeat, [], this);
        this._tickScheduled = true;
    }
};

/**
 * Read and push a chunk.
 */
DataWorker.prototype._tick = function() {

    if(this.isPaused || this.isFinished) {
        return false;
    }

    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
        // EOF
        return this.end();
    } else {
        switch(this.type) {
            case "string":
                data = this.data.substring(this.index, nextIndex);
            break;
            case "uint8array":
                data = this.data.subarray(this.index, nextIndex);
            break;
            case "array":
            case "nodebuffer":
                data = this.data.slice(this.index, nextIndex);
            break;
        }
        this.index = nextIndex;
        return this.push({
            data : data,
            meta : {
                percent : this.max ? this.index / this.max * 100 : 0
            }
        });
    }
};

module.exports = DataWorker;

},{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){
'use strict';

/**
 * A worker that does nothing but passing chunks to the next one. This is like
 * a nodejs stream but with some differences. On the good side :
 * - it works on IE 6-9 without any issue / polyfill
 * - it weights less than the full dependencies bundled with browserify
 * - it forwards errors (no need to declare an error handler EVERYWHERE)
 *
 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
 * object containing anything (`percent` for example), see each worker for more
 * details. The latter is the real data (String, Uint8Array, etc).
 *
 * @constructor
 * @param {String} name the name of the stream (mainly used for debugging purposes)
 */
function GenericWorker(name) {
    // the name of the worker
    this.name = name || "default";
    // an object containing metadata about the workers chain
    this.streamInfo = {};
    // an error which happened when the worker was paused
    this.generatedError = null;
    // an object containing metadata to be merged by this worker into the general metadata
    this.extraStreamInfo = {};
    // true if the stream is paused (and should not do anything), false otherwise
    this.isPaused = true;
    // true if the stream is finished (and should not do anything), false otherwise
    this.isFinished = false;
    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
    this.isLocked = false;
    // the event listeners
    this._listeners = {
        'data':[],
        'end':[],
        'error':[]
    };
    // the previous worker, if any
    this.previous = null;
}

GenericWorker.prototype = {
    /**
     * Push a chunk to the next workers.
     * @param {Object} chunk the chunk to push
     */
    push : function (chunk) {
        this.emit("data", chunk);
    },
    /**
     * End the stream.
     * @return {Boolean} true if this call ended the worker, false otherwise.
     */
    end : function () {
        if (this.isFinished) {
            return false;
        }

        this.flush();
        try {
            this.emit("end");
            this.cleanUp();
            this.isFinished = true;
        } catch (e) {
            this.emit("error", e);
        }
        return true;
    },
    /**
     * End the stream with an error.
     * @param {Error} e the error which caused the premature end.
     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
     */
    error : function (e) {
        if (this.isFinished) {
            return false;
        }

        if(this.isPaused) {
            this.generatedError = e;
        } else {
            this.isFinished = true;

            this.emit("error", e);

            // in the workers chain exploded in the middle of the chain,
            // the error event will go downward but we also need to notify
            // workers upward that there has been an error.
            if(this.previous) {
                this.previous.error(e);
            }

            this.cleanUp();
        }
        return true;
    },
    /**
     * Add a callback on an event.
     * @param {String} name the name of the event (data, end, error)
     * @param {Function} listener the function to call when the event is triggered
     * @return {GenericWorker} the current object for chainability
     */
    on : function (name, listener) {
        this._listeners[name].push(listener);
        return this;
    },
    /**
     * Clean any references when a worker is ending.
     */
    cleanUp : function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
        this._listeners = [];
    },
    /**
     * Trigger an event. This will call registered callback with the provided arg.
     * @param {String} name the name of the event (data, end, error)
     * @param {Object} arg the argument to call the callback with.
     */
    emit : function (name, arg) {
        if (this._listeners[name]) {
            for(var i = 0; i < this._listeners[name].length; i++) {
                this._listeners[name][i].call(this, arg);
            }
        }
    },
    /**
     * Chain a worker with an other.
     * @param {Worker} next the worker receiving events from the current one.
     * @return {worker} the next worker for chainability
     */
    pipe : function (next) {
        return next.registerPrevious(this);
    },
    /**
     * Same as `pipe` in the other direction.
     * Using an API with `pipe(next)` is very easy.
     * Implementing the API with the point of view of the next one registering
     * a source is easier, see the ZipFileWorker.
     * @param {Worker} previous the previous worker, sending events to this one
     * @return {Worker} the current worker for chainability
     */
    registerPrevious : function (previous) {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }

        // sharing the streamInfo...
        this.streamInfo = previous.streamInfo;
        // ... and adding our own bits
        this.mergeStreamInfo();
        this.previous =  previous;
        var self = this;
        previous.on('data', function (chunk) {
            self.processChunk(chunk);
        });
        previous.on('end', function () {
            self.end();
        });
        previous.on('error', function (e) {
            self.error(e);
        });
        return this;
    },
    /**
     * Pause the stream so it doesn't send events anymore.
     * @return {Boolean} true if this call paused the worker, false otherwise.
     */
    pause : function () {
        if(this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = true;

        if(this.previous) {
            this.previous.pause();
        }
        return true;
    },
    /**
     * Resume a paused stream.
     * @return {Boolean} true if this call resumed the worker, false otherwise.
     */
    resume : function () {
        if(!this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = false;

        // if true, the worker tried to resume but failed
        var withError = false;
        if(this.generatedError) {
            this.error(this.generatedError);
            withError = true;
        }
        if(this.previous) {
            this.previous.resume();
        }

        return !withError;
    },
    /**
     * Flush any remaining bytes as the stream is ending.
     */
    flush : function () {},
    /**
     * Process a chunk. This is usually the method overridden.
     * @param {Object} chunk the chunk to process.
     */
    processChunk : function(chunk) {
        this.push(chunk);
    },
    /**
     * Add a key/value to be added in the workers chain streamInfo once activated.
     * @param {String} key the key to use
     * @param {Object} value the associated value
     * @return {Worker} the current worker for chainability
     */
    withStreamInfo : function (key, value) {
        this.extraStreamInfo[key] = value;
        this.mergeStreamInfo();
        return this;
    },
    /**
     * Merge this worker's streamInfo into the chain's streamInfo.
     */
    mergeStreamInfo : function () {
        for(var key in this.extraStreamInfo) {
            if (!this.extraStreamInfo.hasOwnProperty(key)) {
                continue;
            }
            this.streamInfo[key] = this.extraStreamInfo[key];
        }
    },

    /**
     * Lock the stream to prevent further updates on the workers chain.
     * After calling this method, all calls to pipe will fail.
     */
    lock: function () {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }
        this.isLocked = true;
        if (this.previous) {
            this.previous.lock();
        }
    },

    /**
     *
     * Pretty print the workers chain.
     */
    toString : function () {
        var me = "Worker " + this.name;
        if (this.previous) {
            return this.previous + " -> " + me;
        } else {
            return me;
        }
    }
};

module.exports = GenericWorker;

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var ConvertWorker = require('./ConvertWorker');
var GenericWorker = require('./GenericWorker');
var base64 = require('../base64');
var support = require("../support");
var external = require("../external");

var NodejsStreamOutputAdapter = null;
if (support.nodestream) {
    try {
        NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
    } catch(e) {}
}

/**
 * Apply the final transformation of the data. If the user wants a Blob for
 * example, it's easier to work with an U8intArray and finally do the
 * ArrayBuffer/Blob conversion.
 * @param {String} type the name of the final type
 * @param {String|Uint8Array|Buffer} content the content to transform
 * @param {String} mimeType the mime type of the content, if applicable.
 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
 */
function transformZipOutput(type, content, mimeType) {
    switch(type) {
        case "blob" :
            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
        case "base64" :
            return base64.encode(content);
        default :
            return utils.transformTo(type, content);
    }
}

/**
 * Concatenate an array of data of the given type.
 * @param {String} type the type of the data in the given array.
 * @param {Array} dataArray the array containing the data chunks to concatenate
 * @return {String|Uint8Array|Buffer} the concatenated data
 * @throws Error if the asked type is unsupported
 */
function concat (type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for(i = 0; i < dataArray.length; i++) {
        totalLength += dataArray[i].length;
    }
    switch(type) {
        case "string":
            return dataArray.join("");
          case "array":
            return Array.prototype.concat.apply([], dataArray);
        case "uint8array":
            res = new Uint8Array(totalLength);
            for(i = 0; i < dataArray.length; i++) {
                res.set(dataArray[i], index);
                index += dataArray[i].length;
            }
            return res;
        case "nodebuffer":
            return Buffer.concat(dataArray);
        default:
            throw new Error("concat : unsupported type '"  + type + "'");
    }
}

/**
 * Listen a StreamHelper, accumulate its content and concatenate it into a
 * complete block.
 * @param {StreamHelper} helper the helper to use.
 * @param {Function} updateCallback a callback called on each update. Called
 * with one arg :
 * - the metadata linked to the update received.
 * @return Promise the promise for the accumulation.
 */
function accumulate(helper, updateCallback) {
    return new external.Promise(function (resolve, reject){
        var dataArray = [];
        var chunkType = helper._internalType,
            resultType = helper._outputType,
            mimeType = helper._mimeType;
        helper
        .on('data', function (data, meta) {
            dataArray.push(data);
            if(updateCallback) {
                updateCallback(meta);
            }
        })
        .on('error', function(err) {
            dataArray = [];
            reject(err);
        })
        .on('end', function (){
            try {
                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                resolve(result);
            } catch (e) {
                reject(e);
            }
            dataArray = [];
        })
        .resume();
    });
}

/**
 * An helper to easily use workers outside of JSZip.
 * @constructor
 * @param {Worker} worker the worker to wrap
 * @param {String} outputType the type of data expected by the use
 * @param {String} mimeType the mime type of the content, if applicable.
 */
function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch(outputType) {
        case "blob":
        case "arraybuffer":
            internalType = "uint8array";
        break;
        case "base64":
            internalType = "string";
        break;
    }

    try {
        // the type used internally
        this._internalType = internalType;
        // the type used to output results
        this._outputType = outputType;
        // the mime type
        this._mimeType = mimeType;
        utils.checkSupport(internalType);
        this._worker = worker.pipe(new ConvertWorker(internalType));
        // the last workers can be rewired without issues but we need to
        // prevent any updates on previous workers.
        worker.lock();
    } catch(e) {
        this._worker = new GenericWorker("error");
        this._worker.error(e);
    }
}

StreamHelper.prototype = {
    /**
     * Listen a StreamHelper, accumulate its content and concatenate it into a
     * complete block.
     * @param {Function} updateCb the update callback.
     * @return Promise the promise for the accumulation.
     */
    accumulate : function (updateCb) {
        return accumulate(this, updateCb);
    },
    /**
     * Add a listener on an event triggered on a stream.
     * @param {String} evt the name of the event
     * @param {Function} fn the listener
     * @return {StreamHelper} the current helper.
     */
    on : function (evt, fn) {
        var self = this;

        if(evt === "data") {
            this._worker.on(evt, function (chunk) {
                fn.call(self, chunk.data, chunk.meta);
            });
        } else {
            this._worker.on(evt, function () {
                utils.delay(fn, arguments, self);
            });
        }
        return this;
    },
    /**
     * Resume the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    resume : function () {
        utils.delay(this._worker.resume, [], this._worker);
        return this;
    },
    /**
     * Pause the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    pause : function () {
        this._worker.pause();
        return this;
    },
    /**
     * Return a nodejs stream for this helper.
     * @param {Function} updateCb the update callback.
     * @return {NodejsStreamOutputAdapter} the nodejs stream.
     */
    toNodejsStream : function (updateCb) {
        utils.checkSupport("nodestream");
        if (this._outputType !== "nodebuffer") {
            // an object stream containing blob/arraybuffer/uint8array/string
            // is strange and I don't know if it would be useful.
            // I you find this comment and have a good usecase, please open a
            // bug report !
            throw new Error(this._outputType + " is not supported by this method");
        }

        return new NodejsStreamOutputAdapter(this, {
            objectMode : this._outputType !== "nodebuffer"
        }, updateCb);
    }
};


module.exports = StreamHelper;

},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){
'use strict';

exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

try {
    exports.nodestream = !!require('readable-stream').Readable;
} catch(e) {
    exports.nodestream = false;
}

},{"readable-stream":16}],31:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var support = require('./support');
var nodejsUtils = require('./nodejsUtils');
var GenericWorker = require('./stream/GenericWorker');

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodejsUtils.newBufferFrom(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    return buf2string(buf);
};

/**
 * A worker to decode utf8 encoded binary chunks into string chunks.
 * @constructor
 */
function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    // the last bytes if a chunk didn't end with a complete codepoint.
    this.leftOver = null;
}
utils.inherits(Utf8DecodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8DecodeWorker.prototype.processChunk = function (chunk) {

    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

    // 1st step, re-use what's left of the previous chunk
    if (this.leftOver && this.leftOver.length) {
        if(support.uint8array) {
            var previousData = data;
            data = new Uint8Array(previousData.length + this.leftOver.length);
            data.set(this.leftOver, 0);
            data.set(previousData, this.leftOver.length);
        } else {
            data = this.leftOver.concat(data);
        }
        this.leftOver = null;
    }

    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
        if (support.uint8array) {
            usableData = data.subarray(0, nextBoundary);
            this.leftOver = data.subarray(nextBoundary, data.length);
        } else {
            usableData = data.slice(0, nextBoundary);
            this.leftOver = data.slice(nextBoundary, data.length);
        }
    }

    this.push({
        data : exports.utf8decode(usableData),
        meta : chunk.meta
    });
};

/**
 * @see GenericWorker.flush
 */
Utf8DecodeWorker.prototype.flush = function () {
    if(this.leftOver && this.leftOver.length) {
        this.push({
            data : exports.utf8decode(this.leftOver),
            meta : {}
        });
        this.leftOver = null;
    }
};
exports.Utf8DecodeWorker = Utf8DecodeWorker;

/**
 * A worker to endcode string chunks into utf8 encoded binary chunks.
 * @constructor
 */
function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
}
utils.inherits(Utf8EncodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8EncodeWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : exports.utf8encode(chunk.data),
        meta : chunk.meta
    });
};
exports.Utf8EncodeWorker = Utf8EncodeWorker;

},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){
'use strict';

var support = require('./support');
var base64 = require('./base64');
var nodejsUtils = require('./nodejsUtils');
var setImmediate = require('set-immediate-shim');
var external = require("./external");


/**
 * Convert a string that pass as a "binary string": it should represent a byte
 * array but may have > 255 char codes. Be sure to take only the first byte
 * and returns the byte array.
 * @param {String} str the string to transform.
 * @return {Array|Uint8Array} the string in a binary format.
 */
function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
}

/**
 * Create a new blob with the given content and the given type.
 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
 * an Uint8Array because the stock browser of android 4 won't accept it (it
 * will be silently converted to a string, "[object Uint8Array]").
 *
 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
 * when a large amount of Array is used to create the Blob, the amount of
 * memory consumed is nearly 100 times the original data amount.
 *
 * @param {String} type the mime type of the blob.
 * @return {Blob} the created blob.
 */
exports.newBlob = function(part, type) {
    exports.checkSupport("blob");

    try {
        // Blob constructor
        return new Blob([part], {
            type: type
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(part);
            return builder.getBlob(type);
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * An helper for the function arrayLikeToString.
 * This contains static information and functions that
 * can be optimized by the browser JIT compiler.
 */
var arrayToStringHelper = {
    /**
     * Transform an array of int into a string, chunk by chunk.
     * See the performances notes on arrayLikeToString.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @param {String} type the type of the array.
     * @param {Integer} chunk the chunk size.
     * @return {String} the resulting string.
     * @throws Error if the chunk is too big for the stack.
     */
    stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        // shortcut
        if (len <= chunk) {
            return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        return result.join("");
    },
    /**
     * Call String.fromCharCode on every item in the array.
     * This is the naive implementation, which generate A LOT of intermediate string.
     * This should be used when everything else fail.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @return {String} the result.
     */
    stringifyByChar: function(array){
        var resultStr = "";
        for(var i = 0; i < array.length; i++) {
            resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
    },
    applyCanBeUsed : {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array : (function () {
            try {
                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
            } catch (e) {
                return false;
            }
        })(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer : (function () {
            try {
                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
            } catch (e) {
                return false;
            }
        })()
    }
};

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    // TODO : we now have workers that split the work. Do we still need that ?
    var chunk = 65536,
        type = exports.getTypeOf(array),
        canUseApply = true;
    if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }

    if (canUseApply) {
        while (chunk > 1) {
            try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
            } catch (e) {
                chunk = Math.floor(chunk / 2);
            }
        }
    }

    // no apply or chunk error : slow and painful algorithm
    // default browser on android 4.*
    return arrayToStringHelper.stringifyByChar(array);
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this platform");
    }
};

exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Defer the call of a function.
 * @param {Function} callback the function to call asynchronously.
 * @param {Array} args the arguments to give to the callback.
 */
exports.delay = function(callback, args, self) {
    setImmediate(function () {
        callback.apply(self || null, args || []);
    });
};

/**
 * Extends a prototype with an other, without calling a constructor with
 * side effects. Inspired by nodejs' `utils.inherits`
 * @param {Function} ctor the constructor to augment
 * @param {Function} superCtor the parent constructor to use
 */
exports.inherits = function (ctor, superCtor) {
    var Obj = function() {};
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj();
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
exports.extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transform arbitrary content into a Promise.
 * @param {String} name a name for the content being processed.
 * @param {Object} inputData the content to process.
 * @param {Boolean} isBinary true if the content is not an unicode string
 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
 * @param {Boolean} isBase64 true if the string content is encoded with base64.
 * @return {Promise} a promise in a format usable by JSZip.
 */
exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

    // if inputData is already a promise, this flatten it.
    var promise = external.Promise.resolve(inputData).then(function(data) {


        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

        if (isBlob && typeof FileReader !== "undefined") {
            return new external.Promise(function (resolve, reject) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.onerror = function(e) {
                    reject(e.target.error);
                };
                reader.readAsArrayBuffer(data);
            });
        } else {
            return data;
        }
    });

    return promise.then(function(data) {
        var dataType = exports.getTypeOf(data);

        if (!dataType) {
            return external.Promise.reject(
                new Error("Can't read the data of '" + name + "'. Is it " +
                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
            );
        }
        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = exports.transformTo("uint8array", data);
        } else if (dataType === "string") {
            if (isBase64) {
                data = base64.decode(data);
            }
            else if (isBinary) {
                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                if (isOptimizedBinaryString !== true) {
                    // this is a string, not in a base64 format.
                    // Be sure that this is a correct "binary string"
                    data = string2binary(data);
                }
            }
        }
        return data;
    });
};

},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var sig = require('./signature');
var ZipEntry = require('./zipEntry');
var utf8 = require('./utf8');
var support = require('./support');
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the specified signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        if (!this.reader.readAndCheckSignature(expectedSignature)) {
            this.reader.index -= 4;
            var signature = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Check if the given signature is at the given index.
     * @param {number} askedIndex the index to check.
     * @param {string} expectedSignature the signature to expect.
     * @return {boolean} true if the signature is here, false otherwise.
     */
    isSignature: function(askedIndex, expectedSignature) {
        var currentIndex = this.reader.index;
        this.reader.setIndex(askedIndex);
        var signature = this.reader.readString(4);
        var result = signature === expectedSignature;
        this.reader.setIndex(currentIndex);
        return result;
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        var zipComment = this.reader.readData(this.zipCommentLength);
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded unless specified otherwise.
        var decodeContent = utils.transformTo(decodeParamType, zipComment);
        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.reader.skip(4);
        // this.versionMadeBy = this.reader.readString(2);
        // this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readData(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }

        if (this.centralDirRecords !== this.files.length) {
            if (this.centralDirRecords !== 0 && this.files.length === 0) {
                // We expected some records but couldn't find ANY.
                // This is really suspicious, as if something went wrong.
                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            } else {
                // We found some records but not all.
                // Something is wrong but we got something for the user: no error here.
                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
            }
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset < 0) {
            // Check if the content is a truncated zip or complete garbage.
            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
            // extractible zip for example) but it can give a good hint.
            // If an ajax request was used without responseType, we will also
            // get unreadable data.
            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

            if (isGarbage) {
                throw new Error("Can't find end of central directory : is this a zip file ? " +
                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
                throw new Error("Corrupted zip: can't find end of central directory");
            }

        }
        this.reader.setIndex(offset);
        var endOfCentralDirOffset = offset;
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset < 0) {
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                // console.warn("ZIP64 end of central directory not where expected.");
                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                }
            }
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }

        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
        if (this.zip64) {
            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
        }

        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

        if (extraBytes > 0) {
            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                // The offsets seem wrong, but we have something at the specified offset.
                // So… we keep it.
            } else {
                // the offset is wrong, update the "zero" of the reader
                // this happens if data has been prepended (crx files for example)
                this.reader.zero = extraBytes;
            }
        } else if (extraBytes < 0) {
            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
        }
    },
    prepareReader: function(data) {
        this.reader = readerFor(data);
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;

},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var CompressedObject = require('./compressedObject');
var crc32fn = require('./crc32');
var utf8 = require('./utf8');
var compressions = require('./compressions');
var support = require('./support');

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03;

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
var findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};

// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
        this.fileName = reader.readData(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
        }

        compression = findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
        }
        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        reader.skip(2);
        // this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        var fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        // will be read in the local part, see the comments there
        reader.skip(fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readData(this.fileCommentLength);
    },

    /**
     * Parse the external file attributes and get the unix/dos permissions.
     */
    processAttributes: function () {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;

        // Check if we have the DOS directory flag set.
        // We look for it in the DOS and UNIX permissions
        // but some unknown platform could set it as a compatibility flag.
        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

        if(madeBy === MADE_BY_DOS) {
            // first 6 bits (0 to 5)
            this.dosPermissions = this.externalFileAttributes & 0x3F;
        }

        if(madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
        }

        // fail safe : if the name ends with a / it probably means a folder
        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
            this.dir = true;
        }
    },

    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = readerFor(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var end = reader.index + this.extraFieldsLength,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        if (!this.extraFields) {
            this.extraFields = {};
        }

        while (reader.index + 4 < end) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readData(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }

        reader.setIndex(end);
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) {
            this.fileNameStr = utf8.utf8decode(this.fileName);
            this.fileCommentStr = utf8.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileNameStr = upath;
            } else {
                // ASCII text or unsupported code page
                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
            }

            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileCommentStr = ucomment;
            } else {
                // ASCII text or unsupported code page
                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = readerFor(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = readerFor(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;

},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){
'use strict';

var StreamHelper = require('./stream/StreamHelper');
var DataWorker = require('./stream/DataWorker');
var utf8 = require('./utf8');
var CompressedObject = require('./compressedObject');
var GenericWorker = require('./stream/GenericWorker');

/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;

    this._data = data;
    this._dataBinary = options.binary;
    // keep only the compression
    this.options = {
        compression : options.compression,
        compressionOptions : options.compressionOptions
    };
};

ZipObject.prototype = {
    /**
     * Create an internal stream for the content of this object.
     * @param {String} type the type of each chunk.
     * @return StreamHelper the stream.
     */
    internalStream: function (type) {
        var result = null, outputType = "string";
        try {
            if (!type) {
                throw new Error("No output type specified.");
            }
            outputType = type.toLowerCase();
            var askUnicodeString = outputType === "string" || outputType === "text";
            if (outputType === "binarystring" || outputType === "text") {
                outputType = "string";
            }
            result = this._decompressWorker();

            var isUnicodeString = !this._dataBinary;

            if (isUnicodeString && !askUnicodeString) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            if (!isUnicodeString && askUnicodeString) {
                result = result.pipe(new utf8.Utf8DecodeWorker());
            }
        } catch (e) {
            result = new GenericWorker("error");
            result.error(e);
        }

        return new StreamHelper(result, outputType, "");
    },

    /**
     * Prepare the content in the asked type.
     * @param {String} type the type of the result.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Promise the promise of the result.
     */
    async: function (type, onUpdate) {
        return this.internalStream(type).accumulate(onUpdate);
    },

    /**
     * Prepare the content as a nodejs stream.
     * @param {String} type the type of each chunk.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Stream the stream.
     */
    nodeStream: function (type, onUpdate) {
        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },

    /**
     * Return a worker for the compressed content.
     * @private
     * @param {Object} compression the compression object to use.
     * @param {Object} compressionOptions the options to use when compressing.
     * @return Worker the worker.
     */
    _compressWorker: function (compression, compressionOptions) {
        if (
            this._data instanceof CompressedObject &&
            this._data.compression.magic === compression.magic
        ) {
            return this._data.getCompressedWorker();
        } else {
            var result = this._decompressWorker();
            if(!this._dataBinary) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
        }
    },
    /**
     * Return a worker for the decompressed content.
     * @private
     * @return Worker the worker.
     */
    _decompressWorker : function () {
        if (this._data instanceof CompressedObject) {
            return this._data.getContentWorker();
        } else if (this._data instanceof GenericWorker) {
            return this._data;
        } else {
            return new DataWorker(this._data);
        }
    }
};

var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function () {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};

for(var i = 0; i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
}
module.exports = ZipObject;

},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],37:[function(require,module,exports){
'use strict';
var immediate = require('immediate');

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["finally"] = function (callback) {
  if (typeof callback !== 'function') {
    return this;
  }
  var p = this.constructor;
  return this.then(resolve, reject);

  function resolve(value) {
    function yes () {
      return value;
    }
    return p.resolve(callback()).then(yes);
  }
  function reject(reason) {
    function no () {
      throw reason;
    }
    return p.resolve(callback()).then(no);
  }
};
Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"immediate":36}],38:[function(require,module,exports){
// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = require('./lib/utils/common').assign;

var deflate   = require('./lib/deflate');
var inflate   = require('./lib/inflate');
var constants = require('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;

},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(require,module,exports){
'use strict';


var zlib_deflate = require('./zlib/deflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var c            = require('./zlib/constants');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');
var GZheader     = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      // Convert data if needed
      if (typeof dictionary === 'string') {
        dict = strings.string2buf(dictionary);
      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }

      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],42:[function(require,module,exports){
// String encode/decode helpers
'use strict';


var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":41}],43:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],44:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],45:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],46:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg     = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],48:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],49:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = require('../utils/common');
var adler32       = require('./adler32');
var crc32         = require('./crc32');
var inflate_fast  = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = zswap32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = { bits: state.lenbits };
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = { bits: state.lenbits };
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = { bits: state.distbits };
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":41}],51:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],52:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":41}],53:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}],54:[function(require,module,exports){
'use strict';
module.exports = typeof setImmediate === 'function' ? setImmediate :
  function setImmediate() {
    var args = [].slice.apply(arguments);
    args.splice(1, 0, 0);
    setTimeout.apply(null, args);
  };

},{}]},{},[10])(10)
});

var floatBar;
;(function(topObject,window,document,unsafeWindow){
    'use strict';

    //var siteInfo = [{}];
    var debug;
    var lang;
    function initLang(){
        let customLang=storage.getItem("customLang")||'auto';
        if(customLang=="auto")lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
        else lang=customLang;
        setLang(lang);
    }
    function i18n(key,inserts){
        var result=i18nData[key],i;
        if(inserts){
            if(typeof inserts!="object")inserts=[inserts];
            for(i=0;i<inserts.length;i++){
                result=result.replace("#t#",inserts[i]);
            }
        }
        return result?result:key;
    }
    var defaultSearchData=`Google | https://www.google.com/searchbyimage?safe=off&sbisrc=1&image_url=#t#
Yandex | https://yandex.com/images/search?source=collections&rpt=imageview&url=#t#
SauceNAO | https://saucenao.com/search.php?db=999&url=#t#
IQDB | https://iqdb.org/?url=#t#
3D IQDB | https://3d.iqdb.org/?url=#t#
Baidu | https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=#t#
Bing | https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:#t#
TinEye | https://www.tineye.com/search?url=#t#
Sogou | https://pic.sogou.com/ris?query=#t#
360 | http://st.so.com/stu?imgurl=#t#
WhatAnime | https://trace.moe/?url=#t#
Ascii2D | https://ascii2d.net/search/url/#t#
Trace Moe | https://trace.moe/?url=#t#
KarmaDecay | http://karmadecay.com/#t#
ZXing QRCode | https://zxing.org/w/decode?full=true&u=#t#
ImgOps | https://imgops.com/#b#`;

    var _GM_openInTab,_GM_setClipboard,_GM_xmlhttpRequest,_GM_registerMenuCommand,_GM_notification;
    if(typeof GM_openInTab!='undefined'){
        _GM_openInTab=GM_openInTab;
    }else if(typeof GM!='undefined' && typeof GM.openInTab!='undefined'){
        _GM_openInTab=GM.openInTab;
    }else{
        _GM_openInTab=(s,t)=>{window.open(s)};
    }
    if(typeof GM_setClipboard!='undefined'){
        _GM_setClipboard=GM_setClipboard;
    }else if(typeof GM!='undefined' && typeof GM.setClipboard!='undefined'){
        _GM_setClipboard=GM.setClipboard;
    }else{
        _GM_setClipboard=(s)=>{};
    }
    if(typeof GM_xmlhttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM_xmlhttpRequest;
    }else if(typeof GM!='undefined' && typeof GM.xmlHttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM.xmlHttpRequest;
    }else{
        _GM_xmlhttpRequest=(f)=>{fetch(f.url).then(response=>response.text()).then(data=>{let res={response:data};f.onload(res)}).catch(f.onerror())};
    }
    if(typeof GM_registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM_registerMenuCommand;
    }else if(typeof GM!='undefined' && typeof GM.registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM.registerMenuCommand;
    }else{
        _GM_registerMenuCommand=(s,f)=>{};
    }
    if(typeof GM_notification!='undefined'){
        _GM_notification=GM_notification;
    }else if(typeof GM!='undefined' && typeof GM.notification!='undefined'){
        _GM_notification=GM.notification;
    }else{
        _GM_notification=(s)=>{alert(s)};
    }

    function getRightSaveName(url, name, type, _ext) {
        /*
         0: i18n("default"),
         1: i18n("textFirst"),
         2: i18n("onlyUrl"),
         3: i18n("urlAndText")
        */
        type = parseInt(type || 0);
        if (name) name = name.split("\n")[0];
        let nameFromUrl = "";
        let ext;
        if (_ext) {
            ext = "." + _ext;
        } else {
            ext = url.match(/(\.\w{2,5})(\?|@|$)/);
            if (ext) {
                ext = ext[1];
                nameFromUrl = url.replace(/.*\/([^\/]+?)\.\w{2,5}(\?|@|$).*/, "$1");
                try {
                    nameFromUrl = decodeURIComponent(nameFromUrl);
                } catch (e) {}
            }
        }
        switch (type) {
            case 1:
                name = (name || nameFromUrl || url || document.title || "image").substr(-50);
                break;
            case 2:
                name = (nameFromUrl || url || "image").substr(-50);
                break;
            case 3:
                if (nameFromUrl && !name) {
                    name = nameFromUrl.substr(-50);
                } else if (nameFromUrl && name) {
                    name = nameFromUrl.substr(-50) + " - " + name.substr(-50);
                } else if (!nameFromUrl && !name) {
                    name = (url || document.title || "image").substr(-50);
                }
                break;
            default:
                name = (nameFromUrl || name || url || document.title || "image").substr(-50);
                break;
        }
        return name.replace(/.*\/([^\/]+?)(\?|@|$).*/, "$1").replace(/[\*\/:<>\?\\\|]/g, "").replace(/\.\w{2,5}$/, "").trim() + (ext || ".png");
    }
    var _GM_download=(typeof GM_download=='undefined')?(url, name, type)=>{
        name=getRightSaveName(url, name, type);
        saveAs(url, name);
    }:(url, name, type)=>{
        name=getRightSaveName(url, name, type);
        let urlSplit=url.split("/");
        GM_download({
            url: url,
            name: name,
            headers: [{
                origin: urlSplit[0]+"//"+urlSplit[2],
                referer: url,
                accept: "*/*"
            }],
            onerror: e => {
                console.log(e);
                saveAs(url, name);
            },
            ontimeout: e => {
                console.log(e);
                saveAs(url, name);
            }
        })
    };
    function dataURLToCanvas(dataurl, cb){
        if(!dataurl)return cb(null);
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.setAttribute("crossOrigin","anonymous");
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            cb(canvas);
        };
        img.onerror = function(){
            cb(null);
        };
        img.src = dataurl;
    }
    function urlToBlob(url, cb, errCb, forcePng) {
        _GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            responseType:'blob',
            timeout:20000,
            headers: {
                origin: location.origin,
                referer: location.href,
                accept: "*/*"
            },
            onload: function(d) {
                let blob = d.response;
                let ext = blob.type.replace("image/", "");
                if (ext == "webp" || forcePng) {
                    var self = this;
                    var a = new FileReader();
                    a.readAsDataURL(blob);
                    a.onload = function (e) {
                        dataURLToCanvas(e.target.result, canvas => {
                            canvas.toBlob(blob => {
                                cb(blob, "png");
                            }, "image/png");
                        });
                    };
                    a.onerror = function (e){
                        if (errCb) errCb();
                    }
                }else{
                    cb(blob, ext);
                }
            },
            onerror: function(){
                if (errCb) errCb();
            },
            ontimeout: function(){
                if (errCb) errCb();
            }
        });
    }
    function downloadImg(url, name, type, errCb) {
        urlToBlob(url, (blob, ext) => {
            saveAs(blob, getRightSaveName(url, name, type, ext));
        }, () => {
            _GM_download(url, name, type);
            if (errCb) errCb();
        });
    }
    var prefs;
    var escapeHTMLPolicy;
    if (unsafeWindow.trustedTypes && unsafeWindow.trustedTypes.createPolicy) {
        escapeHTMLPolicy=unsafeWindow.trustedTypes.createPolicy('pvcep_default', {
            createHTML: (string, sink) => string
        });
    }

    function getBody(doc){
        return doc.body || doc.querySelector('body') || doc;
    }
    function createHTML(html){
        return escapeHTMLPolicy?escapeHTMLPolicy.createHTML(html):html;
    }
    function init(topObject,window,document,arrayFn,envir,storage,unsafeWindow){
        // 默认设置，请到设置界面修改
        prefs={
            floatBar:{//浮动工具栏相关设置.
                butonOrder:['actual','current','gallery','magnifier','download'],//按钮排列顺序'actual'(实际的图片),'current'(当前显示的图片),'magnifier'(放大镜观察),'gallery'(图集),'search'(搜索原图)
                additionalFeature: 'open',
                invertAdditionalFeature: false,
                listenBg:true,//监听背景图
                showDelay:100,//浮动工具栏显示延时.单位(毫秒)
                hideDelay:566,//浮动工具栏隐藏延时.单位(毫秒)
                position:'top left',// 取值为: 'top left'(图片左上角) 或者 'top right'(图片右上角) 'bottom right'(图片右下角) 'bottom left'(图片左下角);
                stayOut:false,
                stayOutOffsetX:0,
                stayOutOffsetY:0,
                download2copy:false,//废弃
                offset:{//浮动工具栏偏移.单位(像素)
                    x:-15,//x轴偏移(正值,向右偏移,负值向左)
                    y:-15,//y轴偏移(正值,向下,负值向上)
                },
                forceShow:{//在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.
                    enabled:true,//启用强制显示.
                    size:{//图片尺寸.单位(像素);
                        w:100,
                        h:100,
                    },
                },
                showWithRules:true,
                minSizeLimit:{//就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情况下),如果图片显示大小小于设定值,那么也不显示浮动工具栏.
                    w:50,
                    h:50,
                },
                sizeLimitOr:false,

                keys: {
                    enable: true,
                    actual: 'a', //  当出现悬浮条时按下 `a` 打开原图
                    search: 's',
                    current: 'c',
                    magnifier: 'm',
                    gallery: 'g',
                    download: 'd'
                },
                globalkeys: {
                    invertInitShow: false,
                    ctrl: true,
                    alt: false,
                    shift: false,
                    command: false,
                    type: "hold",
                    closeAfterPreview: false,
                    previewFollowMouse: true
                }
            },

            magnifier:{//放大镜的设置.
                radius: 77,//默认半径.单位(像素).
                wheelZoom:{//滚轮缩放.
                    enabled:true,
                    pauseFirst:true,//需要暂停(单击暂停)后,才能缩放.(推荐,否则因为放大镜会跟着鼠标,如果放大镜过大,那么会影响滚动.)..
                    range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0,5.0,6.0,7.0,8.0,9.0],//缩放的范围
                },
            },

            gallery:{//图库相关设定
                loadMore:false,
                loadAll:true,//加载更多时是否加载全部页面
                viewmoreEndless:true,
                fitToScreen:true,//图片适应屏幕(适应方式为contain，非cover).
                fitToScreenSmall:false,
                scrollEndToChange:true,
                exportType:'grid',
                sidebarPosition: 'bottom',//'top' 'right' 'bottom' 'left'  四个可能值
                sidebarSize: 120,//侧栏的高（如果是水平放置）或者宽（如果是垂直放置）
                sidebarToggle: true, // 是否显示隐藏按钮
                transition:false,//大图片区的动画。
                preload:true,//对附近的图片进行预读。
                max:5,//最多预读多少张（前后各多少张）

                zoomresized: 25, // 图片尺寸最少相差比例，单位：%
                scaleSmallSize: 250, // 图库的新类别，缩放的图片，尺寸的高或宽都小于该值
                showSmallSize:true,//是否默认显示小尺寸图片
                disableArrow:false,

                scrollEndAndLoad: false, // 滚动主窗口到最底部，然后自动重载库的图片。还有bug，有待进一步测试
                scrollEndAndLoad_num: 3, // 最后几张图片执行

                autoZoom: true, // 如果有放大，则把图片及 sidebar 部分的缩放改回 100%，增大可视面积（仅在 chrome 下有效）
                descriptionLength: 32, // 注释的最大宽度
                editSite: "",
                defaultSizeLimit:{
                    w:160,
                    h:160
                },
                searchData:defaultSearchData,
                downloadWithZip:true,
                autoOpenViewmore:false,
                viewmoreLayout:0,
                downloadGap:0
            },

            imgWindow:{// 图片窗相关设置
                suitLongImg: true,
                fitToScreen: true,//适应屏幕,并且水平垂直居中(适应方式为contain，非cover).
                fitToScreenSmall: false,
                syncSelectedTool:true,//同步当前选择的工具，如果开了多个图片窗口，其中修改一个会反映到其他的上面。
                defaultTool:'hand',//"hand","rotate","zoom";打开窗口的时候默认选择的工具
                close:{//关闭的方式
                    escKey:true,//按esc键
                    dblClickImgWindow: true,//双击图片窗口
                    clickOutside:'', // 点击图片外部关闭。值为''|'click'|'dblclick'；无或点击或双击
                },
                overlayer:{// 覆盖层.
                    shown:false,//显示
                    color:'rgba(200,200,200,0.3)',//颜色和不透明度设置.
                },
                backgroundColor:'rgba(40,40,40,0.8)',
                shiftRotateStep:15,// 旋转的时候，按住shift键时,旋转的步进.单位:度.
                zoom:{//滚轮缩放
                    range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0,5.0,6.0,7.0,8.0,9.0],//缩放比例.(不要出现负数,谢谢-_-!~)
                    mouseWheelZoom:true,//是否允许使用滚轮缩放。
                },
                zIndex: 2147483646
            },

            //等图片完全载入后,才开始执行弹出,放大等等操作,
            //按住ctrl键的时候,可以临时执行和这个设定相反的设定.
            waitImgLoad: false,

            //框架里面的图片在顶层窗口展示出来，但是当frame与顶层窗口domain不一样的时候，可能导致图片被反盗链拦截，
            //按住shift键，可以临时执行和这个设定相反的设定
            framesPicOpenInTopWindow: true,

            debug: false,
            customLang:'auto',
            customRules:`[
//  {
//    name: "Example, can be safely deleted",
//    url: /https?:\\/\\/www.google(\\.\\w{1,3}){1,3}\\/search\\?.*/,
//    getImage: function(a) {
//    },
//    src: /avatar/i,
//    r: /\\?.*$/i,
//    s: ''
//  }
]`,
            firstEngine:"Tineye"
        };

        const lazyImgAttr = ["data-lazy-src", "data-lazy", "data-url", "data-orig-file", "zoomfile", "file", "original", "load-src", "imgsrc", "real_src", "src2", "origin-src", "data-lazyload", "data-lazyload-src", "data-lazy-load-src", "data-ks-lazyload", "data-ks-lazyload-custom", "data-src", "data-defer-src", "data-actualsrc", "data-cover", "data-original", "data-thumb", "data-imageurl", "data-placeholder", "lazysrc"];
        var tprules = [
            function(a) {
                if (this.currentSrc && !this.src) this.src = this.currentSrc;
                var oldsrc = this.src;
                var newsrc = null;

                if (this.getAttribute("_src") && !this.src) {
                    newsrc = this.getAttribute("_src");
                } else {
                    for (let i in lazyImgAttr) {
                        let attrName = lazyImgAttr[i];
                        let attrValue = this.getAttribute(attrName);
                        if (attrValue) {
                            newsrc = attrValue;
                            break;
                        }
                    }
                }
                if (!newsrc && this._lazyrias && this._lazyrias.srcset) {
                    newsrc = this._lazyrias.srcset[this._lazyrias.srcset.length - 1];
                }
                if (newsrc) {
                } else if (this.srcset) {
                    var srcs = this.srcset.split(/[xw],/i), largeSize = -1;
                    srcs.forEach(srci => {
                        let srcInfo = srci.trim().split(" "), curSize = parseInt(srcInfo[1] || 0);
                        if ((srcInfo[1] || !oldsrc) && curSize > largeSize) {
                            largeSize = curSize;
                            newsrc = srcInfo[0];
                        }
                    });
                }

                return oldsrc != newsrc ? newsrc : null;
            }
        ];

        //图标
        prefs.icons={
            actual:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAD////29vbKysoqKioiIiKysrKhoaGTk5N9fX3z8/Pv7+/r6+vk5OTb29vOzs6Ojo5UVFQzMzMZGRkREREMDAy4uLisrKylpaV4eHhkZGRPT08/Pz/IfxjQAAAAgklEQVQoz53RRw7DIBBAUb5pxr2m3/+ckfDImwyJlL9DDzQgDIUMRu1vWOxTBdeM+onApENF0qHjpkOk2VTwLVEF40Kbfj1wK8AVu2pQA1aBBYDHJ1wy9Cf4cXD5chzNAvsAnc8TjoLAhIzsBao9w1rlVTIvkOYMd9nm6xPi168t9AYkbANdajpjcwAAAABJRU5ErkJggg==',
            current:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAQlBMVEUAAAD///+Tk5P39/fz8/POzs5UVFQpKSnb29vJycmxsbGwsLCmpqafn5+NjY1+fn58fHx4eHg/Pz8hISEZGRkNDQ1kumAIAAAAY0lEQVQoz63RWwqAIBBAUW+l9n63/62WVGDiREX3x4+DIjMKIYWK9hUIOiG89QwyLQCtBLUEmQC27N796iiBIgoAAeh8Oy2AucACk3sJqHyYU6AfwWU8GADSZIeGu7H/u1qhFbaeAcJXcp5yAAAAAElFTkSuQmCC',
            magnifier:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAUVBMVEUAAAD///86OjohISGcnJxYWFinp6djY2Pc3NywsLBPT09DQ0MVFRW8vLz8/PyoqKh5eXm2trb39/fw8PDZ2dnV1dXKysqTk5MLCwvl5eUpKSkk6YqhAAAAsElEQVQoz4XQ1w7DIAxAUZsZVvZq//9DCyTIpG3a+xApPkIMwJsA4WsneK2atlHav4EzQnLgUhh3ARfs+WuDq8Aby0r9MmHsAC2AQUno+DlByQxdBqkIGp6ADRl4Q9BChC4MXV7T/llBe7BAe1xOtT85nYruAWfWeAJwoS/zdcaVANxS3mpO1yaASatHel2GMVkBwo7IAbYEpgY/xknPMGcr6NNg3A4QFVwr8NlvuOkFpbsFbrIaILIAAAAASUVORK5CYII=',
            gallery:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAP1BMVEUAAAD///94eHgZGRn39/fz8/POzs6xsbGSkpJ9fX1UVFQpKSnb29vJycmmpqafn5+UlJSNjY0/Pz8hISENDQ2fWpEMAAAAcUlEQVQoz43SWQrEIBRE0Xe7M8/T/tcaNSKCKUh95nCDiIaYYa9zUDQRiiaCalANqkE0n6BuBLArWBTUAsa2/3yqfwYdzAl+GeCWAN9YM7nvo4chgoXmgjP8CdoEvqmA/oCQRHgat2p7YM2gvHb9GMRu7acCGLmlyNoAAAAASUVORK5CYII=',
            search:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAXVBMVEUAAAD///+MjIwmJibNzc2UlJTd3d2lpaUKCgrT09O/v78YGBjj4+MvLy8PDw/IyMh5eXn5+fn29vby8vLo6OjDw8O7u7u3t7ewsLCcnJx1dXVubm4+Pj43NzdkZGStc/JSAAAA4ElEQVQoz52RWW7DMAxE9bR635fYcXr/Y5aW7TYIGqDI/EjUAzRDUvFGCvWn/gHMOnmfNeYFJLonqnPVM8hrIA3B7of5BXkK47bXWwbe/ACp3OWqwSYnaI73+zStSST6AKYjE/sbQCZkpi0j0HSlUl/gPdwleM8SgSfIRzd8laRkcl0oIihYIkiVqhnl6hgicPRGrMHW0Ej4gXCYt8xiPoIw6TtANL8CVtpanSu1xvARJHYnpxpIq6tzU8D8UKIywHCNZCcpUDuXteDL57HngVMhf1nUQ9uisG47y492/kbfyJQHZ5yu1AMAAAAASUVORK5CYII=',
            download:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAASFBMVEUAAAD///86Ojq8vLxXV1ciIiKcnJympqZjY2MxMTHc3NywsLBDQ0NPT08VFRV5eXn39/fw8PDZ2dnV1dXKysqUlJTl5eUNDQ1EnTQhAAAAtUlEQVQoz33QWRKDIBAE0Gl2AXFP7n/TDKIEk5j+wKp+ZQ0D4SYE+pkDkrMe3rr0ATEYpUkrE+IFouyppJexgRR6IQQAPodlAqeAMyRoByIyjo8DrGpA2Td43YD2FfJHokR2hOsf8uy1v87oZOnrjHorFu7rreoexKLzhiFlqJsPxJL7dcZagWU532oG0ABNzj7y6wpwVAOgJ8AztgyhhTRyM0TsUQ0MuRi3AqaBayp85T/c5AVMKwUv6mnXTQAAAABJRU5ErkJggg==',

            retry:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzIyMjhBQTUzNjdDMTFFMkI3QThBNTAwQUMxRDJGREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzIyMjhBQTYzNjdDMTFFMkI3QThBNTAwQUMxRDJGREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMjIyOEFBMzM2N0MxMUUyQjdBOEE1MDBBQzFEMkZEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMjIyOEFBNDM2N0MxMUUyQjdBOEE1MDBBQzFEMkZEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj9mTMsAAALCSURBVHjadFJLSFRhFD73v4+5d+4dmgkkEcxFOOo4OQ90FgVJ2lhihFk5ozWKGxeBBEWFmA/GzFVFu1xFRrVrHbiJaGVqCDUZEdKAi1mkQjWv++r817kXW/hfzv1f53zfOf93mNraWjhoMIQBQsiiaZjXDcP4s/8um81aMzHh4I/neJBlOSUr8meWY9tpgH1nD2KtbcPBEjYmCMIbSZR+u91u0+PxAFqdoijveIF/yDCMsC8eONM07XQFZJyS3NK4y+UiCAIcxwHP83vALEv3N/N/813FYjGBRxkHAOsEURSfSpI0IrtlQCYrANkcJgpI96FwqO5K/2WPk4H147gOTHlEkRXgeA7CkTAkBxLgb/BD34VLQFisFImSA0lIDibeY8iGA0BRa2pqZstq2XJsamqEqZnJt3g3fepE+7LiUUzfYR/cun0LotHIdFskli6Xy7C1tVUBQKlUXW2lZaiqCr19vatt0Vh3qVSy0g4EAzCTntmtrj7SH2mJLmmqBva72RmwxUJRwPotAJ/Pd6dULIGu66ARDR4/efQJ73pbmkNZerZfAUvGtfVVQIkAGwU0TYMHc/M56khZKCAGnww2Hs/qmi4h2ShmOopzwgEIBcN6vb9epcEUZHNzc9ZqFQQwdAOa6gMFeo4NdVd0iQuiJC6g/5gDQNnOdZ9dozN90EK+cBFVWQAGDlVqFVDSCWS+hz1C5YaxG2P5/wDiXfHJM/FOR2+UdBSbaRfXPwWXUELW+9gbLO2NnvM90NF5Ou08Ik2zuSG4tLq+slhVVTX06uVrwCDA3qdlHKVZ0UBqV68NQmo49Qz9P+Ryub0O9vq8QBgC335sCLifynzJjC8+f0FWPq4A1Ztm1NrWCkPDKSPQHJhHn7T/WEN5+9d2BcDr3VtUmL5+z8RwO4EWR5PQCmhLaHP4oMu2Qjs7O1bcPwEGAErKEckpB5KiAAAAAElFTkSuQmCC',
            loading:'data:image/gif;base64,R0lGODlhGAAYALMPACgoKOnp6cnJyaamppmZmVhYWGdnZ3d3d4aGhgEBAdnZ2UNDQ/b29r29vbGxsf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUU5MTZGNDMxQ0E4MTFFMkE1Q0NEMTFGODU0MkUzNzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUU5MTZGNDQxQ0E4MTFFMkE1Q0NEMTFGODU0MkUzNzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRTkxNkY0MTFDQTgxMUUyQTVDQ0QxMUY4NTQyRTM3NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRTkxNkY0MjFDQTgxMUUyQTVDQ0QxMUY4NTQyRTM3NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUFAA8ALAAAAAAYABgAAATMMMlJq710GQQAMgBmLYMSKMuirMQiSocZnOlqH68h06qtFJhPomASEDoEwQpYMFQWM2fhEJoADkyBwDVxMBgBp6igVBAm0C8D8YqtBFWDWlHFABo2MQLMGLwkCFoCbAkAKQt1IoaLEh2Of4WOVQUDBANiL4ENAjgJJAOViRYADoJAhZagpxgGgg11BqAtLwWbgxQABLMaiQAGLrUNXGguJA4EVB4DDQ7AmE8DDtIDHQ4N18200dIO1dfMq3YI0dSkDQMckI1NHb+i6vARACH5BAUFAA8ALAAAAAABAAEAAAQC8EUAIfkEBQUADwAsAQABABYAFgAABJbwySkPoYtq6gILEzhsmsd8YQCS4YlK6roVmeEpY0gdE0AQNQRLolBMDoMBcEiUjHzJQYFJUSwW0QtVQCkoBwbqg1A0PgBo8SSj3mRqjjhPLVAI444cs1EOD/BhQwdlXA8HcXpDdQpaD0lMcw8ChRJTEg4NiQ4CDZYsmA0NDhINk5yeG6ANE6WTq0MZmKMPpa9tcweoFBEAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFQAVAAAEgvDJ+cAykhzKJzjEQABPwARONxXhIJImc6rP0r6lfGKqLfIDxe7Bk7gki0IHgSlKHI4BjRMIGKGpqaRqfWC1FK4BuwGbz+gOqfFgmwkKhaRBPws4dPdZ3m5ktXwUWUoqhHEdBQ0CDggZDYGFigICbgJxCncqBpKUEpZxAk4dipWYHREAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAEn/DJKcs0C9A9FxrO8ADEQBzcBjrhWA6mlT5rS8Lmwhky+KAPQ4mgeyA6LFmqUAwEZIhGw6FMGQIMBkXaMMwkiKz2UeCKvhKFGNUAoyUDBpbwrkuK9oXuIGgIjnYTBQKEDnZOARJ+hEAzCIgPOgiEDVUzTmcPUjKNE4AzMgIKbRMCDwoSBp2lCq2mC6hpaKKukbF2BKICerFEdQsGgJ8cEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFACH5BAUFAA8ALAEAAQAWABYAAASU8Mk5zyw0a9ecHM6AABrFNd3nrEMpFWf6gKz7eq10gPmCTaiJwbYgEEgSgaBhkxQHA8ujoRQ0HwUolFT1XAnagoV6lRgG4GE5A2hTkGuKQvEglAeMAMM+VzCvCgyCUn1lgnkTc1ZNBnoMXg9KV0ONARRqDwoBAnYSmg+YJXQBAXQSpJahGZ+lE6imTXQKSK1rcGYuEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFACH5BAUFAA8ALAEAAQAWABYAAASV8MlJ5amYkiaadI3zLJlkcEL3NaxYPqj6gO0rcQ5ChUWWSj2MYTIYkB4EhUJgkwwcOYlAqbjYoK4H1dOcQaVMQvfgeEpIx25lwVY/APCHTqs2DAiD4YTZxBdJfHI2BUV3AEgSCk0LflYkihJzGYwEhxV6FAMPDAFnQRRDnWcPAQymohlWoiSlpg9WJZqdrAwPml1pTREAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAEi/DJKQ2iOFOhhGxCo2Gc0n1C2hjjU54PqBbZMXGihDjhxE6mloT2cDgAGIVQ4mjkHsplxdlwPH5SyYAqMUWzVpsEmS2bywfHwGoIuL9Co4OmcAek8sHEnV1bgVeBGQULWnoUPwEMCocGBAMEhS2KDAx3AI8DkJIalJYPmJqbcYqXjwQGZEsHBEOcGBEAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAEk/DJSSUyNc+hnlqPoAiENh2dlIrKaKrTF7auhnlhKTV1YUuHTPBRaDRAj0Eg8JoUBQLKktkMQRuSabTqgEYR1KpF0NhKkOK0mhFgDNSOR5BBTw+MWAmdUTXgN3QBNy8ORghSZz4Vgw5xJ2cEAwQ3BwMOby8LkQOSAEmNly8Fm5yelo0DihoAB5EEppdDVQALN4MZEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFADs=',
            loadingCancle:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzBFMjYzRTUxQ0IwMTFFMkE5RkRDMDFGNUY3NTA2OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzBFMjYzRTYxQ0IwMTFFMkE5RkRDMDFGNUY3NTA2OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMEUyNjNFMzFDQjAxMUUyQTlGREMwMUY1Rjc1MDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMEUyNjNFNDFDQjAxMUUyQTlGREMwMUY1Rjc1MDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmI2XfsAAADqSURBVHja7FTLDYMwDI1puwQr5MCJKZCyB3cklsg9GzAAEjAEezBFhRtHISr/T9VD1VgyJP68ZzsBQET2TQFP8McEaZoGJ7F6pdTMeN9KaNv2nR3iODYLbaeX82k7nO6g67oRiBCC6VgDBABYluUIhx5hGM5w9sbgKrOARLgIfrWDQXCvgLUOVgmiKGJ2HEarqhoFJklicod8zjkriuL0iLY6OHS/jxCgrn5mtDb8lADrunabPM8fpMPe+vASAc20aZrpgT6tusOlGIpdk60PLciy7EYLKWW/dIO0P5gU2vu/qSf4QYKXAAMAJ5qBE+5PPaUAAAAASUVORK5CYII=',

            hand:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI3OEJEQkYxQ0U3MTFFMjg5NDZFNzJBMTc5RTBBMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI3OEJEQzAxQ0U3MTFFMjg5NDZFNzJBMTc5RTBBMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjc4QkRCRDFDRTcxMUUyODk0NkU3MkExNzlFMEEzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjc4QkRCRTFDRTcxMUUyODk0NkU3MkExNzlFMEEzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjEL5KQAAAHBSURBVHja5FRNywFhFGVmkM9EEaWQEik1Fqws/AWJn2Dl/8haKTsW/ANljaQslLLwka98NjNOpvTkfeadUXo371k83bndOXPuufcZfT6f130DjO5L+EOi0Wg0GAxUyzhqdj6fX6/XYDDIsmytVlssFo1G43w+z2Yzh8Ph9/u1KspkMsViURRF+dHn8+G0WCzVarVQKHygqFQqCYIwHo+Px+MrGY1GcTqdzg882mw2OMPhMOheSbvdTvY+nU7ViWCKJEmxWOx0OklPrNdrtCbHt9stnU6Xy2V1ot1uB4O8Xq/b7RafQEfJZBLB/X4/HA5YY7PZTL7CxuNxOdput5g0JNhsNqPRGIlE8PFUKiWrgAQ5QNcejycQCGCsqKcQ8TxfqVSsVmu/30d1NpuVaHC5XGAxmUytVgtfpUxtuVxyHIfBJxKJer2+3+9hitL6YaFQT28N9AzDhEIhGAF1l8vFYDBQRWFLu90uKed9j3q9HkwFF4rgJTl7EhC7Wq1U9qjT6UAzLBCVIW+Z+kI2m01MEIGgAK1EQLvdFpTxZvNvRPBoOBxS+8IQcD+0XlpgMpnkcrmfefIak9D/53+2RjwEGAAlkHhWHev9/QAAAABJRU5ErkJggg==',
            rotate:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjM2M0UyRTcxQ0U3MTFFMjgxRDNEQkM4N0Q3NTg2QkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjM2M0UyRTgxQ0U3MTFFMjgxRDNEQkM4N0Q3NTg2QkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMzYzRTJFNTFDRTcxMUUyODFEM0RCQzg3RDc1ODZCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMzYzRTJFNjFDRTcxMUUyODFEM0RCQzg3RDc1ODZCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlX779gAAAJXSURBVHja3JQ5a6pREIbzqbigoqBeNyI2pghEAnZiJZZ2/gMLQZBgoYUEXIJgYyD+gYhYxcJGtDKQH6CIImKhuIAGFHHfl9yXyPV6DZoUKS6ZYjhHzzxn5p05H2EwGM6+w0hn32T/H4hy7I/RaNTpdCaTCYVCWa1W6/X617vVajV4BoPxOQgx1WpVoVCYzWa5XD6fz2k0Gn58fHxMJpMmk+n5+RlbMpm8H0UcdA0n6vX67e2tQCCIx+OlUqlQKFxeXl5fX+t0OuQokUiAttvtfD5/n3Wo0XA49Hq9r6+vgUAAFKSGLXw6nQady+WiWFx2c3OD+05lpNfrZ7MZSsAa8R6Ph0qlLhYLv99/d3fH4XB2J/v9Pi47CtpZLpfTarVisVilUkEjsFwuFyT7avszmUyr1cLCarUul8tsNnt/f48t8kJ2yPGrIIfDgRgsNBoN2ux2u5VKZT6fh3aQ1ul0HmMdglgslsVi2Sa1NQj89PQUiUQwTSQSCZJXKpXPQegFhCAIYrPZNJtNeOTi8/l4PN763cBC1h9ZpH11Go0GWo6bUQK80WiEPz8/Z7PZ0Gv9x8B6eHg4CrLZbEwm8+XlBY8ABSKATqfDq9VqeIzfDiQUCkOh0NEngmvRl0Qi0W63RSLRwblutwsEFlKpNBgM9nq9gwNkjP92hXbIZLKrqys8js2/ViwW397eoDooyAWjeEpsDHQ0GsULWH0w5IhROEE57BpYsVjsIwjtu7i4CIfDg8Hg2ED+LW1r4/EYg4dm7+pKpVLlchkjPp1OT3zYiJ/78f8twABFT5G5Yf+a5QAAAABJRU5ErkJggg==',
            zoom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzI2NDFENzExQ0NBMTFFMjhDOUNGQ0NDOTYzODI4REUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzI2NDFENzIxQ0NBMTFFMjhDOUNGQ0NDOTYzODI4REUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMjY0MUQ2RjFDQ0ExMUUyOEM5Q0ZDQ0M5NjM4MjhERSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMjY0MUQ3MDFDQ0ExMUUyOEM5Q0ZDQ0M5NjM4MjhERSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUXtsUAAAHTSURBVHjazJTHakJREIZzc63YS2xYsKx05cYXEHwBfQb3PpgbwRdw60oXtoWoWBAL9i7mQyGERMNNWeRfXA4znO/M/GfuEZLJ5NNf6Pnpj/T/QLK70cPhMBgMlsslC4VCodPpnE4ni++BVqsViFQqFQgEjEbjbDZrNpu5XA6cVqt9BBLD4fCHWuRyeSaT4fxOp1Ov17fbrdvtTiQSpVLpdDqJoijJo/1+n06nQTQajcvlQkXn87larbZaLeJkpZodj8fppd/v04UgCFD46vX6Xq83nU7JSgX5/X4oarWawyFOJpP5fL7b7TQaDXGyUs2mF7ygKTafryKITSqVitKi0ajUiqjCZDJh6of48XgkTlYqaDQacUcc/nyVeNVt7fV6y+UylUoCFYtFs9nMBMES3ykYDNpsNpfL1e1277LuzNFwOIzFYlarFYPokUUkEgmFQuv1+uWqQqHAncpksq9AaLFYMERs8Hg8ZNnD3dGawWDgGIfDYbfbP7ME6e8RPw30zWbDGrOy2azP53sb9DsVPVKlUuEe+OPwiH6xkgjz9W0QqtVqsGjqxrrN6g/fI56B8XhssVgY3bdyHr5HXyufz+OOUqnkB/wVCLXb7X//Zr8KMADSBu6sAZizOwAAAABJRU5ErkJggg==',
            flipVertical:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5RkM3NzYxQ0Y0MTFFMkFGQzk4NzFDMzc4MTVBMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5RkM3NzcxQ0Y0MTFFMkFGQzk4NzFDMzc4MTVBMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlGQzc3NDFDRjQxMUUyQUZDOTg3MUMzNzgxNUExMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlGQzc3NTFDRjQxMUUyQUZDOTg3MUMzNzgxNUExMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoWGg/MAAAFCSURBVHja3JTNboMwDMftaVyKVlrYCU68Ae/Ci/MQE1JRCuok1gNCnuMExgQEJnGaUaIA8S9/fwDmeQ5H2AscZIeBXqc3Xde1bcvzppvneb7v87wMSpIkjuOdEsqyrKpqGcSUoigQkPQgQuQZkN8gkKz0JUuALMtWQWxBEOyRQ+4csYXXUCTovYR6IGo3lHsYFRJtgKL3SPbooSMD8TPBoDxGOYeo73snKArFGa2z4AxJpOEo7XarXKArhzac7TKEDdDb+Qw/9TGx2AFDesAG7MyRfzqtVAn/0NlsX88n6BzIhNNiGyGms+ZFm4E+H495OrYStgSq68Y0r9QKx8sCLdH0lhN0r5XeRxYCQ3bpl7gFkTOQuoNtOrQlI3HTeZl8bQCX4OICNU2z8+t3gZRSaZruBPHmVdCH2H/5Zx8G+hZgAJcamqB3G0N7AAAAAElFTkSuQmCC',
            flipHorizontal:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUVBRDRDOTkxQ0Y0MTFFMkI0OUU5NThEQzI4NTFGNDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUVBRDRDOUExQ0Y0MTFFMkI0OUU5NThEQzI4NTFGNDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RUFENEM5NzFDRjQxMUUyQjQ5RTk1OERDMjg1MUY0MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUFENEM5ODFDRjQxMUUyQjQ5RTk1OERDMjg1MUY0MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pnl92swAAAFKSURBVHja3JTJjoMwDIbxqBw6SKVAT3DiDXgX3l9cRkhFLKIjekHIk9gJoXQhB07jILPFX37bAcjz3NnDvpydbDfQYXkzjuMwDMJvhrmu63me8K9BSZLEcWwpoSzLqqpegwSlKIogCKJLFIWXMAxOvv99PA73++/t1nVt07RN3bRd2/d9lmVL0LsagRhkSA75Sp7h4fUnEIhZKkhPpzhyqPBg1TVAMcBEMJnRjAJECxBKkloUlo+FWLkG8S1SU8sDPjDmM2u0UwScnJFDUCEHqIIrpR9qhHIAeZ2Tfj4rsUptlZW6RWSk2RAbIFw2Ho2nxFSN0E4RzUe9qUxiYPTZ1Agck5rqDhdbooC1gGNZbN7JWpFOEFbpb9VIBZnNrLCyj6KZT4znr7+u6zRNxcU0Tdequi4+7tn881kcPPkt6Ifsv/yzdwP9CTAAzDedWzss4SgAAAAASUVORK5CYII=',
            compare:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAYFBMVEVTU1O6urqrq6tmZmawsLCzs7NxcXFwcHCvr6+oqKiamppcXFxXV1dVVVVzc3Otra1qamp4eHhfX1+1tbWlpaWioqKdnZ2VlZWQkJCKioqEhIRtbW1iYmJZWVl+fn55eXlv0MifAAAAo0lEQVQoz7XQyQ6CMBCA4Q7dgUJb9k3f/y0dhBSxejCG/9KkX+YwQ/5p0Fn0l1GsAW8o5knIaY6Byilgagyg4VmZzxoDFiDZQGVGFFImn0CKaYd4QvwERH6BpRAiglrz3HYymmD3tjIWeivfYKQNx82rmz0BH6htKgRInH6FtnCu5itArcoAJTB2HBEOaPcjmg10gLlPMcYXv77dRM6l4MklPQAAZAfZanJzfwAAAABJRU5ErkJggg==',
            close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARCAIAAAAt9wkYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0I3NzA1RDAxQ0Y3MTFFMkJGMTU4MTc4OEQ2N0MzQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0I3NzA1RDExQ0Y3MTFFMkJGMTU4MTc4OEQ2N0MzQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQjc3MDVDRTFDRjcxMUUyQkYxNTgxNzg4RDY3QzNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQjc3MDVDRjFDRjcxMUUyQkYxNTgxNzg4RDY3QzNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmUW1owAAADqSURBVHja5FWxCoQwDL2W+x4X/QmHujvXzV0XadHN31HUn2gR/KD2AgWRAytETpTLEF5eSfqaaEvyPH/dw97W2rtIMcY8uytKKQeiKPKTP5fSdZ0DSZKEYQhAa72SdV0japIsy3D9XPdjjIHv+96FUkpPFqV0VwrnHD3dpmm+GCHEwdEJ2VVpTlhVVdtaEB6m2H2j9oTN87yVAuFhikclviuw8TAMWykQAonuCvJeWZZlmiaHy7IE37Yt+HEc4zgOggBREzmgVUdRFI4B4BhYwg2IpGl65ZXq+ZmvfoM838MfP4fPGNBHgAEAi7gyuvHuhZcAAAAASUVORK5CYII=',
            searchBtn:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARBAMAAABQu4N8AAAAGFBMVEVnZ2dYWFhfX19qampUVFTl5eVjY2NbW1ua0D9wAAAAaUlEQVQY03WKwQ2AIBAE/ViADxsgsQJbsAA0GagAOyC27z0O1wfMJZvs7E17n6EXM1Hlr+kORJtUb6dgQWpVPhVSkQ8OYeOydOT9nOH/49RcyTW3Ko8F8kuDc1n5mvwKNslrMC1/9Bn5FxqpUThYQLEuAAAAAElFTkSuQmCC',
            rotateIndicatorBG:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAC5CAMAAACoRNVtAAABX1BMVEUAAACPj48AAAAAAAAAAACMjIyPj48BAQEAAAAAAAAAAAAAAAAAAABdXV2EhIRvb2+Ojo6Pj4+Pj48AAAAcHBwAAABERESPj48AAACPj497e3uPj482NjaPj48ICAiPj49aWlqMjIyPj48QEBAAAACPj4+Pj49ycnKOjo5UVFQDAwOPj4+Pj4+Ojo6Pj4+Pj4+GhoZ6enqPj4+Pj4+Pj4+Dg4OPj49kZGQhISGMjIwAAAAxMTGJiYmBgYGLi4uPj49lZWWOjo6Pj4+Pj4+Pj48ICAiPj4+Li4t8fHx3d3ePj4+Pj4+Pj48+Pj6Ojo6Ojo4AAACKioqOjo6Pj4+KioqKioqOjo6Ojo4AAACMjIyAgIBra2tAQECHh4eJiYmLi4t+fn6MjIwpKSkjIyNLS0tubm6FhYVTU1NhYWGOjo46OjoAAAAAAACEhIRra2toaGhbW1t/f39LS0tOTk5sbGzAc0kEAAAAdXRSTlMAzD4WBMLIMTkOPCcgca6Exg1HBkc0XCYSBpmxVCIMCW4Sn0IqvpSKXkkZqqVtUkGymWg5w6uaZ0ovLSm6p5x6eWQ+LB8eGxadk4uEf1lNNAq+u7eFfnRZCbajgTG1qqKdkU1KYXtyZ11WHhQIjnNtUlFPPlvso/l/AAAH2UlEQVR42tWd+VcSURTH7/eJI2ILgxEQIYKBFJsJLbRRYFBqmlnaXrbv+/9/mqB65uAs2Cz386seznv3vPnMfffdmSHnUFUKBIglsTZNjRNLqhGKjxBLCvN09SqxZGOJJiaIJVtZOjZGLCnmKBokloShhgRLO2aAhhAs7dgAvgrB0o4R4JUQ+4ghV4CPQrC04zLwWAiWdswDo0KwtGMSwCHB0o4KgMMs7diBxn6WdlyFxkGWdlyBxhGWdpyHxgGWdlwCuNoxC3C14zrA1I4JgKsdUwBXO9YArnZ8C3C1YxngasdFgKsdSwBXO+bA1Y4qwNWOMYCrHasAVzsWAK523AC42nEL4GrHIsDVjmFwtWMG4GrHBsDVjhGAqx2vAFztuAxwtWMe8JsdqyrFA9YK1LbtqLYoECfHyJRqgTELv6/Ath1bWTU+FiDnaKH5znwkHcCmHdVlZXUi5Ow1sYzkcREdNy1Q27NjbR2vok7fddV1KLMzoX1mBWo7dkw33TkxqwGYuyHGpowL1DbsuJoEwkdF8C45TROA8kCErhoWqC3bMbGh9P/nBDlOume+U0fF2F2DArVVO7aL0HgqxDFyGHkRhi+L0AmDArUlOybKCjTWDomgg17U797uPxfnJg0K1OZ2jBXR44UQcXKFRPK39qZFcGRwgdqSHa8o6DHr4m6kofxZC4fERGCghMztmCqhz9yMmxl9Gb9Zey2C8QEFanM7FsLoo3kxdJNcIyG3zddnxIR+YmZ2XJASuiy96AoxmWBdOLwzMVgETOy4Wccf7jvoRfMb5s7EoAQY2rFzGn9Zey6Ck+Qqcnz6xCAHQztW6pC8ll50jVQYku2JQXcRMLBjN49tXPek1FGARCYGMqbbeDT7IrqvH9yV3D9/mBFR8gApCZkYJJYwmLXZo8F9dzOL2I5yQ4SmyAMWwpD0E4OxLHbn6eHpHP7hgRBXyRM2d67p6Wuww0UhzpFHnMYunDo4/e3hu6mpbixSvhTGYEafSS+6Tqc+MJj7Z86NBOgv6UhewQCmhXhPnlGBjpNHQxO6lGRhuT94770okZKWjhzojNTOxXVB82KAPKSb0wtyFyrhHelkaJw8ZWV7IG+IqIGmY0lfeHFQmjineX3SuOwnF5YfDgwyuT8jPyTMaoZqcZsXP5DnRH6vlrMWLrtM0leF65addCQWlqmu9xRtbdMq/YxRiCh5TsRmOqL53clCnf3U1/quPqVAY84HYU/17/42burNfsHL+8OxeRl0iywo0Lju/fl70X7ine+51MMVo7YjV24/yUlN27ywRw+cPHjm+PmR8QC5RjpW1cZ869+iYihg4wcUSNyZQSJWLdy5JMc8dEIi81/HZ5BItbQx34Oe4YrM85A4NYPEQmtTG7MCA+RSt9234cgMEqmqYZz1RehhmiD/7wzSMTlmyzwXYnKYHqX/NAM1FpHesMmMEPYcBcmwM5B+voU9IGwOnSDZywzUX0tk63EYPXwc9T7hR/evv3xz/Pz7qYBcgO1fqzzZn4Kv1nqfCxevvzxz/OHI+OTuv9vQFpAUokeGkaydOnLw85eHJ+LW97Ldxsr8bekal7wuGZ17Ovvpzfer8Zs0LJ3VlbJ2GSuAM3dT88W89xtrrVKWJtp7DmN/Me89n6m9fbX1OIe9Z476xewO6VRrc2Pr8egw+bpuMXtDdohdkk96fVeH2Jv6pQCWt9vp3fxdXve+mtGp26zD+CboRJs2q18+Wek9yvZrjv3eQO+J9AZjtdLrn+Xy9zhpzcopaDeJHtP+GHrezqmGH057B5y2zz0TUatnSfflZe0ZqfBwJ3iXPS+wJ0rYhmLl3FT22XnrmLLN02r/PK/UUOz0CPilGUY2VVvvzPBHC1KPZezCqdn9Wj/MeKbbXilfUjCYOQ8zsCqGRu5pPSFzS9dA9cBwpNOj+JcXXnVnbOFfrp0VxzYV7IYmzof5HTvpQ970xFQgkc3srToG8qjf+Vup+6ATaaGuC/lkT+BF6JHPA3WykHjULJDVh7xPWu+d+0fFub+3zoICydpZEXR7yczrQ/6XHAyfeIiVIHnqeg94W9GFXFIyuecnyop3z3Smk7qQG7Te6+sFjaRnjZrNASGXbJg+NUDppkftsTWDkGu8tVLErq17kbqr6wYh12hZOjpQlzxI3RcNQi57ZMyf2ozk3E7dVwxDrpEe7EY93by7qXunbhByndhNglqpu5m6n5YhN7/TmtZSO1n3UveCWcg1lgzcqKOguJS6xxSzkGuUbR3wxUqupO6JIvDUOOQaFXM37kwM7jnezr6BWz9MQq5RM3ejLjG4E3U2dV/F4juzkGukzN2oSwyU1kQoTo6hliKBsREyJTFErahWcvTFE9UMvbeU5a3r3GiOWqWAD9qrswDX9zgt+e/9MFaZ5/tWngrfdyHV+L6BasE/dXS7JBS2b1ujda5uJDrN1Y2a2Lm6URM7VzcSrXB1I9EqVzcSddi6kUjh6kaiJFc3amLn6kaiZa5uJLrC1Y1EEa5uJGqwdSN12bqRyEdNpHZJcnUjUZ6rG4maXN2oiZ2rG4kiXN1I1GbrRsqwdSNRmKsbiYpc3cj6S5tNvt83LfD9qizjb/m2+X5BWeX73WqqQw2ydGPvG+1jLN1ItMj3y/gbS7SPpRuJNufpBEs3ElUjFGfpRqJYm6Z4upFUlQJOuvEngp7208ni9ZwAAAAASUVORK5CYII=',
            rotateIndicatorPointer:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAADxCAYAAACEXZTsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTQ0RjM2N0YyNDJFMTFFMjk1QkFBRDIwRTU4OTdBRDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTQ0RjM2ODAyNDJFMTFFMjk1QkFBRDIwRTU4OTdBRDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NDRGMzY3RDI0MkUxMUUyOTVCQUFEMjBFNTg5N0FEOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NDRGMzY3RTI0MkUxMUUyOTVCQUFEMjBFNTg5N0FEOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psfyr6YAAArZSURBVHja3J1bbyNJFcfL7cT25D6Jc2EmziYZVqBhGFZCCBADgn0cHuYFaSUekGbeQbvwlskH2BeyCAkeeED7AUBoQPuOhBBCgoWZZYUyuV8mk/iSxHZ8ycVuTsVtuTfEdlXXOdXVXVJPOnH78vP/1L9Ona7uidi2zcLULBayFjqgHpGDfhOJqL7P0DL8s8RYmf/yU8YuZJ68dOX3Tt2kR9MX9wZs/FvZdH4v+KoQQpt2gPbDAjTj/PzUiD6ECHQjbEB9YQNKhGEcGoWtn28pxm7yLxFsOBZkoJTL6saolbI0hhunGac2B61Ag4xNhAoILC5J7XZagRKtkAt0H7rd3Im1FApsyE24wwuSudgsY8OwG6Wybmqg6WvkIlWJGmj26h+SrX7UFwqFBgKu0BtX/wCyTFI6nXaFYq30J3AKWe48zg0UdYCWGrPYwABNsmusGQh65xpZt8UIrJsSaKbDSEvmdL4A3STMui2dhuCybrKczheFbhCORb4AxQMIFHVn2VdbLwDFGu+dwLZuKqBbrENFCQis+UbxxMLuR1RAqW4HfI7I6aiAprsdMNLqR4FQaLbbAQNhU4jKun1TKN4qafWZDgSuzKYEDhpJNOw9voT4OSiAbgu+rvVmI+wimMZAAZQSPXCCwOkogGZEDxwhcDpfgQYISsO+AiXCplCcYF6EDcRrBOOiB0P2OjzYsPkElnVjA6UkXzMyh3xWz/Ir3JptErkf+Q40glwB8h2o33CFUrJPSBgONC37hBhy+oMJ1MdaUwLhBtY9NNKwe551R00Cmvb6xDnEARYTaNbrEycRnc4IhYYQp+OYQDNen9iPuMIEEyjl9YkJxPTHCIViBvYhSJovz8p5auDVA+MNdXqXFBclWn6r47JulH5kDFASKQXCAppWfQEs6zZGob6wASUMCzlloJhBQDcd21YdP27cuizVXS6D7vUTKIWkMl/ppNyPMICmsYBGESZ7GECzWEBDCCmQUQr1GRJyaAolENIfoxTqRZiKqwIlGe6pkOYyaM9XsKgCoVl2s91SnOypAs1gA40pOp1xQIOKKZBxQKrWbVwfivuoUATTsl1ZdzLiE9AEI1gz6iyDHuGfbelSMH1A6P2n2VSuYDESaFQhBTISaNAnhVJUQDd8UmiaCiiucAWLVyCLUiG+DLrHWXYmuwzaK9AUUyhkCFh3dL51BUtcB9AsI263PS7htEzrP83mdRm0V6AUNdCAR6fzCjRDDZRoXEoQKiBtCvU0Zsq0DSx0NN662MOiBOLLmKOMvlmfbwywUsugLRMNwTXYSZe1jAbysgzaMtEQmq3fQ9ZtNFAibAolNCjEy7OTuoBgfLjZ3xgm4qKfVRZomum9a2DkjuQVLF6AtLYJybCTBZrVDSRr3cYr1B82hWQLJsYrFCNUiLvMuG4gfgXLsLMMWuTzygClGME9RETanERZSwZohvnUJiX6USCAhiWu1euhALIZq2UZe7HO2CdrjH0MP9eh8xW/CZ8NOsNX4PHvwTf5bdGJYr/EvKhHsg91bQDy/HeM/fFfjL2EXzds2666Hi7CtgvbRz+LRPgX9B5rgKFl3RYWEHzr9U8Z+8NTxj4EmH8AyH+vwHym/dy2t9nlfZDZrxtPx7FuUSB+W8+xTge8YOz3v2TsL7C7CiCvRF4UoGzYfgu7v+p0HMTl4Ggj3GLdwtTC6D9pxv4JX/Pf+C58xteynR6gPoQff+1i3UIqKQNBrJxDn/kIduu8zyiY2S9gq3XIuoUWZCgDgTrPnzN2DLsZUOfUKw2otNFJpSFBp7NUDWGVsf84uzmEIefPAtaNolDbpPTvrTDDuCn4i3YPxAUXNYkCtZs22MuNsYXfR/4MASjbAUjofJHQwFr+4IP2fr64GC2VSrVIJGIBVF2pyrOw0HaNXL0OL/3++2jTh612RYz5+fkhZx/jFGWy3QOnp6dN9SoYQLvtHrh7926zfw0iAH2x3QPVajWDCbTd7oE7d+7cc3bHEIC+2+6Bk5OTJlCZFCiZTL517949vthoHPpR3CvJ06dPIRlg32r3eKFQaA4LVdKQA4jeR48efd95rTkFdX7SKU9Lp9N6Qs5R6atPnjz5Bs9QAHDKgzo/6jaNWFtbS2MC8bHmqNMBEHY/ePz48ddh900ZKID5Ifz4cadjarVaGRTioXbOuvy/KzITvB3W4UpIPg7dv3//ncXFxS88e/bsT/A7n+Ctt8vvAITnh+/C9p1ubwyWLaSOLBDvR/e7HTQ2NvYWKPXlTCbz8fr6+icPHjz49/Ly8urU1FTp4cOHw9Fo9EsA+bZlWW+LTsHBsrMUQJuiB4I60YmJia/xrfk3AHQ/LtXHXJbdFciSVMiXBpadFbFsWaAdv4AODg6EBlVZoG2/gMCysxQhV4LtUDcMWPZJNpvloXbWaYruBciXsAPLFjYEL0Daw65SqYQLCCaPwg7nBeiVbqB8Pp+lVGhTN9D+/r6wZXsB0j64rq6uZihDrtypMkNg2YWjo6MzUcv2AqTVumWSUhUgbU4na9nGK1Qul6Us23ig4+PjrIzDGR9yYNnpUIUcWHZOBxCP5zQ1zMXFRR5Cjts1r0nUKYG0DLCitWwsIPIUCCw7LetwKkDkSSpk2TmdCpE7HaQ8Ukmp8UCuLFuLQtwUKP/Ld9tl2Vr60CmldZ+fn+cLhQKvY1cXFhbqOoBIw+7s7CzjRR1jgVxJaUUnEJl1uwojWoHIBlew7LQfQGTpD1h2zi+gOgGPvbKyknWGBa2mwDPhAwLLPjo5OeGnHU9lLVsViMTpvGbZWEDokz3IsqXrCEYDQbhJ1xGMDrnDw8N0qELu4OAg52fIvUK27vry8rJny8YA4hnxPqJlH4Mp1LxaNgYQagoke/qRCggtSVXJsjGB0JwOLDsdKiDIso1QCM26X79+rZQlYAHtMcGza90s++XLlzkVy8YCunCgVOsIR9Vqte6lMIINhBJ2GJaNCaQ8e3Vl2UYAKQ+uxWIxHSqFIMtWdjij+tDe3p5RIbfHuiw/7lgVse36ysrKoZO5G6FQTSWngyw7C7Zdd7Js2wQgpX6kWhihAvKc07my7HIogMCyPZ9tMDLkIMvOmQi05dnzd3bSJobcvlNjkLXs2tra2pFj2acmAdW9hB1Ydg4228mybZOAPPUjL4v8dAJJOx1YdjpUQK5adtVEIOmQy+Vy4Qo5sGxPS2B0AfEzesIXuYNlX7gs+8xEICnrhgw7V6tdFowqGJZNASTVjzCzbEog4fpCqVQ6wHQ43xUCyz4MgkLC9QWw7HQQgISte3t7OxB9KC3SJ8Cyz8Gy+e1z6uBwpyYD2SIFE7DsLEChqkMFJBR2orfkCAwQxulHnUBdrbtYLKJm2dRAXesL2WwWNSn1XSEKy6YESnf6oPy2UxsbG3nYrYFlnwUBqKNKPCmlsGxqoG0By66GAqhSqeQo+o9vIVcoFDJBBGqrUKZ1x5VyKIB2dnayQexDuesUqNfr3LL57Q8vsC2bGujafqRy5YkJQJu6smzfFIIsOxdkoP+rL+Tz+XSQgbY7ZNnhUAiy7FyQTYHX3Uouy65ubW0VqSxbB9Bnwo7asrUDudbElYMM9OqawkigFdp0WXYmDArturLsbKj6EDgcSWHE3Xo0APH69eU9uXd3d/k+A8s+DzKQW6UK9RvpAuIZQyRsQKFSKLQhVw2bQmXqN4o4JdnQNIuFrIUO6H8CDADtKO5SoZAASgAAAABJRU5ErkJggg==',

            arrowTop:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFMkVGMDEyQzI0MTFFMjg3QzRFMzA4RUMzNUU1M0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFMkVGMDIyQzI0MTFFMjg3QzRFMzA4RUMzNUU1M0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0UyRUVGRjJDMjQxMUUyODdDNEUzMDhFQzM1RTUzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0UyRUYwMDJDMjQxMUUyODdDNEUzMDhFQzM1RTUzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlvCjVAAAAD/SURBVHja1JjRDYQgDIbZgBEYwREcgREYxREcoSMxwo3gCHc+0MQQPCgUKCT/G8r3GW0RpfoNfceHaLXYQPhvyFISJoJ/Shjp8NudKwGPucKcJeFFS9hC+KeElQLvCOBx3Mrw0yVOBnjMORoeGOExIBEeKuYP664UGIpEl67dAj9dwjDA10o0bz1KuyulmlCqV1PXpsK7Tv2jSsJ2hK+VsD1u3NpJ2dcaCc++JvXj2hnL9N5aLGBUZWAsGiAJvknCC4GvkfC4Tchd8Bn8G7iFNXMPVJdYzzoS+bf/Sr4NThB8TuK1lB4CD6NiiaPkh0XaSRpKQOlkiceASa6fAAMADgHRdvHjSZ0AAAAASUVORK5CYII=',
            arrowBottom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qzg4RUFEREQyQzI0MTFFMkJGRTVENTM1RUFERUEyNjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qzg4RUFEREUyQzI0MTFFMkJGRTVENTM1RUFERUEyNjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDODhFQUREQjJDMjQxMUUyQkZFNUQ1MzVFQURFQTI2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDODhFQUREQzJDMjQxMUUyQkZFNUQ1MzVFQURFQTI2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl7tKzkAAAEVSURBVHja1JjREYQgDES5CizhSqAES7gSUoolUAIlUcKVQAmRD5hhPBXDkRgzk79V3uK4Roz5LZ86pJ6Mnpoyk28Jl9SYW4uJAl+4liMhVCItJrbwpWErtKnjjvBOE0fwmFltLTyCL/2tLxAom9c8Y4plY0NDuOuaGT5eZAoldVCJCQo81qmkwUQ3fClHNDEPhJ+J8I4SpWcNA+CHrylpgm2tD/GRAjN8zEysLxUwwlupZHAX7umkE+9N+NhhY2KkxHXIa7PPJVdNUOGHz1//mLgdvncnfYdepDwxv1XB96TJiPRiKRgAD+bmgifD944eXaOBlj8pqT87FhOq4Vujx9DRQPpIRNtJH8kEK/wLEc2TaxVgABhX1Dief8wFAAAAAElFTkSuQmCC',
            arrowLeft:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAwCAYAAADtoXHnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTkwNjJDNTkyQzI0MTFFMkI0NzZFM0NEMTRCQUU4NzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTkwNjJDNUEyQzI0MTFFMkI0NzZFM0NEMTRCQUU4NzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1OTA2MkM1NzJDMjQxMUUyQjQ3NkUzQ0QxNEJBRTg3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1OTA2MkM1ODJDMjQxMUUyQjQ3NkUzQ0QxNEJBRTg3MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps3mm0sAAAEHSURBVHjaxNhhDcMgEIZhMgOVMAmVMAmVgJRJQAKSJmESJoHRhSVkNIM7oC/J/WrSJ2nhA86EEMyk4WM9Yi3Fk0noDoZUr1jrbNRlYA7bWag9APO6j0Zr4Lf8KHRrBMNncg1A1/TP2sB9NneicrDzn15VYAe6pBe1gM8iIBSoBCyDQYn2gQrUd4NCdAwoQJ1g8d+qb2tArQC0Td+sgo4HK+g2BfyDSuLNiqPlAJWAThWgP6gkT716m8hQSbzpwQw9D8zQ88A4LoYY5OdFJhK2ZLBwwGIQC3xsa8M2cey4gh3MsCModtjGrhXIBQq7KmKXYuz6jzU6sJYO1rzC2nRYQ7Laen0LMACbElNZVX4epQAAAABJRU5ErkJggg==',
            arrowRight:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAwCAYAAADtoXHnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M5MkUyMEIyQzI0MTFFMkJEREE4MzFDNDE2ODE0OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M5MkUyMEMyQzI0MTFFMkJEREE4MzFDNDE2ODE0OTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzkyRTIwOTJDMjQxMUUyQkREQTgzMUM0MTY4MTQ5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzkyRTIwQTJDMjQxMUUyQkREQTgzMUM0MTY4MTQ5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrqtTzoAAADVSURBVHja5NjhCYMwEAXgows4giN0BEdwhBvFETpCRsoIjuAINsIJpfgjoZf3YhN4/4QPgj6TE7leQ0pMCQJaz5QtZbdUh/ULPPOqBS4X2GfUExtsC/eMqCcaM9EjMwPe7GXrCx494TUTjvZ8lYJoFhYGHP4CngrKw7WntQDW7uCZAbvWpdgLQ4EDo6dLYNe6vAf8kBsv+PY2C7p9MvBy0FZBt8KH/9rgIPy4Aj+YNQ1GBvhzvcEvUPCrIvxSTLmFwwcdlJEOZXhFHdPRBpKQ0etbgAEA5TXHBKbv1IkAAAAASUVORK5CYII=',

            fivePointedStar:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAYAAADRA14pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUY4RUQ3MDQzRTA1MTFFMjk0NEY4RkZDQjhEODM4QTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUY4RUQ3MDUzRTA1MTFFMjk0NEY4RkZDQjhEODM4QTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRjhFRDcwMjNFMDUxMUUyOTQ0RjhGRkNCOEQ4MzhBNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRjhFRDcwMzNFMDUxMUUyOTQ0RjhGRkNCOEQ4MzhBNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkpRrF4AAAGOSURBVHjaYvz//z/DSAIsIKKsrIyQOm0ofRWfoq6uLjB99uxZqphnbGwMpqdMYaSKeTk5/yEeJgKEEmMgCWDAzGMi0sBwKKYWGDDziPGwHhBrQLEeFRw3oOYxkZBc0NmUJr8BMY+JyOQCA2FUSn4DZh6s0FIAYg4g5oby+YCYGYhlgVgVSb0aECcC8WMg/gvEn6DiX4H4BxA/GOzmwTysC8RLoAYRAvOwiIEMjkFy4KA1D5akNwOxORDfJCNJgfSYQc1gGOzmIefhG1BDt5BgGD6HDErz0Autj0DsD8QtQIyvzfkfqiYAqgcXGHTmYSul/wFxLRAfxWPgYaiaf0SE8qAyD1e1xAPEpngMNIeqIRYMGvNwedgBiNnxGAiSsyfBgYPGPFwe9kLLN5FAHIGWH7xJcOCgMQ9Xb8kNSh8D4mik+vAkEC8FYiskNcSAQWMethhWh7ZsmqHJ4gGS3AOoWDNUjRoRjhtU5mGLYU0gdgLiQzgs/APEdUC8B4i1gPgWAQcOKvMYR9oQD0CAAQAKvKHlERqdgwAAAABJRU5ErkJggg==',
            lock:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAOVBMVEUAAAB2dnZ3d3d3d3d5eXl8fHxzc3N0dHR5eXl5eXl+fn53d3dzc3NxcXF2dnZ0dHR9fX13d3d9fX2pDWFRAAAAE3RSTlMAqXCZJy6vvllLNWXZooyCFXsZospBZQAAAG9JREFUGNN9z0sOgCAMBFAEWql89f6HNdKAxSCzYJK3YEAt41JyHyoYnYtYBoz5OXOUBsiNIJASdyK5krmz2PIh7DUh+GbaABw1AEYref04qTb7ot0GJJrgqWfoJ3gVxuWQfFJDj7oH+5fI9JD6yw3ZiwMeFNafHgAAAABJRU5ErkJggg==',
            brokenImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkZCM0M0MkM0OTg2MTFFMjkyRUJDMzk3ODcyM0MwOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkZCM0M0MkQ0OTg2MTFFMjkyRUJDMzk3ODcyM0MwOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRkIzQzQyQTQ5ODYxMUUyOTJFQkMzOTc4NzIzQzA4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRkIzQzQyQjQ5ODYxMUUyOTJFQkMzOTc4NzIzQzA4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pne+/t8AAA/4SURBVHjazFp5XFXV2n7OzAwyCCIYKGgOOIJSamlf1xRMszJkULNQBjWHnH637pifDXbTMBE1za5DpjnkmHNaV0UxxQEERQEREUFQOOdwOMO+71rsczxHOXCsP75v+Xt/e7H23ms/z3rf9Q7rKMGT7TmSaPzftNskO0j0jjwsCAKk+P/V2pOMIVE4+oLc3g0vLy/XmpqaUQ0NDS2ugMlkYlcJ6xuNRvO4hPXFMX7PSix/QyJBg1qjMBga5PX12toBzz23RSTxuqiJxt9NQKlUqugS5eTk9NTLaDAYODFrYYSsr5wAQ9jYgAf369EhOBgFBYW+Xbp0zqThQFETrZKwS0Cr1dpc7TUJraJ59c3AmiPQnLB3TQYTtDoN5Ao55HpDWF5e3tRu3botd5SE3JEVVcqlkClUv8OkjaKYbK8CCREAMzmZDK6Sh2jr5QqJfwCuXS/qdOXKlandu3d3iIRDBGS0OheLKjFu0VEE+bo1o4ZHe4KtqlkrEnaD902PxsT7JhPrA1KpDKXlFfjhg0B0DfNE+/btUVZW1ik/P39q165dzSTYntjeHAm5I66KPoPSynrkXy5BQ4g3H2cA9KR+nd6IhkYjGg1GMh3RtgX+oigWW2siaqSBRgNDDqjkcHNzQn15LaoeqPljLi4uCAoK4iRIE9NIE1/RcDt7JOQtAOfr2rSJJZDLJJA6K+Ht4QKNTo86jQ5+3q4ICfBAp0AvhLX3QhsPZzirZFDIpFApZCRyqJQyboINBFqt1aPivhoDurVDJ3r+g6//g3p1I07l34WLc5Pn1Ol01iQ6kiamkyaW2SMhaSGQ+RKJP9tYSsRCtA/3g5NKgQXxUegR5kOgDKQFA9eEwWjimjEJoovl7hJcC3q6V1unQ2T3ILzQw98y58pduWjQC5j0p07w8HAlp6Ej5dACqFTQaDSMBNvwN0USrFWQbGMkWgpkzFfHss7gwYOR8eXSpo8tHoeqej0+GN8fUqUU2Vfv4sKNe8i/VYMbFQ9Req8eZdVqlNMq36nR4G6tFpUPtCijv6+U3EdoB18O/vTJX+Df1o/PmTKqF05cKkd5TYO4ycE9lLUmiFBoQUHBdBFbAMkbJCp7GhhI4JewGJCeno4VK1bwwT07f0Ds6Dew6XgJTuWWwJ1UzsyktdZI++IukfmfyI6IHxqC4qJChIZ14ff6R0Ui+8xZ1OiA6zfLEfVsoN157twppz1mLO7QoUOGWROE8zvJY3YvJR++Wy6Xx6SmpWFlVpbNJDu3bcHo18fi6OVqZGw9g/Y+rtzm7TWd3oQ79zUYHt0JycPCcPN6ATqGP2vzTGRkP5w9m8P72w/mwEUp4YtjYmtLtmggG2nnqYJSJkBnEFBRUZH90ksvfS/iXSK3Bk+XdQz8u8nJWLtmDR8/N2oULpWW4u0LF/DaG29h25bv8PrYcbQpo7B4czaC/dyaJcHA365S47XB4Rx8cdEj8PNCQjD3+efht2kTcnLOoW/fPvjtt/N4cWgk+r7zHdooG6EwPkBjgxZVtfUYGqbAgI4qNBilCA4O9nrCC4ngvyVJmjBhAtavX89v7ho6FGGhoejSqRPuqtWYf+0a3ngrHtu3SjDmzTgyj3745/rTCPa11QQDX16twdihXTA1hq38VQLfld9L9vfH38eMgY7sPOfVVxG5ezfOn7+Afn1749xvF1CyPh5RM/egnW8o3F3kqKh8iIF95Ojtb0BVnR4KhcJoTUBK4NmX/83AJ40fbwO+f9euuFpVxWXyiBH4NDyc32MaYJp4rX8A/jd5MGo0Rkhlcrg6qyCXK/CwwYiJwyMwZ3QX3CjMswH/RVwcCqqrUXDvHvwpaDESrP12Phd9+vTi/bNLR+J+nZryJAOc3d1pIz+Dnj170v0+LNAZbAiIK58YHx+PjRs22IAveUBqpLxG29iIGzU1NiTejEvA1s0bMaKXDz5MGoBKWh0NZfHVagPihjyL9OGhHHynLt1twBfV1qKePIye0oiyhw9tSFy4cBG9e0Xw/q+fjsB9ihFqHeE1NUJHWTGtPsuSjY8TSIyOjsbmzZubJhk9GkN79bKAtyR3zZB4Kz4J329aj2ERbTB3bB9cLq3Fq9GhmPKnZ3D96mUL+Hf8/GzAW7JWkUQI7YkKWkDWci9ehrOTkvePfPQyjGRqSvJ2JjF7NWex1gSEGTNmWAa25OXRjpdxeSJDtSbRuTMfG5c4gZN4JcIbuz6KRforISjMu4jwrhEW8EsJ3OPgzU0hfmt/YaFlbN6c2fz6S949ykBYVJfSVWbJox4nkEzmI/z88898YBFt1Pe+/x5hbdrATaWyT2L4cHwaFvaIxOZNCPUEishVduneZMtv+/q2CN5ZqURHLy+sOnQIk86d42MrlmfgHws/wZH8OnyyPR9uLkqemkikEh6hnyBAA2sZiRdffFE4ceJEU8Sl8D1n27bWScTEPCIRn4j58+cjTHSVDHxGQgJutAJ+7dGjmHPlCh/LylyG1PTpOF5Yj1X7LiE80B2+HipKXZRcEzIZ14LwuAZgJkFpwx8i8dlnnzWB9/ZGRmIiB1/XEvjDhy3gV61YjpS0aThVpMG3B/MQFuAGbzclXFlyKKXUm1a/WQ1YVVYWEudEdTISs7dudYjEwo4d+ViCpycyyB07BD4/v+k7K77C5NR05JQ2YOOxqwj1d4OnqxJOlMk6U8rNUjYrDTRPwExi586dH/ft21e4dOkSH1tdXo73f/ihVRJTiMS35L2+TEpqAt/MYUBz4FdlZWJK6lRcvK3Dlp8L8QwFRU8XBZzI8zBxJRIsxkhb04C5jRkzZs8Waj169EBubm7TR27fdkgTXeidoqcAv3pVFianpCGvwoDtv1xDBx9nAi8n4FKLuFDWK5DZmwmQFoQWCbAWFxeXfezYsT0s+p0+fdqiidktaEJPMcMs9sB/ffCgBfya1SuRPDkFhfcM2HX6Otr7usDdVcELIGtxUsk5THsasFuRUcZ3kYLGyAEDBuDMmTPo378/VpMmJKSJL5mNU7GhMZlaTadV9MFnKK9fTTnPvIICPrZh3QYkTkzkx2+XCqWICArhh3EGk45qASOvkxUyJ6o4neHuZEAbVzlVdVp+AOAwAVdXV0s/KiqKm1MvsvFVpImHK1diAYEqp6jY0hkgC4VB9MFP9Hp8TLkPa5s3bkZcQhyWHv0cH+9ciQnRMxHeNgK+bu3h79ER/u4S1BDW65X5KKnMxa9Fh+Ekm4pgylgFqeA4AXOrr6+nwtuNJ1PLli3D9OnTsZns3J9kQCunTozAf0g+Fv9OJNfKwN9uvI1Zs+cCFDKWHZ4Glu7YnMCYmkotuQ913YGON4MRE9WHn3I8vgdaJcDAs3bx4kUOnjWWerHMpdRSBNonEEnyHgkrozZu3IjY4bGIT4rHzl07kbAqAf4Sf/I0LjQPbVSTFAb65+HtAa82nhSFPaEQJFAZZTYHaQ4RUKvVlv6pU6fwPBUgEI8FPiApceDg0ihW4Aniae2/WH98AvQ6PSa8OwE/TfsJ07ZOQwjl/q5k7yb2j1bEQ+GGNrT8zMPc01ZCa2qwS8Du6TTlRr3Z9eTJk82C1zh4Nsc+XUYyluR9cWxi8kSsWbkGgwMG4/ORi3Gz7CY0dTrIG1VQGJRQa7QoqS0hl3wTRTXFCPBQPZ0GduzYEU25Ucz58+cxcOBAh8Bbn4frWyABURPJqckQqOZNTkvGX0Y+QPK/kxHuG0Yu2t22mK8rhyZQa02g5T2wb9++0SNGjBjL0onIyMim4EbCDoiK7YB3Ec//9pCMIilnm//xYEdyixVCViQmp0/mh8Ip01IgjBeQtCYJ4X7hcLcioWnUwKh/VMOwWGCXAPn9KSwdJ5uXmM3GDL6UXmwk1yo3FxQssFCFpNJqEUgxgZ2JryM5RsIONMucnaGh5wWK0oIYL5izuUP50evkVtksX5CkTk/lRQq/ThKQuCoRnf07W0gIBnLVgr51E6JJUlg6fujQIcmwYcMs4BewjejhAXm7dpBRlOWnYRRQZAQQlZXwpfp2pQie7xmSWQwcESt3coIkNBRG6pvoXV6Q0LvVlHaMEeMCI5H2XhrXxNSZU0ktlJpnjmsi4eTOV99gMtjdY1IRfCoDf+DAAQv415gqSO5TzaqiYlpJKYTSxwfOAQFwpcxTTl7Ku6ICq1haIE62cOHCJgcgkmhHQGVVVXCj551pAdj7Skq1najeVlNFN1p8jrVps6Zh2RdfIS4iDptSN6GwrBC19bWtEiCLENKY1vfv3y+JoYySNTbxXGbH9CE3ir4GAivQCjGTUVJO00Axwa2oCKvpmbXiRD/t+QmvxL6CKe9MQdvAtjhOY6ww/JzSj1rShPsLL6CRCJnIpFhuL6OFMNBcoyhNYebEDi/fe386acKAmXNnwjjViPFLx0OikrSqgczVq1dbwL9L8jdmay+/DO/YWMgpZWCr7xwYCA8iZCguhoK80xor8Af2HODg913bB792fqi6XcXHj4uu04PI6nJy4NmtG1yCgrgW5LQ/PGifuY4di7eY9sS5Zs2bhTkz5iCpTxJ+nPkjhBqhdRMyn0hAPJZmW86TkjdnZj5UGrrQ1YtS5cbLlyEcP86Bm8Hv3bUXw2KHIWV9CmJHxaL/wv7wCfTBrZu3+P0TojadqL5QHzsGr4gIuAQH83nZ/F79+vHnelmBWrehaUf1DOpJu54cSHVpiwTWHjlyBFOmTOEDtIewm/1gu2gRpJTvtCFX6k2izs6Gds8evlm/EV/eRiVnzKsx+Cb7G/6RSfMmIcAzAIsOLEJQSBCuXbtmIcH2k4Qieu2uXXw+bwKulMtxc8EC5IrpCT/wpey3qroKZdoypGxMQdzbccgcl9niLzDsKH2NwHZyaqp4mg/hryQHSSq2bhUKPvxQOEL9t8V7TLZv3y440oqKiizvDCb5hSR3wgSh+tgxYT/1M63mHBAdbXceSj/4VavVnhH3/izLGZFI4mv2QFp6umXCv5CcIqGSRpho9aG9e/cKT9Nu3bpleXcQyVmSk4+BHzhokKPT2RCQm8MzNWY9Quby5clKqqC+XLoUH7F8nuS6eP7IT8vI3KjYYd2r5LlK2C8pVsFFsP5tTU8Ba9CgQf5BQUG9q6urJT7kRn+le/8kSReFtSFDhoAqQNa9e/jw4fMKhcL0RNImlQosM6as+E4zvy8+0kRdXd0Od3f30fPmz8di8ZjE3CjI4WXyTidOnNhJudIJR39sXbx4ca85c+aMr6qqkvr5+dncG0qLcZQWhdoVAr1OTGIdauz3geZ+oemTk5PzRb9+/YbMnj0bS5Ys4YO7qSQcOXIkMjIyvpsxY8bBp/3FOCEhIZLqgbTi4mJpKEVn1l6g2HCcvFpNTc15b2/vTDHbwFMQWNfSxl7B7Irig5CVlWW2v5l/5H9y0Ptvsv2YnZ0thISEmOf8kUT5O+dr1TtlWW2ePwTeat6xJIY/Ct5M4L8CDADd5n9SL0lNMwAAAABJRU5ErkJggg==',
            brokenImg_small:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUZFMjU2OUM0QjI4MTFFMkJDMkU4RUREMjg3OEVCMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUZFMjU2OUQ0QjI4MTFFMkJDMkU4RUREMjg3OEVCMjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RkUyNTY5QTRCMjgxMUUyQkMyRThFREQyODc4RUIyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RkUyNTY5QjRCMjgxMUUyQkMyRThFREQyODc4RUIyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuqVBnIAAATpSURBVHjarFV9TNRlHP/87v04zuMEhDsQEATithNEjRcnIqSHprxo09VUEC3zj5zNLG211lpuDVtzOWvWrOZcm6tpBkvI0HaKpFlwJcIhd8DxKl2Hx8u9cff0/R1YHqNWW8/2+T3P8/09z+f7fb7P5/v7cfir7ScI8d+an1BH6HrUyBgLWbSfDE6C79/A55qYGuzrfqBUhr9Je1NnE4tmRSB2e9yiWx2/QyEXg3fs9njh9/vh8U73Xp8PzB/AuMuLLYXp86wWy5G4+IVCj8dzhvZ3PCSaTcz9eM+Bguc/R4RaBlW4FPPkEigV0uBYLBDA4ZrCKn0cPqq7g3CFEmWr08VWq/UVnU4nGh0d/Yw47oYQa7TaWLfbJVmi4bC+SI/yXC3UCjECFHYgwCjSAPwCCaoMqai/cBYvnauGZ9wzvVejEfX22g5mL80U3Ouy8OR3uJmc6FvN5uas9PQwfm4bGcYXzZPotPRBKuIwRUf3QYIju3Ow/YnHYbxxC3k5y1HbdAtfX2zCA8dv0EYpkLRAPrYid+UbxPeegB5Zza2t13jS7w0G1BcWYmF0DMqyOMjnR8E0MI4Oux8HK3OwrSgbsvZODFZVQWm+hw35y5G1Kh9n2+S40jEBj3tS+mdSjUajkw+6yWBg7bt2sV8qK9nFwkJeL6zTamY1DXY2OMXY0swMZlCr2N0dO5hp505mq65m66RitnqZjplHGDt+wUQxMjfte5FXhSAjI+Mm7+Ci2cznBK6pKSQlJKCuaA1SF6Vh7aIRFOnTEN83hOObyjAeCATz3n//Pho8Prz29lFcahmETBKqAkFkZOST5KH+nf5+nLh8GUqRCG6SVXz8QlwqLkZW6mNId4yhZmMpxsgeVAaR5tbW4qqxEY6YtbAOOKBRhYUScxzHX22pra+v7RxFU1NfHyT3EokmLg7GigocLSnBGJ1EQqT24WGsoTXGpmvwLliJ/v4hxKnFkMrEIcRBuRG5l7qPKfKaiMhIob+xEa+uXw8nx0Eik2GMXsokEtgHBlDc0IC2ti5IYpJh6weyE5Lh9jJEhruDApurQPi6943a7UJyBM2pU8iYMfJNQdhGeOv9D3Bd/B2ePZgCmWD66yJVClGcvh1fpn2KuYj5s0hEKhXKaVBA4OUSeGThJ4RdL+zDjRsmnDz8Ia6aGiEXhkEukFOx+ENzPFMgYYMOx76wqChBudOJ3WQbJ8gJfBrmzThQEU4T8vKWYHG3Dos1abhp/QHXu4ywTw6FEhMpf8pvNWp1yia7Hc+Fh4OLj0eEVhv8ouzlhcmTyuWQkQxjY2ODka8rKUCufTUqsrfA4XyACc9EKHFPT88Vyml+NU0O5edDRQqIzczET3RRL/MRk2Z1ZVux1+WCglQRXVAA/ebN+EooRGn5WizrXoqt2Vsx4hwJJR4aGkrkB3pCAklLq9fjm7o6HKb5rzYLVryrw7ZjTyG5ZAM2d3eD2WxI2rgRKTk5UPOpOUOXHJeBtOi00AqhVCS39/QM8sPjhGPTkmFztaeplKPoXbNGw+ZT/0xV1ewlroclLaI0WGiQZ+rs/HlJamoE74zK1pGQmHjC1tvreDQIs8VikIhEhtzTp1G9Zw/2HzhQS/sb//HnZTKZUlpaWnqot9y+fTuJTNK54HK5Xj9//jybnJw89Hdr+Ii52T++/6v9IcAACHxjGrCZJqsAAAAASUVORK5CYII=',
            maxBtn:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARBAMAAABQu4N8AAAAHlBMVEVYWFhmZmZpaWliYmJUVFRbW1tfX1/l5eVra2szMzOUEp7mAAAAaElEQVQY02PowA4YlLADnOKCMCA5EwgmwngI8XIQQIgbQ4EhWHwyiAUWN4QC43KQnskgFgjA1UPFQSxhIGBIgwGw+DQgIxkkhyEOBQyhMAC2dyqQEYZFHM5jwASsYHFSgQsGcECIYwIACZtXpfywXDUAAAAASUVORK5CYII='
        };

        prefs.share={
            weibo:{
                disabled:false,
                name:'新浪微博',
                limitLang:'zh-CN,zh-TW',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACfklEQVQ4ja2ST2iTBxjGf++Xr0va2qqt02ntEkxo025DqUpjdeAOdj0YxIPgxYOKePHmwag77bDL0IlMKgoeeqgIQrapSOtFpFOc4GWb1n+kNqLWKNqmSZs03/fs4CplXjbcc3oP7/vjfZ/3gQ+U/dvGZ0f5POjSBeSGn3Ol6zsm/xNg4gQ/SGwyY5mEB+ycv4+L7wF+Wh4Org5VbwfWApeaHw5fBrhxCOezJrqAx8AuIFWu0OnOHR6Jtn4VMDsjKWxmJqkHiAFUnlQ3acn0cQJaAWw2Y01VgP3vNsjG4ruBk8Bc6J/AMeBrHC10GkqnardmI848byXwK7DXBRiNtm4DTkkyM0N/F5Lazey0JJlv5uWCi7yXwZTVFktmLJCYtNuRWPhj1/0dqLN5tdQkNxPs7CTwyRI0NUX5zh2K59NUMhmAa07jdLLp5sjEi2Os+cil3rKx+GlJu0Pru6zhyPfKuwHr7+9XLpezZDKpjo4O08yMXh/6xgrpn2Vmr3xpS/jRveuzt798umGjvEJBY2NjikQiAuQ4jlzX1dDQkCTJy08q2/aFsrG4srH41VmTHKAuuH6dnJoa+vr61NzcTG9vr3p6eqhUKhoYGHjrSSiIVVUJQFJ5LmBg5u6wyfdpbGy0RCJBPB63wcFBHMex7u5uzMwKZ8+hYtEAX3Dk3Z9+i0SbRqOt914dPKzym3E/lUqppaXFTyQSSqfTvlcoavz4j362pV2j0dZSNhbfMzc7BnBhebhuVaj6gNXX7wl9uWGxG/4UfJ9KZoTp6zdQPl8Cfsl73rftmQd/vAeY1dHFSwMrg6FVDYFAG1ALVMpS5n65dGvHsyf5f8b+f9FfksATEF5LDZgAAAAASUVORK5CYII=',
                api:function(args){
                    var url='http://service.weibo.com/share/share.php?'+
                        'title='+args.title+
                        '&url='+args.url+
                        '&pic='+args.pic;
                    return {
                        url:url,
                        wSize:{
                            h:500,
                            w:620,
                        },
                    };
                },
            },
            t:{
                name:'腾讯微博',
                limitLang:'zh-CN',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAADL0lEQVQ4jXWTS2hcVQCGv3PuuffOTJJxEslkNElRm5hoRZOKjyKKSEWwqNWFWLsQqRbc1UfVLLoRXbgqiCh0IYoPaCnWWqlQN6mpIPXRaqkk9ZGOJS+SmQzjZO7j3HOOi4jFhR/8m3/5/3xC+H4YPLhzX//9j+zq6S1XfClBAI7/8k+nrWV1aXFubvLLT5JjH+xTwUNPvbHx8WdefPaW6+j0PSwObRyZsWhr0NaROkdqITaOyBhWK339Ybl/7+8gxYa3Plt9YeuW0om5OlFmcc4yWAjYNdLH7b1d5D1JtZVwtFrjSLWOEAIpBT6CXy78WleFru6SdNBopTgc2wa7eWlsgKmFJm/+eImldsqNPQV2DJW5u6/IxLeztBJLIiAf5PLKGEsr1cRxwmh3gYnNg7x2epbPZ2v/TnF6ocHB6UX23zPMxPgAz0/9hhCCzDohE21oRpp2onn6hgpfVescnF4kSzQ7h8u8Oj7AplKe2lrC3skZ7qhcwWBe0Y5SkkxIqbWhESVEUcLm3iKHp+eJ4pQnR/rYMz7IY0Nl3rlvlNBZLjbW+G6hwdiVnURxSpZlQqba0mglxLGmK/BYaETE7ZThYoix6w92+B7lUBHHmno7xXOOONboDCnraynzzTYrrYiZWotrijmaUcJwTxepMXhSMvVnnZN/LLPSjNhYKjC9/Be1VkQ91kI561htJxjj+PjnSxhreP3eUU5WV3jgwxn6i3l+mG+AEDx8fYWru3Icn1nAGAfOCiU8wZo2eL7i7e8v0tcR8MpdI4wdmKSVGZaXW3i+x45NA7y77WZ2f/ETLevwlMQ4nBICIuNQykM7x547hzhwtoq2jo+234on4barShRDn+eOn+PTC0soXwHg0tQpqQSpBBUosJat1/byxLGzdHaGnKiuUAwV75+f48xSk2ZqUDl/XQ0HRidWSavbTnoFP/DIedCT96mupeApjszWLoslPPycd1ky55Btk0h37tQhbTNyoWJDqYOltqazEFDI++TyAUHoE+Z8wlARBoowVHi+xDiDO//NYYEf5PxHd++XN23ZLrpKFZwDIdbzP7hmbc6c+fpQdvS9l/8GEfOFXVv7AEQAAAAASUVORK5CYII=',
                api:function(args){
                    var url='http://v.t.qq.com/share/share.php?'+
                        'title='+args.title+
                        '&url='+args.url+
                        '&pic='+args.pic;
                    return {
                        url:url,
                        wSize:{
                            h:500,
                            w:620,
                        },
                    };
                },
            },
            qZone:{
                name:'QQ空间',
                limitLang:'zh-CN',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACD0lEQVQ4jbWQvWsTcRyHn7vf5bVJ2kaSplXQKL5QUUPzBzhUXBQcFRw6CAFBpzooFKRQkCIBxa3SoSCoOHXIInQSFBELRShC1b7Q1qTBNJdLTO5ydz8H29BgDTj42b7wfR4+fOB/xsjFs0Yunu30o3SAo8Dqznk4fGmrtN+f2kF+S0TCIREJh4Cb/9TAyMUDwKrnYCIGkuZGobjTot5RoM/GzgAx4KrWHcp4+k8jrXXsHzq2Xp0CXgLF7ivFTy1B4dWAqyAdQEP97VNUlej5xzjlHLI2D0B1pYS0baQEXBegAawpxecHksBc8OSFpLfvLGrgFLVnT7EWPlCtOViWxGpIjk8ebTU1t3TMrcoyMKwA5GeiCWDOn4gMBgZ6ABDx66CqfB4Zb4Prm2Ua+coiMJwYKeVbG6xP9USB18GB7vSu5OvYMscmkm3wz039I3DxUKZc+mPElSeRhOoR3/suT7KUuYPXr+DzKXQFBSIVwvBUcJtO/5Hblfwuo+0V2Kab1IQHM/+GEzOzALhmEdncpr70CPdLFdtsJoG/CWRKBAX1tffUvr3F3K4B4OvtQtUEEoFtyhTwbn+B5aa9rsBYK9PYNqrAQ8Cpbup3/b3hkKoJbMtN72XaBI7lpoyNkgNMA/fPPTDzAAv3fNO1gj4O3ABSe5nWiPOjXi/wAhgbylqL7JP5Ue8gMAFcG8paFsAvetnTGCl2Yn0AAAAASUVORK5CYII=',
                api:function(args){
                    var url='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+
                        'title='+args.title+
                        '&pics='+args.pic+
                        '&url='+args.url;
                    return {
                        url:url,
                        wSize:{
                            h:650,
                            w:620,
                        },
                    };
                },
            },
            fanfou:{
                name:'饭否',
                limitLang:'zh-CN',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABb0lEQVQ4jaWTXy4DURTGf9OOCkljTBNCiEksgB3oEliBLmF2oHYwVmC6Auyg3psYPJGIIqm0aXVkpI3SHA/HmDKtB77k5px7c+53/hvrlyLdIX/CfBbM1jtEnwS+A34HqlHa2MpCMa8HwH2ANwFzykgMdgvJ581Z8FbAMmFj5jtZpaNyygDDDkSe3qFUgEMn7bnyGVF9AEEPwpF0bRPM+OIuqjyNYCsPz0OYy05OKWEJRIpXIiIiXlOkdKu635aJKDdEqInYgUgmzr/Sgc0ZTeU0Us8x7gaw/6jnJzIAxyGU6hp69QWK14nBeV9luQFeU/Wg94PgN/htWMuBk4Nt6w8EXksLWl7WQp/3tSMxzHGfSoXEW0yyt6T6zs132xSBu6DtAzgJVdZfJ0c4NoWDlspqBN6qDthJqOEfrevbF+xAe0pNZ8C5SM9A3HfrTOS4q2/uvc6BkT8TicZso5MDZ1rDHy0aaH2qEQwB47/r/AEuq9/lRZUysAAAAABJRU5ErkJggg==',
                api:function(args){
                    var url='http://fanfou.com/sharer/image?'+
                        'u='+args.url+
                        '&t='+args.title+
                        '&img_src='+args.pic;
                    return{
                        url:url,
                        wSize:{
                            h:550,
                            w:650,
                        },
                    };
                },
            },
            tieba:{
                name:'百度贴吧',
                limitLang:'zh-CN',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAB6ElEQVQ4jaWTy2sTURTGfzOdSbFNpQRbX1DjYyPFlYyuogtFEcFtBSldFhc1IMFFQYpd+CjYhW4UXAkiRPSPUEEqiNKmPhKSSUIbzYM0bRaZV3JchMRE46b9Nvdwzz0/Pu53rxIyTGEH0gDefgxua/jMqTRqr0YibnNvvkhsxQLATDmYKacnpCfg2ZNNXj6v8vB+GTPlMHU1R/h6viekC1DZqLfr4UCzVSo29xxX2nWntFaRzbjMzRbx+1UeP93H4kKJi5eGGD/RTzgSoPPc2CH9DyFkmCIiEn1RkWMHEhIyTIktWyIiUqvVpaVU0pbJiTWZnFiTTNoREZGQYUrbQfCoj/0HNfaOamTSLgODCosPyvTpEL4Z4HW0yreYQ2WjTv6X13bRBhindxGOBCjkPY6P+5iZzpOM2+i6SrlU587dEZbe1yCos2ek7987ALh8xc/PnMetGwV+fLUBsKwGH97VmI0UWHg0SjbtcviIr3cKyYTLzHSeL5+b+XseaFpzXV1xmL9dYiyod450A95Et1hdtvG8v6LSoLrV4NOSRTbt9o4RQNPBthooqoLjgDQEG1BUBYBarUFu3fs/4NrUMLn1OvHvDruHVM6eH2g6e1WlutngpNHPuQuD3fZa72A7ChmmKDv9zr8BrHscNfGR3bQAAAAASUVORK5CYII=',
                api:function(args){
                    var url = 'http://tieba.baidu.com/f/commit/share/openShareApi?'+
                        'title='+args.title+
                        '&url='+args.url+
                        '&pic='+args.pic;
                    return {
                        url:url,
                        wSize:{
                            h:600,
                            w:630,
                        },
                    };
                },
            },
            renren:{
                name:'人人网',
                limitLang:'zh-CN',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAC10lEQVQ4jXWTTWhUVxTHf/M+nSTjTCax+dAkxk5lGo2ttMUGBJt0FEFUsJa0i0JXQpFu7KLFgIsKUgpdlRYMFApZKtRNrYkLKYUKFiWQtgq1nUAmkGgMiZN5M++9e+/pIvURIv3DWdxz7v93uPdwUmySndk56O04esbJFYec3EuviY4jXZ2dUU+mbzbmfhqX+mJ5s2ddKcv2d42O5Y5cC/3PZ2T8VkVERMJYy/itimy5MC3Zw1eq3o6jZzbaHICU7aVbXr84pYffPvi02IZZ1ZhmGwDPsTDNNo32DPHp/S3+3xcvOzdfPRxMf/keYrQFkB44+616a+RgUGjDPAphvkZlNU66VFZjmF9DVzVBcRuU3jnt7xodA7DsXHHI3n/yw3p3HuYCWIogUDSUSQANZaCm4HEIcwGNrizpF0fHrPS2XsfvOfZR2L0VlgKoKxDAGCIjCSAyAsaA0lA1GGMIX+7y3IcjH1hO274RZblQ06AADSihVMgmgFIhC0qSGlVF7Pu4L7xxzLL81k4TGVAGjIAROtsdju9uTQDHd7fS2e4kdZRBa7CbuwpWynZsQgXarEeoKR3IPzfl0oE8hHrDPQWApYPH81ao/iMLfdtdJk70PQeYONFH33Z3/QlGsBsxOlgsW3p55menFoISero97pwbSEznr89y/vpscr5zboCebg+U4K41iB/99iN2rjiUOTkpg1/fl4VaJM+0UI0kf2pS8qcmZaG6IV+LZM9Xv0vuyLUwle7ot/TKg9v6n6mJfWFER5ObdBu+dI/lMMVymGL40r0k39HksjeOaZSvfCH1xbINoJ7cvVFe6T306/yW3j39Gd789DYPH6xBtgl8h6XyU77/pcIrOzOc/eYPpn64erX+5+WPQSSVoFOW7fe/+1m68P6FuuV5qiWNTnsA2EGEW6vj69pa/f53n0SVG+OJbfNvP1tnN7/3kL21fxBArfx19//W+V9oRmy7yi+Z7gAAAABJRU5ErkJggg==',
                api:function(args){
                    var url='http://widget.renren.com/dialog/share?'+
                        'link='+args.url+
                        '&title='+args.title+
                        '&pic='+args.pic;
                    return {
                        url:url,
                        wSize:{
                            h:600,
                            w:650,
                        },
                    };
                },
            },
            douban:{
                name:'豆瓣',
                limitLang:'zh-CN',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABj0lEQVQ4jZ2TzSuEURTGf/edUT42XiJFMY2o2RA1ioXUKDtssaEs/AHMzlZZTllMFnY2FsxOzAIxoRTJ1/iYKPmenWy8cyzueM1FwlmdTs95es5zn6uaIx2yc73Lf6q5shFF2JZ/bbsVtiU03SN/rdB0jxC2xQtwdJ9kfGkCBEAQ+V6UUsrtj26TIOScIBAorwcBETHAYM4O705AAQq874DWmiAbI4u/urptqovE1bZJ4GQcAM6fUnTP9H27GBucxV/qw3EcfW4ugWgDeHx+4uDmGCylZebU43Maf6nP8MglUFm0XVBMoKIePJ+2Abuw2MAaBF5Lt3VltRyMbv7ogdfjcXsjSCF/O8vD8wAEJlvIz8tHoXh5feFwdAuAzmgv8dMVfaKVowAgfrZKKn2Jr6Sa04cLXnG0UVl1qfQl8eSK4Y9laFMwtx8DYCg4oEEWDAX7AZjbW3BnHzaEbYlsRP8c5ch6VBjLRnktlaC8qAxEyIj8mEQrO187T+gou985gw6HCKivT/iJDZSiqaqBNySK8rrw6ad1AAAAAElFTkSuQmCC',
                api:function(args){
                    var url='http://shuo.douban.com/%21service/share?'+
                        'href='+args.url+
                        '&name='+args.title+
                        '&image='+args.pic;
                    return {
                        url:url,
                        wSize:{
                            h:350,
                            w:600,
                        },
                    };
                },
            },
            facebook:{
                name:'Facebook',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAvVBMVEUAAAD///8OkPMPlPQMivEKhfAHfuwFd+oEcugCbOUVp/0To/sRmfYXq/7h8f0Ige36/P7s9f3G5/3b6vsSnvgSnfh0rfAdfugdqPsYpvsZo/ZKqvVmr/MhpfNEovMqmfN1svIXkPIWl/AJge4eh+0MeuUIbuHy+f7Y6/yl2vzb6/u53/vb6fpTufqZ0PltwPlCsfmw1fiKxvgUnvh3wPdet/ctpPZ/u/Vvs/RdrvQ0ofQvku4ckesXheccduSckMFkAAAAAXRSTlMAQObYZgAAAKBJREFUGNNFyFcWgkAQRNFqwyiKJMEsGcw5x/0vyx7mqPenXjcK4xYb42fQKAy+d1Pq93r9prpdz/MO25njrFwXLNbZ2SGija7HwLMsnSbWYj3kAEqFo2XcVaHComBPhh9EslFlN8Mmy5gOZcM0hRiRZPtmkph4CSEe1x3Zl1HKCSCrsZDmqdwMrM5CanfloqBpWocfPICSq0eOvw4t36o+GHANGQygnDcAAAAASUVORK5CYII=',
                api:function(args){
                    var url='https://www.facebook.com/sharer/sharer.php?'+
                        'u='+encodeURIComponent(args.url)+
                        '&t='+args.title;
                    return {
                        url:url,
                        wSize:{
                            h:436,
                            w:626,
                        },
                    };
                },
            },
            twitter:{
                name:'Twitter',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAllBMVEUAAAAcmu98gIMdme58gINGjsBgh6MUnPceme1gh6Jkhp5phpgSnfoXnPURnfsXm/Qhmekjl+chl+hgiKNeiKRtg5Jlhpt3gogUnPgcmvAUnPgYnPMRnPsemewVnPUmluI1k9I7kcsplt8xlNg0ktJFj8E1kdFSi7Fhh6JFj8E9kMhWiq0dmu4cmvAXm/USnfobm/ENnv8KO1KbAAAALHRSTlMA/QP6BVIl/vhAHA/38e3iwpyRUDIVCQjy7+TZz8y0p5KEe3NsX05JRzksIGD09Y0AAACcSURBVBjTZY4HDsMwCEVxbGfv2b13sZ3e/3IlSdtE6pOQHh8JgB+iER+zqEYbsYsSoO7kRCMB51CH2/xBgffaVQBBhC6qxR1IlzrZexeNjLeHbo2/cVGbCJXiWvZBjJwjKsbQKSkQIBPOCErWor9dr1qmlGLcSBi4phwZc3U2tEHlH+cclcma4dNnHhvHmaVy8rRX3Gz4w5o68fU3RC4LI5L0wcgAAAAASUVORK5CYII=',
                api:function(args){
                    var url='https://twitter.com/intent/tweet?'+
                        'url='+args.url+
                        '&text='+args.title;
                    return {
                        url:url,
                        wSize:{
                            h:350,
                            w:600,
                        },
                    };
                },
            },
            pinterest:{
                name:'Pinterest',
                icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAq1BMVEUAAADkABfmASPkAB7////kABTmBCbmASDkABv97O/nGjnnDy/lARv61tv60NfuU2rsNFHpHz3tFzfnCCrvAiTwASPiASH73uP5xs73ucLqPljqKkfoFjTmCyz+9ff2prH0k6LzkJzxc4fvZ3zsRF7mAB7jAAv++fv++fr97/H86Oz86Ov74uf62d72rrn2qbT1nqz0m6jygJPyfY7xe4ztTGXtSmLrPFfsLUuclYq1AAAAAXRSTlMAQObYZgAAAL1JREFUGNM9jteywjAQQ73FLXY6aSShw+29/v+X4UmA87SakVYSE8u8LPOluBEpDKjoqhcE4D0ALWZd1eZv3Tx3qa6ryU/mm5PtNuYPNEX4p+DAn1Ke/Ib3oIXIEboX2CU9OJsQZWJE87TRK/4FbG1JTiiE+A0fVgOppkHtQkTuOHrsQPb8DiGSoS6/fjgZh/a+N8epVp32HNs7m3oq5mF+bV2aDqauLtMhfpVSUph+oWgPUulj8N/4H102X2eAaAyI9S5e9gAAAABJRU5ErkJggg==',
                api:function(args){
                    var url='https://pinterest.com/pin/create/button/?'+
                        'url='+args.url+
                        '&media='+encodeURIComponent(args.pic)+
                        '&description='+encodeURIComponent(args.title);
                    return {
                        url:url,
                        wSize:{
                            h:350,
                            w:600,
                        },
                    };
                },
            }
        };

        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function(str) {
                return this.slice(0, str.length) == str;
            };
        }

        var rulerEle = document.createElement("span");
        rulerEle.style.visibility = "hidden";
        rulerEle.style.whiteSpace = "nowrap";
        function visualLength(str,size,family) {
            rulerEle.style.fontSize = size || "inherit";
            rulerEle.style.fontFamily = family || "inherit";
            rulerEle.innerText = str;
            getBody(document).appendChild(rulerEle);
            let w = rulerEle.offsetWidth;
            getBody(document).removeChild(rulerEle);
            return w;
        }

        function getMStr(func) {
            var lines = func.toString();
            lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
            return lines;
        }

        function toRE(obj, flag) {
            if (!obj) {
                return obj;
            } else if (obj instanceof RegExp) {
                return obj;
            } else if (flag) {
                return new RegExp(obj, flag);
            } else if (obj instanceof Array) {
                return new RegExp(obj[0], obj[1]);
            } else if (typeof obj === 'string') {
                if (obj.indexOf('*') != -1 && obj.indexOf('.*') == -1) {
                    obj = wildcardToRegExpStr(obj);
                }
                return new RegExp(obj);
            }
        }

        function wildcardToRegExpStr(urlstr) {
            if (urlstr.source) return urlstr.source;
            var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
                return str === "*" ? ".*" : "[^/]*";
            });
            return "^" + reg + "$";
        }

        function isXPath(xpath) {
            return xpath.startsWith('./') || xpath.startsWith('//') || xpath.startsWith('id(');
        }

        function getElementMix(selector, contextNode, doc) {
            var ret;
            if (!selector || !contextNode) return ret;
            doc = doc || document;

            var type = typeof selector;
            if (type == 'string') {
                if (isXPath(selector)) {
                    ret = getElementByXpath(selector, contextNode, doc);
                } else {
                    ret = contextNode.parentNode.querySelector(selector);
                }
            } else if (type == 'function') {
                ret = selector(contextNode, doc);
            }
            return ret;
        }

        function launchFullScreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }

        function cancelFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        // 检测缩放
        function detectZoom (){
            var ratio = 0,
                screen = window.screen,
                ua = navigator.userAgent.toLowerCase();

            if (window.devicePixelRatio !== undefined) {
                ratio = window.devicePixelRatio;
            }
            else if (~ua.indexOf('msie')) {
                if (screen.deviceXDPI && screen.logicalXDPI) {
                    ratio = screen.deviceXDPI / screen.logicalXDPI;
                }
            }
            else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
                ratio = window.outerWidth / window.innerWidth;
            }

            if (ratio){
                ratio = Math.round(ratio * 100);
            }

            return ratio;
        }

        //获取位置
        function getContentClientRect(target){
            var rect=target.getBoundingClientRect();
            var compStyle=unsafeWindow.getComputedStyle(target);
            var pFloat=parseFloat;
            var top=rect.top + pFloat(compStyle.paddingTop) + pFloat(compStyle.borderTopWidth);
            var right=rect.right - pFloat(compStyle.paddingRight) - pFloat(compStyle.borderRightWidth);
            var bottom=rect.bottom - pFloat(compStyle.paddingBottom) - pFloat(compStyle.borderBottomWidth);
            var left=rect.left + pFloat(compStyle.paddingLeft) + pFloat(compStyle.borderLeftWidth);
            return {
                top:top,
                right:right,
                bottom:bottom,
                left:left,
                width:right-left,
                height:bottom-top,
            };
        };

        //获取窗口大小.
        function getWindowSize(){
            /*
            //包含滚动条
             return {
                 h:window.innerHeight,
                 w:window.innerWidth,
             };
            */

            //去除滚动条的窗口大小
            var de=document.documentElement;
            var body=getBody(document);
            var backCompat=document.compatMode=='BackCompat';
            return {
                h:backCompat? body.clientHeight : de.clientHeight,
                w:backCompat? body.clientWidth : de.clientWidth,
            };

        }

        //获取已滚动的距离
        function getScrolled(container){
            if(container){
                return {
                    x:container.scrollLeft,
                    y:container.scrollTop,
                };
            }
            return {
                x:'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || getBody(document).scrollLeft),
                y:'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset :  document.documentElement.scrollTop || getBody(document).scrollTop),
            };
        }

        //xpath 获取单个元素
        function getElementByXpath(xpath,contextNode,doc){
            doc=doc || document;
            contextNode=contextNode || doc;
            return doc.evaluate(xpath,contextNode,null,9,null).singleNodeValue;
        }


        //事件支持检测.
        function eventSupported( eventName,elem ){
            elem = elem || document.createElement("div");
            eventName = "on" + eventName;
            var isSupported = (eventName in elem);
            if (!isSupported){
                if(!elem.setAttribute){//setAttribute是元素节点的方法
                    elem=document.createElement("div");
                };
                var setAttr;
                if(!elem.hasAttribute(eventName)){
                    setAttr=true;
                    elem.setAttribute(eventName, "return;");
                };
                isSupported = typeof elem[eventName] == "function";
                if(setAttr)elem.removeAttribute(eventName);
            }
            return isSupported;
        }


        //检测属性支持.dom属性
        //返回带前缀的可以直接执行是属性
        function proSupported(proName,elem){
            //判断第一个字母是否大写，如果是的话，为构造函数，前缀也要大写
            var prefix=/^[A-Z]/.test(proName)? ['','WebKit-','O-','Moz-','MS-'] : ['','webkit-','o-','moz-','ms-'];
            var i=0;
            var p_i;
            var sProName;
            elem = elem || document.createElement("div");
            while(typeof (p_i=prefix[i++])!='undefined'){
                sProName=(p_i+proName).replace(/-([A-z])/g,function(a,b){
                    return b.toUpperCase();
                });
                if(sProName in elem)return sProName;
            }
        }


        //css属性支持
        //带前缀的默认为大写（所有浏览器支持）
        //比如WebkitTransform,MozTransform,OTransfomr
        //chrome浏览器大小写前缀都行。
        //firefox,opera只能大写
        //ie 9+只能小写
        function cssProSupported(proName,elem,capitalize){
            if(capitalize!==false)capitalize=true;
            proName=proName.toLowerCase();

            var prefix=['','-webkit-','-o-','-moz-','-ms-'];
            elem=elem || document.createElement('div');
            var style=elem.style;
            var camelPro;

            // 会有个错误 invalid 'in' operand style
            try {
                for(var i=0,ii=prefix.length;i<ii;i++){
                    var first=true;
                    camelPro=(prefix[i]+proName).replace(/-([a-z])/g,function(a,b){
                        b=b.toUpperCase();
                        if(first){
                            first=false;
                            if(!capitalize){
                                b=b.toLowerCase();
                            };
                        };
                        return b;
                    });
                    if(camelPro in style){
                        return camelPro;
                    }
                }
            } catch(ex) {}

            if(!capitalize)return;
            return cssProSupported(proName,elem,false);

        }

        //css属性值支持
        function cssValueSupported(proName,value,elem){
            var prefix=['','-webkit-','-o-','-moz-','-ms-'];
            elem=elem || document.createElement('div');
            var style=elem.style;
            if(!style)return false;
            var prefixedValue;
            for(var i=0,ii=prefix.length;i<ii;i++){
                prefixedValue=prefix[i] + value;
                style[proName]=prefixedValue;
                if(style[proName]==prefixedValue){
                    return prefixedValue;
                }
            }
        }


        //elem.dataset的兼容实现
        //ie不支持；firefoxGM储存不能反映到元素属性上。
        function dataset(elem,pro,value){

            function getDataPrefix(){
                return 'data-' + pro.replace(/[A-Z]/g,function(m){
                    return '-' + m.toLowerCase();
                });
            };

            if(typeof value=='undefined'){//取值
                if(elem.dataset){
                    value = elem.dataset[pro];
                }else{//没有取到值，返回undefined，getAttribute默认是返回null，所以判断一下。
                    var prefixedPro=getDataPrefix();
                    if(elem.hasAttribute(prefixedPro)){
                        value=elem.getAttribute(prefixedPro);
                    };
                };
                return value;
            }else{
                elem.setAttribute(getDataPrefix(),value);
            };
        };


        //重新检查悬浮图片
        function imgReHover(img){
            //要检查的图片，是当前悬浮的。
            if(!floatBar.shown || floatBar.data.img != img)return;

            var mHover=document.createEvent('MouseEvent');
            var cr=img.getBoundingClientRect();
            mHover.initMouseEvent('mouseover',true,true,window,0, cr.left + 10, cr.top + 10, cr.left + 10, cr.top + 10, false,false,false,false, 0,null);
            img.dispatchEvent(mHover);
        };

        // 获取真正的unsafeWindow,chrome里面也能访问到真实环境的变量
        // 在 chrome 37 测试无效
        if(!envir.firefox && !envir.opera && !envir.ie && !storage.supportGM){
            ;(function(){
                document.addEventListener('picViewer-return-unsafeWindow',function(e){
                    unsafeWindow = e.detail;
                    // alert(unsafeWindow.$);
                },true);

                //页面脚本
                var s=document.createElement('script');
                s.textContent='(' + (function(){
                    var cusEvent=document.createEvent('CustomEvent');
                    cusEvent.initCustomEvent('picViewer-return-unsafeWindow',false,false,window);
                    document.dispatchEvent(cusEvent);
                }).toString() +')()';
                document.head.appendChild(s);
            })();
        }


        //抛出错误到错误控制台
        function throwErrorInfo(err){
            if(console && console.error){
                console.error(err.message + '\n\n' + (err.stacktrace? err.stacktrace : '') + '\n\n' , err);
            };
        };

        //对象克隆
        function cloneObject(obj,deep){
            var obj_i;
            var ret=Array.isArray(obj)? [] : {};
            for(var i in obj){
                if(!obj.hasOwnProperty(i))continue;
                obj_i=obj[i];
                if(!deep || typeof obj_i!='object' || obj_i===null || obj_i.nodeType){
                    ret[i]=obj_i;
                }else{
                    ret[i]=cloneObject(obj_i,deep);
                };
            };
            return ret;
        };

        //闪烁元素。
        function flashEle(ele,duration){
            if(dataset(ele,'pvFlashing'))return;
            if(ele.offsetHeight==0)return;
            dataset(ele,'pvFlashing','1');

            var oOutline=ele.style.outline;
            var oOutlineOffset=ele.style.outlineOffset;
            var oOpacity=ele.style.opacity;
            var oTransform=ele.style[support.cssTransform];

            var count=0;
            var startTime=Date.now();
            duration=duration? duration : 1200;

            var flashInterval=setInterval(function(){
                var outline='none',
                    outlineOffset=0,
                    opacity=0.3,
                    transform='';

                if(count % 2 == 0){
                    outline='5px dashed rgba(255,0,0,0.95)';
                    opacity=0.95;
                    outlineOffset='1px';
                    transform='scale(1.1)';
                }else{
                    if((Date.now() - startTime) > duration){
                        clearInterval(flashInterval);
                        outline=oOutline;
                        opacity=oOpacity;
                        outlineOffset=oOutlineOffset;
                        transform=oTransform;
                        ele.removeAttribute('data-pv-flashing');
                    };
                };

                ele.style.outline=outline;
                ele.style.outlineOffset=outlineOffset;
                ele.style.opacity=opacity;
                ele.style[support.cssTransform]=transform;

                count++;
            },80);
        }

        //支持情况.
        var support={
            cssTransform:cssProSupported('transform'),
            cssCursorValue:{
                zoomIn:cssValueSupported('cursor','zoom-in'),
                zoomOut:cssValueSupported('cursor','zoom-out'),
                grab:cssValueSupported('cursor','grab'),
                grabbing:cssValueSupported('cursor','grabbing'),
            },
        };



        //动画算法
        /*
         t: current time（当前时间）；
         b: beginning value（初始值）；
         c: change in value（变化量）；
         d: duration（持续时间）。
        */

        var Tween = {
            Cubic: {
                easeInOut:function(t,b,c,d){
                    return -c/2*(Math.cos(Math.PI*t/d)-1)+b
                }
            },
        };

        //imgReady
        var imgReady=(function(){
            var iRInterval,
                iRReadyFn=[],
                isrcs=[]
            ;

            var timeLimit=3 * 60 * 1000;//3分钟

            function checkReady(){
                var now= Date.now();
                for(var i=0,ii=iRReadyFn.length,iRReadyFn_i;i<ii;i++){
                    iRReadyFn_i=iRReadyFn[i];
                    //now - iRReadyFn_i.startTime >= timeLimit ||
                    if(iRReadyFn_i()){
                        iRReadyFn.splice(i,1);
                        isrcs.splice(i,1);
                        i--;
                        ii--;
                    };
                };
                if(iRReadyFn.length==0){
                    clearInterval(iRInterval);
                    iRInterval=null;
                };
            };



            var imgReady=function(img,opts){

                if(/NodeList|HTMLCollection/.test(Object.prototype.toString.call(img))  || Array.isArray(img)){
                    arrayFn.forEach.call(img,function(img,index,array){
                        if(img instanceof HTMLImageElement){
                            imgReady(img,opts);
                        };
                    });
                    return;
                };

                if(!(img instanceof HTMLImageElement)){
                    var t_img=document.createElement('img');
                    t_img.src=img;
                    img=t_img;
                    t_img=null;
                };

                var ready,load,error,loadEnd,abort,timeout,time;
                ready=opts.ready;
                load=opts.load;
                error=opts.error;
                loadEnd=opts.loadEnd;
                abort=opts.abort;
                timeout=opts.timeout;
                time=typeof opts.time=='number'? opts.time : 0;

                if(time){
                    setTimeout(function(){
                        if(!loadEndDone){
                            aborted=true;
                            removeListener();
                            img.src= prefs.icons.brokenImg_small;
                            if(timeout){
                                timeout.call(img,{
                                    target:img,
                                    type:'timeout',
                                });
                            };
                            loadEndDone=true;
                            if(loadEnd){
                                loadEnd.call(img,{
                                    target:img,
                                    type:'timeout',
                                });
                            };

                        };
                    },time);
                };

                var src=img.src;
                var loadEndDone;

                function go(type,e){
                    switch(type){
                        case 'load':{
                            removeListener();
                            go('ready');//如果直接触发load，那么先触发ready
                            if(load){
                                load.call(img,e);
                            };

                            if(!loadEndDone){
                                loadEndDone=true;
                                if(loadEnd){
                                    loadEnd.call(img,e);
                                };
                            };
                        }break;
                        case 'ready':{
                            if(!ready || readyHandler.done)return;
                            readyHandler.done=true;
                            ready.call(img,{
                                target:img,
                                type:'ready',
                            });
                        }break;
                        case 'error':{
                            removeListener();
                            if(error){
                                error.call(img,e);
                            };
                            if(!loadEndDone){
                                loadEndDone=true;
                                if(loadEnd){
                                    loadEnd.call(img,e);
                                };
                            };
                        }break;
                    };
                };

                var aborted;
                var ret={
                    img:img,
                    abort:function(){
                        if(!loadEndDone){
                            aborted=true;
                            removeListener();
                            img.src= prefs.icons.brokenImg_small;
                            if(abort){
                                abort.call(img,{
                                    target:img,
                                    type:'abort',
                                });
                            };
                            loadEndDone=true;
                            if(loadEnd){
                                loadEnd.call(img,{
                                    target:img,
                                    type:'abort',
                                });
                            };
                        };
                    },
                };

                function readyHandler(){//尽快的检测图片大小.
                    if(loadEndDone || aborted)return true;
                    if(img.naturalWidth==0 || img.naturalHeight==0)return;
                    go('ready');
                    return true;
                };


                function loadHandler(e){
                    go('load',e);
                };

                function errorHandler(e){
                    go('error',e);
                };

                function removeListener(){
                    img.removeEventListener('load',loadHandler,true);
                    img.removeEventListener('error',errorHandler,true);
                };

                //ready必须在load之前触发。

                if(img.complete){//图片已经加载完成.
                    if(typeof img.width=='number' && img.width && img.height){//图片
                        setTimeout(function(){
                            if(aborted)return;
                            go('load',{
                                type:'load',
                                target:img,
                            });
                        },0);
                    }else{//这不是图片.opera会识别错误.
                        setTimeout(function(){
                            if(aborted)return;
                            go('error',{
                                type:'error',
                                target:img,
                            });
                        },0);
                    };
                    return ret;
                };


                img.addEventListener('error',errorHandler,true);
                img.addEventListener('load',loadHandler,true);


                if(ready){
                    var index=isrcs.indexOf(src);
                    if(index==-1){
                        isrcs.push(src);
                        readyHandler.startTime= Date.now();
                        iRReadyFn.push(readyHandler);
                    }else{
                        iRReadyFn[index].startTime= Date.now();
                    };

                    if(!iRInterval){
                        iRInterval=setInterval(checkReady,66);
                    };
                };

                return ret;
            };

            return imgReady;
        })();


        var addWheelEvent=(function(){

            function getSupportEventName(){
                var ret='DOMMouseScroll';
                if(eventSupported('wheel')){//w3c FF>=17 ie>=9
                    ret='wheel';
                }else if(eventSupported('mousewheel')){//opera,chrome
                    ret='mousewheel';
                };
                return ret;
            };

            var eventName;

            return function(ele,callback,useCapture){
                if(!eventName){
                    eventName=getSupportEventName();
                };

                ele.addEventListener(eventName,function(e){
                    var type=e.type;
                    var ne;
                    if(type!='wheel'){
                        ne={};
                        for(var i in e){
                            ne[i]=e[i];
                        };

                        ne.type='wheel';
                        ne.deltaX=0;
                        ne.deltaY=0;
                        ne.deltaZ=0;
                        ne.deltaMode=1;//line
                        ne.preventDefault=e.preventDefault.bind(e);
                        ne.stopPropagation=e.stopPropagation.bind(e);

                        var x=0,y=0;
                        if(typeof e.axis=='number'){//DOMMouseScroll
                            if(e.axis==2){
                                y=e.detail;
                            }else{
                                x=e.detail;
                            };
                        }else{
                            //opera早起版本的mousewheel只支持y轴的滚动,e.wheelDeltaY undefined
                            if(typeof e.wheelDeltaY=='undefined' ||  e.wheelDeltaY!=0){
                                y=-e.wheelDelta/40;
                            }else{
                                x=-e.wheelDelta/40;
                            };
                        };
                        ne.deltaY =y;
                        ne.deltaX =x;

                    };

                    callback.call(this,ne? ne : e);
                },{ passive: false, capture: useCapture || false });
            };
        })();


        var addCusMouseEvent=(function(){

            function getSupported(){
                return {
                    mouseleave:eventSupported('mouseleave'),
                    mouseenter:eventSupported('mouseenter'),
                };
            };

            var support;
            var map={
                mouseleave:'mouseout',
                mouseenter:'mouseover',
            };

            return function(type, ele, fn){//事件类型，元素，监听函数
                if(!support){
                    support=getSupported();
                };

                // chrome 30+ 虽然支持 mouseenter，但是存在问题
                if(support[type] && !(type == 'mouseenter' && window.chrome)){
                    ele.addEventListener(type,fn,false);//mouseleave,enter不冒泡
                }else{
                    ele.addEventListener(map[type],function(e){
                        var relatedTarget=e.relatedTarget;//mouseout，去往的元素；mouseover，来自的元素
                        if(!this.contains(relatedTarget)){
                            fn.call(this,e);
                        };
                    },true);
                };
            };

        })();


        //库
        function GalleryC(){
            this.init();
        };

        var gallery;
        var galleryMode;

        GalleryC.prototype={
            init:function(){
                this.addStyle();
                var container=document.createElement('span');

                this.gallery=container;
                container.className='pv-gallery-container';
                container.tabIndex=1;//为了获取焦点，来截获键盘事件
                container.innerHTML=createHTML(
                    '<span class="pv-gallery-head">'+
                    '<span class="pv-gallery-head-float-left">'+
                    '<span title="'+i18n("picInfo")+'" class="pv-gallery-head-left-img-info">'+
                    '<span class="pv-gallery-head-left-img-info-resolution" title="'+i18n("resolution")+'">0 x 0</span>'+
                    '<span class="pv-gallery-head-left-img-info-count" title="'+i18n("picNum")+'">（1 / 1）</span>'+
                    '<span class="pv-gallery-head-left-img-info-scaling" title="'+i18n("scaleRatio")+'">（100%）</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '<span class="pv-gallery-head-left-img-info-description" title="'+i18n("picNote")+'"></span>'+
                    '<div class="pv-gallery-range-box"><input type="range" id="minsizeW" min="0" max="100" value="0" title="Width" /> <span id="minsizeWSpan">0px</span> '+
                    '<input type="range" id="minsizeH" min="0" max="100" value="0" title="Height" /> <span id="minsizeHSpan">0px</span></div>'+
                    '<span class="pv-gallery-head-left-lock-icon" title="'+i18n("lockSizeTip")+'"></span>'+
                    '</span>'+
                    '</span>'+

                    '<span title="'+i18n("exitCollectionTip")+'" class="pv-gallery-head-command pv-gallery-head-command-exit-collection">'+
                    '<span>'+i18n("exitCollection")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+

                    '<span title="'+i18n("loadAllTip")+'" class="pv-gallery-head-command pv-gallery-head-command-nextPage">'+
                    '<span>'+i18n("loadAll")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+

                    /*'<span title="'+i18n("urlFilterTip")+'" class="pv-gallery-head-command pv-gallery-head-command-urlFilter">'+
                    '<span>'+i18n("urlFilter")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+

                    '<span title="'+i18n("fiddleTip")+'" class="pv-gallery-head-command pv-gallery-head-command-operate">'+
                    '<span>'+i18n("fiddle")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+*/

                    '<span class="pv-gallery-head-command-container">'+
                    '<span class="pv-gallery-head-command pv-gallery-head-command-collect">'+
                    '<span class="pv-gallery-head-command-collect-icon"></span>'+
                    '<span class="pv-gallery-head-command-collect-text"></span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-collect">'+
                    '<span title="'+i18n("collectDetailTip")+'" class="pv-gallery-head-command-drop-list-item pv-gallery-head-command-drop-list-item-collect-description">'+
                    '<span>'+i18n("collectDetail")+'：</span>'+
                    '<textarea data-prefs="description" cols="25" rows="5"></textarea>'+
                    '</span>'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-head-command-container">'+
                    '<span title="'+i18n("playSlide")+'" class="pv-gallery-head-command pv-gallery-head-command-slide-show">'+
                    '<span class="pv-gallery-head-command_overlayer"></span>'+
                    '<span class="pv-gallery-head-command-slide-show-button">'+
                    '<span class="pv-gallery-head-command-slide-show-button-inner"></span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-slide-show-countdown" title="'+i18n("countDown")+'"></span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-slide-show">'+
                    '<span class="pv-gallery-head-command-drop-list-item" title="'+i18n("slideGapTip")+'">'+
                    '<input data-prefs="interval" step="1" min="1" type="number" value="5" />'+
                    '<span>'+i18n("slideGap")+'</span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item"  title="'+i18n("slideBackTip")+'">'+
                    '<input id="pv-gallery-head-command-drop-list-item-slide-show-backward" data-prefs="backward" type="checkbox" />'+
                    '<label for="pv-gallery-head-command-drop-list-item-slide-show-backward">'+i18n("slideBack")+'　　　</label>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item"  title="'+i18n("slideWaitTip")+'">'+
                    '<input id="pv-gallery-head-command-drop-list-item-slide-show-wait" data-prefs="wait" type="checkbox" checked="checked" />'+
                    '<label for="pv-gallery-head-command-drop-list-item-slide-show-wait">'+i18n("slideWait")+'</label>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item"  title="'+i18n("slideSkipErrorTip")+'">'+
                    '<input id="pv-gallery-head-command-drop-list-item-slide-show-skipErrorImg" data-prefs="skipErrorImg" type="checkbox" checked="checked" />'+
                    '<label for="pv-gallery-head-command-drop-list-item-slide-show-skipErrorImg">'+i18n("slideSkipError")+'</label>'+
                    '</span>'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-head-command-container">'+
                    '<span title="'+i18n("typeTip")+'" class="pv-gallery-head-command pv-gallery-head-command-category">'+
                    '<span>'+i18n("type")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-category">'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-head-command-container">'+
                    '<span title="'+i18n("commandTip")+'" class="pv-gallery-head-command pv-gallery-head-command-others">'+
                    '<span>'+i18n("command")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-others">'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="enterCollection" title="'+i18n("viewCollectionTip")+'">'+i18n("viewCollection")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="urlFilter" title="'+i18n("urlFilterTip")+'">'+i18n("urlFilter")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="psImage" title="'+i18n("onlineEditTip",prefs.gallery.editSite)+'">'+i18n("onlineEdit")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="exportImages" title="'+i18n("exportImagesTip")+'">'+i18n("exportImages")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="copyImages" title="'+i18n("copyImagesUrlTip")+'">'+i18n("copyImagesUrl")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="downloadImage" title="'+i18n("downloadImageTip")+'">'+i18n("downloadImage")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="openInNewWindow" title="'+i18n("openInNewWindowTip")+'">'+i18n("openInNewWindow")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="scrollIntoView" title="'+i18n("findInPageTip")+'">'+i18n("findInPage")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" title="'+i18n("rotateTips")+'">'+
                    i18n("rotate")+' <select id="galleryRotate">'+
                    '<option value="0">0°</option>'+
                    '<option value="90">90°</option>'+
                    '<option value="180">180°</option>'+
                    '<option value="270">270°</option>'+
                    '</select>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" title="'+i18n("autoRefreshTip")+'">'+
                    '<label data-command="scrollToEndAndReload">'+i18n("autoRefresh")+'</label>'+
                    '<input type="checkbox"  data-command="scrollToEndAndReload"/>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="addImageUrls" title="'+i18n("addImageUrlsTips")+'">'+i18n("addImageUrls")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="operate" title="'+i18n("fiddleTip")+'">'+i18n("fiddle")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="viewmore">'+i18n("viewmore")+'</span>'+
                    '<span id="pv-gallery-fullscreenbtn" class="pv-gallery-head-command-drop-list-item" data-command="fullScreen">'+i18n("enterFullsc")+'</span>'+
                    '<span class="pv-gallery-head-command-drop-list-item" data-command="openPrefs">'+i18n("openConfig")+'</span>'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-head-command-container">'+
                    '<span title="'+i18n("headSearchTip")+'" class="pv-gallery-head-command pv-gallery-head-command-search">'+
                    '<span>'+i18n("headSearchTip")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-search">'+
                    '<span class="pv-gallery-head-command-drop-list-item" id="headSearchAll" data-command="headSearchAll">'+i18n("headSearchAll")+'</span>'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-head-command-container">'+
                    '<span title="'+i18n("share")+'" class="pv-gallery-head-command pv-gallery-head-command-share">'+
                    '<span>'+i18n("share")+'</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+
                    '<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-share">'+
                    '</span>'+
                    '</span>'+

                    '<span title="'+i18n("closeGallery")+'" class="pv-gallery-head-command pv-gallery-head-command-close">'+
                    '</span>'+

                    '</span>'+

                    '<span class="pv-gallery-body">'+

                    '<span class="pv-gallery-img-container">'+

                    '<span class="pv-gallery-img-content">'+
                    '<span class="pv-gallery-img-parent">'+
                    '<img title="'+i18n("refreshWhenError")+'" class="pv-gallery-img_broken" src="'+prefs.icons.brokenImg+'" />'+
                    '</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+

                    '<span class="pv-gallery-img-controler pv-gallery-img-controler-pre"></span>'+
                    '<span class="pv-gallery-img-controler pv-gallery-img-controler-next"></span>'+

                    '<span class="pv-gallery-scrollbar-h pv-gallery-img-scrollbar-h">'+
                    '<span class="pv-gallery-scrollbar-h-track pv-gallery-img-scrollbar-h-track">'+
                    '<span class="pv-gallery-scrollbar-h-handle pv-gallery-img-scrollbar-h-handle"></span>'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-scrollbar-v pv-gallery-img-scrollbar-v">'+
                    '<span class="pv-gallery-scrollbar-v-track pv-gallery-img-scrollbar-v-track">'+
                    '<span class="pv-gallery-scrollbar-v-handle pv-gallery-img-scrollbar-v-handle"></span>'+
                    '</span>'+
                    '</span>'+

                    '<span class="pv-gallery-sidebar-toggle" title="'+i18n("switchSlide")+'">'+
                    '<span class="pv-gallery-sidebar-toggle-content">▼</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+

                    '<span class="pv-gallery-sidebar-viewmore" title="'+i18n("viewmore")+'">'+
                    '<span class="pv-gallery-sidebar-viewmore-content">✚</span>'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '</span>'+

                    '</span>'+

                    '<span class="pv-gallery-sidebar-container" unselectable="on">'+
                    '<span class="pv-gallery-vertical-align-helper"></span>'+
                    '<span class="pv-gallery-sidebar-content" >'+

                    '<span class="pv-gallery-sidebar-controler pv-gallery-sidebar-controler-pre"></span>'+
                    '<span class="pv-gallery-sidebar-controler pv-gallery-sidebar-controler-next"></span>'+

                    '<span class="pv-gallery-sidebar-thumbnails-container">'+
                    '</span>'+

                    '<span class="pv-gallery-scrollbar-h pv-gallery-thumb-scrollbar-h">'+
                    '<span class="pv-gallery-scrollbar-h-track pv-gallery-thumb-scrollbar-h-track">'+
                    '<span class="pv-gallery-scrollbar-h-handle pv-gallery-thumb-scrollbar-h-handle"></span>'+
                    '</span>'+
                    '</span>'+
                    '<span class="pv-gallery-scrollbar-v pv-gallery-thumb-scrollbar-v">'+
                    '<span class="pv-gallery-scrollbar-v-track pv-gallery-thumb-scrollbar-v-track">'+
                    '<span class="pv-gallery-scrollbar-v-handle pv-gallery-thumb-scrollbar-v-handle"></span>'+
                    '</span>'+
                    '</span>'+

                    '</span>'+
                    '</span>'+
                    '<span class="pv-gallery-maximize-scroll"><span class="pv-gallery-maximize-container"></span></span>'+
                    '<span class="pv-gallery-tipsWords"></span>'+
                    '</span>');
                getBody(document).appendChild(container);

                var self=this;

                var hideBodyStyle=document.createElement('style');
                this.hideBodyStyle=hideBodyStyle;
                hideBodyStyle.textContent=`body>*:not([class^="pv-"]) img,body>img{display:none}`;

                container.querySelector("#minsizeW").oninput=function(){self.changeMinView();};
                container.querySelector("#minsizeH").oninput=function(){self.changeMinView();};
                container.querySelector("#minsizeWSpan").onclick=function(){
                    var minsizeW=window.prompt("Width:",this.value);
                    if(!minsizeW)return;
                    container.querySelector("#minsizeW").value=minsizeW;
                    self.changeMinView();
                };
                container.querySelector("#minsizeHSpan").onclick=function(){
                    var minsizeH=window.prompt("Height:",this.value);
                    if(!minsizeH)return;
                    container.querySelector("#minsizeH").value=minsizeH;
                    self.changeMinView();
                };
                container.querySelector(".pv-gallery-head-left-lock-icon").onclick=function(){
                    if(self.lockMaxSize){
                        self.lockMaxSize=null;
                        self.changeMinView();
                        this.style.filter="";
                        this.title=i18n("lockSizeTip");
                    }else{
                        var maxsizeW=window.prompt("Width:");
                        if(!maxsizeW)return;
                        var maxsizeH=window.prompt("Height:");
                        if(!maxsizeH)return;
                        self.lockMaxSize={w:maxsizeW,h:maxsizeH};
                        self.changeMinView();
                        this.style.filter="brightness(5)";
                        this.title=maxsizeW+" x "+maxsizeH;
                    }
                };

                var maximizeTrigger=document.createElement('span');
                this.maximizeTrigger=maximizeTrigger;
                maximizeTrigger.innerHTML=createHTML('-'+i18n("returnToGallery")+'-<span class="pv-gallery-maximize-trigger-close" title="'+i18n("closeGallery")+'"></span>');
                maximizeTrigger.className='pv-gallery-maximize-trigger';

                getBody(document).appendChild(maximizeTrigger);

                container.querySelector("#galleryRotate").addEventListener('change',function(e) {
                    self.galleryRotate = e.target.value;
                    self.fitToScreen();
                });


                var validPos=['top','right','bottom','left'];
                var sBarPosition=prefs.gallery.sidebarPosition;
                if(validPos.indexOf(sBarPosition)==-1){
                    sBarPosition='bottom';
                };

                this.sBarPosition=sBarPosition;
                this.selectedClassName='pv-gallery-sidebar-thumb_selected-' + sBarPosition;


                var sBarDirection='v';//垂直放置
                var isHorizontal=false;
                if(sBarPosition=='top' || sBarPosition=='bottom'){
                    sBarDirection='h';//水平放置
                    isHorizontal=true;
                };
                this.sBarDirection=sBarDirection;
                this.isHorizontal=isHorizontal;

                var classPrefix='pv-gallery-';
                var validClass=[
                    'head',

                    'head-left-img-info',
                    'head-left-img-info-description',
                    'head-left-img-info-resolution',
                    'head-left-img-info-count',
                    'head-left-img-info-scaling',

                    'head-command-close',
                    'head-command-nextPage',
                    'head-command-slide-show',
                    'head-command-slide-show-button-inner',
                    'head-command-slide-show-countdown',
                    'head-command-collect',
                    'head-command-exit-collection',

                    'head-command-drop-list-category',
                    'head-command-drop-list-others',
                    'head-command-drop-list-share',
                    'head-command-drop-list-slide-show',
                    'head-command-drop-list-collect',
                    'head-command-drop-list-search',

                    'body',

                    'img-container',

                    'img-scrollbar-h',
                    'img-scrollbar-h-handle',
                    'img-scrollbar-h-track',

                    'img-scrollbar-v',
                    'img-scrollbar-v-handle',
                    'img-scrollbar-v-track',

                    'thumb-scrollbar-h',
                    'thumb-scrollbar-h-handle',
                    'thumb-scrollbar-h-track',

                    'thumb-scrollbar-v',
                    'thumb-scrollbar-v-handle',
                    'thumb-scrollbar-v-track',

                    'img-content',
                    'img-parent',
                    'img_broken',

                    'img-controler-pre',
                    'img-controler-next',

                    'sidebar-toggle',
                    'sidebar-toggle-content',
                    'sidebar-viewmore',
                    'sidebar-viewmore-content',
                    'maximize-container',
                    'tipsWords',

                    'sidebar-container',
                    'sidebar-content',

                    'sidebar-controler-pre',
                    'sidebar-controler-next',

                    'sidebar-thumbnails-container',
                ];

                var eleMaps={};
                this.eleMaps=eleMaps;

                validClass.forEach(function(c){
                    eleMaps[c]=container.querySelector('.'+ classPrefix + c);
                });

                var posClass=[//需要添加'top bottom left right'class的元素
                    'img-container',
                    'sidebar-toggle',
                    'sidebar-viewmore',
                    'sidebar-container',
                    'sidebar-thumbnails-container',
                ];
                posClass.forEach(function(c){
                    eleMaps[c].classList.add(classPrefix + c + '-' +sBarPosition);
                });

                var hvClass=[//需要添加'v h'class的元素
                    'sidebar-toggle',
                    'sidebar-toggle-content',
                    'sidebar-viewmore',
                    'sidebar-viewmore-content',
                    'sidebar-container',
                    'sidebar-content',
                    'sidebar-controler-pre',
                    'sidebar-controler-next',
                    'sidebar-thumbnails-container',
                ];
                hvClass.forEach(function(c){
                    eleMaps[c].classList.add(classPrefix + c + '-' + sBarDirection);
                });



                //图片区域水平方向的滚动条
                var imgScrollbarH=new this.Scrollbar({
                    bar:eleMaps['img-scrollbar-h'],
                    handle:eleMaps['img-scrollbar-h-handle'],
                    track:eleMaps['img-scrollbar-h-track'],
                },eleMaps['img-content'],true);
                this.imgScrollbarH=imgScrollbarH;

                //图片区域垂直方向的滚动条
                var imgScrollbarV=new this.Scrollbar({
                    bar:eleMaps['img-scrollbar-v'],
                    handle:eleMaps['img-scrollbar-v-handle'],
                    track:eleMaps['img-scrollbar-v-track'],
                },eleMaps['img-content'],false);
                this.imgScrollbarV=imgScrollbarV;

                //缩略图区域的滚动条
                var thumbScrollbar;
                if(isHorizontal){
                    thumbScrollbar=new this.Scrollbar({
                        bar:eleMaps['thumb-scrollbar-h'],
                        handle:eleMaps['thumb-scrollbar-h-handle'],
                        track:eleMaps['thumb-scrollbar-h-track'],
                    },eleMaps['sidebar-thumbnails-container'],true);
                }else{
                    thumbScrollbar=new this.Scrollbar({
                        bar:eleMaps['thumb-scrollbar-v'],
                        handle:eleMaps['thumb-scrollbar-v-handle'],
                        track:eleMaps['thumb-scrollbar-v-track'],
                    },eleMaps['sidebar-thumbnails-container'],false);
                };
                this.thumbScrollbar=thumbScrollbar;

                self=this;

                var imgStatistics={//图片的总类，统计,初始化值
                    rule:{
                        shown:true,
                        count:0,
                        description:i18n("advancedRulesTip"),
                        name:i18n("advancedRules"),
                    },
                    tpRule:{
                        shown:true,
                        count:0,
                        description:i18n("tpRulesTip"),
                        name:i18n("tpRules"),
                    },
                    scale:{
                        shown:true,
                        count:0,
                        description:i18n("scaleRulesTip"),
                        name:i18n("scaleRules"),
                    },
                    force:{
                        shown:true,
                        count:0,
                        description:i18n("noScaleRulesTip"),
                        name:i18n("noScaleRules"),
                    },

                    // new
                    // scaleZoomResized: {
                    //  shown: false,
                    //  count: 0,
                    //  description: '缩放的图片，图片尺寸最少相差比例 ' + prefs.gallery.zoomresized + '%',
                    //  name: '小缩放'
                    // },
                    scaleSmall: {
                        shown: prefs.gallery.showSmallSize,
                        count: 0,
                        description: i18n("smallRulesTip",prefs.gallery.scaleSmallSize),
                        name: i18n("smallRules")
                    },
                };
                this.imgStatistics=imgStatistics;

                //生成分类下拉列表
                var typeMark='';
                var imgStatistics_i;
                for(var i in imgStatistics){
                    if(!imgStatistics.hasOwnProperty(i))continue;
                    imgStatistics_i=imgStatistics[i];
                    typeMark+=
                        '<span class="pv-gallery-head-command-drop-list-item" title="'+imgStatistics_i.description+'">'+
                        '<input type="checkbox" data-type="'+i+'" id="pv-gallery-head-command-drop-list-item-category-'+i+'" />'+
                        '<label for="pv-gallery-head-command-drop-list-item-category-'+i+'">'+imgStatistics_i.name+'</label>'+
                        '</span>';
                };
                eleMaps['head-command-drop-list-category'].innerHTML=createHTML(typeMark);


                //收藏相关
                var collection={
                    getMatched:function(){
                        let all=this.all || this.get();
                        for(let i=0;i<all.length;i++){
                            let v=all[i];
                            if(v.src==self.src) return [v, i];
                        }
                        return null;
                    },
                    check:function(){
                        //从缓存数据中检查。
                        var matched=this.getMatched();
                        this.favorite=matched? matched[0] : null;

                        this.tAreaValue();
                        this.highLight();
                    },
                    tAreaValue:function(){
                        this.textArea.value=this.favorite? this.favorite.description : self.eleMaps['head-left-img-info-description'].textContent;
                    },
                    highLight:function(){
                        eleMaps['head-command-collect'].classList[this.favorite? 'add' : 'remove']('pv-gallery-head-command-collect-favorite');
                    },
                    add:function(){
                        this.favorite={
                            src:self.src,
                            thumbSrc:dataset(self.relatedThumb,'thumbSrc'),
                            naturalSize:self.imgNaturalSize,
                            description:this.textArea.value,
                        };

                        //为了防止多个页面同时的储存，添加前，先载入最新的数据。
                        this.get();
                        //检查是否已经在里面了
                        var matched=this.getMatched();

                        if(matched){//如果已经存在，删除旧的。
                            this.all.splice(matched[1],1);
                        };
                        this.all.unshift(this.favorite);//添加到最前面。
                        this.highLight();
                        this.save();
                    },
                    remove:function(){
                        //获得最新数据
                        this.get();
                        //检查是否已经在里面了
                        var matched=this.getMatched();
                        if(matched){
                            this.all.splice(matched[1],1);
                            this.save();
                        };
                        this.favorite=null;
                        this.highLight();
                    },
                    save:function(){
                        storage.setItem('pv_collection',encodeURIComponent(JSON.stringify(this.all)));
                    },
                    get:function(){
                        var ret=storage.getItem('pv_collection') || '[]';
                        try{
                            ret=JSON.parse(decodeURIComponent(ret));
                        }catch(e){
                            ret=[];
                        };
                        this.all=ret;
                        return ret;
                    },
                    enter:function(){

                        if(this.all.length==0){
                            self.showTips(i18n("noCollectionYet"));
                            return;
                        };

                        this.mMode=true;
                        var button=this.dropListButton;
                        button.textContent=i18n("exitCollection");
                        dataset(button,'command','exitCollection');
                        this.headButton.style.display='inline-block';
                        eleMaps['sidebar-thumbnails-container'].classList.add('pv-gallery-sidebar-thumbnails_hide-span');

                        //生成dom
                        var container=document.createElement('span');

                        this.container=container;

                        var data_i;
                        var spanMark='';
                        var i=0;
                        while(data_i=this.all[i++]){
                            spanMark +=
                                '<span class="pv-gallery-sidebar-thumb-container" '+
                                'data-description="' + data_i.description + '"' +
                                ' data-natural-size="' + JSON.stringify(data_i.naturalSize).replace(/"/g,'&quot;') +
                                '" data-src="' + data_i.src +
                                '" data-thumb-src="' + data_i.thumbSrc +
                                '">'+
                                '<span class="pv-gallery-vertical-align-helper"></span>'+
                                '<span class="pv-gallery-sidebar-thumb-loading" title="'+i18n("loading")+'......"></span>'+
                                '</span>';
                        };
                        container.innerHTML=createHTML(spanMark);
                        eleMaps['sidebar-thumbnails-container'].appendChild(container);


                        this.selected=self.selected;//备份

                        self.select(container.children[0]);
                        self.thumbScrollbar.reset();
                        self.loadThumb();
                    },
                    exit:function(){
                        if(!this.mMode)return;

                        this.mMode=false;
                        var button=this.dropListButton;
                        button.textContent=i18n("viewCollection");
                        dataset(button,'command','enterCollection');
                        this.headButton.style.display='none';
                        eleMaps['sidebar-thumbnails-container'].removeChild(this.container);
                        eleMaps['sidebar-thumbnails-container'].classList.remove('pv-gallery-sidebar-thumbnails_hide-span');

                        self.select(this.selected);
                        self.thumbScrollbar.reset();
                        self.loadThumb();
                    },
                    textArea:eleMaps['head-command-drop-list-collect'].querySelector('textarea'),
                    dropListButton:eleMaps['head-command-drop-list-others'].querySelector('[data-command$="Collection"]'),
                    headButton:eleMaps['head-command-exit-collection'],
                };

                this.collection=collection;
                this.collection.textArea.addEventListener('focus',function(e){
                    eleMaps['head-command-drop-list-collect'].classList.add("focus");
                });
                this.collection.textArea.addEventListener('blur',function(e){
                    eleMaps['head-command-drop-list-collect'].classList.remove("focus");
                });

                eleMaps['head-command-drop-list-collect'].addEventListener('input',function(e){
                    var target=e.target;
                    if(!collection.favorite)return;
                    collection.favorite[dataset(target,'prefs')]=target.value;
                    clearTimeout(collection.saveTimer);
                    collection.saveTimer=setTimeout(function(){
                        collection.save();
                    },500);
                },true);


                var slideShow={
                    opts:{
                        interval:5000,
                        wait:true,
                        backward:false,
                        skipErrorImg:true,
                        run:false,
                    },
                    //timing:
                    //select(选中下一个图片后（缩略图栏选中了），还没开始读取大图（一般选中后，延时200ms开始读取大图）),
                    //loadEnd(当前显示图片已经读取完成后),
                    //click(点击按钮),
                    //change(改变设置)
                    run:function(timing){
                        if(!this.opts.run)return;

                        if(timing!='loadEnd'){
                            this.stop();
                        };

                        if(timing=='click' || timing=='select'){
                            if(!this.getEle()){//没有要切换到的图片了，停止
                                this.exit();
                                return;
                            };
                        };

                        if(this.opts.skipErrorImg){
                            if(self.imgError && !self.isLoading){//确保是当前图片和选中缩略图一致的时候
                                self.select(this.getEle());
                                return;
                            };
                        };


                        if(this.opts.wait){
                            if(timing!='select' && (timing=='loadEnd'  || (!self.isLoading && (self.img.complete || self.imgError)))){
                                this.go();
                            };
                        }else{
                            if(timing!='loadEnd'){
                                this.go();
                            };
                        };

                    },
                    getEle:function(){
                        return self.getThumSpan(this.opts.backward)
                    },
                    go:function(){
                        this.stop();//停止上次的。
                        var interval=this.opts.interval;
                        var _self=this;
                        this.timer=setTimeout(function(){
                            _self.setCountdown(0);
                            clearInterval(_self.countdownTimer);
                            self.select(_self.getEle());
                        },interval);

                        var startTime=Date.now();
                        this.countdownTimer=setInterval(function(){
                            _self.setCountdown(interval - (Date.now()-startTime));
                        },100);
                    },
                    stop:function(){
                        this.setCountdown(this.opts.interval);
                        clearTimeout(this.timer);
                        clearInterval(this.countdownTimer);
                    },
                    exit:function(){
                        this.opts.run=true;
                        this.switchStatus();
                        this.stop();
                    },
                    setCountdown:function(value){
                        eleMaps['head-command-slide-show-countdown'].textContent=(value/1000).toFixed(2);
                    },
                    switchStatus:function(){
                        this.opts.run=!this.opts.run;
                        eleMaps['head-command-slide-show-button-inner'].classList[this.opts.run? 'add' : 'remove']('pv-gallery-head-command-slide-show-button-inner_stop');
                    },
                    check:function(){
                        this.opts.run?  this.run('click') : this.stop();
                    },
                };

                slideShow.setCountdown(slideShow.opts.interval);;
                this.slideShow=slideShow;

                //幻灯片播放下拉列表change事件的处理
                eleMaps['head-command-drop-list-slide-show'].addEventListener('change',function(e){
                    var target=e.target;
                    var value;
                    var prefs=dataset(target,'prefs');
                    if(target.type=='checkbox'){
                        value=target.checked;
                    }else{
                        value=parseFloat(target.value);
                        if(isNaN(value)){//无效
                            value=slideShow.opts[prefs] / 1000;
                        };
                        value=value>0 ? value : 1;
                        target.value=value;
                        value *= 1000;
                    };
                    slideShow.opts[prefs]=value;
                    slideShow.run('change');
                },true);


                //分类下拉列表的点击发生change事件的处理
                eleMaps['head-command-drop-list-category'].addEventListener('change',function(e){
                    var target=e.target;
                    var type=dataset(target,'type');
                    self.iStatisCopy[type].shown=target.checked;
                    self.switchThumbVisible();//切换图片类别显隐;
                },true);

                var srcSplit,downloading=false;
                //命令下拉列表的点击处理
                eleMaps['head-command-drop-list-others'].addEventListener('click',function(e){
                    if(e.button!=0)return;//左键
                    var target=e.target;
                    var command=dataset(target,'command');
                    if(!command)return;
                    switch(command){
                        case 'openInNewWindow':{
                            _GM_openInTab(self.src, {active:true});
                            //window.open(self.src,'_blank');
                        }break;
                        case 'psImage':{
                            let editFunc=editSitesFunc[prefs.gallery.editSite];
                            if(!editFunc)editFunc=editSitesFunc[Object.keys(editSitesFunc)[0]];
                            if(editFunc)editFunc(self.src, true);
                        }break;
                        case 'scrollIntoView':{
                            if(collection.mMode){
                                self.showTips(i18n("inCollection"));
                                return;
                            };
                            var relatedThumb=self.relatedThumb;
                            var index=arrayFn.indexOf.call(self.imgSpans,relatedThumb);
                            var targetImg=self.data[index].img;

                            if(targetImg){
                                if(!document.documentElement.contains(targetImg) || unsafeWindow.getComputedStyle(targetImg).display=='none'){//图片不存在文档中，或者隐藏了。
                                    self.showTips(i18n("cantFind"));
                                    return;
                                };
                                self.minimize();
                                setTimeout(function(){
                                    self.navigateToImg(targetImg);
                                    flashEle(targetImg);
                                },0);

                            }else{//frame发送过来的时候删除了不能传送的图片

                                document.addEventListener('pv-navigateToImg',function(e){
                                    if(!e.detail){
                                        self.showTips(i18n("cantFind"));
                                        return;
                                    };
                                    self.minimize();
                                    setTimeout(function(){//将frame滚动到中间位置
                                        if(self.iframe){
                                            self.navigateToImg(self.iframe);
                                        };
                                    },0);
                                },true);
                                window.postMessage({//问问frame。。
                                    messageID:messageID,
                                    command:'navigateToImg',
                                    index:index,
                                    to:self.from,
                                },'*');
                            };

                        }break;
                        case 'exportImages':
                            self.exportImages();
                            break;
                        case 'downloadImage':
                            if(downloading)break;
                            downloading=true;
                            var nodes = document.querySelectorAll('.pv-gallery-sidebar-thumb-container[data-src]');
                            var saveParams = [],saveIndex=0;
                            [].forEach.call(nodes, function(node){
                                if(unsafeWindow.getComputedStyle(node).display!="none"){
                                    saveIndex++;
                                    if (node.dataset.src.indexOf('data') === 0) srcSplit = "";
                                    else {
                                        srcSplit=node.dataset.src || '';
                                    }
                                    var title = node.title.indexOf('\n') !== -1 ? node.title.split('\n')[0] : node.title;
                                    title = title.indexOf('http') === 0 || title.indexOf('data') === 0 ? '' : title;
                                    title = getRightSaveName(srcSplit, title, prefs.saveName);
                                    var picName = document.title + "-" + (saveIndex < 10 ? "00" + saveIndex : (saveIndex < 100 ? "0" + saveIndex : saveIndex)) + (title ? "-" + title : ""), hostArr = location.host.split(".");
                                    var host = hostArr[hostArr.length-2];
                                    saveParams.push([node.dataset.src, picName]);
                                    if (node.dataset.srcs) {
                                        node.dataset.srcs.split(",").forEach(src => {
                                            saveParams.push([src, picName]);
                                        });
                                    }
                                    //saveAs(node.dataset.src, location.host+"-"+srcSplit[srcSplit.length-1]);
                                }
                            });
                            self.batchDownload(saveParams, ()=>{
                                downloading=false;
                                self.showTips("Completed!", 1000);
                            });
                            break;
                        case 'copyImages':
                            self.copyImages(true);
                            break;
                        case 'scrollToEndAndReload':
                            var checkbox = target.parentNode.querySelector("input");
                            if(target.nodeName.toUpperCase()=="LABEL"){
                                checkbox.checked = !checkbox.checked;
                            }

                            prefs.gallery.scrollEndAndLoad = checkbox.checked;
                            break;
                        case 'fullScreen':
                            if (target.classList.contains('fullscreenbtn')) {
                                if (cancelFullScreen()) return;
                                target.textContent = i18n("enterFullsc");
                                target.classList.remove('fullscreenbtn');
                                return;
                            }

                            if (launchFullScreen(document.documentElement)) return;
                            target.classList.toggle('fullscreenbtn');
                            target.textContent = i18n("exitFullsc");
                            target.classList.add('fullscreenbtn');
                            break;
                        case 'openPrefs':
                            openPrefs();
                            break;
                        case 'viewmore':
                            self.maximizeSidebar();
                            break;
                        case 'addImageUrls':
                            var urls=window.prompt(i18n('addImageUrls')+": ',' to split multi-image, '[01-09]' to generate nine urls form 01 to 09","https://xxx.xxx/pic-[20-99].jpg, https://xxx.xxx/pic-[01-10].png");
                            if(!urls)return;
                            var imgs=[];
                            [].forEach.call(urls.split(","),function(i){
                                var varNum=/\[\d+\-\d+\]/.exec(i);
                                if(varNum){
                                    varNum=varNum[0].trim();
                                }else{
                                    imgs.push(i);
                                    return;
                                }
                                var num1=/\[(\d+)/.exec(varNum)[1].trim();
                                var num2=/(\d+)\]/.exec(varNum)[1].trim();
                                var num1Int=parseInt(num1);
                                var num2Int=parseInt(num2);
                                var numLen=num1.length;
                                var needAdd=num1.charAt(0)=="0";
                                if(num1Int>=num2Int)return;
                                for(var j=num1Int;j<=num2Int;j++){
                                    var urlIndex=j.toString();
                                    if(needAdd){
                                        while(urlIndex.length<numLen)urlIndex="0"+urlIndex;
                                    }
                                    var curUrl=i.replace(/\[\d+\-\d+\]/,urlIndex).trim();
                                    imgs.push(curUrl);
                                }
                            });
                            imgs.forEach(imgSrc => {
                                let img=document.createElement('img');
                                img.src=imgSrc;
                                var result = {
                                    src: img.src,
                                    type: 'force',
                                    imgSrc: img.src,

                                    noActual:true,
                                    description: '',

                                    img: img
                                };
                                self.data.push(result);
                                self._appendThumbSpans([result]);
                            });
                            self.loadThumb();
                            break;
                        case 'operate':
                            imgReady(self.src,{
                                ready:function(){
                                    new ImgWindowC(this);
                                },
                            });
                            break;
                        case 'urlFilter':
                            if(self.urlFilter){
                                self.urlFilter="";
                                target.style.color="";
                                target.title=i18n("urlFilterTip");
                                self.changeMinView();
                            }else{
                                let regStr=prompt(i18n("urlFilterTip"));
                                if(regStr){
                                    self.urlFilter=regStr;
                                    target.style.color="#e9cccc";
                                    target.title=regStr;
                                    self.changeMinView();
                                }
                            }
                            break;
                        case 'enterCollection':
                            //进入管理模式
                            collection.enter();
                            break;
                        case 'exitCollection':
                            //退出管理模式
                            collection.exit();
                            break;
                    };
                },true);

                // 监视全屏的变化
                function fullScreenChanged() {
                    if (!document.fullscreenElement && // alternative standard method
                        !document.mozFullScreenElement &&
                        !document.webkitFullscreenElement &&
                        !document.msFullscreenElement) {

                        var btn = document.getElementById("pv-gallery-fullscreenbtn");
                        if (btn) {
                            btn.textContent = i18n("enterFullsc");
                            btn.removeClass('fullscreenbtn');
                        }
                    }
                }
                document.addEventListener('webkitfullscreenchange', fullScreenChanged, false);
                document.addEventListener('mozfullscreenchange', fullScreenChanged, false);
                document.addEventListener('fullscreenchange', fullScreenChanged, false);

                //生成分享的下拉列表
                var shareMark='';
                var shareItem;
                for(let i in prefs.share){
                    if(!prefs.share.hasOwnProperty(i))continue;
                    shareItem=prefs.share[i];
                    if(shareItem.limitLang && shareItem.limitLang.indexOf(lang)==-1)continue;
                    if(shareItem.disabled)continue;
                    shareMark+=(
                        '<span class="pv-gallery-head-command-drop-list-item" data-site="'+i+'" style="\
                        background-image:url(\''+ shareItem.icon +'\');\
                        background-position:4px center;\
                        background-repeat:no-repeat;\
                        padding-left:24px;">'+shareItem.name+'</span>');
                };

                eleMaps['head-command-drop-list-share'].innerHTML=createHTML(shareMark);

                //分享下拉列表的点击处理
                eleMaps['head-command-drop-list-share'].addEventListener('click',function(e){
                    if(e.button!=0)return;//左键
                    var target=e.target;
                    var site=dataset(target,'site');
                    if(!site)return;
                    var site_info=prefs.share[site];
                    var param=site_info.api.call(self.img,{
                        title:encodeURIComponent(document.title),
                        pic:encodeURIComponent(self.src),
                        url:encodeURIComponent(location.href),
                    });
                    if(!param)return;
                    window.open(param.url,'_blank','height='+param.wSize.h+',width='+param.wSize.w+',left=30,top=30,location=no,status=no,toolbar=no,menubar=no,scrollbars=yes');
                },true);

                /*eleMaps['head'].addEventListener('click',function(e){
                    if(e.target.className.indexOf('pv-gallery-head-command')!=-1){
                        self.closeViewMore();
                    }
                });*/

                if(!prefs.gallery.searchData || defaultSearchData.indexOf(prefs.gallery.searchData)!=-1)prefs.gallery.searchData=defaultSearchData;
                var searchRules=prefs.gallery.searchData.split("\n"),searchUploadUrl,searchItems=[];
                var searchAll=eleMaps['head-command-drop-list-search'].querySelector("#headSearchAll");
                searchRules.forEach(rule=>{
                    if(!searchUploadUrl){
                        var uploadMatch=rule.match(/\s*{(.*)}\s*/);//todo: upload 2 search, need a Long-Term Servicing server for base64 to url like ainoob.com/api/uploadImage/
                        if(uploadMatch){
                            searchUploadUrl=uploadMatch[1];
                            return;
                        }
                    }
                    let ruleArr=rule.trim().split("|");
                    if(ruleArr.length==2){
                        var item=document.createElement('span');
                        item.className="pv-gallery-head-command-drop-list-item";
                        item.innerHTML=createHTML(ruleArr[0]);
                        item.addEventListener('click',function(e){
                            let url=encodeURIComponent(self.src);
                            let urlb=self.src.replace(/https?:\/\//i,"");
                            window.open(ruleArr[1].replace("#b#", urlb).replace("#t#", url), "_blank", "width=1024, height=768, toolbar=1");
                        });
                        searchItems.push(item);
                        eleMaps['head-command-drop-list-search'].insertBefore(item, searchAll);
                    }
                });
                searchAll.addEventListener('click',function(e){
                    searchItems.forEach(item=>{item.click()});
                });



                var loadThumbsTimer;
                eleMaps['sidebar-thumbnails-container'].addEventListener('scroll',function(e){//发生scroll事件时加载缩略图
                    clearTimeout(loadThumbsTimer);//加个延时，在连续触发的时候缓一缓。
                    loadThumbsTimer=setTimeout(function(){
                        self.loadThumb();
                    },200);
                },false);

                this.canScroll=true;
                var scrollToChange=function(next){
                    if(self.canScroll){
                        if(prefs.gallery.transition){
                            self.canScroll=false;
                            setTimeout(function(){
                                self.canScroll=true;
                            },200);
                        }
                        next ? self.selectNext() : self.selectPrevious();
                    }
                }
                addWheelEvent(eleMaps['body'],function(e){//wheel事件
                    if(e.deltaZ!=0)return;//z轴
                    if(eleMaps['sidebar-toggle'].style.visibility == 'hidden')return;
                    var target=e.target;
                    //e.preventDefault();
                    if(eleMaps['sidebar-container'].contains(target)){//缩略图区滚动滚轮翻图片
                        let distance=self.thumbSpanOuterSize;

                        if(e.deltaY<0 || e.deltaX<0){//向上滚
                            distance=-distance;
                        };
                        thumbScrollbar.scrollBy(distance)
                    }else{//图片区域滚动
                        let distance=100;
                        if(e.deltaY!=0){//y轴
                            if(self.img && self.img.classList.contains('pv-gallery-img_zoom-out')){//图片可以缩小时，滚动图片，否则切换图片。
                                if(e.deltaY < 0){
                                    distance=-distance;
                                };
                                if(eleMaps['img-scrollbar-h'].contains(target)){//如果在横向滚动条上。
                                    imgScrollbarH.scrollBy(distance);
                                }else{
                                    if(imgScrollbarV.scrollBy(distance) && prefs.gallery.scrollEndToChange){
                                        scrollToChange(e.deltaY > 0);
                                    }
                                };
                            }else{
                                scrollToChange(e.deltaY > 0);
                            };
                        }else{//x轴
                            if(e.deltaX < 0){
                                distance=-distance;
                            };
                            imgScrollbarH.scrollBy(distance);
                        }
                    }
                },true);


                //focus,blur;
                addCusMouseEvent('mouseenter',container,function(){
                    this.focus();
                });
                addCusMouseEvent('mouseleave',container,function(){
                    this.blur();
                });

                var lastX,lastY;
                const minLength=10000,tg=0.5;
                function tracer(e) {
                    let curX=e.changedTouches[0].clientX;
                    let curY=e.changedTouches[0].clientY;
                    let distanceX=curX-lastX,distanceY=curY-lastY;
                    let distance=distanceX*distanceX+distanceY*distanceY;
                    if (distance>minLength) {
                        lastX=curX;
                        lastY=curY;
                        let direction="";
                        let slope=Math.abs(distanceY/distanceX);
                        if(slope>tg){
                            if(distanceY>0) {
                                direction="↓";
                            }else{
                                direction="↑";
                            }
                        }else if(slope<=1/tg) {
                            if(distanceX>0) {
                                direction="→";
                            }else{
                                direction="←";
                            }
                        }
                        switch(direction){
                            case "←":
                                self.selectNext();
                                break;
                            case "→":
                                self.selectPrevious();
                                break;
                            case "↑":
                                if(self.eleMaps['sidebar-toggle'].style.visibility != 'hidden'){
                                    self.maximizeSidebar();
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
                self.eleMaps['img-content'].addEventListener('touchstart',function(e){
                    lastX=e.changedTouches[0].clientX;
                    lastY=e.changedTouches[0].clientY;
                    self.eleMaps['img-content'].addEventListener('touchmove',tracer);
                },{ passive: false, capture: false });
                self.eleMaps['img-content'].addEventListener('touchend',function(e){
                    self.eleMaps['img-content'].removeEventListener('touchmove',tracer);
                },{ passive: false, capture: false });

                //上下左右切换图片,空格键模拟滚动一页

                var validKeyCode=[38,39,40,37,32,9]//上右下左,32空格,tab禁止焦点切换。
                var keyDown;

                container.addEventListener('keydown',function(e){
                    if(prefs.gallery.disableArrow)return;
                    var keyCode=e.keyCode;
                    var index=validKeyCode.indexOf(keyCode);
                    if(index==-1)return;

                    var target=e.target;

                    if(!container.contains(target))return;//触发焦点不再gallery里面。
                    e.preventDefault();
                    e.stopPropagation();

                    if(keyCode==9)return;//tab键
                    if(keyCode==32){//32空格，模拟滚动一页
                        imgScrollbarV.scrollByPages(1);
                        return;
                    };

                    if(keyDown)return;//已按下。
                    keyDown=true;

                    var stop;
                    switch(index){
                        case 0:;
                        case 3:{
                            self.selectPrevious();
                            stop=self.simpleSlideShow(true);
                        }break;
                        case 1:;
                        case 2:{
                            self.selectNext();
                            stop=self.simpleSlideShow();
                        }break;
                    };

                    function keyUpHandler(e){
                        if(e.keyCode!=validKeyCode[index])return;
                        container.removeEventListener('keyup',keyUpHandler,false);
                        keyDown=false;
                        stop();
                    };
                    container.addEventListener('keyup',keyUpHandler,false);

                },true);


                var imgDraged;
                eleMaps['img-parent'].addEventListener('mousedown',function(e){//如果图片尺寸大于屏幕的时候按住图片进行拖移
                    var target=e.target;
                    if(e.button!=0 || target.nodeName.toUpperCase()!='IMG')return;
                    var bigger=target.classList.contains('pv-gallery-img_zoom-out') || self.scaleByScreen;//如果是大于屏幕

                    var oClient={
                        x:e.clientX,
                        y:e.clientY,
                    };

                    var oScroll={
                        left:self.imgScrollbarH.getScrolled(),
                        top:self.imgScrollbarV.getScrolled(),
                    };

                    var moveFiredCount=0;
                    var moveHandler=function(e){
                        moveFiredCount++;
                        if(moveFiredCount<2){//给个缓冲。。
                            return;
                        };
                        imgDraged=true;
                        if(bigger){
                            target.style.cursor= support.cssCursorValue.grabbing || 'pointer';
                            self.imgScrollbarV.scroll(oScroll.top-(e.clientY-oClient.y));
                            self.imgScrollbarH.scroll(oScroll.left-(e.clientX-oClient.x));
                        };
                    };

                    var upHandler=function(){
                        target.style.cursor='';

                        //拖曳之后阻止随后可能产生click事件产生的大小切换。
                        //确保在随后的click事件发生后执行
                        setTimeout(function(){
                            imgDraged=false;
                        },0);

                        document.removeEventListener('mousemove',moveHandler,true);
                        document.removeEventListener('mouseup',upHandler,true);
                    };

                    document.addEventListener('mousemove',moveHandler,true);
                    document.addEventListener('mouseup',upHandler,true);
                },true);

                eleMaps['img-parent'].addEventListener('click',function(e){//点击图片本身就行图片缩放处理
                    var target=e.target;
                    if(e.button!=0 || target.nodeName.toUpperCase()!='IMG')return;

                    if(imgDraged){//在拖动后触发的click事件，取消掉。免得一拖动完就立即进行的缩放。。。
                        imgDraged=false;
                        return;
                    };

                    if(target.classList.contains('pv-gallery-img_zoom-in')){//放大
                        self.fitContains=false;
                        var zoomX = typeof e.offsetX=='undefined' ? e.layerX : e.offsetX;
                        var zoomY = typeof e.offsetY=='undefined' ? e.layerY : e.offsetY;
                        var scaleX=zoomX/target.offsetWidth;
                        var scaleY=zoomY/target.offsetHeight;
                        self.fitToScreen({
                            x:scaleX,
                            y:scaleY,
                        });
                    }else if(target.classList.contains('pv-gallery-img_zoom-out')){
                        self.fitContains=true;
                        self.fitToScreen();
                    };
                },true);
                eleMaps['img-parent'].addEventListener('dblclick',function(e){
                    var target=e.target;
                    if(self.hideImg && self.hideImg.parentNode){
                        return;
                    }else{
                        self.hideImg=target;
                    }
                    if(e.button!=0 || target.nodeName.toUpperCase()!='IMG')return;

                    if(imgDraged){
                        imgDraged=false;
                        return;
                    };
                    target.style.display="none";
                    imgReady(self.src,{
                        ready:function(){
                            var fiddleWindow=new ImgWindowC(this);
                            fiddleWindow.imgWindow.addEventListener("pv-removeImgWindow", e=>{
                                if(self.hideImg && self.hideImg.parentNode){
                                    self.hideImg.style.display="";
                                    self.hideImg=null;
                                }
                            });
                        },
                    });
                },true);


                container.addEventListener('mousedown',function(e){//鼠标按在导航上，切换图片
                    if(e.button!=0)return;//左键
                    var target=e.target;
                    if(target.nodeName.toUpperCase()=='IMG')e.preventDefault();

                    var matched=true;
                    var stop;
                    switch(target){
                        case eleMaps['img-controler-pre']:;
                        case eleMaps['sidebar-controler-pre']:{//上一个
                            self.selectPrevious();
                            stop=self.simpleSlideShow(true);
                        }break;
                        case eleMaps['img-controler-next']:;
                        case eleMaps['sidebar-controler-next']:{//下一个
                            self.selectNext();
                            stop=self.simpleSlideShow();
                        }break;
                        default:{
                            matched=false;
                        }break;
                    };

                    function mouseUpHandler(e){
                        document.removeEventListener('mouseup',mouseUpHandler,true);
                        stop();
                    };

                    if(matched){
                        e.preventDefault();
                        document.addEventListener('mouseup',mouseUpHandler,true);
                    };
                },false);

                eleMaps['sidebar-thumbnails-container'].addEventListener('click',function(e){//点击缩略图切换
                    if(e.button!=0)return;//左键
                    var target=e.target;
                    var targetP;
                    if(!dataset(target,'src') && (targetP=target.parentNode) && !dataset(targetP,'src'))return;

                    self.select(targetP? targetP : target);
                },false);

                //点击读取错误的图片占位符重新读取
                eleMaps['img_broken'].addEventListener('click',function(e){
                    if(self.isLoading){
                        self.select(self.errorSpan);
                    }else{
                        self.getImg(self.errorSpan);
                    };
                },false);
                if(prefs.gallery.viewmoreLayout==1){
                    eleMaps['maximize-container'].classList.add("pv-gallery-flex-maximize");
                }

                if(prefs.gallery.viewmoreEndless){
                    addWheelEvent(eleMaps['maximize-container'],function(e){
                        if(!self.haveMorePage)return;
                        let scrollCon=self.eleMaps['maximize-container'].parentNode;
                        let scrollPercent=scrollCon.scrollTop / (scrollCon.scrollHeight - scrollCon.clientHeight);
                        if(scrollPercent>0.8){
                            var textSpan=self.eleMaps['head-command-nextPage'].querySelector("span");
                            if(textSpan.innerHTML==i18n("loading")){
                                return;
                            }
                            textSpan.innerHTML=createHTML(i18n("loading"));
                            self.completePages=[];
                            self.pageAllReady=false;
                            self.pageAction(true, true);
                        }
                    })
                }
                self.urlFilter="";

                eleMaps['head'].addEventListener('click',function(e){//顶栏上面的命令
                    if(e.button!=0)return;
                    var target=e.target;
                    if(eleMaps['head-command-close']==target){
                        self.close();
                    }else if(eleMaps['head-command-nextPage'].contains(target)){
                        var textSpan=eleMaps['head-command-nextPage'].querySelector("span");
                        if(textSpan.innerHTML==i18n("loading")){
                            textSpan.innerHTML=createHTML(i18n("loadAll"));
                            return;
                        }
                        textSpan.innerHTML=createHTML(i18n("loading"));
                        self.completePages=[];
                        self.pageAllReady=false;
                        self.pageAction(true);
                    }else if(eleMaps['head-command-collect'].contains(target)){
                        if(collection.favorite){
                            collection.remove();
                        }else{
                            collection.add();
                        };
                    }else if(eleMaps['head-command-exit-collection'].contains(target)){
                        collection.exit();
                    }else if(eleMaps['head-command-slide-show'].contains(target)){
                        slideShow.switchStatus();
                        slideShow.check();
                    };

                },false);


                //点击还原。
                maximizeTrigger.addEventListener('click',function(e){
                    var target=e.target;
                    this.style.display='none';
                    if(target==this){
                        self.show();
                        self.resizeHandler();
                    }else{
                        self.minimized=false;
                    };
                },true);


                this._resizeHandler=this.resizeHandler.bind(this);
                this._keyDownListener=this.keyDownListener.bind(this);
                this._keyUpListener=this.keyUpListener.bind(this);

                //插入动态生成的css数据。
                this.globalSSheet.insertRule('.pv-gallery-sidebar-thumb-container{'+
                                             ((isHorizontal ? 'width' : 'height') + ':'  + (isHorizontal ?  unsafeWindow.getComputedStyle(eleMaps['sidebar-thumbnails-container']).height : unsafeWindow.getComputedStyle(eleMaps['sidebar-thumbnails-container']).width)) +
                                             '}',this.globalSSheet.cssRules.length);

                this.forceRepaintTimes=0;

                container.style.display='none';
                this.shown=false;

                // 我添加的部分
                this.initToggleBar();
                this.initZoom();
            },
            rotateBigImg:function(){
                this.img.style[support.cssTransform] = 'rotate(' + (this.galleryRotate || 0) + 'deg)';
            },
            showTips:function(content, time){
                var tipsWords=this.eleMaps["tipsWords"];
                tipsWords.style.opacity=0.8;
                tipsWords.innerText=content;
                tipsWords.style.marginLeft=-tipsWords.offsetWidth/2+"px";
                clearTimeout(this.tipsTimeout);
                this.tipsTimeout=setTimeout(()=>{tipsWords.style.opacity=0},(time||1500));
            },
            showCompressProgress:function(meta){
                //console.debug(meta);
                this.showTips(parseInt(meta.percent)+"% Compress "+(meta.currentFile||""), 100000);
            },
            batchDownload:function(saveParams, callback){
                var self=this;
                if(prefs.gallery.downloadWithZip){
                    self.showTips(i18n("galleryDownloadWithZipAlert"), 100000);
                    var zip = new JSZip(),downloaded=0;
                    var fileName = document.title + ".zip";
                    var len = saveParams.length;
                    function downloadOne(imgSrc, imgName){
                        let crosHandler = imgSrc => {
                            urlToBlob(imgSrc, blob=>{
                                if (blob && blob.size>58) {
                                    zip.file(imgName.replace(/\//g, "").replace(/\.webp$/, ".png"), blob);
                                } else console.debug("error: "+imgSrc);
                                downloaded++;
                                self.showTips("Downloading "+downloaded+"/"+len, 100000);
                                if(downloaded == len){
                                    self.showTips("Begin compress to ZIP...", 100000);
                                    zip.generateAsync({type:"blob"}, meta=>{self.showCompressProgress(meta)}).then(function(content){
                                        saveAs(content, fileName);
                                        callback();
                                    })
                                }
                            });
                        }
                        if(/^data:/.test(imgSrc) || imgSrc.split("/")[2]==document.domain){
                            self.dataURLToCanvas(imgSrc, canvas=>{
                                self.showTips("Downloading "+(downloaded+1)+"/"+len, 100000);
                                if(!canvas){
                                    crosHandler(imgSrc);
                                    return;
                                }
                                canvas.toBlob(blob=>{
                                    zip.file(imgName.replace(/^data:.*/, "img").replace(/\//g,""), blob);
                                    downloaded++;
                                    if(downloaded == len){
                                        self.showTips("Begin compress to ZIP...", 100000);
                                        zip.generateAsync({type:"blob"}, meta=>{self.showCompressProgress(meta)}).then(function(content){
                                            saveAs(content, fileName);
                                            callback();
                                        })
                                    }
                                }, "image/png");
                            });
                        }else{
                            crosHandler(imgSrc);
                        }
                    }
                    if(prefs.gallery.downloadGap > 0){
                        let downIntv=setInterval(()=>{
                            let saveParam=saveParams.shift();
                            if(!saveParam)clearInterval(downIntv);
                            else downloadOne(saveParam[0], saveParam[1]);
                        },prefs.gallery.downloadGap);
                    }else{
                        for(let i=0; i<len; i++){
                            downloadOne(saveParams[i][0], saveParams[i][1]);
                        }
                    }
                    return;
                }

                let download5Times=function(){
                    for(let i=0;i<5;i++){
                        let saveParam=saveParams.shift();
                        if(saveParam){
                            downloadImg(saveParam[0], saveParam[1], prefs.saveName);
                        }else{
                            callback();
                            break;
                        }
                    }
                    if(saveParams.length>0){
                        setTimeout(()=>{
                            download5Times();
                        },1000);
                    }
                };
                download5Times();
            },
            changeMinView:function(){
                var urlReg=new RegExp(this.urlFilter);
                var sizeInputH=this.gallery.querySelector("#minsizeH");
                var sizeInputW=this.gallery.querySelector("#minsizeW");
                var sizeInputHSpan=this.gallery.querySelector("#minsizeHSpan");
                var sizeInputWSpan=this.gallery.querySelector("#minsizeWSpan");
                sizeInputH.title="min height: "+sizeInputH.value+"px";
                sizeInputHSpan.innerHTML=createHTML(Math.floor(sizeInputH.value)+"px");
                sizeInputW.title="min width: "+sizeInputW.value+"px";
                sizeInputWSpan.innerHTML=createHTML(Math.floor(sizeInputW.value)+"px");

                var self=this;
                var viewmoreShow = this.eleMaps['sidebar-toggle'].style.visibility == 'hidden';
                if(viewmoreShow){
                    var maxSizeH=0,minSizeH=0,maxSizeW=0,minSizeW=0;
                    [].forEach.call(document.querySelectorAll(".maximizeChild>img"),function(item){
                        var spanMark=self._spanMarkPool[item.src];
                        if(spanMark && !spanMark.dataset.naturalSize && item.naturalWidth && item.naturalHeight){
                            spanMark.dataset.naturalSize=JSON.stringify({w:item.naturalWidth,h:item.naturalHeight});
                        }
                        if(item.naturalWidth<sizeInputW.value || item.naturalHeight<sizeInputH.value || !urlReg.test(item.src) || (self.lockMaxSize && (item.naturalWidth>self.lockMaxSize.w || item.naturalHeight>self.lockMaxSize.h))){
                            item.parentNode.style.display="none";
                            if(spanMark)spanMark.style.display="none";
                        }else{
                            item.parentNode.style.display="";
                            if(spanMark)spanMark.style.display="";
                        }
                        if(item.naturalHeight>maxSizeH)
                            maxSizeH=item.naturalHeight;
                        if(item.naturalHeight<minSizeH || minSizeH==0)
                            minSizeH=item.naturalHeight;
                        if(item.naturalWidth>maxSizeW)
                            maxSizeW=item.naturalWidth;
                        if(item.naturalWidth<minSizeW || minSizeW==0)
                            minSizeW=item.naturalWidth;
                    });
                    sizeInputH.max=maxSizeH;
                    sizeInputH.min=minSizeH;
                    sizeInputH.title="min height: "+sizeInputH.value+"px";
                    sizeInputHSpan.innerHTML=createHTML(Math.floor(sizeInputH.value)+"px");

                    sizeInputW.max=maxSizeW;
                    sizeInputW.min=minSizeW;
                    sizeInputW.title="min width: "+sizeInputW.value+"px";
                    sizeInputWSpan.innerHTML=createHTML(Math.floor(sizeInputW.value)+"px");
                }else{
                    this.data.forEach(function(item) {
                        if(!item)return;
                        var spanMark=self._spanMarkPool[item.imgSrc];
                        if(spanMark){
                            var naturalSize=spanMark.dataset.naturalSize,itemW=item.sizeW,itemH=item.sizeH;
                            if(naturalSize){
                                naturalSize=JSON.parse(naturalSize);
                                itemW=naturalSize.w;
                                itemH=naturalSize.h;
                                if(itemW>sizeInputW.max)sizeInputW.max=itemW;
                                if(itemH>sizeInputH.max)sizeInputH.max=itemH;
                            }else if(!item.noActual){
                                //itemW=99999;
                                //itemH=99999;
                            }
                            if(itemW<sizeInputW.value || itemH<sizeInputH.value || !urlReg.test(item.src) || (self.lockMaxSize && (itemW>self.lockMaxSize.w || itemH>self.lockMaxSize.h))){
                                spanMark.style.display="none";
                            }else{
                                spanMark.style.display="";
                            }
                        }
                    });
                    this.switchThumbVisible();
                }
            },
            changeSizeInputReset:function(){
                var maxSizeH=0,minSizeH=0,maxSizeW=0,minSizeW=0;
                var sizeInputH=this.gallery.querySelector("#minsizeH");
                var sizeInputW=this.gallery.querySelector("#minsizeW");
                let self=this;
                this.data.forEach(function(item) {
                    if(!item)return;
                    var itemW=item.sizeW,itemH=item.sizeH;
                    var spanMark=self._spanMarkPool[item.imgSrc];
                    if(spanMark){
                        var naturalSize=spanMark.dataset.naturalSize;
                        if(naturalSize){
                            naturalSize=JSON.parse(naturalSize);
                            itemW=naturalSize.w;
                            itemH=naturalSize.h;
                        }
                    }
                    if(itemH>maxSizeH)
                        maxSizeH=itemH;
                    if(itemH<minSizeH || minSizeH==0)
                        minSizeH=itemH;
                    if(itemW>maxSizeW)
                        maxSizeW=itemW;
                    if(itemW<minSizeW || minSizeW==0)
                        minSizeW=itemW;
                });
                sizeInputH.max=maxSizeH;
                sizeInputH.min=minSizeH;
                sizeInputH.value=prefs.gallery.defaultSizeLimit.h;
                sizeInputH.title="min height: "+sizeInputH.value+"px";
                var sizeInputHSpan=this.gallery.querySelector("#minsizeHSpan");
                sizeInputHSpan.innerHTML=createHTML(Math.floor(sizeInputH.value)+"px");

                sizeInputW.max=maxSizeW;
                sizeInputW.min=minSizeW;
                sizeInputW.value=prefs.gallery.defaultSizeLimit.w;
                sizeInputW.title="min width: "+sizeInputW.value+"px";
                var sizeInputWSpan=this.gallery.querySelector("#minsizeWSpan");
                sizeInputWSpan.innerHTML=createHTML(Math.floor(sizeInputW.value)+"px");
            },
            initToggleBar: function() {  // 是否显示切换 sidebar 按钮
                /**
                * TODO：仿造下面的链接重新改造过？
                * http://image.baidu.com/detail/newindex?col=%E8%B5%84%E8%AE%AF&tag=%E4%BD%93%E8%82%B2&pn=0&pid=5123662821688142478&aid=&user_id=10086&setid=-1&sort=0&newsPn=4&star=&fr=hotword&from=1
                */
                if (prefs.gallery.sidebarToggle) {
                    var toggleBar = this.eleMaps['sidebar-toggle'];
                    toggleBar.style.display = 'flex';
                    toggleBar.style.height = '12px';
                    toggleBar.addEventListener('click', this.showHideBottom.bind(this), false);

                    var viewmoreBar = this.eleMaps['sidebar-viewmore'];
                    viewmoreBar.style.display = 'block';
                    viewmoreBar.addEventListener('click', this.maximizeSidebar.bind(this), false);

                    // 顶部圆角
                    switch (prefs.gallery.sidebarPosition) {
                        case 'bottom':
                            toggleBar.style.borderRadius = '8px 8px 0 0';  // 左上、右上、右下、左下
                            break;
                        case 'top':
                            toggleBar.style.borderRadius = '0 0 8px 8px';
                            break;
                        case 'left':
                            toggleBar.style.height = '60px';
                            toggleBar.style.borderRadius = '0 8px 8px 0';
                            break;
                        case 'right':
                            toggleBar.style.height = '60px';
                            toggleBar.style.borderRadius = '8px 0 0 8px';
                            break;
                    }
                }
            },
            closeViewMore: function() {
                var toggleBar = this.eleMaps['sidebar-toggle'],
                    toggleBarContent = this.eleMaps['sidebar-toggle-content'],
                    imgCon = this.eleMaps['img-container'],
                    viewmoreBar = this.eleMaps['sidebar-viewmore-content'],
                    imgPre = this.eleMaps['img-controler-pre'],
                    imgNext = this.eleMaps['img-controler-next'],
                    alreadyShow = toggleBar.style.visibility == 'hidden';
                if(!alreadyShow) return;
                var sidebarContainer = this.eleMaps['sidebar-container'];
                var maximizeContainer = this.eleMaps['maximize-container'];
                var sidebarPosition = prefs.gallery.sidebarPosition,
                    capitalize = function(string) { // 将字符串中每个单词首字母大写
                        var words = string.split(" ");
                        for (var i = 0; i < words.length; i++) {
                            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                        }
                        return words.join(" ");
                    };
                maximizeContainer.style.minHeight = 0;
                maximizeContainer.parentNode.style.visibility = "hidden";
                if(this.hideBodyStyle.parentNode)
                    this.hideBodyStyle.parentNode.removeChild(this.hideBodyStyle);
                imgPre.style.visibility = imgNext.style.visibility = toggleBar.style.visibility = sidebarContainer.style.visibility = 'visible';
                imgCon.style['border' + capitalize(sidebarPosition)] = prefs.gallery.sidebarSize + 'px solid transparent';
                toggleBar.style[sidebarPosition] = '-3px';
                while (maximizeContainer.firstChild) {
                    maximizeContainer.removeChild(maximizeContainer.firstChild);
                }
                viewmoreBar.innerHTML = createHTML('✚');
                viewmoreBar.parentNode.classList.remove("showmore");
                //viewmoreBar.parentNode.style.backgroundColor = "#000000";

                toggleBarContent.innerHTML = createHTML('▼');
                this.changeSizeInputReset();
            },
            selectViewmore: function(imgSpan, src) {
                if(this.curImgSpan)this.curImgSpan.classList.remove("selected");
                imgSpan.classList.add("selected");
                this.curImgSpan=imgSpan;
                var node = this._spanMarkPool[src];
                if(node)this.select(node);
            },
            addDlSpan: function(img, imgSpan, curNode, clickCb) {
                var maximizeContainer = this.eleMaps['maximize-container'];
                var dlSpan=document.createElement('p');
                dlSpan.className="pv-bottom-banner";
                dlSpan.innerHTML=createHTML('<svg class="icon" style="width: 20px;height: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1100"><path d="M768 768q0-14.857143-10.857143-25.714286t-25.714286-10.857143-25.714285 10.857143-10.857143 25.714286 10.857143 25.714286 25.714285 10.857143 25.714286-10.857143 10.857143-25.714286z m146.285714 0q0-14.857143-10.857143-25.714286t-25.714285-10.857143-25.714286 10.857143-10.857143 25.714286 10.857143 25.714286 25.714286 10.857143 25.714285-10.857143 10.857143-25.714286z m73.142857-128v182.857143q0 22.857143-16 38.857143t-38.857142 16H91.428571q-22.857143 0-38.857142-16t-16-38.857143v-182.857143q0-22.857143 16-38.857143t38.857142-16h265.714286l77.142857 77.714286q33.142857 32 77.714286 32t77.714286-32l77.714285-77.714286h265.142858q22.857143 0 38.857142 16t16 38.857143z m-185.714285-325.142857q9.714286 23.428571-8 40l-256 256q-10.285714 10.857143-25.714286 10.857143t-25.714286-10.857143L230.285714 354.857143q-17.714286-16.571429-8-40 9.714286-22.285714 33.714286-22.285714h146.285714V36.571429q0-14.857143 10.857143-25.714286t25.714286-10.857143h146.285714q14.857143 0 25.714286 10.857143t10.857143 25.714286v256h146.285714q24 0 33.714286 22.285714z" p-id="1101"></path></svg> '+i18n("download"));
                dlSpan.src=curNode.dataset.src;
                dlSpan.title=curNode.title||document.title;
                dlSpan.onclick=clickCb;
                var topP=document.createElement('p');
                topP.className="pv-top-banner";
                topP.innerHTML=createHTML(img.naturalWidth+' x '+img.naturalHeight);
                topP.title=img.src;
                var checkBox=document.createElement('input');
                checkBox.type="checkbox";
                checkBox.onclick=function(e){
                    let checkBoxs=maximizeContainer.querySelectorAll(".maximizeChild>input:checked");
                    if(!self.batchDl || self.batchDl.parentNode!=maximizeContainer){
                        self.batchDl=document.createElement('p');
                        let batchDlBtn=document.createElement('input');
                        let cancelBtn=document.createElement('input');
                        let invertBtn=document.createElement('input');
                        let compareBtn=document.createElement('input');
                        batchDlBtn.value=i18n("download");
                        cancelBtn.value=i18n("closeBtn");
                        invertBtn.value=i18n("invertBtn");
                        compareBtn.value=i18n("compareBtn");
                        batchDlBtn.type="button";
                        cancelBtn.type="button";
                        invertBtn.type="button";
                        compareBtn.type="button";
                        compareBtn.className = "compareBtn";
                        compareBtn.onclick=function(e){
                            checkBoxs=maximizeContainer.querySelectorAll(".maximizeChild>input:checked");
                            if(checkBoxs.length<2)return;
                            let imgSrcs=[];
                            [].forEach.call(checkBoxs, function(node){
                                let conItem=node.parentNode;
                                if(conItem.style.display=="none")return;
                                let imgSrc=conItem.querySelector("img").src;
                                imgSrcs.push(imgSrc);
                            });
                            if(imgSrcs.length<2)return;
                            let mainImg=document.createElement("img");
                            mainImg.src=imgSrcs.shift();
                            let mainImgWin=new ImgWindowC(mainImg);
                            mainImgWin.compare(imgSrcs);
                        };
                        batchDlBtn.onclick=function(e){
                            checkBoxs=maximizeContainer.querySelectorAll(".maximizeChild>input:checked");
                            if(checkBoxs.length<1)return;

                            var saveParams = [],saveIndex=0;
                            [].forEach.call(checkBoxs, function(node){
                                let conItem=node.parentNode;
                                if(conItem.style.display=="none")return;
                                saveIndex++;

                                let imgSrc=conItem.querySelector("img").src;
                                let title=node.nextElementSibling.title;
                                title = title.indexOf('\n') !== -1 ? title.split('\n')[0] : title;
                                title = title.indexOf('http') === 0 || title.indexOf('data') === 0 ? '' : title;
                                let srcSplit;
                                if (imgSrc.indexOf('data') === 0) srcSplit = "";
                                else {
                                    srcSplit=imgSrc || '';
                                }
                                title = getRightSaveName(srcSplit, title, prefs.saveName);
                                var picName = document.title + "-" + (saveIndex < 10 ? "00" + saveIndex : (saveIndex < 100 ? "0" + saveIndex : saveIndex)) + (!title || title == document.title ? "" : "-" + title);
                                saveParams.push([imgSrc, picName]);
                            });
                            self.batchDownload(saveParams, ()=>{
                                self.showTips("Completed!", 1000);
                            });
                        };
                        cancelBtn.onclick=function(e){
                            checkBoxs=maximizeContainer.querySelectorAll(".maximizeChild>input:checked");
                            if(checkBoxs.length<1)return;
                            [].forEach.call(checkBoxs, i=>{
                                i.checked=false;
                            });
                            maximizeContainer.removeChild(self.batchDl);
                            maximizeContainer.classList.remove("checked");
                        };
                        invertBtn.onclick=function(e){
                            checkBoxs=maximizeContainer.querySelectorAll(".maximizeChild>input");
                            if(checkBoxs.length<1)return;
                            [].forEach.call(checkBoxs, i=>{
                                let conItem=i.parentNode;
                                if(conItem.style.display=="none")i.checked=false;
                                else i.checked=!i.checked;
                            });
                            checkBoxs=maximizeContainer.querySelectorAll(".maximizeChild>input:checked");
                            if(checkBoxs.length==0){
                                maximizeContainer.removeChild(self.batchDl);
                                maximizeContainer.classList.remove("checked");
                            }
                        };
                        self.batchDl.appendChild(batchDlBtn);
                        self.batchDl.appendChild(cancelBtn);
                        self.batchDl.appendChild(invertBtn);
                        self.batchDl.appendChild(compareBtn);
                        maximizeContainer.appendChild(self.batchDl);
                    }
                    maximizeContainer.classList.remove("canCompare");
                    if(checkBoxs.length>0){
                        maximizeContainer.appendChild(self.batchDl);
                        maximizeContainer.classList.add("checked");
                        if (checkBoxs.length > 1) {
                            maximizeContainer.classList.add("canCompare");
                        }
                    }else{
                        maximizeContainer.removeChild(self.batchDl);
                        maximizeContainer.classList.remove("checked");
                    }
                    e.stopPropagation();
                };
                imgSpan.appendChild(topP);
                imgSpan.appendChild(checkBox);
                imgSpan.appendChild(dlSpan);
            },
            addViewmoreItem: function(nodes) {
                var alreadyShow = this.eleMaps['sidebar-toggle'].style.visibility == 'hidden';
                if(!alreadyShow)return;
                var self=this;
                var maximizeContainer = this.eleMaps['maximize-container'];
                [].forEach.call(nodes, function(node){
                    var nodeStyle = unsafeWindow.getComputedStyle(node);
                    let curNode = node;
                    let imgSpan = document.createElement('span');
                    if (nodeStyle.display == "none") imgSpan.style.display = "none";
                    let popupImgWin = (i) => {
                        let imgwin=new ImgWindowC(i);
                        self.selectViewmore(imgSpan, curNode.dataset.src);
                        if(prefs.imgWindow.overlayer.shown){
                            imgwin.blur(true);
                            self.curImgWin=imgwin;
                            self.curImgSpan=imgSpan;
                            if(!self.scrollInit){
                                self.scrollInit=true;
                                let wheelHandler=function(e){
                                    if(self.canScroll && self.curImgWin && !self.curImgWin.removed && !self.curImgWin.focused){
                                        self.canScroll=false;
                                        let targetImgSpan=self.curImgSpan;
                                        while(targetImgSpan){
                                            targetImgSpan=e.deltaY<0?targetImgSpan.previousElementSibling:targetImgSpan.nextElementSibling;
                                            if(targetImgSpan && targetImgSpan.style.display!="none" && targetImgSpan.clientWidth>1)break;
                                        }
                                        if(targetImgSpan){
                                            let imgNode=targetImgSpan.querySelector("img");
                                            self.curImgWin.remove();
                                            let curImgEle=document.createElement("img");
                                            curImgEle.src=imgNode.dataset.src||imgNode.src;
                                            let imgwin=new ImgWindowC(curImgEle);
                                            imgwin.blur(true);
                                            self.curImgWin=imgwin;
                                            self.selectViewmore(targetImgSpan, curImgEle.src);
                                            targetImgSpan.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                                            setTimeout(() => {targetImgSpan.scrollIntoView({block: "center", inline: "nearest"})}, 300);
                                            self.canScroll=true;
                                            /*imgReady(targetImgSpan.querySelector("img").src,{
                                                        ready:function(){
                                                            self.curImgWin.remove(true);
                                                            let imgwin=new ImgWindowC(this);
                                                            imgwin.blur(true);
                                                            self.curImgWin.imgWindow.style.opacity=0;
                                                            self.curImgWin=imgwin;
                                                            self.curImgSpan=targetImgSpan;
                                                            self.canScroll=true;
                                                        }
                                                    });*/
                                        }else{
                                            self.canScroll=true;
                                        }
                                    }
                                };
                                addWheelEvent(getBody(document),wheelHandler,true);
                            }
                        }
                    };
                    imgSpan.className = "maximizeChild";
                    imgSpan.innerHTML = createHTML('<img data-src="' + curNode.dataset.src + '" src="' + curNode.dataset.thumbSrc + '" />');
                    let img=imgSpan.querySelector("img");
                    imgSpan.addEventListener("click", function(e) {
                        imgReady(img.dataset.src, {
                            ready: function() {
                                popupImgWin(this);
                            },
                            error:function(e){
                                let i=document.createElement("img");
                                i.src=curNode.dataset.thumbSrc;
                                curNode.dataset.src=curNode.dataset.thumbSrc;
                                popupImgWin(i);
                            }
                        });
                    });
                    imgSpan.title=curNode.title;
                    let curSrc=curNode.dataset.src;
                    let defaultDl=()=>{
                        if(img.width>=88 && img.height>=88){
                            self.addDlSpan(img, imgSpan, curNode, e=>{
                                e.stopPropagation();
                                _GM_download(curNode.dataset.src, curNode.title, prefs.saveName);
                                return true;
                            });
                        }
                    };
                    if(curSrc.indexOf("data")===0){
                        defaultDl();
                    }else{
                        imgReady(img,{
                            ready:function(){
                                if(img.width>=88 && img.height>=88){
                                    self.addDlSpan(img, imgSpan, curNode, e=>{
                                        e.stopPropagation();
                                        downloadImg(curNode.dataset.src, curNode.title, prefs.saveName);
                                        return true;
                                    });
                                }
                            }
                        });
                    }
                    maximizeContainer.appendChild(imgSpan);
                });
            },
            maximizeSidebar: function() {
                var toggleBar = this.eleMaps['sidebar-toggle'],
                    imgCon = this.eleMaps['img-container'],
                    viewmoreBar = this.eleMaps['sidebar-viewmore-content'],
                    imgPre = this.eleMaps['img-controler-pre'],
                    imgNext = this.eleMaps['img-controler-next'],
                    alreadyShow = toggleBar.style.visibility == 'hidden';
                var sidebarContainer = this.eleMaps['sidebar-container'];
                var maximizeContainer = this.eleMaps['maximize-container'];
                var sidebarPosition = prefs.gallery.sidebarPosition,
                    capitalize = function(string) { // 将字符串中每个单词首字母大写
                        var words = string.split(" ");
                        for (var i = 0; i < words.length; i++) {
                            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                        }
                        return words.join(" ");
                    };
                if(alreadyShow){
                    this.closeViewMore();
                }else{
                    maximizeContainer.style.minHeight = "100%";
                    maximizeContainer.parentNode.style.visibility = "visible";
                    document.head.appendChild(this.hideBodyStyle);
                    imgPre.style.visibility = imgNext.style.visibility = toggleBar.style.visibility = sidebarContainer.style.visibility = 'hidden';
                    imgCon.style['border' + capitalize(sidebarPosition)] = '0';
                    toggleBar.style[sidebarPosition] = '0';
                    maximizeContainer.innerHTML = createHTML("");
                    viewmoreBar.innerHTML = createHTML('✖');
                    viewmoreBar.parentNode.classList.add("showmore");//.backgroundColor = "#2a2a2a";

                    var nodes = document.querySelectorAll('.pv-gallery-sidebar-thumb-container[data-src]');
                    this.addViewmoreItem(nodes);
                }
            },
            corsUrlToBlob:function (url, cb){
                if(!url)return cb(null);
                _GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    responseType:'arraybuffer',
                    timeout:20000,
                    headers: {
                        origin: location.origin,
                        referer: location.href,
                        accept: "*/*"
                    },
                    onload: function(d) {
                        cb(d.response);
                    },
                    onerror: function(){
                        cb(null);
                    },
                    ontimeout: function(){
                        cb(null);
                    }
                });
            },
            dataURLToCanvas:function (dataurl, cb){
                if(!dataurl)return cb(null);
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var img = new Image();
                img.setAttribute("crossOrigin","anonymous");
                img.onload = function(){
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    cb(canvas);
                };
                img.onerror = function(){
                    cb(null);
                };
                img.src = dataurl;
            },
            blobToDataURL:function(blob, cb){
                var a = new FileReader();
                a.readAsDataURL(blob);
                a.onload = function (e){
                    cb(e.target.result);
                };
                a.onerror = function (e){
                    cb(null);
                }
            },
            blobToCanvas: function (blob, cb){
                var self=this;
                this.blobToDataURL(blob, function (dataurl){
                    self.dataURLToCanvas(dataurl, cb);
                });
            },
            showHideBottom: function() {  // 显示隐藏 sidebar-container
                var sidebarContainer = this.eleMaps['sidebar-container'],
                    isHidden = sidebarContainer.style.visibility == 'hidden';

                sidebarContainer.style.visibility = isHidden ? 'visible' : 'hidden';

                var sidebarPosition = prefs.gallery.sidebarPosition,
                    capitalize = function(string) { // 将字符串中每个单词首字母大写
                        var words = string.split(" ");
                        for (var i = 0; i < words.length; i++) {
                            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                        }
                        return words.join(" ");
                    };

                // 修正下图片底部的高度
                this.eleMaps['img-container'].style['border' + capitalize(sidebarPosition)] = isHidden ?
                    prefs.gallery.sidebarSize + 'px solid transparent' :
                '0';
                // 修正底部距离
                this.eleMaps['sidebar-toggle'].style[sidebarPosition] = isHidden ? '-3px' : '0';
                if(isHidden){
                    this.gallery.classList.remove("pv-gallery-sidebar-toggle-hide");
                }else{
                    this.gallery.classList.add("pv-gallery-sidebar-toggle-hide");
                }
                this.eleMaps['sidebar-toggle-content'].innerHTML = createHTML(isHidden ? '▼' : '▲');
                this.eleMaps['sidebar-viewmore'].style.visibility = isHidden ? 'visible' : 'hidden';
            },
            initZoom: function() {  // 如果有放大，则把图片及 sidebar 部分缩放比率改为 1
                if (prefs.gallery.autoZoom && getBody(document).style.zoom != undefined) {
                    var oZoom = detectZoom();
                    if (oZoom > 100) {
                        this.eleMaps['body'].style.zoom = 100 / oZoom;
                    }
                }
            },

            getThumSpan:function(previous,relatedTarget){
                var ret;
                var rt = relatedTarget || this.selected;
                if(!rt)return;
                while((rt=previous ? rt.previousElementSibling : rt.nextElementSibling)){
                    if(rt.clientWidth!=0){
                        ret=rt;
                        break;
                    };
                };
                return ret;
            },
            previous:false,
            selectPrevious:function(){
                this.previous=true;
                this.select(this.getThumSpan(true));
            },
            selectNext:function(){
                this.select(this.getThumSpan());
            },
            select:function(ele,noTransition){
                if(!ele || this.selected==ele)return;
                if(this.selected){
                    this.selected.classList.remove(this.selectedClassName);
                    this.selected.classList.remove('pv-gallery-sidebar-thumb_selected');
                }
                ele.classList.add(this.selectedClassName);
                ele.classList.add('pv-gallery-sidebar-thumb_selected');

                this.selected=ele;
                this.arrowVisib();

                var self=this;
                clearTimeout(this.loadImgTimer);
                if(prefs.gallery.transition){
                    this.loadImgTimer=setTimeout(function(){//快速跳转的时候不要尝试读取图片。
                        self.loadImg(ele);
                    },200);
                }else{
                    self.loadImg(ele);
                }

                this.selectedIntoView(noTransition);
                this.forceRepaint();
                this.slideShow.run('select');
            },
            loadThumb:function(){//读取可视范围里面的缩略图
                if (!this.selected) return;
                var self=this;
                var pro=self.isHorizontal ? ['scrollLeft','clientWidth','offsetLeft','offsetWidth'] : ['scrollTop','clientHeight','offsetTop','offsetHeight'];
                var thumbC=self.eleMaps['sidebar-thumbnails-container'];

                var scrolled=thumbC[pro[0]];

                var loadStopDis=scrolled + thumbC[pro[1]];

                var imgSpans=self.selected.parentNode.children;
                var span_i;
                var spanOffset;
                var thumb;

                var i=0
                while(span_i=imgSpans[i++]){
                    if(span_i.clientWidth==0)continue;//隐藏的

                    spanOffset=span_i[pro[2]];
                    if(spanOffset + span_i[pro[3]] <= scrolled)continue;//在滚动条上面了
                    if(spanOffset >= loadStopDis)break;//在滚动条下面了

                    if(dataset(span_i,'thumbLoaded'))continue;//已经加载了缩略图

                    thumb=document.createElement('img');
                    thumb.src=dataset(span_i,'thumbSrc') || dataset(span_i,'src') || prefs.icons.brokenImg_small;
                    thumb.className='pv-gallery-sidebar-thumb';

                    dataset(span_i,'thumbLoaded','true');
                    span_i.appendChild(thumb);

                    imgReady(thumb,{
                        error:function(e){
                            this.src=prefs.icons.brokenImg_small;
                        },
                    });
                };
            },
            selectedIntoView:function(noTransition){
                var thumBC=this.eleMaps['sidebar-thumbnails-container'];
                var pro=this.isHorizontal ? ['offsetLeft','clientWidth','offsetWidth'] : ['offsetTop','clientHeight','offsetHeight'] ;
                //需要滚动的距离。
                var needScrollDis= this.selected[pro[0]];
                //尽可能的居中显示
                var thumBCClient=thumBC[pro[1]];
                var scrollCenter=Math.max((thumBCClient - this.selected[pro[2]])/2,0);

                let thumbScrollbar=this.thumbScrollbar;
                setTimeout(function() {
                    thumbScrollbar.scroll(needScrollDis - scrollCenter,false,!noTransition);
                }, 0);
            },
            getImg:function(ele){
                var self = this;

                var src = dataset(ele,'src');

                this.lastLoading=src;//记住最后读取的图片
                this.isLoading=true;//表示选择的图片正在读取

                // 特殊的 xhr 方式获取
                var xhr = dataset(ele, 'xhr');
                if (xhr) {
                    var xhrError = function() {
                        dataset(ele, 'xhr', '');
                        dataset(ele, 'src', dataset(ele, 'thumb-src'));
                        self.getImg(ele);
                    };
                    xhrLoad.load({
                        url: src,
                        xhr: JSON.parse(decodeURIComponent(xhr)),
                        cb: function(imgSrc, imgSrcs, caption) {
                            if (imgSrc) {
                                dataset(ele, 'src', imgSrc);
                                dataset(ele, 'xhr', '');
                                if (caption) dataset(ele, 'description', caption);
                                self.getImg(ele);
                            } else {
                                xhrError();
                            }
                        },
                        onerror: xhrError
                    });
                    return;
                }

                var allLoading=this.allLoading;
                if(allLoading.indexOf(src)!=-1){//在读取队列中。
                    return;
                };
                allLoading.push(src);

                //上一个读取中的图片，不是当前显示的。那么直接终止
                var preImgR=this.imgReady;
                if(preImgR && this.img){
                    if(preImgR.img.src!=this.src){
                        preImgR.abort();
                        preImgR.removeLI();
                    };
                };


                //显示读取指示器。
                var loadingIndicator=ele.querySelector('.pv-gallery-sidebar-thumb-loading');
                if (loadingIndicator && loadingIndicator.style) loadingIndicator.style.display='block';


                if (!src) return;
                this.imgReady=imgReady(src, {
                    ready:function(){
                        //从读取队列中删除自己
                        var index=allLoading.indexOf(src);
                        if(index!=-1){
                            allLoading.splice(index,1);
                        };

                        if(src!=self.lastLoading)return;

                        if (loadingIndicator && loadingIndicator.style) loadingIndicator.style.display='';
                        if(preImgR)preImgR.abort();
                        self.loadImg(this,ele);
                    },
                    loadEnd:function(e){//在loadend后开始预读。
                        //从读取队列中删除自己
                        var index=allLoading.indexOf(src);
                        if(index!=-1){
                            allLoading.splice(index,1);
                        };

                        if(src!=self.lastLoading)return;

                        if(e.type=='error'){
                            if (loadingIndicator && loadingIndicator.style) loadingIndicator.style.display='';
                            self.errorSpan=ele;
                            if(preImgR)preImgR.abort();
                            self.loadImg(this,ele,true);
                        };

                        self.slideShow.run('loadEnd');

                        if(prefs.gallery.preload){
                            if(self.preloading){//结束上次的预读。
                                self.preloading.abort();
                            };
                            self.preloading=new self.Preload(ele,self);
                            self.preloading.preload();
                        };
                    },
                });

                this.imgReady.removeLI=function(){
                    if (loadingIndicator && loadingIndicator.style) loadingIndicator.style.display='';
                };

            },
            loadImg:function(img,relatedThumb,error){
                if(img.nodeName.toUpperCase()!='IMG'){//先读取。
                    this.getImg(img);
                    return;
                };

                if(this.img){
                    this.img.parentNode.removeChild(this.img);
                };

                var imgNaturalSize={
                    h:img.naturalHeight,
                    w:img.naturalWidth,
                };
                this.imgNaturalSize=imgNaturalSize;

                this.eleMaps['head-left-img-info-resolution'].textContent=imgNaturalSize.w + ' x ' + imgNaturalSize.h;
                var thumbnails=this.eleMaps['sidebar-thumbnails-container'].childNodes,i=0;
                thumbnails=Array.prototype.slice.call(thumbnails).filter(function(thumbnail){
                    if(thumbnail.style.display=="none"){
                        return false;
                    }
                    return true;
                });
                while(thumbnails[i]!=relatedThumb && i<thumbnails.length)i++;
                if(i<thumbnails.length)this.eleMaps['head-left-img-info-count'].textContent="（"+(i+1)+" / "+thumbnails.length+"）";
                // 加上图片的注释
                var description = decodeURIComponent(dataset(relatedThumb, 'description')),
                    defaultLength = prefs.gallery.descriptionLength;
                this.eleMaps['head-left-img-info-description'].title = description;
                this.eleMaps['head-left-img-info-description'].textContent= description.length > defaultLength ?
                    description.slice(0, defaultLength) + '...' :
                description;

                this.img=img;
                //this.img.title=description;
                this.src=img.src;
                this.isLoading=false;

                this.relatedThumb=relatedThumb;
                img.className='pv-gallery-img';

                if(error){
                    let relatedImg=relatedThumb.querySelector("img");
                    if(!relatedImg)return;
                    if(relatedImg.src==this.img.src){
                        this.imgError=true;
                        this.img.style.display='none';
                        this.eleMaps['img_broken'].style.display='inline-block';
                    }else{
                        var srcs=dataset(relatedThumb, 'srcs');
                        if(srcs && srcs.length>0)srcs=srcs.split(",");
                        var self=this;
                        this.img.onload=function(){
                            var imgNaturalSize={
                                h:this.naturalHeight,
                                w:this.naturalWidth,
                            };

                            self.imgNaturalSize=imgNaturalSize;
                            self.fitToScreen();
                        }
                        if(srcs && srcs.length>0){
                            var src=srcs.shift();
                            dataset(relatedThumb, 'srcs',srcs.join(","));
                            if(src){
                                dataset(relatedThumb, 'src',src);
                                this.img.src=src;
                            }
                        }
                        else this.img.src=relatedImg.src;
                    }
                }else{
                    this.imgError=false;
                    this.eleMaps['img_broken'].style.display='';
                    if(!dataset(relatedThumb,'naturalSize')){
                        dataset(relatedThumb,'naturalSize',JSON.stringify(imgNaturalSize));
                    };
                };

                function styled(){
                    img.style.opacity=1;
                };


                if(prefs.gallery.transition){
                    setTimeout(styled,0);
                }else{
                    styled();
                };

                this.eleMaps['img-parent'].appendChild(img);

                this.fitContains=prefs.gallery.fitToScreen;//适应屏幕

                this.fitToScreen({
                    x:0,
                    y:0,
                });

                if(this.previous){
                    this.previous=false;
                    this.imgScrollbarV.scrollBy(999999);
                }
                this.collection.check();//检查是否在收藏里面。

            },
            fitToScreen:function(scale){
                this.rotateBigImg();
                var container=this.eleMaps['img-content'];
                var containerSize={
                    h:container.clientHeight,
                    w:container.clientWidth,
                };

                var img=this.img;

                if(!img || !img.classList)return;
                img.classList.remove('pv-gallery-img_zoom-in');
                img.classList.remove('pv-gallery-img_zoom-out');

                var imgSty=img.style;
                imgSty.width='';
                imgSty.height='';
                var imgPaSty=img.parentNode.style;
                imgPaSty.width='';
                imgPaSty.height='';

                let rotate90 = this.galleryRotate == 90 || this.galleryRotate == 270;
                let imgNaturalSize = rotate90 ? {w: this.imgNaturalSize.h, h: this.imgNaturalSize.w} : this.imgNaturalSize;
                var contentSSize={
                    h:container.scrollHeight,
                    w:container.scrollWidth,
                };
                var larger=contentSSize.h>containerSize.h || contentSSize.w>containerSize.w;
                if (rotate90 && larger) {
                    if (imgNaturalSize.h < containerSize.h && imgNaturalSize.w < containerSize.w) larger = false;
                }

                var scaled='100%';

                var noResize = false;
                if(this.fitContains && !(scale && scale.x==0 && scale.y==0 && imgNaturalSize.h/imgNaturalSize.w > 2.5)){//适应屏幕
                    this.scaleByScreen = false;
                    this.imgScrollbarV.hide();
                    this.imgScrollbarH.hide();
                    if(larger){
                        img.classList.add('pv-gallery-img_zoom-in');
                        if(contentSSize.h/contentSSize.w >= containerSize.h/containerSize.w){
                            let height=containerSize.h - 10;
                            if (rotate90) {
                                imgSty.width=height + 'px';
                                imgSty.setProperty('width', height+'px', 'important');
                            } else {
                                imgSty.height=height + 'px';
                                imgSty.setProperty('height', height+'px', 'important');
                            }
                            imgPaSty.height=height + 'px';
                            imgPaSty.setProperty('height', height+'px', 'important');
                            scaled=height/imgNaturalSize.h;
                        }else{
                            let width=containerSize.w - 10;
                            if (rotate90) {
                                imgSty.height=width + 'px';
                                imgSty.setProperty('height', width+'px', 'important');
                            } else {
                                imgSty.width=width + 'px';
                                imgSty.setProperty('width', width+'px', 'important');
                            }
                            imgSty.width=width + 'px';
                            imgSty.setProperty('width', width+'px', 'important');
                            scaled=width/imgNaturalSize.w;
                        };
                        scaled=(scaled*100).toFixed(2) + '%';
                    }else if(prefs.gallery.fitToScreenSmall){
                        if(imgNaturalSize.h/imgNaturalSize.w >= containerSize.h/containerSize.w){
                            let height=contentSSize.h-50;
                            height=height<0?contentSSize.h:height;
                            imgSty.height=height + 'px';
                            scaled=height/imgNaturalSize.h;
                        }else{
                            let width=contentSSize.w-50;
                            width=width<0?contentSSize.w:width;
                            imgSty.width=width + 'px';
                            scaled=width/imgNaturalSize.w;
                        };
                        scaled=(scaled*100).toFixed(2) + '%';
                    }
                }else{
                    noResize = true;
                }
                if (imgSty.width == '' && imgSty.height == "" && this.imgNaturalSize.h && this.imgNaturalSize.w) {
                    let imgW = this.imgNaturalSize.w + 'px';
                    let imgH = this.imgNaturalSize.h + 'px';
                    let imgPaW = imgNaturalSize.w + 'px';
                    let imgPaH = imgNaturalSize.h + 'px';
                    if (containerSize.h < imgNaturalSize.h && containerSize.w < imgNaturalSize.w) {
                        if (this.scaleByScreen) {
                            this.scaleByScreen = false;
                        } else {
                            this.scaleByScreen = true;
                            img.classList.add('pv-gallery-img_zoom-in');
                            if (imgNaturalSize.h / imgNaturalSize.w >= containerSize.h / containerSize.w) {
                                let fitWidth = containerSize.w - 10;
                                let fitHeight = imgNaturalSize.h / imgNaturalSize.w * fitWidth;
                                if (rotate90) {
                                    imgH = fitWidth + "px";
                                    imgW = fitHeight + "px";
                                    imgPaW = imgH;
                                    imgPaH = imgW;
                                } else {
                                    imgW = fitWidth + "px";
                                    imgH = fitHeight + "px";
                                    imgPaW = imgW;
                                    imgPaH = imgH;
                                }
                            } else {
                                let fitHeight = containerSize.h - 10;
                                let fitWidth = imgNaturalSize.w / imgNaturalSize.h * fitHeight;
                                if (rotate90) {
                                    imgW = fitHeight + "px";
                                    imgH = fitWidth + "px";
                                    imgPaW = imgH;
                                    imgPaH = imgW;
                                } else {
                                    imgH = fitHeight + "px";
                                    imgW = fitWidth + "px";
                                    imgPaW = imgW;
                                    imgPaH = imgH;
                                }
                            }
                        }
                    }
                    imgSty.width = imgW;
                    imgSty.height = imgH;
                    imgPaSty.width = imgPaW;
                    imgPaSty.height = imgPaH;
                }
                if (noResize) {
                    this.imgScrollbarV.reset();
                    this.imgScrollbarH.reset();

                    if(larger){
                        if (!this.scaleByScreen) {
                            img.classList.add('pv-gallery-img_zoom-out');
                        }
                        if(scale){//通过鼠标点击进行的切换。
                            this.imgScrollbarH.scroll(container.scrollWidth * scale.x - containerSize.w/2);
                            this.imgScrollbarV.scroll(container.scrollHeight * scale.y - containerSize.h/2);
                        };
                    };
                }

                var imgScaledInfo=this.eleMaps['head-left-img-info-scaling'];
                imgScaledInfo.textContent='（'+scaled+'）';
                if(scaled!='100%'){
                    imgScaledInfo.style.color='#E9CCCC';
                }else{
                    imgScaledInfo.style.color='';
                }

            },

            _dataCache: {},
            _spanMarkPool: {},
            _appendThumbSpans: function(data, index) { // 添加缩略图栏的 spans
                var iStatisCopy = this.iStatisCopy;

                if (typeof index == 'undefined' && this.selected) {
                    index = Array.prototype.slice.call(this.imgSpans).indexOf(this.selected);
                }

                var sizeInputH=this.gallery.querySelector("#minsizeH");
                var sizeInputW=this.gallery.querySelector("#minsizeW");
                var thumbnails=this.eleMaps['sidebar-thumbnails-container'];
                var selectData, selectSpan;
                // 如果是新的，则添加，否则重置并添加。
                if (!data){
                    selectData=this.data[index];
                    if(selectData){
                        let spanMark=this._spanMarkPool[selectData.imgSrc];
                        if(spanMark && spanMark.dataset.naturalSize){
                            let naturalSize=JSON.parse(spanMark.dataset.naturalSize);
                            selectData.sizeW=naturalSize.w;
                            selectData.sizeH=naturalSize.h;
                        }
                        if(selectData.sizeW<sizeInputW.value){
                            var sizeInputWSpan=this.gallery.querySelector("#minsizeWSpan");
                            sizeInputW.value=selectData.sizeW;
                            sizeInputW.title="min width: "+sizeInputW.value+"px";
                            sizeInputWSpan.innerHTML=createHTML(Math.floor(sizeInputW.value)+"px");
                        }
                        if(selectData.sizeH<sizeInputH.value){
                            var sizeInputHSpan=this.gallery.querySelector("#minsizeHSpan");
                            sizeInputH.value=selectData.sizeH;
                            sizeInputH.title="min height: "+sizeInputH.value+"px";
                            sizeInputHSpan.innerHTML=createHTML(Math.floor(sizeInputH.value)+"px");
                        }
                    }
                    thumbnails.innerHTML = createHTML("");
                    this._dataCache = {};
                    this.eleMaps['maximize-container'].innerHTML = createHTML("");
                }
                var createSpanMark = item => {
                    var spanMark=self._spanMarkPool[item.imgSrc];
                    if(!spanMark){
                        spanMark = document.createElement("span");
                        try{
                            spanMark.className="pv-gallery-sidebar-thumb-container";
                            spanMark.dataset.type=item.type;
                            spanMark.dataset.src=item.src;
                            spanMark.dataset.srcs=item.srcs?item.srcs.join(","):"";
                            if(item.xhr)spanMark.dataset.xhr=encodeURIComponent(JSON.stringify(item.xhr));
                            spanMark.dataset.description=encodeURIComponent(item.description || (item.img ? (item.img.title || item.img.alt) : ""));
                            spanMark.dataset.thumbSrc=item.imgSrc;
                            let title = item.img ? (item.img.title || item.img.alt || "").slice(-50) : "";
                            if (title) {
                                if (title.indexOf('http') === 0 || title.indexOf('data') === 0) title = '';
                                else title += '\n';
                            }
                            spanMark.title = title + item.src.slice(0, 200);
                            spanMark.innerHTML=createHTML('<span class="pv-gallery-vertical-align-helper"></span>' +
                                '<span class="pv-gallery-sidebar-thumb-loading" title="'+i18n("loading")+'......"></span>');
                        }catch(e){};
                        self._spanMarkPool[item.imgSrc] = spanMark;
                    }
                    if(spanMark.dataset.naturalSize){
                        let naturalSize=JSON.parse(spanMark.dataset.naturalSize);
                        item.sizeW=naturalSize.w;
                        item.sizeH=naturalSize.h;
                    }
                    if(item.sizeW && item.sizeH && (item.sizeW<sizeInputW.value || item.sizeH<sizeInputH.value)){
                        spanMark.style.display="none";
                    }else{
                        spanMark.style.display="";
                    }
                    thumbnails.appendChild(spanMark);
                    self.addViewmoreItem([spanMark]);
                    if (!selectSpan && selectData && item.imgSrc == selectData.imgSrc) {
                        selectSpan = spanMark;
                        self.select(selectSpan, true);
                    }
                };
                var self=this;
                (data || this.data).forEach(function(item) {
                    if(!item || !item.type)return;
                    iStatisCopy[item.type].count++;
                    if(item.xhr){
                        xhrLoad.load({
                            url: item.src,
                            xhr: item.xhr,
                            cb: function(imgSrc, imgSrcs, caption) {
                                if (imgSrc) {
                                    let result = findPic(item.img);
                                    result.xhr = false;
                                    result.src = imgSrc;
                                    if (caption) result.description = caption;
                                    createSpanMark(result);
                                    if (imgSrcs && imgSrcs.length) {
                                        imgSrcs.forEach(src => {
                                            let img = document.createElement('img');
                                            img.src = src;
                                            let result = findPic(img);
                                            result.xhr = false;
                                            if (caption) result.description = caption;
                                            createSpanMark(result);
                                        })
                                    }
                                    self.thumbScrollbar.reset();
                                    self.loadThumb();
                                }
                            }
                        });
                    } else {
                        createSpanMark(item);
                    }
                });

                (data || this.data).forEach(function(d) {
                    if(!d)return;
                    self._dataCache[d.imgSrc] = true;
                });

                //写入类别数据。
                var gallery = this.gallery;
                var input, label, iStatisCopy_i;

                for (var i in iStatisCopy) {
                    if (!iStatisCopy.hasOwnProperty(i)) continue;
                    iStatisCopy_i = iStatisCopy[i];
                    input = gallery.querySelector('#pv-gallery-head-command-drop-list-item-category-' + i);
                    input.checked = iStatisCopy_i.shown;
                    if (iStatisCopy_i.count == 0) {
                        input.disabled = true;
                        input.parentNode.classList.add('pv-gallery-head-command-drop-list-item_disabled');
                    } else {
                        input.disabled = false;
                        input.parentNode.classList.remove('pv-gallery-head-command-drop-list-item_disabled');
                    };

                    label = gallery.querySelector('label[for="pv-gallery-head-command-drop-list-item-category-' + i + '"]');
                    label.textContent = label.textContent.replace(/（.*）/i, '') + '（' + iStatisCopy_i.count + '）';
                };

                this.imgSpans = thumbnails.children;

                this.thumbScrollbar.reset();

                if(!data && (!selectSpan || (selectSpan.style.display=="none" && !selectData))){
                    for(var j in this.imgSpans){
                        if (!this.imgSpans.hasOwnProperty(j)) continue;
                        var curSpan=this.imgSpans[j];
                        if(curSpan.style.display!="none"){
                            this.select(curSpan, true);
                            return;
                        }
                    }
                }
                this.select(selectSpan, true);
            },
            load:function(data, from, reload){
                if(this.shown || this.minimized){//只允许打开一个,请先关掉当前已经打开的库

                    if(from){//frame发送过来的数据。
                        window.postMessage({
                            messageID:messageID,
                            command:'sendFail',
                            to:from,
                        },'*');
                    };

                    if(this.minimized){
                        _GM_notification(i18n('closeFirst'));
                        flashEle(this.maximizeTrigger);
                    };
                    return;
                };

                var self=this;
                if(from){//来自frame，获取这个frame所在的iframe标签。定位到图片的时候要用到。
                    window.postMessage({
                        messageID:messageID,
                        command:'getIframeObject',
                        windowId:from,
                    },'*');
                    document.addEventListener('pv-getIframeObject',function(e){
                        self.iframe=e.detail;
                    },true);
                };

                var unique=this.unique(data);
                data=unique.data;
                var index=unique.index;

                if (reload && this.data.length >= data.length) {
                    // alert('没有新增的图片');
                    return;
                }

                this.clear();//还原对象的一些修改，以便复用。
                this.data=data;
                this.show(reload);

                this.from=from;//如果来自frame，那么这个from应该保存了那个frame的窗口id，便于以后通信。

                this._appendThumbSpans(null, index);

                this.runOnce();

                this.switchThumbVisible();

                var pageObj = this.getPage(),textSpan = this.eleMaps['head-command-nextPage'].querySelector("span");
                this.haveMorePage = !!pageObj.pre || !!pageObj.next;
                textSpan.style.color=this.haveMorePage?"#e9cccc":"";
            },
            haveMorePage:false,
            clear:function(){
                this._dataCache = {};

                this.allLoading=[];//读取中的图片数组
                this.iStatisCopy=cloneObject(this.imgStatistics,true);//图片统计副本
                if(this.selected){
                    this.selected.classList.remove(this.selectedClassName);
                    this.selected.classList.remove('pv-gallery-sidebar-thumb_selected');
                }
                this.selected=null;
                if(this.img){
                    this.img.style.display='none';
                    this.img=null;
                };
                //读取错误的图片占位符
                this.eleMaps['img_broken'].style.display='';
                //清空dom
                this.eleMaps['sidebar-thumbnails-container'].innerHTML=createHTML('');
                this.eleMaps['head-left-img-info-resolution'].textContent='0 x 0';
                this.eleMaps['head-left-img-info-count'].textContent='（1 / 1）';
                this.eleMaps['head-left-img-info-scaling'].textContent='（100%）';
                //隐藏滚动条
                this.imgScrollbarV.hide();
                this.imgScrollbarH.hide();
                this.thumbScrollbar.hide();
                //重置style;
                this.thumbVisibleStyle.textContent='';
            },

            unique:function(data){
                var imgSrc;
                if(data.target){
                    imgSrc=(data.target.img && data.target.img.src) || data.target.src;
                }

                var data_i,
                    data_i_src,
                    dataSrcs=[];

                var index;

                for(var i=0,ii=data.length;i<ii;i++){
                    data_i=data[i];
                    data_i_src=data_i.src;
                    if(dataSrcs.indexOf(data_i_src)!=-1){//已经存在
                        data.splice(i,1);//移除
                        i--;
                        ii--;
                        continue;
                    }
                    dataSrcs.push(data_i_src);

                    if(imgSrc==data_i_src || imgSrc==data_i.imgSrc){
                        index=i;
                    }
                };

                if(typeof index =='undefined'){
                    index=0;
                    data.unshift(data.target);
                }

                delete data.target;

                return {
                    data:data,
                    index:index,
                };
            },
            keyDownListener:function(e){
                switch(e.keyCode){
                    case 27:
                        if(prefs.imgWindow.close.escKey){
                            this.close();
                        }
                        break;
                }
            },
            keyUpListener:function(e){
                const key = e.key || String.fromCharCode(e.keyCode);
                if (e.target != this.gallery) return;
                switch(key.toLowerCase()){
                    case 'r':
                        var img=this.img;
                        var cssTransform=img.style[support.cssTransform];
                        var iTransform=cssTransform.replace(/rotate\([^)]*\)/i,'');
                        var rotatedRadians=cssTransform.indexOf("rotate")!=-1?cssTransform.replace(/.*rotate\(([-\d\.]+).*/i,'$1'):0;
                        var PI=Math.PI;
                        var origin=parseFloat(rotatedRadians) +(e.shiftKey?-90:90) * PI/180;
                        if(origin>=2*PI || origin<=-2*PI ||(-0.1<origin && origin<0.1)){
                            origin=0;
                        }
                        img.style[support.cssTransform] = ' rotate('+ origin +'rad) ' + iTransform;
                        break;
                    case prefs.floatBar.keys.download:
                        downloadImg(this.img.src, this.selected.title, prefs.saveName);
                        break;
                }
            },
            show:function(reload){
                this.shown=true;
                galleryMode=true;

                if (!reload) {
                    var des=document.documentElement.style;
                    this.deOverflow={
                        x:des.overflowX,
                        y:des.overflowY,
                    };
                    des.overflow='hidden';
                    this.gallery.style.display='';
                    this.gallery.focus();
                    window.addEventListener('resize',this._resizeHandler,true);
                }
                document.addEventListener('keydown',this._keyDownListener,true);
                document.addEventListener('keyup',this._keyUpListener,true);

                if(prefs.gallery.loadMore){
                    this.eleMaps['head-command-nextPage'].click();
                }

                this.changeSizeInputReset();

                var self=this;
                if(prefs.gallery.autoOpenViewmore){
                    setTimeout(function(){
                        self.maximizeSidebar();
                    },1);
                }
            },
            close:function(reload){
                if(this.hideBodyStyle.parentNode)
                    this.hideBodyStyle.parentNode.removeChild(this.hideBodyStyle);
                document.removeEventListener('keydown',this._keyDownListener,true);
                document.removeEventListener('keyup',this._keyUpListener,true);
                this.shown=false;
                this.minimized=false;

                if (!reload) {
                    galleryMode=false;
                    this.gallery.blur();
                    this.gallery.style.display='none';
                    var des=document.documentElement.style;
                    if(this.deOverflow){
                        des.overflowX=this.deOverflow.x;
                        des.overflowY=this.deOverflow.y;
                    }
                    this.slideShow.exit();
                    this.collection.exit();
                    window.removeEventListener('resize',this._resizeHandler,true);

                    // 退出全屏
                    var btn = document.getElementById('pv-gallery-fullscreenbtn');
                    if (btn.classList.contains('fullscreenbtn')) {
                        cancelFullScreen();
                        btn.textContent = i18n("enterFullsc");
                        btn.classList.remove('fullscreenbtn');
                    }
                }
            },
            curPage:document,
            getPage:function(){
                let pageNum=0,preStr="",afterStr="";
                let pageMatch1=this.href.match(/(.*[a-zA-Z0-9\/][\-_](?:p|page)?)(\d+)(\.html?$|\/?$)/i);
                let pageMatch2=this.href.match(/(.*[\?&]p(?:age)?=)(\d+)($|[#&\/].*)/i);
                if(pageMatch1){
                    preStr=pageMatch1[1];
                    pageNum=pageMatch1[2];
                    afterStr=pageMatch1[3];
                }else if(pageMatch2){
                    preStr=pageMatch2[1];
                    pageNum=pageMatch2[2];
                    afterStr=pageMatch2[3];
                }else{
                    this.href=this.href.replace(/\/$/,"");
                }
                var curPage=this.curPage;
                let pre=curPage.querySelector("a.prev")||
                    curPage.querySelector("a#prev")||
                    curPage.querySelector("a#leftFix")||
                    curPage.querySelector("a.prev_page")||
                    curPage.querySelector(".prev>a");
                let next=curPage.querySelector("a.next")||
                    curPage.querySelector("a#next")||
                    curPage.querySelector("a#rightFix")||
                    curPage.querySelector("a.next_page")||
                    curPage.querySelector(".next>a");
                if(!pre && !next){
                    let pageDiv=curPage.querySelector("div.wp-pagenavi");
                    if(pageDiv){
                        let cur=pageDiv.querySelector("span.current");
                        pre=cur.previousSibling;
                        next=cur.nextSibling;
                    }else{
                        let cur=curPage.querySelector("div.article-paging>span");
                        if(cur){
                            pre=cur.previousElementSibling;
                            next=cur.nextElementSibling;
                        }
                    }
                }
                if(pre && (!pre.href || /javascript:/.test(pre.href.trim())))pre=null;
                if(next && (!next.href || /javascript:/.test(next.href.trim())))next=null;
                if(!pre || !next){
                    let aTags=curPage.querySelectorAll("a");
                    if(!pre){
                        let pref,pres,pret;
                        for(let i=0;i<aTags.length;i++){
                            let aTag=aTags[i];
                            if(!aTag.href || /javascript:/.test(aTag.href.trim()))continue;
                            if(pref && pres && pret)break;
                            if(!pref){
                                if(/(\s|^)上[一1]?[页頁张張话話章]|^previous( page)?\s*$|前のページ/i.test(aTag.innerHTML)){
                                    pref=aTag;
                                }
                            }
                            if(!pres){
                                if(aTag.innerHTML=="&lt;"){
                                    pres=aTag;
                                }
                            }
                            if(!pret){
                                if(aTag.innerHTML=="«"){
                                    pret=aTag;
                                }else if(pageNum==1){
                                    if(aTag.href.indexOf(this.href.replace(/.*\/([^\/]+)$/,"$1").replace(/[_-]\d+/,""))!=-1){
                                       pret=aTag;
                                    }
                                }else if(aTag.href.replace(preStr,"").replace(afterStr,"")==pageNum-1){
                                    pret=aTag;
                                }
                            }
                        }
                        pre=pref||pres||pret;
                    }
                    if(!next){
                        let nextf,nexts,nextt;
                        for(let i=0;i<aTags.length;i++){
                            let aTag=aTags[i];
                            if(!aTag.href || /^\s*javascript:/.test(aTag.href.trim()))continue;
                            if(nextf && nexts && nextt)break;
                            if(!nextf){
                                if(/(\s|^)下[一1]?[页頁张張话話章]|^next( page)?\s*$|次のページ/i.test(aTag.innerHTML)){
                                    nextf=aTag;
                                }
                            }
                            if(!nexts){
                                if(aTag.innerHTML=="&gt;"){
                                    nexts=aTag;
                                }
                            }
                            if(!nextt){
                                if(aTag.innerHTML=="»"){
                                    nextt=aTag;
                                }else if(aTag.href.replace(preStr,"").replace(afterStr,"")==parseInt(pageNum)+1){
                                    nextt=aTag;
                                }else if(aTag.href.indexOf(this.href)!=-1 && /^[\/\?&]?[_-]?(p|page)?=?[12]\/?(\?|&|$)/i.test(aTag.href.replace(this.href,""))){
                                    nextt=aTag;
                                }else{
                                    let prevEle = aTag.previousElementSibling;
                                    if (prevEle && (prevEle.nodeName == 'B' || prevEle.nodeName == 'SPAN')) {
                                        if (/^\d+$/.test(aTag.innerText) && parseInt(aTag.innerText) == parseInt(prevEle.innerText) + 1) {
                                            nextt = aTag;
                                        }
                                    }
                                }
                            }
                        }
                        next=nextf||nexts||nextt;
                    }
                }
                if(!pre)pre=curPage.querySelector('[rel="prev"],[rel="previous"]');
                if(!next)next=curPage.querySelector('[rel="next"]');
                return {pre:pre,next:next};
            },
            canonicalUri:function(src){
                if (src.charAt(0) == "#") return location.href + src;
                if (src.charAt(0) == "?") return location.href.replace(/^([^\?#]+).*/, "$1" + src);
                var root_page = /^[^?#]*\//.exec(location.href)[0],
                    base_path = location.pathname.replace(/\/[^\/]+\.[^\/]+$/, "/"),
                    root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
                    absolute_regex = /^\w+\:\/\//;
                src=src.replace("./", "");
                if (/^\/\/\/?/.test(src)){
                    src = location.protocol + src;
                }
                else if (!absolute_regex.test(src) && src.charAt(0) != "/"){
                    src = (base_path || "") + src;
                }
                return (absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src));
            },
            completePages:[location.href],
            href:location.href,
            pageAllReady:false,
            loadingImgNum:0,
            loadingImgs:[],
            pageImgReady:function(){
                var textSpan=this.eleMaps['head-command-nextPage'].querySelector("span");
                clearTimeout(this.readyTimeout);
                this.readyTimeout = setTimeout(() => {
                    if(this.pageAllReady && this.loadingImgNum<=0){
                        textSpan.innerHTML=createHTML("<font color='red'>"+i18n("loadedAll")+"</font>");
                        setTimeout(function(){textSpan.innerHTML=createHTML(i18n("loadAll"));},1500);
                    }
                }, 1100);
            },
            pageAction:function(next, single){
                var pageObj=this.getPage(),self=this,textSpan=this.eleMaps['head-command-nextPage'].querySelector("span");
                if(textSpan.innerHTML!=i18n("loading")){
                    return;
                }
                var loadOver=function(){
                    if(!next || !prefs.gallery.loadAll || single){
                        self.pageAllReady=true;
                        self.pageImgReady();
                    }else{
                        self.curPage=document;
                        self.href=location.href;
                        self.pageAction(false);
                    }
                };
                if((next && !pageObj.next) || (!next && !pageObj.pre)){
                    loadOver();
                    return;
                }
                var targetUrl=next?pageObj.next:pageObj.pre;
                if(targetUrl.nodeName!="A"){
                    var childA=targetUrl.querySelector("a");
                    if(childA){
                        targetUrl=childA;
                    }else{
                        while(targetUrl=targetUrl.parentElement){
                            if(targetUrl.nodeName.toUpperCase()=='A'){
                                break;
                            }
                        }
                        if(!targetUrl)return;
                    }
                }
                var href=targetUrl.getAttribute("href");
                if(self.completePages.indexOf(href)!=-1){
                    loadOver();
                    return;
                }else{
                    self.completePages.push(href);
                }
                self.href=self.canonicalUri(href);
                _GM_xmlhttpRequest({
                    method: 'GET',
                    url: self.href,
                    headers:{"Referer": + window.location.href},
                    overrideMimeType:"text/html;charset="+document.charset,
                    onload: function(d) {
                        let html=document.implementation.createHTMLDocument('');
                        html.documentElement.innerHTML = d.responseText;
                        self.curPage=html;
                        let imgs=html.querySelectorAll('img');
                        var container = document.querySelector('.pv-gallery-container'),
                            preloadContainer = document.querySelector('.pv-gallery-preloaded-img-container');
                        imgs = Array.prototype.slice.call(imgs).filter(function(img){
                            if(container.contains(img) || (preloadContainer&&preloadContainer.contains(img))){
                                return false;
                            }
                            pretreatment(img);
                            if(!img.src || (img.getAttribute && !img.getAttribute("src")))return false;
                            var isrc=img.src.trim();
                            if(!isrc)return false;
                            var result = findPic(img);
                            if (result && result.src) {
                                if (self._dataCache[result.src]){
                                    return false;
                                }
                                self._dataCache[result.src] = true;
                                return true;
                            }
                            return false;
                        });
                        function loadImg(img){
                            var result = findPic(img);
                            self.loadingImgNum++;
                            if (result.xhr) {
                                xhrLoad.load({
                                    url: result.src,
                                    xhr: result.xhr,
                                    cb: function(imgSrc, imgSrcs, caption) {
                                        if (imgSrc) {
                                            imgReady(img,{
                                                ready:function(){
                                                    result = findPic(img);
                                                    result.src = imgSrc;
                                                    if (caption) result.description = caption;
                                                    self.loadingImgNum--;
                                                    self.data.push(result);
                                                    self._appendThumbSpans([result]);
                                                    self.loadThumb();
                                                    self.pageImgReady();
                                                },
                                                error:function(){
                                                    self.loadingImgNum--;
                                                    self.pageImgReady();
                                                }
                                            });
                                            if (imgSrcs && imgSrcs.length) {
                                                imgSrcs.forEach(src => {
                                                    let img = document.createElement('img');
                                                    img.src = src;
                                                    imgReady(img,{
                                                        ready:function(){
                                                            let result = findPic(img);
                                                            if (caption) result.description = caption;
                                                            self.data.push(result);
                                                            self._appendThumbSpans([result]);
                                                            self.loadThumb();
                                                        }
                                                    });
                                                })
                                            }
                                        } else {
                                            self.loadingImgNum--;
                                            self.pageImgReady();
                                        }
                                    },
                                    onerror: () => {
                                        self.loadingImgNum--;
                                        self.pageImgReady();
                                    }
                                });
                            } else {
                                img.src = result.src;
                                setTimeout(()=>{
                                    imgReady(img,{
                                        ready:function(){
                                            result = findPic(img);
                                            self.loadingImgNum--;
                                            self.data.push(result);
                                            self._appendThumbSpans([result]);
                                            self.loadThumb();
                                            self.pageImgReady();
                                        },
                                        error:function(){
                                            self.loadingImgNum--;
                                            self.pageImgReady();
                                        }
                                    });
                                },0);
                            }
                            if(!preloadContainer)preloadContainer = document.querySelector('.pv-gallery-preloaded-img-container');
                            preloadContainer.appendChild(img);
                        }
                        if(prefs.gallery.downloadGap > 0){
                            self.loadingImgs=self.loadingImgs.concat(imgs);
                            if(!self.loadIntv){
                                self.loadIntv=setInterval(()=>{
                                    let img=self.loadingImgs.shift();
                                    if(!img){
                                        clearInterval(self.loadIntv);
                                        self.loadIntv=null;
                                    }else loadImg(img);
                                },prefs.gallery.downloadGap);
                            }
                        }else{
                            imgs.forEach(function(img) {
                                loadImg(img);
                            });
                        }
                        if(prefs.gallery.loadAll && !single)self.pageAction(next);
                        else loadOver();
                    },
                    onerror: function(e) {
                        if(prefs.gallery.loadAll && !single)self.pageAction(next);
                        else loadOver();
                    }
                });
            },
            runOnce:function(){//运行一次来获取某些数据。
                var thumbSpanCS=unsafeWindow.getComputedStyle(this.selected);
                this.thumbSpanOuterSize=this.isHorizontal?
                    this.selected.offsetWidth + parseFloat(thumbSpanCS.marginLeft) + parseFloat(thumbSpanCS.marginRight) :
                this.selected.offsetHeight + parseFloat(thumbSpanCS.marginTop) + parseFloat(thumbSpanCS.marginBottom);



                this.runOnce=function(){
                };
            },

            minimize:function(){
                this.close();
                this.maximizeTrigger.style.display='block';
                this.minimized=true;
            },
            navigateToImg:function(targetImg){
                targetImg.scrollIntoView();//先调用原方法，可以让overflow hidden的滚动出来。

                //让图片近可能的居中
                var imgBCRect=getContentClientRect(targetImg);
                var wSize=getWindowSize();

                window.scrollBy(imgBCRect.left - (wSize.w - imgBCRect.width)/2,
                                imgBCRect.top - (wSize.h - imgBCRect.height)/2);

            },
            switchThumbVisible:function(){
                var style=this.thumbVisibleStyle;
                var count=0;
                var styleText=[];
                var iStatisCopy=this.iStatisCopy;
                var iStatisCopy_i;

                for(var i in iStatisCopy){
                    if(!iStatisCopy.hasOwnProperty(i))continue;
                    iStatisCopy_i=iStatisCopy[i];
                    if(iStatisCopy_i.shown){
                        count+=iStatisCopy_i.count;
                    }else{
                        styleText.push('.pv-gallery-sidebar-thumb-container[data-type="'+i+'"]');
                    };
                };

                //写入style;
                style.textContent=styleText.join(',') + '{display:none !important;}';

                //初始化缩略图区的滚动条
                this.thumbScrollbar.reset();
                this.arrowVisib();

                //载入缩略图
                this.loadThumb();
            },
            forceRepaint:function(){//解决opera的fixed元素，当滚动条不再最高处的时候，不重绘fixed元素的问题。
                clearTimeout(this.forceRepaintTimer);
                var self=this;
                this.forceRepaintTimer=setTimeout(function(){
                    if(envir.opera){
                        self.forceRepaintTimes % 2 ==0 ? window.scrollBy(0,1) : window.scrollBy(0,-1);
                        self.forceRepaintTimes++;
                    };
                },333);
            },
            resizeHandler:function(){//窗口变化时，调整一些东西。
                this.thumbScrollbar.reset();
                //this.selectedIntoView();
                this.fitToScreen();
                this.loadThumb();
            },
            _isLastSpan: function(span) {// 用于判断是否自动重载，是否是最后几个图片
                if (this.selected.clientWidth == 0) return false;
                if (!span) return true;

                var index = Array.prototype.slice.call(this.imgSpans).indexOf(span);
                if (index != -1) {
                    var total = this.imgSpans.length;
                    if (total - index < prefs.gallery.scrollEndAndLoad_num) {
                        return true;
                    }
                }
            },
            arrowVisib:function(){//当当前选择元素的前面或者后面没有元素的时候隐藏控制箭头

                var icps=this.eleMaps['img-controler-pre'].style;
                var icns=this.eleMaps['img-controler-next'].style;
                var scps=this.eleMaps['sidebar-controler-pre'].style;
                var scns=this.eleMaps['sidebar-controler-next'].style;

                //下一张的箭头
                var nextSpan = this.getThumSpan();
                if (nextSpan) {
                    icns.display='';
                    scns.display='';
                }else{
                    icns.display='none';
                    scns.display='none';
                };

                // 最后几张图片，滚到底部添加新的图片
                if (prefs.gallery.scrollEndAndLoad && this._isLastSpan(nextSpan)) {
                    this.scrollToEndAndReload();
                }

                //上一张的箭头
                if(this.getThumSpan(true)){
                    icps.display='';
                    scps.display='';
                }else{
                    icps.display='none';
                    scps.display='none';
                };
            },
            simpleSlideShow:function(backward,interval){
                clearInterval(this.slideShowInterval);//幻灯播放，只允许存在一个，否则得乱套

                var self=this;
                var slideShowInterval=setInterval(function(){
                    var before=self.selected;
                    backward ? self.selectPrevious() : self.selectNext();
                    if(before == self.selected){//没有下一个元素了。。
                        stop();
                    };
                },(interval? interval : 800));

                this.slideShowInterval=slideShowInterval;

                function stop(){
                    clearInterval(slideShowInterval);
                };

                return stop;
            },

            reload: function() {// 重新加载所有图片到库里面
                // 函数在 LoadingAnimC 中
                var data = this.getAllValidImgs();
                // 设置当前选中的图片
                data.target = {
                    src: this.selected.dataset.src
                };

                this.close(true);

                this.load(data, null, true);
            },
            reloadNew: function() {// 加载新的图片到库里面
                var newer = true;
                var data = this.getAllValidImgs(newer);
                if (data.length) {
                    this._appendThumbSpans(data);
                }
            },
            getAllValidImgs:function(newer){
                var validImgs = [];
                var imgs = getBody(document).getElementsByTagName('img'),
                    container = document.querySelector('.pv-gallery-container'),
                    preloadContainer = document.querySelector('.pv-gallery-preloaded-img-container');

                imgs = Array.prototype.slice.call(imgs);
                arrayFn.forEach.call(getBody(document).querySelectorAll("iframe"),function(iframe){
                    if (iframe.name == "pagetual-iframe") return;
                    if (!iframe.src || (iframe.src && (iframe.src == "about:blank" || iframe.src.replace(/\/[^\/]*$/,"").indexOf(location.hostname) != -1))) {
                        try{
                            arrayFn.forEach.call(iframe.contentWindow.document.getElementsByTagName('img'),function(img){
                                imgs.push(img);
                            });
                        }catch(e){
                            debug(e.toString());
                        }
                    }
                });
                var bgReg=/.*url\(\s*["']?(.+?)["']?\s*\)/i;
                var bgImgs=Array.from(getBody(document).querySelectorAll('*')).reduceRight((total, node) => {
                        if(node.nodeName.toUpperCase() != "IMG" && node.offsetParent && (!node.className || !node.className.indexOf || node.className.indexOf("pv-")==-1)){
                            let prop = getComputedStyle(node).backgroundImage;
                            if (prop != "none") {
                                let match = bgReg.exec(prop);
                                if (match) {
                                    node.src=match[1];
                                    total.push(node);
                                }
                            }
                            prop = getComputedStyle(node, '::before').backgroundImage;
                            if (prop != "none") {
                                let match = bgReg.exec(prop);
                                if (match) {
                                    let node=document.createElement("IMG");
                                    node.src=match[1];
                                    total.push(node);
                                }
                            }
                            prop = getComputedStyle(node, '::after').backgroundImage;
                            if (prop != "none") {
                                let match = bgReg.exec(prop);
                                if (match) {
                                    let node=document.createElement("IMG");
                                    node.src=match[1];
                                    total.push(node);
                                }
                            }
                        }
                        return total;
                }, []);
                if(bgImgs)imgs=imgs.concat(bgImgs);
                var svgImgs=Array.from(getBody(document).querySelectorAll('svg')).reduceRight((total, svg) => {
                        if (svg.clientHeight != 0 && (!svg.classList || !svg.classList.contains("pagetual"))) {
                            try {
                                const xml = new XMLSerializer().serializeToString(svg);
                                const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(xml)}`;
                                svg.src = ImgBase64;
                                total.push(svg);
                            } catch(e) {}
                        }
                        return total;
                }, []);
                if(svgImgs)imgs=imgs.concat(svgImgs);
                var canvasImgs=Array.from(getBody(document).querySelectorAll('canvas')).reduceRight((total, canvas) => {
                        if (canvas.clientHeight != 0) {
                            try {
                                canvas.src = canvas.toDataURL("image/png");
                                total.push(canvas);
                            } catch(e) {}
                        }
                        return total;
                }, []);
                if(canvasImgs)imgs=imgs.concat(canvasImgs);
                // 排除库里面的图片
                imgs = imgs.filter(function(img){
                    if (img.parentNode) {
                        if (img.parentNode.id=="icons" || img.parentNode.id=="pagetual-preload") {
                            return false;
                        } else if (img.parentNode.classList && img.parentNode.classList.contains("search-jumper-btn")) {
                            return false;
                        } else if (img.classList && img.classList.contains("pagetual")) {
                            return false;
                        }
                    }
                    return !(container.contains(img) || (preloadContainer&&preloadContainer.contains(img)));
                });

                // 已经在图库里面的
                var self = this;
                imgs.forEach(function(img) {
                    pretreatment(img);
                    if(!img.src || (img.nodeName=='IMG' && img.getAttribute && !img.getAttribute("src"))) return;
                    if (newer && self._dataCache[img.src]) return;

                    var result = findPic(img);
                    if (result) {
                        validImgs.push(result);
                        self.data.push(result);
                    }

                    self._dataCache[img.src] = true;
                });

                return validImgs;
            },
            scrollToEndAndReload: function() {// 滚动主窗口到最底部，然后自动重载库的图片

                window.scrollTo(0, 9999999);

                var self = this;
                clearTimeout(self.reloadTimeout);
                self.reloadTimeout = setTimeout(function(){
                    // self.reload();
                    self.reloadNew();
                }, 1000);
            },
            exportImages: function () {// 导出所有图片到新窗口
                var nodes = document.querySelectorAll('.pv-gallery-sidebar-thumb-container[data-src]'),i;
                //var arr = Array.prototype.map.call(nodes, function(node){
                //    if(unsafeWindow.getComputedStyle(node).display=="none")return "";
                //    else return '<div><img src=' + node.dataset.src + '></div>'
                //});

                var arr=[];
                for (i = 0; i < nodes.length; ++i) {
                    if(unsafeWindow.getComputedStyle(nodes[i]).display=="none")arr.push("");
                    else arr.push('<div><img src="' + nodes[i].dataset.src + '" /></div>');
                }

                var title = document.title;

                var html = '\
                 <head>\
                 <title>Picviewer CE+ '+i18n("exportImages")+' '+title+'</title>\
                 <style>\
                 .toTop{width:28px;height:28px;border-radius:14px;position: fixed;right:2px;bottom: 2px;cursor: pointer;background-color:#000;opacity:.3;padding:0em!important;border:0px!important;z-index:1}\
                 .toTop:hover{opacity:1}\
                 .toTop>span{height:28px;line-height:28px;display:block;color:#FFF;text-align:center;font-size:20px;}\
                 .grid{-moz-column-count:4;-webkit-column-count:4;column-count:4;-moz-column-gap: 1em;-webkit-column-gap: 1em;column-gap: 1em;}\
                 .grid>div{padding: 1em;margin: 0 0 1em 0;-moz-page-break-inside: avoid;-webkit-column-break-inside: avoid;break-inside: avoid;}\
                 .grid>div>img{width: 100%;margin-bottom:10px;}\
                 .list>div {text-align:center;}\
                 .list>div>img { max-width: 100%; }\
                 .gridBig{margin: 0px;}\
                 .gridBig>div { float: left;margin: 0px 0px 1px 1px;}\
                 .gridBig>div>img { max-width: 100%; }\
                 .select{opacity: 0.8;border: 5px solid red!important;}\
                 body>div{border: 5px solid black;margin: 1px;}\
                 body>div:hover{border: 5px solid #dbdbdb;}\
                 body>div{position:relative;}\
                 </style>\
                 </head>\
                 <span class="toTop">\
                    <span>￪</span>\
                 </span>\
                 <body class="'+prefs.gallery.exportType+'">\
                 <p style="width:100vw;display:flex;flex-direction:column;">\
                 <img id="bigImg" style="pointer-events:none;position:fixed;z-index:999;width:100vw;top:0px;align-self:center;" /></p>\
                 <p>【'+i18n("picTitle")+'】：' + title + '</p>\
                 <p>【'+i18n("picNum")+'】：' + nodes.length + ' <select onchange="document.body.className=this.options[this.options.selectedIndex].value"><option value="grid" '+(prefs.gallery.exportType=="grid"?"selected='selected'":"")+'>'+i18n("grid")+'</option><option value="gridBig" '+(prefs.gallery.exportType=="gridBig"?"selected='selected'":"")+'>'+i18n("gridBig")+'</option><option value="list" '+(prefs.gallery.exportType=="list"?"selected='selected'":"")+'>'+i18n("list")+'</option> </select> \
                 <input type="button" value="'+i18n("exportImagesUrl")+'" onclick="var imgStr=\'\',selList=document.querySelectorAll(\'.select>img\');if(selList.length==0)[].forEach.call(document.querySelectorAll(\'img\'),function(i){imgStr+=i.src+\' \\n\'});else{[].forEach.call(selList,function(i){imgStr+=i.src+\' \\n\'});}window.prompt(\''+i18n("exportImagesUrlPop")+'\',imgStr);" />\
                  ('+i18n("picTips")+')</p><p>'+i18n("savePageTips")+"</p>";

                html += arr.join('\n') +
                '<script type="text/javascript">\
                 document.querySelector(".toTop").addEventListener("click", function(){\
                 document.body.scrollIntoView();\
                 });\
                 var bigImg=document.querySelector("#bigImg"),body=document.body;\
                 [].forEach.call(document.querySelectorAll("div>img"),function(i){\
                 i.onerror=function(e){i.style.display="none";i.parentNode.style.cursor="pointer";i.parentNode.title="reload"};\
                 i.onload=function(e){i.style.display="";i.parentNode.style.cursor="pointer";i.parentNode.title=""};\
                 i.onmouseover=i.onmousemove=function(e){bigImg.style.top=(this.width/this.height>body.clientWidth/body.clientHeight?10+(body.clientHeight*0.95-body.clientWidth*this.height/this.width)*e.offsetY/this.height:10-(body.clientWidth*this.height/this.width-body.clientHeight*0.95)*e.offsetY/this.height);bigImg.src=e.ctrlKey?this.src:"";bigImg.style.display=e.ctrlKey?"":"none";};\
                 });\
                 [].forEach.call(document.querySelectorAll("body>div"),function(i){\
                 i.onclick=function(e){if(i.firstChild.style.display=="none"){i.firstChild.src=i.firstChild.src;return;}if(e.ctrlKey&&i.firstChild.src){window.open(i.firstChild.src,"_blank")}else{this.classList.toggle("select")}}\
                 });\
                 </script></body>';
                _GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(html),{active:true});
            },
            copyImages: function(isAlert) {
                var nodes = document.querySelectorAll('.pv-gallery-sidebar-thumb-container[data-src]');
                var urls = [];
                [].forEach.call(nodes, function(node){
                    if(unsafeWindow.getComputedStyle(node).display!="none"){
                        urls.push(node.dataset.src);
                    }
                });

                _GM_setClipboard(urls.join("\n"));

                if (isAlert) {
                    this.showTips(i18n("copySuccess",urls.length));
                }
            },

            Preload:function(ele,oriThis){
                this.ele=ele;
                this.oriThis=oriThis;//主this
                this.init();
            },
            Scrollbar:function(scrollbar,container,isHorizontal){
                this.scrollbar=scrollbar;
                this.container=container;
                this.isHorizontal=isHorizontal
                this.init();
            },

            addStyle:function(){
                var style=document.createElement('style');
                style.type='text/css';
                style.textContent='\
                 /*最外层容器*/\
                    .pv-gallery-container {\
                    position: fixed;\
                    top: 0;\
                    left: 0;\
                    width: 100%;\
                    height: 100%;\
                    min-width:none;\
                    min-height:none;\
                    padding: 0;\
                    margin: 0;\
                    border: none;\
                    z-index:'+prefs.imgWindow.zIndex+';\
                    background-color: transparent;\
                    }\
                    /*全局border-box*/\
                    .pv-gallery-container span{\
                    -moz-box-sizing: border-box;\
                    box-sizing: border-box;\
                    line-height: 1.6;\
                    text-overflow: unset;\
                    }\
                    .pv-gallery-container * {\
                    font-size: 14px;\
                    }\
                    /*点击还原的工具条*/\
                    .pv-gallery-maximize-trigger{\
                    position:fixed;\
                    bottom:15px;\
                    left:15px;\
                    display:none;\
                    background:#000;\
                    opacity:0.6;\
                    padding-left:10px;\
                    font-size:16px;\
                    line-height:0;\
                    color:white;\
                    cursor:pointer;\
                    box-shadow:3px 3px 0 0 #333;\
                    z-index:899999998;\
                    }\
                    .pv-gallery-maximize-trigger:hover{\
                    opacity:0.9;\
                    }\
                    .pv-gallery-maximize-trigger-close{\
                    display:inline-block;\
                    padding-left:10px;\
                    vertical-align:middle;\
                    height:30px;\
                    padding:10px 0;\
                    width:24px;\
                    background:url("'+prefs.icons.loadingCancle+'") center no-repeat;\
                    }\
                    .pv-gallery-maximize-trigger-close:hover{\
                    background-color:#333;\
                    }\
                    @media only screen and (max-width: 800px) {\
                     .pv-gallery-range-box>input {\
                     display: none;\
                     }\
                     .pv-gallery-maximize-container{\
                     column-count: 2;\
                     -moz-column-count: 2;\
                     -webkit-column-count: 2;\
                     padding-top: 300px;\
                     }\
                     .pv-gallery-sidebar-viewmore-bottom.showmore{\
                     transform: scale(3.5);\
                     bottom: 50px;\
                     }\
                     .pv-gallery-maximize-container span>p{\
                     opacity: 0.6;\
                     }\
                    }\
                    @media only screen and (min-width: 800px) {\
                     .pv-gallery-maximize-container{\
                     column-count: 5;\
                     -moz-column-count: 5;\
                     -webkit-column-count: 5;\
                     padding-top: 30px;\
                     }\
                     .pv-gallery-maximize-container span>p{\
                     opacity: 0;\
                     }\
                    }\
                    span.pv-gallery-tipsWords{\
                    font-size: 50px;\
                    font-weight: bold;\
                    font-family: "黑体", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",\
                      "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",\
                      "Segoe UI Emoji", "Segoe UI Symbol";\
                    color: #ffffff;\
                    height: 70px;\
                    line-height: 70px;\
                    position: fixed;\
                    left: 50%;\
                    top: 10%;\
                    margin-left: -150px;\
                    padding: 0 10px;\
                    z-index: 999999999;\
                    background-color: #000;\
                    border: 1px solid black;\
                    border-radius: 10px;\
                    opacity: 0;\
                    filter: alpha(opacity=65);\
                    box-shadow: 5px 5px 20px 0px #000;\
                    -moz-transition:opacity 0.3s ease-in-out 0s;\
                    -webkit-transition:opacity 0.3s ease-in-out 0s;\
                    transition:opacity 0.3s ease-in-out 0s;\
                    pointer-events: none;\
                    overflow: hidden;\
                    text-overflow: ellipsis;\
                    white-space: nowrap;\
                    max-width: 65%;\
                    }\
                    /*顶栏*/\
                    .pv-gallery-head {\
                    position: absolute;\
                    top: 0;\
                    left: 0;\
                    width: 100%;\
                    flex-wrap: wrap;\
                    min-height: 30px;\
                    height: auto;\
                    z-index:1;\
                    background-color:rgb(0,0,0);\
                    border:none;\
                    border-bottom:1px solid #333333;\
                    text-align:right;\
                    line-height:0;\
                    font-size: 14px;\
                    color:#757575;\
                    padding-right:42px;\
                    display: table;\
                    }\
                    .pv-gallery-head > span{\
                    vertical-align:middle;\
                    }\
                    /*顶栏左边*/\
                    .pv-gallery-head-float-left{\
                    float:left;\
                    height:100%;\
                    text-align:left;\
                    padding-left:5px;\
                    display: table;\
                    }\
                    .pv-gallery-head-float-left > span{\
                    display:inline-block;\
                    height:100%;\
                    vertical-align:middle;\
                    }\
                    .pv-gallery-head-float-left > span > *{\
                    vertical-align:middle;\
                    }\
                    .pv-gallery-head-left-img-info{\
                    cursor:help;\
                    }\
                    .pv-gallery-head-left-img-info-description {\
                    margin-left: 10px;\
                    margin-right: 10px;\
                    overflow: hidden;\
                    text-overflow: ellipsis;\
                    white-space: nowrap;\
                    max-width: 25em;\
                    display: inherit;\
                    }\
                    .pv-gallery-range-box{\
                    display: inline-flex;\
                    justify-content: center;\
                    align-items: center;\
                    }\
                    .pv-gallery-range-box>span{\
                    padding: 0 5px 0 5px;\
                    }\
                    .pv-gallery-range-box>input{\
                    background: white;\
                    min-height: auto;\
                    padding: 0;\
                    -webkit-appearance: auto;\
                    }\
                    /*顶栏里面的按钮样式-开始*/\
                    .pv-gallery-head-command{\
                    display:inline-block;\
                    cursor:pointer;\
                    height:100%;\
                    padding:0 8px;\
                    text-align:center;\
                    position:relative;\
                    z-index:1;\
                    vertical-align:middle;\
                    -o-user-select: none;\
                    -ms-user-select: none;\
                    -webkit-user-select: none;\
                    -moz-user-select: -moz-none;\
                    user-select: none;\
                    }\
                    /*辅助点击事件的生成，countdown*/\
                    .pv-gallery-head-command_overlayer{\
                    top:0;\
                    left:0;\
                    right:0;\
                    bottom:0;\
                    position:absolute;\
                    opacity:0;\
                    }\
                    .pv-gallery-head-command > *{\
                    vertical-align:middle;\
                    }\
                    .pv-gallery-head-command-close{\
                    position:absolute;\
                    top:0;\
                    right:0;\
                    width:40px;\
                    border-left: 1px solid #333333;\
                    background:transparent no-repeat center;\
                    background-image:url("'+prefs.icons.loadingCancle+'");\
                    }\
                    .pv-gallery-head-command-slide-show-countdown{\
                    font-size:0.8em;\
                    }\
                    .pv-gallery-head-command-slide-show-button{\
                    border-radius:36px;\
                    display:inline-block;\
                    width:18px;\
                    height:18px;\
                    border:2px solid #757575;\
                    margin-right:3px;\
                    line-height:0;\
                    }\
                    .pv-gallery-head-command-slide-show-button-inner{\
                    display:inline-block;\
                    border:none;\
                    border-top:4px solid transparent;\
                    border-bottom:4px solid transparent;\
                    border-left:8px solid #757575;\
                    vertical-align:middle;\
                    }\
                    .pv-gallery-head-command-slide-show-button-inner_stop{\
                    border-color:#757575;\
                    }\
                    .pv-gallery-head-command-collect-icon{\
                    display:inline-block;\
                    height:20px;\
                    width:20px;\
                    background:transparent url("' + prefs.icons.fivePointedStar + '") 0 0 no-repeat;\
                    }\
                    .pv-gallery-head-left-lock-icon{\
                    display:inline-block;\
                    height:20px;\
                    width:20px;\
                    cursor:pointer;\
                    background:transparent url("' + prefs.icons.lock + '") 0 0 no-repeat;\
                    }\
                    .pv-gallery-head-command-collect-icon ~ .pv-gallery-head-command-collect-text::after{\
                    content:"'+i18n("collect")+'";\
                    }\
                    .pv-gallery-head-command-collect-favorite > .pv-gallery-head-command-collect-icon{\
                    background-position:-40px 0 !important;\
                    }\
                    .pv-gallery-head-command-collect-favorite > .pv-gallery-head-command-collect-text::after{\
                    content:"'+i18n("collected")+'";\
                    }\
                    .pv-gallery-head-command-exit-collection{\
                    color:#939300 !important;\
                    display:none;\
                    }\
                    .pv-gallery-head-command:hover{\
                    background-color:#272727;\
                    color:#ccc;\
                    }\
                    /*droplist*/\
                    .pv-gallery-head-command-drop-list{\
                    position:absolute;\
                    right:0;\
                    display:none;\
                    box-shadow:0 0 3px #808080;\
                    background-color:#272727;\
                    line-height: 1.6;\
                    text-align:left;\
                    padding:10px;\
                    color:#ccc;\
                    margin-top:-1px;\
                    z-index:9;\
                    }\
                    .pv-gallery-head-command-drop-list-item{\
                    display:block;\
                    padding:2px 5px;\
                    cursor:pointer;\
                    white-space:nowrap;\
                    }\
                    .pv-gallery-head-command-drop-list-item-collect-description{\
                    cursor:default;\
                    }\
                    .pv-gallery-head-command-drop-list-item-collect-description > textarea{\
                    resize:both;\
                    width:auto;\
                    height:auto;\
                    }\
                    .pv-gallery-head-command-drop-list-item_disabled{\
                    color:#757575;\
                    }\
                    .pv-gallery-head-command-drop-list-item input + *{\
                    padding-left:3px;\
                    }\
                    .pv-gallery-head-command-drop-list-item input[type=number]{\
                    text-align:left;\
                    max-width:50px;\
                    height:20px;\
                    }\
                    .pv-gallery-head-command-drop-list-item input[type=checkbox]{\
                    width:20px\
                    }\
                    .pv-gallery-head-command-drop-list-item > * {\
                    vertical-align:middle;\
                    width: auto;\
                    }\
                    .pv-gallery-head-command-drop-list-item label {\
                    font-weight: normal;\
                    display:inline\
                    }\
                    .pv-gallery-head-command-drop-list-item:hover{\
                    background-color:#404040;\
                    }\
                    /*container*/\
                    .pv-gallery-head-command-container{\
                    display:inline-block;\
                    height:100%;\
                    position:relative;\
                    }\
                    /* after伪类生成标识下拉菜单的三角图标*/\
                    .pv-gallery-head-command-container > .pv-gallery-head-command::after{\
                    content:"";\
                    display:inline-block;\
                    vertical-align:middle;\
                    border:none;\
                    border-top:7px solid #757575;\
                    border-left:5px solid transparent;\
                    border-right:5px solid transparent;\
                    margin-left:5px;\
                    -moz-transition:all 0.3s ease-in-out 0s;\
                    -webkit-transition:all 0.3s ease-in-out 0s;\
                    transition:all 0.3s ease-in-out 0s;\
                    }\
                    .pv-gallery-head-command-container:hover{\
                    box-shadow:0 0 3px #808080;\
                    }\
                    .pv-gallery-head-command-container:hover > .pv-gallery-head-command{\
                    background-color:#272727;\
                    color:#ccc;\
                    }\
                    .pv-gallery-head-command-container:hover > .pv-gallery-head-command::after{\
                    -webkit-transform:rotate(180deg);\
                    -moz-transform:rotate(180deg);\
                    transform:rotate(180deg);\
                    border-top:7px solid #ccc;\
                    }\
                    .pv-gallery-head-command-container:hover .pv-gallery-head-command-collect-icon{\
                    background-position:-20px 0;\
                    }\
                    .pv-gallery-head-command-container:hover .pv-gallery-head-command-slide-show-button{\
                    border-color:#ccc;\
                    }\
                    .pv-gallery-head-command-container:hover .pv-gallery-head-command-slide-show-button-inner{\
                    border-left-color:#ccc;\
                    }\
                    .pv-gallery-head-command-container:hover .pv-gallery-head-command-slide-show-button-inner_stop{\
                    border-color:#ccc;\
                    }\
                    .pv-gallery-head-command-container:hover > .pv-gallery-head-command-drop-list,.pv-gallery-head-command-container > .pv-gallery-head-command-drop-list.focus{\
                    display:block;\
                    }\
                    /*顶栏里面的按钮样式-结束*/\
                    .pv-gallery-body {\
                    display: block;\
                    height: 100%;\
                    width: 100%;\
                    margin: 0;\
                    padding: 0;\
                    border: none;\
                    border-top: 30px solid transparent;\
                    position: relative;\
                    background-clip: padding-box;\
                    z-index:0;\
                    }\
                    .pv-gallery-img-container {\
                    display: block;\
                    padding: 0;\
                    margin: 0;\
                    border: none;\
                    height: 100%;\
                    width: 100%;\
                    background-clip: padding-box;\
                    background-color: rgba(20,20,20,0.75);\
                    position:relative;\
                    transition: background-color .3s ease;\
                    }\
                    .pv-gallery-img-container-top {\
                    border-top: '+ prefs.gallery.sidebarSize +'px solid transparent;\
                    }\
                    .pv-gallery-img-container-right {\
                    border-right: '+ prefs.gallery.sidebarSize +'px solid transparent;\
                    }\
                    .pv-gallery-img-container-bottom {\
                    border-bottom: '+ prefs.gallery.sidebarSize +'px solid transparent;\
                    }\
                    .pv-gallery-img-container-left {\
                    border-left: '+ prefs.gallery.sidebarSize +'px solid transparent;\
                    }\
                    /*大图区域的切换控制按钮*/\
                    .pv-gallery-img-controler{\
                    position:absolute;\
                    top:50%;\
                    height:60px;\
                    width:50px;\
                    margin-top:-30px;\
                    cursor:pointer;\
                    opacity:0.3;\
                    z-index:1;\
                    transition: opacity .5s ease;\
                    }\
                    .pv-gallery-sidebar-toggle-hide .pv-gallery-img-controler{\
                    opacity:0;\
                    }\
                    .pv-gallery-img-controler-pre{\
                    background:rgba(70,70,70,0.8) url("'+prefs.icons.arrowLeft+'") no-repeat center;\
                    left:10px;\
                    }\
                    .pv-gallery-img-controler-next{\
                    background:rgba(70,70,70,0.8) url("'+prefs.icons.arrowRight+'") no-repeat center;\
                    right:10px;\
                    }\
                    .pv-gallery-img-controler:hover{\
                    background-color:rgba(140,140,140,0.8);\
                    opacity:0.9;\
                    z-index:2;\
                    }\
                    /*滚动条样式--开始*/\
                    .pv-gallery-scrollbar-h,\
                    .pv-gallery-scrollbar-v{\
                    display:none;\
                    z-index:1;\
                    position:absolute;\
                    margin:0;\
                    padding:0;\
                    border:none;\
                    }\
                    .pv-gallery-scrollbar-h{\
                    bottom:10px;\
                    left:0;\
                    right:0;\
                    height:10px;\
                    margin:0 2px;\
                    }\
                    .pv-gallery-scrollbar-v{\
                    top:0;\
                    bottom:0;\
                    right:10px;\
                    width:10px;\
                    margin:2px 0;\
                    }\
                    .pv-gallery-scrollbar-h:hover{\
                    height:25px;\
                    bottom:0;\
                    }\
                    .pv-gallery-scrollbar-v:hover{\
                    width:25px;\
                    }\
                    .pv-gallery-scrollbar-h:hover,\
                    .pv-gallery-scrollbar-v:hover{\
                    background-color:rgba(100,100,100,0.9);\
                    z-index:2;\
                    }\
                    .pv-gallery-scrollbar-h-track,\
                    .pv-gallery-scrollbar-v-track{\
                    position:absolute;\
                    top:0;\
                    left:0;\
                    right:0;\
                    bottom:0;\
                    background-color:rgba(100,100,100,0.3);\
                    border:2px solid transparent;\
                    }\
                    .pv-gallery-scrollbar-h-handle,\
                    .pv-gallery-scrollbar-v-handle{\
                    position:absolute;\
                    background-color:rgba(0,0,0,0.5);\
                    }\
                    .pv-gallery-scrollbar-h-handle{\
                    height:100%;\
                    }\
                    .pv-gallery-scrollbar-v-handle{\
                    width:100%;\
                    right: 0;\
                    }\
                    .pv-gallery-scrollbar-h-handle:hover,\
                    .pv-gallery-scrollbar-v-handle:hover{\
                    background-color:rgba(80,33,33,1);\
                    border: 2px solid #585757;\
                    }\
                    .pv-gallery-scrollbar-h-handle:active,\
                    .pv-gallery-scrollbar-v-handle:active{\
                    background-color:rgba(57,26,26,1);\
                    border: 2px solid #878484;\
                    }\
                    /*滚动条样式--结束*/\
                    .pv-gallery-img-content{\
                    display:block;\
                    width:100%;\
                    height:100%;\
                    overflow:hidden;\
                    text-align:center;\
                    padding:0;\
                    border:none;\
                    margin:0;\
                    line-height:0;\
                    font-size:0;\
                    white-space:nowrap;\
                    }\
                    .pv-gallery-img-parent{\
                    display:inline-flex;\
                    align-items: center;\
                    vertical-align: middle;\
                    justify-content: center;\
                    line-height:0;\
                    }\
                    .pv-gallery-img_broken{\
                    display:none;\
                    cursor:pointer;\
                    }\
                    .pv-gallery-img{\
                    position:relative;\/*辅助e.layerX,layerY*/\
                    display:inline-block;\
                    vertical-align:middle;\
                    width:auto;\
                    height:auto;\
                    padding:0;\
                    border:5px solid #313131;\
                    margin:1px;\
                    opacity:0.3;\
                    background-color: #282828cc;\
                    '+
                    (prefs.gallery.transition ? ('\
                    -webkit-transition: opacity 0.5s ease;\
                    -moz-transition: opacity 0.5s ease;\
                    transition: opacity 0.5s ease;\
                    ') : '') + '\
                    }\
                    .pv-gallery-img_zoom-out{\
                    cursor:'+support.cssCursorValue.zoomOut+';\
                    }\
                    .pv-gallery-img_zoom-in{\
                    cursor:'+support.cssCursorValue.zoomIn+';\
                    }\
                    span.pv-gallery-sidebar-toggle{\
                    position:absolute;\
                    line-height:12px;\
                    text-align:center;\
                    background-color:rgb(0,0,0);\
                    color:#757575;\
                    white-space:nowrap;\
                    cursor:pointer;\
                    z-index:2;\
                    transition: background-color .3s ease, opacity .3s ease;\
                    justify-content: center;\
                    display:none;\
                    }\
                    .pv-gallery-container.pv-gallery-sidebar-toggle-hide>.pv-gallery-body>.pv-gallery-img-container>span.pv-gallery-sidebar-toggle{\
                    opacity: 0.6;\
                    padding: 15px;\
                    background-color:#00000000;\
                    }\
                    .pv-gallery-container.pv-gallery-sidebar-toggle-hide>.pv-gallery-body>.pv-gallery-img-container>span.pv-gallery-sidebar-toggle:hover{\
                    opacity: 1;\
                    background-color:rgb(0 0 0 / 50%);\
                    }\
                    .pv-gallery-container.pv-gallery-sidebar-toggle-hide>.pv-gallery-body{\
                    border-top: 0px solid transparent;\
                    }\
                    .pv-gallery-container.pv-gallery-sidebar-toggle-hide>.pv-gallery-head{\
                    opacity: 0.1;\
                    transition: opacity .3s ease;\
                    }\
                    .pv-gallery-container.pv-gallery-sidebar-toggle-hide>.pv-gallery-body>.pv-gallery-img-container{\
                    background-color: black;\
                    }\
                    .pv-gallery-container.pv-gallery-sidebar-toggle-hide>.pv-gallery-head:hover{\
                    opacity: 1;\
                    }\
                    .pv-gallery-sidebar-viewmore{\
                    position:absolute;\
                    line-height:0;\
                    text-align:center;\
                    background-color:#00000060;\
                    color:#757575;\
                    white-space:nowrap;\
                    cursor:pointer;\
                    z-index:1;\
                    display:none;\
                    height: 30px;\
                    width:30px;\
                    border-radius: 15px;\
                    line-height: 2 !important;\
                    font-family: auto;\
                    transition: background-color .3s ease;\
                    }\
                    .pv-gallery-sidebar-viewmore:hover{\
                    opacity: 1;\
                    background-color:#000000;\
                    }\
                    .pv-gallery-maximize-container>p{\
                    position: fixed;\
                    width: 100%;\
                    text-align: center;\
                    pointer-events: none;\
                    margin-bottom: 45px;\
                    bottom: 0;\
                    }\
                    .pv-gallery-maximize-container>p>input{\
                    pointer-events: all;\
                    color: white;\
                    background-color: black;\
                    border: 0;\
                    opacity: 0.8;\
                    padding: 5px 10px;\
                    cursor: pointer;\
                    margin: 1px;\
                    font-size: 20px;\
                    }\
                    .pv-gallery-maximize-container>p>input:hover{\
                    color: red;\
                    }\
                    .pv-gallery-maximize-container{\
                    width: 100%;\
                    display: block;\
                    background: black;\
                    }\
                    .pv-gallery-maximize-container.pv-gallery-flex-maximize{\
                    column-count: unset;\
                    -moz-column-count: unset;\
                    -webkit-column-count: unset;\
                    display: flex;\
                    flex-flow: wrap;\
                    justify-content: center;\
                    }\
                    .pv-gallery-maximize-container.pv-gallery-flex-maximize span{\
                    width: 18.5%;\
                    height: 30vh;\
                    }\
                    .pv-gallery-maximize-container.pv-gallery-flex-maximize img{\
                    position: relative;\
                    width: unset;\
                    max-height: 100%;\
                    max-width: 100%;\
                    top: 50%;\
                    transform: translateY(-50%) scale3d(1, 1, 1);\
                    }\
                    .pv-gallery-maximize-container.pv-gallery-flex-maximize img:hover {\
                    transform: translateY(-50%) scale3d(1.1, 1.1, 1.1);\
                    }\
                    .pv-gallery-maximize-container span{\
                    -moz-page-break-inside: avoid;\
                    -webkit-column-break-inside: avoid;\
                    break-inside: avoid;\
                    float: left;\
                    margin-bottom: 15px;\
                    margin-right: 15px;\
                    overflow: hidden;\
                    position: relative;\
                    }\
                    .pv-gallery-maximize-container>.maximizeChild{\
                    display: inline-block;\
                    vertical-align: middle;\
                    text-align: center;\
                    background-color: rgba(40, 40, 40, 0.8);\
                    border: 5px solid #000000;\
                    width: 100%;\
                    }\
                    .pv-gallery-maximize-container>.maximizeChild:hover{\
                    background: linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100% ), linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100% );\
                    background-size: 20px 20px;\
                    background-position: 0 0, 10px 10px;\
                    }\
                    .pv-gallery-maximize-container>.maximizeChild.selected{\
                    border: 5px solid #ff0000;\
                    }\
                    .pv-gallery-maximize-container img{\
                    width:100%;\
                    transition: transform .3s ease 0s;\
                    transform: scale3d(1, 1, 1);\
                    cursor: zoom-in;\
                    }\
                    .pv-gallery-maximize-container img:hover {\
                    transform: scale3d(1.1, 1.1, 1.1);\
                    filter: brightness(1.1) !important;\
                    }\
                    .pv-gallery-maximize-container span>p{\
                    position: absolute;\
                    width: 100%;\
                    max-height: 40%;\
                    font-size: 18px;\
                    text-align: center;\
                    background: #000;\
                    color: #fff;\
                    left: 0;\
                    user-select: none;\
                    word-break: break-all;\
                    display: inline;\
                    margin: 0 auto;\
                    }\
                    .pv-gallery-maximize-container span>p.pv-bottom-banner{\
                    bottom: 0;\
                    height: 35px;\
                    cursor: pointer;\
                    line-height: 40px;\
                    }\
                    .pv-gallery-maximize-container span>p.pv-top-banner{\
                    top: 0;\
                    height: 25px;\
                    }\
                    .pv-gallery-maximize-container span:hover>p{\
                    opacity: 0.6;\
                    }\
                    .pv-gallery-maximize-container span>p.pv-bottom-banner:hover{\
                    color:red;\
                    font-weight:bold;\
                    }\
                    .pv-gallery-maximize-container span>input{\
                    position: absolute;\
                    top: 2px;\
                    width: 20px;\
                    height: 20px;\
                    opacity: 0;\
                    left: 0;\
                    display: inline;\
                    }\
                    .pv-gallery-maximize-container.checked span>input{\
                    opacity: 1;\
                    }\
                    .pv-gallery-maximize-container.checked span>.pv-top-banner{\
                    opacity: 0.6;\
                    }\
                    .pv-gallery-maximize-container>p>input.compareBtn{\
                    display: none;\
                    }\
                    .pv-gallery-maximize-container.canCompare>p>input.compareBtn{\
                    display: inline;\
                    }\
                    .pv-gallery-maximize-container span:hover>input{\
                    opacity: 1;\
                    }\
                    .pv-gallery-maximize-scroll{\
                    overflow-y: scroll;\
                    height: 100%;\
                    width: 100%;\
                    position: absolute;\
                    visibility: hidden;\
                    top: 0;\
                    left: 0;\
                    }\
                    .pv-gallery-sidebar-toggle:hover,.pv-gallery-sidebar-viewmore:hover{\
                    color:#ccc;\
                    }\
                    .pv-gallery-sidebar-toggle-h{\
                    width:80px;\
                    margin-left:-40px;\
                    left:50%;\
                    }\
                    .pv-gallery-sidebar-viewmore-h{\
                    margin-left:-15px;\
                    left:50%;\
                    }\
                    .pv-gallery-sidebar-toggle-v{\
                    height:80px;\
                    margin-top:-40px;\
                    top:50%;\
                    }\
                    .pv-gallery-sidebar-viewmore-v{\
                    height:30px;\
                    top:6%;\
                    }\
                    .pv-gallery-sidebar-toggle-top{\
                    top:-3px;\
                    }\
                    .pv-gallery-sidebar-viewmore-top{\
                    top:15px;\
                    }\
                    .pv-gallery-sidebar-toggle-right,.pv-gallery-sidebar-viewmore-right{\
                    right:-3px;\
                    }\
                    .pv-gallery-sidebar-toggle-bottom{\
                    bottom:-3px;\
                    }\
                    .pv-gallery-sidebar-viewmore-bottom{\
                    display: block;\
                    bottom:12px;\
                    }\
                    .pv-gallery-sidebar-viewmore-bottom.showmore{\
                    background-color: rgb(42, 42, 42);\
                    opacity: 1;\
                    }\
                    .pv-gallery-sidebar-toggle-left,.pv-gallery-sidebar-viewmore-left{\
                    left:-3px;\
                    }\
                    span.pv-gallery-sidebar-toggle-content{\
                    display:inline-block;\
                    vertical-align:middle;\
                    white-space:normal;\
                    word-wrap:break-word;\
                    overflow-wrap:break-word;\
                    line-height:1.1;\
                    font-size:12px;\
                    text-align:center;\
                    margin-bottom:8px;\
                    }\
                    .pv-gallery-sidebar-viewmore-content{\
                    display:inline-block;\
                    vertical-align:middle;\
                    white-space:normal;\
                    word-wrap:break-word;\
                    overflow-wrap:break-word;\
                    line-height:1.1;\
                    font-size:16px;\
                    text-align:center;\
                    }\
                    .pv-gallery-sidebar-toggle-content-v,.pv-gallery-sidebar-viewmore-content-v{\
                    width:1.1em;\
                    }\
                    /*侧边栏开始*/\
                    .pv-gallery-sidebar-container {\
                    position: absolute;\
                    background-color:rgb(0,0,0);\
                    padding:5px;\
                    border:none;\
                    margin:none;\
                    text-align:center;\
                    line-height:0;\
                    white-space:nowrap;\
                    -o-user-select: none;\
                    -webkit-user-select: none;\
                    -moz-user-select: -moz-none;\
                    user-select: none;\
                    }\
                    .pv-gallery-sidebar-container-h {\
                    height: '+ prefs.gallery.sidebarSize +'px;\
                    width: 100%;\
                    }\
                    .pv-gallery-sidebar-container-v {\
                    width: '+ prefs.gallery.sidebarSize +'px;\
                    height: 100%;\
                    }\
                    .pv-gallery-sidebar-container-top {\
                    top: 0;\
                    left: 0;\
                    border-bottom:1px solid #333333;\
                    }\
                    .pv-gallery-sidebar-container-right {\
                    top: 0;\
                    right: 0;\
                    border-left:1px solid #333333;\
                    }\
                    .pv-gallery-sidebar-container-bottom {\
                    bottom: 0;\
                    left: 0;\
                    border-top:1px solid #333333;\
                    }\
                    .pv-gallery-sidebar-container-left {\
                    top: 0;\
                    left: 0;\
                    border-right:1px solid #333333;\
                    }\
                    .pv-gallery-sidebar-content {\
                    display: inline-block;\
                    margin: 0;\
                    padding: 0;\
                    border: none;\
                    background-clip: padding-box;\
                    vertical-align:middle;\
                    position:relative;\
                    text-align:left;\
                    }\
                    .pv-gallery-sidebar-content-h {\
                    height: 100%;\
                    width: 90%;\
                    border-left: 40px solid transparent;\
                    border-right: 40px solid transparent;\
                    }\
                    .pv-gallery-sidebar-content-v {\
                    height: 90%;\
                    width: 100%;\
                    border-top: 40px solid transparent;\
                    border-bottom: 40px solid transparent;\
                    }\
                    .pv-gallery-sidebar-controler{\
                    cursor:pointer;\
                    position:absolute;\
                    background:rgba(255,255,255,0.1) no-repeat center;\
                    }\
                    .pv-gallery-sidebar-controler:hover{\
                    background-color:rgba(255,255,255,0.3);\
                    }\
                    .pv-gallery-sidebar-controler-pre-h,\
                    .pv-gallery-sidebar-controler-next-h{\
                    top:0;\
                    width:36px;\
                    height:100%;\
                    }\
                    .pv-gallery-sidebar-controler-pre-v,\
                    .pv-gallery-sidebar-controler-next-v{\
                    left:0;\
                    width:100%;\
                    height:36px;\
                    }\
                    .pv-gallery-sidebar-controler-pre-h {\
                    left: -40px;\
                    background-image: url("'+prefs.icons.arrowLeft+'");\
                    }\
                    .pv-gallery-sidebar-controler-next-h {\
                    right: -40px;\
                    background-image: url("'+prefs.icons.arrowRight+'");\
                    }\
                    .pv-gallery-sidebar-controler-pre-v {\
                    top: -40px;\
                    background-image: url("'+prefs.icons.arrowTop+'");\
                    }\
                    .pv-gallery-sidebar-controler-next-v {\
                    bottom: -40px;\
                    background-image: url("'+prefs.icons.arrowBottom+'");\
                    }\
                    .pv-gallery-sidebar-thumbnails-container {\
                    display: block;\
                    overflow: hidden;\
                    height: 100%;\
                    width: 100%;\
                    margin:0;\
                    border:none;\
                    padding:0;\
                    line-height:0;\
                    position:relative;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container span{\
                    vertical-align:middle;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-h{\
                    border-left:1px solid #464646;\
                    border-right:1px solid #464646;\
                    white-space:nowrap;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-v{\
                    border-top:1px solid #464646;\
                    border-bottom:1px solid #464646;\
                    white-space:normal;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-top {\
                    padding-bottom:5px;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-right {\
                    padding-left:5px;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-bottom {\
                    padding-top:5px;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-left {\
                    padding-right:5px;\
                    }\
                    .pv-gallery-sidebar-thumb-container {\
                    display:inline-block;\
                    text-align: center;\
                    border:2px solid rgb(52,52,52);\
                    background: linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100% ), linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100% );\
                    background-size: 20px 20px;\
                    background-position: 0 0, 10px 10px;\
                    cursor:pointer;\
                    position:relative;\
                    padding:2px;\
                    font-size:0;\
                    line-height:0;\
                    white-space:nowrap;\
                    vertical-align: middle;\
                    top:0;\
                    left:0;\
                    -webkit-transition:all 0.2s ease-in-out;\
                    transition:all 0.2s ease-in-out;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-h  .pv-gallery-sidebar-thumb-container {\
                    margin:0 2px;\
                    height:100%;\
                    }\
                    .pv-gallery-sidebar-thumbnails-container-v  .pv-gallery-sidebar-thumb-container {\
                    margin:2px 0;\
                    width:100%;\
                    }\
                    .pv-gallery-sidebar-thumbnails_hide-span > .pv-gallery-sidebar-thumb-container {\
                    display:none;\
                    }\
                    .pv-gallery-sidebar-thumb-container:hover {\
                    border:2px solid rgb(57,149,211);\
                    }\
                    .pv-gallery-sidebar-thumb_selected {\
                    border:2px solid rgb(229,59,62);\
                    }\
                    .pv-gallery-sidebar-thumb_selected-top {\
                    top:5px;\
                    }\
                    .pv-gallery-sidebar-thumb_selected-right {\
                    left:-5px;\
                    }\
                    .pv-gallery-sidebar-thumb_selected-bottom {\
                    top:-5px;\
                    }\
                    .pv-gallery-sidebar-thumb_selected-left {\
                    left:5px;\
                    }\
                    .pv-gallery-sidebar-thumb-loading{\
                    position:absolute;\
                    top:0;\
                    left:0;\
                    text-align:center;\
                    width:100%;\
                    height:100%;\
                    display:none;\
                    opacity:0.6;\
                    background:black url("' + prefs.icons.loading + '") no-repeat center ;\
                    }\
                    .pv-gallery-sidebar-thumb-loading:hover{\
                    opacity:0.8;\
                    }\
                    .pv-gallery-sidebar-thumb {\
                    display: inline-block;\
                    vertical-align: middle;\
                    max-width: 100% !important;\
                    max-height: 100% !important;\
                    height: auto !important;\
                    width: auto !important;\
                    }\
                    .pv-gallery-vertical-align-helper{\
                    display:inline-block;\
                    vertical-align:middle;\
                    width:0;\
                    height:100%;\
                    margin:0;\
                    border:0;\
                    padding:0;\
                    visibility:hidden;\
                    white-space:nowrap;\
                    background-color:red;\
                    }\
                    ';
                var head=document.head;
                head.appendChild(style);
                this.globalSSheet=style.sheet;

                var style2=document.createElement('style');
                this.thumbVisibleStyle=style2;
                style2.type='text/css';
                head.appendChild(style2);

                // 让 description 的文字内容溢出用点点点(...)省略号表示
                // .pv-gallery-head-left-img-info-description {
                //      overflow: hidden;
                //     text-overflow: ellipsis;
                //     white-space: nowrap;
                //     width: 27em;
                // }
            },

        };


        GalleryC.prototype.Preload.prototype={//预读对象
            init:function(){
                if(!this.container){//预读的图片都仍里面
                    var div=document.createElement('div');
                    div.className='pv-gallery-preloaded-img-container';
                    div.style.display='none';
                    getBody(document).appendChild(div);
                    GalleryC.prototype.Preload.prototype.container=div;
                };
                this.max=prefs.gallery.max;
                this.nextNumber=0;
                this.nextEle=this.ele;
                this.preNumber=0;
                this.preEle=this.ele;
                this.direction='pre';
            },
            preload:function(){
                var ele=this.getPreloadEle();
                if(!ele){
                    return;
                };

                var self=this;
                this.imgReady=imgReady(dataset(ele,'src'),{
                    loadEnd:function(){
                        if(self.aborted){
                            return;
                        };
                        dataset(ele,'preloaded','true')
                        self.container.appendChild(this);
                        self.preload();
                    },
                    time:60 * 1000,//限时一分钟，否则强制结束并开始预读下一张。
                });
            },
            getPreloadEle:function(){
                if((this.max<=this.nextNumber && this.max<=this.preNumber) || (!this.nextEle && !this.preEle)){
                    return;
                };
                var ele=this.direction=='pre'? this.getNext() : this.getPrevious();
                if(ele && !dataset(ele,'preloaded')){
                    return ele;
                }else{
                    return this.getPreloadEle();
                };
            },
            getNext:function(){
                this.nextNumber++;
                this.direction='next';
                if(!this.nextEle)return;
                return (this.nextEle = this.oriThis.getThumSpan(false,this.nextEle));
            },
            getPrevious:function(){
                this.preNumber++;
                this.direction='pre';
                if(!this.preEle)return;
                return (this.preEle = this.oriThis.getThumSpan(true,this.preEle));
            },
            abort:function(){
                this.aborted=true;
                if(this.imgReady){
                    this.imgReady.abort();
                };
            },
        };


        GalleryC.prototype.Scrollbar.prototype={//滚动条对象
            init:function(){
                var bar=this.scrollbar.bar;
                this.shown=bar.offsetWidth!=0;
                var self=this;
                bar.addEventListener('mousedown',function(e){//点击滚动条区域，该干点什么！
                    e.preventDefault();
                    var target=e.target;
                    var handle=self.scrollbar.handle;
                    var track=self.scrollbar.track;
                    switch(target){
                        case handle:{//手柄；功能，拖动手柄来滚动窗口
                            let pro=self.isHorizontal ? ['left','clientX'] : ['top','clientY'];
                            var oHOffset=parseFloat(handle.style[pro[0]]);
                            var oClient=e[pro[1]];

                            var moveHandler=function(e){
                                self.scroll(oHOffset + e[pro[1]] - oClient,true);
                            };
                            let upHandler=function(){
                                document.removeEventListener('mousemove',moveHandler,true);
                                document.removeEventListener('mouseup',upHandler,true);
                            };
                            document.addEventListener('mousemove',moveHandler,true);
                            document.addEventListener('mouseup',upHandler,true);
                        }break;
                        case track:{//轨道；功能，按住不放来连续滚动一个页面的距离
                            let pro=self.isHorizontal ? ['left','offsetX','layerX','clientWidth','offsetWidth'] : ['top' , 'offsetY' ,'layerY','clientHeight','offsetHeight'];
                            var clickOffset=typeof e[pro[1]]=='undefined' ? e[pro[2]] : e[pro[1]];
                            var handleOffset=parseFloat(handle.style[pro[0]]);
                            var handleSize=handle[pro[4]];
                            var under= clickOffset > handleOffset ;//点击在滚动手柄的下方
                            var containerSize=self.container[pro[3]];

                            var scroll=function(){
                                self.scrollBy(under? (containerSize - 10) : (-containerSize + 10));//滚动一个页面距离少一点
                            };
                            scroll();

                            var checkStop=function(){//当手柄到达点击位置时停止
                                var handleOffset=parseFloat(handle.style[pro[0]]);
                                if(clickOffset >= handleOffset && clickOffset <= (handleOffset + handleSize)){
                                    clearTimeout(scrollTimeout);
                                    clearInterval(scrollInterval);
                                };
                            };


                            var scrollInterval;
                            var scrollTimeout=setTimeout(function(){
                                scroll();
                                scrollInterval=setInterval(function(){
                                    scroll();
                                    checkStop();
                                },120);
                                checkStop();
                            },300);


                            checkStop();

                            let upHandler=function(){
                                clearTimeout(scrollTimeout);
                                clearInterval(scrollInterval);
                                document.removeEventListener('mouseup',upHandler,true);
                            };
                            document.addEventListener('mouseup',upHandler,true);
                        }break;
                    };

                },true);
            },
            reset:function(){//判断滚动条该显示还是隐藏

                var pro=this.isHorizontal ? ['scrollWidth','clientWidth','width'] : ['scrollHeight','clientHeight','height'];

                //如果内容大于容器的content区域

                var scrollSize=this.container[pro[0]];
                var clientSize=this.container[pro[1]];
                var scrollMax=scrollSize - clientSize;
                this.scrollMax=scrollMax;
                if(scrollMax>0){
                    this.show();
                    var trackSize=this.scrollbar.track[pro[1]];
                    this.trackSize=trackSize;
                    var handleSize=Math.floor((clientSize/scrollSize) * trackSize);
                    handleSize=Math.max(20,handleSize);//限制手柄的最小大小;
                    this.handleSize=handleSize;
                    this.one=(trackSize-handleSize) / scrollMax;//一个像素对应的滚动条长度
                    this.scrollbar.handle.style[pro[2]]= handleSize + 'px';
                    this.scroll(this.getScrolled());
                }else{
                    this.hide();
                };
            },
            show:function(){
                if(this.shown)return;
                this.shown=true;
                this.scrollbar.bar.style.display='block';
            },
            hide:function(){
                if(!this.shown)return;
                this.shown=false;
                this.scrollbar.bar.style.display='none';
            },
            scrollBy:function(distance,handleDistance){
                return this.scroll(this.getScrolled() + (handleDistance? distance / this.one : distance));
            },
            scrollByPages:function(num){
                this.scroll(this.getScrolled() + (this.container[(this.isHorizontal ? 'clientWidth' : 'clientHeight')] - 10) * num);
            },
            scroll:function(distance,handleDistance,transition){
                if(!this.shown)return;

                //滚动实际滚动条
                var _distance=distance;
                _distance=handleDistance? distance / this.one : distance;
                _distance=Math.max(0,_distance);
                _distance=Math.min(_distance,this.scrollMax);


                var pro=this.isHorizontal? ['left','scrollLeft'] : ['top','scrollTop'];


                //滚动虚拟滚动条
                //根据比例转换为滚动条上应该滚动的距离。
                distance=handleDistance? distance : this.one * distance;
                //处理非法值
                distance=Math.max(0,distance);//如果值小于0那么取0
                distance=Math.min(distance,this.trackSize - this.handleSize);//大于极限值，取极限值

                var shs=this.scrollbar.handle.style;
                var container=this.container;
                if(transition){
                    clearInterval(this.transitionInterval);

                    var start=0;
                    var duration=10;

                    var cStart=this.getScrolled();
                    var cChange=_distance-cStart;
                    var sStart=parseFloat(shs[pro[0]]);
                    var sChange=distance-sStart;

                    var transitionInterval=setInterval(function(){
                        var cEnd=Tween.Cubic.easeInOut(start,cStart,cChange,duration);
                        var sEnd=Tween.Cubic.easeInOut(start,sStart,sChange,duration);

                        container[pro[1]]=cEnd;
                        shs[pro[0]]=sEnd + 'px';

                        start++;
                        if(start>=duration){
                            clearInterval(transitionInterval);
                        };
                    },35);

                    this.transitionInterval=transitionInterval;

                    return;
                };

                var noScroll=shs[pro[0]].replace(/(\.\d*)?\s*px/,"")==Math.floor(distance);
                shs[pro[0]]=distance + 'px';
                container[pro[1]]=_distance;
                return noScroll;
            },
            getScrolled:function(){
                return this.container[(this.isHorizontal ? 'scrollLeft' : 'scrollTop')];
            },
        };


        //放大镜
        function MagnifierC(img,data){
            this.img=img;
            this.data=data;
            this.init();
        };

        MagnifierC.all=[];
        MagnifierC.styleZIndex=900000000;//全局z-index;

        MagnifierC.prototype={
            init:function(){
                MagnifierC.zoomRange=prefs.magnifier.wheelZoom.range.slice(0).sort((a, b)=>{return a - b});
                MagnifierC.zoomRangeR=MagnifierC.zoomRange.slice(0).reverse();//降序
                this.addStyle();
                MagnifierC.all.push(this);
                var container=document.createElement('span');

                container.className='pv-magnifier-container';
                getBody(document).appendChild(container);

                this.magnifier=container;

                var imgNaturalSize={
                    h:this.img.naturalHeight,
                    w:this.img.naturalWidth,
                };

                this.imgNaturalSize=imgNaturalSize;

                var cs=container.style;
                cs.zIndex=MagnifierC.styleZIndex++;



                var maxDia=Math.ceil(Math.sqrt(Math.pow(1/2*imgNaturalSize.w,2) + Math.pow(1/2*imgNaturalSize.h,2)) * 2);
                this.maxDia=maxDia;

                var radius=prefs.magnifier.radius;
                radius=Math.min(maxDia/2,radius);
                this.radius=radius;
                var diameter=radius * 2;
                this.diameter=diameter;

                cs.width=diameter + 'px';
                cs.height=diameter + 'px';
                cs.borderRadius=radius+1 + 'px';
                cs.backgroundImage='url("'+ this.img.src +'")';
                cs.marginLeft= -radius +'px';
                cs.marginTop= -radius +'px';

                var imgPos=getContentClientRect(this.data.img);
                var wScrolled=getScrolled();
                var imgRange={//图片所在范围
                    x:[imgPos.left + wScrolled.x , imgPos.right + wScrolled.x],
                    y:[imgPos.top + wScrolled.y, imgPos.bottom + wScrolled.y],
                };
                var imgW=imgRange.x[1] - imgRange.x[0];
                var imgH=imgRange.y[1] - imgRange.y[0];
                //如果图片太小的话，进行范围扩大。
                var minSize=60;
                if(imgW < minSize){
                    imgRange.x[1] +=(minSize - imgW)/2;
                    imgRange.x[0] -=(minSize - imgW)/2;
                    imgW=minSize;
                };
                if(imgH < minSize){
                    imgRange.y[1] +=(minSize - imgH)/2;
                    imgRange.y[0] -=(minSize - imgH)/2;
                    imgH=minSize;
                };
                this.imgSize={
                    w:imgW,
                    h:imgH,
                };
                this.imgRange=imgRange;

                this.setMouseRange();


                this.move({
                    pageX:imgRange.x[0],
                    pageY:imgRange.y[0],
                });

                this._focus=this.focus.bind(this);
                this._blur=this.blur.bind(this);
                this._move=this.move.bind(this);
                this._remove=this.remove.bind(this);
                this._pause=this.pause.bind(this);
                this._zoom=this.zoom.bind(this);
                this._clickOut=this.clickOut.bind(this);
                this._keydown=this.keydown.bind(this);

                if(prefs.magnifier.wheelZoom.enabled){
                    this.zoomLevel=1;
                    this.defaultDia=diameter;
                    addWheelEvent(container,this._zoom,false);
                };

                container.addEventListener('mouseover',this._focus,false);
                container.addEventListener('mouseout',this._blur,false);
                container.addEventListener('dblclick',this._remove,false);
                container.addEventListener('click',this._pause,false);


                document.addEventListener('keydown',this._keydown, true);
                document.addEventListener('mousemove',this._move,true);
                document.addEventListener('mouseup',this._clickOut,true);
            },
            addStyle:function(){
                if(MagnifierC.style)return;
                var style=document.createElement('style');
                style.type='text/css';
                MagnifierC.style=style;
                style.textContent='\
                    .pv-magnifier-container{\
                    position:absolute;\
                    padding:0;\
                    margin:0;\
                    background-origin:border-box;\
                    -moz-box-sizing:border-box;\
                    box-sizing:border-box;\
                    border:3px solid #CCCCCC;\
                    background:rgba(40, 40, 40, 0.9) no-repeat;\
                    }\
                    .pv-magnifier-container_focus{\
                    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);\
                    }\
                    .pv-magnifier-container_pause{\
                    border-color:red;\
                    }\
                    ';
                document.head.appendChild(style);
            },
            clickOut:function(e){
                if(!this.magnifier.classList.contains("pv-magnifier-container_focus")){
                    this.remove(e);
                }
            },
            focus:function(){
                this.magnifier.classList.add('pv-magnifier-container_focus');
                this.magnifier.style.zIndex=MagnifierC.styleZIndex++;
            },
            blur:function(){
                this.magnifier.classList.remove('pv-magnifier-container_focus');
            },
            move:function(e){
                var mouseCoor={
                    x:e.pageX,
                    y:e.pageY,
                };
                var mouseRange=this.mouseRange;
                var imgRange=this.imgRange;

                if( !(mouseCoor.x >= mouseRange.x[0] && mouseCoor.x <= mouseRange.x[1] && mouseCoor.y >= mouseRange.y[0] && mouseCoor.y <= mouseRange.y[1]))return;//如果不再鼠标范围
                if(mouseCoor.x > imgRange.x[1]){
                    mouseCoor.x = imgRange.x[1];
                }else if(mouseCoor.x < imgRange.x[0]){
                    mouseCoor.x = imgRange.x[0];
                };
                if(mouseCoor.y > imgRange.y[1]){
                    mouseCoor.y = imgRange.y[1];
                }else if(mouseCoor.y < imgRange.y[0]){
                    mouseCoor.y = imgRange.y[0];
                };

                var ms=this.magnifier.style;
                ms.top= mouseCoor.y + 'px';
                ms.left= mouseCoor.x + 'px';

                var radius=this.radius;
                var imgSize=this.imgSize;
                var imgNaturalSize=this.imgNaturalSize;
                var px=-((mouseCoor.x-imgRange.x[0])/imgSize.w * imgNaturalSize.w) + radius +'px';
                var py=-((mouseCoor.y-imgRange.y[0])/imgSize.h * imgNaturalSize.h) + radius +'px';
                ms.backgroundPosition=px + ' ' + py;
            },
            getNextZoomLevel:function(){
                var level;
                var self=this;
                if(this.zoomOut){//缩小
                    MagnifierC.zoomRangeR.find(function(value){
                        if(value < self.zoomLevel){
                            level=value;
                            return true;
                        }
                    })
                }else{
                    MagnifierC.zoomRange.find(function(value){
                        if(value > self.zoomLevel){
                            level=value;
                            return true;
                        };
                    });
                }
                return level;
            },
            zoom:function(e){
                if(e.deltaY===0)return;//非Y轴的滚动
                if(prefs.magnifier.wheelZoom.pauseFirst && !this.paused)return;
                e.preventDefault();
                if(e.deltaY < 0){//向上滚，放大；
                    if(this.diameter >= this.maxDia)return;
                    this.zoomOut=false;
                }else{
                    this.zoomOut=true;
                };
                var level=this.getNextZoomLevel();
                if(!level)return;

                this.zoomLevel=level;
                var diameter=this.defaultDia * level;
                if(diameter > this.maxDia){
                    diameter = this.maxDia;
                };

                var radius=diameter/2
                this.diameter=diameter;
                var bRadius=this.radius;
                this.radius=radius;
                this.setMouseRange();
                var ms=this.magnifier.style;
                ms.width=diameter+'px';
                ms.height=diameter+'px';
                ms.borderRadius=radius+1 + 'px';
                ms.marginLeft=-radius+'px';
                ms.marginTop=-radius+'px';
                var bBP=ms.backgroundPosition.split(' ');
                ms.backgroundPosition=parseFloat(bBP[0]) + (radius - bRadius) + 'px' + ' ' + (parseFloat(bBP[1]) + ( radius - bRadius) + 'px');

            },
            pause:function(){
                if(this.paused){
                    this.magnifier.classList.remove('pv-magnifier-container_pause');
                    document.addEventListener('mousemove',this._move,true);
                }else{
                    this.magnifier.classList.add('pv-magnifier-container_pause');
                    document.removeEventListener('mousemove',this._move,true);
                };
                this.paused=!this.paused;
            },
            setMouseRange:function(){
                var imgRange=this.imgRange;
                var radius=this.radius;
                this.mouseRange={//鼠标活动范围
                    x:[imgRange.x[0]-radius , imgRange.x[1] + radius],
                    y:[imgRange.y[0]-radius , imgRange.y[1] + radius],
                };
            },
            keydown:function(e){
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.keyCode == 27) this.remove();
                }
            },
            remove:function(e){
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (this.magnifier.parentNode) {
                    this.magnifier.parentNode.removeChild(this.magnifier);
                    MagnifierC.all.splice(MagnifierC.all.indexOf(this),1);
                }
                document.removeEventListener('mousemove',this._move,true);
                document.removeEventListener('mouseup',this._clickOut,true);
                document.removeEventListener('keydown',this._keydown, true);
            },
        };

        //图片窗口
        function ImgWindowC(img, data, actual){
            this.loaded=false;
            this.img=img;
            this.actual=!!actual;
            this.src=data?data.src:img.src;
            this.data = data;

            this.init();
            if(data){
                this.img.src = location.protocol == "https"?data.src.replace(/^http:/,"https:"):data.src;
            }
        };

        ImgWindowC.all=[];//所有的窗口对象
        ImgWindowC.overlayer=null;


        ImgWindowC.prototype={
            init:function(){
                ImgWindowC.showing = true;
                ImgWindowC.zoomRange=prefs.imgWindow.zoom.range.slice(0).sort((a, b)=>{return a - b});
                ImgWindowC.zoomRangeR=ImgWindowC.zoomRange.slice(0).reverse();//降序
                var self=this;
                if(uniqueImgWin && !uniqueImgWin.removed){
                    uniqueImgWin.remove();
                }
                //图片是否已经被打开
                if(ImgWindowC.all.find(function(iwin){
                    if(iwin.src==self.src){
                        iwin.firstOpen();
                        return true;
                    };
                }))return;

                this.addStyle();

                var img=this.img;
                img.className='pv-pic-window-pic pv-pic-ignored transition-transform';
                img.style.cssText='\
                 top:0px;\
                 left:0px;\
                 ';

                var imgNaturalSize={
                    h:img.naturalHeight,
                    w:img.naturalWidth,
                };
                this.imgNaturalSize=imgNaturalSize;
                this.following=false;

                var container=document.createElement('span');
                container.style.cssText='\
                 cursor:pointer;\
                 top:0px;\
                 left:0px;\
                 opacity:0;\
                 background:black url("'+prefs.icons.loading+'") center no-repeat;\
                 ';
                container.className='pv-pic-window-container';
                container.innerHTML=createHTML(
                    '<span class="pv-pic-window-imgbox"></span>'+
                    '<span class="pv-pic-window-center"></span>'+
                    '<span class="pv-pic-window-rotate-indicator">'+
                    '<span class="pv-pic-window-rotate-indicator-pointer"></span>'+
                    '</span>'+
                    '<span class="pv-pic-window-rotate-overlayer"></span>'+
                    '<span class="pv-pic-window-toolbar" unselectable="on">'+
                    '<span class="pv-pic-window-tb-hand pv-pic-window-tb-tool" title="'+i18n("hand")+'"></span>'+
                    '<span class="pv-pic-window-tb-tool-badge-container pv-pic-window-tb-tool-extend-menu-container">'+
                    '<span class="pv-pic-window-tb-rotate pv-pic-window-tb-tool" title="'+i18n("rotate")+'(r)"></span>'+
                    '<span class="pv-pic-window-tb-tool-badge">0</span>'+
                    '<span class="pv-pic-window-tb-tool-extend-menu pv-pic-window-tb-tool-extend-menu-rotate">'+
                    '<span class="pv-pic-window-tb-tool-extend-menu-item" title="+90"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4332"><path d="M435.2 362.666667l179.2-179.2L435.2 0 375.466667 59.733333l76.8 76.8H341.333333c-119.466667 0-213.333333 93.866667-213.333333 213.333334v170.666666h85.333333v-170.666666c0-72.533333 55.466667-128 128-128h115.2L375.466667 302.933333l59.733333 59.733334zM853.333333 384H426.666667c-25.6 0-42.666667 17.066667-42.666667 42.666667v426.666666c0 25.6 17.066667 42.666667 42.666667 42.666667h426.666666c25.6 0 42.666667-17.066667 42.666667-42.666667V426.666667c0-25.6-17.066667-42.666667-42.666667-42.666667z m-42.666666 426.666667h-341.333334v-341.333334h341.333334v341.333334z" p-id="4333"></path></svg></span>'+
                    '<span class="pv-pic-window-tb-tool-extend-menu-item" title="-90"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4595"><path d="M682.666667 136.533333h-115.2l76.8-76.8L588.8 0 405.333333 179.2l179.2 179.2L644.266667 298.666667l-76.8-76.8H682.666667c72.533333 0 128 55.466667 128 128v170.666666h85.333333v-170.666666c0-115.2-93.866667-213.333333-213.333333-213.333334zM597.333333 384H170.666667c-25.6 0-42.666667 17.066667-42.666667 42.666667v426.666666c0 25.6 17.066667 42.666667 42.666667 42.666667h426.666666c25.6 0 42.666667-17.066667 42.666667-42.666667V426.666667c0-25.6-17.066667-42.666667-42.666667-42.666667z m-42.666666 426.666667H213.333333v-341.333334h341.333334v341.333334z" p-id="4596"></path></svg></span>'+
                    '<span class="pv-pic-window-tb-tool-extend-menu-item" title="0"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3716"><path d="M867.89 574.16a30.73 30.73 0 0 0-37.52 21.92c-38 144.83-169.31 246-319.25 246a330.71 330.71 0 0 1-306.27-206.82h60.29l-92.78-123.5-91.82 123.5h58.88q1.23 3.72 2.53 7.4A391.65 391.65 0 0 0 511.12 903.5c177.86 0 333.58-120 378.69-291.82a30.73 30.73 0 0 0-21.92-37.52zM153.88 452.57a30.69 30.69 0 0 0 37.35-22.2A329.68 329.68 0 0 1 511.12 182c136.8 0 256.58 82 306.4 207h-60.66l92.78 123.5L941.46 389h-58.58a391.63 391.63 0 0 0-751.2 26.24 30.73 30.73 0 0 0 22.2 37.33z" p-id="3717"></path></svg></span>'+
                    '</span>'+
                    '</span>'+
                    '<span class="pv-pic-window-tb-tool-badge-container pv-pic-window-tb-tool-extend-menu-container">'+
                    '<span class="pv-pic-window-tb-zoom pv-pic-window-tb-tool" title="'+i18n("scale")+'(z)"></span>'+
                    '<span class="pv-pic-window-tb-tool-badge">0</span>'+
                    '<span class="pv-pic-window-tb-tool-extend-menu pv-pic-window-tb-tool-extend-menu-zoom">'+
                    '<span id="pv-pic-zoom-in" class="pv-pic-window-tb-tool-extend-menu-item" title="+0.1"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3134"><path d="M754.2 151.5h-89.5v42.7h89.5c59.5 0 108 48.4 108 108v67.6h42.7v-67.6c0-83.1-67.6-150.7-150.7-150.7zM862.2 737.3c0 59.5-48.4 108-108 108h-89.5V888h89.5c83.1 0 150.7-67.6 150.7-150.7v-67.6h-42.7v67.6zM166.3 737.8v-67.6h-42.7v67.6c0 83.1 67.6 150.7 150.7 150.7h89.5v-42.7h-89.5c-59.5 0-108-48.4-108-108zM416.3 261.8h-42.8v126H247.6v42.7h125.9V556h42.8V430.5h125.4v-42.7H416.3zM773.6 789.4l30.2-30.2-190.1-190.6c32.7-44.8 52-99.9 52-159.5 0-149.7-121.6-271.3-271.3-271.3-149.3 0-271.3 121.6-271.3 271.3 0 149.3 121.5 271.3 271.3 271.3 74.5 0 142.3-30.3 191.4-79.3l187.8 188.3zM394.4 637.7c-126 0-228.6-102.5-228.6-228.6s102.5-228.6 228.6-228.6S623 283.1 623 409.2 520.5 637.7 394.4 637.7z" p-id="3135"></path></svg></span>'+
                    '<span id="pv-pic-zoom-out" class="pv-pic-window-tb-tool-extend-menu-item" title="-0.1"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2674"><path d="M754.2 151.5h-89.5v42.7h89.5c59.5 0 108 48.4 108 108v67.6h42.7v-67.6c0-83.1-67.6-150.7-150.7-150.7zM862.2 737.3c0 59.5-48.4 108-108 108h-89.5V888h89.5c83.1 0 150.7-67.6 150.7-150.7v-67.6h-42.7v67.6zM166.3 737.8v-67.6h-42.7v67.6c0 83.1 67.6 150.7 150.7 150.7h89.5v-42.7h-89.5c-59.5 0-108-48.4-108-108zM247.6 387.8h294.2v42.7H247.6zM773.6 789.4l30.2-30.2-190.1-190.6c32.7-44.8 52-99.9 52-159.5 0-149.7-121.6-271.3-271.3-271.3-149.3 0-271.3 121.6-271.3 271.3 0 149.3 121.6 271.3 271.3 271.3 74.5 0 142.3-30.3 191.4-79.3l187.8 188.3zM394.4 637.7c-126 0-228.6-102.5-228.6-228.6s102.5-228.6 228.6-228.6S623 283.1 623 409.2 520.5 637.7 394.4 637.7z" p-id="2675"></path></svg></span>'+
                    '<span class="pv-pic-window-tb-tool-extend-menu-item" title="1"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3716"><path d="M867.89 574.16a30.73 30.73 0 0 0-37.52 21.92c-38 144.83-169.31 246-319.25 246a330.71 330.71 0 0 1-306.27-206.82h60.29l-92.78-123.5-91.82 123.5h58.88q1.23 3.72 2.53 7.4A391.65 391.65 0 0 0 511.12 903.5c177.86 0 333.58-120 378.69-291.82a30.73 30.73 0 0 0-21.92-37.52zM153.88 452.57a30.69 30.69 0 0 0 37.35-22.2A329.68 329.68 0 0 1 511.12 182c136.8 0 256.58 82 306.4 207h-60.66l92.78 123.5L941.46 389h-58.58a391.63 391.63 0 0 0-751.2 26.24 30.73 30.73 0 0 0 22.2 37.33z" p-id="3717"></path></svg></span>'+
                    '</span>'+
                    '</span>'+
                    '<span class="pv-pic-window-tb-flip-horizontal pv-pic-window-tb-command" title="'+i18n("horizontalFlip")+'"></span>'+
                    '<span class="pv-pic-window-tb-flip-vertical pv-pic-window-tb-command" title="'+i18n("verticalFlip")+'"></span>'+
                    '<span class="pv-pic-window-tb-compare pv-pic-window-tb-command" title="'+i18n("compareBtn")+'"></span>'+
                    '</span>'+
                    '<span class="pv-pic-window-max"  title="'+i18n("gallery")+'(g)"></span>' +
                    '<span class="pv-pic-window-close"></span>' +
                    '<svg class="pv-pic-window-scrollSign" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse ry="501.5" rx="331.5" cy="510.78408" cx="514.68283" stroke="#000" fill="#fff"/><path d="M512 212.468019m-43.132605 0a43.132605 43.132605 0 1 0 86.26521 0 43.132605 43.132605 0 1 0-86.26521 0ZM512 383.400936m-43.132605 0a43.132605 43.132605 0 1 0 86.26521 0 43.132605 43.132605 0 1 0-86.26521 0ZM512 554.333853m-43.132605 0a43.132605 43.132605 0 1 0 86.26521 0 43.132605 43.132605 0 1 0-86.26521 0ZM609.447738 651.781591L512 749.229329l-97.447738-97.447738c-17.572543-17.572543-43.132605-17.572543-59.107644 0s-17.572543 43.132605 0 59.107645l127.800312 127.800312c7.98752 7.98752 20.767551 12.780031 30.352574 12.780031s20.767551-4.792512 30.352574-12.780031l127.800312-127.800312c17.572543-17.572543 17.572543-43.132605 0-59.107645-19.170047-17.572543-44.730109-17.572543-62.302652 0zM555.132605 0h-84.667706C302.726989 0 171.731669 132.592824 171.731669 298.733229v426.533542c0 166.140406 132.592824 298.733229 298.73323 298.733229h84.667706c166.140406 0 298.733229-132.592824 298.73323-298.733229V298.733229C852.268331 132.592824 721.273011 0 555.132605 0zM767.600624 723.669267c0 119.812793-94.25273 212.468019-212.468019 212.468018h-84.667706c-119.812793 0-212.468019-94.25273-212.468019-212.468018V298.733229c0-119.812793 94.25273-212.468019 212.468019-212.468018h84.667706c119.812793 0 212.468019 94.25273 212.468019 212.468018v424.936038z"></path></svg>' +
                    //'<span class="pv-pic-window-search" title="'+i18n("similarImage")+'"></span>' +
                    '<span class="pv-pic-window-range"></span>' +
                    '<span class="pv-pic-window-description"></span>'+
                    '<span class="pv-pic-window-pre"></span>'+
                    '<span class="pv-pic-window-next"></span>'+
                    '<span class="pv-pic-search-state"></span>');

                container.firstChild.appendChild(img);

                this.imgWindow=container;

                var toolMap={
                    'hand':container.querySelector('.pv-pic-window-tb-hand'),
                    'rotate':container.querySelector('.pv-pic-window-tb-rotate'),
                    'zoom':container.querySelector('.pv-pic-window-tb-zoom'),
                    'fh':container.querySelector('.pv-pic-window-tb-flip-horizontal'),
                    'fv':container.querySelector('.pv-pic-window-tb-flip-vertical'),
                    'compare':container.querySelector('.pv-pic-window-tb-compare')
                };
                this.toolMap=toolMap;

                var preButton=container.querySelector('.pv-pic-window-pre');
                preButton.addEventListener('click',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    self.switchImage(false);
                },false);
                var nextButton=container.querySelector('.pv-pic-window-next');
                nextButton.addEventListener('click',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    self.switchImage(true);
                },false);
                if (gallery && (gallery.shown || gallery.minimized)) {
                    preButton.style.display = "none";
                    nextButton.style.display = "none";
                }
                this.imgState = container.querySelector('.pv-pic-search-state');
                this.preButton = container.querySelector('.pv-pic-window-pre');
                this.nextButton = container.querySelector('.pv-pic-window-next');

                //关闭
                var closeButton=container.querySelector('.pv-pic-window-close');
                closeButton.style.cssText='top: -24px;right: 0px;';
                this.closeButton=closeButton;
                closeButton.addEventListener('click',function(e){
                    self.remove();
                },false);

                var maxButton=container.querySelector('.pv-pic-window-max');
                maxButton.style.cssText='top: -24px;right: 46px;';
                this.maxButton=maxButton;
                maxButton.addEventListener('click',function(e){
                    if(!gallery){
                        gallery=new GalleryC();
                        gallery.data=[];
                    }
                    var allData=gallery.getAllValidImgs();
                    if(allData.length<1)return;
                    allData.target={src:img.src};
                    gallery.data=allData;
                    gallery.load(gallery.data);
                    self.remove();
                },false);

                //var searchButton=container.querySelector('.pv-pic-window-search');
                //searchButton.style.cssText='top: -24px;right: 50px;';
                //this.searchButton=searchButton;
                var srcs, from;
                img.onerror=function(e){
                    //setSearchState(i18n("loadNextSimilar"),img.parentNode);
                    console.info(img.src+" "+i18n("loadError"));
                    if(self.removed || !self.data)return;
                    var src;
                    if(self.data.srcs)
                        src=self.data.srcs.shift();
                    if(src)img.src=src;
                    else{
                        if(img.src!=self.data.imgSrc)
                            img.src=self.data.imgSrc;
                        return;
                        if(from<searchSort.length){
                            from++;
                            searchImgByImg(self.img.src, self.img.parentNode, function(srcs, index){
                                from=index;
                                self.data.srcs=srcs;
                                self.img.src=srcs.shift();
                            },null,null,from);
                        }else{
                            setSearchState(i18n("findNoPic"), self.imgState);
                            setTimeout(function(){
                                setSearchState("", self.imgState);
                            },2000);
                        }
                    }
                };
                img.onload = function(e) {
                    if (self.removed) return;
                    self.loaded = true;
                    container.style.background='';
                    if (img.naturalHeight == 1 && img.naturalWidth == 1) {
                        self.remove();
                        return;
                    }
                    //self.imgWindow.classList.remove("pv-pic-window-transition-all");
                    self.imgWindow.style.display = "";
                    setSearchState(img.naturalWidth + " x " + img.naturalHeight, self.imgState);
                    self.imgNaturalSize = {
                        h:img.naturalHeight,
                        w:img.naturalWidth,
                    };
                    if (self==uniqueImgWin && prefs.floatBar.globalkeys.previewFollowMouse) {
                        self.following=true;
                        self.followPos(uniqueImgWinInitX, uniqueImgWinInitY);
                    } else {
                        if (!self.imgWindow.classList.contains("pv-pic-window-scroll")) {
                            self.zoomLevel=0;
                            self.zoom(1);
                        }
                        if (prefs.imgWindow.fitToScreen) {
                            self.fitToScreen();
                        }
                        self.center(true, true);
                    }
                    self.imgWindow.style.opacity = 1;
                    self.keepScreenInside();

                    var wSize = getWindowSize();
                    wSize.h -= 16;
                    wSize.w -= 16;
                    self.isLongImg = self.imgNaturalSize.h >= wSize.h && self.imgNaturalSize.h / self.imgNaturalSize.w > 2.5;
                }
                if (imgNaturalSize.h && imgNaturalSize.w) {
                    container.style.background='';
                    setSearchState(img.naturalWidth + " x " + img.naturalHeight, self.imgState);
                }
                /*searchButton.addEventListener('click',function(e){
                    sortSearch();
                    searchImgByImg(self.img.src, self.img.parentNode, function(srcs, index){
                        from=index;
                        self.srcs=srcs;
                        self.img.src=srcs.shift();
                    });
                },false);*/

                /**
                * 说明
                * 1、对原来的适应屏幕等功能会有影响，暂时禁用。
                * 2、分为 absolute 和默认的2种情况
                */
                if (this.data) {
                    var descriptionSpan = container.querySelector('.pv-pic-window-description');
                    // descriptionSpan.style.cssText = '\
                    //  bottom: -40px;\
                    //  left: 10px;\
                    // ';
                    descriptionSpan.textContent = this.data.description || '';
                    // descriptionSpan.style.display = this.data.description ? 'block' : 'none';
                    descriptionSpan.style.display = 'none';
                    this.descriptionSpan = descriptionSpan;
                }

                var toolbar=container.querySelector('.pv-pic-window-toolbar');
                toolbar.style.cssText='\
                top: 0px;\
                left: -45px;\
                ';
                this.toolbar=toolbar;

                this.selectedToolClass='pv-pic-window-tb-tool-selected';

                this.viewRange=container.querySelector('.pv-pic-window-range');

                this.rotateIndicator=container.querySelector('.pv-pic-window-rotate-indicator');
                this.rotateIPointer=container.querySelector('.pv-pic-window-rotate-indicator-pointer');
                this.rotateOverlayer=container.querySelector('.pv-pic-window-rotate-overlayer');


                this.hKeyUp=true;
                this.rKeyUp=true;
                this.zKeyUp=true;

                this.spaceKeyUp=true;
                this.ctrlKeyUp=true;
                this.altKeyUp=true;
                this.shiftKeyUp=true;
                this.moving=false;

                container.querySelector('.pv-pic-window-center').addEventListener('mousedown', function(e) {
                    var target = e.target;
                    target.style.display = "none";
                    setTimeout(() => {
                        target.style.display = "";
                    }, 500);
                },true);
                //缩放工具的扩展菜单
                container.querySelector('.pv-pic-window-tb-tool-extend-menu-zoom').addEventListener('click',function(e){
                    var target=e.target;
                    var text=target.title;
                    var value;
                    switch(text){
                        case '1':{
                            value=1;
                        }break;
                        case '+0.1':{
                            value=self.zoomLevel + 0.1;
                        }break;
                        case '-0.1':{
                            value=self.zoomLevel - 0.1;
                        }break;
                    };
                    if(typeof value!='undefined'){
                        self.zoom(value,{x:0,y:0});
                    };
                },true);

                //旋转工具的扩展菜单
                container.querySelector('.pv-pic-window-tb-tool-extend-menu-rotate').addEventListener('click',function(e){
                    var target=e.target;
                    var text=target.title;
                    var value;
                    function convert(deg){
                        return deg * Math.PI/180;
                    };

                    switch(text){
                        case '0':{
                            value=0;
                        }break;
                        case '+90':{
                            value=self.rotatedRadians + convert(90);
                        }break;
                        case '-90':{
                            value=self.rotatedRadians - convert(90);
                        }break;
                    };

                    var PI=Math.PI;
                    if(typeof value!='undefined'){
                        if(value>=2*PI){
                            value-=2*PI;
                        }else if(value<0){
                            value+=2*PI;
                        };
                        self.rotate(value,true);
                    };
                },true);

                toolbar.addEventListener('mousedown',function(e){//鼠标按下选择工具
                    self.toolbarEventHandler(e);
                },false);


                toolbar.addEventListener('dblclick',function(e){//鼠标双击工具
                    self.toolbarEventHandler(e);
                },false);


                //阻止浏览器对图片的默认控制行为
                img.addEventListener('mousedown',function(e){
                    e.preventDefault();
                },false);


                container.addEventListener('mousedown',function(e){//当按下的时，执行平移，缩放，旋转操作
                    self.imgWindowEventHandler(e);
                },false);

                container.addEventListener('touchstart',function(e){//当按下的时，执行平移，缩放，旋转操作
                    self.imgWindowEventHandler(e);
                },{ passive: true, capture: false });

                container.addEventListener('click',function(e){//阻止opera ctrl+点击保存图片
                    self.imgWindowEventHandler(e);
                },false);

                if(prefs.imgWindow.zoom.mouseWheelZoom){//是否使用鼠标缩放
                    addWheelEvent(container,function(e){//滚轮缩放
                        self.imgWindowEventHandler(e);
                    },false);
                };



                //是否点击图片外部关闭
                if(prefs.imgWindow.overlayer.shown && prefs.imgWindow.close.clickOutside){
                    var clickOutside=function(e){
                        var target=e.target;
                        if(!container.contains(target)){
                            self.remove();
                            document.removeEventListener(prefs.imgWindow.close.clickOutside,clickOutside,true);
                        };
                    };
                    this.clickOutside=clickOutside;
                    document.addEventListener(prefs.imgWindow.close.clickOutside,clickOutside,true);
                };

                //是否双击图片本身关闭
                if(prefs.imgWindow.close.dblClickImgWindow){
                    var dblClickImgWindow=function(e){
                        var target=e.target;
                        if(target==container || target==img || target.className=='pv-pic-window-center' || target==self.imgState || target==self.rotateOverlayer){
                            self.remove();
                        };
                        e.preventDefault();
                        e.stopPropagation();
                    };
                    container.addEventListener('dblclick',dblClickImgWindow,true);
                };


                ImgWindowC.all.push(this);

                this._blur=this.blur.bind(this);
                this._focusedKeydown=this.focusedKeydown.bind(this);
                this._focusedKeyup=this.focusedKeyup.bind(this);

                if(prefs.imgWindow.overlayer.shown){//是否显示覆盖层
                    var overlayer=ImgWindowC.overlayer;
                    if(!overlayer){
                        overlayer=document.createElement('span');
                        ImgWindowC.overlayer=overlayer;
                        overlayer.className='pv-pic-window-overlayer';
                    };
                    overlayer.style.backgroundColor=prefs.imgWindow.overlayer.color;
                    getBody(document).appendChild(overlayer);
                    overlayer.style.display='block';
                };
                if(prefs.imgWindow.backgroundColor){
                    this.imgWindow.style.backgroundColor=prefs.imgWindow.backgroundColor;
                }
                getBody(document).appendChild(container);

                this.rotatedRadians=0;//已经旋转的角度
                this.zoomLevel=0;
                this.zoom(1);
                this.setToolBadge('zoom',1);

                this.firstOpen();
                this.imgWindow.style.opacity=1;

                //选中默认工具
                this.selectTool(prefs.imgWindow.defaultTool);
            },
            geneCompareImg: function(src, percent) {
                let parent = document.createElement("div");
                let compareImgCon = document.createElement("div");
                compareImgCon.className = "compareImgCon";
                let compareImg = document.createElement("img");
                let compareSlider = document.createElement("div");
                compareSlider.className = "compareSlider";
                compareSlider.title = "Right mouse to bottom, hold to top";
                compareImgCon.style.width = percent + "%";
                compareSlider.style.left = percent + "%";
                let compareSliderButton = document.createElement("button");
                let self = this;
                let upTimer;
                let mouseMoveHandler = e => {
                    clearTimeout(upTimer);
                    if (compareSliderButton.style.display == "") {
                        document.removeEventListener("mousemove", mouseMoveHandler);
                        document.removeEventListener("touchmove", mouseMoveHandler);
                        return;
                    }
                    e = (e.changedTouches) ? e.changedTouches[0] : e;
                    let a = self.img.getBoundingClientRect();
                    let x = e.pageX - a.left;
                    x = x - window.pageXOffset;
                    if (x < 0) x = 0;
                    if (x > a.width) x = a.width;
                    compareImgCon.style.width = x / a.width * 100 + "%";
                    compareSlider.style.left = x / a.width * 100 + "%";
                };
                let beginSlide = e => {
                    compareSliderButton.style.display = "none";
                    clearTimeout(upTimer);
                    upTimer = setTimeout(() => {
                        self.compareBox.appendChild(parent);
                    }, 1000);
                    document.addEventListener("mousemove", mouseMoveHandler);
                    document.addEventListener("touchmove", mouseMoveHandler);
                    e.preventDefault();
                    e.stopPropagation();
                    let mouseUpHandler = e => {
                        clearTimeout(upTimer);
                        compareSliderButton.style.display = "";
                        document.removeEventListener("mousemove", mouseMoveHandler);
                    };
                    document.addEventListener("mouseup", mouseUpHandler);
                    document.addEventListener("touchend", mouseUpHandler);
                };
                compareSlider.addEventListener("mousedown", beginSlide);
                compareSlider.addEventListener("contextmenu", e => {
                    self.compareBox.insertBefore(parent, self.compareBox.firstChild);
                    e.preventDefault();
                    e.stopPropagation();
                });
                compareSlider.addEventListener("touchstart", beginSlide);
                compareSlider.appendChild(compareSliderButton);
                compareImg.src = src;
                compareImgCon.appendChild(compareImg);
                parent.appendChild(compareImgCon);
                parent.appendChild(compareSlider);
                return parent;
            },
            compare: function(otherSrcs) {
                if (!otherSrcs || otherSrcs.length === 0) return;
                if (!this.compareBox) {
                    let compareBox = document.createElement("div");
                    compareBox.className = "compareBox";
                    this.compareBox = compareBox;
                    this.img.parentNode.appendChild(compareBox);
                    this.imgWindow.classList.add("compare");
                }
                this.compareBox.innerHTML = createHTML("");
                let self = this, count = 0;
                otherSrcs.forEach(src => {
                    count++;
                    let percent = 100 - count * (100 / (otherSrcs.length + 1));
                    let compareImg = self.geneCompareImg(src, percent);
                    self.compareBox.appendChild(compareImg);
                });
            },
            switchImage:function(fw){
                if (!gallery) {
                    gallery = new GalleryC();
                    gallery.data = [];
                }
                if (gallery.shown || gallery.minimized) {
                    return;
                }
                var allData = gallery.getAllValidImgs();
                if (allData.length <= 1) return;
                for (let i = 0; i < allData.length; i++) {
                    let imgData = allData[i];
                    if (imgData.img == this.data.img) {
                        if (fw) {
                            if (i != allData.length - 1) {
                                i++;
                                imgData = allData[i];
                                while (imgData && imgData.img && imgData.img.parentNode && imgData.img.parentNode.classList.contains("pv-pic-window-container")) {
                                    i++;
                                    if (i == allData.length) return;
                                    imgData = allData[i];
                                }
                                if (imgData && imgData.img) {
                                    this.remove();
                                    new LoadingAnimC(imgData, (this.actual ? "actual" : "current"), false, true);
                                }
                            }
                        } else {
                            if (i != 0) {
                                i--;
                                imgData = allData[i];
                                while (imgData && imgData.img && imgData.img.parentNode && imgData.img.parentNode.classList.contains("pv-pic-window-container")) {
                                    i--;
                                    if (i == -1) return;
                                    imgData = allData[i];
                                }
                                if (imgData) {
                                    this.remove();
                                    new LoadingAnimC(imgData, (this.actual ? "actual" : "current"), false, true);
                                }
                            }
                        }
                        return;
                    }
                }
            },
            changeData:function(result){
                if(this.src != result.src){
                    //this.imgWindow.classList.add("pv-pic-window-transition-all");
                    this.loaded = false;
                    this.data = result;
                    this.src = result.src;
                    this.img.src = location.protocol == "https"?result.src.replace(/^https?:/,""):result.src;
                }
            },
            addStyle:function(){
                if(ImgWindowC.style)return;
                var style=document.createElement('style');
                ImgWindowC.style=style;
                style.textContent='\
                    .pv-pic-window-container {\
                    position: absolute;\
                    background-color: rgba(40,40,40,0.8);\
                    padding: 8px;\
                    border: 0;\
                    border-radius: 1px;\
                    line-height: 0;\
                    text-align: left;\
                    box-sizing: content-box;\
                    -webkit-transition: opacity 0.1s ease-out;\
                    transition: opacity 0.1s ease-out;\
                    overscroll-behavior: none;\
                    box-shadow: 0 0 10px 5px rgba(0,0,0,0.6);\
                    box-sizing: content-box;\
                    }\
                    .pv-pic-window-transition-all{\
                    -webkit-transition: top 0.2s ease, left 0.2s ease;\
                    transition: top 0.2s ease, left 0.2s ease;\
                    }\
                    .pv-pic-window-container_focus {\
                    border: 5px solid rgb(255 255 255 / 50%);\
                    }\
                    .pv-pic-window-imgbox {\
                    position: relative;\
                    display: block;\
                    }\
                    .pv-pic-window-container .compareBox {\
                    position: absolute;\
                    top: 0;\
                    left: 0;\
                    width: 100%;\
                    height: 100%;\
                    pointer-events: none;\
                    }\
                    .pv-pic-window-container .compareBox>div {\
                    width: 100%;\
                    height: 100%;\
                    position: absolute;\
                    }\
                    .pv-pic-window-container .compareBox>div>.compareImgCon {\
                    width: 100%;\
                    max-width: 100%;\
                    height: 100%;\
                    overflow: hidden;\
                    }\
                    .pv-pic-window-container .compareBox>div>.compareImgCon>img {\
                    width: auto;\
                    height: 100%;\
                    max-width: unset;\
                    }\
                    .pv-pic-window-container .compareBox>div>.compareSlider {\
                    position: absolute;\
                    top: 0;\
                    bottom: 0;\
                    width: 2px;\
                    background-color: rgba(255,255,255,.5);\
                    border-top: 0;\
                    border-bottom: 0;\
                    box-shadow: 0 0 2px rgba(0,0,0,.5);\
                    }\
                    .pv-pic-window-container .compareBox>div>.compareSlider>button {\
                    position: absolute;\
                    top: calc(50% - 40px);\
                    left: -4px;\
                    width: 10px;\
                    background-color: #ddd;\
                    border: 4px solid #fff;\
                    height: 80px;\
                    text-align: center;\
                    padding: 0;\
                    outline: 0;\
                    cursor: ew-resize;\
                    box-shadow: 0 0 2px rgba(0,0,0,.5);\
                    pointer-events: all;\
                    }\
                    .pv-pic-window-container .compareBox>div>.compareSlider>button:hover {\
                    background-color: #777;\
                    }\
                    .pv-pic-window-close,\
                    .pv-pic-window-max,\
                    .pv-pic-window-search,\
                    .pv-pic-window-toolbar,\
                    .pv-pic-window-tb-tool-extend-menu{\
                    -webkit-transition: opacity 0.2s ease-in-out;\
                    transition: opacity 0.2s ease-in-out;\
                    }\
                    .pv-pic-window-toolbar {\
                    position: absolute;\
                    background-color: #535353;\
                    padding: 0;\
                    opacity: 0.7;\
                    display: none;\
                    cursor: default;\
                    -o-user-select: none;\
                    -webkit-user-select: none;\
                    -moz-user-select: -moz-none;\
                    user-select: none;\
                    }\
                    .pv-pic-window-toolbar:hover {\
                    opacity: 1;\
                    }\
                    .pv-pic-window-container_focus>.pv-pic-window-toolbar {\
                    display: block;\
                    }\
                    .pv-pic-window-close {\
                    cursor: pointer;\
                    position: absolute;\
                    right: 0px;\
                    top: -24px;\
                    background: url("'+prefs.icons.close+'") no-repeat center bottom;\
                    height: 17px;\
                    width: 46px;\
                    opacity: 0.7;\
                    border:none;\
                    padding:0;\
                    padding-top:2px;\
                    background-color:#1771FF;\
                    display: none;\
                    z-index: 2;\
                    }\
                    .pv-pic-window-close:hover {\
                    background-color:red;\
                    opacity: 1;\
                    }\
                    .pv-pic-window-container_focus>.pv-pic-window-close {\
                    display: block;\
                    }\
                    .pv-pic-window-search {\
                    cursor: pointer;\
                    position: absolute;\
                    right: 50px;\
                    top: -24px;\
                    background: url("'+prefs.icons.searchBtn+'") no-repeat center bottom;\
                    height: 17px;\
                    width: 46px;\
                    opacity: 0.9;\
                    border:none;\
                    padding:0;\
                    padding-top:2px;\
                    background-color:#1771FF;\
                    display: none;\
                    }\
                    .pv-pic-window-max {\
                    cursor: pointer;\
                    position: absolute;\
                    right: 46px;\
                    top: -24px;\
                    background: url("'+prefs.icons.maxBtn+'") no-repeat center bottom;\
                    height: 17px;\
                    width: 46px;\
                    opacity: 0.7;\
                    border:none;\
                    border-right: 1px solid #868686;\
                    padding:0;\
                    padding-top:2px;\
                    background-color:#1771FF;\
                    display: none;\
                    z-index: 2;\
                    }\
                    .pv-pic-window-max:hover {\
                    background-color:red;\
                    opacity: 1;\
                    }\
                    .pv-pic-window-container_focus>.pv-pic-window-max {\
                    display: block;\
                    }\
                    .pv-pic-window-search:hover {\
                    background-color:red;\
                    opacity: 1;\
                    }\
                    .pv-pic-window-container_focus>.pv-pic-window-search {\
                    display: block;\
                    }\
                    .pv-pic-window-description {\
                    margin-top: 20px;\
                    min-height: 20px;\
                    }\
                    .pv-pic-window-pre,\
                    .pv-pic-window-next{\
                    -webkit-transition: opacity 0.3s ease;\
                    transition: opacity 0.3s ease;\
                    position: absolute;\
                    height: 100px;\
                    top: calc(50% - 50px);\
                    width: 36px;\
                    background: #ffffff60 no-repeat center;\
                    opacity: 0;\
                    cursor: pointer;\
                    pointer-events: none;\
                    }\
                    .pv-pic-window-pre {\
                    left: 8px;\
                    background-image: url("'+prefs.icons.arrowLeft+'");\
                    }\
                    .pv-pic-window-next {\
                    right: 8px;\
                    background-image: url("'+prefs.icons.arrowRight+'");\
                    }\
                    .compare>.pv-pic-window-center {\
                    display: none;\
                    }\
                    .pv-pic-window-center {\
                    position: absolute;\
                    height: 20%;\
                    width: 20%;\
                    top: 40%;\
                    left: 40%;\
                    opacity: 0;\
                    }\
                    .pv-pic-window-container>.pv-pic-window-center:hover~.pv-pic-search-state {\
                    opacity: 0;\
                    }\
                    .pv-pic-window-container_focus .pv-pic-window-imgbox:hover~.pv-pic-window-pre,\
                    .pv-pic-window-container_focus .pv-pic-window-imgbox:hover~.pv-pic-window-next{\
                    opacity:0.3;\
                    pointer-events: all;\
                    }\
                    .pv-pic-window-container>.pv-pic-window-pre:hover,\
                    .pv-pic-window-container>.pv-pic-window-next:hover{\
                    opacity:1;\
                    pointer-events: all;\
                    }\
                    .pv-pic-window-container:hover>.pv-pic-search-state{\
                    border-radius: 0 0 8px 0;\
                    top: 8px;\
                    opacity:0.8;\
                    }\
                    .pv-pic-window-container>span.pv-pic-search-state:hover{\
                    opacity:0;\
                    }\
                    .pv-pic-search-state {\
                    top: -12px;\
                    left: 8px;\
                    display: block;\
                    position: absolute;\
                    z-index: 1;\
                    color: #ffff00;\
                    height: 18px;\
                    line-height: 18px;\
                    background: rgb(0 0 0 / 80%);\
                    border-radius: 1px 1px 0 0;\
                    padding: 1px 5px;\
                    white-space: nowrap;\
                    overflow: hidden;\
                    opacity:0.5;\
                    font-size: small;\
                    transition: all 0.3s ease;\
                    user-select: none;\
                    -webkit-box-sizing: content-box;\
                    box-sizing: content-box;\
                    }\
                    .pv-pic-window-container_focus>.pv-pic-search-state {\
                    top: -25px;\
                    }\
                    .pv-pic-window-scrollSign {\
                    display: none;\
                    width: 100px;\
                    height: auto;\
                    fill: black;\
                    top: 10px;\
                    right: 8px;\
                    position: absolute;\
                    opacity: 0;\
                    -webkit-animation: scroll_sign_opacity 2s 3 ease-in-out;\
                    animation: scroll_sign_opacity 2s 3 ease-in-out;\
                    }\
                    @-webkit-keyframes scroll_sign_opacity {\
                      0% { opacity: 0 }\
                      50% { opacity: 1 }\
                      100% { opacity: 0 }\
                    }\
                    @keyframes scroll_sign_opacity {\
                      0% { opacity: 0 }\
                      50% { opacity: 1 }\
                      100% { opacity: 0 }\
                    }\
                    .pv-pic-window-scroll {\
                    max-height: 100vh;\
                    max-width: 100vw;\
                    overflow: scroll;\
                    }\
                    .pv-pic-window-scroll>.pv-pic-window-scrollSign {\
                    display: block;\
                    }\
                    .pv-pic-window-scroll>.pv-pic-window-close,\
                    .pv-pic-window-scroll>.pv-pic-window-max,\
                    .pv-pic-window-scroll>.pv-pic-window-pre,\
                    .pv-pic-window-scroll>.pv-pic-window-next,\
                    .pv-pic-window-scroll>.pv-pic-search-state {\
                    display: none;\
                    }\
                    .transition-transform{\
                    transition: transform 0.3s ease;\
                    }\
                    .transition-all{\
                    transition: all 0.3s ease;\
                    }\
                    .pv-pic-window-pic {\
                    position: relative;\
                    display:inline-block;\/*opera把图片设置display:block会出现渲染问题，会有残影，还会引发其他各种问题，吓尿*/\
                    max-width:unset;\
                    min-width:unset;\
                    max-height:unset;\
                    min-height:unset;\
                    width:inherit;\
                    height:inherit;\
                    padding:0;\
                    margin:0;\
                    border:none;\
                    vertical-align:middle;\
                    }\
                    .pv-pic-window-container_focus .pv-pic-window-pic {\
                    box-shadow: 0 0 6px black;\
                    background: linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100% ), linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100% );\
                    background-size: 20px 20px;\
                    background-position: 0 0, 10px 10px;\
                    }\
                    .pv-pic-window-tb-tool,\
                    .pv-pic-window-tb-command{\
                    box-sizing:content-box;\
                    -moz-box-sizing:content-box;\
                    -webkit-box-sizing:content-box;\
                    height: 24px;\
                    width: 24px;\
                    padding: 12px 8px 6px 6px;\
                    margin:0;\
                    display: block;\
                    background: transparent no-repeat center;\
                    cursor: pointer;\
                    position: relative;\
                    border: none;\
                    border-left: 2px solid transparent;\
                    border-bottom: 1px solid #868686;\
                    background-origin: content-box;\
                    }\
                    .pv-pic-window-toolbar > span:last-child {\
                    border-bottom: none;\
                    }\
                    .pv-pic-window-tb-tool:hover,\
                    .pv-pic-window-tb-command:hover{\
                    border-left: 2px solid red;\
                    }\
                    .pv-pic-window-tb-tool-selected{\
                    box-shadow: inset 0 21px 0 rgba(255,255,255,0.3) ,inset 0 -21px 0 rgba(0,0,0,0.3);\
                    border-left:2px solid #1771FF;\
                    }\
                    .pv-pic-window-tb-hand {\
                    background-image: url("'+prefs.icons.hand+'");\
                    }\
                    .pv-pic-window-tb-rotate {\
                    background-image: url("'+prefs.icons.rotate+'");\
                    }\
                    .pv-pic-window-tb-zoom {\
                    background-image: url("'+prefs.icons.zoom+'");\
                    }\
                    .pv-pic-window-tb-flip-horizontal {\
                    background-image: url("'+prefs.icons.flipHorizontal+'");\
                    }\
                    .pv-pic-window-tb-flip-vertical {\
                    background-image: url("'+prefs.icons.flipVertical+'");\
                    }\
                    .pv-pic-window-tb-compare {\
                    background-image: url("'+prefs.icons.compare+'");\
                    }\
                    .pv-pic-window-tb-tool-badge-container {\
                    display: block;\
                    position: relative;\
                    }\
                    .pv-pic-window-tb-tool-badge {\
                    position: absolute;\
                    top: -3px;\
                    right: 1px;\
                    font-size: 10px;\
                    line-height: 1.5;\
                    padding: 0 3px;\
                    background-color: #F93;\
                    border-radius: 50px;\
                    opacity: 0.5;\
                    color: black;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu{\
                    position:absolute;\
                    top:0;\
                    margin-left:-1px;\
                    background-color:#535353;\
                    display:none;\
                    left:40px;\
                    color:#C3C3C3;\
                    font-size:12px;\
                    text-shadow:0px -1px 0px black;\
                    opacity:0.7;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu:hover{\
                    opacity:0.9;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-item{\
                    display:block;\
                    line-height:1.5;\
                    text-align:center;\
                    padding:10px;\
                    cursor:pointer;\
                    border: none;\
                    border-right: 2px solid transparent;\
                    border-bottom: 1px solid #868686;\
                    font-size: 20px;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-item>svg{\
                    pointer-events: none;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-item:last-child{\
                    border-bottom: none;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-item:hover{\
                    border-right:2px solid red;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-item:active{\
                    padding:11px 9px 9px 11px;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-container:hover .pv-pic-window-tb-tool{\
                    border-left:2px solid red;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-container:hover .pv-pic-window-tb-tool-extend-menu{\
                    display:block;\
                    }\
                    .pv-pic-window-tb-tool-extend-menu-container::after{\
                    content:"";\
                    position:absolute;\
                    right:1px;\
                    bottom:2px;\
                    width:0;\
                    height:0;\
                    padding:0;\
                    margin:0;\
                    border:3px solid #C3C3C3;\
                    border-top-color:transparent;\
                    border-left-color:transparent;\
                    opacity:0.5;\
                    }\
                    .pv-pic-window-overlayer{\
                    height:100%;\
                    width:100%;\
                    position:fixed;\
                    top:0;\
                    left:0;\
                    z-index: '+prefs.imgWindow.zIndex+';\
                    }\
                    .pv-pic-window-rotate-indicator{\
                    display:none;\
                    position:fixed;\
                    width:250px;\
                    height:250px;\
                    padding:10px;\
                    margin-top:-135px;\
                    margin-left:-135px;\
                    background:transparent url("'+ prefs.icons.rotateIndicatorBG +'") no-repeat center;\
                    }\
                    .pv-pic-window-rotate-indicator-pointer{\
                    display:block;\
                    margin-left:auto;\
                    margin-right:auto;\
                    background:transparent url("'+ prefs.icons.rotateIndicatorPointer +'") no-repeat center;\
                    width:60px;\
                    height:240px;\
                    position:relative;\
                    top:5px;\
                    transform:rotate(0.1deg);\
                    }\
                    .pv-pic-window-rotate-overlayer{/*当切换到旋转工具的时候显示这个覆盖层，然后旋转指示器显示在这个覆盖层的下面*/\
                    position:absolute;\
                    top:0;\
                    bottom:0;\
                    left:0;\
                    right:0;\
                    display:none;\
                    background-color:transparent;\
                    }\
                    .pv-pic-window-range{\
                    position:absolute;\
                    border:none;\
                    width:100px;\
                    height:100px;\
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);\
                    display:none;\
                    padding:0;\
                    background-color:rgba(255, 0, 0, 0.150);\
                    }\
                    .pv-pic-window-container::-webkit-scrollbar { width: 0 !important }\
                    .pv-pic-window-container { -ms-overflow-style: none;overflow: -moz-scrollbars-none; }\
                    ';
                document.head.appendChild(style);
            },

            firstOpen:function(){
                ImgWindowC.selectedTool='hand';
                this.imgWindow.classList.remove("pv-pic-window-scroll");
                this.focus();
                var imgWindow=this.imgWindow;
                var scrolled=getScrolled();
                imgWindow.style.left=-5 + scrolled.x + 'px';
                imgWindow.style.top=-5 + scrolled.y + 'px';

                //window的尺寸
                var wSize=getWindowSize();
                //空隙
                wSize.h -= 16;
                wSize.w -= 16;

                var imgWindowCS=unsafeWindow.getComputedStyle(imgWindow);
                var rectSize={
                    h:parseFloat(imgWindowCS.height),
                    w:parseFloat(imgWindowCS.width),
                };
                this.isLongImg=rectSize.h > wSize.h && rectSize.h/rectSize.w > 2.5;
                if(prefs.imgWindow.suitLongImg && this.isLongImg){
                    this.center(rectSize.w <= wSize.w,false);
                    this.imgWindow.classList.add("pv-pic-window-scroll");
                }else if(prefs.imgWindow.fitToScreen){
                    this.fitToScreen();
                    this.center(true,true);
                }else{
                    this.center(rectSize.w <= wSize.w , rectSize.h <= wSize.h);
                }

                this.keepScreenInside();
            },
            keepScreenInside:function(){//保持按钮在屏幕里面.
                var imgWindow=this.imgWindow;
                var imgWindowFullSize={
                    h:imgWindow.offsetHeight,
                    w:imgWindow.offsetWidth,
                };

                var windowSize=getWindowSize();

                function keepSI(obj,offsetDirection,defaultValue, out){
                    var objRect=obj.getBoundingClientRect();
                    var objStyle=obj.style;

                    while(offsetDirection.length){
                        var oD=offsetDirection[0];
                        var oDV=defaultValue[0];
                        var outV=0;
                        if(out)outV=out.shift();
                        offsetDirection.shift();
                        defaultValue.shift();
                        var oValue=parseFloat(objStyle[oD]);
                        var newValue;
                        switch(oD){
                            case 'top':
                                newValue=oValue - objRect.top - outV;
                                if(objRect.top-outV<=0){
                                    newValue=Math.min(newValue,imgWindowFullSize.h);
                                }else{
                                    newValue=Math.max(newValue,oDV);
                                };
                                break;
                            case 'right':
                                newValue=oValue + (objRect.right - windowSize.w) + outV;
                                if(objRect.right+outV >= windowSize.w){//屏幕外
                                    newValue=Math.min(newValue,imgWindowFullSize.w);
                                }else{
                                    newValue=Math.max(newValue,oDV);
                                };
                                break;
                            case 'bottom':
                                newValue=oValue + (objRect.bottom - windowSize.h) + outV;
                                if(objRect.bottom+outV >= windowSize.h){//屏幕外
                                    newValue=Math.min(newValue,imgWindowFullSize.h);
                                }else{
                                    newValue=Math.max(newValue,oDV);
                                };
                                break;
                            case 'left':
                                newValue=oValue - objRect.left - outV;
                                if(objRect.left-outV<=0){
                                    newValue=Math.min(newValue,imgWindowFullSize.w);
                                }else{
                                    newValue=Math.max(newValue,oDV);
                                }
                                break;
                        }
                        objStyle[oD]=newValue + 'px';

                    }
                }

                keepSI(this.closeButton,['top','right'],[-24,0]);
                keepSI(this.maxButton,['top','right'],[-24,46],[0,46]);
                //keepSI(this.searchButton,['top','right'],[-24,50]);
                keepSI(this.toolbar,['top','left'],[0,-45]);

                // 保持注释在图片里面
                // keepSI(this.descriptionSpan,['bottom', 'left'],[-40, 10]);
            },
            followPos:function(posX, posY){
                if(this.removed)return;
                if(!prefs.floatBar.globalkeys.previewFollowMouse)return;
                var imgWindow=this.imgWindow;
                if(!imgWindow)return;
                this.followPosX = posX;
                this.followPosY = posY;
                if(!this.following){
                    clearTimeout(this.followPosTimer);
                    this.followPosTimer=setTimeout(() => {
                        this.following=true;
                        imgWindow.classList.add("pv-pic-window-transition-all");
                        this.followPos(this.followPosX, this.followPosY);
                    }, 50);
                    return;
                }
                this.following=false;
                var wSize=getWindowSize();
                this.zoom(1);
                if(prefs.imgWindow.fitToScreen && !imgWindow.classList.contains("pv-pic-window-scroll")){
                    var imgWindowCS=unsafeWindow.getComputedStyle(imgWindow);
                    var rectSize={
                        h:parseFloat(imgWindowCS.height),
                        w:parseFloat(imgWindowCS.width),
                    };

                    var size;
                    if(prefs.imgWindow.fitToScreenSmall || (rectSize.w - wSize.w>0 || rectSize.h - wSize.h>0)){
                        if(rectSize.w/rectSize.h > wSize.w/wSize.h){
                            size={
                                w:wSize.w,
                                h:wSize.w / (rectSize.w/rectSize.h),
                            };
                        }else{
                            size={
                                h:wSize.h,
                                w:wSize.h * (rectSize.w/rectSize.h),
                            }
                        };

                        this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);
                    }
                }

                var scrolled=getScrolled();
                var maxWidth, maxHeight, left, top;
                var self=this;
                function resizeWithLimit(){
                    if(imgWindow.offsetWidth>maxWidth || imgWindow.offsetHeight>maxHeight){
                        var size;
                        if(imgWindow.offsetWidth/imgWindow.offsetHeight > maxWidth/maxHeight){
                            size={
                                w:maxWidth,
                                h:maxWidth / (imgWindow.offsetWidth/imgWindow.offsetHeight),
                            };
                        }else{
                            size={
                                h:maxHeight,
                                w:maxHeight * (imgWindow.offsetWidth/imgWindow.offsetHeight),
                            }
                        };

                        self.zoom(self.getRotatedImgCliSize(size).w/self.imgNaturalSize.w);
                    }
                }
                if(imgWindow.offsetWidth/imgWindow.offsetHeight>wSize.w/wSize.h){
                    //宽条，上下半屏
                    maxWidth = wSize.w;
                    if(posY > wSize.h / 2){
                        //上
                        maxHeight=posY-50;
                        resizeWithLimit();
                        imgWindow.style.top=posY - imgWindow.offsetHeight - 25 + scrolled.y +'px';
                    }else{
                        //下
                        maxHeight=wSize.h-posY-50;
                        resizeWithLimit();
                        imgWindow.style.top=posY + 25 + scrolled.y +'px';
                    }
                    let left=(wSize.w - imgWindow.offsetWidth) / 2;
                    let maxLeft=posX+50;
                    if(left>maxLeft)left=maxLeft;
                    else {
                        let minLeft=posX-imgWindow.offsetWidth-50;
                        if(left<minLeft)left=minLeft;
                    }
                    imgWindow.style.left=left + scrolled.x +'px';
                }else{
                    //窄条，左右半屏
                    maxHeight = wSize.h;
                    if(posX > wSize.w / 2){
                        //左
                        maxWidth=posX-50;
                        resizeWithLimit();
                        imgWindow.style.left=posX - imgWindow.offsetWidth - 25 + scrolled.x +'px';
                    }else{
                        //右
                        maxWidth=wSize.w-posX-50;
                        resizeWithLimit();
                        imgWindow.style.left=posX + 25 + scrolled.x +'px';
                    }
                    let top=(wSize.h - imgWindow.offsetHeight) / 2;
                    let maxTop=posY+50;
                    if(top>maxTop)top=maxTop;
                    else {
                        let minTop=posY-imgWindow.offsetHeight-50;
                        if(top<minTop)top=minTop;
                    }
                    imgWindow.style.top=top + scrolled.y +'px';
                }
            },
            fitToScreen:function(){
                var imgWindow=this.imgWindow;
                if(!prefs.imgWindow.fitToScreen || imgWindow.classList.contains("pv-pic-window-scroll"))return;
                var wSize=getWindowSize();
                //空隙
                wSize.h -= 26;
                wSize.w -= 26;

                var imgWindowCS=unsafeWindow.getComputedStyle(imgWindow);
                var rectSize={
                    h:parseFloat(imgWindowCS.height),
                    w:parseFloat(imgWindowCS.width),
                };

                var size;
                if(prefs.imgWindow.fitToScreenSmall || (rectSize.w - wSize.w>0 || rectSize.h - wSize.h>0)){//超出屏幕，那么缩小。
                    if(rectSize.w/rectSize.h > wSize.w/wSize.h){
                        size={
                            w:wSize.w,
                            h:wSize.w / (rectSize.w/rectSize.h),
                        };
                    }else{
                        size={
                            h:wSize.h,
                            w:wSize.h * (rectSize.w/rectSize.h),
                        }
                    };

                    this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);
                };
            },
            center:function(horizontal,vertical){
                if(!horizontal && !vertical)return;
                var imgWindow=this.imgWindow;
                if(!imgWindow)return;
                var wSize=getWindowSize();
                var scrolled=getScrolled();
                if(horizontal)imgWindow.style.left = (wSize.w - imgWindow.offsetWidth)/2 + scrolled.x +'px';
                if(vertical)imgWindow.style.top = (wSize.h - imgWindow.offsetHeight)/2 + scrolled.y + (prefs.imgWindow.suitLongImg && this.isLongImg ? 13 : 0) +'px';
            },


            move:function(e){
                this.working=true;
                var cursor=this.cursor;
                this.changeCursor('handing');

                var mouseCoor={
                    x:e.pageX || e.touches[0].pageX,
                    y:e.pageY || e.touches[0].pageY,
                };
                var imgWindow=this.imgWindow;
                var imgWStyle=imgWindow.style;
                var oriOffset={
                    left:parseFloat(imgWStyle.left),
                    top:parseFloat(imgWStyle.top),
                };
                var self=this;
                var moveHandler=function(e){
                    imgWStyle.left=oriOffset.left+ (e.pageX || e.touches[0].pageX)-mouseCoor.x +'px';
                    imgWStyle.top=oriOffset.top + (e.pageY || e.touches[0].pageY)-mouseCoor.y +'px';
                    self.keepScreenInside();
                    self.moving=true;
                };
                var mouseupHandler=function(){
                    e.preventDefault();
                    self.changeCursor(cursor);
                    self.working=false;
                    if(self.tempHand && self.spaceKeyUp){//如果是临时切换到抓手工具，平移完成后返回上个工具
                        self.tempHand=false;
                        self.changeCursor(self.selectedTool);
                    };
                    document.removeEventListener('mousemove',moveHandler,true);
                    document.removeEventListener('mouseup',mouseupHandler,true);
                    document.removeEventListener('touchmove',moveHandler,true);
                    document.removeEventListener('touchend',mouseupHandler,true);
                };
                document.addEventListener('mousemove',moveHandler,true);
                document.addEventListener('mouseup',mouseupHandler,true);
                document.addEventListener('touchmove',moveHandler,true);
                document.addEventListener('touchend',mouseupHandler,true);
            },
            rotate:function(origin,topLeft){

                var img=this.img;
                var imgWindow=this.imgWindow;

                var iTransform=img.style[support.cssTransform].replace(/rotate\([^)]*\)/i,'');

                var imgWindowCS=unsafeWindow.getComputedStyle(imgWindow);
                var imgRectSize={
                    h:parseFloat(imgWindowCS.height),
                    w:parseFloat(imgWindowCS.width),
                };

                var rectOffset={
                    top:parseFloat(imgWindow.style.top),
                    left:parseFloat(imgWindow.style.left),
                };

                var imgSize={
                    h:img.clientHeight,
                    w:img.clientWidth,
                };

                var imgOffset={
                    top:parseFloat(img.parentNode.style.top),
                    left:parseFloat(img.parentNode.style.left),
                };

                var self=this;
                var PI=Math.PI;

                var rotate = function (radians) {
                    if (self.rotatedRadians == radians) return;
                    if (self.working) {
                        img.parentNode.style[support.cssTransform] = ' rotate(' + radians + 'rad) ' + iTransform;
                    } else {
                        img.parentNode.classList.remove("transition-transform");
                        if(Math.abs(self.rotatedRadians-radians)==1.5*PI){
                            //img.style[support.cssTransform] = ' rotate('+ (self.rotatedRadians<radians?self.rotatedRadians+2*PI:self.rotatedRadians-2*PI) +'rad) ' + iTransform;
                            img.parentNode.style[support.cssTransform] = ' rotate('+ radians +'rad) ' + iTransform;
                            //setTimeout(()=>{
                                //img.classList.add("transition-all");
                                //img.classList.add("transition-transform");
                            //},0);
                        }else{
                            //img.classList.add("transition-all");
                            img.parentNode.style[support.cssTransform] = ' rotate('+ radians +'rad) ' + iTransform;//旋转图片
                        }
                        setTimeout(()=>{
                            img.parentNode.classList.add("transition-transform");
                        },0);
                    }
                    //setTimeout(()=>{
                        //img.classList.remove("transition-all");
                    //},300);
                    self.rotateIPointer.style[support.cssTransform]='rotate('+ radians +'rad)';//旋转指示器

                    self.rotatedRadians=radians;
                    self.setToolBadge('rotate',radians/(PI/180));

                    var afterimgRectSize=self.getRotatedImgRectSize( radians, imgSize );
                    imgWindow.style.width=afterimgRectSize.w +'px';
                    imgWindow.style.height=afterimgRectSize.h + 'px';

                    if(!topLeft){
                        self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize);
                    };

                    self.setImgOffset(imgOffset,imgRectSize,afterimgRectSize);
                    self.keepScreenInside();
                };


                if(typeof origin=='number'){
                    rotate(origin);
                    return;
                };


                this.working=true;

                var lastRotatedRadians=this.rotatedRadians;
                this.shiftKeyUp=true;
                var shiftRotateStep=prefs.imgWindow.shiftRotateStep / (180/Math.PI);//转成弧度

                var moveHandler=function(e){
                    self.rotateIndicator.style.display='block';
                    var radians=lastRotatedRadians + Math.atan2( e.clientY - origin.y, e.clientX - origin.x );
                    if(radians>=2*PI){
                        radians-=2*PI;
                    }else if(radians<0){
                        radians+=2*PI;
                    };

                    if(!self.shiftKeyUp){//如果按下了shift键，那么步进缩放
                        radians -= radians % shiftRotateStep;
                        radians += shiftRotateStep;
                    };
                    rotate(radians);
                };

                var mouseupHandler=function(){
                    self.working=false;
                    self.rotateIndicator.style.display='none';
                    document.removeEventListener('mousemove',moveHandler,true);
                    document.removeEventListener('mouseup',mouseupHandler,true);
                    self.img.classList.add("transition-transform");
                };

                self.img.classList.remove("transition-transform");
                document.addEventListener('mousemove',moveHandler,true);
                document.addEventListener('mouseup',mouseupHandler,true);
            },
            convertToValidRadians:function(radians){
                //转成0-90的等价角度。
                var PI=Math.PI;
                if(radians > PI){
                    radians = 2*PI - radians;
                };
                if(radians > 1/2*PI){
                    radians = PI - radians;
                };
                return radians;
            },
            getRotatedImgRectSize:function( radians, imgSize ){//通过旋转后的角度和图片的大小，求虚拟矩形的大小
                imgSize= imgSize ? imgSize :{
                    h:this.img.clientHeight,
                    w:this.img.clentWidth,
                };

                if(typeof radians==='undefined'){
                    radians = this.rotatedRadians;
                };

                radians=this.convertToValidRadians(radians);

                return {
                    h:this.notExponential(imgSize.h* Math.cos(radians) + imgSize.w * Math.sin(radians)),
                    w:this.notExponential(imgSize.h* Math.sin(radians) + imgSize.w * Math.cos(radians)),
                };
            },
            getRotatedImgCliSize:function(rectSize,radians){//通过虚拟矩形的大小和图片的旋转角度，求图片的大小

                if(typeof radians==='undefined'){
                    radians = this.rotatedRadians;
                };

                radians=this.convertToValidRadians(radians);

                if(radians==0){
                    //radians=Math.PI/180 * 1/100;
                    return rectSize;
                };

                var h=(rectSize.h-rectSize.w * Math.tan(radians))/(Math.cos(radians)-Math.sin(radians)*Math.tan(radians));
                var w=(rectSize.h - h*Math.cos(radians))/Math.sin(radians);
                return {
                    h:h,
                    w:w,
                };

            },
            setImgOffset:function(oriOffset,bImgSize,aImgSize){
                var imgStyle=this.img.parentNode.style;

                //避免出现指数形式的数字和单位相加，导致变成无效值
                var top=this.notExponential(oriOffset.top + (aImgSize.h-bImgSize.h)*1/2) + 'px';
                var left=this.notExponential(oriOffset.left + (aImgSize.w-bImgSize.w)*1/2) + 'px';
                imgStyle.top= top;
                imgStyle.left= left;
            },
            setImgWindowOffset:function(oriOffset,bImgWindowSize,aImgWidnowSize,ratio){
                ratio= ratio? ratio : {x:1/2,y:1/2};
                var imgWindowStyle=this.imgWindow.style;
                var top=oriOffset.top - (aImgWidnowSize.h-bImgWindowSize.h)*ratio.y + 'px';
                var left=oriOffset.left - (aImgWidnowSize.w-bImgWindowSize.w)*ratio.x + 'px';
                imgWindowStyle.top= top;
                imgWindowStyle.left= left;
            },
            zoom:function(e,ratio){//e可能是undefined,可能是事件对象，可能是直接的缩放级别数字
                var imgWindow=this.imgWindow;
                var imgWindowCS=unsafeWindow.getComputedStyle(imgWindow);
                var imgRectSize={
                    h:parseFloat(imgWindowCS.height),
                    w:parseFloat(imgWindowCS.width),
                };

                var rectOffset={
                    top:parseFloat(imgWindow.style.top),
                    left:parseFloat(imgWindow.style.left),
                };

                var img=this.img;
                var self=this;

                var zoom=function(level){//缩放到指定级别
                    if(typeof level=='undefined' || level<0 || level==self.zoomLevel)return;

                    var afterImgSize={
                        h:self.imgNaturalSize.h * level || 10,
                        w:self.imgNaturalSize.w * level || 10,
                    };
                    img.width=afterImgSize.w;
                    img.height=afterImgSize.h;
                    img.parentNode.style.width=afterImgSize.w + 'px';
                    img.parentNode.style.height=afterImgSize.h + 'px';
                    if (afterImgSize.w < 60) {
                        self.imgState.style.display = "none";
                    } else {
                        self.imgState.style.display = "";
                    }
                    if (afterImgSize.w < 100 || afterImgSize.h < 100) {
                        self.preButton.style.left = "-28px";
                        self.nextButton.style.right = "-28px";
                    } else {
                        self.preButton.style.left = "8px";
                        self.nextButton.style.right = "8px";
                    }

                    var afterimgRectSize=self.getRotatedImgRectSize( self.rotatedRadians, afterImgSize );
                    imgWindow.style.width=afterimgRectSize.w +'px';
                    imgWindow.style.height=afterimgRectSize.h + 'px';
                    self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize,ratio);
                    self.setImgOffset({top:0,left:0},afterImgSize,afterimgRectSize);//如果旋转了，调整偏移
                    self.zoomLevel=level;
                    self.setToolBadge('zoom',level);
                    self.keepScreenInside();
                };

                if(typeof e!='object'){
                    ratio=ratio? ratio : {
                        x:1/2,
                        y:1/2,
                    };
                    zoom(e);
                    return;
                };

                this.working=true;

                ratio=this.getZoomRatio({
                    x:e.clientX,
                    y:e.clientY,
                });


                var moved;
                var lastPageX=e.pageX;
                var currentLevel=this.zoomLevel;
                var moveFired=0;
                var moveHandler=function(e){
                    moveFired++
                    if(moveFired < 2){//有时候点击的时候不小心会触发一发move
                        return;
                    };
                    moved=true;
                    var pageX=e.pageX;
                    var level;
                    if(pageX > lastPageX){//向右移，zoomin扩大
                        self.changeCursor('zoom',false);
                        level=0.05;
                    }else{//向左移，zoomout缩小
                        self.changeCursor('zoom',true);
                        level=-0.05;
                    };
                    lastPageX=pageX;
                    currentLevel += level;
                    zoom(currentLevel);
                };

                var mouseupHandler=function(e){
                    self.working=false;
                    document.removeEventListener('mousemove',moveHandler,true);
                    document.removeEventListener('mouseup',mouseupHandler,true);

                    var level=self.getNextZoomLevel();

                    if(self.zoomOut && self.altKeyUp){
                        self.zoomOut=false;
                    };

                    if(!moved){//如果没有平移缩放。
                        zoom(level);
                    };

                    self.changeCursor('zoom',self.zoomOut);

                    if(self.tempZoom && self.ctrlKeyUp && self.altKeyUp){
                        self.tempZoom=false;
                        self.changeCursor(self.selectedTool);
                    };

                };

                document.addEventListener('mousemove',moveHandler,true);
                document.addEventListener('mouseup',mouseupHandler,true);
            },
            getNextZoomLevel:function(){
                var level;
                var self=this;
                if(this.zoomOut){//缩小
                    ImgWindowC.zoomRangeR.find(function(value){
                        if(value < self.zoomLevel){
                            level=value;
                            return true;
                        }
                    })
                }else{
                    ImgWindowC.zoomRange.find(function(value){
                        if(value > self.zoomLevel){
                            level=value;
                            return true;
                        };
                    });
                }
                return level;
            },
            getZoomRatio:function(mouseCoor){
                var ibcRect=this.img.getBoundingClientRect();
                var ratio={
                    x:(mouseCoor.x-ibcRect.left)/ibcRect.width,
                    y:(mouseCoor.y-ibcRect.top)/ibcRect.height,
                };
                if(ratio.x<0){
                    ratio.x=0
                }else if(ratio.x>1){
                    ratio.x=1
                };
                if(ratio.y<0){
                    ratio.y=0
                }else if(ratio.y>1){
                    ratio.y=1
                };
                return ratio;
            },
            aerialView:function(e){
                this.working=true;
                //记住现在的缩放比例
                var cLevel=this.zoomLevel;

                var wSize=getWindowSize();
                wSize.h -= 16;
                wSize.w -= 16;

                var imgWindow=this.imgWindow;
                var imgWindowCS=unsafeWindow.getComputedStyle(imgWindow);
                var rectSize={
                    h:parseFloat(imgWindowCS.height),
                    w:parseFloat(imgWindowCS.width),
                };
                var rectRatio=rectSize.h/rectSize.w;
                var windowRatio=wSize.h/wSize.w;

                var size;
                var rangeSize={};
                if(rectRatio > windowRatio){
                    size={
                        h:wSize.h,
                        w:wSize.h / rectRatio,
                    };
                    rangeSize.h=Math.min(wSize.h *  (size.h / rectSize.h), size.h);
                    rangeSize.w=Math.min(rangeSize.h / windowRatio , size.w);
                }else{
                    size={
                        w:wSize.w,
                        h:wSize.w * rectRatio,
                    };
                    rangeSize.w=Math.min(wSize.w *  (size.w / rectSize.w), size.w);
                    rangeSize.h=Math.min(rangeSize.w * windowRatio , size.h);
                };


                this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);

                this.center(true,true);

                this.keepScreenInside();

                var viewRange=this.viewRange;
                var vRS=viewRange.style;
                vRS.display='block';
                vRS.height=rangeSize.h + 'px';
                vRS.width=rangeSize.w + 'px';
                vRS.top=0 + 'px';
                vRS.left=0 + 'px';



                var viewRangeRect=viewRange.getBoundingClientRect();
                var scrolled=getScrolled();
                var viewRangeCenterCoor={
                    x:viewRangeRect.left + scrolled.x + 1/2 * rangeSize.w,
                    y:viewRangeRect.top + scrolled.y + 1/2 * rangeSize.h,
                };

                var self=this;

                var moveRange={
                    x:[8,8+size.w-rangeSize.w],
                    y:[8,8+size.h-rangeSize.h]
                };


                function setViewRangePosition(pageXY){
                    var top=pageXY.y - viewRangeCenterCoor.y;
                    var left=pageXY.x - viewRangeCenterCoor.x;
                    if(top<=moveRange.y[0]){
                        top=moveRange.y[0];
                    }else if(top>=moveRange.y[1]){
                        top=moveRange.y[1];
                    };
                    vRS.top= top + 'px';
                    if(left<=moveRange.x[0]){
                        left=moveRange.x[0];
                    }else if(left>=moveRange.x[1]){
                        left=moveRange.x[1];
                    };
                    vRS.left= left + 'px';
                };

                setViewRangePosition({
                    x:e.pageX,
                    y:e.pageY,
                });

                var moveHandler=function(e){
                    setViewRangePosition({
                        x:e.pageX,
                        y:e.pageY,
                    });
                };

                var mouseupHandler=function(){
                    self.working=false;
                    viewRange.style.display='none';
                    self.zoom(cLevel);
                    var scrolled=getScrolled();
                    imgWindow.style.top= -13 -  rectSize.h * ((parseFloat(vRS.top) - moveRange.y[0])/size.h) + scrolled.y +'px';
                    imgWindow.style.left= -13 - rectSize.w * ((parseFloat(vRS.left) - moveRange.x[0])/size.w) + scrolled.x +'px';

                    //说明图片的高度没有屏幕高，居中
                    //说明图片的宽度没有屏幕宽，居中
                    self.center(rangeSize.w == size.w , rangeSize.h == size.h);

                    self.keepScreenInside();

                    document.removeEventListener('mousemove',moveHandler,true);
                    document.removeEventListener('mouseup',mouseupHandler,true);
                };
                document.addEventListener('mousemove',moveHandler,true);
                document.addEventListener('mouseup',mouseupHandler,true);
            },
            setToolBadge:function(tool,content){
                var scale=0;
                switch(tool){
                    case 'zoom':{
                        scale=2;
                    }break;
                    case 'rotate':{
                        scale=1;
                    }break;
                    default:break;
                }
                content=typeof content=='string'? content : content.toFixed(scale);
                this.toolMap[tool].nextElementSibling.textContent=content;
            },
            notExponential:function(num){//不要转为指数形势
                if(num>0){
                    if(num >= 999999999999999934463){
                        return  999999999999999934463;
                    }else if(num <= 0.000001){
                        return 0.000001;
                    };
                }else if(num < 0){
                    if(num >= -0.000001){
                        return -0.000001;
                    }else if(num <= -999999999999999934463){
                        return -999999999999999934463
                    };
                };

                return num;
            },

            blur:function(e){
                if(!this.focused)return;
                ImgWindowC.showing = false;
                var imgWindow =this.imgWindow;
                //点击imgWinodw的外部的时候失去焦点
                if(e!==true && imgWindow.contains(e.target))return;
                imgWindow.classList.remove('pv-pic-window-container_focus');
                document.removeEventListener('mousedown',this._blur,true);
                document.removeEventListener('keydown',this._focusedKeydown,false);
                document.removeEventListener('keyup',this._focusedKeyup,true);
                this.changeCursor('default');
                ImgWindowC.selectedTool=this.selectedTool;
                this.imgWindow.style.zIndex= prefs.imgWindow.zIndex;
                this.zIndex=prefs.imgWindow.zIndex;
                this.focused=false;
            },
            focus:function(){
                if(this.focused)return;
                this.toolMap.compare.style.display = ImgWindowC.all.length > 1 ? "" : "none";
                ImgWindowC.showing = true;
                this.imgWindow.classList.add('pv-pic-window-container_focus');
                this.imgWindow.style.zIndex=prefs.imgWindow.zIndex+1;
                this.zIndex=prefs.imgWindow.zIndex+1;
                document.addEventListener('keydown',this._focusedKeydown,false);
                document.addEventListener('keyup',this._focusedKeyup,true);
                document.addEventListener('mousedown',this._blur,true);

                //还原鼠标样式。
                this.changeCursor(this.selectedTool);

                if(prefs.imgWindow.syncSelectedTool && ImgWindowC.selectedTool){
                    this.selectTool(ImgWindowC.selectedTool);
                };

                this.focused=true;
            },
            focusedKeyup:function(e){
                var keyCode=e.keyCode;
                var valid=[32,18,16,72,17,72,82,90,67,37,39];
                if(valid.indexOf(keyCode)==-1)return;

                e.preventDefault();

                switch(keyCode){
                    case 32:{//空格键，临时切换到移动
                        this.spaceKeyUp=true;
                        if(!this.tempHand)return;//如果之前没有临时切换到抓手工具（当已经在工作的时候，按下空格不会临时切换到抓手工具）
                        if(!this.working){//松开按键的时候，没有在继续平移了。
                            this.tempHand=false;
                            this.changeCursor(this.selectedTool);
                        };
                    }break;
                    case 18:{//alt键盘切换缩小放大。
                        this.altKeyUp=true;
                        if(!this.zoomOut)return;
                        if(!this.working){
                            this.zoomOut=false;
                            this.changeCursor('zoom');
                            if(this.tempZoom && this.ctrlKeyUp){
                                this.tempZoom=false;
                                this.changeCursor(this.selectedTool);
                            };
                        };
                    }break;
                    case 16://shift键，旋转的时候按住shift键，步进缩放。
                        this.shiftKeyUp=true;
                        break;
                    case 17:{//ctrl键
                        clearTimeout(this.ctrlkeyDownTimer);
                        if(!this.justCKeyUp){//如果刚才没有松开c，规避划词软件的ctrl+c松开
                            this.ctrlKeyUp=true;
                            if(!this.tempZoom)return;//如果没有切换到了缩放
                            if(!this.working && this.altKeyUp){
                                this.tempZoom=false;
                                this.changeCursor(this.selectedTool);
                            };
                        };
                    }break;
                    case 67:{//c键
                        this.justCKeyUp=true;
                        var self=this;
                        clearTimeout(this.justCKeyUpTimer);
                        this.justCKeyUpTimer=setTimeout(function(){
                            self.justCKeyUp=false;
                            _GM_setClipboard(self.src);
                        },100)
                    }break;
                    case 72://h键
                        this.hKeyUp=true;
                        break;
                    case 82://r键
                        this.rKeyUp=true;
                        break;
                    case 90://z键
                        this.zKeyUp=true;
                        break;
                    case 39:
                        this.switchImage(true);
                        break;
                    case 37:
                        this.switchImage(false);
                        break;
                    default:break;
                };

                if([72,82,90].indexOf(keyCode)!=-1){
                    if(!this.working && this.restoreBeforeTool){
                        this.restoreBeforeTool=false;
                        this.selectTool(this.beforeTool);
                    };
                };
            },
            focusedKeydown:function(e){
                var keyCode=e.keyCode;
                if (this.data && this.data.img && e.key.toLowerCase() == prefs.floatBar.keys.download) {
                    downloadImg(this.img.src, (this.data.img.title || this.data.img.alt), prefs.saveName);
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                var valid=[32,82,72,90,18,16,17,27,67,71];//有效的按键
                if(valid.indexOf(keyCode)==-1) return;

                e.preventDefault();

                if(this.working){//working的时候也可以接受按下shift键，以便旋转的时候可以任何时候按下
                    if(keyCode==16){//shift键
                        this.shiftKeyUp=false;
                    };
                    return;
                };

                if (e.key == prefs.floatBar.keys.gallery) {
                    if (!gallery) {
                        gallery = new GalleryC();
                        gallery.data = [];
                    }
                    var allData = gallery.getAllValidImgs();
                    if (allData.length < 1) return;
                    allData.target = {src: this.img.src};
                    gallery.data = allData;
                    gallery.load(gallery.data);
                    this.remove();
                } else {
                    switch(keyCode){
                        case 82:{//r键,切换到旋转工具
                            if(this.rKeyUp){
                                this.rKeyUp=false;
                                this.beforeTool=this.selectedTool;
                                if (this.beforeTool != 'rotate') {
                                    this.selectTool('rotate');
                                }
                                var PI = Math.PI;
                                var value = this.rotatedRadians + (e.shiftKey ? -90 : 90) * PI / 180;
                                if (value >= 2 * PI) {
                                    value -= 2 * PI;
                                } else if (value < 0) {
                                    value += 2 * PI;
                                }
                                this.rotate(value,true);
                            };
                        }break;
                        case 72:{//h键,切换到抓手工具
                            if(this.hKeyUp){
                                this.hKeyUp=false;
                                this.beforeTool=this.selectedTool;
                                this.selectTool('hand');
                            };
                        }break;
                        case 90:{//z键,切换到缩放工具
                            if(this.zKeyUp){
                                this.zKeyUp=false;
                                this.beforeTool=this.selectedTool;
                                this.selectTool('zoom');
                                let level = e.shiftKey ? (this.zoomLevel - 0.5) : (this.zoomLevel + 0.5);
                                if (typeof level != 'undefined') {
                                    this.zoom(level, { x: 0, y: 0});
                                }
                            };
                        }break;
                        case 32:{//空格键阻止,临时切换到抓手功能
                            if(this.spaceKeyUp){
                                this.spaceKeyUp=false;
                                if(this.selectedTool!='hand'){
                                    this.tempHand=true;
                                    this.changeCursor('hand');
                                };
                            };
                        }break;
                        case 18:{//alt键,在当前选择是缩放工具的时候，按下的时候切换到缩小功能
                            if(this.altKeyUp){
                                if((this.selectedTool!='zoom' && !this.tempZoom) || this.zoomOut)return;
                                this.zoomOut=true;
                                this.altKeyUp=false;
                                this.changeCursor('zoom',true);
                            };
                        }break;
                        case 17:{//ctrl键临时切换到缩放工具
                            if(this.ctrlKeyUp){
                                var self=this;
                                this.ctrlkeyDownTimer=setTimeout(function(){//规避词典软件的ctrl+c，一瞬间切换到缩放的问题
                                    self.ctrlKeyUp=false;
                                    if(self.selectedTool!='zoom'){
                                        self.tempZoom=true;
                                        self.changeCursor('zoom');
                                    };
                                },100);
                            };
                        }break;
                        case 67:{//c键
                            clearTimeout(this.ctrlkeyDownTimer);
                        }break;
                        case 27:{//ese关闭窗口
                            if(prefs.imgWindow.close.escKey){
                                this.remove();
                            };
                        }break;
                        default:break;
                    }
                }
                e.stopPropagation();
                return false;
            },

            toolbarEventHandler:function(e){
                e.preventDefault();
                e.stopPropagation();
                var target=e.target;
                var toolMap=this.toolMap;
                for(var i in toolMap){
                    if(toolMap.hasOwnProperty(i) && toolMap[i]==target){
                        switch(e.type){
                            case 'mousedown':{
                                this.selectTool(i);
                            }break;
                            case 'dblclick':{
                                this.dblclickCommand(i);
                            }break;
                            default:break;
                        };
                        break;
                    };
                };
            },
            imgWindowEventHandler:function(e){
                if (e.button == 0) {
                    e.stopPropagation();
                }
                var selectedTool=this.selectedTool;
                if(selectedTool == "hand" && prefs.imgWindow.suitLongImg && this.isLongImg){
                    var inScroll=this.imgWindow.classList.contains("pv-pic-window-scroll");
                    if(e.type == "wheel" && inScroll)
                        return;
                    if(e.type == "click" && !this.moving){
                        var wSize=getWindowSize();
                        var imgWindow=this.imgWindow;
                        var scrolled=getScrolled();
                        var origTop=parseFloat(imgWindow.style.top);
                        if(inScroll){
                            imgWindow.style.top = parseFloat(imgWindow.style.top) - getScrolled(imgWindow).y +'px';
                            this.imgWindow.classList.remove("pv-pic-window-scroll");
                        } else this.imgWindow.classList.add("pv-pic-window-scroll");
                        //this.center(true , true);
                        if(!inScroll){
                            imgWindow.style.top= (wSize.h - imgWindow.offsetHeight)/2 + scrolled.y + 13 +'px';
                            var scrollTop=parseFloat(imgWindow.style.top)-origTop;
                            if(this.imgWindow.scrollTop)this.imgWindow.scrollTop = scrollTop;
                            else if(this.imgWindow.pageYOffset)this.imgWindow.pageYOffset = scrollTop;
                            else if(this.imgWindow.scrollY)this.imgWindow.scrollY = scrollTop;
                        }
                        this.keepScreenInside();
                    }
                }
                switch(e.type){
                    case 'click':{//阻止opera的图片保存
                        this.moving=false;
                        if(e.ctrlKey && e.target.nodeName.toUpperCase()=='IMG'){
                            e.preventDefault();
                        }
                    }break;
                    case 'mousedown':
                    case 'touchstart':{
                        if(!this.focused){//如果没有focus，先focus
                            this.focus();
                            this.keepScreenInside();
                        };

                        var target=e.target;
                        if(e.button==2){//由于rotate时候的覆盖层问题，修复右键的图片菜单弹出
                            if(target!=this.rotateOverlayer)return;
                            var self=this;
                            this.rotateOverlayer.style.display='none';
                            var upHandler=function(){
                                document.removeEventListener('mouseup',upHandler,true);
                                setTimeout(function(){
                                    self.rotateOverlayer.style.display='block';
                                },10);
                            };
                            document.addEventListener('mouseup',upHandler,true);
                            return;
                        };

                        if((e.button!=0 && e.type!="touchstart") || (target!=this.imgWindow && target.className!='pv-pic-window-center' && target!=this.img && target!=this.rotateOverlayer && target!=this.imgState))return;
                        e.preventDefault();
                        if(this.tempHand){
                            this.move(e);
                        }else if(this.tempZoom){
                            this.zoom(e);
                        }else if(selectedTool=='hand'){
                            this.restoreBeforeTool=!this.hKeyUp;
                            if(this.hKeyUp){
                                this.move(e);
                            }else{//鸟瞰视图
                                this.aerialView(e);
                            };
                        }else if(selectedTool=='rotate'){
                            var origin={//旋转原点
                                x:e.clientX - 30,//稍微偏左一点。
                                y:e.clientY ,
                            };

                            var rIS=this.rotateIndicator.style;
                            //rIS.display='block';
                            rIS.top=origin.y + 'px';
                            rIS.left=origin.x + 'px';

                            this.restoreBeforeTool=!this.rKeyUp;
                            this.rotate(origin);
                        }else if(selectedTool=='zoom'){
                            this.restoreBeforeTool=!this.zKeyUp;
                            this.zoom(e);
                        };
                    }break;
                    case 'wheel':{
                        if(!this.focused)return;//如果没有focus
                        if(e.deltaY===0)return;//非Y轴的滚动
                        e.preventDefault();
                        if(this.working)return;
                        var oriZoomOut=this.zoomOut;
                        this.zoomOut = !!(e.deltaY > 0);

                        var ratio=this.getZoomRatio({
                            x:e.clientX,
                            y:e.clientY,
                        });

                        var level=this.getNextZoomLevel();

                        this.zoom(level,ratio);
                        this.zoomOut=oriZoomOut;
                    }break;
                    default:break;
                };
            },

            dblclickCommand:function(tool){
                var done;
                switch(tool){
                    case 'hand':{//双击居中,并且适应屏幕
                        this.zoom(1);
                        this.fitToScreen();
                        this.center(true,true);
                        this.keepScreenInside();
                    }break;
                    case 'rotate':{//双击还原旋转
                        if(this.rotatedRadians==0)return;
                        done=true;
                        this.rotate(0,true);
                    }break;
                    case 'zoom':{//双击还原缩放
                        if(this.zoomLevel==1)return;
                        done=true;
                        this.zoom(1,{x:0,y:0});
                    }break;
                    default:break;
                };

                if((tool=='rotate' || tool=='zoom') && done){
                    var scrolled=getScrolled();
                    var imgWindow=this.imgWindow;
                    var imgWinodowRect=imgWindow.getBoundingClientRect();
                    var imgWindowStyle=imgWindow.style;
                    if(imgWinodowRect.left<40){
                        imgWindowStyle.left=40 + scrolled.x + 'px';
                    };
                    if(imgWinodowRect.top<-5){
                        imgWindowStyle.top=-5 + scrolled.y +'px';
                    };
                    this.keepScreenInside();
                };

            },
            doFlipCommand:function(command){
                var map={
                    fv:[/scaleY\([^)]*\)/i,' scaleY(-1) '],
                    fh:[/scaleX\([^)]*\)/i,' scaleX(-1) '],
                };

                var iTransform=this.img.parentNode.style[support.cssTransform];

                var toolClassList=this.toolMap[command].classList;

                if(map[command][0].test(iTransform)){
                    iTransform=iTransform.replace(map[command][0],'');
                    toolClassList.remove(this.selectedToolClass);
                }else{
                    iTransform += map[command][1];
                    toolClassList.add(this.selectedToolClass);
                };
                this.img.parentNode.style[support.cssTransform]=iTransform;

            },
            selectTool:function(tool){
                var command=['fv','fh'];
                if(command.indexOf(tool)==-1){//工具选择
                    if(this.selectedTool==tool){
                        return;
                    }
                    let self=this;
                    if(tool=="compare"){
                        var topmost=0, topmostWin;
                        ImgWindowC.all.forEach(function(iwin){
                            if(iwin.zIndex >= topmost && iwin!=self){
                                topmost=iwin.zIndex;
                                topmostWin=iwin;
                            };
                        });
                        if(topmostWin){
                            this.toolMap.compare.style.display="none";
                            this.compare([topmostWin.img.src]);
                        };
                        return;
                    }
                    var selectedTool=this.selectedTool;
                    this.selectedTool=tool;
                    if(this.tempHand || this.tempZoom){//临时工具中。不变鼠标
                        return;
                    };

                    this.rotateOverlayer.style.display=(tool=='rotate'? 'block' : 'none');//这个覆盖层是为了捕捉双击或者单击事件。

                    if(selectedTool){
                        this.toolMap[selectedTool].classList.remove(this.selectedToolClass);
                    };
                    this.toolMap[tool].classList.add(this.selectedToolClass);
                    this.changeCursor(tool);
                }else{//命令
                    this.doFlipCommand(tool);
                };
            },
            changeCursor:function(tool,zoomOut){
                if(tool=='zoom'){
                    tool+=zoomOut? '-out' : '-in';
                };
                if(this.cursor==tool)return;
                this.cursor=tool;

                var cursor;

                switch(tool){
                    case 'hand':{
                        cursor=support.cssCursorValue.grab || 'pointer';
                    }break;
                    case 'handing':{
                        cursor=support.cssCursorValue.grabbing || 'pointer';
                    }break;
                    case 'zoom-in':{
                        cursor=support.cssCursorValue.zoomIn;
                    }break;
                    case 'zoom-out':{
                        cursor=support.cssCursorValue.zoomOut;
                    }break;
                    case 'rotate':{
                        cursor='progress';
                    }break;
                    case 'default':{
                        cursor='';
                    }break;
                };

                if(typeof cursor!='undefined'){
                    this.imgWindow.style.cursor=cursor;
                };

            },

            remove:function(opacity){
                if(this.removed)return;
                this.removed=true;
                //this.imgWindow.classList.remove("pv-pic-window-transition-all");
                this.blur(true);
                if(!opacity)this.imgWindow.style.opacity=0;
                let self = this;
                setTimeout(function(){
                    self.img.src= prefs.icons.brokenImg_small;//如果在加载中取消，图片也取消读取。
                    self.imgWindow.parentNode.removeChild(self.imgWindow);
                },300);

                var index=ImgWindowC.all.indexOf(this);
                ImgWindowC.all.splice(index,1);
                var removeEvent=document.createEvent('CustomEvent');
                removeEvent.initCustomEvent('pv-removeImgWindow',false,false);
                this.imgWindow.dispatchEvent(removeEvent);

                //focus next
                if(ImgWindowC.all.length==0){
                    if(ImgWindowC.overlayer){
                        ImgWindowC.overlayer.style.display='none';
                    };
                }else{
                    var topmost=0, topmostWin;
                    ImgWindowC.all.forEach(function(iwin){
                        if(iwin.zIndex >= topmost){
                            topmost=iwin.zIndex;
                            topmostWin=iwin;
                        }
                    });
                    if(topmostWin){
                        topmostWin.focus();
                    }
                }

            },

        };

        // 载入动画
        function LoadingAnimC(data, buttonType, waitImgLoad, openInTopWindow) {
            this.args = arrayFn.slice.call(arguments, 0);
            if (data.src != data.imgSrc && !data.srcs) {
                data.srcs = [data.imgSrc];
            }
            this.data = data;//data
            this.buttonType = buttonType;//点击的按钮类型
            this.openInTopWindow = openInTopWindow;//是否在顶层窗口打开，如果在frame里面的话
            this.waitImgLoad = waitImgLoad;//是否等待完全读取后打开
            this.init();
        }

        LoadingAnimC.all=[];

        LoadingAnimC.prototype={
            init:function(){
                LoadingAnimC.all.push(this);
                this.addStyle();
                var container=document.createElement('span');

                container.className='pv-loading-container';
                this.loadingAnim=container;

                container.title=i18n("loading")+':' + this.data.src;
                let retrySpan=document.createElement('span');
                retrySpan.className='pv-loading-button pv-loading-retry';
                retrySpan.title='Retry';
                container.appendChild(retrySpan);
                let cancelSpan=document.createElement('span');
                cancelSpan.className='pv-loading-button pv-loading-cancle';
                cancelSpan.title='Cancel';
                container.appendChild(cancelSpan);
                /*container.innerHTML=
                    '<span class="pv-loading-button pv-loading-retry" title="重试"></span>'+
                    '<span class="pv-loading-button pv-loading-cancle" title="取消"></span>';*/

                if (this.buttonType == 'popup'){
                    container.style.pointerEvents="none";
                }
                getBody(document).appendChild(container);

                var self = this;
                container.addEventListener('click',function(e){
                    var tcl=e.target.classList;
                    if(tcl.contains('pv-loading-cancle')){
                        self.imgReady.abort();
                        self.remove();
                    }else if(tcl.contains('pv-loading-retry')){
                        self.remove();
                        new LoadingAnimC(self.args[0],self.args[1],self.args[2],self.args[3]);
                    };
                },true);

                this.setPosition();

                if (this.buttonType == 'current') {
                    this.loadImg(this.data.imgSrc);
                } else {
                    if (!this.data.xhr) {
                        if(this.buttonType == 'search'){
                            sortSearch();
                            let from=0;
                            let searchFun=function(){
                                searchImgByImg(self.data.imgSrc, null, function(srcs, index){
                                    let src=srcs.shift();
                                    if(index==3){
                                        self.loadImg(src, srcs);
                                    }else{
                                        from=index+1;
                                        self.loadImg(src, srcs, searchFun);
                                    }
                                },function(e) {
                                    self.error("网络错误");
                                },function(e) {
                                    self.error("没有找到原图");
                                }, from);
                            };
                            searchFun();
                        }else{
                            this.loadImg(this.data.src||this.data.imgSrc, this.data.srcs);
                        }
                    } else {
                        xhrLoad.load({
                            url: this.data.src,
                            xhr: this.data.xhr,
                            cb: function(imgSrc, imgSrcs, caption) {
                                if (imgSrc) {
                                    self.data.src=imgSrc;
                                    if (caption) self.data.description = caption;
                                    self.loadImg(imgSrc, imgSrcs);
                                } else {
                                    self.error();
                                }
                            },
                            onerror: function() {
                                self.error();
                            }
                        });
                    }
                }
            },
            addStyle:function(){
                if(LoadingAnimC.styleAdded)return;
                LoadingAnimC.styleAdded=true;
                var style=document.createElement('style');
                style.type='text/css';
                style.textContent='\
                .pv-loading-container {\
                position: absolute;\
                z-index:999999997;\
                background: black url("'+prefs.icons.loading+'") center no-repeat;\
                background-origin: content-box;\
                border: none;\
                padding: 1px 30px 1px 2px;\
                margin: 0;\
                opacity: 0.5;\
                height: 24px;\
                min-width: 24px;\
                box-shadow: 2px 2px 0px #666;\
                -webkit-transition: opacity 0.15s ease-in-out;\
                transition: opacity 0.15s ease-in-out;\
                }\
                .pv-loading-container:hover {\
                opacity: 0.9;\
                }\
                .pv-loading-button {\
                cursor: pointer;\
                height: 24px;\
                width: 24px;\
                position: absolute;\
                right: 0;\
                top: 0;\
                opacity: 0.4;\
                background:transparent center no-repeat;\
                -webkit-transition: opacity 0.15s ease-in-out;\
                transition: opacity 0.15s ease-in-out;\
                }\
                .pv-loading-button:hover {\
                opacity: 1;\
                }\
                .pv-loading-cancle{\
                background-image: url("'+prefs.icons.loadingCancle+'");\
                }\
                .pv-loading-retry{\
                display:none;\
                background-image: url("'+prefs.icons.retry+'");\
                }\
                .pv-loading-container_error{\
                background-image:none;\
                }\
                .pv-loading-container_error::after{\
                content:"'+i18n("loadError")+'";\
                line-height: 24px;\
                color: red;\
                font-size: 14px;\
                display:inline;\
                }\
                .pv-loading-container_error .pv-loading-cancle{\
                display:none;\
                }\
                .pv-loading-container_error .pv-loading-retry{\
                display:block;\
                }\
                ';
                document.head.appendChild(style);
            },
            remove:function(){
                if(!this.removed){
                    this.removed=true;
                    this.loadingAnim.parentNode.removeChild(this.loadingAnim);
                    LoadingAnimC.all.splice(LoadingAnimC.all.indexOf(this),1);
                };
            },
            error:function(msg,img,e){
                if(msg)debug(msg);
                this.loadingAnim.style.pointerEvents="";
                this.loadingAnim.classList.add('pv-loading-container_error');
                debug('Picviewer CE+ 载入大图错误：%o', this.data);

                var self=this;
                setTimeout(function(){
                    self.remove();
                },3000);
            },
            setPosition:function(){
                var position=getContentClientRect(this.data.img);
                var cs=this.loadingAnim.style;
                var scrolled=getScrolled();
                cs.top=position.top + scrolled.y +1 + 'px';
                cs.left=position.left + scrolled.x +1 + 'px';
                cs.removeProperty('display');
            },

            // 根据 imgSrc 载入图片，imgSrcs 为备用图片地址，imgSrc 加载失败备用
            loadImg: function(imgSrc, imgSrcs, nextFun) {
                var self = this;

                var img = document.createElement('img');
                img.src = imgSrc;

                var opts = {
                    error: function(e) {
                        if (Array.isArray(imgSrcs)) {
                            var src = imgSrcs.shift();
                            if (src) {
                                self.loadImg(src, imgSrcs, nextFun);
                                return;
                            }
                        }

                        if(nextFun) nextFun();
                        else self.error('', this, e);
                    },
                };

                opts[self.waitImgLoad ? 'load' : 'ready'] = function(e) {
                    self.load(this, e);
                };

                self.imgReady = imgReady(img, opts);
            },

            load:function(img,e){
                this.remove();
                this.img=img;
                var buttonType=this.buttonType;

                if(buttonType=='gallery'){
                    if(!gallery){
                        gallery=new GalleryC();
                        gallery.data=[];
                    }
                    var allData=gallery.getAllValidImgs();
                    allData.target=this.data;
                    this.data=allData;
                };

                var self=this;
                function openInTop(){
                    var data=self.data;

                    //删除不能发送的项。
                    var delCantClone=function(obj){
                        if(!obj)return;
                        delete obj.img;
                        delete obj.imgPA;
                    };

                    if(Array.isArray(data)){
                        frameSentSuccessData=frameSentData;
                        frameSentData=cloneObject(data,true);
                        delCantClone(data.target);
                        data.forEach(function(obj){
                            delCantClone(obj);
                        });
                    }else{
                        delCantClone(data);
                    };

                    window.postMessage({
                        messageID:messageID,
                        src:img.src,
                        data:data,
                        command:'open',
                        buttonType:buttonType,
                        to:'top',
                    },'*');
                };

                if(this.openInTopWindow && isFrame && topWindowValid!==false && buttonType!='magnifier'){
                    if(topWindowValid){
                        openInTop();
                    }else{//先发消息问问顶层窗口是不是非frameset窗口
                        window.postMessage({
                            messageID:messageID,
                            command:'topWindowValid',
                            to:'top',
                        },'*');

                        document.addEventListener('pv-topWindowValid',function(e){
                            topWindowValid=e.detail;
                            if(topWindowValid){//如果顶层窗口有效
                                openInTop();
                            }else{
                                self.open();
                            };
                        },true);
                    };

                }else{
                    this.open();
                };


            },
            open:function(){
                switch(this.buttonType){
                    case 'popup':
                        if(uniqueImgWin && uniqueImgWin.src != this.data.src && (!this.data.srcs || !this.data.srcs.includes(uniqueImgWin.src))){
                            uniqueImgWin.remove();
                        }
                        if(!uniqueImgWin || uniqueImgWin.removed){
                            this.data.src=this.img.src;
                            uniqueImgWin = new ImgWindowC(this.img, this.data);
                            //uniqueImgWin.imgWindow.classList.add("pv-pic-window-transition-all");
                        }
                        uniqueImgWin.blur({target:this.data.img});
                        if(!uniqueImgWin.loaded){
                            if(prefs.waitImgLoad){
                                uniqueImgWin.imgWindow.style.display = "none";
                                uniqueImgWin.imgWindow.style.opacity = 0;
                            }else{
                                if (prefs.floatBar.globalkeys.previewFollowMouse) {
                                    uniqueImgWin.followPos(uniqueImgWinInitX, uniqueImgWinInitY);
                                } else {
                                    uniqueImgWin.center(true,true);
                                    if(centerInterval)clearInterval(centerInterval);
                                    centerInterval=setInterval(function(){
                                        if(!uniqueImgWin || uniqueImgWin.removed || uniqueImgWin.loaded){
                                            clearInterval(centerInterval);
                                        }else{
                                            uniqueImgWin.center(true,true);
                                        }
                                    },300);
                                }
                            }
                        }
                        uniqueImgWin.imgWindow.style.pointerEvents = "none";
                        break;
                    case 'gallery':
                        if(!gallery){
                            gallery=new GalleryC();
                        };
                        gallery.load(this.data,this.from);
                        gallery.changeMinView();
                        break;
                    case 'magnifier':
                        new MagnifierC(this.img,this.data);
                        break;
                    case 'download':
                        downloadImg(this.data.src || this.data.imgSrc, (this.data.img.title || this.data.img.alt), prefs.saveName);
                        break;
                    case "copy":
                        _GM_setClipboard(this.data.src || this.data.imgSrc);
                        break;
                    case "open":
                        _GM_openInTab(this.data.src || this.data.imgSrc, {active:true});
                        break;
                    case "copyImg":
                        copyData(this.data.src || this.data.imgSrc);
                        break;
                    case 'actual':
                    case 'search':
                    case 'current':
                    case 'original'://original 是为了兼容以前的规则
                        if(this.data.src!=this.img.src)this.data.src=this.img.src;
                        new ImgWindowC(this.img, this.data, this.buttonType == 'actual');
                        break;
                };
            },
        };

        function copyData(url) {
            if (typeof ClipboardItem != 'undefined') {
                urlToBlob(url, (blob, ext) => {
                    try {
                        navigator.clipboard.write([
                            new ClipboardItem({
                                [blob.type]: blob
                            })
                        ]);
                    } catch (error) {
                        console.error(error);
                    }
                }, null, true);
            } else _GM_setClipboard(url);
        }

        //工具栏
        function FloatBarC(){
            this.init();
        };

        FloatBarC.prototype={
            init:function(){
                this.addStyle();
                var container=document.createElement('span');
                container.id='pv-float-bar-container';
                getBody(document).appendChild(container);
                for(let i=0;i<5;i++){
                    let spanChild=document.createElement('span');
                    spanChild.className='pv-float-bar-button';
                    container.appendChild(spanChild);
                }
                /*container.innerHTML=
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>';*/

                var buttons={
                };
                this.buttons=buttons;
                this.children=container.children;

                arrayFn.forEach.call(this.children,function(child,index){
                    var titleMap={
                        actual:i18n("actualBtn").replace(/ ?\(A\)/,` (${prefs.floatBar.keys.actual.toUpperCase()})`),
                        search:i18n("searchBtn").replace(/ ?\(S\)/,` (${prefs.floatBar.keys.search.toUpperCase()})`),
                        gallery:i18n("galleryBtn").replace(/ ?\(G\)/,` (${prefs.floatBar.keys.gallery.toUpperCase()})`),
                        current:i18n("currentBtn").replace(/ ?\(C\)/,` (${prefs.floatBar.keys.current.toUpperCase()})`),
                        magnifier:i18n("magnifierBtn").replace(/ ?\(M\)/,` (${prefs.floatBar.keys.magnifier.toUpperCase()})`),
                        download:i18n("download")+` (${prefs.floatBar.keys.download.toUpperCase()})`,
                    };
                    var buttonName=prefs.floatBar.butonOrder[index];
                    if(!buttonName){
                        child.style.display="none";
                        return;
                    }
                    buttons[buttonName]=child;
                    child.title=titleMap[buttonName];
                    child.classList.add('pv-float-bar-button-' + buttonName);
                });


                this.floatBar=container;


                var self=this;
                container.addEventListener('click',function(e){
                    var buttonType;
                    var target=e.target;
                    for(var type in buttons){
                        if(!buttons.hasOwnProperty(type))return;
                        if(target==buttons[type]){
                            buttonType=type;
                            break;
                        };
                    };
                    if(!buttonType)return;

                    self.hide();
                    self.open(e,buttonType);

                },true);


                addCusMouseEvent('mouseleave',container,function(e){
                    clearTimeout(self.hideTimer);
                    self.hideTimer=setTimeout(function(){
                        self.hide();
                    },prefs.floatBar.hideDelay);
                });

                addCusMouseEvent('mouseenter',container,function(e){
                    clearTimeout(self.hideTimer);
                    clearTimeout(self.showTimer);
                    clearTimeout(self.globarOutTimer);
                });

                this._scrollHandler=this.scrollHandler.bind(this);
            },
            addStyle:function(){
                var style=document.createElement('style');
                style.type='text/css';
                style.textContent='\
                    #pv-float-bar-container {\
                    position: absolute;\
                    z-index:9999999998;\
                    padding: 5px;\
                    margin: 0;\
                    border: none;\
                    opacity: 0.35;\
                    line-height: 0;\
                    -webkit-transition: opacity 0.2s ease-in-out;\
                    transition: opacity 0.2s ease-in-out;\
                    display:none;\
                    }\
                    #pv-float-bar-container:hover {\
                    opacity: 1;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button {\
                    vertical-align:middle;\
                    cursor: pointer;\
                    width: 18px;\
                    height: 18px;\
                    padding: 0;\
                    margin:0;\
                    border: none;\
                    display: inline-block;\
                    position: relative;\
                    box-shadow: 1px 0 3px 0px rgba(0,0,0,0.9);\
                    background: transparent center no-repeat;\
                    background-size:100% 100%;\
                    background-origin: content-box;\
                    -webkit-transition: margin-right 0.15s ease-in-out ,  width 0.15s ease-in-out ,  height 0.15s ease-in-out ;\
                    transition: margin-right 0.15s ease-in-out ,  width 0.15s ease-in-out ,  height 0.15s ease-in-out ;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button:not(:last-child){\
                    margin-right: -14px;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button:first-child {\
                    z-index: 4;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button:nth-child(2) {\
                    z-index: 3;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button:nth-child(3) {\
                    z-index: 2;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button:last-child {\
                    z-index: 1;\
                    }\
                    #pv-float-bar-container:hover > .pv-float-bar-button {\
                    width: 24px;\
                    height: 24px;\
                    }\
                    #pv-float-bar-container:hover > .pv-float-bar-button:not(:last-child) {\
                    margin-right: 4px;\
                    }\
                    #pv-float-bar-container .pv-float-bar-button-actual {\
                    background-image:url("'+ prefs.icons.actual +'");\
                    }\
                    #pv-float-bar-container .pv-float-bar-button-search {\
                    background-image:url("'+ prefs.icons.search +'");\
                    }\
                    #pv-float-bar-container .pv-float-bar-button-gallery {\
                    background-image:url("'+ prefs.icons.gallery +'");\
                    }\
                    #pv-float-bar-container .pv-float-bar-button-current {\
                    background-image:url("'+ prefs.icons.current +'");\
                    }\
                    #pv-float-bar-container .pv-float-bar-button-magnifier {\
                    background-image:url("'+ prefs.icons.magnifier +'");\
                    }\
                    #pv-float-bar-container .pv-float-bar-button-download {\
                    background-image:url("'+ prefs.icons.download +'");\
                    }\
                    ';
                document.head.appendChild(style);
            },
            start:function(data){

                //读取中的图片,不显示浮动栏,调整读取图标的位置.
                if(LoadingAnimC.all.find(function(item,index,array){
                    if(data.img==item.data.img){
                        return true;
                    };
                }))return false;


                //被放大镜盯上的图片,不要显示浮动栏.
                if(MagnifierC.all.find(function(item,index,array){
                    if(data.img==item.data.img){
                        return true;
                    };
                }))return false;

                var self=this;
                clearTimeout(this.hideTimer);

                var imgOutHandler=function(e){
                    document.removeEventListener('mouseout',imgOutHandler,true);
                    clearTimeout(self.showTimer);
                    clearTimeout(self.hideTimer);
                    self.hideTimer=setTimeout(function(){
                        self.hide();
                    },prefs.floatBar.hideDelay);
                };

                clearTimeout(this.globarOutTimer);
                this.globarOutTimer=setTimeout(function(){//稍微延时。错开由于css hover样式发生的out;
                    document.addEventListener('mouseout',imgOutHandler,true);
                },150);

                clearTimeout(this.showTimer);
                if(prefs.floatBar.position=="hide"){
                    self.data=data;
                    self.show();
                    return false;
                }
                if(!this.shown || self.data.img!=data.img){
                    this.floatBar.style.transition="unset";
                    this.floatBar.style.opacity=0.01;
                }
                this.showTimer=setTimeout(function(){
                    self.data=data;
                    self.show();
                },prefs.floatBar.showDelay);
                return true;
            },
            setButton:function(){
                if(this.data.noActual){
                    this.buttons['actual'].style.display='none';
                }else{
                    this.buttons['actual'].style.removeProperty('display');
                }
                if(this.data.type != "force" && this.data.img.nodeName.toUpperCase() == 'IMG'){
                    this.buttons['magnifier'].style.removeProperty('display');
                }else{
                    this.buttons['magnifier'].style.display='none';
                }
                if (this.data.img.nodeName.toUpperCase() != 'IMG') {
                    //this.buttons['gallery'].style.display = 'none';
                    //this.buttons['current'].style.display = 'none';
                } else {
                    //this.buttons['gallery'].style.removeProperty('display');
                    //this.buttons['current'].style.removeProperty('display');
                }
            },
            setPosition:function(){
                //如果图片被删除了，或者隐藏了。
                if(this.data.img.offsetWidth==0){
                    return true;
                };
                var targetPosi=getContentClientRect(this.data.img);
                if (this.data.img.parentNode && this.data.img.parentNode.scrollHeight > 20 && this.data.img.parentNode.scrollWidth > 20) {
                    var paPosi=getContentClientRect(this.data.img.parentNode);
                    if (paPosi.width > 20 && paPosi.height > 20) {
                        if (paPosi.width < targetPosi.width) {
                            targetPosi.left = paPosi.left;
                        }
                        if (paPosi.height < targetPosi.height) {
                            targetPosi.top = paPosi.top;
                        }
                    }
                }
                var bodyPosi=document.documentElement.getBoundingClientRect();
                var windowSize=getWindowSize();
                var img=this.data.img;

                var floatBarPosi=prefs.floatBar.position.toLowerCase().split(/\s+/);

                var offsetX=prefs.floatBar.offset.x;
                var offsetY=prefs.floatBar.offset.y;


                var scrolled=getScrolled();
                targetPosi.top -= bodyPosi.top + scrolled.y;
                targetPosi.left -= bodyPosi.left + scrolled.x;

                var fbs = this.floatBar.style;
                var setPosition = {
                    top:function() {
                        var top = targetPosi.top + scrolled.y;
                        if (targetPosi.top + offsetY < 10) {
                            top = scrolled.y;
                            offsetY = 0;
                        } else {
                            if (prefs.floatBar.stayOut) {
                                top = top + offsetY - 10 - prefs.floatBar.stayOutOffsetY;
                            } else {
                                top = top + offsetY;
                            }
                            if (targetPosi.height <= 50) top -= 10;
                        }
                        fbs.top = top + 'px';
                    },
                    right:function() {
                        var right = windowSize.w - targetPosi.right;
                        if (right < offsetX) {
                            right = -scrolled.x;
                            offsetX = 0;
                        } else {
                            right -= scrolled.x;
                            if (prefs.floatBar.stayOut) {
                                right = right - offsetX - prefs.floatBar.stayOutOffsetX;
                            } else {
                                right = right - offsetX;
                            }
                            if (targetPosi.width <= 50) right += 10;
                        }
                        fbs.right = right + 'px';
                    },
                    bottom:function() {
                        var bottom = windowSize.h - targetPosi.bottom;
                        if (bottom <= offsetY) {
                            bottom = -scrolled.y;
                            offsetY = 0;
                        } else {
                            bottom -= scrolled.y;
                            if (prefs.floatBar.stayOut) {
                                bottom = bottom - offsetY - 40 - prefs.floatBar.stayOutOffsetY;
                            } else {
                                bottom = bottom - offsetY - 30;
                            }
                            if (targetPosi.height <= 50) bottom += 10;
                        }
                        fbs.bottom = bottom + 'px';
                    },
                    left:function() {
                        var left = targetPosi.left + scrolled.x;
                        if (targetPosi.left + offsetX < 0) {
                            left = scrolled.x;
                            offsetX = 0;
                        } else {
                            if (prefs.floatBar.stayOut) {
                                left = left + offsetX - prefs.floatBar.stayOutOffsetX;
                            } else {
                                left = left + offsetX;
                            }
                            if (targetPosi.width <= 50) left -= 10;
                        }
                        fbs.left = left + 'px';
                    },
                    center:function() {
                        var left = targetPosi.left + scrolled.x + offsetX;
                        fbs.left = left + img.width / 2 + 'px';
                    },
                    hide:function(){
                        var top=targetPosi.top + scrolled.y;
                        if(targetPosi.top + offsetY < 0){
                            top=scrolled.y;
                            offsetY=0;
                        }
                        var left=targetPosi.left + scrolled.x;
                        if(targetPosi.left + offsetX < 0){
                            left=scrolled.x;
                            offsetX=0;
                        }
                        if(prefs.floatBar.stayOut){
                            top=top + offsetY - 10 - prefs.floatBar.stayOutOffsetY;
                            left=left + offsetX - prefs.floatBar.stayOutOffsetX;
                        }else{
                            top=top + offsetY;
                            left=left + offsetX;
                        }
                        if(targetPosi.height<=50)top-=10;
                        fbs.top=top + 'px';
                        if(targetPosi.width<=50)left-=10;
                        fbs.left=left + 'px';
                    },
                };

                setPosition[floatBarPosi[0]]();
                if(floatBarPosi.length>1){
                    setPosition[floatBarPosi[1]]();
                }
            },
            show:function(){
                if(this.setPosition())return;
                this.shown=true;
                this.setButton();
                if(prefs.floatBar.position!=="hide"){
                    this.floatBar.style.transition="";
                    this.floatBar.style.display='block';
                    this.floatBar.style.opacity="";
                }
                clearTimeout(this.hideTimer);
                window.removeEventListener('scroll',this._scrollHandler,true);
                window.addEventListener('scroll',this._scrollHandler,true);
            },
            hide:function(){
                clearTimeout(this.showTimer);
                this.floatBar.style.opacity=0.01;
                this.shown=false;
                this.floatBar.style.display='none';
                window.removeEventListener('scroll',this._scrollHandler,true);
            },
            scrollHandler:function(){//更新坐标
                clearTimeout(this.scrollUpdateTimer);
                var self=this;
                this.scrollUpdateTimer=setTimeout(function(){
                    self.setPosition();
                },100);
            },
            open:function(e,buttonType){
                if (buttonType === 'download' && !this.data.xhr) {
                    downloadImg(this.data.src || this.data.imgSrc, (this.data.img.title || this.data.img.alt), prefs.saveName);
                    return;
                } else {
                    let additionEnable = prefs.floatBar.invertAdditionalFeature ? !e.altKey : e.altKey;
                    if (additionEnable) {
                        let src, feature = prefs.floatBar.additionalFeature;
                        if (buttonType == 'actual') {
                            if (this.data.xhr) {
                                buttonType = feature || "open";
                            } else {
                                src = this.data.src || this.data.imgSrc;
                            }
                        } else if (buttonType == 'current') {
                            src = this.data.imgSrc;
                        }
                        if (src) {
                            switch(feature) {
                                case "copy":
                                    _GM_setClipboard(src);
                                    break;
                                case "open":
                                    _GM_openInTab(src, {active:true});
                                    break;
                                case "copyImg":
                                    copyData(src);
                                    break;
                            }
                            return;
                        }
                    }
                }
                var waitImgLoad = e && e.ctrlKey ? !prefs.waitImgLoad : prefs.waitImgLoad; //按住ctrl取反向值
                var openInTopWindow = e && e.shiftKey ? !prefs.framesPicOpenInTopWindow : prefs.framesPicOpenInTopWindow; //按住shift取反向值
                if (!waitImgLoad && buttonType == 'magnifier' && !envir.chrome) { //非chrome的background-image需要全部载入后才能显示出来
                    waitImgLoad = true;
                };
                new LoadingAnimC(this.data, buttonType, waitImgLoad, openInTopWindow);
            },
            update:function(img,src){
                if(this.data.img==img && this.data.imgSrc!=src){
                    this.data.src=src;
                    this.data.noActual=false;
                    this.data.type="rule";
                    if(this.shown){
                        this.setButton();
                    }
                }
            }
        };

        /**
        * 提取自 Mouseover Popup Image Viewer 脚本，用于 xhr 方式的获取
        */
        var xhrLoad = function() {
            var _ = {};

            var caches = {};
            var handleError;

            /**
            * @param  q  图片的选择器或函数
            * @param  c  图片说明的选择器或函数
            */
            function parsePage(url, q, c, post, cb) {
                downloadPage(url, post, function(html) {
                    var iurl, iurls = [], cap, doc = createDoc(html);

                    if(typeof q == 'function') {
                        iurl = q(html, doc, url);
                        if (Array.isArray(iurl)) {
                            iurls = iurl;
                            iurl = iurls.shift();
                        }
                    } else {
                        var inodes = findNodes(q, doc);
                        inodes.forEach(function(node) {
                            iurls.push(findFile(node, url));
                        });
                        iurl = iurls.shift();
                    }

                    if(typeof c == 'function') {
                        cap = c(html, doc);
                    } else {
                        var cnodes = findNodes(c, doc);
                        cap = cnodes.length ? findCaption(cnodes[0]) : false;
                    }

                    // 缓存
                    if (iurl) {
                        caches[url] = {
                            iurl: iurl,
                            iurls: iurls,
                            cap: cap
                        };
                    }

                    cb(iurl, iurls, cap);
                });
            }

            function downloadPage(url, post, cb) {
                var opts = {
                    method: 'GET',
                    url: url,
                    onload: function(req) {
                        try {
                            if(req.status > 399) throw 'Server error: ' + req.status;
                            cb(req.responseText, req.finalUrl || url);
                        } catch(ex) {
                            handleError(ex);
                        }
                    },
                    onerror: handleError
                };
                if(post) {
                    opts.method = 'POST';
                    opts.data = post;
                    opts.headers = {'Content-Type':'application/x-www-form-urlencoded','Referer':url};
                }

                _GM_xmlhttpRequest(opts);
            }

            function createDoc(text) {
                var doc = document.implementation.createHTMLDocument('PicViewerCE');
                doc.documentElement.innerHTML = text;
                return doc;
            }

            function findNodes(q, doc) {
                var nodes = [],
                    node;
                if (!Array.isArray(q)) q = [q];
                for (var i = 0, len = q.length; i < len; i++) {
                    node = qs(q[i], doc);
                    if (node) {
                        nodes.push(node);
                    }
                }
                return nodes;
            }

            function findFile(n, url) {
                var path = n.src || n.href;
                return path ? path.trim() : false;
            }

            function findCaption(n) {
                return n.getAttribute('content') || n.getAttribute('title') || n.textContent;
            }

            function qs(s, n) {
                return n.querySelector(s);
            }

            _.load = function(opt) {
                var info = caches[opt.url];
                if (info) {
                    opt.cb(info.iurl, info.iurls, info.cap);
                    return;
                }

                handleError = opt.onerror || function() {};

                parsePage(opt.url, opt.xhr.q, opt.xhr.c, opt.post, opt.cb);
            };

            return _;
        }();


        // ------------------- run -------------------------

        var matchedRule,
            URL=location.href.slice(0, 250);

        function pretreatment(img) {
            if (img.nodeName.toUpperCase() != "IMG" || (img.src && !/^data/.test(img.src))) return;
            let src;
            tprules.find(function(rule, index, array) {
                try {
                    src = rule.call(img);
                    if (src) {
                        return true;
                    }
                } catch(err) {
                    debug(err);
                }
            });
            if (src) {
                img.src = src;
            }
        }

        function findPic(img){
            var imgPN=img;
            var imgPA,imgPE=[];
            while(imgPN=imgPN.parentElement){
                if(imgPN.nodeName.toUpperCase()=='A'){
                    imgPA=imgPN;
                    break;
                }
            }
            imgPN=img;
            while(imgPN=imgPN.parentElement){
                if(imgPN.nodeName.toUpperCase()=='BODY'){
                    break;
                }else{
                    imgPE.push(imgPN);
                }
            }

            var iPASrc=imgPA? imgPA.href : '';
            //base64字符串过长导致正则匹配卡死浏览器
            var base64Img=/^data:/i.test(img.src);
            var src, // 大图地址
                srcs, // 备用的大图地址
                type, // 类别
                noActual = false, //没有原图
                imgSrc = img.currentSrc||img.dataset.lazySrc||img.src, // img 节点的 src
                xhr,
                description; // 图片的注释
            var imgCStyle=unsafeWindow.getComputedStyle(img);
            var imgCS={
                h: parseFloat(imgCStyle.height)||img.height||img.offsetHeight,
                w: parseFloat(imgCStyle.width)||img.width||img.offsetWidth,
            };
            var imgAS={//实际尺寸。
                h:img.naturalHeight||imgCS.h,
                w:img.naturalWidth||imgCS.w,
            };
            if(!src && matchedRule.rules.length>0){// 通过高级规则获取.
                // 排除
                try{
                    var newSrc=matchedRule.getImage(img,imgPA,imgPE);
                    if(newSrc && imgSrc!=newSrc) src=newSrc;
                }catch(err){
                    throwErrorInfo(err);
                }

                if(src) {
                    if (Array.isArray(src)) {
                        srcs = src;
                        src = srcs.shift();
                    }

                    type = 'rule';
                    xhr = matchedRule.xhr;

                    if (matchedRule.lazyAttr) { // 由于采用了延迟加载技术，所以图片可能为 loading.gif
                        imgSrc = img.getAttribute(matchedRule.lazyAttr) || img.src;
                    }

                    if (matchedRule.description) {
                        var node = getElementMix(matchedRule.description, img);
                        if (node) {
                            description = node.getAttribute('title') || node.textContent;
                        }
                    }
                }
            }

            if(!src && !base64Img){//遍历通配规则
                tprules.find(function(rule,index,array){
                    try{
                        src=rule.call(img,imgPA);
                        if(src){
                            return true;
                        };
                    }catch(err){
                        throwErrorInfo(err);
                    };
                });
                if(src)type='tpRule';
            }

            if(!src && iPASrc){//链接可能是一张图片...
                if(iPASrc!=img.src && /\.(jpg|jpeg|png|gif|bmp)(\?[^\?]*)?$/i.test(iPASrc)){
                    src=iPASrc;
                }
                if(src)type='scale';
            }

            if(!src || src==imgSrc){//本图片是否被缩放.
                noActual=true;
                if(!(imgAS.w==imgCS.w && imgAS.h==imgCS.h)){//如果不是两者完全相等,那么被缩放了.
                    src=imgSrc;
                    type='scale';
                    if (imgAS.h < prefs.gallery.scaleSmallSize && imgAS.w < prefs.gallery.scaleSmallSize) {
                        type='scaleSmall';
                    }
                }else{
                    src=imgSrc;
                    type='force';
                }
            }

            if(!src)return;

            if(/^blob/i.test(imgSrc)){
                imgSrc=drawTobase64(img);
                src=imgSrc;
            }

            var ret = {
                src: src,                  // 得到的src
                srcs: srcs,                // 多个 src，失败了会尝试下一个
                type: type,                // 通过哪种方式得到的
                imgSrc: imgSrc,            // 处理的图片的src
                iPASrc: iPASrc,            // 图片的第一个父a元素的链接地址
                sizeH:imgAS.h,
                sizeW:imgAS.w,
                imgCS:imgCS,
                imgAS:imgAS,

                noActual:noActual,
                xhr: xhr,
                description: description || '',

                img: img,                  // 处理的图片
                imgPA: imgPA,              // 图片的第一个父a元素
            };
            return ret;
        }

        function getMatchedRule() {
            return new MatchedRuleC();
            /*var rule = siteInfo.find(function(site, index, array) {
                if (site.enabled != false && site.url && toRE(site.url).test(URL)) {
                    return true;
                }
            });

            return rule;*/
        }

        function MatchedRuleC(){
            this.init();
        }

        MatchedRuleC.prototype={
            init:function(){
                if(!isunsafe()){
                    try{
                        var customRules=unsafeWindow.eval(prefs.customRules);
                        if(Array.isArray(customRules)){
                            customRules.forEach(rule=>{
                                let hasRule = false;
                                for(let s in siteInfo){
                                    if(siteInfo[s].name == rule.name){
                                        hasRule = true;
                                        for(let si in rule){
                                            siteInfo[s][si]=rule[si];
                                        }
                                        break;
                                    }
                                }
                                if(!hasRule)siteInfo.unshift(rule);
                            })
                            //siteInfo=customRules.concat(siteInfo);
                        }
                    }catch(e){
                        console.log("Wrong rule for Picviewer CE+");
                        console.log(e);
                    }
                }

                var self=this,r=0;
                self.rules=[];
                function searchByTime(){
                    setTimeout(()=>{
                        let end=r+20;
                        end=end>siteInfo.length?siteInfo.length:end;
                        for(;r<end;r++){
                            let site=siteInfo[r];
                            if (site.enabled != false && (!site.url || toRE(site.url).test(URL))) {
                                if(site.url){
                                    if(site.css){
                                        var style = document.createElement('style');
                                        style.type = 'text/css';
                                        style.id = 'gm-picviewer-site-style';
                                        style.textContent = site.css;
                                        document.head.appendChild(style);
                                    }
                                    if(site.xhr){
                                        self._xhr=site.xhr;
                                        self.xhr=site.xhr;
                                    }
                                    if(site.lazyAttr){
                                        self.lazyAttr=site.lazyAttr;
                                    }
                                    if(site.description){
                                        self.description=site.description;
                                    }
                                    if(site.clickToOpen){
                                        self.clickToOpen=site.clickToOpen;
                                    }
                                    if(site.ext){
                                        self.ext=site.ext;
                                    }
                                }
                                self.rules.push(site);
                            }
                        }
                        if(end<siteInfo.length){
                            searchByTime();
                        }
                    },1);
                }
                searchByTime();
            },
            replace:function(str, r, s){
                var results=[],rt;
                if(Array.isArray(s)){
                    s.forEach(_s=>{
                        rt=str.replace(r, _s);
                        if(rt && rt!=str)results.push(rt);
                    });
                }else{
                    rt=str.replace(r, s);
                    if(rt && rt!=str)return str.replace(r, s);
                }
                return results;
            },
            getExtSrc:function(ele){
                var newSrc,rule;
                for(var i in this.rules){
                    rule=this.rules[i];
                    if(rule.getExtSrc){
                        newSrc = rule.getExtSrc.call(ele);
                    }else newSrc = null;
                    if(newSrc && newSrc.length>0){
                        debug(rule);
                        break;
                    }
                }
                if(newSrc && newSrc.length==0)newSrc=null;
                return newSrc;
            },
            getImage:function(img, a, p){
                var newSrc,rule;
                var base64Img=/^data:/i.test(img.src);
                for(var i in this.rules){
                    rule=this.rules[i];
                    if((!rule.url || !rule.getImage) && base64Img)continue;
                    if(rule.src && !rule.src.test(img.src))continue;
                    if(rule.exclude && rule.exclude.test(img.src))continue;
                    if(rule.getImage){
                        newSrc = rule.getImage.call(img, a, p, rule);
                        this.xhr = (newSrc && !rule.stopXhr) ? (this._xhr || null) : null;
                    }else newSrc = null;
                    if(!newSrc){
                        if(rule.r){
                            if(Array.isArray(rule.r)){//r最多一层
                                for(var j in rule.r){
                                    var _r=rule.r[j];
                                    if(_r && _r.test && _r.test(img.src)){
                                        if(Array.isArray(rule.s)){//s对上r最多两层
                                            var _s=rule.s[j];
                                            newSrc=this.replace(img.src, _r, _s);
                                        }else{
                                            newSrc=this.replace(img.src, _r, rule.s);
                                        }
                                        break;
                                    }
                                }
                            }else{
                                newSrc=this.replace(img.src, rule.r, rule.s);
                            }
                        }
                    }
                    if(newSrc && newSrc.length>0 && newSrc!=img.src){
                        debug(rule);
                        break;
                    }
                }
                if(newSrc && newSrc.length==0)newSrc=null;
                return newSrc;
            }
        };

        var isFrame=window!=window.parent;
        var topWindowValid;
        var frameSentData;
        var frameSentSuccessData;
        function handleMessage(e){
            var data=e.data;
            if( !data || !data.messageID || data.messageID != messageID )return;
            var source=e.source,command,cusEvent;
            if(typeof source=='undefined' || source!==window){
                if(!isFrame){
                    command=data.command;
                    switch(command){
                        case 'open':{
                            if (data.buttonType === 'download') {
                                downloadImg(data.src, document.title, prefs.saveName);
                                return;
                            }
                            var img=document.createElement('img');
                            img.src=data.src;

                            imgReady(img,{
                                ready:function(){
                                    LoadingAnimC.prototype.open.call({
                                        img:img,
                                        data:data.data,
                                        buttonType:data.buttonType,
                                        from:data.from,
                                    });
                                },
                            });
                        }break;
                        case 'navigateToImg':{
                            cusEvent=document.createEvent('CustomEvent');
                            cusEvent.initCustomEvent('pv-navigateToImg',false,false,data.exist);
                            document.dispatchEvent(cusEvent);
                        }break;
                        case 'topWindowValid':{
                            if(data.from)
                            window.postMessage({
                                messageID:messageID,
                                command:'topWindowValid_frame',
                                valid:getBody(document).nodeName.toUpperCase()!='FRAMESET',
                                to:data.from,
                            },'*');
                        }break;
                    };

                }else{
                    command=data.command;
                    switch(command){
                        case 'navigateToImg':{

                            if(!frameSentData.unique){
                                var unique=GalleryC.prototype.unique(frameSentData);
                                frameSentData=unique.data;
                                frameSentData.unique=true;
                            };
                            var targetImg=frameSentData[data.index].img;
                            var exist=(document.documentElement.contains(targetImg) && unsafeWindow.getComputedStyle(targetImg).display!='none');

                            if(exist){
                                if(gallery && gallery.shown){
                                    gallery.minimize();
                                };
                                setTimeout(function(){
                                    GalleryC.prototype.navigateToImg(targetImg);
                                    flashEle(targetImg);
                                },0);
                            };
                            window.postMessage({
                                messageID:messageID,
                                command:'navigateToImg',
                                exist:exist,
                                to:data.from,
                            },'*');
                        }break;
                        case 'sendFail':{
                            frameSentData=frameSentSuccessData;
                        }break;
                        case 'topWindowValid_frame':{
                            cusEvent=document.createEvent('CustomEvent');
                            cusEvent.initCustomEvent('pv-topWindowValid',false,false,data.valid);
                            document.dispatchEvent(cusEvent);
                        }break;
                    };
                };

            };
        }

        //页面脚本用来转发消息
        //原因chrome的contentscript无法访问非自己外的别的窗口。都会返回undefined，自然也无法向其他的窗口发送信息,这里用pagescript做个中间代理
        //通讯逻辑..A页面的contentscript发送到A页面的pagescript，pagescript转交给B页面的contentscript
        var messageID='pv-0.5106795670312598';

        var _isunsafe = null;
        function isunsafe(){
            if (_isunsafe === null) {
                try {
                    _isunsafe = eval("false");
                } catch (e) {
                    console.debug("unsafe");
                    _isunsafe = true;
                }
            }
            return _isunsafe;
        }
        function addPageScript() {

            if(isunsafe())return;
            var pageScript=document.createElement('script');
            pageScript.id = 'picviewer-page-script';

            var pageScriptText=function(messageID){
                var frameID=Math.random();
                var frames={
                    top:window.top,
                };

                window.addEventListener('message',function(e){
                    var data=e.data;
                    if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
                    var source=e.source;
                    if(source===window){//来自contentscript,发送出去,或者干嘛。
                        if(data.to){
                            data.from=frameID;
                            frames[data.to].postMessage(data,'*');
                        }else{
                            switch(data.command){
                                case 'getIframeObject':{
                                    var frameWindow=frames[data.windowId];
                                    var iframes=document.getElementsByTagName('iframe');
                                    var iframe;
                                    var targetIframe;
                                    for(var i=iframes.length-1 ; i>=0 ; i--){
                                        iframe=iframes[i];
                                        if(iframe.contentWindow===frameWindow){
                                            targetIframe=iframe;
                                            break;
                                        };
                                    };
                                    var cusEvent=document.createEvent('CustomEvent');
                                    cusEvent.initCustomEvent('pv-getIframeObject',false,false,targetIframe);
                                    document.dispatchEvent(cusEvent);
                                }break;
                            };
                        };

                    }else{//来自别的窗口的，contentscript可以直接接收，这里保存下来自的窗口的引用
                        frames[data.from]=source;
                    };
                },true)
            };

            pageScript.textContent='(' + pageScriptText.toString() + ')('+ JSON.stringify(messageID) +')';
            if(document.head)document.head.appendChild(pageScript);
        }

        function clickToOpen(data){
            var preventDefault = matchedRule.clickToOpen.preventDefault;
            var button = matchedRule.clickToOpen.button || 0;
            var alt = !!matchedRule.clickToOpen.alt;
            var ctrl = !!matchedRule.clickToOpen.ctrl;
            var shift = !!matchedRule.clickToOpen.shift;
            var meta = !!matchedRule.clickToOpen.meta;

            function mouseout(){
                document.removeEventListener('mouseout', mouseout, true);
                document.removeEventListener(button == 2 ? 'contextmenu' : 'mousedown', click, true);
                if(data.imgPA && preventDefault){
                    data.imgPA.removeEventListener('click', clickA, true);
                };
            };

            function checkLimit(e){
                if(e.button!=button ||
                   e.altKey!=alt ||
                   e.ctrlKey!=ctrl ||
                   e.shiftKey!=shift ||
                   e.metaKey!=meta){
                    return false;
                }
                return true;
            }

            function click(e){
                if(!checkLimit(e))return;
                FloatBarC.prototype.open.call({
                    data:data,
                },e,matchedRule.clickToOpen.type);
                if(preventDefault){
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            };

            function clickA(e){//阻止a的默认行为
                if(!checkLimit(e))return;
                e.preventDefault();
            };

            document.addEventListener(button == 2 ? 'contextmenu' : 'mousedown', click, true);

            if(data.imgPA && preventDefault){
                data.imgPA.addEventListener('click', clickA, true);
            };

            setTimeout(function(){//稍微延时。错开由于css hover样式发生的out;
                document.addEventListener('mouseout', mouseout, true);
            },100);

            return function(){
                mouseout();
            };
        }

        var canclePreCTO,uniqueImgWin,centerInterval,removeUniqueWinTimer,globalFuncEnabled=false;
        function checkGlobalKeydown(e){
            return(!((!e.ctrlKey && e.key !== 'Control' && prefs.floatBar.globalkeys.ctrl)||
                     (!e.altKey && e.key !== 'Alt' && prefs.floatBar.globalkeys.alt)||
                     (!e.shiftKey && e.key !== 'Shift' && prefs.floatBar.globalkeys.shift)||
                     (!e.metaKey && e.key !== 'Meta' && prefs.floatBar.globalkeys.command)||
                     (!prefs.floatBar.globalkeys.ctrl && !prefs.floatBar.globalkeys.alt && !prefs.floatBar.globalkeys.shift && !prefs.floatBar.globalkeys.command)));
        }

        function checkPreview(e){
            let selStr;
            try {
                if (document.activeElement &&
                    (document.activeElement.nodeName == 'INPUT' ||
                     document.activeElement.nodeName == 'TEXTAREA' ||
                     document.activeElement.contentEditable == 'true')) {
                    return false;
                }
                selStr=document.getSelection().toString();
            }catch(e){}
            if (selStr) return false;
            let keyActive=(prefs.floatBar.globalkeys.type == "hold" && checkGlobalKeydown(e)) ||
                (prefs.floatBar.globalkeys.type == "press" && globalFuncEnabled);
            return prefs.floatBar.globalkeys.invertInitShow?!keyActive:keyActive;
        }

        var untilMoveTimer, moveHandler, uniqueImgWinInitX, uniqueImgWinInitY;
        function waitUntilMove(target, callback) {
            if (moveHandler) document.removeEventListener('mousemove', moveHandler, true);
            if (untilMoveTimer) clearTimeout(untilMoveTimer);

            moveHandler = e => {
                uniqueImgWinInitX = e.clientX;
                uniqueImgWinInitY = e.clientY;
                if (target != e.target) {
                    let preRect = target.getBoundingClientRect();
                    let nextRect = e.target.getBoundingClientRect();
                    if (preRect && nextRect && (preRect.left > nextRect.left || preRect.right < nextRect.right || preRect.top > nextRect.top || preRect.bottom < nextRect.bottom)) {
                        document.removeEventListener('mousemove', moveHandler, true);
                        clearTimeout(untilMoveTimer);
                    }
                }
            }
            document.addEventListener('mousemove', moveHandler, true);
            untilMoveTimer = setTimeout(() => {
                document.removeEventListener('mousemove', moveHandler, true);
                callback();
            }, prefs.floatBar.showDelay || 0)
        }

        function checkFloatBar(_target, type, canPreview, clientX, clientY, altKey) {
            let target = _target;
            if (!target || target.id == "pv-float-bar-container" ||
                (target.parentNode && (target.parentNode.id == "icons" || target.parentNode.className == "search-jumper-btn")) ||
                (target.className &&
                 (/^pv\-/.test(target.className) ||
                  target.className == "whx-a" ||
                  target.className == "whx-a-node" ||
                  target.className == "search-jumper-btn" ||
                  target.classList.contains("ks-imagezoom-lens")))) {
                return;
            }
            if (target.nodeName.toUpperCase() == "PICTURE"){
                target = target.querySelector("img");
            }
            if (type == "mousemove") {
                if ((uniqueImgWin && !uniqueImgWin.removed && !uniqueImgWin.previewed)) {
                    uniqueImgWin.followPos(clientX, clientY);
                    if (!canPreview) {
                        uniqueImgWin.remove();
                    }
                    return;
                } else if (target.nodeName.toUpperCase() != 'IMG' || !canPreview) {
                    return;
                }
            }

            // 扩展模式，检查前面一个是否为 img
            if (target.nodeName.toUpperCase() != 'IMG' && matchedRule.rules.length > 0 && matchedRule.ext) {
                var _type = typeof matchedRule.ext;
                if (_type == 'string') {
                    switch (matchedRule.ext) {
                        case 'previous':
                            target = target.previousElementSibling || target;
                            break;
                        case 'next':
                            target = target.nextElementSibling || target;
                            break;
                        case 'previous-2':
                            target = (target.previousElementSibling &&
                                target.previousElementSibling.previousElementSibling) || target;
                            break;
                    }
                } else if (_type == 'function') {
                    try {
                        target = matchedRule.ext(target) || target;
                    } catch(ex) {
                        throwErrorInfo(ex);
                    }

                    if (!target) return;
                }
            }
            var result, hasBg = node => {
                if(node.nodeName.toUpperCase() == "HTML" || node.nodeName == "#document"){
                    return false;
                }
                let nodeStyle = unsafeWindow.getComputedStyle(node);
                let bg = node && nodeStyle.backgroundImage;
                if (!bg || bg == "none") return false;
                return bg.length > 100 || (node.clientWidth > prefs.floatBar.minSizeLimit.w && node.clientHeight > prefs.floatBar.minSizeLimit.h && /^\s*url\(\s*['"]?\s*[^ad\s'"]/.test(bg));
            };
            if (target.nodeName.toUpperCase() != 'IMG' && matchedRule.getExtSrc) {
                let nsrc;
                try {
                    nsrc = matchedRule.getExtSrc(target);
                } catch(ex) {
                    throwErrorInfo(ex);
                }
                if (nsrc) {
                    result = {
                        src: nsrc,
                        type: "rule",
                        imgSrc: nsrc,
                        noActual: true,
                        img: target
                    };
                }
            }
            if (!result) {
                if (target.nodeName.toUpperCase() != 'IMG' && target.dataset.role == "img") {
                    let img = target.parentNode.querySelector('img');
                    if (img) target = img;
                }
                if (target.nodeName.toUpperCase() != 'IMG') {
                    if (target.nodeName.toUpperCase() == "AREA") target = target.parentNode;
                    var targetBg;
                    var bgReg = /^\s*url\(\s*["']?(.+?)["']?\s*\)/i;
                    var broEle = target.previousElementSibling, broImg;
                    while (broEle) {
                        if (broEle.nodeName == "IMG") broImg = broEle;
                        else if (broEle.nodeName == "PICTURE") broImg = broEle.querySelector("img");
                        if (getComputedStyle(broEle).position !== "absolute") break;
                        broEle = broEle.previousElementSibling;
                    }
                    if (broEle == target) broEle = null;
                    else if (!broEle) {
                        broEle = target.nextElementSibling;
                        while (broEle) {
                            if (broEle.nodeName == "IMG") broImg = broEle;
                            else if (broEle.nodeName == "PICTURE") broImg = broEle.querySelector("img");
                            if (getComputedStyle(broEle).position == "absolute") break;
                            broEle = broEle.nextElementSibling;
                        }
                        if (broEle == target) broEle = null;
                    }
                    if (prefs.floatBar.listenBg && hasBg(target)) {
                        targetBg = unsafeWindow.getComputedStyle(target).backgroundImage.replace(bgReg, "$1");
                        let src = targetBg, nsrc = src, noActual = true, type = "scale";
                        result = {
                            src: nsrc,
                            type: type,
                            imgSrc: src,
                            noActual:noActual,
                            img: target
                        };
                    } else if (broImg) {
                        target = broImg;
                    } else if (target.children.length == 1 && target.children[0].nodeName == "IMG") {
                        target = target.children[0];
                    } else if (prefs.floatBar.listenBg && broEle && hasBg(broEle)) {
                        targetBg = unsafeWindow.getComputedStyle(broEle).backgroundImage.replace(bgReg, "$1");
                        let src = targetBg, nsrc = src, noActual = true, type = "scale";
                        result = {
                            src: nsrc,
                            type: type,
                            imgSrc: src,
                            noActual:noActual,
                            img: target
                        };
                    } else if (target.parentNode) {
                        let imgs;
                        if (target.nodeName == 'A') {
                            imgs = target.querySelectorAll('img');
                        }
                        if (imgs && imgs.length == 1) {
                            target = imgs[0];
                        } else if (target.parentNode.nodeName.toUpperCase() == 'IMG') {
                            target = target.parentNode;
                        } else if (prefs.floatBar.listenBg && hasBg(target.parentNode)) {
                            target = target.parentNode;
                            targetBg = unsafeWindow.getComputedStyle(target).backgroundImage.replace(bgReg, "$1");
                            let src = targetBg, nsrc = src, noActual = true, type = "scale";
                            result = {
                                src: nsrc,
                                type: type,
                                imgSrc: src,
                                noActual:noActual,
                                img: target
                            };
                        }/*else if(unsafeWindow.getComputedStyle(target).position=="absolute" || target.nodeName == "MAP"){
                        var imgChildren=[],availableImgs = [];
                        [].forEach.call(target.parentNode.querySelectorAll('img'),function(img){
                            var imgStyle=unsafeWindow.getComputedStyle(img);
                            if(imgStyle.display != "none"){
                                imgChildren.push(img);
                                if(imgStyle.width > 200 || imgStyle.position != "absolute"){
                                    availableImgs.push(img);
                                }
                            }
                        });
                        if(imgChildren.length == 1){
                            target=imgChildren[0];
                        }else if(availableImgs.length == 1){
                            target=availableImgs[0];
                        }else if(imgChildren.length == 0 && unsafeWindow.getComputedStyle(target.parentNode).position=="absolute"){
                            imgChildren=[];availableImgs = [];
                            [].forEach.call(target.parentNode.parentNode.querySelectorAll('img'),function(img){
                                var imgStyle=unsafeWindow.getComputedStyle(img);
                                if(imgStyle.display != "none"){
                                    imgChildren.push(img);
                                    if(imgStyle.width > 200 || imgStyle.position != "absolute"){
                                        availableImgs.push(img);
                                    }
                                }
                            });
                            if(imgChildren.length == 1){
                                target=imgChildren[0];
                            }else if(availableImgs.length == 1){
                                target=availableImgs[0];
                            }
                        }
                    }*/
                    }
                    if (result && !/^data:/i.test(result.src)) {
                        if (matchedRule.rules.length > 0 && target.nodeName.toUpperCase() != 'IMG') {
                            let src = result.src, img = {src: src}, type, imgSrc = src;
                            try {
                                var imgPN=target;
                                var imgPA,imgPE=[];
                                while(imgPN=imgPN.parentElement){
                                    if(imgPN.nodeName.toUpperCase()=='A'){
                                        imgPA=imgPN;
                                        break;
                                    }
                                }
                                imgPN=target;
                                while(imgPN=imgPN.parentElement){
                                    if(imgPN.nodeName.toUpperCase()=='BODY'){
                                        break;
                                    }else{
                                        imgPE.push(imgPN);
                                    }
                                }
                                var newSrc = matchedRule.getImage(img, imgPA, imgPE);
                                if (newSrc && imgSrc != newSrc) {
                                    let srcs, description;
                                    src = newSrc;
                                    if (Array.isArray(src)) {
                                        srcs = src;
                                        src = srcs.shift();
                                    }
                                    type = 'rule';

                                    if (matchedRule.description) {
                                        var node = getElementMix(matchedRule.description, img);
                                        if (node) {
                                            description = node.getAttribute('title') || node.textContent;
                                        }
                                    }
                                    result.src = src;
                                    result.type = type;
                                    result.noActual = false;
                                    result.xhr = matchedRule.xhr;
                                    result.description = description || '';
                                }
                            } catch(err) {}
                            if (result.type != "rule") {
                                tprules.find(function(rule, index, array) {
                                    try {
                                        src = rule.call(img);
                                        if (src) {
                                            return true;
                                        };
                                    } catch(err) {
                                    }
                                });
                                if (src && src != imgSrc) {
                                    result.src = src;
                                    result.type = "tpRule";
                                    result.noActual = false;
                                }
                            }
                        }
                    }
                }
            }
            var checkUniqueImgWin = function() {
                if (canPreview) {
                    if (removeUniqueWinTimer) clearTimeout(removeUniqueWinTimer);
                    if (uniqueImgWin && !uniqueImgWin.removed) {
                        if (uniqueImgWin.src == result.src) return true;
                        uniqueImgWin.remove();
                    }
                    uniqueImgWinInitX = clientX;
                    uniqueImgWinInitY = clientY;
                    waitUntilMove(_target, () => {
                        new LoadingAnimC(result, 'popup', prefs.waitImgLoad, prefs.framesPicOpenInTopWindow);
                    });
                    return true;
                } else {
                    if (uniqueImgWin && uniqueImgWin.imgWindow && !uniqueImgWin.removed) {
                        uniqueImgWin.imgWindow.style.pointerEvents = "auto";
                    }
                    return false;
                }
            };

            if (!result && target.nodeName.toUpperCase() != 'IMG') {
                if (target.nodeName.toUpperCase() == 'A' && /\.(jpg|png|jpeg|gif|webp)\b/.test(target.href)) {
                } else if (target.parentNode && target.parentNode.nodeName.toUpperCase() == 'A' && /\.(jpg|png|jpeg|gif|webp)\b/.test(target.parentNode.href)) {
                    target = target.parentNode;
                } else {
                    target = null;
                }
                if (target) {
                    result = {
                        src: target.href,
                        type: "",
                        imgSrc: target.href,
                        noActual:true,
                        img: target
                    };
                    checkUniqueImgWin();
                }
                return;
            }

            if (!result) {
                pretreatment(target)
                result = findPic(target);
                if (!result) return;
                if (prefs.floatBar.showWithRules && result.type == "rule") {
                } else if (!(result.imgAS.w==result.imgCS.w && result.imgAS.h == result.imgCS.h)) {//如果不是两者完全相等,那么被缩放了.
                    if (prefs.floatBar.sizeLimitOr) {
                        if (result.imgCS.h <= prefs.floatBar.minSizeLimit.h && result.imgCS.w <= prefs.floatBar.minSizeLimit.w) {//最小限定判断.
                            return;
                        }
                    }else{
                        if (result.imgCS.h <= prefs.floatBar.minSizeLimit.h || result.imgCS.w <= prefs.floatBar.minSizeLimit.w) {//最小限定判断.
                            return;
                        }
                    }
                } else {
                    if (prefs.floatBar.sizeLimitOr) {
                        if (result.imgCS.w <= prefs.floatBar.forceShow.size.w && result.imgCS.h <= prefs.floatBar.forceShow.size.h) {
                            return;
                        }
                    } else {
                        if (result.imgCS.w <= prefs.floatBar.forceShow.size.w || result.imgCS.h <= prefs.floatBar.forceShow.size.h) {
                            return;
                        }
                    }
                }
            }

            if (result) {
                debug(result);
                if (!result.noActual) {
                    if (!result.srcs) {
                        result.srcs = [result.imgSrc];
                    } else {
                        if (result.imgSrc && result.srcs.join(" ").indexOf(result.imgSrc) == -1) {
                            result.srcs.push(result.imgSrc);
                        }
                    }
                }
                if (!floatBar) {
                    floatBar = new FloatBarC();
                }
                if (result.type == 'rule' && matchedRule.clickToOpen && matchedRule.clickToOpen.enabled) {
                    if (canclePreCTO) {//取消上次的，防止一次点击打开多张图片
                        canclePreCTO();
                    }
                    canclePreCTO = clickToOpen(result);
                }

                if (!checkUniqueImgWin()) {
                    let canShow = floatBar.start(result);
                    if (canShow) {
                        var keyHide = prefs.floatBar.position == "hide" ? !altKey : altKey;
                        if (keyHide) {
                            floatBar.floatBar.style.opacity = 0;
                            floatBar.floatBar.style.display = "none";
                        } else {
                            if (floatBar.floatBar.style.opacity == 0) {
                                floatBar.floatBar.style.opacity = "";
                            }
                            floatBar.floatBar.style.display = "initial";
                        }
                    }
                }
            }
        }

        var checkFloatBarTimer;
        function globalMouseoverHandler(e) {
            if (galleryMode) return;//库模式全屏中......
            if (e.target == ImgWindowC.overlayer) return;
            if (e.type == "mousemove") {
                if ((uniqueImgWin && !uniqueImgWin.removed && !uniqueImgWin.previewed)) {
                    uniqueImgWin.followPos(e.clientX, e.clientY);
                    if (!checkPreview(e)) {
                        uniqueImgWin.remove();
                    }
                    return;
                } else {
                    if (!checkPreview(e)) return;
                    let target = e.target;
                    if (target.nodeName.toUpperCase() == "PICTURE"){
                        target = target.querySelector("img") || target;
                    }
                    if (target.nodeName.toUpperCase() != 'IMG') return;
                }
            }
            clearTimeout(checkFloatBarTimer);
            checkFloatBarTimer = setTimeout(function() {
                if (!e || !e.target || !e.target.parentNode) return;
                if (gallery && gallery.shown) return;
                checkFloatBar(e.target, e.type, checkPreview(e), e.clientX, e.clientY, e.altKey);
            }, 50);
        }

        async function input(sel, v) {
            await new Promise((resolve) => {
                let checkInv = setInterval(() => {
                    let input = document.querySelector(sel);
                    if (input) {
                        input.focus();
                        input.scrollIntoView();
                        let lastValue = input.value;
                        if (input.nodeName == "INPUT") {
                            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                            nativeInputValueSetter.call(input, v);
                        } else {
                            var nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
                            nativeTextareaValueSetter.call(input, v);
                        }
                        let event = new Event('focus', { bubbles: true });
                        input.dispatchEvent(event);
                        event = new Event('input', { bubbles: true });
                        let tracker = input._valueTracker;
                        if (tracker) {
                            tracker.setValue(lastValue);
                        }
                        input.dispatchEvent(event);
                        event = new Event('change', { bubbles: true });
                        input.dispatchEvent(event);
                        clearInterval(checkInv);
                        resolve();
                    }
                }, 100);
            });
        }

        function emuClick(btn){
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
            btn.focus();
            var mouseclick = new PointerEvent("mouseover",eventParam);
            btn.dispatchEvent(mouseclick);
            mouseclick = new PointerEvent("pointerover",eventParam);
            btn.dispatchEvent(mouseclick);
            mouseclick = new PointerEvent("mousedown",eventParam);
            btn.dispatchEvent(mouseclick);
            mouseclick = new PointerEvent("pointerdown",eventParam);
            btn.dispatchEvent(mouseclick);
            mouseclick = new PointerEvent("mouseup",eventParam);
            btn.dispatchEvent(mouseclick);
            mouseclick = new PointerEvent("pointerup",eventParam);
            btn.dispatchEvent(mouseclick);
            btn.click();
        }

        async function clickEle(sel, failAction) {
            await new Promise((resolve) => {
                let checkInv = setInterval(() => {
                    let ele = document.querySelector(sel);
                    if (ele) {
                        clearInterval(checkInv);
                        emuClick(ele);
                        resolve();
                    }else if(failAction) {
                        failAction();
                    }
                }, 100);
            });
        }

        async function sleep(time) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, time);
            })
        }

        function isKeyDownEffectiveTarget(target) {
            var localName = target.localName;

            // 确保光标不是定位在文字输入框或选择框
            if (localName == 'textarea' || localName == 'input' || localName == 'select'){
                return false;
            }

            // 视频播放器
            if (localName == 'object' || localName == 'embed'){
                return false;
            }

            // 百度贴吧回复输入的问题
            if (target.getAttribute('contenteditable') == 'true'){
                return false;
            }

            return true;
        }

        function openGallery(){
            if(!gallery){
                gallery=new GalleryC();
                gallery.data=[];
            }
            var allData=gallery.getAllValidImgs();
            if(allData.length<1)return true;
            gallery.data=allData;
            gallery.load(gallery.data);
            return gallery;
        }

        function keydown(event) {
            if (ImgWindowC.showing) return;
            if (document.activeElement &&
                (document.activeElement.nodeName == 'INPUT' ||
                 document.activeElement.nodeName == 'INPUT' ||
                 document.activeElement.nodeName == 'TEXTAREA' ||
                 document.activeElement.contentEditable == 'true')) {
                return;
            }
            var key = event.key;
            if(checkGlobalKeydown(event)){
                if(prefs.floatBar.keys.enable && key==prefs.floatBar.keys.gallery){
                    openGallery();
                    event.stopPropagation();
                    event.preventDefault();
                    globalFuncEnabled = !globalFuncEnabled;
                    return true;
                }else if((!gallery || (!gallery.shown && !gallery.minimized)) && prefs.floatBar.globalkeys.type == "press"){
                    globalFuncEnabled = !globalFuncEnabled;
                    return true;
                }
            }
            if (!prefs.floatBar.keys.enable){
                return false;
            }

            if (event && (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) && window.getSelection().toString()) {
                return;
            }
            if (floatBar && floatBar.shown && isKeyDownEffectiveTarget(event.target)) {
                Object.keys(prefs.floatBar.keys).some(function(action) {
                    if (action == 'enable') return;
                    if (key == prefs.floatBar.keys[action]) {
                        floatBar.open(event, action);
                        event.stopPropagation();
                        event.preventDefault();
                        return true;
                    }
                });
            }
        }

        function keyup(event) {
            let isFuncKey = event.key == 'Alt' || event.key == 'Control' || event.key == 'Shift' || event.key == 'Meta';
            if(isFuncKey && (prefs.floatBar.globalkeys.type == "hold" || !checkPreview(event)) && (uniqueImgWin && !uniqueImgWin.removed)){
                if(prefs.floatBar.globalkeys.closeAfterPreview){
                    if (removeUniqueWinTimer) clearTimeout(removeUniqueWinTimer);
                    if (uniqueImgWin) {
                        removeUniqueWinTimer = setTimeout(()=>{
                            if (uniqueImgWin) uniqueImgWin.remove()
                        },100);
                    }
                }else{
                    uniqueImgWin.imgWindow.style.pointerEvents = "auto";
                    uniqueImgWin.focus();
                    uniqueImgWin.imgWindow.classList.remove("pv-pic-window-transition-all");
                    uniqueImgWin.previewed=true;
                    uniqueImgWin = null;
                }
            }
        }

        window.addEventListener('message', handleMessage, true);

        addPageScript();

        document.addEventListener('keyup', keyup, false);
        document.addEventListener('mouseenter', globalMouseoverHandler, true);
        document.addEventListener('mousemove', globalMouseoverHandler, true);

        document.addEventListener('mouseout',e=>{
            if (e.relatedTarget == ImgWindowC.overlayer) return;
            if(uniqueImgWin && !uniqueImgWin.removed){
                if(checkPreview(e)){
                    let showArea=uniqueImgWin.data.img.getBoundingClientRect();
                    if(e.clientX < showArea.left + 20 ||
                      e.clientX > showArea.right - 20 ||
                      e.clientY < showArea.top + 20 ||
                      e.clientY > showArea.bottom - 20){
                        if(removeUniqueWinTimer)clearTimeout(removeUniqueWinTimer);
                        removeUniqueWinTimer = setTimeout(()=>{uniqueImgWin.remove()},100);
                    }
                }
            }
        }, true);
        var editSitesFunc={
            "Lunapic": (src, initOpen) => {
                _GM_openInTab('https://www.lunapic.com/editor/index.php?action=url&url=' + src, {active:true});
            },
            "Pixlr easy": async (src, initOpen) => {
                if(initOpen){
                    storage.setItem("editUrl", src);
                    _GM_openInTab('https://pixlr.com/x/', {active:true});
                }else{
                    storage.setItem("editUrl", "");
                    if(/^https:\/\/pixlr\.com\//.test(location.href)){
                        await sleep(1000);
                        await clickEle('#home-open-url');
                        await input('#image-url', src);
                        await clickEle('.dialog>.buttons>a.button.positive');
                    }
                }
            },
            "Pixlr advanced": async (src, initOpen) => {
                if(initOpen){
                    storage.setItem("editUrl", src);
                    _GM_openInTab('https://pixlr.com/e/', {active:true});
                }else{
                    storage.setItem("editUrl", "");
                    if(/^https:\/\/pixlr\.com\//.test(location.href)){
                        await sleep(1000);
                        await clickEle('#home-open-url');
                        await input('#image-url', src);
                        await clickEle('.dialog>.buttons>a.button.positive');
                    }
                }
            },
            "Photopea": async (src, initOpen) => {
                if(initOpen){
                    storage.setItem("editUrl", src);
                    _GM_openInTab('https://www.photopea.com/', {active:true});
                }else{
                    storage.setItem("editUrl", "");
                    if(/^https:\/\/www\.photopea\.com\//.test(location.href)){
                        await sleep(1000);
                        await clickEle('.topbar>span>button');
                        await clickEle('.cmanager>.contextpanel>div:nth-child(4)');
                        await clickEle('.cmanager>div:last-child>div:nth-child(2)');
                        await input('span.fitem.tinput>input', src);
                        await clickEle('.form>button');
                    }
                }
            }
        };
        var editSitesName={};
        for(let key in editSitesFunc){
            editSitesName[key]=key;
        }
        var newsInited = false, news = "";

        initLang();
        var customLangOption={
            'auto': i18n("defaultLang")
        };
        for(let key in langList){
            customLangOption[key]=langList[key];
        }
        GM_config.init({
            id: 'pv-prefs',
            title: GM_config.create('a', {
                href: 'https://greasyfork.org/scripts/24204-picviewer-ce',
                target: '_blank',
                textContent: 'Picviewer CE+ '+i18n("config"),
                title: i18n("openHomePage")
            }),
            isTabs: true,
            skin: 'tab',
            frameStyle: {
                minWidth: "480px",
                width: ((visualLength((i18n("floatBar") + i18n("magnifier") + i18n("gallery") + i18n("imgWindow") + i18n("others")),"14px","arial,tahoma,myriad pro,sans-serif") + 250) || 480) + 'px',
                zIndex:'2147483648',
            },
            css: [
                "#pv-prefs input[type='text'] { width: 50px; } ",
                "#pv-prefs input[type='number'] { width: 50px; } ",
                "#pv-prefs .inline .config_var { margin-left: 6px; }",
                "#pv-prefs label.size { width: 205px; }",
                "#pv-prefs span.sep-x { margin-left: 0px !important; }",
                "#pv-prefs label.sep-x { margin-right: 5px; }",
                "#pv-prefs label.floatBar-key { margin-left: 20px; width: 100px; }",
                "#pv-prefs input.color { width: 120px; }",
                "#pv-prefs input.order { width: 250px; }",
                "#pv-prefs .config_header>a { border-bottom: solid 2px; }",
                "#pv-prefs .config_header>a:hover { color: #9f9f9f; }",,
            ].join('\n'),
            fields: {
                // 浮动工具栏
                'floatBar.position': {
                    label: i18n("position"),
                    title: i18n("positionTips"),
                    type: 'select',
                    options: {
                        'top left': i18n("topLeft"),
                        'top right': i18n("topRight"),
                        'bottom right': i18n("bottomRight"),
                        'bottom left': i18n("bottomLeft"),
                        'top center': i18n("topCenter"),
                        'bottom center': i18n("bottomCenter"),
                        'hide': i18n("hide")
                    },
                    "default": prefs.floatBar.position,
                    section: [i18n("floatBar")],
                },
                'floatBar.stayOut': {
                    label: i18n("stayOut"),
                    type: 'checkbox',
                    "default": prefs.floatBar.stayOut,
                    line: 'start'
                },
                'floatBar.stayOutOffsetX': {
                    label: 'X:',
                    type: 'int',
                    "default": prefs.floatBar.stayOutOffsetX
                },
                'floatBar.stayOutOffsetY': {
                    label: 'Y:',
                    type: 'int',
                    "default": prefs.floatBar.stayOutOffsetY,
                    after: ' '+i18n("px"),
                    line: 'end'
                },
                'floatBar.showDelay': {
                    label: i18n("showDelay"),
                    type: 'int',
                    "default": prefs.floatBar.showDelay,
                    after: ' '+i18n("ms"),
                },
                'floatBar.hideDelay': {
                    label: i18n("hideDelay"),
                    type: 'int',
                    className: 'hideDelay',
                    "default": prefs.floatBar.hideDelay,
                    after: ' '+i18n("ms")
                },
                'floatBar.forceShow.size.w': {
                    label: i18n("forceShow"),
                    type: 'int',
                    className: 'size',
                    "default": prefs.floatBar.forceShow.size.w,
                    title: i18n("forceShowTip"),
                    line: 'start',
                },
                'floatBar.forceShow.size.h': {
                    label: ' x ',
                    type: 'int',
                    className: 'sep-x',
                    after: ' '+i18n("px"),
                    "default": prefs.floatBar.forceShow.size.h,
                    line: 'end',
                },
                'floatBar.minSizeLimit.w': {
                    label: i18n("minSizeLimit"),
                    type: 'int',
                    className: 'size',
                    "default": prefs.floatBar.minSizeLimit.w,
                    title: i18n("minSizeLimitTip"),
                    line: 'start',
                },
                'floatBar.minSizeLimit.h': {
                    label: ' x ',
                    type: 'int',
                    className: 'sep-x',
                    after: ' '+i18n("px"),
                    "default": prefs.floatBar.minSizeLimit.h,
                    line: 'end',
                },
                'floatBar.sizeLimitOr': {
                    label: i18n("sizeLimitOr"),
                    type: "checkbox",
                    "default": false
                },
                'floatBar.showWithRules': {
                    label: i18n("showWithRules"),
                    type: "checkbox",
                    "default": prefs.floatBar.showWithRules,
                    title: i18n("showWithRulesTip"),
                },
                'floatBar.butonOrder': {
                    label: i18n("butonOrder"),
                    type: 'text',
                    className: 'order',
                    "default": prefs.floatBar.butonOrder.join(', '),
                },
                'floatBar.additionalFeature': {
                    label: i18n("additionalFeature"),
                    type: 'select',
                    options: {
                        'copy': i18n("copy"),
                        'copyImg': i18n("copyImg"),
                        'open': i18n("openInNewTab")
                    },
                    "default": prefs.floatBar.additionalFeature || 'open'
                },
                'floatBar.invertAdditionalFeature': {
                    label: i18n("invertAdditionalFeature"),
                    type: 'checkbox',
                    "default": prefs.floatBar.invertAdditionalFeature
                },
                'floatBar.listenBg': {
                    label: i18n("listenBg"),
                    type: 'checkbox',
                    "default": prefs.floatBar.listenBg,
                    title: i18n("listenBgTip")
                },
                'floatBar.globalkeys.ctrl': {
                    label: i18n("globalkeys"),
                    type: 'checkbox',
                    after: "CTRL +",
                    "default": true,
                    line: 'start'
                },
                'floatBar.globalkeys.alt': {
                    after: "ALT +",
                    type: 'checkbox',
                    className: 'sep-x',
                    "default": false,
                },
                'floatBar.globalkeys.shift': {
                    after: "SHIFT +",
                    type: 'checkbox',
                    className: 'sep-x',
                    "default": false,
                },
                'floatBar.globalkeys.command': {
                    after: "COMMAND",
                    type: 'checkbox',
                    className: 'sep-x',
                    "default": false,
                    line: 'end',
                },
                'floatBar.globalkeys.type': {
                    label: i18n("globalkeysType"),
                    type: 'select',
                    options: {
                        'press': i18n("globalkeysPress"),
                        'hold': i18n("globalkeysHold")
                    },
                    "default": prefs.floatBar.globalkeys.type
                },
                'floatBar.globalkeys.closeAfterPreview': {
                    label: i18n("closeAfterPreview"),
                    type: 'checkbox',
                    "default": prefs.floatBar.globalkeys.closeAfterPreview
                },
                'floatBar.globalkeys.invertInitShow': {
                    label: i18n("initShow"),
                    type: 'checkbox',
                    "default": prefs.floatBar.globalkeys.invertInitShow
                },
                'floatBar.globalkeys.previewFollowMouse': {
                    label: i18n("previewFollowMouse"),
                    type: 'checkbox',
                    "default": prefs.floatBar.globalkeys.previewFollowMouse
                },
                // 按键
                'floatBar.keys.enable': {
                    label: i18n("keysEnable"),
                    type: 'checkbox',
                    "default": prefs.floatBar.keys.enable
                },
                'floatBar.keys.actual': {
                    label: i18n("keysActual"),
                    type: 'text',
                    className: 'floatBar-key',
                    "default": prefs.floatBar.keys.actual,
                    title: i18n("keysActualTip")
                },
                /*'floatBar.keys.search': {
                    label: i18n("keysSearch"),
                    type: 'text',
                    className: 'floatBar-key',
                    "default": prefs.floatBar.keys.search,
                    title: i18n("keysSearchTip")
                },*/
                'floatBar.keys.current': {
                    label: i18n("keysCurrent"),
                    type: 'text',
                    className: 'floatBar-key',
                    "default": prefs.floatBar.keys.current,
                    title: i18n("keysCurrentTip")
                },
                'floatBar.keys.magnifier': {
                    label: i18n("keysMagnifier"),
                    type: 'text',
                    className: 'floatBar-key',
                    "default": prefs.floatBar.keys.magnifier,
                    title: i18n("keysMagnifierTip")
                },
                'floatBar.keys.gallery': {
                    label: i18n("keysGallery"),
                    type: 'text',
                    className: 'floatBar-key',
                    "default": prefs.floatBar.keys.gallery,
                    title: i18n("keysGalleryTip")
                },
                'floatBar.keys.download': {
                    label: i18n("download"),
                    type: 'text',
                    className: 'floatBar-key',
                    "default": prefs.floatBar.keys.download
                },

                // 放大镜
                'magnifier.radius': {
                    label: i18n("magnifierRadius"),
                    type: 'int',
                    "default": prefs.magnifier.radius,
                    section: [i18n("magnifier")],
                    after: ' '+i18n("px")
                },
                'magnifier.wheelZoom.enabled': {
                    label: i18n("magnifierWheelZoomEnabled"),
                    type: 'checkbox',
                    "default": prefs.magnifier.wheelZoom.enabled,
                },
                'magnifier.wheelZoom.range': {
                    label: i18n("magnifierWheelZoomRange"),
                    type: 'textarea',
                    "default": prefs.magnifier.wheelZoom.range.join(', '),
                },

                // 图库
                'gallery.defaultSizeLimit.w': {
                    label: i18n("defaultSizeLimit"),
                    type: 'int',
                    className: 'size',
                    section: [i18n("gallery")],
                    "default": prefs.gallery.defaultSizeLimit.w,
                    line: 'start',
                },
                'gallery.defaultSizeLimit.h': {
                    label: ' x ',
                    type: 'int',
                    className: 'sep-x',
                    after: ' '+i18n("px"),
                    "default": prefs.gallery.defaultSizeLimit.h,
                    line: 'end',
                },
                'gallery.fitToScreen': {
                    label: i18n("galleryFitToScreen"),
                    type: 'checkbox',
                    "default": prefs.gallery.fitToScreen,
                    title: i18n("galleryFitToScreenTip"),
                    line: 'start',
                },
                'gallery.fitToScreenSmall': {
                    label: i18n("galleryFitToScreenSmall"),
                    type: 'checkbox',
                    "default": prefs.gallery.fitToScreenSmall,
                    line: 'end',
                },
                'gallery.scrollEndToChange': {
                    label: i18n("galleryScrollEndToChange"),
                    type: 'checkbox',
                    "default": prefs.gallery.scrollEndToChange,
                    title: i18n("galleryScrollEndToChangeTip")
                },
                'gallery.exportType': {
                    label: i18n("galleryExportType"),
                    type: 'select',
                    options: {
                        'grid': i18n("grid"),
                        'gridBig': i18n("gridBig"),
                        'list': i18n("list")
                    },
                    "default": prefs.gallery.exportType,
                },
                'gallery.loadMore': {
                    label: i18n("galleryAutoLoad"),
                    type: 'checkbox',
                    "default": prefs.gallery.loadMore
                },
                'gallery.loadAll': {
                    label: i18n("galleryLoadAll"),
                    type: 'checkbox',
                    "default": prefs.gallery.loadAll,
                    title: i18n("galleryLoadAllTip")
                },
                'gallery.viewmoreEndless': {
                    label: i18n("viewmoreEndless"),
                    type: 'checkbox',
                    "default": prefs.gallery.viewmoreEndless
                },
                'gallery.downloadWithZip': {
                    label: i18n("galleryDownloadWithZip"),
                    type: 'checkbox',
                    "default": prefs.gallery.downloadWithZip
                },
                'gallery.downloadGap': {
                    label: i18n("galleryDownloadGap"),
                    type: 'int',
                    "default": prefs.gallery.downloadGap,
                    after: ' ms',
                },
                'gallery.scaleSmallSize': {
                    label: i18n("galleryScaleSmallSize1"),
                    type: 'int',
                    "default": prefs.gallery.scaleSmallSize,
                    after: i18n("galleryScaleSmallSize2")
                },
                'gallery.showSmallSize':{
                    label: i18n("galleryShowSmallSize"),
                    type: 'checkbox',
                    "default": prefs.gallery.showSmallSize
                },
                'gallery.transition': {
                    label: i18n("galleryTransition"),
                    type: 'checkbox',
                    "default": prefs.gallery.transition
                },
                'gallery.disableArrow': {
                    label: i18n("galleryDisableArrow"),
                    type: 'checkbox',
                    "default": prefs.gallery.disableArrow
                },
                'gallery.sidebarPosition': {
                    label: i18n("gallerySidebarPosition"),
                    type: 'select',
                    options: {
                        'bottom': i18n("bottom"),
                        'right': i18n("right"),
                        'left': i18n("left"),
                        'top': i18n("top")
                    },
                    "default": prefs.gallery.sidebarPosition,
                    line: 'start',
                },
                'gallery.sidebarSize': {
                    label: i18n("gallerySidebarSize"),
                    type: 'int',
                    "default": prefs.gallery.sidebarSize,
                    title: i18n("gallerySidebarSizeTip"),
                    after: ' '+i18n("px"),
                    line: 'end',
                },
                'gallery.max': {
                    label: i18n("galleryMax1"),
                    type: 'number',
                    "default": prefs.gallery.max,
                    after: i18n("galleryMax2")
                },
                'gallery.autoZoom': {
                    label: i18n("galleryAutoZoom"),
                    type: 'checkbox',
                    "default": prefs.gallery.autoZoom,
                    title: i18n("galleryAutoZoomTip")
                },
                'gallery.descriptionLength': {
                    label: i18n("galleryDescriptionLength1"),
                    type: 'int',
                    "default": prefs.gallery.descriptionLength,
                    after: i18n("galleryDescriptionLength2")
                },
                'gallery.viewmoreLayout': {
                    label: i18n("galleryViewmoreLayout"),
                    type: 'select',
                    options: {
                        '0': "default",
                        '1': "flex-box"
                    },
                    "default": prefs.gallery.viewmoreLayout
                },
                'gallery.autoOpenViewmore': {
                    label: i18n("autoOpenViewmore"),
                    type: 'checkbox',
                    "default": prefs.gallery.autoOpenViewmore
                },
                'gallery.autoOpenSites': {
                    label: i18n("galleryAutoOpenSites"),
                    type: 'textarea',
                    "default": prefs.gallery.autoOpenSites
                },
                'gallery.searchData': {
                    label: i18n("gallerySearchData"),
                    type: 'textarea',
                    "default": prefs.gallery.searchData
                },
                'gallery.editSite': {
                    label: i18n("galleryEditSite"),
                    type: 'select',
                    options: editSitesName,
                    "default": prefs.gallery.editSite,
                },

                // 图片窗口
                'imgWindow.fitToScreen': {
                    label: i18n("imgWindowFitToScreen"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.fitToScreen,
                    section: [i18n("imgWindow")],
                    title: i18n("imgWindowFitToScreenTip"),
                },
                'imgWindow.fitToScreenSmall': {
                    label: i18n("imgWindowFitToScreenWhenSmall"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.fitToScreenSmall
                },
                'imgWindow.suitLongImg': {
                    label: i18n("suitLongImg"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.suitLongImg
                },
                'imgWindow.defaultTool': {
                    label: i18n("imgWindowDefaultTool"),
                    type: 'select',
                    options: {
                        'hand': i18n("hand"),
                        'rotate': i18n("rotate"),
                        'zoom': i18n("zoom"),
                    },
                    "default": prefs.imgWindow.defaultTool,
                },
                'imgWindow.close.escKey': {
                    label: i18n("imgWindowEscKey"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.close.escKey,
                    line: 'start',
                },
                'imgWindow.close.dblClickImgWindow': {
                    label: i18n("imgWindowDblClickImgWindow"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.close.dblClickImgWindow,
                },
                'imgWindow.close.clickOutside': {
                    label: i18n("imgWindowClickOutside"),
                    type: 'select',
                    options: {
                        '': i18n("none"),
                        'click': i18n("click"),
                        'dblclick': i18n("dblclick"),
                    },
                    "default": prefs.imgWindow.close.clickOutside,
                    title: i18n("imgWindowClickOutsideTip"),
                    line: 'end',
                },
                'imgWindow.backgroundColor': {
                    label: i18n("backgroundColor"),
                    type: 'text',
                    className: 'color',
                    "default": prefs.imgWindow.backgroundColor,
                    line: 'end'
                },
                'imgWindow.overlayer.shown': {
                    label: i18n("imgWindowOverlayerShown"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.overlayer.shown,
                    line: 'start',
                },
                'imgWindow.overlayer.color': {
                    label: i18n("imgWindowOverlayerColor"),
                    type: 'text',
                    className: 'color',
                    "default": prefs.imgWindow.overlayer.color,
                    line: 'end'
                },
                'imgWindow.shiftRotateStep': {
                    label: i18n("imgWindowShiftRotateStep1"),
                    type: 'int',
                    "default": prefs.imgWindow.shiftRotateStep,
                    after: i18n("imgWindowShiftRotateStep2")
                },
                'imgWindow.zoom.mouseWheelZoom': {
                    label: i18n("imgWindowMouseWheelZoom"),
                    type: 'checkbox',
                    "default": prefs.imgWindow.zoom.mouseWheelZoom,
                },
                'imgWindow.zoom.range': {
                    label: i18n("imgWindowZoomRange"),
                    type: 'textarea',
                    "default": prefs.imgWindow.zoom.range.join(', '),
                    title: i18n("imgWindowZoomRangeTip"),
                    attr: {
                        "spellcheck": "false"
                    }
                },
                'imgWindow.zIndex': {
                    label: "z-Index",
                    "default": prefs.imgWindow.zIndex,
                    type: 'int',
                },

                // 其它
                'waitImgLoad': {
                    label: i18n("waitImgLoad"),
                    type: 'checkbox',
                    "default": prefs.waitImgLoad,
                    section: [i18n("others")],
                    title: i18n("waitImgLoadTip")
                },
                'customLang': {
                    label: i18n("customLang"),
                    type: 'select',
                    options: customLangOption,
                    "default": prefs.customLang,
                    line: 'end',
                },
                'saveName': {
                    label: i18n("saveName"),
                    type: 'select',
                    options: {
                        0: i18n("default"),
                        1: i18n("textFirst"),
                        2: i18n("onlyUrl"),
                        3: i18n("urlAndText")
                    },
                    "default": (prefs.saveName || 0),
                    title: i18n("saveNameTip"),
                },
                'debug': {
                    label: i18n("debug"),
                    type: 'checkbox',
                    "default": prefs.debug
                },
                'customRules': {
                    label: i18n("customRules"),
                    type: 'textarea',
                    "default": prefs.customRules
                }
                /*'firstEngine': {
                    label: i18n("firstEngine"),
                    type: 'select',
                    options: {
                        "Tineye":"Tineye",
                        "Google":"Google",
                        "Baidu":"Baidu"
                    },
                    "default": prefs.firstEngine,
                },*/
            },
            events: {
                open: async function(doc, win, frame) {
                    let saveBtn=doc.querySelector("#"+this.id+"_saveBtn");
                    let closeBtn=doc.querySelector("#"+this.id+"_closeBtn");
                    let resetLink=doc.querySelector("#"+this.id+"_resetLink");
                    let customInput=doc.querySelector("#"+this.id+"_field_customRules");
                    customInput.style.height="500px";
                    saveBtn.textContent=i18n("saveBtn");
                    saveBtn.title=i18n("saveBtnTips");
                    closeBtn.textContent=i18n("closeBtn");
                    closeBtn.title=i18n("closeBtnTips");
                    resetLink.textContent=i18n("resetLink");
                    resetLink.title=i18n("resetLinkTips");
                    let searchData=doc.getElementById(this.id+"_field_gallery.searchData");
                    if(searchData && searchData.value==""){
                        searchData.value=defaultSearchData;
                    }
                    let header=doc.getElementById(this.id+"_header");
                    if(header && header.children.length==1){
                        if (!newsInited) {
                            news = await fetch(`https://www.hoothin.com/news.php?from=pvcep&lang=${lang}`).then(response => response.text()).catch(e => console.error(e));
                            newsInited = true;
                        }
                        if (!news) return;
                        let newsEle = document.createElement("div");
                        newsEle.innerHTML = news;
                        header.appendChild(newsEle);
                    }
                },
                save: function() {
                    loadPrefs();
                    storage.setItem("customLang", prefs.customLang);
                }
            }
        });



        loadPrefs();

        var hideIcon=storage.getItem("hideIcon" + location.hostname) || false;
        var hideIconStyle=document.createElement('style');
        hideIconStyle.textContent=`#pv-float-bar-container{display:none!important}`;
        if(hideIcon){
            document.head.appendChild(hideIconStyle);
        }
        _GM_registerMenuCommand(i18n("openConfig"), openPrefs);
        _GM_registerMenuCommand(i18n("openGallery"), openGallery);
        _GM_registerMenuCommand(i18n("hideIcon") + (hideIcon ? "☑️" : ""), ()=>{
            hideIcon=!hideIcon;
            storage.setItem("hideIcon" + location.hostname, hideIcon);
            if(hideIcon){
                document.head.appendChild(hideIconStyle);
            }else{
                document.head.removeChild(hideIconStyle);
            }
        });

        function initKeyInputs() {
            if (!GM_config.frame || !GM_config.frame.contentDocument) return;
            let keyInputs = GM_config.frame.contentDocument.querySelectorAll('input.floatBar-key');
            [].forEach.call(keyInputs, input => {
                input.setAttribute('readOnly', 'readonly');
                input.addEventListener("keydown", e => {
                    if (e.key === 'Escape' || e.key === 'Backspace') input.value = '';
                    else input.value = e.key;
                    e.stopPropagation();
                    e.preventDefault();
                });
            });
        }

        matchedRule = getMatchedRule();
        let editUrl=storage.getItem("editUrl");
        if(editUrl){
            let editFunc=editSitesFunc[prefs.gallery.editSite];
            if(!editFunc)editFunc=editSitesFunc[Object.keys(editSitesFunc)[0]];
            if(editFunc){
                if (document.readyState == 'complete'){
                    editFunc(editUrl);
                }else{
                    let readystatechangeHandler = e => {
                        if (document.readyState == 'complete') {
                            editFunc(editUrl);
                            document.removeEventListener('readystatechange', readystatechangeHandler);
                        }
                    };
                    document.addEventListener('readystatechange', readystatechangeHandler);
                }
            }
        }

        if(prefs.gallery.autoOpenSites){
            var sitesArr=prefs.gallery.autoOpenSites.split("\n");
            for(let s=0;s<sitesArr.length;s++){
                let siteReg=sitesArr[s].trim();
                let autoViewMore=siteReg[0]=="@";
                if(autoViewMore)siteReg=siteReg.substr(1);
                if(new RegExp(siteReg).test(URL)){
                    setTimeout(function(){
                        var gallery = openGallery();
                        if(autoViewMore)gallery.maximizeSidebar();
                    },2000);
                    break;
                }
            }
        }

        // 注册按键
        document.addEventListener('keydown', keydown, true);

        function openPrefs() {
            let fieldsSearchData = GM_config.fields["gallery.searchData"];
            if (fieldsSearchData && fieldsSearchData.value) {
                fieldsSearchData.value = fieldsSearchData.value.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
            }
            let fieldsCustomRules = GM_config.fields.customRules;
            if (fieldsCustomRules && fieldsCustomRules.value) {
                fieldsCustomRules.value = fieldsCustomRules.value.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
            }
            GM_config.open();
            setTimeout(()=>{
                if(GM_config.frame && GM_config.frame.style && GM_config.frame.style.display=="none"){
                    GM_config.frame.src="";
                }
                initKeyInputs();
            },500);
        }

        function loadPrefs() {
            // 根据 GM_config 的 key 载入设置到 prefs
            Object.keys(GM_config.fields).forEach(function(keyStr) {
                var keys = keyStr.split('.');
                var lastKey = keys.pop();

                var lastPref = prefs;
                var curKey = keys.shift();
                while(curKey){
                    lastPref = lastPref[curKey];
                    curKey = keys.shift();
                }

                var value = GM_config.get(keyStr);
                if (typeof value != 'undefined') {
                    // 特殊的
                    if (keyStr == 'magnifier.wheelZoom.range' || keyStr == 'imgWindow.zoom.range') {
                        lastPref[lastKey] = value.split(/[,，]\s*/).map(function(s) { return parseFloat(s)});
                    } else if(keyStr == 'floatBar.butonOrder') {
                        lastPref[lastKey] = value.trim().split(/\s*[,，]\s*/);
                    } else {
                        lastPref[lastKey] = value;
                    }
                }
            });

            debug = prefs.debug ? console.debug.bind(console) : function() {};
        }

    };

    function drawTobase64(img){
        let canvas = document.createElement('CANVAS');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL("image/png");
    }

    function init2(){
        init(topObject,window,document,arrayFn,envir,storage,unsafeWindow);
    };


    //大致检测运行环境
    var envir={
        ie:typeof document.documentMode == 'number',
        firefox:typeof XPCNativeWrapper == 'function',
        opera:!!window.opera,
        chrome:!!window.chrome,
    };

    //ie的话，不支持 < ie9的版本
    if(envir.ie && document.documentMode < 9){
        return;
    };


    var arrayFn=(function(){
        var arrayProto=Array.prototype;
        return {
            find:arrayProto.find,
            slice:arrayProto.slice,
            forEach:arrayProto.forEach,
            some:arrayProto.some,
            every:arrayProto.every,
            map:arrayProto.map,
            filter:arrayProto.filter,
            indexOf:arrayProto.indexOf,
            lastIndexOf:arrayProto.lastIndexOf,
        };

    })();

    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',//chrome的gm函数式空函数
        mxAppStorage:(function(){//傲游扩展储存接口
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            };
        })(),
        operaUJSStorage:(function(){//opera userjs全局存储接口
            try{
                return window.opera.scriptStorage;
            }catch(e){
            };
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            };
        },
        getItem:function(key){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            return value;
        },
    };

    function getUrl(url, callback, onError){
        _GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: callback,
            onerror: onError
        });
    }

    function setSearchState(words, imgState){
        if (imgState) imgState.innerHTML=createHTML(words);
    }

    var searchSort=["Tineye","Google","Baidu"];
    function sortSearch(){
        for(var i=0;i<searchSort.length;i++){
            if(searchSort[i]==prefs.firstEngine){
                searchSort.splice(i,1);
                break;
            }
        }
        searchSort.unshift(prefs.firstEngine);
    }

    function searchImgByImg(imgSrc, imgCon, callBack, onError, noneResult, searchFrom){
        let srcs=[];
        var searchBaidu=function(){
            setSearchState(i18n("beginSearchImg","百度"),imgCon);
            getUrl("http://image.baidu.com/n/same?queryImageUrl="+encodeURIComponent(imgSrc)+"&isguessword=1&rn=30&fr=pc&pn=0&sort=size", function(d){
                let baiduJson;
                try{
                    baiduJson=JSON.parse(d.responseText);
                }catch(e){
                    setSearchState(i18n("findNoPic"),imgCon);
                    setTimeout(function(){
                        setSearchState("",imgCon);
                    },2000);
                    searchNext();
                    return;
                }
                if(baiduJson.data[0]){
                    srcs=[];
                    for(let imgData of baiduJson.data){
                        if(srcs.length>2)break;
                        srcs.push(imgData.objURL);
                    }
                    setSearchState(i18n("findOverBeginLoad",["百度",srcs.length]),imgCon);
                    callBackFun(srcs);
                }else{
                    searchNext();
                    return;
                }
            }, onError);
        };
        var searchGoogle=function(){
            setSearchState(i18n("beginSearchImg","Google"),imgCon);
            getUrl("https://www.google.com/searchbyimage?safe=off&image_url="+encodeURIComponent(imgSrc), function(d){
                let googleHtml=document.implementation.createHTMLDocument('');
                googleHtml.documentElement.innerHTML = d.responseText;
                let sizeUrl=googleHtml.querySelector("div.card-section>div>div>span.gl>a");
                if(sizeUrl){
                    getUrl("https://www.google.com"+sizeUrl.getAttribute("href"), function(d){
                        googleHtml.documentElement.innerHTML = d.responseText;
                        let imgs=googleHtml.querySelectorAll("div.rg_meta");
                        if(imgs.length==0){searchNext();return;}
                        srcs=[];
                        for(var i=0;i<imgs.length;i++){
                            if(srcs.length>2)break;
                            let jsonData=JSON.parse(imgs[i].innerHTML);
                            srcs.push(jsonData.ou);
                        }
                        setSearchState(i18n("findOverBeginLoad",["Google",srcs.length]),imgCon);
                        callBackFun(srcs);
                    }, onError);
                }else{
                    searchNext();
                }
            }, onError);
        };
        var searchTineye=function(){
            setSearchState(i18n("beginSearchImg","Tineye"),imgCon);
            getUrl("https://www.tineye.com/search?url="+encodeURIComponent(imgSrc)+"&sort=size", function(d){
                let tineyeHtml=document.implementation.createHTMLDocument('');
                tineyeHtml.documentElement.innerHTML = d.responseText;
                let searchImg=tineyeHtml.querySelectorAll(".match-details>div.match:first-of-type>p.image-link:first-of-type>a");
                if(searchImg.length>0){
                    srcs=[];
                    for(var i=0;i<searchImg.length;i++){
                        if(srcs.length>2)break;
                        srcs.push(searchImg[i].href);
                    }
                    setSearchState(i18n("findOverBeginLoad",["Tineye",srcs.length]),imgCon);
                    callBackFun(srcs);
                }else{
                    searchNext();
                }
            }, onError);
        };
        var searchNext=function(){
            searchFrom++;
            if(searchFrom<=searchSort.length)switchSearch();
            else{
                if(noneResult)noneResult();
                setSearchState(i18n("findNoPic"),imgCon);
                setTimeout(function(){
                    setSearchState("",imgCon);
                },2000);
            }
        };
        var callBackFun=function(srcs){
            callBack(srcs, searchFrom);
        };
        if(!searchFrom)searchFrom=1;
        var switchSearch=function(){
            switch(searchSort[searchFrom-1]){
                case "Baidu":
                    searchBaidu();
                    break;
                case "Google":
                    searchGoogle();
                    break;
                case "Tineye":
                    searchTineye();
                    break;
                default:
                    searchTineye();
                    break;
            }
        };
        switchSearch();
    }

    init2();

})(this,window,document,(typeof unsafeWindow=='undefined'? window : unsafeWindow));