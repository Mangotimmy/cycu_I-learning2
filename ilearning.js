// ==UserScript==
// @name         中原 cycu iLearning 2.0 頁面addon
// @namespace    http://ilearning.cycu.edu.tw/
// @version      6.8.8
// @description  可任意拖曳漂浮面板（支援 PC 滑鼠/iPad 觸控與座標記憶）、直接調用 HTML5 Video 原生全螢幕（徹底隱藏 iPadOS Safari 網址列/分頁列，與 YouTube 完全一致）、影片進度條、獨立影片/PDF直載、大綱抽屜解鎖、全格式教材自訂打包 ZIP，並支援 Web Audio 600% 爆音引擎。
// @author       Mangotimmy
// @license      MIT
// @match        *://ilearning.cycu.edu.tw/*
// @grant        none
// @run-at       document-end
// @icon data:image/png;base64,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
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

    // 獨立 AI 字幕引導彈窗（掛載至 body，徹底避免受浮動面板樣式與 overflow 限制）
    function openCCGuideModal() {
        let mask = document.getElementById('cycu-cc-guide-mask');
        if (!mask) {
            mask = document.createElement('div');
            mask.id = 'cycu-cc-guide-mask';
            mask.style.cssText = `
                position: fixed !important;
                inset: 0 !important;
                background: rgba(15, 23, 42, 0.65) !important;
                backdrop-filter: blur(5px) !important;
                -webkit-backdrop-filter: blur(5px) !important;
                z-index: 1000005 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 16px !important;
                box-sizing: border-box !important;
                animation: fadeIn 0.2s ease;
            `;

            mask.innerHTML = `
                <div style="background:#ffffff; padding:20px; border-radius:16px; box-shadow:0 20px 40px rgba(0,0,0,0.3); width:100%; max-width:400px; text-align:center; border:2px solid #10b981; max-height:90vh; overflow-y:auto; box-sizing:border-box; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <h3 style="margin:0; color:#059669; font-size:16px; font-weight:700; display:flex; align-items:center; gap:6px;">
                            <span>💬</span><span>開啟 AI 即時字幕與翻譯</span>
                        </h3>
                        <button id="cycu-cc-close-x" style="background:rgba(0,0,0,0.06); border:none; border-radius:50%; width:26px; height:26px; font-size:13px; color:#64748b; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
                    </div>
                    <p style="font-size:12px; color:#475569; line-height:1.5; text-align:left; margin-bottom:12px;">
                        利用瀏覽器免費 AI 語音識別技術，直接將老師上課語音轉成中文字幕：
                    </p>
                    <div style="background:#ecfdf5; padding:12px 14px; border-radius:10px; text-align:left; font-size:11px; color:#064e3b; margin-bottom:16px; border:1px solid #a7f3d0; line-height:1.6;">
                        <b style="color:#047857;">💻 電腦 (Chrome / Edge)：</b><br>
                        點擊網址列右側 <b>🎵 媒體控制圖示</b> > 開啟 <b>即時字幕 (Live Caption)</b> > 勾選即時翻譯為繁體中文。<br><br>
                        <b style="color:#047857;">📱 行動端 (iPadOS / iOS / Android)：</b><br>
                        - <b>iOS / iPadOS</b>: 設定 > 輔助使用 > 即時字幕 (Beta)<br>
                        - <b>Android</b>: 按實體音量鍵 > 點選音量滑桿下方「即時字幕」圖示
                    </div>
                    <button id="cycu-cc-close-btn" style="background:#10b981; color:white; border:none; padding:10px 16px; border-radius:10px; font-weight:700; cursor:pointer; width:100%; font-size:13px; box-shadow:0 3px 8px rgba(16,185,129,0.25);">👌 我知道了</button>
                </div>
            `;
            document.body.appendChild(mask);

            mask.addEventListener('click', (e) => {
                if (e.target === mask) mask.style.display = 'none';
            });
            mask.querySelector('#cycu-cc-close-x').addEventListener('click', () => {
                mask.style.display = 'none';
            });
            mask.querySelector('#cycu-cc-close-btn').addEventListener('click', () => {
                mask.style.display = 'none';
            });
        }
        mask.style.display = 'flex';
    }

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
                <!-- 1. 極簡標題拖動列 (高度約 ~28px) -->
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

                <!-- 2. 極簡工具箱主體 (高度約 ~55px) -->
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

        // 點擊 AI 字幕按鈕，呼叫獨立的模態視窗
        document.getElementById('cycu-v-cc-toggle').addEventListener('click', (e) => {
            e.preventDefault();
            openCCGuideModal();
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
                        <span style="font-size:10px; opacity:0.9; background:rgba(255,255,255,0.22); padding:2px 6px; border-radius:10px; font-weight:bold;">v2</span>
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
