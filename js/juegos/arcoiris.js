/* ============================================================
   EL ARCOÍRIS DE ALIMENTOS — Estación 1
   ------------------------------------------------------------
   Mecánica: TOCAR, no arrastrar.
   1) Tocás un alimento.  2) Tocás el color al que va.
   Arrastrar es difícil con dedos chicos, pelea con el scroll del
   celular y no se puede hacer con teclado.

   Nunca se clasifican alimentos como buenos o malos: el único
   criterio es el color.

   OJO SI TOCÁS ESTE ARCHIVO:
   las bandas y las fichas se crean UNA vez. Después sólo se les
   cambia la clase (elegida, pista, sacudida) o se saca la ficha
   que ya se colocó. Si se volviera a dibujar todo en cada toque,
   las animaciones saltarían y el juego se sentiría trabado.
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

    /* Lo que va cambiando mientras se juega. */
    const colocados = {} // color -> alimento
    let elegido = null
    let aviso = ''
    let intentos = 0
    let sacudir = null
    let terminado = false

    /* ---------------- Lo que se crea una sola vez ---------------- */
    const leyenda = NA.h('p', { class: 'centro', style: 'font-size:var(--t-chico)' })

    const bandas = ronda.map((banda) => {
      const hueco = NA.h('span', { class: 'banda__hueco' })
      const boton = NA.h(
        'button',
        {
          class: 'banda',
          style: 'background: ' + banda.tono,
          alTocar: () => tocarBanda(banda.color),
        },
        [NA.h('span', { class: 'banda__nombre' }, banda.nombre), hueco],
      )
      return { banda, boton, hueco }
    })

    const fichas = NA.mezclar(ronda.map((r) => r.alimento)).map((id) => ({
      id,
      boton: NA.h(
        'button',
        {
          class: 'ficha',
          'aria-pressed': 'false',
          'aria-label': NA.buscarAlimento(id).nombre,
          alTocar: () => tocarAlimento(id),
        },
        [
          NA.svg(NA.dibujoAlimento(id, 64, { informativo: false })),
          NA.h('span', { class: 'ficha__nombre' }, NA.buscarAlimento(id).nombre),
        ],
      ),
    }))

    const bandeja = NA.h(
      'div',
      { class: 'arcoiris__bandeja', role: 'group', 'aria-label': 'Alimentos para colocar' },
      fichas.map((f) => f.boton),
    )

    const final = NA.h('div', { style: 'display:grid; gap:0.7rem' })

    const caja = NA.h('div', { class: 'arcoiris' }, [
      NA.h('h2', { class: 'centro' }, t.titulo),
      leyenda,
      NA.h(
        'ul',
        { class: 'arcoiris__bandas' },
        bandas.map((b) => NA.h('li', null, b.boton)),
      ),
      bandeja,
      final,
    ])

    /* ---------------- Las jugadas ---------------- */
    const tocarAlimento = (id) => {
      elegido = elegido === id ? null : id
      intentos = 0
      aviso = t.ayudaPaso
      refrescar()
    }

    const tocarBanda = (color) => {
      if (!elegido) {
        aviso = t.consigna
        return refrescar()
      }
      const correcta = ronda.find((r) => r.alimento === elegido)
      if (correcta && correcta.color === color) {
        colocados[color] = elegido
        const ficha = fichas.find((f) => f.id === elegido)
        if (ficha) ficha.boton.remove()
        elegido = null
        aviso = ''
        intentos = 0
        refrescar()
      } else {
        /* Nunca se penaliza: solo se invita a probar otra vez. */
        sacudir = color
        intentos += 1
        aviso = 'Ese va en otro color. ¡Probá de nuevo!'
        /* Para que la sacudida vuelva a empezar si se equivoca dos
           veces seguidas en la misma banda. */
        const b = bandas.find((x) => x.banda.color === color)
        if (b) {
          b.boton.classList.remove('banda--sacudir')
          void b.boton.offsetWidth
        }
        refrescar()
        window.setTimeout(() => {
          if (sacudir !== color) return
          sacudir = null
          if (caja.isConnected) refrescar()
        }, 400)
      }
    }

    /** Pone todo al día cambiando clases, sin volver a crear nada. */
    function refrescar() {
      const listo = Object.keys(colocados).length === ronda.length
      /* Después de dos intentos, el color correcto se destaca solo. */
      const conPista =
        intentos >= 2 && elegido ? (ronda.find((r) => r.alimento === elegido) || {}).color : null

      leyenda.textContent = listo ? t.cierre : aviso || t.consigna

      bandas.forEach(({ banda, boton, hueco }) => {
        const puesto = colocados[banda.color]
        boton.className =
          'banda' +
          (sacudir === banda.color ? ' banda--sacudir' : '') +
          (conPista === banda.color ? ' banda--pista' : '')
        boton.disabled = !!puesto
        boton.setAttribute(
          'aria-label',
          puesto
            ? 'Color ' + banda.nombre + ': ya pusiste ' + NA.buscarAlimento(puesto).nombre
            : 'Poner en el color ' + banda.nombre,
        )
        if (puesto && !hueco.firstChild) {
          hueco.innerHTML = NA.dibujoAlimento(puesto, 54, { informativo: false })
        }
      })

      fichas.forEach(({ id, boton }) => {
        boton.className = 'ficha' + (elegido === id ? ' ficha--elegida' : '')
        boton.setAttribute('aria-pressed', elegido === id ? 'true' : 'false')
      })

      if (listo && !terminado) {
        terminado = true
        bandeja.remove()
        NA.poner(final, [
          NA.h('div', { class: 'respuesta respuesta--acierto', role: 'status' }, [
            NA.svg(NA.icono.tilde(28)),
            NA.h('div', null, [
              NA.h('p', { class: 'respuesta__titulo' }, t.completo),
              NA.h('p', { class: 'respuesta__texto' }, t.cierre),
            ]),
          ]),
          NA.boton(NA.textos.comun.seguir, { alTocar: alTerminar }),
        ])
        NA.llevarALaVista(final)
      }
    }

    refrescar()
    return caja
  }
})()
