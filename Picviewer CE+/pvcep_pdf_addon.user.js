// ==UserScript==
// @name         Picviewer CE+ PDF addon
// @name:zh-CN   Picviewer CE+ PDF 扩展
// @name:zh-TW   Picviewer CE+ PDF 擴充
// @namespace    https://github.com/hoothin/UserScripts
// @version      2024-06-20
// @description  Batch Download as PDF instead of ZIP
// @description:zh-CN   取代 ZIP， 打包下载时下载为 PDF
// @description:zh-TW   取代 ZIP， 打包下載時下載為 PDF
// @author       hoothin
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        unsafeWindow
// @require      https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js
// ==/UserScript==

(function() {
    'use strict';
    async function blobToDataURL(blob) {
        return new Promise((resolve) => {
            var a = new FileReader();
            a.readAsDataURL(blob);
            a.onload = function (e) {
                resolve(e.target.result);
            };
            a.onerror = function (e) {
                resolve(null);
            };
        });
    }

    function img2pdf(pdfName) {
        if (!(this instanceof img2pdf)) {
            return new img2pdf();
        }
        this.fileList = [];
        this.file = async (fileName, blob) => {
            this.fileList.push([fileName, blob]);
        };
        this.generateAsync = async (config, progress) => {
            const pdf = new window.jspdf.jsPDF();
            const fileLength = this.fileList.length;
            for (const [key, param] of this.fileList.entries()) {
                const fileName = param[0];
                let blob = param[1];
                let dataUrl = await blobToDataURL(blob);
                const imgProps = pdf.getImageProperties(dataUrl);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(dataUrl, blob.type, 0, 0, pdfWidth, pdfHeight);
                progress({percent: (key + 1) / fileLength * 100, currentFile: fileName});
                if (key + 1 < fileLength) {
                    pdf.addPage();
                }
            }
            pdf.save(pdfName);
        };
    }
    const _unsafeWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
    _unsafeWindow.pvcepimg2pdf = img2pdf;
})();