import './assets/styles/index.css';

const imageFileInput = document.querySelector("#image-file");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#top-text");
const bottomTextInput = document.querySelector("#bottom-text"); 
let image;

function updateMemeCanvas(canvas, image, topText, bottomText) {
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;
  
    // обновляем фон картинки
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);
  
    // подготавливаем текст
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;
  
    // добавляем текст вверху
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);
  
    // добавляем текст внизу
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}

imageFileInput.addEventListener("change", (e) => {
    const imageDataUrl = URL.createObjectURL(e.target.files[0]);
    console.log(imageDataUrl);
  
    image = new Image();
    image.src = imageDataUrl;
  
    image.addEventListener(
      "load",
      () => {
        updateMemeCanvas(
          canvas,
          image,
          topTextInput.value,
          bottomTextInput.value
        );
      },
      { once: true }
    );
});

topTextInput.addEventListener("keyup", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});
  
bottomTextInput.addEventListener("keyup", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

document.getElementById("download").onclick = function () {
    var img = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "My Meme";
    link.href = img;
    link.click();
};