let imageData = [];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        imageData = await response.json();
    } catch (error) {
        console.error('Error loading click areas:', error);
    }
}

function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function addBookmark(data) {
    bookmarks.push(data);
    saveBookmarks();
    displayBookmarks();
}

function removeBookmark(data) {
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== data.url);
    saveBookmarks();
    displayBookmarks();
}

function isBookmarked(data) {
    return bookmarks.some(bookmark => bookmark.url === data.url);
}

function createBookmarkButton(data) {
    const button = document.createElement("button");
    button.innerText = isBookmarked(data) ? "Remove Bookmark" : "Add Bookmark";
    button.onclick = () => {
        if (isBookmarked(data)) {
            removeBookmark(data);
        } else {
            addBookmark(data);
        }
        button.innerText = isBookmarked(data) ? "Remove Bookmark" : "Add Bookmark";
    };
    return button;
}

function setImg() {
    const div = document.getElementById("imgList");
    imageData.forEach(data => {
        const label = document.createElement("h1");
        const img = document.createElement("img");
        const button = createBookmarkButton(data);
        label.innerText = data.name;
        img.src = "assets/" + data.filePass;
        div.appendChild(label);
        div.appendChild(img);
        div.appendChild(button);
    });
}

function displayBookmarks() {
    const bookmarksDiv = document.getElementById("bookmarks");
    bookmarksDiv.innerHTML = "<h2>Bookmarked Images</h2>";
    bookmarks.forEach(bookmark => {
        const label = document.createElement("h1");
        const img = document.createElement("img");
        label.innerText = bookmark.name;
        img.src = bookmark.assets;
        bookmarksDiv.appendChild(label);
        bookmarksDiv.appendChild(img);
    });
}

async function setting() {
    await loadData();
    setImg();
    displayBookmarks();
}

setting();