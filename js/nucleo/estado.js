/* ============================================================
   EL PROGRESO DE LA AVENTURA
   ------------------------------------------------------------
   PRIVACIDAD: el nombre y el progreso viven ÚNICAMENTE en
   sessionStorage, que el navegador borra solo al cerrar la
   pestaña. No hay servidor, no hay cuentas, no hay analítica.
   Nada sale del dispositivo.

   Todo pasa por `NA.despachar({ tipo: '...' })`. Cada vez que el
   estado cambia, la aventura se vuelve a dibujar sola.
   ============================================================ */
window.NA = window.NA || {}

;(function () {
  const CLAVE_SESION = 'nutriaventura'

  const estadoInicial = {
    /* Hacia dónde va el recorrido: sirve para que las pantallas entren
       desde la derecha cuando avanzás y desde la izquierda cuando volvés. */
    direccion: 'adelante',
    /** Nombre del chico. Cadena vacía = prefirió no ponerlo. */
    nombre: '',
    /** Ya pasó por la pantalla del nombre. */
    nombreDefinido: false,
    pantalla: 'portada',
    /** Estación abierta (1 a 5), o null si está en el mapa. */
    estacionAbierta: null,
    /** Número de la última estación desbloqueada. Arranca en 1. */
    desbloqueadas: 1,
    /** Estaciones terminadas. */
    completadas: [],
    /** Actividades que ya dieron su estrella (para no repetir al rejugar). */
    actividades: [],
    /** Nivel 2 del memotest disponible. */
    memotest2Disponible: false,
    /** Ya charló con Dani. Es la última parada antes del NutriTesoro. */
    desafioHecho: false,
  }

  /* ------------------------------------------------------------
     LAS REGLAS DEL PROGRESO
     Recibe cómo está la aventura y qué pasó, y devuelve cómo queda.
     ------------------------------------------------------------ */
  function reglas(estado, accion) {
    switch (accion.tipo) {
      case 'ponerNombre':
        return {
          ...estado,
          nombre: accion.nombre,
          nombreDefinido: true,
          pantalla: 'mapa',
          direccion: 'adelante',
        }

      case 'irA':
        return {
          ...estado,
          pantalla: accion.pantalla,
          estacionAbierta: null,
          // Llegar al NutriTesoro merece una entrada distinta.
          direccion: accion.pantalla === 'tesoro' ? 'celebracion' : 'adelante',
        }

      case 'abrirEstacion':
        // Nunca se puede entrar a una estación que todavía no se desbloqueó.
        if (accion.numero > estado.desbloqueadas) return estado
        return {
          ...estado,
          pantalla: 'estacion',
          estacionAbierta: accion.numero,
          direccion: 'adelante',
        }

      case 'volverAlMapa':
        return { ...estado, pantalla: 'mapa', estacionAbierta: null, direccion: 'atras' }

      case 'completarActividad': {
        // Si ya dio su estrella antes (por ejemplo al rejugar), no suma de nuevo.
        if (estado.actividades.includes(accion.clave)) return estado
        return { ...estado, actividades: [...estado.actividades, accion.clave] }
      }

      case 'completarEstacion': {
        const completadas = estado.completadas.includes(accion.numero)
          ? estado.completadas
          : [...estado.completadas, accion.numero]
        return {
          ...estado,
          completadas,
          desbloqueadas: Math.min(5, Math.max(estado.desbloqueadas, accion.numero + 1)),
        }
      }

      case 'habilitarMemotest2':
        return { ...estado, memotest2Disponible: true }

      case 'completarDesafio':
        return { ...estado, desafioHecho: true }

      case 'reiniciar':
        return { ...estadoInicial, pantalla: 'portada', direccion: 'atras' }

      default:
        return estado
    }
  }

  /* ------------------------------------------------------------
     VISTA PREVIA DE PANTALLAS
     Sirve para ir directo a cualquier pantalla sin jugar toda la
     aventura. Se usa agregando ?vista= a la dirección:

       ?vista=portada        ?vista=mapa         ?vista=mapa-listo
       ?vista=e1 … ?vista=e5 (con &paso=0,1,2…)
       ?vista=desafio        ?vista=tesoro
       ?vista=certificado    ?vista=cierre

     Es una herramienta para revisar, no parte de la aventura.
     Un chico jugando nunca llega acá.
     ------------------------------------------------------------ */

  /** Las 14 actividades completas, para las pantallas del final. */
  const TODO_HECHO = [
    'arcoiris', 'sentidos',
    'p1', 'p2', 'p3', 'p4', 'p5', 'p6',
    'rueda', 'estrategias', 'hambre', 'saciedad',
    'respiracion', 'memotest',
  ]

  function leerVistaPrevia() {
    const params = new URLSearchParams(window.location.search)
    const vista = params.get('vista')
    if (!vista) return null

    const nombre = params.get('nombre') !== null ? params.get('nombre') : 'Martina'
    const paso = params.has('paso') ? Number(params.get('paso')) : undefined
    const base = { nombre, nombreDefinido: true, direccion: 'adelante' }

    if (vista === 'portada') {
      return { estado: { ...base, nombre: '', nombreDefinido: false, pantalla: 'portada' } }
    }
    if (vista === 'nombre') {
      return { estado: { ...base, nombre: '', nombreDefinido: false, pantalla: 'nombre' } }
    }
    if (vista === 'mapa') {
      return {
        estado: { ...base, pantalla: 'mapa', desbloqueadas: 1, completadas: [], actividades: [] },
      }
    }
    if (vista === 'mapa-avanzado') {
      return {
        estado: {
          ...base, pantalla: 'mapa', desbloqueadas: 3, completadas: [1, 2],
          actividades: TODO_HECHO.slice(0, 8),
        },
      }
    }

    const estacion = /^e([1-5])$/.exec(vista)
    if (estacion) {
      const n = Number(estacion[1])
      return {
        estado: {
          ...base, pantalla: 'estacion', estacionAbierta: n,
          desbloqueadas: 5, completadas: [1, 2, 3, 4, 5].slice(0, n - 1), actividades: [],
        },
        paso: paso !== undefined ? paso : 0,
      }
    }

    /* Las cinco estaciones terminadas: el estado del final del recorrido. */
    const alFinal = {
      ...base, desbloqueadas: 5, completadas: [1, 2, 3, 4, 5],
      actividades: TODO_HECHO, memotest2Disponible: true,
    }

    /* En el Desafío la charla todavía no pasó. */
    if (vista === 'desafio') {
      return { estado: { ...alFinal, pantalla: 'desafioSemana', desafioHecho: false } }
    }
    /* El mapa con todo hecho, para ver el cofre abierto. */
    if (vista === 'mapa-listo') {
      return { estado: { ...alFinal, pantalla: 'mapa', desafioHecho: true } }
    }
    if (vista === 'tesoro' || vista === 'certificado' || vista === 'cierre') {
      return { estado: { ...alFinal, pantalla: vista, desafioHecho: true } }
    }
    return null
  }

  /** ¿Estamos mirando una pantalla suelta? Entonces no guardamos nada. */
  const enVistaPrevia = () => new URLSearchParams(window.location.search).has('vista')

  /** El paso inicial de la estación, cuando se entra con ?vista=e3&paso=2 */
  NA.pasoDeVistaPrevia = () => {
    const v = leerVistaPrevia()
    return v && v.paso !== undefined ? v.paso : -1
  }

  /* ------------------------------------------------------------
     ARRANQUE
     ------------------------------------------------------------ */
  function leerSesion() {
    // Si la dirección trae ?vista=, mandamos a esa pantalla y listo.
    const vista = leerVistaPrevia()
    if (vista) return { ...estadoInicial, ...vista.estado }

    try {
      const guardado = sessionStorage.getItem(CLAVE_SESION)
      if (!guardado) return { ...estadoInicial }
      return { ...estadoInicial, ...JSON.parse(guardado) }
    } catch (e) {
      /* Si el navegador bloquea el almacenamiento, la experiencia
         funciona igual: simplemente no sobrevive a una recarga. */
      return { ...estadoInicial }
    }
  }

  NA.estado = leerSesion()

  /* ------------------------------------------------------------
     LAS ESTRELLAS
     ------------------------------------------------------------ */
  function estrellasDe(clave) {
    /* Las preguntas del Desafío de Alimentos se llaman p1, p2, … y
       todas valen lo mismo. */
    if (clave.charAt(0) === 'p' && clave.length === 2) {
      return NA.ESTRELLAS_POR_ACTIVIDAD.preguntaRespondida
    }
    return NA.ESTRELLAS_POR_ACTIVIDAD[clave] || 0
  }

  /** Cuántas estrellas lleva ganadas. */
  NA.estrellas = function estrellas() {
    return NA.estado.actividades.reduce((suma, clave) => suma + estrellasDe(clave), 0)
  }

  /* ------------------------------------------------------------
     EL NOMBRE
     ------------------------------------------------------------ */
  NA.tieneNombre = () => NA.estado.nombre.trim().length > 0

  /**
   * Reemplaza {nombre} en un texto.
   * Si el chico prefirió no poner su nombre, usa la versión sin
   * nombre; y si no hay, borra el {nombre} y lo que le sigue.
   */
  NA.conNombre = function conNombre(textoConNombre, textoSinNombre) {
    if (!NA.tieneNombre()) {
      return textoSinNombre !== undefined
        ? textoSinNombre
        : textoConNombre.replace(/\{nombre\}[,\s]*/g, '')
    }
    return textoConNombre.replace(/\{nombre\}/g, NA.estado.nombre)
  }

  /* ------------------------------------------------------------
     DESPACHAR: la única forma de cambiar el progreso
     ------------------------------------------------------------ */
  NA.despachar = function despachar(accion) {
    const antes = NA.estado
    NA.estado = reglas(antes, accion)
    if (NA.estado === antes) return

    if (!enVistaPrevia()) {
      try {
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify(NA.estado))
      } catch (e) {
        /* Sin almacenamiento disponible: seguimos sin guardar. */
      }
    }
    if (NA.redibujar) NA.redibujar(antes)
  }
})()
