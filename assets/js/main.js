(() => {
  "use strict";

  /* ---------- loader ---------- */
  const loader = document.getElementById("loader");
  if (loader) {
    const seen = sessionStorage.getItem("daboa_loaded");
    if (seen) {
      loader.remove();
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          loader.classList.add("hide");
          sessionStorage.setItem("daboa_loaded", "1");
          setTimeout(() => loader.remove(), 600);
        }, 700);
      });
    }
  }

  /* ---------- ticker: duplicate content for seamless loop ---------- */
  document.querySelectorAll(".ticker-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- back to top ---------- */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 480);
    }, { passive: true });
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- decorative access counter ---------- */
  const counterEl = document.getElementById("counterDigits");
  if (counterEl) {
    const EPOCH = new Date("2026-01-01T00:00:00+09:00").getTime();
    const days = Math.max(0, Math.floor((Date.now() - EPOCH) / 86400000));
    let visits = parseInt(localStorage.getItem("daboa_visits") || "0", 10) + 1;
    localStorage.setItem("daboa_visits", String(visits));

    const value = 19980401 % 900000 + days * 3 + visits;
    const digits = String(value).padStart(6, "0").slice(-6).split("");
    counterEl.innerHTML = digits.map(d => `<span>${d}</span>`).join("");
  }

  /* ---------- logo glitch ---------- */
  const logo = document.getElementById("logoSvg");
  if (logo) {
    const trigger = () => {
      logo.classList.add("glitch-active");
      setTimeout(() => logo.classList.remove("glitch-active"), 500);
    };
    logo.addEventListener("mouseenter", trigger);
    setInterval(trigger, 7000);
  }

  /* ---------- cursor sparkle trail (fine pointers only) ---------- */
  if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const colors = ["#00fff2", "#ff2bd6", "#a259ff", "#d4ff00"];
    let last = 0;
    window.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const dot = document.createElement("span");
      const size = 4 + Math.random() * 3;
      dot.style.cssText = `
        position:fixed; left:${e.clientX}px; top:${e.clientY}px;
        width:${size}px; height:${size}px; border-radius:50%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events:none; z-index:9999; opacity:.85;
        box-shadow:0 0 6px currentColor;
        transform:translate(-50%,-50%);
        transition: transform .6s ease, opacity .6s ease;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = `translate(-50%,-50%) translateY(-16px) scale(0.3)`;
        dot.style.opacity = "0";
      });
      setTimeout(() => dot.remove(), 650);
    }, { passive: true });
  }
})();
