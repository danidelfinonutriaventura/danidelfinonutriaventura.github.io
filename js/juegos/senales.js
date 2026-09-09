/* ============================================================
   HAMBRE Y SACIEDAD — Estación 3
   ------------------------------------------------------------
   Se trabajan como SEÑALES DEL CUERPO, nunca como reglas sobre
   cuánto comer.
   · No hay respuestas correctas: el chico marca las señales que
     reconoce en su propio cuerpo.
   · No se habla de cantidades, ni del plato, ni de terminar la
     comida.
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

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    const alternar = (id) => {
      marcadas =
        marcadas.indexOf(id) !== -1 ? marcadas.filter((x) => x !== id) : marcadas.concat([id])
      dibujar()
    }

    function dibujar() {
      NA.vaciar(caja)

      NA.poner(caja, [
        NA.h('h2', { class: 'centro' }, bloque.titulo),
        NA.dani(bloque.intro),
        NA.h(
          'p',
          { class: 'centro', style: 'font-size:var(--t-chico); margin:0' },
          bloque.consigna,
        ),

        NA.h(
          'div',
          { class: 'opciones' },
          bloque.senales.map((senal) => {
            const activa = marcadas.indexOf(senal.id) !== -1
            return NA.h(
              'button',
              {
                class: 'opcion' + (activa ? ' opcion--acierto' : ''),
                'aria-pressed': activa ? 'true' : 'false',
                alTocar: () => alternar(senal.id),
              },
              [
                NA.svg(NA.iconoSenal(senal.icono, 36)),
                NA.h('span', null, senal.texto),
              ],
            )
          }),
        ),
      ])

      if (marcadas.length > 0 && !confirmado) {
        const paso = NA.h(
          'div',
          null,
          NA.boton(NA.textos.senales.listo, {
            alTocar: () => {
              confirmado = true
              dibujar()
            },
          }),
        )
        NA.poner(caja, paso)
        if (marcadas.length === 1) NA.llevarALaVista(paso)
      }

      if (confirmado) {
        /* Celeste, como el resto de los recuadros de la aventura.
           El amarillo estaba reservado para el "¡Muy bien!" del
           desafío, y acá no hay respuestas correctas. */
        const final = NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
          NA.h(
            'div',
            { class: 'respuesta respuesta--otra', role: 'status' },
            NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, bloque.cierre)),
          ),
          NA.boton(NA.textos.comun.seguir, { alTocar: alTerminar }),
        ])
        NA.poner(caja, final)
        NA.llevarALaVista(final)
      }
    }

    dibujar()
    return caja
  }
})()
