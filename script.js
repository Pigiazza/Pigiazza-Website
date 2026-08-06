// Modifica qui se il tuo username GitHub non coincide con "Pigiazza".
const CONFIG = {
  socials: [
    { key: "github", name: "GitHub", url: "https://github.com/Pigiazza", icon: "assets/github.png" },
    { key: "modrinth", name: "Modrinth", url: "https://modrinth.com/user/Pigiazza", icon: "assets/modrinth.png" },
    { key: "curseforge", name: "CurseForge", url: "https://www.curseforge.com/members/pigiazza", icon: "assets/curseforge.png" },
    { key: "kofi", name: "Ko-fi", url: "https://ko-fi.com/pigiazza", icon: "assets/kofi.png" },
  ],
};

// --- Traduzioni: solo le chiavi di questa pagina. nav.js porta le proprie
// (nav.*, backToTop.aria, footer.tagline) e le unisce allo stesso dizionario
// PRIMA che applyLanguage() venga chiamato in fondo a questo file. ---

const ROTATING_WORDS = {
  en: ["Mods", "Plugins", "Datapacks", "Servers"],
  it: ["Mod", "Plugin", "Datapack", "Server"],
};

Object.assign(window.PIGIAZZA_STRINGS.en, {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.headingPre": "The place to find",
    "hero.headingPost": "made by someone who lives and breathes Minecraft.",
    "hero.sub": "New to modding. I build things I actually want to use, test them properly, then publish them.",
    "hero.ctaProjects": "See what I’ve built",
    "hero.ctaContact": "Say hello",
    "about.statement": "Every project starts the same way: there’s something Minecraft doesn’t have yet, so I build it. Then I make sure it actually holds up before anyone else sees it.",
    "about.bio1": "I’m Tommaso, known online as Pigiazza, one person and one editor, no team. I picked up Java to fix something that annoyed me on my own server, and never really stopped.",
    "about.bio2": "No roadmap, no backers, no deadlines but my own. Just whatever Minecraft is missing this week, built until it’s solid enough to hand to strangers on the internet.",
    "about.bio3": "Fabric is home base, but every mod ships for Forge, NeoForge and Quilt too, across every Minecraft version that supports it, so nobody’s left out over a loader choice.",
    "about.step1Title": "Idea",
    "about.step1Text": "Something’s missing or annoying in my own world. That’s the whole brief.",
    "about.step2Title": "Build",
    "about.step2Text": "Heads-down in the code, running it on my own server the whole time.",
    "about.step3Title": "Ship",
    "about.step3Text": "Once it survives real play without breaking, it goes up on Modrinth.",
    "about.stackTitle": "What I build with",
    "faq.heading": "Questions people actually ask",
    "faq.q1": "Are your mods free?",
    "faq.a1": "Always. There’s a Ko-fi link below if you’d like to support the work, but it’s never required.",
    "faq.q2": "Do you take requests?",
    "faq.a2": "Sometimes — if it’s something I’d genuinely want to build myself, I’ll consider it.",
    "faq.q3": "How often do things get updated?",
    "faq.a3": "Whenever something breaks or I find a better way to do it. There’s no fixed schedule — it’s just me.",
    "faq.q4": "Found a bug?",
    "faq.a4pre": "Use the",
    "faq.a4link": "report a bug",
    "faq.a4post": "page — pick the project and it opens a ready-made GitHub issue for you. I read every one.",
    "faq.q5": "What do you build with?",
    "faq.a5": "Java, mainly on Fabric, then ported to Forge, NeoForge and Quilt for every supported version. Builds run through Gradle, everything lives in Git.",
    "faq.q6": "Is the source code public?",
    "faq.a6pre": "Yes. Check the",
    "faq.a6link": "projects page",
    "faq.a6post": "— every one links to Modrinth, and from there straight to its GitHub repo.",
    "contact.heading": "Find me elsewhere",
    "contact.subtext": "You’ll find the code on GitHub, downloads on Modrinth, and a coffee jar on Ko-fi if you’re feeling generous.",
    "modal.close": "Close",
    "modal.openLink": "Open on Modrinth",
    "modal.loading": "Loading description…",
});

