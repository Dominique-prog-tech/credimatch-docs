// De handleidingbeelden van CrediMatch, in NL en FR, uit de fictieve proefklant. Op de gedeelde kern (adm-appkit/tools/beeldgenerator), naar het
// model van cleanops-docs/tools/beelden.mjs.
//
//   BEELDEN_WACHTWOORD=… node tools/beelden.mjs            alle beelden
//   BEELDEN_WACHTWOORD=… node tools/beelden.mjs dossier    enkel de beelden waarvan de naam "dossier" bevat
//
// Vereist: de preview credimatch-web draait, en tools/proefklant-vullen.py is gedraaid.
// ⚠️ "Een generator is niet af als hij werkt. Hij is af als hij WEIGERT wanneer hij het niet zeker weet." (kern-README)
//  - schermBesluit: een foutmelding, "geen toegang" of een te leeg scherm is nooit een beeld;
//  - vormBesluit:   wijkt de afmeting af van het bestaande beeld, dan NIET overschrijven maar melden;
//  - ontbrekendeTermen: staat wat de alt-tekst belooft ook op het scherm?
//  - de grendel hieronder: enkel op de eigen machine, en enkel bij de proefklant;
//  - de tariefgrendel: de tarieven van de banken horen niet op deze publieke site, dus enkel met het fictieve rooster.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PAKKET, BASIS } from './app.mjs';
import { appToestand } from '/Users/dominique/projects/adm-appkit/tools/schermmachinerie/aansturing.mjs';
import { NIET_SCHERMTEKST_BASIS, altTermen, ontbrekendeTermen, pngMaat, vormBesluit, schermBesluit, maatAlsTekst }
  from '/Users/dominique/projects/adm-appkit/tools/beeldgenerator/kern.mjs';

const { chromium } = await import(PAKKET.playwright);
const HIER = new URL('.', import.meta.url).pathname;
const DOCS = join(HIER, '..', 'docs');
const BEELDEN = join(DOCS, 'images');
const filter = process.argv[2] ?? null;
const BREED = 1440, HOOG = 900;
const WACHTWOORD = process.env.BEELDEN_WACHTWOORD;
if (!WACHTWOORD) { console.error('⛔ Zet BEELDEN_WACHTWOORD: het wachtwoord van de fictieve beheerder van de proefklant. Het staat bewust in geen enkel bestand.'); process.exit(2); }
if (!/^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(BASIS)) { console.error(`⛔ ${BASIS} is niet deze machine. Beelden komen nooit van een server.`); process.exit(2); }

// ⛔ DE TARIEFGRENDEL. Niet vragen wat de app toont, maar wat er geldt: tools/proefklant-vullen.py zet het fictieve rooster op de datum van vandaag, en een echt
// rooster dat later ingaat wint daar stil van. Geen enkele rij is ook een weigering: "niets gevonden" is geen "in orde".
const FICTIEF = 'Fictief';
const psql = (db, vraag) => execFileSync('docker', ['exec', '-i', 'credimatch-db', 'psql', '-U', 'postgres', '-d', db, '-At', '-c', vraag], { encoding: 'utf8' }).trim();
const geldend = psql('credimatch', `select distinct on (m.code) m.code, t.versie_label from regelbank.maatschappijen m join regelbank.tarief_versies t on t.maatschappij_id = m.id
  where t.status = 'gepubliceerd' and t.geldig_vanaf <= current_date order by m.code, t.geldig_vanaf desc, t.nummer desc`).split('\n').filter(Boolean);
