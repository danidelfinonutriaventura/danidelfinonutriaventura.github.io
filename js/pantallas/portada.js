/* ============================================================
   PORTADA
   ------------------------------------------------------------
   La foto de Dani va dentro de un marco circular fijo.
   Para cambiarla, reemplazá assets/dani.jpg por otra imagen con
   el mismo nombre. El diseño no hay que tocarlo.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** Las estrellitas del fondo: cada una con su tamaño. Dónde va cada
      una lo decide el CSS (destello--1, destello--2, …). */
  const DESTELLOS = [
    { clase: 'destello--1', tam: 26 },
    { clase: 'destello--2', tam: 18 },
    { clase: 'destello--3', tam: 22 },
    { clase: 'destello--4', tam: 15 },
    { clase: 'destello--5', tam: 20 },
    { clase: 'destello--6', tam: 14 },
    { clase: 'destello--7', tam: 24 },
  ]

  /** Los alimentos que giran alrededor de la foto. */
  const ORBITA = [
    { id: 'frutilla', clase: 'orbita--1' },
    { id: 'naranja', clase: 'orbita--2' },
    { id: 'brocoli', clase: 'orbita--3' },
    { id: 'choclo', clase: 'orbita--4' },
    { id: 'agua', clase: 'orbita--5' },
    { id: 'uvas', clase: 'orbita--6' },
  ]

  NA.pantallaPortada = function pantallaPortada() {
    const t = NA.textos.portada

    const cuerpo = NA.h(
      'main',
      {
        class: 'pantalla__cuerpo entra-' + NA.estado.direccion,
        'aria-label': 'Portada de NutriAventura',
      },
      [
        NA.h('img', {
          class: 'portada__logo',
          src: 'assets/logo.png',
          alt: 'Dani Delfino, Nutricionista',
        }),

        NA.h('div', { class: 'portada__retrato' }, [
          NA.h(
            'div',
            { class: 'portada__marco' },
            NA.h('img', {
              src: 'assets/dani.jpg',
              alt: 'Dani, Licenciada en Nutrición, sonriendo',
            }),
          ),
          ORBITA.map((o) =>
            NA.h(
              'span',
              { class: 'portada__orbita ' + o.clase },
              NA.h('span', {
                class: 'portada__flota',
                html: NA.dibujoAlimento(o.id, 64, { informativo: false }),
              }),
            ),
          ),
        ]),

        NA.h('div', { class: 'centro' }, [
          NA.h('h1', { class: 'portada__saludo' }, t.saludo),
          NA.h('p', { class: 'portada__presenta' }, t.presentacion),
          NA.h('p', null, t.invitacion),
          NA.h('p', { class: 'portada__pregunta' }, t.pregunta),
        ]),

        NA.boton(t.boton, {
          alTocar: () => NA.despachar({ tipo: 'irA', pantalla: 'nombre' }),
        }),
      ],
    )

    return NA.h('div', { class: 'pantalla fondo-celeste portada' }, [
      NA.svg(NA.dibujoEscena('nube', 200, 'deco portada__nube portada__nube--1')),
      NA.svg(NA.dibujoEscena('nube', 150, 'deco portada__nube portada__nube--2')),

      /* Estrellitas titilando por toda la portada. Cada una tiene su
         tamaño y su retraso, así no parpadean todas a la vez. */
      DESTELLOS.map((d) =>
        NA.svg(NA.dibujoEscena('destello', d.tam, 'deco portada__destello ' + d.clase)),
      ),

      cuerpo,
    ])
  }
})()
