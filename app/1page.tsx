"use client";

import { useMemo, useState } from "react";

type Profile = "friend" | "coworker" | "parent" | "romantic";
type Budget = "under_30" | "30_75" | "75_plus";
type Vibe = "practical" | "fun" | "luxury";
type Interest =
  | "Sports"
  | "Cooking"
  | "Gardening"
  | "Fitness"
  | "Tech"
  | "Gaming"
  | "Reading"
  | "Music"
  | "Travel"
  | "Coffee";

const INTERESTS: Interest[] = [
  "Sports",
  "Cooking",
  "Gardening",
  "Fitness",
  "Tech",
  "Gaming",
  "Reading",
  "Music",
  "Travel",
  "Coffee",
];

export default function Home() {
  const [who, setWho] = useState("");
  const [profile, setProfile] = useState<Profile>("friend");
  const [budget, setBudget] = useState<Budget>("30_75");
  const [vibe, setVibe] = useState<Vibe>("practical");
  const [selected, setSelected] = useState<Interest[]>([]);

  const canContinue = useMemo(() => {
    return who.trim().length >= 2 && selected.length >= 1;
  }, [who, selected]);

  function toggleInterest(i: Interest) {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  function goResults() {
    if (!canContinue) return;

    const sp = new URLSearchParams();
    sp.set("who", who.trim());
    sp.set("profile", profile);
    sp.set("budget", budget);
    sp.set("vibe", vibe);
    sp.set("interests", selected.join("|"));

    window.location.href = `/results?${sp.toString()}`;
  }

  return (
    <main style={{ padding: 28, fontFamily: "system-ui, Arial", maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>Gift Finder 🎁</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Answer a few quick questions. Get Amazon gift picks in seconds.
      </p>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        <section style={card}>
          <div style={label}>Who is the gift for?</div>
          <input
            value={who}
            onChange={(e) => setWho(e.target.value)}
            placeholder='Example: "my brother", "girlfriend", "boss"'
            style={input}
          />
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            Tip: type “girlfriend”, “dad”, “coworker”, etc.
          </div>
        </section>

        <section style={card}>
          <div style={label}>Relationship</div>
          <div style={row}>
            {(["friend", "coworker", "parent", "romantic"] as Profile[]).map((p) => (
              <button
                key={p}
                onClick={() => setProfile(p)}
                style={pill(profile === p)}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        <section style={card}>
          <div style={label}>Budget</div>
          <div style={row}>
            <button onClick={() => setBudget("under_30")} style={pill(budget === "under_30")}>
              under $30
            </button>
            <button onClick={() => setBudget("30_75")} style={pill(budget === "30_75")}>
              $30–$75
            </button>
            <button onClick={() => setBudget("75_plus")} style={pill(budget === "75_plus")}>
              $75+
            </button>
          </div>
        </section>

        <section style={card}>
          <div style={label}>Vibe</div>
          <div style={row}>
            {(["practical", "fun", "luxury"] as Vibe[]).map((v) => (
              <button key={v} onClick={() => setVibe(v)} style={pill(vibe === v)}>
                {v}
              </button>
            ))}
          </div>
        </section>

        <section style={card}>
          <div style={label}>Interests (pick 1–5)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {INTERESTS.map((i) => (
              <button
                key={i}
                onClick={() => toggleInterest(i)}
                style={pill(selected.includes(i))}
              >
                {i}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={goResults}
          disabled={!canContinue}
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #ddd",
            cursor: canContinue ? "pointer" : "not-allowed",
            fontWeight: 700,
            fontSize: 16,
            opacity: canContinue ? 1 : 0.5,
          }}
        >
          Get gift ideas →
        </button>
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 16,
  padding: 16,
};

const label: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: 10,
};

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 16,
};

function pill(active: boolean): React.CSSProperties {
  return {
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid #ddd",
    cursor: "pointer",
    fontWeight: 600,
    opacity: active ? 1 : 0.75,
    background: active ? "black" : "white",
    color: active ? "white" : "black",
  };
}
