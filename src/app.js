import {picFor,preloadPic} from './pics.js';
/* ============ COURSE CONTENT ============ */
/* item: [Czech, katakana reading, Japanese meaning, note] — phrases use the feminine form where speaker gender matters */
const CH = [
 {id:'vyslovnost', cz:'Výslovnost', ja:'発音とつづり',
  tip:'チェコ語は「書いた通りに読む」言語です。アクセントはいつも最初の音節。á é í ó ú ů ý の記号は長音で、日本語の「ああ」「いい」と同じ感覚です。ハーチェク（ˇ）は音を柔らかくします：č＝チ、š＝シ、ž＝ジ、そして ř はチェコ語だけの音です。',
  items:[
   ['čas','チャス','時間','č ＝「チ」'],
   ['škola','シュコラ','学校','š ＝「シ」'],
   ['žena','ジェナ','女性・妻','ž ＝ 濁った「シ」＝「ジ」'],
   ['řeka','ルジェカ','川','ř ＝ 舌を震わせながら「ジュ」。チェコ語だけの音！'],
   ['chata','ハタ','山小屋・別荘','ch ＝ のどの奥から出す「ハ／フ」'],
   ['dobrý','ドブリー','良い','ý ＝ 長い「イー」'],
   ['práce','プラーツェ','仕事','á ＝ 長い「アー」、c ＝「ツ」'],
   ['dům','ドゥーム','家','ů ＝ 長い「ウー」'],
   ['tělo','チェロ','体','tě ＝「チェ」（t が柔らかくなる）'],
   ['vlak','ヴラク','電車','v は英語の v。語末の k はそのまま'],
   ['cena','ツェナ','値段','c はいつも「ツ」'],
   ['jaro','ヤロ','春','j ＝ ヤ行の音'],
   ['hrad','フラト','城','h は声を出す h。語末の d は「ト」になる'],
   ['kůň','クーニュ','馬','ň ＝「ニュ」'],
  ]},
 {id:'pozdravy', cz:'Pozdravy', ja:'あいさつ',
  tip:'チェコ語にも敬語のような区別があります。初対面や目上の人には Dobrý den / Na shledanou（丁寧）、家族や友達には Ahoj / Čau（くだけた言い方）。お店に入るときも「Dobrý den」とあいさつするのがマナーです。',
  items:[
   ['Dobrý den','ドブリー・デン','こんにちは（丁寧）','一日中使える丁寧なあいさつ'],
   ['Ahoj','アホイ','やあ／じゃあね','家族・友達に。会う時も別れる時も'],
   ['Čau','チャウ','やあ／バイバイ','とてもカジュアル'],
   ['Dobré ráno','ドブレー・ラーノ','おはようございます',''],
   ['Dobrý večer','ドブリー・ヴェチェル','こんばんは',''],
   ['Dobrou noc','ドブロウ・ノツ','おやすみなさい',''],
   ['Na shledanou','ナ・スフレダノウ','さようなら（丁寧）',''],
   ['Děkuji','ジェクイ','ありがとうございます',''],
   ['Díky','ジーキ','ありがとう（カジュアル）',''],
   ['Prosím','プロシーム','お願いします／どうぞ／どういたしまして','とても便利な万能の言葉'],
   ['Promiňte','プロミニテ','すみません（丁寧）','謝る時にも、呼びかける時にも'],
   ['Ano','アノ','はい','日本語の「あの」と同じ音ですが、意味は「はい」！'],
   ['Ne','ネ','いいえ','日本語の「ね」とは違う意味なので注意'],
   ['Jak se máte?','ヤク・セ・マーテ','お元気ですか？（丁寧）',''],
   ['Mám se dobře','マーム・セ・ドブルジェ','元気です',''],
   ['Těší mě','チェシー・ムニェ','はじめまして',''],
  ]},
 {id:'seznameni', cz:'Seznámení', ja:'自己紹介',
  tip:'「私は〜です」は Jsem 〜。女性が自分のことを言うときは形が変わることがあります（Jsem Japonka、Jsem vdaná）。このコースでは女性形で載せています。丁寧な「あなた」は Vy、親しい「君」は ty です。',
  items:[
   ['Jak se jmenujete?','ヤク・セ・イメヌイェテ','お名前は何ですか？（丁寧）',''],
   ['Jmenuji se…','イメヌイ・セ','私の名前は…です',''],
   ['Odkud jste?','オトクト・イステ','どちらのご出身ですか？',''],
   ['Jsem z Japonska','イセム・ズ・ヤポンスカ','日本から来ました',''],
   ['Jsem Japonka','イセム・ヤポンカ','私は日本人です','女性形。男性なら Japonec'],
   ['Bydlím v Praze','ビドリーム・フ・プラゼ','プラハに住んでいます','Praha → v Praze（場所の形）'],
   ['Učím se česky','ウチーム・セ・チェスキ','チェコ語を勉強しています',''],
   ['Mluvíte anglicky?','ムルヴィーテ・アングリツキ','英語を話せますか？',''],
   ['Mluvím trochu česky','ムルヴィーム・トロフ・チェスキ','チェコ語を少し話します',''],
   ['Nerozumím','ネロズミーム','わかりません',''],
   ['Můžete to zopakovat?','ムージェテ・ト・ゾパコヴァト','もう一度言ってもらえますか？',''],
   ['Mluvte pomalu, prosím','ムルフテ・ポマル・プロシーム','ゆっくり話してください',''],
   ['Jsem vdaná','イセム・ヴダナー','結婚しています','女性形。男性なら ženatý'],
  ]},
 {id:'cisla', cz:'Čísla', ja:'数字 0–20',
  tip:'1 と 2 は後ろの名詞の性で形が変わります：jeden（男性）/ jedna（女性）/ jedno（中性）、dva（男性）/ dvě（女性・中性）。数を数えるだけなら jedna, dva, tři… と言います。11〜19 は「-náct」で終わります。',
  items:[
   ['nula','ヌラ','0',''],['jedna','イェドナ','1','jeden / jedna / jedno'],['dva','ドヴァ','2','dva / dvě'],
   ['tři','トルジ','3','ř の練習にぴったり'],['čtyři','チティルジ','4',''],['pět','ピェト','5',''],
   ['šest','シェスト','6',''],['sedm','セドゥム','7',''],['osm','オスム','8',''],
   ['devět','デヴィェト','9',''],['deset','デセト','10',''],['jedenáct','イェデナーツト','11',''],
   ['dvanáct','ドヴァナーツト','12',''],['třináct','トルジナーツト','13',''],['čtrnáct','チトルナーツト','14',''],
   ['patnáct','パトナーツト','15',''],['šestnáct','シェスナーツト','16',''],['dvacet','ドヴァツェト','20',''],
  ]},
 {id:'velka', cz:'Velká čísla', ja:'大きい数字',
  tip:'20・30・40 は -cet、50〜90 は -desát で終わります。21 は dvacet jedna（日本語と同じ順番！）。100 は sto、1000 は tisíc。',
  items:[
   ['třicet','トルジツェト','30',''],['čtyřicet','チティルジツェト','40',''],['padesát','パデサート','50',''],
   ['šedesát','シェデサート','60',''],['sedmdesát','セドゥムデサート','70',''],['osmdesát','オスムデサート','80',''],
   ['devadesát','デヴァデサート','90',''],['dvacet jedna','ドヴァツェト・イェドナ','21','日本語と同じく「20と1」'],
   ['sto','スト','100',''],['dvě stě','ドヴィェ・スチェ','200',''],['pět set','ピェト・セト','500',''],
   ['tisíc','チシーツ','1000',''],['milion','ミリオン','100万',''],
  ]},
 {id:'pocitani', cz:'Počítání', ja:'数え方',
  tip:'日本語の助数詞（〜杯、〜枚）の代わりに、チェコ語は名詞の形が変わります。1 → 単数（jedna káva）、2〜4 → 複数（dvě kávy）、5以上 → 「〜の」の形（pět káv）。カフェで注文するときに大活躍します！',
  items:[
   ['jedna káva','イェドナ・カーヴァ','コーヒー1杯','1 → 単数'],
   ['dvě kávy','ドヴィェ・カーヴィ','コーヒー2杯','2〜4 → 複数'],
   ['pět káv','ピェト・カーフ','コーヒー5杯','5以上 → 語尾が消える'],
   ['jeden lístek','イェデン・リーステク','切符1枚','lístek は男性名詞'],
   ['dva lístky','ドヴァ・リーストキ','切符2枚',''],
   ['pět lístků','ピェト・リーストクー','切符5枚',''],
   ['jedno pivo','イェドノ・ピヴォ','ビール1杯','pivo は中性名詞'],
   ['dvě piva','ドヴィェ・ピヴァ','ビール2杯',''],
   ['pět piv','ピェト・ピフ','ビール5杯',''],
   ['Kolik je ti let?','コリク・イェ・チ・レト','何歳？（親しい人に）',''],
   ['Je mi třicet let','イェ・ミ・トルジツェト・レト','30歳です','「私に30年」という言い方'],
   ['první','プルヴニー','1番目',''],
   ['druhý','ドルヒー','2番目',''],
   ['třetí','トルジェチー','3番目',''],
  ]},
 {id:'rodina', cz:'Rodina', ja:'家族',
  tip:'チェコ語には「兄・弟」「姉・妹」を区別する単語がありません。bratr＝兄弟、sestra＝姉妹。区別したいときは starší（年上の）、mladší（年下の）を付けます。',
  items:[
   ['rodina','ロジナ','家族',''],['máma','マーマ','お母さん','親しみをこめて。maminka はもっと甘い言い方'],
   ['matka','マトカ','母',''],['táta','タータ','お父さん',''],['otec','オテツ','父',''],
   ['rodiče','ロジチェ','両親',''],['manžel','マンジェル','夫',''],['manželka','マンジェルカ','妻',''],
   ['syn','スィン','息子',''],['dcera','ツェラ','娘','d はほとんど聞こえない'],
   ['bratr','ブラトル','兄弟',''],['sestra','セストラ','姉妹',''],
   ['starší bratr','スタルシー・ブラトル','兄','starší ＝ 年上の'],['mladší sestra','ムラトシー・セストラ','妹','mladší ＝ 年下の'],
   ['babička','バビチカ','おばあちゃん',''],['dědeček','ジェデチェク','おじいちゃん',''],
   ['dítě','ジーチェ','子ども',''],['děti','ジェチ','子どもたち',''],
   ['teta','テタ','おば',''],['strýc','ストリーツ','おじ',''],['tchýně','トヒーニェ','義母（夫の母）',''],
  ]},
 {id:'barvy', cz:'Barvy', ja:'色',
  tip:'形容詞は名詞の性によって語尾が変わります：červený（男性）、červená（女性）、červené（中性）。ここでは辞書形（男性形）で載せています。例：červená růže（赤いバラ）。',
  items:[
   ['červený','チェルヴェニー','赤い',''],['modrý','モドリー','青い',''],['zelený','ゼレニー','緑の',''],
   ['žlutý','ジュルティー','黄色い',''],['černý','チェルニー','黒い',''],['bílý','ビーリー','白い',''],
   ['šedý','シェディー','灰色の',''],['hnědý','フニェディー','茶色の',''],['růžový','ルージョヴィー','ピンクの','růže（バラ）から'],
   ['fialový','フィアロヴィー','紫の','fialka（スミレ）から'],['oranžový','オランジョヴィー','オレンジ色の',''],['zlatý','ズラティー','金色の','プラハは「黄金の都」Zlatá Praha'],
  ]},
 {id:'jidlo', cz:'Jídlo a pití', ja:'食べ物と飲み物',
  tip:'食事の前は「Dobrou chuť!」（いただきます／召し上がれ）、乾杯は「Na zdraví!」。お会計は「Účet, prosím」。チェコはビール大国で、ビールが水より安いことも。',
  items:[
   ['voda','ヴォダ','水',''],['káva','カーヴァ','コーヒー','口語では kafe'],['čaj','チャイ','お茶',''],
   ['pivo','ピヴォ','ビール',''],['víno','ヴィーノ','ワイン',''],['mléko','ムレーコ','牛乳',''],
   ['chléb','フレープ','パン',''],['rohlík','ロフリーク','ロールパン','チェコの朝食の定番'],['maso','マソ','肉',''],
   ['ryba','リバ','魚',''],['rýže','リージェ','米・ごはん',''],['polévka','ポレーフカ','スープ',''],
   ['sýr','スィール','チーズ',''],['vejce','ヴェイツェ','卵',''],['jablko','ヤブルコ','りんご',''],
   ['knedlíky','クネドリーキ','クネドリーキ（パン団子）','チェコ料理の付け合わせ'],
   ['Dobrou chuť!','ドブロウ・フチ','いただきます／召し上がれ',''],
   ['Na zdraví!','ナ・ズドラヴィー','乾杯！','「健康に！」という意味'],
   ['Účet, prosím','ウーチェト・プロシーム','お会計お願いします',''],
  ]},
 {id:'veci', cz:'Věci', ja:'身の回りの物',
  tip:'名詞には3つの性があり、だいたい語尾で分かります：子音で終わる → 男性（stůl）、-a で終わる → 女性（taška）、-o で終わる → 中性（okno）。',
  items:[
   ['klíč','クリーチ','鍵',''],['telefon','テレフォン','電話',''],['taška','タシュカ','バッグ',''],
   ['peněženka','ペニェジェンカ','財布',''],['kniha','クニハ','本',''],['stůl','ストゥール','机・テーブル',''],
   ['židle','ジドレ','椅子',''],['postel','ポステル','ベッド',''],['okno','オクノ','窓',''],
   ['dveře','ドヴェルジェ','ドア',''],['hodinky','ホジンキ','腕時計',''],['deštník','デシュチニーク','傘','déšť（雨）から'],
   ['brýle','ブリーレ','眼鏡',''],['počítač','ポチータチ','パソコン',''],['pero','ペロ','ペン',''],['hrnek','フルネク','マグカップ',''],
  ]},
 {id:'cas', cz:'Čas a dny', ja:'時間と曜日',
  tip:'曜日には意味があります：středa は「真ん中（週の中日）」、neděle は「働かない日」、pátek は「5番目」。「〜曜日に」は v を付けます：v pondělí（月曜日に）。',
  items:[
   ['pondělí','ポンジェリー','月曜日',''],['úterý','ウーテリー','火曜日',''],['středa','ストルジェダ','水曜日','「真ん中」の意味'],
   ['čtvrtek','チトヴルテク','木曜日','「4番目」の意味'],['pátek','パーテク','金曜日','「5番目」の意味'],['sobota','ソボタ','土曜日',''],
   ['neděle','ネジェレ','日曜日','「働かない日」'],['dnes','ドネス','今日',''],['zítra','ジートラ','明日',''],
   ['včera','フチェラ','昨日',''],['teď','テチ','今',''],['ráno','ラーノ','朝',''],['večer','ヴェチェル','夜・晩',''],
   ['týden','ティーデン','週',''],['Kolik je hodin?','コリク・イェ・ホジン','何時ですか？',''],
  ]},
 {id:'nakupovani', cz:'Nakupování', ja:'買い物',
  tip:'お店に入ったらまず「Dobrý den」。欲しいものは「Chtěla bych…」（女性形。男性は Chtěl bych）。最後に「Děkuji, na shledanou」と言って出ましょう。',
  items:[
   ['obchod','オプホト','店',''],['Chtěla bych…','フチェラ・ビフ','…が欲しいのですが','女性形'],
   ['Máte…?','マーテ','…はありますか？',''],['Kolik to stojí?','コリク・ト・ストイー','いくらですか？',''],
   ['levný','レヴニー','安い',''],['drahý','ドラヒー','高い（値段）',''],['peníze','ペニーゼ','お金',''],
   ['Můžu platit kartou?','ムージュ・プラチト・カルトウ','カードで払えますか？',''],['hotově','ホトヴィェ','現金で',''],
   ['otevřeno','オテヴルジェノ','営業中',''],['zavřeno','ザヴルジェノ','閉店',''],['sleva','スレヴァ','セール・割引',''],
   ['pokladna','ポクラドナ','レジ',''],['Ještě něco?','イェシュチェ・ニェツォ','他に何か？','店員さんがよく聞く質問'],
   ['To je všechno','ト・イェ・フシェフノ','それで全部です',''],
  ]},
 {id:'mesto', cz:'Ve městě', ja:'街と道案内',
  tip:'「Kde je…?」は道を聞くときの魔法の言葉。doprava は「右へ」ですが「交通」という意味もあります。プラハのトラム（tramvaj）はとても便利です。',
  items:[
   ['Kde je…?','グデ・イェ','…はどこですか？','kd は「グド」と濁る'],['nádraží','ナードラジー','駅',''],
   ['zastávka','ザスターフカ','停留所',''],['tramvaj','トラムヴァイ','路面電車',''],['metro','メトロ','地下鉄',''],
   ['náměstí','ナームニェスチー','広場',''],['ulice','ウリツェ','通り',''],['nemocnice','ネモツニツェ','病院',''],
   ['lékárna','レーカールナ','薬局',''],['záchod','ザーホト','トイレ',''],['doleva','ドレヴァ','左へ',''],
   ['doprava','ドプラヴァ','右へ','「交通」という意味も'],['rovně','ロヴニェ','まっすぐ',''],
   ['blízko','ブリースコ','近い',''],['daleko','ダレコ','遠い',''],
  ]},
 {id:'pocity', cz:'Pocity', ja:'気持ちと体調',
  tip:'「寒い／暑い」は Je mi zima / Je mi teplo（「私にとって寒い」）。「お腹がすいた」は Mám hlad（「空腹を持っている」）。女性は形容詞が -á で終わります：Jsem unavená。',
  items:[
   ['Mám hlad','マーム・フラト','お腹がすいた',''],['Mám žízeň','マーム・ジーゼニュ','喉が渇いた',''],
   ['Jsem unavená','イセム・ウナヴェナー','疲れた','女性形'],['Jsem šťastná','イセム・シュチャストナー','幸せです','女性形'],
   ['Je mi zima','イェ・ミ・ジマ','寒い',''],['Je mi teplo','イェ・ミ・テプロ','暑い',''],
   ['Bolí mě hlava','ボリー・ムニェ・フラヴァ','頭が痛い',''],['Nevím','ネヴィーム','知らない／分からない',''],
   ['To je super!','ト・イェ・スペル','すごい！いいね！',''],['Těším se','チェシーム・セ','楽しみにしています',''],
   ['Mám tě ráda','マーム・チェ・ラーダ','大好き','女性が言う形'],['Miluju tě','ミルユ・チェ','愛してる',''],
  ]},
];
const ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI'];
CH.forEach((c,ci)=>{c.n=ci;c.items=c.items.map((a,i)=>({id:c.id+'-'+i,cz:a[0],kana:a[1],ja:a[2],note:a[3]||'',ch:c}))});
const ALL=CH.flatMap(c=>c.items);
const BYID=Object.fromEntries(ALL.map(w=>[w.id,w]));
const INT=[0,1,2,4,8,16]; // Leitner box → days until next review

