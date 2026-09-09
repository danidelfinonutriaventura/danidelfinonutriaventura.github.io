/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   ALIMENTOS
   ------------------------------------------------------------
   Los 25 alimentos ilustrados de la aventura.
   El "id" conecta cada alimento con su dibujo.
   Si agregás un alimento nuevo acá, también hay que dibujarlo
   en src/ilustraciones/alimentos/ (mirá COMO_EDITAR.md).
   ============================================================ */

/** Las seis bandas del arcoíris de la Estación 1. */


NA.ALIMENTOS = [
  /* --- Frutas --- */
  { id: 'manzana',  nombre: 'manzana',      alt: 'Una manzana roja con cara sonriente',        color: 'rojo' },
  { id: 'frutilla', nombre: 'frutilla',     alt: 'Una frutilla con cara sonriente',            color: 'rojo' },
  { id: 'naranja',  nombre: 'naranja',      alt: 'Una naranja con cara sonriente',             color: 'naranja' },
  { id: 'banana',   nombre: 'banana',       alt: 'Una banana con cara sonriente',              color: 'amarillo' },
  { id: 'pera',     nombre: 'pera',         alt: 'Una pera verde con cara sonriente',          color: 'verde' },
  { id: 'uvas',     nombre: 'uvas',         alt: 'Un racimo de uvas con cara sonriente',       color: 'violeta' },
  { id: 'arandanos', nombre: 'arándanos',   alt: 'Unos arándanos con cara sonriente',          color: 'violeta' },
  { id: 'sandia',   nombre: 'sandía',       alt: 'Una porción de sandía con cara sonriente' },

  /* --- Verduras --- */
  { id: 'tomate',    nombre: 'tomate',      alt: 'Un tomate con cara sonriente',               color: 'rojo' },
  { id: 'zanahoria', nombre: 'zanahoria',   alt: 'Una zanahoria con cara sonriente',           color: 'naranja' },
  { id: 'choclo',    nombre: 'choclo',      alt: 'Un choclo con cara sonriente',               color: 'amarillo' },
  { id: 'brocoli',   nombre: 'brócoli',     alt: 'Un brócoli con cara sonriente',              color: 'verde' },
  { id: 'coliflor',  nombre: 'coliflor',    alt: 'Una coliflor con cara sonriente' },
  { id: 'remolacha', nombre: 'remolacha',   alt: 'Una remolacha con cara sonriente',           color: 'violeta' },
  /* La lechuga y la rúcula son el mismo dibujo en dos verdes distintos. */
  { id: 'lechuga',   nombre: 'lechuga',     alt: 'Una hoja de lechuga con cara sonriente',     color: 'verde' },
  { id: 'rucula',    nombre: 'rúcula',      alt: 'Una hoja de rúcula con cara sonriente' },

  /* --- Cereales --- */
  { id: 'pan',   nombre: 'pan',   alt: 'Un pan con cara sonriente' },
  { id: 'arroz', nombre: 'arroz', alt: 'Un bol de arroz con cara sonriente' },
  { id: 'avena', nombre: 'avena', alt: 'Un bol de avena con cara sonriente' },

  /* --- Otros grupos --- */
  { id: 'huevo',    nombre: 'huevo',    alt: 'Un huevo con cara sonriente',             color: 'blanco' },
  { id: 'yogur',    nombre: 'yogur',    alt: 'Un pote de yogur con cara sonriente',     color: 'blanco' },
  { id: 'lentejas', nombre: 'lentejas', alt: 'Un puñado de lentejas con cara sonriente' },
  { id: 'agua',     nombre: 'agua',     alt: 'Un vaso de agua con cara sonriente' },

  /* --- Sumados con el Desafío de la semana --- */
  { id: 'batata', nombre: 'batata', alt: 'Una batata con cara sonriente' },
  { id: 'palta',  nombre: 'palta',  alt: 'Una palta cortada al medio, con cara sonriente' },
]

/** Busca un alimento por su id. */
NA.buscarAlimento = (id) =>
  NA.ALIMENTOS.find((a) => a.id === id) || NA.ALIMENTOS[0]

/* ============================================================
   ARCOÍRIS DE COLORES — Estación 1
   ------------------------------------------------------------
   Seis bandas. La mayoría tiene dos alimentos posibles y en cada
   partida se sortea uno, así el juego cambia si se vuelve a jugar.
   El naranja y el amarillo tienen uno solo, fijo: Dani quiso que
   fueran siempre la naranja y el choclo.
   ============================================================ */


NA.ARCOIRIS = [
  { color: 'rojo',     nombre: 'rojo',     tono: '#E4453F', opciones: ['tomate', 'frutilla'] },
  { color: 'naranja',  nombre: 'naranja',  tono: '#F58A33', opciones: ['naranja'] },
  { color: 'amarillo', nombre: 'amarillo', tono: '#F5C93B', opciones: ['choclo'] },
  { color: 'verde',    nombre: 'verde',    tono: '#66B45C', opciones: ['brocoli', 'pera'] },
  { color: 'violeta',  nombre: 'violeta',  tono: '#8E5BA8', opciones: ['uvas', 'remolacha'] },
  { color: 'blanco',   nombre: 'blanco',   tono: '#EDE7DC', opciones: ['huevo', 'yogur'] },
]
