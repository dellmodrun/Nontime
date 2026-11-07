(function () {
  var root = document.documentElement;
  addEventListener("keydown", function (e) {
    if (e.key !== "Shift" || e.repeat || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    var s = root.dataset.shift === "night" ? "day" : "night";
    root.dataset.shift = s;
    try { localStorage.setItem("shift", s); } catch (_) {}
    document.querySelectorAll("iframe.scene").forEach(function (f) { try { f.contentWindow.location.reload(); } catch (_) {} });
  });
  var on = document.querySelector(".tabs a.on"), ind = document.querySelector(".tabs .ind");
  if (on && ind) { ind.style.left = on.offsetLeft + "px"; ind.style.width = on.offsetWidth + "px"; }
  var $ = function (id) { return document.getElementById(id); };
  var name = $("f-name"), tick = $("f-tick"), desc = $("f-desc");
  function sync() {
    $("p-name").textContent = name.value || "Coin name";
    var t = tick.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    $("p-tick").textContent = "$" + (t || "TICKER") + " · paired with $OT";
    $("p-page").textContent = "nontime.fun/" + (t.toLowerCase() || "ticker");
    [["name", name], ["tick", tick], ["desc", desc]].forEach(function (p) {
      var c = document.querySelector('[data-count="' + p[0] + '"]');
      c.textContent = p[1].value.length + "/" + c.dataset.max;
    });
  }
  if (name) [name, tick, desc].forEach(function (el) { el.addEventListener("input", sync); });
  document.querySelectorAll(".chips").forEach(function (g) {
    g.addEventListener("click", function (e) {
      if (!e.target.classList.contains("chip")) return;
      g.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
      e.target.classList.add("on");
    });
  });
})();
