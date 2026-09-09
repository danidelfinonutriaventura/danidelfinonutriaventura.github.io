/* ============================================================
   ¿CÓMO TE LLAMÁS?
   ------------------------------------------------------------
   PRIVACIDAD: el nombre no viaja a ningún servidor. Solo vive en
   la memoria del navegador mientras dura la sesión.
   Poner el nombre es opcional.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  const MAXIMO = 20

  /** Deja solo letras, espacios y guiones. Recorta a 20 caracteres. */
  function limpiarNombre(valor) {
    return valor
      .replace(/[^\p{L}\p{M}\s'-]/gu, '')
      .replace(/\s{2,}/g, ' ')
      .slice(0, MAXIMO)
  }

  /** Primera letra en mayúscula, el resto como lo escribió. */
  function conMayuscula(valor) {
    const t = valor.trim()
    if (!t) return ''
    return t.charAt(0).toLocaleUpperCase('es-AR') + t.slice(1)
  }

  NA.pantallaNombre = function pantallaNombre() {
    const t = NA.textos.nombre
    const confirmar = (nombre) => NA.despachar({ tipo: 'ponerNombre', nombre })

    const campo = NA.h('input', {
      id: 'campo-nombre',
      class: 'campo',
      type: 'text',
      inputmode: 'text',
      autocomplete: 'off',
      autocorrect: 'off',
      spellcheck: 'false',
      maxlength: MAXIMO,
      placeholder: t.campo,
      'aria-describedby': 'ayuda-nombre',
    })

    const seguir = NA.boton(t.boton, { tipo: 'submit', deshabilitado: true })

    /* El botón se habilita recién cuando hay algo escrito. */
    campo.addEventListener('input', () => {
      const limpio = limpiarNombre(campo.value)
      if (limpio !== campo.value) campo.value = limpio
      seguir.disabled = limpio.trim().length === 0
    })

    const formulario = NA.h('form', { style: 'display:grid; gap:0.75rem' }, [
      NA.h('label', { class: 'oculto-visual', for: 'campo-nombre' }, t.campo),
      campo,
      NA.h(
        'p',
        { id: 'ayuda-nombre', class: 'centro', style: 'font-size:var(--t-chico); margin:0' },
        t.ayuda,
      ),
      seguir,
      NA.h(
        'button',
        { class: 'boton boton--texto', type: 'button', alTocar: () => confirmar('') },
        t.sinNombre,
      ),
    ])

    formulario.addEventListener('submit', (e) => {
      e.preventDefault()
      confirmar(conMayuscula(campo.value))
    })

    return NA.pantalla(
      [
        NA.h(
          'div',
          { class: 'centro', style: 'display:flex; justify-content:center; gap:0.5rem' },
          ['manzana', 'agua', 'frutilla'].map((id) =>
            NA.svg(NA.dibujoAlimento(id, 78, { informativo: false, clase: 'anim-flotar' })),
          ),
        ),
        NA.dani(t.titulo),
        formulario,
      ],
      {
        titulo: 'Tu nombre',
        fondo: 'rosa',
        cabecera: NA.cabecera({
          alVolver: () => NA.despachar({ tipo: 'irA', pantalla: 'portada' }),
        }),
      },
    )
  }
})()
