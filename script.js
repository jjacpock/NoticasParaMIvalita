// CREAR ESTRELLAS
function crearEstrellas() {
  // Limpiar estrellas existentes
  document.querySelectorAll('.star').forEach(star => star.remove());
  
  const numEstrellas = 100;
  
  for (let i = 0; i < numEstrellas; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const tamaño = Math.random() * 2 + 1; // Entre 1 y 3px
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const delay = Math.random() * 3; // Delay aleatorio
    const duration = Math.random() * 3 + 2; // 2-5 segundos
    
    star.style.width = tamaño + 'px';
    star.style.height = tamaño + 'px';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.animation = `twinkle ${duration}s infinite`;
    star.style.animationDelay = delay + 's';
    
    document.body.appendChild(star);
  }
}

// ACTUALIZAR SOL SEGÚN LA HORA
function actualizarSol() {
  const ahora = new Date();
  const hora = ahora.getHours();
  const minuto = ahora.getMinutes();
  const tiempoTotal = hora + (minuto / 60);
  
  const sun = document.getElementById('sun');
  
  // De 5 AM a 12 PM: Sol crece y se vuelve más brillante
  if (tiempoTotal >= 5 && tiempoTotal < 12) {
    const inicio = 5;
    const fin = 12;
    const progreso = (tiempoTotal - inicio) / (fin - inicio);
    
    const tamaño = 60 + (progreso * 140);
    const brillo = 0.3 + (progreso * 0.7);
    const glow = 20 + (progreso * 50);
    
    sun.style.width = tamaño + 'px';
    sun.style.height = tamaño + 'px';
    sun.style.opacity = brillo;
    sun.style.boxShadow = `0 0 ${glow}px rgba(255, 165, 0, ${brillo})`;
  }
  // De 12 PM a 4 PM: Sol en su máximo esplendor
  else if (tiempoTotal >= 12 && tiempoTotal < 16) {
    sun.style.width = '200px';
    sun.style.height = '200px';
    sun.style.opacity = 1;
    sun.style.boxShadow = '0 0 70px rgba(255, 165, 0, 1)';
  }
  // De 4 PM a 5 PM: Sol se va opacando para el atardecer
  else if (tiempoTotal >= 16 && tiempoTotal < 17) {
    const inicio = 16;
    const fin = 17;
    const progreso = (tiempoTotal - inicio) / (fin - inicio);
    
    // El sol se va opacando (de 1 a 0.2)
    const brillo = 1 - (progreso * 0.8);
    const glow = 70 - (progreso * 50);
    
    sun.style.width = '200px';
    sun.style.height = '200px';
    sun.style.opacity = brillo;
    sun.style.boxShadow = `0 0 ${glow}px rgba(255, 165, 0, ${brillo})`;
  }
}

// ACTUALIZAR LUNA SEGÚN LA HORA
function actualizarLuna() {
  const ahora = new Date();
  const hora = ahora.getHours();
  const minuto = ahora.getMinutes();
  const tiempoTotal = hora + (minuto / 60);
  
  const moon = document.getElementById('moon');
  
  // De 5 PM a 5 AM: La luna está visible
  if (tiempoTotal >= 17 || tiempoTotal < 5) {
    // De 5 PM (17) a 12 AM (0=24): Luna crece
    if (tiempoTotal >= 17) {
      const inicio = 17;
      const fin = 24; // Hasta medianoche
      const progreso = (tiempoTotal - inicio) / (fin - inicio);
      
      const tamaño = 80 + (progreso * 120);
      const brillo = 0.3 + (progreso * 0.7);
      const glow = 30 + (progreso * 40);
      
      moon.style.width = tamaño + 'px';
      moon.style.height = tamaño + 'px';
      moon.style.opacity = brillo;
      moon.style.boxShadow = `0 0 ${glow}px rgba(255, 255, 255, ${brillo})`;
    }
    // De 12 AM (0) a 5 AM: Luna decrece lentamente
    else if (tiempoTotal < 5) {
      const inicio = 0;
      const fin = 5;
      const progreso = (tiempoTotal - inicio) / (fin - inicio);
      
      // De máximo (100% brillo) a decreciente
      const brillo = 1 - (progreso * 0.5);
      const tamaño = 200 - (progreso * 100);
      const glow = 70 - (progreso * 40);
      
      moon.style.width = tamaño + 'px';
      moon.style.height = tamaño + 'px';
      moon.style.opacity = brillo;
      moon.style.boxShadow = `0 0 ${glow}px rgba(255, 255, 255, ${brillo})`;
    }
  }
}

