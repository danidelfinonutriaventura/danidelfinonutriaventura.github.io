/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   MEMOTEST NUTRICIONAL — Estación 5
   ------------------------------------------------------------
   Ronda 1: 6 parejas (12 cartas). Da 3 estrellas.
   Ronda 2: 8 parejas (16 cartas). Es OPCIONAL y NO da estrellas.

   Los alimentos NO son siempre los mismos: se sortean de esta
   lista, que tiene los 25 alimentos dibujados. Así, quien juega
   varias veces se encuentra con cartas distintas. La ronda 2
   nunca repite los alimentos que salieron en la ronda 1.

   Cada pareja encontrada muestra un dato breve.
   Los datos despiertan curiosidad: nunca moralizan, nunca
   dicen qué conviene o no conviene comer.
   ============================================================ */


/** Los 25 alimentos, cada uno con su dato. De acá se sortea. */
NA.MEMOTEST = [
  { alimento: 'agua', dato: 'El agua acompaña a tu cuerpo todo el día y te ayuda a mantenerte hidratado.' },
  { alimento: 'manzana', dato: 'La manzana tiene fibra, que acompaña a tu digestión.' },
  { alimento: 'brocoli', dato: 'El brócoli es una flor. ¡Se come antes de que termine de florecer!' },
  { alimento: 'coliflor', dato: 'La coliflor también es una flor, como el brócoli, pero sin el verde.' },
  { alimento: 'huevo', dato: 'El huevo aporta proteínas, que ayudan a tu cuerpo a crecer.' },
  { alimento: 'lentejas', dato: 'Las lentejas son legumbres y aportan hierro y proteínas.' },
  { alimento: 'yogur', dato: 'El yogur aporta calcio, que acompaña el crecimiento de tus huesos.' },
  { alimento: 'banana', dato: 'La banana tiene potasio, un mineral que acompaña a tus músculos.' },
  { alimento: 'tomate', dato: 'El tomate es en realidad una fruta, aunque lo usemos como verdura.' },
  { alimento: 'uvas', dato: 'Las uvas crecen en racimos y pueden ser verdes, rojas o violetas.' },
  { alimento: 'pan', dato: 'El pan aporta hidratos de carbono, que le dan energía a tu cuerpo.' },
  { alimento: 'avena', dato: 'La avena es un cereal con fibra y se puede comer de muchas formas.' },
  { alimento: 'arroz', dato: 'El arroz crece en el agua y se come en casi todo el mundo.' },
  { alimento: 'naranja', dato: 'La naranja aporta vitamina C y también bastante agua.' },
  { alimento: 'zanahoria', dato: 'La zanahoria crece bajo la tierra. ¡Lo que comemos es su raíz!' },
  { alimento: 'frutilla', dato: 'La frutilla lleva las semillas por fuera: son esos puntos amarillos.' },
  { alimento: 'pera', dato: 'La pera y la manzana son parientes: sus árboles son de la misma familia.' },
  { alimento: 'sandia', dato: 'La sandía es casi toda agua. Por eso es tan jugosa.' },
  { alimento: 'choclo', dato: 'El choclo tiene un pelo por cada grano. ¡Uno para cada uno!' },
  { alimento: 'remolacha', dato: 'La remolacha crece bajo la tierra y su jugo tiñe todo de violeta.' },
  { alimento: 'lechuga', dato: 'La lechuga tiene mucha agua adentro. Por eso hace ruido cuando la mordés.' },
  { alimento: 'rucula', dato: 'La rúcula es una hoja de sabor fuerte: se nota apenas la probás.' },
  { alimento: 'batata', dato: 'La batata crece bajo la tierra y por dentro es de color naranja.' },
  { alimento: 'palta', dato: 'La palta tiene un carozo grande en el medio y por fuera es una fruta.' },
  { alimento: 'arandanos', dato: 'Los arándanos son bien chicos y crecen en arbustos, de a muchos juntos.' },
]

/* ------------------------------------------------------------
   EL SORTEO
   Guardamos qué alimentos ya salieron para que la ronda 2 no
   repita los de la ronda 1. Se reinicia en cada ronda 1, que es
   siempre la primera que se juega.
   ------------------------------------------------------------ */

/* Va todo adentro de una función que se ejecuta sola, para que
   `yaSalieron` y `barajar` no queden sueltos como nombres globales
   y choquen con los de otro archivo. Afuera solo sale NA.sortearParejas. */
;(function () {
  let yaSalieron = []

  const barajar = (lista) => {
    const copia = [...lista]
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copia[i], copia[j]] = [copia[j], copia[i]]
    }
    return copia
  }

  /**
   * Sortea las parejas de una ronda.
   * `esPrimeraRonda` arranca de cero; si no, evita repetir los
   * alimentos que ya salieron en esta partida.
   */
  NA.sortearParejas = function sortearParejas(cuantas, esPrimeraRonda) {
    if (esPrimeraRonda) yaSalieron = []
    const disponibles = NA.MEMOTEST.filter((p) => !yaSalieron.includes(p.alimento))
    const elegidas = barajar(disponibles).slice(0, cuantas)
    yaSalieron = [...yaSalieron, ...elegidas.map((p) => p.alimento)]
    return elegidas
  }
})()
