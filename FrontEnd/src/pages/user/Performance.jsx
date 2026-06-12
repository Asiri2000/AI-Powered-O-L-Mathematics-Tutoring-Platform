import React, { useEffect, useState } from "react";
import { getOverallSummary, getChapterAnalytics } from "../../api";
import {
  TrendingUp, Award, BookOpen, CheckCircle2, Zap, Star, AlertTriangle, Target
} from "lucide-react";

/* --- Badge Images --- */
import DistinctionBadge from "../../assets/badges/A.jpg";
import VeryGoodBadge from "../../assets/badges/B.jpg";
import CreditBadge from "../../assets/badges/C.jpg";
import OrdinaryBadge from "../../assets/badges/S.jpg";
import TryBadge from "../../assets/badges/try.png";

/* ===========================
   PERFORMANCE LEVEL LOGIC
=========================== */
const getLevel = (accuracy = 0) => {
  if (accuracy >= 75)
    return {
      label: "Distinction",
      grade: "A",
      color: "#16a34a",
      bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
      badgeBg: "#16a34a",
      image: DistinctionBadge,
      message: "🏆 Outstanding! You are exam-ready. Keep maintaining this level!",
      motivational: "You're in the top tier! Every practice session is polishing your excellence.",
      type: "success",
    };
  if (accuracy >= 65)
    return {
      label: "Very Good Pass",
      grade: "B",
      color: "#0284c7",
      bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      badgeBg: "#0284c7",
      image: VeryGoodBadge,
      message: "🎯 Great performance! You're almost at the top — push a little more!",
      motivational: "You're doing really well! Focus on weak areas to reach Distinction.",
      type: "info",
    };
  if (accuracy >= 50)
    return {
      label: "Credit Pass",
      grade: "C",
      color: "#d97706",
      bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
      badgeBg: "#d97706",
      image: CreditBadge,
      message: "💪 Good progress! A bit more practice in weak topics and you'll excel.",
      motivational: "Credit level is great — with more focus, you'll hit Very Good or Distinction!",
      type: "warning",
    };
  if (accuracy >= 35)
    return {
      label: "Ordinary Pass",
      grade: "S",
      color: "#7c3aed",
      bg: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
      badgeBg: "#7c3aed",
      image: OrdinaryBadge,
      message: "📚 You're on the path! Target your weak lessons to improve your grade.",
      motivational: "Keep it up! You've cleared the baseline — now let's climb higher together.",
      type: "info",
    };
  return {
    label: "Needs Improvement",
    grade: "W",
    color: "#dc2626",
    bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
    badgeBg: "#dc2626",
    image: TryBadge,
    message: "🔥 Don't give up! Every expert was once a beginner. Practice daily!",
    motivational: "You are at early stage — this is just the start of your journey. Don't stop!",
    type: "error",
  };
};

/* ===========================
   LESSON COLOUR HELPER
=========================== */
const getLessonColor = (acc) => {
  if (acc >= 75) return { bar: "#16a34a", bg: "#dcfce7", text: "#15803d" };
  if (acc >= 65) return { bar: "#0284c7", bg: "#dbeafe", text: "#1d4ed8" };
  if (acc >= 50) return { bar: "#d97706", bg: "#fef3c7", text: "#b45309" };
  if (acc >= 35) return { bar: "#7c3aed", bg: "#ede9fe", text: "#6d28d9" };
  return { bar: "#dc2626", bg: "#fee2e2", text: "#b91c1c" };
};

/* ===========================
   MAIN COMPONENT
=========================== */
const Performance = () => {
  const [summary, setSummary] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [sum, chap] = await Promise.all([getOverallSummary(), getChapterAnalytics()]);
        setSummary(sum);
        setChapters(Array.isArray(chap) ? chap : []);
      } catch (e) {
        setError("Failed to load performance data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!summary || summary.total_attempts === 0) return <EmptyScreen />;

  const acc = parseFloat(summary.accuracy_percentage || 0);
  const level = getLevel(acc);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ======= PAGE TITLE ======= */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <div style={{ background: "#d1fae5", borderRadius: "12px", padding: "10px" }}>
              <TrendingUp style={{ width: "28px", height: "28px", color: "#16a34a" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                Your Performance
              </h1>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>
                Track your overall level and lesson-by-lesson progress
              </p>
            </div>
          </div>
        </div>

        {/* ======= OVERALL CARD ======= */}
        <div style={{
          background: level.bg,
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem",
          border: `2px solid ${level.color}30`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            {/* Badge */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <img
                src={level.image}
                alt={level.label}
                style={{ width: "100px", height: "100px", objectFit: "contain", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
              />
              <span style={{
                background: level.badgeBg, color: "#fff",
                borderRadius: "99px", padding: "4px 16px",
                fontSize: "0.8rem", fontWeight: "700",
              }}>
                Grade {level.grade}
              </span>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ fontSize: "0.9rem", color: level.color, fontWeight: "600", margin: "0 0 4px" }}>
                OVERALL LEVEL
              </p>
              <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>
                {level.label}
              </h2>
              <p style={{ color: "#475569", margin: 0, fontSize: "0.95rem" }}>{level.message}</p>
            </div>

            {/* Stats Row */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <StatPill icon={<Target size={16} />} label="Accuracy" value={`${acc}%`} color={level.color} />
              <StatPill icon={<CheckCircle2 size={16} />} label="Attempts" value={summary.total_attempts} color={level.color} />
              <StatPill icon={<Zap size={16} />} label="Avg Time" value={`${summary.avg_time_seconds ?? 0}s`} color={level.color} />
              <StatPill icon={<BookOpen size={16} />} label="Correct" value={summary.correct_answers ?? 0} color={level.color} />
            </div>
          </div>

          {/* Motivational Banner */}
          <MotivationalBanner level={level} acc={acc} />
        </div>

        {/* ======= LESSON GRID ======= */}
        {chapters.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
              <Award style={{ width: "20px", height: "20px", color: "#6366f1" }} />
              <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                Lesson-by-Lesson Breakdown
              </h2>
              <span style={{
                background: "#e0e7ff", color: "#4338ca",
                borderRadius: "99px", padding: "2px 12px", fontSize: "0.78rem", fontWeight: "600"
              }}>
                {chapters.length} lessons
              </span>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}>
              {chapters.map((ch, i) => <LessonCard key={i} chapter={ch} />)}
            </div>
          </div>
        )}

        {chapters.length === 0 && (
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "2rem",
            textAlign: "center", color: "#64748b", border: "1px dashed #e2e8f0"
          }}>
            <BookOpen style={{ width: "40px", height: "40px", margin: "0 auto 12px", color: "#cbd5e1" }} />
            <p style={{ margin: 0 }}>No lesson-level data yet. Start practicing to see your breakdown!</p>
          </div>
        )}

      </div>
    </div>
  );
};

/* ======= SUB-COMPONENTS ======= */

const StatPill = ({ icon, label, value, color }) => (
  <div style={{
    background: "#fff", borderRadius: "12px", padding: "10px 16px",
    display: "flex", flexDirection: "column", alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minWidth: "80px"
  }}>
    <div style={{ color, marginBottom: "4px" }}>{icon}</div>
    <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a" }}>{value}</div>
    <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: "600" }}>{label}</div>
  </div>
);