/* ============ STATE & SAVING ============ */
// Progress lives in Firestore (see sync.ts); main.ts mounts the app once the user is signed in.
function fresh(){return {v:1,updated:0,xp:0,words:{},days:{},settings:{goal:50,autoplay:true,kana:true,slow:true}}}
function normalizeState(o){const f=fresh();if(!o||typeof o!=='object')return f;return {...f,...o,words:{...(o.words||{})},days:{...(o.days||{})},settings:{...f.settings,...(o.settings||{})}}}
let S=null;
let host={save:null,account:null};
export function setSync(s){const el=document.getElementById('sync');el.dataset.s=s;el.querySelector('span').textContent={cloud:'クラウドに保存済み',saving:'保存中…',offline:'オフライン（あとで同期）',error:'クラウド保存に失敗'}[s]}
function summary(){return {streak:streak(),level:level(),chapters:CH.map(c=>({id:c.id,wordIds:c.items.map(w=>w.id),mastery:chProgress(c)}))}}
function persist(){
  S.updated=Date.now();
  if(host.save)host.save(S,summary());
}
/** Show the app for a signed-in user. `save(S,summary)` is called after every change. */
export function mountApp(state,opts){
  S=normalizeState(state);host=opts;view={name:'home'};sess=null;lastKey='';setMsg='';resetArm=false;
  render();window.scrollTo({top:0});
}
/** Initial save, used for a brand-new account (and to migrate localStorage progress). */
export function saveAll(){persist()}
export function unmountApp(){S=null;sess=null;host={save:null,account:null};$('#app').innerHTML='';$('#topSub').innerHTML=''}

