import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  MapPin, Clock, Calendar, Instagram, Copy, Check,
  ChevronRight, Share2, Sparkles, Star
} from 'lucide-react';

/* ─── Countdown ───────────────────────────────────────── */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

/* ─── App ─────────────────────────────────────────────── */
export default function App() {
  const [copied, setCopied] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const countdown = useCountdown('2026-04-25T21:00:00');

  /* confetti on load */
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 200, spread: 110, origin: { y: 0.38 },
        colors: ['#10b981', '#6ee7b7', '#d4a853', '#ffffff', '#065f46', '#fde68a'],
      });
      setTimeout(() => confetti({
        particleCount: 80, spread: 60, origin: { x: 0.1, y: 0.6 },
        colors: ['#10b981', '#d4a853', '#fff'],
        angle: 60,
      }), 350);
      setTimeout(() => confetti({
        particleCount: 80, spread: 60, origin: { x: 0.9, y: 0.6 },
        colors: ['#10b981', '#d4a853', '#fff'],
        angle: 120,
      }), 350);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const shareText = `✨ *PEKAS BIRTHDAY* 🎱\n\n📍 Bola Ocho Restaurant Bar & Billar\n📅 Sábado 25 de Abril, 2026\n🕘 9 PM – 1 AM\n💸 $700 MXN (todo incluido)\n\n*Incluye:*\n🎱 2 mesas de billar (4 hrs)\n🌮 Tacos de bistec\n🥃 Botellas de tequila\n🍺 Cubetas de cerveza\n🥘 Entradas + refrescos + palomitas\n\n👉 https://pks2828.github.io/pekas-fest/`;

  const copyInfo = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); };
    navigator.clipboard?.writeText(shareText).then(done).catch(() => {
      const el = document.createElement('textarea');
      el.value = shareText;
      document.body.appendChild(el); el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      done();
    });
  };

  const addToCalendar = () => {
    const p = new URLSearchParams({
      action: 'TEMPLATE', text: 'PEKAS BIRTHDAY 🎱',
      dates: '20260425T210000/20260426T010000',
      details: 'Fiesta de cumpleaños · Billar, tequila, tacos y buena vibra · $700 MXN\nhttps://pks2828.github.io/pekas-fest/',
      location: 'Bola Ocho Restaurant Bar & Billar', ctz: 'America/Mexico_City',
    });
    window.open(`https://calendar.google.com/calendar/render?${p}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  /* ─── Styles ──────────────────────────────────────────── */
  const G    = '#10b981';
  const GOLD = '#d4a853';
  const BG   = '#050505';

  const includes = [
    { emoji: '🎱', label: '2 mesas billar', sub: '4 horas' },
    { emoji: '🌮', label: 'Tacos de bistec', sub: 'para todos' },
    { emoji: '🥃', label: 'Botellas tequila', sub: 'en barra' },
    { emoji: '🍺', label: 'Cubetas cerveza', sub: 'bien frías' },
    { emoji: '🥘', label: 'Entradas', sub: 'para compartir' },
    { emoji: '🍿', label: 'Refrescos', sub: '+ palomitas' },
  ];

  const ticks = ['🎱 Billar', '· Tequila', '· Tacos', '· Cerveza', '· 25 Abril', '· 9PM Sharp'];

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex', justifyContent: 'center', position: 'relative' }}>

      {/* ── grain overlay ── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: .045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${BG}; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes float   { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-10px) rotate(-8deg)} }
        @keyframes glowRing{ 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.35),0 20px 60px rgba(0,0,0,.9)} 50%{box-shadow:0 0 0 16px rgba(16,185,129,0),0 20px 60px rgba(0,0,0,.9)} }
        @keyframes orb     { 0%,100%{opacity:.16;transform:scale(1)} 50%{opacity:.26;transform:scale(1.06)} }
        @keyframes shimmer { 0%{transform:translateX(-200%)} 100%{transform:translateX(200%)} }
        @keyframes countFlip{ 0%{opacity:0;transform:translateY(-12px) scale(.9)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes waPulse { 0%,100%{box-shadow:0 8px 40px rgba(37,211,102,.4)} 50%{box-shadow:0 8px 60px rgba(37,211,102,.65)} }
        @keyframes lineGrow{ from{width:0} to{width:100%} }
        @keyframes scanUp  { 0%{transform:translateY(100%)} 100%{transform:translateY(-100%)} }

        .f0 { animation: fadeUp .75s       ease both; }
        .f1 { animation: fadeUp .75s .10s  ease both; }
        .f2 { animation: fadeUp .75s .18s  ease both; }
        .f3 { animation: fadeUp .75s .26s  ease both; }
        .f4 { animation: fadeUp .75s .34s  ease both; }
        .f5 { animation: fadeUp .75s .44s  ease both; }
        .f6 { animation: fadeUp .75s .54s  ease both; }
        .f7 { animation: fadeUp .75s .64s  ease both; }

        .inc-card {
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .inc-card:hover {
          transform: translateY(-3px);
          background: rgba(16,185,129,.07) !important;
          border-color: rgba(16,185,129,.28) !important;
        }
        .inc-card:active { transform: scale(.97); }

        .btn-ghost {
          transition: background .2s, border-color .2s, color .2s, transform .15s;
          cursor: pointer;
        }
        .btn-ghost:hover  { background: rgba(255,255,255,.06) !important; border-color: rgba(255,255,255,.18) !important; }
        .btn-ghost:active { transform: scale(.98); }

        .pill-a {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;
          color: ${G}; background: rgba(16,185,129,.1); border: .5px solid rgba(16,185,129,.28);
          border-radius: 100px; padding: 7px 14px; text-decoration: none;
          transition: background .2s, border-color .2s;
          font-family: 'DM Sans', sans-serif;
        }
        .pill-a:hover { background: rgba(16,185,129,.18); border-color: rgba(16,185,129,.45); }

        .count-digit { animation: countFlip .28s ease both; display: block; }

        .float-cta {
          position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 100%; max-width: 430px;
          padding: 12px 20px 28px;
          background: linear-gradient(to top, ${BG} 55%, transparent);
          z-index: 200;
          animation: fadeIn .5s 1.4s ease both; opacity: 0;
        }

        .wa-btn {
          width: 100%; padding: 18px 28px;
          border-radius: 18px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          animation: waPulse 2.8s ease-in-out infinite;
          transition: transform .15s ease, opacity .15s;
        }
        .wa-btn:hover  { transform: translateY(-2px); opacity: .94; }
        .wa-btn:active { transform: scale(.98) translateY(0); }

        .shimmer-line {
          position: absolute; top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
          animation: shimmer 2.5s ease-in-out infinite;
        }

        .scan-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,.35), transparent);
          animation: scanUp 4s linear infinite;
          pointer-events: none;
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 430, color: '#fff', paddingBottom: 108, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ────────────────────────────── HERO ── */}
        <div style={{ position: 'relative', padding: '60px 28px 48px', overflow: 'hidden' }}>

          {/* grid bg */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(rgba(16,185,129,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.04) 1px,transparent 1px)`,
            backgroundSize: '36px 36px',
          }} />

          {/* gradient overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(16,185,129,.1) 0%,transparent 50%,rgba(212,168,83,.05) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top,${BG},transparent)`, pointerEvents: 'none' }} />

          {/* orbs */}
          <div style={{ position: 'absolute', top: -100, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,.22) 0%,transparent 65%)', animation: 'orb 6s ease-in-out infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -120, left: -100, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,168,83,.12) 0%,transparent 65%)', animation: 'orb 9s 2s ease-in-out infinite', pointerEvents: 'none' }} />

          {/* 8-ball */}
          <div style={{
            position: 'absolute', top: 32, right: 28,
            animation: 'glowRing 3.5s ease-in-out infinite, float 4.5s ease-in-out infinite',
            zIndex: 2,
          }}>
            <div style={{
              width: 76, height: 76, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%, #222 0%, #080808 55%, #000 100%)',
              boxShadow: 'inset -8px -8px 20px rgba(0,0,0,.95), inset 5px 5px 14px rgba(255,255,255,.1), 0 20px 50px rgba(0,0,0,.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* scan line inside ball */}
              <div className="scan-line" />
              {/* white circle */}
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 38%, #fff 0%, #e8e8e8 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
              }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: '#111', lineHeight: 1 }}>8</span>
              </div>
            </div>
            {/* highlight */}
            <div style={{ position: 'absolute', top: 12, left: 16, width: 18, height: 9, background: 'rgba(255,255,255,.4)', borderRadius: '50%', filter: 'blur(4px)', transform: 'rotate(-25deg)' }} />
          </div>

          {/* hero text */}
          <div style={{ position: 'relative', zIndex: 1 }} className="f0">
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.55em', color: G, textTransform: 'uppercase', marginBottom: 16, opacity: .9 }}>
              Fiesta de Cumpleaños · 2026
            </div>

            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(82px, 22.5vw, 114px)',
              lineHeight: .83,
              color: '#fff',
              textShadow: '0 0 80px rgba(16,185,129,.12)',
            }}>
              PEKAS<br />
              <span style={{
                color: G,
                textShadow: '0 0 60px rgba(16,185,129,.5)',
              }}>BIRTHDAY</span>
            </div>

            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ height: 1, width: 48, background: `linear-gradient(90deg,${G},transparent)` }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 14, letterSpacing: '.18em',
                color: 'rgba(255,255,255,.32)', textTransform: 'uppercase',
              }}>
                Una noche que no olvidarás
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────── TICKER ── */}
        <div style={{
          overflow: 'hidden',
          borderTop: '.5px solid rgba(255,255,255,.06)',
          borderBottom: '.5px solid rgba(255,255,255,.06)',
          padding: '10px 0',
          background: 'rgba(16,185,129,.025)',
        }}>
          <div style={{ display: 'flex', animation: 'ticker 20s linear infinite', whiteSpace: 'nowrap' }}>
            {[...ticks, ...ticks, ...ticks, ...ticks].map((item, i) => (
              <span key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(16,185,129,.48)', padding: '0 22px' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ────────────────────────────── COUNTDOWN ── */}
        {countdown && (
          <div className="f1" style={{ padding: '24px 20px 0' }}>
            <div style={{
              borderRadius: 26,
              border: '.5px solid rgba(16,185,129,.14)',
              background: 'linear-gradient(145deg,rgba(16,185,129,.055) 0%,rgba(16,185,129,.015) 100%)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* shimmer */}
              <div className="shimmer-line" />

              <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.45em', color: 'rgba(255,255,255,.2)', textTransform: 'uppercase' }}>
                  Faltan para la fiesta
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '16px 8px 20px' }}>
                {[
                  { v: countdown.days, l: 'Días' },
                  { v: countdown.hours, l: 'Horas' },
                  { v: countdown.minutes, l: 'Min' },
                  { v: countdown.seconds, l: 'Seg' },
                ].map(({ v, l }, i) => (
                  <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                    {i < 3 && (
                      <div style={{
                        position: 'absolute', right: 0, top: '38%', transform: 'translateY(-50%)',
                        fontFamily: "'Bebas Neue',sans-serif", fontSize: 28,
                        color: 'rgba(255,255,255,.12)',
                      }}>:</div>
                    )}
                    <span
                      key={v}
                      className="count-digit"
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 'clamp(40px,11vw,52px)',
                        color: i === 0 ? G : i === 3 ? 'rgba(255,255,255,.55)' : '#fff',
                        lineHeight: 1,
                        display: 'block',
                      }}
                    >
                      {String(v).padStart(2, '0')}
                    </span>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.2em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginTop: 6 }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              {/* bottom glow line */}
              <div style={{ height: 2, background: `linear-gradient(90deg,transparent,${G},transparent)`, opacity: .5 }} />
            </div>
          </div>
        )}

        {/* ────────────────────────────── DATE + VENUE ── */}
        <div className="f2" style={{ margin: '14px 20px 0' }}>
          <div style={{
            borderRadius: 24,
            border: '.5px solid rgba(16,185,129,.16)',
            background: 'linear-gradient(145deg,rgba(16,185,129,.065) 0%,rgba(16,185,129,.02) 100%)',
            overflow: 'hidden',
          }}>
            {/* date / time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '.5px solid rgba(16,185,129,.1)' }}>
              <div style={{ padding: '22px 20px 22px 24px', borderRight: '.5px solid rgba(16,185,129,.1)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.35em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginBottom: 10 }}>Fecha</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, color: '#fff', lineHeight: 1 }}>25 ABRIL</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 14, color: G, marginTop: 5 }}>Sábado</div>
              </div>
              <div style={{ padding: '22px 20px 22px 20px' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.35em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginBottom: 10 }}>Horario</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, color: '#fff', lineHeight: 1 }}>9PM – 1AM</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,.38)', marginTop: 5 }}>4 horas de fiesta</div>
              </div>
            </div>

            {/* venue */}
            <div style={{ padding: '20px 24px 22px' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.35em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginBottom: 10 }}>Lugar</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: 1.45, marginBottom: 14 }}>
                Bola Ocho Restaurant Bar & Billar
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="https://maps.app.goo.gl/guswAFEz6DQcHCpQ6" target="_blank" rel="noopener noreferrer" className="pill-a">
                  <MapPin size={11} />
                  Ver en Maps
                </a>
                <a href="https://www.instagram.com/bolaochomty/" target="_blank" rel="noopener noreferrer" className="pill-a">
                  <Instagram size={11} />
                  @bolaochomty
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────── PRICE ── */}
        <div className="f3" style={{ margin: '12px 20px 0' }}>
          <div style={{
            borderRadius: 24,
            border: '.5px solid rgba(212,168,83,.22)',
            background: 'linear-gradient(145deg,rgba(212,168,83,.08) 0%,rgba(212,168,83,.02) 100%)',
            padding: '24px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            <div className="shimmer-line" />
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.35em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginBottom: 10 }}>Aporte por persona</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 62, color: GOLD, lineHeight: 1 }}>$700</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,.28)', fontWeight: 300 }}>MXN</span>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,.32)', marginTop: 5 }}>
                todo incluido · sin costos extra
              </div>
            </div>
            <div style={{ textAlign: 'center', opacity: .7 }}>
              <div style={{ fontSize: 40 }}>🎱</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 11, color: GOLD, marginTop: 6, letterSpacing: '.1em' }}>VIP Night</div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────── INCLUDES ── */}
        <div className="f4" style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.45em', color: 'rgba(255,255,255,.18)', textTransform: 'uppercase', marginBottom: 14 }}>
            Tu noche incluye
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {includes.map(({ emoji, label, sub }, i) => (
              <div key={i} className="inc-card" style={{
                background: 'rgba(255,255,255,.025)',
                border: '.5px solid rgba(255,255,255,.08)',
                borderRadius: 20, padding: '18px 16px',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ fontSize: 26, lineHeight: 1 }}>{emoji}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.88)', lineHeight: 1.35 }}>{label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', marginTop: 3 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ────────────────────────────── INFO CALLOUTS ── */}
        <div className="f5" style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* dress code */}
          <div style={{
            borderRadius: 18,
            background: 'rgba(255,255,255,.025)',
            border: '.5px solid rgba(255,255,255,.08)',
            padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>👔</div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.35em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginBottom: 6 }}>Dress Code</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', lineHeight: 1.5 }}>
                Smart casual ·{' '}
                <span style={{ color: G, fontWeight: 600 }}>Ven que te veas chido</span>
              </div>
            </div>
          </div>

          {/* puntualidad */}
          <div style={{
            borderRadius: 18,
            background: 'rgba(255,255,255,.025)',
            border: '.5px solid rgba(212,168,83,.18)',
            padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>⏰</div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.35em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase', marginBottom: 6 }}>Asistencia</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', lineHeight: 1.5 }}>
                <span style={{ color: GOLD, fontWeight: 700 }}>PUNTUAL</span>{' '}
                · Las mesas se reservan en horario fijo
              </div>
            </div>
          </div>

        </div>

        {/* ────────────────────────────── QUOTE ── */}
        <div className="f6" style={{ margin: '16px 20px 0', position: 'relative' }}>
          <div style={{
            padding: '20px 24px',
            borderLeft: `2.5px solid ${G}`,
            borderRadius: '0 16px 16px 0',
            background: 'rgba(16,185,129,.04)',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 17, lineHeight: 1.6,
              color: 'rgba(255,255,255,.45)',
              textAlign: 'center',
            }}>
              "Ven a celebrar una noche de fiesta,<br />billar y buena vibra"
            </div>
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, letterSpacing: '.3em', color: 'rgba(255,255,255,.2)', textTransform: 'uppercase' }}>
              — Pekas
            </div>
          </div>
        </div>

        {/* ────────────────────────────── ACTIONS ── */}
        <div className="f7" style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Calendar */}
          <button onClick={addToCalendar} className="btn-ghost" style={{
            width: '100%', padding: '16px 24px', borderRadius: 16,
            border: '.5px solid rgba(255,255,255,.1)',
            background: 'rgba(255,255,255,.03)',
            color: 'rgba(255,255,255,.5)',
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 13, fontWeight: 600,
            letterSpacing: '.07em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <Calendar size={16} />
            Agregar al calendario
          </button>

          {/* Copy */}
          <button onClick={copyInfo} className="btn-ghost" style={{
            width: '100%', padding: '16px 24px', borderRadius: 16,
            border: `.5px solid ${copied ? 'rgba(16,185,129,.35)' : 'rgba(255,255,255,.1)'}`,
            background: copied ? 'rgba(16,185,129,.07)' : 'rgba(255,255,255,.03)',
            color: copied ? G : 'rgba(255,255,255,.5)',
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 13, fontWeight: 600,
            letterSpacing: '.07em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'all .3s ease',
          }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '¡Copiado!' : 'Copiar información'}
          </button>
        </div>

        {/* ────────────────────────────── FOOTER ── */}
        <div style={{ textAlign: 'center', padding: '36px 28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 26 }}>🎱</div>
          <div style={{ fontSize: 9, letterSpacing: '.45em', color: 'rgba(255,255,255,.1)', textTransform: 'uppercase' }}>
            PEKAS BIRTHDAY · EDICIÓN 2026
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 12, color: 'rgba(255,255,255,.1)' }}>
            hecho con cariño
          </div>
        </div>
      </div>

      {/* ────────────────────────────── FLOATING WhatsApp CTA ── */}
      <div className="float-cta">
        <button onClick={shareWhatsApp} className="wa-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Compartir por WhatsApp
        </button>
      </div>
    </div>
  );
}