const echteRoosters = geldend.filter(r => !r.endsWith(`|${FICTIEF}`));
if (geldend.length === 0 || echteRoosters.length) { console.error(`⛔ Er geldt een echt rooster of geen enkel (${echteRoosters.join(', ') || 'geen rij'}). Draai eerst python3 tools/proefklant-vullen.py. Gestopt; niets geschreven.`); process.exit(2); }
const echteSimulaties = psql('tenant_credimatch_proef_hypo', `select count(*) from dossiers.simulaties where tariefversie is not null and tariefversie <> '${FICTIEF}'`);
if (echteSimulaties !== '0') { console.error(`⛔ ${echteSimulaties || 'Onbekend aantal'} bewaarde simulaties dragen een echte rente. Draai eerst python3 tools/proefklant-vullen.py. Gestopt; niets geschreven.`); process.exit(2); }
// Wat nooit op een beeld mag, ook niet met het fictieve rooster: de woorden uit de lijst in de private repo, en een tariefnummer dat iets anders is dan het fictieve. Ook in de waarde
// van een invulveld: die staat niet in de tekst van de pagina. Ontbreekt de lijst, dan stopt dit script: een lege lijst zou alles doorlaten.
const NIET_PUBLIEK_WOORDEN = readFileSync(join(PAKKET.repo, 'tools', 'niet-publiek.txt'), 'utf8').split('\n').map(r => r.trim()).filter(r => r && !r.startsWith('#'));
if (NIET_PUBLIEK_WOORDEN.length === 0) { console.error('⛔ De lijst tools/niet-publiek.txt van de app is leeg. Gestopt; niets geschreven.'); process.exit(2); }
const NIET_PUBLIEK = new RegExp([...NIET_PUBLIEK_WOORDEN, '\\btarief \\d', '\\btarif \\d'].join('|'), 'i');

// Wat NIET op een beeld hoort: het versienummer, schuifbalken.
// De zinnen en de rij die zo'n woord dragen: zie NIET_PUBLIEK. Staat er toch iets van op het scherm, dan weigert het script het beeld.
const VERBERG = 'tr[data-testid="korting-Record Credits"] { display: none !important; }'
  + '.nav-version, .adm-klok-vast, .dxbl-scroll-viewer-vert-scroll-bar, .dxbl-scroll-viewer-hor-scroll-bar, [data-testid="tarief-korting"] { visibility: hidden !important; }'
  + '[data-testid="tarief-notities"] { display: none !important; }'
  + '::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb { background: transparent !important; }';

const tekstTaal = (nl, fr) => new RegExp(`${nl}|${fr}`);
const openRij = async (p, tekst) => {
  await p.getByRole('row').filter({ hasText: tekst }).first().dblclick();
  await p.waitForURL(/\/[0-9a-f-]{36}$/, { timeout: 15000 });
};