/* ============ HELPERS ============ */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const dkey=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const dnum=(d=new Date())=>Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const W=id=>S.words[id];
const box=id=>(S.words[id]?S.words[id].b:0);
function chProgress(c){return c.items.reduce((s,w)=>s+Math.min(box(w.id),5),0)/(c.items.length*5)}
function learnedCount(){return ALL.filter(w=>box(w.id)>=3).length}
function dueItems(){const t=dnum();return ALL.filter(w=>S.words[w.id]&&S.words[w.id].d<=t)}
function todayXP(){return S.days[dkey()]||0}
function streak(){let n=0;const d=new Date();if(!S.days[dkey(d)])d.setDate(d.getDate()-1);while(S.days[dkey(d)]){n++;d.setDate(d.getDate()-1)}return n}
function level(){return 1+Math.floor(S.xp/250)}
function nextChapter(){return CH.find(c=>chProgress(c)<.6)||CH[CH.length-1]}
function grade(it,result,xp){
  const t=dnum();
  const w=S.words[it.id]||(S.words[it.id]={b:0,d:t,c:0,w:0});
  if(result==='ok'){w.b=Math.min(5,w.b+1);w.c++;w.d=t+INT[w.b]}
  else if(result==='bad'){w.b=Math.max(0,w.b-2);w.w++;w.d=t}
  if(xp){S.xp+=xp;S.days[dkey()]=(S.days[dkey()]||0)+xp}
  persist();
}

/* speech */
let csVoice=null;
function loadVoices(){try{const vs=speechSynthesis.getVoices();csVoice=vs.find(v=>/^cs/i.test(v.lang))||null}catch(e){}}
if('speechSynthesis' in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
function speak(t){
  if(!('speechSynthesis' in window))return;
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/…/g,''));u.lang='cs-CZ';if(csVoice)u.voice=csVoice;u.rate=S.settings.slow?.8:1;speechSynthesis.speak(u)}catch(e){}
}
const SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
const sayBtn=(cz,label='発音を聞く')=>`<button class="say" data-say="${esc(cz)}" aria-label="${label}" title="${label}">${SPK}</button>`;
const kanaHTML=w=>S.settings.kana?`<div class="kana">${esc(w.kana)}</div>`:'';