// ACTUALIZAR FONDO SEGÚN LA HORA
function actualizarFondo() {
  const ahora = new Date();
  const hora = ahora.getHours();
  const minuto = ahora.getMinutes();
  const tiempoTotal = hora + (minuto / 60);
  
  // Siempre actualizar sol y luna según la hora real
  if (tiempoTotal >= 5 && tiempoTotal < 17) {
    actualizarSol();
  } else if (tiempoTotal >= 17 || tiempoTotal < 5) {
    actualizarLuna();
  }
  
  // Determinar la clase del fondo según la hora
  let claseBackground = 'night';
  if (tiempoTotal >= 5 && tiempoTotal < 12) {
    claseBackground = 'morning';
  } else if (tiempoTotal >= 12 && tiempoTotal < 16) {
    claseBackground = 'sunny';
  } else if (tiempoTotal >= 16 && tiempoTotal < 17) {
    claseBackground = 'sunset';
  }
  
  // Si hay modo manual noche, cambiar a noche
  if (modoManual === 'night') {
    claseBackground = 'night';
  }
  // Si modo manual es día, mantener la clase calculada por hora (no forzar a sunny)
  // Así se ve exactamente como cuando es automático
  
  // Aplicar la clase de fondo
  document.body.classList.remove('morning', 'sunny', 'sunset', 'night');
  document.body.classList.add(claseBackground);
  
  // Crear o limpiar estrellas según la clase del fondo
  if (claseBackground === 'night') {
    crearEstrellas();
  } else {
    document.querySelectorAll('.star').forEach(star => star.remove());
  }
  
  // Actualizar botón según si es día o noche
  let esDia = (tiempoTotal >= 5 && tiempoTotal < 17);
  if (modoManual === 'night') {
    esDia = false;
  }
  actualizarBotoModo(esDia);
}

// ACTUALIZAR BOTÓN MODO
function actualizarBotoModo(esDia) {
  const btn = document.getElementById('btnModo');
  if (esDia) {
    btn.textContent = '🌙 Cambiar a modo noche';
  } else {
    btn.textContent = '☀️ Cambiar a modo día';
  }
}

// ALTERNAR MODO DÍA/NOCHE
function alternarModo() {
  if (modoManual === null) {
    // Si es automático, detectar que es (día o noche) y cambiar al opuesto
    const ahora = new Date();
    const hora = ahora.getHours();
    const minuto = ahora.getMinutes();
    const tiempoTotal = hora + (minuto / 60);
    const esDia = (tiempoTotal >= 5 && tiempoTotal < 17);
    modoManual = esDia ? 'night' : 'day';
  } else if (modoManual === 'day') {
    modoManual = 'night';
  } else {
    modoManual = 'day';
  }
  actualizarFondo();
}

// Actualizar fondo cuando carga la página
window.addEventListener('DOMContentLoaded', function() {
  actualizarFondo();
  mostrarPreguntaDiaria();
  // Actualizar cada minuto solo si es modo automático
  setInterval(() => {
    if (modoManual === null) {
      actualizarFondo();
    }
  }, 60000);
});

// MODO DÍA/NOCHE MANUAL
let modoManual = null; // null = automático, 'day' = forzar día, 'night' = forzar noche

