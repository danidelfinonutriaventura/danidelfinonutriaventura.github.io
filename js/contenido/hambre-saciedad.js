/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   HAMBRE Y SACIEDAD — Estación 3
   ------------------------------------------------------------
   Regla de contenido más importante de este archivo:
   hambre y saciedad se trabajan como SEÑALES DEL CUERPO,
   nunca como reglas sobre cuánto comer.
   · No se habla de cantidades.
   · No se habla del plato ni de terminar la comida.
   · Todas las señales son válidas: el chico marca las que
     reconoce en su propio cuerpo. No hay respuestas correctas.
   ============================================================ */


NA.BLOQUES_SENALES = [
  {
    id: 'hambre',
    titulo: 'Señales de hambre',
    intro:
      'El hambre son señales que pueden aparecer cuando nuestro cuerpo necesita energía.',
    consigna: 'Tocá las señales que a veces notás vos. Podés elegir todas las que quieras.',
    senales: [
      { id: 'panza', texto: 'La panza hace ruido', icono: 'panza' },
      { id: 'energia', texto: 'Tengo menos energía', icono: 'energia' },
      { id: 'ganas', texto: 'Me dan ganas de comer', icono: 'ganas' },
      { id: 'concentrar', texto: 'Me cuesta concentrarme', icono: 'concentrar' },
    ],
    cierre:
      'Cada persona siente el hambre a su manera, y a veces cambia según el día. Reconocer tus señales es una forma de conocerte.',
  },
  {
    id: 'saciedad',
    titulo: 'Señales de saciedad',
    intro:
      'La saciedad son señales que pueden aparecer cuando estamos satisfechos y cómodos.',
    consigna: 'Tocá las señales que a veces notás vos. Podés elegir todas las que quieras.',
    senales: [
      { id: 'comodo', texto: 'Me siento cómodo', icono: 'comodo' },
      { id: 'sinGanas', texto: 'Ya no tengo ganas de seguir comiendo', icono: 'sinGanas' },
      { id: 'tranquilo', texto: 'Mi panza se siente tranquila', icono: 'tranquilo' },
      { id: 'otraCosa', texto: 'Tengo ganas de hacer otra cosa', icono: 'otraCosa' },
    ],
    cierre:
      'La saciedad también es información de tu cuerpo. Escucharla te ayuda a conocerte un poco más.',
  },
]
