import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Code, CheckCircle, Zap, ArrowRight, Shield, Lightbulb, AlertTriangle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    console.log('Explore button clicked!'); // Debug log
    navigate('/editor');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#18181b',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#18181b',
        borderBottom: '1px solid #27272a',
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
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffffff'
          }}>Codeify</span>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            <span style={{ color: '#ffffff' }}>AI-Powered</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #9333ea, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Code Review</span>
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px auto',
            lineHeight: '1.6'
          }}>
            Get instant, expert-level code reviews powered by advanced AI. 
            Improve your code quality, catch bugs early, and learn best practices.
          </p>
          
          <button 
            onClick={handleExploreClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#9333ea',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7c3aed';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#9333ea';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Code size={24} />
            Explore Code Editor
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Why Choose Codeify Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'rgba(39, 39, 42, 0.3)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '16px'
            }}>Why Choose Codeify?</h2>
            <p style={{
              fontSize: '20px',
              color: '#a1a1aa'
            }}>Advanced AI technology meets developer expertise</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Lightning Fast */}
            <div style={{
              backgroundColor: '#27272a',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid #3f3f46',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#9333ea';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#3f3f46';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#9333ea',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <Zap size={32} color="#ffffff" />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '16px'
              }}>Lightning Fast</h3>
              <p style={{
                color: '#a1a1aa',
                lineHeight: '1.6'
              }}>
                Get comprehensive code reviews in seconds, not hours. Our AI analyzes your code instantly and provides detailed feedback.
              </p>
            </div>

            {/* Expert Quality */}
            <div style={{
              backgroundColor: '#27272a',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid #3f3f46',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#3f3f46';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#3b82f6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <CheckCircle size={32} color="#ffffff" />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '16px'
              }}>Expert Quality</h3>
              <p style={{
                color: '#a1a1aa',
                lineHeight: '1.6'
              }}>
                Receive reviews that match the quality of senior developers. Catch bugs, improve performance, and learn best practices.
              </p>
            </div>

            {/* Secure & Private */}
            <div style={{
              backgroundColor: '#27272a',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid #10b981',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#10b981',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <Shield size={32} color="#ffffff" />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '16px'
              }}>Secure & Private</h3>
              <p style={{
                color: '#a1a1aa',
                lineHeight: '1.6'
              }}>
                Your code stays secure. We use enterprise-grade security measures to protect your intellectual property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action Section */}
      <section style={{
        padding: '80px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '16px'
            }}>See It In Action</h2>
            <p style={{
              fontSize: '20px',
              color: '#a1a1aa'
            }}>Experience the power of AI-driven code analysis</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Code Editor */}
            <div style={{
              backgroundColor: '#18181b',
              borderRadius: '12px',
              border: '1px solid #3f3f46',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: '#27272a',
                borderBottom: '1px solid #3f3f46'
              }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                <span style={{ color: '#a1a1aa', marginLeft: '16px', fontSize: '14px', fontFamily: 'monospace' }}>example.js</span>
              </div>
              <div style={{ padding: '24px' }}>
                <pre style={{
                  color: '#a1a1aa',
                  fontSize: '14px',
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  lineHeight: '1.6',
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
{`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`}
                </pre>
              </div>
            </div>
            
            {/* AI Review Panel */}
            <div style={{
              backgroundColor: '#27272a',
              borderRadius: '12px',
              border: '1px solid #3f3f46',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px'
              }}>
                <BrainCircuit size={20} color='#9333ea' />
                <span style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '18px'
                }}>AI Review</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Quality Rating */}
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <CheckCircle size={16} color="#10b981" />
                    <span style={{
                      color: '#10b981',
                      fontWeight: '600'
                    }}>Quality Rating: Good</span>
                  </div>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    margin: 0
                  }}>Function works correctly and is readable.</p>
                </div>
                
                {/* Suggestion */}
                <div style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <Lightbulb size={16} color="#3b82f6" />
                    <span style={{
                      color: '#3b82f6',
                      fontWeight: '600'
                    }}>Suggestion</span>
                  </div>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    margin: 0
                  }}>Consider using reduce() for more functional approach.</p>
                </div>
                
                {/* Performance */}
                <div style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid #f59e0b',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <AlertTriangle size={16} color="#f59e0b" />
                    <span style={{
                      color: '#f59e0b',
                      fontWeight: '600'
                    }}>Performance</span>
                  </div>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    margin: 0
                  }}>Add input validation to prevent errors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '24px'
          }}>Ready to Improve Your Code?</h2>
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Join thousands of developers who trust Codeify for their code reviews. 
            Start writing better code today.
          </p>
          <button 
            onClick={handleExploreClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#9333ea',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '20px 40px',
              fontSize: '20px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7c3aed';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#9333ea';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Code size={28} />
            Start Coding Now
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#27272a',
        borderTop: '1px solid #3f3f46',
        padding: '32px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <BrainCircuit size={24} color='#9333ea' />
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#ffffff'
            }}>Codeify</span>
          </div>
          <p style={{
            color: '#a1a1aa',
            margin: 0
          }}>
            © 2024 Codeify. Empowering developers with AI-powered code analysis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;