/* ============================================================
   LOS DIBUJOS DE LOS ALIMENTOS
   ------------------------------------------------------------
   Los 25 alimentos, dibujados a mano en SVG. No son archivos de
   imagen: son instrucciones de dibujo, así que pesan muy poco y se
   ven nítidos a cualquier tamaño, también impresos.

   Todos están hechos sobre un cuadrado de 100 x 100. Si querés
   retocar alguno, ese es el sistema de medidas.
   ============================================================ */
window.NA = window.NA || {}

NA.DIBUJOS = {
  manzana: `<g>
    <path d="M50 22 q3 -9 11 -12" fill="none" stroke="#8A5A3B" stroke-width="4" stroke-linecap="round"/>
    <path d="M52 20 q12 -10 20 -3 q-6 10 -19 8 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 24 C28 16 12 34 16 56 C19 76 33 90 50 90 C67 90 81 76 84 56 C88 34 72 16 50 24 Z" fill="#E4453F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M28 38 q6 -9 15 -10" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
    <g transform="translate(50 56) scale(1)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  frutilla: `<g>
    <path d="M50 16 v10" stroke="#4E9247" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 28 l-16 -8 l4 10 l-14 1 l12 8 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 28 l16 -8 l-4 10 l14 1 l-12 8 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 32 C74 32 84 46 80 60 C76 76 62 90 50 90 C38 90 24 76 20 60 C16 46 26 32 50 32 Z" fill="#E4453F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="27" cy="50" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <ellipse cx="73" cy="50" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <ellipse cx="24" cy="64" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <ellipse cx="76" cy="64" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <ellipse cx="36" cy="80" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <ellipse cx="64" cy="80" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <ellipse cx="50" cy="87" rx="2.4" ry="3.2" fill="#FFF388" stroke="#791613" stroke-width="1"/>
    <g transform="translate(50 58) scale(1)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  naranja: `<g>
    <path d="M50 20 v8" stroke="#8A5A3B" stroke-width="4" stroke-linecap="round"/>
    <path d="M52 24 q13 -10 21 -2 q-7 10 -20 8 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="58" r="31" fill="#F58A33" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M28 42 q6 -8 15 -10" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.4"/>
    <circle cx="32" cy="74" r="1.8" fill="#D9722A"/>
    <circle cx="50" cy="82" r="1.8" fill="#D9722A"/>
    <circle cx="68" cy="74" r="1.8" fill="#D9722A"/>
    <g transform="translate(50 56) scale(1)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  banana: `<g>
    <path d="M27 21 q0 -9 7 -9 q2 7 -2 11 Z" fill="#8A5A3B" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 23 C10 58, 30 90, 74 90 C86 90, 89 79, 80 75 C51 70, 42 51, 42 24 C42 13, 24 12, 24 23 Z" fill="#F5C93B" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M74 90 C84 90, 88 82, 80 75 q-2 8 -6 15 Z" fill="#C89A2B" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M31 32 C26 45, 26 55, 29 62" fill="none" stroke="#FFE9A8" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
    <g transform="translate(46.5 68) scale(0.72)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  pera: `<g>
    <path d="M50 14 v14" stroke="#8A5A3B" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M52 20 q16 -11 24 -2 q-9 11 -23 8 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 26 C57 26, 59 35, 55 44 C70 51, 79 64, 79 74 C79 87, 66 95, 50 95 C34 95, 21 87, 21 74 C21 64, 30 51, 45 44 C41 35, 43 26, 50 26 Z" fill="#8CC152" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M31 72 q3 -9 11 -13" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" opacity="0.45"/>
    <g transform="translate(50 72) scale(0.86)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  uvas: `<g>
    <path d="M50 14 v10" stroke="#8A5A3B" stroke-width="4" stroke-linecap="round"/>
    <path d="M52 20 q12 -8 18 -1 q-7 8 -17 6 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="36" cy="36" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="64" cy="36" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="34" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="28" cy="54" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="72" cy="54" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="38" cy="72" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="62" cy="72" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="86" r="12" fill="#8E5BA8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="54" r="15" fill="#C49CD8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <g transform="translate(50 54) scale(0.72)">
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  arandanos: `<g>
    <circle cx="29" cy="53" r="19" fill="#5A6DB8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="71" cy="51" r="18" fill="#5A6DB8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="61" r="26" fill="#8394D8" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 26 l3.6 7 7.8 -1.3 -3.9 6.8 3.9 6.8 -7.8 -1.3 -3.6 7 -3.6 -7 -7.8 1.3 3.9 -6.8 -3.9 -6.8 7.8 1.3 Z" fill="#3F4F91" stroke="#791613" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M31 56 q5 -8 13 -11" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.4"/>
    <g transform="translate(50 66) scale(0.78)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  sandia: `<g>
    <path d="M50 12 L11 76 Q50 99 89 76 Z" fill="#3E8E43" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 20 L18 74 Q50 92 82 74 Z" fill="#F2EEDF"/>
    <path d="M50 26 L23 72 Q50 87 77 72 Z" fill="#E4453F"/>
    <ellipse cx="38" cy="60" rx="2.3" ry="3.2" fill="#791613"/>
    <ellipse cx="62" cy="60" rx="2.3" ry="3.2" fill="#791613"/>
    <ellipse cx="50" cy="70" rx="2.3" ry="3.2" fill="#791613"/>
    <ellipse cx="45" cy="48" rx="2.3" ry="3.2" fill="#791613"/>
    <ellipse cx="55" cy="48" rx="2.3" ry="3.2" fill="#791613"/>
    <g transform="translate(50 62) scale(0.62)">
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  tomate: `<g>
    <path d="M50 20 v8" stroke="#4E9247" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 30 l-18 -10 l6 12 l-14 4 l16 6 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 30 l18 -10 l-6 12 l14 4 l-16 6 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="60" r="30" fill="#E4453F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M28 46 q6 -9 15 -11" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.42"/>
    <g transform="translate(50 60) scale(1)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  zanahoria: `<g>
    <path d="M50 34 V14" stroke="#4E9247" stroke-width="4" stroke-linecap="round"/>
    <path d="M45 30 C35 22 25 18 17 18 C21 28 33 34 45 33 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M55 30 C65 22 75 18 83 18 C79 28 67 34 55 33 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 28 C42 20 42 9 50 5 C58 9 58 20 50 28 Z" fill="#7CC46F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M34 33 C31 55 38 77 47 89 q3 4 6 0 C62 77 69 55 66 33 q-16 7 -32 0 Z" fill="#F58A33" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M36 48 q14 4 28 0" fill="none" stroke="#DE7526" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M38 62 q12 4 24 0" fill="none" stroke="#DE7526" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M42 74 q8 4 16 0" fill="none" stroke="#DE7526" stroke-width="2.6" stroke-linecap="round"/>
    <g transform="translate(50 54) scale(0.72)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  choclo: `<g>
    <path d="M28 44 q-14 12 -8 34 q16 -2 20 -16 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M72 44 q14 12 8 34 q-16 -2 -20 -16 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 14 q20 0 20 30 v22 q0 22 -20 22 q-20 0 -20 -22 V44 q0 -30 20 -30 Z" fill="#F5C93B" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="38" cy="30" r="3.4" fill="#E3B429"/>
    <circle cx="38" cy="40" r="3.4" fill="#E3B429"/>
    <circle cx="38" cy="72" r="3.4" fill="#E3B429"/>
    <circle cx="38" cy="82" r="3.4" fill="#E3B429"/>
    <circle cx="50" cy="30" r="3.4" fill="#E3B429"/>
    <circle cx="50" cy="40" r="3.4" fill="#E3B429"/>
    <circle cx="50" cy="72" r="3.4" fill="#E3B429"/>
    <circle cx="50" cy="82" r="3.4" fill="#E3B429"/>
    <circle cx="62" cy="30" r="3.4" fill="#E3B429"/>
    <circle cx="62" cy="40" r="3.4" fill="#E3B429"/>
    <circle cx="62" cy="72" r="3.4" fill="#E3B429"/>
    <circle cx="62" cy="82" r="3.4" fill="#E3B429"/>
    <g transform="translate(50 56) scale(0.68)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  brocoli: `<g>
    <path d="M42 60 h16 v24 q-8 6 -16 0 Z" fill="#B8D98F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="32" cy="44" r="16" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="68" cy="44" r="16" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="34" r="19" fill="#7CC46F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="40" cy="56" r="14" fill="#7CC46F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="60" cy="56" r="14" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <g transform="translate(50 46) scale(0.78)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  coliflor: `<g>
    <path d="M43 80 C31 80 21 74 17 66 C27 62 39 68 43 80 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M57 80 C69 80 79 74 83 66 C73 62 61 68 57 80 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M42 60 h16 v24 q-8 6 -16 0 Z" fill="#B8D98F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="32" cy="44" r="16" fill="#EFE6D2" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="68" cy="44" r="16" fill="#EFE6D2" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="40" cy="58" r="14" fill="#EFE6D2" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="60" cy="58" r="14" fill="#EFE6D2" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="44" r="20" fill="#FBF6EC" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <g transform="translate(50 46) scale(0.76)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  remolacha: `<g>
    <path d="M50 40 V16" stroke="#A63B6E" stroke-width="4" stroke-linecap="round"/>
    <path d="M40 38 C32 28 24 22 17 20" fill="none" stroke="#A63B6E" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M60 38 C68 28 76 22 83 20" fill="none" stroke="#A63B6E" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M17 20 C26 8 40 8 46 14 C40 24 26 26 17 20 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M83 20 C74 8 60 8 54 14 C60 24 74 26 83 20 Z" fill="#66B45C" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 16 C42 8 50 0 56 2 C60 10 56 16 50 20 Z" fill="#7CC46F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 34 C69 34 82 46 82 60 C82 76 64 96 50 96 C36 96 18 76 18 60 C18 46 31 34 50 34 Z" fill="#A63B6E" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 95 q2 6 5 9" fill="none" stroke="#791613" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M31 52 q5 -9 14 -12" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
    <g transform="translate(50 62) scale(0.86)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  lechuga: `<g>
    <path d="M44 62 C29 62, 16 54, 10 42 C24 38, 39 47, 44 62 Z" fill="#8FC963" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 18 C77 38, 79 72, 50 94 C21 72, 23 38, 50 18 Z" fill="#AFDA85" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 90 V34" fill="none" stroke="#6FA84E" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M50 52 l13 -9 M50 66 l13 -9 M50 52 l-13 -9 M50 66 l-13 -9" fill="none" stroke="#6FA84E" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <g transform="translate(50 62) scale(0.86)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  rucula: `<g>
    <path d="M44 62 C29 62, 16 54, 10 42 C24 38, 39 47, 44 62 Z" fill="#48853A" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 18 C77 38, 79 72, 50 94 C21 72, 23 38, 50 18 Z" fill="#5FA34A" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 90 V34" fill="none" stroke="#2F6428" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M50 52 l13 -9 M50 66 l13 -9 M50 52 l-13 -9 M50 66 l-13 -9" fill="none" stroke="#2F6428" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <g transform="translate(50 62) scale(0.86)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  pan: `<g>
    <path d="M18 46 q0 -18 32 -18 q32 0 32 18 v26 q0 12 -14 12 H32 q-14 0 -14 -12 Z" fill="#E0A868" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M18 50 q14 -8 32 -8 q18 0 32 8" fill="none" stroke="#C4854A" stroke-width="3" stroke-linecap="round"/>
    <path d="M30 36 q6 -6 12 -2" fill="none" stroke="#F0CFA5" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    <g transform="translate(50 64) scale(0.85)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  arroz: `<g>
    <path d="M22 54 q28 -22 56 0 Z" fill="#FBF6EC" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="38" cy="48" rx="3.6" ry="2.2" fill="#E6DCC8" transform="rotate(0 38 48)"/>
    <ellipse cx="50" cy="43" rx="3.6" ry="2.2" fill="#E6DCC8" transform="rotate(22 50 43)"/>
    <ellipse cx="62" cy="48" rx="3.6" ry="2.2" fill="#E6DCC8" transform="rotate(44 62 48)"/>
    <ellipse cx="44" cy="52" rx="3.6" ry="2.2" fill="#E6DCC8" transform="rotate(66 44 52)"/>
    <ellipse cx="56" cy="52" rx="3.6" ry="2.2" fill="#E6DCC8" transform="rotate(88 56 52)"/>
    <path d="M16 54 h68 q-4 30 -34 30 q-30 0 -34 -30 Z" fill="#B3E5FC" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 62 q4 12 14 16" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    <g transform="translate(50 66) scale(0.78)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  avena: `<g>
    <path d="M24 54 q26 -18 52 0 Z" fill="#E8D3AC" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="38" cy="50" rx="4.4" ry="2.6" fill="#C9A870" transform="rotate(-30 38 50)"/>
    <ellipse cx="50" cy="45" rx="4.4" ry="2.6" fill="#C9A870" transform="rotate(4 50 45)"/>
    <ellipse cx="62" cy="50" rx="4.4" ry="2.6" fill="#C9A870" transform="rotate(38 62 50)"/>
    <ellipse cx="44" cy="52" rx="4.4" ry="2.6" fill="#C9A870" transform="rotate(72 44 52)"/>
    <ellipse cx="56" cy="52" rx="4.4" ry="2.6" fill="#C9A870" transform="rotate(106 56 52)"/>
    <path d="M16 54 h68 q-4 30 -34 30 q-30 0 -34 -30 Z" fill="#FBDAF4" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 62 q4 12 14 16" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    <g transform="translate(50 66) scale(0.78)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  huevo: `<g>
    <path d="M50 16 C68 16 80 42 80 60 C80 78 66 90 50 90 C34 90 20 78 20 60 C20 42 32 16 50 16 Z" fill="#FBF6EC" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="50" cy="62" rx="16" ry="14" fill="#F5C93B"/>
    <path d="M32 40 q4 -10 12 -14" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
    <g transform="translate(50 62) scale(0.7)">
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  yogur: `<g>
    <path d="M26 36 h48 l-5 46 q-1 8 -9 8 H40 q-8 0 -9 -8 Z" fill="#FBF6EC" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M22 28 h56 q4 0 4 5 v3 q0 4 -4 4 H22 q-4 0 -4 -4 v-3 q0 -5 4 -5 Z" fill="#FBDAF4" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M32 52 h36 l-3 26 H35 Z" fill="#FBDAF4" opacity="0.55"/>
    <g transform="translate(50 62) scale(0.78)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  lentejas: `<g>
    <path d="M16 58 h68 q-4 28 -34 28 q-30 0 -34 -28 Z" fill="#FFF388" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="33" cy="48" rx="8" ry="5.6" fill="#C97B4A" transform="rotate(-18 33 48)" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="50" cy="42" rx="8" ry="5.6" fill="#C97B4A" transform="rotate(8 50 42)" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="67" cy="48" rx="8" ry="5.6" fill="#C97B4A" transform="rotate(22 67 48)" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="41" cy="52" rx="8" ry="5.6" fill="#C97B4A" transform="rotate(30 41 52)" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="59" cy="52" rx="8" ry="5.6" fill="#C97B4A" transform="rotate(-12 59 52)" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <g transform="translate(50 70) scale(0.9)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  agua: `<g>
    <path d="M28 20 h44 l-6 62 q-1 8 -9 8 H43 q-8 0 -9 -8 Z" fill="#EAF7FE" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M32 44 h36 l-4 38 q-1 6 -7 6 H43 q-6 0 -7 -6 Z" fill="#7EC8E3"/>
    <path d="M32 44 q9 6 18 0 q9 -6 18 0" fill="none" stroke="#5FB8E3" stroke-width="3" stroke-linecap="round"/>
    <path d="M38 56 q2 14 6 22" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
    <g transform="translate(50 66) scale(0.74)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  batata: `<g>
    <path d="M8 58 C18 38 40 31 58 33 C76 35 89 45 92 56 C90 70 76 83 56 85 C34 87 14 74 8 58 Z" fill="#C9743F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M22 52 q8 -11 22 -14" fill="none" stroke="#E6A876" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
    <path d="M24 70 l9 -4" fill="none" stroke="#A85C2E" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M72 46 l9 -4" fill="none" stroke="#A85C2E" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M76 68 l9 -4" fill="none" stroke="#A85C2E" stroke-width="2.6" stroke-linecap="round"/>
    <g transform="translate(50 60) scale(0.82)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

  palta: `<g>
    <path d="M50 10 v8" stroke="#8A5A3B" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 16 C64 16 74 30 74 44 C86 54 90 68 90 76 C90 89 72 96 50 96 C28 96 10 89 10 76 C10 68 14 54 26 44 C26 30 36 16 50 16 Z" fill="#4E7A3A" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M50 24 C61 24 67 34 67 46 C77 55 82 67 82 75 C82 85 68 90 50 90 C32 90 18 85 18 75 C18 67 23 55 33 46 C33 34 39 24 50 24 Z" fill="#CFE3A3" stroke="#791613" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="50" cy="78" r="11" fill="#A9713F" stroke="#791613" stroke-width="3.2" stroke-linejoin="round"/>
    <g transform="translate(50 56) scale(0.78)">
    <ellipse cx="-16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <ellipse cx="16" cy="7" rx="6" ry="4" fill="#F5A9A9" opacity="0.75"/>
    <circle cx="-9" cy="-3" r="4.2" fill="#791613"/>
    <circle cx="9" cy="-3" r="4.2" fill="#791613"/>
    <path d="M -9 6 q 9 8 18 0" fill="none" stroke="#791613" stroke-width="3.4" stroke-linecap="round"/>
  </g>
    </g>`,

}

/**
 * Devuelve el SVG de un alimento, listo para poner en la página.
 *
 *   id    -> cuál alimento (las claves de NA.DIBUJOS)
 *   tam   -> tamaño en píxeles, cuadrado
 *   opts  -> { informativo, clase }
 *
 * informativo: true  -> el lector de pantalla lo lee (es información)
 *              false -> lo ignora (es decoración y el texto ya está al lado)
 */
NA.dibujoAlimento = function dibujoAlimento(id, tam, opts) {
  const dibujo = NA.DIBUJOS[id]
  if (!dibujo) return ''
  const o = opts || {}
  const informativo = o.informativo !== false
  const alimento = NA.buscarAlimento(id)
  const accesible = informativo
    ? ` role="img" aria-label="${alimento.alt}"`
    : ' aria-hidden="true"'
  const clase = o.clase ? ` class="${o.clase}"` : ''
  const medida = tam || 72
  return (
    `<svg viewBox="0 0 100 100" width="${medida}" height="${medida}"${clase}${accesible} focusable="false">` +
    dibujo +
    '</svg>'
  )
}
