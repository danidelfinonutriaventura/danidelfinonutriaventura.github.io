/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   DESCUBRO CON MIS SENTIDOS — Estación 1
   ------------------------------------------------------------
   NO hay respuestas correctas ni incorrectas.
   El objetivo es observar, imaginar y registrar sensaciones.
   Siempre existe la opción "No sé todavía", que es una
   respuesta perfectamente válida.

   CÓMO SE ARMA CADA OPCIÓN
   Cada opción trae su propia respuesta de Dani:
       { texto: 'Redondo', respuesta: 'Lo que dice Dani' }
   La respuesta acompaña lo que el chico eligió: nunca lo corrige
   ni le dice que se equivocó. En "No sé todavía" le da una pista
   de cómo podría descubrirlo.
   Si el chico cambia de opción, la respuesta cambia con ella.
   ============================================================ */


/** Los seis alimentos que se pueden elegir para explorar. */
NA.ALIMENTOS_SENTIDOS = ['remolacha', 'banana', 'frutilla', 'zanahoria', 'brocoli', 'tomate']

NA.PASOS_SENTIDOS = [
  {
    id: 'vista',
    icono: 'ojo',
    pregunta: '¿Cómo se ve?',
    opciones: [
      {
        texto: 'Redondo',
        respuesta: '¡Redondito! Fijate si es redondo por todos lados o si tiene alguna parte más finita.',
      },
      {
        texto: 'Alargado',
        respuesta: '¡Alargado! Mirá si es igual de ancho de punta a punta o si de un lado es más finito.',
      },
      {
        texto: 'Con muchas partes',
        respuesta: '¡Muchas partes! Hay alimentos que parecen hechos de pedacitos juntos. ¿Cuántas le ves?',
      },
      {
        texto: 'Brillante',
        respuesta: '¡Brillante! Algunas cáscaras reflejan la luz como un espejito. ¿De qué color brilla?',
      },
      {
        texto: 'No sé todavía',
        respuesta: 'Mirar lleva su tiempo. Probá mirarlo de cerca: ¿qué color tiene? ¿Tiene puntas, hojitas o semillas?',
      },
    ],
  },
  {
    id: 'olfato',
    icono: 'nariz',
    pregunta: '¿Qué olor tiene?',
    opciones: [
      {
        texto: 'Dulce',
        respuesta: '¡Dulce! Los olores dulces suelen venir de las frutas bien maduras. ¿Te hace acordar a algo?',
      },
      {
        texto: 'Fresco',
        respuesta: '¡Fresco! Algunos alimentos huelen a jardín, a hojas verdes o a lluvia.',
      },
      {
        texto: 'Casi no tiene olor',
        respuesta: 'Hay alimentos que casi no tienen olor hasta que los cortás o los cocinás. ¡Ahí aparece!',
      },
      {
        texto: 'Bien fuerte',
        respuesta: '¡Bien fuerte! Hay olores que se sienten apenas te acercás. Tu nariz está muy atenta.',
      },
      {
        texto: 'No sé todavía',
        respuesta: 'El olor es difícil de imaginar. La próxima vez que lo tengas cerca, acercalo a tu nariz y descubrilo.',
      },
    ],
  },
  {
    id: 'oido',
    icono: 'oreja',
    pregunta: '¿Hace algún sonido?',
    opciones: [
      {
        texto: 'Cruje fuerte',
        respuesta: '¡Crunch! Los alimentos duros y frescos suelen crujir cuando los mordés.',
      },
      {
        texto: 'Suena bajo',
        respuesta: 'Algunos alimentos hacen un ruidito suave, casi como un secreto. Hay que escuchar con atención.',
      },
      {
        texto: 'No hace ruido',
        respuesta: 'Los alimentos blanditos casi no hacen ruido al morderlos. ¡Son silenciosos!',
      },
      {
        texto: 'No sé todavía',
        respuesta: 'El sonido se descubre escuchando: la próxima vez que lo muerdas, prestá atención al ruidito que hace.',
      },
    ],
  },
  {
    id: 'gusto',
    icono: 'lengua',
    pregunta: '¿Qué sabor imaginás que tiene?',
    opciones: [
      {
        texto: 'Dulce',
        respuesta: '¡Dulce! Muchas frutas y algunas verduras tienen un sabor dulce propio.',
      },
      {
        texto: 'Suave',
        respuesta: 'Un sabor suave es de esos tranquilos, que no te sorprenden de golpe.',
      },
      {
        texto: 'Un poco ácido',
        respuesta: '¡Ácido! Es ese sabor que te hace fruncir un poquito la cara, como el del limón.',
      },
      {
        texto: 'Todavía no lo probé',
        respuesta: 'Imaginarlo ya es una forma de conocerlo. Si algún día lo probás, vas a ver si se parece a lo que pensaste.',
      },
      {
        texto: 'No sé todavía',
        respuesta: 'Una pista: el color y el olor a veces nos cuentan algo del sabor. ¿Qué te dicen a vos?',
      },
    ],
  },
  {
    id: 'tacto',
    icono: 'mano',
    pregunta: '¿Cómo pensás que se siente al tocarlo?',
    opciones: [
      {
        texto: 'Suave',
        respuesta: '¡Suave! Algunas cáscaras son lisitas y otras tienen una pelusita muy finita.',
      },
      {
        texto: 'Duro',
        respuesta: '¡Duro! Los alimentos duros suelen hacer ruido cuando los mordés.',
      },
      {
        texto: 'Rugoso',
        respuesta: '¡Rugoso! Tiene bultitos o arruguitas. Con los dedos se sienten un montón de detalles.',
      },
      {
        texto: 'Húmedo',
        respuesta: '¡Húmedo! Muchos alimentos tienen agua adentro, y a veces se nota al tocarlos o cortarlos.',
      },
      {
        texto: 'No sé todavía',
        respuesta: 'Se descubre con las manos: la próxima vez que lo tengas cerca, tocalo con cuidado y fijate cómo se siente.',
      },
    ],
  },
]