// DATOS
const mensajes = {
  feliz: [
    "Tu felicidad ilumina mi día... ¡TE AMUUUUUU!",
    "Ver tu sonrisa es mi mejor regalo 💖",
    "Contagiame de tu felicidadddddddd amorcito!!!",
    "Tu felicidad es mi alegria... ¡TE ADORO con toda mi almaaa!",
    "Eres mi razón para sonreír cada día 😊",
    "Tu felicidad hace que todo valga la pena 💕",
    "Me encanta verte así de feliz 🌟",
    "Que esa sonrisa tuya nunca desaparezca Te adoro😍",
    "Tu risa es mi melodía favorita 🎵",
    "Verte feliz me hace el hombre más afortunado 🥰",
    "Tu alegría ilumina todo a tu alrededor ✨",
    "Mereces ser feliz SIEMPRE 💖",
    "Tu felicidad es mi mayor tesoro 💎",
    "Tu positividad me inspira diariamente 🌈",
    "Eres mi fuente de alegría infinita 💫",
    "Tu felicidad me motiva a ser mejor 💪"
  ],
  triste: [
    "Recuerda siempre que puedes contar conmigo para lo que necesites mi vida, " +
    "hablame, cuentame, sabre escucharte y siempre sere paciente para ti, no te guardes "+
    "lo que te haga sentir mal, siempre puedes hablar conmigo, no importa la hora, "+
    "el momento ni el lugar, SIEMPRE ESTARE PARA TI... ¡TE AMUUUUUUUUUUUUUUUUU INFINITAMENTE!"
  ],
  enojada: [
    "Tu enojo es comprensible, estoy aquí para ti 😠",
    "Respeto tu sentimiento, no estás sola 💪",
    "Entiendo tu molestia y estoy a tu lado 🤝",
    "Tu rabia es válida, descárgala conmigo 🔥",
    "No importa si estás enojada, te amo igual ❤️",
    "Juntos vamos a superar lo que te molesta 💯",
    "Estoy aquí para calmar tu tormenta 🌪️",
    "Tu ira no me asusta, confío en ti 💙",
    "Veremos las cosas mejor mañana juntos 🌟",
    "Te apoyo incluso en mis momentos difíciles 🫶",
    "Tu enojo es una señal de que te importan las cosas 💯",
    "Estoy aquí para escuchar y entender tu frustración 👂",
    "No hay problema que no podamos resolver juntos 🤝",
    "Tu pasión me inspira, incluso cuando estás enojada 🔥",
    "Te amo lo suficiente para enfrentar tu ira con calma 🧘",
    "Vamos a hablar de lo que te molesta y solucionarlo 💬",
    "Tu fuerza cuando estás enojada me hace admirarte más 💪",
    "Estoy aquí para ser tu ancla en la tormenta ⚓",
    "Tu enojo no cambia mi amor por ti ❤️",
    "Juntos encontraremos paz después de la tormenta ☮️"
  ],
  desmotivada: [
    "No te rindas, eres más fuerte de lo que crees 💪",
    "Tu potencial es infinito, sigue adelante 🚀",
    "Cada intento te acerca a tu meta 🎯",
    "Yo creo en ti, aunque dudes de ti mismo 🫶",
    "Los días grises pasan, vienen días brillantes ☀️",
    "Eres capaz de lograr lo que te propongas 💯",
    "No estás solo en esto, conta conmigo ❤️",
    "Tu esfuerzo vale la pena, no lo olvides 💎",
    "Levántate y sigue, eres imparable 🔥",
    "La motivación regresa, solo espera un poco 🌈",
    "Cada pequeño paso cuenta, sigue caminando 🚶",
    "Tu talento es único, no lo subestimes ✨",
    "Los obstáculos son temporales, tu fuerza es eterna 💪",
    "Estoy orgulloso de cada esfuerzo que haces 🏆",
    "Tu perseverancia me inspira diariamente 🌟",
    "No importa cuántas veces caigas, siempre te levantas 💪",
    "Tu sueño vale la pena luchar por él 🎯",
    "Cada día es una nueva oportunidad para brillar ☀️",
    "Tu determinación me hace creer en lo imposible ✨",
    "Sigue adelante, el éxito te está esperando 🏁"
  ],
  cupones: [
  //"🎟️ Paseo juntos al atardecer 🌅",
  //"🎟️ Una tarde de juegos de mesa 🎲",
  //"🎟️ Playlist personalizada solo para ti 🎧",
  //"🎟️ Café preparado y servido con cariño ☕",
  //"🎟️ Día sin preocupaciones: yo me encargo de todo 🛠️",
  //"🎟️ Sesión de fotos improvisada 📸",
  //"🎟️ Picnic sorpresa en un parque 🌳",
  //"🎟️ Una carta escrita a mano ✍️",
  //"🎟️ Karaoke juntos con tus canciones favoritas 🎤",
  //"🎟️ Una caminata nocturna bajo la luna 🌙",
  //"🎟️ Un día entero sin celular, solo tú y yo 📵",
  //"🎟️ Cocinar tu postre favorito juntos 🍩",
  //"🎟️ Una tarde de videojuegos 🎮",
  //"🎟️ Un día en el que decidas todo tú 👑",
  //"🎟️ Sesión de baile improvisada 💃",
  "❌ ⚠ ACTUALMENTE NO TENGO CUPONES DISPONIBLES ⚠ ❌ "
  ]
};

const frases = [
  "Cada amanecer me recuerda que pensarte es mi mejor hábito 💭",
  "'mucho' cuando se trata de ti es poquito 💕",
  "You're always on my mind",
  "Mientras que tu seas feliz, yo sere feliz✨",


 
];

const apodos = [
  "mi morenita preciosa",
  "mi vida",
  "mi amorcito",
  "mi corazoncito bonito",
  "mi cielito",
  "mi princesita preciosa",
  "amor de mi vida",
  "mi Valita"
];

