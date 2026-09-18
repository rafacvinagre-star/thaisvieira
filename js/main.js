/* Thais Vieira — Biomedicina Estética */
(function () {
  "use strict";

  var WHATSAPP = "5522974002471";

  /* ---------- Header com fundo ao rolar ---------- */
  var header = document.getElementById("header");
  function aoRolar() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var aberto = nav.classList.toggle("aberto");
    toggle.classList.toggle("open", aberto);
    toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("aberto");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Abas de procedimentos ---------- */
  var tabs = document.querySelectorAll(".tab");
  var paineis = document.querySelectorAll(".painel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("ativo"); });
      paineis.forEach(function (p) { p.classList.remove("ativo"); });
      tab.classList.add("ativo");
      var alvo = document.getElementById(tab.dataset.painel);
      if (alvo) {
        alvo.classList.add("ativo");
        alvo.querySelectorAll(".reveal").forEach(function (el) {
          el.classList.add("visivel");
        });
      }
    });
  });

  /* ---------- Animação de entrada ---------- */
  var alvos = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- Máscara de telefone ---------- */
  var telefone = document.getElementById("telefone");
  if (telefone) {
    telefone.addEventListener("input", function () {
      var v = telefone.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 6) v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
      else if (v.length > 2) v = "(" + v.slice(0, 2) + ") " + v.slice(2);
      else if (v.length > 0) v = "(" + v;
      telefone.value = v;
    });
  }

  /* ---------- Formulário -> WhatsApp ---------- */
  var form = document.getElementById("formContato");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("nome").value.trim();
      var tel = document.getElementById("telefone").value.trim();
      var proc = document.getElementById("procedimento").value;
      var msg = document.getElementById("mensagem").value.trim();

      var texto =
        "Ola Thais! Meu nome e " + nome + "." +
        "\nTelefone: " + tel +
        "\nInteresse: " + proc +
        (msg ? "\nMensagem: " + msg : "") +
        "\n\nVim pelo site e gostaria de agendar uma avaliacao.";

      window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto),
        "_blank",
        "noopener"
      );
    });
  }

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
