#  中原 cycu iLearning 2.0 頁面addon (CYCU iLearning Enhancer-page-addon)

[![Greasy Fork Version](https://img.shields.io/badge/Greasy%20Fork-v2.1.5-red?logo=greasemonkey&style=flat-square)]((https://greasyfork.org/zh-TW/scripts/597066-%E4%B8%AD%E5%8E%9F-cycu-ilearning-2-0-%E9%A0%81%E9%9D%A2addon))
[![Auto Update](https://img.shields.io/badge/Auto%20Update-Supported-brightgreen?style=flat-square&logo=git)](https://update.greasyfork.org/scripts/597066/%E4%B8%AD%E5%8E%9F%20iLearning%2020%20%E9%A0%81%E9%9D%A2%E9%AB%94%E9%A9%97%E5%A2%9E%E5%BC%B7.meta.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Platform Support](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20iPadOS%20%7C%20iOS%20%7C%20Android-blue?style=flat-square)](#-跨平台安裝指南)
[![CYCU iLearning 2.0](https://img.shields.io/badge/CYCU-iLearning%202.0-0ea5e9?style=flat-square)](https://ilearning.cycu.edu.tw/)

專為**中原大學 (CYCU) iLearning 2.0** 平台打造的全方位體驗優化油猴腳本（UserScript）。告別 Moodle 播放限制、iPadOS 滿版時消不掉的網址列、微弱課堂錄音與繁瑣的逐檔下載作業！

👉 **[立即前往 Greasy Fork 安裝最新版本](https://greasyfork.org/zh-TW/scripts/597066-%E4%B8%AD%E5%8E%9F-cycu-ilearning-2-0-%E9%A0%81%E9%9D%A2addon)**

---

##  核心特色與亮點

### 1. 影音播放全面解鎖
- **自由拖曳懸浮面板**：支援滑鼠左鍵與 iPadOS/iOS 觸控拖曳並自動記憶上一次擺放座標。
- **HTML5 Video 原生全螢幕**：針對 iPadOS Safari 呼叫底層原生播放器，**徹底隱藏上方網址列與分頁標籤**（與 YouTube 原生全螢幕體驗完全一致）。
- **進度條自由快轉 / 倒退**：秒級快轉/倒退（10s / 30s）。
- **Web Audio 600% 爆音引擎**：設有「一鍵 MAX 600%」按鈕，聽清楚老師微弱的麥克風收音。
- **MP4 影片離線直載**：自動解析原廠 MP4 高畫質直鏈，一鍵儲存離線複習。

### 📦 2. 教材打包與智慧選檔
- **全格式教材自訂 ZIP 打包**：支援 PDF 講義、Word/PPT 檔案、資料夾與影片。
- **個別檔案精準勾選視窗**：跨週次即時挑選、支援關鍵字搜尋（例如 `期中`、`ch03`）與類型快速過濾。
- **即時下載進度與 ETA**：動態顯示下載進度百分比、即時下載速度（MB/s / KB/s）與預估剩餘時間（ETA）。

### 🧼 3. 介面淨化與流暢大綱
- **課程大綱漂浮按鈕**：左側隨時可一鍵呼叫與收折課程章節目錄。
- **簡潔介面模式**：一鍵將雜亂的課程模組重組為乾淨俐落的週次/分類摺疊選單。
- **PDF 助理**：提供專注閱讀、深色護眼模式、頁碼跳轉與本機隨堂筆記導出功能。

---

##  跨平台安裝指南

### 第一步：安裝瀏覽器腳本管理器（任選一項）

| 作業系統 / 裝置 | 推薦瀏覽器 | 推薦擴充套件 (腳本管理器) |
| :--- | :--- | :--- |
| **Windows / macOS** | Chrome / Edge / Brave | [Tampermonkey (篡改猴)](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/) |
| **macOS** | Safari | [Userscripts Safari](https://apps.apple.com/app/userscripts/id1463298887) 或 [Stay](https://apps.apple.com/app/stay-for-safari/id1591620924) |
| **iPadOS / iOS** | Safari | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) 或 [Stay 2](https://apps.apple.com/tw/app/stay-for-safari-%E4%BD%BF%E7%94%A8%E8%80%85%E8%85%B3%E6%9C%AC%E8%88%87%E5%BB%A3%E5%91%8A%E6%94%94%E6%88%AA%E6%93%B4%E5%85%85/id1591620171) |
| **iPadOS / iOS** | Orion Browser | 內建支援 Chrome / Firefox 擴充套件，直接安裝 Tampermonkey |
| **Android** | Kiwi Browser / Firefox | [Tampermonkey](https://www.tampermonkey.net/) |

---

###  iOS / iPadOS 極速安裝法（任選一種）

#### 【方式 A：iOS「檔案 (Files)」App 存檔法（推薦，最順手）】
若使用 App Store 免費開源神器 **[Userscripts Safari](https://apps.apple.com/app/userscripts/id1463298887)**：

1. **安裝擴充套件**：從 App Store 安裝 **Userscripts**，並在「設定」>「Safari」>「延伸功能」中啟用它。
2. **下載腳本檔案**：在 Safari 長按或點擊 [👉 下載 ilearning.user.js](https://update.greasyfork.org/scripts/597066/%E4%B8%AD%E5%8E%9F-cycu-ilearning-2-0-%E9%A0%81%E9%9D%A2addon.user.js)，選擇**「儲存到檔案」**。
3. **存入 Userscripts 資料夾**：
   - 打開 iPhone / iPad 內建的 **「檔案 (Files)」App**。
   - 瀏覽位置選擇 **「我的 iPhone / iPad」**（或 iCloud 雲端硬碟）中的 **`Userscripts`** 資料夾。
   - 將剛才下載的檔案儲存進去即可！
4. 打開 [中原大學 iLearning 2.0](https://ilearning.cycu.edu.tw/)，點擊網址列左側的擴充圖示啟用腳本，增強介面立即生效！

---

#### 【方式 B：Safari 一鍵直接安裝（使用 Stay 2 / Orion）】
1. **安裝管理工具**：
   - Safari 使用者：App Store 安裝 **[Stay 2](https://apps.apple.com/tw/app/stay-for-safari-%E4%BD%BF%E7%94%A8%E8%80%85%E8%85%B3%E6%9C%AC%E8%88%87%E5%BB%A3%E5%91%8A%E6%94%94%E6%88%AA%E6%93%B4%E5%85%85/id1591620171)**。
   - 或使用內建擴充功能的 **[Orion Browser](https://kagi.com/orion/)**。
2. **一鍵安裝**：
   - 進入 **[Greasy Fork 腳本頁面](https://greasyfork.org/zh-TW/scripts/597066-%E4%B8%AD%E5%8E%9F-ilearning-2-0-%E9%AB%94%E9%A9%97%E5%A2%9E%E5%BC%B7)**。
   - 點擊綠色 **「安裝此腳本 (Install this script)」** 按鈕。
   - 在跳出的擴充功能提示中點擊 **「確認安裝」** 即可。

---

### 💻 電腦版 (Windows / macOS) 安裝

1. 安裝管理套件：推薦使用 [Tampermonkey (篡改猴)](https://www.tampermonkey.net/) 或 [Violentmonkey (暴力猴)](https://violentmonkey.github.io/)。
2. 前往 **[Greasy Fork 腳本頁面](https://greasyfork.org/zh-TW/scripts/597066-%E4%B8%AD%E5%8E%9F-cycu-ilearning-2-0-%E9%A0%81%E9%9D%A2addon)** 點擊安裝。
3. 重新整理或登入 [中原大學 iLearning 2.0](https://ilearning.cycu.edu.tw/) 即可使用。

---

## 🔄 自動更新機制 (Auto-Update)

### 如何確保 iOS / 平板能自動更新？

1. **Userscripts Safari**：
   - 點擊 Safari 網址列旁的 **Userscripts 圖示**。
   - 進入設定（齒輪圖示），確保 **「Check for updates (檢查更新)」** 為開啟狀態。
   - 擴充套件會在背景定期向 Greasy Fork 確認版本，有新版自動更新。
2. **Stay 2 / Tampermonkey**：
   - 預設會在背景每 24 小時自動比對 `@updateURL`，若有新功能上線會自動下載覆蓋，無需手動重新安裝！

---

## 💡 使用小技巧

### 1. 任意移動影片面板
- **PC 電腦**：以滑鼠左鍵長按頂部藍色標題列 `[🎬 iLearning 影片播放解鎖助理]` 拖動。
- **iPad / 平板**：手指按住頂部標題列空白處即可平滑移動。面板會自動限制在可視範圍內，並自動記住最後停留位置。

### 2. iPadOS Safari 徹底全螢幕
- 在播放影片時，點擊面板上的 **「🔍 原生全螢幕」**。
- 腳本會直接喚醒系統底層的 HTML5 播放器，頂部的 Safari 網址列與分頁標籤將徹底隱藏，享受滿版沈浸體驗。

### 3. 聽不清楚老師聲音？開啟 600% 爆音！
- 平常在 100% 以內使用原生音量。
- 當遇到老師聲音太小、麥克風收音不良時，直接拖動滑桿至 100%~600%，或點擊紅色的 **「MAX」** 按鈕立即啟動！

### 4. 批次下載課程教材
- 進入課程首頁（`/course/view.php`），在頂部工具箱點擊 **「📋 勾選個別檔案」**。
- 可透過搜尋框輸入關鍵字（如 `week03`、`期末`）或篩選類別（PDF、文件、影片），確認後點擊下載即可自動封裝成 ZIP。

---

## ❓ 常見問題與排障 (FAQ)

<details>
<summary><b>Q1. 為什麼我的音量超過 100% 後沒有聲音？</b></summary>
<br>
現代瀏覽器（特別是 Chrome / Edge）具備嚴格的自動播放保護機制（Autoplay Policy）。請在影片開始播放後，用滑鼠點擊一次網頁任一處或先拉動音量滑桿，Web Audio 增益引擎才會被合法喚醒。
</details>

<details>
<summary><b>Q2. 點擊「下載影片」時跳出 YouTube 頁面是正常的嗎？</b></summary>
<br>
是的。部分老師是將影片上傳至 YouTube 並以嵌入方式放在 iLearning 上。因為 YouTube 有專屬版權保護機制，腳本會自動為您開啟 YouTube 原生頁面，方便您進行高畫質瀏覽或透過 YouTube 原生功能觀看。
</details>

<details>
<summary><b>Q3. 勾選影片打包時，iOS 裝置解壓縮可能出現問題？</b></summary>
<br>
iOS Safari 的記憶體機制對超大型檔案（特別是數百 MB 的影片）在前端解壓縮較為嚴格。建議打包下載時取消勾選「超級影片」，改為進入影片播放頁面單獨點擊「📥 下載影片」。
</details>

<details>
<summary><b>Q4. 腳本出現語法錯誤或與其他擴充功能衝突？</b></summary>
<br>
若控制台出現 <code>chext_driver.js</code> 或 <code>Failed to execute 'appendChild'</code> 報錯，通常是第三方 Chrome 擴充功能（例如 Chegg 相關擴充）與網頁 DOM 衝突，請嘗試在無痕模式或暫時停用該擴充功能。
</details>

---

## 📄 開源授權 (License)

本專案採用 [MIT License](LICENSE) 開源授權，歡迎學習交流與改進。

> **免責聲明**：本腳本僅供中原大學師生學術交流與增進線上學習體驗使用，請勿用於任何違反校規或侵犯智慧財產權之用途。


> **免責聲明**：本腳本僅供中原大學師生學術交流與增進線上學習體驗使用，請勿用於任何違反校規或侵犯智慧財產權之用途。
