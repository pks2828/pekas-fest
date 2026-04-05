import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// ── Número del organizador para RSVP (formato internacional sin +) ──
const ORGANIZER_WA = '521XXXXXXXXXX'; // <-- cambia esto por tu número

/* ─── Icons ─────────────────────────────────────────── */
const Icon = ({ d, size = 18, fill = 'none', strokeWidth = 1.5 }) => (
  <svg fill={fill} strokeWidth={strokeWidth} viewBox="0 0 24 24" width={size} height={size} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const BilliardIcon = ({ size = 16 }) => (
  <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width={size} height={size} stroke="currentColor">
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width={size} height={size} stroke="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="#10b981" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ─── Countdown hook ─────────────────────────────────── */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
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

/* ─── Main component ─────────────────────────────────── */
const App = () => {
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown('2026-04-25T21:00:00');

  // Confetti al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#10b981', '#6ee7b7', '#fbbf24', '#fff', '#065f46'] });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const shareText = `✨ *PEKAS BIRTHDAY* ✨\nFiesta de Cumpleaños\n\n📍 Bola Ocho Restaurant Bar & Billar\n📅 25 de Abril\n🕘 9:00 PM - 1:00 AM\n🎟 Aporte por persona: $700 MXN\n\n*Incluye:*\n• 2 mesas de billar (4 hrs)\n• Entradas para compartir\n• Tacos de bistec\n• Refresco\n• Tequila\n• Cubetas de cerveza\n• Palomitas de cortesía\n\n"Ven a celebrar una noche de fiesta, billar y buena vibra"`;

  // Share nativo con fallback a WhatsApp
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'PEKAS BIRTHDAY 🎱', text: shareText, url: 'https://pks2828.github.io/pekas-fest/' });
        return;
      } catch (_) { /* cancelado por el usuario */ }
    }
    // fallback
    const encoded = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // RSVP por WhatsApp al organizador
  const rsvp = () => {
    const msg = encodeURIComponent('¡Hola! Confirmo mi asistencia al Pekas Birthday 🎱🎉');
    window.open(`https://wa.me/${ORGANIZER_WA}?text=${msg}`, '_blank');
  };

  // Descargar .ics + link Google Calendar
  const addToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PekasBirthday//ES',
      'BEGIN:VEVENT',
      'DTSTART:20260425T210000',
      'DTEND:20260426T010000',
      'SUMMARY:PEKAS BIRTHDAY 🎱',
      'DESCRIPTION:Fiesta de cumpleaños · Billar\\, tequila\\, tacos y buena vibra · $700 MXN',
      'LOCATION:Bola Ocho Restaurant Bar & Billar',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'pekas-birthday.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyInfo = () => {
    const doCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2500); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareText).then(doCopy).catch(() => fallbackCopy());
    } else { fallbackCopy(); }
    function fallbackCopy() {
      const el = document.createElement('textarea');
      el.value = shareText;
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
      doCopy();
    }
  };

  const includes = [
    { text: '2 mesas de billar · 4 horas', icon: <BilliardIcon size={15} /> },
    { text: 'Entradas para compartir', icon: <Icon size={15} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 16.5v-.75A.75.75 0 0 1 15.75 15h.75a.75.75 0 0 1 .75.75V18a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 8.25 18v-2.25a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75" /> },
    { text: 'Tacos de bistec', icon: <Icon size={15} d="M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Z" /> },
    { text: 'Botellas de tequila', icon: <Icon size={15} d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-5.8-12.25 1.5-.5" /> },
    { text: 'Cubetas de cerveza', icon: <Icon size={15} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /> },
    { text: 'Refrescos + palomitas', icon: <Icon size={15} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" /> },
  ];

  const tickerItems = ['Billar', '·', 'Tequila', '·', 'Tacos', '·', 'Cerveza', '·', 'Buena vibra', '·'];

  const G = '#10b981'; // emerald
  const DARK = '#0a0a0a';

  return (
    <div style={{ background: DARK, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 430, fontFamily: "'DM Sans', sans-serif", color: '#fff', background: DARK, paddingBottom: 96 }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { background: ${DARK}; -webkit-font-smoothing: antialiased; }

          @keyframes ticker    { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
          @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
          @keyframes pulse-glow{ 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.35)}50%{box-shadow:0 0 0 12px rgba(16,185,129,0)} }
          @keyframes float     { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }
          @keyframes orb1      { 0%,100%{opacity:.22}50%{opacity:.38} }
          @keyframes orb2      { 0%,100%{opacity:.10}50%{opacity:.20} }
          @keyframes spin-slow { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
          @keyframes count-in  { from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)} }

          .fade-up   { animation: fadeUp .6s ease both; }
          .fade-up-1 { animation: fadeUp .6s .1s ease both; }
          .fade-up-2 { animation: fadeUp .6s .2s ease both; }
          .fade-up-3 { animation: fadeUp .6s .3s ease both; }
          .fade-up-4 { animation: fadeUp .6s .4s ease both; }
          .fade-up-5 { animation: fadeUp .6s .5s ease both; }
          .fade-up-6 { animation: fadeUp .6s .6s ease both; }

          .include-card:active { transform: scale(.97); transition: transform .1s ease; }

          .pill-link { display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:500;
            color:${G};background:rgba(16,185,129,.08);border:0.5px solid rgba(16,185,129,.25);
            border-radius:100px;padding:6px 12px;text-decoration:none;letter-spacing:.04em;
            transition:background .2s,border-color .2s; }
          .pill-link:active { background:rgba(16,185,129,.18); }

          .cta-main { transition: transform .15s ease, background .25s ease, box-shadow .25s ease; }
          .cta-main:active { transform: scale(.98); }

          .cd-box { animation: count-in .5s ease both; }

          .sticky-bar { position:fixed;bottom:0;left:50%;transform:translateX(-50%);
            width:100%;max-width:430px;padding:12px 20px 20px;
            background:linear-gradient(to top,${DARK} 70%,transparent);
            z-index:100; pointer-events:none; }
          .sticky-bar > * { pointer-events:all; }
        `}</style>

        {/* ── HERO ── */}
        <div style={{ position: 'relative', padding: '56px 28px 40px', overflow: 'hidden' }}>
          {/* animated orbs */}
          <div style={{ position:'absolute',top:-100,left:-100,width:380,height:380,background:'radial-gradient(circle,rgba(16,185,129,.25) 0%,transparent 68%)',animation:'orb1 5s ease-in-out infinite',pointerEvents:'none' }} />
          <div style={{ position:'absolute',bottom:-60,right:-80,width:300,height:300,background:'radial-gradient(circle,rgba(234,179,8,.14) 0%,transparent 68%)',animation:'orb2 7s ease-in-out infinite',pointerEvents:'none' }} />
          <div style={{ position:'absolute',top:0,left:0,right:0,bottom:0,background:'linear-gradient(180deg,rgba(16,185,129,.03) 0%,transparent 60%)',pointerEvents:'none' }} />

          {/* 8-ball badge */}
          <div style={{ position:'absolute',top:28,right:24,width:66,height:66,borderRadius:'50%',
            background:'radial-gradient(circle at 38% 36%,#fff 0%,#10b981 45%,#065f46 100%)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:'#fff',
            textShadow:'0 1px 4px rgba(0,0,0,.6)',zIndex:2,
            animation:'pulse-glow 3s ease-in-out infinite, float 4s ease-in-out infinite',
            boxShadow:'0 0 0 3px rgba(16,185,129,.3),0 12px 32px rgba(0,0,0,.6)' }}>8</div>

          <div style={{ position:'relative',zIndex:1 }} className="fade-up">
            <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.4em',color:G,textTransform:'uppercase',marginBottom:12,opacity:.9 }}>
              Fiesta de Cumpleaños
            </div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(78px,22vw,108px)',lineHeight:.88,color:'#fff',marginBottom:8,
              textShadow:'0 4px 40px rgba(16,185,129,.2)' }}>
              PEKAS<br /><span style={{ color:G }}>BIRTHDAY</span>
            </div>
            <div style={{ fontSize:11,fontWeight:300,letterSpacing:'.25em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',marginTop:8 }}>
              Una noche que no vas a olvidar
            </div>
          </div>
        </div>

        {/* ── TICKER ── */}
        <div style={{ overflow:'hidden',borderTop:'.5px solid rgba(255,255,255,.06)',borderBottom:'.5px solid rgba(255,255,255,.06)',
          padding:'11px 0',background:'rgba(16,185,129,.04)' }}>
          <div style={{ display:'flex',animation:'ticker 14s linear infinite',whiteSpace:'nowrap' }}>
            {[...tickerItems,...tickerItems].map((item,i) => (
              <span key={i} style={{ fontSize:10,fontWeight:600,letterSpacing:'.25em',textTransform:'uppercase',color:'rgba(16,185,129,.55)',padding:'0 28px' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── COUNTDOWN ── */}
        {countdown && (
          <div className="fade-up-1" style={{ padding:'28px 20px 8px' }}>
            <div style={{ background:'rgba(16,185,129,.05)',border:'.5px solid rgba(16,185,129,.15)',borderRadius:20,padding:'22px 16px' }}>
              <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.3em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',textAlign:'center',marginBottom:16 }}>
                Faltan para la fiesta
              </div>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8 }}>
                {[
                  { value: countdown.days,    label: 'Días' },
                  { value: countdown.hours,   label: 'Horas' },
                  { value: countdown.minutes, label: 'Min' },
                  { value: countdown.seconds, label: 'Seg' },
                ].map(({ value, label }, i) => (
                  <div key={i} className="cd-box" style={{ textAlign:'center',background:'rgba(255,255,255,.03)',borderRadius:14,padding:'12px 4px',border:'.5px solid rgba(255,255,255,.07)' }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:i === 0 ? G : '#fff',lineHeight:1,letterSpacing:'-.01em' }}>
                      {String(value).padStart(2,'0')}
                    </div>
                    <div style={{ fontSize:9,fontWeight:500,letterSpacing:'.15em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',marginTop:4 }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── INFO ROWS ── */}
        <div style={{ padding:'16px 20px 0' }}>

          {/* Lugar */}
          <div className="fade-up-2" style={{ display:'flex',alignItems:'flex-start',gap:16,padding:'16px 0',borderBottom:'.5px solid rgba(255,255,255,.07)' }}>
            <div style={{ width:44,height:44,borderRadius:14,background:'rgba(16,185,129,.08)',border:'.5px solid rgba(16,185,129,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:G }}>
              <Icon d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.2em',color:'rgba(255,255,255,.28)',textTransform:'uppercase',marginBottom:4 }}>Lugar</div>
              <div style={{ fontSize:15,color:'#fff',marginBottom:10,lineHeight:1.4 }}>Bola Ocho Restaurant Bar & Billar</div>
              <a href="https://maps.app.goo.gl/guswAFEz6DQcHCpQ6" target="_blank" rel="noopener noreferrer" className="pill-link">
                <Icon size={12} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                Ver en Google Maps
              </a>
            </div>
          </div>

          {/* Fecha & Hora */}
          <div className="fade-up-3" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:0 }}>
            <div style={{ display:'flex',alignItems:'flex-start',gap:14,padding:'16px 16px 16px 0',borderBottom:'.5px solid rgba(255,255,255,.07)',borderRight:'.5px solid rgba(255,255,255,.07)' }}>
              <div style={{ width:44,height:44,borderRadius:14,background:'rgba(16,185,129,.08)',border:'.5px solid rgba(16,185,129,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:G }}>
                <Icon d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </div>
              <div>
                <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.2em',color:'rgba(255,255,255,.28)',textTransform:'uppercase',marginBottom:4 }}>Fecha</div>
                <div style={{ fontSize:15,color:'#fff',fontWeight:500 }}>25 de Abril</div>
              </div>
            </div>
            <div style={{ display:'flex',alignItems:'flex-start',gap:14,padding:'16px 0 16px 16px',borderBottom:'.5px solid rgba(255,255,255,.07)' }}>
              <div style={{ width:44,height:44,borderRadius:14,background:'rgba(16,185,129,.08)',border:'.5px solid rgba(16,185,129,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:G }}>
                <Icon d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </div>
              <div>
                <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.2em',color:'rgba(255,255,255,.28)',textTransform:'uppercase',marginBottom:4 }}>Hora</div>
                <div style={{ fontSize:15,color:'#fff',fontWeight:500 }}>9 PM–1 AM</div>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="fade-up-3" style={{ display:'flex',alignItems:'flex-start',gap:16,padding:'16px 0',borderBottom:'.5px solid rgba(255,255,255,.07)' }}>
            <div style={{ width:44,height:44,borderRadius:14,background:'rgba(16,185,129,.08)',border:'.5px solid rgba(16,185,129,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:G }}>
              <InstagramIcon />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.2em',color:'rgba(255,255,255,.28)',textTransform:'uppercase',marginBottom:4 }}>Instagram del lugar</div>
              <div style={{ fontSize:15,color:'#fff',marginBottom:10 }}>@bolaochomty</div>
              <a href="https://www.instagram.com/bolaochomty/" target="_blank" rel="noopener noreferrer" className="pill-link">
                <Icon size={12} d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                Ver en Instagram
              </a>
            </div>
          </div>

          {/* Precio */}
          <div className="fade-up-4" style={{ display:'flex',alignItems:'center',gap:16,padding:'20px 0' }}>
            <div style={{ width:44,height:44,borderRadius:14,background:'rgba(16,185,129,.08)',border:'.5px solid rgba(16,185,129,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:G }}>
              <Icon d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </div>
            <div>
              <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.2em',color:'rgba(255,255,255,.28)',textTransform:'uppercase',marginBottom:4 }}>Aporte por persona</div>
              <div style={{ display:'flex',alignItems:'baseline',gap:6 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:42,color:G,lineHeight:1 }}>$700</span>
                <span style={{ fontSize:12,color:'rgba(255,255,255,.3)',fontWeight:300 }}>MXN</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── INCLUYE ── */}
        <div className="fade-up-5" style={{ padding:'8px 20px 0' }}>
          <div style={{ fontSize:10,fontWeight:600,letterSpacing:'.3em',color:'rgba(255,255,255,.22)',textTransform:'uppercase',marginBottom:14 }}>
            Tu noche incluye
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
            {includes.map(({ text, icon }, i) => (
              <div key={i} className="include-card" style={{
                background:'rgba(255,255,255,.03)',border:'.5px solid rgba(255,255,255,.08)',
                borderRadius:16,padding:'16px 14px',display:'flex',flexDirection:'column',gap:10,
                transition:'border-color .2s',
              }}>
                <div style={{ width:32,height:32,background:'rgba(16,185,129,.1)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:G }}>
                  {icon}
                </div>
                <div style={{ fontSize:12,color:'rgba(255,255,255,.75)',lineHeight:1.4,fontWeight:400 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUOTE ── */}
        <div className="fade-up-6" style={{ margin:'24px 20px 0',padding:'18px 20px',
          borderLeft:`2px solid ${G}`,background:'rgba(16,185,129,.05)',
          borderRadius:'0 14px 14px 0' }}>
          <p style={{ fontSize:13,fontStyle:'italic',fontWeight:300,color:'rgba(255,255,255,.5)',lineHeight:1.65 }}>
            "ENTRADA PROHIBIDA A COCHI Y YAHIR"
          </p>
        </div>

        {/* ── RSVP + CALENDARIO ── */}
        <div style={{ padding:'24px 20px 0', display:'flex', flexDirection:'column', gap:12 }}>

          {/* RSVP */}
          <button onClick={rsvp} className="cta-main" style={{
            width:'100%',padding:'17px 24px',borderRadius:16,border:'.5px solid rgba(16,185,129,.35)',
            fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,
            letterSpacing:'.08em',textTransform:'uppercase',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',gap:10,
            background:'rgba(16,185,129,.1)',color:G,
          }}>
            <WhatsAppIcon size={18} />
            ¡Voy a ir! · Confirmar asistencia
          </button>

          {/* Agregar al calendario */}
          <button onClick={addToCalendar} className="cta-main" style={{
            width:'100%',padding:'17px 24px',borderRadius:16,border:'.5px solid rgba(255,255,255,.1)',
            fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,
            letterSpacing:'.08em',textTransform:'uppercase',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',gap:10,
            background:'rgba(255,255,255,.04)',color:'rgba(255,255,255,.55)',
          }}>
            <Icon size={18} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            Agregar al calendario
          </button>

        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign:'center',padding:'24px 28px 12px',fontSize:10,letterSpacing:'.2em',color:'rgba(255,255,255,.1)',textTransform:'uppercase' }}>
          Pekas Birthday · Edición Digital
        </div>

      </div>

      {/* ── STICKY SHARE BAR ── */}
      <div className="sticky-bar">
        <button onClick={shareNative} className="cta-main" style={{
          width:'100%',padding:'18px 24px',borderRadius:18,border:'none',
          fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,
          letterSpacing:'.08em',textTransform:'uppercase',cursor:'pointer',
          display:'flex',alignItems:'center',justifyContent:'center',gap:10,
          background:'#10b981',color:'#052e16',
          boxShadow:'0 8px 32px rgba(16,185,129,.45),0 2px 8px rgba(0,0,0,.4)',
        }}>
          <WhatsAppIcon size={20} />
          Compartir invitación
        </button>
      </div>

    </div>
  );
};

export default App;
