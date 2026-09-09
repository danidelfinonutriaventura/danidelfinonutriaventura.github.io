/* Este archivo se carga con una etiqueta <script> normal.
   NA es el único nombre global de toda la aventura: adentro viven
   los textos, los alimentos y los dibujos. */
window.NA = window.NA || {}

/* ============================================================
   REPARTO DE LAS 20 ESTRELLAS
   ------------------------------------------------------------
   Las estrellas se ganan POR PARTICIPAR, nunca por acertar.
   Si cambiás algún número, cambiá también TOTAL_ESTRELLAS
   para que el mapa y el certificado sigan coincidiendo.
   ============================================================ */

NA.ESTRELLAS_POR_ACTIVIDAD = {
  /* Estación 1 — Exploro los alimentos (4) */
  arcoiris: 2,
  sentidos: 2,

  /* Estación 2 — Desafío de alimentos (6): una por pregunta respondida */
  preguntaRespondida: 1,

  /* Estación 3 — Conozco lo que siento (4) */
  rueda: 1,
  estrategias: 1,
  hambre: 1,
  saciedad: 1,

  /* Estación 4 — Pausa Consciente (3) */
  respiracion: 3,

  /* Estación 5 — Juego y descubro (3) */
  memotest: 3,
}

/** Meta final de la aventura. */
NA.TOTAL_ESTRELLAS = 20