Object.assign(window.PIGIAZZA_STRINGS.it, {
    "nav.home": "Home",
    "nav.about": "Chi sono",
    "nav.contact": "Contatti",
    "hero.headingPre": "Il posto dove trovare",
    "hero.headingPost": "creati da chi vive Minecraft in prima persona.",
    "hero.sub": "Sono alle prime armi con le mod. Creo cose che voglio usare io per primo, le testo sul serio, poi le pubblico.",
    "hero.ctaProjects": "Guarda cosa ho creato",
    "hero.ctaContact": "Scrivimi",
    "about.statement": "Ogni progetto nasce allo stesso modo: c'è qualcosa che Minecraft non ha ancora, quindi lo creo. Poi mi assicuro che regga davvero prima di farlo vedere a chiunque altro.",
    "about.bio1": "Sono Tommaso, conosciuto online come Pigiazza, una persona sola con un editor, nessun team. Ho imparato Java per sistemare una cosa che mi dava fastidio sul mio server, e non ho più smesso.",
    "about.bio2": "Nessuna roadmap, nessun finanziatore, nessuna scadenza se non le mie. Solo quello che manca a Minecraft questa settimana, costruito finché non regge abbastanza da darlo in mano a sconosciuti su internet.",
    "about.bio3": "Fabric è la base di partenza, ma ogni mod esce anche per Forge, NeoForge e Quilt, in ogni versione di Minecraft che quel tipo di progetto supporta, così nessuno resta escluso per una scelta di loader.",
    "about.step1Title": "Idea",
    "about.step1Text": "Manca qualcosa, o qualcosa dà fastidio nel mio mondo. Ecco tutto il brief.",
    "about.step2Title": "Costruzione",
    "about.step2Text": "Testa bassa sul codice, provandolo sul mio server per tutto il tempo.",
    "about.step3Title": "Pubblicazione",
    "about.step3Text": "Quando regge al gioco vero senza rompersi, va su Modrinth.",
    "about.stackTitle": "Con cosa costruisco",
    "faq.heading": "Le domande che fanno davvero",
    "faq.q1": "Le tue mod sono gratis?",
    "faq.a1": "Sempre. Qui sotto c'è un link a Ko-fi se vuoi supportare il lavoro, ma non è mai obbligatorio.",
    "faq.q2": "Accetti richieste?",
    "faq.a2": "A volte — se è qualcosa che vorrei davvero costruire anche per me, la considero.",
    "faq.q3": "Ogni quanto aggiorni le cose?",
    "faq.a3": "Quando qualcosa si rompe o trovo un modo migliore di farla. Non c'è un calendario fisso — sono solo io.",
    "faq.q4": "Hai trovato un bug?",
    "faq.a4pre": "Usa la pagina",
    "faq.a4link": "segnala un bug",
    "faq.a4post": "— scegli il progetto e ti apre una issue GitHub già pronta. Le leggo tutte.",
    "faq.q5": "Con cosa costruisci?",
    "faq.a5": "Java, soprattutto su Fabric, poi portato su Forge, NeoForge e Quilt per ogni versione supportata. Le build passano da Gradle, tutto vive su Git.",
    "faq.q6": "Il codice sorgente è pubblico?",
    "faq.a6pre": "Sì. Guarda la pagina",
    "faq.a6link": "progetti",
    "faq.a6post": "— ognuno rimanda a Modrinth, e da lì direttamente alla sua repo GitHub.",
    "contact.heading": "Dove trovarmi",
    "contact.subtext": "Trovi il codice su GitHub, i download su Modrinth, e un barattolo per il caffè su Ko-fi se ti va di essere generoso.",
    "modal.close": "Chiudi",
    "modal.openLink": "Apri su Modrinth",
    "modal.loading": "Caricamento descrizione…",
});

