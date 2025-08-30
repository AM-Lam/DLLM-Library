# GovHack 2025 Toolkit 技術指南

## 🎯 **專案剖析 (Anatomy of a Project)**

### **四個簡單要求**
根據 [GovHack 專案剖析指南](https://govhack.org/handbook/anatomy-of-a-project/)，你的專案必須滿足：

1. **團隊註冊**：在 Hackerspace 上註冊團隊和填寫專案資訊
2. **3分鐘影片**：在競賽結束前提交展示影片
3. **開源代碼**：將專案源代碼和資源在開源軟體許可證下公開
4. **數據引用**：在專案中引用所有使用的數據集

### **重要提醒**
- 評審會專注於專案的**具體成果**
- 讓你的團隊頁面成為展示專案魅力的重要資源
- 包含截圖、影片和任何能展示專案優秀之處的內容

## 🎬 **影片製作指南 (Prepare Your Video)**

### **影片要求**
- **時長**：最多3分鐘
- **內容**：展示你的 hack 在運作中
- **重點**：評審會單獨觀看影片，可能沒有專案背景

### **推薦製作方法**
- **主要方式**：螢幕錄製 + 語音解說
- **解說內容**：你的 hack、為什麼創建、影片中展示什麼
- **鼓勵包含**：團隊名稱、活動地點、團隊成員、使用的數據、數據重用故事

### **製作工具推薦**
- **故事板**：[430個免費故事板插圖](https://dribbble.com/shots/1083617-430-FREE-storyboard-illustrations)
- **螢幕錄製**：OBS、ActivePresenter、QuickTime (Mac)
- **影片編輯**：YouTube Video Editor、VLC、LWKS、iMovie (Mac)、Movie Maker (Windows)

### **音頻製作建議**
- 找安靜的地方錄音
- 腳本可能需要多次錄製來配合影片
- 音樂是加分項，但確保有使用許可

### **提交注意事項**
- 至少提前1小時提交
- 直接在專案頁面添加影片URL
- 必須是影片的實際URL，不是嵌入影片的網站連結

## 🔬 **數據科學工具 (Data Science)**

### **專案管理工具**
- **實體工具**：白板、大紙、便利貼（推薦用於 GovHack 的緊湊時間）
- **數位工具**：Pivotal Tracker、Trello、Matterhorn

### **版本控制**
- **推薦平台**：GitHub、GitLab、Bitbucket
- **桌面應用**：Tortoise、SourceTree
- **整合**：大多數代碼編輯器都支援版本控制

### **代碼編輯器**
- **輕量級**：Visual Studio Code、Atom、Sublime Text、Brackets
- **功能完整**：Eclipse、Visual Studio
- **建議**：不要在 hackathon 期間學習新的快捷鍵

### **資源清單**
- [Awesome Lists](https://github.com/sindresorhus/awesome) - 各種編程語言和平台的工具清單

## 📊 **數據可視化 (Data Visualisation)**

### **理論基礎**
- **色彩使用**：Paul Tol 的優秀色彩方案建議
- **設計指南**：School of Data 的 Gregor Aisch 指南
- **學術資源**：Stanford CS448B 視覺化課程
- **數據敘事**：Juice Analytics 的數據敘事資源集合

### **靈感來源**
- Sunlight Foundation Tumblr
- Design Your Way 的 23 個資訊圖表
- Information is Beautiful、infosthetics、Visual Complexity
- Avinash Kaushik 的數據可視化靈感文章

### **Web 可視化工具**
- **D3.js**：互動式詳細可視化（學習曲線陡峭但功能強大）
- **其他庫**：Highcharts、Google Charts、jit、three.js、polychart.js、PhiloGL、Flotr2

### **可視化即服務**
- **快速原型**：plot.ly、Datawrapper、infogr.am
- **無需編碼**：快速創建圖表

### **桌面工具**
- **商業軟體**：Tableau（推薦）
- **學習資源**：School of Data 的 Tableau Public 教程

### **Android 圖表庫**
- Androidplot、ChartDroid、achartengine

## 🗺️ **地理數據 (Geographic Data)**

### **地理數據格式**
- **GeoJSON**：Web 開發的標準格式
- **Shapefile**：傳統 GIS 格式
- **KML/KMZ**：Google Earth 格式
- **TopoJSON**：編碼拓撲的 GeoJSON（可減少 80% 大小）

### **地圖創建工具**
- **Shape2Earth**：輕鬆創建 Google Earth 地圖

## 🕸️ **圖數據庫 (Graph Databases)**

### **圖數據庫概念**
- 專門設計用於存儲和查詢圖形結構數據
- 適用於複雜關係分析
- 在 GovHack 中可用於：
  - 社區網絡分析
  - 服務關係映射
  - 數據連接模式識別

## 🛠️ **技術棧建議**

### **前端開發**
- **框架**：React、Vue.js、Angular
- **可視化**：D3.js、Chart.js、Leaflet (地圖)
- **UI 庫**：Material-UI、Ant Design、Bootstrap

### **後端開發**
- **API 框架**：Node.js/Express、Python/Flask、Python/Django
- **數據庫**：PostgreSQL、MongoDB、Neo4j (圖數據庫)
- **部署**：Heroku、Vercel、Netlify

### **數據處理**
- **Python**：pandas、numpy、scikit-learn
- **R**：統計分析和建模
- **SQL**：數據查詢和聚合

## 📋 **專案開發檢查清單**

### **準備階段**
- [ ] 團隊註冊和專案創建
- [ ] 數據集選擇和許可確認
- [ ] 技術棧確定
- [ ] 專案時程規劃

### **開發階段**
- [ ] 版本控制設置
- [ ] 數據處理和清洗
- [ ] 核心功能實現
- [ ] 用戶界面開發
- [ ] 數據可視化實現

### **完成階段**
- [ ] 功能測試
- [ ] 文檔撰寫
- [ ] 影片製作
- [ ] 代碼開源
- [ ] 最終提交

## 💡 **成功秘訣**

1. **專注核心功能**：在有限時間內完成最重要的功能
2. **數據驅動**：充分利用政府開放數據
3. **用戶體驗**：確保解決方案易於使用
4. **創新角度**：從獨特角度解決問題
5. **完整展示**：準備好展示你的專案如何運作

---

*資料來源：GovHack 官方 Handbook*
*適用於：GovHack 2025 參賽者*
*最後更新：2025年 GovHack 競賽期間*