/* ============ MANGA COMPONENTS ============ */
/* character art; cx/cy = where the face sits in the image (0–1), used to crop around it */
const ART_DIR=import.meta.env.BASE_URL+'manga/';
const ART={
  wave:{src:'girl-wave.jpg',cx:.5,cy:.13},     // learner: home, greetings, prompts
  think:{src:'girl-think.jpg',cx:.5,cy:.42},   // learner thinking: hints, wrong answers, notes
  cheer:{src:'guide-cheer.jpg',cx:.53,cy:.2},  // guide: correct answers, lesson complete
  nessie:{src:'nessie-chibi.jpg',cx:.5,cy:.4}, // mascot: home corner, empty states, daily word
};
const stripP=s=>s.toLowerCase().replace(/[?!.,…:;"„“()]/g,'');
const KEYW=new Set(ALL.filter(w=>!/\s/.test(w.cz.trim())).map(w=>stripP(w.cz)).filter(Boolean));
/* word picture (black ink on white), shown only after the answer is revealed */
function wordPic(w,cls=''){
  const src=picFor(w.cz);
  return src?`<span class="wpic ${cls}"><img src="${src}" alt="${esc(w.ja)}" decoding="async" width="512" height="512"></span>`:'';
}
const artImg=(k,cls='figure',style='')=>`<img class="${cls}" src="${ART_DIR+ART[k].src}" alt="" decoding="async" ${style?`style="${style}"`:''}>`;
/* character cut into a side of a scene panel; zoom = image width relative to its column */
function Figure(k,{side='right',zoom=1.7,top=-2,cls='',lines=false}={}){
  const a=ART[k];
  return `<div class="fig ${side} ${cls}">${lines?SpeedLines():''}${artImg(k,'figure',`width:${zoom*100}%;left:50%;top:${top}%;transform:translateX(-${a.cx*100}%)`)}</div>`;
}
/* framed head-and-shoulders crop */
function Portrait(k,{zoom=2.1,cls=''}={}){
  const a=ART[k];
  return `<div class="portrait ${cls}" aria-hidden="true">${artImg(k,'figure',`width:${zoom*100}%;left:50%;top:${Math.min(0,(.3-a.cy*zoom)*100).toFixed(1)}%;transform:translateX(-${a.cx*100}%)`)}</div>`;
}
const Nessie=(cls='')=>artImg('nessie','figure nessie '+cls);
function MangaPanel(body,{cls='',i=0,tone=false,tag='section',attrs=''}={}){
  return `<${tag} class="mp${tone?' tone':''} ${cls}" style="--i:${i}" ${attrs}>${body}</${tag}>`;
}
/* Czech text in a bubble with one key word in red: the last word that is itself a course word, else the longest word */
function SpeechBubble(text,{tail='bl',cls='',extra='',key=null,tr=''}={}){
  const parts=String(text).split(/(\s+)/);
  let k=-1;
  if(key!=null)k=parts.findIndex(p=>stripP(p)===stripP(key));
  else{
    parts.forEach((p,i)=>{if(parts.length>1&&KEYW.has(stripP(p)))k=i});
    if(k<0)parts.forEach((p,i)=>{if(p.trim()&&(k<0||stripP(p).length>=stripP(parts[k]).length))k=i});
  }
  const body=parts.map((p,i)=>i===k?`<b class="kw">${esc(p)}</b>`:esc(p)).join('');
  if(tr)return `<div class="bubble stack tail-${tail} ${cls}"><span lang="cs">${body}</span>${extra}<span class="tr">${esc(tr)}</span></div>`;
  return `<div class="bubble tail-${tail} ${cls}" lang="cs"><span>${body}</span>${extra}</div>`;
}
let spikyPath='';
function SpikyBubble(text){
  if(!spikyPath){
    const n=22;let d='';
    for(let i=0;i<n*2;i++){const t=i/(n*2)*Math.PI*2,o=i%2===0,j=o?(i%4===0?1:.93):1;
      const rx=o?100*j:84,ry=o?56*j:42;d+=(i?'L':'M')+(100+Math.cos(t)*rx).toFixed(1)+' '+(55+Math.sin(t)*ry).toFixed(1)}
    spikyPath=d+'Z';
  }
  return `<div class="spiky" lang="cs"><svg viewBox="0 0 200 110" preserveAspectRatio="none" aria-hidden="true"><path d="${spikyPath}"/></svg><span>${esc(text)}</span></div>`;
}
const ThoughtBubble=html=>`<div class="thought">${html}</div>`;
/* feedback character: ok → guide cheering with speed lines; bad/near/hint → learner thinking */
function CharacterReaction(r){
  const k=r==='ok'?'cheer':'think';
  return `<div class="react bounce" aria-hidden="true">${r==='ok'?SpeedLines({cls:'flash'}):''}${artImg(k)}</div>`;
}
function VocabBox(w,{label='Slovíčko'}={}){
  return `<div class="vocab"><span class="vocab-label">${label}</span>
    <div class="vocab-word"><b lang="cs">${esc(w.cz)}</b>${w.g?` <span class="g">(${esc(w.g)}.)</span>`:''} = ${esc(w.ja)}</div>
    ${kanaHTML(w)}${w.note?`<div class="nt">${esc(w.note)}</div>`:''}</div>`;
}
const BULB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>';
function NoteCard(text,{label='Poznámka',sub='ポイント',fig=''}={}){
  return `<aside class="note-card${fig?' with-fig':''}"><span class="bulb">${BULB}</span><div><span class="note-label">${label}<small>${sub}</small></span><p>${esc(text)}</p></div>${fig?Portrait(fig,{zoom:1.3}):''}</aside>`;
}
let linesCache='';
function SpeedLines({tone='accent',cls=''}={}){
  if(!linesCache){
    let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
    for(let i=0;i<64;i++){
      const a=(i/64+rnd()*.012)*Math.PI*2,w=.012+rnd()*.022,r0=46+rnd()*30,R=170;
      const p=(r,t)=>`${(Math.cos(t)*r).toFixed(1)} ${(Math.sin(t)*r).toFixed(1)}`;
      linesCache+=`M${p(r0,a)}L${p(R,a-w)}L${p(R,a+w)}Z`;
    }
  }
  return `<svg class="lines ${tone} ${cls}" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="${linesCache}" fill="currentColor"/></svg>`;
}

/* ============ VIEWS ============ */
let view={name:'home'};
let sess=null;
function go(v){view=v;if(v.name!=='session')sess=null;render();window.scrollTo({top:0})}

let lastKey='';
function renderTop(){
  let crumb='',pct=null,back=false,nav='';
  const total=Math.round(CH.reduce((s,c)=>s+chProgress(c),0)/CH.length*100);
  if(view.name==='home'){crumb='全体の習得度';pct=total;nav='home'}
  else if(view.name==='chapter'){const c=CH[view.ch];back=true;crumb=`Kapitola ${ROMAN[c.n]}<span class="dot">•</span>${esc(c.cz)}`;pct=Math.round(chProgress(c)*100);nav='words'}
  else if(view.name==='session'&&sess){
    crumb=sess.review?'今日の復習':`Kapitola ${ROMAN[sess.ch]}<span class="dot">•</span>${esc(CH[sess.ch].cz)}`;
    pct=Math.round(Math.min(sess.i,sess.qs.length)/sess.qs.length*100);nav='talk'}
  else if(view.name==='settings'){back=true;crumb='設定<span class="dot">•</span>Nastavení'}
  $('#topSub').innerHTML=`${back?'<button class="back" data-home aria-label="ホームへ戻る">←</button>':''}<span class="crumb">${crumb}</span>`
    +(pct==null?'':`<span class="hbar" role="progressbar" aria-label="進み具合" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></span><span class="hpct num">${pct}%</span>`);
  document.querySelectorAll('.bnav [data-nav]').forEach(b=>b.dataset.nav===nav?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
}
function render(){
  const app=$('#app');
  const key=view.name+':'+(view.ch??'')+':'+(sess?sess.i:'');
  app.classList.remove('enter');
  if(key!==lastKey){lastKey=key;void app.offsetWidth;app.classList.add('enter')}
  if(view.name==='home')app.innerHTML=homeHTML();
  else if(view.name==='chapter')app.innerHTML=chapterHTML(CH[view.ch]);
  else if(view.name==='session')app.innerHTML=sessionHTML();
  else if(view.name==='settings')app.innerHTML=settingsHTML();
  renderTop();
  if(view.name==='home'){const h=$('#hand');if(h){h.getBoundingClientRect();requestAnimationFrame(()=>requestAnimationFrame(()=>{h.style.transform=`rotate(${h.dataset.a}deg)`}))}}
  if(view.name==='session'&&sess&&sess.kind==='type'&&!sess.answered){const i=$('#typeIn');if(i)i.focus()}
  if(view.name==='session'&&sess&&sess.answered){const f=$('.fb');if(f)f.scrollIntoView({block:'nearest'})}
}

/* --- dial --- */
function polar(r,a){const t=(a-90)*Math.PI/180;return [200+r*Math.cos(t),200+r*Math.sin(t)]}
function sector(r1,r2,a0,a1){
  const L=(a1-a0)>180?1:0,[x0,y0]=polar(r2,a0),[x1,y1]=polar(r2,a1),[x2,y2]=polar(r1,a1),[x3,y3]=polar(r1,a0);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r2} ${r2} 0 ${L} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}A${r1} ${r1} 0 ${L} 0 ${x3.toFixed(2)} ${y3.toFixed(2)}Z`;
}
function dialSVG(){
  const n=CH.length,step=360/n,R1=96,R2=152,gap=1.4;
  const total=Math.round(CH.reduce((s,c)=>s+chProgress(c),0)/n*100);
  const nx=nextChapter(),handA=nx.n*step+step/2;
  let segs='',nums='',ticks='';
  CH.forEach((c,i)=>{
    const a0=i*step+gap/2,a1=(i+1)*step-gap/2,p=chProgress(c);
    const rp=R1+(R2-R1)*p;
    segs+=`<g class="seg" data-ch="${i}" tabindex="0" role="button" aria-label="${esc(c.cz)} ${esc(c.ja)} ${Math.round(p*100)}%"><title>${esc(c.cz)} · ${esc(c.ja)} — ${Math.round(p*100)}%</title>
      <path class="trk" d="${sector(R1,R2,a0,a1)}"/>
      ${p>0?`<path class="fill" d="${sector(R1,rp,a0,a1)}"/>`:''}
    </g>`;
    const [tx,ty]=polar(172,i*step+step/2);
    nums+=`<text class="d-num${c===nx?' on':''}" x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central">${ROMAN[i]}</text>`;
  });
  for(let i=0;i<72;i++){const a=i*5,[x0,y0]=polar(186,a),[x1,y1]=polar(i%6===0?179:183,a);ticks+=`<line class="d-tick" x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke-width="${i%6===0?2:1}"/>`}
  const [hx,hy]=polar(140,0);
  return `<svg class="dial" viewBox="0 0 400 400" role="img" aria-label="章ごとの習得度を示す天文時計">
    <defs><pattern id="dtone" width="7" height="7" patternUnits="userSpaceOnUse"><circle class="d-dot" cx="3.5" cy="3.5" r="1.3"/></pattern></defs>
    <circle class="d-ring" cx="200" cy="200" r="194"/>
    ${ticks}
    <circle class="d-face" cx="200" cy="200" r="158" fill="url(#dtone)"/>
    ${nums}
    ${segs}
    <circle class="d-core" cx="200" cy="200" r="90"/>
    <g id="hand" class="hand" data-a="${handA.toFixed(1)}" style="transform:rotate(0deg)">
      <line class="d-hand" x1="200" y1="214" x2="200" y2="58"/>
      <path class="d-tip" d="M200 44 l7 15 h-14z"/>
      <circle class="d-ball" cx="${hx}" cy="${hy}" r="10"/>
    </g>
    <circle class="d-core" cx="200" cy="200" r="60"/>
    <text class="d-pct" x="200" y="200" text-anchor="middle">${total}<tspan font-size="24">%</tspan></text>
    <text class="d-cap" x="200" y="224" text-anchor="middle">全体の習得度</text>
  </svg>`;
}

