const textoUsuario = document.getElementById("textoUsuario");
const textoResultado = document.querySelector(".texto-resultado");
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const btnCopiar = document.querySelector(".btn-copiar");

const CLAVES_ENCRIPTACION = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const CLAVES_DESENCRIPTACION = {
  "enter": "e",
  "imes": "i",
  "ai": "a",
  "ober": "o",
  "ufat": "u",
};

function encriptarTexto(texto) {
  texto = texto.toLowerCase();
  let textoEncriptado = "";
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i];
    textoEncriptado += CLAVES_ENCRIPTACION[letra] || letra;
  }
  ocultarElementos(); // Ocultar los elementos innecesarios
  mostrarResultado(textoEncriptado); // Mostrar el texto encriptado
  return textoEncriptado;
}

function ocultarElementos() {
  const imagenMuñeco = document.querySelector(".img-muñeco");
  const mensajeNoEncontrado = document.querySelector(".section2 h2");
  const textoInstruccion = document.querySelector(".section2 h3");

  imagenMuñeco.style.display = "none"; // Ocultar la imagen
  mensajeNoEncontrado.style.display = "none"; // Ocultar el mensaje "ningún mensaje fue encontrado"
  textoInstruccion.style.display = "none"; // Ocultar el texto de instrucción
}

function desencriptarTexto(texto) {
  let textoDesencriptado = texto;
  for (let clave in CLAVES_DESENCRIPTACION) {
    const regex = new RegExp(clave, 'g');
    textoDesencriptado = textoDesencriptado.replace(regex, CLAVES_DESENCRIPTACION[clave]);
  }
  return textoDesencriptado;
}

function mostrarResultado(texto) {
  textoResultado.textContent = texto;
}

function copiarTexto() {
  const texto = textoResultado.textContent;
  navigator.clipboard.writeText(texto);
  alert("Texto copiado al portapapeles!");
}

function validarTexto(texto) {
  const regex = /^[a-z ]+$/i; // Permitir letras minúsculas, espacios y letras mayúsculas
  return regex.test(texto);
}

function mostrarError(mensaje) {
  console.error(mensaje);
}

textoUsuario.addEventListener("input", () => {
  const texto = textoUsuario.value;
  if (!validarTexto(texto)) {
    mostrarError("Solo se permiten letras minúsculas, espacios y letras mayúsculas");
  }
});

btnEncriptar.addEventListener("click", () => {
  const texto = textoUsuario.value;
  const textoEncriptado = encriptarTexto(texto);
});

btnDesencriptar.addEventListener("click", () => {
  const texto = textoResultado.textContent; // Se toma el texto encriptado
  const textoDesencriptado = desencriptarTexto(texto);
  mostrarResultado(textoDesencriptado);
  ocultarElementos(); // Llama a la función para ocultar elementos después de desencriptar
});

btnCopiar.addEventListener("click", copiarTexto);
