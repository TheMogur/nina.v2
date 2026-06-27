/* ============================================================
   NORA BIRSAN — LOGOPEDA
   JavaScript del lloc.

   Aquest fitxer NO necessita manteniment. Fa només 3 coses:
   1. Obre i tanca el menú al mòbil
   2. Mostra/amaga el text de privacitat sota el formulari
   3. Envia el formulari de contacte sense recarregar la pàgina
      i mostra el missatge de "enviat correctament" o d'error
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Menú mòbil ---------- */
  var navToggle = document.getElementById("navToggle");
  var navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* Tanca el menú en clicar un enllaç */
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. Avís de privacitat ---------- */
  var privacyToggle = document.getElementById("privacyToggle");
  var privacyNote = document.getElementById("privacyNote");

  if (privacyToggle && privacyNote) {
    privacyToggle.addEventListener("click", function () {
      var isHidden = privacyNote.hasAttribute("hidden");
      if (isHidden) {
        privacyNote.removeAttribute("hidden");
      } else {
        privacyNote.setAttribute("hidden", "");
      }
      privacyToggle.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
  }

  /* ---------- 3. Formulari de contacte ---------- */
  var form = document.getElementById("contactForm");
  var feedback = document.getElementById("formFeedback");

  if (form && feedback) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      feedback.hidden = true;
      feedback.classList.remove("ok", "error");

      var submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviant...";

      var dades = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: dades,
        headers: { "X-Requested-With": "fetch" }
      })
        .then(function (resposta) { return resposta.json(); })
        .then(function (resultat) {
          feedback.hidden = false;
          if (resultat.ok) {
            feedback.textContent = "Gràcies! El teu missatge s'ha enviat correctament.";
            feedback.classList.add("ok");
            form.reset();
          } else {
            feedback.textContent = "Hi ha hagut un problema enviant el missatge. Escriu-nos directament a info@norabirsan.cat.";
            feedback.classList.add("error");
          }
        })
        .catch(function () {
          feedback.hidden = false;
          feedback.textContent = "Hi ha hagut un problema enviant el missatge. Escriu-nos directament a info@norabirsan.cat.";
          feedback.classList.add("error");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envia la consulta";
        });
    });
  }

  /* ---------- Any actual al peu de pàgina ---------- */
  var anyActual = document.getElementById("anyActual");
  if (anyActual) {
    anyActual.textContent = new Date().getFullYear();
  }

});