/* --- home --- */
function homeHTML(){
  const nx=nextChapter(),np=Math.round(chProgress(nx)*100);
  const st=streak(),tx=todayXP(),goal=S.settings.goal,due=dueItems().length,learned=learnedCount();
  const lv=level(),toNext=lv*250-S.xp;
  const wd=ALL[dnum()%ALL.length];
  const started=Object.keys(S.words).length>0;
  return `
  <div class="page">
    ${MangaPanel(`<div class="bg"></div>${Figure('wave',{side:'right',zoom:1.75,lines:true})}
      <div class="say-at l">${SpeechBubble('Ahoj! Jdeme na to?',{tail:'br',tr:'やあ！始めようか？'})}</div>
      <div class="narr"><b lang="cs">Praha</b>Staroměstský orloj</div>`,{cls:'big art scene-art greet',i:0})}
    ${MangaPanel(`${SpeedLines({tone:'ink',cls:'faint'})}<div class="hero">
      ${dialSVG()}
      <div class="hero-text">
        <span class="caption label">${started?'次の章':'はじめましょう'} · Kapitola ${ROMAN[nx.n]}</span>
        <div class="cz-big" lang="cs">${esc(nx.cz)}!</div>
        <div class="caption"><h1>${esc(nx.ja)}</h1>
        <p>${started?`この章の習得度は ${np}%。時計の針は、次に進むべき章を指しています。赤い部分が伸びるほど、単語がしっかり身についています。`:'プラハの天文時計「オルロイ」のように、学んだ分だけ文字盤が赤く満ちていきます。まずは発音から始めましょう。'}</p></div>
        <div class="actions">
          <button class="btn primary" data-open="${nx.n}">${started?'続ける':'第1章を始める'}</button>
          <button class="btn" data-review ${due?'':'disabled'}>復習する（${due}）</button>
        </div>
      </div>
    </div>`,{cls:'big',i:1,tone:true})}
    ${MangaPanel(`<span class="label">今日の単語 · Slovo dne</span>
      ${SpeechBubble(wd.cz,{extra:sayBtn(wd.cz)})}
      <div style="margin-top:6px">${VocabBox(wd)}</div>
      <div class="from">第${wd.ch.n+1}章 <span class="cz" lang="cs">${esc(wd.ch.cz)}</span> より</div>
      ${Nessie()}`,{cls:'wotd art',i:2})}
    ${MangaPanel(`<span class="label">今日の目標</span>
      <div class="v num">${tx}<small>/ ${goal} XP</small></div>
      <div class="bar"><i style="width:${Math.min(100,tx/goal*100)}%"></i></div>
      <span class="s">${tx>=goal?'目標達成！ Skvělé!':`あと ${goal-tx} XP`}</span>
      <span class="label">今日の復習</span>
      <div class="v num">${due}<small>語</small></div>
      ${due?`<span class="s">忘れる前に復習しましょう</span><button class="btn primary" data-review>復習を始める</button>`
           :`<div class="empty-row art">${Nessie('inline')}<span class="s">${started?'今日の復習は完了！':'学んだ単語がここに並びます'}</span></div>`}`,{cls:'today',i:3})}
  </div>

  <section id="progress" style="display:grid;gap:10px">
    <h2 class="sec">Pokrok <small>進み具合</small></h2>
    ${MangaPanel(`<div class="stats">
      <div class="stat"><span class="label">連続学習</span><div class="v num">${st}<small>日</small></div><span class="s">${st?'この調子！ Výborně!':'今日から始めよう'}</span></div>
      <div class="stat"><span class="label">覚えた単語</span><div class="v num">${learned}<small>/ ${ALL.length}</small></div><span class="s num">Lv ${lv} · 次まで ${toNext} XP</span></div>
    </div>
    <div style="margin-top:12px"><span class="label">学習カレンダー · Kalendář</span>
      <div class="cal-wrap">${calendarHTML()}</div>
      <div class="legend">少ない <i></i><i style="background:var(--grey)"></i><i style="background:var(--grey-2)"></i><i style="background:var(--ink);border-color:var(--ink)"></i> 目標達成 <i style="background:var(--accent);border-color:var(--accent)"></i> 目標の2倍</div>
    </div>`,{i:3})}
  </section>

  <section style="display:grid;gap:10px">
    <h2 class="sec">Kapitoly <small>レッスン</small></h2>
    <div class="chapters">${CH.map(chCardHTML).join('')}</div>
  </section>`;
}
function calendarHTML(){
  const today=new Date();today.setHours(0,0,0,0);
  const start=new Date(today);const dow=(start.getDay()+6)%7;start.setDate(start.getDate()-dow-7*17);
  const goal=S.settings.goal;let cells='';
  for(let d=new Date(start);;d.setDate(d.getDate()+1)){
    const k=dkey(d),x=S.days[k]||0,fut=d>today;
    const l=fut?0:x===0?0:x<goal/2?1:x<goal?2:x<goal*2?3:4;
    cells+=`<i data-l="${l}" class="${fut?'future':''}${+d===+today?' today':''}" title="${k}${fut?'':` · ${x} XP`}"></i>`;
    if(fut&&(d.getDay()===0))break;
    if(d.getDay()===0&&d>=today)break;
  }
  return `<div class="cal" aria-label="過去18週間の学習記録">${cells}</div>`;
}
function chCardHTML(c){
  const p=chProgress(c),pc=Math.round(p*100),seen=c.items.filter(w=>S.words[w.id]).length;
  const pill=p>=.8?'<span class="pill done">習得</span>':seen?'<span class="pill go">学習中</span>':'<span class="pill">未開始</span>';
  return `<button class="mp ch" data-open="${c.n}" style="--i:${Math.min(c.n+4,6)}">
    <span class="medal">${ROMAN[c.n]}</span>
    <span class="t" lang="cs">${esc(c.cz)}</span>
    <span class="j">${esc(c.ja)} · ${c.items.length}語</span>
    <span class="foot"><span class="bar"><i style="width:${pc}%"></i></span>${pill}</span>
  </button>`;
}

