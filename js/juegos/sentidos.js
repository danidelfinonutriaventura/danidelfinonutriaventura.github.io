/* ============================================================
   DESCUBRO CON MIS SENTIDOS — Estación 1
   ------------------------------------------------------------
   NO hay respuestas correctas ni incorrectas.
   Ninguna opción se marca como acertada, y "No sé todavía" vale
   exactamente igual que cualquier otra.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  NA.juegoSentidos = function juegoSentidos(alTerminar) {
    const t = NA.textos.sentidos

    let elegido = null
    let paso = 0
    let respuesta = null

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    /* ---------- Elegir el alimento ---------- */
    function dibujarEleccion() {
      NA.vaciar(caja)
      NA.poner(caja, [
        NA.h('h2', { class: 'centro' }, t.titulo),
        NA.dani(t.elegir),
        NA.h('p', { class: 'centro', style: 'font-size:var(--t-chico)' }, t.intro),
        NA.h(
          'div',
          { class: 'opciones opciones--tres' },
          NA.ALIMENTOS_SENTIDOS.map((id) =>
            NA.h(
              'button',
              {
                class: 'opcion opcion--vertical',
                'aria-label': 'Explorar ' + NA.buscarAlimento(id).nombre,
                alTocar: () => {
                  elegido = id
                  dibujarPaso()
                },
              },
              [
                NA.svg(NA.dibujoAlimento(id, 80, { informativo: false })),
                NA.h('span', { style: 'text-transform: capitalize' }, NA.buscarAlimento(id).nombre),
              ],
            ),
          ),
        ),
      ])
    }

    /* ---------- Las cinco preguntas ---------- */
    function dibujarPaso() {
      const actual = NA.PASOS_SENTIDOS[paso]
      const ultimo = paso === NA.PASOS_SENTIDOS.length - 1

      const siguiente = () => {
        if (ultimo) return alTerminar()
        paso += 1
        respuesta = null
        dibujarPaso()
      }

      NA.vaciar(caja)
      NA.poner(caja, [
        NA.h(
          'div',
          { class: 'centro' },
          NA.h('span', { class: 'paso' }, paso + 1 + ' de ' + NA.PASOS_SENTIDOS.length),
        ),

        NA.h(
          'div',
          { class: 'sentidos__protagonista' },
          NA.svg(NA.dibujoAlimento(elegido, 180, { clase: 'anim-flotar' })),
        ),

        NA.h('h2', { class: 'sentidos__pregunta' }, actual.pregunta),

        NA.h(
          'div',
          { class: 'opciones' },
          actual.opciones.map((opcion) =>
            NA.h(
              'button',
              {
                class: 'opcion' + (respuesta === opcion ? ' opcion--elegida' : ''),
                'aria-pressed': respuesta === opcion ? 'true' : 'false',
                alTocar: () => {
                  respuesta = opcion
                  dibujarPaso()
                },
              },
              opcion,
            ),
          ),
        ),
      ])

      if (respuesta) {
        const final = NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
          NA.h(
            'div',
            { class: 'respuesta respuesta--otra', role: 'status' },
            NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, actual.respuestaDani)),
          ),
          NA.boton(NA.textos.comun.seguir, { alTocar: siguiente }),
        ])
        NA.poner(caja, final)
        NA.llevarALaVista(final)
      }
    }

    dibujarEleccion()
    return caja
  }
})()
