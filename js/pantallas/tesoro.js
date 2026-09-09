/* ============================================================
   NUTRITESORO
   ------------------------------------------------------------
   La celebración por haber completado las cinco estaciones y la
   charla con Dani.

   Al entrar pasa una estrella grande por el medio de la pantalla:
   es el festejo por terminar la aventura. Dura dos segundos, se
   apaga sola y no tapa ningún botón. Recién después se encienden
   las 20 estrellas de abajo.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** Cuánto dura el festejo, en milisegundos. */
  const FESTEJO = 2000

  /** Las estrellitas que salen disparadas, en grados alrededor del centro. */
  const CHISPAS = [0, 55, 120, 180, 235, 300]

  /* La estrella grande del final. Es decoración pura: va marcada como
     oculta para el lector de pantalla (el título ya cuenta lo que
     pasó) y no recibe toques, así el botón de abajo se puede apretar
     igual mientras pasa.
     Si el dispositivo pide menos movimiento, no aparece. */
  function estrellaDelFinal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

    const caja = NA.h('div', { class: 'festejo', 'aria-hidden': 'true' }, [
      NA.h('span', { class: 'festejo__halo' }),
      NA.h('span', { class: 'festejo__estrella', html: NA.icono.estrella(300) }),
      CHISPAS.map((grados) =>
        NA.h('span', {
          class: 'festejo__chispa',
          style: '--giro: ' + grados + 'deg',
          html: NA.icono.estrella(52),
        }),
      ),
    ])

    window.setTimeout(() => caja.remove(), FESTEJO)
    return caja
  }

  NA.pantallaTesoro = function pantallaTesoro() {
    const t = NA.textos.tesoro

    return NA.pantalla(
      [
        estrellaDelFinal(),

        NA.h('div', { class: 'tesoro' }, [
          NA.svg(NA.dibujoEscena('destello', 30, 'tesoro__destello tesoro__destello--1')),
          NA.svg(NA.dibujoEscena('destello', 22, 'tesoro__destello tesoro__destello--2')),
          NA.svg(NA.dibujoEscena('destello', 26, 'tesoro__destello tesoro__destello--3')),
          NA.svg(NA.dibujoEscena('cofreAbierto', 150, 'tesoro__cofre anim-latir')),
        ]),

        NA.h('div', { class: 'centro' }, [
          NA.h('h1', { class: 'tesoro__titulo' }, t.titulo),
          NA.h('p', { class: 'tesoro__texto' }, NA.conNombre(t.conNombre, t.texto)),
          NA.h('p', { class: 'tesoro__estrellas' }, t.estrellas),
        ]),

        NA.grillaEstrellas({ animar: true, retraso: FESTEJO - 400 }),

        NA.boton(t.boton, {
          alTocar: () => NA.despachar({ tipo: 'irA', pantalla: 'certificado' }),
        }),
      ],
      { titulo: 'NutriTesoro', fondo: 'amarillo' },
    )
  }
})()
