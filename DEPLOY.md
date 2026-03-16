# Deploy uputstvo — ruvidic.com

## Opcija A: Vercel (preporučeno — 10 minuta)

### Korak 1 — GitHub nalog
Idi na https://github.com i napravi nalog ako nemaš.

### Korak 2 — Novi repozitorijum
1. Klikni "New repository"
2. Naziv: `ruvidic-portfolio`
3. Ostavi Public
4. Klikni "Create repository"

### Korak 3 — Upload fajlova
1. U repozitorijumu klikni "uploading an existing file"
2. Prevuci `index.html` i `vercel.json`
3. Klikni "Commit changes"

### Korak 4 — Vercel deploy
1. Idi na https://vercel.com
2. "Sign in with GitHub"
3. "Add New Project" → importuj `ruvidic-portfolio`
4. Klikni "Deploy" — gotovo za 30 sekundi!

### Korak 5 — Poveži ruvidic.com domen
1. U Vercel projektu → "Settings" → "Domains"
2. Unesi: `ruvidic.com` i `www.ruvidic.com`
3. Vercel će ti pokazati DNS zapise
4. Idi kod registrara gde si kupio domen
5. U DNS podešavanjima dodaj:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
6. Sačekaj 15–60 minuta za propagaciju

---

## Opcija B: Netlify (isto jednostavno)
1. Idi na https://netlify.com
2. Prevuci celi folder `ruvidic/` direktno na stranicu
3. Odmah radi na *.netlify.app linku
4. Settings → Domain management → dodaj ruvidic.com

---

## Dodavanje fotografija

U HTML fajlu pronađi `placeholder-img` sekcije i zameni ih sa:

```html
<img src="fotografije/astro-orion.jpg" alt="M42 Orion" style="width:100%;height:100%;object-fit:cover">
```

Preporučene dimenzije fotografija: 800×600px minimum, JPEG 85% kvalitet.

---

## Kontakt forma (da zaista šalje emailove)

1. Idi na https://formspree.io — besplatno do 50 poruka/mesec
2. Napravi novi form, dobijaš `form ID`
3. U `index.html` nađi `handleFormSubmit()` i zameni sa:

```javascript
async function handleFormSubmit() {
  const ime = document.querySelector('input[placeholder*="ime"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const poruka = document.querySelector('textarea').value;
  
  const res = await fetch('https://formspree.io/f/TVOJ_ID', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ime, email, poruka})
  });
  
  const btn = document.querySelector('.btn-send');
  if(res.ok) {
    btn.textContent = 'Poruka poslata ✓';
    btn.style.background = 'var(--green)';
  } else {
    btn.textContent = 'Greška — pokušaj ponovo';
  }
  btn.disabled = true;
}
```
