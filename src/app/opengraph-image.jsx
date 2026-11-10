import { ImageResponse } from "next/og";

export const alt = "Daniel Vidal — Desarrollador de Software | Backend · QA · Data";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const tags = ["Backend", "Bases de datos", "QA Testing", "Data Analytics"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#03050c",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(79,124,255,0.45), transparent 45%), radial-gradient(circle at 10% 90%, rgba(139,92,246,0.4), transparent 45%)",
          color: "#eef2ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(110deg,#22d3ee,#4f7cff,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#050816",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            DV
          </div>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#22d3ee" }}>VIDAL / DEV</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>Daniel Vidal</div>
          <div style={{ fontSize: 38, color: "#c3cbe6" }}>Desarrollador de Software Junior</div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid rgba(34,211,238,0.5)",
                background: "rgba(34,211,238,0.08)",
                fontSize: 26,
                color: "#eef2ff",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
