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

## 画面構成（index.html）

`index.html`は上から順に以下のブロックで構成されています。新規にセクションを追加する際は、既存のブロックをコピーして作るのが最も確実です。

| ブロック | 概要 |
|---|---|
| `#loader` | 初回訪問時のみ表示するローディング演出（`sessionStorage`で2回目以降はスキップ） |
| `.bg-grid` / `.bg-stars` / `.scanlines` / `.vignette` | 背景演出用の固定レイヤー（`position:fixed`、コンテンツの後ろ） |
| `.ticker` | 上部のお知らせティッカー。`.ticker-track`の中身をJSが複製してシームレスループさせている |
| `header.hero`（`id="top"`） | ロゴSVG・キャッチコピー・テーマ切替UI・バッジ・メインナビ（`nav.nav`）。各セクション末尾の「MENUへ戻る」リンクの戻り先 |
| `main` 内の `<section>` | 本文。番号付きの見出し（`[ 01 ]`など）を持つセクション群。下表参照 |
| `footer#contact` | アクセスカウンター（演出用）・連絡先・バッジ・著作権表示 |
| `.to-top` | 右下固定の「ページ最上部へ戻る」ボタン（一定量スクロールすると表示） |

### セクション一覧（`id` / 見出し番号 / ナビ表示）

| `id` | 見出し番号 | ナビ表示 | 内容 |
|---|---|---|---|
| `#about` | `[ 01 ]` | ABOUT | daboaブランドの紹介（`.hud-window`×2枚） |
| `#links` | `[ 02 ]` | LINKS | 作者の他活動へのリンク（Twitch/YouTube/X/GitHub、`.link-chip`） |
| `#webapps` | `[ 03 ]` | WEB APPS | Webアプリの作品カード（`.work-card`） |
| `#android` | `[ 04 ]` | ANDROID | Androidアプリの作品カード |
| `#obs` | `[ 05 ]` | OBS TOOLS | OBSツール（`.soon-card`のCOMING SOONプレースホルダー） |
| `#tradingview` | `[ 06 ]` | TRADINGVIEW | TradingViewインジケータ（同上） |

セクションを追加・削除した場合は、以降のセクションの番号（`[ NN ]`）とナビのリンク先がずれるので、全セクション分を目視で確認してください。

各セクションの末尾には `.section-back` でくるんだ `<a class="back-link" href="#top">▲ MENUへ戻る</a>` を置き、そのセクションを読み終えたらすぐ`header.hero`（ナビ）まで戻れるようにしています。新しいセクションを追加する際もこれを踏襲してください。

### プライバシーポリシーページ（`Android/*/PrivacyPolicy.html`）

`index.html`とは別ファイルですが、同じ`assets/css/style.css` / `assets/js/main.js`を読み込み、同じデザイン言語で構成しています（サブディレクトリなので参照パスは`../../assets/...`）。

- 先頭に `.back-link`（「← daboa TOPへ戻る」）
- その下に `.app-banner`（アイコン＋アプリ名を大きく表示。どのアプリのポリシーか一目でわかるようにするための帯）
- `.section-head`（`[ LEGAL ]` PRIVACY POLICY）
- `.hud-window` の中に `.legal-body`（`h1`＝アプリ名＋プライバシーポリシー、`h2`＝各条項、`p`/`ul`＝本文）
- `footer`と`.to-top`は`index.html`と共通のパターン

新しいアプリのプライバシーポリシーを追加する場合は、既存の`Android/SpaceVoyage/PrivacyPolicy.html`を丸ごとコピーし、`.app-banner`のアイコン・アプリ名、`<title>`、`.win-title`のファイル名、本文を差し替えるのが早道です。

### 主なUIコンポーネント（`assets/css/style.css`）

| クラス | 用途 |
|---|---|
| `.hud-window` + `.win-titlebar` + `.win-body` | Windows風タイトルバー付きウィンドウ。ABOUTセクションやプライバシーポリシー本文で使用 |
| `.card-grid` + `.work-card` | 作品カードのグリッド。右上/左下の角を`clip-path`で斜めにカットし、ネオンのアクセント線（`::before`/`::after`）を重ねている（意図的なデザインで、崩れではない） |
| `.links-grid` + `.link-chip` | LINKSセクション専用の、できるだけ小さくまとめたクリッカブルなチップ（アイコン＋名前＋ハンドルネームのみ、カード全体が`<a>`） |
| `.soon-card` + `.tape` | 「COMING SOON」の工事中テーププレースホルダー |
| `.badge` | 小さいラベルチップ（NEW・SINCEなど）。背景は常時ダーク固定 |
| `.btn-y2k` | メインのボタン（塗り）。文字色は常に`var(--on-accent)`固定（後述） |
| `.section-head` / `.section-title` | 「`[ NN ]` 見出し」パターン。番号と見出しは`.section-title`で1ユニットにまとめてあり、画面が狭くても両者が別の行に分離しないようになっている |
| `.back-link` / `.section-back` | 「戻る」系のリンク。プライバシーポリシー先頭の「daboa TOPへ戻る」と、各セクション末尾の「MENUへ戻る」の両方で共用 |

