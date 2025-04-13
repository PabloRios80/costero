function mostrarAutor(id) {
    // Oculta todas las secciones de detalle
    const secciones = document.querySelectorAll('.autor-detalle');
    secciones.forEach(seccion => seccion.style.display = 'none');

    // Muestra la sección de detalle del autor seleccionado
    const seccion = document.getElementById(id);
    seccion.style.display = 'block';
}
// Controlador de audio único
let audioActual = null;
document.querySelectorAll('.boton-play-pause').forEach(boton => {
    const audio = new Audio(boton.dataset.audio);
    let playing = false;
    
    // Elementos del DOM
    const tiempoActual = boton.closest('.audio-controls').querySelector('.actual');
    const tiempoTotal = boton.closest('.audio-controls').querySelector('.total');
    const volumenControl = boton.closest('.audio-controls').querySelector('.volumen');

    // Formatear tiempo
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Cargar metadatos del audio
    audio.addEventListener('loadedmetadata', () => {
        tiempoTotal.textContent = formatTime(audio.duration);
    });

    // Actualizar tiempo de reproducción
    audio.addEventListener('timeupdate', () => {
        tiempoActual.textContent = formatTime(audio.currentTime);
    });

    // Control Play/Pause
    boton.addEventListener('click', () => {
        if(playing) {
            audio.pause();
            boton.textContent = '▶ Reproducir';
        } else {
            audio.play();
            boton.textContent = '⏸ Pausar';
        }
        playing = !playing;
    });

    // Control de volumen
    volumenControl.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    // Pausar al reproducir otro audio
    audio.addEventListener('play', () => {
        document.querySelectorAll('.boton-play-pause').forEach(otherBtn => {
            if(otherBtn !== boton) {
                otherBtn.textContent = '▶ Reproducir';
                otherBtn.closest('.audio-controls').querySelector('audio').pause();
            }
        });
    });
});