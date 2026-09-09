/* ============================================================
   NUTRIAVENTURA
   ------------------------------------------------------------
   La experiencia no usa direcciones web internas: es una sola
   página que cambia de pantalla. Eso evita que se pueda entrar
   directo al certificado sin hacer la aventura, y evita que el
   nombre del chico aparezca nunca en la barra del navegador.

   Este archivo es el que junta todo: mira en qué pantalla está la
   aventura y dibuja la que corresponde.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  const raiz = () => document.getElementById('aventura')

  /** Qué función dibuja cada pantalla. */
  function pantallaActual() {
    switch (NA.estado.pantalla) {
      case 'portada':
        return NA.pantallaPortada()
      case 'nombre':
        return NA.pantallaNombre()
      case 'mapa':
        return NA.pantallaMapa()
      case 'estacion':
        return NA.pantallaEstacion()
      case 'tesoro':
        return NA.pantallaTesoro()
      case 'certificado':
        return NA.pantallaCertificado()
      case 'desafioSemana':
        return NA.pantallaDesafioSemana()
      case 'cierre':
        return NA.pantallaCierre()
      default:
        return NA.pantallaPortada()
    }
  }

  /**
   * Vuelve a dibujar la aventura.
   * `antes` es cómo estaba el progreso justo antes del cambio: sirve
   * para saber si cambió de pantalla (y entonces volver arriba) o si
   * solo se ganó una estrella dentro de la misma.
   */
  NA.redibujar = function redibujar(antes) {
    const caja = raiz()
    if (!caja) return

    const estrellasAntes = antes ? NA.estrellasDe(antes) : NA.estrellas()
    const ganadas = NA.estrellas() - estrellasAntes

    const cambioDePantalla =
      !antes ||
      antes.pantalla !== NA.estado.pantalla ||
      antes.estacionAbierta !== NA.estado.estacionAbierta

    /* Si el chico ganó una estrella pero sigue en la misma pantalla,
       NO rehacemos nada: solo ponemos al día el número del contador.
       Si redibujáramos la pantalla entera, el juego que está jugando
       volvería a empezar desde cero. */
    if (!cambioDePantalla) {
      NA.refrescarContador()
      if (ganadas > 0 && NA.contadorActual) NA.volarEstrellas(ganadas, NA.contadorActual)
      return
    }

    NA.vaciar(caja)
    caja.appendChild(pantallaActual())

    /* Cada cambio de pantalla arranca desde arriba. */
    window.scrollTo({ top: 0, behavior: 'auto' })

    if (ganadas > 0 && NA.contadorActual) NA.volarEstrellas(ganadas, NA.contadorActual)
  }

  /** Cuántas estrellas tenía un progreso cualquiera. */
  NA.estrellasDe = function estrellasDeProgreso(progreso) {
    const guardado = NA.estado
    NA.estado = progreso
    const n = NA.estrellas()
    NA.estado = guardado
    return n
  }

  /* ------------------------------------------------------------
     ARRANQUE
     ------------------------------------------------------------ */
  function arrancar() {
    /* Pantalla de control para revisar las ilustraciones.
       Se abre agregando ?galeria al final de la dirección. */
    if (window.location.search.indexOf('galeria') !== -1) {
      NA.vaciar(raiz()).appendChild(NA.pantallaGaleria())
      return
    }

    NA.redibujar(null)

    /* El botón "atrás" del celular vuelve al mapa en vez de salir de
       la experiencia y perder todo. */
    history.pushState(null, '', location.href)
    window.addEventListener('popstate', () => {
      history.pushState(null, '', location.href)
      if (NA.estado.pantalla === 'estacion') NA.despachar({ tipo: 'volverAlMapa' })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrancar)
  } else {
    arrancar()
  }
})()
