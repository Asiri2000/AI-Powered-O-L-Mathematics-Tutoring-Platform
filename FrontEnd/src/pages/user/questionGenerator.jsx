import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircleQuestion, CheckCircle, XCircle, ChevronDown, ChevronUp, Zap, Brain, Flame
} from "lucide-react";

import { generateQuiz, submitQuizAttempt } from "../../api";

/* ──────────────────────────────
   FULL O/L SYLLABUS
────────────────────────────── */
const SYLLABUS = {
  10: [
    "Perimeter",
    "Square Root",
    "Fractions",
    "Binomial Expressions",
    "Congruence of Triangles",
    "Area",
    "Factors of Quadratic Expressions",
    "Triangles I",
    "Triangles II",
    "Inverse Proportions",
    "Data Representation",
    "Least Common Multiple of Algebraic Expressions",
    "Algebraic Fractions",
    "Percentages",
    "Equations",
    "Parallelograms I",
    "Parallelograms II",
    "Sets",
    "Logarithms I",
    "Logarithms II",
    "Graphs",
    "Rate",
    "Formulae",
    "Arithmetic Progressions",
    "Algebraic Inequalities",
    "Frequency Distributions",
    "Chords of a Circle",
    "Constructions",
    "Surface Area and Volume",
    "Probability",
    "Angles in a Circle",
    "Scale Diagrams"
  ],
  11: [
    "Real Numbers",
    "Indices and Logarithms I",
    "Indices and Logarithms II",
    "Surface Area of Solids",
    "Volume of Solids",
    "Binomial Expressions",
    "Algebraic Fractions",
    "Areas of Plane Figures between Parallel Lines",
    "Percentages",
    "Share Market",
    "Midpoint Theorem",
    "Graphs",
    "Equations",
    "Equiangular Triangles",
    "Data Representation and Interpretation",
    "Geometric Progressions",
    "Pythagoras' Theorem",
    "Trigonometry",
    "Matrices",
    "Inequalities",
    "Cyclic Quadrilaterals",
    "Tangents",
    "Constructions",
    "Sets",
    "Probability"
  ],


  //  sinhala10:[
  //   "පරිමිතිය",
  //   "වර්ගමූල",
  //   "භාග",
  //   "ද්විපද ප්‍රකාශන",
  //   "ත්‍රිකෝණවල සර්වසමතාව",
  //   "වර්ගඵලය",
  //   "වර්ගීය ප්‍රකාශනවල සාධකකරණය",
  //   "ත්‍රිකෝණ I",
  //   "ත්‍රිකෝණ II",
  //   "ප්‍රතිලෝම සමානුපාත",
  //   "දත්ත නිරූපණය",
  //   "බීජීය ප්‍රකාශනවල ලඝු පොදු ගුණාකාරය",
  //   "බීජීය භාග",
  //   "ප්‍රතිශත",
  //   "සමීකරණ",
  //   "සමාන්තර චතුරස්‍ර I",
  //   "සමාන්තර චතුරස්‍ර II",
  //   "කුලක",
  //   "ලඝුගණක I",
  //   "ලඝුගණක II",
  //   "ප්‍රස්තාර",
  //   "අනුපාතය",
  //   "සූත්‍ර",
  //   "අංක ගණිත ප්‍රගති",
  //   "බීජීය අසමානතා",
  //   "සංඛ්‍යාත ව්‍යාප්ති",
  //   "වෘත්තයක ජ්‍යා",
  //   "නිර්මාණ",
  //   "පෘෂ්ඨ වර්ගඵලය හා පරිමාව",
  //   "සම්භාවිතාව",
  //   "වෘත්තයක කෝණ",
  //   "පරිමාණ රූප"
  // ],

  //  sinhala11:[

  //   "තාත්වික සංඛ්‍යා",
  //   "ඝාත හා ලඝුගණක I",
  //   "ඝාත හා ලඝුගණක II",
  //   "ඝන වස්තූන්ගේ පෘෂ්ඨ වර්ගඵලය",
  //   "ඝන වස්තූන්ගේ පරිමාව",
  //   "ද්විපද ප්‍රකාශන",
  //   "බීජීය භාග",
  //   "සමාන්තර රේඛා අතර තල රූපවල වර්ගඵල",
  //   "ප්‍රතිශත",
  //   "කොටස් වෙළෙඳපොළ",
  //   "මධ්‍ය ලක්ෂ්‍ය ප්‍රමේය",
  //   "ප්‍රස්තාර",
  //   "සමීකරණ",
  //   "සමකෝණී ත්‍රිකෝණ",
  //   "දත්ත නිරූපණය හා අර්ථකථනය",
  //   "ජ්‍යාමිතික ප්‍රගති",
  //   "පයිතගරස් ප්‍රමේය",
  //   "ත්‍රිකෝණමිතිය",
  //   "න්‍යාස",
  //   "අසමානතා",
  //   "චක්‍රීය චතුරස්‍ර",
  //   "ස්පර්ශක",
  //   "නිර්මාණ",
  //   "කුලක",
  //   "සම්භාවිතාව"
  //  ]

};

