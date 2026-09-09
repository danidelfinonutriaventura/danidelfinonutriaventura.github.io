/* ============================================================
   CHARLANDO CON LA NUTRI — Dani por chat
   ------------------------------------------------------------
   Una charla de cinco preguntas que termina proponiendo un
   alimento para explorar durante la semana.

   Cómo funciona por dentro:
   · La conversación es una lista de mensajes que va creciendo.
   · Antes de cada mensaje de Dani se muestran los tres puntitos
     durante un segundo y medio, como cuando alguien escribe.
   · Al tocar una opción, los botones desaparecen y la respuesta
     se "escribe" sola en la barra de abajo antes de salir como
     globo enviado. El historial no se ensucia.
   · Cada mensaje lleva la hora, como en un chat de verdad.
   · No hay respuestas correctas: las cinco preguntas son de
     gusto. Por eso esta pantalla no da estrellas.

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

  NA.pantallaDesafioSemana = function pantallaDesafioSemana() {
    const CHAT = NA.CHAT

    /* Lo que va cambiando durante la charla. */
    let mensajes = []
    let escribiendo = true
    let turno = 'nada' // nada | animo | textura | color | compania | primero
    let borrador = null // lo que se ve escribiéndose en la barra de abajo
    let textura = null
    let alimento = null
    let terminado = false
    /** La compañía elegida, guardada para armar la frase del final. */
    let compania = ''

    const relojes = []
    const caja = NA.h('div')
    let hilo = null // la caja de la conversación, para llevarla al final

    const agregar = (m) => {
      m.hora = horaActual()
      mensajes = mensajes.concat([m])
    }

    /* Agenda un mensaje de Dani: primero los puntitos, después el texto. */
    function escribir(id, texto, despues) {
      escribiendo = true
      dibujar()
      relojes.push(
        window.setTimeout(() => {
          if (!caja.isConnected) return
          escribiendo = false
          agregar({ id: id, de: 'dani', texto: texto })
          dibujar()
          if (despues) despues()
        }, ESCRIBIENDO),
      )
    }

    /* La respuesta del chico se escribe sola en la barra de abajo y
       recién después sale como globo. */
    function responder(id, etiqueta, despues) {
      turno = 'nada'

      const enviar = () => {
        if (!caja.isConnected) return
        borrador = null
        agregar({ id: id, de: 'chico', texto: etiqueta })
        dibujar()
        despues()
      }

      if (menosMovimiento()) {
        borrador = etiqueta
        dibujar()
        relojes.push(window.setTimeout(enviar, 500))
        return
      }

      borrador = ''
      dibujar()
      let letras = 0
      const tipear = () => {
        if (!caja.isConnected) return
        letras += 2
        borrador = etiqueta.slice(0, letras)
        dibujar()
        relojes.push(
          window.setTimeout(
            letras < etiqueta.length ? tipear : enviar,
            letras < etiqueta.length ? TECLA : 340,
          ),
        )
      }
      relojes.push(window.setTimeout(tipear, 140))
    }

    /* --- Las cinco respuestas --- */

    const responderAnimo = (etiqueta) =>
      responder('r1', etiqueta, () =>
        escribir('p2', CHAT.pregunta2, () => {
          turno = 'textura'
          dibujar()
        }),
      )

    const responderTextura = (id, etiqueta) => {
      textura = id
      responder('r2', etiqueta, () =>
        escribir('p3', CHAT.pregunta3, () => {
          turno = 'color'
          dibujar()
        }),
      )
    }

    const responderColor = (id, etiqueta) => {
      const elegido = NA.CRUCE[id][textura || 'crujiente']
      responder('r3', etiqueta, () =>
        escribir('resultado', CHAT.resultado, () => {
          /* El dibujo entra justo debajo del mensaje, no al final. */
          agregar({ id: 'alimento', de: 'dani', alimento: elegido })
          alimento = elegido
          dibujar()
          escribir('p4', CHAT.pregunta4, () => {
            turno = 'compania'
            dibujar()
          })
        }),
      )
    }

    const responderCompania = (etiqueta, frase) =>
      responder('r4', etiqueta, () => {
        compania = frase
        escribir('p5', CHAT.pregunta5, () => {
          turno = 'primero'
          dibujar()
        })
      })

    const responderPrimero = (etiqueta, frase) =>
      responder('r5', etiqueta, () => {
        const cierre = CHAT.despedida
          .replace('{conQuien}', compania)
          .replace('{primero}', frase)
        escribir('despedida', cierre, () => {
          escribir('final', CHAT.despedidaFinal, () => {
            escribir('suerte', NA.conNombre(CHAT.cierre, CHAT.cierreSinNombre), () => {
              terminado = true
              dibujar()
            })
          })
        })
      })

    /* El avatar sólo aparece en el primer mensaje de cada tanda, como
       en un chat de verdad: el de Dani a la izquierda y la frutilla
       del chico a la derecha. */
    const conAvatar = (i) => !mensajes[i - 1] || mensajes[i - 1].de !== mensajes[i].de

    /** Un botón de opción. */
    const opcion = (etiqueta, alTocar, extra, punto) =>
      NA.h(
        'button',
        {
          class: 'chat__opcion' + (extra ? ' ' + extra.clase : ''),
          style: extra ? 'border-color: ' + extra.tono : null,
          alTocar: alTocar,
        },
        [
          punto
            ? NA.h('span', {
                class: 'chat__punto',
                style: 'background: ' + punto,
                'aria-hidden': 'true',
              })
            : null,
          document.createTextNode(etiqueta),
        ],
      )

    function dibujar() {
      NA.vaciar(caja)

      /* ---------- La conversación ---------- */
      hilo = NA.h('div', {
        class: 'chat__hilo',
        role: 'log',
        'aria-live': 'polite',
        'aria-label': 'Conversación con Dani',
      })

      mensajes.forEach((m, i) => {
        const linea = NA.h('div', { class: 'chat__linea chat__linea--' + m.de })

        if (m.de === 'dani') {
          linea.appendChild(
            conAvatar(i)
              ? NA.h('img', {
                  class: 'chat__avatar',
                  src: 'assets/dani.jpg',
                  alt: '',
                  'aria-hidden': 'true',
                })
              : NA.h('span', { class: 'chat__avatar chat__avatar--hueco', 'aria-hidden': 'true' }),
          )
        }

        if (m.alimento) {
          linea.appendChild(
            NA.h('div', { class: 'chat__globo chat__globo--dani chat__premio' }, [
              NA.svg(NA.dibujoAlimento(m.alimento, 132)),
              NA.h('p', { class: 'chat__alimento' }, '¡' + NA.buscarAlimento(m.alimento).nombre + '!'),
              NA.h('span', { class: 'chat__hora' }, m.hora),
            ]),
          )
        } else {
          const hora = NA.h('span', { class: 'chat__hora' }, m.hora)
          if (m.de === 'chico') NA.poner(hora, NA.svg(ENVIADO))
          linea.appendChild(
            NA.h('div', { class: 'chat__globo chat__globo--' + m.de }, [
              document.createTextNode(m.texto),
              hora,
            ]),
          )
        }

        if (m.de === 'chico') {
          linea.appendChild(
            conAvatar(i)
              ? NA.h('span', {
                  class: 'chat__avatar chat__avatar--frutilla',
                  'aria-hidden': 'true',
                  html: NA.icono.frutillaSello(22),
                })
              : NA.h('span', { class: 'chat__avatar chat__avatar--hueco', 'aria-hidden': 'true' }),
          )
        }

        hilo.appendChild(linea)
      })

      if (escribiendo) {
        hilo.appendChild(
          NA.h('div', { class: 'chat__linea chat__linea--dani' }, [
            NA.h('span', { class: 'chat__avatar chat__avatar--hueco', 'aria-hidden': 'true' }),
            NA.h(
              'div',
              {
                class: 'chat__globo chat__globo--dani chat__puntos',
                'aria-label': 'Dani está escribiendo',
              },
              [NA.h('span'), NA.h('span'), NA.h('span')],
            ),
          ]),
        )
      }

      /* ---------- El armado de la pantalla ---------- */
      const chat = NA.h('div', { class: 'chat' }, [
        NA.h('header', { class: 'chat__cabecera' }, [
          NA.h('img', {
            class: 'chat__foto',
            src: 'assets/dani.jpg',
            alt: '',
            'aria-hidden': 'true',
          }),
          NA.h('div', null, [
            NA.h('p', { class: 'chat__nombre' }, NA.CABECERA.nombre),
            NA.h(
              'p',
              { class: 'chat__estado' },
              escribiendo ? NA.CABECERA.estadoEscribiendo : NA.CABECERA.estado,
            ),
          ]),
        ]),
        hilo,
      ])

      /* Mientras la respuesta se escribe sola, la barra de abajo
         muestra lo que se está tipeando. */
      if (borrador !== null) {
        chat.appendChild(
          NA.h('div', { class: 'chat__barra', 'aria-hidden': 'true' }, [
            NA.h('span', { class: 'chat__campo' }, [
              document.createTextNode(borrador),
              NA.h('span', { class: 'chat__cursor' }),
            ]),
            NA.h('span', {
              class: 'chat__enviar',
              html: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M3 20l18-8L3 4l4 8z" fill="currentColor"/></svg>',
            }),
          ]),
        )
      }

      /* Las opciones viven fuera del hilo y desaparecen al elegir. */
      if (turno === 'animo') {
        chat.appendChild(
          NA.h(
            'div',
            { class: 'chat__opciones' },
            NA.ANIMOS.map((a) => opcion(a.etiqueta, () => responderAnimo(a.etiqueta))),
          ),
        )
      } else if (turno === 'textura') {
        chat.appendChild(
          NA.h(
            'div',
            { class: 'chat__opciones' },
            NA.TEXTURAS.map((t) => opcion(t.etiqueta, () => responderTextura(t.id, t.etiqueta))),
          ),
        )
      } else if (turno === 'color') {
        chat.appendChild(
          NA.h(
            'div',
            { class: 'chat__opciones chat__opciones--colores' },
            NA.COLORES.map((c) =>
              opcion(
                c.etiqueta,
                () => responderColor(c.id, c.etiqueta),
                { clase: 'chat__opcion--color', tono: c.tono },
                c.tono,
              ),
            ),
          ),
        )
      } else if (turno === 'compania') {
        chat.appendChild(
          NA.h(
            'div',
            { class: 'chat__opciones' },
            NA.COMPANIA.map((c) => opcion(c.etiqueta, () => responderCompania(c.etiqueta, c.frase))),
          ),
        )
      } else if (turno === 'primero') {
        chat.appendChild(
          NA.h(
            'div',
            { class: 'chat__opciones chat__opciones--colores' },
            NA.PRIMEROS.map((p) => opcion(p.etiqueta, () => responderPrimero(p.etiqueta, p.frase))),
          ),
        )
      }

      /* Al terminar volvemos al mapa: ahí se ve abrirse el cofre. */
      const seguir =
        terminado && alimento
          ? NA.boton(CHAT.boton, {
              alTocar: () => {
                while (relojes.length) window.clearTimeout(relojes.pop())
                NA.despachar({ tipo: 'completarDesafio' })
                NA.despachar({ tipo: 'volverAlMapa' })
              },
            })
          : null

      NA.poner(
        caja,
        NA.pantalla([chat, seguir], { titulo: 'Charlando con la Nutri', fondo: 'celeste' }),
      )

      /* La conversación se desplaza sola dentro del hilo, sin mover la
         página: así la cabecera y la barra de abajo quedan siempre
         fijas, como en un chat de verdad. Esperamos un cuadro para que
         el dibujo del alimento ya ocupe su lugar; si no, medimos el
         alto viejo y el último mensaje queda fuera de la vista. */
      requestAnimationFrame(() => {
        if (hilo && hilo.isConnected) hilo.scrollTop = hilo.scrollHeight
      })
    }

    /* Arranque: el saludo y, enseguida, la primera pregunta. */
    escribir('saludo', NA.conNombre(CHAT.saludo, CHAT.saludoSinNombre), () => {
      escribir('p1', CHAT.pregunta1, () => {
        turno = 'animo'
        dibujar()
      })
    })

    return caja
  }
})()
