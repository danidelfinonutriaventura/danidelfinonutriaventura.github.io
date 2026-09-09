/* ============================================================
   UNA ESTACIÓN DEL MAPA
   ------------------------------------------------------------
   Cada estación tiene una entrada, una o más actividades y un
   cierre. Esta pantalla es la que va pasando de una a la otra y
   la que reparte las estrellas.

   Las estrellas se ganan POR PARTICIPAR: se dan al terminar la
   actividad, se haya acertado o no.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** Qué actividades tiene cada estación, en orden. */
  const GUION = {
    1: ['arcoiris', 'sentidos'],
    2: ['desafio'],
    3: ['rueda', 'estrategias', 'hambre', 'saciedad'],
    4: ['respiracion'],
    5: ['memotest'],
  }

  /* La estación 4 va en rosa: el círculo de la respiración es celeste
     y sobre fondo celeste se confundía con el fondo. */
  const FONDOS = ['amarillo', 'celeste', 'rosa', 'rosa', 'celeste']

  NA.pantallaEstacion = function pantallaEstacion() {
    const numero = NA.estado.estacionAbierta || 1
    const info = NA.textos.estaciones[numero - 1]
    const guion = GUION[numero]

    /* -1 = pantalla de entrada. guion.length = pantalla de cierre.
       Con ?vista=e3&paso=2 se entra directo a una actividad. */
    let paso = NA.pasoDeVistaPrevia()
    let ganadas = 0
    let jugandoNivel2 = false

    const volver = () => NA.despachar({ tipo: 'volverAlMapa' })

    /** Da la estrella solo si esa actividad no la dio antes. */
    const otorgar = (clave) => {
      if (NA.estado.actividades.indexOf(clave) !== -1) return
      const cuantas =
        clave.charAt(0) === 'p' && clave.length === 2
          ? NA.ESTRELLAS_POR_ACTIVIDAD.preguntaRespondida
          : NA.ESTRELLAS_POR_ACTIVIDAD[clave] || 0
      ganadas += cuantas
      NA.despachar({ tipo: 'completarActividad', clave })
    }

    const avanzar = (clave) => {
      if (clave) otorgar(clave)
      paso += 1
      if (paso >= guion.length) {
        NA.despachar({ tipo: 'completarEstacion', numero: numero })
        if (numero === 5) NA.despachar({ tipo: 'habilitarMemotest2' })
      }
      window.scrollTo({ top: 0, behavior: 'auto' })
      dibujar()
    }

    const caja = NA.h('div')

    /** Devuelve el juego que corresponde a esta actividad. */
    function juegoDe(actividad) {
      switch (actividad) {
        case 'arcoiris':
          return NA.juegoArcoiris(() => avanzar('arcoiris'))
        case 'sentidos':
          return NA.juegoSentidos(() => avanzar('sentidos'))
        case 'desafio':
          return NA.juegoDesafio(otorgar, () => avanzar())
        case 'rueda':
          return NA.juegoRueda(() => avanzar('rueda'))
        case 'estrategias':
          return NA.juegoSituacion(() => avanzar('estrategias'))
        case 'hambre':
          return NA.juegoSenales('hambre', () => avanzar('hambre'))
        case 'saciedad':
          return NA.juegoSenales('saciedad', () => avanzar('saciedad'))
        case 'respiracion':
          return NA.juegoRespiracion(() => avanzar('respiracion'))
        case 'memotest':
          return NA.juegoMemotest(1, () => avanzar('memotest'))
        default:
          return null
      }
    }

    function dibujar() {
      NA.vaciar(caja)

      const opciones = {
        titulo: info.titulo,
        fondo: FONDOS[numero - 1],
        /* El nombre de la estación va en su propio renglón, centrado,
           y no dentro de la cabecera. Ahí compartía fila con el botón
           de volver y con el contador de estrellas, que son de anchos
           distintos, así que quedaba corrido a la izquierda: en un
           celular no hay lugar para centrarlo entre los dos. */
        cabecera: NA.cabecera({ alVolver: volver, derecha: NA.contadorEstrellas() }),
      }
      const chapa = () => NA.h('p', { class: 'chapa-estacion' }, info.titulo)

      /* ---------------- ENTRADA ---------------- */
      if (paso === -1) {
        return NA.poner(
          caja,
          NA.pantalla(
            [
              NA.h('div', { class: 'centro' }, [
                NA.h('h1', null, info.titulo),
                NA.h('p', null, info.subtitulo),
              ]),
              NA.dani(NA.conNombre(info.intro, info.introSinNombre)),
              NA.boton(NA.textos.comun.empezar, {
                alTocar: () => {
                  paso = 0
                  dibujar()
                },
              }),
            ],
            opciones,
          ),
        )
      }

      /* ---------------- CIERRE ---------------- */
      if (paso >= guion.length) {
        let adentro
        if (jugandoNivel2) {
          adentro = [
            chapa(),
            NA.juegoMemotest(2, () => {
              jugandoNivel2 = false
              dibujar()
            }),
          ]
        } else {
          adentro = [
            chapa(),
            NA.dani(info.cierre),
            NA.estrellasGanadas(ganadas),
            numero === 5
              ? [
                  NA.h(
                    'p',
                    { class: 'centro', style: 'font-size:var(--t-chico); margin-bottom:0' },
                    NA.textos.memotest.nivel2Aviso,
                  ),
                  NA.boton(NA.textos.memotest.jugarNivel2, {
                    variante: 'suave',
                    alTocar: () => {
                      jugandoNivel2 = true
                      dibujar()
                    },
                  }),
                ]
              : null,
            NA.boton(NA.textos.comun.volverAlMapa, { alTocar: volver }),
          ]
        }
        return NA.poner(caja, NA.pantalla(adentro, opciones))
      }

      /* ---------------- ACTIVIDADES ---------------- */
      NA.poner(
        caja,
        NA.pantalla(
          [chapa(), NA.h('div', { class: 'entra-adelante' }, juegoDe(guion[paso]))],
          opciones,
        ),
      )
    }

    dibujar()
    return caja
  }
})()
