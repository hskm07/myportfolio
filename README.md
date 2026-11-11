# Orbitto — Portfolio

Orbittoのシステム開発・技術コンサルティングを紹介する日本語の静的サイトです。Astro・TypeScript・Vanilla CSSで構成しています。

本業での開発チームリード、ローカルLLM基盤構築、AIエージェント開発の担当実績を先に掲載し、副業の業務自動化事例は後半の補足欄にまとめています。会社名・固有案件名・内部構成・実データ・原本の職務経歴書は含めていません。

## ローカルで動かす

Node.js 22.12以上を使用してください。

```sh
npm ci
npm run dev
```

表示されるローカルURLをブラウザで開きます。

```sh
npm run check
npm run build
npm run preview
```

- `check`: Astro・TypeScriptの型チェック
- `build`: 静的サイトを `dist/` に生成
- `preview`: ビルドしたサイトをローカルで確認

`node_modules/`・`dist/`・`.astro/`・`.env` はコミット対象外です。

## サーバーなしで閲覧する

`npm run build` の後、`dist/preview.html` をブラウザで開くと、サーバーなしで閲覧できます。詳細ページも見るには `dist/` フォルダを一式保持してください。

この閲覧用HTMLには、CSS・Libre Baskerville・イラスト・操作用JavaScript・faviconを埋め込んでいます。配信用の `dist/index.html` は変更しません。

## 主な編集箇所

| 内容 | ファイル |
| --- | --- |
| 屋号・説明文・連絡先・受付状態 | `src/config/site.ts` |
| トップの文章・実績の配置・支援内容 | `src/pages/index.astro` |
| 実績の本文とメタデータ | `src/content/projects/*.md` |
| 実績のスキーマ | `src/content.config.ts` |
| 実績の特集枠・一覧 | `src/components/CaseStudy.astro` |
| 実績詳細 | `src/pages/projects/[slug].astro` |
| 配色・余白・レスポンシブ | `src/styles/global.css` |
| フォントの定義 | `src/styles/fonts.css` |
| 技術スタックと経験月数 | `src/config/tech-stack.ts` |
| ロゴ付き技術一覧・カテゴリ絞り込み | `src/components/TechStack.astro` |
| Orbittoのモノグラム | `src/components/BrandMark.astro` |
| Themeisle素材の表示 | `src/components/ThemeisleIcon.astro` |

受付状態 `inquiryStatus` は `open` / `limited` / `paused` を指定できます。`paused` では受付調整中の案内になり、相談先へのボタンが非表示になります。

## 実績を追加する

`src/content/projects/` にMarkdownを作成します。

```yaml
---
title: プロジェクト名
subtitle: 課題や取り組みを表す一文
summary: 確認済みの概要
challenge: 対象となった課題
focus: 設計で重視した点
type: professional-case
context: career
tags: [Python]
role: 自分が担当した範囲
order: 7
label: SYSTEM DEVELOPMENT
workflow: [要件整理, 設計・開発, 検証]
workflowLabels: [DEFINE, BUILD, VERIFY]
workflowCaption: 取り組みの概念図
outcome: 実装した機能や作成した成果物
publishedAt: 2026-11-11
draft: true
anonymized: true
---
```

- `context: career` は本業、`context: freelance` は副業の事例です。
- `draft: true` はトップ・詳細・サイトマップに掲載されません。
- `professional-case` は `context` と `anonymized: true` が必須です。
- `workflowLabels` と `workflowCaption` は省略できます。
- `illustration` は `team` / `server` / `code` を任意で指定できます。

匿名化フラグは公開承諾を証明するものではありません。記載内容は本人提供の職務経歴書・案件整理資料・追加説明に基づき、チーム全体の成果を個人だけの成果として扱わず、未確認の削減率等は掲載していません。一般公開前には、担当範囲・事実関係・契約上の公開範囲を確認してください。

## デザイン・素材

白・チャコール・オリーブを基調にしたエディトリアルデザインです。3列のカード、グラデーション、ネオン、ドット背景、グラスモーフィズム、ドロップシャドウは使用していません。

英数字にはLibre Baskervilleの通常体・斜体（400〜700）を使用します。日本語はNoto Serif JP・ヒラギノ明朝・游明朝等、端末の明朝体にフォールバックします。

フォントはGoogle Fonts公式リポジトリのファイルを改変せず同梱しています。Themeisle / Illu-stationの3素材も元のSVGを保持し、表示用CSSで配色を合わせ、背景の装飾を非表示にしています。素材は実際の業務画面や内部構成を示すものではありません。

- 出典・利用方法: `THIRD_PARTY_NOTICES.txt`
- ライセンス本文: `public/licenses/`
- 取得元とSHA-256: `third-party-assets.json`

通常の閲覧時に、外部フォントサービスや素材サイトへの通信は発生しません。

## GitHub Pagesで公開する場合

このリポジトリへの追加だけでは、公開設定は変更しません。

`.github/workflows/ci.yml` はPull Requestと `main` へのpushで型チェック・ビルドを実行します。`.github/workflows/deploy.yml` は `main` へのpushと手動実行に対応しています。

公開する場合は、GitHubの **Settings → Pages → Source → GitHub Actions** を選択してください。非公開リポジトリでのGitHub Pages利用可否は、アカウントのプランによります。

配信用ワークフローはPagesの `origin` と `base_path` を取得してビルドするため、ルートサイトとプロジェクトサイトに対応します。

手動ビルドの例:

