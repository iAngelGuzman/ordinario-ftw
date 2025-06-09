// El boton abre el selector de archivos
document.getElementById('archivo-xml').addEventListener('change', obtenerXML);

// Obtengo el id de la tabla
const listaPersonajes = document.getElementById("listaPersonajes");

// Cargo la tabla con los personajes por defecto
function cargarComunidad() {
    cargarTabla('personajes/personajes.xml', true);
}
cargarComunidad();

// Función para obtener el XML
function obtenerXML() {
    const archivo = document.getElementById("archivo-xml").files[0];
    if (!archivo) {
        alert("Por favor, selecciona un archivo XML.");
        return;
    }
    const lector = new FileReader();
    lector.onload = function () {
        const xml = this.result;
        cargarTabla(xml);
    };
    lector.readAsText(archivo); // <-- ¡Esta línea es necesaria!
}

// Función para cargar el archivo
function cargarArchivo() {
    document.getElementById('archivo-xml').click();
}

// Función para rellenar la tabla de personajes
async function cargarTabla(xml, url = false) {
    try {
        let nuevo_xml;
        if (url) {
            const response = await fetch(xml);
            const text = await response.text();
            const parser = new DOMParser();
            nuevo_xml = parser.parseFromString(text, "application/xml");
        } else {
            const parser = new DOMParser();
            nuevo_xml = parser.parseFromString(xml, "application/xml");
        }
        const personajes = nuevo_xml.getElementsByTagName("personaje");
        if (personajes.length === 0) {
            listaPersonajes.innerHTML = "<tr><td colspan='6' class='no-info'>No se encontraron personajes.</td></tr>";
            return;
        }

        let html = "";

        for (let personaje of personajes) {
            const get = (tag) => personaje.getElementsByTagName(tag)[0]?.textContent || "-";
            const autor = get("autor");
            const nombre = get("nombre");
            const clase = get("clase");
            const genero = get("genero");
            // Apariencia
            const cabello = personaje.getElementsByTagName("cabello")[0]?.textContent || "-";
            const piel = personaje.getElementsByTagName("piel")[0]?.textContent || "-";
            const ojos = personaje.getElementsByTagName("ojos")[0]?.textContent || "-";
            const apariencia = `
                <div class="apariencia">
                    <div class="color">
                        <i class="fa-solid fa-person"></i>
                        <span style="background-color: ${cabello};"></span>
                    </div>
                    <div class="color">
                        <i class="fa-solid fa-hand"></i>
                        <span style="background-color: ${piel};"></span>
                    </div>
                    <div class="color">
                        <i class="fa-solid fa-eye"></i>
                        <span style="background-color: ${ojos};"></span>
                    </div>
                </div>
            `;
            // Habilidades
            const agilidad = personaje.getElementsByTagName("agilidad")[0]?.textContent || "-";
            const fuerza = personaje.getElementsByTagName("fuerza")[0]?.textContent || "-";
            const inteligencia = personaje.getElementsByTagName("inteligencia")[0]?.textContent || "-";
            const habilidades = `
                <div class="habilidades">
                    <div class="color">
                        <i class="fa-solid fa-person-running"></i>
                        <span>${agilidad}</span>
                    </div>
                    <div class="color">
                        <i class="fa-solid fa-dumbbell"></i>
                        <span>${fuerza}</span>
                    </div>
                    <div class="color">
                        <i class="fa-solid fa-brain"></i>
                        <span>${inteligencia}</span>
                    </div>
                </div>
            `;

            html += `
            <tr>
                <td>${autor}</td>
                <td>${nombre}</td>
                <td>${clase}</td>
                <td>${genero}</td>
                <td>${apariencia}</td>
                <td>${habilidades}</td>
            </tr>
            `;
        }
        listaPersonajes.innerHTML = html;
    } catch (error) {
        console.error('Error loading XML:', error);
    }
}
