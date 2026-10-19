# SEO、GA4 與 Search Console 設定說明

## GA4

1. 將 `index.html` 的 `data-ga4-id=""` 填入正式 GA4 Measurement ID，例如 `G-XXXXXXXXXX`。
2. 網站會在首頁及每個頁面切換時送出獨立的 `page_view`。
3. 未填入正式 ID 前不會連線或送出測試資料。

## Google Search Console

1. 正式網域確定後，優先使用「網域資源」DNS 驗證。
2. 若使用 HTML 標記驗證，將 Google 提供的 `google-site-verification` meta 放進 `index.html` 的註解位置。
3. 正式上線時，七個頁面應改成可索引的實體網址，例如 `/about/`、`/digital-card/`、`/website/`，不要只使用 `#about` 片段網址。
4. 產生並提交 `sitemap.xml`，同時設定 `robots.txt`。
5. 每頁需有獨立的標題、說明、分享圖片與正確圖片替代文字。

目前是本機視覺草稿，尚未取得正式網域、GA4 ID 與 Search Console 驗證碼，因此只完成安全的程式接口，不宣稱已啟用追蹤或收錄。
