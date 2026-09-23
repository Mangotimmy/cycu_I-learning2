// ==UserScript==
// @name         中原 cycu iLearning 2.0 頁面addon
// @namespace    http://ilearning.cycu.edu.tw/
// @version      2.1.5
// @description  可任意拖曳漂浮面板（支援 PC 滑鼠/iPad 觸控與座標防出界記憶）、HTML5 Video 原生全螢幕、影片進度條、獨立影片/PDF直載、大綱抽屜解鎖、全格式教材自訂打包 ZIP，並支援 Web Audio 600% 與 PDF 護眼深色模式。
// @author       Mangotimmy
// @license      MIT
// @match        *://ilearning.cycu.edu.tw/*
// @grant        none
// @run-at       document-end
// @icon data:image/png;base64,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
// @downloadURL https://update.greasyfork.org/scripts/597066/%E4%B8%AD%E5%8E%9F%20cycu%20iLearning%2020%20%E9%A0%81%E9%9D%A2addon%20%28%E5%84%AA%E5%8C%96%E4%BF%AE%E5%BE%A9%E7%89%88%29.user.js
// @updateURL https://update.greasyfork.org/scripts/597066/%E4%B8%AD%E5%8E%9F%20cycu%20iLearning%2020%20%E9%A0%81%E9%9D%A2addon%20%28%E5%84%AA%E5%8C%96%E4%BF%AE%E5%BE%A9%E7%89%88%29.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // 常用配置常數
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

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (e) {}
        }
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const success = document.execCommand('copy');
        ta.remove();
        return success;
    }

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

    // 🌟 修復 1：增加 Toast 計時自動淡出消除（2 秒後自動消失，不再永久常駐）
    let toastTimer = null;
    function showToast(message, isError = false) {
        let toast = document.getElementById('dl-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'dl-toast';
            Object.assign(toast.style, {
                position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', padding: '10px 18px',
                borderRadius: '12px', color: 'white', fontSize: '12px', fontWeight: '600', zIndex: '1000002',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: '10px',
                maxWidth: '420px', transition: 'all 0.3s ease', opacity: '0', pointerEvents: 'none'
            });
            document.body.appendChild(toast);
        }

        clearTimeout(toastTimer);
        toast.style.backgroundColor = isError ? '#ef4444' : '#0f172a';
        toast.innerHTML = `<span style="flex-grow:1; line-height:1.4;">${message}</span>`;
        toast.style.opacity = '1';
        toast.style.bottom = '30px';

        if (isError) {
            toast.style.pointerEvents = 'auto';
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; opacity:0.8; margin-left:8px; font-size:14px;';
            closeBtn.onclick = () => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); };
            toast.appendChild(closeBtn);
        } else {
            toastTimer = setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.bottom = '20px';
                setTimeout(() => { if (toast.parentNode) toast.remove(); }, 350);
            }, 2000);
        }
        return toast;
    }

    // 全域 CSS 注入（完整包含章節標籤、原生工具列隱藏與劇院全螢幕模式）
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

        /* 護眼深色模式 */
        body.cycu-pdf-dark-mode,
        body.cycu-pdf-dark-mode #page,
        body.cycu-pdf-dark-mode #page-content,
        body.cycu-pdf-dark-mode #region-main,
        body.cycu-pdf-dark-mode #body-wrapper,
        body.cycu-pdf-dark-mode #viewerContainer {
            background-color: #121214 !important;
            color: #d1d5db !important;
        }
        body.cycu-pdf-dark-mode iframe:not(.cycu-styled-dark),
        body.cycu-pdf-dark-mode canvas,
        body.cycu-pdf-dark-mode .pdfViewer .page,
        body.cycu-pdf-dark-mode .page {
            filter: invert(0.88) hue-rotate(180deg) brightness(0.95) contrast(1.1) !important;
            background-color: #1e293b !important;
        }

        /* 🌟 修復 2：徹底隱藏分頁標籤（Overview / Chap 1 / Statistics）與原生灰色工具列 */
        body.cycu-pdf-hide-native .nav-tabs,
        body.cycu-pdf-hide-native ul.nav,
        body.cycu-pdf-hide-native [role="tablist"],
        body.cycu-pdf-hide-native .secondary-navigation,
        body.cycu-pdf-hide-native .tabtree,
        body.cycu-pdf-hide-native #pdfannotator-toolbar,
        body.cycu-pdf-hide-native #pdfannotator_toolbar,
        body.cycu-pdf-hide-native .pdfannotator-toolbar,
        body.cycu-pdf-hide-native #ann-toolbar,
        body.cycu-pdf-hide-native #toolbarContainer,
        body.cycu-pdf-hide-native #toolbarViewer,
        body.cycu-pdf-hide-native #sidebar-wrapper,
        body.cycu-pdf-hide-native .pdfannotator-sidebar,
        body.cycu-pdf-hide-native #comments-wrapper,
        body.cycu-pdf-hide-native #comment-list-wrapper,
        body.cycu-pdf-hide-native .annotator-sidebar,
        body.cycu-pdf-hide-native #annotation-view,
        body.cycu-pdf-hide-native #page-header,
        body.cycu-pdf-hide-native .activity-header { display: none !important; }

        body.path-mod-pdfannotator #body-wrapper { height: 84vh !important; min-height: 680px !important; padding: 0 10px !important; }
        #cycu-pdf-assistant { position: sticky !important; top: 45px !important; z-index: 1000 !important; background: #ffffff !important; }

        .cycu-slim-btn {
            padding: 4px 8px !important; border-radius: 6px !important; border: 1px solid #cbd5e1 !important;
            background: #ffffff !important; color: #334155 !important; font-weight: 700 !important;
            font-size: 11px !important; cursor: pointer !important; outline: none !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            gap: 3px !important; height: 26px !important; white-space: nowrap !important;
            -webkit-tap-highlight-color: transparent !important; transition: all 0.15s !important;
        }
        .cycu-slim-btn:active { background: #f1f5f9 !important; transform: scale(0.97); }

        /* 🌟 修復 3：YouTube 劇院全螢幕模式（單一容器滿版覆蓋，徹底避免畫布空白） */
        body.cycu-pdf-theater-mode {
            overflow: hidden !important;
            background: #000000 !important;
        }
        body.cycu-pdf-theater-mode .navbar,
        body.cycu-pdf-theater-mode header,
        body.cycu-pdf-theater-mode .fixed-top,
        body.cycu-pdf-theater-mode #usernavigation,
        body.cycu-pdf-theater-mode #page-header,
        body.cycu-pdf-theater-mode #page-footer,
        body.cycu-pdf-theater-mode .breadcrumb,
        body.cycu-pdf-theater-mode .nav-tabs,
        body.cycu-pdf-theater-mode ul.nav,
        body.cycu-pdf-theater-mode [role="tablist"],
        body.cycu-pdf-theater-mode .secondary-navigation,
        body.cycu-pdf-theater-mode #theme_boost-drawers-courseindex,
        body.cycu-pdf-theater-mode #cycu-floating-drawer-toggle,
        body.cycu-pdf-theater-mode #cycu-pdf-assistant,
        body.cycu-pdf-theater-mode #pdfannotator-toolbar,
        body.cycu-pdf-theater-mode #pdfannotator_toolbar,
        body.cycu-pdf-theater-mode .pdfannotator-toolbar,
        body.cycu-pdf-theater-mode #ann-toolbar,
        body.cycu-pdf-theater-mode #comments-wrapper,
        body.cycu-pdf-theater-mode .annotator-sidebar {
            display: none !important;
            height: 0 !important;
            visibility: hidden !important;
        }

        /* 僅將 #body-wrapper 設為全螢幕覆蓋層，內部 #viewerContainer 自然撐滿 */
        body.cycu-pdf-theater-mode #body-wrapper {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            width: 100dvw !important;
            height: 100vh !important;
            height: 100dvh !important;
            z-index: 999990 !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #18181b !important;
        }
        body.cycu-pdf-theater-mode #content-wrapper,
        body.cycu-pdf-theater-mode #viewerContainer,
        body.cycu-pdf-theater-mode iframe {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            border: none !important;
        }

        /* 底部懸浮 HUD 控制膠囊 */
        #cycu-pdf-theater-hud {
            position: fixed !important;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000000 !important;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 30px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            color: white;
            font-size: 11px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            transition: opacity 0.35s ease, transform 0.35s ease;
            user-select: none;
        }
        #cycu-pdf-theater-hud.cycu-hud-idle { opacity: 0.15 !important; }
        #cycu-pdf-theater-hud:hover { opacity: 1 !important; }

        .cycu-hud-btn {
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            border-radius: 20px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            outline: none;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            transition: all 0.15s;
            white-space: nowrap;
        }
        .cycu-hud-btn:hover { background: rgba(255, 255, 255, 0.25); color: #ffffff; }
        .cycu-hud-btn.danger { background: #ef4444; border-color: #ef4444; }
    `;
    document.head.appendChild(style);

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

    // 🌟 修復 4：移除定時器中每 300ms 觸發 resize 的無限重繪迴圈（解決畫布全白）
    function initParentCleaningRoutine() {
        document.body.classList.add('cycu-pdf-hide-native');
        let lastTheater = false;
        let lastFocus = false;
        let lastNative = true;

        setInterval(() => {
            const docBody = document.body;
            const hasHideNativeClass = docBody.classList.contains('cycu-pdf-hide-native');
            const isFocusModeActive = docBody.classList.contains('cycu-pdf-focus-mode');
            const isTheaterModeActive = docBody.classList.contains('cycu-pdf-theater-mode');

            const bodyWrapper = document.getElementById('body-wrapper');
            if (bodyWrapper) {
                if (isTheaterModeActive) {
                    bodyWrapper.style.setProperty('height', '100vh', 'important');
                    bodyWrapper.style.setProperty('min-height', '100vh', 'important');
                } else {
                    const targetHeight = isFocusModeActive ? 'calc(100vh - 50px)' : '84vh';
                    bodyWrapper.style.setProperty('height', targetHeight, 'important');
                    bodyWrapper.style.setProperty('min-height', targetHeight, 'important');
                }
            }

            const contentWrapper = document.getElementById('content-wrapper');
            if (contentWrapper) {
                if (isTheaterModeActive || hasHideNativeClass || isFocusModeActive) {
                    contentWrapper.style.setProperty('width', '100%', 'important');
                    contentWrapper.style.setProperty('max-width', '100%', 'important');
                    contentWrapper.style.setProperty('flex', '0 0 100%', 'important');
                } else {
                    contentWrapper.style.removeProperty('width');
                    contentWrapper.style.removeProperty('max-width');
                    contentWrapper.style.removeProperty('flex');
                }
            }

            // 僅在全螢幕或模式狀態切換時觸發一次 resize，絕不在定時器中無腦重繪
            if (lastTheater !== isTheaterModeActive || lastFocus !== isFocusModeActive || lastNative !== hasHideNativeClass) {
                lastTheater = isTheaterModeActive;
                lastFocus = isFocusModeActive;
                lastNative = hasHideNativeClass;
                setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
            }
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
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:15px;">📖</span>
                        <span style="font-weight:700; font-size:12px; color:white !important;">iLearning PDF 助理</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <button id="cycu-pdf-collapse-btn" style="background:rgba(255,255,255,0.2); border:none; border-radius:4px; color:white; padding:2px 6px; font-size:10px; cursor:pointer; font-weight:bold;">收折 －</button>
                        <span style="font-size:10px; opacity:0.8; font-weight:bold;">中原專用</span>
                    </div>
                </div>
                <div id="cycu-pdf-assistant-body" style="padding:10px 14px; display:flex; flex-direction:column; gap:8px; background:#fafafa;">
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:6px;">
                        <button id="cycu-pdf-dark-toggle" class="cycu-slim-btn">🌓 護眼深色</button>
                        <button id="cycu-pdf-focus-toggle" class="cycu-slim-btn">🔍 原生全螢幕</button>
                        <button id="cycu-pdf-native-toggle" class="cycu-slim-btn cycu-pdf-btn-active">⚙️ 顯示原廠</button>
                        <button id="cycu-pdf-note-toggle" class="cycu-slim-btn">📝 隨堂筆記</button>
                    </div>
                    <div>
                        <a id="cycu-pdf-direct-download" href="${escapeHtml(fullUrl)}" download target="_blank" style="text-align:center; display:block; padding:9px; border-radius:8px; background:#10b981; color:white !important; font-weight:700; font-size:11px; text-decoration:none; box-shadow:0 2px 8px rgba(16,185,129,0.2);">📥 離線下載 PDF 講義 (支援 iOS 長按儲存)</a>
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
        assistantCard.addEventListener('click', (e) => e.stopPropagation());

        const btnDark = document.getElementById('cycu-pdf-dark-toggle');
        const btnFocus = document.getElementById('cycu-pdf-focus-toggle');
        const btnNative = document.getElementById('cycu-pdf-native-toggle');
        const btnNote = document.getElementById('cycu-pdf-note-toggle');
        const notebook = document.getElementById('cycu-pdf-notebook');
        const noteArea = document.getElementById('cycu-pdf-note-area');
        const noteStatus = document.getElementById('cycu-pdf-note-status');
        const pdfCollapseBtn = document.getElementById('cycu-pdf-collapse-btn');
        const pdfAssistantBody = document.getElementById('cycu-pdf-assistant-body');

        pdfCollapseBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (pdfAssistantBody.style.display === 'none') {
                pdfAssistantBody.style.display = 'flex';
                pdfCollapseBtn.innerText = '收折 －';
            } else {
                pdfAssistantBody.style.display = 'none';
                pdfCollapseBtn.innerText = '展開 ＋';
            }
        };

        let isDarkMode = localStorage.getItem('cycu_pdf_dark_mode') === 'true';
        const applyDarkMode = () => {
            if (isDarkMode) {
                btnDark.classList.add('cycu-pdf-btn-active');
                document.body.classList.add('cycu-pdf-dark-mode');
            } else {
                btnDark.classList.remove('cycu-pdf-btn-active');
                document.body.classList.remove('cycu-pdf-dark-mode');
            }
        };
        applyDarkMode();

        btnDark.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDarkMode = !isDarkMode;
            localStorage.setItem('cycu_pdf_dark_mode', isDarkMode);
            applyDarkMode();
            showToast(isDarkMode ? "🌓 已開啟 PDF 護眼深色模式" : "☀️ 已關閉護眼深色模式");
        };

        // 🎬 劇院全螢幕模式
        let theaterIdleTimer = null;
        function toggleTheaterFullscreen() {
            const isTheater = document.body.classList.toggle('cycu-pdf-theater-mode');
            let hud = document.getElementById('cycu-pdf-theater-hud');

            if (isTheater) {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) docEl.requestFullscreen().catch(() => {});
                else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen().catch(() => {});

                if (!hud) {
                    hud = document.createElement('div');
                    hud.id = 'cycu-pdf-theater-hud';
                    hud.innerHTML = `
                        <button id="cycu-hud-prev" class="cycu-hud-btn">◀ 上頁</button>
                        <span id="cycu-hud-page" style="font-family:monospace; font-weight:700; padding:0 6px; color:#38bdf8;">Page 1 / --</span>
                        <button id="cycu-hud-next" class="cycu-hud-btn">下頁 ▶</button>
                        <span style="opacity:0.3; margin:0 2px;">|</span>
                        <button id="cycu-hud-fit" class="cycu-hud-btn">🔄 滿版寬度</button>
                        <button id="cycu-hud-in" class="cycu-hud-btn">➕</button>
                        <button id="cycu-hud-out" class="cycu-hud-btn">➖</button>
                        <span style="opacity:0.3; margin:0 2px;">|</span>
                        <button id="cycu-hud-dark" class="cycu-hud-btn">🌓 深色</button>
                        <button id="cycu-hud-exit" class="cycu-hud-btn danger">✕ 退出全螢幕</button>
                    `;
                    document.body.appendChild(hud);

                    hud.addEventListener('click', (ev) => ev.stopPropagation());
                    hud.querySelector('#cycu-hud-prev').onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); nativeGoPrevPage(); };
                    hud.querySelector('#cycu-hud-next').onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); nativeGoNextPage(); };
                    hud.querySelector('#cycu-hud-fit').onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); nativeZoomFit(); };
                    hud.querySelector('#cycu-hud-in').onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); nativeZoomIn(); };
                    hud.querySelector('#cycu-hud-out').onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); nativeZoomOut(); };
                    hud.querySelector('#cycu-hud-dark').onclick = (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        isDarkMode = !isDarkMode;
                        localStorage.setItem('cycu_pdf_dark_mode', isDarkMode);
                        applyDarkMode();
                    };
                    hud.querySelector('#cycu-hud-exit').onclick = (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        toggleTheaterFullscreen();
                    };

                    window.addEventListener('mousemove', () => {
                        hud.classList.remove('cycu-hud-idle');
                        clearTimeout(theaterIdleTimer);
                        if (document.body.classList.contains('cycu-pdf-theater-mode')) {
                            theaterIdleTimer = setTimeout(() => hud.classList.add('cycu-hud-idle'), 3000);
                        }
                    });
                }

                hud.style.display = 'flex';
                hud.classList.remove('cycu-hud-idle');
                const pageInd = document.getElementById('cycu-pdf-page-indicator');
                if (pageInd) hud.querySelector('#cycu-hud-page').innerText = pageInd.innerText;

                btnFocus.innerHTML = "🔍 還原";
                btnFocus.classList.add('cycu-pdf-btn-active');
                showToast("🎬 已進入 YouTube 劇院全螢幕（按 F 或 Esc 退出）");

                setTimeout(() => {
                    nativeZoomFit();
                    window.dispatchEvent(new Event('resize'));
                }, 300);
            } else {
                if (document.fullscreenElement || document.webkitFullscreenElement) {
                    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
                    else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
                }
                if (hud) hud.style.display = 'none';
                clearTimeout(theaterIdleTimer);
                btnFocus.innerHTML = "🔍 原生全螢幕";
                btnFocus.classList.remove('cycu-pdf-btn-active');
                showToast("🔍 已退出全螢幕");
                setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
            }
        }

        btnFocus.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheaterFullscreen();
        };

        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                toggleTheaterFullscreen();
            } else if (e.key === 'Escape' && document.body.classList.contains('cycu-pdf-theater-mode')) {
                toggleTheaterFullscreen();
            } else if (document.body.classList.contains('cycu-pdf-theater-mode')) {
                if (e.key === 'ArrowLeft') { e.preventDefault(); nativeGoPrevPage(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); nativeGoNextPage(); }
            }
        });

        // 🌟 修復 5：原廠列/分頁列顯隱切換（同時動態改變 DOM 確保樣式覆蓋）
        let isNativeHidden = true;
        const updateNativeBtnUI = () => {
            const targets = document.querySelectorAll('.nav-tabs, [role="tablist"], .secondary-navigation, #pdfannotator-toolbar, .pdfannotator-toolbar, #ann-toolbar');
            if (isNativeHidden) {
                document.body.classList.add('cycu-pdf-hide-native');
                btnNative.classList.add('cycu-pdf-btn-active');
                btnNative.innerHTML = "⚙️ 顯示原廠";
                targets.forEach(el => el.style.setProperty('display', 'none', 'important'));
            } else {
                document.body.classList.remove('cycu-pdf-hide-native');
                btnNative.classList.remove('cycu-pdf-btn-active');
                btnNative.innerHTML = "⚙️ 隱藏原廠";
                targets.forEach(el => el.style.removeProperty('display'));
            }
            window.dispatchEvent(new Event('resize'));
        };
        updateNativeBtnUI();

        btnNative.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            isNativeHidden = !isNativeHidden;
            updateNativeBtnUI();
            showToast(isNativeHidden ? "⚙️ 已隱藏原廠工具列與標籤頁" : "⚙️ 已顯示原廠工具列與標籤頁");
        };

        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CYCU_PDF_STATUS') {
                const text = `Page ${event.data.current} / ${event.data.total}`;
                document.getElementById('cycu-pdf-page-indicator').innerText = text;
                const hudPage = document.querySelector('#cycu-hud-page');
                if (hudPage) hudPage.innerText = text;
            }
        });

        document.getElementById('cycu-pdf-prev').onclick = (e) => { e.preventDefault(); e.stopPropagation(); nativeGoPrevPage(); };
        document.getElementById('cycu-pdf-next').onclick = (e) => { e.preventDefault(); e.stopPropagation(); nativeGoNextPage(); };
        document.getElementById('cycu-pdf-zoom-in').onclick = (e) => { e.preventDefault(); e.stopPropagation(); nativeZoomIn(); };
        document.getElementById('cycu-pdf-zoom-out').onclick = (e) => { e.preventDefault(); e.stopPropagation(); nativeZoomOut(); };
        document.getElementById('cycu-pdf-zoom-fit').onclick = (e) => { e.preventDefault(); e.stopPropagation(); nativeZoomFit(); };

        const savedNoteKey = `cycu_note_${pdfId}`;
        noteArea.value = localStorage.getItem(savedNoteKey) || '';

        btnNote.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
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

        document.getElementById('cycu-pdf-note-copy').onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const success = await copyToClipboard(noteArea.value);
            const btn = e.target;
            const old = btn.innerText;
            btn.innerText = success ? "✅ 已複製！" : "❌ 複製失敗";
            setTimeout(() => btn.innerText = old, 1500);
        };

        document.getElementById('cycu-pdf-note-export').onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
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
