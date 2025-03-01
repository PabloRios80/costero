function mostrarAutor(id) {
    // Oculta todas las secciones de detalle
    const secciones = document.querySelectorAll('.autor-detalle');
    secciones.forEach(seccion => seccion.style.display = 'none');

    // Muestra la sección de detalle del autor seleccionado
    const seccion = document.getElementById(id);
    seccion.style.display = 'block';
}