## ダーク／ライトテーマ

トップページ右上の「THEME」トグルから、以下の3モードを切り替えられます。

- **AUTO**: 端末（OS/ブラウザ）の設定に自動追従
- **LIGHT**: 強制的にライトテーマ
- **DARK**: 強制的にダークテーマ

選択内容は`localStorage`（`daboaTheme`）に保存され、トップページ・プライバシーポリシーページなど全ページに引き継がれます。各ページの`<head>`先頭にあるインラインスクリプトが、CSS読み込み前にテーマを適用することで、切り替わり時の色のちらつきを防いでいます。

配色は `assets/css/style.css` の `:root` で定義しているCSS変数を、`@media (prefers-color-scheme: light)` と `:root[data-theme="light"]` / `:root[data-theme="dark"]` の3箇所で差し替える形で実装しています（`:root[data-theme="dark"]`はシステムがライトでも強制ダークが勝つよう、値を再度明示的に上書きしています）。

CSS変数は役割によって2系統に分かれています。**新規にスタイルを書くときは必ずこの区別を意識してください。**

- **サーフェス系（テーマで自動反転する）**: `--bg` `--bg-deep` `--panel` `--panel-solid` `--text` `--text-dim` `--chrome-1〜4` `--ink-cyan` `--ink-pink` `--ink-purple` `--ink-lime` など。ページ地・パネル・本文テキストなど「大きな面」に使う。生の`--cyan` `--pink` `--purple` `--lime`をテキスト色として直接使うと、ライトテーマで薄すぎて読めなくなるため、地の上に乗るテキストや装飾線には必ず`--ink-*`を使うこと
- **チップ系（常に固定・テーマ非依存）**: ティッカー、`.badge`、`.nav a`の既定色、`.counter-widget`、ローダーなど。背景が常にダーク固定の「筐体パーツ」で、`--chrome-1`のようなサーフェス系変数を使うとライトテーマで文字色が反転して読めなくなるバグになるため、意図的に固定の16進値を直書きしている
- **`--on-accent`**: `--cyan`→`--blue`などの明るい塗りボタン（`.btn-y2k`、テーマ切替の選択中タブなど）の上に乗せる文字色。常に暗色固定（ボタンの塗りは常に明るい色なので、文字はどちらのテーマでも暗色で良い）

## サイト更新時に編集する箇所

| 内容 | 場所 |
|---|---|
| サイト全体の最終更新日 | `assets/js/main.js` 内 `LAST_UPDATED = "YYYY-MM-DD"`（1箇所を書き換えるだけで、トップページのお知らせティッカーに自動反映されます） |
| フッターの著作権年号 | 自動計算のため編集不要（`© <script>実行時の年</script> daboa`） |
| 各プライバシーポリシーの最終更新日 | 該当ファイル内の `最終更新日: ...`（ポリシー本文を変更した時のみ更新） |
| 新しい制作物の追加 | `index.html` の該当セクション（`#webapps` `#android` `#obs` `#tradingview`）に `.work-card` を追加 |
| 作者の他活動リンクの追加・変更 | `index.html` の `#links` セクション内 `.link-chip` を編集・追加 |

### 新しいセクションを追加する手順

1. `header.hero`内の`<nav class="nav">`に`<a href="#new-id">見出し</a>`を追加
2. `<main>`内に`<section id="new-id">`を追加し、既存セクションの`.section-head`（`.section-title` > `.num` + `h2`、`.section-line`）をコピーして中身を書き換える
3. 追加した位置より後ろにあるセクションの見出し番号（`[ NN ]`）を1つずつ繰り下げる（上の「セクション一覧」表も更新する）
4. コンテンツは`.work-card`（作品紹介）・`.soon-card`（未公開）・`.hud-window`（テキスト主体）・`.link-chip`（外部リンク集）のいずれかのパターンを流用する
5. セクション末尾に `<div class="section-back"><a class="back-link" href="#top">▲ MENUへ戻る</a></div>` を追加する
6. SVGアイコンを使う場合、`<linearGradient id="...">`のidはページ内で一意にする（重複するとブラウザによっては意図しない方のグラデーションが適用される）

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
