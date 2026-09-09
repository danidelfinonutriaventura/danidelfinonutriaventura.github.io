/* ============================================================
   EL ARCOÍRIS DE ALIMENTOS — Estación 1
   ------------------------------------------------------------
   Mecánica: TOCAR, no arrastrar.
   1) Tocás un alimento.  2) Tocás el color al que va.
   Arrastrar es difícil con dedos chicos, pelea con el scroll del
   celular y no se puede hacer con teclado.

   Nunca se clasifican alimentos como buenos o malos: el único
   criterio es el color.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  NA.juegoArcoiris = function juegoArcoiris(alTerminar) {
    const t = NA.textos.arcoiris

    /* Se sortea un alimento por banda: si vuelve a jugar, cambia. */
    const ronda = NA.ARCOIRIS.map((b) => ({
      color: b.color,
      nombre: b.nombre,
      tono: b.tono,
      alimento: NA.alAzar(b.opciones),
    }))
    const bandeja = NA.mezclar(ronda.map((r) => r.alimento))

    /* Lo que va cambiando mientras se juega. */
    const colocados = {} // color -> alimento
    let elegido = null
    let aviso = ''
    let intentos = 0
    let sacudir = null

    const caja = NA.h('div', { class: 'arcoiris' })

    const tocarAlimento = (id) => {
      elegido = elegido === id ? null : id
      intentos = 0
      aviso = t.ayudaPaso
      dibujar()
    }

    const tocarBanda = (color) => {
      if (!elegido) {
        aviso = t.consigna
        return dibujar()
      }
      const correcta = ronda.find((r) => r.alimento === elegido)
      if (correcta && correcta.color === color) {
        colocados[color] = elegido
        elegido = null
        aviso = ''
        intentos = 0
        dibujar()
      } else {
        /* Nunca se penaliza: solo se invita a probar otra vez. */
        sacudir = color
        intentos += 1
        aviso = 'Ese va en otro color. ¡Probá de nuevo!'
        dibujar()
        window.setTimeout(() => {
          sacudir = null
          if (caja.isConnected) dibujar()
        }, 400)
      }
    }

    function dibujar() {
      const listo = Object.keys(colocados).length === ronda.length
      /* Después de dos intentos, el color correcto se destaca solo. */
      const conPista =
        intentos >= 2 && elegido ? (ronda.find((r) => r.alimento === elegido) || {}).color : null

      NA.vaciar(caja)

      NA.poner(caja, [
        NA.h('h2', { class: 'centro' }, t.titulo),
        NA.h(
          'p',
          { class: 'centro', style: 'font-size:var(--t-chico)' },
          listo ? t.cierre : aviso || t.consigna,
        ),

        NA.h(
          'ul',
          { class: 'arcoiris__bandas' },
          ronda.map((banda) => {
            const puesto = colocados[banda.color]
            return NA.h(
              'li',
              null,
              NA.h(
                'button',
                {
                  class:
                    'banda' +
                    (sacudir === banda.color ? ' banda--sacudir' : '') +
                    (conPista === banda.color ? ' banda--pista' : ''),
                  style: 'background: ' + banda.tono,
                  disabled: !!puesto,
                  alTocar: () => tocarBanda(banda.color),
                  'aria-label': puesto
                    ? 'Color ' + banda.nombre + ': ya pusiste ' + NA.buscarAlimento(puesto).nombre
                    : 'Poner en el color ' + banda.nombre,
                },
                [
                  NA.h('span', { class: 'banda__nombre' }, banda.nombre),
                  NA.h('span', {
                    class: 'banda__hueco',
                    html: puesto ? NA.dibujoAlimento(puesto, 54, { informativo: false }) : '',
                  }),
                ],
              ),
            )
          }),
        ),
      ])

      if (!listo) {
        const puestos = Object.keys(colocados).map((c) => colocados[c])
        NA.poner(
          caja,
          NA.h(
            'div',
            { class: 'arcoiris__bandeja', role: 'group', 'aria-label': 'Alimentos para colocar' },
            bandeja
              .filter((id) => puestos.indexOf(id) === -1)
              .map((id) =>
                NA.h(
                  'button',
                  {
                    class: 'ficha' + (elegido === id ? ' ficha--elegida' : ''),
                    alTocar: () => tocarAlimento(id),
                    'aria-pressed': elegido === id ? 'true' : 'false',
                    'aria-label': NA.buscarAlimento(id).nombre,
                  },
                  [
                    NA.svg(NA.dibujoAlimento(id, 64, { informativo: false })),
                    NA.h('span', { class: 'ficha__nombre' }, NA.buscarAlimento(id).nombre),
                  ],
                ),
              ),
          ),
        )
      } else {
        const final = NA.h('div', { style: 'display:grid; gap:0.7rem' }, [
          NA.h('div', { class: 'respuesta respuesta--acierto', role: 'status' }, [
            NA.svg(NA.icono.tilde(28)),
            NA.h('div', null, [
              NA.h('p', { class: 'respuesta__titulo' }, t.completo),
              NA.h('p', { class: 'respuesta__texto' }, t.cierre),
            ]),
          ]),
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