// ⚠️ ELK RECEPT DRAAGT EEN MERKTEKEN (verwacht): een tekst die op DAT scherm staat en niet op het vorige. Het script wacht erop en weigert het
// beeld zonder. De URL alleen zegt niets: Blazor wisselt de URL vóór het scherm hertekend is.
const SCHOTEN = [
  // Het merkteken van het dashboard is de uitleg ONDER de grafieken: die staat er pas als de cijfers geladen zijn.
  { naam: 'dashboard', route: '/', hoogte: 1120, verwacht: tekstTaal('De open dossiers, volgens de maand', 'Les dossiers ouverts, selon le mois') },
  { naam: 'simulaties-lijst', route: '/simulaties?periode=deze-maand', verwacht: tekstTaal('Bewaard op', 'Enregistrée le') },
  { naam: 'dossiers-lijst', route: '/dossiers', verwacht: tekstTaal('Alle open dossiers', 'Tous les dossiers ouverts') },
  { naam: 'dossier-stappen', route: '/dossiers', hoogte: 1040, verwacht: tekstTaal('Het dossier in cijfers', 'Le dossier en chiffres'),
    na: async p => { await openRij(p, 'Verstraete'); } },
  { naam: 'dossier-prescoring', route: '/dossiers', hoogte: 1840, verwacht: /tarie?f Fictief/i,
    na: async p => {
      await openRij(p, 'Coppens');
      await p.locator('.cm-stap > button').nth(6).click();
      await p.getByRole('button', { name: /^(Prescoring|Pré-scoring)$/ }).first().click();
    } },
  { naam: 'dossier-schijven', route: '/dossiers', hoogte: 1500, verwacht: tekstTaal('Rentevoet per schijf', 'Taux par tranche'),
    na: async p => {
      await openRij(p, 'Willems');
      await p.locator('.cm-stap > button').nth(6).click();
      await p.locator('.cm-splitsen').click();
      await p.getByText(/Rentevoet per schijf|Taux par tranche/).first().waitFor();
      await p.evaluate(() => document.activeElement?.blur());   // anders toont het eerste veld het bedrag zonder opmaak, zoals tijdens het typen
    } },
  { naam: 'kantoren-lijst', route: '/kantoren', verwacht: tekstTaal('Nieuw kantoor', 'Nouveau bureau') },
  { naam: 'kantoor-gebruikers', route: '/kantoren', verwacht: tekstTaal('Gebruikers van Kantoor Gent', 'Utilisateurs de Kantoor Gent'),
    na: async p => { await p.getByRole('row').filter({ hasText: /Kantoor Gent(?! \()/ }).first().getByRole('button', { name: /^(Gebruikers|Utilisateurs)$/ }).click(); } },
  // De geschiedenis noemt een trede bij haar naam, en dat is de echte hoogte van de korting: ze staat niet op het beeld.
  { naam: 'banken', route: '/instellingen/banken', hoogte: 1040, verwacht: tekstTaal('Commerciële korting', 'Réduction commerciale'), magKortZijn: 'twee banken, een korting en een uitleg',
    na: async p => { await p.getByRole('heading', { name: /^(Geschiedenis|Historique)$/ }).evaluate(k => { k.nextElementSibling?.remove(); k.remove(); }); } },
  // ⚠️ Vandaag als toetsdatum: een toetsgeval brengt zijn eigen datum mee, en op die datum geldt een echt rooster. Het fictieve geldt vanaf vandaag.
  { naam: 'proefscherm', route: '/proef', hoogte: 1500, verwacht: /tarie?f Fictief/i,
    na: async p => {
      await p.locator('dxbl-combo-box input, .dxbl-combo-box input').first().click();
      await p.locator('.dxbl-listbox-item, [role=option]').first().click();
      await p.getByRole('button', { name: /^(Laden|Charger)$/ }).click();
      await p.waitForTimeout(800);
      const nu = new Date();
      await p.locator('main input:visible, article input:visible').nth(1).fill(`${nu.getDate()}/${nu.getMonth() + 1}/${nu.getFullYear()}`);
      await p.keyboard.press('Tab');
      await p.waitForTimeout(500);
      await p.getByRole('button', { name: /^(Rekenen|Calculer)$/ }).click();
    } },
  { naam: 'prullenbak', route: '/prullenbak', verwacht: /Kantoor Oostende/, magKortZijn: 'een lijst met één verwijderd kantoor' },
  { naam: 'rollen', route: '/beheer/rollen', hoogte: 1100, verwacht: tekstTaal('Alle kantoren zien', 'Voir tous les bureaux'),
    na: async p => { await p.locator('button, a, li').filter({ hasText: /^\s*Backoffice/ }).first().click(); } },
  { naam: 'tweestapsverificatie', route: '/account/2fa', verwacht: tekstTaal('Inschakelen', 'Activer'),
    magKortZijn: 'het scherm telt in zijn beginstand een uitleg, een melding en één knop' },
];

function altUitPaginas() {
  const alt = {};
  for (const e of readdirSync(DOCS, { withFileTypes: true })) {
    if (!e.name.endsWith('.md')) continue;
    for (const m of readFileSync(join(DOCS, e.name), 'utf8').matchAll(/!\[([^\]]*)\]\(images\/([^)"\s]+)\.png/g)) alt[m[2]] ??= m[1];
  }
  return alt;
}

const ALT = altUitPaginas();
const toestand = appToestand(PAKKET.repo);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: BREED, height: HOOG }, deviceScaleFactor: 2 });
await ctx.addCookies([{ name: 'adm-theme', value: 'light', url: BASIS }]);
const page = await ctx.newPage();

await page.goto(`${BASIS}/login`);
await page.locator('input[type="text"], input[name*="ser" i]').first().fill(PAKKET.gebruiker);
await page.locator('input[type="password"]').first().fill(WACHTWOORD);
await page.locator('button[type="submit"]').first().click();
await page.waitForLoadState('networkidle');

// ⛔ DE GRENDEL: nooit beelden uit een andere klant. De proefklant is herkenbaar aan haar kantoren.
await page.goto(`${BASIS}/kantoren`); await page.waitForLoadState('networkidle');
try { await page.getByText('Kantoor Brugge').first().waitFor({ timeout: 15000 }); }
catch { console.error('⛔ Geen Kantoor Brugge: dit is niet de proefklant, of de aanmelding mislukte. Gestopt; niets geschreven.'); await browser.close(); process.exit(2); }

const geschreven = [], mislukt = [], geweigerd = [], altMissers = [];
for (const taal of ['nl-BE', 'fr-BE']) {
  await page.goto(`${BASIS}/culture/set?c=${taal}`); await page.waitForLoadState('networkidle');
  const achter = taal.startsWith('fr') ? '-fr' : '';
  for (const s of SCHOTEN) {
    if (filter && !s.naam.includes(filter)) continue;
    const bestand = `${s.naam}${achter}`;
    try {
      await page.setViewportSize({ width: BREED, height: s.hoogte ?? HOOG });
      await page.goto(`${BASIS}${s.route}`); await page.waitForLoadState('networkidle');
      await page.waitForTimeout(800);
      if (s.na) await s.na(page, taal);
      try { await page.getByText(s.verwacht).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 15000 }); }
      catch { mislukt.push(`${bestand} — het merkteken ${s.verwacht} verscheen niet: dit is niet het beloofde scherm`); continue; }
      await page.waitForTimeout(900);
      await page.addStyleTag({ content: VERBERG }).catch(() => {});
      await page.mouse.move(0, (s.hoogte ?? HOOG) - 1);

      const tekst = await page.locator('body').innerText();
      const velden = await page.locator('input:visible').evaluateAll(v => v.map(e => e.value).join(' | '));
      const nietPubliek = `${tekst} ${velden}`.match(NIET_PUBLIEK);
      if (nietPubliek) { mislukt.push(`${bestand} — "${nietPubliek[0]}" staat op het scherm: dat hoort niet op een publiek beeld`); continue; }
      const besluit = schermBesluit({ tekst, isElementSchot: false, magKortZijn: Boolean(s.magKortZijn) });
      if (!besluit.ok) { mislukt.push(`${bestand} — ${besluit.reden}`); continue; }

      const alt = ALT[bestand];
      if (alt) {
        if (altTermen(alt, NIET_SCHERMTEKST_BASIS).length === 0) altMissers.push(`${bestand}: de alt-tekst draagt geen enkele schermterm met een hoofdletter`);
        const mist = ontbrekendeTermen(alt, tekst, NIET_SCHERMTEKST_BASIS);
        if (mist.length) altMissers.push(`${bestand}: staat niet op het scherm: ${mist.join(', ')}`);
      } else altMissers.push(`${bestand}: geen verwijzing in een pagina`);

      const buf = await page.screenshot({ type: 'png' });
      const pad = join(BEELDEN, `${bestand}.png`);
      const vorm = vormBesluit({ bestaandeMaat: existsSync(pad) ? pngMaat(readFileSync(pad)) : null, nieuweMaat: pngMaat(buf), isElementSchot: false });
      if (vorm.besluit === 'weigeren') { geweigerd.push(`${bestand} — ${vorm.reden}`); continue; }
      writeFileSync(pad, buf);
      geschreven.push(`${bestand} ${maatAlsTekst(pngMaat(buf))}`);
    } catch (e) {
      mislukt.push(`${bestand} — ${String(e).split('\n')[0].slice(0, 200)}`);
      if (process.env.BEELDEN_FOUTMAP) await page.screenshot({ path: join(process.env.BEELDEN_FOUTMAP, `${bestand}.png`) }).catch(() => {});
    }
  }
}
await page.goto(`${BASIS}/culture/set?c=nl-BE`).catch(() => {});
await browser.close();

console.log(`App: ${toestand.sha?.slice(0, 8)}${toestand.vuil ? ' (werkmap VUIL)' : ''}. Geschreven: ${geschreven.length}.`);
for (const g of geschreven) console.log('  ✔', g);
for (const [kop, lijst] of [['❌ MISLUKT', mislukt], ['⛔ GEWEIGERD (vorm)', geweigerd], ['⚠️ ALT-TEKST', altMissers]])
  if (lijst.length) { console.log(`\n${kop}`); for (const l of lijst) console.log('  ', l); }
if (mislukt.length || geweigerd.length) process.exit(1);
