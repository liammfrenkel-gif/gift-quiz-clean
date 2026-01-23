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

      <div style
