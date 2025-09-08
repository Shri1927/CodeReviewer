import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Code, ArrowRight, Copy, NotebookPen, Wrench, CheckCircle2, Sparkles, Users, HelpCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/editor');
  };
  const handleHeaderOpen = () => {
    navigate('/editor');
  };

  const codeSample = `function sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(10, 20));`;

  function copySample() {
    navigator.clipboard.writeText(codeSample);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(60% 100% at 10% 10%, rgba(147,51,234,.25) 0%, rgba(59,130,246,.12) 35%, rgba(30,30,30,1) 70%)',
      backgroundColor: '#121212',
      color: '#ffffff',
      fontFamily: 'var(--ui-font)'
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(0,0,0,.35)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '12px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrainCircuit size={32} color='#9333ea'/>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Codeify</span>
          </div>
          <button onClick={handleHeaderOpen} className="btn btn-primary" title="Open Editor" style={{ boxShadow: '0 8px 22px rgba(96,165,250,.25)' }}>
            <Code size={18} /> Open Editor
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '90px 0 40px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(40% 50% at 60% 10%, rgba(168,85,247,.18), transparent 60%)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 3.8rem)', lineHeight: 1.15, marginBottom: 16 }}>
              <span style={{ color: '#fff' }}>AI Code Review</span>
              <br/>
              <span style={{
                background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Built for Developers</span>
            </h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(147,51,234,.14)', border: '1px solid rgba(168,85,247,.25)', color: '#c4b5fd', padding: '6px 10px', borderRadius: 999, fontSize: 12, marginBottom: 12 }}>Fast • Insightful • Actionable</div>
            <p style={{ color: '#C5C5C5', fontSize: 18, maxWidth: 620, marginBottom: 28 }}>Ship better code with instant, high‑quality reviews, rich explanations, and actionable fixes—right when you need them.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleExploreClick} className="btn btn-primary" style={{ boxShadow: '0 10px 30px rgba(96,165,250,.25)' }}>
                <Code size={18} /> Open Editor <ArrowRight size={16} />
              </button>
              <a href="#preview" className="btn btn-ghost" style={{ textDecoration: 'none' }}>See Preview</a>
            </div>
          </div>

          {/* Code preview block */}
          <div id="preview" style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,.7), rgba(0,0,0,.4))',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,.35)',
            transform: 'translateZ(0)',
            transition: 'transform .25s ease, box-shadow .25s ease'
          }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 28px 60px rgba(0,0,0,.45)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,.35)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.35)' }}>
              <span style={{ color: '#a1a1aa', fontSize: 12 }}>example.js</span>
              <button onClick={copySample} title="Copy" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: '#fff', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer' }}>
                <Copy size={14} /> Copy
              </button>
            </div>
            <div style={{ padding: 18, position: 'relative', fontFamily: 'var(--code-font)', minHeight: 160 }}>
              {/* Highlight pulse line */}
              <div className="line-pulse" style={{ position: 'absolute', left: 0, right: 0, top: 48, height: 22, background: 'linear-gradient(90deg, rgba(168,85,247,.08), rgba(96,165,250,.08))', filter: 'blur(0.2px)' }}></div>
              {/* Code */}
              <pre style={{ margin: 0, color: '#C5C5C5', whiteSpace: 'pre-wrap' }}>
{codeSample}
              </pre>
              {/* Cursor */}
              <span className="blink-cursor" style={{ position: 'absolute', width: 8, height: 18, background: '#ffffff', left: 180, bottom: 26, borderRadius: 1 }}></span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '40px 0 10px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 18 }}>How it Works</h2>
          <ol style={{ color: '#C5C5C5', lineHeight: 1.8, paddingLeft: 18 }}>
            <li>Paste or write your code in the editor.</li>
            <li>Click Review to get a structured analysis with quality, suggestions, errors, and improvements.</li>
            <li>Use Fix for an AI‑generated improved version; Undo Fix to roll back.</li>
            <li>Chat with Reviewer to ask follow‑ups, alternatives, or get explanations.</li>
          </ol>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,.04), rgba(255,255,255,.08), rgba(255,255,255,.04))', margin: '10px 0 0 0' }} />

      {/* Features */}
      <section style={{ padding: '20px 0 70px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          <div style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18, transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.35)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <NotebookPen size={18} color="#a855f7" />
              <strong>Note Making</strong>
            </div>
            <p style={{ color: '#C5C5C5' }}>Keep quick notes and decisions from each review session for future reference.</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18, transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.35)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <CheckCircle2 size={18} color="#60a5fa" />
              <strong>Code Reviewing</strong>
            </div>
            <p style={{ color: '#C5C5C5' }}>Deep, structured reviews with quality rating, step‑by‑step explanation, and concrete issues.</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18, transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.35)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Wrench size={18} color="#34d399" />
              <strong>Code Fixing</strong>
            </div>
            <p style={{ color: '#C5C5C5' }}>One‑click fixes and in‑card Apply Fix buttons to update the code directly.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '10px 0 60px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 18 }}>Why Codeify</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {[{title:'Ship Faster',desc:'Cut review cycles with instant, high‑signal feedback.'},{title:'Improve Quality',desc:'Catch bugs earlier and adopt best practices easily.'},{title:'Learn by Doing',desc:'Understand the why with clear, step‑by‑step explanations.'},{title:'Stay in Flow',desc:'Fix code in place and keep momentum.'}].map((b,i)=> (
              <div key={i} style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18, transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.35)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Sparkles size={18} color="#a855f7" />
                  <strong>{b.title}</strong>
                </div>
                <p style={{ color: '#C5C5C5' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '10px 0 60px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 18 }}>Loved by Developers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {[`“The best review assistant I’ve used.”`,`“Actionable suggestions and instant fixes.”`,`“Great learning tool with clear explanations.”`].map((q,i)=> (
              <div key={i} style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18, transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.35)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Users size={18} color="#60a5fa" />
                  <strong>Developer</strong>
                </div>
                <p style={{ color: '#C5C5C5' }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '10px 0 60px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 18 }}>FAQ</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[{q:'Is my code stored?',a:'Sessions are local to your browser unless you save them.'},{q:'Which languages are supported?',a:'Popular languages including JS, TS, Python, Java, C#, and more.'},{q:'Can I use it for learning?',a:'Yes, explanations and suggestions are designed to teach as you go.'}].map((f,i)=>(
              <div key={i} style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18, transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.35)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <HelpCircle size={18} color="#34d399" />
                  <strong>{f.q}</strong>
                </div>
                <p style={{ color: '#C5C5C5' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '30px 0 70px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Ready to level up your code?</h2>
          <p style={{ color: '#C5C5C5', marginBottom: 18 }}>Open the editor and get instant, high‑quality reviews.</p>
          <button onClick={handleExploreClick} className="btn btn-success" style={{ boxShadow: '0 10px 30px rgba(46, 204, 113, .25)' }}>
            <Code size={18} /> Open Editor <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.06)', background: 'linear-gradient(180deg, rgba(17,17,17,.8), rgba(0,0,0,.6))' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center', color: '#a1a1aa' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <BrainCircuit size={22} color='#9333ea'/>
              <strong style={{ color: '#fff' }}>Codeify</strong>
            </div>
            <p style={{ margin: 0 }}>Ship better code with instant, high‑quality reviews.</p>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contact</a>
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12 }}>
            <span>© {new Date().getFullYear()} Codeify. All rights reserved.</span>
            <span>Made with ❤️ for developers</span>
          </div>
        </div>
      </footer>

      {/* Inline CSS for animations respecting prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .blink-cursor { animation: blink 1.1s steps(2, start) infinite; }
          .line-pulse { animation: pulse 3.2s ease-in-out infinite; }
          .btn:hover { filter: brightness(1.05); }
        }
        @keyframes blink { to { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: .25 } 50% { opacity: .55 } }
      `}</style>
    </div>
  );
};

export default LandingPage;