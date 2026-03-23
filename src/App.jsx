import React, { useState } from 'react';

const BilliardIcon = () => (
  <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor">
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
  </svg>
);

const App = () => {
  const [copied, setCopied] = useState(false);

  const copyInfo = () => {
    const text = `✨ *PEKAS FEST* ✨\nFiesta de Cumpleaños\n\n📍 Bola Ocho Restaurant Bar & Billar\n🕘 9:00 PM - 1:00 AM\n🎟 Aporte por persona: $700 MXN\n\n*Incluye:*\n• 2 mesas de billar (4 hrs)\n• Entradas para compartir\n• Tacos de bistec\n• Refresco\n• Tequila \n• Cubetas de cerveza\n• Palomitas de cortesía\n\n"Ven a celebrar una noche de fiesta, billar y buena vibra"`;

    const doCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(doCopy).catch(() => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        doCopy();
      });
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      doCopy();
    }
  };

  const includes = [
    { text: '2 mesas de billar por 4 horas', icon: <BilliardIcon /> },
    {
      text: 'Entradas para compartir', icon: (
        <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 16.5v-.75A.75.75 0 0 1 15.75 15h.75a.75.75 0 0 1 .75.75V18a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 8.25 18v-2.25a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75" />
        </svg>
      )
    },
    {
      text: 'Tacos de bistec', icon: (
        <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Z" />
        </svg>
      )
    },
    {
      text: 'Botellas de tequila', icon: (
        <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-5.8-12.25 1.5-.5m0 0 1.5 5.5" />
        </svg>
      )
    },
    {
      text: 'Cubetas de cerveza', icon: (
        <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      )
    },
    {
      text: 'Refrescos + palomitas', icon: (
        <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
        </svg>
      )
    },
  ];

  const tickerItems = ['Billar', '·', 'Tequila', '·', 'Tacos', '·', 'Cerveza', '·', 'Buena vibra', '·'];

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, fontFamily: "'DM Sans', sans-serif", color: '#fff', background: '#0a0a0a' }}>

        {/* Google Font */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0a0a0a; }
          @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>

        {/* HERO */}
        <div style={{ position: 'relative', padding: '52px 28px 36px', overflow: 'hidden' }}>
          {/* glow verde */}
          <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* glow amarillo */}
          <div style={{ position: 'absolute', bottom: -40, right: -60, width: 250, height: 250, background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Bola 8 */}
          <div style={{ position: 'absolute', top: 28, right: 24, width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 38% 36%, #fff 0%, #10b981 45%, #065f46 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.6)', zIndex: 2, boxShadow: '0 0 0 3px rgba(16,185,129,0.25), 0 8px 24px rgba(0,0,0,0.5)' }}>8</div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.35em', color: '#10b981', textTransform: 'uppercase', marginBottom: 10 }}>Fiesta de Cumpleaños</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(80px, 22vw, 108px)', lineHeight: 0.9, color: '#fff', marginBottom: 4 }}>
              PEKAS<br /><span style={{ color: '#10b981' }}>FEST</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 300, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginTop: 6 }}>Una noche que no vas a olvidar</div>
          </div>
        </div>

        {/* TICKER */}
        <div style={{ overflow: 'hidden', borderTop: '0.5px solid rgba(255,255,255,0.06)', borderBottom: '0.5px solid rgba(255,255,255,0.06)', padding: '10px 0', background: 'rgba(16,185,129,0.04)' }}>
          <div style={{ display: 'flex', animation: 'ticker 14s linear infinite', whiteSpace: 'nowrap' }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.6)', padding: '0 32px' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* INFO ROWS */}
        <div style={{ padding: '0 28px', marginTop: 28 }}>
          {[
            {
              label: 'Lugar', value: 'Bola Ocho Restaurant Bar & Billar',
              icon: <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="18" height="18" stroke="#10b981"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            },
            {
              label: 'Horario', value: '9:00 PM — 1:00 AM',
              icon: <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="18" height="18" stroke="#10b981"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            },
          ].map(({ label, value, icon }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '0.5px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 15, color: '#fff' }}>{value}</div>
              </div>
            </div>
          ))}

          {/* PRECIO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '0.5px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="18" height="18" stroke="#10b981"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 3 }}>Aporte por persona</div>
              <div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#10b981', lineHeight: 1 }}>$700</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 300, marginLeft: 4 }}>MXN</span>
              </div>
            </div>
          </div>
        </div>

        {/* INCLUYE */}
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', padding: '28px 28px 16px' }}>Tu noche incluye</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 28px' }}>
          {includes.map(({ text, icon }, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: 28, height: 28, background: 'rgba(16,185,129,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>{icon}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{text}</div>
            </div>
          ))}
        </div>

        {/* QUOTE */}
        <div style={{ margin: '28px 28px 0', padding: '18px 20px', borderLeft: '2px solid #10b981', background: 'rgba(16,185,129,0.05)', borderRadius: '0 12px 12px 0' }}>
          <p style={{ fontSize: 13, fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            "Ven a celebrar una noche de fiesta, billar y buena vibra"
          </p>
        </div>

        {/* CTA */}
        <div style={{ margin: '24px 28px 12px' }}>
          <button
            onClick={copyInfo}
            style={{
              width: '100%', padding: '18px 24px', borderRadius: 16, border: 'none',
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.25s ease',
              background: copied ? '#065f46' : '#10b981',
              color: copied ? '#6ee7b7' : '#0a0a0a',
            }}
          >
            {copied
              ? <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              : <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
            }
            {copied ? '¡Copiado para WhatsApp!' : 'Compartir por WhatsApp'}
          </button>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: 'center', padding: '16px 28px 32px', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase' }}>
          Pekas Fest · Edición Digital
        </div>

      </div>
    </div>
  );
};

export default App;