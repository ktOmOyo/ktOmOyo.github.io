# 個人サイト更新・管理マニュアル

このリポジトリは、GitHub Pagesで公開している個人ポートフォリオサイトのソースコードです。

## 1. ローカル環境でのプレビュー方法（テスト表示）
このサイトはJSでJSONファイルを読み込んでいるため、HTMLファイルをダブルクリックして開くとエラーになります。更新内容を確認する際は、必ず以下の手順でローカルサーバーを立ち上げてください。

**【ターミナル（コマンドプロンプト）を使う場合】**
```bash
# 1. サイトのフォルダ（リポジトリの直下）に移動する
# 2. 以下のコマンドを実行してローカルサーバーを立ち上げる（Python3の場合）
python3 -m http.server 8888

# 3. ブラウザを開き、以下のURLにアクセスする
http://localhost:8888

```

※終了するときは、ターミナルで `Ctrl + C` を押します。

**【VS Codeを使う場合（おすすめ）】**
拡張機能「**Live Server**」をインストールしていれば、エディタ右下の `Go Live` をクリックするだけで自動的にブラウザが開き、変更がリアルタイムで反映されます。

---

## 2. 論文リストの追加・更新 (`publication_list.json`)

全論文データは `publication_list.json` で一元管理しています。新しい業績を追加する場合は、以下のテンプレートをコピーして配列内に追記してください。

```json
    {
        "pickup": false,
        "category": "journal", 
        "title": "ここに論文のタイトル",
        "authors": "Tomoyo Kikuchi, 他の著者名",
        "conference": "省略形や学会名 (例: SIGGRAPH 2026)",
        "detailed_conference": "正式な学会名や巻号など",
        "year": "2026.8",
        "image": "img/new_paper/teaser.png",
        "links": {
            "project page": "projectpages/new_paper.html",
            "paper": "[https://doi.org/](https://doi.org/)...",
            "YouTube": "[https://youtu.be/](https://youtu.be/)..."
        },
        "extra": ["受賞歴などがあれば"],
        "extra_links": ["受賞リンクなどがあれば"]
    }

```

* **pickup**: `true` にするとトップページ（`index.html`）のリストにもピックアップ表示されます。
* **category**: `journal`, `poster`, `demo`, `domestic` のいずれかを指定して分類します。

## 3. プロジェクトページの新規作成 (`projectpages/`)

個別のプロジェクトページは `projectpages/` フォルダ内に作成します。以下をベースに `new_project.html` 等を作成してください。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>プロジェクトの略称</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="container">
        <div class="nav"><a href="../index.html" class="home-link">← Back to Home</a></div>
        <h1 id="title">プロジェクトの正式タイトル</h1>
        <p class="authors" id="authors">Tomoyo Kikuchi, 他の著者名</p>
        <p class="conference" id="conference">学会名 2026</p>
        <div class="buttons"><a href="論文のURL" class="button">Paper</a></div>
        <h2>Abstract</h2>
        <p id="abstract">アブストラクトをここに書く。</p>
    </div>
</body>
</html>

```

## 4. プロフィールの更新 (`index.html`)

学歴 (Education) や職歴 (Experience) が増えた場合は、`index.html` を直接編集します。

* `<div class="edu-entry">` から `</div>` までのブロックをコピーして、該当セクションに追記してください。

## 5. サイトの公開手順（Gitコマンド）

ローカルでのプレビュー確認が終わり、ファイルの保存が完了したら、ターミナルで以下のコマンドを実行してサイトに反映させます。

```bash
# 変更したファイルをすべて記録対象にする
git add .

# 変更内容に分かりやすいメモをつける
git commit -m "Add new paper"

# GitHubへ送信し、数分後にサイトへ自動反映
git push origin main

```


これでローカルでのテスト確認から、本番への公開（push）までの流れが完璧に網羅されました！一番上にプレビューのやり方を置いたので、久しぶりに作業するときでも迷わずスタートできると思います。

