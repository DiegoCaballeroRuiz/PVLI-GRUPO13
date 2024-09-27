const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

// Reproducir el primer audio al cargar la página
window.onload () => {
    audio1.play();
};

// Cuando el primer audio termina, reproducir el segundo
audio1.onended () => {
    audio2.play();
};

audio2.onended () => {
    audio2.play();
}