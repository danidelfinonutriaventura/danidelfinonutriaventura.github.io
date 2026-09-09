/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   CONOZCO LO QUE SIENTO — Estación 3
   ------------------------------------------------------------
   Reglas de contenido:
   · Nunca se afirma una relación automática entre una emoción
     y las ganas de comer. Siempre se usa "a veces" o "puede".
   · Las estrategias NUNCA se plantean como una forma de evitar
     comer. Son maneras de acompañar lo que sentimos.
   · No se usa la etiqueta "hambre emocional".
   ============================================================ */


NA.EMOCIONES = [
  {
    id: 'alegria',
    nombre: 'Alegría',
    tono: '#FFF388',
    texto:
      'La alegría se puede sentir en todo el cuerpo. A veces da ganas de moverse, de contarlo, de compartir. Cada persona la vive a su manera.',
  },
  {
    id: 'tristeza',
    nombre: 'Tristeza',
    tono: '#B3E5FC',
    texto:
      'La tristeza también forma parte de la vida. Puede aparecer con ganas de estar tranquilo o de que alguien te acompañe. Está bien sentirla.',
  },
  {
    id: 'enojo',
    nombre: 'Enojo',
    tono: '#F7B7B2',
    texto:
      'El enojo puede sentirse fuerte, como calor en la cara o en la panza. Es una emoción más, y puede pasar. Contarlo suele ayudar.',
  },
  {
    id: 'nervios',
    nombre: 'Nervios',
    tono: '#F5C4E8',
    texto:
      'Los nervios a veces se sienten como cosquillas en la panza. Pueden aparecer antes de algo importante. Cada persona los nota distinto.',
  },
  {
    id: 'cansancio',
    nombre: 'Cansancio',
    tono: '#C3E3AE',
    texto:
      'El cansancio es una señal de tu cuerpo. Puede pedirte descanso, silencio o un rato de calma.',
  },
  {
    id: 'aburrimiento',
    nombre: 'Aburrimiento',
    tono: '#D3C4F0',
    texto:
      'El aburrimiento puede aparecer cuando no sabemos bien qué hacer. A veces es el comienzo de una idea nueva.',
  },
  {
    id: 'calma',
    nombre: 'Calma',
    tono: '#AEE3D9',
    texto:
      'La calma se puede sentir como respirar tranquilo y sin apuro. Es un buen momento para escuchar cómo está tu cuerpo.',
  },
]

/** Texto que introduce la rueda. Nunca afirma relaciones automáticas. */
NA.INTRO_EMOCIONES =
  'Las emociones forman parte de nuestra vida. A veces pueden influir en nuestras ganas de comer, y cada persona puede sentirlo de una manera diferente.'

/* ============================================================
   SITUACIONES Y ESTRATEGIAS
   ------------------------------------------------------------
   Se sortea una situación por partida.
   Todas las opciones son válidas: son maneras distintas de
   transitar lo que sentimos. Ninguna habla de comida.
   ============================================================ */


NA.SITUACIONES = [
  {
    id: 'aburrido',
    emocion: 'aburrimiento',
    texto: 'Es una tarde larga y no sabés bien qué hacer. Aparece el aburrimiento.',
    pregunta: '¿Qué podrías hacer?',
    opciones: ['Dibujar', 'Jugar', 'Hablar con alguien', 'Descansar'],
    cierre:
      'Todas sirven. Una misma emoción puede acompañarse de cosas muy distintas, y vos podés elegir cuál probar.',
  },
  {
    id: 'nervioso',
    emocion: 'nervios',
    texto: 'Mañana pasa algo importante y sentís cosquillas en la panza.',
    pregunta: '¿Qué podrías hacer?',
    opciones: ['Contarlo', 'Respirar despacio', 'Escuchar música', 'Abrazar a alguien'],
    cierre:
      'Todas sirven. A veces ayuda hacer algo tranquilo, y a veces ayuda compartir lo que sentimos.',
  },
  {
    id: 'cansado',
    emocion: 'cansancio',
    texto: 'Jugaste, corriste y estudiaste. Ahora tenés sueño y pocas ganas de moverte.',
    pregunta: '¿Qué podrías hacer?',
    opciones: ['Descansar', 'Estar en silencio', 'Acostarte un rato', 'Pedir un abrazo'],
    cierre: 'Todas sirven. Escuchar el cansancio también es una forma de cuidarte.',
  },
]
