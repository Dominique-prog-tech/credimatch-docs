#!/usr/bin/env python3
"""De fictieve gegevens van de proefklant, waaruit de handleidingbeelden komen (tools/beelden.mjs). Enkel lokaal.

Draai: python3 tools/proefklant-vullen.py. Vraagt de container credimatch-db en de lokale proefklant proef-hypo. Opnieuw draaien
vervangt enkel wat dit script zelf maakte (herkenbaar aan aangemaakt_door). Elke naam begint met "Fictief": de site is publiek en
er hoort geen enkele echte klant op een beeld (vlootregel, handleiding-schrijfregels §4).

Voor de beelden meldt een beheerder van de proefklant zich aan, geen operator van ADM: zo toont het menu wat een klant ziet. Het script
geeft die rol aan het bestaande fictieve account, als dat er is. Een wachtwoord staat hier bewust niet: zie tools/beelden.mjs.

DE TARIEVEN: de tarieven van de banken horen niet op deze publieke site. Dit script zet daarom een FICTIEF rooster in de lokale regelbank, met verzonnen rentes en namen en het
versielabel "Fictief". Het script daarvoor staat in de private repo van de app (tools/fictief-rooster.py), want het kent de vorm van de echte roosters. ⚠️ De regelbank is gedeeld over alle
klanten: lokaal rekent elke klant met dit rooster tot je het weghaalt, met python3 tools/proefklant-vullen.py --tarief-weg. Het staat op de datum van vandaag: draai dit script dus op de dag
van de beelden. tools/beelden.mjs weigert anders.
"""
import datetime as dt, json, os, pathlib, subprocess, sys, uuid

GENT = '868ebc6d-e35b-4c53-a499-c4fbd9cb2003'
BRUGGE = '20acf652-9918-4e93-a114-547e32826e27'
OOSTENDE = '5d0c9c52-0f6e-4f43-9a54-3f1d6a4e7b10'
KLANT = 'tenant_credimatch_proef_hypo'
ACCOUNT = 'dashboard-proef@proef-hypo.local'
MAKER = 'proefklant-vullen'
NU = dt.datetime.now(dt.timezone.utc).replace(hour=5, minute=0, second=0, microsecond=0)
ROOSTER = pathlib.Path(os.environ.get('CREDIMATCH_REPO', pathlib.Path.home() / 'projects' / 'adm-credimatch')) / 'tools' / 'fictief-rooster.py'
FICTIEF = 'Fictief'
FORMULE = {'Elantis': 'Vast', 'Record Credits': '5/5/5 (cap 5 %)'}