const MotivationalBanner = ({ level, acc }) => {
  const isLow = acc < 50;
  return (
    <div style={{
      background: isLow ? "#fef2f2" : "#f0fdf4",
      border: `1px solid ${isLow ? "#fca5a5" : "#86efac"}`,
      borderRadius: "12px", padding: "14px 18px",
      display: "flex", alignItems: "center", gap: "12px",
    }}>
      {isLow
        ? <AlertTriangle style={{ width: "20px", height: "20px", color: "#dc2626", flexShrink: 0 }} />
        : <Star style={{ width: "20px", height: "20px", color: "#16a34a", flexShrink: 0 }} />}
      <p style={{ margin: 0, color: isLow ? "#b91c1c" : "#15803d", fontWeight: "500", fontSize: "0.95rem" }}>
        {level.motivational}
      </p>
    </div>
  );
};

const LessonCard = ({ chapter }) => {
  const acc = parseFloat(chapter.accuracy_percentage || 0);
  const colors = getLessonColor(acc);
  const level = getLevel(acc);
  return (
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "1.25rem",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9",
      borderLeft: `4px solid ${colors.bar}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <h3 style={{ fontWeight: "700", color: "#0f172a", margin: 0, fontSize: "0.95rem", flex: 1 }}>
          {chapter.chapter}
        </h3>
        <span style={{
          background: colors.bg, color: colors.text,
          borderRadius: "8px", padding: "3px 10px", fontSize: "0.78rem", fontWeight: "700", flexShrink: 0
        }}>
          {level.grade}
        </span>
      </div>
      {/* Progress Bar */}
      <div style={{ background: "#f1f5f9", borderRadius: "99px", height: "8px", marginBottom: "10px", overflow: "hidden" }}>
        <div style={{
          width: `${Math.min(acc, 100)}%`,
          height: "100%",
          background: colors.bar,
          borderRadius: "99px",
          transition: "width 0.8s ease",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b" }}>
        <span>{chapter.total_attempts} attempts</span>
        <span style={{ fontWeight: "700", color: colors.text }}>{acc}% accuracy</span>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <div style={{ textAlign: "center", color: "#64748b" }}>
      <div style={{
        width: "48px", height: "48px", border: "4px solid #e2e8f0",
        borderTop: "4px solid #16a34a", borderRadius: "50%", margin: "0 auto 16px",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ margin: 0, fontWeight: "600" }}>Loading your performance data…</p>
    </div>
  </div>
);

const ErrorScreen = ({ message }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "2rem",
      textAlign: "center", maxWidth: "400px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }}>
      <AlertTriangle style={{ width: "40px", height: "40px", color: "#dc2626", margin: "0 auto 12px" }} />
      <h3 style={{ color: "#0f172a", fontWeight: "700", margin: "0 0 8px" }}>Something went wrong</h3>
      <p style={{ color: "#64748b", margin: 0 }}>{message}</p>
    </div>
  </div>
);

const EmptyScreen = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <div style={{
      background: "#fff", borderRadius: "20px", padding: "3rem 2rem",
      textAlign: "center", maxWidth: "420px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }}>
      <BookOpen style={{ width: "48px", height: "48px", color: "#16a34a", margin: "0 auto 16px" }} />
      <h3 style={{ color: "#0f172a", fontWeight: "800", fontSize: "1.25rem", margin: "0 0 8px" }}>
        No attempts yet
      </h3>
      <p style={{ color: "#64748b", margin: 0 }}>
        Start answering questions to see your performance summary and lesson-by-lesson breakdown here.
      </p>
    </div>
  </div>
);

export default Performance;
