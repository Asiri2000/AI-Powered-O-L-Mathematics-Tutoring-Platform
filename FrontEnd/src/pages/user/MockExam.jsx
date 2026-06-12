import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ClipboardList, Timer, ChevronDown, ChevronUp,
  BookOpen, CheckCircle2, AlertCircle, Play, RotateCcw
} from "lucide-react";
import { generateMockExam } from "../../api";

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */
const EXAM_DURATION = 60 * 60; // 60 minutes in seconds

const fmt = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const MockExam = () => {
  const [phase, setPhase] = useState("select"); // select | exam | review
  const [grade, setGrade] = useState(10);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [activeQ, setActiveQ] = useState(0);
  const [answers, setAnswers] = useState({});          // { "1_a": "...", "1_b": "..." }
  const [expandedParts, setExpandedParts] = useState({}); // for review accordion
  const timerRef = useRef(null);

  /* ── Timer ── */
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase("review");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateMockExam(grade);
      if (data.error) throw new Error(data.error);
      setExam(data);
      setTimeLeft(EXAM_DURATION);
      setAnswers({});
      setActiveQ(0);
      setPhase("exam");
    } catch (e) {
      setError(e.message || "Failed to generate exam. Is the agent service running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setPhase("review");
  };

  const handleRestart = () => {
    clearInterval(timerRef.current);
    setExam(null);
    setAnswers({});
    setPhase("select");
  };

  const setAnswer = (qNum, part, val) =>
    setAnswers((prev) => ({ ...prev, [`${qNum}_${part}`]: val }));

  const togglePart = (key) =>
    setExpandedParts((prev) => ({ ...prev, [key]: !prev[key] }));

  const timerColor = timeLeft < 300 ? "#dc2626" : timeLeft < 900 ? "#d97706" : "#16a34a";

  /* ════════════════════════════════
     RENDER: SELECT PHASE
  ════════════════════════════════ */
  if (phase === "select") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "24px", padding: "3rem 2.5rem", maxWidth: "520px", width: "100%", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }}>

          {/* Icon */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: "72px", height: "72px", background: "linear-gradient(135deg, #16a34a, #059669)", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <ClipboardList style={{ width: "36px", height: "36px", color: "#fff" }} />
            </div>
            <h1 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: "800", margin: "0 0 8px" }}>Mock Examination</h1>
            <p style={{ color: "#94a3b8", margin: 0 }}>O/L Mathematics — Essay Paper</p>
          </div>

          {/* Exam info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "2rem" }}>
            {[
              { label: "Duration", value: "60 min" },
              { label: "Questions", value: "5 Essay" },
              { label: "Total Marks", value: "50" },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ color: "#fff", fontWeight: "800", fontSize: "1.1rem" }}>{value}</div>
                <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Grade selector */}
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "8px" }}>Select Grade</p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "2rem" }}>
            {[10, 11].map((g) => (
              <button key={g} onClick={() => setGrade(g)} style={{
                flex: 1, padding: "14px", borderRadius: "12px", fontWeight: "700", fontSize: "1rem",
                border: `2px solid ${grade === g ? "#16a34a" : "rgba(255,255,255,0.1)"}`,
                background: grade === g ? "rgba(22,163,74,0.2)" : "transparent",
                color: grade === g ? "#4ade80" : "#94a3b8", cursor: "pointer", transition: "all 0.2s",
              }}>
                Grade {g}
              </button>
            ))}
          </div>

          {/* Info box */}
          <div style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: "12px", padding: "14px 16px", marginBottom: "1.5rem" }}>
            <p style={{ color: "#4ade80", margin: 0, fontSize: "0.88rem", lineHeight: "1.6" }}>
              📋 <strong>5 random topics</strong> will be selected from the Grade {grade} syllabus. Each question is worth <strong>10 marks</strong> with multiple parts. Model answers are shown after submission.
            </p>
          </div>

          {error && (
            <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid #dc2626", borderRadius: "12px", padding: "12px 14px", marginBottom: "1rem", color: "#fca5a5", fontSize: "0.88rem" }}>
              ❌ {error}
            </div>
          )}

          <button onClick={handleStart} disabled={loading} style={{
            width: "100%", padding: "16px", background: loading ? "#374151" : "linear-gradient(135deg, #16a34a, #059669)",
            color: "#fff", border: "none", borderRadius: "14px", fontWeight: "800", fontSize: "1.05rem",
            cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            boxShadow: loading ? "none" : "0 8px 32px rgba(22,163,74,0.4)",
          }}>
            <Play size={20} /> {loading ? "Generating Exam…" : "Start Exam"}
          </button>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════
     RENDER: EXAM PHASE
  ════════════════════════════════ */
  if (phase === "exam" && exam) {
    const currentQ = exam.questions[activeQ];

    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column" }}>

        {/* ── Top Bar ── */}
        <div style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Grade {exam.grade} Mock Exam</span>
            <div style={{ color: "#fff", fontWeight: "700" }}>
              Question {activeQ + 1} of {exam.questions.length} — {currentQ?.topic}
            </div>
          </div>

          {/* Timer */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.3)", padding: "8px 16px", borderRadius: "99px", border: `2px solid ${timerColor}40` }}>
            <Timer style={{ width: "18px", height: "18px", color: timerColor }} />
            <span style={{ color: timerColor, fontWeight: "800", fontSize: "1.1rem", fontVariantNumeric: "tabular-nums" }}>
              {fmt(timeLeft)}
            </span>
          </div>

          <button onClick={handleSubmit} style={{
            background: "#dc2626", color: "#fff", border: "none", borderRadius: "10px",
            padding: "9px 18px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem",
          }}>
            Submit Exam
          </button>
        </div>

        {/* ── Main Layout ── */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Sidebar: Question Nav */}
          <div style={{ width: "200px", background: "#1e293b", borderRight: "1px solid #334155", padding: "16px", overflowY: "auto" }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: "700", marginBottom: "12px", textTransform: "uppercase" }}>Questions</p>
            {exam.questions.map((q, i) => {
              const hasAnswer = q.parts?.some(p => answers[`${q.question_number}_${p.part}`]?.trim());
              return (
                <button key={i} onClick={() => setActiveQ(i)} style={{
                  width: "100%", marginBottom: "8px", padding: "10px 12px", borderRadius: "10px",
                  border: `2px solid ${activeQ === i ? "#16a34a" : "transparent"}`,
                  background: activeQ === i ? "rgba(22,163,74,0.15)" : "rgba(255,255,255,0.04)",
                  color: activeQ === i ? "#4ade80" : hasAnswer ? "#93c5fd" : "#94a3b8",
                  cursor: "pointer", textAlign: "left", fontWeight: "600", fontSize: "0.85rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span>Q{i + 1}</span>
                  {hasAnswer && <CheckCircle2 size={14} />}
                </button>
              );
            })}
          </div>

          {/* Question Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
            {currentQ && (
              <div style={{ maxWidth: "780px", margin: "0 auto" }}>
                {/* Question Header */}
                <div style={{ background: "#1e293b", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #334155" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ background: "#16a34a", color: "#fff", borderRadius: "8px", padding: "4px 12px", fontSize: "0.8rem", fontWeight: "700" }}>
                      Question {currentQ.question_number}
                    </span>
                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      {currentQ.total_marks} marks — {currentQ.topic}
                    </span>
                  </div>
                  <p style={{ color: "#4ade80", margin: 0, fontSize: "0.9rem" }}>
                    ⏱ Suggested time: {Math.round(60 / exam.questions.length)} minutes
                  </p>
                </div>

                {/* Parts */}
                {currentQ.parts?.map((part, pi) => {
                  const key = `${currentQ.question_number}_${part.part}`;
                  return (
                    <div key={pi} style={{ background: "#1e293b", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem", border: "1px solid #334155" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <span style={{ color: "#fff", fontWeight: "700", fontSize: "1rem" }}>{part.part}</span>
                        <span style={{ color: "#64748b", fontSize: "0.82rem" }}>{part.marks} marks</span>
                      </div>
                      <p style={{ color: "#e2e8f0", lineHeight: "1.7", marginBottom: "14px", whiteSpace: "pre-line" }}>
                        {part.question}
                      </p>

                      {/* SVG Diagram (if applicable) */}
                      {pi === 0 && currentQ.svg_diagram && (
                        <div style={{ background: "#fff", borderRadius: "10px", padding: "12px", marginBottom: "12px", textAlign: "center" }}
                          dangerouslySetInnerHTML={{ __html: currentQ.svg_diagram }}
                        />
                      )}

                      <label style={{ color: "#94a3b8", fontSize: "0.82rem", display: "block", marginBottom: "6px" }}>
                        Your working / answer:
                      </label>
                      <textarea
                        value={answers[key] || ""}
                        onChange={(e) => setAnswer(currentQ.question_number, part.part, e.target.value)}
                        placeholder="Write your working and answer here…"
                        rows={5}
                        style={{
                          width: "100%", background: "#0f172a", color: "#e2e8f0",
                          border: "1.5px solid #334155", borderRadius: "10px", padding: "12px",
                          fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit",
                          outline: "none", boxSizing: "border-box",
                        }}
                      />
                    </div>
                  );
                })}

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                  <button onClick={() => setActiveQ(Math.max(0, activeQ - 1))} disabled={activeQ === 0}
                    style={{ padding: "10px 24px", background: activeQ === 0 ? "#1e293b" : "#334155", color: activeQ === 0 ? "#64748b" : "#e2e8f0", border: "none", borderRadius: "10px", fontWeight: "600", cursor: activeQ === 0 ? "not-allowed" : "pointer" }}>
                    ← Previous
                  </button>
                  {activeQ < exam.questions.length - 1 ? (
                    <button onClick={() => setActiveQ(activeQ + 1)}
                      style={{ padding: "10px 24px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>
                      Next Question →
                    </button>
                  ) : (
                    <button onClick={handleSubmit}
                      style={{ padding: "10px 24px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>
                      Finish & Submit ✓
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════
     RENDER: REVIEW PHASE
  ════════════════════════════════ */
  if (phase === "review" && exam) {
    const attempted = exam.questions.filter(q =>
      q.parts?.some(p => answers[`${q.question_number}_${p.part}`]?.trim())
    ).length;

    return (
      <div style={{ minHeight: "100vh", background: "#f0fdf4", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Summary Banner */}
          <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", borderRadius: "20px", padding: "2rem", marginBottom: "2rem", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
              <CheckCircle2 style={{ width: "32px", height: "32px", color: "#4ade80" }} />
              <div>
                <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "800" }}>Exam Submitted!</h2>
                <p style={{ margin: 0, color: "#94a3b8" }}>Grade {exam.grade} Mock Examination — Review your answers below</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { label: "Total Questions", value: exam.questions.length },
                { label: "Attempted", value: attempted },
                { label: "Total Marks", value: exam.total_marks },
                { label: "Time Used", value: fmt(EXAM_DURATION - timeLeft) },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 20px", textAlign: "center", flex: "1", minWidth: "120px" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: "800" }}>{value}</div>
                  <div style={{ color: "#64748b", fontSize: "0.78rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Question Reviews */}
          {exam.questions.map((q, qi) => (
            <div key={qi} style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: "8px", padding: "4px 12px", fontSize: "0.8rem", fontWeight: "700" }}>
                    Question {q.question_number}
                  </span>
                  <span style={{ marginLeft: "10px", fontWeight: "700", color: "#0f172a" }}>{q.topic}</span>
                </div>
                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{q.total_marks} marks</span>
              </div>

              {/* SVG Diagram */}
              {q.svg_diagram && (
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px", marginBottom: "1rem", textAlign: "center", border: "1px solid #e2e8f0" }}
                  dangerouslySetInnerHTML={{ __html: q.svg_diagram }}
                />
              )}

              {q.parts?.map((part, pi) => {
                const key = `${q.question_number}_${part.part}`;
                const studentAns = answers[key]?.trim();
                const reviewKey = `rev_${qi}_${pi}`;

                return (
                  <div key={pi} style={{ marginBottom: "1rem", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                    {/* Part header */}
                    <div style={{ background: "#f8fafc", padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "700", color: "#0f172a" }}>{part.part} — {part.marks} marks</span>
                      </div>
                      <p style={{ color: "#475569", margin: "6px 0 0", fontSize: "0.9rem", whiteSpace: "pre-line" }}>{part.question}</p>
                    </div>

                    {/* Student answer */}
                    <div style={{ padding: "12px 16px", background: studentAns ? "#f0fdf4" : "#fef9f0", borderBottom: "1px solid #e2e8f0" }}>
                      <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>YOUR ANSWER</p>
                      <p style={{ color: studentAns ? "#15803d" : "#b45309", margin: 0, fontStyle: studentAns ? "normal" : "italic", fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>
                        {studentAns || "Not attempted"}
                      </p>
                    </div>

                    {/* Model answer accordion */}
                    <div>
                      <button onClick={() => togglePart(reviewKey)} style={{
                        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "11px 16px", background: "none", border: "none", cursor: "pointer",
                        fontWeight: "700", color: "#0f172a", fontSize: "0.9rem",
                      }}>
                        📖 Model Answer & Working
                        {expandedParts[reviewKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedParts[reviewKey] && (
                        <div style={{ padding: "12px 16px 16px", background: "#fffbeb", borderTop: "1px solid #fde68a" }}>
                          <p style={{ fontWeight: "700", color: "#92400e", margin: "0 0 10px", fontSize: "0.88rem" }}>
                            ✅ Answer: {part.answer}
                          </p>
                          <div>
                            {part.working?.map((step, si) => (
                              <div key={si} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                                <div style={{ width: "22px", height: "22px", minWidth: "22px", background: "#fde68a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: "800", color: "#92400e" }}>
                                  {si + 1}
                                </div>
                                <div style={{ background: "#fff", borderRadius: "8px", padding: "8px 12px", flex: 1, fontSize: "0.88rem", color: "#374151", border: "1px solid #fde68a" }}>
                                  {step}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Restart */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button onClick={handleRestart} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#0f172a", color: "#fff", padding: "14px 32px",
              borderRadius: "14px", fontWeight: "700", border: "none", cursor: "pointer", fontSize: "1rem",
            }}>
              <RotateCcw size={18} /> Take Another Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MockExam;
