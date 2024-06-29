// ==UserScript==
// @name         Picviewer CE+ PDF addon
// @name:zh-CN   Picviewer CE+ PDF 扩展
// @name:zh-TW   Picviewer CE+ PDF 擴充
// @namespace    https://github.com/hoothin/UserScripts
// @version      2024-06-29
// @description  Batch Download as PDF instead of ZIP
// @description:zh-CN   取代 ZIP， 打包下载时下载为 PDF
// @description:zh-TW   取代 ZIP， 打包下載時下載為 PDF
// @author       hoothin
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAD////29vbKysoqKioiIiKysrKhoaGTk5N9fX3z8/Pv7+/r6+vk5OTb29vOzs6Ojo5UVFQzMzMZGRkREREMDAy4uLisrKylpaV4eHhkZGRPT08/Pz/IfxjQAAAAgklEQVQoz53RRw7DIBBAUb5pxr2m3/+ckfDImwyJlL9DDzQgDIUMRu1vWOxTBdeM+onApENF0qHjpkOk2VTwLVEF40Kbfj1wK8AVu2pQA1aBBYDHJ1wy9Cf4cXD5chzNAvsAnc8TjoLAhIzsBao9w1rlVTIvkOYMd9nm6xPi168t9AYkbANdajpjcwAAAABJRU5ErkJggg==
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js
// ==/UserScript==

(function() {
    'use strict';
    async function blobToDataURL(blob) {
        return new Promise((resolve) => {
            setTimeout(() => {
                var a = new FileReader();
                a.readAsDataURL(blob);
                a.onload = function (e) {
                    resolve(e.target.result);
                };
                a.onerror = function (e) {
                    resolve(null);
                };
            }, 0);
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
                let fileName = param[0];
                let blob = param[1];
                if (!blob && this.fileList.length === 1) {
                    fileName = this.fileList[0][0];
                    blob = this.fileList[0][1];
                }
                try {
                    let dataUrl = await blobToDataURL(blob);
                    const imgProps = pdf.getImageProperties(dataUrl);
                    const imgWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    const imgHeight = imgProps.height * imgWidth / imgProps.width;
                    let heightLeft = imgHeight;
                    let position = 0;

                    pdf.addImage(dataUrl, blob.type, 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                        position -= pageHeight;
                        pdf.addPage();
                        pdf.addImage(dataUrl, blob.type, 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    progress({percent: (key + 1) / fileLength * 100, currentFile: fileName});
                } catch(e) {
                    console.log(e);
                }
                if (key + 1 < fileLength) {
                    pdf.addPage();
                }
            }
            pdf.save(pdfName);
        };
    }

    const _unsafeWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
    let disabled = !!GM_getValue("pvcep_pdf_disabled"), registerId;
    function registerMenuCommand() {
        if (disabled) {
            _unsafeWindow.pvcepimg2pdf = null;
        } else _unsafeWindow.pvcepimg2pdf = img2pdf;
        registerId = GM_registerMenuCommand(disabled ? "❌ Disabled" : "✅ Enabled", () => {
            GM_unregisterMenuCommand(registerId);
            disabled = !disabled;
            GM_setValue("pvcep_pdf_disabled", disabled);
            registerMenuCommand();
        });
    }
    registerMenuCommand();
})();