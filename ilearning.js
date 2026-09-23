// ==UserScript==
// @name         中原 iLearning 2.0 頁面體驗增強 (v6.8.1 HTML5原生全螢幕極限版)
// @namespace    http://ilearning.cycu.edu.tw/
// @version      6.8.1
// @description  直接調用 HTML5 Video 原生全螢幕（徹底隱藏 iPadOS Safari 網址列/分頁列，與 YouTube 完全一致）、影片進度條、獨立影片/PDF直載、大綱抽屜解鎖、全格式教材自訂打包 ZIP。
// @author       Mangotimmy
// @license      MIT
// @match        *://ilearning.cycu.edu.tw/*
// @grant        GM_addStyle
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @run-at       document-end
// @icon         data:image/png;base64,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
// ==/UserScript==

(function() {
    'use strict';

    const SCRIPT_NAME = '中原 iLearning 2.0 增強助手';
    const LOG_PREFIX = `[${SCRIPT_NAME}] `;

    // 格式化目前時間為 MS-DOS 16-bit 格式（修復 1980 年解壓縮修改時間問題）
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

    // CRC32 校驗表建立（修復 CRC_TABLE 遺失問題）
    const CRC_TABLE = (function() {
        let c;
        const table = new Uint32Array(256);
        for (let n = 0; n < 256; n++) {
            c = n;
            for (let k = 0; k < 8; k++) {
                c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            }
            table[n] = c;
        }
        return table;
    })();

    function crc32(buf) {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < buf.length; i++) {
            crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buf[i]) & 0xFF];
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }
 // 使面板支援任意拖曳漂浮（支援 PC 滑鼠與 iPadOS/iOS 觸控，並自動記憶座標）
function makeDraggable(element, handle) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    // 讀取儲存的歷史座標
    const savedLeft = localStorage.getItem('cycu_assistant_left');
    const savedTop = localStorage.getItem('cycu_assistant_top');
    if (savedLeft !== null && savedTop !== null) {
        element.style.left = `${Math.min(window.innerWidth - 60, Math.max(0, parseInt(savedLeft)))}px`;
        element.style.top = `${Math.min(window.innerHeight - 60, Math.max(0, parseInt(savedTop)))}px`;
        element.style.right = 'auto';
        element.style.bottom = 'auto';
    }

    // 設置把手樣式
    handle.style.cursor = 'grab';
    handle.style.userSelect = 'none';
    handle.style.touchAction = 'none'; // 避免 iPadOS 觸發原生手勢滾動

    const onStart = (e) => {
        // 點擊關閉或收折按鈕時不觸發拖曳
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

        isDragging = true;
        handle.style.cursor = 'grabbing';

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rect = element.getBoundingClientRect();
        startX = clientX;
        startY = clientY;
        initialLeft = rect.left;
        initialTop = rect.top;

        element.style.right = 'auto';
        element.style.bottom = 'auto';
        element.style.left = `${initialLeft}px`;
        element.style.top = `${initialTop}px`;

        if (e.cancelable) e.preventDefault();
    };

    const onMove = (e) => {
        if (!isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        let newLeft = initialLeft + deltaX;
        let newTop = initialTop + deltaY;

        // 邊界防出界保護
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

        // 記憶最新擺放位置
        localStorage.setItem('cycu_assistant_left', parseInt(element.style.left, 10));
        localStorage.setItem('cycu_assistant_top', parseInt(element.style.top, 10));
    };

    // 滑鼠事件 (PC)
    handle.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    // 觸控事件 (iPad / Android / iPhone)
    handle.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
}
    // Web Audio API 600% 爆音引擎
    function initAudioBooster(video) {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        if (window.cycuGainNode) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            window.cycuAudioContext = new AudioContext();
            window.cycuSourceNode = window.cycuAudioContext.createMediaElementSource(video);
            window.cycuGainNode = window.cycuAudioContext.createGain();

            window.cycuSourceNode.connect(window.cycuGainNode);
            window.cycuGainNode.connect(window.cycuAudioContext.destination);
            console.log(LOG_PREFIX + 'Web Audio 600% 增益引擎已就緒');
        } catch (e) {
            console.warn(LOG_PREFIX + '音訊引擎初始化失敗：', e);
        }
    }

    // 影片控制助理
    function initVideoAssistant() {
        const video = document.querySelector('video');
        if (!video) return;

        // 避免重複插入面板
        if (document.getElementById('cycu-video-assistant')) return;
        // 取得面板與頂部藍色標題列
const assistantCard = document.querySelector('#cycu-video-assistant') || document.querySelector('.cycu-assistant-card');
const headerBar = assistantCard.querySelector('.cycu-card-header') || assistantCard.firstElementChild;

// 確保面板使用 fixed 定位並套用拖曳
assistantCard.style.position = 'fixed';
makeDraggable(assistantCard, headerBar);
        const panel = document.createElement('div');
        panel.id = 'cycu-video-assistant';
        panel.style.cssText = `
            position: fixed; top: 12px; right: 12px; z-index: 2147483647;
            background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(8px);
            color: #fff; padding: 12px 16px; border-radius: 10px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.35); font-family: sans-serif;
            font-size: 13px; display: flex; align-items: center; gap: 10px;
        `;

        panel.innerHTML = `
            <span style="font-weight:bold;color:#38bdf8;">🎬 播放助手</span>
            <button id="cycu-fs-btn" style="background:#0284c7;color:#fff;border:none;padding:5px 10px;border-radius:6px;cursor:pointer;">⛶ 原生全螢幕</button>
            <div style="display:flex;align-items:center;gap:6px;">
                <span>🔊</span>
                <input type="range" id="cycu-vol-slider" min="0" max="600" value="${Math.round(video.volume * 100)}" style="width:90px;cursor:pointer;">
                <span id="cycu-vol-label" style="min-width:42px;font-family:monospace;">${Math.round(video.volume * 100)}%</span>
                <button id="cycu-max-btn" style="background:#ef4444;color:#fff;border:none;padding:3px 7px;border-radius:4px;font-size:11px;cursor:pointer;font-weight:bold;">MAX</button>
            </div>
        `;

        document.body.appendChild(panel);

        const fsBtn = panel.querySelector('#cycu-fs-btn');
        const slider = panel.querySelector('#cycu-vol-slider');
        const volLabel = panel.querySelector('#cycu-vol-label');
        const maxBtn = panel.querySelector('#cycu-max-btn');

        // 調用 HTML5 Video 原生全螢幕（iOS/iPadOS 完美隱藏網址列）
        fsBtn.addEventListener('click', () => {
            if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            } else if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        });

        function applyVolume(val) {
            val = parseInt(val, 10);
            slider.value = val;
            volLabel.textContent = val + '%';

            if (val > 100) {
                initAudioBooster(video);
                volLabel.style.color = '#ef4444';
                video.volume = 1.0;
                if (window.cycuGainNode) {
                    window.cycuGainNode.gain.value = val / 100;
                }
            } else {
                volLabel.style.color = '#fff';
                if (window.cycuGainNode) {
                    window.cycuGainNode.gain.value = 1.0;
                }
                video.volume = val / 100;
            }
        }

        slider.addEventListener('input', (e) => applyVolume(e.target.value));
        maxBtn.addEventListener('click', () => applyVolume(600));
    }

    // 頁面生命週期初始化
    function init() {
        if (location.href.includes('/mod/supervideo/')) {
            const checkTimer = setInterval(() => {
                if (document.querySelector('video')) {
                    clearInterval(checkTimer);
                    initVideoAssistant();
                }
            }, 600);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