const fotos = [
"img/foto1.jpg",
  "img/foto2.jpg",
  "img/foto3.jpg",
  "img/foto4.jpg",
  "img/foto5.jpg",
  "img/foto6.jpg",
  "img/foto7.jpg",
  "img/foto8.jpg",
  "img/foto9.jpg",
  "img/foto10.jpg",
  "img/foto11.jpg",
  "img/foto12.jpg",
  "img/foto13.jpg",
  "img/foto14.jpg",
  "img/foto15.jpg",
  "img/foto16.jpg",
  "img/foto17.jpg",
  "img/foto18.jpg",
  "img/foto19.jpg",
  "img/foto20.jpg",
  "img/foto21.jpg",
  "img/foto22.jpg",
  "img/foto23.jpg",
  "img/foto24.jpg",
  "img/foto25.jpg",
  "img/foto26.jpg",
  "img/foto27.jpg",
  "img/foto28.jpg",
  "img/foto29.jpg",
  "img/foto30.jpg",
  "img/foto31.jpg",
  "img/foto32.jpg",
  "img/foto33.jpg",
  "img/foto34.jpg",
  "img/foto35.jpg",
  "img/foto36.jpg",
  "img/foto37.jpg",
  "img/foto38.jpg",
  "img/foto39.jpg",
  "img/foto40.jpg",
  "img/foto41.jpg",
  "img/foto42.jpg",
  "img/foto43.jpg",
  "img/foto44.jpg",
  "img/foto45.jpg",
  "img/foto46.jpg",
  "img/foto47.jpg",
  "img/foto48.jpg",
  "img/foto49.jpg",
  "img/foto50.jpg",
  "img/foto51.jpg",
  "img/foto52.jpg",
  "img/foto53.jpg",
  "img/foto54.jpg",
  "img/foto55.jpg"
];

// EFECTO ESCRITURA
function escribirTexto(el, texto, velocidad = 40) {
  const sonido = document.getElementById("typingSound");
  el.innerHTML = "";
  let i = 0;

  function escribir() {
    if (i < texto.length) {
      el.innerHTML += texto.charAt(i);
      i++;

      sonido.currentTime = 0;
      sonido.play();

      setTimeout(escribir, velocidad);
    }
  }
  escribir();
}

// CONTENIDO DIARIO
function obtenerApodoDiario() {
  const dia = new Date().getDate();
  return apodos[(dia - 1) % apodos.length];
}

function mostrarPreguntaDiaria() {
  const pregunta = `¿Como te sientes hoy ${obtenerApodoDiario()}?`;
  const preguntaEl = document.getElementById("preguntaDiaria");
  preguntaEl.innerHTML = "";
  escribirTexto(preguntaEl, pregunta, 45);
}

function mostrarContenidoDiario() {
  const index = new Date().getDate();

  const frase = frases[index % frases.length];
  const foto = fotos[index % fotos.length];

  const img = document.getElementById("fotoDiaria");
  const texto = document.getElementById("fraseDiaria");

  img.classList.remove("mostrar");
  img.src = foto;

  setTimeout(() => {
    img.classList.add("mostrar");
  }, 200);

  texto.innerHTML = "";

  setTimeout(() => {
    escribirTexto(texto, frase);
  }, 700);
}

// MODAL DIARIO
function mostrarModalDiario() {
  const hoy = new Date().toDateString();
  if (localStorage.getItem("vista") === hoy) return;

  mostrarContenidoDiario();
  document.getElementById("modalDiario").style.display = "flex";
  localStorage.setItem("vista", hoy);
}

function cerrarDiario() {
  document.getElementById("modalDiario").style.display = "none";
}

// BOTÓN MANUAL
function abrirDiarioManual() {
  mostrarContenidoDiario();
  document.getElementById("modalDiario").style.display = "flex";
}

// MODAL NORMAL
function abrir(tipo) {
  document.getElementById("modal").style.display = "flex";
  
  let mensaje;
  if (tipo === 'cupones') {
    // Cupón diario basado en la fecha
    const dia = new Date().getDate();
    const index = (dia - 1) % mensajes[tipo].length;
    mensaje = mensajes[tipo][index];
  } else {
    // Mensaje aleatorio para otras emociones
    const randomIndex = Math.floor(Math.random() * mensajes[tipo].length);
    mensaje = mensajes[tipo][randomIndex];
  }
  
  document.getElementById("texto").innerText = mensaje;
  
  // Mostrar botones de redes sociales solo para triste
  const botonesRedes = document.getElementById("botonesRedes");
  if (tipo === 'triste') {
    botonesRedes.style.display = "flex";
  } else {
    botonesRedes.style.display = "none";
  }
  
  document.getElementById("musica").play();
}

function cerrar() {
  document.getElementById("modal").style.display = "none";
}

// FUNCIONES PARA REDES SOCIALES
function abrirWhatsApp() {
  // Reemplaza con tu número de WhatsApp (incluye código de país sin +)
  window.open("https://wa.me/573133145801", "_blank");
}

function abrirInstagram() {
  // Reemplaza con tu usuario de Instagram
  window.open("https://instagram.com/jordy_0731", "_blank");
}

function abrirFacebook() {
  // Reemplaza con tu usuario de Messenger
  window.open("https://m.me/jordyjesus.arevalocaceres.5", "_blank");
}

// INICIO
window.onload = () => {
  // La aplicación se inicia desde la función entrar() en la página de bienvenida
  // mostrarModalDiario() se llamará cuando se entre al contenido principal
};