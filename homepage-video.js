(() => {
  const ID = "nontime-model-film";
  const CA = "9RKxPptT75ADSU51eks5jnq5TrxgEjfzhwTRqWf7pump";

  function mountCa() {
    if (document.getElementById("nontime-ca")) return;
    const ctas = document.querySelector(".hero .ctas");
    if (!ctas) return;

    const box = document.createElement("div");
    box.id = "nontime-ca";
    box.className = "nontime-ca";
    box.innerHTML = `
      <span class="nontime-ca__label">CA</span>
      <button class="nontime-ca__address" type="button" aria-label="Copy Nontime contract address" title="Copy contract address">${CA}</button>
      <button class="nontime-ca__copy" type="button" aria-label="Copy contract address">COPY</button>`;

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(CA);
      } catch {
        const field = document.createElement("textarea");
        field.value = CA;
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      const button = box.querySelector(".nontime-ca__copy");
      button.textContent = "COPIED";
      setTimeout(() => { button.textContent = "COPY"; }, 1400);
    };

    box.querySelector(".nontime-ca__address").addEventListener("click", copy);
    box.querySelector(".nontime-ca__copy").addEventListener("click", copy);
    ctas.insertAdjacentElement("afterend", box);
  }

  function mount() {
    if (document.getElementById(ID)) return;
    const main = document.querySelector("main.wrap");
    if (!main) return;

    const section = document.createElement("section");
    section.id = ID;
    section.className = "nontime-model-film";
    section.setAttribute("aria-label", "Nontime crew in motion");
    section.innerHTML = `
      <div class="nontime-model-film__frame">
        <video autoplay muted loop playsinline preload="metadata" poster="/nontime-model-poster.jpg" aria-label="Nontime AI crew working around the clock">
          <source src="/nontime-model-animation.mp4" type="video/mp4">
        </video>
      </div>`;
    main.prepend(section);

    const video = section.querySelector("video");
    const start = () => video.play().catch(() => {});
    video.addEventListener("canplay", start, { once: true });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) start();
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    .nontime-model-film{padding:clamp(54px,8vw,110px) 0 clamp(38px,6vw,82px);width:100%}
    .nontime-model-film__frame{width:min(1120px,100%);margin:0 auto;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#0a0a09;box-shadow:0 24px 70px rgba(0,0,0,.22)}
    .nontime-model-film video{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;background:#0a0a09}
    .nontime-ca{display:flex;align-items:center;width:min(660px,100%);margin-top:18px;border:1px solid var(--line);border-radius:13px;background:color-mix(in srgb,var(--card) 88%,transparent);overflow:hidden;font-family:var(--mono,monospace)}
    .nontime-ca__label{padding:13px 14px;border-right:1px solid var(--line);font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--muted)}
    .nontime-ca__address{min-width:0;flex:1;padding:13px 12px;border:0;background:transparent;color:var(--text);font:600 11px/1.2 var(--mono,monospace);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;cursor:pointer}
    .nontime-ca__copy{align-self:stretch;padding:0 14px;border:0;border-left:1px solid var(--line);background:transparent;color:var(--text);font:800 10px/1 var(--mono,monospace);letter-spacing:.08em;cursor:pointer}
    .nontime-ca__copy:hover,.nontime-ca__address:hover{background:color-mix(in srgb,var(--accent,#ff5a1f) 10%,transparent)}
    @media(max-width:700px){.nontime-model-film{padding:42px 0 30px}.nontime-model-film__frame{border-radius:16px}}
    @media(max-width:700px){.nontime-ca{margin-top:14px}.nontime-ca__label{padding-inline:11px}.nontime-ca__copy{padding-inline:11px}.nontime-ca__address{font-size:10px}}
    @media(prefers-reduced-motion:reduce){.nontime-model-film video{animation:none}}
  `;
  document.head.appendChild(style);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { mount(); mountCa(); }, { once: true });
  } else {
    mount();
    mountCa();
  }
  setTimeout(() => { mount(); mountCa(); }, 500);
  setTimeout(() => { mount(); mountCa(); }, 1600);
})();
