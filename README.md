# Natalie Geburtstag · Interaktives Geschenk

Eine elegante, responsive Single-Page-Website als Geburtstagsgeschenk für Natalie. Sie kann aus vier Veranstaltungen in Hamburg wählen, und der Link zur Auswahl kann direkt zurückgeschickt werden.

## Live-Version

Die Seite ist für GitHub Pages optimiert. Nach dem Deploy ist sie unter der GitHub-Pages-URL des Repositories erreichbar.

## Inhalt

- `index.html` – Struktur der Seite
- `style.css` – Edles, responsives Design
- `script.js` – Interaktive Auswahl-Logik
- `qr-*.png` – QR-Codes zu den vier Veranstaltungen

## Funktionsweise

1. Natalie öffnet die Seite und sieht vier Veranstaltungskarten.
2. Sie kann Details aufklappen, den QR-Code einsehen und pro Veranstaltung einen Termin auswählen.
3. Über „Diesen Termin wählen“ trifft sie eine Auswahl.
4. Die URL ändert sich zu `?wahl=...&termin=...` und die gewählte Veranstaltung inklusive Termin wird prominent angezeigt.
5. Natalie kann den Link kopieren, per WhatsApp oder per Mail an dich senden.
6. Du öffnest den Link und siehst sofort, was sie sich gewünscht hat.

## Lokale Vorschau

```bash
python3 -m http.server 8000 --directory /Users/olivia/Developer/NatalieGeburtstag
```

Dann im Browser öffnen: `http://localhost:8000`

## Veröffentlichung auf GitHub Pages

1. Erstelle ein neues Repository auf GitHub (z. B. `natalie-geburtstag`).
2. Lade alle Dateien aus diesem Ordner in das Repository hoch.
3. Gehe zu **Settings → Pages** im Repository.
4. Wähle unter **Source** den Branch `main` und den Ordner `/ (root)` aus.
5. Speichere. Die Seite ist nach kurzer Zeit unter `https://DEIN_USERNAME.github.io/natalie-geburtstag` erreichbar.

## Tipps

- Du kannst die persönliche Nachricht im `<header>` der `index.html` beliebig anpassen.
- Soll sich die Zuordnung der QR-Codes zu den Veranstaltungen ändern, ersetze einfach die jeweiligen `qr-*.png`-Dateien.
- Die Farben, Schriften und Animationen sind in `style.css` zentral definiert.
# happybirthday