/* --- chapter --- */
function chapterHTML(c){
  const p=Math.round(chProgress(c)*100);
  const w0=c.items[0],w1=c.items[1]||w0;
  return `
  <div class="page">
    ${MangaPanel(`<div class="bg"></div>${Figure('wave',{side:'right',zoom:1.75,lines:true})}
      <div class="say-at l">${SpeechBubble(w0.cz,{tail:'br',tr:w0.ja,extra:sayBtn(w0.cz)})}</div>
      <div class="narr"><b lang="cs">Kapitola ${ROMAN[c.n]} · ${esc(c.cz)}</b>${esc(c.ja)} · 習得度 <span class="num">${p}%</span></div>`,{cls:'big art scene-art',i:0})}
    ${MangaPanel(`${Figure('cheer',{side:'left',zoom:1.55,top:-1,lines:true})}
      <div class="say-at r">${SpeechBubble(w1.cz,{tail:'bl',tr:w1.ja,extra:sayBtn(w1.cz)})}</div>`,{cls:'big art scene-art short',i:1,tone:true})}
    ${MangaPanel(VocabBox(w0),{cls:'art',i:2})}
    ${MangaPanel(`<div class="listen"><span class="tag">${SPK}poslouchej</span><div class="line" lang="cs">${SpeechBubble(w0.cz,{tail:'bl'})}${sayBtn(w0.cz)}</div><span class="kana">${esc(w0.ja)}</span></div>`,{cls:'art',i:3})}
  </div>
  ${NoteCard(c.tip,{fig:'think'})}
  <div class="cta">
    <button class="btn" data-start="cards" data-ch="${c.n}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>Procvičit</button>
    <button class="btn primary" data-start="quiz" data-ch="${c.n}">Pokračovat</button>
  </div>
  <section style="display:grid;gap:10px">
    <h2 class="sec">Režimy <small>練習モード</small></h2>
    <div class="modes">
      <button class="mp mode" style="--i:4" data-start="cards" data-ch="${c.n}"><span class="cz">Kartičky</span><b>カードで覚える</b><span>表はチェコ語、めくると意味。「覚えた」で次へ。</span></button>
      <button class="mp mode" style="--i:5" data-start="quiz" data-ch="${c.n}"><span class="cz">Kvíz</span><b>4択クイズ</b><span>10問。チェコ語→日本語、日本語→チェコ語の両方向。</span></button>
      <button class="mp mode" style="--i:6" data-start="type" data-ch="${c.n}"><span class="cz">Psaní</span><b>書いて覚える</b><span>日本語を見てチェコ語を入力。ハーチェク付きの文字も練習。</span></button>
    </div>
  </section>
  <section id="words" style="display:grid;gap:10px">
    <h2 class="sec">Slovíčka <small>単語一覧</small></h2>
    <div class="mp tbl-wrap"><table>
      <thead><tr><th></th><th>チェコ語</th><th>読み</th><th>意味</th><th>習熟</th></tr></thead>
      <tbody>${c.items.map(w=>`<tr><td style="width:44px">${sayBtn(w.cz)}</td><td class="czw">${esc(w.cz)}</td><td class="kn">${esc(w.kana)}</td><td>${esc(w.ja)}${w.note?`<span class="nt">${esc(w.note)}</span>`:''}</td><td><span class="dots" title="レベル ${box(w.id)}/5">${[1,2,3,4,5].map(k=>`<i class="${box(w.id)>=k?'on':''}"></i>`).join('')}</span></td></tr>`).join('')}</tbody>
    </table></div>
  </section>`;
}

