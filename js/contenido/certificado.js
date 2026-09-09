/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   CERTIFICADO
   ------------------------------------------------------------
   Aparece SOLO al completar las 5 estaciones y las 20 estrellas.
   Certifica haber RECORRIDO la aventura, no haber aprobado nada.
   ============================================================ */

NA.certificado = {
  titulo: 'CERTIFICADO DE NUTRIAVENTURA',
  felicitaciones: '¡Felicitaciones!',
  bajada: 'Hoy descubriste que cuidar nuestra alimentación también puede ser una aventura.',
  reconoce: 'Este certificado reconoce a:',
  /** Si el chico no puso su nombre, aparece una línea para escribirlo a mano. */
  porCompletar: 'por completar la NutriAventura',
  sello: 'NutriAventura completada',

  /**
   * FRASE DEL CERTIFICADO.
   * Aprobada por Dani el 5 de septiembre de 2026.
   */
  frase: 'Cada vez que explorás, probás y escuchás a tu cuerpo, estás creciendo un poco más.',

  /* Botones */
  imprimir: 'IMPRIMIR MI CERTIFICADO',
  descargar: 'DESCARGAR COMO IMAGEN',
  preparando: 'PREPARANDO LA IMAGEN…',
  seguir: 'SEGUIR',
  ayudaImpresion:
    'Al imprimir vas a poder elegir "Guardar como PDF" si preferís tenerlo en el celular o la computadora.',
  ayudaGuardar: '¡Listo! Ya se descargó tu certificado.',
  ayudaGuardarTactil:
    '¡Listo! Si no se guardó solo, mantené presionada la imagen y elegí "Guardar imagen".',
}
