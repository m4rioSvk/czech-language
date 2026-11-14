/* Word pictures: Czech word (exactly as in the course data) -> file in public/manga/words/.
   Words without an entry simply show no picture. */
export const PICS = {
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
  "Mám hlad": 'mam-hlad.webp',
  "Mám žízeň": 'mam-zizen.webp',
  "Jsem unavená": 'jsem-unavena.webp',
  "Jsem šťastná": 'jsem-stastna.webp',
  "Je mi zima": 'je-mi-zima.webp',
  "Je mi teplo": 'je-mi-teplo.webp',
  "Bolí mě hlava": 'boli-me-hlava.webp',
  "Nevím": 'nevim.webp',
  "To je super!": 'to-je-super.webp',
  "Těším se": 'tesim-se.webp',
  "Mám tě ráda": 'mam-te-rada.webp',
  "Miluju tě": 'miluju-te.webp',
  "rodina": 'rodina.webp',
  "máma": 'mama.webp',
  "matka": 'matka.webp',
  "táta": 'tata.webp',
  "otec": 'otec.webp',
  "rodiče": 'rodice.webp',
  "manžel": 'manzel.webp',
  "manželka": 'manzelka.webp',
  "syn": 'syn.webp',
  "dcera": 'dcera.webp',
  "bratr": 'bratr.webp',
  "sestra": 'sestra.webp',
  "starší bratr": 'starsi-bratr.webp',
  "mladší sestra": 'mladsi-sestra.webp',
  "babička": 'babicka.webp',
  "dědeček": 'dedecek.webp',
  "dítě": 'dite.webp',
  "děti": 'deti.webp',
  "teta": 'teta.webp',
  "strýc": 'stryc.webp',
  "tchýně": 'tchyne.webp',
  "Kde je…?": 'kde-je.webp',
  "nádraží": 'nadrazi.webp',
  "zastávka": 'zastavka.webp',
  "tramvaj": 'tramvaj.webp',
  "metro": 'metro.webp',
  "náměstí": 'namesti.webp',
  "ulice": 'ulice.webp',
  "nemocnice": 'nemocnice.webp',
  "lékárna": 'lekarna.webp',
  "záchod": 'zachod.webp',
  "doleva": 'doleva.webp',
  "doprava": 'doprava.webp',
  "rovně": 'rovne.webp',
  "blízko": 'blizko.webp',
  "daleko": 'daleko.webp',
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
