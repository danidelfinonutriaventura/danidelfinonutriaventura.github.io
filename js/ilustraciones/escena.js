/* ============================================================
   LOS DIBUJOS DEL MAPA
   ------------------------------------------------------------
   Nubes, árboles, montañas, banderas, brújula, cofre, destellos
   y flores. Todos dibujados a mano en SVG con la paleta de Dani,
   sobre un cuadrado de 100 x 100.

   Cada dibujo dice qué alto tiene en proporción a su ancho: la
   nube, por ejemplo, es baja y ancha (60 de alto por 100 de ancho).
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  const TRAZO = '#791613'
  /* Mismo grosor que los alimentos: así el mapa y la comida se leen
     como una sola colección de dibujos. */
  const b = `stroke="${TRAZO}" stroke-width="3.2" stroke-linejoin="round"`

  /* Los cinco pétalos de la flor, cada uno girado un poco más. */
  const petalos = [0, 72, 144, 216, 288]
    .map(
      (g) =>
        `<ellipse cx="50" cy="30" rx="11" ry="16" fill="#FBDAF4" stroke="${TRAZO}" stroke-width="2.9" transform="rotate(${g} 50 50)"/>`,
    )
    .join('')

  /* Lo que le sale del cofre cuando está abierto. */
  const tesoroAfuera = `
    <path d="M22 44 q28 -26 56 0 v6 H22 Z" fill="#FFF388" ${b} transform="rotate(-24 22 50)"/>
    <circle cx="38" cy="30" r="4" fill="#FFF388" stroke="${TRAZO}" stroke-width="2.4"/>
    <circle cx="62" cy="24" r="5" fill="#FFF388" stroke="${TRAZO}" stroke-width="2.4"/>
    <circle cx="50" cy="18" r="3.5" fill="#FBDAF4" stroke="${TRAZO}" stroke-width="2.4"/>`

  /* La caja del cofre, igual esté abierto o cerrado. */
  const cajaCofre = `
    <rect x="16" y="54" width="68" height="34" rx="7" fill="#CE2531" ${b}/>
    <rect x="16" y="62" width="68" height="9" fill="#FFF388" stroke="${TRAZO}" stroke-width="2.6"/>
    <rect x="44" y="62" width="12" height="16" rx="3" fill="#FFF388" ${b}/>
    <circle cx="50" cy="70" r="2.6" fill="${TRAZO}"/>`

  NA.ESCENA = {
    nube: {
      alto: 60,
      ajuste: ' preserveAspectRatio="xMidYMid meet"',
      dentro: `<g transform="translate(0 12)">
      <circle cx="30" cy="34" r="16" fill="#FFFFFF"/>
      <circle cx="52" cy="26" r="21" fill="#FFFFFF"/>
      <circle cx="72" cy="36" r="15" fill="#FFFFFF"/>
      <rect x="28" y="34" width="46" height="16" rx="8" fill="#FFFFFF"/>
    </g>`,
    },

    arbol: {
      alto: 100,
      dentro: `<rect x="45" y="62" width="10" height="30" rx="4" fill="#8A5A3B" ${b}/>
    <circle cx="50" cy="44" r="24" fill="#7CC46F" ${b}/>
    <circle cx="32" cy="56" r="15" fill="#66B45C" ${b}/>
    <circle cx="68" cy="56" r="15" fill="#66B45C" ${b}/>`,
    },

    /* La montaña se dibuja bastante más grande que el resto, así que
       con el mismo grosor de trazo su contorno se vería casi el doble
       de grueso. Le damos un trazo más fino para que se vea parejo. */
    montana: {
      alto: 70,
      dentro: `<path d="M4 78 L34 26 L58 60 L74 38 L96 78 Z" fill="#8ED2F2" stroke="${TRAZO}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M34 26 L44 44 L24 44 Z" fill="#FFFFFF"/>
    <path d="M74 38 L82 52 L66 52 Z" fill="#FFFFFF"/>`,
    },

    bandera: {
      alto: 100,
      dentro: `<path d="M32 90 V16" stroke="${TRAZO}" stroke-width="6" stroke-linecap="round"/>
    <path d="M34 18 L78 30 L34 44 Z" fill="#CE2531" ${b}/>`,
    },

    brujula: {
      alto: 100,
      dentro: `<circle cx="50" cy="50" r="36" fill="#FFF388" ${b}/>
    <circle cx="50" cy="50" r="27" fill="#FFFFFF" ${b}/>
    <path d="M50 26 L58 50 L50 74 L42 50 Z" fill="#CE2531" ${b}/>
    <circle cx="50" cy="50" r="4" fill="${TRAZO}"/>`,
    },

    cofre: {
      alto: 100,
      dentro: `<path d="M18 52 q32 -30 64 0 v4 H18 Z" fill="#CE2531" ${b}/>${cajaCofre}`,
    },

    cofreAbierto: {
      alto: 100,
      dentro: `${tesoroAfuera}${cajaCofre}`,
    },

    destello: {
      alto: 100,
      dentro: `<path d="M50 12 L58 42 L88 50 L58 58 L50 88 L42 58 L12 50 L42 42 Z" fill="#FFF388" stroke="${TRAZO}" stroke-width="2.9" stroke-linejoin="round"/>`,
    },

    flor: {
      alto: 100,
      dentro: `${petalos}
    <circle cx="50" cy="50" r="10" fill="#FFF388" stroke="${TRAZO}" stroke-width="2.9"/>`,
    },
  }

  /**
   * Devuelve el SVG de un elemento del mapa, listo para poner en la
   * página. `nombre` es una de las claves de NA.ESCENA.
   */
  NA.dibujoEscena = function dibujoEscena(nombre, tam, clase) {
    const d = NA.ESCENA[nombre]
    if (!d) return ''
    const alto = (tam * d.alto) / 100
    return `<svg viewBox="0 0 100 100" width="${tam}" height="${alto}"${
      clase ? ` class="${clase}"` : ''
    }${d.ajuste || ''} aria-hidden="true" focusable="false">${d.dentro}</svg>`
  }
})()
