import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import { Play, Wrench, BookOpen, Lightbulb, AlertTriangle, List, ArrowDown, Save, ChevronDown, CheckCircle } from 'lucide-react';
import RingLoader from "react-spinners/RingLoader";

const CodeReviewer = () => {
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [response, setResponse] = useState("");
  const [reviewData, setReviewData] = useState(null);

  // Collapsibles
  const [collapsed, setCollapsed] = useState({ quality: false, suggestions: false, explanation: false, errors: false, improvements: false });

  // History
  const [history, setHistory] = useState([]);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(null);
  const lastFixedRef = useRef("");

  // Resizable state
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [leftWidthPct, setLeftWidthPct] = useState(65);

  // Refs for Monaco
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const palette = {
    bgMain: '#1E1E1E',
    bgPanel: '#2A2A2A',
    editorPanel: '#252526',
    divider: '#2D2D2D',
    textPrimary: '#FFFFFF',
    textSecondary: '#C5C5C5',
    textMuted: '#8A8A8A',
    run: '#2ECC71',
    runHover: '#3ee685',
    fix: '#3498DB',
    fixHover: '#4aa5e6',
    save: '#95A5A6',
    saveHover: '#aeb7b8',
    bulb: '#F1C40F',
    error: '#E67E22',
    arrow: '#AAAAAA'
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: palette.editorPanel,
      borderColor: palette.divider,
      color: palette.textPrimary,
      width: "100%",
      borderRadius: '8px',
      border: `1px solid ${palette.divider}`
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: palette.editorPanel,
      color: palette.textPrimary,
      width: "100%",
      borderRadius: '8px',
      border: `1px solid ${palette.divider}`
    }),
    singleValue: (provided) => ({
      ...provided,
      color: palette.textPrimary,
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#2B2B2B' : palette.editorPanel,
      color: palette.textPrimary,
      cursor: 'pointer',
    }),
    input: (provided) => ({
      ...provided,
      color: palette.textPrimary,
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: palette.textMuted,
      width: "100%"
    }),
  };

  const ai = new GoogleGenAI({ apiKey: "AIzaSyBnHKFSlJ4ODaT9M4NTa6SumYCZzE3ZcS8"}); 

  async function reviewCode() {
    setResponse("");
    setLoading(true);
    setReviewData(null);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I'm sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following in a structured JSON format:

{
  "qualityRating": "Better|Good|Normal|Bad",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "explanation": "step by step explanation of what the code does",
  "errors": ["error1", "error2"] or "No potential bugs or logical errors",
  "improvements": ["improvement1", "improvement2"]
}

Analyze it like a senior developer reviewing a pull request.

Code: ${code}
`,
    });
    
    try {
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        setReviewData(parsedData);
        setHistory((h) => [{ timestamp: new Date().toISOString(), data: parsedData, codeSnapshot: code }, ...h]);
        setSelectedHistoryIndex(0);
      } else {
        setResponse(response.text);
      }
    } catch (error) {
      setResponse(response.text);
    }
    
    setLoading(false);
    showToast('Code reviewed ✅');
  }

  async function fixCode() {
    if (code === "") {
      alert("Please enter code first");
      return;
    }
    
    setFixing(true);
    lastFixedRef.current = code;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert software developer. Please fix and improve the following ${selectedOption.value} code. 
Return ONLY the improved code without any explanations or markdown formatting.

Original code:
${code}

Improved code:`,
    });
    
    setCode(response.text.trim());
    setFixing(false);
    showToast('Fix applied 🔧');
  }

  function saveCode() {
    try {
      // Build a single human-readable text file containing code, review, and chat
      const lines = [];
      lines.push(`# Codeify Session`);
      lines.push(`Saved: ${new Date().toISOString()}`);
      lines.push(`Language: ${selectedOption.value}`);
      lines.push('');
      lines.push('=== Code ===');
      lines.push(code || '(empty)');
      lines.push('');
      lines.push('=== Review ===');
      if (reviewData) {
        lines.push(`Quality Rating: ${reviewData.qualityRating ?? 'N/A'}`);
        if (Array.isArray(reviewData.suggestions) && reviewData.suggestions.length) {
          lines.push('Suggestions:');
          reviewData.suggestions.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
        }
        if (reviewData.explanation) {
          lines.push('Explanation:');
          lines.push(`  ${reviewData.explanation}`);
        }
        if (Array.isArray(reviewData.errors)) {
          lines.push('Errors:');
          reviewData.errors.forEach((e, i) => lines.push(`  ${i + 1}. ${e}`));
        } else if (typeof reviewData.errors === 'string') {
          lines.push(`Errors: ${reviewData.errors}`);
        }
        if (Array.isArray(reviewData.improvements) && reviewData.improvements.length) {
          lines.push('Improvements:');
          reviewData.improvements.forEach((im, i) => lines.push(`  ${i + 1}. ${im}`));
        }
      } else {
        lines.push('(No review yet)');
      }
      lines.push('');
      lines.push('=== Chat ===');
      if (chatMessages && chatMessages.length) {
        chatMessages.forEach((m) => {
          const who = m.role === 'user' ? 'You' : 'Codie';
          lines.push(`${who}: ${m.content}`);
        });
      } else {
        lines.push('(No chat)');
      }

      const sessionText = lines.join('\n');
      const blob = new Blob([sessionText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'codeify_session.txt';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Saved session (code + review + chat) 💾');
    } catch (_) {
      showToast('Save failed');
    }
  }

  function undoFix() {
    if (lastFixedRef.current) {
      setCode(lastFixedRef.current);
      lastFixedRef.current = "";
      showToast('Undo applied ↩️');
    }
  }

  // Simple toast system
  const [toast, setToast] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 1800);
  }

  async function sendChatMessage() {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    const userMsg = { role: 'user', content: trimmed, ts: Date.now() };
    setChatMessages((m) => [...m, userMsg]);
    setChatInput("");

    const reviewJson = reviewData ? JSON.stringify(reviewData) : 'null';
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are Codie, a helpful senior code reviewer. Continue the conversation and answer concisely.\n\nContext:\n- Language: ${selectedOption.value}\n- Current code:\n${code}\n- Last structured review (JSON):\n${reviewJson}\n\nUser question:\n${trimmed}`
    });

    const assistantMsg = { role: 'assistant', content: response.text?.trim?.() || 'No response', ts: Date.now() };
    setChatMessages((m) => [...m, assistantMsg]);
  }

  // Resizer handlers
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.min(85, Math.max(35, (x / rect.width) * 100));
      setLeftWidthPct(pct);
    };
    const stopDrag = () => { isDraggingRef.current = false; };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, []);

  function toggleCard(key) {
    setCollapsed((c) => ({ ...c, [key]: !c[key] }));
  }

  function extractCodeBlocks(text) {
    if (!text) return [];
    const blocks = [];
    const regex = /```[a-zA-Z]*\n([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      blocks.push(match[1]);
    }
    return blocks;
  }

  function copyToClipboard(str) {
    navigator.clipboard.writeText(str);
    showToast('Copied to clipboard 📋');
  }

  function applyFixBlock(block) {
    if (!block) return;
    setCode(block);
    showToast('Applied fix to editor ✅');
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme('codeify-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '569CD6' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'identifier', foreground: 'D4D4D4' },
        { token: 'type.identifier', foreground: 'DCDCAA' },
        { token: 'string', foreground: 'CE9178' }
      ],
      colors: {
        'editor.background': palette.bgMain,
        'editor.foreground': palette.textPrimary,
        'editor.lineHighlightBackground': '#2D2D2D66',
        'editor.lineHighlightBorder': palette.divider,
        'editorCursor.foreground': palette.textPrimary,
        'editorLineNumber.foreground': palette.textMuted,
        'editorLineNumber.activeForeground': palette.textPrimary,
        'editorGutter.background': '#1B1B1B',
        'editor.selectionBackground': '#264F78AA',
        'editorIndentGuide.background': palette.divider,
        'editorBracketMatch.border': '#3C3C3C'
      }
    });

    monaco.editor.setTheme('codeify-dark');
  };

  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor) return;
    const model = editor.getModel();
    if (!model) return;

    if (!reviewData) {
      monaco.editor.setModelMarkers(model, 'review', []);
      return;
    }

    const markers = [];
    const totalLines = model.getLineCount();

    if (Array.isArray(reviewData.errors)) {
      reviewData.errors.forEach((msg, index) => {
        const line = Math.min(index + 1, totalLines);
        const endCol = model.getLineMaxColumn(line);
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: msg,
          startLineNumber: line,
          startColumn: 1,
          endLineNumber: line,
          endColumn: Math.max(2, endCol)
        });
      });
    }

    if (Array.isArray(reviewData.suggestions)) {
      reviewData.suggestions.forEach((msg, i) => {
        const line = Math.min(i + 1 + (Array.isArray(reviewData.errors) ? reviewData.errors.length : 0), totalLines);
        const endCol = model.getLineMaxColumn(line);
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: msg,
          startLineNumber: line,
          startColumn: 1,
          endLineNumber: line,
          endColumn: Math.max(2, endCol)
        });
      });
    }

    monaco.editor.setModelMarkers(model, 'review', markers);
  }, [reviewData, code]);

  return (
    <div
      className="main"
      style={{
        height: "calc(100vh - 90px)",
        backgroundColor: palette.bgMain,
        padding: '16px',
      }}
      ref={containerRef}
    >
      <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
        {/* Left Panel - Code Editor */}
        <div
          className="left flex flex-col"
          style={{
            width: `${leftWidthPct}%`,
            backgroundColor: palette.editorPanel,
            border: `1px solid ${palette.divider}`,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          {/* Header with grouped buttons and history */}
          <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${palette.divider}` }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center" style={{ gap: '8px' }}>
                <button 
                  className="btn btn-success"
                  style={{}}
                  onMouseEnter={(e) => {}}
                  onMouseLeave={(e) => {}}
                  onClick={() => {
                    if (code === "") {
                      alert("Please enter code first");
                    } else {
                      reviewCode();
                    }
                  }}
                >
                  <Play size={16} />
                  Review
                </button>
                <button 
                  className="btn btn-primary"
                  style={{}}
                  onMouseEnter={(e) => {}}
                  onMouseLeave={(e) => {}}
                  onClick={fixCode}
                  disabled={fixing}
                >
                  <Wrench size={16} />
                  {fixing ? 'Fixing...' : 'Fix'}
                </button>
                <button 
                  className="btn btn-neutral"
                  style={{}}
                  onMouseEnter={(e) => {}}
                  onMouseLeave={(e) => {}}
                  onClick={saveCode}
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
              <button
                className="btn btn-ghost"
                style={{}}
                onClick={undoFix}
              >Undo Fix</button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center" style={{ border: `1px solid ${palette.divider}`, borderRadius: '8px', overflow: 'hidden' }}>
                <select
                  value={selectedHistoryIndex ?? ''}
                  onChange={(e) => {
                    const idx = e.target.value === '' ? null : Number(e.target.value);
                    setSelectedHistoryIndex(idx);
                    if (idx !== null) {
                      setReviewData(history[idx].data);
                    }
                  }}
                  style={{ background: 'transparent', color: palette.textSecondary, padding: '6px 8px', outline: 'none', border: 'none' }}
                >
                  <option value="" style={{ color: '#000' }}>History</option>
                  {history.map((h, i) => (
                    <option key={i} value={i} style={{ color: '#000' }}>{new Date(h.timestamp).toLocaleTimeString()}</option>
                  ))}
                </select>
                <ChevronDown size={16} color={palette.textMuted} style={{ marginRight: 8 }} />
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="p-4" style={{ borderBottom: `1px solid ${palette.divider}` }}>
            <Select
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e) }}
              options={options}
              styles={customStyles}
              className="w-full"
            />
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <Editor 
              height="100%" 
              theme='codeify-dark'
              language={selectedOption.value} 
              value={code} 
              onChange={(e) => { setCode(e) }}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 15,
                lineNumbers: 'on',
                lineNumbersMinChars: 4,
                glyphMargin: true,
                renderLineHighlight: 'all',
                renderLineHighlightOnlyWhenFocus: false,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: true,
                smoothScrolling: true,
                roundedSelection: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={() => { isDraggingRef.current = true; }}
          style={{ width: '6px', cursor: 'col-resize', background: palette.divider, borderRadius: '6px' }}
        />

        {/* Right Panel - Stacked Feedback */}
        <div
          className="right flex flex-col"
          style={{
            width: `${100 - leftWidthPct}%`,
            backgroundColor: palette.bgPanel,
            border: `1px solid ${palette.divider}`,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
          }}
        >
          <div className="p-4" style={{ borderBottom: `1px solid ${palette.divider}` }}>
            <span style={{ color: palette.textPrimary, fontWeight: 600 }}>Code</span>
          </div>

          {/* Toast */}
          {toast && (
            <div style={{ position: 'absolute', right: 24, top: 100, background: '#333', color: '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              {toast}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4" style={{ background: '#242424' }}>
            {loading && (
              <div className="flex justify-center items-center h-32">
                <RingLoader color='#9333ea' size={50} />
              </div>
            )}

            {reviewData && !loading && (
              <div className="space-y-5">
                <div className="rounded-xl p-4 shadow-md" style={{ backgroundColor: '#000000', border: `1px solid ${palette.divider}`, fontFamily: 'var(--ui-font)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
                        <CheckCircle size={16} color={palette.run} />
                      </div>
                      <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600 }}>Quality Rating</h3>
                    </div>
                    <button onClick={() => toggleCard('quality')} className="text-sm" style={{ color: palette.textMuted }}>{collapsed.quality ? 'Expand' : 'Collapse'}</button>
                  </div>
                  {!collapsed.quality && (
                    <p className="font-medium" style={{ color: palette.run, fontFamily: 'var(--ui-font)', fontWeight: 600 }}>{reviewData.qualityRating}</p>
                  )}
                </div>

                <div className="rounded-xl p-4 shadow-md" style={{ backgroundColor: '#000000', border: `1px solid ${palette.divider}`, fontFamily: 'var(--ui-font)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
                        <Lightbulb size={16} color={palette.bulb} />
                      </div>
                      <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600 }}>Suggestions</h3>
                    </div>
                    <button onClick={() => toggleCard('suggestions')} className="text-sm" style={{ color: palette.textMuted }}>{collapsed.suggestions ? 'Expand' : 'Collapse'}</button>
                  </div>
                  {!collapsed.suggestions && (
                    <ul className="space-y-3">
                      {reviewData.suggestions?.map((suggestion, index) => {
                        const blocks = extractCodeBlocks(suggestion);
                        return (
                          <li key={index} className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 400 }}>
                            <div className="mb-2">• {suggestion.replace(/```[\s\S]*?```/g, '').trim()}</div>
                            {blocks.map((b, bi) => (
                              <div key={bi} className="rounded-md" style={{ background: '#1f1f1f', border: `1px solid ${palette.divider}` }}>
                                <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${palette.divider}` }}>
                                  <span className="text-xs" style={{ color: palette.textMuted }}>Suggested code</span>
                                  <div className="flex items-center gap-2">
                                    <button className="text-xs px-2 py-1 rounded-md" style={{ background: '#333', color: '#fff', fontFamily: 'var(--ui-font)' }} onClick={() => copyToClipboard(b)}>Copy</button>
                                    <button className="text-xs px-2 py-1 rounded-md" style={{ background: palette.fix, color: '#fff', fontFamily: 'var(--ui-font)' }} onClick={() => applyFixBlock(b)}>Apply Fix</button>
                                  </div>
                                </div>
                                <pre className="p-3 text-xs overflow-auto" style={{ color: palette.textSecondary, margin: 0, fontFamily: 'var(--code-font)', fontWeight: 400 }}><code>{b}</code></pre>
                              </div>
                            ))}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="rounded-xl p-4 shadow-md" style={{ backgroundColor: '#000000', border: `1px solid ${palette.divider}`, fontFamily: 'var(--ui-font)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
                        <BookOpen size={16} color={'#4A90E2'} />
                      </div>
                      <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600 }}>Step-by-Step Explanation</h3>
                    </div>
                    <button onClick={() => toggleCard('explanation')} className="text-sm" style={{ color: palette.textMuted }}>{collapsed.explanation ? 'Expand' : 'Collapse'}</button>
                  </div>
                  {!collapsed.explanation && (
                    <p className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 400 }}>
                      {reviewData.explanation}
                    </p>
                  )}
                </div>

                <div className="rounded-xl p-4 shadow-md" style={{ backgroundColor: '#000000', border: `1px solid ${palette.divider}`, fontFamily: 'var(--ui-font)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
                        <AlertTriangle size={16} color={palette.error} />
                      </div>
                      <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600 }}>Errors</h3>
                    </div>
                    <button onClick={() => toggleCard('errors')} className="text-sm" style={{ color: palette.textMuted }}>{collapsed.errors ? 'Expand' : 'Collapse'}</button>
                  </div>
                  {!collapsed.errors && (
                    Array.isArray(reviewData.errors) ? (
                      <ul className="space-y-2">
                        {reviewData.errors.map((error, index) => (
                          <li key={index} className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 400 }}>• {error}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 400 }}>{reviewData.errors}</p>
                    )
                  )}
                </div>

                {reviewData.improvements && (
                  <div className="rounded-xl p-4 shadow-md" style={{ backgroundColor: '#000000', border: `1px solid ${palette.divider}`, fontFamily: 'var(--ui-font)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
                          <List size={16} color={'#2ECC71'} />
                        </div>
                        <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600 }}>Improvements</h3>
                      </div>
                      <button onClick={() => toggleCard('improvements')} className="text-sm" style={{ color: palette.textMuted }}>{collapsed.improvements ? 'Expand' : 'Collapse'}</button>
                    </div>
                    {!collapsed.improvements && (
                      <ul className="space-y-2">
                        {reviewData.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 400 }}>• {improvement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {response && !reviewData && !loading && (
              <div className="whitespace-pre-wrap" style={{ color: palette.textSecondary }}>{response}</div>
            )}

            {!loading && !response && !reviewData && (
              <div className="flex items-center justify-center h-32">
                <p style={{ color: palette.textMuted }}>Click "Review" to analyze your code</p>
              </div>
            )}

            {/* Chat with Reviewer */}
            <div className="rounded-xl p-4 shadow-md mt-5" style={{ backgroundColor: '#2b2b2b', border: `1px solid ${palette.divider}`, fontFamily: 'var(--ui-font)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold" style={{ color: palette.textPrimary }}>Chat with Reviewer</h3>
              </div>
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto" style={{ background: '#202020', border: `1px solid ${palette.divider}`, borderRadius: 8, padding: 12 }}>
                {chatMessages.length === 0 && (
                  <span style={{ color: palette.textMuted, fontSize: 12 }}>Ask follow-ups about the review, performance, patterns, or alternatives.</span>
                )}
                {chatMessages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: '#9ca3af', fontSize: 12, minWidth: 56 }}>{m.role === 'user' ? 'You' : 'Codie'}</span>
                    <p style={{ color: palette.textSecondary, whiteSpace: 'pre-wrap', margin: 0 }}>{m.content}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') sendChatMessage(); }}
                  placeholder="Ask a follow-up (e.g., Can you optimize this?)"
                  style={{ flex: 1, background: '#1f1f1f', color: palette.textPrimary, border: `1px solid ${palette.divider}`, borderRadius: 8, padding: '10px 12px', outline: 'none' }}
                />
                <button onClick={sendChatMessage} className="px-3 py-2 rounded-md" style={{ background: palette.fix, color: '#fff' }}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewer;