# CLAUDE.md

此文件為 Claude Code (claude.ai/code) 在處理此儲存庫程式碼時提供指導。

## 常用開發指令

### 客戶端 (React/Vite)
- `npm run dev` - 啟動開發伺服器
- `npm run build` - 建置生產版本 (包含 TypeScript 編譯)
- `npm test` - 使用 Vitest 執行測試
- `npm run codegen` - 從 schema 生成 GraphQL 類型

### 函數 (Firebase/GraphQL 後端)
- `npm run dev` - 使用 ts-node 啟動本地開發伺服器
- `npm run start:inspect` - 使用 nodemon 啟動以支援熱重載
- `npm run build` - 將 TypeScript 編譯為 JavaScript
- `npm run prebuild` - 生成 GraphQL 類型 (建置前自動執行)

### Firebase 部署
- `firebase deploy --only functions` - 僅部署後端函數
- `firebase use dllm-library` - 切換至生產專案
- Firebase 模擬器在本地開發期間自動運行

## 架構概覽

### 專案結構
這是一個全端應用程式，採用去中心化、開源架構，專為全球文化遺產保護社群設計。

**核心元件：**
- **客戶端**：React 19 + Vite 前端，使用 Material-UI 元件
- **函數**：具有 Apollo GraphQL 伺服器的 Firebase Functions
- **資料庫**：Firebase Firestore (NoSQL)
- **儲存**：Google Cloud Storage 用於圖片
- **認證**：Firebase Auth

### 關鍵架構模式

**GraphQL 優先開發：**
- Schema 優先方法，以 `schema.graphql` 作為單一事實來源
- 客戶端和伺服器的自動化類型生成
- 客戶端使用 Apollo Client 進行狀態管理和快取
- 伺服器使用具有 Firebase Functions 的 Apollo Server

**Firebase 整合：**
- Functions 處理 GraphQL API、機器人的 SSR 和圖片處理
- Firestore 用於資料持久化，使用 geofire-common 進行地理空間查詢
- Firebase Auth 用於使用者認證，具有自訂聲明
- Google Cloud Storage 用於圖片上傳，具有簽名 URL

**國際化：**
- 內建支援繁體中文 (ZH_HK) 和英文
- 使用 react-i18next，語言檔案位於 `client/src/locales/`
- GraphQL schema 包含用於內容本地化的 Language 列舉

**機器人偵測和 SSR：**
- 混合渲染：使用者使用 CSR，社交媒體機器人使用 SSR
- `functions/src/botDetection.ts` 中的機器人偵測
- SEO 友善的 URL，具有動態 meta 標籤

### 服務層架構

**項目管理：**
- 分類是動態且使用者生成的
- 使用緯度/經度和半徑進行地理搜尋
- 具有縮圖生成的圖片處理管道
- 支援多種項目條件和狀態

**交易系統：**
- 無實體物流的虛擬所有權轉移
- 多狀態交易工作流程 (PENDING → APPROVED → TRANSFERRED → COMPLETED)
- 使用者間通訊在外部處理

**位置服務：**
- Google Maps 整合用於地理編碼
- 用於基於位置的項目發現的地理空間查詢
- 注重隱私的地址處理 (僅郵遞區號層級)

## 開發工作流程

### GraphQL Schema 變更
1. 修改 `graphql/schema.graphql`
2. 在客戶端和函數目錄中執行 codegen
3. 更新 `functions/src/resolver.ts` 中的解析器
4. 相應地更新服務層函數

### 測試策略
- 客戶端使用 Vitest 進行單元測試
- Firebase Functions 可以使用模擬器套件進行測試
- 函數沒有定義特定的測試指令 - 根據需要新增

### 圖片處理
- 使用 nsfwjs 在客戶端進行 NSFW 偵測
- 使用 Sharp 進行伺服器端圖片壓縮
- 自動縮圖生成以提升效能
- 具有簽名 URL 上傳的 Google Cloud Storage 整合

## 重要設定檔案

- `firebase.json` - 定義混合 SSR/CSR 路由的主機重寫
- `client/vite.config.ts` - React 開發的 Vite 設定
- `functions/codegen.ts` 和 `client/codegen.yml` - GraphQL 類型生成
- `client/src/dllm-client-config.json` - 客戶端設定
- `functions/src/dllm-libray-firebase-adminsdk.json` - Firebase 管理員憑證 (不在儲存庫中)

## 安全考量

- Firebase Admin SDK 憑證必須手動放置在函數目錄中
- 大多數變更需要使用者認證
- 基於角色的存取控制 (USER, ADMIN, MODERATOR)
- 使用者帳戶的電子郵件驗證系統
- 僅 HTTPS API 端點

## 關鍵函式庫和依賴

**客戶端：**
- @apollo/client - GraphQL 客戶端和狀態管理
- @mui/material - Material-UI 元件函式庫
- react-leaflet - 地圖整合
- nsfwjs - 客戶端內容過濾
- react-i18next - 國際化

**函數：**
- @apollo/server - GraphQL 伺服器實作
- firebase-admin - Firebase 後端 SDK
- sharp - 圖片處理和壓縮
- geofire-common - 地理空間查詢工具
- @googlemaps/google-maps-services-js - 地理編碼服務
