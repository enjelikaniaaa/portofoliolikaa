/* ===== FAIRY MAGIC CURSOR ===== */

const canUseFairyCursor = window.matchMedia(
  "(pointer: fine) and (prefers-reduced-motion: no-preference)"
).matches;

if (canUseFairyCursor) {
  // Membuat kursor panah pink
  const cursor = document.createElement("div");
  cursor.className = "fairy-cursor";

  cursor.innerHTML = `
    <svg viewBox="0 0 30 34"
         width="30" height="34"
         aria-hidden="true">
      <path
        d="M3 2 L3 26 L10 20 L16 32
           L21 29 L15 18 L27 18 Z"
        fill="#E8A5C0"
        stroke="#9E6685"
        stroke-width="1.6"
        stroke-linejoin="round"/>
    </svg>
  `;

  document.body.appendChild(cursor);
  document.documentElement.classList.add(
    "fairy-cursor-on"
  );

  let lastDust = 0;

  document.addEventListener("pointermove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Membatasi jumlah serbuk agar tetap ringan
    const now = performance.now();

    if (now - lastDust < 55) return;
    lastDust = now;

    const dust = document.createElement("span");
    dust.className = "fairy-dust";
    dust.textContent =
      Math.random() > 0.5 ? "✦" : "✧";

    dust.style.left =
      e.clientX + (Math.random() * 16 - 8) + "px";

    dust.style.top =
      e.clientY + (Math.random() * 16 - 8) + "px";

    document.body.appendChild(dust);

    dust.addEventListener("animationend", () => {
      dust.remove();
    }, { once: true });
  });

  document.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("pointerenter", () => {
    cursor.style.opacity = "1";
  });
}