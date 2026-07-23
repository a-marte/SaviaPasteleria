(() => {
  "use strict";

  const WHATSAPP_NUMBER = "593000000000"; // Reemplazar por el número real, sin +, espacios ni guiones.

  const body = document.body;
  const menuButton = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const moreToggle = document.querySelector(".more-toggle");
  const moreContainer = document.querySelector(".nav-more");

  function closeMobileMenu() {
    if (!menuButton || !primaryNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
    body.classList.remove("menu-open");
  }

  if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      primaryNav.classList.toggle("is-open", !isOpen);
      body.classList.toggle("menu-open", !isOpen);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  if (moreToggle && moreContainer) {
    moreToggle.addEventListener("click", () => {
      const isOpen = moreToggle.getAttribute("aria-expanded") === "true";
      moreToggle.setAttribute("aria-expanded", String(!isOpen));
      moreContainer.classList.toggle("is-open", !isOpen);
    });

    document.addEventListener("click", (event) => {
      if (!moreContainer.contains(event.target)) {
        moreToggle.setAttribute("aria-expanded", "false");
        moreContainer.classList.remove("is-open");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      if (moreToggle && moreContainer) {
        moreToggle.setAttribute("aria-expanded", "false");
        moreContainer.classList.remove("is-open");
      }
    }
  });

  // Filtros del catálogo.
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const productCards = [...document.querySelectorAll(".product-card")];
  const emptyState = document.querySelector("#catalogo-vacio");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "todos";
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      productCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        const shouldShow = selectedFilter === "todos" || categories.includes(selectedFilter);
        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount > 0;
    });
  });

  // Revelado suave al entrar en pantalla.
  const revealItems = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Asistente de pedido por WhatsApp.
  const orderForm = document.querySelector("#order-form");
  const formStatus = document.querySelector("#form-status");
  const eventDateInput = document.querySelector("#fecha-evento");

  if (eventDateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    eventDateInput.min = localDate;
  }

  function createWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function formatDate(dateValue) {
    if (!dateValue) return "Por definir";
    const date = new Date(`${dateValue}T12:00:00`);
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      const data = new FormData(orderForm);
      const message = [
        "Hola, quiero solicitar una cotización con SaVia Pastelería.",
        "",
        `• Producto: ${data.get("tipoProducto")}`,
        `• Porciones: ${data.get("porciones")}`,
        `• Sabor: ${data.get("sabor")}`,
        `• Fecha del evento: ${formatDate(data.get("fecha"))}`,
        `• Personalización: ${data.get("idea") || "Sin detalles adicionales por ahora"}`,
        `• Preferencia de entrega: ${data.get("entrega")}`,
        "",
        "Quedo pendiente de disponibilidad y cotización."
      ].join("\n");

      if (formStatus) {
        formStatus.textContent = "Abriendo WhatsApp con tu mensaje listo para revisar.";
      }

      window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    });
  }

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const message = link.dataset.message || "Hola, quiero información sobre SaVia Pastelería.";
    link.href = createWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // Lightbox accesible para la galería.
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  const lightboxCloseButton = document.querySelector(".lightbox-close");
  const galleryButtons = document.querySelectorAll("[data-lightbox-src]");
  let lastLightboxTrigger = null;

  function openLightbox(trigger) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    const source = trigger.dataset.lightboxSrc;
    const alt = trigger.dataset.lightboxAlt || "Trabajo de SaVia Pastelería";

    lightboxImage.src = source;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = alt;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("lightbox-open");
    lastLightboxTrigger = trigger;
    lightboxCloseButton?.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("lightbox-open");
    lastLightboxTrigger?.focus();
  }

  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  document.querySelectorAll("[data-lightbox-close]").forEach((control) => {
    control.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();

    if (event.key === "Tab" && lightbox && !lightbox.hidden) {
      const focusable = [...lightbox.querySelectorAll("button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])")]
        .filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
