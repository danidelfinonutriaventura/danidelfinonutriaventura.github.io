/* ============================================================
   CHARLANDO CON LA NUTRI — Dani por chat
   ------------------------------------------------------------
   Una charla de cinco preguntas que termina proponiendo un
   alimento para explorar durante la semana.

   Cómo funciona por dentro:
   · Antes de cada mensaje de Dani se muestran los tres puntitos
     durante un segundo y medio, como cuando alguien escribe.
   · Al tocar una opción, los botones desaparecen y la respuesta
     se "escribe" sola en la barra de abajo antes de salir como
     globo enviado. El historial no se ensucia.
   · Cada mensaje lleva la hora, como en un chat de verdad.
   · No hay respuestas correctas: las cinco preguntas son de
     gusto. Por eso esta pantalla no da estrellas.

   OJO SI TOCÁS ESTE ARCHIVO:
   los globos entran con una animación de CSS. Cada mensaje nuevo
   se AGREGA al final; nunca se vuelve a dibujar la conversación
   entera. Si se redibujara, todos los globos repetirían su
   animación de entrada cada vez y el chat parecería trabarse.

   Todo el texto está en js/contenido/desafio-semana.js.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  /** Cuánto tarda Dani en "escribir" cada mensaje. */
  const ESCRIBIENDO = 1500
  /** Cuánto tarda en aparecer cada par de letras de la respuesta. */
  const TECLA = 30

  /** La hora de ahora, como la muestra un chat: 14:05. */
  const horaActual = () =>
    new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })

  const menosMovimiento = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /** El tilde doble de "enviado", al lado de la hora. */
  const ENVIADO = `<svg class="chat__enviado" viewBox="0 0 20 12" width="16" height="10" aria-hidden="true" focusable="false">
    <path d="M1 6.6L4.2 10 10.6 2.2M8.4 6.6L11.6 10 18 2.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`

  const AVION = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M3 20l18-8L3 4l4 8z" fill="currentColor"/></svg>`

  NA.pantallaDesafioSemana = function pantallaDesafioSemana() {
    const CHAT = NA.CHAT

    let ultimoDe = null // de quién fue el mensaje anterior, para el avatar
    let textura = null
    let alimento = null
    let compania = ''
    const relojes = []

    /* ------------------------------------------------------------
       La pantalla se arma UNA vez.
       ------------------------------------------------------------ */
    const estado = NA.h('p', { class: 'chat__estado' }, CHAT ? NA.CABECERA.estado : '')

    const hilo = NA.h('div', {
      class: 'chat__hilo',
      role: 'log',
      'aria-live': 'polite',
      'aria-label': 'Conversación con Dani',
    })

    const barra = NA.h('div') // acá va la barra de tipeo o los botones
    const pie = NA.h('div') // acá va el botón SEGUIR

    const chat = NA.h('div', { class: 'chat' }, [
      NA.h('header', { class: 'chat__cabecera' }, [
        NA.h('img', { class: 'chat__foto', src: 'assets/dani.jpg', alt: '', 'aria-hidden': 'true' }),
        NA.h('div', null, [NA.h('p', { class: 'chat__nombre' }, NA.CABECERA.nombre), estado]),
      ]),
      hilo,
      barra,
    ])

    const caja = NA.pantalla([chat, pie], {
      titulo: 'Charlando con la Nutri',
      fondo: 'celeste',
    })

    /** Lleva la conversación al último mensaje, sin mover la página. */
    function alFinal() {
      requestAnimationFrame(() => {
        if (hilo.isConnected) hilo.scrollTop = hilo.scrollHeight
      })
    }

    /** El avatar: sólo en el primero de cada tanda, como en un chat real. */
    function avatarDe(de) {
      const primero = ultimoDe !== de
      if (!primero) {
        return NA.h('span', { class: 'chat__avatar chat__avatar--hueco', 'aria-hidden': 'true' })
      }
      return de === 'dani'
        ? NA.h('img', {
            class: 'chat__avatar',
            src: 'assets/dani.jpg',
            alt: '',
            'aria-hidden': 'true',
          })
        : NA.h('span', {
            class: 'chat__avatar chat__avatar--frutilla',
            'aria-hidden': 'true',
            html: NA.icono.frutillaSello(22),
          })
    }

    /** Agrega un mensaje al final. Nunca redibuja los anteriores. */
    function agregar(de, contenido) {
      const linea = NA.h('div', { class: 'chat__linea chat__linea--' + de })
      if (de === 'dani') linea.appendChild(avatarDe(de))
      linea.appendChild(contenido)
      if (de === 'chico') linea.appendChild(avatarDe(de))
      ultimoDe = de
      hilo.appendChild(linea)
      alFinal()
    }

    /** Un globo de texto, con su hora. */
    function globo(de, texto) {
      const hora = NA.h('span', { class: 'chat__hora' }, horaActual())
      if (de === 'chico') NA.poner(hora, NA.svg(ENVIADO))
      return NA.h('div', { class: 'chat__globo chat__globo--' + de }, [
        document.createTextNode(texto),
        hora,
      ])
    }

    /* ------------------------------------------------------------
       Los puntitos de "Dani está escribiendo"
       ------------------------------------------------------------ */
    let puntitos = null

    function mostrarPuntitos() {
      if (puntitos) return
      estado.textContent = NA.CABECERA.estadoEscribiendo
      puntitos = NA.h('div', { class: 'chat__linea chat__linea--dani' }, [
        NA.h('span', { class: 'chat__avatar chat__avatar--hueco', 'aria-hidden': 'true' }),
        NA.h(
          'div',
          {
            class: 'chat__globo chat__globo--dani chat__puntos',
            'aria-label': 'Dani está escribiendo',
          },
          [NA.h('span'), NA.h('span'), NA.h('span')],
        ),
      ])
      hilo.appendChild(puntitos)
      alFinal()
    }

    function sacarPuntitos() {
      if (puntitos) puntitos.remove()
      puntitos = null
      estado.textContent = NA.CABECERA.estado
    }

    /** Dani escribe un mensaje: primero los puntitos, después el texto. */
    function escribir(texto, despues) {
      mostrarPuntitos()
      relojes.push(
        window.setTimeout(() => {
          if (!caja.isConnected) return
          sacarPuntitos()
          agregar('dani', globo('dani', texto))
          if (despues) despues()
        }, ESCRIBIENDO),
      )
    }

    /* ------------------------------------------------------------
       Las opciones y el tipeo del chico
       ------------------------------------------------------------ */

    /** Muestra los botones para elegir. */
    function preguntar(lista, clase, alElegir) {
      NA.vaciar(barra)
      const caja = NA.h('div', { class: 'chat__opciones' + (clase ? ' ' + clase : '') })
      for (const o of lista) {
        caja.appendChild(
          NA.h(
            'button',
            {
              class: 'chat__opcion' + (o.tono ? ' chat__opcion--color' : ''),
              style: o.tono ? 'border-color: ' + o.tono : null,
              alTocar: () => alElegir(o),
            },
            [
              o.tono
                ? NA.h('span', {
                    class: 'chat__punto',
                    style: 'background: ' + o.tono,
                    'aria-hidden': 'true',
                  })
                : null,
              document.createTextNode(o.etiqueta),
            ],
          ),
        )
      }
      barra.appendChild(caja)
      alFinal()
    }

    /** La respuesta se escribe sola en la barra y después sale como globo. */
    function responder(etiqueta, despues) {
      NA.vaciar(barra)

      const campo = NA.h('span', { class: 'chat__campo' })
      const cursor = NA.h('span', { class: 'chat__cursor' })
      const letras = document.createTextNode('')
      NA.poner(campo, [letras, cursor])

      barra.appendChild(
        NA.h('div', { class: 'chat__barra', 'aria-hidden': 'true' }, [
          campo,
          NA.h('span', { class: 'chat__enviar', html: AVION }),
        ]),
      )

      const enviar = () => {
        if (!caja.isConnected) return
        NA.vaciar(barra)
        agregar('chico', globo('chico', etiqueta))
        despues()
      }

      if (menosMovimiento()) {
        letras.nodeValue = etiqueta
        relojes.push(window.setTimeout(enviar, 500))
        return
      }

      let n = 0
      const tipear = () => {
        if (!caja.isConnected) return
        n += 2
        letras.nodeValue = etiqueta.slice(0, n)
        relojes.push(
          window.setTimeout(n < etiqueta.length ? tipear : enviar, n < etiqueta.length ? TECLA : 340),
        )
      }
      relojes.push(window.setTimeout(tipear, 140))
    }

    /* ------------------------------------------------------------
       El guion de la charla
       ------------------------------------------------------------ */
    function pregunta1() {
      preguntar(NA.ANIMOS, '', (o) =>
        responder(o.etiqueta, () => escribir(CHAT.pregunta2, pregunta2)),
      )
    }

    function pregunta2() {
      preguntar(NA.TEXTURAS, '', (o) => {
        textura = o.id
        responder(o.etiqueta, () => escribir(CHAT.pregunta3, pregunta3))
      })
    }

    function pregunta3() {
      preguntar(NA.COLORES, 'chat__opciones--colores', (o) => {
        const elegido = NA.CRUCE[o.id][textura || 'crujiente']
        responder(o.etiqueta, () =>
          escribir(CHAT.resultado, () => {
            /* El dibujo entra justo debajo del mensaje, no al final. */
            const premio = NA.h('div', { class: 'chat__globo chat__globo--dani chat__premio' }, [
              NA.svg(NA.dibujoAlimento(elegido, 132)),
              NA.h('p', { class: 'chat__alimento' }, '¡' + NA.buscarAlimento(elegido).nombre + '!'),
              NA.h('span', { class: 'chat__hora' }, horaActual()),
            ])
            agregar('dani', premio)
            alimento = elegido
            escribir(CHAT.pregunta4, pregunta4)
          }),
        )
      })
    }

    function pregunta4() {
      preguntar(NA.COMPANIA, '', (o) =>
        responder(o.etiqueta, () => {
          compania = o.frase
          escribir(CHAT.pregunta5, pregunta5)
        }),
      )
    }

    function pregunta5() {
      preguntar(NA.PRIMEROS, 'chat__opciones--colores', (o) =>
        responder(o.etiqueta, () => {
          const cierre = CHAT.despedida
            .replace('{conQuien}', compania)
            .replace('{primero}', o.frase)
          escribir(cierre, () =>
            escribir(CHAT.despedidaFinal, () =>
              escribir(NA.conNombre(CHAT.cierre, CHAT.cierreSinNombre), terminar),
            ),
          )
        }),
      )
    }

    /* Al terminar volvemos al mapa: ahí se ve abrirse el cofre. */
    function terminar() {
      if (!alimento) return
      NA.poner(
        pie,
        NA.boton(CHAT.boton, {
          alTocar: () => {
            while (relojes.length) window.clearTimeout(relojes.pop())
            NA.despachar({ tipo: 'completarDesafio' })
            NA.despachar({ tipo: 'volverAlMapa' })
          },
        }),
      )
    }

    /* Arranque: el saludo y, enseguida, la primera pregunta. */
    escribir(NA.conNombre(CHAT.saludo, CHAT.saludoSinNombre), () =>
      escribir(CHAT.pregunta1, pregunta1),
    )

    return caja
  }
})()
