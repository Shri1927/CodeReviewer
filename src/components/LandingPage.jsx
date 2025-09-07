import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Code, ArrowRight, Copy, NotebookPen, Wrench, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
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
      backgroundColor: '#1E1E1E',
      color: '#ffffff',
      fontFamily: 'var(--ui-font)'
    }}>
      {/* Header */}
      <header style={{
        background: 'transparent',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <BrainCircuit size={32} color='#9333ea'/>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Codeify</span>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '90px 0 40px 0' }}>
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
            <p style={{ color: '#C5C5C5', fontSize: 18, maxWidth: 620, marginBottom: 28 }}>Ship better code with instant, high‑quality reviews, rich explanations, and actionable fixes—right when you need them.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleExploreClick} className="btn btn-primary">
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
            boxShadow: '0 20px 50px rgba(0,0,0,.35)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.35)' }}>
              <span style={{ color: '#a1a1aa', fontSize: 12 }}>example.js</span>
              <button onClick={copySample} title="Copy" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: '#fff', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer' }}>
                <Copy size={14} /> Copy
              </button>
            </div>
            <div style={{ padding: 18, position: 'relative', fontFamily: 'var(--code-font)', minHeight: 160 }}>
              {/* Highlight pulse line */}
              <div className="line-pulse" style={{ position: 'absolute', left: 0, right: 0, top: 48, height: 22, background: 'linear-gradient(90deg, rgba(168,85,247,.08), rgba(96,165,250,.08))' }}></div>
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

      {/* Features */}
      <section style={{ padding: '20px 0 70px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          <div style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <NotebookPen size={18} color="#a855f7" />
              <strong>Note Making</strong>
            </div>
            <p style={{ color: '#C5C5C5' }}>Keep quick notes and decisions from each review session for future reference.</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <CheckCircle2 size={18} color="#60a5fa" />
              <strong>Code Reviewing</strong>
            </div>
            <p style={{ color: '#C5C5C5' }}>Deep, structured reviews with quality rating, step‑by‑step explanation, and concrete issues.</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Wrench size={18} color="#34d399" />
              <strong>Code Fixing</strong>
            </div>
            <p style={{ color: '#C5C5C5' }}>One‑click fixes and in‑card Apply Fix buttons to update the code directly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '28px 0', borderTop: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.35)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa' }}>
          <span>© {new Date().getFullYear()} Codeify. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>

      {/* Inline CSS for animations respecting prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .blink-cursor { animation: blink 1.1s steps(2, start) infinite; }
          .line-pulse { animation: pulse 3.2s ease-in-out infinite; }
        }
        @keyframes blink { to { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: .25 } 50% { opacity: .55 } }
      `}</style>
    </div>
  );
};

export default LandingPage;