// ==UserScript==
// @name         中原 cycu iLearning 2.0 頁面addon
// @namespace    http://ilearning.cycu.edu.tw/
// @version      6.8.7
// @description  可任意拖曳漂浮面板（支援 PC 滑鼠/iPad 觸控與座標記憶）、直接調用 HTML5 Video 原生全螢幕（徹底隱藏 iPadOS Safari 網址列/分頁列，與 YouTube 完全一致）、影片進度條、獨立影片/PDF直載、大綱抽屜解鎖、全格式教材自訂打包 ZIP，並支援 Web Audio 600% 爆音引擎。
// @author       Mangotimmy
// @license      MIT
// @match        *://ilearning.cycu.edu.tw/*
// @grant        none
// @run-at       document-end
// @icon         data:image/png;base64,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
// @downloadURL  https://update.greasyfork.org/scripts/597066/%E4%B8%AD%E5%8E%9F%20iLearning%2020%20%E9%A0%81%E9%9D%A2%E9%AB%94%E9%A9%97%E5%A2%9E%E5%BC%B7.user.js
// @updateURL    https://update.greasyfork.org/scripts/597066/%E4%B8%AD%E5%8E%9F%20iLearning%2020%20%E9%A0%81%E9%9D%A2%E9%AB%94%E9%A9%97%E5%A2%9E%E5%BC%B7.meta.js
// ==/UserScript==

(function () {
    'use strict';

    const config = {
        "討論區": { "title": "討論區", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/forum/1744246650/monologo?filtericon=1" },
        "作業": { "title": "作業", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/assign/1744246650/monologo?filtericon=1" },
        "檔案": { "title": "檔案", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/resource/1757814017/monologo" },
        "資料夾": { "title": "資料夾", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/folder/1757814017/monologo?filtericon=1" },
        "PDF Annotation": { "title": "PDF檔", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/pdfannotator/1744246650/monologo?filtericon=1" },
        "超級影片": { "title": "影片檔", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/supervideo/1744246650/monologo?filtericon=1" },
        "網址": { "title": "網址", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/url/1757814017/monologo?filtericon=1" },
        "回饋單": { "title": "問卷", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/feedback/1744246650/monologo?filtericon=1" },
        "頁面": { "title": "文章", "logo": "https://ilearning.cycu.edu.tw/theme/image.php/boost_union/page/1757814017/monologo?filtericon=1" }
    };
    const order = ["頁面", "討論區", "作業", "PDF Annotation", "檔案", "資料夾", "超級影片", "網址", "回饋單"];

    const CRC_TABLE = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        CRC_TABLE[i] = c;
    }

    function crc32(data) {
        let crc = 0 ^ -1;
        for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xFF];
        return (crc ^ -1) >>> 0;
    }

    // 修復 1980 年解壓縮時間戳記問題
    function getCurrentDosDateTime() {
        const d = new Date();
        const year = Math.max(0, d.getFullYear() - 1980);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = d.getHours();
        const minute = d.getMinutes();
        const second = Math.floor(d.getSeconds() / 2);

        return {
            time: (hour << 11) | (minute << 5) | second,
            date: (year << 9) | (month << 5) | day
        };
    }

    class MiniZip {
        constructor() { this.files = []; }
        file(name, arrayBuffer) { this.files.push({ name: name, bytes: new Uint8Array(arrayBuffer) }); }
        generateBlob() {
            const textEncoder = new TextEncoder();
            const localHeaders = [];
            const centralDirectory = [];
            let offset = 0;
            const { time: dosTime, date: dosDate } = getCurrentDosDateTime();

            for (const file of this.files) {
                const nameBytes = textEncoder.encode(file.name);
                const fileBytes = file.bytes;
                const crc = crc32(fileBytes);
                const size = fileBytes.length;

                const lfh = new Uint8Array(30 + nameBytes.length);
                const dvLfh = new DataView(lfh.buffer);
                dvLfh.setUint32(0, 0x04034b50, true);
                dvLfh.setUint16(4, 20, true);
                dvLfh.setUint16(6, 0x0800, true);
                dvLfh.setUint16(8, 0, true);
                dvLfh.setUint10 = (offset) => {};
                dvLfh.setUint16(10, dosTime, true);
                dvLfh.setUint16(12, dosDate, true);
                dvLfh.setUint32(14, crc, true);
                dvLfh.setUint32(18, size, true);
                dvLfh.setUint32(22, size, true);
                dvLfh.setUint16(26, nameBytes.length, true);
                dvLfh.setUint16(28, 0, true);
                lfh.set(nameBytes, 30);
                localHeaders.push(lfh);
                localHeaders.push(fileBytes);

                const cdfh = new Uint8Array(46 + nameBytes.length);
                const dvCdfh = new DataView(cdfh.buffer);
                dvCdfh.setUint32(0, 0x02014b50, true);
                dvCdfh.setUint16(4, 20, true);
                dvCdfh.setUint16(6, 20, true);
                dvCdfh.setUint16(8, 0x0800, true);
                dvCdfh.setUint16(10, 0, true);
                dvCdfh.setUint16(12, dosTime, true);
                dvCdfh.setUint16(14, dosDate, true);
                dvCdfh.setUint32(16, crc, true);
                dvCdfh.setUint32(20, size, true);
                dvCdfh.setUint32(24, size, true);
                dvCdfh.setUint16(28, nameBytes.length, true);
                dvCdfh.setUint16(30, 0, true);
                dvCdfh.setUint16(32, 0, true);
                dvCdfh.setUint16(34, 0, true);
                dvCdfh.setUint16(36, 0, true);
                dvCdfh.setUint32(38, 0, true);
                dvCdfh.setUint32(42, offset, true);
                cdfh.set(nameBytes, 46);
                centralDirectory.push(cdfh);
                offset += lfh.length + fileBytes.length;
            }

            let cdSize = 0;
            for (const chunk of centralDirectory) cdSize += chunk.length;
            const eocd = new Uint8Array(22);
            const dvEocd = new DataView(eocd.buffer);
            dvEocd.setUint32(0, 0x06054b50, true);
            dvEocd.setUint16(4, 0, true);
            dvEocd.setUint16(6, 0, true);
            dvEocd.setUint16(8, this.files.length, true);
            dvEocd.setUint16(10, this.files.length, true);
            dvEocd.setUint32(12, cdSize, true);
            dvEocd.setUint32(16, offset, true);
            dvEocd.setUint16(20, 0, true);

            return new Blob([...localHeaders, ...centralDirectory, eocd], { type: 'application/zip' });
        }
    }

    function showToast(message, isError = false) {
        let toast = document.getElementById('dl-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'dl-toast';
            Object.assign(toast.style, {
                position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', padding: '10px 16px',
                borderRadius: '12px', color: 'white', fontSize: '12px', fontWeight: '600', zIndex: '1000002',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: '10px',
                width: 'calc(100% - 32px)', maxWidth: '400px', transition: 'all 0.3s ease', opacity: '0'
            });
            document.body.appendChild(toast);
            setTimeout(() => { toast.style.opacity = '1'; toast.style.bottom = '30px'; }, 10);
        }
        toast.style.
