let imageData = [];

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
        img.src=data.assets;
        div.appendChild(label);
        div.appendChild(img);
    });
}

async function setting() {
    await loadData();
    setImg();
}

setting();