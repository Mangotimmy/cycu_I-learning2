// ==UserScript==
// @name         中原 cycu iLearning 2.0 頁面addon
// @namespace    http://ilearning.cycu.edu.tw/
// @version      6.8.5
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
        toast.style.backgroundColor = isError ? '#ef4444' : '#0f172a';
        toast.innerHTML = `<span style="flex-grow:1; line-height:1.4;">${message}</span>`;
        if (isError) {
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; opacity:0.8; margin-left:8px; font-size:14px;';
            closeBtn.onclick = () => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); };
            toast.appendChild(closeBtn);
        }
        return toast;
    }

    const style = document.createElement('style');
    style.id = 'cycu-global-style';
    style.innerHTML = `
        #at-bubble, .at-bubble, .at-btn, .at-bubble-container, #at-popup, #userwayAccessibilityIcon, .userway-accessibility-icon { display: none !important; visibility: hidden !important; pointer-events: none !important; opacity: 0 !important; }
        .dashboard-card-deck .dashboard-card { border-radius: 16px !important; border: 1px solid #e2e8f0 !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important; margin-bottom: 16px !important; }
        select.form-select, .form-control, .btn-secondary { border-radius: 8px !important; border: 1px solid #cbd5e1 !important; font-size: 12px !important; padding: 6px 10px !important; background-color: #ffffff !important; color: #334155 !important; }
        .cycu-collapse-content.collapse:not(.show) { display: none !important; }
        .cycu-collapse-content.collapse.show { display: block !important; animation: fadeIn 0.2s ease; }
        .cycu-accordion-header { cursor: pointer; -webkit-tap-highlight-color: transparent; border-radius: 10px; transition: background 0.2s; padding: 4px; }
        .cycu-accordion-header:active { background: #f1f5f9; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        body.cycu-clean-mod-header #page-header, body.cycu-clean-mod-header .activity-header, body.cycu-clean-mod-header .page-context-header, body.cycu-clean-mod-header .breadcrumb { display: none !important; height: 0 !important; opacity: 0 !important; visibility: hidden !important; margin: 0 !important; padding: 0 !important; pointer-events: none !important; overflow: hidden !important; }
        body.cycu-clean-mod-header #page { margin-top: 15px !important; }
        body.cycu-clean-mod-header #region-main { padding-top: 0 !important; margin-top: 0 !important; }

        body.cycu-pdf-focus-mode #page-header, body.cycu-pdf-focus-mode #usernavigation, body.cycu-pdf-focus-mode .navbar, body.cycu-pdf-focus-mode header, body.cycu-pdf-focus-mode .fixed-top, body.cycu-pdf-focus-mode #page-footer, body.cycu-pdf-focus-mode .breadcrumb, body.cycu-pdf-focus-mode #nav-drawer { display: none !important; height: 0 !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
        body.cycu-pdf-focus-mode { padding-top: 0 !important; margin-top: 0 !important; }
        body.path-mod-pdfannotator #page { margin-top: 0 !important; padding-top: 0 !important; top: 0 !important; }
        body.cycu-pdf-focus-mode #region-main { padding: 0 !important; margin: 0 !important; border: none !important; }
        .cycu-pdf-btn-active { background-color: #4f46e5 !important; color: white !important; border-color: #4f46e5 !important; }

        /* Video Fullscreen Fallback */
        body.cycu-video-focus-mode { overflow: hidden !important; background: black !important; }
        body.cycu-video-focus-mode .cycu-pseudo-fullscreen {
            position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important;
            height: 100vh !important; height: 100dvh !important; z-index: 99998 !important;
            background: black !important; margin: 0 !important; padding: 0 !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
        }
        body.cycu-video-focus-mode .cycu-pseudo-fullscreen iframe,
        body.cycu-video-focus-mode .cycu-pseudo-fullscreen video {
            width: 100% !important; height: 100% !important; border: none !important;
        }

        /* 超薄極簡漂浮控制面板 */
        #cycu-video-assistant {
            position: fixed !important;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 20px);
            max-width: 820px;
            z-index: 99999 !important;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
            border-radius: 12px !important;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid #cbd5e1;
            backdrop-filter: blur(8px);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 11px;
            transition: max-width 0.2s;
        }

        .cycu-slim-btn {
            padding: 4px 8px !important;
            border-radius: 6px !important;
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            color: #334155 !important;
            font-weight: 700 !important;
            font-size: 11px !important;
            cursor: pointer !important;
            outline: none !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 3px !important;
            height: 26px !important;
            white-space: nowrap !important;
            -webkit-tap-highlight-color: transparent !important;
            transition: all 0.15s !important;
        }
        .cycu-slim-btn:active { background: #f1f5f9 !important; transform: scale(0.97); }

        body.cycu-pdf-hide-native #pdfannotator-toolbar, body.cycu-pdf-hide-native .pdfannotator-toolbar { display: none !important; }
        body.path-mod-pdfannotator #body-wrapper { height: 84vh !important; min-height: 680px !important; padding: 0 10px !important; }
        #cycu-pdf-assistant { position: sticky !important; top: 45px !important; z-index: 1000 !important; background: #ffffff !important; }

        #theme_boost-drawers-courseindex { display: block !important; }
        #cycu-floating-drawer-toggle { position: fixed; top: 50%; left: 0; transform: translateY(-50%); z-index: 10000; background: #0ea5e9; color: white; border: none; padding: 12px 8px; border-radius: 0 8px 8px 0; cursor: pointer; box-shadow: 2px 0 8px rgba(0,0,0,0.1); }
        #cycu-floating-drawer-toggle.cycu-drawer-open { left: 315px; background: #ef4444; }

        #cycu-file-select-modal {
            position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(4px); z-index: 100002; display: none; align-items: center; justify-content: center;
            padding: 14px; box-sizing: border-box;
        }
        #cycu-fs-card {
            background: #ffffff; width: 100%; max-width: 720px; max-height: 86vh;
            border-radius: 16px; display: flex; flex-direction: column; overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .cycu-fs-filter-chip {
            padding: 4px 10px; border-radius: 16px; font-size: 11px; font-weight: 600;
            border: 1px solid #cbd5e1; background: #f8fafc; color: #475569; cursor: pointer;
        }
        .cycu-fs-filter-chip.active { background: #4f46e5; color: white; border-color: #4f46e5; }
        .cycu-fs-item-row { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; cursor: pointer; }
        .cycu-fs-item-row:hover { background: #f1f5f9; }
    `;
    document.head.appendChild(style);

    // 任意漂浮拖曳引擎（支援 PC 滑鼠與 iPadOS 觸控、防出界、座標記憶）
    function makeDraggable(element, handle) {
        let isDragging = false;
        let startX = 0, startY = 0;
        let initialLeft = 0, initialTop = 0;

        const savedLeft = localStorage.getItem('cycu_assistant_left');
        const savedTop = localStorage.getItem('cycu_assistant_top');
        if (savedLeft !== null && savedTop !== null) {
            element.style.transform = 'none';
            element.style.left = `${Math.min(window.innerWidth - 80, Math.max(10, parseInt(savedLeft, 10)))}px`;
            element.style.top = `${Math.min(window.innerHeight - 80, Math.max(10, parseInt(savedTop, 10)))}px`;
        }

        handle.style.cursor = 'grab';
        handle.style.userSelect = 'none';
        handle.style.touchAction = 'none';

        const onStart = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'INPUT') return;

            isDragging = true;
            handle.style.cursor = 'grabbing';
            element.style.transition = 'none';

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const rect = element.getBoundingClientRect();
            element.style.transform = 'none';
            element.style.left = `${rect.left}px`;
            element.style.top = `${rect.top}px`;

            startX = clientX;
            startY = clientY;
            initialLeft = rect.left;
            initialTop = rect.top;

            if (e.cancelable && e.type === 'touchstart') e.preventDefault();
        };

        const onMove = (e) => {
            if (!isDragging) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            let newLeft = initialLeft + (clientX - startX);
            let newTop = initialTop + (clientY - startY);

            const maxLeft = window.innerWidth - element.offsetWidth - 10;
            const maxTop = window.innerHeight - element.offsetHeight - 10;

            newLeft = Math.max(10, Math.min(newLeft, maxLeft));
            newTop = Math.max(10, Math.min(newTop, maxTop));

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            handle.style.cursor = 'grab';
            element.style.transition = '';

            localStorage.setItem('cycu_assistant_left', parseInt(element.style.left, 10));
            localStorage.setItem('cycu_assistant_top', parseInt(element.style.top, 10));
        };

        handle.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);

        handle.addEventListener('touchstart', onStart, { passive: false });
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);
    }

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
                const current = yt.getCurrentTime();
                const duration = yt.getDuration();
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
            btn.innerHTML = isPlaying ? "⏸️ 暫停" : "▶️ 播放";
            btn.style.backgroundColor = isPlaying ? "#fee2e2" : "#ffffff";
            btn.style.color = isPlaying ? "#ef4444" : "#2563eb";
            btn.style.borderColor = isPlaying ? "#fecaca" : "#cbd5e1";
        }
    }

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
                console.warn("Audio Booster 初始化失敗:", e);
            }
        }
        if (window.cycuAudioCtx && window.cycuAudioCtx.state === 'suspended') {
            window.cycuAudioCtx.resume();
        }
    }

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

    // 建立極簡超薄控制面板
    function createVideoAssistant() {
        if (document.getElementById('cycu-video-assistant')) return;

        let isCollapsed = localStorage.getItem('cycu_video_assistant_collapsed') === 'true';

        // 浮動展開按鈕
        const toggleFab = document.createElement('button');
        toggleFab.id = 'cycu-video-assistant-toggle';
        toggleFab.innerHTML = "🎬";
        toggleFab.style.cssText = "position:fixed; bottom:20px; left:20px; width:44px; height:44px; border-radius:22px; background:#2563eb; color:white; border:none; box-shadow:0 4px 12px rgba(0,0,0,0.25); font-size:20px; cursor:pointer; z-index:100000; display:none; outline:none;";
        document.body.appendChild(toggleFab);

        const assistantCard = document.createElement('div');
        assistantCard.id = 'cycu-video-assistant';
        assistantCard.innerHTML = `
            <div style="background:#ffffff; overflow:hidden; width:100%;">
                <!-- 1. 極簡標題拖動列 (高度僅 ~28px) -->
                <div id="cycu-v-drag-header" style="background:#2563eb; padding:6px 12px; color:white; display:flex; align-items:center; justify-content:space-between; cursor:grab; user-select:none; touch-action:none;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:13px;">🎬</span>
                        <span style="font-weight:700; font-size:12px; color:white !important;">iLearning 影片助理</span>
                        <span style="font-size:9px; background:rgba(255,255,255,0.25); padding:1px 5px; border-radius:3px;">可拖動 ✥</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:10px; opacity:0.9;" class="cycu-hide-on-collapse">🔓 已解鎖快進</span>
                        <button id="cycu-v-collapse-btn" style="background:rgba(255,255,255,0.2); border:none; border-radius:4px; color:white; padding:2px 6px; font-size:10px; cursor:pointer; font-weight:bold;">
                            ${isCollapsed ? '展開 ＋' : '收折 －'}
                        </button>
                        <button id="cycu-v-close-btn" style="background:#ef4444; border:none; border-radius:4px; color:white; padding:2px 6px; font-size:10px; cursor:pointer; font-weight:bold;" title="隱藏面板">
                            ✕
                        </button>
                    </div>
                </div>

                <!-- 2. 極簡工具箱主體 (高度僅 ~55px) -->
                <div id="cycu-v-assistant-body" style="padding:8px 12px; display:${isCollapsed ? 'none' : 'flex'}; flex-direction:column; gap:6px; background:#ffffff;">
                    <!-- 第一行：播放/跳轉 + 進度條 + 時間顯示 (整合於同一橫列) -->
                    <div style="display:flex; align-items:center; gap:6px;">
                        <button id="cycu-v-rew30" class="cycu-slim-btn" style="padding:3px 6px !important; font-size:10px !important;">⏮ 30s</button>
                        <button id="cycu-v-rew10" class="cycu-slim-btn" style="padding:3px 6px !important; font-size:10px !important;">⏪ 10s</button>
                        <button id="cycu-v-play" class="cycu-slim-btn" data-playing="false" style="color:#2563eb !important; min-width:62px;">▶️ 播放</button>
                        <button id="cycu-v-fwd10" class="cycu-slim-btn" style="padding:3px 6px !important; font-size:10px !important;">10s ⏩</button>
                        <button id="cycu-v-fwd30" class="cycu-slim-btn" style="padding:3px 6px !important; font-size:10px !important;">30s ⏭</button>

                        <input type="range" id="cycu-video-slider" min="0" max="100" value="0" style="flex:1; height:5px; border-radius:3px; background:#e2e8f0; outline:none; -webkit-appearance:none; cursor:pointer; accent-color:#2563eb; margin:0 4px;">
                        <span id="cycu-video-time-display" style="font-size:11px; font-family:monospace; color:#475569; font-weight:bold; min-width:85px; text-align:right;">00:00/00:00</span>
                    </div>

                    <!-- 第二行：功能按鈕 + 音量滑桿 + 倍速 (超薄排列) -->
                    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:5px; border-top:1px dashed #e2e8f0; padding-top:6px;">
                        <div style="display:flex; align-items:center; gap:5px;">
                            <button id="cycu-video-focus-toggle" class="cycu-slim-btn" style="background:#4f46e5 !important; color:white !important; border-color:#4f46e5 !important;" title="HTML5 原生播放器全螢幕（徹底隱藏 iPad 網址列）">🔍 原生全螢幕</button>
                            <button id="cycu-v-download-btn" class="cycu-slim-btn" style="background:#10b981 !important; color:white !important; border-color:#10b981 !important;">📥 下載</button>
                            <button id="cycu-v-cc-toggle" class="cycu-slim-btn" style="background:#ecfdf5 !important; color:#059669 !important; border-color:#a7f3d0 !important;">💬 AI字幕</button>
                        </div>

                        <!-- 600% 音量引擎 -->
                        <div style="display:flex; align-items:center; gap:4px; border:1px solid #cbd5e1; border-radius:6px; padding:2px 8px; background:#f8fafc; height:26px;">
                            <button id="cycu-v-mute-toggle" style="background:transparent; border:none; padding:0; cursor:pointer; font-size:12px; outline:none; color:#64748b;">🔊</button>
                            <input type="range" id="cycu-v-volume-slider" min="0" max="600" value="100" style="width:55px; height:4px; border-radius:2px; background:#cbd5e1; outline:none; -webkit-appearance:none; cursor:pointer; accent-color:#f97316;">
                            <span id="cycu-v-volume-display" style="font-size:10px; color:#f97316; font-weight:bold; width:30px; text-align:right;">100%</span>
                            <button id="cycu-v-max-vol" style="background:#ef4444; border:none; border-radius:3px; color:white; padding:1px 5px; font-size:9px; cursor:pointer; font-weight:bold;" title="一鍵 600% 爆音">MAX</button>
                        </div>

                        <!-- 播放倍速 -->
                        <div style="display:flex; align-items:center; gap:3px;">
                            <button class="cycu-speed-btn cycu-slim-btn" data-speed="1.0" style="padding:2px 6px !important;">1.0x</button>
                            <button class="cycu-speed-btn cycu-slim-btn" data-speed="1.25" style="padding:2px 6px !important;">1.25x</button>
                            <button class="cycu-speed-btn cycu-slim-btn" data-speed="1.5" style="padding:2px 6px !important;">1.5x</button>
                            <button class="cycu-speed-btn cycu-slim-btn" data-speed="2.0" style="padding:2px 6px !important;">2.0x</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI 字幕引導彈窗 -->
            <div id="cycu-cc-guide" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000001; background:white; padding:20px; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.25); width:88%; max-width:360px; text-align:center; border: 2px solid #10b981;">
                <h3 style="margin:0 0 10px 0; color:#059669; font-size:16px;">💬 開啟 AI 即時字幕與翻譯</h3>
                <p style="font-size:12px; color:#475569; line-height:1.5; text-align:left; margin-bottom:10px;">利用瀏覽器免費 AI 語音識別直接轉成中文字幕：</p>
                <div style="background:#ecfdf5; padding:10px; border-radius:8px; text-align:left; font-size:11px; color:#064e3b; margin-bottom:14px; border:1px solid #a7f3d0; line-height:1.5;">
                    <b>💻 電腦 (Chrome / Edge)：</b><br>
                    點擊右上角 <b>🎵 圖示</b> > 開啟 <b>即時字幕 (Live Caption)</b> > 勾選即時翻譯成繁中。<br><br>
                    <b>📱 行動端 (iOS / Android)：</b><br>
                    - iOS: 設定 > 輔助使用 > 即時字幕 (Beta)<br>
                    - Android: 按實體音量鍵 > 點選音量列下方字幕圖示
                </div>
                <button id="cycu-cc-guide-close" style="background:#10b981; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; cursor:pointer; width:100%; font-size:12px;">👌 我知道了</button>
            </div>
        `;

        document.body.appendChild(assistantCard);

        // 啟動頂部標題列任意拖動漂浮機制
        const dragHandle = document.getElementById('cycu-v-drag-header');
        makeDraggable(assistantCard, dragHandle);

        document.getElementById('cycu-v-download-btn').addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = findCurrentVideoDownloadUrl();
            if (videoUrl) {
                showToast("🚀 正在為您開啟下載 MP4 原檔...");
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
                    showToast("⚠️ 此影片為 YouTube 嵌入源，為您開啟原生網頁！");
                    window.open(`https://www.youtube.com/watch?v=${ytMatch[1]}`, '_blank');
                } else {
                    showToast("❌ 找不到可直接下載的影片檔案", true);
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
            showToast("🎬 控制列已縮小至左下角按鈕！");
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
        const formatTime = (secs) => {
            const m = Math.floor(secs / 60).toString().padStart(2, '0');
            const s = Math.floor(secs % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        setInterval(() => {
            if (userIsDragging) return;
            const status = getVideoStatus();
            if (status.duration > 0) {
                slider.max = status.duration;
                slider.value = status.current;
                timeDisplay.innerText = `${formatTime(status.current)} / ${formatTime(status.duration)}`;
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
                    if (vol > 100) initAudioBooster(v);
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
            currentVolume = parseInt(e.target.value, 10);
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
            }
        }, 1500);

        // 全螢幕控制（優先調用 HTML5 原生播放器以徹底消除 iPad 網址列）
        const btnFocus = document.getElementById('cycu-video-focus-toggle');
        let isVideoFocus = false;

        btnFocus.onclick = (e) => {
            e.preventDefault();
            const v = document.querySelector('video');

            if (v && typeof v.webkitEnterFullscreen === 'function') {
                try {
                    v.webkitEnterFullscreen();
                    showToast("🎬 已呼叫原生全螢幕播放器（頂部網址列已隱藏）！");
                    return;
                } catch(err) {}
            }

            if (v && !isVideoFocus) {
                try {
                    if (v.requestFullscreen) { v.requestFullscreen(); return; }
                    else if (v.webkitRequestFullscreen) { v.webkitRequestFullscreen(); return; }
                } catch(err) {}
            }

            // 備援偽全螢幕
            isVideoFocus = !isVideoFocus;
            const videoWrapper = document.querySelector('.video-wrap') || document.querySelector('#videoWrap') || document.querySelector('.videocontainer');

            if (isVideoFocus) {
                document.body.classList.add('cycu-video-focus-mode');
                btnFocus.innerHTML = "🔍 還原";
                if (videoWrapper) {
                    videoWrapper.appendChild(assistantCard);
                    videoWrapper.classList.add('cycu-pseudo-fullscreen');
                } else if (v && v.parentElement) {
                    v.parentElement.classList.add('cycu-pseudo-fullscreen');
                }
            } else {
                document.body.classList.remove('cycu-video-focus-mode');
                btnFocus.innerHTML = "🔍 原生全螢幕";
                document.body.appendChild(assistantCard);
                const activeFullscreenWrapper = document.querySelector('.cycu-pseudo-fullscreen');
                if (activeFullscreenWrapper) activeFullscreenWrapper.classList.remove('cycu-pseudo-fullscreen');
            }
            window.dispatchEvent(new Event('resize'));
        };

        const speedButtons = document.querySelectorAll('.cycu-speed-btn');
        speedButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const speed = parseFloat(btn.getAttribute('data-speed'));
                setVideoSpeed(speed);
                speedButtons.forEach(b => {
                    b.style.borderColor = "#cbd5e1";
                    b.style.color = "#334155";
                    b.style.background = "#ffffff";
                });
                btn.style.borderColor = "#f97316";
                btn.style.color = "#f97316";
                btn.style.background = "#fff7ed";
                showToast(`🚀 播放速度: ${speed}x`);
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
        btn.innerHTML = '☰';
        btn.title = "開關課程大綱目錄";
        document.body.appendChild(btn);

        let isOpen = false;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            isOpen = !isOpen;
            if(isOpen) {
                drawer.classList.add('show');
                btn.classList.add('cycu-drawer-open');
                btn.innerHTML = '✕';
            } else {
                drawer.classList.remove('show');
                btn.classList.remove('cycu-drawer-open');
                btn.innerHTML = '☰';
            }
        });
    }

    function injectToolBox() {
        if (document.getElementById('cycu-enhanced-toolbox')) return;
        const container = document.querySelector('.course-content') || document.querySelector('#region-main') || document.querySelector('.weeks') || document.querySelector('.topics');
        if (container) {
            const card = document.createElement('div');
            card.id = 'cycu-enhanced-toolbox';
            card.style.cssText = "margin-bottom:20px; padding:0;";
            card.innerHTML = `
                <div style="border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 4px 14px rgba(0,0,0,0.03); background:#ffffff; overflow:hidden;">
                    <div style="background:linear-gradient(135deg, #6366f1, #4f46e5); padding:12px 18px; color:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:8px;"><span style="font-size:16px;">⚡</span><span style="font-weight:700; font-size:13px; color:white !important;">iLearning 體驗增強工具箱</span></div>
                        <span style="font-size:10px; opacity:0.9; background:rgba(255,255,255,0.22); padding:2px 6px; border-radius:10px; font-weight:bold;">v6.8.4 極簡版</span>
                    </div>
                    <div style="padding:14px; display:flex; flex-direction:column; gap:12px;">
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px;">
                            <button id="cycu-btn-simplify" style="display:flex; align-items:center; justify-content:center; gap:5px; padding:10px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; color:#334155; font-weight:700; font-size:12px; cursor:pointer;">✨ 介面精簡化</button>
                            <button id="cycu-btn-file-select" style="display:flex; align-items:center; justify-content:center; gap:5px; padding:10px; border-radius:10px; border:none; background:#4f46e5; color:white; font-weight:700; font-size:12px; cursor:pointer; box-shadow:0 3px 8px rgba(79,70,229,0.25);">📋 勾選個別檔案</button>
                            <button id="cycu-btn-pack-menu" style="display:flex; align-items:center; justify-content:center; gap:5px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:700; font-size:12px; cursor:pointer; box-shadow:0 3px 8px rgba(16,185,129,0.22);">📦 依類型快打</button>
                        </div>
                        
                        <div id="cycu-pack-options" style="display:none; flex-direction:column; gap:8px; background:#f1f5f9; padding:12px; border-radius:10px; border:1px solid #cbd5e1;">
                            <span style="font-size:12px; font-weight:bold; color:#334155;">請勾選要打包的教材類型：</span>
                            <div style="display:flex; flex-wrap:wrap; gap:10px; font-size:12px; color:#475569;">
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="檔案" checked> 📝 文件 (PPT/Doc)</label>
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="資料夾" checked> 📁 資料夾</label>
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="PDF Annotation" checked> 📖 PDF 講義</label>
                                <label style="cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="checkbox" class="cycu-pack-cb" value="超級影片"> 🎬 影片檔 <span style="color:#ef4444; font-size:10px; font-weight:bold;">(iOS 易閃退請勿勾)</span></label>
                            </div>
                            <button id="cycu-btn-start-pack" style="margin-top:2px; padding:8px; border-radius:8px; border:none; background:#0ea5e9; color:white; font-weight:700; font-size:12px; cursor:pointer;">🚀 確定，開始打包</button>
                        </div>
                    </div>
                </div>
            `;
            container.insertBefore(card, container.firstChild);

            let isSimplified = false;
            const btnSimplify = document.getElementById('cycu-btn-simplify');
            btnSimplify.onclick = (e) => {
                e.preventDefault();
                if (!isSimplified) {
                    showMenu();
                    btnSimplify.innerHTML = '🔄 還原原版頁面';
                    btnSimplify.style.background = '#e2e8f0';
                    isSimplified = true;
                } else {
                    const original = document.querySelector('ul.weeks, ul.topics, [data-for="course_sectionlist"]');
                    const side = document.querySelector('#menuside');
                    const sortContainer = document.querySelector('.cycu-sort-container');
                    if (original) original.style.display = 'block';
                    if (side) side.remove();
                    if (sortContainer) sortContainer.remove();
                    btnSimplify.innerHTML = '✨ 介面精簡化';
                    btnSimplify.style.background = '#f8fafc';
                    isSimplified = false;
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
                    <div style="background:linear-gradient(135deg, #4f46e5, #4338ca); padding:14px 18px; color:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-size:18px;">📋</span>
                            <div>
                                <div style="font-weight:700; font-size:14px; color:white;">選擇要打包的教材檔案</div>
                                <div style="font-size:10px; opacity:0.85;">支援跨週個別挑選、即時搜尋與全選</div>
                            </div>
                        </div>
                        <button id="cycu-fs-close-btn" style="background:rgba(255,255,255,0.2); border:none; border-radius:50%; width:28px; height:28px; color:white; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
                    </div>

                    <div style="padding:12px 16px; background:#f8fafc; border-bottom:1px solid #e2e8f0; display:flex; flex-direction:column; gap:8px;">
                        <div style="display:flex; align-items:center; gap:6px;">
                            <input type="text" id="cycu-fs-search" placeholder="🔍 搜尋教材名稱..." style="flex:1; border:1px solid #cbd5e1; border-radius:8px; padding:6px 10px; font-size:12px; outline:none; background:white;">
                            <button id="cycu-fs-select-all" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; background:white; font-size:11px; font-weight:700; color:#334155; cursor:pointer;">全選</button>
                            <button id="cycu-fs-deselect-all" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; background:white; font-size:11px; font-weight:700; color:#334155; cursor:pointer;">全不選</button>
                        </div>
                        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                            <span style="font-size:10px; font-weight:700; color:#64748b;">類型篩選:</span>
                            <button class="cycu-fs-filter-chip active" data-filter="all">全部</button>
                            <button class="cycu-fs-filter-chip" data-filter="PDF Annotation">📖 PDF</button>
                            <button class="cycu-fs-filter-chip" data-filter="檔案">📝 文件</button>
                            <button class="cycu-fs-filter-chip" data-filter="資料夾">📁 資料夾</button>
                            <button class="cycu-fs-filter-chip" data-filter="超級影片">🎬 影片</button>
                        </div>
                    </div>

                    <div id="cycu-fs-list" style="flex:1; overflow-y:auto; padding:12px 16px; display:flex; flex-direction:column; gap:10px;"></div>

                    <div style="padding:12px 16px; background:#ffffff; border-top:1px solid #e2e8f0; display:flex; align-items:center; justify-content:space-between; gap:10px;">
                        <div style="font-size:12px; color:#475569; font-weight:600;">
                            已選 <span id="cycu-fs-selected-count" style="color:#4f46e5; font-size:14px; font-weight:700;">0</span> / <span id="cycu-fs-total-count">0</span> 檔
                        </div>
                        <div style="display:flex; gap:6px;">
                            <button id="cycu-fs-cancel" style="padding:8px 12px; border-radius:8px; border:1px solid #cbd5e1; background:white; font-size:12px; font-weight:700; color:#64748b; cursor:pointer;">取消</button>
                            <button id="cycu-fs-download-btn" style="padding:8px 16px; border-radius:8px; border:none; background:#10b981; color:white; font-size:12px; font-weight:700; cursor:pointer; box-shadow:0 3px 8px rgba(16,185,129,0.25);">🚀 打包選中檔案</button>
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
                chip.onclick = () => {
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
            listContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:24px; font-size:13px;">找不到可下載的教材檔案！</div>`;
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
            secHeader.style.cssText = "display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; padding-bottom:3px; border-bottom:1px solid #e2e8f0; font-size:12px; font-weight:700; color:#334155;";
            secHeader.innerHTML = `
                <div style="display:flex; align-items:center; gap:5px;">
                    <span>📌 ${secNum === 0 ? "課程公告" : `第 ${secNum} 週`}</span>
                    <span style="font-size:10px; color:#64748b; font-weight:500;">(${files.length} 檔)</span>
                </div>
                <label style="font-size:10px; color:#4f46e5; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:3px;">
                    <input type="checkbox" class="cycu-fs-sec-all-cb" data-sec="${secNum}" checked> 本週全選
                </label>
            `;
            secBlock.appendChild(secHeader);

            const itemsWrap = document.createElement('div');
            itemsWrap.style.cssText = "display:flex; flex-direction:column; gap:3px;";

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
                    <input type="checkbox" class="cycu-fs-item-checkbox" data-sec="${secNum}" data-file-info="${encodeURIComponent(JSON.stringify(file))}" ${isVideo ? '' : 'checked'} style="width:15px; height:15px; cursor:pointer; accent-color:#4f46e5;">
                    <span style="font-size:9px; font-weight:700; padding:1px 5px; border-radius:4px; background:${badgeColor}18; color:${badgeColor}; border:1px solid ${badgeColor}40;">${badgeLabel}</span>
                    <span style="font-size:12px; color:#1e293b; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${file.name}">${file.name}</span>
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

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    function setCookie(name, value, days = 30) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getItems() {
        const result = {};
        const courseIdMatch = window.location.href.match(/course\/view\.php\?id=(\d+)/);
        const courseId = courseIdMatch ? courseIdMatch[1] : null;
        if (!courseId) return { items: {}, sections: [] };

        let sections = [];
        let main_section = {};

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
                            if (Array.isArray(json.section)) {
                                sections = json.section;
                                for (const sec of json.section) main_section[sec.id] = sec.parentsectionid || sec.id;
                            }
                            if (Array.isArray(json.cm)) {
                                for (const item of json.cm) {
                                    if (item.modname === "子單元") continue;
                                    item.sectionid = main_section[item.sectionid];
                                    item.sectionnumber = sections.findIndex(s => s.id === item.sectionid);
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

        const sortedResult = {};
        for (const mod of order) if (result[mod]) sortedResult[mod] = result[mod];
        for (const mod in result) if (!sortedResult[mod]) sortedResult[mod] = result[mod];
        for (const mod in sortedResult) {
            if (mod === "討論區") sortedResult[mod].sort((a, b) => { if (a.sectionnumber === b.sectionnumber) return b.id - a.id; return b.sectionnumber - a.sectionnumber; });
            else sortedResult[mod].sort((a, b) => b.sectionnumber - a.sectionnumber);
        }
        return { items: sortedResult, sections };
    }

    function showMenu() {
        const original = document.querySelector('ul.weeks, ul.topics, [data-for="course_sectionlist"]');
        const side = document.querySelector('#menuside');
        if (original) {
            original.style.display = 'none';
            const data = getItems();
            const items = data.items;
            const sections = data.sections;
            let container = side || document.createElement('ul');
            if (!side) {
                container.className = 'weeks';
                container.id = 'menuside';
                container.setAttribute('data-for', 'course_sectionlist');
            } else {
                container.innerHTML = "";
            }

            const oldSortContainer = document.querySelector('.cycu-sort-container');
            if (oldSortContainer) oldSortContainer.remove();

            const sortContainer = document.createElement('div');
            sortContainer.className = 'mb-3 cycu-sort-container';
            sortContainer.innerHTML = `<select class="form-select" id="week-sort-order" style="cursor:pointer; max-width: 140px;"><option value="desc">降序</option><option value="asc">升序</option></select>`;
            sortContainer.querySelector('#week-sort-order').value = getCookie('weekSortOrder') || 'desc';
            sortContainer.querySelector('#week-sort-order').addEventListener('change', function () { setCookie('weekSortOrder', this.value); showMenu(); });

            let sectionNum = 1;
            const currentWeekSection = sections.find(s => s.current);
            for (const modname in items) {
                const section = document.createElement('li');
                section.className = 'section course-section main clearfix';
                section.id = `side-section-${sectionNum}`;
                const weekItems = {};
                for (const item of items[modname]) {
                    if (!weekItems[item.sectionnumber]) weekItems[item.sectionnumber] = [];
                    weekItems[item.sectionnumber].push(item);
                }
                let weekNumbers = Object.keys(weekItems).map(Number);
                const week0 = weekNumbers.includes(0) ? [0] : [];
                const otherWeeks = weekNumbers.filter(w => w !== 0);
                const sortOrder = getCookie('weekSortOrder') || 'asc';
                if (sortOrder === 'asc') otherWeeks.sort((a, b) => a - b);
                else otherWeeks.sort((a, b) => b - a);
                let sortedWeeks = week0.concat(otherWeeks);

                let sectionHTML = `
                <div class="section-item">
                    <div class="course-section-header d-flex cycu-accordion-header">
                        <div class="d-flex align-items-center position-relative w-100" style="pointer-events:none;">
                            <a role="button" class="btn btn-icon me-2 icons-collapse-expand justify-content-center collapsed cycu-toggle-btn" href="#side-coursecontentcollapse${sectionNum}">
                                <span class="collapsed-icon p-1"><i class="icon fa fa-chevron-right fa-fw"></i></span>
                                <span class="expanded-icon p-1"><i class="icon fa fa-chevron-down fa-fw"></i></span>
                            </a>
                            <h3 class="h5 sectionname mb-0 w-100" style="margin-left: 6px;">${config[modname]?.title || modname}</h3>
                        </div>
                    </div>
                    <div id="side-coursecontentcollapse${sectionNum}" class="content collapse cycu-collapse-content">
                        <ul class="section img-text d-block" style="padding-left: 0; list-style: none;">`;

                for (const week of sortedWeeks) {
                    const weekItemsList = weekItems[week];
                    if (!weekItemsList) continue;
                    let isCurrent = currentWeekSection && currentWeekSection.id == weekItemsList[0].sectionid;
                    sectionHTML += `<li class="activity activity-wrapper" style="margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 6px;"><div class="week-title fw-bold fs-6 mb-1">${week === 0 ? "公告" : `第${week}週`}${isCurrent ? ' <span class="badge bg-primary">本週</span>' : ''}</div><div class="${isCurrent ? 'course-content current' : ''}">`;
                    for (const item of weekItemsList) {
                        let logoUrl = config[modname]?.logo;
                        sectionHTML += `<div class="activity-item mb-1"><div class="d-flex align-items-center"><div class="activity-icon me-2">${logoUrl ? `<img src="${logoUrl}" width="18" height="18">` : ''}</div><div class="activityname"><a href="${item.url}" class="aalink" style="position:relative; z-index:10; text-decoration: none; font-weight: 500; font-size:13px;">${item.name}</a></div></div></div>`;
                    }
                    sectionHTML += `</div></li>`;
                }
                sectionHTML += `</ul></div></div>`;
                section.innerHTML = sectionHTML;
                container.appendChild(section);
                sectionNum++;
            }
            original.parentNode.insertBefore(container, original.nextSibling);
            original.parentNode.insertBefore(sortContainer, container);

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
                <div style="width:100%; display:flex; flex-direction:column; gap:6px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:700; font-size:12px; color:#38bdf8; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:240px;" title="${currentFileName}">
                            📥 ${currentFileName}
                        </span>
                        <span style="font-size:11px; font-weight:700; color:#10b981; font-family:monospace;">
                            ${overallPercent.toFixed(0)}%
                        </span>
                    </div>
                    <div style="width:100%; height:5px; background:#334155; border-radius:3px; overflow:hidden;">
                        <div style="width:${overallPercent}%; height:100%; background:linear-gradient(90deg, #38bdf8, #6366f1, #10b981); border-radius:3px; transition:width 0.2s ease;"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#cbd5e1;">
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
            toast.innerHTML = `<div style="display:flex; align-items:center; gap:6px;"><span>⚡</span><span>壓縮打包 ZIP 封裝中，請稍候...</span></div>`;

            const zipBlob = zip.generateBlob();
            const blobUrl = URL.createObjectURL(zipBlob);
            const fileName = `${document.title.split('|')[0].trim()}_教材打包.zip`;

            toast.style.backgroundColor = '#0f172a';
            toast.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
                    <span style="font-weight:700; font-size:14px; color:#10b981;">🎉 打包完成！(${successCount}/${total})</span>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:2px;">
                        <a href="${blobUrl}" download="${fileName}" id="cycu-dl-btn" style="background:#10b981; color:white; padding:8px; border-radius:8px; text-decoration:none; font-weight:bold; text-align:center; font-size:12px;">直接下載</a>
                        <button id="dl-ios-tab" style="background:#f59e0b; color:white; padding:8px; border-radius:8px; border:none; font-weight:bold; text-align:center; font-size:12px; cursor:pointer;">iOS 開啟分頁儲存</button>
                    </div>
                    <span id="dl-close" style="font-size:10px; text-align:center; cursor:pointer; text-decoration:underline; color:#94a3b8; margin-top:2px;">關閉通知視窗</span>
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

    function getNativePageInfo() {
        const pageInput = document.querySelector('#pdfannotator_index input[type="number"], #pageNumber, .pageNumber, input[class*="page" i]');
        const current = pageInput ? parseInt(pageInput.value, 10) || 1 : 1;
        let total = 1;
        const numPagesEl = document.querySelector('#numPages, .numPages, span[id*="numPages" i], span[class*="total" i]');
        if (numPagesEl) {
            total = parseInt(numPagesEl.textContent.replace(/[^0-9]/g, ''), 10) || 1;
        } else if (pageInput && pageInput.parentElement) {
            const parentText = pageInput.parentElement.innerText;
            const match = parentText.match(/\/\s*(\d+)/);
            if (match) total = parseInt(match[1], 10);
        }
        return { current, total, pageInput };
    }

    function nativeGoPrevPage() {
        const btn = document.querySelector('#previous') || document.querySelector('#pdfannotator_prev') || document.querySelector('.pdfannotator-prev') || document.querySelector('button[class*="prev" i]');
        if (btn) { btn.click(); return true; }
        const info = getNativePageInfo();
        if (info.pageInput && info.current > 1) {
            info.pageInput.value = info.current - 1;
            info.pageInput.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        }
        return false;
    }

    function nativeGoNextPage() {
        const btn = document.querySelector('#next') || document.querySelector('#pdfannotator_next') || document.querySelector('.pdfannotator-next') || document.querySelector('button[class*="next" i]');
        if (btn) { btn.click(); return true; }
        const info = getNativePageInfo();
        if (info.pageInput && info.current < info.total) {
            info.pageInput.value = info.current + 1;
            info.pageInput.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        }
        return false;
    }

    function nativeZoomIn() {
        const btn = document.getElementById('zoomIn') || document.querySelector('#pdfannotator_zoomin') || document.querySelector('button[class*="zoomin" i]');
        if (btn) btn.click();
    }

    function nativeZoomOut() {
        const btn = document.getElementById('zoomOut') || document.querySelector('#pdfannotator_zoomout') || document.querySelector('button[class*="zoomout" i]');
        if (btn) btn.click();
    }

    function nativeZoomFit() {
        const scaleSelect = document.getElementById('scaleSelect') || document.querySelector('select[class*="scale" i]');
        if (scaleSelect) {
            scaleSelect.value = 'page-width';
            scaleSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    function sendPdfIframeAction(actionName) {
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                if (iframe.contentWindow) iframe.contentWindow.postMessage({ type: 'CYCU_PDF_ACTION', action: actionName }, '*');
            } catch (e) {}
        });
    }

    function initIframeContext() {
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CYCU_PDF_ACTION') {
                const action = event.data.action;
                if (action === 'prev') document.querySelector('button[id*="prev"]:not([id*="cycu"])')?.click();
                else if (action === 'next') document.querySelector('button[id*="next"]:not([id*="cycu"])')?.click();
                else if (action === 'zoomIn') document.querySelector('button[id*="zoomIn"]:not([id*="cycu"])')?.click();
                else if (action === 'zoomOut') document.querySelector('button[id*="zoomOut"]:not([id*="cycu"])')?.click();
                else if (action === 'zoomFit') {
                    const scaleSelect = document.getElementById('scaleSelect');
                    if (scaleSelect) { scaleSelect.value = 'page-width'; scaleSelect.dispatchEvent(new Event('change')); }
                } else if (action === 'applyDarkOn') document.body.classList.add('cycu-iframe-dark-mode');
                else if (action === 'applyDarkOff') document.body.classList.remove('cycu-iframe-dark-mode');
            }
        });

        setInterval(() => {
            const pageInput = document.getElementById('pageNumber') || document.querySelector('input[type="number"]');
            const numPages = document.getElementById('numPages') || document.querySelector('span[id*="numPages"]');
            if (pageInput) {
                try {
                    let current = parseInt(pageInput.value, 10) || 1;
                    let total = numPages ? (parseInt(numPages.textContent.replace(/[^0-9]/g, ''), 10) || 1) : '--';
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
                const targetHeight = isFocusModeActive ? 'calc(100vh - 50px)' : '84vh';
                bodyWrapper.style.setProperty('height', targetHeight, 'important');
                bodyWrapper.style.setProperty('min-height', targetHeight, 'important');
            }

            const contentWrapper = document.getElementById('content-wrapper');
            if (contentWrapper) {
                if (hasHideNativeClass || isFocusModeActive) {
                    contentWrapper.style.setProperty('width', '100%', 'important');
                    contentWrapper.style.setProperty('max-width', '100%', 'important');
                    contentWrapper.style.flex = '0 0 100%', 'important';
                }
            }
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }

    function extractFullUrl() {
        for (let script of document.scripts) {
            const match = script.textContent.match(/"fullurl":\s*"([^"]+)"/);
            if (match) return match[1].replace(/\\/g, '');
        }
        return null;
    }

    function createPDFSmartAssistant(fullUrl) {
        if (document.getElementById('cycu-pdf-assistant')) return;
        const container = document.querySelector('#region-main') || document.querySelector('#page-content') || document.body;
        if (!container) return;

        const pdfIdMatch = window.location.href.match(/id=(\d+)/);
        const pdfId = pdfIdMatch ? pdfIdMatch[1] : 'default';

        const assistantCard = document.createElement('div');
        assistantCard.id = 'cycu-pdf-assistant';
        assistantCard.style.cssText = "margin-bottom: 16px; padding: 0; width:100%; z-index: 100;";
        assistantCard.innerHTML = `
            <div style="border-radius:14px; border:1px solid #e2e8f0; background:#ffffff; box-shadow:0 4px 16px rgba(0,0,0,0.04); overflow:hidden; width:100%;">
                <div style="background:linear-gradient(135deg, #4f46e5, #3730a3); padding:10px 16px; color:white; display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:6px;"><span style="font-size:15px;">📖</span><span style="font-weight:700; font-size:12px; color:white !important;">iLearning PDF 助理</span></div>
                    <span style="font-size:10px; opacity:0.8; font-weight:bold;">中原專用</span>
                </div>
                <div style="padding:10px 14px; display:flex; flex-direction:column; gap:8px; background:#fafafa;">
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:6px;">
                        <button id="cycu-pdf-dark-toggle" class="cycu-slim-btn">🌓 護眼深色</button>
                        <button id="cycu-pdf-focus-toggle" class="cycu-slim-btn">🔍 全螢幕</button>
                        <button id="cycu-pdf-native-toggle" class="cycu-slim-btn cycu-pdf-btn-active">⚙️ 隱藏原廠</button>
                        <button id="cycu-pdf-note-toggle" class="cycu-slim-btn">📝 隨堂筆記</button>
                    </div>
                    <div>
                        <a id="cycu-pdf-direct-download" href="${fullUrl}" download target="_blank" style="text-align:center; display:block; padding:9px; border-radius:8px; background:#10b981; color:white !important; font-weight:700; font-size:11px; text-decoration:none; box-shadow:0 2px 8px rgba(16,185,129,0.2);">📥 離線下載 PDF 講義 (支援 iOS 長按儲存)</a>
                    </div>

                    <div style="border-top:1px solid #e2e8f0; padding-top:8px; display:grid; grid-template-columns:1fr 2fr 1fr; align-items:center; text-align:center;">
                        <button id="cycu-pdf-prev" class="cycu-slim-btn">◀ 上一頁</button>
                        <span id="cycu-pdf-page-indicator" style="font-size:12px; font-weight:bold; color:#1e293b;">Page 1 / --</span>
                        <button id="cycu-pdf-next" class="cycu-slim-btn">下一頁 ▶</button>
                    </div>

                    <div style="border-top:1px dashed #e2e8f0; padding-top:8px; display:grid; grid-template-columns:1fr 1.5fr 1fr; gap:6px;">
                        <button id="cycu-pdf-zoom-out" class="cycu-slim-btn">➖ 縮小</button>
                        <button id="cycu-pdf-zoom-fit" class="cycu-slim-btn" style="background:#f1f5f9 !important;">🔄 滿版寬度</button>
                        <button id="cycu-pdf-zoom-in" class="cycu-slim-btn">➕ 放大</button>
                    </div>
                </div>

                <div id="cycu-pdf-notebook" style="display:none; border-top:1px solid #e2e8f0; padding:12px; background:#ffffff;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                        <span style="font-size:11px; font-weight:700; color:#334155;">✍️ 課堂重點隨寫：</span>
                        <span id="cycu-pdf-note-status" style="font-size:9px; color:#10b981; font-weight:bold;">已存至本機 💾</span>
                    </div>
                    <textarea id="cycu-pdf-note-area" placeholder="在此記錄公式、重點..." style="width:100%; height:100px; border:1px solid #cbd5e1; border-radius:8px; padding:8px; font-size:11px; color:#334155; background:#fafafa; resize:none; box-sizing:border-box;"></textarea>
                    <div style="display:flex; justify-content:space-between; margin-top:6px;">
                        <button id="cycu-pdf-note-copy" class="cycu-slim-btn" style="font-size:10px !important;">📋 複製筆記</button>
                        <button id="cycu-pdf-note-export" class="cycu-slim-btn" style="background:#3b82f6 !important; color:white !important; border-color:#3b82f6 !important; font-size:10px !important;">📤 匯出 TXT</button>
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

        let isDarkMode = localStorage.getItem('cycu_pdf_dark_mode') === 'true';
        const applyDarkMode = () => {
            if (isDarkMode) {
                btnDark.classList.add('cycu-pdf-btn-active');
                sendPdfIframeAction('applyDarkOn');
            } else {
                btnDark.classList.remove('cycu-pdf-btn-active');
                sendPdfIframeAction('applyDarkOff');
            }
        };
        setTimeout(applyDarkMode, 400);

        btnDark.onclick = (e) => {
            e.preventDefault();
            isDarkMode = !isDarkMode;
            localStorage.setItem('cycu_pdf_dark_mode', isDarkMode);
            applyDarkMode();
        };

        let isFocusMode = false;
        btnFocus.onclick = (e) => {
            e.preventDefault();
            isFocusMode = !isFocusMode;
            if (isFocusMode) {
                document.body.classList.add('cycu-pdf-focus-mode');
                btnFocus.classList.add('cycu-pdf-btn-active');
                btnFocus.innerHTML = "🔍 還原";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                document.body.classList.remove('cycu-pdf-focus-mode');
                btnFocus.classList.remove('cycu-pdf-btn-active');
                btnFocus.innerHTML = "🔍 全螢幕";
            }
            window.dispatchEvent(new Event('resize'));
        };

        btnNative.onclick = (e) => {
            e.preventDefault();
            if (document.body.classList.contains('cycu-pdf-hide-native')) {
                document.body.classList.remove('cycu-pdf-hide-native');
                btnNative.classList.remove('cycu-pdf-btn-active');
                btnNative.innerHTML = "⚙️ 顯示原廠";
            } else {
                document.body.classList.add('cycu-pdf-hide-native');
                btnNative.classList.add('cycu-pdf-btn-active');
                btnNative.innerHTML = "⚙️ 隱藏原廠";
            }
        };

        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CYCU_PDF_STATUS') {
                document.getElementById('cycu-pdf-page-indicator').innerText = `Page ${event.data.current} / ${event.data.total}`;
            }
        });

        document.getElementById('cycu-pdf-prev').onclick = (e) => { e.preventDefault(); nativeGoPrevPage(); };
        document.getElementById('cycu-pdf-next').onclick = (e) => { e.preventDefault(); nativeGoNextPage(); };
        document.getElementById('cycu-pdf-zoom-in').onclick = (e) => { e.preventDefault(); nativeZoomIn(); };
        document.getElementById('cycu-pdf-zoom-out').onclick = (e) => { e.preventDefault(); nativeZoomOut(); };
        document.getElementById('cycu-pdf-zoom-fit').onclick = (e) => { e.preventDefault(); nativeZoomFit(); };

        const savedNoteKey = `cycu_note_${pdfId}`;
        noteArea.value = localStorage.getItem(savedNoteKey) || '';

        btnNote.onclick = (e) => {
            e.preventDefault();
            if (notebook.style.display === 'none') {
                notebook.style.display = 'block';
                btnNote.classList.add('cycu-pdf-btn-active');
            } else {
                notebook.style.display = 'none';
                btnNote.classList.remove('cycu-pdf-btn-active');
            }
        };

        noteArea.oninput = () => {
            noteStatus.innerText = "⏳ 儲存中...";
            noteStatus.style.color = "#f59e0b";
            localStorage.setItem(savedNoteKey, noteArea.value);
            setTimeout(() => {
                noteStatus.innerText = "已存至本機 💾";
                noteStatus.style.color = "#10b981";
            }, 350);
        };

        document.getElementById('cycu-pdf-note-copy').onclick = (e) => {
            e.preventDefault();
            noteArea.select();
            document.execCommand('copy');
            const btn = e.target;
            const old = btn.innerText;
            btn.innerText = "✅ 已複製！";
            setTimeout(() => btn.innerText = old, 1500);
        };

        document.getElementById('cycu-pdf-note-export').onclick = (e) => {
            e.preventDefault();
            if (!noteArea.value.trim()) {
                showToast("筆記內容不能為空唷！", true);
                return;
            }
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([noteArea.value], { type: 'text/plain;charset=utf-8' }));
            link.download = `課堂重點筆記_PDF_${pdfId}.txt`;
            link.click();
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

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
})();