def q(sql, db=KLANT):
    r = subprocess.run(['docker', 'exec', '-i', 'credimatch-db', 'psql', '-U', 'postgres', '-d', db, '-At', '-v', 'ON_ERROR_STOP=1'], input=sql, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(r.stderr)
    return r.stdout.strip()

# (maanden terug, kantoor, naam, doel, volledig?, simulaties [(bank, oordeel, bedrag, dagen geleden)])
RIJEN = [
    (11, GENT, 'Willems', 'aankoop', True, [('Elantis', 'positief', 280000, 330)]),
    (10, BRUGGE, 'Maes', 'nieuwbouw', True, [('Elantis', 'positief onder voorwaarden', 310000, 300), ('Record Credits', 'weigering', 310000, 300)]),
    (9, GENT, 'Jacobs', 'aankoop_met_werken', True, [('Record Credits', 'positief', 245000, 270)]),
    (9, GENT, 'Mertens', 'werken', False, []),
    (8, BRUGGE, 'Claes', 'aankoop', True, [('Elantis', 'weigering', 400000, 240), ('Elantis', 'positief', 360000, 235)]),
    (7, GENT, 'Goossens', 'herfinanciering', True, [('Elantis', 'menselijk oordeel', 190000, 210)]),
    (6, BRUGGE, 'Wouters', 'aankoop', False, [('Record Credits', 'niet volledig getoetst', 220000, 180)]),
    (5, GENT, 'De Smet', 'nieuwbouw', True, [('Elantis', 'positief', 335000, 150), ('Record Credits', 'positief onder voorwaarden', 335000, 150)]),
    (5, GENT, 'Pauwels', 'aankoop', True, [('Record Credits', 'weigering', 500000, 150)]),
    (4, BRUGGE, 'Hermans', 'aankoop_met_verbouwing', True, [('Elantis', 'positief', 275000, 120)]),
    (3, GENT, 'Aerts', 'verbouwing', False, []),
    (3, BRUGGE, 'Vermeulen', 'aankoop', True, [('Elantis', 'menselijk oordeel', 295000, 90), ('Record Credits', 'positief', 295000, 90)]),
    (2, GENT, 'Dubois', 'externe_herfinanciering', True, [('Record Credits', 'niet volledig getoetst', 150000, 60)]),
    (1, BRUGGE, 'Lemmens', 'nieuwbouw', False, [('Elantis', 'weigering', 380000, 30)]),
    (1, GENT, 'Stevens', 'aankoop', True, [('Elantis', 'positief onder voorwaarden', 265000, 28)]),
    (0, GENT, 'Coppens', 'aankoop', True, [('Elantis', 'positief', 255000, 1), ('Record Credits', 'weigering', 255000, 1)]),
    (0, BRUGGE, 'Bogaert', None, False, [('Elantis', 'niet volledig getoetst', 210000, 1)]),
    (0, BRUGGE, 'Smets', 'werken', True, [('Record Credits', 'positief onder voorwaarden', 95000, 0)]),
]

if '--tarief-weg' in sys.argv:
    subprocess.run([sys.executable, str(ROOSTER), '--weg'], check=True)
    raise SystemExit

subprocess.run([sys.executable, str(ROOSTER)], check=True)

# ⚠️ Een simulatie met een echte rente hoort nooit op een beeld, ook niet een proefsimulatie die iemand lokaal bewaarde.
q(f"delete from dossiers.simulaties where tariefversie is not null and tariefversie <> '{FICTIEF}';")

# De korting van de klant: een fictieve instelling voor het beeld van Banken. Een momentopname wijzigt nooit, dus enkel een nieuwe als ze verschilt.
KORTINGEN = [{'Bank': 'Elantis', 'Standaard': 'commercieel_05', 'Plafond': 'commercieel_15'}]
# Een lokale proef met een andere korting zou in de geschiedenis op het beeld van Banken staan (zie NIET_PUBLIEK in tools/beelden.mjs).
q("""alter table instellingen.momentopnames disable trigger momentopnames_onveranderlijk;
delete from instellingen.momentopnames where kortingen::text like '%Record Credits%';
alter table instellingen.momentopnames enable trigger momentopnames_onveranderlijk;""")
if json.loads(q('select kortingen from instellingen.momentopnames order by nummer desc limit 1') or '[]') != KORTINGEN:
    j = json.dumps(KORTINGEN)
    q(f"insert into instellingen.momentopnames(id,nummer,uitgezet,kortingen,aangemaakt_op,door) select '{uuid.uuid4()}', coalesce(max(nummer),0)+1, '{{}}', '{j}', now(), '{ACCOUNT}' from instellingen.momentopnames;")

vol = q('select gegevens from dossiers.dossiers where nummer=4')
if not vol:
    raise SystemExit('Dossier 4 (het volledige fictieve dossier, toetsgeval T01) ontbreekt: daar vertrekt dit script van.')
vol = json.loads(vol)
q(f"delete from dossiers.simulaties where dossier_id in (select id from dossiers.dossiers where aangemaakt_door='{MAKER}'); delete from dossiers.dossiers where aangemaakt_door='{MAKER}';")
# Dossier 4 houdt zijn oranje getal in de stappenbalk (schattingswaarde): zo toont het beeld van de wizard beide toestanden.
q("update dossiers.dossiers set omschrijving='Fictief dossier Verstraete, aankoop' where nummer=4;")
nummer = int(q('select max(nummer) from dossiers.dossiers'))
sql = []
for maanden, kantoor, naam, doel, volledig, simulaties in RIJEN:
    nummer += 1
    id = str(uuid.uuid4())
    op = NU - dt.timedelta(days=maanden * 30 + (0 if maanden == 0 else 3), hours=maanden)
    if volledig:
        g = json.loads(json.dumps(vol))
        if doel:
            g['dossier']['doel'] = doel
        if naam == 'Willems':   # voor het beeld van de schijven: de eerste aanvrager is op het einde ouder dan 67
            g['kredietnemers'][0]['geboortedatum'] = '1978-02-01'
        g['dossier']['ander_belgisch_pand_in_waarborg'] = False
        g['dossier'].pop('rentevoet', None)   # zonder eigen rentevoet rekent de kaart met het tarief van de bank
        for pand in g['panden']:
            pand['kenmerken_pand'] = []
            pand['schattingswaarde'] = pand.get('aankoopprijs', 360000)
    else:
        g = {'dossier': {'datum_indiening': '2026-11-02', **({'doel': doel} if doel else {})}, 'kredietnemers': [{}], 'panden': [{}], 'schijven': [{}], 'lasten': []}
    omschrijving = f"Fictief dossier {naam}" + (f", {doel.replace('_', ' ')}" if doel else '')
    gegevens = json.dumps(g).replace("'", "''")
    bijgewerkt = op + dt.timedelta(days=2) if maanden else op
    sql.append(f"insert into dossiers.dossiers(id,kantoor_id,nummer,omschrijving,bron,gegevens,aangemaakt_op,aangemaakt_door,bijgewerkt_op) values('{id}','{kantoor}',{nummer},'{omschrijving}','credimatch','{gegevens}','{op.isoformat()}','{MAKER}','{bijgewerkt.isoformat()}');")
    for bank, oordeel, bedrag, dagen in simulaties:
        o = NU - dt.timedelta(days=dagen)
        # Verzonnen, zoals het rooster: de maandlast is enkel de annuïteit van die verzonnen rente.
        rente = round(0.0335 + (nummer % 7) * 0.0006 + (0.0004 if bank == 'Elantis' else 0), 4)
        m = (1 + rente) ** (1 / 12) - 1
        maandlast = round(bedrag * m / (1 - (1 + m) ** -300), 2)
        sql.append(f"insert into dossiers.simulaties(id,dossier_id,kantoor_id,soort,bank,variant,bedrag,looptijd_jaren,toetsdatum,oordeel,regels_van_het_oordeel,regelversie,instellingen,motor,invoer,uitkomst,rente_bron,rentevoet,tariefversie,formule,eerste_maandlast,aangemaakt_op,door) values('{uuid.uuid4()}','{id}','{kantoor}','krediet','{bank}','standaard',{bedrag},25,'{o.date()}','{oordeel}','{{}}','proef','standaard','fictief','{{}}','{{}}','tarief',{rente},'{FICTIEF}','{FORMULE[bank]}',{maandlast},'{o.isoformat()}','makelaar@proef-hypo.local');")
# Een kantoor in de prullenbak, voor het beeld van de prullenbak.
sql.append(f"insert into kantoren.kantoren(id,naam,actief,bron,created_at,archived_on_utc) values('{OOSTENDE}','Kantoor Oostende (fictief, gesloten)',false,'credimatch',now(),now()) on conflict (id) do nothing;")
q('\n'.join(sql))
# Record kent geen vaste rente: voor het beeld van de schijven staat er een formule gekozen, anders toont die kaart enkel de vraag om er een te kiezen.
q("""update dossiers.dossiers set tarief_keuzes='{"Record Credits": {"formule": "5/5/5-cap5"}}' where omschrijving like 'Fictief dossier Willems%';""")
print(q('select count(*) from dossiers.dossiers where archived_on_utc is null'), 'dossiers,', q('select count(*) from dossiers.simulaties'), 'simulaties')

account = q(f"""select id from control."AspNetUsers" where user_name='{ACCOUNT}'""", 'credimatch_control')
if account:
    q(f"""insert into platform.user_tenant_roles(user_id,tenant_role_id) select '{account}', id from platform.tenant_roles where name='Tenant-beheerder' on conflict do nothing;""", 'credimatch_control')
    q(f"""update control."AspNetUsers" set display_name='Fictieve beheerder' where id='{account}';""", 'credimatch_control')
    print(ACCOUNT, 'is beheerder van de proefklant')
else:
    print(f'⚠️ {ACCOUNT} bestaat niet: maak lokaal een fictieve beheerder van de proefklant aan vóór je beelden maakt.')