```sh
SITE_URL=https://sonoh5n.github.io BASE_PATH=/myportfolio npm run build
```

既定の `https://orbitto.example` は未公開版のビルド用プレースホルダーです。実際の公開先に合わせて `SITE_URL` と `BASE_PATH` を指定してください。メタ情報、OG画像のURL、サイトマップ、robots.txtもこの設定を参照します。

## 検証

ローカルで型チェック・静的ビルド、ルート配信・サブディレクトリ配信のリンク確認、オフライン版のフォント埋め込み、匿名化表記を確認しています。

実ブラウザでのサイト全体の画面確認・Lighthouse測定は未実施です。Themeisle素材の配色と装飾の非表示は、SVG単体のレンダリングで確認しています。

## 技術スタック一覧

技術とマネジメントスキルの36項目を7カテゴリで表示します。経験年数は本人提供の職務経歴書（2026年7月24日時点）の値を月数で管理し、年・月の表記に変換します。チームリードとGitLab CI/CDは2026年11月11日の本人追記に基づき、それぞれ36か月（3年）を掲載しています。今日まで自動加算せず、FastAPI・UiPath・GitHub Actionsの年数未記載項目は `months: null` として「実務で使用」と表示します。`stackAsOf` は元資料の基準日、`stackUpdatedAt` は一覧の更新日です。

JavaScriptが無効でも全件閲覧できます。有効な場合はカテゴリ絞り込みボタン、表示件数、選択状態を利用できます。各公式配布元とTechIconsのアイコンを使い、31項目にアイコンを表示します。C/C++はCとC++の2点を並べて表示するため、表示画像は計32点です。VBA、IEC 61131-3、llama.cpp、Modbus TCP/IP、チームリードは略称表記にしています。ブランド画像の色・形は変更していません。

TechIcons（https://techicons.dev/）からJavaScript、C、C++、Bash、GitHub ActionsのSVGを取得しています。TechIconsがリンクする `icon.icepanel.io` の配布原本を同梱し、外部への画像リクエストは発生しません。Shell ScriptにはBashのアイコンを代表表示し、経験年数はShell Script全体の値を維持しています。これらのアイコンの元コレクションはDeviconで、MITライセンスを `public/licenses/devicon-LICENSE.txt` に同梱しています。

アイコンの出典・ハッシュは `tech-logo-sources.json` に記録しています。アイコンを追加するときは `src/assets/tech-logos/` に配置し、データの `logo` に拡張子なしのファイル名を指定します。複数を表示する場合は `logos` にファイル名の配列を指定します。通常配信とオフライン版の両方にアイコンが含まれます。

## イラストの配置

本人提供のunDraw SVGの構図を参考に、オリーブとチャコールへ配色を合わせた透過イラストを追加しています。`shared-goals.webp` は開発チームリードの実績詳細の見出し横、`target.webp` はトップページのサービス紹介見出し横、`checking-boxes.webp` は進め方の見出し横に表示します。ほかの実績のイラストは変更していません。

共通コンポーネントは `src/components/PortfolioIllustration.astro`、画像は `src/assets/illustrations/` にあります。画像には寸法を指定し、スマートフォンでは実績のイラストを見出し下、サービスと進め方のイラストをセクションラベル横へ配置します。通常配信・オフライン版ともにサイト内の画像を使用します。

参考SVGはKaterina Limpitsouni / unDrawによるものです。出典と参考・出力画像のハッシュは `third-party-assets.json`、ライセンスの案内は `public/licenses/undraw-illustrations.txt` に記録しています。

## 問い合わせ先とGoogleフォーム案

現在の問い合わせ先は https://forms.gle/6ehS6n6sypzE6wLp7 です。「お問い合わせ」ボタンからGoogleフォームを別タブで開きます。変更する場合は `src/config/site.ts` の `contactFormUrl` を更新します。URLが未設定の場合は受付準備中と表示します。`crowdworksUrl` は既存の公開プロフィールで、問い合わせ欄の補助リンクとフッターから閲覧できます。

フォームのタイトル案は「Orbitto お問い合わせ」。説明は「システム開発・技術相談について、わかる範囲でお聞かせください。仕様が固まっていない段階のご相談も受け付けています。」を想定します。

| 項目 | 形式 | 必須 | 入力案 |
| --- | --- | --- | --- |
| お名前 | 短文 | 必須 | ご担当者のお名前 |
| メールアドレス | 短文・メール形式の検証 | 必須 | 返信先のアドレス |
| 会社名・屋号 | 短文 | 任意 | 個人でのご相談は空欄可 |
| 相談の種類 | チェックボックス | 任意 | システム開発 / 技術コンサル / LLM・AI / 業務自動化 / 既存システム改善 / まだ未定 |
| 現在の課題・実現したいこと | 段落 | 必須 | 現状の困りごと、目指す状態、依頼したい範囲 |
| 希望時期 | 選択式 | 任意 | 1か月以内 / 1〜3か月 / 3か月以降 / 未定・相談したい |
| 予算の目安 | 選択式 | 任意 | 10万円未満 / 10〜30万円 / 30〜50万円 / 50〜100万円 / 100万円以上 / 未定・相談したい |
| 参考URL | 短文 | 任意 | 公開可能なサービス・資料のURL |

必須は3項目に留め、添付ファイルや詳細仕様は初回には求めない構成です。送信後メッセージ案は「お問い合わせありがとうございます。内容を確認のうえ、ご入力いただいたメールアドレスへご連絡します。」です。返信期限は未確定のため掲載しません。
