/* ============================================================
   HAMBRE Y SACIEDAD — Estación 3
   ------------------------------------------------------------
   Se trabajan como SEÑALES DEL CUERPO, nunca como reglas sobre
   cuánto comer.
   · No hay respuestas correctas: el chico marca las señales que
     reconoce en su propio cuerpo.
   · No se habla de cantidades, ni del plato, ni de terminar la
     comida.

   OJO SI TOCÁS ESTE ARCHIVO:
   la pantalla se arma UNA vez y al marcar una señal sólo se le
   cambia la clase a ese botón. Si se volviera a dibujar todo en
   cada toque, la pantalla parpadearía.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** cual: 'hambre' o 'saciedad' */
  NA.juegoSenales = function juegoSenales(cual, alTerminar) {
    const bloque = NA.BLOQUES_SENALES.find((b) => b.id === cual)

    let marcadas = []
    /* El chico marca todas las que quiera y recién cuando toca el
       botón aparece lo que le cuenta Dani. Antes alcanzaba con marcar
       una sola y la respuesta se adelantaba. */
    let confirmado = false

    const lugarBoton = NA.h('div')
    const final = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    const botones = bloque.senales.map((senal) => ({
      id: senal.id,
      boton: NA.h(
        'button',
        { class: 'opcion', 'aria-pressed': 'false', alTocar: () => alternar(senal.id) },
        [NA.svg(NA.iconoSenal(senal.icono, 36)), NA.h('span', null, senal.texto)],
      ),
    }))

    function alternar(id) {
      marcadas =
        marcadas.indexOf(id) !== -1 ? marcadas.filter((x) => x !== id) : marcadas.concat([id])

      /* Sólo cambia el botón tocado. */
      const b = botones.find((x) => x.id === id)
      const activa = marcadas.indexOf(id) !== -1
      b.boton.className = 'opcion' + (activa ? ' opcion--acierto' : '')
      b.boton.setAttribute('aria-pressed', activa ? 'true' : 'false')

      if (confirmado) return

      if (marcadas.length === 0) {
        NA.vaciar(lugarBoton)
      } else if (!lugarBoton.firstChild) {
        NA.poner(lugarBoton, NA.boton(NA.textos.senales.listo, { alTocar: confirmar }))
        NA.llevarALaVista(lugarBoton)
      }
    }

    function confirmar() {
      confirmado = true
      NA.vaciar(lugarBoton)
      /* Celeste, como el resto de los recuadros de la aventura. El
         amarillo estaba reservado para el "¡Muy bien!" del desafío, y
         acá no hay respuestas correctas. */
      NA.poner(final, [
        NA.h(
          'div',
          { class: 'respuesta respuesta--otra', role: 'status' },
          NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, bloque.cierre)),
        ),
        NA.boton(NA.textos.comun.seguir, { alTocar: alTerminar }),
      ])
      NA.llevarALaVista(final)
    }

    return NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
      NA.h('h2', { class: 'centro' }, bloque.titulo),
      NA.dani(bloque.intro),
      NA.h('p', { class: 'centro', style: 'font-size:var(--t-chico); margin:0' }, bloque.consigna),
      NA.h(
        'div',
        { class: 'opciones' },
        botones.map((b) => b.boton),
      ),
      lugarBoton,
      final,
    ])
  }
})()
