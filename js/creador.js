document.getElementById("form-personaje").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtenemos todos los valores del formulario
    const autor = document.getElementById("autor").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const clase = document.getElementById("clase").value;
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const cabello = document.getElementById("cabello").value;
    const piel = document.getElementById("piel").value;
    const ojos = document.getElementById("ojos").value;
    const fuerza = document.getElementById("fuerza").value;
    const inteligencia = document.getElementById("inteligencia").value;
    const agilidad = document.getElementById("agilidad").value;
    
    const mensaje = document.getElementById('mensaje-accesibilidad');

    // Validamos los campos
    if (autor === "") {
        mensaje.textContent = "El nombre del autor no puede estar vacío.";
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }
    if (nombre === "") {
        mensaje.textContent = "El nombre del personaje no puede estar vacío.";
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }
    if (clase === "") {
        mensaje.textContent = "La clase del personaje no puede estar vacía.";
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Creamos el XML
    const xml = `
        <personaje>
            <autor>${autor}</autor>
            <nombre>${nombre}</nombre>
            <genero>${genero}</genero>
            <clase>${clase}</clase>
            <apariencia>
                <cabello>${cabello}</cabello>
                <piel>${piel}</piel>
                <ojos>${ojos}</ojos>
            </apariencia>
            <habilidades>
                <agilidad>${agilidad}</agilidad>
                <fuerza>${fuerza}</fuerza>
                <inteligencia>${inteligencia}</inteligencia>
            </habilidades>
        </personaje>
    `.trim();

    // Descargamos el archivo XML
    const blob = new Blob([xml], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${nombre}-${autor}.xml`;
    link.click();
});