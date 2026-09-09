/* ============================================================
   ÍCONOS PROPIOS
   ------------------------------------------------------------
   Reemplazan a los emojis: se ven igual en todos los dispositivos
   y no molestan a los lectores de pantalla.

   Casi todos usan currentColor, así que heredan el color del texto
   que los rodea. Todos están dibujados sobre un cuadrado de 24 x 24.

   Cada uno es una función que devuelve el SVG como texto:
       NA.icono.lupa(44)
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  const TRAZO = '#791613'

  /** El envoltorio <svg> común a todos. */
  const caja = (tam, clase, dentro) =>
    `<svg viewBox="0 0 24 24" width="${tam}" height="${tam}"${
      clase ? ` class="${clase}"` : ''
    } aria-hidden="true" focusable="false">${dentro}</svg>`

  NA.icono = {
    /* ---------- ESTRELLA ---------- */
    estrella: (tam, clase, llena) =>
      caja(
        tam || 28,
        clase,
        `<path d="M12 2.6l2.7 5.9 6.4.7-4.8 4.4 1.3 6.4L12 16.8 6.4 20l1.3-6.4L2.9 9.2l6.4-.7z" fill="${
          llena === false ? 'none' : '#FFF388'
        }" stroke="${TRAZO}" stroke-width="1.6" stroke-linejoin="round"/>`,
      ),

    /* ---------- NAVEGACIÓN ---------- */
    flechaIzquierda: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),

    candado: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<rect x="5" y="10" width="14" height="10" rx="3" fill="currentColor" opacity="0.9"/>
      <path d="M8.5 10V8a3.5 3.5 0 017 0v2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
      ),

    tilde: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),

    /* Frutilla bordó: es la carita del chico en el chat.
       No usamos el sello de marca porque lleva el nombre escrito y a
       30 píxeles no se leería. */
    frutillaSello: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M12 3.4c1.4-1.1 3.1-1.5 4.5-1.2-.4 1.2-1.4 2.1-2.7 2.5 1.3.2 2.5.7 3.3 1.5-1.5.7-3.4.8-5.1.3-1.7.5-3.6.4-5.1-.3.8-.8 2-1.3 3.3-1.5-1.3-.4-2.3-1.3-2.7-2.5 1.4-.3 3.1.1 4.5 1.2z" fill="${TRAZO}"/>
      <path d="M12 6.4c4.3 0 6.8 3.2 5.8 6.8C16.9 16.7 14.3 20.4 12 20.4S7.1 16.7 6.2 13.2C5.2 9.6 7.7 6.4 12 6.4z" fill="${TRAZO}"/>` +
          [
            [12, 10],
            [9, 12.4],
            [15, 12.4],
            [10.6, 15.2],
            [13.4, 15.2],
            [12, 17.8],
          ]
            .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.75" ry="1.05" fill="#F2BFE7"/>`)
            .join(''),
      ),

    /* Globo de diálogo: marca en el mapa la charla con Dani. */
    globo: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4.2 3.3a.6.6 0 01-1-.5V16A2.5 2.5 0 014 13.5z" fill="currentColor"/>
      <circle cx="8.6" cy="10" r="1.35" fill="#FFFFFF"/>
      <circle cx="12" cy="10" r="1.35" fill="#FFFFFF"/>
      <circle cx="15.4" cy="10" r="1.35" fill="#FFFFFF"/>`,
      ),

    reiniciar: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M19 12a7 7 0 11-2.4-5.3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M19 3.5V8h-4.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),

    /* ---------- ESTADOS DE RESPUESTA (nunca solo color) ---------- */
    chispa: (tam, clase) =>
      caja(
        tam || 28,
        clase,
        `<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="#F5C93B" stroke="${TRAZO}" stroke-width="1.4" stroke-linejoin="round"/>`,
      ),

    lupa: (tam, clase) =>
      caja(
        tam || 28,
        clase,
        `<circle cx="10.5" cy="10.5" r="6.5" fill="#B3E5FC" stroke="${TRAZO}" stroke-width="2.2"/>
      <path d="M15.2 15.2l4.6 4.6" stroke="${TRAZO}" stroke-width="3" stroke-linecap="round"/>`,
      ),

    /* ---------- SENTIDOS ---------- */
    ojo: (tam, clase) =>
      caja(
        tam || 32,
        clase,
        `<path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6-9.5-6-9.5-6z" fill="#B3E5FC" stroke="${TRAZO}" stroke-width="1.7" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="2.8" fill="${TRAZO}"/>`,
      ),

    nariz: (tam, clase) =>
      caja(
        tam || 32,
        clase,
        `<path d="M12 4v8c0 2-2 2.6-2 4a3 3 0 006 0" fill="none" stroke="${TRAZO}" stroke-width="1.9" stroke-linecap="round"/>
      <path d="M8 8q-2 4 0 7" fill="none" stroke="#F2BFE7" stroke-width="2.2" stroke-linecap="round"/>`,
      ),

    oreja: (tam, clase) =>
      caja(
        tam || 32,
        clase,
        `<path d="M8 10a4.5 4.5 0 019 0c0 3-3 3.5-3 6a2.5 2.5 0 01-4.5 1.2" fill="#FBDAF4" stroke="${TRAZO}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.5 10a1.6 1.6 0 013 .6" fill="none" stroke="${TRAZO}" stroke-width="1.6" stroke-linecap="round"/>`,
      ),

    lengua: (tam, clase) =>
      caja(
        tam || 32,
        clase,
        `<path d="M5 8h14a7 7 0 01-14 0z" fill="#E4453F" stroke="${TRAZO}" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M9 12.5q3 4 6 0" fill="#F2BFE7" stroke="${TRAZO}" stroke-width="1.5" stroke-linejoin="round"/>`,
      ),

    mano: (tam, clase) =>
      caja(
        tam || 32,
        clase,
        `<path d="M8 12V6.5a1.4 1.4 0 012.8 0V11m0-.5V5.6a1.4 1.4 0 012.8 0V11m0-.4V6.6a1.4 1.4 0 012.8 0V13c0 4-2.2 6.5-5.4 6.5S7 17.4 7 14.6l-1-2.4a1.4 1.4 0 012.3-1.5z" fill="#FBDAF4" stroke="${TRAZO}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),

    /* ---------- PAUSA CONSCIENTE ---------- */
    viento: (tam, clase) =>
      caja(
        tam || 32,
        clase,
        `<path d="M3 9h9a2.5 2.5 0 10-2.5-2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 14h13a2.5 2.5 0 11-2.5 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
      ),

    /* ---------- CONTACTO ---------- */
    instagram: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="17" cy="7" r="1.3" fill="currentColor"/>`,
      ),

    /* La marca de WhatsApp, tal cual la conoce todo el mundo: rellena
       y de una sola pieza, que es la única forma en que se reconoce.
       El trazo sale de Simple Icons, que publica los logos de marcas
       en dominio público (CC0). Se usa solamente para enlazar al
       WhatsApp de Dani, que es el uso que la propia marca contempla. */
    whatsapp: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>`,
      ),

    /* ---------- CERTIFICADO ---------- */
    imprimir: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M7 9V4h10v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <rect x="4" y="9" width="16" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M7 14h10v6H7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
      ),

    descargar: (tam, clase) =>
      caja(
        tam || 24,
        clase,
        `<path d="M12 4v10m0 0l-4-4m4 4l4-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 17v2h14v-2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
      ),
  }

  /* ---------- SEÑALES DEL CUERPO (formas abstractas, sin personas) ---------- */
  const trazo = 'fill="none" stroke="' + TRAZO + '" stroke-width="1.8" stroke-linecap="round"'
  const senal = (dentro, fondo) =>
    `<circle cx="12" cy="12" r="10.5" fill="${fondo}" stroke="${TRAZO}" stroke-width="1.6"/>${dentro}`

  const SENALES = {
    panza: senal(
      `<circle cx="12" cy="12" r="4" ${trazo}/>
      <path d="M18 8.5q1.6 3.5 0 7M6 8.5q-1.6 3.5 0 7" ${trazo}/>`,
      '#FFF388',
    ),
    energia: senal(`<path d="M13 6l-4 6h3l-1 6 4-6h-3z" fill="${TRAZO}"/>`, '#FFF388'),
    ganas: senal(
      `<path d="M12 6.5l1.4 3.6 3.6 1.4-3.6 1.4L12 17l-1.4-4.1L7 11.5l3.6-1.4z" fill="${TRAZO}"/>`,
      '#B3E5FC',
    ),
    concentrar: senal(`<path d="M12 12a3 3 0 113-3 5 5 0 11-5 5" ${trazo}/>`, '#B3E5FC'),
    comodo: senal(`<path d="M7 13q5 5 10 0" ${trazo}/>`, '#FBDAF4'),
    sinGanas: senal(`<path d="M7 12h10" ${trazo}/>`, '#FBDAF4'),
    tranquilo: senal(`<path d="M6 13q3-3 6 0t6 0" ${trazo}/>`, '#B3E5FC'),
    otraCosa: senal(
      `<path d="M7 15q5-8 10-2" ${trazo}/>
      <path d="M17 9v4h-4" ${trazo}/>`,
      '#FFF388',
    ),
  }

  NA.iconoSenal = function iconoSenal(id, tam, clase) {
    return caja(tam || 34, clase, SENALES[id] || SENALES.comodo)
  }
})()
