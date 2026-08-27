// Shown instantly while the real page renders on the server.
//
// Without this, clicking a "Book a discovery call" link left the previous page
// on screen, unchanged, for several seconds. Nothing indicated that anything
// was happening, so the button read as broken. It was not: the navigation was
// just slow and silent. This makes it visibly not silent.

export default function Loading() {
  return (
    <main className="site-shell theme-c">
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: "1px solid rgba(197,162,123,.28)",
            borderTopColor: "#c5a27b",
            animation: "kdSpin 900ms linear infinite",
          }}
        />
        <p
          style={{
            margin: 0,
            color: "#b9b2a8",
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          Loading
        </p>
        <span className="sr-only" role="status">
          Loading the page
        </span>
      </div>
      <style>{"@keyframes kdSpin{to{transform:rotate(360deg)}}"}</style>
    </main>
  );
}
