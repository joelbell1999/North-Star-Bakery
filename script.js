(() => {
  const filterOptions = [
    { id: "all", label: "All offerings" },
    { id: "bread", label: "Breads" },
    { id: "pastry", label: "Pastries" }
  ];
  const filterStorageKey = "northStarBakery.productFilter";

  function getSavedFilter() {
    try {
      const saved = window.localStorage.getItem(filterStorageKey);
      return filterOptions.some((option) => option.id === saved) ? saved : "all";
    } catch {
      return "all";
    }
  }

  function saveFilter(filterId) {
    try {
      window.localStorage.setItem(filterStorageKey, filterId);
    } catch {
      // Filtering still works for this visit if browser storage is unavailable.
    }
  }

  function updateProductFilter(filterId, shouldSave = false) {
    const products = Array.from(document.querySelectorAll("[data-product]"));
    const buttons = Array.from(document.querySelectorAll("[data-filter]"));
    const status = document.querySelector("#filter-status");
    if (!products.length || !buttons.length || !status) return;

    let visibleCount = 0;
    products.forEach((product) => {
      const isVisible = filterId === "all" || product.dataset.category === filterId;
      product.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filterId));
    });

    const selected = filterOptions.find((option) => option.id === filterId);
    status.textContent = filterId === "all"
      ? `Showing all ${visibleCount} offerings.`
      : `Showing ${visibleCount} ${selected.label.toLowerCase()} ${visibleCount === 1 ? "offering" : "offerings"}.`;

    if (shouldSave) saveFilter(filterId);
  }

  function initializeProductFilter() {
    const buttons = Array.from(document.querySelectorAll("[data-filter]"));
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => updateProductFilter(button.dataset.filter, true));
    });
    updateProductFilter(getSavedFilter());
  }

  function getFieldError(field) {
    const value = field.value.trim();
    if (field.required && !value) return "Please complete this field.";

    if (field.id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      return "Enter an email address in a format like name@example.com.";
    }
    if (field.id === "message" && value.length < 10) {
      return "Please enter at least 10 characters so we can understand your inquiry.";
    }
    if (field.id === "message" && value.length > 1000) {
      return "Please keep your message to 1,000 characters or fewer.";
    }
    return "";
  }

  function validateField(field) {
    const error = getFieldError(field);
    const errorElement = document.getElementById(`${field.id}-error`);
    field.setAttribute("aria-invalid", String(Boolean(error)));
    if (errorElement) errorElement.textContent = error;
    return !error;
  }

  function initializeContactForm() {
    const form = document.querySelector("#contact-form");
    if (!form) return;

    // Keep native HTML validation as a fallback when JavaScript does not load.
    form.noValidate = true;
    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    const status = form.querySelector("#form-status");

    fields.forEach((field) => {
      field.addEventListener("input", () => {
        if (field.dataset.touched === "true") validateField(field);
        if (status) status.textContent = "";
      });
      field.addEventListener("change", () => {
        if (field.dataset.touched === "true") validateField(field);
      });
      field.addEventListener("blur", () => {
        field.dataset.touched = "true";
        validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const invalidFields = fields.filter((field) => {
        field.dataset.touched = "true";
        return !validateField(field);
      });

      if (invalidFields.length) {
        if (status) status.textContent = "Please correct the highlighted fields.";
        invalidFields[0].focus();
        return;
      }

      if (status) {
        status.textContent = "Your inquiry looks ready, but this demo form is not connected to receive messages, so it has not been sent.";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initializeProductFilter();
    initializeContactForm();
  });
})();
