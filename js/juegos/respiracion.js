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

   OJO SI TOCÁS ESTE ARCHIVO:
   el círculo crece y se desinfla con una transición de CSS, y una
   transición sólo funciona si el elemento SIGUE SIENDO EL MISMO y
   le cambia el valor. Por eso la pantalla de la pausa se arma una
   sola vez y después sólo se le cambian los valores. Si se volviera
   a crear el círculo en cada fase, saltaría de un tamaño a otro en
   vez de crecer, y se vería trabado.
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

    let fase = 0
    let ciclo = 0
    /* La primera vez el círculo tiene que arrancar chiquito. Si no, ya
       nace grande y la primera vez que dice "tomo aire" no se ve
       crecer: recién se notaba a partir de la segunda respiración. */
    let creciendo = false

    const relojes = []
    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    const limpiarRelojes = () => {
      while (relojes.length) window.clearTimeout(relojes.pop())
    }

    /* ------------------------------------------------------------
       Los elementos de la pausa: se crean UNA vez y no se tocan más.
       ------------------------------------------------------------ */
    const circulo = NA.h('span', { class: 'respiracion__circulo', 'aria-hidden': 'true' })
    const palabra = NA.h('span', {
      class: 'respiracion__palabra',
      role: 'status',
      'aria-live': 'polite',
    })
    const cuentaCiclos = NA.h('p', { class: 'centro respiracion__ciclo' })
    const puntos = NA.h('div', { class: 'respiracion__puntos', 'aria-hidden': 'true' })
    for (let i = 0; i < CICLOS; i++) puntos.appendChild(NA.h('span', { class: 'punto' }))

    const vistaPausa = NA.h('div', { style: 'display:grid; gap:1rem' }, [
      cuentaCiclos,
      NA.h('div', { class: 'respiracion__previa' }, [circulo, palabra]),
      puntos,
    ])

    /** Sólo cambia valores: no vuelve a crear nada. */
    function actualizarPausa() {
      const actual = FASES[fase]
      /* La duración va PRIMERO. Si se cambia el tamaño mientras la
         duración todavía es 0, el círculo salta al tamaño nuevo de
         golpe y recién después queda la duración larga: se ve trabado. */
      circulo.style.transitionDuration = creciendo ? actual.segundos + 's' : '0s'
      circulo.style.transform = 'scale(' + (creciendo ? actual.escala : FASES[2].escala) + ')'
      palabra.textContent = actual.nombre
      cuentaCiclos.textContent = ciclo + 1 + ' de ' + CICLOS
      const bolitas = puntos.children
      for (let i = 0; i < bolitas.length; i++) {
        bolitas[i].className = i <= ciclo ? 'punto punto--hecho' : 'punto'
      }
    }

    /* ------------------------------------------------------------
       El ritmo
       ------------------------------------------------------------ */
    function siguienteFase() {
      if (!caja.isConnected) return limpiarRelojes()

      if (fase < FASES.length - 1) {
        fase += 1
      } else if (ciclo < CICLOS - 1) {
        ciclo += 1
        fase = 0
      } else {
        mostrarFinal()
        return
      }
      actualizarPausa()
      programarFase()
    }

    function programarFase() {
      relojes.push(window.setTimeout(siguienteFase, FASES[fase].segundos * 1000))
    }

    function empezar() {
      NA.vaciar(caja)
      caja.setAttribute('style', 'display:grid; gap:1rem')
      caja.appendChild(vistaPausa)

      /* El círculo arranca chiquito, sin animación. */
      creciendo = false
      actualizarPausa()

      /* Y acá está el truco: leer una medida del círculo obliga al
         navegador a calcular su estilo AHORA. Sin esto, junta los dos
         cambios (el chiquito y el grande) en uno solo, no genera
         ninguna transición y el círculo aparece grande de una: se ve
         trabado. Con esto, ve el tamaño chico primero y después lo
         hace crecer de verdad. */
      void circulo.offsetWidth

      creciendo = true
      actualizarPausa()
      programarFase()
    }

    /* ------------------------------------------------------------
       Las tres pantallas
       ------------------------------------------------------------ */
    function mostrarPrevia() {
      NA.vaciar(caja)
      caja.setAttribute('style', 'display:grid; gap:0.85rem')
      NA.poner(caja, [
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

    function mostrarFinal() {
      NA.vaciar(caja)
      caja.setAttribute('style', 'display:grid; gap:0.85rem')

      /* Las preguntas del final no se responden: son para pensar. Se
         van marcando solas, de a una, para que el chico las lea una
         por vez en vez de barrerlas todas de un vistazo. */
      const lista = NA.h('ul', { class: 'respiracion__preguntas' })
      const renglones = t.preguntas.map((pregunta) => {
        const li = NA.h('li', null, [
          NA.h('span', {
            class: 'respiracion__tilde',
            'aria-hidden': 'true',
            html: NA.icono.tilde(20),
          }),
          pregunta,
        ])
        lista.appendChild(li)
        return li
      })

      NA.poner(caja, [
        NA.h('h2', { class: 'centro' }, t.listo),
        NA.dani(t.cierre),
        lista,
        NA.boton(NA.textos.comun.seguir, {
          alTocar: () => {
            limpiarRelojes()
            alTerminar()
          },
        }),
      ])

      // Si el dispositivo pide menos movimiento, aparecen marcadas de una vez.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        renglones.forEach((li) => li.classList.add('marcada'))
        return
      }
      renglones.forEach((li, i) => {
        relojes.push(
          window.setTimeout(() => {
            if (li.isConnected) li.classList.add('marcada')
          }, 600 + i * 1300),
        )
      })
    }

    mostrarPrevia()
    return caja
  }
})()
