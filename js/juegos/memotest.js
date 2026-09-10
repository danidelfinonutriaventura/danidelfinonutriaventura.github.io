/* ============================================================
   MEMOTEST NUTRICIONAL — Estación 5
   ------------------------------------------------------------
   Ronda 1: 6 parejas (12 cartas). Da 3 estrellas.
   Ronda 2: 8 parejas (16 cartas). Opcional, NO da estrellas.
   Sin cronómetro, sin puntaje, sin límite de intentos.

   Los alimentos se sortean: cada partida trae cartas distintas.

   OJO SI TOCÁS ESTE ARCHIVO:
   las cartas se dan vuelta con una transición de CSS, y una
   transición sólo funciona si el elemento SIGUE SIENDO EL MISMO.
   Por eso las cartas se crean una sola vez por partida y después
   sólo se les cambia la clase. Si se volvieran a crear en cada
   toque, saltarían de un lado al otro sin girar.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** nivel: 1 o 2 */
  NA.juegoMemotest = function juegoMemotest(nivel, alTerminar) {
    const t = NA.textos.memotest
    const cuantasParejas = nivel === 1 ? 6 : 8

    /** Lo que va cambiando durante la partida. */
    let parejas = []
    /** Cada carta: { llave, alimento, boton } */
    let cartas = []
    let dadasVuelta = []
    let encontradas = []
    let dato = null
    let bloqueado = false

    /* Las partes de la pantalla se crean una vez y sólo cambian de
       contenido. */
    const consigna = NA.h('p', { class: 'centro', style: 'font-size:var(--t-chico); margin:0' })
    const cuenta = NA.h('p', { class: 'centro paso', style: 'justify-self:center' })
    const tablero = NA.h('div', { class: 'memo memo--nivel' + nivel })
    const pieDato = NA.h('div')
    const pieFinal = NA.h('div')

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
      NA.h('h2', { class: 'centro' }, t.titulo),
      consigna,
      cuenta,
      tablero,
      pieDato,
      pieFinal,
    ])

    /** De cada pareja salen dos cartas, y después se mezclan todas. */
    function repartir() {
      const sueltas = []
      for (const p of parejas) {
        sueltas.push({ llave: p.alimento + '-a', alimento: p.alimento })
        sueltas.push({ llave: p.alimento + '-b', alimento: p.alimento })
      }
      return NA.mezclar(sueltas)
    }

    /** Crea los botones del tablero. Sólo al empezar y al volver a jugar. */
    function pintarTablero() {
      NA.vaciar(tablero)
      for (const carta of cartas) {
        carta.boton = NA.h(
          'button',
          {
            class: 'carta',
            'aria-label': 'Carta tapada. Tocá para darla vuelta',
            alTocar: () => tocar(carta),
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
        tablero.appendChild(carta.boton)
      }
    }

    /** Pone al día las cartas SIN volver a crearlas: así giran. */
    function refrescarCartas() {
      for (const carta of cartas) {
        const hallada = encontradas.indexOf(carta.alimento) !== -1
        const abierta = dadasVuelta.indexOf(carta.llave) !== -1 || hallada
        carta.boton.className =
          'carta' + (abierta ? ' carta--abierta' : '') + (hallada ? ' carta--hallada' : '')
        carta.boton.disabled = hallada || bloqueado
        carta.boton.setAttribute(
          'aria-label',
          abierta ? NA.buscarAlimento(carta.alimento).nombre : 'Carta tapada. Tocá para darla vuelta',
        )
      }
    }

    /** Los textos de arriba y los recuadros de abajo. */
    function refrescarTextos() {
      const completo = encontradas.length === parejas.length

      consigna.textContent = completo ? '' : t.consigna
      cuenta.textContent = t.parejas
        .replace('{encontradas}', String(encontradas.length))
        .replace('{total}', String(parejas.length))

      NA.vaciar(pieDato)
      if (dato && !completo) {
        NA.poner(
          pieDato,
          NA.h(
            'div',
            { class: 'respuesta respuesta--acierto', role: 'status' },
            NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, dato)),
          ),
        )
      }

      NA.vaciar(pieFinal)
      if (completo) {
        const final = NA.h('div', { style: 'display:grid; gap:0.6rem' }, [
          NA.h('div', { class: 'respuesta respuesta--acierto', role: 'status' }, [
            NA.h('div', null, [
              NA.h('p', { class: 'respuesta__titulo' }, nivel === 1 ? t.logrado : t.nivel2Logrado),
              dato ? NA.h('p', { class: 'respuesta__texto' }, dato) : null,
            ]),
          ]),
          nivel === 2
            ? NA.boton(t.volverAJugar, { variante: 'suave', alTocar: nuevaPartida })
            : null,
          NA.boton(NA.textos.comun.seguir, { alTocar: alTerminar }),
        ])
        NA.poner(pieFinal, final)
        NA.llevarALaVista(final)
      }
    }

    function tocar(carta) {
      if (bloqueado) return
      if (dadasVuelta.indexOf(carta.llave) !== -1) return
      if (encontradas.indexOf(carta.alimento) !== -1) return

      dadasVuelta = dadasVuelta.concat([carta.llave])
      refrescarCartas()
      if (dadasVuelta.length < 2) return

      const alimentoA = dadasVuelta[0].split('-')[0]
      const alimentoB = dadasVuelta[1].split('-')[0]

      if (alimentoA === alimentoB) {
        const par = parejas.find((p) => p.alimento === alimentoA)
        encontradas = encontradas.concat([alimentoA])
        dato = par ? par.dato : null
        dadasVuelta = []
        refrescarCartas()
        refrescarTextos()
      } else {
        /* Se quedan un ratito a la vista y después se dan vuelta solas.
           Nunca se dice que estuvo mal: simplemente vuelven. */
        bloqueado = true
        refrescarCartas()
        window.setTimeout(() => {
          if (!caja.isConnected) return
          dadasVuelta = []
          bloqueado = false
          refrescarCartas()
        }, 900)
      }
    }

    function nuevaPartida() {
      /* Al volver a jugar se sortean alimentos nuevos, no sólo se
         cambian de lugar los mismos. */
      parejas = NA.sortearParejas(cuantasParejas, nivel === 1)
      cartas = repartir()
      dadasVuelta = []
      encontradas = []
      dato = null
      bloqueado = false
      pintarTablero()
      refrescarCartas()
      refrescarTextos()
    }

    nuevaPartida()
    return caja
  }
})()
