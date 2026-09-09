/* ============================================================
   CERTIFICADO COMO IMAGEN (PNG)
   ------------------------------------------------------------
   Dibuja el certificado en un lienzo (canvas) y devuelve un PNG
   de alta resolución, listo para guardar o mandar por WhatsApp.

   Por qué está hecho a mano y no con una librería: las librerías
   que convierten HTML en imagen usan una técnica (foreignObject)
   que falla justo en Safari de iPhone, que es donde más se va a
   usar. Dibujarlo directamente funciona en todos lados y no
   agrega ninguna dependencia al proyecto.

   Todo pasa dentro del dispositivo: la imagen no se sube a
   ningún lado.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /* Medidas en unidades de diseño (proporción A4 apaisada). */
  const ANCHO = 1050
  const ALTO = 742
  /** Multiplicador para que la imagen salga nítida al imprimirla. */
  const NITIDEZ = 2

  const ROJO = '#CE2531'
  const TEXTO = '#791613'
  const ROSA = '#FBDAF4'
  const AMARILLO = '#FFF388'
  const SUAVE = '#9C5750'

  const RUTA_ESTRELLA =
    'M12 2.6l2.7 5.9 6.4.7-4.8 4.4 1.3 6.4L12 16.8 6.4 20l1.3-6.4L2.9 9.2l6.4-.7z'

  /** Carga una imagen y espera a que esté lista. */
  function cargarImagen(src) {
    return new Promise((resolver) => {
      const img = new Image()
      img.onload = () => resolver(img)
      img.onerror = () => resolver(null)
      img.src = src
    })
  }

  /** Convierte un SVG que ya está en pantalla en una imagen dibujable. */
  function svgAImagen(svg) {
    const copia = svg.cloneNode(true)
    copia.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    copia.setAttribute('width', '200')
    copia.setAttribute('height', '200')
    const texto = new XMLSerializer().serializeToString(copia)
    return cargarImagen('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(texto))
  }

  /** Parte un texto en varias líneas para que entre en un ancho dado. */
  function enLineas(ctx, texto, anchoMax) {
    const palabras = texto.split(' ')
    const lineas = []
    let actual = ''
    for (const palabra of palabras) {
      const prueba = actual ? actual + ' ' + palabra : palabra
      if (ctx.measureText(prueba).width > anchoMax && actual) {
        lineas.push(actual)
        actual = palabra
      } else {
        actual = prueba
      }
    }
    if (actual) lineas.push(actual)
    return lineas
  }

  /** Escribe un texto centrado. Devuelve la altura de la última línea. */
  function escribir(ctx, texto, y, opciones) {
    ctx.font = opciones.fuente
    ctx.fillStyle = opciones.color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    const lineas = opciones.anchoMax ? enLineas(ctx, texto, opciones.anchoMax) : [texto]
    const salto = opciones.interlineado || 0
    lineas.forEach((linea, i) => ctx.fillText(linea, ANCHO / 2, y + i * salto))
    return y + (lineas.length - 1) * salto
  }

  function rectRedondeado(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  /**
   * opciones: { nombre, esquinas, logoSrc, fecha }
   *   esquinas -> los SVG de los alimentos que ya están en pantalla,
   *               para reusarlos tal cual.
   */
  NA.dibujarCertificado = async function dibujarCertificado(opciones) {
    const nombre = opciones.nombre
    const c = NA.certificado

    /* Esperamos a que las tipografías estén listas: si no, el lienzo
       las dibujaría con una fuente de reemplazo. */
    try {
      await document.fonts.ready
    } catch (e) {
      /* Si el navegador no lo soporta, seguimos igual. */
    }

    const lienzo = document.createElement('canvas')
    lienzo.width = ANCHO * NITIDEZ
    lienzo.height = ALTO * NITIDEZ
    const ctx = lienzo.getContext('2d')
    if (!ctx) return null
    ctx.scale(NITIDEZ, NITIDEZ)

    /* ---------- Fondo y marco ---------- */
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, ANCHO, ALTO)

    ctx.lineWidth = 10
    ctx.strokeStyle = ROJO
    rectRedondeado(ctx, 12, 12, ANCHO - 24, ALTO - 24, 26)
    ctx.stroke()

    ctx.lineWidth = 3.5
    ctx.strokeStyle = ROSA
    rectRedondeado(ctx, 34, 34, ANCHO - 68, ALTO - 68, 16)
    ctx.stroke()

    /* ---------- Alimentos: uno arriba a la izquierda, otro abajo a la derecha ---------- */
    const imagenesEsquina = await Promise.all(opciones.esquinas.map(svgAImagen))
    /* Mismas posiciones que en pantalla: 4,4% y 4,2% del ancho,
       medidos desde la esquina que le toca a cada uno. */
    const posiciones = [
      { x: 46, y: 44 },
      { x: ANCHO - 129, y: ALTO - 127 },
    ]
    imagenesEsquina.forEach((img, i) => {
      if (img && posiciones[i]) ctx.drawImage(img, posiciones[i].x, posiciones[i].y, 74, 74)
    })

    /* ---------- Textos ---------- */
    escribir(ctx, c.titulo, 167, {
      fuente: '600 31px "DM Sans", sans-serif',
      color: ROJO,
    })

    escribir(ctx, c.felicitaciones, 229, {
      fuente: '700 47px "DM Sans", sans-serif',
      color: TEXTO,
    })

    const finBajada = escribir(ctx, c.bajada, 273, {
      fuente: '400 21px "DM Sans", sans-serif',
      color: TEXTO,
      anchoMax: 660,
      interlineado: 29,
    })

    escribir(ctx, c.reconoce, finBajada + 54, {
      fuente: '400 19px "DM Sans", sans-serif',
      color: TEXTO,
    })

    /* ---------- Nombre (o línea para escribirlo a mano) ---------- */
    const yNombre = finBajada + 128
    if (nombre.trim()) {
      // Los nombres largos se achican solos para no romper la hoja.
      let tam = nombre.length > 12 ? 48 : 68
      ctx.font = '700 ' + tam + 'px "DM Sans", sans-serif'
      while (ctx.measureText(nombre).width > 760 && tam > 26) {
        tam -= 2
        ctx.font = '700 ' + tam + 'px "DM Sans", sans-serif'
      }
      ctx.fillStyle = ROJO
      ctx.textAlign = 'center'
      ctx.fillText(nombre, ANCHO / 2, yNombre)
    } else {
      ctx.strokeStyle = '#F2BFE7'
      ctx.lineWidth = 4
      ctx.setLineDash([12, 10])
      ctx.beginPath()
      ctx.moveTo(ANCHO / 2 - 230, yNombre)
      ctx.lineTo(ANCHO / 2 + 230, yNombre)
      ctx.stroke()
      ctx.setLineDash([])
    }

    escribir(ctx, c.porCompletar, yNombre + 38, {
      fuente: '400 19px "DM Sans", sans-serif',
      color: TEXTO,
    })

    /* ---------- Las 20 estrellas ---------- */
    const ruta = new Path2D(RUTA_ESTRELLA)
    const tamEstrella = 25
    const separacion = 30
    const anchoFila = (NA.TOTAL_ESTRELLAS - 1) * separacion
    const yEstrellas = yNombre + 68
    for (let i = 0; i < NA.TOTAL_ESTRELLAS; i++) {
      ctx.save()
      ctx.translate(ANCHO / 2 - anchoFila / 2 + i * separacion - tamEstrella / 2, yEstrellas)
      ctx.scale(tamEstrella / 24, tamEstrella / 24)
      ctx.fillStyle = AMARILLO
      ctx.strokeStyle = TEXTO
      ctx.lineWidth = 1.6
      ctx.fill(ruta)
      ctx.stroke(ruta)
      ctx.restore()
    }

    /* ---------- Frase ---------- */
    escribir(ctx, c.frase, yEstrellas + 66, {
      fuente: 'italic 400 19px "DM Sans", sans-serif',
      color: SUAVE,
      anchoMax: 620,
      interlineado: 27,
    })

    /* ---------- Pie: fecha y logo ---------- */
    ctx.textAlign = 'left'
    ctx.font = '400 17px "DM Sans", sans-serif'
    ctx.fillStyle = SUAVE
    ctx.fillText(opciones.fecha, 131, ALTO - 61)

    const logo = await cargarImagen(opciones.logoSrc)
    const centroFirma = ANCHO - 245
    if (logo) {
      // Mismo tamaño relativo que en la versión de pantalla (12% del ancho).
      const anchoLogo = 126
      const altoLogo = (logo.height / logo.width) * anchoLogo
      ctx.drawImage(logo, centroFirma - anchoLogo / 2, ALTO - 56 - altoLogo, anchoLogo, altoLogo)
    }

    /* ---------- Cinta "NutriAventura completada" ---------- */
    ctx.save()
    /* La recortamos contra el borde de la hoja, igual que en pantalla:
       así la cinta pasa por debajo del marco rojo y no lo tapa. */
    rectRedondeado(ctx, 17, 17, ANCHO - 34, ALTO - 34, 21)
    ctx.clip()
    ctx.translate(ANCHO - 151, 117)
    ctx.rotate((38 * Math.PI) / 180)
    ctx.fillStyle = AMARILLO
    ctx.strokeStyle = ROJO
    ctx.lineWidth = 4
    ctx.fillRect(-249, -33, 498, 66)
    ctx.strokeRect(-249, -33, 498, 66)
    ctx.fillStyle = TEXTO
    ctx.font = '600 24px "DM Sans", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(c.sello, 0, 1)
    ctx.restore()

    return new Promise((resolver) => lienzo.toBlob((b) => resolver(b), 'image/png'))
  }
})()
