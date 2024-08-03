// 画像データを格納するための配列
let imageData = [];

// ローカルストレージからブックマークを取得し、配列に変換。データがなければ空配列を使用
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// データを非同期にロードする関数
async function loadData() {
    try {
        // data.jsonファイルをフェッチ
        const response = await fetch('data.json');
        // JSON形式のレスポンスを変換してimageDataに格納
        imageData = await response.json();
    } catch (error) {
        // エラーメッセージをコンソールに表示
        console.error('Error loading click areas:', error);
    }
}

// ブックマークをローカルストレージに保存する関数
function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// ブックマークを追加する関数
function addBookmark(data) {
    // 新しいブックマークを配列に追加
    bookmarks.push(data);
    // ブックマークを保存
    saveBookmarks();
    // ブックマークの表示を更新
    displayBookmarks();
}

// ブックマークを削除する関数
function removeBookmark(data) {
    // 指定されたブックマークを配列から削除
    bookmarks = bookmarks.filter(bookmark => bookmark.GoogleDriveUrl !== data.GoogleDriveUrl);
    // ブックマークを保存
    saveBookmarks();
    // ブックマークの表示を更新
    displayBookmarks();
}

// データがブックマークされているかをチェックする関数
function isBookmarked(data) {
    return bookmarks.some(bookmark => bookmark.GoogleDriveUrl === data.GoogleDriveUrl);
}

// ブックマークボタンを作成する関数
function createBookmarkButton(data) {
    const button = document.createElement("button");
    // ボタンのテキストを設定
    button.innerText = isBookmarked(data) ? "Remove Bookmark" : "Add Bookmark";
    // ボタンのクリックイベントを設定
    button.onclick = () => {
        if (isBookmarked(data)) {
            removeBookmark(data);
        } else {
            addBookmark(data);
        }
        // ボタンのテキストを更新
        button.innerText = isBookmarked(data) ? "Remove Bookmark" : "Add Bookmark";
    };
    return button;
}

// 画像を設定する関数
function setImg() {
    const div = document.getElementById("imgList");
    imageData.forEach(data => {
        // 画像名のラベルを作成
        const label = document.createElement("h1");
        // 画像要素を作成
        const img = document.createElement("img");
        // ブックマークボタンを作成
        const button = createBookmarkButton(data);
        label.innerText = data.imageName;
        // 画像のソースを設定
        img.src = "assets/" + data.filePass;
        // 要素をDOMに追加
        div.appendChild(label);
        div.appendChild(img);
        div.appendChild(button);
    });
}

// ブックマークを表示する関数
function displayBookmarks() {
    const bookmarksDiv = document.getElementById("bookmarks");
    // ブックマークセクションのタイトルを設定
    bookmarksDiv.innerHTML = "<h2>Bookmarked Images</h2>";
    bookmarks.forEach(bookmark => {
        // 画像名のラベルを作成
        const label = document.createElement("h1");
        // 画像要素を作成
        const img = document.createElement("img");
        label.innerText = bookmark.imageName;
        // 画像のソースを設定
        img.src = "assets/" + bookmark.filePass;
        // 要素をDOMに追加
        bookmarksDiv.appendChild(label);
        bookmarksDiv.appendChild(img);
    });
}

// 初期設定関数
async function setting() {
    // データをロード
    await loadData();
    // 画像を設定
    setImg();
    // ブックマークを表示
    displayBookmarks();
}

// 初期設定関数を実行
setting();