// currentLang, t(), escapeHtml(), applyLanguage() e il dropdown lingua sono
// in nav.js, condivisi da tutte le pagine. Qui serve solo ridisegnare i
// progetti e far ripartire la parola che ruota quando cambia la lingua.
window.onLangChange = function () {
  if (typeof showRotatingWord === "function") {
    rotatingWordIndex = 0;
    showRotatingWord();
  }
};

function renderSocials() {
  const grid = document.getElementById("contact-grid");
  grid.innerHTML = CONFIG.socials
    .map(
      (s) => `
      <a class="social-btn" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">
        <img class="social-badge" src="${escapeHtml(s.icon)}" alt="" loading="lazy" />
        <span class="social-name">${escapeHtml(s.name)}</span>
      </a>`
    )
    .join("");
}

// --- Social orbit nell'hero: un logo alla volta, esce a sinistra ed entra il
// successivo da destra. Ogni logo e' un link al profilo corrispondente. ---

function renderSocialOrbit() {
  const orbit = document.getElementById("social-orbit");
  if (!orbit) return;

  orbit.innerHTML = `
    <div class="social-orbit-window">
      ${CONFIG.socials
        .map(
          (s, i) => `
        <a class="social-slide${i === 0 ? " is-current" : ""}"
           href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer"
           aria-label="${escapeHtml(s.name)}"${i === 0 ? "" : ' tabindex="-1" aria-hidden="true"'}>
          <img src="${escapeHtml(s.icon)}" alt="" />
        </a>`
        )
        .join("")}
    </div>
    <div class="social-orbit-dots">
      ${CONFIG.socials
        .map(
          (s, i) =>
            `<button type="button" class="social-dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="${escapeHtml(s.name)}"></button>`
        )
        .join("")}
    </div>`;

  const slides = Array.from(orbit.querySelectorAll(".social-slide"));
  const dots = Array.from(orbit.querySelectorAll(".social-dot"));
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;

  // Riporta uno slide a destra (posizione di partenza) SENZA animare: serve a
  // chi era uscito a sinistra e deve rientrare dal lato giusto. Il reflow
  // forzato applica la posizione prima di riattivare la transizione, quindi
  // non dipende da requestAnimationFrame: con rAF rallentato (scheda in
  // background) i tempi saltavano e gli slide restavano tutti visibili.
  function park(el) {
    el.classList.add("is-instant");
    el.classList.remove("is-leaving", "is-current");
    void el.offsetWidth;
    el.classList.remove("is-instant");
  }

  function show(next) {
    if (next === index) return;
    const current = slides[index];
    const upcoming = slides[next];

    park(upcoming);

    // Chi esce va a sinistra; chi entra scorre da destra al centro.
    current.classList.remove("is-current");
    current.classList.add("is-leaving");
    current.setAttribute("tabindex", "-1");
    current.setAttribute("aria-hidden", "true");

    upcoming.classList.add("is-current");
    upcoming.removeAttribute("tabindex");
    upcoming.removeAttribute("aria-hidden");

    dots[index].classList.remove("is-active");
    dots[next].classList.add("is-active");

    index = next;
  }

  function start() {
    if (prefersReducedMotion) return;
    stop();
    timer = window.setInterval(() => show((index + 1) % slides.length), 2000);
  }

  function stop() {
    window.clearInterval(timer);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      show(Number(dot.dataset.index));
      start();
    });
  });

  // Ferma la rotazione mentre si guarda o si naviga da tastiera, cosi' il
  // logo non cambia proprio mentre lo si sta per cliccare.
  orbit.addEventListener("mouseenter", stop);
  orbit.addEventListener("mouseleave", start);
  orbit.addEventListener("focusin", stop);
  orbit.addEventListener("focusout", start);

  start();
}

// --- FAQ: accordion animato a mano (grid-template-rows in CSS) invece del
// toggle istantaneo nativo di <details>, che non si puo' animare. ---

document.querySelectorAll(".faq-summary").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

// --- Parola rotante nell'hero (Mods / Plugins / Datapacks / Servers) ---
// prefersReducedMotion, menuToggle/siteMenu/siteHeader e il menu a comparsa
// sono in nav.js, condiviso da tutte le pagine.

const rotatingWordEl = document.getElementById("rotating-word");
let rotatingWordIndex = 0;
let rotatingWordTimer = null;

function showRotatingWord() {
  const words = ROTATING_WORDS[currentLang] || ROTATING_WORDS.en;
  rotatingWordEl.textContent = words[rotatingWordIndex % words.length];
  if (prefersReducedMotion) return;
  // Web Animations API invece di CSS animation: ogni chiamata crea un'animazione
  // indipendente, quindi non serve nessun trucco di reset per farla ripartire.
  rotatingWordEl.animate(
    [
      { opacity: 0, transform: "translateY(-38%) scale(0.85)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 550, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "both" }
  );
}

function startRotatingWord() {
  showRotatingWord();
  if (prefersReducedMotion) return;
  clearInterval(rotatingWordTimer);
  rotatingWordTimer = setInterval(() => {
    rotatingWordIndex += 1;
    showRotatingWord();
  }, 1500);
}

// --- Parallax: gli elementi decorativi si spostano leggermente allo scroll ---

const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
const heroLandscapes = Array.from(document.querySelectorAll(".hero-landscape"));

// Posizione "a riposo" di ogni elemento nel documento, misurata senza
// trasformazione. Serve perche' lo spostamento va calcolato rispetto al centro
// del viewport: usando lo scrollY assoluto (come prima) gli elementi in fondo
// alla pagina accumulavano offset enormi e finivano tagliati dalla sezione.
let parallaxBase = [];

function measureParallax() {
  parallaxBase = parallaxEls.map((el) => {
    const prev = el.style.transform;
    el.style.transform = "none";
    const rect = el.getBoundingClientRect();
    const center = rect.top + window.scrollY + rect.height / 2;
    el.style.transform = prev;
    return center;
  });
}

function updateParallax() {
  const viewportCenter = window.scrollY + window.innerHeight / 2;

  parallaxEls.forEach((el, i) => {
    const speed = parseFloat(el.dataset.parallax);
    const distance = parallaxBase[i] - viewportCenter;
    el.style.transform = `translateY(${distance * speed}px)`;
  });

  // Il paesaggio scorre piu' lentamente della pagina. Il tetto tiene la corsa
  // dentro il margine dato dallo scale(1.35), cosi' non si scoprono i bordi.
  const shift = Math.min(window.scrollY * 0.22, 150);
  heroLandscapes.forEach((el) => el.style.setProperty("--py", `${shift}px`));
}

// --- Parallasse allo scroll: siteHeader, backToTop e updateBackToTop() sono
// in nav.js, condiviso da tutte le pagine. ---

let scrollTicking = false;
function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    if (!prefersReducedMotion) updateParallax();
    scrollTicking = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => {
  if (!prefersReducedMotion) {
    measureParallax();
    updateParallax();
  }
});

updateBackToTop();

if (!prefersReducedMotion) {
  measureParallax();
  updateParallax();
  // Le immagini dell'hero cambiano l'altezza della pagina quando arrivano:
  // rimisuriamo, altrimenti le basi restano quelle del layout senza immagini.
  window.addEventListener("load", () => {
    measureParallax();
    updateParallax();
  });
}

// --- Reveal on scroll: il contenuto è visibile di default (vedi .reveal in
// CSS), quindi qui si aggiunge lo stato "in attesa" solo se possiamo
// garantire che l'IntersectionObserver lo rimuova di nuovo. ---

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  revealEls.forEach((el) => el.classList.add("reveal-pending"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

// --- Schema Idea → Build → Ship: il filo si disegna quando entra in vista.
// Come per .reveal, lo stato di partenza è "disegnato" nel CSS e la classe
// viene tolta solo se possiamo garantire che l'observer la rimetta. ---

const flow = document.getElementById("flow");

if (flow) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    flow.classList.add("is-drawn");
  } else {
    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          flowObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    flowObserver.observe(flow);
  }
}

applyLanguage(currentLang);
renderSocials();
renderSocialOrbit();
startRotatingWord();
