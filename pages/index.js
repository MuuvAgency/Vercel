import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function CutMetallLanding() {
  const [maschinen, setMaschinen] = useState(29);
  const [stunden, setStunden] = useState(4500);
  const [standzeit, setStandzeit] = useState(120);
  const [savings, setSavings] = useState(213317);
  const [activeFaq, setActiveFaq] = useState(null);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const animationRef = useRef(null);
  const parallaxRef = useRef(null);
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const COST_PER_TOOL_CHANGE = 850;
  const IMPROVEMENT_PERCENTAGE = 30;
  const IMPROVEMENT_FACTOR = 1 + (IMPROVEMENT_PERCENTAGE / 100);

  useEffect(() => {
    // Initial run after 500ms - matching the original setTimeout(calculateROI, 500);
    const timer = setTimeout(() => {
      calculateROI();
    }, 500);

    // Setup Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Trigger counter animation if it's the counter section
          if (entry.target.id === 'counter-section' && !countersAnimated) {
            animateCounters();
            setCountersAnimated(true);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Parallax Effect
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      parallaxRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    calculateROI();
  }, [maschinen, stunden, standzeit]);

  const animateRollingNumber = (target) => {
    const start = savings;
    const duration = 600;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const val = Math.round(start + (target - start) * easedProgress);
      setSavings(val);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(update);
      }
    };

    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(update);
  };

  const calculateROI = () => {
    const changesOEM = stunden / standzeit;
    const changesCM = stunden / (standzeit * IMPROVEMENT_FACTOR);
    const savingsTotal = (changesOEM - changesCM) * COST_PER_TOOL_CHANGE * maschinen;

    animateRollingNumber(Math.round(savingsTotal));
  };

  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const duration = 2000;
      const stepSize = target / (duration / 16);

      let current = 0;
      const update = () => {
        current += stepSize;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          setTimeout(update, 16);
        } else {
          counter.textContent = target;
        }
      };
      update();
    });
  };

  const faqs = [
    { q: "Welche Stahlsorten verwenden Sie?", a: "Wir verwenden spezialisierte Kaltarbeitsstähle wie 1.2379, 1.2360 oder eigene Legierungen. Die Auswahl wird je nach Einsatzzweck auf maximale Verschleißfestigkeit oder Zähigkeit optimiert." },
    { q: "Wie lange sind die Lieferzeiten?", a: "Lagerteile versenden wir in 24-48 Stunden. Spezialanfertigungen dauern typischerweise 3-5 Wochen – bei kritischen Projekten können wir das reduzieren." },
    { q: "Bietet ihr Nachschleif-Service?", a: "Ja. Wir bieten professionelle Regenerierung für ausgewählte Messertypen an. Das verlängert die Lebensdauer und reduziert Ihre Betriebskosten pro Betriebsstunde deutlich." },
    { q: "Wie finde ich das passende Teil?", a: "Nutzen Sie unsere Suche nach Maschinentyp oder OEM-Marke. Oder senden Sie ein Foto des Altteils – unsere Techniker identifizieren es innerhalb von 4 Stunden." },
    { q: "Können Sie kundenspezifische Geometrien anfertigen?", a: "Ja, wir fertigen Sondergeometrien an. Senden Sie uns eine Skizze oder CAD-Datei, und unser Team erstellt ein Angebot innerhalb von 24 Stunden." }
  ];

  return (
    <>
      <Head>
        <title>CutMetall | Maximale Standzeiten für Ihre Shredder-Anlagen</title>
        <meta name="description" content="Hochleistungswerkzeuge für die Recyclingindustrie. Entdecken Sie Ersatzteile, die nicht nur passen, sondern Ihre Produktivität nachhaltig steigern." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
        {/* TopNavBar */}
        <header className="bg-surface dark:bg-primary w-full top-0 sticky z-50 border-b border-outline-variant">
          <nav className="flex justify-between items-center px-margin-desktop py-4 max-w-max-width mx-auto">
            <div className="text-headline-lg font-headline-lg text-primary dark:text-on-primary">CutMetall</div>
            <div className="flex items-center gap-6">
              <button onClick={scrollToForm} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-button text-button cta-hover btn-shimmer">Anfrage</button>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative pt-16 pb-32 overflow-hidden px-margin-desktop max-w-max-width mx-auto reveal active" id="hero-section">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="z-10">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block stagger-item" style={{transitionDelay: '100ms'}}>JETZT TESTEN</span>
                <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight stagger-item" style={{transitionDelay: '200ms'}}>
                  Weniger Ausfallzeiten. <span className="italic font-normal">Mehr Output.</span>
                </h1>
                <p className="font-body-lg text-body-lg text-secondary mb-10 max-w-lg stagger-item" style={{transitionDelay: '300ms'}}>
                  Industrielle Hochleistungsmesser für Shredder und Zerkleinerungsanlagen. Mit CutMetall erhöhen Sie die Betriebsdauer und senken gleichzeitig die Wartungskosten pro Tonne Material.
                </p>
                <div className="flex flex-wrap gap-4 items-center stagger-item" style={{transitionDelay: '400ms'}}>
                  <button onClick={scrollToForm} className="bg-primary text-on-primary px-8 py-4 rounded-lg font-button text-button transition-all cta-hover btn-shimmer">Angebot anfordern</button>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-fixed"></div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-tertiary-fixed"></div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-fixed"></div>
                    </div>
                    <div className="text-xs">
                      <div className="flex text-amber-500">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "FILL 1"}}>star</span>
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "FILL 1"}}>star</span>
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "FILL 1"}}>star</span>
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "FILL 1"}}>star</span>
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "FILL 1"}}>star</span>
                      </div>
                      <span className="text-secondary font-label-sm">5.0 von 120+ Bewertungen</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative parallax-container">
                <div ref={parallaxRef} className="aspect-square rounded-2xl overflow-hidden shadow-2xl parallax-hero">
                  <img alt="Industrial metal shredder" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLvTMJNPQCLztHSF3AJbx65AHIX6JXNDY0hQ4Tdpx_5kQEkNq1vLOEztQNoW2kvJSks30d80dt3pCHvjYeBB-w6bVN5qXhg_Qu9-bsSKB_iqPYRTbbvSGGZhnI8NQKgtY5iTutlsrvZuiGWhlE1gRYY8YvLcO1ugiwtDJkrr-U5WtNRuWCW_NFXTtyAGdxBWzvpSZNH3DQz7gWPQU9_iApm_uwuP8xn04HenK8QT_fT5oz8BuB1gD80ahnY" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl border border-outline-variant shadow-lg max-w-[240px] float-anim stagger-item" style={{transitionDelay: '500ms'}}>
                  <div className="text-display-lg font-display-lg text-primary mb-1">56+</div>
                  <div className="text-secondary text-sm font-label-sm uppercase">Anlagentypen unterstützt</div>
                  <div className="mt-4 pt-4 border-t border-outline-variant">
                    <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Logos */}
          <section className="py-12 border-y border-outline-variant bg-surface-container-low overflow-hidden">
            <div className="px-margin-desktop max-w-max-width mx-auto flex flex-wrap justify-between items-center gap-12 opacity-50 grayscale">
              <span className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity cursor-default">METSO</span>
              <span className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity cursor-default">EREMA</span>
              <span className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity cursor-default">VECCOPLAN</span>
              <span className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity cursor-default">LINDNER</span>
              <span className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity cursor-default">WEIMA</span>
            </div>
          </section>

          {/* Form Section: Spezifikation anfragen */}
          <section ref={formRef} className="py-32 px-margin-desktop max-w-max-width mx-auto reveal active">
            <div className="bg-primary p-12 lg:p-24 rounded-2xl text-on-primary relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <div>
                  <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mb-4 block stagger-item" style={{transitionDelay: '100ms'}}>IHRE ANFRAGE</span>
                  <h2 className="font-display-lg text-display-lg mb-8 leading-tight stagger-item" style={{transitionDelay: '200ms'}}>In 24h zum optimalen Angebot</h2>
                  <p className="font-body-lg text-on-primary-container mb-8 stagger-item" style={{transitionDelay: '300ms'}}>
                    Beschreiben Sie Ihren Maschinentyp und Ihre aktuelle Situation. Unsere Techniker analysieren Ihren Fall und berechnen exakt, wie viel Sie mit CutMetall sparen.
                  </p>
                  <div className="flex flex-col gap-6 stagger-item" style={{transitionDelay: '400ms'}}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center border border-outline-variant/20">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <div>
                        <div className="font-bold">Zertifizierte Qualität</div>
                        <div className="text-on-primary-container text-sm">Prüfung durch Maschinenbau-Ingenieure</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center border border-outline-variant/20">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div>
                        <div className="font-bold">Schnelle Reaktionszeit</div>
                        <div className="text-on-primary-container text-sm">Angebot innerhalb von 24h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center border border-outline-variant/20">
                        <span className="material-symbols-outlined">engineering</span>
                      </div>
                      <div>
                        <div className="font-bold">Experten-Beratung</div>
                        <div className="text-on-primary-container text-sm">Persönliche Unterstützung durch Fachingenieure</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 lg:p-12 rounded-xl text-on-surface stagger-item" style={{transitionDelay: '200ms'}}>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-label-sm text-label-sm text-secondary mb-2">Maschinentyp</label>
                        <input className="w-full bg-secondary-container border border-outline-variant p-4 rounded focus:ring-1 focus:ring-primary outline-none transition-shadow focus:shadow-md" placeholder="z.B. Lindner Komet" type="text" />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-secondary mb-2">Teilenummer (opt.)</label>
                        <input className="w-full bg-secondary-container border border-outline-variant p-4 rounded focus:ring-1 focus:ring-primary outline-none transition-shadow focus:shadow-md" placeholder="123456" type="text" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-secondary mb-2">E-Mail Adresse</label>
                      <input className="w-full bg-secondary-container border border-outline-variant p-4 rounded focus:ring-1 focus:ring-primary outline-none transition-shadow focus:shadow-md" placeholder="name@firma.de" type="email" />
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-secondary mb-2">Ihre Nachricht</label>
                      <textarea className="w-full bg-secondary-container border border-outline-variant p-4 rounded focus:ring-1 focus:ring-primary outline-none transition-shadow focus:shadow-md" placeholder="Beschreiben Sie Ihre Anforderungen..." rows="4"></textarea>
                    </div>
                    <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-button text-button transition-all cta-hover btn-shimmer">Anfrage absenden</button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-32 bg-surface">
            <div className="px-margin-desktop max-w-max-width mx-auto">
              <div className="text-center mb-24 reveal active">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block stagger-item" style={{transitionDelay: '100ms'}}>PROZESS</span>
                <h2 className="font-display-lg text-display-lg text-primary stagger-item" style={{transitionDelay: '200ms'}}>So funktioniert's</h2>
                <p className="text-secondary max-w-2xl mx-auto mt-4 stagger-item" style={{transitionDelay: '300ms'}}>Vom Ersatzteil bis zum Einbau – wir begleiten Sie durch den gesamten Prozess Ihrer Anlagenoptimierung.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-12 reveal active auto-rows-max">
                <div className="group stagger-item md:row-span-1" style={{transitionDelay: '100ms'}}>
                  <div className="bg-white border border-outline-variant p-8 rounded-2xl h-full transition-all card-hover">
                    <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-6">
                      <span className="font-label-sm text-label-sm text-primary font-bold">Schritt 1</span>
                    </div>
                    <h3 className="font-headline-lg text-2xl mb-3">Anfrage stellen</h3>
                    <p className="text-secondary text-sm leading-relaxed">Nennen Sie uns Ihren Maschinentyp und aktuelle Anforderungen. Oder senden Sie ein Foto des bestehenden Teils.</p>
                    <div className="mt-6 pt-6 border-t border-outline-variant/30 text-xs text-secondary">~5 Minuten</div>
                  </div>
                </div>
                <div className="group stagger-item md:row-span-1" style={{transitionDelay: '200ms'}}>
                  <div className="bg-primary text-on-primary border border-primary p-10 rounded-2xl h-full transition-all card-hover shadow-lg">
                    <div className="inline-block px-3 py-1 bg-on-primary/10 rounded-full mb-6">
                      <span className="font-label-sm text-label-sm text-on-primary font-bold">Schritt 2</span>
                    </div>
                    <h3 className="font-headline-lg text-2xl mb-3">Schnelle Analyse</h3>
                    <p className="text-on-primary/80 text-sm leading-relaxed">Unsere Techniker prüfen Ihre Anfrage und erstellen ein optimiertes Angebot mit detailliertem ROI-Vergleich.</p>
                    <div className="mt-6 pt-6 border-t border-on-primary/10 text-xs text-on-primary/70"><strong>24h</strong> Antwortzeit</div>
                  </div>
                </div>
                <div className="group stagger-item md:row-span-1" style={{transitionDelay: '300ms'}}>
                  <div className="bg-white border border-outline-variant p-8 rounded-2xl h-full transition-all card-hover">
                    <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-6">
                      <span className="font-label-sm text-label-sm text-primary font-bold">Schritt 3</span>
                    </div>
                    <h3 className="font-headline-lg text-2xl mb-3">Lieferung &amp; Support</h3>
                    <p className="text-secondary text-sm leading-relaxed">Weltweiter Versand mit Express-Optionen. Optional: Installation durch unsere Partner-Netzwerk.</p>
                    <div className="mt-6 pt-6 border-t border-outline-variant/30 text-xs text-secondary">ab 48 Stunden</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ROI Calculator Section */}
          <section className="py-32 bg-surface-container-low border-y border-outline-variant" id="roi-section">
            <div className="px-margin-desktop max-w-max-width mx-auto">
              <div className="grid lg:grid-cols-2 gap-24 items-center reveal active">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">WIRTSCHAFTLICHKEIT</span>
                  <h2 className="font-display-lg text-display-lg text-primary mb-8">ROI Sparrechner: CutMetall vs. OEM</h2>
                  <p className="text-secondary font-body-lg mb-12">Berechnen Sie Ihr Einsparpotenzial durch längere Standzeiten und reduzierte Wartungsintervalle mit unseren Hochleistungswerkzeugen.</p>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="font-label-sm text-secondary uppercase">Anzahl der Maschinen</label>
                        <span className="font-bold text-primary transition-all">{maschinen}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={maschinen}
                        onChange={(e) => setMaschinen(parseInt(e.target.value))}
                        className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary hover:h-2 transition-all"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="font-label-sm text-secondary uppercase">Betriebsstunden pro Jahr</label>
                        <span className="font-bold text-primary transition-all">{stunden.toLocaleString('de-DE')} h</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="8760"
                        step="100"
                        value={stunden}
                        onChange={(e) => setStunden(parseInt(e.target.value))}
                        className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary hover:h-2 transition-all"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="font-label-sm text-secondary uppercase">Aktuelle Standzeit (OEM)</label>
                        <span className="font-bold text-primary transition-all">{standzeit} h</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="500"
                        step="10"
                        value={standzeit}
                        onChange={(e) => setStandzeit(parseInt(e.target.value))}
                        className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary hover:h-2 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 lg:p-16 rounded-2xl border border-outline-variant shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-12">
                      <div className="text-secondary font-label-sm uppercase mb-2">Ihre geschätzte</div>
                      <div className="text-display-lg font-display-lg text-primary">Jährliche Ersparnis</div>
                      <div className="text-6xl font-bold text-primary mt-4 tabular-nums">€ {savings.toLocaleString('de-DE')}</div>
                    </div>
                    <div className="space-y-6 mb-12">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-label-sm text-secondary uppercase">OEM Standard</span>
                          <span className="text-xs font-bold text-secondary">100%</span>
                        </div>
                        <div className="overflow-hidden h-4 text-xs flex rounded bg-secondary-container">
                          <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary" style={{width: '100%'}}></div>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-label-sm text-primary uppercase">CutMetall Performance</span>
                          <span className="text-xs font-bold text-primary">+{IMPROVEMENT_PERCENTAGE}% Standzeit</span>
                        </div>
                        <div className="overflow-hidden h-4 text-xs flex rounded bg-primary-container/20">
                          <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-700 ease-out" style={{width: '130%'}}></div>
                        </div>
                      </div>
                    </div>
                    <button onClick={scrollToForm} className="w-full bg-primary text-on-primary py-5 rounded-lg font-button text-button transition-all flex items-center justify-center gap-3 cta-hover btn-shimmer">
                      <span className="material-symbols-outlined">analytics</span>
                      Analyse anfordern
                    </button>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary-container rounded-full opacity-5 ambient-pulse blur-3xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="py-32 px-margin-desktop max-w-max-width mx-auto reveal active">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="bg-secondary-fixed rounded-full absolute -top-12 -left-12 w-96 h-96 -z-10 opacity-30 ambient-pulse"></div>
                <img alt="Industrial spare parts precision" className="rounded-2xl shadow-xl max-w-sm mx-auto hover:scale-[1.02] transition-transform duration-500" src="https://lh3.googleusercontent.com/aida/AP1WRLvBom8L3VxBK3kHmII_tdfeAjlaz7w9G_E68zHpTBzuXOjd398bkTkZgJLb7FuRGfJzO9txX9zwp5djRmbQ_NCkJadtIQfR2qkQt13tBv3lleiarXM3wAzofMS1lnjv4c8xGa9a0DCbuA5f2W9CAwuJYMAv5GKe7TPpcbACCBa9vcXmF7YVbbTumCqbFj6kcU4qyoWRgEOqsOpV0a1csTWgE8QYIXP_HcE2rBhF1vK5rU8SQdlqLtdqsaY" />
                <div className="absolute -bottom-10 -right-10 bg-white border border-outline-variant p-8 rounded-2xl shadow-lg max-w-[280px] float-anim" style={{animationDelay: '-1s'}}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center rounded-full">
                      <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                    </div>
                    <span className="font-bold text-sm">Härtegrade bis 64 HRC</span>
                  </div>
                  <p className="text-xs text-secondary">Unsere Messer durchlaufen spezielle Wärmebehandlungszyklen für maximale Standfestigkeit.</p>
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">VORTEIL</span>
                <h2 className="font-display-lg text-display-lg text-primary mb-12">Konstruiert für maximale Effizienz</h2>
                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
                    </div>
                    <div>
                      <h4 className="font-headline-lg text-lg mb-1">Mikropräzision</h4>
                      <p className="text-secondary text-sm">Toleranzen ±0,05mm für perfekte Passform und minimale Vibrationen. Weniger Vibrationen = längere Lebensdauer der Anlage.</p>
                    </div>
                  </div>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                    </div>
                    <div>
                      <h4 className="font-headline-lg text-lg mb-1">Geprüfte Materialien</h4>
                      <p className="text-secondary text-sm">Kaltarbeitsstähle 1.2379, 1.2360 & Eigenentwicklungen. Jede Charge Prüfprotokoll. TÜV-zertifiziert.</p>
                    </div>
                  </div>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
                    </div>
                    <div>
                      <h4 className="font-headline-lg text-lg mb-1">Messbare Ergebnisse</h4>
                      <p className="text-secondary text-sm">Real-Daten zeigen: 30% längere Standzeit, 25–40% weniger Wechsel pro Jahr, ROI innerhalb von 6 Monaten.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Numbers Counter / Impact Section */}
          <section className="py-24 bg-primary text-on-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 ambient-pulse"></div>
            <div className="px-margin-desktop max-w-max-width mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center reveal active" id="counter-section">
              <div className="stagger-item" style={{transitionDelay: '100ms'}}>
                <div className="text-display-lg font-display-lg mb-2 tabular-nums counter">12</div>
                <div className="text-on-primary-container text-xs font-label-sm uppercase tracking-widest">M+ Tons Recycled</div>
              </div>
              <div className="stagger-item" style={{transitionDelay: '200ms'}}>
                <div className="text-display-lg font-display-lg mb-2 tabular-nums counter">23</div>
                <div className="text-on-primary-container text-xs font-label-sm uppercase tracking-widest">k+ Parts Shipped</div>
              </div>
              <div className="stagger-item" style={{transitionDelay: '300ms'}}>
                <div className="text-display-lg font-display-lg mb-2 tabular-nums counter">850</div>
                <div className="text-on-primary-container text-xs font-label-sm uppercase tracking-widest">Active Clients</div>
              </div>
              <div className="stagger-item" style={{transitionDelay: '400ms'}}>
                <div className="text-display-lg font-display-lg mb-2 tabular-nums counter">15</div>
                <div className="text-on-primary-container text-xs font-label-sm uppercase tracking-widest">Logistics Hubs</div>
              </div>
            </div>
          </section>

          {/* Social Proof / Testimonials */}
          <section className="py-32 bg-surface-container-low reveal active">
            <div className="px-margin-desktop max-w-max-width mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 stagger-item" style={{transitionDelay: '100ms'}}>
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">TESTIMONIALS</span>
                  <h2 className="font-display-lg text-display-lg text-primary">Was unsere Kunden sagen</h2>
                </div>
                <div className="mt-6 md:mt-0">
                  <p className="text-secondary max-w-sm">Langjährige Partnerschaften basieren auf Vertrauen und messbarem Erfolg.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-2xl border border-outline-variant relative card-hover stagger-item" style={{transitionDelay: '200ms'}}>
                  <div className="mb-4 flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings: "FILL 1"}}>star</span>)}
                  </div>
                  <p className="text-primary mb-6 leading-relaxed text-sm">
                    "Seit CutMetall-Messer im Einsatz sind: 30% längere Standzeiten, 25% weniger Wartungskosten. Das macht sich sofort in der Bilanz bemerkbar."
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-primary">Hans Müller</div>
                      <div className="text-secondary text-xs">R-Cycle GmbH, Bremen</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-2xl border border-outline-variant relative card-hover stagger-item" style={{transitionDelay: '250ms'}}>
                  <div className="mb-4 flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings: "FILL 1"}}>star</span>)}
                  </div>
                  <p className="text-primary mb-6 leading-relaxed text-sm">
                    "Nicht nur bessere Qualität, sondern auch echte technische Beratung. Die CutMetall-Ingenieure verstehen unsere Prozesse und optimieren gezielt."
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-primary">Dr. Stefan Weber</div>
                      <div className="text-secondary text-xs">EcoSolutions, Hamburg</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-2xl border border-outline-variant relative card-hover stagger-item" style={{transitionDelay: '300ms'}}>
                  <div className="mb-4 flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings: "FILL 1"}}>star</span>)}
                  </div>
                  <p className="text-primary mb-6 leading-relaxed text-sm">
                    "Lieferzeit: 48h für Standardteile. Das macht den Unterschied. Wir halten weniger Notfall-Lagerbestände, weil CutMetall zuverlässig liefert."
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-primary">Jens Norbeck</div>
                      <div className="text-secondary text-xs">Lindner-Vertriebspartner, Köln</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-2xl border border-outline-variant relative card-hover stagger-item" style={{transitionDelay: '350ms'}}>
                  <div className="mb-4 flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings: "FILL 1"}}>star</span>)}
                  </div>
                  <p className="text-primary mb-6 leading-relaxed text-sm">
                    "Der Nachschleif-Service ist kostengünstiger als neue Teile kaufen. Mit CutMetall sparen wir pro Jahr über €15.000 bei Messer-Kosten."
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-primary">Michaela Klein</div>
                      <div className="text-secondary text-xs">Procana AG, München</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-32 px-margin-desktop max-w-max-width mx-auto reveal active">
            <div className="grid lg:grid-cols-12 gap-24">
              <div className="lg:col-span-5 stagger-item" style={{transitionDelay: '100ms'}}>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">FAQ</span>
                <h2 className="font-display-lg text-display-lg text-primary mb-8">Häufig gestellte Fragen</h2>
                <p className="text-secondary mb-10 leading-relaxed">
                  Finden Sie schnelle Antworten auf technische Fragen und Details zu unserem Bestellprozess. Falls Ihre Frage nicht dabei ist, kontaktieren Sie uns direkt.
                </p>
              </div>
              <div className="lg:col-span-7 space-y-4 stagger-item" style={{transitionDelay: '200ms'}}>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`faq-item border-b border-outline-variant py-6 transition-all hover:bg-surface-container-low px-4 rounded ${activeFaq === idx ? 'active-faq' : ''}`} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                    <div className="flex justify-between items-center cursor-pointer py-4">
                      <h4 className="font-headline-lg text-xl">{faq.q}</h4>
                      <span className="material-symbols-outlined toggle-icon">{activeFaq === idx ? 'remove' : 'add'}</span>
                    </div>
                    <div className="faq-content">
                      <p className="text-secondary">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 px-margin-desktop max-w-max-width mx-auto reveal active">
            <div className="bg-primary-container rounded-2xl p-12 lg:p-20 text-center relative overflow-hidden stagger-item" style={{transitionDelay: '100ms'}}>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff33_0%,_transparent_70%)] ambient-pulse"></div>
              <div className="relative z-10">
                <h2 className="font-display-lg text-display-lg text-on-primary mb-6">Bereit für optimierte Anlagen?</h2>
                <p className="text-on-primary-container font-body-lg mb-10 max-w-2xl mx-auto">Sparen Sie Wartungskosten und erhöhen Sie die Effizienz Ihrer Shredder. Starten Sie jetzt mit Ihrer unverbindlichen Anfrage.</p>
                <button onClick={scrollToForm} className="bg-primary text-on-primary px-10 py-5 rounded-lg font-button text-button shadow-xl cta-hover btn-shimmer">Angebot anfordern</button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-primary dark:bg-tertiary text-on-primary dark:text-tertiary-fixed w-full py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-desktop max-w-max-width mx-auto">
            <div className="md:col-span-4">
              <div className="text-headline-lg font-headline-lg text-on-primary mb-6">CutMetall</div>
              <p className="text-on-primary/60 text-sm max-w-xs">
                Ihr Partner für Hochleistungswerkzeuge in der Recyclingindustrie. Maximale Standzeiten für Ihre Shredder-Anlagen.
              </p>
            </div>
            <div className="md:col-span-3 md:col-start-6">
              <h5 className="font-label-sm text-label-sm uppercase mb-6 text-on-primary/60">Unternehmen</h5>
              <ul className="space-y-4 font-body-md text-body-md">
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">Über uns</a></li>
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">Karriere</a></li>
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">News</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h5 className="font-label-sm text-label-sm uppercase mb-6 text-on-primary/60">Rechtliches</h5>
              <ul className="flex flex-col gap-4 font-body-md text-body-md">
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">Impressum</a></li>
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">Datenschutz</a></li>
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">AGB</a></li>
                <li><a className="text-on-primary-container dark:text-on-tertiary-container hover:text-primary-fixed transition-colors" href="#">Kontakt</a></li>
              </ul>
            </div>
            <div className="md:col-span-12 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xs opacity-60">
                © 2024 CutMetall Holding GmbH. Alle Rechte vorbehalten.
              </div>
              <div className="flex gap-6">
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">language</span></a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">share</span></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}