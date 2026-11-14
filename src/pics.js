/* Word pictures: Czech word (exactly as in the course data) -> file in public/manga/words/.
   Words without an entry simply show no picture. */
export const PICS = {
  // Jídlo a pití
  "voda": 'voda.webp',
  "káva": 'kava.webp',
  "čaj": 'caj.webp',
  "pivo": 'pivo.webp',
  "víno": 'vino.webp',
  "mléko": 'mleko.webp',
  "chléb": 'chleb.webp',
  "rohlík": 'rohlik.webp',
  "maso": 'maso.webp',
  "ryba": 'ryba.webp',
  "rýže": 'ryze.webp',
  "polévka": 'polevka.webp',
  "sýr": 'syr.webp',
  "vejce": 'vejce.webp',
  "jablko": 'jablko.webp',
  "knedlíky": 'knedliky.webp',
  "Dobrou chuť!": 'dobrou-chut.webp',
  "Na zdraví!": 'na-zdravi.webp',
  "Účet, prosím": 'ucet-prosim.webp',
  // Věci
  "klíč": 'klic.webp',
  "telefon": 'telefon.webp',
  "taška": 'taska.webp',
  "peněženka": 'penezenka.webp',
  "kniha": 'kniha.webp',
  "stůl": 'stul.webp',
  "židle": 'zidle.webp',
  "postel": 'postel.webp',
  "okno": 'okno.webp',
  "dveře": 'dvere.webp',
  "hodinky": 'hodinky.webp',
  "deštník": 'destnik.webp',
  "brýle": 'bryle.webp',
  "počítač": 'pocitac.webp',
  "pero": 'pero.webp',
  "hrnek": 'hrnek.webp',
};

const DIR = import.meta.env.BASE_URL + 'manga/words/';

/** URL of the picture for a Czech word, or null if there is none. */
export function picFor(cz) {
  const f = PICS[cz];
  return f ? DIR + f : null;
}

const warmed = new Set();
/** Start downloading a word's picture in the background (e.g. the next card). */
export function preloadPic(cz) {
  const url = picFor(cz);
  if (!url || warmed.has(url)) return;
  warmed.add(url);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
}
