/* ============================================================
   MEMOTEST NUTRICIONAL — Estación 5
   ------------------------------------------------------------
   Ronda 1: 6 parejas (12 cartas). Da 3 estrellas.
   Ronda 2: 8 parejas (16 cartas). Opcional, NO da estrellas.
   Sin cronómetro, sin puntaje, sin límite de intentos.

   Los alimentos se sortean: cada partida trae cartas distintas.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** nivel: 1 o 2 */
  NA.juegoMemotest = function juegoMemotest(nivel, alTerminar) {
    const t = NA.textos.memotest
    const cuantasParejas = nivel === 1 ? 6 : 8

    let parejas = NA.sortearParejas(cuantasParejas, nivel === 1)
    let cartas = repartir(parejas)
    let dadasVuelta = []
    let encontradas = []
    let dato = null
    let bloqueado = false

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    /** De cada pareja salen dos cartas, y después se mezclan todas. */
    function repartir(lista) {
      const sueltas = []
      for (const p of lista) {
        sueltas.push({ llave: p.alimento + '-a', alimento: p.alimento })
        sueltas.push({ llave: p.alimento + '-b', alimento: p.alimento })
      }
      return NA.mezclar(sueltas)
    }

    const tocar = (carta) => {
      if (bloqueado) return
      if (dadasVuelta.indexOf(carta.llave) !== -1) return
      if (encontradas.indexOf(carta.alimento) !== -1) return

      dadasVuelta = dadasVuelta.concat([carta.llave])
      if (dadasVuelta.length < 2) return dibujar()

      const alimentoA = dadasVuelta[0].split('-')[0]
      const alimentoB = dadasVuelta[1].split('-')[0]

      if (alimentoA === alimentoB) {
        const par = parejas.find((p) => p.alimento === alimentoA)
        encontradas = encontradas.concat([alimentoA])
        dato = par ? par.dato : null
        dadasVuelta = []
        dibujar()
      } else {
        bloqueado = true
        dibujar()
        window.setTimeout(() => {
          if (!caja.isConnected) return
          dadasVuelta = []
          bloqueado = false
          dibujar()
        }, 900)
      }
    }

    const reiniciarTablero = () => {
      /* Al volver a jugar se sortean alimentos nuevos, no sólo se
         cambian de lugar los mismos. */
      parejas = NA.sortearParejas(cuantasParejas, nivel === 1)
      cartas = repartir(parejas)
      dadasVuelta = []
      encontradas = []
      dato = null
      bloqueado = false
      dibujar()
    }

    function dibujar() {
      const completo = encontradas.length === parejas.length
      NA.vaciar(caja)

      NA.poner(caja, [
        NA.h('h2', { class: 'centro' }, t.titulo),
        NA.h(
          'p',
          { class: 'centro', style: 'font-size:var(--t-chico); margin:0' },
          completo ? '' : t.consigna,
        ),
        NA.h(
          'p',
          { class: 'centro paso', style: 'justify-self:center' },
          t.parejas
            .replace('{encontradas}', String(encontradas.length))
            .replace('{total}', String(parejas.length)),
        ),

        NA.h(
          'div',
          { class: 'memo memo--nivel' + nivel },
          cartas.map((carta) => {
            const hallada = encontradas.indexOf(carta.alimento) !== -1
            const abierta = dadasVuelta.indexOf(carta.llave) !== -1 || hallada
            return NA.h(
              'button',
              {
                class:
                  'carta' + (abierta ? ' carta--abierta' : '') + (hallada ? ' carta--hallada' : ''),
                disabled: hallada || bloqueado,
                alTocar: () => tocar(carta),
                'aria-label': abierta
                  ? NA.buscarAlimento(carta.alimento).nombre
                  : 'Carta tapada. Tocá para darla vuelta',
              },
              [
                NA.h('span', { class: 'carta__cara carta__cara--atras', 'aria-hidden': 'true' }),
                NA.h('span', {
                  class: 'carta__cara carta__cara--frente',
                  'aria-hidden': 'true',
                  html: NA.dibujoAlimento(carta.alimento, 64, { informativo: false }),
                }),
              ],
            )
          }),
        ),
      ])

      if (dato && !completo) {
        NA.poner(
          caja,
          NA.h(
            'div',
            { class: 'respuesta respuesta--acierto', role: 'status' },
            NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, dato)),
          ),
        )
      }

      if (completo) {
        const final = NA.h('div', { style: 'display:grid; gap:0.6rem' }, [
          NA.h('div', { class: 'respuesta respuesta--acierto', role: 'status' }, [
            NA.h('div', null, [
              NA.h('p', { class: 'respuesta__titulo' }, nivel === 1 ? t.logrado : t.nivel2Logrado),
              dato ? NA.h('p', { class: 'respuesta__texto' }, dato) : null,
            ]),
          ]),
          nivel === 2
            ? NA.boton(t.volverAJugar, { variante: 'suave', alTocar: reiniciarTablero })
            : null,
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
