/* ============================================================
   EL MAPA DEL TESORO
   ------------------------------------------------------------
   Es el ÚNICO sistema de progreso de la aventura.
   No hay barra de progreso: el avance se ve en el camino, en las
   estaciones que se van abriendo y en las estrellas.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** Dónde se ubica cada estación dentro del mapa (en %). */
  const PUNTOS = [
    { x: 22, y: 89 },
    { x: 72, y: 76 },
    { x: 24, y: 62 },
    { x: 74, y: 48 },
    { x: 28, y: 34 },
  ]
  /* La charla con Dani es la última parada antes del cofre: va del
     lado opuesto a la estación 5, siguiendo el zigzag del camino. */
  const DESAFIO = { x: 72, y: 21 }
  /* El cofre va arriba y bien del otro lado de la charla: así el
     último tramo del camino se ve entero y el tesoro queda al final
     de la cuerda, no al costado. */
  const TESORO = { x: 26, y: 5 }
  /* El camino termina acá, al pie del cofre, y no en su centro: si
     llegara al centro, la cuerda se vería pasar por abajo y parecería
     que el tesoro quedó en el medio del camino. */
  const LLEGADA = { x: 30, y: 12 }

  const ACENTOS = ['amarillo', 'celeste', 'rosa', 'celeste', 'amarillo']

  /** Arma la curva que une todas las paradas, en orden. */
  function dibujarCamino(paradas) {
    let d = 'M ' + paradas[0].x + ' ' + paradas[0].y + ' '
    for (let i = 1; i < paradas.length; i++) {
      const a = paradas[i - 1]
      const p = paradas[i]
      const cy = (a.y + p.y) / 2
      d += `C ${a.x} ${cy}, ${p.x} ${cy}, ${p.x} ${p.y} `
    }
    return d.trim()
  }

  /** Una parada del mapa: el círculo con su ícono y la etiqueta. */
  function parada(o) {
    /* Estados: nunca se comunican solo por color. Cambian el ícono,
       el borde y el texto que lee el lector de pantalla. */
    const adentro =
      o.situacion === 'completada'
        ? NA.icono.tilde(26)
        : o.situacion === 'bloqueada'
          ? NA.icono.candado(22)
          : o.dibujo

    const circulo = o.dibujo || o.situacion !== 'disponible'
      ? NA.h('span', { class: 'estacion__circulo', 'aria-hidden': 'true', html: adentro })
      : NA.h('span', { class: 'estacion__circulo', 'aria-hidden': 'true' }, o.numero)

    return NA.h(
      'button',
      {
        class: 'estacion estacion--' + o.situacion + ' estacion--' + o.acento + (o.extra || ''),
        style: 'left:' + o.x + '%; top:' + o.y + '%',
        disabled: o.situacion === 'bloqueada',
        alTocar: o.alTocar,
        'aria-label': o.etiquetaAccesible,
      },
      [circulo, NA.h('span', { class: 'estacion__nombre', 'aria-hidden': 'true' }, o.nombre)],
    )
  }

  NA.pantallaMapa = function pantallaMapa() {
    const t = NA.textos.mapa
    const estado = NA.estado

    /* Las cinco estaciones terminadas abren la charla con Dani, y
       recién la charla abre el cofre. */
    const desafioAbierto =
      estado.completadas.length === 5 && NA.estrellas() >= NA.TOTAL_ESTRELLAS
    const completo = desafioAbierto && estado.desafioHecho

    const situacionDe = (n) => {
      if (estado.completadas.indexOf(n) !== -1) return 'completada'
      if (n <= estado.desbloqueadas) return 'disponible'
      return 'bloqueada'
    }

    const sitDesafio = estado.desafioHecho
      ? 'completada'
      : desafioAbierto
        ? 'disponible'
        : 'bloqueada'

    /* El camino une, en orden, las cinco estaciones, la charla y el
       pie del cofre. */
    const camino = dibujarCamino(PUNTOS.concat([DESAFIO, LLEGADA]))

    /* Paisaje de fondo: el pasto y la cuerda del camino. */
    const lienzo = NA.svg(
      `<svg class="mapa__lienzo" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 100 V72 Q20 62 44 70 T100 64 V100 Z" fill="#9FDB92"/>
        <path d="M0 100 V88 Q30 80 56 86 T100 82 V100 Z" fill="#7FCB6E"/>
        <path d="${camino}" fill="none" stroke="#EFB878" stroke-width="7" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        <path d="${camino}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 6" vector-effect="non-scaling-stroke"/>
      </svg>`,
    )

    const mapa = NA.h('div', { class: 'mapa' }, [
      lienzo,

      /* Decoración */
      NA.svg(NA.dibujoEscena('nube', 132, 'mapa__deco mapa__nube1')),
      NA.svg(NA.dibujoEscena('nube', 110, 'mapa__deco mapa__nube2')),
      NA.svg(NA.dibujoEscena('montana', 186, 'mapa__deco mapa__montana')),
      NA.svg(NA.dibujoEscena('arbol', 92, 'mapa__deco mapa__arbol1')),
      NA.svg(NA.dibujoEscena('arbol', 78, 'mapa__deco mapa__arbol2')),
      NA.svg(NA.dibujoEscena('flor', 44, 'mapa__deco mapa__flor1')),
      NA.svg(NA.dibujoEscena('flor', 40, 'mapa__deco mapa__flor2')),
      NA.svg(NA.dibujoEscena('bandera', 58, 'mapa__deco mapa__bandera')),
      NA.svg(NA.dibujoEscena('brujula', 86, 'mapa__deco mapa__brujula')),

      /* Estaciones */
      NA.textos.estaciones.map((est, i) => {
        const n = i + 1
        const sit = situacionDe(n)
        const ayuda =
          sit === 'bloqueada' ? t.bloqueada : sit === 'completada' ? t.completada : t.disponible
        return parada({
          situacion: sit,
          acento: ACENTOS[i],
          x: PUNTOS[i].x,
          y: PUNTOS[i].y,
          numero: String(n),
          nombre: est.titulo,
          etiquetaAccesible: 'Estación ' + n + ': ' + est.titulo + '. ' + ayuda,
          alTocar: () => NA.despachar({ tipo: 'abrirEstacion', numero: n }),
        })
      }),

      /* Última parada: la charla con Dani. No lleva número ni da
         estrellas; se distingue con el globo de diálogo. */
      parada({
        situacion: sitDesafio,
        acento: 'rosa',
        extra: ' estacion--charla',
        x: DESAFIO.x,
        y: DESAFIO.y,
        dibujo: NA.icono.globo(26),
        nombre: t.desafio,
        etiquetaAccesible:
          t.desafio +
          '. ' +
          (sitDesafio === 'bloqueada'
            ? t.desafioBloqueado
            : sitDesafio === 'completada'
              ? t.desafioCompletado
              : t.desafioDisponible),
        alTocar: () => NA.despachar({ tipo: 'irA', pantalla: 'desafioSemana' }),
      }),

      /* Tesoro */
      NA.h(
        'div',
        {
          class: 'mapa__tesoro' + (completo ? ' mapa__tesoro--listo' : ''),
          style: 'left:' + TESORO.x + '%; top:' + TESORO.y + '%',
        },
        [
          NA.svg(NA.dibujoEscena(completo ? 'cofreAbierto' : 'cofre', 64)),
          NA.h('span', { class: 'oculto-visual' }, completo ? t.tesoroListo : t.tesoroBloqueado),
        ],
      ),
    ])

    const barra = NA.h('div', { class: 'mapa__barra' }, [
      NA.contadorEstrellas(),
      NA.h('button', {
        class: 'mapa__reiniciar',
        'aria-label': t.reiniciar,
        title: t.reiniciar,
        html: NA.icono.reiniciar(20),
        alTocar: () =>
          NA.confirmar({
            titulo: NA.textos.reinicio.titulo,
            texto: NA.textos.reinicio.texto,
            confirmar: NA.textos.reinicio.confirmar,
            cancelar: NA.textos.reinicio.cancelar,
            alConfirmar: () => NA.despachar({ tipo: 'reiniciar' }),
          }),
      }),
    ])

    return NA.pantalla(
      [
        barra,
        NA.h('div', { class: 'centro' }, [
          NA.h('h1', { class: 'mapa__titulo' }, t.titulo),
          NA.h('p', { class: 'mapa__intro' }, NA.conNombre(t.introConNombre, t.intro)),
        ]),
        mapa,
        completo
          ? NA.boton(t.irAlTesoro, {
              alTocar: () => NA.despachar({ tipo: 'irA', pantalla: 'tesoro' }),
            })
          : NA.h('p', { class: 'centro mapa__ayuda' }, desafioAbierto ? t.ayudaDesafio : t.ayuda),
      ],
      { titulo: 'Mapa de la NutriAventura', fondo: 'celeste' },
    )
  }
})()
