/* ============================================================
   PAUSA CONSCIENTE — Estación 4
   ------------------------------------------------------------
   Es una práctica de alimentación consciente (Mindful Eating):
   una pausa para conectar con el cuerpo y prestar atención a
   cómo estamos.

   NUNCA se presenta como una forma de controlar el apetito,
   aguantar el hambre, evitar comer o controlar el peso.

   Ritmo: tomo aire 4 s, espero 2 s, suelto 6 s, por 6 ciclos = 72 s.
   Sin sonido de ningún tipo.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  const CICLOS = 6

  NA.juegoRespiracion = function juegoRespiracion(alTerminar) {
    const t = NA.textos.respiracion

    const FASES = [
      { nombre: t.inhalo, segundos: 4, escala: 1 },
      { nombre: t.pauso, segundos: 2, escala: 1 },
      { nombre: t.exhalo, segundos: 6, escala: 0.68 },
    ]

    let empezo = false
    let fase = 0
    let ciclo = 0
    let listo = false
    /* Las preguntas del final no se responden: son para pensar. Se
       van marcando solas, de a una, para que el chico las lea una por
       vez en vez de barrerlas todas de un vistazo. */
    let marcadas = 0
    /* La primera vez el círculo tiene que arrancar chiquito. Si no, ya
       nace grande y la primera vez que dice "tomo aire" no se ve
       crecer: recién se notaba a partir de la segunda respiración. */
    let creciendo = false

    const relojes = []
    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    const limpiarRelojes = () => {
      while (relojes.length) window.clearTimeout(relojes.pop())
    }

    /* Si la pantalla se va (por ejemplo, tocando "volver"), cortamos
       los relojes para que no sigan corriendo en el vacío. */
    const vigilar = () => {
      if (!caja.isConnected) limpiarRelojes()
    }

    function siguienteFase() {
      vigilar()
      if (!caja.isConnected) return

      if (fase < FASES.length - 1) {
        fase += 1
      } else if (ciclo < CICLOS - 1) {
        ciclo += 1
        fase = 0
      } else {
        listo = true
        dibujar()
        arrancarPreguntas()
        return
      }
      dibujar()
      programarFase()
    }

    function programarFase() {
      relojes.push(window.setTimeout(siguienteFase, FASES[fase].segundos * 1000))
    }

    function arrancarPreguntas() {
      // Si el dispositivo pide menos movimiento, aparecen marcadas de una vez.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        marcadas = t.preguntas.length
        return dibujar()
      }
      t.preguntas.forEach((_, i) => {
        relojes.push(
          window.setTimeout(() => {
            if (!caja.isConnected) return
            marcadas = i + 1
            dibujar()
          }, 600 + i * 1300),
        )
      })
    }

    function empezar() {
      empezo = true
      dibujar()
      /* Un respiro antes de largar, para que el navegador alcance a
         dibujar el círculo chiquito y después lo vea crecer. */
      relojes.push(
        window.setTimeout(() => {
          creciendo = true
          dibujar()
        }, 60),
      )
      programarFase()
    }

    function dibujar() {
      NA.vaciar(caja)

      /* ---------- Antes de empezar ---------- */
      if (!empezo) {
        caja.setAttribute('style', 'display:grid; gap:0.85rem')
        return NA.poner(caja, [
          NA.dani(t.encuadre),
          NA.h('p', { class: 'centro' }, t.consigna),
          NA.h(
            'div',
            { class: 'respiracion__previa', 'aria-hidden': 'true' },
            NA.h('span', { class: 'respiracion__circulo respiracion__circulo--quieto' }),
          ),
          NA.boton(t.comenzar, { alTocar: empezar }),
          NA.h('p', { class: 'respiracion__nota' }, t.notaAdulto),
        ])
      }

      /* ---------- Terminó ---------- */
      if (listo) {
        caja.setAttribute('style', 'display:grid; gap:0.85rem')
        return NA.poner(caja, [
          NA.h('h2', { class: 'centro' }, t.listo),
          NA.dani(t.cierre),
          NA.h(
            'ul',
            { class: 'respiracion__preguntas' },
            t.preguntas.map((pregunta, i) =>
              NA.h('li', { class: i < marcadas ? 'marcada' : null }, [
                NA.h('span', {
                  class: 'respiracion__tilde',
                  'aria-hidden': 'true',
                  html: NA.icono.tilde(20),
                }),
                pregunta,
              ]),
            ),
          ),
          NA.boton(NA.textos.comun.seguir, {
            alTocar: () => {
              limpiarRelojes()
              alTerminar()
            },
          }),
        ])
      }

      /* ---------- Durante la pausa ---------- */
      const actual = FASES[fase]
      caja.setAttribute('style', 'display:grid; gap:1rem')

      const puntos = []
      for (let i = 0; i < CICLOS; i++) {
        puntos.push(NA.h('span', { class: i <= ciclo ? 'punto punto--hecho' : 'punto' }))
      }

      NA.poner(caja, [
        NA.h('p', { class: 'centro respiracion__ciclo' }, ciclo + 1 + ' de ' + CICLOS),

        NA.h('div', { class: 'respiracion__previa' }, [
          NA.h('span', {
            class: 'respiracion__circulo',
            'aria-hidden': 'true',
            style:
              'transform: scale(' +
              (creciendo ? actual.escala : FASES[2].escala) +
              '); transition-duration: ' +
              (creciendo ? actual.segundos + 's' : '0s'),
          }),
          NA.h(
            'span',
            { class: 'respiracion__palabra', role: 'status', 'aria-live': 'polite' },
            actual.nombre,
          ),
        ]),

        NA.h('div', { class: 'respiracion__puntos', 'aria-hidden': 'true' }, puntos),
      ])
    }

    dibujar()
    return caja
  }
})()
