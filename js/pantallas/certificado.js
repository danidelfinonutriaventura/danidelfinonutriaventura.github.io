/* ============================================================
   CERTIFICADO
   ------------------------------------------------------------
   Se maqueta en HTML, no como imagen: el nombre entra como texto
   real, así imprime nítido a cualquier tamaño.

   Impresión: hoja A4 horizontal (mirá css/pantallas.css, al final
   del bloque del certificado). Desde el mismo diálogo de impresión
   se puede elegir "Guardar como PDF".

   Descarga: se dibuja aparte en un lienzo (certificado-imagen.js)
   y se baja como PNG. Todo dentro del dispositivo.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /* Abajo van dos alimentos dibujados; arriba a la izquierda va la
     frutilla de marca de Dani, como sello. La esquina de arriba a la
     derecha la ocupa la cinta de "NutriAventura completada". */
  const ESQUINAS = ['brocoli', 'uvas']

  function fechaDeHoy() {
    return new Date().toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  NA.pantallaCertificado = function pantallaCertificado() {
    const c = NA.certificado
    const tieneNombre = NA.tieneNombre()

    let imagen = null
    let generando = false

    /* En celulares y tablets la descarga directa a veces abre el
       archivo en vez de guardarlo, así que además mostramos la imagen
       para poder guardarla con el dedo. */
    const esTactil = window.matchMedia('(hover: none)').matches

    /* ---------------- LA HOJA ---------------- */
    let estrellitas = ''
    for (let i = 0; i < NA.TOTAL_ESTRELLAS; i++) estrellitas += NA.icono.estrella(19)

    const marco = NA.h('div', { class: 'hoja__marco' }, [
      ESQUINAS.map((id, i) =>
        NA.h('span', {
          class: 'hoja__esquina hoja__esquina--' + (i + 1),
          html: NA.dibujoAlimento(id, 46, { informativo: false }),
        }),
      ),

      NA.h('p', { class: 'hoja__titulo' }, c.titulo),
      NA.h('p', { class: 'hoja__felicita' }, c.felicitaciones),
      NA.h('p', { class: 'hoja__bajada' }, c.bajada),

      NA.h('p', { class: 'hoja__reconoce' }, c.reconoce),
      tieneNombre
        ? NA.h(
            'p',
            {
              class: 'hoja__nombre',
              datos: { largo: NA.estado.nombre.length > 12 ? 'si' : 'no' },
            },
            NA.estado.nombre,
          )
        : NA.h('span', {
            class: 'hoja__linea',
            'aria-label': 'Línea para escribir el nombre',
          }),
      NA.h('p', { class: 'hoja__porCompletar' }, c.porCompletar),

      NA.h('div', { class: 'hoja__estrellas', 'aria-hidden': 'true', html: estrellitas }),

      NA.h('p', { class: 'hoja__frase' }, c.frase),

      NA.h('div', { class: 'hoja__pie' }, [
        NA.h('div', { class: 'hoja__fecha' }, fechaDeHoy()),
        NA.h(
          'div',
          { class: 'hoja__firma' },
          NA.h('img', { src: 'assets/logo-firma.png', alt: NA.marca.nombre }),
        ),
      ]),

      NA.h('span', { class: 'hoja__sello' }, c.sello),
    ])

    const hoja = NA.h(
      'div',
      { class: 'hoja', role: 'img', 'aria-label': c.titulo + '. ' + c.sello },
      marco,
    )

    /* ---------------- DESCARGAR COMO IMAGEN ---------------- */
    const avisoDescarga = NA.h('div')

    const botonDescargar = NA.boton('', { variante: 'suave' })
    const ponerTextoDescarga = () => {
      NA.vaciar(botonDescargar)
      NA.poner(botonDescargar, [
        NA.svg(NA.icono.descargar(22)),
        document.createTextNode(generando ? c.preparando : c.descargar),
      ])
      botonDescargar.disabled = generando
    }

    const descargar = async () => {
      if (generando) return
      generando = true
      ponerTextoDescarga()
      try {
        const esquinas = [].slice.call(hoja.querySelectorAll('.hoja__esquina svg'))
        const blob = await NA.dibujarCertificado({
          nombre: NA.estado.nombre,
          esquinas: esquinas,
          logoSrc: 'assets/logo-firma.png',
          fecha: fechaDeHoy(),
        })
        if (!blob) return

        if (imagen) URL.revokeObjectURL(imagen)
        imagen = URL.createObjectURL(blob)

        const nombreArchivo = tieneNombre
          ? 'NutriAventura-' + NA.estado.nombre.replace(/\s+/g, '-') + '.png'
          : 'NutriAventura.png'

        const enlace = document.createElement('a')
        enlace.href = imagen
        enlace.download = nombreArchivo
        document.body.appendChild(enlace)
        enlace.click()
        enlace.remove()

        NA.vaciar(avisoDescarga)
        NA.poner(
          avisoDescarga,
          NA.h('div', { class: 'descarga', role: 'status' }, [
            NA.h(
              'p',
              { class: 'descarga__aviso' },
              esTactil ? c.ayudaGuardarTactil : c.ayudaGuardar,
            ),
            NA.h('img', { class: 'descarga__imagen', src: imagen, alt: c.titulo }),
          ]),
        )
      } finally {
        generando = false
        ponerTextoDescarga()
      }
    }

    ponerTextoDescarga()
    botonDescargar.addEventListener('click', descargar)

    /* ---------------- IMPRIMIR ---------------- */
    const botonImprimir = NA.boton('', { alTocar: () => window.print() })
    NA.poner(botonImprimir, [
      NA.svg(NA.icono.imprimir(22)),
      document.createTextNode(c.imprimir),
    ])

    return NA.pantalla(
      [
        hoja,
        NA.h('div', { class: 'sin-imprimir', style: 'display:grid; gap:0.6rem' }, [
          botonImprimir,
          NA.h(
            'p',
            { class: 'centro', style: 'font-size:var(--t-chico); margin:0' },
            c.ayudaImpresion,
          ),
          botonDescargar,
          avisoDescarga,
          NA.boton(NA.textos.comun.seguir, {
            variante: 'suave',
            alTocar: () => NA.despachar({ tipo: 'irA', pantalla: 'cierre' }),
          }),
        ]),
      ],
      { titulo: 'Tu certificado', fondo: 'blanco' },
    )
  }
})()
