"use client";

import { useSearchParams } from "next/navigation";

type Gift = {
  title: string;
  reason: string;
  link: string;
};

export default function ResultsPage() {
  const sp = useSearchParams();

  const who = sp.get("who") || "them";
  const profile = sp.get("profile");
  const budget = sp.get("budget");
  const vibe = sp.get("vibe");
  const interests = (sp.get("interests") || "").split("|").filter(Boolean);

  const gifts: Gift[] = getGifts({ profile, budget, vibe, interests });

  return (
    <main style={{ padding: 32, fontFamily: "system-ui, Arial", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32 }}>Gift ideas for {who} 🎁</h1>

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {gifts.map((g, i) => (
          <div key={i} style={card}>
            <h3 style={{ marginBottom: 6 }}>{g.title}</h3>
            <p style={{ opacity: 0.8 }}>{g.reason}</p>
            <a
              href={g.link}
              target="_blank"
              rel="noopener noreferrer"
              style={cta}
            >
              View on Amazon →
            </a>
          </div>
        ))}
      </div>

      <a href="/" style={{ display: "inline-block", marginTop: 24 }}>
        ← Take quiz again
      </a>
    </main>
  );
}

function getGifts({
  profile,
  budget,
  vibe,
  interests,
}: {
  profile: string | null;
  budget: string | null;
  vibe: string | null;
  interests: string[];
}): Gift[] {
  // 🔴 REPLACE `YOURTAG-20` with your Amazon affiliate tag later
  const base = "https://www.amazon.com/s?k=";
  const tag = "&tag=YOURTAG-20";

  const picks: Gift[] = [];

  if (interests.includes("Coffee")) {
    picks.push({
      title: "Premium coffee sampler",
      reason: "Great daily-use gift that feels thoughtful.",
      link: `${base}coffee+sampler${tag}`,
    });
  }

  if (interests.includes("Tech")) {
    picks.push({
      title: "MagSafe charging stand",
      reason: "Practical, clean, and universally useful.",
      link: `${base}magsafe+charger${tag}`,
    });
  }

  if (interests.includes("Fitness")) {
    picks.push({
      title: "Massage gun",
      reason: "Popular wellness gift people actually use.",
      link: `${base}massage+gun${tag}`,
    });
  }

  if (vibe === "luxury") {
    picks.push({
      title: "Leather valet tray",
      reason: "Feels expensive without being risky.",
      link: `${base}leather+valet+tray${tag}`,
    });
  }

  if (budget === "under_30") {
    picks.push({
      title: "High-end candle",
      reason: "Easy win under $30.",
      link: `${base}luxury+candle${tag}`,
    });
  }

  return picks.slice(0, 5);
}

const card: React.CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 16,
  padding: 16,
};

const cta: React.CSSProperties = {
  display: "inline-block",
  marginTop: 10,
  fontWeight: 700,
};
