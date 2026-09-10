/* ============================================================
   RUEDA DE EMOCIONES Y ESTRATEGIAS — Estación 3
   ------------------------------------------------------------
   Reglas de contenido:
   · Nunca se afirma una relación automática entre una emoción y
     las ganas de comer. Siempre "a veces" o "puede".
   · Las estrategias NO son formas de evitar comer: son maneras de
     acompañar lo que sentimos. Ninguna habla de comida.

   Nota técnica: la rueda se dibuja en SVG (decorativo) y encima
   van botones HTML de verdad. Los elementos SVG con rol de botón
   no son fiables con teclado ni en Safari de iPhone, y esta
   experiencia se usa sobre todo en celular.

   OJO SI TOCÁS ESTE ARCHIVO:
   la rueda se arma UNA sola vez. Al tocar una emoción sólo se le
   cambia la clase a la porción y a la palabra elegidas: así se
   agrandan con su transición. Si se volviera a dibujar la rueda
   entera en cada toque, saltarían de golpe y se vería trabado.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /* Retoques finos de posición, en % del ancho de la rueda. La
     palabra más larga necesita bajar un poco para verse centrada en
     su porción. Van por id, así que siguen a la emoción aunque
     cambie el orden. */
  const AJUSTES = {
    aburrimiento: { y: 3 },
  }

  const R = 150
  const CENTRO = 160
  const LADO = 320

  /** El mismo color, un poco más oscuro. Sirve para el borde del
      recuadro, que si no se confunde con el relleno. */
  function oscurecer(hex, factor) {
    const f = factor || 0.82
    const n = [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * f))
    return '#' + n.map((v) => v.toString(16).padStart(2, '0')).join('')
  }

  function punto(angulo, radio) {
    const rad = ((angulo - 90) * Math.PI) / 180
    return { x: CENTRO + radio * Math.cos(rad), y: CENTRO + radio * Math.sin(rad) }
  }

  /* ============================================================
     LA RUEDA
     ============================================================ */
  NA.juegoRueda = function juegoRueda(alTerminar) {
    const t = NA.textos.rueda
    let elegida = null

    const paso = 360 / NA.EMOCIONES.length

    /* Cada porción: su forma y dónde va la palabra. */
    const gajos = NA.EMOCIONES.map((e, i) => {
      const desde = i * paso
      const hasta = (i + 1) * paso
      const a = punto(desde, R)
      const b = punto(hasta, R)
      const centro = punto(desde + paso / 2, R * 0.64)
      const ajuste = AJUSTES[e.id] || {}
      return {
        id: e.id,
        nombre: e.nombre,
        tono: e.tono,
        texto: e.texto,
        d: `M ${CENTRO} ${CENTRO} L ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y} Z`,
        izquierda: (centro.x / LADO) * 100 + (ajuste.x || 0),
        arriba: (centro.y / LADO) * 100 + (ajuste.y || 0),
      }
    })

    /* Las porciones, como una pizza: se juntan en el centro sin nada
       en el medio. */
    const dibujo = NA.svg(
      `<svg class="rueda__dibujo" viewBox="0 0 ${LADO} ${LADO}" aria-hidden="true" focusable="false">${gajos
        .map(
          (g) =>
            `<path class="rueda__gajo" d="${g.d}" fill="${g.tono}" stroke="#791613" stroke-width="1.5" stroke-linejoin="round"/>`,
        )
        .join('')}</svg>`,
    )
    const porciones = dibujo.querySelectorAll('.rueda__gajo')
    gajos.forEach((g, i) => {
      g.porcion = porciones[i]
    })

    gajos.forEach((g) => {
      g.chip = NA.h(
        'button',
        {
          class: 'rueda__chip',
          style: 'left: ' + g.izquierda + '%; top: ' + g.arriba + '%',
          'aria-pressed': 'false',
          alTocar: () => elegir(g),
        },
        g.nombre,
      )
    })

    const rueda = NA.h('div', { class: 'rueda' }, [
      dibujo,
      /* La frutilla de la marca tapa el punto donde se juntan las
         siete porciones, que quedaba sucio. Es decoración: el lector
         de pantalla la ignora. */
      NA.h('img', {
        class: 'rueda__frutilla',
        src: 'assets/sello-frutilla-claro.png',
        alt: '',
        'aria-hidden': 'true',
      }),
      gajos.map((g) => g.chip),
    ])

    /* Abajo: el recuadro con lo que cuenta Dani y el botón. Se crea
       la primera vez que el chico elige. */
    const lugarRespuesta = NA.h('div')
    const final = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    function elegir(g) {
      const primera = elegida === null
      elegida = g.id

      /* Sólo cambian las clases: así la porción y la palabra crecen
         con su transición en vez de saltar. */
      gajos.forEach((x) => {
        const activa = x.id === elegida
        x.porcion.setAttribute('class', 'rueda__gajo' + (activa ? ' rueda__gajo--activo' : ''))
        x.chip.className = 'rueda__chip' + (activa ? ' rueda__chip--activo' : '')
        x.chip.setAttribute('aria-pressed', activa ? 'true' : 'false')
      })

      /* El recuadro se pinta del color de la emoción elegida. */
      NA.vaciar(lugarRespuesta)
      NA.poner(
        lugarRespuesta,
        NA.h(
          'div',
          {
            class: 'respuesta respuesta--emocion',
            role: 'status',
            style: 'background: ' + g.tono + '; border-color: ' + oscurecer(g.tono),
          },
          [
            NA.svg(NA.icono.lupa(44)),
            NA.h('div', null, [
              NA.h('p', { class: 'respuesta__titulo' }, g.nombre),
              NA.h('p', { class: 'respuesta__texto' }, g.texto),
            ]),
          ],
        ),
      )

      if (primera) {
        NA.poner(final, [lugarRespuesta, NA.boton(t.seguir, { alTocar: alTerminar })])
        NA.llevarALaVista(final)
      }
    }

    return NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
      NA.h('h2', { class: 'centro' }, t.titulo),
      NA.dani(NA.INTRO_EMOCIONES),
      NA.h('p', { class: 'centro', style: 'font-size:var(--t-chico); margin:0' }, t.consigna),
      rueda,
      final,
    ])
  }

  /* ============================================================
     SITUACIÓN COTIDIANA Y ESTRATEGIAS
     ============================================================ */
  NA.juegoSituacion = function juegoSituacion(alTerminar) {
    const situacion = NA.alAzar(NA.SITUACIONES)
    let elegida = null

    const final = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    const botones = situacion.opciones.map((opcion) => ({
      opcion,
      boton: NA.h(
        'button',
        {
          class: 'opcion opcion--vertical',
          'aria-pressed': 'false',
          alTocar: () => elegir(opcion),
        },
        opcion,
      ),
    }))

    function elegir(opcion) {
      const primera = elegida === null
      elegida = opcion

      botones.forEach((b) => {
        const activa = b.opcion === elegida
        b.boton.className = 'opcion opcion--vertical' + (activa ? ' opcion--acierto' : '')
        b.boton.setAttribute('aria-pressed', activa ? 'true' : 'false')
      })

      /* Todas sirven, así que lo que cuenta Dani es el mismo mensaje
         para cualquier opción: se pone una sola vez. */
      if (primera) {
        NA.poner(final, [
          NA.h(
            'div',
            { class: 'respuesta respuesta--acierto', role: 'status' },
            NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, situacion.cierre)),
          ),
          NA.boton(NA.textos.comun.seguir, { alTocar: alTerminar }),
        ])
        NA.llevarALaVista(final)
      }
    }

    return NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
      NA.dani(situacion.texto),
      NA.h('h2', { class: 'centro' }, situacion.pregunta),
      NA.h(
        'div',
        { class: 'opciones opciones--dos' },
        botones.map((b) => b.boton),
      ),
      final,
    ])
  }
})()