/* ──────────────────────────────
   DIFFICULTY CONFIG
────────────────────────────── */
const DIFFICULTIES = [
  { value: 1, label: "Easy",   icon: <Zap  size={14} />, color: "#16a34a", bg: "#dcfce7" },
  { value: 3, label: "Medium", icon: <Brain size={14} />, color: "#d97706", bg: "#fef3c7" },
  { value: 5, label: "Hard",   icon: <Flame size={14} />, color: "#dc2626", bg: "#fee2e2" },
];

const getDifficultyConfig = (d) =>
  DIFFICULTIES.find((x) => x.value === Number(d)) || DIFFICULTIES[1];

/* ──────────────────────────────
   COMPONENT
────────────────────────────── */
const QuestionGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("idle"); // idle | correct | incorrect
  const [showSteps, setShowSteps] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedGrade, setSelectedGrade] = useState(10);
  const [selectedLesson, setSelectedLesson] = useState(SYLLABUS[10][0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(3);

  const lastQuestionRef = useRef(null);
  const questionRef = useRef(null);
  const startTimeRef = useRef(null);
  const dropdownRef = useRef(null);

  /* Close custom dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const resetQuestion = () => {
    setQuestion(null);
    setSelectedOption(null);
    setFeedback("idle");
    setShowSteps(false);
    startTimeRef.current = null;
  };

  useEffect(() => {
    setSelectedLesson(SYLLABUS[selectedGrade][0]);
    resetQuestion();
    lastQuestionRef.current = null;
  }, [selectedGrade]);

  useEffect(() => {
    resetQuestion();
    lastQuestionRef.current = null;
  }, [selectedLesson]);

  /* GENERATE */
  const generateQuestion = async () => {
    if (loading) return;
    setLoading(true);
    resetQuestion();

    try {
      const data = await generateQuiz({
        grade: selectedGrade,
        topic: selectedLesson,
        difficulty_level: selectedDifficulty,
        weak_areas: [],
      });

      const q = data?.questions?.[0];
      if (!q || !q.options) throw new Error("Invalid MCQ");
      if (q.question === lastQuestionRef.current) throw new Error("Repeated");

      lastQuestionRef.current = q.question;
      startTimeRef.current = Date.now();
      setQuestion(q);
    } catch (err) {
      console.error("Quiz generation failed:", err);
      alert("❌ Failed to generate question.");
    } finally {
      setLoading(false);
    }
  };

  /* CHECK ANSWER */
  const handleCheckAnswer = async () => {
    if (!selectedOption || !question) return;

    const isCorrect = selectedOption === question.correct_answer;
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) setShowSteps(false);

    const timeTaken = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : 0;

    try {
      await submitQuizAttempt({
        question_id: question.id || crypto.randomUUID(),
        chapter: selectedLesson,
        question: question.question,
        selected_answer: selectedOption,
        correct_answer: question.correct_answer,
        time_taken: timeTaken,
        difficulty: selectedDifficulty,
      });
    } catch (e) {
      console.error("❌ Failed to save attempt", e);
    }

    if (isCorrect) setTimeout(generateQuestion, 900);
  };

  useEffect(() => {
    if (question && questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question]);

  const diffCfg = getDifficultyConfig(selectedDifficulty);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5rem", minHeight: "100vh", background: "#f0fdf4" }}>

      {/* ─── CONTROL PANEL ─── */}
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "1.5rem",
        width: "100%", maxWidth: "760px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        marginBottom: "1.5rem",
      }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
          <MessageCircleQuestion style={{ color: "#16a34a" }} />
          Question Generator
        </h2>

        {/* Grade Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {[10, 11].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              style={{
                padding: "8px 22px", borderRadius: "10px", fontWeight: "700",
                border: "none", cursor: "pointer", transition: "all 0.2s",
                background: selectedGrade === g ? "#16a34a" : "#f1f5f9",
                color: selectedGrade === g ? "#fff" : "#475569",
              }}
            >
              Grade {g}
            </button>
          ))}
        </div>

        {/* Lesson select — custom dropdown (Google Translate can't translate native <option> text) */}
        <div ref={dropdownRef} style={{ position: "relative", marginBottom: "14px" }}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            style={{
              width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0",
              borderRadius: "10px", fontSize: "0.95rem", color: "#0f172a",
              background: "#f8fafc", textAlign: "left", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <span>{selectedLesson}</span>
            <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "0.8rem" }}>▼</span>
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
                background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)", maxHeight: "240px",
                overflowY: "auto", marginTop: "4px",
              }}
            >
              {SYLLABUS[selectedGrade].map((lesson) => (
                <div
                  key={lesson}
                  onClick={() => { setSelectedLesson(lesson); setDropdownOpen(false); }}
                  style={{
                    padding: "10px 14px", cursor: "pointer", fontSize: "0.95rem",
                    color: "#0f172a", background: selectedLesson === lesson ? "#dcfce7" : "transparent",
                    fontWeight: selectedLesson === lesson ? "700" : "400",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedLesson !== lesson) e.currentTarget.style.background = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLesson !== lesson) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {lesson}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Pills */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              onClick={() => setSelectedDifficulty(d.value)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 16px", borderRadius: "99px", border: "2px solid",
                cursor: "pointer", fontWeight: "600", fontSize: "0.85rem",
                transition: "all 0.2s",
                borderColor: selectedDifficulty === d.value ? d.color : "#e2e8f0",
                background: selectedDifficulty === d.value ? d.bg : "#f8fafc",
                color: selectedDifficulty === d.value ? d.color : "#64748b",
              }}
            >
              {d.icon} {d.label}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQuestion}
          disabled={loading}
          style={{
            width: "100%", background: loading ? "#86efac" : "#16a34a",
            color: "#fff", padding: "12px", borderRadius: "12px",
            fontWeight: "700", fontSize: "1rem", border: "none", cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s", letterSpacing: "0.01em",
          }}
        >
          {loading ? "Generating…" : "⚡ Generate Question"}
        </button>
      </div>

      {/* ─── QUESTION CARD ─── */}
      {question && (
        <div
          ref={questionRef}
          style={{
            background: "#fff", borderRadius: "16px", padding: "1.75rem",
            width: "100%", maxWidth: "760px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Difficulty Badge + Concept Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <DifficultyBadge value={question.difficulty ?? selectedDifficulty} />
            {question.concept && (
              <span style={{
                background: "#e0e7ff", color: "#4338ca",
                borderRadius: "99px", padding: "4px 12px", fontSize: "0.78rem", fontWeight: "600"
              }}>
                {question.concept}
              </span>
            )}
          </div>

          {/* Question Text */}
          <p style={{ fontWeight: "700", fontSize: "1.05rem", color: "#0f172a", lineHeight: "1.6", marginBottom: "1rem" }}>
            {question.question}
          </p>

          {/* SVG Diagram */}
          {question.svg_diagram && (
            <div
              style={{
                background: "#f8fafc", borderRadius: "12px", padding: "16px",
                marginBottom: "1rem", border: "1px solid #e2e8f0", textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: question.svg_diagram }}
            />
          )}

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
            {Object.entries(question.options).map(([k, v]) => {
              const isSelected = selectedOption === k;
              const isCorrect = k === question.correct_answer;
              let bg = "#f8fafc";
              let border = "#e2e8f0";
              let color = "#0f172a";
              if (feedback !== "idle") {
                if (isSelected && isCorrect) { bg = "#dcfce7"; border = "#16a34a"; color = "#15803d"; }
                else if (isSelected && !isCorrect) { bg = "#fee2e2"; border = "#dc2626"; color = "#b91c1c"; }
                else if (!isSelected && isCorrect) { bg = "#dcfce7"; border = "#16a34a"; }
              } else if (isSelected) {
                bg = "#dbeafe"; border = "#3b82f6"; color = "#1e40af";
              }
              return (
                <button
                  key={k}
                  onClick={() => { if (feedback === "idle") { setSelectedOption(k); } }}
                  disabled={feedback !== "idle"}
                  style={{
                    border: `2px solid ${border}`, padding: "12px 14px", borderRadius: "12px",
                    textAlign: "left", background: bg, color, cursor: feedback !== "idle" ? "default" : "pointer",
                    fontWeight: "500", fontSize: "0.9rem", transition: "all 0.15s",
                  }}
                >
                  <strong style={{ marginRight: "6px" }}>{k}.</strong>{v}
                </button>
              );
            })}
          </div>

          {/* Check Answer Button */}
          {feedback === "idle" && (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              style={{
                width: "100%", background: selectedOption ? "#16a34a" : "#e2e8f0",
                color: selectedOption ? "#fff" : "#94a3b8",
                padding: "11px", borderRadius: "12px", fontWeight: "700", border: "none",
                cursor: selectedOption ? "pointer" : "not-allowed", transition: "all 0.2s",
              }}
            >
              Check Answer
            </button>
          )}

          {/* CORRECT Feedback */}
          {feedback === "correct" && (
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#dcfce7", border: "1.5px solid #86efac",
              borderRadius: "12px", padding: "14px 16px", marginTop: "12px",
            }}>
              <CheckCircle style={{ color: "#16a34a", flexShrink: 0 }} />
              <p style={{ margin: 0, color: "#15803d", fontWeight: "700" }}>
                Correct! 🎉 Next question coming…
              </p>
            </div>
          )}

          {/* INCORRECT Feedback */}
          {feedback === "incorrect" && (
            <div style={{ marginTop: "12px" }}>
              <div style={{
                background: "#fee2e2", border: "1.5px solid #fca5a5",
                borderRadius: "12px", padding: "14px 16px", marginBottom: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <XCircle style={{ color: "#dc2626", flexShrink: 0 }} />
                  <span style={{ color: "#b91c1c", fontWeight: "700" }}>Incorrect</span>
                </div>
                <p style={{ margin: "0 0 4px", fontSize: "0.9rem", color: "#64748b" }}>
                  <strong>Your answer:</strong> {selectedOption} — {question.options[selectedOption]}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#15803d" }}>
                  <strong>Correct answer:</strong> {question.correct_answer} — {question.options[question.correct_answer]}
                </p>
              </div>

              {/* Step-by-Step Panel */}
              {question.steps && question.steps.length > 0 && (
                <div style={{ border: "1.5px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    style={{
                      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "12px 16px", background: "#f8fafc", border: "none", cursor: "pointer",
                      fontWeight: "700", color: "#0f172a", fontSize: "0.95rem",
                    }}
                  >
                    📖 How to solve step-by-step
                    {showSteps ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showSteps && (
                    <div style={{ padding: "16px", background: "#fff" }}>
                      {question.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: "12px", marginBottom: i < question.steps.length - 1 ? "12px" : 0 }}>
                          <div style={{
                            width: "28px", height: "28px", minWidth: "28px",
                            background: "#dbeafe", borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: "800", fontSize: "0.8rem", color: "#1d4ed8",
                          }}>
                            {i + 1}
                          </div>
                          <div style={{
                            borderRadius: "10px", padding: "10px 14px",
                            flex: 1, color: "#0f172a", fontSize: "0.9rem", lineHeight: "1.5",
                            fontWeight: i === question.steps.length - 1 ? "700" : "400",
                            border: i === question.steps.length - 1 ? "1.5px solid #16a34a" : "1px solid #e2e8f0",
                            background: i === question.steps.length - 1 ? "#f0fdf4" : "#f8fafc",
                          }}>
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Try Again Button */}
              <button
                onClick={generateQuestion}
                style={{
                  width: "100%", background: "#0f172a", color: "#fff",
                  padding: "11px", borderRadius: "12px", fontWeight: "700",
                  border: "none", cursor: "pointer", marginTop: "12px",
                }}
              >
                Try Another Question →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────
   DIFFICULTY BADGE COMPONENT
────────────────────────────── */
const DifficultyBadge = ({ value }) => {
  const cfg = getDifficultyConfig(value);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: cfg.bg, color: cfg.color,
      borderRadius: "99px", padding: "4px 12px", fontSize: "0.78rem", fontWeight: "700",
    }}>
      {cfg.icon} {cfg.label}
    </span>
  );
};

export default QuestionGenerator;
