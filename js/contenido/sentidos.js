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
   ============================================================ */


/** Los seis alimentos que se pueden elegir para explorar. */
NA.ALIMENTOS_SENTIDOS = ['remolacha', 'banana', 'frutilla', 'zanahoria', 'brocoli', 'tomate']

NA.PASOS_SENTIDOS = [
  {
    id: 'vista',
    icono: 'ojo',
    pregunta: '¿Cómo se ve?',
    opciones: ['Redondo', 'Alargado', 'Con muchas partes', 'Brillante', 'No sé todavía'],
    respuestaDani: '¡Qué bien lo miraste!',
  },
  {
    id: 'olfato',
    icono: 'nariz',
    pregunta: '¿Qué olor tiene?',
    opciones: ['Dulce', 'Fresco', 'Casi no tiene olor', 'Bien fuerte', 'No sé todavía'],
    respuestaDani: '¡Buenísimo! Oler también es explorar.',
  },
  {
    id: 'oido',
    icono: 'oreja',
    pregunta: '¿Hace algún sonido?',
    opciones: ['Cruje fuerte', 'Suena bajo', 'No hace ruido', 'No sé todavía'],
    respuestaDani: '¡Qué lindo! Los alimentos también tienen su sonido.',
  },
  {
    id: 'gusto',
    icono: 'lengua',
    pregunta: '¿Qué sabor imaginás que tiene?',
    opciones: ['Dulce', 'Suave', 'Un poco ácido', 'Todavía no lo probé', 'No sé todavía'],
    respuestaDani: 'Imaginar el sabor también es una forma de conocerlo.',
  },
  {
    id: 'tacto',
    icono: 'mano',
    pregunta: '¿Cómo pensás que se siente al tocarlo?',
    opciones: ['Suave', 'Duro', 'Rugoso', 'Húmedo', 'No sé todavía'],
    respuestaDani: '¡Muy bien! Tocar nos cuenta un montón.',
  },
]
