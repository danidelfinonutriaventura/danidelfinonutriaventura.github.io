/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   TEXTOS DE LA EXPERIENCIA — LA VOZ DE DANI
   ------------------------------------------------------------
   Todo lo que Dani le dice al chico está acá.
   Español rioplatense, con "vos". Frases cortas, cálidas y neutras.

   Donde veas {nombre}, se reemplaza solo por el nombre del chico.
   Si el chico prefirió no poner su nombre, esa parte de la frase
   desaparece sola. No hace falta que hagas nada.
   ============================================================ */

NA.textos = {
  /* ---------------- PORTADA ---------------- */
  portada: {
    saludo: '¡Hola, soy Dani!',
    /* Arranca sin 'Soy' porque el saludo de arriba ya dice '¡Hola, soy Dani!'. */
    presentacion: 'Licenciada en Nutrición. Preparé una aventura muy especial para vos.',
    invitacion:
      'Te propongo descubrir, jugar y explorar: vamos a conocer alimentos, usar los sentidos, escuchar las señales de tu cuerpo y conversar sobre lo que sentimos.',
    pregunta: '¿Te animás a descubrir todo lo que hay en esta NutriAventura?',
    boton: 'COMENZAR LA NUTRIAVENTURA',
  },

  /* ---------------- NOMBRE ---------------- */
  nombre: {
    titulo: 'Antes de empezar, ¿cómo te llamás?',
    ayuda: 'Tu nombre solo se usa mientras jugás. No se guarda en ningún lado.',
    campo: 'Escribí tu nombre',
    boton: 'SEGUIR',
    sinNombre: 'Prefiero no poner mi nombre',
  },

  /* ---------------- MAPA ---------------- */
  mapa: {
    titulo: '¡Empieza la NutriAventura!',
    intro: 'Dani tiene un mapa especial y necesita tu ayuda para encontrar el NutriTesoro.',
    introConNombre: '{nombre}, Dani tiene un mapa especial y necesita tu ayuda para encontrar el NutriTesoro.',
    ayuda: 'Tocá la estación que está lista para jugar.',
    bloqueada: 'Todavía no se puede entrar acá',
    completada: 'Ya la completaste. Podés volver a jugarla.',
    disponible: 'Lista para jugar',
    reiniciar: 'Volver a empezar',
    tesoroBloqueado: 'El NutriTesoro te espera al final del camino',
    tesoroListo: '¡El NutriTesoro te está esperando!',
    irAlTesoro: 'IR AL NUTRITESORO',

    /* La última parada del mapa: la charla con Dani. */
    desafio: 'Charlando con la Nutri',
    desafioBloqueado: 'Se abre cuando termines las cinco estaciones',
    desafioDisponible: 'Dani te está esperando para charlar',
    desafioCompletado: 'Ya charlaron. Podés volver a entrar.',
    ayudaDesafio: 'Dani te espera en la última parada, antes del NutriTesoro.',
  },

  /* ---------------- ESTACIONES ---------------- */
  estaciones: [
    {
      numero: 1,
      titulo: 'Explorando los Alimentos',
      subtitulo: 'Vamos a mirar, imaginar y descubrir.',
      intro: 'Te propongo un desafío, {nombre}. ¿Te animás a armar un arcoíris de alimentos?',
      introSinNombre: 'Te propongo un desafío. ¿Te animás a armar un arcoíris de alimentos?',
      cierre: '¡Qué bien exploraste! Cada alimento tiene algo distinto para contarte.',
    },
    {
      numero: 2,
      titulo: 'Desafío de Alimentos',
      subtitulo: '¿Te animás a poner a prueba lo que descubriste?',
      intro: 'Son seis preguntas, {nombre}. No es un examen: lo importante es pensar y descubrir.',
      introSinNombre: 'Son seis preguntas. No es un examen: lo importante es pensar y descubrir.',
      cierre: '¡Terminaste el desafío! Pensar y explorar también es aprender.',
    },
    {
      numero: 3,
      titulo: 'Conozco lo que siento',
      subtitulo: 'Las emociones y las señales de tu cuerpo.',
      intro: 'Ahora quiero invitarte a descubrir algo sobre vos, {nombre}.',
      introSinNombre: 'Ahora quiero invitarte a descubrir algo sobre vos.',
      cierre: 'Conocer lo que sentís y lo que te dice tu cuerpo es una aventura enorme.',
    },
    {
      numero: 4,
      titulo: 'Pausa Consciente',
      subtitulo: 'Una pequeña práctica para prestar atención a nuestro cuerpo.',
      intro: 'Vamos a hacer una pausa para prestarle atención a tu cuerpo.',
      introSinNombre: 'Vamos a hacer una pausa para prestarle atención a tu cuerpo.',
      cierre: '¡Listo! Hacer una pausa es una forma de escucharte.',
    },
    {
      numero: 5,
      titulo: 'Juguemos a Descubrir',
      subtitulo: 'Entrená tu memoria y descubrí nuevos alimentos.',
      intro: 'Llegamos a la última estación, {nombre}. ¿Jugamos?',
      introSinNombre: 'Llegamos a la última estación. ¿Jugamos?',
      cierre: '¡Lo lograste! Encontraste todas las parejas.',
    },
  ],

  /* ---------------- ESTACIÓN 1 ---------------- */
  arcoiris: {
    titulo: 'El arcoíris de alimentos',
    consigna: 'Tocá un alimento y después tocá el color al que va.',
    ayudaPaso: 'Ahora tocá el color del arcoíris donde va este alimento.',
    completo: '¡Armaste el arcoíris completo!',
    cierre:
      'Cuando explorás alimentos de muchos colores, conocés sabores, formas y texturas diferentes.',
  },
  sentidos: {
    titulo: 'Descubro con mis sentidos',
    elegir: 'Elegí un alimento para explorar.',
    intro: 'No hay respuestas correctas. Se trata de mirar, imaginar y descubrir.',
    cierre:
      'Explorar con los sentidos es una forma de conocer los alimentos sin apuro y a tu ritmo.',
  },

  /* ---------------- ESTACIÓN 2 ---------------- */
  desafio: {
    paso: 'Pregunta {actual} de {total}',
    siguiente: 'SIGUIENTE',
    terminar: 'TERMINAR EL DESAFÍO',
  },

  /* ---------------- ESTACIÓN 3 ---------------- */
  rueda: {
    titulo: 'Rueda de emociones',
    consigna: 'Tocá una emoción para descubrir algo sobre ella.',
    seguir: 'SEGUIR',
  },

  /* Las señales de hambre y de saciedad. */
  senales: {
    /* El chico marca todas las señales que quiera y recién
       después toca este botón. Así la respuesta de Dani no
       aparece apenas toca la primera. */
    listo: 'SELECCIONADAS',
  },

  /* ---------------- ESTACIÓN 4 ---------------- */
  respiracion: {
    encuadre:
      'Esta es una pausa de alimentación consciente: sirve para conectar con vos y prestar atención a cómo estás.',
    notaAdulto:
      'Nota para personas adultas: esta práctica es una estrategia de alimentación consciente (Mindful Eating). Su objetivo es favorecer la atención plena y la conexión con las señales del cuerpo.',
    /* Las palabras dicen QUÉ HACER con el aire, en vez de
       "inhalo" y "exhalo", que a los 6 años no se entienden. */
    consigna:
      'Cuando el círculo se hace grande, tomá aire. Cuando se hace chico, soltalo despacio.',
    comenzar: 'EMPEZAR LA PAUSA',
    inhalo: 'TOMO AIRE',
    pauso: 'ESPERO',
    exhalo: 'SUELTO',
    listo: '¡Listo!',
    cierre: 'Ahora podemos volver a preguntarnos:',
    preguntas: ['¿Qué siento?', '¿Cómo está mi cuerpo?', '¿Qué necesito?'],
  },

  /* ---------------- ESTACIÓN 5 ---------------- */
  memotest: {
    titulo: 'Memotest Nutricional',
    subtitulo: 'Entrená tu memoria y descubrí nuevos alimentos.',
    consigna: 'Tocá dos cartas para encontrar las parejas.',
    parejas: '{encontradas} de {total} parejas',
    logrado: '¡Lo lograste!',
    otraVez: '¿Querés volver a jugar con un desafío más grande?',
    jugarNivel2: 'JUGAR EL DESAFÍO MÁS GRANDE',
    nivel2Aviso: 'Este desafío es solo por diversión: ya tenés todas tus estrellas.',
    nivel2Logrado: '¡Increíble! Completaste el desafío más grande.',
    volverAJugar: 'JUGAR OTRA VEZ',
  },

  /* ---------------- TESORO ---------------- */
  tesoro: {
    titulo: '¡Llegaste al NutriTesoro!',
    texto: 'Completaste toda la NutriAventura.',
    estrellas: '¡Conseguiste tus 20 estrellas!',
    conNombre: '{nombre}, completaste toda la NutriAventura.',
    boton: 'VER MI CERTIFICADO',
  },

  /* ---------------- CIERRE ---------------- */
  cierre: {
    gracias: 'Gracias por ser parte de esta NutriAventura',
    seguimos: '¿Seguimos la aventura?',
    instagram: 'VER INSTAGRAM',
    whatsapp: 'CONTACTAR A DANI',
    volverAJugar: 'VOLVER A JUGAR',
  },

  /* ---------------- COMPARTIDOS ---------------- */
  comun: {
    volverAlMapa: 'VOLVER AL MAPA',
    seguir: 'SEGUIR',
    empezar: 'EMPEZAR',
    volver: 'Volver',
    ganasteEstrellas: '¡Ganaste {n} estrellas!',
    ganasteUnaEstrella: '¡Ganaste 1 estrella!',
    estrellasContador: '{actuales} de {total} estrellas',
    saltarAlContenido: 'Saltar al contenido',
  },

  /* ---------------- REINICIO ---------------- */
  reinicio: {
    titulo: '¿Querés empezar de nuevo?',
    texto: 'Vas a volver a la primera estación y las estrellas arrancan otra vez de cero.',
    confirmar: 'SÍ, EMPEZAR DE NUEVO',
    cancelar: 'NO, SEGUIR JUGANDO',
  },
}
