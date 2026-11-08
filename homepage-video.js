(() => {
  const ID = "nontime-model-film";

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
    @media(max-width:700px){.nontime-model-film{padding:42px 0 30px}.nontime-model-film__frame{border-radius:16px}}
    @media(prefers-reduced-motion:reduce){.nontime-model-film video{animation:none}}
  `;
  document.head.appendChild(style);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
  setTimeout(mount, 500);
  setTimeout(mount, 1600);
})();
