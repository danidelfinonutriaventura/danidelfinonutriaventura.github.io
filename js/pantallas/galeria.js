/* ============================================================
   GALERÍA DE ILUSTRACIONES
   ------------------------------------------------------------
   Pantalla de control para ver todos los alimentos juntos y
   revisar que se vean bien.

   No forma parte de la aventura: solo se abre agregando ?galeria
   al final de la dirección. Por ejemplo:
   tusitio.com/?galeria
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  NA.pantallaGaleria = function pantallaGaleria() {
    const tarjeta = (a) =>
      NA.h(
        'div',
        {
          style:
            'background: var(--blanco); border: 3px solid var(--rosa-borde);' +
            'border-radius: var(--radio); padding: 0.6rem;' +
            'display: grid; justify-items: center; gap: 0.3rem',
        },
        [
          NA.svg(NA.dibujoAlimento(a.id, 96, { informativo: false })),
          NA.h('strong', { style: 'font-size: 0.85rem; text-transform: capitalize' }, a.nombre),
        ],
      )

    return NA.h(
      'div',
      { class: 'pantalla fondo-blanco' },
      NA.h(
        'main',
        { class: 'pantalla__cuerpo', 'aria-label': 'Galería de ilustraciones' },
        [
          NA.h('h1', { class: 'centro' }, 'Las ' + NA.ALIMENTOS.length + ' ilustraciones'),
          NA.h(
            'div',
            {
              style:
                'display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.75rem',
            },
            NA.ALIMENTOS.map(tarjeta),
          ),
        ],
      ),
    )
  }
})()
