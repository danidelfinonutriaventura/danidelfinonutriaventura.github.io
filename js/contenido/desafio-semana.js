/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   DESAFÍO DE LA SEMANA — el chat con Dani
   ------------------------------------------------------------
   Es una charla de cinco preguntas que termina proponiendo un
   alimento para explorar durante la semana.

   Las cinco preguntas se contestan SIEMPRE tocando un botón:
   el chico nunca tiene que escribir nada.

   Qué hace cada pregunta:
   1. Si se anima         → abre la charla, no cambia el resultado
   2. Textura             → junto con el color, elige el alimento
   3. Color               → junto con la textura, elige el alimento
   4. Con quién           → arma la frase del final
   5. Qué hacer primero   → arma la frase del final

   Las cinco son sobre el alimento y sobre explorarlo. Ninguna
   pregunta por cómo se siente el chico ni por lo que comió.

   Reglas de contenido, las mismas de toda la aventura:
   · No hay respuestas correctas: todas las preguntas son de gusto
     personal. Ninguna combinación es mejor que otra.
   · El alimento se propone para EXPLORAR, nunca como algo que
     haya que comer. Es una invitación, no una indicación.
   · Nada de cantidades, ni de "saludable", ni de "tenés que".

   Para cambiar el chat, tocá solo el texto entre comillas.
   Donde dice {nombre} se reemplaza solo por el nombre del chico.
   Si prefirió no poner su nombre, esa parte desaparece sola.
   ============================================================ */

/** Cómo aparece Dani en la cabecera del chat. */
NA.CABECERA = {
  nombre: 'Lic. Daniela',
  estado: 'en línea',
  /** Lo que dice abajo del nombre mientras aparecen los tres puntitos. */
  estadoEscribiendo: 'escribiendo…',
}

NA.CHAT = {
  /* --- Saludo y pregunta 1: si se anima --- */
  saludo:
    '¡Hola {nombre}! Qué lindo verte por acá. Vamos a descubrir qué alimento nuevo es tu Desafío NutriAventura para esta semana.',
  saludoSinNombre:
    '¡Hola! Qué lindo verte por acá. Vamos a descubrir qué alimento nuevo es tu Desafío NutriAventura para esta semana.',
  pregunta1: 'Contame: ¿te animás a explorar un alimento nuevo esta semana?',

  /* --- Pregunta 2: la textura --- */
  pregunta2: '¡Buenísimo! Entonces vamos a buscar cuál. ¿Qué textura te da más curiosidad?',

  /* --- Pregunta 3: el color --- */
  pregunta3: '¡Me encanta! Si tuvieras que elegir un color brillante, ¿cuál elegirías?',

  /* --- El alimento --- */
  resultado:
    '¡Ya lo tengo! Según lo que me contaste, el alimento para que explores en tu NutriAventura esta semana es…',

  /* --- Pregunta 4: con quién --- */
  pregunta4: '¿Y con quién te gustaría descubrir este alimento?',

  /* --- Pregunta 5: qué hacer primero --- */
  pregunta5: 'Última: cuando lo tengas cerca, ¿qué te gustaría hacer primero?',

  /* --- Cierre. {conQuien} y {primero} se completan con lo que eligió. --- */
  despedida: '¡Buenísimo! Entonces esta semana lo vas a explorar {conQuien}, empezando por {primero}.',
  despedidaFinal: 'Y si te dan ganas, probalo. Lo importante es descubrirlo sin apuro.',

  /* --- El saludo del final --- */
  cierre: '¡Mucha suerte con tu desafío, {nombre}! Nos vemos en la próxima NutriAventura.',
  cierreSinNombre: '¡Mucha suerte con tu desafío! Nos vemos en la próxima NutriAventura.',
  boton: 'SEGUIR',
}

/** Pregunta 1. No cambia el resultado: abre la charla.
    Las tres respuestas valen igual: ninguna es la "correcta". */
NA.ANIMOS = [
  { id: 'si', etiqueta: '¡Sí, me animo!' },
  { id: 'curioso', etiqueta: 'Me da curiosidad' },
  { id: 'mirar', etiqueta: 'Primero quiero mirarlo' },
]

/** Pregunta 2. Junto con el color, elige el alimento. */
NA.TEXTURAS = [
  { id: 'crujiente', etiqueta: 'Algo crujiente' },
  { id: 'suave', etiqueta: 'Algo suave' },
]

/** Pregunta 3. Cada uno lleva el tono con que se pinta el puntito. */
NA.COLORES = [
  { id: 'naranja', etiqueta: 'Naranja', tono: '#F58A33' },
  { id: 'verde', etiqueta: 'Verde', tono: '#66B45C' },
  { id: 'amarillo', etiqueta: 'Amarillo', tono: '#F5C93B' },
  { id: 'rojo', etiqueta: 'Rojo', tono: '#E4453F' },
  { id: 'violeta', etiqueta: 'Violeta', tono: '#8E5BA8' },
]

/** Pregunta 4. "frase" es cómo entra en la despedida. */
NA.COMPANIA = [
  { id: 'familia', etiqueta: 'Con mi familia', frase: 'con tu familia' },
  { id: 'escuela', etiqueta: 'Con alguien de la escuela', frase: 'con alguien de la escuela' },
  { id: 'solo', etiqueta: 'A mi tiempo, sin apuro', frase: 'a tu tiempo, sin apuro' },
]

/** Pregunta 5. "frase" es cómo entra en la despedida. */
NA.PRIMEROS = [
  { id: 'mirar', etiqueta: 'Mirarlo bien', frase: 'mirarlo bien' },
  { id: 'oler', etiqueta: 'Olerlo', frase: 'olerlo' },
  { id: 'tocar', etiqueta: 'Tocarlo', frase: 'tocarlo' },
]


/* ------------------------------------------------------------
   EL CRUCE
   Cada color, con cada textura, da un alimento distinto.
   El id tiene que ser uno de los que existen en alimentos.js.
   ------------------------------------------------------------ */
NA.CRUCE = {
  naranja:  { crujiente: 'zanahoria', suave: 'batata' },
  verde:    { crujiente: 'brocoli',   suave: 'palta' },
  amarillo: { crujiente: 'choclo',    suave: 'banana' },
  rojo:     { crujiente: 'sandia',    suave: 'frutilla' },
  violeta:  { crujiente: 'remolacha', suave: 'uvas' },
}
