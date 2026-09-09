/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   DATOS DE DANI Y ENLACES
   ------------------------------------------------------------
   Este es el archivo que más vas a querer tocar si cambia
   tu Instagram, tu WhatsApp o tu frase final.
   Cambiá SOLO lo que está entre comillas.
   ============================================================ */

NA.marca = {
  /** Nombre tal como aparece en la portada, el certificado y el cierre. */
  nombre: 'Lic. Dani Delfino',

  /** Profesión, debajo del nombre. */
  profesion: 'Licenciada en Nutrición',

  /** Usuario de Instagram, con la arroba. */
  instagramUsuario: '@lic.danidelfino',

  /** Enlace directo al perfil de Instagram. */
  instagramUrl: 'https://www.instagram.com/lic.danidelfino/',

  /**
   * WhatsApp profesional.
   * El número va sin el signo +, sin espacios y sin guiones.
   * +54 9 358 243 7247  ->  5493582437247
   * No lleva mensaje precargado: abre el chat vacío.
   */
  whatsappNumero: '5493582437247',

  /**
   * FRASE FINAL DE DANI (pantalla de cierre).
   * Aprobada por Dani el 5 de septiembre de 2026.
   */
  fraseFinal:
    'Qué lindo que hayas llegado hasta acá. Ojalá sigas explorando, probando y escuchando a tu cuerpo: la alimentación también es una forma de crecer y descubrir.',
}

/** Arma el enlace de WhatsApp. No toques esto. */
NA.whatsappUrl = `https://wa.me/${NA.marca.whatsappNumero}`
