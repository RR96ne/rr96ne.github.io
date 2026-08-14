# daboa（だぼあ）公式サイト

個人開発ブランド **daboa** のポートフォリオサイトです。
Webアプリ・Androidアプリ・OBS配信用ツール・TradingViewカスタムインジケータなどの制作物を紹介しています。

🔗 公開URL: https://rr96ne.github.io/

## デザインコンセプト

Y2K（2000年代前半）のサイバー／メタリック系デザインをテーマにしています。

- クロームグラデーションのロゴ・見出し
- ネオン（シアン×マゼンタ×パープル）配色
- スキャンライン・遠近グリッド・星空などの背景演出
- Windows風タイトルバーの「HUDウィンドウ」でテキストを表示
- 工事中テープ風の「COMING SOON」プレースホルダー

## 技術構成

ビルドツールなしの素のHTML / CSS / JavaScriptのみで構成しています。GitHub Pagesでそのまま配信できます。

```
.
├── index.html                          # トップページ
├── Android/
│   ├── SpaceVoyage/PrivacyPolicy.html  # SPACE VOYAGE プライバシーポリシー
│   └── PetEsa/PrivacyPolicy.html       # PetEsa プライバシーポリシー（未公開アプリ）
└── assets/
    ├── css/style.css                   # 全ページ共通スタイル（テーマ変数を含む）
    ├── js/main.js                      # 共通スクリプト（テーマ切替・演出など）
    └── img/favicon.svg                 # ファビコン
```

フォントはGoogleFonts（Orbitron / Share Tech Mono / Press Start 2P）をCDN経由で読み込んでいます。

## ダーク／ライトテーマ

トップページ右上の「THEME」トグルから、以下の3モードを切り替えられます。

- **AUTO**: 端末（OS/ブラウザ）の設定に自動追従
- **LIGHT**: 強制的にライトテーマ
- **DARK**: 強制的にダークテーマ

選択内容は`localStorage`（`daboaTheme`）に保存され、トップページ・プライバシーポリシーページなど全ページに引き継がれます。各ページの`<head>`先頭にあるインラインスクリプトが、CSS読み込み前にテーマを適用することで、切り替わり時の色のちらつきを防いでいます。

配色は `assets/css/style.css` の `:root` で定義しているCSS変数（`--bg` `--text` `--chrome-*` `--ink-*` など）をテーマごとに差し替える形で実装しています。ティッカーやナビボタン、バッジなど一部の「機材的なUIパーツ」は、どちらのテーマでも常にダーク基調の固定配色にしてあります。

## サイト更新時に編集する箇所

| 内容 | 場所 |
|---|---|
| サイト全体の最終更新日 | `assets/js/main.js` 内 `LAST_UPDATED = "YYYY-MM-DD"`（1箇所を書き換えるだけで、トップページのお知らせティッカーに自動反映されます） |
| フッターの著作権年号 | 自動計算のため編集不要（`© <script>実行時の年</script> daboa`） |
| 各プライバシーポリシーの最終更新日 | 該当ファイル内の `最終更新日: ...`（ポリシー本文を変更した時のみ更新） |
| 新しい制作物の追加 | `index.html` の該当セクション（`#webapps` `#android` `#obs` `#tradingview`）に `.work-card` を追加 |

## グレーアウトしているリンクボタンの有効化

SPACE VOYAGEの「↓ ダウンロードサイト（改定中）」ボタンは、リンク先が未定のため`<a>`ではなく`<span>`で無効状態にしてあります（`index.html`内）。

```html
<!-- 現在（無効状態） -->
<span class="btn-y2k disabled">↓ ダウンロードサイト（改定中）</span>
```

配信ストアなどのURLが決まったら、`<span class="btn-y2k disabled">`を`<a class="btn-y2k" href="実際のURL">`に置き換え、文言も適宜変更してください。

```html
<!-- 有効化後の例 -->
<a class="btn-y2k" href="https://play.google.com/store/apps/details?id=..." target="_blank" rel="noopener">↓ ダウンロードサイトへ</a>
```

ポイントは以下の3つです。

- タグを`<span>`→`<a>`に変える
- `disabled`クラスを外す（`btn-y2k`クラスだけ残す）
- `href`に実際のURLを指定する（外部サイトの場合は`target="_blank" rel="noopener"`を付けるとタブが分かれて安全です）

## ローカルでの確認方法

ビルド不要の静的サイトなので、任意の静的サーバーで配信すれば確認できます（`file://`で直接開くとレイアウトが崩れる場合があるため、サーバー経由を推奨）。

```bash
npx serve .
```

またはNode.jsが使える環境であれば以下でも構いません。

```bash
npx http-server .
```

## デプロイ

`main`ブランチへのpushでGitHub Pagesに自動反映されます。反映まで数分かかる場合があります。
