/* ============================================================
   AYUDANTES PARA ARMAR LA PÁGINA
   ------------------------------------------------------------
   Acá está lo único "técnico" de todo el proyecto: una función
   corta para crear elementos y las piezas que se repiten en todas
   las pantallas (el botón, la cabecera, el globo de Dani).

   La función se llama `h` y se usa así:

       h('p', { class: 'centro' }, 'Hola')
       h('button', { class: 'boton', alTocar: fn }, 'SEGUIR')
       h('div', null, [unElemento, otroElemento])

   El tercer argumento pueden ser: texto, un elemento, una lista
   de elementos, o nada.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /**
   * Crea un elemento de la página.
   *
   * Propiedades especiales:
   *   alTocar   -> qué hacer cuando lo tocan (click)
   *   html      -> contenido tal cual, sin escapar (para los SVG)
   *   estilo    -> objeto con estilos: { color: 'red' }
   *   datos     -> objeto con data-*: { id: 'p1' }
   * Cualquier otra propiedad se pone como atributo.
   * Si el valor es null, false o undefined, el atributo no se pone.
   */
  NA.h = function h(etiqueta, props, hijos) {
    const el = document.createElement(etiqueta)
    const p = props || {}

    for (const clave of Object.keys(p)) {
      const valor = p[clave]
      if (valor === null || valor === undefined || valor === false) continue

      if (clave === 'alTocar') {
        el.addEventListener('click', valor)
      } else if (clave === 'html') {
        el.innerHTML = valor
      } else if (clave === 'estilo') {
        if (typeof valor === 'string') el.setAttribute('style', valor)
        else Object.assign(el.style, valor)
      } else if (clave === 'datos') {
        for (const d of Object.keys(valor)) el.dataset[d] = valor[d]
      } else if (clave === 'ref') {
        valor(el)
      } else if (valor === true) {
        el.setAttribute(clave, '')
      } else {
        el.setAttribute(clave, valor)
      }
    }

    NA.poner(el, hijos)
    return el
  }

  /** Agrega hijos a un elemento. Acepta texto, elementos o listas. */
  NA.poner = function poner(el, hijos) {
    if (hijos === null || hijos === undefined || hijos === false) return el
    if (Array.isArray(hijos)) {
      for (const hijo of hijos) NA.poner(el, hijo)
      return el
    }
    if (hijos instanceof Node) el.appendChild(hijos)
    else el.appendChild(document.createTextNode(String(hijos)))
    return el
  }

  /**
   * Convierte un dibujo SVG (que viene como texto) en un elemento de
   * verdad, sin envoltorios. Importa: el CSS del proyecto apunta a
   * clases que van sobre el propio <svg>, y si lo metiéramos dentro
   * de un <span> esas reglas no lo alcanzarían igual.
   */
  NA.svg = function svg(dibujo) {
    const caja = document.createElement('div')
    caja.innerHTML = String(dibujo).trim()
    return caja.firstElementChild
  }

  /** Vacía un elemento. */
  NA.vaciar = function vaciar(el) {
    while (el.firstChild) el.removeChild(el.firstChild)
    return el
  }

  /** Devuelve una copia de la lista, mezclada al azar. */
  NA.mezclar = function mezclar(lista) {
    const copia = lista.slice()
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const guardo = copia[i]
      copia[i] = copia[j]
      copia[j] = guardo
    }
    return copia
  }

  /** Uno al azar de la lista. */
  NA.alAzar = function alAzar(lista) {
    return lista[Math.floor(Math.random() * lista.length)]
  }

  /* ---------------- BOTÓN ---------------- */
  /**
   * opciones: { variante: 'principal' | 'suave' | 'texto',
   *             ancho: 'completo' | 'auto',
   *             href, alTocar, deshabilitado, tipo }
   */
  NA.boton = function boton(texto, opciones) {
    const o = opciones || {}
    const clase =
      'boton boton--' + (o.variante || 'principal') + (o.ancho === 'auto' ? ' boton--auto' : '')

    if (o.href) {
      return NA.h(
        'a',
        { class: clase, href: o.href, target: '_blank', rel: 'noopener noreferrer' },
        texto,
      )
    }
    return NA.h(
      'button',
      {
        class: clase,
        type: o.tipo || 'button',
        alTocar: o.alTocar,
        disabled: o.deshabilitado || false,
      },
      texto,
    )
  }

  /* ---------------- PANTALLA ---------------- */
  /**
   * El armazón de todas las pantallas: el fondo, el enlace para
   * saltar al contenido, la cabecera opcional y el cuerpo.
   *
   * opciones: { fondo, cabecera, pie, titulo }
   */
  NA.pantalla = function pantalla(contenido, opciones) {
    const o = opciones || {}
    const cuerpo = NA.h(
      'main',
      {
        class: 'pantalla__cuerpo entra-' + NA.estado.direccion,
        id: 'contenido',
        'aria-label': o.titulo || '',
      },
      contenido,
    )

    return NA.h('div', { class: 'pantalla fondo-' + (o.fondo || 'celeste') }, [
      NA.h('a', { class: 'saltar', href: '#contenido' }, NA.textos.comun.saltarAlContenido),
      o.cabecera || null,
      cuerpo,
      o.pie ? NA.h('div', { class: 'pantalla__pie' }, o.pie) : null,
    ])
  }

  /* ---------------- CABECERA ---------------- */
  /** opciones: { alVolver, centro, derecha } */
  NA.cabecera = function cabecera(opciones) {
    const o = opciones || {}
    const hueco = () => NA.h('span', { style: 'width:48px', 'aria-hidden': 'true' })

    return NA.h('div', { class: 'cabecera' }, [
      o.alVolver
        ? NA.h(
            'button',
            {
              class: 'cabecera__volver',
              alTocar: o.alVolver,
              'aria-label': NA.textos.comun.volver,
              html: NA.icono.flechaIzquierda(24),
            },
            null,
          )
        : hueco(),
      o.centro || NA.h('span'),
      o.derecha || hueco(),
    ])
  }

  /* ---------------- DANI HABLA ---------------- */
  /** El globo de diálogo con la foto de Dani. */
  NA.dani = function dani(texto, sinFoto) {
    return NA.h('div', { class: 'dani' }, [
      sinFoto
        ? null
        : NA.h('img', {
            class: 'dani__avatar',
            src: 'assets/dani.jpg',
            alt: 'Dani, Licenciada en Nutrición',
          }),
      NA.h('p', { class: 'dani__texto' }, texto),
    ])
  }

  /* ---------------- LLEVAR A LA VISTA ----------------
     Cuando el chico responde algo aparece la explicación y abajo el
     botón para seguir. En pantallas chicas ese botón puede quedar
     debajo del borde, y a los 6 años es muy fácil no darse cuenta
     de que hay que deslizar.

     Primero prueba con un deslizamiento suave, que es más amable.
     Pero el suave no siempre llega a ejecutarse, así que después
     comprueba y, si el botón sigue escondido, lo trae de un salto.
     Es más importante que el chico lo vea que la elegancia. */
  NA.llevarALaVista = function llevarALaVista(el) {
    if (!el) return

    /* Si el chico toca la pantalla o desliza mientras tanto, NO movemos
       nada: sería pelearle al dedo. Eso era lo que hacía que la página
       saltara cuando deslizaban para ver la barra del navegador. */
    let interrumpido = false
    const alTocar = () => {
      interrumpido = true
    }
    window.addEventListener('touchstart', alTocar, { passive: true })
    window.addEventListener('wheel', alTocar, { passive: true })
    const soltar = () => {
      window.removeEventListener('touchstart', alTocar)
      window.removeEventListener('wheel', alTocar)
    }

    /* Sólo hace falta bajar si el botón quedó por DEBAJO de lo que se
       ve. Medimos contra visualViewport, que en iPhone es el alto que
       de verdad está a la vista (descuenta la barra del navegador). */
    const quedoAbajo = () => {
      const alto = window.visualViewport ? window.visualViewport.height : window.innerHeight
      return el.getBoundingClientRect().bottom > alto
    }
    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.setTimeout(() => {
      if (interrumpido || !el.isConnected || !quedoAbajo()) return
      el.scrollIntoView({ behavior: menosMovimiento ? 'auto' : 'smooth', block: 'nearest' })
    }, 80)

    /* Red de seguridad: si el deslizamiento suave no llegó, saltamos.
       Pero sólo si nadie tocó la pantalla mientras tanto. */
    window.setTimeout(() => {
      soltar()
      if (interrumpido || !el.isConnected || !quedoAbajo()) return
      el.scrollIntoView({ behavior: 'auto', block: 'nearest' })
    }, 700)
  }

  /* ---------------- CONFIRMACIÓN ----------------
     Se usa antes de volver a empezar, para que nadie pierda su
     progreso por tocar un botón sin querer. */
  NA.confirmar = function confirmar(opciones) {
    const o = opciones

    const cerrar = () => {
      document.removeEventListener('keydown', alTeclear)
      velo.remove()
    }

    const cancelar = () => {
      cerrar()
      if (o.alCancelar) o.alCancelar()
    }

    const botonCancelar = NA.h(
      'button',
      { class: 'boton boton--suave', alTocar: cancelar },
      o.cancelar,
    )

    const modal = NA.h(
      'div',
      {
        class: 'modal',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'titulo-confirmacion',
      },
      [
        NA.h('h2', { id: 'titulo-confirmacion' }, o.titulo),
        NA.h('p', null, o.texto),
        NA.h('div', { style: 'display:grid; gap:0.6rem; margin-top:1rem' }, [
          botonCancelar,
          NA.boton(o.confirmar, {
            alTocar: () => {
              cerrar()
              o.alConfirmar()
            },
          }),
        ]),
      ],
    )
    modal.addEventListener('click', (e) => e.stopPropagation())

    const velo = NA.h('div', { class: 'velo', alTocar: cancelar }, modal)

    /* El foco entra al diálogo y no se escapa mientras está abierto. */
    const alTeclear = (e) => {
      if (e.key === 'Escape') return cancelar()
      if (e.key !== 'Tab') return
      const focusables = modal.querySelectorAll('button')
      if (!focusables.length) return
      const primero = focusables[0]
      const ultimo = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.body.appendChild(velo)
    document.addEventListener('keydown', alTeclear)
    botonCancelar.focus()
  }
})()
