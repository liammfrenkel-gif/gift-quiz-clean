"use client";

import { useMemo, useState } from "react";

const INTERESTS = ["Cooking", "Sports", "Tech", "Coffee"] as const;

export default function Home() {
  const [who, setWho] = useState("");
  const [profile, setProfile] = useState("friend");
  const [budget, setBudget] = useState("under_30");
  const [vibe, setVibe] = useState("classic");
  const [interests, setInterests] = useState<string[]>([]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (who.trim()) params.set("who", who.trim());
    params.set("profile", profile);
    params.set("budget", budget);
    params.set("vibe", vibe);
    if (interests.length) params.set("interests", interests.join("|"));
    return params.toString();
  }, [who, profile, budget, vibe, interests]);

  const href = `/results?${query}`;

  function toggleInterest(val: string) {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  }

  return (
    <main style={{ padding: 32, fontFamily: "system-ui, Arial", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Gift Quiz 🎁</h1>
      <p style={{ opacity: 0.75, marginTop: 0 }}>Answer 4 quick questions and get gift ideas.</p>

      <div style={card}>
        <label style={label}>Who is the gift for?</label>
        <input
          value={who}
          onChange={(e) => setWho(e.target.value)}
          placeholder="e.g., my brother, my girlfriend, my boss"
          style={input}
        />

        <div style={row}>
          <div style={{ flex: 1 }}>
            <label style={label}>Profile</label>
            <select value={profile} onChange={(e) => setProfile(e.target.value)} style={input}>
              <option value="friend">Friend</option>
              <option value="partner">Partner</option>
              <option value="parent">Parent</option>
              <option value="coworker">Coworker</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Budget</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} style={input}>
              <option value="under_30">Under $30</option>
              <option value="30_75">$30–$75</option>
              <option value="75_plus">$75+</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Vibe</label>
            <select value={vibe} onChange={(e) => setVibe(e.target.value)} style={input}>
              <option value="classic">Classic</option>
              <option value="fun">Fun</option>
              <option value="luxury">Luxury</option>
              <option value="practical">Practical</option>
            </select>
          </div>
        </div>

        <label style={label}>Interests</label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {INTERESTS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleInterest(i)}
              style={{
                ...pill,
                borderColor: interests.includes(i) ? "#111" : "#ddd",
                background: interests.includes(i) ? "#111" : "#fff",
                color: interests.includes(i) ? "#fff" : "#111",
              }}
            >
              {i}
            </button>
          ))}
        </div>

        <a href={href} style={cta}>
          Get gift ideas →
        </a>
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 16,
  padding: 16,
  marginTop: 18,
};

const row: React.CSSProperties = {
  display: "flex",
  gap: 12,
  marginTop: 14,
  flexWrap: "wrap",
};

const label: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  marginTop: 14,
  marginBottom: 6,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 14,
};

const pill: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #ddd",
  cursor: "pointer",
  fontWeight: 700,
};

const cta: React.CSSProperties = {
  display: "inline-block",
  marginTop: 18,
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
};
