/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   DESAFÍO DE ALIMENTOS — LAS 6 PREGUNTAS
   ------------------------------------------------------------
   Reglas del desafío:
   · La estrella se gana por RESPONDER, no por acertar.
   · Siempre aparece una explicación, se responda lo que se responda.
   · Nunca se dice "está mal". Nunca hay X roja. Nunca se bloquea.

   Para cambiar una pregunta, editá el texto entre comillas.
   "correcta: 0" significa que la respuesta esperada es la PRIMERA
   opción de la lista TAL COMO ESTÁ ESCRITA ACÁ (se cuenta desde 0).

   OJO: en pantalla las opciones NO salen en este orden. El juego las
   mezcla en cada partida, para que la esperada no caiga siempre en el
   mismo lugar y la posición no se vuelva la pista. Así que acá podés
   escribirlas cómodas, con la esperada primera: el chico nunca las va
   a ver en ese orden.
   ============================================================ */



NA.PREGUNTAS = [
  {
    id: 'p1',
    eje: 'Educación alimentaria y variedad',
    formato: 'opcion',
    enunciado: '¿Por qué puede ser divertido explorar alimentos de distintos colores?',
    opciones: [
      { texto: 'Porque podemos descubrir diferentes sabores, formas, texturas y nutrientes' },
      { texto: 'Porque todos tienen exactamente los mismos nutrientes' },
      { texto: 'Solamente porque el plato queda más lindo' },
    ],
    correcta: 0,
    explicacion:
      'Explorar alimentos variados nos permite conocer diferentes sabores, texturas y nutrientes.',
  },
  {
    id: 'p2',
    eje: 'Hambre y señales corporales',
    formato: 'situacion',
    enunciado:
      'Estás jugando y sentís la panza haciendo ruido. ¿Qué puede estar avisándote tu cuerpo?',
    opciones: [
      { texto: 'Que puede tener hambre' },
      { texto: 'Que está enojado conmigo' },
      { texto: 'Que quiere que juegue más' },
    ],
    correcta: 0,
    explicacion:
      'El ruido de la panza es una de las señales que puede aparecer cuando tenemos hambre. Cada persona las siente a su manera.',
  },
  {
    id: 'p3',
    eje: 'Saciedad',
    formato: 'opcion',
    enunciado: '¿Cuál de estas señales puede aparecer cuando tu cuerpo está satisfecho?',
    opciones: [
      { texto: 'Me siento cómodo y ya no tengo ganas de seguir comiendo' },
      { texto: 'Me cuesta concentrarme' },
      { texto: 'La panza me hace ruido' },
    ],
    correcta: 0,
    explicacion:
      'Cuando el cuerpo está satisfecho suele sentirse cómodo y tranquilo. El ruido de la panza o que te cueste concentrarte son señales que aparecen más bien cuando tenemos hambre. Cada persona las siente a su manera.',
  },
  {
    id: 'p4',
    eje: 'Hidratación',
    formato: 'visual',
    enunciado:
      'Además del agua que tomás, hay alimentos con mucha agua adentro. ¿Cuál te parece que tiene bastante?',
    opciones: [
      { texto: 'Sandía', alimento: 'sandia' },
      { texto: 'Pan', alimento: 'pan' },
      { texto: 'Arroz', alimento: 'arroz' },
    ],
    correcta: 0,
    explicacion:
      '¡La sandía tiene muchísima agua! Las frutas y las verduras también te ayudan a hidratarte, además del agua que tomás cada día.',
  },
  {
    id: 'p5',
    eje: 'Nutrientes, crecimiento y desarrollo',
    formato: 'opcion',
    enunciado: 'Tu cuerpo está creciendo todos los días. ¿Qué necesita para crecer y desarrollarse?',
    opciones: [
      { texto: 'Nutrientes de los alimentos, descanso, movimiento y cuidado' },
      { texto: 'Comer siempre el mismo alimento' },
      { texto: 'Solo dormir' },
    ],
    correcta: 0,
    explicacion:
      'Para crecer y desarrollarte, tu cuerpo necesita nutrientes, descanso, movimiento y cuidados.',
  },
  {
    id: 'p6',
    eje: 'Exposición, exploración y autonomía',
    formato: 'situacion',
    enunciado: 'Aparece en la mesa un alimento que nunca probaste. ¿Qué podrías hacer?',
    opciones: [
      { texto: 'Mirarlo, olerlo, tocarlo y probarlo si tengo ganas' },
      { texto: 'Decidir que no me gusta sin explorarlo' },
      { texto: 'Taparme los ojos y que desaparezca' },
    ],
    correcta: 0,
    explicacion:
      'Conocer un alimento nuevo puede llevar tiempo. Podés mirarlo, olerlo, tocarlo y descubrir cómo es. Y probarlo es una decisión que podés explorar a tu ritmo.',
  },
]

/** Lo que dice Dani después de responder. Nunca dice "está mal". */
NA.REACCIONES = {
  acierto: '¡Muy bien!',
  otra: '¡Casi!',
}
