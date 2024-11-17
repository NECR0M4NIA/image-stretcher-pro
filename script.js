// Récupérer les éléments
const fileInput = document.getElementById("fileInput");
const uploadedImage = document.getElementById("uploadedImage");
const widthSlider = document.getElementById("widthSlider");
const heightSlider = document.getElementById("heightSlider");
const downloadBtn = document.getElementById("downloadBtn");

// Charger une image
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.style.width = widthSlider.value + "px";
            uploadedImage.style.height = heightSlider.value + "px";
        };
        reader.readAsDataURL(file);
    }
});

// Ajuster la largeur
widthSlider.addEventListener("input", () => {
    uploadedImage.style.width = widthSlider.value + "px";
});

// Ajuster la hauteur
heightSlider.addEventListener("input", () => {
    uploadedImage.style.height = heightSlider.value + "px";
});

// Télécharger l'image redimensionnée
downloadBtn.addEventListener("click", () => {
    if (!uploadedImage.src) {
        alert("Veuillez d'abord charger une image !");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Définir la taille du canvas sur celle de l'image redimensionnée
    canvas.width = parseInt(uploadedImage.style.width);
    canvas.height = parseInt(uploadedImage.style.height);

    // Dessiner l'image sur le canvas
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // Créer un lien pour le téléchargement
    const link = document.createElement("a");
    link.download = "resized-image.png";
    link.href = canvas.toDataURL();
    link.click();
});