/* --- sessions --- */
function pickForChapter(c,n){
  const t=dnum();
  const scored=shuffle(c.items).map(w=>{const s=S.words[w.id];return {w,k:s?(s.d<=t?0:1)+s.b*2:0.5}});
  scored.sort((a,b)=>a.k-b.k);
  return scored.slice(0,Math.min(n,c.items.length)).map(x=>x.w);
}
function makeQ(w){
  const dir=(box(w.id)<1||Math.random()<.5)?'cz2ja':'ja2cz';
  const pool=shuffle(w.ch.items.filter(x=>x.id!==w.id&&x.ja!==w.ja)).slice(0,3);
  return {w,dir,opts:shuffle([w,...pool]),pick:null};
}
function startSession(kind,chN){
  let items;
  if(kind==='review'){items=shuffle(dueItems()).slice(0,15);if(!items.length)return;kind='quiz'}
  else items=pickForChapter(CH[chN],kind==='type'?8:10);
  sess={kind,ch:chN,i:0,res:[],xp:0,answered:false,flipped:false,review:chN==null,
    qs:kind==='quiz'?items.map(makeQ):items.map(w=>({w}))};
  view={name:'session'};render();window.scrollTo({top:0});
  autoSpeakPrompt();
}
function autoSpeakPrompt(){
  if(!sess||!S.settings.autoplay||sess.i>=sess.qs.length)return;
  const q=sess.qs[sess.i];
  // picture cards stay silent until flipped, otherwise the audio gives the answer away
  if((sess.kind==='cards'&&!picFor(q.w.cz))||(sess.kind==='quiz'&&q.dir==='cz2ja'))speak(q.w.cz);
}
function flipCard(){
  sess.flipped=!sess.flipped;
  $('#flip').classList.toggle('on',sess.flipped);
  const w=sess.qs[sess.i].w;
  if(picFor(w.cz)){
    $('.say-row')?.classList.toggle('hide',!sess.flipped);
    if(sess.flipped&&S.settings.autoplay)speak(w.cz);
  }
}
function pipsHTML(){return `<div class="pips">${sess.qs.map((q,i)=>`<i class="${sess.res[i]||(i===sess.i?'cur':'')}"></i>`).join('')}</div>`}
function sessionHTML(){
  if(sess.i>=sess.qs.length)return summaryHTML();
  const q=sess.qs[sess.i],w=q.w;
  const title=sess.review?'今日の復習':`${ROMAN[sess.ch]} · ${esc(CH[sess.ch].cz)}`;
  const top=`<div class="sess-top"><button class="btn ghost" data-exit>✕ やめる</button>${pipsHTML()}<span class="num" style="color:var(--muted);font-size:13px;font-weight:700">${sess.i+1}/${sess.qs.length}</span></div><span class="sr-only">${title}</span>`;
  const okNow=sess.answered&&sess.res[sess.i]==='ok'?' ok':'';
  preloadPic(w.cz);if(sess.qs[sess.i+1])preloadPic(sess.qs[sess.i+1].w.cz);
  if(sess.kind==='cards'){
    const hint='<div class="hint">タップしてめくる（スペースキー）</div>';
    const note=w.note?`<div class="nt">${esc(w.note)}</div>`:'';
    // picture card: recall the Czech word from the picture, the back reveals it
    const faces=picFor(w.cz)
      ?`<div class="face pic-front">${wordPic(w,'card-pic')}<div class="q">チェコ語で何と言う？</div>${hint}</div>
          <div class="face back"><div class="cz-big" lang="cs">${esc(w.cz)}</div>${S.settings.kana?`<div class="kana">${esc(w.kana)}</div>`:''}<div class="ja-small">${esc(w.ja)}</div>${note}</div>`
      :`<div class="face">${SpeechBubble(w.cz,{cls:'big'})}${kanaHTML(w)}${hint}</div>
          <div class="face back"><div class="ja">${esc(w.ja)}</div><div class="cz" lang="cs">${esc(w.cz)}</div>${note}</div>`;
    return `<div class="sess">${top}
      <button class="flip ${sess.flipped?'on':''}" id="flip" aria-label="カードをめくる">
        <div class="flip-in">
          ${faces}
        </div>
      </button>
      <div class="row say-row ${picFor(w.cz)&&!sess.flipped?'hide':''}">${sayBtn(w.cz)}</div>
      <div class="row"><button class="btn" data-card="again">← もう一度</button><button class="btn primary" data-card="know">覚えた</button></div>
    </div>`;
  }
  if(sess.kind==='quiz'){
    const cz2ja=q.dir==='cz2ja';
    const prompt=cz2ja?`<div class="q">この言葉の意味は？</div>${SpeechBubble(w.cz,{tail:'l',cls:'big',extra:sayBtn(w.cz)})}${kanaHTML(w)}`
                      :`<div class="q">チェコ語で何と言う？</div><div class="caption prompt-ja">${esc(w.ja)}</div>`;
    const opts=q.opts.map((o,i)=>{
      let cls='';if(sess.answered){if(o===w)cls='right';else if(o===q.pick)cls='wrong'}
      return `<button class="opt ${cls}" data-opt="${i}" ${sess.answered?'disabled':''}><kbd>${i+1}</kbd><span class="o ${cz2ja?'':'cz'}" ${cz2ja?'':'lang="cs"'}>${esc(cz2ja?o.ja:o.cz)}</span></button>`}).join('');
    return `<div class="sess">${top}${MangaPanel(`<div class="scene">${Portrait('wave',{zoom:2.6})}<div class="speech">${prompt}</div></div>`,{cls:'art qcard'+okNow,tone:true})}<div class="opts">${opts}</div>${sess.answered?feedbackHTML(q.pick===w?'ok':'bad',w):''}</div>`;
  }
  // typing
  return `<div class="sess">${top}
    ${MangaPanel(`<div class="scene">${Portrait(sess.hint&&!sess.answered?'think':'wave',{zoom:sess.hint&&!sess.answered?1.3:2.6})}<div class="speech"><div class="q">チェコ語で書いてください</div><div class="caption prompt-ja">${esc(w.ja)}</div>${sess.answered?SpeechBubble(w.cz,{tail:'l',cls:'big'}):''}${sess.hint?`<div class="kana caption">${esc(w.kana)} · ${esc(w.cz[0])}…</div>`:''}</div></div>`,{cls:'art qcard'+okNow,tone:true})}
    <form class="typebox" id="typeForm" autocomplete="off">
      <input id="typeIn" lang="cs" spellcheck="false" autocapitalize="off" placeholder="ここに入力…" value="${esc(sess.typed||'')}" ${sess.answered?'disabled':''}>
      ${sess.answered?'':`<div class="keys">${'áčďéěíňóřšťúůýž'.split('').map(k=>`<button type="button" data-key="${k}">${k}</button>`).join('')}</div>
      <div class="row"><button type="button" class="btn" data-hint ${sess.hint?'disabled':''}>ヒント</button><button class="btn primary" type="submit">答え合わせ</button></div>`}
    </form>
    ${sess.answered?feedbackHTML(sess.res[sess.i],w):''}
  </div>`;
}
function feedbackHTML(r,w){
  const msg={ok:'正解！ Správně!',bad:'残念…正解は',near:'ほぼ正解！記号（ˇ ´ ˚）に注意'}[r];
  const answer=`<span class="ans" lang="cs">${esc(w.cz)}</span>`;
  const pic=wordPic(w,'fb-pic');
  const said=r==='ok'
    ?`${SpikyBubble('Výborně!')}<div class="ans-line">${pic}<div class="ans-box"><b>${msg}</b> ${answer} <span class="kana">${esc(w.kana)}</span>${sess.kind==='type'?`<div style="font-size:13px">${esc(w.ja)}</div>`:''}</div></div>`
    :`${ThoughtBubble(`<span class="ans-line">${pic}<span>${msg}${answer}<span class="kana">${esc(w.kana)} · ${esc(w.ja)}</span></span></span>`)}`;
  return MangaPanel(`${CharacterReaction(r)}<div class="fb-body">${said}
    <div class="row">${sayBtn(w.cz)}<button class="btn primary" data-next>次へ</button></div></div>`,{cls:'art fb '+r,tag:'div',attrs:'role="status"'});
}
function summaryHTML(){
  const ok=sess.res.filter(r=>r==='ok').length,near=sess.res.filter(r=>r==='near').length,n=sess.qs.length;
  const pct=Math.round((ok+near*.5)/n*100);
  const word=pct>=90?'Výborně!':pct>=70?'Skvělé!':pct>=40?'Dobře!':'Nevadí!';
  const sub=pct>=90?'素晴らしい！':pct>=70?'よくできました！':pct>=40?'いい調子！':'大丈夫、くり返せば覚えられます';
  return `<div class="sess">${MangaPanel(`${SpeedLines({cls:pct>=40?'flash':'faint',tone:pct>=40?'accent':'ink'})}<div class="summary">
    <span class="caption label">結果</span>
    <div class="sum-fig bounce" aria-hidden="true">${artImg(pct>=40?'cheer':'think')}</div>
    <div class="burst"><div class="big" lang="cs">${word}</div></div>
    <div class="caption"><h2>${sub}</h2>
    <p class="num">${sess.kind==='cards'?`${ok} 語を「覚えた」`:`${ok} / ${n} 正解`}${near?` · ほぼ正解 ${near}`:''} · <b style="color:var(--accent)">+${sess.xp} XP</b></p></div>
    <div class="row" style="margin-top:8px">
      ${sess.review?'':`<button class="btn" data-start="${sess.kind}" data-ch="${sess.ch}">もう一度</button><button class="btn" data-open="${sess.ch}">章にもどる</button>`}
      <button class="btn primary" data-home>ホームへ</button>
    </div></div>`,{cls:'big art'})}</div>`;
}
const norm=s=>s.toLowerCase().replace(/[?!.,…:;"„“()]/g,' ').replace(/\s+/g,' ').trim();
const plain=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'');
function checkTyped(){
  const q=sess.qs[sess.i],v=$('#typeIn').value;
  if(!v.trim())return;
  sess.typed=v;
  const a=norm(v),b=norm(q.w.cz);
  let r='bad';if(a===b)r='ok';else if(plain(a)===plain(b))r='near';
  sess.res[sess.i]=r;sess.answered=true;
  const xp=r==='ok'?15:r==='near'?8:0;sess.xp+=xp;
  grade(q.w,r==='near'?'seen':r,xp);
  render();if(S.settings.autoplay)speak(q.w.cz);
}
function answerQuiz(idx){
  if(sess.answered)return;
  const q=sess.qs[sess.i];q.pick=q.opts[idx];
  const ok=q.pick===q.w;sess.res[sess.i]=ok?'ok':'bad';sess.answered=true;
  const xp=ok?10:0;sess.xp+=xp;grade(q.w,ok?'ok':'bad',xp);
  render();if(S.settings.autoplay&&q.dir==='ja2cz')speak(q.w.cz);
}
function nextQ(){sess.i++;sess.answered=false;sess.flipped=false;sess.hint=false;sess.typed='';render();autoSpeakPrompt();if(sess.i>=sess.qs.length)window.scrollTo({top:0})}
function cardAnswer(know){
  const q=sess.qs[sess.i];
  sess.res[sess.i]=know?'ok':'bad';
  const xp=know?5:2;sess.xp+=xp;grade(q.w,know?'ok':'seen',xp);
  nextQ();
}

/* --- settings --- */
let setMsg='',resetArm=false;
function settingsHTML(){
  const hasSpeech='speechSynthesis' in window;
  return `<h2 class="sec">Nastavení <small>設定</small></h2>
  <div class="set">
    ${host.account?`<div class="mp account"><h3>アカウント</h3>
      <div class="acct-row">${host.account.photo?`<img class="avatar" src="${esc(host.account.photo)}" alt="" referrerpolicy="no-referrer">`:''}<div><b>${esc(host.account.name)}</b><p>${esc(host.account.email)}</p></div></div>
      <p>進み具合はこの Google アカウントのクラウドに保存されます。スマホでも同じアカウントでログインすれば続きから学習できます。</p>
      <div class="row" style="justify-content:flex-start"><button class="btn ghost" data-signout>Odhlásit se <small>ログアウト</small></button></div></div>`:''}
    <div class="mp"><h3>1日の目標</h3><p>毎日どのくらい学習するか。クイズ1問正解 = 10 XP、書き取り正解 = 15 XP。</p>
      <div class="seg-ctl">${[30,50,100,150].map(g=>`<button data-goal="${g}" aria-pressed="${S.settings.goal===g}">${g} XP</button>`).join('')}</div></div>
    <div class="mp"><h3>表示と音声</h3>
      <div class="toggle"><div><b>カタカナの読みを表示</b><p>慣れてきたら消して、つづりから読む練習を。</p></div><div class="seg-ctl"><button data-set="kana:true" aria-pressed="${S.settings.kana}">表示</button><button data-set="kana:false" aria-pressed="${!S.settings.kana}">非表示</button></div></div>
      <div class="toggle"><div><b>自動で発音を再生</b><p>カードやクイズでチェコ語を自動で読み上げます。</p></div><div class="seg-ctl"><button data-set="autoplay:true" aria-pressed="${S.settings.autoplay}">オン</button><button data-set="autoplay:false" aria-pressed="${!S.settings.autoplay}">オフ</button></div></div>
      <div class="toggle"><div><b>話す速さ</b></div><div class="seg-ctl"><button data-set="slow:true" aria-pressed="${S.settings.slow}">ゆっくり</button><button data-set="slow:false" aria-pressed="${!S.settings.slow}">ふつう</button></div></div>
      <div class="toggle"><div><b>チェコ語の音声</b><p>${!hasSpeech?'このブラウザは音声読み上げに対応していません。':csVoice?`使用中の音声：${esc(csVoice.name)}`:'チェコ語の音声が見つかりません。Windows の「設定 → 時刻と言語 → 音声認識」でチェコ語の音声を追加するか、Chrome / Edge をお使いください。'}</p></div><button class="btn" data-say="Dobrý den, jak se máte?">テスト再生</button></div>
    </div>
    <div class="mp"><h3>バックアップ</h3><p>進み具合をコードとして保存できます。別のパソコンやスマホに移すときは、このコードをコピーして「読み込む」に貼り付けてください。</p>
      <textarea id="exportBox" readonly aria-label="バックアップコード">${esc(exportCode())}</textarea>
      <div class="row" style="justify-content:flex-start"><button class="btn" data-copy>コピー</button></div>
      <textarea id="importBox" placeholder="ここにバックアップコードを貼り付け" aria-label="読み込むバックアップコード"></textarea>
      <div class="row" style="justify-content:flex-start;align-items:center"><button class="btn" data-import>読み込む</button><span class="msg ${setMsg.startsWith('!')?'bad':'ok'}">${esc(setMsg.replace(/^!/,''))}</span></div>
    </div>
    <div class="mp"><h3>最初からやり直す</h3><p>すべての進み具合と記録を消します。元に戻せません。</p>
      <div class="row" style="justify-content:flex-start">${resetArm?'<button class="btn" data-reset="yes">本当に消す</button><button class="btn" data-reset="no">やめる</button>':'<button class="btn" data-reset="arm">リセット</button>'}</div>
    </div>
  </div>`;
}
function exportCode(){try{return btoa(unescape(encodeURIComponent(JSON.stringify(S))))}catch(e){return ''}}

/* --- sign-in gate (shown by main.ts while nobody is signed in) --- */
const G_LOGO='<svg class="g-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.2C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z"/><path fill="#FBBC05" d="M10.6 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.9-6.2C1 16.6 0 20.2 0 24s1 7.4 2.7 10.9l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.2 1.5-5 2.3-8.2 2.3-6.2 0-11.5-4.1-13.4-9.8l-7.9 6.2C6.6 42.6 14.6 48 24 48z"/></svg>';
/** mode: 'signin' | 'loading' | 'denied' | 'noconfig' | 'error' */
export function gateHTML({mode='signin',error='',email=''}={}){
  const bubble={
    signin:['Ahoj! Přihlas se a jdeme na to!','ログインして、続きから始めよう！'],
    loading:['Moment…','読み込み中…'],
    denied:['Hmm… tento účet neznám.','このアカウントでは使えません。'],
    noconfig:['Chybí nastavení Firebase.','Firebase の設定が見つかりません。'],
    error:['Jejda, něco se pokazilo.','データを読み込めませんでした。'],
  }[mode];
  const fig=mode==='denied'||mode==='error'||mode==='noconfig'?'think':'wave';
  const body={
    signin:`<p>Google アカウントでログインすると、進み具合がクラウドに保存され、スマホやパソコンのどれからでも続きを学習できます。</p>
      <button class="btn primary g-btn" data-signin>${G_LOGO}Přihlásit se přes Google</button>`,
    loading:`<div class="empty-row">${Nessie('inline')}<p>進み具合を読み込んでいます…</p></div>`,
    denied:`<p><b>${esc(email)}</b> はこのアプリの利用者リストに入っていません。別の Google アカウントでログインしてください。</p>
      <button class="btn ghost" data-signout>別のアカウントを使う</button>`,
    noconfig:`<p><code>.env</code> に Firebase の値を入れてから <code>npm run dev</code> をやり直してください（SETUP.md 参照）。</p>`,
    error:`<p>ネット接続を確認して、もう一度お試しください。</p><button class="btn primary" data-retry>Zkusit znovu</button> <button class="btn ghost" data-signout>ログアウト</button>`,
  }[mode];
  return `<div class="page gate">
    ${MangaPanel(`<div class="bg"></div>${Figure(fig,{side:'right',zoom:fig==='wave'?1.75:1.5,lines:mode==='signin'})}
      <div class="say-at l">${SpeechBubble(bubble[0],{tail:'br',tr:bubble[1]})}</div>
      <div class="narr"><b lang="cs">Orloj česky</b>チェコ語を、漫画みたいに楽しく。</div>`,{cls:'big art scene-art greet',i:0})}
    ${MangaPanel(`<h2 class="display gate-title">${mode==='signin'?'Vítej! <small>ようこそ</small>':'Orloj <em>česky</em>'}</h2>${body}
      ${error?`<p class="msg bad" role="alert">${esc(error)}</p>`:''}`,{cls:'big gate-card',i:1})}
  </div>`;
}

/* ============ EVENTS ============ */
document.addEventListener('click',e=>{
  if(!S)return;
  const t=e.target.closest('button,[data-ch].seg');if(!t)return;
  const d=t.dataset;
  if(d.say!==undefined){e.stopPropagation();speak(d.say);return}
  if(t.classList.contains('seg')){go({name:'chapter',ch:+d.ch});return}
  if(d.nav){
    const nx=nextChapter();
    if(d.nav==='home')go({name:'home'});
    else if(d.nav==='words'){go({name:'chapter',ch:nx.n});$('#words').scrollIntoView()}
    else if(d.nav==='talk')dueItems().length?startSession('review',null):startSession('quiz',nx.n);
    else if(d.nav==='progress'){go({name:'home'});$('#progress').scrollIntoView()}
    return}
  if(t.id==='homeBtn'||d.home!==undefined){go({name:'home'});return}
  if(t.id==='setBtn'){setMsg='';resetArm=false;go({name:'settings'});return}
  if(d.open!==undefined){go({name:'chapter',ch:+d.open});return}
  if(d.review!==undefined){startSession('review',null);return}
  if(d.start){startSession(d.start,+d.ch);return}
  if(d.exit!==undefined){sess.review?go({name:'home'}):go({name:'chapter',ch:sess.ch});return}
  if(t.id==='flip'){flipCard();return}
  if(d.card){cardAnswer(d.card==='know');return}
  if(d.opt!==undefined){answerQuiz(+d.opt);return}
  if(d.next!==undefined){nextQ();return}
  if(d.key){const i=$('#typeIn');const s=i.selectionStart??i.value.length,en=i.selectionEnd??s;i.value=i.value.slice(0,s)+d.key+i.value.slice(en);i.focus();i.setSelectionRange(s+1,s+1);return}
  if(d.hint!==undefined){sess.typed=$('#typeIn').value;sess.hint=true;render();return}
  if(d.goal){S.settings.goal=+d.goal;persist();render();return}
  if(d.set){const [k,v]=d.set.split(':');S.settings[k]=v==='true';persist();render();return}
  if(d.copy!==undefined){const box=$('#exportBox');const txt=box.value;
    const done=()=>{setMsg='コピーしました';render()};
    try{navigator.clipboard.writeText(txt).then(done,()=>{box.select()})}catch(err){box.select()}return}
  if(d.import!==undefined){
    try{const raw=$('#importBox').value.trim();const o=JSON.parse(decodeURIComponent(escape(atob(raw))));if(!o||typeof o.words!=='object')throw 0;
      S=normalizeState(o);persist();setMsg='読み込みました！';}catch(err){setMsg='!コードを読み込めませんでした。全体をコピーできているか確認してください。'}
    render();return}
  if(d.reset==='arm'){resetArm=true;render();return}
  if(d.reset==='no'){resetArm=false;render();return}
  if(d.reset==='yes'){const keep=S.settings;S=fresh();S.settings=keep;resetArm=false;persist();setMsg='';go({name:'home'});return}
});
document.addEventListener('keydown',e=>{
  if(!S)return;
  if(e.target.closest&&e.target.closest('.seg')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();go({name:'chapter',ch:+e.target.closest('.seg').dataset.ch});return}
  if(view.name!=='session'||!sess||sess.i>=sess.qs.length)return;
  const inInput=e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA';
  if(sess.kind==='quiz'){
    if(!sess.answered&&/^[1-4]$/.test(e.key)){answerQuiz(+e.key-1);return}
    if(sess.answered&&e.key==='Enter'){e.preventDefault();nextQ();return}
  }else if(sess.kind==='cards'&&!inInput){
    if(e.key===' '){e.preventDefault();flipCard()}
    else if(e.key==='ArrowRight')cardAnswer(true);
    else if(e.key==='ArrowLeft')cardAnswer(false);
  }else if(sess.kind==='type'&&sess.answered&&e.key==='Enter'){e.preventDefault();nextQ()}
});
document.addEventListener('submit',e=>{if(S&&e.target.id==='typeForm'){e.preventDefault();checkTyped()}});

