// ==UserScript==
// @name         中原iLearning 2.0 頁面體驗增強 (v6.8.0 HTML5原生全螢幕極限版)
// @namespace    http://tampermonkey.net/
// @version      6.8.0
// @description  修復 CRC_TABLE 遺失問題。提供直接調用 HTML5 Video 原生全螢幕 (徹底隱藏 iPadOS Safari 網址列/分頁列，與 YouTube 完全一致)、影片進度條、獨立影片/PDF直載、大綱抽屜解鎖、全格式教材自訂打包 ZIP，並支援 Web Audio 600% 爆音引擎。
// @icon         data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKHzzACd78xkoffM3LIH0MD+N9Qcjf/QALof1ICuH9TguivUrOpL2A4nA+gE0k/YnLI/2ODOT9ywAAAAAAAAAACh88wAne/NuKH3z9iyB9NQ/jfUdI4D0AC6H9Y4rh/X5Lor1vjqS9g2JwPoFNZP2rCyP9vczk/fEZJb1AmOV9QYqfvMAJ3zzdCh98/8sgfTgP431HySA9AAuiPWWK4f1/y6K9ck6kvYNicD6BTWT9rYsj/b/M5T3zzt68yI0dfIxLXrzACd883QoffP/LIH04D+N9R8kgPQAL4j1liuH9f8uivXJOpL1DYnA+gU1k/a2LY/2/zOU9880dfJNMnPySSp38gAnfPN0KH7z/yyC9eBAjvYfJID1AC+I9ZYrh/X/Lov1yTuT9g2JwPoFNZP2ti2P9v8zlPfPO3rzPDt68y8uevIAKHzzdCl98P8ugO7iQovtIRt57wAviPWYK4f1/y6L9cs8k/YOf7v6BTST9rcsj/b/M5T3zzt68U/fPQQRWyrAFV0oHpTa4//R1l1+EJFTKlET2FXMIj0xCuH9f8ui/XnPpX2QUCY9y8wkPbWLI/2/zOU975mjdgedoy3LpKNiB9hXl2ZT0xM/0VCQ/80MjT/Ky00+S1foP0th/P9LIn1/y6M9eoujvbmLI72/y+Q9vQ7mPdpkJ++G3mEnnxqb33QWlxl9UtLUP9BQEP/NTQ3/ygnKf/qMT7TOYHZczKN960vjPXcL4723jCQ9r84lfZhV6b4CHR8jwB9hpwGZmx8PFVaaZlFS1rfOzxF+y8uMf
// @match        *://ilearning.cycu.edu.tw/*
// @grant        none
// @run-at       document-end
// @license      MIT
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

    function showToast(message, isError = false) {
        let toast = document.getElementById('dl-toast');
        if (!toast) {
            toast = document.createElement('div'); toast.id = 'dl-toast';
            Object.assign(toast.style, {
                position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', padding: '16px 22px', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '500', zIndex: '10001',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '12px', width: 'calc(100% - 32px)', maxWidth: '420px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', opacity: '0'
            });
            document.body.appendChild(toast); setTimeout(() => { toast.style.opacity = '1'; toast.style.bottom = '40px'; }, 10);
        }
        toast.style.backgroundColor = isError ? '#ef4444' : '#1e293b'; toast.innerHTML = `<span style="flex-grow:1; line-height:1.4;">${message}</span>`;
        if (isError) {
            const closeBtn = document.createElement('span'); closeBtn.innerHTML = '✕'; closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; opacity:0.7; margin-left:12px; font-size:16px; padding:4px;';
            closeBtn.onclick = () => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }; toast.appendChild(closeBtn);
        }
        return toast;
    }

    function crc32(data) {
        let crc = 0 ^ -1;
        for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xFF];
        return (crc ^ -1) >>> 0;
    }

    class MiniZip {
        constructor() { this.files = []; }
        file(name, arrayBuffer) { this.files.push({ name: name, bytes: new Uint8Array(arrayBuffer) }); }
        generateBlob() {
            const textEncoder = new TextEncoder(); const localHeaders = []; const centralDirectory = []; let offset = 0;
            const now = new Date();
            const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (Math.floor(now.getSeconds() / 2));
            const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
            
            for (const file of this.files) {
                const nameBytes = textEncoder.encode(file.name); const fileBytes = file.bytes; const crc = crc32(fileBytes); const size = fileBytes.length;
                const lfh = new Uint8Array(30 + nameBytes.length); const dvLfh = new DataView(lfh.buffer);
                dvLfh.setUint32(0, 0x04034b50, true); dvLfh.setUint16(4, 20, true); dvLfh.setUint16(6, 0x0800, true); dvLfh.setUint16(8, 0, true);
                dvLfh.setUint16(10, dosTime, true); dvLfh.setUint16(12, dosDate, true); dvLfh.setUint32(14, crc, true); dvLfh.setUint32(18, size, true); dvLfh.setUint32(22, size, true);
                dvLfh.setUint16(26, nameBytes.length, true); dvLfh.setUint16(28, 0, true); lfh.set(nameBytes, 30);
                localHeaders.push(lfh); localHeaders.push(fileBytes);
                const cdfh = new Uint8Array(46 + nameBytes.length); const dvCdfh = new DataView(cdfh.buffer);
                dvCdfh.setUint32(0, 0x02014b50, true); dvCdfh.setUint16(4, 20, true); dvCdfh.setUint16(6, 20, true); dvCdfh.setUint16(8, 0x0800, true); dvCdfh.setUint16(10, 0, true);
                dvCdfh.setUint16(12, dosTime, true); dvCdfh.setUint16(14, dosDate, true); dvCdfh.setUint32(16, crc, true); dvCdfh.setUint32(20, size, true); dvCdfh.setUint32(24, size, true);
                dvCdfh.setUint16(28, nameBytes.length, true); dvCdfh.setUint16(30, 0, true); dvCdfh.setUint16(32, 0, true); dvCdfh.setUint16(34, 0, true); dvCdfh.setUint16(36, 0, true);
                dvCdfh.setUint32(38, 0, true); dvCdfh.setUint32(42, offset, true); cdfh.set(nameBytes, 46);
                centralDirectory.push(cdfh); offset += lfh.length + fileBytes.length;
            }
            let cdSize = 0; for (const chunk of centralDirectory) cdSize += chunk.length;
            const eocd = new Uint8Array(22); const dvEocd = new DataView(eocd.buffer);
            dvEocd.setUint32(0, 0x06054b50, true); dvEocd.setUint16(4, 0, true); dvEocd.setUint16(6, 0, true);
            dvEocd.setUint16(8, this.files.length, true); dvEocd.setUint16(10, this.files.length, true);
            dvEocd.setUint32(12, cdSize, true); dvEocd.setUint32(16, offset, true); dvEocd.setUint16(20, 0, true);
            return new Blob([...localHeaders, ...centralDirectory, eocd], { type: 'application/zip' });
        }
    }

    const style = document.createElement('style');
    style.id = 'cycu-global-style';
    style.innerHTML = `
        #at-bubble, .at-bubble, .at-btn, .at-bubble-container, #at-popup, #userwayAccessibilityIcon, .userway-accessibility-icon { display: none !important; visibility: hidden !important; pointer-events: none !important; opacity: 0 !important; }
        .dashboard-card-deck .dashboard-card { border-radius: 16px !important; border: 1px solid #e2e8f0 !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important; margin-bottom: 16px !important; }
        select.form-select, .form-control, .btn-secondary { border-radius: 10px !important; border: 1px solid #cbd5e1 !important; font-size: 13px !important; padding: 8px 12px !important; background-color: #ffffff !important; color: #334155 !important; -webkit-appearance: auto !important; }
        .cycu-collapse-content.collapse:not(.show) { display: none !important; }
        .cycu-collapse-content.collapse.show { display: block !important; animation: fadeIn 0.25s ease; }
        .cycu-accordion-header { cursor: pointer; -webkit-tap-highlight-color: transparent; border-radius: 12px; transition: background 0.2s; padding: 4px; }
        .cycu-accordion-header:active { background: #f1f5f9; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

        body.cycu-clean-mod-header #page-header, body.cycu-clean-mod-header .activity-header, body.cycu-clean-mod-header .page-context-header, body.cycu-clean-mod-header .breadcrumb { display: none !important; height: 0 !important; opacity: 0 !important; visibility: hidden !important; margin: 0 !important; padding: 0 !important; pointer-events: none !important; overflow: hidden !important; }
        body.cycu-clean-mod-header #page { margin-top: 15px !important; }
        body.cycu-clean-mod-header #region-main { padding-top: 0 !important; margin-top: 0 !important; }

        body.cycu-pdf-focus-mode #page-header, body.cycu-pdf-focus-mode #usernavigation, body.cycu-pdf-focus-mode .navbar, body.cycu-pdf-focus-mode header, body.cycu-pdf-focus-mode .fixed-top, body.cycu-pdf-focus-mode #page-footer, body.cycu-pdf-focus-mode .breadcrumb, body.cycu-pdf-focus-mode #nav-drawer { display: none !important; height: 0 !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
        body.cycu-pdf-focus-mode { padding-top: 0 !important; margin-top: 0 !important; }
        body.path-mod-pdfannotator #page { margin-top: 0 !important; padding-top: 0 !important; top: 0 !important; }
        body.cycu-pdf-focus-mode #region-main { padding: 0 !important; margin: 0 !important; border: none !important; }
        .cycu-pdf-btn-active { background-color: #4f46e5 !important; color: white !important; border-color: #4f46e5 !important; }

        /* Video Focus Mode (Fallback Pseudo-Fullscreen) */
        body.cycu-video-focus-mode { overflow: hidden !important; background: black !important; }
        body.cycu-video-focus-mode .cycu-pseudo-fullscreen {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            z-index: 99998 !important;
            background: black !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            max-width: none !important;
            max-height: none !important;
        }
        body.cycu-video-focus-mode .cycu-pseudo-fullscreen iframe, 
        body.cycu-video-focus-mode .cycu-pseudo-fullscreen video { 
            width: 100% !important; 
            height: 100% !important; 
            max-width: 100% !important; 
            max-height: 100% !important; 
            border: none !important; 
        }

        #cycu-video-assistant {
            position: fixed !important; 
            top: 0 !important; 
            left: 50% !important; 
            transform: translateX(-50%) !important; 
            width: 100% !important;
            max-width: 950px !important;
            z-index: 99999 !important;
            transition: opacity 0.4s ease, top 0.4s ease; 
            border-radius: 0 0 16px 16px !important; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        body.cycu-video-focus-mode #cycu-video-assistant { 
            opacity: 0;
            top: -50px !important;
        }
        body.cycu-video-focus-mode #cycu-video-assistant:hover { 
            opacity: 1 !important; 
            top: 0 !important;
        }

        body.cycu-pdf-hide-native #pdfannotator-toolbar, body.cycu-pdf-hide-native .pdfannotator-toolbar, body.cycu-pdf-hide-native .annotator-toolbar { display: none !important; height: 0 !important; overflow: hidden !important; pointer-events: none !important; opacity: 0 !important; }
        body.cycu-pdf-hide-native .nav-tabs, body.cycu-pdf-hide-native #annotator-tabs, body.cycu-pdf-hide-native #pdfannotator-questions, body.cycu-pdf-hide-native .questions-footer, body.cycu-pdf-hide-native #questions-container, body.cycu-pdf-hide-native #pdfannotator-bottom, body.cycu-pdf-hide-native #discussion-container { display: none !important; height: 0 !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; margin: 0 !important; padding: 0 !important; }

        body.path-mod-pdfannotator #body-wrapper { height: 82vh !important; min-height: 680px !important; padding: 0 12px !important; }
        body.path-mod-pdfannotator #region-main-box, body.path-mod-pdfannotator #region-main { height: 100% !important; min-height: 100% !important; }
        body.cycu-pdf-hide-native #comment-wrapper, body.cycu-pdf-hide-native .comment-wrapper { display: none !important; height: 0 !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; margin: 0 !important; padding: 0 !important; width: 0 !important; }
        body.cycu-pdf-hide-native #content-wrapper { width: 100% !important; max-width: 100% !important; flex: 0 0 100% !important; float: none !important; padding: 0 !important; margin: 0 !important; height: 100% !important; }

        #cycu-pdf-assistant { position: sticky !important; top: 50px !important; z-index: 1000 !important; background: #ffffff !important; box-shadow: 0 4px 15px rgba(0,0,0,0.06) !important; transition: top 0.2s; }
        body.cycu-pdf-focus-mode #cycu-pdf-assistant { top: 0 !important; }

        .nav-tabs, #annotator-tabs, #pdfannotator-toolbar, .pdfannotator-toolbar, #pdfannotator-questions { position: relative !important; z-index: 50 !important; }
        .pdfannotator-viewer { position: relative !important; display: block !important; width: 100% !important; height: 100% !important; min-height: 100% !important; margin-top: 0 !important; border-top: none !important; }
        .pdfannotator-viewer iframe, iframe[src*="viewer.html"] { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; border: none !important; z-index: 1 !important; }
        body.cycu-pdf-focus-mode #body-wrapper { height: calc(100vh - 60px) !important; min-height: calc(100vh - 60px) !important; }

        body.cycu-iframe-dark-mode { background-color: #1a1a1a !important; }
        body.cycu-iframe-dark-mode .page, body.cycu-iframe-dark-mode .canvasWrapper { filter: invert(0.9) contrast(1.1) hue-rotate(180deg) !important; }

        body.pagelayout-embedded, body.path-mod-supervideo, body.path-mod-pdfannotator, body.cycu-clean-mod-header { overflow: auto !important; overflow-y: auto !important; height: auto !important; min-height: 100% !important; -webkit-overflow-scrolling: touch !important; }

        #map-visualization { position: absolute !important; top: auto !important; bottom: -20px !important; left: 0 !important; width: 100% !important; margin: 0 !important; z-index: 10 !important; display: block !important; visibility: visible !important; opacity: 1 !important; }

        #theme_boost-drawers-courseindex { display: block !important; }
        #cycu-floating-drawer-toggle { position: fixed; top: 50%; left: 0; transform: translateY(-50%); z-index: 10000; background: #0ea5e9; color: white; border: none; padding: 15px 10px; border-radius: 0 10px 10px 0; cursor: pointer; box-shadow: 2px 0 10px rgba(0,0,0,0.1); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        #cycu-floating-drawer-toggle.cycu-drawer-open { left: 315px; background: #ef4444; }
        @media (max-width: 576px) { #cycu-floating-drawer-toggle.cycu-drawer-open { left: 285px; } }

        #cycu-file-select-modal {
            position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
            z-index: 100002; display: none; align-items: center; justify-content: center;
            padding: 16px; box-sizing: border-box;
        }
        #cycu-fs-card {
            background: #ffffff; width: 100%; max-width: 720px; max-height: 88vh;
            border-radius: 20px; display: flex; flex-direction: column;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden;
            animation: fadeIn 0.2s ease-out;
        }
        .cycu-fs-filter-chip {
            padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
            border: 1px solid #cbd5e1; background: #f8fafc; color: #475569;
            cursor: pointer; transition: all 0.2s; -webkit-tap-highlight-color: transparent;
        }
        .cycu-fs-filter-chip.active {
            background: #4f46e5; color: white; border-color: #4f46e5;
        }
        .cycu-fs-item-row {
            display: flex; align-items: center; gap: 10px; padding: 10px 12px;
            border-radius: 10px; transition: background 0.15s; cursor: pointer;
        }
        .cycu-fs-item-row:hover { background: #f1f5f9; }
    `;
    document.head.appendChild(style);

    let ytPlayerState = { currentTime: 0, duration: 0, lastUpdated: 0 };
    window.cycu_user_seeking = false;

    window.addEventListener('message', (event) => {
        try {
            let data = event.data;
            if (typeof data === 'string') data = JSON.parse(data);
            if (data && data.event === 'infoDelivery' && data.info) {
                if (typeof data.info.currentTime !== 'undefined') ytPlayerState.currentTime = data.info.currentTime;
                if (typeof data.info.duration !== 'undefined') ytPlayerState.duration = data.info.duration;
                if (typeof data.info.playerState !== 'undefined') updatePlayButtonUI(data.info.playerState === 1);
                ytPlayerState.lastUpdated = Date.now();
            }
        } catch (e) {}
    });

    let ytHooked = false;
    const hookYtTimer = setInterval(() => {
        if (window.YT && window.YT.Player && window.YT.Player.prototype && typeof window.YT.Player.prototype.seekTo === 'function' && !ytHooked) {
            ytHooked = true;
            const originalSeekTo = window.YT.Player.prototype.seekTo;
            window.YT.Player.prototype.seekTo = function(seconds, allowSeekAhead) {
                if (window.cycu_user_seeking) {
                    return originalSeekTo.apply(this, arguments);
                } else {
                    try {
                        const current = this.getCurrentTime();
                        if (seconds < current - 1.5) return;
                    } catch(e) {}
                    return originalSeekTo.apply(this, arguments);
                }
            };
            clearInterval(hookYtTimer);
        }
    }, 200);

    try {
        const originalCurrentTimeDesc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');
        if (originalCurrentTimeDesc && originalCurrentTimeDesc.set) {
            Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', {
                configurable: true, enumerable: true,
                get: function() { return originalCurrentTimeDesc.get.call(this); },
                set: function(val) {
                    if (window.cycu_user_seeking) {
                        originalCurrentTimeDesc.set.call(this, val);
                    } else {
                        const current = originalCurrentTimeDesc.get.call(this);
                        if (val < current - 1.5) return;
                        originalCurrentTimeDesc.set.call(this, val);
                    }
                }
            });
        }
    } catch(e) {}

    function findYTPlayer() {
        const keys = ['player', 'ytplayer', 'videoPlayer', 'api', 'player1', 'player2'];
        for (const key of keys) {
            try { if (window[key] && typeof window[key].seekTo === 'function') return window[key]; } catch (e) {}
        }
        try {
            if (window.YT && typeof window.YT.get === 'function') {
                const iframes = document.querySelectorAll('iframe');
                for (const iframe of iframes) {
                    const p = window.YT.get(iframe.id) || window.YT.get(iframe);
                    if (p && typeof p.seekTo === 'function') return p;
                }
            }
        } catch (e) {}
        return null;
    }

    function sendCommandToYTIframes(funcName, args = []) {
        try {
            document.querySelectorAll('iframe[src*="youtube.com"]').forEach(iframe => {
                if (iframe.contentWindow) {
                    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: funcName, args: args }), '*');
                }
            });
        } catch (e) {}
    }

    function enableYouTubeJsApi() {
        document.querySelectorAll('iframe[src*="youtube.com/embed/"]').forEach((iframe, idx) => {
            if (!iframe.id) iframe.id = 'cycu-yt-iframe-' + idx;
            if (!iframe.src.includes('enablejsapi=1')) {
                try {
                    let url = new URL(iframe.src);
                    url.searchParams.set('enablejsapi', '1');
                    url.searchParams.set('origin', window.location.origin);
                    iframe.src = url.toString();
                } catch(e) {}
            }
        });
    }

    function getVideoStatus() {
        const v = document.querySelector('video');
        if (v && v.duration > 0) return { current: v.currentTime, duration: v.duration, type: 'html5' };
        if (ytPlayerState.duration > 0 && (Date.now() - ytPlayerState.lastUpdated < 3000)) {
            return { current: ytPlayerState.currentTime, duration: ytPlayerState.duration, type: 'yt-message' };
        }
        const yt = findYTPlayer();
        if (yt) {
            try {
                const current = yt.getCurrentTime(); const duration = yt.getDuration();
                if (duration > 0) return { current, duration, type: 'yt-api' };
            } catch(e) {}
        }
        return { current: 0, duration: 0, type: 'none' };
    }

    function setVideoTime(dest) {
        window.cycu_user_seeking = true;
        const status = getVideoStatus();
        if (status.type === 'html5') {
            const v = document.querySelector('video');
            if (v) v.currentTime = dest;
        } else {
            const yt = findYTPlayer();
            if (yt) { try { yt.seekTo(dest, true); } catch(e) {} }
            sendCommandToYTIframes('seekTo', [dest, true]);
            ytPlayerState.currentTime = dest;
        }
        setTimeout(() => { window.cycu_user_seeking = false; }, 800);
    }

    function setVideoSpeed(speed) {
        const status = getVideoStatus();
        if (status.type === 'html5') {
            const v = document.querySelector('video');
            if (v) v.playbackRate = speed;
        } else {
            const yt = findYTPlayer();
            if (yt) { try { yt.setPlaybackRate(speed); } catch(e) {} }
            sendCommandToYTIframes('setPlaybackRate', [speed]);
        }
    }

    function togglePlay() {
        const status = getVideoStatus();
        if (status.type === 'html5') {
            const v = document.querySelector('video');
            if (v) {
                if (v.paused) { v.play(); updatePlayButtonUI(true); }
                else { v.pause(); updatePlayButtonUI(false); }
            }
        } else {
            const btn = document.getElementById('cycu-v-play');
            const isPlaying = btn && btn.getAttribute('data-playing') === 'true';
            const yt = findYTPlayer();
            if (isPlaying) {
                if (yt) { try { yt.pauseVideo(); } catch(e) {} }
                sendCommandToYTIframes('pauseVideo');
                updatePlayButtonUI(false);
            } else {
                if (yt) { try { yt.playVideo(); } catch(e) {} }
                sendCommandToYTIframes('playVideo');
                updatePlayButtonUI(true);
            }
        }
    }

    function updatePlayButtonUI(isPlaying) {
        const btn = document.getElementById('cycu-v-play');
        if (btn) {
            btn.setAttribute('data-playing', isPlaying ? 'true' : 'false');
            if (isPlaying) {
                btn.innerHTML = "⏸️ 暫停";
                btn.style.backgroundColor = "#fee2e2";
                btn.style.color = "#ef4444";
                btn.style.borderColor = "#fecaca";
            } else {
                btn.innerHTML = "▶️ 播放";
                btn.style.backgroundColor = "#fff";
                btn.style.color = "#3b82f6";
                btn.style.borderColor = "#e2e8f0";
            }
        }
    }

    // 擴音引擎核心 (Audio Context Booster)
    function initAudioBooster(videoEl) {
        if (!window.cycuAudioCtx) {
            try {
                window.cycuAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
                window.cycuMediaSource = window.cycuAudioCtx.createMediaElementSource(videoEl);
                window.cycuGainNode = window.cycuAudioCtx.createGain();
                window.cycuMediaSource.connect(window.cycuGainNode);
                window.cycuGainNode.connect(window.cycuAudioCtx.destination);
                window.cycuGainNode.gain.value = 1.0;
            } catch (e) {
                console.warn("iLearning Audio Booster 初始化失敗:", e);
            }
        }
        if (window.cycuAudioCtx && window.cycuAudioCtx.state === 'suspended') {
            window.cycuAudioCtx.resume();
        }
    }

    // 偵測目前頁面中的影片下載位址
    function findCurrentVideoDownloadUrl() {
        const v = document.querySelector('video');
        if (v) {
            if (v.currentSrc && v.currentSrc.startsWith('http')) return v.currentSrc;
            if (v.src && v.src.startsWith('http')) return v.src;
        }
        const source = document.querySelector('video source');
        if (source && source.src && source.src.startsWith('http')) return source.src;
        
        const pageHtml = document.documentElement.innerHTML;
        const mp4Match = pageHtml.match(/https?:\/\/[^"'\s]+\.mp4(?:\?[^"'\s]*)?/);
        if (mp4Match) return mp4Match[0];
        
        return null;
    }

    setInterval(() => {
        const limitVars = ['highest_time', 'maxTime', 'playedTime', 'last_time', 'checkTime', 'highestTime', 'played', 'max_played', 'limit_time'];
        limitVars.forEach(v => { try { if (typeof window[v] !== 'undefined') window[v] = 99999; } catch(e) {} });
    }, 500);

    setInterval(() => { sendCommandToYTIframes('addEventListener', ['onStateChange']); }, 2000);

    function createVideoAssistant() {
        if (document.getElementById('cycu-video-assistant')) return;
        const container = document.querySelector('#region-main') || document.querySelector('#page-content') || document.body;
        if (!container) return;

        let isCollapsed = localStorage.getItem('cycu_video_assistant_collapsed') === 'true';

        // 浮動展開按鈕
        const toggleFab = document.createElement('button');
        toggleFab.id = 'cycu-video-assistant-toggle';
        toggleFab.innerHTML = "🎬";
        toggleFab.style.cssText = "position:fixed; bottom:20px; left:20px; width:48px; height:48px; border-radius:24px; background:#4f46e5; color:white; border:none; box-shadow:0 4px 15px rgba(0,0,0,0.2); font-size:24px; cursor:pointer; z-index:100000; display:none; outline:none;";
        document.body.appendChild(toggleFab);

        const assistantCard = document.createElement('div');
        assistantCard.id = 'cycu-video-assistant';
        assistantCard.innerHTML = `
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-top:none; border-radius: 0 0 16px 16px; overflow:hidden; width:100%;">
                <div style="background:#3b82f6; padding:12px 18px; color:white; display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:8px;"><span style="font-size:16px;">🎬</span><span style="font-weight:700; font-size:14px; color:white !important;">iLearning 影片播放解鎖助理</span></div>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:11px; opacity:0.9; font-weight:bold;" class="cycu-hide-on-collapse">已自動解鎖快進跳轉 🔓</span>
                        <button id="cycu-v-collapse-btn" style="background:rgba(255,255,255,0.25); border:none; border-radius:6px; color:white; padding:4px 10px; font-size:11px; cursor:pointer; outline:none; font-weight:bold;">
                            ${isCollapsed ? '展開 ＋' : '收折 －'}
                        </button>
                        <button id="cycu-v-close-btn" style="background:#ef4444; border:none; border-radius:6px; color:white; padding:4px 10px; font-size:12px; cursor:pointer; outline:none; font-weight:bold;" title="完全隱藏">
                            ✖
                        </button>
                    </div>
                </div>
                <div id="cycu-v-assistant-body" style="padding:16px 20px; display:${isCollapsed ? 'none' : 'flex'}; flex-direction:column; gap:14px; background:#ffffff;">
                    <div style="display:flex; flex-direction:column; gap:8px; border-bottom:1px dashed #e2e8f0; padding-bottom:14px;">
                        <div style="display:flex; align-items:center; justify-content:space-between; font-size:12px; color:#f97316; font-weight:bold;"><span>⏱️ 拖曳調整進度</span><span id="cycu-video-time-display">00:00 / 00:00</span></div>
                        <input type="range" id="cycu-video-slider" min="0" max="100" value="0" style="width:100%; height:6px; border-radius:4px; background:#e2e8f0; outline:none; -webkit-appearance:none; cursor:pointer;">
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr 1.5fr 1fr 1fr; gap:10px;">
                        <button id="cycu-v-rew30" style="padding:10px 4px; border-radius:8px; border:1px solid #cbd5e1; background:white; color:#3b82f6; font-weight:700; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">⏮️ 30s</button>
                        <button id="cycu-v-rew10" style="padding:10px 4px; border-radius:8px; border:1px solid #cbd5e1; background:white; color:#3b82f6; font-weight:700; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">⏪ 10s</button>
                        <button id="cycu-v-play" data-playing="false" style="padding:10px 4px; border-radius:8px; border:1px solid #e2e8f0; background:white; color:#3b82f6; font-weight:700; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent; transition: all 0.2s;">▶️ 播放</button>
                        <button id="cycu-v-fwd10" style="padding:10px 4px; border-radius:8px; border:1px solid #cbd5e1; background:white; color:#3b82f6; font-weight:700; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">10s ⏩</button>
                        <button id="cycu-v-fwd30" style="padding:10px 4px; border-radius:8px; border:1px solid #cbd5e1; background:white; color:#3b82f6; font-weight:700; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">30s ⏭️</button>
                    </div>
                    <div style="border-top:1px dashed #e2e8f0; padding-top:14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                        <span style="font-size:12px; color:#f97316; font-weight:bold;">⚡ 播放控制:</span>
                        <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;" id="cycu-speed-container">
                            <button id="cycu-video-focus-toggle" style="border:1px solid #4f46e5; background:#4f46e5; color:white; border-radius:6px; padding:6px 12px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;" title="調用 HTML5 原生播放器全螢幕 (徹底隱藏 iPad 網址列)">🔍 原生全螢幕</button>
                            <button id="cycu-v-download-btn" style="border:1px solid #059669; background:#10b981; color:white; border-radius:6px; padding:6px 12px; font-size:12px; font-weight:bold; cursor:pointer; outline:none; display:flex; align-items:center; gap:4px;" title="離線下載此影片檔">📥 下載影片</button>
                            <button id="cycu-v-cc-toggle" style="border:1px solid #10b981; background:#ecfdf5; color:#059669; border-radius:6px; padding:6px 12px; font-size:12px; font-weight:bold; cursor:pointer; outline:none; margin-right: 4px;">💬 AI字幕</button>
                            
                            <div style="display:flex; align-items:center; gap:6px; margin-right: 6px; border:1px solid #cbd5e1; border-radius:6px; padding:4px 10px; background:#f8fafc;">
                                <button id="cycu-v-mute-toggle" style="background:transparent; border:none; padding:0; cursor:pointer; font-size:14px; outline:none; color:#94a3b8;">🔊</button>
                                <input type="range" id="cycu-v-volume-slider" min="0" max="600" value="100" style="width:70px; height:6px; border-radius:3px; background:#e2e8f0; outline:none; -webkit-appearance:none; cursor:pointer; accent-color:#f97316;">
                                <span id="cycu-v-volume-display" style="font-size:11px; color:#f97316; font-weight:bold; width:36px; text-align:right;">100%</span>
                                <button id="cycu-v-max-vol" style="background:#ef4444; border:none; border-radius:4px; color:white; padding:2px 6px; font-size:10px; cursor:pointer; font-weight:bold; margin-left:4px;" title="一鍵 600% 爆音">MAX</button>
                            </div>

                            <button class="cycu-speed-btn" data-speed="1.0" style="border:1px solid #cbd5e1; background:white; color:#f97316; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;">1.0x</button>
                            <button class="cycu-speed-btn" data-speed="1.25" style="border:1px solid #cbd5e1; background:white; color:#f97316; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;">1.25x</button>
                            <button class="cycu-speed-btn" data-speed="1.5" style="border:1px solid #cbd5e1; background:white; color:#f97316; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;">1.5x</button>
                            <button class="cycu-speed-btn" data-speed="2.0" style="border:1px solid #cbd5e1; background:white; color:#f97316; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;">2.0x</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- AI 字幕引導彈窗 -->
            <div id="cycu-cc-guide" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000001; background:white; padding:24px; border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,0.25); width:90%; max-width:380px; text-align:center; border: 2px solid #10b981;">
                <h3 style="margin:0 0 12px 0; color:#059669; font-size:18px; display:flex; align-items:center; justify-content:center; gap:8px;"><span>💬</span> 開啟 AI 即時字幕與翻譯</h3>
                <p style="font-size:13px; color:#475569; line-height:1.6; text-align:left; margin-bottom:12px;">iLearning 影片本身無字幕，但您可直接喚醒瀏覽器內建的免費 AI 引擎，將老師的聲音即時轉為中文字幕！</p>
                <div style="background:#ecfdf5; padding:12px; border-radius:8px; text-align:left; font-size:12px; color:#064e3b; margin-bottom:16px; border:1px solid #a7f3d0;">
                    <b style="font-size:13px;">💻 電腦版 (Chrome / Edge)：</b><br>
                    1. 點擊瀏覽器視窗右上角的 <b>🎵 (媒體控制)</b> 圖示。<br>
                    2. 開啟 <b>「即時字幕 (Live Caption)」</b> 開關。<br>
                    3. 點開設定，勾選 <b>「即時翻譯」</b> 並選擇繁體中文。<br>
                    <br>
                    <b style="font-size:13px;">📱 手機版 (iOS / Android)：</b><br>
                    - iOS: 系統設定 > 輔助使用 > 即時字幕 (Beta)<br>
                    - Android: 按一下實體音量鍵 > 點擊字幕圖示
                </div>
                <button id="cycu-cc-guide-close" style="background:#10b981; color:white; border:none; padding:10px 24px; border-radius:8px; font-weight:bold; cursor:pointer; width:100%; box-shadow:0 4px 10px rgba(16,185,129,0.3);">👌 我知道了，現在去開</button>
            </div>
        `;
        document.body.insertBefore(assistantCard, document.body.firstChild);

        // 下載影片點擊事件
        document.getElementById('cycu-v-download-btn').addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = findCurrentVideoDownloadUrl();
            if (videoUrl) {
                showToast("🚀 已取得影片來源，正在為您開啟下載...");
                const titleMatch = document.title.split('|')[0].trim() || '課程影片';
                const a = document.createElement('a');
                a.href = videoUrl;
                a.download = `${titleMatch}.mp4`;
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                setTimeout(() => a.remove(), 1000);
            } else {
                const ytMatch = document.documentElement.innerHTML.match(/https?:\/\/www\.youtube\.com\/embed\/([^?"]+)/);
                if (ytMatch) {
                    showToast("⚠️ 此影片為 YouTube 來源，為您開啟 YouTube 原生頁面！");
                    window.open(`https://www.youtube.com/watch?v=${ytMatch[1]}`, '_blank');
                } else {
                    showToast("❌ 找不到可直接下載的影片來源 (可能仍在緩衝中)", true);
                }
            }
        });

        document.getElementById('cycu-v-collapse-btn').addEventListener('click', function(e) {
            e.preventDefault();
            const body = document.getElementById('cycu-v-assistant-body');
            const hideTexts = document.querySelectorAll('.cycu-hide-on-collapse');
            if (body.style.display === 'none') {
                body.style.display = 'flex';
                this.innerText = '收折 －';
                hideTexts.forEach(el => el.style.display = 'block');
                localStorage.setItem('cycu_video_assistant_collapsed', 'false');
            } else {
                body.style.display = 'none';
                this.innerText = '展開 ＋';
                hideTexts.forEach(el => el.style.display = 'none');
                localStorage.setItem('cycu_video_assistant_collapsed', 'true');
            }
        });

        document.getElementById('cycu-v-close-btn').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('cycu-video-assistant').style.display = 'none';
            document.getElementById('cycu-video-assistant-toggle').style.display = 'block';
            showToast("🎬 控制面板已隱藏，可透過左下角按鈕重新開啟！");
        });

        document.getElementById('cycu-v-cc-toggle').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('cycu-cc-guide').style.display = 'block';
        });
        document.getElementById('cycu-cc-guide-close').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('cycu-cc-guide').style.display = 'none';
        });

        toggleFab.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('cycu-video-assistant').style.display = 'block';
            toggleFab.style.display = 'none';
        });

        const slider = document.getElementById('cycu-video-slider');
        const timeDisplay = document.getElementById('cycu-video-time-display');
        let userIsDragging = false;
        const formatTime = (secs) => { const m = Math.floor(secs / 60).toString().padStart(2, '0'); const s = Math.floor(secs % 60).toString().padStart(2, '0'); return `${m}:${s}`; };

        setInterval(() => {
            if (userIsDragging) return;
            const status = getVideoStatus();
            if (status.duration > 0) {
                slider.max = status.duration; slider.value = status.current;
                timeDisplay.innerText = String(formatTime(status.current)) + ' / ' + String(formatTime(status.duration));
                if (status.type === 'html5') {
                    const v = document.querySelector('video');
                    if (v) updatePlayButtonUI(!v.paused);
                }
            }
        }, 500);

        slider.addEventListener('input', () => { userIsDragging = true; });
        slider.addEventListener('change', () => { const dest = parseFloat(slider.value); setVideoTime(dest); userIsDragging = false; });

        const btnPlay = document.getElementById('cycu-v-play');
        btnPlay.onclick = (e) => { e.preventDefault(); togglePlay(); };
        btnPlay.ontouchstart = (e) => { e.preventDefault(); togglePlay(); };

        document.getElementById('cycu-v-rew30').onclick = () => { const s = getVideoStatus(); if (s.duration > 0) setVideoTime(Math.max(0, s.current - 30)); };
        document.getElementById('cycu-v-rew10').onclick = () => { const s = getVideoStatus(); if (s.duration > 0) setVideoTime(Math.max(0, s.current - 10)); };
        document.getElementById('cycu-v-fwd10').onclick = () => { const s = getVideoStatus(); if (s.duration > 0) setVideoTime(Math.min(s.duration, s.current + 10)); };
        document.getElementById('cycu-v-fwd30').onclick = () => { const s = getVideoStatus(); if (s.duration > 0) setVideoTime(Math.min(s.duration, s.current + 30)); };

        const volumeSlider = document.getElementById('cycu-v-volume-slider');
        const volumeDisplay = document.getElementById('cycu-v-volume-display');
        const muteToggle = document.getElementById('cycu-v-mute-toggle');
        let currentVolume = 100;
        let isMuted = false;

        function setMediaVolume(vol) {
            const status = getVideoStatus();
            if (status.type === 'html5') {
                const v = document.querySelector('video');
                if (v) {
                    if (vol > 100) {
                        initAudioBooster(v);
                    }
                    if (window.cycuGainNode) {
                        window.cycuGainNode.gain.value = vol / 100;
                        try { v.volume = 1; } catch (e) {} 
                    } else {
                        try { v.volume = Math.min(vol / 100, 1); } catch (e) {}
                    }
                }
            } else {
                const yt = findYTPlayer();
                const ytVol = Math.min(vol, 100);
                if (yt) { try { yt.setVolume(ytVol); } catch(e) {} }
                sendCommandToYTIframes('setVolume', [ytVol]);
            }
        }

        function setMediaMute(muted) {
            const status = getVideoStatus();
            if (status.type === 'html5') {
                const v = document.querySelector('video');
                if (v) {
                    if (window.cycuGainNode) {
                        window.cycuGainNode.gain.value = muted ? 0 : (currentVolume / 100);
                    }
                    try { v.muted = muted; } catch(e) {}
                }
            } else {
                const yt = findYTPlayer();
                if (yt) { 
                    try { 
                        if (muted) yt.mute(); else yt.unMute();
                    } catch(e) {} 
                }
                sendCommandToYTIframes(muted ? 'mute' : 'unMute');
            }
        }
        
        function updateVolumeUI() {
            if (isMuted) {
                volumeSlider.value = 0;
                volumeDisplay.innerText = "0%";
                muteToggle.innerText = "🔇";
                volumeDisplay.style.color = "#94a3b8";
            } else {
                volumeSlider.value = currentVolume;
                volumeDisplay.innerText = `${currentVolume}%`;
                if (currentVolume === 0) {
                    muteToggle.innerText = "🔇";
                    volumeDisplay.style.color = "#94a3b8";
                } else if (currentVolume <= 100) {
                    muteToggle.innerText = currentVolume < 50 ? "🔉" : "🔊";
                    volumeDisplay.style.color = "#f97316";
                } else {
                    muteToggle.innerText = "📢";
                    volumeDisplay.style.color = "#ef4444";
                }
            }
        }

        volumeSlider.addEventListener('input', (e) => {
            currentVolume = parseInt(e.target.value);
            if (currentVolume > 0 && isMuted) {
                isMuted = false;
                setMediaMute(false);
            }
            setMediaVolume(currentVolume);
            updateVolumeUI();
        });

        muteToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isMuted = !isMuted;
            setMediaMute(isMuted);
            updateVolumeUI();
        });

        document.getElementById('cycu-v-max-vol').addEventListener('click', (e) => {
            e.preventDefault();
            isMuted = false;
            currentVolume = 600;
            setMediaVolume(currentVolume);
            updateVolumeUI();
            showToast("📢 已啟動 600% 超級音量引擎！");
        });

        setTimeout(() => {
            const status = getVideoStatus();
            if (status.type === 'html5') {
                const v = document.querySelector('video');
                if (v) {
                    currentVolume = Math.round(v.volume * 100);
                    isMuted = v.muted;
                    updateVolumeUI();
                }
            } else if (status.type === 'yt-api') {
                const yt = findYTPlayer();
                if (yt) {
                    try {
                        currentVolume = yt.getVolume();
                        isMuted = yt.isMuted();
                        updateVolumeUI();
                    } catch(e) {}
                }
            }
        }, 1500);

        // 全螢幕切換控制核心 (優先調用 HTML5 Video 原生全螢幕)
        const btnFocus = document.getElementById('cycu-video-focus-toggle');
        let isVideoFocus = false;
        
        btnFocus.onclick = (e) => {
            e.preventDefault();
            const v = document.querySelector('video');
            
            // 1. 優先使用 HTML5 原生播放器全螢幕 (iPadOS / iOS Safari 徹底消除網址列與標籤頁的唯一解法，同 YouTube 機制)
            if (v && typeof v.webkitEnterFullscreen === 'function') {
                try {
                    v.webkitEnterFullscreen();
                    showToast("🎬 已喚醒 HTML5 原生播放器全螢幕（已徹底移除上方網址列）！");
                    return;
                } catch(err) {
                    console.warn("webkitEnterFullscreen 請求失敗，切換至標準全螢幕模式", err);
                }
            }

            // 2. PC / Android / 標準瀏覽器原生全螢幕
            if (v && !isVideoFocus) {
                try {
                    if (v.requestFullscreen) { v.requestFullscreen(); return; }
                    else if (v.webkitRequestFullscreen) { v.webkitRequestFullscreen(); return; }
                } catch(err) {}
            }

            // 3. 備援相容模式 (針對 YouTube 嵌入頁面或特殊封裝容器之 Pseudo-Fullscreen)
            isVideoFocus = !isVideoFocus;
            const videoWrapper = document.querySelector('.video-wrap') || document.querySelector('#videoWrap') || document.querySelector('.videocontainer');
            
            if (isVideoFocus) {
                document.body.classList.add('cycu-video-focus-mode');
                btnFocus.style.cssText = "border:1px solid #cbd5e1; background:white; color:#334155; border-radius:6px; padding:6px 12px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;";
                btnFocus.innerHTML = "🔍 還原";
                showToast("已啟動極限專注模式 🎥 橫向螢幕即可滿版享受！");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                if (videoWrapper) {
                    videoWrapper.appendChild(assistantCard);
                    try {
                        if (videoWrapper.requestFullscreen) { videoWrapper.requestFullscreen(); }
                        else if (videoWrapper.webkitRequestFullscreen) { videoWrapper.webkitRequestFullscreen(); } 
                        else if (videoWrapper.msRequestFullscreen) { videoWrapper.msRequestFullscreen(); } 
                    } catch(err) { console.warn("Fullscreen API 請求失敗", err); }
                    videoWrapper.classList.add('cycu-pseudo-fullscreen');
                } else if (v && v.parentElement) {
                    v.parentElement.classList.add('cycu-pseudo-fullscreen');
                }
            } else {
                document.body.classList.remove('cycu-video-focus-mode');
                btnFocus.style.cssText = "border:1px solid #4f46e5; background:#4f46e5; color:white; border-radius:6px; padding:6px 12px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;";
                btnFocus.innerHTML = "🔍 原生全螢幕";
                
                try {
                    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
                        if (document.exitFullscreen) { document.exitFullscreen(); }
                        else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
                        else if (document.msExitFullscreen) { document.msExitFullscreen(); }
                    }
                } catch(err) { console.warn("Exit Fullscreen API 請求失敗", err); }

                document.body.insertBefore(assistantCard, document.body.firstChild);
                const activeFullscreenWrapper = document.querySelector('.cycu-pseudo-fullscreen');
                if (activeFullscreenWrapper) {
                    activeFullscreenWrapper.classList.remove('cycu-pseudo-fullscreen');
                }
            }
            window.dispatchEvent(new Event('resize'));
        };

        window.addEventListener('orientationchange', () => { setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 300); });

        const speedButtons = document.querySelectorAll('.cycu-speed-btn');
        speedButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); const speed = parseFloat(btn.getAttribute('data-speed')); setVideoSpeed(speed);
                speedButtons.forEach(b => b.style.cssText = "border:1px solid #cbd5e1; background:white; color:#f97316; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;");
                btn.style.cssText = "border:1px solid #f97316; background:white; color:#f97316; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:bold; cursor:pointer; outline:none;";
                showToast('🚀 播放速度已調整為: ' + String(speed) + 'x');
            });
        });

        injectFloatingDrawerButton();
    }

    function injectFloatingDrawerButton() {
        if(document.getElementById('cycu-floating-drawer-toggle')) return;
        const drawer = document.getElementById('theme_boost-drawers-courseindex');
        if(!drawer) return;

        const btn = document.createElement('button');
        btn.id = 'cycu-floating-drawer-toggle';
        btn.innerHTML = '<i class="fa fa-list"></i>';
        btn.title = "開關課程大綱目錄";
        document.body.appendChild(btn);

        let isOpen = false;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            isOpen = !isOpen;
            if(isOpen) {
                drawer.classList.add('show');
                btn.classList.add('cycu-drawer-open');
                btn.innerHTML = '<i class="fa fa-times"></i>';
            } else {
                drawer.classList.remove('show');
                btn.classList.remove('cycu-drawer-open');
                btn.innerHTML = '<i class="fa fa-list"></i>';
            }
        });
    }

    function injectToolBox() {
        if (document.getElementById('cycu-enhanced-toolbox')) return;
        const container = document.querySelector('.course-content') || document.querySelector('#region-main') || document.querySelector('.weeks') || document.querySelector('.topics');
        if (container) {
            const card = document.createElement('div');
            card.id = 'cycu-enhanced-toolbox';
            card.style.cssText = "margin-bottom:24px; padding:0;";
            card.innerHTML = `
                <div style="border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 15px rgba(0,0,0,0.04); background:#ffffff; overflow:hidden;">
                    <div style="background:linear-gradient(135deg, #6366f1, #4f46e5); padding:14px 20px; color:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:8px;"><span style="font-size:18px;">⚡</span><span style="font-weight:700; font-size:14px; color:white !important;">iLearning 體驗增強工具箱</span></div>
                        <span style="font-size:11px; opacity:0.9; background:rgba(255,255,255,0.22); padding:2px 8px; border-radius:12px; font-weight:bold;">v6.8.0 自訂選檔版</span>
                    </div>
                    <div style="padding:18px; display:flex; flex-direction:column; gap:14px;">
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
                            <button id="cycu-btn-simplify" style="display:flex; align-items:center; justify-content:center; gap:6px; padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#334155; font-weight:700; font-size:13px; cursor:pointer; outline:none;">✨ 介面精簡化</button>
                            <button id="cycu-btn-file-select" style="display:flex; align-items:center; justify-content:center; gap:6px; padding:12px; border-radius:12px; border:none; background:#4f46e5; color:white; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 4px 10px rgba(79,70,229,0.28); outline:none;">📋 勾選個別檔案</button>
                            <button id="cycu-btn-pack-menu" style="display:flex; align-items:center; justify-content:center; gap:6px; padding:12px; border-radius:12px; border:none; background:#10b981; color:white; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 4px 10px rgba(16,185,129,0.25); outline:none;">📦 依類型快打</button>
                        </div>
                        
                        <div id="cycu-pack-options" style="display:none; flex-direction:column; gap:10px; background:#f1f5f9; padding:14px; border-radius:12px; border:1px solid #cbd5e1;">
                            <span style="font-size:13px; font-weight:bold; color:#334155;">請勾選要打包的教材類型：</span>
                            <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:13px; color:#475569;">
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="檔案" checked> 📝 文件檔案 (PPT/Doc)</label>
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="資料夾" checked> 📁 資料夾</label>
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="PDF Annotation" checked> 📖 PDF 講義</label>
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="超級影片"> 🎬 影片檔 <span style="color:#ef4444; font-size:11px; font-weight:bold;">(iOS 易閃退請勿勾)</span></label>
                            </div>
                            <button id="cycu-btn-start-pack" style="margin-top:4px; padding:10px; border-radius:10px; border:none; background:#0ea5e9; color:white; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 4px 10px rgba(14,165,233,0.25);">🚀 確定，開始打包</button>
                        </div>
                    </div>
                </div>
            `;
            container.insertBefore(card, container.firstChild);

            let isSimplified = false;
            const btnSimplify = document.getElementById('cycu-btn-simplify');
            btnSimplify.onclick = (e) => {
                e.preventDefault();
                if (!isSimplified) { showMenu(); btnSimplify.innerHTML = '🔄 還原原版頁面'; btnSimplify.style.background = '#e2e8f0'; isSimplified = true; }
                else {
                    const original = document.querySelector('ul.weeks, ul.topics, [data-for="course_sectionlist"]'); const side = document.querySelector('#menuside'); const sortContainer = document.querySelector('.cycu-sort-container');
                    if (original) original.style.display = 'block'; if (side) side.remove(); if (sortContainer) sortContainer.remove();
                    btnSimplify.innerHTML = '✨ 介面精簡化'; btnSimplify.style.background = '#f8fafc'; isSimplified = false;
                }
            };
            
            document.getElementById('cycu-btn-file-select').onclick = (e) => {
                e.preventDefault();
                openFileSelectorModal();
            };

            document.getElementById('cycu-btn-pack-menu').onclick = (e) => {
                e.preventDefault();
                const optionsDiv = document.getElementById('cycu-pack-options');
                optionsDiv.style.display = optionsDiv.style.display === 'none' ? 'flex' : 'none';
            };

            document.getElementById('cycu-btn-start-pack').onclick = (e) => {
                e.preventDefault();
                const checkboxes = document.querySelectorAll('.cycu-pack-cb:checked');
                const selectedTypes = Array.from(checkboxes).map(cb => cb.value);
                
                if (selectedTypes.length === 0) {
                    showToast("⚠️ 請至少勾選一種教材類型！", true);
                    return;
                }
                
                document.getElementById('cycu-pack-options').style.display = 'none';
                downloadAllFilesAsZip(selectedTypes);
            };
        }
    }

    function openFileSelectorModal() {
        let modal = document.getElementById('cycu-file-select-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'cycu-file-select-modal';
            modal.innerHTML = `
                <div id="cycu-fs-card">
                    <div style="background:linear-gradient(135deg, #4f46e5, #4338ca); padding:16px 22px; color:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span style="font-size:20px;">📋</span>
                            <div>
                                <div style="font-weight:700; font-size:15px; color:white;">選擇要打包的教材檔案</div>
                                <div style="font-size:11px; opacity:0.85;">支援跨週個別挑選、即時搜尋與全選</div>
                            </div>
                        </div>
                        <button id="cycu-fs-close-btn" style="background:rgba(255,255,255,0.2); border:none; border-radius:50%; width:32px; height:32px; color:white; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; outline:none;">✕</button>
                    </div>

                    <div style="padding:14px 20px; background:#f8fafc; border-bottom:1px solid #e2e8f0; display:flex; flex-direction:column; gap:10px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <input type="text" id="cycu-fs-search" placeholder="🔍 搜尋教材名稱..." style="flex:1; border:1px solid #cbd5e1; border-radius:10px; padding:8px 12px; font-size:13px; outline:none; background:white;">
                            <button id="cycu-fs-select-all" style="padding:8px 12px; border-radius:10px; border:1px solid #cbd5e1; background:white; font-size:12px; font-weight:700; color:#334155; cursor:pointer;">全選</button>
                            <button id="cycu-fs-deselect-all" style="padding:8px 12px; border-radius:10px; border:1px solid #cbd5e1; background:white; font-size:12px; font-weight:700; color:#334155; cursor:pointer;">全不選</button>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                            <span style="font-size:11px; font-weight:700; color:#64748b;">類型篩選:</span>
                            <button class="cycu-fs-filter-chip active" data-filter="all">全部</button>
                            <button class="cycu-fs-filter-chip" data-filter="PDF Annotation">📖 PDF</button>
                            <button class="cycu-fs-filter-chip" data-filter="檔案">📝 文件</button>
                            <button class="cycu-fs-filter-chip" data-filter="資料夾">📁 資料夾</button>
                            <button class="cycu-fs-filter-chip" data-filter="超級影片">🎬 影片</button>
                        </div>
                    </div>

                    <div id="cycu-fs-list" style="flex:1; overflow-y:auto; padding:16px 20px; display:flex; flex-direction:column; gap:14px;"></div>

                    <div style="padding:14px 20px; background:#ffffff; border-top:1px solid #e2e8f0; display:flex; align-items:center; justify-content:space-between; gap:12px;">
                        <div style="font-size:13px; color:#475569; font-weight:600;">
                            已選擇 <span id="cycu-fs-selected-count" style="color:#4f46e5; font-size:16px; font-weight:700;">0</span> / <span id="cycu-fs-total-count">0</span> 個檔案
                        </div>
                        <div style="display:flex; gap:8px;">
                            <button id="cycu-fs-cancel" style="padding:10px 16px; border-radius:10px; border:1px solid #cbd5e1; background:white; font-size:13px; font-weight:700; color:#64748b; cursor:pointer;">取消</button>
                            <button id="cycu-fs-download-btn" style="padding:10px 20px; border-radius:10px; border:none; background:#10b981; color:white; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(16,185,129,0.3);">🚀 打包下載選中檔案</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('cycu-fs-close-btn').onclick = () => modal.style.display = 'none';
            document.getElementById('cycu-fs-cancel').onclick = () => modal.style.display = 'none';
            modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

            document.getElementById('cycu-fs-select-all').onclick = () => {
                document.querySelectorAll('.cycu-fs-item-checkbox:not(:disabled)').forEach(cb => {
                    const row = cb.closest('.cycu-fs-item-row');
                    if (row && row.style.display !== 'none') cb.checked = true;
                });
                updateFileSelectCount();
            };

            document.getElementById('cycu-fs-deselect-all').onclick = () => {
                document.querySelectorAll('.cycu-fs-item-checkbox').forEach(cb => {
                    const row = cb.closest('.cycu-fs-item-row');
                    if (row && row.style.display !== 'none') cb.checked = false;
                });
                updateFileSelectCount();
            };

            const searchInput = document.getElementById('cycu-fs-search');
            searchInput.oninput = () => filterFileList();

            const chips = document.querySelectorAll('.cycu-fs-filter-chip');
            chips.forEach(chip => {
                chip.onclick = (e) => {
                    chips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    filterFileList();
                };
            });

            document.getElementById('cycu-fs-download-btn').onclick = () => {
                const checkedBoxes = document.querySelectorAll('.cycu-fs-item-checkbox:checked');
                if (checkedBoxes.length === 0) {
                    showToast("⚠️ 請至少勾選一個檔案！", true);
                    return;
                }
                const selectedFileObjects = Array.from(checkedBoxes).map(cb => JSON.parse(decodeURIComponent(cb.dataset.fileInfo)));
                modal.style.display = 'none';
                downloadAllFilesAsZip(selectedFileObjects);
            };
        }

        renderFileListInModal();
        modal.style.display = 'flex';
    }

    function renderFileListInModal() {
        const listContainer = document.getElementById('cycu-fs-list');
        listContainer.innerHTML = '';

        const { items } = getItems();
        let allDownloadableFiles = [];
        const supportedMods = ["檔案", "資料夾", "PDF Annotation", "超級影片"];
        supportedMods.forEach(mod => {
            if (items[mod]) allDownloadableFiles.push(...items[mod]);
        });

        if (allDownloadableFiles.length === 0) {
            listContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:30px; font-size:14px;">找不到可下載的教材檔案！</div>`;
            document.getElementById('cycu-fs-total-count').innerText = '0';
            document.getElementById('cycu-fs-selected-count').innerText = '0';
            return;
        }

        const groupedBySection = {};
        allDownloadableFiles.forEach(file => {
            const sec = file.sectionnumber ?? 1;
            if (!groupedBySection[sec]) groupedBySection[sec] = [];
            groupedBySection[sec].push(file);
        });

        const sortedSecNumbers = Object.keys(groupedBySection).map(Number).sort((a, b) => a - b);
        let totalRendered = 0;

        sortedSecNumbers.forEach(secNum => {
            const files = groupedBySection[secNum];
            const secBlock = document.createElement('div');
            secBlock.className = 'cycu-fs-sec-block';
            secBlock.dataset.secNum = secNum;

            const secHeader = document.createElement('div');
            secHeader.style.cssText = "display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; padding-bottom:4px; border-bottom:1px solid #e2e8f0; font-size:13px; font-weight:700; color:#334155;";
            secHeader.innerHTML = `
                <div style="display:flex; align-items:center; gap:6px;">
                    <span>📌 ${secNum === 0 ? "課程公告" : `第 ${secNum} 週`}</span>
                    <span style="font-size:11px; color:#64748b; font-weight:500;">(${files.length} 個檔案)</span>
                </div>
                <label style="font-size:11px; color:#4f46e5; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:4px;">
                    <input type="checkbox" class="cycu-fs-sec-all-cb" data-sec="${secNum}" checked> 本週全選
                </label>
            `;
            secBlock.appendChild(secHeader);

            const itemsWrap = document.createElement('div');
            itemsWrap.style.cssText = "display:flex; flex-direction:column; gap:4px;";

            files.forEach(file => {
                totalRendered++;
                const row = document.createElement('label');
                row.className = 'cycu-fs-item-row';
                row.dataset.modname = file.modname;
                row.dataset.fileName = file.name.toLowerCase();

                const isVideo = file.modname === "超級影片";
                const badgeColor = file.modname === "PDF Annotation" ? "#ef4444" : (file.modname === "資料夾" ? "#f59e0b" : (isVideo ? "#8b5cf6" : "#3b82f6"));
                const badgeLabel = file.modname === "PDF Annotation" ? "PDF" : (file.modname === "資料夾" ? "DIR" : (isVideo ? "MP4" : "FILE"));

                row.innerHTML = `
                    <input type="checkbox" class="cycu-fs-item-checkbox" data-sec="${secNum}" data-file-info="${encodeURIComponent(JSON.stringify(file))}" ${isVideo ? '' : 'checked'} style="width:16px; height:16px; cursor:pointer; accent-color:#4f46e5;">
                    <span style="font-size:10px; font-weight:700; padding:2px 6px; border-radius:6px; background:${badgeColor}18; color:${badgeColor}; border:1px solid ${badgeColor}40;">${badgeLabel}</span>
                    <span style="font-size:13px; color:#1e293b; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${file.name}">${file.name}</span>
                `;

                row.querySelector('.cycu-fs-item-checkbox').addEventListener('change', updateFileSelectCount);
                itemsWrap.appendChild(row);
            });

            secBlock.appendChild(itemsWrap);
            listContainer.appendChild(secBlock);

            secHeader.querySelector('.cycu-fs-sec-all-cb').addEventListener('change', function() {
                const checked = this.checked;
                itemsWrap.querySelectorAll('.cycu-fs-item-checkbox').forEach(cb => {
                    const r = cb.closest('.cycu-fs-item-row');
                    if (r && r.style.display !== 'none') cb.checked = checked;
                });
                updateFileSelectCount();
            });
        });

        document.getElementById('cycu-fs-total-count').innerText = totalRendered;
        updateFileSelectCount();
    }

    function filterFileList() {
        const query = (document.getElementById('cycu-fs-search')?.value || '').trim().toLowerCase();
        const activeChip = document.querySelector('.cycu-fs-filter-chip.active');
        const filterType = activeChip ? activeChip.dataset.filter : 'all';

        const blocks = document.querySelectorAll('.cycu-fs-sec-block');
        blocks.forEach(block => {
            let visibleCount = 0;
            const rows = block.querySelectorAll('.cycu-fs-item-row');
            rows.forEach(row => {
                const nameMatch = !query || row.dataset.fileName.includes(query);
                const typeMatch = filterType === 'all' || row.dataset.modname === filterType;
                if (nameMatch && typeMatch) {
                    row.style.display = 'flex';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            block.style.display = visibleCount > 0 ? 'block' : 'none';
        });
        updateFileSelectCount();
    }

    function updateFileSelectCount() {
        const countSpan = document.getElementById('cycu-fs-selected-count');
        if (!countSpan) return;
        const checked = document.querySelectorAll('.cycu-fs-item-checkbox:checked');
        countSpan.innerText = checked.length;
    }

    function getCookie(name) { const value = `; ${document.cookie}`; const parts = value.split(`; ${name}=`); if (parts.length === 2) return parts.pop().split(';').shift(); return null; }
    function setCookie(name, value, days = 30) { const date = new Date(); date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`; }

    function getItems() {
        const result = {}; const courseIdMatch = window.location.href.match(/course\/view\.php\?id=(\d+)/); const courseId = courseIdMatch ? courseIdMatch[1] : null;
        if (!courseId) return { items: {}, sections: [] };

        let sections = []; let main_section = {};

        const mapModNameToCategory = (modname) => {
            const lower = modname.toLowerCase();
            if (lower.includes('forum')) return "討論區";
            if (lower.includes('assign')) return "作業";
            if (lower.includes('pdfannotator')) return "PDF Annotation";
            if (lower.includes('resource') || lower.includes('file')) return "檔案";
            if (lower.includes('folder')) return "資料夾";
            if (lower.includes('supervideo')) return "超級影片";
            if (lower.includes('url')) return "網址";
            if (lower.includes('feedback')) return "回饋單";
            if (lower.includes('page')) return "頁面";
            return modname;
        };

        if (typeof sessionStorage !== 'undefined' && sessionStorage) {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key && key.includes(`${courseId}/staticState`)) {
                    try {
                        const json = JSON.parse(sessionStorage.getItem(key));
                        if (json) {
                            if (Array.isArray(json.section)) { sections = json.section; for (const sec of json.section) main_section[sec.id] = sec.parentsectionid || sec.id; }
                            if (Array.isArray(json.cm)) {
                                for (const item of json.cm) {
                                    if (item.modname === "子單元") continue;
                                    item.sectionid = main_section[item.sectionid]; item.sectionnumber = sections.findIndex(s => s.id === item.sectionid);
                                    const translatedModName = mapModNameToCategory(item.modname);
                                    if (!result[translatedModName]) result[translatedModName] = [];
                                    result[translatedModName].push(item);
                                }
                            }
                        }
                    } catch (e) {}
                }
            }
        }

        if (Object.keys(result).length === 0) {
            const listItems = document.querySelectorAll('li.activity');
            listItems.forEach(item => {
                const link = item.querySelector('a.aalink');
                if (link) {
                    const sectionLi = item.closest('li.section');
                    let secNum = 1;
                    if (sectionLi && sectionLi.getAttribute('data-number')) secNum = parseInt(sectionLi.getAttribute('data-number'), 10);

                    let name = '未命名';
                    const nameEl = item.querySelector('.instancename');
                    if (nameEl) {
                        const clone = nameEl.cloneNode(true);
                        const hidden = clone.querySelector('.accesshide');
                        if (hidden) hidden.remove();
                        name = clone.textContent.trim();
                    }

                    const rawModname = item.className.match(/modtype_([^\s]+)/)?.[1] || 'resource';
                    const modname = mapModNameToCategory(rawModname);
                    const url = link.href;
                    if (!result[modname]) result[modname] = [];
                    result[modname].push({ name, url, modname, sectionnumber: secNum });
                }
            });
        }

        const sortedResult = {}; for (const mod of order) if (result[mod]) sortedResult[mod] = result[mod];
        for (const mod in result) if (!sortedResult[mod]) sortedResult[mod] = result[mod];
        for (const mod in sortedResult) {
            if (mod === "討論區") sortedResult[mod].sort((a, b) => { if (a.sectionnumber === b.sectionnumber) return b.id - a.id; return b.sectionnumber - a.sectionnumber; });
            else sortedResult[mod].sort((a, b) => b.sectionnumber - a.sectionnumber);
        }
        return { items: sortedResult, sections };
    }

    function showMenu() {
        const original = document.querySelector('ul.weeks, ul.topics, [data-for="course_sectionlist"]'); const side = document.querySelector('#menuside');
        if (original) {
            original.style.display = 'none'; const data = getItems(); const items = data.items; const sections = data.sections;
            let container = side || document.createElement('ul');
            if (!side) { container.className = 'weeks'; container.id = 'menuside'; container.setAttribute('data-for', 'course_sectionlist'); } else { container.innerHTML = ""; }

            const oldSortContainer = document.querySelector('.cycu-sort-container');
            if (oldSortContainer) oldSortContainer.remove();

            const sortContainer = document.createElement('div'); sortContainer.className = 'mb-3 cycu-sort-container';
            sortContainer.innerHTML = `<select class="form-select" id="week-sort-order" style="cursor:pointer; max-width: 150px;"><option value="desc">降序</option><option value="asc">升序</option></select>`;
            sortContainer.querySelector('#week-sort-order').value = getCookie('weekSortOrder') || 'desc';
            sortContainer.querySelector('#week-sort-order').addEventListener('change', function () { setCookie('weekSortOrder', this.value); showMenu(); });

            let sectionNum = 1; const currentWeekSection = sections.find(s => s.current);
            for (const modname in items) {
                const section = document.createElement('li'); section.className = 'section course-section main clearfix'; section.id = `side-section-${sectionNum}`;
                const weekItems = {}; for (const item of items[modname]) { if (!weekItems[item.sectionnumber]) weekItems[item.sectionnumber] = []; weekItems[item.sectionnumber].push(item); }
                let weekNumbers = Object.keys(weekItems).map(Number); const week0 = weekNumbers.includes(0) ? [0] : []; const otherWeeks = weekNumbers.filter(w => w !== 0);
                const sortOrder = getCookie('weekSortOrder') || 'asc';
                if (sortOrder === 'asc') otherWeeks.sort((a, b) => a - b); else otherWeeks.sort((a, b) => b - a);
                let sortedWeeks = week0.concat(otherWeeks);

                let sectionHTML = `
                <div class="section-item">
                    <div class="course-section-header d-flex cycu-accordion-header">
                        <div class="d-flex align-items-center position-relative w-100" style="pointer-events:none;">
                            <a role="button" class="btn btn-icon me-3 icons-collapse-expand justify-content-center collapsed cycu-toggle-btn" href="#side-coursecontentcollapse${sectionNum}">
                                <span class="collapsed-icon p-2"><i class="icon fa fa-chevron-right fa-fw"></i></span>
                                <span class="expanded-icon p-2"><i class="icon fa fa-chevron-down fa-fw"></i></span>
                            </a>
                            <h3 class="h4 sectionname mb-0 w-100" style="margin-left: 8px;">${config[modname]?.title || modname}</h3>
                        </div>
                    </div>
                    <div id="side-coursecontentcollapse${sectionNum}" class="content collapse cycu-collapse-content">
                        <ul class="section img-text d-block" style="padding-left: 0; list-style: none;">`;

                for (const week of sortedWeeks) {
                    const weekItemsList = weekItems[week]; if (!weekItemsList) continue;
                    let isCurrent = currentWeekSection && currentWeekSection.id == weekItemsList[0].sectionid;
                    sectionHTML += `<li class="activity activity-wrapper" style="margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 8px;"><div class="week-title fw-bold fs-5 mb-2">${week === 0 ? "公告" : `第${week}週`}${isCurrent ? ' <span class="badge bg-primary">本週</span>' : ''}</div><div class="${isCurrent ? 'course-content current' : ''}">`;
                    for (const item of weekItemsList) {
                        let logoUrl = config[modname]?.logo;
                        sectionHTML += `<div class="activity-item mb-2"><div class="d-flex align-items-center"><div class="activity-icon me-2">${logoUrl ? `<img src="${logoUrl}" width="20" height="20">` : ''}</div><div class="activityname"><a href="${item.url}" class="aalink" style="position:relative; z-index:10; text-decoration: none; font-weight: 500;">${item.name}</a></div></div></div>`;
                    }
                    sectionHTML += `</div></li>`;
                }
                sectionHTML += `</ul></div></div>`;
                section.innerHTML = sectionHTML;
                container.appendChild(section); sectionNum++;
            }
            original.parentNode.insertBefore(container, original.nextSibling); original.parentNode.insertBefore(sortContainer, container);

            document.querySelectorAll('.cycu-accordion-header').forEach(header => {
                header.addEventListener('click', function(e) {
                    e.preventDefault();
                    const btn = this.querySelector('.cycu-toggle-btn');
                    const targetId = btn.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if(target) {
                        if(target.classList.contains('show')) {
                            target.classList.remove('show');
                            btn.classList.add('collapsed');
                        } else {
                            target.classList.add('show');
                            btn.classList.remove('collapsed');
                        }
                    }
                });
            });
        }
    }

    function formatBytes(bytes) {
        if (!bytes || bytes <= 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(i > 1 ? 1 : 0) + ' ' + sizes[i];
    }

    function formatSpeed(bytesPerSec) {
        if (!bytesPerSec || bytesPerSec <= 0) return '0 KB/s';
        if (bytesPerSec >= 1048576) {
            return (bytesPerSec / 1048576).toFixed(1) + ' MB/s';
        }
        return (bytesPerSec / 1024).toFixed(0) + ' KB/s';
    }

    function formatETA(seconds) {
        if (seconds == null || !isFinite(seconds) || seconds <= 0) return '--';
        if (seconds < 60) return Math.round(seconds) + 's';
        const m = Math.floor(seconds / 60);
        const s = Math.round(seconds % 60);
        return `${m}m ${s.toString().padStart(2, '0')}s`;
    }

    async function fetchWithProgress(url, options = {}, onProgress) {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        const reader = response.body ? response.body.getReader() : null;

        if (!reader) {
            const buffer = await response.arrayBuffer();
            return { buffer, response, total: buffer.byteLength };
        }

        let loaded = 0;
        const chunks = [];
        let lastTime = performance.now();
        let lastLoaded = 0;
        let currentSpeed = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            loaded += value.length;

            const now = performance.now();
            const delta = (now - lastTime) / 1000;
            if (delta >= 0.25 || loaded === total) {
                currentSpeed = delta > 0 ? (loaded - lastLoaded) / delta : 0;
                lastTime = now;
                lastLoaded = loaded;
                const eta = (total > 0 && currentSpeed > 0) ? (total - loaded) / currentSpeed : null;
                if (onProgress) {
                    onProgress({ loaded, total, currentSpeed, eta });
                }
            }
        }

        const combined = new Uint8Array(loaded);
        let offset = 0;
        for (const chunk of chunks) {
            combined.set(chunk, offset);
            offset += chunk.length;
        }

        return { buffer: combined.buffer, response, total: loaded };
    }

    async function downloadAllFilesAsZip(selectedTypesOrFiles) {
        let totalFiles = [];
        
        if (Array.isArray(selectedTypesOrFiles) && selectedTypesOrFiles.length > 0 && typeof selectedTypesOrFiles[0] === 'object') {
            totalFiles = selectedTypesOrFiles;
        } else {
            const selectedTypes = selectedTypesOrFiles || ["檔案", "資料夾", "PDF Annotation"];
            const { items } = getItems();
            if (selectedTypes.includes("檔案") && items["檔案"]) totalFiles.push(...items["檔案"]);
            if (selectedTypes.includes("資料夾") && items["資料夾"]) totalFiles.push(...items["資料夾"]);
            if (selectedTypes.includes("PDF Annotation") && items["PDF Annotation"]) totalFiles.push(...items["PDF Annotation"]);
            if (selectedTypes.includes("超級影片") && items["超級影片"]) totalFiles.push(...items["超級影片"]);
        }

        if (totalFiles.length === 0) { showToast("找不到您選取的檔案！", true); return; }

        const zip = new MiniZip();
        const total = totalFiles.length;
        let successCount = 0;

        const toast = showToast(`⏳ 正在初始化下載佇列 (0/${total})...`);

        const getExtFromMime = (mime) => {
            if (!mime) return "";
            if (mime.includes('wordprocessingml') || mime.includes('msword')) return '.docx';
            if (mime.includes('presentationml') || mime.includes('ms-powerpoint')) return '.pptx';
            if (mime.includes('spreadsheetml') || mime.includes('ms-excel')) return '.xlsx';
            if (mime.includes('zip')) return '.zip';
            if (mime.includes('pdf')) return '.pdf';
            if (mime.includes('image/jpeg')) return '.jpg';
            if (mime.includes('image/png')) return '.png';
            if (mime.includes('text/plain')) return '.txt';
            return "";
        };

        const renderProgressToast = (fileIndex, currentFileName, fileProgress) => {
            const fileRatio = fileProgress.total > 0 ? (fileProgress.loaded / fileProgress.total) : 0.5;
            const overallPercent = Math.min(100, Math.max(0, ((fileIndex + fileRatio) / total) * 100));

            toast.style.backgroundColor = '#0f172a';
            toast.innerHTML = `
                <div style="width:100%; display:flex; flex-direction:column; gap:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:700; font-size:13px; color:#38bdf8; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:240px;" title="${currentFileName}">
                            📥 ${currentFileName}
                        </span>
                        <span style="font-size:12px; font-weight:700; color:#10b981; font-family:monospace;">
                            ${overallPercent.toFixed(0)}%
                        </span>
                    </div>
                    <div style="width:100%; height:7px; background:#334155; border-radius:4px; overflow:hidden;">
                        <div style="width:${overallPercent}%; height:100%; background:linear-gradient(90deg, #38bdf8, #6366f1, #10b981); border-radius:4px; transition:width 0.2s ease;"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#cbd5e1;">
                        <span>進度: ${fileIndex + 1}/${total} 檔 (${formatBytes(fileProgress.loaded)}${fileProgress.total > 0 ? ' / ' + formatBytes(fileProgress.total) : ''})</span>
                        <span>⚡ <b style="color:#f59e0b;">${formatSpeed(fileProgress.currentSpeed)}</b> | ⏳ <b style="color:#38bdf8;">${formatETA(fileProgress.eta)}</b></span>
                    </div>
                </div>
            `;
        };

        try {
            for (let i = 0; i < total; i++) {
                const file = totalFiles[i];
                try {
                    let downloadUrl = file.url;
                    let fileExtension = "";
                    let isHtmlRedirect = false;
                    let htmlContent = "";

                    if (file.modname === "PDF Annotation") {
                        const pageText = await (await fetch(file.url, { credentials: 'include' })).text();
                        const match = pageText.match(/"fullurl":\s*"([^"]+)"/);
                        if (match) { downloadUrl = match[1].replace(/\\/g, ''); fileExtension = ".pdf"; }
                        else throw new Error("找不到 PDF 網址");
                    } else if (file.modname === "資料夾") {
                        downloadUrl = file.url.replace(/view\.php/, 'download_folder.php');
                        fileExtension = ".zip";
                    } else if (file.modname === "超級影片") {
                        const pageText = await (await fetch(file.url, { credentials: 'include' })).text();
                        const mp4Match = pageText.match(/https:\/\/[^"]+\.mp4/);
                        if (mp4Match) {
                            downloadUrl = mp4Match[0];
                            fileExtension = ".mp4";
                        } else {
                            const ytMatch = pageText.match(/https:\/\/www\.youtube\.com\/embed\/([^?"]+)/);
                            if (ytMatch) {
                                isHtmlRedirect = true;
                                fileExtension = "_YouTube影片導向.html";
                                htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=https://www.youtube.com/watch?v=${ytMatch[1]}"></head><body>正在為您導向 YouTube 影片...</body></html>`;
                            } else {
                                continue;
                            }
                        }
                    }

                    let fileData;
                    if (isHtmlRedirect) {
                        fileData = new TextEncoder().encode(htmlContent).buffer;
                    } else {
                        // 處理 Moodle 重導向與包裝網址
                        if (file.modname === "檔案") {
                            const initialHead = await fetch(downloadUrl, { credentials: 'include' });
                            const initialCt = initialHead.headers.get('content-type') || '';
                            if (initialCt.includes('text/html')) {
                                const text = await initialHead.text();
                                const realUrlMatch = text.match(/<object[^>]+data="([^"]+)"/) ||
                                                     text.match(/<iframe[^>]+src="([^"]+)"/) ||
                                                     text.match(/<div class="resourceworkaround"><a href="([^"]+)"/) ||
                                                     text.match(/window\.location\.replace\('([^']+)'\)/);
                                if (realUrlMatch && realUrlMatch[1]) {
                                    downloadUrl = realUrlMatch[1].replace(/&amp;/g, '&');
                                }
                            }
                        }

                        renderProgressToast(i, file.name, { loaded: 0, total: 0, currentSpeed: 0, eta: null });

                        const { buffer, response } = await fetchWithProgress(downloadUrl, { credentials: 'include' }, (progress) => {
                            renderProgressToast(i, file.name, progress);
                        });

                        const ct = response.headers.get('content-type') || '';
                        if (!fileExtension) {
                            const cd = response.headers.get('content-disposition') || '';
                            const m = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                            if (m && m[1]) {
                                let rawName = m[1].replace(/['"]/g, '');
                                try { rawName = decodeURIComponent(escape(rawName)); } catch(e) {}
                                const extMatch = rawName.match(/\.[^.]+$/);
                                if (extMatch) fileExtension = extMatch[0];
                            }
                            if (!fileExtension) fileExtension = getExtFromMime(ct);
                            if (!fileExtension) {
                                try {
                                    const urlExtMatch = response.url.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
                                    if (urlExtMatch) fileExtension = "." + urlExtMatch[1];
                                } catch(e) {}
                            }
                        }

                        fileData = buffer;
                    }

                    let safeName = file.name.replace(/[\\/:*?"<>|]/g, '_');
                    if (fileExtension && safeName.toLowerCase().endsWith(fileExtension.toLowerCase())) {
                        fileExtension = "";
                    }

                    zip.file((file.sectionnumber === 0 ? "公告 - " : `第${file.sectionnumber}週 - `) + safeName + fileExtension, fileData);
                    successCount++;
                } catch (err) {}
            }

            if (successCount === 0) throw new Error("無成功檔案。");
            toast.innerHTML = `<div style="display:flex; align-items:center; gap:8px;"><span>⚡</span><span>壓縮打包 ZIP 封裝中，請稍候...</span></div>`;
            
            const zipBlob = zip.generateBlob();
            const blobUrl = URL.createObjectURL(zipBlob);
            const fileName = `${document.title.split('|')[0].trim()}_教材打包.zip`;
            
            toast.style.backgroundColor = '#0f172a';
            toast.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
                    <span style="font-weight:700; font-size:15px; color:#10b981;">🎉 打包完成！(${successCount}/${total})</span>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:4px;">
                        <a href="${blobUrl}" download="${fileName}" id="cycu-dl-btn" style="background:#10b981; color:white; padding:10px; border-radius:10px; text-decoration:none; font-weight:bold; text-align:center; font-size:12px;">直接下載</a>
                        <button id="dl-ios-tab" style="background:#f59e0b; color:white; padding:10px; border-radius:10px; border:none; font-weight:bold; text-align:center; font-size:12px; cursor:pointer;">iOS 開啟分頁儲存</button>
                    </div>
                    <span id="dl-close" style="font-size:11px; text-align:center; cursor:pointer; text-decoration:underline; color:#94a3b8; margin-top:4px;">關閉通知視窗</span>
                </div>`;
            
            document.getElementById('dl-ios-tab').onclick = (e) => {
                e.preventDefault();
                const reader = new FileReader();
                reader.onload = function () {
                    const a = document.createElement('a');
                    a.href = reader.result;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                };
                reader.readAsDataURL(zipBlob);
            };
            
            document.getElementById('dl-close').onclick = () => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); };
        } catch (error) { showToast(`❌ 出錯了: ${error.message}`, true); }
    }

    function getPdfIframeDocument() {
        const iframe = document.querySelector('iframe[src*="viewer.html"]') || document.querySelector('iframe') || document.getElementById('pdfannotator-iframe');
        if (iframe) { try { if (iframe.contentDocument) return iframe.contentDocument; if (iframe.contentWindow && iframe.contentWindow.document) return iframe.contentWindow.document; } catch (e) {} }
        return null;
    }

    function getNativePageInfo() {
        const pageInput = document.querySelector('#pdfannotator_index input[type="number"], #pageNumber, .pageNumber, input[class*="page" i]');
        const current = pageInput ? parseInt(pageInput.value) || 1 : 1;
        let total = 1;
        const numPagesEl = document.querySelector('#numPages, .numPages, span[id*="numPages" i], span[class*="total" i]');
        if (numPagesEl) {
            total = parseInt(numPagesEl.textContent.replace(/[^0-9]/g, '')) || 1;
        } else if (pageInput && pageInput.parentElement) {
            const parentText = pageInput.parentElement.innerText;
            const match = parentText.match(/\/\s*(\d+)/);
            if (match) total = parseInt(match[1]);
        }
        return { current, total, pageInput };
    }

    function nativeGoPrevPage() {
        const btn = document.querySelector('#previous') || document.querySelector('#pdfannotator_prev') || document.querySelector('.pdfannotator-prev') || document.querySelector('.pdfannotator_prev') || document.querySelector('button[class*="prev" i]') || document.querySelector('[title*="previous" i]') || document.getElementById('pdfannotator-prev');
        if (btn) { btn.click(); return true; }
        const info = getNativePageInfo();
        if (info.pageInput && info.current > 1) { info.pageInput.value = info.current - 1; info.pageInput.dispatchEvent(new Event('change', { bubbles: true })); info.pageInput.dispatchEvent(new Event('input', { bubbles: true })); return true; }
        return false;
    }

    function nativeGoNextPage() {
        const btn = document.querySelector('#next') || document.querySelector('#pdfannotator_next') || document.querySelector('.pdfannotator-next') || document.querySelector('.pdfannotator_next') || document.querySelector('button[class*="next" i]') || document.querySelector('[title*="next" i]') || document.getElementById('pdfannotator-next');
        if (btn) { btn.click(); return true; }
        const info = getNativePageInfo();
        if (info.pageInput && info.current < info.total) { info.pageInput.value = info.current + 1; info.pageInput.dispatchEvent(new Event('change', { bubbles: true })); info.pageInput.dispatchEvent(new Event('input', { bubbles: true })); return true; }
        return false;
    }

    function nativeZoomIn() {
        const btn = document.getElementById('zoomIn') || document.querySelector('#pdfannotator_zoomin') || document.querySelector('button[class*="zoomin" i]') || document.querySelector('[title*="zoom in" i]');
        if (btn) btn.click();
    }

    function nativeZoomOut() {
        const btn = document.getElementById('zoomOut') || document.querySelector('#pdfannotator_zoomout') || document.querySelector('button[class*="zoomout" i]') || document.querySelector('[title*="zoom out" i]');
        if (btn) btn.click();
    }

    function nativeZoomFit() {
        const scaleSelect = document.getElementById('scaleSelect') || document.querySelector('select[class*="scale" i]');
        if (scaleSelect) { scaleSelect.value = 'page-width'; scaleSelect.dispatchEvent(new Event('change', { bubbles: true })); }
        else { const btn = document.querySelector('button[class*="zoomfit" i]') || document.querySelector('[title*="fit" i]'); if (btn) btn.click(); }
    }

    function sendPdfIframeAction(actionName) {
        document.querySelectorAll('iframe').forEach(iframe => { try { if (iframe.contentWindow) iframe.contentWindow.postMessage({ type: 'CYCU_PDF_ACTION', action: actionName }, '*'); } catch (e) {} });
    }

    function initIframeContext() {
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CYCU_PDF_ACTION') {
                const action = event.data.action;
                if (action === 'prev') document.querySelector('button[id*="prev"]:not([id*="cycu"])')?.click();
                else if (action === 'next') document.querySelector('button[id*="next"]:not([id*="cycu"])')?.click();
                else if (action === 'zoomIn') document.querySelector('button[id*="zoomIn"]:not([id*="cycu"])')?.click();
                else if (action === 'zoomOut') document.querySelector('button[id*="zoomOut"]:not([id*="cycu"])')?.click();
                else if (action === 'zoomFit') { const scaleSelect = document.getElementById('scaleSelect'); if (scaleSelect) { scaleSelect.value = 'page-width'; scaleSelect.dispatchEvent(new Event('change')); } }
                else if (action === 'applyDarkOn') document.body.classList.add('cycu-iframe-dark-mode');
                else if (action === 'applyDarkOff') document.body.classList.remove('cycu-iframe-dark-mode');
            }
        });

        setInterval(() => {
            const pageInput = document.getElementById('pageNumber') || document.querySelector('input[type="number"]');
            const numPages = document.getElementById('numPages') || document.querySelector('span[id*="numPages"]');
            if (pageInput) {
                try {
                    let current = parseInt(pageInput.value) || 1;
                    let total = numPages ? (parseInt(numPages.textContent.replace(/[^0-9]/g, '')) || 1) : '--';
                    window.parent.postMessage({ type: 'CYCU_PDF_STATUS', current, total }, '*');
                } catch(e) {}
            }
        }, 500);

        if (localStorage.getItem('cycu_pdf_dark_mode') === 'true') document.body.classList.add('cycu-iframe-dark-mode');
    }

    function initParentCleaningRoutine() {
        document.body.classList.add('cycu-pdf-hide-native');
        setInterval(() => {
            const docBody = document.body;
            const hasHideNativeClass = docBody.classList.contains('cycu-pdf-hide-native');
            const isFocusModeActive = docBody.classList.contains('cycu-pdf-focus-mode');

            const bodyWrapper = document.getElementById('body-wrapper');
            if (bodyWrapper) {
                const targetHeight = isFocusModeActive ? 'calc(100vh - 60px)' : '82vh';
                const targetMinHeight = isFocusModeActive ? 'calc(100vh - 60px)' : '680px';
                bodyWrapper.style.setProperty('height', targetHeight, 'important');
                bodyWrapper.style.setProperty('min-height', targetMinHeight, 'important');
            }

            const contentWrapper = document.getElementById('content-wrapper');
            if (contentWrapper) {
                if (hasHideNativeClass || isFocusModeActive) {
                    contentWrapper.style.setProperty('width', '100%', 'important');
                    contentWrapper.style.setProperty('max-width', '100%', 'important');
                    contentWrapper.style.setProperty('flex', '0 0 100%', 'important');
                } else {
                    contentWrapper.style.removeProperty('width');
                    contentWrapper.style.removeProperty('max-width');
                    contentWrapper.style.removeProperty('flex');
                }
            }
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }

    function extractFullUrl() {
        for (let script of document.scripts) { const match = script.textContent.match(/"fullurl":\s*"([^"]+)"/); if (match) return match[1].replace(/\\/g, ''); } return null;
    }

    function createPDFSmartAssistant(fullUrl) {
        if (document.getElementById('cycu-pdf-assistant')) return;
        const container = document.querySelector('#region-main') || document.querySelector('#page-content') || document.body;
        if (!container) return;

        const pdfIdMatch = window.location.href.match(/id=(\d+)/);
        const pdfId = pdfIdMatch ? pdfIdMatch[1] : 'default';

        const assistantCard = document.createElement('div');
        assistantCard.id = 'cycu-pdf-assistant';
        assistantCard.style.cssText = "margin-bottom: 20px; padding: 0; width:100%; z-index: 100;";
        assistantCard.innerHTML = `
            <div style="border-radius:16px; border:1px solid #e2e8f0; background:#ffffff; box-shadow:0 4px 20px rgba(0,0,0,0.05); overflow:hidden; width:100%;">
                <div style="background:linear-gradient(135deg, #4f46e5, #3730a3); padding:12px 18px; color:white; display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:8px;"><span style="font-size:16px;">📖</span><span style="font-weight:700; font-size:13px; color:white !important;">iLearning PDF 智慧學習助理</span></div>
                    <span style="font-size:11px; opacity:0.8; font-weight:bold;">中原大學專屬輔助</span>
                </div>
                <div style="padding:14px; display:flex; flex-direction:column; gap:10px; background:#fafafa;">
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:6px;">
                        <button id="cycu-pdf-dark-toggle" style="padding:10px 4px; border-radius:10px; border:1px solid #cbd5e1; background:white; color:#334155; font-weight:700; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">🌓 護眼深色</button>
                        <button id="cycu-pdf-focus-toggle" style="padding:10px 4px; border-radius:10px; border:1px solid #cbd5e1; background:white; color:#334155; font-weight:700; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">🔍 全螢幕</button>
                        <button id="cycu-pdf-native-toggle" class="cycu-pdf-btn-active" style="padding:10px 4px; border-radius:10px; border:1px solid #cbd5e1; background:white; color:#334155; font-weight:700; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">⚙️ 隱藏原廠</button>
                        <button id="cycu-pdf-note-toggle" style="padding:10px 4px; border-radius:10px; border:1px solid #cbd5e1; background:white; color:#334155; font-weight:700; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">📝 隨堂筆記</button>
                    </div>
                    <div style="margin-top: 2px;">
                        <a id="cycu-pdf-direct-download" href="${fullUrl}" download target="_blank" style="text-align:center; display:block; padding:11px; border-radius:10px; background:#10b981; color:white !important; font-weight:700; font-size:12px; text-decoration:none; box-shadow:0 3px 10px rgba(16,185,129,0.22); -webkit-tap-highlight-color:transparent;">📥 離線下載 PDF 講義 (支援 iOS 長按儲存)</a>
                    </div>

                    <div style="border-top:1px solid #e2e8f0; padding-top:10px; display:grid; grid-template-columns:1fr 2fr 1fr; align-items:center; text-align:center;">
                        <button id="cycu-pdf-prev" style="border:1px solid #cbd5e1; background:white; color:#334155; border-radius:8px; padding:6px; font-weight:bold; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">◀ 上一頁</button>
                        <span id="cycu-pdf-page-indicator" style="font-size:13px; font-weight:bold; color:#1e293b;">Page 1 / --</span>
                        <button id="cycu-pdf-next" style="border:1px solid #cbd5e1; background:white; color:#334155; border-radius:8px; padding:6px; font-weight:bold; font-size:12px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">下一頁 ▶</button>
                    </div>

                    <div style="border-top:1px dashed #e2e8f0; padding-top:10px; display:grid; grid-template-columns:1fr 1.5fr 1fr; gap:8px;">
                        <button id="cycu-pdf-zoom-out" style="border:1px solid #cbd5e1; background:white; color:#334155; border-radius:8px; padding:6px; font-weight:bold; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">➖ 縮小</button>
                        <button id="cycu-pdf-zoom-fit" style="border:1px solid #cbd5e1; background:#f1f5f9; color:#334155; border-radius:8px; padding:6px; font-weight:bold; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">🔄 滿版寬度</button>
                        <button id="cycu-pdf-zoom-in" style="border:1px solid #cbd5e1; background:white; color:#334155; border-radius:8px; padding:6px; font-weight:bold; font-size:11px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">➕ 放大</button>
                    </div>
                </div>

                <div id="cycu-pdf-notebook" style="display:none; border-top:1px solid #e2e8f0; padding:14px; background:#ffffff;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                        <span style="font-size:12px; font-weight:700; color:#334155;">✍️ 課堂重點隨寫：</span>
                        <span id="cycu-pdf-note-status" style="font-size:10px; color:#10b981; font-weight:bold;">已存至本機 💾</span>
                    </div>
                    <textarea id="cycu-pdf-note-area" placeholder="在此記錄公式、老師講課重點..." style="width:100%; height:120px; border:1px solid #cbd5e1; border-radius:10px; padding:10px; font-size:12px; color:#334155; background:#fafafa; resize:none; box-sizing:border-box; line-height:1.4;"></textarea>
                    <div style="display:flex; justify-content:space-between; margin-top:8px;">
                        <button id="cycu-pdf-note-copy" style="border:1px solid #cbd5e1; background:white; color:#334155; font-size:11px; padding:6px 10px; border-radius:6px; cursor:pointer; font-weight:bold;">📋 複製筆記</button>
                        <button id="cycu-pdf-note-export" style="border:none; background:#3b82f6; color:white; font-size:11px; padding:6px 10px; border-radius:6px; cursor:pointer; font-weight:bold;">📤 匯出 TXT</button>
                    </div>
                </div>
            </div>
        `;
        container.insertBefore(assistantCard, container.firstChild);

        const btnDark = document.getElementById('cycu-pdf-dark-toggle');
        const btnFocus = document.getElementById('cycu-pdf-focus-toggle');
        const btnNative = document.getElementById('cycu-pdf-native-toggle');
        const btnNote = document.getElementById('cycu-pdf-note-toggle');
        const notebook = document.getElementById('cycu-pdf-notebook');
        const noteArea = document.getElementById('cycu-pdf-note-area');
        const noteStatus = document.getElementById('cycu-pdf-note-status');

        const btnPrev = document.getElementById('cycu-pdf-prev');
        const btnNext = document.getElementById('cycu-pdf-next');

        const btnZoomIn = document.getElementById('cycu-pdf-zoom-in');
        const btnZoomOut = document.getElementById('cycu-pdf-zoom-out');
        const btnZoomFit = document.getElementById('cycu-pdf-zoom-fit');

        let isDarkMode = localStorage.getItem('cycu_pdf_dark_mode') === 'true';
        const applyDarkMode = () => {
            if (isDarkMode) { btnDark.classList.add('cycu-pdf-btn-active'); sendPdfIframeAction('applyDarkOn'); }
            else { btnDark.classList.remove('cycu-pdf-btn-active'); sendPdfIframeAction('applyDarkOff'); }
        };
        setTimeout(applyDarkMode, 400);
        btnDark.onclick = (e) => { e.preventDefault(); isDarkMode = !isDarkMode; localStorage.setItem('cycu_pdf_dark_mode', isDarkMode); applyDarkMode(); };

        let isFocusMode = false;
        btnFocus.onclick = (e) => {
            e.preventDefault(); isFocusMode = !isFocusMode;
            if (isFocusMode) { document.body.classList.add('cycu-pdf-focus-mode'); btnFocus.classList.add('cycu-pdf-btn-active'); btnFocus.innerHTML = "🔍 還原視窗"; window.scrollTo({ top: 0, behavior: 'smooth' }); }
            else { document.body.classList.remove('cycu-pdf-focus-mode'); btnFocus.classList.remove('cycu-pdf-btn-active'); btnFocus.innerHTML = "🔍 全螢幕"; }
            window.dispatchEvent(new Event('resize'));
        };

        btnNative.onclick = (e) => {
            e.preventDefault();
            if (document.body.classList.contains('cycu-pdf-hide-native')) { document.body.classList.remove('cycu-pdf-hide-native'); btnNative.classList.remove('cycu-pdf-btn-active'); btnNative.innerHTML = "⚙️ 顯示原廠"; }
            else { document.body.classList.add('cycu-pdf-hide-native'); btnNative.classList.add('cycu-pdf-btn-active'); btnNative.innerHTML = "⚙️ 隱藏原廠"; }
        };

        window.addEventListener('message', (event) => { if (event.data && event.data.type === 'CYCU_PDF_STATUS') document.getElementById('cycu-pdf-page-indicator').innerText = `Page ${event.data.current} / ${event.data.total}`; });

        btnPrev.onclick = (e) => { e.preventDefault(); nativeGoPrevPage(); };
        btnPrev.ontouchstart = (e) => { e.preventDefault(); nativeGoPrevPage(); };
        btnNext.onclick = (e) => { e.preventDefault(); nativeGoNextPage(); };
        btnNext.ontouchstart = (e) => { e.preventDefault(); nativeGoNextPage(); };

        btnZoomIn.onclick = (e) => { e.preventDefault(); nativeZoomIn(); };
        btnZoomOut.onclick = (e) => { e.preventDefault(); nativeZoomOut(); };
        btnZoomFit.onclick = (e) => { e.preventDefault(); nativeZoomFit(); };

        const savedNoteKey = `cycu_note_${pdfId}`;
        noteArea.value = localStorage.getItem(savedNoteKey) || '';

        btnNote.onclick = (e) => {
            e.preventDefault();
            if (notebook.style.display === 'none') { notebook.style.display = 'block'; btnNote.classList.add('cycu-pdf-btn-active'); }
            else { notebook.style.display = 'none'; btnNote.classList.remove('cycu-pdf-btn-active'); }
        };

        noteArea.oninput = () => {
            noteStatus.innerText = "⏳ 正在儲存..."; noteStatus.style.color = "#f59e0b";
            localStorage.setItem(savedNoteKey, noteArea.value);
            setTimeout(() => { noteStatus.innerText = "已存至本機 💾"; noteStatus.style.color = "#10b981"; }, 350);
        };
        document.getElementById('cycu-pdf-note-copy').onclick = (e) => { e.preventDefault(); noteArea.select(); document.execCommand('copy'); const btn = e.target; const old = btn.innerText; btn.innerText = "✅ 複製成功！"; setTimeout(() => btn.innerText = old, 1500); };
        document.getElementById('cycu-pdf-note-export').onclick = (e) => {
            e.preventDefault(); if (!noteArea.value.trim()) { showToast("筆記內容不能為空唷！", true); return; }
            const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([noteArea.value], { type: 'text/plain;charset=utf-8' })); link.download = `課堂重點筆記_PDF_${pdfId}.txt`; link.click();
        };
    }

    function init() {
        const url = window.location.href;
        if (url.includes('/mod/')) document.body.classList.add('cycu-clean-mod-header');

        if (url.includes('/mod/pdfannotator/view.php')) {
            const fullUrl = extractFullUrl();
            if (fullUrl) {
                createPDFSmartAssistant(fullUrl);
                initParentCleaningRoutine();
            }
        } else if (url.includes('/mod/pdfannotator/viewer/')) {
            initIframeContext();
        } else if (url.includes('/mod/supervideo/') || url.includes('/mod/resource/')) {
            setInterval(enableYouTubeJsApi, 1000);
            setTimeout(createVideoAssistant, 500);
        } else if (url.includes('/course/')) {
            injectToolBox();
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') { init(); }
    else { window.addEventListener('DOMContentLoaded', init); }
})();