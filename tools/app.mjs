// Wat het pakket IS, voor de gedeelde schermmachinerie en beeldgenerator (adm-appkit/tools): poort, proefklant, paden.
// Zelfde vorm als cleanops-docs/tools/app.mjs.
//
// ⚠️ De beelden komen ALTIJD uit de fictieve proefklant proef-hypo (Dominique, 2/11/2026), lokaal, nooit uit productie. Vullen: proefklant-vullen.py.
// ⚠️ Een beheerder van de proefklant meldt zich aan, geen operator van ADM: zo toont het menu wat een klant ziet. Dat wachtwoord staat in geen
//    enkel bestand van deze repo: het komt uit de omgeving (BEELDEN_WACHTWOORD).
export const PAKKET = {
  naam: 'CrediMatch',
  basis: 'http://127.0.0.1:6345',   // de preview credimatch-web
  repo: process.env.CREDIMATCH_REPO ?? '/Users/dominique/projects/adm-credimatch',
  gebruiker: process.env.BEELDEN_GEBRUIKER ?? 'dashboard-proef@proef-hypo.local',
  // CrediMatch draagt geen Playwright: het pakket van een andere app volstaat, dit is enkel een browser.
  playwright: process.env.PLAYWRIGHT_PAD ?? '/Users/dominique/projects/adm-cleanops/src/Host/CleanOps.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs',
};
export const BASIS = PAKKET.basis;
