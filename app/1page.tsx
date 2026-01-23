"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Option = { label: string; value: string };
type Question = {
  id: string;
  title: string;
  subtitle?: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "relationship",
    title: "Who is this gift for?",
    options: [
      { label: "Partner", value: "partner" },
      { label: "Friend", value: "friend" },
      { label: "Family", value: "family" },
      { label: "Coworker", value: "coworker" },
    ],
  },
  {
    id: "budget",
    title: "Budget?",
    options: [
      { label: "Under $25", value: "under_25" },
      { label: "$25–$50", value: "25_50" },
      { label: "$50–$100", value: "50_100" },
      { label: "$100+", value: "100_plus" },
    ],
  },
  {
    id: "vibe",
    title: "What vibe do you want?",
    subtitle: "Pick the closest match.",
    options: [
      { label: "Thoughtful", value: "thoughtful" },
      { label: "Funny", value: "funny" },
      { label: "Practical", value: "practical" },
      { label: "Luxury", value: "luxury" },
    ],
  },
  {
    id: "interests",
    title: "What are they into most?",
    options: [
      { label: "Food / cooking", value: "food" },
      { label: "Fitness / health", value: "fitness" },
      { label: "Tech / gadgets", value: "tech" },
      { label: "Arts / books", value: "arts" },
    ],
  },
];

export default function Home() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = useMemo(() => {
    const answered = QUESTIONS.filter((q) => !!answers[q.id]).length;
    return { answered, total: QUESTIONS.length };
  }, [answers]);

  const allAnswered = progress.answered === progress.total;

 Z
  const resultsHref = useMemo(() => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(answers)) params.set(k, v);
    return `/results?${params.toString()}`;
  }, [answers]);

  return (
    <main style={{ padding: 32, fontFamily: "system-ui, Arial" }}>
      <h1 style={{ margin: 0 }}>Gift Quiz 🎁</h1>
      <p style={{ marginTop: 8, color: "#444" }}>
        Answer a few quick questions and we’ll recommend gifts.
      </p>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 10,
          maxWidth: 720,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>
            Progress: {progress.answered}/{progress.total}
          </strong>
          <button
            type="button"
            onClick={() => setAnswers({})}
            style={{
              border: "1px solid #ddd",
              background: "white",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ marginTop: 20, maxWidth: 720 }}>
        {QUESTIONS.map((q, idx) => (
          <section
            key={q.id}
            style={{
              marginTop: idx === 0 ? 0 : 18,
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 12,
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700 }}>{q.title}</div>
              {q.subtitle ? (
                <div style={{ color: "#666", fontSize: 14 }}>{q.subtitle}</div>
              ) : null}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                    }
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: selected ? "2px solid #111" : "1px solid #ddd",
                      background: selected ? "#111" : "white",
                      color: selected ? "white" : "#111",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div style={{ marginTop: 22 }}>
        <Link
          href={allAnswered ? resultsHref : "#"}
          onClick={(e) => {
            if (!allAnswered) e.preventDefault();
          }}
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 10,
            background: allAnswered ? "#111" : "#bbb",
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            cursor: allAnswered ? "pointer" : "not-allowed",
          }}
        >
          See results
        </Link>

        {!allAnswered ? (
          <div style={{ marginTop: 8, color: "#777", fontSize: 14 }}>
            Answer all questions to unlock results.
          </div>
        ) : null}
      </div>
    </main>
  );
}
