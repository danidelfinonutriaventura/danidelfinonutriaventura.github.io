/* ============================================================
   CIERRE
   ------------------------------------------------------------
   Los botones de contacto solo aparecen si el dato está cargado
   en js/contenido/marca.js. Si algún día borrás el número de
   WhatsApp, el botón desaparece solo: nunca queda un enlace roto.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  NA.pantallaCierre = function pantallaCierre() {
    const t = NA.textos.cierre
    const m = NA.marca

    const hayInstagram = m.instagramUrl.trim().length > 0
    const hayWhatsapp = m.whatsappNumero.trim().length > 0

    /* Los dos botones de contacto llevan el ícono al lado del texto. */
    const conIcono = (dibujo, texto) => [NA.svg(dibujo), document.createTextNode(texto)]

    const contacto = []
    if (hayInstagram || hayWhatsapp) {
      contacto.push(NA.h('p', { class: 'centro cierre__seguimos' }, t.seguimos))

      const caja = NA.h('div', { class: 'cierre__contacto' })
      if (hayInstagram) {
        const b = NA.boton('', { variante: 'suave', href: m.instagramUrl })
        NA.poner(b, conIcono(NA.icono.instagram(22), t.instagram))
        caja.appendChild(b)
      }
      if (hayWhatsapp) {
        const b = NA.boton('', { variante: 'principal', href: NA.whatsappUrl })
        NA.poner(b, conIcono(NA.icono.whatsapp(22), t.whatsapp))
        caja.appendChild(b)
      }
      contacto.push(caja)

      if (hayInstagram) {
        contacto.push(NA.h('p', { class: 'centro cierre__usuario' }, m.instagramUsuario))
      }
    }

    return NA.pantalla(
      [
        NA.h(
          'div',
          { class: 'cierre__guirnalda', 'aria-hidden': 'true' },
          ['manzana', 'agua', 'brocoli', 'frutilla', 'banana'].map((id, i) =>
            NA.h('span', {
              class: 'anim-flotar',
              style: 'animation-delay: ' + i * 0.35 + 's',
              html: NA.dibujoAlimento(id, 56, { informativo: false }),
            }),
          ),
        ),

        NA.h('div', { class: 'centro' }, NA.h('h1', { class: 'cierre__gracias' }, t.gracias)),

        NA.h('img', {
          class: 'cierre__logo',
          src: 'assets/logo.png',
          alt: m.nombre + ', ' + m.profesion,
        }),

        NA.h('blockquote', { class: 'cierre__frase' }, m.fraseFinal),

        contacto,

        NA.svg(NA.dibujoEscena('flor', 34, 'cierre__flor')),

        NA.h(
          'button',
          { class: 'boton boton--texto', alTocar: () => NA.despachar({ tipo: 'reiniciar' }) },
          t.volverAJugar,
        ),
      ],
      { titulo: 'Gracias por jugar', fondo: 'rosa' },
    )
  }
})()
