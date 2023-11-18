// Función para mostrar el spinner
function mostrarSpinner() {
    const spinnerContainer = document.getElementById('spinner-container');
    spinnerContainer.classList.remove('hidden');
}

// Función para ocultar el spinner
function ocultarSpinner() {
    const spinnerContainer = document.getElementById('spinner-container');
    spinnerContainer.classList.add('hidden');
}