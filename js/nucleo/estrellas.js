/* ============================================================
   ESTRELLAS
   ------------------------------------------------------------
   Único sistema de progreso de la aventura.
   No hay puntos, ni ranking, ni vidas, ni comparación.

   Cuando el chico gana una estrella, la estrella VUELA desde lo que
   acaba de tocar hasta el contador de arriba. Es el momento de
   recompensa de toda la experiencia: que se vea de dónde sale y
   adónde va es lo que le da sentido al contador.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** El dibujo de la estrella que vuela. */
  const ESTRELLA_SVG = `<svg viewBox="0 0 24 24" width="34" height="34">
  <path d="M12 2.6l2.7 5.9 6.4.7-4.8 4.4 1.3 6.4L12 16.8 6.4 20l1.3-6.4L2.9 9.2l6.4-.7z"
        fill="#FFF388" stroke="#791613" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`

  /* ------------------------------------------------------------
     DE DÓNDE SALE LA ESTRELLA
     Sale de lo último que el chico tocó: la opción que eligió, la
     carta que dio vuelta, el botón que apretó. Así la estrella nace
     de lo que hizo, y no del medio de la pantalla.
     ------------------------------------------------------------ */
  let ultimoToque = null

  window.addEventListener(
    'pointerdown',
    (e) => {
      ultimoToque = { x: e.clientX, y: e.clientY, cuando: Date.now() }
    },
    { capture: true, passive: true },
  )

  /** Si el toque quedó viejo, la estrella sale del medio de la pantalla. */
  function puntoDeSalida() {
    if (ultimoToque && Date.now() - ultimoToque.cuando < 3000) {
      return { x: ultimoToque.x, y: ultimoToque.y }
    }
    return { x: window.innerWidth / 2, y: window.innerHeight * 0.56 }
  }

  /* ------------------------------------------------------------
     EL VUELO
     ------------------------------------------------------------ */
  /** Manda a volar `ganadas` estrellas hasta la caja del contador. */
  NA.volarEstrellas = function volarEstrellas(ganadas, caja) {
    if (ganadas <= 0 || !caja) return

    const destino = caja.getBoundingClientRect()
    const finX = destino.left + destino.width * 0.26
    const finY = destino.top + destino.height / 2

    // El contador da un saltito al recibir cada estrella.
    caja.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
      { duration: 420, delay: 380, easing: 'ease-out' },
    )

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const salida = puntoDeSalida()

    for (let i = 0; i < ganadas; i++) {
      /* Cuando son varias, se abren un poco en abanico para que no
         salgan todas pegadas del mismo punto. */
      const inicioX = salida.x + (ganadas > 1 ? Math.random() * 48 - 24 : 0)
      const inicioY = salida.y + (ganadas > 1 ? Math.random() * 32 - 16 : 0)

      const el = document.createElement('div')
      el.innerHTML = ESTRELLA_SVG
      el.setAttribute('aria-hidden', 'true')
      Object.assign(el.style, {
        position: 'fixed',
        left: inicioX + 'px',
        top: inicioY + 'px',
        zIndex: '60',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 3px 6px rgba(121,22,19,0.3))',
      })
      document.body.appendChild(el)

      const dx = finX - inicioX
      const dy = finY - inicioY

      const anim = el.animate(
        [
          { transform: 'translate(0px, 0px) scale(0.4) rotate(0deg)', opacity: 0 },
          { transform: 'translate(0px, -26px) scale(1.25) rotate(-12deg)', opacity: 1, offset: 0.22 },
          {
            transform: `translate(${dx * 0.55}px, ${dy * 0.4 - 30}px) scale(1.05) rotate(140deg)`,
            opacity: 1,
            offset: 0.62,
          },
          { transform: `translate(${dx}px, ${dy}px) scale(0.42) rotate(320deg)`, opacity: 0.9 },
        ],
        { duration: 900, delay: i * 130, easing: 'cubic-bezier(0.4, 0, 0.3, 1)', fill: 'forwards' },
      )
      anim.onfinish = () => el.remove()
      /* Red de seguridad: si la pestaña queda en segundo plano el
         navegador puede no terminar la animación, y la estrella
         quedaría pegada en pantalla. La sacamos igual. */
      window.setTimeout(() => el.remove(), 900 + i * 130 + 600)
    }
  }

  /* ---------------- CONTADOR (siempre visible) ---------------- */
  NA.contadorEstrellas = function contadorEstrellas() {
    const cuantas = NA.estrellas()
    const total = NA.TOTAL_ESTRELLAS

    const caja = NA.h('span', { class: 'contador' }, [
      NA.h('span', { html: NA.icono.estrella(22) }),
      NA.h('span', { 'aria-hidden': 'true' }, cuantas + ' / ' + total),
      NA.h(
        'span',
        { class: 'oculto-visual' },
        NA.textos.comun.estrellasContador
          .replace('{actuales}', String(cuantas))
          .replace('{total}', String(total)),
      ),
    ])

    /* El vuelo se dispara cuando el contador ya está en la página. */
    NA.contadorActual = caja
    return caja
  }

  /**
   * Pone al día el número del contador sin rehacer la pantalla.
   * Se usa cuando el chico gana una estrella en medio de un juego:
   * si redibujáramos todo, el juego volvería a empezar.
   */
  NA.refrescarContador = function refrescarContador() {
    const caja = NA.contadorActual
    if (!caja || !caja.isConnected) return
    const cuantas = NA.estrellas()
    const total = NA.TOTAL_ESTRELLAS
    const visible = caja.querySelector('[aria-hidden="true"]')
    const leido = caja.querySelector('.oculto-visual')
    if (visible) visible.textContent = cuantas + ' / ' + total
    if (leido) {
      leido.textContent = NA.textos.comun.estrellasContador
        .replace('{actuales}', String(cuantas))
        .replace('{total}', String(total))
    }
  }

  /* ---------------- GRILLA DE 20 (mapa y tesoro) ----------------
     animar  -> las 20 se encienden de a una.
     retraso -> milisegundos de espera antes de empezar. Sirve para
                que en el NutriTesoro primero pase la estrella grande
                del festejo y recién después se enciendan estas. */
  NA.grillaEstrellas = function grillaEstrellas(opciones) {
    const o = opciones || {}
    const cuantas = NA.estrellas()
    const total = NA.TOTAL_ESTRELLAS

    const caja = NA.h('div', {
      class: 'grilla-estrellas',
      role: 'img',
      'aria-label': NA.textos.comun.estrellasContador
        .replace('{actuales}', String(cuantas))
        .replace('{total}', String(total)),
    })

    const dibujar = (encendidas) => {
      NA.vaciar(caja)
      for (let i = 0; i < total; i++) {
        caja.appendChild(
          NA.h('span', { html: NA.icono.estrella(44, i < encendidas ? undefined : 'estrella-apagada') }),
        )
      }
    }

    if (!o.animar) {
      dibujar(cuantas)
      return caja
    }

    // Las estrellas aparecen una a una en el NutriTesoro.
    dibujar(0)
    window.setTimeout(() => {
      let n = 0
      const reloj = window.setInterval(() => {
        n += 1
        if (!caja.isConnected) return window.clearInterval(reloj)
        dibujar(n)
        if (n >= cuantas) window.clearInterval(reloj)
      }, 90)
    }, o.retraso || 0)

    return caja
  }

  /* ---------------- AVISO DE ESTRELLA GANADA ---------------- */
  NA.estrellasGanadas = function estrellasGanadas(cantidad) {
    if (cantidad <= 0) return null
    const texto =
      cantidad === 1
        ? NA.textos.comun.ganasteUnaEstrella
        : NA.textos.comun.ganasteEstrellas.replace('{n}', String(cantidad))

    let estrellitas = ''
    for (let i = 0; i < cantidad; i++) estrellitas += NA.icono.estrella(30)

    return NA.h('div', { class: 'respuesta respuesta--acierto', role: 'status' }, [
      NA.h('span', { class: 'anim-latir', style: 'display:flex; gap:2px', html: estrellitas }),
      NA.h('div', null, NA.h('p', { class: 'respuesta__titulo' }, texto)),
    ])
  }
})()
