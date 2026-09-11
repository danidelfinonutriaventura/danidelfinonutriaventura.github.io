/* ============================================================
   DESCUBRO CON MIS SENTIDOS — Estación 1
   ------------------------------------------------------------
   NO hay respuestas correctas ni incorrectas.
   Ninguna opción se marca como acertada, y "No sé todavía" vale
   exactamente igual que cualquier otra.

   OJO SI TOCÁS ESTE ARCHIVO:
   el alimento que flota se crea UNA vez y queda quieto en su lugar
   durante las cinco preguntas. Si se lo volviera a crear en cada
   toque, su animación de flotar empezaría de nuevo cada vez y el
   dibujo pegaría un salto.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  NA.juegoSentidos = function juegoSentidos(alTerminar) {
    const t = NA.textos.sentidos
    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    /* ---------- Elegir el alimento ---------- */
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
              alTocar: () => explorar(id),
            },
            [
              NA.svg(NA.dibujoAlimento(id, 80, { informativo: false })),
              NA.h('span', { style: 'text-transform: capitalize' }, NA.buscarAlimento(id).nombre),
            ],
          ),
        ),
      ),
    ])

    /* ---------- Las cinco preguntas ---------- */
    function explorar(elegido) {
      let paso = 0

      /* Estas partes se crean una sola vez y sólo cambian de texto. */
      const contador = NA.h('span', { class: 'paso' })
      const pregunta = NA.h('h2', { class: 'sentidos__pregunta' })
      const opciones = NA.h('div', { class: 'opciones' })
      const final = NA.h('div', { style: 'display:grid; gap:0.85rem' })

      NA.vaciar(caja)
      NA.poner(caja, [
        NA.h('div', { class: 'centro' }, contador),
        NA.h(
          'div',
          { class: 'sentidos__protagonista' },
          NA.svg(NA.dibujoAlimento(elegido, 180, { clase: 'anim-flotar' })),
        ),
        pregunta,
        opciones,
        final,
      ])

      function mostrarPaso() {
        const actual = NA.PASOS_SENTIDOS[paso]
        const ultimo = paso === NA.PASOS_SENTIDOS.length - 1
        let respuesta = null

        contador.textContent = paso + 1 + ' de ' + NA.PASOS_SENTIDOS.length
        pregunta.textContent = actual.pregunta
        NA.vaciar(final)
        NA.vaciar(opciones)

        const botones = actual.opciones.map((opcion) => ({
          opcion,
          boton: NA.h(
            'button',
            { class: 'opcion', 'aria-pressed': 'false', alTocar: () => elegir(opcion) },
            opcion.texto,
          ),
        }))
        NA.poner(
          opciones,
          botones.map((b) => b.boton),
        )

        /* El recuadro de Dani se crea una vez; al cambiar de opción
           sólo se le cambia el texto, así no parpadea. */
        const textoDani = NA.h('p', { class: 'respuesta__texto' })

        function elegir(opcion) {
          const primera = respuesta === null
          respuesta = opcion
          botones.forEach((b) => {
            const activa = b.opcion === respuesta
            b.boton.className = 'opcion' + (activa ? ' opcion--elegida' : '')
            b.boton.setAttribute('aria-pressed', activa ? 'true' : 'false')
          })

          /* Cada opción tiene su propia respuesta, que acompaña lo que
             el chico eligió sin juzgarlo. Si cambia de opción, cambia. */
          textoDani.textContent = opcion.respuesta

          if (primera) {
            NA.poner(final, [
              NA.h(
                'div',
                { class: 'respuesta respuesta--otra', role: 'status' },
                NA.h('div', null, textoDani),
              ),
              NA.boton(NA.textos.comun.seguir, {
                alTocar: () => {
                  if (ultimo) return alTerminar()
                  paso += 1
                  mostrarPaso()
                },
              }),
            ])
            NA.llevarALaVista(final)
          }
        }
      }

      mostrarPaso()
    }

    return caja
  }
})()
