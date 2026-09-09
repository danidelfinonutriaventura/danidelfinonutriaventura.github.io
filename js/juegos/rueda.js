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

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    function dibujar() {
      const emocion = gajos.find((g) => g.id === elegida)
      NA.vaciar(caja)

      /* Las porciones, como una pizza: se juntan en el centro sin
         nada en el medio. */
      const porciones = gajos
        .map(
          (g) =>
            `<path class="rueda__gajo${
              elegida === g.id ? ' rueda__gajo--activo' : ''
            }" d="${g.d}" fill="${g.tono}" stroke="#791613" stroke-width="1.5" stroke-linejoin="round"/>`,
        )
        .join('')

      NA.poner(caja, [
        NA.h('h2', { class: 'centro' }, t.titulo),
        NA.dani(NA.INTRO_EMOCIONES),
        NA.h('p', { class: 'centro', style: 'font-size:var(--t-chico); margin:0' }, t.consigna),

        NA.h('div', { class: 'rueda' }, [
          NA.svg(
            `<svg class="rueda__dibujo" viewBox="0 0 ${LADO} ${LADO}" aria-hidden="true" focusable="false">${porciones}</svg>`,
          ),

          /* La frutilla de la marca tapa el punto donde se juntan las
             siete porciones, que quedaba sucio. Es decoración: el
             lector de pantalla la ignora. */
          NA.h('img', {
            class: 'rueda__frutilla',
            src: 'assets/sello-frutilla-claro.png',
            alt: '',
            'aria-hidden': 'true',
          }),

          gajos.map((g) =>
            NA.h(
              'button',
              {
                class: 'rueda__chip' + (elegida === g.id ? ' rueda__chip--activo' : ''),
                style: 'left: ' + g.izquierda + '%; top: ' + g.arriba + '%',
                'aria-pressed': elegida === g.id ? 'true' : 'false',
                alTocar: () => {
                  elegida = g.id
                  dibujar()
                },
              },
              g.nombre,
            ),
          ),
        ]),
      ])

      if (emocion) {
        const final = NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
          /* El recuadro se pinta del color de la emoción elegida. */
          NA.h(
            'div',
            {
              class: 'respuesta respuesta--emocion',
              role: 'status',
              style: 'background: ' + emocion.tono + '; border-color: ' + oscurecer(emocion.tono),
            },
            [
              NA.svg(NA.icono.lupa(44)),
              NA.h('div', null, [
                NA.h('p', { class: 'respuesta__titulo' }, emocion.nombre),
                NA.h('p', { class: 'respuesta__texto' }, emocion.texto),
              ]),
            ],
          ),
          NA.boton(t.seguir, { alTocar: alTerminar }),
        ])
        NA.poner(caja, final)
        NA.llevarALaVista(final)
      }
    }

    dibujar()
    return caja
  }

  /* ============================================================
     SITUACIÓN COTIDIANA Y ESTRATEGIAS
     ============================================================ */
  NA.juegoSituacion = function juegoSituacion(alTerminar) {
    const situacion = NA.alAzar(NA.SITUACIONES)
    let elegida = null

    const caja = NA.h('div', { style: 'display:grid; gap:0.85rem' })

    function dibujar() {
      NA.vaciar(caja)

      NA.poner(caja, [
        NA.dani(situacion.texto),
        NA.h('h2', { class: 'centro' }, situacion.pregunta),

        NA.h(
          'div',
          { class: 'opciones opciones--dos' },
          situacion.opciones.map((opcion) =>
            NA.h(
              'button',
              {
                class: 'opcion opcion--vertical' + (elegida === opcion ? ' opcion--acierto' : ''),
                'aria-pressed': elegida === opcion ? 'true' : 'false',
                alTocar: () => {
                  elegida = opcion
                  dibujar()
                },
              },
              opcion,
            ),
          ),
        ),
      ])

      if (elegida) {
        const final = NA.h('div', { style: 'display:grid; gap:0.85rem' }, [
          NA.h(
            'div',
            { class: 'respuesta respuesta--acierto', role: 'status' },
            NA.h('div', null, NA.h('p', { class: 'respuesta__texto' }, situacion.cierre)),
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
