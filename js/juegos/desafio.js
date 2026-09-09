/* ============================================================
   DESAFÍO DE ALIMENTOS — Estación 2
   ------------------------------------------------------------
   · La estrella se gana por RESPONDER, no por acertar.
   · La explicación aparece SIEMPRE, en la misma pantalla que la
     respuesta (así el desafío no se hace largo).
   · Nunca se dice "está mal". Nunca hay X roja.
   · Nunca se bloquea el avance.
   · Se puede cambiar de opción: si el chico se arrepiente, toca
     otra y la respuesta cambia. La estrella se da igual, una vez.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /**
   * alResponder -> se llama con la clave de la pregunta (p1, p2…)
   *                cada vez que se responde. Ahí se da la estrella.
   * alTerminar  -> se llama al contestar la última.
   */
  NA.juegoDesafio = function juegoDesafio(alResponder, alTerminar) {
    const t = NA.textos.desafio

    /* Cada vez que se juega, las seis preguntas salen en otro orden y,
       dentro de cada una, las opciones también se mezclan. Sin esto la
       respuesta esperada quedaba siempre primera y la posición se
       volvía la pista: se acertaba sin leer. */
    const preguntas = NA.mezclar(NA.PREGUNTAS).map((p) => {
      const orden = NA.mezclar(p.opciones.map((_, i) => i))
      return {
        id: p.id,
        enunciado: p.enunciado,
        formato: p.formato,
        explicacion: p.explicacion,
        opciones: orden.map((i) => p.opciones[i]),
        correcta: orden.indexOf(p.correcta),
      }
    })

    let indice = 0
    let elegida = null

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    /* Se puede cambiar de opción todas las veces que quiera: la
       respuesta de Dani se actualiza sola. La estrella ya está dada
       desde el primer toque y no se vuelve a dar. */
    const responder = (i) => {
      if (i === elegida) return
      elegida = i
      alResponder(preguntas[indice].id)
      dibujar()
    }

    const siguiente = () => {
      if (indice === preguntas.length - 1) return alTerminar()
      indice += 1
      elegida = null
      dibujar()
    }

    function dibujar() {
      const pregunta = preguntas[indice]
      const ultima = indice === preguntas.length - 1
      const acerto = elegida === pregunta.correcta
      const visual = pregunta.formato === 'visual'

      NA.vaciar(caja)

      NA.poner(caja, [
        NA.h(
          'div',
          { class: 'centro' },
          NA.h(
            'span',
            { class: 'paso' },
            t.paso
              .replace('{actual}', String(indice + 1))
              .replace('{total}', String(preguntas.length)),
          ),
        ),

        NA.h('h2', { class: 'centro' }, pregunta.enunciado),

        NA.h(
          'div',
          { class: 'opciones' + (visual ? ' opciones--tres' : '') },
          pregunta.opciones.map((opcion, i) => {
            let extra = ''
            if (elegida !== null) {
              if (i === pregunta.correcta) extra = ' opcion--acierto'
              else if (i === elegida) extra = ' opcion--otra'
              else extra = ' opcion--apagada'
            }
            return NA.h(
              'button',
              {
                class: 'opcion' + (visual ? ' opcion--vertical' : '') + extra,
                alTocar: () => responder(i),
              },
              [
                opcion.alimento
                  ? NA.svg(NA.dibujoAlimento(opcion.alimento, 84, { informativo: false }))
                  : null,
                NA.h('span', null, opcion.texto),
              ],
            )
          }),
        ),
      ])

      if (elegida !== null) {
        const final = NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
          NA.h(
            'div',
            {
              class: 'respuesta ' + (acerto ? 'respuesta--acierto' : 'respuesta--otra'),
              role: 'status',
            },
            [
              /* La lupa va más grande que la chispa: es un dibujo de
                 línea y a la par se perdía. */
              NA.svg(acerto ? NA.icono.chispa(36) : NA.icono.lupa(44)),
              NA.h('div', null, [
                NA.h(
                  'p',
                  { class: 'respuesta__titulo' },
                  acerto ? NA.REACCIONES.acierto : NA.REACCIONES.otra,
                ),
                NA.h('p', { class: 'respuesta__texto' }, pregunta.explicacion),
              ]),
            ],
          ),
          NA.boton(ultima ? t.terminar : t.siguiente, { alTocar: siguiente }),
        ])
        NA.poner(caja, final)
        NA.llevarALaVista(final)
      }
    }

    dibujar()
    return caja
  }
})()
