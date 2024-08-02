let imageData = [];
let bookmarksAudio = JSON.parse(localStorage.getItem('bookmarksAudio')) || [];

async function loadData() {
    try {
        const response = await fetch('audio/data.json');
        imageData = await response.json();
    } catch (error) {
        console.error('Error loading click areas:', error);
    }
}

function savebookmarksAudio() {
    localStorage.setItem('bookmarksAudio', JSON.stringify(bookmarksAudio));
}

function addBookmark(data) {
    bookmarksAudio.push(data);
    savebookmarksAudio();
    displaybookmarksAudio();
}

function removeBookmark(data) {
    bookmarksAudio = bookmarksAudio.filter(bookmark => bookmark.url !== data.url);
    savebookmarksAudio();
    displaybookmarksAudio();
}

function isBookmarked(data) {
    return bookmarksAudio.some(bookmark => bookmark.url === data.url);
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
        const img = document.createElement("audio");
        const button = createBookmarkButton(data);
        label.innerText = data.name;
        img.src = data.assets;
        img.controls = true;
        div.appendChild(label);
        div.appendChild(img);
        div.appendChild(button);
    });
}

function displaybookmarksAudio() {
    const bookmarksAudioDiv = document.getElementById("bookmarksAudio");
    bookmarksAudioDiv.innerHTML = "<h2>Bookmarked Images</h2>";
    bookmarksAudio.forEach(bookmark => {
        const label = document.createElement("h1");
        const img = document.createElement("img");
        label.innerText = bookmark.name;
        img.src = bookmark.assets;
        bookmarksAudioDiv.appendChild(label);
        bookmarksAudioDiv.appendChild(img);
    });
}

async function setting() {
    await loadData();
    setImg();
    displaybookmarksAudio();
}

setting();