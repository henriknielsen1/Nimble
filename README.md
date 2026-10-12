# Nimble 2.0 Web Portal

Digitalt karakterark og spillerguide til bordrollespillet (TTRPG) Nimble 2.0, bygget som en statisk webapplikation til GitHub Pages (HTML, CSS og vanilla JavaScript).

## Funktioner

- **Karakterkatalog & Kloning:** Vælg mellem foruddefinerede karakterer og opret redigerbare kopier, der gemmes lokalt i din browser (`localStorage`).
- **Aktivt karakterark:** Hold styr på HP, wounds, egenskaber, kamphandlinger, udstyr med slot-beregning og noter.
- **A4-udskrift:** Optimeret print-stylesheet til udskrift på papir eller PDF.
- **Spillerguide:** Hurtigt opslagsværk over Nimble 2.0-reglerne.
- **Karakter-portræt (AI):** Generering af unikke fantasy-portrætter direkte på arket vha. Google Gemini API.

---

## Karakter-portrætter med Google Gemini API

Karakterarket kan generere et stemningsfuldt fantasy-portræt, der automatisk skræddersys efter karakterens herkomst (ancestry), klasse, baggrund, kendetegn/udseende, udstyr og citat.

### Sådan får du en gratis Gemini API-nøgle

1. Gå til [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Log ind med din Google-konto.
3. Klik på **Create API key** (eller **Get API key**).
4. Kopiér nøglen (begynder typisk med `AIzaSy...`).
5. Åbn dit karakterark i Nimble og klik på **"🎨 Generér portræt"** (eller **"🎨 Portræt & API-nøgle"** i værktøjslinjen).
6. Indsæt din nøgle i indstillingsfeltet.

### Sikkerhed og privatliv

- **Lokal lagring:** API-nøglen gemmes udelukkende i din browsers `localStorage` (`nimble_gemini_api_key`) og bliver aldrig sendt til nogen server undtagen Googles officielle Gemini API endpoint.
- **Ingen hemmeligheder i koden:** Projektet indeholder ingen hardcodede nøgler.
- **Lageroptimering:** Det genererede billede nedskaleres og komprimeres via HTML5 Canvas, før det gemmes sammen med karakteren i browseren, så det fylder minimalt og bevares ved genindlæsning eller JSON-eksport.
- **Tilpasning:** Før generering kan du tilføje ekstra beskrivelser (fx hårfarve, ar eller udtryk) eller redigere den fulde prompt frit, samt generere igen eller fjerne billedet.
- **Print:** Portrættet medtages elegant på A4-udskriften ved siden af karakterens navn. Hvis der ikke er genereret et portræt, skjules placeholderen under udskrift.