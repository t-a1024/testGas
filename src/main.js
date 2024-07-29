let imageData = [];
function createImg(url) {
    const urlData = url.split("/");
    const returndata = "https://lh3.googleusercontent.com/d/"+urlData[5];
    return returndata;
}
async function loadData() {
    try {
        const response = await fetch('data.json');
        imageData = await response.json();
    } catch (error) {
        console.error('Error loading click areas:', error);
    }
}

function setImg() {
    const div = document.getElementById("app");
    imageData.forEach( data => {
        const label = document.createElement("h1");
        const img = document.createElement("img");
        label.innerText=data.name;
        img.src=createImg(data.url);
        div.appendChild(label);
        div.appendChild(img);
    });
}

async function setting() {
    await loadData();
    setImg();
}

setting();