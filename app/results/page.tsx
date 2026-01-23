type Gift = {
  title: string;
  reason: string;
  link: string;
};

export default function ResultsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const who = (searchParams.who as string) || "them";
  const profile = (searchParams.profile as string) || "";
  const budget = (searchParams.budget as string) || "";
  const vibe = (searchParams.vibe as string) || "";
  const interestsRaw = (searchParams.interests as string) || "";
  const interests = interestsRaw.split("|").filter(Boolean);

  const gifts: Gift[] = getGifts({ profile, budget, vibe, interests });

  return (
    <main style={{ padding: 32, fontFamily: "system-ui, Arial", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32 }}>Gift ideas for {who} 🎁</h1>

      <p style={{ opacity: 0.75, marginTop: 6 }}>
        Profile: {profile || "—"} · Budget: {budget || "—"} · Vibe: {vibe || "—"} · Interests:{" "}
        {interests.length ? interests.join(", ") : "—"}
      </p>

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {gifts.map((g, i) => (
          <div key={i} style={card}>
            <h3 style={{ margin: 0 }}>{g.title}</h3>
            <p style={{ opacity: 0.85, marginTop: 8 }}>{g.reason}</p>

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
  budget,
  vibe,
  interests,
}: {
  profile: string;
  budget: string;
  vibe: string;
  interests: string[];
}): Gift[] {
  // Replace YOURTAG-20 with your Amazon Associates tag later
  const base = "https://www.amazon.com/s?k=";
  const tag = "&tag=YOURTAG-20";

  const picks: Gift[] = [];

  // Interest-based
  if (interests.includes("Cooking")) {
    picks.push({
      title: "Chef’s knife upgrade",
      reason: "A high-impact cooking gift that feels premium.",
      link: `${base}chef+knife${tag}`,
    });
  }
  if (interests.includes("Sports")) {
    picks.push({
      title: "Stadium-ready insulated tumbler",
      reason: "Useful for games, tailgates, and everyday.",
      link: `${base}insulated+tumbler${tag}`,
    });
  }
  if (interests.includes("Tech")) {
    picks.push({
      title: "Charging stand / desk organizer",
      reason: "Clean desk, clean life—great practical gift.",
      link: `${base}charging+stand+desk+organizer${tag}`,
    });
  }
  if (interests.includes("Coffee")) {
    picks.push({
      title: "Coffee sampler + grinder",
      reason: "Feels thoughtful and gets used constantly.",
      link: `${base}coffee+sampler${tag}`,
    });
  }

  // Vibe-based
  if (vibe === "luxury") {
    picks.push({
      title: "Leather valet tray",
      reason: "Looks expensive and never the wrong size.",
      link: `${base}leather+valet+tray${tag}`,
    });
  }
  if (vibe === "fun") {
    picks.push({
      title: "Conversation card game",
      reason: "Fun gift that creates a moment.",
      link: `${base}conversation+card+game${tag}`,
    });
  }

  // Budget-based
  if (budget === "under_30") {
    picks.push({
      title: "Nice candle (giftable packaging)",
      reason: "Safe under-$30 win that still feels special.",
      link: `${base}luxury+candle${tag}`,
    });
  } else if (budget === "75_plus") {
    picks.push({
      title: "Massage gun",
      reason: "People love it and actually keep using it.",
      link: `${base}massage+gun${tag}`,
    });
  } else {
    picks.push({
      title: "Bluetooth speaker (compact)",
      reason: "Great value gift that fits most lifestyles.",
      link: `${base}bluetooth+speaker${tag}`,
    });
  }

  // De-dupe + top 5
  const seen = new Set<string>();
  const uniq = picks.filter((p) => {
    const k = p.title.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return uniq.slice(0, 5);
}

const card: React.CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 16,
  padding: 16,
};

const cta: React.CSSProperties = {
  display: "inline-block",
  marginTop: 10,
  fontWeight: 800,
};
